'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[ErrorBoundary]', error.message, error.digest ?? '')
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center max-w-md px-6">
        <h1 className="text-4xl font-bold text-navy mb-4">Something went wrong</h1>
        <p className="text-charcoal/70 mb-8">
          We hit an unexpected error. Please try again or head back home.
        </p>
        <div className="flex gap-4 justify-center">
          <button onClick={reset} className="btn-primary px-6 py-3 text-sm">
            Try Again
          </button>
          <Link href="/" className="btn-red px-6 py-3 text-sm">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}
