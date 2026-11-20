// classification: PRIVATE
// Claude Sonnet 5.5, 2026-11-12: guard the defects the deep SEO crawl found (Article schema with no
// image, indexable pages missing from the sitemap, over-long descriptions).
import { describe, expect, it } from 'vitest'
import { readFileSync, readdirSync } from 'node:fs'

describe('Article schema and sitemap coverage', () => {
  it('ArticleJsonLd emits an image', () => {
    const src = readFileSync('app/components/JsonLd.tsx', 'utf8')
    const article = src.slice(src.indexOf('export function ArticleJsonLd'), src.indexOf('export function SoftwareApplicationJsonLd'))
    expect(article).toContain('image: OG_IMAGE_URL')
  })

  it('every inline Article schema block carries an image', () => {
    for (const dir of readdirSync('app/knowledge', { withFileTypes: true }).filter((d) => d.isDirectory())) {
      const src = readFileSync(`app/knowledge/${dir.name}/page.tsx`, 'utf8')
      if (src.includes('"@type": "Article"')) expect(src, dir.name).toContain('"image":')
    }
  })

  it('sitemap lists the indexable pages Ahrefs found missing', () => {
    const sitemap = readFileSync('app/sitemap.ts', 'utf8')
    for (const p of ['/dmca', '/contractor-finder/privacy', '/ai-operators-playbook.html']) {
      expect(sitemap).toContain(`path: '${p}'`)
    }
  })

  it('home and about descriptions fit 110-160 chars', () => {
    for (const f of ['app/page.tsx', 'app/about/page.tsx']) {
      const src = readFileSync(f, 'utf8')
      const m = src.match(/\n\s*description:\s*\n?\s*'([^']+)'/)
      expect(m, f).not.toBeNull()
      expect(m![1].length, f).toBeGreaterThanOrEqual(110)
      expect(m![1].length, f).toBeLessThanOrEqual(160)
    }
  })

  // Claude Sonnet 5.5, 2026-11-19: guards for the 19 Nov Ahrefs fixes (Open Graph and X card on the static playbook, Article schema on workflow guides).
  it('static playbook carries complete Open Graph and X card tags matching its canonical', () => {
    const html = readFileSync('public/ai-operators-playbook.html', 'utf8')
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1]
    for (const tag of ['og:title', 'og:description', 'og:type', 'og:url', 'og:image', 'og:image:width', 'og:image:height', 'og:image:alt']) {
      expect(html, tag).toContain(`<meta property="${tag}"`)
    }
    for (const tag of ['twitter:card', 'twitter:title', 'twitter:description', 'twitter:image']) {
      expect(html, tag).toContain(`<meta name="${tag}"`)
    }
    expect(html.match(/<meta property="og:url" content="([^"]+)"/)?.[1]).toBe(canonical)
    expect(html.match(/<meta property="og:image" content="([^"]+)"/)?.[1]).toMatch(/^https:\/\//)
  })

  it('workflow guide pages emit Article JSON-LD', () => {
    const src = readFileSync('app/ai-workflows/[recipe]/page.tsx', 'utf8')
    expect(src).toContain('<ArticleJsonLd')
    expect(src).toMatch(/datePublished=\{WORKFLOW_PAGE_PUBLISHED\}/)
  })
})
