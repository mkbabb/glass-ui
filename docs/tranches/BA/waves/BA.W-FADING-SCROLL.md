# BA.W-FADING-SCROLL — the library `<FadingScroll>` primitive, scroll-state-driven edge fades, the static utilities retired

**Name**: W-FADING-SCROLL - the scroll-state-aware fading-scroll primitive
**Opens after**: BA Batch 1 (W-DARK-MATERIAL holds its H1 verdict); runs ‖ W-CONFIG-CHASSIS ‖ W-GOO-REDRESS ‖ W-DOCK-GEOMETRY (Batch 2 — disjoint file bounds)
**Agents**: 2 serial (the primitive+CSS unit, then the consumer-migration unit on the landed primitive)
**Hard gate**: `proof:fading-scroll` (born-RED) — the start edge does NOT feather at `scroll = 0`, the end edge does NOT feather with no trailing overflow, on both axes; the `.scroll-fade-*` static utilities are retired (no in-tree non-coordination consumer survives); + the π readback at `:5199` proving the at-rest no-overflow-edge is sharp on a real strip in BOTH modes + the `proof:ba-gestalt` verdict.
**Status**: SPEC

## §0 — RE-GROUND (mandatory step-0; re-grep every cite at HEAD before any edit)

This wave starts from the fading-scroll fleet lane's root-cause anchors, not a blind
re-diagnose (BA invariant 3 — re-opened ≠ rebuilt-blind). Before touching a byte, the impl
agent re-greps each anchor below at HEAD, confirms the static-utility scroll-blindness still
holds, and re-confirms the live census count; if any cite has drifted, the agent records the
drift in PROGRESS and re-locates the mechanism — it does NOT re-invent the diagnosis.

