# 2026-11-16 Search Console and Ahrefs issues (Claude Sonnet 5.5)

## 404: /workshop and /guides/best-ai-assistant-setup-2026
Decision: leave both as 404, no redirect.

History evidence (`git log --all`):
- No commit ever added or deleted `app/workshop` or `app/guides`; neither route ever existed.
- `/workshop` appeared only as a CTA href in the four industry blog posts (added with the 2026-03 SEO
  articles) and `/guides/best-ai-assistant-setup-2026` only as a link in `/blog/gpt-5-4`
  (commit 4addcd1, 2026-03-05). Both links were removed on 2026-10-22 (e2ace61, 23ed969, #31), which
  swapped them for the contact form and the AI Operator's Playbook, and added a source gate that rejects
  both URLs.
- Today: grep of source (app, content, lib) finds no link to either URL. Live HTML of all 48 sitemap
  URLs has none. Google last crawled the dead URLs 2026-08-13 / 2026-09-23, before that fix, so the
  referring blog pages it lists are stale.
- No honest successor: the workshop offer is retired (LESSONS 2026-10-22) and a redirect to the home
  page would only hide the report. Mark Fixed in Search Console and let it recrawl.
- All 48 internal paths linked from sitemap pages return 200 live (checked today).

## Ahrefs: meta description too long
- `/` (app/page.tsx), 159 chars -> 146: "NYClaw.io sets up AI for small businesses in Westchester and NYC: first replies to inquiries, estimate and invoice drafts, less re-typing. Free 30-minute call." became "NYClaw sets up AI for Westchester and NYC businesses: first replies to inquiries, estimate and invoice drafts, less retyping. Free 30-minute call."
- `/about` (app/about/page.tsx), 152 -> 142: removed the word "practical".
- Words cut only; no new claim. Location pages left alone (they belong to PR #48), though they are 152 to 158 chars.

## Director edit (Claude Fable 5.2, 2026-11-16)
Home description: the trim had dropped "small" from "small businesses". That is the audience and the search term, so it is back: "NYClaw sets up AI for small Westchester and NYC businesses: ..." (152 characters, under the 155 line Ahrefs flags above). Prior live text: 159 characters.

## Claude Sonnet 5.5, 2026-11-16: stale outbound links and two long descriptions (playbook page)
- `public/ai-operators-playbook.html` (hand-written source, not generated; the PDF build reads it) linked two URLs that now redirect: `support.claude.com/.../11817273-using-claude-s-chat-search-...` (301 to `...-use-claude-s-chat-search-...`) and `anthropic.com/engineering/building-effective-agents` (308 to `/research/...`). Both hrefs now point at the final URL; anchor text unchanged. Curl proof 2026-11-16. The redirect direction of both has flipped before, so the new URLs are the ones that answer 200 today.
- Meta descriptions over 160 characters cut to the director-approved strings: `app/resources/page.tsx` top-level `description` (221 to 159; openGraph and twitter untouched) and the playbook HTML `<meta name="description">` (to 158). Words cut only.
- Test: `lib/__tests__/seo-links.test.ts` pins both descriptions at 160 or fewer and fails if the two old hrefs return.
