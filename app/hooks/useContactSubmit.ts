'use client'

import { useState } from 'react'

/**
 * Shared submit/loading/error handling for every form that posts to
 * /api/contact (ContactForm, PlaybookForm, ResourceForm). Extracted so the
 * fetch + error-handling contract lives in one place instead of being
 * re-implemented (and drifting) in each component.
 */
export interface UseContactSubmitResult {
  loading: boolean
  errorMsg: string
  submitted: boolean
  /** POSTs `payload` to /api/contact. Returns true on success. */
  submit: (payload: Record<string, unknown>) => Promise<boolean>
}

export function useContactSubmit(): UseContactSubmitResult {
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const submit = async (payload: Record<string, unknown>): Promise<boolean> => {
    setLoading(true)
    setErrorMsg('')
    let ok = false
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setErrorMsg((data as { error?: string }).error ?? 'Something went wrong. Please try again.')
      } else {
        setSubmitted(true)
        ok = true
      }
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
    return ok
  }

  return { loading, errorMsg, submitted, submit }
}
