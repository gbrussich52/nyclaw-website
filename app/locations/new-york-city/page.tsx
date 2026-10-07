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
  Check,
  Minus,
  DollarSign,
  Users,
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
  title: 'AI Agency for NYC Small Businesses',
  description:
    "NYClaw.io builds scoped AI and workflow automations for small businesses across NYC's five boroughs, with human review, testing and a documented handoff.",
  keywords:
    'AI agency NYC, AI automation new york city, AI consulting NYC small business, AI implementation NYC, small business AI new york, AI workflow automation manhattan, AI consulting brooklyn, AI marketing queens, NYC AI agency',
  openGraph: {
    title: 'AI Agency for NYC Small Businesses | NYClaw.io',
    description:
      'We help NYC small businesses connect inquiries, follow-ups and job records. We check existing tools first, then scope and test the work.',
    url: 'https://nyclaw.io/locations/new-york-city',
    siteName: 'NYClaw.io',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Agency for NYC Small Businesses | NYClaw.io',
    description:
      'Practical AI and workflow automation for small businesses across all five NYC boroughs. Start with a free 30-minute call.',
  },
  alternates: {
    canonical: 'https://nyclaw.io/locations/new-york-city',
  },
}

const boroughs = [
  {
    name: 'Manhattan',
    areas: 'Midtown, Lower Manhattan, Upper East & West Side, Harlem, Washington Heights',
    focus: 'Professional firms, retailers, restaurants and creative teams may need a clearer handoff from inquiry to response or from job request to invoice.',
  },
  {
    name: 'Brooklyn',
    areas: 'Williamsburg, DUMBO, Park Slope, Bushwick, Bay Ridge, Flatbush',
    focus: 'Retailers, food businesses, creative studios and online shops may need help keeping customer requests and follow-ups in one place.',
  },
  {
    name: 'Queens',
    areas: 'Astoria, Long Island City, Flushing, Jackson Heights, Forest Hills',
    focus: 'Restaurants, professional offices and family businesses may benefit from clearer scheduling, inquiry routing and customer updates.',
  },
  {
    name: 'The Bronx',
    areas: 'Fordham, Hunts Point, Riverdale, Mott Haven, City Island',
    focus: 'Distribution, construction and community-serving teams may need cleaner handoffs between requests, job records and billing.',
  },
  {
    name: 'Staten Island',
    areas: 'St. George, Tottenville, New Dorp, Great Kills',
    focus: 'Contractors, offices, retailers and auto services may need a reliable way to assign inquiries and track the next step.',
  },
]

const industries = [
  {
    Icon: Building2,
    label: 'Real Estate',
    desc: 'A brokerage could route an inquiry, draft a showing reply and keep the property record current, with an agent reviewing each exception.',
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
    label: 'Retail & E-Commerce',
    desc: 'A retailer could bring stock questions, online inquiries and follow-up tasks into a workflow with a clear owner.',
  },
  {
    Icon: UtensilsCrossed,
    label: 'Restaurants & Hospitality',
    desc: 'A restaurant or venue could route catering inquiries, prepare a response and flag booking changes for the front desk.',
  },
  {
    Icon: Wrench,
    label: 'Contractors & Home Services',
    desc: 'A contractor could connect a quote request to the job record and invoice draft, then review changes before anything is sent.',
  },
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
  { raw: '5', label: 'NYC Boroughs' },
  { raw: 'Scope', label: 'Agreed Before Build' },
  { raw: 'Review', label: 'Human Exception Path' },
  { raw: 'Test', label: 'Handoffs Before Launch' },
]

const manualCosts = [
  'An inquiry arrives in one inbox while the job record sits elsewhere',
  'Staff copy details between forms, calendars and invoices',
  'A customer update waits because no one owns the next step',
  'Missing information is discovered late in the handoff',
  'A change gets lost between the office and the field',
  'The team cannot easily tell whether the process improved',
]

const aiCosts = [
  'Check native features and access before proposing a build',
  'Agree the scope, price and review points in writing',
  'Connect the specific handoffs included in that scope',
  'Refer missing information and exceptions to a person',
  'Test normal and exception cases with the team',
  'Leave a runbook and compare actual results with a baseline',
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
  { label: 'AI for Westchester Businesses', href: '/locations/westchester-county' },
  { label: 'Knowledge Base', href: '/knowledge' },
  { label: 'Free AI Readiness Guide', href: '/resources' },
  { label: 'Blog', href: '/blog' },
]

const faqs = [
  {
    question: 'How much does AI implementation cost for a NYC small business?',
    answer:
      'Agent sprints are listed at $3,500–$8,000, workflow systems at $5,000–$15,000 and marketing builds at $4,000–$12,000. The quote depends on the tools, access and review steps involved. We agree the scope and price before work begins; care after launch is optional.',
  },
  {
    question: 'Which NYC teams might use workflow automation?',
    answer:
      'A team that repeatedly copies inquiry details, prepares follow-ups or moves job information between tools may have a useful starting point. We first check the current process, native features and human review needs. The industry examples on this page are possible workflows, not measured client results.',
  },
  {
    question: 'Do you work with businesses in all five NYC boroughs?',
    answer:
      'Yes. NYClaw.io works with small businesses in Manhattan, Brooklyn, Queens, the Bronx and Staten Island. We can discuss whether an in-person visit or remote review makes sense for the scoped work.',
  },
  {
    question: 'How do you decide whether a workflow is worth changing?',
    answer:
      'We record how the current work moves, where people re-enter information and what a proposed change would cost. We check native features before custom code and agree a baseline so actual results can be measured after launch.',
  },
  {
    question: 'How long does an AI build take for my NYC business?',
    answer:
      'Timing depends on the workflow, tool access and review requirements. We put the delivery plan in the written scope, test the agreed cases with your team and provide a documented handoff.',
  },
]

