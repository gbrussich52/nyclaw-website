---
classification: PUBLIC
---
# 2026-10-07 — Show the handoff before asking for a call

Previously the homepage repeated capability and stats panels while the services hub described the work mainly in prose. Replace those two homepage panels with a shared, interactive example section, also placed on the services hub. Visitors can select an inquiry, billing handoff or intake checklist and compare complete and missing-detail samples.

Every example is fictional. Outputs remain drafts or staff decisions; the examples read no real records and perform no external actions. The existing client cases, prices, separate law-firm assessment and booking destination remain intact. No dependency, API or scheduled job is added.

Validation: 44 existing tests, production Webpack build/TypeScript, editorial claims guard, desktop/mobile browser interaction checks including all three scenarios, keyboard activation and no API writes. Independent review addressed headline fit and neutral missing-state wording. This release demonstrates a visitor path; it does not establish conversion uplift.
