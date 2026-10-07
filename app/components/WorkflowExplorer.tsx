// classification: PUBLIC
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Check, CircleHelp, FileText, UserRound } from 'lucide-react'
import { CALENDLY_URL } from '../config'

type Scenario = {
  title: string
  prompt: string
  request: string
  record: string
  draft: string
  missing: string
  completeOutcome: string
  missingOutcome: string
  reviewer: string
  nativeCheck: string
  serviceHref: string
  serviceLabel: string
  specialist?: boolean
}

const scenarios: Scenario[] = [
  {
    title: 'An inquiry waits for a reply',
    prompt: 'A new request comes in while everyone is busy.',
    request: 'Fictional customer asks for a kitchen estimate and gives a reply address.',
    record: 'Inquiry, reply address and requested work are grouped for the office.',
    draft: 'A reply draft asks for a good time to discuss the estimate.',
    missing: 'The sample has no usable reply address.',
    completeOutcome: 'Draft ready for the office to review. Nothing has been sent.',
    missingOutcome: 'Needs staff clarification. The workflow cannot reply without a usable address.',
    reviewer: 'Office coordinator checks the details and approves, edits or discards the draft.',
    nativeCheck: 'Check whether your form and inbox already create an assigned inquiry.',
    serviceHref: '/services/ai-marketing',
    serviceLabel: 'Explore inquiry and follow-up workflows',
  },
  {
    title: 'Job details get typed again',
    prompt: 'An approved job moves from estimate to billing.',
    request: 'Fictional approved job has a job ID, customer and agreed work details.',
    record: 'The approved job details are matched to the billing record.',
    draft: 'An invoice draft uses the approved job information for review.',
    missing: 'The sample has no approved billing line or named billing reviewer.',
    completeOutcome: 'Invoice draft ready for billing review. No invoice has been issued.',
    missingOutcome: 'Needs staff clarification. Approve the work details and name a reviewer before drafting.',
    reviewer: 'Named billing owner checks the job record and approves or corrects the draft.',
    nativeCheck: 'Check whether your job and billing tools can pass approved details directly.',
    serviceHref: '/services/ai-automation',
    serviceLabel: 'Explore workflow automation',
  },
  {
    title: 'A missing detail stops the work',
    prompt: 'An intake checklist and a document list disagree.',
    request: 'Fictional matter DEMO-104 needs an intake questionnaire and a signed engagement letter.',
    record: 'The sample document list identifies both requested items by name.',
    draft: 'A staff checklist notes the items for human verification.',
    missing: 'The sample document list identifies the questionnaire, but not the signed letter.',
    completeOutcome: 'Staff checks the actual record before intake continues. The example has not verified a signature.',
    missingOutcome: 'Needs staff clarification. Staff checks the record and may approve a reminder draft.',
    reviewer: 'Intake coordinator verifies the record and decides whether any reminder is appropriate.',
    nativeCheck: 'Check whether your existing intake software already tracks document status and exceptions.',
    serviceHref: '/services/ai-automation',
    serviceLabel: 'Explore workflow automation',
    specialist: true,
  },
]

