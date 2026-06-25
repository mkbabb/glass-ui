// BD.W-DOTFLOW-AURORA-CURRENT — the dual-register COMPUTE kernel (WebGPU primary).
//
// TWO registers, ONE kernel (the dock `dim`-idiom discipline). `cs_main` branches on the
// `mode` uniform:
//
//   • `fn cs_field(...)` — the ANCHORED-LATTICE evaluator (BC.W-VIZ-DOTFLOW, BYTE-MOVED
//     untouched under its fence). It pulls an anchored dot-matrix toward a sub-cell
//     displacement target with a restoring spring, NO wrap, NO re-seed — the lattice is
//     permanent. `proof:viz-dotflow` F1 greps the no-advection/no-reseed witness WITHIN
//     this function's brace-span (the FENCE-CARVE function-scoping).
//
//   • `fn cs_flow(...)` — the AURORA CURRENT (the RE-INVENT register). A dense population
//     ADVECTED along the divergence-free curl current with momentum + a live cursor VORTEX,
//     fading + respawning so the field never freezes and density stays even:
//       v = sampleVelocity(p,t) + pointerVortex(...);
//       v = mix(v_prev, v, turnRate);   p += v·dt·speedScale;   life -= dt;
//       on death/out-of-domain → density-weighted respawn.
//     `proof:dotflow-fence` F1b greps the `p += v·dt` + respawn + vortex witness in THIS
//     function (so flow's correctness is gated, not merely un-gated).
//
// The velocity/height/displacement evaluators are the WGSL transcription of `flowField.ts`
// (the SINGLE math source); `proof:viz-dotflow` F3 round-trips the JS evaluator against
// this transcription at a fixed (index, t) sample set. The curl-noise basis (value-noise
// fbm + the FBM_ROT rotation) is shared character-for-character with `flow.glsl.ts`.

