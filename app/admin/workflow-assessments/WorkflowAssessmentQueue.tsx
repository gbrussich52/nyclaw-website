// classification: PUBLIC
'use client'

import { FormEvent, useRef, useState } from 'react'
import styles from './workflow-assessments.module.css'

const API_PATH = '/api/admin/workflow-assessments'
const REQUEST_TIMEOUT_MS = 12_000
const EDITABLE_STATUSES = ['reviewing', 'needs_info', 'scoped', 'closed'] as const
const ALL_STATUSES = ['received', ...EDITABLE_STATUSES] as const
type EditableStatus = (typeof EDITABLE_STATUSES)[number]
type AssessmentStatus = 'received' | EditableStatus

type AssessmentRequest = {
  reference: string
  name: string
  email: string
  firm: string
  workflow: string
  software: string
  bottleneck: string
  volume: string
  status: AssessmentStatus
  createdAt: string
  updatedAt: string
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function parseRequest(value: unknown): AssessmentRequest | null {
  if (!isRecord(value)) return null
  const stringFields = [
    'reference', 'name', 'email', 'firm', 'workflow', 'software', 'bottleneck',
    'volume', 'status', 'createdAt', 'updatedAt',
  ] as const
  if (!stringFields.every((field) => typeof value[field] === 'string')) return null
  if (!ALL_STATUSES.includes(value.status as (typeof ALL_STATUSES)[number])) return null
  return value as AssessmentRequest
}

function statusLabel(status: AssessmentStatus): string {
  switch (status) {
    case 'received': return 'Received'
    case 'reviewing': return 'Reviewing'
    case 'needs_info': return 'Needs information'
    case 'scoped': return 'Scope recorded'
    case 'closed': return 'Closed'
  }
}

function nextStatuses(status: AssessmentStatus): EditableStatus[] {
  switch (status) {
    case 'received': return ['reviewing']
    case 'reviewing': return ['needs_info', 'scoped', 'closed']
    case 'needs_info': return ['reviewing', 'closed']
    case 'scoped': return ['closed']
    case 'closed': return []
  }
}

function workflowLabel(workflow: string): string {
  switch (workflow) {
    case 'intake': return 'Client intake'
    case 'documents': return 'Document collection'
    case 'billing': return 'Billing preparation'
    default: return workflow
  }
}

function formatDate(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date)
}

function basicAuthorization(password: string): string {
  const bytes = new TextEncoder().encode(`operator:${password}`)
  let binary = ''
  bytes.forEach((byte) => { binary += String.fromCharCode(byte) })
  return `Basic ${btoa(binary)}`
}

async function readError(response: Response): Promise<string> {
  try {
    const body: unknown = await response.json()
    if (isRecord(body) && typeof body.error === 'string') return body.error
  } catch {
    // The status below is enough when the server didn't return JSON.
  }
  return `Request failed (${response.status}).`
}

