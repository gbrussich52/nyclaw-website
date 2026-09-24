// JSON-LD structured data components for SEO
// All content is hardcoded server-side data — no user input, no XSS risk.

export function LocalBusinessJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'NYClaw.io',
    description: 'AI agency that designs and builds custom automations and agents for small businesses in Westchester County, NY and NYC.',
    url: 'https://nyclaw.io',
    email: 'hello@nyclaw.io',
    sameAs: [
      'https://twitter.com/AinsleyNYC',
    ],
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
    serviceType: ['Custom AI Agents', 'Workflow Automation', 'AI Strategy & Roadmaps', 'Marketing Automations'],
    priceRange: '$3,500 - $15,000',
    knowsAbout: ['Artificial Intelligence', 'Custom AI Agents', 'Business Automation', 'OODA Loop Framework'],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
    />
  )
}

/**
 * Organization JSON-LD — distinct from LocalBusinessJsonLd (ProfessionalService).
 * AEO/GEO audits and LLM answer engines look for schema.org Organization
 * specifically (logo, sameAs, founder) to resolve brand identity; the existing
 * ProfessionalService type alone was scoring as a gap. Additive, not a
 * replacement — both can validly describe the same entity.
 */
export function OrganizationJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'NYClaw.io',
    url: 'https://nyclaw.io',
    logo: 'https://nyclaw.io/icon',
    description:
      'AI agency that designs and builds custom automations and agents for small businesses in Westchester County, NY and NYC.',
    email: 'hello@nyclaw.io',
    areaServed: 'Westchester County, NY',
    sameAs: [
      'https://github.com/gbrussich52',
    ],
    founder: {
      '@type': 'Person',
      name: 'Giani Brussich',
      sameAs: [
        'https://linkedin.com/in/gianib',
        'https://github.com/gbrussich52',
        'https://gianibrussich.com',
      ],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
    />
  )
}

export function WebSiteJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'NYClaw.io',
    url: 'https://nyclaw.io',
    description: 'AI agency for small businesses — custom automations and agents in Westchester County, NY and NYC.',
    publisher: {
      '@type': 'Organization',
      name: 'NYClaw.io',
      url: 'https://nyclaw.io',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
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
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
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
      sameAs: [
        'https://twitter.com/AinsleyNYC',
      ],
    },
    publisher: {
      '@type': 'Organization',
      name: 'NYClaw.io',
      url: 'https://nyclaw.io',
      sameAs: [
        'https://twitter.com/AinsleyNYC',
      ],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
    />
  )
}

/**
 * SoftwareApplicationJsonLd — for a free downloadable tool page (e.g. the
 * Main Street MCP starter kit), distinct from ServiceJsonLd which describes
 * a paid engagement. Free-price offer is hardcoded to match the page's own
 * claim; keep both in sync if the offer ever changes.
 */
export function SoftwareApplicationJsonLd({
  name,
  description,
  url,
  applicationCategory = 'BusinessApplication',
}: {
  name: string
  description: string
  url: string
  applicationCategory?: string
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    url,
    applicationCategory,
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
      '@type': 'Organization',
      name: 'NYClaw.io',
      url: 'https://nyclaw.io',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
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
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
    />
  )
}
