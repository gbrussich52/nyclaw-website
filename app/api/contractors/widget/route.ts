import { searchSchema } from '../../../../lib/contractors/schema'
import { findContractors } from '../../../../lib/contractors/search'
import { contractorWidget } from '../../../../lib/contractors/widget'
export const runtime = 'nodejs'
export function GET(request: Request) {
  const url = new URL(request.url)
  if ([...url.searchParams.keys()].some(key => url.searchParams.getAll(key).length > 1)) return new Response('Use each filter once.', { status: 400 })
  const raw = Object.fromEntries(url.searchParams.entries())
  const parsed = searchSchema.safeParse({ ...raw, ...(raw.limit ? { limit: Number(raw.limit) } : {}) })
  if (url.search.length > 1024 || !parsed.success) return new Response('Choose a supported trade, area and job.', { status: 400 })
  return new Response(contractorWidget(findContractors(parsed.data)), { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } })
}
