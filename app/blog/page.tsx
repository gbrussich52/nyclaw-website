import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Insights on AI implementation, website SEO, automation, and small business technology from NYClaw.io — an AI agency serving Westchester County, NY and NYC.',
  openGraph: {
    title: 'Blog | NYClaw.io',
    description:
      'Insights on AI implementation, website SEO, automation, and small business technology.',
    url: 'https://nyclaw.io/blog',
  },
  alternates: {
    canonical: 'https://nyclaw.io/blog',
  },
}

const posts = [
  {
    title: "I Built a CLI That Turns RevenueCat's Charts API Into a Subscription Health Dashboard",
    description:
      "How I built revenuecat-pulse — a Python CLI that fetches MRR, churn, and subscription metrics from RevenueCat's Charts API, renders a terminal dashboard with sparklines, and uses Claude AI to generate strategic health insights.",
    date: 'April 22, 2026',
    href: '/blog/revenuecat-pulse',
    tags: ['Open Source', 'RevenueCat', 'Ainsley'],
  },
  {
    title: "I Audited My Own AI Agency's Website. It Was Invisible to Google.",
    description:
      "We ran a full SEO audit on our own site and discovered the entire homepage was client-rendered — Google couldn't see a single word. Here's what went wrong and exactly how we fixed it.",
    date: 'April 7, 2026',
    href: '/blog/i-audited-my-own-website',
    tags: ['SEO', 'Next.js', 'Case Study'],
  },
  {
    title: 'How Law Firms Are Using AI to Handle Client Intake Without Hiring More Staff',
    description:
      "AI responds within 60 seconds, qualifies leads, schedules consultations, and runs follow-up — so attorneys spend time on billable work, not inbox management. The math: slow intake costs a $3,000 average case firm $312,000/year in lost leads.",
    date: 'April 29, 2026',
    href: '/blog/ai-law-firm-client-intake',
    tags: ['Legal', 'AI Automation', 'Lead Intake'],
  },
  {
    title: '5 Things NYC Small Business Owners Are Automating in 2026',
    description:
      'Lead response within 5 minutes, multi-touch follow-up sequences, appointment automation, review requests, and customer reactivation — the five systems separating NYC businesses that convert from those that lose leads to competitors.',
    date: 'April 29, 2026',
    href: '/blog/ai-automation-small-business-nyc',
    tags: ['Small Business', 'NYC', 'AI Automation'],
  },
  {
    title: 'Why Zapier Cannot Replace a Real AI Agent (And What Can)',
    description:
      "Zapier executes rules you write in advance. AI agents make decisions using context. The difference determines which tool actually solves your business problem — and why 70% of the automation wins businesses need require an AI layer.",
    date: 'April 29, 2026',
    href: '/blog/zapier-vs-ai-agent',
    tags: ['AI Tools', 'Automation', 'Zapier'],
  },
  {
    title: '5 AI Automations Every Dental Practice Should Be Running',
    description:
      'Multi-touch appointment reminders cut no-shows 30-50%. Reactivation campaigns fill 10-20% of lapsed patients. Automated review requests 3-5x monthly Google volume. None of this requires changing Dentrix or Eaglesoft.',
    date: 'April 29, 2026',
    href: '/blog/ai-automations-dental',
    tags: ['Dental', 'Healthcare', 'AI Automation'],
  },
  {
    title: '5 AI Automations Every NYC Medical Practice Should Be Running',
    description:
      'NYC medical practices lose $30,000-$80,000/year to no-shows, lapsed patients, and poor review volume. These five automations fix all of it without replacing your EMR — and without adding headcount.',
    date: 'April 29, 2026',
    href: '/blog/ai-automations-medical',
    tags: ['Medical', 'Healthcare', 'AI Automation'],
  },
  {
    title: 'How NYC Plumbers Are Losing Thousands Every Month to Missed Calls',
    description:
      "NYC plumbing and HVAC contractors miss 20-30% of inbound calls during peak hours. Each missed call is a $500-$5,000 job. AI agents text back within 60 seconds, qualify the lead, and run follow-up sequences automatically.",
    date: 'April 29, 2026',
    href: '/blog/ai-automations-plumbing-hvac',
    tags: ['Contractors', 'Plumbing', 'HVAC'],
  },
  {
    title: 'How NYC Car Dealers Are Closing More Deals Without Hiring More Staff',
    description:
      'Internet leads convert 5x better when contacted within 30 minutes. Most dealers respond in 2-10 hours. AI closes that gap — plus trade-in follow-up sequences, service drive retention, and automated Google review requests.',
    date: 'April 29, 2026',
    href: '/blog/ai-automations-car-dealerships',
    tags: ['Automotive', 'Dealerships', 'AI Automation'],
  },
  {
    title: 'How to Set Up Your AI with OpenClaw',
    description:
      'Step-by-step guide to setting up an AI entrepreneur on your Mac, including initial configuration and first revenue tracking.',
    date: 'Coming Soon',
    href: null,
    tags: ['Tutorial', 'OpenClaw'],
  },
  {
    title: 'Building an AI Influencer: The Sarah Case Study',
    description:
      'Everything we learned building Sarah — character design, UGC generation with Nano Banana, affiliate partnerships, and social media strategy.',
    date: 'Coming Soon',
    href: null,
    tags: ['Case Study', 'AI Marketing'],
  },
  {
    title: 'Affiliate Monetization: From Zero to First Sale',
    description:
      'How we monetized the Rumble Simulator with sports betting affiliates, including link optimization, testing, and revenue tracking.',
    date: 'Coming Soon',
    href: null,
    tags: ['Monetization', 'Affiliates'],
  },
]

export default function Blog() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-navy mb-4">Blog & Insights</h1>
        <p className="text-lg text-charcoal mb-12">
          Real lessons from building an AI agency — SEO mistakes, automation wins, and
          everything in between.
        </p>

        <div className="space-y-8">
          {posts.map((post, i) => (
            <article
              key={i}
              className="border border-gray-200 rounded-lg p-6 hover:border-sky-blue transition-colors"
            >
              <div className="flex flex-wrap gap-2 mb-3">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium bg-gray-100 text-sky-blue px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="text-2xl font-bold text-navy mb-2">{post.title}</h2>
              <p className="text-sm text-charcoal/60 mb-4">{post.date}</p>
              <p className="text-charcoal mb-4 leading-relaxed">{post.description}</p>
              {post.href ? (
                <Link
                  href={post.href}
                  className="text-sky-blue font-bold hover:text-dark-red transition-colors"
                >
                  Read Article →
                </Link>
              ) : (
                <span className="text-charcoal/40 font-bold">Coming Soon</span>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
