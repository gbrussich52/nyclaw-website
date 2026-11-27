// classification: PUBLIC
'use client'

import { useRef, useState, type FormEvent } from 'react'
import { track } from '@vercel/analytics'
import { Check, X, ArrowRight } from 'lucide-react'
import type { GradeResult } from '@/lib/lead-leak/grade'

const BAND_TEXT: Record<GradeResult['band'], string> = {
  tight: 'Tight. A ready customer has several easy ways to reach you.',
  'some-leaks': 'Some leaks. A few ready customers will slip away.',
  leaking: 'Leaking. Many ready customers will give up and call someone else.',
}

function safeTrack(event: string, props: Record<string, string | number>) {
  try { track(event, props) } catch { /* The grader works without analytics. */ }
}

export default function LeadLeakGrader() {
  const [url, setUrl] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState<GradeResult | null>(null)
  const [truncated, setTruncated] = useState(false)
  const controller = useRef<AbortController | null>(null)

  async function grade(event: FormEvent) {
    event.preventDefault()
    controller.current?.abort()
    const active = new AbortController()
    controller.current = active
    const timeout = window.setTimeout(() => active.abort(), 15000)
    setBusy(true); setError('')
    try {
      const response = await fetch('/api/lead-leak-grader', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
        signal: active.signal,
      })
      const data = await response.json().catch(() => ({})) as { result?: GradeResult; truncated?: boolean; error?: string }
      if (!response.ok || !data.result) throw new Error(data.error || 'We could not grade that site. Try again in a moment.')
      if (controller.current !== active) return
      setResult(data.result); setTruncated(Boolean(data.truncated))
      safeTrack('lead_leak_graded', { score: data.result.score, leaks: data.result.leaks })
    } catch (err) {
      if (controller.current !== active) return
      setResult(null)
      setError(err instanceof Error && err.name !== 'AbortError' ? err.message : 'That took too long. Try again in a moment.')
    } finally {
      window.clearTimeout(timeout)
      if (controller.current === active) setBusy(false)
    }
  }

  const failed = result?.checks.filter((c) => !c.passed) ?? []
  const passed = result?.checks.filter((c) => c.passed) ?? []

  return (
    <div className="mx-auto flex max-w-[52rem] flex-col gap-10">
      <form onSubmit={grade} className="panel flex flex-col gap-3 rounded-2xl p-5 sm:flex-row sm:items-end sm:p-6" aria-label="Grade a website">
        <label className="flex flex-1 flex-col gap-2 text-left" htmlFor="lead-leak-url">
          <span className="text-[13px] font-medium text-zinc-300">Your website address</span>
          <input
            id="lead-leak-url"
            type="text"
            inputMode="url"
            autoComplete="url"
            spellCheck={false}
            required
            maxLength={2048}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="yourbusiness.com"
            className="input-dusk w-full px-4 py-3 text-base transition-colors"
          />
        </label>
        <button
          type="submit"
          disabled={busy}
          className="inline-flex h-12 shrink-0 items-center justify-center rounded-full bg-white px-6 text-[15px] font-medium text-zinc-950 shadow-[var(--shadow-btn)] transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {busy ? 'Checking...' : 'Grade my site'}
        </button>
      </form>
      <p className="-mt-6 text-center text-[13px] leading-relaxed text-zinc-400">
        We only read your public homepage, the same way a browser does. We never fill in a form, call, text or email your business.
      </p>

      {error && <p role="alert" className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p>}

      <section aria-live="polite" aria-busy={busy}>
        {result && (
          <div className="flex flex-col gap-8">
            <div className="panel flex flex-col items-center gap-3 rounded-2xl px-6 py-10 text-center">
              <p className="text-[13px] text-zinc-400">Lead leak score for <span className="break-all text-zinc-200">{result.url}</span></p>
              <p className="text-[clamp(3.5rem,9vw,5rem)] font-medium leading-none tracking-[-0.04em] text-white">
                {result.score}<span className="text-[0.4em] text-zinc-400">/100</span>
              </p>
              <p className="text-[15px] text-zinc-300">{result.passedCount} of {result.total} checks passed. {result.leaks === 0 ? 'No leaks found.' : `${result.leaks} ${result.leaks === 1 ? 'leak' : 'leaks'} to fix.`}</p>
              <p className="max-w-[32rem] text-[15px] leading-relaxed text-zinc-300">{BAND_TEXT[result.band]}</p>
              {truncated && <p className="text-[13px] text-zinc-400">Your homepage is very large, so we graded the first 1.5 MB.</p>}
            </div>

            {failed.length > 0 && (
              <div className="flex flex-col gap-3">
                <h2 className="text-xl font-medium text-white">Leaks to fix</h2>
                {failed.map((check) => (
                  <article key={check.id} className="panel flex gap-4 rounded-xl p-5">
                    <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-red-500/15 text-red-300"><X size={15} aria-hidden="true" /></span>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-base font-medium text-white">{check.label} <span className="sr-only">(missing)</span><span className="ml-2 text-[12px] font-normal text-zinc-500">{check.weight} points</span></h3>
                      <p className="text-sm leading-relaxed text-zinc-400">{check.why}</p>
                      <p className="text-sm leading-relaxed text-zinc-200"><strong className="font-medium text-white">How to fix it: </strong>{check.fix}</p>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {passed.length > 0 && (
              <div className="flex flex-col gap-3">
                <h2 className="text-xl font-medium text-white">Already working</h2>
                <ul className="panel flex flex-col divide-y divide-white/[0.06] rounded-xl">
                  {passed.map((check) => (
                    <li key={check.id} className="flex items-start gap-4 px-5 py-4">
                      <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-emerald-500/15 text-emerald-300"><Check size={15} aria-hidden="true" /></span>
                      <div>
                        <p className="text-sm font-medium text-white">{check.label} <span className="sr-only">(found)</span></p>
                        {check.found && <p className="mt-1 text-[13px] text-zinc-400">Found: {check.found}</p>}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {failed.length > 0 && (
              <a
                href="#lead-leak-fix"
                onClick={() => safeTrack('lead_leak_fix_click', { score: result.score, leaks: result.leaks, from: 'results' })}
                className="inline-flex h-11 w-fit items-center gap-1 self-center rounded-full bg-white pl-5 pr-3 text-[15px] font-medium text-zinc-950 transition-opacity hover:opacity-90"
              >
                Fix these leaks in 48 hours <ArrowRight size={16} aria-hidden="true" />
              </a>
            )}
          </div>
        )}
      </section>
    </div>
  )
}

/** Closing offer buttons, client side only so the click can be counted. */
export function FixOfferActions({ contactHref, callHref, callLabel }: { contactHref: string; callHref: string; callLabel: string }) {
  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
      <a
        href={contactHref}
        onClick={() => safeTrack('lead_leak_fix_click', { from: 'offer', to: 'contact' })}
        className="inline-flex h-11 items-center gap-1 rounded-full bg-white pl-5 pr-3 text-[15px] font-medium text-zinc-950 transition-opacity hover:opacity-90"
      >
        Get my leaks fixed <ArrowRight size={16} aria-hidden="true" />
      </a>
      <a
        href={callHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-11 items-center rounded-full px-5 text-[15px] font-medium text-white outline outline-1 outline-white/[0.18] transition-colors hover:bg-white/5"
      >
        {callLabel}
      </a>
    </div>
  )
}
