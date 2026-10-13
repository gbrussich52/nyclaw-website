// classification: PUBLIC
'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import { track } from '@vercel/analytics'
import { ArrowDown, ArrowUpRight, Check, Copy, Download, FileText } from 'lucide-react'
import { evaluateFit, fitSchema, formatFitBrief, type FitInput, type FitResult } from '@/lib/workflow-fit'
import { workflowMetadata, workflowRecipes, type WorkflowRecipe } from '@/lib/workflow-kits'
import { useContactSubmit } from '../hooks/useContactSubmit'
import { CALENDLY_URL, FREE_AUDIT_LABEL } from '../config'
import styles from './WorkflowFit.module.css'

type Answers = { recipe: string; weeklyCases: string; minutesPerCase: string; nativeSupport: string; reviewOwner: string }
type Plan = { input: FitInput; result: FitResult; brief: string; revision: number }
const nativeChecks: Record<WorkflowRecipe, string> = {
  'quote-followup': 'Look for quote reminders, open-quote filters, and a review queue in your current CRM.',
  'invoice-discrepancies': 'Look for invoice matching, difference reports, and approval rules in your accounting software.',
  'order-handoff': 'Look for a shared payment, production, and shipment view in your current order system.',
}

function isRecipe(value: string | null): value is WorkflowRecipe {
  return workflowRecipes.some(recipe => recipe === value)
}

function BriefActions({ brief, recipe }: { brief: string; recipe: WorkflowRecipe }) {
  const [feedback, setFeedback] = useState('')
  const [failed, setFailed] = useState(false)
  const [expanded, setExpanded] = useState(false)

  async function copy() {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable')
      await navigator.clipboard.writeText(brief)
      setFailed(false); setFeedback('Brief copied.')
    } catch {
      setExpanded(true); setFailed(true)
      setFeedback('Copy is unavailable. Select the brief below to copy it yourself, or download it.')
    }
  }

  function download() {
    let url: string | undefined
    let link: HTMLAnchorElement | undefined
    try {
      url = URL.createObjectURL(new Blob([brief], { type: 'text/plain;charset=utf-8' }))
      link = document.createElement('a')
      link.href = url; link.download = `workflow-fit-${recipe}.txt`
      document.body.appendChild(link); link.click(); link.remove()
      const objectUrl = url
      window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000)
      setFailed(false); setFeedback('Download started. Check your browser’s downloads for the brief.')
      try { track('brief_downloaded', { recipe }) } catch { /* Analytics must not block the brief. */ }
    } catch {
      link?.remove()
      if (url) URL.revokeObjectURL(url)
      setExpanded(true); setFailed(true)
      setFeedback('The download could not start. Your brief is still below; select and copy the text.')
    }
  }

  return <div className={styles.export}>
    <div className={styles.actions}>
      <button type="button" className={styles.secondaryButton} onClick={download}><Download size={16} aria-hidden="true" /> Download brief</button>
      <button type="button" className={styles.textButton} onClick={() => void copy()}><Copy size={15} aria-hidden="true" /> Copy brief</button>
    </div>
    <p className={failed ? styles.error : styles.feedback} role={failed ? 'alert' : 'status'}>{feedback}</p>
    <details className={styles.brief} open={expanded} onToggle={event => setExpanded(event.currentTarget.open)}>
      <summary>Read the full brief</summary>
      <pre tabIndex={0} aria-label="Your workflow fit brief">{brief}</pre>
    </details>
  </div>
}

