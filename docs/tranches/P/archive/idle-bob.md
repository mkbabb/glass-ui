# idle-bob archive—formal RETIRE-as-inline (consumer-private)

**Date**: 2026-05-16.
**Status**: ARCHIVED—formal RETIRE-as-inline classification.
**Source**: P11/d (keyframes.js consumer audit; 1 site at `CubeTarget.vue:139-146`).

## §1—Scope

`idle-bob` is a keyframes.js-internal animation utility (1 site at `CubeTarget.vue:139-146`; ~8 LOC) implementing an idle bobbing motion for the cube target visual.

Per Pβ's overfitting-audit criterion + N invariant 8: the utility is single-site and tiny; the abstraction overhead exceeds the inline cost.

## §2—Disposition

Classification: **RETIRE-AS-INLINE** at the consumer site. The 8-LOC idle-bob block belongs inline at `CubeTarget.vue:139-146`; no separate composable / utility / animation-keyframe definition needed.

## §3—Glass-ui-side action

NONE. Glass-ui-side is READER-ONLY for this carry. The keyframes.js tranche (when opened) executes the inline-and-delete.

## §4—P-residual disposition

ARCHIVED-PERMANENT-CONSUMER-PRIVATE. The carry exits P-close per invariant 28.

## §5—Cross-references

- `docs/tranches/P/waves/W5.md` Lane F.2.
- `docs/tranches/P/audit/P11-Lane-d-keyframes-js.md` §"idle-bob".

## §6—Status: ARCHIVED-PERMANENT-CONSUMER-PRIVATE.
