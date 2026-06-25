# Pass-D FIRST-PRINCIPLES deep-challenge — CONCENTRIC · PAPER-GRID · the shared FIELD ENGINE

Branch `prototype/liquid-dock`. Targets: `W-CONCENTRIC-LEVELSET` · `W-PAPERGRID-WARP` · `W-FIELD-ENGINE` · `W-WAVE-FIELD-HARNESS`.
Method: read the ACTUAL shaders/composables/gates at HEAD (not the doc's claim). 5-point bar: NECESSITY · CORRECTNESS · SOTA · NOT-OVERFIT · WORKS.

Ground-truth files traced:
`src/composables/glass/webgl/shaders/flow.glsl.ts` (+ `flow.wgsl.ts`) · `paper-grid/shaders/paper-grid.glsl.ts` + `composables/paperGrid.ts` + `constants.ts` · `concentric/composables/ringField.ts` + `shaders/concentric.wgsl.ts`/`.glsl.ts` · `dot-flow-field/composables/flowField.ts` · `scripts/proof-concentric.mjs` · `scripts/proof-gpu-substrate-single.mjs` · the research/arch docs.

---

## VERDICT (hardest first)

### 1. ★ HARDEST — the round-trip gates are REGEX-PRESENCE, not numeric, AND so are their self-test bites. `W-WAVE-FIELD-HARNESS` is NECESSARY but MUST NOT clone the existing pattern.

`proof:concentric` clause C3 (`scripts/proof-concentric.mjs:255-281`) is the suite's "single-math-source round-trip." It is a pure REGEX presence check:
```js
["isoline ringIsolineInk in WGSL", () => /fn ringIsolineInk/.test(wgsl)],
["isoline ringIsolineInk in GLSL", () => /vec2 ringIsolineInk/.test(glsl)],
```
It asserts the function NAME appears in each backend string. It NEVER evaluates `sampleRingField(p,t)` in JS and compares it to a transcribed value. A backend that ships `fn sampleRingField` with `RING_GRAVITY = 8.0` instead of `9.81`, or a sign-flipped `omega`, passes green. Worse, the planted-mutation SELF-TEST bites (`:368/:395/:403`) are themselves regex-defeats — `roundTrip: { wgsl: "fn sampleRingField() {}\n// no dispersion" }` — they delete the TOKEN, never perturb a COEFFICIENT. This is the identical class to batch-A's false-green `proof:aur-kuwahara`.

So the VIZ-FINAL-ROSTER §10 "PREREQUISITE-FIRST" instinct is CORRECT and load-bearing: hoisting `valueNoise`/`curlFBM`/`gerstner` into a shared `field/` chunk under ONLY the regex gates is a genuine safety REGRESSION — a transcription drift in the hoist (a `2.02→2.0` lacunarity, a `mat2(0.8,0.6,…)` sign) would be invisible. **But the harness spec must be held to its own bar: `waveFieldMath.ts` + `proof:wave-field-single` must do a NUMERIC JS-oracle↔shader-string parse-and-eval at a fixed sample set with a tolerance, and its planted-mutation bite must flip a COEFFICIENT (`2.02→2.0`, sign-flip) and assert the numeric delta REDs — NOT delete a token.** If the executor clones the C3 regex shape, the harness is theater. (`waveFieldMath.ts` and `proof:wave-field-single` do NOT exist at HEAD — confirmed: no file, no package.json script.)

### 2. `W-FIELD-ENGINE` is a GENUINE DRY hoist (NOT a 1-consumer over-abstraction) — the noise basis is forked 6×, the wave field is trapped in 1 of 3 that need it.

The 5-point NOT-OVERFIT bar PASSES. Real fork count at HEAD: `valueNoise`/`hash21`/`potentialFBM` is independently copied across `paperGrid.ts` + `paper-grid.wgsl.ts` + `paper-grid.glsl.ts` (3) AND `flowField.ts` + `flow-field.glsl.ts` + `flow-field.compute.wgsl.ts` (3) = **6 transcription sites**, `hash21(` appears in 14 strings. The Tessendorf dispersion `ω=√(g·k)`, `g=9.81` is LIVE in concentric (`RING_GRAVITY`, `ringField.ts:66/162`) AND dot-flow (`FLOW_GRAVITY`, `flowField.ts:64/93`) under TWO names for the SAME constant. curlFBM is the shared OPERATOR but the BASIS isn't. The arch doc's fences are correct and trace-verified: the smooth `valueNoise` basis is hoisted, the painterly `gnoise`/PCG2D in `procedural-color` STAYS (NPR pigment, §3a), the blob's `metaball-noise.wgsl.ts` IQ-noise STAYS distinct, and each viz's `hostField` (`sampleRingField`/`gridCoverage`/`gerstnerVelocity`) stays local. This is a real DRY collapse with a real over-abstraction fence — keep it. The Gerstner/Tessendorf wave is REAL, not vapor.

### 3. `W-CONCENTRIC-LEVELSET` is a REAL field-source swap, NOT a rename — but the doc OVERSTATES "rebuild": the extraction primitive already ships.

The shipped concentric already carries the IQ contour operator (`concentric.wgsl.ts:193 contourInk`, `de = |fract(fN+0.5)−0.5|/fwidth(fN)`) — the doc honestly admits "KEEP IQ contourInk." What it draws contours OF is `sampleRingField` = `Σ A·sin(k·‖p−c‖_e − ω·t + φ)`, mathematically-PERFECT radial sinusoids about fixed centers (`ringField.ts:155-176`). LEVELSET swaps that source for `baseFBM(curlWarp(p,t))` — a curl-warped value-noise terrain. That is a genuine field-source change (perfect rings → irregular topographic contours), CORRECT against the user's "level-set lines of a gradient map" vision, and D0 confirms shipped-concentric already "reads WELL." So: NECESSARY (the field IS perfect rings today, not irregular), but the executor should treat it as a `F(p,t)` swap onto the KEPT `contourInk`/substrate/uniform-bridge, NOT a from-scratch rebuild. Per-level-set jitter (`§2.4 levelJitter(round(F·N))`) is a clean cheap GPU trick — sound.

### 4. `W-PAPERGRID-WARP` "deepen" — the warp is ALREADY genuine Bridson curl-noise, NOT a sine-bow. The fix is a SECOND octave + amplitude register, not a math-class change. Watch the smear.

CORRECTNESS check: `paper-grid.glsl.ts:curlWarp` calls the real divergence-free `curlFBM` (TWO counter-flowing terms `a`+`b` at different scales/speeds — Alex Harri counter-flow), NOT a cheap `sin`. `flow.glsl.ts:curlFBM` is the true 2D curl (central-difference partials, 90° `(g.y,-g.x)` rotation, divergence-free by construction). So D0's "warp subtle" is purely the calm DEFAULT (`constants.ts:77 waveAmplitude: 0.1`, `waveScale: 0.5`), not a deficient warp. The research's own §3-Idea-1 two-band split (coarse advect + fine perturb octave) is the right deepening AND it carries the right falsifiable fence (cell-pitch CV `<0.15` so "deep" stays legible, not the original blurry-mess defect). NECESSITY is genuine (the user asked to deepen) but it's a tuning+1-octave register, not a rebuild — don't let the executor over-spec a "structured multi-scale" rewrite of a warp that is already SOTA-correct.

---

## CROSS-CUTTING

- **The presence concern (D0 W-VIZ-PRESENCE) DOES NOT bite concentric/paper-grid** — both carry coral/cream-on-transparent that read clearly (D0: concentric "reads WELL", paper-grid "WORKS but subtle"). The near-invisible vizzes are blob/dot-flow/dot-matrix/goo-dot. So these two waves are presence-SAFE; the warp-deepen even helps paper-grid presence as a side effect.
- **No D7 overfit** in any of the four: zero hardcoded app refs; defaults are warm-cream library identity, deep registers OPT-IN, demo hues (teal/coral) are presets-in-consumers.
- **One latent risk for W-FIELD-ENGINE:** the parity table (`docs/tranches/BB/audit/gpu-parity-table.md`) is what `proof:gpu-substrate-single` reads for `verified` status, but that gate's ΔE is a structural-proxy CPU capture (ΔE 0.0) demoted to enrollment + a meanLum>0 paint floor — it does NOT catch a basis transcription drift either. The numeric net MUST be `proof:wave-field-single`'s job, not leaned onto the substrate gate.
