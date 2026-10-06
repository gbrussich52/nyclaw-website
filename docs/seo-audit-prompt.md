---
classification: PRIVATE
---
# NYClaw weekly buyer-content routine

Purpose: answer one concrete buyer question with useful, sourced content that leads to a scoped workflow assessment. This replaces the repeated whole-site scrape and generic volume target; no new schedule, tooling or metered API spend. The existing Monday cloud routine and content PR reviewer remain the distribution path.

## Start and budget

Fetch origin, start from origin/main, and list existing app/blog routes before choosing a slug. Read this file and docs/content-calendar.md. Reconcile already published entries rather than rewriting them. One article maximum per run, 45 turns maximum, existing Sonnet subscription only. No paid Firecrawl or additional API key is required; use available web search and primary documentation. If sources or tools are unavailable, report the limitation truthfully and leave the article unpublished.

## Buyer question and evidence

Follow the calendar's explicit next-article priority, then its HIGH queue. Prefer a law-firm operations buyer question that connects to /law-firm-workflows. Do not create a second intake overview or new guide while an existing article answers the question. Explain the current manual handoff, native software features to check first, a fictional expected output, exceptions, a human approval point and a useful no-build outcome.

Verify current product facts against official vendor documentation during this run; link supporting sources next to claims. Numbers require a named source and URL in the same sentence. No invented savings, customer results, testimonials, search positions, integrations, certifications or guarantees. Minimum word counts are not evidence of quality: use the length needed to answer the question. Never equate hiring or a public workflow description with intent to buy automation.

## Build and conversion

Reuse an existing article's Next.js structure, metadata, ArticleJsonLd, FAQ and components. Add the new route to app/blog/page.tsx and app/sitemap.ts, preserving every existing entry. Use a stable publication date. The CTA links /law-firm-workflows: free fit call first, any paid assessment fee/scope agreed in writing. Where a fictional demo or planner helps, link LegalAIMCP with utm_source=nyclaw&utm_medium=referral&utm_campaign=law_firm_workflows and disclose that NYClaw operates it. No client files, credentials, personal contact data, outbound email or payment activation.

## Verify and distribute

Check type/build, the new rendered route, its internal links and source claims. Check the live homepage, sitemap, robots and acquisition landing page; sample two existing article routes. Do not scrape the entire site every week. Record only observed checks. A unavailable authenticated analytics source is unknown, not zero. Search results can be observations with date/query, never a precise ranking claim without reproducible evidence. A local deployment is not indexed or acquired traffic.

Update the calendar and write a concise report at docs/seo-reports/YYYY-MM-DD.md: buyer question, supporting URLs and observation dates, tests, live health, intended conversion path, remaining faults. Fix faults inside the allowed paths first. If no useful new article is justified, report why instead of producing filler.

Commit and push a content/YYYY-MM-DD-slug branch; open a reviewable PR. Allowed paths: app/blog/, app/sitemap.ts, docs/content-calendar.md, docs/seo-reports/. Preserve concurrent edits. Never merge or push main from this producer. The existing reviewer can fix and merge only after its own PASS and green checks, under Giani's September 28 authorization. Report a PR URL as prepared for distribution until the merge and production URL are verified. Do not count reports, PRs, pageviews or demos as paid customers.
