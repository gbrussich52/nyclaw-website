// classification: PUBLIC
import type { Metadata } from 'next'
import { CALENDLY_URL } from '../config'
import WorkflowBlueprint from './WorkflowBlueprint'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Law Firm Workflow Blueprint',
  description: 'Map one law-firm administrative workflow, test its exceptions, and choose what to configure, automate, or keep manual. Start with a free fit call.',
  alternates: { canonical: 'https://nyclaw.io/law-firm-workflows' },
  openGraph: {
    title: 'Know what to configure before you build | NYClaw',
    description: 'A reviewable workflow blueprint for one law-firm handoff, grounded in your current tools and staff decisions.',
    url: 'https://nyclaw.io/law-firm-workflows',
    type: 'website',
  },
}

const attribution = 'utm_source=nyclaw&utm_medium=referral&utm_campaign=law_firm_workflows'
const booking = new URL(CALENDLY_URL)
new URLSearchParams(attribution).forEach((value, key) => booking.searchParams.set(key, value))
const planner = `https://legalaimcp.com/workflow-plan?${attribution}`
const documentCheck = `https://legalaimcp.com/document-check?${attribution}`

export default function LawFirmWorkflows() {
  return (
    <div className={styles.page}>
      <div className={styles.topline} aria-hidden="true" />
      <section className={styles.hero} aria-labelledby="blueprint-title">
        <div className={styles.heroCopy}>
          <p className={styles.context}>For law-firm owners and operations leads</p>
          <h1 id="blueprint-title">Know what to configure before you build.</h1>
          <p className={styles.lede}>A Workflow Blueprint makes one recurring handoff reviewable: the inputs it needs, the exceptions people must resolve, and the simplest next step your team can use.</p>
          <div className={styles.heroActions}>
            <a className={styles.primaryLink} href="#request-blueprint">Request a blueprint review</a>
            <a className={styles.secondaryLink} href={booking.toString()} target="_blank" rel="noopener noreferrer">Book a free 30-minute fit call</a>
          </div>
          <p className={styles.heroFootnote}>One administrative workflow. Agreed scope and fee only after the free fit call. Your team keeps every client and legal decision.</p>
        </div>
        <WorkflowBlueprint mode="packet" bookingUrl={booking.toString()} />
      </section>

      <section className={styles.scope} aria-labelledby="scope-title">
        <div className={styles.sectionIntro}>
          <h2 id="scope-title">A decision your team can use</h2>
          <p>The assessment starts with the software and approval path you already have. A useful result may be a native checklist, a small integration, or a clear reason to keep the step manual.</p>
        </div>
        <div className={styles.scopeRows}>
          <div><h3>Map the handoff</h3><p>One intake, document follow-up, or invoice-preparation workflow: inputs, owner, reviewer, next action and current bottleneck.</p></div>
          <div><h3>Rehearse the exceptions</h3><p>Ten fictional acceptance cases cover missing fields, duplicate records and uncertain matches. They test the proposed process without client files.</p></div>
          <div><h3>Write the recommendation</h3><p>A practical configure, buy, build or manual recommendation, with permissions, staff review, fallback and unresolved access requirements named.</p></div>
        </div>
      </section>

      <section className={styles.boundary} aria-labelledby="boundary-title">
        <div>
          <h2 id="boundary-title">Review stays with your firm.</h2>
          <p>The sample packet above uses fictional metadata. In a real workflow, approved staff verify documents, recipients, billing records and any legal or client-acceptance decision. Nothing is sent or posted by the assessment.</p>
        </div>
        <div className={styles.boundaryAside}>
          <h3>Prefer to test the shape first?</h3>
          <p>NYClaw operates LegalAIMCP. Its public tools are starting points for discussion, not an active service or proof that your software connects.</p>
          <a href={planner} target="_blank" rel="noopener noreferrer">Draft a fictional workflow plan</a>
          <a href={documentCheck} target="_blank" rel="noopener noreferrer">Try the fictional document check</a>
        </div>
      </section>

      <section className={styles.request} id="request-blueprint" aria-labelledby="request-title">
        <div className={styles.requestIntro}>
          <p className={styles.context}>Start with the bottleneck</p>
          <h2 id="request-title">Request a blueprint review</h2>
          <p>Tell us which handoff needs attention. Please use software names only. Do not include client names, case facts, files or credentials.</p>
          <p>Submitting creates a review request; it does not book a call, start paid work, or accept a client matter. You can also <a href={booking.toString()} target="_blank" rel="noopener noreferrer">book the free 30-minute fit call</a>.</p>
        </div>
        <WorkflowBlueprint mode="form" bookingUrl={booking.toString()} />
      </section>
    </div>
  )
}
