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

export const metadata: Metadata = {
  title: 'AI Fit Audit & Strategy Roadmap',
  description:
    'NYClaw.io offers free 15-minute fit audits and paid AI roadmaps for small businesses in Westchester County and NYC. Know which custom agents and automations to build first — before you spend on a full system.',
  keywords:
    'AI consulting small business, AI fit audit, AI roadmap, AI strategy westchester, AI agency consulting, automation roadmap',
  openGraph: {
    title: 'AI Fit Audit & Strategy Roadmap | NYClaw.io',
    description:
      'Free 15-min fit audit or full roadmap. Know exactly which agents and automations to build first.',
    url: 'https://nyclaw.io/services/ai-consulting',
    siteName: 'NYClaw.io',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Fit Audit & Roadmap | NYClaw.io',
    description:
      'Free 15-min fit audit. Optional full roadmap with ROI and build order.',
  },
  alternates: {
    canonical: 'https://nyclaw.io/services/ai-consulting',
  },
}

/** Figures are the live route's own — the strip only restyles them. */
const stats = [
  { raw: '15 min', label: 'Free fit audit' },
  { raw: '$1K+', label: 'Full roadmap from' },
  { to: 10, suffix: '+', label: 'Roadmap deliverables' },
  { raw: 'Build', label: 'Credits toward project' },
]

const capabilities = [
  {
    Icon: Search,
    title: 'Full operations audit',
    desc: 'We watch workflows, review tools and talk to your team. Every process documented and evaluated for AI potential.',
  },
  {
    Icon: FileBarChart,
    title: 'AI opportunity map',
    desc: 'Every opportunity in your business ranked by ROI, implementation difficulty and impact on daily operations.',
  },
  {
    Icon: TrendingUp,
    title: 'ROI projections',
    desc: 'Dollar estimates per opportunity: cost to implement vs. annual saving. Real numbers, not vague promises.',
  },
  {
    Icon: Lightbulb,
    title: 'Competitor AI analysis',
    desc: 'How your competitors and industry peers use AI, so you know where you stand and what they are exploiting.',
  },
  {
    Icon: ListChecks,
    title: 'Prioritized build order',
    desc: 'A 30/60/90-day roadmap so you know what to build first, second and never.',
  },
  {
    Icon: Presentation,
    title: 'Live walkthrough',
    desc: 'We present findings to your team, answer every question, and hand over all deliverables — recorded.',
  },
]

const ooda = [
  {
    letter: 'O',
    label: 'Observe',
    timeline: 'Day 1–2',
    desc: 'We review operations, tools, team structure and daily workflows. Nothing assumed — everything documented.',
  },
  {
    letter: 'O',
    label: 'Orient',
    timeline: 'Day 3',
    desc: 'We analyse your context against industry benchmarks and competitor AI adoption. Where do you stand?',
  },
  {
    letter: 'D',
    label: 'Decide',
    timeline: 'Day 4–5',
    desc: 'We build the roadmap: which solutions, in what order, with ROI estimates and exact costs.',
  },
  {
    letter: 'A',
    label: 'Act',
    timeline: 'Day 5–7',
    desc: 'We present the audit, answer every question and hand over deliverables. Ready to build whenever you are.',
  },
]

const deliverables = [
  'Comprehensive business operations audit document',
  'AI opportunity matrix with ROI scoring',
  'Competitor AI landscape analysis',
  'Prioritized implementation roadmap (30/60/90 day)',
  'Tool and platform recommendations with cost breakdowns',
  'Risk assessment for each recommended automation',
  'Integration architecture diagram for your tech stack',
  'Executive summary with key findings and recommendations',
  'Live walkthrough presentation with your team',
  'Recorded session for future reference',
]

