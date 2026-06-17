// BB.W-VIZ-SUITE (W-AURORA-WGPU) — the aurora WGSL PRIMARY path (net-new).
//
// The WebGPU-first transcription of the aurora fragment pipeline: the procedural
// fbm/OKLCh nuclei field over the full-screen-triangle pass, the PBR-Neutral tonemap,
// and the mandatory linearToSrgb OETF. It is the SECOND primary beside the byte-untouched
// WebGL2 `aurora.frag.ts` fallback (the GL-shader fence holds — `aurora.frag.ts` is the
// preserved ~5-10%-tail path; this `.wgsl` is the WebGPU-first path).
//
// SCOPE (recorded honestly — the wave's parity bar is the DEFAULT smooth atmospheric
// config, `medium: "smooth"`/`warpMode: "fbm"`): this transcribes the ALWAYS-ON CORE
// pipeline the default config exercises end-to-end — domainWarp (all three warp modes +
// the cursor swirl), nucleiField (anisotropic Gaussian softmax + drift + palette drift),
// samplePalette (the shared OKLCh ramp), the breath wobble, saturate3, the PBR-Neutral
// `aces`, the film grain, the OETF, the IGN display-space dither. The PAINTERLY mediums
// (uMedium 1-6: pastel/watercolor/oil/crayon/vangogh/oil-pastel) + the brush SDF + the
// structure-tensor flow are the WebGL2 fallback's full-fidelity register — in the WGSL
// primary a painterly medium renders the smooth core (the booked W-AURORA-WGPU-MEDIUMS
// successor ports the painterly bodies; until then a painterly-medium consumer rides the
// WebGL2 path via the picker's `setupWGPU`-absent override, or accepts the smooth read).
// The parity capture is the DEFAULT (smooth) config → byte-equivalent on both backends.
//
// The shared OETF + Ottosson OKLCh matrices + FBM rotation + the palette ramp are
// SPLICED from `procedural-color.wgsl.ts` (the WGSL twin of the AV.W2 shared GLSL chunk),
// so the color math can never drift between the WGSL primary and the GLSL fallback.
//
// The Uniforms struct mirrors `aurora.wgsl.uniforms.ts` (the typed-struct source-of-truth)
// EXACTLY — the WGSL field order/alignment and the JS ArrayBuffer write offsets are
// generated from the SAME table, so a std140-vs-wgsl misalignment is caught by the
// parity-ΔE blowout, never silently read as garbage.

import {
    FBM_ROT_WGSL,
    OETF_WGSL,
    OKLCH_MATRICES_WGSL,
    PALETTE_RAMP_WGSL,
} from "./procedural-color.wgsl";

