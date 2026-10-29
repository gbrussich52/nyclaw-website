// classification: PUBLIC
/** Browser gate for client evidence and guide receipts. All contact POSTs are mocked, on any base URL. */
import puppeteer from 'puppeteer-core'
import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'
const base=process.env.UAT_BASE_URL || 'http://127.0.0.1:4388'
const output=process.env.UAT_OUTPUT || '/private/tmp/customer-path-browser'
await mkdir(output,{recursive:true})
const browser=await puppeteer.launch({executablePath:process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true})
const results=[],errors=[],pending=new Map()
let page,phase='new page',failure
const publicPath=url=>{try{const parsed=new URL(url,base);return parsed.origin===new URL(base).origin?parsed.pathname:'[external]'}catch{return '[invalid URL]'}}
const check=(name,pass)=>{console.error('CHECK',name,!!pass);results.push({name,ok:!!pass});assert(pass,name)}
// The hero helix renders every frame, which stops Chrome from firing its own network-idle
// lifecycle event. Wait for load, then for puppeteer's request tracker to go quiet instead.
const open=async(page,url)=>{phase='load '+publicPath(url);console.error('OPEN',publicPath(url));const r=await page.goto(url,{waitUntil:'load'});phase='network idle '+publicPath(url);await page.waitForNetworkIdle({idleTime:500,concurrency:2});phase='assertions '+publicPath(url);return r}
try {
  console.error('BROWSER',await browser.version())
  page=await browser.newPage();page.on('pageerror',e=>errors.push(e.message))
  page.on('request',r=>pending.set(r,{path:publicPath(r.url()),method:r.method(),type:r.resourceType()}))
  page.on('requestfinished',r=>pending.delete(r));page.on('requestfailed',r=>pending.delete(r))
  await page.setViewport({width:1440,height:1000});await open(page,base)
  const approved=await page.$$eval('#work article p.flex-1',els=>els.map(e=>e.textContent))
  check('Two approved case descriptions on home',approved.length===2)
  check('Homepage case links',await page.$$eval('#work a[href^="/work#"]',a=>['/work#valentine-family-electric','/work#byram-mason'].every(href=>a.some(e=>e.getAttribute('href')===href))))
  check('Homepage links to own-operation proof',!!(await page.$('#work a[href="/work#own-operations"]')))
  for(const path of ['/work?utm_source=linkedin&utm_medium=social&utm_campaign=client_work_oct2026','/services/ai-automation','/services/ai-consulting','/blog/chatgpt-vs-ai-consultant','/resources']){
    const r=await open(page,base+path);check(path+' status',r.status()===200)
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
  // Leaf Open Graph/Twitter objects replace inherited image fields. Check actual rendered tags.
  for (const [path, expectedCard] of [
    ['/blog/ai-law-firm-client-intake', 'summary_large_image'],
    ['/blog/ai-automations-dental', 'summary_large_image'],
    ['/blog/chatgpt-vs-ai-consultant', 'summary_large_image'],
    ['/about', 'summary'],
    ['/work', 'summary_large_image'],
    ['/law-firm-workflows', 'summary_large_image'],
    ['/services', 'summary_large_image'],
  ]) {
    await open(page,base+path)
    const social=await page.evaluate(()=>({
      og:document.querySelector('meta[property="og:image"]')?.content,
      twitter:document.querySelector('meta[name="twitter:image"]')?.content,
      card:document.querySelector('meta[name="twitter:card"]')?.content,
    }))
    check(path+' absolute Open Graph image',social.og==='https://nyclaw.io/opengraph-image')
    check(path+' absolute Twitter image',social.twitter==='https://nyclaw.io/opengraph-image')
    check(path+' declared social card',social.card===expectedCard)
  }
  // Fetch this build's image, not production, so a stale public asset cannot mask a broken release.
  const image=await fetch(new URL('/opengraph-image',base),{signal:AbortSignal.timeout(10000)})
  const png=Buffer.from(await image.arrayBuffer())
  check('Shared social image returns a real 1200x630 PNG',image.ok&&image.headers.get('content-type')?.startsWith('image/png')&&png.length>24&&png.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]))&&png.readUInt32BE(16)===1200&&png.readUInt32BE(20)===630)
  const sitemap=await page.goto(base+'/sitemap.xml');check('Sitemap includes work and accurate release date',(await sitemap.text()).includes('<loc>https://nyclaw.io/work</loc>')&&(await sitemap.text()).includes('2026-10-07'))
  const guide=await page.goto(base+'/ai-operators-playbook.html');const guideText=await guide.text();check('Actual guide destination works',guide.status()===200&&guideText.includes('AI Operator'));check('Guide retires unsupported pipeline/retainer claim',!guideText.includes("it's the model NYClaw.io is built on")&&!guideText.includes('real production numbers from building NYClaw.io'))
  let mode='error',writes=0;const payloads=[]
  await page.setRequestInterception(true);page.on('request',r=>{
    if(r.url()===new URL('/api/contact',base).href&&r.method()==='POST'){writes++;payloads.push(JSON.parse(r.postData()));void r.respond({status:mode==='error'?503:200,contentType:'application/json',body:mode==='error'?'{"error":"Fictional unavailable response"}':'{"success":true}'})}
    else void r.continue()
  })
  for(const kind of ['resource','playbook']){
    mode='error';await open(page,base+(kind==='resource'?'/resources':'/'))
    const section=kind==='resource'?'div.md\\:sticky':'#playbook-guide'
    if(kind==='resource'){await page.type('#firstName','Fictional Reviewer');await page.type('#email','fictional@example.com')}else await page.type('#playbook-email','fictional@example.com')
    await page.click(section+' button[type="submit"]');await page.waitForSelector(section+' [role="alert"]')
    check(kind+' failure retains email and hides receipt',await page.$eval(kind==='resource'?'#email':'#playbook-email',e=>e.value==='fictional@example.com')&&!(await page.$(section+' a[href="/ai-operators-playbook.html"]')))
    mode='success';await page.click(section+' button[type="submit"]');await page.waitForSelector(section+' a[href="/ai-operators-playbook.html"]')
    check(kind+' success exposes real guide safely',await page.$eval(section+' a[href="/ai-operators-playbook.html"]',e=>e.textContent.includes('Open the playbook')&&e.target==='_blank'&&e.rel.includes('noopener')))
    check(kind+' payload preserved',payloads.at(-1).challenge==='guide-download'&&payloads.at(-1).email==='fictional@example.com'&&payloads.at(-1).source===(kind==='resource'?'resource_form':'playbook_form'))
  }
  check('Exactly four mocked contact requests',writes===4);check('No browser runtime errors',errors.length===0)
}catch(error){
  failure={message:error.message.replace(/https?:\/\/[^\s]+/g,publicPath).slice(0,1000),phase,page:page?publicPath(page.url()):undefined,pending:[...pending.values()]}
  console.error('FAILURE',JSON.stringify(failure))
  await page?.screenshot({path:output+'/failure.png',timeout:5000}).catch(()=>{})
  process.exitCode=1
}finally{
  await writeFile(output+'/report.json',JSON.stringify({ok:!failure&&results.every(x=>x.ok),checks:results,errors,failure,mockedContactOnly:true},null,2))
  await browser.close()
  console.log(JSON.stringify({passed:results.filter(x=>x.ok).length,total:results.length,mockedContactOnly:true,errors,output,...(failure?{failure}:{})}))
}
