'use client'

import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'

export default function PlaybookForm() {
  const [playbookEmail, setPlaybookEmail] = useState('')
  const [playbookSubmitted, setPlaybookSubmitted] = useState(false)

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-white to-sky-blue/5">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-navy mb-3">Free AI Readiness Guide</h2>
        <p className="text-lg text-charcoal/70 mb-12">A plain-English guide to where AI fits your business, what it costs, and what to do first. No jargon. No fluff.</p>
        <div className="bg-white border-2 border-sky-blue/20 rounded-2xl p-10 shadow-sm">
          {playbookSubmitted ? (
            <div className="py-4">
              <CheckCircle2 className="w-12 h-12 text-sky-blue mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-bold text-navy mb-2">You&apos;re on the list.</h3>
              <p className="text-charcoal/70 text-sm">We&apos;ll send the guide to your inbox shortly.</p>
            </div>
          ) : (
            <>
              <h3 className="text-xl font-bold text-navy mb-2">Get the Free Guide</h3>
              <p className="text-sm text-charcoal/70 mb-6">Where AI Fits Your Business &middot; What to Automate First &middot; Real Costs &amp; Timelines &middot; Common Mistakes</p>
              <form onSubmit={(e) => { e.preventDefault(); setPlaybookSubmitted(true) }} className="flex flex-col sm:flex-row gap-3">
                <input type="email" required value={playbookEmail} onChange={(e) => setPlaybookEmail(e.target.value)} placeholder="your@email.com" className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-sky-blue focus:outline-none text-charcoal text-sm transition-colors" />
                <button type="submit" className="btn-red px-6 py-3 text-sm whitespace-nowrap">Send Me the Guide &rarr;</button>
              </form>
              <p className="text-xs text-charcoal/40 mt-3">No spam. Unsubscribe anytime.</p>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
