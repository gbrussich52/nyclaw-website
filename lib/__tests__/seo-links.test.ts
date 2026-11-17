// classification: PRIVATE
import { describe, expect, it } from 'vitest'
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

function filesUnder(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const path = join(directory, entry.name)
    return entry.isDirectory() ? filesUnder(path) : [path]
  })
}

describe('retired SEO destinations', () => {
  it('keeps retired workshop and nonexistent guide links out of public source', () => {
    const files = [...filesUnder('app'), ...filesUnder('content/seo')]
      .filter(path => /\.(tsx|md)$/.test(path))
    const broken = files.filter(path => /(?:href=["']|\]\()\/(?:workshop|guides\/best-ai-assistant-setup-2026)(?:["')#?]|$)/.test(readFileSync(path, 'utf8')))
    expect(broken).toEqual([])
  })

  it('keeps the replacement playbook and contact destination available', () => {
    expect(readFileSync('public/ai-operators-playbook.html', 'utf8')).toMatch(/<html/i)
    const home = readFileSync('app/page.tsx', 'utf8')
    expect(home).toContain('<ContactForm />')
    expect(readFileSync('app/components/ContactForm.tsx', 'utf8')).toMatch(/id="contact"/)
  })
})

// Claude Sonnet 5.5, 2026-11-16: pin the two playbook-page meta descriptions under 160 characters (Ahrefs limit) and
// keep the two outbound reference links on their final URLs, so a redirect-chain or length alert cannot return unseen.
describe('playbook page SEO limits', () => {
  it('keeps both playbook meta descriptions at 160 characters or fewer', () => {
    const html = readFileSync('public/ai-operators-playbook.html', 'utf8')
    const htmlDescription = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? ''
    expect(htmlDescription.length).toBeGreaterThan(0)
    expect(htmlDescription.length).toBeLessThanOrEqual(160)

    const page = readFileSync('app/resources/page.tsx', 'utf8')
    const pageDescription = page.match(/^ {2}description: '((?:[^'\\]|\\.)*)',$/m)?.[1].replace(/\\'/g, "'") ?? ''
    expect(pageDescription.length).toBeGreaterThan(0)
    expect(pageDescription.length).toBeLessThanOrEqual(160)
  })

  it('links the final URLs, not the ones that answer 301 or 308', () => {
    const html = readFileSync('public/ai-operators-playbook.html', 'utf8')
    expect(html).not.toContain('11817273-using-claude-s-chat-search')
    expect(html).not.toContain('anthropic.com/engineering/building-effective-agents')
    expect(html).toContain('11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context')
    expect(html).toContain('anthropic.com/research/building-effective-agents')
  })
})
