'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle, Download } from 'lucide-react'

export default function ResourceForm() {
  const [formData, setFormData] = useState({ firstName: '', email: '', company: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setSubmitted(true)
    setLoading(false)
    if (typeof window !== 'undefined' && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
      (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', 'pdf_download_attempt', { location: 'resources_page' })
    }
  }

  return (
    <div className="md:sticky md:top-24">
      {!submitted ? (
        <div className="bg-white border-2 border-sky-blue rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-navy mb-2">Get the free guide</h2>
          <p className="text-gray-600 text-sm mb-6">Enter your details and we&apos;ll send it immediately. No spam. Unsubscribe anytime.</p>

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
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
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

      <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
        <Download className="w-4 h-4" />
        Downloaded by 50+ operators and builders
      </div>
    </div>
  )
}
