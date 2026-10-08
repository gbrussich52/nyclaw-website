// classification: PUBLIC
/** Real local browser/Auth/Postgres flow, plus explicit transport fault injection.
 * Manual replay gate; no schedule, external records or messaging.
 */
import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'
import puppeteer from 'puppeteer-core'
import { localRuntime } from './workflow-lab-runtime.mjs'
const base = 'http://127.0.0.1:3120'
const output = process.env.WORKFLOW_LAB_OUTPUT
assert(output, 'Set WORKFLOW_LAB_OUTPUT to a private artifact directory')
await mkdir(output, { recursive: true })
const results = [], errors = []
const check = (name, pass) => { results.push({ name, pass: Boolean(pass) }); assert(pass, name) }
const runtime = localRuntime()
// Only dedicated fictional action tables are reset, never real intake or Auth.
runtime.resetFixtures()
let browser, page
try {
  browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, args: ['--no-first-run', '--disable-background-networking'] })
  page = await browser.newPage()
  page.on('pageerror', error => errors.push(error.message))
  await page.setViewport({ width: 1440, height: 1050 })
  await page.goto(`${base}/workflow-lab`, { waitUntil: 'networkidle0' })
  await page.waitForSelector('button[aria-label="Open Aster as staff"]')
  check('Initial HTML/browser shows fictional local role chooser', await page.evaluate(() => document.body.textContent.includes('Fictional prototype') && !document.body.textContent.includes('ASTER-DEMO-01')))
  await page.screenshot({ path: `${output}/sign-in.png`, fullPage: true })
  async function textButton(text) {
    await page.waitForFunction(text => [...document.querySelectorAll('button')].some(button => button.textContent.trim() === text && !button.disabled), { timeout: 8000 }, text)
    const found = await page.evaluateHandle(text => [...document.querySelectorAll('button')].find(button => button.textContent.trim() === text), text)
    const button = found.asElement(); assert(button, `Missing button: ${text}`)
    // The marketing header is fixed; a fully intersecting button can still be
    // behind it. Scroll deliberately before a real pointer click, never call .click() in JS.
    await button.evaluate(element => element.scrollIntoView({ block: 'center', behavior: 'instant' }))
    assert(await button.evaluate(element => {
      const box = element.getBoundingClientRect()
      return element.contains(document.elementFromPoint(box.x + box.width / 2, box.y + box.height / 2))
    }), `Action covered by another element: ${text}`)
    await button.click(); await found.dispose()
  }
  async function open(persona) {
    await page.click(`button[aria-label="Open ${persona}"]`)
    await page.waitForFunction(() => document.body.textContent.includes('Matter queue'))
  }
  async function choose(label) {
    const button = await page.evaluateHandle(label => [...document.querySelectorAll('aside button')].find(button => button.textContent.includes(label)), label)
    assert(button.asElement(), `Missing checklist: ${label}`); await button.asElement().click(); await button.dispose()
    await page.waitForFunction(() => !document.body.textContent.includes('Loading the latest server receipt'))
  }
  await open('Aster as staff')
  check('Actual scoped workspace contains five Aster cases and no Birch record', await page.evaluate(() => document.querySelectorAll('aside button').length === 5 && !document.body.textContent.includes('BIRCH-DEMO-01')))
  const cookies = await page.cookies(`${base}/api/workflow-lab/state`)
  const authCookie = cookies.find(cookie => cookie.name === 'nyclaw-workflow-lab')
  check('Actual user session is HttpOnly and SameSite Strict', authCookie?.httpOnly && authCookie?.sameSite === 'Strict')
  check('Session token is absent from browser storage', await page.evaluate(() => localStorage.length === 0 && sessionStorage.length === 0))
  await choose('ASTER-DEMO-02')
  check('Complete checklist offers no enabled prepare action', await page.evaluate(() => document.body.textContent.includes('No missing items in this checklist.') && ![...document.querySelectorAll('button')].some(button => button.textContent === 'Prepare follow-up draft' && !button.disabled)))
  await choose('ASTER-DEMO-03')
  check('Uncertain record holds drafting for staff clarification', await page.evaluate(() => document.body.textContent.includes('Staff clarification comes first.')))
  await choose('ASTER-DEMO-04')
  check('Stale record holds drafting', await page.evaluate(() => document.body.textContent.includes('Staff clarification comes first.')))
  await choose('ASTER-DEMO-01')
  await textButton('Prepare follow-up draft')
  await page.waitForFunction(() => document.body.textContent.includes('Awaiting approval'))
  check('Staff prepares durable draft but cannot approve', await page.evaluate(() => document.querySelector('pre')?.textContent.includes('Signed engagement letter') && [...document.querySelectorAll('button')].find(button => button.textContent === 'Approve this draft')?.disabled))
  await page.screenshot({ path: `${output}/staff.png`, fullPage: true })
  await textButton('Switch role or firm')
  await page.waitForSelector('button[aria-label="Open Aster as reviewer"]')
  check('Switch clears firm records and draft', await page.evaluate(() => !document.body.textContent.includes('ASTER-DEMO-01') && !document.querySelector('pre')))
  await open('Aster as reviewer')
  await page.waitForFunction(() => document.body.textContent.includes('Awaiting approval'))
  await textButton('Approve this draft')
  await page.waitForFunction(() => document.body.textContent.includes('Approved for simulation'))
  check('Fresh reviewer sign-in discovers and approves the existing draft', await page.evaluate(() => document.body.textContent.includes('Reviewer approved')))
  await textButton('Run delivery simulation')
  await page.waitForFunction(() => document.body.textContent.includes('Simulation confirmed'))
  check('Simulated confirmation is visibly distinct from external delivery', await page.evaluate(() => document.body.textContent.includes('no provider contacted') && document.body.textContent.includes('not proof of external delivery')))
  check('Desktop workspace has no horizontal overflow', await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth))
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.screenshot({ path: `${output}/reviewer.png`, fullPage: true })

  // A held GET response must not restore Aster data after switching to Birch.
  let holdState = false, lostReply = false, outage = false, hangApproval = false, interceptedPrepare = 0, interceptedApproval = 0
  await page.setRequestInterception(true)
  page.on('request', async request => {
    try {
      const path = new URL(request.url()).pathname
      if (path === '/api/workflow-lab/state' && outage) return void await request.respond({ status: 503, contentType: 'application/json', body: JSON.stringify({ error: 'storage_unavailable' }) })
      if (path === '/api/workflow-lab/state' && holdState) {
        holdState = false
        const response = await fetch(request.url(), { headers: request.headers() }); const body = await response.text()
        await new Promise(resolve => setTimeout(resolve, 1500))
        if (!request.isInterceptResolutionHandled()) await request.respond({ status: response.status, contentType: 'application/json', body })
        return
      }
      if (path === '/api/workflow-lab/actions' && request.method() === 'POST' && JSON.parse(request.postData() || '{}').action === 'approve' && hangApproval) {
        hangApproval = false; interceptedApproval += 1
        const response = await fetch(request.url(), { method: 'POST', headers: request.headers(), body: request.postData(), signal: AbortSignal.timeout(30000) }); const body = await response.text()
        assert(response.ok, 'Stall injection must follow a real approved write')
        await new Promise(resolve => setTimeout(resolve, 15000))
        if (!request.isInterceptResolutionHandled()) await request.respond({ status: response.status, contentType: 'application/json', body }).catch(() => {})
        return
      }
      if (path === '/api/workflow-lab/actions' && request.method() === 'POST' && JSON.parse(request.postData() || '{}').action === 'prepare' && lostReply) {
        lostReply = false; interceptedPrepare += 1
        const response = await fetch(request.url(), { method: 'POST', headers: request.headers(), body: request.postData() }); await response.text()
        assert(response.ok, 'Transport fault must follow a real successful write')
        return void await request.respond({ status: 503, contentType: 'application/json', body: JSON.stringify({ error: 'storage_unavailable' }) })
      }
      if (!request.isInterceptResolutionHandled()) await request.continue()
    } catch { if (!request.isInterceptResolutionHandled()) await request.abort().catch(() => {}) }
  })
  holdState = true
  await textButton('Refresh receipt')
  await new Promise(resolve => setTimeout(resolve, 100))
  await textButton('Switch role or firm')
  await page.waitForSelector('button[aria-label="Open Birch as staff"]')
  await open('Birch as staff')
  await new Promise(resolve => setTimeout(resolve, 1800))
  check('Late old-firm response cannot restore cached records', await page.evaluate(() => document.querySelectorAll('aside button').length === 1 && document.body.textContent.includes('BIRCH-DEMO-01') && !document.body.textContent.includes('ASTER-DEMO-01')))
  await page.setViewport({ width: 375, height: 812 })
  check('Mobile workspace has no horizontal overflow', await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth))
  await page.screenshot({ path: `${output}/mobile.png`, fullPage: true })
  lostReply = true
  await textButton('Prepare follow-up draft')
  await page.waitForFunction(() => document.body.textContent.includes('No action was retried.'))
  check('Lost write reply recovers actual receipt without automatic mutation retry', interceptedPrepare === 1 && await page.evaluate(() => document.body.textContent.includes('Awaiting approval') && Boolean(document.querySelector('pre'))))
  check('Lost write reply still creates exactly one Birch draft', runtime.sql("select count(*) from workflow_lab.drafts where case_id='30000000-0000-4000-8000-000000000006';").trim() === '1')
  outage = true
  await textButton('Refresh receipt')
  await page.waitForSelector('[role="alert"]')
  check('Read outage keeps actions locked and exposes uncertainty', await page.evaluate(() => document.body.textContent.includes('Actions stay locked') && document.querySelector('[role="alert"]')?.textContent.length > 0 ))
  outage = false
  await textButton('Refresh receipt')
  await page.waitForFunction(() => document.body.textContent.includes('were refreshed from the workspace'))
  await textButton('Switch role or firm')
  await page.waitForSelector('button[aria-label="Open Birch as reviewer"]')
  await open('Birch as reviewer')
  await page.waitForFunction(() => document.body.textContent.includes('Awaiting approval'))
  hangApproval = true
  await textButton('Approve this draft')
  await page.waitForFunction(() => document.body.textContent.includes('timed out after 12 seconds') && document.body.textContent.includes('No action was retried.'), { timeout: 20000 })
  check('Stalled mutation deadline recovers actual approval without retry', interceptedApproval === 1 && await page.evaluate(() => document.body.textContent.includes('Approved for simulation') && ![...document.querySelectorAll('button')].find(button => button.textContent === 'Run delivery simulation')?.disabled))
  await page.click('input[name="outcome"][value="timeout"]')
  await textButton('Run delivery simulation')
  await page.waitForFunction(() => document.body.textContent.includes('Simulation unconfirmed'))
  check('Browser timeout simulation cannot claim delivery or offer automatic retry', await page.evaluate(() => document.body.textContent.includes('Do not retry automatically') && ![...document.querySelectorAll('button')].some(button => button.textContent.includes('Run delivery simulation') && !button.disabled)))
  await textButton('Sign out')
  await page.waitForSelector('button[aria-label="Open Birch as reviewer"]')
  check('Sign-out clears scoped data and browser session cookie', !(await page.cookies(`${base}/api/workflow-lab/state`)).some(cookie => cookie.name === 'nyclaw-workflow-lab') && await page.evaluate(() => !document.body.textContent.includes('BIRCH-DEMO-01')))
  check('Real browser has no uncaught runtime errors', errors.length === 0)
} catch (error) {
  const visibleText = await page?.evaluate(() => document.body.innerText).catch(() => '')
  await page?.screenshot({ path: `${output}/browser-failure.png`, fullPage: true }).catch(() => {})
  await writeFile(`${output}/browser.json`, JSON.stringify({ classification: 'PRIVATE', observedAt: new Date().toISOString(), runtime: 'development Next + actual local Supabase Auth/Postgres; explicit browser transport fault injection', results, errors, failure: String(error), visibleText }, null, 2) + '\n')
  throw error
} finally { if (browser) await browser.close() }
await writeFile(`${output}/browser.json`, JSON.stringify({ classification: 'PRIVATE', observedAt: new Date().toISOString(), runtime: 'development Next + actual local Supabase Auth/Postgres; explicit browser transport fault injection', results, errors }, null, 2) + '\n')
console.log(JSON.stringify({ passed: results.filter(result => result.pass).length, total: results.length, output }))