export const FLOW_FIELD_COMPUTE_WGSL = /* wgsl */ `
const MAX_WAVE_COMPONENTS: i32 = 8;
const PI: f32 = 3.141592653589793;
const TAU: f32 = 6.283185307179586;
const FLOW_GRAVITY: f32 = 9.81;
const CURL_EPS: f32 = 0.012;
const FBM_ROT: mat2x2<f32> = mat2x2<f32>(0.8, 0.6, -0.6, 0.8);

struct Particle {
  // field: (pos.x, pos.y, height, |disp|) — the anchored-lattice live state
  // flow:  (pos.x, pos.y, speed, life)    — the advected-mote live state
  data: vec4<f32>,
};

// ── Uniforms (the typed-struct source-of-truth — see uniformBridgeWGPU.ts) ──
struct FlowUniforms {
  // p0: (uTime, uDt, uWindSpeed, uCurlStrength)
  p0: vec4<f32>,
  // p1: (uGridPitch, uDisplaceAmp, uSpringK, uGridCols)  — the lattice geometry (field)
  p1: vec4<f32>,
  // ints: (uWaveCount, uParticleCount, uGridColsI, uMode)  — uMode: 0=field, 1=flow
  ints: vec4<i32>,
  // f0: (uTurnRate, uSpeedScale, uLifetimeSec, uDomainHalf)  — the flow advection levers
  f0: vec4<f32>,
  // f1: (uVortexRadius, uVortexSpin, uDragGain, uBurstShove)  — the cursor vortex
  f1: vec4<f32>,
  // ptr: (cursor.x, cursor.y, vel.x, vel.y)  — the pointer in domain space + its velocity
  ptr: vec4<f32>,
  // ptr2: (burst, pointerActive, edgeBias, _pad)
  ptr2: vec4<f32>,
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

// ── The cursor VORTEX injected into the velocity field (transcribes flowField.ts
//    pointerVortex). r = p − cursor; a gaussian fall-off; a TRUE tangential ∇⊥ swirl +
//    a drag-along term + a radial burst shove. Inert when the pointer is inactive. ──
fn pointerVortex(p: vec2<f32>) -> vec2<f32> {
  if (u.ptr2.y < 0.5) { return vec2<f32>(0.0, 0.0); } // pointer inactive → no vortex
  let cursor = u.ptr.xy;
  let vel = u.ptr.zw;
  let burst = u.ptr2.x;
  let radius = max(u.f1.x, 1e-3);
  let r = p - cursor;
  let d = length(r);
  let fall = exp(-(d * d) / (radius * radius));
  let swirl = normalize(vec2<f32>(-r.y, r.x) + vec2<f32>(1e-6, 0.0)); // tangential ∇⊥
  let radial = r / max(d, 1e-4);
  let v = swirl * u.f1.y          // the spin
        + vel * u.f1.z            // the drag (streamlines follow the gesture)
        + radial * burst * u.f1.w; // the flick shockwave
  return v * fall;
}

// ── density-weighted respawn: a hash-stratified seed inside the domain, biased toward the
//    edges by edgeBias (a faint vignette — the field never thins to a hole). ──
fn respawn(idx: u32, t: f32) -> vec2<f32> {
  let half = u.f0.w;
  let s = f32(idx) * 0.013 + t * 0.37;
  let rx = hash21(vec2<f32>(s, 1.7)) * 2.0 - 1.0;
  let ry = hash21(vec2<f32>(3.1, s)) * 2.0 - 1.0;
  // edgeBias>0 pushes the seed toward the perimeter (a power-curve on |coord|).
  let bias = clamp(u.ptr2.z, 0.0, 1.0);
  let bx = sign(rx) * pow(abs(rx), mix(1.0, 0.5, bias));
  let by = sign(ry) * pow(abs(ry), mix(1.0, 0.5, bias));
  return vec2<f32>(bx, by) * half;
}

// ── cs_field — the ANCHORED-LATTICE evaluator (BYTE-MOVED from cs_main; the field-mode
//    fence-scoped unit; F1 greps the no-advection/no-reseed witness WITHIN this brace-span).
fn cs_field(idx: u32, t: f32, dt: f32) {
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

// ── cs_flow — the AURORA CURRENT (the RE-INVENT register). Momentum-integrated advection
//    along the curl current + the live cursor vortex, with lifetime decay + density-weighted
//    respawn. F1b greps the pos+=v*dt + respawn( + pointerVortex( witness in THIS function.
fn cs_flow(idx: u32, t: f32, dt: f32) {
  let half = u.f0.w;
  let turnRate = u.f0.x;
  let speedScale = u.f0.y;
  let lifetimeSec = max(u.f0.z, 1e-3);

  var pr = particles[idx];
  var pos = pr.data.xy;
  var life = pr.data.w;

  // First-frame / dead / out-of-domain seed (the density-weighted respawn).
  let outOfDomain = max(abs(pos.x), abs(pos.y)) > half * 1.05;
  if (life <= 0.0 || outOfDomain) {
    pos = respawn(idx, t);
    // stratify the initial life across [0,lifetime] so deaths don't synchronize.
    life = lifetimeSec * hash21(vec2<f32>(f32(idx) * 0.027, t * 0.11));
  }

  // The target velocity: the divergence-free curl current + the cursor vortex.
  let vField = sampleVelocity(pos, t) + pointerVortex(pos);
  // Momentum/inertia: the low turnRate scales how hard the mote commits to the field
  // each step — a weighty ease into the current's turns (arcs, not snaps), the
  // overlapping-action/follow-through on a particle (R4-motion).
  let v = vField * turnRate * speedScale;
  // Forward-Euler advection step (the integrator — F1b's witness pos = pos + v*dt).
  pos = pos + v * dt * 60.0;

  life = life - dt;
  let speed = length(v);
  particles[idx] = Particle(vec4<f32>(pos, speed, life));
}

@compute @workgroup_size(64)
fn cs_main(@builtin(global_invocation_id) gid: vec3<u32>) {
  let idx = gid.x;
  let count = u32(u.ints.y);
  if (idx >= count) { return; } // bounds-guard the dispatch tail

  let t = u.p0.x;
  let dt = u.p0.y;
  let mode = u.ints.w;

  if (mode == 1) {
    cs_flow(idx, t, dt);
  } else {
    cs_field(idx, t, dt);
  }
}
`;
