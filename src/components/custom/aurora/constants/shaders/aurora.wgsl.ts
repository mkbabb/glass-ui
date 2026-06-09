// AW.W7a/W7b — the WGSL fragment pipeline twin (the WebGPU path).
//
// A hand-written WGSL twin of the GLSL aurora fragment pipeline (NO Three.js/TSL —
// the zero-dep posture; the GLSL→WGSL transcription is largely mechanical:
// `fwidth`→`dpdx`/`dpdy`, `gl.uniform*`→`writeBuffer`). The WebGL2 single-pass
// fragment shader (aurora.frag.ts) stays the universal floor; this is its
// capability-gated twin drawing the SAME single-pass aurora. AX.W14 — WebGPU is a
// parity-floor SINGLE-pass opt-in enhancement; the dead multi-pass painterly half
// (the smoothed-tensor + anisotropic Kuwahara) was excised (zero consumers).
//
// The color/noise math is SPLICED from the shared procedural-color chunk's WGSL twin
// (OETF_WGSL + OKLCH_MATRICES_WGSL + FBM_ROT_WGSL) — NOT re-authored — so the WebGPU
// path can NEVER diverge from the WebGL2/GLSL reference (the AV.W1 two-copy bug class
// the proof:webgpu-substrate-single splice clause forbids). proof:aurora-wgsl-
// equivalence certifies the color chunk to 1e-6 against the GLSL oracle.
//
// AX.W07 — the WGSL black-canvas fix (two device-proven defects, ONE atomic rewrite):
//   (1a) the int-in-float class is killed AT THE ROOT — the five count/enum fields
//        (stopCount/nucleiCount/warpMode/noiseOctaves/medium) are declared `f32` and
//        `i32()`-cast in-shader at every use site. The CPU pack stays a single
//        Float32Array (no Int32Array dual-view); the slot now legitimately carries a
//        float the shader casts. WGSL no longer reads the IEEE-754 bit-pattern of a
//        float as a raw i32 (the `bits(3.0)=1077936128` overflow that blacked the ramp).
//   (1b) the dynamically-indexed arrays (palette/nucleiPos/nucleiMod) MOVE OUT of the
//        `var<uniform>` block into a NEW `struct Field` bound `var<storage, read>` at a
//        second binding (@group(0) @binding(1)). On Apple/Metal (Tint→MSL) a runtime
//        index into a `var<uniform> array<vec4f>` returns [0,0,0,0] (MSL forbids dynamic
//        indexing of the `constant` address space); `var<storage,read>` is always-legal
//        for dynamic indices (gpuweb #2559). The std140 vec4-aligned record is
//        byte-identical in uniform and storage, so the storage move keeps visual parity.
// BOTH are required for a non-black render — landing only one still ships black.

import {
    OETF_WGSL,
    OKLCH_MATRICES_WGSL,
    FBM_ROT_WGSL,
    PALETTE_RAMP_WGSL,
    PCG_HASH_WGSL,
} from "../../../../../composables/glass/webgl/shaders/procedural-color.glsl";

// The uniform/storage split layout. The bridge's WebGPU write path (uniformBridge.ts)
// packs an AuroraConfig into the two buffers; the WebGL2 path keeps its gl.uniform*
// calls. MAX_* mirror the WebGL2 caps for visual parity (the storage `Field` could be
// runtime-sized to lift them — the cap-lift is the W14 follow-up; W07 keeps the caps so
// the visual contract matches the WebGL2 fallback exactly).
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

// The uniform struct — ONLY constant-indexed scalars (safe in the uniform address
// space). The five count/enum fields are f32 (AX.W07 1a): the WebGPU write path packs
// them as floats and the shader i32-casts at each use, so WGSL never reads a float
// bit-pattern as a raw i32. The dynamically-indexed arrays moved OUT to struct Field
// below (AX.W07 1b).
struct Uniforms {
  time: f32,
  stopCount: f32,
  nucleiCount: f32,
  softmaxBeta: f32,
  valueVariance: f32,
  warpAmount: f32,
  warpScale: f32,
  warpDrift: f32,
  warpMode: f32,
  noiseOctaves: f32,
  medium: f32,
  breathDepth: f32,
  breathPeriod: f32,
  saturation: f32,
  paperGrain: f32,
  alpha: f32,
  // AX.W11 — the huePath enum (f32-packed, i32()-cast in samplePalette) carries the
  // shared ramp's OKLab-rectangular-vs-OKLCh-hue-arc dispatch into the WebGPU twin so
  // a huePath:'increasing' rainbow config arcs identically to the WebGL2 oracle. The
  // CPU pad keeps the buffer vec4-aligned (WGPU_UNIFORM_FLOATS rounds to 20).
  huePath: f32,
};

