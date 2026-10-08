/** Fictional, metadata-only workflow contracts shared by the local screen/API. */
export type WorkflowRole = 'staff' | 'reviewer'
export type WorkflowSession = { workspaceId: string; workspaceName: string; userId: string; role: WorkflowRole }
export type WorkflowDocument = { label: string; status: 'received' | 'missing' | 'uncertain' }
export type WorkflowCase = { id: string; workspaceId: string; label: string; version: number; latestDraftId: string | null; observedAt: string; state: 'complete' | 'followup' | 'review'; documents: WorkflowDocument[] }
export type WorkflowEvent = { kind: string; at: string; actorId: string; detail: string }
export type WorkflowDraft = { id: string; caseId: string; caseVersion: number; status: 'prepared' | 'approved' | 'simulated_confirmed' | 'failed' | 'unconfirmed'; body: string; preparedBy: string; approvedBy: string | null; approvalExpiresAt: string | null; events: WorkflowEvent[] }
export type SimulationOutcome = 'confirmed' | 'failed' | 'timeout'

/** Missing/invalid/future observations and empty checklists require human review. */
export function classifyWorkflowCase(documents: WorkflowDocument[], observedAt: string, now = Date.now()): WorkflowCase['state'] {
  const observed = Date.parse(observedAt)
  if (!Number.isFinite(observed) || observed > now || now - observed > 7 * 86400000 || !documents.length || documents.some(d => !['received', 'missing', 'uncertain'].includes(d.status) || d.status === 'uncertain')) return 'review'
  return documents.some(d => d.status === 'missing') ? 'followup' : 'complete'
}
