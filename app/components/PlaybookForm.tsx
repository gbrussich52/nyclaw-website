'use client'

import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { useContactSubmit } from '../hooks/useContactSubmit'

export default function PlaybookForm() {
  const [playbookEmail, setPlaybookEmail] = useState('')
  const { loading, errorMsg, submitted: playbookSubmitted, submit } = useContactSubmit()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Route requires name/businessType/challenge — use sentinel values for guide-only capture
    await submit({
      name: 'Playbook Request',
      email: playbookEmail,
      businessType: 'playbook-signup',
      challenge: 'guide-download',
      message: 'Requested via Free AI Readiness Guide form',
    }, 'playbook_form')
  }

  return (
    <section className="px-6 pb-24">
      <div className="mx-auto max-w-[44rem]">
        <div className="mb-10 flex flex-col items-center gap-4 text-center">
          <h2 className="text-balance text-[clamp(1.75rem,3.5vw,2.25rem)] font-medium leading-[1.15] tracking-[-0.025em] text-white">
            Free AI Readiness Guide
          </h2>
          <p className="max-w-[34rem] text-[15px] leading-relaxed text-zinc-400">
            A plain-English guide to where AI fits your business, what it costs, and what to do first. No jargon. No fluff.
          </p>
        </div>

        <div className="panel relative isolate overflow-hidden rounded-2xl px-6 py-10 text-center sm:px-10">
          <div className="bloom-blue pointer-events-none absolute left-1/2 top-0 -z-10 h-[18rem] w-[30rem] -translate-x-1/2 rounded-full" />
          {playbookSubmitted ? (
            <div className="py-4">
              <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-white" strokeWidth={1.5} />
              <h3 className="mb-2 text-xl font-medium tracking-[-0.01em] text-white">
                You&apos;re on the list.
              </h3>
              <p className="text-sm leading-relaxed text-zinc-400">
                We&apos;ll send the guide to your inbox shortly.
              </p>
            </div>
          ) : (
            <>
              <h3 className="mb-2 text-xl font-medium tracking-[-0.01em] text-white">
                Get the free guide
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-zinc-400">
                Where AI Fits Your Business &middot; What to Automate First &middot; Real Costs &amp; Timelines &middot; Common Mistakes
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
                <label className="sr-only" htmlFor="playbook-email">
                  Email address
                </label>
                <input
                  id="playbook-email"
                  type="email"
                  required
                  value={playbookEmail}
                  onChange={(e) => setPlaybookEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="input-dusk flex-1 px-4 py-3 text-sm transition-colors"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex h-12 items-center justify-center whitespace-nowrap rounded-full bg-white px-6 text-sm font-medium text-zinc-950 transition-opacity hover:opacity-90 disabled:opacity-70"
                >
                  {loading ? 'Sending…' : 'Send me the guide →'}
                </button>
              </form>
              {errorMsg && (
                <p className="mt-3 text-xs text-zinc-300" role="alert">
                  {errorMsg}
                </p>
              )}
              <p className="mt-3 text-xs text-zinc-500">No spam. Unsubscribe anytime.</p>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