// MAX_NUCLEI=6 / MAX_STOPS=8 mirror aurora.frag.ts's #defines (and the JS-side
// AURORA_UNIFORM_LAYOUT). Each per-nucleus row + each palette stop is packed into a
// vec4 lane so the uniform array stride is the natural 16 bytes (no std140 stride trap —
// the parity-blowout suspect the wave's §Triumvirate names).
export const AURORA_WGSL = /* wgsl */ `
const MAX_NUCLEI: i32 = 6;
const MAX_STOPS: i32 = 8;
const PI: f32 = 3.141592653589793;

// ── Uniforms (the typed-struct source-of-truth — see aurora.wgsl.uniforms.ts) ──
// Scalars are packed into vec4 lanes to keep the std140/WGSL 16-byte struct alignment
// trivial. nuc0[i] = (pos.x, pos.y, radius, paletteBias); nuc1[i] = (valueBias,
// driftRadius, driftPhase, elong); nuc2[i] = (angle, _, _, _). palette[i].rgb is the
// CPU-baked linear-sRGB stop.
struct Uniforms {
  // scalars0: (uTime, uSoftmaxBeta, uValueVariance, uWarpAmount)
  scalars0: vec4<f32>,
  // scalars1: (uWarpScale, uWarpDrift, uSaturation, uPaperGrain)
  scalars1: vec4<f32>,
  // scalars2: (uAlpha, uNucleiDrift, uPaletteDrift, uBreathDepth)
  scalars2: vec4<f32>,
  // scalars3: (uBreathPeriod, uCursorStrength, uCursorRadius, _pad)
  scalars3: vec4<f32>,
  // cursor: (uCursor.x, uCursor.y, _pad, _pad)
  cursor: vec4<f32>,
  // ints: (uStopCount, uNucleiCount, uWarpMode, uNoiseOctaves)
  ints0: vec4<i32>,
  // ints1: (uMedium, uHuePath, _, _)
  ints1: vec4<i32>,
  palette: array<vec4<f32>, 8>,
  nuc0: array<vec4<f32>, 6>,
  nuc1: array<vec4<f32>, 6>,
  nuc2: array<vec4<f32>, 6>,
};

@group(0) @binding(0) var<uniform> u: Uniforms;

// ── Authoring-scale → rad/sec lifts (byte-identical to aurora.frag.ts) ──
const K_NUCLEI: f32 = 14.0;
const K_PAL: f32 = 24.0;
const K_WARP: f32 = 5.0;

// ── Noise (aurora-local hash21/vnoise/fbm — legitimately divergent per AV.W2 §3a) ──
fn hash21(p0: vec2<f32>) -> f32 {
  var p = fract(p0 * vec2<f32>(123.34, 456.21));
  p = p + dot(p, p + 45.32);
  return fract(p.x * p.y);
}

fn hash22(p0: vec2<f32>) -> vec2<f32> {
  let p = vec2<f32>(dot(p0, vec2<f32>(127.1, 311.7)),
                    dot(p0, vec2<f32>(269.5, 183.3)));
  return fract(sin(p) * 43758.5453);
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
  let octaves = u.ints0.w;
  for (var i = 0; i < 5; i = i + 1) {
    if (i >= octaves) { break; }
    v = v + a * vnoise(p);
    p = FBM_ROT * p * 2.02;
    a = a * 0.5;
  }
  return v;
}

${OETF_WGSL}
${OKLCH_MATRICES_WGSL}
${PALETTE_RAMP_WGSL}

// Interleaved Gradient Noise (Jimenez) — display-space 1-LSB dither.
fn ign(p: vec2<f32>) -> f32 {
  return fract(52.9829189 * fract(dot(p, vec2<f32>(0.06711056, 0.00583715))));
}

// Cellular / Worley f1.
fn cellular(p: vec2<f32>) -> f32 {
  let i = floor(p);
  let f = fract(p);
  var m = 1e9;
  for (var y = -1; y <= 1; y = y + 1) {
    for (var x = -1; x <= 1; x = x + 1) {
      let g = vec2<f32>(f32(x), f32(y));
      let o = hash22(i + g);
      let r = g + o - f;
      m = min(m, dot(r, r));
    }
  }
  return sqrt(m);
}

// ── Warp (Quilez double warp + the three warp modes + the cursor swirl) ──
fn domainWarp(p: vec2<f32>, t: f32) -> vec2<f32> {
  let warpScale = u.scalars1.x;
  let warpDrift = u.scalars1.y;
  let warpAmount = u.scalars0.w;
  let warpMode = u.ints0.z;
  let cursorStrength = u.scalars3.y;
  let cursorRadius = u.scalars3.z;
  let cursor = u.cursor.xy;

  let q = vec2<f32>(fbm(p * warpScale + vec2<f32>(0.0, 0.0) + t * warpDrift * K_WARP),
                    fbm(p * warpScale + vec2<f32>(5.2, 1.3) + t * warpDrift * K_WARP));
  let r = vec2<f32>(fbm(p * warpScale + 4.0 * q + vec2<f32>(1.7, 9.2)),
                    fbm(p * warpScale + 4.0 * q + vec2<f32>(8.3, 2.8)));

  var warp = r;
  if (warpMode == 1) {
    // cellular — chunky territories
    let c1 = cellular(p * warpScale * 1.5 + vec2<f32>(t * warpDrift * K_WARP * 2.0, 0.0));
    let c2 = cellular(p * warpScale * 1.5 + vec2<f32>(11.0, 7.0 + t * warpDrift * K_WARP * 2.0));
    warp = vec2<f32>(c1, c2);
  } else if (warpMode == 2) {
    // hybrid — fbm + cellular averaged
    let c1 = cellular(p * warpScale * 1.2);
    let c2 = cellular(p * warpScale * 1.2 + vec2<f32>(11.0, 7.0));
    warp = mix(r, vec2<f32>(c1, c2), 0.5);
  }
  var warped = p + warpAmount * warp;

  // Cursor swirl — rotate p around the cursor with radial falloff.
  if (cursorStrength > 0.001) {
    let toP = p - cursor;
    let d = length(toP);
    let rr = max(cursorRadius, 0.01);
    let w = exp(-(d * d) / (rr * rr * 0.45));
    let ang = w * cursorStrength * 2.1;
    let ca = cos(ang);
    let sa = sin(ang);
    var rotated = vec2<f32>(ca * toP.x - sa * toP.y, sa * toP.x + ca * toP.y) + cursor;
    let pinch = w * cursorStrength * 0.08;
    rotated = mix(rotated, cursor, pinch);
    warped = mix(warped, rotated + warpAmount * warp * 0.7, w * cursorStrength);
  }
  return warped;
}

// ── Palette LUT ──
fn samplePalette(id0: f32) -> vec3<f32> {
  let id = clamp(id0, 0.0, 1.0);
  let stopCount = u.ints0.x;
  let scaled = id * f32(stopCount - 1);
  let i0 = i32(floor(scaled));
  let i1 = min(i0 + 1, stopCount - 1);
  let t = fract(scaled);
  return samplePaletteRamp(u.palette[i0].rgb, u.palette[i1].rgb, t, u.ints1.y);
}

// ── Nuclei field (anisotropic Gaussian softmax + drift + palette drift) ──
struct NucleiResult { paletteId: f32, valueMod: f32 };

fn nucleiField(p: vec2<f32>, t: f32) -> NucleiResult {
  let nucleiCount = u.ints0.y;
  let nucleiDrift = u.scalars2.y;
  let paletteDrift = u.scalars2.z;
  let softmaxBeta = u.scalars0.y;

  var accumBias = 0.0;
  var accumValue = 0.0;
  var accumW = 0.0;
  for (var i = 0; i < MAX_NUCLEI; i = i + 1) {
    if (i >= nucleiCount) { break; }
    let n0 = u.nuc0[i];   // pos.x, pos.y, radius, paletteBias
    let n1 = u.nuc1[i];   // valueBias, driftRadius, driftPhase, elong
    let angle = u.nuc2[i].x;
    let driftRadius = n1.y;
    let driftPhase = n1.z;
    let posI = n0.xy + driftRadius * vec2<f32>(
      cos(t * nucleiDrift * K_NUCLEI + driftPhase),
      sin(t * nucleiDrift * K_NUCLEI + driftPhase * 1.13)
    );
    let diff = p - posI;
    let ca = cos(angle);
    let sa = sin(angle);
    let local = vec2<f32>(ca * diff.x + sa * diff.y, -sa * diff.x + ca * diff.y);
    let along = local.x / max(n1.w, 0.01);
    let across = local.y;
    let d2 = along * along + across * across;
    let r = max(n0.z, 0.01);
    let w = exp(-softmaxBeta * d2 / (r * r));
    accumBias = accumBias + w * n0.w;
    accumValue = accumValue + w * n1.x;
    accumW = accumW + w;
  }
  var paletteId = accumBias / max(accumW, 1e-4);
  let valueMod = accumValue / max(accumW, 1e-4);

  let palAmp = clamp(paletteDrift * 6.0, 0.0, 0.06);
  paletteId = paletteId + palAmp * sin(t * paletteDrift * K_PAL);
  paletteId = clamp(paletteId, 0.0, 1.0);
  return NucleiResult(paletteId, valueMod);
}

// ── Color utils (OKLCh saturation) ──
fn linOklab(lin: vec3<f32>) -> vec3<f32> {
  let lms = LINEAR_SRGB_TO_LMS * lin;
  return LMS_TO_OKLAB * cbrt3(lms);
}

fn saturate3(c: vec3<f32>, amt: f32) -> vec3<f32> {
  var lch = oklabToOklch(linOklab(c));
  lch.y = max(lch.y * amt, 0.0);
  return max(oklabToLinearSrgb(oklchToOklab(lch)), vec3<f32>(0.0));
}

// ── PBR-Neutral tonemap (named aces() in the GLSL — the tonemap slot) ──
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

// ── Full-screen triangle vertex stage (the pilot idiom — no vertex buffer) ──
struct VSOut {
  @builtin(position) pos: vec4<f32>,
  @location(0) uv: vec2<f32>,
};

@vertex
fn vs_main(@builtin(vertex_index) vi: u32) -> VSOut {
  // NDC corners of the covering triangle (-1,-1), (3,-1), (-1,3).
  var p = vec2<f32>(-1.0, -1.0);
  if (vi == 1u) { p = vec2<f32>(3.0, -1.0); }
  else if (vi == 2u) { p = vec2<f32>(-1.0, 3.0); }
  var out: VSOut;
  out.pos = vec4<f32>(p, 0.0, 1.0);
  // vUv = aPos * 0.5 + 0.5 (the aurora.vert convention).
  out.uv = p * 0.5 + 0.5;
  return out;
}

// ── Fragment stage (the main() transcription) ──
@fragment
fn fs_main(in: VSOut) -> @location(0) vec4<f32> {
  let t = u.scalars0.x;
  let valueVariance = u.scalars0.z;
  let breathDepth = u.scalars2.w;
  let breathPeriod = u.scalars3.x;
  let saturation = u.scalars1.z;
  let paperGrain = u.scalars1.w;
  let alpha = u.scalars2.x;

  let uv = in.uv;
  let pN = uv;

  let p_warp = domainWarp(pN, t);

  let nf = nucleiField(p_warp, t);
  var col = samplePalette(nf.paletteId);
  col = col * (1.0 + valueVariance * nf.valueMod);

  // Breath — slow global luminance wobble.
  let breath = sin(t * 6.2831 / max(breathPeriod, 1.0));
  col = col * (1.0 + breathDepth * breath * 0.5);

  // The painterly mediums (uMedium 1-6) are the WebGL2 fallback's register; the WGSL
  // primary renders the smooth core for the default parity capture (the booked
  // W-AURORA-WGPU-MEDIUMS successor ports the painterly bodies).

  // Saturation trim.
  col = saturate3(col, saturation);

  // Tonemap + film grain.
  col = aces(col);
  // gl_FragCoord.xy → the device-pixel position (the WGSL @builtin(position)).
  let fragCoord = in.pos.xy;
  let grain = hash21(fragCoord + t * 17.0);
  col = col + (grain - 0.5) * paperGrain;

  col = clamp(col * 0.985 + 0.008, vec3<f32>(0.0), vec3<f32>(1.0));

  // MANDATORY OETF — closes the seam (the whole pipeline above runs in LINEAR).
  col = linearToSrgb(col);

  // 1-LSB triangular IGN dither in DISPLAY space, AFTER the OETF.
  col = col + (1.0 / 255.0) * (ign(fragCoord) - 0.5);

  // Premultiply on DISPLAY-space color (matches the WebGL2 path: OETF, then premul).
  return vec4<f32>(col * alpha, alpha);
}
`;
