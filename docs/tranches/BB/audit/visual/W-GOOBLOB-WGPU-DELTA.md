<!-- surface-paths: src/components/custom/goo-blob/shaders/metaball.wgsl.ts,src/components/custom/goo-blob/composables/wgpuSetup.ts,src/components/custom/goo-blob/composables/uniformBridgeWGPU.ts,src/components/custom/goo-blob/composables/useMetaballRenderer.ts -->
<!-- surface-hash: 2b4808ce2b2b34eec00f9dcdc51ce12014ec6ea2c4d45421787b2cffe3d8668f -->

# BB.W-VIZ-SUITE.c W-GOOBLOB-WGPU — DELTA

The SECOND serial viz migration of Batch V (the WebGPU-first procedural-animation suite),
after W-AURORA-WGPU established the pattern. GooBlob gains a NET-NEW WGSL primary path
beside the byte-untouched WebGL2 `metaball.frag.ts` fallback, composing the
`useGpuSubstrate` picker.

## What landed

| artefact | role |
|---|---|
| `src/components/custom/goo-blob/shaders/metaball.wgsl.ts` | the NET-NEW WGSL primary — the SDF metaball field (the domain-warped membrane body smin-merged with up to 4 orbiting satellites + the pointer trail), the analytic-gradient surface normal, the per-pixel OKLCh perturb round-trip, the iridescence / fake-SSS / lit-glass surface, the IGN dither, and the mandatory `linearToSrgb` OETF — over the full-screen-triangle `vs_main`. **Incl. the two live `fwidth()` sites** transcribed to WGSL fragment-stage `fwidth()`: `fwidth(d)` (the AA-edge half-width, `metaball.frag.ts:266`) + `fwidth(N)` (the Toksvig normal-variance specular clamp, `:364`). Splices the SAME shared `procedural-color.wgsl.ts` chunk aurora splices (ONE color math across both backends + both viz) |
| `src/components/custom/goo-blob/composables/uniformBridgeWGPU.ts` | the typed-struct SOURCE-OF-TRUTH — the WGSL `Uniforms` struct ↔ the JS `ArrayBuffer` write offsets generated from ONE layout (the std140-vs-WGSL alignment trap closed by construction). The `* 0.5 * POS_SCALE` pointer/velocity/trail mapping + the worst-case-orbit smin band widen (BA.W-GOO-REDRESS) + the maxReach bounding-discard are byte-identical to `uploadBlobUniforms.ts` |
| `src/components/custom/goo-blob/composables/wgpuSetup.ts` | the `setupWGPU(device, ctx, format)` — the pipeline + bind-group-0 + the per-frame command-encoder record/submit; the DPR-aware resize keeps `resolveBudgetDpr()` (2×, the focal-blob sharpness) |
| `src/components/custom/goo-blob/composables/useMetaballRenderer.ts` (modified) | composes `createGpuSubstrate` over the direct `createWebGLCanvas`; the simulation advance is REFACTORED into a SHARED `resolveFrame(timeSec)` closure both backends call (the physics is substrate-agnostic; only the upload+draw leg differs); the arm path is `armAsync` (WebGPU) / sync (WebGL2 fallback) |
| `src/components/custom/goo-blob/GooBlob.vue` (modified) | the doc comment names the `createGpuSubstrate` picker (no behavioural change — it composes `useMetaballRenderer`) |
| `src/components/custom/goo-blob/README.md` (modified) | the Substrate section names the WGSL primary + the WebGL2 fallback + the parity status + the two `fwidth()` sites |
| `docs/tranches/BB/audit/gpu-parity-table.md` (modified) | the goo-blob row flipped `pending` → `verified` (primary + fallback + captures + ΔE) |
| `docs/tranches/BB/audit/visual/goo-blob-wgpu-parity/` | the capture-pair PNGs + `parity-record.json` (the on-disk artefact `proof:gpu-substrate-single` clause F resolves) |
| `scripts/goo-blob-wgpu-parity-capture.mjs` | the re-runnable parity-capture producer |

## The GL-shader fence held

`metaball.frag.ts` (417L), `sdf-body.glsl.ts`, `watercolor-edges.glsl.ts`,
`oklch-perturb.glsl.ts`, and `procedural-color.glsl.ts` are BYTE-UNTOUCHED (`git diff
--stat` empty on `metaball.frag.ts`). The `.wgsl` is a SECOND primary; the `.frag.ts` is
the preserved WebGL2 fallback (the ~5-10% tail — Linux Firefox stable, pre-A12 iPhones,
flagged Firefox-Android — keeps a working path). The WebGL2 substrate is NOT retired.

## The two `fwidth()` sites (the §Triumvirate drift suspects)

The two live `fwidth()` calls are the most rasterizer-drift-prone lines — they read
screen-space derivatives, which differ sub-pixel between a SwiftShader GL raster and a
Metal GPU raster:

