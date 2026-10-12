// PUBLIC. Actual browser checks; contact submissions are intercepted, never sent.
import puppeteer from 'puppeteer-core';
import assert from 'node:assert/strict';
import {mkdir,writeFile,readFile} from 'node:fs/promises';
const base=process.env.UAT_BASE_URL||'http://127.0.0.1:3112';
const output=process.env.UAT_OUTPUT||'/private/tmp/workflow-kits-browser';
await mkdir(output,{recursive:true});
const browser=await puppeteer.launch({executablePath:process.env.CHROME_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
const results=[],errors=[];
function check(name,ok){results.push({name,ok:!!ok});assert.ok(ok,name);}
const page=await browser.newPage();page.on('pageerror',e=>errors.push(e.message));
async function clickText(text){
 const h=await page.evaluateHandle(text=>[...document.querySelectorAll('button,a')].find(e=>e.textContent.trim()===text||e.textContent.trim().startsWith(text)),text);
 const el=h.asElement();assert.ok(el,text);await el.evaluate(e=>e.scrollIntoView({block:'center',behavior:'instant'}));await page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));await el.click();await h.dispose();
}
async function selectScenario(value){const el=await page.$(`label:has(input[name="workflow-scenario"][value="${value}"])`);assert.ok(el);await el.evaluate(e=>e.scrollIntoView({block:'center',behavior:'instant'}));await el.click();await page.waitForFunction(value=>document.querySelector(`input[name="workflow-scenario"][value="${value}"]`)?.checked,{timeout:5000},value);}
try{
 await page.setViewport({width:1440,height:1000});
 const response=await page.goto(base+'/ai-workflows',{waitUntil:'networkidle2'});
 check('Gallery HTTP200',response.status()===200);
 check('One main and one h1',await page.evaluate(()=>document.querySelectorAll('main').length===1&&document.querySelectorAll('h1').length===1));
 check('Canonical exact public route',await page.$eval('link[rel="canonical"]',e=>e.href==='https://nyclaw.io/ai-workflows'));
 check('Production CSP excludes eval',!response.headers()['content-security-policy'].includes("'unsafe-eval'"));
 check('Fictional and no connections clear',await page.evaluate(()=>document.body.innerText.includes('Fictional examples.')&&document.body.innerText.includes('No accounts connected or messages sent.')));
 for(const [recipe,label] of [['quote-followup','Quote follow-up'],['invoice-discrepancies','Invoice discrepancies'],['order-handoff','Order handoff']]){
  await clickText('0'+(['quote-followup','invoice-discrepancies','order-handoff'].indexOf(recipe)+1));
  check(recipe+' ready analysis',await page.evaluate(()=>document.body.innerText.includes('Ready for a draft')));
  await clickText('Prepare draft preview');
  check(recipe+' real draft visible and not sent',await page.evaluate(()=>document.body.innerText.includes('Draft preview')&&document.body.innerText.includes('Not sent')&&document.querySelector('[tabindex="-1"]')?.textContent==='Draft preview'));
  check(recipe+' pinned install matches selection',await page.$eval('[aria-label="Selected kit install command"]',(e,recipe)=>e.textContent.includes(recipe)&&e.textContent.includes('@0.1.4'),recipe));
  await selectScenario('uncertain');
  check(recipe+' uncertain suppresses draft',await page.evaluate(()=>document.body.innerText.includes('Needs human review')&&!document.body.innerText.includes('Draft preview')&&![...document.querySelectorAll('button')].some(e=>e.textContent.includes('Prepare draft preview'))));
  await selectScenario('no_action');
  check(recipe+' complete suppresses draft',await page.evaluate(()=>document.body.innerText.includes('No action suggested')&&!document.body.innerText.includes('Draft preview')));
 }
 await clickText('01');await selectScenario('ready');await clickText('Prepare draft preview');
 await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async()=>{throw new Error('denied')}}}));
 await clickText('Copy draft');check('Clipboard denial is recoverable',await page.evaluate(()=>document.body.innerText.includes('Copy is unavailable.')));
 await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async v=>{window.__copiedKitText=v}}}));
 await clickText('Copy draft');await page.waitForFunction(()=>document.body.innerText.includes('Draft copied.')&&window.__copiedKitText?.startsWith('UNSENT DRAFT'),{timeout:5000});check('Copy receipt follows actual promise',await page.evaluate(()=>document.body.innerText.includes('Draft copied.')&&window.__copiedKitText?.startsWith('UNSENT DRAFT')));
 const cdp=await page.createCDPSession();await cdp.send('Page.setDownloadBehavior',{behavior:'allow',downloadPath:output});
 await clickText('Download draft');check('Download reports started',await page.evaluate(()=>document.body.innerText.includes('Draft download started.')));
 await page.waitForFunction(()=>true);await new Promise(r=>setTimeout(r,200));
 const download=await readFile(output+'/quote-followup-fictional-draft.txt','utf8');check('Actual downloaded bytes match visible draft',download.startsWith('UNSENT DRAFT'));
 await page.setViewport({width:375,height:812});check('Mobile no overflow',await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:output+'/mobile.png',fullPage:true});
 await page.setViewport({width:1440,height:1000});await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:output+'/desktop.png',fullPage:true});
 for(const route of ['/services','/free-ai-starter-kit']){
  await page.goto(base+route,{waitUntil:'networkidle2'});check(route+' discoverable link',!!await page.$('a[href="/ai-workflows"]'));
 }
 await page.goto(base+'/ai-workflows',{waitUntil:'networkidle2'});
 check('Legal next step correct anchor',!!await page.$('a[href="/law-firm-workflows#request-blueprint"]'));
 await page.goto(base+'/law-firm-workflows',{waitUntil:'networkidle2'});check('Legal anchor exists',!!await page.$('#request-blueprint'));
 await page.goto(base+'/?workflow_kit=invoice-discrepancies#contact',{waitUntil:'networkidle2'});
 check('Chosen kit retained in inquiry',await page.$eval('#contact-message',e=>e.value.includes('invoice discrepancies')));
 await page.goto(base+'/?workflow_kit=unknown#contact',{waitUntil:'networkidle2'});check('Unknown kit never prefills inquiry',await page.$eval('#contact-message',e=>e.value===''));
 const sitemap=await page.goto(base+'/sitemap.xml');check('Sitemap includes gallery', (await sitemap.text()).includes('https://nyclaw.io/ai-workflows'));
 check('No browser runtime errors',errors.length===0);
} catch(e){results.push({name:'Failure: '+e.message,ok:false});await page.screenshot({path:output+'/failure.png',fullPage:true}).catch(()=>{});process.exitCode=1;}
finally{await writeFile(output+'/report.json',JSON.stringify({ok:results.every(x=>x.ok),checks:results,errors},null,2));await browser.close();console.log(JSON.stringify({passed:results.filter(x=>x.ok).length,total:results.length,output}));}
