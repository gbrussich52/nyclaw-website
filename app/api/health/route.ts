import { NextResponse } from 'next/server'
import { validateEnv } from '@/lib/env'

export async function GET() {
  try {
    validateEnv()
    return NextResponse.json(
      { status: 'ok', timestamp: new Date().toISOString() },
      { status: 200 }
    )
  } catch (err) {
    console.error('[Health] Environment validation failed:', err)
    return NextResponse.json(
      { status: 'error', message: 'Server misconfigured' },
      { status: 503 }
    )
  }
}
