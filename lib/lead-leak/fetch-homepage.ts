// classification: PUBLIC
/**
 * Safe homepage fetch for the Lead Leak Grader.
 *
 * The grader takes any address a stranger types, so this file is the guard
 * between that input and our server's network. Rules:
 *
 * - http and https only; https:// is added when no scheme is given.
 * - No user:password in the address, and only the standard ports 80 and 443.
 * - Every hostname is resolved by our own lookup, and the request connects to
 *   the exact address we checked. If any answer is private, loopback,
 *   link-local, CGNAT, multicast, reserved or a cloud metadata address, the
 *   request never opens. Checking and connecting with the same answer closes
 *   the DNS rebinding gap that a separate "resolve, then fetch" leaves open.
 * - Every redirect hop goes through the same checks. At most 3 redirects.
 * - 6 seconds for the whole thing, at most 1.5 MB of HTML read (after
 *   decompression), and only text/html or application/xhtml+xml.
 * - GET only. We never send a form, a cookie or a body.
 */
import { lookup as dnsLookup, type LookupAddress } from 'node:dns'
import { request as httpRequest, type IncomingMessage } from 'node:http'
import { request as httpsRequest } from 'node:https'
import { isIP, type LookupFunction } from 'node:net'
import { createBrotliDecompress, createGunzip, createInflate } from 'node:zlib'
import type { Readable } from 'node:stream'

export const USER_AGENT = 'NYClawLeadLeakGrader/1.0 (+https://nyclaw.io/lead-leak-grader)'
export const MAX_REDIRECTS = 3
export const TIMEOUT_MS = 6000
export const MAX_BYTES = 1.5 * 1024 * 1024
const MAX_INPUT_LENGTH = 2048

export type FetchErrorCode =
  | 'invalid-url'
  | 'blocked-address'
  | 'dns-failed'
  | 'too-many-redirects'
  | 'timeout'
  | 'not-html'
  | 'http-error'
  | 'network-error'

export class HomepageFetchError extends Error {
  constructor(public readonly code: FetchErrorCode, message: string) {
    super(message)
    this.name = 'HomepageFetchError'
  }
}

export interface FetchedHomepage {
  /** Address of the page we graded, after redirects. */
  finalUrl: string
  status: number
  html: string
  /** True when the page was longer than MAX_BYTES and we stopped reading. */
  truncated: boolean
  redirects: number
}

// ---------------------------------------------------------------------------
// IP guard
// ---------------------------------------------------------------------------

function ipv4ToInt(ip: string): number | null {
  const parts = ip.split('.')
  if (parts.length !== 4) return null
  let value = 0
  for (const part of parts) {
    if (!/^\d{1,3}$/.test(part)) return null
    const n = Number(part)
    if (n > 255) return null
    value = value * 256 + n
  }
  return value
}

/** [network, prefix length] for IPv4 ranges that must never be fetched. */
const BLOCKED_V4: readonly [string, number][] = [
  ['0.0.0.0', 8], // "this network"
  ['10.0.0.0', 8], // private
  ['100.64.0.0', 10], // carrier-grade NAT (also some cloud metadata)
  ['127.0.0.0', 8], // loopback
  ['169.254.0.0', 16], // link-local, includes 169.254.169.254 metadata
  ['172.16.0.0', 12], // private
  ['192.0.0.0', 24], // IETF protocol assignments
  ['192.0.2.0', 24], // documentation
  ['192.88.99.0', 24], // old 6to4 relay
  ['192.168.0.0', 16], // private
  ['198.18.0.0', 15], // benchmarking
  ['198.51.100.0', 24], // documentation
  ['203.0.113.0', 24], // documentation
  ['224.0.0.0', 4], // multicast
  ['240.0.0.0', 4], // reserved and broadcast
]

function inV4Range(value: number, network: string, prefix: number): boolean {
  const base = ipv4ToInt(network) as number
  const size = 2 ** (32 - prefix)
  return value >= base && value < base + size
}

export function isBlockedIPv4(ip: string): boolean {
  const value = ipv4ToInt(ip)
  if (value === null) return true
  return BLOCKED_V4.some(([network, prefix]) => inV4Range(value, network, prefix))
}

