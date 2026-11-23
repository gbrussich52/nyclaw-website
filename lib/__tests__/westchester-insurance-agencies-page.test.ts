// classification: PRIVATE
// Grok Bot (Crack Bot), 2026-11-23, why: guards for the Westchester insurance-agency page (daily Google loop).
import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'

const PATH = '/locations/westchester-county/insurance-agencies'
const URL_ = `https://nyclaw.io${PATH}`

describe('Westchester insurance agencies page', () => {
  const page = readFileSync(`app${PATH}/page.tsx`, 'utf8')
  const sitemap = readFileSync('app/sitemap.ts', 'utf8')
  const westchester = readFileSync('app/locations/westchester-county/page.tsx', 'utf8')
  const whitePlains = readFileSync('app/locations/white-plains/page.tsx', 'utf8')
  const yonkers = readFileSync('app/locations/yonkers/page.tsx', 'utf8')
  const jsonLd = readFileSync('app/components/JsonLd.tsx', 'utf8')

  it('targets "AI for insurance agencies" + Westchester in title, description, H1 and first copy', () => {
    const title = page.match(/export const metadata[\s\S]*?\n\s*title:\s*'([^']+)'/)?.[1] ?? ''
    expect(title).toBe('AI for Insurance Agencies, Westchester NY')
    expect(title.length + ' | NYClaw.io'.length).toBeLessThanOrEqual(60)
    const desc = page.match(/export const metadata[\s\S]*?description:\s*\n?\s*'([^']+)'/)?.[1] ?? ''
    expect(desc).toMatch(/^AI for insurance agencies in Westchester/)
    expect(desc.length).toBeLessThanOrEqual(160)
    expect(page).toContain(`const PAGE_URL = '${URL_}'`)
    expect(page).toContain('canonical: PAGE_URL')
    expect(page).toContain('titleTop="AI for Insurance"')
    expect(page).toContain('titleAccent="Agencies in Westchester"')
    expect(page.match(/lede="([^"]+)"/)?.[1]).toMatch(/^AI for insurance agencies/)
    expect(page).not.toMatch(/search for AI for insurance agencies/)
  })

  it('ships Breadcrumb, FAQ and Service JSON-LD, and no LocalBusiness or street address', () => {
    expect(page).toContain('<BreadcrumbJsonLd items={breadcrumbs} />')
    expect(page).toContain('<FAQJsonLd items={faqs} />')
    expect(page).toContain('<ServiceJsonLd')
    expect(page).toContain("{ name: 'Insurance Agencies', url: PAGE_URL }")
    expect(jsonLd).toContain("'@type': 'BreadcrumbList'")
    expect(page).not.toContain('LocalBusiness')
    expect(page).toContain('We do not publish a storefront street address')
    expect(page).not.toMatch(/\d{2,5}\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\s+(?:Ave|St|Rd|Blvd|Street|Avenue)/)
  })

  const RESULT_PROMISE = /testimonial|five-star|case study|our clients|\d+% (more|fewer|faster)|hours saved|guarantee|save[sd]? (up to )?\d+\+? hours|\d+\+? hours (a|per|each) (day|week|month)|most agency owners/i

  it('makes no client, result or review claims', () => {
    expect(page).toContain('not client results')
    expect(page).not.toMatch(RESULT_PROMISE)
  })

  it('the result guard catches a guaranteed-hours promise', () => {
    for (const bad of ['guaranteed to save 20 hours a week', 'saves 10 hours per week', 'Save up to 15 hours each month']) {
      expect(bad).toMatch(RESULT_PROMISE)
    }
  })

  it('reuses only prices the site already lists', () => {
    // Service prices only (comma form); the $7.5M / $15M figures are regulation thresholds, checked below.
    const prices = page.match(/\$\d{1,2},\d{3}(?:–\$\d{1,2},\d{3})?/g) ?? []
    expect(prices).toEqual(['$3,500–$8,000', '$5,000–$15,000', '$1,000–$2,500'])
    expect(prices.length).toBeGreaterThan(0)
    for (const p of prices) expect(whitePlains).toContain(p)
  })

  it('states the Part 500 facts as the regulation and the DFS letter word them (sources cited in the header)', () => {
    for (const cite of ['500.1(e)', '500.1(s)', '500.11', '500.12', '500.19(a)', 'October 16, 2024', 'Cornell LII']) {
      expect(page).toContain(cite)
    }
    expect(page).toContain('the Banking Law, the Insurance Law or the Financial Services Law')
    expect(page).toContain('fewer than 20 employees and independent contractors')
    expect(page).toContain('Each of those counts includes the entity’s affiliates.')
    expect(page).toContain('under $7.5 million in yearly revenue in each of the last three years')
    expect(page).toContain('under $15 million in assets')
    expect(page).toContain('does not remove the rules on third-party service providers (500.11) or multi-factor authentication (500.12)')
    expect(page).toContain('for remote access to third-party apps (cloud apps included) from which nonpublic information can be reached')
    expect(page).toContain('privileged accounts other than service accounts that do not allow interactive login')
    expect(page).not.toContain('cloud apps that hold nonpublic information')
    expect(page).toContain('It adds no new rules.')
    expect(page).toContain('we do not give legal advice')
    expect(page).not.toMatch(/guarantee[sd]? compliance|fully compliant|DFS[- ]approved|certified/i)
  })

  it('is in the sitemap and linked from the Westchester, White Plains and Yonkers pages', () => {
    expect(sitemap).toMatch(/\{\s*path:\s*'\/locations\/westchester-county\/insurance-agencies',\s*lastModified:\s*'2026-11-23'/)
    for (const src of [westchester, whitePlains, yonkers]) expect(src).toContain(`href: '${PATH}'`)
    for (const href of ['/locations/westchester-county', '/ai-workflows/quote-followup', '/services/ai-automation']) {
      expect(page).toContain(`href: '${href}'`)
    }
  })
})
