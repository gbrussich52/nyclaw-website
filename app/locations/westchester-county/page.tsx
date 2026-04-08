import type { Metadata } from 'next'
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
  Clock,
  ArrowRight,
} from 'lucide-react'
import { FAQJsonLd } from '../../components/JsonLd'

export const metadata: Metadata = {
  title: 'AI Implementation for Westchester County Businesses',
  description:
    'NYClaw.io delivers AI automation, consulting, and AI-powered marketing for small businesses across Westchester County, NY — White Plains, Yonkers, New Rochelle, Scarsdale, and beyond. Free AI audit available.',
  keywords:
    'AI agency westchester county, AI automation westchester NY, AI consulting westchester, AI implementation westchester, small business AI westchester county, AI workflow automation white plains, AI consulting yonkers, AI marketing new rochelle',
  openGraph: {
    title: 'AI Implementation for Westchester County Businesses | NYClaw.io',
    description:
      'We build AI agents and automation systems for small businesses across Westchester County. Cut costs 40%, automate operations 24/7, and scale without adding staff.',
    url: 'https://nyclaw.io/locations/westchester-county',
    siteName: 'NYClaw.io',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Implementation for Westchester County Businesses | NYClaw.io',
    description:
      'AI automation for small businesses across Westchester County, NY. Free AI audit available.',
  },
  alternates: {
    canonical: 'https://nyclaw.io/locations/westchester-county',
  },
}

const CheckIcon = () => (
  <Check className="w-4 h-4 text-sky-blue flex-shrink-0" strokeWidth={2.5} />
)

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
    color: 'bg-sky-blue/10 text-sky-blue',
    title: 'AI Workflow Automation',
    price: '$1,500-$4,000 setup + $199-$499/mo',
    desc: 'We map your operations, identify every repetitive task, and build AI systems that handle them 24/7 — scheduling, follow-ups, data entry, CRM updates, and more.',
    href: '/#services',
  },
  {
    Icon: Target,
    color: 'bg-navy/10 text-navy',
    title: 'AI Strategy & Consulting',
    price: '$500 flat-rate AI audit',
    desc: 'We spend time inside your business, analyze your workflows and competitive landscape, and deliver a prioritized AI roadmap with clear ROI projections.',
    href: '/#services',
  },
  {
    Icon: Megaphone,
    color: 'bg-dark-red/10 text-dark-red',
    title: 'AI-Powered Marketing',
    price: '$1,000-$3,000/mo or performance-based',
    desc: 'Automated content production, lead generation funnels, email/SMS sequences, and multi-platform distribution — all running on autopilot.',
    href: '/#services',
  },
]

const faqs = [
  {
    question: 'How much does AI cost for a Westchester County business?',
    answer:
      'NYClaw.io offers AI implementation starting at $1,500-$4,000 for workflow automation setup with $199-$499/month for ongoing maintenance. A full AI audit starts at $500 flat. AI-powered marketing runs $1,000-$3,000/month or performance-based pricing. The exact cost depends on the complexity of your operations and how many processes you want to automate. We always start with a free strategy call to scope the work before quoting.',
  },
  {
    question: 'What types of Westchester businesses benefit most from AI?',
    answer:
      'Any business with repetitive processes benefits from AI. In Westchester County, we see the strongest ROI for real estate agencies, law firms, medical and dental practices, retail shops, restaurants and hospitality venues, and home service contractors. If your team spends hours each week on scheduling, follow-ups, data entry, or customer communication, AI can likely cut that workload by 40% or more.',
  },
  {
    question: 'How long does it take to implement AI for my Westchester business?',
    answer:
      'NYClaw.io deploys AI systems within 30 days using the OODA Loop framework. Week 1 covers your business audit and AI opportunity mapping. Weeks 2-3 are for building, testing, and deploying. Week 4 is optimization and team training. Many clients see measurable time savings within the first two weeks of deployment.',
  },
  {
    question: 'Do I need technical staff to maintain the AI systems?',
    answer:
      'No. We build and maintain the AI systems for you. Every deployment includes team training so your staff knows how to work alongside the AI, but the technical management, monitoring, and optimization is handled by NYClaw.io. Our maintenance plans ($199-$499/mo) cover updates, troubleshooting, and continuous improvement.',
  },
  {
    question: 'Can I meet with NYClaw.io in person in Westchester County?',
    answer:
      'Yes. NYClaw.io is based in Westchester County, NY. We offer in-person consultations, on-site business audits, and face-to-face strategy sessions across the county — from White Plains and Yonkers to Scarsdale, Tarrytown, and everywhere in between. We also work with clients remotely for ongoing support and optimization.',
  },
]

