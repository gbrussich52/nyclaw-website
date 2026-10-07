// classification: PUBLIC
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Settings2,
  CalendarCheck,
  Users,
  Mail,
  Database,
  FileText,
  PhoneCall,
} from 'lucide-react'
import { ServiceJsonLd, FAQJsonLd } from '../../components/JsonLd'
import ServiceHero from '../../components/ServiceHero'
import StatStrip from '../../components/StatStrip'
import CapabilityGrid from '../../components/CapabilityGrid'
import OodaPanel from '../../components/OodaPanel'
import DeliverablesChecklist from '../../components/DeliverablesChecklist'
import PricingPair from '../../components/PricingPair'
import IndustryChips from '../../components/IndustryChips'
import FaqSection from '../../components/FaqSection'
import CtaPanel from '../../components/CtaPanel'

export const metadata: Metadata = {
  title: 'Custom AI Agents & Workflow Automation',
  description:
    'NYClaw.io builds scoped workflow automations and AI agents for small businesses in Westchester County and NYC, with tested handoffs and team documentation.',
  keywords:
    'custom AI agents, AI workflow automation small business, AI agency westchester, CRM automation, AI automation NYC, agent development',
  openGraph: {
    title: 'Custom AI Agents & Workflow Automation | NYClaw.io',
    description:
      'Connect the steps between forms, records and invoices. Agree the scope, test the handoffs and give your team a clear way to review exceptions.',
    url: 'https://nyclaw.io/services/ai-automation',
    siteName: 'NYClaw.io',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom AI Agents & Automation | NYClaw.io',
    description:
      'Scoped agents and workflow automations for small businesses, with optional care after handoff.',
  },
  alternates: {
    canonical: 'https://nyclaw.io/services/ai-automation',
  },
}

const stats = [
  { raw: '$3.5K+', label: 'Agent sprints from' },
  { raw: 'Fixed', label: 'Scope agreed first' },
  { raw: 'Tested', label: 'Handoffs before launch' },
  { raw: 'Optional', label: 'Care after launch' },
]

const capabilities = [
  {
    Icon: CalendarCheck,
    title: 'Scheduling & appointments',
    desc: 'Keep booking details, confirmations and changes together. Agree which exceptions go back to a person.',
  },
  {
    Icon: Users,
    title: 'CRM & client management',
    desc: 'Move approved form details into the right record and show your team what needs review.',
  },
  {
    Icon: Mail,
    title: 'Follow-up sequences',
    desc: 'Prepare follow-ups from agreed triggers, with a review step where your team needs one.',
  },
  {
    Icon: Database,
    title: 'Data entry & processing',
    desc: 'Reduce re-entry between forms, emails, job records and invoices when the source data is clear.',
  },
  {
    Icon: FileText,
    title: 'Document generation',
    desc: 'Draft a proposal, billing packet or report from approved information for a person to check.',
  },
  {
    Icon: PhoneCall,
    title: 'Customer communication',
    desc: 'Route common inquiries and collect the details staff need for the next conversation.',
  },
]

const ooda = [
  {
    letter: '1',
    label: 'Trace the work',
    timeline: 'Scope',
    desc: 'Show us one job from first request to final handoff. We record where information is copied or lost.',
  },
  {
    letter: '2',
    label: 'Check your tools',
    timeline: 'Feasibility',
    desc: 'We check native features and available connections, then agree what people should still approve.',
  },
  {
    letter: '3',
    label: 'Agree the build',
    timeline: 'Quote',
    desc: 'You get a fixed scope, price, delivery plan and a baseline for checking whether the work improved.',
  },
  {
    letter: '4',
    label: 'Test and hand off',
    timeline: 'Delivery',
    desc: 'We test normal cases and exceptions with your team, then leave instructions for running the workflow.',
  },
]

const included = [
  'A written scope for one agreed workflow and its handoffs',
  'A check of native features and the connections your tools allow',
  'The agent or automation agreed in your project scope',
  'A review path for missing information and exceptions',
  'Tests using agreed examples before the workflow goes live',
  'Team walkthrough and written handoff instructions',
  'A baseline and a way to check actual results after launch',
  'Optional care scoped separately after delivery',
]

const plans = [
  {
    name: 'Agent Sprint',
    price: '$3.5K–8K',
    unit: 'fixed scope',
    desc: 'One scoped agent, tested with your team and handed off.',
    items: [
      'Agreed workflow and review steps',
      'Agent build for the scoped task',
      'Connection and exception tests',
      'Team walkthrough and runbook',
    ],
  },
  {
    name: 'Workflow System',
    price: '$5K–15K',
    unit: 'project',
    desc: 'Connected handoffs across tools, with optional care after delivery.',
    items: [
      '2–3 connected automations',
      'Process map and agreed connections',
      'Exception handling and documentation',
      'Optional care scoped after handoff',
    ],
  },
]

