// BB.W-VIZ-SUITE (W-GOOBLOB-WGPU) — the goo-blob metaball WGSL PRIMARY path (net-new).
//
// The WebGPU-first transcription of the SDF metaball fragment pipeline: the domain-warped
// membrane body smin-merged with up to four orbiting satellites + the pointer trail, the
// analytic-gradient surface normal, the per-pixel OKLCh perturbation, the iridescence /
// fake-SSS / lit-glass surface, and the mandatory linearToSrgb OETF. It is the SECOND
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
// `procedural-color.wgsl.ts` (the WGSL twin of the AV.W2 shared GLSL chunk) — the SAME
// chunk aurora.wgsl splices — so the color math can never drift between the WGSL primary
// and the GLSL fallback, NOR between the two viz. The blob-LOCAL machinery (the 3D-p3
// hash, the IQ analytic-derivative gradient noise, the SDF smin body, the OKLCh
// gamut-clamp) stays inline here, legitimately distinct per AV.W2 §3a.
//
// The Uniforms struct mirrors `uniformBridgeWGPU.ts` (the typed-struct source-of-truth)
// EXACTLY — the WGSL field order/alignment and the JS ArrayBuffer write offsets are
// generated from the SAME table, so a std140-vs-wgsl misalignment is caught by the
// parity-ΔE blowout, never silently read as garbage.

import {
    FBM_ROT_WGSL,
    OETF_WGSL,
    OKLCH_MATRICES_WGSL,
} from "../../aurora/constants/shaders/procedural-color.wgsl";

