# ADR 0001: Pay4 Standalone Payment Mode

## Status

Accepted

## Context

Pay4 could be presented as a sub-option inside Cards or EMI because it is funded by a credit card and resembles installment affordability. That would reduce visibility and make the product harder to distinguish from existing card/EMI behavior.

## Decision

Pay4 is a standalone payment mode, not nested inside Cards or EMI.

## Consequences

- Pay4 has its own checkout row/module.
- Pay4 can be highlighted, recommended, or preselected independently of Cards and EMI.
- Customer education can focus on Pay in 4 rather than card EMI discovery.
- Payment-method ordering and fallback behavior must treat Pay4 as a peer to UPI, Cards, EMI, Net Banking, and Wallets.

## Open Questions

- Where should Pay4 sit in production payment method ordering by merchant/category/user?
- Can Pay4 be preselected for eligible repeat users?
- What regulatory or scheme language is required when Pay4 appears as a standalone payment mode?

