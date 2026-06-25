# BD.W-HANDMARK-AUDIT — the boil natural-morphology re-authored to a REAL irregular hand-line + the demo expanded to all 7 shapes × 4 animations (NOT a rebuild — the Brush continuum is KEPT)

**Band 16 (DEMO-CHASSIS) · depends: W-GATE-TRUTH-AUDIT** — W-GATE-TRUTH-AUDIT because the EXISTING `proof:handmark` W4 morphology clause is a PRESENCE-REGEX (`/naturalUnderlinePoints/.test(geometry)` + `PERIODS_MIN..MAX` exist) that the CURRENT clean-sinusoid morphology PASSES — the exact false-green the truth-audit discipline forbids; the new clause must MEASURE the actual point-set's irregularity (a variance/autocorrelation check on the real geometry), never re-assert the symbol exists. Per `viz/page-audit/handmark.md` (the deep audit: VERDICT REAL + KISS-sound + NOT over-built; `proof:handmark` PASS, all 12 marks render, the highlighter 5 deltas live) + `viz/ADDENDUM-DEMO-CHASSIS.md §batch-4` (W-HANDMARK-AUDIT = re-author the boil morphology + expand the demo).

> **STATUS: IMPLEMENTATION-gated.** This is the tranche-DEV PLAN doc. The build re-authors ONE pure function (`naturalUnderlinePoints`, `geometry.ts:68`) + expands ONE demo file (`demo/stories/motion/handmark.vue`) + adds ONE measuring gate (`proof:handmark-audit`). It is user-gated, src-touching at implementation. **NOT a rebuild** — the Brush continuum (`brush.ts`'s 12-scalar + 4-enum + `lerpBrush`), `ink.ts`, the highlighter's five C-1 deltas, the seed reconcile, the three-underline fence, and `proof:handmark` (W1–W6) are ALL byte-untouched. This wave touches the boil centerline math + the demo coverage + a new gate — nothing else.

## The verdict the audit reached — REAL, KISS-sound, NOT over-built (the concern allayed)

The Pass-D deep audit (`viz/page-audit/handmark.md`) re-challenged the handmark facility from first principles and found it SOUND:

- **`proof:handmark` PASSES (0 violations); all 12 marks render live; zero console errors.** The Brush model (`brush.ts`) is a genuine continuum (12 scalars + 4 enums + `lerpBrush`), NOT a taxonomy of classes — `ink.ts` reads FIELDS, never an instrument name. Adding a medium IS one row. **NOT over-built** — each shape is one `switch` arm in a pure `shapeGeom` mapper; the cost of `box`/`bracket`/`strikethrough` existing is ~30 LOC total.
- **pencil · crayon · marker · highlighter · ring all read convincingly hand-made.** The highlighter's C-1 five deltas are ALL live + visually confirmed (LOW seat `y=18.6 h=26.5`, hull ribbon `fill sw=0`, non-zero taper, `stroke-linecap=square` reaches the DOM, `mix-blend-mode:multiply` un-walled — the page text reads THROUGH the band). The B-1 Range anchor is correct (3px gap below the descenders); seed determinism holds (`seed=3` vs `seed=17` distinct).

This wave therefore touches NEITHER the architecture NOR the shapes NOR the brushes — it fixes the ONE weak RENDER + the ONE demo-coverage gap the audit isolated. The two refinements are surgical, not a re-challenge of the design.

## The two defects (Pass-D code-grounded — file:line root causes)

### Defect 1 — the SOTA DEFECT: the boil natural-morphology renders as a REGULAR sinusoid (the weakest of 7 marks)

`naturalUnderlinePoints` (`geometry.ts:68-101`) — the morphology the demo bills as "the natural morphology · the masthead default voice" — renders as a REGULAR, SHALLOW, periodic wobble that reads MECHANICAL / spell-check-squiggle. The audit's measured finding: on screen "future"/"here"/"boil" read as a periodic squiggle, NOT a hand pen line; **the plain `pen` underline (pencil-boil's irregular `wobbleLinePoints`) reads MORE hand-made than `boil` — the family's headline register is its weakest mark.**

