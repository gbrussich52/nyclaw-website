// Claude Sonnet 5.5, 2026-11-15: route tests for the guide auto-send. nodemailer is mocked; nothing is sent.
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
import { resetGuideSendGuard } from '../guide-email'

const BASE = { name: 'Ana Lopez', businessType: 'Small business', challenge: 'guide-download' }
let n = 0
const req = (p: Record<string, unknown>) =>
  new NextRequest('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-forwarded-for': '192.0.2.9' },
    body: JSON.stringify({ ...BASE, email: `v${++n}@example.test`, ...p }),
  })

describe('guide auto-send', () => {
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

  it.each(['resource_form', 'playbook_form'])('emails the visitor and the owner for %s', async (source) => {
    const res = await POST(req({ source }))
    expect(await res.json()).toEqual({ ok: true, guide_emailed: true })
    expect(mocks.sendMail).toHaveBeenCalledTimes(2)
    const [visitor, owner] = mocks.sendMail.mock.calls.map((c) => c[0])
    expect(visitor.to).toMatch(/@example\.test$/)
    expect(visitor.subject).toBe("Your AI Operator's Playbook from NYClaw")
    expect(owner.to).toBe('owner@example.test')
    expect(owner.text).toContain('GUIDE EMAIL: sent')
  })

  it('does not email the visitor on a plain contact form', async () => {
    const res = await POST(req({ source: 'contact_form' }))
    expect(await res.json()).toEqual({ ok: true })
    expect(mocks.sendMail).toHaveBeenCalledOnce()
    expect(mocks.sendMail.mock.calls[0][0].to).toBe('owner@example.test')
    expect(mocks.sendMail.mock.calls[0][0].text).not.toContain('GUIDE EMAIL')
  })

  it('still succeeds when the visitor email fails and says so in the alert', async () => {
    mocks.sendMail.mockRejectedValueOnce(new Error('smtp down'))
    const res = await POST(req({ source: 'resource_form' }))
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ ok: true, guide_emailed: false })
    expect(mocks.sendMail.mock.calls[1][0].text).toContain('GUIDE EMAIL: FAILED smtp down')
    expect(console.error).toHaveBeenCalled()
    expect(JSON.stringify(vi.mocked(console.error).mock.calls)).not.toContain('@example.test')
  })

  it('sends nothing on the honeypot path', async () => {
    const res = await POST(req({ source: 'resource_form', website: 'bot' }))
    // The schema rejects a filled honeypot outright (400); either way nothing is sent.
    expect(res.status).toBe(400)
    expect(mocks.sendMail).not.toHaveBeenCalled()
  })

  it('sends nothing on the time-trap path', async () => {
    const res = await POST(req({ source: 'resource_form', ts: Date.now() }))
    expect(await res.json()).toEqual({ ok: true })
    expect(mocks.sendMail).not.toHaveBeenCalled()
  })

  it('sends nothing for an invalid address', async () => {
    const res = await POST(req({ source: 'resource_form', email: 'not-an-email' }))
    expect(res.status).toBe(400)
    expect(mocks.sendMail).not.toHaveBeenCalled()
  })

  it('does not send the guide twice for the same address', async () => {
    const email = 'same@example.test'
    await POST(req({ source: 'resource_form', email }))
    await POST(req({ source: 'playbook_form', email }))
    const visitorSends = mocks.sendMail.mock.calls.filter((c) => c[0].to === email)
    expect(visitorSends).toHaveLength(1)
  })
})
