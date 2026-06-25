# BD Pass-D — FIRST-PRINCIPLES deep-challenge: FOURIER-FIELD + W-FOURIER-INTERACT + W-CONSTELLATION-STUDIO

Branch `prototype/liquid-dock`. Grounded in the ACTUAL code (the shader strings, the composable,
the gate), not the doc claim. Files cited at `file:line`.

---

## TL;DR verdict

The **shipped fourier-field renderer (BC.W-VIZ-FOURIER) is genuinely strong** — correct DFT/IDFT
math (verified numerically to machine precision), a real WebGPU compute→render pipeline, GPU-only
compliant in the main path. The **BD waves W-FOURIER-INTERACT + W-CONSTELLATION-STUDIO are the weak
half**: the "draw-your-own-path" and "click-to-add" headlines describe behaviour that **does not
exist** in the substrate they claim to "compose," and one of them ("click-to-add") **contradicts an
explicit invariant of the constellation engine.** They are vapor-adjacent: the primitives they lean
on do something materially different.

---

## (a) The epicycle MATH — CORRECT (the one part that fully passes)

`math.ts` is textbook-correct and I verified it numerically (`/tmp/ft.mjs`, an ellipse + 3rd
harmonic sampled at N=64):

- **Round-trip `dftFromPoints` → `partialSumAt` (full N): maxErr 3.04e-15** (machine epsilon). The
  forward DFT (math.ts:113-142) carries the `1/N` normalization on the forward transform and none on
  the inverse (`partialSumAt` math.ts:78-95 / `positionsAt` math.ts:41-60) — the correct convention.
- The signed-frequency epicycle order `0,+1,-1,+2,-2,…` (math.ts:117-123) with the **even-N Nyquist
  de-duplication** `if (f !== N - f)` (math.ts:122) is correct — a naive loop would double-count the
  Nyquist bin on even N. This is a real, easy-to-get-wrong detail done right.
- `partialSumAt` truncation to N terms gives a smooth low-pass approximation as designed (N=5 →
  0.500 vs exact 0.600 at t=0 — the expected Gibbs-free partial sum).
- `makeEllipticSpectrum` (math.ts:171-201) is a sound procedural generator: dominant counter-rotating
  pair of unequal magnitude (= tilted ellipse), `1/order` falloff on higher harmonics.

**CORRECTNESS bar: PASS.** No gap between claim and math here.

## (b) "draw-your-own-path" (W-FOURIER-INTERACT) — **VAPOR vs. the headline; curated-preset DFT is what exists**

This is the **hardest finding.** The union roster (UNIFIED-ROSTER.md:171) and the A43 row
(fleet2/prompt-recap-all.md:103) bill W-FOURIER-INTERACT as **"draw-your-own-path epicycle
interaction."** The substrate it claims to compose does NOT capture a user-drawn path:

1. **The only pointer interaction in the shipped composable is `head_t` SCRUB**, not path capture.
   `useFourierField.ts:112-119`: `headT = pointer.smoothedPosition.value.x % 1` — pointer X scrubs
   the *time parameter* of the **pre-existing** reconstruction. There is no pointer→points buffer, no
   `pointerdown`-starts-a-stroke, no on-release `dftFromPoints(strokePts)`. `FourierFieldConfig.interactive`
   (constants.ts:69-70) is documented verbatim as *"Pointer scrubs `head_t` + a flick injects clock
   momentum"* — scrub, full stop.

2. **`dftFromPoints` IS wired — but only to CURATED preset shapes**, not a live draw loop. Its real
   consumers (grep): `demo/stories/substrates/fourier-paths.ts:133` (ℱ-wordmark / heart / star authored
   as closed parametric curves, DFT'd at module load) and the `FRedrawOverlay.vue` egg (a hand-traced
   glyph). The "path" is a **designer-authored point set**, not user input. fourier-paths.ts:11-12 even
   says the heart/star are "authored here as their own closed parametric curves." A configurator-select
   of {ellipse, ℱ, heart, star} is a **dropdown of pre-DFT'd shapes** — not "draw your own."

