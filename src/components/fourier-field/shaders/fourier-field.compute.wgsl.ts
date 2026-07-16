// Partial-sum and epicycle-chain compute kernel (WebGPU primary).
//
// A `@compute @workgroup_size(64)` kernel over TWO output storage buffers:
//   • `curveSamples[i]` — the comet body: the partial-sum curve point at
//     `t_i = fract(head_t − trailArc · i/(M−1))`, truncated to N harmonics, with the
//     per-sample AGE in `.z` (0 = oldest tail, 1 = head) for the render's per-fragment fade.
//   • `chainTips[k]` — the epicycle chain: the running tip of phasor k stacked on the last
//     at `head_t` (`positionsAt`), for k = 0..N.
//
// Both are pure `f(coefficients, head_t, N)` — deterministic; `head_t` arrives as a uniform
// from the ONE keyframes.js clock. The summation is the WGSL transcription of `math.ts`:
//   `partialSumAt` (math.ts:78-95) ── `epicycleChainTip` here transcribes `positionsAt`
//   (math.ts:41-60). The spectrum is CPU-minted
//   (`makeEllipticSpectrum`/`dftFromPoints` run once in JS);
//   the WGSL only SUMS the per-frame phasor table — NO WGSL-side spectrum mint.

export const FOURIER_FIELD_COMPUTE_WGSL = /* wgsl */ `
const MAX_PHASORS: i32 = 64;
const TAU: f32 = 6.283185307179586;

struct Phasor {
  // (re, im, index, _pad)
  data: vec4<f32>,
};

// ── Compute uniforms (the typed-struct source-of-truth — see uniformBridgeWGPU.ts) ──
struct ComputeUniforms {
  // c0: (headT, trailArc, _pad, _pad)
  c0: vec4<f32>,
  // ints: (harmonicN, epicycleArmN, sampleCount, phasorCount)
  ints: vec4<i32>,
};

@group(0) @binding(0) var<uniform> u: ComputeUniforms;
@group(0) @binding(1) var<storage, read> phasors: array<Phasor>;
// curveSamples[i] = (x, y, age, _pad)
@group(0) @binding(2) var<storage, read_write> curveSamples: array<vec4<f32>>;
// chainTips[k] = (x, y, _pad, _pad) — the running tip after stacking phasor k
@group(0) @binding(3) var<storage, read_write> chainTips: array<vec4<f32>>;

// The PARTIAL-SUM curve point at parameter t over the first n phasors — the WGSL
// transcription of math.ts:78-95 (partialSumAt). EXACTLY:
//   c += vec2(re·cos − im·sin, re·sin + im·cos)  with angle = TAU·index·t.
fn partialSumAt(t: f32, n: i32) -> vec2<f32> {
  var c = vec2<f32>(0.0, 0.0);
  let phasorCount = u.ints.w;
  let lim = min(n, phasorCount);
  for (var i = 0; i < MAX_PHASORS; i = i + 1) {
    if (i >= lim) { break; }
    let p = phasors[i].data;
    let re = p.x;
    let im = p.y;
    let index = p.z;
    let angle = TAU * index * t;
    let cs = cos(angle);
    let sn = sin(angle);
    c = c + vec2<f32>(re * cs - im * sn, re * sn + im * cs);
  }
  return c;
}

// The epicycle chain tip after stacking the first k phasors at head_t — the WGSL
// transcription of math.ts:41-60 (positionsAt, read at the running tip). The running tip
// after phasor (k−1) is exactly the partial sum over the first k terms.
fn epicycleChainTip(t: f32, k: i32) -> vec2<f32> {
  return partialSumAt(t, k);
}

@compute @workgroup_size(64)
fn cs_main(@builtin(global_invocation_id) gid: vec3<u32>) {
  let i = i32(gid.x);
  let headT = u.c0.x;
  let trailArc = u.c0.y;
  let harmonicN = u.ints.x;
  let armN = u.ints.y;
  let sampleCount = u.ints.z;

  // ── The comet body samples ──
  if (i < sampleCount) {
    // age: 0 at the oldest tail (i = sampleCount−1), 1 at the head (i = 0).
    let denom = max(f32(sampleCount - 1), 1.0);
    let frac = f32(i) / denom;                 // 0 = head, 1 = tail
    let age = 1.0 - frac;                       // 1 = head, 0 = tail
    // sample back along the period from the head by trailArc.
    var t = headT - trailArc * frac;
    t = t - floor(t);                           // fract → [0,1)
    let pt = partialSumAt(t, harmonicN);
    curveSamples[i] = vec4<f32>(pt.x, pt.y, age, 0.0);
  }

  // ── The epicycle chain tips (k = 0..armN, capped to harmonicN) ──
  // chainTips[0] is the origin; chainTips[k] is the tip after phasor (k−1).
  let armLim = min(armN, harmonicN);
  if (i <= armLim && i <= MAX_PHASORS) {
    let tip = epicycleChainTip(headT, i);
    chainTips[i] = vec4<f32>(tip.x, tip.y, 0.0, 0.0);
  }
}
`;
