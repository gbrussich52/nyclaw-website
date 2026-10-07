// classification: PUBLIC
import { NextResponse } from 'next/server'
import { reviewConfigured } from '../../../../lib/workflow-assessment-admin'
import { storageReady } from '../../../../lib/workflow-assessment-store'

export const dynamic = 'force-dynamic'

export async function GET() {
  const review = reviewConfigured()
  const storage = await storageReady()
  return NextResponse.json({ ready: review && storage, storage, review }, {
    status: review && storage ? 200 : 503,
    headers: { 'Cache-Control': 'no-store' },
  })
}
