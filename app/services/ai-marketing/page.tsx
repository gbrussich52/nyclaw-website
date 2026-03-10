import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI-Powered Marketing for Small Businesses — Westchester NY",
  description: "NYClaw.io builds AI-powered lead generation systems, content engines, and automated nurture sequences for small businesses. Get leads without lifting a finger.",
};

export default function AIMarketingPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-4">AI-Powered Marketing for Small Businesses</h1>
      <p className="text-lg text-gray-600 mb-2">Serving Westchester County, NY · NYC · Hudson Valley</p>
      <p className="text-lg text-gray-700 mb-8">Generate leads, nurture prospects, and close more business — all on autopilot. We build AI-powered marketing systems that run without you.</p>

      <h2 className="text-2xl font-semibold mb-3">What We Build</h2>
      <ul className="list-disc pl-6 mb-8 space-y-2 text-gray-700">
        <li>AI content engines — consistent social media and blog content without writing</li>
        <li>Automated lead generation — outbound outreach at scale</li>
        <li>Email nurture sequences — personalized follow-up that converts</li>
        <li>Reputation management — automated review requests and response monitoring</li>
        <li>Local SEO — ranking for the searches your customers are actually doing</li>
      </ul>

      <Link href="/#contact" className="inline-block bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-800">Get Your Free AI Audit →</Link>
    </main>
  );
}
