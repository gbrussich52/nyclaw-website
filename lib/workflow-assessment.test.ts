// classification: PUBLIC
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { NextRequest } from 'next/server'
import { createAssessment, listAssessments, readAssessment, storageReady, updateAssessment } from './workflow-assessment-store'
import { adminAuthorized, sameOrigin } from './workflow-assessment-admin'
import { assessmentSchema, publicRecord } from './workflow-assessment'
import { POST as submit } from '../app/api/workflow-assessment/route'
import { GET as health } from '../app/api/workflow-assessment/health/route'
import { GET as adminList } from '../app/api/admin/workflow-assessments/route'
import { POST as adminUpdate } from '../app/api/admin/workflow-assessments/[reference]/route'

const id = 'ad2b3a42-04a7-4c80-9e55-a74f88fc1091'
const base = {
  requestId: id, name: 'Ada Example', email: 'ada@example.test', firm: 'Example Law',
  workflow: 'documents', software: 'Clio, Google Drive', bottleneck: 'chasing',
  volume: 'medium', contactConsent: true, website: '', ts: Date.now() - 5000,
} as const
const api = 'https://nyclaw.test/api/workflow-assessment'
const admin = 'https://nyclaw.test/api/admin/workflow-assessments'
const key = `nyclaw:workflow-assessments:v1:record:${id}`
const queueKey = 'nyclaw:workflow-assessments:v1:queue'
let ipOctet = 1

class FakeRedis {
  records = new Map<string, { value: string; expires: number }>()
  queue: string[] = []
  requests: unknown[][] = []
  fail = false
  loseFirstReply = false
  async fetch(_url: unknown, init?: RequestInit) {
    if (this.fail) throw new TypeError('offline')
    const args = JSON.parse(String(init?.body)) as unknown[]
    this.requests.push(args)
    const cmd = args[0]
    let result: unknown
    if (cmd === 'PING') result = 'PONG'
    else if (cmd === 'EVAL') {
      const script = String(args[1])
      if (script.includes("return 'created'")) {
        const recordKey = String(args[3]); const digest = String(args[5]); const raw = String(args[6]); const ttl = Number(args[7]); const ref = String(args[8]); const max = Number(args[9])
        const existing = this.records.get(recordKey)
        if (existing && existing.expires > Date.now()) {
          const saved = JSON.parse(existing.value) as { digest: string }
          result = saved.digest !== digest ? 'conflict' : this.queue.includes(ref) ? 'duplicate' : 'corrupt'
        } else if (this.queue.length >= max) result = 'full'
        else {
          this.records.set(recordKey, { value: raw, expires: Date.now() + ttl * 1000 })
          this.queue.unshift(ref)
          result = 'created'
        }
        if (this.loseFirstReply) { this.loseFirstReply = false; throw new TypeError('reply lost') }
      } else {
        const recordKey = String(args[3]); const status = String(args[4]); const saved = this.records.get(recordKey)
        if (!saved) result = 'missing'
        else {
          const record = JSON.parse(saved.value) as { status: string; updatedAt: string }
          const next = new Set<string>(record.status === 'received' ? ['reviewing'] : record.status === 'reviewing' ? ['needs_info', 'scoped', 'closed'] : record.status === 'needs_info' ? ['reviewing', 'closed'] : record.status === 'scoped' ? ['closed'] : [])
          if (record.status !== status && !next.has(status)) result = 'invalid'
          else {
            if (record.status !== status) { record.status = status; record.updatedAt = String(args[5]); saved.value = JSON.stringify(record) }
            result = saved.value
          }
        }
      }
    } else if (cmd === 'LRANGE') result = [...this.queue]
    else if (cmd === 'MGET') result = args.slice(1).map(item => {
      const saved = this.records.get(String(item)); return saved && saved.expires > Date.now() ? saved.value : null
    })
    else if (cmd === 'GET') result = this.records.get(String(args[1]))?.value ?? null
    else throw new Error(`unexpected ${cmd}`)
    return new Response(JSON.stringify({ result }), { status: 200 })
  }
}

