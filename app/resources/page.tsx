'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ResourcesPage() {
  const [formData, setFormData] = useState({ firstName: '', email: '', company: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.firstName,
          email: formData.email,
          businessType: formData.company || 'Guide Download',
          challenge: 'Requested AI Operator\'s Playbook from /resources page',
          message: `Company: ${formData.company || 'not provided'}`,
        }),
      })
    } catch {
      // Non-blocking — still give them the guide if API fails
    }
    setSubmitted(true)
    setLoading(false)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'pdf_download', { location: 'resources_page' })
    }
  }

  const whatsInside = [
    {
      section: 'Intro',
      title: 'Why Most AI Setups Fail',
      desc: 'The single mistake that kills every AI deployment — and the one thing that separates setups that scale from ones that collapse.',
    },
    {
      section: 'Part 1',
      title: 'Identity Before Automation',
      desc: 'How to write the four foundational documents (SOUL, USER, MEMORY, TOOLS) that give your AI consistent behavior and a real operating context.',
    },
    {
      section: 'Part 2',
      title: 'Memory Is Architecture',
      desc: 'Three-tier memory design: session notes, rolling context, and long-term distilled knowledge. How to stop your AI from forgetting everything.',
    },
    {
      section: 'Part 3',
      title: 'Automation That Actually Runs',
      desc: 'Real case study: 8 business websites built and deployed at $0 cost. Plus the $55–$110 API runaway story and how to avoid it.',
    },
    {
      section: 'Part 4',
      title: 'The Revenue Connection',
      desc: '7 verticals, the free→workshop→retainer model, cold email pipeline math, and how to pitch AI to skeptical business owners.',
    },
    {
      section: 'Part 5',
      title: '7 Ways AI Projects Die',
      desc: 'Named anti-patterns with real examples for each: identity drift, memory decay, tool hoarding, fake automation, and more.',
    },
    {
      section: 'Appendix',
      title: 'Fill-In Templates',
      desc: '5 ready-to-use templates: SOUL.md, Memory Architecture, Automation Audit Checklist, Client Discovery, and 30-Day Launch Plan.',
    },
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
            The AI Operator's Playbook
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-4">
            How to build an AI assistant that actually works — with identity, memory, and automation that doesn't break. Built from what we learned deploying Ainsley.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400 mt-6">
            <span>✓ 5 parts + appendix</span>
            <span>✓ 5 fill-in templates</span>
            <span>✓ Real case studies (no fluff)</span>
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
                <h2 className="text-2xl font-bold text-navy mb-2">Get the free playbook</h2>
                <p className="text-gray-600 text-sm mb-6">Enter your details and you'll get an instant download link. No spam. Unsubscribe anytime.</p>

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
                  {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-sky-blue text-white py-4 rounded-lg font-semibold text-lg hover:bg-navy transition-colors disabled:opacity-70"
                  >
                    {loading ? 'One sec...' : 'Get the Playbook →'}
                  </button>
                  <p className="text-xs text-gray-500 text-center">
                    By submitting, you agree to receive the guide and occasional emails from NYClaw.io. Unsubscribe anytime.
                  </p>
                </form>
              </div>
            ) : (
              <div className="bg-white border-2 border-green-400 rounded-2xl p-8 shadow-lg text-center">
                <div className="text-5xl mb-4">✓</div>
                <h2 className="text-2xl font-bold text-navy mb-3">Here's your playbook, {formData.firstName}.</h2>
                <p className="text-gray-600 mb-6">Click below to download. It's a PDF — open it in any browser or reader.</p>
                <a
                  href="/downloads/ai-operators-playbook.pdf"
                  download="AI-Operators-Playbook-NYClaw.pdf"
                  className="block w-full bg-sky-blue text-white py-4 rounded-lg font-semibold text-lg hover:bg-navy transition-colors mb-4"
                >
                  ↓ Download the Playbook (PDF)
                </a>
                <p className="text-xs text-gray-500 mb-6">If the download doesn't start, <a href="/downloads/ai-operators-playbook.pdf" target="_blank" className="text-sky-blue underline">open it directly</a>.</p>
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-sm text-gray-500 mb-3">Want us to build this for your business?</p>
                  <Link
                    href="/#contact"
                    className="block border-2 border-sky-blue text-sky-blue rounded-lg px-4 py-3 text-sm font-medium hover:bg-sky-blue hover:text-white transition-colors"
                  >
                    Book a free AI audit →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* What's Inside */}
          <div>
            <h2 className="text-2xl font-bold text-navy mb-8">What's inside</h2>
            <div className="space-y-6">
              {whatsInside.map((item) => (
                <div key={item.section} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="bg-navy text-white text-xs font-bold px-2 py-1 rounded whitespace-nowrap">{item.section}</div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Templates callout */}
            <div className="mt-8 bg-blue-50 border border-sky-blue rounded-xl p-5">
              <h3 className="font-semibold text-navy mb-2">📋 Templates Included</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>✓ SOUL.md — AI Identity Document (copy-paste ready)</li>
                <li>✓ Memory Architecture diagram + file structure</li>
                <li>✓ Automation Audit Checklist (find your dead crons)</li>
                <li>✓ Client Discovery Framework (7 verticals)</li>
                <li>✓ 30-Day AI Operator Launch Plan</li>
              </ul>
            </div>

            {/* Ainsley attribution */}
            <div className="mt-8 border-l-4 border-sky-blue pl-4">
              <p className="text-gray-600 text-sm italic">
                "Every AI assistant we've seen fail had one thing in common: the operator treated setup as optional. It's not. Setup is the whole game."
              </p>
              <p className="text-navy font-medium text-sm mt-2">— Ainsley, NYClaw.io</p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="bg-gray-50 border-t border-gray-200 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-navy mb-8 text-center">Go deeper (free)</h2>
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
