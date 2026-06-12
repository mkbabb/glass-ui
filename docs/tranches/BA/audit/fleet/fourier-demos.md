# Lane: fourier-demos (R8-10, the fourier half)

The user's words (R8-10): "The fourier field component needs better demos, a configurator, and
more options thereof. For more robust, beautiful, and interesting procedural fourier animations of
both epicycles AND summed harmonics, like within fourier-analysis's web demo."

Evidence: `fourier-story-dark.png` (the live `/substrates/fourier-field` story, dark) confirms the
read decisively — the entire page is THREE static `<ShowcaseFrame>` panels of the SAME ambient
recessive curve at two baked presets + a color-swatch row. NO configurator, NO play/scrub, NO
harmonic-count / epicycle-count axis, NO summed-harmonic (partial-sum) demonstration, NO shape
input. The component renders only its background-chrome face; the demo has nothing to drive.

## Inventory — current FourierField API vs the fourier-analysis web reference

### glass-ui FourierField at HEAD (`src/components/custom/fourier-field/`)

PROPS (`FourierField.vue:41-65`, `index.ts:22-36`): `variant: "hero"|"final"`, `color`,
`colorResolver` (required), `seed`, `freeze`, `intensity` (clamped [0,2]). That is the WHOLE knob
surface — six props, two baked preset bundles in `presets.ts`. The component is a RECESSIVE
generative background (a seeded elliptic spectrum via `makeEllipticSpectrum`, NOT a user-drivable
visualization).

MATH (`math.ts`): the leaf is actually RICH and already ships the reference's core operators —
`positionsAt` (the epicycle chain), `dftFromPoints` (the FORWARD DFT — "any point set drives it: a
glyph outline, a hand-traced path"), `makeEllipticSpectrum`. The forward DFT is exported on the
`/fourier-math` subpath but NO demo or component surface CONSUMES it — it is substrate without a
consumer face. `evaluateFourier`-equivalent partial-sum summation is NOT exposed (the field always
draws the FULL spectrum; there is no "N-of-K terms" partial sum, which is the reference's headline
teaching axis).

DEMO (`demo/stories/substrates/fourier-field.vue`): 3 sections — two-preset grid, color-swatch
row, freeze panel. Read-only. No controls.

### fourier-analysis/web reference (`~/Programming/fourier-analysis/web/src`)

The reference is a FULL interactive visualizer. The facilities the glass-ui field has NO demo for:

| reference facility | source | glass-ui has? |
|---|---|---|
| **maxCircles / harmonic-count slider** (`N` epicycles drawn) | `BasisCanvas.vue:47` `maxCircles=80` | NO — fixed by preset |
| **summed-harmonic partial sums** (`N`-of-`K` terms; the curve REBUILDS as N grows) | `evaluators.ts evaluateFourier(.., maxTerms)`, `BasisCanvas drawMultiBasesFrame` partial_sums | NO — always full spectrum |
| **play / pause / scrub / speed** | `AnimationControls.vue` (a `<GlassDock>` w/ play btn, `GlassTimeline` scrubber, `SpeedSelect`, easing picker) | NO — autonomous clock only, no controls |
| **easing picker** on the global `t` | `EasingPicker.vue`, `animation.ts easedT` | NO |
| **ghost source-path overlay** + **tip dot** + **hover-to-golden** | `canvas-drawing.ts drawGhostPath/drawTipDot`, `useCanvasHover` | partial (tip dot yes; ghost no — by design, README §diverged) |
| **multi-basis mode** (Fourier ∥ Chebyshev ∥ Legendre summed) | `bases.ts evaluateBasis`, `BasisSelector.vue` | NO (the glass-ui `--viz-chebyshev/-legendre` tokens EXIST but no basis demo) |
| **shape → DFT input** (SVG glyph / contour / image → spectrum) | `svg-fourier.ts`, `ContourEditorCanvas`, `FourierMorphDemo` (sun↔moon) | NO consumer (the `dftFromPoints` math leaf is unused) |
| **harmonic-level grid** (per-N preview thumbnails, click to set) | `HarmonicLevelGrid.vue` | NO |
| **morph between two spectra** at low harmonics | `FourierMorphDemo.vue`, `useFourierMorph` | NO |
| **export frame** (PNG capture) | `BasisCanvas.exportFrame` | partial (`freeze` exists, no download) |

The brand tie-in already exists: the reference's `VIZ_COLORS.{fourier,chebyshev,legendre}` map
1:1 onto glass-ui's `--viz-fourier`/`--viz-chebyshev`/`--viz-legendre` tokens (the house 13-stop
section ramp). The "summed harmonics" axis is the reference's single most beautiful teaching idiom
(the curve assembling itself term by term) and the glass-ui field has zero demonstration of it.

## Findings

