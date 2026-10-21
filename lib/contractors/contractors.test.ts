import { describe, expect, it, vi } from 'vitest'
import { createHash } from 'node:crypto'
import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js'
import { contractors } from './catalog'
import { validateCatalog } from './schema'
import { findContractors } from './search'
import { createContractorServer } from './server'
import { contractorWidget, WIDGET_URI } from './widget'
import { POST, GET as mcpGet } from '../../app/api/contractors/mcp/route'
import { GET as healthGet } from '../../app/api/contractors/health/route'
import { GET as searchGet } from '../../app/api/contractors/search/route'
const now = new Date('2026-10-20T20:00:00Z')
const input = { trade: 'electrician', area: 'westchester' } as const
const compare = (args = input) => findContractors(args, contractors, now)

describe('source-backed contractor comparison', () => {
  it('uses real dated business sources, never invents ratings or independent endorsements', () => {
    const result = compare()
    expect(result.candidates).toHaveLength(3)
    expect(result.status).toBe('comparison-only')
    expect(result.candidates.every(c => c.independentReviewCount === 0 && !c.recommendationEligible)).toBe(true)
    expect(result.candidates.every(c => c.license.currentAtCheck)).toBe(true)
    expect(result.candidates.map(c => c.license.number).sort()).toEqual(['1668', '2115', '217'])
    expect(JSON.stringify(result)).not.toContain('rating":')
  })
  it('matches the exact job instead of padding an EV shortlist to three', () => {
    const result = findContractors({ ...input, job: 'ev-charger' }, contractors, now)
    expect(result.candidates.map(c => c.id)).toEqual(['ease-electrical', 'keating-electric'])
    expect(result.candidates.every(c => c.evidence.some(e => e.kind === 'business-website' && e.jobs.includes('ev-charger')))).toBe(true)
  })
  it('does not turn selected testimonials into independent reviews', () => {
    const result = findContractors({ ...input, evidence: 'independent-only' }, contractors, now)
    expect(result.status).toBe('insufficient-evidence'); expect(result.candidates).toEqual([])
  })
  it('does not substitute Westchester electricians for missing NYC coverage', () => {
    expect(findContractors({ ...input, area: 'nyc' }, contractors, now).candidates).toEqual([])
  })
  it('excludes apartment-management providers from an individual home request', () => {
    expect(findContractors({ trade: 'plumber', area: 'nyc' }, contractors, now).candidates).toEqual([])
    const result = findContractors({ trade: 'plumber', area: 'nyc', propertyType: 'multifamily' }, contractors, now)
    expect(result.candidates.map(c => c.id)).toEqual(['bruckner-plumbing'])
    expect(result.candidates[0].license.currentAtCheck).toBe(false)
  })
  it('holds an inconsistent trade/job pair and immediate danger', () => {
    expect(findContractors({ ...input, job: 'water-heater' }, contractors, now).status).toBe('needs-clarification')
    const result = findContractors({ ...input, urgency: 'immediate-danger' }, contractors, now)
    expect(result.status).toBe('safety-handoff'); expect(result.candidates).toEqual([])
  })
  it('expires stale and future source checks and does not redate source observations', () => {
    expect(findContractors(input, contractors, new Date('2027-02-01T12:00:00Z')).candidates).toEqual([])
    expect(findContractors(input, contractors, new Date('2026-10-19T12:00:00Z')).candidates).toEqual([])
    const later = findContractors(input, contractors, new Date('2026-11-25T12:00:00Z'))
    expect(later.candidates.every(c => !c.license.currentAtCheck && c.evidence[0].checkedAt === '2026-10-20')).toBe(true)
  })
  it('deduplicates permissioned evidence lineage and needs relevant license for recommendation eligibility', () => {
    const record = structuredClone(contractors[0])
    const review = { ...record.evidence[0], id: 'permitted-review', kind: 'permissioned-community-review' as const,
      url: 'https://community.example.org/reviews/1', independenceAssessment: 'manual-publisher-affiliation-review-123', rights: 'contributor-consent' as const, permissionReference: 'permission-receipt-123', publishedAt: '2026-09-20', originalSourceId: 'original-review-1' }
    record.evidence.push(review, { ...review, id: 'duplicate-syndication' })
    const result = findContractors(input, [record], now)
    expect(result.candidates[0].independentReviewCount).toBe(1)
    expect(result.status).toBe('sourced-shortlist')
    record.license.expiresAt = '2026-09-30'
    expect(findContractors(input, [record], now).status).toBe('comparison-only')
  })
  it('never promotes a business-hosted testimonial by relabelling it independent', () => {
    const record = structuredClone(contractors[0])
    record.evidence.push({ ...record.evidence[0], id: 'relabeled-review', kind: 'independent-review', rights: 'explicit-license',
      permissionReference: 'rights-receipt-123', publishedAt: '2026-10-01', independenceAssessment: 'asserted-affiliation-check' })
    expect(() => validateCatalog([record])).toThrow(/separate publisher/)
    expect(findContractors(input, [record], now).candidates[0].independentReviewCount).toBe(0)
  })
  it('rejects fabricated fields and unsupported broad input', () => {
    expect(() => findContractors({ ...input, limit: 50 }, contractors, now)).toThrow()
    expect(() => findContractors({ ...input, streetAddress: 'private' } as never, contractors, now)).toThrow()
    expect(() => findContractors({ trade: 'hacker' } as never, contractors, now)).toThrow()
  })
})

