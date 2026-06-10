import { describe, it, expect } from 'vitest'
import { sanitize } from '../sanitize'

describe('sanitize()', () => {
  it('strips XSS characters: < > " \'', () => {
    expect(sanitize('<script>alert("xss")</script>')).toBe('scriptalert(xss)/script')
    expect(sanitize("O'Brien")).toBe('OBrien')
    expect(sanitize('foo"bar')).toBe('foobar')
    expect(sanitize('<>')).toBe('')
  })

  it('strips CRLF sequences that enable email header injection', () => {
    expect(sanitize('name\r\nBcc: attacker@evil.com')).toBe('nameBcc: attacker@evil.com')
    expect(sanitize('subject\rX-Header: injected')).toBe('subjectX-Header: injected')
    expect(sanitize('line1\nline2')).toBe('line1line2')
    expect(sanitize('\r\n')).toBe('')
  })

  it('strips mixed XSS and CRLF in a single value', () => {
    expect(sanitize('<b>Hello</b>\r\nBcc: evil@test.com')).toBe('bHello/bBcc: evil@test.com')
  })

  it('truncates to 500 characters', () => {
    const long = 'a'.repeat(600)
    expect(sanitize(long)).toHaveLength(500)
  })

  it('trims leading and trailing whitespace', () => {
    expect(sanitize('  hello  ')).toBe('hello')
  })

  it('returns empty string for non-string values', () => {
    expect(sanitize(null)).toBe('')
    expect(sanitize(undefined)).toBe('')
    expect(sanitize(42)).toBe('')
    expect(sanitize({})).toBe('')
  })
})
