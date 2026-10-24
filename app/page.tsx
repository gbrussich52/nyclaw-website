// classification: PUBLIC
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowUpRight,
  Bot,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Copy,
  Mail,
  MessageSquareReply,
  PhoneMissed,
  Repeat,
  ShieldCheck,
  Target,
  Timer,
  Workflow,
} from 'lucide-react'
import ContactForm from './components/ContactForm'
import PlaybookForm from './components/PlaybookForm'
import { FAQJsonLd } from './components/JsonLd'
import FaqAccordion from './components/FaqAccordion'
import Reveal from './components/Reveal'
import HeroExampleCard from './components/HeroExampleCard'
import DnaHelix from './components/DnaHelix'
import FounderSection from './components/FounderSection'
import WorkflowBlueprintOffer from './components/WorkflowBlueprintOffer'
import { CALENDLY_URL } from './config'
import { work, workPaths } from '../lib/client-work'

export const metadata: Metadata = {
  title: "AI Automation for Westchester & NYC",
  description:
    'NYClaw.io sets up AI for small businesses in Westchester County and NYC: first replies to new inquiries, estimate and invoice drafts, and less re-typing. Free 30-minute call.',
  keywords:
    'AI agency, AI automation agency, small business AI, workflow automation, Westchester NY, NYC AI agency, AI for contractors, AI consulting',
  openGraph: {
    title: "AI Automation for Westchester & NYC",
    description:
      'Hand the busywork to AI and keep the final say. Built for small businesses in Westchester County and NYC.',
    url: 'https://nyclaw.io',
    siteName: 'NYClaw.io',
    type: 'website',
    locale: 'en_US',
    images: ["https://nyclaw.io/opengraph-image"],
  },
  twitter: {
    card: 'summary_large_image',
    title: "AI Automation for Westchester & NYC",
    description:
      'AI that drafts the replies, estimates and paperwork. You check it and send it. Free 30-minute call.',
    images: ["https://nyclaw.io/opengraph-image"],
  },
  alternates: {
    canonical: 'https://nyclaw.io',
  },
}

/* The week, as owners describe it. Problems first; the offer only makes sense after. */
const pains = [
  { Icon: PhoneMissed, title: 'The job goes to whoever answers first',
    desc: 'A request comes in while you are on a job. By the time you call back, they hired someone else.' },
  { Icon: Copy, title: 'The same details, typed three times',
    desc: 'Name, address and job notes go into the estimate, then the calendar, then the invoice.' },
  { Icon: Timer, title: 'Paperwork happens at night',
    desc: 'Estimates, invoices and follow ups wait until the real work is done for the day.' },
  { Icon: Repeat, title: 'Follow ups slip',
    desc: 'Nobody owns the second email, so a warm customer goes cold without anyone noticing.' },
] as const

const gains = [
  { Icon: MessageSquareReply, title: 'Every inquiry gets a first reply',
    desc: 'A reply is ready in minutes, written the way you talk, so the lead hears back while it is still warm.' },
  { Icon: Workflow, title: 'Type it once',
    desc: 'Details move from the form to the customer list, the estimate and the invoice.' },
  { Icon: ClipboardCheck, title: 'Paperwork waits for your review',
    desc: 'Estimates, bills and reminders are drafted and lined up. You check them and send.' },
  { Icon: ShieldCheck, title: 'You keep the final say',
    desc: 'You decide what runs on its own and what needs your OK. Nothing else goes out.' },
] as const

const steps = [
  { label: 'Free 30-minute call', when: 'Step one',
    desc: 'Show us one task that eats your week. We tell you straight whether AI helps, or whether a setting in software you already pay for will do.' },
  { label: 'A written plan and price', when: 'Before you pay',
    desc: 'You see what we will build, what it costs, who reviews what and how we will test it. No surprises later.' },
  { label: 'Build, test, train', when: 'Handoff',
    desc: 'We build it, test it on real examples with your team and leave plain instructions. No monthly retainer required.' },
] as const

