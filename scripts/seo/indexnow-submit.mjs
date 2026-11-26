#!/usr/bin/env node
/**
 * IndexNow submit on production deploys (Claude, 2026-11-26).
 *
 * Runs as the npm `postbuild` step. It does nothing unless Vercel is building
 * the production deployment (VERCEL_ENV === 'production'), so local builds,
 * preview deploys and CI never call the API.
 *
 * What it does: reads the live sitemap (this is the previous deploy's list,
 * which is fine: IndexNow only asks search engines to recrawl), caps it at
 * 10,000 URLs, and POSTs { host, key, keyLocation, urlList } to
 * api.indexnow.org with an 8 second timeout. It logs the status and never
 * fails the build: every error is caught and the process exits 0.
 *
 * Ownership proof: public/b220fe587a3de865f5d5ac5017720881.txt holds the key.
 * The manual one-off tool is still scripts/seo/indexnow-ping.mjs.
 * Uses Node built-ins only (global fetch, AbortSignal.timeout).
 */

const HOST = 'nyclaw.io'
const KEY = 'b220fe587a3de865f5d5ac5017720881'
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`
const SITEMAP_URL = `https://${HOST}/sitemap.xml`
const ENDPOINT = 'https://api.indexnow.org/indexnow'
const MAX_URLS = 10000
const TIMEOUT_MS = 8000

function log(message) {
  console.log(`[indexnow] ${message}`)
}

function urlsFromSitemap(xml) {
  const urls = []
  for (const match of xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)) {
    const raw = match[1].replace(/&amp;/g, '&')
    try {
      if (new URL(raw).hostname === HOST) urls.push(raw)
    } catch {
      // skip anything that is not a valid absolute URL
    }
  }
  return [...new Set(urls)].slice(0, MAX_URLS)
}

async function main() {
  if (process.env.VERCEL_ENV !== 'production') {
    log(`skipped (VERCEL_ENV=${process.env.VERCEL_ENV ?? 'unset'}, runs on production deploys only)`)
    return
  }

  const sitemapRes = await fetch(SITEMAP_URL, { signal: AbortSignal.timeout(TIMEOUT_MS) })
  if (!sitemapRes.ok) {
    log(`skipped: sitemap returned ${sitemapRes.status}`)
    return
  }
  const urlList = urlsFromSitemap(await sitemapRes.text())
  if (urlList.length === 0) {
    log('skipped: sitemap had no URLs for this host')
    return
  }

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  })
  // 200 and 202 mean accepted; 400/403/422/429 mean rejected. Log either way.
  log(`submitted ${urlList.length} URLs, IndexNow responded ${res.status} ${res.statusText}`)
}

try {
  await main()
} catch (error) {
  log(`failed without blocking the build: ${error instanceof Error ? error.message : String(error)}`)
}
process.exit(0)