The code confirms the mechanism. The body is (the relevant lines):

```ts
const periods = PERIODS_MIN + Math.floor(rng() * (PERIODS_MAX - PERIODS_MIN + 1)); // 2..4
const amp = span * NATURAL_AMP_FRAC;                                                // 0.022
const phase = rng() * Math.PI * 2;
const w1 = 0.65 + rng() * 0.35, w2 = 0.2 + rng() * 0.3;
for (let i = 0; i <= n; i++) {
    const t = i / n;
    const base = w1 * Math.sin(phase + t * Math.PI * 2 * periods)
               + w2 * Math.sin(phase * 1.7 + t * Math.PI * 2 * (periods + 1));
    const envelope = Math.sin(Math.PI * t);   // sine half-arch
    const jitter = (rng() - 0.5) * 0.4;       // sub-perceptual
    pts.push([x, y + amp * (base + jitter) * envelope]);
}
```

The audit's "two clean sines on an even period grid" is precisely right about the LOAD-BEARING failure even though the code superficially carries variation (a seeded phase, two harmonic weights, a per-vertex jitter):

1. **The period SPACING is strictly UNIFORM.** `t * Math.PI * 2 * periods` advances the phase at a CONSTANT rate in `t` — the humps are evenly spaced by construction. A real hand line has IRREGULAR period spacing (a long lazy stretch then a tight tremor cluster), never a metronomic grid. Seeding the period COUNT (`periods ∈ {2,3,4}`) does NOT break the spacing regularity — every hump is the same width.
2. **The amplitude is a CONSTANT `amp` modulated by a single symmetric `Math.sin(Math.PI·t)` half-arch** — the wobble swells to mid then tapers symmetrically. A hand line has irregular amplitude (a hard press here, a light skip there), NOT a clean envelope.
3. **The `jitter` is sub-perceptual** (`±0.2 · amp ≈ ±0.0044·span`) — it dithers vertices but cannot break the periodic gestalt the two clean sines establish.
4. **NO pressure/thickness variation.** The centerline is a thin stroke; a real pen/pencil hand-line has thick-and-thin pressure (the highlighter ALREADY proves the family can do this via the vendored perfect-freehand `hull` ribbon — `freehand.ts`). The boil underline does not consume it.

The result is a "sum of two clean sines + a half-arch envelope" — the textbook mechanical-squiggle tell.

### Defect 2 — UNDER-DEMONSTRATED: the demo shows 3/7 shapes + 2/4 animations (the living-line clock is INVISIBLE)

