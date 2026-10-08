// classification: PUBLIC
'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, Check, ChevronRight, CircleHelp, FileCheck2, FileText, LockKeyhole, Minus, RefreshCw, ShieldCheck, UserRound } from 'lucide-react'
import { classifyWorkflowCase, type WorkflowCase, type WorkflowDraft, type WorkflowSession, type SimulationOutcome } from '@/lib/workflow-lab'
import styles from './page.module.css'

type View = 'loading' | 'sign_in' | 'workspace' | 'unavailable'
type Busy = 'opening' | 'loading' | 'preparing' | 'approving' | 'simulating' | 'signing_out' | null
type Persona = 'aster_staff' | 'aster_reviewer' | 'birch_staff' | 'birch_reviewer'
type RequestContext = { generation: number; signal: AbortSignal }
type StateResponse = { session: WorkflowSession; cases: WorkflowCase[] }

const firms: { name: string; people: { persona: Persona; role: string; description: string }[] }[] = [
  { name: 'Aster', people: [
    { persona: 'aster_staff', role: 'Staff', description: 'Check the document list and prepare a follow-up.' },
    { persona: 'aster_reviewer', role: 'Reviewer', description: 'Review the draft, approve it, and test a simulated delivery.' },
  ] },
  { name: 'Birch', people: [
    { persona: 'birch_staff', role: 'Staff', description: 'Check a separate firm’s document list and prepare a follow-up.' },
    { persona: 'birch_reviewer', role: 'Reviewer', description: 'Review only this firm’s drafts and simulation receipts.' },
  ] },
]
const caseLabels = { complete: 'Complete', followup: 'Follow-up needed', review: 'Needs review' }
const draftLabels = { prepared: 'Awaiting approval', approved: 'Approved for simulation', simulated_confirmed: 'Simulation confirmed', failed: 'Simulation failed', unconfirmed: 'Simulation unconfirmed' }
const outcomeOptions: { value: SimulationOutcome; label: string; detail: string }[] = [
  { value: 'confirmed', label: 'Confirmed', detail: 'Record a simulated confirmation.' },
  { value: 'failed', label: 'Failed', detail: 'Record a simulated failure.' },
  { value: 'timeout', label: 'Timeout', detail: 'Keep the outcome unconfirmed.' },
]

class ApiError extends Error {
  constructor(message: string, readonly status: number) { super(message) }
}

async function request<T>(path: string, context: RequestContext, init?: RequestInit): Promise<T> {
  // A timeout must not abort the generation itself: its catch still needs to recover the receipt.
  const signal = AbortSignal.any([context.signal, AbortSignal.timeout(12_000)])
  const response = await fetch(`/api/workflow-lab/${path}`, {
    ...init, signal, credentials: 'same-origin', cache: 'no-store',
    headers: { ...(init?.body ? { 'Content-Type': 'application/json' } : {}), ...init?.headers },
  })
  let body: unknown
  try { body = await response.json() } catch {
    if (signal.aborted) throw signal.reason
    body = null
  }
  if (!response.ok) {
    const detail = body && typeof body === 'object' && 'error' in body && typeof body.error === 'string' ? body.error : 'The workspace could not complete that request.'
    throw new ApiError(detail, response.status)
  }
  if (!body) throw new ApiError('The workspace returned an unreadable response. Refresh before continuing.', 503)
  return body as T
}

function readableError(error: unknown): string {
  if (error instanceof Error && error.name === 'TimeoutError') {
    return 'The request timed out after 12 seconds. Its result has not been confirmed.'
  }
  const messages: Record<string, string> = {
    sign_in_required: 'Your session is no longer available. Sign in again to continue.',
    permission_denied: 'This person does not have access to that workspace action. Sign in again to check current access.',
    origin_denied: 'This request must come from the local workspace page.',
    invalid_request: 'The workspace could not accept that request. Refresh before continuing.',
    workflow_changed_or_action_not_allowed: 'The workflow changed or this action is no longer allowed.',
    storage_unavailable: 'The local record service is unavailable.',
    workflow_unavailable: 'The local workflow service is unavailable.',
    invalid_storage_reply: 'The local service returned an unreadable record.',
    fixture_accounts_unavailable: 'The local prototype accounts are not ready. Complete the local setup and try again.',
    sign_in_unavailable: 'The local sign-in service is unavailable. Check the local setup and try again.',
  }
  return error instanceof ApiError ? messages[error.message] || error.message : 'The workspace could not be reached. Check the local service and refresh before continuing.'
}

