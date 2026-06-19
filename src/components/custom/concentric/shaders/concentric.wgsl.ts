// BC.W-VIZ-CONCENTRIC — the fullscreen radial-Fourier ring-interference fragment pass
// (WebGPU primary), rendered as thin bright ELLIPSOID ISOLINE STROKES (not a smooth blur).
//
// The same shape-class as aurora — a pure full-screen-triangle fragment pass (no vertex
// buffer). `fs_main` evaluates the field f(p,t) (a sum of CLEAN radial sinusoids over
// ≤ MAX_CENTERS tilted-ellipsoid families × ≤ MAX_RINGS clean frequencies), extracts each
// crest as a constant-width antialiased LINE via Inigo Quilez's gradient-normalized
// distance-estimation (de ≈ |sin|/(|cos|·k·|∇r|), iquilezles.org/articles/distance/ — the
// gradient is closed-form since the field is a sum of sinusoids), unions the lines
// brightest-wins (crossing families read as a bright moiré lattice), and tints the BEAT
// ENVELOPE through the shared OKLCh ramp. The LINE carries the ink; the field is transparent
// behind it (the page reads through the troughs).
//
// THE SINGLE MATH SOURCE. The `sampleRingField`/`ellipsoidalRadiusRot`/`ellipsoidalGradMag`/
// the isoline `de` below transcribe `composables/ringField.ts` line-for-line. `proof:concentric`
// clause 3 round-trips the two paths at a fixed sample set (the transcription-drift trap
// closed by a structural match, not a per-line loop).

import {
    OETF_WGSL,
    OKLCH_MATRICES_WGSL,
} from "../../aurora/constants/shaders/procedural-color.wgsl";

