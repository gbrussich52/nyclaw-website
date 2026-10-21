import { App } from '@modelcontextprotocol/ext-apps'
import type { ContractorResult } from './search'

declare global { interface Window { __SHORTLIST__?: ContractorResult } }
const root = document.getElementById('results')!
function element(tag: string, text?: string, parent: HTMLElement = root) {
  const el = document.createElement(tag)
  if (text) el.textContent = text
  parent.appendChild(el); return el
}
function link(text: string, url: unknown, parent: HTMLElement) {
  if (typeof url !== 'string' || url.length > 500) return
  try {
    const parsed = new URL(url)
    if (parsed.protocol !== 'https:' || parsed.username || parsed.password) return
    const el = element('a', text, parent) as HTMLAnchorElement
    el.href = parsed.href; el.target = '_blank'; el.rel = 'noopener noreferrer'
  } catch { /* Invalid source data is never converted to a clickable URL. */ }
}
function render(data: unknown) {
  root.replaceChildren()
  if (!data || typeof data !== 'object') { element('p', 'Ask for a trade, job and area to see source-backed candidates.'); return }
  const result = data as ContractorResult
  element('p', typeof result.message === 'string' ? result.message : 'Source-backed comparison')
  if (!Array.isArray(result.candidates)) return
  for (const candidate of result.candidates.slice(0, 3)) {
    if (!candidate || typeof candidate.name !== 'string') continue
    const card = element('article')
    element('h2', candidate.name, card)
    element('p', candidate.evidenceLabel, card)
    element('p', candidate.license?.label, card)
    for (const source of Array.isArray(candidate.evidence) ? candidate.evidence.slice(0, 12) : []) {
      const row = element('section', undefined, card)
      element('small', `${source.kind} · checked ${source.checkedAt}`, row)
      element('p', source.summary, row)
      link('Read source ↗', source.url, row)
    }
    link('Business website ↗', candidate.website, card)
  }
  element('h2', 'Before you hire')
  const list = element('ul')
  for (const step of Array.isArray(result.nextSteps) ? result.nextSteps.slice(0, 5) : []) element('li', step, list)
  link('Check the official license register ↗', result.verificationUrl, root)
}
if (window.__SHORTLIST__) render(window.__SHORTLIST__)
else {
  render(null)
  const app = new App({ name: 'Contractor Evidence', version: '1.0.0' }, {})
  app.ontoolresult = result => render(result.structuredContent)
  app.connect().catch(() => { root.replaceChildren(); element('p', 'Open this app in a compatible MCP Apps host to see a tool result.'); })
}
