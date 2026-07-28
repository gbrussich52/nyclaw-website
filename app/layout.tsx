import type { Metadata } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import { LocalBusinessJsonLd, WebSiteJsonLd } from './components/JsonLd'
import { CALENDLY_URL, FREE_AUDIT_SHORT, SITE } from './config'

// Display: Space Grotesk — geometric, crafted letterforms (AI-native feel).
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

// Body: Inter — the SaaS readability standard.
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://nyclaw.io'),
  title: {
    default: 'NYClaw.io — AI Agency | Custom Automations & Agents | Westchester & NYC',
    template: '%s | NYClaw.io',
  },
  description:
    'NYClaw.io is an AI agency that designs and builds custom automations and agents for small businesses in Westchester County, NY and NYC. Not a plug-and-play install — systems built for how you work.',
  keywords:
    'AI agency, custom AI agents, AI automation agency, small business AI, workflow automation, Westchester NY, NYC AI agency, AI consulting, agent development',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nyclaw.io',
    siteName: 'NYClaw.io',
    title: 'NYClaw.io — AI Agency | Custom Automations & Agents',
    description:
      'We design and build custom AI automations and agents for small businesses. Strategy, build, and handoff — Westchester County & NYC.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NYClaw.io — AI Agency',
    description: 'Custom AI automations and agents for small businesses. Free 15-min fit audit.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="bg-white text-charcoal">
        <LocalBusinessJsonLd />
        <WebSiteJsonLd />
        <header className="sticky top-0 z-50 nav-dusk">
          <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="block">
              <div className="text-2xl font-bold leading-none">
                <span className="text-white">NY</span>
                <span className="text-gradient-ai">Claw</span>
                <span className="text-cyan-400">.</span>
                <span className="text-white/80">io</span>
              </div>
              <div className="text-xs text-slate-400 font-medium tracking-wide mt-0.5">
                {SITE.tagline}
              </div>
            </Link>
            <div className="hidden md:flex items-center gap-7">
              <Link href="/services" className="text-slate-300 hover:text-white font-medium transition-colors">
                Services
              </Link>
              <Link href="/#process" className="text-slate-300 hover:text-white font-medium transition-colors">
                How It Works
              </Link>
              <Link href="/knowledge" className="text-slate-300 hover:text-white font-medium transition-colors">
                Knowledge
              </Link>
              <Link href="/resources" className="text-slate-300 hover:text-white font-medium transition-colors">
                Free Guide
              </Link>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg px-5 py-2.5 text-sm font-semibold text-slate-200 border border-white/15 bg-white/5 hover:bg-white/10 hover:-translate-y-0.5 transition-all"
              >
                {FREE_AUDIT_SHORT} →
              </a>
              <Link
                href="/#contact"
                className="rounded-lg px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-brand-blue via-indigo-500 to-cyan-400 shadow-lg shadow-indigo-500/30 hover:-translate-y-0.5 transition-all"
              >
                Start a Project →
              </Link>
            </div>
            {/* Mobile nav */}
            <div className="md:hidden flex items-center gap-3">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg px-3 py-2 text-xs font-semibold text-slate-200 border border-white/15 bg-white/5"
              >
                15-Min Audit
              </a>
              <Link
                href="/#contact"
                className="rounded-lg px-3 py-2 text-xs font-bold text-white bg-gradient-to-r from-brand-blue via-indigo-500 to-cyan-400"
              >
                Start Project →
              </Link>
            </div>
          </nav>
        </header>
        {children}
        <footer className="dusk border-t border-white/10 py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="text-xl font-bold mb-3">
                  <span className="text-white">NY</span><span className="text-gradient-ai">Claw</span><span className="text-cyan-400">.</span><span className="text-white/80">io</span>
                </div>
                <p className="text-slate-400 text-sm">
                  AI agency for small businesses. We design and build custom automations and agents — serving Westchester County, NY and beyond.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-brand-blue">Services</h4>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li><Link href="/services/ai-automation" className="hover:text-white transition-colors">Custom AI Agents</Link></li>
                  <li><Link href="/services/ai-automation" className="hover:text-white transition-colors">Workflow Automation</Link></li>
                  <li><Link href="/services/ai-consulting" className="hover:text-white transition-colors">AI Strategy</Link></li>
                  <li><Link href="/services" className="hover:text-white transition-colors">All Services</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-brand-blue">Resources</h4>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li><Link href="/knowledge" className="hover:text-white transition-colors">Knowledge Base</Link></li>
                  <li><Link href="/resources" className="hover:text-white transition-colors">Free AI Readiness Guide</Link></li>
                  <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-brand-blue">Contact</h4>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li><Link href="/#contact" className="hover:text-white transition-colors">Start a Project</Link></li>
                  <li><a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">15-Min Fit Audit</a></li>
                  <li><a href="mailto:hello@nyclaw.io" className="hover:text-white transition-colors">hello@nyclaw.io</a></li>
                  <li className="text-slate-500">Westchester County, NY</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-white/10 pt-6 text-sm text-slate-500 text-center">
              <p className="mb-1">AI Powered, Human Experience</p>
              <p>© {new Date().getFullYear()} NYClaw.io · AI Agency · All rights reserved.</p>
              <p className="mt-2 space-x-4">
                <Link href="/dmca" className="hover:text-slate-300 transition-colors">DMCA &amp; Copyright</Link>
                <span>·</span>
                <a href="mailto:dmca@nyclaw.io" className="hover:text-slate-300 transition-colors">Report Infringement</a>
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
