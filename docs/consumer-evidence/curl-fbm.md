# curlFBM — the shared curl-noise flow chunk

## Artefact path

`src/composables/glass/webgl/shaders/flow.glsl.ts` (the `CURL_FBM_GLSL` GLSL string
export — beside `procedural-color.glsl.ts`, the AV.W2 shared-chunk precedent).

## What it is

A pure GLSL string chunk exporting `curlFBM(vec2 p)` — the 2D curl of a scalar fbm
potential (Bridson's "Curl-Noise for Procedural Fluid Flow", SIGGRAPH 2007). In 2D a
scalar potential ψ generates the divergence-free field ∇×ψ = (∂ψ/∂y, −∂ψ/∂x); the
partials are central finite differences of a host-supplied `potentialFBM`. The chunk
owns ONLY the basis-agnostic curl operator — the HOST shader owns the noise basis (it
defines `potentialFBM` against its own fbm), so aurora keeps its 2.02-lacunarity loop
and the blob/grid surfaces keep theirs. The chunk imports NO value.js and declares no
uniforms.

## Verdict

`keep — shared chunk with the ≥3-consumer bar BOOKED (consumer #1 LIVE).` The
shared-glsl-chunk bar mirrors the AV.W2 `procedural-color.glsl.ts` precedent: a
genuinely-shared-AND-identical math leaf the procedural surfaces splice. The curl
operator is the SOTA flow-field warp every procedural-flow surface needs.

## Consumers

- **#1 — LIVE NOW (BB.B1 aurora-curl-warp, the `.frag` arm).** Aurora's domain warp
  gains an OPT-IN `warpMode: "curl"` (`uWarpMode == 3`) branch that advects the color
  field along `curlFBM`. The default config (`warpMode: "fbm"`) is byte-unchanged — the
  curl operator is consumed ONLY on the opt-in branch, so every existing `proof:aurora-*`
  gate + the W-AURORA-WGPU default-smooth parity surface stays byte-equivalent.

  ```bash
  grep -rln 'CURL_FBM_GLSL\|curlFBM' \
    src/components/custom/aurora/constants/shaders/aurora.frag.ts
  #   → aurora.frag.ts (splices the chunk + wraps fbm as potentialFBM + the uWarpMode==3 branch)
  ```

- **#2 — BOOKED (B5 paper-grid-breathe, `<Card grid animated>`).** The ¼-res
  curl-driven grid breathe (a procedural-tail wave, after W-FLOWFIELD): the animated
  paper-grid offsets sample the SAME `curlFBM` so the grid breathes along a
  divergence-free flow rather than a source-y noise gradient. PRM-static, ≤4ms compute.

- **#3 — BOOKED (W-FLOWFIELD flow-field viz).** The flow-field visualization (a 6th
  procedural-viz suite member): the streamline integrator advects particles along the
  curl field, the canonical curl-noise demo surface.

The WGSL arm (`aurora.wgsl.ts` curl + a shared `flow.wgsl.ts`) is the PROCEDURAL TAIL,
booked AFTER the viz chain — `aurora.wgsl.ts` is byte-untouched this cut and degrades a
`warpMode: "curl"` config to `fbm` (the WGSL warp dispatch falls through to the fbm
default for `warpMode == 3`), so the WebGPU default-smooth parity surface stays green.

## Re-runnable bar check

```bash
# the live consumer (#1):
grep -rln 'flow\.glsl\|CURL_FBM_GLSL' src/ | grep -v '/shaders/flow\.glsl\.ts$'
#   → src/components/custom/aurora/constants/shaders/aurora.frag.ts
```

The ≥3-consumer bar is the BOOKED form (consumer #1 live, #2/#3 named with their owning
waves) — the shared-chunk escape the `procedural-color.glsl.ts` precedent established.
`proof:aurora-curl-warp` asserts the booking is recorded here.
