// classification: PUBLIC
import Link from 'next/link'
import { ArrowUpRight, ChevronRight } from 'lucide-react'
import { FOUNDER } from '../config'

/**
 * FounderSection — puts the person behind the work on the homepage.
 * Background lines come from Giani's own public profile (gianibrussich.com);
 * keep them to facts he publishes himself. No client counts or outcome figures.
 */
const background = [
  { label: 'Close to ten years', detail: 'building analytics and automation inside large companies' },
  { label: 'Moody’s, Morgan Stanley, HomeServe', detail: 'operations, reporting, forecasting and revenue work' },
  { label: 'Today', detail: 'I manage revenue analytics at National Debt Relief, on the Data and AI team' },
  { label: 'After hours', detail: 'I run my own small businesses on the same AI systems I build for clients' },
] as const

export default function FounderSection() {
  return (
    <section id="about-founder" aria-labelledby="founder-title" className="px-6 pb-24">
      <div className="mx-auto max-w-[64rem]">
        <div className="panel grid gap-10 overflow-hidden rounded-2xl p-7 sm:p-10 md:grid-cols-[0.8fr_1.2fr] md:gap-14">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-5 md:flex-col md:items-start md:gap-6">
              {/* Monogram until a headshot is added at public/giani.jpg. Small beside the name on phones. */}
              <div
                aria-hidden="true"
                className="grid aspect-square w-24 shrink-0 place-items-center rounded-2xl border border-white/10 bg-[radial-gradient(120%_120%_at_0%_0%,rgba(46,139,255,.35),transparent_55%),radial-gradient(120%_120%_at_100%_100%,rgba(34,211,238,.25),transparent_55%)] bg-zinc-900 md:w-full md:max-w-[15rem]"
              >
                <span className="font-[family-name:var(--font-display)] text-[2.25rem] font-medium tracking-[-0.06em] text-white md:text-[5rem]">GB</span>
              </div>
              <div>
                <p className="text-lg font-medium text-white">{FOUNDER.name}</p>
                <p className="text-sm text-zinc-400">Founder · Westchester County, NY</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
              <a href={FOUNDER.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-zinc-300 underline decoration-white/30 underline-offset-4 hover:text-white">
                LinkedIn <ArrowUpRight size={14} aria-hidden="true" />
              </a>
              <a href={FOUNDER.site} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-zinc-300 underline decoration-white/30 underline-offset-4 hover:text-white">
                gianibrussich.com <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <p className="text-xs font-medium text-cyan-300">Who you will work with</p>
            <h2 id="founder-title" className="text-balance text-[clamp(1.9rem,3.6vw,2.6rem)] font-medium leading-[1.12] tracking-[-0.025em] text-white">
              Hi, I’m {FOUNDER.firstName}. You talk to me, and I build it.
            </h2>
            <div className="flex flex-col gap-4 text-[16px] leading-relaxed text-zinc-300">
              <p>
                I have spent my career making numbers and processes work inside big companies.
                The tools those teams use to save hours are now cheap enough for a ten-person shop.
                What most owners lack is the time to set them up. That part is my job.
              </p>
              <p>
                No call center and no handoff to a junior team. I learn how your business runs,
                build the system and show your people how to use it.
              </p>
            </div>
            <dl className="hairline-grid grid overflow-hidden rounded-xl border border-white/10 sm:grid-cols-2">
              {background.map((item) => (
                <div key={item.label} className="flex flex-col gap-1 p-4">
                  <dt className="text-sm font-medium text-white">{item.label}</dt>
                  <dd className="text-[13px] leading-relaxed text-zinc-400">{item.detail}</dd>
                </div>
              ))}
            </dl>
            <Link href="/about" className="inline-flex w-fit items-center gap-1 text-sm font-medium text-white underline decoration-white/40 underline-offset-4 hover:decoration-white">
              Read why I started NYClaw <ChevronRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
