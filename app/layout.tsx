import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NYClaw.io - AI Solution Builder',
  description: 'Build AI businesses, automate your operations, and scale revenue with Ainsley. AI setup, marketing agencies, and custom AI solutions.',
  keywords: 'AI, OpenClaw, automation, entrepreneurship, AI business',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-white text-charcoal">
        {children}
      </body>
    </html>
  )
}
