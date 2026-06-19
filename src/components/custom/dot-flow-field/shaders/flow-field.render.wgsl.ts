// BC.W-VIZ-DOTFLOW — the instanced-billboard RENDER pass (WebGPU primary).
//
// THE RETOPOLOGY. The render pass no longer thins dots by `|v|` (the free-cloud size
// model); it paints the SWEEPING BRIGHT BAND through a stable anchored lattice. Per dot:
//   brightness = baseBright + waveBand(h)·contrast   (the moving iso-band lights the dots)
//   brightness *= optionalGlobeMask(o,t)             (the reference's soft-disc silhouette)
//   size       = dotBaseSize·(1 + |disp|·sizePulse)  (a subtle drift-driven size pulse)
// drawn as instanced billboard quads (the SOTA over a GL point-list — per-particle size).
// The dot color rides the shared `procedural-color.wgsl.ts` OKLCh ramp (the ONE color
// source); the brightness drive multiplies the sampled stop's luminance. Premultiplied-
// alpha blend over the (transparent / near-black) clear.

import {
    OETF_WGSL,
    OKLCH_MATRICES_WGSL,
} from "../../aurora/constants/shaders/procedural-color.wgsl";

export const FLOW_FIELD_RENDER_WGSL = /* wgsl */ `
const PI: f32 = 3.141592653589793;
const TAU: f32 = 6.283185307179586;
const MAX_FLOW_STOPS: i32 = 4;

struct Particle {
  // (pos.x, pos.y, height, |disp|)
  data: vec4<f32>,
};

// ── Render uniforms (the typed-struct source-of-truth — see uniformBridgeWGPU.ts) ──
struct RenderUniforms {
  // r0: (uTime, uContrast, uBaseBright, uDomainHalf)
  r0: vec4<f32>,
  // r1: (uDotSize, uSizePulse, uAspect, uGridPitch)
  r1: vec4<f32>,
  // r2: (uWaveBandCenter, uWaveBandWidth, uGlobeMask, _pad)
  r2: vec4<f32>,
  // ints: (uStopCount, uParticleCount, _pad, _pad)
  ints: vec4<i32>,
  // bg: (background.rgb, hasBackground)
  bg: vec4<f32>,
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
  @location(1) bright: f32,        // band-driven brightness [0, ~1.6]
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
  let h = pr.z;
  let dispMag = pr.w;
  let half = u.r0.w;

  // Brightness = base + band·contrast, masked by the optional globe (read at the live
  // position — close enough to the anchor at the sub-cell cap). The band SWEEPS as h
  // translates across the lattice.
  let band = waveBand(h, u.r2.x, u.r2.y);
  var bright = u.r0.z + band * u.r0.y;
  bright = bright * globeMask(p, u.r0.x, u.r2.z);

  // A subtle drift-driven size pulse (never a re-seed — the dot only breathes).
  let sizePulse = u.r1.y;
  let sizeWorld = u.r1.x * (1.0 + dispMag * sizePulse);

  // Position the quad at the dot in clip space. Domain [-half,half] → NDC [-1,1];
  // the quad half-extent rides sizeWorld (in domain units, aspect-corrected x).
  let aspect = u.r1.z;
  let ndc = p / half;
  let off = local * sizeWorld / half;
  let offX = off.x / max(aspect, 1e-4);

  var out: VSOut;
  out.pos = vec4<f32>(ndc.x + offX, ndc.y + off.y, 0.0, 1.0);
  out.local = local;
  out.bright = bright;
  return out;
}

@fragment
fn fs_main(in: VSOut) -> @location(0) vec4<f32> {
  // Soft circle — radial smoothstep over the billboard-local radius.
  let r = length(in.local);
  let feather = 0.4;
  let mask = 1.0 - smoothstep(1.0 - feather, 1.0, r);
  if (mask < 0.002) { return vec4<f32>(0.0); }

  // The brightness lights the dot core; the palette tints it (the warm-cream identity).
  let bright = clamp(in.bright, 0.0, 1.6);
  let tone = clamp(bright, 0.0, 1.0);
  let lin = samplePaletteLin(tone) * bright;
  // A floor alpha so even an off-band dot stays a faint lattice point (the calm grid).
  let alpha = mask * clamp(bright * 0.8 + 0.12, 0.0, 1.0);
  let rgb = clamp(linearToSrgb(lin), vec3<f32>(0.0), vec3<f32>(1.0));
  // Premultiplied-alpha output.
  return vec4<f32>(rgb * alpha, alpha);
}
`;
