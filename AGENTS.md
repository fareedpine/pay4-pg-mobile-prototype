# AGENTS.md — Pine Labs PG Mobile Pay4 Prototype

## Objective

Build a throwaway CEO-demo-ready prototype for Pay4 inside Pine Labs / Plural PG mobile checkout.

The demo should feel end-to-end:

Stanley Living app → cart/payment intent → Pine Labs PG checkout → Pay4.

This is not production code. It exists to compare UI/UX directions quickly.

## Source of Truth

Do not build a merchant-owned desktop checkout.

Use:

- Demo merchant: Stanley Living
- Product: Handwoven Wool Carpet
- Order amount: ₹40,000
- Pay4 split: ₹10,000 × 4 Payments
- Processing fee: ₹99
- Pay today: ₹10,099
- Funding instrument: eligible credit card

Pay4 is a standalone payment mode in Pine Labs / Plural PG checkout. It is not inside Cards or EMI.

Do not bring back Croma, Wakefit web checkout, ₹95,949, bank selection, fake bank logo cards, or the heading “Pay4 payment successful”.

## Variant Requirement

The four variants are mandatory and must be meaningfully different. Variant switching must work through `variant=a|b|c|d` query params and Demo Controls without losing existing user, eligibility, outcome, card, or flow state.

### Variant A — Minimal Trusted Checkout

Hypothesis: Pay4 should behave like a normal trusted payment mode with minimal extra promotion.

UI behavior:

- Pay4 appears near the top, but not overly expanded.
- Pay4 row is clean and restrained.
- Shows Pay4, By Pine Labs, ₹10,000 × 4 Payments, and NEW badge.
- No large affordability banner.
- Trust/support copy is subtle.
- User taps View Pay4 Details to enter Pay4 detail.

What it tests: Whether Pay4 can succeed as a simple standalone payment mode without over-promotion.

Variant A is an exploratory alternative, not the default CEO demo path.

### Variant B — Offer-led Pay4-first Checkout

Hypothesis: The strongest demo story is affordability-led: Pay ₹10,099 today instead of ₹40,000 upfront.

UI behavior:

- Pay4 is first and visually highlighted.
- Pay4 is expanded by default on checkout landing.
- Shows Pay Today ₹10,099 and ₹10,000 × 4 Payments.
- Shows benefit strip: Interest-free, No hidden charges, Safe & secure, Trusted by Pine Labs.
- CTA is View Pay4 Details.

This is not a discount offer. Do not say save or imply a discount; it is an affordability/instalment benefit.

What it tests: Whether highlighting Pay4’s affordability improves discoverability and comprehension.

Variant B is the recommended CEO first-time affordability demo.

### Variant C — Payment-method-first Checkout

Hypothesis: Pay4 should sit inside the normal payment-method hierarchy and compete fairly with UPI, Cards, EMI, Net Banking, and Wallets.

UI behavior:

- Payment modes look more equal.
- Pay4 is visible and standalone, but less hero-like than Variant B.
- Order: UPI, Cards, EMI, Pay4, Net Banking, Wallets.
- Pay4 has NEW badge and ₹10,000 × 4 Payments cue.
- No default expanded hero treatment.

What it tests: Whether Pay4 works when presented as one payment mode among others.

Variant C is an exploratory alternative, not the default CEO demo path.

### Variant D — Mobile-first Repeat Checkout

Hypothesis: For repeat users, Pay4 should feel like saved-card quick pay.

UI behavior:

- Optimized for repeat user.
- Saved HDFC Bank Credit Card ending 1234 is prominent.
- Pay4 can be preselected/expanded by default.
- Primary action is Pay ₹10,099 Now.
- Use Another Card is secondary.
- Issuer info remains compact.
- Minimal explanation; prioritize speed.

What it tests: Whether repeat Pay4 can become a two-click checkout behavior.

Variant D is the recommended repeat saved-card demo.

## Asset Rules

Logo assets live in `src/pay4-prototype/assets/`:

