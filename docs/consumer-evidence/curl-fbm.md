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

`keep — shared chunk with the ≥2-consumer bar MET (both consumers LIVE).` The
shared-glsl-chunk bar mirrors the AV.W2 `procedural-color.glsl.ts` precedent: a
genuinely-shared-AND-identical math leaf the procedural surfaces splice. The curl
operator is the SOTA flow-field warp every procedural-flow surface needs. (The
originally-booked consumer #3 — the dot-flow-field viz — was DELETED at
BI.W-VIZ-DELETIONS; the bar re-bases onto the ≥2 aurora + paper-grid consumers.)

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

- **#2 — LIVE NOW (BC.W-VIZ-PAPERGRID, the liquid paper-grid; the booked B5 paper-grid-breathe
  DISCHARGED).** The `<PaperGrid>` viz's
  domain warp samples the SAME `curlFBM` (the IQ domain-warp substitution g(uv) = uv +
  curlWarp(uv,t)) so the grid breathes along a divergence-free flow rather than the source-y
  noise gradient a raw fbm gradient produces. BOTH backends consume it — the WebGL2 fallback
  splices the GLSL `CURL_FBM_GLSL` (`flow.glsl.ts`); the WebGPU primary splices the NEW WGSL
  `CURL_FBM_WGSL` (`flow.wgsl.ts` — paper-grid is the FIRST WGSL curl consumer, minting the
  booked procedural-tail WGSL chunk). PRM-static, a ≤8-tap fragment (the two counter-flow
  curl terms), no compute.

- **#3 — DELETED (BI.W-VIZ-DELETIONS).** The flow-field (dot-flow-field) viz was the
  originally-booked consumer #3 (its `flowField.ts` `sampleVelocity` composed the SAME
  `curlFBM` operator). The 30+-attempt viz family is RETIRED by user order (clean break, no
  alias); consumer #3 drops. The shared `curlFBM` operator + `flow.glsl.ts`/`flow.wgsl.ts`
  KEEP — paper-grid (#2) consumes them, so the chunk is not orphaned.

With consumer #1 (aurora-curl-warp LIVE) + #2 (paper-grid, the FIRST WGSL consumer), the
≥2-consumer bar is MET — the ≥2 `procedural-color.glsl.ts` shared-chunk precedent.

The WGSL curl arm is now LIVE for paper-grid (`flow.wgsl.ts` minted, the FIRST WGSL curl
consumer). `aurora.wgsl.ts` stays byte-untouched this cut and degrades a `warpMode: "curl"`
config to `fbm` (the WGSL warp dispatch falls through to the fbm default for `warpMode == 3`),
so the WebGPU default-smooth parity surface stays green; the aurora WGSL curl is the booked
procedural tail.

## Re-runnable bar check

```bash
# the live consumer (#1):
grep -rln 'flow\.glsl\|CURL_FBM_GLSL' src/ | grep -v '/shaders/flow\.glsl\.ts$'
#   → src/components/custom/aurora/constants/shaders/aurora.frag.ts
```

The ≥2-consumer bar is MET — both surviving consumers are LIVE (#1 aurora-curl-warp, #2
paper-grid) — the shared-chunk escape the `procedural-color.glsl.ts` precedent established,
now discharged onto the ≥2 bar (consumer #3, the flow-field viz, DELETED at
BI.W-VIZ-DELETIONS). `proof:aurora-curl-warp` asserts the ≥2 bar is recorded here;
`proof:viz-papergrid` asserts paper-grid is the FIRST WGSL curl consumer (it mints +
splices `flow.wgsl.ts`).
