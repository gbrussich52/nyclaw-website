import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { storeLeadInRedis } from '../leads'

const URL_BASE = 'https://fake-redis.upstash.io'
const TOKEN = 'fake-token'
const ENTRY = { timestamp: '2026-06-10T00:00:00.000Z', name: 'Test', email: 't@example.com' }

function stubCreds() {
  vi.stubEnv('UPSTASH_REDIS_REST_URL', URL_BASE)
  vi.stubEnv('UPSTASH_REDIS_REST_TOKEN', TOKEN)
}

describe('storeLeadInRedis', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    vi.spyOn(console, 'warn').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    vi.restoreAllMocks()
  })

  it('returns false and warns when no Redis credentials are set', async () => {
    vi.stubEnv('UPSTASH_REDIS_REST_URL', '')
    vi.stubEnv('UPSTASH_REDIS_REST_TOKEN', '')
    vi.stubEnv('KV_REST_API_URL', '')
    vi.stubEnv('KV_REST_API_TOKEN', '')
    expect(await storeLeadInRedis(ENTRY)).toBe(false)
    expect(console.warn).toHaveBeenCalled()
  })

  it('LPUSHes the serialized lead and LTRIMs via one pipeline call', async () => {
    stubCreds()
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify([{ result: 1 }, { result: 'OK' }]), { status: 200 })
    )
    vi.stubGlobal('fetch', fetchMock)

    expect(await storeLeadInRedis(ENTRY)).toBe(true)

    expect(fetchMock).toHaveBeenCalledTimes(1)
    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe(`${URL_BASE}/pipeline`)
    expect(init.headers.Authorization).toBe(`Bearer ${TOKEN}`)
    const commands = JSON.parse(init.body)
    expect(commands[0][0]).toBe('LPUSH')
    expect(commands[0][1]).toBe('nyclaw:leads')
    expect(JSON.parse(commands[0][2])).toEqual(ENTRY)
    expect(commands[1][0]).toBe('LTRIM')
  })

  it('returns false on non-200 HTTP responses', async () => {
    stubCreds()
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('nope', { status: 500 })))
    expect(await storeLeadInRedis(ENTRY)).toBe(false)
    expect(console.error).toHaveBeenCalled()
  })

  it('returns false when the LPUSH pipeline command errors', async () => {
    stubCreds()
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify([{ error: 'WRONGTYPE' }, { result: 'OK' }]), { status: 200 })
      )
    )
    expect(await storeLeadInRedis(ENTRY)).toBe(false)
  })

  it('returns false on network failure instead of throwing', async () => {
    stubCreds()
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('fetch failed')))
    await expect(storeLeadInRedis(ENTRY)).resolves.toBe(false)
  })

  it('returns false on malformed JSON response', async () => {
    stubCreds()
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('not-json', { status: 200 })))
    expect(await storeLeadInRedis(ENTRY)).toBe(false)
  })
})
