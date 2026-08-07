import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ChevronRight } from 'lucide-react'

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
    title: 'What AI Automation Actually Costs a Small Business in 2026',
    description:
      'DIY tools, a freelancer, or a managed AI operator — an honest breakdown of what each path actually costs a Westchester or NYC small business, and what drives the price.',
    date: 'August 7, 2026',
    href: '/blog/ai-automation-cost-westchester',
    tags: ['Pricing', 'AI Automation'],
  },
  {
    title: 'ChatGPT vs. Hiring an AI Consultant: Which Does Your Business Actually Need?',
    description:
      "ChatGPT is a tool you operate manually. An AI consultant builds a system that runs without you. Here's the honest difference, and how to know which one your business needs right now.",
    date: 'August 7, 2026',
    href: '/blog/chatgpt-vs-ai-consultant',
    tags: ['AI Tools', 'AI Consulting'],
  },
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
    <>
      {/* ---------------------------------------------------------- Hero --- */}
      <section className="relative isolate overflow-hidden px-6 pb-16 pt-[88px]">
        <div className="bloom-blue pointer-events-none absolute -top-[16rem] right-[10%] -z-10 h-[40rem] w-[40rem] rounded-full" />
        <div className="mx-auto max-w-[56rem]">
          <div className="mb-6 inline-flex h-7 items-center gap-2 rounded-full px-3 text-xs font-medium text-zinc-300 outline outline-1 outline-white/[0.12] [background:color-mix(in_oklab,#27272a_55%,#000)]">
            <span className="inline-block h-[5px] w-[5px] rounded-full bg-cyan-400" />
            Blog &amp; insights
          </div>

          <h1 className="max-w-[32rem] text-balance text-[clamp(2.5rem,5.5vw,3.5rem)] font-normal leading-[1.08] tracking-[-0.03em] text-white">
            Real lessons from building an AI agency
          </h1>

          <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-zinc-300">
            SEO mistakes, automation wins, and everything in between.
          </p>
        </div>
      </section>

      {/* --------------------------------------------------------- Posts --- */}
      {/* 1px gaps over a hairline background render the dividers between rows. */}
      <section className="px-6 pb-24">
        <div className="mx-auto flex max-w-[56rem] flex-col gap-px border-y border-white/10 bg-white/10">
          {posts.map((post) => (
            <article
              key={post.title}
              className="flex flex-col gap-6 bg-zinc-950 px-1 py-8 sm:flex-row sm:gap-8"
            >
              <div className="shrink-0 pt-0.5 text-[13px] text-zinc-400 sm:w-[7rem]">
                {post.date}
              </div>
              <div className="flex flex-1 flex-col gap-2.5">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/[0.07] px-2 py-[3px] text-[11px] font-medium tracking-[0.04em] text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-pretty text-[21px] font-medium leading-[1.25] tracking-[-0.02em] text-white">
                  {post.title}
                </h2>
                <p className="text-sm leading-relaxed text-zinc-400">{post.description}</p>
                {post.href ? (
                  <Link
                    href={post.href}
                    className="group mt-1 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-white"
                  >
                    Read article
                    <ArrowRight
                      size={15}
                      aria-hidden="true"
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </Link>
                ) : (
                  <span className="mt-1 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-zinc-400">
                    Coming soon
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ----------------------------------------------------- CTA panel --- */}
      <section className="px-6 pb-32">
        <div className="panel mx-auto flex max-w-[56rem] flex-wrap items-center justify-between gap-6 rounded-2xl px-6 py-12 sm:px-10">
          <div className="max-w-[30rem]">
            <h2 className="text-balance text-[26px] font-medium tracking-[-0.02em] text-white">
              Want the whole playbook instead?
            </h2>
            <p className="mt-2.5 text-[15px] leading-relaxed text-zinc-400">
              50 pages of frameworks, templates and a 30/60/90-day roadmap. Free with your email.
            </p>
          </div>
          <Link
            href="/resources"
            className="inline-flex h-11 items-center gap-1 rounded-full bg-white pl-5 pr-3 text-[15px] font-medium text-zinc-950 transition-opacity hover:opacity-90"
          >
            Get the guide
            <ChevronRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  )
}
