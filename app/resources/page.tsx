import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, ClipboardList } from 'lucide-react'
import ResourceForm from '../components/ResourceForm'

export const metadata: Metadata = {
  title: 'Free AI Operator\'s Playbook — 50 Pages, No Fluff',
  description: 'Download the free AI Operator\'s Playbook: 50 pages of frameworks, templates, and a 30/60/90-day implementation roadmap for building AI systems that actually work. Used to build Ainsley at NYClaw.io.',
  keywords: 'AI playbook, AI implementation guide, AI assistant framework, free AI guide, AI templates',
  openGraph: {
    title: 'The AI Operator\'s Playbook — Free Download',
    description: '50 pages of frameworks, templates, and the implementation roadmap we used to build Ainsley. Free with your email.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free AI Operator\'s Playbook — 50 Pages',
    description: 'Frameworks, templates, and a 30/60/90-day roadmap for building AI systems that work.',
  },
  alternates: {
    canonical: 'https://nyclaw.io/resources',
  },
}

const whatsInside = [
  { section: 'Section 1', title: 'Building AI Identity', pages: '15 pages', desc: 'The Four-Quadrant Persona Taxonomy, principle-first documentation, priority hierarchies, and the full SOUL.md template.' },
  { section: 'Section 2', title: 'Mission-Driven Systems', pages: '16 pages', desc: 'Why processes fail, how to design mission statements that actually drive decisions, OKR frameworks, and the review cadence.' },
  { section: 'Section 3', title: 'Operational Excellence', pages: '9 pages', desc: 'All 7 anti-patterns with real-world examples and specific prevention systems for each.' },
  { section: 'Section 4', title: 'Implementation Roadmap', pages: '8 pages', desc: 'The 30/60/90-day plan. Week-by-week actions to build your system from scratch.' },
  { section: 'Appendix', title: 'Templates & Checklists', pages: '4 pages', desc: 'Printable: SOUL.md template, weekly review checklist, monthly audit checklist, anti-pattern scorecard, OKR template.' },
]

const templates = [
  'SOUL.md Identity Template (copy-pasteable)',
  'Weekly Review Checklist',
  'Monthly Documentation Audit',
  'Anti-Pattern Audit Scorecard',
  'OKR Template for Small Teams',
  'System Health Dashboard',
]

const trustSignals = [
  '50 pages',
  '5 printable templates',
  '30/60/90-day roadmap',
  'Free. No credit card.',
]

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-navy text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-sky-blue text-white text-xs font-bold tracking-widest uppercase px-3 py-1 rounded mb-6">
            Free Download
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            The AI Operator&apos;s Playbook
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-4">
            How to build an AI assistant that actually works — with identity, memory, and automation that doesn&apos;t break. Built from what we learned deploying Ainsley.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400 mt-6">
            {trustSignals.map((signal) => (
              <span key={signal} className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-sky-blue flex-shrink-0" />
                {signal}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* Form (client component) */}
          <ResourceForm />

          {/* What's Inside */}
          <div>
            <h2 className="text-2xl font-bold text-navy mb-4">What&apos;s inside</h2>
            <div className="divide-y divide-gray-100">
              {whatsInside.map((item) => (
                <div key={item.section} className="flex gap-4 py-6">
                  <div className="flex-shrink-0 w-16 text-center">
                    <div className="bg-navy text-white text-xs font-bold px-2 py-1 rounded mb-1">{item.section}</div>
                    <div className="text-xs text-gray-400">{item.pages}</div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Printable callout */}
            <div className="mt-6 bg-blue-50 border border-sky-blue rounded-xl p-5">
              <h3 className="font-semibold text-navy mb-3 flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-sky-blue flex-shrink-0" />
                Printable Templates Included
              </h3>
              <ul className="text-sm text-gray-700 space-y-2">
                {templates.map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-sky-blue flex-shrink-0 mt-0.5" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ainsley story */}
            <div className="mt-8 border-l-4 border-sky-blue pl-4">
              <p className="text-gray-600 text-sm italic">
                &ldquo;Every AI assistant we&apos;ve seen fail had one thing in common: the operator treated setup as optional. It&apos;s not. Setup is the whole game.&rdquo;
              </p>
              <p className="text-navy font-medium text-sm mt-2">— Ainsley, NYClaw.io</p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="bg-gray-50 border-t border-gray-200 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-navy mb-8 text-center">Go deeper (free)</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { href: '/knowledge/ai-assistant-identity', label: 'AI Identity', title: 'How to Build a Scalable AI Assistant', time: '12 min' },
              { href: '/knowledge/mission-driven-systems', label: 'Operations', title: 'Mission-Driven Systems: Why Most Processes Fail', time: '13 min' },
              { href: '/knowledge/operational-excellence', label: 'Anti-Patterns', title: 'Operational Excellence: 7 Critical Anti-Patterns', time: '10 min' },
            ].map(a => (
              <Link key={a.href} href={a.href} className="bg-white border-2 border-gray-200 rounded-xl p-5 hover:border-sky-blue transition-colors group">
                <div className="text-xs text-sky-blue font-semibold mb-2">{a.label} · {a.time} read</div>
                <h3 className="font-semibold text-navy group-hover:text-sky-blue transition-colors text-sm">{a.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
