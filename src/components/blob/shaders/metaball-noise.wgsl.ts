// Goo-blob metaball noise and FBM helper chunk, carved out of
// `metaball.wgsl.ts` to hold the no-god-module line bound (the AURORA_MEDIUMS /
// procedural-color.wgsl shared-chunk precedent — a cohesive WGSL helper block
// SPLICED back via `${METABALL_NOISE_WGSL}`, the ASSEMBLED shader byte-equivalent).
//
// The blob-LOCAL 3D-p3 hash + the IQ analytic-derivative gradient noise + the
// (warped) FBM with its analytic gradient. It references — as bare identifiers
// resolved at the ASSEMBLED-shader level — `FBM_ROT` (the rotation matrix declared
// by the `${FBM_ROT_WGSL}` splice metaball.wgsl.ts places IMMEDIATELY BEFORE this
// chunk) and the `FBM_LACUNARITY`/`FBM_GAIN` consts at the top of metaball.wgsl.ts.
// It carries NO `${...}` splice of its own (so the device-free WGSL assembler
// resolves `${METABALL_NOISE_WGSL}` to a complete body.
// W7), and it is spliced BEFORE the full-screen-triangle vertex stage (the fixed
// ASSEMBLED body order — the FIELD helpers precede the vertex stage).

export const METABALL_NOISE_WGSL = /* wgsl */ `
const FBM_LACUNARITY: f32 = 1.8;
const FBM_GAIN: f32 = 0.42;

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
`;
