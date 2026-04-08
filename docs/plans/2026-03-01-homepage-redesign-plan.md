# NYClaw.io Homepage Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Apply all approved design improvements to nyclaw.io — brand clarity, conversion hierarchy, visual polish — across nav, hero, sections, and contact form.

**Architecture:** Single-file rewrite of `app/page.tsx` (535 lines). All section changes are applied cohesively. CSS utilities added to `globals.css`. Amber color token added to `tailwind.config.ts`. Blog and layout files updated to match.

**Tech Stack:** Next.js 14 App Router, Tailwind CSS, TypeScript, React hooks (useState only)

---

### Task 1: Add amber color token to Tailwind config

**Files:**
- Modify: `tailwind.config.ts`

**Step 1: Edit tailwind.config.ts**

Replace the `colors` block:
```ts
colors: {
  navy: '#003366',
  'sky-blue': '#0066cc',
  'dark-red': '#c41e3a',
  charcoal: '#2c2c2c',
  amber: '#f59e0b',
},
```

**Step 2: Verify no TypeScript errors**

```bash
cd /Users/gianibrussich/project-claude/nyclaw-website
npx tsc --noEmit
```
Expected: no output (zero errors)

**Step 3: Commit**
```bash
git add tailwind.config.ts
git commit -m "chore: add amber color token to tailwind config"
```

---

### Task 2: Add CSS utilities to globals.css

**Files:**
- Modify: `app/globals.css`

**Step 1: Append to end of globals.css**

```css
/* Amber CTA button */
.btn-amber {
  @apply px-8 py-4 text-white font-bold rounded-lg transition-all duration-300 inline-block;
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  box-shadow: 0 4px 20px rgba(245, 158, 11, 0.4);
  border: 1px solid #f59e0b;
  text-align: center;
}

.btn-amber:hover {
  background: linear-gradient(135deg, #d97706 0%, #b45309 100%);
  box-shadow: 0 8px 30px rgba(245, 158, 11, 0.6);
  transform: translateY(-2px);
}

/* Timeline */
.timeline-connector {
  position: absolute;
  top: 20px;
  left: calc(33.333% + 12px);
  right: calc(33.333% + 12px);
  height: 2px;
  background: linear-gradient(90deg, #0066cc, #003366);
}

/* Form inputs */
.form-input {
  @apply w-full px-4 py-3 rounded-lg bg-white/95 text-charcoal placeholder-gray-400;
  border: 2px solid rgba(255,255,255,0.3);
  focus-ring: none;
  transition: border-color 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: #f59e0b;
}
```

**Step 2: Verify**
```bash
npx tsc --noEmit
```

**Step 3: Commit**
```bash
git add app/globals.css
git commit -m "chore: add btn-amber, timeline, and form-input CSS utilities"
```

---

### Task 3: Rewrite Nav — tagline + amber CTA

**Files:**
- Modify: `app/page.tsx` (lines 43–58)

**Step 1: Replace the `<header>` block with:**

```tsx
<header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
  <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
    {/* Logo + tagline */}
    <div>
      <div className="text-2xl font-bold leading-none">
        <span className="text-navy">NY</span>
        <span className="text-sky-blue">C</span>
        <span className="text-sky-blue">law</span>
        <span className="text-dark-red">.</span>
        <span className="text-navy">io</span>
      </div>
      <div className="text-xs text-charcoal/60 font-medium tracking-wide mt-0.5">
        AI Automation Agency
      </div>
    </div>
    {/* Nav links */}
    <div className="flex items-center gap-6">
      <a href="#services" className="text-charcoal hover:text-sky-blue transition text-sm font-medium">Services</a>
      <a href="#cases" className="text-charcoal hover:text-sky-blue transition text-sm font-medium">Case Studies</a>
      <a href="#contact" className="btn-amber text-sm px-5 py-2.5">Get Started →</a>
    </div>
  </nav>
</header>
```

**Step 2: Verify**
```bash
npx tsc --noEmit
```

**Step 3: Commit**
```bash
git add app/page.tsx
git commit -m "feat: nav — add AI Automation Agency tagline and amber CTA"
```

---

### Task 4: Rewrite Hero — single dominant CTA + Ainsley SVG

**Files:**
- Modify: `app/page.tsx` (lines 60–102)

**Step 1: Add the AinsleySVG component near the top of the file (after the existing icon components):**

