// classification: PUBLIC
'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Check, ChevronRight, CircleHelp, Copy, Download, FileText, Minus, Terminal } from 'lucide-react'
import { analyzeWorkflow, prepareWorkflowDraft, workflowExamples, workflowMetadata, workflowRecipes, type WorkflowRecipe, type WorkflowResult } from '@/lib/workflow-kits'
import styles from './page.module.css'

type Scenario = 'ready' | 'uncertain' | 'no_action'
const scenarios: Scenario[] = ['ready', 'uncertain', 'no_action']
const scenarioLabels: Record<WorkflowRecipe, Record<Scenario, string>> = {
  'quote-followup': { ready: 'Open quote', uncertain: 'Unknown amount', no_action: 'Accepted quote' },
  'invoice-discrepancies': { ready: 'Different totals', uncertain: 'Currencies differ', no_action: 'Matching totals' },
  'order-handoff': { ready: 'Ready for handoff', uncertain: 'Unknown production', no_action: 'Already delivered' },
}
const scenarioIntros: Record<WorkflowRecipe, string> = {
  'quote-followup': 'An open quote has a follow-up interval. Check its status, dates, and amount before preparing a message.',
  'invoice-discrepancies': 'An invoice and an agreed total arrive together. Compare the amounts and currencies before suggesting a clarification.',
  'order-handoff': 'Payment, production, and shipment each have a status. Check that they agree before preparing the internal handoff.',
}
const nativeChecks: Record<WorkflowRecipe, string> = {
  'quote-followup': 'Check whether your CRM already supports quote reminders and a staff review queue.',
  'invoice-discrepancies': 'Check your accounting software for invoice matching and a report of differences before adding another tool.',
  'order-handoff': 'Check whether your order system already brings payment, production, and shipping status into one handoff.',
}
const fieldLabels: Record<string, string> = {
  input: 'Source record', asOf: 'Evaluation time', observedAt: 'Observation time', 'quote source': 'Quote record', 'invoice source': 'Invoice record', 'order source': 'Order record',
  quoteId: 'Quote reference', amountCents: 'Quote amount', status: 'Quote status', validUntil: 'Valid until', lastContactAt: 'Last contact', followupAfterDays: 'Follow-up interval',
  invoiceId: 'Invoice reference', expectedCents: 'Expected total', invoicedCents: 'Invoiced total', paidCents: 'Paid so far', currency: 'Record currency', expectedCurrency: 'Expected currency',
  orderId: 'Order reference', paymentStatus: 'Payment', productionStatus: 'Production', shipmentStatus: 'Shipment',
}
const snapshotFields: Record<WorkflowRecipe, string[]> = {
  'quote-followup': ['quoteId', 'amountCents', 'status', 'lastContactAt', 'followupAfterDays', 'validUntil'],
  'invoice-discrepancies': ['invoiceId', 'expectedCents', 'invoicedCents', 'paidCents', 'currency', 'expectedCurrency'],
  'order-handoff': ['orderId', 'paymentStatus', 'productionStatus', 'shipmentStatus'],
}
const stateLabels: Record<WorkflowResult['state'], string> = { ready: 'Ready for a draft', needs_review: 'Needs human review', no_action: 'No action suggested' }
const stateDescriptions: Record<WorkflowResult['state'], string> = {
  ready: 'The supplied facts pass these checks. A person still reviews the draft and decides what happens next.',
  needs_review: 'Clarify the source facts before proceeding. This example cannot produce a next-step draft.',
  no_action: 'These facts do not call for a next-step draft under this kit’s rules.',
}

function readableDate(value: unknown) {
  if (typeof value !== 'string' || !Number.isFinite(Date.parse(value))) return 'Unknown'
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', timeZone: 'UTC', timeZoneName: 'short' }).format(new Date(value))
}

function readableValue(key: string, value: unknown, input: Record<string, unknown>) {
  if (value === null || value === undefined) return 'Unknown'
  if (key.endsWith('Cents') && typeof value === 'number') {
    const currency = key === 'expectedCents' ? input.expectedCurrency : input.currency
    if (typeof currency === 'string' && /^[A-Z]{3}$/.test(currency)) {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency, currencyDisplay: 'code' }).format(value / 100)
    }
    return `${value} cents`
  }
  if (key === 'followupAfterDays') return `${value} days`
  if (key === 'lastContactAt' || key === 'validUntil') return readableDate(value)
  return String(value).replace(/_/g, ' ')
}

