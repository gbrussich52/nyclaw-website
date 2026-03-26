import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Services for Small Businesses — NYClaw.io",
  description:
    "NYClaw.io builds and manages AI systems for small businesses in NYC and Westchester. Choose from workflow automation, strategy consulting, or AI-powered marketing.",
};

const services = [
  {
    badge: "Most Popular",
    badgeColor: "bg-sky-blue text-white",
    title: "AI Workflow Automation",
    subtitle: "Stop doing $20/hour work.",
    description:
      "We audit your operations, identify what's eating your team's time, and build AI systems that handle it 24/7 — scheduling, follow-ups, lead intake, onboarding, invoicing, and more.",
    includes: [
      "Full workflow audit & process mapping",
      "Custom AI automation build",
      "CRM, email & scheduling integration",
      "Testing, team training & handoff",
      "Monthly maintenance & optimization",
    ],
    setup: "$1.5K–4K",
    monthly: "$199–499/mo",
    cta: "Start Automating",
    href: "/services/ai-automation",
    highlight: true,
  },
  {
    badge: "Strategy",
    badgeColor: "bg-navy text-white",
    title: "AI Strategy & Consulting",
    subtitle: "Know exactly where AI fits.",
    description:
      "Not sure where to start? We spend time in your business, map every process, and deliver a clear roadmap with prioritized recommendations and real ROI projections.",
    includes: [
      "Full business operations audit (2–4 hrs)",
      "Competitor AI landscape analysis",
      "Prioritized AI opportunity list",
      "Implementation roadmap + ROI projections",
    ],
    setup: "$500",
    monthly: "Optional retainer",
    cta: "Book an Audit",
    href: "/services/ai-consulting",
    highlight: false,
  },
  {
    badge: "Marketing",
    badgeColor: "bg-dark-red text-white",
    title: "AI-Powered Marketing",
    subtitle: "Generate leads without lifting a finger.",
    description:
      "We build AI content engines, lead generation funnels, and automated nurture sequences that work around the clock — no agency retainer, no content calendar headaches.",
    includes: [
      "Automated daily content production",
      "AI-driven lead generation funnels",
      "Email & SMS automation sequences",
      "Multi-platform distribution management",
    ],
    setup: "Custom",
    monthly: "$1K–3K/mo flat",
    cta: "Start Growing",
    href: "/services/ai-marketing",
    highlight: false,
  },
];

const industries = [
  "Law Firms",
  "Dental & Medical",
  "Real Estate",
  "Plumbers & HVAC",
  "Auto Dealers",
  "Small Business",
];

