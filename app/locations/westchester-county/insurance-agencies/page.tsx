/* PUBLIC — NYClaw industry-by-area page copy. */
// Grok Bot (Crack Bot), 2026-11-23, why: answers "ai for insurance agencies" search (Google autocomplete:
// "ai tools for insurance agencies", "ai automation for insurance agents", "ai for independent insurance agencies")
// for Westchester agencies (daily Google loop, rotation site nyclaw.io).
// Rule facts, read 2026-11-23 (copies in storied-seo/sources/nyclaw-2026-11-23/): 23 NYCRR 500.1(e) covered entity
// (license under the Insurance Law), 500.1(s) third-party service provider (access to nonpublic information), 500.11 third-party service provider policies, 500.12 multi-factor authentication
// (limited-exemption scope), 500.19(a) limited exemption (fewer than 20 people, under $7.5M revenue, or under $15M
// assets; 500.11 and 500.12 are not on its list), all via Cornell LII; DFS Industry Letter of October 16, 2024,
// "Cybersecurity Risks Arising from Artificial Intelligence and Strategies to Combat Related Risks" (no new
// requirements; vendor due diligence; AI-specific contract terms; data minimization covers NPI used for AI).
// Workflows below are possible examples, not client results. Prices are the ones the location pages already list.
import type { Metadata } from 'next'
import Link from 'next/link'
import { FileCheck2, RefreshCcw, Inbox, PhoneForwarded, ShieldCheck, ClipboardList } from 'lucide-react'
import { BreadcrumbJsonLd, FAQJsonLd, ServiceJsonLd } from '../../../components/JsonLd'
import FaqSection from '../../../components/FaqSection'
import LocationHero from '../../_components/LocationHero'
import SectionIntro from '../../_components/SectionIntro'
import ProcessSteps from '../../_components/ProcessSteps'
import LocationCta from '../../_components/LocationCta'
import InternalLinks from '../../_components/InternalLinks'
import { CALENDLY_URL } from '../../../config'

const PAGE_URL = 'https://nyclaw.io/locations/westchester-county/insurance-agencies'

