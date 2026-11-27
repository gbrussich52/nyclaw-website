// classification: PRIVATE
import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'

const FILES = [
  'app/lead-leak-grader/page.tsx',
  'app/lead-leak-grader/LeadLeakGrader.tsx',
  'app/api/lead-leak-grader/route.ts',
  'lib/lead-leak/grade.ts',
  'lib/lead-leak/fetch-homepage.ts',
]

describe('Lead Leak Grader page', () => {
  const page = readFileSync('app/lead-leak-grader/page.tsx', 'utf8')

  it('has a title under 60 characters with the site suffix and a 110 to 155 character description', () => {
    const title = page.match(/const TITLE = '([^']+)'/)?.[1] ?? ''
    expect(`${title} | NYClaw.io`.length).toBeLessThanOrEqual(60)
    const description = page.match(/const DESCRIPTION =\s*'([^']+)'/)?.[1] ?? ''
    expect(description.length).toBeGreaterThanOrEqual(110)
    expect(description.length).toBeLessThanOrEqual(155)
  })

  it('declares canonical and Open Graph URLs for the route', () => {
    expect(page).toContain("const PAGE_URL = 'https://nyclaw.io/lead-leak-grader'")
    expect(page).toContain('alternates: { canonical: PAGE_URL }')
    expect(page).toContain('url: PAGE_URL')
  })

  it('is in the sitemap and the footer', () => {
    expect(readFileSync('app/sitemap.ts', 'utf8')).toMatch(/path: '\/lead-leak-grader', lastModified: '2026-11-27'/)
    expect(readFileSync('app/layout.tsx', 'utf8')).toContain('href="/lead-leak-grader"')
  })

  it('cites every source it quotes', () => {
    for (const url of [
      'https://scholarsarchive.byu.edu/facpub/9711',
      'https://www.mortech.com/hs-fs/hub/25649/file-13535879-pdf/docs/mit_study.pdf',
      'https://nearmedia.co/p/ee01b911-fc80-44ce-b314-6b04727b9f18',
      'https://moneypenny.com/us/resources/news/small-business-call-report/',
      'https://www.callrail.com/blog/missed-calls-costing-your-business',
      'https://www.census.gov/quickfacts/fact/table/westchestercountynewyork/BZA010223',
    ]) expect(page).toContain(url)
    expect(page).toContain('31,174')
    expect(page).toContain('17 hours and 49 minutes')
  })

  it('ends with the fix offer pointing at the existing contact and booking paths', () => {
    expect(page).toContain('48-hour Lead Leak Fix')
    expect(page).toContain('From $2,500, fixed price.')
    expect(page).toContain('contactHref="/#contact"')
    expect(page).toContain('callHref={CALENDLY_URL}')
  })

  it('says the grader only reads the public homepage', () => {
    const client = readFileSync('app/lead-leak-grader/LeadLeakGrader.tsx', 'utf8')
    expect(client).toContain('We only read your public homepage')
    expect(client).toContain('We never fill in a form, call, text or email your business.')
  })

  it('keeps copy plain: no em or en dashes, no stock AI phrases, no law firm framing', () => {
    for (const file of FILES) {
      const src = readFileSync(file, 'utf8')
      expect(src, file).not.toMatch(/[\u2013\u2014]/)
      expect(src, file).not.toMatch(/\b(?:unlock|seamless|leverage|empower)\w*|in today's/i)
      expect(src, file).not.toMatch(/law firm|attorney-client|legal advice/i)
    }
  })
})
