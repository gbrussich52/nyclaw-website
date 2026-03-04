import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Operational Excellence for Small Teams: 7 Anti-Patterns | NYClaw.io',
  description: 'The 7 critical anti-patterns that kill small team operations — and how to prevent each one. Practical, implementable, based on 50+ framework research.',
  keywords: 'operational excellence, small team operations, process anti-patterns, team management, documentation debt',
  openGraph: {
    title: 'Operational Excellence for Small Teams: Avoiding 7 Critical Anti-Patterns',
    description: 'The failure modes we hit building NYClaw.io — and specific prevention systems for each.',
    type: 'article',
  },
}

const schemaData = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Operational Excellence for Small Teams: Avoiding 7 Critical Anti-Patterns",
  "author": { "@type": "Organization", "name": "NYClaw.io" },
  "publisher": { "@type": "Organization", "name": "NYClaw.io", "url": "https://nyclaw.io" },
  "datePublished": "2026-03-02",
  "url": "https://nyclaw.io/knowledge/operational-excellence"
}

const antiPatterns = [
  {
    number: '01',
    title: 'Documentation Debt',
    subtitle: 'The Silent Killer',
    what: 'Docs that exist but rot. Stale, contradictory, duplicated. The danger isn\'t missing docs. It\'s outdated docs that create false confidence.',
    symptom: 'Files say different things. Nobody knows which is current. "We\'ll update this later" becomes permanent.',
    fix: [
      'Every file has a declared scope — what it covers and what it does NOT cover',
      'Cross-references instead of copies ("See X for Y" not a repeat of X)',
      'Monthly documentation audit — are any files contradicting each other?',
      'Last-updated timestamps on every key file; >60 days = flag',
      'Archive instead of delete — move outdated docs to archive/ folder',
    ],
    rule: 'One canonical source per concept. Everything else references it.',
  },
  {
    number: '02',
    title: 'Process Theater',
    subtitle: 'Complexity That Doesn\'t Drive Results',
    what: 'Elaborate systems, templates, and workflows that look productive but move nothing. Activity disguised as progress.',
    symptom: '"Getting ready to get ready." More time designing the task system than doing tasks. Beautiful Notion board, abandoned in 2 weeks.',
    fix: [
      'Minimum viable process — start with the simplest version that works',
      'Two-week rule — any system unused for 2 weeks is dead. Kill it.',
      'Plain text test — "Could I do this in a text file?" If yes, use the text file',
      '2-minute rule — if a task takes <2 minutes, do it now, don\'t track it',
    ],
    rule: 'Function over form. Complexity is debt, not sophistication.',
  },
  {
    number: '03',
    title: 'Accountability Gaps',
    subtitle: 'Tasks That Disappear',
    what: 'Work enters a system, never gets reviewed, stalls, and eventually nobody remembers it existed.',
    symptom: '"We should do this someday." Tasks with no owner, no date, no review. The backlog becomes a graveyard of good intentions.',
    fix: [
      'Every task has an owner — not "we" or "the team," one person\'s name',
      'Every task has a date — even a soft target beats no target',
      'Task aging triggers review — anything >7 days without progress gets flagged',
      'Weekly sweep — review all active tasks, close done ones, kill or re-commit stalled ones',
      'Public commitments — accountability increases when commitments are stated to another person',
    ],
    rule: 'If no one owns it with a date, it doesn\'t exist.',
  },
  {
    number: '04',
    title: 'Identity Creep',
    subtitle: 'Mission/Values That Contradict Behavior',
    what: 'The document says one thing. Actual behavior says another. The gap grows until the document becomes fiction.',
    symptom: 'Enron listed "Integrity" as a core value. Circuit City had an extensive customer service mission. Both collapsed while ignoring what they wrote down.',
    fix: [
      'Behavior-test the document — for each decision, can you cite which principle guided it?',
      'Quarterly behavior audit — "Did we actually act according to our values this month?"',
      'Fix the gap at the source — update the doc to reflect reality, OR change the behavior',
      'Reference documents in decisions — "Per our principle X, we\'re doing Y"',
    ],
    rule: 'Values that don\'t drive decisions aren\'t values — they\'re decoration.',
  },
  {
    number: '05',
    title: 'The Planning Fallacy',
    subtitle: 'Optimism Bias in Timelines',
    what: 'Consistently underestimating how long things take. Overestimating how much fits in a week.',
    symptom: 'The Standish Group found 70%+ of software projects overrun their timelines. Individual estimates are off by 1.5-2x. Bigger projects, worse estimates.',
    fix: [
      'Reference class forecasting — how long did similar projects take? Use that.',
      '90% confidence intervals — "Best case: 2 days. Worst case: 2 weeks. Likely: 1 week."',
      'Break big tasks into small ones — estimate accuracy improves for tasks under 1 hour',
      'Track estimates vs. actuals — build a feedback loop on estimation accuracy',
    ],
    rule: 'Assume tasks take twice as long as you think. You\'ll be closer to right.',
  },
  {
    number: '06',
    title: 'Tool Sprawl',
    subtitle: 'The Notification Graveyard',
    what: 'Too many tools. Each adds small overhead. Together, they eat your entire cognitive budget.',
    symptom: 'Notion + Asana + Trello + Slack + Linear + Airtable. None of them talk to each other. You spend more time updating tools than doing actual work.',
    fix: [
      'One tool per job type — task management in ONE place, notes in ONE place',
      'Plain text preference — markdown files beat complex tools for most internal workflows',
      'Annual tool audit — anything not touched in 30 days gets cut',
      '30-day probation for new tools — not embedded by then, it\'s out',
    ],
    rule: 'Consolidate ruthlessly. Cognitive load compounds.',
  },
  {
    number: '07',
    title: 'Sunk Cost Fallacy',
    subtitle: 'Can\'t Kill Bad Projects',
    what: 'Continuing to invest in something because of what you already spent, not because of what it could still return.',
    symptom: '"We\'ve already spent 3 months on this." Features nobody uses. Channels that don\'t convert. Tools that slow everyone down. But killing it feels like waste.',
    fix: [
      'Pre-mortem exercise — before starting, write 3 ways this could fail',
      'Kill criteria defined upfront — "We\'ll stop if X, Y, or Z happens." Write it before you\'re attached.',
      'Monthly project health check — "If we started this today with no prior investment, would we still do it?"',
    ],
    rule: 'Past investment doesn\'t justify future investment. Every week is a new decision.',
  },
]

