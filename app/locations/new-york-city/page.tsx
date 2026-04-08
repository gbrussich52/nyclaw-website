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
  ArrowRight,
  DollarSign,
  Users,
} from 'lucide-react'
import { FAQJsonLd } from '../../components/JsonLd'

export const metadata: Metadata = {
  title: 'AI Implementation for NYC Small Businesses',
  description:
    'NYClaw.io builds AI agents and automation systems for small businesses across New York City — Manhattan, Brooklyn, Queens, the Bronx, and Staten Island. Cut costs, automate operations, and compete without adding headcount. Free AI audit.',
  keywords:
    'AI agency NYC, AI automation new york city, AI consulting NYC small business, AI implementation NYC, small business AI new york, AI workflow automation manhattan, AI consulting brooklyn, AI marketing queens, NYC AI agency',
  openGraph: {
    title: 'AI Implementation for NYC Small Businesses | NYClaw.io',
    description:
      'We build AI agents and automation systems for small businesses across all five boroughs. Cut costs 40%, automate operations 24/7, and compete without adding headcount.',
    url: 'https://nyclaw.io/locations/new-york-city',
    siteName: 'NYClaw.io',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Implementation for NYC Small Businesses | NYClaw.io',
    description:
      'AI automation for small businesses across all five NYC boroughs. Free AI audit available.',
  },
  alternates: {
    canonical: 'https://nyclaw.io/locations/new-york-city',
  },
}

const CheckIcon = () => (
  <Check className="w-4 h-4 text-sky-blue flex-shrink-0" strokeWidth={2.5} />
)

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
    color: 'bg-sky-blue/10 text-sky-blue',
    title: 'AI Workflow Automation',
    price: '$1,500-$4,000 setup + $199-$499/mo',
    desc: 'We map your operations, identify every task that is eating into your margins, and build AI systems that handle them 24/7 — scheduling, follow-ups, data entry, CRM updates, and more.',
    href: '/#services',
  },
  {
    Icon: Target,
    color: 'bg-navy/10 text-navy',
    title: 'AI Strategy & Consulting',
    price: '$500 flat-rate AI audit',
    desc: 'We analyze your workflows, your competitive landscape, and your NYC-specific cost structure to deliver a prioritized AI roadmap with clear ROI projections.',
    href: '/#services',
  },
  {
    Icon: Megaphone,
    color: 'bg-dark-red/10 text-dark-red',
    title: 'AI-Powered Marketing',
    price: '$1,000-$3,000/mo or performance-based',
    desc: 'Automated content production, lead generation funnels, email/SMS sequences, and multi-platform distribution — built to cut through NYC noise and reach your target customers.',
    href: '/#services',
  },
]

const faqs = [
  {
    question: 'How much does AI implementation cost for a NYC small business?',
    answer:
      'NYClaw.io offers AI workflow automation starting at $1,500-$4,000 for setup with $199-$499/month for ongoing maintenance. A full AI business audit starts at $500 flat. AI-powered marketing runs $1,000-$3,000/month or performance-based pricing. Given that the average NYC employee costs $60,000-$90,000+ per year when you factor in wages, benefits, and payroll taxes, AI automation typically pays for itself within the first 2-3 months by replacing hours of manual work.',
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
    question: 'How long does it take to implement AI for my NYC business?',
    answer:
      'NYClaw.io deploys AI systems within 30 days using the OODA Loop framework. Week 1 is your business audit and AI opportunity mapping. Weeks 2-3 are for building, testing, and deploying custom AI systems integrated with your existing tools. Week 4 is performance optimization and team training. Many NYC clients see measurable time savings within the first two weeks of going live.',
  },
]

