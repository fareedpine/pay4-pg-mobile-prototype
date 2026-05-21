# Pay4 Product Context

This is the living Pay4 domain model and decision log. Update this file as product decisions are made. Use ADRs for durable decisions that should be easy to find later.

## 1. Shared Language / Glossary

- Pay4: A Pine Labs online checkout payment mode that lets eligible credit-card customers split an eligible purchase into 4 payments.
- Payment mode: The checkout option presented to the shopper, such as Pay4, UPI, Cards, EMI, Net Banking, or Wallets.
- Funding instrument: The underlying payment instrument used to fund the Pay4 transaction; currently an eligible credit card.
- First payment: The first one-fourth installment amount, before any processing fee is added.
- Bank processing fee: Issuer/customer-facing fee that may be added to the first payment and included in Pay Today.
- Pay Today: The total customer pays at checkout today; in the current demo, ₹10,000 first payment + ₹99 bank processing fee = ₹10,099.
- Remaining payments: The future 3 payments collected by the issuer/bank as per Pay4 terms.
- Eligible credit card: A credit card that passes Pay4 issuer/BIN/product eligibility.
- BIN eligibility: Eligibility determined from the card BIN/issuer/card product rules.
- Supported issuer: An issuer shown as eligible or participating for Pay4.
- Participating issuer: A bank/card issuer with a Pay4 program arrangement.
- Card-led flow: A flow where the customer enters or selects a card and eligibility is derived from the card, not from bank selection.
- Bank selection: A UX where the customer selects a bank before card entry; current Pay4 decision is to avoid this.
- Saved Pay4 card: A saved eligible credit card presented inside Pay4 for repeat users.
- Repeat user: A returning customer with a saved eligible Pay4 funding card or prior Pay4 context.
- Ineligible state: A customer-facing state where Pay4 cannot proceed because of amount, merchant, card type, issuer, BIN, or other rules.
- Fallback payment method: Another PG payment mode the customer can use if Pay4 is unavailable or fails.
- Merchant enabled: Merchant has Pay4 activated and configured for relevant transactions.
- Order-level financing: Pay4 applies to the full order/invoice amount, not individual SKUs.
- Settlement: Movement of funds/reporting by which the merchant receives order value upfront net of Pay4 charges.
- Refund: A reversal after payment success, requiring merchant, Pine Labs, acquirer, and issuer handling.
- Cancellation: A pre- or post-payment order cancellation that may differ from refund depending on timing.
- Bank booking: Issuer-side creation/booking of the Pay4 repayment construct.
- Demo controls: Prototype-only controls for variant, user type, eligibility, outcome, card scenario, and debug state.
- Prototype variant: One of the prototype UI hypotheses: A, B, C, or D.

## 2. Current Decisions

- Pay4 is a standalone payment mode.
- Pay4 is not Cards or EMI.
- Credit card is the funding instrument.
- Flow is card-led, not bank-selection-led.
- Supported issuers are informational only.
- Show issuers before card entry.
- Demo amount is ₹40,000.
- Pay4 is framed as Pay ₹10,099 today, then ₹10,000/month for 3 months.
- Bank processing fee is ₹99.
- Pay today is ₹10,099.
- Fee must be explained wherever relevant.
- Expiry format in prototype is MM/YY.
- Save-card consent is optional and separate from required Pay4 terms consent.
- Success heading is Payment Successful.
- Demo controls are hidden by default.
- Variant B is main CEO demo.
- Variant D is repeat-user demo.
- Static prototype only.

## 3. Product Assumptions