export default function Article3() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <main className="min-h-screen bg-white">
        {/* Header */}
        <section className="bg-navy text-white py-16 px-6">
          <div className="max-w-3xl mx-auto">
            <Link href="/knowledge" className="text-sky-blue text-sm hover:underline mb-4 inline-block">← Knowledge Base</Link>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-xs bg-sky-blue text-white px-2 py-1 rounded font-medium">Anti-Patterns</span>
              <span className="text-xs bg-sky-blue text-white px-2 py-1 rounded font-medium">Small Teams</span>
              <span className="text-xs bg-sky-blue text-white px-2 py-1 rounded font-medium">Implementation</span>
              <span className="text-xs text-gray-400 self-center ml-2">10 min read</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Operational Excellence for Small Teams: Avoiding 7 Critical Anti-Patterns
            </h1>
            <p className="text-xl text-gray-300">
              The failure modes we hit building NYClaw.io — and specific prevention systems for each one.
            </p>
          </div>
        </section>

        {/* Inline CTA */}
        <div className="bg-sky-blue/10 border-l-4 border-sky-blue px-6 py-4">
          <div className="max-w-3xl mx-auto flex flex-wrap items-center justify-between gap-4">
            <p className="text-navy font-medium">Get the printable anti-pattern audit scorecard + full implementation roadmap (PDF, free).</p>
            <Link href="/resources" className="bg-sky-blue text-white px-4 py-2 rounded font-semibold text-sm whitespace-nowrap hover:bg-navy transition-colors">
              Download Free →
            </Link>
          </div>
        </div>

        {/* Intro */}
        <div className="max-w-3xl mx-auto px-6 py-10">
          <p className="text-xl text-gray-700 leading-relaxed">
            We hit every single one of these building NYClaw.io. Seven patterns that kill small team operations. All preventable. All predictable. Here's what they look like and how to stop them.
          </p>
        </div>

        {/* Anti-Patterns */}
        <section className="max-w-3xl mx-auto px-6 pb-16 space-y-12">
          {antiPatterns.map((ap, i) => (
            <div key={ap.number} className="border-2 border-gray-200 rounded-xl overflow-hidden">
              {/* Header */}
              <div className="bg-navy text-white p-6 flex items-start gap-4">
                <div className="text-4xl font-bold text-sky-blue flex-shrink-0">{ap.number}</div>
                <div>
                  <h2 className="text-xl font-bold">{ap.title}</h2>
                  <p className="text-gray-300 text-sm">{ap.subtitle}</p>
                </div>
              </div>

              <div className="p-6 space-y-4">
                {/* What */}
                <div>
                  <h3 className="font-semibold text-navy text-sm uppercase tracking-wide mb-1">What It Is</h3>
                  <p className="text-gray-700">{ap.what}</p>
                </div>

                {/* Symptom */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="font-semibold text-dark-red text-sm uppercase tracking-wide mb-1">Symptoms</h3>
                  <p className="text-gray-700 text-sm">{ap.symptom}</p>
                </div>

                {/* Fix */}
                <div>
                  <h3 className="font-semibold text-navy text-sm uppercase tracking-wide mb-2">Prevention System</h3>
                  <ul className="space-y-1">
                    {ap.fix.map((f, fi) => (
                      <li key={fi} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-sky-blue font-bold mt-0.5">✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Rule */}
                <div className="bg-navy text-white rounded-lg px-4 py-3">
                  <p className="text-sm"><span className="font-semibold text-sky-blue">The Rule: </span>{ap.rule}</p>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Summary table */}
        <section className="max-w-3xl mx-auto px-6 pb-16">
          <h2 className="text-2xl font-bold text-navy mb-6">Quick Reference: All 7 Anti-Patterns</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200 text-sm">
              <thead>
                <tr className="bg-navy text-white">
                  <th className="border border-gray-300 p-3">#</th>
                  <th className="border border-gray-300 p-3">Anti-Pattern</th>
                  <th className="border border-gray-300 p-3">Key Fix</th>
                </tr>
              </thead>
              <tbody>
                {antiPatterns.map((ap, i) => (
                  <tr key={ap.number} className={i % 2 === 0 ? 'bg-blue-50' : 'bg-white'}>
                    <td className="border border-gray-200 p-3 font-bold text-sky-blue">{ap.number}</td>
                    <td className="border border-gray-200 p-3 font-semibold">{ap.title}</td>
                    <td className="border border-gray-200 p-3 text-gray-600">{ap.rule}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-navy text-white py-16 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Get the full implementation roadmap</h2>
            <p className="text-gray-300 mb-6">Includes the printable anti-pattern audit scorecard, 30/60/90-day roadmap, and all templates from this guide. Free PDF.</p>
            <Link href="/resources" className="inline-block bg-sky-blue text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-600 transition-colors">
              Download Free (PDF) →
            </Link>
          </div>
        </section>

        {/* Related */}
        <section className="max-w-3xl mx-auto px-6 py-12">
          <h3 className="text-xl font-bold text-navy mb-6">Related Articles</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/knowledge/ai-assistant-identity" className="border-2 border-gray-200 rounded-lg p-4 hover:border-sky-blue transition-colors group">
              <div className="text-sm text-sky-blue font-medium mb-1">AI Identity</div>
              <h4 className="font-semibold text-navy group-hover:text-sky-blue transition-colors">How to Build a Scalable AI Assistant</h4>
            </Link>
            <Link href="/knowledge/mission-driven-systems" className="border-2 border-gray-200 rounded-lg p-4 hover:border-sky-blue transition-colors group">
              <div className="text-sm text-sky-blue font-medium mb-1">Operations</div>
              <h4 className="font-semibold text-navy group-hover:text-sky-blue transition-colors">Mission-Driven Systems: Why Most Processes Fail</h4>
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
