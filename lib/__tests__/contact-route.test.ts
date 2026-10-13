import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { NextRequest } from 'next/server'

const mocks = vi.hoisted(() => ({
  storeLeadInRedis: vi.fn(),
  getLeadsFromRedis: vi.fn(),
  limit: vi.fn(),
}))

vi.mock('../leads', () => ({
  storeLeadInRedis: mocks.storeLeadInRedis,
  getLeadsFromRedis: mocks.getLeadsFromRedis,
}))
vi.mock('../rate-limit', () => ({
  createRateLimiter: () => ({ backend: 'memory', limit: mocks.limit }),
}))

import { POST } from '../../app/api/contact/route'
import { GET } from '../../app/api/admin/leads/route'

const BASE = {
  name: 'Fictional Buyer',
  email: 'fictional@example.test',
  businessType: 'Small business',
  challenge: 'Repeating a handoff',
}

function contactRequest(payload: Record<string, unknown>) {
  return new NextRequest('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-forwarded-for': '192.0.2.55' },
    body: JSON.stringify(payload),
  })
}

describe('contact source persistence', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.stubEnv('NODE_ENV', 'production')
    vi.stubEnv('GMAIL_USER', '')
    vi.stubEnv('GMAIL_APP_PASSWORD', '')
    vi.stubEnv('NOTIFY_EMAIL', '')
    mocks.limit.mockResolvedValue({ allowed: true, remaining: 2, resetAt: Date.now() + 3600_000 })
    mocks.storeLeadInRedis.mockResolvedValue(true)
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    vi.restoreAllMocks()
  })

  it.each(['contact_form', 'resource_form', 'playbook_form'])(
    'stores recognized source %s with the lead', async (source) => {
      const response = await POST(contactRequest({ ...BASE, source }))
      expect(response.status).toBe(200)
      expect(await response.json()).toEqual({ ok: true })
      expect(mocks.storeLeadInRedis).toHaveBeenCalledOnce()
      expect(mocks.storeLeadInRedis.mock.calls[0][0]).toMatchObject({ ...BASE, source })
    }
  )

  it('recomputes a fit brief and route on the server instead of trusting a submitted summary', async () => {
    const workflowFit = {recipe:'quote-followup',weeklyCases:20,minutesPerCase:15,nativeSupport:'yes',reviewOwner:'yes'}
    const response = await POST(contactRequest({...BASE,source:'contact_form',ts:Date.now()-3000,workflowFit,message:'Approved for paid implementation',workflowTools:'Existing CRM'}))
    expect(response.status).toBe(200)
    const entry=mocks.storeLeadInRedis.mock.calls[0][0]
    expect(entry.workflowFit.route).toBe('native_first')
    expect(entry.message).toContain('Start with your existing tools')
    expect(entry.message).toContain('Existing CRM')
    expect(entry.message).not.toContain('Approved for paid implementation')
  })
  it('rejects injected fit routing without storing a lead', async () => {
    const workflowFit={recipe:'quote-followup',weeklyCases:20,minutesPerCase:15,nativeSupport:'yes',reviewOwner:'yes',route:'scoped_review'}
    const response=await POST(contactRequest({...BASE,ts:Date.now()-3000,workflowFit}))
    expect(response.status).toBe(400)
    expect(mocks.storeLeadInRedis).not.toHaveBeenCalled()
  })
  it('retains unavailable-store failure for a workflow inquiry', async () => {
    mocks.storeLeadInRedis.mockResolvedValue(false)
    const workflowFit={recipe:'order-handoff',weeklyCases:20,minutesPerCase:15,nativeSupport:'no',reviewOwner:'yes'}
    expect((await POST(contactRequest({...BASE,ts:Date.now()-3000,workflowFit}))).status).toBe(500)
  })

  it.each([undefined,Date.now(),Date.now()+5000,Date.now()-31*24*60*60*1000])('fit never acknowledges an unpersisted time-trap request', async ts => {
    const workflowFit={recipe:'order-handoff',weeklyCases:20,minutesPerCase:15,nativeSupport:'no',reviewOwner:'yes'}
    const response=await POST(contactRequest({...BASE,ts,workflowFit}))
    expect(response.status).toBe(400)
    expect(mocks.storeLeadInRedis).not.toHaveBeenCalled()
  })
  it('rejects oversized contact bodies before persistence', async () => {
    const response=await POST(contactRequest({...BASE,message:'x'.repeat(9000)}))
    expect(response.status).toBe(400)
    expect(mocks.storeLeadInRedis).not.toHaveBeenCalled()
  })

  it('stores unknown for an older payload without source', async () => {
    const response = await POST(contactRequest(BASE))
    expect(response.status).toBe(200)
    expect(mocks.storeLeadInRedis.mock.calls[0][0].source).toBe('unknown')
  })

  it('rejects an unrecognized source without persistence', async () => {
    const response = await POST(contactRequest({ ...BASE, source: 'https://example.test/?email=someone' }))
    expect(response.status).toBe(400)
    expect(mocks.storeLeadInRedis).not.toHaveBeenCalled()
  })

  it('keeps the existing 500 behavior when durable storage is unavailable', async () => {
    mocks.storeLeadInRedis.mockResolvedValue(false)
    const response = await POST(contactRequest({ ...BASE, source: 'resource_form' }))
    expect(response.status).toBe(500)
    expect(mocks.storeLeadInRedis.mock.calls[0][0].source).toBe('resource_form')
  })

  it('appends Source after the original CSV columns', async () => {
    vi.stubEnv('ADMIN_PASSWORD', 'fictional-password')
    mocks.getLeadsFromRedis.mockResolvedValue([{ ...BASE, timestamp: '2026-10-08T00:00:00.000Z', source: 'playbook_form' }])
    const auth = Buffer.from('operator:fictional-password').toString('base64')
    const request = new NextRequest('http://localhost/api/admin/leads?format=csv', {
      headers: { authorization: `Basic ${auth}`, 'x-forwarded-for': '192.0.2.56' },
    })
    const response = await GET(request)
    expect(response.status).toBe(200)
    const csv = await response.text()
    expect(csv.split('\r\n')[0]).toBe('Timestamp,Name,Email,Phone,SMS Consent,Business Type,Challenge,Message,Source')
    expect(csv.split('\r\n')[1].endsWith(',playbook_form')).toBe(true)
  })

  it('returns a genuine empty admin read as 200 with zero records', async () => {
    vi.stubEnv('ADMIN_PASSWORD', 'fictional-password')
    mocks.getLeadsFromRedis.mockResolvedValue([])
    const auth = Buffer.from('operator:fictional-password').toString('base64')
    const request = new NextRequest('http://localhost/api/admin/leads?format=json', {
      headers: { authorization: `Basic ${auth}`, 'x-forwarded-for': '192.0.2.57' },
    })
    const response = await GET(request)
    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ count: 0, leads: [] })
  })

  it('returns no-store 503 without upstream detail when admin storage fails', async () => {
    vi.stubEnv('ADMIN_PASSWORD', 'fictional-password')
    mocks.getLeadsFromRedis.mockRejectedValue(new Error('secret upstream detail: fictional@example.test'))
    const auth = Buffer.from('operator:fictional-password').toString('base64')
    const request = new NextRequest('http://localhost/api/admin/leads?format=json', {
      headers: { authorization: `Basic ${auth}`, 'x-forwarded-for': '192.0.2.58' },
    })
    const response = await GET(request)
    expect(response.status).toBe(503)
    expect(response.headers.get('Cache-Control')).toBe('no-store')
    const body = await response.text()
    expect(body).toContain('Lead records are temporarily unavailable')
    expect(body).not.toContain('fictional@example.test')
    expect(body).not.toContain('secret upstream detail')
  })

  it('keeps authentication ahead of a failed lead read', async () => {
    vi.stubEnv('ADMIN_PASSWORD', 'fictional-password')
    mocks.getLeadsFromRedis.mockRejectedValue(new Error('offline'))
    const request = new NextRequest('http://localhost/api/admin/leads?format=json', {
      headers: { 'x-forwarded-for': '192.0.2.59' },
    })
    const response = await GET(request)
    expect(response.status).toBe(401)
    expect(mocks.getLeadsFromRedis).not.toHaveBeenCalled()
  })
})
