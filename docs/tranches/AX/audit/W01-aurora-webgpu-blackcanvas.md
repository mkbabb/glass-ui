# AX.W01 finding — the live aurora black-canvas (WebGPU `var<uniform>` dynamic-index miscompile)

**Severity**: BLOCKER. **Routes to**: AX.W01 (aurora core fix). **Confirmed live** (Playwright, M-series + navigator.gpu).

## Root cause (definitive, pixel-level)

On a WebGPU-capable machine the live `<Aurora>` binds the **WebGPU backend** (W7b, commit `c17b74c`) — the
canvas carries a `webgpu` context (NOT `webgl2`), `aurora-canvas--armed`, opacity 1 — and renders **pure black
`[0,0,0,255]`**; only the DOM `NucleiOverlay` rings show. The 11 preset thumbnails bake **vivid + correct**
because `usePresetThumbnails.ts` uses `createAurora(..., {mode:'capture'})`, which is **WebGL2-only** (never runs
the WebGPU swap), and the WebGL2 fragment path is correct.

The divergence is a **Tint→Metal codegen miscompile of DYNAMIC indexing into a `var<uniform>` array**:

- `aurora.wgsl.ts:74-76` declares `palette: array<vec4f,8>`, `nucleiPos: array<vec4f,6>`,
  `nucleiMod: array<vec4f,6>` inside the `var<uniform> U: Uniforms` struct (`:79`).
- Every read uses a **runtime (non-constant-foldable) index**: `samplePalette` → `U.palette[i0]`/`U.palette[i1]`
  with `i0=i32(floor(clamp(id,0,1)*f32(U.stopCount-1)))` (`:117-123`); `nucleiField` loops `U.nucleiPos[i]`/
  `U.nucleiMod[i]` with a runtime break-on-`n` (`:146-155`).
- **Proven on the live Metal-3 device:** dynamic-indexing a `var<uniform> array<vec4f>` returns `[0,0,0,0]`,
  while the IDENTICAL access from `var<storage,read> array<vec4f>` reads `[93,185,191,255]`. Bisecting the real
  assembled `AURORA_WGSL`: `fs_rawstop` (constant index `palette[0]`) = correct blue `[81,179,208]`;
  `samplePalette(0.5)` (runtime `i0=1,i1=2`) = BLACK; `nucleiField` collapses to `paletteId≈0.008` → samples a
  zeroed palette → black. The color MATH (OETF / OKLab matrices / aces) is correct in isolation (`fs_roundtrip`).

This is **NOT a palette/color regression** — it is a **WGSL address-space bug**: dynamically-indexed arrays must
live in the `storage` address space, not `uniform`, on Apple/Metal (a known Tint/WebGPU portability hazard). The
WGSL header comment even claims "a storage buffer is dynamically sized" yet the code binds `var<uniform>` — **the
intent was storage, the implementation is uniform.**

## Gestalt fix (idiomatic WebGPU, no per-driver branch)

Move the three dynamically-indexed arrays out of the uniform struct into a single read-only **STORAGE** buffer:

- Split `Uniforms` into (a) a small scalar-only `var<uniform>` block (the 16 scalars time…alpha — all
  constant-indexed, safe in uniform) and (b) `struct Field { palette: array<vec4f,8>, nucleiPos: array<vec4f,6>,
  nucleiMod: array<vec4f,6> }` bound `var<storage, read>` at a second binding.
- `createGPUAuroraSetup` (gpuRuntime.ts): allocate the field as `GPUBufferUsage.STORAGE | COPY_DST` + add the
  bind-group entry. `packGPUUniforms` (uniformBridge.ts): same Float32 packing, write the array region to the
  storage buffer (the std140 16-byte vec4 stride is already storage-correct).
- Free win: storage is runtime-sized → **lifts the MAX_STOPS / MAX_NUCLEI caps** the WGSL header already aspired
  to. The whole class closes because storage dynamic-indexing is well-defined on every WebGPU backend.

## Two compounding findings

1. **Gate-philosophy gap (the cardinal AX lesson).** Every WebGPU gate is CPU/structure-only: `proof:aurora-wgsl-
   equivalence` asserts a hand-transcribed WGSL→TS *port* against a GLSL oracle to 1e-6 (no GPUDevice);
   `proof:webgpu-substrate-single` / `proof:aurora-backend-fallback` are regex/AST checks. **None render a real
   GPU frame**, so the Metal miscompile is invisible. **Fix:** a real-GPU render gate `proof:aurora-webgpu-render`
   (Dawn/SwiftShader headless or a Playwright+Chrome WebGPU lane) that instantiates `createGPUCanvas`, draws
   DEFAULT + each preset at t=1, reads back the centre pixel, asserts a non-black luma floor AND parity-within-
   tolerance vs the WebGL2-baked frame. Converts the contract from "the TS port matches" to "the real device
   paints the same image as WebGL2" — the only assertion that would have caught this.

2. **WGSL twin is REDUCED-PARITY even once unblocked.** `nucleiField` is isotropic-only (drops the GLSL
   anisotropic Gaussian); no warp-mode dispatch (fbm/cellular/hybrid), no flow field, no cursor swirl/velocity,
   no mediums (pastel/watercolor/oil/crayon/vangogh/oil-pastel ALL absent). So the WebGPU path is not visual
   parity with WebGL2 — AX must either reach parity or gate WebGPU OFF by default until it does.

## AX.W01 disposition

The dock is the headline (§1), but **AX.W01 = the aurora core fix is co-headline** — it is a one-surface,
high-confidence, fully-root-caused storage-buffer transposition + the real-GPU render gate. Strong candidate to
also **default the live `<Aurora>` to the WebGL2 path** until the WebGPU twin reaches full medium parity (the
WebGL2 single-pass is the tested, correct, universal renderer — DESIGN.md invariant 8).
