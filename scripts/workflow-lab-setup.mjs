// classification: PUBLIC
/** Local fictional Auth fixtures only. Captures CLI keys without printing them.
 * Run after the local migration; rerunning rotates only these fixture passwords.
 * Net growth: one replayable setup replaces manual fixture/account provisioning.
 */
import { randomBytes } from 'node:crypto'
import { readFile, writeFile, chmod } from 'node:fs/promises'
import { root, localRuntime } from './workflow-lab-runtime.mjs'
import assert from 'node:assert/strict'
const config = await readFile(`${root}/supabase/config.toml`, 'utf8')
assert(config.includes('project_id = "nyclaw-workflow-lab"'), 'Requires the dedicated local prototype project')
const { env, sqlFile } = localRuntime()
assert(env?.API_URL === 'http://127.0.0.1:54581', 'Only the dedicated loopback stack is allowed')
assert(env.DB_URL?.includes('@127.0.0.1:54582/'), 'Only the dedicated local database is allowed')
const personas = {}
const names = ['aster_staff', 'aster_reviewer', 'birch_staff', 'birch_reviewer']
for (const [index, name] of names.entries()) {
  const id = `10000000-0000-4000-8000-00000000000${index + 1}`
  const email = `${name}@workflow-lab.example`
  const password = randomBytes(30).toString('base64url')
  const headers = { apikey: env.SECRET_KEY || env.SERVICE_ROLE_KEY, Authorization: `Bearer ${env.SERVICE_ROLE_KEY}`, 'Content-Type': 'application/json' }
  const exists = await fetch(`${env.API_URL}/auth/v1/admin/users/${id}`, { headers, signal: AbortSignal.timeout(30000) })
  const response = await fetch(`${env.API_URL}/auth/v1/admin/users${exists.ok ? `/${id}` : ''}`, {
    method: exists.ok ? 'PUT' : 'POST', headers,
    body: JSON.stringify({ id, email, password, email_confirm: true }), signal: AbortSignal.timeout(30000),
  })
  const user = await response.json()
  assert(response.ok && user.id === id, `Fixture ${name} could not be provisioned; no credentials emitted`)
  personas[name] = { email, password }
}
const path = `${root}/.env.local`
const existing = await readFile(path, 'utf8').catch(() => '')
const preserved = existing.split('\n').filter(line => !line.startsWith('WORKFLOW_LAB_')).join('\n').trim()
const lines = [
  'WORKFLOW_LAB_ENABLED=local', `WORKFLOW_LAB_SUPABASE_URL=${env.API_URL}`,
  `WORKFLOW_LAB_PUBLISHABLE_KEY=${env.PUBLISHABLE_KEY || env.ANON_KEY}`,
  `WORKFLOW_LAB_PERSONAS_JSON='${JSON.stringify(personas)}'`,
]
await writeFile(path, `${preserved}${preserved ? '\n' : ''}${lines.join('\n')}\n`, { mode: 0o600 })
await chmod(path, 0o600)
sqlFile(`${root}/supabase/seed.sql`)
console.log('Four fictional local Auth accounts and metadata fixtures ready. Credentials saved only in ignored .env.local.')
