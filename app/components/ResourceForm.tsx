'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle, Download } from 'lucide-react'
import { useContactSubmit } from '../hooks/useContactSubmit'

/** Shared field chrome — `.input-dusk` carries the fill/border/radius tokens. */
const fieldClass = 'input-dusk w-full px-4 py-3 text-sm transition-colors'
const labelClass = 'mb-1.5 block text-[13px] font-medium text-zinc-300'

export default function ResourceForm() {
  const [formData, setFormData] = useState({ firstName: '', email: '', company: '' })
  const { loading, errorMsg, submitted, submit } = useContactSubmit()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Route requires name/businessType/challenge — map firstName→name, use sentinel values for resource capture
    await submit({
      name: formData.firstName,
      email: formData.email,
      businessType: formData.company || 'resource-download',
      challenge: 'guide-download',
      message: 'Requested via Resources page guide form',
    }, 'resource_form')
  }

  return (
    <div className="md:sticky md:top-28">
      {!submitted ? (
        <div className="panel rounded-2xl p-8">
          <h2 className="text-xl font-medium tracking-[-0.02em] text-white">Get the free guide</h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            Enter your details and we&apos;ll send it immediately. No spam. Unsubscribe anytime.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <div>
              <label className={labelClass} htmlFor="firstName">
                First Name *
              </label>
              <input
                id="firstName"
                type="text"
                required
                value={formData.firstName}
                onChange={e => setFormData(p => ({ ...p, firstName: e.target.value }))}
                className={fieldClass}
                placeholder="Your first name"
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="email">
                Email Address *
              </label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                className={fieldClass}
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="company">
                Company <span className="font-normal text-zinc-500">(optional)</span>
              </label>
              <input
                id="company"
                type="text"
                value={formData.company}
                onChange={e => setFormData(p => ({ ...p, company: e.target.value }))}
                className={fieldClass}
                placeholder="Your company name"
              />
            </div>
            {errorMsg && (
              <p className="text-sm text-zinc-300" role="alert">{errorMsg}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="mt-1 inline-flex h-12 w-full items-center justify-center rounded-full bg-white px-5 text-base font-medium text-zinc-950 transition-opacity hover:opacity-90 disabled:opacity-70"
            >
              {loading ? 'Sending...' : 'Send me the guide →'}
            </button>
            <p className="text-center text-xs leading-relaxed text-zinc-500">
              By submitting, you agree to receive the guide and related emails from NYClaw.io. Unsubscribe anytime.
            </p>
          </form>
        </div>
      ) : (
        <div className="panel rounded-2xl p-8 text-center">
          <CheckCircle className="mx-auto mb-4 h-12 w-12 text-white" strokeWidth={1.5} />
          <h2 className="mb-3 text-xl font-medium tracking-[-0.02em] text-white">Check your inbox!</h2>
          <p className="mb-6 text-sm leading-relaxed text-zinc-400">
            We sent the guide to <strong className="font-medium text-white">{formData.email}</strong>. It should arrive within 2 minutes.
          </p>
          <p className="mb-6 text-[13px] text-zinc-500">
            While you wait — start with one of the knowledge articles below:
          </p>
          <div className="flex flex-col gap-3">
            <Link
              href="/knowledge/ai-assistant-identity"
              className="block rounded-lg border border-white/10 px-4 py-3 text-sm font-medium text-zinc-300 transition-colors hover:border-white/[0.28] hover:text-white"
            >
              Read: How to Build a Scalable AI Assistant →
            </Link>
            <Link
              href="/knowledge/operational-excellence"
              className="block rounded-lg border border-white/10 px-4 py-3 text-sm font-medium text-zinc-300 transition-colors hover:border-white/[0.28] hover:text-white"
            >
              Read: 7 Critical Anti-Patterns →
            </Link>
          </div>
        </div>
      )}

      <div className="mt-4 flex items-center justify-center gap-2 text-[13px] text-zinc-500">
        <Download className="h-4 w-4" />
        Downloaded by 50+ operators and builders
      </div>
    </div>
  )
}
