import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  createRateLimiter,
  createMemoryRateLimiter,
  createUpstashRateLimiter,
} from '../rate-limit'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Build a successful Upstash /pipeline response: [INCR, PEXPIRE, PTTL]. */
function pipelineResponse(count: number, pttlMs: number) {
  return new Response(
    JSON.stringify([{ result: count }, { result: 1 }, { result: pttlMs }]),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  )
}

const CONFIG = { name: 'test', max: 3, windowMs: 60_000 }
const URL_BASE = 'https://fake.upstash.io'
const TOKEN = 'fake-token'

afterEach(() => {
  vi.unstubAllGlobals()
  vi.unstubAllEnvs()
  vi.useRealTimers()
})

// ---------------------------------------------------------------------------
// In-memory backend
// ---------------------------------------------------------------------------

describe('createMemoryRateLimiter', () => {
  it('allows up to max requests, then blocks', async () => {
    const limiter = createMemoryRateLimiter(CONFIG)
    expect((await limiter.limit('1.1.1.1')).allowed).toBe(true)
    expect((await limiter.limit('1.1.1.1')).allowed).toBe(true)
    expect((await limiter.limit('1.1.1.1')).allowed).toBe(true)
    const fourth = await limiter.limit('1.1.1.1')
    expect(fourth.allowed).toBe(false)
    expect(fourth.remaining).toBe(0)
  })

  it('tracks identifiers independently', async () => {
    const limiter = createMemoryRateLimiter(CONFIG)
    for (let i = 0; i < 3; i++) await limiter.limit('1.1.1.1')
    expect((await limiter.limit('1.1.1.1')).allowed).toBe(false)
    expect((await limiter.limit('2.2.2.2')).allowed).toBe(true)
  })

  it('resets after the window elapses', async () => {
    vi.useFakeTimers()
    const limiter = createMemoryRateLimiter(CONFIG)
    for (let i = 0; i < 4; i++) await limiter.limit('1.1.1.1')
    expect((await limiter.limit('1.1.1.1')).allowed).toBe(false)

    vi.advanceTimersByTime(CONFIG.windowMs + 1)
    const after = await limiter.limit('1.1.1.1')
    expect(after.allowed).toBe(true)
    expect(after.remaining).toBe(CONFIG.max - 1)
  })

  it('reports decreasing remaining and a resetAt in the future', async () => {
    const limiter = createMemoryRateLimiter(CONFIG)
    const first = await limiter.limit('1.1.1.1')
    const second = await limiter.limit('1.1.1.1')
    expect(first.remaining).toBe(2)
    expect(second.remaining).toBe(1)
    expect(second.resetAt).toBeGreaterThan(Date.now() - 1)
  })
})

// ---------------------------------------------------------------------------
// Upstash REST backend
// ---------------------------------------------------------------------------

