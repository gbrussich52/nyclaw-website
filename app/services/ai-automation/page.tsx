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
    'NYClaw.io is an AI agency that designs and builds custom agents and workflow automations for small businesses in Westchester County and NYC. Project-based sprints from $3,500 — no monthly lock-in.',
  keywords:
    'custom AI agents, AI workflow automation small business, AI agency westchester, CRM automation, AI automation NYC, agent development',
  openGraph: {
    title: 'Custom AI Agents & Workflow Automation | NYClaw.io',
    description:
      'We design and build custom agents and automations — not a template install. Project-based, scoped, delivered.',
    url: 'https://nyclaw.io/services/ai-automation',
    siteName: 'NYClaw.io',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom AI Agents & Automation | NYClaw.io',
    description:
      'Custom agents and workflow automations for small businesses — project-based, no monthly required.',
  },
  alternates: {
    canonical: 'https://nyclaw.io/services/ai-automation',
  },
}

/** Figures are the live route's own — the strip only restyles them. */
const stats = [
  { raw: '$3.5K+', label: 'Agent sprints from' },
  { raw: 'Sprint', label: 'Project delivery' },
  { to: 40, suffix: '%', label: 'Avg. cost reduction' },
  { raw: '0', label: 'Monthly required' },
]

const capabilities = [
  {
    Icon: CalendarCheck,
    title: 'Scheduling & appointments',
    desc: 'Booking systems that handle availability, confirmations, reminders and rescheduling — no human needed.',
  },
  {
    Icon: Users,
    title: 'CRM & client management',
    desc: 'Automatic lead capture, contact updates, deal stage tracking and activity logging across your CRM.',
  },
  {
    Icon: Mail,
    title: 'Follow-up sequences',
    desc: 'Personalized email and SMS follow-ups triggered by client actions — sent at the right time, every time.',
  },
  {
    Icon: Database,
    title: 'Data entry & processing',
    desc: 'AI reads, categorizes and enters data from forms, invoices, emails and documents into your systems.',
  },
  {
    Icon: FileText,
    title: 'Document generation',
    desc: 'Proposals, invoices, contracts and reports generated from templates using your live business data.',
  },
  {
    Icon: PhoneCall,
    title: 'Customer communication',
    desc: 'Chatbots and voicebots that answer common questions, route inquiries and collect information 24/7.',
  },
]

const ooda = [
  {
    letter: 'O',
    label: 'Observe',
    timeline: 'Week 1',
    desc: 'We audit your operations end to end. Every process, tool and manual task documented — and where time is wasted.',
  },
  {
    letter: 'O',
    label: 'Orient',
    timeline: 'Week 1',
    desc: 'We analyse your industry, competitors, tools and constraints to find the highest-ROI opportunities.',
  },
  {
    letter: 'D',
    label: 'Decide',
    timeline: 'Week 1–2',
    desc: 'A prioritized roadmap with exact costs, expected savings and timeline for each workflow.',
  },
  {
    letter: 'A',
    label: 'Act',
    timeline: 'Week 2–4',
    desc: 'We build, test, deploy and optimize. You get working automations, training and documentation.',
  },
]

const included = [
  'Workflow design and success metrics',
  'Custom agent or automation build (not a stock template)',
  'CRM integration (HubSpot, Salesforce, GoHighLevel, etc.)',
  'Email and calendar platform integration',
  'Scheduling system setup and configuration',
  'SMS and messaging automation',
  'Testing across all workflows end-to-end',
  'Team training and video walkthrough',
  'Documentation and runbook handoff',
  'Optional care plan after go-live (never required to start)',
]

const plans = [
  {
    name: 'Agent Sprint',
    price: '$3.5K–8K',
    unit: 'fixed scope',
    desc: 'One mission-critical agent, live and handed off.',
    items: [
      'Workflow design & success metrics',
      'Custom agent build (not a template)',
      'Integrations, testing & training',
      'Runbook handoff — no monthly required',
    ],
  },
  {
    name: 'Workflow System',
    price: '$5K–15K',
    unit: 'project',
    desc: 'Multi-step automations across tools, optional care after.',
    items: [
      '2–3 connected automations',
      'Process map & architecture',
      'Error handling & documentation',
      'Optional care plan after go-live',
    ],
  },
]

