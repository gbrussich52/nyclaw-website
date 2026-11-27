// classification: PUBLIC
/**
 * Lead Leak Grader: pure scoring of one public homepage.
 *
 * Input is the HTML we already fetched and the final URL after redirects.
 * Output is a list of checks, each worth a fixed weight, and a 0 to 100 score.
 * No network, no DOM library: plain string and regex work, so it runs the
 * same in tests, in the API route and anywhere else.
 *
 * Each check asks one question: when a customer is ready to buy, can they
 * reach this business from the homepage, right now, the way they prefer?
 */

export type CheckId =
  | 'tap-to-call'
  | 'phone-visible'
  | 'contact-form'
  | 'text-option'
  | 'live-chat'
  | 'online-booking'
  | 'reply-promise'
  | 'after-hours'
  | 'https'
  | 'mobile-viewport'
  | 'local-schema'
  | 'reviews'

export interface LeakCheck {
  id: CheckId
  label: string
  passed: boolean
  weight: number
  /** What we saw, in a few words, when the check passed. */
  found?: string
  why: string
  fix: string
}

export interface GradeResult {
  url: string
  score: number
  passedCount: number
  total: number
  leaks: number
  band: 'tight' | 'some-leaks' | 'leaking'
  checks: LeakCheck[]
}

interface CheckSpec {
  id: CheckId
  label: string
  weight: number
  why: string
  fix: string
}

/** Weights add up to 100, so the score is the share of weight that passed. */
export const CHECK_SPECS: readonly CheckSpec[] = [
  {
    id: 'tap-to-call',
    label: 'Tap-to-call phone link',
    weight: 12,
    why: 'Most local searches happen on a phone. If the number is not a link, the customer has to copy it by hand, and many will not bother.',
    fix: 'Wrap your phone number in a tel: link, like <a href="tel:+19145550123">, in the header and footer.',
  },
  {
    id: 'phone-visible',
    label: 'Phone number you can see',
    weight: 8,
    why: 'Plenty of people still want to call. A number hidden on a contact page costs you the ones who give up after one click.',
    fix: 'Put your phone number in the top of the homepage, in plain text, not only inside a picture.',
  },
  {
    id: 'contact-form',
    label: 'Contact form on the homepage',
    weight: 10,
    why: 'Some customers will not call. A short form lets them reach you at 11 at night without picking up the phone.',
    fix: 'Add a short form (name, phone or email, what they need) to the homepage, and send every entry to a phone someone checks.',
  },
  {
    id: 'text-option',
    label: 'Text us option',
    weight: 8,
    why: 'Many customers would rather text than call, and a text is easy to answer between jobs.',
    fix: 'Add a "Text us" link (sms:) next to your phone number, using a number that can take texts.',
  },
  {
    id: 'live-chat',
    label: 'Live chat on the site',
    weight: 8,
    why: 'A chat box catches the visitor who has one quick question and would otherwise go back to the search results.',
    fix: 'Add a chat widget that sends every message to your phone, and set an auto-reply for when nobody is free.',
  },
  {
    id: 'online-booking',
    label: 'Online booking',
    weight: 10,
    why: 'A customer who can pick a time on their own is booked before they call the next business on the list.',
    fix: 'Add a booking link (Calendly, Square, Jobber, Housecall Pro or the tool you already use) to the homepage.',
  },
  {
    id: 'reply-promise',
    label: 'A stated reply time',
    weight: 8,
    why: 'People wait longer when they know when they will hear back. "We reply within one hour" keeps them from calling a competitor.',
    fix: 'Say how fast you answer, like "We reply within one business hour," right by the form or phone number. Then keep the promise.',
  },
  {
    id: 'after-hours',
    label: 'After-hours coverage mentioned',
    weight: 10,
    why: 'Leaks happen most at night and on weekends. If the site says nothing, customers assume nobody will answer until Monday.',
    fix: 'Cover nights and weekends with an answering service or a missed-call text-back, and say so on the homepage.',
  },
  {
    id: 'https',
    label: 'Secure site (HTTPS)',
    weight: 6,
    why: 'Browsers warn visitors about sites without HTTPS. A warning next to your contact form scares people off.',
    fix: 'Turn on the free SSL certificate your web host offers and send all traffic to the https:// address.',
  },
  {
    id: 'mobile-viewport',
    label: 'Built for phones',
    weight: 8,
    why: 'Without a mobile setting, phones show a tiny desktop page. Small buttons mean missed taps and lost calls.',
    fix: 'Add <meta name="viewport" content="width=device-width, initial-scale=1"> to the page head, or ask your web person to.',
  },
  {
    id: 'local-schema',
    label: 'Local business details for Google',
    weight: 6,
    why: 'LocalBusiness markup tells Google your phone, hours and address in a form it can trust, which helps you show up when people search nearby.',
    fix: 'Add LocalBusiness JSON-LD (or a type like Plumber or Dentist) with your name, phone, address and hours.',
  },
  {
    id: 'reviews',
    label: 'Reviews or testimonials shown',
    weight: 6,
    why: 'A ready buyer looks for proof before reaching out. No reviews on the page gives them a reason to keep shopping.',
    fix: 'Show three to five recent reviews on the homepage, with first names and the town, or embed your Google reviews.',
  },
]