export default function NewYorkCityPage() {
  return (
    <>
      <FAQJsonLd items={faqs} />

      <LocationHero
        badge="Serving All Five NYC Boroughs"
        titleTop="AI Agency for"
        titleAccent="NYC Small Businesses"
        lede="Keep the next customer request from getting lost."
        blurb="Across NYC, a small team may handle an inquiry in one tool and finish the job in another. We check the workflow, use native features where they fit and build scoped handoffs with human review."
        primary={{ label: 'Book a free 30-minute call', href: CALENDLY_URL, external: true }}
        secondary={{ label: 'Tell us where work gets stuck', href: '/#contact' }}
      />

      {/* A possible NYC workflow problem, not a client result. */}
      <section className="px-6 pb-24">
        <div className="mx-auto flex max-w-[44rem] flex-col gap-10">
          <SectionIntro
            eyebrow="The Work Between Tools"
            title="A Clearer Handoff for NYC Small Businesses"
          />
          <div className="flex flex-col gap-5 text-[17px] leading-relaxed text-zinc-300">
            <p>
              An inquiry can arrive while your team is serving a customer or finishing a job.
              Someone still has to capture the details, assign a response and update the right
              record. That handoff may span a form, an inbox and a calendar.
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
              NYClaw.io serves businesses across Manhattan, Brooklyn, Queens, the Bronx and
              Staten Island. We agree the scope and price before building, test the handoff
              with your team and leave instructions for running it. Results can be compared
              with the starting baseline after launch.
            </p>
          </div>
        </div>
      </section>

      {/* Workflow comparison */}
      <section className="px-6 pb-24">
        <div className="mx-auto flex max-w-[64rem] flex-col gap-10">
          <SectionIntro
            title="Where the handoff gets stuck"
            blurb="These are examples to examine with your team, followed by the checks a scoped build can include."
          />
          <div className="grid items-start gap-6 md:grid-cols-2">
            <div className="panel flex flex-col gap-6 rounded-2xl p-8">
              <div className="flex items-center gap-3">
                <DollarSign
                  size={18}
                  strokeWidth={1.75}
                  className="text-zinc-400"
                  aria-hidden="true"
                />
                <h3 className="text-base font-medium text-white">
                  A manual handoff might look like
                </h3>
              </div>
              <ul className="flex flex-col gap-3.5">
                {manualCosts.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-zinc-400">
                    <Minus
                      size={14}
                      strokeWidth={2.5}
                      aria-hidden="true"
                      className="mt-[4px] shrink-0 text-zinc-500"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="panel flex flex-col gap-6 rounded-2xl p-8 outline outline-1 outline-brand-blue/30">
              <div className="flex items-center gap-3">
                <Settings2
                  size={18}
                  strokeWidth={1.75}
                  className="text-white"
                  aria-hidden="true"
                />
                <h3 className="text-base font-medium text-white">
                  A scoped workflow can include
                </h3>
              </div>
              <ul className="flex flex-col gap-3.5">
                {aiCosts.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-zinc-300">
                    <Check
                      size={14}
                      strokeWidth={2.5}
                      aria-hidden="true"
                      className="mt-[4px] shrink-0 text-white"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Five Boroughs */}
      <section className="px-6 pb-24">
        <div className="mx-auto flex max-w-[64rem] flex-col gap-12">
          <SectionIntro
            eyebrow="All Five Boroughs"
            title="AI for Every NYC Neighborhood"
            blurb="We can discuss a specific handoff with teams in any of the five boroughs. These are example settings, not client results."
          />
          <div className="hairline-grid grid overflow-hidden rounded-sm border border-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {boroughs.map((borough) => (
              <div key={borough.name} className="flex flex-col gap-3 p-9">
                <div className="flex items-center gap-2">
                  <MapPin
                    size={16}
                    strokeWidth={1.75}
                    className="text-white"
                    aria-hidden="true"
                  />
                  <h3 className="text-sm font-medium text-white">{borough.name}</h3>
                </div>
                <p className="text-[13px] leading-relaxed text-zinc-300">{borough.areas}</p>
                <p className="text-sm leading-relaxed text-zinc-400">{borough.focus}</p>
              </div>
            ))}
            {/* Extra card for reach */}
            <div className="flex flex-col items-center justify-center gap-3 p-9 text-center">
              <Users size={20} strokeWidth={1.75} className="text-white" aria-hidden="true" />
              <h3 className="text-sm font-medium text-white">Your Neighborhood</h3>
              <p className="text-sm leading-relaxed text-zinc-400">
                Tell us which inquiry, customer update or job handoff needs a clearer next step.
              </p>
              <Link
                href="/#contact"
                className="text-sm font-medium text-white underline underline-offset-4"
              >
                Tell us where work gets stuck &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="px-6 pb-24">
        <div className="mx-auto flex max-w-[64rem] flex-col gap-12">
          <SectionIntro
            eyebrow="Industries We Serve"
            title="AI Solutions for NYC's Key Industries"
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
            title="AI and Workflow Automation for NYC Small Businesses"
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
        blurb="Common questions about AI agency for NYC small businesses."
        items={faqs}
      />

      <LocationCta
        eyebrow="New York City"
        title="Which NYC handoff needs a clearer next step?"
        blurb="Book a free 30-minute call to discuss the work, current tools and who reviews the result."
      />

      <InternalLinks links={explore} />
    </>
  )
}
