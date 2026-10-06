import type { Metadata } from 'next'
import { Workflow } from 'lucide-react'
import ServiceHero from '../components/ServiceHero'
import DeliverablesChecklist from '../components/DeliverablesChecklist'
import CtaPanel from '../components/CtaPanel'
import { CALENDLY_URL } from '../config'

export const metadata: Metadata = {
  title: 'Law Firm Workflow Assessment | NYClaw',
  description: 'For law-firm owners and operations leads: assess one intake, document follow-up, or invoice preparation workflow. Start with a free fit call.',
  alternates: { canonical: 'https://nyclaw.io/law-firm-workflows' },
  openGraph: { title: 'A clearer handoff for your law firm | NYClaw', description: 'Define one workflow, the expected output, and who approves it before choosing an automation.', url: 'https://nyclaw.io/law-firm-workflows', type: 'website' },
}

const attribution = 'utm_source=nyclaw&utm_medium=referral&utm_campaign=law_firm_workflows'
const booking = new URL(CALENDLY_URL)
new URLSearchParams(attribution).forEach((value, key) => booking.searchParams.set(key, value))
const planner = `https://legalaimcp.com/workflow-plan?${attribution}`
const documentCheck = `https://legalaimcp.com/document-check?${attribution}`

const workflows = [
  ['Intake handoff', 'Turn a completed questionnaire into a staff review checklist: what arrived, what is missing, and who takes the next step. Your team retains conflict checks and case acceptance.'],
  ['Missing-document follow-up', 'Compare received items with your agreed checklist. Prepare a missing-item summary and a draft reminder for review; stop when a response, exception, or uncertainty needs a person.'],
  ['Invoice preparation', 'Organize approved time and expense records into a draft billing packet. Flag missing entries and discrepancies for your billing reviewer before any invoice is issued.'],
]

export default function LawFirmWorkflows() {
  return (
    <>
      <ServiceHero badge="For law-firm owners & operations leads" BadgeIcon={Workflow}
        titleTop="Make the next handoff clear." titleAccent="Start with one workflow."
        lede="Intake, missing documents, or invoice preparation."
        blurb="Bring one recurring administrative problem. We assess the tools you already use, define a reviewable output, and recommend the simplest workable next step."
        primary={{ label: 'Book a free fit call', href: booking.toString() }}
        secondary={{ label: 'Explore the workflow planner', href: planner }} />

      <section className="px-6 pb-24" aria-labelledby="workflow-options">
        <div className="mx-auto max-w-[64rem]">
          <h2 id="workflow-options" className="text-3xl font-medium tracking-tight text-white">Where does work get stuck?</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {workflows.map(([title, description]) => <article key={title} className="panel rounded-2xl p-7">
              <h3 className="text-xl font-medium text-white">{title}</h3>
              <p className="mt-4 text-base leading-relaxed text-zinc-300">{description}</p>
            </article>)}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24" aria-labelledby="example-output">
        <div className="panel mx-auto max-w-[56rem] rounded-2xl p-7 sm:p-10">
          <p className="text-sm font-medium text-cyan-400">Fictional example · proposed output, not a client result</p>
          <h2 id="example-output" className="mt-4 text-3xl font-medium tracking-tight text-white">A missing-document review packet</h2>
          <p className="mt-5 leading-relaxed text-zinc-300">For fictional matter DEMO-104, the staff checklist requests a completed intake questionnaire and a signed engagement letter. The supplied sample document list identifies the questionnaire only. This example compares metadata; it does not read document contents.</p>
          <dl className="mt-6 space-y-4 text-sm leading-relaxed">
            <div><dt className="font-medium text-white">Expected finding</dt><dd className="mt-1 text-zinc-300">Signed engagement letter not identified in the supplied sample document list. Confirm with staff before treating it as missing.</dd></div>
            <div><dt className="font-medium text-white">Draft follow-up</dt><dd className="mt-1 text-zinc-300">“Our checklist still shows the signed engagement letter as outstanding. If you have already sent it, please tell our team where to find it.”</dd></div>
            <div><dt className="font-medium text-white">Human decision</dt><dd className="mt-1 text-zinc-300">The intake coordinator checks the record, confirms the recipient and approves or discards the draft. Nothing is sent by this example.</dd></div>
            <div><dt className="font-medium text-white">Acceptance check</dt><dd className="mt-1 text-zinc-300">When the signed letter appears in the fictional input, the output must remove it from the missing-item list. Ambiguous files must be referred to staff.</dd></div>
          </dl>
          <a href={documentCheck} className="mt-7 inline-block text-sm font-medium text-cyan-400 underline underline-offset-4">Try a fictional example in LegalAIMCP’s document check →</a>
        </div>
      </section>

      <DeliverablesChecklist title="A scoped assessment you can act on"
        blurb="The free fit call establishes whether one workflow is worth assessing. If it is, we agree the assessment fee, scope and delivery terms in writing before paid work starts."
        items={[
          'A map of one workflow: inputs, steps, owner, handoff and expected output.',
          'A feasibility check of native software features and available integrations before proposing custom code.',
          'Ten fictional acceptance cases, including missing data, duplicates and exceptions.',
          'A permissions, human-review and fallback plan, with unresolved access requirements named.',
          'A written recommendation: configure what you have, buy a tool, build a small integration, or keep the task manual.',
          'A separate implementation scope if the recommendation warrants further work.',
        ]}
        note="An assessment can recommend no automation. Implementation, ongoing support and monitoring are separate agreements. This is operational assessment, not legal advice or a compliance certification." />

      <CtaPanel title="Bring the last handoff that went wrong."
        blurb="Tell us the workflow, the systems involved, and who reviews the result. Describe the problem without sending client files, personal information or credentials."
        primary={{ label: 'Book a free fit call', href: booking.toString(), external: true }}
        secondary={{ label: 'Draft a fictional workflow plan', href: planner, external: true }}
        footer={<>NYClaw operates LegalAIMCP, the directory and tools linked here. A planner or demo result is a starting point for discussion, not an active service.</>} />
    </>
  )
}
