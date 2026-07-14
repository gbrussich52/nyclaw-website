import type { Metadata } from 'next'
import Link from 'next/link'
import { ArticleJsonLd, FAQJsonLd } from '../../components/JsonLd'

export const metadata: Metadata = {
  title: '5 AI Automations Every Dental Practice Should Be Running',
  description:
    'Dental practices lose thousands monthly to no-shows, missed follow-ups, and review gaps. These five AI automations fix each one without changing your existing dental software.',
  keywords:
    'ai for dental practices, dental practice automation, ai dental office, dental patient follow-up automation, dental practice ai tools, reduce no-shows dentist',
  openGraph: {
    title: '5 AI Automations Every Dental Practice Should Be Running',
    description:
      'Multi-touch reminders cut no-shows 30-50%. Automated review requests 3-5x monthly volume. Reactivation campaigns fill 10-20% of dormant patients.',
    url: 'https://nyclaw.io/blog/ai-automations-dental',
    type: 'article',
    siteName: 'NYClaw.io',
  },
  twitter: {
    card: 'summary_large_image',
    title: '5 AI Automations Every Dental Practice Should Be Running',
    description:
      'Multi-touch reminders cut no-shows 30-50%. Automated review requests 3-5x monthly volume. Reactivation campaigns fill 10-20% of dormant patients.',
  },
  alternates: {
    canonical: 'https://nyclaw.io/blog/ai-automations-dental',
  },
}

const faqItems = [
  {
    question: 'How does AI reduce no-shows at a dental practice?',
    answer:
      'A multi-touch AI reminder sequence sends messages at 7 days, 48 hours, and the morning of the appointment — each personalized with the patient name, appointment type, and time. Studies show multi-touch sequences reduce no-shows 30-50% compared to a single day-before reminder. At $150-400 per missed slot, even a 20% reduction has material revenue impact.',
  },
  {
    question: 'Can AI help a dental practice get more Google reviews?',
    answer:
      'Yes. An AI sends a review request automatically after a positive appointment signal — a patient who confirmed, showed up, and did not flag issues. Short message, direct link to the Google Business Profile, sent within 2 hours of the appointment when satisfaction is highest. Dental practices using automated review requests typically see 3-5x their monthly Google review volume within 90 days.',
  },
  {
    question: 'What is a dental patient reactivation campaign?',
    answer:
      'A reactivation campaign identifies patients who have not been in for 18+ months, sends a personalized message referencing their last visit and noting they are due for a cleaning or exam, and includes a direct booking link. AI handles the identification and outreach automatically. Well-run campaigns convert 10-20% of dormant patients into booked appointments without any ad spend.',
  },
  {
    question: 'Does AI for dental offices replace front desk staff?',
    answer:
      'No. AI handles the automated communication layer: reminder sequences, review requests, reactivation outreach, and intake form delivery. Your front desk still handles complex scheduling, patient questions, insurance verification, and anything requiring real judgment. AI removes the repetitive follow-up work so staff can focus on higher-value patient interactions.',
  },
  {
    question: 'How long does it take to set up AI automation for a dental practice?',
    answer:
      'A basic implementation — appointment reminders, review requests, and reactivation sequences — can be running in 1-2 weeks. It does not require replacing your existing practice management software (Dentrix, Eaglesoft, OpenDental). The AI operates through SMS and email channels alongside your existing systems.',
  },
]