const services = [
  {
    Icon: Bot, eyebrow: 'AI assistants', title: 'Give one recurring job a capable assistant',
    price: '$3.5K to $8K', unit: 'per assistant build',
    desc: 'Sort new inquiries, prepare research or draft the next reply. We connect the tools you approve and agree what your team reviews.',
    href: '/services/ai-automation', cta: 'See assistant builds',
  },
  {
    Icon: Workflow, eyebrow: 'Connected workflows', title: 'Stop copying details between tools',
    price: '$5K to $15K', unit: 'per project',
    desc: 'Link the form, customer record, calendar and invoice so approved details move to the next step. Odd cases go to a named person.',
    href: '/services/ai-automation', cta: 'See workflow builds',
  },
  {
    Icon: Mail, eyebrow: 'Marketing and follow up', title: 'Turn more inquiries into customers',
    price: '$4K to $12K', unit: 'per system build',
    desc: 'Intake, follow up and content built around how people actually become your customers, with review rules set before anything goes out.',
    href: '/services/ai-marketing', cta: 'See marketing systems',
  },
  {
    Icon: Target, eyebrow: 'Advice and planning', title: 'Not sure where to start?',
    price: 'Free', unit: 'first call · written roadmap $1K to $2.5K',
    desc: 'Talk through one process and the tools you have. If a deeper plan would help, you agree its scope before paying for it.',
    href: '/services/ai-consulting', cta: 'See advice and roadmaps',
  },
] as const

const industries = [
  'Contractors and trades',
  'Real estate',
  'Professional services',
  'Healthcare offices',
  'Retail and e-commerce',
  'Restaurants and hospitality',
]

const homepageFaqs = [
  { question: 'What kind of work can AI take off my plate?',
    answer: 'The repeat work around your real work: first replies to new inquiries, follow ups, scheduling, customer records, estimate and invoice drafts, research and marketing. We start with one specific job and check what your current software can already do.' },
  { question: 'Do I have to buy new software?',
    answer: 'Usually not. We start with the tools you already use, like email, calendars, spreadsheets and accounting software. If a build does need another service, its cost is in the written plan before you decide.' },
  { question: 'Will AI send things to my customers without me?',
    answer: 'Only if you decide it should. Together we set which steps run on their own and which wait for your OK. Anything unclear goes to a named person on your team.' },
  { question: 'What happens on the free call?',
    answer: 'You describe one process, the tools involved and where it gets stuck. We tell you honestly whether advice, a settings change or a build makes sense. The call is free and does not commit you to anything.' },
  { question: 'Do you require a monthly retainer?',
    answer: 'No. Advice and builds are priced as projects. After the handoff you can choose ongoing help, priced separately. Some software subscriptions or usage fees may still apply where a project needs them.' },
  { question: 'Is NYClaw a law firm?',
    answer: 'No. The name is New York plus Claw, a nod to the OpenClaw AI agent project. NYClaw is an AI and automation business for small businesses in Westchester County, NYC and remotely. We also offer a specialist Workflow Blueprint for law firms, but we are not a law firm.' },
]

const h2 = 'text-balance text-[clamp(2rem,4vw,2.75rem)] font-medium leading-[1.12] tracking-[-0.025em] text-white'
const eyebrow = 'text-xs font-medium text-cyan-300'

