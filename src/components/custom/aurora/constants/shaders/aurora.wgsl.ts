// AW.W7a/W7b — the WGSL fragment pipeline twin (the WebGPU path).
//
// A hand-written WGSL twin of the GLSL aurora fragment pipeline (NO Three.js/TSL —
// the zero-dep posture; the GLSL→WGSL transcription is largely mechanical:
// `fwidth`→`dpdx`/`dpdy`, uniform arrays→a std140 storage struct, `gl.uniform*`→
// `writeBuffer`). The WebGL2 single-pass fragment shader (aurora.frag.ts) stays the
// universal floor; this is its capability-gated twin drawing the SAME single-pass
// aurora. The full-quality multi-pass painterly half (the smoothed-tensor + the
// anisotropic Kuwahara) is painterly.wgsl.ts (W7c), no-op on WebGL2.
//
// The color/noise math is SPLICED from the shared procedural-color chunk's WGSL twin
// (OETF_WGSL + OKLCH_MATRICES_WGSL + FBM_ROT_WGSL) — NOT re-authored — so the WebGPU
// path can NEVER diverge from the WebGL2/GLSL reference (the AV.W1 two-copy bug class
// the proof:webgpu-substrate-single splice clause forbids). proof:aurora-wgsl-
// equivalence certifies the color chunk to 1e-6 against the GLSL oracle.
//
// The std140 storage struct lifts the WebGL2 MAX_NUCLEI 6 / MAX_STOPS 8 caps (a
// storage buffer is dynamically sized) — but this twin keeps the SAME field set so
// the visual contract matches the WebGL2 fallback byte-for-byte where the caps overlap.

import {
    OETF_WGSL,
    OKLCH_MATRICES_WGSL,
    FBM_ROT_WGSL,
} from "../../../../../composables/glass/webgl/shaders/procedural-color.glsl";

// The shared uniform struct (std140-friendly layout). The bridge's WebGPU write path
// (uniformBridge.ts) packs an AuroraConfig into this buffer; the WebGL2 path keeps
// its gl.uniform* calls. MAX_* mirror the WebGL2 caps for visual parity.
const WGSL_MAX_NUCLEI = 6;
const WGSL_MAX_STOPS = 8;

export const AURORA_VERTEX_WGSL = /* wgsl */ `
struct VSOut {
  @builtin(position) pos: vec4f,
  @location(0) uv: vec2f,
};

@vertex
fn vs_main(@builtin(vertex_index) vi: u32) -> VSOut {
  // Full-screen triangle (matches the WebGL2 [-1,-1, 3,-1, -1,3] quad).
  var p = array<vec2f, 3>(vec2f(-1.0, -1.0), vec2f(3.0, -1.0), vec2f(-1.0, 3.0));
  var out: VSOut;
  let xy = p[vi];
  out.pos = vec4f(xy, 0.0, 1.0);
  out.uv = 0.5 * (xy + vec2f(1.0));
  return out;
}`;

