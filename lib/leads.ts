/**
 * Durable lead persistence — Upstash Redis (REST), zero new dependencies.
 *
 * Why this exists: on Vercel the contact route's other persistence layers can
 * all fail silently (read-only filesystem kills the local file write; a
 * revoked Gmail app password kills email; Sheets needs unprovisioned env
 * vars). Leads are revenue — this Redis list is the always-on backstop so a
 * submission is never lost even when every notification channel is down.
 *
 * Storage shape: LPUSH onto `nyclaw:leads` (newest first), capped via LTRIM
 * so the list can't grow unbounded. Read back with:
 *   LRANGE nyclaw:leads 0 -1
 * via the Upstash console, redis-cli, or the REST API.
 */

import { getRedisRestCredentials } from './rate-limit'

const LEADS_KEY = 'nyclaw:leads'
/** Keep the most recent N leads; far beyond realistic volume before export. */
const LEADS_CAP = 5000
const REDIS_TIMEOUT_MS = 3000

/**
 * Persist a lead to Redis. Returns true only when Redis confirms the write.
 * Never throws — the caller aggregates layer successes and decides whether
 * the whole submission failed.
 */
export async function storeLeadInRedis(
  entry: Record<string, unknown>
): Promise<boolean> {
  const creds = getRedisRestCredentials()
  if (!creds) {
    console.warn('[leads] no Upstash/KV REST credentials set — Redis lead store inactive')
    return false
  }

  try {
    const res = await fetch(`${creds.url}/pipeline`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${creds.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([
        ['LPUSH', LEADS_KEY, JSON.stringify(entry)],
        ['LTRIM', LEADS_KEY, '0', String(LEADS_CAP - 1)],
      ]),
      signal: AbortSignal.timeout(REDIS_TIMEOUT_MS),
    })

    if (!res.ok) {
      console.error(`[leads] Redis write failed: HTTP ${res.status}`)
      return false
    }

    const results = (await res.json()) as Array<{ result?: unknown; error?: string }>
    const pushResult = results?.[0]
    if (!pushResult || pushResult.error !== undefined) {
      console.error('[leads] Redis LPUSH errored:', pushResult?.error ?? 'malformed response')
      return false
    }
    return true
  } catch (err) {
    console.error('[leads] Redis write failed:', err)
    return false
  }
}