const faqs = [
  {
    question: 'How much do custom AI agents and automations cost?',
    answer:
      'Most agent sprints run $3,500–$8,000 fixed scope. Multi-step workflow systems typically run $5,000–$15,000 as a project. Price depends on integrations and complexity. Every engagement gets a fixed quote before work begins. Monthly care is optional after go-live — never required to start.',
  },
  {
    question: 'How long does a build take?',
    answer:
      'Many first agents ship in a focused multi-day sprint once scope and access are clear. Larger multi-agent systems take longer and are priced as a project. We use the OODA Loop (Observe → Orient → Decide → Act) so every build starts with the highest-ROI workflow.',
  },
  {
    question: 'What tools and platforms do you integrate with?',
    answer:
      'We integrate with the tools you already use: Google Workspace, Microsoft 365, HubSpot, Salesforce, GoHighLevel, Calendly, Acuity, QuickBooks, Slack, Twilio, and many more. If your tool has an API, we can connect it. No need to switch platforms.',
  },
  {
    question: 'Is this a product install or a custom build?',
    answer:
      'Custom build. We design and create automations and agents around your real workflows — not a one-size product install. You get systems built for how your team works, with a documented handoff.',
  },
  {
    question: 'What happens if something breaks or needs updating?',
    answer:
      'Every project includes a short post-launch window for fixes. Optional care plans cover monitoring, updates, and small changes if you want us to stay on. You can also run the system yourself with the runbook we leave behind.',
  },
  {
    question: 'Do I need any technical knowledge?',
    answer:
      'Zero. We handle the entire build and train your team. Every system ships with documentation and walkthroughs. If your team can use email and a browser, they can use what we build.',
  },
]

export default function AIAutomationPage() {
  return (
    <>
      <ServiceJsonLd
        name="Custom AI Agents & Workflow Automation"
        description="NYClaw.io designs and builds custom AI agents and workflow automations for small businesses. Project-based sprints — not a template product install."
        url="https://nyclaw.io/services/ai-automation"
      />
      <FAQJsonLd items={faqs} />

      <ServiceHero
        badge="AI agency · custom builds"
        BadgeIcon={Settings2}
        titleTop="Custom AI agents &"
        titleAccent="workflow automation"
        lede="We design and build systems — not install a product."
        blurb="Agents and automations for scheduling, follow-ups, CRM, intake and ops — built around how your team already works. Project-scoped, delivered with a handoff."
        primary={{ label: 'Start a project', href: '/#contact' }}
        secondary={{ label: 'See how it works', href: '#how-it-works' }}
      />

      <StatStrip items={stats} />

      <CapabilityGrid
        title="What we automate"
        blurb="If your team does it more than once, we can probably automate it. These are the workflows we build most."
        items={capabilities}
      />

      <OodaPanel
        id="how-it-works"
        title="How we build your automation"
        blurb="We use the OODA Loop — a military decision-making framework adapted for AI implementation. It keeps us fast, systematic and focused on ROI."
        steps={ooda}
        note="Then we loop — monitoring and improving as the business evolves."
      />

      <DeliverablesChecklist
        title="What's included in every build"
        blurb="A complete, production-ready system — not a half-baked prototype. Here is exactly what ships."
        items={included}
        note="Price depends on integrations and complexity. Every project gets a fixed quote before work begins."
      />

      <PricingPair
        title="Transparent, predictable pricing"
        blurb="No hidden fees, no surprise invoices. You know what you are paying before we write a single line of code."
        plans={plans}
        note="Monthly is never required to start."
      />

      <IndustryChips blurb="Any small business with repetitive processes can benefit. These are the industries we serve most." />

      <FaqSection
        blurb="Common questions about AI workflow automation for small businesses."
        items={faqs}
      />

      <CtaPanel
        title="Ready for a custom agent or automation?"
        blurb="Tell us the workflow that burns the most time. We'll scope a fixed project — or start with a free 15-minute fit audit."
        primary={{ label: 'Start a project', href: '/#contact' }}
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