Grounding findings (`audit/fleet/fading-scroll.md` + `audit/fleet/deferred-census.md`):
**FS-1** (the at-rest two-sided feather — the static utility is scroll-state-blind),
**FS-2** (the bespoke `PresetPickerRow` JS is the ONLY scroll-aware path, trapped in one demo
file), **FS-3** (the dual-path native-`scroll(self)` + JS-fallback design), **DC-REC-7** (the
embla-on-overflow rail-chip promotion — explicitly DEFERRED out of this wave to
W-DOCK-SECTIONS, see §Do-NOT-touch), **R8-8** (the user's "a fading scroll list… compatible
with vertical scrolling too" coinage).
Captures: `ground/R8-08-fading-scroll-list.png` (the mood row with "Shy" feathered at rest).

The defect mechanism (confirmed at HEAD this authoring):

1. **The static mask is scroll-state-blind and two-sided.** `.scroll-fade-mask`
   (`utilities/base.css:271-273`) paints `mask-image: linear-gradient(to right, transparent,
   black var(--mask-fade-width), black calc(100% - var(--mask-fade-width)), transparent)` — it
   feathers BOTH edges unconditionally, with zero knowledge of `scrollLeft`/overflow. At
   `scrollLeft = 0` the LEFT edge is masked though there is nothing to scroll back to (the R8-08
   "Shy" capture: the first card loses its left chrome); the RIGHT edge masks even when the row
   fits with no trailing overflow. The `.scroll-fade-y` / `.scroll-fade-top` /
   `.scroll-fade-bottom` siblings (`base.css:275-285`) carry the identical scroll-blindness on
   the vertical axis (the Configurator controls column feathers its TOP edge at `scrollTop = 0`).
2. **The only scroll-aware path is bespoke + binary, trapped in one demo file.**
   `PresetPickerRow.vue:25-48` hand-rolls a `measure()` (reads `scrollLeft`/`scrollWidth`/
   `clientWidth`, a 12px snap tolerance), a `ResizeObserver` (`:37-43`), an `@scroll` listener
   (`:85`), and `fadeLeft`/`fadeRight` refs that toggle `--mask-l`/`--mask-r` between
   `var(--mask-fade-width)` and `0px` driving the `--edge-mask` gradient (`:78-84`). It is BINARY
   (present/absent, not a progressive feather) and lives in exactly ONE demo file — every other
   strip reaches for the broken static utility. This is the exact logic to promote.
3. **Six real surfaces want the pattern; the ≥2-consumer bar passes decisively.** Binary library
   consumers alone clear it: the Configurator default-preset row + controls column (C2/C3 — W-CONFIG-CHASSIS's
   bound, NOT this wave's) + SegmentedTabs `overflow="scroll"` (C5 — this wave). Demo consumers
   C1 (blob mood row) + C4 (aurora controls column) + C6 (PresetPickerRow) migrate onto it.

RE-GROUND command set (run all; confirm each mechanism):

```
sed -n '271,286p' src/styles/utilities/base.css                  # the four scroll-blind static utilities
sed -n '16,86p'  demo/stories/aurora/PresetPickerRow.vue         # the bespoke scroll-aware JS to promote
grep -rn 'scroll-fade-mask\|scroll-fade-y\|scroll-fade-top\|scroll-fade-bottom' src demo  # the full live consumer census
sed -n '337,348p' src/components/custom/tabs/SegmentedTabs.vue    # the C5 underline overflow strip
sed -n '258,272p' src/styles/segmented-tabs.css                  # the .segmented-tabs--scroll local --mask-fade-width 0.5rem
grep -n 'mask-fade-width' src/styles/tokens/offsets-sizing.css   # the --mask-fade-width: 1rem token (line 15)
sed -n '1,48p'  src/styles/scroll-driven.css                     # the dual-path single-writer model this wave mirrors
```

## Defect table (file:line — RE-GREP at HEAD)

| # | finding | file:line | the mechanism |
|---|---|---|---|
| 1 | FS-1 static two-sided feather (H) | `src/styles/utilities/base.css:271-273` (`.scroll-fade-mask`) | unconditional both-edge `to right` gradient; no scroll-state knowledge → left edge fades at `scrollLeft 0` |
| 2 | FS-1 static two-sided feather (V) | `src/styles/utilities/base.css:275-285` (`.scroll-fade-y`/`-top`/`-bottom`) | identical scroll-blindness on the block axis; top edge fades at `scrollTop 0` |
| 3 | FS-2 bespoke prototype trapped | `demo/stories/aurora/PresetPickerRow.vue:25-48` (measure+RO), `:78-85` (`--mask-l`/`--mask-r`/`--edge-mask`/`@scroll`) | the ONLY scroll-aware path; binary; one demo file — the promotion source |
| 4 | C5 SegmentedTabs overflow strip | `src/components/custom/tabs/SegmentedTabs.vue:344` (`isScroll && '… scroll-fade-mask scrollbar-hidden'`); `src/styles/segmented-tabs.css:267-271` (`.segmented-tabs--scroll` local `--mask-fade-width: 0.5rem`) | the curve-gallery 12-family underline picker mask is the static utility — migrates this wave |
| 5 | C1 blob mood-preset row | `demo/stories/substrates/blob.vue:404` (`overflow-x-auto scroll-fade-mask scrollbar-hidden`) | the R8-08 capture surface; demo consumer migrates |
| 6 | C4 aurora controls column | `demo/stories/aurora/AuroraConfigDock.vue:229` (`.scroll-fade-y`) | vertical demo consumer migrates |
| 7 | token source | `src/styles/tokens/offsets-sizing.css:15` (`--mask-fade-width: 1rem`) | the existing knob; supersede/rename to `--fade-scroll-width`, keep 1rem default |

## Goal criterion

`<FadingScroll>` ships as the library's single scroll-state-driven edge-fade primitive
(`@mkbabb/glass-ui/fading-scroll`, axis `x`|`y`): the start edge feathers only past
`scroll > 0`, the end edge only while trailing overflow remains, native `scroll(self)`-timeline
on supporting engines with the `useFadingScroll` JS fallback, PRM-clean. The two consumers THIS
wave owns — the SegmentedTabs `overflow="scroll"` mask + the demo preset strips (blob mood row,
aurora controls column) + the bespoke `PresetPickerRow` prototype — fold onto it, and the
scroll-state-blind `.scroll-fade-*` static utilities are retired in a clean break, so the R8-08
"at-rest fade on a non-scrolled edge" defect is structurally impossible.

## Scope

1. **Create the `<FadingScroll>` component** at `src/components/custom/fading-scroll/`
   (feature-dir colocation per AY.W-COLOCATE — `FadingScroll.vue` at root, the
   `useFadingScroll` composable under `composables/`, an `index.ts` barrel, a `README.md`).
   A thin default-slotted scroll-port wrapper. Props: `axis?: "x" | "y"` (default `"x"`),
   `fadeStart?: boolean` (default `true`), `fadeEnd?: boolean` (default `true`). The root IS
   the scroll port; the default slot IS the scrolled content. Born with ≥2 consumers by
   construction (SegmentedTabs binary + the demo strips).
2. **The dual-path edge-fade mechanism, single writer (mirror `scroll-driven.css`).** The CSS
   half folds into `src/styles/utilities/base.css` (extending — and SUPERSEDING — the
   `.scroll-fade-*` family). **Native primary:** drive per-edge `@property
   <length-percentage>` mask-width customs (`--fade-start`, `--fade-end`, registered
   `inherits: false`, so they interpolate) off a `scroll(self inline)` / `scroll(self block)`
   timeline inside an `@supports (animation-timeline: scroll())` block — `animation-range`
   feathers `--fade-start` from `0` only once `scroll > 0`, and `--fade-end` only while trailing
   overflow remains. ZERO JS on supporting engines (Baseline Newly Available — the same bar
   `scroll-driven.css` cleared). **JS fallback (≤20 LOC, feature-detected OFF when the timeline
   is supported):** `useFadingScroll(el, { axis, fadeStart, fadeEnd })` promotes the
   `PresetPickerRow` measure loop — `scrollLeft/Top`, `scrollWidth/Height − clientWidth/Height`,
   a `ResizeObserver` + rAF-coalesced `@scroll`, writing the SAME `--fade-start`/`--fade-end`
   customs. Reuses the repo's `useResizeObserver` + `useRAFLoop` substrates (no hand-rolled rAF).
3. **PRM-clean as a LEGIBILITY affordance, not motion.** Under `prefers-reduced-motion: reduce`
   the edge-fade is STATIC — the mask is present-or-absent per the discrete overflow flags, with
   no animated feather. Unlike `scroll-driven.css` (where the whole `@supports` block sits under
   `prefers-reduced-motion: no-preference` and vanishes under PRM), the fade is a legibility
   cue, so it does NOT vanish under PRM — it just stops interpolating; the discrete
   overflow-edge presence stays correct.
4. **The token surface.** Mint `--fade-scroll-width` (default `1rem`, inheriting, retunable on
   any ancestor) superseding `--mask-fade-width` (`offsets-sizing.css:15`). Clean break — the
   `--mask-fade-width` name retires with the static utilities (no alias). SegmentedTabs' local
   `0.5rem` override (`segmented-tabs.css:268`) re-points to `--fade-scroll-width: 0.5rem`. The
   registered `@property` interpolation customs (`--fade-start`/`--fade-end`) are INTERNAL, not
   a public token.
5. **Migrate THIS wave's consumers onto the primitive (agent unit 2).**
   - **SegmentedTabs C5** (`SegmentedTabs.vue:344`): the `variant="underline"` / `overflow="scroll"`
     strip's `scroll-fade-mask` class re-points onto `<FadingScroll axis="x">` (or the composable
     where the root tag is load-bearing); the `.segmented-tabs--scroll` local `--mask-fade-width`
     re-points to `--fade-scroll-width: 0.5rem` (`segmented-tabs.css:268`).
   - **Blob mood row C1** (`demo/stories/substrates/blob.vue:404`): the `overflow-x-auto
     scroll-fade-mask` strip wraps in `<FadingScroll axis="x">` — the R8-08 surface; this is the
     binding visual the π readback re-shoots.
   - **Aurora controls column C4** (`demo/stories/aurora/AuroraConfigDock.vue:229`): the
     `.scroll-fade-y` column wraps in `<FadingScroll axis="y">`.
   - **PresetPickerRow C6** (`PresetPickerRow.vue:78-85`): the bespoke `measure()`/`ResizeObserver`/
     `--mask-l`/`--mask-r`/`--edge-mask`/`@scroll` machinery DELETES, folding onto
     `<FadingScroll axis="x">` (or `useFadingScroll`) — the prototype the primitive was extracted
     from retires.
6. **Register the subpath.** `src/subpaths/fading-scroll.ts`
   (`export * from "../components/custom/fading-scroll"` — the trivial one-line mirror,
   batch-resolved by `vite.library.ts`'s `src/subpaths/*.ts` glob), the `package.json` `exports`
   + `typesVersions["*"]` entries (the contract-v2 `{ types, import }` shape), and `flatten-subpath-types.mjs`
   keeps `dist/fading-scroll.d.ts` flat. `verify-export-types` + `proof:resolution` +
   `proof:subpath-enumeration` must stay green.
7. **The static-utility retirement is COORDINATED, not landed here.** The four `.scroll-fade-*`
   utility blocks (`base.css:271-285`) + the `--mask-fade-width` token are RETIRED in a final
   clean-break commit owned by the ORCHESTRATOR at Batch 2 close — AFTER W-CONFIG-CHASSIS has
   migrated its own C2/C3 consumers in its own file bound (the declared coordination seam). This
   wave LEAVES the static utilities in place (so W-CONFIG-CHASSIS's surfaces do not render
   un-masked mid-batch) and DELIVERS the primitive + retires only its OWN consumers' references.
   The gate's retirement witness (W6) asserts no NON-coordination in-tree consumer survives;
   the C2/C3 configurator references are the named exception held by W-CONFIG-CHASSIS until the
   orchestrator retire commit.

## Triumvirate Dispatch

- **File-bounds expansion that invalidates the wave**: if the SegmentedTabs C5 migration
  (scope 5a) cannot be done without restructuring the `<div ref="containerRef">` root that the
  shared spring-indicator anchor (`position-anchor`/`inset`) depends on — i.e. wrapping the
  scroll port in `<FadingScroll>` would re-parent the indicator and break the
  `variant="underline"` register the SegmentedTabs family also serves — that is a scope-reveal;
  triumvirate (research the wrap-vs-`useFadingScroll`-on-the-existing-root options, plan-augment
  the bound, redress), do NOT restructure the SegmentedTabs indicator unilaterally. The
  `useFadingScroll(containerRef)` composable form (no extra DOM node) is the likely escape — it
  is named here so the impl agent reaches for it before widening.
- **Hard-gate failures not local-edit-recoverable**: if the native `scroll(self)`-timeline path
  cannot drive the per-edge mask customs such that the at-rest no-overflow edge reads SHARP in
  the π readback (the start edge feathering at `scroll = 0` survives after the
  `animation-range` re-point), that is a mechanism-design miss — triumvirate, do not loop on
  `animation-range` values.
- **Diagnostic loop halt**: if after three iterations the JS fallback and the native path BOTH
  write `--fade-start`/`--fade-end` on the same engine (the single-writer discipline breaks —
  a double-feather), halt and triumvirate (the `@supports`/feature-detect gate is the suspect,
  mirroring the `scroll-driven.css` / `useScrollProgress` gate).

## File Bounds

| File | Access |
|---|---|
| `src/components/custom/fading-scroll/FadingScroll.vue` | create |
| `src/components/custom/fading-scroll/composables/useFadingScroll.ts` | create |
| `src/components/custom/fading-scroll/index.ts` | create |
| `src/components/custom/fading-scroll/README.md` | create |
| `src/subpaths/fading-scroll.ts` | create |
| `src/styles/utilities/base.css` | modify (fold the dual-path CSS half + the `@property` customs; the `.scroll-fade-*` retirement is the ORCHESTRATOR's Batch-close commit, NOT this wave) |
| `src/styles/tokens/offsets-sizing.css` | modify (`--fade-scroll-width` mint; `--mask-fade-width` retire-coordinated) |
| `src/components/custom/tabs/SegmentedTabs.vue` | modify (C5 — re-point the `scroll-fade-mask` to the primitive/composable) |
| `src/styles/segmented-tabs.css` | modify (`--mask-fade-width: 0.5rem` → `--fade-scroll-width: 0.5rem` at `:268`) |
| `demo/stories/substrates/blob.vue` | modify (C1 — the mood row wraps `<FadingScroll axis="x">`) |
| `demo/stories/aurora/AuroraConfigDock.vue` | modify (C4 — the controls column wraps `<FadingScroll axis="y">`) |
| `demo/stories/aurora/PresetPickerRow.vue` | modify (C6 — the bespoke JS deletes, folds onto the primitive) |
| `package.json` | modify (the `/fading-scroll` exports + typesVersions entries; register `proof:fading-scroll` + add to `proof:all`/parity) |
| `scripts/proof-fading-scroll.mjs` | create (the born-RED gate) |
| `scripts/gates.mjs` | modify (register the gate row in the gate registry) |
| `CLAUDE.md` | modify (record the `<FadingScroll>` primitive + subpath in §Structure custom/ + the convention) |
| `MIGRATION.md` | modify (the `.scroll-fade-*` → `<FadingScroll>` clean-break row + `--mask-fade-width` → `--fade-scroll-width` rename) |

Do NOT touch:
- **`src/components/custom/configurator/*`** + **`demo/configurator/*`** + the
  **`src/components/custom/configurator/Configurator.vue:187,192,232`** `.scroll-fade-y` /
  `.scroll-fade-mask` references (C2/C3) — **W-CONFIG-CHASSIS** owns its own consumer migration
  inside its file bound (the declared Batch-2 coordination seam; BA EXECUTION-DAG §3). This wave
  mints the primitive; W-CONFIG-CHASSIS adopts it; neither writes the other's file.
- **The rail chips + the embla-on-overflow momentum fold (DC-REC-7)** — **W-DOCK-SECTIONS**
  (Batch 3) consumes `<FadingScroll>` for chip overflow and folds the booked embla
  momentum-paging; this wave does NOT build the rail consumer or the embla fold (BA.md Batch 3;
  EXECUTION-DAG §4).
- **`src/styles/dock/overflow.css`** dock `overflow="scroll"` rounded-pill clip (census C7 —
  a DISTINCT mechanism, the rounded-pill edge, NOT a linear mask; not a consumer).
  **W-DOCK-GEOMETRY** (Batch 2) owns the dock overflow geometry; this wave does not touch it.
- **`ScrollingText.vue`** (`:78-94`) — masks on an overflow-DETECTION signal
  (`[data-overflows]`), not scroll position; the marquee-clip case, a different concern.
- The standing fences: **GL shader internals** (aurora.frag/metaball.frag — untouched, this wave
  has no shader surface); **ppmycota purple** (no library token gains it); the **slides M docs**
  (foreign — `docs/tranches/M/`).

### Disjointness

Two agent units, SERIAL (unit 2 migrates onto the primitive unit 1 lands), so no concurrent
shared-path write. Within the wave: unit 1 writes the `fading-scroll/` dir + `base.css` +
`offsets-sizing.css` + the subpath/gate/pkg registration; unit 2 writes the four consumer files
(SegmentedTabs.vue, segmented-tabs.css, blob.vue, AuroraConfigDock.vue, PresetPickerRow.vue) —
disjoint from unit 1's set. Across Batch 2: W-CONFIG-CHASSIS writes `configurator/*` +
`labeled-field/*` (this wave does not); W-GOO-REDRESS writes `goo-blob/*` (this wave does not —
it touches only `blob.vue`'s mood-row wrapper, NOT the renderer); W-DOCK-GEOMETRY writes
`dock/{shell,overflow}.css` + the shell docks' `overflow` prop (this wave does not). `base.css`
is touched by NO other Batch-2 wave. **The one near-miss**: `demo/stories/substrates/blob.vue`
is named in W-GOO-REDRESS's bound (`STUDIO_GEO_BASE` — the renderer geometry) AND this wave (the
mood-row scroll strip at `:404`). These are disjoint REGIONS of the file (the geometry constants
vs the preset-row template); the orchestrator sequences the two blob.vue edits OR folds the
mood-row wrap into W-GOO-REDRESS's commit — declared here as a coordination note (see §Worktree).

### Worktree Plan

| Agent unit | Sibling worktree absolute path | note |
|---|---|---|
| BA.W-FADING-SCROLL.1 | `/Users/mkbabb/Programming/glass-ui-ba-fading-1` | the primitive + CSS + subpath/gate |
| BA.W-FADING-SCROLL.2 | (serial — same worktree after unit 1's integration commit) | the consumer migration |

The `blob.vue` near-miss with W-GOO-REDRESS: the orchestrator either (a) lands W-GOO-REDRESS's
`blob.vue` renderer-geometry edit and this wave's mood-row wrap as two non-overlapping hunks in
sequence, or (b) hands the one-line mood-row `<FadingScroll>` wrap to W-GOO-REDRESS to land in
its commit. Both waves cite the OTHER's `blob.vue` region in their PROGRESS to surface the seam.

## Agent Units

### BA.W-FADING-SCROLL.1 the `<FadingScroll>` primitive + the dual-path CSS half

- Goal: `<FadingScroll>` + `useFadingScroll` + the native `scroll(self)`-timeline CSS ship as
  the library's single scroll-state-driven edge-fade, subpath-published, born ≥2 consumers.
- Mechanism: the feature-dir component (FadingScroll.vue root scroll-port + the default content
  slot) over the dual-path mask: the native `@supports (animation-timeline: scroll())` block
  drives the `@property <length-percentage>` `--fade-start`/`--fade-end` customs off the
  `scroll(self inline|block)` timeline with `animation-range` gating the start edge past
  `scroll > 0` and the end edge to trailing overflow; the `useFadingScroll` JS fallback
  (promoted from `PresetPickerRow:25-48`, reusing `useResizeObserver`/`useRAFLoop`) writes the
  same customs, gated OFF where the timeline is supported. PRM keeps the discrete overflow-edge
  presence (no animated feather, no vanish). The `--fade-scroll-width` token (1rem) supersedes
  `--mask-fade-width`. Subpath/exports/typesVersions/flatten registered.
- Files: `fading-scroll/{FadingScroll.vue, composables/useFadingScroll.ts, index.ts, README.md}`,
  `subpaths/fading-scroll.ts`, `styles/utilities/base.css` (the CSS half), `styles/tokens/offsets-sizing.css`,
  `package.json`, `scripts/proof-fading-scroll.mjs`, `scripts/gates.mjs`, `CLAUDE.md`, `MIGRATION.md`.
- Sub-gate: the gate's W1-W4 + W7 witnesses — the start-edge `animation-range` gates on
  `scroll > 0` (source), the end-edge on trailing overflow (source), the JS fallback is
  feature-detect-gated OFF under timeline support (source), the subpath resolves
  (`verify-export-types` + `proof:resolution` green), AND the π readback shows a strip's at-rest
  start edge is SHARP (no feather at `scroll = 0`) on a `<FadingScroll>` demo mount.

### BA.W-FADING-SCROLL.2 the consumer migration + the bespoke-prototype retire

- Goal: SegmentedTabs `overflow="scroll"` + the blob mood row + the aurora controls column read
  the new primitive, and the `PresetPickerRow` bespoke JS is gone — no in-tree non-coordination
  consumer references the static `.scroll-fade-*` utilities.
- Mechanism: re-point C5 (SegmentedTabs `scroll-fade-mask` → `<FadingScroll>`/`useFadingScroll`
  + the `--fade-scroll-width: 0.5rem` local override), wrap C1 (blob mood row) and C4 (aurora
  controls column) in `<FadingScroll axis="x|y">`, and delete the C6 `PresetPickerRow`
  `measure()`/`ResizeObserver`/`--mask-l`/`--mask-r`/`--edge-mask`/`@scroll` machinery onto the
  primitive. The C2/C3 configurator references stay (W-CONFIG-CHASSIS's bound) until the
  orchestrator's Batch-close retire commit.
- Files: `tabs/SegmentedTabs.vue`, `styles/segmented-tabs.css`, `demo/stories/substrates/blob.vue`
  (mood-row region only — coordinate with W-GOO-REDRESS per §Worktree),
  `demo/stories/aurora/AuroraConfigDock.vue`, `demo/stories/aurora/PresetPickerRow.vue`.
- Sub-gate: the gate's W5 + W6 witnesses — W5: the four migrated consumers (C1/C4/C5/C6) carry
  NO `scroll-fade-mask`/`scroll-fade-y` class and the `PresetPickerRow` bespoke `--mask-l`/`--mask-r`
  machinery is DELETED (source); W6: the only surviving in-tree `.scroll-fade-*` references are
  the named C2/C3 configurator pair (the coordination exception) — AND the π re-shoot of the
  R8-08 blob mood row shows the at-rest left edge SHARP in BOTH modes.

## Hard Gate

`proof:fading-scroll` (born-RED at HEAD, driven GREEN by the wave) — falsifiable SOURCE
witnesses (the comment-strip + pure-detector house pattern, mirroring `proof-suffuse.mjs` /
`proof-dock-rail-hairline.mjs`), each red at HEAD pre-wave:

1. **W1 — the start edge is overflow-gated, not unconditional.** The native CSS path's
   start-edge feather (`--fade-start`) is driven by an `animation-range` that gates on
   `scroll > 0` (NOT a static `linear-gradient(to right, transparent, black …)` that feathers at
   `scroll = 0`). RED at HEAD: `base.css:271-273` is the unconditional two-sided gradient. The
   source half asserts the POSITIVE — a `scroll(self …)` timeline drives a per-edge custom that
   the start range opens past zero — not merely the ABSENCE of the static class (a rename would
   evade). The π half (W7) is the binding floor: the at-rest start edge measures NO mask
   opacity-falloff at `scroll = 0`.
2. **W2 — the end edge is trailing-overflow-gated.** The end-edge feather (`--fade-end`) is
   driven only while trailing overflow remains (the `animation-range` end / the JS
   `scrollWidth − clientWidth − scrollLeft > tolerance` predicate), so a strip that FITS shows
   no end feather. RED at HEAD: the static gradient feathers the right edge regardless of
   overflow.
3. **W3 — both axes, one primitive.** The component accepts `axis: "x" | "y"` and the CSS drives
   `scroll(self inline)` for `x` and `scroll(self block)` for `y` (the vertical-strip case — the
   user's "compatible with vertical scrolling too"). RED at HEAD: the static `.scroll-fade-mask`
   (H) and `.scroll-fade-y` (V) are two unrelated utilities, not one axis-parameterized path.
4. **W4 — single-writer dual-path.** The `useFadingScroll` JS fallback is feature-detect-gated
   OFF when `animation-timeline: scroll()` is supported (the `scroll-driven.css` /
   `useScrollProgress` discipline — no double-write of `--fade-start`/`--fade-end`). The source
   asserts the composable's gate predicate exists and references the same customs the CSS writes.
5. **W5 — the four owned consumers migrated.** C1 (blob mood row), C4 (aurora controls column),
   C5 (SegmentedTabs `overflow="scroll"`), C6 (PresetPickerRow) carry NO `scroll-fade-mask` /
   `scroll-fade-y` class, and `PresetPickerRow`'s bespoke `--mask-l`/`--mask-r`/`--edge-mask` +
   `measure()`/`ResizeObserver`/`@scroll` machinery is DELETED. RED at HEAD: all four reference
   the static path / the bespoke JS.
6. **W6 — the static-utility retirement is consumer-clean (the coordination floor).** The ONLY
   surviving in-tree `.scroll-fade-mask` / `.scroll-fade-y` / `-top` / `-bottom` references are
   the NAMED C2/C3 configurator pair (`Configurator.vue:187,192,232`), held by W-CONFIG-CHASSIS
   until the orchestrator's Batch-close retire commit — the gate's allowlist carries exactly
   those two paths and FAILS on any other surviving reference (the anti-evasion: a new strip
   cannot smuggle the static utility back in unaudited). The static utility BLOCKS in `base.css`
   themselves survive this wave (so C2/C3 still render) and retire at the orchestrator commit;
   the gate's "static-block-present-iff-C2/C3-still-reference-it" invariant flips GREEN
   automatically when that commit lands.
7. **W7 — the π binding readback** (the cardinal-lesson DELTA, captured own-surface): a live
   `:5199/substrates/blob` capture (the R8-08 mood-row surface) in BOTH modes + a paired π
   readback proving (a) at `scrollLeft = 0` the LEFT/start edge has NO mask opacity-falloff (the
   first card's chrome is sharp — the R8-08 defect gone), (b) the RIGHT/end edge DOES feather
   while `scrollWidth > clientWidth` (the trailing-overflow cue present), and (c) a fits-no-overflow
   strip shows NEITHER edge feathered. Plus the vertical re-shoot on the aurora controls column
   (`:5199/...AuroraConfigDock`): at `scrollTop = 0` the top edge is sharp. Captured to
   `docs/tranches/BA/audit/visual/W-FADING-SCROLL-DELTA.md` with before/after frames against
   `ground/R8-08-fading-scroll-list.png`.

**THE GESTALT BAR (BA invariant 4 — the binding visual truth).** W1-W6 are the device-free CI
half (`proof:fading-scroll`); the W7 π readback is necessary but NOT sufficient. The wave does
NOT close on per-mechanism greens alone — the owning surfaces (the blob mood row + the aurora
controls column + the SegmentedTabs underline picker) are captured WHOLE-PAGE, BOTH modes, over
their real backdrop, and judged as a gestalt under `proof:ba-gestalt` ("does the strip read as a
designed whole — no at-rest fade, the overflow cue legible, the glass chrome intact?"). A
source-green/visually-broken gap is the exact AZ P-1 close-class failure this tranche exists to
prevent; the `proof:ba-gestalt` verdict for the fading-scroll roster surfaces is BINDING at
W-REFLECT2.

## Format And Lint Cadence

`npm run typecheck` after the FadingScroll.vue + useFadingScroll.ts + SegmentedTabs/PresetPickerRow
edits; `npm run build` to confirm the new `dist/fading-scroll.js` chunk + the `base.css` partial
compile; `node scripts/proof-fading-scroll.mjs` born-RED before the source edits (proof it fails
at HEAD), GREEN at close; `npm run verify-export-types` + `npm run proof:resolution` +
`npm run proof:subpath-enumeration` after the subpath/exports registration; `npm run
proof:gate-script-parity` after the package.json/gates.mjs registration; `git diff --check`
before close. The retirement consistency (W6) re-runs after the orchestrator's Batch-close
retire commit.

## Verification Artefacts

- `docs/tranches/BA/audit/visual/W-FADING-SCROLL-DELTA.md` — before/after `:5199/substrates/blob`
  (the R8-08 mood row) + `:5199/...AuroraConfigDock` (the vertical column) frames in BOTH modes
  + the paired π readback (start-edge mask opacity at `scroll = 0`, end-edge feather while
  overflowing, fits-no-overflow both-sharp).
- The `proof:fading-scroll` JSON artefact (born-RED log + GREEN-at-close log).
- The `verify-export-types` / `proof:resolution` / `proof:subpath-enumeration` output post-registration.
- The gate-script-parity output post-registration.

## Commit Plan

- impl commit (unit 1): `feat(fading-scroll): scroll-state-driven edge-fade primitive — native scroll(self) + useFadingScroll fallback, subpath /fading-scroll (BA.W-FADING-SCROLL)` — names the dual-path single-writer mechanism + the ≥2-consumer count in the body.
- migration commit (unit 2): `refactor(fading-scroll): SegmentedTabs + demo strips onto <FadingScroll>, PresetPickerRow bespoke JS retired (BA.W-FADING-SCROLL)`.
- gate commit: `test(fading-scroll): proof:fading-scroll born-RED→GREEN + parity registration`.
- doc/status commit: the CLAUDE.md primitive record + the MIGRATION rows + the DELTA doc + PROGRESS row.
- ORCHESTRATOR (Batch-2 close, NOT this wave): `refactor(styles)!: retire .scroll-fade-* static utilities + --mask-fade-width onto <FadingScroll>/--fade-scroll-width (BA Batch 2 close)` — lands ONLY after W-CONFIG-CHASSIS migrated C2/C3.

## Dependencies

- **Depends on**: BA Batch 1 (W-DARK-MATERIAL holds its verdict — BA invariant 5: no
  demo-staging/capture wave lands over a broken dark register; the π readback re-shoots the
  R8-08 surface in BOTH modes, so the dark arm must be sound). Structurally disjoint from the
  other Batch-2 waves (separate file bounds).
- **Blocks**: **W-CONFIG-CHASSIS** consumes `<FadingScroll>` for its C2/C3 configurator columns
  (the declared seam — it adopts inside its own bound; the static-utility retire is the
  orchestrator's Batch-close commit gated on its migration). **W-DOCK-SECTIONS** (Batch 3)
  consumes `<FadingScroll>` for the rail-chip overflow and folds the booked embla-on-overflow
  momentum (DC-REC-7). **W-DEMO-AFFORDANCES** (Batch 6) consumes `<FadingScroll>` as the curve-picker
  chip-rack overflow arm. The primitive is the shared overflow-fade vocabulary all three read.

## Named successors

- **The embla-on-overflow momentum fold (DC-REC-7)** is BOOKED to W-DOCK-SECTIONS, not this wave
  — `<FadingScroll>`'s overflow case here is the plain `overflow` + scroll-snap strip; the embla
  `Carousel` momentum-paging promotion lands when a genuinely-overflowing facet set (the rail
  chips) exceeds the inline budget. If a THIS-wave consumer (the SegmentedTabs underline picker
  with all 12 curve families) is found to overrun far enough that the plain strip is
  insufficient, that is a named successor to W-DOCK-SECTIONS's embla fold — recorded, not
  force-built here.
- **The C2/C3 configurator migration + the static-utility retirement** is W-CONFIG-CHASSIS's
  consumer work + the orchestrator's Batch-close retire commit — foreseeable as the seam this
  wave leaves open by design.
