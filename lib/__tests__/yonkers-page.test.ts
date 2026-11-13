// classification: PRIVATE
import { describe, expect, it } from 'vitest'
import { readFileSync, readdirSync } from 'node:fs'

describe('Yonkers location page', () => {
  const page = readFileSync('app/locations/yonkers/page.tsx', 'utf8')
  const sitemap = readFileSync('app/sitemap.ts', 'utf8')
  const westchester = readFileSync('app/locations/westchester-county/page.tsx', 'utf8')
  const whitePlains = readFileSync('app/locations/white-plains/page.tsx', 'utf8')
  const nyc = readFileSync('app/locations/new-york-city/page.tsx', 'utf8')
  const jsonLd = readFileSync('app/components/JsonLd.tsx', 'utf8')

  it('targets Yonkers AI search intent in title, canonical and first copy', () => {
    // Claude Sonnet 5.5, 2026-11-13: shortened so the rendered title (with ' | NYClaw.io') stays within 60 characters.
    expect(page).toMatch(/title:\s*'AI Automation & Consulting, Yonkers NY'/)
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

  // Claude Sonnet 5.5, 2026-11-13: Yonkers rendered at 64 characters. Guard every location page, since the layout appends ' | NYClaw.io'.
  it('keeps every location page title within 60 characters once the layout suffix is added', () => {
    for (const dir of readdirSync('app/locations', { withFileTypes: true }).filter(d => d.isDirectory() && !d.name.startsWith('_'))) {
      const src = readFileSync(`app/locations/${dir.name}/page.tsx`, 'utf8')
      const title = src.match(/export const metadata[\s\S]*?\n\s*title:\s*'([^']+)'/)?.[1] ?? ''
      expect(title, dir.name).not.toBe('')
      expect(title.length + ' | NYClaw.io'.length, dir.name).toBeLessThanOrEqual(60)
    }
  })
})
