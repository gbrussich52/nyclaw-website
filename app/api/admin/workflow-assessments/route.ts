// classification: PUBLIC
import { NextRequest, NextResponse } from 'next/server'
import { adminAuthorized, adminRate, reviewConfigured } from '../../../../lib/workflow-assessment-admin'
import { listAssessments } from '../../../../lib/workflow-assessment-store'

export const dynamic = 'force-dynamic'
const json = (body: object, status: number) => NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } })

export async function GET(req: NextRequest) {
  if (!reviewConfigured()) return json({ error: 'Review is unavailable.' }, 503)
  const authorized = adminAuthorized(req)
  const rate = await adminRate(req, authorized)
  if (!rate.allowed) return NextResponse.json({ error: 'Too many requests.' }, { status: 429, headers: { 'Cache-Control': 'no-store', 'Retry-After': String(Math.max(1, Math.ceil((rate.resetAt - Date.now()) / 1000))) } })
  if (!authorized) return NextResponse.json({ error: 'Authentication required.' }, { status: 401, headers: { 'Cache-Control': 'no-store', 'WWW-Authenticate': 'Basic realm="NYClaw Workflow Assessments"' } })
  try {
    const items = await listAssessments()
    return json({ items, count: items.length }, 200)
  } catch { return json({ error: 'Review storage is unavailable.' }, 503) }
}
