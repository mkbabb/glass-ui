// BB.B1 — the shared curl-noise flow chunk (`curlFBM`).
//
// ONE source for the divergence-free curl-noise flow field the procedural surfaces
// need. This is the AV.W2 precedent applied to FLOW: the curl of an fbm potential is
// the SOTA flow-field warp (Bridson's "Curl-Noise for Procedural Fluid Flow",
// SIGGRAPH 2007) — a divergence-free vector field that swirls without sources/sinks,
// so a domain warped along it folds and stretches like real fluid advection rather
// than the source-y bulge a raw fbm gradient produces.
//
// Mechanism (mirrors procedural-color.glsl.ts): each `export const` is a
// `/* glsl */` template-literal STRING the `.frag.ts` modules interpolate
// (`${CURL_FBM_GLSL}`) into their own `*_SRC` at module load. NO `#include`
// preprocessor, NO bundler step — the emitted shader is character-identical to a
// hand-inlined one (the splice boundary is the only diff).
//
// What lives here (the genuinely-shared math):
//   - CURL_FBM_GLSL — `curlFBM(p)`: the 2D curl of a scalar fbm potential. In 2D a
//                     scalar potential ψ generates the divergence-free field
//                     ∇×ψ = (∂ψ/∂y, −∂ψ/∂x); the partials are central finite
//                     differences of `potentialFBM` at a small epsilon. The result
//                     is the unit-ish flow direction (the caller scales it).
//
// The DEPENDENCY contract (the splice-order law): `curlFBM` calls a `potentialFBM`
// scalar-fbm function the HOST shader must define BEFORE this chunk is spliced (a
// host already carrying an fbm — aurora's `fbm` — wraps it as `potentialFBM`). The
// host owns the noise basis (so aurora keeps its 2.02-lacunarity loop, the blob its
// own); this chunk owns ONLY the curl operator, which is basis-agnostic. The chunk
// imports NO value.js + declares no uniforms — it is a pure GLSL string.
//
// The ≥3-consumer booking (the shared-chunk bar): consumer #1 is B1 aurora-curl-warp
// (the `.frag` arm, this cut — aurora's `warpMode: "curl"` domain warp); the booked
// #2/#3 are B5 paper-grid-breathe (`<Card grid animated>` — the ¼-res curl-driven
// grid breathe) + the W-FLOWFIELD flow-field viz. Recorded in
// docs/consumer-evidence/curl-fbm.md.

// ── Curl-noise flow ──────────────────────────────────────────────────────────
// The 2D curl of a scalar fbm potential. `potentialFBM(vec2)` MUST be defined by the
// host shader before this splice (it owns the noise basis; this chunk owns only the
// curl operator). Central-difference partials at CURL_EPS; the field is
// divergence-free by construction (∂/∂x of ∂ψ/∂y minus ∂/∂y of ∂ψ/∂x cancels).
export const CURL_FBM_GLSL = /* glsl */ `
const float CURL_EPS = 0.012;

// Scalar fbm potential psi — the host's noise basis, wrapped so the curl operator is
// basis-agnostic. A host carrying its own fbm defines this as: return fbm(p);
float potentialFBM(vec2 p);

// ∇×ψ in 2D — the divergence-free flow direction. Central finite differences of the
// scalar potential give the partials; the cross-pairing (∂y, −∂x) is the 2D curl.
vec2 curlFBM(vec2 p) {
  float dx = potentialFBM(p + vec2(CURL_EPS, 0.0)) - potentialFBM(p - vec2(CURL_EPS, 0.0));
  float dy = potentialFBM(p + vec2(0.0, CURL_EPS)) - potentialFBM(p - vec2(0.0, CURL_EPS));
  // ψ-gradient is (dx, dy)/(2·eps); the curl rotates it 90°: (∂ψ/∂y, −∂ψ/∂x).
  vec2 g = vec2(dx, dy) / (2.0 * CURL_EPS);
  return vec2(g.y, -g.x);
}
`;
