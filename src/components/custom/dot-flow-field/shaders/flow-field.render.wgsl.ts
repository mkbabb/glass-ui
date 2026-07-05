// BD.W-DOTFLOW-AURORA-CURRENT — the dual-register instanced-billboard RENDER pass (WebGPU).
//
// `field` (mode 0): the SWEEPING BRIGHT BAND through a stable anchored lattice —
//   brightness = baseBright + waveBand(h)·contrast, masked by the optional globe, size
//   pulsed by |disp| (BC.W-VIZ-DOTFLOW, untouched).
//
// `flow` (mode 1): the AURORA CURRENT velocity-map — the mote's SPEED drives the warm-fire
//   palette HUE (`samplePaletteLin(speedNorm)`) and `speed·life` the brightness; a
//   velocity-anisotropic squash-stretch elongates fast motes into speed-lines + a cartoon-
//   cast offset-shadow rides under the bright core (the WebGPU "more"). Additive blend over
//   the trail composite. `life` fades the mote's tail (the respawn cadence is the trail's
//   end).
//
// The dot color rides the shared `procedural-color.wgsl.ts` OKLCh ramp (the ONE color
// source); the brightness drive multiplies the sampled stop's luminance. The blend is
// `srcFactor:"one"` (additive) — the trail buffer holds the braided ribbons.

import {
    OETF_WGSL,
    OKLCH_MATRICES_WGSL,
} from "../../aurora/constants/shaders/procedural-color.wgsl";
import {
    FLOW_PRESENT_KNEE,
    FLOW_TRAIL_DEPOSIT,
    FLOW_MOTE_BASE,
    FLOW_TRAIL_CEIL,
} from "../composables/uniformBridgeWGPU";

