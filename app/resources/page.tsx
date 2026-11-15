import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, ClipboardList } from 'lucide-react'
import ResourceForm from '../components/ResourceForm'

export const metadata: Metadata = {
  title: 'Free AI Operator\'s Playbook',
  // Claude Fable 5.2, 2026-11-15: every description on this page now matches the guide as rewritten today; the old copy listed sections and templates from the March guide that the guide has not held since October.
  description: 'The free AI Operator\'s Playbook: pick one costly leak, brief an AI assistant, show it what good looks like, set its limits, make it check its own work, and check it every week. Includes a 30-day checklist and a worksheet.',
  keywords: 'AI playbook, AI implementation guide, AI assistant framework, free AI guide, AI templates',
  openGraph: {
    title: 'The AI Operator\'s Playbook: Free Guide',
    description: 'A plain guide for small firms, sourced to what the vendors publish, with a 30-day checklist and a one-page worksheet. Open it after your request is received.',
    type: 'website',
    images: ["https://nyclaw.io/opengraph-image"],
    url: "https://nyclaw.io/resources",
    siteName: "NYClaw.io",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free AI Operator\'s Playbook',
    description: 'A plain guide for small firms, sourced to what the vendors publish, with a 30-day checklist and a one-page worksheet.',
    images: ["https://nyclaw.io/opengraph-image"],
  },
  alternates: {
    canonical: 'https://nyclaw.io/resources',
  },
}

// Claude Fable 5.2, 2026-11-15: second edition of the guide adds three parts and a copy-and-paste appendix; the prior lists described the eight-part first edition.
const whatsInside = [
  { section: 'Parts 1-2', title: 'One leak and a one-page brief', desc: 'Name the job, the number that shows it is done and the person who owns it. Then write how your firm works on one page, and what to keep out of an assistant.' },
  { section: 'Part 3', title: 'Show it what good looks like', desc: 'Real examples, your voice described from your own writing, a one-page brand sheet, and a template where the shape repeats.' },
  { section: 'Parts 4-5', title: 'Limits, and making it check its own work', desc: 'Two lists of what it may do alone and what it must ask about. Then a pass-or-fail standard, proof for every fact, and a second look.' },
  { section: 'Parts 6-7', title: 'Saved methods and the weekly check', desc: 'Write down anything you explained twice. A 15-minute check on a set day, the fake-lead test and stop rules.' },
  { section: 'Parts 8-11', title: 'First 30 days, a worked example, three first jobs', desc: 'A week-by-week checklist, a small law office filled in as an illustration, three starter jobs, and eight questions to ask any builder.' },
  { section: 'Appendices', title: 'Four assistants, words to paste, a worksheet', desc: 'Claude, ChatGPT, Gemini and Grok, each line checked against the vendor page on November 15, 2026. Seven ready-made instructions. A one-page plan to print.' },
]

const templates = [
  'The five-line leak form',
  'One-page business brief',
  'One-page brand sheet',
  'May do alone / must ask first lists',
  'Saved-method outline',
  'Seven instructions to copy and paste',
  'First 30 days checklist',
  'One-page plan worksheet',
]

const trustSignals = [
  'About 30 minutes to read',
  'Sources beside every borrowed idea',
  'Printable worksheet',
  'Free. No credit card.',
]

export default function ResourcesPage() {
  return (
    <>{/* <main> now comes from the root layout — this page's own <main> was
        creating a nested <main> in violation of HTML semantics. */}
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-16 pt-16 text-center">
        {/* Indigo bloom behind the page header, per TOKENS.md. */}
        <div className="bloom-indigo pointer-events-none absolute -top-[16rem] left-1/2 h-[44rem] w-[48rem] -translate-x-1/2 rounded-full" />
        <div className="relative mx-auto max-w-[48rem]">
          <div className="mb-6 inline-flex h-7 items-center rounded-full bg-cyan-400 px-3 text-[13px] font-semibold text-zinc-950">
            Free Download
          </div>
          <h1 className="text-balance text-[clamp(2.5rem,5.5vw,3.5rem)] font-normal leading-[1.08] tracking-[-0.03em] text-white">
            The AI Operator&apos;s Playbook
          </h1>
          <p className="mx-auto mt-6 max-w-[36rem] text-balance text-lg leading-relaxed text-zinc-300">
            A plain guide for a small firm that wants an AI assistant to take one repeating job. Name the job, show it what good looks like, set its limits and check it every week.
          </p>
          <p className="mx-auto mt-3 max-w-[36rem] text-sm leading-relaxed text-zinc-400">
            Submit a request to open the playbook directly on this page.
          </p>
          <p className="mt-4 text-[13px] font-medium text-zinc-400">
            Facts checked November 15, 2026
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
                    <div className="rounded-md bg-white/[0.07] px-1.5 py-1 text-[13px] font-medium text-zinc-300">
                      {item.section}
                    </div>
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
                Printable forms included
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

            {/* Claude Fable 5.2, 2026-11-15: removed a quote attributed to our AI assistant that claimed a record of failed setups we cannot show. */}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[64rem] px-6 pb-16">
        <div className="panel rounded-xl p-7">
          <h2 className="text-xl font-medium text-white">Try a working AI tool</h2>
          <p className="mt-3 max-w-2xl text-zinc-300">Compare local electricians, plumbers and general contractors using dated business sources and clearly marked evidence gaps.</p>
          <Link href="/contractor-finder" className="mt-5 inline-flex text-cyan-300 underline underline-offset-4">Open the free contractor finder</Link>
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
    </>
  )
}
