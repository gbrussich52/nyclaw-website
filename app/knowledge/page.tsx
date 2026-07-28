import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ChevronRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'AI Knowledge Base — Guides on AI Identity, Operations & Excellence',
  description: 'Research-backed guides on building AI assistants, mission-driven systems, and operational frameworks for small businesses. Free articles from NYClaw.io — the AI implementation agency serving Westchester County, NY.',
  keywords: 'AI assistant guide, AI identity framework, operational excellence, mission-driven systems, AI implementation guide',
  openGraph: {
    title: 'AI Knowledge Base | NYClaw.io',
    description: 'Research-backed guides on AI identity design, mission-driven operations, and avoiding the failure modes that kill small teams.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'AI Knowledge Base | NYClaw.io',
    description: 'Free research-backed guides on building AI systems that work.',
  },
  alternates: {
    canonical: 'https://nyclaw.io/knowledge',
  },
}

const articles = [
  {
    slug: 'ai-assistant-identity',
    number: '01',
    title: 'How to Build a Scalable AI Assistant',
    subtitle: 'The Complete Identity Framework',
    description: 'The architecture that makes AI assistants consistent. Covers the Four-Quadrant Persona Taxonomy, principle-first documentation, priority hierarchies, and the Ainsley case study.',
    readTime: '12 min read',
    tags: ['AI Identity', 'Persona Design', 'Framework'],
    featured: true,
  },
  {
    slug: 'mission-driven-systems',
    number: '02',
    title: 'Mission-Driven Systems',
    subtitle: 'Why Most Processes Fail (And How to Fix Them)',
    description: 'Why operational processes degrade over time and how to design systems that resist entropy. Covers OKR frameworks, review cadences, accountability structures, and mission statement design.',
    readTime: '13 min read',
    tags: ['Operations', 'Mission Design', 'OKRs'],
    featured: false,
  },
  {
    slug: 'operational-excellence',
    number: '03',
    title: 'Operational Excellence for Small Teams',
    subtitle: 'Avoiding 7 Critical Anti-Patterns',
    description: 'The 7 failure modes that kill small team operations — documentation debt, process theater, accountability gaps, and four more — with specific prevention systems for each.',
    readTime: '10 min read',
    tags: ['Anti-Patterns', 'Small Teams', 'Implementation'],
    featured: false,
  },
]

export default function KnowledgePage() {
  return (
    <>
      {/* ---------------------------------------------------------- Hero --- */}
      <section className="relative isolate overflow-hidden px-6 pb-20 pt-[88px]">
        <div className="bloom-blue pointer-events-none absolute -top-[16rem] left-[20%] -z-10 h-[40rem] w-[40rem] rounded-full" />
        <div className="mx-auto max-w-[64rem]">
          <div className="mb-6 inline-flex h-7 items-center gap-2 rounded-full px-3 text-xs font-medium text-zinc-300 outline outline-1 outline-white/[0.12] [background:color-mix(in_oklab,#27272a_55%,#000)]">
            <span className="inline-block h-[5px] w-[5px] rounded-full bg-cyan-400" />
            Knowledge base
          </div>

          <h1 className="max-w-[32rem] text-balance text-[clamp(2.5rem,5.5vw,3.5rem)] font-normal leading-[1.08] tracking-[-0.03em] text-white">
            Build systems that actually work.
          </h1>

          <p className="mt-6 max-w-[38rem] text-lg leading-relaxed text-zinc-300">
            Research-backed guides on AI identity design, mission-driven operations, and the
            failure modes that kill small teams. Everything here is what we learned building
            Ainsley — the hard way.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/resources"
              className="inline-flex h-11 items-center gap-1 rounded-full bg-white pl-5 pr-3 text-[15px] font-medium text-zinc-950 transition-opacity hover:opacity-90"
            >
              Download free guide (PDF)
              <ChevronRight size={17} aria-hidden="true" />
            </Link>
            <span className="text-sm text-zinc-400">50 pages. No fluff. Free with email.</span>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ Articles --- */}
      <section className="px-6 pb-24">
        <div className="mx-auto flex max-w-[56rem] flex-col gap-4">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/knowledge/${article.slug}`}
              className="panel panel-hover group flex items-start gap-7 rounded-2xl p-8"
            >
              <div className="text-gradient-metric shrink-0 text-[44px] font-semibold leading-none tracking-[-0.04em]">
                {article.number}
              </div>
              <div className="flex flex-1 flex-col gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/[0.07] px-2 py-[3px] text-[11px] font-medium tracking-[0.04em] text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                  <span className="ml-auto text-xs text-zinc-400">{article.readTime}</span>
                </div>
                <h2 className="text-[22px] font-medium leading-[1.2] tracking-[-0.02em] text-white">
                  {article.title}
                </h2>
                <p className="text-[15px] font-medium text-zinc-300">{article.subtitle}</p>
                <p className="text-sm leading-relaxed text-zinc-400">{article.description}</p>
                <span className="mt-1.5 inline-flex items-center gap-1.5 text-sm font-medium text-white">
                  Read article
                  <ArrowRight
                    size={15}
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ----------------------------------------------------- PDF CTA --- */}
      <section className="px-6 pb-32">
        <div className="panel relative isolate mx-auto max-w-[64rem] overflow-hidden rounded-2xl px-6 py-16 text-center sm:px-10">
          <div className="bloom-indigo pointer-events-none absolute -bottom-[10rem] left-1/2 -z-10 h-[24rem] w-[36rem] -translate-x-1/2 rounded-full" />
          <h2 className="text-balance text-[clamp(1.75rem,3.5vw,2.25rem)] font-medium leading-[1.15] tracking-[-0.025em] text-white">
            Get the complete guide
          </h2>
          <p className="mx-auto mt-4 max-w-[38rem] text-[17px] leading-relaxed text-zinc-300">
            50 pages of frameworks, templates and the 30/60/90-day implementation roadmap.
            Everything in these articles — plus the printable checklists, OKR templates and
            SOUL.md template. Free.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/resources"
              className="inline-flex h-11 items-center gap-1 rounded-full bg-white pl-5 pr-3 text-[15px] font-medium text-zinc-950 transition-opacity hover:opacity-90"
            >
              Download free (PDF)
              <ChevronRight size={17} aria-hidden="true" />
            </Link>
          </div>
          <p className="mt-4 text-[13px] text-zinc-400">
            Just your email. No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </>
  )
}
