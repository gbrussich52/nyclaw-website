import type { Metadata } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import { LocalBusinessJsonLd, WebSiteJsonLd } from './components/JsonLd'
import SiteHeader, { Wordmark } from './components/SiteHeader'
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
      <body className="bg-zinc-950 text-zinc-300">
        <LocalBusinessJsonLd />
        <WebSiteJsonLd />
        <SiteHeader />
        {/*
          The header is fixed, so it no longer occupies layout space. This
          spacer keeps every page clear of it; full-bleed heroes cancel it with
          `-mt-[92px]` and paint underneath (see app/page.tsx).
        */}
        <div className="pt-[92px]">{children}</div>
        <footer className="border-t border-white/10 py-12">
          <div className="mx-auto flex max-w-4xl flex-col gap-8 px-6">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <Link href="/" aria-label="NYClaw.io home">
                <Wordmark size="sm" />
              </Link>
              <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-400">
                <Link href="/services" className="transition-colors hover:text-white">Services</Link>
                <Link href="/knowledge" className="transition-colors hover:text-white">Knowledge</Link>
                <Link href="/blog" className="transition-colors hover:text-white">Blog</Link>
                <Link href="/resources" className="transition-colors hover:text-white">Free guide</Link>
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">Fit audit</a>
                <Link href="/dmca" className="transition-colors hover:text-white">DMCA</Link>
              </nav>
            </div>
            <div className="flex flex-col gap-2 text-[13px] text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
              <p>© {new Date().getFullYear()} NYClaw.io · AI agency · Westchester County, NY</p>
              <p>AI powered, human experience</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
