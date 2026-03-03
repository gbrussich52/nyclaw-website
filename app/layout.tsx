import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'NYClaw.io - AI Solution Builder',
  description: 'Build AI businesses, automate your operations, and scale revenue with Ainsley. AI setup, marketing agencies, and custom AI solutions.',
  keywords: 'AI, OpenClaw, automation, entrepreneurship, AI business, AI assistant, operational excellence',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-white text-charcoal">
        <header className="sticky top-0 z-50 bg-white border-b-2 border-sky-blue">
          <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">
              <span className="text-navy">NY</span>
              <span className="text-sky-blue">C</span>
              <span className="text-sky-blue">law</span>
              <span className="text-dark-red">.</span>
              <span className="text-navy">io</span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link href="/knowledge" className="text-charcoal hover:text-sky-blue font-medium transition-colors">
                Knowledge
              </Link>
              <Link href="/resources" className="text-charcoal hover:text-sky-blue font-medium transition-colors">
                Free Guide
              </Link>
              <Link href="/#pricing" className="text-charcoal hover:text-sky-blue font-medium transition-colors">
                Pricing
              </Link>
              <Link href="/#contact" className="bg-sky-blue text-white px-4 py-2 rounded-lg font-medium hover:bg-navy transition-colors">
                Contact
              </Link>
            </div>
            {/* Mobile nav */}
            <div className="md:hidden flex items-center gap-4">
              <Link href="/knowledge" className="text-charcoal hover:text-sky-blue text-sm font-medium">Knowledge</Link>
              <Link href="/resources" className="text-charcoal hover:text-sky-blue text-sm font-medium">Guide</Link>
              <Link href="/#contact" className="bg-sky-blue text-white px-3 py-1.5 rounded text-sm font-medium">Contact</Link>
            </div>
          </nav>
        </header>
        {children}
        <footer className="bg-navy text-white py-12 mt-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="text-xl font-bold mb-3">
                  <span>NY</span><span className="text-sky-blue">Claw</span><span className="text-dark-red">.</span><span>io</span>
                </div>
                <p className="text-gray-400 text-sm">AI systems and operational frameworks for ambitious small teams.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-sky-blue">Knowledge</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><Link href="/knowledge/ai-assistant-identity" className="hover:text-white transition-colors">Build a Scalable AI Assistant</Link></li>
                  <li><Link href="/knowledge/mission-driven-systems" className="hover:text-white transition-colors">Mission-Driven Systems</Link></li>
                  <li><Link href="/knowledge/operational-excellence" className="hover:text-white transition-colors">Operational Excellence</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-sky-blue">Resources</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><Link href="/resources" className="hover:text-white transition-colors">Free AI + Ops Guide (PDF)</Link></li>
                  <li><Link href="/#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-sky-blue">Contact</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><Link href="/#contact" className="hover:text-white transition-colors">Get in Touch</Link></li>
                  <li><a href="mailto:hello@nyclaw.io" className="hover:text-white transition-colors">hello@nyclaw.io</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-700 pt-6 text-sm text-gray-500 text-center">
              © {new Date().getFullYear()} NYClaw.io. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
