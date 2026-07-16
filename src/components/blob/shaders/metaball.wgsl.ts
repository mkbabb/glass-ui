// The GooBlob metaball WGSL primary path.
//
// The WebGPU-first transcription of the SDF metaball fragment pipeline: the domain-warped
// membrane body smin-merged with up to four orbiting satellites + the pointer trail, the
// analytic-gradient surface normal, the per-pixel OKLCh perturbation, iridescence,
// fake SSS, lit-glass surface, and the mandatory linearToSrgb OETF. It is the second
// primary beside the byte-untouched WebGL2 `metaball.frag.ts` fallback (the GL-shader
// fence holds — `metaball.frag.ts` is the preserved ~5-10%-tail path; this `.wgsl` is the
// WebGPU-first path).
//
// The two LIVE `fwidth()` sites (metaball.frag.ts line 266 the AA-edge half-width + line
// 364 the Toksvig normal-variance specular clamp) transcribe to WGSL FRAGMENT-STAGE
// `fwidth()` — the WebGPU derivative builtins are fragment-only, exactly as GLSL. They
// are the most rasterizer-drift-prone lines (the ΔE-calibration suspects), so they are
// called out by name in the parity capture.
//
// The shared OETF + Ottosson OKLCh matrices (`srgbToOklab`/`oklabToLinearSrgb`/
// `oklabToOklch`/`oklchToOklab`/`linearToSrgb`) + the FBM_ROT constant are SPLICED from
// `procedural-color.wgsl.ts` (the WGSL twin of the shared GLSL chunk) — the SAME
// chunk aurora.wgsl splices — so the color math can never drift between the WGSL primary
// and the GLSL fallback, NOR between the two viz. The blob-LOCAL machinery (the 3D-p3
// hash, the IQ analytic-derivative gradient noise, the SDF smin body, the OKLCh
// gamut clamp) stays inline here as a deliberately distinct implementation.
//
// The Uniforms struct mirrors `uniformBridgeWGPU.ts` (the typed-struct source-of-truth)
// EXACTLY — the WGSL field order/alignment and the JS ArrayBuffer write offsets are
// generated from the SAME table, so a std140-vs-wgsl misalignment is caught by the
// parity-ΔE blowout, never silently read as garbage.

import {
    FBM_ROT_WGSL,
    OETF_WGSL,
    OKLCH_MATRICES_WGSL,
} from "../../../composables/glass/procedural/color.wgsl";
// The noise/FBM and OKLCh gamut-clamp/palette helper groups are carved
// into sibling chunks (the no-god-module bound; the shared-chunk SPLICE precedent).
// Spliced back IN POSITION below — the noise chunk after `${FBM_ROT_WGSL}` (its
// FBM_ROT source), the palette chunk after `${OKLCH_MATRICES_WGSL}` (its matrix
// source). The ASSEMBLED METABALL_WGSL is byte-equivalent (the goo-dot FIELD slice
// + the GL fence hold); the chunks carry NO `${...}` so the W7 assembler resolves
// them to complete bodies.
import { METABALL_NOISE_WGSL } from "./metaball-noise.wgsl";
import { METABALL_PALETTE_WGSL } from "./metaball-palette.wgsl";

