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
    'NYClaw.io builds AI agents and automation systems for small businesses across New York City — Manhattan, Brooklyn, Queens, the Bronx, and Staten Island. Cut costs, automate operations, and compete without adding headcount. Free AI audit.',
  keywords:
    'AI agency NYC, AI automation new york city, AI consulting NYC small business, AI implementation NYC, small business AI new york, AI workflow automation manhattan, AI consulting brooklyn, AI marketing queens, NYC AI agency',
  openGraph: {
    title: 'AI Agency for NYC Small Businesses | NYClaw.io',
    description:
      'We build AI agents and automation systems for small businesses across all five boroughs. Cut costs 40%, automate operations 24/7, and compete without adding headcount.',
    url: 'https://nyclaw.io/locations/new-york-city',
    siteName: 'NYClaw.io',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Agency for NYC Small Businesses | NYClaw.io',
    description:
      'AI automation for small businesses across all five NYC boroughs. Free 15-min fit audit.',
  },
  alternates: {
    canonical: 'https://nyclaw.io/locations/new-york-city',
  },
}

const boroughs = [
  {
    name: 'Manhattan',
    areas: 'Midtown, Lower Manhattan, Upper East & West Side, Harlem, Washington Heights',
    focus: 'Professional services firms, boutique retail, restaurants, medical practices, and creative agencies competing in the most expensive commercial real estate market in the country.',
  },
  {
    name: 'Brooklyn',
    areas: 'Williamsburg, DUMBO, Park Slope, Bushwick, Bay Ridge, Flatbush',
    focus: 'Indie retail, co-working spaces, food and beverage, creative studios, e-commerce brands, and the growing tech-adjacent small business ecosystem.',
  },
  {
    name: 'Queens',
    areas: 'Astoria, Long Island City, Flushing, Jackson Heights, Forest Hills',
    focus: 'One of the most diverse business communities in the world — restaurants, import/export, healthcare providers, legal services, and family-run operations serving hyper-local neighborhoods.',
  },
  {
    name: 'The Bronx',
    areas: 'Fordham, Hunts Point, Riverdale, Mott Haven, City Island',
    focus: 'Food distribution, healthcare facilities, construction and contracting firms, community-serving businesses, and the growing South Bronx commercial corridor.',
  },
  {
    name: 'Staten Island',
    areas: 'St. George, Tottenville, New Dorp, Great Kills',
    focus: 'Home service contractors, medical offices, local retail, auto services, and small professional firms serving a tight-knit community market.',
  },
]

const industries = [
  {
    Icon: Building2,
    label: 'Real Estate',
    desc: 'NYC brokerages and property managers use AI to automate lead response, schedule showings, manage listings across platforms, and nurture buyer/renter pipelines — critical in a market where speed determines who closes the deal.',
  },
  {
    Icon: Scale,
    label: 'Legal Services',
    desc: 'Solo practitioners and small firms across NYC use AI to automate client intake, manage document workflows, track deadlines, and handle billing follow-ups — reclaiming 10+ hours per week of admin time.',
  },
  {
    Icon: Activity,
    label: 'Healthcare',
    desc: 'Medical, dental, and therapy practices use AI to manage patient scheduling, automate insurance follow-ups, reduce no-shows with smart reminders, and handle post-visit communications across multiple locations.',
  },
  {
    Icon: ShoppingBag,
    label: 'Retail & E-Commerce',
    desc: 'From SoHo storefronts to Astoria boutiques, retailers use AI for inventory management, personalized customer outreach, automated loyalty programs, and round-the-clock customer support via chat.',
  },
  {
    Icon: UtensilsCrossed,
    label: 'Restaurants & Hospitality',
    desc: 'NYC restaurants, bars, and hotels use AI to manage reservations, respond to reviews instantly, automate email and SMS marketing, optimize staffing patterns, and handle catering inquiries without tying up front-of-house staff.',
  },
  {
    Icon: Wrench,
    label: 'Contractors & Home Services',
    desc: 'Plumbers, electricians, HVAC techs, and renovation crews serving NYC buildings use AI to automate quote requests, dispatch scheduling, invoice follow-ups, and review generation — winning more jobs while spending less time on the phone.',
  },
]

