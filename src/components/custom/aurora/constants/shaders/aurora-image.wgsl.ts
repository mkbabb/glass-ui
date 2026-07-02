// BG.W-AUR-IMAGE-SOURCE — the aurora IMAGE-source WGSL program (WebGPU primary).
//
// The WGSL twin of `aurora-image.frag.ts` — the CONSTRUCTION-TIME PROGRAM PERMUTATION on
// the WebGPU backend: `source:"image"` builds THIS separate pipeline (its own bind group
// carrying the texture + sampler + the image-uniform tail), NEVER a per-fragment runtime
// source-uniform branch. The palette WGSL program (`aurora.wgsl.ts`) is byte-untouched
// — the 576-byte palette struct never sees the image lane.
//
// The SAME drifting field (domainWarp → zoneField) that drives the palette program's COLOR
// drives the per-fragment BLUR RADIUS here — `radius = mix(blurMin, blurMax, zone)` over a
// FIXED 3-ring × 8-sector (24-tap) kernel (a compile-time constant loop bound), sampled in
// LINEAR light (the shared `srgbToLinear`). The vividness FLOOR applies source-agnostically.
//
// The shared OETF + OKLCh matrices + FBM rotation are SPLICED from the same
// `procedural-color.wgsl` chunk the palette program splices — the color math never diverges
// between the two programs OR the two backends.

import {
    FBM_ROT_WGSL,
    OETF_WGSL,
    OKLCH_MATRICES_WGSL,
} from "./procedural-color.wgsl";

// The fixed zone-blur kernel geometry (the bounded-tap witness — a compile-time constant
// loop bound). 3 rings × 8 sectors = 24 stratified taps; the DISSOLVE is carried by the
// kernel RADIUS, never the tap count (mirrors aurora-image.frag.ts).
export const IMAGE_BLUR_RINGS_WGSL = 3;
export const IMAGE_BLUR_SECTORS_WGSL = 8;

