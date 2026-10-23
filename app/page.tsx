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
  { Icon: PhoneMissed, title: 'Leads wait while you work',
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
    desc: 'A draft is ready while the lead is still warm, written the way you talk.' },
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
const eyebrow = 'text-xs font-medium uppercase tracking-[0.12em] text-cyan-300'

export default function Home() {
  return (
    <>
      <FAQJsonLd items={homepageFaqs} />

      {/* ---------------------------------------------------------- Hero --- */}
      {/* -mt-[92px] cancels the layout spacer so the hero card sits under the
          fixed header. The abstract video was replaced by a concrete example
          of the work, which also takes the heaviest asset off first paint. */}
      <section className="-mt-[92px] px-2 pt-2">
        <div className="relative isolate overflow-hidden rounded-[48px] border border-white/5 bg-[#0a0a0c]">
          <div className="bloom-indigo pointer-events-none absolute -top-[18%] right-[4%] h-[44rem] w-[44rem] rounded-full" />
          <div className="bloom-blue pointer-events-none absolute -bottom-[25%] left-[10%] h-[32rem] w-[32rem] rounded-full" />
          <div className="hero-grid pointer-events-none absolute inset-0" />

          <div className="relative z-10 px-6 pb-16 pt-36 sm:px-12 sm:pb-24 sm:pt-44">
            <div className="mx-auto grid w-full max-w-[72rem] items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="max-w-[40rem]">
                <div className="mb-6 inline-flex h-7 items-center gap-2 rounded-full px-3 text-xs font-medium text-zinc-300 outline outline-1 outline-white/[0.12] [background:color-mix(in_oklab,#27272a_55%,#000)]">
                  <span className="inline-block h-[5px] w-[5px] rounded-full bg-cyan-400" />
                  AI for small businesses · Westchester County &amp; NYC
                </div>

                <h1 className="text-balance text-[clamp(2.6rem,5.4vw,3.9rem)] font-normal leading-[1.03] tracking-[-0.035em] text-white">
                  Stop doing the same work twice.{' '}
                  <span className="text-gradient-ai">Let AI take the busywork.</span>
                </h1>

                <p className="mt-7 max-w-[33rem] text-lg leading-relaxed text-zinc-300">
                  We set up AI that answers new inquiries, drafts estimates and invoices, and moves
                  details between the tools you already use. You check the work and keep the final say.
                </p>

                <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 items-center gap-1 rounded-full bg-white pl-5 pr-3 text-base font-medium text-zinc-950 shadow-[0_1px_2px_rgba(0,0,0,.2)] transition-opacity hover:opacity-90"
                  >
                    <span className="whitespace-nowrap">Book a free 30-minute call</span>
                    <ChevronRight size={18} aria-hidden="true" />
                  </a>
                  <a
                    href="#work"
                    className="inline-flex items-center gap-1 text-base font-medium text-white underline decoration-white/30 underline-offset-[6px] transition-colors hover:decoration-white"
                  >
                    See real client work
                  </a>
                </div>
                <p className="mt-5 text-sm text-zinc-400">
                  Free, no pitch deck. Bring one task that eats your week.
                </p>
              </div>

              <div className="flex justify-center lg:justify-end">
                <HeroExampleCard />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- What we are --- */}
      {/* AEO: a quotable, disambiguating definition near the top of the page.
          "NYClaw" reads phonetically like "law," which pulls AI-answer
          engines toward legal-AI products; this sentence states plainly what
          the company is so a citing engine has an unambiguous line to quote. */}
      <section className="px-6 py-14">
        <p className="mx-auto max-w-[50rem] text-balance text-center text-lg leading-relaxed text-zinc-300">
          <strong className="font-medium text-white">NYClaw.io is an AI automation business</strong>
          {' '}for small businesses in Westchester County and New York City. We build AI helpers
          for the repeat work around your real work, then train your team and hand over plain instructions.
        </p>
      </section>

      {/* ------------------------------------------------ Pain and gain --- */}
      <section id="why" aria-labelledby="why-title" className="px-6 pb-24">
        <div className="mx-auto flex max-w-[64rem] flex-col gap-12">
          <div className="flex max-w-[42rem] flex-col gap-5">
            <p className={eyebrow}>Sound familiar?</p>
            <h2 id="why-title" className={h2}>
              You started a business to do the work, not the paperwork about the work.
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
              What changes when AI does the first draft
            </h3>
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
          <div className="flex max-w-[42rem] flex-col gap-5">
            <p className={eyebrow}>Real work</p>
            <h2 id="work-title" className={h2}>
              Built for local businesses you can look up
            </h2>
            <p className="text-[17px] leading-relaxed text-zinc-400">
              An electrician who was moving every job from estimate to invoice by hand. A building
              supplier who needed AI that could hold a detailed design job from start to finish.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {work.map((item, index) => (
              <article key={item.title} className="panel panel-hover flex flex-col gap-4 rounded-xl p-7">
                <span className="inline-flex w-fit rounded-full bg-white/[0.07] px-3 py-1 text-[11px] font-medium text-zinc-300">
                  {item.badge}
                </span>
                <h3 className="text-lg font-medium leading-snug tracking-[-0.01em] text-white">
                  {item.title}
                </h3>
                <p className="flex-1 text-sm leading-relaxed text-zinc-400">{item.body}</p>
                <p className="border-t border-white/10 pt-4 text-[13px] text-zinc-400">
                  {item.footer}
                </p>
                <Link href={`/work#${workPaths[index].id}`} className="text-sm font-medium text-cyan-300 underline underline-offset-4">See this client example</Link>
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
          <div className="mb-12 flex max-w-[42rem] flex-col gap-5">
            <p className={eyebrow}>How it works</p>
            <h2 id="process-title" className={h2}>Three steps. You know the price before we start.</h2>
          </div>

          <div className="relative grid gap-10 md:grid-cols-3 md:gap-8">
            <span aria-hidden="true" className="connector-flow pointer-events-none absolute left-[16%] right-[16%] top-[22px] hidden h-px md:block" />
            {steps.map((step, i) => (
              <Reveal key={step.label} delay={i * 90}>
                <div className="flex flex-col gap-3">
                  <span className="relative z-10 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-zinc-950 text-[15px] font-semibold text-white">
                    {i + 1}
                  </span>
                  <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-400">{step.when}</p>
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
          <div className="flex max-w-[42rem] flex-col gap-5">
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
                  <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-400">
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
          <h2 id="faq-title" className="max-w-[36rem] text-balance text-[clamp(1.75rem,3.5vw,2.25rem)] font-medium leading-[1.15] tracking-[-0.025em] text-white">
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
                What would you do with your evenings back?
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
