// classification: PUBLIC
import { NextRequest, NextResponse } from 'next/server'
import { adminAuthorized, adminRate, boundedText, reviewConfigured, sameOrigin } from '../../../../../lib/workflow-assessment-admin'
import { assessmentUpdateSchema } from '../../../../../lib/workflow-assessment'
import { readAssessment, updateAssessment } from '../../../../../lib/workflow-assessment-store'

export const dynamic = 'force-dynamic'
const json = (body: object, status: number) => NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } })
const validRef = (value: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value)
type Context = { params: Promise<{ reference: string }> }

async function guard(req: NextRequest): Promise<NextResponse | null> {
  if (!reviewConfigured()) return json({ error: 'Review is unavailable.' }, 503)
  const authorized = adminAuthorized(req)
  const rate = await adminRate(req, authorized)
  if (!rate.allowed) return NextResponse.json({ error: 'Too many requests.' }, { status: 429, headers: { 'Cache-Control': 'no-store', 'Retry-After': String(Math.max(1, Math.ceil((rate.resetAt - Date.now()) / 1000))) } })
  if (!authorized) return NextResponse.json({ error: 'Authentication required.' }, { status: 401, headers: { 'Cache-Control': 'no-store', 'WWW-Authenticate': 'Basic realm="NYClaw Workflow Assessments"' } })
  return null
}

export async function GET(req: NextRequest, context: Context) {
  const denied = await guard(req)
  if (denied) return denied
  const { reference } = await context.params
  if (!validRef(reference)) return json({ error: 'Invalid reference.' }, 400)
  try {
    const item = await readAssessment(reference)
    return item ? json({ item }, 200) : json({ error: 'Request not found.' }, 404)
  } catch { return json({ error: 'Review storage is unavailable.' }, 503) }
}

export async function POST(req: NextRequest, context: Context) {
  const denied = await guard(req)
  if (denied) return denied
  if (!sameOrigin(req)) return json({ error: 'Origin check failed.' }, 403)
  const { reference } = await context.params
  if (!validRef(reference)) return json({ error: 'Invalid reference.' }, 400)
  const raw = await boundedText(req, 256)
  if (raw === null) return json({ error: 'Invalid status.' }, 400)
  let body: unknown
  try {
    body = JSON.parse(raw)
  } catch { return json({ error: 'Invalid status.' }, 400) }
  const parsed = assessmentUpdateSchema.safeParse(body)
  if (!parsed.success) return json({ error: 'Invalid status.' }, 400)
  try {
    const result = await updateAssessment(reference, parsed.data.status)
    if (result.kind === 'missing') return json({ error: 'Request not found.' }, 404)
    if (result.kind === 'invalid') return json({ error: 'Status transition is not allowed.' }, 409)
    return json({ ok: true, item: result.item }, 200)
  } catch { return json({ error: 'Review storage is unavailable.' }, 503) }
}
