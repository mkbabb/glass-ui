// BB.W-VIZ-SUITE (W-CONCENTRIC) — the fullscreen radial-Fourier ring-interference
// fragment pass (WebGPU primary).
//
// The same shape-class as aurora — a pure full-screen-triangle fragment pass (the pilot's
// `vs_main` idiom, no vertex buffer). `fs_main` evaluates f(p,t) (the radial Fourier ring
// sum over ≤ MAX_CENTERS centers × ≤ MAX_RINGS components), maps the value through the
// ColorResolver palette via the shared `procedural-color.wgsl.ts` OKLCh ramp (the ONE
// color source — no second color path), and tone-maps to sRGB.
//
// THE SINGLE MATH SOURCE. The `sampleRingField` body below transcribes
// `composables/ringField.ts` line-for-line: the ellipsoidal radius sqrt((dx/a)²+(dy/b)²),
// the per-component ω = √(g·k), the θ = k·radius − ω·t + φ phase, and the per-center
// weighted sum. `proof:concentric` clause 3 round-trips the two paths at a fixed sample
// set (the transcription-drift trap closed by a structural match, not a per-line loop).

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
  // ints: (uCenterCount, uRingCount, uStopCount, _pad)
  ints: vec4<i32>,
  // bg: (background.rgb (linear), hasBackground)
  bg: vec4<f32>,
  // norm: (uFieldNorm, uAspect, _pad, _pad) — field → [0,1] scale
  norm: vec4<f32>,
  // each ring row: (amplitude, wavelength, phase, _pad)
  rings: array<vec4<f32>, 8>,
  // each center row: (x, y, weight, _pad)
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
  // aspect-correct so the rings stay circular under the ellipsoidal norm (NOT squashed
  // by the canvas aspect): widen the domain x by the aspect ratio.
  out.uv = vec2<f32>(c.x, c.y);
  return out;
}

// The ellipsoidal radial distance ‖p − c‖_e = sqrt((dx/a)² + (dy/b)²). The single radial
// metric (transcribes ringField.ts ellipsoidalRadius).
fn ellipsoidalRadius(p: vec2<f32>, center: vec2<f32>, axisA: f32, axisB: f32) -> f32 {
  let dx = (p.x - center.x) / max(axisA, 1e-4);
  let dy = (p.y - center.y) / max(axisB, 1e-4);
  return sqrt(dx * dx + dy * dy);
}

// The radial-Fourier ring-interference value f(p,t) — the multi-center weighted sum of
// radial sinusoids (transcribes ringField.ts sampleRingField line-for-line).
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
    let radius = ellipsoidalRadius(p, cj.xy, axisA, axisB);
    var centerSum = 0.0;
    for (var i = 0; i < MAX_RINGS; i = i + 1) {
      if (i >= ringCount) { break; }
      let r = u.rings[i];
      let k = TAU / max(r.y, 1e-4);
      // ω = √(g·k); speed scales the travel (the shared dispersion law).
      let omega = sqrt(RING_GRAVITY * k) * speed;
      let theta = k * radius - omega * t + r.z;
      centerSum = centerSum + r.x * sin(theta);
    }
    acc = acc + centerSum * cj.z;
  }
  return acc;
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

  let raw = sampleRingField(p, t);
  // Normalize the field → [0,1] for the palette ramp (uFieldNorm is the amplitude scale).
  let v = clamp(0.5 + raw * u.norm.x, 0.0, 1.0);

  let lin = samplePaletteLin(v);
  let rgb = clamp(linearToSrgb(lin), vec3<f32>(0.0), vec3<f32>(1.0));

  // Premultiplied-alpha output over the (transparent / themed) ground.
  let hasBg = u.bg.w;
  if (hasBg > 0.5) {
    // opaque themed ground: the field paints fully opaque.
    return vec4<f32>(rgb, 1.0);
  }
  // transparent ground: the field's alpha rides its own brightness so the page reads
  // through the troughs (the ring crests carry the ink; the calm field is faint).
  let alpha = clamp(v * 0.92 + 0.08, 0.0, 1.0);
  return vec4<f32>(rgb * alpha, alpha);
}
`;