export default function WorkflowExplorer() {
  const [selected, setSelected] = useState(0)
  const [complete, setComplete] = useState(true)
  const example = scenarios[selected]

  return (
    <section id="workflow-examples" aria-labelledby="workflow-examples-title" className="px-6 pb-24">
      <div className="mx-auto max-w-[64rem]">
        <div className="max-w-[42rem]">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-cyan-300">See a handoff</p>
          <h2 id="workflow-examples-title" className="mt-4 text-balance text-[clamp(2rem,4vw,2.75rem)] font-medium leading-[1.12] tracking-[-0.025em] text-white">
            Where does work get stuck?
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-zinc-300">
            Choose a familiar problem. These fictional examples show where a tool can prepare the next step and where a person stays in charge.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-2" aria-label="Choose a workflow example">
          {scenarios.map((scenario, index) => (
            <button
              key={scenario.title}
              type="button"
              aria-pressed={selected === index}
              onClick={() => { setSelected(index); setComplete(true) }}
              className={`rounded-full px-4 py-3 text-left text-sm font-medium leading-snug transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 ${selected === index ? 'bg-white text-zinc-950' : 'border border-white/20 text-zinc-200 hover:bg-white/10'}`}
            >
              {scenario.title}
            </button>
          ))}
        </div>

        <div className="mt-7 grid gap-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <div className="panel min-w-0 rounded-2xl p-6 sm:p-8">
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-cyan-300">Fictional example</p>
            <h3 aria-live="polite" aria-atomic="true" className="mt-4 text-2xl font-medium leading-tight text-white">{example.title}</h3>
            <p className="mt-2 text-zinc-300">{example.prompt}</p>
            <p className="mt-7 text-sm font-medium text-white">What changes if a required detail is missing?</p>
            <div className="mt-3 flex flex-wrap gap-2" aria-label="Example data condition">
              <button type="button" aria-pressed={complete} onClick={() => setComplete(true)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 ${complete ? 'bg-cyan-300 text-zinc-950' : 'border border-white/20 text-zinc-200 hover:bg-white/10'}`}>
                <Check size={15} aria-hidden="true" /> Complete sample
              </button>
              <button type="button" aria-pressed={!complete} onClick={() => setComplete(false)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 ${!complete ? 'bg-cyan-300 text-zinc-950' : 'border border-white/20 text-zinc-200 hover:bg-white/10'}`}>
                <CircleHelp size={15} aria-hidden="true" /> Missing detail
              </button>
            </div>
            <div className="mt-7 border-t border-white/10 pt-6">
              <p className="text-xs font-medium uppercase tracking-[0.1em] text-zinc-400">Check your current tools first</p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-200">{example.nativeCheck}</p>
            </div>
          </div>

          <div className="min-w-0 rounded-2xl border border-stone-300 bg-[#f2f0e9] p-6 text-zinc-900 shadow-[0_16px_50px_rgba(0,0,0,.2)] sm:p-8">
            <div className="flex items-start justify-between gap-3 border-b border-stone-300 pb-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-600">Sample handoff · fictional</p>
                <p className="mt-2 text-lg font-semibold">From request to review</p>
              </div>
              <FileText size={24} className="shrink-0 text-stone-500" aria-hidden="true" />
            </div>
            <ol className="mt-5 space-y-4">
              <li><p className="text-xs font-semibold uppercase tracking-wide text-stone-500">1 · Request</p><p className="mt-1 text-sm leading-relaxed">{complete ? example.request : example.missing}</p></li>
              <li><p className="text-xs font-semibold uppercase tracking-wide text-stone-500">2 · Record</p><p className="mt-1 text-sm leading-relaxed">{complete ? example.record : 'The incomplete sample is held for staff to check before the next step.'}</p></li>
              <li><p className="text-xs font-semibold uppercase tracking-wide text-stone-500">3 · Draft</p><p className="mt-1 text-sm leading-relaxed">{complete ? example.draft : 'No next-step draft is treated as ready. Staff decide whether to request the missing detail.'}</p></li>
              <li><p className="text-xs font-semibold uppercase tracking-wide text-stone-500">4 · Review</p><p className="mt-1 flex items-start gap-2 text-sm leading-relaxed"><UserRound size={16} className="mt-0.5 shrink-0" aria-hidden="true" />{example.reviewer}</p></li>
            </ol>
            <div className="mt-6 rounded-lg border border-stone-300 bg-white/70 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-stone-600">Outcome</p>
              <p className="mt-1 text-sm font-medium leading-relaxed" aria-live="polite" aria-atomic="true">
                {complete ? example.completeOutcome : example.missingOutcome}
              </p>
            </div>
            <p className="mt-5 text-xs leading-relaxed text-stone-600">Illustration only. No real records are read, messages sent or invoices issued.</p>
          </div>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm">
          <Link href={example.serviceHref} className="inline-flex items-center gap-1 font-medium text-cyan-300 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300">
            {example.serviceLabel} <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
          {example.specialist && <Link href="/law-firm-workflows" className="font-medium text-zinc-200 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300">See the separate law-firm assessment</Link>}
          <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="font-medium text-white underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300">Book a free 30-minute call</a>
        </div>
      </div>
    </section>
  )
}
