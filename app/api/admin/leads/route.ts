import { NextRequest, NextResponse } from 'next/server'
import { getLeadsFromRedis } from '@/lib/leads'
import { createRateLimiter } from '@/lib/rate-limit'

// Read leads live from Redis on every request; never statically cached.
export const dynamic = 'force-dynamic'

// Endpoint-specific brute-force throttle, on top of the generic site-wide
// /api/* limit in middleware.ts. This endpoint returns a full PII dump behind
// a single shared password with no lockout, so it needs a much tighter cap:
// 10 attempts per 15 minutes per IP (~1 guess every 90s) instead of the
// generic 60/min shared across all API routes.
const adminLeadsLimiter = createRateLimiter({
  name: 'admin-leads',
  max: 10,
  windowMs: 15 * 60_000,
})

function getRateLimitKey(req: NextRequest): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
}

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
  const ip = getRateLimitKey(req)

  const rate = await adminLeadsLimiter.limit(ip)
  if (!rate.allowed) {
    console.error('[admin/leads] Rate limit exceeded for IP:', ip)
    const retryAfterSec = rate.resetAt
      ? Math.max(1, Math.ceil((rate.resetAt - Date.now()) / 1000))
      : 900
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429, headers: { 'Retry-After': String(retryAfterSec) } }
    )
  }

  if (!isAuthorized(req)) {
    // No password/credential in the log — IP + timestamp only, so failed
    // guesses are visible/alertable in Vercel logs without leaking secrets.
    console.error('[admin/leads] Failed authentication attempt from IP:', ip)
    return unauthorized()
  }

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
