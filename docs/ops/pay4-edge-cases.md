# Pay4 Edge Cases

## Eligibility edge cases

- Merchant not enabled
- Order amount below or above eligible thresholds
- Unsupported category/MCC
- Risk block
- Currency/geography mismatch

## Card/BIN edge cases

- Debit card entered
- Unsupported issuer
- Unsupported BIN within supported issuer
- SBI Card coming soon
- Corporate, prepaid, international, add-on, or low-limit cards

## Auth failure

- OTP/3DS failure
- Customer abandons authentication
- Authentication timeout
- Retry succeeds
- Retry fails and customer selects fallback method

## Bank downtime

- Issuer eligibility service unavailable
- Bank authentication unavailable
- Bank booking unavailable after authentication

## Bank booking pending

- PG payment success but bank booking pending
- Bank booking success but merchant callback failure
- Customer-facing and merchant-facing status differ

## Refunds

- Full refund before settlement
- Full refund after settlement
- Issuer reversal timing
- Customer communication

## Partial refunds

- Partial refund before all future payments
- Partial refund after one or more future payments
- Recalculation or cancellation of remaining payments

## Cancellation

- Merchant cancellation before payment
- Merchant cancellation after payment success
- Cancellation after bank booking

## Settlement mismatch

- Acquirer settlement differs from merchant settlement promise
- Pay4 fee deduction mismatch
- Bank program fee receivable not collected

## Customer support cases

- Customer does not understand future collections
- Customer asks about card limit usage
- Customer asks about processing fee
- Customer used unsupported card
- Customer wants refund/cancellation status

## Merchant support cases

- Merchant asks why Pay4 did not appear
- Merchant disputes settlement
- Merchant asks about refund handling
- Merchant asks about reports and reconciliation

## Risk/compliance cases

- Misleading affordability copy
- Missing fee disclosure
- Missing consent
- Dispute about issuer terms

## Open questions

- Which team owns each support path?
- What SLAs apply for bank booking pending and refund pending?
- What data is visible to support agents without exposing sensitive card data?

