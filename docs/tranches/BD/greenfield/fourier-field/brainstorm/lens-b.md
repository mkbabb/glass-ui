# FourierField — greenfield design (LENS B: cross-engine / perf-first)

> Brainstorm — Band-A viz sweep. The lens is FLAWLESS-Chrome-AND-Safari + performance.
> Judged LIVE at `/substrates/fourier-field`, BOTH modes, WebGPU canvas. Source-verified
> against HEAD before every citation.

## 0. Live verdict (what actually paints, NOT what the doc claims)

I drove the page in both modes (Chrome, WebGPU backend confirmed — `getContext('webgpu')` present on the live canvas). The honest read, default-to-broken applied:

- **Coherence — PASS, the engine is genuinely good.** A real epicycle chain renders: a dominant pink phasor circle → an amber phasor → a small tertiary → the radial arm → a comet trail tracing the partial-sum curve. The "watch it sum" reads. The math is machine-precise (`math.ts` `partialSumAt`/`positionsAt`/`dftFromPoints`, 3.04e-15 round-trip per the passd critique) and the WGSL compute kernel is a faithful transcription (`fourier-field.compute.wgsl.ts:45-61`). **The engine is FIT. This is not a rebuild.**
- **Vividness — FAIL (the binding defect).** The whole field is PASTEL and THIN. The epicycle circles are hairline-faint; the comet has a documented head-glow/halo/core/spec stack (`fourier-field.render.wgsl.ts:177-190`) but it does NOT read as a glowing comet on screen — it's a washed amber smear. In light mode the strokes nearly vanish into the cream plate; in dark mode they float as faint hairlines over a flat near-black-brown void. This is "near-invisible," not "alive, legible, beautiful."
- **Colorful ground — FAIL (the §3 systemic finding, dead-on).** The viz sits in `ShowcaseFrame tier="quiet"` (`bg-card/40`, verified `ShowcaseFrame.vue:15,43`) — a single FLAT plate. There is NO colorful field behind the glass, NO defined edge. The page body itself is a dead warm-grey (`pageBg: rgba(0,0,0,0)` → inherits the flat cream). 6 vizzes now confirm the pages are FLAT; fourier is the 7th.
- **Hue purge — PASS.** Everything is warm (pink/amber, hue ~28-40). NO teal, NO navy. `WARM_IDENTITY_PALETTE` (`constants.ts:97-102`, hue 34/70) holds; the demo reads shipped `--viz-*` tokens (`fourier-field.vue:68-72`), no demo-local teal. `proof:teal-navy-purge` T1 stays green.
- **Cursor-interaction — PARTIAL / mis-scoped.** The "interaction" that ships is a `head_t` time-SCRUB (`useFourierField.ts:113-133`) + a 2-D follow-lean (`FOLLOW_LEAN`, `constants.ts:56`) — the cursor nudges the clock + pans the center. `BD.W-FOURIER-INTERACT` (read in full) correctly diagnoses that "draw-your-own-path" is VAPOR: there is NO `pointerdown→stroke→dftFromPoints→swap`. The headline interaction does not exist.

**Diagnosis in one line:** the FourierField is a *correct, fit engine* trapped behind THREE defects of register — (a) it paints PASTEL not VIVID, (b) it floats over a FLAT ground with no field, (c) its headline cursor interaction (draw-your-own) is vapor. None of these is a math or engine rebuild. This is **survival-of-the-fittest: keep the math + the compute/render twins + the substrate lifecycle BYTE-FROZEN; REFINE the paint register + the ground; BUILD the one genuinely-absent mechanism (the stroke loop) exactly as `BD.W-FOURIER-INTERACT` already specs.**

## 1. The core idea — "the living harmonic plate"

Re-frame the FourierField from a *diagram on a plate* to a **living harmonic plate**: a transmissive warm-cream glass card whose interior IS a colorful warm field (the §3 ground), with the epicycle chain rendered as a VIVID, glowing, weighty instrument over it — and the cursor as a *conductor* that can (a) scrub time with liquid inertia (shipped, KEEP) and (b) **draw a new path the chain assembles in real time** (`BD.W-FOURIER-INTERACT`, BUILD). The whole thing reads as one coherent object: a warm field, a defined edge, a glowing comet with real weight, the rotating arms catching light.

Three moves, in fitness order:

### Move 1 (REFINE — the ground) — a NEW warm-colourful primitive: `.viz-warm-field`

