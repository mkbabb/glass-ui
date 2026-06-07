// AW.W7c — the multi-pass painterly WGSL passes (the WebGPU full-quality half).
//
// The single-pass WebGL2 fragment shader (aurora.frag.ts) fundamentally cannot
// express these — they are MULTI-PASS operators (a real neighborhood smooth + an
// anisotropic sectored kernel) that DESIGN.md invariant 8 ("no multi-pass on WebGL2")
// bans. They stage on the WebGPU branch, NO-OP on WebGL2 (the AW.W4 single-pass ETF
// approximation is the WebGL2 floor; this is the full quality).
//
// The passes:
//   1. STRUCTURE-TENSOR pass — the Gaussian-smoothed MULTI-TAP form of AW.W4's
//      single-pass keystone: write the smoothed tensor (Jxx, Jyy, Jxy) to an RGBA16F
//      target (gradient magnitudes exceed [0,1] and an 8-bit LDR target clips to
//      garbage — the tensor target MUST be RGBA16F).
//   2. SMOOTH pass — separable Gaussian over the tensor field (the real neighborhood
//      the single-pass small-tap could not afford).
//   3. ANISOTROPIC KUWAHARA pass — the canonical "make a gradient read as oil paint"
//      finishing operator: 8 polynomial-weighted sectors of an ELLIPTICAL kernel
//      SQUEEZED along the ETF tensor (η≈0.1, λ≈0.5; the eccentricity from the tensor
//      eigenratio). The sector with the lowest variance wins — edges stay crisp, flat
//      zones flatten into paint.
//
// The FBO/storageTexture seam is GENERIC — the CONSUMER (aurora's gpuRuntime) declares
// the pass count + the RGBA16F format + the 8-sector count in ITS frame encoder; the
// substrate (createGPUCanvas/createCanvasLifecycle) bakes NONE of them (the
// proof:webgpu-substrate-single clause-2 leak). The compute/multi-pass dispatch runs
// on the SAME shouldContinue()/park gate the WebGL2 rAF uses — a parked rAF (offscreen
// / PRM-reduce / DockBackgroundToggle-paused) skips these passes too (proof:offscreen-
// pause extends to the WebGPU compute dispatch via the shared lifecycle core).
//
// The shared color/noise math is spliced from the WGSL twin (never re-authored).

import {
    OETF_WGSL,
    OKLCH_MATRICES_WGSL,
} from "../../../../../composables/glass/webgl/shaders/procedural-color.glsl";

/** The tensor-target format the CONSUMER declares (NOT baked in the substrate). */
export const PAINTERLY_TENSOR_FORMAT = "rgba16float" as const;
/** The anisotropic-Kuwahara sector count the CONSUMER declares. */
export const PAINTERLY_KUWAHARA_SECTORS = 8 as const;

// Pass 1 — the structure-tensor pass. Samples the base field's luma over a real 3x3
// neighborhood and writes the structure tensor (Jxx, Jyy, Jxy) to an RGBA16F target.
export const PAINTERLY_TENSOR_WGSL = /* wgsl */ `
@group(0) @binding(0) var baseTex: texture_2d<f32>;
@group(0) @binding(1) var baseSampler: sampler;

const W_LUMA: vec3f = vec3f(0.2126, 0.7152, 0.0722);

@fragment
fn tensor_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let texel = 1.0 / vec2f(textureDimensions(baseTex));
  // 3x3 Sobel over luma.
  var l: array<f32, 9>;
  var k = 0;
  for (var dy = -1; dy <= 1; dy = dy + 1) {
    for (var dx = -1; dx <= 1; dx = dx + 1) {
      let s = textureSample(baseTex, baseSampler, uv + vec2f(f32(dx), f32(dy)) * texel).rgb;
      l[k] = dot(s, W_LUMA);
      k = k + 1;
    }
  }
  let gx = (l[2] + 2.0 * l[5] + l[8]) - (l[0] + 2.0 * l[3] + l[6]);
  let gy = (l[6] + 2.0 * l[7] + l[8]) - (l[0] + 2.0 * l[1] + l[2]);
  // (Jxx, Jyy, Jxy) — RGBA16F target (magnitudes exceed [0,1], 8-bit LDR clips).
  return vec4f(gx * gx, gy * gy, gx * gy, 1.0);
}`;

