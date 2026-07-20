// The shared curl-noise flow chunk, WGSL twin (`curlFBM`).
//
// The WGSL twin of `flow.glsl.ts`'s `CURL_FBM_GLSL`. The GLSL chunk + this WGSL chunk
// are ONE curl operator per backend (the divergence-free 2D curl of an fbm potential —
// Bridson's "Curl-Noise for Procedural Fluid Flow", SIGGRAPH 2007).
//
// Mechanism (mirrors flow.glsl.ts / procedural-color.wgsl.ts): the `export const`
// is a `/* wgsl */` template-literal STRING the `.wgsl.ts` modules interpolate
// (`${CURL_FBM_WGSL}`) into their own shader source at module load. NO bundler step
// — the emitted shader is character-identical to a hand-inlined one (the splice
// boundary is the only diff).
//
// THE DEPENDENCY contract (the splice-order law — identical to the GLSL chunk):
// `curlFBM` calls a `potentialFBM` scalar-fbm function the HOST shader MUST define
// BEFORE this chunk is spliced (the host owns the noise basis; this chunk owns ONLY
// the curl operator, which is basis-agnostic). The chunk imports NO value.js +
// declares no uniforms — it is a pure WGSL string.
//
// Live WGSL consumers: aurora's `warpMode: "curl"` domain warp (aurora.wgsl.ts) and
// the liquid-grid warp (liquid-grid.wgsl.ts). Recorded in
// docs/consumer-evidence/curl-fbm.md.

// ── Curl-noise flow (WGSL) ──────────────────────────────────────────────────────
// The 2D curl of a scalar fbm potential. `potentialFBM(vec2f) -> f32` MUST be defined
// by the host shader BEFORE this splice (it owns the noise basis; this chunk owns only
// the curl operator). Central-difference partials at CURL_EPS; the field is
// divergence-free by construction (∂/∂x of ∂ψ/∂y minus ∂/∂y of ∂ψ/∂x cancels).
//
// NOTE the WGSL splice-order: a WGSL function may only call a function declared EARLIER
// in the module (no forward declaration like GLSL's prototype), so the host splices
// `potentialFBM` ABOVE this chunk (the byte-identical numeric operator otherwise).
export const CURL_FBM_WGSL = /* wgsl */ `
const CURL_EPS: f32 = 0.012;

// ∇×ψ in 2D — the divergence-free flow direction. Central finite differences of the
// scalar potential give the partials; the cross-pairing (∂y, −∂x) is the 2D curl.
fn curlFBM(p: vec2f) -> vec2f {
  let dx = potentialFBM(p + vec2f(CURL_EPS, 0.0)) - potentialFBM(p - vec2f(CURL_EPS, 0.0));
  let dy = potentialFBM(p + vec2f(0.0, CURL_EPS)) - potentialFBM(p - vec2f(0.0, CURL_EPS));
  // ψ-gradient is (dx, dy)/(2·eps); the curl rotates it 90°: (∂ψ/∂y, −∂ψ/∂x).
  let g = vec2f(dx, dy) / (2.0 * CURL_EPS);
  return vec2f(g.y, -g.x);
}
`;
