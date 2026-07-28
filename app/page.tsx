import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Bot,
  Workflow,
  Target,
  Mail,
  CalendarClock,
  Phone,
  MessageSquare,
  Database,
  Globe,
  BarChart2,
  ChevronRight,
  ArrowUpRight,
} from 'lucide-react'
import ContactForm from './components/ContactForm'
import PlaybookForm from './components/PlaybookForm'
import { FAQJsonLd } from './components/JsonLd'
import HeroVideo from './components/HeroVideo'
import FaqAccordion from './components/FaqAccordion'
import Reveal from './components/Reveal'
import CountUp from './components/CountUp'
import { CALENDLY_URL } from './config'

const capabilities = [
  { Icon: Bot, label: 'GPT & Claude Agents' },
  { Icon: Workflow, label: 'Workflow Automation' },
  { Icon: Database, label: 'CRM Sync' },
  { Icon: Mail, label: 'Email & SMS Sequences' },
  { Icon: CalendarClock, label: 'Smart Scheduling' },
  { Icon: Phone, label: 'AI Voice Agents' },
  { Icon: MessageSquare, label: 'Customer Support Bots' },
  { Icon: Globe, label: 'Web Scraping & Research' },
  { Icon: BarChart2, label: 'Live Dashboards' },
]

export const metadata: Metadata = {
  title: 'NYClaw.io — AI Agency | Custom Automations & Agents | Westchester & NYC',
  description:
    'NYClaw.io is an AI agency that designs and builds custom automations and agents for small businesses in Westchester County, NY and NYC. Project-based builds — not a one-size product install. Free 15-min fit audit.',
  keywords:
    'AI agency, custom AI agents, AI automation agency, small business AI, workflow automation, Westchester NY, NYC AI agency, agent development, OODA Loop',
  openGraph: {
    title: 'NYClaw.io — AI Agency for Custom Automations & Agents',
    description:
      'We design and build AI automations and agents for how your business actually works. No template install — systems built around your workflows.',
    url: 'https://nyclaw.io',
    siteName: 'NYClaw.io',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NYClaw.io — AI Agency',
    description:
      'Custom AI automations and agents for small businesses in Westchester County & NYC. Free 15-min fit audit.',
  },
  alternates: {
    canonical: 'https://nyclaw.io',
  },
}

const stats = [
  { to: 40, suffix: '%', label: 'Avg. cost reduction' },
  { to: 8, suffix: 'x', label: 'Productivity gains' },
  { raw: 'Sprint', label: 'Project-based delivery' },
  { raw: '24/7', label: 'Agents that keep working' },
] as { to?: number; suffix?: string; raw?: string; label: string }[]

const services = [
  {
    Icon: Bot,
    eyebrow: 'Flagship',
    title: 'Custom AI agents',
    price: '$3.5K–8K',
    unit: 'per agent sprint',
    desc: 'We design, build and ship an agent for one mission-critical job — intake, lead response, scheduling, research, support triage — wired into the tools you already use.',
    href: '/services/ai-automation',
  },
  {
    Icon: Workflow,
    eyebrow: 'Systems',
    title: 'Workflow automation',
    price: '$5K–15K',
    unit: 'project',
    desc: 'End-to-end automations that move work between tools — forms, CRMs, inboxes, calendars, invoices — so humans only touch exceptions.',
    href: '/services/ai-automation',
  },
  {
    Icon: Target,
    eyebrow: 'Entry',
    title: 'Fit audit + roadmap',
    price: 'Free',
    unit: '15-min fit audit · roadmap $1K–2.5K',
    desc: 'Start with a free 15-minute fit call. If you need a deeper plan, we deliver a prioritized automation roadmap with ROI and build order — before you spend on a full system.',
    href: '/services/ai-consulting',
  },
]

const ooda = [
  {
    letter: 'O',
    timeline: '15 min',
    label: 'Observe',
    desc: 'We map your processes, tools and workflows to find where time and money are being lost.',
  },
  {
    letter: 'O',
    timeline: 'Days',
    label: 'Orient',
    desc: 'We weigh your industry context, competitor AI adoption and constraints to rank the highest-ROI opportunities.',
  },
  {
    letter: 'D',
    timeline: 'Scoping',
    label: 'Decide',
    desc: 'We scope the first agent or automation: what it does, which tools it touches, success metrics and a fixed project price.',
  },
  {
    letter: 'A',
    timeline: 'Sprint',
    label: 'Act',
    desc: 'We design, build and ship the system — plus training and a documented handoff so your team can run it.',
  },
]

