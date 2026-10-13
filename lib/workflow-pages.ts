// classification: PUBLIC
import type { WorkflowRecipe } from './workflow-kits'

interface WorkflowPageContent {
  title: string
  description: string
  audience: string
  introduction: string
  trigger: string
  inputs: { fields: string; purpose: string }[]
  failures: string[]
  acceptance: string[]
  nativeChecks: string[]
  scope: string
}

export const workflowPages: Record<WorkflowRecipe, WorkflowPageContent> = {
  'quote-followup': {
    title: 'Follow up on open quotes with the right context',
    description: 'Review open quotes, timing and expiry before preparing an unsent follow-up. Try a free fictional example and check whether your existing CRM already covers the job.',
    audience: 'For owners and sales coordinators',
    introduction: 'A quote can sit unanswered while your team works out who last contacted the customer and whether the terms still apply. This kit checks those supplied facts before offering a draft for review.',
    trigger: 'Review a quote when its agreed follow-up interval has elapsed. The free kit checks one supplied record; it does not watch your inbox, read a CRM or run a reminder schedule.',
    inputs: [
      { fields: 'quoteId', purpose: 'A short source identifier so your reviewer can locate the original quote. The kit does not use it as instructions or put it in the draft.' },
      { fields: 'status, currency, amountCents', purpose: 'Whether the quote is open, accepted or declined, plus its stated currency and total in integer cents. An unknown amount needs review.' },
      { fields: 'lastContactAt, validUntil, followupAfterDays', purpose: 'Last recorded contact, quote expiry and your explicit interval of 1–30 days. The fictional example uses three days; that is a sample policy, not a CRM setting.' },
      { fields: 'asOf, observedAt', purpose: 'When to evaluate the record and when its source facts were observed, as UTC timestamps. A future snapshot or one older than seven days needs review.' },
    ],
    failures: ['Expired terms: confirm a current quote before following up.', 'Contact recorded after the snapshot, or expiry before contact: resolve the conflicting dates.', 'Accepted or declined quote: no follow-up draft. Interval not yet elapsed: no action.'],
    acceptance: ['An open, unexpired quote with known facts and an elapsed interval produces a ready result.', 'Missing amounts and impossible calendar dates produce needs_review and no draft.', 'A reviewer confirms the recipient, last correspondence and current terms before any sending in a separately implemented system.'],
    nativeChecks: ['Can your CRM filter open quotes by last contact and expiry without a new integration?', 'Does an existing reminder stop when a quote is accepted or declined?', 'Can the sales owner review a template and record the decision in the current tool?'],
    scope: 'A scoped implementation would first map the quote record, contact history, ownership and stop conditions. Only then would we decide whether to configure an existing reminder, connect tools or build a small extension.',
  },
  'invoice-discrepancies': {
    title: 'Spot invoice total differences before you act',
    description: 'Compare expected, invoiced and paid totals in matching currencies. See a free fictional invoice check and an internal clarification draft, with human review before any adjustment.',
    audience: 'For owners and billing coordinators',
    introduction: 'When an invoice differs from an agreed amount, the first job is to identify the mismatch and locate the records behind it. This kit compares supplied totals and prepares an internal clarification draft when the facts support one.',
    trigger: 'Review one invoice before asking a colleague to explain a total difference. This is a total comparison, not line-item matching, bookkeeping, tax treatment or financial advice.',
    inputs: [
      { fields: 'invoiceId', purpose: 'A short identifier for locating the original invoice. The kit does not fetch that document.' },
      { fields: 'currency, expectedCurrency', purpose: 'The invoice and expected-total currencies. They must match; the kit does not convert currencies.' },
      { fields: 'expectedCents, invoicedCents, paidCents', purpose: 'Three known integer-cent totals, each from 0 to 10,000,000,000. Null means unknown, never zero. Establish the expected total from your agreed scope or purchase record.' },
      { fields: 'asOf, observedAt', purpose: 'Explicit UTC evaluation and observation timestamps. The sample freshness policy holds snapshots older than seven days or dated in the future.' },
    ],
    failures: ['Currency mismatch: stop the comparison and confirm the sources.', 'Payment above the invoice total: review credits, duplicate payments or source errors manually.', 'Missing, negative or fractional-cent totals: hold for source review. Matching totals: no discrepancy action, even if an unpaid balance remains.'],
    acceptance: ['The fictional 110,000-cent invoice versus a 100,000-cent expected total reports a 10,000-cent difference.', 'A matching-currency discrepancy with known amounts can produce an internal draft; unknown amounts cannot.', 'No result changes a ledger, issues a refund, collects money or establishes which party is correct.'],
    nativeChecks: ['Can your accounting system already compare an invoice with its estimate or purchase order?', 'Are tax, shipping, credits and approved scope changes already included in the expected total?', 'Can your billing reviewer use the existing exception queue and approval history?'],
    scope: 'A scoped implementation would define the authoritative expected amount, treatment of adjustments and who can resolve a mismatch. We would check the accounting tool’s existing matching and approval features before proposing a connection.',
  },
  'order-handoff': {
    title: 'Check payment, production and shipment before a handoff',
    description: 'Reconcile payment, production and shipment statuses for one order. Try a free fictional handoff check with explicit review holds for unknown or conflicting facts.',
    audience: 'For owners and operations coordinators',
    introduction: 'An order can appear paid in one place and unfinished in another. This kit brings three supplied statuses into a reviewable snapshot so a coordinator can confirm the next owner and step.',
    trigger: 'Review one order when work moves between billing, production and shipping. The kit does not poll those systems, reserve inventory, create shipments or change fulfillment.',
    inputs: [
      { fields: 'orderId', purpose: 'A short identifier for the source order. Keep the link to its original records in your own system.' },
      { fields: 'paymentStatus', purpose: 'paid, unpaid or unknown. The sample policy expects payment before production; confirm whether that policy fits your operation.' },
      { fields: 'productionStatus', purpose: 'queued, in_progress, complete, failed or unknown. Failed or unknown production needs review.' },
      { fields: 'shipmentStatus', purpose: 'not_created, in_transit, delivered or unknown. The sample policy expects completed production before shipping.' },
      { fields: 'asOf, observedAt', purpose: 'Explicit UTC evaluation and observation timestamps for the reconciled snapshot. Future or more-than-seven-day-old snapshots need review.' },
    ],
    failures: ['Unpaid but production started or shipment created: review the conflicting state under the sample policy.', 'In transit or delivered while production is incomplete: reconcile the sources.', 'Any unknown status or failed production: no draft. A delivered order, or unpaid queued order with no shipment: no action.'],
    acceptance: ['Paid, production complete and no shipment yet produces a ready internal handoff result.', 'A delivered order with failed production cannot produce a ready handoff.', 'The reviewer confirms the next owner and step; repeating the check never creates a second shipment or updates a record.'],
    nativeChecks: ['Does your order system already display these three statuses and their last update times together?', 'Can existing workflow rules block or flag inconsistent transitions?', 'Are deposits, production before final payment and partial shipments part of your process? Those require a different agreed rule set.'],
    scope: 'A scoped implementation would map the systems of record, status meanings, allowable exceptions and handoff owner. We would test delayed updates and failure recovery before proposing any action that changes an order.',
  },
}
