// classification: PUBLIC
'use client'

import { useRef, useState, type FormEvent } from 'react'
import styles from './page.module.css'

type PacketState = 'missing' | 'received' | 'ambiguous'
type FormValues = {
  name: string
  email: string
  firm: string
  workflow: 'intake' | 'documents' | 'billing' | ''
  software: string
  bottleneck: 'chasing' | 'reentry' | 'ownership' | 'review' | ''
  volume: 'low' | 'medium' | 'high' | 'unknown' | ''
  contactConsent: boolean
  website: string
}

const packetViews: Record<PacketState, { label: string; status: string; finding: string; action: string; draft: string }> = {
  missing: {
    label: 'No file listed',
    status: 'Missing association',
    finding: 'The fictional checklist asks for a signed engagement letter. The received list has no item linked to that request.',
    action: 'Staff checks approved storage and the source record before deciding whether the item is missing.',
    draft: 'If staff confirms it is missing, prepare a reminder for recipient and wording approval.',
  },
  received: {
    label: 'File linked',
    status: 'Ready for file review',
    finding: 'A received record is explicitly linked to the request and its entered metadata agrees with the checklist.',
    action: 'Staff opens the actual file to verify its identity, signed state and completeness. A metadata match is not proof.',
    draft: 'No missing-item reminder is proposed while the file awaits verification.',
  },
  ambiguous: {
    label: 'Scan unassigned',
    status: 'Uncertain match',
    finding: 'A scan is listed but has no explicit link to the requested item. Its filename alone cannot establish a match.',
    action: 'Staff inspects the scan and associates it only after checking the source file and checklist.',
    draft: 'Hold the reminder until staff resolves whether the scan is the requested item.',
  },
}

const initialValues: FormValues = {
  name: '', email: '', firm: '', workflow: '', software: '', bottleneck: '', volume: '', contactConsent: false, website: '',
}

function Packet() {
  const [view, setView] = useState<PacketState>('missing')
  const selected = packetViews[view]
  return (
    <div className={styles.packet} aria-label="Interactive fictional workflow review packet">
      <div className={styles.packetHead}>
        <div><span className={styles.packetMark}>Review sheet</span><strong>DEMO-104</strong></div>
        <span className={styles.fictional}>Fictional example</span>
      </div>
      <div className={styles.packetTitle}>
        <p>Document collection</p>
        <h2>Signed engagement letter</h2>
        <span>Checklist item · staff review required</span>
      </div>
      <div className={styles.packetChoice}>
        <p id="packet-choice-label">Change the received list</p>
        <div className={styles.choiceGroup} role="group" aria-labelledby="packet-choice-label">
          {(Object.keys(packetViews) as PacketState[]).map((key) => <button type="button" key={key} aria-pressed={view === key} onClick={() => setView(key)}>{packetViews[key].label}</button>)}
        </div>
      </div>
      <div className={styles.packetBody} aria-live="polite" aria-atomic="true">
        <div className={styles.packetStatus}><span className={styles.statusDot} />{selected.status}</div>
        <dl>
          <div><dt>What the list shows</dt><dd>{selected.finding}</dd></div>
          <div><dt>Human decision</dt><dd>{selected.action}</dd></div>
          <div><dt>Draft next step</dt><dd>{selected.draft}</dd></div>
        </dl>
      </div>
      <p className={styles.packetLimit}>This interaction uses fictional entered metadata. It reads no file, verifies no signature, and sends nothing.</p>
    </div>
  )
}

