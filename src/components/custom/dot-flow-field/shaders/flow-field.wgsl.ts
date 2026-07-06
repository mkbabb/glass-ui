// BG.W-DOTFLOW-REBUILD — the STREAMLINE fullscreen-fragment WGSL pass (WebGPU primary).
//
// ONE render pass over the full-screen triangle (the aurora.wgsl shape — the pipeline that
// paints on WebKit-WebGPU AND Chrome/Metal identically). NO compute pass, NO storage
// particles, NO trail ping-pong, NO additive-flood — the whole free-advected-mote + additive-
// trail architecture is RETIRED (the Safari dead-black + the Chrome white-out both died with
// it). The fragment evaluates the stream function ψ (composables/flowField.ts sampleStreamField,
// transcribed EXACTLY), renders its EVENLY-SPACED iso-contours as the streamlines, and BEADS a
// dot at every crossing with a drifting transverse bead-line — over a deep warm-near-black
// floor, bounded [0,1] (no white-out possible).
//
// The dot color rides the shared procedural-color.wgsl OKLCh ramp (the ONE color source); the
// output is OPAQUE (the warm floor IS the ground — mean above dead-black, p99 below white-out).

import {
    OETF_WGSL,
    OKLCH_MATRICES_WGSL,
} from "../../aurora/constants/shaders/procedural-color.wgsl";

