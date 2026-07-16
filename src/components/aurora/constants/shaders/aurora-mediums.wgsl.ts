// The WGSL painterly-medium bodies provide the first-principles close for the
// "NO FALLBACKS on Safari" contract: on Safari 26 (WebGPU), a painterly medium renders
// the full painterly register, never a
// silent smooth degrade.
//
// THE PORT (mechanical, GLSL → WGSL — same math, WGSL syntax):
//   - `sampleBase`  — the edge-mask base-color re-sample (the operator the painterly
//     mediums Sobel/sector-sample). The WGSL twin of mediums.glsl.ts's `sampleBase`.
//   - `structureTensorField` — the keystone: stroke/patch orientation from the
//     COLOR FIELD's OWN structure (a 3×3 Sobel over luma(sampleBase) → the 2×2 structure
//     tensor → the minor eigenvector edge-tangent + the coherence A). The WGSL twin.
//   - `flowField` — the directional flow seed (the WGSL twin; the simple radial/swirl/
//     diagonal patterns + the curl perturb, sufficient for the medium fallback dirs the
//     studio default exercises).
//   - `brokenColorJitter` — hue+chroma jitter at constant OKLCh L (the crayon pigment read).
//   - `mediumPastel`, `mediumWatercolor`, `mediumCrayon` — the cheap PEER mediums
//     (sampleBase/structureTensorField/vnoise only — no stroke cascade).
//   - `mediumKuwahara` — THE KEYSTONE (Kyprianidis 2010, the SOFT polynomial-weighted
//     anisotropic-Kuwahara; aurora is a PROCEDURAL field so no FBO — the operator runs
//     over sampleBase over an elliptical kernel oriented along the structure tensor, 4
//     rings × 8 angular taps = 32 procedural samples, 8 OVERLAPPING sectors blended SOFT
//     by 1/(1+var^q) → no 8-spoke pinwheel by construction). The two `fwidth`-class drift
//     sites in the GLSL twin (the AA-edge + the structure-tensor variance) are not in this
//     single-pass procedural form (no rasterized texture), so no `fwidth` is needed here —
//     the structure tensor reads the procedural color field directly.
//
// THE OIL/VANGOGH/OIL-PASTEL STROKE CASCADE (bestOil/paintOver/StrokeProfile/relight —
// the ~38KB GLSL stroke engine) stays the WebGL2 `aurora.frag.ts` full-fidelity register
// (the GL-shader fence: aurora.frag.ts is byte-untouched). In the WGSL primary those three
// stroke mediums render the anisotropic-Kuwahara PAINTERLY finish (a real oil-paint read,
// NOT the smooth core) — so a `medium:"vangogh"`/`"oil"`/`"oil-pastel"` config on Safari 26
// paints painterly, never a silent smooth degrade (the user's mandate). The full per-dab
// Starry-Night stroke cascade remains a separate full-fidelity port.
//
// The painterly scalars (uStrokeAmount/uStrokeScale/uStrokeAnisotropy/uCanvasGrain/uWetEdge/
// uGranulation/uBrokenColor + the Kuwahara radius/sectors/q) ride the appended scalars4/
// scalars5/kuwahara struct lanes — written in LOCKSTEP by packAuroraWGPUUniforms (the
// typed-struct discipline; a one-sided add reds the parity-ΔE).

