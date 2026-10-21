import { searchSchema } from '../../../../lib/contractors/schema'
import { findContractors } from '../../../../lib/contractors/search'
export function GET(request: Request) {
  const url = new URL(request.url)
  if ([...url.searchParams.keys()].some(key => url.searchParams.getAll(key).length > 1)) return Response.json({ error: 'Use each filter once.' }, { status: 400 })
  const raw = Object.fromEntries(url.searchParams.entries())
  const parsed = searchSchema.safeParse({ ...raw, ...(raw.limit ? { limit: Number(raw.limit) } : {}) })
  if (url.search.length > 1024 || !parsed.success) return Response.json({ error: 'Choose a supported trade, area, property type and job.' }, { status: 400 })
  return Response.json(findContractors(parsed.data), { headers: { 'Cache-Control': 'no-store' } })
}