```tsx
const AinsleySVG = () => (
  <div className="relative w-24 h-24 mx-auto mb-8">
    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-blue/20 to-navy/20 animate-ping" style={{animationDuration: '3s'}} />
    <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-sky-blue to-navy flex items-center justify-center shadow-lg shadow-sky-blue/30">
      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1 1 .03 2.798-1.414 2.798H4.213c-1.444 0-2.414-1.798-1.414-2.798L4.2 15.3" />
      </svg>
    </div>
  </div>
)
```

**Step 2: Replace the `<section className="gradient-navy-sky ...">` hero block with:**

```tsx
<section className="gradient-navy-sky text-white py-28 px-6 relative overflow-hidden">
  <div className="absolute inset-0 opacity-5">
    <div className="absolute top-10 right-10 w-40 h-40 rounded-full border-2 border-sky-blue animate-pulse" />
    <div className="absolute bottom-10 left-10 w-32 h-32 rounded-full border-2 border-dark-red animate-pulse" style={{animationDelay: '1s'}} />
  </div>
  <div className="max-w-4xl mx-auto text-center relative z-10">
    <AinsleySVG />
    <div className="mb-3 inline-block">
      <span className="text-xs font-bold text-sky-blue/80 uppercase tracking-widest">The Problem</span>
    </div>
    <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
      Scaling kills you.
      <br />
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-blue to-white">
        Manual work kills profit.
      </span>
    </h1>
    <p className="text-lg text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed">
      You're juggling everything: content, code, marketing, revenue tracking, affiliate optimization.
      You need to scale but you can't clone yourself.
    </p>
    <div className="mb-6">
      <span className="text-xs font-bold text-amber uppercase tracking-widest">The Solution</span>
      <h2 className="text-2xl font-bold mt-2 text-white mb-3">Meet Ainsley — your AI entrepreneur</h2>
      <p className="text-base text-gray-300 max-w-xl mx-auto">
        Running 24/7 on Mac Studio. Full control of websites, email, Stripe, and operations.{' '}
        <strong className="text-white">Building real revenue. Proving what's possible.</strong>
      </p>
    </div>
    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
      <a href="#contact" className="btn-amber text-lg px-8 py-4">
        Build My AI →
      </a>
      <a href="#cases" className="px-8 py-4 bg-white/10 text-white font-bold rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/30 inline-block">
        See the Proof
      </a>
    </div>
  </div>
</section>
```

**Step 3: Verify**
```bash
npx tsc --noEmit
```

**Step 4: Commit**
```bash
git add app/page.tsx
git commit -m "feat: hero — amber CTA, Ainsley SVG avatar, cleaner layout"
```

---

### Task 5: Rewrite Comparison section — stats first

**Files:**
- Modify: `app/page.tsx` (lines 104–155)

**Step 1: Replace the entire `<section className="py-24 px-6 bg-white">` comparison block with:**

```tsx
<section className="py-24 px-6 bg-white">
  <div className="max-w-6xl mx-auto">
    {/* Stats row — leads the section */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
      {[
        { number: '8x', label: 'More Productivity' },
        { number: '∞', label: 'Parallel Projects' },
        { number: '24/7', label: 'Revenue Generation' },
        { number: '10x', label: 'Faster Scaling' },
      ].map((stat, i) => (
        <div key={i} className="text-center py-8 px-4 bg-gradient-to-b from-sky-blue/5 to-white rounded-2xl border border-sky-blue/10">
          <div className="text-5xl font-extrabold text-sky-blue mb-2 leading-none">{stat.number}</div>
          <div className="text-sm font-semibold text-charcoal/70 uppercase tracking-wide">{stat.label}</div>
        </div>
      ))}
    </div>

    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold text-navy mb-3">Without AI vs With Ainsley</h2>
      <p className="text-lg text-charcoal/70">See what changes when you have an AI entrepreneur doing the work</p>
    </div>

    <div className="grid md:grid-cols-2 gap-8">
      {/* Without */}
      <div className="bg-red-50 border-2 border-red-100 rounded-2xl p-8">
        <h3 className="text-xl font-bold text-charcoal mb-6 flex items-center gap-2">
          <span className="text-red-500">✕</span> Without AI
        </h3>
        <ul className="space-y-4">
          {['You handle everything', '40 hours/week on operations', 'Manual revenue tracking (spreadsheets)', 'Content creation takes weeks', 'One business max', 'Sleep required — you lose productivity'].map((item, i) => (
            <li key={i} className="flex gap-3 text-charcoal/80 text-sm">
              <span className="text-red-400 font-bold flex-shrink-0 mt-0.5">–</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* With Ainsley */}
      <div className="bg-sky-blue/5 border-2 border-sky-blue/30 rounded-2xl p-8">
        <h3 className="text-xl font-bold text-navy mb-6 flex items-center gap-2">
          <span className="text-sky-blue">✓</span> With Ainsley
        </h3>
        <ul className="space-y-4">
          {['AI handles execution', '5 hours/week on strategy', 'Real-time revenue dashboard', 'Content produced daily', 'Multiple businesses simultaneously', '24/7 productivity — AI never sleeps'].map((item, i) => (
            <li key={i} className="flex gap-3 text-charcoal/80 text-sm">
              <span className="text-sky-blue font-bold flex-shrink-0 mt-0.5">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
</section>
```

