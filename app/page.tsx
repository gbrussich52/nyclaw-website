import type { Metadata } from 'next'
import {
  Clock,
  TrendingDown,
  BarChart2,
  HelpCircle,
  Settings2,
  Target,
  Megaphone,
  Building2,
  Scale,
  Activity,
  ShoppingBag,
  UtensilsCrossed,
  Wrench,
  Check,
} from 'lucide-react'
import ContactForm from './components/ContactForm'
import PlaybookForm from './components/PlaybookForm'
import { FAQJsonLd } from './components/JsonLd'

export const metadata: Metadata = {
  title: 'NYClaw.io — AI Implementation Agency | Westchester County, NY & NYC',
  description: 'NYClaw.io builds AI agents and automation systems for small businesses in Westchester County, NY and NYC. Cut costs 40%, automate operations 24/7, and scale without adding staff. Free AI audit available.',
  keywords: 'AI agency, AI consulting, AI implementation, small business AI, AI automation, Westchester NY, NYC AI agency, AI strategy, OODA Loop, AI workflow automation',
  openGraph: {
    title: 'NYClaw.io — AI Implementation Agency for Small Businesses',
    description: 'We build AI agents that automate your business. From appointment booking to client follow-up — no code, no nonsense, just results.',
    url: 'https://nyclaw.io',
    siteName: 'NYClaw.io',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NYClaw.io — AI Implementation Agency',
    description: 'AI automation for small businesses in Westchester County & NYC. Free AI audit available.',
  },
  alternates: {
    canonical: 'https://nyclaw.io',
  },
}

const CheckIcon = () => (
  <Check className="w-4 h-4 text-sky-blue flex-shrink-0" strokeWidth={2.5} />
)

const painPoints = [
  { Icon: Clock,         title: 'Time Drain',          desc: 'Your team spends hours on tasks — scheduling, data entry, follow-ups — that AI handles in seconds.' },
  { Icon: TrendingDown,  title: 'Rising Labor Costs',   desc: 'Every manual process has a human cost. AI automates the repetitive work without adding headcount.' },
  { Icon: BarChart2,     title: 'Falling Behind',       desc: 'Your competitors are using AI to outpace you on marketing, pricing, and customer response speed.' },
  { Icon: HelpCircle,    title: 'No Clear Path',        desc: "You know AI is important. You just don't know where it fits your business — or where to start." },
]

const industries = [
  { Icon: Building2,       label: 'Real Estate' },
  { Icon: Scale,           label: 'Legal Services' },
  { Icon: Activity,        label: 'Healthcare' },
  { Icon: ShoppingBag,     label: 'Retail / E-Comm' },
  { Icon: UtensilsCrossed, label: 'Hospitality' },
  { Icon: Wrench,          label: 'Contractors' },
]

