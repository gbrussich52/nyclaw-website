// classification: PUBLIC
// Claude Sonnet 5.5, 2026-11-15: new module. Builds and sends the free-guide email to the visitor,
// so the guide reaches their inbox even if they close the tab after the form succeeds.

import { CONTACT_SOURCES } from './contact-sources'

/** Sources that ask for the free guide. Plain contact forms never trigger the visitor email. */
export const GUIDE_SOURCES: readonly (typeof CONTACT_SOURCES)[number][] = ['resource_form', 'playbook_form']

export const SITE_URL = 'https://nyclaw.io'
export const GUIDE_PATH = '/ai-operators-playbook.html'
export const GUIDE_SUBJECT = "Your AI Operator's Playbook from NYClaw"
export const DEFAULT_GUIDE_FROM = 'hello@nyclaw.io'

// Claude Sonnet 5.5, 2026-11-16: fixed recipient for the weekly form-delivery check. It is on our own
// domain; plus-addressing falls through the forwardemail catch-all to Giani's inbox. Not a secret.
export const FORM_CHECK_ADDRESS = 'hello+formcheck@nyclaw.io'

export function isFormCheckAddress(email: string): boolean {
  return email.trim().toLowerCase() === FORM_CHECK_ADDRESS
}

export function isGuideSource(source: string): boolean {
  return (GUIDE_SOURCES as readonly string[]).includes(source)
}

/** Sentinel names the forms send when they do not collect a real name. */
function firstNameOf(name: string): string {
  const first = name.trim().split(/\s+/)[0] ?? ''
  if (!first || /^playbook$/i.test(first)) return ''
  return first
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

export interface GuideEmailContent {
  subject: string
  text: string
  html: string
}

/** Pure builder: no I/O, so tests can check the exact words. */
export function buildGuideEmail(name: string, siteUrl: string = SITE_URL): GuideEmailContent {
  const first = firstNameOf(name)
  const link = `${siteUrl}${GUIDE_PATH}`
  const greeting = first ? `Hi ${first},` : 'Hi,'
  const lines = [
    greeting,
    `Here is the guide you asked for: ${link}`,
    'If you want help fixing something in your business, reply and tell me what you are trying to fix.',
    'Thank you,\nGiani Brussich\n914-255-4116',
  ]
  const text = lines.join('\n\n')
  const html = [
    `<p>${escapeHtml(greeting)}</p>`,
    `<p>Here is the guide you asked for: <a href="${link}">${link}</a></p>`,
    '<p>If you want help fixing something in your business, reply and tell me what you are trying to fix.</p>',
    '<p>Thank you,<br>Giani Brussich<br>914-255-4116</p>',
  ].join('\n')
  return { subject: GUIDE_SUBJECT, text, html }
}

export interface MailTransport {
  sendMail(options: Record<string, unknown>): Promise<unknown>
}

// Per-instance guard so one visitor retrying the form does not get the guide twice in a row.
// Claude Sonnet 5.5, 2026-11-16: stores which path sent it, so a repeat request reports the same path.
const recentSends = new Map<string, { at: number; via: GuideVia }>()
const DEDUPE_MS = 10 * 60 * 1000

// Claude Sonnet 5.5, 2026-11-16: `via` says which path sent the mail. `resendNote` is set only when
// Resend was tried, failed, and Gmail sent instead. It holds a short safe reason, never the key.
export type GuideVia = 'resend' | 'gmail'
export type GuideSendResult = { sent: true; via: GuideVia; resendNote?: string } | { sent: false; reason: string }

const RESEND_URL = 'https://api.resend.com/emails'
const RESEND_TIMEOUT_MS = 8000

type ResendOutcome = { ok: true } | { ok: false; note: string }

// Claude Sonnet 5.5, 2026-11-16: Gmail SMTP mail fails SPF and DKIM alignment for nyclaw.io (DMARC
// quarantine), so outside inboxes junk it. Resend signs for nyclaw.io, so the guide goes there first.
// The note carries the HTTP status and Resend's short error name at most. No key, no body, no address.
async function sendViaResend(
  apiKey: string,
  payload: { from: string; replyTo: string; to: string; subject: string; text: string; html: string }
): Promise<ResendOutcome> {
  try {
    const res = await fetch(RESEND_URL, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: payload.from,
        to: payload.to,
        reply_to: payload.replyTo,
        subject: payload.subject,
        text: payload.text,
        html: payload.html,
      }),
      signal: AbortSignal.timeout(RESEND_TIMEOUT_MS),
    })
    if (res.ok) return { ok: true }
    let name = ''
    try {
      const data = (await res.json()) as { name?: unknown }
      if (typeof data.name === 'string' && /^[a-z0-9_]{1,40}$/i.test(data.name)) name = ` ${data.name}`
    } catch {
      // Body was not JSON; the status alone is enough.
    }
    return { ok: false, note: `Resend HTTP ${res.status}${name}` }
  } catch (err) {
    const timedOut = err instanceof Error && (err.name === 'TimeoutError' || err.name === 'AbortError')
    return { ok: false, note: timedOut ? 'Resend timeout' : 'Resend network error' }
  }
}

// Claude Sonnet 5.5, 2026-11-16: `transport` may now be null (Resend-only setup). Before this change it
// was required and Gmail was the only path.
export async function sendGuideEmail(
  transport: MailTransport | null,
  to: string,
  name: string,
  now: number = Date.now()
): Promise<GuideSendResult> {
  const key = to.toLowerCase()
  const last = recentSends.get(key)
  if (last !== undefined && now - last.at < DEDUPE_MS) {
    // The visitor already has it from the first request.
    return { sent: true, via: last.via }
  }
  const from = process.env.GUIDE_FROM_EMAIL || DEFAULT_GUIDE_FROM
  const { subject, text, html } = buildGuideEmail(name)
  const fromHeader = `"Giani Brussich, NYClaw" <${from}>`

  const apiKey = process.env.RESEND_API_KEY?.trim()
  let resendNote: string | undefined
  if (apiKey) {
    const out = await sendViaResend(apiKey, { from: fromHeader, replyTo: from, to, subject, text, html })
    if (out.ok) {
      recentSends.set(key, { at: now, via: 'resend' })
      return { sent: true, via: 'resend' }
    }
    resendNote = out.note
  }

  if (!transport) {
    return { sent: false, reason: resendNote ? `${resendNote}; mail transport not configured` : 'mail transport not configured' }
  }
  try {
    await transport.sendMail({
      from: fromHeader,
      replyTo: from,
      to,
      subject,
      text,
      html,
    })
    recentSends.set(key, { at: now, via: 'gmail' })
    return resendNote ? { sent: true, via: 'gmail', resendNote } : { sent: true, via: 'gmail' }
  } catch (err) {
    // Reason only, never the visitor address.
    const gmail = err instanceof Error ? err.message.replace(/\S+@\S+/g, '[address]').slice(0, 120) : 'unknown error'
    return { sent: false, reason: resendNote ? `${resendNote}; Gmail: ${gmail}` : gmail }
  }
}

/** Test helper: clear the duplicate guard. */
export function resetGuideSendGuard(): void {
  recentSends.clear()
}
