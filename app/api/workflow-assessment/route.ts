// classification: PUBLIC
import { isIP } from 'node:net'
import { NextRequest, NextResponse } from 'next/server'
import { createRateLimiter } from '../../../lib/rate-limit'
import { assessmentSchema, type PublicAssessmentResponse } from '../../../lib/workflow-assessment'
import { boundedText, reviewConfigured } from '../../../lib/workflow-assessment-admin'
import { createAssessment } from '../../../lib/workflow-assessment-store'

export const dynamic = 'force-dynamic'
const limit = createRateLimiter({ name: 'workflow-assessment', max: 5, windowMs: 60 * 60 * 1000 })
const json = (body: object, status: number) => NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } })

function clientKey(req: NextRequest): string {
  const forwarded = req.headers.get('x-vercel-forwarded-for') || req.headers.get('x-forwarded-for') || ''
  const address = forwarded.split(',')[0].trim()
  return address.length <= 45 && isIP(address) ? address : 'unknown'
}

export async function POST(req: NextRequest) {
  if (!reviewConfigured()) return json({ error: 'Request intake is temporarily unavailable.' }, 503)
  const rate = await limit.limit(clientKey(req))
  if (!rate.allowed) return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429, headers: { 'Cache-Control': 'no-store', 'Retry-After': String(Math.max(1, Math.ceil((rate.resetAt - Date.now()) / 1000))) } })
  const raw = await boundedText(req, 2048)
  if (raw === null) return json({ error: 'Invalid request.' }, 400)
  let body: unknown
  try { body = JSON.parse(raw) } catch { return json({ error: 'Invalid request.' }, 400) }
  const parsed = assessmentSchema.safeParse(body)
  if (!parsed.success) return json({ error: 'Check the required fields and try again.' }, 400)
  if (parsed.data.website) return json({ ok: true }, 202) // honeypot: no storage or reference
  const elapsed = Date.now() - parsed.data.ts
  if (elapsed < 2000 || elapsed > 30 * 24 * 60 * 60 * 1000) return json({ error: 'Refresh the form and try again.' }, 400)
  try {
    const result = await createAssessment(parsed.data)
    if (result === 'conflict') return json({ error: 'This request reference was already used. Refresh the form and try again.' }, 409)
    if (result === 'full') return json({ error: 'Request intake is temporarily unavailable.' }, 503)
    const response: PublicAssessmentResponse = { ok: true, reference: parsed.data.requestId, status: 'received' }
    return json(response, result === 'created' ? 201 : 200)
  } catch {
    return json({ error: 'Request intake is temporarily unavailable.' }, 503)
  }
}
