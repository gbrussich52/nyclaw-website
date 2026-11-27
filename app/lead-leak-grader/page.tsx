// classification: PUBLIC
import type { Metadata } from 'next'
import Link from 'next/link'
import { BreadcrumbJsonLd, SoftwareApplicationJsonLd } from '../components/JsonLd'
import { CALENDLY_URL, FREE_AUDIT_LABEL } from '../config'
import { CHECK_SPECS } from '../../lib/lead-leak/grade'
import LeadLeakGrader, { FixOfferActions } from './LeadLeakGrader'

const PAGE_URL = 'https://nyclaw.io/lead-leak-grader'
const TITLE = 'Lead Leak Grader: Free Website Contact Check'
const DESCRIPTION =
  'Free website check for local businesses. See every way a ready-to-buy customer can slip away, and how to fix each one. No email needed.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Lead Leak Grader | NYClaw.io',
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: 'NYClaw.io',
    type: 'website',
    images: ['https://nyclaw.io/opengraph-image'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lead Leak Grader | NYClaw.io',
    description: DESCRIPTION,
    images: ['https://nyclaw.io/opengraph-image'],
  },
}

/** Each fact keeps its source in the sentence. All sources read 2026-11-27. */
const stats = [
  {
    figure: '7x',
    text: 'A 2011 Harvard Business Review study by Oldroyd, McElheran and Elkington found that firms that contacted a lead within an hour were nearly 7 times as likely to qualify it as firms that waited longer.',
  },
  {
    figure: '100x',
    text: 'The Lead Response Management study (MIT and InsideSales, 2007) found that calling at 30 minutes instead of 5 cut the odds of reaching the lead 100 times.',
  },
  {
    figure: '42%',
    text: 'A 2024 mystery shop by Leadferno of 225 home services, professional and medical businesses found that 42% never replied to a contact form. The average reply took 17 hours and 49 minutes.',
  },
  {
    figure: '69%',
    text: 'Moneypenny found that 69% of callers who reach voicemail hang up without leaving a message.',
  },
  {
    figure: '28%',
    text: 'CallRail reports, from its own customer data, that 28% of calls to businesses go unanswered.',
  },
]

const sources = [
  { label: 'Oldroyd, McElheran and Elkington, "The Short Life of Online Sales Leads," Harvard Business Review, 2011', href: 'https://scholarsarchive.byu.edu/facpub/9711' },
  { label: 'Lead Response Management study, MIT and InsideSales, 2007', href: 'https://www.mortech.com/hs-fs/hub/25649/file-13535879-pdf/docs/mit_study.pdf' },
  { label: 'Leadferno 2024 mystery shop of 225 businesses, reported by Near Media', href: 'https://nearmedia.co/p/ee01b911-fc80-44ce-b314-6b04727b9f18' },
  { label: 'Moneypenny, small business call report', href: 'https://moneypenny.com/us/resources/news/small-business-call-report/' },
  { label: 'CallRail, missed calls and what they cost', href: 'https://www.callrail.com/blog/missed-calls-costing-your-business' },
  { label: 'U.S. Census Bureau QuickFacts, Westchester County, NY (County Business Patterns 2023)', href: 'https://www.census.gov/quickfacts/fact/table/westchestercountynewyork/BZA010223' },
]

const fixes = [
  'Tap-to-call links on every phone number',
  'Missed-call text-back, so a caller you miss gets a text in seconds',
  'Form auto-reply, so every inquiry hears back right away',
  'After-hours answering for nights and weekends',
  'A booking link customers can use without calling',
]

