'use client'

import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { useContactSubmit } from '../hooks/useContactSubmit'

/** `compact` renders a slim closing strip for pages where the guide is the
 *  fallback for visitors not ready to talk, not the main action. */
export default function PlaybookForm({ compact = false }: { compact?: boolean } = {}) {
  const [playbookEmail, setPlaybookEmail] = useState('')
  const { loading, errorMsg, submitted: playbookSubmitted, guideEmailed, submit, honeypotRef } = useContactSubmit()

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
    <section id="playbook-guide" className="px-6 pb-24">
      <div className={`mx-auto ${compact ? 'max-w-[64rem]' : 'max-w-[44rem]'}`}>
        {compact ? (
          <div className="mb-6 flex flex-col gap-2 text-center">
            <h2 className="text-balance text-[clamp(1.4rem,2.6vw,1.75rem)] font-medium leading-[1.2] tracking-[-0.02em] text-white">
              Not ready to talk yet?
            </h2>
            <p className="text-[15px] leading-relaxed text-zinc-400">
              {/* Claude Fable 5.2, 2026-11-16: dropped "what it costs"; the guide gives no cost figures, so the form must not promise them. */}
              Read the free guide first: where AI fits a small business and what to do first.
            </p>
          </div>
        ) : (
        <div className="mb-10 flex flex-col items-center gap-4 text-center">
          <h2 className="text-balance text-[clamp(1.75rem,3.5vw,2.25rem)] font-medium leading-[1.15] tracking-[-0.025em] text-white">
            Free AI Readiness Guide
          </h2>
          <p className="max-w-[34rem] text-[15px] leading-relaxed text-zinc-400">
            {/* Claude Fable 5.2, 2026-11-16: dropped "what it costs" here too, same reason. */}
            A plain-English guide to where AI fits your business and what to do first. No jargon. No fluff.
          </p>
        </div>
        )}

        <div className={`panel relative isolate mx-auto overflow-hidden rounded-2xl px-6 text-center sm:px-10 ${compact ? 'max-w-[44rem] py-8' : 'py-10'}`}>
          <div className="bloom-blue pointer-events-none absolute left-1/2 top-0 -z-10 h-[18rem] w-[30rem] -translate-x-1/2 rounded-full" />
          {playbookSubmitted ? (
            <div className="py-4" role="status" aria-live="polite">
              <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-white" strokeWidth={1.5} />
              <h3 className="mb-2 text-xl font-medium tracking-[-0.01em] text-white">
                Request received
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-zinc-400">
                Your request was received. The playbook is ready to open.
                {/* Claude Sonnet 5.5, 2026-11-15: only claim the email when the server confirmed it. */}
                {guideEmailed && ` We also emailed it to ${playbookEmail}.`}
              </p>
              <a
                href="/ai-operators-playbook.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium text-zinc-950 transition-opacity hover:opacity-90"
              >
                Open the playbook ↗
              </a>
            </div>
          ) : (
            <>
              <h3 className="mb-2 text-xl font-medium tracking-[-0.01em] text-white">
                Get the free guide
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-zinc-400">
                {/* Claude Fable 5.2, 2026-11-16: "Real Costs & Timelines" became "Your First 30 Days", the guide's own section title; the guide gives no cost figures. */}
                Where AI Fits Your Business &middot; What to Automate First &middot; Your First 30 Days &middot; Common Mistakes
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
                <input
                  ref={honeypotRef}
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />
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
                  {loading ? 'Sending…' : 'Get the playbook →'}
                </button>
              </form>
              {errorMsg && (
                <p className="mt-3 text-xs text-zinc-300" role="alert">
                  {errorMsg}
                </p>
              )}
              <p className="mt-3 text-xs text-zinc-400">The guide opens here and a copy is emailed to you.</p>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
