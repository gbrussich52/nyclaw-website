// classification: PUBLIC
import { NextRequest } from 'next/server'
import { z } from 'zod'
import { labFailure, labResponse, labRpc, localLab, sameOrigin } from '@/lib/workflow-lab-server'
export const dynamic = 'force-dynamic'
const uuid = z.string().uuid()
const schema = z.discriminatedUnion('action', [
  z.strictObject({ action: z.literal('prepare'), caseId: uuid, requestId: uuid }),
  z.strictObject({ action: z.literal('approve'), draftId: uuid }),
  z.strictObject({ action: z.literal('simulate'), draftId: uuid, outcome: z.enum(['confirmed', 'failed', 'timeout']) }),
  z.strictObject({ action: z.literal('receipt'), draftId: uuid }),
])
export async function POST(request: NextRequest) {
  if (!localLab(request)) return labResponse({ error: 'prototype_unavailable' }, 404)
  if (!sameOrigin(request)) return labResponse({ error: 'origin_denied' }, 403)
  if (Number(request.headers.get('content-length') || 0) > 2048) return labResponse({ error: 'invalid_request' }, 400)
  const input = schema.safeParse(await request.json().catch(() => null))
  if (!input.success) return labResponse({ error: 'invalid_request' }, 400)
  const data = input.data
  const [name, args] = data.action === 'prepare' ? ['prepare_followup_draft', { p_case_id: data.caseId, p_request_id: data.requestId }]
    : data.action === 'approve' ? ['approve_followup', { p_draft_id: data.draftId }]
    : data.action === 'simulate' ? ['simulate_delivery', { p_draft_id: data.draftId, p_outcome: data.outcome }]
    : ['get_workflow_receipt', { p_draft_id: data.draftId }]
  try { return labResponse({ result: await labRpc(request, name as string, args as Record<string, unknown>) }) }
  catch (error) { return labFailure(error) }
}
