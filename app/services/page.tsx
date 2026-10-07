// classification: PUBLIC
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Bot,
  Workflow,
  Target,
  Search,
  Plug,
  ShieldCheck,
  GraduationCap,
  FileText,
  Activity,
  ArrowRight,
} from 'lucide-react'
import CtaPanel from '../components/CtaPanel'
import WorkflowBlueprintOffer from '../components/WorkflowBlueprintOffer'
import WorkflowExplorer from '../components/WorkflowExplorer'
import { CALENDLY_URL, FREE_AUDIT_LABEL } from '../config'

export const metadata: Metadata = {
  title: 'AI and Automation Services for Small Businesses',
  description:
    'NYClaw.io is an AI agency for small businesses in Westchester County and NYC — custom AI agents and workflow automations, project-based, not a product install.',
  keywords:
    'AI agency services, custom AI agents, workflow automation, small business AI, Westchester, NYC AI agency',
  openGraph: {
    title: 'AI Agency Services | NYClaw.io',
    description:
      'Custom AI agents and workflow automations for small businesses in Westchester County and NYC.',
    url: 'https://nyclaw.io/services',
    siteName: 'NYClaw.io',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Agency Services | NYClaw.io',
    description:
      'Custom agents and automations — project-based builds for small businesses.',
  },
  alternates: {
    canonical: 'https://nyclaw.io/services',
  },
}

const services = [
  { Icon: Bot, badge: 'AI assistants', title: 'Give a recurring job a useful assistant',
    tagline: 'Research, sorting and draft preparation with review.',
    description: 'Choose one job and the approved tools it needs. Define which outputs your team checks and where an unclear request goes.',
    pricing: '$3.5K–8K per agent sprint · ongoing care optional', href: '/services/ai-automation', cta: 'See assistant builds' },
  { Icon: Workflow, badge: 'Connected workflows', title: 'Move the work between your tools',
    tagline: 'Less retyping. A clearer handoff.',
    description: 'Connect the form, customer record, calendar or invoice. Agree the source of each detail and who handles an exception.',
    pricing: '$5K–15K project · 2–3 connected automations', href: '/services/ai-automation', cta: 'See workflow builds' },
  { Icon: Activity, badge: 'Marketing & follow-up', title: 'Give inquiries a clearer path to a reply',
    tagline: 'An intake and follow-up process your team can check.',
    description: 'Build the content, inquiry and follow-up system around how people become customers. Set approval rules and measure the handoffs.',
    pricing: '$4K–12K marketing system build · operation optional', href: '/services/ai-marketing', cta: 'See marketing systems' },
  { Icon: Target, badge: 'Advice & planning', title: 'Decide what is worth changing',
    tagline: 'Check the current tools before paying for a build.',
    description: 'Start with a free conversation about one process. If you need a deeper plan, agree a written roadmap with assumptions, costs and a sensible order of work.',
    pricing: 'Free 30-minute call · $1K–2.5K written roadmap', href: '/services/ai-consulting', cta: 'See advice & roadmaps' },
]

const includes = [
  {
    Icon: Search,
    title: 'Workflow design',
    desc: 'The process mapped, the success metric agreed before anything is built.',
  },
  {
    Icon: Plug,
    title: 'Integrations',
    desc: 'Check access and software limits before connecting the tools agreed in the scope.',
  },
  {
    Icon: ShieldCheck,
    title: 'Error handling',
    desc: 'Name the person who reviews unclear inputs, failed steps and unexpected results.',
  },
  {
    Icon: GraduationCap,
    title: 'Team training',
    desc: 'A working session so the people using it know what it does.',
  },
  {
    Icon: FileText,
    title: 'Runbook',
    desc: 'Written handoff: what it does, what to check, how to change it.',
  },
  {
    Icon: Activity,
    title: 'Optional care',
    desc: 'Monitoring and iteration after go-live, only if you want it.',
  },
]

