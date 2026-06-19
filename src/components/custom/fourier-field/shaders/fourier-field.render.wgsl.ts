// BC.W-VIZ-FOURIER — the fullscreen-fragment SDF RENDER pass (WebGPU primary).
//
// A pure full-screen-triangle pass (the aurora/concentric shape-class — the most robust
// single-draw paint): `vs_main` emits the 3-vertex fullscreen triangle; `fs_main` reads
// the compute pass's `curveSamples` (the comet body) + `chainTips` (the epicycle chain)
// storage buffers and composites the field by analytic SDF —
//   • the comet TRAIL: min-distance to the curve polyline, AA-feathered by fwidth, the
//     per-segment AGE driving the fade `peak·pow(age, fadeExp)` floored at `peak·floor`
//     (a per-FRAGMENT alpha — no `globalAlpha` banding, no `lighter` hue-blowout);
//   • the epicycle ARMS + orbit RINGS + joint DOTS: SDFs over the chain tips;
//   • the comet HEAD: a radial halo + saturated core + white specular at curveSamples[0].
// Color rides the shared `procedural-color.wgsl.ts` OKLCh ramp (the rainbow chain a
// hue-sweep over it, NOT a second color path). Premultiplied-alpha over the transparent
// clear KILLS the `lighter` additive hue-blowout the Canvas2D path fought.

import {
    OETF_WGSL,
    OKLCH_MATRICES_WGSL,
} from "../../aurora/constants/shaders/procedural-color.wgsl";

