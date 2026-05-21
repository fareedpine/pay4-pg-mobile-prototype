# Pine Labs PG Mobile Pay4 Prototype

Standalone CEO-demo-ready frontend prototype for Pay4 as a standalone payment mode inside Pine Labs / Plural PG mobile checkout, with a lightweight Stanley Living merchant app entry flow.

This is a static vanilla HTML/CSS/JS prototype with Vite only for local dev and static builds. It has no backend, no real payment APIs, no persistence, and no Pine Labs internal setup requirement.

## Quick Start

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually:

```text
http://localhost:5173/
```

## Build

```bash
npm run build
npm run preview
```

The static build is generated in `dist/`.

## Recommended Demo Flow

Variant B is the recommended CEO first-time affordability demo. Variant D is the recommended repeat saved-card demo. Variants A and C are exploratory alternatives.

1. Start on the Stanley Living product page.
2. Show the Handwoven Wool Carpet at ₹40,000.
3. Add to cart and proceed to pay.
4. Show the transition into Pine Labs / Plural PG mobile checkout.
5. In Variant B, point out Pay4 as a standalone highlighted payment mode.
6. Open Pay4 and show Pay ₹10,099 Today, then 3 monthly payments of ₹10,000.
7. Complete first-time card entry, optional save-card consent, required Pay4 terms consent, simulated authentication, and success.
8. Switch to Variant D to show saved HDFC Bank Credit Card ending 1234 and quick-pay behavior.
9. Show failure/retry and ineligible card states only if needed.

## Query Params

```text
entry=merchant|pg
step=product|cart|checkout|pay4|processing|success|failed
variant=a|b|c|d
user=first|repeat
eligible=true|false
outcome=success|failure
card=hdfc|icici|axis|kotak|sbi|debit|unsupported
reason=amount|bank|merchant|debit|auth
```

`issuer=` is still accepted for older links and is treated as the detected card issuer.

## Demo Links

Main offer-led CEO demo:

```text
/?entry=merchant&variant=b&user=first&eligible=true&outcome=success&step=product
```

Checkout-only offer-led:

```text
/?entry=pg&variant=b&user=first&eligible=true&outcome=success&step=checkout
```

Minimal trusted:

```text
/?entry=pg&variant=a&user=first&eligible=true&outcome=success&step=checkout
```

Payment-method-first:

```text
/?entry=pg&variant=c&user=first&eligible=true&outcome=success&step=checkout
```

Repeat quick-pay:

```text
/?entry=pg&variant=d&user=repeat&eligible=true&outcome=success&step=pay4
```

Debit ineligible:

```text
/?entry=pg&variant=b&user=first&eligible=false&card=debit&reason=debit&step=pay4
```

Unsupported card:

```text
/?entry=pg&variant=b&user=first&eligible=false&card=unsupported&reason=bank&step=pay4
```

SBI coming soon:

```text
/?entry=pg&variant=b&user=first&eligible=false&card=sbi&reason=bank&step=pay4
```

Failure/retry:

```text
/?entry=pg&variant=b&user=first&eligible=true&outcome=failure&card=hdfc&step=pay4
```

Success:

```text
/?entry=pg&variant=b&user=first&eligible=true&outcome=success&card=hdfc&step=success
```

## Variant Guide

Variant A, Minimal Trusted Checkout: Pay4 appears as a restrained standalone payment mode near the top. It tests whether Pay4 can work without heavy promotion.

Variant B, Offer-led Pay4-first Checkout: Pay4 is first, highlighted, and expanded by default with Pay ₹10,099 Today, then 3 monthly payments of ₹10,000, and Continue with Pay4 on the checkout landing. This is the main CEO demo for first-time users.

Variant C, Payment-method-first Checkout: Pay4 sits inside the normal hierarchy after UPI, Cards, and EMI. It tests whether Pay4 competes fairly as one payment mode among others.

Variant D, Mobile-first Repeat Checkout: Pay4 is optimized around saved HDFC Bank Credit Card ending 1234 and quick payment. This is the repeat-user CEO demo path.

## QA/Test Matrix Summary

Before demo, verify:

- Variant controls update UI and `variant=a|b|c|d` in the URL.
- Demo Controls are hidden by default; Debug State is collapsed.
- Eligible demos never show ineligible card errors.
- Ineligible demos show debit, unsupported card, SBI coming soon, or amount messages correctly.
- Card number, MM/YY expiry, CVV, name, optional save-card consent, required Pay4 terms consent, and CTA enablement work without input reset.
- Repeat Pay4 shows saved HDFC card, Use Another Card, and Use Saved Card.
- Product → Cart → PG checkout → Pay4 → Processing → Success works.
- Failure → Retry and Change Payment Method work.
- Static build passes.

## QA Screenshots

QA screenshots can be generated during local review and placed under `dist/qa-screenshots/` after build/QA. This folder is local demo evidence and is not required for static deployment.

## Assets Note

Uploaded/local logos are saved as prototype assets. Pay4 branding is loaded from `public/assets/pay4-logo-by-pinelabs.png`; merchant and bank source assets live under `src/pay4-prototype/assets/`. The current issuer display uses compact text chips for demo reliability. Replace or validate all merchant/bank assets with approved production assets before any external/public use.

## Static Deployment

Run:

```bash
npm run build
```

Deploy the `dist/` folder to any static host:

- Netlify
- Vercel
- GitHub Pages
- S3/CloudFront
- Any static web server

No environment variables or internal services are required.
