# Prototype Workspace

## Current Prototype Purpose

The current prototype demonstrates Pay4 as a standalone payment mode inside Pine Labs / Plural PG mobile checkout. It is a static mocked frontend used for CEO/stakeholder review and UX/product exploration.

## Demo URLs

- Main CEO demo: `/?entry=merchant&variant=b&user=first&eligible=true&outcome=success&step=product`
- Checkout-only offer-led: `/?entry=pg&variant=b&user=first&eligible=true&outcome=success&step=checkout`
- Minimal trusted: `/?entry=pg&variant=a&user=first&eligible=true&outcome=success&step=checkout`
- Payment-method-first: `/?entry=pg&variant=c&user=first&eligible=true&outcome=success&step=checkout`
- Repeat quick-pay: `/?entry=pg&variant=d&user=repeat&eligible=true&outcome=success&step=pay4`
- Debit ineligible: `/?entry=pg&variant=b&user=first&eligible=false&card=debit&reason=debit&step=pay4`
- Unsupported card: `/?entry=pg&variant=b&user=first&eligible=false&card=unsupported&reason=bank&step=pay4`
- SBI coming soon: `/?entry=pg&variant=b&user=first&eligible=false&card=sbi&reason=bank&step=pay4`

## Variant Strategy

- Variant A: Minimal trusted checkout.
- Variant B: Offer-led Pay4-first checkout and recommended CEO first-time affordability demo.
- Variant C: Payment-method-first checkout.
- Variant D: Mobile-first repeat checkout and recommended saved-card demo.

## Known Rough Edges

- Issuer display uses compact text chips for demo reliability.
- Stanley Living merchant app screens are lightweight demo context.
- Eligibility, processing, success, failure, and debug controls are mocked.
- No real card, bank, PG, settlement, or support systems are connected.

## Connection to PRD/GTM

The prototype should help validate product/UX hypotheses before PRD requirements and GTM collateral are finalized. Prototype behavior is not automatically a production decision; durable decisions should be captured in `CONTEXT.md` and ADRs.

## Production Reminder

This prototype is not production implementation. It has no backend, no real APIs, no persistence, and no sensitive data handling.

