import { WIDGET_HTML } from './widget.generated'
import type { ContractorResult } from './search'
import { createHash } from 'node:crypto'
export const WIDGET_URI = 'ui://nyclaw/contractor-shortlist-v1.html'
export function contractorWidget(result?: ContractorResult) {
  if (!result) return WIDGET_HTML
  const html = WIDGET_HTML.replace('/*PREVIEW_DATA*/', `window.__SHORTLIST__=${JSON.stringify(result).replace(/</g, '\\u003c').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029')};`)
  const script = html.match(/<script>([\s\S]*)<\/script>/)![1]
  return html.replace(/script-src 'sha256-[A-Za-z0-9+/=]+'/g, `script-src 'sha256-${createHash('sha256').update(script).digest('base64')}'`)
}
