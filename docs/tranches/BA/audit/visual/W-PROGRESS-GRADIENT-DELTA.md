# W-PROGRESS-GRADIENT — the sectioned Progress rebuilt on a single-fill gradient (DELTA)

**Wave**: BA.W-PROGRESS-GRADIENT
**Surface**: `/feedback/progress` (the sectioned phase-bus rail — the R8-14 surface)
**Captured**: 2026-06-12, `:5199` via `tests-visual/progress-gradient.spec.ts` (chromium-headless-new, real-GPU Metal)
**Modes**: light + dark · **Viewports**: mobile 390×844, desktop 1280×800
**Baseline**: `docs/tranches/BA/audit/ground/R8-14-rail-crop.png` (the dark-mode rail band isolated — the orange/blue/purple per-cell pills, the bright screen-seam stripes, the dead notch at active→pending)

## The R8-14 mandate

> "totally broken … should be a proper blended gradient with distinct segments"

The defect was four stacked root causes (re-grounded at HEAD, §0):

| RC | mechanism (HEAD) |
|---|---|
| RC-1 | the fill was per-cell with a `--radius-pill` cap on EVERY trailing edge → hard internal steps; N pills end-to-end, no continuous fill |
| RC-2 | the seam overlay was a `clamp(0.5rem,6%,1.5rem)`-wide `mix-blend-mode: screen` band → bright vertical stripes at the boundaries; at active→pending the `screen` of a near-transparent grey contributed ≈nothing → the recessed track showed through as the dead notch |
| RC-3 | the pending cell was a flat `color-mix(--cell-color 12%, transparent)` wash of a `--surface-tint-40` neutral → the 4th phase read as a dull grey-purple slab with no hue identity |
| RC-4 | the cells were absolutely-positioned siblings with per-cell `overflow:hidden` → NO element spanned the filled extent, so the seam band was bolted on to fake continuity |

## The re-architecture (single-fill gradient paint model)

ONE `.progress-sectioned-flow` element spans the cumulative `filledExtentPct` (derived off the SAME `useProgressGeometry` `cells[]` — no geometry-shape edit, no `aggregateValue`/`ProgressSegment` change) and paints ONE `linear-gradient(90deg, …)`. Each segment's filled span (re-normalized to the filled extent) contributes a hard stop-PAIR holding its hue crisp across its core, with a short `BLEND_HALF = 3.2%` soft transition zone at each interior boundary giving the blend. The single front rounds to the ONE `--radius-pill` cap; the catch-light sweep rides only the active front. The pending remainder of the recessed track carries a faint `--cell-color` ghost at `14%` alpha (the `--progress-track-ghost` layer), so each pending phase keeps its identity. The rail routes through `--glass-bg-quiet` + a `--glass-blur-quiet` backdrop (the IG-C1 frosted glass meter register) with the recessed-channel inner-shadow groove PRESERVED. The demo `upload` segment re-points off `--surface-tint-40` → `--viz-amber` (a real fourth phase hue).

## Captured frames

| frame | file |
|---|---|
| whole page — light, desktop | `W-PROGRESS-GRADIENT-after-light-desktop.png` |
| whole page — dark, desktop | `W-PROGRESS-GRADIENT-after-dark-desktop.png` |
| whole page — light, mobile | `W-PROGRESS-GRADIENT-after-light-mobile.png` |
| whole page — dark, mobile | `W-PROGRESS-GRADIENT-after-dark-mobile.png` |
| rail isolated — light, desktop | `W-PROGRESS-GRADIENT-rail-light-desktop.png` |
| rail isolated — dark, desktop | `W-PROGRESS-GRADIENT-rail-dark-desktop.png` |
| rail isolated — light/dark, mobile | `W-PROGRESS-GRADIENT-rail-{light,dark}-mobile.png` |

## π readback verdict (the BINDING truth — 10/10 PASS)

- **(a) ONE continuous fill** — the DOM probe counts exactly ONE `.progress-sectioned-flow` paint span; ZERO `.progress-sectioned-cell` / `.progress-sectioned-fill` / `.progress-sectioned-seam` (the retired per-cell stack + seam band are GONE), not the four discrete `fillRectW` boxes the lane measured.
- **(b) no bright seam stripe** — the per-column luminance scan across the filled run shows the max local spike stays `< 60` luma of its windowed mean at all four mode×viewport captures (a `screen`-band stripe spikes far higher toward white); a monotone blend, not a brightened stripe.
- **(b) no dead notch** — the pending remainder (trailing run) carries a saturated `--viz-amber` ghost pixel (`sat > 0.06`), not the recessed-track dark; the active→pending boundary is a coloured ghost, not a void.
- **(c) distinct-yet-blended segments** — ≥2 well-separated dominant hue buckets sampled across the filled run (red/blue/violet); the blend did not wash the segments into one mush.
- **(d) the frosted glass track** — the rail resolves a real `backdrop-filter` carrying `blur(…)` (the `--glass-bg-quiet`/`--glass-blur-quiet` register), both modes.

Rail crop reads (both modes): orange (pings) → soft blend → blue (jitter) → soft blend → violet (download, active front + catch-light cap) → the amber ghost on the pending (upload) remainder over the frosted track. Distinct segments, continuous blend, one front cap, no stripe, no notch.

## proof:ba-gestalt verdict (BA inv-4)

The `/feedback/progress` sectioned rail reads as a designed glass phase-bus meter on the page — a continuous blended liquid in a frosted recessed channel with distinct, identifiable phase bands and a clean active front. **Verdict: PASS for the sectioned rail (the wave's surface).** Recorded miss (out of scope, named successor): the `determinate`/`sizes` `variant="default"` rails on the same page render flat/empty (the default/gradient-variant glass register is the booked W-SURFACE-AXIS consumer follow — `Progress.vue`/`ProgressDefault.vue` are explicitly Do-NOT-touch this wave). The sectioned rail — the R8-14 target — is fully resolved.
