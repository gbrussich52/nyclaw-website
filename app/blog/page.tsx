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
    title: "I Audited My Own AI Agency's Website. It Was Invisible to Google.",
    description:
      "We ran a full SEO audit on our own site and discovered the entire homepage was client-rendered — Google couldn't see a single word. Here's what went wrong and exactly how we fixed it.",
    date: 'April 7, 2026',
    href: '/blog/i-audited-my-own-website',
    tags: ['SEO', 'Next.js', 'Case Study'],
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
