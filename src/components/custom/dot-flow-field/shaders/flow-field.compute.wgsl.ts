// BC.W-VIZ-DOTFLOW — the ANCHORED-LATTICE displacement COMPUTE kernel (WebGPU primary).
//
// THE RETOPOLOGY (the gestalt fix). The kernel no longer ADVECTS a free particle cloud
// (the "mess of noise"); it pulls an ANCHORED DOT-MATRIX toward a sub-cell displacement
// target with a restoring spring, NO wrap, NO re-seed — the lattice is permanent. Each
// invocation: derives its lattice ORIGIN `o = gridOrigin(idx, cols, pitch)`, samples the
// sub-cell displacement `disp = sampleDisplacement(o, t)`, eases its live position toward
// `o + disp·displaceAmp` (the framerate-independent critically-damped `mix(p, target,
// 1 - exp(-springK·dt))`), samples the scalar Gerstner HEIGHT `h = sampleHeight(o, t)`
// (the brightness driver — the moving sweeping band), and stores `vec4(p.xy, h, |disp|)`.
//
// The velocity/height/displacement evaluators are the WGSL transcription of `flowField.ts`
// (the SINGLE math source); `proof:viz-dotflow` clause F3 round-trips the JS evaluator
// against this transcription at a fixed (index, t) sample set. The curl-noise basis
// (value-noise fbm + the FBM_ROT rotation) is shared character-for-character with
// `flow.glsl.ts`'s `curlFBM` JS twin.

