// classification: PUBLIC
import type { Metadata } from 'next'
import Link from 'next/link'
import ArticleShell from '../components/ArticleShell'
import { CALENDLY_URL, FOUNDER } from '../config'

export const metadata: Metadata = {
  title: "About NYClaw and Giani Brussich",
  description: 'Giani Brussich has close to ten years in analytics and automation at Moody’s, Morgan Stanley, HomeServe and National Debt Relief. Through NYClaw he builds practical AI for small businesses in Westchester and NYC.',
  openGraph: {
    title: "About NYClaw and Giani Brussich",
    description: 'Why NYClaw exists, who builds the work and how a project runs.',
    url: 'https://nyclaw.io/about', type: 'website',
    images: ['https://nyclaw.io/opengraph-image'],
    siteName: "NYClaw.io",
  },
  twitter: { card: 'summary', images: ['https://nyclaw.io/opengraph-image'], title: "About NYClaw and Giani Brussich", description: 'Why NYClaw exists, who builds the work and how a project runs.' },
  alternates: { canonical: 'https://nyclaw.io/about' },
}

/** Career lines mirror what Giani publishes on gianibrussich.com and confirmed directly. No figures beyond those. */
const career = [
  { years: '2015 to 2020', org: 'Moody’s', what: 'Operations analysis, regulatory reporting and a Six Sigma process improvement project.' },
  { years: '2020 to 2023', org: 'Morgan Stanley', what: 'Assistant Vice President, Strategy and Solutions. Rolled out self-service reporting.' },
  { years: '2024 to 2025', org: 'HomeServe USA', what: 'Owned forecasting, monthly reporting and the budget for a subscription business.' },
  { years: 'Today', org: 'National Debt Relief', what: 'Revenue Analytics Manager on the Data and AI team. Forecasting, lead routing, agent performance and compliance monitoring.' },
] as const

export default function AboutPage() {
  return (
    <ArticleShell
      backHref="/" backLabel="Home"
      title="I help small businesses hand their busywork to AI."
      deck={`I’m ${FOUNDER.name}. I build AI and automation for owner-led businesses in Westchester County and New York City, and I do the work myself.`}
    >
      <h2>Why I started NYClaw</h2>
      <p>
        For close to ten years I have worked inside large companies, making their numbers and
        processes run better. Big companies have whole teams whose job is to automate the boring
        parts. A ten-person business has the same boring parts and nobody to fix them.
      </p>
      <p>
        That gap has closed fast. AI tools that once needed a team of engineers are now within
        reach of any small business. What owners still lack is the time to set them up and the
        confidence that nothing will break. That is the job I took on.
      </p>

      <h2>My background</h2>
      <ul>
        {career.map((c) => (
          <li key={c.org}><strong>{c.org}</strong> ({c.years}). {c.what}</li>
        ))}
      </ul>
      <p>
        One habit carries through all of it. Before a number drives a decision, I check it against
        the raw data. I build AI the same way: it gets tested on real examples before anyone relies on it.
      </p>
      <p>
        NYClaw is my own business, separate from my day job. None of these companies is a NYClaw client.
      </p>

      <h2>How I work</h2>
      <ul>
        <li><strong>One job first.</strong> We fix one thing that eats your week, not your whole business at once.</li>
        <li><strong>What you already pay for comes first.</strong> Sometimes the answer is a setting in software you own. If so, I will tell you.</li>
        <li><strong>You keep the final say.</strong> AI drafts. Your team decides what goes out and what needs a second look.</li>
        <li><strong>The price is in writing before you pay.</strong> Scope, cost and how we test it are agreed up front.</li>
        <li><strong>You are not stuck with me.</strong> Every build ends with training and plain instructions. Ongoing help is optional.</li>
      </ul>

      <h2>I use it myself</h2>
      <p>
        I run my own small businesses on the systems I build, including an online store and a
        video channel. Ad creative, customer emails, order alerts and video production all run
        through AI, with a person checking the parts that matter. You can see those
        builds on the <Link href="/work#own-operations">work page</Link>.
      </p>

      <h2>The examples, described plainly</h2>
      <p>
        The <Link href="/work">examples on the work page</Link> come from two friends who own local
        businesses, Valentine Family Electric and Byram Mason, Building &amp; Stone Supply. I advised
        them by phone on how to use AI in their work. They show the kind of problem I help with, not
        a promise that every business will get the same result.
      </p>

      <h2>What is in the name</h2>
      <p>
        NY for New York. Claw for OpenClaw, the open source AI agent project. NYClaw is not
        a law firm. For law firms I do offer one specialist service, the{' '}
        <Link href="/law-firm-workflows">Workflow Blueprint</Link>, which maps one office handoff
        before anything is built.
      </p>

      <h2>Where to find me</h2>
      <p>
        I live in northern Westchester with my family. You can see more of my work on{' '}
        <a href={FOUNDER.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>,{' '}
        <a href={FOUNDER.github} target="_blank" rel="noopener noreferrer">GitHub</a>{' '}
        and <a href={FOUNDER.site} target="_blank" rel="noopener noreferrer">gianibrussich.com</a>.
      </p>

      <div className="panel rounded-xl p-5">
        <p className="font-medium text-white">Bring me one task that keeps coming back.</p>
        <p className="text-zinc-300">You do not need a technical brief. A recent example and the names of the tools involved are plenty.</p>
        <p><a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">Book a free 30-minute call</a>{' '}or <Link href="/#contact">send a short note</Link>.</p>
        <p className="text-sm text-zinc-400">Email: <a href={`mailto:${FOUNDER.email}`}>{FOUNDER.email}</a></p>
      </div>
    </ArticleShell>
  )
}
