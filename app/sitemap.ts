import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nyclaw.io'

  return [
    // Homepage
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },

    // Service pages
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/services/ai-automation`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/services/ai-consulting`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/services/ai-marketing`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },

    // Location pages
    { url: `${baseUrl}/locations/westchester-county`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/locations/new-york-city`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },

    // Knowledge base
    { url: `${baseUrl}/knowledge`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/knowledge/ai-assistant-identity`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/knowledge/mission-driven-systems`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/knowledge/operational-excellence`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },

    // Resources
    { url: `${baseUrl}/resources`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },

    // Blog
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/blog/i-audited-my-own-website`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ]
}
