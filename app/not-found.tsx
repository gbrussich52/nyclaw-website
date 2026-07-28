import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6 py-24">
      <div className="panel relative isolate overflow-hidden rounded-2xl px-6 py-14 text-center sm:px-10">
        <div className="bloom-blue pointer-events-none absolute left-1/2 top-0 -z-10 h-[20rem] w-[32rem] -translate-x-1/2 rounded-full" />
        <div className="mx-auto flex max-w-[34rem] flex-col items-center gap-6">
          <p className="text-gradient-metric text-[64px] font-semibold leading-none tracking-[-0.03em]">
            404
          </p>
          <h1 className="text-balance text-[clamp(1.5rem,3vw,2rem)] font-medium leading-[1.15] tracking-[-0.025em] text-white">
            Page not found
          </h1>
          <p className="text-[15px] leading-relaxed text-zinc-400">
            The page you&apos;re looking for doesn&apos;t exist or may have moved.
          </p>
          <Link
            href="/"
            className="inline-flex h-12 items-center gap-1 rounded-full bg-white pl-5 pr-3 text-base font-medium text-zinc-950 transition-opacity hover:opacity-90"
          >
            Back to home
            <ChevronRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  )
}
