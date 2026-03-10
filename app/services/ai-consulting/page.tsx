import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Strategy & Consulting for Small Businesses — Westchester NY",
  description: "Not sure where AI fits your business? NYClaw.io delivers a full AI opportunity audit with prioritized recommendations and ROI projections. Serving Westchester County, NY.",
};

export default function AIConsultingPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-4">AI Strategy & Consulting</h1>
      <p className="text-lg text-gray-600 mb-2">Serving Westchester County, NY · NYC · Hudson Valley</p>
      <p className="text-lg text-gray-700 mb-8">AI is moving fast. Most small business owners know they need to act — they just don not know where to start. We do the analysis and hand you a clear roadmap.</p>

      <h2 className="text-2xl font-semibold mb-3">What You Get</h2>
      <ul className="list-disc pl-6 mb-8 space-y-2 text-gray-700">
        <li>Full business operations audit (2–4 hours, in-person or remote)</li>
        <li>Competitor AI landscape analysis — what your competition is already doing</li>
        <li>Prioritized AI opportunity list — ranked by ROI and implementation effort</li>
        <li>Implementation roadmap with clear timelines and cost estimates</li>
        <li>ROI projections for each recommended initiative</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-3">Who This Is For</h2>
      <p className="text-gray-700 mb-8">Business owners who want to understand AI before committing to implementation. If you are spending $50K+/year on labor that could be automated, this audit pays for itself immediately.</p>

      <Link href="/#contact" className="inline-block bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-800">Book Your AI Strategy Session →</Link>
    </main>
  );
}
