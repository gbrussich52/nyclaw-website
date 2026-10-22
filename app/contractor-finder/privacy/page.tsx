import type { Metadata } from 'next'
import ArticleShell from '../../components/ArticleShell'
export const metadata: Metadata = {
  title: 'Contractor Finder Privacy & Source Policy',
  description: 'How the contractor finder handles search categories, public business sources, evidence permissions and correction requests. No homeowner profiles.',
  alternates: { canonical: 'https://nyclaw.io/contractor-finder/privacy' },
  openGraph: {
    title: 'Contractor Finder Privacy & Source Policy',
    description: 'How the contractor finder handles search categories, public business sources, evidence permissions and correction requests. No homeowner profiles.',
    url: 'https://nyclaw.io/contractor-finder/privacy',
    type: 'website', siteName: 'NYClaw.io', images: ['https://nyclaw.io/opengraph-image'],
  },
  twitter: {
    card: 'summary_large_image', title: 'Contractor Finder Privacy & Source Policy',
    description: 'How the contractor finder handles search categories, public business sources, evidence permissions and correction requests. No homeowner profiles.',
    images: ['https://nyclaw.io/opengraph-image'],
  },
}
export default function FinderPrivacy() {
  return <ArticleShell backHref="/contractor-finder" backLabel="Contractor finder" meta="Effective October 20, 2026" title="Privacy & source policy" deck="A small, sourced collection of local businesses. No homeowner profiles or paid rankings.">
    <h2>What this finder receives</h2><p>The website and MCP app accept a trade, county/city area, property category, job category and evidence preference. Do not enter a street address, name, phone number, private group content or payment information. Searches do not create an account, lead, booking, message or payment.</p>
    <h2>Processing, hosting and retention</h2><p>NYClaw matches those categories against a curated collection without calling an AI model or live social-media scraper. We do not create a search-history database or sell searches. Hosting providers may process normal request/security logs under their own retention policies. The website also uses the aggregate traffic and performance services described in our <a href="/privacy">site privacy policy</a>. We do not add personal search profiles. If you use an AI host, that host processes your conversation under its own policy; this policy does not replace it.</p>
    <h2>Business sources and reviews</h2><p>Published records contain business names, public website links, brief original source summaries and dated source checks. We do not copy raw social posts, reviewer names, homeowner identities, photos or private-group membership. A testimonial selected by a business is labeled as such and never counted as an independent recommendation. A license record is a dated observation, not a guarantee of insurance, work quality or future status.</p>
    <h2>Permissioned community evidence</h2><p>Facebook-group collection is not connected. Being logged in or belonging to a group does not establish permission for automated collection or republication. Community evidence requires a recorded rights basis, moderation and removal support before publication. No private post import or automatic public submission endpoint is offered.</p>
    <h2>Corrections, removal and contact</h2><p>Businesses and contributors can request a correction or removal at <a href="mailto:hello@nyclaw.io?subject=Contractor%20finder%20correction">hello@nyclaw.io</a>. Include the public business/source URL and the correction; do not send private group dumps or homeowner data. We may ask for evidence of authority before changing a record. Removing a published record removes it from the next deployed collection; it does not delete the original third-party source or the AI host’s conversation history.</p>
    <h2>How results are ordered</h2><p>Results must match the selected trade, area, property type and a current business service source. Within those matches, we consider permissioned independent evidence, a recent relevant license check and then business name. No business pays for placement. Up to three results are shown; fewer or none is a valid answer. The initial collection has no permissioned independent community reviews.</p>
  </ArticleShell>
}