### BA-FOUR-1 (S1) — the FourierField demo has NO configurator and NO drivable options
The `/substrates/fourier-field` story is 3 read-only ShowcaseFrames over two baked presets; the
ONLY axis a user can touch is the color swatch. The component itself exposes no interactive seam
(no play, no N-slider, no epicycle toggle), so the demo CANNOT demonstrate any of the field's range.
Root cause: design — `FourierField` was authored as a recessive page-background primitive (the
Aurora/GooBlob sibling), so its prop surface is loudness/seed/color only; there is no
demo-driving control axis because the component has none to drive.
Remedy DIRECTION: do NOT bolt a configurator onto the ambient background — split the demo into
TWO registers (the house already has this split in the Aurora studio): (a) the AMBIENT face stays
the recessive background showcase; (b) add a FOREGROUND interactive "Fourier studio" demo — a
`<Configurator>`-driven (inherit the AZ.W-HIERARCHY vocabulary) controls column over a foreground
Canvas2D stage that demonstrates the epicycle chain AND the summed-harmonic assembly. The studio is
the demo's center of gravity; presets seed it, not replace it.

### BA-FOUR-2 (S1) — no summed-harmonic (partial-sum) demonstration; the headline reference idiom is absent
The field always paints the FULL spectrum. The reference's signature beauty — the curve REBUILDING
term by term as `N` grows (1 ellipse → many epicycles → the fully-resolved shape) — is the explicit
ask ("summed harmonics, like within fourier-analysis's web demo") and there is no surface for it.
Root cause: `math.ts` ships `positionsAt(components, t, maxCircles?)` and the README documents the
truncation arg, but no demo varies `maxCircles`; `evaluateFourier(.., maxTerms)` partial summation
is not even exported.
Remedy DIRECTION: expose an `N` (active-harmonic-count) axis on the studio — a slider 1..K that
truncates the drawn spectrum AND drives a "partial sum" curve that visibly assembles. Pair it with a
per-N thumbnail strip (the reference `HarmonicLevelGrid` idiom, re-expressed via the glass-ui
`<MetricCell>`/`<ToggleChip>` + a `FadingScrollList` once that lands — see R8-8 lane) so a user
clicks N=1, N=4, N=20 and watches the curve resolve. The `maxTerms` partial-sum evaluator is the
one math addition (it is `evaluateFourier` truncated — already half-present as `positionsAt`'s
`maxCircles`).

### BA-FOUR-3 (S2) — the epicycle/harmonic-sum dual register is collapsed into one preset axis
The user names TWO distinct animations: "procedural epicycles AND summed harmonics." The current
`variant: hero|final` conflates these onto ONE enum (`hero` = epicycles-on-fewer-harmonics,
`final` = epicycles-off-denser) — they are not separable, and neither is the reference's true
"watch it sum" animation. Root cause: `presets.ts` bundles epicycle visibility + harmonic count +
loudness into a single 2-value `variant` — a bundle, not orthogonal axes.
Remedy DIRECTION: in the STUDIO, make the two registers orthogonal toggles, not a fused enum: an
"epicycles" visibility/count axis (the rotating chained circles) AND a "harmonic sum" N axis (the
assembling curve) that compose freely. The ambient `<FourierField variant>` bundle stays as-is for
the background face (clean break is NOT needed there — the ambient bundle is correct for a
background); the orthogonality lives in the studio's configurator, not the primitive's prop enum.

### BA-FOUR-4 (S2) — the forward-DFT shape-input facility ships as math substrate with zero consumer face
`dftFromPoints` (the forward transform: "a glyph outline, a hand-traced path, a digitized
signature" per the math.ts doc) is exported on `/fourier-math` but NOTHING consumes it — it is a
substrate-without-consumer-binary violation of the J-invariant 10 / L-invariant 8 the house
enforces elsewhere. The reference's most memorable demos (the sun↔moon morph, an uploaded contour
becoming epicycles) all ride this transform.
Root cause: `index.ts:8` exports `dftFromPoints` with no demo or component binding it.
Remedy DIRECTION: give the forward DFT a consumer in the studio — a curated "trace a shape" demo
(a built-in glyph/path set — e.g. the ℱ wordmark, a heart, a star — fed through `dftFromPoints` to
produce a SPECTRUM the same engine reconstructs). This is the brand tie-in done right: the ℱ
wordmark literally drawn by its own Fourier epicycles. Do NOT build the full image-upload/contour
pipeline (over-scope for a demo) — a small curated path library is the ≥2-consumer floor that
legitimizes the exported transform.

