// Claude Sonnet 5.5, 2026-11-16: tests for the Resend-first guide send with Gmail fallback.
// fetch is mocked; nothing touches the network.
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { NextRequest } from 'next/server'

const mocks = vi.hoisted(() => ({
  storeLeadInRedis: vi.fn(),
  limit: vi.fn(),
  sendMail: vi.fn(),
}))
vi.mock('../leads', () => ({ storeLeadInRedis: mocks.storeLeadInRedis, getLeadsFromRedis: vi.fn() }))
vi.mock('../rate-limit', () => ({ createRateLimiter: () => ({ backend: 'memory', limit: mocks.limit }) }))
vi.mock('nodemailer', () => ({ default: { createTransport: () => ({ sendMail: mocks.sendMail }) } }))

import { POST } from '../../app/api/contact/route'
import { resetGuideSendGuard, sendGuideEmail } from '../guide-email'

const KEY = 're_SECRET_test_key_123'
const json = (status: number, body: unknown) => new Response(JSON.stringify(body), { status })

let fetchMock: ReturnType<typeof vi.fn>
const gmail = () => ({ sendMail: vi.fn().mockResolvedValue({}) })

beforeEach(() => {
  resetGuideSendGuard()
  fetchMock = vi.fn()
  vi.stubGlobal('fetch', fetchMock)
  vi.spyOn(console, 'error').mockImplementation(() => {})
  vi.spyOn(console, 'log').mockImplementation(() => {})
  vi.spyOn(console, 'warn').mockImplementation(() => {})
})
afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); vi.restoreAllMocks() })

describe('sendGuideEmail with RESEND_API_KEY', () => {
  beforeEach(() => vi.stubEnv('RESEND_API_KEY', KEY))

  it('sends through Resend and skips Gmail', async () => {
    fetchMock.mockResolvedValue(json(200, { id: 'abc' }))
    const t = gmail()
    expect(await sendGuideEmail(t, 'a@example.test', 'Ana')).toEqual({ sent: true, via: 'resend' })
    expect(t.sendMail).not.toHaveBeenCalled()
    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe('https://api.resend.com/emails')
    expect(init.method).toBe('POST')
    expect(init.headers.Authorization).toBe(`Bearer ${KEY}`)
    expect(init.signal).toBeInstanceOf(AbortSignal)
    const body = JSON.parse(init.body)
    expect(body.from).toBe('"Giani Brussich, NYClaw" <hello@nyclaw.io>')
    expect(body.reply_to).toBe('hello@nyclaw.io')
    expect(body.to).toBe('a@example.test')
    expect(body.subject).toBe("Your AI Operator's Playbook from NYClaw")
    expect(body.text).toContain('https://nyclaw.io/ai-operators-playbook.html')
    expect(body.html).toContain('https://nyclaw.io/ai-operators-playbook.html')
  })

  it('works with no Gmail transport at all', async () => {
    fetchMock.mockResolvedValue(json(200, {}))
    expect(await sendGuideEmail(null, 'a@example.test', 'Ana')).toEqual({ sent: true, via: 'resend' })
  })

  it.each([
    ['422', () => fetchMock.mockResolvedValue(json(422, { name: 'validation_error', message: 'x' })), 'Resend HTTP 422 validation_error'],
    ['500', () => fetchMock.mockResolvedValue(json(500, {})), 'Resend HTTP 500'],
    ['thrown error', () => fetchMock.mockRejectedValue(new Error(`boom ${KEY}`)), 'Resend network error'],
    ['timeout', () => fetchMock.mockRejectedValue(Object.assign(new Error('t'), { name: 'TimeoutError' })), 'Resend timeout'],
  ])('falls back to Gmail on %s', async (_l, arrange, note) => {
    arrange()
    const t = gmail()
    const r = await sendGuideEmail(t, 'a@example.test', 'Ana')
    expect(r).toEqual({ sent: true, via: 'gmail', resendNote: note })
    expect(t.sendMail).toHaveBeenCalledOnce()
  })

  it('fails with a clean reason when Resend fails and there is no Gmail', async () => {
    fetchMock.mockRejectedValue(new Error(`boom ${KEY}`))
    const r = await sendGuideEmail(null, 'a@example.test', 'Ana')
    expect(r).toEqual({ sent: false, reason: 'Resend network error; mail transport not configured' })
    expect(JSON.stringify(r)).not.toContain(KEY)
  })

  it('reports both failures without the key or the address', async () => {
    fetchMock.mockResolvedValue(json(401, { name: 'restricted_api_key', message: KEY }))
    const t = { sendMail: vi.fn().mockRejectedValue(new Error('smtp a@example.test')) }
    const r = await sendGuideEmail(t, 'a@example.test', 'Ana')
    expect(r).toEqual({ sent: false, reason: 'Resend HTTP 401 restricted_api_key; Gmail: smtp [address]' })
  })

  it('drops an odd error name from Resend', async () => {
    fetchMock.mockResolvedValue(json(400, { name: `bad ${KEY} name` }))
    const r = await sendGuideEmail(null, 'a@example.test', 'Ana')
    expect(JSON.stringify(r)).not.toContain(KEY)
  })

  it('repeat request reports the same path and sends once', async () => {
    fetchMock.mockResolvedValue(json(200, {}))
    await sendGuideEmail(null, 'a@example.test', 'Ana')
    expect(await sendGuideEmail(null, 'A@example.test', 'Ana')).toEqual({ sent: true, via: 'resend' })
    expect(fetchMock).toHaveBeenCalledOnce()
  })

  it('never puts the key in a console call', async () => {
    fetchMock.mockRejectedValue(new Error(`boom ${KEY}`))
    await sendGuideEmail(null, 'a@example.test', 'Ana')
    const all = JSON.stringify([
      ...vi.mocked(console.error).mock.calls, ...vi.mocked(console.log).mock.calls, ...vi.mocked(console.warn).mock.calls,
    ])
    expect(all).not.toContain(KEY)
  })
})

