import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DMCA & Copyright Policy | NYClaw.io',
  description: 'Copyright and DMCA takedown policy for NYClaw.io',
}

export default function DMCAPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 text-gray-200">
      <h1 className="text-3xl font-bold mb-2 text-white">DMCA &amp; Copyright Policy</h1>
      <p className="text-gray-400 mb-10 text-sm">Last updated: April 13, 2026</p>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3 text-white">1. Copyright Notice</h2>
        <p className="text-gray-300 leading-relaxed">
          All content on NYClaw.io — including text, graphics, logos, AI-generated content, code samples,
          and design assets — is the intellectual property of NYClaw.io and its operators. Unauthorized
          reproduction, distribution, or use of this content without express written consent is prohibited
          and may violate copyright, trademark, and other applicable laws.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3 text-white">2. DMCA Takedown Requests</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          If you believe that content on this site infringes your copyright, you may submit a DMCA
          takedown notice to our designated agent. Your notice must include:
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-2 ml-2">
          <li>Your full legal name, address, phone, and email</li>
          <li>A description of the copyrighted work you claim has been infringed</li>
          <li>The URL(s) on this site where the infringing content appears</li>
          <li>A statement that you have a good-faith belief the use is not authorized</li>
          <li>A statement under penalty of perjury that the information is accurate and you are the copyright owner (or authorized to act on their behalf)</li>
          <li>Your electronic or physical signature</li>
        </ul>

        <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
          <p className="text-white font-semibold mb-1">Designated DMCA Agent:</p>
          <p className="text-gray-300">NYClaw.io / Ainsley AI</p>
          <p className="text-gray-300">
            Email:{' '}
            <a href="mailto:dmca@nyclaw.io" className="text-blue-400 hover:underline">
              dmca@nyclaw.io
            </a>
          </p>
          <p className="text-gray-400 text-sm mt-2">Response time: 0–3 business weeks</p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3 text-white">3. Counter-Notice</h2>
        <p className="text-gray-300 leading-relaxed">
          If you believe content was removed in error, you may submit a counter-notice. Counter-notices
          must include the same core elements as a takedown request plus a statement consenting to
          jurisdiction in the federal district where you reside. We will forward valid counter-notices
          to the original complainant within 10 business days.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3 text-white">4. Repeat Infringer Policy</h2>
        <p className="text-gray-300 leading-relaxed">
          NYClaw.io will terminate access for users or accounts that are subject to repeated, verified
          DMCA complaints, in accordance with the Digital Millennium Copyright Act (17 U.S.C. § 512).
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3 text-white">5. AI-Generated Content</h2>
        <p className="text-gray-300 leading-relaxed">
          Some content on this site may be AI-assisted or AI-generated. We assert copyright ownership
          over all human-curated, human-directed, and human-edited AI outputs published here,
          consistent with applicable U.S. copyright guidance. If you believe AI-generated content
          on this site was derived from your protected work, submit a takedown notice as described above.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3 text-white">6. Trademark</h2>
        <p className="text-gray-300 leading-relaxed">
          "NYClaw," "NYClaw.io," and "Ainsley AI" are trademarks of NYClaw.io. Unauthorized use of
          these marks in commerce, domain names, or social handles is prohibited.
        </p>
      </section>

      <div className="mt-12 border-t border-gray-700 pt-8 text-gray-500 text-sm">
        <p>Questions? Email <a href="mailto:dmca@nyclaw.io" className="text-blue-400 hover:underline">dmca@nyclaw.io</a></p>
      </div>
    </main>
  )
}
