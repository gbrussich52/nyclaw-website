import type { Metadata } from 'next'
import {
  Clock,
  TrendingDown,
  BarChart2,
  HelpCircle,
  Target,
  Building2,
  Scale,
  Activity,
  ShoppingBag,
  UtensilsCrossed,
  Wrench,
  Check,
  Bot,
  Mail,
  CalendarClock,
  Phone,
  MessageSquare,
  Database,
  Workflow,
  Globe,
} from 'lucide-react'
import ContactForm from './components/ContactForm'
import PlaybookForm from './components/PlaybookForm'
import { FAQJsonLd } from './components/JsonLd'
import HeroHelix from './components/HeroHelix'
import Reveal from './components/Reveal'
import CountUp from './components/CountUp'
import { CALENDLY_URL, FREE_AUDIT_LABEL } from './config'

const capabilities = [
  { Icon: Bot,             label: 'GPT & Claude Agents' },
  { Icon: Workflow,        label: 'Workflow Automation' },
  { Icon: Database,        label: 'CRM Sync' },
  { Icon: Mail,            label: 'Email & SMS Sequences' },
  { Icon: CalendarClock,   label: 'Smart Scheduling' },
  { Icon: Phone,           label: 'AI Voice Agents' },
  { Icon: MessageSquare,   label: 'Customer Support Bots' },
  { Icon: Globe,           label: 'Web Scraping & Research' },
  { Icon: BarChart2,       label: 'Live Dashboards' },
]