const faqs = [
  {
    question: 'How much do custom AI agents and automations cost?',
    answer:
      'Agent sprints are listed at $3,500–$8,000 and multi-step workflow systems at $5,000–$15,000. The quote depends on the systems, access and review steps involved. We agree the fixed scope and price before work begins. Care after launch is optional.',
  },
  {
    question: 'How long does a build take?',
    answer:
      'The schedule is part of the written scope. We first check tool access and the handoffs involved, then set time for building, testing with your team and training.',
  },
  {
    question: 'What tools and platforms do you integrate with?',
    answer:
      'We assess the tools already in use, including forms, email, calendars, CRMs and billing software. Native features may cover the job. Where a connection is needed, we verify access and feasibility before including it in the quote.',
  },
  {
    question: 'Is this a product install or a custom build?',
    answer:
      'We start with the job and the tools you have. The recommendation may use a native feature, configuration or a custom connection. A build includes the agreed tests and a documented handoff.',
  },
  {
    question: 'What happens if something breaks or needs updating?',
    answer:
      'We document how to spot and handle exceptions, and agree the post-launch fix window in the project scope. Ongoing monitoring and changes can be scoped separately.',
  },
  {
    question: 'Do I need any technical knowledge?',
    answer:
      'Your team needs to show us the current work and review test cases. We provide a walkthrough and handoff instructions for the workflow we build.',
  },
]

export default function AIAutomationPage() {
  return (
    <>
      <ServiceJsonLd
        name="Custom AI Agents & Workflow Automation"
        description="NYClaw.io scopes and builds agents and workflow automations for small businesses, tests the agreed handoffs and provides team documentation."
        url="https://nyclaw.io/services/ai-automation"
      />
      <FAQJsonLd items={faqs} />

      <ServiceHero
        badge="Workflow automation"
        BadgeIcon={Settings2}
        titleTop="Spend less time copying"
        titleAccent="the same details around."
        lede="Connect the steps between a request, a job record and an invoice."
        blurb="When the same details need to move from a form to a customer record or an invoice, we check what your existing tools can do. Where a connection is missing, we build and test it. Your team knows which results need a review."
        primary={{ label: 'Tell us where work gets stuck', href: '/#contact' }}
        secondary={{ label: 'See how it works', href: '#how-it-works' }}
      />

      <StatStrip items={stats} />

      <CapabilityGrid
        title="What we automate"
        blurb="A repeated handoff is a good place to start. We agree the exact work and review points before quoting a build."
        items={capabilities}
      />

      <OodaPanel
        id="how-it-works"
        title="From one handoff to a working system"
        blurb="We begin with the work your team does today and agree how to tell whether the new workflow helps."
        steps={ooda}
        note="After launch, compare actual results with the starting baseline. Further changes and monitoring can be scoped separately."
      />

      <DeliverablesChecklist
        title="What a scoped build includes"
        blurb="The exact connections depend on your tools. The agreed scope names the deliverables and review steps."
        items={included}
        note="Price depends on integrations and complexity. Every project gets a fixed quote before work begins."
      />

      <PricingPair
        title="Project pricing"
        blurb="We price the work after checking the systems and approvals involved, then agree the fixed scope before building."
        plans={plans}
        note="Care after launch is optional and scoped separately."
      />

      <IndustryChips blurb="We work with small teams whose information moves between forms, records, inboxes and billing tools." />

      <FaqSection
        blurb="Common questions about AI workflow automation for small businesses."
        items={faqs}
      />

      <section className="px-6 pb-12">
        <div className="mx-auto max-w-[64rem] border-t border-white/10 pt-7">
          <p className="text-sm text-zinc-400">See related client work</p>
          <Link href="/work#valentine-family-electric" className="mt-2 inline-block text-base font-medium text-cyan-300 underline underline-offset-4">See the electrical contractor example</Link>
        </div>
      </section>

      <CtaPanel
        title="Where does your team enter the same information twice?"
        blurb="Describe the handoff and the tools involved. We'll identify what to check before quoting a project."
        primary={{ label: 'Tell us where work gets stuck', href: '/#contact' }}
        footer={
          <>
            Or explore:{' '}
            <Link
              href="/services/ai-consulting"
              className="text-white underline underline-offset-4"
            >
              Fit audit + roadmap
            </Link>{' '}
            &middot;{' '}
            <Link
              href="/services/ai-marketing"
              className="text-white underline underline-offset-4"
            >
              Marketing automations
            </Link>
          </>
        }
      />
    </>
  )
}
