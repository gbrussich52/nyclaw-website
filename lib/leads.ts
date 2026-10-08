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

/** Fixed, non-sensitive failure surfaced to the authenticated admin route. */
export class LeadReadUnavailableError extends Error {
  constructor() {
    super('Lead records unavailable')
    this.name = 'LeadReadUnavailableError'
  }
}

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

    const results: unknown = await res.json()
    const pushResult = Array.isArray(results) ? results[0] : undefined
    if (
      !pushResult ||
      typeof pushResult !== 'object' ||
      pushResult.error !== undefined ||
      !Number.isSafeInteger(pushResult.result) ||
      pushResult.result <= 0
    ) {
      console.error('[leads] Redis LPUSH unconfirmed')
      return false
    }
    // LPUSH confirms capture. A later LTRIM error does not undo that write.
    return true
  } catch {
    console.error('[leads] Redis write failed')
    return false
  }
}

/**
 * Read all stored leads back (newest first, as LPUSH ordering). Only a confirmed
 * empty LRANGE returns []; unavailable or malformed storage throws a fixed error.
 */
export async function getLeadsFromRedis(): Promise<Record<string, unknown>[]> {
  const creds = getRedisRestCredentials()
  if (!creds) {
    throw new LeadReadUnavailableError()
  }

  try {
    const res = await fetch(creds.url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${creds.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(['LRANGE', LEADS_KEY, '0', '-1']),
      signal: AbortSignal.timeout(REDIS_TIMEOUT_MS),
    })

    if (!res.ok) throw new LeadReadUnavailableError()

    const data: unknown = await res.json()
    if (!data || typeof data !== 'object' || Array.isArray(data)) throw new LeadReadUnavailableError()
    const response = data as { result?: unknown; error?: unknown }
    if (response.error !== undefined || !Array.isArray(response.result)) throw new LeadReadUnavailableError()

    return response.result.map((row: unknown) => {
      if (typeof row !== 'string') throw new LeadReadUnavailableError()
      const value: unknown = JSON.parse(row)
      if (!value || typeof value !== 'object' || Array.isArray(value)) throw new LeadReadUnavailableError()
      const record = value as Record<string, unknown>
      if (!['timestamp', 'name', 'email', 'businessType', 'challenge'].every((key) => typeof record[key] === 'string')) {
        throw new LeadReadUnavailableError()
      }
      return record
    })
  } catch {
    // Do not log upstream payloads, exception messages, records or credentials.
    throw new LeadReadUnavailableError()
  }
}
