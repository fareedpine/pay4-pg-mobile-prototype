# ADR 0003: Demo Amount and Fee Model

## Status

Accepted

## Context

The prototype needs a simple, credible amount model for CEO/stakeholder review. Earlier amounts were less clear for explaining Pay4. The chosen model should make the Pay in 4 proposition obvious and should expose the difference between first installment and Pay Today.

## Decision

Current prototype and demo use a ₹40,000 order framed as Pay ₹10,099 today, then 3 monthly payments of ₹10,000. Pay Today is ₹10,000 first payment + ₹99 bank processing fee.

## Consequences

- All prototype, brochure, and demo collateral should use ₹40,000 / Pay ₹10,099 today / then 3 monthly payments of ₹10,000 unless explicitly exploring another case.
- Pay Today copy must explain that ₹10,099 includes a ₹99 bank processing fee.
- Success copy must distinguish the first payment from the total paid today.
- Production PRD must still define whether the processing fee is fixed, issuer-specific, amount-based, merchant-specific, or program-specific.

## Open Questions

- Is ₹99 the MVP default, demo-only, or issuer-specific?
- Is the processing fee charged by issuer, merchant, Pine Labs, or another party?
- Are taxes included in the displayed fee?
