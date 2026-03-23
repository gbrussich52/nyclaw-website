'use client'

import { useState } from 'react'
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
  Wrench,
  Check,
  CheckCircle2,
  Car,
  Smile,
  Stethoscope,
  Briefcase,
  Calendar,
} from 'lucide-react'

const CheckIcon = () => (
  <Check className="w-4 h-4 text-sky-blue flex-shrink-0" strokeWidth={2.5} />
)

const CALENDLY_URL = 'https://calendly.com/nyclaw'

const painPoints = [
  { Icon: Clock,        title: 'Time Drain',        desc: 'Your team spends hours on tasks — scheduling, data entry, follow-ups — that AI handles in seconds.' },
  { Icon: TrendingDown, title: 'Rising Labor Costs', desc: 'Every manual process has a human cost. AI automates the repetitive work without adding headcount.' },
  { Icon: BarChart2,    title: 'Falling Behind',     desc: 'Your competitors are using AI to outpace you on marketing, pricing, and customer response speed.' },
  { Icon: HelpCircle,   title: 'No Clear Path',      desc: "You know AI is important. You just don't know where it fits your business — or where to start." },
]

const industries = [
  { Icon: Scale,       label: 'Lawyers' },
  { Icon: Smile,       label: 'Dentists' },
  { Icon: Building2,   label: 'Real Estate' },
  { Icon: Wrench,      label: 'Plumbers' },
  { Icon: Stethoscope, label: 'Doctors' },
  { Icon: Car,         label: 'Car Dealers' },
  { Icon: Briefcase,   label: 'Small Business' },
]

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessType: '',
    challenge: '',
    message: '',
    smsConsent: false,
  })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [playbookEmail, setPlaybookEmail] = useState('')
  const [playbookSubmitted, setPlaybookSubmitted] = useState(false)

  return (
    <div className="min-h-screen bg-white">

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
            {/* pb-2 + inline-block prevents bg-clip-text from clipping descenders */}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-blue to-white inline-block pb-2">
              automate your business.
            </span>
          </h1>
          <p className="text-xl font-semibold text-white mb-4">
            No code, no nonsense — just results.
          </p>
          <p className="text-lg text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed">
            From appointment booking to client follow-up, we handle the repetitive work so you can focus on growing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-primary text-lg px-8 py-4 inline-flex items-center justify-center gap-2">
              <Calendar className="w-5 h-5" />
              Book a Free Strategy Call
            </a>
            <a href="#contact" className="btn-red text-lg px-8 py-4">Get a Free AI Audit &rarr;</a>
            <a href="#process" className="px-8 py-4 bg-white/10 text-white font-bold rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/30 inline-block">See How It Works</a>
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
              <h3 className="text-2xl font-bold text-navy mb-1">AI Strategy &amp; Consulting</h3>
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

      {/* Post-Services Booking CTA */}
      <section className="py-14 px-6 bg-sky-blue/5 border-y border-sky-blue/20">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-navy font-bold text-xl mb-2">Ready to see what AI can do for your business?</p>
          <p className="text-charcoal/70 mb-6">Book a free 30-minute strategy call. No pitch — just clarity on where to start.</p>
          <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-primary text-lg px-10 py-4 inline-flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Book a Free Strategy Call
          </a>
        </div>
      </section>

      {/* Workshop Funnel */}
      <section id="workshop" className="gradient-navy-sky py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-10 right-10 w-64 h-64 rounded-full border-2 border-sky-blue animate-pulse" />
          <div className="absolute bottom-10 left-10 w-40 h-40 rounded-full border-2 border-dark-red animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <div className="max-w-3xl mx-auto text-center text-white relative z-10">
          <span className="text-xs font-bold text-sky-blue uppercase tracking-widest block mb-3">Free Event</span>
          <h2 className="text-4xl font-bold mb-5">
            Free AI Automation Workshop
            <span className="block text-2xl font-semibold text-gray-300 mt-2">See What&apos;s Possible for Your Business</span>
          </h2>
          <p className="text-lg text-gray-300 mb-10 max-w-xl mx-auto">
            Join a small-group session and discover exactly how AI can save your business 10+ hours a week — no tech background needed.
          </p>
          <ul className="space-y-4 text-left max-w-lg mx-auto mb-10">
            {[
              'How AI agents handle appointment booking, follow-ups, and CRM — automatically',
              'The 3 workflows every small business should automate first (and how much time they save)',
              'A live demo of AI tools running in a real business — tailored to your industry',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-sky-blue flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <span className="text-gray-200">{item}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-col items-center gap-3">
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-red text-lg px-10 py-4">
              Reserve Your Spot &rarr;
            </a>
            <p className="text-sm font-semibold text-sky-blue">Limited to 10 businesses per session</p>
          </div>
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
                { letter: 'O', label: 'Orient',  color: 'bg-navy shadow-navy/30',         desc: 'We analyze your industry context, competitor AI adoption, and constraints to identify the highest-ROI opportunities.' },
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
                  { date: 'Week 1',    label: 'Observe + Orient',    desc: 'Business audit, AI opportunity mapping, and implementation roadmap delivered.' },
                  { date: 'Week 2–3',  label: 'Build + Deploy',       desc: 'AI systems built, tested, and deployed into your live business environment.' },
                  { date: 'Week 4',    label: 'Optimize + Hand Off',  desc: 'Performance review, team training, and ongoing optimization protocol.' },
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
          <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-red inline-block px-10 py-4 text-lg">Claim My Spot &rarr;</a>
        </div>
      </section>

      {/* Industries */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-navy mb-3">Industries We Serve</h2>
            <p className="text-lg text-charcoal/70">Every industry has repetitive processes. AI can automate them.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            {industries.map(({ Icon, label }) => (
              <div key={label} className="text-center py-6 px-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-sky-blue hover:bg-sky-blue/5 transition-all duration-300 flex flex-col items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-navy/5 flex items-center justify-center">
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

      {/* Trust Signals */}
      <section className="py-16 px-6 bg-navy text-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-sky-blue uppercase tracking-widest block mb-3">Why NYClaw</span>
            <h2 className="text-3xl font-bold">Built for NYC &amp; Westchester Businesses</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">⚖️</div>
              <h3 className="text-lg font-bold text-white mb-2">Legal &amp; Regulated Industries</h3>
              <p className="text-gray-400 text-sm">Trusted by law firms, medical practices, and real estate professionals with complex compliance requirements.</p>
            </div>
            <div className="text-center border-y md:border-y-0 md:border-x border-white/10 py-8 md:py-0 md:px-8">
              <div className="text-5xl font-extrabold text-sky-blue mb-2">870K+</div>
              <h3 className="text-lg font-bold text-white mb-2">NYC Parcels Analyzed</h3>
              <p className="text-gray-400 text-sm">Backed by deep NYC data infrastructure — the same AI systems powering NYRezone now serve your business.</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🏙️</div>
              <h3 className="text-lg font-bold text-white mb-2">Local Market Expertise</h3>
              <p className="text-gray-400 text-sm">We understand NYC and Westchester&apos;s business landscape — zoning, regulations, and competitive dynamics.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Magnet */}
      <section className="py-24 px-6 bg-gradient-to-b from-white to-sky-blue/5">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-navy mb-3">Free AI Readiness Guide</h2>
          <p className="text-lg text-charcoal/70 mb-12">A plain-English guide to where AI fits your business, what it costs, and what to do first. No jargon. No fluff.</p>
          <div className="bg-white border-2 border-sky-blue/20 rounded-2xl p-10 shadow-sm">
            {playbookSubmitted ? (
              <div className="py-4">
                <CheckCircle2 className="w-12 h-12 text-sky-blue mx-auto mb-4" strokeWidth={1.5} />
                <h3 className="text-xl font-bold text-navy mb-2">You&apos;re on the list.</h3>
                <p className="text-charcoal/70 text-sm">We&apos;ll send the guide to your inbox shortly.</p>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold text-navy mb-2">Get the Free Guide</h3>
                <p className="text-sm text-charcoal/70 mb-6">Where AI Fits Your Business &middot; What to Automate First &middot; Real Costs &amp; Timelines &middot; Common Mistakes</p>
                <form onSubmit={(e) => { e.preventDefault(); setPlaybookSubmitted(true) }} className="flex flex-col sm:flex-row gap-3">
                  <input type="email" required value={playbookEmail} onChange={(e) => setPlaybookEmail(e.target.value)} placeholder="your@email.com" className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-sky-blue focus:outline-none text-charcoal text-sm transition-colors" />
                  <button type="submit" className="btn-red px-6 py-3 text-sm whitespace-nowrap">Send Me the Guide &rarr;</button>
                </form>
                <p className="text-xs text-charcoal/40 mt-3">No spam. Unsubscribe anytime.</p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="gradient-navy-sky py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-20 right-20 w-48 h-48 rounded-full border-2 border-sky-blue animate-pulse" />
          <div className="absolute bottom-20 left-20 w-32 h-32 rounded-full border-2 border-dark-red animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <div className="max-w-2xl mx-auto text-white relative z-10">
          <h2 className="text-5xl font-bold mb-4 text-center">Get Your Free AI Audit</h2>
          <p className="text-center mb-2 text-xl">No commitment. No pressure.</p>
          <p className="text-center mb-12 text-lg text-gray-200 max-w-xl mx-auto">We&apos;ll review your business, identify your top 3 AI opportunities, and tell you exactly what implementation would look like and cost.</p>
          {formSubmitted ? (
            <div className="bg-white/10 p-10 rounded-xl backdrop-blur-sm border border-white/20 text-center">
              <CheckCircle2 className="w-16 h-16 text-white mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="text-2xl font-bold text-white mb-3">We got it.</h3>
              <p className="text-gray-200 text-lg">We review every submission and respond within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setFormSubmitted(true) }} className="space-y-5 bg-white/10 p-10 rounded-xl backdrop-blur-sm border border-white/20">
              <div>
                <label className="block font-bold mb-2 text-sm">Your Name *</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-white/95 text-charcoal border-2 border-white/20 focus:border-dark-red focus:outline-none placeholder-gray-400 transition-colors" placeholder="Jane Smith" />
              </div>
              <div>
                <label className="block font-bold mb-2 text-sm">Business Email *</label>
                <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-white/95 text-charcoal border-2 border-white/20 focus:border-dark-red focus:outline-none placeholder-gray-400 transition-colors" placeholder="jane@yourcompany.com" />
              </div>
              <div>
                <label className="block font-bold mb-2 text-sm">Business Type *</label>
                <select required value={formData.businessType} onChange={(e) => setFormData({ ...formData, businessType: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-white/95 text-charcoal border-2 border-white/20 focus:border-dark-red focus:outline-none transition-colors">
                  <option value="">Select your industry...</option>
                  <option value="legal">Legal Services / Law Firm</option>
                  <option value="dental">Dental Practice</option>
                  <option value="real-estate">Real Estate</option>
                  <option value="plumbing">Plumbing / Trades</option>
                  <option value="healthcare">Healthcare / Medical</option>
                  <option value="auto">Car Dealership / Auto</option>
                  <option value="retail">Retail / E-Commerce</option>
                  <option value="hospitality">Hospitality / Restaurant</option>
                  <option value="professional-services">Professional Services</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block font-bold mb-2 text-sm">Biggest Challenge *</label>
                <select required value={formData.challenge} onChange={(e) => setFormData({ ...formData, challenge: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-white/95 text-charcoal border-2 border-white/20 focus:border-dark-red focus:outline-none transition-colors">
                  <option value="">What&apos;s holding your business back?</option>
                  <option value="time">Saving time on repetitive operations</option>
                  <option value="cost">Reducing labor and operational costs</option>
                  <option value="growth">Growing revenue without adding staff</option>
                  <option value="marketing">Marketing and lead generation</option>
                  <option value="where-to-start">Not sure where AI fits my business</option>
                </select>
              </div>
              <div>
                <label className="block font-bold mb-2 text-sm">Phone Number <span className="font-normal opacity-70">(optional)</span></label>
                <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-white/95 text-charcoal border-2 border-white/20 focus:border-dark-red focus:outline-none placeholder-gray-400 transition-colors" placeholder="(914) 555-0100" />
              </div>
              <div>
                <label className="block font-bold mb-2 text-sm">Tell us about your business</label>
                <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-white/95 text-charcoal border-2 border-white/20 focus:border-dark-red focus:outline-none placeholder-gray-400 transition-colors" rows={3} placeholder="How many employees? What does a typical day look like? What takes up the most time?" />
              </div>
              {formData.phone && (
                <div className="flex items-start gap-3 bg-white/10 rounded-lg px-4 py-3 border border-white/20">
                  <input
                    type="checkbox"
                    id="sms-consent"
                    checked={formData.smsConsent}
                    onChange={(e) => setFormData({ ...formData, smsConsent: e.target.checked })}
                    className="mt-1 w-4 h-4 accent-dark-red cursor-pointer flex-shrink-0"
                  />
                  <label htmlFor="sms-consent" className="text-xs text-gray-200 leading-relaxed cursor-pointer">
                    By checking this box, I consent to receive SMS text messages from NYClaw.io at the number provided. Message frequency varies. Message &amp; data rates may apply. Reply STOP to unsubscribe at any time. View our <a href="/privacy" className="underline hover:text-white">Privacy Policy</a>.
                  </label>
                </div>
              )}
              <button type="submit" className="w-full btn-red py-4 text-lg">Request My Free Audit &rarr;</button>
              <p className="text-center text-xs opacity-60">We review every submission and respond within 24 hours. Your info stays private.</p>
            </form>
          )}
        </div>
      </section>

    </div>
  )
}
