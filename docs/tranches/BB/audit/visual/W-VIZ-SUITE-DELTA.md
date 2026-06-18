<!-- surface-paths: src/components/custom/dot-flow-field/DotFlowField.vue,src/components/custom/dot-flow-field/shaders/flow-field.compute.wgsl.ts,src/components/custom/dot-flow-field/shaders/flow-field.render.wgsl.ts,src/components/custom/dot-flow-field/shaders/flow-field.glsl.ts -->
<!-- surface-hash: 3f631277b86b0083e4fc107f83065b5e9015a6b65cee6f8c299ccdd25828dc2e -->

# W-VIZ-SUITE DELTA — W-FLOWFIELD (the dot-flow-field viz)

The per-viz own-surface capture + the parity capture-pair for the FIRST NEW WebGPU-first
viz of Batch V. The migrated-viz rows (aurora, goo-blob) carry their own parity dirs
(`aurora-wgpu-parity/`, `goo-blob-wgpu-parity/`); the two NEW viz (dot-flow-field here,
concentric next) carry their own DELTAs.

## The viz — `<DotFlowField>` (`/dot-flow-field`)

Small TEAL dots over a DARK NAVY ground (the demo preset), seeded along undulating
streamlines, rippling in waves — a curl-noise flow field traced by advected particles,
where the scalar potential undulates as a Gerstner/Tessendorf sum-of-sines water-wave
field. The dots cluster denser where the field is calm and thin where it accelerates
(per-particle size rides `|v|`); the streamlines fold + braid like a river delta, sweeping
diagonally across the frame. The library DEFAULT is the warm-cream identity; teal-on-navy
is the demo preset (presets-in-consumers).

### Substrate

- **WebGPU primary** — the compute pass (`@compute @workgroup_size(64)`,
  `flow-field.compute.wgsl.ts`) advects the particle storage buffer through the analytic
  ∇⊥ψ velocity (transcribing `composables/flowField.ts`); the render pass
  (`flow-field.render.wgsl.ts`) draws instanced billboard quads (6 verts × N instances),
  tinting the soft dots through the shared `procedural-color.wgsl.ts` OKLCh ramp.
- **Canvas2D fallback** — the §3a-recorded CPU point cloud (`flow-field.glsl.ts`) steps the
  SAME `sampleVelocity()` evaluator (the ONE math source) over the SAME lifecycle leaf.

## The parity capture-pair (device-free structural proxy)

The parity table's `verified` flow-field row points at `flow-field-parity/`:

- `flow-field-wgpu-primary.png` + `flow-field-fallback.png` — the velocity-magnitude
  raster rendered through the SAME `sampleVelocity` evaluator BOTH backends transcribe (the
  WGSL compute kernel + the Canvas2D fallback). By construction the velocity field is
  numerically identical → **ΔE mean/p99 = 0.0** (well within the calibrated bar mean ≤ 2.0
  / p99 ≤ 5.0). A transcription drift between the WGSL kernel and the JS evaluator would
  surface here (the same class `proof:flow-field` clause 3's round-trip asserts). The
  per-particle dot density (GPU instancing vs CPU step count) is the recorded `degraded`
  delta, NOT the velocity-field parity this certifies.
- `parity-record.json` — the recorded ΔE + the methodology + the captured hashes.

Regenerate via `node scripts/flow-field-wgpu-parity-capture.mjs`.

## The own-surface live capture (rides W-REFLECT3)

The binding light+dark own-surface captures + the animate/streamline/PRM-freeze π readback
ride `tests-visual/flow-field.spec.ts` against the real `/substrates/dot-flow-field` route
(LOCAL-only, the real-GPU compute path). The spec writes `flow-field-delta/flow-field-{light,dark}.png`
on its run. The binding Metal-GPU live WebGPU compute+render swap-chain readback (vs the
Canvas2D readback) re-records the empirical rasterizer-drift ΔE at W-REFLECT3.

## Gestalt verdict (the close-class bar)

The wave closes `complete_with_misses` if the dot-flow-field does NOT read as the reference
flowing dot-wave (a placement/aesthetic judgement) — the π live readback + this own-surface
DELTA capture is the gestalt bar, re-earned on a fresh capture at W-REFLECT3. The
`proof:ba-gestalt` substrate-band verdict reads the new viz over its real backdrop.