export const AURORA_FRAGMENT_WGSL = /* wgsl */ `
const PI: f32 = 3.141592653589793;
const W_LUMA: vec3f = vec3f(0.2126, 0.7152, 0.0722);
const MAX_NUCLEI: u32 = ${WGSL_MAX_NUCLEI}u;
const MAX_STOPS: u32 = ${WGSL_MAX_STOPS}u;

// The std140 uniform struct — the WebGPU write path packs an AuroraConfig here.
struct Uniforms {
  time: f32,
  stopCount: i32,
  nucleiCount: i32,
  softmaxBeta: f32,
  valueVariance: f32,
  warpAmount: f32,
  warpScale: f32,
  warpDrift: f32,
  warpMode: i32,
  noiseOctaves: i32,
  medium: i32,
  breathDepth: f32,
  breathPeriod: f32,
  saturation: f32,
  paperGrain: f32,
  alpha: f32,
  palette: array<vec4f, ${WGSL_MAX_STOPS}>,      // .xyz = linear-sRGB stop
  nucleiPos: array<vec4f, ${WGSL_MAX_NUCLEI}>,    // .xy pos, .z radius, .w paletteBias
  nucleiMod: array<vec4f, ${WGSL_MAX_NUCLEI}>,    // .x valueBias, .y elong, .z angle, .w driftRadius
};

@group(0) @binding(0) var<uniform> U: Uniforms;

${OETF_WGSL}
${FBM_ROT_WGSL}
${OKLCH_MATRICES_WGSL}

fn hash21(p0: vec2f) -> f32 {
  var p = fract(p0 * vec2f(123.34, 456.21));
  p = p + dot(p, p + 45.32);
  return fract(p.x * p.y);
}
fn vnoise(p: vec2f) -> f32 {
  let i = floor(p);
  let f = fract(p);
  let u = f * f * (3.0 - 2.0 * f);
  let a = hash21(i);
  let b = hash21(i + vec2f(1.0, 0.0));
  let c = hash21(i + vec2f(0.0, 1.0));
  let d = hash21(i + vec2f(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}
fn fbm(p0: vec2f) -> f32 {
  var v = 0.0;
  var a = 0.5;
  var p = p0;
  for (var i = 0; i < 5; i = i + 1) {
    if (i >= U.noiseOctaves) { break; }
    v = v + a * vnoise(p);
    p = FBM_ROT * p * 2.02;
    a = a * 0.5;
  }
  return v;
}

fn samplePalette(id: f32) -> vec3f {
  // Nearest-pair OKLab interpolation across the stops (mirrors the GLSL default ramp).
  let n = U.stopCount;
  if (n <= 1) { return U.palette[0].xyz; }
  let t = clamp(id, 0.0, 1.0) * f32(n - 1);
  let i0 = i32(floor(t));
  let i1 = min(i0 + 1, n - 1);
  let f = t - f32(i0);
  let labA = LMS_TO_OKLAB * (sign(LINEAR_SRGB_TO_LMS * U.palette[i0].xyz) * pow(abs(LINEAR_SRGB_TO_LMS * U.palette[i0].xyz), vec3f(1.0 / 3.0)));
  let labB = LMS_TO_OKLAB * (sign(LINEAR_SRGB_TO_LMS * U.palette[i1].xyz) * pow(abs(LINEAR_SRGB_TO_LMS * U.palette[i1].xyz), vec3f(1.0 / 3.0)));
  return oklabToLinearSrgb(mix(labA, labB, f));
}

fn domainWarp(p: vec2f, t: f32) -> vec2f {
  let drift = t * U.warpDrift * 5.0;
  let q = vec2f(
    fbm(p * U.warpScale + vec2f(drift, 0.0)),
    fbm(p * U.warpScale + vec2f(5.2, 1.3 + drift))
  );
  let r = vec2f(
    fbm(p * U.warpScale + 4.0 * q + vec2f(1.7, 9.2)),
    fbm(p * U.warpScale + 4.0 * q + vec2f(8.3, 2.8))
  );
  return p + U.warpAmount * r;
}

fn nucleiField(p: vec2f, t: f32) -> vec2f {
  // Returns (paletteId, valueMod) — softmax over the nuclei (isotropic; the WebGPU
  // twin keeps the parity-floor isotropic Gaussian).
  var accumId = 0.0;
  var accumVal = 0.0;
  var w = 0.0;
  let n = U.nucleiCount;
  for (var i = 0; i < ${WGSL_MAX_NUCLEI}; i = i + 1) {
    if (i >= n) { break; }
    let pos = U.nucleiPos[i].xy;
    let rad = max(U.nucleiPos[i].z, 0.01);
    let d2 = dot(p - pos, p - pos);
    let wi = exp((-U.softmaxBeta * d2) / (rad * rad));
    accumId = accumId + wi * U.nucleiPos[i].w;
    accumVal = accumVal + wi * U.nucleiMod[i].x;
    w = w + wi;
  }
  if (w < 1e-4) { return vec2f(0.5, 0.0); }
  return vec2f(accumId / w, accumVal / w);
}

// ACES (Narkowicz) — matches the GLSL tonemap.
fn aces(x: vec3f) -> vec3f {
  let a = 2.51; let b = 0.03; let c = 2.43; let d = 0.59; let e = 0.14;
  return clamp((x * (a * x + b)) / (x * (c * x + d) + e), vec3f(0.0), vec3f(1.0));
}

@fragment
fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let t = U.time;
  let pw = domainWarp(uv, t);
  let nf = nucleiField(pw, t);
  var col = samplePalette(nf.x);
  col = col * (1.0 + U.valueVariance * nf.y);

  // Breath.
  let breath = sin(t * 6.2831 / max(U.breathPeriod, 1.0));
  col = col * (1.0 + U.breathDepth * breath * 0.5);

  // (The WebGPU smooth pole; the painterly mediums run the W7c multi-pass passes.)
  col = aces(col);
  col = linearToSrgb(col);                // the mandatory OETF (linear → display).
  return vec4f(col * U.alpha, U.alpha);   // premultiply AFTER the OETF (parity).
}`;

/** The assembled WGSL module string (vertex + fragment) for createGPUCanvas. */
export const AURORA_WGSL = AURORA_VERTEX_WGSL + "\n" + AURORA_FRAGMENT_WGSL;

export { WGSL_MAX_NUCLEI, WGSL_MAX_STOPS };