// Pass 2 — a separable Gaussian smooth of the tensor field (the real neighborhood
// the single-pass small-tap could not afford). `dir` selects the axis (1,0)/(0,1).
export const PAINTERLY_SMOOTH_WGSL = /* wgsl */ `
@group(0) @binding(0) var tensorTex: texture_2d<f32>;
@group(0) @binding(1) var tensorSampler: sampler;
@group(0) @binding(2) var<uniform> dir: vec2f;

@fragment
fn smooth_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let texel = 1.0 / vec2f(textureDimensions(tensorTex));
  // 9-tap Gaussian (sigma ~2) along the dir axis.
  let w = array<f32, 5>(0.227027, 0.194594, 0.121622, 0.054054, 0.016216);
  var sum = textureSample(tensorTex, tensorSampler, uv).xyz * w[0];
  for (var i = 1; i < 5; i = i + 1) {
    let off = dir * texel * f32(i);
    sum = sum + textureSample(tensorTex, tensorSampler, uv + off).xyz * w[i];
    sum = sum + textureSample(tensorTex, tensorSampler, uv - off).xyz * w[i];
  }
  return vec4f(sum, 1.0);
}`;

// Pass 3 — the anisotropic Kuwahara finish (the canonical NPR oil operator). 8
// polynomial-weighted sectors of an ELLIPTICAL kernel squeezed along the smoothed
// ETF tensor; the lowest-variance sector wins. Splices the WGSL color twin (PI must
// be defined first for the chunk's oklabToOklch).
export const PAINTERLY_KUWAHARA_WGSL = /* wgsl */ `
const PI: f32 = 3.141592653589793;
${OETF_WGSL}
${OKLCH_MATRICES_WGSL}

@group(0) @binding(0) var colorTex: texture_2d<f32>;
@group(0) @binding(1) var colorSampler: sampler;
@group(0) @binding(2) var tensorTex: texture_2d<f32>;
@group(0) @binding(3) var tensorSampler: sampler;

const SECTORS: i32 = ${PAINTERLY_KUWAHARA_SECTORS};
const RADIUS: i32 = 6;

@fragment
fn kuwahara_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let texel = 1.0 / vec2f(textureDimensions(colorTex));
  // Recover the local orientation + anisotropy from the smoothed tensor.
  let J = textureSample(tensorTex, tensorSampler, uv).xyz; // (Jxx, Jyy, Jxy)
  let tr = J.x + J.y;
  let disc = sqrt(max((J.x - J.y) * (J.x - J.y) + 4.0 * J.z * J.z, 0.0));
  let lambdaMaj = 0.5 * (tr + disc);
  let lambdaMin = 0.5 * (tr - disc);
  let theta = 0.5 * atan2(2.0 * J.z, J.x - J.y);   // gradient angle
  let phi = theta + PI * 0.5;                        // tangent angle (squeeze axis)
  // Eccentricity from the eigenratio (anisotropic kernel squeezed along the tangent).
  let lambdaSum = lambdaMaj + lambdaMin + 1e-6;
  let A = (lambdaMaj - lambdaMin) / lambdaSum;       // coherence
  let ecc = clamp(1.0 - A * 0.6, 0.4, 1.0);          // squeeze factor (λ≈0.5)
  let ca = cos(phi); let sa = sin(phi);

  // 8-sector accumulation of mean + variance; the lowest-variance sector wins.
  var meanA: array<vec3f, ${PAINTERLY_KUWAHARA_SECTORS}>;
  var sqA: array<vec3f, ${PAINTERLY_KUWAHARA_SECTORS}>;
  var cntA: array<f32, ${PAINTERLY_KUWAHARA_SECTORS}>;
  for (var s = 0; s < SECTORS; s = s + 1) {
    meanA[s] = vec3f(0.0); sqA[s] = vec3f(0.0); cntA[s] = 0.0;
  }
  for (var dy = -RADIUS; dy <= RADIUS; dy = dy + 1) {
    for (var dx = -RADIUS; dx <= RADIUS; dx = dx + 1) {
      let o = vec2f(f32(dx), f32(dy));
      if (dot(o, o) > f32(RADIUS * RADIUS)) { continue; }
      // Rotate the offset into the tensor frame + squeeze the tangent axis.
      let rx = (ca * o.x + sa * o.y);
      let ry = (-sa * o.x + ca * o.y) / ecc;
      let ang = atan2(ry, rx) + PI;                  // [0, 2π)
      let sec = i32(floor(ang / (2.0 * PI) * f32(SECTORS))) % SECTORS;
      let c = textureSample(colorTex, colorSampler, uv + o * texel).rgb;
      meanA[sec] = meanA[sec] + c;
      sqA[sec] = sqA[sec] + c * c;
      cntA[sec] = cntA[sec] + 1.0;
    }
  }
  var best = vec3f(0.0);
  var bestVar = 1e9;
  for (var s = 0; s < SECTORS; s = s + 1) {
    if (cntA[s] < 1.0) { continue; }
    let m = meanA[s] / cntA[s];
    let v = sqA[s] / cntA[s] - m * m;
    let vsum = v.r + v.g + v.b;
    if (vsum < bestVar) { bestVar = vsum; best = m; }
  }
  return vec4f(best, 1.0);
}`;
