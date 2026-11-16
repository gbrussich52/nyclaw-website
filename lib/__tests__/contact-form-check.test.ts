// Claude Sonnet 5.5, 2026-11-16: tests for the form-delivery check test path. nodemailer is mocked; nothing is sent.
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { NextRequest } from 'next/server'

const mocks = vi.hoisted(() => ({
  storeLeadInRedis: vi.fn(),
  limit: vi.fn(),
  sendMail: vi.fn(),
}))

vi.mock('../leads', () => ({ storeLeadInRedis: mocks.storeLeadInRedis, getLeadsFromRedis: vi.fn() }))
vi.mock('../rate-limit', () => ({ createRateLimiter: () => ({ backend: 'memory', limit: mocks.limit }) }))
vi.mock('nodemailer', () => ({
  default: { createTransport: () => ({ sendMail: mocks.sendMail }) },
}))

import { POST } from '../../app/api/contact/route'
import { FORM_CHECK_ADDRESS, resetGuideSendGuard } from '../guide-email'

const BASE = { name: 'Playbook Request', businessType: 'playbook-signup', challenge: 'guide-download', source: 'playbook_form' }
const req = (p: Record<string, unknown>) =>
  new NextRequest('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-forwarded-for': '192.0.2.9' },
    body: JSON.stringify({ ...BASE, ...p }),
  })

describe('form-check test path', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    resetGuideSendGuard()
    vi.stubEnv('NODE_ENV', 'production')
    vi.stubEnv('GMAIL_USER', 'sender@example.test')
    vi.stubEnv('GMAIL_APP_PASSWORD', 'x')
    vi.stubEnv('NOTIFY_EMAIL', 'owner@example.test')
    mocks.limit.mockResolvedValue({ allowed: true, remaining: 2, resetAt: Date.now() + 3600_000 })
    mocks.storeLeadInRedis.mockResolvedValue(true)
    mocks.sendMail.mockResolvedValue({})
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })
  afterEach(() => { vi.unstubAllEnvs(); vi.restoreAllMocks() })

  it('sends the visitor guide, skips the owner alert and tags the lead as a test', async () => {
    const res = await POST(req({ email: FORM_CHECK_ADDRESS }))
    expect(await res.json()).toEqual({ ok: true, guide_emailed: true })
    expect(mocks.sendMail).toHaveBeenCalledTimes(1)
    const visitor = mocks.sendMail.mock.calls[0][0]
    expect(visitor.to).toBe(FORM_CHECK_ADDRESS)
    expect(visitor.subject).toBe("Your AI Operator's Playbook from NYClaw")
    expect(visitor.text).toContain('/ai-operators-playbook.html')
    expect(mocks.sendMail.mock.calls.some((c) => c[0].to === 'owner@example.test')).toBe(false)
    expect(mocks.storeLeadInRedis.mock.calls[0][0]).toMatchObject({ email: FORM_CHECK_ADDRESS, test: true })
  })

  it('matches the address regardless of case', async () => {
    await POST(req({ email: 'Hello+FormCheck@NYClaw.io' }))
    expect(mocks.sendMail).toHaveBeenCalledTimes(1)
    expect(mocks.storeLeadInRedis.mock.calls[0][0].test).toBe(true)
  })

  it('leaves any other address unchanged: visitor email, owner alert, no test tag', async () => {
    const res = await POST(req({ email: 'someone@example.test' }))
    expect(await res.json()).toEqual({ ok: true, guide_emailed: true })
    expect(mocks.sendMail).toHaveBeenCalledTimes(2)
    expect(mocks.sendMail.mock.calls[1][0].to).toBe('owner@example.test')
    expect(mocks.storeLeadInRedis.mock.calls[0][0]).not.toHaveProperty('test')
  })

  it('does not match a look-alike address', async () => {
    await POST(req({ email: 'hello+formcheck@nyclaw.io.example.test' }))
    await POST(req({ email: 'x+hello+formcheck@nyclaw.io' }))
    expect(mocks.sendMail).toHaveBeenCalledTimes(4)
  })

  it('still enforces the honeypot and the rate limit for the test address', async () => {
    const bot = await POST(req({ email: FORM_CHECK_ADDRESS, website: 'bot' }))
    expect(bot.status).toBe(400)
    mocks.limit.mockResolvedValueOnce({ allowed: false, resetAt: Date.now() + 1000 })
    const limited = await POST(req({ email: FORM_CHECK_ADDRESS }))
    expect(limited.status).toBe(429)
    expect(mocks.sendMail).not.toHaveBeenCalled()
  })
})
