import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Workflow Automation for Small Businesses — Westchester NY",
  description: "NYClaw.io builds custom AI automation systems for small businesses in Westchester County, NY. Automate scheduling, follow-ups, lead intake, and more. Free audit.",
};

export default function AIAutomationPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-4">AI Workflow Automation for Small Businesses</h1>
      <p className="text-lg text-gray-600 mb-2">Serving Westchester County, NY · NYC · Hudson Valley</p>
      <p className="text-lg text-gray-700 mb-8">Stop paying people to do work AI can handle. We map your workflows, identify what can be automated, and build AI systems that run 24/7 without adding headcount.</p>

      <h2 className="text-2xl font-semibold mb-3">What We Automate</h2>
      <ul className="list-disc pl-6 mb-8 space-y-2 text-gray-700">
        <li>Lead intake and qualification — capture and score every inquiry automatically</li>
        <li>Follow-up sequences — automated, personalized follow-ups via email or SMS</li>
        <li>Appointment scheduling — no more back-and-forth booking</li>
        <li>Customer onboarding — documents, intake forms, welcome sequences</li>
        <li>Invoicing and payment reminders — reduce late payments automatically</li>
        <li>Review requests — automated post-job review outreach</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-3">Who We Work With</h2>
      <p className="text-gray-700 mb-3">We specialize in service businesses with repetitive, time-consuming operations:</p>
      <ul className="list-disc pl-6 mb-8 space-y-1 text-gray-700">
        <li>Law firms and solo attorneys</li>
        <li>Dental and medical practices</li>
        <li>Real estate agents and brokers</li>
        <li>Plumbers, HVAC, and contractors</li>
        <li>Auto dealers and service centers</li>
        <li>Any service business spending 10+ hours/week on admin</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-3">How It Works</h2>
      <ol className="list-decimal pl-6 mb-8 space-y-2 text-gray-700">
        <li><strong>Free AI Audit</strong> — We map your current workflows and identify automation opportunities</li>
        <li><strong>Build</strong> — We design and build your custom AI automation system (1–2 weeks)</li>
        <li><strong>Deploy</strong> — We connect it to your existing tools. No disruption, no retraining</li>
        <li><strong>Optimize</strong> — Monthly check-ins to tune performance and add new automations</li>
      </ol>

      <div className="bg-gray-50 rounded-xl p-6 mb-8">
        <p className="font-semibold mb-2">Typical results for Westchester small businesses:</p>
        <ul className="space-y-1 text-gray-700">
          <li>✓ 15–20 hours/week recovered from manual tasks</li>
          <li>✓ 3x faster lead response time</li>
          <li>✓ 40–60% reduction in no-shows and dropped leads</li>
        </ul>
      </div>

      <Link href="/#contact" className="inline-block bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-800">Get Your Free AI Audit →</Link>
    </main>
  );
}
