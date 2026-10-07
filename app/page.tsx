// classification: PUBLIC
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Bot,
  Workflow,
  Target,
  Mail,
  ChevronRight,
  ArrowUpRight,
} from 'lucide-react'
import ContactForm from './components/ContactForm'
import PlaybookForm from './components/PlaybookForm'
import { FAQJsonLd } from './components/JsonLd'
import HeroVideo from './components/HeroVideo'
import FaqAccordion from './components/FaqAccordion'
import Reveal from './components/Reveal'
import WorkflowBlueprintOffer from './components/WorkflowBlueprintOffer'
import WorkflowExplorer from './components/WorkflowExplorer'
import { CALENDLY_URL } from './config'

export const metadata: Metadata = {
  title: 'AI Automation for Small Business | Westchester & NYC',
  description:
    'NYClaw.io is an AI agency that builds custom automations and agents for small businesses in Westchester County, NY and NYC. Free 30-minute call.',
  keywords:
    'AI agency, custom AI agents, AI automation agency, small business AI, workflow automation, Westchester NY, NYC AI agency, agent development, OODA Loop',
  openGraph: {
    title: 'NYClaw.io | AI Automation Agency | Westchester, NYC',
    description:
      'Practical AI and automation for inquiries, follow-up and repeat work. Start with one job and the tools you already use.',
    url: 'https://nyclaw.io',
    siteName: 'NYClaw.io',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NYClaw.io | AI Automation Agency | Westchester, NYC',
    description:
      'Custom AI automations and agents for small businesses in Westchester County & NYC. Free 30-minute call.',
  },
  alternates: {
    canonical: 'https://nyclaw.io',
  },
}

const services = [
  {
    Icon: Bot, eyebrow: 'AI assistants', title: 'Give one recurring job a capable assistant',
    price: '$3.5K–8K', unit: 'per agent sprint',
    desc: 'Prepare a research summary, sort an inquiry or draft the next response. We define the job, connect approved tools and make clear what your team reviews.',
    href: '/services/ai-automation', cta: 'See assistant builds',
  },
  {
    Icon: Workflow, eyebrow: 'Connected workflows', title: 'Spend less time copying details between tools',
    price: '$5K–15K', unit: 'project',
    desc: 'Connect the form, customer record, calendar or invoice so approved information moves to the next step. Exceptions go to a named person.',
    href: '/services/ai-automation', cta: 'See workflow builds',
  },
  {
    Icon: Mail, eyebrow: 'Marketing & follow-up', title: 'Give inquiries a clear next step',
    price: '$4K–12K', unit: 'marketing system build',
    desc: 'Build the intake, follow-up and content process around how people become your customers. Set the review rules before messages or content go out.',
    href: '/services/ai-marketing', cta: 'See marketing systems',
  },
  {
    Icon: Target, eyebrow: 'Advice & planning', title: 'Work out what is worth changing',
    price: 'Free', unit: '30-minute call · written roadmap $1K–2.5K',
    desc: 'Talk through one process and the tools you already have. If a deeper plan would help, agree the scope of a written roadmap before paying for it.',
    href: '/services/ai-consulting', cta: 'See advice & roadmaps',
  },
]