function FitInquiry({ input, brief }: { input: FitInput; brief: string }) {
  const id = 'workflow-fit-inquiry'
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [tools, setTools] = useState('')
  const { loading, errorMsg, submitted, submit, honeypotRef } = useContactSubmit()
  const receiptHeading = useRef<HTMLHeadingElement>(null)
  useEffect(() => { if (submitted) receiptHeading.current?.focus() }, [submitted])

  async function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (loading) return
    await submit({ name: name.trim(), email: email.trim(), businessType: 'Workflow implementation', challenge: 'workflow-fit', message: `${brief}\nCurrent tools: ${tools.trim()}`, workflowFit: input, workflowTools: tools.trim() }, 'contact_form')
  }

  if (submitted) return <div className={styles.receipt}>
    <div className={styles.receiptLabel}><Check size={16} aria-hidden="true" /> Request received</div>
    <h4 ref={receiptHeading} tabIndex={-1}>Your inquiry has been saved.</h4>
    <p>We have your brief and contact details for review. Any implementation scope, price, and timing are agreed separately.</p>
    <p className={styles.small}>No meeting or paid work has been booked. You can still keep a copy of your brief above.</p>
  </div>

  return <details className={styles.inquiry}>
    <summary><span>Want us to review this workflow?<small>Optional · send your brief with your contact details</small></span><ArrowDown size={17} aria-hidden="true" /></summary>
    <form onSubmit={event => void send(event)} className={styles.inquiryForm}>
      <p>A fit conversation starts with your existing tools. Sending this request does not agree to paid work.</p>
      <div className={styles.contactFields}>
        <div className={styles.field}><label htmlFor={`${id}-name`}>Your name</label><input id={`${id}-name`} name="name" autoComplete="name" value={name} onChange={event => setName(event.target.value)} required maxLength={200} /></div>
        <div className={styles.field}><label htmlFor={`${id}-email`}>Email</label><input id={`${id}-email`} name="email" type="email" autoComplete="email" value={email} onChange={event => setEmail(event.target.value)} required maxLength={254} /></div>
      </div>
      <div className={styles.field}><label htmlFor={`${id}-tools`}>Current tools <span>optional</span></label><input id={`${id}-tools`} name="tools" value={tools} onChange={event => setTools(event.target.value)} maxLength={300} aria-describedby={`${id}-tools-help`} placeholder="For example: a CRM and a shared spreadsheet" /><p id={`${id}-tools-help`} className={styles.hint}>App names only. Do not include customer details, credentials, or confidential information.</p></div>
      <div className={styles.honeypot} aria-hidden="true"><label htmlFor={`${id}-website`}>Leave this blank</label><input id={`${id}-website`} name="website" ref={honeypotRef} tabIndex={-1} autoComplete="off" /></div>
      <p className={styles.small}>By sending, you ask NYClaw to store your brief and contact you about this request. This does not subscribe you to a newsletter or send a message to your customers.</p>
      {errorMsg && <p role="alert" className={styles.error}>{errorMsg}</p>}
      <button type="submit" disabled={loading} className={styles.primaryButton}>{loading ? 'Sending your brief…' : 'Send brief for review'}{!loading && <ArrowUpRight size={16} aria-hidden="true" />}</button>
    </form>
  </details>
}

function FitPlan({ plan }: { plan: Plan }) {
  const heading = useRef<HTMLHeadingElement>(null)
  useEffect(() => { heading.current?.focus() }, [])
  return <div className={styles.result}>
    <div className={styles.resultLabel}><FileText size={16} aria-hidden="true" /> Your workflow plan <span>Ready to keep</span></div>
    <div className={styles.recommendation}>
      <p className={styles.kicker}>Recommended next step</p>
      <h3 ref={heading} tabIndex={-1}>{plan.result.title}</h3>
      <p>{plan.result.reason}</p>
    </div>
    <div className={styles.baseline}>
      <div><span>Reported time today</span><p><strong>{new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 }).format(plan.result.weeklyHours)}</strong> hours / week</p></div>
      <p>{plan.input.weeklyCases.toLocaleString('en-US')} cases × {plan.input.minutesPerCase} minutes ÷ 60.<br />Your estimate is a baseline, not a forecast of time saved.</p>
    </div>
    <ol className={styles.steps}>{plan.result.steps.map((step, index) => <li key={step}><span aria-hidden="true">0{index + 1}</span><p>{step}</p></li>)}</ol>
    <div className={styles.native}><h4>Check what you already have</h4><p>{nativeChecks[plan.input.recipe]}</p></div>
    <BriefActions brief={plan.brief} recipe={plan.input.recipe} />
    <FitInquiry input={plan.input} brief={plan.brief} />
    <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className={styles.calendarLink}>Prefer a conversation? {FREE_AUDIT_LABEL} <ArrowUpRight size={14} aria-hidden="true" /></a>
  </div>
}

