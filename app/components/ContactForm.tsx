// classification: PUBLIC
'use client'

import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { CALENDLY_URL } from '../config'
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
  const { loading, errorMsg, submitted: formSubmitted, submit, honeypotRef } = useContactSubmit()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await submit(formData, 'contact_form')
  }

  return (
    <section id="contact" className="px-6 pb-24">
      <div className="mx-auto max-w-[44rem]">
        <div className="mb-12 flex flex-col items-center gap-4 text-center">
          <h2 className="text-balance text-[clamp(2rem,4vw,2.75rem)] font-medium leading-[1.12] tracking-[-0.025em] text-white">
            Tell us where work gets stuck
          </h2>
          <p className="text-[17px] leading-relaxed text-zinc-300">
            Start with the problem. You do not need a technical brief.
          </p>
          <p className="max-w-[34rem] text-[15px] leading-relaxed text-zinc-400">
            Tell us what happens today, what gets repeated and which tools you use. This is an inquiry, not a booking or an agreement to start paid work.
          </p>
        </div>

        {formSubmitted ? (
          <div className="panel relative isolate overflow-hidden rounded-2xl px-6 py-14 text-center sm:px-10">
            <div className="bloom-blue pointer-events-none absolute left-1/2 top-0 -z-10 h-[20rem] w-[32rem] -translate-x-1/2 rounded-full" />
            <CheckCircle2 className="mx-auto mb-5 h-12 w-12 text-white" strokeWidth={1.5} />
            <h3 className="mb-3 text-xl font-medium tracking-[-0.01em] text-white">We got it.</h3>
            <p className="text-[15px] leading-relaxed text-zinc-400">
              Your inquiry has been received. We will review it and contact you at the email you provided. Scope, price and timing are agreed separately.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="panel flex flex-col gap-5 rounded-2xl p-6 sm:p-10"
          >
            <input
              ref={honeypotRef}
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />
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
                Where does work get stuck? *
              </label>
              <select
                id="contact-challenge"
                required
                value={formData.challenge}
                onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                className={selectClass}
              >
                <option value="">Pick the closest fit...</option>
                <option value="agent">Preparing answers, drafts or research</option>
                <option value="automation">Copying information between tools</option>
                <option value="lead-response">Replying to new inquiries or missed calls</option>
                <option value="scheduling">Booking, reminders or follow-ups</option>
                <option value="where-to-start">I am not sure where to start</option>
              </select>
            </div>
            <div>
              <label className={labelClass} htmlFor="contact-message">
                What happens today?
              </label>
              <textarea
                id="contact-message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className={fieldClass}
                rows={3}
                placeholder="Describe one recent example and the tools involved. Leave out client details, confidential files, passwords and account numbers."
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
              {loading ? 'Submitting…' : 'Send my inquiry'}
            </button>
            <p className="text-center text-[13px] text-zinc-400">
              No paid work starts from this form. Prefer a conversation?{' '}
              <a className="underline underline-offset-4" href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">Book a free 30-minute call</a>.
            </p>
          </form>
        )}
      </div>
    </section>
  )
}
