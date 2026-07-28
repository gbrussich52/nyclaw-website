import Link from 'next/link'
import { ChevronLeft, ChevronRight, FileText } from 'lucide-react'

export interface RelatedLink {
  href: string
  title: string
  blurb?: string
}

interface ArticleShellProps {
  /** Where the "back" link points, e.g. `/blog` or `/knowledge`. */
  backHref: string
  backLabel: string
  tags?: readonly string[]
  /** e.g. "8 min read · March 2026" — rendered verbatim beside the tags. */
  meta?: string
  title: string
  /** Standfirst under the h1. */
  deck?: string
  /** Optional download CTA strip under the header. */
  cta?: { href: string; label: string; blurb: string }
  related?: readonly RelatedLink[]
  children: React.ReactNode
}

/**
 * ArticleShell — chrome for every knowledge and blog article.
 *
 * There is no [slug] route and no MDX in this repo: all 16 articles are
 * hardcoded folders of hand-written JSX. This shell plus the `.prose-dusk`
 * class in globals.css is what keeps them consistent — an article should
 * supply content and let the shell own the header, measure and footer.
 *
 * Body content is wrapped in `.prose-dusk`, which styles by element, so
 * articles should pass plain <p>/<h2>/<ul>/<table> and drop per-tag classes.
 */
export default function ArticleShell({
  backHref,
  backLabel,
  tags,
  meta,
  title,
  deck,
  cta,
  related,
  children,
}: ArticleShellProps) {
  return (
    <article className="px-6 pb-24 pt-16">
      <div className="mx-auto max-w-[48rem]">
        <Link
          href={backHref}
          className="inline-flex items-center gap-1 text-sm text-zinc-400 transition-colors hover:text-white"
        >
          <ChevronLeft size={16} aria-hidden="true" />
          {backLabel}
        </Link>

        <header className="mt-8 flex flex-col gap-6">
          {(tags?.length || meta) && (
            <div className="flex flex-wrap items-center gap-2">
              {tags?.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white/[0.07] px-3 py-1 text-[11px] font-medium text-zinc-300"
                >
                  {tag}
                </span>
              ))}
              {meta && <span className="text-[13px] text-zinc-500">{meta}</span>}
            </div>
          )}

          <h1 className="text-balance text-[clamp(2rem,5vw,3rem)] font-normal leading-[1.1] tracking-[-0.03em] text-white">
            {title}
          </h1>

          {deck && (
            <p className="text-balance text-[19px] leading-relaxed text-zinc-300">{deck}</p>
          )}
        </header>

        {cta && (
          <a
            href={cta.href}
            className="mt-10 flex items-center justify-between gap-6 rounded-xl border border-white/10 border-l-[3px] border-l-cyan-400 bg-white/[0.03] p-5 transition-colors hover:bg-white/[0.06]"
          >
            <span className="flex items-center gap-3">
              <FileText size={18} className="shrink-0 text-cyan-400" aria-hidden="true" />
              <span>
                <span className="block text-[15px] font-medium text-white">{cta.label}</span>
                <span className="block text-[13px] text-zinc-400">{cta.blurb}</span>
              </span>
            </span>
            <ChevronRight size={18} className="shrink-0 text-zinc-400" aria-hidden="true" />
          </a>
        )}

        <div className="prose-dusk mx-auto mt-12 max-w-[44rem]">{children}</div>

        {related && related.length > 0 && (
          <footer className="mt-20 border-t border-white/10 pt-10">
            <h2 className="mb-6 text-lg font-medium text-white">Keep reading</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {related.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="panel panel-hover flex flex-col gap-2 rounded-xl p-5"
                >
                  <span className="text-[15px] font-medium leading-snug text-white">
                    {item.title}
                  </span>
                  {item.blurb && (
                    <span className="text-[13px] leading-relaxed text-zinc-400">{item.blurb}</span>
                  )}
                </Link>
              ))}
            </div>
          </footer>
        )}
      </div>
    </article>
  )
}
