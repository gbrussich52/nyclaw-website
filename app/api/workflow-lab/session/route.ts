// classification: PUBLIC
import { NextRequest } from 'next/server'
import { z } from 'zod'
import { fixtureSignIn, LAB_COOKIE, labFailure, labResponse, labRpc, localLab, personaSchema, sameOrigin } from '@/lib/workflow-lab-server'
export const dynamic = 'force-dynamic'
const schema = z.strictObject({ persona: personaSchema })

export async function GET(request: NextRequest) {
  if (!localLab(request)) return labResponse({ error: 'prototype_unavailable' }, 404)
  if (!request.cookies.get(LAB_COOKIE)?.value) return labResponse({ session: null })
  try { return labResponse({ session: await labRpc(request, 'describe_session') }) } catch (error) { return labFailure(error) }
}

export async function POST(request: NextRequest) {
  if (!localLab(request)) return labResponse({ error: 'prototype_unavailable' }, 404)
  if (!sameOrigin(request)) return labResponse({ error: 'origin_denied' }, 403)
  if (Number(request.headers.get('content-length') || 0) > 2048) return labResponse({ error: 'invalid_request' }, 400)
  const input = schema.safeParse(await request.json().catch(() => null))
  if (!input.success) return labResponse({ error: 'invalid_request' }, 400)
  try {
    const token = await fixtureSignIn(request, input.data.persona)
    const response = labResponse({ ok: true })
    response.cookies.set(LAB_COOKIE, token, { httpOnly: true, sameSite: 'strict', secure: false, path: '/api/workflow-lab', maxAge: 3600 })
    return response
  } catch (error) { return labFailure(error) }
}

export async function DELETE(request: NextRequest) {
  if (!localLab(request)) return labResponse({ error: 'prototype_unavailable' }, 404)
  if (!sameOrigin(request)) return labResponse({ error: 'origin_denied' }, 403)
  const response = labResponse({ ok: true })
  response.cookies.set(LAB_COOKIE, '', { httpOnly: true, sameSite: 'strict', path: '/api/workflow-lab', maxAge: 0 })
  return response
}
