/**
 * config.ts — Single source of truth for all site-wide constants.
 * Change here, updates everywhere. Never define these in individual page files.
 */

/** Free 15-minute AI Fit Audit (Calendly). Rename the event to match. */
export const CALENDLY_URL = 'https://calendly.com/nyclaw-io-proton/30min'

/** Display labels — keep Calendly event title in sync when you change duration. */
export const FREE_AUDIT_LABEL = 'Free 15-Min Fit Audit'
export const FREE_AUDIT_SHORT = '15-Min Fit Audit'

export const SITE = {
  name: 'NYClaw.io',
  tagline: 'AI Agency',
  oneLiner:
    'We design and build custom AI automations and agents for small businesses — not a one-size install of someone else\'s product.',
  region: 'Westchester County, NY & NYC',
} as const
