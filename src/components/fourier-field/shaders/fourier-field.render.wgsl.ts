// The WebGPU instanced-ribbon render pass is the primary path.
//
// The fullscreen per-pixel SDF `fs_main` (the O(pixels×segments) loop over ALL ≤384 segments
// at EVERY pixel — `render.wgsl fs_main` ran the IDENTICAL fullscreen loop as the GLSL twin,
// so the WGSL primary was NO cheaper) RETIRED wholesale onto an instanced/vertex-pulling pass
// with no dual path. The `fourier-field.compute.wgsl.ts` kernel is
// BYTE-IDENTICAL (the `curveSamples`/`chainTips` storage buffers unchanged); the render pass
// now VERTEX-PULLS each instance's endpoints straight from those buffers via `instance_index`:
//   • `vs_main` builds a unit quad from `vertex_index` and expands it to the per-instance
//     capsule (a→b padded) or AABB (ring, head halo) bbox — each instance covers ONLY its
//     segment, O(covered_pixels);
//   • `fs_main` runs the EXACT `segDist` under-glow+core, ring+arm+dot, head-aniso, cel
//     over-composite the fullscreen loop ran — pixel-identical by over-composite associativity.
//
// The pipeline-overridable `LAYER` constant selects the layer (5 pipelines share this ONE
// module): 0 trail · 1 epicycle · 2 head · 3 cel-rope · 4 cel-arm. The head→tail TAPER
// (`RIBBON_TAIL_FRAC`, MIRRORED verbatim from constants.ts) + the soft UNDER-GLOW live in the
// trail branch; focused parity coverage cross-checks the mirror. Premultiplied over the transparent
// clear KILLS the `lighter` additive hue-blowout; the epicycle pipeline uses `operation: max`
// so adjacent-arm overlaps UNION (the FB5 join-seam fix). Color rides the shared
// `procedural-color.wgsl.ts` OKLCh ramp (ONE color source, no drift from the GLSL twin).

import {
    OETF_WGSL,
    OKLCH_MATRICES_WGSL,
} from "../../../composables/glass/procedural/color.wgsl";

