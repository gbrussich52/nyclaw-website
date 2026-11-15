# Free guide rewrite (2026-11-15)

Claude Fable 5.2, 2026-11-15.

## Why
A visitor who asked for the guide on 2026-10-11 got nothing by email. Before sending it to her, Giani asked for an audit: accurate, current, sourced, plain. Three reviews ran (two fact checks, one language review; findings in project-claude `docs/tasks/2026-11-15-playbook-*.json`).

## What the prior guide did
About 3,700 words. It cited "client builds shown at nyclaw.io/work" and wrote "In our experience" and "patterns we see again and again", with no client record behind them. It described Gemini Gems (Google retires them 2026-11-17 to 2026-12-17), listed two OpenAI Dots claims found only in secondary reports, and dated itself "October 2026". No example fit a law, staffing or real estate firm. `/resources` still described a March guide (SOUL.md template, seven anti-patterns, OKR template) and carried a quote from our AI assistant claiming failures "we've seen".

## What changed
- `public/ai-operators-playbook.html`: rewritten, about 3,200 words including a worked example and worksheet.
  - Removed every line implying a client record; states what the guide rests on at the top.
  - Defined "operator"; dropped "harness" and the car metaphor.
  - Added leaks for law, staffing and real estate; a filled-in law-office illustration; a confidentiality section; what to ask your software provider for each first job; a blank one-page worksheet.
  - Vendor section cut to four assistants, each line read on the vendor's own page on 2026-11-15. OpenAI pages were read in a browser (they block fetchers). Dropped Dots and Meta rows.
  - "Facts checked November 15, 2026" on cover, appendix, About and footer. Sources list added.
  - Tables became stacked lists for phones. Links are absolute so the PDF works.
  - Removed: contents block, "Ask how they found you", mistake 1, the builder-notes link.
- `public/downloads/ai-operators-playbook.pdf`: regenerated from the HTML (closes `pdf-mirror`).
- `app/resources/page.tsx`: "What's inside", templates list, metadata and date now match the guide. AI-assistant quote removed.
- `app/sitemap.ts`: guide `lastModified` 2026-11-15.
- `scripts/check-positioning-copy.mjs`: fails if client-record phrases, an em dash or "leverage" return to the guide, if the "Facts checked" line is missing, or if `/resources` drifts from the guide's date or lists the old contents.

## Not verified
- ABA Formal Opinion 512 is cited by name and date from memory of the opinion; no link was fetched.
- ChatGPT Projects page was not re-read today; the guide says only that a project holds standing instructions.

## Roll back
Revert the commit. The PDF and HTML return to the prior versions.

## Also in this change (promise audit, 2026-11-15)
- Knowledge pages, blog index, privacy page and `public/llms.txt` described a "50-page PDF" with SOUL.md and OKR templates and a 30/60/90 roadmap. They now describe the guide as it is. Buttons read "Get the free guide".
- `app/knowledge/page.tsx`: "No spam. Unsubscribe anytime." became "We send you the guide." There is no list and no unsubscribe mechanism.
- `app/blog/ai-automation-small-business-nyc/page.tsx`: deleted "All have measurable ROI within 60 days." (no source).
- The guide links its PDF copy (`/downloads/ai-operators-playbook.pdf`).
