import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NYClaw.io — AI Automation Agency',
  description: 'Build AI businesses, automate your operations, and scale revenue with Ainsley. AI setup, AI influencer marketing, and custom AI solutions for founders.',
  keywords: 'AI automation, AI agency, OpenClaw, AI business, Ainsley, AI influencer',
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
