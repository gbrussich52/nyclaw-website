'use client'

import { useState } from 'react'

const CheckIcon = () => (
  <svg className="w-4 h-4 text-sky-blue flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
)

const AinsleySVG = () => (
  <div className="relative w-24 h-24 mx-auto mb-8">
    <div className="absolute inset-0 rounded-full bg-sky-blue/20 animate-ping" style={{ animationDuration: '3s' }} />
    <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-sky-blue to-navy flex items-center justify-center shadow-lg shadow-sky-blue/30">
      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    project: 'setup-agency',
    message: '',
  })
  const [playbookEmail, setPlaybookEmail] = useState('')
  const [playbookSubmitted, setPlaybookSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert("Thank you! We'll be in touch within 12 hours.")
    setFormData({ name: '', email: '', project: 'setup-agency', message: '' })
  }

  return (
    <div className="min-h-screen bg-white">

      {/* ── Navigation ─────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <div className="text-2xl font-bold leading-none">
              <span className="text-navy">NY</span>
              <span className="text-sky-blue">C</span>
              <span className="text-sky-blue">law</span>
              <span className="text-dark-red">.</span>
              <span className="text-navy">io</span>
            </div>
            <div className="text-xs text-charcoal/60 font-medium tracking-wide mt-0.5">
              AI Automation Agency
            </div>
          </div>
          <div className="flex items-center gap-6">
            <a href="#services" className="text-charcoal hover:text-sky-blue transition text-base font-semibold hidden sm:block hover:underline underline-offset-4">Services</a>
            <a href="#cases" className="text-charcoal hover:text-sky-blue transition text-base font-semibold hidden sm:block hover:underline underline-offset-4">Case Studies</a>
            <a href="#contact" className="btn-red text-sm px-5 py-2.5">Get Started →</a>
          </div>
        </nav>
      </header>

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="gradient-navy-sky text-white py-28 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 right-10 w-40 h-40 rounded-full border-2 border-sky-blue animate-pulse" />
          <div className="absolute bottom-10 left-10 w-32 h-32 rounded-full border-2 border-dark-red animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <AinsleySVG />
          <div className="mb-5 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-dark-red inline-block" />
            <span className="text-xs font-semibold text-white/90 tracking-wide">AI Powered, Human Experience</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
            Scaling kills you.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-blue to-white">
              Manual work kills profit.
            </span>
          </h1>
          <p className="text-lg text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed">
            You&apos;re juggling everything: content, code, marketing, revenue tracking, affiliate optimization.
            You need to scale but you can&apos;t clone yourself.
          </p>
          <div className="mb-6">
            <span className="text-sm font-bold text-dark-red uppercase tracking-widest">The Solution</span>
            <h2 className="text-2xl font-bold mt-2 text-white mb-3">Meet Ainsley — your AI entrepreneur</h2>
            <p className="text-base text-gray-300 max-w-xl mx-auto">
              Running 24/7 on Mac Studio. Full control of websites, email, Stripe, and operations.{' '}
              <strong className="text-white">Building real revenue. Proving what&apos;s possible.</strong>
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <a href="#contact" className="btn-red text-lg px-8 py-4">
              Build My AI →
            </a>
            <a href="#cases" className="px-8 py-4 bg-white/10 text-white font-bold rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/30 inline-block">
              See the Proof
            </a>
          </div>
        </div>
      </section>

      {/* ── Comparison: Stats First ────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Stats row leads the section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {[
              { number: '8x', label: 'More Productivity' },
              { number: '∞', label: 'Parallel Projects' },
              { number: '24/7', label: 'Revenue Generation' },
              { number: '10x', label: 'Faster Scaling' },
            ].map((stat, i) => (
              <div key={i} className="text-center py-8 px-4 bg-gradient-to-b from-sky-blue/5 to-white rounded-2xl border border-sky-blue/10">
                <div className="text-5xl font-extrabold text-sky-blue mb-2 leading-none">{stat.number}</div>
                <div className="text-sm font-semibold text-charcoal/70 uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-navy mb-3">Without AI vs With Ainsley</h2>
            <p className="text-lg text-charcoal/70">See what changes when you have an AI entrepreneur doing the work</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Without */}
            <div className="bg-red-50 border-2 border-red-100 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-charcoal mb-6 flex items-center gap-2">
                <span className="text-red-500">✕</span> Without AI
              </h3>
              <ul className="space-y-4">
                {[
                  'You handle everything',
                  '40 hours/week on operations',
                  'Manual revenue tracking (spreadsheets)',
                  'Content creation takes weeks',
                  'One business max',
                  'Sleep required — you lose productivity',
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-charcoal/80 text-sm">
                    <span className="text-red-400 font-bold flex-shrink-0 mt-0.5">–</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* With Ainsley */}
            <div className="bg-sky-blue/5 border-2 border-sky-blue/30 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-navy mb-6 flex items-center gap-2">
                <span className="text-sky-blue">✓</span> With Ainsley
              </h3>
              <ul className="space-y-4">
                {[
                  'AI handles execution',
                  '5 hours/week on strategy',
                  'Real-time revenue dashboard',
                  'Content produced daily',
                  'Multiple businesses simultaneously',
                  '24/7 productivity — AI never sleeps',
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-charcoal/80 text-sm">
                    <span className="text-sky-blue font-bold flex-shrink-0 mt-0.5">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── What We're Building — Revenue as headline ─────────────────── */}
      <section className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy mb-3">What We&apos;re Building Right Now</h2>
            <p className="text-lg text-charcoal/70">Real businesses. Real revenue potential. Real proof.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Rumble Simulator', status: '🟢 Live', revenue: '$500–2K', period: '/mo', label: 'Sports Betting Affiliates' },
              { title: 'Sarah Influencer', status: '🟡 Launching', revenue: '$1–5K', period: '/mo', label: 'AI Characters · Dual Brand' },
              { title: 'Property Appraisal Pro', status: '🟡 SaaS Ready', revenue: '$2–10K', period: '/mo', label: 'USPAP · Freemium SaaS' },
            ].map((project, i) => (
              <div key={i} className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-sky-blue hover:shadow-lg transition-all duration-300">
                <div className="flex justify-between items-start mb-5">
                  <h3 className="text-base font-bold text-navy">{project.title}</h3>
                  <span className="text-xs font-medium text-charcoal/60 bg-gray-50 px-2 py-1 rounded-full">{project.status}</span>
                </div>
                <div className="mb-2">
                  <span className="text-4xl font-extrabold text-sky-blue">{project.revenue}</span>
                  <span className="text-lg font-bold text-charcoal/40">{project.period}</span>
                </div>
                <p className="text-xs text-charcoal/60 font-medium uppercase tracking-wide">{project.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 30-Day Proof Banner ────────────────────────────────────────── */}
      <section className="bg-navy text-white py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-dark-red font-bold uppercase tracking-widest text-sm mb-4">The Proof</p>
          <p className="text-5xl font-extrabold mb-4 leading-tight">
            3 businesses.<br />30 days.
          </p>
          <p className="text-xl text-gray-300 mb-10">
            All generating revenue. Multi-stream is possible.
          </p>
          <a href="#contact" className="btn-red inline-block px-10 py-4 text-lg">
            Build Mine →
          </a>
        </div>
      </section>

      {/* ── Services — Pricing at top ──────────────────────────────────── */}
      <section id="services" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy mb-3">Pick Your Path</h2>
            <p className="text-lg text-charcoal/70">Two proven models. Both building real revenue.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">

            {/* Service 1: AI Setup Agency */}
            <div className="card-hover min-h-[600px] flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-sky-blue text-white flex items-center justify-center text-lg flex-shrink-0">⚙️</div>
                <span className="text-xs font-bold text-sky-blue uppercase tracking-wider">Service 1</span>
              </div>
              <h3 className="text-2xl font-bold text-navy mb-1">AI Setup Agency</h3>
              <p className="text-sky-blue font-bold mb-5 text-sm">Stop managing. Start scaling.</p>

              {/* Pricing — at top */}
              <div className="bg-sky-blue/5 border border-sky-blue/20 rounded-xl p-4 mb-6">
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-2xl font-extrabold text-navy">$2K–5K</span>
                  <span className="text-sm text-charcoal/60">setup</span>
                </div>
                <p className="text-xs text-charcoal/60 mb-3">Initial configuration + training</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-extrabold text-sky-blue">$99–250</span>
                  <span className="text-sm text-charcoal/60">/mo ongoing</span>
                </div>
              </div>

              <p className="text-charcoal/80 text-sm mb-6 leading-relaxed">
                We design, build, and manage a custom AI entrepreneur for your business. 24/7 operations. Real revenue tracking. Zero manual work.
              </p>

              <div className="p-4 bg-gray-50 rounded-xl mb-6">
                <h4 className="font-bold text-navy text-sm mb-3">Includes:</h4>
                <ul className="space-y-2">
                  {[
                    'Custom AI setup on your hardware',
                    'Revenue tracking dashboard (real-time)',
                    '24/7 management & optimization',
                    'Monthly strategy sessions',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-charcoal/80">
                      <CheckIcon /> {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto">
                <a href="#contact" className="btn-red w-full text-center block py-4">
                  Build My AI Setup →
                </a>
              </div>
            </div>

            {/* Service 2: AI Marketing Agency */}
            <div className="card-hover min-h-[600px] flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-dark-red text-white flex items-center justify-center text-lg flex-shrink-0">📱</div>
                <span className="text-xs font-bold text-dark-red uppercase tracking-wider">Service 2</span>
              </div>
              <h3 className="text-2xl font-bold text-navy mb-1">AI Marketing Agency</h3>
              <p className="text-dark-red font-bold mb-5 text-sm">Build influencers that generate revenue.</p>

              {/* Pricing — at top */}
              <div className="bg-dark-red/5 border border-dark-red/20 rounded-xl p-4 mb-6">
                <p className="text-xs font-bold text-navy mb-2 uppercase tracking-wide">Flexible Pricing</p>
                <p className="text-sm text-charcoal/80 mb-2">
                  <strong>Option A:</strong> Revenue share — 20–30% of affiliate earnings
                </p>
                <p className="text-sm text-charcoal/80">
                  <strong>Option B:</strong> Fixed monthly + profit share
                </p>
              </div>

              <p className="text-charcoal/80 text-sm mb-6 leading-relaxed">
                We create, manage, and monetize AI characters that build audiences and generate revenue through affiliates, UGC, and brand deals.
              </p>

              <div className="p-4 bg-gray-50 rounded-xl mb-6">
                <h4 className="font-bold text-navy text-sm mb-3">Includes:</h4>
                <ul className="space-y-2">
                  {[
                    'AI character design & personality',
                    'Daily UGC production',
                    'Multi-platform content strategy',
                    'Affiliate optimization & testing',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-charcoal/80">
                      <CheckIcon /> {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto">
                <a href="#contact" className="btn-red w-full text-center block py-4">
                  Start My AI Brand →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Case Studies — SVG card art ────────────────────────────────── */}
      <section id="cases" className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy mb-3">Real Projects. Real Revenue.</h2>
            <p className="text-lg text-charcoal/70">Built in 30 days. Proving the model works.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Rumble Simulator */}
            <div className="card hover:border-sky-blue group min-h-[460px] flex flex-col">
              <div className="mb-6 h-36 bg-gradient-to-br from-sky-blue to-navy rounded-xl flex flex-col items-center justify-center group-hover:shadow-lg transition-all relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-3 right-3 w-16 h-16 rounded-full border border-white" />
                  <div className="absolute bottom-3 left-3 w-10 h-10 rounded-full border border-white" />
                </div>
                <svg className="w-10 h-10 text-white mb-2 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
                <p className="text-white text-sm font-bold relative z-10">Rumble Simulator</p>
                <span className="text-xs text-sky-blue/80 bg-white/10 px-2 py-0.5 rounded-full mt-1 relative z-10">Affiliate</span>
              </div>
              <h3 className="text-lg font-bold text-navy mb-2">Affiliate Monetization</h3>
              <p className="text-sm text-charcoal/70 mb-4 flex-1">
                Sports draft tool converting users to sports betting affiliates (BetMGM live, DraftKings pending).
              </p>
              <div className="space-y-1.5 mb-5">
                <div className="text-xs text-charcoal/60"><span className="font-semibold text-sky-blue">Status:</span> 🟢 Live</div>
                <div className="text-xs text-charcoal/60"><span className="font-semibold text-sky-blue">Model:</span> Affiliate CTA</div>
                <div className="text-xs font-bold text-dark-red">$500–2K/mo potential</div>
              </div>
              <a href="#contact" className="btn-primary text-sm text-center block py-3">View Details</a>
            </div>

            {/* Sarah Influencer */}
            <div className="card hover:border-dark-red group min-h-[460px] flex flex-col">
              <div className="mb-6 h-36 bg-gradient-to-br from-dark-red to-charcoal rounded-xl flex flex-col items-center justify-center group-hover:shadow-lg transition-all relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-3 right-3 w-16 h-16 rounded-full border border-white" />
                  <div className="absolute bottom-3 left-3 w-10 h-10 rounded-full border border-white" />
                </div>
                <svg className="w-10 h-10 text-white mb-2 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
                <p className="text-white text-sm font-bold relative z-10">Sarah Influencer</p>
                <span className="text-xs text-red-200 bg-white/10 px-2 py-0.5 rounded-full mt-1 relative z-10">AI Character</span>
              </div>
              <h3 className="text-lg font-bold text-navy mb-2">AI Marketing Agency</h3>
              <p className="text-sm text-charcoal/70 mb-4 flex-1">
                Dual-account fitness influencer with AI UGC, supplement affiliates, and daily content production.
              </p>
              <div className="space-y-1.5 mb-5">
                <div className="text-xs text-charcoal/60"><span className="font-semibold text-dark-red">Status:</span> 🟡 Launching</div>
                <div className="text-xs text-charcoal/60"><span className="font-semibold text-dark-red">Model:</span> Multi-affiliate</div>
                <div className="text-xs font-bold text-dark-red">$1–5K/mo potential</div>
              </div>
              <a href="#contact" className="btn-primary text-sm text-center block py-3">View Details</a>
            </div>

            {/* Property Appraisal Pro */}
            <div className="card hover:border-sky-blue group min-h-[460px] flex flex-col">
              <div className="mb-6 h-36 bg-gradient-to-br from-sky-blue/80 to-charcoal rounded-xl flex flex-col items-center justify-center group-hover:shadow-lg transition-all relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-3 right-3 w-16 h-16 rounded-full border border-white" />
                  <div className="absolute bottom-3 left-3 w-10 h-10 rounded-full border border-white" />
                </div>
                <svg className="w-10 h-10 text-white mb-2 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
                <p className="text-white text-sm font-bold relative z-10">Property Appraisal Pro</p>
                <span className="text-xs text-sky-blue/80 bg-white/10 px-2 py-0.5 rounded-full mt-1 relative z-10">SaaS</span>
              </div>
              <h3 className="text-lg font-bold text-navy mb-2">SaaS Infrastructure</h3>
              <p className="text-sm text-charcoal/70 mb-4 flex-1">
                USPAP-compliant appraisal tool with OAuth, freemium tier, and AI-powered adjustment suggestions.
              </p>
              <div className="space-y-1.5 mb-5">
                <div className="text-xs text-charcoal/60"><span className="font-semibold text-sky-blue">Status:</span> 🟡 Ready</div>
                <div className="text-xs text-charcoal/60"><span className="font-semibold text-sky-blue">Model:</span> Freemium SaaS</div>
                <div className="text-xs font-bold text-dark-red">$2–10K/mo potential</div>
              </div>
              <a href="#contact" className="btn-primary text-sm text-center block py-3">View Details</a>
            </div>
          </div>

          {/* The Experiment — Timeline */}
          <div className="mt-16 bg-white border border-gray-100 rounded-2xl p-10">
            <h3 className="text-2xl font-bold text-navy mb-10 text-center">The Experiment</h3>
            <div className="relative">
              {/* Connector line */}
              <div className="hidden md:block absolute top-5 left-[16.67%] right-[16.67%] h-0.5 bg-gradient-to-r from-sky-blue via-navy to-sky-blue opacity-30" />
              <div className="grid md:grid-cols-3 gap-8 text-center">
                {[
                  {
                    date: 'Feb 25',
                    label: 'Discovery',
                    desc: 'Giani discovered OpenClaw and decided to prove AI could build real businesses.',
                  },
                  {
                    date: 'Feb 25–27',
                    label: '48 Hours',
                    desc: 'Ainsley designed and launched 3 different business models across different verticals.',
                  },
                  {
                    date: 'Feb 28',
                    label: 'Revenue Ready',
                    desc: 'All 3 projects have infrastructure, monetization, and are ready for revenue.',
                  },
                ].map((step, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-sky-blue text-white flex items-center justify-center font-bold text-sm mb-3 relative z-10 shadow-md shadow-sky-blue/30">
                      {i + 1}
                    </div>
                    <p className="text-xs font-bold text-sky-blue uppercase tracking-wider mb-1">{step.date}</p>
                    <p className="text-base font-bold text-navy mb-2">{step.label}</p>
                    <p className="text-sm text-charcoal/70 leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-center mt-10 text-sky-blue font-bold">
              The insight: Speed matters. Multi-stream revenue matters. AI execution matters.
            </p>
          </div>
        </div>
      </section>

      {/* ── Playbook → Email Capture ───────────────────────────────────── */}
      <section className="py-24 px-6 bg-gradient-to-b from-white to-sky-blue/5">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-navy mb-3">The Playbook</h2>
          <p className="text-lg text-charcoal/70 mb-12">
            SOPs, setup guides, and revenue strategies — documented as we build. Get early access.
          </p>
          <div className="bg-white border-2 border-sky-blue/20 rounded-2xl p-10 shadow-sm">
            {playbookSubmitted ? (
              <div className="py-4">
                <div className="text-4xl mb-4">✓</div>
                <h3 className="text-xl font-bold text-navy mb-2">You&apos;re on the list.</h3>
                <p className="text-charcoal/70 text-sm">We&apos;ll send you the first guide when it drops.</p>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold text-navy mb-2">Get the Playbook</h3>
                <p className="text-sm text-charcoal/70 mb-6">
                  How to Set Up Your AI · Building AI Influencers · Monetizing Tools · Multi-Stream Revenue
                </p>
                <form
                  onSubmit={(e) => { e.preventDefault(); setPlaybookSubmitted(true) }}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <input
                    type="email"
                    required
                    value={playbookEmail}
                    onChange={(e) => setPlaybookEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-sky-blue focus:outline-none text-charcoal text-sm transition-colors"
                  />
                  <button type="submit" className="btn-red px-6 py-3 text-sm whitespace-nowrap">
                    Get Early Access →
                  </button>
                </form>
                <p className="text-xs text-charcoal/40 mt-3">No spam. Just the real SOPs we use.</p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── Contact Form ───────────────────────────────────────────────── */}
      <section id="contact" className="gradient-navy-sky py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-20 w-48 h-48 rounded-full border-2 border-sky-blue animate-pulse" />
          <div className="absolute bottom-20 left-20 w-32 h-32 rounded-full border-2 border-dark-red animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <div className="max-w-2xl mx-auto text-white relative z-10">
          <h2 className="text-5xl font-bold mb-4 text-center">Let&apos;s Build</h2>
          <p className="text-center mb-2 text-xl">Your AI is waiting.</p>
          <p className="text-center mb-12 text-lg text-gray-200 max-w-xl mx-auto">
            Limited capacity. We work with 3–5 founders per quarter. Early conversations get priority.
          </p>
          <form onSubmit={handleSubmit} className="space-y-5 bg-white/10 p-10 rounded-xl backdrop-blur-sm border border-white/20">
            <div>
              <label className="block font-bold mb-2 text-sm">Your Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/95 text-charcoal border-2 border-white/20 focus:border-dark-red focus:outline-none placeholder-gray-400 transition-colors"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block font-bold mb-2 text-sm">Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/95 text-charcoal border-2 border-white/20 focus:border-dark-red focus:outline-none placeholder-gray-400 transition-colors"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block font-bold mb-2 text-sm">Which Service Interests You? *</label>
              <select
                value={formData.project}
                onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/95 text-charcoal border-2 border-white/20 focus:border-dark-red focus:outline-none transition-colors"
              >
                <option value="setup-agency">AI Setup Agency ($2–5K setup + monthly)</option>
                <option value="marketing-agency">AI Marketing Agency (revenue share)</option>
                <option value="both">Both — I want to explore</option>
                <option value="other">I&apos;m not sure yet</option>
              </select>
            </div>
            <div>
              <label className="block font-bold mb-2 text-sm">Tell us about your business</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/95 text-charcoal border-2 border-white/20 focus:border-dark-red focus:outline-none placeholder-gray-400 transition-colors"
                rows={3}
                placeholder="What are you building? What's holding you back?"
              />
            </div>
            <button
              type="submit"
              className="w-full btn-red py-4 text-lg"
            >
              Claim My Spot →
            </button>
            <p className="text-center text-xs opacity-60">
              We typically respond within 12 hours. Privacy: Your info is just for us.
            </p>
          </form>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer className="bg-charcoal text-white py-8 px-6 text-center">
        <p className="text-sm font-semibold text-white/80 mb-1">AI Powered, Human Experience</p>
        <p className="text-xs text-white/40">&copy; 2026 NYClaw.io. Built by Ainsley &amp; Giani.</p>
      </footer>
    </div>
  )
}