/**
 * Real client builds. Copy is approved and exact — company names must match
 * how each business writes its own, and no build may be described as free,
 * unpaid or a pilot. Do not paraphrase.
 */
const work = [
  {
    badge: 'Electrical contractor',
    title: 'Estimating, billing and invoicing on one automated path',
    body: 'Andrew, electrician and owner of Valentine Family Electric, was moving every job from estimate to bill to invoice by hand. A Claude-driven process drafts the estimate, turns the approved job into a bill, and issues the invoice with no re-typing between steps.',
    footer: 'Valentine Family Electric · Westchester County, NY',
  },
  {
    badge: 'Building & stone supply',
    title: 'Claude configured to carry complex design work',
    body: 'Frank, owner of Byram Mason, Building & Stone Supply, needed AI that could hold a detailed client design job start to finish. His instructions, project files and skills were structured across Claude Fable, Opus and ChatGPT 5.6 Sol so context survives the whole build.',
    footer: 'Byram Mason, Building & Stone Supply · byrammason.com',
  },
]

const industries = [
  'Real estate',
  'Legal services',
  'Healthcare',
  'Retail / e-comm',
  'Hospitality',
  'Contractors',
]

const homepageFaqs = [
  {
    question: 'What does an AI agency actually build?',
    answer:
      'We design and build custom AI automations and agents around your real workflows — lead response, scheduling, CRM updates, follow-ups, intake, research, and internal ops. You are not buying a pre-packaged bot install. You get systems built for how your team works, with handoff so you can run them.',
  },
  {
    question: 'Do I have to commit to a monthly retainer?',
    answer:
      'No. Most work is project- or sprint-based: we scope one (or a few) automations/agents, build them, and hand them off. Optional ongoing care is available only if you want monitoring and iteration after go-live — it is never required to start.',
  },
  {
    question: 'How long does a build take?',
    answer:
      'Many first agents ship in a focused multi-day sprint once scope and access are clear. Larger multi-agent systems take longer and are priced as a project. We use the OODA Loop (Observe → Orient → Decide → Act) so every build starts with the highest-ROI workflow, not a random tool stack.',
  },
  {
    question: 'What is the free 15-minute fit audit?',
    answer:
      'A short call to identify the #1 workflow worth automating and whether a custom build makes sense for you. No pitch deck, no hour-long sales call. If it is a fit, we outline a fixed-scope project. If it is not, we will say so.',
  },
]