export const FLOW_FIELD_WGSL = /* wgsl */ `
const CURL_EPS: f32 = 0.012;
const FBM_ROT: mat2x2<f32> = mat2x2<f32>(0.8, 0.6, -0.6, 0.8);
// PI MUST be in scope BEFORE the OKLCH_MATRICES splice — its oklabToOklch folds the hue on
// 2·PI (procedural-color.wgsl.ts: "the consumer splices the matrices + defines PI first").
// Without it the module fails to create and the WebKit-WebGPU fragment paints nothing.
const PI: f32 = 3.141592653589793;

// ── Uniforms (the typed-struct source-of-truth — see uniformBridgeWGPU.ts) ──
struct U {
  // v0: (time, aspect, px, flowSlope)                 px = p-space size of one device pixel
  v0: vec4<f32>,
  // v1: (undAmp, undFreq, undSpeed, _)
  v1: vec4<f32>,
  // v2: (weaveAmp, weaveFreq, weaveSpeed, _)
  v2: vec4<f32>,
  // v3: (weaveDirX, weaveDirY, curlWarp, curlScale)
  v3: vec4<f32>,
  // v4: (curlDrift, lineSpacing, lineHalfWidth, lineStrength)
  v4: vec4<f32>,
  // v5: (beadSlope, beadDrift, beadRadius, contrast)
  v5: vec4<f32>,
  // v6: (pointerX, pointerY, pointerStrength, pointerRadius)
  v6: vec4<f32>,
  // v7: (pointerActive, stopCount, _, _)
  v7: vec4<f32>,
  // floorC: deep warm-near-black floor (linear-sRGB) + _pad
  floorC: vec4<f32>,
  // palette: warm-cream dot stops (linear-sRGB) + _pad
  palette: array<vec4<f32>, 4>,
};
@group(0) @binding(0) var<uniform> u: U;

${OETF_WGSL}
${OKLCH_MATRICES_WGSL}

// ── The shared curl-noise basis (transcribes flowField.ts hash21/valueNoise/potentialFBM) ──
fn hash21(p: vec2<f32>) -> f32 {
  var p3 = fract(vec3<f32>(p.x, p.y, p.x) * 0.1031);
  p3 = p3 + dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
fn valueNoise(p: vec2<f32>) -> f32 {
  let i = floor(p);
  let f = fract(p);
  let uu = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  let a = hash21(i + vec2<f32>(0.0, 0.0));
  let b = hash21(i + vec2<f32>(1.0, 0.0));
  let c = hash21(i + vec2<f32>(0.0, 1.0));
  let d = hash21(i + vec2<f32>(1.0, 1.0));
  return mix(mix(a, b, uu.x), mix(c, d, uu.x), uu.y);
}
fn potentialFBM(p0: vec2<f32>) -> f32 {
  var v = 0.0;
  var amp = 0.5;
  var freq = 1.0;
  var p = p0;
  for (var i = 0; i < 3; i = i + 1) {
    v = v + amp * valueNoise(p * freq);
    p = FBM_ROT * p;
    freq = freq * 2.0;
    amp = amp * 0.5;
  }
  return v;
}
fn curlFBM(p: vec2<f32>) -> vec2<f32> {
  let dx = potentialFBM(p + vec2<f32>(CURL_EPS, 0.0)) - potentialFBM(p - vec2<f32>(CURL_EPS, 0.0));
  let dy = potentialFBM(p + vec2<f32>(0.0, CURL_EPS)) - potentialFBM(p - vec2<f32>(0.0, CURL_EPS));
  let g = vec2<f32>(dx, dy) / (2.0 * CURL_EPS);
  return vec2<f32>(g.y, -g.x);
}

// ── The stream function ψ (transcribes flowField.ts sampleStreamField, byte-for-byte) ──
fn sampleStreamField(p: vec2<f32>) -> f32 {
  let t = u.v0.x;
  let c = curlFBM(vec2<f32>(p.x * u.v3.w + t * u.v4.x, p.y * u.v3.w - t * u.v4.x));
  var wx = p.x + c.x * u.v3.z;
  var wy = p.y + c.y * u.v3.z;
  if (u.v7.x > 0.5) {
    let dx = p.x - u.v6.x;
    let dy = p.y - u.v6.y;
    let r2 = dx * dx + dy * dy;
    let radius = max(u.v6.w, 1e-3);
    let fall = exp(-r2 / (radius * radius));
    let d = sqrt(r2) + 1e-4;
    wx = wx + (dx / d) * u.v6.z * fall;
    wy = wy + (dy / d) * u.v6.z * fall;
  }
  return u.v0.w * wy
    + u.v1.x * sin(u.v1.y * wx - t * u.v1.z)
    + u.v2.x * sin(u.v2.y * (wx * u.v3.x + wy * u.v3.y) - t * u.v2.z);
}

// Sample the warm-cream palette (linear-sRGB stops, OKLab mix). t in [0,1].
fn samplePaletteLin(t: f32) -> vec3<f32> {
  let stopCount = i32(u.v7.y + 0.5);
  if (stopCount <= 1) { return u.palette[0].rgb; }
  let n = f32(stopCount);
  let ft = clamp(t, 0.0, 1.0) * (n - 1.0);
  let i0 = i32(floor(ft));
  let i1 = min(i0 + 1, stopCount - 1);
  let f = ft - f32(i0);
  let labA = LMS_TO_OKLAB * cbrt3(LINEAR_SRGB_TO_LMS * u.palette[i0].rgb);
  let labB = LMS_TO_OKLAB * cbrt3(LINEAR_SRGB_TO_LMS * u.palette[i1].rgb);
  return oklabToLinearSrgb(mix(labA, labB, f));
}

struct FSQ { @builtin(position) pos: vec4<f32>, @location(0) uv: vec2<f32> };

@vertex
fn vs_main(@builtin(vertex_index) vi: u32) -> FSQ {
  // NDC corners of the covering triangle (-1,-1), (3,-1), (-1,3) — built with SCALAR
  // BRANCHES on vi (the aurora.wgsl idiom that paints on WebKit-WebGPU + Chrome/Metal
  // identically). A function-local var array indexed by the dynamic vertex index (a
  // var c = array<vec2>(...) then let p = c[vi]) MISCOMPILES on WebKit's Metal WGSL
  // backend — the covering triangle collapses to a degenerate primitive, no fragments
  // rasterize, and the pass emits a uniform clear-floor (the BG.W-DOTFLOW-REBUILD Safari
  // dead-black class: stdev 0, INIT succeeds, DRAW produces nothing). The branch build is
  // the WebKit-safe covering-triangle shape.
  var p = vec2<f32>(-1.0, -1.0);
  if (vi == 1u) { p = vec2<f32>(3.0, -1.0); }
  else if (vi == 2u) { p = vec2<f32>(-1.0, 3.0); }
  var out: FSQ;
  out.pos = vec4<f32>(p, 0.0, 1.0);
  out.uv = p;   // [-1,1] domain (the fullscreen-triangle overscan clips to [-1,1])
  return out;
}

@fragment
fn fs_main(in: FSQ) -> @location(0) vec4<f32> {
  let aspect = max(u.v0.y, 1e-4);
  let px = u.v0.z;
  let flowSlope = max(u.v0.w, 1e-4);
  let lineSpacing = u.v4.y;
  let beadSlope = max(u.v5.x, 1e-4);

  // aspect-corrected domain space so the streamlines stay isotropic.
  let p = vec2<f32>(in.uv.x * aspect, in.uv.y);

  // The streamline: the nearest EVENLY-SPACED iso-contour of ψ (the Jobard–Lefer even spacing
  // = even Δ level step; |∇ψ| ≈ flowSlope so the world spacing is even).
  let psi = sampleStreamField(p);
  let hp = psi / lineSpacing;
  let dContour = abs(hp - round(hp)) * lineSpacing / flowSlope;   // world dist to nearest line

  // The along-line bead phase (transverse, drifting with time → the dots march ALONG the line).
  let bp = p.x * beadSlope - u.v0.x * u.v5.y;
  let dBead = abs(bp - round(bp)) / beadSlope;                    // world dist to nearest bead

  // The dot sits at the streamline ∩ bead crossing; the thread is the faint connecting line.
  let aa = px * 1.5;
  let dotDist = sqrt(dContour * dContour + dBead * dBead);
  let dotV = 1.0 - smoothstep(u.v5.z, u.v5.z + aa, dotDist);
  let thread = 1.0 - smoothstep(u.v4.z, u.v4.z + aa, dContour);
  let intensity = clamp(dotV + thread * u.v4.w, 0.0, 1.2);

  // Warm-cream dots over the deep warm-near-black floor — bounded, opaque (no white-out).
  let dotColor = samplePaletteLin(clamp(dotV, 0.0, 1.0));
  let lin = u.floorC.rgb + dotColor * intensity * u.v5.w;
  let rgb = clamp(linearToSrgb(lin), vec3<f32>(0.0), vec3<f32>(1.0));
  return vec4<f32>(rgb, 1.0);
}
`;