/** Parse an IPv6 address into 8 numbers. Returns null when it is not valid. */
export function parseIPv6(input: string): number[] | null {
  let ip = input.trim().toLowerCase()
  if (ip.startsWith('[') && ip.endsWith(']')) ip = ip.slice(1, -1)
  const zone = ip.indexOf('%')
  if (zone !== -1) ip = ip.slice(0, zone)
  if (isIP(ip) !== 6) return null

  // Turn a trailing dotted IPv4 part into two hex groups.
  const lastColon = ip.lastIndexOf(':')
  const tail = ip.slice(lastColon + 1)
  if (tail.includes('.')) {
    const v4 = ipv4ToInt(tail)
    if (v4 === null) return null
    ip = `${ip.slice(0, lastColon + 1)}${(v4 >>> 16).toString(16)}:${(v4 & 0xffff).toString(16)}`
  }

  const halves = ip.split('::')
  if (halves.length > 2) return null
  const head = halves[0] ? halves[0].split(':') : []
  const rest = halves.length === 2 && halves[1] ? halves[1].split(':') : []
  const missing = 8 - head.length - rest.length
  if (halves.length === 1 && missing !== 0) return null
  if (halves.length === 2 && missing < 1) return null
  const groups = [...head, ...Array(halves.length === 2 ? missing : 0).fill('0'), ...rest]
  if (groups.length !== 8) return null
  const out = groups.map((g) => (/^[0-9a-f]{1,4}$/.test(g) ? parseInt(g, 16) : NaN))
  return out.some(Number.isNaN) ? null : out
}

function embeddedV4(high: number, low: number): string {
  return [high >> 8, high & 0xff, low >> 8, low & 0xff].join('.')
}

export function isBlockedIPv6(ip: string): boolean {
  const g = parseIPv6(ip)
  if (!g) return true
  const [a, b, c, d, e, f, h7, h8] = g
  const firstSixZero = a === 0 && b === 0 && c === 0 && d === 0 && e === 0

  if (firstSixZero && f === 0 && h7 === 0 && (h8 === 0 || h8 === 1)) return true // :: and ::1
  if (firstSixZero && f === 0xffff) return isBlockedIPv4(embeddedV4(h7, h8)) // ::ffff:a.b.c.d mapped
  if (firstSixZero && f === 0) return true // ::a.b.c.d compatible (deprecated)
  if (a === 0 && b === 0 && c === 0 && d === 0 && e === 0xffff && f === 0) return true // ::ffff:0:a.b.c.d translated
  if (a === 0x64 && b === 0xff9b && c === 0 && d === 0 && e === 0 && f === 0) return isBlockedIPv4(embeddedV4(h7, h8)) // NAT64
  if (a === 0x64 && b === 0xff9b && c === 1) return true // local-use NAT64
  if (a === 0x100 && b === 0 && c === 0 && d === 0) return true // discard-only
  if (a === 0x2001 && b < 0x200) return true // IETF protocol assignments, includes Teredo 2001::/32
  if (a === 0x2001 && b === 0xdb8) return true // documentation
  if (a === 0x2002) return isBlockedIPv4(embeddedV4(b, c)) // 6to4 carries an IPv4 address
  if (a === 0x3fff && b < 0x1000) return true // documentation (3fff::/20)
  if ((a & 0xfe00) === 0xfc00) return true // unique local, includes fd00:ec2::254 metadata
  if ((a & 0xffc0) === 0xfe80) return true // link-local
  if ((a & 0xffc0) === 0xfec0) return true // old site-local
  if ((a & 0xff00) === 0xff00) return true // multicast
  return false
}

/** True when an address must never be fetched. Anything unparseable is blocked. */
export function isBlockedIp(ip: string): boolean {
  const kind = isIP(ip.replace(/^\[|\]$/g, '').replace(/%.*$/, ''))
  if (kind === 4) return isBlockedIPv4(ip)
  if (kind === 6) return isBlockedIPv6(ip)
  return true
}

// ---------------------------------------------------------------------------
// URL guard
// ---------------------------------------------------------------------------

const BLOCKED_HOST_SUFFIXES = ['.localhost', '.local', '.internal', '.home.arpa', '.lan', '.intranet', '.corp']

