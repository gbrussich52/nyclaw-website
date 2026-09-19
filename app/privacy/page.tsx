import type { Metadata } from 'next'
import ArticleShell from '../components/ArticleShell'

export const metadata: Metadata = {
  title: 'Privacy Policy | NYClaw.io',
  description:
    'How NYClaw.io collects and uses your information — no accounts, no cookies, no data sold. Contact hello@nyclaw.io anytime.',
  alternates: {
    canonical: 'https://nyclaw.io/privacy',
  },
}

export default function PrivacyPage() {
  return (
    <ArticleShell
      backHref="/"
      backLabel="Home"
      meta="Effective September 19, 2026"
      title="Privacy Policy"
      deck="NYClaw.io collects the minimum information needed to respond to your inquiry or send you a
      requested guide. This page explains exactly what that means."
    >
      <h2>What we collect</h2>
      <p>We collect information only when you choose to give it to us, through one of three forms:</p>
      <ul>
        <li>
          The homepage contact/project form — your name, business email, business type, what you
          want built first, and an optional message describing your workflow.
        </li>
        <li>
          The homepage newsletter form — your email address, to send the free AI Readiness Guide.
        </li>
        <li>
          The Resources page guide form — your first name, email, and an optional company name, to
          send the free AI Operator&apos;s Playbook PDF.
        </li>
      </ul>
      <p>
        We also use Vercel Web Analytics and Vercel Speed Insights, both cookieless. They report
        aggregate traffic and performance data and never build a personally identifying profile of
        individual visitors.
      </p>

      <h2>How we use it</h2>
      <p>
        We use the information you submit to respond to your inquiry or send you the guide you
        requested — nothing else. We never sell, rent, or share your information with any third
        party, advertiser, or data broker.
      </p>

      <h2>No accounts</h2>
      <p>
        NYClaw.io has no visitor-facing accounts or logins anywhere on the site. There is nothing to
        sign up for and no password to create as a visitor.
      </p>

      <h2>Cookies &amp; analytics</h2>
      <p>
        NYClaw.io is cookieless. Vercel Web Analytics and Vercel Speed Insights don&apos;t use
        cookies and don&apos;t track you individually across sites, so there&apos;s nothing that
        requires a cookie consent banner and we don&apos;t show one.
      </p>

      <h2>Retention</h2>
      <p>
        We keep submitted information as long as needed to respond to your inquiry or send the
        requested guide, and you can ask us to delete your data at any time by emailing{' '}
        <a href="mailto:hello@nyclaw.io">hello@nyclaw.io</a>.
      </p>

      <h2>Your rights</h2>
      <p>
        You can ask to see what information we have about you, or ask us to delete it, at any time
        by emailing <a href="mailto:hello@nyclaw.io">hello@nyclaw.io</a>. No account or
        verification process is required — just tell us the email address you used.
      </p>

      <h2>DMCA</h2>
      <p>
        If you believe content on this site infringes your copyright, contact our designated agent
        at <a href="mailto:dmca@nyclaw.io">dmca@nyclaw.io</a>. Full takedown procedure:{' '}
        <a href="/dmca">DMCA &amp; Copyright Policy</a>.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        If we change how we handle information, we&apos;ll update this page and revise the
        effective date above.
      </p>
    </ArticleShell>
  )
}
