# ADR 0008: Pay4 Ineligible Card Failure Message

## Status

Accepted

## Context

Pay4 can fail because a card BIN is unsupported, the issuer blocks the transaction through risk rules, or another bank/card decline occurs. Exposing risk-block language to customers would create confusion and may reveal internal risk behavior.

## Decision

For unsupported BIN, issuer risk block, and similar Pay4 card ineligibility, show this customer-facing message:

"This card is not eligible for Pay4. Please try another eligible credit card or choose another payment method."

Internally, preserve bank reason codes such as unsupported BIN, issuer risk block, or other bank decline. Do not expose risk-block language to the customer.

Risk-blocked and other generic card failure cases should follow the error and flow used in the regular Cards flow today.

## Consequences

- Customer UI remains simple and safe.
- Support and analytics can still distinguish unsupported BIN, risk block, and bank decline internally.
- Pay4 needs a mapping layer from bank/card reason codes to customer-safe messages.
- PRD should reference the existing Cards flow for generic failure behavior.

## Open Questions

- Which exact regular Cards flow errors and retry rules should Pay4 inherit?
- Which bank reason codes map to Pay4 ineligible-card copy versus generic Cards failure copy?
- What internal fields are required for support, analytics, reconciliation, and bank escalation?

