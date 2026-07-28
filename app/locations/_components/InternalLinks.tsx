import Link from 'next/link'
import { Fragment } from 'react'

/**
 * InternalLinks — the "Explore more from NYClaw.io" row that closes both
 * location routes. These are local-SEO internal links; the set and its order
 * are carried over from the live pages verbatim.
 */
export default function InternalLinks({
  links,
}: {
  links: readonly { label: string; href: string }[]
}) {
  return (
    <section className="px-6 pb-24">
      <div className="mx-auto max-w-[64rem] text-center">
        <p className="text-sm text-zinc-400">Explore more from NYClaw.io</p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          {links.map((link, i) => (
            <Fragment key={link.href}>
              {i > 0 ? <span className="text-zinc-600">|</span> : null}
              <Link
                href={link.href}
                className="text-sm font-medium text-zinc-300 underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                {link.label}
              </Link>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}