const plans = [
  {
    name: '15-Min Fit Audit',
    price: 'Free',
    unit: 'live call',
    desc: 'Name the #1 workflow and whether a custom agent or automation is worth building.',
    items: [
      'One ranked opportunity',
      'Tooling & access checklist',
      'Yes / no on a sprint build',
      'Plain-English ROI sketch',
    ],
  },
  {
    name: 'Full Roadmap',
    price: '$1K–2.5K',
    unit: 'written plan',
    desc: 'Written plan with ROI and build order. Credits toward projects over $3,500.',
    items: [
      'Operations review & opportunity matrix',
      'ROI scoring per opportunity',
      'Competitor / industry notes',
      'Tool recommendations & build order',
      'Walkthrough with your team',
    ],
  },
]

const faqs = [
  {
    question: 'What is the free 15-minute fit audit?',
    answer:
      'A short call to identify the #1 workflow worth automating and whether a custom agent or automation build makes sense. No pitch deck. If it is a fit, we outline a fixed-scope project. If it is not, we will say so.',
  },
  {
    question: 'What is included in the full roadmap?',
    answer:
      'The optional full roadmap ($1,000–$2,500) includes a deeper operations review, prioritized opportunity map with ROI, competitor AI notes, tool recommendations, and a clear build order. You walk away knowing what to build first — whether you hire us or not.',
  },
  {
    question: 'How is NYClaw.io different from other AI consultants?',
    answer:
      'Most consultants sell decks and leave. We are an AI agency that designs and builds the agents and automations we recommend. Every roadmap feeds a real project scope. We cap active builds so every engagement gets senior attention.',
  },
  {
    question: 'Do I need a roadmap before a build?',
    answer:
      'Not if you already know the workflow. Skip straight to a project quote. The free 15-min fit audit is enough for many clients. The paid roadmap is for teams that want a written plan before investing in a multi-agent system. Roadmap fees credit toward builds over $3,500.',
  },
  {
    question: 'Do I have to buy a monthly retainer?',
    answer:
      'No. Strategy and builds are project-based. Optional care or fractional strategy support is only if you want ongoing help after systems are live.',
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
        description="Free 15-minute fit audits and paid AI roadmaps for small businesses. Know which custom agents and automations to build first. NYClaw.io AI agency — Westchester County and NYC."
        url="https://nyclaw.io/services/ai-consulting"
      />
      <FAQJsonLd items={faqs} />

      <ServiceHero
        badge="Strategy"
        BadgeIcon={Target}
        titleTop="Fit audit & roadmap"
        titleAccent="before you build"
        lede="Know which agent or automation to build first — and what to skip."
        blurb="Start with a free 15-minute fit audit. Need a deeper plan? We deliver a prioritized roadmap with ROI and build order — before you invest in a full custom system."
        primary={{ label: 'Book free 15-min audit', href: '/#contact' }}
        secondary={{ label: 'See what you get', href: '#what-you-get' }}
      />

      <StatStrip items={stats} />

      <CapabilityGrid
        id="what-you-get"
        title="What you get"
        blurb="Not a generic slide deck. A deep dive into your business with specific, actionable recommendations backed by real numbers."
        items={capabilities}
      />

      <OodaPanel
        title="How we run the audit"
        blurb="The OODA Loop keeps us fast and systematic. Originally built for military decision-making, adapted for AI strategy."
        steps={ooda}
        note="Roadmap fees credit toward any build over $3,500."
      />

      <DeliverablesChecklist
        title="What ships with the audit"
        blurb="Every audit includes 10+ deliverables designed to be immediately actionable — whether you hire us to build or take it elsewhere."
        items={deliverables}
        note="Full roadmap fees credit toward any custom agent or automation project over $3,500."
      />

      <PricingPair
        title="Simple, transparent pricing"
        blurb="Free fit call first. Optional written roadmap. Builds are separate projects — no monthly lock-in."
        plans={plans}
        note="Strategy and builds are project-based. Ongoing support is optional."
      />

      <IndustryChips blurb="If you run a small business and want to understand where AI fits your operations, this audit is for you." />

      <FaqSection
        blurb="Common questions about the audit and roadmap process."
        items={faqs}
      />

      <CtaPanel
        title="Ready to see where AI fits your business?"
        blurb="Book a free 15-minute fit audit — no pitch deck, no hour-long sales call. Just clarity on the #1 thing to build."
        primary={{ label: 'Book free 15-min audit', href: '/#contact' }}
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
