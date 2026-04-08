# NYClaw.io Weekly SEO Audit — Automated Prompt

> This prompt is executed by a scheduled Claude Code trigger every Monday at 9am ET.
> Output: `docs/seo-reports/YYYY-MM-DD.md`

## Instructions

You are running the weekly SEO audit for nyclaw.io. Complete ALL steps below and generate a report.

### 1. Site Health Check
- Scrape all pages listed in sitemap.ts via Firecrawl
- Verify each page returns 200 and has content
- Check that `/sitemap.xml` is valid and includes all pages
- Check that `/robots.txt` is serving correctly
- Flag any new pages that aren't in the sitemap

### 2. Structured Data Validation
- For each page, check for `application/ld+json` scripts
- Verify homepage has: ProfessionalService, WebSite, FAQPage
- Verify service pages have: Service, FAQPage
- Verify blog posts have: Article, FAQPage
- Verify knowledge articles have: Article
- Flag any pages missing expected schemas

### 3. Metadata Check
- Every page must have: unique title, meta description, canonical URL
- Every page must have: og:title, og:description
- Flag duplicate titles or descriptions across pages
- Flag titles > 60 chars or descriptions > 160 chars

### 4. Content Quality
- Check each page has an H1 tag
- Flag pages with < 800 words (thin content)
- Check blog posts have FAQ sections
- Verify internal links exist (at least 2 per article)
- Check for broken internal links

### 5. Keyword Rankings
Run Firecrawl searches for these keywords and record NYClaw.io position:

```
"AI automation agency westchester" → target: top 3
"AI implementation small business NYC" → target: top 5
"AI consulting westchester county" → target: top 5
"AI workflow automation small business" → target: top 10
"AI agency NYC small business" → target: top 10
"AI marketing small business" → target: top 10
"OODA Loop business framework" → target: top 5
```

Compare against previous week's report (if exists) and flag movement.

### 6. Competitor Monitor
Check rankings for top 5 competitors:
- redkeysolutions.com
- nypcfix.com
- hummingagent.ai
- westchesterai.com
- aiagencyny.com

### 7. Content Calendar Review
Read `docs/content-calendar.md` and:
- Check which articles are due this week
- Verify published articles meet quality requirements
- Suggest next article to write based on keyword gaps

### 8. Content Generation (if scheduled)
If the content calendar has an article due:
- Research the topic via Firecrawl (competitor articles, current data)
- Write the full article with proper metadata, JSON-LD, FAQ, internal links
- Create the page file in `app/blog/[slug]/page.tsx`
- Update the content calendar status
- Commit to a `content/[date]-[slug]` branch
- Open a PR for review

### 9. Content Freshness
- Check for "coming soon" blog entries that need to be replaced
- Check date-sensitive content (pricing, year references)
- Flag articles older than 90 days that reference specific tool versions

### Report Format

```markdown
# NYClaw.io SEO Report — [DATE]

## Summary
- Pages indexed: X
- Structured data schemas: X valid, X missing
- Content quality: X pages OK, X flagged
- Keyword movement: [summary]

## Rankings
| Keyword | This Week | Last Week | Change |
|---------|-----------|-----------|--------|

## Issues Found
1. [issue description + recommended fix]

## Content Status
- Published this week: X
- Due next week: [article title]
- Content freshness flags: X

## Competitor Movement
[notable changes]

## Recommendations
1. [prioritized action items]
```

Save report to: `docs/seo-reports/[YYYY-MM-DD].md`