### BA-FOUR-5 (S2) — no playback / scrub / speed control; the field is a non-interruptible autonomous clock
The reference drives `t` through a play/pause + scrubber + speed-select + easing picker (the
`AnimationControls` dock). The glass-ui field's `t` is `(now / durationMs) % 1` — a fixed
autonomous loop with no user control; you cannot pause it at a frame, scrub to a position, or
change speed. For an AMBIENT background this is correct; for a DEMO it leaves the user unable to
inspect the construction.
Root cause: `FourierField.vue:245-248` derives `t` purely from frame time; there is no injected
clock seam.
Remedy DIRECTION: the studio drives its foreground stage off a controllable clock (the house
already owns the substrate — `useScrollProgress`/`useSpring`/`SpringProgress` + the dock
`AnimationControls`-shaped pattern the reference uses verbatim is a `<GlassDock>` with a play
button + `<GlassTimeline>` scrubber + a speed `<Select>`). Reuse the dock + timeline primitives
(GlassDock, the play-control — note R8-17 flags the reference's play button as illegible, so adopt
the FIXED glass-ui play control, not the rainbow blob); do not hand-roll a clock. The ambient
`<FourierField>` keeps its autonomous loop; the studio binds the controllable one.

### BA-FOUR-6 (S3) — R8-10 padding: the HERO/FINAL figcaptions crowd the ShowcaseFrame bottom
The grounded `R8-10-padding-fourier-demos.png` shows "HERO — EPICYCLES ON" / "FINAL — DENSER,
EPICYCLES OFF" captions hard against the card bottom edge. Root cause:
`demo/stories/substrates/fourier-field.vue:36` the grid `<ShowcaseFrame pad="none">` zeroes the pad
and the `<figcaption>` sits flush under the `aspect-[4/3]` canvas with only a `gap-2`, so on the
recessive dark field the caption reads as cramped. This is the demo-wide bottom-padding cluster
R8-10 also names ("audit for all areas like this").
Remedy DIRECTION: this is a cross-cutting demo-chassis fix (shared with the demo-affordances
lane) — restore a bottom pad rung on the figure/caption block (the `<ShowcaseFrame>` pad knob or a
`<StorySection>` bottom-pad token), not a per-site magic number.

## Proposed demo suite + configurator design (wave cadence — specs only, no impl)

The synthesis owes a SINGLE coherent "FourierField studio" wave plus the demo-chassis padding fix.
A suggested wave shape (the BA tranche author sizes/sequences):

- **W-FOURIER-STUDIO** (S1, the headline): the foreground interactive demo. A `<Configurator>`
  controls column (inheriting the AZ.W-HIERARCHY section/label/control-rhythm vocabulary — the
  studios INHERIT it, no re-author) over a foreground Canvas2D stage. Axes, all orthogonal:
  (1) **harmonic count N** — a slider 1..K truncating the spectrum, driving the assembling
  partial-sum curve (BA-FOUR-2); (2) **epicycles** — visibility + draw-count of the rotating
  chain (BA-FOUR-3); (3) **playback** — a `<GlassDock>` + play-control + `<GlassTimeline>` scrubber
  + speed select + easing (BA-FOUR-5, reuse the FIXED glass-ui play control per R8-17); (4) **shape
  source** — a curated path library (ℱ wordmark / heart / star) fed through `dftFromPoints`
  (BA-FOUR-4); (5) **color** — the existing injected-resolver swatch, brand-keyed to
  `--viz-fourier/-chebyshev/-legendre`. PRESETS (configurator preset row): "Ambient ellipse"
  (today's hero), "Dense reconstruction" (today's final), "Brand mark ℱ" (the wordmark trace),
  "Summing harmonics" (the term-by-term assembly), each a named editable baseline
  (`cloneMode="per-preset"`, the Aurora studio idiom).
- **W-FOURIER-AMBIENT** (S3, light touch): the existing `/substrates/fourier-field` story stays the
  recessive background showcase but de-crowds (BA-FOUR-6 padding) and gains a one-line pointer to
  the studio. The `<FourierField>` primitive's prop surface is NOT churned (its ambient bundle is
  correct); the new axes live in the studio's controls, not the primitive.
- **Math addition** (rides W-FOURIER-STUDIO): export a `partialSumAt`/`evaluateFourier(.., maxTerms)`
  truncated-summation leaf (already half-present as `positionsAt`'s `maxCircles` arg) so the
  partial-sum curve has a math home, and give `dftFromPoints` its first real consumer (closing the
  substrate-without-consumer gap, BA-FOUR-4).

Cross-lane dependencies: the per-N thumbnail strip and the preset strip both want the
FADING-SCROLL-LIST component (R8-8 lane); the play control wants the FIXED glass-ui play button
(R8-17 lane); the configurator hierarchy/occlusion refinements ride the configurator lane (R8-4).
This lane SEEDS those consumers; the author coordinates the shared primitives.

## Captures (beside this report)
- `fourier-story-dark.png` — the live `/substrates/fourier-field` story (dark) — the 3 read-only
  panels, no controls, confirming BA-FOUR-1/2/3/5.
- `fourier-story-light.png` — (navigated off to /feedback/alert when the dark class was toggled via
  the nav-wired toggle; retained as an incidental capture only — the dark capture is the binding
  evidence).
