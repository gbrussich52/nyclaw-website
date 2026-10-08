// classification: PUBLIC
import type { Metadata } from 'next'
import WorkflowLab from './WorkflowLab'

export const metadata: Metadata = {
  title: 'Missing-document workflow lab | NYClaw',
  description: 'A local prototype for reviewing fictional document checklists, preparing a follow-up, and checking a simulated delivery receipt.',
  robots: { index: false, follow: false },
}

export default function WorkflowLabPage() {
  return <WorkflowLab />
}