const services = [
  {
    Icon: Settings2,
    title: 'Custom AI Agents & Automation',
    price: '$3,500–$8,000 agent sprint · project-based',
    desc: 'We map your operations, identify every task that is eating into your margins, and build AI systems that handle them 24/7 — scheduling, follow-ups, data entry, CRM updates, and more.',
    href: '/#services',
  },
  {
    Icon: Target,
    title: 'Fit Audit + Roadmap',
    price: 'Free 15-min fit · $1K–$2.5K roadmap',
    desc: 'We analyze your workflows, your competitive landscape, and your NYC-specific cost structure to deliver a prioritized AI roadmap with clear ROI projections.',
    href: '/#services',
  },
  {
    Icon: Megaphone,
    title: 'Marketing Automations',
    price: '$4K–$12K build · optional ops after',
    desc: 'Automated content production, lead generation funnels, email/SMS sequences, and multi-platform distribution — built to cut through NYC noise and reach your target customers.',
    href: '/#services',
  },
]

/** Figures are the live route's own — the strip only restyles them. */
const stats = [
  { raw: '40%', label: 'Avg. Cost Reduction' },
  { to: 30, label: 'Days to Deployment' },
  { raw: '24/7', label: 'Automated Operations' },
  { to: 5, label: 'Boroughs Served' },
]

const manualCosts = [
  'Full-time admin: $50K-$70K/year (salary + taxes + benefits)',
  'Part-time help: $16-$25/hour, still limited to business hours',
  'Overtime for busy periods: 1.5x hourly rate',
  'Turnover cost: 50-200% of annual salary to replace',
  'Training new hires: 2-4 weeks before full productivity',
  'Human error in data entry, scheduling, follow-ups',
]

const aiCosts = [
  'Agent sprint: $3,500–$8,000 project (vs. $50K+/year employee)',
  'Optional care after go-live — never required to start',
  'Runs 24/7/365 including weekends and holidays',
  'Zero turnover — AI does not quit, call in sick, or need PTO',
  'Sprint builds — productive from week one of go-live',
  'Consistent accuracy — no typos, no missed follow-ups',
]