3. **The input→coefficient pipeline a real draw-your-own needs does not exist.** A genuine wave would
   need: a `pointerdown→pointermove` stroke buffer → arc-length resample to N → `dftFromPoints` → swap
   into `getSpectrum()`. Steps 1, 2, and 4 are entirely absent from `src/`. The math leaf (`dftFromPoints`)
   is present and correct, so the wave is *buildable* — but as written it is a **NEW capture+resample+
   swap mechanism**, not a "compose the shipped pointer field" 3-liner the roster implies. The
   `usePointerVelocityField` it would "compose" gives **velocity/burst**, not a captured-stroke buffer —
   it is the wrong primitive for path capture.

**NECESSITY note:** the egg's redraw is a real, charming use; the studio shape-trace is real. But
neither is "draw your own." The wave is mis-scoped: it should be honestly named "the curve-trace
preset gallery + (NEW) the live stroke-capture loop" with the capture loop costed as net-new code.

## (c) GPU-only (D1 mandate) — main path COMPLIANT; one demo egg VIOLATES it

- **The shipped renderer is genuinely GPU-only.** `useFourierField.ts:7-8` carries no `useCanvas2D`
  / `getContext("2d")`; the WebGPU primary is a real compute→render pipeline (`fourierFieldWGPUSetup.ts:280-301`
  — a `beginComputePass` dispatching `cs_main` then a fullscreen-triangle render pass), and the
  WebGL2 fallback (`fourierFieldGLSetup.ts`) is a real `WebGL2RenderingContext` fragment pass. **PASS.**
- **BUT** `demo/eggs/FRedrawOverlay.vue:47` calls `c.getContext("2d")` — a **Canvas2D** overlay. The
  egg literally draws the ℱ glyph on a 2D canvas. Under a strict D1 "WebGPU everywhere, Canvas2D
  RETIRED" reading (the SFC's own banner, FourierField.vue:19-20), this is a live D1 violation in the
  fourier feature's own demo surface. If W-FOURIER-INTERACT touches this egg (it's the redraw it builds
  on), the GPU-only purge has to reach it or the mandate is cosmetic.
- **Asymmetry worth flagging (not a defect, but a SOTA gap):** on the WebGL2 fallback the epicycle
  math runs on the **CPU** and uploads as uniform arrays (glsl.ts:5-7: *"the JS side steps
  `partialSumAt`/`positionsAt` per frame"*). Only the WebGPU primary runs the chain in compute. So the
  "thousands of phasors on the GPU" stress register (N-26) is **WebGPU-only**; on the ~5-10% fallback
  tail it is a CPU O(N·M) per-frame loop. The roster's "now cheap on the migrated renderer" elides this.

## (d) W-CONSTELLATION-STUDIO "click-to-add" — **CONTRADICTS the engine's explicit invariant**

The roster (UNIFIED-ROSTER.md:172) bills this as **"config + click-to-add."** The shipped
constellation does the OPPOSITE:

- The only click handler (`useConstellation.ts:198-202`) calls `warpToField` — a transient warp
  **ripple** at the click point, not a node insertion.
- **Node count is explicitly CONSERVED.** `constellationTypes.ts:263`: *"node count is conserved (it
  is a **designation, not a new node**)"*; `warpTo` *"re-points the FOCAL node's INDEX"*
  (constellationTypes.ts:179). Adding a node on click is **the one thing the engine is designed not to
  do.** A real click-to-add must touch `constellationField.ts` (`nodes.push`, field:63), re-allocate
  the GPU storage buffers, and re-fit — it is a structural change to a field the gates currently assert
  is count-stable.
- The roster's parenthetical "CONSUMES the wired `bar+pill` silhouette (never re-calls `setSilhouette`)"
  is dock-band vocabulary that has **no referent** in the constellation primitive (grep finds no
  `setSilhouette` in `src/components/custom/constellation/`). This reads as a copy-paste from the dock
  spec — the wave's surface is under-specified.
- **"STUDIO" overclaims too:** constellation is currently a config'd field, not a `<VizStudio>`
  consumer (the W-VIZ-CONFIGURATOR "lift onto the shipped VizStudio" is a *separate* planned wave). So
  "click-to-add + config" presumes two unbuilt things.

## (e) Does fourier compose the shared field-engine? — **NO, and correctly so (a fork by design)**

Fourier's math is a **deliberate, isolated fork** — and that is the right call, NOT a defect:

