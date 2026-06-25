# BD.W-CONCENTRIC-LEVELSET — swap the contoured FIELD-SOURCE (perfect radial sinusoids → a curl-warped fbm terrain), KEEP the IQ `contourInk` extraction — an `F(p,t)` swap onto the kept primitive, NOT a rebuild

**Band 13 (per-viz redevelopments) · depends: W-FIELD-ENGINE · W-WAVE-FIELD-HARNESS** — W-FIELD-ENGINE because the new field source is a curl-warped value-noise terrain (the shared `field/{noise,flow}` chunk — `baseFBM`/`curlWarp`, NOT a re-fork); W-WAVE-FIELD-HARNESS because the field-source swap edits `sampleRingField`'s contoured argument, and the JS↔WGSL↔GLSL transcription of the new source must close against a REAL numeric oracle↔shader ΔE (the `shader-eval-harness` net), not the name-presence `proof:concentric` clause C3 it currently rides (the false-green class). Per `UNIFIED-ROSTER.md:167` (V-NEW; "Level-sets of a curl-warped fbm terrain; KEEP IQ `contourInk`") + `critique/passd-field.md §3` ("a REAL field-source swap, NOT a rename — but the doc OVERSTATES 'rebuild': the extraction primitive already ships").

> **STATUS: IMPLEMENTATION-gated.** This is the tranche-DEV PLAN doc. The build swaps the field source the contour operator reads — it edits `ringField.ts` + the two shaders' field function + adds the curl-warp source; the IQ `contourInk`/substrate/uniform-bridge are byte-untouched. It is user-gated. The spec is in scope now.

## The defect / the ask (Pass-D code-grounded — `critique/passd-field.md §3`)

The shipped concentric (BC.W-VIZ-CONCENTRIC) is a radial-Fourier ring-interference field: `sampleRingField` = `Σ_j Σ_i A_i·sin(k_i·‖p−c_j‖_e − ω_i·t + φ_i)` (`ringField.ts:146-176`), mathematically-PERFECT radial sinusoids about fixed centers, contoured by the IQ gradient-normalized isoline operator `ringIsolineInk` (`ringField.ts:184`, `concentric.wgsl.ts:193 contourInk`, `de = |fract(fN+0.5)−0.5|/fwidth(fN)`). D0 confirms shipped-concentric "reads WELL." The user's vision (the roster + the media analysis) is "level-set lines of a gradient map" — irregular TOPOGRAPHIC contours, not perfect concentric rings. The exact, code-traced gap:

1. **The field IS perfect rings today, not irregular terrain.** `sampleRingField` is a pure radial sinusoid sum about fixed centers — the contours are PERFECT concentric ellipses (the ellipsoidal-norm radial metric `ellipsoidalRadiusRot`, `ringField.ts:77`). The user asked for the level-sets of a curl-warped GRADIENT MAP — irregular topographic level-set lines, the SOTA "contour map of a noise terrain" register.

