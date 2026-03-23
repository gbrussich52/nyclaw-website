'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ResourcesPage() {
  const [formData, setFormData] = useState({ firstName: '', email: '', company: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.firstName || 'Guide Request',
          email: formData.email,
          businessType: formData.company || 'Guide Download',
          challenge: 'Requested free AI guide from /resources page',
          message: `Company: ${formData.company || 'not provided'}`,
        }),
      })
    } catch { /* non-blocking */ }
    setSubmitted(true)
    setLoading(false)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'pdf_download', { location: 'resources_page' })
    }
  }

  const whatsInside = [
    { section: 'Section 1', title: 'Building AI Identity', pages: '15 pages', desc: 'The Four-Quadrant Persona Taxonomy, principle-first documentation, priority hierarchies, and the full SOUL.md template.' },
    { section: 'Section 2', title: 'Mission-Driven Systems', pages: '16 pages', desc: 'Why processes fail, how to design mission statements that actually drive decisions, OKR frameworks, and the review cadence.' },
    { section: 'Section 3', title: 'Operational Excellence', pages: '9 pages', desc: 'All 7 anti-patterns with real-world examples and specific prevention systems for each.' },
    { section: 'Section 4', title: 'Implementation Roadmap', pages: '8 pages', desc: 'The 30/60/90-day plan. Week-by-week actions to build your system from scratch.' },
    { section: 'Appendix', title: 'Templates & Checklists', pages: '4 pages', desc: 'Printable: SOUL.md template, weekly review checklist, monthly audit checklist, anti-pattern scorecard, OKR template.' },
  ]

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-navy text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-sky-blue text-white text-xs font-bold tracking-widest uppercase px-3 py-1 rounded mb-6">
            Free Download
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Complete AI Assistant +<br />Process Excellence Guide
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-4">
            50 pages. No fluff. The frameworks, templates, and implementation roadmap we used to build Ainsley — free with your email.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400 mt-6">
            <span>✓ 50 pages</span>
            <span>✓ 5 printable templates</span>
            <span>✓ 30/60/90-day roadmap</span>
            <span>✓ Free. No credit card.</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* Form */}
          <div className="sticky top-24">
            {!submitted ? (
              <div className="bg-white border-2 border-sky-blue rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-navy mb-2">Get the free guide</h2>
                <p className="text-gray-600 text-sm mb-6">Enter your details and we'll send it immediately. No spam. Unsubscribe anytime.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1" htmlFor="firstName">
                      First Name *
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={e => setFormData(p => ({ ...p, firstName: e.target.value }))}
                      className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-sky-blue transition-colors"
                      placeholder="Your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1" htmlFor="email">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                      className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-sky-blue transition-colors"
                      placeholder="you@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1" htmlFor="company">
                      Company <span className="text-gray-400 font-normal">(optional)</span>
                    </label>
                    <input
                      id="company"
                      type="text"
                      value={formData.company}
                      onChange={e => setFormData(p => ({ ...p, company: e.target.value }))}
                      className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-sky-blue transition-colors"
                      placeholder="Your company name"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-sky-blue text-white py-4 rounded-lg font-semibold text-lg hover:bg-navy transition-colors disabled:opacity-70"
                  >
                    {loading ? 'Sending...' : 'Send Me the Guide →'}
                  </button>
                  <p className="text-xs text-gray-500 text-center">
                    By submitting, you agree to receive the guide and related emails from NYClaw.io. Unsubscribe anytime.
                  </p>
                </form>
              </div>
            ) : (
              <div className="bg-white border-2 border-green-400 rounded-2xl p-8 shadow-lg text-center">
                <div className="text-5xl mb-4">✓</div>
                <h2 className="text-2xl font-bold text-navy mb-3">Check your inbox!</h2>
                <p className="text-gray-600 mb-6">We sent the guide to <strong>{formData.email}</strong>. It should arrive within 2 minutes.</p>
                <p className="text-sm text-gray-500 mb-6">While you wait — start with one of the knowledge articles below:</p>
                <div className="space-y-3">
                  <Link href="/knowledge/ai-assistant-identity" className="block border border-sky-blue text-sky-blue rounded-lg px-4 py-3 text-sm font-medium hover:bg-sky-blue hover:text-white transition-colors">
                    Read: How to Build a Scalable AI Assistant →
                  </Link>
                  <Link href="/knowledge/operational-excellence" className="block border border-sky-blue text-sky-blue rounded-lg px-4 py-3 text-sm font-medium hover:bg-sky-blue hover:text-white transition-colors">
                    Read: 7 Critical Anti-Patterns →
                  </Link>
                </div>
              </div>
            )}

            {/* Social proof */}
            <div className="mt-4 text-center text-sm text-gray-500">
              📥 Downloaded by 50+ operators and builders
            </div>
          </div>

          {/* What's Inside */}
          <div>
            <h2 className="text-2xl font-bold text-navy mb-8">What's inside</h2>
            <div className="space-y-6">
              {whatsInside.map((item) => (
                <div key={item.section} className="flex gap-4">
                  <div className="flex-shrink-0 w-16 text-center">
                    <div className="bg-navy text-white text-xs font-bold px-2 py-1 rounded mb-1">{item.section}</div>
                    <div className="text-xs text-gray-400">{item.pages}</div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Printable callout */}
            <div className="mt-8 bg-blue-50 border border-sky-blue rounded-xl p-5">
              <h3 className="font-semibold text-navy mb-2">📋 Printable Templates Included</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>✓ SOUL.md Identity Template (copy-pasteable)</li>
                <li>✓ Weekly Review Checklist</li>
                <li>✓ Monthly Documentation Audit</li>
                <li>✓ Anti-Pattern Audit Scorecard</li>
                <li>✓ OKR Template for Small Teams</li>
                <li>✓ System Health Dashboard</li>
              </ul>
            </div>

            {/* Ainsley story */}
            <div className="mt-8 border-l-4 border-sky-blue pl-4">
              <p className="text-gray-600 text-sm italic">
                "We built Ainsley for ourselves first — a fully designed AI assistant with consistent identity, operational frameworks, and the ability to handle execution at scale. This guide is everything we learned. The hard way."
              </p>
              <p className="text-navy font-medium text-sm mt-2">— NYClaw.io team</p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="bg-gray-50 border-t border-gray-200 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-navy mb-8 text-center">Read the full articles (free)</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { href: '/knowledge/ai-assistant-identity', label: 'AI Identity', title: 'How to Build a Scalable AI Assistant', time: '12 min' },
              { href: '/knowledge/mission-driven-systems', label: 'Operations', title: 'Mission-Driven Systems: Why Most Processes Fail', time: '13 min' },
              { href: '/knowledge/operational-excellence', label: 'Anti-Patterns', title: 'Operational Excellence: 7 Critical Anti-Patterns', time: '10 min' },
            ].map(a => (
              <Link key={a.href} href={a.href} className="bg-white border-2 border-gray-200 rounded-xl p-5 hover:border-sky-blue transition-colors group">
                <div className="text-xs text-sky-blue font-semibold mb-2">{a.label} · {a.time} read</div>
                <h3 className="font-semibold text-navy group-hover:text-sky-blue transition-colors text-sm">{a.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
