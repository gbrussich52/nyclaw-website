// classification: PUBLIC
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Target,
  Search,
  FileBarChart,
  TrendingUp,
  Lightbulb,
  ListChecks,
  Presentation,
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
import { CALENDLY_URL } from '../../config'

export const metadata: Metadata = {
  title: 'AI Fit Audit & Strategy Roadmap',
  description:
    'Start with a free 30-minute call about one stuck workflow. An optional paid roadmap sets out the work, assumptions and build order.',
  keywords:
    'AI consulting small business, AI fit audit, AI roadmap, AI strategy westchester, AI agency consulting, automation roadmap',
  openGraph: {
    title: 'AI Fit Audit & Strategy Roadmap | NYClaw.io',
    description:
      'Start with one workflow and your existing tools. Get a free fit call or a written roadmap with a clear build order.',
    url: 'https://nyclaw.io/services/ai-consulting',
    siteName: 'NYClaw.io',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Fit Audit & Roadmap | NYClaw.io',
    description:
      'Free 30-minute fit call. Optional written roadmap with scope, assumptions and build order.',
  },
  alternates: {
    canonical: 'https://nyclaw.io/services/ai-consulting',
  },
}

const stats = [
  { raw: '30 min', label: 'Free fit call' },
  { raw: '$1K+', label: 'Full roadmap from' },
  { raw: 'Written', label: 'Roadmap available' },
  { raw: 'Credit', label: 'Toward eligible build' },
]

const capabilities = [
  {
    Icon: Search,
    title: 'Trace the current work',
    desc: 'We follow the agreed workflows, talk to the people who do the work and note where handoffs slow down.',
  },
  {
    Icon: FileBarChart,
    title: 'Map the options',
    desc: 'For each scoped workflow, we check native features, available tools and the work a custom connection would add.',
  },
  {
    Icon: TrendingUp,
    title: 'State the assumptions',
    desc: 'We record the current effort, estimated build cost and assumptions behind any savings estimate. Actual results need measurement after launch.',
  },
  {
    Icon: Lightbulb,
    title: 'Relevant market notes',
    desc: 'Where useful, we review public examples of how comparable teams handle the same work.',
  },
  {
    Icon: ListChecks,
    title: 'Practical build order',
    desc: 'A 30/60/90-day plan names what to configure, buy, build or leave manual, subject to your team and tool access.',
  },
  {
    Icon: Presentation,
    title: 'Live walkthrough',
    desc: 'We walk your team through the written plan and record the session as part of the paid roadmap.',
  },
]

const ooda = [
  {
    letter: '1',
    label: 'Choose the workflow',
    timeline: 'Fit call',
    desc: 'Tell us which handoff is stuck and who owns it. We agree whether a deeper review would help.',
  },
  {
    letter: '2',
    label: 'Check the options',
    timeline: 'Review',
    desc: 'For a paid roadmap, we review the tools and constraints with your team, then test simpler options first.',
  },
  {
    letter: '3',
    label: 'Write the plan',
    timeline: 'Roadmap',
    desc: 'The plan sets out build order, estimated costs and the assumptions behind any expected savings.',
  },
  {
    letter: '4',
    label: 'Walk it through',
    timeline: 'Handoff',
    desc: 'We review the recommendations together and hand over the agreed documents and recording.',
  },
]

const deliverables = [
  'Operations review for the workflows agreed in scope',
  'Opportunity map with effort, benefit assumptions and constraints',
  'Relevant public competitor and industry notes',
  'Prioritized implementation roadmap (30/60/90 day)',
  'Tool and platform recommendations with estimated costs',
  'Review and fallback risks for each recommended change',
  'Diagram of the proposed connections between your tools',
  'Executive summary with key findings and recommendations',
  'Live walkthrough presentation with your team',
  'Recorded session for future reference',
]

const plans = [
  {
    name: '30-Min Fit Audit',
    price: 'Free',
    unit: 'live call',
    desc: 'Discuss one stuck workflow and whether it warrants a deeper review.',
    items: [
      'One workflow to examine',
      'Initial questions about tools and access',
      'A next-step recommendation',
      'No paid work without a separate scope',
    ],
  },
  {
    name: 'Full Roadmap',
    price: '$1K–2.5K',
    unit: 'written plan',
    desc: 'Written plan with assumptions and build order. Fee credits toward projects over $3,500.',
    items: [
      'Operations review & opportunity matrix',
      'Benefit estimates with stated assumptions',
      'Competitor / industry notes',
      'Tool recommendations & build order',
      'Walkthrough with your team',
    ],
  },
]

