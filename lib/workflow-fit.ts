// classification: PUBLIC
import { z } from 'zod'
import { workflowMetadata, workflowRecipes } from './workflow-kits'

/** Visitor assumptions, not verified business facts or permission to act. */
export const fitSchema = z.object({
  recipe: z.enum(workflowRecipes),
  weeklyCases: z.number().int().min(0).max(10000),
  minutesPerCase: z.number().int().min(0).max(240),
  nativeSupport: z.enum(['yes', 'no', 'unknown']),
  reviewOwner: z.enum(['yes', 'no']),
}).strict()
export type FitInput = z.infer<typeof fitSchema>
export const fitRoutes = ['native_first', 'native_check', 'groundwork', 'manual_first', 'scoped_review'] as const
export type FitRoute = typeof fitRoutes[number]
export type FitResult = { route: FitRoute; title: string; reason: string; weeklyHours: number; steps: string[] }
const routes: Record<FitRoute, Omit<FitResult, 'route' | 'weeklyHours'>> = {
  native_first: { title: 'Start with your existing tools', reason: 'You said your current software can handle this job. Try its configuration before paying for a custom connection.', steps: ['Test the built-in workflow on a fictional record.', 'Assign a reviewer and verify failed, missing and repeated records.', 'Measure the remaining manual work before considering custom development.'] },
  native_check: { title: 'Check the built-in options first', reason: 'Native support is not established yet. A feature check is the next useful step.', steps: ['Check your current quoting, accounting or order software for this handoff.', 'Ask your vendor what the feature can actually do and what access it needs.', 'Record the specific gap that remains.'] },
  groundwork: { title: 'Name a reviewer before connecting tools', reason: 'No person owns the review yet. Choose who can approve drafts and handle exceptions before scoping automated work.', steps: ['Name one reviewer and a fallback.', 'Define when incomplete or conflicting records must stop.', 'Use fictional examples to confirm the approval path.'] },
  manual_first: { title: 'Measure a small manual baseline', reason: 'You entered no weekly cases or no time per case. Gather a baseline before investing in a custom workflow.', steps: ['Record how often this handoff happens.', 'Time several real cases without sharing customer details.', 'Check whether a simple checklist solves the job.'] },
  scoped_review: { title: 'Prepare one handoff for a scope review', reason: 'You reported repeated work, a named reviewer and a gap in your existing tools. These assumptions can support a fit conversation; they do not establish feasibility or savings.', steps: ['Identify the allowed source fields and access owner.', 'Choose acceptance cases for complete, missing, conflicting and repeated records.', 'Agree the scope, fee, fallback and maintenance separately before paid work.'] },
}
export function evaluateFit(value: unknown): FitResult {
  const input = fitSchema.parse(value)
  const route: FitRoute = input.nativeSupport === 'yes' ? 'native_first'
    : input.nativeSupport === 'unknown' ? 'native_check'
    : input.reviewOwner === 'no' ? 'groundwork'
    : input.weeklyCases === 0 || input.minutesPerCase === 0 ? 'manual_first' : 'scoped_review'
  return { route, ...routes[route], weeklyHours: Math.round(input.weeklyCases * input.minutesPerCase / 60 * 10) / 10 }
}
export function formatFitBrief(value: unknown): string {
  const input = fitSchema.parse(value), result = evaluateFit(input)
  return ['WORKFLOW FIT BRIEF — visitor assumptions, not verified facts',
    `Workflow: ${workflowMetadata[input.recipe].title}`, `Cases per week: ${input.weeklyCases}`,
    `Minutes per case: ${input.minutesPerCase}`, `Reported manual time: ${result.weeklyHours} hours/week (cases × minutes ÷ 60). This is a baseline, not estimated savings.`,
    `Existing software covers the job: ${input.nativeSupport}`, `Named review owner: ${input.reviewOwner}`,
    `Next step: ${result.title}`, result.reason, ...result.steps.map((s,i)=>`${i+1}. ${s}`),
    'No systems connected, messages sent, payment taken or implementation agreed by this fit check. Scope, fee, access and acceptance require separate agreement.'].join('\n')
}
