import { contractors, CATALOG_CHECKED_AT } from '../../../../lib/contractors/catalog'
import { isFresh, findContractors, isIndependentEvidence } from '../../../../lib/contractors/search'
export function GET() {
  const now = new Date()
  const sourceFresh = contractors.every(c => c.evidence.some(e => e.kind === 'business-website' && isFresh(e.checkedAt, now)))
  const electrical = findContractors({ trade: 'electrician', area: 'westchester' }, contractors, now)
  const licenseFresh = electrical.candidates.length === 3 && electrical.candidates.every(c => c.license.currentAtCheck)
  return Response.json({ ok: sourceFresh && licenseFresh, collectionCheckedAt: CATALOG_CHECKED_AT,
    checkedAt: now.toISOString(), businesses: contractors.length, currentElectricalChecks: electrical.candidates.filter(c => c.license.currentAtCheck).length,
    independentReviews: new Set(contractors.flatMap(c => c.evidence.filter(e => isIndependentEvidence(e, c, now)).map(e => e.originalSourceId))).size, facebookConnected: false, sourceFresh, licenseFresh,
    distribution: 'This health response is not evidence of a ChatGPT directory listing, users or sales.' },
    { status: sourceFresh && licenseFresh ? 200 : 503, headers: { 'Cache-Control': 'no-store' } })
}
