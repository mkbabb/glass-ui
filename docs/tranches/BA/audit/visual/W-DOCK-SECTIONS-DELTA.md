<!--
  FRESHNESS (AZ-form):
    wave:        BA.W-DOCK-SECTIONS — the tripartite section dock + the divider-seam re-seat
    captured-at: 2026-06-12
    HEAD:        3686eb16 (branch tranche/BA)
    device:      Chrome-headless-new (tests-visual/playwright.config.ts), Metal ANGLE
    route:       /forms/inputs (a 3-facet route — Text/Selection/Toggles — so the rail mounts on BOTH shell docks)
    spec:        tests-visual/dock-sections.spec.ts (the binding π); proof:dock-sections (the device-free SOURCE arm)
    re-run:      `cd tests-visual && npx playwright test dock-sections.spec.ts --project=chromium-headless-new`
-->

# BA.W-DOCK-SECTIONS — π SHELL DELTA (the divider-seam re-seat, the 4th-rail re-conception)

The FOURTH rail attempt (W-RAIL-EXTEND → R4-RAIL → W-RAIL3/R6 → R8-1), re-conceived as a
TOPOLOGY decision (BA inv-6) rather than a fifth midline/edge patch. Each prior close
passed a box-inviolate / structural readback while the SEAT geometry regressed to the
shell (the rail detached/midline, the section model deleted). This wave RE-SEATS the rail
AT a named `<DockSeparator anchor>` seam, overruns BOTH dock edges, fans the chips FLUSH,
and restores the tripartite section model to BOTH shell docks WITHOUT box inflation.

## The four root causes, closed

| # | HEAD defect | the fix | witness |
|---|---|---|---|
| 1 | the section model DELETED, not re-homed (`[home] \| ‹ › \| « »`, one undifferentiated run) | `<DockSection :sections>` returns the rail-core \| section \| nav gestalt WITHOUT inflation (display:contents grouping, not a re-mounted layer group) | S1/S4 + G4 zones=`["section","nav"]` |
| 2 | the rail seats at the EDGE/MIDLINE (`inset-block-start:50%` — an explicit H1-overlap workaround #4) | re-seat at the SEPARATOR-derived `--dock-rail-seam-offset` (GlassDock measures the anchored divider) | S2 + G1 |
| 3 | the connector overruns ONE side only; the strip floats ~40px adrift | the SYMMETRIC dual-side overrun + the chips fan FLUSH (FadingScroll seam-edge seat) | S2/S3 + G2/G3 |
| 4 | SHELL-IA-N1 unresolved (which carousel survives) | one facet carousel per VISIBLE dock, seated at THAT dock's seam | G4 + the per-orientation seat |

## The binding π readback (`/forms/inputs`, both modes)

The geometry is load-bearing — the seam offset is a real measured derivation, NOT a fixed
literal. The slot's cross-axis center lands EXACTLY on the anchored separator's center.

**SIDEBAR (vertical dock — the rail is a HORIZONTAL line at the ℱ-home separator's Y):**
- `--dock-rail-seam-offset = 62px` (the measured ℱ-home separator offset within the frame).
- the slot is a horizontal line at viewport `y=78`, == the anchored separator's center `cy=78` → **G1 ≤6px ✓** (NOT the y≈290-352 midline of the HEAD measure).
- the slot spans `x=[-28,110]`, the dock `x=[12,70]` → overruns LEFT by 40px AND RIGHT by 40px → **G2 symmetric dual-side ✓**.
- the chip strip's near edge `l=70` butts the dock's right edge `r=70` exactly → **G3 FLUSH ✓** (NOT 40px adrift).
- the dock body carries `zones=["section","nav"]` → **G4 tripartite ✓**.

**BOTTOM (horizontal dock — the rail is a VERTICAL line at the nav-separator's X):**
- `--dock-rail-seam-offset = 127px`.
- the slot is a vertical line at `x=651`, == the anchored separator's center `cx=651` → **G1 ✓**.
- the slot spans `y=[614,748]`, the dock `y=[654,708]` → overruns TOP by 40px AND BOTTOM by 40px → **G2 ✓**.
- the chip strip `b=644` butts the dock top `t=654` (10px gutter) → **G3 FLUSH ✓**.
- `zones=["section","nav"]` → **G4 ✓**.

**G5 — the dock box is INVIOLATE:** hiding the rail slot and re-measuring the bottom dock
shows Δw=0, Δh=0 → the rail feeds NO size into the dock's intrinsic box (`box-inviolate.json`).
`proof:rail-extend`'s box-equality R-arm stays GREEN — the re-seat did not inflate the dock.

## Before / after

- **before** (the HEAD defect baselines): `dock-rail-seat-live-dark-full.png`, `ground/R8-01-dock-rail-misaligned-{a,b}.png`, `ground/R8-09-docks-lack-sections.png` (the detached/midline rail + the section-less dock body).
- **after** (this wave):
  - `dock-sections/after-bottom-seam-flush.png` — the bottom dock: the vertical seam hairline crosses THROUGH the dock between the story-nav `>` and category `«»` groups, overruns above + below, and the three glass chips (Text/Selection/Toggles) fan FLUSH above, butted to the seam — the macOS "floating carousel" growing FROM the divider.
  - `dock-sections/after-sidebar-seam-flush.png` — the sidebar: the horizontal seam runs right from the ℱ-home separator; the chips fan flush in the trailing gutter.
  - `dock-sections/shell-{light,dark}.png` — the full-page shell captures (both modes).

## The gestalt verdict (BA inv-4 — `proof:ba-gestalt` dock surface)

**PASS.** The dock surface reads as a designed tripartite section dock with the rail seated
WHERE THE DIVIDING LINE IS. The bottom dock is the model: the vertical hairline seam is the
literal "dividing line," and the facet chips fan flush from it as one continuous primitive
(the divider IS the rail — direction (b)). The dock body groups as rail-core (home/menu) →
section (story-nav) → nav (category-jump), demarcated by the seam. (The roster verdict flip
is W-REFLECT2's job; this records the dock-surface gestalt evidence the gate reads.)

## Accepted tradeoff (recorded, not a defect)

On the SIDEBAR the ℱ-home separator sits near the very top (y=78), so its trailing-gutter
chips overlap the page breadcrumb band on a scroll-top route. This is the INHERENT
consequence of the BINDING ℱ-home anchor (the spec's §Anchor geometry decision) — the
`inset-block-start:50%` midline seat that AVOIDED this was the forbidden workaround #4. The
chips stay legible (glass plates over the page) and clickable (`pointer-events:auto`); the
collision is the bound topology's cost, not a regression. The bottom dock (the primary,
most-visible shell dock) has NO collision — the seam + chips sit cleanly above it.

## Gate state at close

- `proof:dock-sections` — **GREEN** (S1-S5; born-RED at HEAD pre-`.2`; the midline-injection self-test reds S2, proving bite).
- `proof:rail-extend` + `proof:rail3` — **GREEN** (the box-inviolate + escape-architecture + flex-strip-cyclable R-arms survive the re-seat).
- `proof:dock-plate-clearance` + `proof:shell-hold` + `proof:dock-unify` + `proof:dock-taxonomy` + `proof:dock-rail-hairline` + `proof:dock-region-model` + `proof:dark-material` + `proof:no-gray` + `proof:fading-scroll` — **GREEN** (no inherited regression).
- `proof:gate-script-parity` — **GREEN** (the gate registered in package.json + gates.mjs).
- `typecheck` + `build` — **GREEN**.
