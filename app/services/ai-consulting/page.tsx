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
  BookOpen,
  Check,
  Building2,
  Scale,
  Activity,
  ShoppingBag,
  UtensilsCrossed,
  Wrench,
} from 'lucide-react'
import { ServiceJsonLd, FAQJsonLd } from '../../components/JsonLd'

export const metadata: Metadata = {
  title: 'AI Strategy & Consulting for Small Businesses',
  description:
    'NYClaw.io offers AI strategy consulting for small businesses in Westchester County and NYC. Start with a $500 flat-rate AI audit. Get a prioritized roadmap with clear ROI projections.',
  keywords:
    'AI consulting small business, AI strategy consulting westchester, AI audit small business, AI roadmap consulting, AI implementation strategy, AI ROI consulting',
  openGraph: {
    title: 'AI Strategy & Consulting for Small Businesses | NYClaw.io',
    description:
      'Start with a $500 AI audit. Get a prioritized roadmap showing exactly where AI fits your business and what it will save you.',
    url: 'https://nyclaw.io/services/ai-consulting',
    siteName: 'NYClaw.io',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Strategy & Consulting | NYClaw.io',
    description:
      '$500 flat-rate AI audit for small businesses. Prioritized roadmap with clear ROI projections.',
  },
  alternates: {
    canonical: 'https://nyclaw.io/services/ai-consulting',
  },
}

const CheckIcon = () => (
  <Check className="w-4 h-4 text-sky-blue flex-shrink-0 mt-0.5" strokeWidth={2.5} />
)

const whatYouGet = [
  {
    Icon: Search,
    title: 'Full Operations Audit',
    desc: 'We spend time inside your business — watching workflows, reviewing tools, and talking to your team. Every process gets documented and evaluated for AI potential.',
  },
  {
    Icon: FileBarChart,
    title: 'AI Opportunity Map',
    desc: 'A prioritized list of every AI opportunity in your business, ranked by ROI, implementation difficulty, and impact on daily operations.',
  },
  {
    Icon: TrendingUp,
    title: 'ROI Projections',
    desc: 'Specific dollar estimates for each automation opportunity: how much it costs to implement vs. how much it saves annually. No vague promises — real numbers.',
  },
  {
    Icon: Lightbulb,
    title: 'Competitor AI Analysis',
    desc: 'We research how your competitors and industry peers are using AI, so you know exactly where you stand and what opportunities they are exploiting that you are not.',
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
    question: 'What is included in the $500 AI audit?',
    answer:
      'The $500 flat-rate AI audit includes a full business operations review, competitor AI analysis, a prioritized AI opportunity map with ROI projections for each opportunity, a 30/60/90 day implementation roadmap, tool recommendations with cost breakdowns, and a live walkthrough presentation with your team. You walk away knowing exactly where AI fits your business and what it will cost.',
  },
  {
    question: 'How is NYClaw.io different from other AI consultants?',
    answer:
      'Most AI consultants sell strategy decks and leave. We build what we recommend. Our consulting is designed to feed directly into implementation — every recommendation comes with a specific build plan, timeline, and cost. We also cap our client list at 5 per quarter so every engagement gets full attention. And we use the OODA Loop framework, not generic methodologies.',
  },
  {
    question: 'Do I need the audit before hiring you for automation or marketing?',
    answer:
      'Not strictly, but we recommend it. The audit ensures we are solving the right problems in the right order. Without it, you risk automating the wrong things first. That said, if you already know exactly what you need automated, we can skip straight to a build quote. The $500 audit fee gets credited toward any implementation project over $3,000.',
  },
  {
    question: 'What does the ongoing consulting retainer include?',
    answer:
      'The retainer is custom-priced based on scope and typically includes monthly strategy sessions, quarterly roadmap updates, vendor evaluation and selection support, implementation oversight, and performance tracking. It is designed for businesses that want a fractional AI strategist without hiring a full-time role. Retainer pricing starts around $1,500/month.',
  },
  {
    question: 'How long does the AI audit take?',
    answer:
      'The audit itself takes 5-7 business days from kickoff to final delivery. Day 1-2 is the discovery phase where we review your operations, tools, and team workflows. Day 3-4 is analysis and competitor research. Day 5-7 is building the deliverables and preparing the walkthrough presentation.',
  },
  {
    question: 'Is the AI audit only for businesses in Westchester County?',
    answer:
      'No. While we are based in Westchester County, NY and many of our clients are local, the audit can be conducted fully remote. We serve small businesses across NYC, the tri-state area, and nationwide. Local clients get the option of in-person discovery sessions.',
  },
]

