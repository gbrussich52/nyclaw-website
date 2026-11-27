// classification: PRIVATE
import { describe, expect, it } from 'vitest'
import {
  CHECK_SPECS,
  bandFor,
  detectAfterHours,
  detectBooking,
  detectContactForm,
  detectLiveChat,
  detectPhoneVisible,
  detectReplyPromise,
  detectReviews,
  detectTapToCall,
  detectTextOption,
  detectViewport,
  gradeHomepage,
  visibleText,
  type CheckId,
} from '../lead-leak/grade'

// Fictional businesses and 555 numbers only.
const FULL = `<!doctype html><html><head>
<meta charset="utf-8"><meta content="width=device-width, initial-scale=1" name="viewport">
<script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"WebSite","name":"Fictional"},{"@type":["Plumber"],"name":"Fictional Plumbing","telephone":"+1-914-555-0142"}]}</script>
<script src="https://embed.tawk.to/abc/default" async></script>
</head><body>
<header><a href="tel:+19145550142">(914) 555-0142</a> <a href="sms:+19145550142">Text us</a></header>
<h1>Fictional Plumbing</h1>
<p>We reply within 1 hour, 7 days a week. 24/7 emergency service.</p>
<a href="https://calendly.com/fictional-plumbing/visit">Pick a time</a>
<form action="/contact" method="post"><input name="name"><input type="email" name="email"><textarea name="message"></textarea><button>Send</button></form>
<section><h2>What our customers say</h2><p>Great job. Pat, Ossining</p></section>
</body></html>`

const BARE = '<html><head><title>Under construction</title></head><body><p>Welcome to our site.</p></body></html>'

describe('gradeHomepage', () => {
  it('weights add up to 100 across 12 checks', () => {
    expect(CHECK_SPECS).toHaveLength(12)
    expect(CHECK_SPECS.reduce((sum, c) => sum + c.weight, 0)).toBe(100)
    expect(new Set(CHECK_SPECS.map((c) => c.id)).size).toBe(12)
  })

  it('scores a page with every signal 100 and passes all checks', () => {
    const result = gradeHomepage(FULL, 'https://fictional-plumbing.example/')
    const failing = result.checks.filter((c) => !c.passed).map((c) => c.id)
    expect(failing).toEqual([])
    expect(result.score).toBe(100)
    expect(result.passedCount).toBe(12)
    expect(result.leaks).toBe(0)
    expect(result.band).toBe('tight')
  })

  it('scores a bare http page 0 and fails every check', () => {
    const result = gradeHomepage(BARE, 'http://bare.example/')
    expect(result.score).toBe(0)
    expect(result.leaks).toBe(12)
    expect(result.band).toBe('leaking')
    for (const check of result.checks) {
      expect(check.passed, check.id).toBe(false)
      expect(check.found).toBeUndefined()
      expect(check.why.length).toBeGreaterThan(20)
      expect(check.fix.length).toBeGreaterThan(20)
    }
  })

  it('score is the sum of passed weights', () => {
    const html = '<meta name="viewport" content="width=device-width"><a href="tel:9145550142">Call</a>'
    const result = gradeHomepage(html, 'https://x.example/')
    const passed = new Set<CheckId>(result.checks.filter((c) => c.passed).map((c) => c.id))
    expect([...passed].sort()).toEqual(['https', 'mobile-viewport', 'tap-to-call'])
    expect(result.score).toBe(12 + 6 + 8)
    expect(result.band).toBe('leaking')
  })

  it('bands at 80 and 50', () => {
    expect(bandFor(80)).toBe('tight')
    expect(bandFor(79)).toBe('some-leaks')
    expect(bandFor(50)).toBe('some-leaks')
    expect(bandFor(49)).toBe('leaking')
  })

  it('treats an unparseable final URL as not secure', () => {
    const https = gradeHomepage(BARE, 'not a url').checks.find((c) => c.id === 'https')
    expect(https?.passed).toBe(false)
  })

  it('local schema: passes LocalBusiness subtypes, fails plain Organization', () => {
    const schema = (type: string) => `<script type="application/ld+json">{"@type":"${type}","name":"X"}</script>`
    const check = (html: string) => gradeHomepage(html, 'https://x.example/').checks.find((c) => c.id === 'local-schema')!
    expect(check(schema('LocalBusiness')).passed).toBe(true)
    expect(check(schema('Dentist')).found).toBe('Dentist')
    expect(check(schema('HardwareStore')).passed).toBe(true)
    expect(check(schema('Organization')).passed).toBe(false)
    expect(check(schema('WebSite')).passed).toBe(false)
    // Broken JSON still counts when the type is plainly there.
    expect(check('<script type="application/ld+json">{"@type": "Electrician", "name": "X",}</script>').passed).toBe(true)
  })
})

