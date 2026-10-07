// classification: PUBLIC
import { createHash, timingSafeEqual } from 'node:crypto'
import { isIP } from 'node:net'
import { NextRequest } from 'next/server'
import { createRateLimiter } from './rate-limit'

const failedAuthLimiter = createRateLimiter({ name: 'admin-workflow-assessments-auth', max: 10, windowMs: 15 * 60 * 1000 })
const reviewLimiter = createRateLimiter({ name: 'admin-workflow-assessments-review', max: 60, windowMs: 15 * 60 * 1000 })

export async function adminRate(req: NextRequest, authorized: boolean) {
  const forwarded = req.headers.get('x-vercel-forwarded-for') || req.headers.get('x-forwarded-for') || ''
  const address = forwarded.split(',')[0].trim()
  return (authorized ? reviewLimiter : failedAuthLimiter).limit(address.length <= 45 && isIP(address) ? address : 'unknown')
}

export async function boundedText(req: NextRequest, maxBytes: number): Promise<string | null> {
  const length = req.headers.get('content-length')
  if (length && (!/^\d+$/.test(length) || Number(length) > maxBytes)) return null
  if (!req.body) return null
  const reader = req.body.getReader()
  const chunks: Uint8Array[] = []
  let size = 0
  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      size += value.byteLength
      if (size > maxBytes) { await reader.cancel(); return null }
      chunks.push(value)
    }
    const combined = new Uint8Array(size)
    let offset = 0
    for (const chunk of chunks) { combined.set(chunk, offset); offset += chunk.byteLength }
    return new TextDecoder('utf-8', { fatal: true }).decode(combined)
  } catch { return null }
}

export function reviewConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD && process.env.ADMIN_PASSWORD !== 'undefined')
}

export function adminAuthorized(req: NextRequest): boolean {
  const expected = process.env.ADMIN_PASSWORD
  if (!expected || expected === 'undefined') return false
  const header = req.headers.get('authorization') ?? ''
  if (!header.startsWith('Basic ') || header.length > 1024) return false
  let decoded: string
  try { decoded = Buffer.from(header.slice(6), 'base64').toString('utf8') } catch { return false }
  const colon = decoded.indexOf(':')
  if (colon < 0) return false
  const supplied = decoded.slice(colon + 1)
  const a = createHash('sha256').update(supplied).digest()
  const b = createHash('sha256').update(expected).digest()
  return timingSafeEqual(a, b)
}

export function sameOrigin(req: NextRequest): boolean {
  const origin = req.headers.get('origin')
  const host = req.headers.get('host')
  if (!origin || !host || host.length > 255 || /[\s,/@\\?#]/.test(host)) return false
  try {
    const source = new URL(origin)
    const forwardedProtocol = req.headers.get('x-forwarded-proto')
    const protocol = process.env.VERCEL === '1' ? forwardedProtocol : req.nextUrl.protocol.slice(0, -1)
    if (protocol !== 'http' && protocol !== 'https') return false
    if (process.env.VERCEL === '1' && protocol !== 'https') return false
    const requestOrigin = new URL(`${protocol}://${host}`)
    if (requestOrigin.host.toLowerCase() !== host.toLowerCase()) return false
    return source.origin === requestOrigin.origin && source.pathname === '/' &&
      !source.search && !source.hash && !source.username && !source.password
  } catch { return false }
}