export default function WorkflowAssessmentQueue() {
  const sessionGenerationRef = useRef(0)
  const activeRequestsRef = useRef(new Map<AbortController, number>())
  const saveInFlightRef = useRef(false)
  const [password, setPassword] = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [items, setItems] = useState<AssessmentRequest[]>([])
  const [draftStatuses, setDraftStatuses] = useState<Record<string, AssessmentStatus>>({})
  const [loading, setLoading] = useState(false)
  const [savingReference, setSavingReference] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  const startRequest = () => {
    const controller = new AbortController()
    const timer = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)
    activeRequestsRef.current.set(controller, timer)
    return controller
  }

  const finishRequest = (controller: AbortController) => {
    const timer = activeRequestsRef.current.get(controller)
    if (timer !== undefined) window.clearTimeout(timer)
    activeRequestsRef.current.delete(controller)
  }

  const isCurrentSession = (generation: number) => sessionGenerationRef.current === generation

  const loadQueue = async (currentPassword: string, generation: number) => {
    if (!isCurrentSession(generation)) return
    const controller = startRequest()
    setLoading(true)
    setError('')
    setNotice('')
    try {
      const response = await fetch(API_PATH, {
        method: 'GET',
        headers: { Authorization: basicAuthorization(currentPassword) },
        cache: 'no-store',
        credentials: 'omit',
        signal: controller.signal,
      })
      if (!isCurrentSession(generation)) return
      if (!response.ok) throw new Error(await readError(response))
      const body: unknown = await response.json()
      if (!isCurrentSession(generation)) return
      if (!isRecord(body) || !Array.isArray(body.items)) {
        throw new Error('The queue returned an invalid response. Refresh or try again later.')
      }
      const parsed = body.items.map(parseRequest)
      if (parsed.some((item) => item === null)) {
        throw new Error('The queue returned an invalid request record. No list was shown.')
      }
      setItems(parsed as AssessmentRequest[])
      setDraftStatuses(Object.fromEntries((parsed as AssessmentRequest[]).map((item) => [item.reference, item.status])))
      setUnlocked(true)
      setNotice(`${parsed.length} request${parsed.length === 1 ? '' : 's'} loaded.`)
    } catch (caught) {
      if (!isCurrentSession(generation)) return
      setItems([])
      setUnlocked(false)
      setPassword('')
      setError(caught instanceof Error
        ? `Could not load the request queue: ${caught.message}`
        : 'Could not load the request queue. Check the connection and try again.')
    } finally {
      finishRequest(controller)
      if (isCurrentSession(generation)) setLoading(false)
    }
  }

  const unlock = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!password) {
      setError('Enter the admin password to load requests.')
      return
    }
    const generation = ++sessionGenerationRef.current
    void loadQueue(password, generation)
  }

  const lock = () => {
    sessionGenerationRef.current += 1
    for (const [controller, timer] of activeRequestsRef.current) {
      window.clearTimeout(timer)
      controller.abort()
    }
    activeRequestsRef.current.clear()
    saveInFlightRef.current = false
    setPassword('')
    setUnlocked(false)
    setItems([])
    setDraftStatuses({})
    setLoading(false)
    setSavingReference(null)
    setError('')
    setNotice('')
  }

  const refresh = () => {
    if (password) void loadQueue(password, sessionGenerationRef.current)
  }

  const saveStatus = async (reference: string) => {
    const status = draftStatuses[reference]
    const current = items.find((item) => item.reference === reference)
    if (!password || !unlocked || !current || saveInFlightRef.current || !nextStatuses(current.status).includes(status as EditableStatus)) return
    saveInFlightRef.current = true
    const generation = sessionGenerationRef.current
    const controller = startRequest()
    setSavingReference(reference)
    setError('')
    setNotice('')
    try {
      const response = await fetch(`${API_PATH}/${encodeURIComponent(reference)}`, {
        method: 'POST',
        headers: {
          Authorization: basicAuthorization(password),
          'Content-Type': 'application/json',
        },
        credentials: 'omit',
        cache: 'no-store',
        signal: controller.signal,
        body: JSON.stringify({ status }),
      })
      if (!isCurrentSession(generation)) return
      if (!response.ok) throw new Error(await readError(response))
      const body: unknown = await response.json()
      if (!isCurrentSession(generation)) return
      const saved = isRecord(body) && body.ok === true ? parseRequest(body.item) : null
      if (!saved) {
        throw new Error('The server response could not confirm the saved status. Refresh the queue before retrying.')
      }
      setItems((current) => current.map((item) => item.reference === reference ? saved : item))
      setDraftStatuses((current) => ({ ...current, [reference]: status }))
      setNotice(`${saved.reference} status updated to ${statusLabel(saved.status)}.`)
    } catch (caught) {
      if (!isCurrentSession(generation)) return
      setError(caught instanceof Error
        ? `Could not confirm the status update: ${caught.message}`
        : 'Could not confirm the status update. Refresh the queue before retrying.')
    } finally {
      finishRequest(controller)
      if (isCurrentSession(generation)) {
        saveInFlightRef.current = false
        setSavingReference(null)
      }
    }
  }

  return (
    <section className={styles.queue} aria-labelledby="queue-heading" aria-busy={loading || Boolean(savingReference)}>
      <div className={styles.queueHeading}>
        <div>
          <p className={styles.eyebrow}>REQUEST HANDLING</p>
          <h2 id="queue-heading">Operator access</h2>
        </div>
        {unlocked && (
          <div className={styles.toolbar}>
            <button className={styles.secondaryButton} type="button" onClick={refresh} disabled={loading}>
              {loading ? 'Refreshing…' : 'Refresh'}
            </button>
            <button className={styles.secondaryButton} type="button" onClick={lock}>
              Lock queue
            </button>
          </div>
        )}
      </div>

      {!unlocked && (
        <form className={styles.unlockForm} onSubmit={unlock}>
          <p className={styles.muted}>
            Enter the admin password to fetch the private request queue. The credential stays in
            this page&apos;s component state and is cleared when you lock the queue or leave the page.
          </p>
          <label className={styles.label} htmlFor="admin-password">Admin password</label>
          <div className={styles.unlockRow}>
            <input
              id="admin-password"
              className={styles.input}
              type="password"
              autoComplete="off"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              disabled={loading}
              required
            />
            <button className={styles.primaryButton} type="submit" disabled={loading || !password}>
              {loading ? 'Loading…' : 'Unlock queue'}
            </button>
          </div>
        </form>
      )}

      {error && <p className={styles.error} role="alert">{error}</p>}
      {notice && <p className={styles.notice} role="status" aria-live="polite">{notice}</p>}

      {unlocked && items.length === 0 && !loading && !error && (
        <div className={styles.empty}>
          <h3>No requests in the queue</h3>
          <p>This is the live queue response. No example or seed contacts are shown here.</p>
        </div>
      )}

      {unlocked && items.length > 0 && (
        <div className={styles.list} aria-label="Workflow assessment requests">
          {items.map((item) => {
            const draft = draftStatuses[item.reference] ?? item.status
            const changed = draft !== item.status
            const choices = nextStatuses(item.status)
            return (
              <article className={styles.card} key={item.reference}>
                <div className={styles.cardTop}>
                  <div>
                    <p className={styles.reference}>Reference <strong>{item.reference}</strong></p>
                    <h3>{item.firm}</h3>
                    <p className={styles.contact}>{item.name} · <a href={`mailto:${encodeURIComponent(item.email)}`}>{item.email}</a></p>
                  </div>
                  <span className={styles.statusBadge} data-status={item.status}>{statusLabel(item.status)}</span>
                </div>

                <dl className={styles.details}>
                  <div><dt>Workflow</dt><dd>{workflowLabel(item.workflow)}</dd></div>
                  <div><dt>Received</dt><dd>{formatDate(item.createdAt)}</dd></div>
                  <div><dt>Current bottleneck</dt><dd>{item.bottleneck}</dd></div>
                  <div><dt>Volume</dt><dd>{item.volume}</dd></div>
                  <div className={styles.software}><dt>Current software</dt><dd>{item.software}</dd></div>
                </dl>

                <div className={styles.statusEditor}>
                  <label className={styles.label} htmlFor={`status-${item.reference}`}>Record handling status</label>
                  <div className={styles.statusRow}>
                    <select
                      id={`status-${item.reference}`}
                      className={styles.input}
                      value={draft}
                      onChange={(event) => setDraftStatuses((current) => ({
                        ...current,
                        [item.reference]: event.target.value as EditableStatus,
                      }))}
                      disabled={Boolean(savingReference) || choices.length === 0}
                    >
                      <option value={item.status} disabled>{statusLabel(item.status)} · current</option>
                      {choices.map((value) => <option value={value} key={value}>{statusLabel(value)}</option>)}
                    </select>
                    <button
                      className={styles.primaryButton}
                      type="button"
                      disabled={!changed || !choices.includes(draft as EditableStatus) || Boolean(savingReference)}
                      onClick={() => void saveStatus(item.reference)}
                    >
                      {savingReference === item.reference ? 'Saving…' : 'Save status'}
                    </button>
                  </div>
                  <p className={styles.note}>
                    “Scope recorded” only marks a status in this queue; payment, work completion,
                    and client acceptance are tracked elsewhere and are not implied here.
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}
