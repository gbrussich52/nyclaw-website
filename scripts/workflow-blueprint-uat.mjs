// classification: PUBLIC
/** Isolated local UAT: real Redis via a loopback REST bridge; fictional data only.
 * Run with REDIS_CLI pointing at a temporary Redis 8 binary on port 4390,
 * a production-mode Next server at 4388 using fictional KV credentials, and
 * NYCLAW_UAT_OUTPUT set to a private artifact directory. No installed runner.
 */
import { createServer } from 'node:http'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { mkdir, writeFile } from 'node:fs/promises'
import assert from 'node:assert/strict'
import puppeteer from 'puppeteer-core'
const exec = promisify(execFile)
const base = 'http://127.0.0.1:4388'
const output = process.env.NYCLAW_UAT_OUTPUT
assert(output && process.env.REDIS_CLI, 'Set output and temporary Redis CLI paths')
await mkdir(output, { recursive: true })
const auth = `Basic ${Buffer.from('operator:fictional-local-review').toString('base64')}`
let dropCreateReply = false, offline = false, holdList = false
const results = []
const check = (name, pass) => { results.push({ name, pass: Boolean(pass) }); assert(pass, name) }
async function redis(args) {
  const { stdout } = await exec(process.env.REDIS_CLI, ['-p', '4390', '--json', ...args.map(String)], { maxBuffer: 2e6 })
  return JSON.parse(stdout)
}
const bridge = createServer(async (req, res) => {
  try {
    if (req.headers.authorization !== 'Bearer fictional-local-token') { res.writeHead(401); return res.end() }
    if (offline) { res.writeHead(503); return res.end('{}') }
    let body = ''; for await (const chunk of req) { body += chunk; if (body.length > 100000) throw Error('fixture body limit') }
    const args = JSON.parse(body)
    if (holdList && args[0] === 'LRANGE') { holdList = false; await new Promise(r => setTimeout(r, 1400)) }
    if (req.url === '/pipeline') {
      const out = []; for (const command of args) out.push({ result: await redis(command) })
      res.setHeader('content-type', 'application/json'); return res.end(JSON.stringify(out))
    }
    const result = await redis(args)
    if (dropCreateReply && args[0] === 'EVAL' && result === 'created') { dropCreateReply = false; res.writeHead(503); return res.end('{}') }
    res.setHeader('content-type', 'application/json');res.end(JSON.stringify({ result }))
  } catch { res.writeHead(500); res.end(JSON.stringify({ error: 'local fixture failure' })) }
})
await new Promise(resolve => bridge.listen(4389, '127.0.0.1', resolve))
let browser
try {
  // This command is safe only against the dedicated temporary Redis port above.
  assert.equal(await redis(['DBSIZE']), 0, 'Dedicated fixture Redis must start empty; this gate never clears existing data')
  const health = await fetch(`${base}/api/workflow-assessment/health`)
  check('Configured loopback storage and review report ready', health.status === 200 && (await health.json()).ready === true)
  const denied = await fetch(`${base}/api/admin/workflow-assessments`)
  check('Anonymous queue access denied and never cached', denied.status === 401 && denied.headers.get('cache-control') === 'no-store')
  browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, args: ['--no-first-run','--disable-background-networking'] })
  const page = await browser.newPage(); const errors = [];page.on('pageerror', e => errors.push(e.message))
  await page.setViewport({ width: 1440, height: 1100 })
  await page.goto(`${base}/law-firm-workflows`, { waitUntil: 'networkidle0' })
  const buttons = await page.$$('button');
  for (const b of buttons) if ((await b.evaluate(el => el.textContent)) === 'File linked') await b.click()
  await page.waitForFunction(() => document.body.textContent.includes('Ready for file review'))
  check('Fictional interaction updates without claiming inspection', await page.evaluate(() => document.body.textContent.includes('A metadata match is not proof.')))
  check('Desktop has no horizontal overflow', await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth))
  await page.screenshot({ path: `${output}/desktop.png`, fullPage: true })
  await page.setViewport({ width: 390, height: 844 })
  check('Mobile has no horizontal overflow', await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth))
  await page.screenshot({ path: `${output}/mobile.png`, fullPage: true })
  await page.type('form input[autocomplete="name"]', 'Mira Vale')
  await page.type('form input[autocomplete="email"]', 'mira@example.com')
  await page.type('form input[autocomplete="organization"]', 'Fictional Operations Firm')
  const selects = await page.$$('form select');await selects[0].select('documents');await selects[1].select('chasing');await selects[2].select('unknown')
  await page.click('form input[type="checkbox"]')
  await new Promise(r=>setTimeout(r,2100)) // respect the intentional bot time trap
  dropCreateReply = true
  const responseStatuses = [];page.on('response', r=>{if(r.url()===`${base}/api/workflow-assessment`&&r.request().method()==='POST')responseStatuses.push(r.status())});
  const payloads = [];page.on('request', r => { if (r.url() === `${base}/api/workflow-assessment` && r.method() === 'POST') payloads.push(JSON.parse(r.postData())) })
  await page.click('form button[type="submit"]');await page.waitForSelector('[role="alert"]')
  check('Lost storage reply shows error, not a false receipt', responseStatuses[0]===503 && (await redis(['LLEN','nyclaw:workflow-assessments:v1:queue']))===1 && await page.evaluate(() => !document.body.textContent.includes('Request received')))
  await page.click('form button[type="submit"]');await page.waitForSelector('[role="status"]')
  check('Retry preserves public UUID and creates one durable record', responseStatuses[1]===200 && payloads.length === 2 && payloads[0].requestId === payloads[1].requestId && await redis(['LLEN','nyclaw:workflow-assessments:v1:queue']) === 1)
  const reference = payloads[0].requestId
  const key = `nyclaw:workflow-assessments:v1:record:${reference}`
  const ttlBefore = await redis(['TTL',key]);check('Record expires within 30 days', ttlBefore > 29*86400 && ttlBefore <= 30*86400)
  const conflict = await fetch(`${base}/api/workflow-assessment`, { method: 'POST', headers: {'content-type':'application/json','x-forwarded-for':'198.51.100.88'}, body:JSON.stringify({...payloads[0],firm:'Changed Fictional Firm'}) })
  check('Changed replay rejected', conflict.status === 409)
  const list = await fetch(`${base}/api/admin/workflow-assessments`, {headers:{authorization:auth}});const listBody=await list.json()
  check('Authorized operator sees the actual saved request without digest', list.status===200 && listBody.items.length===1 && listBody.items[0].reference===reference && !('digest' in listBody.items[0]))
  const foreign = await fetch(`${base}/api/admin/workflow-assessments/${reference}`,{method:'POST',headers:{authorization:auth,'content-type':'application/json',origin:'https://elsewhere.example'},body:'{"status":"reviewing"}'})
  check('Cross-origin mutation denied',foreign.status===403)
  await page.goto(`${base}/admin/workflow-assessments`,{waitUntil:'networkidle0'})
  check('Locked operator HTML contains no inquiry',await page.evaluate(()=>document.querySelectorAll('article').length===0&&!document.body.textContent.includes('Fictional Operations Firm')))
  await page.type('input[type="password"]','fictional-local-review');await page.click('form button[type="submit"]')
  await page.waitForSelector('article');check('Browser operator unlock displays saved firm',await page.$eval('article',el=>el.textContent.includes('Fictional Operations Firm')))
  const statusSelect=await page.$('article select');assert(statusSelect,'status select');await statusSelect.select('reviewing')
  const saveButtons=await page.$$('article button');for(const b of saveButtons)if((await b.evaluate(el=>el.textContent)).includes('Save'))await b.click()
  await page.waitForFunction(()=>document.body.textContent.includes('status updated'))
  const current=JSON.parse(await redis(['GET',key]));check('Operator status update reaches real Redis and preserves expiry',current.status==='reviewing' && (await redis(['TTL',key]))<=ttlBefore)
  await page.screenshot({path:`${output}/operator.png`,fullPage:true})
  holdList=true
  const all=await page.$$('button');for(const b of all)if((await b.evaluate(el=>el.textContent)).includes('Refresh'))await b.click()
  const lock=await page.$$('button');for(const b of lock)if((await b.evaluate(el=>el.textContent)).startsWith('Lock'))await b.click()
  await new Promise(r=>setTimeout(r,1800));check('Late queue response cannot restore inquiry after Lock',await page.evaluate(()=>!document.body.textContent.includes('mira@example.com')&&!document.body.textContent.includes('Fictional Operations Firm')))
  offline=true;const red=await fetch(`${base}/api/workflow-assessment/health`);check('Storage outage makes readiness red',red.status===503 && !(await red.json()).ready)
  check('Production-mode page has no runtime errors',errors.length===0)
  await writeFile(`${output}/results.json`,JSON.stringify({classification:'PRIVATE',observedAt:new Date().toISOString(),runtime:'production Next; official Redis8.2.10 on loopback; fictional REST bridge; no Upstash integration claim',results,errors},null,2)+'\n')
  console.log(JSON.stringify({passed:results.filter(r=>r.pass).length,total:results.length,output}))
} catch (error) {
  await writeFile(`${output}/results.json`, JSON.stringify({classification:'PRIVATE', observedAt:new Date().toISOString(), results, failure:String(error)},null,2)+'\n');throw error
} finally {
  if(browser)await browser.close()
  await new Promise(resolve=>bridge.close(resolve))
}
