# Pay4 Product Master Brief

This is the master product brief for Pay4 as an end-to-end product workstream. It is not a prototype-only brief. The current prototype, brochure, PRD drafts, GTM materials, ops notes, and future implementation planning should all ladder back to this brief.

## 1. Product One-Liner

Pay4 by Pine Labs lets online shoppers split eligible credit-card-funded purchases into 4 simple payments, while merchants receive the order value upfront as per Pay4 settlement/commercial terms.

## 2. Product Concept

Pay4 is a standalone payment mode in Pine Labs / Plural PG checkout. It is not inside Cards and it is not inside EMI. The credit card is the funding instrument; Pay4 is the payment mode.

Pay4 reframes high upfront purchase amounts into a lower first-payment decision. For the current demo: a ₹40,000 order becomes Pay ₹10,099 today, then ₹10,000/month for 3 months. The amount due today includes a ₹10,000 first payment plus a ₹99 bank processing fee.

Pay4 is positioned as credit-card-funded online checkout affordability, not as separate Pine Labs underwriting. Issuer banks own credit, repayment, card limit treatment, bank booking, and future collections. Pine Labs orchestrates the checkout experience, eligibility/pricing display, bank/acquirer integration, merchant settlement, reporting, and reconciliation.

## 3. Current Demo / Prototype Context

- Merchant: Stanley Living
- Product: Handwoven Wool Carpet
- Order amount: ₹40,000
- Pay4 framing: Pay ₹10,099 today, then ₹10,000/month for 3 months
- Bank processing fee: ₹99
- Pay today: ₹10,099
- Supported issuers shown: HDFC Bank, ICICI Bank, Axis Bank, Kotak, SBI Card Coming Soon
- Variant B is the recommended CEO first-time affordability demo
- Variant D is the recommended repeat saved-card demo
- Variants A and C are exploratory alternatives
- Static mocked frontend only
- No backend, no real APIs, no persistence, no sensitive data

## 4. Target Stakeholders

- Shopper/customer
- Merchant
- Issuer/bank partner
- Pine Labs product
- Pine Labs engineering
- Pine Labs risk/compliance/legal
- Pine Labs ops/support
- Pine Labs settlement/finance
- Pine Labs sales/GTM

## 5. Customer Problem

Customers with purchase intent can hesitate at online checkout when the full upfront amount feels too high, especially for mid-ticket and premium categories.

## 6. Merchant Problem

Merchants want conversion without discounting. They need an affordability lever that improves checkout completion and AOV while preserving merchant value.

## 7. Core Customer Promise

Pay one-fourth today and the rest over the next 3 months using an eligible credit card.

## 8. Core Merchant Promise

Merchant gets paid upfront as per Pay4 settlement/commercial construct while customer pays in 4 installments.

## 9. Product Scope

- Online PG checkout
- INR transactions
- Enabled merchants
- Eligible transaction amount
- Eligible credit cards
- Issuer/BIN eligibility
- 4-payment construct
- Card-led eligibility
- Accepted issuer information before card entry
- Repeat saved-card journey
- First-time card entry journey
- Failure/retry/fallback states
- Order-level / invoice-level financing
- Merchant settlement and reporting requirements

## 10. Non-Goals / Out of Scope

- POS flow
- SKU-level financing unless later decided
- Brand-level financing unless later decided
- Tenure selector
- EMI calculator
- Bank selection UX
- UPI, wallet, debit, or netbanking funding inside Pay4
- Real underwriting account-creation flow
- Production integration inside this static prototype repo

## 11. Key Journeys

- First-time Pay4 user
- Repeat/saved-card user
- Use another card
- Ineligible card/BIN
- Debit card
- SBI coming soon
- Auth failure/retry
- Fallback payment method
- Success
- Refund/cancellation placeholder
- Settlement/reporting placeholder
- Merchant onboarding placeholder

## 12. UX Principles

