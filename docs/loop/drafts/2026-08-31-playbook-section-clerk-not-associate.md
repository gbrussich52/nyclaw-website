# Playbook P0 draft — The model is a clerk, not an associate

Paste into `public/ai-operators-playbook.html` Part 3B, after **Installed Is Not Implemented** (or after **Start With One Dollar Leak** if that section has not shipped yet) and before **After Go-Live: The Closed Loop**.

Also bump, if 08-25 has not shipped:

- Cover: `Updated July 2026` → `Updated August 2026`
- About: `Last updated: July 2026` → `Last updated: August 2026`

Voice: SMB owner. No model names as the pitch. No new SKU. No 24/7 receptionist.

---

```html
<h3>The Model Is a Clerk, Not an Associate</h3>

<p>A clerk pulls the file, drafts the note, and puts it on your desk. An associate hits send. Most small-business “AI” setups confuse the two. The chat will read last week’s inquiries and write a decent follow-up. That is the clerk. Putting that follow-up in front of a customer — or a court, a lender, or a card network — is a different job. A working lawyer this month said it plainly: research and summary inside the chat is excellent; autonomously sending the next email is mediocre, and half of it needs a rewrite. Passing a list of 40 rules does not fix that. A named person who can refuse still does.</p>

<p>If you are asking “which agents should we add,” you started in the wrong place. Ask where the business is losing money this week. No-shows. Overnight leads that sat. Quotes with no follow-up. Then decide whether a clerk would even help. A yoga studio doing $25–30k a month does not need a catalog of agents. It needs one leak named, today’s number written down, and a human who still owns send.</p>

<p>Write three lists before you connect inbox, SMS, or calendar:</p>

<ol>
  <li><strong>Unattended</strong> — capture only. Log the missed call. File the form fill. Draft nothing that leaves the building.</li>
  <li><strong>Draft, then a named person sends</strong> — outbound email, public post, invoice, anything that talks to a customer or commits money. The AI writes. A human name clicks send. That person can refuse.</li>
  <li><strong>Never</strong> — company card, refunds, signing, deleting the audit trail, raising its own limits. If it is on this list, it is not a setting. It is off.</li>
</ol>

<div class="callout">
  <p><strong>Finished looks like this:</strong> you can name who is allowed to send, and you can stop a bad send without calling the vendor. “It emailed the client while we slept” is not finished. It is a clerk you left unsupervised.</p>
</div>

<p>Intake capture: yes. A calendar hold the owner can see and cancel: maybe. Outbound legal, medical, or financial email: never without the person whose name is on the letterhead.</p>
```

---

## Companion bullets (same ship)

Append under **How You Know You’re Buying an Operator Setup (Not a Chatbot Install)** if 08-25 has not already added similar lines:

```html
  <li>Outbound messages sit in a review queue. A named person sends. The agent does not.</li>
  <li>There is a written never-list: cards, refunds, signatures, deleting logs.</li>
```

Add two lines to the **Automation Architecture Checklist → Design Phase**:

```html
    <li>What may it do unattended, what must a named person send, and what is never allowed? Write the three lists.</li>
    <li>If this drafts an email or a text, who refuses — by name — and how do they stop it?</li>
```

Optional one-liner to fold into the still-open **receipt / allowlist** bullets (`playbook-done-means-receipt`):

```html
  <li>Permission is a named folder, an end date, and a kill switch that works while the job is still running. A pasted API key is not permission.</li>
```

---

## Do not paste

- 24/7 receptionist that emails clients
- HighLevel / “AI employee” retainers
- MCP, Cursor, Claude Code version numbers
- “40 rules,” “50 agents,” Slack as the control room
- ChatGPT citation promises
- UAD / appraisal language (PAP, not this guide)
