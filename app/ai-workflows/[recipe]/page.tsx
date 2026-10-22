// classification: PUBLIC
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowUpRight } from 'lucide-react'
import { analyzeWorkflow, workflowExamples, workflowRecipes, workflowCurrencies, type WorkflowRecipe } from '@/lib/workflow-kits'
import { workflowPages } from '@/lib/workflow-pages'
import styles from '../page.module.css'
import detail from './page.module.css'

type Props = { params: Promise<{ recipe: string }> }
function resolveRecipe(value: string): WorkflowRecipe {
  if (!(workflowRecipes as readonly string[]).includes(value)) notFound()
  return value as WorkflowRecipe
}
export const dynamicParams = false
export function generateStaticParams() { return workflowRecipes.map(recipe => ({ recipe })) }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const recipe = resolveRecipe((await params).recipe)
  const page = workflowPages[recipe]
  const url = `https://nyclaw.io/ai-workflows/${recipe}`
  const title = recipe === 'order-handoff' ? 'Check Payment, Production & Shipment Handoffs' : page.title
  const description = {
    'quote-followup': 'Review open quotes, timing and expiry before preparing an unsent follow-up. Try a fictional example and check whether your CRM covers the job.',
    'invoice-discrepancies': 'Compare expected, invoiced and paid totals in matching currencies. Try a fictional invoice check and an internal draft for human review.',
    'order-handoff': 'Check payment, production and shipment status for one order. Try a fictional handoff with review holds for unknown or conflicting facts.',
  }[recipe]
  return {
    title, description, alternates: { canonical: url },
    openGraph: { title, description, url, type: 'website', siteName: 'NYClaw.io', images: ['https://nyclaw.io/opengraph-image'] },
    twitter: { card: 'summary_large_image', title, description, images: ['https://nyclaw.io/opengraph-image'] },
  }
}
export default async function WorkflowPage({ params }: Props) {
  const recipe = resolveRecipe((await params).recipe)
  const page = workflowPages[recipe]
  const fitUrl = `/ai-workflows?kit=${recipe}#workflow-fit`
  return <div className={styles.page}>
    <header className={styles.hero}>
      <Link href="/ai-workflows" className={styles.textLink}>All workflow kits</Link>
      <p className={`${styles.eyebrow} ${detail.audience}`}>{page.audience}</p>
      <h1>{page.title}</h1>
      <p className={styles.lede}>{page.introduction}</p>
      <div className={styles.heroActions}><Link href={`/ai-workflows?kit=${recipe}#try-workflow`} className={styles.primaryLink}>Try the fictional example <ArrowUpRight size={16} aria-hidden="true" /></Link><a href="#free-kit" className={styles.textLink}>Get the free kit</a></div>
      <p className={styles.heroNote}>Free, stateless starter kit. Real connections and actions require a separately agreed implementation.</p>
    </header>
    <section className={detail.section} aria-labelledby="trigger"><p className={styles.kicker}>The job</p><h2 id="trigger">When this check is useful</h2><p>{page.trigger}</p></section>
    <section className={detail.section} aria-labelledby="inputs"><h2 id="inputs">Start with these source facts</h2><dl className={detail.fields}>{page.inputs.map(input => <div key={input.fields}><dt><code>{input.fields}</code></dt><dd>{input.purpose}</dd></div>)}</dl>{recipe !== 'order-handoff' && <p className={styles.finePrint}>Supported currencies: {workflowCurrencies.join(', ')}. Amounts are integer cents; no exchange-rate conversion is performed.</p>}</section>
    <section className={detail.section} aria-labelledby="examples"><p className={styles.kicker}>Computed examples</p><h2 id="examples">See what passes and what needs review</h2><p>These are fictional records evaluated at their stated <code>asOf</code> time, not live business data. Results below come from the same rules as the free kit. A ready state permits preparing an unsent draft; it does not authorize an action.</p>
      <div className={detail.examples}>{(['ready', 'uncertain'] as const).map(scenario => {
        const input = workflowExamples[recipe][scenario]
        const result = analyzeWorkflow(recipe, input)
        return <article key={scenario} className={detail.example}>
          <h3>{scenario === 'ready' ? 'Known source facts' : 'A source needs review'}</h3>
          <p className={detail.state}>Result: <strong>{result.state}</strong></p><p>{result.summary}</p>
          <dl className={detail.findings}>{result.findings.map((finding, index) => <div key={index}><dt>{finding.label}</dt><dd>{finding.detail}<small>Source: {finding.source}</small></dd></div>)}</dl>
          <p className={styles.finePrint}>Evaluated at {result.asOf}. Simulation: true. No draft requested; nothing sent or saved.</p>
          <details className={styles.inputDetails}><summary>Inspect the fictional source record</summary><pre tabIndex={0} aria-label={`${scenario} fictional source record`}>{JSON.stringify(input, null, 2)}</pre></details>
        </article>
      })}</div>
    </section>
    <div className={detail.columns}>
      <section className={detail.section} aria-labelledby="holds"><h2 id="holds">Where the workflow stops</h2><ul>{page.failures.map(item => <li key={item}>{item}</li>)}</ul></section>
      <section className={detail.section} aria-labelledby="acceptance"><h2 id="acceptance">What a useful result must do</h2><ul>{page.acceptance.map(item => <li key={item}>{item}</li>)}</ul></section>
    </div>
    <section className={detail.section} aria-labelledby="native"><p className={styles.kicker}>Check what you already have</p><h2 id="native">Your existing tool may cover this</h2><ul>{page.nativeChecks.map(item => <li key={item}>{item}</li>)}</ul><p>{page.scope}</p></section>
    <section id="free-kit" className={detail.section} aria-labelledby="install"><h2 id="install">Run the free kit yourself</h2><p>Use an AI client that supports local MCP tools and Node.js 20 or later. This pinned command starts the {recipe} kit over standard input/output:</p><pre className={styles.command} tabIndex={0} aria-label="Kit installation command"><code>{`npx -y mainstreet-mcp@0.1.4 kit ${recipe}`}</code></pre><p>The two tools analyze a supplied record and prepare an unsent draft. The kit makes no provider calls and does not persist the input. Review your chosen AI client’s data handling before supplying business records; that client may require its own subscription or model charges.</p><Link href={`/ai-workflows?kit=${recipe}#install-kit`} className={styles.textLink}>See MCP client setup <ArrowUpRight size={15} aria-hidden="true" /></Link></section>
    <section className={detail.section} aria-labelledby="service"><p className={styles.kicker}>A separate implementation</p><h2 id="service">Check fit before connecting your systems</h2><p>Start with the workflow, current tools and the person who reviews exceptions. We agree the scope and fee in writing before paid work. Connections, sending, record updates, ongoing monitoring and maintenance are outside the free kit and must be scoped explicitly.</p><Link href={fitUrl} className={styles.primaryLink}>Check this workflow’s fit <ArrowUpRight size={16} aria-hidden="true" /></Link></section>
    <aside className={detail.legal}><p>For law-firm intake or missing-document work, use the dedicated administrative workflow path.</p><Link href="/law-firm-workflows#request-blueprint" className={styles.textLink}>Request a law-firm Workflow Blueprint</Link></aside>
  </div>
}