// The dynamically-indexed arrays — bound var<storage, read> (AX.W07 1b). A runtime
// palette/nuclei index into a var<uniform> array<vec4f> returns [0,0,0,0] on Metal
// (MSL forbids dynamic indexing of constant); storage is always-legal. The vec4 stride
// is std140-identical to the uniform layout, so the move is byte-exact.
struct Field {
  palette: array<vec4f, ${WGSL_MAX_STOPS}>,      // .xyz = linear-sRGB stop
  nucleiPos: array<vec4f, ${WGSL_MAX_NUCLEI}>,    // .xy pos, .z radius, .w paletteBias
  nucleiMod: array<vec4f, ${WGSL_MAX_NUCLEI}>,    // .x valueBias, .y elong, .z angle, .w driftRadius
};

@group(0) @binding(0) var<uniform> U: Uniforms;
@group(0) @binding(1) var<storage, read> F: Field;

${OETF_WGSL}
${FBM_ROT_WGSL}
${OKLCH_MATRICES_WGSL}
${PALETTE_RAMP_WGSL}

// AX.W12 — the painterly-medium organic noise basis (PCG2D integer-bit hash + 2D
// simplex gradient noise), SPLICED from the shared procedural-color chunk — the EXACT
// twin of the GLSL leaf aurora.frag.ts splices, so the hash can NEVER drift between
// backends (proof:aurora-noise-hash-equivalence locks the twins to 1e-6). The WebGPU
// single-pass fs_main below stays the smooth pole (it runs no medium body — the
// painterly mediums are the W7c/W14 multi-pass), so the leaf is single-sourced HERE for
// the twin-equivalence contract; the W14 painterly passes consume it.
${PCG_HASH_WGSL}

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
  let octaves = i32(U.noiseOctaves);   // AX.W07 1a — i32()-cast the f32-packed count.
  for (var i = 0; i < 5; i = i + 1) {
    if (i >= octaves) { break; }
    v = v + a * vnoise(p);
    p = FBM_ROT * p * 2.02;
    a = a * 0.5;
  }
  return v;
}

fn samplePalette(id: f32) -> vec3f {
  // AX.W11 — splice the SHARED samplePaletteRamp (the smoothstep ease + the OKLab-
  // rectangular-vs-OKLCh-hue-arc huePath dispatch), the EXACT twin the GLSL oracle
  // splices. The body here only selects the bracketing stop pair + the raw inter-stop
  // t (the W07 storage-Field dynamic index), then hands them to the shared ramp.
  let n = i32(U.stopCount);            // AX.W07 1a — i32()-cast the f32-packed count.
  if (n <= 1) { return F.palette[0].xyz; }
  let t = clamp(id, 0.0, 1.0) * f32(n - 1);
  let i0 = i32(floor(t));
  let i1 = min(i0 + 1, n - 1);
  let f = t - f32(i0);
  // AX.W07 1b — read the palette from the storage Field (dynamic i0/i1 index);
  // AX.W11 — i32()-cast the f32-packed huePath enum (parity with the count casts).
  return samplePaletteRamp(F.palette[i0].xyz, F.palette[i1].xyz, f, i32(U.huePath));
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
  let n = i32(U.nucleiCount);          // AX.W07 1a — i32()-cast the f32-packed count.
  for (var i = 0; i < ${WGSL_MAX_NUCLEI}; i = i + 1) {
    if (i >= n) { break; }
    // AX.W07 1b — read the nuclei from the storage Field (dynamic i index).
    let pos = F.nucleiPos[i].xy;
    let rad = max(F.nucleiPos[i].z, 0.01);
    let d2 = dot(p - pos, p - pos);
    let wi = exp((-U.softmaxBeta * d2) / (rad * rad));
    accumId = accumId + wi * F.nucleiPos[i].w;
    accumVal = accumVal + wi * F.nucleiMod[i].x;
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
