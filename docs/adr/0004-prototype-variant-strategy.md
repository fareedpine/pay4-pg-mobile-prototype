# ADR 0004: Prototype Variant Strategy

## Status

Accepted

## Context

The prototype must compare distinct Pay4 checkout hypotheses rather than present one static screen. Leadership review needs a strong primary path and a repeat-user path, while product/design still need alternatives for placement and emphasis.

## Decision

Variant B is main CEO affordability demo; Variant D is repeat saved-card demo; A/C are exploratory variants.

## Consequences

- Variant B should remain the strongest first-time Pay4 story.
- Variant D should remain optimized for saved-card quick pay.
- Variant A tests restrained standalone payment-mode treatment.
- Variant C tests Pay4 inside the normal payment-method hierarchy.
- Variant controls should remain available through demo controls/query params without distracting the default CEO path.

## Open Questions

- Which variant should inform the production default?
- Should variant behavior differ by merchant category, user eligibility, or repeat status?
- What metrics should determine winning placement/emphasis?

