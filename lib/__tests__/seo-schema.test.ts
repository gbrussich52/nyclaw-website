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
})
