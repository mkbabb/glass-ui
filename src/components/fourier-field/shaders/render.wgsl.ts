// The instanced-ribbon render pass — THREE pipelines over ONE module, ONE blend.
//
//   LAYER 0  CHAIN   the machine: orbit ring, scaffold arm, joint dot
//   LAYER 1  TRAIL   the curve: opaque INK under opaque MARK, composited at α1 inside the
//                    fragment and multiplied ONCE by the age envelope
//   LAYER 2  HEAD    the comet head: palette-lifted core over its halo, squash-and-stretch
//
// Each instance covers only its own bounding box and vertex-PULLS its endpoints from the
// compute-filled storage buffers, so cost is O(covered pixels).
//
// THE ONE BLEND is premultiplied component-wise MAX. Overlapping segments take the
// brighter contribution instead of stacking, which kills the over-composite density swing
// and the chain's join seam structurally rather than by tuning, and makes a negative
// destination unrepresentable.
//
// THE INK RATIO IS EXACT AT EVERY AGE. Ink and mark are composited against each other at
// full alpha and the age envelope multiplies the PAIR, so `α_ink(age) ≡ α_mark(age)` by
// construction — never a second alpha to keep in step.
//
// THE RING LAW lives in the vertex stage: a ring is drawn iff its own diameter reaches
// the mark stroke at the live stage. Below that rung the term is still summed and still
// chained — the arm and the joint dot stay — and only the outline elides.

import {
    OETF_WGSL,
    OKLCH_MATRICES_WGSL,
} from "../../../composables/glass/procedural/color.wgsl";
import { FOURIER_LUT_SIZE } from "../constants";