/** Parse what the owner typed into a URL, adding https:// when no scheme is given. No checks. */
export function parseTargetUrl(input: string): URL {
  const raw = (input ?? '').trim()
  if (!raw || raw.length > MAX_INPUT_LENGTH || /[\s\u0000-\u001f\u007f]/.test(raw)) {
    throw new HomepageFetchError('invalid-url', 'Type a website address, like example.com.')
  }
  // "example.com:8080" has a colon but no scheme; treat it as a host and port.
  const hasScheme = /^[a-z][a-z0-9+.-]*:/i.test(raw) && !/^[^:/]+:\d+(?:[/?#]|$)/.test(raw)
  try {
    return new URL(hasScheme ? raw : `https://${raw.replace(/^\/+/, '')}`)
  } catch {
    throw new HomepageFetchError('invalid-url', 'That does not look like a website address.')
  }
}

/**
 * Turn what the owner typed into a URL we are willing to fetch, or throw.
 * Adds https:// when there is no scheme. Does not touch the network.
 */
export function normalizeTargetUrl(input: string): URL {
  const url = parseTargetUrl(input)
  assertFetchableUrl(url)
  return url
}

/** Checks that need no DNS: scheme, credentials, port and hostname shape. */
export function assertFetchableUrl(url: URL): void {
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new HomepageFetchError('invalid-url', 'Only http and https website addresses can be graded.')
  }
  if (url.username || url.password) {
    throw new HomepageFetchError('invalid-url', 'Remove the user name or password from the address.')
  }
  if (url.port && url.port !== '80' && url.port !== '443') {
    throw new HomepageFetchError('invalid-url', 'Use the normal website address, without a port number.')
  }
  const host = url.hostname.toLowerCase().replace(/\.$/, '')
  if (!host) throw new HomepageFetchError('invalid-url', 'That address has no website name in it.')
  const bare = host.replace(/^\[|\]$/g, '')
  if (isIP(bare)) {
    if (isBlockedIp(bare)) throw new HomepageFetchError('blocked-address', 'That address points to a private network, so we will not fetch it.')
    return
  }
  if (host === 'localhost' || BLOCKED_HOST_SUFFIXES.some((s) => host.endsWith(s)) || !host.includes('.')) {
    throw new HomepageFetchError('blocked-address', 'Use a public website address, like example.com.')
  }
}

// ---------------------------------------------------------------------------
// Pinned lookup
// ---------------------------------------------------------------------------

type RawLookup = (
  hostname: string,
  options: { all: true; verbatim: true },
  callback: (err: NodeJS.ErrnoException | null, addresses: LookupAddress[]) => void
) => void

const systemLookup: RawLookup = (hostname, options, callback) => dnsLookup(hostname, options, callback)

class BlockedAddressError extends Error {
  code = 'EBLOCKEDADDRESS'
}

/**
 * A lookup for http.request that resolves, checks every answer and hands
 * back only checked addresses. The socket connects to what we checked.
 */
export function guardedLookup(resolve: RawLookup = systemLookup, isBlocked: (ip: string) => boolean = isBlockedIp): LookupFunction {
  return ((hostname: string, options: { all?: boolean } | number | undefined, callback: (...args: unknown[]) => void) => {
    const wantAll = typeof options === 'object' && options !== null && options.all === true
    resolve(hostname, { all: true, verbatim: true }, (err, addresses) => {
      if (err) return callback(err)
      if (!addresses || addresses.length === 0) return callback(Object.assign(new Error('No address found'), { code: 'ENOTFOUND' }))
      if (addresses.some((a) => isBlocked(a.address))) return callback(new BlockedAddressError('Blocked address'))
      if (wantAll) return callback(null, addresses)
      return callback(null, addresses[0].address, addresses[0].family)
    })
  }) as LookupFunction
}

// ---------------------------------------------------------------------------
// Fetch
// ---------------------------------------------------------------------------

export interface FetchDeps {
  /** DNS resolver; tests pass a fake one. */
  resolve?: RawLookup
  /** IP rule; tests may loosen it to reach a local test server. */
  isBlocked?: (ip: string) => boolean
  /** URL rule without DNS; tests may loosen it for a local test server. */
  assertUrl?: (url: URL) => void
  timeoutMs?: number
  maxBytes?: number
}

interface HopResult {
  status: number
  location?: string
  html?: string
  truncated?: boolean
}

function decoderFor(contentType: string): TextDecoder {
  const charset = contentType.match(/charset\s*=\s*"?([\w-]+)/i)?.[1]
  try {
    return new TextDecoder(charset || 'utf-8')
  } catch {
    return new TextDecoder('utf-8')
  }
}

function bodyStream(res: IncomingMessage): Readable {
  const encoding = String(res.headers['content-encoding'] || '').toLowerCase().trim()
  if (encoding === 'gzip' || encoding === 'x-gzip') return res.pipe(createGunzip())
  if (encoding === 'deflate') return res.pipe(createInflate())
  if (encoding === 'br') return res.pipe(createBrotliDecompress())
  return res
}

function abortError(): Error {
  return Object.assign(new Error('Timed out'), { name: 'AbortError' })
}

function oneHop(url: URL, lookup: LookupFunction, signal: AbortSignal, maxBytes: number): Promise<HopResult> {
  return new Promise((resolve, reject) => {
    if (signal.aborted) {
      reject(abortError())
      return
    }
    const send = url.protocol === 'https:' ? httpsRequest : httpRequest
    const req = send(
      url,
      {
        method: 'GET',
        lookup,
        signal,
        headers: {
          'User-Agent': USER_AGENT,
          Accept: 'text/html,application/xhtml+xml;q=0.9',
          'Accept-Language': 'en-US,en;q=0.8',
          'Accept-Encoding': 'gzip, deflate, br',
        },
      },
      (res) => {
        res.on('error', reject)
        const status = res.statusCode ?? 0
        if (status >= 300 && status < 400 && res.headers.location) {
          resolve({ status, location: String(res.headers.location) })
          res.destroy()
          return
        }
        if (status < 200 || status >= 300) {
          resolve({ status })
          res.destroy()
          return
        }
        const contentType = String(res.headers['content-type'] || '').toLowerCase()
        if (!/^\s*(?:text\/html|application\/xhtml\+xml)\b/.test(contentType)) {
          res.destroy()
          reject(new HomepageFetchError('not-html', 'That address did not return a web page we can read.'))
          return
        }
        const stream = bodyStream(res)
        const chunks: Buffer[] = []
        let size = 0
        let finished = false
        const finish = (truncated: boolean) => {
          if (finished) return
          finished = true
          const body = Buffer.concat(chunks).subarray(0, maxBytes)
          resolve({ status, html: decoderFor(contentType).decode(body), truncated })
        }
        stream.on('data', (chunk: Buffer) => {
          if (finished) return
          chunks.push(chunk)
          size += chunk.length
          if (size >= maxBytes) {
            finish(true)
            res.destroy()
            stream.destroy()
          }
        })
        stream.on('end', () => finish(false))
        stream.on('error', (err) => {
          if (finished) return
          finished = true
          reject(err)
        })
      }
    )
    // Pipes do not pass errors along, so an abort must settle the promise itself.
    signal.addEventListener('abort', () => {
      reject(abortError())
      req.destroy()
    }, { once: true })
    req.on('error', reject)
    req.end()
  })
}

function mapError(err: unknown): HomepageFetchError {
  if (err instanceof HomepageFetchError) return err
  const e = err as { name?: string; code?: string; cause?: { code?: string } }
  const code = e?.code ?? e?.cause?.code
  if (e?.name === 'AbortError' || code === 'ABORT_ERR') {
    return new HomepageFetchError('timeout', 'That site took longer than 6 seconds to answer.')
  }
  if (code === 'EBLOCKEDADDRESS') {
    return new HomepageFetchError('blocked-address', 'That address points to a private network, so we will not fetch it.')
  }
  if (code === 'ENOTFOUND' || code === 'EAI_AGAIN' || code === 'ENODATA') {
    return new HomepageFetchError('dns-failed', 'We could not find that website. Check the spelling and try again.')
  }
  return new HomepageFetchError('network-error', 'We could not reach that website just now.')
}

/**
 * Fetch one public homepage under the rules at the top of this file.
 * Throws HomepageFetchError with a plain message the page can show.
 */
export async function fetchHomepage(input: string, deps: FetchDeps = {}): Promise<FetchedHomepage> {
  const assertUrl = deps.assertUrl ?? assertFetchableUrl
  const lookup = guardedLookup(deps.resolve, deps.isBlocked)
  const maxBytes = deps.maxBytes ?? MAX_BYTES
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), deps.timeoutMs ?? TIMEOUT_MS)

  try {
    let url = parseTargetUrl(input)
    assertUrl(url)
    for (let redirects = 0; ; redirects++) {
      const hop = await oneHop(url, lookup, controller.signal, maxBytes)
      if (hop.location !== undefined) {
        if (redirects >= MAX_REDIRECTS) {
          throw new HomepageFetchError('too-many-redirects', 'That site redirected more than 3 times, so we stopped.')
        }
        let next: URL
        try {
          next = new URL(hop.location, url)
        } catch {
          throw new HomepageFetchError('invalid-url', 'That site redirected to an address we cannot read.')
        }
        assertUrl(next)
        url = next
        continue
      }
      if (hop.html === undefined) {
        throw new HomepageFetchError('http-error', `That site answered with an error (status ${hop.status}).`)
      }
      return { finalUrl: url.toString(), status: hop.status, html: hop.html, truncated: hop.truncated ?? false, redirects }
    }
  } catch (err) {
    throw mapError(err)
  } finally {
    clearTimeout(timer)
  }
}