export default function NewYorkCityPage() {
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
              Serving All Five NYC Boroughs
            </span>
          </div>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-5"
            style={{ lineHeight: 1.15 }}
          >
            AI Implementation for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-blue to-white inline-block pb-2">
              NYC Small Businesses
            </span>
          </h1>
          <p className="text-xl font-semibold text-white mb-5">
            Compete with the big players. Without their headcount.
          </p>
          <p className="text-lg text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed">
            New York City is the most competitive small business market in the country. AI
            levels the playing field — automating operations, cutting costs, and giving you
            back the hours you need to grow. Deployed in 30 days or less.
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

      {/* The NYC Problem */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-dark-red uppercase tracking-widest block mb-3">
              The NYC Reality
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">
              Why NYC Small Businesses Need AI to Compete
            </h2>
          </div>
          <div className="prose prose-lg max-w-none text-charcoal/80 leading-relaxed space-y-5">
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
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-navy mb-3">
              The NYC Labor Cost Reality
            </h2>
            <p className="text-charcoal/70">
              AI does not replace people — it replaces the tasks that drain their time and
              your margins.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-red-50 border-2 border-red-100 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <DollarSign className="w-5 h-5 text-red-400" />
                <h3 className="text-xl font-bold text-charcoal">
                  Manual Operations (NYC Cost)
                </h3>
              </div>
              <ul className="space-y-4">
                {[
                  'Full-time admin: $50K-$70K/year (salary + taxes + benefits)',
                  'Part-time help: $16-$25/hour, still limited to business hours',
                  'Overtime for busy periods: 1.5x hourly rate',
                  'Turnover cost: 50-200% of annual salary to replace',
                  'Training new hires: 2-4 weeks before full productivity',
                  'Human error in data entry, scheduling, follow-ups',
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-charcoal/80 text-sm">
                    <span className="text-red-400 font-bold flex-shrink-0 mt-0.5">
                      &ndash;
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-sky-blue/5 border-2 border-sky-blue/30 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Settings2 className="w-5 h-5 text-sky-blue" />
                <h3 className="text-xl font-bold text-navy">
                  AI-Powered Operations (NYClaw.io)
                </h3>
              </div>
              <ul className="space-y-4">
                {[
                  'Setup: $1,500-$4,000 one-time (vs. $50K+/year employee)',
                  'Maintenance: $199-$499/month — predictable, no surprises',
                  'Runs 24/7/365 including weekends and holidays',
                  'Zero turnover — AI does not quit, call in sick, or need PTO',
                  'Deployed in 30 days, productive from week 2',
                  'Consistent accuracy — no typos, no missed follow-ups',
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-charcoal/80 text-sm">
                    <Check
                      className="w-4 h-4 text-sky-blue flex-shrink-0 mt-0.5"
                      strokeWidth={2.5}
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
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-sky-blue uppercase tracking-widest block mb-3">
              All Five Boroughs
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">
              AI for Every NYC Neighborhood
            </h2>
            <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
              We serve small businesses across every borough — each with its own industries,
              challenges, and opportunities.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {boroughs.map((borough) => (
              <div
                key={borough.name}
                className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-sky-blue hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <MapPin className="w-5 h-5 text-sky-blue" strokeWidth={1.5} />
                  <h3 className="text-lg font-bold text-navy">{borough.name}</h3>
                </div>
                <p className="text-xs text-sky-blue font-semibold mb-3">{borough.areas}</p>
                <p className="text-sm text-charcoal/70 leading-relaxed">{borough.focus}</p>
              </div>
            ))}
            {/* Extra card for reach */}
            <div className="bg-gradient-to-br from-sky-blue/5 to-navy/5 border-2 border-sky-blue/20 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
              <Users className="w-8 h-8 text-sky-blue mb-3" strokeWidth={1.5} />
              <h3 className="text-lg font-bold text-navy mb-2">Your Neighborhood</h3>
              <p className="text-sm text-charcoal/70 mb-4">
                Every NYC neighborhood has businesses that run on repetitive processes. We
                build AI that fits yours.
              </p>
              <a
                href="/#contact"
                className="text-sky-blue font-semibold text-sm hover:underline underline-offset-4"
              >
                Tell us about your business &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-sky-blue uppercase tracking-widest block mb-3">
              Industries We Serve
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">
              AI Solutions for NYC&apos;s Key Industries
            </h2>
            <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
              Every industry in New York City has processes that AI can automate — saving
              time, cutting costs, and improving the customer experience.
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
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-sky-blue uppercase tracking-widest block mb-3">
              What We Offer
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">
              Full-Service AI for NYC Small Businesses
            </h2>
            <p className="text-lg text-charcoal/70">
              From strategy to implementation to ongoing optimization.
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
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: '40%', label: 'Avg. Cost Reduction' },
              { number: '30', label: 'Days to Deployment' },
              { number: '24/7', label: 'Automated Operations' },
              { number: '5', label: 'Boroughs Served' },
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
      <section className="py-24 px-6 bg-white">
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
              measurable ROI — built for the pace of NYC.
            </p>
          </div>
          <div className="space-y-6">
            {[
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
            ].map((phase, i) => (
              <div
                key={i}
                className="flex gap-6 items-start bg-gray-50 rounded-2xl p-6 border border-gray-100"
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
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-charcoal/70">
              Common questions about AI implementation for NYC small businesses.
            </p>
          </div>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question} className="border-b border-gray-200 pb-6">
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
            New York City
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 leading-tight">
            Ready to bring AI into your NYC business?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-xl mx-auto">
            Book a free 30-minute strategy call. No pitch — just clarity on where AI fits
            your business and how much it will save you in the most expensive market in the
            country.
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
              href="/locations/westchester-county"
              className="text-sm font-semibold text-sky-blue hover:underline underline-offset-4"
            >
              AI for Westchester Businesses
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