function readableSource(source: string) {
  return source.split(/\s*\/\s*/).map(field => fieldLabels[field] || field).join(' / ')
}

function readableFinding(detail: string, recipe: WorkflowRecipe, input: Record<string, unknown>) {
  if (recipe !== 'invoice-discrepancies' || typeof input.currency !== 'string' || !/^[A-Z]{3}$/.test(input.currency) || input.currency !== input.expectedCurrency) return detail
  const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: input.currency, currencyDisplay: 'code' })
  // Format only amounts already calculated by the core; retain exact text in the downloaded brief.
  return detail.replace(/(-?\d+) integer cents(?: in the supplied matching currency)?/g, (original, amount: string) => {
    const cents = Number(amount)
    return Number.isSafeInteger(cents) ? formatter.format(cents / 100) : original
  })
}

function TransferControls({ value, filename, label, json = false, copy = true }: { value: string; filename: string; label: string; json?: boolean; copy?: boolean }) {
  const [feedback, setFeedback] = useState('')
  const [failed, setFailed] = useState(false)
  const currentValue = useRef(value)
  useEffect(() => { currentValue.current = value; setFeedback(''); setFailed(false) }, [value])

  async function copyText() {
    const copiedValue = value
    try {
      if (!navigator.clipboard?.writeText) throw new Error('clipboard unavailable')
      await navigator.clipboard.writeText(copiedValue)
      if (currentValue.current === copiedValue) { setFailed(false); setFeedback(`${label} copied.`) }
    } catch {
      if (currentValue.current === copiedValue) { setFailed(true); setFeedback('Copy is unavailable. Select the visible text, or download it.') }
    }
  }

  function download() {
    let url: string | undefined
    try {
      url = URL.createObjectURL(new Blob([value], { type: json ? 'application/json;charset=utf-8' : 'text/plain;charset=utf-8' }))
      const anchor = document.createElement('a')
      anchor.href = url; anchor.download = filename
      document.body.appendChild(anchor); anchor.click(); anchor.remove()
      setFailed(false); setFeedback(`${label} download started.`)
      const downloadUrl = url
      setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000)
    } catch {
      if (url) URL.revokeObjectURL(url)
      setFailed(true); setFeedback('The download could not start. Your result is still visible; select and copy the text.')
    }
  }

  return <div className={styles.transfer}><div>{copy && <button type="button" className={styles.utilityButton} onClick={() => void copyText()}><Copy size={14} aria-hidden="true" /> Copy {label.toLowerCase()}</button>}<button type="button" className={styles.utilityButton} onClick={download}><Download size={14} aria-hidden="true" /> Download {label.toLowerCase()}</button></div><p className={failed ? styles.transferError : styles.transferStatus} role={failed ? 'alert' : 'status'}>{feedback}</p></div>
}

