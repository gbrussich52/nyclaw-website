// classification: PUBLIC
/** Browser gate for client evidence and guide receipts. All contact POSTs are mocked, on any base URL. */
import puppeteer from 'puppeteer-core'
import assert from 'node:assert/strict'
const base=process.env.UAT_BASE_URL || 'http://127.0.0.1:4388'
const browser=await puppeteer.launch({executablePath:process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true})
const results=[],errors=[]
const check=(name,pass)=>{results.push({name,pass:!!pass});assert(pass,name)}
try {
  const page=await browser.newPage();page.on('pageerror',e=>errors.push(e.message))
  await page.setViewport({width:1440,height:1000});await page.goto(base,{waitUntil:'networkidle2'})
  const approved=await page.$$eval('#work article p.flex-1',els=>els.map(e=>e.textContent))
  check('Two approved case descriptions on home',approved.length===2)
  check('Homepage case links',await page.$$eval('#work a[href^="/work#"]',a=>['/work#valentine-family-electric','/work#byram-mason'].every(href=>a.some(e=>e.getAttribute('href')===href))))
  check('Homepage links to own-operation proof',!!(await page.$('#work a[href="/work#own-operations"]')))
  for(const path of ['/work?utm_source=linkedin&utm_medium=social&utm_campaign=client_work_oct2026','/services/ai-automation','/services/ai-consulting','/blog/chatgpt-vs-ai-consultant','/resources']){
    const r=await page.goto(base+path,{waitUntil:'networkidle2'});check(path+' status',r.status()===200)
    check(path+' canonical/one main/one h1',await page.evaluate(path=>document.querySelectorAll('main').length===1&&document.querySelectorAll('h1').length===1&&new URL(document.querySelector('link[rel="canonical"]').href).pathname===path.split('?')[0],path))
    check(path+' desktop overflow',await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth))
    await page.setViewport({width:390,height:844});check(path+' mobile overflow',await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await page.setViewport({width:1440,height:1000})
    if(path.startsWith('/work')){
      check('Work page preserves exact rendered client copy',await page.evaluate(approved=>approved.every(s=>Array.from(document.querySelectorAll('article p')).some(e=>e.textContent===s)),approved))
      check('Case anchors and general questions exist',await page.evaluate(()=>['valentine-family-electric','byram-mason'].every(id=>document.getElementById(id))&&document.body.textContent.includes('General buyer questions')))
      check('Own-work examples are separate and actionable',await page.$$eval('#own-operations article',a=>a.length===4&&a.every(e=>e.textContent.includes('What we built')&&e.textContent.includes('For your business'))))
      check('Actual booking destination',await page.$$eval('a',a=>a.filter(e=>e.textContent.includes('Book a free')).every(e=>e.href==='https://calendly.com/nyclaw-io-proton/30min')))
    }else if(path.includes('/services/')||path.includes('/blog/'))check(path+' connects to real work',await page.$$eval('a[href^="/work"]',a=>a.length>0))
  }
  const sitemap=await page.goto(base+'/sitemap.xml');check('Sitemap includes work and accurate release date',(await sitemap.text()).includes('<loc>https://nyclaw.io/work</loc>')&&(await sitemap.text()).includes('2026-10-07'))
  const guide=await page.goto(base+'/ai-operators-playbook.html');const guideText=await guide.text();check('Actual guide destination works',guide.status()===200&&guideText.includes('AI Operator'));check('Guide retires unsupported pipeline/retainer claim',!guideText.includes("it's the model NYClaw.io is built on")&&!guideText.includes('real production numbers from building NYClaw.io'))
  let mode='error',writes=0;const payloads=[]
  await page.setRequestInterception(true);page.on('request',r=>{
    if(r.url()===new URL('/api/contact',base).href&&r.method()==='POST'){writes++;payloads.push(JSON.parse(r.postData()));void r.respond({status:mode==='error'?503:200,contentType:'application/json',body:mode==='error'?'{"error":"Fictional unavailable response"}':'{"success":true}'})}
    else void r.continue()
  })
  for(const kind of ['resource','playbook']){
    mode='error';await page.goto(base+(kind==='resource'?'/resources':'/'),{waitUntil:'networkidle2'})
    const section=kind==='resource'?'div.md\\:sticky':'#playbook-guide'
    if(kind==='resource'){await page.type('#firstName','Fictional Reviewer');await page.type('#email','fictional@example.com')}else await page.type('#playbook-email','fictional@example.com')
    await page.click(section+' button[type="submit"]');await page.waitForSelector(section+' [role="alert"]')
    check(kind+' failure retains email and hides receipt',await page.$eval(kind==='resource'?'#email':'#playbook-email',e=>e.value==='fictional@example.com')&&!(await page.$(section+' a[href="/ai-operators-playbook.html"]')))
    mode='success';await page.click(section+' button[type="submit"]');await page.waitForSelector(section+' a[href="/ai-operators-playbook.html"]')
    check(kind+' success exposes real guide safely',await page.$eval(section+' a[href="/ai-operators-playbook.html"]',e=>e.textContent.includes('Open the playbook')&&e.target==='_blank'&&e.rel.includes('noopener')))
    check(kind+' payload preserved',payloads.at(-1).challenge==='guide-download'&&payloads.at(-1).email==='fictional@example.com')
  }
  check('Exactly four mocked contact requests',writes===4);check('No browser runtime errors',errors.length===0)
  console.log(JSON.stringify({passed:results.length,total:results.length,mockedContactOnly:true,errors}))
}finally{await browser.close()}