const homepageFaqs = [
  {
    question: 'What is AI workflow automation for small businesses?',
    answer: 'AI workflow automation uses artificial intelligence to handle repetitive business tasks like scheduling, follow-ups, data entry, and customer communication — running 24/7 without adding staff. NYClaw.io implements these systems for small businesses in Westchester County and NYC.',
  },
  {
    question: 'How much does AI implementation cost for a small business?',
    answer: 'NYClaw.io offers AI workflow automation starting at $1,500-$4,000 for setup with $199-$499/month maintenance. AI strategy consulting starts at $500 for a full audit. AI-powered marketing runs $1,000-$3,000/month or performance-based pricing.',
  },
  {
    question: 'How long does it take to implement AI in my business?',
    answer: 'NYClaw.io deploys AI systems in 30 days using the OODA Loop framework: Week 1 for business audit and opportunity mapping, Weeks 2-3 for building and deploying, and Week 4 for optimization and team training.',
  },
  {
    question: 'What is the OODA Loop framework for AI implementation?',
    answer: 'The OODA Loop (Observe, Orient, Decide, Act) is a military decision-making framework adapted by NYClaw.io for AI implementation. It provides a systematic approach: observe your business processes, orient around AI opportunities, decide on priorities with clear ROI, and act by building and deploying AI systems.',
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <FAQJsonLd items={homepageFaqs} />

      {/* Hero */}
      <section className="gradient-navy-sky text-white py-28 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-10 right-10 w-40 h-40 rounded-full border-2 border-sky-blue animate-pulse" />
          <div className="absolute bottom-10 left-10 w-32 h-32 rounded-full border-2 border-dark-red animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
            backgroundSize: '80px 80px'
          }} />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="mb-5 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-dark-red inline-block" />
            <span className="text-xs font-semibold text-white/90 tracking-wide">Serving NYC, Westchester County &amp; Beyond</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold mb-5" style={{ lineHeight: 1.15 }}>
            We build AI agents that
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-blue to-white inline-block pb-2">
              automate your business.
            </span>
          </h1>
          <p className="text-xl font-semibold text-white mb-5">
            No code, no nonsense — just results.
          </p>
          <p className="text-lg text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed">
            From appointment booking to client follow-up, we handle the repetitive work so you can focus on growing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://calendly.com/nyclaw-io-proton/30min" className="btn-red text-lg px-8 py-4">Book a Free Strategy Call</a>
            <a href="#contact" className="px-8 py-4 bg-white/10 text-white font-bold rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/30 inline-block">Get a Free AI Audit &rarr;</a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: '40%', label: 'Avg. Cost Reduction' },
              { number: '8x',  label: 'Productivity Gains' },
              { number: '30',  label: 'Days to Deployment' },
              { number: '24/7', label: 'Automated Operations' },
            ].map((stat) => (
              <div key={stat.label} className="text-center py-8 px-4 bg-gradient-to-b from-sky-blue/5 to-white rounded-2xl border border-sky-blue/10">
                <div className="text-5xl font-extrabold text-sky-blue mb-2 leading-none">{stat.number}</div>
                <div className="text-sm font-semibold text-charcoal/70 uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-dark-red uppercase tracking-widest block mb-3">The Reality</span>
            <h2 className="text-4xl font-bold text-navy mb-4">Your business is already competing against AI.</h2>
            <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
              Businesses adopting AI are cutting costs, moving faster, and winning more customers. The window to get ahead is closing.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {painPoints.map(({ Icon, title, desc }) => (
              <div key={title} className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-sky-blue hover:shadow-lg transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-navy/5 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-navy" strokeWidth={1.5} />
                </div>
                <h3 className="text-base font-bold text-navy mb-2">{title}</h3>
                <p className="text-sm text-charcoal/70 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-sky-blue uppercase tracking-widest block mb-3">What We Do</span>
            <h2 className="text-4xl font-bold text-navy mb-4">Full-service AI for small businesses.</h2>
            <p className="text-lg text-charcoal/70">From strategy to implementation to ongoing optimization.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 items-stretch">

            <div className="card-hover flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-sky-blue/10 flex items-center justify-center flex-shrink-0">
                  <Settings2 className="w-5 h-5 text-sky-blue" strokeWidth={1.5} />
                </div>
                <span className="text-xs font-bold text-sky-blue uppercase tracking-wider">Core Service</span>
              </div>
              <h3 className="text-2xl font-bold text-navy mb-1">AI Workflow Automation</h3>
              <p className="text-sky-blue font-bold mb-5 text-sm">Stop doing $20/hour work.</p>
              <div className="bg-sky-blue/5 border border-sky-blue/20 rounded-xl p-4 mb-6">
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-2xl font-extrabold text-navy">$1.5K&ndash;4K</span>
                  <span className="text-sm text-charcoal/60">setup</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-extrabold text-sky-blue">$199&ndash;499</span>
                  <span className="text-sm text-charcoal/60">/mo maintenance</span>
                </div>
              </div>
              <p className="text-charcoal/80 text-sm mb-6 leading-relaxed">We map your workflows, identify automation opportunities, and implement AI systems that run 24/7 without adding staff.</p>
              <div className="p-4 bg-gray-50 rounded-xl mb-6 flex-1">
                <h4 className="font-bold text-navy text-sm mb-3">Includes:</h4>
                <ul className="space-y-2">
                  {['Full workflow audit & process mapping', 'Custom AI automation build', 'CRM, email & scheduling integration', 'Testing, team training & handoff'].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-charcoal/80"><CheckIcon /> {item}</li>
                  ))}
                </ul>
              </div>
              <a href="#contact" className="btn-red w-full text-center block py-4">Build My Automation &rarr;</a>
            </div>

            <div className="card-hover flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-navy/10 flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5 text-navy" strokeWidth={1.5} />
                </div>
                <span className="text-xs font-bold text-navy uppercase tracking-wider">Strategy</span>
              </div>
              <h3 className="text-2xl font-bold text-navy mb-1">AI Strategy & Consulting</h3>
              <p className="text-sky-blue font-bold mb-5 text-sm">Know exactly where AI fits.</p>
              <div className="bg-navy/5 border border-navy/20 rounded-xl p-4 mb-6">
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-2xl font-extrabold text-navy">$500</span>
                  <span className="text-sm text-charcoal/60">full AI audit (flat)</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-extrabold text-sky-blue">Custom</span>
                  <span className="text-sm text-charcoal/60">for ongoing retainer</span>
                </div>
              </div>
              <p className="text-charcoal/80 text-sm mb-6 leading-relaxed">We spend time in your business, identify every AI opportunity, and deliver a prioritized roadmap with clear ROI projections.</p>
              <div className="p-4 bg-gray-50 rounded-xl mb-6 flex-1">
                <h4 className="font-bold text-navy text-sm mb-3">Includes:</h4>
                <ul className="space-y-2">
                  {['Full business operations audit', 'Competitor AI landscape analysis', 'Prioritized AI opportunity list', 'Implementation roadmap + ROI projections'].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-charcoal/80"><CheckIcon /> {item}</li>
                  ))}
                </ul>
              </div>
              <a href="#contact" className="btn-red w-full text-center block py-4">Book My AI Audit &rarr;</a>
            </div>

            <div className="card-hover flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-dark-red/10 flex items-center justify-center flex-shrink-0">
                  <Megaphone className="w-5 h-5 text-dark-red" strokeWidth={1.5} />
                </div>
                <span className="text-xs font-bold text-dark-red uppercase tracking-wider">Marketing</span>
              </div>
              <h3 className="text-2xl font-bold text-navy mb-1">AI-Powered Marketing</h3>
              <p className="text-dark-red font-bold mb-5 text-sm">Generate leads without lifting a finger.</p>
              <div className="bg-dark-red/5 border border-dark-red/20 rounded-xl p-4 mb-6">
                <p className="text-xs font-bold text-navy mb-2 uppercase tracking-wide">Flexible Pricing</p>
                <p className="text-sm text-charcoal/80 mb-1"><strong>Flat rate:</strong> $1K&ndash;3K/mo</p>
                <p className="text-sm text-charcoal/80"><strong>Performance:</strong> Revenue share available</p>
              </div>
              <p className="text-charcoal/80 text-sm mb-6 leading-relaxed">We build AI-powered content engines, lead generation systems, and automated customer nurture flows that work around the clock.</p>
              <div className="p-4 bg-gray-50 rounded-xl mb-6 flex-1">
                <h4 className="font-bold text-navy text-sm mb-3">Includes:</h4>
                <ul className="space-y-2">
                  {['Automated daily content production', 'AI-driven lead generation funnels', 'Email & SMS automation sequences', 'Multi-platform distribution management'].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-charcoal/80"><CheckIcon /> {item}</li>
                  ))}
                </ul>
              </div>
              <a href="#contact" className="btn-red w-full text-center block py-4">Start Growing &rarr;</a>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Break */}
      <section className="py-16 px-6 bg-gradient-to-r from-sky-blue/5 to-navy/5">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg text-charcoal/80 mb-6">Ready to see what AI can do for your business?</p>
          <p className="text-charcoal/60 mb-8">Book a free 30-minute strategy call. No pitch — just clarity on where to start.</p>
          <a href="https://calendly.com/nyclaw-io-proton/30min" className="btn-red inline-block px-10 py-4 text-lg">Book a Free Strategy Call</a>
        </div>
      </section>

      {/* OODA Loop */}
      <section id="process" className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-sky-blue uppercase tracking-widest block mb-3">Our Framework</span>
            <h2 className="text-4xl font-bold text-navy mb-4">The OODA Loop</h2>
            <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
              Originally developed for high-stakes military decision-making. Adapted into a proven AI implementation framework — fast, systematic, and built for your business.
            </p>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute top-6 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-sky-blue via-navy to-dark-red opacity-30" />
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { letter: 'O', label: 'Observe', color: 'bg-sky-blue shadow-sky-blue/30', desc: 'We embed in your business — mapping every process, tool, and workflow to understand where time and money are being lost.' },
                { letter: 'O', label: 'Orient',  color: 'bg-navy shadow-navy/30',      desc: 'We analyze your industry context, competitor AI adoption, and constraints to identify the highest-ROI opportunities.' },
                { letter: 'D', label: 'Decide',  color: 'bg-sky-blue shadow-sky-blue/30', desc: 'We deliver a prioritized roadmap: which AI tools to deploy, in what order, with clear returns and exact costs.' },
                { letter: 'A', label: 'Act',     color: 'bg-dark-red shadow-dark-red/30', desc: 'We build, test, deploy, and optimize your AI systems. You get a fully operational setup — and the training to run it.' },
              ].map((phase, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <div className={`w-12 h-12 rounded-full ${phase.color} text-white flex items-center justify-center font-extrabold text-lg mb-4 relative z-10 shadow-lg`}>
                    {phase.letter}
                  </div>
                  <p className="text-xs font-bold text-sky-blue uppercase tracking-wider mb-2">Step {i + 1}</p>
                  <p className="text-lg font-bold text-navy mb-3">{phase.label}</p>
                  <p className="text-sm text-charcoal/70 leading-relaxed">{phase.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="text-center mt-12 text-sky-blue font-bold">
            Then we loop — continuously observing, orienting, and optimizing as your business grows.
          </p>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-navy mb-3">Without AI vs With NYClaw</h2>
            <p className="text-lg text-charcoal/70">What changes when you implement AI in your operations</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-red-50 border-2 border-red-100 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-charcoal mb-6 flex items-center gap-2">
                <span className="text-red-400 font-bold">&times;</span> Without AI Implementation
              </h3>
              <ul className="space-y-4">
                {['Staff spending hours on repetitive tasks daily', 'Manual follow-ups, scheduling, data entry', 'Inconsistent customer communication', 'Limited marketing output due to bandwidth', 'Decisions based on gut, not real-time data', 'High cost per customer served'].map((item) => (
                  <li key={item} className="flex gap-3 text-charcoal/80 text-sm">
                    <span className="text-red-400 font-bold flex-shrink-0 mt-0.5">&ndash;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-sky-blue/5 border-2 border-sky-blue/30 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-navy mb-6 flex items-center gap-2">
                <Check className="w-5 h-5 text-sky-blue flex-shrink-0" strokeWidth={2.5} /> With NYClaw AI Implementation
              </h3>
              <ul className="space-y-4">
                {['AI handles all repetitive operations 24/7', 'Automated follow-ups, scheduling & CRM sync', 'Consistent, personalized experience at scale', 'AI-generated content running every day', 'Real-time dashboards driving smart decisions', 'Lower cost per customer, higher margin'].map((item) => (
                  <li key={item} className="flex gap-3 text-charcoal/80 text-sm">
                    <Check className="w-4 h-4 text-sky-blue flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section id="results" className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-sky-blue uppercase tracking-widest block mb-3">Proof It Works</span>
            <h2 className="text-4xl font-bold text-navy mb-3">We don&apos;t just consult. We build.</h2>
            <p className="text-lg text-charcoal/70">Here are live AI systems we&apos;ve built &mdash; the same approach we bring to your business.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {[
              { gradient: 'from-sky-blue to-navy', border: 'hover:border-sky-blue', badge: 'Digital Automation', badgeColor: 'text-sky-blue/80', title: 'Automated Revenue System', desc: 'A fully automated digital revenue engine with AI-driven optimization and real-time performance tracking — live in under 2 weeks.', s1k: 'Timeline', s1v: 'Concept to live in 2 weeks', s2k: 'Operations', s2v: '100% automated, 0 manual work', revenue: '$500–2K/mo recurring' },
              { gradient: 'from-dark-red to-charcoal', border: 'hover:border-dark-red', badge: 'Brand Automation', badgeColor: 'text-red-200', title: 'AI-Powered Content & Marketing', desc: 'Full-stack AI marketing: daily content generation, multi-platform distribution, and AI-managed lead funnels — zero manual work.', s1k: 'Output', s1v: '7+ pieces of content/day, automated', s2k: 'Distribution', s2v: 'Multi-platform, parallel', revenue: '$1–5K/mo potential' },
              { gradient: 'from-sky-blue/80 to-charcoal', border: 'hover:border-sky-blue', badge: 'Industry SaaS', badgeColor: 'text-sky-blue/80', title: 'Custom AI Tooling', desc: 'Custom-built AI workflow platform for a regulated professional services industry — replacing hours of manual work per job.', s1k: 'Impact', s1v: 'Hours of manual work eliminated/job', s2k: 'Model', s2v: 'Freemium SaaS, tiered pricing', revenue: '$2–10K/mo recurring' },
            ].map((c, i) => (
              <div key={i} className={`card ${c.border} group flex flex-col`}>
                <div className={`mb-6 h-36 bg-gradient-to-br ${c.gradient} rounded-xl flex flex-col items-center justify-center group-hover:shadow-lg transition-all relative overflow-hidden`}>
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-3 right-3 w-16 h-16 rounded-full border border-white" />
                    <div className="absolute bottom-3 left-3 w-10 h-10 rounded-full border border-white" />
                  </div>
                  <p className="text-white text-sm font-bold relative z-10">{c.title}</p>
                  <span className={`text-xs ${c.badgeColor} bg-white/10 px-2 py-0.5 rounded-full mt-1 relative z-10`}>{c.badge}</span>
                </div>
                <h3 className="text-lg font-bold text-navy mb-2">{c.title}</h3>
                <p className="text-sm text-charcoal/70 mb-4 flex-1">{c.desc}</p>
                <div className="space-y-1.5 mb-5">
                  <div className="text-xs text-charcoal/60"><span className="font-semibold text-sky-blue">{c.s1k}:</span> {c.s1v}</div>
                  <div className="text-xs text-charcoal/60"><span className="font-semibold text-sky-blue">{c.s2k}:</span> {c.s2v}</div>
                  <div className="text-xs font-bold text-dark-red">{c.revenue}</div>
                </div>
                <a href="#contact" className="btn-primary text-sm text-center block py-3">Apply This to My Business</a>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-white border border-gray-100 rounded-2xl p-10">
            <h3 className="text-2xl font-bold text-navy mb-10 text-center">30 Days from Audit to Live AI</h3>
            <div className="relative">
              <div className="hidden md:block absolute top-5 left-[16.67%] right-[16.67%] h-0.5 bg-gradient-to-r from-sky-blue via-navy to-sky-blue opacity-30" />
              <div className="grid md:grid-cols-3 gap-8 text-center">
                {[
                  { date: 'Week 1',    label: 'Observe + Orient', desc: 'Business audit, AI opportunity mapping, and implementation roadmap delivered.' },
                  { date: 'Week 2–3',  label: 'Build + Deploy',   desc: 'AI systems built, tested, and deployed into your live business environment.' },
                  { date: 'Week 4',    label: 'Optimize + Hand Off', desc: 'Performance review, team training, and ongoing optimization protocol.' },
                ].map((step, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-sky-blue text-white flex items-center justify-center font-bold text-sm mb-3 relative z-10 shadow-md shadow-sky-blue/30">{i + 1}</div>
                    <p className="text-xs font-bold text-sky-blue uppercase tracking-wider mb-1">{step.date}</p>
                    <p className="text-base font-bold text-navy mb-2">{step.label}</p>
                    <p className="text-sm text-charcoal/70 leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-center mt-10 text-sky-blue font-bold">30 days. Fully operational AI systems running inside your business.</p>
          </div>
        </div>
      </section>

      {/* Urgency */}
      <section className="bg-navy text-white py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-dark-red font-bold uppercase tracking-widest text-sm mb-4">Limited Capacity</p>
          <p className="text-5xl font-extrabold mb-4 leading-tight">5 clients.<br />Per quarter.</p>
          <p className="text-xl text-gray-300 mb-10">We cap our client list to protect implementation quality. Spots fill fast.</p>
          <a href="#contact" className="btn-red inline-block px-10 py-4 text-lg">Claim My Spot &rarr;</a>
        </div>
      </section>

      {/* Industries */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-navy mb-3">Industries We Serve</h2>
            <p className="text-lg text-charcoal/70">Every industry has repetitive processes. AI can automate them.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {industries.map(({ Icon, label }) => (
              <div key={label} className="text-center py-6 px-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-sky-blue hover:bg-sky-blue/5 transition-all duration-300 flex flex-col items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-navy/8 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-navy" strokeWidth={1.5} />
                </div>
                <p className="text-sm font-semibold text-navy">{label}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-8 text-charcoal/60 text-sm">
            Don&apos;t see your industry? <a href="#contact" className="text-sky-blue font-semibold hover:underline underline-offset-4">Get in touch</a> &mdash; we likely have a solution.
          </p>
        </div>
      </section>

      {/* Lead Magnet */}
      <PlaybookForm />

      {/* FAQ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-charcoal/70">Common questions about AI implementation for small businesses.</p>
          </div>
          <div className="space-y-6">
            {homepageFaqs.map((faq) => (
              <div key={faq.question} className="border-b border-gray-100 pb-6">
                <h3 className="text-lg font-bold text-navy mb-3">{faq.question}</h3>
                <p className="text-charcoal/70 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <ContactForm />

    </div>
  )
}
