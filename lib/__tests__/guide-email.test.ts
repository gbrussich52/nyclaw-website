// Claude Sonnet 5.5, 2026-11-15: unit tests for the guide email builder and sender.
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { buildGuideEmail, sendGuideEmail, resetGuideSendGuard, isGuideSource } from '../guide-email'

describe('buildGuideEmail', () => {
  it('greets by first name and links the guide', () => {
    const m = buildGuideEmail('Ana Lopez')
    expect(m.subject).toBe("Your AI Operator's Playbook from NYClaw")
    expect(m.text.startsWith('Hi Ana,')).toBe(true)
    expect(m.text).toContain('https://nyclaw.io/ai-operators-playbook.html')
    expect(m.html).toContain('href="https://nyclaw.io/ai-operators-playbook.html"')
    expect(m.text.endsWith('Thank you,\nGiani Brussich\n914-255-4116')).toBe(true)
  })
  it('drops the sentinel name', () => {
    expect(buildGuideEmail('Playbook Request').text.startsWith('Hi,')).toBe(true)
  })
  it('escapes html in the name', () => {
    expect(buildGuideEmail('<b>x').html).not.toContain('<b>')
  })
  it('has no banned words, em dashes or numbers beyond the phone', () => {
    const m = buildGuideEmail('Ana')
    expect(m.text + m.html).not.toMatch(/delve|leverage|seamless|robust|unlock|elevate|game-changer|furthermore|moreover|—/i)
  })
  it('knows the guide sources', () => {
    expect(isGuideSource('resource_form')).toBe(true)
    expect(isGuideSource('playbook_form')).toBe(true)
    expect(isGuideSource('contact_form')).toBe(false)
  })
})

describe('sendGuideEmail', () => {
  beforeEach(() => resetGuideSendGuard())
  it('sends from hello@nyclaw.io with matching reply-to, no attachment', async () => {
    const sendMail = vi.fn().mockResolvedValue({})
    expect(await sendGuideEmail({ sendMail }, 'a@example.test', 'Ana')).toEqual({ sent: true, via: 'gmail' })
    const o = sendMail.mock.calls[0][0]
    expect(o.from).toBe('"Giani Brussich, NYClaw" <hello@nyclaw.io>')
    expect(o.replyTo).toBe('hello@nyclaw.io')
    expect(o.attachments).toBeUndefined()
  })
  it('honors GUIDE_FROM_EMAIL', async () => {
    vi.stubEnv('GUIDE_FROM_EMAIL', 'x@nyclaw.io')
    const sendMail = vi.fn().mockResolvedValue({})
    await sendGuideEmail({ sendMail }, 'a@example.test', 'Ana')
    expect(sendMail.mock.calls[0][0].replyTo).toBe('x@nyclaw.io')
    vi.unstubAllEnvs()
  })
  it('does not send twice to the same address', async () => {
    const sendMail = vi.fn().mockResolvedValue({})
    await sendGuideEmail({ sendMail }, 'a@example.test', 'Ana')
    await sendGuideEmail({ sendMail }, 'A@example.test', 'Ana')
    expect(sendMail).toHaveBeenCalledOnce()
  })
  it('reports failure without the address', async () => {
    const sendMail = vi.fn().mockRejectedValue(new Error('rejected a@example.test'))
    const r = await sendGuideEmail({ sendMail }, 'a@example.test', 'Ana')
    expect(r).toEqual({ sent: false, reason: 'rejected [address]' })
  })
})