function RequestForm({ bookingUrl }: { bookingUrl: string }) {
  const [values, setValues] = useState<FormValues>(initialValues)
  const [renderedAt] = useState(() => Date.now())
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [reference, setReference] = useState('')
  const errorRef = useRef<HTMLDivElement>(null)
  const successRef = useRef<HTMLDivElement>(null)
  const attemptRef = useRef<{ fingerprint: string; requestId: string } | null>(null)

  function update<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((previous) => ({ ...previous, [key]: value }))
    if (error) setError('')
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (loading) return
    const fields = {
      name: values.name.trim(),
      email: values.email.trim(),
      firm: values.firm.trim(),
      workflow: values.workflow,
      software: values.software.trim(),
      bottleneck: values.bottleneck,
      volume: values.volume,
      contactConsent: values.contactConsent,
      website: values.website,
      ts: renderedAt,
    }
    const fingerprint = JSON.stringify(fields)
    if (!attemptRef.current || attemptRef.current.fingerprint !== fingerprint) {
      attemptRef.current = { fingerprint, requestId: crypto.randomUUID() }
    }
    setLoading(true)
    setError('')
    try {
      const response = await fetch('/api/workflow-assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestId: attemptRef.current.requestId, ...fields }),
        cache: 'no-store',
        signal: AbortSignal.timeout(12000),
      })
      const body: unknown = await response.json().catch(() => null)
      const receipt = body && typeof body === 'object' && 'reference' in body && typeof body.reference === 'string' ? body.reference : ''
      const confirmed = body && typeof body === 'object' && 'ok' in body && body.ok === true && 'status' in body && body.status === 'received'
      if (!response.ok || !confirmed || receipt !== attemptRef.current.requestId || ![200, 201].includes(response.status)) {
        if (response.status === 409) attemptRef.current = null
        const message = response.status === 409
          ? 'This request changed after an earlier attempt. Review the fields and send it again.'
          : response.status === 429
            ? 'Too many requests right now. Wait a little, then retry this form.'
            : response.status === 503
              ? 'Requests are temporarily unavailable. Please use the free fit call link or try again later.'
              : response.status === 400
                ? 'Check the fields, wait a moment, and try again. Use software names only and leave out client details.'
                : 'We could not confirm that your request was saved. Retry without changing the fields, or book the free fit call.'
        setError(message)
        requestAnimationFrame(() => errorRef.current?.focus())
        return
      }
      setReference(receipt)
      requestAnimationFrame(() => successRef.current?.focus())
    } catch {
      setError('We could not reach the request service. Retry without changing the fields, or book the free fit call.')
      requestAnimationFrame(() => errorRef.current?.focus())
    } finally {
      setLoading(false)
    }
  }

  if (reference) return (
    <div className={styles.formPanel}>
      <div className={styles.receipt} ref={successRef} tabIndex={-1} role="status">
        <h3>Request received</h3>
        <p>Your public reference is <strong>{reference}</strong>. Keep it for a follow-up. This confirms receipt only; a fit call, scope and fee are separate steps.</p>
        <a href={bookingUrl} target="_blank" rel="noopener noreferrer">Book the free 30-minute fit call</a>
        <button type="button" onClick={() => { setValues(initialValues); setReference(''); setError(''); attemptRef.current = null }}>Start another request</button>
      </div>
    </div>
  )

  return (
    <form className={styles.formPanel} onSubmit={submit}>
      <div className={styles.formHeader}><h3>Your workflow</h3><p>Short operational details only. No attachments or case narrative.</p></div>
      <div className={styles.formGrid}>
        <label>Full name<input required maxLength={80} autoComplete="name" value={values.name} onChange={(event) => update('name', event.target.value)} disabled={loading} /></label>
        <label>Work email<input required type="email" maxLength={254} autoComplete="email" value={values.email} onChange={(event) => update('email', event.target.value)} disabled={loading} /></label>
        <label>Firm name<input required maxLength={120} autoComplete="organization" value={values.firm} onChange={(event) => update('firm', event.target.value)} disabled={loading} /></label>
        <label>Workflow<select required value={values.workflow} onChange={(event) => update('workflow', event.target.value as FormValues['workflow'])} disabled={loading}><option value="">Choose one</option><option value="intake">Intake handoff</option><option value="documents">Document follow-up</option><option value="billing">Invoice preparation</option></select></label>
        <label className={styles.fullField}>Software used <span>(up to four names, if known)</span><input maxLength={120} placeholder="For example, your practice-management system" value={values.software} onChange={(event) => update('software', event.target.value)} disabled={loading} /></label>
        <label>Main bottleneck<select required value={values.bottleneck} onChange={(event) => update('bottleneck', event.target.value as FormValues['bottleneck'])} disabled={loading}><option value="">Choose one</option><option value="chasing">Chasing missing items</option><option value="reentry">Re-entering information</option><option value="ownership">Unclear ownership</option><option value="review">Slow review handoff</option></select></label>
        <label>Approximate monthly volume<select required value={values.volume} onChange={(event) => update('volume', event.target.value as FormValues['volume'])} disabled={loading}><option value="">Choose one</option><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option><option value="unknown">Not sure</option></select></label>
      </div>
      <div className={styles.honeypot} aria-hidden="true"><label htmlFor="workflow-website">Website<input id="workflow-website" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={(event) => update('website', event.target.value)} /></label></div>
      <label className={styles.consent}><input type="checkbox" required checked={values.contactConsent} onChange={(event) => update('contactConsent', event.target.checked)} disabled={loading} /><span>NYClaw may contact me about this workflow review request. I understand this is not a booking or agreement for paid work.</span></label>
      {error && <div ref={errorRef} tabIndex={-1} role="alert" className={styles.formError}>{error}</div>}
      <button className={styles.submitButton} type="submit" disabled={loading}>{loading ? 'Sending request…' : 'Send review request'}</button>
      <p className={styles.formFine}>We ask for no documents, client details or credentials here.</p>
    </form>
  )
}

export default function WorkflowBlueprint({ mode, bookingUrl }: { mode: 'packet' | 'form'; bookingUrl: string }) {
  return mode === 'packet' ? <Packet /> : <RequestForm bookingUrl={bookingUrl} />
}