**Step 2: Verify**
```bash
npx tsc --noEmit
```

**Step 3: Commit**
```bash
git add app/page.tsx
git commit -m "feat: comparison section — stats promoted to section header"
```

---

### Task 6: Rewrite "What We're Building" cards — revenue as headline

**Files:**
- Modify: `app/page.tsx` (lines 157–208)

**Step 1: Replace the entire `<section className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white">` block with:**

```tsx
<section className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white">
  <div className="max-w-6xl mx-auto">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-navy mb-3">What We're Building Right Now</h2>
      <p className="text-lg text-charcoal/70">Real businesses. Real revenue potential. Real proof.</p>
    </div>
    <div className="grid md:grid-cols-3 gap-8 mb-12">
      {[
        { title: 'Rumble Simulator', status: '🟢 Live', revenue: '$500–2K', period: '/month', label: 'Sports Betting Affiliates' },
        { title: 'Sarah Influencer', status: '🟡 Launching', revenue: '$1–5K', period: '/month', label: 'AI Characters · Dual Brand' },
        { title: 'Property Appraisal Pro', status: '🟡 SaaS Ready', revenue: '$2–10K', period: '/month', label: 'USPAP · Freemium SaaS' },
      ].map((project, i) => (
        <div key={i} className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-sky-blue hover:shadow-lg transition-all duration-300">
          <div className="flex justify-between items-start mb-5">
            <h3 className="text-base font-bold text-navy">{project.title}</h3>
            <span className="text-xs font-medium text-charcoal/60 bg-gray-50 px-2 py-1 rounded-full">{project.status}</span>
          </div>
          <div className="mb-2">
            <span className="text-4xl font-extrabold text-sky-blue">{project.revenue}</span>
            <span className="text-lg font-bold text-charcoal/50">{project.period}</span>
          </div>
          <p className="text-xs text-charcoal/60 font-medium uppercase tracking-wide">{project.label}</p>
        </div>
      ))}
    </div>
  </div>
</section>
```

**Step 2: Directly after that section, add the standalone 30-days banner:**

```tsx
{/* 30-Day Proof Banner */}
<section className="bg-navy text-white py-20 px-6">
  <div className="max-w-3xl mx-auto text-center">
    <p className="text-sky-blue font-bold uppercase tracking-widest text-sm mb-4">The Proof</p>
    <p className="text-5xl font-extrabold mb-4">3 businesses.<br />30 days.</p>
    <p className="text-xl text-gray-300 mb-8">All generating revenue. Multi-stream is possible.</p>
    <a href="#contact" className="btn-amber inline-block px-10 py-4 text-lg">
      Build Mine →
    </a>
  </div>
</section>
```

**Step 3: Verify**
```bash
npx tsc --noEmit
```

**Step 4: Commit**
```bash
git add app/page.tsx
git commit -m "feat: project cards — revenue as headline; add standalone 30-day proof banner"
```

---

### Task 7: Rewrite Services cards — pricing at top, updated CTAs

**Files:**
- Modify: `app/page.tsx` (lines 210–307)

**Step 1: Replace the entire `<section id="services" ...>` block with:**

