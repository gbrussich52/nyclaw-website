import type { Metadata } from 'next'
import {
  UtensilsCrossed,
  Stethoscope,
  Scale,
  Wrench,
  Scissors,
  Dumbbell,
  Home,
  Car,
  ShieldCheck,
  Church,
  ShieldAlert,
} from 'lucide-react'
import { FAQJsonLd, SoftwareApplicationJsonLd } from '../components/JsonLd'
import DeliverablesChecklist from '../components/DeliverablesChecklist'
import FaqSection from '../components/FaqSection'
import CtaPanel from '../components/CtaPanel'

const GITHUB_URL = 'https://github.com/gbrussich52/mainstreet-mcp'

export const metadata: Metadata = {
  title: 'Free AI Starter Kit for Small Business',
  description:
    'A free starter kit that lets Claude or ChatGPT answer customer questions from your real business information — hours, services, prices, FAQs and policies. Ten industry versions, built by NYClaw.io.',
  keywords:
    'AI starter kit small business, MCP server small business, Claude business assistant, ChatGPT business assistant, Main Street MCP, free AI tool small business',
  openGraph: {
    title: 'Free AI Starter Kit for Small Business | NYClaw.io',
    description:
      'Fill in one file with your hours, services, prices, FAQs and policies. Claude or ChatGPT answers customer questions from your real information instead of guessing.',
    url: 'https://nyclaw.io/free-ai-starter-kit',
    siteName: 'NYClaw.io',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free AI Starter Kit for Small Business | NYClaw.io',
    description:
      'A free starter kit so Claude or ChatGPT can answer from your real business information, not a guess.',
  },
  alternates: {
    canonical: 'https://nyclaw.io/free-ai-starter-kit',
  },
}

const whatItDoes = [
  'Hours and whether you’re open right now, computed live',
  'Services and price ranges',
  'FAQs and policies, answered exactly as you wrote them',
  'Staff names and specialties',
  'Your booking link, surfaced when someone asks to schedule',
  'Anything else routed to a real contact, not invented',
]

const kits = [
  { Icon: UtensilsCrossed, name: 'Restaurant', line: 'Menu with dietary filters — gluten-free, vegan, nut-free, called out per dish.' },
  { Icon: Stethoscope, name: 'Dental', line: 'Insurance accepted and price ranges. No health details are collected or stored.' },
  { Icon: Scale, name: 'Law firm', line: 'Practice areas and how the firm works. Answers are never legal advice.' },
  { Icon: Wrench, name: 'Home services (plumbing/HVAC)', line: 'Service area and ballpark estimates, not a final quote.' },
  { Icon: Scissors, name: 'Salon & spa', line: 'Price ranges by service, plus the current class or appointment schedule.' },
  { Icon: Dumbbell, name: 'Fitness studio', line: 'Class schedule, so members and prospects get today’s times without calling.' },
  { Icon: Home, name: 'Real estate', line: 'Active listings and service area, kept to what the agent has published.' },
  { Icon: Car, name: 'Auto repair', line: 'Estimate ranges and which insurance providers the shop works with.' },
  { Icon: ShieldCheck, name: 'Insurance agency', line: 'Coverage lines the agency writes. It never binds or quotes actual coverage.' },
  { Icon: Church, name: 'Church', line: 'Service times, staff, and how to reach the office.' },
]

const steps = [
  {
    n: '1',
    title: 'Run the setup command',
    body: 'Pick the industry pack that matches your business.',
    code: 'npx mainstreet-mcp init --industry dental',
  },
  {
    n: '2',
    title: 'Edit business.yaml',
    body: 'One plain-text file. Fill in your hours, services, prices, FAQs and policies.',
    code: null,
  },
  {
    n: '3',
    title: 'Add it to Claude or ChatGPT',
    body: 'Point the assistant at the file. From then on it answers from what you wrote, not a guess.',
    code: null,
  },
]

const faqs = [
  {
    question: 'Is this actually free?',
    answer:
      'Yes. The starter kit and all ten industry packs are open source on GitHub, free to download and use. There is no paid tier to unlock the base functionality.',
  },
  {
    question: 'Do I need to know how to code?',
    answer:
      'No coding. You run one setup command once, then edit a plain-text file (business.yaml) the same way you’d edit a spreadsheet — filling in your hours, services, prices and FAQs.',
  },
  {
    question: 'What does the AI assistant actually see?',
    answer:
      'Only what you put in business.yaml. It does not browse your website, your POS, or your calendar unless you connect those separately. It answers strictly from the file you control.',
  },
  {
    question: 'Can it make up prices or policies I never gave it?',
    answer:
      'No. The kit is built to answer from your file or say it doesn’t know — not to invent an answer. Industry packs add extra limits on top, like dental never collecting health details or insurance never binding coverage.',
  },
  {
    question: 'What if I want it connected to my calendar, POS or CRM?',
    answer:
      'The free kit answers questions from a file you maintain by hand. If you want it reading live availability, syncing bookings, or pulling from your existing systems, that’s a build — reach out and we’ll scope it.',
  },
]

