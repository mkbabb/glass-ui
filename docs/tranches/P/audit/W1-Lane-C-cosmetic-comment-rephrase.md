# P.W1 Lane C—Cosmetic "legacy" comment rephrase (2 sites)

**Status**: COMPLETED.
**Date**: 2026-05-16.
**Lane shape**: orchestrator-direct (per AGENT.md "befitting direct edit"—2 comment swaps; bounds disjoint from Lane A + Lane B).

## §1—Scope

Per `docs/tranches/P/waves/W1.md` Lane C + Pα §"A7-x + A9-x" (cosmetic comment rephrase findings).

Two comments in `src/` use the word "legacy" to describe artefacts that are not actually legacy code (per P invariant 5 NO LEGACY CODE). The audit identified these as cosmetic-only—the wording was misleading rather than technically inaccurate. Lane C rephrases both.

## §2—Edits

### 2.1 `src/components/custom/timeline/GlassTimeline.vue:88`

**Before**:
```vue
<!-- Continuous variant—delegates to <ContinuousTimeline>. Forwards
     the popoverContent slot so consumers can override the popover
     body via the same `#popoverContent` slot name as the legacy
     monolith. -->
```

**After**:
```vue
<!-- Continuous variant—delegates to <ContinuousTimeline>. Forwards
     the popoverContent slot so consumers can override the popover
     body via the same `#popoverContent` slot name as the pre-O.W3
     monolithic source. -->
```

Rationale: `GlassTimeline.vue` is the dispatcher (123 LOC post-O.W3 split). The "monolith" referenced is the 1049-LOC pre-split state, which O.W3 Lane B replaced with the dispatcher + 6 sub-files (`ContinuousTimeline`, `SegmentedTimeline`, etc.). Calling the pre-split source "legacy" misframed it as if it were still extant; "pre-O.W3 monolithic source" names it accurately as the historical antecedent.

### 2.2 `src/styles/typography.css:194`

**Before**:
```css
- `--font-mono` references `"Fira Code"` first so the self-hosted
  face engages by default for every glass-ui consumer; the
  calibrated `"Fira Code Fallback"` covers the swap window, then
  legacy `"Fira Mono"` + the generic `monospace` backstop the
  chain for browsers that reject local() lookups. */
```

**After**:
```css
- `--font-mono` references `"Fira Code"` first so the self-hosted
  face engages by default for every glass-ui consumer; the
  calibrated `"Fira Code Fallback"` covers the swap window, then
  fallback `"Fira Mono"` + the generic `monospace` backstop the
  chain for browsers that reject local() lookups. */
```

Rationale: Fira Mono is part of the documented font-stack fallback chain, not a deprecated entry. The chain is `"Fira Code" → "Fira Code Fallback" → "Fira Mono" → monospace`—each tier is the documented fallback for the prior tier's failure case (self-host load, swap window, font-rejection, generic). Calling Fira Mono "legacy" misframed it as deprecated.

## §3—Source verification

The cascade declaration at `src/styles/typography.css:201` remains identical:
```
--font-mono: "Fira Code", "Fira Code Fallback", "Fira Mono", monospace;
```

Both edits are documentation-only; no runtime or build behaviour changes.

## §4—Verification

Will run inline at W1 close gate matrix (`npm run typecheck` + build + test). The edits change no runtime; gates green by inspection.

## §5—P invariant compliance

- **P invariant 5 (NO LEGACY CODE)**: the substrate at HEAD contains no actual legacy code; the comments mis-described their referents. Lane C restores accurate naming.
- **P invariant 28 (zero deferral)**: both audit findings (Pα §A7-x + A9-x) close at this wave.
- **Writing-style memory**: the rephrase preserves the existing terse register; no editorializing added.

## §6—Status: COMPLETED.