- Pay4 must be visible as a standalone payment mode.
- Do not hide Pay4 inside Cards or EMI.
- Show fee clearly when Pay Today differs from the first installment.
- Supported issuers are informational, not selectable.
- Card entry is the point where eligibility is checked in the customer flow.
- Demo controls are hidden by default.
- Use Variant B for the CEO affordability story.
- Use Variant D for the repeat-user story.
- Keep merchant app context visually separate from PG checkout.
- Keep the checkout language clear: no internal bank rail language in customer UI.

## 13. Collateral / Brochure State

- Customer-facing message: Pay one-fourth today and the rest over the next 3 months using an eligible credit card.
- Merchant-facing value proposition: affordability-led conversion without making discounting the only lever.
- Issuer participation language: participating issuers enable eligible credit-card-funded Pay4 transactions.
- Fee explanation: Pay Today may include an issuer-specific bank processing fee; show it before authentication.
- Trust/security language: card authentication and card data handling must follow the existing PG/card security posture.
- Terms/legal language pending: exact customer consent, issuer terms, processing-fee language, and repayment wording require legal/compliance validation.

## 14. PRD State

- Goals: define customer, merchant, issuer, and Pine Labs outcomes for MVP.
- Requirements: convert prototype flows into production-ready functional requirements.
- Eligibility: define merchant, amount, issuer, BIN, card type, risk, and failure eligibility rules.
- API/integration requirements: define hosted checkout, widget, and API paths.
- Analytics: define funnel, eligibility, conversion, auth, retry, failure, settlement, and support metrics.
- Settlement/reporting: define merchant settlement, issuer receivables, acquirer settlement, and reconciliation.
- Edge cases: define refund, cancellation, partial refund, booking pending, bank downtime, and support cases.
- Launch criteria: define readiness gates across product, engineering, risk, legal, ops, settlement, and GTM.

## 15. GTM State

- Target merchant categories: furniture, mattresses, fashion/lifestyle, travel, healthcare/wellness, education/upskilling, eyewear, premium retail.
- Sales story: Pay4 converts checkout hesitation into a simple Pay-in-4 decision.
- Merchant objections: fees, settlement, refunds, customer confusion, issuer coverage, operational support.
- Customer objections: fee, card eligibility, future payments, card limit usage, debit card unavailability.
- FAQs: needs product/legal review.
- Launch plan: identify pilot merchants, categories, issuer support, enablement path, support process, and measurement plan.
- Success metrics: adoption, eligibility rate, Pay4 selection rate, auth success, conversion uplift, AOV, refund rate, support tickets, settlement accuracy.

## 16. Open Questions

- What exact transaction amount range should be eligible for Pay4?
- Is the ₹99 bank processing fee fixed, issuer-specific, merchant-specific, or amount-dependent?
- Is SBI Card coming soon, hidden, or included in the MVP eligibility roadmap?
- How should customer consent be worded for future collections and issuer terms?
- How does Pay4 affect card limit treatment across issuers?
- What is the exact bank booking mode and rail per issuer?
- What happens when bank booking succeeds but PG confirmation or merchant callback fails?
- What is the full/partial refund contract across merchant, Pine Labs, acquirer, and issuer?
- What cancellation window exists before settlement or bank booking?
- Can Pay4 be preselected for eligible repeat users in production?
- What card vault/tokenization dependency is required for saved Pay4 cards?
- Should the MVP support corporate, international, prepaid, or add-on cards?
- What merchant categories, MCCs, and risk segments are excluded?
- What customer support ownership model applies after purchase?
- What reporting and reconciliation views are required for merchants, banks, and Pine Labs finance?

## 17. Document Map

- `CONTEXT.md` = living domain model and decision log
- `docs/adr` = durable decisions
- `docs/prd` = PRD drafts
- `docs/gtm` = launch/GTM materials
- `docs/ops` = edge cases, refunds, ops/support
- `docs/research` = grilling logs/research
- `docs/prototype` = prototype notes and demo guidance