function request(url: string, method: 'GET' | 'POST', body?: object, headers: Record<string,string> = {}) {
  return new NextRequest(url, { method, headers: { host: new URL(url).host, 'content-type': 'application/json', 'x-forwarded-for': `198.51.100.${ipOctet}`, ...headers }, body: body ? JSON.stringify(body) : undefined })
}
const auth = { authorization: `Basic ${Buffer.from('operator:fake-admin-password').toString('base64')}` }
const context = { params: Promise.resolve({ reference: id }) }

describe('workflow assessment intake and review', () => {
  let redis: FakeRedis
  beforeEach(() => {
    ipOctet++
    redis = new FakeRedis()
    vi.stubGlobal('fetch', redis.fetch.bind(redis))
    vi.stubEnv('UPSTASH_REDIS_REST_URL', 'https://fake-redis.test')
    vi.stubEnv('UPSTASH_REDIS_REST_TOKEN', 'fake-token')
    vi.stubEnv('ADMIN_PASSWORD', 'fake-admin-password')
  })
  afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs() })

  it('validates closed, names-only input and excludes narrative fields', () => {
    expect(assessmentSchema.safeParse(base).success).toBe(true)
    expect(assessmentSchema.safeParse({ ...base, message: 'client story' }).success).toBe(false)
    expect(assessmentSchema.safeParse({ ...base, software: 'https://example.com/secret?token=x' }).success).toBe(false)
    expect(assessmentSchema.safeParse({ ...base, contactConsent: false }).success).toBe(false)
  })

  it('creates a durable 30-day record and namespaced queue entry before 201, then lists it', async () => {
    const response = await submit(request(api, 'POST', base))
    expect(response.status).toBe(201)
    expect(await response.json()).toEqual({ ok: true, reference: id, status: 'received' })
    const evalArgs = redis.requests.find(args => args[0] === 'EVAL')!
    expect(evalArgs[3]).toBe(key)
    expect(evalArgs[4]).toBe(queueKey)
    expect(evalArgs[7]).toBe(30 * 24 * 60 * 60)
    expect(redis.records.get(key)?.expires).toBeGreaterThan(Date.now() + 29 * 24 * 60 * 60 * 1000)
    const items = await listAssessments()
    expect(items).toHaveLength(1)
    expect(items[0].reference).toBe(id)
    expect(redis.requests.find(args => args[0] === 'MGET')?.slice(1)).toEqual([key])
    expect(items[0]).not.toHaveProperty('digest')
  })

  it('returns same receipt for identical retry, conflict for changed payload, and handles concurrent retries', async () => {
    const results = await Promise.all([submit(request(api, 'POST', base)), submit(request(api, 'POST', base))])
    expect(results.map(r => r.status).sort()).toEqual([200, 201])
    expect(redis.queue).toEqual([id])
    const changed = await submit(request(api, 'POST', { ...base, firm: 'Other Firm' }))
    expect(changed.status).toBe(409)
  })

  it('retries safely after a lost Redis response without a second queue entry', async () => {
    redis.loseFirstReply = true
    expect((await submit(request(api, 'POST', base))).status).toBe(503)
    expect((await submit(request(api, 'POST', base))).status).toBe(200)
    expect(redis.queue).toEqual([id])
  })

  it('fails closed on unavailable, full, corrupt or missing review storage', async () => {
    redis.fail = true
    expect((await submit(request(api, 'POST', base))).status).toBe(503)
    expect((await adminList(request(admin, 'GET', undefined, auth))).status).toBe(503)
    redis.fail = false
    await createAssessment(base)
    redis.queue = ['malformed']
    expect((await adminList(request(admin, 'GET', undefined, auth))).status).toBe(503)
    redis.queue = [id]
    redis.records.set(key, { value: JSON.stringify({ reference: id, email: 'x@example.test' }), expires: Date.now()+1000 })
    expect((await adminList(request(admin, 'GET', undefined, auth))).status).toBe(503)
  })

  it('returns 503 instead of evicting a live inquiry when the bounded queue is full', async () => {
    redis.queue = Array.from({ length: 1000 }, (_, index) => `00000000-0000-4000-8000-${String(index).padStart(12, '0')}`)
    const response = await submit(request(api, 'POST', base))
    expect(response.status).toBe(503)
    expect(redis.records.has(key)).toBe(false)
    expect(redis.queue).toHaveLength(1000)
    expect(redis.requests.find(args => args[0] === 'EVAL')?.[1]).toContain("return 'full'")
    expect(redis.requests.find(args => args[0] === 'EVAL')?.[1]).not.toContain('LTRIM')
  })

  it('rejects oversized, invalid, and too-fast submissions without storage writes', async () => {
    const oversize = await submit(request(api, 'POST', { ...base, firm: 'X'.repeat(3000) }))
    expect(oversize.status).toBe(400)
    const invalid = await submit(request(api, 'POST', { ...base, contactConsent: false }))
    expect(invalid.status).toBe(400)
    const fast = await submit(request(api, 'POST', { ...base, ts: Date.now() }))
    expect(fast.status).toBe(400)
    expect(redis.records.size).toBe(0)
  })

  it('gives honeypot traffic a false success without receipt or storage', async () => {
    const response = await submit(request(api, 'POST', { ...base, website: 'bot.example' }))
    expect(response.status).toBe(202)
    expect(await response.json()).toEqual({ ok: true })
    expect(redis.requests).toEqual([])
  })

  it('fails closed when storage is unconfigured and throttles repeated public attempts', async () => {
    vi.stubEnv('UPSTASH_REDIS_REST_URL', '')
    vi.stubEnv('UPSTASH_REDIS_REST_TOKEN', '')
    vi.stubEnv('KV_REST_API_URL', '')
    vi.stubEnv('KV_REST_API_TOKEN', '')
    expect((await submit(request(api, 'POST', base))).status).toBe(503)
    vi.stubEnv('UPSTASH_REDIS_REST_URL', 'https://fake-redis.test')
    vi.stubEnv('UPSTASH_REDIS_REST_TOKEN', 'fake-token')
    for (let n = 0; n < 4; n++) await submit(request(api, 'POST', { ...base, website: 'bot.example' }))
    expect((await submit(request(api, 'POST', base))).status).toBe(429)
  })

  it('health uses PING, no inquiry write, and requires review configuration', async () => {
    expect((await health()).status).toBe(200)
    expect(redis.requests.map(args => args[0])).toEqual(['PING'])
    vi.stubEnv('ADMIN_PASSWORD', '')
    const unavailable = await health()
    expect(unavailable.status).toBe(503)
    expect(await unavailable.json()).toEqual({ ready: false, storage: true, review: false })
    expect((await submit(request(api, 'POST', base))).status).toBe(503)
  })

  it('rejects wrong auth and cross-origin or missing-origin admin updates', async () => {
    await createAssessment(base)
    expect(adminAuthorized(request(admin, 'GET', undefined, auth))).toBe(true)
    expect(adminAuthorized(request(admin, 'GET', undefined, { authorization: 'Basic Zm9vOmJhZA==' }))).toBe(false)
    expect((await adminList(request(admin, 'GET'))).status).toBe(401)
    expect(sameOrigin(request(admin, 'POST', { status: 'reviewing' }, auth))).toBe(false)
    expect((await adminUpdate(request(`${admin}/${id}`, 'POST', { status: 'reviewing' }, auth), context)).status).toBe(403)
    expect((await adminUpdate(request(`${admin}/${id}`, 'POST', { status: 'reviewing' }, { ...auth, origin: 'https://attacker.test' }), context)).status).toBe(403)
  })

  it('accepts browser Origin against Host when Next internal URL uses localhost', async () => {
    await createAssessment(base)
    const external = new NextRequest(`http://localhost:4388/api/admin/workflow-assessments/${id}`, {
      method: 'POST',
      headers: { ...auth, host: '127.0.0.1:4388', origin: 'http://127.0.0.1:4388', 'x-forwarded-for': `198.51.100.${ipOctet}`, 'content-type': 'application/json' },
      body: JSON.stringify({ status: 'reviewing' }),
    })
    expect(external.nextUrl.origin).toBe('http://localhost:4388')
    expect(sameOrigin(external)).toBe(true)
    expect((await adminUpdate(external, context)).status).toBe(200)
    const wrongHost = new NextRequest(`http://localhost:4388/api/admin/workflow-assessments/${id}`, {
      method: 'POST', headers: { ...auth, host: 'other.test:4388', origin: 'http://127.0.0.1:4388' },
    })
    expect(sameOrigin(wrongHost)).toBe(false)
  })

  it('uses Vercel Host and forwarded HTTPS for preview origins, never forwarded-host', () => {
    vi.stubEnv('VERCEL', '1')
    const make = (headers: Record<string, string>) => new NextRequest('http://localhost:3000/api/admin/workflow-assessments', {
      method: 'POST', headers: { host: 'preview-branch.vercel.app', 'x-forwarded-proto': 'https', origin: 'https://preview-branch.vercel.app', ...headers },
    })
    expect(sameOrigin(make({}))).toBe(true)
    expect(sameOrigin(make({ 'x-forwarded-host': 'attacker.test' }))).toBe(true)
    expect(sameOrigin(make({ origin: 'https://attacker.test' }))).toBe(false)
    expect(sameOrigin(make({ 'x-forwarded-proto': 'http', origin: 'http://preview-branch.vercel.app' }))).toBe(false)
    expect(sameOrigin(make({ 'x-forwarded-proto': 'https,http' }))).toBe(false)
  })

  it('throttles repeated admin password attempts', async () => {
    const wrong = { authorization: 'Basic Zm9vOmJhZA==' }
    for (let n = 0; n < 10; n++) expect((await adminList(request(admin, 'GET', undefined, wrong))).status).toBe(401)
    expect((await adminList(request(admin, 'GET', undefined, wrong))).status).toBe(429)
    expect((await adminList(request(admin, 'GET', undefined, auth))).status).toBe(200)
  })

  it('enforces review transitions, keeps TTL, and exposes no digest', async () => {
    await createAssessment(base)
    const ttl = redis.records.get(key)!.expires
    const headers = { ...auth, origin: 'https://nyclaw.test' }
    expect((await adminUpdate(request(`${admin}/${id}`, 'POST', { status: 'scoped' }, headers), context)).status).toBe(409)
    const reviewing = await adminUpdate(request(`${admin}/${id}`, 'POST', { status: 'reviewing' }, headers), context)
    expect(reviewing.status).toBe(200)
    expect((await reviewing.json()).item).not.toHaveProperty('digest')
    expect((await adminUpdate(request(`${admin}/${id}`, 'POST', { status: 'needs_info' }, headers), context)).status).toBe(200)
    expect((await adminUpdate(request(`${admin}/${id}`, 'POST', { status: 'reviewing' }, headers), context)).status).toBe(200)
    expect((await adminUpdate(request(`${admin}/${id}`, 'POST', { status: 'scoped' }, headers), context)).status).toBe(200)
    expect((await adminUpdate(request(`${admin}/${id}`, 'POST', { status: 'closed' }, headers), context)).status).toBe(200)
    expect((await adminUpdate(request(`${admin}/${id}`, 'POST', { status: 'reviewing' }, headers), context)).status).toBe(409)
    expect(redis.records.get(key)!.expires).toBe(ttl)
    expect((await readAssessment(id))?.status).toBe('closed')
  })

  it('does not serialize unexpected stored fields into public admin records', () => {
    const data = { reference: id, name: 'A', email: 'a@example.test', firm: 'F', workflow: 'intake' as const, software: '', bottleneck: 'chasing' as const, volume: 'low' as const, status: 'received' as const, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), digest: 'a'.repeat(64), privateNote: 'leak' }
    expect(publicRecord(data)).not.toHaveProperty('privateNote')
  })
})
