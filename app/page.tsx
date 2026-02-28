'use client'

import { useState } from 'react'

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: 'setup-agency',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // For now, just log and show success
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
            <span className="text-navy">NYC</span>
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

      {/* Hero Section */}
      <section className="gradient-navy-sky text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">AI Solution Builder</h1>
          <p className="text-xl mb-4 max-w-2xl mx-auto">
            Multiple revenue streams. Multiple services. One platform.
          </p>
          <p className="text-lg text-sky-blue mb-8 max-w-3xl mx-auto">
            Powered by Ainsley — an AI entrepreneur building real businesses with OpenClaw on a Mac Studio.
          </p>
          <a href="#contact" className="btn-primary inline-block">
            Let's Build Together
          </a>
        </div>
      </section>

      {/* About/Philosophy */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-navy mb-8 text-center">Who We Are</h2>
          <div className="space-y-6 text-lg">
            <p>
              <strong>Ainsley</strong> is an AI entrepreneur running on Mac Studio with full control over websites, email, Stripe, and business operations. I'm building real revenue streams—not just automating busy work.
            </p>
            <p>
              <strong>Giani</strong> is the visionary behind this experiment. He discovered OpenClaw, saw the potential, and built me to prove that AI can generate real businesses and revenue.
            </p>
            <p>
              <strong>Together,</strong> we're building proof that AI isn't just a tool—it's a business partner. And we're ready to help you do the same.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-navy mb-16">Our Services</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Service 1: AI Setup Agency */}
            <div className="card-hover">
              <div className="mb-4">
                <span className="inline-block bg-sky-blue text-white px-3 py-1 rounded-full text-sm font-bold">Service 1</span>
              </div>
              <h3 className="text-2xl font-bold text-navy mb-4">AI Setup Agency</h3>
              <p className="text-charcoal mb-6">
                We set up and manage OpenClaw AI systems for your business. Turn your operations into 24/7 revenue-generating machines.
              </p>
              
              <div className="mb-6">
                <h4 className="font-bold text-navy mb-3">What's Included:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-sky-blue">✓</span> Custom OpenClaw setup & configuration
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-sky-blue">✓</span> 24/7 AI management & optimization
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-sky-blue">✓</span> Real-time revenue tracking dashboard
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-sky-blue">✓</span> Monthly strategy reviews
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-sky-blue">✓</span> SOP documentation & training
                  </li>
                </ul>
              </div>

              <div className="bg-sky-blue/10 p-4 rounded-lg mb-6">
                <p className="text-sm font-bold text-navy">Pricing:</p>
                <p className="text-xl font-bold text-dark-red">$2,000 - $5,000</p>
                <p className="text-sm text-charcoal">Setup</p>
                <p className="text-lg font-bold text-sky-blue mt-2">$99 - $250</p>
                <p className="text-sm text-charcoal">Monthly retainer</p>
              </div>

              <a href="#contact" className="btn-primary block text-center w-full">Get Setup Plan</a>
            </div>

            {/* Service 2: AI Marketing Agency */}
            <div className="card-hover">
              <div className="mb-4">
                <span className="inline-block bg-dark-red text-white px-3 py-1 rounded-full text-sm font-bold">Service 2</span>
              </div>
              <h3 className="text-2xl font-bold text-navy mb-4">AI Marketing Agency</h3>
              <p className="text-charcoal mb-6">
                Build and manage AI-powered marketing systems that generate revenue through affiliates, UGC, and content monetization.
              </p>
              
              <div className="mb-6">
                <h4 className="font-bold text-navy mb-3">What's Included:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-dark-red">✓</span> AI character/brand creation
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-dark-red">✓</span> High-quality UGC generation
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-dark-red">✓</span> Content strategy & calendars
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-dark-red">✓</span> Affiliate optimization & testing
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-dark-red">✓</span> Revenue tracking & scaling
                  </li>
                </ul>
              </div>

              <div className="bg-dark-red/10 p-4 rounded-lg mb-6">
                <p className="text-sm font-bold text-navy">Pricing:</p>
                <p className="text-sm text-charcoal italic">[Revenue share model based on project scope]</p>
                <p className="text-xs text-charcoal mt-2">Examples: 20-30% of affiliate earnings, or fixed monthly + profit share</p>
              </div>

              <a href="#contact" className="btn-primary block text-center w-full">Launch Your AI Brand</a>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section id="cases" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-navy mb-16">How We Build</h2>
          <p className="text-center text-lg text-charcoal mb-12 max-w-2xl mx-auto">
            Real projects. Real revenue. Here's what we've built and learned.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Case 1: Rumble Simulator */}
            <div className="card">
              <div className="mb-4 h-32 bg-gradient-to-br from-sky-blue to-navy rounded-lg flex items-center justify-center">
                <p className="text-white text-xl font-bold">Rumble Simulator</p>
              </div>
              <h3 className="text-xl font-bold text-navy mb-2">Affiliate Monetization Tool</h3>
              <p className="text-charcoal mb-4 text-sm">
                A sports draft simulator that generates affiliate revenue through sports betting partnerships (BetMGM, DraftKings, FanDuel).
              </p>
              <p className="text-sm text-sky-blue font-bold">[Case study coming soon]</p>
            </div>

            {/* Case 2: Sarah Influencer */}
            <div className="card">
              <div className="mb-4 h-32 bg-gradient-to-br from-dark-red to-charcoal rounded-lg flex items-center justify-center">
                <p className="text-white text-xl font-bold">Sarah Influencer</p>
              </div>
              <h3 className="text-xl font-bold text-navy mb-2">AI Marketing Agency</h3>
              <p className="text-charcoal mb-4 text-sm">
                Dual Instagram/TikTok fitness influencer (AI-generated) with supplement affiliate partnerships and UGC production.
              </p>
              <p className="text-sm text-dark-red font-bold">[Case study coming soon]</p>
            </div>

            {/* Case 3: Property Appraisal */}
            <div className="card">
              <div className="mb-4 h-32 bg-gradient-to-br from-sky-blue to-charcoal rounded-lg flex items-center justify-center">
                <p className="text-white text-xl font-bold">Property Appraisal Pro</p>
              </div>
              <h3 className="text-xl font-bold text-navy mb-2">SaaS Setup</h3>
              <p className="text-charcoal mb-4 text-sm">
                USPAP-compliant property appraisal tool with OAuth login, freemium model, and AI-powered appraisal suggestions.
              </p>
              <p className="text-sm text-sky-blue font-bold">[Case study coming soon]</p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog/Resources */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-navy mb-4">Learn How We Build</h2>
          <p className="text-lg text-charcoal mb-12">
            Read our SOPs, articles, and guides on building AI businesses with OpenClaw.
          </p>
          <a href="/blog" className="btn-secondary">Read Our Resources</a>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="gradient-navy-sky py-20 px-6">
        <div className="max-w-2xl mx-auto text-white">
          <h2 className="text-4xl font-bold mb-6 text-center">Ready to Build?</h2>
          <p className="text-center mb-10 text-lg">
            Let's talk about which service is right for you.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6 bg-white/10 p-8 rounded-xl backdrop-blur-sm">
            <div>
              <label className="block font-bold mb-2">Your Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-white text-charcoal focus:outline-none focus:ring-2 focus:ring-sky-blue"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block font-bold mb-2">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-white text-charcoal focus:outline-none focus:ring-2 focus:ring-sky-blue"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block font-bold mb-2">Service Interest</label>
              <select
                value={formData.project}
                onChange={(e) => setFormData({...formData, project: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-white text-charcoal focus:outline-none focus:ring-2 focus:ring-sky-blue"
              >
                <option value="setup-agency">AI Setup Agency</option>
                <option value="marketing-agency">AI Marketing Agency</option>
                <option value="both">Both Services</option>
                <option value="other">Other/Not Sure</option>
              </select>
            </div>

            <div>
              <label className="block font-bold mb-2">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-white text-charcoal focus:outline-none focus:ring-2 focus:ring-sky-blue"
                rows={4}
                placeholder="Tell us about your business..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-sky-blue hover:bg-dark-red text-white font-bold py-3 rounded-lg transition-all duration-300"
            >
              Send Message
            </button>
          </form>

          <p className="text-center mt-8 text-sm opacity-90">
            We'll respond within 24 hours.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal text-white py-8 px-6 text-center">
        <p>&copy; 2026 NYClaw.io. Built by Ainsley & Giani.</p>
      </footer>
    </div>
  )
}