export default function ServicesPage() {
  return (
    <>
      {/* ---------------------------------------------------------- Hero --- */}
      <section className="relative isolate overflow-hidden px-6 pb-20 pt-16">
        <div className="bloom-indigo pointer-events-none absolute -top-[14rem] -right-24 -z-10 h-[44rem] w-[44rem] rounded-full" />
        <div className="hero-grid pointer-events-none absolute inset-0 -z-10" />

        <div className="mx-auto max-w-[64rem]">
          <div className="mb-6 inline-flex h-7 items-center gap-2 rounded-full px-3 text-xs font-medium text-zinc-300 outline outline-1 outline-white/[0.12] [background:color-mix(in_oklab,#27272a_55%,#000)]">
            <span className="inline-block h-[5px] w-[5px] rounded-full bg-cyan-400" />
            Our services
          </div>

          <h1 className="max-w-[36rem] text-balance text-[clamp(2.5rem,5.5vw,3.5rem)] font-normal leading-[1.08] tracking-[-0.03em] text-white">
            Choose the work you want to make easier.
          </h1>

          <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-zinc-300">
            An inquiry to answer, a quote to prepare, a handoff to finish. Choose the problem
            first. We will check whether your current tools, a simpler process or a build can help.
          </p>
        </div>
      </section>

      <WorkflowExplorer />

      {/* ------------------------------------------------- Service cards --- */}
      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-[64rem] items-stretch gap-6 md:grid-cols-2">
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="panel panel-hover group flex flex-col gap-3 rounded-xl p-7"
            >
              <div className="flex items-center gap-2.5">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.07] text-white">
                  <service.Icon size={16} strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-400">
                  {service.badge}
                </span>
              </div>

              <h2 className="text-[21px] font-medium leading-tight tracking-[-0.02em] text-white">
                {service.title}
              </h2>
              <p className="text-sm font-medium text-zinc-300">{service.tagline}</p>
              <p className="flex-1 text-sm leading-relaxed text-zinc-400">{service.description}</p>
              <p className="border-t border-dashed border-white/15 pt-3.5 text-[13px] text-zinc-300">
                {service.pricing}
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-white">
                {service.cta}
                <ArrowRight
                  size={15}
                  strokeWidth={2}
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <WorkflowBlueprintOffer />

      {/* ---------------------------------------- What's always included --- */}
      <section className="px-6 pb-24">
        <div className="mx-auto flex max-w-[64rem] flex-col gap-12">
          <div className="flex max-w-[36rem] flex-col gap-5">
            <h2 className="text-balance text-[clamp(2rem,4vw,2.5rem)] font-medium leading-[1.15] tracking-[-0.025em] text-white">
              What to expect from a build
            </h2>
            <p className="text-[17px] leading-relaxed text-zinc-300">
              Before a build, agree the scope and how to test it. Your team should know what the
              system does, what it cannot decide and how to handle an exception.
            </p>
          </div>

          <div className="hairline-grid grid overflow-hidden rounded-sm border border-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {includes.map(({ Icon, title, desc }) => (
              <div key={title} className="flex flex-col gap-3 p-10">
                <div className="flex items-center gap-2">
                  <Icon size={16} strokeWidth={1.75} className="text-white" aria-hidden="true" />
                  <h3 className="text-sm font-medium text-white">{title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-zinc-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ Related reading --- */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-[64rem]">
          <p className="text-sm leading-relaxed text-zinc-400">
            Not sure whether you need a custom build or a simpler tool? Read{' '}
            <a
              href="/blog/ai-automation-agency-vs-ai-answering-service"
              className="text-zinc-300 underline decoration-white/30 underline-offset-2 hover:text-white"
            >
              AI automation agency vs. AI answering service
            </a>{' '}
            to see the difference before you buy either one.
          </p>
        </div>
      </section>

      {/* ----------------------------------------------------- CTA panel --- */}
      <CtaPanel
        title="Bring us the part that keeps getting repeated."
        blurb="Talk through one process and your current tools. The call is free; scope, price and timing for any paid work are agreed separately."
        primary={{ label: FREE_AUDIT_LABEL, href: CALENDLY_URL, external: true }}
        secondary={{ label: 'Tell us where work gets stuck', href: '/#contact' }}
      />
    </>
  )
}
