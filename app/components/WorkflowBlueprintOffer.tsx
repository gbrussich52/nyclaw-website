// classification: PUBLIC
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

/** One specialist assessment within the wider agency offer. */
export default function WorkflowBlueprintOffer() {
  return (
    <section className="px-6 pb-24" aria-labelledby="blueprint-offer-title">
      <div className="panel mx-auto grid max-w-[64rem] gap-8 rounded-2xl p-7 sm:p-10 md:grid-cols-[1.4fr_1fr] md:items-center">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.08em] text-cyan-200">A specialist offer for law firms</p>
          <h2 id="blueprint-offer-title" className="mt-4 text-balance text-3xl font-medium leading-tight tracking-[-0.025em] text-white">Workflow Blueprint</h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-300">
            Before changing intake, document collection or billing preparation, map one handoff.
            Check the tools you already have, name the staff reviewer and test the exceptions
            with fictional cases.
          </p>
        </div>
        <div>
          <p className="text-sm leading-relaxed text-zinc-400">
            A written recommendation on what to configure, build or keep manual. Scope and fee
            are agreed after a free fit call; the example on the page is fictional.
          </p>
          <Link href="/law-firm-workflows" className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-white underline underline-offset-4">
            See the law-firm Workflow Blueprint <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
