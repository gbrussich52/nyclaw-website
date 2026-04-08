# CLAUDE-MIGRATION-WORKSHOP-OUTLINES.md
## NYClaw.io — Workshop Agendas
### Free Discovery (30 min) + Paid On-Site (4 hours)

---

# WORKSHOP 1: FREE STRATEGY SESSION (30 Minutes)
**Format:** Video call (Zoom/Google Meet)
**Attendees:** Sales Manager or GM (decision-maker only)
**Goal:** Understand their current AI usage, identify chaos points, and close the paid workshop

---

## Pre-Call Prep (You, 15 minutes before)

Run a quick Google/LinkedIn audit on the dealership:
- How many sales reps on LinkedIn?
- Any AI tools mentioned in job postings?
- Google reviews — do customers mention fast follow-up or slow response? (pain indicator)
- Check if they have a BDC (Business Development Center) — if yes, automation angle is bigger
- Look up their DMS/CRM if visible (VinSolutions, DealerSocket, CDK = common)

Have this on hand: a 5-minute live demo of Claude with a sample auto sales Project already set up (fake dealership data is fine — they need to SEE it).

---

## AGENDA

### [0:00 – 2:00] Open — Set the Frame
Don't pitch. Just frame the call.

*"I'm going to ask you a few questions about how your team uses AI today — or whether they do. At the end, I'll show you what a working version looks like for a dealership your size. If it makes sense, we'll talk about how to build it. If not, at least you'll know where you stand."*

No slide deck. No screen share yet. Just talk.

---

### [2:00 – 12:00] The Audit Questions (THIS IS THE WHOLE CALL)
These are diagnostic, not interrogation. Listen more than you talk.

**Question 1: "How many of your reps use AI tools right now — ChatGPT, anything?"**
- Listen for: "a few of them," "I don't really know," "we tried it"
- If they say "all of them" — dig deeper. "Are they on one account or their own?"

**Question 2: "When a rep writes a customer email or follow-up, what does that process look like?"**
- Listen for: writing from scratch, copy-pasting ChatGPT, using templates from 2019
- Red flag phrases: "they just figure it out," "we have templates but nobody uses them"

**Question 3: "When a rep is out sick or quits, what happens to their leads?"**
- This one hurts. Let it hurt. Don't jump in with a solution yet.
- Listen for: "they get reassigned," "we hope the CRM has notes," "we lose some"

**Question 4: "How long does it take a new rep to get fully productive?"**
- Average answer: 3-6 months. Real answer is often "we're never sure they're there."
- This is your continuity pain point.

**Question 5: "Is your sales manager reviewing AI outputs before they go to customers, or is it just rep-level?"**
- Listen for: "I have no idea what they're sending" (extremely common)
- This is the compliance/quality control angle — very hot button for GMs

**Question 6: "If I told you your reps are spending 4+ hours a day on admin instead of selling, does that feel accurate?"**
- Almost always: yes. Industry stat is 70% of sales time is non-selling.
- Let them confirm or deny. Their answer tells you how aware they are of the problem.

---

### [12:00 – 20:00] The Demo — Show Don't Tell
Pull up Claude. Have a pre-built Project called "Metro Sales Team" (generic name, real structure).

Show them:
1. **Shared project context** — "Here's a customer profile with their trade-in info, objections from last call, and financing pre-qual. Any rep on your team would pull this up before they call."

2. **Email agent** — Paste in: *"Customer is coming back about the 2023 Camry, interested but worried about payments. Write a follow-up email."* Let Claude generate it. It will be good. Don't explain it — let the silence do the work.

3. **Call summary agent** — Paste a fake call transcript (prep this in advance, 150 words). Show the structured output: customer name, vehicle interest, next steps, CRM note. "This goes into your CRM automatically. Rep doesn't type anything."

4. **Memory import** — *"Anthropic just launched the ability to import ChatGPT memories directly into Claude. Your team's existing AI context — preferences, patterns, customer notes — transfers in under an hour."*

Keep demo to 8 minutes max. Stop before they're overwhelmed.

---

### [20:00 – 27:00] Qualification + Close

Ask:
- *"How close does what you just saw match what you'd actually want for your team?"*
- *"What's missing from that picture?"*
- *"What would have to be true for this to be a priority in the next 30 days?"*

If they're engaged — close the paid workshop:

*"What we'd do next is a half-day on-site session. We come to [Dealership Name], audit your actual workflows with your top reps in the room, and we build the first agent live. You leave with something your team can use Monday. Investment is $7,500. We can have you booked within the week — do you want to move forward?"*

If they need time: set a specific follow-up date, not "let me know." 

*"Let's put 15 minutes on the calendar Thursday. If it makes sense then, we'll book the workshop. If not, no problem."*

---

### [27:00 – 30:00] Close and Next Steps
Recap what you heard, confirm the follow-up or booking, and end on time.

Never run long on the free session. Respect for their time IS the close.

---

---

# WORKSHOP 2: PAID ON-SITE HALF-DAY (4 Hours)
**Format:** In-person at dealership (conference room or sales office)
**Price:** $7,500–$10,000
**Attendees:** Sales Manager + 3–5 top sales reps
**Deliverable:** A working Claude agent they can use Monday morning

---