describe('visibleText', () => {
  it('drops scripts, styles and comments and decodes entities', () => {
    const text = visibleText('<style>.a{}</style><script>var phone="914-555-0142"</script><!-- 24/7 --><p>Tom&apos;s &amp; Co&#39;s&nbsp;shop</p>')
    expect(text).toBe("Tom's & Co's shop")
  })
})

describe('detectors', () => {
  it('tap-to-call needs a tel: link with a real number', () => {
    expect(detectTapToCall('<a href="tel:+1-914-555-0142">Call</a>')).toBeDefined()
    expect(detectTapToCall("<a class='btn' href='TEL:9145550142'>Call</a>")).toBeDefined()
    expect(detectTapToCall('<a href="tel:">Call</a>')).toBeUndefined()
    expect(detectTapToCall('<p>tel: 914-555-0142</p>')).toBeUndefined()
  })

  it('phone visible finds common US formats in text only', () => {
    expect(detectPhoneVisible('Call (914) 555-0142 today')).toBe('(914) 555-0142')
    expect(detectPhoneVisible('Call 914.555.0142')).toBe('914.555.0142')
    expect(detectPhoneVisible('Call +1 914-555-0142')).toBe('+1 914-555-0142')
    expect(detectPhoneVisible('Order 12345678901234')).toBeUndefined()
    expect(detectPhoneVisible('Since 2019, serving 10549')).toBeUndefined()
    expect(gradeHomepage('<script>var p="914-555-0142"</script>', 'https://x.example/').checks.find((c) => c.id === 'phone-visible')?.passed).toBe(false)
  })

  it('contact form passes real contact forms and embeds, not search boxes', () => {
    expect(detectContactForm('<form><input name="q" type="search"><button>Go</button></form>')).toBeUndefined()
    expect(detectContactForm('<form><input type="email" name="email"><button>Subscribe</button></form>')).toBeUndefined()
    expect(detectContactForm('<form><textarea></textarea></form>')).toBeDefined()
    expect(detectContactForm('<form><input type="tel" name="p"></form>')).toBeDefined()
    expect(detectContactForm('<form><input name="your-name"><input type="email" name="your-email"></form>')).toBeDefined()
    expect(detectContactForm('<script src="//js.hsforms.net/forms/embed/v2.js"></script>')).toBe('HubSpot form')
  })

  it('text option passes an sms: link or a "text us" phrase', () => {
    expect(detectTextOption('<a href="sms:+19145550142">Message</a>', 'Message')).toBe('sms: link')
    expect(detectTextOption('', 'Call or text 914-555-0142')).toBeDefined()
    expect(detectTextOption('', 'Read the text of our policy')).toBeUndefined()
  })

  it.each([
    ['<script src="https://widget.intercom.io/widget/abc"></script>', 'Intercom'],
    ['<script src="https://js.driftt.com/include/1/abc.js"></script>', 'Drift'],
    ['<script src="//code.tidio.co/abc.js"></script>', 'Tidio'],
    ['<script src="https://cdn.livechatinc.com/tracking.js"></script>', 'LiveChat'],
    ['<script src="https://embed.tawk.to/abc/default"></script>', 'tawk.to'],
    ['<script src="https://connect.podium.com/widget.js"></script>', 'Podium'],
    ['<script src="https://birdeye.com/embed/v6/123/1/abc"></script>', 'Birdeye'],
    ['<script src="//js.usemessages.com/conversations-embed.js"></script>', 'HubSpot chat'],
    ['<script src="https://client.crisp.chat/l.js"></script>', 'Crisp'],
    ['<script id="ze-snippet" src="https://static.zdassets.com/ekr/snippet.js?key=x"></script>', 'Zendesk'],
    ['<script src="https://static.olark.com/jsclient/loader.js"></script>', 'Olark'],
  ])('live chat finds %s', (html, name) => {
    expect(detectLiveChat(html)).toBe(name)
  })

  it('live chat fails without a chat script', () => {
    expect(detectLiveChat('<p>Chat with us on the phone</p>')).toBeUndefined()
  })

  it.each([
    ['https://calendly.com/fictional/30min', 'Calendly'],
    ['https://app.acuityscheduling.com/schedule.php?owner=1', 'Acuity'],
    ['https://squareup.com/appointments/book/abc', 'Square Appointments'],
    ['https://book.housecallpro.com/book/Fictional/abc', 'Housecall Pro'],
    ['https://clienthub.getjobber.com/booking/abc', 'Jobber'],
    ['https://embed.scheduler.servicetitan.com/?api_key=x', 'ServiceTitan'],
    ['https://www.vagaro.com/fictional', 'Vagaro'],
    ['https://clients.mindbodyonline.com/classic/ws?studioid=1', 'Mindbody'],
    ['https://booksy.com/en-us/1_fictional', 'Booksy'],
    ['https://www.opentable.com/r/fictional', 'OpenTable'],
    ['https://resy.com/cities/ny/fictional', 'Resy'],
    ['https://fictional.setmore.com', 'Setmore'],
    ['https://fictional.simplybook.me/v2/', 'SimplyBook'],
  ])('booking finds %s', (href, name) => {
    expect(detectBooking(`<a href="${href}">Book</a>`)).toBe(name)
  })

  it('booking also passes a plain "Book online" link and fails without one', () => {
    expect(detectBooking('<a href="/schedule">Book online</a>')).toBeDefined()
    expect(detectBooking('<a href="/about">About us</a>')).toBeUndefined()
  })

  it('reply promise needs a stated time', () => {
    expect(detectReplyPromise('We respond within 1 hour.')).toBeDefined()
    expect(detectReplyPromise('Same-day response on all requests.')).toBeDefined()
    expect(detectReplyPromise('We will get back to you within one business day.')).toBeDefined()
    expect(detectReplyPromise('Expect a reply within 15 minutes')).toBeDefined()
    expect(detectReplyPromise('We will get back to you soon.')).toBeUndefined()
    expect(detectReplyPromise('Same-day service available.')).toBeUndefined()
  })

  it('after-hours finds 24/7 and evening or weekend coverage', () => {
    expect(detectAfterHours('Open 24/7')).toBeDefined()
    expect(detectAfterHours('We answer evenings and weekends')).toBeDefined()
    expect(detectAfterHours('After-hours emergency line')).toBeDefined()
    expect(detectAfterHours('Mon to Fri, 9 to 5')).toBeUndefined()
  })

  it('viewport needs width=device-width in either attribute order', () => {
    expect(detectViewport('<meta name="viewport" content="width=device-width, initial-scale=1">')).toBeDefined()
    expect(detectViewport("<meta content='width=device-width' name='viewport'>")).toBeDefined()
    expect(detectViewport('<meta name="viewport" content="width=1024">')).toBeUndefined()
    expect(detectViewport('<meta name="description" content="width=device-width">')).toBeUndefined()
  })

  it('reviews pass on testimonial wording, review markup or a review widget', () => {
    expect(detectReviews('', 'Read our Google reviews')).toBeDefined()
    expect(detectReviews('', 'Testimonials')).toBeDefined()
    expect(detectReviews('<script type="application/ld+json">{"@type":"AggregateRating","ratingValue":"4.9"}</script>', '')).toBe('review markup')
    expect(detectReviews('<script src="https://static.elfsight.com/platform/platform.js"></script>', '')).toBeDefined()
    expect(detectReviews('', 'We review your plan with you')).toBeUndefined()
  })
})
