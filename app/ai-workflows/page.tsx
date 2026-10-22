// classification: PUBLIC
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, ArrowDown, Check } from 'lucide-react'
import { CALENDLY_URL, FREE_AUDIT_LABEL } from '../config'
import WorkflowKits from './WorkflowKits'
import WorkflowFit from './WorkflowFit'
import fitStyles from './WorkflowFit.module.css'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Free AI Workflow Kits for Small Business',
  description: "Try quote follow-up, invoice comparison and order handoff with fictional examples. Inspect findings and draft previews before connecting your systems.",
  alternates: { canonical: 'https://nyclaw.io/ai-workflows' },
  openGraph: {
    title: 'Free AI Workflow Kits | NYClaw.io',
    description: "Try quote follow-up, invoice comparison and order handoff with fictional examples. Inspect findings and draft previews before connecting your systems.",
    url: 'https://nyclaw.io/ai-workflows',
    siteName: 'NYClaw.io',
    type: 'website',
    images: ["https://nyclaw.io/opengraph-image"],
  },
  twitter: {"card":"summary_large_image","title":"Free AI Workflow Kits for Small Business","description":"Try quote follow-up, invoice comparison and order handoff with fictional examples. Inspect findings and draft previews before connecting your systems.","images":["https://nyclaw.io/opengraph-image"]},
}

export default function AIWorkflowsPage() {
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <p className={styles.eyebrow}><span aria-hidden="true" /> Free AI workflow kits</p>
        <h1>Try a workflow before<br className={styles.desktopBreak} /> you connect it.</h1>
        <p className={styles.lede}>Check a quote, compare an invoice, or prepare an order handoff. Start with a small record and see which facts support the next step.</p>
        <div className={styles.heroActions}><a href="#try-workflow" className={styles.primaryLink}>Try a workflow <ArrowDown size={16} aria-hidden="true" /></a><a href="#workflow-fit" className={styles.textLink}>Get my workflow plan</a></div>
        <p className={styles.heroNote}>Fictional examples. Computed in this page. No accounts connected or messages sent.</p>
      </header>

      <WorkflowKits />

      <nav className={fitStyles.workflowGuides} aria-label="Workflow guides">
        <p className={styles.kicker}>Explore one workflow in detail</p>
        <div className={fitStyles.workflowCards}>
          <Link href="/ai-workflows/quote-followup"><span>For sales coordinators</span><h2>Quote follow-up <ArrowUpRight size={16} aria-hidden="true" /></h2><p>Check contact timing, quote terms, and when a reminder should stop.</p></Link>
          <Link href="/ai-workflows/invoice-discrepancies"><span>For billing coordinators</span><h2>Invoice differences <ArrowUpRight size={16} aria-hidden="true" /></h2><p>Compare supplied totals and define who reviews a mismatch.</p></Link>
          <Link href="/ai-workflows/order-handoff"><span>For operations coordinators</span><h2>Order handoff <ArrowUpRight size={16} aria-hidden="true" /></h2><p>Reconcile payment, production, and shipment before the next step.</p></Link>
        </div>
      </nav>

      <WorkflowFit />

      <section className={styles.nextSteps} aria-labelledby="next-step-title">
        <div className={styles.sectionIntro}><p className={styles.kicker}>Choose the right next step</p><h2 id="next-step-title">A useful starting point.<br />A separate scope for your business.</h2></div>
        <div className={styles.nextStepColumns}>
          <div className={styles.freeScope}><h3>Use the free kits</h3><p>Run a kit with an AI assistant that supports local MCP tools. Supply a small, structured record and review the findings and draft yourself.</p><ul><li><Check size={15} aria-hidden="true" /> Defined checks for three workflows</li><li><Check size={15} aria-hidden="true" /> Source fields alongside each finding</li><li><Check size={15} aria-hidden="true" /> A hold when information needs review</li></ul><p className={styles.finePrint}>The kits are free. Your chosen AI client may require its own subscription or charge for model use.</p><a href="#install-kit" className={styles.textLink}>See install instructions <ArrowUpRight size={14} aria-hidden="true" /></a></div>
          <div className={styles.paidScope}><h3>Connect your actual workflow</h3><p>We check your existing tools, access, approval rules, and failure handling before scoping an implementation. Start with one handoff and a named reviewer.</p><p>A written scope and fee come before paid work. Ongoing monitoring or maintenance is agreed separately.</p><div className={styles.nextActions}><Link href="/#contact" className={styles.primaryLink}>Tell us what’s stuck <ArrowUpRight size={15} aria-hidden="true" /></Link><a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className={styles.textLink}>{FREE_AUDIT_LABEL}</a></div><Link href="/services/ai-automation" className={styles.subtleLink}>See workflow implementation services</Link></div>
        </div>
      </section>

      <section className={styles.legalRoute} aria-labelledby="legal-route-title"><div><h2 id="legal-route-title">Working with legal intake or documents?</h2><p>Start with the law-firm Workflow Blueprint. It maps one administrative handoff, the permissions it needs, and the decisions your staff retain.</p></div><Link href="/law-firm-workflows#request-blueprint" className={styles.textLink}>Request a blueprint review <ArrowUpRight size={16} aria-hidden="true" /></Link></section>

      <section className={styles.questions} aria-labelledby="kit-questions"><h2 id="kit-questions">Before you use a kit</h2><div>
        <details><summary>What is connected in this example?</summary><p>Nothing. This page runs defined checks on fictional records in your browser. It does not connect to your accounting software, inbox, CRM, or ordering system.</p></details>
        <details><summary>What happens when a record is incomplete?</summary><p>The kit reports a review state and the fields that need attention. A ready result means the supplied facts pass the kit’s checks; your team still reviews the next step.</p></details>
        <details><summary>Will the kit send a message or change a record?</summary><p>No. These kits analyze supplied records and prepare draft text. They do not send messages, make payments, or update your systems. Any real connection and action needs a separate implementation and approval path.</p></details>
      </div></section>
    </div>
  )
}
