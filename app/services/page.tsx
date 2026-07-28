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
import { CALENDLY_URL, FREE_AUDIT_LABEL } from '../config'

export const metadata: Metadata = {
  title: 'AI Agency Services — Custom Agents & Automations',
  description:
    'NYClaw.io is an AI agency for small businesses in Westchester County and NYC. We design and build custom AI agents and workflow automations — project-based, not a product install.',
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
  {
    Icon: Bot,
    badge: 'Flagship',
    title: 'Custom AI Agents',
    tagline: 'Agents that do real work in your stack.',
    description:
      'We design and build agents for one mission-critical job — intake, lead response, scheduling, research, support triage — wired into the tools you already use. Not a stock template install.',
    pricing: '$3.5K–8K per agent sprint · no monthly required',
    href: '/services/ai-automation',
    cta: 'Learn about agents',
  },
  {
    Icon: Workflow,
    badge: 'Systems',
    title: 'Workflow Automation',
    tagline: 'Multi-step systems across your ops.',
    description:
      'End-to-end automations that move work between forms, CRMs, inboxes, calendars and invoices — so humans only touch exceptions. Scoped as a project, delivered with a runbook.',
    pricing: '$5K–15K project · 2–3 connected automations',
    href: '/services/ai-automation',
    cta: 'Learn about automation',
  },
  {
    Icon: Target,
    badge: 'Entry',
    title: 'Fit Audit + Roadmap',
    tagline: 'Know what to build first — and what to skip.',
    description:
      'Start with a free 15-minute fit call. Need a deeper plan? We deliver a prioritized automation roadmap with ROI and build order before you invest in a full system.',
    pricing: 'Free 15-min fit · $1K–2.5K full roadmap (optional)',
    href: '/services/ai-consulting',
    cta: 'Learn about strategy',
  },
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
    desc: 'CRM, email, calendar, SMS and web wired up by us, not left to you.',
  },
  {
    Icon: ShieldCheck,
    title: 'Error handling',
    desc: 'Exceptions surfaced to a human instead of failing silently.',
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
            AI agency services for small businesses
          </h1>

          <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-zinc-300">
            We design and build custom automations and agents — project-based, scoped to your
            workflows. Not a one-size product install.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------- Service cards --- */}
      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-[64rem] items-stretch gap-6 md:grid-cols-3">
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

      {/* ---------------------------------------- What's always included --- */}
      <section className="px-6 pb-24">
        <div className="mx-auto flex max-w-[64rem] flex-col gap-12">
          <div className="flex max-w-[36rem] flex-col gap-5">
            <h2 className="text-balance text-[clamp(2rem,4vw,2.5rem)] font-medium leading-[1.15] tracking-[-0.025em] text-white">
              What every engagement includes
            </h2>
            <p className="text-[17px] leading-relaxed text-zinc-300">
              Same shape whichever service you start with: one scoped system, wired into your
              tools, handed over with a runbook.
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

      {/* ----------------------------------------------------- CTA panel --- */}
      <CtaPanel
        title="Not sure where to start?"
        blurb="Book a free 15-minute fit audit. We'll name the #1 agent or automation worth building — or tell you if now isn't the time."
        primary={{ label: FREE_AUDIT_LABEL, href: CALENDLY_URL, external: true }}
        secondary={{ label: 'Send us the workflow', href: '/#contact' }}
      />
    </>
  )
}
