// classification: PRIVATE
import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'

describe('Yonkers location page', () => {
  const page = readFileSync('app/locations/yonkers/page.tsx', 'utf8')
  const sitemap = readFileSync('app/sitemap.ts', 'utf8')
  const westchester = readFileSync('app/locations/westchester-county/page.tsx', 'utf8')
  const whitePlains = readFileSync('app/locations/white-plains/page.tsx', 'utf8')
  const nyc = readFileSync('app/locations/new-york-city/page.tsx', 'utf8')
  const jsonLd = readFileSync('app/components/JsonLd.tsx', 'utf8')

  it('targets Yonkers AI search intent in title, canonical and first copy', () => {
    expect(page).toMatch(/title:\s*'AI Automation & Consulting for Yonkers NY Businesses'/)
    expect(page).toContain("canonical: 'https://nyclaw.io/locations/yonkers'")
    expect(page).toContain("url: 'https://nyclaw.io/locations/yonkers'")
    expect(page).toContain('titleAccent="Yonkers Businesses"')
    const meta = page.match(/export const metadata[\s\S]*?description:\s*'([^']+)'/)
    expect(meta?.[1]).toContain('AI automation')
    expect(meta?.[1]).toContain('Yonkers')
    expect(meta?.[1].length).toBeLessThanOrEqual(160)
    const lede = page.match(/lede="([^"]+)"/)?.[1] ?? ''
    expect(lede).toContain('AI automation')
    expect(lede).toContain('Yonkers')
    expect(page).toMatch(/look up AI automation in Yonkers/)
  })

  it('ships FAQ and Breadcrumb JSON-LD', () => {
    expect(page).toContain('<FAQJsonLd items={faqs} />')
    expect(page).toContain('<BreadcrumbJsonLd items={breadcrumbs} />')
    expect(page).toContain("{ name: 'Yonkers', url: 'https://nyclaw.io/locations/yonkers' }")
    expect(jsonLd).toContain("'@type': 'BreadcrumbList'")
  })

  it('avoids a street address, LocalBusiness schema and invented results', () => {
    expect(page).toContain('We do not publish a storefront street address')
    expect(page).not.toMatch(/\d{2,5}\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\s+(?:Ave|St|Rd|Blvd|Street|Avenue)/)
    expect(page).not.toContain('LocalBusiness')
    expect(page).toContain('not client results')
    expect(page).not.toMatch(/testimonial|five-star|\d+% (more|fewer|faster)/i)
  })

  it('reuses only prices the site already lists', () => {
    const prices = page.match(/\$[\d,]+(?:K)?(?:–\$[\d,]+K?)?/g) ?? []
    for (const p of prices) expect(whitePlains).toContain(p)
  })

  it('is in the sitemap and linked from sibling location pages', () => {
    expect(sitemap).toMatch(/\{\s*path:\s*'\/locations\/yonkers',\s*lastModified:\s*'2026-11-13'/)
    expect(westchester).toContain("href: '/locations/yonkers'")
    expect(westchester).toContain("Yonkers: '/locations/yonkers'")
    expect(whitePlains).toContain("href: '/locations/yonkers'")
    expect(nyc).toContain("href: '/locations/yonkers'")
  })
})
