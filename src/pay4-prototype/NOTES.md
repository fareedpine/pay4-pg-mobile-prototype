# Pay4 Prototype Notes

## Purpose

This is a disposable interactive frontend prototype for CEO/demo review. It is not production checkout code and does not call any real payment systems.

## Source of Truth

The prototype is Pay4 inside Pine Labs / Plural PG mobile checkout, with a lightweight Stanley Living merchant app pre-checkout flow.

Stanley Living is the demo merchant.

## Demo Merchant and Order

- Merchant: Stanley Living
- Product: Handwoven Wool Carpet
- Order amount: ₹40,000
- Pay4 split: ₹10,000 x 4 payments
- Processing fee: ₹99
- Pay today: ₹10,099
- Funding instrument: eligible credit card

Merchant app screens are demo context only. Pine Labs PG checkout is the main prototype.

## Local Logo Assets

Pay4 logo asset:

- `public/assets/pay4-logo-by-pinelabs.png` — reusable Pay4 UI logo loaded through the public asset path.

Logo files are local prototype assets in `src/pay4-prototype/assets/`:

- `stanley-living-logo.svg` — 247 x 205
- `hdfc-bank-logo.svg` — 2048 x 320
- `icici-bank-logo.svg` — 255 x 197
- `axis-bank-logo.svg` — 2048 x 529
- `kotak-bank-logo.svg` — 266 x 190
- `sbi-card-logo.svg` — 900 x 500

These should be replaced or validated with approved production assets before external/public use.

## Product Assumptions

- Pay4 appears directly as a standalone payment mode.
- Pay4 is card-led, not bank-selection-led.
- First-time users enter eligible credit card details inside Pay4.
- Repeat users see saved HDFC Bank Credit Card ending 1234 inside Pay4.
- Eligibility is controlled by Demo Controls/query params for prototype reliability.
- Issuer chips are informational only.
- SBI Card is shown as Coming soon.
- Demo controls are hidden by default.
- Query params are the primary way to share demo scenarios.
- Pay4 offer-led copy means affordability benefit, not discount/savings.

## Variant Hypotheses

### Variant A — Minimal Trusted Checkout

Hypothesis: Pay4 should behave like a normal trusted payment mode with minimal extra promotion.

This variant keeps Pay4 restrained and near the top, with Pay4, By Pine Labs, NEW, and ₹10,000 × 4 Payments. It avoids large affordability banners and tests whether Pay4 can succeed as a simple standalone payment mode.

This is an exploratory alternative.

### Variant B — Offer-led Pay4-first Checkout

Hypothesis: The strongest demo story is affordability-led: Pay ₹10,099 today instead of ₹40,000 upfront.

This is the main CEO demo variant for first-time users. Pay4 is first, expanded by default, and includes Pay Today ₹10,099, ₹10,000 × 4 Payments, the trust benefit strip, and Continue with Pay4 on the checkout landing. It should not imply discount or savings.

This is the recommended CEO first-time affordability demo.

### Variant C — Payment-method-first Checkout

Hypothesis: Pay4 should sit inside the normal payment-method hierarchy and compete fairly with UPI, Cards, EMI, Net Banking, and Wallets.

This variant uses the order UPI, Cards, EMI, Pay4, Net Banking, Wallets. Pay4 remains standalone with NEW and ₹10,000 × 4 Payments, but it is not expanded by default.

This is an exploratory alternative.

### Variant D — Mobile-first Repeat Checkout

Hypothesis: For repeat users, Pay4 should feel like saved-card quick pay.

This variant highlights saved HDFC Bank Credit Card ending 1234, enables Pay ₹10,099 Now for repeat users, and keeps Use Another Card as the secondary action. It is the main CEO demo variant for repeat Pay4.

This is the recommended repeat saved-card demo.

## Figma Inspiration

The prototype borrows from the All New PG Mobile card flows:

