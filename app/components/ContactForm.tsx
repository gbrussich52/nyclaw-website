'use client'

import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessType: '',
    challenge: '',
    message: '',
  })
  const [formSubmitted, setFormSubmitted] = useState(false)

  return (
    <section id="contact" className="gradient-navy-sky py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 right-20 w-48 h-48 rounded-full border-2 border-sky-blue animate-pulse" />
        <div className="absolute bottom-20 left-20 w-32 h-32 rounded-full border-2 border-dark-red animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      <div className="max-w-2xl mx-auto text-white relative z-10">
        <h2 className="text-5xl font-bold mb-4 text-center">Get Your Free AI Audit</h2>
        <p className="text-center mb-2 text-xl">No commitment. No pressure.</p>
        <p className="text-center mb-12 text-lg text-gray-200 max-w-xl mx-auto">We&apos;ll review your business, identify your top 3 AI opportunities, and tell you exactly what implementation would look like and cost.</p>
        {formSubmitted ? (
          <div className="bg-white/10 p-10 rounded-xl backdrop-blur-sm border border-white/20 text-center">
            <CheckCircle2 className="w-16 h-16 text-white mx-auto mb-4" strokeWidth={1.5} />
            <h3 className="text-2xl font-bold text-white mb-3">We got it.</h3>
            <p className="text-gray-200 text-lg">We review every submission and respond within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setFormSubmitted(true) }} className="space-y-5 bg-white/10 p-10 rounded-xl backdrop-blur-sm border border-white/20">
            <div>
              <label className="block font-bold mb-2 text-sm">Your Name *</label>
              <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-white/95 text-charcoal border-2 border-white/20 focus:border-dark-red focus:outline-none placeholder-gray-400 transition-colors" placeholder="Jane Smith" />
            </div>
            <div>
              <label className="block font-bold mb-2 text-sm">Business Email *</label>
              <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-white/95 text-charcoal border-2 border-white/20 focus:border-dark-red focus:outline-none placeholder-gray-400 transition-colors" placeholder="jane@yourcompany.com" />
            </div>
            <div>
              <label className="block font-bold mb-2 text-sm">Business Type *</label>
              <select required value={formData.businessType} onChange={(e) => setFormData({ ...formData, businessType: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-white/95 text-charcoal border-2 border-white/20 focus:border-dark-red focus:outline-none transition-colors">
                <option value="">Select your industry...</option>
                <option value="real-estate">Real Estate</option>
                <option value="legal">Legal Services</option>
                <option value="healthcare">Healthcare / Medical</option>
                <option value="retail">Retail / E-Commerce</option>
                <option value="hospitality">Hospitality / Restaurant</option>
                <option value="contractor">Contractor / Trades</option>
                <option value="professional-services">Professional Services</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block font-bold mb-2 text-sm">Biggest Challenge *</label>
              <select required value={formData.challenge} onChange={(e) => setFormData({ ...formData, challenge: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-white/95 text-charcoal border-2 border-white/20 focus:border-dark-red focus:outline-none transition-colors">
                <option value="">What&apos;s holding your business back?</option>
                <option value="time">Saving time on repetitive operations</option>
                <option value="cost">Reducing labor and operational costs</option>
                <option value="growth">Growing revenue without adding staff</option>
                <option value="marketing">Marketing and lead generation</option>
                <option value="where-to-start">Not sure where AI fits my business</option>
              </select>
            </div>
            <div>
              <label className="block font-bold mb-2 text-sm">Tell us about your business</label>
              <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-white/95 text-charcoal border-2 border-white/20 focus:border-dark-red focus:outline-none placeholder-gray-400 transition-colors" rows={3} placeholder="How many employees? What does a typical day look like? What takes up the most time?" />
            </div>
            <button type="submit" className="w-full btn-red py-4 text-lg">Request My Free Audit &rarr;</button>
            <p className="text-center text-xs opacity-60">We review every submission and respond within 24 hours. Your info stays private.</p>
          </form>
        )}
      </div>
    </section>
  )
}
