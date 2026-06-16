import type { Metadata } from 'next'
import Link from 'next/link'
import { ArticleJsonLd, FAQJsonLd } from '../../components/JsonLd'

export const metadata: Metadata = {
  title: 'How NYC Plumbers Are Losing Thousands Every Month to Missed Calls',
  description:
    'NYC plumbing and HVAC contractors miss 20-30% of inbound calls during peak hours — each one a potential $500-$5,000 job. Here is how AI agents capture every lead and close more estimates.',
  keywords:
    'ai for plumbers, plumbing business automation, hvac business ai, plumber lead follow-up, ai for contractors nyc, missed call text back plumber',
  openGraph: {
    title: 'How NYC Plumbers Are Losing Thousands Every Month to Missed Calls',
    description:
      'Every unanswered call is a job that goes to a competitor. AI agents respond within 60 seconds, qualify leads, and run follow-up sequences automatically.',
    url: 'https://nyclaw.io/blog/ai-automations-plumbing-hvac',
    type: 'article',
    siteName: 'NYClaw.io',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How NYC Plumbers Are Losing Thousands Every Month to Missed Calls',
    description:
      'Every unanswered call is a job that goes to a competitor. AI responds in 60 seconds.',
  },
  alternates: {
    canonical: 'https://nyclaw.io/blog/ai-automations-plumbing-hvac',
  },
}

const faqItems = [
  {
    question: 'How do AI agents help plumbing and HVAC businesses capture more leads?',
    answer:
      'When a caller hits voicemail, an AI agent texts them back within 60 seconds: acknowledges the missed call, asks what they need, and starts the conversation immediately. This converts voicemails into live exchanges before the caller dials the next number. The AI also qualifies the lead — what is the issue, what borough, is it residential or commercial, what is the timeline — so you return to a prioritized list instead of a stack of cold voicemails.',
  },
  {
    question: 'How much revenue do NYC plumbers lose to missed calls?',
    answer:
      'The average plumbing or HVAC business in NYC misses 20-30% of inbound calls during peak hours. Each missed call is a potential $500-$5,000 job. For a business doing $600,000 per year, that represents $120,000-$180,000 in potential annual revenue lost — not from bad service, but from response time. AI cannot capture all of it, but a 10-15 point improvement in conversion rate on existing call volume is material.',
  },
  {
    question: 'What is an estimate follow-up sequence for contractors?',
    answer:
      'Most contractors give an estimate and follow up once or twice before giving up. An AI follow-up sequence sends messages at day 2, day 5, and day 10 after the estimate — each one warm and personalized to the job, not a generic reminder. Contractors using systematic follow-up sequences close 20-40% more estimates that would otherwise go cold.',
  },
  {
    question: 'Can AI handle after-hours leads for plumbing businesses?',
    answer:
      'Yes. AI has no off hours. When an emergency call comes in at 11pm, the AI responds immediately, collects the key details (what is the issue, address, can they shut off the water), and either books an emergency appointment or flags it for a callback. By the time the job is booked, the competitor who let it go to voicemail is still asleep.',
  },
  {
    question: 'Does AI for contractors replace a dispatcher?',
    answer:
      'No. AI handles overflow — the calls and texts that come in when your dispatcher is on another line, when the technician is on a crawlspace, or after business hours. It covers the gaps without adding headcount. Larger shops still need dispatchers for complex scheduling and job management. AI is the layer that ensures nothing leaks while the human dispatcher is unavailable.',
  },
]

