# ADR 0002: Pay4 Card-Led Flow

## Status

Accepted

## Context

Early Pay4 explorations included bank/issuer display. A selectable bank flow could imply that the customer chooses a bank first, which conflicts with the desired card-funded checkout pattern and creates unnecessary friction.

## Decision

Pay4 is card-led and BIN/issuer eligibility-led; the user does not select a bank.

## Consequences

- Supported issuers are informational only.
- Accepted issuers appear before card entry to set expectations.
- First-time users add an eligible credit card inside Pay4.
- Repeat users can use a saved eligible credit card or choose another card.
- Eligibility is determined from card/BIN rules in production, not from bank selection.

## Open Questions

- What BIN/card-product rules define eligibility per issuer?
- How early should production checkout check eligibility for saved cards?
- What is the exact copy for unsupported cards, debit cards, and coming-soon issuers?

