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
const recentSends = new Map<string, number>()
const DEDUPE_MS = 10 * 60 * 1000

export type GuideSendResult = { sent: true } | { sent: false; reason: string }

export async function sendGuideEmail(
  transport: MailTransport,
  to: string,
  name: string,
  now: number = Date.now()
): Promise<GuideSendResult> {
  const key = to.toLowerCase()
  const last = recentSends.get(key)
  if (last !== undefined && now - last < DEDUPE_MS) {
    // The visitor already has it from the first request.
    return { sent: true }
  }
  const from = process.env.GUIDE_FROM_EMAIL || DEFAULT_GUIDE_FROM
  const { subject, text, html } = buildGuideEmail(name)
  try {
    await transport.sendMail({
      from: `"Giani Brussich, NYClaw" <${from}>`,
      replyTo: from,
      to,
      subject,
      text,
      html,
    })
    recentSends.set(key, now)
    return { sent: true }
  } catch (err) {
    // Reason only, never the visitor address.
    const reason = err instanceof Error ? err.message.replace(/\S+@\S+/g, '[address]').slice(0, 120) : 'unknown error'
    return { sent: false, reason }
  }
}

/** Test helper: clear the duplicate guard. */
export function resetGuideSendGuard(): void {
  recentSends.clear()
}
