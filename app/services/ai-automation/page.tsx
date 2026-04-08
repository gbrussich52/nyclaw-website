import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Settings2,
  CalendarCheck,
  Users,
  Mail,
  Database,
  FileText,
  PhoneCall,
  BarChart2,
  Check,
  Building2,
  Scale,
  Activity,
  ShoppingBag,
  UtensilsCrossed,
  Wrench,
  ArrowRight,
} from 'lucide-react'
import { ServiceJsonLd, FAQJsonLd } from '../../components/JsonLd'

export const metadata: Metadata = {
  title: 'AI Workflow Automation for Small Businesses',
  description:
    'NYClaw.io builds AI workflow automation systems for small businesses in Westchester County and NYC. Automate scheduling, CRM, follow-ups, and data entry. Setup from $1,500. Deployed in 30 days.',
  keywords:
    'AI workflow automation small business, business process automation AI, AI automation westchester, automate scheduling AI, CRM automation small business, AI data entry automation',
  openGraph: {
    title: 'AI Workflow Automation for Small Businesses | NYClaw.io',
    description:
      'Automate scheduling, CRM, follow-ups, and data entry with AI. Setup from $1,500, deployed in 30 days.',
    url: 'https://nyclaw.io/services/ai-automation',
    siteName: 'NYClaw.io',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Workflow Automation | NYClaw.io',
    description:
      'Stop doing $20/hour work. AI workflow automation for small businesses — deployed in 30 days.',
  },
  alternates: {
    canonical: 'https://nyclaw.io/services/ai-automation',
  },
}

const CheckIcon = () => (
  <Check className="w-4 h-4 text-sky-blue flex-shrink-0 mt-0.5" strokeWidth={2.5} />
)

const automationAreas = [
  {
    Icon: CalendarCheck,
    title: 'Scheduling & Appointments',
    desc: 'AI-powered booking systems that handle availability, confirmations, reminders, and rescheduling — no human needed.',
  },
  {
    Icon: Users,
    title: 'CRM & Client Management',
    desc: 'Automatic lead capture, contact updates, deal stage tracking, and activity logging across your CRM.',
  },
  {
    Icon: Mail,
    title: 'Follow-Up Sequences',
    desc: 'Personalized email and SMS follow-ups triggered by client actions — sent at the right time, every time.',
  },
  {
    Icon: Database,
    title: 'Data Entry & Processing',
    desc: 'AI reads, categorizes, and enters data from forms, invoices, emails, and documents directly into your systems.',
  },
  {
    Icon: FileText,
    title: 'Document Generation',
    desc: 'Auto-generate proposals, invoices, contracts, and reports from templates using your live business data.',
  },
  {
    Icon: PhoneCall,
    title: 'Customer Communication',
    desc: 'AI chatbots and voicebots that answer common questions, route inquiries, and collect information 24/7.',
  },
]

const included = [
  'Full workflow audit and process mapping',
  'Custom AI automation build tailored to your business',
  'CRM integration (HubSpot, Salesforce, GoHighLevel, etc.)',
  'Email and calendar platform integration',
  'Scheduling system setup and configuration',
  'SMS and messaging automation',
  'Testing across all workflows end-to-end',
  'Team training and video walkthrough',
  'Documentation and runbook handoff',
  'Ongoing maintenance and optimization support',
]

const industries = [
  { Icon: Building2, label: 'Real Estate' },
  { Icon: Scale, label: 'Legal Services' },
  { Icon: Activity, label: 'Healthcare' },
  { Icon: ShoppingBag, label: 'Retail / E-Comm' },
  { Icon: UtensilsCrossed, label: 'Hospitality' },
  { Icon: Wrench, label: 'Contractors' },
]

const faqs = [
  {
    question: 'How much does AI workflow automation cost for a small business?',
    answer:
      'NYClaw.io offers AI workflow automation starting at $1,500-$4,000 for initial setup, depending on the number of workflows and integrations involved. Ongoing maintenance runs $199-$499 per month and includes monitoring, updates, and optimization. Most clients see a positive ROI within 60-90 days.',
  },
  {
    question: 'How long does it take to automate my business workflows with AI?',
    answer:
      'We deploy fully operational AI automation systems in 30 days using our OODA Loop framework. Week 1 is the business audit and workflow mapping. Weeks 2-3 are building and deploying the automations. Week 4 is optimization, testing, and team training. Simple automations (like scheduling) can go live in as little as 1 week.',
  },
  {
    question: 'What tools and platforms do you integrate with?',
    answer:
      'We integrate with the tools you already use: Google Workspace, Microsoft 365, HubSpot, Salesforce, GoHighLevel, Calendly, Acuity, QuickBooks, Slack, Twilio, and many more. If your tool has an API, we can connect it. No need to switch platforms.',
  },
  {
    question: 'Will AI automation replace my employees?',
    answer:
      'No — it replaces the repetitive tasks your employees hate doing. Data entry, scheduling, follow-up emails, form processing — those tasks get automated. Your team gets freed up to focus on high-value work: client relationships, strategy, and growth. Most businesses we work with keep the same team and get 2-3x more output.',
  },
  {
    question: 'What happens if something breaks or needs updating?',
    answer:
      'Our monthly maintenance plan covers exactly this. We monitor your automations continuously, fix issues proactively, and update integrations when platforms release changes. You also get direct access to our team for support requests. If something breaks at 2am, the system alerts us — not you.',
  },
  {
    question: 'Do I need any technical knowledge to use AI automation?',
    answer:
      'Zero. We handle the entire build, and we train your team on how to work with the new systems. Every automation comes with documentation and video walkthroughs. If your team can use email and a web browser, they can use the tools we build.',
  },
]

