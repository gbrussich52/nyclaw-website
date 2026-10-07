// classification: PUBLIC
import { ArrowUpRight } from 'lucide-react'
import { ownOperations } from '../../lib/own-operations'

/** Verified examples from NYClaw's own work, kept distinct from client case studies. */
export default function OwnOperationsProof() {
  return (
    <section id="own-operations" aria-labelledby="own-operations-title" className="px-6 pb-24 scroll-mt-28">
      <div className="mx-auto max-w-[64rem]">
        <div className="max-w-[43rem]">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-cyan-300">Our own work</p>
          <h2 id="own-operations-title" className="mt-4 text-balance text-[clamp(2rem,4vw,2.75rem)] font-medium leading-[1.12] tracking-[-0.025em] text-white">
            Built for our own operations.
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-zinc-300">
            We build and use these systems in our own work. The same patterns can be adapted around your tools, customers and approval rules.
          </p>
        </div>

        <div className="mt-9 grid gap-5 md:grid-cols-2">
          {ownOperations.map((item, index) => (
            <article key={item.title} className="panel flex min-w-0 flex-col rounded-2xl p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="font-mono text-sm font-medium text-cyan-300">{String(index + 1).padStart(2, '0')}</span>
                <span className="rounded-full border border-white/15 px-3 py-1 text-xs font-medium text-zinc-300">{item.status}</span>
              </div>
              <h3 className="mt-5 text-balance text-2xl font-medium leading-tight tracking-[-0.025em] text-white">{item.title}</h3>
              <div className="mt-6 grid gap-5 border-t border-white/10 pt-5 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.1em] text-cyan-300">What we built</p>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-200">{item.built}</p>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.1em] text-cyan-300">For your business</p>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-200">{item.application}</p>
                </div>
              </div>
              {item.href && (
                <a href={item.href} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 self-start text-sm font-medium text-white underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300">
                  {item.href.includes('youtube.com') ? 'See the channel' : 'See the store'} <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              )}
            </article>
          ))}
        </div>

        <p className="mt-7 max-w-[44rem] text-sm leading-relaxed text-zinc-300">
          We scope the adaptation around your process and test it before handoff.
        </p>
      </div>
    </section>
  )
}
