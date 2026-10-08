// classification: PUBLIC
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

export const LAB_COOKIE = 'nyclaw-workflow-lab'
export const personaSchema = z.enum(['aster_staff', 'aster_reviewer', 'birch_staff', 'birch_reviewer'])
type Persona = z.infer<typeof personaSchema>
const credentialsSchema = z.record(personaSchema, z.object({ email: z.string().email(), password: z.string().min(20) }))

/** This fixture login is deliberately unavailable outside development loopback. */
export function localLab(request: NextRequest): { url: string; key: string } | null {
  if (process.env.NODE_ENV !== 'development' || process.env.WORKFLOW_LAB_ENABLED !== 'local') return null
  try {
    const host = new URL(`http://${request.headers.get('host') || ''}`)
    const url = new URL(process.env.WORKFLOW_LAB_SUPABASE_URL || '')
    const loopback = (name: string) => name === '127.0.0.1' || name === 'localhost'
    if (!loopback(host.hostname) || !loopback(url.hostname) || url.protocol !== 'http:' || url.username || url.password || url.pathname !== '/' || url.search || url.hash) return null
    const key = process.env.WORKFLOW_LAB_PUBLISHABLE_KEY
    if (!key) return null
    return { url: url.origin, key }
  } catch { return null }
}

export function sameOrigin(request: NextRequest): boolean {
  return request.headers.get('origin') === `http://${request.headers.get('host')}`
}

export function labResponse(body: unknown, status = 200): NextResponse {
  return NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' } })
}

export class LabError extends Error {
  constructor(public status: number, public code: string) { super(code) }
}

export async function labRpc(request: NextRequest, name: string, args: Record<string, unknown> = {}): Promise<unknown> {
  const config = localLab(request)
  if (!config) throw new LabError(404, 'prototype_unavailable')
  const token = request.cookies.get(LAB_COOKIE)?.value
  if (!token) throw new LabError(401, 'sign_in_required')
  let response: Response
  try {
    response = await fetch(`${config.url}/rest/v1/rpc/${name}`, {
      method: 'POST', headers: { apikey: config.key, Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', 'Content-Profile': 'workflow_lab', 'Accept-Profile': 'workflow_lab' },
      body: JSON.stringify(args), cache: 'no-store', signal: AbortSignal.timeout(8000),
    })
  } catch { throw new LabError(503, 'storage_unavailable') }
  const body = await response.json().catch(() => null)
  if (!response.ok) {
    const code = body?.code
    if (response.status === 401 || code === 'PGRST301' || code === 'PGRST302') throw new LabError(401, 'sign_in_required')
    if (code === '42501' || response.status === 403) throw new LabError(403, 'permission_denied')
    if (code === '40001' || code === '22023') throw new LabError(409, 'workflow_changed_or_action_not_allowed')
    throw new LabError(503, 'workflow_unavailable')
  }
  if (body === null) throw new LabError(503, 'invalid_storage_reply')
  return body
}

export async function fixtureSignIn(request: NextRequest, persona: Persona): Promise<string> {
  const config = localLab(request)
  if (!config) throw new LabError(404, 'prototype_unavailable')
  let credentials: z.infer<typeof credentialsSchema>
  try { credentials = credentialsSchema.parse(JSON.parse(process.env.WORKFLOW_LAB_PERSONAS_JSON || '')) } catch { throw new LabError(503, 'fixture_accounts_unavailable') }
  let response: Response
  try {
    response = await fetch(`${config.url}/auth/v1/token?grant_type=password`, {
      method: 'POST', headers: { apikey: config.key, 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials[persona]), cache: 'no-store', signal: AbortSignal.timeout(8000),
    })
  } catch { throw new LabError(503, 'sign_in_unavailable') }
  const body = await response.json().catch(() => null)
  if (!response.ok || typeof body?.access_token !== 'string') throw new LabError(503, 'sign_in_unavailable')
  return body.access_token
}

export function labFailure(error: unknown): NextResponse {
  return error instanceof LabError ? labResponse({ error: error.code }, error.status) : labResponse({ error: 'workflow_unavailable' }, 503)
}
