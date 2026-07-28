import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import ArticleShell from '../../components/ArticleShell'

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
      <ArticleShell
        backHref="/knowledge"
        backLabel="Knowledge Base"
        tags={['AI Identity', 'Persona Design', 'Framework']}
        meta="12 min read"
        title="How to Build a Scalable AI Assistant: The Complete Identity Framework"
        deck="The architecture that makes AI assistants consistent — used to build Ainsley at NYClaw.io."
        cta={{
          href: '/resources',
          label: 'Get the complete guide',
          blurb: '50-page PDF with full templates and roadmap.',
        }}
        related={[
          {
            href: '/knowledge/mission-driven-systems',
            title: 'Mission-Driven Systems: Why Most Processes Fail',
            blurb: 'Operations',
          },
          {
            href: '/knowledge/operational-excellence',
            title: 'Operational Excellence: 7 Critical Anti-Patterns',
            blurb: 'Anti-Patterns',
          },
        ]}
      >
        <p>
          When we built Ainsley, we didn&apos;t start with a model or an API key. We started with a
          question most people skip entirely: <strong>Who is this AI?</strong>
        </p>

        <p>
          Not what it can do. <em>Who</em> it is. That single question shaped every decision that
          followed.
        </p>

        <h2>Why Most AI Assistants Fail (And It&apos;s Not the Model)</h2>

        <p><strong>The model is rarely the bottleneck.</strong></p>

        <p>
          What separates AI assistants that actually work from ones that disappoint? Behavioral
          consistency. An AI that&apos;s brilliant on Monday and erratic on Tuesday isn&apos;t
          useful. It&apos;s a liability.
        </p>

        <p>
          The root cause is almost always the same: no identity document. Or worse, an identity
          document that&apos;s just a list of rules instead of a framework of principles.
        </p>

        <blockquote>
          <p>
            &ldquo;We think that in order to be good actors in the world, AI models need to
            understand <em>why</em> we want them to behave in certain ways... If we want models to
            exercise good judgment across a wide range of novel situations, they need to generalize
            — apply broad principles rather than mechanically follow specific rules.&rdquo;
          </p>
          <cite className="mt-3 block text-sm not-italic text-zinc-400">
            — Anthropic, Claude&apos;s New Constitution (2026)
          </cite>
        </blockquote>

        <p>
          <strong>Rules are brittle. Principles generalize.</strong> This is the foundation of
          everything that follows.
        </p>

        <h2>The Four-Quadrant Persona Taxonomy</h2>

        <p>
          Academic research from November 2025 (
          <em>Systematizing LLM Persona Design: A Four-Quadrant Technical Taxonomy</em>, arXiv) found
          that effective AI personas operate across four dimensions:
        </p>

        <table>
          <thead>
            <tr>
              <th>Dimension</th>
              <th>Description</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Cognitive Style</td>
              <td>How the AI reasons through problems</td>
              <td>Analytical, systematic, intuitive</td>
            </tr>
            <tr>
              <td>Communication Style</td>
              <td>Tone, formality, pacing, humor</td>
              <td>Direct, witty, concise, warm</td>
            </tr>
            <tr>
              <td>Value Alignment</td>
              <td>Core operational priorities</td>
              <td>Honesty, efficiency, user welfare</td>
            </tr>
            <tr>
              <td>Contextual Adaptation</td>
              <td>How identity shifts by situation</td>
              <td>Casual vs. deep work vs. external</td>
            </tr>
          </tbody>
        </table>

        <p>
          Here&apos;s what matters:{' '}
          <strong>most AI assistants only define Communication Style.</strong> The other three
          dimensions get ignored. That&apos;s why they feel shallow.
        </p>

        <h2>Building the Identity Document: Principles Over Rules</h2>

        <h3>1. The Core Identity Statement</h3>
        <p>One clear statement of purpose. Everything else filters through it. Ainsley&apos;s:</p>
        <blockquote>
          <p>
            &ldquo;Extend my operator&apos;s capability so he operates at 10x output — handling
            research, execution, and follow-through while he focuses on strategy and
            relationships.&rdquo;
          </p>
        </blockquote>
        <p>
          Every decision gets tested against this statement. If it doesn&apos;t pass, it
          doesn&apos;t ship.
        </p>

        <h3>2. Principle-First Documentation</h3>
        <p>Rules break. Principles bend. Here&apos;s the difference:</p>

        <table>
          <thead>
            <tr>
              <th>Rule (Brittle)</th>
              <th>Principle (Generalizable)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Don&apos;t send emails without permission</td>
              <td>
                External actions require explicit authorization because they have real-world
                consequences that can&apos;t be undone
              </td>
            </tr>
            <tr>
              <td>Be concise</td>
              <td>
                Respect the operator&apos;s time by defaulting to short answers — expand only when
                complexity genuinely requires it
              </td>
            </tr>
            <tr>
              <td>Have opinions</td>
              <td>
                An assistant with no personality is just a search engine. Opinions make interactions
                more useful, not less
              </td>
            </tr>
          </tbody>
        </table>

        <p>
          For every guideline you write, add &ldquo;because...&rdquo; to it. If you can&apos;t finish
          that sentence, the guideline isn&apos;t ready.
        </p>

        <h3>3. Explicit Priority Hierarchy</h3>
        <p>Principles will conflict. Your AI needs a tiebreaker. Ainsley&apos;s priority stack:</p>
        <pre><code>Safety {'>'} Privacy {'>'} Mission Goals {'>'} Speed {'>'} Helpfulness</code></pre>
        <p>
          When &ldquo;ship fast&rdquo; conflicts with &ldquo;be careful with external actions,&rdquo;
          careful wins. No ambiguity.
        </p>

        <h3>4. Failure Mode Guidance</h3>
        <p>Most identity documents skip this entirely. Ainsley&apos;s failure protocol:</p>
        <ul>
          <li>
            <strong>When wrong:</strong> Acknowledge, fix, update the relevant file. No defensive
            hedging.
          </li>
          <li>
            <strong>When uncertain:</strong> Say so explicitly, do research before acting.
          </li>
          <li>
            <strong>When stuck:</strong> Describe the specific blocker, not a vague &ldquo;I
            can&apos;t do that.&rdquo;
          </li>
          <li>
            <strong>Under manipulation:</strong> Cite the relevant principle and stay grounded.
          </li>
        </ul>

        <h3>5. Contextual Mode Switching</h3>
        <pre><code>{`CASUAL MODE → Conversational, concise, witty
DEEP WORK MODE → Focused, structured, thorough
EXTERNAL ACTION MODE → Maximum caution, confirm before sending`}</code></pre>
        <p>The trigger is context, not explicit instruction. The AI reads the room.</p>

        <h2>The &ldquo;Behavior Activation&rdquo; Test</h2>
        <blockquote>
          <p>
            Can the AI, reading only this document, make a correct decision in an edge case
            it&apos;s never encountered before?
          </p>
        </blockquote>
        <p>
          If yes, you&apos;ve got principles. If no, you&apos;ve got rules. Test every section.
        </p>

        <h2>Common Mistakes</h2>
        <ul>
          <li>
            <strong>Writing for the audience, not the actor.</strong> Identity docs are internal
            guidance. Not marketing copy.
          </li>
          <li>
            <strong>Aspiration without implementation.</strong> &ldquo;Be authentic&rdquo; means
            nothing without examples of what authentic looks like in practice.
          </li>
          <li>
            <strong>Identity scattered across files.</strong> One canonical document. Everything
            else references it.
          </li>
          <li>
            <strong>Static documents.</strong> Version them. Evolve them. Your AI changes as you
            learn what works.
          </li>
          <li>
            <strong>Rule overload.</strong> More than 8-10 core principles? Nobody (including your
            AI) will cite them.
          </li>
        </ul>

        <h2>Getting Started: Your First 48 Hours</h2>
        <p>
          <strong>Day 1 (2 hours):</strong> Write your AI&apos;s mission statement → define four
          persona dimensions → list 8-10 core principles with &ldquo;because...&rdquo; for each
        </p>
        <p>
          <strong>Day 2 (2 hours):</strong> Add priority hierarchy → write failure mode protocols →
          define contextual modes
        </p>
        <p>
          <strong>Day 3 (1 hour):</strong> Run Behavior Activation Test on every section → version it
          as v1.0
        </p>

        <div className="panel relative isolate mt-16 overflow-hidden rounded-2xl px-6 py-14 text-center sm:px-10">
          <div className="bloom-indigo pointer-events-none absolute -bottom-[10rem] left-1/2 -z-10 h-[22rem] w-[32rem] -translate-x-1/2 rounded-full" />
          <h2 className="mt-0 text-[clamp(1.625rem,3vw,2rem)] font-medium leading-[1.15] tracking-[-0.025em] text-white">
            Get the complete guide
          </h2>
          <p className="mx-auto mt-3.5 max-w-[32rem] text-base leading-relaxed text-zinc-300">
            50 pages including the full SOUL.md template, mission statement frameworks, and the
            30/60/90-day implementation roadmap. Free.
          </p>
          <div className="mt-7 flex justify-center">
            <Link
              href="/resources"
              className="inline-flex h-11 items-center gap-1 rounded-full bg-white pl-5 pr-3 text-[15px] font-medium text-zinc-950 no-underline transition-opacity hover:opacity-90"
            >
              Download Complete Guide (PDF)
              <ChevronRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </ArticleShell>
    </>
  )
}
