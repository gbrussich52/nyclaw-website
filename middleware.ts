import { NextRequest, NextResponse } from 'next/server'
import { createRateLimiter } from './lib/rate-limit'

// Distributed rate limiter (per-IP, all /api/* routes — see config.matcher).
// Upstash-backed when provisioned; per-instance in-memory fallback otherwise.
// Edge-safe (plain fetch), 2s timeout, fail-open — a Redis outage adds at
// most one bounded roundtrip and never blocks traffic.
const WINDOW_MS = 60_000 // 1 minute
const MAX_REQUESTS = 60

const apiLimiter = createRateLimiter({
  name: 'api',
  max: MAX_REQUESTS,
  windowMs: WINDOW_MS,
})

// Reject requests with obviously malicious patterns in the URL
const MALICIOUS_PATTERNS = [
  /\.\.\//,             // path traversal
  /<script/i,           // XSS
  /union\s+select/i,    // SQL injection
  /exec\s*\(/i,         // command injection
  /javascript:/i,       // JS protocol
]

function hasMaliciousPattern(url: string): boolean {
  return MALICIOUS_PATTERNS.some((p) => p.test(url))
}

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl

  // Reject malicious patterns in path or query string
  if (hasMaliciousPattern(pathname + search)) {
    console.error('[Security] Blocked malicious request:', pathname + search)
    return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  }

  // Rate limit by IP
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? '127.0.0.1'
  const { allowed, remaining, resetAt } = await apiLimiter.limit(ip)

  if (!allowed) {
    console.error('[RateLimit] IP blocked:', ip)
    const retryAfterSec = resetAt
      ? Math.max(1, Math.ceil((resetAt - Date.now()) / 1000))
      : 60
    return NextResponse.json(
      { error: 'Too many requests' },
      {
        status: 429,
        headers: {
          'Retry-After': String(retryAfterSec),
          'X-RateLimit-Limit': String(MAX_REQUESTS),
          'X-RateLimit-Remaining': '0',
        },
      }
    )
  }

  const response = NextResponse.next()
  response.headers.set('X-RateLimit-Limit', String(MAX_REQUESTS))
  response.headers.set('X-RateLimit-Remaining', String(remaining))
  return response
}

export const config = {
  matcher: '/api/:path*',
}
