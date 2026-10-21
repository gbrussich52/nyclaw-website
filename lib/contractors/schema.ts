import { z } from 'zod'

export const trades = ['electrician', 'plumber', 'general-contractor'] as const
export const jobs = ['any', 'panel-upgrade', 'ev-charger', 'lighting-outlets', 'plumbing-repair', 'water-heater', 'kitchen-bath', 'renovation'] as const
export const searchSchema = z.object({
  trade: z.enum(trades),
  area: z.enum(['westchester', 'nyc']),
  propertyType: z.enum(['residential', 'multifamily']).default('residential'),
  job: z.enum(jobs).default('any'),
  evidence: z.enum(['all', 'independent-only']).default('all'),
  limit: z.number().int().min(1).max(3).default(3),
  urgency: z.enum(['planning', 'immediate-danger']).default('planning'),
}).strict()
export type SearchInput = z.input<typeof searchSchema>
const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(value => {
  const parsed = new Date(`${value}T00:00:00Z`)
  return Number.isFinite(parsed.valueOf()) && parsed.toISOString().slice(0, 10) === value
}, 'Use a real calendar date')
export const publicUrl = z.string().url().max(500).refine(value => {
  const url = new URL(value)
  return url.protocol === 'https:' && !url.username && !url.password && !url.port &&
    !/^(localhost|.*\.localhost|.*\.local|\d[\d.]*|\[.*\])$/i.test(url.hostname)
}, 'Use a public HTTPS source')
export const evidenceSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]{1,80}$/),
  kind: z.enum(['business-website', 'business-selected-testimonial', 'independent-review', 'permissioned-community-review']),
  url: publicUrl,
  summary: z.string().min(10).max(450),
  checkedAt: date,
  publishedAt: date.nullable(),
  jobs: z.array(z.enum(jobs)).min(1).max(8),
  rights: z.enum(['public-reference', 'explicit-license', 'contributor-consent']),
  permissionReference: z.string().min(8).max(160).nullable(),
  originalSourceId: z.string().min(1).max(120),
  // Maintainer receipt for checking publisher ownership, business affiliation and incentives.
  // A permission receipt establishes use rights; it does not establish independence.
  independenceAssessment: z.string().min(12).max(160).optional(),
}).strict().superRefine((record, ctx) => {
  const host = new URL(record.url).hostname.toLowerCase()
  if (record.kind === 'permissioned-community-review' &&
    (!record.permissionReference || record.rights === 'public-reference')) {
    ctx.addIssue({ code: 'custom', message: 'Community evidence requires recorded redistribution permission' })
  }
  // No authenticated-group harvesting adapter exists. A caller cannot enable one by setting a flag.
  if (/(^|\.)(facebook\.com|fb\.com|fb\.watch)$/.test(host)) {
    ctx.addIssue({ code: 'custom', message: 'Facebook ingestion is not enabled; platform authorization is not established' })
  }
})
export const contractorSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]{1,80}$/), name: z.string().min(2).max(100),
  trade: z.enum(trades), areas: z.array(z.enum(['westchester', 'nyc'])).min(1).max(2),
  propertyTypes: z.array(z.enum(['residential', 'multifamily'])).min(1).max(2),
  website: publicUrl,
  evidence: z.array(evidenceSchema).min(1).max(12),
  license: z.object({
    number: z.string().max(30).nullable(), authority: z.string().max(100),
    checkedAt: date.nullable(), expiresAt: date.nullable(), sourceUrl: publicUrl,
  }).strict(),
}).strict()
export type Contractor = z.infer<typeof contractorSchema>
export type Evidence = z.infer<typeof evidenceSchema>

export function validateCatalog(input: unknown): Contractor[] {
  const records = z.array(contractorSchema).max(500).parse(input)
  const ids = new Set<string>(); const sites = new Set<string>(); const evidenceIds = new Set<string>()
  for (const record of records) {
    const businessHosts = [record.website, ...record.evidence.filter(e => e.kind === 'business-website' || e.kind === 'business-selected-testimonial').map(e => e.url)]
      .map(url => new URL(url).hostname.toLowerCase().replace(/^www\./, ''))
    for (const evidence of record.evidence.filter(e => ['independent-review', 'permissioned-community-review'].includes(e.kind))) {
      const publisher = new URL(evidence.url).hostname.toLowerCase().replace(/^www\./, '')
      if (!evidence.independenceAssessment || businessHosts.some(host => publisher === host || publisher.endsWith(`.${host}`) || host.endsWith(`.${publisher}`))) {
        throw new Error('Independent evidence requires a separate publisher and documented affiliation assessment')
      }
    }
    const host = new URL(record.website).hostname.replace(/^www\./, '')
    if (ids.has(record.id) || sites.has(host)) throw new Error('Duplicate business identity')
    ids.add(record.id); sites.add(host)
    for (const evidence of record.evidence) {
      if (evidenceIds.has(evidence.id)) throw new Error('Duplicate evidence identity')
      evidenceIds.add(evidence.id)
    }
  }
  return records
}
