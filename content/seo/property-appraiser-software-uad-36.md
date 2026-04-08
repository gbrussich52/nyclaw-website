---
title: "UAD 3.6 Appraisal Software: What Changes November 2026"
description: "UAD 3.6 becomes mandatory November 2, 2026 for all Fannie Mae and Freddie Mac appraisals. Here's what changes and what appraisers need to do before the deadline."
keywords: ["UAD 3.6 appraisal software", "UAD 3.6 changes", "UAD 3.6 deadline", "appraisal software UAD 3.6", "UCDP UAD 3.6"]
published: "2026-03-17"
updated: "2026-03-17"
---

# UAD 3.6 Appraisal Software: What Changes November 2026

On November 2, 2026, Fannie Mae and Freddie Mac's Uniform Collateral Data Portal (UCDP) will require all appraisal submissions to use UAD 3.6.

This is not a soft rollout. After November 2, appraisals submitted in the old format will be rejected.

Here's what changes — and what you need to do.

## What Is UAD 3.6?

The Uniform Appraisal Dataset (UAD) is the GSE standard that defines how appraisal data is structured and submitted through the UCDP. Version 3.6 is a complete redesign — not an update to the old UAD, but a new reporting architecture built around the MISMO XML standard.

The old forms (1004, 1073, etc.) are being replaced with redesigned report formats that capture more granular data about property condition, neighborhood characteristics, and comparable selection.

## Key Changes in UAD 3.6

**Condition and Quality Ratings**: The familiar C1–C6 and Q1–Q6 ratings remain, but the supporting data fields are expanded. The new format requires more granular room-by-room condition data and specific documentation of updates and renovations.

**Energy Efficiency Fields**: New required fields capture energy efficiency features, green certifications, and utility cost data. This was absent in prior UAD versions.

**Expanded Comparable Fields**: Comps now require additional data points including prior sale history (expanded from the existing 3-year rule), DOM data, and condition-adjusted details.

**Deficiency Tracking**: Structural deficiencies, deferred maintenance, and safety issues now have dedicated fields rather than being buried in narrative comments.

**Inspection Method Documentation**: Interior vs. exterior vs. desktop inspections must be explicitly documented, with supporting justification.

**MISMO XML Required**: The delivery format changes from the older XML schema to a MISMO-standard envelope. Software must generate compliant MISMO XML or submissions will fail UCDP validation.

**GSE Validation API**: Fannie Mae and Freddie Mac are introducing a compliance validation API that allows appraisal software to check reports against UAD 3.6 data rules before submission. Software that integrates this API will surface errors before they reach the UCDP.

## What Appraisers Need to Do

**1. Confirm your software has a UAD 3.6 roadmap.** If your vendor hasn't publicly committed to UAD 3.6 support with a specific delivery date, ask them directly. "Working on it" is not enough — you need production-ready support before November 2.

**2. Don't wait until Q3 2026.** Fannie Mae and Freddie Mac entered broad production with UAD 3.6 in 2025 to allow gradual adoption. Appraisers who switch early have time to learn the new format, work out workflow issues, and avoid the November 2 crunch.

**3. Check your form templates.** If you're using custom templates or add-ons built on top of legacy forms, verify they will be updated. Some third-party tools may lag behind the core software.

**4. Review the new fields.** Energy efficiency, expanded comp fields, and the inspection method section will require new data collection habits. You can't fill in fields you didn't collect at inspection.

## Property Appraiser Pro — Built for UAD 3.6

**[Property Appraiser Pro](https://propertyappraiserpro.com)** is an appraisal workfile manager built from day one on UAD 3.6 — not retrofitted onto legacy forms.

What's live today:
- Full UAD 3.6 fields: C/Q ratings, room updates, energy efficiency, inspection method, deficiency tracker
- MISMO XML export built to UAD 3.6 spec
- URAR PDF with full 35-row sales comparison grid
- Cost Approach and Income Approach with autosave
- Live comparable sales data via ATTOM
- Assignment management with workflow tracking

**Free beta at [propertyappraiserpro.com](https://propertyappraiserpro.com)**. No credit card required.

The November 2, 2026 deadline is fixed. The time to switch is now, not October.

---

*Property Appraiser Pro is built by NYClaw.io — AI tools for real estate professionals.*