describe('createUpstashRateLimiter', () => {
  let fetchMock: ReturnType<typeof vi.fn>

  beforeEach(() => {
    fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  it('sends INCR + PEXPIRE NX + PTTL to the pipeline endpoint with auth', async () => {
    fetchMock.mockResolvedValueOnce(pipelineResponse(1, 60_000))
    const limiter = createUpstashRateLimiter(CONFIG, URL_BASE, TOKEN)
    await limiter.limit('1.1.1.1')

    expect(fetchMock).toHaveBeenCalledTimes(1)
    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe(`${URL_BASE}/pipeline`)
    expect(init.headers.Authorization).toBe(`Bearer ${TOKEN}`)
    expect(JSON.parse(init.body)).toEqual([
      ['INCR', 'rl:test:1.1.1.1'],
      ['PEXPIRE', 'rl:test:1.1.1.1', '60000', 'NX'],
      ['PTTL', 'rl:test:1.1.1.1'],
    ])
  })

  it('allows while the counter is within max', async () => {
    fetchMock.mockResolvedValueOnce(pipelineResponse(3, 30_000))
    const limiter = createUpstashRateLimiter(CONFIG, URL_BASE, TOKEN)
    const result = await limiter.limit('1.1.1.1')
    expect(result.allowed).toBe(true)
    expect(result.remaining).toBe(0)
  })

  it('blocks once the counter exceeds max', async () => {
    fetchMock.mockResolvedValueOnce(pipelineResponse(4, 30_000))
    const limiter = createUpstashRateLimiter(CONFIG, URL_BASE, TOKEN)
    const result = await limiter.limit('1.1.1.1')
    expect(result.allowed).toBe(false)
    expect(result.remaining).toBe(0)
    expect(result.resetAt).toBeGreaterThan(Date.now())
  })

  it('fails open when fetch rejects (network/timeout)', async () => {
    fetchMock.mockRejectedValueOnce(new Error('network down'))
    const limiter = createUpstashRateLimiter(CONFIG, URL_BASE, TOKEN)
    const result = await limiter.limit('1.1.1.1')
    expect(result.allowed).toBe(true)
    expect(console.error).toHaveBeenCalled()
  })

  it('fails open on a non-200 HTTP response', async () => {
    fetchMock.mockResolvedValueOnce(new Response('nope', { status: 500 }))
    const limiter = createUpstashRateLimiter(CONFIG, URL_BASE, TOKEN)
    const result = await limiter.limit('1.1.1.1')
    expect(result.allowed).toBe(true)
    expect(console.error).toHaveBeenCalled()
  })

  it('fails open when a pipeline command returns an error', async () => {
    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify([{ error: 'ERR wrong kind' }, { result: 1 }, { result: 1 }]), {
        status: 200,
      })
    )
    const limiter = createUpstashRateLimiter(CONFIG, URL_BASE, TOKEN)
    const result = await limiter.limit('1.1.1.1')
    expect(result.allowed).toBe(true)
    expect(console.error).toHaveBeenCalled()
  })

  it('fails open on malformed JSON (non-numeric INCR)', async () => {
    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify([{ result: 'oops' }, { result: 1 }, { result: 1 }]), {
        status: 200,
      })
    )
    const limiter = createUpstashRateLimiter(CONFIG, URL_BASE, TOKEN)
    const result = await limiter.limit('1.1.1.1')
    expect(result.allowed).toBe(true)
  })

  it('repairs a missing TTL (PTTL -1) and still answers from the count', async () => {
    fetchMock
      .mockResolvedValueOnce(pipelineResponse(2, -1)) // main pipeline: no TTL
      .mockResolvedValueOnce(new Response(JSON.stringify({ result: 1 }), { status: 200 })) // repair PEXPIRE
    const limiter = createUpstashRateLimiter(CONFIG, URL_BASE, TOKEN)
    const result = await limiter.limit('1.1.1.1')
    expect(result.allowed).toBe(true)
    expect(result.resetAt).toBeGreaterThan(Date.now())
    // Fire-and-forget repair call was issued
    expect(fetchMock).toHaveBeenCalledTimes(2)
    expect(String(fetchMock.mock.calls[1][0])).toContain('/pexpire/')
  })
})

// ---------------------------------------------------------------------------
// Factory env-gating
// ---------------------------------------------------------------------------

describe('createRateLimiter (factory)', () => {
  beforeEach(() => {
    vi.spyOn(console, 'warn').mockImplementation(() => {})
  })

  it('uses the in-memory backend when Upstash env vars are unset', () => {
    vi.stubEnv('UPSTASH_REDIS_REST_URL', '')
    vi.stubEnv('UPSTASH_REDIS_REST_TOKEN', '')
    const limiter = createRateLimiter(CONFIG)
    expect(limiter.backend).toBe('memory')
    expect(console.warn).toHaveBeenCalled()
  })

  it('uses the Upstash backend when both env vars are set', () => {
    vi.stubEnv('UPSTASH_REDIS_REST_URL', URL_BASE)
    vi.stubEnv('UPSTASH_REDIS_REST_TOKEN', TOKEN)
    const limiter = createRateLimiter(CONFIG)
    expect(limiter.backend).toBe('upstash')
  })

  it('falls back to memory when only one env var is set', () => {
    vi.stubEnv('UPSTASH_REDIS_REST_URL', URL_BASE)
    vi.stubEnv('UPSTASH_REDIS_REST_TOKEN', '')
    const limiter = createRateLimiter(CONFIG)
    expect(limiter.backend).toBe('memory')
  })
})
