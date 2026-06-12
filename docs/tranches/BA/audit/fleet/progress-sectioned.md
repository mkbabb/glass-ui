# Lane: progress-sectioned (R8-14)

**Surface:** `<Progress variant="sectioned">` — the phase-bus variant.
**User words:** "The sectioned variant of the progress bar is totally broken and should be a proper blended gradient with distinct segments."
**Verdict:** CONFIRMED, mechanical. The current design is a stack of independent per-cell rectangles with a doomed seam-overlay band over the hard joins. The architecture is wrong for the brief; a re-shape (not a tune) is owed.

Route: `/feedback/progress` (story `demo/stories/feedback/progress.vue`, the `sectioned variant (phase bus)` section).
Source: `src/components/ui/progress/ProgressSectioned.vue` + `src/components/ui/progress/useProgressGeometry.ts`.
Evidence: `R8-14-rail-crop.png` (rail band isolated from the ground capture; dark mode). Live DOM/computed-style probe captured on :5199 (dark). Light mode reasoned from the same tokens (the defect is mode-independent in mechanism; see §Both modes).

---

## What the capture shows (rail, left→right)

1. Orange cell (pings, completed) — own **pill-capped right edge**, then a hard step.
2. Light-blue cell (jitter, completed) — **square left edge** butting the orange pill cap → a visible **light vertical seam stripe** at the join.
3. Purple cell (download, active 58%) — another light seam at the blue→purple join; a pill cap **mid-cell** where the 58% active fill ends.
4. A distinctly **darker recessed "dead notch"** between purple and the 4th cell.
5. Muted grey-purple 4th cell (upload, pending) — a dull desaturated slab that trails off into the empty dark track.

That is precisely the user's three complaints: hard color cells, mis-joined seams, a dead notch.

---

## Root causes (file:line)

### RC-1 — The fill is per-cell with a pill cap on EVERY cell's trailing edge → hard internal steps (S1)
`ProgressSectioned.vue:166–192` (`.progress-sectioned-fill`). Each completed/active cell paints its OWN saturated `linear-gradient(180deg, …var(--cell-color)…)` fill span and rounds **both** the trailing corners with `border-start-end-radius / border-end-end-radius: var(--radius-pill)` (lines 173–174). Result: a *completed* cell (fill width 100%) ends in a pill cap, and the next cell's fill starts square against it. There is no continuous fill across the whole bar — it is N separate pills laid end-to-end. The pill cap on an internal completed-cell boundary is the structural source of the "hard step" the user sees; a blended gradient cannot exist while each cell owns an independently-capped fill.

DOM probe (dark, :5199) confirmed four discrete cells each at 271.5px width with `fillRectW` 272 / 272 / 157 / 0 and independent `linear-gradient(var(--cell-color)…)` backgrounds — four rectangles, not one ramp.

### RC-2 — The seam overlay is a `mix-blend-mode: screen` band that does not blend on a dark track → bright seam stripes + the dead notch (S1)
`ProgressSectioned.vue:236–252` (`.progress-sectioned-seam`). A 24px-wide overlay sits at each boundary, `opacity: 0.5`, `mix-blend-mode: screen`, painting `color-mix(seam-from)→white→color-mix(seam-to)`. Two failures:
- `screen` over a saturated cell **brightens** rather than smooths — the boundary reads as a light vertical stripe between two hard cells (visible at orange→blue and blue→purple), not a soft blend.
- At the purple(active)→`--surface-tint-40`(pending) boundary the seam's `--seam-to` is a near-transparent grey (`color-mix(in srgb, hsl(48 10% 90%) 40%, transparent)`); a `screen` blend of near-transparent grey contributes ≈ nothing, so the seam **vanishes** and the underlying recessed dark track shows through as the **dead notch**. DOM probe: seam[2] `from oklch(0.739 0.134 318.1)` → `to color-mix(... 40%, transparent)`, opacity 0.5, blend screen — i.e. the seam that is supposed to bridge into the pending cell is the one that cannot paint.

The seam-overlay approach is the wrong primitive entirely: a fixed-width screen band cannot reconcile two arbitrary cell colors over a recessed track. The blend belongs IN the fill paint (one gradient with soft stops), not as a separate compositing band.

### RC-3 — The pending cell's base tint is a desaturated grey, not the phase color → the 4th segment reads dead even before the notch (S2)
The demo passes `color: "var(--surface-tint-40)"` for the `upload` segment (`demo/stories/feedback/progress.vue:17`), which resolves to `color-mix(in srgb, var(--foreground) 40%, transparent)`. The cell's pending base tint is then `color-mix(in srgb, var(--cell-color) 12%, transparent)` of THAT (`ProgressSectioned.vue:152`) — a 12%-of-40%-foreground wash. In dark mode `--foreground` is near-white, so the pending cell is a dull grey-purple slab; in light mode it is a faint warm-grey. Either way the 4th phase has no phase identity. This is partly a demo-data smell (a pending phase should carry its real hue at low saturation, not a neutral tint token), but the component's pending-state recipe (a flat 12% wash of `--cell-color`) also gives pending cells no shape/edge, compounding RC-2's notch.

### RC-4 — No continuous track-fill relationship; cells are absolutely-positioned siblings with no shared geometry (S2, design)
`ProgressSectioned.vue:78–103`. Each `.progress-sectioned-cell` is `position: absolute; left: startPct%; width: widthPct%` with its own `overflow: hidden`. There is no element that spans the whole filled extent — so there is nothing to draw ONE gradient across, and the seam-band hack was bolted on to fake continuity between independent boxes. The geometry model (`useProgressGeometry.ts` cells[]) is sound for *measurement* but the PAINT model derived from it is per-cell-rectangle, which is the architectural mismatch with "one continuous blended gradient that still reads distinct segments."