// MAX_SATS=4 / TRAIL_N=15 / MAX_BLOB_STOPS=4 mirror metaball-uniforms.glsl.ts's #defines
// (and the JS-side BLOB_WGPU_UNIFORM layout). FBM_LACUNARITY / FBM_GAIN mirror the
// blob-local LIQUID-not-rocky constants in watercolor-edges.glsl.ts.
export const METABALL_WGSL = /* wgsl */ `
const MAX_SATS: i32 = 4;
const TRAIL_N: i32 = 15;
const MAX_BLOB_STOPS: i32 = 4;
const PI: f32 = 3.141592653589793;
const FBM_LACUNARITY: f32 = 1.8;
const FBM_GAIN: f32 = 0.42;

// ── Uniforms (the typed-struct source-of-truth — see uniformBridgeWGPU.ts) ──
// Scalars packed into vec4 lanes; per-satellite / per-trail / per-palette rows packed
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
  // s7: (uPointerActive, uPointerAttraction, uPointerStrength, _pad)
  s7: vec4<f32>,
  // ptr: (uPointer.x, uPointer.y, uVelocity.x, uVelocity.y)
  ptr: vec4<f32>,
  // base: (uBaseColor.rgb, _pad)
  base: vec4<f32>,
  // rim: (uRimColor.rgb, _pad)
  rim: vec4<f32>,
  // light: (uLightDir.xyz, _pad)
  light: vec4<f32>,
  // res: (uResolution.x, uResolution.y, _pad, _pad)
  res: vec4<f32>,
  // ints: (uStopCount, uSatCount, uTrailCount, _pad)
  ints: vec4<i32>,
  palette: array<vec4<f32>, 4>,
  satPos: array<vec4<f32>, 4>,   // (pos.x, pos.y, radius, opacity)
  trailPos: array<vec4<f32>, 15>, // (pos.x, pos.y, radius, _pad)
};

@group(0) @binding(0) var<uniform> u: Uniforms;

// ── Noise (blob-LOCAL 3D-p3 hash + IQ analytic-derivative gradient noise) ──
fn hash21(p: vec2<f32>) -> f32 {
  var p3 = fract(vec3<f32>(p.x, p.y, p.x) * 0.1031);
  p3 = p3 + dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

// IQ analytic-derivative gradient noise — value in .x, ANALYTIC gradient (d/dx, d/dy) in
// .yz, from one eval. The quintic fade has a continuous 2nd derivative.
fn noised(p: vec2<f32>) -> vec3<f32> {
  let i = floor(p);
  let f = fract(p);
  let uu = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  let du = 30.0 * f * f * (f * (f - 2.0) + 1.0);

  let ga = -1.0 + 2.0 * vec2<f32>(hash21(i + vec2<f32>(0.0, 0.0)), hash21(i + vec2<f32>(7.3, 0.0)));
  let gb = -1.0 + 2.0 * vec2<f32>(hash21(i + vec2<f32>(1.0, 0.0)), hash21(i + vec2<f32>(8.3, 0.0)));
  let gc = -1.0 + 2.0 * vec2<f32>(hash21(i + vec2<f32>(0.0, 1.0)), hash21(i + vec2<f32>(7.3, 1.0)));
  let gd = -1.0 + 2.0 * vec2<f32>(hash21(i + vec2<f32>(1.0, 1.0)), hash21(i + vec2<f32>(8.3, 1.0)));

  let va = dot(ga, f - vec2<f32>(0.0, 0.0));
  let vb = dot(gb, f - vec2<f32>(1.0, 0.0));
  let vc = dot(gc, f - vec2<f32>(0.0, 1.0));
  let vd = dot(gd, f - vec2<f32>(1.0, 1.0));

  let n = va + uu.x * (vb - va) + uu.y * (vc - va) + uu.x * uu.y * (va - vb - vc + vd);
  let value = 0.5 + 0.5 * n;

  let grad =
    ga + uu.x * (gb - ga) + uu.y * (gc - ga) + uu.x * uu.y * (ga - gb - gc + gd) +
    du * (vec2<f32>(uu.y, uu.x) * (va - vb - vc + vd) + vec2<f32>(vb, vc) - va);
  return vec3<f32>(value, 0.5 * grad);
}

${FBM_ROT_WGSL}

fn fbm(p0: vec2<f32>, octaves: i32) -> f32 {
  var value = 0.0;
  var amp = 0.5;
  var freq = 1.0;
  var p = p0;
  for (var i = 0; i < 4; i = i + 1) {
    if (i >= octaves) { break; }
    value = value + amp * noised(p * freq).x;
    p = FBM_ROT * p;
    freq = freq * FBM_LACUNARITY;
    amp = amp * FBM_GAIN;
  }
  return value;
}

// FBM with ANALYTIC GRADIENT — value in .x, ∂/∂x, ∂/∂y in .yz. The gradient accumulates
// noised()'s analytic gradient per octave, chain-ruled through the per-octave frequency
// scale AND the FBM_ROT rotation (the keystone feed for the analytic surface normal).
fn fbmG(p: vec2<f32>, octaves: i32) -> vec3<f32> {
  var value = 0.0;
  var grad = vec2<f32>(0.0, 0.0);
  var amp = 0.5;
  var freq = 1.0;
  var rotAccum = mat2x2<f32>(1.0, 0.0, 0.0, 1.0);
  var pp = p;
  for (var i = 0; i < 4; i = i + 1) {
    if (i >= octaves) { break; }
    let n = noised(pp * freq);
    value = value + amp * n.x;
    grad = grad + amp * freq * (transpose(rotAccum) * n.yz);
    pp = FBM_ROT * pp;
    freq = freq * FBM_LACUNARITY;
    amp = amp * FBM_GAIN;
    rotAccum = FBM_ROT * rotAccum;
  }
  return vec3<f32>(value, grad);
}

// One domain-warp pass with the ANALYTIC GRADIENT carried (warp-Jacobian approximation).
fn fbmWarpedG(p: vec2<f32>, octaves: i32, warpAmp: f32) -> vec3<f32> {
  if (warpAmp <= 0.0) { return fbmG(p, octaves); }
  let q = vec2<f32>(fbm(p + vec2<f32>(0.0, 0.0), octaves),
                    fbm(p + vec2<f32>(5.2, 1.3), octaves));
  return fbmG(p + warpAmp * (q - 0.5), octaves);
}

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

// ── OKLCh gamut clamp (hue-preserving inward chroma clamp — blob-local) ──
fn inGamut(lin: vec3<f32>) -> bool {
  return all(lin >= vec3<f32>(0.0)) && all(lin <= vec3<f32>(1.0));
}
fn gamutClampOklch(lch: vec3<f32>) -> vec3<f32> {
  let lin = oklabToLinearSrgb(oklchToOklab(lch));
  if (inGamut(lin)) { return lch; }
  var lo = 0.0;
  var hi = lch.y;
  for (var i = 0; i < 16; i = i + 1) {
    let mid = 0.5 * (lo + hi);
    let test = vec3<f32>(lch.x, mid, lch.z);
    if (inGamut(oklabToLinearSrgb(oklchToOklab(test)))) { lo = mid; } else { hi = mid; }
  }
  return vec3<f32>(lch.x, lo, lch.z);
}

// AX.W15 — de-synced breath (three DETUNED sines at irrational ratios).
fn breath(phase: f32) -> f32 {
  return (sin(phase) + 0.5 * sin(phase * 1.4444 + 1.7) + 0.28 * sin(phase * 0.31 + 4.1)) / 1.78;
}

// AX.W15 — the composite SDF field WITH its ANALYTIC GRADIENT vec3(dist, ∂/∂x, ∂/∂y).
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

// AX.W15 — the analytic surface normal from the field gradient.
fn surfaceNormalFromGrad(grad2d: vec2<f32>, d: f32, bodyR: f32) -> vec3<f32> {
  let g = normalize(grad2d + vec2<f32>(1e-6));
  let interior = clamp(-d / max(bodyR, 1e-4), 0.0, 1.0);
  let z = sqrt(max(0.0, 1.0 - (1.0 - interior) * (1.0 - interior)));
  return normalize(vec3<f32>(g * (1.0 - z), z) + vec3<f32>(0.0, 0.0, 1e-6));
}

// W11.b — sample the multi-stop palette at t, OKLab mix + midpoint chroma-bump. Returns
// an OKLCh stop [L, C, h(rad)]. Falls back to uBaseColor when uStopCount <= 1.
fn samplePaletteOklch(t: f32) -> vec3<f32> {
  let uStopCount = u.ints.x;
  if (uStopCount <= 1) { return oklabToOklch(srgbToOklab(u.base.rgb)); }
  let n = f32(uStopCount);
  let ft = clamp(t, 0.0, 1.0) * (n - 1.0);
  let i0 = i32(floor(ft));
  let i1 = min(i0 + 1, uStopCount - 1);
  let f = ft - f32(i0);
  let labA = srgbToOklab(u.palette[i0].rgb);
  let labB = srgbToOklab(u.palette[i1].rgb);
  let lab = mix(labA, labB, f);
  var lch = oklabToOklch(lab);
  lch.y = lch.y + 0.03 * sin(PI * f);
  return lch;
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

  var uv = in.uv - 0.5;

  // PRE-FBM bounding early-out — transparent WRITE (not a discard).
  if (dot(uv, uv) > uMaxReach * uMaxReach) {
    return vec4<f32>(0.0);
  }

  // Pointer deformation — sign per AY.W-BLOB-CONFIG D2.
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
  //    screen-space gradient. The WGSL fragment-stage fwidth() transcription. ──
  let aa = max(fwidth(d), 1e-6);
  let alpha = 1.0 - smoothstep(-aa, aa, d);

  if (alpha < 0.001) {
    return vec4<f32>(0.0);
  }

  // Edit #4 — perceptually-uniform OKLCh variation.
  let colorNoise = fbm(uv * uColorNoiseFreq + uTime * uColorNoiseSpeed, 3);
  var oklch = samplePaletteOklch(colorNoise);

  oklch.z = oklch.z + (colorNoise - 0.5) * uHueRange * (PI / 180.0);
  oklch.y = max(oklch.y + (colorNoise - 0.5) * uSatShift, 0.0);
  oklch.x = clamp(oklch.x + uBrightnessShift, 0.0, 1.0);

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

  oklch = gamutClampOklch(oklch);

  var lin = oklabToLinearSrgb(oklchToOklab(oklch));

  // ── W9.b lit glass surface — Blinn-Phong glint + Fresnel rim, in LINEAR ──
  if (uLit > 0.5) {
    let L = normalize(uLightDir + vec3<f32>(1e-6));
    let H = normalize(L + V);

    let warmCream = oklabToLinearSrgb(oklchToOklab(vec3<f32>(0.97, 0.03, radians(85.0))));

    // ── fwidth SITE #2 (metaball.frag.ts line 364) — Toksvig normal-variance
    //    specular clamp. The WGSL fragment-stage fwidth() of the surface normal. ──
    // KNOWN RESIDUAL (BC.W-GOOBLOB-MEATBALL owns the fix): WGSL's uniformity analysis
    // rejects this fwidth(N) (N derives from uv mutated inside the pointer/satellite
    // non-uniform branches above), so the WGSL primary does not arm on Metal and GooBlob
    // falls to the WebGL2 net (which DOES paint — the substrate-everywhere paint floor is
    // met). The structural fix (a uniform-flow derivative or a Toksvig re-derivation) is a
    // metaball-math decision the GooBlob per-viz wave owns, not a compile rename.
    let nVar = length(fwidth(N));
    let shininess = uSpecShininess / (1.0 + 24.0 * nVar);
    let energyNorm = (shininess + 2.0) / 8.0;
    let spec = pow(max(dot(N, H), 0.0), shininess) * uSpecStrength * energyNorm;

    var rimOkl = oklabToOklch(srgbToOklab(uRimColor));
    let bodyL = oklch.x;
    let dL = abs(rimOkl.x - bodyL);
    let lack = clamp((0.22 - dL) / 0.22, 0.0, 1.0);
    // target is a WGSL RESERVED word (W3C WGSL 16.2) so a "var target" declaration is an
    // invalid identifier: the shader module fails to compile and the WGSL primary never
    // arms (the GooBlob reserved-keyword bug BC.W-WEBGPU-EVERYWHERE W7 catches). Renamed to
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

  // IGN dither — 1-LSB triangular dither in DISPLAY space, AFTER linearToSrgb.
  let fragCoord = in.pos.xy;
  let ign = fract(52.9829189 * fract(dot(fragCoord, vec2<f32>(0.06711056, 0.00583715))));
  rgb = clamp(rgb + (ign - 0.5) / 255.0, vec3<f32>(0.0), vec3<f32>(1.0));

  // premultiply AFTER the OETF: straight-alpha gamma → premultiplied.
  return vec4<f32>(rgb * alpha, alpha);
}
`;