export const metadata: Metadata = {
  title: 'NYClaw.io — AI Agency | Custom Automations & Agents | Westchester & NYC',
  description:
    'NYClaw.io is an AI agency that designs and builds custom automations and agents for small businesses in Westchester County, NY and NYC. Project-based builds — not a one-size product install. Free 15-min fit audit.',
  keywords:
    'AI agency, custom AI agents, AI automation agency, small business AI, workflow automation, Westchester NY, NYC AI agency, agent development, OODA Loop',
  openGraph: {
    title: 'NYClaw.io — AI Agency for Custom Automations & Agents',
    description:
      'We design and build AI automations and agents for how your business actually works. No template install — systems built around your workflows.',
    url: 'https://nyclaw.io',
    siteName: 'NYClaw.io',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NYClaw.io — AI Agency',
    description:
      'Custom AI automations and agents for small businesses in Westchester County & NYC. Free 15-min fit audit.',
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
    question: 'What does an AI agency actually build?',
    answer:
      'We design and build custom AI automations and agents around your real workflows — lead response, scheduling, CRM updates, follow-ups, intake, research, and internal ops. You are not buying a pre-packaged bot install. You get systems built for how your team works, with handoff so you can run them.',
  },
  {
    question: 'Do I have to commit to a monthly retainer?',
    answer:
      'No. Most work is project- or sprint-based: we scope one (or a few) automations/agents, build them, and hand them off. Optional ongoing care is available only if you want monitoring and iteration after go-live — it is never required to start.',
  },
  {
    question: 'How long does a build take?',
    answer:
      'Many first agents ship in a focused multi-day sprint once scope and access are clear. Larger multi-agent systems take longer and are priced as a project. We use the OODA Loop (Observe → Orient → Decide → Act) so every build starts with the highest-ROI workflow, not a random tool stack.',
  },
  {
    question: 'What is the free 15-minute fit audit?',
    answer:
      'A short call to identify the #1 workflow worth automating and whether a custom build makes sense for you. No pitch deck, no hour-long sales call. If it is a fit, we outline a fixed-scope project. If it is not, we will say so.',
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <FAQJsonLd items={homepageFaqs} />

      {/* Hero */}
      <section className="dusk-hero grain relative overflow-hidden min-h-[88vh] flex items-center">
        {/* Hairline grid */}
        <div className="absolute inset-0 dusk-grid pointer-events-none" />

        {/* Full-bleed DNA data-network — weighted right, faded toward the copy */}
        <div
          className="absolute inset-0 pointer-events-none opacity-60 md:opacity-100"
          style={{
            WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, transparent 20%, #000 52%)',
            maskImage: 'linear-gradient(90deg, transparent 0%, transparent 20%, #000 52%)',
          }}
        >
          <HeroHelix centerXRatio={0.64} />
        </div>

        {/* Aurora glows */}
        <div className="absolute -top-32 right-[-6rem] w-[42rem] h-[42rem] rounded-full bg-indigo/20 blur-3xl animate-aurora animate-hue pointer-events-none" />
        <div
          className="absolute bottom-[-12rem] left-[-8rem] w-[34rem] h-[34rem] rounded-full bg-cyan/10 blur-3xl animate-aurora animate-hue pointer-events-none"
          style={{ animationDelay: '-7s' }}
        />

        {/* Left scrim keeps the copy crisp over the animation */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-dusk-950 via-dusk-950/85 to-transparent" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24 md:py-28">
          <div className="max-w-2xl text-center lg:text-left">
            <div className="pill-dusk mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan inline-block animate-pulse-slow" />
              AI Agency · NYC, Westchester County &amp; Beyond
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-5" style={{ lineHeight: 1.05 }}>
              Custom AI automations{' '}
              <span className="text-gradient-ai">&amp; agents</span>
              {' '}— built for your business.
            </h1>
            <p className="text-xl font-semibold text-white/90 mb-4">
              Not a template. Not a product install. A real agency build.
            </p>
            <p className="text-lg text-slate-300 mb-9 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              We design and ship AI systems that run lead response, scheduling, CRM, follow-ups, and ops —
              around how your team already works. Built with a harness (tools, rules, checks) and a closed loop after go-live so they keep working.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="#contact" className="btn-ai text-lg">
                Start a Project &rarr;
              </a>
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost-dusk text-lg">
                {FREE_AUDIT_LABEL}
              </a>
            </div>
            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-2 justify-center lg:justify-start text-sm text-slate-400">
              <span className="inline-flex items-center gap-2"><span className="text-cyan">⚡</span> Project &amp; sprint builds</span>
              <span className="inline-flex items-center gap-2"><span className="text-cyan">◆</span> Custom agents &amp; automations</span>
              <span className="inline-flex items-center gap-2"><span className="text-cyan">●</span> No monthly lock-in</span>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities marquee */}
      <section className="dusk grain relative overflow-hidden border-y border-white/10 py-6">
        <div className="marquee">
          <div className="marquee-track gap-3 pr-3">
            {[...capabilities, ...capabilities].map(({ Icon, label }, i) => (
              <span key={i} className="chip">
                <Icon className="w-4 h-4 text-sky-bright" strokeWidth={1.75} />
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {([
              { to: 40, suffix: '%', label: 'Avg. Cost Reduction' },
              { to: 8,  suffix: 'x', label: 'Productivity Gains' },
              { raw: 'Sprint',       label: 'Project-Based Delivery' },
              { raw: '24/7',         label: 'Agents That Keep Working' },
            ] as { to?: number; suffix?: string; raw?: string; label: string }[]).map((stat, i) => (
              <Reveal key={stat.label} delay={i * 90}>
                <div className="text-center py-8 px-4 bg-gradient-to-b from-sky-blue/5 to-white rounded-2xl border border-sky-blue/10 lift">
                  <div className="text-5xl font-extrabold text-sky-blue mb-2 leading-none">
                    <CountUp to={stat.to} suffix={stat.suffix} raw={stat.raw} />
                  </div>
                  <div className="text-sm font-semibold text-charcoal/70 uppercase tracking-wide">{stat.label}</div>
                </div>
              </Reveal>
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
            {painPoints.map(({ Icon, title, desc }, i) => (
              <Reveal key={title} delay={i * 80}>
                <div className="lift h-full bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-sky-blue">
                  <div className="w-10 h-10 rounded-xl bg-navy/5 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-navy" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-base font-bold text-navy mb-2">{title}</h3>
                  <p className="text-sm text-charcoal/70 leading-relaxed">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-sky-blue uppercase tracking-widest block mb-3">What We Build</span>
            <h2 className="text-4xl font-bold text-navy mb-4">An AI agency — not a product installer.</h2>
            <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
              We create automations and agents from the ground up for your workflows, tools, and team.
              Project-based. Scoped. Delivered.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 items-stretch">

            <div className="card-hover lift flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-sky-blue/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-sky-blue" strokeWidth={1.5} />
                </div>
                <span className="text-xs font-bold text-sky-blue uppercase tracking-wider">Flagship</span>
              </div>
              <h3 className="text-2xl font-bold text-navy mb-1">Custom AI Agents</h3>
              <p className="text-sky-blue font-bold mb-5 text-sm">Agents that do real work in your stack.</p>
              <div className="bg-sky-blue/5 border border-sky-blue/20 rounded-xl p-4 mb-6">
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-2xl font-extrabold text-navy">$3.5K&ndash;8K</span>
                  <span className="text-sm text-charcoal/60">per agent sprint</span>
                </div>
                <p className="text-xs text-charcoal/60">Fixed scope · multi-day build · no monthly required</p>
              </div>
              <p className="text-charcoal/80 text-sm mb-6 leading-relaxed">
                We design, build, and ship an agent for one mission-critical job — intake, lead response,
                scheduling, research, support triage — wired into the tools you already use.
              </p>
              <div className="p-4 bg-gray-50 rounded-xl mb-6 flex-1">
                <h4 className="font-bold text-navy text-sm mb-3">Includes:</h4>
                <ul className="space-y-2">
                  {['Workflow design & success metrics', 'Custom agent build (not a stock template)', 'Tool integrations (CRM, email, calendar, SMS)', 'Testing, training & documented handoff'].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-charcoal/80"><CheckIcon /> {item}</li>
                  ))}
                </ul>
              </div>
              <a href="#contact" className="btn-red w-full text-center block py-4">Build My Agent &rarr;</a>
            </div>

            <div className="card-hover lift flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-navy/10 flex items-center justify-center flex-shrink-0">
                  <Workflow className="w-5 h-5 text-navy" strokeWidth={1.5} />
                </div>
                <span className="text-xs font-bold text-navy uppercase tracking-wider">Systems</span>
              </div>
              <h3 className="text-2xl font-bold text-navy mb-1">Workflow Automation</h3>
              <p className="text-sky-blue font-bold mb-5 text-sm">Multi-step systems across your ops.</p>
              <div className="bg-navy/5 border border-navy/20 rounded-xl p-4 mb-6">
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-2xl font-extrabold text-navy">$5K&ndash;15K</span>
                  <span className="text-sm text-charcoal/60">project</span>
                </div>
                <p className="text-xs text-charcoal/60">2–3 connected automations · scoped project</p>
              </div>
              <p className="text-charcoal/80 text-sm mb-6 leading-relaxed">
                End-to-end automations that move work between tools — forms, CRMs, inboxes, calendars,
                invoices — so humans only touch exceptions.
              </p>
              <div className="p-4 bg-gray-50 rounded-xl mb-6 flex-1">
                <h4 className="font-bold text-navy text-sm mb-3">Includes:</h4>
                <ul className="space-y-2">
                  {['Process mapping & opportunity ranking', 'Automation architecture & build', 'Integrations + error handling', 'Team training & runbook'].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-charcoal/80"><CheckIcon /> {item}</li>
                  ))}
                </ul>
              </div>
              <a href="#contact" className="btn-red w-full text-center block py-4">Automate My Workflows &rarr;</a>
            </div>

            <div className="card-hover lift flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-dark-red/10 flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5 text-dark-red" strokeWidth={1.5} />
                </div>
                <span className="text-xs font-bold text-dark-red uppercase tracking-wider">Entry</span>
              </div>
              <h3 className="text-2xl font-bold text-navy mb-1">Fit Audit + Roadmap</h3>
              <p className="text-dark-red font-bold mb-5 text-sm">Know what to build first — and what to skip.</p>
              <div className="bg-dark-red/5 border border-dark-red/20 rounded-xl p-4 mb-6">
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-2xl font-extrabold text-navy">Free</span>
                  <span className="text-sm text-charcoal/60">15-min fit audit</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-extrabold text-sky-blue">$1K&ndash;2.5K</span>
                  <span className="text-sm text-charcoal/60">full roadmap (optional)</span>
                </div>
              </div>
              <p className="text-charcoal/80 text-sm mb-6 leading-relaxed">
                Start with a free 15-minute fit call. If you need a deeper plan, we deliver a prioritized
                automation roadmap with ROI and build order — before you spend on a full system.
              </p>
              <div className="p-4 bg-gray-50 rounded-xl mb-6 flex-1">
                <h4 className="font-bold text-navy text-sm mb-3">Includes:</h4>
                <ul className="space-y-2">
                  {['#1 workflow opportunity identified', 'Tooling & access checklist', 'Yes/no on a sprint build', 'Optional written roadmap + ROI'].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-charcoal/80"><CheckIcon /> {item}</li>
                  ))}
                </ul>
              </div>
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-red w-full text-center block py-4">Book Free 15-Min Audit &rarr;</a>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Break */}
      <section className="dusk grain relative overflow-hidden py-20 px-6">
        <div className="absolute inset-0 dusk-grid pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[24rem] rounded-full bg-indigo/15 blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-2xl font-bold text-white mb-3">Ready for an AI system built for how you work?</p>
          <p className="text-slate-300 mb-8">
            Book a free 15-minute fit audit. We&apos;ll name the #1 automation or agent worth building — or tell you if now isn&apos;t the time.
          </p>
          <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-ai inline-block text-lg">{FREE_AUDIT_LABEL}</a>
        </div>
      </section>

      {/* OODA Loop */}
      <section id="process" className="dusk grain relative overflow-hidden py-24 px-6">
        <div className="absolute inset-0 dusk-grid pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[48rem] h-[28rem] rounded-full bg-indigo/15 blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-sky-bright uppercase tracking-widest block mb-3">Our Framework</span>
            <h2 className="text-4xl font-bold text-white mb-4">The OODA Loop</h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Originally developed for high-stakes military decision-making. Adapted into a proven AI implementation framework — fast, systematic, and built for your business.
            </p>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute top-6 left-[12.5%] right-[12.5%] h-0.5 connector-flow opacity-70" />
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { letter: 'O', label: 'Observe', color: 'bg-sky-bright shadow-sky-bright/40', desc: 'We embed in your business — mapping every process, tool, and workflow to understand where time and money are being lost.' },
                { letter: 'O', label: 'Orient',  color: 'bg-cyan shadow-cyan/40',           desc: 'We analyze your industry context, competitor AI adoption, and constraints to identify the highest-ROI opportunities.' },
                { letter: 'D', label: 'Decide',  color: 'bg-indigo shadow-indigo/40',       desc: 'We scope the first agent or automation: what it does, which tools it uses, success metrics, and a fixed project price.' },
                { letter: 'A', label: 'Act',     color: 'bg-violet shadow-violet/40',       desc: 'We design, build, and ship the system. You get a working automation or agent — plus training and a handoff so your team can run it.' },
              ].map((phase, i) => (
                <Reveal key={i} delay={i * 110}>
                  <div className="flex flex-col items-center text-center">
                    <div className={`w-12 h-12 rounded-full ${phase.color} text-white flex items-center justify-center font-extrabold text-lg mb-4 relative z-10 shadow-lg`}>
                      {phase.letter}
                    </div>
                    <p className="text-xs font-bold text-sky-bright uppercase tracking-wider mb-2">Step {i + 1}</p>
                    <p className="text-lg font-bold text-white mb-3">{phase.label}</p>
                    <p className="text-sm text-slate-300 leading-relaxed">{phase.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <p className="text-center mt-12 text-sky-bright font-bold">
            Then we loop — continuously observing, orienting, and optimizing as your business grows.
          </p>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-navy mb-3">Template install vs custom agency build</h2>
            <p className="text-lg text-charcoal/70">What changes when systems are designed for your workflows</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-red-50 border-2 border-red-100 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-charcoal mb-6 flex items-center gap-2">
                <span className="text-red-400 font-bold">&times;</span> One-size product / DIY install
              </h3>
              <ul className="space-y-4">
                {['Generic bot that doesn\'t match how you sell or serve', 'You own the glue work between tools', 'Breaks when a process or CRM field changes', 'No clear owner when something fails', 'Months of tinkering with little production value', 'Monthly fee for software that still needs babysitting'].map((item) => (
                  <li key={item} className="flex gap-3 text-charcoal/80 text-sm">
                    <span className="text-red-400 font-bold flex-shrink-0 mt-0.5">&ndash;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-sky-blue/5 border-2 border-sky-blue/30 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-navy mb-6 flex items-center gap-2">
                <Check className="w-5 h-5 text-sky-blue flex-shrink-0" strokeWidth={2.5} /> With NYClaw as your AI agency
              </h3>
              <ul className="space-y-4">
                {['Automations & agents designed around your real process', 'We wire the stack — CRM, email, calendar, SMS, web', 'Scoped project with a clear go-live definition', 'Documented handoff so your team can operate it', 'Highest-ROI workflow first — not a random chatbot', 'Optional care only after the system is already working'].map((item) => (
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
            <h2 className="text-4xl font-bold text-navy mb-3">We don&apos;t resell a product. We build systems.</h2>
            <p className="text-lg text-charcoal/70">Example agency work &mdash; custom automations and agents, not a one-click install.</p>
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
            <h3 className="text-2xl font-bold text-navy mb-10 text-center">From fit call to live system</h3>
            <div className="relative">
              <div className="hidden md:block absolute top-5 left-[16.67%] right-[16.67%] h-0.5 bg-gradient-to-r from-sky-blue via-navy to-sky-blue opacity-30" />
              <div className="grid md:grid-cols-3 gap-8 text-center">
                {[
                  { date: '15 min',    label: 'Fit Audit', desc: 'Free call: #1 workflow, tools, and whether a custom agent or automation is worth building.' },
                  { date: 'Sprint',  label: 'Design + Build',   desc: 'We design the agent or automation, integrate your tools, and ship a working system.' },
                  { date: 'Handoff',    label: 'Train + Optional Care', desc: 'Your team owns the runbook. Optional monitoring only if you want us to stay on.' },
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
            <p className="text-center mt-10 text-sky-blue font-bold">Project-based delivery. No monthly required to start.</p>
          </div>
        </div>
      </section>

      {/* Urgency */}
      <section className="dusk grain relative overflow-hidden py-20 px-6">
        <div className="absolute inset-0 dusk-grid pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[36rem] h-[20rem] rounded-full bg-dark-red/20 blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-dark-red font-bold uppercase tracking-widest text-sm mb-4">Limited Capacity</p>
          <p className="text-5xl font-extrabold text-white mb-4 leading-tight">5 clients.<br />Per quarter.</p>
          <p className="text-xl text-slate-300 mb-10">We cap active builds so every automation and agent gets senior attention. Spots fill fast.</p>
          <a href="#contact" className="btn-red inline-block px-10 py-4 text-lg">Start a Project &rarr;</a>
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
            <p className="text-lg text-charcoal/70">Common questions about working with an AI agency.</p>
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
