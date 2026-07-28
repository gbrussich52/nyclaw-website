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
    'NYClaw.io delivers AI automation, consulting, and AI-powered marketing for small businesses across Westchester County, NY — White Plains, Yonkers, New Rochelle, Scarsdale, and beyond. Free 15-min fit audit.',
  keywords:
    'AI agency westchester county, AI automation westchester NY, AI consulting westchester, AI implementation westchester, small business AI westchester county, AI workflow automation white plains, AI consulting yonkers, AI marketing new rochelle',
  openGraph: {
    title: 'AI Agency for Westchester County Businesses | NYClaw.io',
    description:
      'We build AI agents and automation systems for small businesses across Westchester County. Cut costs 40%, automate operations 24/7, and scale without adding staff.',
    url: 'https://nyclaw.io/locations/westchester-county',
    siteName: 'NYClaw.io',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Agency for Westchester County Businesses | NYClaw.io',
    description:
      'AI automation for small businesses across Westchester County, NY. Free 15-min fit audit.',
  },
  alternates: {
    canonical: 'https://nyclaw.io/locations/westchester-county',
  },
}

const industries = [
  {
    Icon: Building2,
    label: 'Real Estate',
    desc: 'Westchester has one of the most active real estate markets in the tri-state area. AI handles lead follow-up, appointment scheduling, listing updates, and client nurture sequences so agents close more deals with less admin work.',
  },
  {
    Icon: Scale,
    label: 'Legal Services',
    desc: 'Law firms in White Plains, New Rochelle, and across the county use AI to automate intake forms, manage document workflows, schedule consultations, and send deadline reminders — cutting hours of paralegal admin per week.',
  },
  {
    Icon: Activity,
    label: 'Healthcare',
    desc: 'Medical practices and dental offices use AI to automate patient scheduling, send appointment reminders, handle insurance pre-authorization follow-ups, and manage post-visit communications — reducing no-shows and front-desk overhead.',
  },
  {
    Icon: ShoppingBag,
    label: 'Retail',
    desc: 'From boutiques in Scarsdale to shops along Mamaroneck Avenue, retail businesses use AI to manage inventory alerts, automate loyalty programs, run targeted promotions, and handle customer inquiries around the clock.',
  },
  {
    Icon: UtensilsCrossed,
    label: 'Hospitality',
    desc: 'Restaurants, hotels, and event venues in Tarrytown, Rye, and throughout the county use AI to manage reservations, respond to online reviews, automate email marketing, and optimize staffing based on demand patterns.',
  },
  {
    Icon: Wrench,
    label: 'Contractors',
    desc: 'Plumbers, electricians, HVAC techs, and general contractors serving Westchester homes use AI to automate quote requests, schedule jobs, send follow-up invoices, and manage review generation — so they spend time on the job, not the phone.',
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
    desc: 'We map your operations, identify every repetitive task, and build AI systems that handle them 24/7 — scheduling, follow-ups, data entry, CRM updates, and more.',
    href: '/#services',
  },
  {
    Icon: Target,
    title: 'Fit Audit + Roadmap',
    price: 'Free 15-min fit · $1K–$2.5K roadmap',
    desc: 'We spend time inside your business, analyze your workflows and competitive landscape, and deliver a prioritized AI roadmap with clear ROI projections.',
    href: '/#services',
  },
  {
    Icon: Megaphone,
    title: 'Marketing Automations',
    price: '$4K–$12K build · optional ops after',
    desc: 'Automated content production, lead generation funnels, email/SMS sequences, and multi-platform distribution — all running on autopilot.',
    href: '/#services',
  },
]

/** Figures are the live route's own — the strip only restyles them. */
const stats = [
  { raw: '40%', label: 'Avg. Cost Reduction' },
  { to: 30, label: 'Days to Deployment' },
  { raw: '24/7', label: 'Automated Operations' },
  { raw: 'Local', label: 'Westchester-Based Team' },
]