export const AURORA_IMAGE_WGSL = /* wgsl */ `
const MAX_NUCLEI: i32 = 6;
const PI: f32 = 3.141592653589793;
const BLUR_RINGS: i32 = ${IMAGE_BLUR_RINGS_WGSL};
const BLUR_SECTORS: i32 = ${IMAGE_BLUR_SECTORS_WGSL};

// The image program's OWN uniform struct (packed vec4 lanes — trivial std140/WGSL
// alignment). DISTINCT from the palette program's 576-byte struct (a separate program).
struct ImageUniforms {
  // scalars0: (uTime, uWarpAmount, uWarpScale, uWarpDrift)
  scalars0: vec4<f32>,
  // scalars1: (uSoftmaxBeta, uNucleiDrift, uCursorStrength, uCursorRadius)
  scalars1: vec4<f32>,
  // scalars2: (uSaturation, uPaperGrain, uAlpha, uVividness)
  scalars2: vec4<f32>,
  // image: (uBlurMin, uBlurMax, uImageAspect, _)
  image: vec4<f32>,
  // cursor: (uCursor.x, uCursor.y, _, _)
  cursor: vec4<f32>,
  // ints: (uNucleiCount, uNoiseOctaves, _, _)
  ints: vec4<i32>,
  // nuc0[i] = (pos.x, pos.y, radius, valueBias); nuc1[i] = (driftRadius, driftPhase, elong, angle)
  nuc0: array<vec4<f32>, 6>,
  nuc1: array<vec4<f32>, 6>,
};

@group(0) @binding(0) var<uniform> u: ImageUniforms;
@group(0) @binding(1) var imgTex: texture_2d<f32>;
@group(0) @binding(2) var imgSampler: sampler;

const K_NUCLEI: f32 = 14.0;
const K_WARP: f32 = 5.0;

// ── Noise (aurora-local hash21/vnoise/fbm — the same compact foundation) ──
fn hash21(p0: vec2<f32>) -> f32 {
  var p = fract(p0 * vec2<f32>(123.34, 456.21));
  p = p + dot(p, p + 45.32);
  return fract(p.x * p.y);
}
fn vnoise(p: vec2<f32>) -> f32 {
  let i = floor(p);
  let f = fract(p);
  let uu = f * f * (3.0 - 2.0 * f);
  let a = hash21(i);
  let b = hash21(i + vec2<f32>(1.0, 0.0));
  let c = hash21(i + vec2<f32>(0.0, 1.0));
  let d = hash21(i + vec2<f32>(1.0, 1.0));
  return mix(mix(a, b, uu.x), mix(c, d, uu.x), uu.y);
}
${FBM_ROT_WGSL}
fn fbm(p0: vec2<f32>) -> f32 {
  var v = 0.0;
  var a = 0.5;
  var p = p0;
  let octaves = u.ints.y;
  for (var i = 0; i < 5; i = i + 1) {
    if (i >= octaves) { break; }
    v = v + a * vnoise(p);
    p = FBM_ROT * p * 2.02;
    a = a * 0.5;
  }
  return v;
}
fn ign(p: vec2<f32>) -> f32 {
  return fract(52.9829189 * fract(dot(p, vec2<f32>(0.06711056, 0.00583715))));
}

${OETF_WGSL}
${OKLCH_MATRICES_WGSL}

fn linOklab(lin: vec3<f32>) -> vec3<f32> {
  let lms = LINEAR_SRGB_TO_LMS * lin;
  return LMS_TO_OKLAB * cbrt3(lms);
}

// The Quilez double-warp (fbm) + the cursor swirl — the drift that moves the blur zone.
fn domainWarp(p: vec2<f32>, t: f32) -> vec2<f32> {
  let warpAmount = u.scalars0.y;
  let warpScale = u.scalars0.z;
  let warpDrift = u.scalars0.w;
  let cursorStrength = u.scalars1.z;
  let cursorRadius = u.scalars1.w;
  let cursor = u.cursor.xy;
  let q = vec2<f32>(fbm(p * warpScale + vec2<f32>(0.0, 0.0) + t * warpDrift * K_WARP),
                    fbm(p * warpScale + vec2<f32>(5.2, 1.3) + t * warpDrift * K_WARP));
  let r = vec2<f32>(fbm(p * warpScale + 4.0 * q + vec2<f32>(1.7, 9.2)),
                    fbm(p * warpScale + 4.0 * q + vec2<f32>(8.3, 2.8)));
  var warped = p + warpAmount * r;
  if (cursorStrength > 0.001) {
    let toP = p - cursor;
    let d = length(toP);
    let rr = max(cursorRadius, 0.01);
    let w = exp(-(d * d) / (rr * rr * 0.45));
    let ang = w * cursorStrength * 2.1;
    let ca = cos(ang);
    let sa = sin(ang);
    let rotated = vec2<f32>(ca * toP.x - sa * toP.y, sa * toP.x + ca * toP.y) + cursor;
    warped = mix(warped, rotated + warpAmount * r * 0.7, w * cursorStrength);
  }
  return warped;
}

// The drifting BLUR ZONE — the anisotropic-Gaussian nuclei softmax (the SAME field the
// palette program reads), drift-coupled.
fn zoneField(p: vec2<f32>, t: f32) -> f32 {
  let nucleiCount = u.ints.x;
  let nucleiDrift = u.scalars1.y;
  let softmaxBeta = u.scalars1.x;
  var accum = 0.0;
  var accumW = 0.0;
  for (var i = 0; i < MAX_NUCLEI; i = i + 1) {
    if (i >= nucleiCount) { break; }
    let n0 = u.nuc0[i];  // pos.x, pos.y, radius, valueBias
    let n1 = u.nuc1[i];  // driftRadius, driftPhase, elong, angle
    let posI = n0.xy + n1.x * vec2<f32>(
      cos(t * nucleiDrift * K_NUCLEI + n1.y),
      sin(t * nucleiDrift * K_NUCLEI + n1.y * 1.13));
    let diff = p - posI;
    let ca = cos(n1.w);
    let sa = sin(n1.w);
    let local = vec2<f32>(ca * diff.x + sa * diff.y, -sa * diff.x + ca * diff.y);
    let along = local.x / max(n1.z, 0.01);
    let d2 = along * along + local.y * local.y;
    let rad = max(n0.z, 0.01);
    let w = exp(-softmaxBeta * d2 / (rad * rad));
    accum = accum + w * (0.5 + 0.5 * n0.w);
    accumW = accumW + w;
  }
  return clamp(accum / max(accumW, 1e-4), 0.0, 1.0);
}

fn coverUv(uv: vec2<f32>) -> vec2<f32> {
  let aspect = max(u.image.z, 0.0001);
  var c = uv - vec2<f32>(0.5);
  c.x = c.x * aspect;
  let s = 1.0 / max(aspect, 1.0);
  return c * s + vec2<f32>(0.5);
}

// The bounded 24-tap zone blur — a FIXED 3-ring × 8-sector stratified kernel, radius
// per-fragment, sampled in LINEAR light. textureSampleLevel (explicit LOD 0) — WGSL has
// no implicit derivative in a varying-radius loop.
fn zoneBlur(uv: vec2<f32>, radius: f32) -> vec3<f32> {
  let aspect = max(u.image.z, 0.0001);
  var sum = srgbToLinear(textureSampleLevel(imgTex, imgSampler, coverUv(uv), 0.0).rgb);
  var wsum = 1.0;
  for (var ring = 1; ring <= BLUR_RINGS; ring = ring + 1) {
    let rr = radius * (f32(ring) / f32(BLUR_RINGS));
    for (var s = 0; s < BLUR_SECTORS; s = s + 1) {
      let a = (f32(s) + 0.5 * f32(ring)) / f32(BLUR_SECTORS) * 2.0 * PI;
      let off = vec2<f32>(cos(a) / aspect, sin(a)) * rr;
      sum = sum + srgbToLinear(textureSampleLevel(imgTex, imgSampler, coverUv(uv + off), 0.0).rgb);
      wsum = wsum + 1.0;
    }
  }
  return sum / wsum;
}

const VIVID_TARGET: f32 = 0.115;
const VIVID_EPS: f32 = 0.012;
const VIVID_WARM_ANCHOR: vec2<f32> = vec2<f32>(0.34202, 0.93969);
fn vividnessFloor(c: vec3<f32>, vividness: f32) -> vec3<f32> {
  if (vividness <= 0.0001) { return c; }
  var lab = linOklab(c);
  let C = length(lab.yz);
  let modeLift = mix(1.18, 1.0, clamp(lab.x * 1.4, 0.0, 1.0));
  let Cmin = vividness * VIVID_TARGET * modeLift;
  var hueDir = VIVID_WARM_ANCHOR;
  if (C > VIVID_EPS) { hueDir = lab.yz / C; }
  let yz = hueDir * max(C, Cmin);
  lab = vec3<f32>(lab.x, yz.x, yz.y);
  return max(oklabToLinearSrgb(lab), vec3<f32>(0.0));
}

fn saturate3(c: vec3<f32>, amt: f32) -> vec3<f32> {
  var lch = oklabToOklch(linOklab(c));
  lch.y = max(lch.y * amt, 0.0);
  return max(oklabToLinearSrgb(oklchToOklab(lch)), vec3<f32>(0.0));
}

fn aces(color0: vec3<f32>) -> vec3<f32> {
  let startCompression = 0.8 - 0.04;
  let desaturation = 0.15;
  var color = color0;
  let x = min(color.r, min(color.g, color.b));
  var offset = 0.04;
  if (x < 0.08) { offset = x - 6.25 * x * x; }
  color = color - offset;
  let peak = max(color.r, max(color.g, color.b));
  if (peak < startCompression) { return clamp(color, vec3<f32>(0.0), vec3<f32>(1.0)); }
  let d = 1.0 - startCompression;
  let newPeak = 1.0 - d * d / (peak + d - startCompression);
  color = color * (newPeak / peak);
  let g = 1.0 - 1.0 / (desaturation * (peak - newPeak) + 1.0);
  return clamp(mix(color, newPeak * vec3<f32>(1.0), g), vec3<f32>(0.0), vec3<f32>(1.0));
}

struct VSOut {
  @builtin(position) pos: vec4<f32>,
  @location(0) uv: vec2<f32>,
};

@vertex
fn vs_main(@builtin(vertex_index) vi: u32) -> VSOut {
  var p = vec2<f32>(-1.0, -1.0);
  if (vi == 1u) { p = vec2<f32>(3.0, -1.0); }
  else if (vi == 2u) { p = vec2<f32>(-1.0, 3.0); }
  var out: VSOut;
  out.pos = vec4<f32>(p, 0.0, 1.0);
  out.uv = p * 0.5 + 0.5;
  return out;
}

@fragment
fn fs_main(in: VSOut) -> @location(0) vec4<f32> {
  let t = u.scalars0.x;
  let saturation = u.scalars2.x;
  let paperGrain = u.scalars2.y;
  let alpha = u.scalars2.z;
  let vividness = u.scalars2.w;
  let blurMin = u.image.x;
  let blurMax = u.image.y;

  let uv = in.uv;
  let p_warp = domainWarp(uv, t);
  let zone = zoneField(p_warp, t);

  let radius = mix(blurMin, blurMax, zone);
  var col = zoneBlur(uv, radius);

  col = saturate3(col, saturation);
  col = vividnessFloor(col, vividness);

  col = aces(col);
  let fragCoord = in.pos.xy;
  let grain = hash21(fragCoord + t * 17.0);
  col = col + (grain - 0.5) * paperGrain;
  col = clamp(col * 0.985 + 0.008, vec3<f32>(0.0), vec3<f32>(1.0));

  col = linearToSrgb(col);
  col = col + (1.0 / 255.0) * (ign(fragCoord) - 0.5);

  return vec4<f32>(col * alpha, alpha);
}
`;
