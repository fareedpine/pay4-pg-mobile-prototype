# ADR 0005: MVP Eligibility Boundary

## Status

Accepted

## Context

Pay4 eligibility could be modeled like EMI, where availability depends on customer/card-level eligibility before the user sees or selects the option. The MVP needs a narrower operating model that can launch with participating issuer credit cards and merchant-level enablement.

## Decision

MVP launch will support credit cards from the initial participating issuers: HDFC Bank, ICICI Bank, Axis Bank, and Kotak. Other cards are out of scope.

Issuer banks will share eligible BINs/categories with Pine Labs. Once Pay4 is enabled on a merchant, it is live for all users at that merchant. Pay4 will not use EMI-style user-level availability checks for MVP.

MVP launch is INR-only. Unsupported BINs and bank risk-blocked cases are blocked at the bank side and fail during transaction processing.

## Consequences

- Pay4 can be shown for enabled merchants without requiring user-level pre-eligibility like EMI.
- Card/BIN eligibility remains issuer-led and is enforced during transaction processing.
- Customer and merchant messaging must handle bank-side failures for unsupported BINs and risk blocks.
- Product, ops, and support need clear failure reason mapping where available from the bank.
- PRD must define how bank-provided BIN/category lists are configured, refreshed, audited, and reconciled against transaction failures.

## Open Questions

- What exact failure reason codes will issuers return for unsupported BINs and risk blocks?
- Should checkout pre-validate BINs where Pine Labs has the bank-provided BIN list, or rely entirely on bank-side failure?
- How often will issuer BIN/category files be refreshed?
- How should support teams explain bank-side blocks without exposing internal risk rules?