export default function BlogPost() {
  return (
    <>
      <ArticleJsonLd
        title="How NYC Plumbers Are Losing Thousands Every Month to Missed Calls"
        description="NYC plumbing and HVAC contractors miss 20-30% of inbound calls during peak hours. Here is how AI agents capture every lead and close more estimates."
        url="https://nyclaw.io/blog/ai-automations-plumbing-hvac"
        datePublished="2026-04-29"
        dateModified="2026-06-16"
      />
      <FAQJsonLd items={faqItems} />

      <article className="min-h-screen bg-white">
        <header className="bg-navy text-white py-16 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 text-sky-blue text-sm font-medium mb-6">
              <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
              <span>/</span>
              <span className="text-gray-300">Contractor Automation</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
              How NYC Plumbers Are Losing Thousands Every Month{' '}
              <span className="text-dark-red">to Missed Calls</span>
            </h1>
            <p className="text-lg text-gray-300">
              Every unanswered call is a job that goes to your competitor. Here is how NYC contractors are capturing every lead, 24/7.
            </p>
            <div className="mt-6 flex items-center gap-4 text-sm text-gray-400">
              <time dateTime="2026-04-29">April 29, 2026</time>
              <span>|</span>
              <span>Updated June 16, 2026</span>
              <span>|</span>
              <span>7 min read</span>
            </div>
          </div>
        </header>

        <div className="py-16 px-6">
          <div className="max-w-3xl mx-auto prose-custom">

            <section className="mb-14">
              <div className="bg-gray-50 border-l-4 border-sky-blue pl-6 py-4 mb-8 rounded-r-lg">
                <p className="text-charcoal leading-relaxed font-medium">
                  <strong>The short answer:</strong> NYC plumbing and HVAC contractors miss 20-30% of inbound calls during peak hours. Each missed call is a potential $500-$5,000 job. An AI agent texts back within 60 seconds, qualifies the lead, and runs follow-up sequences automatically — capturing revenue that currently goes to whichever competitor answers first.
                </p>
              </div>
              <p className="text-charcoal leading-relaxed mb-4">
                A pipe bursts at 11pm. The homeowner grabs their phone and calls the first three plumbers in their contacts. The one who answers gets the job. The other two get a voicemail they will check in the morning — after the job is already booked.
              </p>
              <p className="text-charcoal leading-relaxed mb-4">
                That is the reality of service contracting in New York. Speed wins. And most plumbing and HVAC businesses are losing that race multiple times per week.
              </p>
              <p className="text-charcoal leading-relaxed">
                Based on NYClaw.io&apos;s work with NYC-area contractors, <strong>a typical 4-6 person plumbing or HVAC shop in the Bronx, Brooklyn, or Westchester is losing $8,000-$15,000 per month in potential revenue to missed calls and cold estimates</strong> — not from bad service, but from response time and follow-up gaps.
              </p>
            </section>

            <section className="mb-14">
              <h2 className="text-2xl md:text-3xl font-bold text-navy mb-6">The Problem Is Structure, Not Effort</h2>
              <p className="text-charcoal leading-relaxed mb-4">
                Small and mid-size contractors are not losing jobs because they are slow. They are losing them because they are on a job site when the phone rings. They are answering with grease on their hands. They are finishing a call at 6pm when the next lead comes in at 6:15.
              </p>
              <p className="text-charcoal leading-relaxed mb-4">
                The average plumbing or HVAC business misses <strong>20–30% of inbound calls</strong> during peak hours. Each missed call is a potential $500–$5,000 job depending on scope. For a business doing $600K/year, that is potentially $120K–$180K in lost revenue — not from bad service, from bad response time.
              </p>
            </section>

            <section className="mb-14">
              <h2 className="text-2xl md:text-3xl font-bold text-navy mb-6">What AI Actually Fixes</h2>

              <div className="space-y-8">
                <div className="border-l-4 border-dark-red pl-6">
                  <h3 className="text-lg font-bold text-navy mb-2">Instant call and text response</h3>
                  <p className="text-charcoal leading-relaxed">
                    When a lead calls and hits voicemail, an AI texts them back within 60 seconds: &quot;Hey, this is [Business Name] — we just missed your call. What&apos;s going on? We&apos;ll get you a quote fast.&quot; That single message converts a voicemail into a live conversation before your competitor even sees the missed call notification. It runs at 11pm, on weekends, on every job site day.
                  </p>
                </div>

                <div className="border-l-4 border-dark-red pl-6">
                  <h3 className="text-lg font-bold text-navy mb-2">Lead qualification while you are on a job</h3>
                  <p className="text-charcoal leading-relaxed">
                    The AI collects the basics — what is the issue, what borough or neighborhood (Bronx, Queens, Manhattan, Westchester), residential or commercial, is it an emergency or routine, are they the owner or a tenant. When you get a break, you have a qualified lead waiting with context — not a stack of cold voicemails to sort through one by one.
                  </p>
                </div>

                <div className="border-l-4 border-dark-red pl-6">
                  <h3 className="text-lg font-bold text-navy mb-2">Estimate follow-up sequences</h3>
                  <p className="text-charcoal leading-relaxed">
                    You give an estimate, the homeowner says &quot;I will think about it.&quot; Most contractors follow up once, maybe twice. An AI runs a proper sequence — day 2, day 5, day 10 — with messages that are warm and human, not spammy. Contractors using follow-up sequences close <strong>20–40% more estimates</strong> that would otherwise go cold.
                  </p>
                </div>

                <div className="border-l-4 border-dark-red pl-6">
                  <h3 className="text-lg font-bold text-navy mb-2">Review requests after completed jobs</h3>
                  <p className="text-charcoal leading-relaxed">
                    Word of mouth built plumbing businesses for decades. Google reviews are the new word of mouth. An AI sends a review request automatically 24 hours after a job closes. For a contractor with 20 Google reviews competing against a competitor with 80, this is a meaningful acquisition channel — not a nice-to-have.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-14">
              <h2 className="text-2xl md:text-3xl font-bold text-navy mb-6">What This Looks Like for a Real NYC Contractor</h2>
              <p className="text-charcoal leading-relaxed mb-4">
                Take a 4-person plumbing shop in the Bronx doing residential and light commercial work. They were booking 60–70% of their inbound leads — solid, but leaving 30–40% on the table from missed calls and slow follow-ups.
              </p>
              <p className="text-charcoal leading-relaxed mb-6">After adding AI response automation:</p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
                <ul className="space-y-3 text-charcoal">
                  <li className="flex items-start gap-3">
                    <span className="text-sky-blue font-bold mt-0.5">→</span>
                    <span>First response time dropped from 2–4 hours to under 2 minutes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-sky-blue font-bold mt-0.5">→</span>
                    <span>Estimate follow-up became systematic instead of &quot;when I remember&quot;</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-sky-blue font-bold mt-0.5">→</span>
                    <span>Google reviews went from 12 total to 40+ over one year</span>
                  </li>
                </ul>
              </div>
              <p className="text-charcoal leading-relaxed">
                A 10–15 point improvement in close rate, compounding over a year, is material for a business at that revenue level. The AI does not close the entire gap — some leads were never serious, some go with the cheapest option — but it captures the ones that slipped through purely because no one was available to respond.
              </p>
            </section>

            <section className="mb-14 bg-navy text-white rounded-xl p-8 md:p-10 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">See the Actual System</h2>
              <p className="text-gray-300 text-lg mb-6 max-w-xl mx-auto">
                Free workshop for NYC plumbing, HVAC, and contracting businesses — the actual tools, the actual setup, the actual impact on your close rate.
              </p>
              <Link href="/workshop" className="btn-red inline-block text-lg px-8 py-3">
                Register for the Free Workshop →
              </Link>
            </section>

            <section className="mb-14 border border-gray-200 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-navy rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">N</div>
                <div>
                  <p className="font-bold text-navy">NYClaw.io</p>
                  <p className="text-sm text-gray-500 mb-2">AI Implementation Agency — New York City &amp; Westchester</p>
                  <p className="text-charcoal text-sm leading-relaxed">
                    NYClaw.io builds AI automation systems for contractors, tradespeople, and service businesses across the New York metro area — including plumbing, HVAC, electrical, and general contracting in the Bronx, Brooklyn, Queens, Manhattan, and Westchester County.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-14">
              <h2 className="text-2xl md:text-3xl font-bold text-navy mb-8">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {faqItems.map((item, i) => (
                  <div key={i} className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-bold text-navy mb-3">{item.question}</h3>
                    <p className="text-charcoal leading-relaxed">{item.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="text-center py-8 border-t border-gray-200">
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <Link href="/blog/ai-automations-car-dealerships" className="text-sky-blue hover:text-dark-red font-medium transition-colors">AI for Car Dealerships →</Link>
                <Link href="/blog/ai-automation-small-business-nyc" className="text-sky-blue hover:text-dark-red font-medium transition-colors">AI for NYC Small Business →</Link>
                <Link href="/services/ai-automation" className="text-sky-blue hover:text-dark-red font-medium transition-colors">AI Automation Services →</Link>
                <Link href="/blog" className="text-sky-blue hover:text-dark-red font-medium transition-colors">← Back to Blog</Link>
              </div>
            </section>

          </div>
        </div>
      </article>
    </>
  )
}
