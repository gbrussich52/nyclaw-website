import { NextRequest, NextResponse } from 'next/server'
import { appendFileSync, mkdirSync } from 'fs'
import { join } from 'path'
import { z } from 'zod'
import { sanitize } from '../../../lib/sanitize'
import { createRateLimiter } from '../../../lib/rate-limit'
import { storeLeadInRedis } from '../../../lib/leads'

const ContactSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(254),
  phone: z.string().max(50).optional(),
  businessType: z.string().min(1).max(200),
  challenge: z.string().min(1).max(200),
  message: z.string().max(5000).optional(),
  smsConsent: z.boolean().optional(),
  website: z.string().max(0).optional(), // honeypot — real visitors never fill this
  ts: z.coerce.number().optional(),      // form-render timestamp, for the time-trap check
})

// Distributed rate limiter (per IP, max 3 submissions per hour).
// Upstash-backed when provisioned; per-instance in-memory fallback otherwise.
const contactLimiter = createRateLimiter({
  name: 'contact',
  max: 3,
  windowMs: 3600_000, // 1 hour
})

function getRateLimitKey(req: NextRequest): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
}

export async function POST(req: NextRequest) {
  const ip = getRateLimitKey(req)
  const rate = await contactLimiter.limit(ip)
  if (!rate.allowed) {
    const retryAfterSec = rate.resetAt
      ? Math.max(1, Math.ceil((rate.resetAt - Date.now()) / 1000))
      : 3600
    return NextResponse.json(
      { error: 'Too many submissions' },
      { status: 429, headers: { 'Retry-After': String(retryAfterSec) } }
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const parsed = ContactSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  // Honeypot: a real visitor never sees or fills this field. A bot that
  // fills every input trips it. Return a fake success so the bot doesn't
  // learn it was caught, before any persistence happens.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true })
  }
  // Time-trap: a submission within 2s of the form rendering is almost
  // certainly a scripted bot, not a human filling out the form.
  if (parsed.data.ts && Date.now() - parsed.data.ts < 2000) {
    return NextResponse.json({ ok: true })
  }

  const name = sanitize(parsed.data.name)
  const email = sanitize(parsed.data.email)
  const phone = sanitize(parsed.data.phone ?? '')
  const businessType = sanitize(parsed.data.businessType)
  const challenge = sanitize(parsed.data.challenge)
  const message = sanitize(parsed.data.message ?? '')
  const smsConsent = parsed.data.smsConsent === true

  // Defense-in-depth: zod already enforces required fields, but keep the
  // explicit check in case sanitize() strips a field down to empty.
  if (!name || !email || !businessType || !challenge) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  const timestamp = new Date().toISOString()
  const entry = { timestamp, name, email, phone, businessType, challenge, message, smsConsent }

  // Track which persistence layers actually succeeded. The visitor only gets
  // a success response if at least one layer durably captured the lead —
  // a false "ok" here means a lost lead and lost revenue.
  let persisted = false

  // 1. Durable backstop: Upstash Redis (works even when email/Sheets are down)
  if (await storeLeadInRedis(entry)) {
    persisted = true
  }

  // 2. Local leads file — local-dev convenience only. Vercel's filesystem is
  //    read-only in production, so this always fails there; skip it outright
  //    on Vercel/production instead of eating a guaranteed-failing syscall
  //    (and a caught error) on every submission. Redis (#1) is the real
  //    durable store.
  if (process.env.NODE_ENV !== 'production') {
    try {
      const leadsDir = join(process.cwd(), 'data')
      mkdirSync(leadsDir, { recursive: true })
      appendFileSync(join(leadsDir, 'leads.jsonl'), JSON.stringify(entry) + '\n')
      persisted = true
    } catch (err) {
      console.error('[contact] Failed to write leads file:', err)
    }
  }

  // 3. Send email notification (if configured)
  const gmailUser = process.env.GMAIL_USER
  const gmailPass = process.env.GMAIL_APP_PASSWORD
  const notifyEmail = process.env.NOTIFY_EMAIL

  if (gmailUser && gmailPass && notifyEmail) {
    try {
      const nodemailer = await import('nodemailer')
      const transporter = nodemailer.default.createTransport({
        service: 'gmail',
        auth: { user: gmailUser, pass: gmailPass },
      })
      await transporter.sendMail({
        from: `"NYClaw Lead" <${gmailUser}>`,
        to: notifyEmail,
        subject: `🔥 New Lead: ${name} — ${businessType}`,
        text: [
          `New contact form submission on NYClaw.io`,
          ``,
          `Name: ${name}`,
          `Email: ${email}`,
          `Phone: ${phone || 'Not provided'}`,
          `SMS Consent: ${smsConsent ? 'YES' : 'No'}`,
          `Business Type: ${businessType}`,
          `Challenge: ${challenge}`,
          `Message: ${message || 'None'}`,
          `Submitted: ${timestamp}`,
        ].join('\n'),
      })
      persisted = true
    } catch (err) {
      console.error('[contact] Email notification failed:', err)
      // Don't fail the request on email alone — other layers may have it
    }
  }

  // 4. (Leads are read back for viewing/export via the password-protected
  //    /api/admin/leads endpoint, which reads the Redis store above. No
  //    Google Sheets integration — a Google org policy blocked the clean
  //    service-account + Apps Script paths, and Redis is the durable source.)

  if (!persisted) {
    // Every layer failed — do NOT lie to the visitor with a 200. They can
    // retry or reach out another way instead of assuming we have their info.
    // Never log PII (email) — timestamp only is enough to correlate with the
    // visitor's own retry/support contact if they follow up.
    console.error('[contact] LEAD LOST: all persistence layers failed', { timestamp })
    return NextResponse.json(
      { error: 'Unable to save your submission right now. Please try again or email us directly.' },
      { status: 500 }
    )
  }

  return NextResponse.json({ ok: true })
}
