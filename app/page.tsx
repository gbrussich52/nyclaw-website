'use client'

import { useState } from 'react'

const PulseIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="3" />
  </svg>
)

const CheckIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
)

const AIIcon = () => (
  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: 'setup-agency',
    message: '',
  })

  const [activeTab, setActiveTab] = useState('before')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert("Thank you! We'll be in touch soon.")
    setFormData({ name: '', email: '', project: 'setup-agency', message: '' })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header/Nav */}
      <header className="sticky top-0 z-50 bg-white border-b-2 border-sky-blue">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold">
            <span className="text-navy">NY</span>
            <span className="text-sky-blue">C</span>
            <span className="text-sky-blue">law</span>
            <span className="text-dark-red">.</span>
            <span className="text-navy">io</span>
          </div>
          <div className="flex gap-6">
            <a href="#services" className="text-charcoal hover:text-sky-blue transition">Services</a>
            <a href="#cases" className="text-charcoal hover:text-sky-blue transition">Case Studies</a>
            <a href="#contact" className="btn-primary text-sm">Get Started</a>
          </div>
        </nav>
      </header>

      {/* Hero Section - Problem/Solution */}
      <section className="gradient-navy-sky text-white py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 right-10 w-40 h-40 rounded-full border-2 border-sky-blue animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-32 h-32 rounded-full border-2 border-dark-red animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="mb-6 inline-block">
            <span className="text-sm font-bold text-sky-blue uppercase tracking-wider">The Problem</span>
          </div>
          
          <h1 className="text-6xl font-bold mb-6 leading-tight">
            Scaling kills you.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-blue to-white">Manual work kills profit.</span>
          </h1>
          
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            You're juggling everything: content, code, marketing, revenue tracking, affiliate optimization. 
            You need to scale but you can't clone yourself.
          </p>

          <div className="mb-12">
            <span className="text-sm font-bold text-dark-red uppercase tracking-wider">The Solution</span>
            <h2 className="text-3xl font-bold mt-3 text-sky-blue mb-4">Meet Ainsley</h2>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              An AI entrepreneur running 24/7 on Mac Studio. Full control of websites, email, Stripe, and business operations. 
              <br />
              <strong>Building real revenue. Proving what's possible.</strong>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#services" className="btn-primary inline-block">
              Explore Services
            </a>
            <a href="#cases" className="px-6 py-3 bg-white/10 text-white font-bold rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/30 inline-block">
              See What We've Built
            </a>
          </div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy mb-4">Without AI vs With Ainsley</h2>
            <p className="text-lg text-charcoal max-w-2xl mx-auto">See what changes when you have an AI entrepreneur doing the work</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Without */}
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-charcoal mb-6">❌ Without AI</h3>
              <ul className="space-y-4">
                {['You handle everything', '40 hours/week on operations', 'Manual revenue tracking (spreadsheets)', 'Content creation takes weeks', 'One business max', 'Sleep required (you lose productivity)'].map((item, i) => (
                  <li key={i} className="flex gap-3 text-charcoal">
                    <span className="text-red-500 font-bold text-lg">-</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* With Ainsley */}
            <div className="bg-sky-blue/5 border-2 border-sky-blue rounded-xl p-8 pulse-neon">
              <h3 className="text-2xl font-bold text-navy mb-6">✓ With Ainsley</h3>
              <ul className="space-y-4">
                {['AI handles execution', '5 hours/week on strategy', 'Real-time revenue dashboard', 'Content produced daily', 'Multiple businesses simultaneously', '24/7 productivity (AI never sleeps)'].map((item, i) => (
                  <li key={i} className="flex gap-3 text-charcoal">
                    <span className="text-sky-blue font-bold text-lg">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="mt-16 grid md:grid-cols-4 gap-6">
            {[
              { number: '8x', label: 'More Productivity' },
              { number: '∞', label: 'Parallel Projects' },
              { number: '24/7', label: 'Revenue Generation' },
              { number: '10x', label: 'Faster Scaling' }
            ].map((stat, i) => (
              <div key={i} className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="text-4xl font-bold text-sky-blue mb-2">{stat.number}</div>
                <div className="text-charcoal font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Real Numbers Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy mb-4">What We're Building Right Now</h2>
            <p className="text-lg text-charcoal max-w-2xl mx-auto">Real businesses. Real revenue potential. Real proof.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: 'Rumble Simulator',
                status: '🟢 Live',
                metric: '∞',
                metricLabel: 'Sports Betting Affiliates',
                potential: '$500-2K/month potential'
              },
              {
                title: 'Sarah Influencer',
                status: '🟡 Launching Sunday',
                metric: '2',
                metricLabel: 'AI Characters (Dual Brand)',
                potential: '$1-5K/month potential'
              },
              {
                title: 'Property Appraisal Pro',
                status: '🟡 SaaS Ready',
                metric: 'USPAP',
                metricLabel: 'Compliant Appraisals',
                potential: '$2-10K/month potential'
              }
            ].map((project, i) => (
              <div key={i} className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-sky-blue transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-navy">{project.title}</h3>
                  <span className="text-sm">{project.status}</span>
                </div>
                <div className="mb-4">
                  <div className="text-3xl font-bold text-sky-blue">{project.metric}</div>
                  <div className="text-sm text-charcoal">{project.metricLabel}</div>
                </div>
                <div className="text-sm font-bold text-dark-red">{project.potential}</div>
              </div>
            ))}
          </div>

          <div className="bg-navy text-white p-8 rounded-xl text-center">
            <p className="text-lg mb-2">All 3 projects built in <strong>30 days</strong></p>
            <p className="text-3xl font-bold">Proving multi-stream revenue is possible</p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 px-6 bg-gradient-to-b from-white via-sky-blue/2 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy mb-4">Pick Your Path</h2>
            <p className="text-lg text-charcoal max-w-2xl mx-auto">Two proven models. Both building real revenue.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Service 1: AI Setup Agency */}
            <div className="card-hover pulse-neon min-h-[600px] flex flex-col">
              <div className="mb-4">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-sky-blue text-white mb-3">
                  <span className="text-lg">⚙️</span>
                </div>
                <span className="inline-block bg-sky-blue text-white px-3 py-1 rounded-full text-sm font-bold">Service 1</span>
              </div>
              <h3 className="text-2xl font-bold text-navy mb-2">AI Setup Agency</h3>
              <p className="text-sky-blue font-bold mb-4">Stop managing. Start scaling.</p>
              <p className="text-charcoal mb-6">
                We design, build, and manage a custom AI entrepreneur for your business. 24/7 operations. Real revenue tracking. Zero manual work.
              </p>
              
              <div className="mb-6 p-4 bg-sky-blue/5 rounded-lg">
                <h4 className="font-bold text-navy mb-3">Includes:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckIcon /> Custom AI setup on your hardware
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon /> Revenue tracking dashboard (real-time)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon /> 24/7 management & optimization
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon /> Monthly strategy sessions
                  </li>
                </ul>
              </div>

              <div className="bg-sky-blue/10 border-l-4 border-sky-blue p-4 rounded-lg mb-6">
                <p className="text-lg font-bold text-navy mb-1">$2K-5K Setup</p>
                <p className="text-sm text-charcoal">Initial configuration + training</p>
                <p className="text-lg font-bold text-sky-blue mt-3">$99-250/mo</p>
                <p className="text-sm text-charcoal">Ongoing management</p>
              </div>

              <a href="#contact" className="btn-primary block text-center w-full mt-auto">Get Setup Plan</a>
            </div>

            {/* Service 2: AI Marketing Agency */}
            <div className="card-hover pulse-neon min-h-[600px] flex flex-col" style={{animationDelay: '0.5s'}}>
              <div className="mb-4">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-dark-red text-white mb-3">
                  <span className="text-lg">📱</span>
                </div>
                <span className="inline-block bg-dark-red text-white px-3 py-1 rounded-full text-sm font-bold">Service 2</span>
              </div>
              <h3 className="text-2xl font-bold text-navy mb-2">AI Marketing Agency</h3>
              <p className="text-dark-red font-bold mb-4">Build influencers that generate revenue.</p>
              <p className="text-charcoal mb-6">
                We create, manage, and monetize AI characters that build audiences and generate revenue through affiliates, UGC, and brand deals.
              </p>
              
              <div className="mb-6 p-4 bg-dark-red/5 rounded-lg">
                <h4 className="font-bold text-navy mb-3">Includes:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckIcon /> AI character design & personality
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon /> Daily UGC production
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon /> Multi-platform content strategy
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon /> Affiliate optimization & testing
                  </li>
                </ul>
              </div>

              <div className="bg-dark-red/10 border-l-4 border-dark-red p-4 rounded-lg mb-6">
                <p className="text-sm font-bold text-navy mb-2">Pricing Model</p>
                <p className="text-sm text-charcoal mb-3"><strong>Option A:</strong> Revenue share (20-30% of affiliate earnings)</p>
                <p className="text-sm text-charcoal"><strong>Option B:</strong> Fixed monthly + profit share</p>
              </div>

              <a href="#contact" className="btn-primary block text-center w-full mt-auto">Launch Your AI Brand</a>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section id="cases" className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy mb-4">Real Projects. Real Revenue.</h2>
            <p className="text-lg text-charcoal max-w-2xl mx-auto">
              Built in 30 days. Proving the model works.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Case 1: Rumble Simulator */}
            <div className="card hover:border-sky-blue group min-h-[480px] flex flex-col">
              <div className="mb-6 h-40 bg-gradient-to-br from-sky-blue to-navy rounded-lg flex items-center justify-center group-hover:shadow-lg transition-all">
                <div className="text-center">
                  <div className="text-4xl mb-2">🎲</div>
                  <p className="text-white text-lg font-bold">Rumble Simulator</p>
                </div>
              </div>
              <h3 className="text-xl font-bold text-navy mb-2">Affiliate Monetization</h3>
              <p className="text-sm text-charcoal mb-4">
                Sports draft tool that converts users to sports betting affiliates (BetMGM live, DraftKings pending).
              </p>
              <div className="space-y-2 mb-4">
                <div className="text-xs"><span className="font-bold text-sky-blue">Status:</span> 🟢 Live</div>
                <div className="text-xs"><span className="font-bold text-sky-blue">Model:</span> Affiliate CTA</div>
                <div className="text-xs"><span className="font-bold text-sky-blue">Potential:</span> $500-2K/mo</div>
              </div>
              <p className="text-sm text-sky-blue font-bold hover:text-dark-red transition mt-auto pt-4">Full case study coming →</p>
            </div>

            {/* Case 2: Sarah Influencer */}
            <div className="card hover:border-dark-red group min-h-[480px] flex flex-col">
              <div className="mb-6 h-40 bg-gradient-to-br from-dark-red to-charcoal rounded-lg flex items-center justify-center group-hover:shadow-lg transition-all">
                <div className="text-center">
                  <div className="text-4xl mb-2">💪</div>
                  <p className="text-white text-lg font-bold">Sarah Influencer</p>
                </div>
              </div>
              <h3 className="text-xl font-bold text-navy mb-2">AI Marketing Agency</h3>
              <p className="text-sm text-charcoal mb-4">
                Dual-account fitness influencer with AI UGC, supplement affiliates, and daily content production.
              </p>
              <div className="space-y-2 mb-4">
                <div className="text-xs"><span className="font-bold text-dark-red">Status:</span> 🟡 Launching Sunday</div>
                <div className="text-xs"><span className="font-bold text-dark-red">Model:</span> Multi-affiliate</div>
                <div className="text-xs"><span className="font-bold text-dark-red">Potential:</span> $1-5K/mo</div>
              </div>
              <p className="text-sm text-dark-red font-bold hover:text-sky-blue transition mt-auto pt-4">Full case study coming →</p>
            </div>

            {/* Case 3: Property Appraisal */}
            <div className="card hover:border-sky-blue group min-h-[480px] flex flex-col">
              <div className="mb-6 h-40 bg-gradient-to-br from-sky-blue/80 to-charcoal rounded-lg flex items-center justify-center group-hover:shadow-lg transition-all">
                <div className="text-center">
                  <div className="text-4xl mb-2">🏠</div>
                  <p className="text-white text-lg font-bold">Property Appraisal Pro</p>
                </div>
              </div>
              <h3 className="text-xl font-bold text-navy mb-2">SaaS Infrastructure</h3>
              <p className="text-sm text-charcoal mb-4">
                USPAP-compliant appraisal tool with OAuth, freemium tier, and AI-powered adjustment suggestions.
              </p>
              <div className="space-y-2 mb-4">
                <div className="text-xs"><span className="font-bold text-sky-blue">Status:</span> 🟡 Ready</div>
                <div className="text-xs"><span className="font-bold text-sky-blue">Model:</span> Freemium SaaS</div>
                <div className="text-xs"><span className="font-bold text-sky-blue">Potential:</span> $2-10K/mo</div>
              </div>
              <p className="text-sm text-sky-blue font-bold hover:text-dark-red transition mt-auto pt-4">Full case study coming →</p>
            </div>
          </div>

          {/* The Story */}
          <div className="mt-16 bg-white border-l-4 border-sky-blue rounded-lg p-8">
            <h3 className="text-2xl font-bold text-navy mb-4">The Experiment</h3>
            <p className="text-charcoal mb-4">
              <strong>Feb 25:</strong> Giani discovered OpenClaw and decided to prove AI could build real businesses.
            </p>
            <p className="text-charcoal mb-4">
              <strong>Feb 25-27:</strong> In 48 hours, Ainsley designed and launched 3 different business models across different verticals.
            </p>
            <p className="text-charcoal mb-4">
              <strong>Feb 28:</strong> All 3 projects have infrastructure, monetization, and are ready for revenue.
            </p>
            <p className="text-charcoal font-bold text-sky-blue">
              The insight: Speed matters. Multi-stream revenue matters. AI execution matters.
            </p>
          </div>
        </div>
      </section>

      {/* Blog/Resources */}
      <section className="py-24 px-6 bg-gradient-to-b from-white to-sky-blue/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy mb-4">The Playbook</h2>
            <p className="text-lg text-charcoal max-w-2xl mx-auto">
              We document everything. Learn how to build AI businesses from our SOPs and guides.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {[
              {
                title: 'How to Set Up Your AI',
                desc: 'Complete guide to OpenClaw setup, hardware config, and first revenue.',
              },
              {
                title: 'Building AI Influencers',
                desc: 'Character design, UGC generation, affiliate partnerships, and scaling.',
              },
              {
                title: 'Monetizing Your Tools',
                desc: 'Affiliate strategies, CTA optimization, and revenue tracking.',
              },
              {
                title: 'Multi-Stream Revenue',
                desc: 'How to run multiple businesses simultaneously with one AI.',
              }
            ].map((article, i) => (
              <div key={i} className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-sky-blue hover:shadow-lg transition-all">
                <h3 className="text-lg font-bold text-navy mb-2">{article.title}</h3>
                <p className="text-sm text-charcoal mb-4">{article.desc}</p>
                <a href="/blog" className="text-sky-blue font-bold text-sm hover:text-dark-red">Read →</a>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a href="/blog" className="inline-block bg-navy text-white px-8 py-3 rounded-lg font-bold hover:bg-sky-blue transition">
              View All Resources
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="gradient-navy-sky py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-20 w-48 h-48 rounded-full border-2 border-sky-blue animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-32 h-32 rounded-full border-2 border-dark-red animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="max-w-2xl mx-auto text-white relative z-10">
          <h2 className="text-5xl font-bold mb-4 text-center">Let's Build</h2>
          <p className="text-center mb-2 text-xl">Your AI is waiting.</p>
          <p className="text-center mb-12 text-lg text-gray-200 max-w-xl mx-auto">
            Limited capacity. We work with 3-5 founders per quarter. Early conversations get priority.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6 bg-white/10 p-10 rounded-xl backdrop-blur-sm border border-white/20">
            <div>
              <label className="block font-bold mb-2 text-sm">Your Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-white/95 text-charcoal focus:outline-none focus:ring-2 focus:ring-sky-blue placeholder-gray-400"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block font-bold mb-2 text-sm">Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-white/95 text-charcoal focus:outline-none focus:ring-2 focus:ring-sky-blue placeholder-gray-400"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block font-bold mb-2 text-sm">Which Service Interests You? *</label>
              <select
                value={formData.project}
                onChange={(e) => setFormData({...formData, project: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-white/95 text-charcoal focus:outline-none focus:ring-2 focus:ring-sky-blue"
              >
                <option value="setup-agency">AI Setup Agency ($2-5K setup + monthly)</option>
                <option value="marketing-agency">AI Marketing Agency (revenue share)</option>
                <option value="both">Both - I want to explore</option>
                <option value="other">I'm not sure yet</option>
              </select>
            </div>

            <div>
              <label className="block font-bold mb-2 text-sm">Tell us about your business</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-white/95 text-charcoal focus:outline-none focus:ring-2 focus:ring-sky-blue placeholder-gray-400"
                rows={3}
                placeholder="What are you building? What's holding you back?"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-sky-blue hover:bg-dark-red text-white font-bold py-4 rounded-lg transition-all duration-300 text-lg"
            >
              Schedule Consultation
            </button>

            <p className="text-center text-xs opacity-75">
              We typically respond within 12 hours. Privacy: Your info is just for us.
            </p>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal text-white py-8 px-6 text-center">
        <p>&copy; 2026 NYClaw.io. Built by Ainsley & Giani.</p>
      </footer>
    </div>
  )
}
