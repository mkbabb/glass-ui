# BG.W-DOCK-GLYPH-RIGID — PAINT JUDGE DELTA

**Verdict: FAIL** (dual-engine, both modes)
**Judge:** non-authoring paint judge (did not build the wave).
**Route:** `/dock/overview` — the GlassDock collapse↔expand rigid-glyph series.
**Engines:** Chrome ANGLE-Metal (Apple M5 Max, Chrome 149) + WebKit 26.4 (Safari engine).
**Modes:** light + dark. **Viewport:** 1440×900 @2x (2880×1800 px).
**Date:** 2026-07-04.

---

## 1. What was captured

- **Dual-engine provenance confirmed.** Chrome leg over CDP (`GL_RENDERER = ANGLE
  (Apple, ANGLE Metal Renderer: Apple M5 Max, Unspecified Version)`); WebKit leg on
  Playwright WebKit 26.4. Safari off-screen keystone snapshots
  (`glyph-rigid-safari-{light,dark}-desktop.png`, 2880×1800, badge `ENGINE WEBKIT /
  GPU Apple GPU / MODE {LIGHT|DARK}`) confirm the route + mode inject.
- **Per-frame glyph-bbox aspect** measured by rAF-sampling the `.dock-persistent`
  `<svg>` glyph `getBoundingClientRect()` through a real hover→collapse and
  hover→expand morph on the "Collapsible (hover to expand)" demo dock — the
  authoritative geometry witness the ±5% clause demands (the DOM bbox is the exact
  number; a PNG only shows the composited pixels).

### Artefacts on disk (all `isRealPng` verified)

| Path | What |
|---|---|
| `glyph-rigid/glyph-rigid-safari-light-desktop.png` (2880×1800) | Safari full-route, LIGHT, badge-provenanced |
| `glyph-rigid/glyph-rigid-safari-dark-desktop.png` (2880×1800) | Safari full-route, DARK, badge-provenanced |
| `glyph-rigid/punch-light-01-collapsed-rest.png` | Chrome — collapsed REST = clean 1:1 circle + undistorted glyph |
| `glyph-rigid/punch-light-02-midmorph-glyph-stretched.png` | Chrome — **mid-morph PUNCH frame: home glyph stretched wide (aspect 1.49)** |
| `glyph-rigid/punch-dark-01-collapsed-rest.png` | Chrome — collapsed rest, dark |
| `glyph-rigid/punch-dark-02-midmorph-glyph-stretched.png` | Chrome — mid-morph punch glyph stretch, dark |
| `glyph-rigid/frameseries-chrome-{light,dark}.json` | Chrome rAF glyph-bbox frame-series |
| `glyph-rigid/frameseries-webkit-{light,dark}.json` | WebKit rAF glyph-bbox frame-series |

---

## 2. Criterion-by-criterion verdict

| Clause | Requirement | Measured (both engines, both modes) | Verdict |
|---|---|---|---|
| **(b) collapsed REST = 1:1 circle + undistorted glyph** | `scale:none` over the TRUE box, aspect 1.0 | Chrome: 58–59×58–59, aspect **1.0**, glyph 20×20, `border-radius 9999px`, `morphing=null`, `scale=1`. | **PASS (Chrome)** |
| **(b) settle drops residual** | residual scale only under `[data-morphing]`; clears at settle | Chrome clears cleanly. **WebKit holds `[data-morphing]` + `scale:0.196 1` (a 44×59 aspect-0.75 SLIVER) for ~800–1000 ms after collapse** before settling to the 59×59 circle. | **FAIL (WebKit settle-latency)** |
| **(b)/gate — per-frame glyph-bbox aspect ±5% of rest (mid-morph AND rest)** — the wave's own acceptance bar (§4.5 gate; IOS27-MOTION-TRUTH:381 "in ANY frame (mid-morph AND rest)") | glyph aspect ∈ [0.95, 1.05] every frame | **glyph aspect reaches 1.4884 (+48.8%)** for the entire `[data-punching]` window (~t0→107 ms, ≈ the first 6–9 morph frames), **on Chrome AND WebKit, light AND dark, collapse AND expand.** ≈10× the ±5% bar. | **FAIL (primary)** |
| **(a) rigid content over morphing plate** | content carries the per-frame inverse of the morph-axis scale | The `.dock-persistent`/`.dock-layers` counter-scale inverts **only `--dock-size-scale`** — it does NOT invert `--stretch × --dock-punch-stretch`, which the root box-scale also applies. Residual glyph scale = `(stretch × punch)` on X and `1/(stretch × punch)` on Y → aspect `(stretch×punch)²`. | **FAIL** |
| **(c) outgoing glyph fade coupled to box-travel, no >30%-travel empty pill** | not the primary defect; not separately isolated here (the punch/rest fail is decisive) | (not the gating finding) | n/a |
| **(d) hover→first-morph-paint ≤100 ms** | expand onset fast | Not the gating finding; the collapse in this demo rides the ~3.6 s patient-dwell auto-collapse (by design), and expand onset is the intent-dwell window — neither contradicts the verdict, which is decided by the glyph distortion. | n/a |

---

## 3. Root-cause math (why 1.4884 exactly)

The root box-scale (`src/styles/dock/shape.css:156-160`, horizontal
`[data-morphing]` rule) is:

```
X = --dock-size-scale × --stretch × --dock-punch-stretch
Y = 1 / (--stretch × --dock-punch-stretch)
```

The wave's content counter-scale (`shape.css:~205` new rule,
`.glass-dock[data-morphing]:not(.vertical) > .dock-persistent, …`) is:

