# CRIT — P-CSAFARI (in-situ two-pass refraction on real Metal within the Δ5 chroma fence), PASS 1

**Role:** adversarial critique · **Date:** 2026-06-30 · **Fence:** READ-MOSTLY, wrote ONLY here. `verify-siblings-intact --quiet` exit 0. Nothing outside glass-ui touched.

**Verdict on the prototyper:** the spike is HONEST about its renderer (Chrome-ANGLE-Metal, not Safari.app) and its three JSONs corroborate its prose numbers on disk — no fabrication. BUT the central claim ("the actual two-pass path was rendered; the Δ5 fence HOLDS at the lived bake") is **measured on a DIFFERENT shader than the one that ships**, on a **DIFFERENT dispersion axis than the binding one**, over a **synthetic field that is not the surface the fence governs**. The GPU-physics floor it de-risks is real and valuable; the fence number + the perf number do NOT transfer to the wave.

---

## The decisive finding — the spike's dispersion operator is NOT the source-of-truth's (the "transcribed VERBATIM" claim is FALSE)

The VERDICT says the spike transcribed `audit/glass-field-shaders.json` "VERBATIM." It did not. The dispersion mechanism is a different operator on a different uniform:

- **Source-of-truth (`glass-field-shaders.json` frag, the shader that ships):**
  ```glsl
  float rim = 1.0 - smoothstep(0.0, 0.16, edge);
  vec2  ca  = inward * rim * uChromatic * 0.0045;   // ABSOLUTE uv offset, scaled by uChromatic
  lensed.r = texture(uField, uv + disp + ca).r;
  lensed.g = texture(uField, uv + disp).g;
  lensed.b = texture(uField, uv + disp - ca).b;
  ```
  The fringe is an **absolute** rim-concentrated offset `ca = inward·rim·uChromatic·0.0045`, added to R / subtracted from B around the shared `disp`. The binding axis (spec §3, §G1, Identity-fences) is **`uChromatic`**, the K2 "thin-rim R/B fringe strength."

- **Spike (`two-pass-v2.html` / `two-pass.html` / `watchdog.html`, all three):**
  ```glsl
  vec2 off = disp;
  vec2 dispR = off*(1.0-uDispersion)*rim + off*(1.0-rim);  // FRACTION of the disp vector
  vec2 dispB = off*(1.0+uDispersion)*rim + off*(1.0-rim);
  ```
  The fringe is a **multiplicative fraction** `(1±uDispersion)` of the displacement vector `disp = inward·rimW·uRefractionStrength·0.045`, on a uniform the spike invented (`uDispersion`).

These are not the same math. `ca` is an independent absolute offset (magnitude `uChromatic·0.0045`, fixed regardless of `disp`); the spike's split scales the EXISTING displacement by a fraction (magnitude `disp·uDispersion`, which at the rim is `0.045·rimW·uDispersion`). The two coincide only by accident of tuning. **The fence value 0.025 was swept on `uDispersion`; the wave's binding knob is `uChromatic`.** The recommended gate clause "`dispΔC p99 ≤ 0.005`" is therefore a fence on the WRONG variable — born-RED on a `uDispersion=0.5` fixture that the ship shader cannot even express (the ship shader has no `uDispersion`). Mapping 0.025-`uDispersion` → a `uChromatic` value requires the algebra `uChromatic·0.0045 ≈ 0.045·rimW·0.025` at the rim — a derivation the spike never did and the VERDICT never states. The "var-drivable `--glass-edge-dispersion` live knob at ~0.025" recommendation names a token that maps to neither uniform cleanly.

This is the C-3-class miss the spec warns about: a feasibility spike that proves a fence on a hand-rolled approximation, not the artifact. It is exactly the "fixture artifact, NOT the ship target" trap the spec flagged for the 0.5 rainbow — and the spike fell into the SAME trap one level up by re-rolling the operator.

## The fence was measured over a synthetic field, and the fence number is field-content-dependent

The fixture field is `mix(0.18,0.92,band)*(0.5+0.5*grad)` — a hard 4-cycle luminance step-band × a warm tint × a vertical gradient. The chroma-fringe-per-pixel is a function of **field-edge sharpness** (the per-channel split only produces visible chroma where the sampled field has a luminance/hue gradient under the offset). The spike's own `rimFringeMax 0.05-0.06` peaks "exactly at the hard-luminance-band/rim crossings" — i.e. the number is driven by the synthetic band edges. The ship field is the WS1 aurora + the **anisotropic metal drapery** (a `curlFBM`-warped fold field with sharp specular ridges — see below), whose edge spectrum is entirely different. A fence calibrated on the band-grid's edges has no claim to hold on the drapery's ridges. The VERDICT concedes the gestalt is field-unproven but does NOT concede that the **fence number itself** is field-dependent — it presents `p99 ~0.001` as a property of the dispersion, when it is a property of (dispersion × this fixture's field).

## The two-pass path that rendered is the CHEAP shader — the metal drapery + plate valve never ran

The source-of-truth glass pass also runs, every frame, AFTER the lensed sample: the anisotropic-specular metal drapery (`potentialFBM` + `curlFBM` flow + triangular fold coord + `pow(shade,3.5)` ridge + fold-normal light-align + low-freq run noise + warm luma ramp), the `uMetalStrength` composite, and the K12 ridge-local plate VALVE (`smoothstep(uValveKnee,1,structLuma)` firming the plate under bright ridges). **The spike rendered NONE of this** — all three fixtures stop at `lensed = mix(lensed, soft, 0.35)`. Consequences:

