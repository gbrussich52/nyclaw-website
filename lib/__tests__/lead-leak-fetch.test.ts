// classification: PRIVATE
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createServer, type IncomingHttpHeaders, type Server } from 'node:http'
import { isIP, type AddressInfo } from 'node:net'
import { gzipSync } from 'node:zlib'
import {
  USER_AGENT,
  HomepageFetchError,
  fetchHomepage,
  guardedLookup,
  isBlockedIp,
  normalizeTargetUrl,
} from '../lead-leak/fetch-homepage'

describe('isBlockedIp', () => {
  it.each([
    '0.0.0.0', '10.1.2.3', '100.64.0.1', '100.127.255.255', '127.0.0.1', '127.255.255.254',
    '169.254.169.254', '172.16.0.1', '172.31.255.255', '192.0.0.1', '192.168.1.1', '198.18.0.1',
    '224.0.0.1', '239.255.255.250', '240.0.0.1', '255.255.255.255',
  ])('blocks IPv4 %s', (ip) => {
    expect(isBlockedIp(ip)).toBe(true)
  })

  it.each(['8.8.8.8', '1.1.1.1', '172.32.0.1', '100.128.0.1', '93.184.216.34', '11.0.0.1'])('allows public IPv4 %s', (ip) => {
    expect(isBlockedIp(ip)).toBe(false)
  })

  it.each([
    '::', '::1', '[::1]', '::ffff:127.0.0.1', '::ffff:7f00:1', '::ffff:10.0.0.1', '::ffff:169.254.169.254',
    '::ffff:a9fe:a9fe', '::127.0.0.1', '::ffff:0:7f00:1', 'fe80::1', 'fe80::1%eth0', 'fc00::1', 'fd00:ec2::254',
    'ff02::1', '64:ff9b::a00:1', '64:ff9b:1::1', '2002:7f00:1::1', '2001::1', '2001:db8::1', '100::1',
  ])('blocks IPv6 %s', (ip) => {
    expect(isBlockedIp(ip)).toBe(true)
  })

  it.each(['2606:4700:4700::1111', '2001:4860:4860::8888', '::ffff:8.8.8.8', '64:ff9b::808:808', '2002:808:808::1'])(
    'allows public IPv6 %s', (ip) => {
      expect(isBlockedIp(ip)).toBe(false)
    })

  it('blocks anything that is not an IP', () => {
    expect(isBlockedIp('')).toBe(true)
    expect(isBlockedIp('example.com')).toBe(true)
    expect(isBlockedIp('999.1.1.1')).toBe(true)
  })
})

describe('normalizeTargetUrl', () => {
  it('adds https:// when no scheme is given', () => {
    expect(normalizeTargetUrl('example.com').toString()).toBe('https://example.com/')
    expect(normalizeTargetUrl('  Example.com/about ').toString()).toBe('https://example.com/about')
    expect(normalizeTargetUrl('www.example.com').protocol).toBe('https:')
  })

  it('keeps http and https as typed', () => {
    expect(normalizeTargetUrl('http://example.com').protocol).toBe('http:')
    expect(normalizeTargetUrl('https://example.com:443/').toString()).toBe('https://example.com/')
  })

  function codeOf(input: string): string | undefined {
    try { normalizeTargetUrl(input); return undefined } catch (err) { return (err as HomepageFetchError).code }
  }

  it.each([
    ['ftp://example.com', 'invalid-url'],
    ['javascript:alert(1)', 'invalid-url'],
    ['file:///etc/passwd', 'invalid-url'],
    ['data:text/html,hi', 'invalid-url'],
    ['https://user:pw@example.com', 'invalid-url'],
    ['example.com:8080', 'invalid-url'],
    ['http://example.com:22/', 'invalid-url'],
    ['', 'invalid-url'],
    ['exa mple.com', 'invalid-url'],
    ['localhost', 'blocked-address'],
    ['http://localhost:80/', 'blocked-address'],
    ['http://127.0.0.1', 'blocked-address'],
    ['http://[::1]/', 'blocked-address'],
    ['http://[::ffff:127.0.0.1]/', 'blocked-address'],
    ['http://2130706433/', 'blocked-address'],
    ['http://0x7f.0.0.1/', 'blocked-address'],
    ['http://169.254.169.254/latest/meta-data/', 'blocked-address'],
    ['http://[fd00:ec2::254]/', 'blocked-address'],
    ['printer.local', 'blocked-address'],
    ['service.internal', 'blocked-address'],
    ['intranet', 'blocked-address'],
  ])('rejects %s', (input, code) => {
    expect(codeOf(input)).toBe(code)
  })

  it('rejects very long input', () => {
    expect(codeOf(`https://example.com/${'a'.repeat(3000)}`)).toBe('invalid-url')
  })
})

