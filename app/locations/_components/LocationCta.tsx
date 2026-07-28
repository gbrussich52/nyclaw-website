import Link from 'next/link'
import { CALENDLY_URL } from '../../config'

/**
 * LocationCta — closing panel for /locations/* routes.
 *
 * Mirrors `CtaPanel` (panel fill, blue bloom behind the heading, solid +
 * ghost button pair) but keeps the eyebrow above the h2. On these pages the
 * eyebrow is the place name itself — "New York City", "Westchester County,
 * NY" — so it is local-SEO copy, not decoration, and cannot be dropped.
 */
export default function LocationCta({
  eyebrow,
  title,
  blurb,
}: {
  eyebrow: string
  title: string
  blurb: string
}) {
  return (
    <section className="px-6 pb-24">
      <div className="mx-auto max-w-[64rem]">
        <div className="panel relative isolate overflow-hidden rounded-2xl px-6 py-16 text-center sm:px-10">
          <div className="bloom-blue pointer-events-none absolute left-1/2 top-0 -z-10 h-[24rem] w-[36rem] -translate-x-1/2 rounded-full" />

          <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-400">
            {eyebrow}
          </p>
          <h2 className="mt-4 text-balance text-[clamp(1.75rem,3.5vw,2.25rem)] font-medium leading-[1.15] tracking-[-0.025em] text-white">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-[34rem] text-[17px] leading-relaxed text-zinc-300">
            {blurb}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center rounded-full bg-white px-5 text-[15px] font-medium text-zinc-950 transition-opacity hover:opacity-90"
            >
              <span className="whitespace-nowrap">Free 15-Min Fit Audit</span>
            </a>
            <Link
              href="/#contact"
              className="inline-flex h-11 items-center rounded-full px-5 text-[15px] font-medium text-white outline outline-1 outline-white/[0.18] transition-colors hover:bg-white/5"
            >
              <span className="whitespace-nowrap">Start a Project &rarr;</span>
            </Link>
          </div>

          <p className="mt-6 text-sm text-zinc-400">
            Or email us directly at{' '}
            <a
              href="mailto:hello@nyclaw.io"
              className="text-white underline underline-offset-4"
            >
              hello@nyclaw.io
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
