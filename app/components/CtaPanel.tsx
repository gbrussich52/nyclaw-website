import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'

export interface CtaLink {
  label: string
  href: string
  /** Opens in a new tab — used for the Calendly booking link. */
  external?: boolean
}

/**
 * CtaPanel — closing panel with a blue bloom behind the heading.
 *
 * `footer` carries the "Or explore: …" cross-links on service detail routes;
 * the services index passes a second button instead.
 */
export default function CtaPanel({
  title,
  blurb,
  primary,
  secondary,
  footer,
}: {
  title: string
  blurb: string
  primary: CtaLink
  secondary?: CtaLink
  footer?: ReactNode
}) {
  return (
    <section className="px-6 pb-32">
      <div className="mx-auto max-w-[64rem]">
        <div className="panel relative isolate overflow-hidden rounded-2xl px-6 py-16 text-center sm:px-10">
          <div className="bloom-blue pointer-events-none absolute left-1/2 top-0 -z-10 h-[24rem] w-[36rem] -translate-x-1/2 rounded-full" />

          <h2 className="text-balance text-[clamp(1.75rem,3.5vw,2.25rem)] font-medium leading-[1.15] tracking-[-0.025em] text-white">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-[34rem] text-[17px] leading-relaxed text-zinc-300">
            {blurb}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <CtaButton link={primary} solid />
            {secondary ? <CtaButton link={secondary} /> : null}
          </div>

          {footer ? <p className="mt-6 text-sm text-zinc-400">{footer}</p> : null}
        </div>
      </div>
    </section>
  )
}

function CtaButton({ link, solid = false }: { link: CtaLink; solid?: boolean }) {
  const className = solid
    ? 'inline-flex h-11 items-center gap-1 rounded-full bg-white pl-5 pr-3 text-[15px] font-medium text-zinc-950 transition-opacity hover:opacity-90'
    : 'inline-flex h-11 items-center rounded-full px-5 text-[15px] font-medium text-white outline outline-1 outline-white/[0.18] transition-colors hover:bg-white/5'

  const content = (
    <>
      <span className="whitespace-nowrap">{link.label}</span>
      {solid ? <ChevronRight size={17} aria-hidden="true" /> : null}
    </>
  )

  return link.external ? (
    <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
      {content}
    </a>
  ) : (
    <Link href={link.href} className={className}>
      {content}
    </Link>
  )
}