- Dark Pine green PG checkout header.
- gateway.plural.com browser context.
- Clean payment mode list with simple line icons.
- Rounded modules.
- Saved card pattern for repeat user.
- Fixed/sticky bottom CTA.
- Concise payment detail screens.
- Processing, failure, retry, and success states.

## Payment Mode Order

Variants A, B, and D:

1. Pay4 — By Pine Labs · Pay in 4 simple payments
2. UPI — PhonePe, GooglePay, PayTM, CRED & more
3. Cards — Visa, MasterCard, RuPay & more
4. EMI — Credit, Debit & Cardless EMIs
5. Net Banking — All major banks
6. Wallets — Paytm, PhonePe and more

Variant C:

1. UPI — PhonePe, GooglePay, PayTM, CRED & more
2. Cards — Visa, MasterCard, RuPay & more
3. EMI — Credit, Debit & Cardless EMIs
4. Pay4 — By Pine Labs · Pay in 4 simple payments
5. Net Banking — All major banks
6. Wallets — Paytm, PhonePe and more

## Required Pay4 States

First-time user:

1. Select Pay4.
2. See concise Pay4 explanation.
3. See ₹10,000 × 4 Payments.
4. See Pay today ₹10,099.
5. See accepted issuers informational logos/chips.
6. Enter eligible credit card details.
7. Accept consent/terms.
8. Pay ₹10,099 Now.
9. Simulated processing/authentication.
10. Success or failure.

Repeat user:

1. Select Pay4.
2. See saved HDFC Bank Credit Card ending 1234.
3. Pay ₹10,099 Now.
4. Simulated processing/authentication.
5. Success or failure.

Ineligible states:

- Debit card: “Pay4 is available only on eligible credit cards.”
- Unsupported card/BIN: “This card is not eligible for Pay4. Try an HDFC, ICICI, Axis or Kotak credit card.”
- SBI Card: “SBI Card is Coming soon for Pay4.”
- Amount issue: “Pay4 is not available for this order amount. Please choose another payment method.”
- Authentication: “Authentication failed. Try again or choose another payment method.”

## Mocked Behavior

- No backend exists.
- No real payment API is called.
- No bank API is called.
- No OTP is sent.
- No card, bank, phone, or customer credential is stored.
- Card/BIN eligibility is simulated by query params/demo controls.
- Processing is simulated with a short delay.
- Success/failure outcome is controlled by query params and demo controls.

## Testing Expectations

Before demo, verify:

- Variant switch through Demo Controls and `variant=a|b|c|d` URLs.
- Variant A, B, C, and D are visibly distinct.
- Eligibility control behavior for eligible and ineligible states.
- Card form validation for number, expiry, CVV, name, consent, and CTA enablement.
- Prototype expiry format is MM/YY.
- Repeat saved-card default path, Use Another Card, and Use Saved Card.
- Debit, unsupported card, SBI coming soon, amount, failure/retry, and success states.
- Product → Cart → PG checkout → Pay4 flow.
- Demo Controls hidden by default and Debug State collapsed.

## Open Questions

- Exact regulated copy for Pay4 benefits.
- Exact processing fee.
- Whether SBI should be shown as Coming soon or hidden.
- Exact backend rail.
- Partial refunds.
- Corporate/international cards.
- Bank booking failure handling.
- Whether OTP/3DS should be a handoff screen or simulated processing only.
- Approved Stanley Living and bank logo asset usage for external/public demos.

## Production Follow-Ups

- Confirm Pay4 legal/regulatory copy.
- Confirm eligibility rules by merchant, amount, card type, issuer, and risk checks.
- Replace local prototype logos with approved brand/bank assets.
- Replace mocked processing with real PG orchestration after product/legal/security sign-off.
- Confirm whether Pay4 can be preselected for repeat users.
- Confirm whether Pay4 consent/setup requires separate legal acceptance.

## Known Rough Edges

- Issuer display currently uses compact text chips for demo reliability; approved logo treatment can be revisited later.
- Stanley Living merchant screens are lightweight demo context, not a production merchant app.
- Variant styling is intentionally disposable and should not be treated as a production design system.
