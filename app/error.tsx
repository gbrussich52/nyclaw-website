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
    <div className="flex min-h-[70vh] items-center justify-center px-6 py-24">
      <div className="panel relative isolate overflow-hidden rounded-2xl px-6 py-14 text-center sm:px-10">
        <div className="bloom-blue pointer-events-none absolute left-1/2 top-0 -z-10 h-[20rem] w-[32rem] -translate-x-1/2 rounded-full" />
        <div className="mx-auto flex max-w-[34rem] flex-col items-center gap-6">
          <h1 className="text-balance text-[clamp(1.5rem,3vw,2rem)] font-medium leading-[1.15] tracking-[-0.025em] text-white">
            Something went wrong
          </h1>
          <p className="text-[15px] leading-relaxed text-zinc-400">
            We hit an unexpected error. Please try again or head back home.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={reset}
              className="inline-flex h-12 items-center rounded-full bg-white px-5 text-base font-medium text-zinc-950 transition-opacity hover:opacity-90"
            >
              Try again
            </button>
            <Link
              href="/"
              className="inline-flex h-12 items-center rounded-full px-5 text-base font-medium text-white outline outline-1 outline-white/[0.18] transition-colors hover:bg-white/5"
            >
              Go home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
