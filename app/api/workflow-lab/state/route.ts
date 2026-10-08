// classification: PUBLIC
import { NextRequest } from 'next/server'
import { labFailure, labResponse, labRpc, localLab } from '@/lib/workflow-lab-server'
export const dynamic = 'force-dynamic'
export async function GET(request: NextRequest) {
  if (!localLab(request)) return labResponse({ error: 'prototype_unavailable' }, 404)
  try {
    const session = await labRpc(request, 'describe_session')
    const cases = await labRpc(request, 'list_document_exceptions')
    return labResponse({ session, cases })
  } catch (error) { return labFailure(error) }
}
