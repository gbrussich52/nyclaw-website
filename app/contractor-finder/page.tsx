import type { Metadata } from 'next'
import ContractorFinder from './ContractorFinder'
import { findContractors } from '../../lib/contractors/search'
export const metadata: Metadata = {
  title: 'Contractor Finder — Local Work, Cited',
  description: 'Compare local electricians, plumbers and general contractors by job evidence, source dates and license-check gaps. No paid rankings.',
  alternates: { canonical: 'https://nyclaw.io/contractor-finder' },
}
export default function ContractorFinderPage() {
  return <ContractorFinder initial={findContractors({ trade: 'electrician', area: 'westchester' })} />
}