const ooda = [
  { letter: '1', timeline: 'First conversation', label: 'Show us the sticking point',
    desc: 'Walk through one real job: who starts it, what gets repeated and where the next step waits.' },
  { letter: '2', timeline: 'Before a proposal', label: 'Check the tools you have',
    desc: 'Look for a simpler setting or process change first. Agree what is worth fixing and what should stay manual.' },
  { letter: '3', timeline: 'Written scope', label: 'Agree the job and price',
    desc: 'Name the inputs, permissions, reviewer and test cases. Set the scope, cost and acceptance check before work starts.' },
  { letter: '4', timeline: 'Build & handoff', label: 'Test it with your team',
    desc: 'Check normal work and exceptions, then hand over instructions and training. Ongoing support is a separate choice.' },
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
  { question: 'What can you help us change?',
    answer: 'We build AI assistants and automations for repeat work: inquiries, follow-up, scheduling, customer records, research, draft preparation and marketing. We start with a specific job and check what your current software can already do.' },
  { question: 'Do we have to buy more software?',
    answer: 'We check your existing tools first. A native setting or clearer handoff may be enough. If a build needs another service, its cost and access requirements belong in the proposal before you decide.' },
  { question: 'Will our team still review the work?',
    answer: 'We agree which steps can run automatically and which need approval. Unclear inputs and exceptions need a named person and a fallback. You should know what the system can do and when it needs help.' },
  { question: 'What happens on the free call?',
    answer: 'The 30-minute call is a chance to describe one process, the tools involved and the part that gets stuck. We discuss whether advice, configuration or a build could help. It does not start paid work or commit you to a project.' },
  { question: 'Do you require a monthly retainer?',
    answer: 'No. Advice and builds are scoped as projects. You can choose ongoing help after a handoff, with its scope and cost agreed separately. Software subscriptions or usage charges may still apply where the project needs them.' },
  { question: 'Is NYClaw only for law firms?',
    answer: 'No. NYClaw is an AI and automation agency for small businesses in Westchester County and NYC, with remote work available. Our approved examples include an electrical contractor and a building and stone supplier. The law-firm Workflow Blueprint is one specialist assessment offer. NYClaw is not a law firm.' },
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
                  AI &amp; automation · Westchester County &amp; NYC
                </div>

                <h1 className="text-balance text-[clamp(2.75rem,6vw,3.75rem)] font-normal leading-[1.05] tracking-[-0.03em] text-white">
                  Keep work moving{' '}
                  <span className="text-gradient-ai">with less chasing.</span>
                </h1>

                <p className="mt-6 max-w-[28rem] text-balance text-lg leading-relaxed text-zinc-300">
                  There is plenty to do without typing the same details again. We build practical
                  AI and automation for follow-up, estimates and work that moves between tools.
                  Start with one job and the software you already use.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-2">
                  {/* Book directly or inspect a clearly labeled fictional workflow example. */}
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
                    href="#workflow-examples"
                    className="inline-flex h-12 items-center rounded-full px-5 text-base font-medium text-white outline outline-1 outline-white/[0.18] transition-colors hover:bg-white/5"
                  >
                    <span className="whitespace-nowrap">See workflow examples</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- What we are --- */}
      {/* AEO: a quotable, disambiguating definition near the top of the page.
          "NYClaw" reads phonetically like "law," which pulls AI-answer
          engines toward legal-AI products; this paragraph states plainly,
          in one place, what the company is and is not so a citing engine
          has an unambiguous sentence to quote. */}
      <section className="px-6 py-10">
        <div className="mx-auto max-w-[54rem]">
          <p className="text-balance text-center text-lg leading-relaxed text-zinc-300">
            <strong className="font-medium text-white">NYClaw.io is an AI automation agency</strong>
            {' '}for small businesses in Westchester County and NYC. We help connect the work
            between an inquiry, a decision and the next task. Advice, custom builds and
            marketing systems are scoped separately, with training and a written handoff.
          </p>
          <p className="mt-3 text-center text-sm text-zinc-400">
            Comparing options?{' '}
            <a
              href="/blog/ai-automation-agency-vs-ai-answering-service"
              className="underline decoration-white/30 underline-offset-2 hover:text-white"
            >
              AI automation agency vs. AI answering service
            </a>
          </p>
        </div>
      </section>

      <WorkflowExplorer />

      {/* ---------------------------------------------------------- Work --- */}
      <section id="work" className="px-6 pb-24">
        <div className="mx-auto flex max-w-[64rem] flex-col gap-12">
          <div className="flex max-w-[36rem] flex-col gap-6">
            <h2 className="text-balance text-[clamp(2rem,4vw,2.75rem)] font-medium leading-[1.12] tracking-[-0.025em] text-white">
              What we have built for local businesses
            </h2>
            <p className="text-[17px] leading-relaxed text-zinc-400">
              An electrical contractor’s estimating and invoicing process. A building supplier’s AI setup for detailed design work.
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
                <p className="border-t border-white/10 pt-4 text-[13px] text-zinc-400">
                  {item.footer}
                </p>
              </article>
            ))}

            <article className="panel flex flex-col justify-between gap-6 rounded-xl p-7">
              <div className="flex flex-col gap-3">
                <h3 className="text-lg font-medium tracking-[-0.01em] text-white">
                  What keeps landing back on your desk?
                </h3>
                <p className="text-sm leading-relaxed text-zinc-400">
                  Tell us about the last time it happened. We can talk through the current
                  process and whether a small change or a scoped build is worth considering.
                </p>
              </div>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-fit items-center gap-1 rounded-full bg-white px-4 text-sm font-medium text-zinc-950 transition-opacity hover:opacity-90"
              >
                Book a free call
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

      {/* ------------------------------------------------------ Services --- */}
      <section id="services" className="px-6 pb-24">
        <div className="mx-auto flex max-w-[64rem] flex-col gap-12">
          <div className="flex max-w-[36rem] flex-col gap-6">
            <h2 className="text-balance text-[clamp(2rem,4vw,2.75rem)] font-medium leading-[1.12] tracking-[-0.025em] text-white">
              What would you like to fix first?
            </h2>
            <p className="text-[17px] leading-relaxed text-zinc-400">
              You may need a useful AI assistant, a connected workflow or a better follow-up
              process. If you are unsure, start with a conversation before choosing a build.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {services.map(({ Icon, eyebrow, title, price, unit, desc, href, cta }) => (
              <Link
                key={title}
                href={href}
                className="panel panel-hover group flex flex-col gap-4 rounded-xl p-7"
              >
                <div className="flex items-center justify-between">
                  <Icon size={18} strokeWidth={1.75} className="text-zinc-300" aria-hidden="true" />
                  <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-400">
                    {eyebrow}
                  </span>
                </div>
                <h3 className="text-xl font-medium tracking-[-0.01em] text-white">{title}</h3>
                <div>
                  <span className="text-[30px] font-semibold tracking-[-0.03em] text-white">
                    {price}
                  </span>
                  <p className="mt-1 text-[13px] text-zinc-400">{unit}</p>
                </div>
                <p className="flex-1 text-sm leading-relaxed text-zinc-400">{desc}</p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-white">
                  {cta}
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
                Start with one job. Make the next step clear.
              </h2>
              <p className="text-[15px] leading-relaxed text-zinc-400">
                You bring the process you know. We bring the questions, the build and the tests.
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

      <WorkflowBlueprintOffer />

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
                Which part of the day keeps getting repeated?
              </h2>
              <p className="text-[15px] leading-relaxed text-zinc-400">
                Bring one example to a free 30-minute call. We will talk through the work,
                your current tools and a sensible next step. Paid work needs a separate agreement.
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
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
