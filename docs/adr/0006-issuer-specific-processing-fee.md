# ADR 0006: Issuer-Specific Bank Processing Fee

## Status

Accepted

## Context

The prototype uses ₹99 as the bank processing fee and shows Pay Today as ₹10,099 for a ₹40,000 order split into ₹10,000 × 4 payments. Production Pay4 may have different processing fees by issuer.

## Decision

Each issuer may have a different bank processing fee, such as ₹99, ₹199, or ₹299. The ₹99 value in the prototype is an example only.

Checkout must always display the exact bank processing fee before authentication. Pay Today must always be computed as first payment + bank processing fee.

## Consequences

- Pay Today cannot be hardcoded in production.
- Pay4 pricing must be issuer-aware before authentication.
- Fee disclosure is a required checkout UX and legal/compliance dependency.
- Analytics should capture first payment, processing fee, and Pay Today separately.
- Support and ops need visibility into the fee shown to the customer at transaction time.

## Open Questions

- Which system owns issuer-specific fee configuration?
- Are fees fixed by issuer, amount band, merchant, card product, or campaign?
- How are fee changes versioned and audited?
- Are taxes included in the displayed bank processing fee?
- What happens if the issuer fee changes between eligibility display and authentication?