export default function BlogPost() {
  return (
    <>
      <ArticleJsonLd
        title="5 AI Automations Every Dental Practice Should Be Running"
        description="Dental practices lose thousands monthly to no-shows, missed follow-ups, and review gaps. These five AI automations fix each one without changing existing software."
        url="https://nyclaw.io/blog/ai-automations-dental"
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
              <span className="text-gray-300">Healthcare Automation</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
              5 AI Automations Every Dental Practice{' '}
              <span className="text-dark-red">Should Be Running</span>
            </h1>
            <p className="text-lg text-gray-300">
              No-shows, overdue patients, and review gaps cost dental practices thousands per month. Here is how to fix all of it without replacing your existing software.
            </p>
            <div className="mt-6 flex items-center gap-4 text-sm text-gray-400">
              <time dateTime="2026-04-29">April 29, 2026</time>
              <span>|</span>
              <span>Updated June 16, 2026</span>
              <span>|</span>
              <span>8 min read</span>
            </div>
          </div>
        </header>

        <div className="py-16 px-6">
          <div className="max-w-3xl mx-auto prose-custom">

            <section className="mb-14">
              <div className="bg-gray-50 border-l-4 border-sky-blue pl-6 py-4 mb-8 rounded-r-lg">
                <p className="text-charcoal leading-relaxed font-medium">
                  <strong>The five automations:</strong> (1) Multi-touch appointment reminder sequences that cut no-shows 30-50%, (2) reactivation campaigns for patients overdue 18+ months, (3) post-treatment follow-up, (4) automated Google review requests that 3-5x monthly volume, and (5) digital new patient intake before the first visit. None require replacing Dentrix, Eaglesoft, or OpenDental.
                </p>
              </div>
              <p className="text-charcoal leading-relaxed mb-4">
                Most dental practices in New York City and Westchester County run the same manual processes they ran ten years ago. Appointment reminders go out via a staff member making calls. Review requests get sent inconsistently, if at all. New patient follow-ups fall through the cracks between the front desk and treatment coordinator.
              </p>
              <p className="text-charcoal leading-relaxed mb-4">
                None of that requires a human. All of it is costing real money.
              </p>
              <p className="text-charcoal leading-relaxed">
                Based on NYClaw.io&apos;s work with healthcare-adjacent businesses across the New York metro area, <strong>the average dental practice has 3-4 of these five automations missing entirely</strong> — representing $40,000-$120,000 in recoverable annual revenue from no-shows, lapsed patients, and lost review-driven referrals.
              </p>
            </section>

            <section className="mb-14">
              <h2 className="text-2xl md:text-3xl font-bold text-navy mb-8">The 5 Automations</h2>

              <div className="space-y-10">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-8 rounded-full bg-dark-red text-white font-bold flex items-center justify-center text-sm flex-shrink-0">1</span>
                    <h3 className="text-xl font-bold text-navy">Appointment Reminder Sequences That Actually Reduce No-Shows</h3>
                  </div>
                  <p className="text-charcoal leading-relaxed mb-4">
                    The standard: one reminder the day before. The problem: one reminder is not enough, and it is often too late to fill the slot if the patient cancels.
                  </p>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-4">
                    <p className="font-medium text-navy mb-2">A well-configured sequence:</p>
                    <ul className="space-y-2 text-charcoal">
                      <li><strong>7 days out</strong>: Confirmation + link to reschedule if needed</li>
                      <li><strong>48 hours out</strong>: Reminder with parking and what to bring</li>
                      <li><strong>Day of</strong>: Final nudge with address and a call number</li>
                    </ul>
                  </div>
                  <p className="text-charcoal leading-relaxed">
                    Each message is personalized — patient name, appointment type, time — and goes out via SMS or email. Multi-touch sequences reduce no-shows by <strong>30–50%</strong> compared to single reminders. At $150–400 per missed appointment, the math compounds quickly.
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-8 rounded-full bg-dark-red text-white font-bold flex items-center justify-center text-sm flex-shrink-0">2</span>
                    <h3 className="text-xl font-bold text-navy">Reactivation Campaigns for Overdue Patients</h3>
                  </div>
                  <p className="text-charcoal leading-relaxed mb-4">
                    Every practice has a list of patients who have not been in for 18+ months. Most practices do nothing with that list because running a reactivation campaign manually takes time they do not have.
                  </p>
                  <p className="text-charcoal leading-relaxed">
                    An AI campaign handles it automatically: identify who is overdue, send a warm outreach message that references their last visit and notes it is time for a cleaning, and include a direct booking link. Reactivation campaigns convert <strong>10–20% of dormant patients</strong>. For a practice with 300 overdue patients, that is 30–60 new appointments without ad spend.
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-8 rounded-full bg-dark-red text-white font-bold flex items-center justify-center text-sm flex-shrink-0">3</span>
                    <h3 className="text-xl font-bold text-navy">Post-Treatment Follow-Up</h3>
                  </div>
                  <p className="text-charcoal leading-relaxed mb-4">
                    After a filling, an extraction, or any procedure with recovery, patients appreciate a check-in. An AI sends a follow-up 24–48 hours post-treatment: &quot;How are you feeling? Let us know if anything does not feel right.&quot;
                  </p>
                  <p className="text-charcoal leading-relaxed">
                    This surfaces problems early before they become complaints, and creates a genuine patient care touchpoint that drives loyalty and referrals. It also creates a documented record of post-treatment contact — relevant for practices mindful of liability exposure.
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-8 rounded-full bg-dark-red text-white font-bold flex items-center justify-center text-sm flex-shrink-0">4</span>
                    <h3 className="text-xl font-bold text-navy">Review Request Automation</h3>
                  </div>
                  <p className="text-charcoal leading-relaxed mb-4">
                    Google reviews drive new patient acquisition more than almost anything else. Most dental practices get reviews inconsistently because asking manually feels awkward and gets deprioritized.
                  </p>
                  <p className="text-charcoal leading-relaxed">
                    An AI review request goes out automatically after a positive appointment signal. Short message, direct link to your Google Business Profile, sent within 2 hours of the visit. Requests sent within 2 hours of a positive appointment get <strong>3–5x higher conversion</strong> than those sent days later. Every eligible patient gets asked, every time, at the right moment.
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-8 rounded-full bg-dark-red text-white font-bold flex items-center justify-center text-sm flex-shrink-0">5</span>
                    <h3 className="text-xl font-bold text-navy">New Patient Intake Before the First Visit</h3>
                  </div>
                  <p className="text-charcoal leading-relaxed mb-4">
                    Paper forms in the waiting room are a 1990s solution. An AI intake flow sends digital forms 48 hours before a new patient&apos;s first appointment, follows up if they are not submitted, and answers common intake questions automatically.
                  </p>
                  <p className="text-charcoal leading-relaxed">
                    By the time the patient walks in, their chart is ready, chair time is not eaten up by paperwork, and the first impression is organized and professional — which directly impacts whether they return and whether they refer.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-14 bg-navy text-white rounded-xl p-8 md:p-10 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">See What This Looks Like for Your Practice</h2>
              <p className="text-gray-300 text-lg mb-6 max-w-xl mx-auto">
                We walk through the actual systems, actual setup, and actual ROI math for your practice size. Free workshop, no commitment.
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
                  <p className="text-sm text-gray-500 mb-2">AI Agency — New York City &amp; Westchester</p>
                  <p className="text-charcoal text-sm leading-relaxed">
                    NYClaw.io builds AI automation systems for dental practices, medical offices, and healthcare-adjacent businesses across the New York metro area. We focus on measurable patient retention and revenue recovery, not theoretical AI capabilities.
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
                <Link href="/blog/ai-automations-medical" className="text-sky-blue hover:text-dark-red font-medium transition-colors">AI for Medical Practices →</Link>
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
