// classification: PUBLIC
/** Actual local Auth, Postgres/RLS and MCP replay. No hosted access or messages.
 * This manual gate replaces ad-hoc fixture testing; it is not an installed loop.
 */
import assert from 'node:assert/strict'
import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { spawn } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import { localRuntime, root } from './workflow-lab-runtime.mjs'
const output = process.env.WORKFLOW_LAB_OUTPUT
assert(output, 'Set WORKFLOW_LAB_OUTPUT to a private artifact directory')
await mkdir(output, { recursive: true })
const runtime = localRuntime()
runtime.resetFixtures()
const base = runtime.env.API_URL
const raw = await readFile(`${root}/.env.local`, 'utf8')
const line = raw.split('\n').find(line => line.startsWith('WORKFLOW_LAB_PERSONAS_JSON='))
assert(line, 'Run the local setup first')
const personas = JSON.parse(line.slice(line.indexOf('=') + 1).replace(/^'|'$/g, ''))
const key = runtime.env.PUBLISHABLE_KEY || runtime.env.ANON_KEY
const results = []
const check = (name, pass) => { results.push({ name, pass: Boolean(pass) }); assert(pass, name) }
const ids = {
  staff: '10000000-0000-4000-8000-000000000001', reviewer: '10000000-0000-4000-8000-000000000002',
  workspace: '20000000-0000-4000-8000-000000000001',
  missing: '30000000-0000-4000-8000-000000000001', complete: '30000000-0000-4000-8000-000000000002',
  uncertain: '30000000-0000-4000-8000-000000000003', stale: '30000000-0000-4000-8000-000000000004',
  untrusted: '30000000-0000-4000-8000-000000000005', foreign: '30000000-0000-4000-8000-000000000006',
}
async function login(persona) {
  const response = await fetch(`${base}/auth/v1/token?grant_type=password`, { method: 'POST', headers: { apikey: key, 'Content-Type': 'application/json' }, body: JSON.stringify(personas[persona]), signal: AbortSignal.timeout(30000) })
  const data = await response.json(); assert(response.ok && data.access_token, 'Fictional user sign-in failed')
  return data.access_token
}
async function rpc(token, name, args = {}) {
  const response = await fetch(`${base}/rest/v1/rpc/${name}`, { method: 'POST', headers: { apikey: key, ...(token ? { Authorization: `Bearer ${token}` } : {}), 'Content-Type': 'application/json', 'Content-Profile': 'workflow_lab' }, body: JSON.stringify(args), signal: AbortSignal.timeout(30000) })
  return { status: response.status, data: await response.json().catch(() => null) }
}
async function mcp(token, method, params, id = 1) {
  const response = await fetch(`${base}/functions/v1/workflow-mcp`, { method: 'POST', headers: { apikey: key, ...(token ? { Authorization: `Bearer ${token}` } : {}), 'Content-Type': 'application/json', Accept: 'application/json, text/event-stream' }, body: JSON.stringify({ jsonrpc: '2.0', id, method, params }), signal: AbortSignal.timeout(30000) })
  const text = await response.text()
  let data
  try { data = JSON.parse(text) } catch {
    const row = text.split('\n').filter(line => line.startsWith('data:')).at(-1)
    data = row ? JSON.parse(row.slice(5)) : null
  }
  return { status: response.status, data, challenge: response.headers.get('www-authenticate') }
}
async function holder() {
  // The local client path comes from the runtime cache; no credential in argv.
  const env = runtime.env
  const { readdirSync, existsSync } = await import('node:fs')
  const { homedir } = await import('node:os')
  const directory = `${homedir()}/.supabase/cache/stack/slim-services/postgres`
  const executable = process.env.PSQL_BIN || readdirSync(directory).sort().reverse().map(v => `${directory}/${v}/${process.platform}-${process.arch}/bin/psql`).find(existsSync)
  const child = spawn(executable, ['-h', '127.0.0.1', '-p', '54582', '-U', 'postgres', '-d', 'postgres', '-X', '-qAt', '-v', 'ON_ERROR_STOP=1'], { stdio: ['pipe', 'pipe', 'pipe'], env: { ...process.env, PGPASSWORD: decodeURIComponent(new URL(env.DB_URL).password) } })
  child.stdin.write(`begin; select pg_advisory_xact_lock(hashtextextended('${ids.workspace}',0)); select 'LOCK_READY';\n`)
  await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => { child.kill(); reject(Error('Local lock setup timed out')) }, 8000)
    let text = ''
    child.stdout.on('data', chunk => { text += chunk; if (text.includes('LOCK_READY')) { clearTimeout(timeout); resolve() } })
    child.on('exit', code => { if (code) { clearTimeout(timeout); reject(Error('Local lock setup failed')) } })
  })
  return () => new Promise(resolve => { child.on('exit', resolve); child.stdin.end('rollback;\n\\q\n') })
}
async function waitForQueuedAction() {
  for (let n = 0; n < 30; n++) {
    if (runtime.sql("select count(*) from pg_stat_activity where wait_event='advisory' and pid<>pg_backend_pid();").trim() !== '0') return
    await new Promise(resolve => setTimeout(resolve, 80))
  }
  throw Error('Action did not queue on the real database lock')
}
try {
  const staff = await login('aster_staff'), reviewer = await login('aster_reviewer'), foreignStaff = await login('birch_staff')
  check('Actual fictional Auth users receive asymmetrically signed JWTs', ['ES256', 'RS256'].includes(JSON.parse(Buffer.from(staff.split('.')[0], 'base64url')).alg))
  const session = await rpc(staff, 'describe_session')
  check('JWT-scoped session comes from actual firm membership', session.status === 200 && session.data.userId === ids.staff && session.data.role === 'staff')
  const list = await rpc(staff, 'list_document_exceptions')
  check('Actual workspace query returns only Aster cases', list.status === 200 && list.data.length === 5 && list.data.every(item => item.workspaceId === ids.workspace))
  check('Complete, uncertain and stale inputs retain distinct states', list.data.find(item => item.id === ids.complete).state === 'complete' && [ids.uncertain, ids.stale].every(id => list.data.find(item => item.id === id).state === 'review'))
  const anonymous = await rpc(null, 'list_document_exceptions')
  check('Anonymous workflow calls denied', anonymous.status >= 400)
  const invalid = await rpc(staff.slice(0, -8) + 'tampered', 'list_document_exceptions')
  check('Tampered JWT denied by actual gateway', invalid.status === 401)
  const denied = await rpc(staff, 'prepare_followup_draft', { p_case_id: ids.foreign, p_request_id: randomUUID() })
  check('Cross-firm mutation denied independently of UI', denied.status >= 400 && denied.data.code === '42501')
  const direct = await fetch(`${base}/rest/v1/cases?id=eq.${ids.foreign}`, { headers: { apikey: key, Authorization: `Bearer ${staff}`, 'Accept-Profile': 'workflow_lab' }, signal: AbortSignal.timeout(30000) })
  check('Real table RLS hides the other firm', direct.ok && (await direct.json()).length === 0)
  const write = await fetch(`${base}/rest/v1/cases?id=eq.${ids.missing}`, { method: 'PATCH', headers: { apikey: key, Authorization: `Bearer ${staff}`, 'Content-Profile': 'workflow_lab', 'Content-Type': 'application/json' }, body: JSON.stringify({ version: 99 }), signal: AbortSignal.timeout(30000) })
  check('Authenticated direct table writes denied', write.status >= 400)
  for (const id of [ids.complete, ids.uncertain, ids.stale]) {
    const result = await rpc(staff, 'prepare_followup_draft', { p_case_id: id, p_request_id: randomUUID() })
    check(`Unsafe/complete case ${id.slice(-1)} cannot become a reminder`, result.status >= 400 && result.data.code === '40001')
  }
  const requestId = randomUUID()
  const prepared = await rpc(staff, 'prepare_followup_draft', { p_case_id: ids.missing, p_request_id: requestId })
  check('Known missing item produces a durable prepared draft', prepared.status === 200 && prepared.data.status === 'prepared' && prepared.data.events.length === 1)
  const draftId = prepared.data.id
  const duplicate = await rpc(staff, 'prepare_followup_draft', { p_case_id: ids.missing, p_request_id: requestId })
  check('Identical retry keeps one draft and event', duplicate.data.id === draftId && duplicate.data.events.length === 1)
  const conflict = await rpc(staff, 'prepare_followup_draft', { p_case_id: ids.untrusted, p_request_id: requestId })
  check('Changed idempotency request rejected', conflict.status >= 400 && conflict.data.code === '40001')
  const recovery = await rpc(reviewer, 'list_document_exceptions')
  check('Reviewer discovers durable receipt after a fresh sign-in', recovery.data.find(item => item.id === ids.missing).latestDraftId === draftId)
  check('Staff cannot approve', (await rpc(staff, 'approve_followup', { p_draft_id: draftId })).data.code === '42501')
  check('Staff cannot simulate delivery', (await rpc(staff, 'simulate_delivery', { p_draft_id: draftId, p_outcome: 'confirmed' })).data.code === '42501')
  const approved = await rpc(reviewer, 'approve_followup', { p_draft_id: draftId })
  check('Reviewer approval is named and expires', approved.data.status === 'approved' && approved.data.approvedBy === ids.reviewer && Date.parse(approved.data.approvalExpiresAt) > Date.now())
  check('Failed simulation is not confirmation', (await rpc(reviewer, 'simulate_delivery', { p_draft_id: draftId, p_outcome: 'failed' })).data.status === 'failed')
  const confirmed = await rpc(reviewer, 'simulate_delivery', { p_draft_id: draftId, p_outcome: 'confirmed' })
  const repeated = await rpc(reviewer, 'simulate_delivery', { p_draft_id: draftId, p_outcome: 'confirmed' })
  check('Explicit simulated retry has exactly one simulated confirmation', confirmed.data.status === 'simulated_confirmed' && repeated.data.events.filter(event => event.kind === 'simulated_confirmed').length === 1)
  check('Other firm cannot read that receipt', (await rpc(foreignStaff, 'get_workflow_receipt', { p_draft_id: draftId })).data.code === '42501')
  const hostile = await rpc(staff, 'prepare_followup_draft', { p_case_id: ids.untrusted, p_request_id: randomUUID() })
  check('Instruction-like metadata remains a prepared draft, never an action', hostile.data.status === 'prepared' && hostile.data.body.includes('No message has been sent'))
  await rpc(reviewer, 'approve_followup', { p_draft_id: hostile.data.id })
  const timeout = await rpc(reviewer, 'simulate_delivery', { p_draft_id: hostile.data.id, p_outcome: 'timeout' })
  const noRetry = await rpc(reviewer, 'simulate_delivery', { p_draft_id: hostile.data.id, p_outcome: 'confirmed' })
  check('Timeout remains unconfirmed and never silently retries', timeout.data.status === 'unconfirmed' && noRetry.data.status === 'unconfirmed' && timeout.data.events.length === noRetry.data.events.length)

  // Real queued revocation: a second connection changes membership while RPC waits.
  runtime.sql(`update workflow_lab.cases set version=version+1 where id='${ids.untrusted}';`)
  const unlock = await holder()
  let queued
  try {
    queued = rpc(staff, 'prepare_followup_draft', { p_case_id: ids.untrusted, p_request_id: randomUUID() })
    await waitForQueuedAction()
    runtime.sql(`update workflow_lab.memberships set active=false where user_id='${ids.staff}';`)
  } finally { await unlock() }
  const revoked = await queued
  check('Queued action rechecks committed membership revocation', revoked.status >= 400 && revoked.data.code === '42501')
  runtime.sql(`update workflow_lab.memberships set active=true where user_id='${ids.staff}';`)

  // Real queued expiry: transaction begins before expiry and executes after it.
  runtime.sql(`update workflow_lab.cases set version=version+1 where id='${ids.missing}';`)
  const newDraft = await rpc(staff, 'prepare_followup_draft', { p_case_id: ids.missing, p_request_id: randomUUID() })
  await rpc(reviewer, 'approve_followup', { p_draft_id: newDraft.data.id })
  const release = await holder()
  let waiting
  try {
    runtime.sql(`update workflow_lab.drafts set approval_expires_at=clock_timestamp()+interval '1 second' where id='${newDraft.data.id}';`)
    waiting = rpc(reviewer, 'simulate_delivery', { p_draft_id: newDraft.data.id, p_outcome: 'confirmed' })
    await waitForQueuedAction()
    check('Expiry test transaction really started before approval expired', runtime.sql(`select exists(select 1 from pg_stat_activity a, workflow_lab.drafts d where a.wait_event='advisory' and d.id='${newDraft.data.id}' and a.xact_start < d.approval_expires_at);`).trim() === 't')
    await new Promise(resolve => setTimeout(resolve, 1200))
  } finally { await release() }
  const expired = await waiting
  check('Queued simulation rejects approval that expired during wait', expired.status >= 400 && expired.data.code === '40001')

  const unauthMcp = await mcp(null, 'tools/list', {})
  check('Official MCP middleware denies anonymous access with a challenge', unauthMcp.status === 401 && Boolean(unauthMcp.challenge))
  const init = await mcp(staff, 'initialize', { protocolVersion: '2025-11-25', capabilities: {}, clientInfo: { name: 'fictional-replay', version: '1' } })
  check('Real JWT initializes the adopted MCP server', init.status === 200 && init.data?.result?.serverInfo?.name === 'workflow-lab')
  const tools = await mcp(staff, 'tools/list', {})
  check('MCP offers three tools and no approval or delivery capability', tools.status === 200 && tools.data?.result?.tools?.length === 3 && tools.data.result.tools.every(tool => ['list_document_exceptions','prepare_followup_draft','get_workflow_receipt'].includes(tool.name)))
  const mcpList = await mcp(staff, 'tools/call', { name: 'list_document_exceptions', arguments: {} })
  const mcpCases = mcpList.data?.result?.structuredContent?.cases
  check('MCP uses actual caller RLS and preserves receipt discovery', Array.isArray(mcpCases) && mcpCases.length === 5 && mcpCases.every(item => item.workspaceId === ids.workspace && 'latestDraftId' in item))
  const mcpDenied = await mcp(foreignStaff, 'tools/call', { name: 'get_workflow_receipt', arguments: { draft_id: draftId } })
  check('MCP denies cross-firm receipt and redacts database detail', mcpDenied.data?.result?.isError === true && JSON.stringify(mcpDenied.data.result).includes('Access denied.') && !JSON.stringify(mcpDenied.data.result).includes('42501'))
} catch (error) {
  await writeFile(`${output}/replay.json`, JSON.stringify({ classification: 'PRIVATE', observedAt: new Date().toISOString(), runtime: 'actual local Supabase Auth/Postgres/MCP; fictional metadata only', results, failure: String(error) }, null, 2) + '\n')
  throw error
} finally {
  runtime.sql(`update workflow_lab.memberships set active=true where user_id='${ids.staff}';`)
}
await writeFile(`${output}/replay.json`, JSON.stringify({ classification: 'PRIVATE', observedAt: new Date().toISOString(), runtime: 'actual local Supabase Auth/Postgres/MCP; fictional metadata only', results }, null, 2) + '\n')
console.log(JSON.stringify({ passed: results.filter(result => result.pass).length, total: results.length, output }))
