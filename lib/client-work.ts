// classification: PUBLIC
/**
 * Real client builds. Copy is approved and exact — company names must match
 * how each business writes its own, and no build may be described as free,
 * unpaid or a pilot. Do not paraphrase.
 */
export const work = [
  {
    badge: 'Electrical contractor',
    title: 'Estimating, billing and invoicing on one automated path',
    body: 'Andrew, electrician and owner of Valentine Family Electric, was moving every job from estimate to bill to invoice by hand. A Claude-driven process drafts the estimate, turns the approved job into a bill, and issues the invoice with no re-typing between steps.',
    footer: 'Valentine Family Electric · Westchester County, NY',
  },
  {
    badge: 'Building & stone supply',
    title: 'Claude configured to carry complex design work',
    body: 'Frank, owner of Byram Mason, Building & Stone Supply, needed AI that could hold a detailed client design job start to finish. His instructions, project files and skills were structured across Claude Fable, Opus and ChatGPT 5.6 Sol so context survives the whole build.',
    footer: 'Byram Mason, Building & Stone Supply · byrammason.com',
  },
]

export const workPaths = [
  { id: 'valentine-family-electric', href: '/services/ai-automation', label: 'Explore workflow builds' },
  { id: 'byram-mason', href: '/services/ai-automation', label: 'Explore AI assistant builds' },
] as const
