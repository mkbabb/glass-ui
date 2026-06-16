# BA.W-FADING-SCROLL — the scroll-state-driven `<FadingScroll>` edge-fade primitive · DELTA

<!-- surface-paths: src/components/custom/fading-scroll/FadingScroll.vue, src/components/custom/fading-scroll/composables/useFadingScroll.ts, src/components/custom/fading-scroll/index.ts, src/components/custom/fading-scroll/README.md, src/subpaths/fading-scroll.ts, src/styles/utilities/base.css, src/styles/tokens/offsets-sizing.css, src/components/custom/tabs/SegmentedTabs.vue, src/styles/segmented-tabs.css, demo/stories/aurora/AuroraConfigDock.vue, demo/stories/aurora/PresetPickerRow.vue, scripts/proof-fading-scroll.mjs, tests-visual/fading-scroll.spec.ts -->
<!-- surface-hash: 92a369bc120645ffd8e053552036dba996e37fbc6a7b8d100e222710516e72a2 -->
<!-- AZ.W-GATES content-hash freshness model: fresh IFF the surface-paths' bytes are
     byte-identical to capture time (sha256 of the concatenated bytes, "\n"-joined).
     Re-stamp + re-shoot if any surface byte changes. The blob mood-row C1 surface
     (demo/stories/substrates/blob.vue) is the W-GOO-REDRESS coordination seam and is
     NOT in this wave's surface-paths (the sibling owns its wrap); the blob after-frames
     here capture the surface state at this wave's HEAD (pre-wrap) and re-shoot when the
     sibling lands. -->

