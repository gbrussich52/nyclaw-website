import type { Metadata } from 'next'
import ArticleShell from '../components/ArticleShell'
import { CALENDLY_URL } from '../config'

export const metadata: Metadata = {
  title: 'About NYClaw.io',
  description:
    'NYClaw.io is an AI agency that designs and builds custom automations and agents for small businesses in Westchester County, NY and NYC.',
  openGraph: {
    title: 'About NYClaw.io',
    description:
      'AI agency that designs and builds custom automations and agents for small businesses in Westchester County, NY and NYC.',
    url: 'https://nyclaw.io/about',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'About NYClaw.io',
    description:
      'AI agency that designs and builds custom automations and agents for small businesses in Westchester County, NY and NYC.',
  },
  alternates: {
    canonical: 'https://nyclaw.io/about',
  },
}

export default function AboutPage() {
  return (
    <ArticleShell
      backHref="/"
      backLabel="Home"
      title="About NYClaw.io"
      deck="We design and build custom AI automations and agents for small businesses — not a one-size install of someone else's product."
    >
      <h2>What we do</h2>
      <p>
        NYClaw.io is an AI agency. We map a business&apos;s real workflows, then design and build
        the automation or agent that saves it the most time — lead response, scheduling, CRM
        updates, follow-ups, intake, research, and internal ops. Work is scoped and delivered as
        a project or sprint, with a documented handoff so a team can run what we build. No monthly
        retainer is required to start; ongoing monitoring and iteration are available if wanted,
        never bundled by default.
      </p>

      <h2>Who we serve</h2>
      <p>
        Small businesses in Westchester County, NY and New York City — contractors, real estate,
        legal services, healthcare, retail, and hospitality among them. Two real client builds are
        detailed on the <a href="/#work">homepage</a>: an estimating-to-invoice automation for
        Valentine Family Electric, and a structured multi-model AI workflow for Byram Mason,
        Building &amp; Stone Supply.
      </p>

      <h2>How we work</h2>
      <p>
        Every build starts with the OODA Loop — Observe, Orient, Decide, Act — so the first thing
        we build is the highest-ROI workflow, not a random tool stack. Engagements start with a
        free 15-minute fit audit; if a deeper plan is needed, we scope a prioritized automation
        roadmap before any full build begins.
      </p>

      <h2>Founder</h2>
      <p>
        NYClaw.io is built and operated by Giani Brussich. Profiles:{' '}
        <a href="https://linkedin.com/in/gianib" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        ,{' '}
        <a href="https://github.com/gbrussich52" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        , and{' '}
        <a href="https://gianibrussich.com" target="_blank" rel="noopener noreferrer">
          gianibrussich.com
        </a>
        .
      </p>

      <div className="panel rounded-xl p-5">
        <p className="font-medium text-white">Get in touch</p>
        <p className="text-zinc-300">
          Email: <a href="mailto:hello@nyclaw.io">hello@nyclaw.io</a>
        </p>
        <p className="mt-2 text-sm text-zinc-400">
          Or{' '}
          <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
            book the free 15-minute fit audit
          </a>
          .
        </p>
      </div>
    </ArticleShell>
  )
}