export const CONCENTRIC_WGSL = /* wgsl */ `
const PI: f32 = 3.141592653589793;
const TAU: f32 = 6.283185307179586;
const RING_GRAVITY: f32 = 9.81;
const MAX_RINGS: i32 = 8;
const MAX_CENTERS: i32 = 4;
const MAX_RING_STOPS: i32 = 4;

// ── Concentric uniforms (the typed-struct source-of-truth — see uniformBridgeWGPU.ts) ──
struct ConcentricUniforms {
  // u0: (uTime, uSpeed, uAxisA, uAxisB)
  u0: vec4<f32>,
  // ints: (uCenterCount, uRingCount, uStopCount, uRenderMode)  // 0 rings · 1 contour · 2 both
  ints: vec4<i32>,
  // bg: (background.rgb (linear), hasBackground)
  bg: vec4<f32>,
  // norm: (uFieldNorm, uAspect, _pad, _pad) — field → [0,1] scale
  norm: vec4<f32>,
  // line: (lineHalfWidth, aaSoftness, contourLevels, _pad) — stroke geometry (field units)
  line: vec4<f32>,
  // each ring row: (amplitude, wavelength, phase, _pad)
  rings: array<vec4<f32>, 8>,
  // each center row: (x, y, weight, rotAlpha)
  centers: array<vec4<f32>, 4>,
  // each palette stop: linear-sRGB rgb + _pad
  palette: array<vec4<f32>, 4>,
};

@group(0) @binding(0) var<uniform> u: ConcentricUniforms;

${OETF_WGSL}
${OKLCH_MATRICES_WGSL}

// Full-screen-triangle (the pilot idiom): NDC corners (-1,-1),(3,-1),(-1,3) cover the
// viewport from a single 3-vertex draw — no vertex buffer.
struct VSOut {
  @builtin(position) pos: vec4<f32>,
  @location(0) uv: vec2<f32>,  // domain [-1,1]², aspect-corrected x
};

@vertex
fn vs_main(@builtin(vertex_index) vi: u32) -> VSOut {
  var corners = array<vec2<f32>, 3>(
    vec2<f32>(-1.0, -1.0), vec2<f32>(3.0, -1.0), vec2<f32>(-1.0, 3.0),
  );
  let c = corners[vi];
  var out: VSOut;
  out.pos = vec4<f32>(c, 0.0, 1.0);
  out.uv = vec2<f32>(c.x, c.y);
  return out;
}

// The ellipsoidal radial distance in the family's ROTATED frame R(−α): rotate (p − c) by
// −α, then scale by (a,b). Transcribes ringField.ts ellipsoidalRadiusRot.
fn ellipsoidalRadiusRot(p: vec2<f32>, center: vec2<f32>, rotAlpha: f32, axisA: f32, axisB: f32) -> f32 {
  let ca = cos(rotAlpha);
  let sa = sin(rotAlpha);
  let px = p.x - center.x;
  let py = p.y - center.y;
  let rx = ca * px + sa * py;
  let ry = -sa * px + ca * py;
  let dx = rx / max(axisA, 1e-4);
  let dy = ry / max(axisB, 1e-4);
  return sqrt(dx * dx + dy * dy);
}

// |∇r| of the rotated ellipsoidal radius — closed-form (the IQ distance-estimation
// denominator). Transcribes ringField.ts ellipsoidalGradMag.
fn ellipsoidalGradMag(p: vec2<f32>, center: vec2<f32>, rotAlpha: f32, axisA: f32, axisB: f32) -> f32 {
  let ca = cos(rotAlpha);
  let sa = sin(rotAlpha);
  let px = p.x - center.x;
  let py = p.y - center.y;
  let rx = ca * px + sa * py;
  let ry = -sa * px + ca * py;
  let a = max(axisA, 1e-4);
  let b = max(axisB, 1e-4);
  let sx = rx / a;
  let sy = ry / b;
  let r = sqrt(sx * sx + sy * sy);
  let gx = sx / a;
  let gy = sy / b;
  return sqrt(gx * gx + gy * gy) / max(r, 1e-4);
}

// The radial-Fourier ring-interference value f(p,t) — the multi-center weighted sum of
// CLEAN radial sinusoids (the BEAT ENVELOPE; transcribes ringField.ts sampleRingField).
fn sampleRingField(p: vec2<f32>, t: f32) -> f32 {
  var acc = 0.0;
  let speed = u.u0.y;
  let axisA = u.u0.z;
  let axisB = u.u0.w;
  let centerCount = u.ints.x;
  let ringCount = u.ints.y;
  for (var j = 0; j < MAX_CENTERS; j = j + 1) {
    if (j >= centerCount) { break; }
    let cj = u.centers[j];
    let radius = ellipsoidalRadiusRot(p, cj.xy, cj.w, axisA, axisB);
    var centerSum = 0.0;
    for (var i = 0; i < MAX_RINGS; i = i + 1) {
      if (i >= ringCount) { break; }
      let r = u.rings[i];
      let k = TAU / max(r.y, 1e-4);
      let omega = sqrt(RING_GRAVITY * k) * speed;
      let theta = k * radius - omega * t + r.z;
      centerSum = centerSum + r.x * sin(theta);
    }
    acc = acc + centerSum * cj.z;
  }
  return acc;
}

// The IQ gradient-normalized isoline INK + the beat ENVELOPE — the per-pixel line strength
// (brightest-wins union over every family × ring crest) and the raw envelope (the hue
// driver). Transcribes ringField.ts ringIsolineInk.
struct InkEnv { ink: f32, env: f32, };
fn ringIsolineInk(p: vec2<f32>, t: f32) -> InkEnv {
  var ink = 0.0;
  var env = 0.0;
  let speed = u.u0.y;
  let axisA = u.u0.z;
  let axisB = u.u0.w;
  let centerCount = u.ints.x;
  let ringCount = u.ints.y;
  let lineHalfW = u.line.x;
  let aa = u.line.y;
  for (var j = 0; j < MAX_CENTERS; j = j + 1) {
    if (j >= centerCount) { break; }
    let cj = u.centers[j];
    let radius = ellipsoidalRadiusRot(p, cj.xy, cj.w, axisA, axisB);
    let gradR = ellipsoidalGradMag(p, cj.xy, cj.w, axisA, axisB);
    for (var i = 0; i < MAX_RINGS; i = i + 1) {
      if (i >= ringCount) { break; }
      let r = u.rings[i];
      let k = TAU / max(r.y, 1e-4);
      let omega = sqrt(RING_GRAVITY * k) * speed;
      let phase = k * radius - omega * t + r.z;
      let s = sin(phase);
      let cphase = abs(cos(phase));
      let gradPhase = max(k * gradR, 1e-4);
      // The IQ gradient-normalized distance-to-isoline (domain units; round-trips JS).
      let de = abs(s) / max(cphase * gradPhase, 1e-4);
      // Convert the domain-units distance to PIXELS via fwidth(phase) (the device
      // per-pixel phase change) so the stroke is a constant pixel width everywhere —
      // lineHalfW/aa are in pixels (NOT fwidthFine, Compatibility-Mode safe).
      let dPx = max(fwidth(phase), 1e-4);
      let dePx = de * gradPhase / dPx;
      var lineV = 1.0 - smoothstep(lineHalfW, lineHalfW + aa, dePx);
      // Analytic anti-aliasing: where the rings pack tighter than the pixel can resolve
      // (fwidth(phase) ≳ π, near a center / under DPR), FADE the line out instead of
      // flooding to a solid mass (IQ filterwidth — the aliasing-fade that keeps the field
      // thin LINES, not a bright slab where the rings converge).
      let aliasFade = 1.0 - smoothstep(PI * 0.6, PI * 1.2, dPx);
      lineV = lineV * aliasFade;
      let w = r.x * cj.z;
      ink = max(ink, lineV * w);
      env = env + s * w;
    }
  }
  var oe: InkEnv;
  oe.ink = clamp(ink, 0.0, 1.0);
  oe.env = env;
  return oe;
}

// The topographic-contour operator: the isolines of the STATIC interference envelope at N
// evenly-spaced heights. de_contour = |fract(f·N + 0.5) − 0.5| / |fwidth(f·N)| — the IQ
// contour-line form. fwidth is the device pixel-derivative safety clamp on the composite
// ONLY (NOT fwidthFine — Compatibility-Mode safe on Metal/WebKit).
fn contourInk(envValue: f32, levels: f32) -> f32 {
  let fN = envValue * levels;
  let band = abs(fract(fN + 0.5) - 0.5);
  // fwidth is the device pixel-derivative safety clamp (NOT fwidthFine — Compatibility-Mode
  // safe on Metal/WebKit).
  let aaW = max(fwidth(fN), 1e-4);
  return 1.0 - smoothstep(u.line.x, u.line.x + u.line.y, band / aaW);
}

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

@fragment
fn fs_main(in: VSOut) -> @location(0) vec4<f32> {
  // aspect-correct the domain x so the rings read circular under the ellipsoidal norm.
  let aspect = max(u.norm.y, 1e-4);
  let p = vec2<f32>(in.uv.x * aspect, in.uv.y);
  let t = u.u0.x;
  let mode = u.ints.w;  // 0 traveling-rings · 1 static-contour · 2 both
  let levels = u.line.z;

  // The isoline strokes (the LINES) + the beat envelope (the HUE).
  let oe = ringIsolineInk(p, t);
  var ink = oe.ink;
  let env = oe.env;

  // The static-contour mode draws elevation lines of the (static) envelope.
  if (mode == 1) {
    ink = contourInk(env * u.norm.x, max(levels, 1.0));
  } else if (mode == 2) {
    ink = max(ink, contourInk(env * u.norm.x, max(levels, 1.0)));
  }
  // fwidth safety clamp on the final line composite (Compatibility-Mode safe).
  ink = clamp(ink, 0.0, 1.0);

  // The beat-envelope drives the warm-family tone across the ramp (cream↔amber↔ember) so the
  // crossing ring families read as warm-light interference; the saturated mid-amber reads on
  // BOTH the cream page and the dark page (the warm-cream identity, NOT a themed hue).
  let v = clamp(0.5 + env * u.norm.x, 0.0, 1.0);
  let lin = samplePaletteLin(v);
  let rgb = clamp(linearToSrgb(lin), vec3<f32>(0.0), vec3<f32>(1.0));

  let hasBg = u.bg.w;
  if (hasBg > 0.5) {
    // opaque themed ground: composite the lit line over the themed bg.
    let bg = clamp(linearToSrgb(u.bg.rgb), vec3<f32>(0.0), vec3<f32>(1.0));
    let outRgb = mix(bg, rgb, ink);
    return vec4<f32>(outRgb, 1.0);
  }
  // transparent ground: the LINE carries the alpha — the page reads through the troughs.
  let alpha = ink;
  return vec4<f32>(rgb * alpha, alpha);
}
`;
