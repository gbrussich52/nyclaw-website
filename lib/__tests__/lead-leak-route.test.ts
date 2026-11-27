// classification: PRIVATE
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { NextRequest } from 'next/server'

const mocks = vi.hoisted(() => ({
  limit: vi.fn(),
  fetchHomepage: vi.fn(),
}))

vi.mock('../rate-limit', () => ({
  createRateLimiter: () => ({ backend: 'memory', limit: mocks.limit }),
}))
vi.mock('../lead-leak/fetch-homepage', async () => {
  const actual = await vi.importActual<typeof import('../lead-leak/fetch-homepage')>('../lead-leak/fetch-homepage')
  return { ...actual, fetchHomepage: mocks.fetchHomepage }
})

import { GET, POST } from '../../app/api/lead-leak-grader/route'
import { HomepageFetchError } from '../lead-leak/fetch-homepage'

function post(body: unknown) {
  return new NextRequest('http://localhost/api/lead-leak-grader', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-forwarded-for': '192.0.2.55' },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  })
}

describe('POST /api/lead-leak-grader', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mocks.limit.mockResolvedValue({ allowed: true, remaining: 9, resetAt: Date.now() + 3600_000 })
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('grades the fetched homepage', async () => {
    mocks.fetchHomepage.mockResolvedValue({
      finalUrl: 'https://fictional.example/', status: 200, truncated: false, redirects: 0,
      html: '<meta name="viewport" content="width=device-width"><a href="tel:9145550142">Call</a>',
    })
    const response = await POST(post({ url: 'fictional.example' }))
    expect(response.status).toBe(200)
    expect(response.headers.get('cache-control')).toBe('no-store')
    const data = await response.json()
    expect(data.ok).toBe(true)
    expect(data.result.score).toBe(26)
    expect(data.result.checks).toHaveLength(12)
    expect(mocks.fetchHomepage).toHaveBeenCalledWith('fictional.example')
    expect(mocks.limit).toHaveBeenCalledWith('192.0.2.55')
  })

  it('returns 429 when the hourly limit is used up', async () => {
    mocks.limit.mockResolvedValue({ allowed: false, remaining: 0, resetAt: Date.now() + 120_000 })
    const response = await POST(post({ url: 'fictional.example' }))
    expect(response.status).toBe(429)
    expect(Number(response.headers.get('retry-after'))).toBeGreaterThan(0)
    expect(mocks.fetchHomepage).not.toHaveBeenCalled()
  })

  it('rejects a missing or malformed body', async () => {
    expect((await POST(post({}))).status).toBe(400)
    expect((await POST(post('not json'))).status).toBe(400)
    expect((await POST(post({ url: 'x'.repeat(3000) }))).status).toBe(400)
    expect(mocks.fetchHomepage).not.toHaveBeenCalled()
  })

  it('passes the guard message through for a blocked address', async () => {
    mocks.fetchHomepage.mockRejectedValue(new HomepageFetchError('blocked-address', 'That address points to a private network, so we will not fetch it.'))
    const response = await POST(post({ url: 'http://169.254.169.254' }))
    expect(response.status).toBe(400)
    expect(await response.json()).toMatchObject({ code: 'blocked-address' })
  })

  it('maps a timeout to 504', async () => {
    mocks.fetchHomepage.mockRejectedValue(new HomepageFetchError('timeout', 'slow'))
    expect((await POST(post({ url: 'slow.example' }))).status).toBe(504)
  })

  it('GET is not allowed', () => {
    expect(GET().status).toBe(405)
  })
})