export const FLOW_FIELD_RENDER_WGSL = /* wgsl */ `
const PI: f32 = 3.141592653589793;
const TAU: f32 = 6.283185307179586;
const MAX_FLOW_STOPS: i32 = 4;

struct Particle {
  // field: (pos.x, pos.y, height, |disp|)   flow: (pos.x, pos.y, speed, life)
  data: vec4<f32>,
};

// ── Render uniforms (the typed-struct source-of-truth — see uniformBridgeWGPU.ts) ──
struct RenderUniforms {
  // r0: (uTime, uContrast, uBaseBright, uDomainHalf)
  r0: vec4<f32>,
  // r1: (uDotSize, uSizePulse, uAspect, uGridPitch)
  r1: vec4<f32>,
  // r2: (uWaveBandCenter, uWaveBandWidth, uGlobeMask, uMode)  — uMode: 0=field, 1=flow
  r2: vec4<f32>,
  // ints: (uStopCount, uParticleCount, _pad, _pad)
  ints: vec4<i32>,
  // bg: (background.rgb, hasBackground)
  bg: vec4<f32>,
  // f0: (uSpeedGlow, uSpeedNorm, uShadowOffset, uStretchAmp)  — the flow velocity-map levers
  f0: vec4<f32>,
  // each palette stop: linear-sRGB rgb + _pad
  palette: array<vec4<f32>, 4>,
};

@group(0) @binding(0) var<uniform> u: RenderUniforms;
@group(0) @binding(1) var<storage, read> particles: array<Particle>;

${OETF_WGSL}
${OKLCH_MATRICES_WGSL}

// The sweeping bright-stripe band (transcribes flowField.ts waveBand): a soft two-sided
// ridge over the normalized height — 1 at the band center, falling to 0 at ±width.
fn waveBand(h: f32, center: f32, width: f32) -> f32 {
  let w = max(width, 1e-3);
  let d = abs(h - center);
  return 1.0 - smoothstep(0.0, w, d);
}

// The optional soft-disc globe mask — a slow Lissajous-drifting radial field (the
// reference's two-sphere composition). OFF when uGlobeMask <= 0.5 (returns 1).
fn globeMask(o: vec2<f32>, t: f32, on: f32) -> f32 {
  if (on <= 0.5) { return 1.0; }
  // a slow Lissajous center drift within the domain
  let cx = 0.35 * sin(t * 0.13);
  let cy = 0.28 * cos(t * 0.11);
  let d = length(o - vec2<f32>(cx, cy));
  // a soft disc of radius ~0.6 with a feathered edge
  return 1.0 - smoothstep(0.45, 0.75, d);
}

// Sample the multi-stop palette (linear-sRGB stops, OKLab mix). t in [0,1].
fn samplePaletteLin(t: f32) -> vec3<f32> {
  let stopCount = u.ints.x;
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
  @location(1) bright: f32,        // brightness [0, ~1.6]
  @location(2) ramp: f32,          // palette-ramp coord (field: tone, flow: speedNorm)
  @location(3) flowFade: f32,      // flow life-fade [0,1] (field: 1)
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
  let half = u.r0.w;
  let aspect = u.r1.z;
  let mode = i32(u.r2.w + 0.5);

  var bright: f32;
  var ramp: f32;
  var sizeWorld: f32;
  var flowFade: f32 = 1.0;

  if (mode == 1) {
    // ── flow (AURORA CURRENT): speed→hue, speed·life→brightness, speed→size bloom ──
    let speed = pr.z;
    let life = pr.w;
    let speedNorm = clamp(speed / max(u.f0.y, 1e-4), 0.0, 1.0);
    // life fades the mote over its last third (the trail's tail / overlapping-action).
    flowFade = clamp(life * 3.0, 0.0, 1.0);
    ramp = speedNorm;
    // BG.W-DOTFLOW-REBUILD paint-fix — a LOW base (FLOW_MOTE_BASE) so slow motes recede into the
    // deep floor and speed carries the warm-fire pop (splices the ONE mote-base source).
    bright = (${FLOW_MOTE_BASE.toFixed(2)} + speedNorm * u.f0.x) * flowFade;
    // a speed bloom (the cartoon "more" on WGPU — faster motes read as hot speed-cores) +
    // the √φ stretch lever scales the bloom (the squash-stretch as an isotropic core here).
    sizeWorld = u.r1.x * (1.0 + speedNorm * (u.f0.w + 1.0));
  } else {
    // ── field: the sweeping bright band over the anchored lattice (BC.W-VIZ-DOTFLOW) ──
    let h = pr.z;
    let dispMag = pr.w;
    let band = waveBand(h, u.r2.x, u.r2.y);
    bright = (u.r0.z + band * u.r0.y) * globeMask(p, u.r0.x, u.r2.z);
    ramp = clamp(bright, 0.0, 1.0);
    sizeWorld = u.r1.x * (1.0 + dispMag * u.r1.y);
  }

  // Position the quad at the dot in clip space. Domain [-half,half] → NDC [-1,1];
  // the quad half-extent rides sizeWorld (in domain units, aspect-corrected x).
  let ndc = p / half;
  let off = local * sizeWorld / half;
  let offX = off.x / max(aspect, 1e-4);

  var out: VSOut;
  out.pos = vec4<f32>(ndc.x + offX, ndc.y + off.y, 0.0, 1.0);
  out.local = local;
  out.bright = bright;
  out.ramp = ramp;
  out.flowFade = flowFade;
  return out;
}

@fragment
fn fs_main(in: VSOut) -> @location(0) vec4<f32> {
  // Soft circle — radial smoothstep over the billboard-local radius.
  let r = length(in.local);
  let feather = 0.4;
  let mask = 1.0 - smoothstep(1.0 - feather, 1.0, r);
  if (mask < 0.002) { return vec4<f32>(0.0); }

  let mode = i32(u.r2.w + 0.5);
  let bright = clamp(in.bright, 0.0, 1.6);
  let lin = samplePaletteLin(in.ramp) * bright;
  let rgb = clamp(linearToSrgb(lin), vec3<f32>(0.0), vec3<f32>(1.0));

  if (mode == 1) {
    // flow: additive premultiplied — a soft glowing core, alpha rides speed·life. The
    // FLOW_TRAIL_DEPOSIT gain keeps a DENSE population from flooding the trail to white
    // (the Chrome/Metal white-out fix; ONE deposit source across both backends).
    let coreAlpha = mask * mask; // a tighter hot core (less white wash — H2 cap)
    let a = coreAlpha * clamp(bright, 0.0, 1.0);
    return vec4<f32>(rgb * a, a) * ${FLOW_TRAIL_DEPOSIT.toFixed(2)};
  }
  // field: a floor alpha so even an off-band dot stays a faint lattice point.
  let alpha = mask * clamp(bright * 0.8 + 0.12, 0.0, 1.0);
  return vec4<f32>(rgb * alpha, alpha);
}
`;

