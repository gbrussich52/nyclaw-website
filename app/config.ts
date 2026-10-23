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
  tagline: 'AI help for small businesses',
  oneLiner:
    'We set up AI that handles the busywork in a small business: first replies to new inquiries, estimate and invoice drafts, and details that move between tools.',
  region: 'Westchester County, NY & NYC',
  /**
   * Brand lockup. If the business moves to a broader alias, change these three
   * values and the header and footer follow. Page metadata still names the
   * current domain and is a separate, SEO-reviewed change.
   */
  wordmark: { mark: 'NY', name: 'NYClaw', suffix: '.io' },
} as const

/** Founder facts shown on the homepage and About page. Public sources only. */
export const FOUNDER = {
  name: 'Giani Brussich',
  firstName: 'Giani',
  linkedin: 'https://linkedin.com/in/gianib',
  github: 'https://github.com/gbrussich52',
  site: 'https://gianibrussich.com',
  email: 'hello@nyclaw.io',
} as const
