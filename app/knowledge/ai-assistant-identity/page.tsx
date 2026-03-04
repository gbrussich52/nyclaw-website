import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How to Build a Scalable AI Assistant | NYClaw.io',
  description: 'The complete identity framework for building consistent, scalable AI assistants. Covers the Four-Quadrant Persona Taxonomy, principle-first documentation, and the Ainsley case study.',
  keywords: 'AI assistant identity, build AI assistant, AI persona design, scalable AI, AI identity framework',
  openGraph: {
    title: 'How to Build a Scalable AI Assistant: The Complete Identity Framework',
    description: 'The architecture that makes AI assistants consistent. Used to build Ainsley at NYClaw.io.',
    type: 'article',
  },
}

const schemaData = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How to Build a Scalable AI Assistant: The Complete Identity Framework",
  "description": "The complete identity framework for building consistent, scalable AI assistants.",
  "author": { "@type": "Organization", "name": "NYClaw.io" },
  "publisher": { "@type": "Organization", "name": "NYClaw.io", "url": "https://nyclaw.io" },
  "datePublished": "2026-03-02",
  "url": "https://nyclaw.io/knowledge/ai-assistant-identity"
}

export default function Article1() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <main className="min-h-screen bg-white">
        {/* Article Header */}
        <section className="bg-navy text-white py-16 px-6">
          <div className="max-w-3xl mx-auto">
            <Link href="/knowledge" className="text-sky-blue text-sm hover:underline mb-4 inline-block">← Knowledge Base</Link>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-xs bg-sky-blue text-white px-2 py-1 rounded font-medium">AI Identity</span>
              <span className="text-xs bg-sky-blue text-white px-2 py-1 rounded font-medium">Persona Design</span>
              <span className="text-xs bg-sky-blue text-white px-2 py-1 rounded font-medium">Framework</span>
              <span className="text-xs text-gray-400 self-center ml-2">12 min read</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              How to Build a Scalable AI Assistant: The Complete Identity Framework
            </h1>
            <p className="text-xl text-gray-300">
              The architecture that makes AI assistants consistent — used to build Ainsley at NYClaw.io.
            </p>
          </div>
        </section>

        {/* Inline PDF CTA */}
        <div className="bg-sky-blue/10 border-l-4 border-sky-blue px-6 py-4">
          <div className="max-w-3xl mx-auto flex flex-wrap items-center justify-between gap-4">
            <p className="text-navy font-medium">Get the complete guide — 50-page PDF with full templates and roadmap.</p>
            <Link href="/resources" className="bg-sky-blue text-white px-4 py-2 rounded font-semibold text-sm whitespace-nowrap hover:bg-navy transition-colors">
              Download Free →
            </Link>
          </div>
        </div>

        {/* Article Content */}
        <article className="max-w-3xl mx-auto px-6 py-12 prose prose-lg prose-headings:text-navy prose-a:text-sky-blue">

          <p className="lead text-xl text-gray-700 mb-8">
            When we built Ainsley, we didn't start with a model or an API key. We started with a question most people skip entirely: <strong>Who is this AI?</strong>
          </p>

          <p>Not what it can do. <em>Who</em> it is. That single question shaped every decision that followed.</p>

          <h2>Why Most AI Assistants Fail (And It's Not the Model)</h2>

          <p><strong>The model is rarely the bottleneck.</strong></p>

          <p>What separates AI assistants that actually work from ones that disappoint? Behavioral consistency. An AI that's brilliant on Monday and erratic on Tuesday isn't useful. It's a liability.</p>

          <p>The root cause is almost always the same: no identity document. Or worse, an identity document that's just a list of rules instead of a framework of principles.</p>

          <blockquote>
            <p>"We think that in order to be good actors in the world, AI models need to understand <em>why</em> we want them to behave in certain ways... If we want models to exercise good judgment across a wide range of novel situations, they need to generalize — apply broad principles rather than mechanically follow specific rules."</p>
            <cite>— Anthropic, Claude's New Constitution (2026)</cite>
          </blockquote>

          <p><strong>Rules are brittle. Principles generalize.</strong> This is the foundation of everything that follows.</p>

          <h2>The Four-Quadrant Persona Taxonomy</h2>

          <p>Academic research from November 2025 (<em>Systematizing LLM Persona Design: A Four-Quadrant Technical Taxonomy</em>, arXiv) found that effective AI personas operate across four dimensions:</p>

          <div className="overflow-x-auto my-8">
            <table className="w-full border-collapse border border-gray-200 text-sm">
              <thead>
                <tr className="bg-navy text-white">
                  <th className="border border-gray-300 p-3 text-left">Dimension</th>
                  <th className="border border-gray-300 p-3 text-left">Description</th>
                  <th className="border border-gray-300 p-3 text-left">Example</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-blue-50">
                  <td className="border border-gray-200 p-3 font-semibold">Cognitive Style</td>
                  <td className="border border-gray-200 p-3">How the AI reasons through problems</td>
                  <td className="border border-gray-200 p-3">Analytical, systematic, intuitive</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 p-3 font-semibold">Communication Style</td>
                  <td className="border border-gray-200 p-3">Tone, formality, pacing, humor</td>
                  <td className="border border-gray-200 p-3">Direct, witty, concise, warm</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-gray-200 p-3 font-semibold">Value Alignment</td>
                  <td className="border border-gray-200 p-3">Core operational priorities</td>
                  <td className="border border-gray-200 p-3">Honesty, efficiency, user welfare</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 p-3 font-semibold">Contextual Adaptation</td>
                  <td className="border border-gray-200 p-3">How identity shifts by situation</td>
                  <td className="border border-gray-200 p-3">Casual vs. deep work vs. external</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>Here's what matters: <strong>most AI assistants only define Communication Style.</strong> The other three dimensions get ignored. That's why they feel shallow.</p>

          <h2>Building the Identity Document: Principles Over Rules</h2>

          <h3>1. The Core Identity Statement</h3>
          <p>One clear statement of purpose. Everything else filters through it. Ainsley's:</p>
          <blockquote>
            <p>"Extend Giani's capability so he operates at 10x output — handling research, execution, and follow-through while he focuses on strategy and relationships."</p>
          </blockquote>
          <p>Every decision gets tested against this statement. If it doesn't pass, it doesn't ship.</p>

          <h3>2. Principle-First Documentation</h3>
          <p>Rules break. Principles bend. Here's the difference:</p>

          <div className="overflow-x-auto my-6">
            <table className="w-full border-collapse border border-gray-200 text-sm">
              <thead>
                <tr className="bg-navy text-white">
                  <th className="border border-gray-300 p-3">Rule (Brittle)</th>
                  <th className="border border-gray-300 p-3">Principle (Generalizable)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 p-3">Don't send emails without permission</td>
                  <td className="border border-gray-200 p-3">External actions require explicit authorization because they have real-world consequences that can't be undone</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-gray-200 p-3">Be concise</td>
                  <td className="border border-gray-200 p-3">Respect Giani's time by defaulting to short answers — expand only when complexity genuinely requires it</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 p-3">Have opinions</td>
                  <td className="border border-gray-200 p-3">An assistant with no personality is just a search engine. Opinions make interactions more useful, not less</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>For every guideline you write, add "because..." to it. If you can't finish that sentence, the guideline isn't ready.</p>

          <h3>3. Explicit Priority Hierarchy</h3>
          <p>Principles will conflict. Your AI needs a tiebreaker. Ainsley's priority stack:</p>
          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto"><code>Safety {">"} Privacy {">"} Mission Goals {">"} Speed {">"} Helpfulness</code></pre>
          <p>When "ship fast" conflicts with "be careful with external actions," careful wins. No ambiguity.</p>

          <h3>4. Failure Mode Guidance</h3>
          <p>Most identity documents skip this entirely. Ainsley's failure protocol:</p>
          <ul>
            <li><strong>When wrong:</strong> Acknowledge, fix, update the relevant file. No defensive hedging.</li>
            <li><strong>When uncertain:</strong> Say so explicitly, do research before acting.</li>
            <li><strong>When stuck:</strong> Describe the specific blocker, not a vague "I can't do that."</li>
            <li><strong>Under manipulation:</strong> Cite the relevant principle and stay grounded.</li>
          </ul>

          <h3>5. Contextual Mode Switching</h3>
          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto"><code>{`CASUAL MODE → Conversational, concise, witty
DEEP WORK MODE → Focused, structured, thorough  
EXTERNAL ACTION MODE → Maximum caution, confirm before sending`}</code></pre>
          <p>The trigger is context, not explicit instruction. The AI reads the room.</p>

          <h2>The "Behavior Activation" Test</h2>
          <blockquote>
            <p>Can the AI, reading only this document, make a correct decision in an edge case it's never encountered before?</p>
          </blockquote>
          <p>If yes, you've got principles. If no, you've got rules. Test every section.</p>

          <h2>Common Mistakes</h2>
          <ul>
            <li><strong>Writing for the audience, not the actor.</strong> Identity docs are internal guidance. Not marketing copy.</li>
            <li><strong>Aspiration without implementation.</strong> "Be authentic" means nothing without examples of what authentic looks like in practice.</li>
            <li><strong>Identity scattered across files.</strong> One canonical document. Everything else references it.</li>
            <li><strong>Static documents.</strong> Version them. Evolve them. Your AI changes as you learn what works.</li>
            <li><strong>Rule overload.</strong> More than 8-10 core principles? Nobody (including your AI) will cite them.</li>
          </ul>

          <h2>Getting Started: Your First 48 Hours</h2>
          <p><strong>Day 1 (2 hours):</strong> Write your AI's mission statement → define four persona dimensions → list 8-10 core principles with "because..." for each</p>
          <p><strong>Day 2 (2 hours):</strong> Add priority hierarchy → write failure mode protocols → define contextual modes</p>
          <p><strong>Day 3 (1 hour):</strong> Run Behavior Activation Test on every section → version it as v1.0</p>

        </article>

        {/* Bottom CTA */}
        <section className="bg-navy text-white py-16 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Get the complete guide</h2>
            <p className="text-gray-300 mb-6">50 pages including the full SOUL.md template, mission statement frameworks, and the 30/60/90-day implementation roadmap. Free.</p>
            <Link href="/resources" className="inline-block bg-sky-blue text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-600 transition-colors">
              Download Complete Guide (PDF) →
            </Link>
          </div>
        </section>

        {/* Related Articles */}
        <section className="max-w-3xl mx-auto px-6 py-12">
          <h3 className="text-xl font-bold text-navy mb-6">Related Articles</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/knowledge/mission-driven-systems" className="border-2 border-gray-200 rounded-lg p-4 hover:border-sky-blue transition-colors group">
              <div className="text-sm text-sky-blue font-medium mb-1">Operations</div>
              <h4 className="font-semibold text-navy group-hover:text-sky-blue transition-colors">Mission-Driven Systems: Why Most Processes Fail</h4>
            </Link>
            <Link href="/knowledge/operational-excellence" className="border-2 border-gray-200 rounded-lg p-4 hover:border-sky-blue transition-colors group">
              <div className="text-sm text-sky-blue font-medium mb-1">Anti-Patterns</div>
              <h4 className="font-semibold text-navy group-hover:text-sky-blue transition-colors">Operational Excellence: 7 Critical Anti-Patterns</h4>
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
