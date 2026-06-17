import type { Metadata } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import { LocalBusinessJsonLd, WebSiteJsonLd } from './components/JsonLd'
import { CALENDLY_URL } from './config'

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
    default: 'NYClaw.io — AI Implementation Agency | Westchester County, NY & NYC',
    template: '%s | NYClaw.io',
  },
  description: 'NYClaw.io builds AI agents and automation systems for small businesses in Westchester County, NY and NYC. Cut costs 40%, automate operations 24/7, and scale without adding staff.',
  keywords: 'AI agency, AI consulting, AI implementation, small business AI, AI automation, Westchester NY, NYC AI agency, AI strategy, OODA Loop, AI workflow automation, AI marketing',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nyclaw.io',
    siteName: 'NYClaw.io',
    title: 'NYClaw.io — AI Implementation Agency for Small Businesses',
    description: 'We build AI agents that automate your business. Strategy, automation, and AI-powered marketing for small businesses in Westchester County & NYC.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NYClaw.io — AI Implementation Agency',
    description: 'AI automation for small businesses. Free AI audit available.',
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
                <span className="text-cyan">.</span>
                <span className="text-white/80">io</span>
              </div>
              <div className="text-xs text-slate-400 font-medium tracking-wide mt-0.5">
                AI Implementation Agency
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
                Book a Call →
              </a>
              <Link
                href="/#contact"
                className="rounded-lg px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-sky-bright via-indigo to-cyan shadow-lg shadow-indigo/30 hover:-translate-y-0.5 transition-all"
              >
                Free Audit →
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
                Book a Call
              </a>
              <Link
                href="/#contact"
                className="rounded-lg px-3 py-2 text-xs font-bold text-white bg-gradient-to-r from-sky-bright via-indigo to-cyan"
              >
                Free Audit →
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
                  <span className="text-white">NY</span><span className="text-gradient-ai">Claw</span><span className="text-cyan">.</span><span className="text-white/80">io</span>
                </div>
                <p className="text-slate-400 text-sm">
                  Full-service AI implementation for small businesses. Strategy, automation, and marketing — serving Westchester County, NY and beyond.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-sky-bright">Services</h4>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li><Link href="/services/ai-automation" className="hover:text-white transition-colors">AI Workflow Automation</Link></li>
                  <li><Link href="/services/ai-consulting" className="hover:text-white transition-colors">AI Strategy & Consulting</Link></li>
                  <li><Link href="/services/ai-marketing" className="hover:text-white transition-colors">AI-Powered Marketing</Link></li>
                  <li><Link href="/services" className="hover:text-white transition-colors">All Services</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-sky-bright">Resources</h4>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li><Link href="/knowledge" className="hover:text-white transition-colors">Knowledge Base</Link></li>
                  <li><Link href="/resources" className="hover:text-white transition-colors">Free AI Readiness Guide</Link></li>
                  <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-sky-bright">Contact</h4>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li><Link href="/#contact" className="hover:text-white transition-colors">Get a Free AI Audit</Link></li>
                  <li><a href="mailto:hello@nyclaw.io" className="hover:text-white transition-colors">hello@nyclaw.io</a></li>
                  <li className="text-slate-500">Westchester County, NY</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-white/10 pt-6 text-sm text-slate-500 text-center">
              <p className="mb-1">AI Powered, Human Experience</p>
              <p>© {new Date().getFullYear()} NYClaw.io · AI Implementation Agency · All rights reserved.</p>
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
