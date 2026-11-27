import type { Metadata } from 'next'
import { ArticleJsonLd, FAQJsonLd } from '../../components/JsonLd'
import ArticleShell from '../../components/ArticleShell'
import { AuthorBio, Callout, CtaPanel, FaqSection } from '../_components/post'

const TITLE = 'Overdue Invoice Follow-Up for Law Firms: What Clio Already Covers'
const DESCRIPTION =
  'Before building anything for overdue legal bills, check what Clio bill reminders already do, what stays manual, and where a person must approve the message.'
const URL = 'https://nyclaw.io/blog/law-firm-overdue-invoice-follow-up'

export const metadata: Metadata = {
  title: "Overdue Invoice Follow-Up for Law Firms",
  description: "Check what Clio bill reminders already cover, what stays manual, and where staff must approve overdue-invoice messages before you automate anything.",
  keywords:
    'law firm overdue invoice follow up, Clio bill reminders, law firm collections reminders, law firm billing automation',
  openGraph: {
    title: "Overdue Invoice Follow-Up for Law Firms",
    description: "Check what Clio bill reminders already cover, what stays manual, and where staff must approve overdue-invoice messages before you automate anything.",
    url: URL,
    type: 'article',
    siteName: 'NYClaw.io',
    images: ["https://nyclaw.io/opengraph-image"],
  },
  twitter: { card: 'summary_large_image', title: "Overdue Invoice Follow-Up for Law Firms", description: "Check what Clio bill reminders already cover, what stays manual, and where staff must approve overdue-invoice messages before you automate anything.",
    images: ["https://nyclaw.io/opengraph-image"],
  },
  alternates: { canonical: URL },
}

const CLIO = 'https://help.clio.com/hc/en-us/articles/9285345945243-Send-and-Automate-Bill-Reminders'

const faqItems = [
  {
    question: 'Does Clio already send automatic reminders for overdue bills?',
    answer:
      "Clio's help center describes automated bill reminders that run on a schedule, alongside one-time manual reminders. Plan availability and settings vary, so confirm your own plan and configuration with Clio before assuming either way.",
  },
  {
    question: 'Should an overdue-invoice reminder ever go out without staff review?',
    answer:
      'Start with review. A reminder about a disputed bill, a client in hardship, or a balance already covered by a payment plan can damage the relationship. Consider unattended sending only for a narrow, low-risk reminder type the firm has approved in writing.',
  },
  {
    question: 'What is a good outcome if custom automation is not worth it?',
    answer:
      'Turning on and tuning the reminders you already pay for, a weekly review of the outstanding-balances list, and a written rule for who handles disputes. If that closes the gap, nothing custom needs to be built.',
  },
  {
    question: 'Does this article give legal, ethics or trust-accounting advice?',
    answer:
      "No. It describes an operations workflow. Rules on billing, collections, client communication and trust accounts are decisions for the firm's attorneys and the applicable bar rules.",
  },
]