export default function AIAutomationPage() {
  return (
    <div className="min-h-screen bg-white">
      <ServiceJsonLd
        name="AI Workflow Automation for Small Businesses"
        description="Custom AI workflow automation systems for small businesses. Automate scheduling, CRM, follow-ups, data entry, and more. Setup from $1,500, deployed in 30 days."
        url="https://nyclaw.io/services/ai-automation"
      />
      <FAQJsonLd items={faqs} />

      {/* Hero */}
      <section className="gradient-navy-sky text-white py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
              backgroundSize: '80px 80px',
            }}
          />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white mb-6 transition-colors"
          >
            &larr; All Services
          </Link>
          <div className="mb-5 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5">
            <Settings2 className="w-3.5 h-3.5" strokeWidth={2} />
            <span className="text-xs font-semibold text-white/90 tracking-wide">
              Core Service
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-5" style={{ lineHeight: 1.15 }}>
            AI Workflow Automation
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-blue to-white inline-block pb-2">
              for Small Businesses
            </span>
          </h1>
          <p className="text-xl font-semibold text-white mb-3">
            Stop doing $20/hour work. Let AI handle it.
          </p>
          <p className="text-lg text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed">
            We map your workflows, find the bottlenecks, and build AI systems that
            handle scheduling, follow-ups, data entry, and customer communication —
            24/7, with zero manual effort.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#contact" className="btn-red text-lg px-8 py-4">
              Build My Automation &rarr;
            </Link>
            <Link
              href="#how-it-works"
              className="px-8 py-4 bg-white/10 text-white font-bold rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/30 inline-block"
            >
              See How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 px-6 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { number: '$1.5K', label: 'Starting Setup' },
            { number: '30', label: 'Days to Deploy' },
            { number: '40%', label: 'Avg. Cost Reduction' },
            { number: '24/7', label: 'Automated Ops' },
          ].map((stat) => (
            <div key={stat.label} className="text-center py-4">
              <div className="text-3xl font-extrabold text-sky-blue mb-1">{stat.number}</div>
              <div className="text-xs font-semibold text-charcoal/60 uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What We Automate */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-sky-blue uppercase tracking-widest block mb-3">
              Capabilities
            </span>
            <h2 className="text-4xl font-bold text-navy mb-4">What We Automate</h2>
            <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
              If your team does it more than once, we can probably automate it. Here are
              the most common workflows we build for small businesses.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {automationAreas.map(({ Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-sky-blue hover:shadow-lg transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-sky-blue/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-sky-blue" strokeWidth={1.5} />
                </div>
                <h3 className="text-base font-bold text-navy mb-2">{title}</h3>
                <p className="text-sm text-charcoal/70 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works — OODA Loop */}
      <section id="how-it-works" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-sky-blue uppercase tracking-widest block mb-3">
              Our Framework
            </span>
            <h2 className="text-4xl font-bold text-navy mb-4">
              How We Build Your Automation
            </h2>
            <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
              We use the OODA Loop — a military decision-making framework adapted for
              AI implementation. It keeps us fast, systematic, and focused on ROI.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                letter: 'O',
                label: 'Observe',
                color: 'bg-sky-blue',
                desc: 'We audit your business operations end-to-end. Every process, tool, and manual task gets documented. We identify exactly where time and money are being wasted.',
                timeline: 'Week 1',
              },
              {
                step: 2,
                letter: 'O',
                label: 'Orient',
                color: 'bg-navy',
                desc: 'We analyze your specific context — your industry, competitors, tools, and constraints — to identify the highest-ROI automation opportunities.',
                timeline: 'Week 1',
              },
              {
                step: 3,
                letter: 'D',
                label: 'Decide',
                color: 'bg-sky-blue',
                desc: 'We deliver a prioritized automation roadmap with exact costs, expected savings, and implementation timeline for each workflow.',
                timeline: 'Week 1-2',
              },
              {
                step: 4,
                letter: 'A',
                label: 'Act',
                color: 'bg-dark-red',
                desc: 'We build, test, deploy, and optimize your AI systems. You get fully operational automations, team training, and documentation.',
                timeline: 'Week 2-4',
              },
            ].map((phase) => (
              <div key={phase.step} className="flex flex-col items-center text-center">
                <div
                  className={`w-12 h-12 rounded-full ${phase.color} text-white flex items-center justify-center font-extrabold text-lg mb-4 shadow-lg`}
                >
                  {phase.letter}
                </div>
                <p className="text-xs font-bold text-sky-blue uppercase tracking-wider mb-1">
                  Step {phase.step} &middot; {phase.timeline}
                </p>
                <p className="text-lg font-bold text-navy mb-3">{phase.label}</p>
                <p className="text-sm text-charcoal/70 leading-relaxed">{phase.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-12 text-sky-blue font-bold">
            Then we loop — continuously monitoring, optimizing, and improving as your
            business evolves.
          </p>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-sky-blue uppercase tracking-widest block mb-3">
              Deliverables
            </span>
            <h2 className="text-4xl font-bold text-navy mb-4">
              What&apos;s Included in Every Build
            </h2>
            <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
              You get a complete, production-ready automation system — not a half-baked
              prototype. Here is exactly what ships.
            </p>
          </div>
          <div className="bg-white border-2 border-gray-100 rounded-2xl p-8">
            <div className="grid sm:grid-cols-2 gap-4">
              {included.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckIcon />
                  <span className="text-sm text-charcoal/80 leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-dark-red uppercase tracking-widest block mb-3">
              Pricing
            </span>
            <h2 className="text-4xl font-bold text-navy mb-4">
              Transparent, Predictable Pricing
            </h2>
            <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
              No hidden fees, no surprise invoices. You know what you are paying before
              we write a single line of code.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-sky-blue/5 border-2 border-sky-blue/20 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-navy mb-2">Setup</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-extrabold text-navy">$1,500&ndash;$4,000</span>
              </div>
              <p className="text-sm text-charcoal/70 mb-4">One-time investment. Covers audit, build, testing, and training.</p>
              <ul className="space-y-2">
                {[
                  'Full workflow audit and process mapping',
                  'Custom AI automation build',
                  'All integrations and testing',
                  'Team training and documentation',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-charcoal/80">
                    <CheckIcon /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-navy/5 border-2 border-navy/20 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-navy mb-2">Maintenance</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-extrabold text-sky-blue">$199&ndash;$499</span>
                <span className="text-charcoal/60">/month</span>
              </div>
              <p className="text-sm text-charcoal/70 mb-4">Ongoing. Keeps everything running, updated, and optimized.</p>
              <ul className="space-y-2">
                {[
                  '24/7 monitoring and alerting',
                  'Proactive issue resolution',
                  'Platform and integration updates',
                  'Monthly performance reporting',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-charcoal/80">
                    <CheckIcon /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-center mt-8 text-sm text-charcoal/60">
            Price depends on number of workflows, integrations, and complexity. Every
            project gets a fixed quote before work begins.
          </p>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-sky-blue uppercase tracking-widest block mb-3">
              Industries
            </span>
            <h2 className="text-4xl font-bold text-navy mb-4">Who This Is For</h2>
            <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
              Any small business with repetitive processes can benefit from AI
              automation. These are the industries we serve most.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {industries.map(({ Icon, label }) => (
              <div
                key={label}
                className="text-center py-6 px-4 bg-white rounded-2xl border border-gray-100 hover:border-sky-blue hover:bg-sky-blue/5 transition-all duration-300 flex flex-col items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-navy/5 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-navy" strokeWidth={1.5} />
                </div>
                <p className="text-sm font-semibold text-navy">{label}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-8 text-charcoal/60 text-sm">
            Don&apos;t see your industry?{' '}
            <Link
              href="/#contact"
              className="text-sky-blue font-semibold hover:underline underline-offset-4"
            >
              Get in touch
            </Link>{' '}
            — we likely have a solution.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-charcoal/70">
              Common questions about AI workflow automation for small businesses.
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
          <h2 className="text-3xl font-bold mb-4">
            Ready to automate your business?
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            Tell us what you want to automate. We will map the opportunity, quote the
            project, and get you live in 30 days.
          </p>
          <Link href="/#contact" className="btn-red inline-block px-10 py-4 text-lg">
            Build My Automation &rarr;
          </Link>
          <p className="mt-6 text-sm text-gray-400">
            Or explore our other services:{' '}
            <Link
              href="/services/ai-consulting"
              className="text-sky-blue hover:underline underline-offset-4"
            >
              AI Consulting
            </Link>{' '}
            &middot;{' '}
            <Link
              href="/services/ai-marketing"
              className="text-sky-blue hover:underline underline-offset-4"
            >
              AI Marketing
            </Link>
          </p>
        </div>
      </section>
    </div>
  )
}
