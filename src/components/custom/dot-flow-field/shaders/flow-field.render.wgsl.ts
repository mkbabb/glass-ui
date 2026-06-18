// BB.W-VIZ-SUITE (W-FLOWFIELD) — the instanced-billboard RENDER pass (WebGPU primary).
//
// An instanced draw: `vs_main` reads `@builtin(instance_index)` to fetch the particle
// from the storage buffer + `@builtin(vertex_index)` for the billboard-quad corner (a
// 6-vertex two-triangle quad), sizes the quad by the per-particle `size_i` (denser-where-
// calm — `|v|` thins the dot, the reference's varying dot size), and positions it at the
// particle's clip-space position. `fs_main` draws the soft circle (radial smoothstep) in
// the ColorResolver palette, sampled by the local field speed for the subtle teal-gradient
// the reference shows. Premultiplied-alpha blend over the (transparent / navy) clear.
//
// The SOTA recommends instanced billboard quads over a GL point-list — point-size is
// driver-capped + non-uniform + gives no per-particle size control. The dot color rides
// the shared `procedural-color.wgsl.ts` OKLCh ramp (the ONE color source — no second
// color path).

import {
    OETF_WGSL,
    OKLCH_MATRICES_WGSL,
} from "../../aurora/constants/shaders/procedural-color.wgsl";

export const FLOW_FIELD_RENDER_WGSL = /* wgsl */ `
const PI: f32 = 3.141592653589793;
const TAU: f32 = 6.283185307179586;
const FLOW_GRAVITY: f32 = 9.81;
const MAX_WAVE_COMPONENTS: i32 = 8;
const MAX_FLOW_STOPS: i32 = 4;

struct Particle {
  // (pos.x, pos.y, age, seed)
  data: vec4<f32>,
};

// ── Render uniforms (the typed-struct source-of-truth — see uniformBridgeWGPU.ts) ──
struct RenderUniforms {
  // r0: (uTime, uWindSpeed, uCurlStrength, uDomainHalf)
  r0: vec4<f32>,
  // r1: (uDotSize, uDotSizeVelocity, uAspect, uVMax)
  r1: vec4<f32>,
  // ints: (uWaveCount, uStopCount, uParticleCount, _pad)
  ints: vec4<i32>,
  // bg: (background.rgb, hasBackground)
  bg: vec4<f32>,
  // each wave row: (amplitude, wavelength, directionDeg, phase)
  waves: array<vec4<f32>, 8>,
  // each palette stop: linear-sRGB rgb + _pad
  palette: array<vec4<f32>, 4>,
};

@group(0) @binding(0) var<uniform> u: RenderUniforms;
@group(0) @binding(1) var<storage, read> particles: array<Particle>;

${OETF_WGSL}
${OKLCH_MATRICES_WGSL}

// ── The Gerstner-sum velocity (the SAME transcription as the compute kernel, read here
//    for the per-particle size + color tint — denser-where-calm). ──
fn gerstnerVelocity(p: vec2<f32>, t: f32) -> vec2<f32> {
  var dhdx = 0.0;
  var dhdy = 0.0;
  let windSpeed = u.r0.y;
  let waveCount = u.ints.x;
  for (var i = 0; i < MAX_WAVE_COMPONENTS; i = i + 1) {
    if (i >= waveCount) { break; }
    let w = u.waves[i];
    let k = TAU / max(w.y, 1e-4);
    let dirRad = w.z * PI / 180.0;
    let d = vec2<f32>(cos(dirRad), sin(dirRad));
    let omega = sqrt(FLOW_GRAVITY * k) * windSpeed;
    let theta = k * (d.x * p.x + d.y * p.y) - omega * t + w.w;
    let akc = w.x * k * cos(theta);
    dhdx = dhdx + akc * d.x;
    dhdy = dhdy + akc * d.y;
  }
  return vec2<f32>(dhdy, -dhdx);
}

// Sample the multi-stop palette (linear-sRGB stops, OKLab mix). t in [0,1].
fn samplePaletteLin(t: f32) -> vec3<f32> {
  let stopCount = u.ints.y;
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

struct VSOut {
  @builtin(position) pos: vec4<f32>,
  @location(0) local: vec2<f32>,   // [-1,1] billboard-local coords for the soft circle
  @location(1) tint: f32,          // velocity-derived color/alpha tint [0,1]
  @location(2) alphaScale: f32,    // velocity-derived alpha scale (denser-where-calm)
};

@vertex
fn vs_main(
  @builtin(vertex_index) vi: u32,
  @builtin(instance_index) ii: u32,
) -> VSOut {
  // Two-triangle quad corners in billboard-local space.
  var corners = array<vec2<f32>, 6>(
    vec2<f32>(-1.0, -1.0), vec2<f32>(1.0, -1.0), vec2<f32>(-1.0, 1.0),
    vec2<f32>(-1.0, 1.0), vec2<f32>(1.0, -1.0), vec2<f32>(1.0, 1.0),
  );
  let local = corners[vi];

  let pr = particles[ii].data;
  let p = pr.xy;
  let t = u.r0.x;
  let half = u.r0.w;

  // Per-particle velocity → size + tint (denser-where-calm: |v| thins the dot).
  let v = gerstnerVelocity(p, t);
  let speed = length(v);
  let vMax = max(u.r1.w, 1e-4);
  let speedNorm = clamp(speed / vMax, 0.0, 1.0);
  let dotSizeVel = u.r1.y;
  // size_i = base · (1 − speedNorm · sizeVel) — calm = larger dot.
  let sizeWorld = u.r1.x * (1.0 - speedNorm * dotSizeVel);
  let alphaScale = 1.0 - speedNorm * 0.35; // calm = denser/brighter

  // Position the quad at the particle in clip space. Domain [-half,half] → NDC [-1,1];
  // the quad half-extent rides sizeWorld (in the same domain units, aspect-corrected x).
  let aspect = u.r1.z;
  let ndc = p / half;
  let off = local * sizeWorld / half;
  let offX = off.x / max(aspect, 1e-4);

  var out: VSOut;
  out.pos = vec4<f32>(ndc.x + offX, ndc.y + off.y, 0.0, 1.0);
  out.local = local;
  out.tint = speedNorm;
  out.alphaScale = alphaScale;
  return out;
}

@fragment
fn fs_main(in: VSOut) -> @location(0) vec4<f32> {
  // Soft circle — radial smoothstep over the billboard-local radius.
  let r = length(in.local);
  let feather = 0.35;
  let mask = 1.0 - smoothstep(1.0 - feather, 1.0, r);
  if (mask < 0.002) { return vec4<f32>(0.0); }

  let lin = samplePaletteLin(in.tint);
  let alpha = mask * in.alphaScale;
  let rgb = clamp(linearToSrgb(lin), vec3<f32>(0.0), vec3<f32>(1.0));
  // Premultiplied-alpha output.
  return vec4<f32>(rgb * alpha, alpha);
}
`;
