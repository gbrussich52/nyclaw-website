'use client'

import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { useContactSubmit } from '../hooks/useContactSubmit'

/** Shared field chrome — `.input-dusk` carries the fill/border/radius tokens. */
const fieldClass = 'input-dusk w-full px-4 py-3 text-sm transition-colors'
/* `color-scheme: dark` is what makes the native option popup render dark too —
   without it the list renders light and reads as a leftover from the old theme. */
const selectClass = `${fieldClass} [color-scheme:dark]`
const labelClass = 'mb-2 block text-[13px] font-medium text-zinc-300'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessType: '',
    challenge: '',
    message: '',
  })
  const { loading, errorMsg, submitted: formSubmitted, submit } = useContactSubmit()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await submit(formData)
  }

  return (
    <section id="contact" className="px-6 pb-24">
      <div className="mx-auto max-w-[44rem]">
        <div className="mb-12 flex flex-col items-center gap-4 text-center">
          <h2 className="text-balance text-[clamp(2rem,4vw,2.75rem)] font-medium leading-[1.12] tracking-[-0.025em] text-white">
            Start a project
          </h2>
          <p className="text-[17px] leading-relaxed text-zinc-300">
            Custom automations &amp; agents. Project-scoped.
          </p>
          <p className="max-w-[34rem] text-[15px] leading-relaxed text-zinc-400">
            Tell us the workflow that burns the most time. We&apos;ll reply with whether a custom agent or automation is a fit — and what a fixed-scope build would look like.
          </p>
        </div>

        {formSubmitted ? (
          <div className="panel relative isolate overflow-hidden rounded-2xl px-6 py-14 text-center sm:px-10">
            <div className="bloom-blue pointer-events-none absolute left-1/2 top-0 -z-10 h-[20rem] w-[32rem] -translate-x-1/2 rounded-full" />
            <CheckCircle2 className="mx-auto mb-5 h-12 w-12 text-white" strokeWidth={1.5} />
            <h3 className="mb-3 text-xl font-medium tracking-[-0.01em] text-white">We got it.</h3>
            <p className="text-[15px] leading-relaxed text-zinc-400">
              We review every submission and respond within 24 hours.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="panel flex flex-col gap-5 rounded-2xl p-6 sm:p-10"
          >
            <div>
              <label className={labelClass} htmlFor="contact-name">
                Your name *
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={fieldClass}
                placeholder="Jane Smith"
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="contact-email">
                Business email *
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={fieldClass}
                placeholder="jane@yourcompany.com"
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="contact-business-type">
                Business type *
              </label>
              <select
                id="contact-business-type"
                required
                value={formData.businessType}
                onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                className={selectClass}
              >
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
              <label className={labelClass} htmlFor="contact-challenge">
                What should we build first? *
              </label>
              <select
                id="contact-challenge"
                required
                value={formData.challenge}
                onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                className={selectClass}
              >
                <option value="">Pick the closest fit...</option>
                <option value="agent">Custom AI agent (intake, support, research, etc.)</option>
                <option value="automation">Workflow automation across my tools</option>
                <option value="lead-response">Lead / missed-call response</option>
                <option value="scheduling">Scheduling &amp; follow-ups</option>
                <option value="where-to-start">Not sure — want the 15-min fit audit</option>
              </select>
            </div>
            <div>
              <label className={labelClass} htmlFor="contact-message">
                Describe the workflow
              </label>
              <textarea
                id="contact-message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className={fieldClass}
                rows={3}
                placeholder="What happens today when a lead/call/email comes in? Which tools (CRM, calendar, email)? What should the agent or automation do instead?"
              />
            </div>
            {errorMsg && (
              <p className="text-center text-sm text-zinc-300" role="alert">
                {errorMsg}
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="inline-flex h-12 w-full items-center justify-center rounded-full bg-white px-5 text-base font-medium text-zinc-950 transition-opacity hover:opacity-90 disabled:opacity-70"
            >
              {loading ? 'Submitting…' : 'Request project scope →'}
            </button>
            <p className="text-center text-[13px] text-zinc-500">
              We respond within 24 hours. Prefer a live call? Book the free 15-min fit audit instead.
            </p>
          </form>
        )}
      </div>
    </section>
  )
}
