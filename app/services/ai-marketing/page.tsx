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
    'NYClaw.io designs and builds AI marketing automations and agents for small businesses — content engines, lead funnels, and nurture systems. Project-based builds; optional ongoing operation. Westchester County and NYC.',
  keywords:
    'AI marketing automation, AI lead generation agents, content engine build, AI email automation, AI marketing westchester, marketing automation agency',
  openGraph: {
    title: 'AI Marketing Automations & Agents | NYClaw.io',
    description:
      'Custom marketing automations and agents — content, funnels, nurture. Built as projects, not a product install.',
    url: 'https://nyclaw.io/services/ai-marketing',
    siteName: 'NYClaw.io',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Marketing Automations | NYClaw.io',
    description:
      'Custom marketing agents and automations for small businesses — project-scoped.',
  },
  alternates: {
    canonical: 'https://nyclaw.io/services/ai-marketing',
  },
}

/** Figures are the live route's own — the strip only restyles them. */
const stats = [
  { raw: 'Project', label: 'Build first' },
  { raw: '7+', label: 'Content pieces/day' },
  { raw: '3-5x', label: 'Output increase' },
  { raw: '24/7', label: 'Lead capture' },
]

const capabilities = [
  {
    Icon: PenTool,
    title: 'AI content engines',
    desc: 'Automated production that publishes daily — posts, social, scripts and newsletters from your brand voice.',
  },
  {
    Icon: Funnel,
    title: 'Lead generation funnels',
    desc: 'Landing pages, lead magnets and conversion flows that capture and qualify leads while you sleep.',
  },
  {
    Icon: Mail,
    title: 'Email & SMS automation',
    desc: 'Nurture sequences triggered by behaviour — welcome, re-engagement and follow-up flows that convert.',
  },
  {
    Icon: MessageSquare,
    title: 'AI chat & response',
    desc: 'Website and social responders that engage visitors instantly and route qualified leads in real time.',
  },
  {
    Icon: Globe,
    title: 'Multi-platform distribution',
    desc: 'Content and campaigns distributed across search, social, email and SMS — coordinated, not manual.',
  },
  {
    Icon: BarChart2,
    title: 'Analytics & optimization',
    desc: 'Dashboards tracking leads, conversions, cost per acquisition and revenue attribution.',
  },
]

const ooda = [
  {
    letter: 'O',
    label: 'Observe',
    timeline: 'Week 1',
    desc: 'We audit current marketing: what works, where leads come from, what competitors do, and the buying journey.',
  },
  {
    letter: 'O',
    label: 'Orient',
    timeline: 'Week 1',
    desc: 'We map the highest-impact channels and content strategies for your business, audience and budget.',
  },
  {
    letter: 'D',
    label: 'Decide',
    timeline: 'Week 2',
    desc: 'We lock the strategy: channels, content, funnels, automation triggers. You approve before we build.',
  },
  {
    letter: 'A',
    label: 'Act',
    timeline: 'Week 2–4',
    desc: 'We build and launch: content engine, funnels, email/SMS automation, chat and analytics.',
  },
]

/** Metrics match the live route's results block exactly. */
const results = [
  {
    metric: '7+',
    label: 'Pieces of content per day',
    desc: 'Automated daily production across blog, social and email — without your team writing a word.',
  },
  {
    metric: '24/7',
    label: 'Lead capture active',
    desc: 'Funnels and chat working around the clock, capturing and nurturing leads while you are offline.',
  },
  {
    metric: '3-5x',
    label: 'Marketing output increase',
    desc: 'Most clients see 3-5x more output in the first 60 days with no additional team members.',
  },
]

const plans = [
  {
    name: 'Marketing System Build',
    price: '$4K–$12K',
    unit: 'fixed scope',
    desc: 'Content engine, funnels and nurture automations designed for your brand.',
    items: [
      'Brand voice & channel setup',
      'Content engine + funnel build',
      'Email / SMS nurture sequences',
      'Handoff docs & training',
    ],
  },
  {
    name: 'Optional Operation',
    price: '$1K–$3K',
    unit: '/mo or rev share',
    desc: 'After go-live only. We keep it running — or you run it yourself.',
    items: [
      'Ongoing content & funnel ops',
      'Performance reporting',
      'A/B testing & iteration',
      'Or: self-run with our handoff',
    ],
  },
]

