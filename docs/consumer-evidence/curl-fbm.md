# curlFBM — the shared curl-noise flow chunk

## Artefact path

`src/composables/glass/webgl/shaders/flow.glsl.ts` (the `CURL_FBM_GLSL` GLSL string
export) + `src/composables/glass/webgl/shaders/flow.wgsl.ts` (the `CURL_FBM_WGSL` WGSL
twin) — ONE curl operator per backend.

## What it is

A pure shader-string chunk exporting `curlFBM(vec2 p)` — the 2D curl of a scalar fbm
potential (Bridson's "Curl-Noise for Procedural Fluid Flow", SIGGRAPH 2007). In 2D a
scalar potential ψ generates the divergence-free field ∇×ψ = (∂ψ/∂y, −∂ψ/∂x); the
partials are central finite differences of a host-supplied `potentialFBM`. The chunk
owns ONLY the basis-agnostic curl operator — the HOST shader owns the noise basis (it
defines `potentialFBM` against its own fbm), so aurora keeps its 2.02-lacunarity loop
and the grid surfaces keep theirs. The chunk imports NO value.js and declares no
uniforms.

## Verdict

`keep — shared chunk with the ≥2-consumer bar MET on BOTH backends.` The shared-chunk
bar mirrors the `procedural-color.glsl.ts` precedent: a genuinely-shared and identical
math leaf the procedural surfaces splice.

## Consumers

- **aurora — the `warpMode: "curl"` domain warp, BOTH backends.** Aurora's domain warp
  carries an opt-in `warpMode: "curl"` (`uWarpMode == 3`) branch that advects the color
  field along `curlFBM`. The default config (`warpMode: "fbm"`) is byte-unchanged.
  - WebGL2: `src/components/aurora/constants/shaders/aurora.frag.ts` splices
    `CURL_FBM_GLSL`.
  - WebGPU: `src/components/aurora/constants/shaders/aurora.wgsl.ts` splices
    `CURL_FBM_WGSL`.

- **liquid-grid — the grid warp, BOTH backends.** The `<LiquidGrid>` surface's domain
  warp samples the SAME `curlFBM` (the IQ domain-warp substitution
  g(uv) = uv + curlWarp(uv,t)) so the grid breathes along a divergence-free flow rather
  than the source-y gradient a raw fbm gradient produces.
  - WebGL2: `src/components/liquid-grid/shaders/liquid-grid.glsl.ts`.
  - WebGPU: `src/components/liquid-grid/shaders/liquid-grid.wgsl.ts`.

## Re-runnable bar check

```bash
grep -rln 'CURL_FBM_GLSL\|CURL_FBM_WGSL' src/ --include='*.wgsl.ts' --include='*.glsl.ts' --include='*.frag.ts' | grep -v '/shaders/flow\.'
#   → src/components/aurora/constants/shaders/aurora.frag.ts
#   → src/components/aurora/constants/shaders/aurora.wgsl.ts
#   → src/components/liquid-grid/shaders/liquid-grid.glsl.ts
#   → src/components/liquid-grid/shaders/liquid-grid.wgsl.ts
```

Two independent component families on both backends — the ≥2 bar is MET.
