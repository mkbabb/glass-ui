# BI.W-FOURIER-RIBBON — the geometry-ribbon fourier render (LOD-interim → ribbon-primary)

Band B5 (substrates). The fullscreen per-pixel SDF (the O(pixels×segments) "god awful" architecture)
RETIRES onto an instanced geometry-ribbon; a zero-risk SDF-LOD interim ships first.

## §Mandate

Discharges (registry rows this wave OWNS):
- **UF-E7** — "fourier-field performance is god awful."
- **FAM-5 / PERF-1 [P0]** — the Fourier SDF architecture (fullscreen per-pixel loop over ALL 384 segments
  at dpr2 — O(pixels×segments) for a curve covering <5% of the canvas).
- **D-VIZ PASS-1 §3.4 (a) + PASS-4** — the geometry-ribbon fix, EARNED from measurement (ribbon 156–192×
  cheaper than the studio SDF, O(covered_pixels), pixel-identical-by-construction, Safari-honest).

## §Design

Decided mechanism — D-VIZ PASS-4 (converge 90%): **SHIP LOD-interim now → land the ribbon-primary**. The
two stages DON'T couple (the draw-bias interaction layer is shape-independent — W-FIELD-CORE ships it on
LOD, untouched at the ribbon swap). NO re-litigating the ribbon SHAPE (measurement-airtight: the SDF trail
loop over-composites each segment separately with per-segment age, so instanced capsules running the same
`segDist` SDF give the identical result by over-composite associativity — verified at
`fourier-field.glsl.ts:202-227`; the WGSL primary is NOT cheaper — `render.wgsl fs_main` runs the identical
fullscreen loop, VIZ-A refuted).

