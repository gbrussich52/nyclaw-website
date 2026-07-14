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
  Check,
  Building2,
  Scale,
  Activity,
  ShoppingBag,
  UtensilsCrossed,
  Wrench,
  TrendingUp,
  Zap,
} from 'lucide-react'
import { ServiceJsonLd, FAQJsonLd } from '../../components/JsonLd'

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

const CheckIcon = () => (
  <Check className="w-4 h-4 text-sky-blue flex-shrink-0 mt-0.5" strokeWidth={2.5} />
)

const whatWeBuild = [
  {
    Icon: PenTool,
    title: 'AI Content Engines',
    desc: 'Automated content production that publishes daily — blog posts, social media, video scripts, and newsletters generated from your brand voice and industry data.',
  },
  {
    Icon: Funnel,
    title: 'Lead Generation Funnels',
    desc: 'AI-optimized landing pages, lead magnets, and conversion flows that capture and qualify leads while you sleep. Every funnel gets tested and optimized automatically.',
  },
  {
    Icon: Mail,
    title: 'Email & SMS Automation',
    desc: 'Personalized nurture sequences triggered by client behavior — welcome series, re-engagement campaigns, and follow-up flows that convert leads into paying customers.',
  },
  {
    Icon: MessageSquare,
    title: 'AI Chat & Response Systems',
    desc: 'Website chatbots and social media responders that engage visitors instantly, answer questions, and route qualified leads to your team in real time.',
  },
  {
    Icon: Globe,
    title: 'Multi-Platform Distribution',
    desc: 'Content and campaigns distributed automatically across Google, social media, email, and SMS — coordinated for maximum reach with minimum manual work.',
  },
  {
    Icon: BarChart2,
    title: 'Analytics & Optimization',
    desc: 'Real-time dashboards tracking every metric that matters: leads, conversions, cost per acquisition, and revenue attribution. AI identifies what is working and doubles down.',
  },
]

const results = [
  {
    Icon: TrendingUp,
    metric: '7+',
    label: 'Pieces of content per day',
    desc: 'Automated daily content production across blog, social media, and email — without your team writing a word.',
  },
  {
    Icon: Zap,
    metric: '24/7',
    label: 'Lead capture active',
    desc: 'AI funnels and chatbots working around the clock — capturing, qualifying, and nurturing leads while you are offline.',
  },
  {
    Icon: BarChart2,
    metric: '3-5x',
    label: 'Marketing output increase',
    desc: 'Most clients see 3-5x more marketing output in the first 60 days with no additional team members.',
  },
]