- 4-payment construct remains the MVP structure.
- ₹99 bank processing fee is acceptable for demo and needs validation for production.
- Credit-card-only funding is the initial scope.
- Initial supported issuers are HDFC Bank, ICICI Bank, Axis Bank, and Kotak.
- SBI Card is coming soon.
- Merchant receives upfront settlement as per Pay4 settlement/commercial terms.
- Customer repayment is handled by the issuer/bank.
- No tenure selection in MVP.
- No SKU-level financing in MVP.
- Saved-card availability depends on PG/card vault/tokenization capabilities.
- Production eligibility/BIN rules will be issuer- and merchant-configurable.
- MVP launch is limited to credit cards from the initial participating issuers: HDFC Bank, ICICI Bank, Axis Bank, and Kotak.
- Other cards are out of scope for MVP.
- Issuer banks will share eligible BINs/categories with Pine Labs.
- Once Pay4 is enabled for a merchant, it is live for all users at that merchant; there is no user-level availability check like customer/card-level EMI eligibility.
- MVP launch is INR-only.
- Unsupported BINs and risk-blocked cases are blocked by the bank and fail during the transaction.
- Bank processing fee is issuer-specific and can vary by issuer, for example ₹99, ₹199, or ₹299.
- The current ₹99 value is only an example for prototype/demo.
- Checkout must display the exact bank processing fee before authentication.
- Pay Today must always be computed as first payment + bank processing fee.
- Before authentication, the customer should consent to the Pay4 payment schedule, today's payable amount including bank processing fee, issuer-managed collection of 3 monthly payments, and applicable issuer/Pine Labs/merchant terms.
- Saving a card for future Pay4 checkout is optional and should not gate payment CTA enablement.
- Pay4 consent language is provisional and may change based on bank and internal risk guidance.
- Unsupported BIN, issuer risk block, and similar Pay4 card ineligibility should use a safe customer-facing message: "This card is not eligible for Pay4. Please try another eligible credit card or choose another payment method."
- Internal systems should preserve bank reason codes such as unsupported BIN, issuer risk block, or other bank decline, but should not expose risk-block language to the customer.
- Risk-blocked and other generic card failure cases should follow the same error handling and flow used in the regular Cards flow today.
- Pine Labs should pre-validate Pay4 BIN eligibility when issuer BIN/category lists are available, while treating the bank response as final.
- Current assumption: all issuers will share eligible BINs. If this assumption changes, update this context and related ADRs.

## 4. Product Decision Areas

### Customer proposition

Core promise is pay one-fourth today and the rest over the next 3 months using an eligible credit card. Customer consent must cover schedule, Pay Today including bank processing fee, issuer-managed future collections, and applicable issuer/Pine Labs/merchant terms. Exact regulated wording remains subject to bank and internal risk guidance.

### Merchant proposition

Define conversion/AOV/discount-reduction story, settlement promise, and commercial positioning.

### Eligibility and limits

MVP eligibility is merchant-enabled, INR-only, issuer/BIN-led, and credit-card-only for participating issuer credit cards. Pay4 availability is not user-level like EMI. Unsupported BINs and bank risk blocks fail during transaction processing.

### Issuer/BIN support

Issuer rollout depends on bank-provided BIN/category lists. Pine Labs should use those lists to pre-validate eligibility where available, but bank response remains authoritative. Current assumption is that all issuers will share eligible BINs.

### Fees and commercials

Bank processing fee is issuer-specific and must be displayed exactly before authentication. Pay Today is always first payment plus bank processing fee. Merchant Pay4 fee, taxes, subvention/ISV, acquirer cost, bank program fee, and settlement ledger still need PRD/commercial definition.

### Checkout UX

Define placement, default selection rules, issuer information, consent, fee disclosure, ineligible states, and fallback paths. Checkout should reduce avoidable failures through BIN pre-validation where Pine Labs has issuer BIN/category data.

### Saved card / repeat use

Define saved-card eligibility, preselection, tokenization, card change, and repeat consent.

### Authentication

Define OTP/3DS/handoff experience, timeout handling, retry, and pending states.

### Failure and retry

Unsupported BIN and risk-blocked Pay4 failures should use a safe eligibility message and preserve internal bank reason codes. Risk-blocked and other generic card failures should follow the existing Cards flow error handling and customer journey.

### Refunds and cancellations

Define full refund, partial refund, cancellation, post-booking reversal, and issuer/acquirer coordination.

### Settlement and reporting

Define merchant settlement, bank receivables, acquirer settlement, fees, reconciliation, and reports.

### Risk/compliance/legal

Define final regulated copy, consent, disclosures, data handling, card network rules, and complaints process. Current consent direction is accepted as provisional pending bank and internal risk guidance.

### Analytics

Define funnel, eligibility, selection, failure, retry, conversion, AOV, settlement, refund, and support metrics.

### GTM and merchant onboarding

Define target categories, pilot merchants, enablement motion, objections, collateral, and success metrics.

### Operational support

Define customer support, merchant support, bank escalation, refunds, chargebacks, and reconciliation support.

### Prototype

Maintain the prototype as a disposable artifact for comparing UX directions and demos.

### PRD

Convert this context into production requirements and launch criteria.

### Collateral

Keep brochure/marketing language aligned with product decisions and legal/compliance review.

## 5. Resolved Decisions

