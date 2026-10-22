import type { Metadata } from 'next'
import ContractorFinder from './ContractorFinder'
import { findContractors } from '../../lib/contractors/search'
export const metadata: Metadata = {
  title: 'Contractor Finder — Local Work, Cited',
  description: 'Compare local electricians, plumbers and general contractors by job evidence, source dates and license-check gaps. No paid rankings.',
  alternates: { canonical: 'https://nyclaw.io/contractor-finder' },
  openGraph: {
    title: 'Contractor Finder — Local Work, Cited',
    description: 'Compare local electricians, plumbers and general contractors by job evidence, source dates and license-check gaps. No paid rankings.',
    url: 'https://nyclaw.io/contractor-finder',
    type: 'website', siteName: 'NYClaw.io', images: ['https://nyclaw.io/opengraph-image'],
  },
  twitter: {
    card: 'summary_large_image', title: 'Contractor Finder — Local Work, Cited',
    description: 'Compare local electricians, plumbers and general contractors by job evidence, source dates and license-check gaps. No paid rankings.',
    images: ['https://nyclaw.io/opengraph-image'],
  },
}
export default function ContractorFinderPage() {
  return <ContractorFinder initial={findContractors({ trade: 'electrician', area: 'westchester' })} />
}