const faqs = [
  {
    question: 'How does AI-powered marketing differ from traditional digital marketing?',
    answer:
      'Traditional digital marketing requires manual content creation, campaign management, and optimization. AI-powered marketing automates the entire pipeline: content gets generated from your brand voice, campaigns get optimized in real time based on performance data, and leads get nurtured through personalized sequences — all without manual work. You get 3-5x more output at a fraction of the labor cost.',
  },
  {
    question: 'How much do AI marketing automations cost?',
    answer:
      'Most marketing systems start as a project build ($4,000–$12,000) for the content engine, funnel, and nurture stack. Optional ongoing operation can be flat ($1,000–$3,000/mo) or performance-based after go-live. You can also take a handoff and run it yourself — monthly is never required to start.',
  },
  {
    question: 'What kind of content does the AI produce?',
    answer:
      'The AI content engine produces blog posts, social media posts (LinkedIn, Instagram, Facebook, X), email newsletters, SMS campaigns, video scripts, ad copy, and landing page content. All content is trained on your brand voice, industry terminology, and target audience. Every piece goes through quality checks before publishing — this is not generic ChatGPT output.',
  },
  {
    question: 'How long until I see results from AI marketing?',
    answer:
      'Most clients see measurable results within 30-60 days. The first 2 weeks focus on building your content engine and lead funnels. By week 3-4, content is publishing daily and funnels are capturing leads. By day 60, you have enough data to see clear trends in traffic, leads, and conversions. SEO-driven results (organic search traffic) typically take 90-180 days to compound.',
  },
  {
    question: 'Will the content sound like it was written by AI?',
    answer:
      'No, and that is a non-negotiable for us. We train the content engine on your brand voice, your past content, and your industry language. Every output goes through a quality and authenticity check. The goal is content that sounds like it was written by someone who deeply understands your business — because the AI was trained to do exactly that.',
  },
  {
    question: 'Can I approve content before it goes live?',
    answer:
      'Yes. We offer two modes: fully automated (content publishes on schedule without manual review) and approval-based (content queues for your review before publishing). Most clients start with approval mode for the first 30 days, then switch to fully automated once they trust the quality and voice consistency.',
  },
]

export default function AIMarketingPage() {
  return (
    <>
      <ServiceJsonLd
        name="AI Marketing Automations & Agents"
        description="Custom AI marketing automations and agents for small businesses. Content engines, lead funnels, and nurture systems — project-based builds by NYClaw.io."
        url="https://nyclaw.io/services/ai-marketing"
      />
      <FAQJsonLd items={faqs} />

      <ServiceHero
        badge="Marketing"
        BadgeIcon={Megaphone}
        titleTop="Marketing automations"
        titleAccent="& agents"
        lede="We design and build the system — content, funnels, nurture."
        blurb="Custom marketing automations and agents that produce content, capture leads and nurture prospects around the clock. Built as a project for your brand — not a generic product install."
        primary={{ label: 'Start a project', href: '/#contact' }}
        secondary={{ label: 'See what we build', href: '#what-we-build' }}
      />

      <StatStrip items={stats} />

      <CapabilityGrid
        id="what-we-build"
        title="What we build"
        blurb="A complete marketing system — not a single tool or hack. Everything works together to generate, capture and convert leads."
        items={capabilities}
      />

      <OodaPanel
        title="How we build your marketing engine"
        blurb="The same OODA Loop, applied to marketing: observe the market, orient around opportunity, decide the strategy, act by building systems that run themselves."
        steps={ooda}
        note="Then we optimize — performance data reviewed weekly and strategy adjusted."
      />

      <ResultsCards
        title="Results you can expect"
        blurb="These are the outcomes the marketing systems deliver. Real numbers, not aspirational benchmarks."
        items={results}
      />

      <PricingPair
        title="Build first. Operate only if you want."
        blurb="Project-scoped systems. Optional ongoing operation after go-live — never required to start."
        plans={plans}
        note="Every engagement starts as a fixed project quote."
      />

      <IndustryChips blurb="Best for small businesses that rely on a steady pipeline of leads and have no bandwidth to produce content manually." />

      <FaqSection
        blurb="Common questions about AI-powered marketing for small businesses."
        items={faqs}
      />

      <CtaPanel
        title="Ready for marketing automations built for your brand?"
        blurb="Tell us your channels and goals. We'll scope a custom marketing system — project-based, with optional ops after go-live."
        primary={{ label: 'Start a project', href: '/#contact' }}
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