**Wave**: BA.W-FADING-SCROLL — the library `<FadingScroll>` primitive, scroll-state-driven edge fades h+v, the static `.scroll-fade-*` utilities retired (consumer arm)
**Status**: COMPLETE for the owned bound (unit 1 + unit 2 C4/C5/C6). C1 (blob mood row) is the W-GOO-REDRESS coordination seam — the literal diff block is emitted to the orchestrator; W5/W6 of `proof:fading-scroll` flip GREEN when that wrap lands.
**Nature**: VISUAL wave (BA invariant 4 binds). `proof:fading-scroll` (source) + this π readback (the binding RENDER truth) + `proof:ba-gestalt` (W-REFLECT2's verdict) are the close set.

## The defect (R8-08) vs the fix

| | HEAD (the static `.scroll-fade-*` mask) | this wave (`<FadingScroll>`) |
|---|---|---|
| at `scrollLeft = 0` | LEFT edge feathered → the first card's chrome half-erased ("Shy") | LEFT/start edge SHARP (`--fade-start: 0px`) |
| no trailing overflow | RIGHT edge feathered regardless | end edge SHARP only at the scroll end |
| while overflowing | both edges feathered, scroll-blind | start SHARP at rest, end FEATHERED (the real overflow cue) |
| vertical axis | a separate unrelated `.scroll-fade-y` utility | the SAME primitive, `axis="y"`, `scroll(self block)` |
| scroll-aware path | bespoke binary JS trapped in ONE demo file (`PresetPickerRow`) | the shared primitive, ≥2 consumers by construction |

## The binding π readback (the W7 truth — `tests-visual/fading-scroll.spec.ts`, chromium-headless-new)

The native `scroll(self)` timeline is LIVE on the capture engine (chromium-headless-new), so the readback proves the native primary path directly:

- **mechanism `.fading-scroll--x`** — at rest: `--fade-start = 0px` (SHARP), `--fade-end > 0` (FEATHERED); scrolled to end: `--fade-start > 0` (FEATHERED), `--fade-end = 0px` (SHARP); a fits-no-overflow strip: NEITHER edge feathered. **PASS.**
- **mechanism `.fading-scroll--y`** — the identical assertions on the block axis (the user's "compatible with vertical scrolling too"). **PASS.**
- **live aurora surfaces** — `/substrates/aurora`: every at-rest `<FadingScroll>` port (the migrated AuroraConfigDock controls column `axis="y"` + the PresetPickerRow `axis="x"`) reads `--fade-start: 0px` (top/left edge SHARP at rest). **PASS.**
- **live blob mood row** — `/substrates/blob`: SKIPPED-not-RED until the W-GOO-REDRESS `<FadingScroll axis="x">` wrap lands (the sibling's file); the assertion (`--fade-start: 0px` at rest) is wired and flips live on the sibling commit.

11 passed, 1 skipped (the blob-live arm), 0 failed.

## The captured frames (literal filenames, `audit/visual/`)

Aurora controls column (the migrated `axis="y"` C4 surface):
- `W-FADING-SCROLL-aurora-after-light-desktop.png` / `-light-mobile.png`
- `W-FADING-SCROLL-aurora-after-dark-desktop.png` / `-dark-mobile.png`

Blob mood row (the R8-08 surface; pre-W-GOO-REDRESS-wrap state — re-shoot when the sibling lands):
- `W-FADING-SCROLL-blob-after-light-desktop.png` / `-light-mobile.png`
- `W-FADING-SCROLL-blob-after-dark-desktop.png` / `-dark-mobile.png`

Before (the ground capture): `docs/tranches/BA/audit/ground/R8-08-fading-scroll-list.png` (the mood row with "Shy" feathered at rest).

## The mechanism (unit 1)

- **`<FadingScroll>`** (`@mkbabb/glass-ui/fading-scroll`, feature-dir colocation) — a thin default-slotted scroll-port wrapper, props `axis: "x"|"y"`, `fadeStart`, `fadeEnd`. Root IS the scroll port; slot IS the content.
- **Dual-path, single writer** (mirrors `scroll-driven.css`): the native `@supports (animation-timeline: scroll())` block in `utilities/base.css` drives the registered `@property <length-percentage>` `--fade-start` / `--fade-end` customs off a `scroll(self inline|block)` timeline — `animation-range: 0 var(--fade-scroll-width)` opens the start past `scroll > 0`, `animation-range: calc(100% - var(--fade-scroll-width)) 100%` closes the end on trailing overflow. The `useFadingScroll` JS fallback (promoted from the `PresetPickerRow` measure loop, reusing `useResizeObserver` + a rAF-coalesced scroll listener) writes the SAME customs, feature-detect-gated OFF (`supportsScrollTimeline()`) under native support — no double-feather.
- **PRM** — the fade is a LEGIBILITY cue, not motion: it does NOT vanish under `prefers-reduced-motion: reduce` (unlike `scroll-driven.css`); it stops interpolating, the discrete overflow-edge presence stays correct.
- **token** — `--fade-scroll-width` (1rem, inheriting) supersedes `--mask-fade-width` (retire-coordinated to the orchestrator's Batch-close commit). SegmentedTabs' local `0.5rem` re-points onto it.

## The migrated consumers (unit 2)

- **C5 SegmentedTabs** (`overflow="scroll"` underline strip) — the composable form `useFadingScroll(containerRef)` (NOT the wrapper) because the container root is the spring-indicator anchor; wrapping it would re-parent the indicator (the named triumvirate escape, taken). `scroll-fade-mask` → `fading-scroll fading-scroll--x` + the `data-fade-*` attrs; `--mask-fade-width: 0.5rem` → `--fade-scroll-width: 0.5rem`.
- **C4 aurora controls column** (`AuroraConfigDock.vue`) — wrapped in `<FadingScroll axis="y">`; `data-aurora-atoms-surface` + layout utilities ride the root.
- **C6 PresetPickerRow** — the bespoke `measure()` / `ResizeObserver` / `--mask-l`/`--mask-r`/`--edge-mask` / `@scroll` machinery DELETED, folded onto `<FadingScroll axis="x">` (the prototype the primitive was extracted from, retired).
- **C1 blob mood row** — the W-GOO-REDRESS coordination seam (the diff block is in this wave's report; the sibling lands it).

## proof:fading-scroll state

7/9 source witnesses GREEN at this wave's HEAD. The two remaining (W5 four-consumers-migrated, W6 retirement-consumer-clean) are RED ONLY on `demo/stories/substrates/blob.vue` (C1) — the W-GOO-REDRESS file; they flip GREEN automatically when the sibling applies the mood-row wrap. The C2/C3 configurator references (W6 allowlist) retire at the orchestrator's Batch-close commit after W-CONFIG-CHASSIS migrates them.
