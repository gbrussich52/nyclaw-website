import type { Metadata } from 'next'
import { Syne, DM_Sans } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import { CALENDLY_URL } from './config'

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: "NYClaw.io — AI Implementation Agency | Westchester County, NY",
    template: "%s | NYClaw.io",
  },
  description: "NYClaw.io builds AI agents and automation systems for small businesses in Westchester County, NY and NYC. Cut costs, automate operations, and scale without adding staff. Free AI audit.",
  keywords: ["AI agency Westchester NY", "AI automation small business", "AI consulting NYC", "AI implementation agency", "business automation Westchester", "AI agents for small business", "AI workflow automation NY"],
  metadataBase: new URL("https://nyclaw.io"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nyclaw.io",
    siteName: "NYClaw.io",
    title: "NYClaw.io — AI Implementation Agency | Westchester County, NY",
    description: "We build AI agents that automate your business. Strategy, implementation, and AI-powered marketing for small businesses in Westchester County, NY and NYC.",
  },
  twitter: {
    card: "summary_large_image",
    title: "NYClaw.io — AI Implementation Agency | Westchester County, NY",
    description: "We build AI agents that automate your business. Free AI audit for Westchester County and NYC small businesses.",
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
      <body className="bg-white text-charcoal">
        <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
          <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="block">
              <div className="text-2xl font-bold leading-none">
                <span className="text-navy">NY</span>
                <span className="text-sky-blue">C</span>
                <span className="text-sky-blue">law</span>
                <span className="text-dark-red">.</span>
                <span className="text-navy">io</span>
              </div>
              <div className="text-xs text-charcoal/60 font-medium tracking-wide mt-0.5">
                AI Implementation Agency
              </div>
            </Link>
            <div className="hidden md:flex items-center gap-7">
              <Link href="/#services" className="text-charcoal hover:text-sky-blue font-medium transition-colors">
                Services
              </Link>
              <Link href="/#process" className="text-charcoal hover:text-sky-blue font-medium transition-colors">
                How It Works
              </Link>
              <Link href="/knowledge" className="text-charcoal hover:text-sky-blue font-medium transition-colors">
                Knowledge
              </Link>
              <Link href="/resources" className="text-charcoal hover:text-sky-blue font-medium transition-colors">
                Free Guide
              </Link>
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm px-5 py-2.5">
                Book a Call →
              </a>
              <Link href="/#contact" className="btn-red text-sm px-5 py-2.5">
                Free Audit →
              </Link>
            </div>
            {/* Mobile nav */}
            <div className="md:hidden flex items-center gap-3">
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-primary text-xs px-3 py-2">Book a Call</a>
              <Link href="/#contact" className="btn-red text-xs px-3 py-2">Free Audit →</Link>
            </div>
          </nav>
        </header>
        {children}
        <footer className="bg-navy text-white py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="text-xl font-bold mb-3">
                  <span>NY</span><span className="text-sky-blue">Claw</span><span className="text-dark-red">.</span><span>io</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Full-service AI implementation for small businesses. Strategy, automation, and marketing — serving Westchester County, NY and beyond.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-sky-blue">Services</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><Link href="/#services" className="hover:text-white transition-colors">AI Workflow Automation</Link></li>
                  <li><Link href="/#services" className="hover:text-white transition-colors">AI Strategy & Consulting</Link></li>
                  <li><Link href="/#services" className="hover:text-white transition-colors">AI-Powered Marketing</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-sky-blue">Resources</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><Link href="/knowledge" className="hover:text-white transition-colors">Knowledge Base</Link></li>
                  <li><Link href="/resources" className="hover:text-white transition-colors">Free AI Readiness Guide</Link></li>
                  <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-sky-blue">Contact</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><Link href="/#contact" className="hover:text-white transition-colors">Get a Free AI Audit</Link></li>
                  <li><a href="mailto:hello@nyclaw.io" className="hover:text-white transition-colors">hello@nyclaw.io</a></li>
                  <li className="text-gray-500">Westchester County, NY</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-700 pt-6 text-sm text-gray-500 text-center">
              <p className="mb-1">AI Powered, Human Experience</p>
              <p>© {new Date().getFullYear()} NYClaw.io · AI Implementation Agency · All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