```tsx
<section id="services" className="py-24 px-6 bg-white">
  <div className="max-w-6xl mx-auto">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-navy mb-3">Pick Your Path</h2>
      <p className="text-lg text-charcoal/70">Two proven models. Both building real revenue.</p>
    </div>
    <div className="grid md:grid-cols-2 gap-8">
      {/* Service 1: AI Setup Agency */}
      <div className="card-hover min-h-[600px] flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-sky-blue text-white flex items-center justify-center text-lg">⚙️</div>
          <span className="text-xs font-bold text-sky-blue uppercase tracking-wider">Service 1</span>
        </div>
        <h3 className="text-2xl font-bold text-navy mb-1">AI Setup Agency</h3>
        <p className="text-sky-blue font-bold mb-4 text-sm">Stop managing. Start scaling.</p>

        {/* Pricing — now at top */}
        <div className="bg-sky-blue/8 border border-sky-blue/20 rounded-xl p-4 mb-6">
          <div className="flex items-baseline gap-1 mb-1">
            <span className="text-2xl font-extrabold text-navy">$2K–5K</span>
            <span className="text-sm text-charcoal/60">setup</span>
          </div>
          <p className="text-xs text-charcoal/60 mb-3">Initial configuration + training</p>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-extrabold text-sky-blue">$99–250</span>
            <span className="text-sm text-charcoal/60">/mo ongoing</span>
          </div>
        </div>

        <p className="text-charcoal/80 text-sm mb-6 leading-relaxed">
          We design, build, and manage a custom AI entrepreneur for your business. 24/7 operations. Real revenue tracking. Zero manual work.
        </p>
        <div className="p-4 bg-gray-50 rounded-xl mb-6">
          <h4 className="font-bold text-navy text-sm mb-3">Includes:</h4>
          <ul className="space-y-2">
            {['Custom AI setup on your hardware', 'Revenue tracking dashboard (real-time)', '24/7 management & optimization', 'Monthly strategy sessions'].map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-charcoal/80">
                <CheckIcon /> {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-auto">
          <a href="#contact" className="btn-amber w-full text-center block py-4">Build My AI Setup →</a>
        </div>
      </div>

      {/* Service 2: AI Marketing Agency */}
      <div className="card-hover min-h-[600px] flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-dark-red text-white flex items-center justify-center text-lg">📱</div>
          <span className="text-xs font-bold text-dark-red uppercase tracking-wider">Service 2</span>
        </div>
        <h3 className="text-2xl font-bold text-navy mb-1">AI Marketing Agency</h3>
        <p className="text-dark-red font-bold mb-4 text-sm">Build influencers that generate revenue.</p>

        {/* Pricing — now at top */}
        <div className="bg-dark-red/5 border border-dark-red/20 rounded-xl p-4 mb-6">
          <p className="text-xs font-bold text-navy mb-2 uppercase tracking-wide">Pricing</p>
          <p className="text-sm text-charcoal/80 mb-2">
            <strong>Option A:</strong> Revenue share — 20–30% of affiliate earnings
          </p>
          <p className="text-sm text-charcoal/80">
            <strong>Option B:</strong> Fixed monthly + profit share
          </p>
        </div>

        <p className="text-charcoal/80 text-sm mb-6 leading-relaxed">
          We create, manage, and monetize AI characters that build audiences and generate revenue through affiliates, UGC, and brand deals.
        </p>
        <div className="p-4 bg-gray-50 rounded-xl mb-6">
          <h4 className="font-bold text-navy text-sm mb-3">Includes:</h4>
          <ul className="space-y-2">
            {['AI character design & personality', 'Daily UGC production', 'Multi-platform content strategy', 'Affiliate optimization & testing'].map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-charcoal/80">
                <CheckIcon /> {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-auto">
          <a href="#contact" className="btn-amber w-full text-center block py-4">Start My AI Brand →</a>
        </div>
      </div>
    </div>
  </div>
</section>
```

**Step 2: Verify**
```bash
npx tsc --noEmit
```

**Step 3: Commit**
```bash
git add app/page.tsx
git commit -m "feat: services — pricing moved to top, amber CTAs"
```

---

### Task 8: Rewrite Project cards — SVG art headers

**Files:**
- Modify: `app/page.tsx` (lines 309–403)

**Step 1: Replace the three project card `div` elements (the card headers with emoji only) inside the `<section id="cases">` block.

Replace the entire `<section id="cases" ...>` block with:**

