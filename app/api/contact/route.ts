import { NextRequest, NextResponse } from 'next/server'
import { appendFileSync, mkdirSync } from 'fs'
import { join } from 'path'

interface ContactFormData {
  name: string
  email: string
  phone?: string
  businessType: string
  challenge: string
  message?: string
  smsConsent?: boolean
}

// Simple in-memory rate limiter (per IP, max 3 submissions per hour)
const submissionMap = new Map<string, { count: number; resetAt: number }>()

function getRateLimitKey(req: NextRequest): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
}

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = submissionMap.get(ip)
  if (!entry || now > entry.resetAt) {
    submissionMap.set(ip, { count: 1, resetAt: now + 3600_000 })
    return false
  }
  if (entry.count >= 3) return true
  entry.count++
  return false
}

function sanitize(val: unknown): string {
  if (typeof val !== 'string') return ''
  return val.replace(/[<>"']/g, '').slice(0, 500).trim()
}

export async function POST(req: NextRequest) {
  const ip = getRateLimitKey(req)
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Too many submissions' }, { status: 429 })
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

  // 1. Save to local leads file (append JSON lines)
  try {
    const leadsDir = join(process.cwd(), 'data')
    mkdirSync(leadsDir, { recursive: true })
    appendFileSync(join(leadsDir, 'leads.jsonl'), JSON.stringify(entry) + '\n')
  } catch (err) {
    console.error('[contact] Failed to write leads file:', err)
  }

  // 2. Send email notification via Gmail SMTP (if configured)
  const notifyEmail = process.env.NOTIFY_EMAIL
  const gmailUser = process.env.GMAIL_USER
  const gmailPass = process.env.GMAIL_APP_PASSWORD

  if (notifyEmail && gmailUser && gmailPass) {
    try {
      const nodemailer = await import('nodemailer')
      const transporter = nodemailer.default.createTransport({
        service: 'gmail',
        auth: { user: gmailUser, pass: gmailPass },
      })
      await transporter.sendMail({
        from: `"NYClaw.io Leads" <${gmailUser}>`,
        to: notifyEmail,
        subject: `🔥 New Lead: ${name} — ${businessType}`,
        text: `
New contact form submission on NYClaw.io

Name: ${name}
Email: ${email}
Phone: ${phone || 'not provided'}
SMS Consent: ${smsConsent ? 'YES ✅' : 'No'}
Business Type: ${businessType}
Challenge: ${challenge}
Message: ${message || '(none)'}
Submitted: ${timestamp}
        `.trim(),
      })
    } catch (err) {
      console.error('[contact] Email notification failed:', err)
      // Don't fail the request — lead is saved to file
    }
  }

  return NextResponse.json({ ok: true })
}
