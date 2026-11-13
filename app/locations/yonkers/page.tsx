/* PUBLIC — NYClaw location page copy. */
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  MapPin,
  Building2,
  Scale,
  Activity,
  ShoppingBag,
  UtensilsCrossed,
  Wrench,
  Settings2,
  Target,
  Megaphone,
} from 'lucide-react'
import { BreadcrumbJsonLd, FAQJsonLd } from '../../components/JsonLd'
import StatStrip from '../../components/StatStrip'
import FaqSection from '../../components/FaqSection'
import LocationHero from '../_components/LocationHero'
import SectionIntro from '../_components/SectionIntro'
import ServiceCards from '../_components/ServiceCards'
import ProcessSteps from '../_components/ProcessSteps'
import LocationCta from '../_components/LocationCta'
import InternalLinks from '../_components/InternalLinks'
import { CALENDLY_URL } from '../../config'

export const metadata: Metadata = {
  // Claude Sonnet 5.5, 2026-11-13: layout adds ' | NYClaw.io', so the old title rendered at 64 chars. Now 49, same shape as White Plains.
  title: 'AI Automation & Consulting, Yonkers NY',
  description:
    'NYClaw.io uses AI automation to help Yonkers small businesses stop losing leads between the inbox, the calendar and the job record. Free 30-minute call.',
  keywords:
    'AI automation Yonkers, AI consulting Yonkers NY, AI for small business Yonkers, AI agency Yonkers, AI workflow automation Yonkers NY, small business AI Yonkers',
  openGraph: {
    title: 'AI Automation for Yonkers NY Businesses | NYClaw.io',
    description:
      'We help Yonkers teams catch every request, send the next reply and keep job records current, with a person checking the hard cases.',
    url: 'https://nyclaw.io/locations/yonkers',
    siteName: 'NYClaw.io',
    type: 'website',
    locale: 'en_US',
    images: ['https://nyclaw.io/opengraph-image'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Automation for Yonkers NY Businesses | NYClaw.io',
    description:
      'Practical AI and workflow automation for small businesses in Yonkers, NY. Start with a free 30-minute call.',
    images: ['https://nyclaw.io/opengraph-image'],
  },
  alternates: {
    canonical: 'https://nyclaw.io/locations/yonkers',
  },
}

const industries = [
  {
    Icon: Building2,
    label: 'Real Estate',
    desc: 'A Yonkers agent could log each new lead, draft a reply about a listing and book the showing, then check any odd request by hand.',
  },
  {
    Icon: Scale,
    label: 'Legal Services',
    desc: 'A Yonkers law office could turn a new client form into a staff checklist and draft a reminder for missing papers. Staff still run conflict checks and decide which cases to take.',
  },
  {
    Icon: Activity,
    label: 'Healthcare',
    desc: 'A practice could sort appointment requests, draft reminders and send insurance questions to the right person, within its own privacy rules.',
  },
  {
    Icon: ShoppingBag,
    label: 'Retail',
    desc: 'A shop on Central Park Avenue could gather stock questions and web orders in one place, with one person who owns each follow-up.',
  },
  {
    Icon: UtensilsCrossed,
    label: 'Hospitality',
    desc: 'A restaurant or event space could log party requests, draft a first reply and flag date changes for staff to confirm.',
  },
  {
    Icon: Wrench,
    label: 'Contractors',
    desc: 'A contractor could link a quote request to the job and the invoice draft, then check each change before it goes to the customer.',
  },
]

const nearby = [
  'Getty Square / Downtown',
  'Central Park Avenue',
  'Cross County',
  'Ridge Hill',
  'Nearby Mount Vernon & Bronxville',
  'Nearby Hastings-on-Hudson',
]

const services = [
  {
    Icon: Settings2,
    title: 'Custom AI Agents & Automation',
    price: '$3,500–$8,000 agent sprint · project-based',
    desc: 'We walk through one process you already run, see which steps your software already covers, and name only the gaps that still need a build and a person to review them.',
    href: '/services/ai-automation',
  },
  {
    Icon: Target,
    title: 'Fit Audit + Roadmap',
    price: 'Free 30-min fit · $1K–$2.5K roadmap',
    desc: 'Bring one stalled process to the free call. If you want a written plan after that, it lists the choices, rough costs and the reasons for a suggested order of work.',
    href: '/services/ai-consulting',
  },
  {
    Icon: Megaphone,
    title: 'Marketing Automations',
    price: '$4K–$12K build · optional ops after',
    desc: 'We can map how a new inquiry, a follow-up or a content check should move, who owns each step and how you will tell whether it is working.',
    href: '/services/ai-marketing',
  },
]

const stats = [
  { raw: 'Local', label: 'Westchester-Based' },
  { raw: 'Scope', label: 'Agreed Before Build' },
  { raw: 'Review', label: 'Human Exception Path' },
  { raw: 'Test', label: 'Handoffs Before Launch' },
]

const phases = [
  {
    step: 'Scope',
    title: 'Find the stuck step',
    desc: 'Point to the request, update or job note that stalls. We look at what your current software already offers and decide who should review the odd cases.',
  },
  {
    step: 'Build',
    title: 'Quote, then connect',
    desc: 'You get a written quote that lists the tools, the links between them, the price and when we will deliver. We build nothing outside that list.',
  },
  {
    step: 'Handoff',
    title: 'Prove it, then hand it over',
    desc: 'Your team runs the agreed test cases with us. We write down how to handle odd cases and leave a runbook, so you can compare later results with how things worked at the start.',
  },
]

const explore = [
  { label: 'Homepage', href: '/' },
  { label: 'AI for Westchester Businesses', href: '/locations/westchester-county' },
  { label: 'AI for White Plains Businesses', href: '/locations/white-plains' },
  { label: 'AI for NYC Businesses', href: '/locations/new-york-city' },
  { label: 'AI Automation', href: '/services/ai-automation' },
  { label: 'AI Consulting', href: '/services/ai-consulting' },
]

const breadcrumbs = [
  { name: 'Home', url: 'https://nyclaw.io' },
  { name: 'Westchester County', url: 'https://nyclaw.io/locations/westchester-county' },
  { name: 'Yonkers', url: 'https://nyclaw.io/locations/yonkers' },
]

const faqs = [
  {
    question: 'How much does AI automation cost for a Yonkers business?',
    answer:
      'Listed prices are $3,500–$8,000 for an agent sprint, $5,000–$15,000 for a workflow system and $4,000–$12,000 for a marketing build. The opening 30-minute call has no charge. If you want a written roadmap, that work is $1,000–$2,500. No paid work starts until you have agreed the scope and the price.',
  },
  {
    question: 'Is AI worth it for a small business in Yonkers?',
    answer:
      'It can be if your team types the same details into more than one tool, or if new requests wait while everyone is busy. We look at the current steps and the tools you already pay for first. Some fixes need no new build at all. The examples on this page are possible workflows, not client results.',
  },
  {
    question: 'How long does an AI build take?',
    answer:
      'It depends on the workflow, access to your tools and who needs to sign off. The written scope sets the plan. We test the agreed cases with your team and hand over notes on how to run it.',
  },
  {
    question: 'Do I need technical staff to keep it running?',
    answer:
      'No. Your team shows us the current work and checks the test cases. We leave a walkthrough and a runbook for the scoped workflow. Ongoing care can be agreed on its own after launch.',
  },
  {
    question: 'Can I meet NYClaw.io in person in Yonkers?',
    answer:
      'NYClaw.io is a Westchester-based service-area practice. We meet clients in person when the work, place and scope call for it, or we can work remotely. We do not publish a storefront street address.',
  },
]

export default function YonkersPage() {
  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <FAQJsonLd items={faqs} />

      <LocationHero
        badge="Serving Yonkers, NY"
        titleTop="AI Automation for"
        titleAccent="Yonkers Businesses"
        lede="Let AI automation help your Yonkers team answer the next lead before it goes cold."
        blurb="A Yonkers team may take a request by phone, text or web form and track the job somewhere else. We map the steps, use what your tools already do and build only the missing links, with a person checking the hard cases."
        primary={{ label: 'Book a free 30-minute call', href: CALENDLY_URL, external: true }}
        secondary={{ label: 'Tell us where work gets stuck', href: '/#contact' }}
      />

      {/* A possible Yonkers workflow problem, not a client result. */}
      <section className="px-6 pb-24">
        <div className="mx-auto flex max-w-[44rem] flex-col gap-10">
          <SectionIntro
            eyebrow="Where Leads Slip"
            title="Fewer Dropped Requests for Yonkers Small Businesses"
          />
          <div className="flex flex-col gap-5 text-[17px] leading-relaxed text-zinc-300">
            <p>
              Most owners who look up AI automation in Yonkers have one plain problem: a new
              request comes in while the team is busy, and no one replies in time. The
              details sit in a voicemail, a text or a form until someone finds them.
            </p>
            <p>
              Then the same name, address and job notes get typed again into the calendar,
              the quote and the invoice. Good AI consulting for a Yonkers small business
              starts by finding each copy step and asking who should check the work before
              it moves on.
            </p>
            <p>
              We look at what your current tools can already do before we suggest a new
              build. If a link is needed, the scope names what goes in, what comes out, who
              owns it and what happens when something looks wrong. A person stays in charge
              of unclear or sensitive cases.
            </p>
            <p>
              NYClaw.io works with Yonkers and the rest of Westchester County. We agree the
              scope and price first, test the handoff with your team and leave written steps
              for running it. After launch you can compare results with where you started.
            </p>
          </div>
        </div>
      </section>

      {/* Areas around Yonkers */}
      <section className="px-6 pb-24">
        <div className="mx-auto flex max-w-[64rem] flex-col gap-8">
          <SectionIntro
            title="Working With Teams Across Yonkers"
            blurb="Ask about an in-person meeting or a remote review for one workflow."
          />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {nearby.map((area) => (
              <div
                key={area}
                className="panel panel-hover flex flex-col items-center gap-2.5 rounded-xl px-3 py-5"
              >
                <MapPin
                  size={17}
                  strokeWidth={1.75}
                  className="text-zinc-300"
                  aria-hidden="true"
                />
                <p className="text-center text-[13px] font-medium text-white">{area}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-zinc-400">
            Also serving the wider county — see{' '}
            <Link
              href="/locations/westchester-county"
              className="font-medium text-white underline underline-offset-4"
            >
              AI for Westchester County businesses
            </Link>
            , or{' '}
            <Link
              href="/locations/white-plains"
              className="font-medium text-white underline underline-offset-4"
            >
              AI for White Plains businesses
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Industries */}
      <section className="px-6 pb-24">
        <div className="mx-auto flex max-w-[64rem] flex-col gap-12">
          <SectionIntro
            eyebrow="Industries We Serve"
            title="AI Solutions for Yonkers Industries"
            blurb="These are workflows we might look at with a team. What works depends on its tools, access and who signs off."
          />
          <div className="hairline-grid grid overflow-hidden rounded-sm border border-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map(({ Icon, label, desc }) => (
              <div key={label} className="flex flex-col gap-3 p-9">
                <div className="flex items-center gap-2">
                  <Icon
                    size={16}
                    strokeWidth={1.75}
                    className="text-white"
                    aria-hidden="true"
                  />
                  <h3 className="text-sm font-medium text-white">{label}</h3>
                </div>
                <p className="text-sm leading-relaxed text-zinc-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="px-6 pb-24">
        <div className="mx-auto flex max-w-[64rem] flex-col gap-12">
          <SectionIntro
            eyebrow="What We Offer"
            title="AI and Workflow Automation for Yonkers Businesses"
            blurb="Begin with a free conversation, define a build only if it is useful, and add ongoing care later if you want it."
          />
          <ServiceCards items={services} />
        </div>
      </section>

      <StatStrip items={stats} />

      {/* How It Works */}
      <section className="px-6 pb-24">
        <div className="mx-auto flex max-w-[56rem] flex-col gap-10">
          <SectionIntro
            eyebrow="Our Process"
            title="One Stuck Process, Then a Checked Handoff"
            blurb="How long it takes depends on your tools and who must sign off. That timing is written down before we begin."
          />
          <ProcessSteps items={phases} />
        </div>
      </section>

      <FaqSection
        blurb="Common questions about AI automation and consulting for Yonkers businesses."
        items={faqs}
      />

      <LocationCta
        eyebrow="Yonkers, NY"
        title="Which Yonkers request keeps slipping through?"
        blurb="Book a free 30-minute call. Bring one stuck task, the tools you use and the name of who checks the result."
      />

      <InternalLinks links={explore} />
    </>
  )
}
