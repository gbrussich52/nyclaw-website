// classification: PUBLIC
// Lead Leak Grader API. Reads one public homepage with a plain GET and grades
// it. It never submits a form, places a call or sends a message to the site.
import { isIP } from 'node:net'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createRateLimiter } from '../../../lib/rate-limit'
import { boundedText } from '../../../lib/workflow-assessment-admin'
import { fetchHomepage, HomepageFetchError } from '../../../lib/lead-leak/fetch-homepage'
import { gradeHomepage, type GradeResult } from '../../../lib/lead-leak/grade'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// 10 grades per hour per IP. Shared Upstash counter when configured, the
// per-instance memory fallback otherwise (see lib/rate-limit.ts).
const limiter = createRateLimiter({ name: 'lead-leak-grader', max: 10, windowMs: 60 * 60 * 1000 })

const bodySchema = z.object({ url: z.string().trim().min(1).max(2048) })

export interface LeadLeakResponse {
  ok: true
  result: GradeResult
  truncated: boolean
}

const json = (body: object, status: number, headers: Record<string, string> = {}) =>
  NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store', ...headers } })

function clientKey(req: NextRequest): string {
  const forwarded = req.headers.get('x-vercel-forwarded-for') || req.headers.get('x-forwarded-for') || ''
  const address = forwarded.split(',')[0].trim()
  return address.length <= 45 && isIP(address) ? address : 'unknown'
}

const STATUS_FOR: Record<HomepageFetchError['code'], number> = {
  'invalid-url': 400,
  'blocked-address': 400,
  'dns-failed': 422,
  'too-many-redirects': 422,
  'not-html': 422,
  'http-error': 502,
  timeout: 504,
  'network-error': 502,
}

export async function POST(req: NextRequest) {
  const rate = await limiter.limit(clientKey(req))
  if (!rate.allowed) {
    const retry = rate.resetAt ? Math.max(1, Math.ceil((rate.resetAt - Date.now()) / 1000)) : 3600
    return json({ error: 'You have graded a lot of sites this hour. Try again a little later.' }, 429, { 'Retry-After': String(retry) })
  }

  const raw = await boundedText(req, 4096)
  if (raw === null) return json({ error: 'Invalid request.' }, 400)
  let body: unknown
  try { body = JSON.parse(raw) } catch { return json({ error: 'Invalid request.' }, 400) }
  const parsed = bodySchema.safeParse(body)
  if (!parsed.success) return json({ error: 'Type a website address, like example.com.' }, 400)

  try {
    const page = await fetchHomepage(parsed.data.url)
    const response: LeadLeakResponse = { ok: true, result: gradeHomepage(page.html, page.finalUrl), truncated: page.truncated }
    return json(response, 200)
  } catch (err) {
    if (err instanceof HomepageFetchError) return json({ error: err.message, code: err.code }, STATUS_FOR[err.code])
    console.error('[lead-leak-grader] unexpected failure')
    return json({ error: 'Something went wrong on our side. Try again in a minute.' }, 500)
  }
}

export function GET() {
  return json({ error: 'Send a POST with {"url": "example.com"}.' }, 405, { Allow: 'POST' })
}
