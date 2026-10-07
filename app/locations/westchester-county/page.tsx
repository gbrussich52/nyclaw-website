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
import { FAQJsonLd } from '../../components/JsonLd'
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
  title: 'AI Agency for Westchester County Businesses',
  description:
    'NYClaw.io helps Westchester County small businesses connect inquiries, follow-ups and job records with scoped AI and workflow automation. Free 30-minute call.',
  keywords:
    'AI agency westchester county, AI automation westchester NY, AI consulting westchester, AI implementation westchester, small business AI westchester county, AI workflow automation white plains, AI consulting yonkers, AI marketing new rochelle',
  openGraph: {
    title: 'AI Agency for Westchester County Businesses | NYClaw.io',
    description:
      'We help Westchester teams improve handoffs between inquiries, customer updates and job records, with human review and tested delivery.',
    url: 'https://nyclaw.io/locations/westchester-county',
    siteName: 'NYClaw.io',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Agency for Westchester County Businesses | NYClaw.io',
    description:
      'Practical AI and workflow automation for small businesses across Westchester County, NY. Start with a free 30-minute call.',
  },
  alternates: {
    canonical: 'https://nyclaw.io/locations/westchester-county',
  },
}

const industries = [
  {
    Icon: Building2,
    label: 'Real Estate',
    desc: 'A real estate team could route an inquiry, prepare a showing reply and update the property record, with a person reviewing exceptions.',
  },
  {
    Icon: Scale,
    label: 'Legal Services',
    desc: 'A law firm could turn intake details into a staff checklist or draft a missing-document reminder. Staff retain conflict checks, case acceptance and approval.',
  },
  {
    Icon: Activity,
    label: 'Healthcare',
    desc: 'A practice could review appointment requests, draft reminders and route insurance questions to staff, subject to its privacy and approval requirements.',
  },
  {
    Icon: ShoppingBag,
    label: 'Retail',
    desc: 'A retailer could bring stock questions, online inquiries and follow-up tasks into a workflow with a clear owner.',
  },
  {
    Icon: UtensilsCrossed,
    label: 'Hospitality',
    desc: 'A restaurant or venue could route event inquiries, prepare a response and flag booking changes for staff.',
  },
  {
    Icon: Wrench,
    label: 'Contractors',
    desc: 'A contractor could connect a quote request to the job record and invoice draft, then review changes before anything is sent.',
  },
]

const towns = [
  'White Plains',
  'Yonkers',
  'New Rochelle',
  'Scarsdale',
  'Tarrytown',
  'Mount Vernon',
  'Bronxville',
  'Rye',
  'Larchmont',
  'Mamaroneck',
]

const services = [
  {
    Icon: Settings2,
    title: 'Custom AI Agents & Automation',
    price: '$3,500–$8,000 agent sprint · project-based',
    desc: 'We trace an agreed workflow, check what your tools already do, then scope the missing handoffs and human review points.',
    href: '/#services',
  },
  {
    Icon: Target,
    title: 'Fit Audit + Roadmap',
    price: 'Free 30-min fit · $1K–$2.5K roadmap',
    desc: 'The free call starts with one stuck workflow. An optional paid roadmap records options, estimated costs and the assumptions behind a build order.',
    href: '/#services',
  },
  {
    Icon: Megaphone,
    title: 'Marketing Automations',
    price: '$4K–$12K build · optional ops after',
    desc: 'Scope an inquiry, follow-up or content-review workflow with a clear owner and a way to check actual results.',
    href: '/#services',
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
    title: 'Trace one workflow',
    desc: 'Show us where an inquiry, customer update or job detail gets stuck. We check native tool features and agree who reviews exceptions.',
  },
  {
    step: 'Build',
    title: 'Agree and connect',
    desc: 'A written quote names the tools, handoffs, price and delivery timing. We build only the connections included in that scope.',
  },
  {
    step: 'Handoff',
    title: 'Test and train',
    desc: 'We test agreed examples with your team, document how to handle exceptions and leave a runbook. Actual results can then be checked against the starting baseline.',
  },
]

const explore = [
  { label: 'Homepage', href: '/' },
  { label: 'AI for NYC Businesses', href: '/locations/new-york-city' },
  { label: 'Knowledge Base', href: '/knowledge' },
  { label: 'Free AI Readiness Guide', href: '/resources' },
  { label: 'Blog', href: '/blog' },
]

