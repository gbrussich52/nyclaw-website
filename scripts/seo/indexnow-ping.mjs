#!/usr/bin/env node
/**
 * IndexNow ping — tells Bing (and everything reading Bing's index: ChatGPT
 * Search via OAI-SearchBot, Copilot, DuckDuckGo, Yahoo) that a URL changed,
 * instead of waiting for the next crawl. Google/Gemini do not consume
 * IndexNow — this is Bing-side leverage only.
 *
 * Ownership proof: the key below must match a file at
 * https://nyclaw.io/<key>.txt containing exactly that key. That file
 * (public/b220fe587a3de865f5d5ac5017720881.txt) already ships with the site.
 *
 * THIS SCRIPT DOES NOT RUN ON ITS OWN. Nothing calls it from build, deploy,
 * or a loop. It is a documented, manual tool: run it by hand after a real
 * content change, or wire it into a publish step deliberately, later, with
 * its own decision. It has never been executed against the live API from
 * this repo.
 *
 * Usage (manual, from repo root):
 *   node scripts/seo/indexnow-ping.mjs https://nyclaw.io/blog/some-new-post
 *   node scripts/seo/indexnow-ping.mjs https://nyclaw.io/a https://nyclaw.io/b
 *
 * Docs: https://www.indexnow.org/documentation
 */

const KEY = 'b220fe587a3de865f5d5ac5017720881'
const HOST = 'nyclaw.io'
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`
const ENDPOINT = 'https://api.indexnow.org/indexnow'

function parseUrls(argv) {
  const urls = argv.slice(2)
  if (urls.length === 0) {
    console.error('Usage: node scripts/seo/indexnow-ping.mjs <url> [url...]')
    process.exit(1)
  }
  for (const u of urls) {
    const parsed = new URL(u)
    if (parsed.hostname !== HOST) {
      console.error(`Refusing to ping a URL outside ${HOST}: ${u}`)
      process.exit(1)
    }
  }
  return urls
}

async function ping(urlList) {
  const body = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  }

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  })

  // IndexNow returns 200/202 on accept, 400/403/422/429 on rejection —
  // never throws on a bad key, so the status must be checked explicitly.
  console.log(`IndexNow responded ${res.status} ${res.statusText}`)
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    console.error(text)
    process.exit(1)
  }
}

const urls = parseUrls(process.argv)
await ping(urls)