describe('catalog admission boundary', () => {
  it('rejects duplicate companies, non-public URLs and impossible dates', () => {
    expect(() => validateCatalog([contractors[0], contractors[0]])).toThrow()
    for (const url of ['javascript:alert(1)', 'https://localhost/x', 'https://127.0.0.1/x', 'https://user:password@example.com/x']) {
      expect(() => validateCatalog([{ ...contractors[0], website: url }])).toThrow()
    }
    const record = structuredClone(contractors[0]); record.evidence[0].checkedAt = '2026-02-31'
    expect(() => validateCatalog([record])).toThrow()
  })
  it('rejects Facebook imports even if a caller claims permission', () => {
    const record = structuredClone(contractors[0]); record.evidence[0].url = 'https://www.facebook.com/groups/example/posts/1'
    record.evidence[0].rights = 'explicit-license'; record.evidence[0].permissionReference = 'assertion-is-not-platform-authorization'
    expect(() => validateCatalog([record])).toThrow(/Facebook/)
  })
  it('requires a concrete permission receipt for community evidence', () => {
    const record = structuredClone(contractors[0]); record.evidence[0].kind = 'permissioned-community-review'
    expect(() => validateCatalog([record])).toThrow(/redistribution permission/)
  })
})

describe('official MCP and web surfaces', () => {
  it('health fails closed when dated source and license checks expire', async () => {
    vi.useFakeTimers()
    try {
      vi.setSystemTime(now)
      const healthy = healthGet(); expect(healthy.status).toBe(200)
      expect((await healthy.json()).independentReviews).toBe(0)
      vi.setSystemTime(new Date('2027-02-01T12:00:00Z'))
      const stale = healthGet(); expect(stale.status).toBe(503)
      expect((await stale.json()).sourceFresh).toBe(false)
    } finally { vi.useRealTimers() }
  })
  it('initializes through the official client, calls the tool and reads an app resource', async () => {
    const server = createContractorServer(); const client = new Client({ name: 'contractor-test', version: '1' })
    const [a, b] = InMemoryTransport.createLinkedPair()
    await server.connect(a); await client.connect(b)
    try {
      const listed = await client.listTools()
      expect(listed.tools[0].annotations?.readOnlyHint).toBe(true)
      expect(listed.tools[0]._meta?.['openai/outputTemplate']).toBe(WIDGET_URI)
      const called = await client.callTool({ name: 'find_local_contractor_candidates', arguments: input })
      expect(called.isError).not.toBe(true)
      const resource = await client.readResource({ uri: WIDGET_URI })
      expect(resource.contents[0].mimeType).toBe('text/html;profile=mcp-app')
      expect('text' in resource.contents[0] && resource.contents[0].text).toContain('Contractor evidence comparison')
      expect((await client.callTool({ name: 'find_local_contractor_candidates', arguments: { ...input, limit: 100 } })).isError).toBe(true)
    } finally { await client.close(); await server.close() }
  })
  it('keeps malicious source text inside escaped script data and recalculates the exact CSP hash', () => {
    const result = compare(); result.candidates[0].evidence[0].summary = '</script><img src=x onerror=alert(1)>'
    const html = contractorWidget(result)
    expect(html).not.toContain('</script><img')
    const script = html.match(/<script>([\s\S]*)<\/script>/)![1]
    expect(html).toContain(`script-src 'sha256-${createHash('sha256').update(script).digest('base64')}'`)
    expect(html).not.toContain("script-src 'unsafe-inline'")
  })
  it('uses SDK HTTP initialization, rejects hostile hosts/origins and bounds real bodies', async () => {
    const body = JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'initialize', params: { protocolVersion: '2025-03-26', capabilities: {}, clientInfo: { name: 'test', version: '1' } } })
    const headers = { 'Content-Type': 'application/json', Accept: 'application/json, text/event-stream' }
    const call = (url: string, extra = {}, raw = body) => POST(new Request(url, { method: 'POST', headers: { ...headers, ...extra }, body: raw }))
    expect((await call('https://nyclaw.io/api/contractors/mcp')).status).toBe(200)
    expect((await call('https://evil.example/api/contractors/mcp')).status).toBe(403)
    expect((await call('https://nyclaw.io/api/contractors/mcp', { Origin: 'https://evil.example' })).status).toBe(403)
    expect((await call('https://nyclaw.io/api/contractors/mcp', {}, 'x'.repeat(8193))).status).toBe(413)
    expect((await call('https://nyclaw.io/api/contractors/mcp', {}, '{broken')).status).toBe(400)
    expect(mcpGet().status).toBe(405)
  })
  it('rejects invalid browser filters without fetching arbitrary URLs or accepting source writes', async () => {
    expect(searchGet(new Request('https://nyclaw.io/api/contractors/search?trade=electrician&area=westchester&website=https://evil.example')).status).toBe(400)
    const response = searchGet(new Request('https://nyclaw.io/api/contractors/search?trade=electrician&area=westchester&job=ev-charger'))
    expect(searchGet(new Request('https://nyclaw.io/api/contractors/search?trade=electrician&trade=plumber&area=westchester')).status).toBe(400)
    expect(response.status).toBe(200); expect(response.headers.get('Cache-Control')).toBe('no-store')
    expect((await response.json()).query.job).toBe('ev-charger')
  })
})