export const metadata: Metadata = {
  title: 'AI for Insurance Agencies, Westchester NY',
  description:
    'AI for insurance agencies in Westchester: renewal, certificate and quote follow-ups with staff review, set up with New York DFS Part 500 rules in mind.',
  keywords:
    'AI for insurance agencies, AI for insurance agencies Westchester, AI automation for insurance agents, AI tools for insurance agencies, independent insurance agency AI Westchester NY',
  openGraph: {
    title: 'AI for Insurance Agencies in Westchester, NY | NYClaw.io',
    description:
      'Possible AI workflows for Westchester insurance agencies, from certificate requests to renewal reminders, with a licensed person approving what goes out.',
    url: PAGE_URL,
    siteName: 'NYClaw.io',
    type: 'website',
    locale: 'en_US',
    images: ['https://nyclaw.io/opengraph-image'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI for Insurance Agencies in Westchester, NY | NYClaw.io',
    description:
      'AI workflow help for Westchester insurance agencies, scoped around DFS Part 500. Start with a free 30-minute call.',
    images: ['https://nyclaw.io/opengraph-image'],
  },
  alternates: {
    canonical: PAGE_URL,
  },
}

const workflows = [
  {
    Icon: FileCheck2,
    label: 'Certificate requests',
    desc: 'A commercial client emails for a certificate of insurance. A draft could pull the policy details into your usual form, and a CSR checks the holder and any special wording before it is sent.',
  },
  {
    Icon: RefreshCcw,
    label: 'Renewal reminders',
    desc: 'A list of policies coming up for renewal could turn into dated tasks and draft emails asking for updated details, so no account waits until the last week.',
  },
  {
    Icon: ClipboardList,
    label: 'Missing documents',
    desc: 'When an application is missing a signature or a form, a tracker could list what is still out and draft polite reminders, with a person choosing when to send them.',
  },
  {
    Icon: Inbox,
    label: 'Quote follow-up',
    desc: 'Quotes that went out and heard nothing back could get a short follow-up draft and a note for the producer. See our quote follow-up workflow guide for the shape of it.',
  },
  {
    Icon: PhoneForwarded,
    label: 'Claims questions',
    desc: 'A web form or voicemail about a claim could be sorted and sent to the right staff member fast. Any advice on coverage stays with your licensed staff.',
  },
  {
    Icon: ShieldCheck,
    label: 'Vendor and access check',
    desc: 'Before any AI tool touches client data, we list where that data goes, who can log in and what the vendor contract says, so the agency can review it under its own Part 500 program.',
  },
]

const phases = [
  {
    step: 'Scope',
    title: 'Pick one queue',
    desc: 'Choose one pile that keeps growing, such as certificate requests. We look at what your agency management system and email already do before adding anything.',
  },
  {
    step: 'Build',
    title: 'Written quote, then connect',
    desc: 'The quote names each tool, where client data flows, the price and the delivery timing. Nothing outside that list gets built.',
  },
  {
    step: 'Handoff',
    title: 'Test with your staff',
    desc: 'Your CSRs run the agreed test cases with us. We leave a runbook and note which steps always need a licensed person.',
  },
]

const explore = [
  { label: 'AI for Westchester Businesses', href: '/locations/westchester-county' },
  { label: 'AI for White Plains Businesses', href: '/locations/white-plains' },
  { label: 'AI for Yonkers Businesses', href: '/locations/yonkers' },
  { label: 'Quote follow-up workflow', href: '/ai-workflows/quote-followup' },
  { label: 'AI Automation', href: '/services/ai-automation' },
  { label: 'AI Consulting', href: '/services/ai-consulting' },
]

const breadcrumbs = [
  { name: 'Home', url: 'https://nyclaw.io' },
  { name: 'Westchester County', url: 'https://nyclaw.io/locations/westchester-county' },
  { name: 'Insurance Agencies', url: PAGE_URL },
]

const faqs = [
  {
    question: 'Does New York’s cybersecurity rule apply to my insurance agency?',
    answer:
      'If your agency operates under a license from the New York Insurance Law, it likely does. DFS’s cybersecurity regulation, 23 NYCRR Part 500, defines a covered entity as anyone operating under a license, registration or similar authorization under the Banking Law, the Insurance Law or the Financial Services Law. Check your own status with your compliance adviser; we do not give legal advice.',
  },
  {
    question: 'We are a small agency. Are we exempt?',
    answer:
      'Only in part. Section 500.19(a) gives a limited exemption to a covered entity with fewer than 20 employees and contractors, under $7.5 million in yearly revenue in each of the last three years, or under $15 million in assets. That exemption does not remove the rules on third-party service providers (500.11) or multi-factor authentication (500.12).',
  },
  {
    question: 'What does Part 500 mean for an AI tool?',
    answer:
      'An outside AI vendor that keeps, processes or can access your nonpublic information fits Part 500’s definition of a third-party service provider. Your written vendor policies then apply to it, and they should cover its access controls, its encryption and how it will tell you about a cyber event. Under 500.12, an agency with the limited exemption still needs multi-factor authentication for remote access to its systems, for cloud apps that hold nonpublic information, and for privileged accounts.',
  },
  {
    question: 'Has DFS said anything about AI itself?',
    answer:
      'Yes. On October 16, 2024, DFS sent an industry letter on cybersecurity risks from AI. It adds no new rules. It explains how to use Part 500 for AI risks, such as deepfake phishing and vendor risk, and suggests extra contract terms when a vendor uses AI. It also notes that the duty to dispose of nonpublic information you no longer need covers data used for AI.',
  },
  {
    question: 'Will AI send anything to clients on its own?',
    answer:
      'Not unless you choose that in the written scope. The workflows on this page draft, sort and remind. A CSR or producer approves what goes out, and coverage questions stay with licensed staff. These are possible workflows, not client results.',
  },
  {
    question: 'How much does it cost, and can we meet in person?',
    answer:
      'Listed prices are $3,500–$8,000 for an agent sprint and $5,000–$15,000 for a workflow system. The opening 30-minute call has no charge, and a written roadmap is $1,000–$2,500. NYClaw.io is a Westchester-based service-area practice: we meet clients in person when the work calls for it, or work remotely. We do not publish a storefront street address.',
  },
]

export default function WestchesterInsuranceAgenciesPage() {
  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <FAQJsonLd items={faqs} />
      <ServiceJsonLd
        name="AI workflow automation for insurance agencies"
        description="Scoped AI and workflow automation for Westchester County insurance agencies: certificate requests, renewal reminders, missing documents and quote follow-up, with staff review."
        url={PAGE_URL}
      />

      <LocationHero
        badge="Insurance agencies in Westchester, NY"
        titleTop="AI for Insurance"
        titleAccent="Agencies in Westchester"
        lede="AI for insurance agencies works best on the queues your CSRs already dread: certificates, renewals and missing forms."
        blurb="We map one queue, use what your agency system and email already do, and build only the missing links. A licensed person approves what goes to clients, and the written scope lists every tool for your DFS Part 500 review."
        primary={{ label: 'Book a free 30-minute call', href: CALENDLY_URL, external: true }}
        secondary={{ label: 'Tell us which queue is stuck', href: '/#contact' }}
      />

      <section className="px-6 pb-24">
        <div className="mx-auto flex max-w-[44rem] flex-col gap-10">
          <SectionIntro eyebrow="Where Time Goes" title="The Work Behind Each Policy" />
          <div className="flex flex-col gap-5 text-[17px] leading-relaxed text-zinc-300">
            <p>
              Most agency owners who search for AI for insurance agencies are not after a chatbot.
              They want the same email, form and reminder to stop eating a CSR’s morning. A
              certificate request, a renewal that needs new details, an application missing one
              signature: each is small, and together they fill the day.
            </p>
            <p>
              In New York there is one more step. An agency licensed under the Insurance Law is
              usually a covered entity under DFS’s cybersecurity rule, 23 NYCRR Part 500. So any
              tool that reads client data has to fit your vendor policy and your multi-factor
              login rules before it goes live, even at a small agency.
            </p>
            <p>
              We start there. The written scope lists where client data goes, which vendor holds it
              and who can log in, so your compliance lead can review it. Then we build the drafts,
              trackers and routing your team agreed to, and test them with your staff.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto flex max-w-[64rem] flex-col gap-12">
          <SectionIntro
            eyebrow="Possible Workflows"
            title="AI Workflows a Westchester Agency Might Start With"
            blurb="Examples to discuss, not client results. What fits depends on your agency system, your carriers and who signs off."
          />
          <div className="hairline-grid grid overflow-hidden rounded-sm border border-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {workflows.map(({ Icon, label, desc }) => (
              <div key={label} className="flex flex-col gap-3 p-9">
                <div className="flex items-center gap-2">
                  <Icon size={16} strokeWidth={1.75} className="text-white" aria-hidden="true" />
                  <h3 className="text-sm font-medium text-white">{label}</h3>
                </div>
                <p className="text-sm leading-relaxed text-zinc-400">{desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-zinc-400">
            See the{' '}
            <Link href="/ai-workflows/quote-followup" className="font-medium text-white underline underline-offset-4">
              quote follow-up workflow guide
            </Link>
            , or{' '}
            <Link href="/locations/westchester-county" className="font-medium text-white underline underline-offset-4">
              AI for Westchester County businesses
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto flex max-w-[56rem] flex-col gap-10">
          <SectionIntro
            eyebrow="Our Process"
            title="One Queue, Then a Tested Handoff"
            blurb="Timing depends on your tools and who must approve access. It is written down before we begin."
          />
          <ProcessSteps items={phases} />
        </div>
      </section>

      <FaqSection
        blurb="Common questions from Westchester insurance agencies about AI and New York’s cybersecurity rule. General information, not legal advice."
        items={faqs}
      />

      <LocationCta
        eyebrow="Westchester insurance agencies"
        title="Which queue would you clear first?"
        blurb="Book a free 30-minute call. Bring one queue, the systems you use and the name of whoever reviews vendors."
      />

      <InternalLinks links={explore} />
    </>
  )
}
