import type { Metadata } from 'next'
import Link from 'next/link'
import { Settings2, Target, Megaphone, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'AI Services for Small Businesses',
  description:
    'NYClaw.io provides AI services for small businesses in Westchester County and NYC. Workflow automation, strategy consulting, and AI-powered marketing — all under one roof.',
  keywords:
    'AI services small business, AI services westchester, small business AI automation, AI consulting NYC, AI marketing small business',
  openGraph: {
    title: 'AI Services for Small Businesses | NYClaw.io',
    description:
      'Workflow automation, strategy consulting, and AI-powered marketing for small businesses in Westchester County and NYC.',
    url: 'https://nyclaw.io/services',
    siteName: 'NYClaw.io',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Services for Small Businesses | NYClaw.io',
    description:
      'Full-service AI implementation for small businesses. Automation, consulting, and marketing.',
  },
  alternates: {
    canonical: 'https://nyclaw.io/services',
  },
}

const services = [
  {
    Icon: Settings2,
    iconBg: 'bg-sky-blue/10',
    iconColor: 'text-sky-blue',
    badge: 'Core Service',
    badgeColor: 'text-sky-blue',
    title: 'AI Workflow Automation',
    tagline: 'Stop doing $20/hour work.',
    description:
      'We map your workflows, identify automation opportunities, and implement AI systems that run 24/7 — without adding staff. From scheduling to CRM to follow-ups, your operations run on autopilot.',
    pricing: '$1.5K-4K setup · $199-499/mo',
    href: '/services/ai-automation',
    cta: 'Learn About Automation',
  },
  {
    Icon: Target,
    iconBg: 'bg-navy/10',
    iconColor: 'text-navy',
    badge: 'Strategy',
    badgeColor: 'text-navy',
    title: 'AI Strategy & Consulting',
    tagline: 'Know exactly where AI fits.',
    description:
      'We embed in your business, identify every AI opportunity, and deliver a prioritized roadmap with clear ROI projections. Start with a $500 flat-rate AI audit — no ongoing commitment required.',
    pricing: '$500 AI audit · Custom retainer',
    href: '/services/ai-consulting',
    cta: 'Learn About Consulting',
  },
  {
    Icon: Megaphone,
    iconBg: 'bg-dark-red/10',
    iconColor: 'text-dark-red',
    badge: 'Marketing',
    badgeColor: 'text-dark-red',
    title: 'AI-Powered Marketing',
    tagline: 'Generate leads without lifting a finger.',
    description:
      'We build AI content engines, lead generation funnels, and automated nurture sequences that work around the clock. Flat-rate or revenue share — you pick the model that works for you.',
    pricing: '$1K-3K/mo flat · Revenue share available',
    href: '/services/ai-marketing',
    cta: 'Learn About AI Marketing',
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="gradient-navy-sky text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-bold text-sky-blue/80 uppercase tracking-widest block mb-3">
            Our Services
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold mb-5">
            Full-Service AI for Small Businesses
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed">
            From strategy to implementation to ongoing optimization. We handle
            every step so you can focus on growing your business.
          </p>
        </div>
      </section>

      {/* Services Grid */}
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

      {/* CTA */}
      <section className="py-16 px-6 bg-navy text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Not sure where to start?</h2>
          <p className="text-gray-300 mb-8">
            Book a free 30-minute strategy call. We will tell you exactly where AI
            fits your business and what to prioritize first.
          </p>
          <Link href="/#contact" className="btn-red inline-block px-10 py-4 text-lg">
            Get a Free AI Audit &rarr;
          </Link>
        </div>
      </section>
    </div>
  )
}
