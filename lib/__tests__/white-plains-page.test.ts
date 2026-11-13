// classification: PRIVATE
import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'

describe('White Plains location page', () => {
  const page = readFileSync('app/locations/white-plains/page.tsx', 'utf8')
  const sitemap = readFileSync('app/sitemap.ts', 'utf8')
  const westchester = readFileSync('app/locations/westchester-county/page.tsx', 'utf8')

  it('targets White Plains AI search intent in title and first copy', () => {
    // Claude Sonnet 5.5, 2026-11-12: title shortened so '<title> | NYClaw.io' stays under 60 chars.
    expect(page).toMatch(/title:\s*'AI Automation & Consulting, White Plains NY'/)
    expect(page).toContain('canonical: \'https://nyclaw.io/locations/white-plains\'')
    expect(page).toContain('AI Automation for')
    expect(page).toContain('White Plains Businesses')
    expect(page).toMatch(/Searching for AI automation in White Plains/)
  })

  it('ships FAQ JSON-LD and avoids inventing a street address', () => {
    expect(page).toContain('<FAQJsonLd items={faqs} />')
    expect(page).toContain('We do not publish a storefront street address')
    expect(page).not.toMatch(/\d{2,5}\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\s+(?:Ave|St|Rd|Blvd|Street|Avenue)/)
  })

  it('is listed in the sitemap with 2026-11-05 lastModified', () => {
    expect(sitemap).toMatch(
      /\{\s*path:\s*'\/locations\/white-plains',\s*lastModified:\s*'2026-11-05'/,
    )
  })

  it('is linked from the Westchester County page', () => {
    expect(westchester).toContain("href: '/locations/white-plains'")
    expect(westchester).toContain("href = town === 'White Plains' ? '/locations/white-plains'")
  })
})