```tsx
<section id="cases" className="py-24 px-6 bg-gray-50">
  <div className="max-w-6xl mx-auto">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-navy mb-3">Real Projects. Real Revenue.</h2>
      <p className="text-lg text-charcoal/70">Built in 30 days. Proving the model works.</p>
    </div>
    <div className="grid md:grid-cols-3 gap-8">
      {/* Rumble Simulator */}
      <div className="card hover:border-sky-blue group min-h-[460px] flex flex-col">
        <div className="mb-6 h-36 bg-gradient-to-br from-sky-blue to-navy rounded-xl flex flex-col items-center justify-center group-hover:shadow-lg transition-all relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-2 right-2 w-16 h-16 rounded-full border border-white" />
            <div className="absolute bottom-2 left-2 w-10 h-10 rounded-full border border-white" />
          </div>
          <svg className="w-10 h-10 text-white mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.25 6.087c0-.355.186-.676.401-.959C15.488 4.049 16.089 3 16.089 3M9.75 6.087c0-.355-.186-.676-.401-.959C8.512 4.049 7.911 3 7.911 3M12 18.75a6 6 0 006-6 6 6 0 00-6-6 6 6 0 00-6 6 6 0 006 6z" />
          </svg>
          <p className="text-white text-sm font-bold">Rumble Simulator</p>
          <span className="text-xs text-sky-blue/80 bg-white/10 px-2 py-0.5 rounded-full mt-1">Affiliate</span>
        </div>
        <h3 className="text-lg font-bold text-navy mb-2">Affiliate Monetization</h3>
        <p className="text-sm text-charcoal/70 mb-4 flex-1">
          Sports draft tool converting users to sports betting affiliates (BetMGM live, DraftKings pending).
        </p>
        <div className="space-y-1.5 mb-5">
          <div className="text-xs text-charcoal/60"><span className="font-semibold text-sky-blue">Status:</span> 🟢 Live</div>
          <div className="text-xs text-charcoal/60"><span className="font-semibold text-sky-blue">Model:</span> Affiliate CTA</div>
          <div className="text-xs font-bold text-dark-red">$500–2K/mo potential</div>
        </div>
        <a href="#contact" className="btn-primary text-sm text-center block py-3">View Details</a>
      </div>

      {/* Sarah Influencer */}
      <div className="card hover:border-dark-red group min-h-[460px] flex flex-col">
        <div className="mb-6 h-36 bg-gradient-to-br from-dark-red to-charcoal rounded-xl flex flex-col items-center justify-center group-hover:shadow-lg transition-all relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-2 right-2 w-16 h-16 rounded-full border border-white" />
            <div className="absolute bottom-2 left-2 w-10 h-10 rounded-full border border-white" />
          </div>
          <svg className="w-10 h-10 text-white mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
          <p className="text-white text-sm font-bold">Sarah Influencer</p>
          <span className="text-xs text-red-200 bg-white/10 px-2 py-0.5 rounded-full mt-1">AI Character</span>
        </div>
        <h3 className="text-lg font-bold text-navy mb-2">AI Marketing Agency</h3>
        <p className="text-sm text-charcoal/70 mb-4 flex-1">
          Dual-account fitness influencer with AI UGC, supplement affiliates, and daily content production.
        </p>
        <div className="space-y-1.5 mb-5">
          <div className="text-xs text-charcoal/60"><span className="font-semibold text-dark-red">Status:</span> 🟡 Launching</div>
          <div className="text-xs text-charcoal/60"><span className="font-semibold text-dark-red">Model:</span> Multi-affiliate</div>
          <div className="text-xs font-bold text-dark-red">$1–5K/mo potential</div>
        </div>
        <a href="#contact" className="btn-primary text-sm text-center block py-3">View Details</a>
      </div>

      {/* Property Appraisal Pro */}
      <div className="card hover:border-sky-blue group min-h-[460px] flex flex-col">
        <div className="mb-6 h-36 bg-gradient-to-br from-sky-blue/80 to-charcoal rounded-xl flex flex-col items-center justify-center group-hover:shadow-lg transition-all relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-2 right-2 w-16 h-16 rounded-full border border-white" />
            <div className="absolute bottom-2 left-2 w-10 h-10 rounded-full border border-white" />
          </div>
          <svg className="w-10 h-10 text-white mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
          <p className="text-white text-sm font-bold">Property Appraisal Pro</p>
          <span className="text-xs text-sky-blue/80 bg-white/10 px-2 py-0.5 rounded-full mt-1">SaaS</span>
        </div>
        <h3 className="text-lg font-bold text-navy mb-2">SaaS Infrastructure</h3>
        <p className="text-sm text-charcoal/70 mb-4 flex-1">
          USPAP-compliant appraisal tool with OAuth, freemium tier, and AI-powered adjustment suggestions.
        </p>
        <div className="space-y-1.5 mb-5">
          <div className="text-xs text-charcoal/60"><span className="font-semibold text-sky-blue">Status:</span> 🟡 Ready</div>
          <div className="text-xs text-charcoal/60"><span className="font-semibold text-sky-blue">Model:</span> Freemium SaaS</div>
          <div className="text-xs font-bold text-dark-red">$2–10K/mo potential</div>
        </div>
        <a href="#contact" className="btn-primary text-sm text-center block py-3">View Details</a>
      </div>
    </div>

    {/* The Experiment — Timeline */}
    <div className="mt-16 bg-white border border-gray-100 rounded-2xl p-10">
      <h3 className="text-2xl font-bold text-navy mb-10 text-center">The Experiment</h3>
      <div className="relative">
        {/* Connector line */}
        <div className="hidden md:block absolute top-5 left-[16.67%] right-[16.67%] h-0.5 bg-gradient-to-r from-sky-blue via-navy to-sky-blue opacity-30" />
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {[
            { date: 'Feb 25', label: 'Discovery', desc: 'Giani discovered OpenClaw and decided to prove AI could build real businesses.' },
            { date: 'Feb 25–27', label: '48 Hours', desc: 'Ainsley designed and launched 3 different business models across different verticals.' },
            { date: 'Feb 28', label: 'Revenue Ready', desc: 'All 3 projects have infrastructure, monetization, and are ready for revenue.' },
          ].map((step, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-sky-blue text-white flex items-center justify-center font-bold text-xs mb-3 relative z-10 shadow-md shadow-sky-blue/30">
                {i + 1}
              </div>
              <p className="text-xs font-bold text-sky-blue uppercase tracking-wider mb-1">{step.date}</p>
              <p className="text-base font-bold text-navy mb-2">{step.label}</p>
              <p className="text-sm text-charcoal/70 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <p className="text-center mt-10 text-sky-blue font-bold">
        The insight: Speed matters. Multi-stream revenue matters. AI execution matters.
      </p>
    </div>
  </div>
</section>
```