- Pay4 will be shown as a standalone payment mode inside Pine Labs / Plural PG checkout.
- Pay4 will not be nested under Cards or EMI.
- Pay4 funding will be credit-card-led for current scope.
- Customers will not select a bank in the Pay4 flow.
- Supported issuers are informational before card entry.
- Current demo merchant is Stanley Living.
- Current demo order is ₹40,000.
- Current demo amount framing is Pay ₹10,099 today, then ₹10,000/month for 3 months.
- Current demo Pay Today is ₹10,099, including ₹99 bank processing fee.
- Current demo success title is Payment Successful.
- Current prototype keeps demo controls hidden by default.
- Current prototype uses Variant B for the first-time affordability story and Variant D for repeat saved-card story.
- MVP launch supports credit cards only from the initial participating issuers: HDFC Bank, ICICI Bank, Axis Bank, and Kotak.
- Other card types and issuers are out of scope for MVP.
- Bank partners will provide eligible BIN/category information.
- Once enabled on a merchant, Pay4 is available to all users at that merchant rather than using user-level availability like EMI.
- MVP launch is INR-only.
- Unsupported BINs and bank risk-blocked cases are blocked at bank side and fail during transaction.
- Bank processing fee varies by issuer; ₹99 is only the current prototype/demo example.
- Checkout must show the exact bank processing fee before authentication.
- Pay Today is always calculated as first payment plus bank processing fee.
- Customer consent before authentication should cover payment schedule, Pay Today including bank processing fee, issuer-managed collection of remaining payments, and applicable issuer/Pine Labs/merchant terms.
- Optional save-card consent is separate from required Pay4 terms consent and does not affect Pay4 CTA enablement.
- Consent language is provisional pending bank and internal risk guidance.
- Customer-facing Pay4 ineligible-card message: "This card is not eligible for Pay4. Please try another eligible credit card or choose another payment method."
- Bank reason codes should be preserved internally but risk-block language should not be exposed to customers.
- Risk-blocked and generic card failure cases follow the regular Cards flow error and retry/fallback behavior.
- Pine Labs will pre-validate Pay4 BIN eligibility when issuer BIN/category lists are available.
- Bank response remains final for eligibility and risk decisions.
- Current assumption is that all participating issuers will share eligible BINs.
- Pay4 will use existing card and EMI statuses that are already built and working today.
- Acquirer success is treated as final payment success for Pay4.
- Variant B checkout landing CTA is "Continue with Pay4"; final Pay4 detail CTA remains "Pay ₹10,099 Now."

## 6. Unresolved Questions

1. What final bank/risk/legal-approved customer consent wording is required?
2. What are the production refund and partial refund rules?
3. Can Pay4 be preselected for repeat eligible users?
4. What card tokenization/vault assumptions enable saved Pay4 cards?
5. What settlement/reporting ledger is required for merchant settlement versus acquirer settlement versus bank receivables?
6. What support ownership applies for future payment collection disputes?
7. How should issuer BIN/category lists be configured, refreshed, versioned, and audited?
8. How should issuer-specific processing fees be configured, refreshed, versioned, and audited?
9. Which exact existing Cards flow errors should Pay4 inherit for generic card failures?
10. Are there any Pay4-specific pending states not covered by existing card/EMI statuses?

## 7. Grill Queue

1. Define issuer BIN/category list operations and audit process.
2. Define issuer-specific processing fee configuration and audit process.
3. Define repeat saved-card rules.
4. Confirm whether existing card/EMI statuses cover all Pay4 pending and failure states.
5. Define refunds, partial refunds, and cancellations.
6. Define settlement and reconciliation model.
7. Define merchant onboarding/configuration requirements.
8. Define analytics and launch-readiness metrics.
9. Finalize consent wording after bank and internal risk review.
10. Map exact existing Cards flow errors that Pay4 should inherit for generic card failures.

## 8. Artifacts

- Current prototype: `src/pay4-prototype/pay4-prototype.js` and `src/pay4-prototype/pay4-prototype.css`
- Prototype notes: `src/pay4-prototype/NOTES.md`
- Project README: `README.md`
- Agent/product guardrails: `AGENTS.md`
- Brochure route: `brochure/index.html` and `src/pay4-prototype/pay4-brochure.js`
- QA screenshots folder mentioned by README: `dist/qa-screenshots/`
- Future PRD folder: `docs/prd/`
- Future GTM folder: `docs/gtm/`
- Future ops folder: `docs/ops/`
- Future research folder: `docs/research/`
- Durable decisions: `docs/adr/`