## What to Bring
- MacBook with Claude already set up (Projects, agents prepped but not dealership-specific yet)
- Whiteboard markers (most dealerships have a whiteboard; confirm in advance)
- Recording permission form (optional — "Can I record this so I can build your agent accurately?")
- Your NYClaw.io one-pager (leave-behind)
- Pre-made "chaos map" template (blank grid: Workflow / Tool Used / Where It Breaks)

---

## AGENDA

### [0:00 – 0:30] Welcome + Set Expectations
You're not here to train them on Claude. You're here to build their system.

*"Here's what we're doing today: first hour, we listen. You tell us exactly how your sales process works and where AI is — or isn't — helping. Second hour, we design. Third and fourth hours, we build and test. You're leaving with an agent that works."*

No slides. No intro fluff. Get to work.

---

### [0:30 – 1:30] PART 1: Audit — Document the Chaos

**Activity: The Chaos Map**
Go workflow by workflow. Ask each rep in the room:

For each workflow (lead follow-up, test drive scheduling, post-visit email, financing updates, trade-in evaluation, stale lead re-engagement):
- What tool do you use today?
- How long does it take?
- What information do you need that you don't have?
- What do you do with the output?

Fill in the grid on the whiteboard. Be explicit. The goal is to surface:
1. Where they're doing manual work AI should handle
2. Where AI is already being used (probably badly)
3. The #1 bottleneck that kills deals (this becomes Agent #1)

**Common findings at dealerships:**
- Lead response emails take 10-15 min each, written from scratch
- Call notes are written in a personal notepad or not at all
- CRM entries happen at end of day, often incomplete
- Trade-in emails involve copying Kelley Blue Book values manually
- Stale lead re-engagement is essentially "hope someone remembers to call"

By minute 90, you should have identified the top 3 workflow candidates for automation and picked one to build in the room today.

---

### [1:30 – 2:30] PART 2: Design — Build the Blueprint

Take the #1 workflow from the audit. Design the Claude agent for it.

**Design questions to answer:**
1. What triggers this workflow? (New lead comes in, rep makes a call, customer replies)
2. What information does the agent need? (Customer name, vehicle interest, history, timeline)
3. What does the output look like? (Email draft, CRM note, Slack message, nothing?)
4. Who approves the output before it goes out? (Rep reviews, manager spot-checks, or auto-send?)
5. Where does it live? (Claude Project, shared team context)

**Whiteboard it** — literally draw the flow. Let the reps contribute. They know their workflow better than you do. You know how to build it.

Define:
- The system prompt (their voice, their process, their rules)
- The memory/context (what Claude needs to know about the dealership, inventory, common objections)
- The input format (what the rep types to trigger it)
- The output format (exactly what comes back)

Get sign-off from the sales manager before you build. "Does this look right? Is there anything missing?"

---

### [2:30 – 3:45] PART 3: Build + Test — Live in the Room

Build it. In front of them.

Open Claude. Create the Project. Write the system prompt based on what you designed together. Add the context (dealership name, common inventory, preferred email tone, CRM field names).

**Test Round 1:** You run it. Use a real lead scenario from their CRM (get permission first). Show the output.

**Test Round 2:** Rep runs it. The sales rep types the input themselves. You watch. Don't touch the keyboard.

**Test Round 3:** Different scenario. Different rep. Let them find the edge cases.

Tune the system prompt in real time based on what they don't like. This is the most valuable part of the session — they're training their own agent.

**What good looks like:**
- Rep says "that's actually what I'd write" (or better)
- Manager says "I'd be comfortable sending that"
- Someone in the room says "can we do this for [other workflow]?" — that's the retainer conversation

---

### [3:45 – 4:00] Close — Handoff + Retainer Offer

**Handoff:**
- Give them access to the Claude Project (walkthrough of how to add team members)
- Give them a one-page "How to Use This" doc (you write it in the last 15 minutes or prep it in advance)
- Document the system prompt so they have it in writing
- Tell them: "This is Agent #1. There are two more on my list from today's audit."

**Retainer Offer:**
*"What we built today is one agent. From what I saw this morning, you have two more obvious candidates — [workflow 2] and [workflow 3]. There's also the question of keeping this optimized as your inventory changes and your team evolves.*

*We offer three ongoing packages. I'll send over the details today. But the simplest version: we build and manage your Claude agents on an ongoing basis, and you get a weekly check-in. Most dealerships start at $5,000/month and move up or down from there based on scope.*

*Worth a follow-up call this week to talk through which package fits?"*

Leave the one-pager. Send the retainer packages doc within 2 hours of leaving.

---

## POST-WORKSHOP FOLLOW-UP SEQUENCE

**Day of:** Send email with:
- System prompt in writing (copy-pasteable)
- How to add team members to the Claude Project
- Retainer packages PDF
- Calendar link for follow-up call (book it for 3-5 days out)

**Day 3:** Check-in message: *"How's the team using the agent? Any issues or edge cases you're hitting?"*

**Day 7:** Retainer close call.

**If they don't convert to retainer in 30 days:** Monthly check-in. They'll eventually either hire internally (and fail) or come back. Keep the relationship warm.

---

*Workshop system by Ainsley @ NYClaw.io — Claude Migration Service, March 2026*