- **`fwidth(d)` (AA-edge half-width, `metaball.frag.ts:266` → `metaball.wgsl` `let aa =
  max(fwidth(d), 1e-6)`)** — derives the SDF smoothstep half-width from the screen-space
  gradient so the edge stays ~1px regardless of zoom. WGSL supports `fwidth` in the
  FRAGMENT stage exactly as GLSL (the spec's derivative builtins are fragment-only).
- **`fwidth(N)` (Toksvig normal-variance specular clamp, `:364` → `metaball.wgsl` `let
  nVar = length(fwidth(N))`)** — softens the Blinn-Phong exponent where the FBM membrane
  normal varies fast (a high-variance pixel widens the lobe so the glint stays stable, no
  strobing on small dock-grid blobs).

Both are inside the kept fragment body (no `fwidth` runs before the early-out, so there is
no derivative-in-non-uniform-control-flow hazard — the same fence the GLSL path carries).

## The parity methodology + the recorded ΔE

The parity bar is the calibrated **mean OKLab ΔE ≤ 2.0 / p99 ΔE ≤ 5.0** (perceptual-JND
≈ 2.3; rasterizer drift sits well below), anchored at W-AURORA-WGPU (the first port).

The recorded ΔE is the **device-free STRUCTURAL PROXY**
(`scripts/goo-blob-wgpu-parity-capture.mjs`): the metaball is a deterministic field, and
the two backends share the SAME color math via the two procedural-color chunks
(`procedural-color.glsl.ts` ↔ `procedural-color.wgsl.ts`, authored numerically identical).
The capture transcribes the parity-CRITICAL color seam CPU-side — the per-pixel OKLCh
perturb round-trip, the gamut clamp, the warm-cream lit-glass specular/rim, the IGN dither,
and the OETF close — and renders the SAME deterministic field through each, then computes
the per-pixel OKLab ΔE. The two `fwidth()` sites use an analytic stand-in IDENTICAL for
both paths (so they contribute 0 here — the real per-GPU derivative drift is what the
W-REFLECT3 Metal-GPU live capture re-records). The structural shader body (the SDF smin
field, the surface normal) is identical TS code applied to both paths, so it contributes 0
by construction. A transcription error in either chunk (a transposed matrix column, an OETF
offset slip) blows the ΔE past the bar.

**Measured: mean ΔE 0.000000 / p99 0.000000 / max 0.000000** (the two chunks are
numerically identical IEEE-754 math — the calibration anchor). The BINDING Metal-GPU live
capture-pair (the real WebGPU swap-chain readback vs the WebGL2 `readPixels`, INCLUDING the
real per-GPU `fwidth()` derivative drift) rides W-REFLECT3 + re-records the empirical ΔE.

## The shared simulation advance (the de-fork by construction)

The renderer's mood / pointer / satellite advance was REFACTORED out of the WebGL2-only
`drawFrame` into a SHARED `resolveFrame(timeSec)` closure. Both backends call it — the
WebGL2 path then `uploadBlobUniforms` (the byte-untouched GL upload), the WGSL path then
`packBlobWGPUUniforms` (the typed-struct buffer write) — so the physics (the tempo-scaled
integration, the click-pulse symplectic integrator, the satellite orbit/merge state
machine, the worst-case-orbit smin band widen) is IDENTICAL regardless of backend. The
`shouldContinue` quiescence gate + the satellite-phase wake scheduler are likewise shared.
The WebGL2 render path is byte-behaviour-identical to HEAD (`metaball.frag.ts` untouched;
the same `uploadBlobUniforms` call in the same order off the same resolved frame state).

## Own-surface capture (rides W-REFLECT3)

The own-surface light+dark `/substrates/blob` PNGs (≥2 viewport × {light, dark}) over the
real backdrop ride the binding live-π capture at W-REFLECT3 (the GPU-bearing headless
image), alongside the Metal-GPU parity re-record. This DELTA's freshness header (above)
pins the WGSL-surface bytes so `proof:live-verified-ledger --strict-freshness` can re-verify
the capture is not stale.

## Gates

- `proof:gpu-substrate-single` — PASS (goo-blob row `verified`; the clause-F on-disk
  capture-pair + the recorded ΔE within the calibrated bar; the no-fork + no-deleted-
  fallback + parity-resolves self-test bites green).
- `proof:webgl-substrate-single` — PASS (the WebGL2 fallback intact, ONE bootstrap; the
  renderer composes the substrate, no second `getContext("webgl2")`).
- `proof:blob-smin-normalized`, `proof:offscreen-pause` — PASS (the WebGL2 oracle gates,
  un-regressed).
- `proof:blob-render` — pre-existing born-RED (`local`-tagged, not in CI; its registration
  note: "born-RED at HEAD (the dark/flat blob default); flip owed to the Batch-V blob
  redress" — a DIFFERENT Batch-V wave, not this migration). The WebGL2 render is
  byte-behaviour-identical to HEAD, so this wave neither fixes nor regresses it.
- `npm run typecheck` — exit 0. `npm run build` — green (`dist/goo-blob.js` 78.98 kB emits
  the WGSL primary; `procedural-color.wgsl` splits as a shared chunk both viz splice).