**Step 2: Verify**
```bash
npx tsc --noEmit
```

**Step 3: Commit**
```bash
git add app/page.tsx
git commit -m "feat: project cards — SVG art headers, experiment timeline"
```

---

### Task 9: Replace Playbook section with email capture

**Files:**
- Modify: `app/page.tsx` (lines 406–449)

**Step 1: Add `playlistEmail` state to the existing useState block at top of component:**

```tsx
const [playbookEmail, setPlaybookEmail] = useState('')
const [playbookSubmitted, setPlaybookSubmitted] = useState(false)
```

**Step 2: Replace the entire `<section className="py-24 px-6 bg-gradient-to-b from-white to-sky-blue/5">` Playbook block with:**

```tsx
<section className="py-24 px-6 bg-gradient-to-b from-white to-sky-blue/5">
  <div className="max-w-2xl mx-auto text-center">
    <h2 className="text-4xl font-bold text-navy mb-3">The Playbook</h2>
    <p className="text-lg text-charcoal/70 mb-12">
      SOPs, setup guides, and revenue strategies — documented as we build. Get early access.
    </p>
    <div className="bg-white border-2 border-sky-blue/20 rounded-2xl p-10 shadow-sm">
      {playbookSubmitted ? (
        <div className="py-4">
          <div className="text-4xl mb-4">✓</div>
          <h3 className="text-xl font-bold text-navy mb-2">You're on the list.</h3>
          <p className="text-charcoal/70 text-sm">We'll send you the first guide when it drops.</p>
        </div>
      ) : (
        <>
          <h3 className="text-xl font-bold text-navy mb-2">Get the Playbook</h3>
          <p className="text-sm text-charcoal/70 mb-6">
            How to Set Up Your AI · Building AI Influencers · Monetizing Tools · Multi-Stream Revenue
          </p>
          <form
            onSubmit={(e) => { e.preventDefault(); setPlaybookSubmitted(true) }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              required
              value={playbookEmail}
              onChange={(e) => setPlaybookEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-sky-blue focus:outline-none text-charcoal text-sm"
            />
            <button type="submit" className="btn-amber px-6 py-3 text-sm whitespace-nowrap">
              Get Early Access →
            </button>
          </form>
          <p className="text-xs text-charcoal/40 mt-3">No spam. Just the real SOPs we use.</p>
        </>
      )}
    </div>
  </div>
</section>
```

