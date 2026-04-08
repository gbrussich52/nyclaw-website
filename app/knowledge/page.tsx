import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'AI Knowledge Base — Guides on AI Identity, Operations & Excellence',
  description: 'Research-backed guides on building AI assistants, mission-driven systems, and operational frameworks for small businesses. Free articles from NYClaw.io — the AI implementation agency serving Westchester County, NY.',
  keywords: 'AI assistant guide, AI identity framework, operational excellence, mission-driven systems, AI implementation guide',
  openGraph: {
    title: 'AI Knowledge Base | NYClaw.io',
    description: 'Research-backed guides on AI identity design, mission-driven operations, and avoiding the failure modes that kill small teams.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'AI Knowledge Base | NYClaw.io',
    description: 'Free research-backed guides on building AI systems that work.',
  },
  alternates: {
    canonical: 'https://nyclaw.io/knowledge',
  },
}

const articles = [
  {
    slug: 'ai-assistant-identity',
    number: '01',
    title: 'How to Build a Scalable AI Assistant',
    subtitle: 'The Complete Identity Framework',
    description: 'The architecture that makes AI assistants consistent. Covers the Four-Quadrant Persona Taxonomy, principle-first documentation, priority hierarchies, and the Ainsley case study.',
    readTime: '12 min read',
    tags: ['AI Identity', 'Persona Design', 'Framework'],
    featured: true,
  },
  {
    slug: 'mission-driven-systems',
    number: '02',
    title: 'Mission-Driven Systems',
    subtitle: 'Why Most Processes Fail (And How to Fix Them)',
    description: 'Why operational processes degrade over time and how to design systems that resist entropy. Covers OKR frameworks, review cadences, accountability structures, and mission statement design.',
    readTime: '13 min read',
    tags: ['Operations', 'Mission Design', 'OKRs'],
    featured: false,
  },
  {
    slug: 'operational-excellence',
    number: '03',
    title: 'Operational Excellence for Small Teams',
    subtitle: 'Avoiding 7 Critical Anti-Patterns',
    description: 'The 7 failure modes that kill small team operations — documentation debt, process theater, accountability gaps, and four more — with specific prevention systems for each.',
    readTime: '10 min read',
    tags: ['Anti-Patterns', 'Small Teams', 'Implementation'],
    featured: false,
  },
]

export default function KnowledgePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-navy text-white py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-sky-blue text-sm font-semibold tracking-widest uppercase mb-4">Knowledge Base</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Build systems that actually work.
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Research-backed guides on AI identity design, mission-driven operations, and the failure modes that kill small teams. Everything here is what we learned building Ainsley — the hard way.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/resources" className="bg-sky-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
              Download Free Guide (PDF) →
            </Link>
            <span className="text-gray-400 self-center text-sm">50 pages. No fluff. Free with email.</span>
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="space-y-8">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/knowledge/${article.slug}`}
              className="group block"
            >
              <article className={`border-2 rounded-xl p-8 transition-all hover:border-sky-blue hover:shadow-lg ${article.featured ? 'border-sky-blue bg-blue-50' : 'border-gray-200 bg-white'}`}>
                <div className="flex items-start gap-6">
                  <div className={`text-5xl font-bold ${article.featured ? 'text-sky-blue' : 'text-gray-200'} flex-shrink-0`}>
                    {article.number}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {article.tags.map((tag) => (
                        <span key={tag} className="text-xs bg-navy text-white px-2 py-1 rounded font-medium">{tag}</span>
                      ))}
                      <span className="text-xs text-gray-500 self-center ml-auto">{article.readTime}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-navy mb-1 group-hover:text-sky-blue transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-sky-blue font-medium mb-3">{article.subtitle}</p>
                    <p className="text-gray-600 leading-relaxed">{article.description}</p>
                    <div className="mt-4 text-sky-blue font-semibold text-sm group-hover:underline">
                      Read article →
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* PDF CTA */}
      <section className="bg-gray-50 border-t-2 border-sky-blue py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-navy mb-4">
            Get the complete guide
          </h2>
          <p className="text-gray-600 mb-6 text-lg">
            50 pages of frameworks, templates, and the 30/60/90-day implementation roadmap. Everything in these articles — plus the printable checklists, OKR templates, and SOUL.md template. Free.
          </p>
          <Link href="/resources" className="inline-block bg-sky-blue text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-navy transition-colors">
            Download Free (PDF) →
          </Link>
          <p className="text-sm text-gray-500 mt-3">Just your email. No spam. Unsubscribe anytime.</p>
        </div>
      </section>
    </main>
  )
}
