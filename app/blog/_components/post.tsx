import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

/**
 * Shared building blocks for the SEO blog posts.
 *
 * The seven industry posts (`ai-automations-*`, `ai-law-firm-client-intake`,
 * `ai-automation-small-business-nyc`, `zapier-vs-ai-agent`) are structurally
 * identical: a short-answer callout, a run of feature blocks, a results list, a
 * workshop CTA, an author bio and an FAQ list. They live here rather than in
 * `app/components/` because nothing outside `app/blog/` uses them.
 *
 * Everything renders inside `ArticleShell`'s `.prose-dusk` wrapper, so plain
 * paragraphs and headings elsewhere in a post need no classes — these are the
 * genuinely custom blocks.
 */

/** Lede callout — the "short answer" box that opens each post. */
export function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="panel rounded-xl border-l-[3px] border-l-cyan-400 p-5 text-[15px] leading-relaxed text-zinc-200">
      {children}
    </div>
  )
}

/** One capability in a "what AI actually fixes" run. */
export function FeatureBlock({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="border-l-[3px] border-l-indigo-500 pl-6">
      <h3 className="mt-0 text-lg font-medium text-white">{title}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-zinc-300">{children}</p>
    </div>
  )
}

/** Numbered step in an ordered "the N automations" run. */
export function NumberedBlock({
  n,
  title,
  children,
}: {
  n: number | string
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/15 bg-zinc-950 text-sm font-semibold text-white">
          {n}
        </span>
        <h3 className="mt-0 text-xl font-medium tracking-[-0.01em] text-white">{title}</h3>
      </div>
      {children}
    </div>
  )
}

/** Arrow-marked outcome list, panelled so it reads as a result set. */
export function ResultList({ items }: { items: readonly React.ReactNode[] }) {
  return (
    <div className="panel rounded-xl p-6">
      <ul className="list-none space-y-3 pl-0 text-[15px] text-zinc-300">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="mt-0.5 font-medium text-cyan-400" aria-hidden="true">
              →
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** Mid-article conversion panel. */
export function CtaPanel({
  title,
  blurb,
  href,
  label,
}: {
  title: string
  blurb: string
  href: string
  label: string
}) {
  return (
    <div className="panel relative isolate overflow-hidden rounded-2xl px-6 py-12 text-center sm:px-10">
      <div className="bloom-indigo pointer-events-none absolute -bottom-[10rem] left-1/2 -z-10 h-[22rem] w-[32rem] -translate-x-1/2 rounded-full" />
      <h2 className="mt-0 text-[clamp(1.5rem,3vw,1.875rem)] font-medium leading-[1.15] tracking-[-0.025em] text-white">
        {title}
      </h2>
      <p className="mx-auto mt-3.5 max-w-[32rem] text-[17px] leading-relaxed text-zinc-300">
        {blurb}
      </p>
      <div className="mt-7 flex justify-center">
        <Link
          href={href}
          className="inline-flex h-11 items-center gap-1 rounded-full bg-white pl-5 pr-3 text-[15px] font-medium text-zinc-950 no-underline transition-opacity hover:opacity-90"
        >
          {label}
          <ChevronRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}

/** Publisher card at the foot of the body copy. */
export function AuthorBio({ children }: { children: React.ReactNode }) {
  return (
    <div className="panel flex items-start gap-4 rounded-xl p-6">
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/15 bg-zinc-950 text-lg font-semibold text-white">
        N
      </span>
      <div>
        <p className="font-medium text-white">NYClaw.io</p>
        <p className="mt-0.5 text-[13px] text-zinc-500">
          AI Agency — New York City &amp; Westchester
        </p>
        <p className="mt-2 text-sm leading-relaxed text-zinc-300">{children}</p>
      </div>
    </div>
  )
}

/** Question/answer list matching the FAQ JSON-LD emitted by each post. */
export function FaqSection({
  items,
}: {
  items: readonly { question: string; answer: string }[]
}) {
  return (
    <div className="flex flex-col gap-4">
      {items.map((item) => (
        <div key={item.question} className="panel rounded-xl p-6">
          <h3 className="mt-0 text-lg font-medium text-white">{item.question}</h3>
          <p className="mt-3 text-[15px] leading-relaxed text-zinc-300">{item.answer}</p>
        </div>
      ))}
    </div>
  )
}
