# 2026-11-16 Guide short edition (Claude Sonnet 5.5)

Why: Giani read the live guide and said 35 minutes is too long. The method now reads in about ten minutes; the pages you use stay; detail moved to notes at the back; every source is numbered.

Prior state: `cdc3e0f` (guide verified November 15, 2026, 31-page PDF). Rule followed: a cut and a move, no new fact, number, name, date, quotation or source. Quotations are character for character as before.

## What changed
- `public/ai-operators-playbook.html`: new cover line and edition line; Contents on its own page (`#contents`) with a "Find your situation" box and three groups; Start here to Part 7 cut to a core of about 2,450 words (see Round 2); passages moved to Notes on each step (`#notes`, with one sub-section for each step, `#n1` to `#n7`; `#n3` holds the pieces list, the brand sheet and the template); References (`#refs`) numbered in order of first use; "What this guide rests on" moved to Who wrote this (`#about`). Print-only type and spacing tightened so the PDF is 24 pages (was 31).
- `public/downloads/ai-operators-playbook.pdf`: rebuilt from the page.
- `scripts/check-guide-structure.py`: new. The read-time claim and the jump links had no check that could fail.
- `scripts/check-guide-pdf-layout.py`: contents page left out of the heading check; source lines now only in Appendix A.
- `app/resources/page.tsx`, `app/knowledge/page.tsx`, `public/llms.txt`: read-time copy now "about 10 minutes" for the method.

## Cuts made only to reach the 2,350-word core budget (beyond the Core cuts list)
Restore any of these only if the budget is raised.
- Moved to notes: Part 3 brand sheet and template (n3); Part 4 repair test (n4).
- Dropped: Part 3 item 4 "Pieces you like, and pieces you don't" with its own-practice line; Part 1 Staffing and Real estate bullets and "If you can't decide..." sentence; Part 2 sheet rows "What it may do alone, and what it must ask about", "Where the facts live", "How to answer me", "Last updated", and "Use plain words and keep it to one page."; Part 4 "Update its own notes"; Part 5 criteria "Under 120 words" and "Says who will call and when"; Part 6 intro line to the two-places list, "It is your checklist...", "Then try the saved method on real cases."; Part 7 "Write the rules down with the name of the person who can pause it, and how." and "Delete the test records when you finish."; Start "You need no technical background." and "That is you, or someone you name."; Part 1 "Keep a tally for one week."

Wording of the two `ours` lines (Parts 5 and 7) was set by the owner on 2026-11-16: framed as what we have found and come across.

## Round 2 (Claude Sonnet 5.5, 2026-11-16): director review of 5847995
Why: the 2,350-word budget was too tight for the director's own keep list. Budgets are now core 2,500 words, notes 1,400, PDF at most 25 pages. `scripts/check-guide-structure.py` enforces all three.
- Restored to the core, each as in `cdc3e0f`: "You need no technical background."; Part 1 Staffing and recruiting and Real estate bullets; Part 2 sheet rows "Where the facts live" and "What it may do alone, and what it must ask about"; Part 4 "Update its own notes"; Part 5 criteria "Under 120 words" and "Says who will call and when" and the sentence "In your firm that is the operator from Part 1."; Part 7 "Read two or three of the things it actually sent.", ", so staff know to ignore it" and "Delete the test records when you finish."
- Note 3 now also holds "Pieces you like, and pieces you don't" (paragraph, "Too long" pair and own-practice line as in the old file). Part 3 headings lose their "1." and "2.".
- Contents: Start here reads "Who this is for, and the seven steps"; Part 3 reads "Real examples, and your own voice".
- References: handles (@name) removed from X entries; "Read November 15, 2026" removed from three Google entries because the old Sources list gave Google no read date.
- `app/resources/page.tsx`: "Sources beside every borrowed idea" is now "Every source numbered and listed". The first HTML comment in the guide no longer says "a source beside every borrowed idea".
- PDF rebuilt.
