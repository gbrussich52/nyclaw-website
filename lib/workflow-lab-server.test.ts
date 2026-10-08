// classification: PUBLIC
import { afterEach, describe, expect, it, vi } from 'vitest'
import { NextRequest } from 'next/server'
import { randomBytes } from 'node:crypto'
import { localLab, sameOrigin, labRpc, LabError } from './workflow-lab-server'
const request = (host = '127.0.0.1:3120', token = '') => new NextRequest('http://127.0.0.1:3120/api/workflow-lab/state', { headers: { host, ...(token ? { cookie: `nyclaw-workflow-lab=${token}` } : {}) } })
const configure = () => {
  vi.stubEnv('NODE_ENV', 'development')
  vi.stubEnv('WORKFLOW_LAB_ENABLED', 'local')
  vi.stubEnv('WORKFLOW_LAB_SUPABASE_URL', 'http://127.0.0.1:54581')
  vi.stubEnv('WORKFLOW_LAB_PUBLISHABLE_KEY', randomBytes(20).toString('hex'))
}
afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals() })
describe('local prototype boundary', () => {
  it('refuses production, disabled fixtures, remote hosts and remote database origins', () => {
    configure(); expect(localLab(request())).not.toBeNull()
    vi.stubEnv('NODE_ENV', 'production'); expect(localLab(request())).toBeNull()
    configure(); vi.stubEnv('WORKFLOW_LAB_ENABLED', ''); expect(localLab(request())).toBeNull()
    configure(); expect(localLab(request('nyclaw.io'))).toBeNull()
    for (const url of ['https://example.com', 'http://127.0.0.1@elsewhere.example', 'http://name:password@127.0.0.1:54581', 'http://127.0.0.1:54581/arbitrary']) {
      vi.stubEnv('WORKFLOW_LAB_SUPABASE_URL', url); expect(localLab(request())).toBeNull()
    }
  })
  it('requires an exact origin for every mutation', () => {
    for (const origin of ['', 'https://evil.example', 'http://localhost:3120']) expect(sameOrigin(new NextRequest('http://127.0.0.1:3120', { headers: { host: '127.0.0.1:3120', origin } }))).toBe(false)
    expect(sameOrigin(new NextRequest('http://127.0.0.1:3120', { headers: { host: '127.0.0.1:3120', origin: 'http://127.0.0.1:3120' } }))).toBe(true)
  })
  it('requires a session before any business call', async () => {
    configure(); const fetch = vi.fn(); vi.stubGlobal('fetch', fetch)
    await expect(labRpc(request(), 'describe_session')).rejects.toMatchObject({ status: 401 })
    expect(fetch).not.toHaveBeenCalled()
  })
  it('forwards only the caller token and rejects SQL/provider detail', async () => {
    configure(); const token = randomBytes(30).toString('hex')
    const fetch = vi.fn(async (_url: string, options: RequestInit) => {
      expect((options.headers as Record<string,string>).Authorization).toBe(`Bearer ${token}`)
      expect((options.headers as Record<string,string>)['Content-Profile']).toBe('workflow_lab')
      return new Response(JSON.stringify({ code: '42501', message: 'PRIVATE DATABASE DETAIL' }), { status: 403 })
    }); vi.stubGlobal('fetch', fetch)
    const failure = await labRpc(request('127.0.0.1:3120', token), 'describe_session').catch(error => error)
    expect(failure).toBeInstanceOf(LabError); expect((failure as LabError).code).toBe('permission_denied')
    expect(String(failure)).not.toContain('PRIVATE'); expect(fetch).toHaveBeenCalledTimes(1)
  })
  it('makes storage and invalid replies failures rather than empty success', async () => {
    configure(); vi.stubGlobal('fetch', vi.fn(async () => { throw Error('Offline') }))
    await expect(labRpc(request('127.0.0.1:3120', randomBytes(20).toString('hex')), 'describe_session')).rejects.toMatchObject({ status: 503 })
    vi.stubGlobal('fetch', vi.fn(async () => new Response('null')))
    await expect(labRpc(request('127.0.0.1:3120', randomBytes(20).toString('hex')), 'describe_session')).rejects.toMatchObject({ status: 503 })
  })
})
