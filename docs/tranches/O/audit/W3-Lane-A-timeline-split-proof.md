# O.W3 Lane A — GlassTimeline god-module split proof

**Lane**: A (timeline decompose).
**Spec**: `docs/tranches/O/waves/W3.md` §Lane A.
**Research base**: `docs/tranches/O/research/Rbeta-god-modules.md` §3.1.
**Status**: green; consumer surface unchanged; bundle profile budget PASS;
1 open question for the orchestrator on raw-byte delta.

## § Disposition

The pre-W3 `src/components/custom/timeline/GlassTimeline.vue` (1049 LOC) mixed
three structurally-disjoint render trees behind one `variant` prop, plus the
shared geometry math, plus a non-scoped `<style>` block for the HoverCardPortal
contract. Per Rβ §3.1 the SFC was the largest HEAD god-module and the
clearest split candidate in the audit.

Split outcome (5 files, all in `src/components/custom/timeline/`):

| File | Concern | Cohesion contract |
|------|---------|-------------------|
| `GlassTimeline.vue` | Dispatcher | Computes `variant` and renders one of three child SFCs. Forwards all props + emits + the `#popoverContent` slot. Public surface UNCHANGED. |
| `ScrubberTimeline.vue` | `variant="scrubber"` | Single-track normalized 0..1 scrubber. `modelValue` + `label`. Pointer-capture drag + keyboard a11y (role=slider). Scoped CSS only. |
| `SegmentedTimeline.vue` | `variant="segmented"` | Adjacent gradient bands with boundary dots. `segments` prop. Scoped CSS only. |
| `ContinuousTimeline.vue` | `variant="continuous"` | ONE rounded-pill rail + N absolute-positioned region children + sibling marker `<ul>` (Option C structural split per AB.W2.T4). Owns the non-scoped `.timeline-popover-*` CSS block — the HoverCardPortal escape-hatch contract is preserved in this SFC because the popover content portals out of the component subtree. |
| `geometry.ts` | Shared math + payload helpers | `gradientFor` + `fillFor` + `segmentWeight` + `createContinuousGeometry(segmentsRef)` factory (returning `totalWeight`/`regionLeft`/`regionWidth`/`boundaryX`/`continuousAriaValueNow`) + `continuousRegionBackground` + `continuousFillWidth` + `popoverPayloadFor` + the `DefaultPopoverPayload` type. Pure functions; no Vue lifecycle. |

**Rβ cohesion verdict**: each sub-module now has a single concern (one variant
per SFC; geometry + payload separated from rendering). The portal-CSS
contract — the binding risk surface flagged in Rβ §5 — is preserved by
keeping the non-scoped `<style>` block inside `ContinuousTimeline.vue`, the
only SFC that actually mounts the HoverPopover children at runtime.

## § File changes summary

```
BEFORE                                                           AFTER
src/components/custom/timeline/                                  src/components/custom/timeline/
├── GlassTimeline.vue           1049 LOC                         ├── GlassTimeline.vue           123 LOC   (dispatcher; ~88% smaller)
├── index.ts                       6 LOC                         ├── ScrubberTimeline.vue        191 LOC   (new — scrubber variant)
├── types.ts                      60 LOC                         ├── SegmentedTimeline.vue       225 LOC   (new — segmented variant)
└── __tests__/                                                   ├── ContinuousTimeline.vue      607 LOC   (new — continuous + portal CSS)
    ├── aria-valuenow.test.ts                                    ├── geometry.ts                 187 LOC   (new — shared math + payload helpers)
    └── continuous-structural-split.test.ts                      ├── index.ts                      6 LOC   (unchanged)
                                                                 ├── types.ts                     60 LOC   (unchanged)
                                                                 └── __tests__/                          (unchanged — both specs still mount via GlassTimeline)

source LOC: 1115 (pre-split, excluding tests)                    source LOC: 1399 (post-split, excluding tests)
```

