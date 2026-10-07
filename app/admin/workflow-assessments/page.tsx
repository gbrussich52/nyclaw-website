// classification: PUBLIC
import type { Metadata } from 'next'
import WorkflowAssessmentQueue from './WorkflowAssessmentQueue'
import styles from './workflow-assessments.module.css'

export const metadata: Metadata = {
  title: 'Workflow assessment queue',
  robots: { index: false, follow: false },
}

export default function WorkflowAssessmentQueuePage() {
  return (
    <section className={styles.page} aria-labelledby="assessment-queue-title">
      <div className={styles.shell}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>NYCLAW · PRIVATE OPERATIONS</p>
          <h1 id="assessment-queue-title">Workflow assessment queue</h1>
          <p className={styles.intro}>
            Review incoming requests and record the current handling status. This queue does not
            track payment, delivery, or client acceptance.
          </p>
        </header>
        <WorkflowAssessmentQueue />
      </div>
    </section>
  )
}