`demo/stories/motion/handmark.vue` shows **3 of 7 shapes** (`underline` · `highlight` · `circle`) and **2 of 4 animations** (`none` · `draw-on`). NEVER shown: `strikethrough`, `box`, `bracket`, `path`, the `boil` CONTINUOUS animation, `draw-then-boil`. **The living-line `useLineBoil` frame-cycle clock — a headline capability (the whole `useHandMark` → `useLineBoil` boil engine, `composables/useHandMark.ts:126`) — is INVISIBLE on the page; only the STATIC `boil` brush morphology shows.** A reader cannot see the family at its breadth, and `box`/`bracket`/`strikethrough` have ZERO demo + the π covers only underline/highlight/circle — so a regression in those three shapes would ship SILENT (audit §5 risk #5).

## The mechanism — re-author the boil centerline + expand the demo (KEEP the continuum)

### 1. Re-author `naturalUnderlinePoints` to a REAL irregular hand-line (the SOTA fix)

Re-author the boil centerline so it reads as a hand pen line, NOT a periodic sinusoid — through the EXISTING house prng leaf (`utils/prng` `mulberry32`, already imported) + the EXISTING vendored perfect-freehand pressure core (`freehand.ts`, already vendored for the highlighter hull), **NO new dependency**. The hand-line model (the SOTA target the audit names — "mostly-straight with low-freq tremor + thick/thin pressure, NOT a periodic sinusoid"):

- **IRREGULAR period SPACING (the load-bearing fix).** Replace the uniform `t·2π·periods` phase with an IRREGULAR control-point walk: place the wobble waypoints at SEEDED-IRREGULAR `t`-positions (a seeded jittered partition of [0,1], each interval `t_{k+1}−t_k` drawn from the prng so the humps are UNEQUALLY spaced — a lazy stretch then a tight cluster), the centerline a smooth interpolation (Catmull-Rom / the pencil-boil spline already in the vendored core) through them. The hump-to-hump SPACING varies by construction — the metronomic grid is GONE. (The simplest honest form: a 1-D fractal/value-noise displacement `Σ aᵢ·noise(t·fᵢ + φᵢ)` with INCOMMENSURATE frequencies `fᵢ` + per-octave seeded phase — a non-periodic line, the standard "natural line" recipe — OR the irregular-waypoint spline. Either satisfies the gate; the spec does not over-pin the implementation, it pins the OUTPUT property: irregular spacing + irregular amplitude.)
- **IRREGULAR amplitude (drop the clean envelope floor).** Each waypoint's amplitude is independently seeded (a hard-press waypoint beside a light-skip waypoint), NOT a single `amp` scaled by one symmetric `Math.sin(Math.PI·t)`. KEEP an endpoint anchor (the ends taper to the baseline so a draw-on does not pop — the existing intent), but the BODY amplitude varies waypoint-to-waypoint.
- **PRESSURE/thickness variation via the vendored perfect-freehand core.** Route the boil underline through the SAME perfect-freehand `getStroke`/hull the highlighter consumes (`freehand.ts`) with a SEEDED pressure profile (thick-and-thin along the line — the pen "presses harder here, lighter there"), so the boil mark reads as a real ink line with weight variation, not a constant-width thin stroke. This is the audit's explicit recommendation ("the vendored perfect-freehand pressure profile + a seeded IRREGULAR period/amplitude"). The pf body is ALREADY vendored + ships with the highlighter, so this drags NO new bytes the budget doesn't already carry.
- **The seed reconcile is PRESERVED.** The morphology still seeds via the HOUSE `mulberry32` (`utils/prng`) feeding a house-derived int — `proof:handmark` W4's seed-reconcile clause (no `mulberry32` imported FROM `@mkbabb/pencil-boil`) stays GREEN by construction. Two seeds read distinct; one seed reproduces (determinism held).
- **FILTER-FREE (the C-2 fence held).** The wobble + pressure live in the CONTROL POINTS + the pf hull width, NOT a `feTurbulence` — the existing FILTER-FREE discipline is preserved.
- **`NATURAL_AMP_FRAC` / `PERIODS_MIN` / `PERIODS_MAX` may be re-tuned or superseded** (the period-COUNT constant is the regularity tell — an irregular-spacing model replaces "count" with "irregular waypoint partition"); a re-tune is a clean break, no alias (no backwards-compat dual-read).

**THE FENCE: this is the BOIL underline centerline ONLY.** The default underline keeps pencil-boil's `wobbleLinePoints` (the `natural=false` arm, byte-untouched). The other 6 shapes (`strikethrough`/`highlight`/`box`/`bracket`/`circle`/`path`) are byte-untouched. The highlighter, crayon, marker, pencil, ring brushes are byte-untouched. `brush.ts`, `ink.ts`, `texture.ts`, the `lerpBrush` continuum — byte-untouched. The re-author is ONE pure function's body.

**Export the morphology for the gate to MEASURE it.** `naturalUnderlinePoints` is module-private at HEAD. EXPORT it (or a thin `naturalUnderlineSpec(span, seed, segments)` wrapper returning the raw `[number,number][]` point-set) from `geometry.ts` so the gate can compute the variance/autocorrelation on the ACTUAL emitted points — NOT re-assert the symbol exists. (The gate may equivalently sample it through `shapeGeom("underline", {seed}, null, baselineFrac, /*natural*/true)` — the spec requires the gate read the real point-set, by whichever export.)

### 2. Expand the demo to all 7 shapes × 4 animations + the living-line clock

Expand `demo/stories/motion/handmark.vue` so the reader sees the family at its full breadth:

- **All 7 SHAPES demonstrated:** `underline` · `strikethrough` · `highlight` · `circle` · `box` · `bracket` · `path` (the 4 currently-missing — strike/box/bracket/path — each gets a live `<HandMark shape="…">` over a real word/datum). This also closes the audit §5 risk: `box`/`bracket`/`strikethrough` gain a live render (no longer silent-regression-prone).
- **All 4 ANIMATIONS demonstrated:** `none` (static) · `draw-on` (the imperative `play()`, already shown) · `boil` (the CONTINUOUS living-line clock — the `useLineBoil` frame-cycle, currently INVISIBLE) · `draw-then-boil` (draw-on then settle into the gentle boil). The boil-continuous + draw-then-boil arms make the `useHandMark` → `useLineBoil` boil engine VISIBLE — the headline living-line capability the page never showed.
- **The brush continuum row STAYS** (pen/boil/pencil/crayon/marker/highlighter/ring distinct voices — the existing W5 demonstration, KEPT). The boil row now reads as a real hand line (the re-authored morphology), so the "distinct voices" demonstration is STRONGER.
- **Demo discipline:** compose the SHIPPED `<HandMark>` primitive (no demo-local fork); the boil-continuous arm respects PRM (the `useLineBoil` clock early-returns under reduced motion — the existing substrate discipline, NOT a demo re-implementation). The section affordance re-key (`label=` → `heading=` on the 6 eyebrow-only sections) FOLDS into W-PAGE-CHASSIS (the systemic `label→heading` arm), NOT this wave — this wave owns the morphology + the coverage breadth.

## The gate — `proof:handmark-audit` (born-RED on the current sinusoid + 3-shape demo → GREEN; a REAL measuring gate, NOT a presence-regex)

`scripts/proof-handmark-audit.mjs`, `tags: ["local","ci"]` (the source-structure + geometry-measurement arm; the binding PAINT is the π). The detector IMPORTS the real geometry function (or samples it through `shapeGeom`), MEASURES the emitted point-set, and parses the demo's actual mark coverage — it NEVER round-trips a symbol-presence regex (the W4 false-green class this gate exists to fix). It exports a pure detector for the self-test bites.

- **A1 — the boil point-set has IRREGULAR PERIOD SPACING (a clean sinusoid REDs).** Sample `naturalUnderlinePoints` (the real export) over ≥3 seeds at a fixed span/segments; for EACH, compute the centerline's y-displacement series and locate its zero-crossings / local extrema. Assert the inter-extremum SPACING is IRREGULAR — `stdev(spacing) / mean(spacing) ≥ IRREGULARITY_FLOOR` (a coefficient-of-variation bar, e.g. ≥ 0.18) — a strictly periodic sinusoid has CV ≈ 0 and REDs. AND an AUTOCORRELATION check: the y-series' autocorrelation must NOT exhibit a sharp periodic peak (`max autocorr at any lag > 0` below a `PERIODIC_PEAK_CEIL`, e.g. ≤ 0.6 — a clean sine self-correlates near 1.0 at its period lag and REDs). `facts.boilSpacing` records the per-seed CV + the autocorr peak. **The current `t·2π·periods` sinusoid REDs on BOTH measures by construction (born-RED).**
- **A2 — the boil amplitude is IRREGULAR (the clean-envelope floor REDs).** Over the same sampled point-sets, assert the per-extremum amplitude (the |y-displacement| at each local extremum) is NON-UNIFORM — `stdev(extremumAmp) / mean(extremumAmp) ≥ AMP_IRREGULARITY_FLOOR` (e.g. ≥ 0.20) — a single `amp · Math.sin(Math.PI·t)` half-arch produces a smooth symmetric amplitude profile with low CV across the body extrema and REDs. `facts.boilAmplitude` records the per-seed amplitude CV.
- **A3 — pressure/thickness variation is present (the constant-width thin stroke REDs).** The boil mark's emitted stroke carries WIDTH variation — either the pf hull ribbon (a `fill` width-varying body, the highlighter's `ribbon:'hull'` precedent) consumed for the boil underline, OR a per-vertex pressure/width array fed to the renderer. Assert a non-constant width source reaches the boil emit (the variance of the width series > 0). `facts.boilPressure` records the width-variation presence. A constant-width thin stroke REDs.
- **A4 — determinism + the seed reconcile HOLD (no regression).** Two seeds produce DISTINCT point-sets (`seed=3` ≠ `seed=17`, a y-range or pointwise diff); the SAME seed reproduces EXACTLY (byte-equal point-set on re-eval). AND the family imports `mulberry32` from the HOUSE leaf (`utils/prng`), NEVER from `@mkbabb/pencil-boil` (the [S2] seed-reconcile — `proof:handmark` W4's fence, re-asserted here so the re-author cannot drift it). `facts.boilSeed` records the distinct-seed + reproduce + house-source checks. A non-deterministic morphology / a pencil-boil `mulberry32` import REDs.
- **A5 — the demo renders ≥ 7 distinct SHAPES.** Parse `demo/stories/motion/handmark.vue` for the live `<HandMark>` instances + their `shape=` (default = `underline`); assert ≥ 7 DISTINCT shape values appear across the page (`underline` · `strikethrough` · `highlight` · `circle` · `box` · `bracket` · `path`). The 4 currently-missing shapes must land. `facts.demoShapes` records the distinct shape set. **The current 3-shape demo (`underline`/`highlight`/`circle`) REDs (born-RED).**
- **A6 — the demo demonstrates ≥ 4 distinct ANIMATIONS incl. the living-line boil clock.** Assert ≥ 4 DISTINCT `animation=` values appear (`none` (the default/unset) · `draw-on` · `boil` · `draw-then-boil`) — the `boil` CONTINUOUS + `draw-then-boil` arms must land (the `useLineBoil` living-line clock VISIBLE). `facts.demoAnimations` records the distinct animation set. The current 2-animation demo (`none`/`draw-on`) REDs.
- **A7 — the continuum + the other 6 shapes are BYTE-UNTOUCHED (the no-rebuild fence).** Assert `brush.ts`, `ink.ts`, `texture.ts`, and the `natural=false` `wobbleLinePoints` underline arm are byte-unchanged from HEAD (a content-hash snapshot of the brush continuum + ink emit, the `proof:metal-shimmer` byte-fence precedent); the re-author touches ONLY `naturalUnderlinePoints`'s body + its export. `facts.continuumFence` records the byte-fence. A change to `brush.ts`/`ink.ts`/`lerpBrush`/the highlighter preset REDs (this is a refinement, not a rebuild).

**Self-test bites (each planted defect MUST red — the detector is pure + invoked over synthetic inputs):**
- (a) a synthetic point-set = a clean `amp·sin(2π·periods·t)` sinusoid → A1 RED (CV ≈ 0 + autocorr peak ≈ 1.0 — the false-green the current code would sail past a presence-regex).
- (b) a point-set with irregular spacing but a clean `sin(π·t)` amplitude envelope → A2 RED (the amplitude-CV bite).
- (c) a constant-width thin-stroke boil emit (no hull, no pressure array) → A3 RED.
- (d) a non-deterministic morphology (a `Math.random()` displacement) / a `mulberry32` imported from `@mkbabb/pencil-boil` → A4 RED.
- (e) a 3-shape demo fixture (`underline`/`highlight`/`circle` only) → A5 RED.
- (f) a 2-animation demo fixture (`none`/`draw-on` only) → A6 RED.
- (g) a mutated `brush.ts`/`ink.ts` hash → A7 RED (the no-rebuild fence bite).

**What reds on the pre-fix tree (born-RED by construction):** A1 (the current `t·2π·periods` sinusoid has CV ≈ 0 + a sharp autocorr period-peak), A2 (the `amp·sin(π·t)` envelope gives uniform-amplitude body extrema), A3 (the boil underline is a constant-width thin stroke — no pf hull, no pressure), A5 (3 shapes), A6 (2 animations). A4 + A7 are GREEN on HEAD (determinism + the continuum already hold) and must STAY green (the no-regression / no-rebuild arms). GREEN only after the irregular hand-line morphology + the pressure ribbon + the expanded demo land.

**Why a NEW gate, not an extend-in-place of `proof:handmark` W4.** `proof:handmark` W4 is a PRESENCE-REGEX (`/naturalUnderlinePoints/.test(geometry)` + the constants exist) that the CURRENT sinusoid PASSES — extending it in place risks the same false-green shape. `proof:handmark-audit` is the MEASURING twin: it imports + EVALUATES the geometry, computes the irregularity statistics on the real emitted points, and parses the real demo coverage. `proof:handmark` (W1–W6) stays GREEN UNCHANGED (the family ships, the fold is clean, the highlighter deltas live, the seed reconcile holds, the voices differ, the three-underline fence holds) — this gate ADDS the render-quality + coverage teeth W4 cannot carry.

## The binding π — `tests-visual/handmark-audit.spec.ts` (the painted-truth readback the gate cannot see)

The painted readback, BOTH modes, over the page's paper-grain backdrop, served at `:5199`, NEVER `reducedMotion` (except the PRM arm):

- **THE BOIL MARK READS HAND-MADE (the SOTA fix, the binding gestalt).** The re-authored boil underline over "future"/"here" reads as a real hand pen line — mostly-straight with irregular low-freq tremor + thick/thin pressure — NOT a periodic spell-check squiggle. The π captures the boil mark's rendered path geometry + width profile and asserts the irregular-spacing + amplitude-variation + width-variation the gate measures are VISIBLE in the painted SVG (the gate measures the point-set; the π measures the painted stroke — the cardinal-lesson split).
- **ALL 7 SHAPES PAINT.** Each of the 7 shapes renders a live mark over its word/datum (path counts + bboxes sane); the 4 newly-added shapes (strike/box/bracket/path) paint correctly. The box/bracket/strikethrough regression-risk (audit §5 #5) is now π-covered.
- **THE LIVING-LINE BOIL CLOCK RUNS.** The `boil`-continuous + `draw-then-boil` arms show the `useLineBoil` frame-cycle ANIMATING (a multi-frame capture proving the centerline morphs over time — the headline living-line capability VISIBLE), and the draw-then-boil arm draws-then-settles.
- **PRM single-paint:** under `prefers-reduced-motion: reduce`, the boil clock early-returns (the static fully-formed mark, no frame-cycle) — the substrate-PRM discipline inherited (`useLineBoil.start()` early-returns under reduce).

## The gestalt row

**Union-roster surface: `handmark` (the hand-voice mark family — over the paper-grain).** The verdict requirement: a FRESH whole-page both-mode `:5199` capture, NEVER `reducedMotion`, surface-hash freshness floor. The gestalt judgement: every mark reads HAND-made (the boil mark NO LONGER the weak mechanical squiggle — it reads as a real pen line, the strongest-mark bar the highlighter set is now met by the boil register too), the 7 shapes + 4 animations are all VISIBLE on the page (the family at its breadth), and the living-line clock animates. Born-FAIL on HEAD for the boil-mechanical-read + the under-demo (3/7 shapes); GREEN at its OWN close; W-REFLECT re-confirms on fresh pixels. Wired into the union roster by W-GESTALT-WIRE.

## Fences

- **NOT a rebuild — the Brush continuum is KEPT (the #1 fence).** `brush.ts` (12 scalars + 4 enums + `lerpBrush`), `ink.ts`, `texture.ts`, the highlighter's five C-1 deltas, the seed reconcile, the three-underline fence, and `proof:handmark` (W1–W6) are ALL byte-untouched (A7). This wave re-authors ONE pure function's body + expands ONE demo + adds ONE gate. A change to the continuum / the highlighter / the other 6 shapes REDs (A7).
- **The boil centerline ONLY — the default underline + the other 6 shapes are untouched.** The `natural=false` `wobbleLinePoints` underline, `strikethrough`/`highlight`/`box`/`bracket`/`circle`/`path`, and the crayon/marker/pencil/ring brushes are byte-untouched. The re-author is `naturalUnderlinePoints`'s body (+ its export for the gate).
- **NO new dependency.** The irregular hand-line rides the EXISTING house `mulberry32` (`utils/prng`) + the EXISTING vendored perfect-freehand core (`freehand.ts`, already shipping with the highlighter). No `@mkbabb/pencil-boil` `mulberry32` import (A4 — the [S2] seed reconcile). FILTER-FREE (the wobble + pressure in the control points + the pf hull, never a `feTurbulence`).
- **The gate MEASURES, never presence-regexes (the W-GATE-TRUTH-AUDIT discipline).** `proof:handmark-audit` imports + evaluates the real geometry and computes the variance/autocorrelation on the actual emitted points (A1/A2/A3) — a `/naturalUnderlinePoints/.test()` symbol-presence round-trip is the false-green this gate exists to kill (the current sinusoid PASSES W4's presence-regex; it must RED A1). The clean-sinusoid self-test bite (a) is the load-bearing demonstration.
- **The demo composes the SHIPPED primitive (no demo-local fork).** The expanded coverage uses `<HandMark>` directly; the boil-continuous arm respects the `useLineBoil` PRM early-return (the substrate discipline, not a re-implementation).
- **The `label→heading` section re-key is W-PAGE-CHASSIS's (not this wave).** The 6 eyebrow-only sections + the systemic duplicate-header are the chassis arm; this wave owns the morphology + the shape/animation coverage breadth.
- **Determinism is absolute.** Two seeds distinct, one seed reproduces (A4) — the morphology re-author cannot become non-deterministic (no `Math.random()`, no clock-seeded noise; the boil ANIMATION clock is `useLineBoil`'s frame-cycle, distinct from the deterministic centerline morphology).

## Disposition links

- **`viz/page-audit/handmark.md` (VERDICT: REAL + KISS-sound + NOT over-built; 2 real refinements — the boil sinusoid SOTA-defect + the under-demo)** → BUILT (the spec). The over-built concern is ALLAYED (the continuum is kept, A7 fences it); the SOTA defect → §1/A1–A3 + the π; the under-demo → §2/A5–A6 + the π. CLOSED at the spec level.
- **`viz/page-audit/handmark.md §5 table` (defect #1 the boil sinusoid `geometry.ts:68-101`; defect #2 the under-demo `handmark.vue`; risk #5 box/bracket/strikethrough silent-regression)** → defect #1 = §1 + A1–A3; defect #2 = §2 + A5–A6; risk #5 = the 4 new shapes (A5) + the π shape coverage. CLOSED.
- **`viz/ADDENDUM-DEMO-CHASSIS.md §batch-4` (W-HANDMARK-AUDIT = re-author the boil morphology to a REAL irregular hand-line + expand to all 7 shapes × 4 animations; NOT a rebuild)** → every directive is a clause: re-author → §1; all 7 shapes → A5; 4 animations → A6; NOT a rebuild → A7. CLOSED.
- **`proof:handmark` W4 (the presence-regex that the current sinusoid passes)** → the false-green motivating the MEASURING gate; `proof:handmark` stays GREEN UNCHANGED, `proof:handmark-audit` adds the irregularity/coverage teeth. DEPENDS W-GATE-TRUTH-AUDIT (the false-green discipline — the predecessor edge).
- **The morphology export + the demo expansion are IMPLEMENTATION-owed** (src-touching at build) — user-gated, but the spec names the exact function, the output properties the gate measures (irregular spacing CV + autocorr ceil + amplitude CV + width variance), and the demo coverage targets (≥7 shapes, ≥4 animations).
