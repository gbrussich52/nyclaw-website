import { NextRequest, NextResponse } from 'next/server'

// In-memory rate limiter (per-IP, resets every WINDOW_MS)
const rateLimit = new Map<string, { count: number; resetAt: number }>()

const WINDOW_MS = 60_000 // 1 minute
const MAX_REQUESTS = 60

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const entry = rateLimit.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return { allowed: true, remaining: MAX_REQUESTS - 1 }
  }

  entry.count++
  if (entry.count > MAX_REQUESTS) {
    return { allowed: false, remaining: 0 }
  }

  return { allowed: true, remaining: MAX_REQUESTS - entry.count }
}

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

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl

  // Reject malicious patterns in path or query string
  if (hasMaliciousPattern(pathname + search)) {
    console.error('[Security] Blocked malicious request:', pathname + search)
    return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  }

  // Rate limit by IP
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? '127.0.0.1'
  const { allowed, remaining } = checkRateLimit(ip)

  if (!allowed) {
    console.error('[RateLimit] IP blocked:', ip)
    return NextResponse.json(
      { error: 'Too many requests' },
      {
        status: 429,
        headers: {
          'Retry-After': '60',
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