**Step 3: Verify**
```bash
npx tsc --noEmit
```

**Step 4: Commit**
```bash
git add app/page.tsx
git commit -m "feat: replace broken playbook with email capture"
```

---

### Task 10: Update Contact form — styled inputs, amber submit

**Files:**
- Modify: `app/page.tsx` (lines 451–527)

**Step 1: In the contact form, update the submit button:**

Replace:
```tsx
<button
  type="submit"
  className="w-full bg-sky-blue hover:bg-dark-red text-white font-bold py-4 rounded-lg transition-all duration-300 text-lg"
>
  Schedule Consultation
</button>
```

With:
```tsx
<button
  type="submit"
  className="w-full btn-amber py-4 text-lg"
>
  Claim My Spot →
</button>
```

**Step 2: Update the 3 `<input>` and `<textarea>` elements — add `border-2 border-white/20 focus:border-amber` styling:**

Replace each input's className from:
```tsx
className="w-full px-4 py-3 rounded-lg bg-white/95 text-charcoal focus:outline-none focus:ring-2 focus:ring-sky-blue placeholder-gray-400"
```
With:
```tsx
className="w-full px-4 py-3 rounded-lg bg-white/95 text-charcoal border-2 border-white/20 focus:border-amber focus:outline-none placeholder-gray-400 transition-colors"
```

Do the same for the `<select>` and `<textarea>`.

**Step 3: Verify**
```bash
npx tsc --noEmit
```

**Step 4: Commit**
```bash
git add app/page.tsx
git commit -m "feat: contact form — amber submit, styled inputs"
```

---

### Task 11: Update blog/page.tsx and layout.tsx

**Files:**
- Modify: `app/blog/page.tsx`
- Modify: `app/layout.tsx`

**Step 1: In blog/page.tsx, update the logo to match new nav style (add tagline):**

Replace:
```tsx
<a href="/" className="text-2xl font-bold">
  <span className="text-navy">NYC</span>
  <span className="text-sky-blue">law</span>
</a>
```
With:
```tsx
<a href="/" className="block">
  <div className="text-2xl font-bold leading-none">
    <span className="text-navy">NY</span>
    <span className="text-sky-blue">C</span>
    <span className="text-sky-blue">law</span>
    <span className="text-dark-red">.</span>
    <span className="text-navy">io</span>
  </div>
  <div className="text-xs text-charcoal/60 font-medium tracking-wide mt-0.5">
    AI Automation Agency
  </div>
</a>
```

**Step 2: In layout.tsx, update the meta title and description:**

```tsx
export const metadata: Metadata = {
  title: 'NYClaw.io — AI Automation Agency',
  description: 'Build AI businesses, automate your operations, and scale revenue with Ainsley. AI setup, AI influencer marketing, and custom AI solutions for founders.',
  keywords: 'AI automation, AI agency, OpenClaw, AI business, Ainsley, AI influencer',
}
```

**Step 3: Verify**
```bash
npx tsc --noEmit
```

**Step 4: Commit**
```bash
git add app/blog/page.tsx app/layout.tsx
git commit -m "chore: update blog logo and meta tags to match redesign"
```

---

### Task 12: Final build verification

**Step 1: Full TypeScript check**
```bash
cd /Users/gianibrussich/project-claude/nyclaw-website
npx tsc --noEmit
```
Expected: no errors

**Step 2: Production build**
```bash
npm run build
```
Expected: exits 0, no errors

**Step 3: Verify dev server visually**
```bash
npm run dev
```
Navigate to http://localhost:3000 and verify:
- Nav shows "AI Automation Agency" tagline and amber "Get Started →" button
- Hero shows Ainsley SVG, amber "Build My AI →" primary CTA
- Stats row appears before comparison cards
- Revenue numbers are the visual focal point in "What We're Building"
- Dark "3 businesses. 30 days." standalone banner appears
- Services show pricing at top of each card
- Project cards have SVG art headers (no emoji-only)
- Experiment section shows 3-step horizontal timeline
- Playbook section shows email capture (no blog links)
- Contact submit button says "Claim My Spot →" in amber

**Step 4: Final commit**
```bash
git add -A
git commit -m "feat: nyclaw.io homepage redesign — brand clarity, conversion hierarchy, visual polish"
```

**Step 5: Push**
```bash
git push origin main
```