export default function LeadLeakGraderPage() {
  return (
    <>
      <SoftwareApplicationJsonLd
        name="Lead Leak Grader"
        description="Free tool that reads a local business homepage and scores how many ways a ready-to-buy customer can fail to reach the business."
        url={PAGE_URL}
      />
      <BreadcrumbJsonLd items={[{ name: 'Home', url: 'https://nyclaw.io' }, { name: 'Lead Leak Grader', url: PAGE_URL }]} />

      <section className="relative isolate overflow-hidden px-6 pb-16 pt-16 text-center">
        <div className="bloom-indigo pointer-events-none absolute -top-[18rem] left-1/2 -z-10 h-[46rem] w-[52rem] -translate-x-1/2 rounded-full" />
        <div className="hero-grid pointer-events-none absolute inset-0 -z-10" />
        <div className="mx-auto flex max-w-[52rem] flex-col items-center">
          <div className="inline-flex h-7 items-center gap-2 rounded-full px-3.5 text-xs font-medium text-zinc-300 outline outline-1 outline-white/[0.12] [background:var(--chip-bg)]">
            <span className="inline-block h-[5px] w-[5px] rounded-full bg-cyan-400" />
            Free tool. No email needed.
          </div>
          <h1 className="mt-6 text-balance text-[clamp(2.5rem,5.5vw,3.75rem)] font-normal leading-[1.06] tracking-[-0.03em] text-white">
            How many customers
            <br />
            <span className="text-gradient-ai">slip away from your website?</span>
          </h1>
          <p className="mt-6 max-w-[38rem] text-[17px] leading-relaxed text-zinc-300">
            Type your website address. In a few seconds you will see every way a customer who is
            ready to buy can fail to reach you, and how to fix each one.
          </p>
        </div>
      </section>

      <section className="px-6 pb-20">
        <LeadLeakGrader />
      </section>

      <section className="px-6 pb-20" aria-labelledby="what-we-check">
        <div className="mx-auto flex max-w-[64rem] flex-col gap-8">
          <div className="mx-auto flex max-w-[40rem] flex-col gap-4 text-center">
            <h2 id="what-we-check" className="text-balance text-[clamp(1.75rem,3.5vw,2.25rem)] font-medium leading-[1.15] tracking-[-0.025em] text-white">
              The {CHECK_SPECS.length} checks
            </h2>
            <p className="text-[17px] leading-relaxed text-zinc-300">
              Most free website graders look at speed and search rankings, then ask for your email
              before they show a score. This one looks at the moment a customer tries to reach you,
              and shows the score right away.
            </p>
          </div>
          <ol className="hairline-grid grid overflow-hidden rounded-sm border border-white/10 sm:grid-cols-2">
            {CHECK_SPECS.map((check, index) => (
              <li key={check.id} className="flex flex-col gap-2 p-6">
                <h3 className="text-sm font-medium text-white">
                  <span className="mr-2 text-zinc-500">{String(index + 1).padStart(2, '0')}</span>
                  {check.label}
                  <span className="ml-2 text-[12px] font-normal text-zinc-500">{check.weight} points</span>
                </h3>
                <p className="text-sm leading-relaxed text-zinc-400">{check.why}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-6 pb-20" aria-labelledby="why-it-matters">
        <div className="mx-auto flex max-w-[56rem] flex-col gap-8">
          <div className="mx-auto flex max-w-[40rem] flex-col gap-4 text-center">
            <h2 id="why-it-matters" className="text-balance text-[clamp(1.75rem,3.5vw,2.25rem)] font-medium leading-[1.15] tracking-[-0.025em] text-white">
              Why this matters
            </h2>
            <p className="text-[17px] leading-relaxed text-zinc-300">
              A customer who is ready to buy calls, texts or fills in a form. If nobody answers
              fast, they try the next name on the list. Westchester County alone has 31,174
              businesses with employees, according to the Census Bureau&apos;s County Business
              Patterns for 2023. There is always a next name.
            </p>
          </div>
          <ul className="flex flex-col gap-3">
            {stats.map((stat) => (
              <li key={stat.figure} className="panel flex flex-col gap-2 rounded-xl p-6 sm:flex-row sm:items-start sm:gap-6">
                <span className="w-20 shrink-0 text-3xl font-medium tracking-[-0.03em] text-white">{stat.figure}</span>
                <p className="text-[15px] leading-relaxed text-zinc-300">{stat.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="lead-leak-fix" className="scroll-mt-28 px-6 pb-20" aria-labelledby="fix-offer">
        <div className="mx-auto max-w-[64rem]">
          <div className="panel relative isolate overflow-hidden rounded-2xl px-6 py-16 text-center sm:px-10">
            <div className="bloom-blue pointer-events-none absolute left-1/2 top-0 -z-10 h-[24rem] w-[36rem] -translate-x-1/2 rounded-full" />
            <p className="text-[13px] font-medium uppercase tracking-[0.12em] text-cyan-300">48-hour Lead Leak Fix</p>
            <h2 id="fix-offer" className="mt-3 text-balance text-[clamp(1.75rem,3.5vw,2.25rem)] font-medium leading-[1.15] tracking-[-0.025em] text-white">
              We fix every failed check in 48 hours.
            </h2>
            <p className="mx-auto mt-4 max-w-[36rem] text-[17px] leading-relaxed text-zinc-300">
              From $2,500, fixed price. You tell us how you like to work, we set it up and test it
              with you. The clock starts once we have access to your website.
            </p>
            <ul className="mx-auto mt-6 flex max-w-[30rem] flex-col gap-2 text-left text-[15px] text-zinc-300">
              {fixes.map((fix) => (
                <li key={fix} className="flex gap-3"><span aria-hidden="true" className="text-cyan-300">+</span>{fix}</li>
              ))}
            </ul>
            <FixOfferActions contactHref="/#contact" callHref={CALENDLY_URL} callLabel={FREE_AUDIT_LABEL} />
            <p className="mt-6 text-sm text-zinc-400">
              Want more than the front door fixed? See our{' '}
              <Link href="/services/ai-automation" className="text-zinc-200 underline underline-offset-4 hover:text-white">automation services</Link>{' '}
              or try the free{' '}
              <Link href="/ai-workflows" className="text-zinc-200 underline underline-offset-4 hover:text-white">workflow kits</Link>.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 pb-32" aria-labelledby="sources">
        <div className="mx-auto flex max-w-[56rem] flex-col gap-4">
          <h2 id="sources" className="text-lg font-medium text-white">Sources</h2>
          <p className="text-sm text-zinc-400">Each source was read on November 27, 2026.</p>
          <ol className="flex list-decimal flex-col gap-2 pl-5 text-sm text-zinc-400">
            {sources.map((source) => (
              <li key={source.href}>
                <a href={source.href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-white">{source.label}</a>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-[13px] leading-relaxed text-zinc-500">
            How the grader works: it reads your public homepage once, with a plain request that
            names itself as NYClawLeadLeakGrader. It never submits a form, places a call or sends a
            message. It does not store the page or your address. A pass means we found the signal
            in the page code; tools that load only after a click may not show up.
          </p>
        </div>
      </section>
    </>
  )
}
