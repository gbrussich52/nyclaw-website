// classification: PUBLIC
import { afterEach, expect, it, vi } from 'vitest'
import config from '../next.config.js'
afterEach(() => vi.unstubAllEnvs())
it('permits Webpack eval only in development and preserves production CSP', async () => {
  vi.stubEnv('NODE_ENV', 'development')
  const development = (await config.headers!())[0].headers.find(header => header.key === 'Content-Security-Policy')?.value
  expect(development).toContain("'unsafe-eval'")
  vi.stubEnv('NODE_ENV', 'production')
  const production = (await config.headers!())[0].headers.find(header => header.key === 'Content-Security-Policy')?.value
  expect(production).not.toContain("'unsafe-eval'")
  expect(production).toContain("connect-src 'self'")
})
