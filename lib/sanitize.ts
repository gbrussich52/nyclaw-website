/**
 * Sanitize a string value for use in email headers and content.
 *
 * Strips characters that enable XSS (<>"') and CRLF sequences that
 * enable email header injection (\r\n). Truncates to 500 chars.
 */
export function sanitize(val: unknown): string {
  if (typeof val !== 'string') return ''
  return val.replace(/[<>"'\r\n]/g, '').slice(0, 500).trim()
}