export const FLOW_FIELD_COMPUTE_WGSL = /* wgsl */ `
const MAX_WAVE_COMPONENTS: i32 = 8;
const PI: f32 = 3.141592653589793;
const TAU: f32 = 6.283185307179586;
const FLOW_GRAVITY: f32 = 9.81;
const CURL_EPS: f32 = 0.012;
const FBM_ROT: mat2x2<f32> = mat2x2<f32>(0.8, 0.6, -0.6, 0.8);

struct Particle {
  // (pos.x, pos.y, height, |disp|) — the anchored-lattice live state
  data: vec4<f32>,
};

// ── Uniforms (the typed-struct source-of-truth — see uniformBridgeWGPU.ts) ──
struct FlowUniforms {
  // p0: (uTime, uDt, uWindSpeed, uCurlStrength)
  p0: vec4<f32>,
  // p1: (uGridPitch, uDisplaceAmp, uSpringK, uGridCols)  — the lattice geometry
  p1: vec4<f32>,
  // ints: (uWaveCount, uParticleCount, uGridColsI, _pad)
  ints: vec4<i32>,
  // each wave row: (amplitude, wavelength, directionDeg, phase)
  waves: array<vec4<f32>, 8>,
};

@group(0) @binding(0) var<uniform> u: FlowUniforms;
@group(0) @binding(1) var<storage, read_write> particles: array<Particle>;

// ── The deterministic lattice origin (transcribes flowField.ts gridOrigin) ──
fn gridOrigin(index: u32, cols: i32, pitch: f32) -> vec2<f32> {
  let c = max(cols, 1);
  let col = i32(index) % c;
  let row = i32(index) / c;
  let half = f32(c - 1) * pitch * 0.5;
  return vec2<f32>(f32(col) * pitch - half, f32(row) * pitch - half);
}

// ── The Gerstner-sum analytic ∇⊥h velocity (transcribes flowField.ts gerstnerVelocity) ──
fn gerstnerVelocity(p: vec2<f32>, t: f32) -> vec2<f32> {
  var dhdx = 0.0;
  var dhdy = 0.0;
  let windSpeed = u.p0.z;
  let waveCount = u.ints.x;
  for (var i = 0; i < MAX_WAVE_COMPONENTS; i = i + 1) {
    if (i >= waveCount) { break; }
    let w = u.waves[i];
    let amplitude = w.x;
    let wavelength = max(w.y, 1e-4);
    let dirRad = w.z * PI / 180.0;
    let phase = w.w;
    let k = TAU / wavelength;
    let d = vec2<f32>(cos(dirRad), sin(dirRad));
    let omega = sqrt(FLOW_GRAVITY * k) * windSpeed;
    let theta = k * (d.x * p.x + d.y * p.y) - omega * t + phase;
    let akc = amplitude * k * cos(theta);
    dhdx = dhdx + akc * d.x;
    dhdy = dhdy + akc * d.y;
  }
  // v = ∇⊥h = (∂h/∂y, −∂h/∂x).
  return vec2<f32>(dhdy, -dhdx);
}

// ── The scalar Gerstner HEIGHT (transcribes flowField.ts sampleHeight — the brightness
//    driver, normalized to ≈[-1,1] by the total amplitude so the band thresholds are
//    wave-table-independent). ──
fn sampleHeight(o: vec2<f32>, t: f32) -> f32 {
  var h = 0.0;
  var ampSum = 0.0;
  let windSpeed = u.p0.z;
  let waveCount = u.ints.x;
  for (var i = 0; i < MAX_WAVE_COMPONENTS; i = i + 1) {
    if (i >= waveCount) { break; }
    let w = u.waves[i];
    let k = TAU / max(w.y, 1e-4);
    let dirRad = w.z * PI / 180.0;
    let d = vec2<f32>(cos(dirRad), sin(dirRad));
    let omega = sqrt(FLOW_GRAVITY * k) * windSpeed;
    let theta = k * (d.x * o.x + d.y * o.y) - omega * t + w.w;
    h = h + w.x * sin(theta);
    ampSum = ampSum + abs(w.x);
  }
  return h / max(ampSum, 1e-4);
}

// ── Shared curl-noise basis (the WGSL twin of flow.glsl.ts curlFBM) ──
fn hash21(p: vec2<f32>) -> f32 {
  var p3 = fract(vec3<f32>(p.x, p.y, p.x) * 0.1031);
  p3 = p3 + dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

fn valueNoise(p: vec2<f32>) -> f32 {
  let i = floor(p);
  let f = fract(p);
  let u2 = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  let a = hash21(i + vec2<f32>(0.0, 0.0));
  let b = hash21(i + vec2<f32>(1.0, 0.0));
  let c = hash21(i + vec2<f32>(0.0, 1.0));
  let d = hash21(i + vec2<f32>(1.0, 1.0));
  return mix(mix(a, b, u2.x), mix(c, d, u2.x), u2.y);
}

fn potentialFBM(p0: vec2<f32>) -> f32 {
  var v = 0.0;
  var amp = 0.5;
  var freq = 1.0;
  var p = p0;
  for (var i = 0; i < 3; i = i + 1) {
    v = v + amp * valueNoise(p * freq);
    p = FBM_ROT * p;
    freq = freq * 2.0;
    amp = amp * 0.5;
  }
  return v;
}

fn curlFBM(p: vec2<f32>) -> vec2<f32> {
  let dx = potentialFBM(p + vec2<f32>(CURL_EPS, 0.0)) - potentialFBM(p - vec2<f32>(CURL_EPS, 0.0));
  let dy = potentialFBM(p + vec2<f32>(0.0, CURL_EPS)) - potentialFBM(p - vec2<f32>(0.0, CURL_EPS));
  let g = vec2<f32>(dx, dy) / (2.0 * CURL_EPS);
  return vec2<f32>(g.y, -g.x);
}

// The composite flow velocity (transcribes flowField.ts sampleVelocity EXACTLY — the
// coarse ×0.55 curl domain-scale, the §3.2 inversion).
fn sampleVelocity(p: vec2<f32>, t: f32) -> vec2<f32> {
  let curlStrength = u.p0.w;
  var v = gerstnerVelocity(p, t);
  if (curlStrength > 0.0) {
    let c = curlFBM(vec2<f32>(p.x * 0.55 + t * 0.15, p.y * 0.55));
    v = v + c * curlStrength;
  }
  return v;
}

// The sub-cell DISPLACEMENT (transcribes flowField.ts sampleDisplacement — ∇⊥h + the
// coarse curl break, soft-clamped through tanh so the magnitude rides into [0,1)).
fn sampleDisplacement(o: vec2<f32>, t: f32) -> vec2<f32> {
  let v = sampleVelocity(o, t);
  let mag = length(v);
  if (mag < 1e-5) { return vec2<f32>(0.0, 0.0); }
  let bounded = tanh(mag);
  return v * (bounded / mag);
}

@compute @workgroup_size(64)
fn cs_main(@builtin(global_invocation_id) gid: vec3<u32>) {
  let idx = gid.x;
  let count = u32(u.ints.y);
  if (idx >= count) { return; } // bounds-guard the dispatch tail

  let t = u.p0.x;
  let dt = u.p0.y;
  let pitch = u.p1.x;
  let displaceAmp = u.p1.y;
  let springK = u.p1.z;
  let cols = u.ints.z;

  // The PERMANENT anchor — no wrap, no re-seed (the coherence fix).
  let o = gridOrigin(idx, cols, pitch);
  let disp = sampleDisplacement(o, t);
  let anchorTarget = o + disp * (displaceAmp * pitch);

  var pr = particles[idx];
  var pos = pr.data.xy;
  // Framerate-independent critically-damped pull-to-anchor:
  //   p ← mix(p, anchorTarget, 1 - exp(-springK·dt))  (the GPGPU influence-pull pattern).
  let k = 1.0 - exp(-springK * dt);
  pos = mix(pos, anchorTarget, k);

  let h = sampleHeight(o, t);
  particles[idx] = Particle(vec4<f32>(pos, h, length(disp)));
}
`;
