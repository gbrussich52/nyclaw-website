import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, ChevronRight } from 'lucide-react'
import ArticleShell from '../../components/ArticleShell'

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
    what: 'Documentation that exists but becomes stale, contradictory, or duplicated. The danger isn\'t missing docs — it\'s outdated docs that create false confidence.',
    symptom: 'Files say different things. Nobody knows which is correct. "We\'ll update this later" is a common phrase.',
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
    what: 'Building elaborate systems, templates, and workflows that look productive but don\'t move the needle on actual outcomes.',
    symptom: '"Getting ready to get ready." More time designing the task system than doing tasks. Beautiful Notion dashboard, abandoned after 2 weeks.',
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
    what: 'Work enters a system, never gets reviewed, stalls indefinitely, and eventually nobody remembers it was supposed to happen.',
    symptom: '"We should do this someday." Tasks with no owner, no date, no review. The backlog becomes a graveyard.',
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
    what: 'The document says one thing; actual behavior says another. Over time the gap grows and the document becomes irrelevant.',
    symptom: 'Enron had "Integrity" in their values. Circuit City had an extensive customer service mission. Both failed while ignoring their stated values.',
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
    what: 'Consistently underestimating how long things take and overestimating how much can be done in any timeframe.',
    symptom: '70%+ of software projects overrun estimated timelines. Individual estimates are typically off by 1.5-2x. The larger the project, the worse the estimate.',
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
    what: 'Too many tools, integrations, and systems. Each adds small overhead. Together, they consume massive cognitive load.',
    symptom: 'Notion + Asana + Trello + Slack + Linear + Airtable. None talk to each other. More time updating tools than doing work.',
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
    what: 'Continuing to invest in a project because of past investment rather than future potential.',
    symptom: '"We\'ve already spent 3 months on this." Features nobody uses, channels that don\'t convert, tools that slow everyone down — but switching feels expensive.',
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
      <ArticleShell
        backHref="/knowledge"
        backLabel="Knowledge Base"
        tags={['Anti-Patterns', 'Small Teams', 'Implementation']}
        meta="10 min read"
        title="Operational Excellence for Small Teams: Avoiding 7 Critical Anti-Patterns"
        deck="The failure modes we hit building NYClaw.io — and specific prevention systems for each one."
        cta={{
          href: '/resources',
          label: 'Get the printable anti-pattern audit scorecard',
          blurb: 'Full implementation roadmap (PDF, free).',
        }}
        related={[
          {
            href: '/knowledge/ai-assistant-identity',
            title: 'How to Build a Scalable AI Assistant',
            blurb: 'AI Identity',
          },
          {
            href: '/knowledge/mission-driven-systems',
            title: 'Mission-Driven Systems: Why Most Processes Fail',
            blurb: 'Operations',
          },
        ]}
      >
        <p>
          Small teams fail at operations for the same reasons every time. It&apos;s not lack of
          talent, wrong tools, or insufficient budget. It&apos;s seven specific, identifiable
          patterns — and every single one is preventable if you know what to look for.
        </p>

        {/* Each anti-pattern is a self-contained card, so it opts out of prose flow. */}
        {antiPatterns.map((ap) => (
          <section key={ap.number} className="panel overflow-hidden rounded-2xl">
            <div className="flex items-start gap-4 border-b border-white/10 bg-white/[0.03] p-6">
              <div className="text-gradient-metric shrink-0 text-[34px] font-semibold leading-none tracking-[-0.04em]">
                {ap.number}
              </div>
              <div>
                <h2 className="mt-0 text-xl font-medium tracking-[-0.01em] text-white">
                  {ap.title}
                </h2>
                <p className="mt-1 text-sm text-zinc-400">{ap.subtitle}</p>
              </div>
            </div>

            <div className="flex flex-col gap-5 p-6">
              <div>
                <h3 className="mt-0 text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-400">
                  What It Is
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-zinc-300">{ap.what}</p>
              </div>

              <div className="rounded-lg border border-white/10 border-l-[3px] border-l-indigo-500 bg-white/[0.03] p-4">
                <h3 className="mt-0 text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-400">
                  Symptoms
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-300">{ap.symptom}</p>
              </div>

              <div>
                <h3 className="mt-0 text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-400">
                  Prevention System
                </h3>
                <ul className="mt-2 list-none space-y-1.5 pl-0">
                  {ap.fix.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-zinc-300">
                      <Check
                        size={16}
                        className="mt-0.5 shrink-0 text-cyan-400"
                        aria-hidden="true"
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="rounded-lg bg-white/[0.06] px-4 py-3 text-sm text-zinc-300">
                <span className="font-medium text-cyan-400">The Rule: </span>
                {ap.rule}
              </p>
            </div>
          </section>
        ))}

        <h2>Quick Reference: All 7 Anti-Patterns</h2>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Anti-Pattern</th>
              <th>Key Fix</th>
            </tr>
          </thead>
          <tbody>
            {antiPatterns.map((ap) => (
              <tr key={ap.number}>
                <td>{ap.number}</td>
                <td>{ap.title}</td>
                <td>{ap.rule}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="panel relative isolate mt-16 overflow-hidden rounded-2xl px-6 py-14 text-center sm:px-10">
          <div className="bloom-indigo pointer-events-none absolute -bottom-[10rem] left-1/2 -z-10 h-[22rem] w-[32rem] -translate-x-1/2 rounded-full" />
          <h2 className="mt-0 text-[clamp(1.625rem,3vw,2rem)] font-medium leading-[1.15] tracking-[-0.025em] text-white">
            Get the full implementation roadmap
          </h2>
          <p className="mx-auto mt-3.5 max-w-[32rem] text-base leading-relaxed text-zinc-300">
            Includes the printable anti-pattern audit scorecard, 30/60/90-day roadmap, and all
            templates from this guide. Free PDF.
          </p>
          <div className="mt-7 flex justify-center">
            <Link
              href="/resources"
              className="inline-flex h-11 items-center gap-1 rounded-full bg-white pl-5 pr-3 text-[15px] font-medium text-zinc-950 no-underline transition-opacity hover:opacity-90"
            >
              Download Free (PDF)
              <ChevronRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </ArticleShell>
    </>
  )
}