// ── The TRAIL decay-blit + PRESENT composite (WebGPU `flow` — the feedback-fade ribbon) ──
// A fullscreen pass pair: (1) `fs_decay` draws the prev trail back at α (fade toward black);
// the motes then draw additively over it (the render pipeline above). (2) `fs_present`
// tone-maps the trail composite over the warm-near-black floor + the warm rose corner-bloom
// (NOT teal) — the §3 colorful ground, the full-bleed plane (not a parallel field).
export const FLOW_FIELD_TRAIL_WGSL = /* wgsl */ `
struct TrailUniforms {
  // (decay, hasGround, time, _pad)
  p: vec4<f32>,
  // floor.rgb (linear-sRGB) + _pad
  floorC: vec4<f32>,
  // bloom.rgb (linear-sRGB) + _pad
  bloomC: vec4<f32>,
};
@group(0) @binding(0) var<uniform> u: TrailUniforms;
@group(0) @binding(1) var samp: sampler;
@group(0) @binding(2) var tex: texture_2d<f32>;

${OETF_WGSL}

struct FSQ { @builtin(position) pos: vec4<f32>, @location(0) uv: vec2<f32> };

@vertex
fn vs_fsq(@builtin(vertex_index) vi: u32) -> FSQ {
  var c = array<vec2<f32>, 3>(
    vec2<f32>(-1.0, -1.0), vec2<f32>(3.0, -1.0), vec2<f32>(-1.0, 3.0),
  );
  let p = c[vi];
  var out: FSQ;
  out.pos = vec4<f32>(p, 0.0, 1.0);
  out.uv = p * 0.5 + 0.5;
  return out;
}

@fragment
fn fs_decay(in: FSQ) -> @location(0) vec4<f32> {
  let prev = textureSample(tex, samp, in.uv);
  return prev * u.p.x;   // fade toward black
}

@fragment
fn fs_present(in: FSQ) -> @location(0) vec4<f32> {
  let trail = textureSample(tex, samp, in.uv).rgb;
  // BG.W-DOTFLOW-REBUILD paint-fix — clamp the trail to FLOW_TRAIL_CEIL BEFORE the tone-map. The
  // WGSL trail is now an RGBA8 render-target (bounded [0,1] by the fixed-point store — the
  // paint re-judge fix for the Chrome/Metal flood + the WebKit-WebGPU dead-black), so this clamp
  // is a defensive floor that keeps the tone-map input identical across both backends (the
  // WebGL2 RGBA8 trail clamps at the SAME ceiling), no engine-specific white-out.
  let t = min(trail, vec3<f32>(${FLOW_TRAIL_CEIL.toFixed(2)}));
  // Reinhard — hot cores, not white wash. The knee is the FLOW_PRESENT_KNEE rest-contrast
  // lever (BG.W-DOTFLOW-REBUILD — the ONE source the GLSL present pass splices identically).
  let mapped = t / (t + vec3<f32>(${FLOW_PRESENT_KNEE.toFixed(2)}));
  if (u.p.y < 0.5) {
    let rgb = clamp(linearToSrgb(mapped), vec3<f32>(0.0), vec3<f32>(1.0));
    let a = clamp(max(mapped.r, max(mapped.g, mapped.b)), 0.0, 1.0);
    return vec4<f32>(rgb * a, a);
  }
  let bloom = smoothstep(1.3, 0.0, distance(in.uv, vec2<f32>(0.12, 0.88)));
  let floorLin = u.floorC.rgb + u.bloomC.rgb * bloom * 0.5;
  let lin = floorLin + mapped;
  let rgb = clamp(linearToSrgb(lin), vec3<f32>(0.0), vec3<f32>(1.0));
  return vec4<f32>(rgb, 1.0);
}
`;