export default function Home() {
  return (
    <>
      <FAQJsonLd items={homepageFaqs} />

      {/* ---------------------------------------------------------- Hero --- */}
      {/* -mt-[92px] cancels the layout spacer so the media card sits under the
          fixed header, as in the mockup. */}
      <section className="-mt-[92px] px-2 pt-2">
        <div className="relative isolate overflow-hidden rounded-[48px] border border-white/5 bg-[#0a0a0c]">
          <HeroVideo className="opacity-50" />

          {/* Ambient blooms, then the scrims that protect the copy. */}
          <div className="bloom-indigo pointer-events-none absolute -top-[10%] right-[2%] h-[44rem] w-[44rem] rounded-full" />
          <div className="bloom-blue pointer-events-none absolute -bottom-[20%] left-[24%] h-[32rem] w-[32rem] rounded-full" />
          <div className="hero-scrim-x pointer-events-none absolute inset-0" />
          <div className="hero-scrim-y pointer-events-none absolute inset-0" />
          <div className="hero-grid pointer-events-none absolute inset-0" />

          <div className="relative z-10 flex min-h-[680px] flex-col justify-end px-6 pb-20 pt-40 sm:min-h-[780px] sm:px-12 sm:pb-32">
            <div className="mx-auto w-full max-w-[80rem]">
              <div className="max-w-[32rem]">
                <div className="mb-6 inline-flex h-7 items-center gap-2 rounded-full px-3 text-xs font-medium text-zinc-300 outline outline-1 outline-white/[0.12] [background:color-mix(in_oklab,#27272a_55%,#000)]">
                  <span className="inline-block h-[5px] w-[5px] rounded-full bg-cyan-400" />
                  AI agency · Westchester County &amp; NYC
                </div>

                <h1 className="text-balance text-[clamp(2.75rem,6vw,3.75rem)] font-normal leading-[1.05] tracking-[-0.03em] text-white">
                  Custom AI agents, built for{' '}
                  <span className="text-gradient-ai">how you already work.</span>
                </h1>

                <p className="mt-6 max-w-[28rem] text-balance text-lg leading-relaxed text-zinc-300">
                  Not a template install. We scope, build and hand off the automation that takes
                  the most time off your team.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-2">
                  <a
                    href="#contact"
                    className="inline-flex h-12 items-center gap-1 rounded-full bg-white pl-5 pr-3 text-base font-medium text-zinc-950 shadow-[0_1px_2px_rgba(0,0,0,.2)] transition-opacity hover:opacity-90"
                  >
                    <span className="whitespace-nowrap">Start a project</span>
                    <ChevronRight size={18} aria-hidden="true" />
                  </a>
                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 items-center rounded-full px-5 text-base font-medium text-white outline outline-1 outline-white/[0.18] transition-colors hover:bg-white/5"
                  >
                    <span className="whitespace-nowrap">Book the 15-min audit</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- Marquee --- */}
      <section className="py-6">
        <div className="mx-auto max-w-[80rem] px-6">
          <div className="flex items-center gap-6">
            <p className="hidden max-w-[11rem] shrink-0 border-r border-white/10 pr-6 text-right text-sm text-zinc-400 md:block">
              Wired into the tools you already run
            </p>
            <div className="marquee flex-1 py-6">
              <div className="marquee-track gap-16 pr-16">
                {[...capabilities, ...capabilities].map(({ Icon, label }, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-2.5 whitespace-nowrap text-[15px] font-medium text-white"
                  >
                    <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- Stats --- */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-[64rem]">
          <div className="hairline-grid grid grid-cols-2 overflow-hidden rounded-sm border-y border-white/10 md:grid-cols-4">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 80}>
                <div className="px-6 py-8">
                  <div className="text-gradient-metric text-[32px] font-semibold leading-none tracking-[-0.03em]">
                    <CountUp to={stat.to} suffix={stat.suffix} raw={stat.raw} />
                  </div>
                  <div className="mt-3 text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-400">
                    {stat.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ Services --- */}
      <section id="services" className="px-6 pb-24">
        <div className="mx-auto flex max-w-[64rem] flex-col gap-12">
          <div className="flex max-w-[36rem] flex-col gap-6">
            <h2 className="text-balance text-[clamp(2rem,4vw,2.75rem)] font-medium leading-[1.12] tracking-[-0.025em] text-white">
              An AI agency — not a product installer.
            </h2>
            <p className="text-[17px] leading-relaxed text-zinc-400">
              We create automations and agents from the ground up for your workflows, tools and
              team. Project-based. Scoped. Delivered.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {services.map(({ Icon, eyebrow, title, price, unit, desc, href }) => (
              <Link
                key={title}
                href={href}
                className="panel panel-hover group flex flex-col gap-4 rounded-xl p-7"
              >
                <div className="flex items-center justify-between">
                  <Icon size={18} strokeWidth={1.75} className="text-zinc-300" aria-hidden="true" />
                  <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-500">
                    {eyebrow}
                  </span>
                </div>
                <h3 className="text-xl font-medium tracking-[-0.01em] text-white">{title}</h3>
                <div>
                  <span className="text-[30px] font-semibold tracking-[-0.03em] text-white">
                    {price}
                  </span>
                  <p className="mt-1 text-[13px] text-zinc-500">{unit}</p>
                </div>
                <p className="flex-1 text-sm leading-relaxed text-zinc-400">{desc}</p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-white">
                  Learn more
                  <ChevronRight
                    size={16}
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ How it works --- */}
      <section id="process" className="px-6 pb-24">
        <div className="mx-auto max-w-[64rem]">
          <div className="panel relative overflow-hidden rounded-2xl px-6 py-14 sm:px-10">
            <div className="mb-12 flex max-w-[36rem] flex-col gap-4">
              <h2 className="text-balance text-[clamp(1.75rem,3.5vw,2.25rem)] font-medium leading-[1.15] tracking-[-0.025em] text-white">
                How it works — the OODA loop
              </h2>
              <p className="text-[15px] leading-relaxed text-zinc-400">
                Every build starts with the highest-ROI workflow, not a random tool stack.
              </p>
            </div>

            <div className="relative">
              {/* Connector sits at the circles' vertical midpoint (44px / 2). */}
              <div className="connector-flow pointer-events-none absolute left-[12%] right-[12%] top-[22px] hidden h-px md:block" />
              <div className="grid gap-10 md:grid-cols-4 md:gap-12">
                {ooda.map((step, i) => (
                  <Reveal key={step.label} delay={i * 90}>
                    <div className="flex flex-col gap-3">
                      <div className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-zinc-950 text-[15px] font-semibold text-white">
                        {step.letter}
                      </div>
                      <p className="whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-400">
                        Step {i + 1} · {step.timeline}
                      </p>
                      <p className="text-base font-medium text-white">{step.label}</p>
                      <p className="text-[13px] leading-relaxed text-zinc-400">{step.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- Work --- */}
      <section id="work" className="px-6 pb-24">
        <div className="mx-auto flex max-w-[64rem] flex-col gap-12">
          <div className="flex max-w-[36rem] flex-col gap-6">
            <h2 className="text-balance text-[clamp(2rem,4vw,2.75rem)] font-medium leading-[1.12] tracking-[-0.025em] text-white">
              Recent builds
            </h2>
            <p className="text-[17px] leading-relaxed text-zinc-400">
              Two systems running on real operations. New builds are being scoped now.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {work.map((item) => (
              <article key={item.title} className="panel panel-hover flex flex-col gap-4 rounded-xl p-7">
                <span className="inline-flex w-fit rounded-full bg-white/[0.07] px-3 py-1 text-[11px] font-medium text-zinc-300">
                  {item.badge}
                </span>
                <h3 className="text-lg font-medium leading-snug tracking-[-0.01em] text-white">
                  {item.title}
                </h3>
                <p className="flex-1 text-sm leading-relaxed text-zinc-400">{item.body}</p>
                <p className="border-t border-white/10 pt-4 text-[13px] text-zinc-500">
                  {item.footer}
                </p>
              </article>
            ))}

            <article className="panel flex flex-col justify-between gap-6 rounded-xl p-7">
              <div className="flex flex-col gap-3">
                <h3 className="text-lg font-medium tracking-[-0.01em] text-white">
                  Your build could be next
                </h3>
                <p className="text-sm leading-relaxed text-zinc-400">
                  We cap active builds so every automation gets senior attention. Start with the
                  free fit audit and we will name the #1 workflow worth automating.
                </p>
              </div>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-fit items-center gap-1 rounded-full bg-white px-4 text-sm font-medium text-zinc-950 transition-opacity hover:opacity-90"
              >
                Book the audit
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </article>
          </div>

          <div className="flex flex-wrap gap-3">
            {industries.map((label) => (
              <span
                key={label}
                className="rounded-full border border-white/10 px-5 py-2 text-sm text-zinc-400"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- Free guide --- */}
      <PlaybookForm />

      {/* ----------------------------------------------------------- FAQ --- */}
      <section className="px-6 pb-24">
        <div className="mx-auto flex max-w-[64rem] flex-col gap-10">
          <h2 className="max-w-[36rem] text-balance text-[clamp(1.75rem,3.5vw,2.25rem)] font-medium leading-[1.15] tracking-[-0.025em] text-white">
            Questions, answered
          </h2>
          <FaqAccordion items={homepageFaqs} />
        </div>
      </section>

      {/* ------------------------------------------------------- Contact --- */}
      <ContactForm />

      {/* ----------------------------------------------------- CTA panel --- */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-[64rem]">
          <div className="panel relative isolate overflow-hidden rounded-2xl px-6 py-14 text-center sm:px-10">
            <div className="bloom-blue pointer-events-none absolute left-1/2 top-0 -z-10 h-[24rem] w-[40rem] -translate-x-1/2 rounded-full" />
            <div className="mx-auto flex max-w-[34rem] flex-col items-center gap-6">
              <h2 className="text-balance text-[clamp(1.75rem,3.5vw,2.25rem)] font-medium leading-[1.15] tracking-[-0.025em] text-white">
                Ready for a system built for how you work?
              </h2>
              <p className="text-[15px] leading-relaxed text-zinc-400">
                Book a free 15-minute fit audit. We will name the #1 automation or agent worth
                building — or tell you if now is not the time.
              </p>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-1 rounded-full bg-white pl-5 pr-3 text-base font-medium text-zinc-950 transition-opacity hover:opacity-90"
              >
                Book the 15-min audit
                <ChevronRight size={18} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
