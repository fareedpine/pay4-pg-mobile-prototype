# ADR 0009: BIN Pre-Validation With Bank Finality

## Status

Accepted

## Context

Pay4 can reduce avoidable checkout failures if Pine Labs checks eligible BIN/category lists before sending a transaction to the issuer/bank. However, issuer banks own eligibility, risk, card product treatment, and final transaction decisioning.

## Decision

Pine Labs should pre-validate Pay4 BIN eligibility when issuer BIN/category lists are available, while treating the bank response as final.

Current assumption: all participating issuers will share eligible BINs. If this assumption changes, update `CONTEXT.md` and this ADR.

## Consequences

- Checkout can show unsupported-card messaging earlier when Pine Labs has matching BIN/category data.
- Bank-side response remains authoritative for issuer eligibility, risk block, and transaction outcome.
- Pine Labs needs operational ownership for BIN/category list ingestion, validation, refresh, versioning, and audit.
- Analytics should distinguish Pine Labs pre-validation failures from bank-side failures.
- Support should preserve both local pre-validation result and bank response where available.

## Open Questions

- How often will issuer BIN/category lists be refreshed?
- What format and delivery channel will issuers use for BIN/category files?
- Which team owns list configuration and production change control?
- Should fee/pricing configuration be versioned together with BIN eligibility configuration?