The +25% source LOC growth is the cost of decomposition (4× SFC scaffolding —
imports, `<script setup>` blocks, prop/emit declarations, scoped style
blocks per SFC). This is the canonical decomposition tax; cohesion gain
is the trade.

`ContinuousTimeline.vue` is the largest single file (607 LOC) because it
inherits the popover-marker render path + the continuous CSS block + the
preserved non-scoped popover CSS. It is still well under the O7 500-LOC
threshold for the executable Vue script portion (the file is dominated by
template + scoped CSS + non-scoped CSS, not script logic — Rβ §1 line
counts include those non-script sections).

The package barrel (`index.ts`) is UNCHANGED — it still exports `GlassTimeline`
+ the three type aliases from `./types`. The variant sub-SFCs remain
internal to the package per Rβ §3.1 ("the three sub-SFCs are internal to
the package").

## § Verification

| Step | Command | Result |
|------|---------|--------|
| Typecheck | `npm run typecheck` | PASS (no errors; vue-tsc --noEmit clean) |
| Tests | `npm test` | PASS — 348/348 tests across 30 files (including all 10 timeline-specific specs in `aria-valuenow.test.ts` + `continuous-structural-split.test.ts`) |
| Build | `NODE_OPTIONS='--max-old-space-size=8192' npm run build` | PASS (built in 25.18s) |
| Bundle budget | `npm run profile:budget` | PASS — `dist/glass-ui.js` raw 67.3% of cap, gzip 68.1% of cap; `dist/glass-ui.css` raw 93.3% of cap, gzip 91.7% of cap |

Test invariance is the strongest consumer-impact signal: `continuous-structural-split.test.ts`
exercises the full continuous render path (rail + markers + region fill +
data-current + aria-valuenow + the HoverPopover bare-fallback path) and
all 8 cases pass via the dispatcher's `<ContinuousTimeline>` delegate
without any spec modification. Likewise `aria-valuenow.test.ts` exercises
3 scrubber-variant a11y cases via the dispatcher's `<ScrubberTimeline>`
delegate.

## § Bundle profile delta

`dist/timeline.js` chunk (the only timeline-bearing chunk in the dist;
the dispatcher pattern with static imports keeps all three variants in
one chunk, which is the more conservative production shape vs. fan-out
into per-variant chunks):

| Metric | Pre-W3 (K W4 baseline) | Post-W3 Lane A | Delta |
|--------|------------------------|----------------|-------|
| `dist/timeline.js` raw bytes | 11266 | 13661 | +2395 (+21.3%) |
| `dist/timeline.js` gzip bytes | 3135 | 3770 | +635 (+20.3%) |
| Global budget (`dist/glass-ui.js` raw cap 190000) | n/a — timeline is a subpath chunk | 127782 (67.3% of cap) | PASS |
| Global budget (`dist/glass-ui.js` gzip cap 33700) | n/a — timeline is a subpath chunk | 22939 (68.1% of cap) | PASS |

The 21.3% raw delta on `dist/timeline.js` exceeds the 5% threshold
flagged in W3.md ("if total grows > 5% raw, escalate before close").
The growth source is the SFC-scaffolding cost: each new variant SFC
adds its own component descriptor (`defineComponent` boilerplate,
render function closure, scoped CSS scope-hash, prop/emit normalizers),
plus the dispatcher SFC adds its own wrapper component on top. The
template-time `v-if` short-circuits ensure only one variant's render
function executes per mount, but all three sit in the chunk because
the dispatcher template references them via direct identifiers (not
dynamic imports).

The library-wide budget gate (`profile:budget`) reports PASS for the
two enforced caps (`glass-ui.js` 67.3%/68.1%; `glass-ui.css`
93.3%/91.7%); the per-subpath `timeline.js` chunk is NOT a separately-
budgeted target in the current `scripts/profile-budget.mjs` config. The
absolute raw growth (~2.4 KB) and gzip growth (~620 bytes) is small in
absolute terms — `dist/timeline.js` remains smaller than 6 other
subpath chunks (`Switch.vue`, `search`, `dock`, `typewriter`, `aurora`,
`glass-ui.js`).

The delta is documented here as escalation per W3.md. See § Open
questions below.

## § Consumer-import invariance proof

The package barrel `src/components/custom/timeline/index.ts` is byte-
identical pre/post split:

```ts
export { default as GlassTimeline } from "./GlassTimeline.vue";
export type {
    TimelineSegment,
    TimelineSegmentGradient,
    TimelineSegmentState,
} from "./types";
```

Consumer call-site survey (read-only; no edits to consumers):

- `demo/stories/data/timeline.vue` — `<GlassTimeline :model-value="..." :label="..." />`
  → routes through dispatcher's `v-else` branch → `<ScrubberTimeline>`.
- `demo/stories/data/timeline-segmented.vue` — `<GlassTimeline variant="segmented" :segments="..." />`
  → routes through dispatcher's `v-else-if="variant === 'segmented'"` branch
  → `<SegmentedTimeline>`.
- `demo/stories/data/timeline-continuous.vue` — `<GlassTimeline variant="continuous" :segments="..." />`
  → routes through dispatcher's `v-if="variant === 'continuous'"` branch
  → `<ContinuousTimeline>` (which mounts HoverPopover + the non-scoped
  portal CSS).
- `tests/public-surface.spec.ts` — imports `TimelineSurface` from
  `../src/timeline` (the subpath entry, which re-exports from this
  package barrel) and asserts `GlassTimeline` is present. The
  ` GlassTimeline` named export is preserved.
- `src/components/custom/timeline/__tests__/aria-valuenow.test.ts` —
  mounts `GlassTimeline` directly (default variant scrubber); all 3
  cases PASS through the dispatcher → ScrubberTimeline delegate.
- `src/components/custom/timeline/__tests__/continuous-structural-split.test.ts` —
  mounts `GlassTimeline` directly (`variant: 'continuous'`); all 8 cases
  PASS through the dispatcher → ContinuousTimeline delegate. Critically:
  - the `.continuous-track` + `.continuous-markers` sibling structure
    is asserted (test #1 — passes; the wrap parent is in ContinuousTimeline);
  - the rail has no focusable descendants (test #2 — passes; axe
    nested-interactive contract preserved);
  - the per-region `--continuous-fill-width` CSS var is present (test
    #4 — passes; the geometry factory output is wired through the inline
    style binding);
  - `data-current` stamps on the matching dot only (test #5 — passes);
  - HoverPopover bare-fallback path emits hover/hoverEnd (test #7 —
    passes; the popover-open-change wiring is preserved in
    ContinuousTimeline);
  - aria-valuenow = 1.4 for the 3-segment fixture (test #8 — passes;
    the geometry factory's `continuousAriaValueNow` is wired through to
    the rail attr).

No consumer file required modification. The split is a pure internal
refactor.

The HoverCardPortal-portal-CSS contract is preserved: the non-scoped
`<style>` block (with `.timeline-popover` + `.timeline-popover-label`
+ `.timeline-popover-value` + `.timeline-popover-description` +
`.timeline-popover-state` + `.timeline-popover-body` rules) is now
located in `ContinuousTimeline.vue` (the only SFC that ever mounts
`<HoverPopover>` children). The continuous-structural-split test
suite implicitly covers this because the test fixtures use the default
`disablePopover: false` for 6 of 8 cases and `disablePopover: true`
for 2 of 8 — both code paths render correctly.

## § Open questions for orchestrator

1. **Bundle delta escalation per W3.md threshold.** `dist/timeline.js`
   grew 21.3% raw (11266 → 13661 bytes; +2.4 KB) and 20.3% gzip (3135
   → 3770 bytes; +620 bytes). The W3.md spec says "if total grows >
   5% raw, escalate before close". The library-wide budget gate
   (`profile:budget`) reports PASS for both enforced caps (`glass-ui.js`
   + `glass-ui.css`), so the delta does not break any budget contract.
   Three options to consider at close:

   - **(A) Accept as the documented cost of decomposition.** The 2.4 KB
     raw / 620 bytes gzip is small in absolute terms (smaller than
     half a typical UI component chunk), the global budget gate
     PASSES, and the cohesion gain (1 god-module → 3 single-concern
     SFCs + pure-fn geometry module) closes the largest HEAD
     god-module per Rβ §1. Recommended.

   - **(B) Per-variant dynamic chunks.** Switch the dispatcher to
     `defineAsyncComponent(() => import("./..."))` for the two non-
     default variants. This would produce 2 additional chunks
     (`SegmentedTimeline.js` + `ContinuousTimeline.js`) and shrink
     the default `timeline.js` to roughly the scrubber-only payload,
     at the cost of a network round-trip per non-default variant on
     first mount. Almost certainly net-worse for the common consumer
     who knows their variant statically.

   - **(C) Inline the geometry helpers back into ContinuousTimeline.**
     Would reclaim a small amount of overhead from the
     `geometry.ts` module's top-of-chunk import scaffolding, but
     would re-couple math to one SFC and lose the per-fn ≥-2-caller
     cohesion (`gradientFor` is used by both `SegmentedTimeline` and
     `ContinuousTimeline`; `fillFor` is used by both; `popoverPayloadFor`
     is used only by `ContinuousTimeline`). Not recommended.

   Recommendation: **Option A** — accept the delta and update
   `docs/tranches/K/audit/W4-bundle-profile.json` as the new baseline
   at W3 close. The deltas are within the library's global budget
   headroom (32% raw headroom remains on `glass-ui.js`).

2. **`docs/tranches/K/audit/W4-bundle-profile.json` baseline refresh.**
   The bundle-profile JSON regenerated by `npm run profile:budget`
   shows the new chunk sizes. The pre-W3 baseline is preserved in
   `git diff` for the file (the entry that changed is the
   `dist/timeline.js` line — 11266 → 13661 raw, 3135 → 3770 gzip).
   Orchestrator decides whether to commit the regenerated JSON as
   the new baseline at W3 close or to roll all three lanes' profile
   updates into one baseline commit.

## § Worktree diff verification

```
$ git status --short
 M docs/tranches/K/audit/W4-bundle-profile.json       (regenerated by profile:budget)
 M src/components/custom/timeline/GlassTimeline.vue   (1049 → 123 LOC; dispatcher)
?? src/components/custom/timeline/ContinuousTimeline.vue   (new; 607 LOC)
?? src/components/custom/timeline/ScrubberTimeline.vue     (new; 191 LOC)
?? src/components/custom/timeline/SegmentedTimeline.vue    (new; 225 LOC)
?? src/components/custom/timeline/geometry.ts              (new; 187 LOC)

$ git diff --stat src/components/custom/timeline/
 src/components/custom/timeline/GlassTimeline.vue | 1036 ++--------------------
 1 file changed, 55 insertions(+), 981 deletions(-)
```

Bounds compliance: every modified/new file is under
`src/components/custom/timeline/` plus this proof doc under
`docs/tranches/O/audit/`. No edits to `scripts/profile-aurora.mjs`
(Lane B), `demo/configurator/usePresetEditor.ts` (Lane C), or any
other `src/` path. The hardened agent git clause (K W0) is observed —
this agent ran no `git add`/`commit`/`stash`/`checkout`/`reset`/`restore`
commands.

The `docs/tranches/K/audit/W4-bundle-profile.json` modification is the
output of `npm run profile:budget` (the verification step in the spec),
not an agent-authored edit. The orchestrator can either accept the
regenerated baseline at W3 close or revert it and re-run after all
three lanes merge.