// MAX_SATS=4, TRAIL_N=15, MAX_BLOB_STOPS=4 mirror metaball-uniforms.glsl.ts's #defines
// (and the JS-side BLOB_WGPU_UNIFORM layout). FBM_LACUNARITY, FBM_GAIN (the blob-local
// LIQUID-not-rocky constants, watercolor-edges.glsl.ts) are declared in the carved
// metaball-noise.wgsl chunk beside their only consumers.
export const METABALL_WGSL = /* wgsl */ `
const MAX_SATS: i32 = 4;
const TRAIL_N: i32 = 15;
const MAX_BLOB_STOPS: i32 = 4;
const PI: f32 = 3.141592653589793;

// ── Uniforms (the typed-struct source-of-truth — see uniformBridgeWGPU.ts) ──
// Scalars packed into vec4 lanes; per-satellite, per-trail, per-palette rows packed
// into a vec4 so the array stride is the natural 16 bytes (no std140 stride trap — the
// parity-blowout suspect the wave's §Triumvirate names).
struct Uniforms {
  // s0: (uTime, uBodyRadius, uPulsePhase, uPulseAmp)
  s0: vec4<f32>,
  // s1: (uNoiseAmp, uNoiseFreq, uNoiseSpeed, uWarpAmp)
  s1: vec4<f32>,
  // s2: (uSmoothK, uMerge, uMaxReach, uLit)
  s2: vec4<f32>,
  // s3: (uSpecStrength, uSpecShininess, uRimPower, uRimStrength)
  s3: vec4<f32>,
  // s4: (uIridescence, uIridHue, uIridSpeed, uSssScale)
  s4: vec4<f32>,
  // s5: (uSssPower, uCoreGlow, uHueRange, uSatShift)
  s5: vec4<f32>,
  // s6: (uBrightnessShift, uColorNoiseFreq, uColorNoiseSpeed, uStretch)
  s6: vec4<f32>,
  // s7: (uPointerActive, uPointerAttraction, uPointerStrength, uStage)
  // uStage gates the stripped floor: 1.0 = flat and shadowless; 0.0 = dressed. It
  // is derived from the single morph scalar and rides the spare s7.w lane.
  s7: vec4<f32>,
  // ptr: (uPointer.x, uPointer.y, uVelocity.x, uVelocity.y)
  ptr: vec4<f32>,
  // base: (uBaseColor.rgb, _pad)
  base: vec4<f32>,
  // rim: (uRimColor.rgb, _pad)
  rim: vec4<f32>,
  // light: (uLightDir.xyz, _pad)
  light: vec4<f32>,
  // res: (uResolution.x, uResolution.y, uShadow, uShadowSoftness)
  // the soft-shadow march rides the spare res.z/res.w lanes the
  // typed-struct SoT (uniformBridgeWGPU.ts) reserved (the EXTEND, never a re-fork): res.z
  // = uShadow (1.0 = the dressed shadow ON), res.w = uShadowSoftness (the
  // penumbra hardness, inverse light-source size → 4-48).
  res: vec4<f32>,
  // ints: (uStopCount, uSatCount, uTrailCount, _pad)
  ints: vec4<i32>,
  palette: array<vec4<f32>, 4>,
  satPos: array<vec4<f32>, 4>,   // (pos.x, pos.y, radius, opacity)
  trailPos: array<vec4<f32>, 15>, // (pos.x, pos.y, radius, _pad)
};

@group(0) @binding(0) var<uniform> u: Uniforms;

// Noise + FBM from metaball-noise.wgsl, spliced after the FBM_ROT_WGSL chunk
// below. NB: do NOT name the chunk with a template-interpolation form in a WGSL comment —
// it injects the whole multi-line chunk into this // comment line and breaks the parse
// at the first injected newline.
${FBM_ROT_WGSL}
${METABALL_NOISE_WGSL}

// ── SDF body (value+gradient circle + the IQ normalized smin, value+gradient form) ──
fn sdgCircle(p: vec2<f32>, center: vec2<f32>, radius: f32) -> vec3<f32> {
  let d = p - center;
  let len = length(d);
  var grad = vec2<f32>(0.0, 1.0);
  if (len > 1e-6) { grad = d / len; }
  return vec3<f32>(len - radius, grad);
}

fn sminQuadraticG(a: vec3<f32>, b: vec3<f32>, k0: f32) -> vec3<f32> {
  let k = k0 * 4.0;
  let h = max(k - abs(a.x - b.x), 0.0) / k;
  let m = h * h * k * 0.25;
  var w = 1.0 - 0.5 * h * h;
  if (a.x < b.x) { w = 0.5 * h * h; }
  let dist = min(a.x, b.x) - m;
  let grad = mix(a.yz, b.yz, w);
  return vec3<f32>(dist, grad);
}

fn sminCircularG(a: vec3<f32>, b: vec3<f32>, k0: f32) -> vec3<f32> {
  let k = k0 * (1.0 / (1.0 - sqrt(0.5)));
  let h = max(k - abs(a.x - b.x), 0.0) / k;
  let m = k * 0.5 * (1.0 + h - sqrt(1.0 - h * (h - 2.0)));
  var w = 1.0 - 0.5 * h;
  if (a.x < b.x) { w = 0.5 * h; }
  let dist = min(a.x, b.x) - m;
  let grad = mix(a.yz, b.yz, w);
  return vec3<f32>(dist, grad);
}

fn sminG(a: vec3<f32>, b: vec3<f32>, k: f32) -> vec3<f32> {
  if (u.s2.y > 0.5) { return sminCircularG(a, b, k); }
  return sminQuadraticG(a, b, k);
}

${OETF_WGSL}
${OKLCH_MATRICES_WGSL}

// OKLCh gamut clamp, palette sample, and breath from metaball-palette.wgsl,
// spliced AFTER the OKLCH_MATRICES_WGSL chunk above (its matrix source). NB: do NOT
// write the chunk's identifier with a template-interpolation form in a WGSL comment — it
// would inject the whole multi-line matrices chunk INTO this // comment line and break the
// parse at the first injected newline, the live WGSL syntax error
// that silently fell every metaball/goo-dot to the WebGL2 net, masking the WGSL primary).
${METABALL_PALETTE_WGSL}

// The composite SDF field with its analytic gradient: vec3(dist, ∂/∂x, ∂/∂y).
fn sceneDistG(uv: vec2<f32>) -> vec3<f32> {
  let uBodyRadius = u.s0.y;
  let uPulsePhase = u.s0.z;
  let uPulseAmp = u.s0.w;
  let uNoiseAmp = u.s1.x;
  let uNoiseFreq = u.s1.y;
  let uNoiseSpeed = u.s1.z;
  let uWarpAmp = u.s1.w;
  let uSmoothK = u.s2.x;
  let uTime = u.s0.x;
  let uVelocity = u.ptr.zw;
  let uStretch = u.s6.w;
  let uSatCount = u.ints.y;
  let uTrailCount = u.ints.z;

  let bodyR = uBodyRadius + breath(uPulsePhase) * uPulseAmp;

  // Velocity-driven VOLUME-PRESERVING squash-and-stretch (tanh-saturated).
  var bodyUv = uv;
  var ax = vec2<f32>(1.0, 0.0);
  var perp = vec2<f32>(0.0, 1.0);
  var sa = 1.0;
  let speed = length(uVelocity);
  let squashed = uStretch > 0.0 && speed > 1e-4;
  if (squashed) {
    ax = uVelocity / speed;
    perp = vec2<f32>(-ax.y, ax.x);
    sa = 1.0 + tanh(speed * 1.6) * uStretch;
    bodyUv = vec2<f32>(dot(uv, ax) / sa, dot(uv, perp) * sa);
  }

  // Domain-warped FBM displacement WITH its analytic gradient.
  let fbmv = fbmWarpedG(bodyUv * uNoiseFreq + uTime * uNoiseSpeed, 3, uWarpAmp);
  let bodyDisplacement = (fbmv.x - 0.5) * uNoiseAmp;
  let dispGradBody = uNoiseAmp * uNoiseFreq * fbmv.yz;

  let bodyG = sdgCircle(bodyUv, vec2<f32>(0.0), bodyR + bodyDisplacement);
  let bodyGradBody = bodyG.yz - dispGradBody;

  var bodyGradUv: vec2<f32>;
  if (squashed) {
    let scaled = vec2<f32>(bodyGradBody.x / sa, bodyGradBody.y * sa);
    bodyGradUv = scaled.x * ax + scaled.y * perp;
  } else {
    bodyGradUv = bodyGradBody;
  }
  var d = vec3<f32>(bodyG.x, bodyGradUv);

  // Satellites — smin-merged into the body.
  for (var i = 0; i < MAX_SATS; i = i + 1) {
    if (i >= uSatCount) { break; }
    let s = u.satPos[i];
    var satG = sdgCircle(uv, s.xy, s.z);
    satG.x = satG.x + (1.0 - s.w) * 0.3;
    d = sminG(d, satG, uSmoothK);
  }

  // Pointer trail — a decaying-radius pseudopod.
  for (var i = 0; i < TRAIL_N; i = i + 1) {
    if (i >= uTrailCount) { break; }
    let tp = u.trailPos[i];
    let trailG = sdgCircle(uv, tp.xy, tp.z);
    d = sminG(d, trailG, uSmoothK);
  }
  return d;
}

// The analytic surface normal from the field gradient.
fn surfaceNormalFromGrad(grad2d: vec2<f32>, d: f32, bodyR: f32) -> vec3<f32> {
  let g = normalize(grad2d + vec2<f32>(1e-6));
  let interior = clamp(-d / max(bodyR, 1e-4), 0.0, 1.0);
  let z = sqrt(max(0.0, 1.0 - (1.0 - interior) * (1.0 - interior)));
  return normalize(vec3<f32>(g * (1.0 - z), z) + vec3<f32>(0.0, 0.0, 1e-6));
}

// ── 2D SDF soft-shadow march (IQ rmshadows improved penumbra) ───────────────
//    Based on research/viz/goo-blob.md §2.3. A procedural soft contact shadow that follows the
//    irregular metaball silhouette (NOT a hard disc, box shadow). Marches a ray from ro
//    along rd (the in-plane projection of uLightDir), accumulating the closest miss via
//    the Aaltonen penumbra (y = h*h/(2*ph) + d = sqrt(h*h - y*y)) that kills the
//    banding the naive res = min(res, h/(w*t)) shows. CHEAP: 24 steps, re-uses the SAME
//    sceneDistG().x field (NO separate field re-eval, NO FBO/multi-pass — the procedural
//    field needs none, §2.3). w is the penumbra hardness (inverse light-source size →
//    uShadowSoftness). It is derivative-FREE (no fwidth/dpdx/dpdy), so it is fragment-safe
//    here. Returns 1.0 (fully lit) → 0.0 (fully occluded). ──
fn softShadow2D(ro: vec2<f32>, rd: vec2<f32>, mint: f32, maxt: f32, w: f32) -> f32 {
  var res = 1.0;
  var ph = 1e20;
  var t = mint;
  for (var i = 0; i < 24; i = i + 1) {
    if (t >= maxt) { break; }
    let h = sceneDistG(ro + rd * t).x;
    if (h < 0.001) { return 0.0; }
    let y = h * h / (2.0 * ph);
    let dd = sqrt(max(h * h - y * y, 0.0));
    res = min(res, dd / (w * max(0.001, t - y)));
    ph = h;
    t = t + h;
  }
  return clamp(res, 0.0, 1.0);
}

// ── Full-screen triangle vertex stage (the pilot idiom — no vertex buffer) ──
struct VSOut {
  @builtin(position) pos: vec4<f32>,
  @location(0) uv: vec2<f32>,
};

@vertex
fn vs_main(@builtin(vertex_index) vi: u32) -> VSOut {
  var p = vec2<f32>(-1.0, -1.0);
  if (vi == 1u) { p = vec2<f32>(3.0, -1.0); }
  else if (vi == 2u) { p = vec2<f32>(-1.0, 3.0); }
  var out: VSOut;
  out.pos = vec4<f32>(p, 0.0, 1.0);
  // vUv = aPos * 0.5 + 0.5 (the metaball.vert convention).
  out.uv = p * 0.5 + 0.5;
  return out;
}

// ── Fragment stage (the main() transcription) ──
@fragment
fn fs_main(in: VSOut) -> @location(0) vec4<f32> {
  let uTime = u.s0.x;
  let uBodyRadius = u.s0.y;
  let uPulsePhase = u.s0.z;
  let uPulseAmp = u.s0.w;
  let uMaxReach = u.s2.z;
  let uLit = u.s2.w;
  let uPointerActive = u.s7.x;
  let uPointerAttraction = u.s7.y;
  let uPointerStrength = u.s7.z;
  // The stage-1 gate (1.0 = the plain shadowless fill-only floor).
  let uStage = u.s7.w;
  // The blob-to-meatball shading-morph scalar (the base.w pad
  // lane; the typed-struct SoT writes it). 0 = flat blob, 1 = lit meatball, in-between
  // lerps the surface shading (the smin geometry is shared).
  let uMorphT = clamp(u.base.w, 0.0, 1.0);
  let uPointer = u.ptr.xy;
  let uHueRange = u.s5.z;
  let uSatShift = u.s5.w;
  let uBrightnessShift = u.s6.x;
  let uColorNoiseFreq = u.s6.y;
  let uColorNoiseSpeed = u.s6.z;
  let uIridescence = u.s4.x;
  let uIridHue = u.s4.y;
  let uIridSpeed = u.s4.z;
  let uSssScale = u.s4.w;
  let uSssPower = u.s5.x;
  let uCoreGlow = u.s5.y;
  let uSpecStrength = u.s3.x;
  let uSpecShininess = u.s3.y;
  let uRimPower = u.s3.z;
  let uRimStrength = u.s3.w;
  let uLightDir = u.light.xyz;
  let uRimColor = u.rim.rgb;
  // The soft-shadow gate + penumbra hardness (res.z/res.w lanes).
  let uShadow = u.res.z;
  let uShadowSoftness = u.res.w;

  var uv = in.uv - 0.5;

  // Pre-FBM bounding test, expressed for uniform derivative flow. The GLSL fallback
  // EARLY-RETURNS transparent here (a perf skip of the FBM border); WGSL CANNOT — an early
  // return predicated on the per-fragment uv makes the fwidth(d)/fwidth(Nh) calls below
  // reachable only through non-uniform control flow, which the WGSL uniformity analyzer
  // REJECTS (fwidth must only be called from uniform control flow) so the metaball WGSL
  // module never compiled and every GooBlob + goo-dot fell silently to the WebGL2 net (the
  // "broken TOTALLY" the user reports, the un-exercised Safari-primary surface). So the
  // bound is folded into the FINAL alpha (a flag, NOT a control-flow return): the derivative
  // builtins stay in UNIFORM control flow, and an outside fragment writes transparent at the
  // end — gestalt-identical to the GLSL early-out, just without the WGSL-illegal pre-
  // derivative return. sceneDistG is derivative-FREE so running it on the border costs only
  // ALU (no correctness hazard); the real GPU swallows it.
  let inBounds = dot(uv, uv) <= uMaxReach * uMaxReach;

  // Pointer deformation preserves the signed attraction direction.
  if (uPointerActive > 0.5) {
    let pointerDir = uPointer - uv;
    let pointerDist = length(pointerDir);
    let influence = smoothstep(0.5, 0.0, pointerDist) * uPointerAttraction * uPointerStrength;
    uv = uv + normalize(pointerDir + vec2<f32>(1e-6)) * influence;
  }

  let bodyR = uBodyRadius + breath(uPulsePhase) * uPulseAmp;

  // Composite domain-warped membrane field WITH its analytic gradient.
  let scene = sceneDistG(uv);
  let d = scene.x;
  let fieldGrad = scene.yz;

  // ── fwidth SITE #1 (metaball.frag.ts line 266) — AA-edge half-width from the SDF
  //    screen-space gradient. The WGSL fragment-stage fwidth() transcription. In UNIFORM
  //    control flow (no early return precedes it — the bounding test above is a flag). ──
  let aa = max(fwidth(d), 1e-6);
  // The bounding test (D3c) folds in here: an out-of-bounds fragment is forced transparent
  // (the GLSL early-out's transparent WRITE, expressed as an alpha gate, not a return).
  let alpha = (1.0 - smoothstep(-aa, aa, d)) * select(0.0, 1.0, inBounds);

  // ── WGSL uniformity structure ────────────────────────────────────────────
  //    The Toksvig screen-space derivative (fwidth SITE #2) is hoisted HERE, into the SAME
  //    uniform control flow fwidth(d) above already arms in (top-level fs_main, before the
  //    per-fragment alpha < 0.001 early-return and the uLit/uShadow non-uniform branches).
  //    WGSL uniformity analysis rejects a fwidth() reached only through a return predicated
  //    on a per-fragment value (the alpha < 0.001 early-out) nested under further branches
  //    exactly the residual that kept the normal derivative inside the lit branch from
  //    compiling, so the WGSL primary never armed and GooBlob fell to the WebGL2 net. Nh is
  //    the uniform-flow surface normal computed for this derivative ONLY (byte-identical to
  //    the lit block's own N = surfaceNormalFromGrad(...) below — the SAME inputs, so
  //    nVar = length(fwidth(Nh)) IS the Toksvig clamp the lit block reads); the named lit-
  //    block N stays AFTER the uStage early-return (the STAGE-1 floor reaches no lit work).
  //    nVar is a pure uniform-flow value the lit block READS — no derivative in non-uniform
  //    flow; the math is byte-identical to the GLSL fallback's Toksvig clamp, only its
  //    EVALUATION POINT moved. The shadow march (T2) reuses d (the same sceneDistG().x).
  let Nh = surfaceNormalFromGrad(fieldGrad, d, bodyR);
  // ── fwidth SITE #2 (metaball.frag.ts line 364) — Toksvig normal-variance specular
  //    clamp, the WGSL fragment-stage fwidth() of the surface normal. NOW in uniform
  //    control flow (the structural fix), so the WGSL primary ARMS + paints the full lit
  //    creature instead of falling to the stripped WebGL2 fallback. ──
  let nVar = length(fwidth(Nh));

  if (alpha < 0.001) {
    return vec4<f32>(0.0);
  }

  // Edit #4 — perceptually-uniform OKLCh variation.
  let colorNoise = fbm(uv * uColorNoiseFreq + uTime * uColorNoiseSpeed, 3);
  var oklch = samplePaletteOklch(colorNoise);

  oklch.z = oklch.z + (colorNoise - 0.5) * uHueRange * (PI / 180.0);
  oklch.y = max(oklch.y + (colorNoise - 0.5) * uSatShift, 0.0);
  oklch.x = clamp(oklch.x + uBrightnessShift, 0.0, 1.0);

  // ── The stripped flat floor (morphT=0). ──
  // The minimal verifiable floor: SDF + smin (the meatball field, already in d/
  // alpha above) + fwidth-AA (the crisp alpha above) + warm-cream fill. NO surface
  // normal, NO Fresnel, NO lit glint, NO iridescence, NO fake-SSS, NO shadow —
  // deliberately FLAT. It returns BEFORE any of the STAGE-2 dressing is reached. The
  // STAGE-1 path simply never READS the hoisted Nh/nVar or the lit/shadow blocks; the
  // normal derivative is now in uniform control flow above, so both the stage-1 floor
  // and the stage-2 lit path arm on Metal. The residual that kept stage 2 falling to
  // the WebGL2 path is closed. The
  // teaching contrast: this is the "it renders, it meatballs, it works on Safari"
  // floor STAGE 2 layers the lit/shadow onto via the SAME uniforms.
  // The flat blob fill is snapshotted from the pre-dressing
  // oklch (the dressing mutates oklch below). At morphT <= 0 (a pure blob) emit the
  // flat fill + dither and return — the byte-identical STAGE-1 floor, zero dressing cost.
  let flatOkl = gamutClampOklch(oklch);
  let flatLin = oklabToLinearSrgb(oklchToOklab(flatOkl));
  let flatRgbBase = clamp(linearToSrgb(flatLin), vec3<f32>(0.0), vec3<f32>(1.0));
  if (uMorphT <= 0.0) {
    let fc1 = in.pos.xy;
    let ign1 = fract(52.9829189 * fract(dot(fc1, vec2<f32>(0.06711056, 0.00583715))));
    let rgb1 = clamp(flatRgbBase + (ign1 - 0.5) / 255.0, vec3<f32>(0.0), vec3<f32>(1.0));
    return vec4<f32>(rgb1 * alpha, alpha);
  }

  // The named surface normal the lit/iridescence/SSS blocks read (byte-identical inputs to
  // the hoisted Nh above — the Toksvig nVar = length(fwidth(Nh)) IS this N's screen-space
  // variance). It sits AFTER the uStage early-return so the STAGE-1 floor reaches no lit work.
  let N = surfaceNormalFromGrad(fieldGrad, d, bodyR);
  let V = vec3<f32>(0.0, 0.0, 1.0);
  let thickness = clamp(-d / max(bodyR, 1e-4), 0.0, 1.0);
  let fres = pow(1.0 - max(dot(N, V), 0.0), 2.5);

  // ── W11.a iridescence — warm-biased IQ cosine palette driving OKLCh HUE ──
  if (uIridescence > 0.0) {
    let t = fres + 0.3 * colorNoise + uTime * uIridSpeed;
    let iridHue = uIridHue + 0.18 * PI * cos(2.0 * PI * t);
    let w = fres * uIridescence;
    oklch.z = mix(oklch.z, iridHue, w);
    oklch.y = min(oklch.y + 0.04 * w, oklch.y + 0.08);
    oklch.x = min(oklch.x + 0.05 * w, 1.0);
  }

  // ── W11.a fake subsurface translucency — thickness inner-glow + back-light ──
  if (uCoreGlow > 0.0 || uSssScale > 0.0) {
    oklch.x = min(oklch.x + uCoreGlow * (1.0 - exp(-3.0 * thickness)), 1.0);
    let L = normalize(uLightDir + vec3<f32>(1e-6));
    let back = pow(clamp(dot(V, -(L + N * thickness)), 0.0, 1.0), uSssPower);
    let sss = back * uSssScale * (1.0 - thickness);
    oklch.x = min(oklch.x + sss, 1.0);
    oklch.z = oklch.z + sss * 0.1 * (1.0 - thickness);
  }

  // ── Soft contact shadow ──────────────────────────────────────────────────
  //    A procedural soft shadow that
  //    FOLLOWS the irregular silhouette: march from this fragment's uv toward the in-plane
  //    projection of uLightDir; where the metaball field occludes the light (the body
  //    shadows itself opposite the light, a satellite shadows the body across the neck), the
  //    march returns < 1 and DARKENS the OKLCh L — a soft grounded contact band UNDER the
  //    dome, congruent with (but PROCEDURAL, silhouette-following, unlike) the CSS gel-dome
  //    drop-shadow. Concentrated on the AWAY-facing lower rim (an away-facing weight × a
  //    thin-rim Gaussian band) so the deep-lit interior + the light-facing edge stay bright
  //    and the grounded shadow reads at the lower silhouette edge — the warm-cream body mean
  //    holds. Gated uShadow > 0.5; morphT=0 ships shadowless. ──
  if (uShadow > 0.5) {
    let L2 = normalize(uLightDir.xy + vec2<f32>(1e-6));
    // w increases with the inverse light-source size → uShadowSoftness (a harder penumbra at a
    // higher value). Start the march just off the surface so a fragment never self-shadows
    // at t=0; cap the reach at the body span.
    let sh = softShadow2D(uv, L2, max(aa, 0.004), bodyR * 1.5, max(uShadowSoftness, 4.0));
    // The contact band sits on the LOWER rim (the side AWAY from the light) — gated by
    // dot(fieldGrad, L2) < 0 (the rim facing away from L2) AND the thin-rim weight
    // (a Gaussian band peaking at thickness ≈ 0.18 so the deep-lit interior + the
    // light-facing edge stay BRIGHT — the warm-cream body mean holds). The 0.20 cap keeps
    // it a soft grounding whisper, never a gouge (the warm-cream identity + the
    // floor hold).
    let away = clamp(-dot(normalize(fieldGrad + vec2<f32>(1e-6)), L2), 0.0, 1.0);
    let band = exp(-pow((thickness - 0.18) / 0.16, 2.0));
    let shadowDarken = (1.0 - sh) * away * band * 0.20;
    oklch.x = max(oklch.x - shadowDarken, 0.0);
  }

  oklch = gamutClampOklch(oklch);

  var lin = oklabToLinearSrgb(oklchToOklab(oklch));

  // ── W9.b lit glass surface — Blinn-Phong glint + Fresnel rim, in LINEAR ──
  if (uLit > 0.5) {
    let L = normalize(uLightDir + vec3<f32>(1e-6));
    let H = normalize(L + V);

    let warmCream = oklabToLinearSrgb(oklchToOklab(vec3<f32>(0.97, 0.03, radians(85.0))));

    // ── fwidth SITE #2 — Toksvig normal-variance specular clamp. nVar is the HOISTED
    //    length(fwidth(N)), computed once at the top of fs_main
    //    in uniform control flow so the WGSL primary arms on Metal. The math is
    //    byte-identical to the GLSL fallback (length(fwidth(N))); only its evaluation
    //    point moved out of this non-uniform if (uLit > 0.5) branch. ──
    let shininess = uSpecShininess / (1.0 + 24.0 * nVar);
    let energyNorm = (shininess + 2.0) / 8.0;
    let spec = pow(max(dot(N, H), 0.0), shininess) * uSpecStrength * energyNorm;

    var rimOkl = oklabToOklch(srgbToOklab(uRimColor));
    let bodyL = oklch.x;
    let dL = abs(rimOkl.x - bodyL);
    let lack = clamp((0.22 - dL) / 0.22, 0.0, 1.0);
    // target is a WGSL RESERVED word (W3C WGSL 16.2) so a "var target" declaration is an
    // invalid identifier: the shader module fails to compile and the WGSL primary never
    // arms. Renamed to
    // a valid identifier; the math + the value are byte-identical.
    var targetL = 0.18;
    if (bodyL < 0.5) { targetL = 0.92; }
    rimOkl.x = clamp(mix(rimOkl.x, targetL, lack), 0.0, 1.0);
    rimOkl.y = rimOkl.y * mix(1.0, 0.5, lack);
    let rimLin = oklabToLinearSrgb(oklchToOklab(rimOkl));

    let rimFres = pow(1.0 - max(dot(N, V), 0.0), uRimPower);
    let rim = rimFres * uRimStrength * (1.0 - 0.6 * thickness);

    var highlight = max(warmCream * spec, rimLin * rim);
    highlight = min(highlight, vec3<f32>(0.85));
    lin = lin + highlight;
  }

  var rgb = clamp(linearToSrgb(lin), vec3<f32>(0.0), vec3<f32>(1.0));

  // Compose the blob↔meatball shading morph: lerp the flat blob
  // fill -> the dressed meatball surface on uMorphT (the geometry/alpha is shared; only
  // the surface shading interpolates). morphT == 1 is byte-identical to the dressed
  // meatball; the morphT == 0 case already returned the flat fill above.
  rgb = mix(flatRgbBase, rgb, uMorphT);

  // IGN dither — 1-LSB triangular dither in DISPLAY space, AFTER linearToSrgb.
  let fragCoord = in.pos.xy;
  let ign = fract(52.9829189 * fract(dot(fragCoord, vec2<f32>(0.06711056, 0.00583715))));
  rgb = clamp(rgb + (ign - 0.5) / 255.0, vec3<f32>(0.0), vec3<f32>(1.0));

  // premultiply AFTER the OETF: straight-alpha gamma → premultiplied.
  return vec4<f32>(rgb * alpha, alpha);
}
`;
