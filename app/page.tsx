'use client'

import { useState } from 'react'

const CheckIcon = () => (
  <svg className="w-4 h-4 text-sky-blue flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
)

const BrandIcon = () => (
  <div className="relative w-20 h-20 mx-auto mb-8">
    <div className="absolute inset-0 rounded-full bg-sky-blue/20 animate-ping" style={{ animationDuration: '3s' }} />
    <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-sky-blue to-navy flex items-center justify-center shadow-lg shadow-sky-blue/30">
      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.091zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456z" />
      </svg>
    </div>
  </div>
)

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessType: '',
    challenge: '',
    message: '',
  })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [playbookEmail, setPlaybookEmail] = useState('')
  const [playbookSubmitted, setPlaybookSubmitted] = useState(false)

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="gradient-navy-sky text-white py-28 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 right-10 w-40 h-40 rounded-full border-2 border-sky-blue animate-pulse" />
          <div className="absolute bottom-10 left-10 w-32 h-32 rounded-full border-2 border-dark-red animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
            backgroundSize: '80px 80px'
          }} />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <BrandIcon />
          <div className="mb-5 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-dark-red inline-block" />
            <span className="text-xs font-semibold text-white/90 tracking-wide">Serving Westchester County, NY &amp; Beyond</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold mb-5 leading-tight">
            AI is reshaping
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-blue to-white">
              every industry.
            </span>
          </h1>
          <p className="text-xl font-semibold text-white mb-5">
            Your competitors are already using it. Are you?
          </p>
          <p className="text-lg text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed">
            NYClaw.io implements AI tools, automates your operations, and builds AI-powered marketing
            for small businesses — so you can cut costs, move faster, and scale without adding staff.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
              { number: '8x', label: 'Productivity Gains' },
              { number: '30', label: 'Days to Deployment' },
              { number: '24/7', label: 'Automated Operations' },
            ].map((stat, i) => (
              <div key={i} className="text-center py-8 px-4 bg-gradient-to-b from-sky-blue/5 to-white rounded-2xl border border-sky-blue/10">
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
            {[
              { icon: '&amp;#x23F3;', title: 'Time Drain', desc: 'Your team spends hours on tasks — scheduling, data entry, follow-ups — that AI handles in seconds.' },
              { icon: '&amp;#x1F4B8;', title: 'Rising Labor Costs', desc: 'Every manual process has a human cost. AI automates the repetitive work without adding headcount.' },
              { icon: '&amp;#x1F4C9;', title: 'Falling Behind', desc: 'Your competitors are using AI to outpace you on marketing, pricing, and customer response speed.' },
              { icon: '&amp;#x1F937;', title: 'No Clear Path', desc: "You know AI is important. You just don't know where it fits your business — or where to start." },
            ].map((pain, i) => (
              <div key={i} className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-sky-blue hover:shadow-lg transition-all duration-300">
                <div className="text-3xl mb-4" dangerouslySetInnerHTML={{ __html: pain.icon }} />
                <h3 className="text-base font-bold text-navy mb-2">{pain.title}</h3>
                <p className="text-sm text-charcoal/70 leading-relaxed">{pain.desc}</p>
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
          <div className="grid md:grid-cols-3 gap-8">

            <div className="card-hover min-h-[580px] flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-sky-blue text-white flex items-center justify-center text-lg flex-shrink-0">&#x2699;&#xFE0F;</div>
                <span className="text-xs font-bold text-sky-blue uppercase tracking-wider">Core Service</span>
              </div>
              <h3 className="text-2xl font-bold text-navy mb-1">AI Workflow Automation</h3>
              <p className="text-sky-blue font-bold mb-5 text-sm">Stop doing $20/hour work.</p>
              <div className="bg-sky-blue/5 border border-sky-blue/20 rounded-xl p-4 mb-6">
                <div className="flex items-baseline gap-1 mb-1"><span className="text-2xl font-extrabold text-navy">$1.5K&ndash;4K</span><span className="text-sm text-charcoal/60">setup</span></div>
                <div className="flex items-baseline gap-1"><span className="text-xl font-extrabold text-sky-blue">$199&ndash;499</span><span className="text-sm text-charcoal/60">/mo maintenance</span></div>
              </div>
              <p className="text-charcoal/80 text-sm mb-6 leading-relaxed">We map your workflows, identify automation opportunities, and implement AI systems that run 24/7 without adding staff.</p>
              <div className="p-4 bg-gray-50 rounded-xl mb-6 flex-1">
                <h4 className="font-bold text-navy text-sm mb-3">Includes:</h4>
                <ul className="space-y-2">
                  {['Full workflow audit & process mapping', 'Custom AI automation build', 'CRM, email & scheduling integration', 'Testing, team training & handoff'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-charcoal/80"><CheckIcon /> {item}</li>
                  ))}
                </ul>
              </div>
              <a href="#contact" className="btn-red w-full text-center block py-4">Build My Automation &rarr;</a>
            </div>

            <div className="card-hover min-h-[580px] flex flex-col" style={{ borderColor: 'rgba(0,102,204,0.3)', boxShadow: '0 0 30px rgba(0,102,204,0.08)' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-navy text-white flex items-center justify-center text-lg flex-shrink-0">&#x1F3AF;</div>
                <span className="text-xs font-bold text-navy uppercase tracking-wider">Strategy</span>
              </div>
              <h3 className="text-2xl font-bold text-navy mb-1">AI Strategy & Consulting</h3>
              <p className="text-sky-blue font-bold mb-5 text-sm">Know exactly where AI fits.</p>
              <div className="bg-navy/5 border border-navy/20 rounded-xl p-4 mb-6">
                <div className="flex items-baseline gap-1 mb-1"><span className="text-2xl font-extrabold text-navy">$500</span><span className="text-sm text-charcoal/60">full AI audit (flat)</span></div>
                <div className="flex items-baseline gap-1"><span className="text-xl font-extrabold text-sky-blue">Custom</span><span className="text-sm text-charcoal/60">for ongoing retainer</span></div>
              </div>
              <p className="text-charcoal/80 text-sm mb-6 leading-relaxed">We spend time in your business, identify every AI opportunity, and deliver a prioritized roadmap with clear ROI projections.</p>
              <div className="p-4 bg-gray-50 rounded-xl mb-6 flex-1">
                <h4 className="font-bold text-navy text-sm mb-3">Includes:</h4>
                <ul className="space-y-2">
                  {['Full business operations audit', 'Competitor AI landscape analysis', 'Prioritized AI opportunity list', 'Implementation roadmap + ROI projections'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-charcoal/80"><CheckIcon /> {item}</li>
                  ))}
                </ul>
              </div>
              <a href="#contact" className="btn-red w-full text-center block py-4">Book My AI Audit &rarr;</a>
            </div>

            <div className="card-hover min-h-[580px] flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-dark-red text-white flex items-center justify-center text-lg flex-shrink-0">&#x1F4F1;</div>
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
                  {['Automated daily content production', 'AI-driven lead generation funnels', 'Email & SMS automation sequences', 'Multi-platform distribution management'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-charcoal/80"><CheckIcon /> {item}</li>
                  ))}
                </ul>
              </div>
              <a href="#contact" className="btn-red w-full text-center block py-4">Start Growing &rarr;</a>
            </div>

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
                { letter: 'O', label: 'Orient', color: 'bg-navy shadow-navy/30', desc: 'We analyze your industry context, competitor AI adoption, and constraints to identify the highest-ROI opportunities.' },
                { letter: 'D', label: 'Decide', color: 'bg-sky-blue shadow-sky-blue/30', desc: 'We deliver a prioritized roadmap: which AI tools to deploy, in what order, with clear returns and exact costs.' },
                { letter: 'A', label: 'Act', color: 'bg-dark-red shadow-dark-red/30', desc: 'We build, test, deploy, and optimize your AI systems. You get a fully operational setup — and the training to run it.' },
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
                <span className="text-red-500">&#x2715;</span> Without AI Implementation
              </h3>
              <ul className="space-y-4">
                {['Staff spending hours on repetitive tasks daily', 'Manual follow-ups, scheduling, data entry', 'Inconsistent customer communication', 'Limited marketing output due to bandwidth', 'Decisions based on gut, not real-time data', 'High cost per customer served'].map((item, i) => (
                  <li key={i} className="flex gap-3 text-charcoal/80 text-sm">
                    <span className="text-red-400 font-bold flex-shrink-0 mt-0.5">&ndash;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-sky-blue/5 border-2 border-sky-blue/30 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-navy mb-6 flex items-center gap-2">
                <span className="text-sky-blue">&#x2713;</span> With NYClaw AI Implementation
              </h3>
              <ul className="space-y-4">
                {['AI handles all repetitive operations 24/7', 'Automated follow-ups, scheduling & CRM sync', 'Consistent, personalized experience at scale', 'AI-generated content running every day', 'Real-time dashboards driving smart decisions', 'Lower cost per customer, higher margin'].map((item, i) => (
                  <li key={i} className="flex gap-3 text-charcoal/80 text-sm">
                    <span className="text-sky-blue font-bold flex-shrink-0 mt-0.5">&#x2713;</span>
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
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { gradient: 'from-sky-blue to-navy', border: 'hover:border-sky-blue', badge: 'Digital Automation', badgeColor: 'text-sky-blue/80', title: 'Automated Revenue System', desc: 'A fully automated digital revenue engine with AI-driven optimization and real-time performance tracking — live in under 2 weeks.', s1k: 'Timeline', s1v: 'Concept to live in 2 weeks', s2k: 'Operations', s2v: '100% automated, 0 manual work', revenue: '$500&ndash;2K/mo recurring' },
              { gradient: 'from-dark-red to-charcoal', border: 'hover:border-dark-red', badge: 'Brand Automation', badgeColor: 'text-red-200', title: 'AI-Powered Content & Marketing', desc: 'Full-stack AI marketing: daily content generation, multi-platform distribution, and AI-managed lead funnels — zero manual work.', s1k: 'Output', s1v: '7+ pieces of content/day, automated', s2k: 'Distribution', s2v: 'Multi-platform, parallel', revenue: '$1&ndash;5K/mo potential' },
              { gradient: 'from-sky-blue/80 to-charcoal', border: 'hover:border-sky-blue', badge: 'Industry SaaS', badgeColor: 'text-sky-blue/80', title: 'Custom AI Tooling', desc: 'Custom-built AI workflow platform for a regulated professional services industry — replacing hours of manual work per job.', s1k: 'Impact', s1v: 'Hours of manual work eliminated/job', s2k: 'Model', s2v: 'Freemium SaaS, tiered pricing', revenue: '$2&ndash;10K/mo recurring' },
            ].map((c, i) => (
              <div key={i} className={`card ${c.border} group min-h-[460px] flex flex-col`}>
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
                  <div className="text-xs font-bold text-dark-red" dangerouslySetInnerHTML={{ __html: c.revenue }} />
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
                  { date: 'Week 1', label: 'Observe + Orient', desc: 'Business audit, AI opportunity mapping, and implementation roadmap delivered.' },
                  { date: 'Week 2\u20133', label: 'Build + Deploy', desc: 'AI systems built, tested, and deployed into your live business environment.' },
                  { date: 'Week 4', label: 'Optimize + Hand Off', desc: 'Performance review, team training, and ongoing optimization protocol.' },
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
            {[
              { icon: '&#x1F3E0;', label: 'Real Estate' },
              { icon: '&#x2696;&#xFE0F;', label: 'Legal Services' },
              { icon: '&#x1F3E5;', label: 'Healthcare' },
              { icon: '&#x1F6CD;&#xFE0F;', label: 'Retail / E-Comm' },
              { icon: '&#x1F37D;&#xFE0F;', label: 'Hospitality' },
              { icon: '&#x1F527;', label: 'Contractors' },
            ].map((ind, i) => (
              <div key={i} className="text-center py-6 px-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-sky-blue hover:bg-sky-blue/5 transition-all duration-300">
                <div className="text-3xl mb-3" dangerouslySetInnerHTML={{ __html: ind.icon }} />
                <p className="text-sm font-semibold text-navy">{ind.label}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-8 text-charcoal/60 text-sm">
            Don&apos;t see your industry? <a href="#contact" className="text-sky-blue font-semibold hover:underline underline-offset-4">Get in touch</a> &mdash; we likely have a solution.
          </p>
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
                <div className="text-4xl mb-4">&#x2713;</div>
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
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-20 w-48 h-48 rounded-full border-2 border-sky-blue animate-pulse" />
          <div className="absolute bottom-20 left-20 w-32 h-32 rounded-full border-2 border-dark-red animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <div className="max-w-2xl mx-auto text-white relative z-10">
          <h2 className="text-5xl font-bold mb-4 text-center">Get Your Free AI Audit</h2>
          <p className="text-center mb-2 text-xl">No commitment. No pressure.</p>
          <p className="text-center mb-12 text-lg text-gray-200 max-w-xl mx-auto">We&apos;ll review your business, identify your top 3 AI opportunities, and tell you exactly what implementation would look like and cost.</p>
          {formSubmitted ? (
            <div className="bg-white/10 p-10 rounded-xl backdrop-blur-sm border border-white/20 text-center">
              <div className="text-5xl mb-4">&#x2713;</div>
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
                  <option value="real-estate">Real Estate</option>
                  <option value="legal">Legal Services</option>
                  <option value="healthcare">Healthcare / Medical</option>
                  <option value="retail">Retail / E-Commerce</option>
                  <option value="hospitality">Hospitality / Restaurant</option>
                  <option value="contractor">Contractor / Trades</option>
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
                <label className="block font-bold mb-2 text-sm">Tell us about your business</label>
                <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-white/95 text-charcoal border-2 border-white/20 focus:border-dark-red focus:outline-none placeholder-gray-400 transition-colors" rows={3} placeholder="How many employees? What does a typical day look like? What takes up the most time?" />
              </div>
              <button type="submit" className="w-full btn-red py-4 text-lg">Request My Free Audit &rarr;</button>
              <p className="text-center text-xs opacity-60">We review every submission and respond within 24 hours. Your info stays private.</p>
            </form>
          )}
        </div>
      </section>

    </div>
  )
}
