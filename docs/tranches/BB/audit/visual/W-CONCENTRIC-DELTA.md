<!-- surface-paths: src/components/custom/concentric/Concentric.vue,src/components/custom/concentric/shaders/concentric.wgsl.ts,src/components/custom/concentric/shaders/concentric.glsl.ts -->
<!-- surface-hash: 4f21789b6d68d65831244abb6abb33bc20000896298e8faa100a52b575840a80 -->

# W-VIZ-SUITE DELTA — W-CONCENTRIC (the concentric viz)

The per-viz own-surface capture + the parity capture-pair for the LAST NEW WebGPU-first viz
of Batch V (closing the substrates band + the suite family doc). The migrated-viz rows
(aurora, goo-blob) carry their own parity dirs; the two NEW viz (dot-flow-field +
concentric) carry their own DELTAs.

## The viz — `<Concentric>` (`/concentric`)

A radial Fourier ring-interference field — concentric ellipsoid rings whose interference is
a sum of radial harmonics about one-or-more centers. The "3D-rendered-to-2D" look: an
ellipsoidal norm (`sqrt((dx/a)²+(dy/b)²)`, axis ratio `[1, 0.62]`) reads a tilted disc as
ellipses, and the two-center sum crosses into moiré beats where the ring families overlap.
The rings travel outward on the deep-water dispersion `ω = √(g·k)` — the SAME dispersion
law the dot-flow-field's Gerstner sum uses (the suite's ONE Fourier vocabulary). The library
DEFAULT is the warm-cream identity (a three-stop warm ramp — cream trough, amber mid, ember
crest); the demo themes the rings aurora-teal over an indigo ground (presets-in-consumers).

### Substrate

- **WebGPU primary** (`shaders/concentric.wgsl.ts`) — a pure fullscreen fragment pass (the
  full-screen-triangle `vs_main`, no vertex buffer — the aurora shape-class). `fs_main`
  evaluates `f(p,t)` per pixel (transcribing `composables/ringField.ts`) and maps the value
  through the shared `procedural-color.wgsl.ts` OKLCh ramp (the ONE color source). No
  compute pass, no particles.
- **WebGL2 GLSL fallback** (`shaders/concentric.glsl.ts`) — the aurora-class clean twin: the
  SAME fragment field evaluated by the SAME OKLCh ramp (splicing the shared
  `procedural-color.glsl.ts` chunk). Because concentric is a PURE fragment field, the
  fallback is the SAME math — parity `verified` (not `degraded`).

Both backends compose the SAME `createCanvasLifecycle` leaf via the `createGpuSubstrate`
picker (offscreen-pause, live-PRM freeze, consumer-owned DPR) — substrate-agnostic.

## The parity capture-pair (device-free structural proxy)

The parity table's `verified` concentric row points at `concentric-parity/`:

- `concentric-wgpu-primary.png` + `concentric-webgl2-fallback.png` — the ring-field raster
  rendered through the SAME `sampleRingField` evaluator BOTH backends evaluate, through the
  SAME OKLab-rectangular palette ramp. Concentric is a PURE fragment field (no
  compute/particles), so the field value AND the color mapping are numerically identical at
  every (p,t) → **ΔE mean/p99 = 0.0** (well within the calibrated bar mean ≤ 2.0 / p99 ≤
  5.0). A transcription drift between the WGSL/GLSL shaders and the JS evaluator, or a
  shared-color-chunk OETF/OKLCh transcription error, would surface here (the same class
  `proof:concentric` clause 3's round-trip asserts).
- `parity-record.json` — the recorded ΔE + the methodology + the captured hashes.

Regenerate via `node scripts/concentric-wgpu-parity-capture.mjs`.

## The own-surface live capture (rides W-REFLECT3)

The binding light+dark own-surface captures + the rings-render-and-interfere / animate /
PRM-freeze π readback ride `tests-visual/concentric.spec.ts` against the real
`/substrates/concentric` route (LOCAL-only — a real GPU + the demo + the GL/compute
context; CI proves ENROLLMENT via `proof:visual-runner`, the local `--run pi` close proves
the PAINT). The captures land at `docs/tranches/BB/audit/visual/concentric-delta/` with the
AZ-form freshness headers so `proof:live-verified-ledger --strict-freshness` can re-verify.
The binding Metal-GPU live capture-pair (the real WebGPU swap-chain readback vs WebGL2
`readPixels`) re-records the empirical rasterizer-drift ΔE at W-REFLECT3.

## Gestalt verdict (rides W-REFLECT3)

The `proof:ba-gestalt` substrates-band verdict reads the concentric field over its real grid
backdrop (the `/substrates/concentric` route, both modes). The wave closes
`complete_with_misses` if the field does NOT read as the reference ring-interference (a
placement/aesthetic judgement, not a pixel delta — the gestalt bar).