export default function BlogPost() {
  return (
    <>
      <ArticleJsonLd
        title={TITLE}
        description={DESCRIPTION}
        url={URL}
        datePublished="2026-11-16"
        dateModified="2026-11-16"
      />
      <FAQJsonLd items={faqItems} />

      <ArticleShell
        backHref="/blog"
        backLabel="Blog"
        tags={['Legal Operations']}
        meta="November 16, 2026 · 5 min read"
        title={TITLE}
        deck="Before building anything for late payments, find out what your billing software already sends, what it leaves to a person, and who approves a sensitive message."
        related={[
          { href: '/blog/law-firm-missing-document-follow-up', title: 'Missing-Document Follow-Up for Law Firms' },
          { href: '/blog/ai-law-firm-client-intake', title: 'AI for Law Firm Client Intake' },
          { href: '/law-firm-workflows', title: 'Law-Firm Workflows' },
        ]}
      >
        <Callout>
          <strong>The short answer:</strong> Overdue-invoice follow-up is mostly a configuration
          question before it is an AI question. Check what your billing software already
          reminds, list the cases it cannot judge, and automate at most the drafting of messages
          that a staff member then approves.
        </Callout>

        <p>
          This is a companion to our{' '}
          <a href="/blog/law-firm-missing-document-follow-up">missing-document follow-up</a> and{' '}
          <a href="/blog/ai-law-firm-client-intake">client intake</a> articles. Those cover the
          front of a matter. This one covers the other end: a bill went out and has not been paid.
        </p>

        <h2>The manual handoff today</h2>
        <p>
          Someone exports or opens the list of unpaid bills, decides which ones are worth a nudge,
          checks whether the client has a dispute, a payment plan or a pending trust transfer,
          writes the note, and sends it. The following week it happens again. The judgment calls
          are the real work; the typing is not.
        </p>

        <h2>Check native features first</h2>
        <p>
          Clio&apos;s help center describes two kinds of bill reminder: a manual one-time balance
          notice, and automated reminders on a schedule. It says the automated cadence is
          calculated from the issue date of the client&apos;s oldest unpaid bill, that turning
          reminders on for a client covers all of that client&apos;s matters and approved bills, and
          that reminders can be switched off for individual bills from the Outstanding Balances
          subtab (
          <a href={CLIO}>Clio: Send and Automate Bill Reminders</a>
          , found via search 2026-11-16; direct page fetch was blocked in this run, so confirm the
          current wording yourself).
        </p>
        <p>
          The same help article, as summarized in search results on 2026-11-16, says reminders
          pause for clients on active payment plans that deposit into an Operating account, but
          not for plans that deposit into Trust. That is a detail a firm should verify in its own
          account, because a reminder that arrives during an agreed payment plan is exactly the
          kind of message a person should have caught. Availability depends on plan and region;
          Clio&apos;s own pages are the source of truth.
        </p>

        <h2>What native reminders do not decide</h2>
        <ul>
          <li>Whether this client is disputing the bill or has asked for an adjustment.</li>
          <li>Whether tone should change for a long-standing client or a hardship situation.</li>
          <li>Whether a payment was received outside the system and not yet recorded.</li>
          <li>When a balance should stop being a reminder and become an attorney conversation.</li>
        </ul>
        <p>
          Those are the places where a custom workflow could help, and also the places where a
          person must stay in charge.
        </p>

        <h2>The workflow worth assessing</h2>
        <ol>
          <li>
            <strong>Agreed rules.</strong> An attorney or partner approves which balances get a
            reminder, the wording options and the attempt limit.
          </li>
          <li>
            <strong>Read-only list.</strong> The unpaid-bills list is reviewed. Nothing is posted,
            charged or changed.
          </li>
          <li>
            <strong>Flag exceptions.</strong> Disputes, payment plans, recent contact and
            anything uncertain are held back, not guessed.
          </li>
          <li>
            <strong>Staff-approved draft.</strong> A draft lists the invoice and amount from the
            record. A staff member edits or rejects it before it goes anywhere.
          </li>
          <li>
            <strong>Stop or escalate.</strong> After the agreed attempts, or on any client reply
            with a question, the item goes to a person and reminders stop.
          </li>
        </ol>

        <h2>A fictional expected output</h2>
        <div className="panel rounded-xl p-6">
          <p>
            <strong>Firm:</strong> Example Family Law LLP, fictional client &quot;Sam Example&quot;
          </p>
          <ul>
            <li>Invoice EX-1042: unpaid, issued before the firm&apos;s agreed threshold</li>
            <li>Flag: client emailed last week about a line item (hold, route to attorney)</li>
            <li>Invoice EX-1051: unpaid, no dispute noted, no payment plan on record</li>
            <li>
              Draft reminder for EX-1051 (awaiting approval): &quot;Hello Sam, a friendly note that
              invoice EX-1051 is still open. Let us know if you have questions about it.&quot;
            </li>
            <li>Next step: staff approve or edit, send, and stop at the agreed attempt limit</li>
          </ul>
        </div>
        <p>
          A fictional plan like this can be sketched at{' '}
          <a href="https://legalaimcp.com/workflow-plan?utm_source=nyclaw&utm_medium=referral&utm_campaign=law_firm_workflows">
            LegalAIMCP
          </a>
          , which NYClaw operates. It uses no client files and is only a planning aid.
        </p>

        <h2>Exceptions and the human approval point</h2>
        <p>
          Anything involving a dispute, a trust account, a payment plan, a client in distress or a
          possible fee-related ethics question goes to a person. No message goes to a client
          without staff approval until the firm has deliberately decided otherwise for one
          specific low-risk message. This workflow never charges a card, posts a payment or sends
          on its own.
        </p>

        <h2>A useful no-build outcome</h2>
        <p>
          Often the right answer is to switch on and tune the reminders you already own, add a
          weekly look at the outstanding-balances list, and write down who handles disputes. An
          assessment that concludes nothing needs to be built is a good result.
        </p>

        <CtaPanel
          title="Assess One Billing Handoff Before You Automate It"
          blurb="For law-firm owners and operations leads: map the handoff, check your existing tools, and decide where staff approval is needed. Start with a free fit call; any follow-on assessment fee and scope are agreed in writing."
          href="/law-firm-workflows#request-blueprint"
          label="Request a Workflow Blueprint Review"
        />

        <AuthorBio>
          NYClaw.io designs AI workflow assessments for law firms and other service businesses in
          the New York metro area. This article uses fictional examples only and makes no claim of
          measured time savings, collections results or legal compliance.
        </AuthorBio>

        <h2>Frequently Asked Questions</h2>
        <FaqSection items={faqItems} />
      </ArticleShell>
    </>
  )
}