const industries = [
  { Icon: Building2, label: 'Real Estate' },
  { Icon: Scale, label: 'Legal Services' },
  { Icon: Activity, label: 'Healthcare' },
  { Icon: ShoppingBag, label: 'Retail / E-Comm' },
  { Icon: UtensilsCrossed, label: 'Hospitality' },
  { Icon: Wrench, label: 'Contractors' },
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
    <div className="min-h-screen bg-white">
      <ServiceJsonLd
        name="AI Marketing Automations & Agents"
        description="Custom AI marketing automations and agents for small businesses. Content engines, lead funnels, and nurture systems — project-based builds by NYClaw.io."
        url="https://nyclaw.io/services/ai-marketing"
      />
      <FAQJsonLd items={faqs} />

      {/* Hero */}
      <section className="gradient-navy-sky text-white py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
              backgroundSize: '80px 80px',
            }}
          />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white mb-6 transition-colors"
          >
            &larr; All Services
          </Link>
          <div className="mb-5 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5">
            <Megaphone className="w-3.5 h-3.5" strokeWidth={2} />
            <span className="text-xs font-semibold text-white/90 tracking-wide">
              Marketing
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-5" style={{ lineHeight: 1.15 }}>
            Marketing Automations
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-blue to-white inline-block pb-2">
              &amp; Agents
            </span>
          </h1>
          <p className="text-xl font-semibold text-white mb-3">
            We design and build the system — content, funnels, nurture.
          </p>
          <p className="text-lg text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed">
            Custom marketing automations and agents that produce content, capture
            leads, and nurture prospects around the clock. Built as a project for
            your brand — not a generic product install.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#contact" className="btn-red text-lg px-8 py-4">
              Start a Project &rarr;
            </Link>
            <Link
              href="#what-we-build"
              className="px-8 py-4 bg-white/10 text-white font-bold rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/30 inline-block"
            >
              See What We Build
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 px-6 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { number: 'Project', label: 'Build First' },
            { number: '7+', label: 'Content Pieces/Day' },
            { number: '3-5x', label: 'Output Increase' },
            { number: '24/7', label: 'Lead Capture' },
          ].map((stat) => (
            <div key={stat.label} className="text-center py-4">
              <div className="text-3xl font-extrabold text-dark-red mb-1">{stat.number}</div>
              <div className="text-xs font-semibold text-charcoal/60 uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What We Build */}
      <section id="what-we-build" className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-dark-red uppercase tracking-widest block mb-3">
              Capabilities
            </span>
            <h2 className="text-4xl font-bold text-navy mb-4">What We Build</h2>
            <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
              A complete AI marketing system — not a single tool or hack. Everything
              works together to generate, capture, and convert leads on autopilot.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whatWeBuild.map(({ Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-dark-red hover:shadow-lg transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-dark-red/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-dark-red" strokeWidth={1.5} />
                </div>
                <h3 className="text-base font-bold text-navy mb-2">{title}</h3>
                <p className="text-sm text-charcoal/70 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-sky-blue uppercase tracking-widest block mb-3">
              Our Framework
            </span>
            <h2 className="text-4xl font-bold text-navy mb-4">
              How We Build Your Marketing Engine
            </h2>
            <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
              Same OODA Loop framework, applied to marketing. We observe your
              market, orient around opportunities, decide on strategy, and act by
              building systems that run themselves.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                letter: 'O',
                label: 'Observe',
                color: 'bg-sky-blue',
                desc: 'We audit your current marketing: what is working, what is not, where leads come from, and what your competitors are doing. We also analyze your ideal customer profile and buying journey.',
                timeline: 'Week 1',
              },
              {
                step: 2,
                letter: 'O',
                label: 'Orient',
                color: 'bg-navy',
                desc: 'We map the highest-impact marketing channels and content strategies for your specific business, audience, and budget. No generic playbooks — this is custom to you.',
                timeline: 'Week 1',
              },
              {
                step: 3,
                letter: 'D',
                label: 'Decide',
                color: 'bg-sky-blue',
                desc: 'We lock in the strategy: which channels, what content, which funnels, what automation triggers. You approve the plan before we build.',
                timeline: 'Week 2',
              },
              {
                step: 4,
                letter: 'A',
                label: 'Act',
                color: 'bg-dark-red',
                desc: 'We build and launch everything: content engine, lead funnels, email/SMS automation, chatbots, and analytics dashboards. Your marketing is live and running.',
                timeline: 'Week 2-4',
              },
            ].map((phase) => (
              <div key={phase.step} className="flex flex-col items-center text-center">
                <div
                  className={`w-12 h-12 rounded-full ${phase.color} text-white flex items-center justify-center font-extrabold text-lg mb-4 shadow-lg`}
                >
                  {phase.letter}
                </div>
                <p className="text-xs font-bold text-dark-red uppercase tracking-wider mb-1">
                  Step {phase.step} &middot; {phase.timeline}
                </p>
                <p className="text-lg font-bold text-navy mb-3">{phase.label}</p>
                <p className="text-sm text-charcoal/70 leading-relaxed">{phase.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-12 text-dark-red font-bold">
            Then we optimize — every week, the AI analyzes performance data and
            adjusts strategy automatically.
          </p>
        </div>
      </section>

      {/* Results You Can Expect */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-dark-red uppercase tracking-widest block mb-3">
              Outcomes
            </span>
            <h2 className="text-4xl font-bold text-navy mb-4">
              Results You Can Expect
            </h2>
            <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
              These are the outcomes our AI marketing systems deliver for small
              businesses. Real numbers, not aspirational benchmarks.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {results.map(({ Icon, metric, label, desc }) => (
              <div
                key={label}
                className="bg-white border-2 border-gray-100 rounded-2xl p-8 text-center hover:border-dark-red hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-dark-red/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-dark-red" strokeWidth={1.5} />
                </div>
                <div className="text-4xl font-extrabold text-dark-red mb-2">{metric}</div>
                <p className="text-sm font-bold text-navy mb-3">{label}</p>
                <p className="text-sm text-charcoal/70 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-dark-red uppercase tracking-widest block mb-3">
              Pricing
            </span>
            <h2 className="text-4xl font-bold text-navy mb-4">
              Build First. Operate Only If You Want.
            </h2>
            <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
              Project-scoped systems. Optional ongoing operation after go-live —
              never required to start.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-dark-red/5 border-2 border-dark-red/20 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-navy mb-2">Marketing System Build</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-extrabold text-navy">$4K&ndash;$12K</span>
              </div>
              <p className="text-sm text-charcoal/70 mb-4">
                Fixed-scope project: content engine, funnels, and nurture
                automations designed for your brand.
              </p>
              <ul className="space-y-2">
                {[
                  'Brand voice & channel setup',
                  'Content engine + funnel build',
                  'Email / SMS nurture sequences',
                  'Handoff docs & training',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-charcoal/80">
                    <CheckIcon /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-sky-blue/5 border-2 border-sky-blue/20 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-navy mb-2">Optional Operation</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-extrabold text-sky-blue">$1K&ndash;$3K</span>
                <span className="text-charcoal/60">/mo or rev share</span>
              </div>
              <p className="text-sm text-charcoal/70 mb-4">
                After go-live only. We keep the system running, optimizing, and
                producing — or you run it yourself.
              </p>
              <ul className="space-y-2">
                {[
                  'Ongoing content & funnel ops',
                  'Performance reporting',
                  'A/B testing & iteration',
                  'Or: self-run with our handoff',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-charcoal/80">
                    <CheckIcon /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-center mt-8 text-sm text-charcoal/60">
            Every engagement starts as a fixed project quote. Monthly or performance
            operation is optional after the system is live.
          </p>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-dark-red uppercase tracking-widest block mb-3">
              Industries
            </span>
            <h2 className="text-4xl font-bold text-navy mb-4">Who This Is For</h2>
            <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
              AI marketing works best for small businesses that rely on a steady
              pipeline of leads — and do not have the bandwidth to produce content
              and run campaigns manually.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {industries.map(({ Icon, label }) => (
              <div
                key={label}
                className="text-center py-6 px-4 bg-white rounded-2xl border border-gray-100 hover:border-dark-red hover:bg-dark-red/5 transition-all duration-300 flex flex-col items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-dark-red/5 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-navy" strokeWidth={1.5} />
                </div>
                <p className="text-sm font-semibold text-navy">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-charcoal/70">
              Common questions about AI-powered marketing for small businesses.
            </p>
          </div>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question} className="border-b border-gray-100 pb-6">
                <h3 className="text-lg font-bold text-navy mb-3">{faq.question}</h3>
                <p className="text-charcoal/70 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy text-white py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready for marketing automations built for your brand?
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            Tell us your channels and goals. We&apos;ll scope a custom marketing
            system — project-based, with optional ops after go-live.
          </p>
          <Link href="/#contact" className="btn-red inline-block px-10 py-4 text-lg">
            Start a Project &rarr;
          </Link>
          <p className="mt-6 text-sm text-gray-400">
            Or explore:{' '}
            <Link
              href="/services/ai-automation"
              className="text-sky-blue hover:underline underline-offset-4"
            >
              Custom Agents
            </Link>{' '}
            &middot;{' '}
            <Link
              href="/services/ai-consulting"
              className="text-sky-blue hover:underline underline-offset-4"
            >
              Fit Audit + Roadmap
            </Link>
          </p>
        </div>
      </section>
    </div>
  )
}
