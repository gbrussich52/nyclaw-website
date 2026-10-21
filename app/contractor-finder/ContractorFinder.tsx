'use client'
import { useRef, useState, type FormEvent } from 'react'
import { ArrowDownToLine, ArrowUpRight, Check, CircleHelp, FileText, MapPin, Search } from 'lucide-react'
import type { ContractorResult } from '../../lib/contractors/search'
import type { SearchInput } from '../../lib/contractors/schema'
import styles from './finder.module.css'

const tradeLabels = { electrician: 'Electrician', plumber: 'Plumber', 'general-contractor': 'General contractor' }
const jobLabels: Record<string, string> = { any: 'Any listed work', 'panel-upgrade': 'Panel / service upgrade', 'ev-charger': 'EV charger', 'lighting-outlets': 'Lighting / outlets', 'plumbing-repair': 'Plumbing repair', 'water-heater': 'Water heater', 'kitchen-bath': 'Kitchen / bathroom', renovation: 'Home renovation' }
const tradeJobs = { electrician: ['any', 'panel-upgrade', 'ev-charger', 'lighting-outlets'], plumber: ['any', 'plumbing-repair', 'water-heater', 'kitchen-bath'], 'general-contractor': ['any', 'renovation', 'kitchen-bath'] }
function sourceLabel(kind: string) {
  return kind === 'business-website' ? 'Business service page' : kind === 'business-selected-testimonial' ? 'Business-selected testimonial' : 'Permissioned independent evidence'
}
export default function ContractorFinder({ initial }: { initial: ContractorResult }) {
  const [filters, setFilters] = useState<SearchInput>({ trade: 'electrician', area: 'westchester', job: 'any', propertyType: 'residential', evidence: 'all' })
  const [result, setResult] = useState(initial)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const controller = useRef<AbortController | null>(null)
  async function search(event: FormEvent) {
    event.preventDefault(); controller.current?.abort(); controller.current = new AbortController()
    const active = controller.current
    setBusy(true); setError('')
    const timeout = setTimeout(() => active.abort(), 12000)
    try {
      const query = new URLSearchParams(Object.entries(filters).map(([key, value]) => [key, String(value)]))
      const response = await fetch(`/api/contractors/search?${query}`, { signal: active.signal })
      if (!response.ok) throw new Error('Search could not complete. Try again in a moment.')
      const data = await response.json() as ContractorResult
      if (controller.current === active) setResult(data)
    } catch (err) { if (controller.current === active) setError(err instanceof Error && err.name !== 'AbortError' ? err.message : 'Search timed out. Try again; no request was sent to any contractor.') }
    finally { clearTimeout(timeout); if (controller.current === active) setBusy(false) }
  }
  function brief() {
    const lines = ['CONTRACTOR COMPARISON — NYCLAW', `${tradeLabels[result.query.trade]} · ${result.query.area} · ${jobLabels[result.query.job]}`, result.message, '',
      ...result.candidates.flatMap(c => [c.name, c.website, c.license.label, c.matchReason, ...c.evidence.map(e => `${sourceLabel(e.kind)} · checked ${e.checkedAt}${e.publishedAt ? ` · published ${e.publishedAt}` : ' · publication date unknown'}\n${e.summary}\n${e.url}`), '']),
      'BEFORE HIRING', ...result.nextSteps.map(s => `• ${s}`), result.verificationUrl, '', 'UNSENT REQUEST TEMPLATE',
      'Hello, I am comparing providers for the project above. Do you serve my town and property type? Please confirm who will do the work, current license and insurance, permits, a written scope and itemized estimate, and two recent references for a similar job. Thank you.', '',
      'No message, quote request or payment has been sent. No independent ranking, availability or price is promised.']
    const url = URL.createObjectURL(new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' }))
    const link = document.createElement('a'); link.href = url; link.download = 'contractor-comparison.txt'; link.click(); URL.revokeObjectURL(url)
  }
  return <div className={styles.page}>
    <div className={styles.topline}><span><MapPin size={15} aria-hidden="true" /> LOCAL WORK, CITED</span><span>BY NYCLAW</span></div>
    <header className={styles.hero}><div><p className={styles.eyebrow}>A better starting point for your next home project</p><h1>Good work starts<br />with better evidence.</h1><p className={styles.deck}>Compare local tradespeople by the work they list, the sources behind it, and the checks still worth making.</p></div><aside className={styles.method}><FileText size={25} aria-hidden="true" /><h2>A shortlist you can check.</h2><p>Real source links.<br />Dated license checks.<br />No paid rankings.</p><span>WESTCHESTER · NYC COVERAGE IS LIMITED</span></aside></header>
    <form className={styles.search} onSubmit={search} aria-label="Find local contractors">
      <label>Who do you need?<select value={filters.trade} onChange={e => setFilters({ ...filters, trade: e.target.value as SearchInput['trade'], job: 'any' })}>{Object.entries(tradeLabels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select></label>
      <label>Where?<select value={filters.area} onChange={e => setFilters({ ...filters, area: e.target.value as SearchInput['area'] })}><option value="westchester">Westchester County</option><option value="nyc">New York City</option></select></label>
      <label>What work?<select value={filters.job} onChange={e => setFilters({ ...filters, job: e.target.value as SearchInput['job'] })}>{tradeJobs[filters.trade].map(job => <option value={job} key={job}>{jobLabels[job]}</option>)}</select></label>
      <label>Property<select value={filters.propertyType} onChange={e => setFilters({ ...filters, propertyType: e.target.value as SearchInput['propertyType'] })}><option value="residential">Home</option><option value="multifamily">Apartment building</option></select></label>
      <button disabled={busy} type="submit"><Search size={18} aria-hidden="true" />{busy ? 'Checking…' : 'Compare'}</button>
      <label className={styles.independent}><input type="checkbox" checked={filters.evidence === 'independent-only'} onChange={e => setFilters({ ...filters, evidence: e.target.checked ? 'independent-only' : 'all' })} /> Only show permissioned independent review evidence</label>
    </form>
    {error && <p className={styles.error} role="alert">{error}</p>}
    <section className={styles.results} aria-live="polite" aria-busy={busy}>
      <div className={styles.resultHeader}><div><p className={styles.eyebrow}>{tradeLabels[result.query.trade]} · {result.query.area === 'nyc' ? 'New York City' : 'Westchester'}</p><h2>{result.candidates.length ? `${result.candidates.length} candidates to compare` : 'More evidence needed'}</h2></div>{result.candidates.length > 0 && <button onClick={brief} className={styles.download}><ArrowDownToLine size={16} aria-hidden="true" />Save comparison & request draft</button>}</div>
      <p className={styles.disclosure}>{result.message}</p>
      {!result.candidates.length && <div className={styles.empty}><Search size={28} aria-hidden="true" /><h3>We won’t fill the gaps with guesses.</h3><p>This collection has no current match for those filters. Try another job or include clearly labeled business sources. Independent community recommendations are not connected yet.</p><a href={result.verificationUrl} target="_blank" rel="noopener noreferrer">Search the official license register <ArrowUpRight size={14} aria-hidden="true" /></a></div>}
      {result.candidates.map((candidate, index) => <article key={candidate.id} className={styles.candidate}>
        <div className={styles.identity}><span className={styles.number}>{String(index + 1).padStart(2, '0')}</span><h3>{candidate.name}</h3><p>{candidate.matchReason}</p><span className={styles.badge}>{candidate.evidenceLabel}</span><a href={candidate.website} target="_blank" rel="noopener noreferrer">Visit business website <ArrowUpRight size={15} aria-hidden="true" /></a></div>
        <div className={styles.evidence}><div className={styles.license}><>{candidate.license.currentAtCheck ? <Check size={16} aria-hidden="true" /> : <CircleHelp size={16} aria-hidden="true" />}</><div><strong>{candidate.license.currentAtCheck ? `License ${candidate.license.number}` : 'License check still needed'}</strong><p>{candidate.license.label}. Insurance, permits and availability need confirmation.</p><a href={candidate.license.sourceUrl} target="_blank" rel="noopener noreferrer">Check the register ↗</a></div></div>
          {candidate.evidence.map(source => <div className={styles.source} key={source.id}><div><strong>{sourceLabel(source.kind)}</strong><span>Checked {source.checkedAt}</span></div><p>{source.summary}</p><a href={source.url} target="_blank" rel="noopener noreferrer">Read the original source ↗</a><small>{source.publishedAt ? `Published ${source.publishedAt}` : 'Original publication date not provided'}</small></div>)}
        </div>
      </article>)}
    </section>
    <section className={styles.bottom}><div><p className={styles.eyebrow}>A useful second look</p><h2>Before you hire.</h2><ol>{result.nextSteps.map(step => <li key={step}>{step}</li>)}</ol></div><div><h2>Where the evidence comes from</h2><p>Public business pages and dated county-register checks. The starting collection is small; it is not the whole market. Selected testimonials are labeled and do not become independent reviews.</p><p>Facebook group collection is not connected. Community evidence needs permission and moderation before it can appear. No homeowner details or messages are collected by this finder.</p><a href="/contractor-finder/privacy">Privacy & source policy ↗</a><p className={styles.help}>Corrections or removal: <a href="mailto:hello@nyclaw.io?subject=Contractor%20finder%20correction">hello@nyclaw.io</a></p></div></section>
    <p className={styles.foot}>Free to compare. No placement fees or affiliate commissions. Not an emergency service; call 911 for immediate danger.</p>
  </div>
}
