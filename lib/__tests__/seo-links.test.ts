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