export default function WorkflowFit({ initialRecipe }: { initialRecipe?: WorkflowRecipe }) {
  const id = 'workflow-fit'
  const [answers, setAnswers] = useState<Answers>({ recipe: initialRecipe ?? '', weeklyCases: '', minutesPerCase: '', nativeSupport: '', reviewOwner: '' })
  const [plan, setPlan] = useState<Plan | null>(null)
  const [error, setError] = useState('')
  const revision = useRef(0)

  useEffect(() => {
    if (initialRecipe) return
    const selected = new URLSearchParams(window.location.search).get('kit')
    if (isRecipe(selected)) setAnswers(current => ({ ...current, recipe: selected }))
  }, [initialRecipe])

  function update(field: keyof Answers, value: string) {
    setAnswers(current => ({ ...current, [field]: value }))
    setPlan(null); setError('')
  }

  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPlan(null); setError('')
    const parsed = fitSchema.safeParse({ ...answers, weeklyCases: answers.weeklyCases === '' ? undefined : Number(answers.weeklyCases), minutesPerCase: answers.minutesPerCase === '' ? undefined : Number(answers.minutesPerCase) })
    if (!parsed.success) { setError('Choose every answer and use whole numbers within the limits shown. Your answers have been kept.'); return }
    try {
      const result = evaluateFit(parsed.data)
      setPlan({ input: parsed.data, result, brief: formatFitBrief(parsed.data), revision: ++revision.current })
      try { track('workflow_fit_completed', { recipe: parsed.data.recipe, route: result.route }) } catch { /* The plan works without analytics. */ }
    } catch { setError('Your plan could not be calculated. Please check your answers and try again. Nothing has been sent.') }
  }

  return <section id="workflow-fit" data-workflow-fit-version="1" className={styles.planner} aria-labelledby={`${id}-title`}>
    <header className={styles.intro}><p className={styles.kicker}>Plan one handoff</p><h2 id={`${id}-title`}>What would help<br />your workflow most?</h2><p>Start with the tools you have and the work you do today. Get a next step and a brief you can keep, without an email address.</p></header>
    <div className={styles.layout}>
      <form className={styles.form} onSubmit={calculate}>
        <div className={styles.formHeading}><span aria-hidden="true">01</span><h3>Your starting point</h3></div>
        <p className={styles.formNote}>Use your best estimates. All five answers are required.</p>
        <div className={styles.field}><label htmlFor={`${id}-recipe`}>Which handoff are you considering?</label><select id={`${id}-recipe`} value={answers.recipe} required onChange={event => update('recipe', event.target.value)}><option value="" disabled>Choose a workflow</option>{workflowRecipes.map(recipe => <option value={recipe} key={recipe}>{workflowMetadata[recipe].title}</option>)}</select></div>
        <div className={styles.numberFields}>
          <div className={styles.field}><label htmlFor={`${id}-cases`}>Cases per week</label><input id={`${id}-cases`} type="number" inputMode="numeric" min={0} max={10000} step={1} required value={answers.weeklyCases} onChange={event => update('weeklyCases', event.target.value)} aria-describedby={`${id}-cases-help`} /><p id={`${id}-cases-help`} className={styles.hint}>Whole number, 0–10,000.</p></div>
          <div className={styles.field}><label htmlFor={`${id}-minutes`}>Minutes per case</label><input id={`${id}-minutes`} type="number" inputMode="numeric" min={0} max={240} step={1} required value={answers.minutesPerCase} onChange={event => update('minutesPerCase', event.target.value)} aria-describedby={`${id}-minutes-help`} /><p id={`${id}-minutes-help`} className={styles.hint}>Current manual time, 0–240.</p></div>
        </div>
        <div className={styles.field}><label htmlFor={`${id}-native`}>Can your current software do this?</label><select id={`${id}-native`} value={answers.nativeSupport} required onChange={event => update('nativeSupport', event.target.value)} aria-describedby={`${id}-native-help`}><option value="" disabled>Choose an answer</option><option value="yes">Yes, it has a built-in option</option><option value="no">No, I have checked</option><option value="unknown">I’m not sure yet</option></select><p id={`${id}-native-help`} className={styles.hint}>A reminder, matching report, or shared status view may already cover the job.</p></div>
        <div className={styles.field}><label htmlFor={`${id}-reviewer`}>Is someone responsible for review?</label><select id={`${id}-reviewer`} value={answers.reviewOwner} required onChange={event => update('reviewOwner', event.target.value)} aria-describedby={`${id}-reviewer-help`}><option value="" disabled>Choose an answer</option><option value="yes">Yes, a person owns this</option><option value="no">Not yet</option></select><p id={`${id}-reviewer-help`} className={styles.hint}>The person who checks drafts and handles missing or conflicting information.</p></div>
        {error && <p className={styles.error} role="alert">{error}</p>}
        <button type="submit" className={styles.primaryButton}>Get my workflow plan <ArrowUpRight size={16} aria-hidden="true" /></button>
        <p className={styles.privacy}>Your estimates stay in this tab until you choose to send the brief. No customer records or account access needed.</p>
      </form>
      {plan ? <FitPlan key={plan.revision} plan={plan} /> : <aside className={styles.empty} aria-labelledby={`${id}-preview-title`}>
        <div className={styles.resultLabel}><FileText size={16} aria-hidden="true" /> Your workflow plan</div>
        <h3 id={`${id}-preview-title`}>A next step.<br />A brief to work from.</h3>
        <p>Your answers will help decide whether to configure an existing tool, clarify the process, or prepare one handoff for a scope review.</p>
        <ul><li><Check size={16} aria-hidden="true" /> A current-time baseline from your estimates</li><li><Check size={16} aria-hidden="true" /> A reason for the suggested next step</li><li><Check size={16} aria-hidden="true" /> A downloadable brief, with no signup</li></ul>
        <p className={styles.boundary}>This is a planning check. It does not verify your systems, predict savings, or establish implementation feasibility.</p>
      </aside>}
    </div>
  </section>
}
