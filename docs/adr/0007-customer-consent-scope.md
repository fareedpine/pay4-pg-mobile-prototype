# ADR 0007: Customer Consent Scope

## Status

Accepted, provisional pending bank and internal risk guidance

## Context

Pay4 requires the customer to understand that Pay Today may differ from the first payment because of a bank processing fee, and that the remaining payments are collected by the issuer/bank after checkout. Consent must be captured before authentication, but final wording may depend on issuer, legal, compliance, and internal risk guidance.

## Decision

Before Pay4 authentication, the customer should consent to:

- The Pay4 payment schedule.
- Today's payable amount, including bank processing fee.
- Issuer-managed collection of the remaining 3 payments.
- Applicable issuer, Pine Labs, and merchant terms.

This decision defines the required consent scope. Final customer-facing wording remains subject to bank and internal risk guidance.

## Consequences

- Checkout must show the payment schedule and Pay Today before authentication.
- Checkout must clearly disclose the bank processing fee before authentication.
- Consent cannot be a generic payment checkbox only; it must map to Pay4-specific obligations.
- PRD and legal review must finalize exact wording and terms links.
- Support teams need access to what the customer consented to for a given transaction/version.

## Open Questions

- What exact approved consent copy should be used?
- Should consent wording vary by issuer?
- Which terms links are required: issuer, Pine Labs, merchant, or all three?
- How should consent versioning be stored and exposed for support/compliance?