1. **The "two-pass field→FBO→texture(uv+disp) path RENDERS" leg is real but PARTIAL** — it proves the FBO handoff + the lensed sample render clean, which is genuine value (the un-rendered seam the prior `glassShader-tier2.wgsl` skipped). But "renders clean" for the cheap pass does not prove the FULL pass (which has 5× the ALU + the second `curlFBM` evaluation + the valve branch) renders clean or stays in the chroma fence — the metal drapery itself injects warm-hue variation at the rim that the differential-vs-`disp=0`-baseline would NOT capture (the baseline also has the drapery, so the differential cancels it — but the DRAPERY × dispersion interaction is unmeasured).

2. **The watchdog perf number is the WRONG shader's number.** `watchdog.html` runs the same cheap GLASS_FRAG (squircle + RGB split + 9-tap box) — NO drapery, NO valve, NO `curlFBM`. The shipped two-pass is materially heavier (a second fbm-curl evaluation per fragment + the fold math + the valve). The measured p50 2.8 / p95 7.6ms over 8 panels is a floor, not the real cost; the R3 watchdog risk is **under-probed, not bounded**. The 40.9ms max is dismissed as "first-frame shader-compile" but the REAL shader compiles slower (it is ~3× the source length) — on the WebKit ~2s ceiling the compile-time of the full shader × N-panel pipeline-warm is the actual risk the spike did not exercise.

## Scope honesty is good but the load-bearing legs are deferred WHOLE

The VERDICT correctly fences Chrome-ANGLE-Metal ≠ Safari.app and books C16/C18 + the K2 gestalt + C12 dark-AA as build-owed. But three of those are not polish — they are the legs that actually decide the ★★★ chronic:

- **C12/R6 dark-AA-over-bright-ridge is the SAME valve the spike omitted.** The plate VALVE (`uPlateAlphaMax`/`uValveKnee`) IS the mechanism that resolves the dark-AA-over-bright-ridge risk in the source shader. The spike rendered neither the valve nor the dark-AA case, then booked dark-AA as "a separate orthogonal live risk." It is not orthogonal — it is in the same fragment shader, gated by the same `structLuma`, and the spike's fixture cannot exercise it because it has no drapery to produce a bright ridge. The single most likely 4th-time miss (a glass surface that refracts beautifully but drops content below 4.5:1 over its own bright fold) is UN-touched.

- **The Safari.app navigator.gpu/WGSL question (C16) is the actual chronic.** The spec twice states the WGSL Tier-2 path is the open question (the prior `glassShader-tier2.wgsl` never exercised the FBO first pass). The spike rendered the WebGL2 Tier-1 path — the universal floor — which the spec ALREADY treats as proven ("the Tier-1 WebGL2 floor I rendered IS the universal Safari floor"). So the spike de-risked the leg that was least at risk and left the WGSL/Safari.app leg (the one that missed 3×) to the build.

## What it got right (do not discard)

- The FBO `FRAMEBUFFER_COMPLETE` + warm-field-written-then-lensed-read handoff on real Metal IS the un-rendered seam, now rendered. Real, valuable.
- The DIFFERENTIAL-vs-baseline metric is the right SHAPE for a chroma fence (isolating dispersion from the field's own chroma) — it should survive into the build gate, re-pointed onto `uChromatic`.
- The 0.5-rainbow-is-a-fixture-artifact correction is correct and important.
- `uChromatic`/`uDispersion` IS var-drivable in GL (CSSWG#542 moot off the SVG path) — a true and useful fact for the live retune knob.
- Committed artifacts, re-runnable, no vanishing-prove. Renderer string honest.

---

## mustResolve (blocks readyToDevelop)

1. **Re-point the spike onto the SHIP shader's `uChromatic` operator** (`ca = inward·rim·uChromatic·0.0045`), delete the invented `uDispersion` fraction, and re-sweep the fence on `uChromatic`. The gate clause `dispΔC p99 ≤ ε` must be keyed to `uChromatic`, with the lived bake value stated as a `uChromatic` number (and the `--glass-edge-dispersion` token mapped to it explicitly).
2. **Render the FULL source-of-truth pass** (metal drapery + `uMetalStrength` composite + the K12 plate valve), not the cheap squircle-only fixture, before the fence + perf numbers bind. Re-run the differential including the drapery×dispersion interaction at the rim.
3. **Re-run the watchdog on the FULL shader** (drapery + valve + the second `curlFBM` evaluation) at 2880×1800 / N≤8 / sustained — the cheap-shader p50 2.8ms does not bound the ship cost or the real compile-time on the WebKit ~2s ceiling.
4. **Fold C12 dark-AA INTO this spike, not beside it** — render a content-bearing surface over a bright drapery ridge and measure 4.5:1 through the valve. It is the same fragment shader; "orthogonal" is false.
5. **Calibrate the fence over the WS1 aurora+drapery field, not the band-grid** — the per-pixel fringe number is field-content-dependent; the band-grid number does not transfer.
6. **Name the Safari.app/WGSL Tier-2 leg as the residual chronic** the build still owes (C16/C18) — the spike de-risked Tier-1 (already-treated-proven), not the leg that missed 3×.
