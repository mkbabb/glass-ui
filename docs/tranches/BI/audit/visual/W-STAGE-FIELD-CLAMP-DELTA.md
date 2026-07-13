# W-STAGE-FIELD-CLAMP — DELTA (the DockStage field clamps to the viewport)

**PERF-3 / FAM-5.** The `/dock/overview` DockStage aurora field was sized to the full
scroll column, over-provisioning the WebGL backing store ~3.9×. It now clamps to the
viewport. Owner: the demo DockStage chassis (`demo/stories/dock/DockStage.vue`) — a
demo-chassis sizing fix, NOT a library `<Aurora>` change (the library aurora already
clamps DPR to 1.5×).

## Mechanism

- The `<Aurora>` host (`.dock-stage-field`) is `position: sticky; top: 0; height: 100dvh`
  inside an absolute `.dock-stage-field-track` (`inset: 0`, zero flow space). The Aurora
  ResizeObserver measures the sticky host = the viewport, so the backing store is sized to
  the viewport; the offscreen scroll column is never rasterized. The field pins to the
  viewport as the page scrolls (always painted).
- `.dock-stage` clips with `overflow: clip` (NOT `hidden`): `hidden` would establish a
  scroll container and CONFINE the sticky pin to the stage box (freezing it); `clip` clips
  the rounded corners identically without a scroll container, so the field sticks relative
  to the outer `<main>` scroller.
- The DPR clamp (`resolveAuroraWashDpr` = 1.5×, sub-2×) rides through the library aurora
  unchanged. `preserveDrawingBuffer: true` KEPT (needed for the W-DOCK-LUMA-SHARE shared
  luminance observer readback, NOT the render).

## Live measurement — `/dock/overview`, chromium-headless-new, Metal, 1280×800

| metric | HEAD (full column) | fixed (viewport clamp) |
|---|---|---|
| field CSS height | 3629px (= the scroll column) | **800px** (= the viewport / 100dvh) |
| field CSS box | 1128 × 3629 | **1128 × 800** |
| stage column height | 3629px | 3629px (unchanged) |
| field `position` | `absolute` | **`sticky`** |
| implied backing @ washDpr 1.5 | 1692 × 5444 = **9.21MP** | 1692 × 1200 = **2.03MP** |
| implied backing @ dpr 1 (headless) | 1128 × 3629 = 4.09MP | 1128 × 800 = 0.90MP |

The field height clamps 3629px → 800px (4.5×); the implied backing store drops
9.21MP → 2.03MP at the wash DPR (matching the planner's measured 9.68MP → ~2.46MP class,
the small delta being window/width variance). The field stays visible under scroll (the
sticky pin: after scrolling 55% into the column the field top ≤ 0.5·viewport, bottom > 0).

## Gates / π

- **`proof:stage-field-clamp`** (NEW, source arm `local`,`ci`) — SF1 viewport-clamped +
  SF2 sticky+clip + SF3 sub-2× DPR + 6-bite self-test + π-spec-wired. **5/5 GREEN**
  (born-RED at HEAD: SF1 full-column + SF2 absolute).
- **`tests-visual/stage-field-clamp.spec.ts`** (NEW, LOCAL real-GPU) — 4/4 GREEN on Metal
  (both modes × {clamp, visible-under-scroll}); also 4/4 on the coarse-touch 390×844
  project. **Born-RED demonstrated**: against the HEAD DockStage the clamp arm FAILS both
  modes ("field position is `absolute`, not sticky").
- Sibling gates unbroken: `proof:stage` 6/6 (W3 DockStage still composes `<Aurora>`, no
  `bg-card/40`), `proof:adaptive-reconcile` A4 GREEN (auroraRef + scoped `:background-canvas`
  slot preserved).

## Obligations booked

- **SAF-1 (device run):** the frame-timing on real Metal WebKit under the 12 blur
  samplings (the UF-C3 Safari-compositor amplification the measurement named — headless
  Chrome is VSync-locked and hides the fill). `dis:safari-metal-verify` seam, shared with
  W-DOCK-LUMA-SHARE.
- Rides the W-PI-IN-CLOSE battery + the W-GESTALT-LEDGER-FILE dock verdict.