export const FOURIER_FIELD_RENDER_WGSL = /* wgsl */ `
// 0 chain · 1 trail · 2 head — a pipeline-overridable constant, three pipelines, one module.
override LAYER: i32 = 0;

const TANGENT_EPS: f32 = 1e-4;
const SPEED_REF_HALFWIDTHS: f32 = 6.0;
// The trail's taper: the mark keeps this fraction of its width at the oldest tail.
const TAIL_TAPER: f32 = 0.55;

struct RenderUniforms {
  // r0: (centerX, centerY, scale, aspect)
  r0: vec4<f32>,
  // r1: (markHalf, inkOffsetStrokes, scaffoldFrac, edgeMargin)
  r1: vec4<f32>,
  // r2: (peakAlpha, glow, squash, trailFadeExp)
  r2: vec4<f32>,
  // r3: (trailFloor, hueSweep, ringStrokeModel, showMachine)
  r3: vec4<f32>,
  // ink: (linear rgb, rainbowChain)
  ink: vec4<f32>,
  // head: (linear rgb, _pad)
  head: vec4<f32>,
  // ints: (sampleCount, lutSize, chainCount, _pad)
  ints: vec4<i32>,
  // the CPU-resolved linear-sRGB ramp — the length is the TS constant, not a second copy
  lut: array<vec4<f32>, ${FOURIER_LUT_SIZE}>,
};

@group(0) @binding(0) var<uniform> u: RenderUniforms;
@group(0) @binding(1) var<storage, read> curveSamples: array<vec4<f32>>;
@group(0) @binding(2) var<storage, read> chainTips: array<vec4<f32>>;

${OETF_WGSL}
${OKLCH_MATRICES_WGSL}

// Read the CPU-resolved ramp. No colour-space conversion happens here — the LUT already
// carries the chroma floor and the gamut map.
fn sampleRamp(t: f32) -> vec3<f32> {
  let n = u.ints.y;
  let ft = clamp(t, 0.0, 1.0) * f32(n - 1);
  let i0 = i32(floor(ft));
  let i1 = min(i0 + 1, n - 1);
  return mix(u.lut[i0].rgb, u.lut[i1].rgb, ft - f32(i0));
}

// The chain's hue sweep, taken ONCE PER INSTANCE in the vertex stage: the ramp entry for
// this arm, rotated about the palette anchor by ±hueSweep. Anchored warm, the sweep is
// bounded by its own arithmetic — it cannot arrive anywhere the palette is not.
fn chainTint(seg: f32) -> vec3<f32> {
  let base = sampleRamp(seg * 0.6);
  if (u.ink.w < 0.5) { return base; }
  let lab = LMS_TO_OKLAB * cbrt3(LINEAR_SRGB_TO_LMS * base);
  let lch = oklabToOklch(lab);
  let swept = vec3<f32>(lch.x, lch.y, lch.z + mix(-u.r3.y, u.r3.y, clamp(seg, 0.0, 1.0)));
  return oklabToLinearSrgb(oklchToOklab(swept));
}

fn segDist(p: vec2<f32>, a: vec2<f32>, b: vec2<f32>) -> f32 {
  let pa = p - a;
  let ba = b - a;
  let h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-8), 0.0, 1.0);
  return length(pa - ba * h);
}

// The head's travel frame + its volume-preserving anisotropic metric.
struct HeadFrame { T: vec2<f32>, sHat: f32, };
fn headFrame(head: vec2<f32>, back: vec2<f32>, halfW: f32) -> HeadFrame {
  let d = head - back;
  let s = length(d);
  var out: HeadFrame;
  if (s <= TANGENT_EPS) {
    out.T = vec2<f32>(1.0, 0.0);
    out.sHat = 0.0;
    return out;
  }
  out.T = d / s;
  out.sHat = clamp(s / max(halfW * SPEED_REF_HALFWIDTHS, 1e-6), 0.0, 1.0);
  return out;
}

fn headAniso(p: vec2<f32>, head: vec2<f32>, fr: HeadFrame, k: f32) -> f32 {
  let g = 1.0 + k * fr.sHat;
  let n = vec2<f32>(-fr.T.y, fr.T.x);
  let rel = p - head;
  return length(vec2<f32>(dot(rel, fr.T) / g, dot(rel, n) * g));
}

fn quadCorner(vi: u32) -> vec2<f32> {
  var c = array<vec2<f32>, 6>(
    vec2<f32>(0.0, 0.0), vec2<f32>(1.0, 0.0), vec2<f32>(0.0, 1.0),
    vec2<f32>(0.0, 1.0), vec2<f32>(1.0, 0.0), vec2<f32>(1.0, 1.0),
  );
  return c[vi];
}

struct VSOut {
  @builtin(position) pos: vec4<f32>,
  @location(0) p: vec2<f32>,
  @location(1) a: vec2<f32>,
  @location(2) b: vec2<f32>,
  // (age, strokeHalf, drawRing)
  @location(3) seg: vec3<f32>,
  @location(4) @interpolate(flat) tint: vec3<f32>,
};

@vertex
fn vs_main(@builtin(vertex_index) vi: u32, @builtin(instance_index) inst: u32) -> VSOut {
  let corner = quadCorner(vi);
  let center = u.r0.xy;
  let scale = max(u.r0.z, 1e-6);
  let aspect = max(u.r0.w, 1e-4);
  let markHalf = u.r1.x;
  let margin = u.r1.w;

  var a = vec2<f32>(0.0);
  var b = vec2<f32>(0.0);
  var strokeHalf = markHalf;
  var age = 0.0;
  var drawRing = 0.0;
  var tint = vec3<f32>(0.0);
  var isCapsule = true;
  var ext = markHalf;

  if (LAYER == 0) {
    // CHAIN — the AABB around this arm's own orbit (radius = |b − a| = |c_k|).
    a = chainTips[inst].xy;
    b = chainTips[inst + 1u].xy;
    let radius = length(b - a);
    // THE RING LAW, asked of the live stage: a circle narrower than its own line is a blob.
    if (2.0 * radius >= u.r3.z) { drawRing = 1.0; }
    strokeHalf = markHalf * u.r1.z;
    tint = chainTint(f32(inst) / max(f32(u.ints.z) - 1.0, 1.0));
    ext = radius + strokeHalf * 2.0;
    isCapsule = false;
  } else if (LAYER == 1) {
    // TRAIL — the curve capsule, padded for the ink's own offset.
    a = curveSamples[inst].xy;
    b = curveSamples[inst + 1u].xy;
    age = max(curveSamples[inst].z, curveSamples[inst + 1u].z);
    tint = sampleRamp(1.0 - age);
    ext = markHalf * (1.0 + 2.0 * max(u.r1.y, 0.0));
    isCapsule = true;
  } else {
    // HEAD — centred on the newest curve sample; the AABB is the halo.
    a = curveSamples[0].xy;
    b = curveSamples[1].xy;
    tint = u.head.rgb;
    ext = markHalf * 5.0;
    isCapsule = false;
  }
  ext = ext + margin;

  var pos: vec2<f32>;
  if (isCapsule) {
    let d = b - a;
    let len = length(d);
    var dir = vec2<f32>(1.0, 0.0);
    if (len > 1e-6) { dir = d / len; }
    let perp = vec2<f32>(-dir.y, dir.x);
    pos = mix(a - dir * ext, b + dir * ext, corner.x) + perp * (corner.y * 2.0 - 1.0) * ext;
  } else {
    pos = a + (corner * 2.0 - vec2<f32>(1.0)) * ext;
  }

  var out: VSOut;
  out.pos = vec4<f32>((pos.x - center.x) * scale / aspect, (pos.y - center.y) * scale, 0.0, 1.0);
  out.p = pos;
  out.a = a;
  out.b = b;
  out.seg = vec3<f32>(age, strokeHalf, drawRing);
  out.tint = tint;
  return out;
}

@fragment
fn fs_main(in: VSOut) -> @location(0) vec4<f32> {
  let p = in.p;
  let aa = max(fwidth(p.x) + fwidth(p.y), 1e-5) * 0.75;
  let peak = u.r2.x;
  let glow = u.r2.y;
  let squash = u.r2.z;
  let fadeExp = u.r2.w;
  let trailFloor = u.r3.x;
  let markHalf = u.r1.x;
  let strokeHalf = in.seg.y;
  let age = in.seg.x;
  let a = in.a;
  let b = in.b;

  if (LAYER == 0) {
    // ── THE MACHINE — ring (conditionally), arm, joint dot; one scaffold rung ──
    let radius = length(b - a);
    var m = 0.0;
    if (in.seg.z > 0.5) {
      let dRing = abs(length(p - a) - radius);
      m = max(m, 1.0 - smoothstep(strokeHalf, strokeHalf + aa, dRing));
    }
    m = max(m, 1.0 - smoothstep(strokeHalf, strokeHalf + aa, segDist(p, a, b)));
    // The joint dot is the mark's own diameter — the machine's one solid rung.
    m = max(m, 1.0 - smoothstep(markHalf, markHalf + aa, length(p - a)));
    let alpha = clamp(m, 0.0, 1.0) * peak;
    let rgb = clamp(linearToSrgb(in.tint), vec3<f32>(0.0), vec3<f32>(1.0));
    return vec4<f32>(rgb * alpha, alpha);
  } else if (LAYER == 1) {
    // ── THE CURVE — ink under mark, composited at α1, then ONE envelope ──
    let taper = TAIL_TAPER + (1.0 - TAIL_TAPER) * age;
    let half = markHalf * taper;
    // The ink rides THIS segment's own tangent, opposite the travel: the head runs from
    // b toward a, so the ink lands behind at (b − a).
    var dir = vec2<f32>(1.0, 0.0);
    let d = b - a;
    let len = length(d);
    if (len > 1e-6) { dir = d / len; }
    let off = dir * (markHalf * 2.0 * u.r1.y);

    let aMark = 1.0 - smoothstep(half, half + aa, segDist(p, a, b));
    let aInk = 1.0 - smoothstep(half, half + aa, segDist(p, a + off, b + off));

    let markRgb = clamp(linearToSrgb(in.tint), vec3<f32>(0.0), vec3<f32>(1.0));
    let inkRgb = clamp(linearToSrgb(u.ink.rgb), vec3<f32>(0.0), vec3<f32>(1.0));

    // Mark OVER ink, both fully opaque where they cover — the pair, then the envelope.
    let aPair = aMark + aInk * (1.0 - aMark);
    let rgbPair = markRgb * aMark + inkRgb * aInk * (1.0 - aMark);
    let env = peak * max(pow(max(age, 0.0), fadeExp), trailFloor);
    return vec4<f32>(rgbPair * env, aPair * env);
  } else {
    // ── THE HEAD — palette-lifted core over its own halo. Light-led, never white. ──
    let fr = headFrame(a, b, markHalf);
    let dHead = headAniso(p, a, fr, squash);
    let coreR = markHalf * 1.5;
    let haloR = coreR * 3.0;
    let rgb = clamp(linearToSrgb(in.tint), vec3<f32>(0.0), vec3<f32>(1.0));
    let halo = (1.0 - smoothstep(0.0, haloR, dHead)) * glow;
    let core = (1.0 - smoothstep(coreR, coreR + aa, dHead)) * peak;
    let alpha = clamp(max(core, halo), 0.0, 1.0);
    return vec4<f32>(rgb * alpha, alpha);
  }
}
`;