describe('sendGuideEmail without RESEND_API_KEY', () => {
  it('sends one Gmail message exactly as before and never calls fetch', async () => {
    vi.stubEnv('RESEND_API_KEY', '')
    const t = gmail()
    expect(await sendGuideEmail(t, 'a@example.test', 'Ana')).toEqual({ sent: true, via: 'gmail' })
    expect(fetchMock).not.toHaveBeenCalled()
    expect(t.sendMail).toHaveBeenCalledOnce()
    const o = t.sendMail.mock.calls[0][0]
    expect(Object.keys(o).sort()).toEqual(['from', 'html', 'replyTo', 'subject', 'text', 'to'])
    expect(o.from).toBe('"Giani Brussich, NYClaw" <hello@nyclaw.io>')
    expect(o.replyTo).toBe('hello@nyclaw.io')
  })
  it('fails with no key and no Gmail', async () => {
    expect(await sendGuideEmail(null, 'a@example.test', 'Ana')).toEqual({ sent: false, reason: 'mail transport not configured' })
  })
})

describe('route status lines', () => {
  let n = 0
  const req = () => new NextRequest('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-forwarded-for': '192.0.2.9' },
    body: JSON.stringify({ name: 'Ana Lopez', businessType: 'Small business', challenge: 'guide-download', source: 'resource_form', email: `r${++n}@example.test` }),
  })
  const ownerText = () => mocks.sendMail.mock.calls.map((c) => c[0]).find((o) => o.to === 'owner@example.test')?.text as string
  beforeEach(() => {
    vi.stubEnv('NODE_ENV', 'production')
    vi.stubEnv('NOTIFY_EMAIL', 'owner@example.test')
    mocks.limit.mockResolvedValue({ allowed: true, remaining: 2, resetAt: Date.now() + 3600_000 })
    mocks.storeLeadInRedis.mockResolvedValue(true)
    mocks.sendMail.mockReset().mockResolvedValue({})
  })

  it('key set and no Gmail env: guide still sends through Resend', async () => {
    vi.stubEnv('GMAIL_USER', ''); vi.stubEnv('GMAIL_APP_PASSWORD', ''); vi.stubEnv('RESEND_API_KEY', KEY)
    fetchMock.mockResolvedValue(json(200, {}))
    const res = await POST(req())
    expect(await res.json()).toEqual({ ok: true, guide_emailed: true })
    expect(fetchMock).toHaveBeenCalledOnce()
    expect(mocks.sendMail).not.toHaveBeenCalled()
  })

  it('key set with Gmail: alert says signed for nyclaw.io', async () => {
    vi.stubEnv('GMAIL_USER', 's@example.test'); vi.stubEnv('GMAIL_APP_PASSWORD', 'x'); vi.stubEnv('RESEND_API_KEY', KEY)
    fetchMock.mockResolvedValue(json(200, {}))
    await POST(req())
    expect(ownerText()).toContain('GUIDE EMAIL: sent (signed for nyclaw.io)')
    expect(mocks.sendMail).toHaveBeenCalledOnce() // owner alert only
  })

  it('Resend fails: Gmail sends and the alert says so', async () => {
    vi.stubEnv('GMAIL_USER', 's@example.test'); vi.stubEnv('GMAIL_APP_PASSWORD', 'x'); vi.stubEnv('RESEND_API_KEY', KEY)
    fetchMock.mockResolvedValue(json(500, {}))
    const res = await POST(req())
    expect(await res.json()).toEqual({ ok: true, guide_emailed: true })
    expect(ownerText()).toContain('GUIDE EMAIL: sent through Gmail after Resend HTTP 500 (may land in spam)')
    expect(mocks.sendMail).toHaveBeenCalledTimes(2)
  })

  it('no key: alert says Gmail and how to fix it', async () => {
    vi.stubEnv('GMAIL_USER', 's@example.test'); vi.stubEnv('GMAIL_APP_PASSWORD', 'x'); vi.stubEnv('RESEND_API_KEY', '')
    await POST(req())
    expect(ownerText()).toContain('GUIDE EMAIL: sent through Gmail (may land in spam until RESEND_API_KEY is set)')
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('Resend fails and Gmail env is missing: FAILED, no key in the response or logs', async () => {
    vi.stubEnv('GMAIL_USER', ''); vi.stubEnv('GMAIL_APP_PASSWORD', ''); vi.stubEnv('RESEND_API_KEY', KEY)
    fetchMock.mockRejectedValue(new Error(`boom ${KEY}`))
    const res = await POST(req())
    expect(await res.json()).toEqual({ ok: true, guide_emailed: false })
    expect(JSON.stringify(vi.mocked(console.error).mock.calls)).not.toContain(KEY)
  })

  // Claude Sonnet 5.5, 2026-11-17: proves the both-fail case at the route with Gmail configured: the
  // visitor-facing flag is false and the owner alert says FAILED with both reasons (no silent success).
  it('Resend fails and Gmail send throws: guide_emailed false, alert says FAILED', async () => {
    vi.stubEnv('GMAIL_USER', 's@example.test'); vi.stubEnv('GMAIL_APP_PASSWORD', 'x'); vi.stubEnv('RESEND_API_KEY', KEY)
    fetchMock.mockResolvedValue(json(500, {}))
    mocks.sendMail.mockImplementation(async (o: { to: string }) => {
      if (o.to !== 'owner@example.test') throw new Error('smtp down')
      return {}
    })
    const res = await POST(req())
    expect(await res.json()).toEqual({ ok: true, guide_emailed: false })
    expect(ownerText()).toContain('GUIDE EMAIL: FAILED Resend HTTP 500; Gmail: smtp down')
  })

  it('neither key nor Gmail: FAILED as before', async () => {
    vi.stubEnv('GMAIL_USER', ''); vi.stubEnv('GMAIL_APP_PASSWORD', ''); vi.stubEnv('RESEND_API_KEY', '')
    const res = await POST(req())
    expect(await res.json()).toEqual({ ok: true, guide_emailed: false })
  })
})
