// classification: PUBLIC
/** Editorial guard for the reviewed core marketing routes. No network or new schedule. */
import { readFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
const files = [
  'app/page.tsx', 'app/work/page.tsx', 'lib/client-work.ts', 'app/about/page.tsx', 'app/services/page.tsx',
  'app/services/ai-automation/page.tsx', 'app/services/ai-consulting/page.tsx',
  'app/services/ai-marketing/page.tsx', 'app/components/ContactForm.tsx',
  'app/components/WorkflowBlueprintOffer.tsx', 'app/components/WorkflowExplorer.tsx',
  'app/locations/new-york-city/page.tsx', 'app/locations/westchester-county/page.tsx',
  'lib/own-operations.ts', 'app/components/OwnOperationsProof.tsx', 'app/components/ResourceForm.tsx', 'app/components/PlaybookForm.tsx', 'app/resources/page.tsx',
  'app/blog/chatgpt-vs-ai-consultant/page.tsx',
]
const unsupported = [
  /avg\.?\s+cost reduction/i, /most clients (?:see|get|achieve)/i,
  /3[–-]5x/i, /within 24 hours/i, /40%/i, /10\+ hours/i, /within (?:the first )?two weeks/i, /highest[–-]ROI/i,
  /no human needed/i, /at the right time, every time/i,
  /unlock your potential|revolutionize|future[–-]proof|seamless(?:ly)?/i,
]
const errors = []
for (const file of files) {
  const text = (await readFile(file, 'utf8')).replace(/\s+/g, ' ')
  for (const phrase of unsupported) if (phrase.test(text)) errors.push(`${file}: requires evidence or a plain-language rewrite (${phrase})`)
}
const home = await readFile('app/page.tsx', 'utf8')
const caseSource = await readFile('lib/client-work.ts', 'utf8')
const cases = caseSource.match(/const work = \[([\s\S]*?)\n\]/)?.[0]
const hash = createHash('sha256').update(cases ?? '').digest('hex')
if (hash !== '8254b1a2e890f00b4f4f98aeb89b33be4566fd910eb7db1d9189c8a3067ed333') errors.push('Approved client case copy changed: obtain a reviewed factual correction before updating this guard.')
if (!home.includes("from '../lib/client-work'")) errors.push('Homepage must render approved cases from their shared source.')
const workPage = await readFile('app/work/page.tsx', 'utf8')
if (!workPage.includes("from '../../lib/client-work'")) errors.push('Work page must render approved cases from their shared source.')
const consulting = await readFile('app/services/ai-consulting/page.tsx', 'utf8')
if (/label:\s*['"]Book[^'"]*['"],\s*href:\s*['"]\/#contact['"]/.test(consulting)) errors.push('Consulting booking label points to an inquiry form.')
for (const file of ['app/page.tsx', 'app/services/page.tsx']) {
  if (!(await readFile(file, 'utf8')).includes('<WorkflowBlueprintOffer />')) errors.push(`${file}: specialist Blueprint offer missing from the wider agency.`)
}
const playbook = await readFile('public/ai-operators-playbook.html', 'utf8')
if (/it's the model NYClaw.io is built on|Your \$2,000\/month retainer has an 8x ROI|real production numbers from building NYClaw.io/.test(playbook)) errors.push('Playbook reintroduced an unsupported revenue model or outcome.')
for (const file of ['app/components/ResourceForm.tsx', 'app/components/PlaybookForm.tsx']) {
  const form = await readFile(file, 'utf8')
  if (!form.includes('href="/ai-operators-playbook.html"') || /check your inbox|guide (?:has been|will be) (?:sent|emailed)/i.test(form)) errors.push(`${file}: guide receipt must expose its actual destination, not promise missing email delivery.`)
}
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1 }
else console.log('Core copy guard passed: claim language, approved cases, booking destination, wider-offer placement.')
