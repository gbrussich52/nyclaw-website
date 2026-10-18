---
classification: PUBLIC
---
# 2026-10-17 — Make buyer guides accurate and useful

Three existing articles now answer distinct buyer decisions: which law-firm intake handoff to automate, which dental office workflows to review, and when a small business needs ChatGPT, a roadmap or a build. Titles, actual H1s, social descriptions, article/FAQ data, listing summaries and real modification dates stay aligned. Existing service, Blueprint and fictional workflow-kit routes provide relevant next steps.

The legal and dental pages previously presented unsupported conversion, revenue and no-show figures, blanket integration and timing claims, and retired workshop CTAs. Replace those with concrete inputs, staff review points, acceptance examples and primary-source references. Correct the dental recommendation to select only satisfied patients for review requests. No new service, vendor integration, clinical or legal capability, client result or outcome guarantee is asserted. The comparison page uses the existing published fee ranges and keeps paid work separately scoped.

Extend the existing copy guard to the corrected articles and run it in the existing release CI so recurring claim drift is caught before deployment. This reuses the current gate; it adds no dependency, endpoint, data collection or schedule. The changelog is the release record for this slice and replaces a separate public audit document. Private search evidence and outreach drafts remain outside this public repository.

Validation is recorded at release: source tests, aggregate-counter tests, editorial guard, production build/typecheck, existing browser release checks and actual public readback. Deployment alone does not establish rankings, citations, backlinks or sales.

Follow-up: coordinator production readback found that the three article-level Open Graph/Twitter metadata objects omitted image fields. Explicitly reuse the existing absolute `https://nyclaw.io/opengraph-image` URL in both objects on each article. Preserve article content, dates, canonicals, forms and kit behavior. The existing buyer-path browser gate now checks all three rendered pages for both absolute image tags and the large-card type, then fetches the same build's image and verifies its PNG signature and 1200×630 dimensions. This catches metadata inheritance regressions without relying on a stale production image or adding an asset, dependency or schedule.