export const AURORA_MEDIUMS_WGSL = /* wgsl */ `
// ── Painterly luma + medium scalar accessors ───────────────────────────────
const W_LUMA: vec3<f32> = vec3<f32>(0.2126, 0.7152, 0.0722);

fn mStrokeAmount() -> f32 { return u.scalars4.x; }
fn mStrokeScale() -> f32 { return u.scalars4.y; }
fn mStrokeAnisotropy() -> f32 { return u.scalars4.z; }
fn mCanvasGrain() -> f32 { return u.scalars4.w; }
fn mWetEdge() -> f32 { return u.scalars5.x; }
fn mGranulation() -> f32 { return u.scalars5.y; }
fn mBrokenColor() -> f32 { return u.scalars5.z; }
fn mKuwaharaQ() -> f32 { return u.scalars5.w; }
fn mKuwaharaRadius() -> f32 { return u.kuwahara.x; }
// The metal-medium knobs ride the free cursor.z/.w pad lanes
// (uniformBridgeWGPU packs them; written 0 on a non-metal config → no-op). These read
// the IN-STRUCT cursor — the metal light is cursor-synthesized so it crosses to WGSL
// (a phantom uLightDir read would be flat on the primary; uLightDir is fragment-only).
fn mMetalPolish() -> f32 { return u.cursor.z; }
fn mMetalHeightScale() -> f32 { return u.cursor.w; }

// ── Gradient pack (the WGSL twin) ──────────────────────────────────────────
// structureTensorField re-plumbs its already-computed luma gradient (Gx,Gy) out
// through the return value's .w lane so the metal medium pays ZERO extra taps. 12 bits per
// bounded component ([-4,4]) fit into one f32; the crayon/kuwahara callers read only .xy/.z.
fn packGrad(gx: f32, gy: f32) -> f32 {
  let qx = floor(clamp(gx * 0.125 + 0.5, 0.0, 1.0) * 4095.0);
  let qy = floor(clamp(gy * 0.125 + 0.5, 0.0, 1.0) * 4095.0);
  return qx + qy * 4096.0;
}
fn unpackGrad(packed: f32) -> vec2<f32> {
  let qy = floor(packed * (1.0 / 4096.0));
  let qx = packed - qy * 4096.0;
  return (vec2<f32>(qx, qy) * (1.0 / 4095.0) - 0.5) * 8.0;
}

// ── Base color re-sample (the edge-mask operator the mediums Sobel/sector-sample) ──
// The WGSL twin of mediums.glsl.ts sampleBase: warp -> nuclei field -> palette -> value.
fn sampleBase(p: vec2<f32>, t: f32) -> vec3<f32> {
  let pw = domainWarp(p, t);
  let nf = nucleiField(pw, t);
  var c = samplePalette(nf.paletteId);
  c = c * (1.0 + u.scalars0.z * nf.valueMod);
  return c;
}

// ── Broken color (hue + chroma jitter at constant OKLCh L) ──────────────────
fn brokenColorJitter(c: vec3<f32>, hueSeed: f32, valueSeed: f32, strength: f32) -> vec3<f32> {
  let amt = clamp(mBrokenColor() * strength, 0.0, 1.0);
  if (amt <= 0.001) { return c; }
  var lch = oklabToOklch(linOklab(c));
  lch.z = lch.z + (hueSeed - 0.5) * (32.0 * PI / 180.0) * amt;
  lch.y = max(lch.y * (1.0 + (valueSeed - 0.5) * 0.28 * amt), 0.0);
  return max(oklabToLinearSrgb(oklchToOklab(lch)), vec3<f32>(0.0));
}

// ── Structure tensor / edge-tangent flow (the WGSL twin) ───────────────────
// Returns vec4(tangent.x, tangent.y, A, packGrad(Gx,Gy)) — the minor-eigenvector
// edge-tangent + coherence + the metal medium's packed gradient. The .xy/.z
// crayon/kuwahara callers are byte-unchanged.
fn structureTensorField(p: vec2<f32>, t: f32, fallbackDir: vec2<f32>) -> vec4<f32> {
  let e = 0.0035;
  let l00 = dot(sampleBase(p + vec2<f32>(-e, -e), t), W_LUMA);
  let l10 = dot(sampleBase(p + vec2<f32>(0.0, -e), t), W_LUMA);
  let l20 = dot(sampleBase(p + vec2<f32>( e, -e), t), W_LUMA);
  let l01 = dot(sampleBase(p + vec2<f32>(-e, 0.0), t), W_LUMA);
  let l21 = dot(sampleBase(p + vec2<f32>( e, 0.0), t), W_LUMA);
  let l02 = dot(sampleBase(p + vec2<f32>(-e, e), t), W_LUMA);
  let l12 = dot(sampleBase(p + vec2<f32>(0.0, e), t), W_LUMA);
  let l22 = dot(sampleBase(p + vec2<f32>( e, e), t), W_LUMA);
  let Gx = (l20 + 2.0 * l21 + l22) - (l00 + 2.0 * l01 + l02);
  let Gy = (l02 + 2.0 * l12 + l22) - (l00 + 2.0 * l10 + l20);
  let Jxx = Gx * Gx;
  let Jyy = Gy * Gy;
  let Jxy = Gx * Gy;
  let tr = Jxx + Jyy;
  let disc = sqrt(max((Jxx - Jyy) * (Jxx - Jyy) + 4.0 * Jxy * Jxy, 0.0));
  let lambdaMaj = 0.5 * (tr + disc);
  let lambdaMin = 0.5 * (tr - disc);
  var tangent: vec2<f32>;
  if (disc < 1e-7) {
    tangent = fallbackDir;
  } else {
    let theta = 0.5 * atan2(2.0 * Jxy, Jxx - Jyy);
    tangent = vec2<f32>(-sin(theta), cos(theta));
  }
  var A = (lambdaMaj - lambdaMin) / (lambdaMaj + lambdaMin + 1e-6);
  A = clamp(A, 0.0, 1.0);
  if (dot(tangent, fallbackDir) < 0.0) { tangent = -tangent; }
  let blendW = pow(A, 0.28);
  let dir = normalize(mix(fallbackDir, tangent, blendW) + vec2<f32>(1e-6, 1e-6));
  return vec4<f32>(dir, A, packGrad(Gx, Gy));
}

// ── Flow field (the WGSL twin — the simple flow seed the medium fallback dirs use) ──
fn flowField(p: vec2<f32>, t: f32) -> vec2<f32> {
  // Curl-noise-driven swirl (the medium-default dir; the full radial/swirl/diagonal
  // dispatch rides uniforms the WGSL struct does not carry — the procedural mediums
  // use this multi/curl seed as the fallback the structure tensor relaxes toward).
  let n = fbm(p * 2.0 + vec2<f32>(t * 0.02, t * 0.02));
  let a = n * 6.2831853;
  var dir = vec2<f32>(cos(a), sin(a));
  // Cursor swirl bias (matches the GLSL flow cursor term — the steady attraction).
  let cursorStrength = u.scalars3.y;
  let cursorRadius = u.scalars3.z;
  let cursor = u.cursor.xy;
  if (cursorStrength > 0.001) {
    let toCur = cursor - p;
    let d = length(toCur);
    let r = max(cursorRadius, 0.01);
    let w = exp(-(d * d) / (r * r * 0.5));
    let tangent = vec2<f32>(-toCur.y, toCur.x) / max(d, 1e-4);
    let a0 = atan2(dir.y, dir.x);
    let a1 = atan2(tangent.y, tangent.x);
    var da = a1 - a0;
    da = atan2(sin(da), cos(da));
    let aa = a0 + da * w * cursorStrength;
    dir = vec2<f32>(cos(aa), sin(aa));
  }
  return dir;
}

// ── Watercolor — wet-edge cauliflowers + granulation + wash banding ─────────
fn mediumWatercolor(col0: vec3<f32>, p: vec2<f32>, t: f32) -> vec3<f32> {
  var col = col0;
  let eps = 0.004;
  let cx1 = sampleBase(p + vec2<f32>(eps, 0.0), t);
  let cx2 = sampleBase(p - vec2<f32>(eps, 0.0), t);
  let cy1 = sampleBase(p + vec2<f32>(0.0, eps), t);
  let cy2 = sampleBase(p - vec2<f32>(0.0, eps), t);
  let gx = dot(cx1 - cx2, W_LUMA);
  let gy = dot(cy1 - cy2, W_LUMA);
  let edge = sqrt(gx * gx + gy * gy) / (2.0 * eps);
  let mask = smoothstep(0.0, 2.5, edge);
  col = col * mix(1.0, 0.78, mask * mWetEdge());

  let paper = 0.5 * vnoise(p * 160.0) + 0.5 * vnoise(p * 360.0);
  let pigLoad = 1.0 - dot(col, W_LUMA);
  col = col * (1.0 - mGranulation() * pigLoad * (paper - 0.5));

  let band = fbm(vec2<f32>(p.x * 1.5, p.y * 0.4));
  col = col * (1.0 + 0.04 * (band - 0.5));
  return col;
}

// ── Pastel — anisotropic stroke noise along the flow + tooth grain ──────────
fn mediumPastel(col0: vec3<f32>, p: vec2<f32>, t: f32) -> vec3<f32> {
  var col = col0;
  let flow = flowField(p, t);
  let perp = vec2<f32>(-flow.y, flow.x);
  let strokeScale = mStrokeScale();
  let along = dot(p, flow) * strokeScale;
  var across = dot(p, perp) * strokeScale;
  across = across + 0.03 * (vnoise(p * 260.0) - 0.5);

  let aniso = mix(1.0, 0.18, mStrokeAnisotropy());
  let stroke = fbm(vec2<f32>(along * aniso, across));
  col = col * mix(1.0, 0.82 + 0.32 * stroke, mStrokeAmount());

  let tooth = vnoise(p * 800.0);
  col = col * (1.0 - 0.08 * mStrokeAmount() * (tooth - 0.5));
  return col;
}

// ── Crayon — DRY wax pigment on paper tooth (the tooth-multiply + scumble) ──
fn mediumCrayon(col0: vec3<f32>, p: vec2<f32>, t: f32) -> vec3<f32> {
  let flow = structureTensorField(p, t, flowField(p, t)).xy;
  let ang = atan2(flow.y, flow.x);
  let ca = cos(-ang);
  let sa = sin(-ang);
  let pr = vec2<f32>(p.x * ca - p.y * sa, p.x * sa + p.y * ca);

  let aniso = mix(0.45, 0.95, mStrokeAnisotropy());
  let scale = max(mStrokeScale() * 1.6, 180.0);

  let t1 = vnoise(vec2<f32>(pr.x * scale * aniso, pr.y * scale));
  let t2 = vnoise(vec2<f32>(pr.x * scale * aniso * 0.4, pr.y * scale * 0.4) + vec2<f32>(11.0, 11.0));
  let t3 = vnoise(vec2<f32>(pr.x * scale * aniso * 2.1, pr.y * scale * 2.1) + vec2<f32>(23.0, 23.0));
  let tooth = 0.55 * t1 + 0.30 * t2 + 0.15 * t3;

  let pressure = clamp(mStrokeAmount(), 0.0, 1.0);
  let bite = mix(0.18, 0.46, pressure);
  var result = col0 * (1.0 - bite * (0.5 - tooth));

  let scumbleMask = smoothstep(0.42, 0.78, vnoise(vec2<f32>(pr.x * scale * 0.55, pr.y * scale * 0.22) + vec2<f32>(7.0, 7.0)));
  let scumbleCoverage = scumbleMask * pressure * 0.7;
  let paper = col0 * mix(0.80, 0.94, pressure);
  result = mix(paper, result, scumbleCoverage);

  let pigmentCell = floor(pr * max(scale * 0.18, 32.0));
  let pigmentMask = smoothstep(0.28, 0.82, vnoise(pr * scale * 0.21 + vec2<f32>(19.0, 19.0)));
  result = brokenColorJitter(
    result,
    hash21(pigmentCell + vec2<f32>(17.0, 17.0)),
    hash21(pigmentCell * 2.1 + vec2<f32>(31.0, 31.0)),
    0.45 + 0.55 * pigmentMask
  );

  result = saturate3(result, 1.08);
  return result;
}

// ── Kuwahara — the SOFT anisotropic generalized Kuwahara painterly finish ────
// THE KEYSTONE (Kyprianidis 2010). Aurora is a PROCEDURAL field (no input texture) so the
// operator runs over sampleBase directly: an elliptical kernel oriented along the structure
// tensor (elongated along the edge-tangent, narrowed across by the anisotropy), 8 OVERLAPPING
// sectors via SMOOTH gaussian-angular weights, blended by 1/(1+var^q) (the SOFT criterion →
// no 8-spoke pinwheel by construction). 4 rings × 8 angular taps = 32 procedural samples.
fn mediumKuwahara(col0: vec3<f32>, p: vec2<f32>, t: f32) -> vec3<f32> {
  let stf = structureTensorField(p, t, flowField(p, t));
  let tangent = stf.xy;
  let A = stf.z;
  // The studio knob drives the patch radius; clamp into the procedural patch band.
  let radius = clamp(mKuwaharaRadius() + mStrokeScale() * 0.00018, 0.006, 0.024);
  let aniso = mix(1.0, 0.34, clamp(A, 0.0, 1.0));
  let ax = tangent;
  let ay = vec2<f32>(-tangent.y, tangent.x);

  // Per-sector weighted sums (8 sectors). WGSL has no runtime-indexed local arrays of
  // vectors as cleanly as GLSL, so unroll the sector accumulators explicitly.
  var mSum: array<vec3<f32>, 8>;
  var sSum: array<vec3<f32>, 8>;
  var wSum: array<f32, 8>;
  for (var i = 0; i < 8; i = i + 1) {
    mSum[i] = vec3<f32>(0.0);
    sSum[i] = vec3<f32>(0.0);
    wSum[i] = 0.0;
  }

  let RINGS = 4;
  let TAPS = 8;
  for (var r = 1; r <= RINGS; r = r + 1) {
    let rr = f32(r) / f32(RINGS);
    let radial = 1.0 - 0.6 * rr;
    for (var a = 0; a < TAPS; a = a + 1) {
      let ang = 6.2831853 * f32(a) / f32(TAPS);
      let dirE = ax * cos(ang) + ay * (sin(ang) * aniso);
      let off = dirE * (radius * rr);
      let c = sampleBase(p + off, t);
      for (var k = 0; k < 8; k = k + 1) {
        let sectorAng = 6.2831853 * f32(k) / 8.0;
        var d = ang - sectorAng;
        d = atan2(sin(d), cos(d));
        let sw = exp(-d * d * 2.2) * radial;
        mSum[k] = mSum[k] + c * sw;
        sSum[k] = sSum[k] + c * c * sw;
        wSum[k] = wSum[k] + sw;
      }
    }
  }

  let q = max(mKuwaharaQ(), 1.0);
  var accum = vec3<f32>(0.0);
  var accumW = 0.0;
  for (var k = 0; k < 8; k = k + 1) {
    let wk = max(wSum[k], 1e-4);
    let mean = mSum[k] / wk;
    let var3 = max(sSum[k] / wk - mean * mean, vec3<f32>(0.0));
    let variance = dot(var3, W_LUMA);
    let sectorW = 1.0 / (1.0 + pow(variance * 320.0, q));
    accum = accum + mean * sectorW;
    accumW = accumW + sectorW;
  }
  var result = accum / max(accumW, 1e-4);

  // Anchor in near-flat zones so the smoothing only bites at edges.
  let center = sampleBase(p, t);
  result = mix(center, result, clamp(0.35 + 0.65 * A, 0.0, 1.0));

  // Faint canvas tooth + pigment-saturation so the flattened patches read as oil paint.
  let tooth = vnoise(p * 300.0) - 0.5;
  result = result * (1.0 + tooth * 0.06 * mCanvasGrain());
  result = saturate3(result, 1.04);

  return mix(col0, result, clamp(mStrokeAmount(), 0.0, 1.0));
}

// ── Metal — the two-term anisotropic BRDF (uMedium==8/9; the WGSL twin) ──────
// The field re-lights as warm folded metal: the luma HEIGHT field (the packed
// structure-tensor gradient → the surface normal) catches an anisotropic Blinn streak
// (brushed metal, running ALONG the coherent edge-tangent) plus a sharp crest, both
// raked by the IN-STRUCT cursor-synth light (crosses to WGSL — never uLightDir). The
// catch is the achromatic-warm anchor (never a cold chrome-blue). ZERO extra taps —
// the gradient is unpacked from the tensor's .w lane the caller already computed.
const METAL_CATCH_WARM: vec3<f32> = vec3<f32>(1.0, 0.97, 0.90);
const METAL_HEIGHT_SCALE: f32 = 2.2;
const METAL_LIGHT_Z: f32 = 0.55;
const METAL_IDLE_RAKE: vec2<f32> = vec2<f32>(0.32, 0.34);
const METAL_SHININESS_ANISO: f32 = 6.0;
const METAL_SHININESS_CREST: f32 = 40.0;
const METAL_COHERENCE_FLOOR: f32 = 0.22;
const METAL_BODY_FLOOR: f32 = 0.42;
const METAL_GRADIENT_FLATTEN: f32 = 0.55;
const METAL_SPARKLE_DENSITY: f32 = 240.0;
const METAL_SPARKLE_THRESH: f32 = 0.72;
const METAL_SPARKLE_AMP: f32 = 0.6;

fn metalShade(baseCol: vec3<f32>, p: vec2<f32>, stf: vec4<f32>) -> vec3<f32> {
  let tangent = stf.xy;
  let A = stf.z;
  let grad = unpackGrad(stf.w);
  let N = normalize(vec3<f32>(grad * (METAL_HEIGHT_SCALE * mMetalHeightScale()), 1.0));
  let V = vec3<f32>(0.0, 0.0, 1.0);
  // Cursor-synth rake light (u.cursor is in-struct — crosses to WGSL).
  let L = normalize(vec3<f32>((u.cursor.xy - p) + METAL_IDLE_RAKE, METAL_LIGHT_Z));
  let H = normalize(L + V);
  // Anisotropic streak — brushed metal along the edge-tangent.
  let tH = dot(normalize(tangent), H.xy);
  let sinTH = sqrt(clamp(1.0 - tH * tH, 0.0, 1.0));
  let streak = pow(clamp(sinTH, 0.0, 1.0), METAL_SHININESS_ANISO);
  let crest = pow(clamp(dot(N, H), 0.0, 1.0), METAL_SHININESS_CREST);
  var spec = streak * crest;
  spec = spec * smoothstep(0.0, METAL_COHERENCE_FLOOR, A);
  // Technicolor valley base — the body keeps the FIELD hue; luma rides the relief.
  let diff = clamp(dot(N, L), 0.0, 1.0);
  let body = baseCol * (METAL_BODY_FLOOR + (1.0 - METAL_BODY_FLOOR) * diff);
  return body + METAL_CATCH_WARM * (spec * clamp(mMetalPolish(), 0.0, 4.0));
}

fn mediumMetal(col: vec3<f32>, p: vec2<f32>, t: f32) -> vec3<f32> {
  let stf = structureTensorField(p, t, flowField(p, t));
  return metalShade(col, p, stf);
}

// metal-gradient (uMedium==9) — the SAME BRDF over a pre-flattened base + the
// twinkle-in-place flake sparkle (position FIXED per cell, phase-animated, facing-gated).
fn mediumMetalGradient(col: vec3<f32>, p: vec2<f32>, t: f32) -> vec3<f32> {
  let stf = structureTensorField(p, t, flowField(p, t));
  let flat = mix(col, vec3<f32>(dot(col, W_LUMA)), METAL_GRADIENT_FLATTEN);
  var metal = metalShade(flat, p, stf);
  let grad = unpackGrad(stf.w);
  let facing = normalize(vec3<f32>(grad * (METAL_HEIGHT_SCALE * mMetalHeightScale()), 1.0)).z;
  let cell = floor(p * METAL_SPARKLE_DENSITY);
  let seed = hash21(cell);
  let tw = pow(clamp(sin(t + seed * 6.2831853), 0.0, 1.0), 40.0);
  let flakeGate = step(METAL_SPARKLE_THRESH, seed);
  metal = metal + METAL_CATCH_WARM * (tw * flakeGate * clamp(facing, 0.0, 1.0) * METAL_SPARKLE_AMP);
  return metal;
}

// ── Medium dispatch (the WGSL twin of the GLSL main() if-ladder) ────────────
// uMedium: 0 smooth · 1 pastel · 2 watercolor · 3 oil · 4 crayon · 5 vangogh ·
// 6 oil-pastel · 7 kuwahara · 8 metal · 9 metal-gradient. The cheap peer mediums
// (pastel/watercolor/crayon) + kuwahara + metal port their own bodies; the
// oil/vangogh/oil-pastel STROKE cascade renders the anisotropic-Kuwahara PAINTERLY
// finish here (a real oil-paint read, never the smooth core — the "NO FALLBACKS on
// Safari" mandate; the full per-dab Starry-Night stroke WGSL remains a separate
// full-fidelity port).
fn applyMedium(col: vec3<f32>, p: vec2<f32>, t: f32) -> vec3<f32> {
  let medium = u.ints1.x;
  if (medium == 1) { return mediumPastel(col, p, t); }
  if (medium == 2) { return mediumWatercolor(col, p, t); }
  if (medium == 4) { return mediumCrayon(col, p, t); }
  // Metal uses both renderer paths; a fragment-only implementation is invisible on the
  // WGSL primary. IDs 8 and 9 select metal and metal-gradient respectively.
  if (medium == 8) { return mediumMetal(col, p, t); }
  if (medium == 9) { return mediumMetalGradient(col, p, t); }
  // oil(3), vangogh(5), oil-pastel(6), kuwahara(7) all render the painterly
  // anisotropic-Kuwahara finish on the WGSL primary (the WebGL2 fallback carries the
  // full per-dab stroke cascade for oil/vangogh/oil-pastel).
  if (medium == 3 || medium == 5 || medium == 6 || medium == 7) {
    return mediumKuwahara(col, p, t);
  }
  return col;
}
`;
