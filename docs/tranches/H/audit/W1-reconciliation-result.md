# H.W1 — Reconciliation Result

**Date**: 2026-05-05.
**Owner**: orchestrator (merge of 5 lane proofs + scope-reveal absorption).
**Inputs**: `W0-reconciliation.md` (164 rows / 90 WIRE / 73 RETIRE / 1 conditional) + `W1-{A..E}-proof.md`.

## Per-lane outcomes

### Lane A — Custom components

- **3 packages retired cleanly**: `<KeyboardShortcutsModal>`, `<TierBadge>`, `<LikeButton>`. Directories deleted; `src/index.ts` exports removed; no manifest entries to remove (none existed). `rg` confirms zero remaining references.
- **1 package halt-and-reported**: `<SvgFilters>` + `<RainbowGradientDef>` had 1 demo consumer (`demo/stories/primitives/blob.vue` mounts both at lines 147–148). Lane A halted per dispatch protocol.
- **Orchestrator absorb**: per H invariant 5 (idiomatic gestalt > artefact preservation) + the overfitting-audit precedence (single-site = `inline-and-remove`), the orchestrator inlined the `<svg><defs>...</defs></svg>` blocks from `SvgFilters.vue` + `RainbowGradientDef.vue` directly into `demo/stories/primitives/blob.vue`'s template. Imports + prose references updated. Package directory deleted. `src/index.ts` export removed.
- **Final**: 4 of 4 G-shipped library-orphan packages retired.

### Lane B — Composables

- **3 flat retires**: `useCollapse`, `useContrastSafeAccent`, `useMonacoTheme`. Files + barrel `index.ts` files + (where empty) package directories deleted. `src/index.ts` re-exports for `composables/color` and `composables/monaco` removed. `composables/motion/index.ts` updated to drop `useCollapse` (other motion exports retained).
- **4 demoted** to `src/composables/blob/_internal/`: `useMetaballRenderer`, `useBlobMood`, `useBlobPointer`, `useBlobSatellites`. Sibling-import paths updated in `useBlob.ts` + the moved files' own relative imports. `src/composables/blob/index.ts` rewritten to drop public exports of the 4 sub-composables + their related types (`BLOB_MOOD_PARAMS`, `MoodParams`, `PointerState`).
- **`mulberry32` kept** at `src/composables/utils/mulberry32.ts` (canonical public utility; consumed by `useWatercolorBlob` + the now-private `_internal/useBlobSatellites`).
- **Direct mechanical absorb**: `src/components/custom/blob/index.ts` had been re-exporting `BLOB_MOOD_PARAMS` + `MoodParams` from the demoted composable; Lane B dropped those re-exports as a direct demote consequence.
- **Final**: 3 retires + 4 demotes; public composable surface narrowed from 9 to 5 (facades + types only).

### Lane C — CVA branches

- **5 retires**: `<Tabs variant="underline">`, `<MetricBadge size="xl">`, `<StatusDot variant="progress">`, `<Button variant="transport">` (+ 1-site refactor at `demo/stories/motion/timeline.vue:117` from `transport` → `glass`), `<GlassDock position="fixed">`. CVA blocks edited in each component's `index.ts` or `.vue` file.
- **1 halt-and-reported**: `<Badge variant="color">` had 5 CVA-direct call sites in `demo/stories/primitives/color-pill.vue` (`badgeVariants({ variant: 'color' })` invocation pattern). The W0 grep methodology (which counts only `<Badge variant="color">` template-attribute usage) missed this CVA-direct pattern.
- **Orchestrator absorb**: KEEP `<Badge variant="color">` (5 in-repo sites clears the ≥2 bar; W0 §5 reconciliation methodology footnote updated below).
- **Final**: 5 of 6 retired; 1 kept after methodology refinement.

### Lane D — Slot-class + factory

- **3 retires**: `DialogContent.closeIconClass` prop + destructure + template binding; `defineDockActionBar()` factory + its option/action interfaces + the surrounding `defineComponent`/`h`/`VNode` imports; `DockLayerGroup.keepOpenWhile` prop + watcher block + `dockKeepOpen`/`dockRelease` injects.
- **Dock function preserved**: `dockKeepOpen`/`dockRelease` provide keys remain in `composables/useDockState.ts` and consumed by `DockPopover.vue`; only the `keepOpenWhile`-tied watcher was removed.
- **Scope-reveal handover**: Lane D flagged that `W3.md` Lane I previously claimed "the existing `keepOpenWhile` Ref-based prop on `<DockLayerGroup>` continues to work; the new sink is the leaf-side complement." Lane D retired the prop per H invariant 2; W3 ships the leaf-side `dockKeepOpenSink` as the canonical and sole primitive.
- **Orchestrator absorb**: `W3.md` Lane I amended at W1 close to drop the keepOpenWhile reference and frame the sink as the single primitive.
- **Final**: 3 of 3 retired; W3 spec aligned.

