// classification: PUBLIC
import { Check, Inbox, PenLine, Send, UserRound } from 'lucide-react'

/**
 * HeroExampleCard — shows the offer as a concrete evening-to-morning handoff
 * instead of abstract motion. Labeled as an example: no real customer, record
 * or message appears, and no timing is claimed as a result.
 */
const steps = [
  {
    Icon: Inbox,
    time: '7:42 PM',
    title: 'New inquiry from your website',
    detail: '“Can you quote a kitchen remodel in Mount Kisco?”',
  },
  {
    Icon: UserRound,
    time: 'Right after',
    title: 'Details saved to your customer list',
    detail: 'Name, town, job type and how they found you. Typed once.',
  },
  {
    Icon: PenLine,
    time: 'Right after',
    title: 'Reply drafted in your voice',
    detail: 'Asks for a few photos and a good time for a site visit.',
  },
  {
    Icon: Send,
    time: '8:05 AM',
    title: 'You read it, change a word, hit send',
    detail: 'Nothing goes out until you say so.',
    done: true,
  },
] as const

export default function HeroExampleCard() {
  return (
    <figure className="relative w-full max-w-[26rem]">
      <div className="bloom-blue pointer-events-none absolute -inset-10 -z-10 rounded-full" />
      <div className="panel rounded-3xl p-5 shadow-[0_30px_80px_-20px_rgba(0,0,0,.7)] sm:p-6">
        <div className="mb-5 flex items-center justify-between">
          <p className="text-[13px] font-medium text-white">One evening, with help</p>
          <span className="rounded-full bg-white/[0.07] px-2.5 py-1 text-[13px] font-medium text-zinc-300">
            Example
          </span>
        </div>
        <ol className="relative flex flex-col gap-4">
          <span
            aria-hidden="true"
            className="absolute bottom-6 left-[17px] top-6 w-px bg-gradient-to-b from-cyan-400/60 via-indigo-500/40 to-white/10"
          />
          {steps.map(({ Icon, time, title, detail, ...rest }) => {
            const done = 'done' in rest && rest.done
            return (
              <li key={title} className="relative flex gap-4">
                <span
                  className={`relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-full border ${
                    done ? 'border-cyan-300/60 bg-cyan-300 text-zinc-950' : 'border-white/15 bg-zinc-950 text-zinc-200'
                  }`}
                >
                  {done ? <Check size={16} strokeWidth={2.25} aria-hidden="true" /> : <Icon size={16} strokeWidth={1.75} aria-hidden="true" />}
                </span>
                <div className="min-w-0 pt-0.5">
                  <p className="text-[13px] font-medium text-zinc-400">{time}</p>
                  <p className="mt-1 text-[15px] font-medium leading-snug text-white">{title}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-zinc-400">{detail}</p>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
      <figcaption className="mt-3 px-2 text-center text-[12px] text-zinc-500">
        An illustration of the kind of handoff we build. Not a client record.
      </figcaption>
    </figure>
  )
}