export default function AIConsultingPage() {
  return (
    <div className="min-h-screen bg-white">
      <ServiceJsonLd
        name="AI Strategy & Consulting for Small Businesses"
        description="AI strategy consulting and business audit services for small businesses. $500 flat-rate AI audit with prioritized roadmap and ROI projections. Serving Westchester County, NY and NYC."
        url="https://nyclaw.io/services/ai-consulting"
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
            <Target className="w-3.5 h-3.5" strokeWidth={2} />
            <span className="text-xs font-semibold text-white/90 tracking-wide">
              Strategy
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-5" style={{ lineHeight: 1.15 }}>
            AI Strategy &amp; Consulting
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-blue to-white inline-block pb-2">
              for Small Businesses
            </span>
          </h1>
          <p className="text-xl font-semibold text-white mb-3">
            Know exactly where AI fits — before you spend a dollar building.
          </p>
          <p className="text-lg text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed">
            We audit your business, analyze your competitors, and deliver a
            prioritized AI roadmap with real ROI numbers. Start with a $500
            flat-rate audit — no ongoing commitment required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#contact" className="btn-red text-lg px-8 py-4">
              Book My AI Audit &rarr;
            </Link>
            <Link
              href="#what-you-get"
              className="px-8 py-4 bg-white/10 text-white font-bold rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/30 inline-block"
            >
              See What You Get
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 px-6 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { number: '$500', label: 'Flat-Rate Audit' },
            { number: '5-7', label: 'Days to Deliver' },
            { number: '10+', label: 'Deliverables' },
            { number: '100%', label: 'Actionable' },
          ].map((stat) => (
            <div key={stat.label} className="text-center py-4">
              <div className="text-3xl font-extrabold text-sky-blue mb-1">{stat.number}</div>
              <div className="text-xs font-semibold text-charcoal/60 uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What You Get */}
      <section id="what-you-get" className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-sky-blue uppercase tracking-widest block mb-3">
              The Audit
            </span>
            <h2 className="text-4xl font-bold text-navy mb-4">What You Get</h2>
            <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
              The AI audit is not a generic slide deck. It is a deep-dive into your
              business with specific, actionable recommendations backed by real numbers.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {whatYouGet.map(({ Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-navy hover:shadow-lg transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-navy/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-navy" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-bold text-navy mb-2">{title}</h3>
                <p className="text-sm text-charcoal/70 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process — OODA Loop */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-sky-blue uppercase tracking-widest block mb-3">
              Our Framework
            </span>
            <h2 className="text-4xl font-bold text-navy mb-4">
              How We Run the Audit
            </h2>
            <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
              The OODA Loop keeps us fast and systematic. Originally built for military
              decision-making, adapted for AI strategy consulting.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                letter: 'O',
                label: 'Observe',
                color: 'bg-sky-blue',
                desc: 'We review your operations, tools, team structure, and daily workflows. Nothing gets assumed — everything gets documented.',
                timeline: 'Day 1-2',
              },
              {
                step: 2,
                letter: 'O',
                label: 'Orient',
                color: 'bg-navy',
                desc: 'We analyze your business context against industry benchmarks and competitor AI adoption. Where do you stand? Where are the gaps?',
                timeline: 'Day 3',
              },
              {
                step: 3,
                letter: 'D',
                label: 'Decide',
                color: 'bg-sky-blue',
                desc: 'We build the roadmap: which AI solutions to deploy, in what order, with ROI estimates and exact implementation costs.',
                timeline: 'Day 4-5',
              },
              {
                step: 4,
                letter: 'A',
                label: 'Act',
                color: 'bg-dark-red',
                desc: 'We present the full audit to your team, answer every question, and hand over all deliverables. Ready to build whenever you are.',
                timeline: 'Day 5-7',
              },
            ].map((phase) => (
              <div key={phase.step} className="flex flex-col items-center text-center">
                <div
                  className={`w-12 h-12 rounded-full ${phase.color} text-white flex items-center justify-center font-extrabold text-lg mb-4 shadow-lg`}
                >
                  {phase.letter}
                </div>
                <p className="text-xs font-bold text-sky-blue uppercase tracking-wider mb-1">
                  Step {phase.step} &middot; {phase.timeline}
                </p>
                <p className="text-lg font-bold text-navy mb-3">{phase.label}</p>
                <p className="text-sm text-charcoal/70 leading-relaxed">{phase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-sky-blue uppercase tracking-widest block mb-3">
              Deliverables
            </span>
            <h2 className="text-4xl font-bold text-navy mb-4">
              What Ships With the Audit
            </h2>
            <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
              Every audit includes 10+ deliverables designed to be immediately
              actionable — whether you hire us to build or take it to another vendor.
            </p>
          </div>
          <div className="bg-white border-2 border-gray-100 rounded-2xl p-8">
            <div className="grid sm:grid-cols-2 gap-4">
              {deliverables.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckIcon />
                  <span className="text-sm text-charcoal/80 leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-center mt-6 text-sm text-charcoal/60">
            The $500 audit fee gets credited toward any implementation project over
            $3,000.
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-dark-red uppercase tracking-widest block mb-3">
              Pricing
            </span>
            <h2 className="text-4xl font-bold text-navy mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
              Start with the audit. Scale with the retainer when you need ongoing AI
              strategy support.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-navy/5 border-2 border-navy/20 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-navy mb-2">AI Audit</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-extrabold text-navy">$500</span>
                <span className="text-charcoal/60">flat rate</span>
              </div>
              <p className="text-sm text-charcoal/70 mb-4">
                One-time deep-dive. Full audit, roadmap, and presentation delivered
                in 5-7 business days.
              </p>
              <ul className="space-y-2">
                {[
                  'Full operations audit',
                  'AI opportunity map with ROI scoring',
                  'Competitor analysis',
                  '30/60/90 day roadmap',
                  'Live walkthrough with your team',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-charcoal/80">
                    <CheckIcon /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-sky-blue/5 border-2 border-sky-blue/20 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-navy mb-2">Ongoing Retainer</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-extrabold text-sky-blue">Custom</span>
              </div>
              <p className="text-sm text-charcoal/70 mb-4">
                Fractional AI strategist for your business. Monthly sessions,
                quarterly updates, ongoing optimization.
              </p>
              <ul className="space-y-2">
                {[
                  'Monthly strategy sessions',
                  'Quarterly roadmap updates',
                  'Vendor evaluation and selection',
                  'Implementation oversight',
                  'Performance tracking and reporting',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-charcoal/80">
                    <CheckIcon /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-sky-blue uppercase tracking-widest block mb-3">
              Industries
            </span>
            <h2 className="text-4xl font-bold text-navy mb-4">Who This Is For</h2>
            <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
              If you run a small business and want to understand how AI can improve
              your operations, this audit is for you.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {industries.map(({ Icon, label }) => (
              <div
                key={label}
                className="text-center py-6 px-4 bg-white rounded-2xl border border-gray-100 hover:border-navy hover:bg-navy/5 transition-all duration-300 flex flex-col items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-navy/5 flex items-center justify-center">
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
              Common questions about AI consulting and the audit process.
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
            Ready to see where AI fits your business?
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            The $500 AI audit gives you a complete roadmap — no guesswork, no
            ongoing commitment. Just clarity on your next move.
          </p>
          <Link href="/#contact" className="btn-red inline-block px-10 py-4 text-lg">
            Book My AI Audit &rarr;
          </Link>
          <p className="mt-6 text-sm text-gray-400">
            Or explore our other services:{' '}
            <Link
              href="/services/ai-automation"
              className="text-sky-blue hover:underline underline-offset-4"
            >
              AI Automation
            </Link>{' '}
            &middot;{' '}
            <Link
              href="/services/ai-marketing"
              className="text-sky-blue hover:underline underline-offset-4"
            >
              AI Marketing
            </Link>
          </p>
        </div>
      </section>
    </div>
  )
}
