# Playbook P0 draft — Installed is not implemented

Paste into `public/ai-operators-playbook.html` Part 3B, after **Start With One Dollar Leak** and before **After Go-Live: The Closed Loop**.

Also bump:

- Cover: `Updated July 2026` → `Updated August 2026`
- About: `Last updated: July 2026` → `Last updated: August 2026`

Voice: SMB owner. No model names as the pitch. No new SKU.

---

```html
<h3>Installed Is Not Implemented</h3>

<p>Most owners who say “we use AI” mean someone on the team has a ChatGPT tab. The subscription is paid. A few people paste emails into it. Ask a sharper question: name one process that runs differently on Friday than it did before you bought the tool. After-hours calls. Overnight leads. The quote that never got a follow-up. If you cannot name it, you did not implement anything. You bought a tab.</p>

<p>Surveys will keep telling you that almost every small business “uses AI.” That number is not your number. Winners mapped one high-frequency process, wrote down today’s result, and named a person who still owns the outcome after launch. Then they put a tool on that process. Doing it in the other order automates the existing mess faster.</p>

<p>Write three lines before you add another app:</p>

<ol>
  <li><strong>The process</strong> — what happens, in order, when the thing you care about occurs (a missed call after 5pm, a form fill at 11pm, a quote that sat two days).</li>
  <li><strong>Today’s number</strong> — how often the good outcome already happens. An honest guess beats a vanity dashboard.</li>
  <li><strong>The owner after launch</strong> — a human name. Not “the AI.” That person can stop a bad send and is the one who looks at the number on Monday.</li>
</ol>

<div class="callout">
  <p><strong>Finished looks like this:</strong> that number moved, the old path can be turned off, and a person can undo a send. “We connected it to Claude” is not finished.</p>
</div>

<p>If a vendor shows you a 20-minute demo and calls it a rollout, you are still at installed. Implementation is the week the process actually changed and stayed changed.</p>
```

---

## Companion bullets (same ship, existing heading)

Append under **How You Know You’re Buying an Operator Setup (Not a Chatbot Install)**:

```html
  <li>The agent has a list of sites it may read and systems it may write to. Everything else is off. It does not hold a company card.</li>
  <li>A finished run is not “the command succeeded.” It is “the expected record appeared (CRM row, text, calendar event) and we can undo it.”</li>
  <li>If a try fails, that failure does not get saved as memory the next run will trust.</li>
```

Add two lines to the **Automation Architecture Checklist → Design Phase**:

```html
    <li>Which sites may it fetch, and which systems may it write to? Write the list. Unlisted means no.</li>
    <li>If this run fails halfway, what did it already change — and did we block retry from sending twice?</li>
```

---

## Do not paste

- Computer-use / browser-tool product language
- Claude Code version numbers
- “50 agents,” Slack Code, MCP mesh
- ChatGPT citation promises
- HighLevel $297/mo funnel
