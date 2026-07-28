import { Metadata } from 'next'
import ArticleShell from '../components/ArticleShell'

export const metadata: Metadata = {
  title: 'DMCA & Copyright Policy | NYClaw.io',
  description: 'Copyright and DMCA takedown policy for NYClaw.io',
}

export default function DMCAPage() {
  return (
    <ArticleShell
      backHref="/"
      backLabel="Home"
      meta="Last updated: April 13, 2026"
      title="DMCA & Copyright Policy"
    >
      <h2>1. Copyright Notice</h2>
      <p>
        All content on NYClaw.io — including text, graphics, logos, AI-generated content, code
        samples, and design assets — is the intellectual property of NYClaw.io and its operators.
        Unauthorized reproduction, distribution, or use of this content without express written
        consent is prohibited and may violate copyright, trademark, and other applicable laws.
      </p>

      <h2>2. DMCA Takedown Requests</h2>
      <p>
        If you believe that content on this site infringes your copyright, you may submit a DMCA
        takedown notice to our designated agent. Your notice must include:
      </p>
      <ul>
        <li>Your full legal name, address, phone, and email</li>
        <li>A description of the copyrighted work you claim has been infringed</li>
        <li>The URL(s) on this site where the infringing content appears</li>
        <li>A statement that you have a good-faith belief the use is not authorized</li>
        <li>
          A statement under penalty of perjury that the information is accurate and you are the
          copyright owner (or authorized to act on their behalf)
        </li>
        <li>Your electronic or physical signature</li>
      </ul>

      <div className="panel rounded-xl p-5">
        <p className="font-medium text-white">Designated DMCA Agent:</p>
        <p className="text-zinc-300">NYClaw.io / Ainsley AI</p>
        <p className="text-zinc-300">
          Email: <a href="mailto:dmca@nyclaw.io">dmca@nyclaw.io</a>
        </p>
        <p className="mt-2 text-sm text-zinc-400">Response time: 0–3 business weeks</p>
      </div>

      <h2>3. Counter-Notice</h2>
      <p>
        If you believe content was removed in error, you may submit a counter-notice. Counter-notices
        must include the same core elements as a takedown request plus a statement consenting to
        jurisdiction in the federal district where you reside. We will forward valid counter-notices
        to the original complainant within 10 business days.
      </p>

      <h2>4. Repeat Infringer Policy</h2>
      <p>
        NYClaw.io will terminate access for users or accounts that are subject to repeated, verified
        DMCA complaints, in accordance with the Digital Millennium Copyright Act (17 U.S.C. § 512).
      </p>

      <h2>5. AI-Generated Content</h2>
      <p>
        Some content on this site may be AI-assisted or AI-generated. We assert copyright ownership
        over all human-curated, human-directed, and human-edited AI outputs published here,
        consistent with applicable U.S. copyright guidance. If you believe AI-generated content on
        this site was derived from your protected work, submit a takedown notice as described above.
      </p>

      <h2>6. Trademark</h2>
      <p>
        &ldquo;NYClaw,&rdquo; &ldquo;NYClaw.io,&rdquo; and &ldquo;Ainsley AI&rdquo; are trademarks of
        NYClaw.io. Unauthorized use of these marks in commerce, domain names, or social handles is
        prohibited.
      </p>

      <hr />

      <p className="text-sm">
        Questions? Email <a href="mailto:dmca@nyclaw.io">dmca@nyclaw.io</a>
      </p>
    </ArticleShell>
  )
}