const faqs = [
  {
    question: 'How much does AI cost for a Westchester County business?',
    answer:
      'Agent sprints are listed at $3,500–$8,000, workflow systems at $5,000–$15,000 and marketing builds at $4,000–$12,000. The free 30-minute call starts the discussion; optional written roadmaps are $1,000–$2,500. We agree any paid scope and price before work begins.',
  },
  {
    question: 'Which Westchester teams might use workflow automation?',
    answer:
      'A team that repeatedly copies inquiry details, prepares follow-ups or moves job information between tools may have a useful starting point. We first check the current process, native features and human review needs. The industry examples on this page are possible workflows, not measured client results.',
  },
  {
    question: 'How long does an AI build take for my Westchester business?',
    answer:
      'Timing depends on the workflow, tool access and review requirements. We put the delivery plan in the written scope, test the agreed cases with your team and provide a documented handoff.',
  },
  {
    question: 'Do I need technical staff to maintain the AI systems?',
    answer:
      'Your team needs to show us the current work and review test cases. We leave a walkthrough and runbook for the scoped workflow. Ongoing monitoring and updates can be agreed separately after launch.',
  },
  {
    question: 'Can I meet with NYClaw.io in person in Westchester County?',
    answer:
      'NYClaw.io is based in Westchester County, NY. We can discuss an in-person meeting or remote review based on the workflow, location and scope.',
  },
]

export default function WestchesterCountyPage() {
  return (
    <>
      <FAQJsonLd items={faqs} />

      <LocationHero
        badge="Serving Westchester County, NY"
        titleTop="AI Agency for"
        titleAccent="Westchester County Businesses"
        lede="Keep the next customer request from getting lost."
        blurb="A small team may handle an inquiry in one tool and finish the job in another. We check the workflow, use native features where they fit and build scoped handoffs with human review."
        primary={{ label: 'Book a free 30-minute call', href: CALENDLY_URL, external: true }}
        secondary={{ label: 'Tell us where work gets stuck', href: '/#contact' }}
      />

      {/* A possible Westchester workflow problem, not a client result. */}
      <section className="px-6 pb-24">
        <div className="mx-auto flex max-w-[44rem] flex-col gap-10">
          <SectionIntro
            eyebrow="The Work Between Tools"
            title="A Clearer Handoff for Westchester County Businesses"
          />
          <div className="flex flex-col gap-5 text-[17px] leading-relaxed text-zinc-300">
            <p>
              A new request can arrive while your team is serving a customer or finishing a
              job. Someone still has to capture the details, assign a response and update
              the right record. That handoff may span a form, an inbox and a calendar.
            </p>
            <p>
              The same information may be typed again when a quote becomes a job and again
              when the job becomes an invoice. A practical workflow starts by finding where
              the information lives and who should check it before the next step.
            </p>
            <p>
              We check the features your current tools offer before proposing a new build.
              Where a connection is needed, the scope names the input, output, owner and
              exception path. A person stays responsible for uncertain or sensitive work.
            </p>
            <p>
              NYClaw.io is based in Westchester County. For a local or remote project,
              we agree the scope and price before
              building, test the handoff with your team and leave instructions for running
              it. Results can be compared with the starting baseline after launch.
            </p>
          </div>
        </div>
      </section>

      {/* Towns We Serve */}
      <section className="px-6 pb-24">
        <div className="mx-auto flex max-w-[64rem] flex-col gap-8">
          <SectionIntro
            title="Serving Businesses Across Westchester County"
            blurb="Discuss an in-person meeting or remote review for a specific workflow."
          />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {towns.map((town) => (
              <div
                key={town}
                className="panel panel-hover flex flex-col items-center gap-2.5 rounded-xl px-3 py-5"
              >
                <MapPin
                  size={17}
                  strokeWidth={1.75}
                  className="text-zinc-300"
                  aria-hidden="true"
                />
                <p className="text-center text-[13px] font-medium text-white">{town}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-zinc-400">
            Plus every community in between.{' '}
            <Link
              href="/#contact"
              className="font-medium text-white underline underline-offset-4"
            >
              Tell us where work gets stuck
            </Link>{' '}
            to discuss your location.
          </p>
        </div>
      </section>

      {/* Industries */}
      <section className="px-6 pb-24">
        <div className="mx-auto flex max-w-[64rem] flex-col gap-12">
          <SectionIntro
            eyebrow="Industries We Serve"
            title="AI Solutions for Westchester's Key Industries"
            blurb="These are possible workflows to examine with a team. What works depends on its tools, access and review requirements."
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
            title="AI and Workflow Automation for Westchester Businesses"
            blurb="Start with a free call, scope a build if useful and arrange ongoing care only when needed."
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
            title="From One Workflow to a Tested Handoff"
            blurb="The timeline depends on the systems and approvals involved. We agree it in writing before work starts."
          />
          <ProcessSteps items={phases} />
        </div>
      </section>

      <FaqSection
        blurb="Common questions about AI agency for Westchester County businesses."
        items={faqs}
      />

      <LocationCta
        eyebrow="Westchester County, NY"
        title="Which Westchester handoff needs a clearer next step?"
        blurb="Book a free 30-minute call to discuss the work, current tools and who reviews the result."
      />

      <InternalLinks links={explore} />
    </>
  )
}
