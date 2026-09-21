import type { Metadata } from 'next'
import ArticleShell from '../components/ArticleShell'

export const metadata: Metadata = {
  title: 'Terms of Service | NYClaw.io',
  description:
    "The terms governing use of NYClaw.io's website and AI automation services for Westchester County and NYC businesses.",
  alternates: {
    canonical: 'https://nyclaw.io/terms',
  },
}

export default function TermsPage() {
  return (
    <ArticleShell
      backHref="/"
      backLabel="Home"
      meta="Effective September 19, 2026"
      title="Terms of Service"
      deck="NYClaw.io is an AI automation and consulting agency serving Westchester County, NY and NYC.
      Using this site or engaging our services means you agree to the terms below."
    >
      <h2>Acceptance</h2>
      <p>
        By using this website or engaging NYClaw.io for services, you agree to these terms. If you
        don&apos;t agree, please don&apos;t use the site or our services.
      </p>

      <h2>Services scoped by written proposal</h2>
      <p>
        Every engagement is scoped by a written proposal before any work begins. The proposal sets
        the deliverables, timeline, and price. We don&apos;t guarantee specific business outcomes or
        results from any automation, agent, or consulting engagement; a proposal describes what we
        will build and deliver, not a promised financial result.
      </p>

      <h2>Intellectual property</h2>
      <p>
        NYClaw.io retains ownership of its own methodology, templates, and pre-existing tools used
        to deliver a project. Deliverables built specifically for a client become that
        client&apos;s property, per the written proposal governing that engagement.
      </p>

      <h2>Acceptable use</h2>
      <p>
        Use this site like a reasonable person. Don&apos;t scrape, bulk-download, or abuse our forms
        or infrastructure in a way that degrades the service for others, and don&apos;t
        misrepresent content from this site as something other than what it is.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, NYClaw.io and its operators are not liable for any
        indirect, incidental, or consequential loss or damage arising from use of this site or from
        an automation, agent, or consulting engagement. Use the site and our services at your own
        risk.
      </p>

      <h2>Governing law</h2>
      <p>These terms are governed by the laws of the State of New York, without regard to conflict-of-law principles.</p>

      <h2>Changes to these terms</h2>
      <p>
        We may update these terms as the business evolves. When we do, we&apos;ll revise the
        effective date above. Continued use of the site after a change means you accept the updated
        terms.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms? Email{' '}
        <a href="mailto:hello@nyclaw.io">hello@nyclaw.io</a>.
      </p>
    </ArticleShell>
  )
}
