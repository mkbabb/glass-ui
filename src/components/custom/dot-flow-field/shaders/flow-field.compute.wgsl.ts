// BB.W-VIZ-SUITE (W-FLOWFIELD) — the curl-noise advection COMPUTE kernel (WebGPU primary).
//
// A `@compute @workgroup_size(64)` kernel over the particle storage buffer. Each
// invocation reads its particle, evaluates `v(p,t) = ∇⊥ψ(p,t)` ANALYTICALLY from the
// uniform wave-component table (the Gerstner sum) + the shared `curlFBM` curl-noise
// term, integrates one forward-Euler step, wraps/re-seeds at the domain edge, and writes
// back. The velocity evaluator is the WGSL transcription of `flowField.ts`'s
// `sampleVelocity()` — the SINGLE math source; `proof:flow-field` clause 3 round-trips
// the JS evaluator against this transcription at a fixed sample set.
//
// The wave-component table (A_i, λ_i, dir_i, φ_i for ≤ MAX_WAVE_COMPONENTS) + dt + time +
// windSpeed + curlStrength ride a uniform buffer (the typed-struct source-of-truth in
// `uniformBridgeWGPU.ts`, explicit vec4-lane packing so the array stride is the natural
// 16 bytes — no std140 stride trap). The curl-noise basis (value-noise fbm + the FBM_ROT
// rotation) is shared character-for-character with `flow.glsl.ts`'s `curlFBM` JS twin.

export const FLOW_FIELD_COMPUTE_WGSL = /* wgsl */ `
const MAX_WAVE_COMPONENTS: i32 = 8;
const PI: f32 = 3.141592653589793;
const TAU: f32 = 6.283185307179586;
const FLOW_GRAVITY: f32 = 9.81;
const CURL_EPS: f32 = 0.012;
const FBM_ROT: mat2x2<f32> = mat2x2<f32>(0.8, 0.6, -0.6, 0.8);

struct Particle {
  // (pos.x, pos.y, age, seed)
  data: vec4<f32>,
};

// ── Uniforms (the typed-struct source-of-truth — see uniformBridgeWGPU.ts) ──
struct FlowUniforms {
  // p0: (uTime, uDt, uWindSpeed, uCurlStrength)
  p0: vec4<f32>,
  // p1: (uDomainHalf, uReseedJitter, _pad, _pad)
  p1: vec4<f32>,
  // ints: (uWaveCount, uParticleCount, _pad, _pad)
  ints: vec4<i32>,
  // each wave row: (amplitude, wavelength, directionDeg, phase)
  waves: array<vec4<f32>, 8>,
};

@group(0) @binding(0) var<uniform> u: FlowUniforms;
@group(0) @binding(1) var<storage, read_write> particles: array<Particle>;

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

// The composite flow velocity (transcribes flowField.ts sampleVelocity EXACTLY).
fn sampleVelocity(p: vec2<f32>, t: f32) -> vec2<f32> {
  let curlStrength = u.p0.w;
  var v = gerstnerVelocity(p, t);
  if (curlStrength > 0.0) {
    let c = curlFBM(vec2<f32>(p.x * 1.7 + t * 0.15, p.y * 1.7));
    v = v + c * curlStrength;
  }
  return v;
}

// A particle that leaves the bounds re-spawns at a seed-derived position (so coverage
// stays steady — the §3 re-seed-at-edge rule). The seed advances each re-spawn so a
// re-seeded particle does not pile on the previous spawn.
fn reseed(seed: f32, age: f32) -> vec2<f32> {
  let half = u.p1.x;
  let r1 = hash21(vec2<f32>(seed * 71.13, age * 13.7));
  let r2 = hash21(vec2<f32>(seed * 19.31 + 4.0, age * 7.3 + 2.0));
  return (vec2<f32>(r1, r2) * 2.0 - 1.0) * half;
}

@compute @workgroup_size(64)
fn cs_main(@builtin(global_invocation_id) gid: vec3<u32>) {
  let idx = gid.x;
  let count = u32(u.ints.y);
  if (idx >= count) { return; } // bounds-guard the dispatch tail

  let t = u.p0.x;
  let dt = u.p0.y;
  let half = u.p1.x;

  var pr = particles[idx];
  var pos = pr.data.xy;
  var age = pr.data.z;
  let seed = pr.data.w;

  let v = sampleVelocity(pos, t);
  // Forward Euler — p_{n+1} = p_n + v·dt.
  pos = pos + v * dt;
  age = age + dt;

  // Wrap / re-seed at the domain edge (re-spawn from the seed at a fresh position).
  if (abs(pos.x) > half || abs(pos.y) > half || age > 6.0) {
    pos = reseed(seed, age);
    age = 0.0;
  }

  particles[idx] = Particle(vec4<f32>(pos, age, seed));
}
`;
