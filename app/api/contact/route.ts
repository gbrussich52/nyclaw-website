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

  // 2. Send email notification (if configured)
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
    } catch (err) {
      console.error('[contact] Email notification failed:', err)
      // Don't fail the request — lead is still saved
    }
  }

  // 3. Append to Google Sheet (if configured)
  const sheetsKeyRaw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON
  const sheetId = process.env.GOOGLE_SHEET_ID

  if (sheetsKeyRaw && sheetId) {
    try {
      const { google } = await import('googleapis')
      const credentials = JSON.parse(sheetsKeyRaw)
      const auth = new google.auth.GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      })
      const sheets = google.sheets({ version: 'v4', auth })

      // Ensure header row exists on first run
      const existing = await sheets.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range: 'Sheet1!A1',
      })
      if (!existing.data.values?.length) {
        await sheets.spreadsheets.values.update({
          spreadsheetId: sheetId,
          range: 'Sheet1!A1',
          valueInputOption: 'RAW',
          requestBody: {
            values: [['Timestamp', 'Name', 'Email', 'Phone', 'SMS Consent', 'Business Type', 'Challenge', 'Message']],
          },
        })
      }

      // Append lead row
      await sheets.spreadsheets.values.append({
        spreadsheetId: sheetId,
        range: 'Sheet1!A:H',
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        requestBody: {
          values: [[
            timestamp, name, email, phone,
            smsConsent ? 'YES' : 'No',
            businessType, challenge, message,
          ]],
        },
      })
    } catch (err) {
      console.error('[contact] Google Sheets append failed:', err)
      // Don't fail the request — lead is saved to local file as fallback
    }
  }

  return NextResponse.json({ ok: true })
}