---

## Both modes

The defect is mechanism-driven, not palette-driven, so it reproduces in **both** modes:
- **Dark** (probed live): bright screen seam stripes + the dead notch are most visible (the recessed track is darkest), and the `--surface-tint-40` pending cell reads as near-white-grey. This is the captured/worst case.
- **Light**: the seam screen-band over a light recessed track brightens less dramatically but still leaves a visible hard step at each cell join (the pill caps are mode-independent), and the pending `--surface-tint-40` cell reads as a faint warm-grey slab. The dead notch is softer (the track is lighter) but the seam-into-pending still fails to bridge. Light is less alarming but the same broken model.

(The two raced screenshot attempts on :5199 captured a neighboring lane's route — the shared browser session drifted between navigate and capture. The authoritative live evidence is the computed-style/geometry probe, which read the real sectioned rail on `/feedback/progress` in dark mode; the rail-band crop of the user's ground capture is the visual.)

---

## Speedtest phase-bus consumer contract (checked before proposing the re-shape)

The re-shape must NOT break the segment-array contract:
- The truth model is the `ProgressSegment[]` array (`key/label/color/state?/weight?`) + `currentSegmentKey` + `activeProgress` (0..1). `modelValue` is explicitly NOT the truth here — `Progress.vue:71–103` *throws* on a non-zero `modelValue` to the sectioned variant, and `useProgressGeometry.aggregateValue` derives `aria-valuenow` from cumulative cell fill. Keep this prop boundary intact.
- `useProgressGeometry.ts:7–12` DELIBERATELY mirrors `TimelineSegment` (`@mkbabb/glass-ui/timeline`) so a consumer passes the SAME array to the timeline rail and the phase-bus. A re-shape must keep the `ProgressSegment` interface and the timeline-mirror contract; do not re-key segments.
- `weight` drives unequal widths (`weight / sum(weights)`); the speedtest case is the equal-share pings/jitter/download/upload (weight 1). The new paint must still honor per-segment widths.
- External consumer reach: speedtest consumes this variant (AX corpus records ../speedtest as the phase-bus consumer; the demo's caption explicitly "Mirrors the speedtest phase-bus shape"). So the re-shape is a published-surface change — segment shape + the three drive props are the frozen API.

Net: the *data/measurement* layer (`useProgressGeometry`) and the prop surface stay; only the **paint** (`ProgressSectioned.vue` template + `<style>`) re-shapes.

---

## Proposed remedy DIRECTION (gestalt, no implementation)

**One continuous gradient track that still reads distinct segments — segment color-stops with soft blends at the boundaries + an active leading-edge, replacing the per-cell-pill + screen-seam stack.**

The design diagnosis: the brief is "blended gradient with distinct segments." The current model fights it by drawing N independently-capped pills and faking continuity with a doomed overlay. The idiomatic shape is the inverse — paint ONE fill across the whole filled extent as a single `linear-gradient` whose color stops are the segment colors, with the stops placed so each segment holds its hue across its span and **blends over a short transition zone** into the next (a hard-stop pair `colorA X%, colorA Y%` keeps a segment a solid band where you want crisp identity; a soft pair `colorA Y%, colorB Z%` gives the boundary its blend). That is one gradient, zero seam overlays, no internal pill caps — distinct segments AND a continuous blend, both at once.

Directional pieces (all design-level; the wave spec details them):
1. **Collapse the paint to a single filled element** spanning the cumulative filled extent (the completed run + the active fraction), with a single `linear-gradient` built from the cells[] color/position data already computed in `useProgressGeometry`. The empty/pending remainder is the recessed track, optionally carrying faint phase-tinted ghost stops at low alpha so pending phases keep identity (fixes RC-3 without a neutral tint token).
2. **Boundary blend = gradient stops, not an overlay** — soft hard-stop stop-pairs at each segment boundary give the blend; retire `.progress-sectioned-seam` and `mix-blend-mode: screen` entirely (kills both the bright stripes and the dead notch — RC-2).
3. **One leading-edge cap only** — the pill cap belongs at the single front of the *whole* fill (the active leading edge), never at internal completed-cell boundaries (fixes RC-1). The `--spring-snappy` grow stays, but it animates the single fill front, not per-cell widths.
4. **Pending phases keep their hue** — the demo should pass each phase's real `--viz-*`/`--chart-*` color (low-alpha for pending), not `--surface-tint-40`; the component's pending recipe should render a faint phase-tinted ghost on the track rather than a flat 12% wash (RC-3). This is presets-in-consumers for the demo data + a component-recipe refinement.
5. **House idiom alignment** — the track is already a "machined recessed channel" (the rail box-shadow/inner-shadow is good and should stay); the fill should read as the glass liquid filling that channel, one continuous body, the catch-light sweep riding only the active front. The `--progress-sectioned-track`/`--cell-color`/`--cell-fill` token seam stays so consumers retint.

Keep: the `useProgressGeometry` measurement layer, the `ProgressSegment`/`TimelineSegment` mirror, the `modelValue`-refusal prop boundary, the `--spring-snappy` register, the recessed-channel rail chrome, the PRM gate. Retire: the per-cell pill-capped fill model, the `.progress-sectioned-seam` overlay + its `screen` blend, the `--surface-tint-40` demo segment color.

This is a paint re-architecture confined to `ProgressSectioned.vue` (template + `<style>`) + a one-line demo data fix; the published prop/segment API and the timeline mirror are untouched.