# Pay4 Product Readiness Map

## Track 1: Customer Proposition

Status: Draft / Needs validation

Known decisions:
- Customer promise is pay one-fourth today and the rest over the next 3 months using an eligible credit card.
- Pay Today includes the first payment plus issuer-specific bank processing fee.
- UI copy should frame the demo as Pay ₹10,099 today, then ₹10,000/month for 3 months, rather than using ambiguous total-split shorthand as the primary message.
- Pay4 is not positioned as Pine Labs underwriting.

Open risks:
- Final legal/risk-approved repayment and consent language is not approved.
- Customer may misunderstand card limit usage, issuer-managed future collections, or processing fee.
- "Interest-free", "no hidden charges", and similar benefit language need compliance review.

Recommended next action:
- Draft customer copy set for checkout, success, failure, FAQ, and support; send for bank/risk/legal review.

## Track 2: Merchant Proposition

Status: Draft / Needs validation

Known decisions:
- Merchant proposition is conversion and affordability without discounting.
- Merchant receives order value upfront as per Pay4 settlement/commercial terms.
- Pay4 is order-level / invoice-level, not SKU-level.

Open risks:
- "Paid upfront" is not yet mapped to settlement timing, net deductions, reports, or refund behavior.
- Merchant-facing fee, settlement, and refund obligations are not fully defined.

Recommended next action:
- Define merchant settlement promise, settlement timing, Pay4 fee deduction, refund treatment, and reporting view before PRD sign-off.

## Track 3: Eligibility and Issuer/BIN Rules

Status: Draft / Needs operating model

Known decisions:
- MVP supports credit cards from HDFC Bank, ICICI Bank, Axis Bank, and Kotak.
- Other cards are out of scope for MVP.
- MVP is INR-only.
- Banks will share eligible BIN/category lists.
- Pine Labs will pre-validate BIN eligibility when lists are available; bank response remains final.
- Pay4 is live for all users once merchant-enabled; no EMI-style user-level availability.

Open risks:
- BIN/category list ingestion, refresh, versioning, and audit process is undefined.
- Failure reason mapping between Pine Labs pre-validation and bank response is undefined.
- Issuer list assumptions may change if banks do not share eligible BINs reliably.

Recommended next action:
- Define BIN/category list operations: owner, source format, cadence, versioning, audit, rollback, and failure-code mapping.

## Track 4: Fee and Commercial Model

Status: Draft / Needs commercial configuration model

Known decisions:
- Bank processing fee is issuer-specific and may vary, for example ₹99, ₹199, or ₹299.
- ₹99 is prototype/demo example only.
- Checkout must show exact fee before authentication.
- Pay Today = first payment + bank processing fee.

Open risks:
- Owner of issuer fee configuration is undefined.
- Fee versioning, taxes, effective date, amount-band logic, and audit are undefined.
- Merchant Pay4 fee, subvention/ISV, bank program fee, acquirer cost, and settlement ledger are not production-defined.

Recommended next action:
- Define pricing configuration model with issuer fee, merchant fee, tax treatment, effective dates, and transaction-time pricing snapshot.

## Track 5: Checkout UX and Copy

Status: Draft / Prototype validated direction

Known decisions:
- Pay4 is standalone and not inside Cards or EMI.
- Supported issuers are informational, not selectable.
- Show issuers before card entry.
- Fee must be shown wherever Pay Today differs from first payment.
- Unsupported/ineligible customer message is safe and generic.

Open risks:
- Final approved copy is pending.
- Existing Cards flow inheritance for generic failures needs exact mapping.
- Production placement/default selection rules are not finalized.

Recommended next action:
- Create a checkout copy matrix: default, supported card, unsupported card, debit card, bank decline, auth failure, success, refund, and support copy.

## Track 6: Saved Card / Repeat User

Status: Draft / Needs production dependency definition

Known decisions:
- Variant D is repeat-user demo.
- Repeat user sees saved HDFC Bank Credit Card ending 1234 in prototype.
- Saved-card quick-pay is desired for repeat behavior.

Open risks:
- Saved-card/tokenization dependency is not defined.
- Preselection policy is not decided.
- Consent requirements for repeat transactions may differ from first-time transactions.

Recommended next action:
- Define saved-card prerequisites, tokenization/vault dependency, BIN revalidation, preselection rules, and repeat consent requirements.

## Track 7: Authentication, Failure, Retry

Status: Draft / Uses existing rails

