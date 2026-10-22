---
classification: PUBLIC
---
# 2026-10-22 — Search titles and social previews

Public page metadata now supplies an explicit sharing image and the route's own Open Graph URL. The previous page-level objects replaced the root Open Graph object, dropping the image; several knowledge and resource pages also inherited the homepage URL. Reuse the existing `/opengraph-image` asset and match each canonical URL. No new image, dependency or metadata helper is needed.

Shorten long search titles and descriptions while retaining each page's topic. Remove literal brand suffixes where the root title template already adds the brand, and expand the short About title. Short social descriptions follow the same factual summaries. The three workflow detail routes use concise metadata descriptions while their visible instructions remain unchanged. Existing noindex admin and application routes retain their indexing policy.

Scope: metadata exports in 37 static pages and `generateMetadata` in the workflow detail page. An AST comparison against the preceding commit confirms no imports or page bodies changed. This release record uses the existing changelog directory; it adds no schedule or recurring tool.

Verified locally: production build and TypeScript pass. Parsed HTML for all 43 current indexable routes has titles of 30–60 characters, descriptions of 50–160 characters, complete Open Graph title/description/type/URL/image fields, Twitter images, and matching canonical/Open Graph URLs. The shared build artifact is a valid 1200×630 PNG. The existing middleware deprecation warning remains. These checks establish local output; deployment and a fresh external crawl are separate steps.