export default function FreeAIStarterKitPage() {
  return (
    <>
      <SoftwareApplicationJsonLd
        name="Main Street MCP"
        description="Free, open-source starter kit that lets Claude, ChatGPT and other AI assistants answer small-business customer questions from the owner's own hours, services, prices, FAQs and policies."
        url="https://nyclaw.io/free-ai-starter-kit"
      />
      <FAQJsonLd items={faqs} />

      {/* ---------------------------------------------------------- Hero --- */}
      <section className="relative isolate overflow-hidden px-6 pb-20 pt-16 text-center">
        <div className="bloom-indigo pointer-events-none absolute -top-[18rem] left-1/2 -z-10 h-[46rem] w-[52rem] -translate-x-1/2 rounded-full" />
        <div className="hero-grid pointer-events-none absolute inset-0 -z-10" />

        <div className="mx-auto flex max-w-[52rem] flex-col items-center">
          <div className="inline-flex h-7 items-center gap-2 rounded-full px-3.5 text-xs font-medium text-zinc-300 outline outline-1 outline-white/[0.12] [background:color-mix(in_oklab,#27272a_55%,#000)]">
            <span className="inline-block h-[5px] w-[5px] rounded-full bg-cyan-400" />
            Free &amp; open source
          </div>

          <h1 className="mt-6 text-balance text-[clamp(2.5rem,5.5vw,3.75rem)] font-normal leading-[1.06] tracking-[-0.03em] text-white">
            Your business, answerable
            <br />
            <span className="text-gradient-ai">by AI assistants</span>
          </h1>

          <p className="mt-6 max-w-[38rem] text-[17px] leading-relaxed text-zinc-300">
            A free starter kit: fill in one file with your hours, services, prices, FAQs and
            policies, and Claude or ChatGPT can answer customer questions from your real
            information instead of guessing.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-1 rounded-full bg-white pl-5 pr-4 text-base font-medium text-zinc-950 shadow-[0_1px_2px_rgba(0,0,0,.2)] transition-opacity hover:opacity-90"
            >
              Get the free kit
            </a>
            <a
              href="/#contact"
              className="inline-flex h-12 items-center rounded-full px-5 text-base font-medium text-white outline outline-1 outline-white/[0.18] transition-colors hover:bg-white/5"
            >
              Want it connected to your calendar, POS or CRM? We build that.
            </a>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- What it does --- */}
      <DeliverablesChecklist
        title="What it does"
        blurb="One file becomes the source of truth. The assistant answers from it and nothing else."
        items={whatItDoes}
      />

      {/* ------------------------------------------------------ 10 kits --- */}
      <section className="px-6 pb-24">
        <div className="mx-auto flex max-w-[64rem] flex-col gap-10">
          <div className="mx-auto flex max-w-[38rem] flex-col gap-5 text-center">
            <h2 className="text-balance text-[clamp(2rem,4vw,2.75rem)] font-medium leading-[1.12] tracking-[-0.025em] text-white">
              Ten industry kits
            </h2>
            <p className="text-[17px] leading-relaxed text-zinc-300">
              Each pack starts from the base kit and adds the fields and limits that industry
              actually needs.
            </p>
          </div>

          <div className="hairline-grid grid overflow-hidden rounded-sm border border-white/10 sm:grid-cols-2">
            {kits.map(({ Icon, name, line }) => (
              <div key={name} className="flex flex-col gap-3 p-8">
                <div className="flex items-center gap-2">
                  <Icon size={16} strokeWidth={1.75} className="text-white" aria-hidden="true" />
                  <h3 className="text-sm font-medium text-white">{name}</h3>
                </div>
                <p className="text-sm leading-relaxed text-zinc-400">{line}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- 3-step setup --- */}
      <section className="px-6 pb-24">
        <div className="mx-auto flex max-w-[56rem] flex-col gap-10">
          <div className="mx-auto flex max-w-[38rem] flex-col gap-5 text-center">
            <h2 className="text-balance text-[clamp(2rem,4vw,2.75rem)] font-medium leading-[1.12] tracking-[-0.025em] text-white">
              Set up in three steps
            </h2>
            <p className="text-[17px] leading-relaxed text-zinc-300">
              Takes about fifteen minutes the first time.
            </p>
          </div>

          <div className="flex flex-col gap-5">
            {steps.map((step) => (
              <div key={step.n} className="panel flex flex-col gap-3 rounded-xl p-7 sm:flex-row sm:items-start sm:gap-6">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/[0.07] text-sm font-medium text-white">
                  {step.n}
                </span>
                <div className="flex flex-1 flex-col gap-2">
                  <h3 className="text-base font-medium text-white">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-zinc-400">{step.body}</p>
                  {step.code ? (
                    <code className="mt-1 inline-block w-fit rounded-md border border-white/10 bg-black/40 px-3.5 py-2 font-mono text-[13px] text-cyan-300">
                      {step.code}
                    </code>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ Privacy --- */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-[56rem]">
          <div className="panel flex flex-col gap-5 rounded-2xl p-8 sm:flex-row sm:items-start sm:gap-6">
            <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-white/[0.07] text-white">
              <ShieldAlert size={17} strokeWidth={1.75} aria-hidden="true" />
            </span>
            <div className="flex flex-col gap-2">
              <h3 className="text-base font-medium text-white">Privacy guardrails built in</h3>
              <p className="text-sm leading-relaxed text-zinc-300">
                The assistant only answers from what you put in business.yaml, and says it
                doesn&apos;t know rather than guessing. It never asks for or stores customer
                health details, payment information, or legal or medical advice. Each industry
                pack adds its own limits on top &mdash; dental never collects health information,
                insurance never binds coverage, law firm answers are never legal advice.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FaqSection
        blurb="What business owners ask before they install it."
        items={faqs}
      />

      <CtaPanel
        title="Give your customers a real answer"
        blurb="Free to download, ten industries to choose from, running in about fifteen minutes."
        primary={{ label: 'Get the free kit', href: GITHUB_URL, external: true }}
        secondary={{ label: 'We build the connected version', href: '/#contact' }}
      />
    </>
  )
}