- **Stage 1 — the SDF-LOD interim (the palliative, ships immediately, retires the "god awful" TODAY).**
  The GENTLER in-budget combo: **128-sample + DPR2 + cel-ON** (2.7× / 11.11ms — clears the flagship
  16.7ms budget with ONE cost, the tail-facet). NOT the max-perf 128+DPR1.5+cel-off arm (3.3× but 3
  visible costs — cel-loss + tail-bead + DPR-soft — on the FOCAL studio surface). **Decision (the pass-4
  critic's un-closed knob, ruled here):** the interim preserves focal quality (cel-ON) over max-perf,
  because the ribbon supersedes it in the SAME wave — a throwaway interim must not degrade the user's
  complaint surface. The 128+DPR1.5+cel-off arm is BANKED as the weaker-GPU-headroom fall (re-trigger: a
  measured sub-flagship device blows the 2.7× budget).
- **Stage 2 — the ribbon-primary (the architectural fix).** Instanced capsule quads, per-instance
  `(a.xy, b.xy, age)`; the vertex expands each segment to its `glowHalf`-padded bbox; the fragment runs the
  EXACT `segDist` underglow+core over-composite (loop-free, O(covered_pixels)); head-halo = ONE quad running
  the exact `headAniso` 3-layer SDF (the "small SDF pass"); epicycles = instanced ring-annulus + arm/dot
  capsules; cel = offset dark capsules drawn FIRST. The fullscreen-SDF fs bodies
  (`fourier-field.glsl.ts:202-244` + `render.wgsl:219-292`) RETIRE WHOLESALE (clean break, no dual path).
- **Two backends** (~4–6 eng-days): GLSL (~1.5d — 5 small instanced vert/frag programs) + WGSL (~2d —
  instanced/vertex-pulling render pass over the UNCHANGED `curveSamples`/`chainTips` compute-filled storage
  buffers — the compute kernel stays byte-identical) + a shared geometry-builder leaf (~0.5d). Ships on BOTH
  engines (instancing is WebGL2-core, Safari-honest).
- **The ONE named quality residual:** the epicycle-join over-composite seam at 9× — fixed via
  `blendEquation MAX` on the epicycle layer OR union-primitive-per-arm (~0.5d).
- **The draw-bias is free on the ribbon** (bias the CPU sample eval, upload biased vertices) — W-FIELD-CORE
  owns the interaction layer; this wave preserves its shape-independence.

## §Work

- **STEP-0 (hard prerequisite):** re-seed a FRESH BI-HEAD worktree (`git log -1` must show the BI-era HEAD
  before ANY src edit — the pass-4 rig base was BD/4.2.0-era `99009e2a`; the measurement was BI-HEAD-faithful
  but the BUILD edits source).
- `src/components/custom/fourier-field/shaders/fourier-field.glsl.ts:202-244` — the fullscreen-SDF fs body
  RETIRES; the LOD-interim knobs (128-sample / DPR2 / cel-ON) land first, then the instanced ribbon programs.
- `src/components/custom/fourier-field/shaders/fourier-field.render.wgsl.ts:219-292` — the fullscreen loop
  RETIRES onto the instanced/vertex-pulling render pass; `fourier-field.compute.wgsl.ts` stays byte-identical
  (buffers-only).
- `src/components/custom/fourier-field/shaders/…` — the shared geometry-builder leaf (instanced capsule
  quads + head-halo quad + epicycle instances + cel offset); carry `proof:viz FB1` (the `RIBBON_TAIL_FRAC`
  WGSL-vs-TS mirror) through the rewrite.
- `src/components/custom/fourier-field/composables/useFourierField.ts:221` — hoist `computeFourierFit` out
  of the frame loop (recompute on spectrum/config change only) + the `resolveBudgetDpr` clamp (the (c)
  attribution — a co-fix, cheap).
- `FourierField.vue:179/:197` — kill the per-frame `--ff-head-xy`/`--ff-head-hue` `setProperty` restyle
  bridge (move head-tracking to a shader uniform channel — the (b) attribution).

## §Acceptance

Gate: **`proof:viz-fourier-ribbon`** (NEW; the G5 visual-parity gate) — born-RED against the current
fullscreen-SDF, GREEN at the ribbon landing.
- FB1 — the fullscreen-SDF fs bodies (glsl:202-244 + render.wgsl:219-292) DEFINITION-ABSENT (retired
  wholesale — no dual path per `proof:no-dual-path`).
- FB2 — the instanced ribbon programs present on BOTH backends; the compute kernel byte-identical (the WGSL
  buffers unchanged).
- FB3 — the `RIBBON_TAIL_FRAC` WGSL-vs-TS mirror holds through the rewrite (the `proof:viz` FB1 carry).
- FB4 — the per-frame `--ff-head-*` setProperty restyle bridge GONE; `computeFourierFit` hoisted out of the
  frame loop.
- FB5 — the epicycle-join seam fixed (`blendEquation MAX` / union-per-arm present).
- Self-test bite: a planted fullscreen per-pixel curve loop REDs; a planted per-frame `computeFourierFit`
  REDs.

## §π/DELTA

`tests-visual/viz-fourier-ribbon.spec.ts` (NEW; LOCAL real-GPU) + `W-FOURIER-RIBBON-DELTA.md`:
- **3 frozen-T diff-captures ribbon-vs-SDF, BOTH engines, BOTH modes** — pixel-identical by construction
  (measured covered-only meanAbs 2.47 Chr / 1.32 WK, 83–87% within 8/255; residual = AA-edge + the named
  9× epicycle seam, fixed).
- The GPU frame-cost readback proving the fragment-work collapse (O(covered_pixels)); the per-frame
  production absolute (un-amplified / GPU-timestamp instrument — the last measurement caveat closed at
  build) proving the ribbon rebuilds ≤ budget.
- The draw-bias shape-independence: the SAME biased curve-sample source feeds LOD and ribbon (re-verify at
  the swap; W-FIELD-CORE's interaction capture unchanged).
- Rides the W-PI-IN-CLOSE battery + the W-GESTALT-LEDGER-FILE motion/substrate verdict.

## §Obligations

- **Device run (SAF-1):** the WGSL/WebGPU-primary timestamp ABSOLUTE on real Safari 26 / Metal (Playwright
  cannot expose WebGPU timestamp queries; the SHAPE is source-resolved — `render.wgsl fs_main` = the same
  fullscreen SDF as GLSL, ratio transfers within ±20% storage-vs-uniform access — so this is a confirmation
  device-run, NOT a design question). `dis:safari-metal-verify` seam.
- **Whole-route sufficiency fence (recorded):** the ribbon fixes ONLY the fourier FILL; the live-studio ROUTE
  complaint ALSO needs W-AUTH-SHELL-BG's one-GL-per-route reduction (the leaked app-shell aurora is a
  co-equal term the ribbon does not touch). This wave does NOT claim it alone retires the route complaint.
- No cross-repo ask (fourier-field is a library viz; shader-internal rewrite; the WGSL/GLSL public surface
  unchanged).

## §Dispositions

- **cmd:aurora-medium-lazy** (CHRONIC) is a SEPARATE row (RETIRE recommended; GL fence identity) — NOT
  re-opened by the fourier perf pass; recorded, no re-book.
- The both-staged ship (LOD then ribbon) is ONE wave — no interim-arm shelf-ware survives (the LOD knobs are
  superseded by the ribbon in the same cut; the banked max-perf LOD arm re-triggers only on a measured weak
  device).