export const FOURIER_FIELD_RENDER_WGSL = /* wgsl */ `
// The instanced-ribbon LAYER selector (a pipeline-overridable constant — 5 pipelines share the
// ONE module, each specializing this): 0 trail · 1 epicycle · 2 head · 3 cel-rope · 4 cel-arm.
override LAYER: i32 = 0;

const PI: f32 = 3.141592653589793;
// The degenerate-tangent guard must equal FOURIER_TANGENT_EPS in
// constants.ts and the GL CPU bead path so a cusp resolves identically across both engines.
const TANGENT_EPS: f32 = 1e-4;
const SPEED_REF_HALFWIDTHS: f32 = 6.0;
// The thick luminous ribbon mirrors RIBBON_TAIL_FRAC verbatim
// from constants.ts because the WGSL twin cannot import a TS const; parity coverage verifies the
// two copies are equal so the mid-body floor (RIBBON_HEAD_FLOOR_PX) can never drift off it.
const RIBBON_TAIL_FRAC: f32 = 0.4;
const RIBBON_UNDERGLOW_SCALE: f32 = 2.2;
const RIBBON_UNDERGLOW_ALPHA: f32 = 0.16;

// ── Render uniforms (the typed-struct source-of-truth — see uniformBridgeWGPU.ts) ──
struct RenderUniforms {
  // r0: (centerX, centerY, scale, aspect)  — model→clip fit transform
  r0: vec4<f32>,
  // r1: (trailWidth, peakAlpha, headGlowAlpha, trailFadeExp)
  r1: vec4<f32>,
  // r2: (trailFloor, intensity, showEpicycles, rainbowChain)
  r2: vec4<f32>,
  // r3: (squashGain, celGain, edgeMargin, _pad) — FOURIER-LOOM §2b/§3b + the ribbon bbox slop
  r3: vec4<f32>,
  // ints: (sampleCount, armCount, stopCount, _pad)
  ints: vec4<i32>,
  // palette stops: linear-sRGB rgb + _pad
  palette: array<vec4<f32>, 4>,
};

@group(0) @binding(0) var<uniform> u: RenderUniforms;
// curveSamples[i] = (x, y, age, _pad) in MODEL space — the render VERTEX-PULLS these.
@group(0) @binding(1) var<storage, read> curveSamples: array<vec4<f32>>;
// chainTips[k] = (x, y, _pad, _pad) in MODEL space.
@group(0) @binding(2) var<storage, read> chainTips: array<vec4<f32>>;

${OETF_WGSL}
${OKLCH_MATRICES_WGSL}

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

fn chainColorLin(seg: f32, rainbow: bool) -> vec3<f32> {
  let baseLin = u.palette[0].rgb;
  if (!rainbow) { return baseLin; }
  let lab = LMS_TO_OKLAB * cbrt3(LINEAR_SRGB_TO_LMS * baseLin);
  let lch = oklabToOklch(lab);
  let hueShift = mix(-0.45, 1.15, clamp(seg, 0.0, 1.0));
  let h = lch.z + hueShift;
  let lifted = vec3<f32>(0.66, max(lch.y, 0.14), h);
  return oklabToLinearSrgb(oklchToOklab(lifted));
}

fn segDist(p: vec2<f32>, a: vec2<f32>, b: vec2<f32>) -> f32 {
  let pa = p - a;
  let ba = b - a;
  let h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-8), 0.0, 1.0);
  return length(pa - ba * h);
}

// The head travel frame + the volume-preserving anisotropic distance.
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

fn headAniso(p: vec2<f32>, head: vec2<f32>, fr: HeadFrame, k: f32) -> f32 {
  let g = 1.0 + k * fr.sHat;
  let n = vec2<f32>(-fr.T.y, fr.T.x);
  let rel = p - head;
  let along = dot(rel, fr.T) / g;
  let across = dot(rel, n) * g;
  return length(vec2<f32>(along, across));
}

// The cel ink lags behind the travel — the SAME −T·halfW·1.4 offset both engines apply (the
// head frame is read straight off the compute-filled curveSamples[0]/[1], parity by construction).
fn celOffset(halfW: f32) -> vec2<f32> {
  let fr = headFrame(curveSamples[0].xy, curveSamples[1].xy, halfW);
  return -fr.T * halfW * 1.4;
}

// The unit quad as two triangles (6 verts) in [0,1]² — the instanced vertex expands it.
fn quadCorner(vi: u32) -> vec2<f32> {
  var c = array<vec2<f32>, 6>(
    vec2<f32>(0.0, 0.0), vec2<f32>(1.0, 0.0), vec2<f32>(0.0, 1.0),
    vec2<f32>(0.0, 1.0), vec2<f32>(1.0, 0.0), vec2<f32>(1.0, 1.0),
  );
  return c[vi];
}

struct VSOut {
  @builtin(position) pos: vec4<f32>,
  @location(0) p: vec2<f32>,      // model-space fragment coordinate
  @location(1) a: vec2<f32>,
  @location(2) b: vec2<f32>,
  @location(3) segData: vec3<f32>,   // (age, strokeHalf, arg2)
};

@vertex
fn vs_main(@builtin(vertex_index) vi: u32, @builtin(instance_index) inst: u32) -> VSOut {
  let corner = quadCorner(vi);
  let center = u.r0.xy;
  let scale = max(u.r0.z, 1e-6);
  let aspect = max(u.r0.w, 1e-4);
  let halfW = u.r1.x * 0.5;
  let margin = u.r3.z;

  var a: vec2<f32> = vec2<f32>(0.0);
  var b: vec2<f32> = vec2<f32>(0.0);
  var strokeHalf: f32 = halfW;
  var age: f32 = 0.0;
  var arg2: f32 = 0.0;
  var isCapsule: bool = true;
  var ext: f32 = halfW;

  if (LAYER == 0) {
    // TRAIL — the curve capsule; the covered extent is the head-width under-glow.
    a = curveSamples[inst].xy;
    b = curveSamples[inst + 1u].xy;
    age = max(curveSamples[inst].z, curveSamples[inst + 1u].z);
    ext = halfW * RIBBON_UNDERGLOW_SCALE;
    isCapsule = true;
  } else if (LAYER == 1) {
    // EPICYCLE — the chain AABB around a (radius = |b−a|).
    a = chainTips[inst].xy;
    b = chainTips[inst + 1u].xy;
    arg2 = f32(inst) / max(f32(u.ints.y - 1), 1.0);
    ext = length(b - a) + halfW * 0.7;
    isCapsule = false;
  } else if (LAYER == 2) {
    // HEAD — the comet head at curveSamples[0], AABB by the halo radius.
    a = curveSamples[0].xy;
    b = curveSamples[1].xy;
    ext = halfW * 4.5;
    isCapsule = false;
  } else if (LAYER == 3) {
    // CEL-ROPE — the curve capsule, offset opposite travel; full-width ink.
    let off = celOffset(halfW);
    a = curveSamples[inst].xy + off;
    b = curveSamples[inst + 1u].xy + off;
    arg2 = 1.0;
    ext = halfW;
    isCapsule = true;
  } else {
    // CEL-ARM (LAYER == 4) — the chain capsule, offset; the narrower arm ink (0.55·halfW).
    let off = celOffset(halfW);
    a = chainTips[inst].xy + off;
    b = chainTips[inst + 1u].xy + off;
    strokeHalf = halfW * 0.55;
    arg2 = 0.7;
    ext = halfW * 0.55;
    isCapsule = true;
  }
  ext = ext + margin;

  var pos: vec2<f32>;
  if (isCapsule) {
    let d = b - a;
    let len = length(d);
    var dir = vec2<f32>(1.0, 0.0);
    if (len > 1e-6) { dir = d / len; }
    let perp = vec2<f32>(-dir.y, dir.x);
    let along = mix(a - dir * ext, b + dir * ext, corner.x);
    pos = along + perp * (corner.y * 2.0 - 1.0) * ext;
  } else {
    pos = a + (corner * 2.0 - vec2<f32>(1.0)) * ext;
  }

  let clipX = (pos.x - center.x) * scale / aspect;
  let clipY = (pos.y - center.y) * scale;
  var out: VSOut;
  out.pos = vec4<f32>(clipX, clipY, 0.0, 1.0);
  out.p = pos;
  out.a = a;
  out.b = b;
  out.segData = vec3<f32>(age, strokeHalf, arg2);
  return out;
}

@fragment
fn fs_main(in: VSOut) -> @location(0) vec4<f32> {
  let p = in.p;
  let aa = max(fwidth(p.x) + fwidth(p.y), 1e-5) * 0.75;
  let peak = u.r1.y * u.r2.y;
  let headGlow = u.r1.z * u.r2.y;
  let fadeExp = u.r1.w;
  let trailFloor = u.r2.x;
  let rainbow = u.r2.w > 0.5;
  let squashGain = u.r3.x;
  let celGain = u.r3.y;
  let halfW = in.segData.y;
  let age = in.segData.x;
  let arg2 = in.segData.z;
  let a = in.a;
  let b = in.b;

  if (LAYER == 0) {
    // ── TRAIL — the tapered luminous ribbon over its own soft under-glow ──
    let d = segDist(p, a, b);
    let ribbonHalf = halfW * (RIBBON_TAIL_FRAC + (1.0 - RIBBON_TAIL_FRAC) * age);
    let lin = samplePaletteLin(1.0 - age * 0.4);
    let rgb = clamp(linearToSrgb(lin), vec3<f32>(0.0), vec3<f32>(1.0));
    let glowHalf = ribbonHalf * RIBBON_UNDERGLOW_SCALE;
    let glowCover = 1.0 - smoothstep(glowHalf, glowHalf + aa * 3.0, d);
    let ga = peak * RIBBON_UNDERGLOW_ALPHA * pow(age, fadeExp) * glowCover;
    let cover = 1.0 - smoothstep(ribbonHalf, ribbonHalf + aa, d);
    let ca = max(peak * pow(age, fadeExp), peak * trailFloor) * cover;
    let outA = ca + ga * (1.0 - ca);
    return vec4<f32>(rgb * outA, outA);
  } else if (LAYER == 1) {
    // ── EPICYCLE — orbit RING + ARM + joint DOT union (MAX-blended, no join seam) ──
    let lin = chainColorLin(arg2, rainbow);
    let rgb = clamp(linearToSrgb(lin), vec3<f32>(0.0), vec3<f32>(1.0));
    let radius = length(b - a);
    let dRing = abs(length(p - a) - radius);
    let ringW = max(halfW * 0.45, aa);
    let ringMask = (1.0 - smoothstep(ringW, ringW + aa, dRing)) * 0.5;
    let dArm = segDist(p, a, b);
    let armMask = 1.0 - smoothstep(halfW * 0.55, halfW * 0.55 + aa, dArm);
    let dotR = max(halfW * 0.7, aa * 2.0);
    let dDot = length(p - a);
    let dotMask = 1.0 - smoothstep(dotR, dotR + aa, dDot);
    let m = clamp(max(max(ringMask, armMask), dotMask), 0.0, 1.0) * peak * 0.7;
    return vec4<f32>(rgb * m, m);
  } else if (LAYER == 2) {
    // ── HEAD — squash-and-stretch (§2b): halo + saturated core + white specular ──
    let head = a;
    let headBack = b;
    let fr = headFrame(head, headBack, halfW);
    let dHead = headAniso(p, head, fr, squashGain);
    let coreR = halfW * 1.5;
    let haloR = coreR * 3.0;
    let headRgb = clamp(linearToSrgb(samplePaletteLin(0.0)), vec3<f32>(0.0), vec3<f32>(1.0));
    let halo = (1.0 - smoothstep(0.0, haloR, dHead)) * headGlow * 0.35;
    var accum = vec4<f32>(headRgb * halo, halo);
    let core = (1.0 - smoothstep(coreR, coreR + aa, dHead)) * headGlow;
    accum = vec4<f32>(headRgb * core, core) + accum * (1.0 - core);
    let spec = (1.0 - smoothstep(coreR * 0.4, coreR * 0.4 + aa, dHead)) * headGlow * 0.9;
    accum = vec4<f32>(vec3<f32>(1.0) * spec, spec) + accum * (1.0 - spec);
    return accum;
  } else {
    // ── CEL — the technicolor ink shadow (rope LAYER==3, arm LAYER==4) ──
    let celA = clamp(celGain, 0.0, 1.0);
    let d = segDist(p, a, b);
    let cover = 1.0 - smoothstep(halfW, halfW + aa, d);
    let m = cover * celA * peak * arg2; // arg2 = celStrength (1.0 rope / 0.7 arm)
    return vec4<f32>(0.0, 0.0, 0.0, m);
  }
}
`;