```
content X = 1 / max(--dock-size-scale, 0.06)     content Y = 1
```

A child multiplies its parent's scale, so the **effective glyph scale** is:

```
glyph X = (--dock-size-scale × --stretch × --punch) × (1/--dock-size-scale) = --stretch × --punch
glyph Y = (1/(--stretch × --punch)) × 1                                     = 1/(--stretch × --punch)
glyph aspect = glyph X / glyph Y = (--stretch × --punch)²
```

With `--dock-punch-stretch = 1.22` (the `[data-punching]` overshoot) and `--stretch`
unset (=1): **aspect = 1.22² = 1.4884** — an exact match to the painted measure. The
counter-scale cancels the footprint factor but leaves the punch/stretch deformation
**uncompensated in BOTH axes**, so the glyph carries the full `(stretch×punch)²`
distortion. This is the scaleX-squish sliver the wave's own comment says it kills —
relocated from the full collapse into the `[data-punching]` window.

The author's comment (`shape.css`) explicitly chose not to invert
`--stretch`/`--dock-punch-stretch`, calling it "the sub-perceptual liquid
deformation the whole plate (content included) is MEANT to carry." **`1.22² =
+48.8%` is not sub-perceptual** (see `punch-light-02-midmorph-glyph-stretched.png` —
the home glyph is a visibly wide, squashed icon), and it violates the wave's own
`±5%` gate clause. A liquid PLATE squish is legitimate; a **glyph** stretched 48.8%
is exactly the rigid-content violation this wave exists to remove.

---

## 4. Why the gate is GREEN while the paint FAILS

`proof:dock` G1 is a pure **CSS source-string** check: it confirms the rule *text*
declares `scale: 1/max(--dock-size-scale,0.06)` on the content children. It never
measures the painted glyph bbox, and it has **no visibility into the
`--stretch`/`--dock-punch-stretch` residual** the same content still carries. So the
gate greens on rule-presence while the composited glyph distorts — the exact
headless-green/visually-broken gap this wave's `[paint-pending]` non-local screencast
witness was owed to close. This DELTA is that witness, and the painted truth fails.

---

## defectLocalization

- **PRIMARY — `src/styles/dock/shape.css`**, the BG.W-DOCK-GLYPH-RIGID content
  counter-scale rules (`.glass-dock[data-morphing]:not(.vertical) > .dock-persistent,
  … > .dock-layers` and the `.vertical` twin). The inverse compensates only
  `--dock-size-scale`; it must also neutralize the `--stretch × --dock-punch-stretch`
  factor that the root box-scale (`shape.css:156-164`) applies, so the glyph aspect
  stays within ±5% of 1.0 through the ENTIRE morph including the `[data-punching]`
  window. Effective residual glyph aspect must be ≈1.0, not `(stretch×punch)²`.
- **SECONDARY — WebKit settle-latency:** `[data-morphing]` + the `scale:0.196 1`
  residual persist ~800–1000 ms past collapse on WebKit, so a collapsed dock paints a
  44×59 aspect-0.75 sliver-at-rest for ~1 s before seating the circle (the settle
  ordering in `dockMorphContext.ts maybeSettleRoot`/`useDockSpring` settle timing does
  not drop the morph attrs promptly on WebKit). Chrome settles cleanly. Confirm the
  spring `onSettle`→attr-drop fires on WebKit's frame cadence.

## mustFix

1. **Neutralize the punch/stretch residual on the rigid content.** Either (i) invert
   the FULL morph-axis factor on the content — `content X = 1/(--dock-size-scale ×
   --stretch × --dock-punch-stretch)`, `content Y = --stretch × --dock-punch-stretch`
   (so the glyph reads its intrinsic 1:1 aspect while the PLATE keeps the liquid
   punch squish), OR (ii) re-express the plate morph as a clip-aperture over the
   reserved footprint with the content untransformed (spec vocab (a) alternative).
   The bar: **per-frame glyph-bbox aspect ∈ [0.95, 1.05] in EVERY frame including the
   `[data-punching]` overshoot**, both engines, both modes.
2. **Drop the morph residual promptly on WebKit** so the collapsed rest is the 59×59
   1:1 circle within one settle beat (no ~1 s frozen 44×59 aspect-0.75 sliver).
3. **Upgrade the gate to the painted measure.** `proof:dock` G1 checks rule TEXT
   only and cannot see the `(stretch×punch)²` residual — the born-RED per-frame
   glyph-bbox screencast witness (this DELTA's frame-series) must be the binding
   local-π so a re-introduction of the punch residual REDs on the number, not just
   on a missing CSS string.

## re-capture recipe (for the fix agent)

```
node scripts/verify-siblings-intact.mjs --quiet          # exit 0
npm run demo:dist:build && npm run demo:dist:serve        # BUILT bytes on :5200
# Chrome (CDP :9222) frame-series:
node docs/tranches/BG/audit/visual/glyph-rigid/capture-frameseries.mjs {light|dark}
# WebKit (Playwright) frame-series:
node docs/tranches/BG/audit/visual/glyph-rigid/capture-webkit.mjs {light|dark}
# PNG evidence (Chrome punch frame + collapsed rest):
node docs/tranches/BG/audit/visual/glyph-rigid/capture-punchframe.mjs {light|dark}
```
PASS iff every frame-series `glyphAspect ∈ [0.95, 1.05]` AND collapsed rest = aspect
1.0 with `morphing=null` on BOTH engines BOTH modes.