Known decisions:
- Bank/card response is final.
- Risk-blocked and generic card failures follow regular Cards flow.
- Internal bank reason codes should be preserved.
- Pay4 will use existing card and EMI statuses already built and working today.
- Acquirer success is treated as final payment success.

Open risks:
- Any Pay4-specific pending or failure cases not covered by existing card/EMI statuses could be missed.
- Reason-code mapping for Pay4-specific ineligible BIN and issuer/risk outcomes still needs PRD detail.

Recommended next action:
- Map Pay4-specific reason codes onto existing card/EMI status and error handling; only add new statuses if existing rails cannot represent a case.

## Track 8: Refunds, Cancellations, Reversals

Status: Blocked

Known decisions:
- Refund/cancellation is acknowledged as required but only placeholder-level today.

Open risks:
- Full refund, partial refund, cancellation timing, bank booking reversal, future-payment adjustment, and merchant settlement impact are undefined.
- This is likely a go-live blocker for merchant onboarding and support.

Recommended next action:
- Define refund and cancellation policy by transaction state: before auth, after auth before bank booking, after booking, after merchant settlement, and after future payments have begun.

## Track 9: Settlement and Reporting

Status: Blocked

Known decisions:
- Merchant receives order value upfront as per Pay4 settlement/commercial terms.
- Merchant settlement is net of Pay4 charges.

Open risks:
- Exact settlement amount, timing, deductions, receivables, acquirer settlement, bank program fee, and reconciliation ledger are not defined.
- Merchant promise cannot be operationalized without a ledger model.

Recommended next action:
- Define settlement ledger and reports: purchase amount, auth amount, merchant Pay4 fee, bank processing fee, merchant settlement, acquirer settlement, bank receivable, refunds, and reconciliation IDs.

## Track 10: Risk, Legal, Compliance

Status: Needs validation

Known decisions:
- Consent scope is provisionally defined.
- Risk-block language is not exposed to customers.
- Pay4 is positioned as credit-card-funded Pay-in-4, not Pine Labs underwriting.

Open risks:
- Final consent, disclosures, benefit claims, terms links, complaints process, and issuer-specific terms are not approved.
- "Interest-free/no hidden charges" claims may be risky if issuer fees vary.

Recommended next action:
- Create legal/risk review pack with customer copy, fee disclosure, consent, terms links, success/failure copy, and support FAQs.

## Track 11: Analytics and Success Metrics

Status: Needs definition

Known decisions:
- Success metrics are proposed at high level: adoption, eligibility, selection, auth success, conversion, AOV, refunds, support tickets, settlement accuracy.

Open risks:
- Event taxonomy and dashboard requirements are not defined.
- Eligibility failures, bank declines, and Pine Labs pre-validation failures may be conflated without event design.

Recommended next action:
- Define analytics event taxonomy and dashboards for funnel, eligibility, issuer, fee display, auth, retry, fallback, settlement, refunds, and support.

## Track 12: GTM and Merchant Launch

Status: Draft / Needs pilot plan

Known decisions:
- Target categories include furniture, mattresses, fashion/lifestyle, travel, healthcare/wellness, education/upskilling, eyewear, and premium retail.
- Sales story is affordability-led conversion without discount dependency.

Open risks:
- Pilot merchant criteria, category sequencing, merchant objections, enablement process, and support readiness are not finalized.
- Sales may overpromise before settlement/refund/commercial mechanics are locked.

Recommended next action:
- Create pilot launch checklist: merchant eligibility, issuer coverage, commercials, support readiness, reporting, refund flow, sales collateral, and launch metrics.

# Prioritized Product Questions

## P0

1. Question: What is the settlement ledger for Pay4, including purchase amount, auth amount, merchant Pay4 fee, customer bank processing fee, merchant settlement, acquirer settlement, bank receivable, refunds, and reconciliation IDs?
   Why it matters: The merchant promise depends on settlement accuracy and reporting.
   Recommended default: Create a Pay4-specific ledger with immutable transaction-time pricing snapshots and separate fields for customer fee, merchant fee, issuer receivable, acquirer cost, and merchant settlement.
   Owner likely needed: Settlement/finance, product, engineering, commercial.
   Artifact impacted: PRD / Ops / GTM / Legal