- `stanley-living-logo.svg`
- `hdfc-bank-logo.svg`
- `icici-bank-logo.svg`
- `axis-bank-logo.svg`
- `kotak-bank-logo.svg`
- `sbi-card-logo.svg`

Pay4 branding is loaded from `public/assets/pay4-logo-by-pinelabs.png`.

Use local assets only. Do not hotlink or fetch logos from the web.

Uploaded/local logo assets are prototype assets. Validate approved merchant/bank brand assets before external demo or production use. The current issuer display may use compact text chips for demo reliability.

## Entry Flow

Add `entry=merchant|pg`.

Default CEO path:

`?entry=merchant&variant=b&user=first&eligible=true&outcome=success&step=product`

Checkout-only path:

`?entry=pg&variant=b&user=first&eligible=true&outcome=success&step=checkout`

Merchant app screens are lightweight demo context only. Pine Labs / Plural PG checkout remains the main prototype.

## PG Mobile Direction

Use the All New PG Mobile Figma visual language:

- Mobile frame around 412 × 892
- gateway.plural.com browser context
- Dark Pine green PG header
- Merchant name and payable amount
- Clean payment option list
- Simple line icons
- Rounded modules
- Saved-card-like repeat-user module
- Fixed bottom CTA
- Concise screens with less vertical scroll

## Pay4 Product Rules

- Pay4 is card-led, not bank-selection-led.
- Do not ask the user to select a bank.
- First-time user enters eligible credit card details inside Pay4.
- Repeat user sees saved HDFC Bank Credit Card ending 1234 inside Pay4.
- Eligibility is controlled by Demo Controls/query params, not real BIN logic.
- Supported issuer chips are informational only.
- SBI Card is Coming soon and should not be treated as currently eligible.
- No tenure selector.
- No EMI calculator.
- No SKU-level financing.
- No real payment APIs.
- No persistence of customer/card/payment data.

## Bug-Fix Guardrails

Do not regress:

1. `eligible=true` must never show ineligible card errors.
2. `eligible=false` must show the correct ineligible reason.
3. Card Number accepts numbers only, max 16 digits, and does not reset while typing.
4. Expiry accepts numbers only and auto-formats MM/YYYY.
5. CVV accepts numbers only, max 3 digits.
6. CTA enables only when required fields are valid and consent is checked.
7. Detected Card does not appear before valid card entry.
8. Repeat saved-card flow has Use Another Card.
9. Use Another Card opens card form and validates correctly.
10. Use Saved Card returns to saved HDFC card.
11. Proceed to Pay ₹40,000 is centered.
12. Demo Controls are hidden by default.
13. Debug JSON is collapsed.

## First-Time Pay4 Journey

1. Select Pay4.
2. See concise Pay4 explanation.
3. See ₹10,000 × 4 Payments.
4. See Pay Today ₹10,099.
5. See accepted issuer chips as informational content.
6. Enter eligible credit card details.
7. Accept consent/terms.
8. CTA: Pay ₹10,099 Now.
9. Simulated processing/authentication.
10. Success or failure.

## Repeat Pay4 Journey

1. Select Pay4.
2. See saved HDFC Bank Credit Card ending 1234.
3. See ₹10,000 × 4 Payments.
4. CTA: Pay ₹10,099 Now.
5. Option: Use Another Card.
6. Simulated processing/authentication.
7. Success or failure.

Repeat flow should feel like 2-click quick checkout.

## Demo Controls

Demo controls are hidden by default.

Show a small floating Demo Controls button outside the phone frame. It opens a side drawer on desktop and a modal/bottom sheet on mobile.

Move visible state JSON into a collapsed Debug State section. Include Copy Current Demo Link.

## Done Means

- Runs locally with one command.
- Builds static `dist/`.
- Full merchant → PG → Pay4 demo works.
- Checkout-only links still work.
- Pay4 is standalone.
- Four variants are visibly distinct and documented.
- No bank-selection step exists.
- Demo Controls are hidden by default.
- `NOTES.md` documents assumptions, mocked behavior, variant hypotheses, open questions, and follow-ups.
