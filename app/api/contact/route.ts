import { NextRequest, NextResponse } from 'next/server'
import { appendFileSync, mkdirSync } from 'fs'
import { join } from 'path'
import { sanitize } from '../../../lib/sanitize'
import { createRateLimiter } from '../../../lib/rate-limit'
import { storeLeadInRedis } from '../../../lib/leads'

interface ContactFormData {
  name: string
  email: string
  phone?: string
  businessType: string
  challenge: string
  message?: string
  smsConsent?: boolean
}

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

  let body: ContactFormData
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const name = sanitize(body.name)
  const email = sanitize(body.email)
  const phone = sanitize(body.phone ?? '')
  const businessType = sanitize(body.businessType)
  const challenge = sanitize(body.challenge)
  const message = sanitize(body.message ?? '')
  const smsConsent = body.smsConsent === true

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

  // 2. Local leads file — meaningful in local dev only (read-only fs on Vercel)
  try {
    const leadsDir = join(process.cwd(), 'data')
    mkdirSync(leadsDir, { recursive: true })
    appendFileSync(join(leadsDir, 'leads.jsonl'), JSON.stringify(entry) + '\n')
    persisted = true
  } catch (err) {
    console.error('[contact] Failed to write leads file:', err)
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
    console.error('[contact] LEAD LOST: all persistence layers failed', { timestamp, email })
    return NextResponse.json(
      { error: 'Unable to save your submission right now. Please try again or email us directly.' },
      { status: 500 }
    )
  }

  return NextResponse.json({ ok: true })
}