const faqs = [
  {
    question: 'What is the free 30-minute fit audit?',
    answer:
      'A short call about one workflow, the tools involved and what your team needs from the handoff. We discuss whether a written roadmap or a project scope would be useful.',
  },
  {
    question: 'What is included in the full roadmap?',
    answer:
      'The optional full roadmap ($1,000–$2,500) includes the agreed operations review, opportunity map, relevant market notes, tool recommendations and build order. Any benefit estimate names its assumptions. The written plan is yours to use.',
  },
  {
    question: 'Can NYClaw also build the recommended workflow?',
    answer:
      'Yes, if the recommendation calls for a build. We quote implementation separately after checking the systems and access involved. A roadmap can also recommend a native feature or an existing tool.',
  },
  {
    question: 'Do I need a roadmap before a build?',
    answer:
      'No. If the workflow is already clear, we can discuss a project scope after the free call. The paid roadmap is for teams that need a written review before building. Roadmap fees credit toward builds over $3,500.',
  },
  {
    question: 'Do I have to buy a monthly retainer?',
    answer:
      'No. The roadmap and any later build are scoped projects. Ongoing care can be agreed separately after a system is live.',
  },
  {
    question: 'Is this only for Westchester County?',
    answer:
      'No. We are based in Westchester County, NY, and serve NYC, the tri-state area, and remote clients nationwide. Local clients can do in-person discovery when useful.',
  },
]

export default function AIConsultingPage() {
  return (
    <>
      <ServiceJsonLd
        name="AI Fit Audit & Strategy Roadmap"
        description="Free 30-minute fit calls and optional paid roadmaps for small businesses. Review one workflow, the available tools and the assumptions behind a build order."
        url="https://nyclaw.io/services/ai-consulting"
      />
      <FAQJsonLd items={faqs} />

      <ServiceHero
        badge="Workflow planning"
        BadgeIcon={Target}
        titleTop="Know what is"
        titleAccent="worth changing."
        lede="Start with one workflow and the people who know it."
        blurb="Use a free 30-minute call to describe the work. If you need a written plan, we scope a paid roadmap with options, costs and the assumptions behind each recommendation."
        primary={{ label: 'Book a free 30-minute call', href: CALENDLY_URL }}
        secondary={{ label: 'See what you get', href: '#what-you-get' }}
      />

      <StatStrip items={stats} />

      <CapabilityGrid
        id="what-you-get"
        title="What you get"
        blurb="The paid roadmap records what your team does today, what your tools allow and what each proposed change depends on."
        items={capabilities}
      />

      <OodaPanel
        title="How a roadmap comes together"
        blurb="The fit call comes first. We agree the paid roadmap scope, price and timing before a deeper review."
        steps={ooda}
        note="Roadmap fees credit toward any build over $3,500."
      />

      <DeliverablesChecklist
        title="What ships with the paid roadmap"
        blurb="These documents make the recommendation reviewable. The free call is a conversation; the written deliverables belong to the separately scoped roadmap."
        items={deliverables}
        note="Full roadmap fees credit toward any custom agent or automation project over $3,500."
      />

      <PricingPair
        title="Call first, written plan if useful"
        blurb="The fit call is free. A roadmap is an optional paid project, and implementation has its own scope."
        plans={plans}
        note="Strategy and builds are project-based. Ongoing support is optional."
      />

      <IndustryChips blurb="For small teams deciding which repeated handoff to improve, and how much work the change would take." />

      <FaqSection
        blurb="Common questions about the audit and roadmap process."
        items={faqs}
      />

      <section className="px-6 pb-12">
        <div className="mx-auto max-w-[64rem] border-t border-white/10 pt-7">
          <p className="text-sm text-zinc-400">See related client work</p>
          <Link href="/work#byram-mason" className="mt-2 inline-block text-base font-medium text-cyan-300 underline underline-offset-4">See the building supplier example</Link>
        </div>
      </section>

      <CtaPanel
        title="Bring one handoff that needs a clearer plan."
        blurb="On a free 30-minute call, we'll discuss the work, the tools and who reviews the result."
        primary={{ label: 'Book a free 30-minute call', href: CALENDLY_URL, external: true }}
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
              href="/law-firm-workflows"
              className="text-white underline underline-offset-4"
            >
              Law-firm workflow assessment
            </Link>
          </>
        }
      />
    </>
  )
}