describe('guardedLookup', () => {
  const fake = (addresses: { address: string; family: number }[]) =>
    (_h: string, _o: unknown, cb: (err: NodeJS.ErrnoException | null, a: { address: string; family: number }[]) => void) => cb(null, addresses)

  function run(addresses: { address: string; family: number }[], options: object): Promise<{ err: unknown; args: unknown[] }> {
    return new Promise((resolve) => {
      const lookup = guardedLookup(fake(addresses)) as unknown as (h: string, o: object, cb: (...a: unknown[]) => void) => void
      lookup('site.example', options, (err: unknown, ...args: unknown[]) => resolve({ err, args }))
    })
  }

  it('returns a public address', async () => {
    const { err, args } = await run([{ address: '93.184.216.34', family: 4 }], {})
    expect(err).toBeNull()
    expect(args).toEqual(['93.184.216.34', 4])
  })

  it('returns the whole list when asked for all', async () => {
    const list = [{ address: '93.184.216.34', family: 4 }, { address: '2606:2800:220:1::1', family: 6 }]
    const { err, args } = await run(list, { all: true })
    expect(err).toBeNull()
    expect(args[0]).toEqual(list)
  })

  it('refuses when any answer is private', async () => {
    const { err } = await run([{ address: '93.184.216.34', family: 4 }, { address: '10.0.0.7', family: 4 }], {})
    expect((err as { code?: string }).code).toBe('EBLOCKEDADDRESS')
  })

  it('refuses a metadata answer', async () => {
    const { err } = await run([{ address: '169.254.169.254', family: 4 }], {})
    expect((err as { code?: string }).code).toBe('EBLOCKEDADDRESS')
  })
})

