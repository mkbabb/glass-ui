# W-AUR-WEBGPU-DECIDE — DELTA (deletion-proof; Branch A · RETIRE)

**Disposition: Branch A (RETIRE) fired. Branch B (RESURRECT) marked N/A.**

Per `RESEARCH.md` §6 (the decision row, line 235): *"RETIRE the medium-less WGSL twin
(no named consumer route binds the van-Gogh medium full-bleed at AY close)."* No hero route
binds the Kuwahara painterly finish at HEAD, so the conditional RESURRECT escape does not
fire — Branch B's clauses are N/A.

This is a **deletion-proof wave — NO live own-surface DELTA owed.** RETIRE removes a DEAD
render path: the live aurora was ALWAYS served by the single-pass WebGL2 fragment shader
(the lever was permanently `false`), so deleting the WGSL/WebGPU twin moves zero rendered
pixels. The no-pixel-change evidence is the EXISTING committed aurora set
`docs/tranches/AX/audit/visual/W18-aurora-{desktop-light,desktop-dark}.png` (unchanged;
the live WebGL2 aurora renders identically pre- and post-deletion).

## What was deleted (root-and-branch)

| File | Lines | Action |
|---|---|---|
| `src/components/custom/aurora/constants/shaders/aurora.wgsl.ts` | 235 | DELETED |
| `src/components/custom/aurora/composables/gpuRuntime.ts` | 181 | DELETED |
| `src/composables/glass/createGPUCanvas.ts` | 140 | DELETED |
| `scripts/proof-aurora-wgsl-equivalence.mjs` | — | DELETED |
| `scripts/proof-aurora-noise-hash-equivalence.mjs` | — | DELETED |
| `scripts/proof-aurora-backend-fallback.mjs` | — | DELETED |
| `scripts/proof-webgpu-substrate-single.mjs` | — | DELETED |
| `scripts/proof-aurora-webgpu-render.mjs` | — | DELETED |
| `tests/composables/glass/backend-equivalence.test.ts` | — | DELETED |
| `tests/components/custom/aurora/aurora-color.wgsl-port.ts` | — | DELETED |
| `tests/components/custom/aurora/noise-hash-equivalence.test.ts` | — | DELETED (vitest arm of the deleted noise-hash gate; read the now-gone `PCG_HASH_WGSL`) |
| `tests/components/custom/aurora/noise-hash.glsl-port.ts` | — | DELETED (oracle consumed only by the deleted spec) |
| `tests-visual/aurora-webgpu-render.spec.ts` | — | DELETED |

## What was carved (mixed files — GLSL/shared half kept, GPU/WGSL half removed)

- `procedural-color.glsl.ts` — removed the WGSL-twin export block (`OETF_WGSL`,
  `FBM_ROT_WGSL`, `OKLCH_MATRICES_WGSL`, `PALETTE_RAMP_WGSL`, `PCG_HASH_WGSL`); every
  `*_GLSL` export STAYS. 486 → 294 lines. Cross-ref comments reconciled (no GLSL/WGSL
  twin narration).
- `uniformBridge.ts` — removed `WGPU_UNIFORM_FLOATS`, `WGPU_FIELD_FLOATS`,
  `packGPUUniforms`; the shared `MEDIUM_ID`/`resolveMediumId`/`WARP_ID`/`HUE_PATH_ID` +
  `createUniformBridge` (the live GLSL path) STAY.
- `runtime.ts` — removed the `gpuDevice?` option + the `createGPUCanvas`/`createGPUAuroraSetup`
  imports; collapsed the ternary to the unconditional `createWebGLCanvas` arm.
- `useAurora.ts` — removed the `resolveRenderModeAsync` import + the past-first-paint
  WebGPU probe-and-swap; collapsed to a direct `armRuntime()`. The sync `resolveRenderMode`
  tier decision STAYS.
- `renderMode.ts` — removed `WEBGPU_PARITY`, `AuroraSubstrate`, `isFallbackAdapter`,
  `resolveRenderModeAsync`. `AuroraRenderMode` + `resolveRenderMode` (the live `webgl|css|auto`
  sync tier) STAY.

## Surviving gates reconciled by-irrelevance (kept GREEN)

- `proof:offscreen-pause.mjs` — struck the WebGPU-dispatch comment; the WebGL2 park clause stays.
- `proof:design-md-current.mjs` — removed the `WEBGPU-RELAX` marker (DESIGN.md no longer names
  the WebGPU relaxation; it records the EXCISE). GREEN.
- `proof:aurora-fill-resize.mjs` — removed the `gpuRuntime.ts` resize arm (the file is gone);
  the WebGL2 `runtime.ts` arm stays. GREEN.
- `pi-manifest.ts` + the 3 visual-spec comments — struck the `WEBGPU_PARITY=false` lever
  references (the live aurora is WebGL2 unconditionally; no lever to disclose).

## Docs reconciled (the doc-currency proof — Hard Gate clause 4)

- `README.md` — already partly reconciled by a prior wave; reworded "no WGSL twin ships" →
  "the WebGL2 fragment path is the sole renderer" (to clear the `wgsl twin` forbidden token).
- `DESIGN.md` — struck the `### The substrate — WebGPU-first with the WebGL2 fallback` section,
  the WebGPU `wake` interactivity arm, and re-stated the Δ-ledger (Δ09 = historical intent;
  Δ09a = the terminal EXCISE; Δ10 = single GLSL ramp source). No stale restoration/parity/twin
  phrasing survives.

## Hard Gate evidence (Branch A — all GREEN)

| Clause | Check | Result |
|---|---|---|
| 1 — deletion proof | `grep aurora.wgsl --include=*.ts/*.vue/*.mjs src/ scripts/ tests/ tests-visual/` (excl. shared `gates.mjs`) | **0 hits** |
| 1 — files gone | `find src -name aurora.wgsl.ts -o -name gpuRuntime.ts -o -name createGPUCanvas.ts` | **0 files** |
| 1 — symbols gone | `grep WEBGPU_PARITY\|resolveRenderModeAsync\|AuroraSubstrate\|packGPUUniforms\|_WGSL src/` | **0 hits** |
| 2 — gate-removal | `grep <5 gate ids> gates.mjs package.json` | residue ONLY in the SHARED `gates.mjs` (4 objects, lines 342-365) + `package.json` (632-636) — REPORTED to orchestrator |
| 3 — build/type | `npx vue-tsc --noEmit` · `npm run build` | **exit 0 · exit 0** |
| 4 — doc-reconciliation | `grep -iE "restoration wave\|until.W14\|WebGPU.gated OFF\|WEBGPU_PARITY\|WebGPU-first\|gated OFF by default\|W14.finalize\|wgsl twin" README.md DESIGN.md` | **0 hits** |
| 5 — runtime canary | `proof:aurora-atoms-roundtrip` · `proof:aurora-oklch-interp` · `proof:aurora-space-gamma` | **all exit 0** (WebGL2 color/atoms path byte-identical post-deletion) |
| — verify-export | `npm run verify-export-types` | **exit 0** (no twin in the export surface) |
| — unit tests | `vitest run tests/components/custom/aurora tests/composables/glass` | **74/74 passed** |

## Named successor

NONE — the twin is retired terminally. Any future WebGPU work opens fresh with a named
consumer (a clean greenfield re-introduction; no scaffold to resurrect).