function dateLabel(value: string) {
  const date = new Date(value)
  return Number.isFinite(date.getTime()) ? date.toLocaleString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }) : 'Time unavailable'
}

function eventLabel(kind: string) {
  const labels: Record<string, string> = {
    prepared: 'Follow-up prepared', draft_prepared: 'Follow-up prepared', approved: 'Reviewer approved',
    simulated_confirmed: 'Simulation confirmed', confirmed: 'Simulation confirmed', failed: 'Simulation failed',
    simulated_failed: 'Simulation failed', timeout: 'Simulation unconfirmed', unconfirmed: 'Simulation unconfirmed',
  }
  return labels[kind] || kind.replace(/_/g, ' ')
}

export default function WorkflowLab() {
  const [view, setView] = useState<View>('loading')
  const [session, setSession] = useState<WorkflowSession | null>(null)
  const [cases, setCases] = useState<WorkflowCase[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [draft, setDraft] = useState<WorkflowDraft | null>(null)
  const [busy, setBusy] = useState<Busy>('opening')
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState('')
  const [receiptUncertain, setReceiptUncertain] = useState(false)
  const [outcome, setOutcome] = useState<SimulationOutcome>('confirmed')
  const [clock, setClock] = useState(0)
  const generation = useRef(0)
  const controller = useRef<AbortController | null>(null)
  const requestKeys = useRef(new Map<string, string>())
  const detailHeading = useRef<HTMLHeadingElement>(null)
  const focusSelection = useRef(false)

  function begin(): RequestContext {
    controller.current?.abort()
    controller.current = new AbortController()
    return { generation: ++generation.current, signal: controller.current.signal }
  }
  function current(context: RequestContext) { return context.generation === generation.current && !context.signal.aborted }
  function clearWorkspace() {
    setSession(null); setCases([]); setSelectedId(null); setDraft(null); setReceiptUncertain(false)
    setOutcome('confirmed'); setNotice(''); setError(null); requestKeys.current.clear()
  }
  function fatal(error: unknown, context: RequestContext): boolean {
    if (!current(context)) return true
    if (error instanceof ApiError && [401, 403, 404].includes(error.status)) {
      clearWorkspace()
      setView(error.status === 404 ? 'unavailable' : 'sign_in')
      if (error.status !== 404) setError(readableError(error))
      return true
    }
    return false
  }

  async function readReceipt(item: WorkflowCase, context: RequestContext) {
    if (!item.latestDraftId) { if (current(context)) setDraft(null); return }
    const response = await request<{ result: WorkflowDraft }>('actions', context, {
      method: 'POST', body: JSON.stringify({ action: 'receipt', draftId: item.latestDraftId }),
    })
    if (current(context)) setDraft(response.result)
  }

  async function loadWorkspace(context: RequestContext, preferredId?: string | null) {
    const data = await request<StateResponse>('state', context)
    if (!current(context)) return
    const next = data.cases.find(item => item.id === preferredId) || data.cases.find(item => item.state === 'followup') || data.cases[0]
    setSession(data.session); setCases(data.cases); setSelectedId(next?.id || null); setView('workspace')
    setDraft(null)
    if (next) await readReceipt(next, context)
    if (current(context)) { setReceiptUncertain(false); setClock(Date.now()) }
  }

  useEffect(() => {
    const context = begin()
    void (async () => {
      try {
        const data = await request<{ session: WorkflowSession | null }>('session', context)
        if (!current(context)) return
        if (data.session) await loadWorkspace(context)
        else setView('sign_in')
      } catch (failure) {
        if (!fatal(failure, context) && current(context)) { setView('sign_in'); setError(readableError(failure)) }
      } finally { if (current(context)) setBusy(null) }
    })()
    return () => { controller.current?.abort(); generation.current += 1 }
    // This effect owns the initial session check; subsequent requests are explicit user actions.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (focusSelection.current && selectedId) { detailHeading.current?.focus(); focusSelection.current = false }
  }, [selectedId])

  useEffect(() => {
    if (!draft?.approvalExpiresAt) return
    const delay = Date.parse(draft.approvalExpiresAt) - Date.now()
    if (delay <= 0) { setClock(Date.now()); return }
    const timer = setTimeout(() => setClock(Date.now()), Math.min(delay + 25, 2_147_483_647))
    return () => clearTimeout(timer)
  }, [draft?.approvalExpiresAt])

  async function signIn(persona: Persona) {
    const context = begin()
    clearWorkspace(); setBusy('opening'); setView('loading')
    try {
      await request('session', context, { method: 'POST', body: JSON.stringify({ persona }) })
      if (current(context)) await loadWorkspace(context)
    } catch (failure) {
      if (!fatal(failure, context) && current(context)) { setView('sign_in'); setError(readableError(failure)) }
    } finally { if (current(context)) setBusy(null) }
  }

  async function signOut() {
    const context = begin()
    clearWorkspace(); setBusy('signing_out'); setView('loading')
    try {
      await request('session', context, { method: 'DELETE' })
      if (current(context)) { setView('sign_in'); setNotice('Signed out. Choose a person to open a workspace.') }
    } catch (failure) {
      if (!fatal(failure, context) && current(context)) { setView('sign_in'); setError(`${readableError(failure)} Sign-out could not be confirmed; the workspace has been cleared from this page.`) }
    } finally { if (current(context)) setBusy(null) }
  }

  async function selectCase(item: WorkflowCase) {
    const context = begin()
    focusSelection.current = true
    setSelectedId(item.id); setDraft(null); setError(null); setNotice(''); setReceiptUncertain(false); setOutcome('confirmed'); setBusy('loading')
    try { await readReceipt(item, context) }
    catch (failure) {
      if (!fatal(failure, context) && current(context)) { setError(readableError(failure)); setReceiptUncertain(true) }
    } finally { if (current(context)) { setBusy(null); setClock(Date.now()) } }
  }

  async function refresh() {
    const context = begin()
    setBusy('loading'); setError(null); setNotice(''); setReceiptUncertain(true)
    try {
      await loadWorkspace(context, selectedId)
      if (current(context)) setNotice('The checklist and latest receipt were refreshed from the workspace.')
    } catch (failure) {
      if (!fatal(failure, context) && current(context)) { setError(readableError(failure)); setReceiptUncertain(true) }
    } finally { if (current(context)) setBusy(null) }
  }

  async function act(action: 'prepare' | 'approve' | 'simulate') {
    if (!session || !selectedId || busy || receiptUncertain) return
    const context = begin()
    const caseId = selectedId
    setBusy(action === 'prepare' ? 'preparing' : action === 'approve' ? 'approving' : 'simulating')
    setError(null); setNotice('')
    const payload: Record<string, string> = { action }
    if (action === 'prepare') {
      const key = `${caseId}:${selectedCase?.version}`
      if (!requestKeys.current.has(key)) requestKeys.current.set(key, crypto.randomUUID())
      payload.caseId = caseId; payload.requestId = requestKeys.current.get(key)!
    } else {
      if (!draft) { setBusy(null); return }
      payload.draftId = draft.id
      if (action === 'simulate') payload.outcome = outcome
    }
    try {
      const response = await request<{ result: WorkflowDraft }>('actions', context, { method: 'POST', body: JSON.stringify(payload) })
      if (!current(context)) return
      setDraft(response.result)
      setCases(items => items.map(item => item.id === caseId ? { ...item, latestDraftId: response.result.id } : item))
      setReceiptUncertain(false); setClock(Date.now())
      setNotice(action === 'prepare' ? 'Follow-up prepared. A reviewer must approve it before a simulation.' : action === 'approve' ? 'Approval recorded. Delivery remains a simulation.' : 'The simulation result is recorded below. No message was sent.')
    } catch (failure) {
      if (fatal(failure, context) || !current(context)) return
      setReceiptUncertain(true)
      setError(`${readableError(failure)} Checking the server receipt before any further action.`)
      try {
        await loadWorkspace(context, caseId)
        if (current(context)) { setError(`${readableError(failure)} The latest server receipt is shown below. No action was retried.`); setNotice('Review the receipt before continuing.') }
      } catch (recoveryFailure) {
        if (!fatal(recoveryFailure, context) && current(context)) {
          setReceiptUncertain(true)
          setError('The action could not be confirmed, and the latest receipt could not be checked. Refresh the receipt before taking another action. Nothing has been retried automatically.')
        }
      }
    } finally { if (current(context)) setBusy(null) }
  }

  const selectedCase = cases.find(item => item.id === selectedId)
  const caseState = selectedCase ? classifyWorkflowCase(selectedCase.documents, selectedCase.observedAt, clock || Date.now()) : null
  const mutating = busy === 'preparing' || busy === 'approving' || busy === 'simulating'
  const approvalCurrent = Boolean(draft?.approvalExpiresAt && Date.parse(draft.approvalExpiresAt) > (clock || Date.now()))
  const expired = Boolean(draft?.approvalExpiresAt && !approvalCurrent)
  const versionChanged = Boolean(draft && selectedCase && draft.caseVersion !== selectedCase.version)
  const canPrepare = session?.role === 'staff' && caseState === 'followup' && !draft && !receiptUncertain
  const needsApproval = draft?.status === 'prepared' || Boolean(draft && ['approved', 'failed'].includes(draft.status) && !approvalCurrent)
  const canApprove = session?.role === 'reviewer' && needsApproval && caseState === 'followup' && !versionChanged && !receiptUncertain
  const canSimulate = session?.role === 'reviewer' && draft && ['approved', 'failed'].includes(draft.status) && approvalCurrent && !versionChanged && caseState === 'followup' && !receiptUncertain

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/law-firm-workflows" className={styles.backLink}><ArrowLeft size={14} aria-hidden="true" /> Workflow Blueprint</Link>
        <div className={styles.headingRow}>
          <div><p className={styles.prototypeBadge}><span aria-hidden="true" /> Fictional prototype · metadata only</p><h1>Document follow-up, under review.</h1><p className={styles.lede}>Check what is missing. Prepare the next step. Keep a person in charge.</p></div>
          <div className={styles.headerNote}><LockKeyhole size={16} aria-hidden="true" /><p>Local workspace<br /><span>No client files. No messages sent.</span></p></div>
        </div>
      </header>

      {error && <div role="alert" className={styles.error}><CircleHelp size={18} aria-hidden="true" /><p>{error}</p></div>}
      {notice && <p role="status" className={styles.notice}>{notice}</p>}

      {view === 'loading' && <section className={styles.emptyPanel} aria-busy="true"><LockKeyhole size={25} aria-hidden="true" /><h2>{busy === 'signing_out' ? 'Clearing the workspace…' : 'Opening the workspace…'}</h2><p role="status">Checking the local session. No records are shown until access is confirmed.</p></section>}

      {view === 'unavailable' && <section className={styles.unavailable}>
        <div className={styles.unavailableMark}><LockKeyhole size={28} aria-hidden="true" /></div>
        <div><p className={styles.kicker}>Prototype unavailable here</p><h2>This workspace runs locally.</h2><p>The interactive prototype needs the development app and its local workflow service. It is not active on the public site.</p><p>To review a real administrative workflow with your team, start with a Workflow Blueprint.</p><Link href="/law-firm-workflows#request-blueprint" className={styles.primaryLink}>Request a blueprint review <ArrowUpRight size={16} aria-hidden="true" /></Link></div>
      </section>}

      {view === 'sign_in' && <section className={styles.login} aria-labelledby="choose-person-title">
        <div className={styles.loginIntro}><p className={styles.kicker}>Choose a role</p><h2 id="choose-person-title">Open a review workspace.</h2><p>Start as staff to prepare a draft, then switch to a reviewer to approve it. Each firm has its own records.</p><div className={styles.roleNote}><ShieldCheck size={19} aria-hidden="true" /><p>These buttons sign in to the local prototype. Access and approvals are checked by the service.</p></div></div>
        <div className={styles.firmChoices}>{firms.map(firm => <section key={firm.name} className={styles.firmChoice} aria-label={`${firm.name} firm personas`}><h3>{firm.name}<span>Fictional firm</span></h3><div>{firm.people.map(person => <button key={person.persona} type="button" className={styles.personButton} aria-label={`Open ${firm.name} as ${person.role.toLowerCase()}`} disabled={Boolean(busy)} onClick={() => void signIn(person.persona)}><span><strong>{person.role}</strong><span>{person.description}</span></span><ChevronRight size={18} aria-hidden="true" /></button>)}</div></section>)}</div>
      </section>}

      {view === 'workspace' && session && <section className={styles.workspace} aria-label="Document follow-up workspace">
        <div className={styles.workspaceBar}>
          <div className={styles.identity}><span className={styles.firmMonogram} aria-hidden="true">{session.workspaceName.slice(0, 1)}</span><div><strong>{session.workspaceName}</strong><span><UserRound size={12} aria-hidden="true" /> Signed in as {session.role}</span></div></div>
          <div className={styles.workspaceActions}><button type="button" onClick={() => void signOut()} disabled={mutating} className={styles.textButton}>Switch role or firm</button><button type="button" onClick={() => void signOut()} disabled={mutating} className={styles.secondaryButton}>Sign out</button></div>
        </div>
        <div className={styles.workspaceBody}>
          <aside className={styles.queue} aria-labelledby="queue-title"><div className={styles.queueHeader}><h2 id="queue-title">Matter queue</h2><span>{cases.length} {cases.length === 1 ? 'record' : 'records'}</span></div><p className={styles.queueDescription}>Choose a checklist to review.</p>
            <ul className={styles.caseList}>{cases.map(item => { const status = classifyWorkflowCase(item.documents, item.observedAt, clock || Date.now()); return <li key={item.id}><button type="button" className={`${styles.caseButton} ${item.id === selectedId ? styles.caseSelected : ''}`} aria-pressed={item.id === selectedId} disabled={mutating} onClick={() => void selectCase(item)}><span className={styles.caseTopline}><span>{caseLabels[status]}</span>{item.id === selectedId && <ChevronRight size={14} aria-hidden="true" />}</span><strong>{item.label}</strong><span className={styles.caseFootnote}>Version {item.version}{item.latestDraftId ? ' · Draft on record' : ''}</span></button></li> })}</ul>
            {!cases.length && <p className={styles.queueDescription}>No records are available in this workspace.</p>}
            <div className={styles.queueFooter}><LockKeyhole size={14} aria-hidden="true" /><span>Records are limited to this firm.</span></div>
          </aside>

          <div className={styles.reviewSheet} aria-busy={Boolean(busy)}>
            {selectedCase && caseState ? <>
              <div className={styles.sheetHeading}><div><p className={styles.kicker}>Document checklist</p><h2 ref={detailHeading} tabIndex={-1}>{selectedCase.label}</h2><p>Observed {dateLabel(selectedCase.observedAt)} <span aria-hidden="true">·</span> Version {selectedCase.version}</p></div><span className={styles.status}>{caseLabels[caseState]}</span></div>
              <section className={styles.checklist} aria-labelledby="required-documents-title"><h3 id="required-documents-title">Required documents</h3><ul>{selectedCase.documents.map((document, index) => <li key={`${index}-${document.label}`}><span className={styles.documentIcon}>{document.status === 'received' ? <Check size={15} aria-hidden="true" /> : document.status === 'missing' ? <Minus size={15} aria-hidden="true" /> : <CircleHelp size={15} aria-hidden="true" />}</span><span className={styles.documentLabel}>{document.label}</span><span className={styles.documentStatus}>{document.status === 'received' ? 'Received' : document.status === 'missing' ? 'Missing' : 'Uncertain'}</span></li>)}</ul></section>

              {caseState === 'complete' && <div className={styles.decisionNote}><FileCheck2 size={21} aria-hidden="true" /><div><h3>No missing items in this checklist.</h3><p>A follow-up cannot be prepared for a complete checklist. This status reflects the sample record, not verification of actual documents.</p></div></div>}
              {caseState === 'review' && <div className={styles.decisionNote}><CircleHelp size={21} aria-hidden="true" /><div><h3>Staff clarification comes first.</h3><p>The checklist includes uncertain information, is empty, or its observation is not current. Observations older than seven days need review. Drafting and approval are held.</p></div></div>}

              <section className={styles.draftSection} aria-labelledby="draft-title"><div className={styles.sectionHeading}><div><p className={styles.kicker}>Next step</p><h3 id="draft-title">Follow-up draft</h3></div>{draft && <span className={styles.status}>{draftLabels[draft.status]}</span>}</div>
                {busy === 'loading' ? <p className={styles.quietState} role="status">Loading the latest server receipt…</p> : draft ? <>
                  <div className={styles.draftPaper}><div className={styles.draftTopline}><FileText size={16} aria-hidden="true" /><span>Template draft · read only</span></div><pre>{draft.body}</pre><p>Prepared for checklist version {draft.caseVersion}. No message has been sent.</p></div>
                  {(expired || versionChanged) && <p className={styles.inlineWarning}>{versionChanged ? 'The checklist changed after this draft was prepared. Approval and simulation are blocked.' : 'This approval has expired. Refresh the receipt and obtain a current approval before continuing.'}</p>}
                  {needsApproval && <div className={styles.actionRow}><button type="button" className={styles.primaryButton} disabled={!canApprove || Boolean(busy)} onClick={() => void act('approve')}>{busy === 'approving' ? 'Recording approval…' : draft.status === 'prepared' ? 'Approve this draft' : 'Renew draft approval'}</button><p>{session.role === 'staff' ? 'A reviewer must approve this exact draft. Switch roles to continue.' : 'Approval applies to this draft and checklist version. It expires after 15 minutes.'}</p></div>}
                  {draft.status === 'unconfirmed' && <div className={styles.decisionNote}><CircleHelp size={20} aria-hidden="true" /><div><h3>The simulation remains unconfirmed.</h3><p>No retry is available for an unconfirmed outcome. Refresh the receipt to inspect the recorded result.</p></div></div>}
                  {draft.status === 'simulated_confirmed' && <div className={styles.decisionNote}><Check size={20} aria-hidden="true" /><div><h3>Simulation confirmed.</h3><p>The confirmation is recorded below. No real message was sent, and the document checklist has not been marked complete.</p></div></div>}
                </> : <div className={styles.emptyDraft}><FileText size={25} aria-hidden="true" /><div><h4>No follow-up draft yet.</h4><p>{caseState !== 'followup' ? 'A current checklist with known missing items is required.' : 'Prepare a template that asks for the known missing items. A reviewer checks it before the next step.'}</p><button type="button" className={styles.primaryButton} disabled={!canPrepare || Boolean(busy)} onClick={() => void act('prepare')}>{busy === 'preparing' ? 'Preparing draft…' : 'Prepare follow-up draft'}</button>{session.role === 'reviewer' && caseState === 'followup' && <p className={styles.actionHint}>Only staff can prepare a new draft.</p>}</div></div>}
              </section>

              {draft && ['approved', 'failed'].includes(draft.status) && <section className={styles.simulation} aria-labelledby="simulation-title"><div className={styles.sectionHeading}><div><p className={styles.kicker}>Reviewer action</p><h3 id="simulation-title">Simulate delivery</h3></div><ShieldCheck size={20} aria-hidden="true" /></div><p>Choose a fictional outcome to test the receipt. This does not contact a delivery provider or send a message.</p><fieldset className={styles.outcomes} disabled={!canSimulate || Boolean(busy)}><legend className={styles.srOnly}>Simulated delivery outcome</legend>{outcomeOptions.map(option => <label key={option.value} className={`${styles.outcomeOption} ${outcome === option.value ? styles.outcomeSelected : ''}`}><input type="radio" name="outcome" value={option.value} checked={outcome === option.value} onChange={() => setOutcome(option.value)} /><span><strong>{option.label}</strong><span>{option.detail}</span></span></label>)}</fieldset><div className={styles.actionRow}><button type="button" className={styles.primaryButton} disabled={!canSimulate || Boolean(busy)} onClick={() => void act('simulate')}>{busy === 'simulating' ? 'Recording simulation…' : draft.status === 'failed' ? 'Retry simulation explicitly' : 'Run delivery simulation'}</button><p>{session.role !== 'reviewer' ? 'Only a reviewer can run a simulation.' : expired ? 'The approval has expired.' : draft.approvalExpiresAt ? `Approval expires ${dateLabel(draft.approvalExpiresAt)}.` : 'A current approval is required.'}</p></div></section>}

              <section className={styles.receipts} aria-labelledby="receipt-title"><div className={styles.sectionHeading}><div><p className={styles.kicker}>Recorded by the service</p><h3 id="receipt-title">Receipt timeline</h3></div><button type="button" className={styles.refreshButton} disabled={Boolean(busy)} onClick={() => void refresh()}><RefreshCw size={14} aria-hidden="true" /> Refresh receipt</button></div>
                {receiptUncertain && <p className={styles.inlineWarning}>The latest receipt is not confirmed. Actions stay locked until it can be checked.</p>}
                {draft && draft.events.length > 0 ? <><ol className={styles.timeline}>{draft.events.map((event, index) => <li key={`${event.at}-${event.kind}-${index}`}><span className={styles.timelineDot} aria-hidden="true" /><div className={styles.eventHeading}><strong>{eventLabel(event.kind)}</strong><time dateTime={event.at}>{dateLabel(event.at)}</time></div><p>{event.detail}</p><span className={styles.eventActor}>{event.actorId === session.userId ? 'Recorded by your current persona' : `Actor ${event.actorId.slice(0, 8)}`}</span></li>)}</ol><p className={styles.receiptId}>Receipt reference <span>{draft.id}</span></p></> : <p className={styles.quietState}>{busy === 'loading' ? 'Checking for a recorded draft…' : 'No workflow receipt is available for this checklist yet.'}</p>}
                <p className={styles.receiptFootnote}>A receipt records the workflow action. A simulated confirmation is not proof of external delivery or document completion.</p>
              </section>
            </> : <div className={styles.emptyPanel}><FileText size={25} aria-hidden="true" /><h2>No checklist to review.</h2><p>This firm has no available records. Refresh to check the workspace.</p><button type="button" className={styles.secondaryButton} disabled={Boolean(busy)} onClick={() => void refresh()}>Refresh workspace</button></div>}
          </div>
        </div>
      </section>}

      <footer className={styles.footer}><p>One administrative handoff, with a reviewable record.</p><Link href="/law-firm-workflows#request-blueprint">Request a Workflow Blueprint <ArrowUpRight size={14} aria-hidden="true" /></Link></footer>
    </main>
  )
}