// ---------------------------------------------------------------------------
// Text helpers
// ---------------------------------------------------------------------------

const ENTITIES: Record<string, string> = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', '#39': "'", ndash: '-', mdash: '-', rsquo: "'", lsquo: "'", hellip: '...',
}

function decodeEntities(text: string): string {
  return text
    .replace(/&#x([0-9a-f]{1,6});/gi, (_, hex: string) => safeCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d{1,7});/g, (_, dec: string) => safeCodePoint(Number(dec)))
    .replace(/&([a-z]+|#39);/gi, (match, name: string) => ENTITIES[name.toLowerCase()] ?? match)
}

function safeCodePoint(code: number): string {
  return Number.isInteger(code) && code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : ' '
}

/** Visible text: scripts, styles, comments and tags removed, entities decoded. */
export function visibleText(html: string): string {
  const withoutBlocks = html
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<script\b[\s\S]*?<\/script\s*>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style\s*>/gi, ' ')
    .replace(/<template\b[\s\S]*?<\/template\s*>/gi, ' ')
  return decodeEntities(withoutBlocks.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim()
}

function attrValue(tag: string, name: string): string | null {
  const match = tag.match(new RegExp(`\\s${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s"'>]+))`, 'i'))
  if (!match) return null
  return decodeEntities(match[1] ?? match[2] ?? match[3] ?? '')
}

function hrefs(html: string): string[] {
  const out: string[] = []
  for (const tag of html.match(/<a\b[^>]*>/gi) ?? []) {
    const href = attrValue(tag, 'href')
    if (href !== null) out.push(href.trim())
  }
  return out
}

function firstSignature(haystack: string, signatures: readonly (readonly [string, string])[]): string | undefined {
  for (const [needle, name] of signatures) if (haystack.includes(needle)) return name
  return undefined
}

// ---------------------------------------------------------------------------
// Signatures
// ---------------------------------------------------------------------------

/** [substring in the lowercased HTML, name shown to the owner] */
export const CHAT_SIGNATURES = [
  ['widget.intercom.io', 'Intercom'], ['js.intercomcdn.com', 'Intercom'], ['intercomsettings', 'Intercom'],
  ['js.driftt.com', 'Drift'], ['js.drift.com', 'Drift'],
  ['code.tidio.co', 'Tidio'],
  ['cdn.livechatinc.com', 'LiveChat'],
  ['embed.tawk.to', 'tawk.to'],
  ['connect.podium.com', 'Podium'], ['podium-website-widget', 'Podium'],
  ['birdeye.com/embed', 'Birdeye'], ['birdeye-webchat', 'Birdeye'],
  ['js.usemessages.com', 'HubSpot chat'], ['hubspot-messages-iframe', 'HubSpot chat'],
  ['client.crisp.chat', 'Crisp'],
  ['static.zdassets.com/ekr/snippet', 'Zendesk'], ['ze-snippet', 'Zendesk'], ['zopim', 'Zendesk'],
  ['static.olark.com', 'Olark'],
  ['wchat.freshchat.com', 'Freshchat'],
  ['client.smartsupp.chat', 'Smartsupp'],
  ['call.chatra.io', 'Chatra'],
  ['config.gorgias.chat', 'Gorgias'],
] as const

export const BOOKING_SIGNATURES = [
  ['calendly.com/', 'Calendly'],
  ['acuityscheduling.com', 'Acuity'], ['.as.me/', 'Acuity'],
  ['squareup.com/appointments', 'Square Appointments'], ['square.site/book', 'Square Appointments'],
  ['book.housecallpro.com', 'Housecall Pro'], ['housecallpro.com/book', 'Housecall Pro'], ['online-booking.housecallpro.com', 'Housecall Pro'],
  ['clienthub.getjobber.com', 'Jobber'], ['getjobber.com/booking', 'Jobber'],
  ['scheduler.servicetitan.com', 'ServiceTitan'], ['static.servicetitan.com/webscheduler', 'ServiceTitan'],
  ['vagaro.com/', 'Vagaro'],
  ['mindbodyonline.com', 'Mindbody'], ['mindbody.io', 'Mindbody'],
  ['booksy.com/', 'Booksy'],
  ['opentable.com', 'OpenTable'],
  ['resy.com', 'Resy'],
  ['setmore.com', 'Setmore'],
  ['simplybook.me', 'SimplyBook'], ['simplybook.it', 'SimplyBook'],
] as const

const FORM_EMBED_SIGNATURES = [
  ['js.hsforms.net', 'HubSpot form'], ['hbspt.forms.create', 'HubSpot form'],
  ['embed.typeform.com', 'Typeform'], ['form.jotform.com', 'Jotform'], ['wufoo.com/embed', 'Wufoo'],
  ['docs.google.com/forms', 'Google Form'], ['forms.office.com', 'Microsoft Form'],
  ['tally.so/embed', 'Tally'], ['formstack.com/forms', 'Formstack'], ['cognitoforms.com', 'Cognito Forms'],
] as const

const REVIEW_SIGNATURES = [
  ['elfsight.com', 'review widget'], ['trustindex.io', 'review widget'], ['embedsocial.com', 'review widget'],
  ['widget.trustpilot.com', 'Trustpilot'], ['reviews.io', 'Reviews.io'], ['birdeye.com/widget', 'Birdeye reviews'],
] as const

/** LocalBusiness and the schema.org subtypes small businesses use most. */
const LOCAL_TYPES = new Set([
  'localbusiness', 'professionalservice', 'homeandconstructionbusiness', 'electrician', 'generalcontractor',
  'hvacbusiness', 'housepainter', 'locksmith', 'movingcompany', 'plumber', 'roofingcontractor',
  'automotivebusiness', 'autorepair', 'autodealer', 'autobodyshop', 'autowash', 'autopartsstore', 'motorcycledealer',
  'medicalbusiness', 'dentist', 'physician', 'medicalclinic', 'optician', 'pharmacy', 'veterinarycare',
  'healthandbeautybusiness', 'beautysalon', 'hairsalon', 'dayspa', 'nailsalon', 'tattooparlor', 'healthclub',
  'foodestablishment', 'restaurant', 'bakery', 'cafeorcoffeeshop', 'barorpub', 'fastfoodrestaurant', 'icecreamshop', 'winery', 'brewery',
  'legalservice', 'attorney', 'notary', 'financialservice', 'accountingservice', 'insuranceagency', 'bankorcreditunion',
  'realestateagent', 'childcare', 'drycleaningorlaundry', 'emergencyservice', 'employmentagency', 'entertainmentbusiness',
  'lodgingbusiness', 'hotel', 'motel', 'bedandbreakfast', 'selfstorage', 'sportsactivitylocation', 'exercisegym',
  'travelagency', 'animalshelter', 'store', 'recyclingcenter',
])

function isLocalType(type: string): boolean {
  const t = type.replace(/^https?:\/\/schema\.org\//i, '').toLowerCase()
  return LOCAL_TYPES.has(t) || (t.endsWith('store') && t.length > 5)
}

function findLocalSchema(html: string): string | undefined {
  const blocks = html.match(/<script\b[^>]*type\s*=\s*["']?application\/ld\+json["']?[^>]*>[\s\S]*?<\/script\s*>/gi) ?? []
  for (const block of blocks) {
    const body = block.replace(/^<script\b[^>]*>/i, '').replace(/<\/script\s*>$/i, '').trim()
    let data: unknown
    try {
      data = JSON.parse(body)
    } catch {
      const loose = body.match(/"@type"\s*:\s*"([A-Za-z]+)"/g) ?? []
      for (const m of loose) {
        const type = m.replace(/.*"([A-Za-z]+)"$/, '$1')
        if (isLocalType(type)) return type
      }
      continue
    }
    const found = walkForLocalType(data, 0)
    if (found) return found
  }
  return undefined
}

function walkForLocalType(node: unknown, depth: number): string | undefined {
  if (depth > 8 || node === null || typeof node !== 'object') return undefined
  if (Array.isArray(node)) {
    for (const item of node) {
      const found = walkForLocalType(item, depth + 1)
      if (found) return found
    }
    return undefined
  }
  const record = node as Record<string, unknown>
  const type = record['@type']
  const types = Array.isArray(type) ? type : [type]
  for (const t of types) if (typeof t === 'string' && isLocalType(t)) return t
  for (const value of Object.values(record)) {
    const found = walkForLocalType(value, depth + 1)
    if (found) return found
  }
  return undefined
}

// ---------------------------------------------------------------------------
// Individual detectors (exported for tests)
// ---------------------------------------------------------------------------

const PHONE_IN_TEXT = /(?:^|[^\d])(?:\+?1[\s.-]?)?\(?[2-9]\d{2}\)?[\s.-]?[2-9]\d{2}[\s.-]?\d{4}(?!\d)/

export function detectTapToCall(html: string): string | undefined {
  const tel = hrefs(html).find((h) => /^tel:/i.test(h) && (h.replace(/%2b/gi, '+').match(/\d/g)?.length ?? 0) >= 7)
  return tel ? 'tel: link' : undefined
}

export function detectPhoneVisible(text: string): string | undefined {
  const match = text.match(PHONE_IN_TEXT)
  return match ? match[0].replace(/^[^\d(+]/, '').trim() : undefined
}

export function detectContactForm(html: string): string | undefined {
  for (const form of html.match(/<form\b[\s\S]*?<\/form\s*>/gi) ?? []) {
    const lower = form.toLowerCase()
    const hasTextarea = lower.includes('<textarea')
    const hasTel = /type\s*=\s*["']?tel\b/.test(lower)
    const hasEmail = /type\s*=\s*["']?email\b/.test(lower) || /name\s*=\s*["']?[^"'\s>]*e-?mail/.test(lower)
    const hasContactField = /name\s*=\s*["']?[^"'\s>]*(?:phone|message|comment|inquiry|enquiry|details)/.test(lower)
    const hasNameField = /\sname\s*=\s*["']?[^"'\s>]*name\b/.test(lower)
    if (hasTextarea || hasTel || hasContactField || (hasEmail && hasNameField)) return 'form on the page'
  }
  return firstSignature(html.toLowerCase(), FORM_EMBED_SIGNATURES)
}

export function detectTextOption(html: string, text: string): string | undefined {
  if (hrefs(html).some((h) => /^sms:/i.test(h))) return 'sms: link'
  const phrase = text.match(/\b(?:text us|text me|send us a text|text or call|call or text|txt us|text message us)\b/i)
  return phrase ? `"${phrase[0]}"` : undefined
}

export function detectLiveChat(html: string): string | undefined {
  return firstSignature(html.toLowerCase(), CHAT_SIGNATURES)
}

export function detectBooking(html: string): string | undefined {
  const tool = firstSignature(html.toLowerCase(), BOOKING_SIGNATURES)
  if (tool) return tool
  for (const anchor of html.match(/<a\b[^>]*>[\s\S]{0,200}?<\/a\s*>/gi) ?? []) {
    const label = visibleText(anchor)
    if (/^(?:book online|book now|schedule online|book an appointment|schedule an appointment|book a table|reserve a table|schedule service online|request an appointment)\b/i.test(label)) {
      return `"${label.slice(0, 40)}" link`
    }
  }
  return undefined
}

const REPLY_PROMISE = [
  /\b(?:respond|reply|replies|response|get back to you|call you back|call back|callback|return (?:your |all )?calls?|hear (?:back )?from us)\b[^.!?]{0,60}?\b(?:within|in under|same[- ]day|same business day|today|minutes|one hour|1 hour|an hour)\b/i,
  /\bwithin (?:\d{1,2}|one|two|an?) (?:minutes?|mins?|hours?|hrs?|business hours?)\b/i,
  /\bsame[- ]day (?:response|reply|replies|callback|call ?backs?)\b/i,
]

export function detectReplyPromise(text: string): string | undefined {
  for (const pattern of REPLY_PROMISE) {
    const match = text.match(pattern)
    if (match) return `"${match[0].slice(0, 60)}"`
  }
  return undefined
}

const AFTER_HOURS = /\b24\s?\/\s?7\b|\b24\s?x\s?7\b|\b24 hours a day\b|\b24[- ]hour (?:service|emergency|emergencies|answering|support|line|response)\b|\bafter[- ]hours\b|\b(?:evenings?|nights?) (?:and|&) weekends?\b|\bweekends? (?:and|&) (?:evenings?|nights?|holidays?)\b|\bemergency (?:service|calls?|line)\b|\bopen 24 hours\b|\balways open\b|\banswering service\b|\bday or night\b/i

export function detectAfterHours(text: string): string | undefined {
  const match = text.match(AFTER_HOURS)
  return match ? `"${match[0]}"` : undefined
}

export function detectViewport(html: string): string | undefined {
  for (const tag of html.match(/<meta\b[^>]*>/gi) ?? []) {
    if ((attrValue(tag, 'name') ?? '').toLowerCase() !== 'viewport') continue
    const content = (attrValue(tag, 'content') ?? '').toLowerCase()
    if (/width\s*=\s*device-width/.test(content)) return 'viewport tag'
  }
  return undefined
}

const REVIEW_TEXT = /\btestimonials?\b|\b(?:customer|client|patient|google|yelp|our|real|recent|verified) reviews?\b|\breviews? from\b|\bwhat (?:our )?(?:customers|clients|patients|people|homeowners|neighbors) (?:say|are saying)\b|\b(?:5|five)[- ]star\b|\u2605{3,}/i

export function detectReviews(html: string, text: string): string | undefined {
  const phrase = text.match(REVIEW_TEXT)
  if (phrase) return `"${phrase[0]}"`
  if (/"@type"\s*:\s*"(?:AggregateRating|Review)"/.test(html)) return 'review markup'
  return firstSignature(html.toLowerCase(), REVIEW_SIGNATURES)
}

// ---------------------------------------------------------------------------
// Grade
// ---------------------------------------------------------------------------

export function bandFor(score: number): GradeResult['band'] {
  if (score >= 80) return 'tight'
  if (score >= 50) return 'some-leaks'
  return 'leaking'
}

export function gradeHomepage(html: string, finalUrl: string): GradeResult {
  const text = visibleText(html)
  let protocol = ''
  try { protocol = new URL(finalUrl).protocol } catch { /* graded as not secure */ }

  const found: Record<CheckId, string | undefined> = {
    'tap-to-call': detectTapToCall(html),
    'phone-visible': detectPhoneVisible(text),
    'contact-form': detectContactForm(html),
    'text-option': detectTextOption(html, text),
    'live-chat': detectLiveChat(html),
    'online-booking': detectBooking(html),
    'reply-promise': detectReplyPromise(text),
    'after-hours': detectAfterHours(text),
    https: protocol === 'https:' ? 'https://' : undefined,
    'mobile-viewport': detectViewport(html),
    'local-schema': findLocalSchema(html),
    reviews: detectReviews(html, text),
  }

  const checks: LeakCheck[] = CHECK_SPECS.map((spec) => {
    const what = found[spec.id]
    return { ...spec, passed: what !== undefined, ...(what !== undefined ? { found: what } : {}) }
  })
  const score = checks.reduce((sum, c) => sum + (c.passed ? c.weight : 0), 0)
  const passedCount = checks.filter((c) => c.passed).length

  return {
    url: finalUrl,
    score,
    passedCount,
    total: checks.length,
    leaks: checks.length - passedCount,
    band: bandFor(score),
    checks,
  }
}