### Lane E — Utilities + tokens + runtime helpers

- **31 utility classes retired** across utilities.css / math.css / paper.css / cards.css. Pure delete-unused (10), library-orphan single-demo (8), inline-and-remove (5), dead `divider-flourish-section-{1,4,7,8,10,11,12}` (7) + 1 implicit shimmer-blue cleanup via theme.css alias.
- **23 tokens retired**: 12 paper-tier tokens (`--paper-bg/-shadow/-border-{1..4}`) inlined into `.paper-N` rules with light + dark literals; 3 blob orphans deleted; `--cartoon-accent-mix` deleted with literal value inlined into `--shadow-cartoon-accent`; `--type-formula` deleted; 3 `--shimmer-blue-*` deleted; 5 per-rung Fraunces axes (display-3..ultra) deleted with literal values inlined into each `@utility text-display-N`.
- **4 runtime helpers retired** in `src/tokens.ts`: `chartNeutrals`, `vizColorsHex`, `spectrumColor`, `goldenShimmer`. `NAMED_EASING_BEZIER` kept (≥2 sites verified).
- **Lane E scope reveals (orchestrator absorbed)**:
  - `@keyframes confetti-fall` in `animations.css` became orphan after `.confetti-piece` inlined into `confetti.vue` with a renamed local keyframe (`story-confetti-burst`). Orchestrator deleted the orphan keyframe + its PRM media-query mirror.
  - `demo/stories/foundations/flourishes.vue` had 8 dangling utility-class refs after Lane E retired their global definitions (the inline-and-remove pattern requires the CSS to live in scoped style at the consumer; Lane E retired without performing the inline). Orchestrator added a `<style scoped>` block to `flourishes.vue` with the 8 utility rules using surviving tokens (rainbow + gold) + literal HSLs for the retired `--shimmer-blue-*` family.
  - `demo/stories/manifest.ts` had two prose mentions of retired class names (`.paper-rule`, `.confetti-piece`) in story-description strings; orchestrator updated descriptions to drop the stale class names.

## Final orchestrator amendments

1. `<Badge variant="color">` — KEPT. W0 reconciliation §5 methodology footnote: CVA branches consumed via `xxxVariants({ variant: 'X' })` direct invocation count as in-repo sites (5 sites in `color-pill.vue` clears the ≥2 bar).
2. `<SvgFilters>` + `<RainbowGradientDef>` — RETIRED via inline-and-remove into `blob.vue`.
3. `keepOpenWhile` — RETIRED; W3 ships `dockKeepOpenSink` as the single dock-keep-open primitive.
4. `flourishes.vue` 8 dangling utilities — restored as story-scoped CSS rules.
5. `confetti-fall` keyframe — deleted from `animations.css` (orphan after consumer inlining).
6. Manifest prose refs to retired classes — updated.

## Verdict reconciliation (post-W1 vs W0)

| Family | W0 RETIRE count | W1 actually retired | Adjustment |
|---|---:|---:|---|
| Tokens (§1) | 18 | 23 | +5 (per-rung Fraunces axes + cartoon-accent-mix overlap with paper inlining) |
| Utilities (§2) | 31 | 31 | matched |
| Components (§3) | 4 | 4 | matched (SvgFilters absorbed via inline-and-remove) |
| Composables (§4) | 7 | 7 (3 retired + 4 demoted) | matched |
| CVA branches (§5) | 6 | 5 | -1 (Badge color kept after methodology fix) |
| Slot-class + factory (§6) | 3 | 3 | matched |
| Runtime helpers (§7) | 4 | 4 | matched |
| **Total** | **73** | **77** | net +4 (paper-token inline cascade + Badge correction) |

Public surface impact (`src/index.ts`):
- 4 custom-package re-exports removed (3 retires + svg-filters absorb)
- 2 composable-package re-exports removed (color, monaco)
- 4 runtime-helper exports removed (via tokens.ts deletes)

## Hard gate verification

(a) `npm run typecheck` — green at W1 close.
(b) `npm run build` — green at W1 close (`✓ built in <runtime>`).
(c) Re-run β-style overfitting audit at HEAD: every retired artefact's `rg` invocation now returns zero hits. Verified by per-lane proofs + post-absorb fresh greps.
(d) Every retire is a clean break: no commented-out code, no `_v2` parallel paths, no shim re-exports. Verified file-by-file.
(e) Zero new EVIDENCE-DOC files created (W0 anticipated 1 conditional for `keepOpenWhile`; that was retired instead).
(f) Orchestrator commits W1 close: `feat(tranche-h/w1): wire-or-retire surface trim`.

## Authority

Per H invariant 2: every G-shipped artefact wires (≥2 in-repo sites) or retires (clean break) by W1 close. Verified.