2. Question: What is the production refund, partial refund, cancellation, and reversal policy for each transaction state?
   Why it matters: Refund ambiguity blocks merchant onboarding, support readiness, and legal approval.
   Recommended default: Support full refunds for MVP; defer partial refunds unless issuer rails are certified; define reversal handling separately before and after issuer booking.
   Owner likely needed: Product, issuer integration, ops, settlement/finance, legal.
   Artifact impacted: PRD / Ops / Legal / GTM

3. Question: How will issuer BIN/category lists and issuer-specific processing fees be configured, refreshed, versioned, approved, and audited?
   Why it matters: Eligibility and Pay Today accuracy depend on these configs.
   Recommended default: Use centrally managed versioned config with effective dates, maker-checker approval, audit logs, and transaction-time snapshotting.
   Owner likely needed: Product ops, engineering, risk, issuer partnerships.
   Artifact impacted: PRD / Ops / Legal

4. Question: What exact customer consent, fee disclosure, and terms copy is approved for launch?
   Why it matters: Checkout cannot go live without approved disclosure and consent.
   Recommended default: Use the current consent scope as product default, then route exact wording through bank, legal, compliance, and risk review.
   Owner likely needed: Legal, compliance, risk, product, issuer partnerships.
   Artifact impacted: PRD / Legal / Prototype / Brochure

## P1

6. Question: Should Pay4 be preselected for repeat users with a saved eligible card?
   Why it matters: This affects conversion, user trust, and consent.
   Recommended default: Preselect only for repeat users with a saved card that passes local BIN validation; always show fallback methods and final issuer validation.
   Owner likely needed: Product, design, legal/risk.
   Artifact impacted: PRD / Prototype

7. Question: What saved-card/tokenization dependency enables repeat Pay4?
   Why it matters: Repeat quick-pay cannot be productionized without vault/token rules.
   Recommended default: Require tokenized saved credit cards and revalidate BIN/issuer eligibility at transaction time.
   Owner likely needed: Engineering, PG/card platform, compliance.
   Artifact impacted: PRD / Ops

8. Question: Which exact existing Cards flow failure states does Pay4 inherit?
   Why it matters: Pay4 should not invent new behavior for generic card failures.
   Recommended default: Inherit regular Cards flow for auth failure, timeout, bank decline, retry, and fallback; add Pay4-specific copy only for ineligible card/BIN.
   Owner likely needed: Product, engineering, design, support.
   Artifact impacted: PRD / Ops / Prototype

9. Question: What merchant enablement process activates Pay4?
   Why it matters: GTM and ops need to know how Pay4 becomes live for a merchant.
   Recommended default: Merchant-level config with category/MCC/risk validation, issuer support check, commercial setup, and sales/support readiness checklist.
   Owner likely needed: Product, sales/GTM, risk, ops, engineering.
   Artifact impacted: PRD / GTM / Ops

10. Question: What minimum analytics event taxonomy is needed for pilot?
    Why it matters: Pilot success cannot be measured without event design.
    Recommended default: Track impression, eligibility/pre-validation, selection, fee display, card entry, consent, auth start, auth result, bank booking result, success, failure reason, retry, fallback, refund, settlement status.
    Owner likely needed: Product, analytics, engineering, ops.
    Artifact impacted: PRD / GTM / Ops

## P2

11. Question: Should SKU-level financing remain out of scope after MVP?
    Why it matters: Merchant categories may request product-level affordability messaging.
    Recommended default: Keep out of scope until order-level Pay4 is stable.
    Owner likely needed: Product, GTM, merchant success.
    Artifact impacted: PRD / GTM

12. Question: How should SBI Card Coming Soon be represented outside the prototype?
    Why it matters: Coming-soon messaging can create customer confusion if shown in production checkout.
    Recommended default: Show coming soon only in collateral or merchant education; hide from production issuer lists until live unless legal/product approves.
    Owner likely needed: Product, issuer partnerships, legal.
    Artifact impacted: GTM / Brochure / PRD

13. Question: Which merchant categories should be prioritized for pilot?
    Why it matters: GTM focus impacts issuer economics, risk, and integration effort.
    Recommended default: Start with furniture, mattresses, and premium lifestyle merchants because the affordability story is strongest.
    Owner likely needed: GTM, product, risk, commercial.
    Artifact impacted: GTM

14. Question: Should Pay4 support product-page/cart affordability widgets in MVP?
    Why it matters: Discovery before checkout may improve conversion but increases scope.
    Recommended default: Defer widget to post-MVP; keep MVP focused on checkout payment mode.
    Owner likely needed: Product, GTM, engineering.
    Artifact impacted: PRD / GTM / Brochure
