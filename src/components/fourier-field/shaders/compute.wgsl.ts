// The partial-sum and epicycle-chain compute kernel.
//
// One `@compute @workgroup_size(64)` kernel over two output storage buffers:
//   • `curveSamples[i]` — the comet body: the partial-sum curve point at
//     `t_i = fract(head_t − trailArc · i/(M−1))`, truncated to N terms, with the per-sample
//     AGE in `.z` (0 = oldest tail, 1 = head).
//   • `chainTips[k]` — the running tip of term k stacked on the last at `head_t`, for
//     k = 0..N. The tip after term (k−1) IS the partial sum over the first k terms, so one
//     evaluator serves both buffers.
//
// Both are pure `f(coefficients, head_t, N)` and every loop bound is the uploaded array's
// own length. There is NO ceiling constant in this file, which is the point: `N` truncates
// the table, and the table is whatever the mint emitted.

export const FOURIER_FIELD_COMPUTE_WGSL = /* wgsl */ `
const TAU: f32 = 6.283185307179586;

struct Phasor {
  // (re, im, index, _pad)
  data: vec4<f32>,
};

struct ComputeUniforms {
  // c0: (headT, trailArc, _pad, _pad)
  c0: vec4<f32>,
  // ints: (harmonicN, sampleCount, termCount, _pad)
  ints: vec4<i32>,
};

@group(0) @binding(0) var<uniform> u: ComputeUniforms;
@group(0) @binding(1) var<storage, read> phasors: array<Phasor>;
// curveSamples[i] = (x, y, age, _pad) in MODEL space
@group(0) @binding(2) var<storage, read_write> curveSamples: array<vec4<f32>>;
// chainTips[k] = (x, y, _pad, _pad) in MODEL space
@group(0) @binding(3) var<storage, read_write> chainTips: array<vec4<f32>>;

// The truncated inverse DFT at parameter t over the first n terms — the transcription of
// math.ts partialSumAt:  c += vec2(re*cos - im*sin, re*sin + im*cos), angle = TAU*index*t.
fn partialSumAt(t: f32, n: i32) -> vec2<f32> {
  var c = vec2<f32>(0.0, 0.0);
  let lim = min(n, i32(arrayLength(&phasors)));
  for (var i = 0; i < lim; i = i + 1) {
    let p = phasors[i].data;
    let angle = TAU * p.z * t;
    let cs = cos(angle);
    let sn = sin(angle);
    c = c + vec2<f32>(p.x * cs - p.y * sn, p.x * sn + p.y * cs);
  }
  return c;
}

@compute @workgroup_size(64)
fn cs_main(@builtin(global_invocation_id) gid: vec3<u32>) {
  let i = i32(gid.x);
  let headT = u.c0.x;
  let trailArc = u.c0.y;
  let harmonicN = u.ints.x;
  let sampleCount = u.ints.y;

  // ── The comet body ──
  if (i < sampleCount) {
    let denom = max(f32(sampleCount - 1), 1.0);
    let frac = f32(i) / denom;                  // 0 = head, 1 = tail
    let age = 1.0 - frac;                       // 1 = head, 0 = tail
    var t = headT - trailArc * frac;
    t = t - floor(t);                           // fract -> [0,1)
    let pt = partialSumAt(t, harmonicN);
    curveSamples[i] = vec4<f32>(pt.x, pt.y, age, 0.0);
  }

  // ── The chain tips (k = 0..N). chainTips[0] is the origin. ──
  if (i <= harmonicN && i < i32(arrayLength(&chainTips))) {
    let tip = partialSumAt(headT, i);
    chainTips[i] = vec4<f32>(tip.x, tip.y, 0.0, 0.0);
  }
}
`;