const phases = [
  {
    step: 'Week 1',
    title: 'Observe & Orient',
    desc: 'We embed in your Westchester business — mapping every process, tool, and workflow. We analyze your competitive landscape and identify the highest-ROI automation opportunities specific to your industry and local market.',
  },
  {
    step: 'Weeks 2-3',
    title: 'Decide & Build',
    desc: 'We deliver a prioritized roadmap, then build and deploy your custom AI systems. Everything is integrated with your existing tools — CRM, scheduling, email, phone — so your team keeps working the way they already do.',
  },
  {
    step: 'Week 4',
    title: 'Optimize & Train',
    desc: 'We review performance data, fine-tune the AI systems, and train your team to work alongside them. You get a fully operational setup and a clear path for continuous improvement.',
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
      'Most custom agent sprints run $3,500–$8,000 fixed scope. Multi-step workflow systems typically run $5,000–$15,000 as a project. Marketing automation builds start around $4,000–$12,000 with optional operation after go-live. A free 15-minute fit audit scopes the work; full roadmaps run $1,000–$2,500. Monthly care is never required to start.',
  },
  {
    question: 'What types of Westchester businesses benefit most from AI?',
    answer:
      'Any business with repetitive processes benefits from AI. In Westchester County, we see the strongest ROI for real estate agencies, law firms, medical and dental practices, retail shops, restaurants and hospitality venues, and home service contractors. If your team spends hours each week on scheduling, follow-ups, data entry, or customer communication, AI can likely cut that workload by 40% or more.',
  },
  {
    question: 'How long does an AI build take for my Westchester business?',
    answer:
      'Many first agents ship in a multi-day sprint once scope and access are clear. Larger multi-agent systems are project-scoped using the OODA Loop framework (Observe → Orient → Decide → Act). Most clients see measurable time savings within the first two weeks of go-live.',
  },
  {
    question: 'Do I need technical staff to maintain the AI systems?',
    answer:
      'No. We design and build the agents and automations, train your team, and hand off a runbook. You can run the system yourself after go-live. Optional care plans cover monitoring and updates only if you want us to stay on — monthly is never required to start.',
  },
  {
    question: 'Can I meet with NYClaw.io in person in Westchester County?',
    answer:
      'Yes. NYClaw.io is based in Westchester County, NY. We offer in-person consultations, on-site business audits, and face-to-face strategy sessions across the county — from White Plains and Yonkers to Scarsdale, Tarrytown, and everywhere in between. We also work with clients remotely for ongoing support and optimization.',
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
        lede="Local expertise. Proven AI systems. Measurable results."
        blurb="From White Plains to Tarrytown, Westchester businesses are using AI to cut costs, automate operations, and outpace their competition. We build the systems that make it happen — with custom agents and automations built for how you work."
        primary={{ label: 'Free 15-Min Fit Audit', href: CALENDLY_URL, external: true }}
        secondary={{ label: 'Start a Project →', href: '/#contact' }}
      />

      {/* Why Westchester Needs AI */}
      <section className="px-6 pb-24">
        <div className="mx-auto flex max-w-[44rem] flex-col gap-10">
          <SectionIntro
            eyebrow="The Local Landscape"
            title="Why Westchester County Businesses Need AI Now"
          />
          <div className="flex flex-col gap-5 text-[17px] leading-relaxed text-zinc-300">
            <p>
              Westchester County is home to more than 30,000 small businesses. From the
              professional services firms clustered around White Plains and the retail
              corridors of Scarsdale and Bronxville to the restaurants and hospitality
              venues lining the waterfront in Tarrytown and Rye, local business owners face
              a common set of challenges: rising operating costs, tightening competition,
              and a labor market that gets harder to hire in every year.
            </p>
            <p>
              The median household income in Westchester County is among the highest in New
              York State — which means customers expect premium service, fast response
              times, and seamless experiences. Meeting those expectations with a small team
              is unsustainable without automation.
            </p>
            <p>
              AI is not a future possibility for Westchester businesses — it is a present
              competitive advantage. The businesses adopting AI today are responding to
              leads in seconds instead of hours, automating scheduling and follow-ups
              without adding staff, generating marketing content at scale, and making
              data-driven decisions that used to require expensive consultants.
            </p>
            <p>
              NYClaw.io is based right here in Westchester County. We understand the local
              market, we know the industries that power this region, and we build AI systems
              tailored to the way Westchester businesses actually operate — not generic
              solutions built for a Silicon Valley startup.
            </p>
          </div>
        </div>
      </section>

      {/* Towns We Serve */}
      <section className="px-6 pb-24">
        <div className="mx-auto flex max-w-[64rem] flex-col gap-8">
          <SectionIntro
            title="Serving Businesses Across Westchester County"
            blurb="On-site consultations and in-person strategy sessions available countywide."
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
              Contact us
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
            blurb="Every industry has repetitive processes that drain time and money. Here is how AI transforms the industries that power Westchester County."
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
            title="Full-Service AI for Westchester Businesses"
            blurb="From strategy to implementation to ongoing optimization — all delivered locally."
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
            title="From Audit to Live AI in 30 Days"
            blurb="Our OODA Loop framework ensures fast, systematic implementation with measurable ROI."
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
        title="Ready to bring AI into your business?"
        blurb="Book a free 15-minute fit audit. No pitch — just clarity on which agent or automation fits your Westchester business and what it will cost."
      />

      <InternalLinks links={explore} />
    </>
  )
}