export default function Home() {
  return (
    <>
      <FAQJsonLd items={homepageFaqs} />

      {/* ---------------------------------------------------------- Hero --- */}
      {/* -mt-[92px] cancels the layout spacer so the hero runs full-bleed under
          the fixed header. The live 3D helix (WebGL, mounted after first paint)
          is the backdrop; a left scrim keeps the headline readable and the
          headline stays the LCP element. */}
      <section className="hero-stage relative isolate -mt-[92px] flex min-h-[100svh] items-center overflow-hidden">
        <DnaHelix className="hero-helix absolute inset-0 -z-10" />
        <div className="hero-scrim pointer-events-none absolute inset-0 -z-10" />

        <div className="relative w-full px-6 pb-28 pt-40 sm:px-12 sm:pb-32 sm:pt-44">
          <div className="mx-auto w-full max-w-[72rem]">
            <div className="max-w-[40rem]">
              <div className="mb-6 inline-flex h-7 items-center gap-2 rounded-full px-3 text-xs font-medium text-zinc-300 outline outline-1 outline-white/[0.12] [background:var(--chip-bg)]">
                <span className="inline-block h-[5px] w-[5px] rounded-full bg-cyan-400" />
                AI for small businesses · Westchester County &amp; NYC
              </div>

              <h1 className="text-balance text-[clamp(2.6rem,5.6vw,4.25rem)] font-normal leading-[1.02] tracking-[-0.035em] text-white">
                Stop missing jobs.{' '}
                <span className="text-gradient-ai">Let AI answer while you work.</span>
              </h1>

              <p className="mt-7 max-w-[33rem] text-lg leading-relaxed text-zinc-300">
                Picture finishing a job and finding three emails answered and three jobs booked. We set
                up AI that replies to new inquiries, drafts estimates and invoices, and moves details
                between the tools you already use. You check the work and keep the final say.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center gap-1 rounded-full bg-white pl-5 pr-3 text-base font-medium text-zinc-950 shadow-[var(--shadow-btn)] transition-opacity hover:opacity-90"
                >
                  <span className="whitespace-nowrap">Book a free 30-minute call</span>
                  <ChevronRight size={18} aria-hidden="true" />
                </a>
                <a
                  href="#work"
                  className="inline-flex items-center gap-1 text-base font-medium text-white underline decoration-white/30 underline-offset-[6px] transition-colors hover:decoration-white"
                >
                  See who I&apos;ve helped
                </a>
              </div>
              <p className="mt-5 text-sm text-zinc-400">
                Free, no pitch deck. Bring the inbox that eats your evenings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- What we are --- */}
      {/* AEO: a quotable, disambiguating definition near the top of the page.
          "NYClaw" reads phonetically like "law," which pulls AI-answer
          engines toward legal-AI products; this sentence states plainly what
          the company is so a citing engine has an unambiguous line to quote.
          The example card that used to sit in the hero is the proof beside it:
          what the definition looks like on an ordinary evening. */}
      <section className="px-6 pb-24 pt-10">
        <div className="mx-auto grid max-w-[64rem] items-center gap-12 lg:grid-cols-[1fr_auto] lg:gap-16">
          <p className="reveal-view max-w-[34rem] text-balance text-[clamp(1.25rem,2.2vw,1.5rem)] leading-relaxed text-zinc-300">
            <strong className="font-medium text-white">NYClaw.io is an AI automation business</strong>
            {' '}for small businesses in Westchester County and New York City. We build AI helpers
            for the repeat work around your real work, then train your team and hand over plain instructions.
          </p>
          <div className="reveal-view flex justify-center lg:justify-end">
            <HeroExampleCard />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ Pain and gain --- */}
      <section id="why" aria-labelledby="why-title" className="px-6 pb-24">
        <div className="mx-auto flex max-w-[64rem] flex-col gap-12">
          <div className="flex max-w-[42rem] flex-col gap-5 reveal-view">
            <p className={eyebrow}>Sound familiar?</p>
            <h2 id="why-title" className={h2}>
              Every email you can&apos;t answer is a job someone else books.
            </h2>
          </div>

          <div className="hairline-grid grid overflow-hidden rounded-2xl border border-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {pains.map(({ Icon, title, desc }) => (
              <div key={title} className="flex flex-col gap-3 p-6">
                <Icon size={18} strokeWidth={1.75} className="text-zinc-400" aria-hidden="true" />
                <h3 className="text-base font-medium text-white">{title}</h3>
                <p className="text-sm leading-relaxed text-zinc-400">{desc}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-8">
            <h3 className="max-w-[40rem] text-balance text-[clamp(1.5rem,3vw,1.9rem)] font-medium leading-[1.2] tracking-[-0.02em] text-white">
              Come back from the job to work already done
            </h3>
            <p className="-mt-4 max-w-[36rem] text-[17px] leading-relaxed text-zinc-400">
              Answering that email costs you nothing when an agent does it.
            </p>
            <div className="grid gap-5 sm:grid-cols-2">
              {gains.map(({ Icon, title, desc }, i) => (
                <Reveal key={title} delay={i * 70}>
                  <div className="panel flex h-full gap-4 rounded-xl p-6">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-cyan-300/10 text-cyan-300">
                      <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-base font-medium text-white">{title}</p>
                      <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- Work --- */}
      <section id="work" aria-labelledby="work-title" className="px-6 pb-24">
        <div className="mx-auto flex max-w-[64rem] flex-col gap-12">
          <div className="flex max-w-[42rem] flex-col gap-5 reveal-view">
            <p className={eyebrow}>Local examples</p>
            <h2 id="work-title" className={h2}>
              Local owners I have helped, by name
            </h2>
            <p className="text-[17px] leading-relaxed text-zinc-400">
              An electrician moving every job from estimate to invoice by hand. A building supplier
              who wanted AI to hold a detailed design job from start to finish. Both are friends I
              advised by phone on how to put AI to work.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {work.map((item, index) => (
              <article key={item.title} className="panel panel-hover flex flex-col gap-4 rounded-xl p-7">
                <span className="inline-flex w-fit rounded-full bg-white/[0.07] px-3 py-1 text-[13px] font-medium text-zinc-300">
                  {item.badge}
                </span>
                <h3 className="text-lg font-medium leading-snug tracking-[-0.01em] text-white">
                  {item.title}
                </h3>
                <p className="flex-1 text-sm leading-relaxed text-zinc-400">{item.body}</p>
                <p className="border-t border-white/10 pt-4 text-[13px] text-zinc-400">
                  {item.footer}
                </p>
                <Link href={`/work#${workPaths[index].id}`} className="text-sm font-medium text-cyan-300 underline underline-offset-4">Read the example</Link>
              </article>
            ))}

            <article className="flex flex-col justify-between gap-6 rounded-xl border border-dashed border-white/15 p-7">
              <div className="flex flex-col gap-3">
                <h3 className="text-lg font-medium tracking-[-0.01em] text-white">
                  We run our own businesses on it, too.
                </h3>
                <p className="text-sm leading-relaxed text-zinc-400">
                  Ad creative, customer emails, order alerts and video production for our own store
                  and channel. We test on ourselves before we build for you.
                </p>
              </div>
              <Link href="/work#own-operations" className="inline-flex items-center gap-1 text-sm font-medium text-cyan-300 underline underline-offset-4">
                Explore our own operating builds <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- Founder --- */}
      <FounderSection />

      {/* ------------------------------------------------ How it works --- */}
      <section id="process" aria-labelledby="process-title" className="px-6 pb-24">
        <div className="mx-auto max-w-[64rem]">
          <div className="mb-12 flex max-w-[42rem] flex-col gap-5 reveal-view">
            <p className={eyebrow}>How it works</p>
            <h2 id="process-title" className={h2}>Three steps. You know the price before we start.</h2>
          </div>

          <div className="relative grid gap-10 md:grid-cols-3 md:gap-8">
            <svg aria-hidden="true" viewBox="0 0 600 44" preserveAspectRatio="none" fill="none" className="strand-draw pointer-events-none absolute left-[1.375rem] top-0 hidden h-11 w-[calc((100%-4rem)*2/3+4rem)] md:block">
              <path d="M0 22.0 L10 26.3 L20 30.2 L30 33.3 L40 35.3 L50 36.0 L60 35.3 L70 33.3 L80 30.2 L90 26.3 L100 22.0 L110 17.7 L120 13.8 L130 10.7 L140 8.7 L150 8.0 L160 8.7 L170 10.7 L180 13.8 L190 17.7 L200 22.0 L210 26.3 L220 30.2 L230 33.3 L240 35.3 L250 36.0 L260 35.3 L270 33.3 L280 30.2 L290 26.3 L300 22.0 L310 17.7 L320 13.8 L330 10.7 L340 8.7 L350 8.0 L360 8.7 L370 10.7 L380 13.8 L390 17.7 L400 22.0 L410 26.3 L420 30.2 L430 33.3 L440 35.3 L450 36.0 L460 35.3 L470 33.3 L480 30.2 L490 26.3 L500 22.0 L510 17.7 L520 13.8 L530 10.7 L540 8.7 L550 8.0 L560 8.7 L570 10.7 L580 13.8 L590 17.7 L600 22.0" stroke="var(--accent)" strokeOpacity="0.55" strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
              <path d="M0 22.0 L10 17.7 L20 13.8 L30 10.7 L40 8.7 L50 8.0 L60 8.7 L70 10.7 L80 13.8 L90 17.7 L100 22.0 L110 26.3 L120 30.2 L130 33.3 L140 35.3 L150 36.0 L160 35.3 L170 33.3 L180 30.2 L190 26.3 L200 22.0 L210 17.7 L220 13.8 L230 10.7 L240 8.7 L250 8.0 L260 8.7 L270 10.7 L280 13.8 L290 17.7 L300 22.0 L310 26.3 L320 30.2 L330 33.3 L340 35.3 L350 36.0 L360 35.3 L370 33.3 L380 30.2 L390 26.3 L400 22.0 L410 17.7 L420 13.8 L430 10.7 L440 8.7 L450 8.0 L460 8.7 L470 10.7 L480 13.8 L490 17.7 L500 22.0 L510 26.3 L520 30.2 L530 33.3 L540 35.3 L550 36.0 L560 35.3 L570 33.3 L580 30.2 L590 26.3 L600 22.0" stroke="var(--indigo)" strokeOpacity="0.6" strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
              <path d="M25 31.9 L25 12.1 M50 36.0 L50 8.0 M75 31.9 L75 12.1 M100 22.0 L100 22.0 M125 12.1 L125 31.9 M150 8.0 L150 36.0 M175 12.1 L175 31.9 M200 22.0 L200 22.0 M225 31.9 L225 12.1 M250 36.0 L250 8.0 M275 31.9 L275 12.1 M300 22.0 L300 22.0 M325 12.1 L325 31.9 M350 8.0 L350 36.0 M375 12.1 L375 31.9 M400 22.0 L400 22.0 M425 31.9 L425 12.1 M450 36.0 L450 8.0 M475 31.9 L475 12.1 M500 22.0 L500 22.0 M525 12.1 L525 31.9 M550 8.0 L550 36.0 M575 12.1 L575 31.9" stroke="white" strokeOpacity="0.14" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            </svg>
            {steps.map((step, i) => (
              <Reveal key={step.label} delay={i * 90}>
                <div className="flex flex-col gap-3">
                  <span className="relative z-10 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-zinc-950 text-[15px] font-semibold text-white">
                    {i + 1}
                  </span>
                  <p className="text-[13px] font-medium text-zinc-400">{step.when}</p>
                  <h3 className="text-lg font-medium text-white">{step.label}</h3>
                  <p className="text-sm leading-relaxed text-zinc-400">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ Services --- */}
      <section id="services" aria-labelledby="services-title" className="px-6 pb-24">
        <div className="mx-auto flex max-w-[64rem] flex-col gap-12">
          <div className="flex max-w-[42rem] flex-col gap-5 reveal-view">
            <p className={eyebrow}>Ways to work together</p>
            <h2 id="services-title" className={h2}>Pick the problem. We price the fix up front.</h2>
            <p className="text-[17px] leading-relaxed text-zinc-400">
              Every project is scoped in writing before you pay. Not sure which one fits? That is what the free call is for.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {services.map(({ Icon, eyebrow: label, title, price, unit, desc, href, cta }) => (
              <Link
                key={title}
                href={href}
                className="panel panel-hover group flex flex-col gap-4 rounded-xl p-7"
              >
                <div className="flex items-center justify-between">
                  <Icon size={18} strokeWidth={1.75} className="text-zinc-300" aria-hidden="true" />
                  <span className="text-[13px] font-medium text-zinc-400">
                    {label}
                  </span>
                </div>
                <h3 className="text-xl font-medium tracking-[-0.01em] text-white">{title}</h3>
                <div>
                  <span className="text-[28px] font-semibold tracking-[-0.03em] text-white">{price}</span>
                  <p className="mt-1 text-[13px] text-zinc-400">{unit}</p>
                </div>
                <p className="flex-1 text-sm leading-relaxed text-zinc-400">{desc}</p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-white">
                  {cta}
                  <ChevronRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- Who we serve --- */}
      <section aria-labelledby="who-title" className="px-6 pb-10">
        <div className="mx-auto flex max-w-[64rem] flex-col gap-6">
          <h2 id="who-title" className="text-[clamp(1.5rem,3vw,1.9rem)] font-medium tracking-[-0.02em] text-white">
            Who we work with
          </h2>
          <p className="max-w-[42rem] text-[15px] leading-relaxed text-zinc-400">
            Owner-led businesses with a small team and more repeat work than people. If your week
            runs on email, phone calls, spreadsheets and an invoicing tool, you are in the right place.
          </p>
          <ul className="flex flex-wrap gap-3">
            {industries.map((label) => (
              <li key={label} className="rounded-full border border-white/10 px-5 py-2 text-sm text-zinc-300">
                {label}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <WorkflowBlueprintOffer />

      {/* ----------------------------------------------------------- FAQ --- */}
      <section aria-labelledby="faq-title" className="px-6 pb-24">
        <div className="mx-auto flex max-w-[64rem] flex-col gap-10">
          <h2 id="faq-title" className="reveal-view max-w-[36rem] text-balance text-[clamp(1.75rem,3.5vw,2.25rem)] font-medium leading-[1.15] tracking-[-0.025em] text-white">
            Fair questions
          </h2>
          <FaqAccordion items={homepageFaqs} />
        </div>
      </section>

      {/* ----------------------------------------------------- CTA panel --- */}
      <section aria-labelledby="cta-title" className="px-6 pb-16">
        <div className="mx-auto max-w-[64rem]">
          <div className="panel relative isolate overflow-hidden rounded-2xl px-6 py-16 text-center sm:px-10">
            <div className="bloom-blue pointer-events-none absolute left-1/2 top-0 -z-10 h-[24rem] w-[40rem] -translate-x-1/2 rounded-full" />
            <div className="mx-auto flex max-w-[36rem] flex-col items-center gap-6">
              <h2 id="cta-title" className="text-balance text-[clamp(2rem,4vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.025em] text-white">
                Come back to three answered emails and three booked jobs.
              </h2>
              <p className="text-[16px] leading-relaxed text-zinc-300">
                Bring one task that keeps coming back. In 30 minutes you will know whether AI can
                take it off your plate, and roughly what it would cost.
              </p>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-1 rounded-full bg-white pl-5 pr-3 text-base font-medium text-zinc-950 transition-opacity hover:opacity-90"
              >
                Book a free 30-minute call
                <ChevronRight size={18} aria-hidden="true" />
              </a>
              <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-[13px] text-zinc-400">
                {['Free', 'No obligation', 'A straight answer, even if it is no'].map((t) => (
                  <li key={t} className="inline-flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-cyan-300" aria-hidden="true" /> {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- Contact --- */}
      <ContactForm />

      {/* -------------------------------------------------- Free guide --- */}
      <PlaybookForm compact />
    </>
  )
}
