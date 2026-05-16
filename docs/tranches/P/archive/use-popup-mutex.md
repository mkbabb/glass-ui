# usePopupMutex archive — formal retire (consumer-private)

**Date**: 2026-05-16.
**Status**: ARCHIVED — formal classification.
**Source**: P11/e §6 (value.js consumer audit; single-consumer composable specific to color-picker dock).

## §1—Scope

`usePopupMutex` is a value.js-internal composable (1 consumer at `demo/@/components/custom/color-picker/`) coordinating multiple popup surfaces against a single-open-at-a-time invariant. The composable is consumer-private; it was never on the glass-ui public surface.

Per Pβ's overfitting-audit criterion + N invariant 8 (substrate-without-consumer-binary): single-consumer composables either WIRE-WITH-2ND-CONSUMER, RETIRE-AS-INLINE, or formally classify as consumer-private.

## §2—Disposition

Classification: **CONSUMER-PRIVATE** — the composable is correctly scoped to value.js. Glass-ui has no role in absorbing or re-shipping it. The pattern (mutual-exclusion popup state) is too domain-specific (color-picker dock surfaces) to canonicalize as glass-ui substrate.

The consumer's tranche (when value.js opens its next planning round) owns the decision to keep / inline / restructure usePopupMutex.

## §3—Glass-ui-side action

NONE. Glass-ui-side is READER-ONLY for this carry.

## §4—P-residual disposition

ARCHIVED-PERMANENT-CONSUMER-PRIVATE. The carry exits P-close per invariant 28 zero-deferral.

## §5—Cross-references

- `docs/tranches/P/waves/W5.md` Lane F.1.
- `docs/tranches/P/audit/P11-Lane-e-value-js.md` §6.

## §6—Status: ARCHIVED-PERMANENT-CONSUMER-PRIVATE.
