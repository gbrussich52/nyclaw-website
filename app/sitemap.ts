import type { MetadataRoute } from 'next'

type Entry = {
  path: string
  lastModified: string
  changeFrequency: 'weekly' | 'monthly'
  priority: number
}

/**
 * Every entry carries its route's real last-commit date. Deliberately NOT
 * `new Date()`: sitemap.ts is evaluated per request, so `new Date()` made all
 * 27 URLs report as modified seconds ago on every single fetch. lastmod exists
 * to tell Google what is worth re-crawling; one that always says "everything
 * just changed" carries no information, and Google's documented response to
 * unreliable lastmod is to ignore the field for the whole site.
 *
 * Bump a date when that page's content meaningfully changes. An accurate but
 * stale date is worth far more than a fresh lie.
 */
const ENTRIES: Entry[] = [
  // Homepage
  { path: '', lastModified: '2026-07-27', changeFrequency: 'weekly', priority: 1 },

  // Service pages
  { path: '/services', lastModified: '2026-07-28', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/services/ai-automation', lastModified: '2026-07-28', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/services/ai-consulting', lastModified: '2026-07-28', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/services/ai-marketing', lastModified: '2026-07-28', changeFrequency: 'monthly', priority: 0.9 },

  // Location pages
  { path: '/locations/westchester-county', lastModified: '2026-07-28', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/locations/new-york-city', lastModified: '2026-07-28', changeFrequency: 'monthly', priority: 0.8 },

  // Knowledge base
  { path: '/knowledge', lastModified: '2026-07-28', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/knowledge/ai-assistant-identity', lastModified: '2026-07-28', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/knowledge/mission-driven-systems', lastModified: '2026-07-28', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/knowledge/operational-excellence', lastModified: '2026-07-28', changeFrequency: 'monthly', priority: 0.7 },

  // Resources
  { path: '/resources', lastModified: '2026-07-28', changeFrequency: 'monthly', priority: 0.8 },

  // Blog
  { path: '/blog', lastModified: '2026-08-07', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/blog/ai-automation-cost-westchester', lastModified: '2026-08-07', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/blog/chatgpt-vs-ai-consultant', lastModified: '2026-08-07', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/blog/i-audited-my-own-website', lastModified: '2026-07-28', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/blog/agentic-ai-security-best-practices', lastModified: '2026-07-28', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/blog/gpt-5-4', lastModified: '2026-07-28', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/blog/how-to-succeed', lastModified: '2026-07-28', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/blog/ai-automation-small-business-nyc', lastModified: '2026-07-28', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/blog/ai-automations-car-dealerships', lastModified: '2026-07-28', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/blog/ai-automations-dental', lastModified: '2026-07-28', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/blog/ai-automations-medical', lastModified: '2026-07-28', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/blog/ai-automations-plumbing-hvac', lastModified: '2026-07-28', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/blog/ai-law-firm-client-intake', lastModified: '2026-07-28', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/blog/revenuecat-pulse', lastModified: '2026-07-28', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/blog/zapier-vs-ai-agent', lastModified: '2026-07-28', changeFrequency: 'monthly', priority: 0.7 },
  // Note: /blog/revenuecat-application is intentionally omitted — it carries
  // a noindex directive (personal GitHub links / RevenueCat job application
  // content unrelated to NYClaw's core offering), so it shouldn't appear in
  // the sitemap either.
]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nyclaw.io'

  return ENTRIES.map(({ path, lastModified, changeFrequency, priority }) => ({
    url: `${baseUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }))
}