export const FOURIER_FIELD_RENDER_WGSL = /* wgsl */ `
const PI: f32 = 3.141592653589793;
const TAU: f32 = 6.283185307179586;
const MAX_CURVE_SAMPLES: i32 = 384;
const MAX_PHASORS: i32 = 64;
const MAX_FOURIER_STOPS: i32 = 4;

// ── Render uniforms (the typed-struct source-of-truth — see uniformBridgeWGPU.ts) ──
struct RenderUniforms {
  // r0: (centerX, centerY, scale, aspect)  — model→clip fit transform
  r0: vec4<f32>,
  // r1: (trailWidth, peakAlpha, headGlowAlpha, trailFadeExp)
  r1: vec4<f32>,
  // r2: (trailFloor, intensity, showEpicycles, rainbowChain)
  r2: vec4<f32>,
  // ints: (sampleCount, armCount, stopCount, _pad)
  ints: vec4<i32>,
  // palette stops: linear-sRGB rgb + _pad
  palette: array<vec4<f32>, 4>,
};

@group(0) @binding(0) var<uniform> u: RenderUniforms;
// curveSamples[i] = (x, y, age, _pad) in MODEL space
@group(0) @binding(1) var<storage, read> curveSamples: array<vec4<f32>>;
// chainTips[k] = (x, y, _pad, _pad) in MODEL space
@group(0) @binding(2) var<storage, read> chainTips: array<vec4<f32>>;

${OETF_WGSL}
${OKLCH_MATRICES_WGSL}

// Sample the multi-stop palette (linear-sRGB stops, OKLab mix). t in [0,1].
fn samplePaletteLin(t: f32) -> vec3<f32> {
  let stopCount = u.ints.z;
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

// A warm-anchored chain hue sweep over the palette base — the rainbow chain register.
// Tilts the base hue by a tight warm-ward band so the chain stays colourful but warm.
fn chainColorLin(seg: f32, rainbow: bool) -> vec3<f32> {
  let baseLin = u.palette[0].rgb;
  if (!rainbow) { return baseLin; }
  let lab = LMS_TO_OKLAB * cbrt3(LINEAR_SRGB_TO_LMS * baseLin);
  let lch = oklabToOklch(lab);
  // warm-anchored: a touch cool at the root climbing warm toward the tips.
  let hueShift = mix(-0.45, 1.15, clamp(seg, 0.0, 1.0)); // radians (~ -26°..+66°)
  let h = lch.z + hueShift;
  let lifted = vec3<f32>(0.66, max(lch.y, 0.14), h);
  return oklabToLinearSrgb(oklchToOklab(lifted));
}

// Distance from point p to segment ab (model space).
fn segDist(p: vec2<f32>, a: vec2<f32>, b: vec2<f32>) -> f32 {
  let pa = p - a;
  let ba = b - a;
  let h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-8), 0.0, 1.0);
  return length(pa - ba * h);
}

struct VSOut {
  @builtin(position) pos: vec4<f32>,
  @location(0) model: vec2<f32>,   // model-space coordinate of this fragment
};

@vertex
fn vs_main(@builtin(vertex_index) vi: u32) -> VSOut {
  // Full-screen triangle (covers the viewport with 3 verts).
  var p = array<vec2<f32>, 3>(
    vec2<f32>(-1.0, -3.0), vec2<f32>(-1.0, 1.0), vec2<f32>(3.0, 1.0),
  );
  let clip = p[vi];
  // Inverse of the model→clip fit: clip = (model − center)·scale, aspect-corrected x.
  // → model = center + clip·(1/scale), x un-aspect-corrected.
  let center = u.r0.xy;
  let scale = max(u.r0.z, 1e-6);
  let aspect = max(u.r0.w, 1e-4);
  let model = center + vec2<f32>(clip.x * aspect, clip.y) / scale;

  var out: VSOut;
  out.pos = vec4<f32>(clip, 0.0, 1.0);
  out.model = model;
  return out;
}

@fragment
fn fs_main(in: VSOut) -> @location(0) vec4<f32> {
  let p = in.model;
  // AA feather: one device pixel in model units (fwidth of the model coord).
  let aa = max(fwidth(p.x) + fwidth(p.y), 1e-5) * 0.75;

  let trailWidth = u.r1.x;                // already in model units (packed CPU-side)
  let peak = u.r1.y * u.r2.y;             // peakAlpha · intensity
  let headGlow = u.r1.z * u.r2.y;
  let fadeExp = u.r1.w;
  let trailFloor = u.r2.x;
  let sampleCount = u.ints.x;
  let armCount = u.ints.y;
  let showEpicycles = u.r2.z > 0.5;
  let rainbow = u.r2.w > 0.5;
  let halfW = trailWidth * 0.5;

  var accum = vec4<f32>(0.0);              // premultiplied accumulation

  // ── Epicycle scaffolding (orbit rings + arms + joint dots) UNDER the curve ──
  if (showEpicycles && armCount >= 1) {
    for (var k = 0; k < MAX_PHASORS; k = k + 1) {
      if (k >= armCount) { break; }
      let a = chainTips[k].xy;
      let b = chainTips[k + 1].xy;
      let seg = f32(k) / max(f32(armCount - 1), 1.0);
      let lin = chainColorLin(seg, rainbow);
      // orbit RING around a (radius = arm length).
      let radius = length(b - a);
      let dRing = abs(length(p - a) - radius);
      let ringW = max(halfW * 0.45, aa);
      let ringMask = (1.0 - smoothstep(ringW, ringW + aa, dRing)) * 0.5;
      // ARM segment a→b.
      let dArm = segDist(p, a, b);
      let armMask = 1.0 - smoothstep(halfW * 0.55, halfW * 0.55 + aa, dArm);
      // joint DOT at a.
      let dotR = max(halfW * 0.7, aa * 2.0);
      let dDot = length(p - a);
      let dotMask = 1.0 - smoothstep(dotR, dotR + aa, dDot);
      let m = clamp(max(max(ringMask, armMask), dotMask), 0.0, 1.0) * peak * 0.7;
      let rgb = clamp(linearToSrgb(lin), vec3<f32>(0.0), vec3<f32>(1.0));
      // over-composite (premultiplied).
      accum = vec4<f32>(rgb * m, m) + accum * (1.0 - m);
    }
  }

  // ── The comet TRAIL — min-distance to the curve polyline, per-segment age fade ──
  for (var i = 0; i < MAX_CURVE_SAMPLES; i = i + 1) {
    if (i >= sampleCount - 1) { break; }
    let sa = curveSamples[i];
    let sb = curveSamples[i + 1];
    let d = segDist(p, sa.xy, sb.xy);
    let cover = 1.0 - smoothstep(halfW, halfW + aa, d);
    if (cover < 0.002) { continue; }
    let age = max(sa.z, sb.z);            // 1 at head, 0 at tail
    var a = peak * pow(age, fadeExp);
    a = max(a, peak * trailFloor);
    a = a * cover;
    let lin = samplePaletteLin(1.0 - age * 0.4); // warm core, lighter tail
    let rgb = clamp(linearToSrgb(lin), vec3<f32>(0.0), vec3<f32>(1.0));
    accum = vec4<f32>(rgb * a, a) + accum * (1.0 - a);
  }

  // ── The comet HEAD — halo + saturated core + white specular at curveSamples[0] ──
  if (sampleCount >= 1) {
    let head = curveSamples[0].xy;
    let dHead = length(p - head);
    let coreR = halfW * 1.5;
    let haloR = coreR * 3.0;
    let headLin = samplePaletteLin(0.0);
    let headRgb = clamp(linearToSrgb(headLin), vec3<f32>(0.0), vec3<f32>(1.0));
    // soft halo
    let halo = (1.0 - smoothstep(0.0, haloR, dHead)) * headGlow * 0.35;
    accum = vec4<f32>(headRgb * halo, halo) + accum * (1.0 - halo);
    // saturated core
    let core = (1.0 - smoothstep(coreR, coreR + aa, dHead)) * headGlow;
    accum = vec4<f32>(headRgb * core, core) + accum * (1.0 - core);
    // white specular
    let spec = (1.0 - smoothstep(coreR * 0.4, coreR * 0.4 + aa, dHead)) * headGlow * 0.9;
    accum = vec4<f32>(vec3<f32>(1.0) * spec, spec) + accum * (1.0 - spec);
  }

  return accum;
}
`;