// A local server stands in for the internet. The test resolver points every
// name at 127.0.0.1, except internal.test, which "resolves" to a private IP.
describe('fetchHomepage against a local server', () => {
  let server: Server
  let port = 0
  let lastHeaders: IncomingHttpHeaders = {}
  let lastMethod = ''
  const html = '<html><head><meta name="viewport" content="width=device-width"></head><body><a href="tel:9145550142">Call</a></body></html>'

  beforeAll(async () => {
    server = createServer((req, res) => {
      lastHeaders = req.headers
      lastMethod = req.method ?? ''
      const path = req.url ?? '/'
      if (path === '/ok') { res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }); res.end(html); return }
      if (path === '/redirect') { res.writeHead(302, { Location: '/ok' }); res.end(); return }
      if (path.startsWith('/chain')) {
        const n = Number(path.slice(6) || '0')
        res.writeHead(301, { Location: `/chain${n + 1}` }); res.end(); return
      }
      if (path === '/to-metadata') { res.writeHead(302, { Location: 'http://169.254.169.254/latest/meta-data/' }); res.end(); return }
      if (path === '/to-internal') { res.writeHead(302, { Location: `http://internal.test:${port}/ok` }); res.end(); return }
      if (path === '/to-ftp') { res.writeHead(302, { Location: 'ftp://site.test/file' }); res.end(); return }
      if (path === '/json') { res.writeHead(200, { 'Content-Type': 'application/json' }); res.end('{}'); return }
      if (path === '/big') { res.writeHead(200, { 'Content-Type': 'text/html' }); res.end('<p>' + 'x'.repeat(50_000) + '</p>'); return }
      if (path === '/gzip') { res.writeHead(200, { 'Content-Type': 'text/html', 'Content-Encoding': 'gzip' }); res.end(gzipSync(html)); return }
      if (path === '/slow') { res.writeHead(200, { 'Content-Type': 'text/html' }); res.write('<p>'); return }
      if (path === '/hang') return
      res.writeHead(500, { 'Content-Type': 'text/html' }); res.end('error')
    })
    await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve))
    port = (server.address() as AddressInfo).port
  })

  afterAll(async () => {
    server.closeAllConnections?.()
    await new Promise<void>((resolve) => server.close(() => resolve()))
  })

  const deps = {
    resolve: (host: string, _o: unknown, cb: (err: NodeJS.ErrnoException | null, a: { address: string; family: number }[]) => void) =>
      cb(null, [{ address: host === 'internal.test' ? '10.0.0.5' : '127.0.0.1', family: 4 }]),
    // Same rules as production, except the one loopback address the test server uses.
    isBlocked: (ip: string) => ip !== '127.0.0.1' && isBlockedIp(ip),
    assertUrl: (url: URL) => {
      if (url.protocol !== 'http:' && url.protocol !== 'https:') throw new HomepageFetchError('invalid-url', 'scheme')
      const host = url.hostname.replace(/^\[|\]$/g, '')
      if (isIP(host) && host !== '127.0.0.1' && isBlockedIp(host)) throw new HomepageFetchError('blocked-address', 'private')
    },
    timeoutMs: 1500,
  }
  const site = (path: string) => `http://site.test:${port}${path}`

  async function codeOf(path: string, extra: object = {}): Promise<string | undefined> {
    try { await fetchHomepage(site(path), { ...deps, ...extra }); return undefined } catch (err) { return (err as HomepageFetchError).code }
  }

  it('reads an HTML page with a plain GET and our User-Agent', async () => {
    const page = await fetchHomepage(site('/ok'), deps)
    expect(page.html).toBe(html)
    expect(page.status).toBe(200)
    expect(page.truncated).toBe(false)
    expect(lastMethod).toBe('GET')
    expect(lastHeaders['user-agent']).toBe(USER_AGENT)
    expect(lastHeaders.cookie).toBeUndefined()
  })

  it('follows a redirect and reports the final URL', async () => {
    const page = await fetchHomepage(site('/redirect'), deps)
    expect(page.finalUrl).toBe(site('/ok'))
    expect(page.redirects).toBe(1)
  })

  it('stops after 3 redirects', async () => {
    expect(await codeOf('/chain0')).toBe('too-many-redirects')
  })

  it('re-checks each redirect hop: metadata IP', async () => {
    expect(await codeOf('/to-metadata')).toBe('blocked-address')
  })

  it('re-checks each redirect hop: a name that resolves to a private IP', async () => {
    expect(await codeOf('/to-internal')).toBe('blocked-address')
  })

  it('re-checks each redirect hop: scheme', async () => {
    expect(await codeOf('/to-ftp')).toBe('invalid-url')
  })

  it('refuses a first hop whose name resolves to a private IP', async () => {
    try {
      await fetchHomepage(`http://internal.test:${port}/ok`, deps)
      expect.unreachable()
    } catch (err) {
      expect((err as HomepageFetchError).code).toBe('blocked-address')
    }
  })

  it('only accepts HTML', async () => {
    expect(await codeOf('/json')).toBe('not-html')
  })

  it('stops reading at the byte limit', async () => {
    const page = await fetchHomepage(site('/big'), { ...deps, maxBytes: 1000 })
    expect(page.truncated).toBe(true)
    expect(page.html.length).toBeLessThanOrEqual(1000)
  })

  it('decompresses gzip', async () => {
    const page = await fetchHomepage(site('/gzip'), deps)
    expect(page.html).toBe(html)
  })

  it('times out a slow body and a server that never answers', async () => {
    expect(await codeOf('/slow', { timeoutMs: 200 })).toBe('timeout')
    expect(await codeOf('/hang', { timeoutMs: 200 })).toBe('timeout')
  })

  it('reports an error status', async () => {
    expect(await codeOf('/missing')).toBe('http-error')
  })

  it('production rules refuse the local server outright', async () => {
    try {
      await fetchHomepage(`http://127.0.0.1:${port}/ok`)
      expect.unreachable()
    } catch (err) {
      expect(['blocked-address', 'invalid-url']).toContain((err as HomepageFetchError).code)
    }
  })
})
