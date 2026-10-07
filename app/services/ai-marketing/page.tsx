// classification: PUBLIC
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Megaphone,
  PenTool,
  Funnel,
  Mail,
  MessageSquare,
  BarChart2,
  Globe,
} from 'lucide-react'
import { ServiceJsonLd, FAQJsonLd } from '../../components/JsonLd'
import ServiceHero from '../../components/ServiceHero'
import StatStrip from '../../components/StatStrip'
import CapabilityGrid from '../../components/CapabilityGrid'
import OodaPanel from '../../components/OodaPanel'
import ResultsCards from '../../components/ResultsCards'
import PricingPair from '../../components/PricingPair'
import IndustryChips from '../../components/IndustryChips'
import FaqSection from '../../components/FaqSection'
import CtaPanel from '../../components/CtaPanel'

export const metadata: Metadata = {
  title: 'AI Marketing Automations & Agents',
  description:
    'NYClaw.io builds marketing workflows for small businesses: inquiry routing, follow-up drafts, approved content and clear measurement. Westchester County and NYC.',
  keywords:
    'AI marketing automation, AI lead generation agents, content engine build, AI email automation, AI marketing westchester, marketing automation agency',
  openGraph: {
    title: 'AI Marketing Automations & Agents | NYClaw.io',
    description:
      'Give inquiries a clear next step with scoped follow-ups, content review and reporting.',
    url: 'https://nyclaw.io/services/ai-marketing',
    siteName: 'NYClaw.io',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Marketing Automations | NYClaw.io',
    description:
      'Scoped marketing workflows for inquiries, follow-ups and content review.',
  },
  alternates: {
    canonical: 'https://nyclaw.io/services/ai-marketing',
  },
}

const stats = [
  { raw: 'Scope', label: 'Agree the workflow' },
  { raw: 'Review', label: 'Approve content' },
  { raw: 'Route', label: 'Name the next owner' },
  { raw: 'Measure', label: 'Check actual results' },
]

const capabilities = [
  {
    Icon: PenTool,
    title: 'Content drafting',
    desc: 'Prepare posts, emails or page copy from an agreed brief for your team to edit and approve.',
  },
  {
    Icon: Funnel,
    title: 'Inquiry capture',
    desc: 'Collect the details your team needs, record the source and assign a clear next step.',
  },
  {
    Icon: Mail,
    title: 'Email and SMS follow-ups',
    desc: 'Draft or send agreed messages when a defined event occurs, with approval where your team needs it.',
  },
  {
    Icon: MessageSquare,
    title: 'Response routing',
    desc: 'Help visitors reach the right person or form and surface questions that need a human answer.',
  },
  {
    Icon: Globe,
    title: 'Publishing workflow',
    desc: 'Keep drafts, approvals and publishing steps visible across the channels included in scope.',
  },
  {
    Icon: BarChart2,
    title: 'Simple reporting',
    desc: 'Agree which inquiry and follow-up events to track, then compare actual results with the starting baseline.',
  },
]

const ooda = [
  {
    letter: '1',
    label: 'Trace an inquiry',
    timeline: 'Scope',
    desc: 'Show us how a new inquiry arrives, who replies and where the conversation can stall.',
  },
  {
    letter: '2',
    label: 'Set review points',
    timeline: 'Design',
    desc: 'Agree which messages can be drafted, who approves them and when a person takes over.',
  },
  {
    letter: '3',
    label: 'Agree the scope',
    timeline: 'Quote',
    desc: 'Choose the channels, triggers, owners and measurements for the first build.',
  },
  {
    letter: '4',
    label: 'Test and hand off',
    timeline: 'Delivery',
    desc: 'We test the agreed examples with your team and document how to review, pause or change the workflow.',
  },
]

const results = [
  {
    metric: 'Review',
    label: 'Content approval',
    desc: 'See the draft, owner and approval decision before a message is published.',
  },
  {
    metric: 'Follow-up',
    label: 'A clear next step',
    desc: 'Check whether an inquiry has an owner, a response and an exception for staff to resolve.',
  },
  {
    metric: 'Measure',
    label: 'Actual performance',
    desc: 'Compare real inquiry and follow-up activity with the baseline after launch.',
  },
]

const plans = [
  {
    name: 'Marketing System Build',
    price: '$4K–12K',
    unit: 'fixed scope',
    desc: 'A scoped inquiry, follow-up or content-review workflow for your team.',
    items: [
      'Agreed channels, messages and review steps',
      'Inquiry and follow-up workflow',
      'Tests for agreed triggers and exceptions',
      'Handoff instructions and team walkthrough',
    ],
  },
  {
    name: 'Optional Operation',
    price: '$1K–3K',
    unit: '/mo or rev share',
    desc: 'Separately scoped help after launch, if your team wants it.',
    items: [
      'Agreed publishing and follow-up support',
      'Reporting against agreed measures',
      'Review and iteration within the care scope',
      'Team can also use the handoff independently',
    ],
  },
]

