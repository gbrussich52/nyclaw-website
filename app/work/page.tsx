// classification: PUBLIC
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowDown, ArrowUpRight, Check, FileText } from 'lucide-react'
import OwnOperationsProof from '../components/OwnOperationsProof'
import { CALENDLY_URL } from '../config'
import { work, workPaths } from '../../lib/client-work'

export const metadata: Metadata = {
  title: 'Client Work & Our Own Builds | NYClaw',
  description: 'Client work plus creative, email, alert and content systems built for our own businesses. See the builds and consider what fits your process.',
  alternates: { canonical: 'https://nyclaw.io/work' },
  openGraph: {
    title: 'Client Work & Our Own Builds | NYClaw',
    description: 'See client work and systems built for our own businesses, from creative preparation to customer follow-up.',
    url: 'https://nyclaw.io/work',
    type: 'website',
  },
}

const projectQuestions: Record<string, readonly string[]> = {
  'valentine-family-electric': [
    'Which information is approved before a job moves from estimate to bill?',
    'Who checks the billing draft before an invoice can be issued?',
    'What should happen when a job changes or a required detail is missing?',
  ],
  'byram-mason': [
    'Which reference files and instructions need to stay available through the work?',
    'Who owns the context when a draft moves between people or tools?',
    'How will someone check a draft against the original request and files?',
  ],
}

export default function WorkPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden px-6 pb-20 pt-24 sm:pb-24 sm:pt-28" aria-labelledby="work-title">
        <div className="bloom-indigo pointer-events-none absolute -top-[18rem] left-1/2 -z-10 h-[45rem] w-[52rem] -translate-x-1/2 rounded-full" />
        <div className="hero-grid pointer-events-none absolute inset-0 -z-10" />
        <div className="mx-auto max-w-[64rem]">
          <Link href="/" className="text-sm text-zinc-400 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300">← Home</Link>
          <p className="mt-10 text-xs font-medium uppercase tracking-[0.14em] text-cyan-300">Client and own-business builds</p>
          <h1 id="work-title" className="mt-4 max-w-[48rem] text-balance text-[clamp(2.8rem,6vw,5.5rem)] font-normal leading-[1.04] tracking-[-0.045em] text-white">
            See the work <span className="text-gradient-ai">behind the offer.</span>
          </h1>
          <p className="mt-7 max-w-[39rem] text-[18px] leading-relaxed text-zinc-300">
            Client work and systems built for our own businesses. See what we have built and which patterns fit your team.
          </p>
          <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm font-medium">
            {workPaths.map((path, index) => (
              <a key={path.id} href={`#${path.id}`} className="inline-flex items-center gap-2 text-white underline decoration-white/40 underline-offset-4 hover:decoration-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300">
                <ArrowDown size={15} aria-hidden="true" /> {String(index + 1).padStart(2, '0')} · {work[index]?.footer}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section aria-label="Client work" className="px-6 pb-20">
        <div className="mx-auto max-w-[64rem] space-y-14">
          {work.map((item, index) => {
            const path = workPaths[index]
            const questions = projectQuestions[path.id]
            return (
              <article id={path.id} key={path.id} className="scroll-mt-28">
                <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-10">
                  <div className="pt-2">
                    <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.12em] text-zinc-400">
                      <span className="font-mono text-cyan-300">{String(index + 1).padStart(2, '0')}</span>
                      <span className="h-px w-9 bg-white/20" aria-hidden="true" />
                      <span>{item.badge}</span>
                    </div>
                    <h2 className="mt-5 max-w-[32rem] text-balance text-[clamp(1.9rem,3.5vw,2.8rem)] font-medium leading-[1.13] tracking-[-0.03em] text-white">{item.title}</h2>
                    <p className="mt-5 max-w-[30rem] text-base leading-relaxed text-zinc-300">{item.body}</p>
                    <p className="mt-6 border-l-2 border-cyan-400 pl-4 text-sm font-medium text-zinc-200">{item.footer}</p>
                    <Link href={path.href} className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-cyan-300 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300">
                      {path.label} <ArrowUpRight size={16} aria-hidden="true" />
                    </Link>
                  </div>

                  <div className="min-w-0 rounded-2xl border border-stone-300 bg-[#f2f0e9] p-6 text-zinc-900 shadow-[0_16px_50px_rgba(0,0,0,.18)] sm:p-8">
                    <div className="flex items-start justify-between gap-4 border-b border-stone-300 pb-5">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-600">General buyer questions</p>
                        <h3 className="mt-2 text-xl font-semibold leading-snug">Questions for a similar project</h3>
                      </div>
                      <FileText size={23} className="shrink-0 text-stone-500" aria-hidden="true" />
                    </div>
                    <p className="mt-5 text-sm leading-relaxed text-stone-600">These are prompts for your own workflow, not facts about this client&apos;s project.</p>
                    <ol className="mt-6 space-y-5">
                      {questions.map((question, questionIndex) => (
                        <li key={question} className="flex gap-4">
                          <span className="font-mono text-sm font-semibold text-stone-500">{String(questionIndex + 1).padStart(2, '0')}</span>
                          <span className="text-[15px] leading-relaxed">{question}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <OwnOperationsProof />

      <section className="px-6 pb-24" aria-labelledby="work-next-title">
        <div className="panel mx-auto grid max-w-[64rem] gap-8 rounded-2xl p-7 sm:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-center">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-cyan-300">Your next conversation</p>
            <h2 id="work-next-title" className="mt-4 text-balance text-3xl font-medium tracking-tight text-white">Bring one process your team knows well.</h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-300">A useful call starts with the work as it happens today. We can check native features before discussing a custom build.</p>
            <ul className="mt-6 grid gap-3 text-sm text-zinc-200 sm:grid-cols-2">
              {['The process you want to examine', 'Tools involved in the handoff', 'A step that gets repeated', 'The person who reviews the result'].map((item) => (
                <li key={item} className="flex items-start gap-2"><Check size={16} className="mt-0.5 shrink-0 text-cyan-300" aria-hidden="true" />{item}</li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col items-start gap-4 lg:pl-8">
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 py-3 text-center text-sm font-medium text-zinc-950 transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300">Book a free 30-minute call</a>
            <Link href="/#contact" className="text-sm font-medium text-white underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300">Tell us where work gets stuck</Link>
            <Link href="/services#workflow-examples" className="text-sm text-zinc-300 underline decoration-white/40 underline-offset-4 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300">Explore fictional workflow illustrations</Link>
          </div>
        </div>
      </section>
    </>
  )
}