export default function WorkflowKits() {
  const [recipe, setRecipe] = useState<WorkflowRecipe>('quote-followup')
  const [scenario, setScenario] = useState<Scenario>('ready')
  const [draft, setDraft] = useState<string | null>(null)
  const [draftError, setDraftError] = useState('')
  const draftHeading = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    const selected = new URLSearchParams(window.location.search).get('kit')
    if (workflowRecipes.some(item => item === selected)) setRecipe(selected as WorkflowRecipe)
  }, [])
  const metadata = workflowMetadata[recipe]
  const input = workflowExamples[recipe]?.[scenario]
  const evaluated = useMemo(() => {
    try {
      if (!input || typeof input !== 'object') throw new Error('Example unavailable')
      const result = analyzeWorkflow(recipe, input)
      if (!result || !Object.prototype.hasOwnProperty.call(stateLabels, result.state) || !Array.isArray(result.findings)) throw new Error('Result unavailable')
      return { result, error: '' }
    } catch {
      return { result: null, error: 'This example could not be checked. No draft was prepared. Choose another example or reload the page to try again.' }
    }
  }, [recipe, input])
  const result = evaluated.result
  const command = `npx -y mainstreet-mcp@0.1.4 kit ${recipe}`
  const clientConfig = JSON.stringify({ mcpServers: { [`nyclaw-${recipe}`]: { command: 'npx', args: ['-y', 'mainstreet-mcp@0.1.4', 'kit', recipe] } } }, null, 2)
  const brief = result ? [
    `NYClaw — ${metadata.title}`, 'Fictional example; no connected records or external actions.',
    `Evaluation time supplied by example: ${result.asOf || 'Unknown'}`, `State: ${stateLabels[result.state]}`, '', result.summary,
    '', 'Findings', ...result.findings.map(finding => `${finding.label}: ${finding.detail}\nSource fields: ${finding.source}`),
    '', draft ? `Draft for human review only\n${draft}` : 'No draft has been prepared.',
    '', 'Source example', JSON.stringify(input, null, 2),
  ].join('\n') : ''

  useEffect(() => { if (draft) draftHeading.current?.focus() }, [draft])

  function selectRecipe(next: WorkflowRecipe) { setDraft(null); setDraftError(''); setScenario('ready'); setRecipe(next) }
  function selectScenario(next: Scenario) { setDraft(null); setDraftError(''); setScenario(next) }
  function prepare() {
    setDraft(null); setDraftError('')
    try {
      const prepared = prepareWorkflowDraft(recipe, input)
      if (prepared.state !== 'ready' || !prepared.draft) throw new Error('Draft unavailable')
      setDraft(prepared.draft)
    } catch { setDraftError('A draft could not be prepared from this example. Review the findings and choose an example again before continuing.') }
  }

  return <>
    <section id="try-workflow" className={styles.workbench} aria-labelledby="workbench-title">
      <div className={styles.workbenchIntro}><div><p className={styles.kicker}>Explore the example</p><h2 id="workbench-title">What should happen next?</h2></div><span className={styles.localBadge}><span aria-hidden="true" /> Runs in your browser</span></div>
      <div className={styles.recipeChooser} aria-label="Choose a workflow kit">{workflowRecipes.map((item, index) => <button key={item} type="button" aria-pressed={recipe === item} className={`${styles.recipeButton} ${recipe === item ? styles.recipeActive : ''}`} onClick={() => selectRecipe(item)}><span className={styles.recipeNumber} aria-hidden="true">0{index + 1}</span><span>{workflowMetadata[item].title}</span><ChevronRight size={16} aria-hidden="true" /></button>)}</div>
      <div className={styles.exampleGrid}>
        <div className={styles.sourcePanel}>
          <div className={styles.exampleHeading}><FileText size={18} aria-hidden="true" /><span>Fictional source record</span></div>
          <h3>{metadata.title}</h3><p className={styles.exampleIntro}>{scenarioIntros[recipe]}</p>
          <div className={styles.nativeCheck}><h4>Check your current tools first</h4><p>{nativeChecks[recipe]}</p></div>
          <fieldset className={styles.scenarios}><legend>Choose a situation</legend>{scenarios.map(item => <label key={item} className={`${styles.scenario} ${scenario === item ? styles.scenarioActive : ''}`}><input type="radio" name="workflow-scenario" value={item} checked={scenario === item} onChange={() => selectScenario(item)} /><span>{scenarioLabels[recipe][item]}</span></label>)}</fieldset>
          {input ? <>
            <dl className={styles.snapshot}>{snapshotFields[recipe].map(key => <div key={key}><dt>{fieldLabels[key] || key}</dt><dd className={input[key] === null || input[key] === 'unknown' ? styles.unknownValue : undefined}>{readableValue(key, input[key], input)}</dd></div>)}</dl>
            <div className={styles.snapshotTime}><p><span>Observed</span><time dateTime={String(input.observedAt)}>{readableDate(input.observedAt)}</time></p><p><span>Evaluated as of</span><time dateTime={String(input.asOf)}>{readableDate(input.asOf)}</time></p></div>
            <p className={styles.finePrint}>Dates belong to this fictional snapshot. They are not a live feed. The kit holds snapshots that are future-dated or more than seven days old.</p>
            <details className={styles.inputDetails} key={`${recipe}-${scenario}`}><summary>Inspect the exact source fields</summary><pre tabIndex={0} aria-label="Fictional input JSON">{JSON.stringify(input, null, 2)}</pre></details>
          </> : <p className={styles.error} role="alert">The source example is unavailable.</p>}
        </div>

        <div className={styles.resultPanel}>
          <div className={styles.resultTopline}><span>Computed result</span><span>Human review retained</span></div>
          {evaluated.error && <p className={styles.error} role="alert">{evaluated.error}</p>}
          {result && <>
            <div className={styles.resultHeading} aria-live="polite" aria-atomic="true"><span className={styles.resultIcon}>{result.state === 'ready' ? <Check size={21} aria-hidden="true" /> : result.state === 'needs_review' ? <CircleHelp size={21} aria-hidden="true" /> : <Minus size={21} aria-hidden="true" />}</span><h3>{stateLabels[result.state]}</h3><p>{result.summary}</p></div>
            <ol className={styles.findings} aria-label="Findings and source fields">{result.findings.map((finding, index) => <li key={`${finding.label}-${index}`}><h4>{finding.label}</h4><p>{readableFinding(finding.detail, recipe, input)}</p><span className={styles.findingSource}>From: {readableSource(finding.source)}<code>{finding.source}</code></span></li>)}</ol>
            <p className={styles.reviewBoundary}>{stateDescriptions[result.state]}</p>
            {result.state === 'ready' && !draft && <button type="button" className={styles.primaryLink} onClick={prepare}>Prepare draft preview <ChevronRight size={15} aria-hidden="true" /></button>}
            {draftError && <p className={styles.error} role="alert">{draftError}</p>}
            {result.state === 'ready' && draft && <div className={styles.draftPreview}><div className={styles.draftHeading}><FileText size={16} aria-hidden="true" /><h4 ref={draftHeading} tabIndex={-1}>Draft preview</h4><span>Not sent</span></div><pre>{draft}</pre><TransferControls key={`${recipe}-${scenario}-draft`} value={draft} filename={`${recipe}-fictional-draft.txt`} label="Draft" /></div>}
            <div className={styles.briefDownload}><TransferControls key={`${recipe}-${scenario}-brief`} value={brief} filename={`${recipe}-fictional-example.txt`} label="Example brief" copy={false} /><p>The brief includes the source example and findings. It does not submit a request to NYClaw.</p></div>
          </>}
          <div className={styles.recipeContact}><p>Want to check this against the tools you already use?</p><a href={`/ai-workflows?kit=${recipe}#workflow-fit`} className={styles.textLink}>Get a plan for this workflow <ArrowUpRight size={14} aria-hidden="true" /></a><br /><Link href={`/ai-workflows/${recipe}`} className={styles.subtleLink}>Read the workflow guide</Link></div>
        </div>
      </div>
    </section>

    <section id="install-kit" className={styles.install} aria-labelledby="install-title">
      <div className={styles.installIntro}><p className={styles.kicker}>Use the free kit</p><h2 id="install-title">Bring these checks<br />to your AI assistant.</h2><p>Install the selected kit in a client that supports local MCP servers. The tools check structured records supplied by your client and prepare drafts for review.</p><p className={styles.finePrint}>An MCP client controls what it shares with its model provider. Check that client’s data settings before supplying business information.</p><a href="https://github.com/gbrussich52/mainstreet-mcp" target="_blank" rel="noopener noreferrer" className={styles.textLink}>View the source and documentation <ArrowUpRight size={15} aria-hidden="true" /></a></div>
      <div className={styles.installDetails}>
        <div className={styles.installTitle}><Terminal size={18} aria-hidden="true" /><h3>{metadata.title}</h3><span>v0.1.4</span></div>
        <p>With Node.js and npm installed, this command starts the local MCP server:</p><pre className={styles.command} tabIndex={0} aria-label="Selected kit install command"><code>{command}</code></pre>
        <TransferControls key={`${recipe}-command`} value={command} filename={`${recipe}-install-command.txt`} label="Command" />
        <details className={styles.configDetails}><summary>Configuration for a compatible stdio client</summary><p>For regular use, merge this server entry into your client’s MCP configuration. Keep any existing entries. The client starts the kit and connects to it; running the command alone waits for that connection.</p><pre tabIndex={0} aria-label="MCP client configuration"><code>{clientConfig}</code></pre><TransferControls key={`${recipe}-config`} value={clientConfig} filename={`${recipe}-mcp-config.json`} label="Configuration" json /></details>
        <p className={styles.installBoundary}>Two narrow tools: analyze the supplied record and prepare a draft. The kit does not connect to business systems or send messages.</p>
      </div>
    </section>
  </>
}
