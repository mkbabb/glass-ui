// The metal-medium GLSL bodies (uMedium==8/9) are a cohesive GLSL chunk
// held under the no-god-module 500-line bound. The chunk splices back into
// AURORA_MEDIUMS_POST_BRUSH_GLSL immediately after the mediumKuwahara body (the same
// join point the metal bodies occupied inline), so the ASSEMBLED shader string is
// byte-identical. Every symbol the bodies read (packGrad/unpackGrad/structureTensorField
// in mediums.glsl.ts PRE_BRUSH, flowField in flow.glsl.ts, W_LUMA/hash21/uCursor/
// uMetalPolish/uMetalHeightScale in aurora.frag.ts) is in-scope in the final composed
// FRAGMENT_SRC. The sibling is a pure position-preserving chunk, mirroring the
// vangogh-medium.glsl.ts sibling. The assembler reads the metal bodies here.

// The gradient PACK helpers (packGrad/unpackGrad) — spliced into PRE_BRUSH BEFORE
// structureTensorField (which calls packGrad); the metal bodies call unpackGrad.
export const AURORA_METAL_PACK_GLSL = /* glsl */ `
// ── Gradient pack ──────────────────────────────────
// structureTensorField re-plumbs its already-computed luma gradient (Gx,Gy) out through
// the vec4 return value's .w lane so the metal medium pays ZERO extra taps (a second Sobel is
// 8 sampleBase() taps). 12 bits per bounded component ([-4,4]) into one f32, exact under
// highp; the .xy/.z crayon/kuwahara callers are transparent to the widen.
float packGrad(float gx, float gy) {
  float qx = floor(clamp(gx * 0.125 + 0.5, 0.0, 1.0) * 4095.0);
  float qy = floor(clamp(gy * 0.125 + 0.5, 0.0, 1.0) * 4095.0);
  return qx + qy * 4096.0;
}
vec2 unpackGrad(float packed) {
  float qy = floor(packed * (1.0 / 4096.0));
  float qx = packed - qy * 4096.0;
  return (vec2(qx, qy) * (1.0 / 4095.0) - 0.5) * 8.0;
}
`;

