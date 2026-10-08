// classification: PUBLIC
/** Form context only. This caller-supplied label is never an auth or lead-quality signal. */
export const CONTACT_SOURCES = [
  'contact_form',
  'resource_form',
  'playbook_form',
  'unknown',
] as const

export type ContactSource = (typeof CONTACT_SOURCES)[number]
