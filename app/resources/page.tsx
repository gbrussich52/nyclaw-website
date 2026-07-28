import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, ClipboardList } from 'lucide-react'
import ResourceForm from '../components/ResourceForm'

export const metadata: Metadata = {
  title: 'Free AI Operator\'s Playbook — 50 Pages, No Fluff',
  description: 'Download the free AI Operator\'s Playbook: 50 pages of frameworks, templates, and a 30/60/90-day implementation roadmap for building AI systems that actually work. Used to build Ainsley at NYClaw.io.',
  keywords: 'AI playbook, AI implementation guide, AI assistant framework, free AI guide, AI templates',
  openGraph: {
    title: 'The AI Operator\'s Playbook — Free Download',
    description: '50 pages of frameworks, templates, and the implementation roadmap we used to build Ainsley. Free with your email.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free AI Operator\'s Playbook — 50 Pages',
    description: 'Frameworks, templates, and a 30/60/90-day roadmap for building AI systems that work.',
  },
  alternates: {
    canonical: 'https://nyclaw.io/resources',
  },
}

const whatsInside = [
  { section: 'Section 1', title: 'Building AI Identity', pages: '15 pages', desc: 'The Four-Quadrant Persona Taxonomy, principle-first documentation, priority hierarchies, and the full SOUL.md template.' },
  { section: 'Section 2', title: 'Mission-Driven Systems', pages: '16 pages', desc: 'Why processes fail, how to design mission statements that actually drive decisions, OKR frameworks, and the review cadence.' },
  { section: 'Section 3', title: 'Operational Excellence', pages: '9 pages', desc: 'All 7 anti-patterns with real-world examples and specific prevention systems for each.' },
  { section: 'Section 4', title: 'Implementation Roadmap', pages: '8 pages', desc: 'The 30/60/90-day plan. Week-by-week actions to build your system from scratch.' },
  { section: 'Appendix', title: 'Templates & Checklists', pages: '4 pages', desc: 'Printable: SOUL.md template, weekly review checklist, monthly audit checklist, anti-pattern scorecard, OKR template.' },
]

const templates = [
  'SOUL.md Identity Template (copy-pasteable)',
  'Weekly Review Checklist',
  'Monthly Documentation Audit',
  'Anti-Pattern Audit Scorecard',
  'OKR Template for Small Teams',
  'System Health Dashboard',
]

const trustSignals = [
  '50 pages',
  '5 printable templates',
  '30/60/90-day roadmap',
  'Free. No credit card.',
]

export default function ResourcesPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-16 pt-16 text-center">
        {/* Indigo bloom behind the page header, per TOKENS.md. */}
        <div className="bloom-indigo pointer-events-none absolute -top-[16rem] left-1/2 h-[44rem] w-[48rem] -translate-x-1/2 rounded-full" />
        <div className="relative mx-auto max-w-[48rem]">
          <div className="mb-6 inline-flex h-7 items-center rounded-full bg-gradient-to-br from-cyan-400 to-indigo-500 px-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-zinc-950">
            Free Download
          </div>
          <h1 className="text-balance text-[clamp(2.5rem,5.5vw,3.5rem)] font-normal leading-[1.08] tracking-[-0.03em] text-white">
            The AI Operator&apos;s Playbook
          </h1>
          <p className="mx-auto mt-6 max-w-[36rem] text-balance text-lg leading-relaxed text-zinc-300">
            How to build an AI assistant that actually works — with identity, memory, a harness around the model, and a closed loop after go-live so automation doesn&apos;t die in 30 days. Built from what we learned deploying Ainsley.
          </p>
          <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-400">
            Updated July 2026
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-6 text-sm text-zinc-400">
            {trustSignals.map((signal) => (
              <span key={signal} className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 flex-shrink-0 text-cyan-400" strokeWidth={2.5} />
                {signal}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-[64rem] px-6 pb-24">
        <div className="grid items-start gap-12 md:grid-cols-2">

          {/* Form (client component) */}
          <ResourceForm />

          {/* What's Inside */}
          <div>
            <h2 className="mb-2 text-[26px] font-medium tracking-[-0.02em] text-white">
              What&apos;s inside
            </h2>
            <div>
              {whatsInside.map((item) => (
                <div
                  key={item.section}
                  className="flex gap-5 border-b border-dashed border-white/[0.12] py-6"
                >
                  <div className="w-[72px] flex-shrink-0 text-center">
                    <div className="rounded-md bg-white/[0.07] px-1.5 py-1 text-[11px] font-medium tracking-[0.04em] text-zinc-300">
                      {item.section}
                    </div>
                    <div className="mt-1.5 text-[11px] text-zinc-400">{item.pages}</div>
                  </div>
                  <div>
                    <h3 className="mb-1.5 text-base font-medium text-white">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-zinc-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Printable callout */}
            <div className="panel mt-7 rounded-xl p-6">
              <h3 className="mb-4 flex items-center gap-2 text-[15px] font-medium text-white">
                <ClipboardList className="h-4 w-4 flex-shrink-0" strokeWidth={1.75} />
                Printable Templates Included
              </h3>
              <ul className="flex flex-col gap-2.5 text-sm leading-relaxed text-zinc-300">
                {templates.map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" strokeWidth={2.5} />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ainsley story */}
            <div className="mt-8 border-l-4 border-white/15 pl-4">
              <p className="text-[15px] italic leading-relaxed text-zinc-300">
                &ldquo;Every AI assistant we&apos;ve seen fail had one thing in common: the operator treated setup as optional. It&apos;s not. Setup is the whole game.&rdquo;
              </p>
              <p className="mt-2.5 text-sm font-medium text-white">— Ainsley, NYClaw.io</p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="px-6 pb-32">
        <div className="mx-auto max-w-[64rem]">
          <h2 className="mb-8 text-center text-[26px] font-medium tracking-[-0.02em] text-white">
            Go deeper (free)
          </h2>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { href: '/knowledge/ai-assistant-identity', label: 'AI Identity', title: 'How to Build a Scalable AI Assistant', time: '12 min' },
              { href: '/knowledge/mission-driven-systems', label: 'Operations', title: 'Mission-Driven Systems: Why Most Processes Fail', time: '13 min' },
              { href: '/knowledge/operational-excellence', label: 'Anti-Patterns', title: 'Operational Excellence: 7 Critical Anti-Patterns', time: '10 min' },
            ].map(a => (
              <Link
                key={a.href}
                href={a.href}
                className="panel panel-hover flex flex-col gap-2.5 rounded-xl p-6"
              >
                <div className="text-xs text-zinc-400">{a.label} · {a.time} read</div>
                <h3 className="text-base font-medium leading-snug tracking-[-0.01em] text-white">{a.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