2. **The extraction primitive ALREADY SHIPS (the doc's "rebuild" is OVERSTATED).** The IQ `contourInk` operator (`ringIsolineInk` / `concentric.wgsl.ts:193`) is the level-set EXTRACTION — `de ≈ |sin| / (|cos|·fwidth(phase))` the analytic distance-to-nearest-crest, converted to a constant pixel-width line via `fwidth`. This is EXACTLY the level-set-of-a-field operator the new register needs — it is KEEP, not rebuild. The roster honestly admits "KEEP IQ `contourInk`." What changes is WHAT the contour operator draws contours OF (the field source `F(p,t)` the operator is fed), NOT the operator.

3. **The transcription is asserted by SPELLING, not behaviour.** `proof:concentric` clause C3 (`scripts/proof-concentric.mjs:109-121`) is `/function sampleRingField/.test(js) && /fn sampleRingField/.test(wgsl) && /float sampleRingField/.test(glsl)` + a literal-string scan for `/sqrt(RING_GRAVITY*k)/` — a NAME-presence round-trip (`critique/passd-field.md §1`). A new field source with a transcription drift in one backend (a sign-flipped warp octave, a `2.02→2.0` lacunarity in the fbm) renders WRONG and sails GREEN — the false-green class. The swap MUST close against the REAL `shader-eval-harness` numeric net (W-WAVE-FIELD-HARNESS / W-GATE-TRUTH-AUDIT), never the name-presence C3.

The ask: swap the contoured field source from perfect radial sinusoids to a curl-warped fbm terrain (`baseFBM(curlWarp(p,t))`), KEEP the IQ `contourInk` extraction + the substrate + the uniform-bridge, treat it as an `F(p,t)` swap NOT a from-scratch rebuild, and close the transcription against a REAL numeric round-trip.

## The mechanism — an `F(p,t)` swap onto the KEPT `contourInk` (the level-set operator is byte-untouched)

The level-set extraction `contourInk` reads a scalar field `F(p,t)` and draws constant-pixel-width lines at its iso-levels (`fract(F·N)` crossings). TODAY `F = sampleRingField` (perfect radial sinusoids). The swap replaces ONLY the field source — the operator, the substrate, and the uniform-bridge are untouched.

### 1. The new field source — `baseFBM(curlWarp(p,t))` (a curl-warped value-noise terrain, OPT-IN)

`sampleRingField` gains a `mode` axis (a CONSTRUCTION-TIME / config permutation — `field: "rings" | "levelset"`, default `"rings"` for byte-identical back-compat):

- **`field: "levelset"`** — `F(p,t) = baseFBM(curlWarp(p, t))` where `baseFBM` is the shared `field/noise` value-noise fbm (the W-FIELD-ENGINE host — NOT a re-fork) and `curlWarp` is the shared divergence-free curl domain-warp (the `field/flow` chunk — the SAME `curlFBM` paper-grid + dot-flow use, `flow.glsl.ts`/`flow.wgsl.ts`). The warp BENDS the noise terrain over time (a slow topographic drift); the fbm gives the irregular contour shapes (level-sets of an irregular gradient map, NOT perfect rings). This is the user's "level-set lines of a gradient map" register.
- **`field: "rings"` (DEFAULT, byte-identical)** — the existing perfect radial sinusoid sum (`Σ A·sin(k·‖p−c‖_e − ω·t + φ)`). A bare `<Concentric>` reads the shipped ring-interference field byte-for-byte (the cage gates stay GREEN). The levelset register is OPT-IN.
- **The contour operator is KEPT byte-untouched.** `ringIsolineInk` / `concentric.wgsl.ts:193 contourInk` reads `F(p,t)` (whatever the source) and extracts the constant-pixel-width isolines — it does NOT care whether `F` is rings or terrain. The swap feeds it a different `F`; the extraction math is byte-frozen. The gate (L4) asserts `contourInk`/`ringIsolineInk` is unedited (a re-derivation of the isoline operator REDs — the "rebuild" the doc OVERSTATED is FORBIDDEN).

### 2. The per-level-set jitter (the clean cheap GPU trick — `levelJitter(round(F·N))`)

The SOTA contour-map register adds a faint per-level jitter so adjacent level-sets read distinct (the topographic-map "every Nth line bolder" / the per-level hue shift): `levelJitter(round(F·N))` (a cheap hash of the rounded level index → a faint per-level brightness/hue offset). This is a pure GPU function of the level index — stateless, no buffer, composes the shared color seam. The gate (L3) asserts the jitter is a pure `f(level)` (no accumulation), composing `procedural-color`, not a re-fork.

### 3. The transcription closes against the REAL numeric round-trip (the W-WAVE-FIELD-HARNESS compose)

The new `F(p,t)` source (`baseFBM(curlWarp(p,t))`) must transcribe byte-equivalent JS↔WGSL↔GLSL. The parity closes against `shader-eval-harness.assertParity` (W-GATE-TRUTH-AUDIT's leaf, via W-WAVE-FIELD-HARNESS's `proof:wave-field-single`), NOT the name-presence C3:

- The JS oracle (`ringField.ts` `sampleRingField` in `levelset` mode) and the WGSL/GLSL twins evaluate to the SAME `Float64Array` at a fixed `(p,t)` lattice within the per-viz calibrated concentric bar. A sign-flipped curl octave / a `2.02→2.0` fbm lacunarity in one backend produces a NON-zero ΔE > bar → RED (the coefficient-flip bite, NOT a `/fn name/` presence). `proof:concentric` clause C3 is re-pointed onto the harness (the false-green C3 retired).

## The gate — `proof:concentric` clause LEVELSET extension (born-RED → GREEN; the source swaps, the operator is KEPT, the parity is NUMERIC)

`scripts/proof-concentric.mjs` gains a LEVELSET arm (extend-in-place, the existing C1/C2 clauses + the re-pointed C3); `tags: ["local","ci"]`. The detector comment-strips, reads the field source + the shaders + composes the harness, and exports a pure detector for the self-test bites.

- **L1 — the field source swaps to a curl-warped fbm terrain (OPT-IN).** `sampleRingField` carries a `field: "rings" | "levelset"` axis; `levelset` reads `baseFBM(curlWarp(p,t))` (the shared `field/noise` + `field/flow` chunks, NOT a re-fork). `facts.fieldSource` records the levelset source + the shared-chunk imports. A levelset source re-forking a local fbm / a local curl REDs (the no-second-noise-basis fence — W-FIELD-ENGINE's hoist).
- **L2 — the DEFAULT is byte-identical (`field: "rings"`).** The default reads the existing perfect radial sinusoid sum byte-for-byte; the existing `proof:concentric` C1/C2 cage clauses + the `proof:viz-concentric` gate stay GREEN by construction. A default `field: "levelset"` / a `rings` mode that diverged from the shipped field REDs (the default-identity bite).
- **L3 — the per-level jitter is a pure `f(level)`, composing the color seam.** `levelJitter(round(F·N))` reads NO accumulation buffer, composes the shared `procedural-color` (not a re-fork). `facts.levelJitter` records the pure-function jitter. A stateful jitter buffer / a second color seam REDs.
- **L4 — the IQ `contourInk` is KEPT byte-untouched (the "no rebuild" fence).** `ringIsolineInk` (JS) / `contourInk` (`concentric.wgsl.ts:193`) / the GLSL twin are unedited — the level-set EXTRACTION operator is byte-frozen; only the field SOURCE it reads changed. The gate diffs the `contourInk` body against the HEAD source (a comment-stripped byte compare). A re-derived isoline operator REDs (the rebuild bite — `critique/passd-field.md §3` "the doc OVERSTATES rebuild").
- **L5 — the transcription closes against the REAL numeric round-trip (the W-WAVE-FIELD-HARNESS compose).** `proof:concentric` clause C3 imports `shader-eval-harness` and calls `assertParity` for `sampleRingField` (both `rings` AND `levelset` modes) — a sign-flipped curl octave / a `2.02→2.0` lacunarity in one backend REDs at ΔE > bar. A surviving `/fn sampleRingField/.test()` name-presence round-trip REDs (`proof:gate-truth` G2 by inheritance). `facts.parityNumeric` records the harness import.

**Self-test bites (each planted defect MUST red):**
- (a) a `levelset` source re-forking a local `valueNoise` / a local `curlFBM` (not the shared chunk) → L1 RED (the no-second-basis bite).
- (b) a default `field: "levelset"` / a `rings` mode that diverged from the shipped sinusoid field → L2 RED (the default-identity bite).
- (c) a `levelJitter` reading a per-frame accumulation buffer → L3 RED (the stateful-jitter bite).
- (d) a re-derived `contourInk`/`ringIsolineInk` body (the operator rebuilt instead of fed a new source) → L4 RED (the rebuild bite).
- (e) a `levelset` WGSL with a sign-flipped curl octave whose JS↔WGSL ΔE > bar that the gate does NOT catch (a surviving name-presence C3) → L5 RED (the false-green-inheritance bite).

**What reds on the pre-fix tree (born-RED by construction):** L1 (no `levelset` field source — the field is perfect rings only), L3 (no per-level jitter), L5 (`proof:concentric` C3 is name-presence). L2/L4 are GREEN at HEAD (the default IS the shipped rings, `contourInk` IS untouched) — they FLIP to load-bearing the moment the swap lands (they guard the swap from breaking the default / rebuilding the operator). GREEN only after the field-source swap + the jitter + the KEPT operator + the numeric parity land.

## The binding π — `tests-visual/concentric-levelset.spec.ts`

The painted-truth readback, BOTH modes AND the **webkit project** (the levelset field must paint on Safari's WebGL2 fallback), over the demo backdrop (concentric reads WELL by construction — D0 confirms it is presence-SAFE, NOT a near-invisible viz), served at `:5199`, NEVER `reducedMotion` (except the PRM arm).

- **THE LEVEL-SET TERRAIN PAINTS (the field-source swap).** `<Concentric field="levelset">` reads as irregular topographic contour lines (the level-sets of a curl-warped noise terrain — irregular, organic, drifting), DISTINCT from the perfect concentric rings the default paints. The contours are constant-pixel-width (the KEPT IQ `contourInk` — the lines stay crisp at every level).
- **THE DEFAULT UNCHANGED (the rings byte-identical).** A bare `<Concentric>` reads as the shipped perfect radial ring-interference field — byte-identical to the HEAD ground capture (L2).
- **THE PER-LEVEL JITTER (the topographic distinctness).** Adjacent level-sets read distinct (the faint per-level brightness/hue offset — the topographic-map register).
- **THE NUMERIC PARITY WITNESS (the transcription faithful).** The `levelset` field round-trips JS↔WGSL↔GLSL ≈0 at the calibrated bar (the harness witness — the proof the new source transcribed faithfully across backends).
- **PRM single-paint:** under `prefers-reduced-motion: reduce`, the levelset field seats one static frame (the substrate-PRM freeze inherited).

## The gestalt row

**Union-roster surface: `concentric-levelset` (the level-set contour-map terrain).** The verdict requirement: a FRESH whole-page both-mode `:5199` capture (+ the webkit project), NEVER `reducedMotion`, surface-hash freshness floor. The gestalt judgement: the levelset register reads as irregular topographic level-set lines of a drifting noise terrain (the user's "level-set lines of a gradient map" vision), crisp at every level (the KEPT IQ `contourInk`), distinct per-level (the jitter), AND the default ring-interference field is the unchanged perfect-rings register. Born-FAIL on HEAD (the field is perfect rings only — no terrain source). GREEN at its OWN close; W-REFLECT re-confirms on fresh pixels. Wired into the union roster by W-GESTALT-WIRE.

## Fences

- **The IQ `contourInk` is KEPT byte-untouched (the #1 fence — NOT a rebuild).** Only the field SOURCE `F(p,t)` swaps; the level-set EXTRACTION operator (`ringIsolineInk`/`contourInk`) is byte-frozen (L4). A re-derived isoline operator is FORBIDDEN (the "rebuild" the doc OVERSTATED — `critique/passd-field.md §3`).
- **The DEFAULT is byte-identical (`field: "rings"`).** The levelset register is OPT-IN; the bare `<Concentric>` is the shipped perfect-rings field (L2). NEVER default to levelset.
- **No second noise basis / no second curl (the W-FIELD-ENGINE hoist).** The levelset source COMPOSES the shared `field/noise` `baseFBM` + the shared `field/flow` `curlWarp` — a re-forked `valueNoise` / `curlFBM` REDs (L1).
- **The transcription is NUMERIC, not name-presence (the W-WAVE-FIELD-HARNESS compose).** The new field source closes against `shader-eval-harness.assertParity` with a coefficient-flip bite (L5) — a `/fn sampleRingField/.test()` round-trip is FORBIDDEN (`proof:gate-truth` G2). W-GATE-TRUTH-AUDIT / W-WAVE-FIELD-HARNESS are the predecessor edges.
- **The jitter is stateless (the dot-flow discipline).** `levelJitter(round(F·N))` is a pure `f(level)` — no accumulation buffer (L3).
- **The warm-cream identity holds.** The default + the levelset palette read the warm-cream identity; the demo coral/teal is a preset-in-consumer (presets-in-consumers). Concentric is presence-SAFE (D0 — "reads WELL"); no W-VIZ-PRESENCE backdrop is owed.

## Disposition links

- **`UNIFIED-ROSTER.md:167` (W-CONCENTRIC-LEVELSET [V-NEW]; "Level-sets of a curl-warped fbm terrain; KEEP IQ `contourInk`")** → BUILT (the spec). The directive is the clauses: level-sets of a curl-warped fbm terrain → §1/L1; KEEP IQ `contourInk` → §1/L4. CLOSED at the spec level.
- **`critique/passd-field.md §3` (a REAL field-source swap, NOT a rename — but the doc OVERSTATES "rebuild": the extraction primitive already ships; treat as an `F(p,t)` swap onto the KEPT operator; per-level jitter is a clean cheap GPU trick)** → §1 the field-source swap (NOT a rebuild — L4 the KEPT operator), §2 the per-level jitter, §3 the numeric parity. CLOSED.
- **DEPENDS W-FIELD-ENGINE** (the curl-warped fbm source is a shared value-noise host) + **W-WAVE-FIELD-HARNESS** (the field-source transcription closes against the real numeric round-trip — the false-green C3 retired) — both predecessor edges are real.
