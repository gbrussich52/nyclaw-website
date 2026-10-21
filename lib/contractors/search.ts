import { contractors } from './catalog'
import { searchSchema, type SearchInput, type Contractor, type Evidence } from './schema'

const DAY = 86_400_000
export function isFresh(date: string, now: Date, days = 90) {
  const age = now.getTime() - Date.parse(`${date}T00:00:00Z`)
  return age >= 0 && age <= days * DAY
}
const host = (url: string) => new URL(url).hostname.toLowerCase().replace(/^www\./, '')
export function isIndependentEvidence(e: Evidence, contractor: Contractor, now: Date) {
  const publisher = host(e.url)
  const businessHosts = [contractor.website, ...contractor.evidence.filter(item => item.kind === 'business-website' || item.kind === 'business-selected-testimonial').map(item => item.url)].map(host)
  if (businessHosts.some(business => publisher === business || publisher.endsWith(`.${business}`) || business.endsWith(`.${publisher}`))) return false
  if (!e.independenceAssessment) return false
  return ['independent-review', 'permissioned-community-review'].includes(e.kind) &&
    e.rights !== 'public-reference' && Boolean(e.permissionReference) && Boolean(e.publishedAt) &&
    isFresh(e.checkedAt, now) && isFresh(e.publishedAt!, now, 730)
}
const jobTrade: Record<string, string> = { 'panel-upgrade': 'electrician', 'ev-charger': 'electrician', 'lighting-outlets': 'electrician', 'plumbing-repair': 'plumber', 'water-heater': 'plumber', 'renovation': 'general-contractor' }
export function findContractors(raw: SearchInput, catalog: Contractor[] = contractors, now = new Date()) {
  const input = searchSchema.parse(raw)
  const verificationUrl = input.area === 'nyc' ? 'https://a810-bisweb.nyc.gov/bisweb/LicenseTypeServlet?vlfirst=Y' :
    input.trade === 'general-contractor' ? 'https://consumerlicenseweb.westchestercountyny.gov/ConsumerLicenseWeb/' : 'https://tradelicenses.westchestercountyny.gov/TradeLicenses/'
  const base = { query: input, checkedAt: now.toISOString(), verificationUrl,
    ranking: 'Matching job evidence, independently licensed status, then business name. No payments influence order. This is not a quality or star rating.',
    nextSteps: ['Confirm that the business serves your town and property type and can take the job.', 'Recheck the relevant license and insurance for this exact work before hiring.', 'Ask for recent references for the same job, a written scope, permit responsibility and an itemized quote.'],
    sourcePolicy: 'Public business references and explicitly permissioned evidence only. No Facebook-group collection is connected. Business-selected testimonials are not independent reviews.',
  }
  if (input.urgency === 'immediate-danger') return { ...base, status: 'safety-handoff' as const, message: 'This is not emergency dispatch. For immediate danger, fire or electrical shock, call 911. Do not wait for a shortlist.', candidates: [], totalMatches: 0 }
  if (jobTrade[input.job] && jobTrade[input.job] !== input.trade) return { ...base, status: 'needs-clarification' as const, message: 'Choose a job that matches the selected trade.', candidates: [], totalMatches: 0 }
  const matches = catalog.filter(c => c.trade === input.trade && c.areas.includes(input.area) && c.propertyTypes.includes(input.propertyType)).flatMap(c => {
    const evidence = c.evidence.filter(e => isFresh(e.checkedAt, now) && (input.job === 'any' || e.jobs.includes(input.job)))
    // A dated testimonial without a dated service source is not a claim of current service coverage.
    if (!evidence.some(e => e.kind === 'business-website')) return []
    const seen = new Set<string>()
    const independentReviews = evidence.filter(e => {
      if (!isIndependentEvidence(e, c, now) || seen.has(e.originalSourceId)) return false
      seen.add(e.originalSourceId); return true
    })
    if (input.evidence === 'independent-only' && !independentReviews.length) return []
    const licenseCurrent = c.license.checkedAt !== null && c.license.expiresAt !== null &&
      c.license.authority === (input.area === 'westchester' ? 'Westchester County' : 'New York City') &&
      isFresh(c.license.checkedAt, now, 30) && c.license.expiresAt >= now.toISOString().slice(0, 10)
    return [{ id: c.id, name: c.name, website: c.website, propertyTypes: c.propertyTypes,
      evidence, independentReviewCount: independentReviews.length,
      evidenceLabel: independentReviews.length ? 'Permissioned independent evidence available' : 'Business sources only',
      license: { ...c.license, currentAtCheck: licenseCurrent, label: licenseCurrent ? `County record checked ${c.license.checkedAt}; expires ${c.license.expiresAt}` : 'Current license not independently established for this request' },
      recommendationEligible: independentReviews.length > 0 && licenseCurrent,
      matchReason: input.job === 'any' ? 'The business lists this trade in the selected area.' : 'A current business source lists the selected job type.',
    }]
  }).sort((a, b) => b.independentReviewCount - a.independentReviewCount || Number(b.license.currentAtCheck) - Number(a.license.currentAtCheck) || a.name.localeCompare(b.name))
  const candidates = matches.slice(0, input.limit)
  const status = !candidates.length ? 'insufficient-evidence' as const : candidates.every(c => c.recommendationEligible) ? 'sourced-shortlist' as const : 'comparison-only' as const
  return { ...base, status, totalMatches: matches.length, candidates, message: !candidates.length ?
    'There is not enough current matching evidence in this collection. No business has been invented or substituted from another area.' :
    status === 'comparison-only' ? 'These are candidates to compare, not a top-rated or independently recommended list. Review the source types and gaps before contacting anyone.' : 'Compare these sourced candidates and confirm the remaining checks before hiring.' }
}
export type ContractorResult = ReturnType<typeof findContractors>