export default function ServicesPage() {
  return (
    <main className="bg-white text-charcoal">

      {/* Hero */}
      <section className="bg-navy text-white py-20 px-6 text-center">
        <p className="text-sky-blue font-semibold text-sm uppercase tracking-widest mb-4">What We Build</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 max-w-3xl mx-auto leading-tight">
          AI Systems That Run Your Business While You Run Your Business
        </h1>
        <p className="text-white/70 max-w-2xl mx-auto text-lg mb-10">
          From first automation to full AI operations — we build, deploy, and manage everything.
          No tech knowledge required.
        </p>
        <Link
          href="/#contact"
          className="inline-block bg-sky-blue hover:bg-sky-blue/90 text-white font-semibold px-8 py-4 rounded-lg transition-colors"
        >
          Book a Free Strategy Call →
        </Link>
      </section>

      {/* Service Cards */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s) => (
            <div
              key={s.title}
              className={`rounded-2xl border-2 p-8 flex flex-col ${
                s.highlight
                  ? "border-sky-blue shadow-lg shadow-sky-blue/10"
                  : "border-gray-100"
              }`}
            >
              <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full w-fit mb-4 ${s.badgeColor}`}>
                {s.badge}
              </span>
              <h2 className="text-2xl font-bold text-navy mb-1">{s.title}</h2>
              <p className="text-sky-blue font-semibold text-sm mb-4">{s.subtitle}</p>
              <p className="text-charcoal/70 mb-6 text-sm leading-relaxed">{s.description}</p>

              <ul className="space-y-2 mb-8 flex-1">
                {s.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-charcoal/80">
                    <span className="text-sky-blue mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="border-t border-gray-100 pt-6 mb-6">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-2xl font-extrabold text-navy">{s.setup}</span>
                  <span className="text-sm text-charcoal/50">setup</span>
                </div>
                <p className="text-sky-blue font-semibold text-sm">{s.monthly}</p>
              </div>

              <Link
                href={s.href}
                className={`block text-center font-semibold px-6 py-3 rounded-lg transition-colors ${
                  s.highlight
                    ? "bg-sky-blue text-white hover:bg-sky-blue/90"
                    : "bg-navy text-white hover:bg-navy/90"
                }`}
              >
                {s.cta} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* The AI Employee Setup — flagship callout */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sky-blue font-semibold text-sm uppercase tracking-widest mb-4">Our Flagship Package</p>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">The AI Employee Setup</h2>
          <p className="text-charcoal/70 text-lg max-w-2xl mx-auto mb-10">
            Most business owners know AI exists. Almost none know how to make it work for <em>their</em> business.
            The AI Employee Setup closes that gap — we audit your operation, build the automations, and hand you
            a fully running system in 30 days.
          </p>
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {[
              { step: "1", label: "Free Strategy Call", desc: "We review your business and map where AI saves the most time." },
              { step: "2", label: "Audit & Roadmap", desc: "Full workflow audit delivered in Week 1 with prioritized build list." },
              { step: "3", label: "Build & Deploy", desc: "Your custom AI system built, tested, and live within 2 weeks." },
              { step: "4", label: "Handoff & Support", desc: "30-day support window. Monthly maintenance available." },
            ].map((item) => (
              <div key={item.step} className="bg-white rounded-xl p-6 text-left shadow-sm border border-gray-100">
                <div className="w-8 h-8 rounded-full bg-sky-blue text-white text-sm font-bold flex items-center justify-center mb-3">
                  {item.step}
                </div>
                <h3 className="font-semibold text-navy mb-2">{item.label}</h3>
                <p className="text-sm text-charcoal/60">{item.desc}</p>
              </div>
            ))}
          </div>
          <Link
            href="/#contact"
            className="inline-block bg-navy text-white font-semibold px-8 py-4 rounded-lg hover:bg-navy/90 transition-colors"
          >
            Claim Your Free Strategy Call →
          </Link>
        </div>
      </section>

      {/* Industries */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <p className="text-sky-blue font-semibold text-sm uppercase tracking-widest mb-4">Industries We Serve</p>
        <h2 className="text-3xl font-bold text-navy mb-10">Every service business has repetitive work. AI can handle it.</h2>
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {industries.map((ind) => (
            <span
              key={ind}
              className="bg-navy/5 text-navy font-medium px-5 py-2 rounded-full text-sm border border-navy/10"
            >
              {ind}
            </span>
          ))}
        </div>
        <p className="text-charcoal/50 text-sm">
          Don&apos;t see your industry?{" "}
          <Link href="/#contact" className="text-sky-blue hover:underline">
            Get in touch
          </Link>{" "}
          — we likely have a solution.
        </p>
      </section>

      {/* Bottom CTA */}
      <section className="bg-navy text-white py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Not sure which service fits?</h2>
        <p className="text-white/70 mb-8 max-w-xl mx-auto">
          Book a free 30-minute call. We&apos;ll tell you exactly where AI can save you the most time — no pitch, no pressure.
        </p>
        <Link
          href="https://calendly.com/nyclaw-io-proton/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-sky-blue hover:bg-sky-blue/90 text-white font-semibold px-8 py-4 rounded-lg transition-colors"
        >
          Book Your Free Strategy Call →
        </Link>
      </section>
    </main>
  );
}
