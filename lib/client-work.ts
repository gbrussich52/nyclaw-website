// classification: PUBLIC
/**
 * Two friends Giani advised by phone. He did not build or install anything on
 * their systems, so copy says advice, never a build or delivered system.
 * Company names must match how each business writes its own. Do not describe
 * the help as free, unpaid or a pilot, and do not paraphrase.
 */
export const work = [
  {
    badge: 'Electrical contractor',
    title: 'Advice on putting estimating, billing and invoicing on one path',
    body: 'Andrew, electrician and owner of Valentine Family Electric, was moving every job from estimate to bill to invoice by hand. Over the phone, Giani walked Andrew through how Claude could draft the estimate, turn an approved job into a bill and issue the invoice without typing anything twice.',
    footer: 'Valentine Family Electric · Westchester County, NY',
  },
  {
    badge: 'Building & stone supply',
    title: 'Advice on setting up AI for complex design work',
    body: 'Frank, owner of Byram Mason, Building & Stone Supply, wanted AI that could hold a detailed client design job from start to finish. Over the phone, Giani showed Frank how to organize instructions, project files and skills in Claude and ChatGPT so the details hold up through the whole job.',
    footer: 'Byram Mason, Building & Stone Supply · byrammason.com',
  },
]

export const workPaths = [
  { id: 'valentine-family-electric', href: '/services/ai-automation', label: 'Explore workflow builds' },
  { id: 'byram-mason', href: '/services/ai-automation', label: 'Explore AI assistant builds' },
] as const