export default function WestchesterCountyPage() {
  return (
    <div className="min-h-screen bg-white">
      <FAQJsonLd items={faqs} />

      {/* Hero */}
      <section className="gradient-navy-sky text-white py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-10 right-10 w-40 h-40 rounded-full border-2 border-sky-blue animate-pulse" />
          <div
            className="absolute bottom-10 left-10 w-32 h-32 rounded-full border-2 border-dark-red animate-pulse"
            style={{ animationDelay: '1s' }}
          />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="mb-5 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5">
            <MapPin className="w-3.5 h-3.5 text-white/90" />
            <span className="text-xs font-semibold text-white/90 tracking-wide">
              Serving Westchester County, NY
            </span>
          </div>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-5"
            style={{ lineHeight: 1.15 }}
          >
            AI Implementation for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-blue to-white inline-block pb-2">
              Westchester County Businesses
            </span>
          </h1>
          <p className="text-xl font-semibold text-white mb-5">
            Local expertise. Proven AI systems. Measurable results.
          </p>
          <p className="text-lg text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed">
            From White Plains to Tarrytown, Westchester businesses are using AI to cut
            costs, automate operations, and outpace their competition. We build the systems
            that make it happen — in 30 days or less.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://calendly.com/nyclaw-io-proton/30min"
              className="btn-red text-lg px-8 py-4"
            >
              Book a Free Strategy Call
            </a>
            <a
              href="/#contact"
              className="px-8 py-4 bg-white/10 text-white font-bold rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/30 inline-block"
            >
              Get a Free AI Audit &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* Why Westchester Needs AI */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-dark-red uppercase tracking-widest block mb-3">
              The Local Landscape
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">
              Why Westchester County Businesses Need AI Now
            </h2>
          </div>
          <div className="prose prose-lg max-w-none text-charcoal/80 leading-relaxed space-y-5">
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
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-navy mb-3">
              Serving Businesses Across Westchester County
            </h2>
            <p className="text-charcoal/70">
              On-site consultations and in-person strategy sessions available countywide.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {towns.map((town) => (
              <div
                key={town}
                className="text-center py-5 px-3 bg-white rounded-2xl border border-gray-100 hover:border-sky-blue hover:bg-sky-blue/5 transition-all duration-300"
              >
                <MapPin className="w-5 h-5 text-sky-blue mx-auto mb-2" strokeWidth={1.5} />
                <p className="text-sm font-semibold text-navy">{town}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-6 text-charcoal/60 text-sm">
            Plus every community in between.{' '}
            <a
              href="/#contact"
              className="text-sky-blue font-semibold hover:underline underline-offset-4"
            >
              Contact us
            </a>{' '}
            to discuss your location.
          </p>
        </div>
      </section>

      {/* Industries */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-sky-blue uppercase tracking-widest block mb-3">
              Industries We Serve
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">
              AI Solutions for Westchester&apos;s Key Industries
            </h2>
            <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
              Every industry has repetitive processes that drain time and money. Here is how
              AI transforms the industries that power Westchester County.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map(({ Icon, label, desc }) => (
              <div
                key={label}
                className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-sky-blue hover:shadow-lg transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-navy/5 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-navy" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-bold text-navy mb-2">{label}</h3>
                <p className="text-sm text-charcoal/70 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-sky-blue uppercase tracking-widest block mb-3">
              What We Offer
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">
              Full-Service AI for Westchester Businesses
            </h2>
            <p className="text-lg text-charcoal/70">
              From strategy to implementation to ongoing optimization — all delivered
              locally.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map(({ Icon, color, title, price, desc, href }) => (
              <a
                key={title}
                href={href}
                className="card-hover flex flex-col group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-10 h-10 rounded-xl ${color.split(' ')[0]} flex items-center justify-center flex-shrink-0`}
                  >
                    <Icon className={`w-5 h-5 ${color.split(' ')[1]}`} strokeWidth={1.5} />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-navy mb-1">{title}</h3>
                <p className="text-sky-blue font-bold text-sm mb-4">{price}</p>
                <p className="text-sm text-charcoal/70 leading-relaxed flex-1">{desc}</p>
                <span className="mt-4 text-sky-blue font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn more <ArrowRight className="w-4 h-4" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: '40%', label: 'Avg. Cost Reduction' },
              { number: '30', label: 'Days to Deployment' },
              { number: '24/7', label: 'Automated Operations' },
              { number: 'Local', label: 'Westchester-Based Team' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="text-center py-8 px-4 bg-gradient-to-b from-sky-blue/5 to-white rounded-2xl border border-sky-blue/10"
              >
                <div className="text-4xl sm:text-5xl font-extrabold text-sky-blue mb-2 leading-none">
                  {stat.number}
                </div>
                <div className="text-sm font-semibold text-charcoal/70 uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-sky-blue uppercase tracking-widest block mb-3">
              Our Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">
              From Audit to Live AI in 30 Days
            </h2>
            <p className="text-lg text-charcoal/70">
              Our OODA Loop framework ensures fast, systematic implementation with
              measurable ROI.
            </p>
          </div>
          <div className="space-y-6">
            {[
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
            ].map((phase, i) => (
              <div
                key={i}
                className="flex gap-6 items-start bg-white rounded-2xl p-6 border border-gray-100"
              >
                <div className="w-12 h-12 rounded-full bg-sky-blue text-white flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-md shadow-sky-blue/30">
                  {i + 1}
                </div>
                <div>
                  <p className="text-xs font-bold text-sky-blue uppercase tracking-wider mb-1">
                    {phase.step}
                  </p>
                  <h3 className="text-lg font-bold text-navy mb-2">{phase.title}</h3>
                  <p className="text-sm text-charcoal/70 leading-relaxed">{phase.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-charcoal/70">
              Common questions about AI implementation for Westchester County businesses.
            </p>
          </div>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question} className="border-b border-gray-100 pb-6">
                <h3 className="text-lg font-bold text-navy mb-3">{faq.question}</h3>
                <p className="text-charcoal/70 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy text-white py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-dark-red font-bold uppercase tracking-widest text-sm mb-4">
            Westchester County, NY
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 leading-tight">
            Ready to bring AI into your business?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-xl mx-auto">
            Book a free 30-minute strategy call. No pitch — just clarity on where AI fits
            your Westchester business and what it will cost.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://calendly.com/nyclaw-io-proton/30min"
              className="btn-red inline-block px-10 py-4 text-lg"
            >
              Book a Free Strategy Call
            </a>
            <a
              href="/#contact"
              className="px-10 py-4 bg-white/10 text-white font-bold rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/30 inline-block text-lg"
            >
              Get a Free AI Audit &rarr;
            </a>
          </div>
          <p className="mt-8 text-gray-400 text-sm">
            Or email us directly at{' '}
            <a
              href="mailto:hello@nyclaw.io"
              className="text-sky-blue hover:underline underline-offset-4"
            >
              hello@nyclaw.io
            </a>
          </p>
        </div>
      </section>

      {/* Internal Links */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-charcoal/60 mb-4">Explore more from NYClaw.io</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/"
              className="text-sm font-semibold text-sky-blue hover:underline underline-offset-4"
            >
              Homepage
            </a>
            <span className="text-charcoal/30">|</span>
            <a
              href="/locations/new-york-city"
              className="text-sm font-semibold text-sky-blue hover:underline underline-offset-4"
            >
              AI for NYC Businesses
            </a>
            <span className="text-charcoal/30">|</span>
            <a
              href="/knowledge"
              className="text-sm font-semibold text-sky-blue hover:underline underline-offset-4"
            >
              Knowledge Base
            </a>
            <span className="text-charcoal/30">|</span>
            <a
              href="/resources"
              className="text-sm font-semibold text-sky-blue hover:underline underline-offset-4"
            >
              Free AI Readiness Guide
            </a>
            <span className="text-charcoal/30">|</span>
            <a
              href="/blog"
              className="text-sm font-semibold text-sky-blue hover:underline underline-offset-4"
            >
              Blog
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
