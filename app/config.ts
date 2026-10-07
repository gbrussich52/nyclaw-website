// classification: PUBLIC
/**
 * config.ts — Single source of truth for all site-wide constants.
 * Change here, updates everywhere. Never define these in individual page files.
 */

/** Existing free 30-minute Calendly event; labels describe the booking action. */
export const CALENDLY_URL = 'https://calendly.com/nyclaw-io-proton/30min'

/** Shared display labels; keep the duration consistent with the booking destination. */
export const FREE_AUDIT_LABEL = 'Book a free 30-minute call'
export const FREE_AUDIT_SHORT = 'Free 30-minute call'

export const SITE = {
  name: 'NYClaw.io',
  tagline: 'AI & automation for small businesses',
  oneLiner:
    'We help small teams connect inquiries, follow-up and repeat work with practical AI and automation.',
  region: 'Westchester County, NY & NYC',
} as const