- `math.ts` is a pure DFT/epicycle leaf; the field-engine waves (W-FIELD-ENGINE,
  `field/{noise,wave,flow,color}`) are value-noise / curl / wave-potential machinery. A Fourier
  partial-sum has **nothing to share** with curl-noise advection — forcing it into the field engine
  would be a false unification. VIZ-FINAL-ROSTER.md:§Band-11 scopes the field engine to "the ~3 genuine
  value-noise hosts" and keeps distinct ones distinct — fourier is correctly outside it.
- The ONE place fourier *should* share and does: `procedural-color.glsl.ts` / `.wgsl.ts` (the OETF +
  OKLCh matrices) are spliced from the shared chunk (glsl.ts:13-16) so color math can't drift. Good.

## The GATE is weaker than the doc claims (a falsifiability gap)

`compute.wgsl.ts:13-16` claims *"`proof:fourier-field` clause U3 round-trips the JS evaluator against
this WGSL at a fixed `(spectrum, t, N)` sample set (mean/p99 within the position-delta bar)."* **This
is false.** `proof-fourier-field.mjs:99-127` (clause U3) is **pure string-presence regex**: it greps
for `/fn partialSumAt/`, `/fn epicycleChainTip/`, the literal recurrence substring, and `/TAU\s*\*\s*index\s*\*\s*t/`.
There is **NO numeric round-trip, no sample set, no mean/p99 bar.** A WGSL with a transposed sign
(`re*sn - im*cs`) that still matched the regex's exact spacing would be caught, but a `+`/`-` swap
elsewhere, a wrong loop bound, or a `t` vs `-t` error would sail through. The binding numeric proof the
doc advertises lives only in a **JS-only unit test** (`FourierField.smoke.test.ts:99` round-trips
`dftFromPoints`↔`positionsAt` in JS) — which never touches the WGSL. **The WGSL transcription is
asserted by spelling, not by behaviour.** A genuine U3 would compile/run the WGSL (or a JS mirror of it)
against `math.ts` at fixed samples.

## Secondary finding — the phasor cap blocks the headline stress register

N-26 (deferred-chronic-fold.md:71) bills W-FOURIER-INTERACT as enabling a **"200+-phasor glyph"** /
"thousands of phasors," and constants.ts:24 says *"a >64-term custom trace books a **storage-buffer
widen (cheap)**."* That rationale is **wrong**: `MAX_PHASORS=64` is a hardcoded WGSL `const` in BOTH
shaders (compute.wgsl.ts:19, render.wgsl.ts:25) used as the loop bound AND the buffer-allocation
factor (`MAX_PHASORS * FOURIER_PHASOR_BYTES`, WGPUSetup.ts:85). The phasor buffer is **already a
STORAGE buffer** (WGPUSetup.ts:87) — so the limiter is the `const` loop bound + the allocation size,
NOT the buffer type. Bumping to 200+ is a const + alloc + uniform-int change (genuinely cheap), but the
doc's framing ("storage-buffer widen") misdiagnoses what's actually capped. A studio that lets a user
trace a dense glyph silently truncates at 64 today.

---

## Scorecard

| Bar | FOURIER renderer (shipped) | W-FOURIER-INTERACT (BD) | W-CONSTELLATION-STUDIO (BD) |
|---|---|---|---|
| NECESSITY | ✓ real viz | ~ scrub real; draw-your-own mis-scoped | ✗ "click-to-add" overclaims |
| CORRECTNESS | ✓✓ math machine-precise | ✗ capture pipeline absent | ✗ contradicts count-conserved invariant |
| SOTA | ✓ compute epicycle | ~ curated-preset, not live draw | ~ warp-ripple ≠ node insert |
| NOT-OVERFIT | ✓ generalized | ✓ math is general | ~ "setSilhouette" is dock copy-paste |
| WORKS | ✓ (U3 gate weaker than claimed) | ✗ doesn't draw-your-own | ✗ doesn't add |

**Hardest action:** rename/re-scope W-FOURIER-INTERACT honestly (curated-trace gallery is DONE; the
live stroke→DFT→swap loop is NET-NEW, cost it) and W-CONSTELLATION-STUDIO ("click-to-WARP" exists;
"click-to-ADD" is a structural node-insertion change against a count-conserved engine). Strengthen U3
to a real numeric JS↔WGSL round-trip — the doc already promises it.
