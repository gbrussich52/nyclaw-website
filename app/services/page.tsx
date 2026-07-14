import type { Metadata } from 'next'
import Link from 'next/link'
import { Bot, Workflow, Target, ArrowRight } from 'lucide-react'
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
    iconBg: 'bg-sky-blue/10',
    iconColor: 'text-sky-blue',
    badge: 'Flagship',
    badgeColor: 'text-sky-blue',
    title: 'Custom AI Agents',
    tagline: 'Agents that do real work in your stack.',
    description:
      'We design and build agents for one mission-critical job — intake, lead response, scheduling, research, support triage — wired into the tools you already use. Not a stock template install.',
    pricing: '$3.5K–8K per agent sprint · no monthly required',
    href: '/services/ai-automation',
    cta: 'Learn About Agents',
  },
  {
    Icon: Workflow,
    iconBg: 'bg-navy/10',
    iconColor: 'text-navy',
    badge: 'Systems',
    badgeColor: 'text-navy',
    title: 'Workflow Automation',
    tagline: 'Multi-step systems across your ops.',
    description:
      'End-to-end automations that move work between forms, CRMs, inboxes, calendars, and invoices — so humans only touch exceptions. Scoped as a project, delivered with a runbook.',
    pricing: '$5K–15K project · 2–3 connected automations',
    href: '/services/ai-automation',
    cta: 'Learn About Automation',
  },
  {
    Icon: Target,
    iconBg: 'bg-dark-red/10',
    iconColor: 'text-dark-red',
    badge: 'Entry',
    badgeColor: 'text-dark-red',
    title: 'Fit Audit + Roadmap',
    tagline: 'Know what to build first — and what to skip.',
    description:
      'Start with a free 15-minute fit call. Need a deeper plan? We deliver a prioritized automation roadmap with ROI and build order before you invest in a full system.',
    pricing: 'Free 15-min fit · $1K–2.5K full roadmap (optional)',
    href: '/services/ai-consulting',
    cta: 'Learn About Strategy',
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="gradient-navy-sky text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-bold text-sky-blue/80 uppercase tracking-widest block mb-3">
            Our Services
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold mb-5">
            AI Agency Services for Small Businesses
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed">
            We design and build custom automations and agents — project-based,
            scoped to your workflows. Not a one-size product install.
          </p>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="card-hover flex flex-col group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-10 h-10 rounded-xl ${service.iconBg} flex items-center justify-center flex-shrink-0`}
                  >
                    <service.Icon
                      className={`w-5 h-5 ${service.iconColor}`}
                      strokeWidth={1.5}
                    />
                  </div>
                  <span
                    className={`text-xs font-bold ${service.badgeColor} uppercase tracking-wider`}
                  >
                    {service.badge}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-navy mb-1">
                  {service.title}
                </h2>
                <p className="text-sky-blue font-bold mb-4 text-sm">
                  {service.tagline}
                </p>
                <p className="text-charcoal/80 text-sm mb-6 leading-relaxed flex-1">
                  {service.description}
                </p>
                <p className="text-sm font-bold text-navy mb-4">
                  {service.pricing}
                </p>
                <span className="text-sky-blue font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                  {service.cta}{' '}
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-navy text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Not sure where to start?</h2>
          <p className="text-gray-300 mb-8">
            Book a free 15-minute fit audit. We&apos;ll name the #1 agent or
            automation worth building — or tell you if now isn&apos;t the time.
          </p>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-red inline-block px-10 py-4 text-lg"
          >
            {FREE_AUDIT_LABEL} &rarr;
          </a>
        </div>
      </section>
    </div>
  )
}