const phases = [
  {
    step: 'Week 1',
    title: 'Observe & Orient',
    desc: 'We audit your NYC business operations — mapping every process, tool, and workflow. We analyze your competitive landscape, your borough-specific market dynamics, and your cost structure to identify the highest-ROI automation opportunities.',
  },
  {
    step: 'Weeks 2-3',
    title: 'Decide & Build',
    desc: 'We deliver a prioritized roadmap, then build and deploy your custom AI systems. Everything integrates with your existing tools — CRM, scheduling, email, POS, phone systems — so your team keeps working the way they already do.',
  },
  {
    step: 'Week 4',
    title: 'Optimize & Train',
    desc: 'We review performance data, fine-tune the AI systems for your specific customer patterns, and train your team. You get a fully operational setup and a clear path for continuous improvement as your NYC business grows.',
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
      'Most custom agent sprints run $3,500–$8,000 fixed scope. Multi-step workflow systems typically run $5,000–$15,000 as a project. Marketing automation builds start around $4,000–$12,000 with optional operation after go-live. Given that the average NYC employee costs $60,000–$90,000+ per year fully loaded, a well-scoped automation often pays for itself by recovering hours of manual work — without a monthly lock-in to start.',
  },
  {
    question: 'Which NYC industries benefit most from AI automation?',
    answer:
      'Any NYC business with repetitive operations benefits from AI, but we see the strongest ROI for real estate brokerages and property managers, law firms and solo practitioners, medical and dental practices, restaurants and hospitality venues, retail and e-commerce brands, and home service contractors. If your team spends hours each week on scheduling, client follow-ups, data entry, or customer communication, AI can likely cut that workload by 40% or more.',
  },
  {
    question: 'Do you work with businesses in all five NYC boroughs?',
    answer:
      'Yes. NYClaw.io serves small businesses across all five boroughs — Manhattan, Brooklyn, Queens, the Bronx, and Staten Island. We offer both in-person consultations and remote support. Our on-site business audits are available throughout the city, and our ongoing support and optimization is handled remotely so you get fast response times regardless of your location.',
  },
  {
    question: 'How does AI help NYC businesses deal with high labor costs?',
    answer:
      'NYC has some of the highest labor costs in the country — minimum wage is $16/hour and rising, and the true cost of an employee (wages + benefits + payroll taxes + overhead) often exceeds $25-$35/hour for entry-level roles. AI handles the tasks those employees spend the most time on: scheduling, follow-ups, data entry, customer inquiries, review management, and reporting. This does not mean replacing people — it means freeing them to do higher-value work while AI handles the repetitive operations 24/7.',
  },
  {
    question: 'How long does an AI build take for my NYC business?',
    answer:
      'Many first agents ship in a multi-day sprint once scope and access are clear. Larger multi-agent systems are project-scoped using the OODA Loop framework and integrate with your existing tools. Most NYC clients see measurable time savings within the first two weeks of go-live.',
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
        lede="Compete with the big players. Without their headcount."
        blurb="New York City is the most competitive small business market in the country. AI levels the playing field — automating operations, cutting costs, and giving you back the hours you need to grow. Deployed with custom agents and automations built for how you work."
        primary={{ label: 'Free 15-Min Fit Audit', href: CALENDLY_URL, external: true }}
        secondary={{ label: 'Start a Project →', href: '/#contact' }}
      />

      {/* The NYC Problem */}
      <section className="px-6 pb-24">
        <div className="mx-auto flex max-w-[44rem] flex-col gap-10">
          <SectionIntro
            eyebrow="The NYC Reality"
            title="Why NYC Small Businesses Need AI to Compete"
          />
          <div className="flex flex-col gap-5 text-[17px] leading-relaxed text-zinc-300">
            <p>
              New York City is home to more than 240,000 small businesses, making it the
              densest small business market in the United States. Whether you run a law firm
              in Midtown, a restaurant in Williamsburg, a medical practice in Flushing, or
              a contracting business in the Bronx, you are competing for customers against
              thousands of similar operations — many of which are already using AI to move
              faster, respond quicker, and operate leaner than you.
            </p>
            <p>
              The economics of running a small business in NYC are brutal. Commercial rent
              in Manhattan averages $70-$120 per square foot. The minimum wage is $16/hour
              and climbing. When you factor in benefits, payroll taxes, and overhead, a
              single full-time employee costs $50,000-$90,000 per year — often more. Every
              hour your team spends on scheduling, data entry, follow-ups, and admin is an
              hour they are not spending on revenue-generating work.
            </p>
            <p>
              AI does not replace your team. It eliminates the repetitive, low-value tasks
              that consume their day. A well-implemented AI system handles appointment
              booking, lead follow-up, customer communication, content generation, review
              management, and data entry — running 24/7, including weekends and holidays,
              without overtime pay. For a NYC small business, that is the difference between
              hiring another employee at $60K+ per year and deploying an AI system at a
              fraction of that cost.
            </p>
            <p>
              NYClaw.io builds AI systems specifically for the way NYC small businesses
              operate — fast-paced, margin-conscious, and customer-obsessed. We serve
              businesses across all five boroughs: Manhattan, Brooklyn, Queens, the Bronx,
              and Staten Island. No generic solutions. No bloated tech stacks. Just AI that
              works inside your existing tools and starts saving time from day one.
            </p>
          </div>
        </div>
      </section>

      {/* Cost Comparison */}
      <section className="px-6 pb-24">
        <div className="mx-auto flex max-w-[64rem] flex-col gap-10">
          <SectionIntro
            title="The NYC Labor Cost Reality"
            blurb="AI does not replace people — it replaces the tasks that drain their time and your margins."
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
                  Manual Operations (NYC Cost)
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
                  AI-Powered Operations (NYClaw.io)
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
            blurb="We serve small businesses across every borough — each with its own industries, challenges, and opportunities."
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
                Every NYC neighborhood has businesses that run on repetitive processes. We
                build AI that fits yours.
              </p>
              <Link
                href="/#contact"
                className="text-sm font-medium text-white underline underline-offset-4"
              >
                Tell us about your business &rarr;
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
            blurb="Every industry in New York City has processes that AI can automate — saving time, cutting costs, and improving the customer experience."
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
            title="Full-Service AI for NYC Small Businesses"
            blurb="From strategy to implementation to ongoing optimization."
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
            blurb="Our OODA Loop framework ensures fast, systematic implementation with measurable ROI — built for the pace of NYC."
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
        title="Ready to bring AI into your NYC business?"
        blurb="Book a free 15-minute fit audit. No pitch — just clarity on which agent or automation fits your business and how much it will save you in the most expensive market in the country."
      />

      <InternalLinks links={explore} />
    </>
  )
}
