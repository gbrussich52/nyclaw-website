/**
 * Distributed rate limiter — Upstash Redis (REST) with in-memory fallback.
 *
 * Why: Vercel serverless scales out to many instances; a per-instance
 * in-memory Map effectively multiplies the limit by the instance count and
 * resets on every cold start. Upstash Redis via its REST API gives one shared
 * counter across all instances with zero new npm dependencies (plain fetch),
 * and works in both the Node and Edge runtimes (middleware).
 *
 * Strategy: fixed-window counter. One pipelined request per check:
 *   INCR key            -> request count in the current window
 *   PEXPIRE key ms NX   -> start the window TTL on the first request only
 *   PTTL key            -> time until the window resets (for headers)
 *
 * Behavior:
 * - Env-gated: when UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN are
 *   unset, falls back to the in-memory limiter (pre-provisioning safety).
 * - Fail-open: if Redis errors or times out, the request is ALLOWED and the
 *   failure is logged. A down rate limiter must never block real leads.
 */

export interface RateLimitResult {
  allowed: boolean
  /** Requests left in the current window (0 when blocked). */
  remaining: number
  /** Epoch ms when the current window resets; 0 when unknown (fail-open). */
  resetAt: number
}

export interface RateLimiter {
  /** Which backend is active — useful for logging and tests. */
  readonly backend: 'upstash' | 'memory'
  /** Check + consume one request for `identifier` (typically an IP). */
  limit(identifier: string): Promise<RateLimitResult>
}

export interface RateLimitConfig {
  /** Route/scope name — namespaces Redis keys so each route has its own buckets. */
  name: string
  /** Max requests allowed per window. */
  max: number
  /** Window length in milliseconds. */
  windowMs: number
}

/** Abort a Redis call rather than stall the request path (middleware-sensitive). */
const REDIS_TIMEOUT_MS = 2000

// ---------------------------------------------------------------------------
// Upstash REST backend
// ---------------------------------------------------------------------------

export function createUpstashRateLimiter(
  config: RateLimitConfig,
  restUrl: string,
  restToken: string
): RateLimiter {
  const { name, max, windowMs } = config

  return {
    backend: 'upstash',
    async limit(identifier: string): Promise<RateLimitResult> {
      const key = `rl:${name}:${identifier}`
      try {
        const res = await fetch(`${restUrl}/pipeline`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${restToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify([
            ['INCR', key],
            ['PEXPIRE', key, String(windowMs), 'NX'],
            ['PTTL', key],
          ]),
          signal: AbortSignal.timeout(REDIS_TIMEOUT_MS),
        })

        if (!res.ok) {
          throw new Error(`Upstash pipeline HTTP ${res.status}`)
        }

        const results = (await res.json()) as Array<{
          result?: unknown
          error?: string
        }>
        const failed = results.find((r) => r.error)
        if (failed) {
          throw new Error(`Upstash command error: ${failed.error}`)
        }

        const count = Number(results[0]?.result)
        let ttlMs = Number(results[2]?.result)
        if (!Number.isFinite(count)) {
          throw new Error('Upstash pipeline returned non-numeric INCR result')
        }

        // Defensive: if the key somehow has no TTL (PTTL -1), a stale counter
        // would block the IP forever. Repair fire-and-forget and assume a
        // fresh window for the reset header.
        if (!Number.isFinite(ttlMs) || ttlMs < 0) {
          ttlMs = windowMs
          void fetch(`${restUrl}/pexpire/${encodeURIComponent(key)}/${windowMs}`, {
            headers: { Authorization: `Bearer ${restToken}` },
            signal: AbortSignal.timeout(REDIS_TIMEOUT_MS),
          }).catch(() => {})
        }

        return {
          allowed: count <= max,
          remaining: Math.max(0, max - count),
          resetAt: Date.now() + ttlMs,
        }
      } catch (err) {
        // FAIL OPEN — a broken limiter must not cost leads. Log loudly so the
        // outage is visible in Vercel logs. (No PII: key is name + IP only.)
        console.error(`[rate-limit:${name}] Redis check failed, failing open:`, err)
        return { allowed: true, remaining: max - 1, resetAt: 0 }
      }
    },
  }
}

// ---------------------------------------------------------------------------
// In-memory fallback (per-instance — same semantics as the old limiter)
// ---------------------------------------------------------------------------

export function createMemoryRateLimiter(config: RateLimitConfig): RateLimiter {
  const { name, max, windowMs } = config
  const buckets = new Map<string, { count: number; resetAt: number }>()

  return {
    backend: 'memory',
    async limit(identifier: string): Promise<RateLimitResult> {
      const now = Date.now()
      const key = `${name}:${identifier}`
      const entry = buckets.get(key)

      if (!entry || now > entry.resetAt) {
        // Opportunistic cleanup so the Map can't grow unbounded.
        if (buckets.size > 10_000) {
          for (const [k, v] of buckets) {
            if (now > v.resetAt) buckets.delete(k)
          }
        }
        buckets.set(key, { count: 1, resetAt: now + windowMs })
        return { allowed: true, remaining: max - 1, resetAt: now + windowMs }
      }

      entry.count++
      return {
        allowed: entry.count <= max,
        remaining: Math.max(0, max - entry.count),
        resetAt: entry.resetAt,
      }
    },
  }
}

// ---------------------------------------------------------------------------
// Factory — picks the backend from the environment
// ---------------------------------------------------------------------------

/**
 * Create a rate limiter. Uses Upstash Redis when REST credentials are set;
 * otherwise the per-instance in-memory fallback (logged once so the degraded
 * mode is visible in production).
 *
 * Accepts either env naming convention: UPSTASH_REDIS_REST_* (direct Upstash
 * provisioning) or KV_REST_API_* (what the Vercel Marketplace "Upstash KV"
 * integration injects — same REST protocol, different names).
 */
export function getRedisRestCredentials(): { url: string; token: string } | null {
  // `||` not `??`: a set-but-empty env var must fall through to the KV names,
  // otherwise an empty UPSTASH_* placeholder silently disables Redis entirely.
  const url =
    process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN
  return url && token ? { url, token } : null
}

export function createRateLimiter(config: RateLimitConfig): RateLimiter {
  const creds = getRedisRestCredentials()

  if (creds) {
    return createUpstashRateLimiter(config, creds.url, creds.token)
  }

  console.warn(
    `[rate-limit:${config.name}] no Upstash/KV REST credentials set — using per-instance in-memory fallback`
  )
  return createMemoryRateLimiter(config)
}