const faqs = [
  {
    question: 'What can a marketing workflow change?',
    answer:
      'It can connect an inquiry form to a record, assign a person to reply and prepare an approved follow-up. We agree the steps and review points in scope, then measure what actually changes.',
  },
  {
    question: 'How much do AI marketing automations cost?',
    answer:
      'Marketing system builds are listed at $4,000–$12,000. Optional operation after launch is $1,000–$3,000 per month or a separately agreed revenue-share arrangement. The project scope and price are agreed before the build.',
  },
  {
    question: 'What kind of content does the AI produce?',
    answer:
      'Depending on the agreed scope, it can draft posts, emails, page copy or other messages from examples and a brief your team provides. A named reviewer checks factual claims, voice and fit before publishing.',
  },
  {
    question: 'How will we tell whether it helps?',
    answer:
      'We agree a starting baseline and the events worth tracking, such as inquiries received, replies sent and handoffs completed. After launch, your team can compare actual activity with that baseline. Timing depends on the workflow and traffic.',
  },
  {
    question: 'Will the content sound like it was written by AI?',
    answer:
      'Your team supplies examples and guidance. Drafts need a human check for accuracy, tone and approvals before they go live.',
  },
  {
    question: 'Can I approve content before it goes live?',
    answer:
      'Yes. We can set a review step so a named person approves content before publishing. The workflow also needs a way to pause or correct a message.',
  },
]

export default function AIMarketingPage() {
  return (
    <>
      <ServiceJsonLd
        name="AI Marketing Automations & Agents"
        description="Scoped marketing workflows for small businesses: inquiry routing, follow-up drafts, content approval and measurement."
        url="https://nyclaw.io/services/ai-marketing"
      />
      <FAQJsonLd items={faqs} />

      <ServiceHero
        badge="Marketing"
        BadgeIcon={Megaphone}
        titleTop="Make the next customer"
        titleAccent="conversation easier to start."
        lede="Forms, follow-ups and content your team can keep track of."
        blurb="If an inquiry lands in a busy inbox, the response needs an owner and a next step. We connect intake and follow-up, help prepare the message and show your team what needs attention."
        primary={{ label: 'Tell us where work gets stuck', href: '/#contact' }}
        secondary={{ label: 'See what we build', href: '#what-we-build' }}
      />

      <StatStrip items={stats} />

      <CapabilityGrid
        id="what-we-build"
        title="What we build"
        blurb="Choose the inquiry, follow-up or content handoff that needs a clearer owner. The build is limited to the agreed channels and tools."
        items={capabilities}
      />

      <OodaPanel
        title="From inquiry to an agreed next step"
        blurb="We map the current handoff, agree the review points, then test the workflow with your team."
        steps={ooda}
        note="Ongoing reporting and changes can be scoped after launch if your team wants support."
      />

      <ResultsCards
        title="What your team can check"
        blurb="These checkpoints make the workflow visible. Business results depend on your offer, audience and follow-through."
        items={results}
      />

      <PricingPair
        title="Project build, optional operation"
        blurb="We agree the build scope first. Ongoing operation is a separate decision after launch."
        plans={plans}
        note="Every engagement starts as a fixed project quote."
      />

      <IndustryChips blurb="For small teams that need a clearer path from inquiry to reply, or from draft to approved publication." />

      <FaqSection
        blurb="Common questions about marketing workflows for small businesses."
        items={faqs}
      />

      <section className="px-6 pb-12">
        <div className="mx-auto max-w-[64rem] border-t border-white/10 pt-7">
          <p className="text-sm text-zinc-400">Built for our own businesses</p>
          <Link href="/work#own-operations" className="mt-2 inline-block text-base font-medium text-cyan-300 underline underline-offset-4">See our creative, email and content workflows</Link>
        </div>
      </section>

      <CtaPanel
        title="Where do inquiries wait for a reply?"
        blurb="Tell us the channel, the current handoff and who should own the next step. We'll assess a scoped build."
        primary={{ label: 'Tell us where work gets stuck', href: '/#contact' }}
        footer={
          <>
            Or explore:{' '}
            <Link
              href="/services/ai-automation"
              className="text-white underline underline-offset-4"
            >
              Custom agents
            </Link>{' '}
            &middot;{' '}
            <Link
              href="/services/ai-consulting"
              className="text-white underline underline-offset-4"
            >
              Fit audit + roadmap
            </Link>
          </>
        }
      />
    </>
  )
}
