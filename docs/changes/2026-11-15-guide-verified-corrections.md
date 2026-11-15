# Guide, corrections from the line-by-line fact-check (2026-11-15)

Claude Sonnet 5.5, 2026-11-15. The director ruled on each finding in `docs/tasks/2026-11-15-playbook-v2-verification.json` (claim ids as #N). Sources are the pages saved under `/tmp/claude-501/pv/`.

## What changed, ruling by ruling
Files: `public/ai-operators-playbook.html`, `public/downloads/ai-operators-playbook.pdf` (rebuilt). No `.tsx` or `.txt` file changed: `app/resources/page.tsx`, `app/knowledge/page.tsx` and `public/llms.txt` hold no "xAI".

| Ruling | Was | Now | Why and source sentence |
|---|---|---|---|
| R1 (#12) vendor name | "xAI" everywhere (11 places) | "SpaceXSI"; first body mention "SpaceXSI, the company that makes Grok, says it plainly in its documentation:"; Appendix A "Grok (SpaceXSI)" | The vendor's own pages are titled "| SpaceXSI Docs" and "| SpaceXSI" (08.html, 09.html, 29.html, 30.html). |
| R2 (#43) | "Solving code review at Anthropic" | "How the Claude Code team does code review" (cite and Sources) | 04.html title: "How the Claude Code team does code review / claude.dev Blog". |
| R3 (#53) | "Skills, routines, and automations" | "Skills and routines" (Part 6 cite, Sources) | 09.html title: "Skills and routines \| SpaceXSI Docs". |
| R4 (#31) | "Claude for Small Business" | "Introducing Claude for Small Business" (cite, Sources) | 27.html title: "Introducing Claude for Small Business \ Anthropic". |
| R5 (#83) | "Grok Bot for customer support" | "How SpaceXSI is using Grok Bot to scale customer support" | 30.html title. |
| R6 (#21) | Samples-only voice advice; paste said "five messages ... proud of" | Added "The lesson points the assistant at what you actually sent, not a best-of ... Use both ..."; "from the samples" became "from your own writing"; Appendix B paste now "the last twenty messages our firm sent, not only the best ones" | 02.txt: "Reading what you actually sent, not a curated best-of, means the profile catches your real habits." |
| R7 (#29) | "This is how the vendors start their own users." | "The vendors build the same check into their own products." | Overstated. |
| R8 (#33) | "an assistant treats "never" as absolute ..." (all newest-model guidance) | Scoped to the Claude Fable 5.2 model, with the exact phrases | 18.mdtxt: "The model treats an instruction that contains "never" as absolute. For example, write "ask for approval before deleting files" instead of "never delete files" ..." The closing clause "and save never for the things you truly mean" was dropped because the page does not say it. |
| R9 (#36) | "cannot be talked into it by an email" | "is much harder to turn against you. Still read what you approve, because a planted message can shape the draft in front of you." | 21.txt: "If one of these two conditions is not true, prompt injection attacks become more difficult." |
| R10 (#41) | "Anthropic's own engineers use this on their code, and their guide puts it simply:" | "Anthropic's guide for programmers puts it simply:" | No source says the engineers do this. |
| R11 (#46) | Preference-picking claim | Study described with its numbers | 28.txt: "we asked 50 professional analysts"; "analysts went with their agent's lean 86% of the time. If the agent's input made no difference, we'd expect about 50%."; "Analysts who followed the agents' recommendations closely were about as confident ... and roughly as likely to call it the product of their own judgment."; "we strengthened their preferences on purpose ... When agents aren't given clear preferences ... the effect might be smaller." Sources link text now the page title, "How AI agents shape experts' judgment calls". |
| R12 (#56) | "old cautions pile up in an assistant's notes and make it ask permission" | "Anthropic's guidance for its Claude Fable 5.2 model warns that cautious instructions build up in memory, notes and instruction files, and can make the assistant ask for approval it does not need." | Ruling wording. |
| R13 (#72) | "Plus, Pro and Business accounts can also start a task from a new Gmail message, Slack message or GitHub pull request." | "On Plus, Pro, Business, Enterprise and Edu plans, a task can also start from a new Gmail message, a new Slack channel message or GitHub pull request activity." | chrome_excerpts.txt: "They are available to eligible users on Plus, Pro, Business, Enterprise, and Edu plans"; "Slack tasks can respond to new channel messages"; "GitHub tasks can respond to supported pull request activity". |
| R14 (#77) | Gems removal, personal accounts | Adds "of people 18 and over" and "Workspace business, enterprise and non-profit accounts follow in March 2027." | 25.txt: "November 2026: Personal Google accounts if you're 18 or over. ... December 17, 2026: Gems are removed ... March 2027: Workspace business, enterprise, and non-profit accounts." |
| R15 (#68) | "Scheduled tasks run on paid plans, and Claude shows when a run failed ..." | "Scheduled tasks are available on all paid plans, and you can review upcoming and past runs under Scheduled." | 22.txt: "Scheduled tasks are available on all paid plans"; "Review upcoming and past runs by clicking "Scheduled" in the left sidebar". |
| R16 (#17) ABA | unchanged | unchanged | Second pass after the press release is read in a browser. |
| R17 (#63) | `<p class="ours">` about the guide form | Deleted | Step 6 above it ends "A "Thank you" page proves nothing until the message arrives." and reads complete. |
| R18 quotations | Two quotes started mid-sentence and were capitalised; several carried a full stop the source lacks | "When building applications with LLMs, we recommend finding ..." (true sentence start); "Claude does the work; you approve before anything sends, posts, or pays." (true sentence start); full stops moved outside the quote marks or removed where the source has none; "Match the level of strictness to your needs." keeps its capital | Checked by script, see below. |
| R19 | Gemini schedule link missing | Added "Schedules" link (Appendix A) and "Schedules in Gemini Apps" (Sources): support.google.com/gemini/answer/16316416 | g_sched.txt: "You can make Gemini a part of your daily, weekly, and monthly routines by scheduling recurring actions." and "You can set a delivery time that works for your schedule." |
| R20 | no code-execution note | Added "Skills need code execution turned on in settings." to the Claude entry | 20.txt: "This feature requires code execution to be enabled." |
| R21 | button to `https://nyclaw.io` | button to `https://calendly.com/nyclaw-io-proton/30min` | `CALENDLY_URL` in `app/config.ts`, used by every fit-call button on the site. |
| R22 | | unchanged | "Facts checked November 15, 2026" stays. |

## Quotation check
A script (`python3 -I`, case-sensitive; only quote marks, whitespace and a space before punctuation are normalised) found every attributed quotation in the guide in a saved source. One exception: the ABA opinion title (R16), whose page the saved copies could not read. A space before a period in the saved text of the Claude Academy page ("style .") comes from page markup, not from the source wording.

## Roll back
Revert this commit.
