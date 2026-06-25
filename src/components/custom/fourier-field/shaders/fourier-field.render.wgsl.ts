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
// BD.W-FOURIER-LOOM §2b — the degenerate-tangent guard (must equal FOURIER_TANGENT_EPS in
// constants.ts + the GL CPU bead path so a cusp resolves IDENTICALLY across both engines).
const TANGENT_EPS: f32 = 1e-4;
// The speed yardstick: the head speed (model units between curveSamples[0] and [1]) is
// normalized against this many trail half-widths so ŝ ∈ [0,1] is scale-free + parity-safe.
const SPEED_REF_HALFWIDTHS: f32 = 6.0;

// ── Render uniforms (the typed-struct source-of-truth — see uniformBridgeWGPU.ts) ──
struct RenderUniforms {
  // r0: (centerX, centerY, scale, aspect)  — model→clip fit transform
  r0: vec4<f32>,
  // r1: (trailWidth, peakAlpha, headGlowAlpha, trailFadeExp)
  r1: vec4<f32>,
  // r2: (trailFloor, intensity, showEpicycles, rainbowChain)
  r2: vec4<f32>,
  // r3: (squashGain, celGain, _pad, _pad) — FOURIER-LOOM §2b/§3b
  r3: vec4<f32>,
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

// BD.W-FOURIER-LOOM §2b — the head travel frame: the unit tangent T from curveSamples[0]
// (head) vs [1] (one step back) + the normalized speed ŝ ∈ [0,1]. The cusp guard returns
// the +x axis as the stable fallback when s ≤ TANGENT_EPS, identical to the GL CPU path.
struct HeadFrame { T: vec2<f32>, sHat: f32, };
fn headFrame(head: vec2<f32>, headBack: vec2<f32>, halfW: f32) -> HeadFrame {
  let d = head - headBack;
  let s = length(d);
  var out: HeadFrame;
  if (s <= TANGENT_EPS) {
    out.T = vec2<f32>(1.0, 0.0);
    out.sHat = 0.0;
    return out;
  }
  out.T = d / s;
  let refScale = max(halfW * SPEED_REF_HALFWIDTHS, 1e-6);
  out.sHat = clamp(s / refScale, 0.0, 1.0);
  return out;
}

// The volume-preserving anisotropic head distance: project (p − head) onto T and T⊥, stretch
// the tangent extent by (1 + k·ŝ) and squeeze the normal extent by 1/(1 + k·ŝ), then length.
// k = 0 (or ŝ = 0) collapses to the round disc length(p − head) — byte-frozen at rest.
fn headAniso(p: vec2<f32>, head: vec2<f32>, fr: HeadFrame, k: f32) -> f32 {
  let g = 1.0 + k * fr.sHat;
  let n = vec2<f32>(-fr.T.y, fr.T.x);
  let rel = p - head;
  let along = dot(rel, fr.T) / g;
  let across = dot(rel, n) * g;
  return length(vec2<f32>(along, across));
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
  let squashGain = u.r3.x;                 // FOURIER-LOOM §2b
  let celGain = u.r3.y;                    // FOURIER-LOOM §3b
  let halfW = trailWidth * 0.5;

  // BD.W-FOURIER-LOOM §2b — the head travel frame (the SAME curveSamples[0]/[1] both engines
  // read → parity by construction). The cel offset (§3b) rides −T (opposite travel).
  var headFr: HeadFrame;
  headFr.T = vec2<f32>(1.0, 0.0);
  headFr.sHat = 0.0;
  if (sampleCount >= 2) {
    headFr = headFrame(curveSamples[0].xy, curveSamples[1].xy, halfW);
  }
  let celOff = -headFr.T * halfW * 1.4;    // the ink lags behind the travel

  var accum = vec4<f32>(0.0);              // premultiplied accumulation

  // ── §3b — the cartoon CEL-SHADOW: a darker offset copy of the chain + rope, opposite
  //    travel, painted FIRST (it sits UNDER the lit chain). PRM-static (the frozen-T travel
  //    frame is a fixed offset, no live sweep). celGain = 0 → no pass (byte-frozen). ──
  if (celGain > 0.001) {
    let ink = vec3<f32>(0.0);              // pure ink — the technicolor 2-tone shadow
    let celA = clamp(celGain, 0.0, 1.0);
    // the rope cel (one offset distance-to-curve band).
    for (var i = 0; i < MAX_CURVE_SAMPLES; i = i + 1) {
      if (i >= sampleCount - 1) { break; }
      let sa = curveSamples[i].xy + celOff;
      let sb = curveSamples[i + 1].xy + celOff;
      let d = segDist(p, sa, sb);
      let cover = 1.0 - smoothstep(halfW, halfW + aa, d);
      if (cover < 0.002) { continue; }
      let m = cover * celA * peak;
      accum = vec4<f32>(ink * m, m) + accum * (1.0 - m);
    }
    // the chain cel (arms only — the bold scaffold ink).
    if (showEpicycles && armCount >= 1) {
      for (var k = 0; k < MAX_PHASORS; k = k + 1) {
        if (k >= armCount) { break; }
        let a = chainTips[k].xy + celOff;
        let b = chainTips[k + 1].xy + celOff;
        let dArm = segDist(p, a, b);
        let armMask = 1.0 - smoothstep(halfW * 0.55, halfW * 0.55 + aa, dArm);
        let m = armMask * celA * peak * 0.7;
        accum = vec4<f32>(ink * m, m) + accum * (1.0 - m);
      }
    }
  }

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

  // ── The comet HEAD — squash-and-stretch (§2b) halo + saturated core + white specular.
  //    dHead is the volume-preserving anisotropic distance off the travel frame; at rest
  //    (sHat=0) or squashGain=0 it collapses to the round disc length(p − head). ──
  if (sampleCount >= 1) {
    let head = curveSamples[0].xy;
    let dHead = headAniso(p, head, headFr, squashGain);
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
