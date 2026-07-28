'use client'

import { useState } from 'react'
import { track } from '@vercel/analytics'

/**
 * Shared submit/loading/error handling for every form that posts to
 * /api/contact (ContactForm, PlaybookForm, ResourceForm). Extracted so the
 * fetch + error-handling contract lives in one place instead of being
 * re-implemented (and drifting) in each component.
 *
 * Conversion tracking lives here too, for the same reason: one instrumentation
 * point covers all three forms and cannot drift out of sync with them. Callers
 * pass a `source` so the funnel is attributable per form.
 *
 * Never pass PII to track() — event properties land in analytics, so only the
 * source label and outcome are sent, never the submitted field values.
 */
export interface UseContactSubmitResult {
  loading: boolean
  errorMsg: string
  submitted: boolean
  /** POSTs `payload` to /api/contact. Returns true on success. */
  submit: (payload: Record<string, unknown>, source?: string) => Promise<boolean>
}

export function useContactSubmit(): UseContactSubmitResult {
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const submit = async (
    payload: Record<string, unknown>,
    source = 'unknown'
  ): Promise<boolean> => {
    setLoading(true)
    setErrorMsg('')
    let ok = false
    // Fires before the request so we can measure abandonment between attempt
    // and success — a drop here means the API is failing, not that visitors
    // are not trying.
    track('form_submit_attempt', { source })
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setErrorMsg((data as { error?: string }).error ?? 'Something went wrong. Please try again.')
        track('form_submit_error', { source, status: res.status })
      } else {
        setSubmitted(true)
        ok = true
        track('lead_submitted', { source })
      }
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.')
      track('form_submit_error', { source, status: 0 })
    } finally {
      setLoading(false)
    }
    return ok
  }

  return { loading, errorMsg, submitted, submit }
}