The §3 fold. NOT `auroraFallbackGround` (that is the Aurora's blue-cyan field-sampled ground — verified it mirrors the Aurora palette CPU-side, `auroraFallbackGround.ts:15-21`; wrong hue family, and it pulls an Aurora dependency a fourier card should not own). Instead a **new, cheap, compositor-only CSS primitive** — a warm multi-stop conic+radial mesh in the warm-amber/cream/rose band — that ANY viz card can sit over to kill the FLAT.

- **Where it lives:** a `@utility viz-warm-field` in `src/styles/` (the recipe layer alongside the existing `radial-gradient` recipes verified in `glass/material.css`, `tokens/glass-fx.css`). It is the library's warm-field IDENTITY primitive (per presets-in-consumers: the *primitive* is library identity; the vivid LIFT/teal alternative is a consumer preset).
- **What it is:** two stacked `radial-gradient`s + one slow `conic-gradient`, all hues in [20,70] (amber → rose → cream), low-chroma in light mode, lifted-chroma in dark. Pure paint, zero JS, zero GL — it costs a single composited layer. A `@media (prefers-reduced-motion: reduce)` arm freezes the slow conic drift (the drift is a `@property --viz-field-angle` lerp on a `>20s` keyframe, compositor-cheap; PRM → static angle).
- **Safari:** plain CSS gradients + `@property` angle — no `backdrop-filter:url`, no SVG goo, sRGB interpolation. WebKit-flawless by construction.
- **How fourier consumes it:** the demo `ShowcaseFrame` flips `tier="quiet"` → `tier="field"` (the field-backed mode ALREADY EXISTS, `ShowcaseFrame.vue:21,47`) and the stage div gains `.viz-warm-field`. The transmissive glass plate then reads OVER a colorful warm field with a defined edge — the §3 fold, delivered to fourier with ONE class + ONE tier flip. No new component.
- **DRY win:** because `.viz-warm-field` is a standalone `@utility`, the OTHER 6 flat vizzes adopt the SAME class — the §3 systemic finding gets ONE primitive, not 7 bespoke grounds.

### Move 2 (REFINE — the paint) — VIVID register via a DEMO preset, src/ palette BYTE-FROZEN

The faintness is an intensity/blend problem, not an engine problem (the render shader already carries `peakAlpha`/`headGlowAlpha`/`headGlowBlur`/the halo+core+spec stack — `presets.ts:30-57`, `render.wgsl.ts:177-190`). The lift is a CALIBRATION, and per presets-in-consumers it goes to the DEMO, never the src/ identity tokens:

- **The src/ `WARM_IDENTITY_PALETTE` stays byte-identical** (the F7/U5 fence). The library default is the calm warm-cream identity.
- **A demo `vivid` preset** (in the demo view's existing preset list, `fourier-field.vue:81-150`) raises the lift LEVERS the config already exposes: `intensity` (the per-layer alpha multiply, 0..2 — verified `constants.ts:76`), `trailWidth`, and a higher-chroma `--viz-fourier`-family palette resolved by the existing `palette` computed (`fourier-field.vue:196-203`, which already lifts `C: Math.max(0.14, base.C)` — push the floor + the bloom). This is the same machinery; it just turns the knobs to 11 in the demo. The "drag intensity" lever is the honest, source-existing path to vivid — no new uniform, no smuggled magic constant.
- **The boldest calibration:** lean the comet HEAD into the cartoon-shadow register (`design.md §L4/§L7` — the 1940s technicolor punch). The head-glow `core`/`spec`/`halo` already exists; the demo preset just dials `headGlowAlpha`→~1, `headGlowBlur` up, and `headDotRadius` up so the comet head reads as a glowing, weighty tip with a white specular highlight (anticipation/follow-through on the chain, squash on flick). PRM keeps the static best-frame (`frozenT`, `useFourierField.ts:106`).

### Move 3 (BUILD — the interaction) — adopt `BD.W-FOURIER-INTERACT` verbatim, perf-fenced

`BD.W-FOURIER-INTERACT` is already a correct, source-grounded spec (the live stroke-capture→arc-length-resample→`dftFromPoints`→`"drawn"`-swap loop + the transport keymap + the egg D1-purge + the numeric U3). **This greenfield does NOT re-spec it — it adopts it as Move 3 and adds the cross-engine/perf fences the lens owns:**

- **The stroke capture is event-driven, NOT a rAF** (verified the wave already mandates this — `useFourierStroke` is "a pure point accumulator," no second clock). This is the perf-correct shape: capture on `pointerdown/move/up`, resample ONCE on commit, `dftFromPoints` ONCE, swap the uniform table. Zero per-frame cost added.
- **The cap is `MAX_PHASORS` (64)** at the resample seam (the wave's F2) — so the WGSL loop bound (`compute.wgsl.ts:19,49`) and the GL twin's `GL_MAX_PHASORS` (verified `fourierFieldGLSetup.ts:30`) both stay within budget on BOTH engines. No silent truncation, no buffer-widen, 60fps preserved.
- **Cross-engine swap parity:** the `"drawn"` spectrum is CPU-minted (`dftFromPoints` runs in JS once), then fed to the SAME `getSpectrum()` re-read seam (`useFourierField.ts:41`, "re-read each frame so a source-swap reaches the buffer") that the curated shapes already use. The WGSL path uploads it to the phasor storage buffer; the GL twin CPU-steps the SAME `partialSumAt` (verified `fourierFieldGLSetup.ts:165,176`). **Twin parity is automatic** — the drawn spectrum is just another `BasisComponent[]`, and both backends already consume that shape. This is the KISS win: the live stroke needs ZERO new shader code.
- **PRM:** drawing is a deliberate gesture → still captures + commits under reduce; only the reconstruction's chain-assembly animation is PRM-gated (the existing `head_t` freeze owns it). The wave already carves this.

## 2. The mechanism (source-verified; what is FROZEN / REFINED / BUILT)

| Layer | Symbol (verified at HEAD) | Disposition |
|---|---|---|
| Math leaf | `math.ts` `partialSumAt`/`positionsAt`/`dftFromPoints`/`makeEllipticSpectrum`/`comp` | **FROZEN** (byte-identical; 3.04e-15 correct) |
| Compute kernel | `fourier-field.compute.wgsl.ts` `partialSumAt`/`epicycleChainTip`/`cs_main` | **FROZEN** (faithful transcription; U3 numeric upgrade is `W-FOURIER-INTERACT`'s F6, not this lens) |
| Render kernel | `fourier-field.render.wgsl.ts` head-glow/halo/core/spec + OKLab palette mix (`:177-190`, shared `procedural-color.wgsl.ts:19`) | **FROZEN engine** — the vivid lift is demo-preset knobs, not shader edits |
| GL twin | `fourierFieldGLSetup.ts` CPU-steps `partialSumAt` (`:165,176`), `GL_MAX_PHASORS=64` (`:30`) | **FROZEN** (twin parity real; the drawn spectrum is the same `BasisComponent[]`) |
| Composable | `useFourierField.ts` (the one `head_t` clock, `SCRUB_GAIN`, `FOLLOW_LEAN`, substrate lifecycle/pause/PRM) | **FROZEN** — `useFourierStroke` composes ALONGSIDE it at the SFC, no edit |
| Ground | NEW `@utility viz-warm-field` in `src/styles/` | **BUILD** (Move 1 — the §3 warm primitive; reused by all 7 vizzes) |
| Demo stage | `ShowcaseFrame tier` flip `quiet`→`field` (`ShowcaseFrame.vue:47`) | **REFINE** (existing tier; + `.viz-warm-field` class) |
| Demo palette | `vivid` preset on the existing preset list; `intensity`/`trailWidth`/palette-floor knobs (`constants.ts:76`, `fourier-field.vue:196-203`) | **REFINE** (presets-in-consumers; src/ frozen) |
| Stroke loop | NEW `useFourierStroke.ts` + `"drawn"` swap + `FOURIER_KEYMAP` + egg purge + numeric U3 | **BUILD = `BD.W-FOURIER-INTERACT`** (adopt verbatim; this lens adds only the cap/twin/perf fences above) |

## 3. The cross-engine (Chrome + Safari) approach — the lens's core obligation

- **The viz itself** is GPU-only (WebGPU primary, WebGL2 GLSL fallback — the §L7 arm). Safari runs the WebGL2 twin, which CPU-steps the SAME math (verified). The drawn spectrum is a CPU `BasisComponent[]` consumed identically on both → **the live stroke reconstruction paints on Safari with ZERO extra work.**
- **The warm ground** is pure CSS gradient + `@property` angle drift — no `backdrop-filter:url`, no SVG goo filter, sRGB interpolation only. WebKit-flawless. (Fourier has no meatball/blob register — the metaball law applies to the dock/blob vizzes, not here; the cross-engine obligation fourier owns is the WGSL↔GLSL twin + the CSS ground, both honored.)
- **The transmissive plate** is the shipped six-layer glass composite (the existing `ShowcaseFrame`/`Card` tier) — already Safari-proven; the field behind it is the new warm primitive.
- **PRM floors:** ground drift freezes; chain assembly seats the static `frozenT` frame; the stroke still captures (deliberate gesture). All three carved.

## 4. a11y / PRM carve

- `prefers-reduced-motion: reduce` → static warm field (no conic drift) + static best-frame chain (`frozenT`) + stroke still captures/commits but reconstructs in one frame.
- The transport keymap (`FOURIER_KEYMAP`, `W-FOURIER-INTERACT` F4) is focus-guarded to the viz host (never `document`), so digit/space keys never steal from a focused control.
- The vivid preset must hold legibility contrast on the warm field BOTH modes (the comet over the warm ground is the WCAG check; the `prefers-contrast: more` arm floors the stroke alpha UP, per `design.md §L4` cartoon-cast-as-legibility-anchor).
- WCAG-2.2.2 pause: the shipped `DockBackgroundToggle` pause seam (`fourier-field.vue:338`) is untouched.

## 5. Delta-assay → wave amendment (reconcile vs the 116 union waves)

This lens produces ONE amendment + ONE adoption, NO dup of the dot/goo vizzes:

- **AMEND `BD.W-FOURIER-INTERACT`** with the cross-engine/perf fences (the cap=`MAX_PHASORS` at resample → both WGSL `MAX_PHASORS` AND GL `GL_MAX_PHASORS` budgets honored; the drawn spectrum is the same `BasisComponent[]` both backends already consume → twin parity automatic; event-driven capture adds zero per-frame cost). These STRENGTHEN the existing wave; they do not fork it.
- **NEW micro-wave `BD.W-VIZ-WARM-FIELD`** (the §3 fold, SHARED): the `@utility viz-warm-field` warm-colourful-ground primitive + the `ShowcaseFrame tier="field"` adoption. It is the SYSTEMIC §3 wave — NOT fourier-specific — so it is authored ONCE and the 7 flat vizzes (fourier, dot-flow, concentric, blob, goo, constellation, dot-matrix) all adopt it. This explicitly does NOT duplicate any dot/goo viz behaviour — it is a ground primitive they sit OVER. (If a `BD.W-VIZ-FIELD-GROUND`-shaped wave already exists in the 116, this folds INTO it rather than adding a sibling — survival-of-the-fittest.)
- **NEW demo `vivid` preset** for fourier (presets-in-consumers; no wave needed if it rides the existing demo-preset list, else a one-line Pass-E composition note).

## 6. The gate this design must clear (the bar)

A fresh both-mode `:5199` whole-page π over the warm field, NEVER reducedMotion except the PRM arm:
1. **Vivid, not pastel:** the painted comet/chain dominant chroma exceeds a floor (born-RED on the current pastel) BOTH modes; the head-glow reads (a measurable bright core).
2. **Colorful ground, defined edge:** the stage region behind the glass samples a warm-field hue gradient (NOT a flat single color); the plate edge is defined (born-RED on `tier="quiet"`).
3. **Warm purge holds:** dominant painted hue ∈ [20,70], NO [180,270] (`proof:teal-navy-purge` T5 stays green).
4. **The live draw (rides `W-FOURIER-INTERACT`'s π):** a synthesized `pointerdown→move→up` triangle reconstructs as the user's own path; twin parity on the webkit project.
5. **Gestalt:** the viz reads as a LIVING HARMONIC PLATE — a warm field, a defined edge, a glowing weighty comet, the rotating arms catching light — judged live, default-to-broken, BOTH modes.

## 7. Fences honored

- Math/compute/render/GL/composable BYTE-FROZEN (survival-of-the-fittest: the engine is FIT).
- Vivid lift → DEMO preset; src/ `WARM_IDENTITY_PALETTE` byte-identical (presets-in-consumers, U5).
- Warm purge intact: ground + comet hues in [20,70], teal/navy band untouched.
- Cross-engine: WGSL↔GLSL twin parity automatic (drawn spectrum is the shared `BasisComponent[]`); ground is pure CSS, Safari-flawless; PRM carved 3 ways.
- KISS/DRY: the live stroke needs ZERO new shader code (reuses the `getSpectrum()` re-read seam); the warm ground is ONE `@utility` reused by 7 vizzes; no fork of `useFourierField` (compose `useFourierStroke` alongside).
- NO LEGACY: clean primitive, no migration shim, no alias.
