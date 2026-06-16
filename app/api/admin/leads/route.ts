import { NextRequest, NextResponse } from 'next/server'
import { getLeadsFromRedis } from '@/lib/leads'

// Read leads live from Redis on every request; never statically cached.
export const dynamic = 'force-dynamic'

// Column order matches the original lead shape stored by the contact route.
const FIELDS: { key: string; label: string }[] = [
  { key: 'timestamp', label: 'Timestamp' },
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'smsConsent', label: 'SMS Consent' },
  { key: 'businessType', label: 'Business Type' },
  { key: 'challenge', label: 'Challenge' },
  { key: 'message', label: 'Message' },
]

function unauthorized(): NextResponse {
  return new NextResponse('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="NYClaw Leads", charset="UTF-8"' },
  })
}

// HTTP Basic Auth against ADMIN_PASSWORD (username ignored). Length-checked,
// constant-time-ish comparison so the check doesn't leak the password by timing.
function isAuthorized(req: NextRequest): boolean {
  const expected = process.env.ADMIN_PASSWORD
  if (!expected) return false
  const header = req.headers.get('authorization') ?? ''
  if (!header.startsWith('Basic ')) return false

  let decoded = ''
  try {
    decoded = Buffer.from(header.slice(6), 'base64').toString('utf8')
  } catch {
    return false
  }
  const idx = decoded.indexOf(':')
  const pass = idx >= 0 ? decoded.slice(idx + 1) : decoded
  if (pass.length !== expected.length) return false
  let diff = 0
  for (let i = 0; i < pass.length; i++) {
    diff |= pass.charCodeAt(i) ^ expected.charCodeAt(i)
  }
  return diff === 0
}

function csvCell(v: unknown): string {
  let s: string
  if (typeof v === 'boolean') s = v ? 'YES' : 'No'
  else s = v == null ? '' : String(v)
  // CSV/formula-injection guard: lead fields come from an untrusted public
  // form. If a cell starts with a character a spreadsheet treats as a formula
  // trigger, prefix it with a single quote so it opens as literal text.
  if (/^[=+\-@\t\r]/.test(s)) s = "'" + s
  // Then escape per RFC 4180 if it contains a delimiter, quote, or newline.
  if (/[",\n\r]/.test(s)) s = '"' + s.replace(/"/g, '""') + '"'
  return s
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  if (!isAuthorized(req)) return unauthorized()

  const leads = await getLeadsFromRedis()

  if (req.nextUrl.searchParams.get('format') === 'json') {
    return NextResponse.json({ count: leads.length, leads })
  }

  // CSV (default) — downloads and opens directly in Google Sheets / Excel.
  const header = FIELDS.map((f) => f.label).join(',')
  const rows = leads.map((lead) => FIELDS.map((f) => csvCell(lead[f.key])).join(','))
  const csv = [header, ...rows].join('\r\n') + '\r\n'

  const date = new Date().toISOString().slice(0, 10)
  return new NextResponse(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="nyclaw-leads-${date}.csv"`,
      'Cache-Control': 'no-store',
    },
  })
}
