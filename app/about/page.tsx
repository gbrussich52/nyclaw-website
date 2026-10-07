// classification: PUBLIC
import type { Metadata } from 'next'
import Link from 'next/link'
import ArticleShell from '../components/ArticleShell'
import { CALENDLY_URL } from '../config'

export const metadata: Metadata = {
  title: 'About NYClaw',
  description: 'Meet Giani Brussich and learn how NYClaw builds practical AI and automation for small businesses in Westchester County and NYC.',
  openGraph: {
    title: 'About NYClaw',
    description: 'Practical AI and automation, starting with the work your team does every day.',
    url: 'https://nyclaw.io/about', type: 'website',
  },
  twitter: { card: 'summary', title: 'About NYClaw', description: 'The work, the founder and the way a NYClaw project starts.' },
  alternates: { canonical: 'https://nyclaw.io/about' },
}

export default function AboutPage() {
  return (
    <ArticleShell
      backHref="/" backLabel="Home"
      title="A useful build starts with understanding your day."
      deck="NYClaw builds practical AI and automation for small businesses in Westchester County and NYC. We start with the work, the people doing it and the tools already in place."
    >
      <h2>The work that keeps coming back</h2>
      <p>
        Replying to an inquiry. Preparing an estimate. Chasing a missing detail. Getting an
        invoice ready. These jobs matter to your customers, but moving each one forward can
        take more attention than it should.
      </p>
      <p>
        We work through one process with you, find where it stalls and check what your existing
        software can handle. The next step might be a better setting, a clearer handoff or a
        custom build. You should understand the recommendation before paying for the work.
      </p>

      <h2>What you can hire us for</h2>
      <ul>
        <li><Link href="/services/ai-automation">AI assistants and connected workflows</Link> for repeat tasks, draft preparation and moving approved information between tools.</li>
        <li><Link href="/services/ai-marketing">Marketing and follow-up systems</Link> with clear review rules and a way to see what happens to inquiries.</li>
        <li><Link href="/services/ai-consulting">Advice and written roadmaps</Link> when you want to decide what is worth changing before a build.</li>
      </ul>
      <p>
        For law firms, the <Link href="/law-firm-workflows">Workflow Blueprint</Link> examines
        one administrative handoff before you decide what to configure, build or keep manual.
        It is one specialist offer within NYClaw. NYClaw is not a law firm.
      </p>

      <h2>Real work, described plainly</h2>
      <p>
        The <Link href="/#work">approved client examples on the homepage</Link> describe work
        for Valentine Family Electric and Byram Mason, Building &amp; Stone Supply. They are
        specific builds, not a promise that every business will get the same result.
      </p>

      <h2>You should know what happens next</h2>
      <p>
        A free 30-minute call starts the conversation. Before paid work, we agree the job, price,
        access, timeline and how to check that it works. Builds include training and a written
        handoff. Ongoing help is a separate choice; software costs are discussed where they apply.
      </p>
      <p>
        Your team needs to know which steps run automatically, which need approval and who
        handles an exception. Agree those decisions before the system handles real work.
      </p>

      <h2>Meet the founder</h2>
      <p>
        Giani Brussich builds and operates NYClaw in Westchester County, New York. You can see
        his work and background on <a href="https://linkedin.com/in/gianib" target="_blank" rel="noopener noreferrer">LinkedIn</a>,{' '}
        <a href="https://github.com/gbrussich52" target="_blank" rel="noopener noreferrer">GitHub</a>{' '}
        and <a href="https://gianibrussich.com" target="_blank" rel="noopener noreferrer">gianibrussich.com</a>.
      </p>

      <div className="panel rounded-xl p-5">
        <p className="font-medium text-white">Tell us where work gets stuck.</p>
        <p className="text-zinc-300">Bring one recent example and the names of the tools involved. You do not need to prepare a technical brief.</p>
        <p><a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">Book a free 30-minute call</a>{' '}or <Link href="/#contact">send an inquiry</Link>.</p>
        <p className="text-sm text-zinc-400">Email: <a href="mailto:hello@nyclaw.io">hello@nyclaw.io</a></p>
      </div>
    </ArticleShell>
  )
}
