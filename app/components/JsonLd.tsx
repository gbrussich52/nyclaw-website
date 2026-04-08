// JSON-LD structured data components for SEO
// All content is hardcoded server-side data — no user input, no XSS risk.

export function LocalBusinessJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'NYClaw.io',
    description: 'AI implementation agency for small businesses. Strategy, automation, and AI-powered marketing serving Westchester County, NY and NYC.',
    url: 'https://nyclaw.io',
    email: 'hello@nyclaw.io',
    areaServed: [
      {
        '@type': 'City',
        name: 'New York City',
        containedInPlace: { '@type': 'State', name: 'New York' },
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Westchester County',
        containedInPlace: { '@type': 'State', name: 'New York' },
      },
    ],
    serviceType: ['AI Consulting', 'AI Workflow Automation', 'AI-Powered Marketing'],
    priceRange: '$500 - $4,000',
    knowsAbout: ['Artificial Intelligence', 'Business Automation', 'AI Implementation', 'OODA Loop Framework'],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export function WebSiteJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'NYClaw.io',
    url: 'https://nyclaw.io',
    description: 'AI implementation agency for small businesses in Westchester County, NY and NYC.',
    publisher: {
      '@type': 'Organization',
      name: 'NYClaw.io',
      url: 'https://nyclaw.io',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export function ServiceJsonLd({
  name,
  description,
  provider = 'NYClaw.io',
  areaServed = 'Westchester County, NY',
  url,
}: {
  name: string
  description: string
  provider?: string
  areaServed?: string
  url: string
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: provider,
      url: 'https://nyclaw.io',
    },
    areaServed,
    url,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export function ArticleJsonLd({
  title,
  description,
  url,
  datePublished,
  dateModified,
}: {
  title: string
  description: string
  url: string
  datePublished: string
  dateModified?: string
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Organization',
      name: 'NYClaw.io',
      url: 'https://nyclaw.io',
    },
    publisher: {
      '@type': 'Organization',
      name: 'NYClaw.io',
      url: 'https://nyclaw.io',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export function FAQJsonLd({ items }: { items: { question: string; answer: string }[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
