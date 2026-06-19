# W-VIZ-DOTFLOW — the dot-flow field RETOPOLOGIZED (the anchored dot-matrix a LARGE wave sweeps through)

**Wave:** BC.W-VIZ-DOTFLOW · **Route:** `/substrates/dot-flow-field` · **Canvas:** `[data-testid="dot-flow-field-canvas"]`

## The gestalt (OLD noise → NEW sweeping)

The BB field was a free-advecting curl-noise particle cloud — the user's verdict: "absolutely
awful — does not form waves/shapes, a mess of NOISE." This wave inverts the TOPOLOGY (free
particles → an anchored dot-matrix + restoring spring) AND the coherence REGIME (octaves
6→3, λ₀ 2.4→2.5× the view, curl 0.6→0.12, windSpeed 1.0→0.3). The field reads as a CALM
regular lattice of small soft warm-cream dots that a single LARGE bright band sweeps slowly
through — the Claude co-work dot-matrix reference, warm-cream identity.

## Captured paint (dev-tools/Playwright headless, real WebGPU/SwiftShader, :5199)

Frames at `docs/tranches/BC/audit/visual/flow-field-delta/`:

- `flow-field-light.png` — a calm evenly-spaced warm-cream dot lattice; a soft diagonal band
  of brighter amber-tinted dots sweeps across it (the moving wave), the rest of the dots
  stable on their anchors. Mean lit-dot RGB (241.6, 240.1, 237.0) — **R≥G≥B warm-cream, NOT
  blue/teal.**
- `flow-field-dark.png` — a fine warm-cream dot lattice on a warm near-dark ground; a CLEAR
  bright diagonal band sweeps from upper-mid down to lower-right (the reference dot-matrix-
  spheres-on-dark aesthetic). Mean lit-dot RGB (55.0, 51.4, 48.7) — **R≥G≥B warm-cream over
  the dark page, NOT navy.**

A human reads "a calm dot grid with a large wave moving through, like the reference," NOT a
chaotic particle cloud. The teal-on-navy is GONE entirely (warm-cream identity; the
mono-dim-on-near-black + globe-mask reference is a demo preset).

## π readback (tests-visual/flow-field.spec.ts — chromium-headless-new, both modes)

```
✓ dot-flow-field — coherent sweeping lattice + stability (light)   3.4s
✓ dot-flow-field PRM freezes to one static frame (light)           1.4s
✓ dot-flow-field — coherent sweeping lattice + stability (dark)    3.2s
✓ dot-flow-field PRM freezes to one static frame (dark)            1.4s
4 passed
```

- **On-host paint (D9'):** `meanLum > 0.1` on a real GPU host — the "black void" arming
  concern closed.
- **Coherence / lattice-stability / sweeping-band:** the low-frequency-dominance ratio, the
  per-cell coverage drift (bounded — the lattice does not wander/streak), and the
  bright-cell centroid translation are all asserted (graceful headless floors; the binding
  gestalt is the captured frames).
- **PRM:** two frames apart are IDENTICAL (the lattice freezes mid-sweep, the shape held).

## Source gate (born-RED → GREEN)

`proof:viz-dotflow` — GREEN (F1 anchored topology + no reseed · F2 coherent regime · F3
JS↔WGSL↔GLSL round-trip · F4 no Canvas2D viz · F5 warm-cream identity + no teal/navy · F6
pointer wired). Born-RED on HEAD (the compute kernel had `reseed`, `useDotFlowField` bound
`useCanvas2D`, `buildWaveLadder` defaulted octaves=6, the pointer was unwired). The
`--selftest` reds every planted defect.

## Cross-wave gates (held green)

`proof:webgpu-everywhere` (dot-flow off the Canvas2D-primary list; the WGSL compiles — the
`let target` reserved-word fixed to `anchorTarget`) · `proof:viz-interaction` (dot-flow
WIRED ✓ velocity+accel) · `proof:pointer-velocity` (dot-flow a live consumer, 5 total) ·
`proof:gpu-substrate-single` (the dot-flow parity row resolves on disk, ΔE 0.0) ·
`proof:flow-field` (the BB colocation/round-trip gate stays green) · `proof:offscreen-pause`
· `proof:no-layout-animation` · `proof:colocation`.

## The binding live Metal-GPU capture

This headless capture is the self-verification (the warm-cream identity + the coherent
sweeping gestalt). The orchestrator's real-Metal `--run pi` capture is the terminal binding
evidence (the per-wave fresh-capture discipline, BC.W-GESTALT-FIRST).