export const AURORA_METAL_MEDIUM_GLSL = /* glsl */ `#define MEDIUM_METAL 8
#define MEDIUM_METALGRAD 9

// ── Metal — two-term anisotropic BRDF over the field relief (uMedium==8/9) ──
// Metal is a MUTUALLY-EXCLUSIVE medium (NOT a finish axis) — the field re-lights as
// warm folded metal: the luma HEIGHT field (the packed structure-tensor gradient →
// the surface normal) catches an anisotropic Blinn streak (brushed metal, the streak
// runs ALONG the coherent edge-tangent) plus a sharp crest, both raked by a cursor-
// synthesized light that reads on BOTH backends (uCursor is in-struct — a phantom
// uLightDir read would be flat on the WGSL primary). The catch is the ACHROMATIC-WARM
// anchor (AURORA_CATCH_LIGHT_ANCHOR ≈ [1.0,0.97,0.90], never a cold chrome-blue). The
// body keeps the field HUE (technicolor valley base); the height rides the relief.
// ZERO new taps — structureTensorField already computed the gradient (unpacked from .w).
const vec3  METAL_CATCH_WARM       = vec3(1.0, 0.97, 0.90); // AURORA_CATCH_LIGHT_ANCHOR
const float METAL_HEIGHT_SCALE     = 2.2;   // gradient → normal tilt (× uMetalHeightScale)
const float METAL_LIGHT_Z          = 0.55;  // synth-light z (toward viewer)
const vec2  METAL_IDLE_RAKE        = vec2(0.32, 0.34); // upper-right idle rake bias
const float METAL_SHININESS_ANISO  = 6.0;   // anisotropic streak exponent (brushed)
const float METAL_SHININESS_CREST  = 40.0;  // crest specular exponent (sharp)
const float METAL_COHERENCE_FLOOR  = 0.22;  // streak gates on edge coherence A
const float METAL_BODY_FLOOR       = 0.42;  // diffuse valley floor (dark side reads)
const float METAL_GRADIENT_FLATTEN = 0.55;  // metal-gradient pre-flatten toward luma
const float METAL_SPARKLE_DENSITY  = 240.0; // metal-gradient per-cell flake grid
const float METAL_SPARKLE_THRESH   = 0.72;  // only some cells flake
const float METAL_SPARKLE_AMP      = 0.6;   // flake glint amplitude

// The shared metal BRDF core — takes the ALREADY-computed structureTensorField vec4 so
// the caller pays ZERO extra taps (metal-gradient reuses the same stf). WebKit-fenced:
// every pow base is clamped to [0,1], the exponents are compile-time constants.
vec3 metalShade(vec3 baseCol, vec2 p, vec4 stf) {
  vec2 tangent = stf.xy;
  float A = stf.z;
  vec2 grad = unpackGrad(stf.w);
  // Height-field normal: N = normalize(vec3(grad * scale, 1)). The luma relief tilts
  // the surface; the flat field reads near vec3(0,0,1) (facing the viewer).
  vec3 N = normalize(vec3(grad * (METAL_HEIGHT_SCALE * uMetalHeightScale), 1.0));
  vec3 V = vec3(0.0, 0.0, 1.0);
  // Cursor-synthesized rake light (in-struct on BOTH backends — never uLightDir). The
  // idle bias keeps a still field lit from the upper-right; a moving cursor rakes it.
  vec3 L = normalize(vec3((uCursor - p) + METAL_IDLE_RAKE, METAL_LIGHT_Z));
  vec3 H = normalize(L + V);
  // Anisotropic streak — brushed metal: the highlight runs ALONG the edge-tangent, so
  // it is a function of the H-component PERPENDICULAR to the tangent (sinTH).
  float tH = dot(normalize(tangent), H.xy);
  float sinTH = sqrt(clamp(1.0 - tH * tH, 0.0, 1.0));
  float streak = pow(clamp(sinTH, 0.0, 1.0), METAL_SHININESS_ANISO);
  float crest  = pow(clamp(dot(N, H), 0.0, 1.0), METAL_SHININESS_CREST);
  float spec = streak * crest;
  // Coherence gate — the anisotropic streak reads only where the field has a real edge
  // (a flat zone has no brush direction; A≈0 → no streak).
  spec *= smoothstep(0.0, METAL_COHERENCE_FLOOR, A);
  // Technicolor valley base — the body keeps the FIELD hue; the diffuse term rides the
  // height relief so the ridges brighten and the pits fall toward the floor.
  float diff = clamp(dot(N, L), 0.0, 1.0);
  vec3 body = baseCol * (METAL_BODY_FLOOR + (1.0 - METAL_BODY_FLOOR) * diff);
  // The catch is the achromatic-warm anchor, scaled by the polish knob.
  return body + METAL_CATCH_WARM * (spec * clamp(uMetalPolish, 0.0, 4.0));
}

vec3 mediumMetal(vec3 col, vec2 p, float t) {
  vec4 stf = structureTensorField(p, t, flowField(p, t));
  return metalShade(col, p, stf);
}

// metal-gradient (uMedium==9) — the SAME BRDF over a pre-flattened/gradient base + a
// twinkle-in-place flake sparkle (position FIXED per cell, PHASE-animated, gated on
// facing — flake glint, never a boil).
vec3 mediumMetalGradient(vec3 col, vec2 p, float t) {
  vec4 stf = structureTensorField(p, t, flowField(p, t));
  // Pre-flatten toward luma (the smoother gradient-metallic base) — same BRDF, calmer body.
  // NB: flat is a GLSL reserved interpolation qualifier — WebKit's compiler REJECTS it as an
  // identifier (ANGLE tolerates it); named flatCol so the WebKit aurora shader compiles (L1a).
  vec3 flatCol = mix(col, vec3(dot(col, W_LUMA)), METAL_GRADIENT_FLATTEN);
  vec3 metal = metalShade(flatCol, p, stf);
  // The height-field normal facing (recomputed from the same packed gradient — ZERO taps).
  vec2 grad = unpackGrad(stf.w);
  float facing = normalize(vec3(grad * (METAL_HEIGHT_SCALE * uMetalHeightScale), 1.0)).z;
  // Twinkle-in-place: a fixed per-cell flake seed, phase-animated glint gated on facing.
  vec2 cell = floor(p * METAL_SPARKLE_DENSITY);
  float seed = hash21(cell);
  float tw = pow(clamp(sin(t + seed * 6.2831853), 0.0, 1.0), 40.0);
  float flakeGate = step(METAL_SPARKLE_THRESH, seed);
  metal += METAL_CATCH_WARM * (tw * flakeGate * clamp(facing, 0.0, 1.0) * METAL_SPARKLE_AMP);
  return metal;
}
`;
