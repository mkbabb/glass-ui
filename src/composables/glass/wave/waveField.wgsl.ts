// The shared traveling-wave cell-warp chunk, WGSL twin.
//
// The WGSL string the host shader splices (`${WAVE_FIELD_WGSL}`) AFTER it has defined its
// noise basis (`valueNoise`, `potentialFBM`) AND spliced the shared `curlFBM` (flow.wgsl.ts).
// Transcribes `waveField.ts` line-for-line; shared numeric vectors round-trip the JS↔GLSL↔WGSL
// numeric identity at a fixed sample set. NO value.js, no uniforms — a pure string chunk.
//
// THE DEPENDENCY contract (the splice-order law — WGSL has no forward declaration): the chunk
// calls `curlFBM(vec2f)` and `valueNoise(f32,f32)` the host MUST declare ABOVE this splice.

export const WAVE_FIELD_WGSL = /* wgsl */ `
const WAVE_FIELD_TAU: f32 = 6.283185307179586;

// The traveling-wave envelope — a moving Gaussian crest band sweeping along waveDir.
fn travelingEnvelope(pivot: vec2f, t: f32, waveDir: vec2f, waveK: f32, waveOmega: f32, waveSigma: f32) -> f32 {
  let coord = dot(pivot, waveDir) * waveK - t * waveOmega;
  let crest = fract(coord / WAVE_FIELD_TAU);
  let z = (crest - 0.5) * 2.0;
  return exp(-(z * z) / max(waveSigma, 1e-3));
}

// The curl-direction scalar — the smooth low-freq director the per-cell twist follows.
fn curlScalar(cc: vec2f, t: f32) -> f32 {
  let f = curlFBM(vec2f(cc.x * 0.5 + t * 0.08, cc.y * 0.5 - t * 0.06));
  return clamp(f.x, -1.0, 1.0);
}

// The directed-twist FLOOR (the visibility cure): keep the curl SIGN (adjacent cells lean
// together) but floor the magnitude so a crest-band cell ALWAYS rotates decisively.
const WAVE_FIELD_TWIST_FLOOR: f32 = 0.62;
fn directedTwist(s: f32, floorMag: f32) -> f32 {
  let mag = max(floorMag, abs(s));
  let sgn = tanh(s * 6.0);
  return sgn * mag;
}

// ── The FACE leaf (the structurally-absent RE-INVENT — height-lit filled cell interior) ──
// DECLARED ABOVE cellTwist (no WGSL forward declaration): cellTwist rides cellHeight via the
// driver so twist + face read ONE envelope.

// The sheet displacement at a cell center = the EXACT traveling-wave scalar the twist rides.
fn cellHeight(cc: vec2f, t: f32, waveDir: vec2f, waveK: f32, waveOmega: f32, waveSigma: f32, amp: f32) -> f32 {
  return travelingEnvelope(cc, t, waveDir, waveK, waveOmega, waveSigma) * amp;
}

// The pre-twist driver (FOLD A): the cell pivot cc + the crest envelope env the twist AND the
// face both ride. The face samples height/relief at THIS pre-twist cc (the crest twist crosses
// the cell boundary → floor(twisted_g) would light a neighbouring cell). cc is in .xy and env in .z.
fn cellDriver(g: vec2f, cellSize: f32, t: f32, waveDir: vec2f, waveK: f32, waveOmega: f32,
              waveSigma: f32, amp: f32) -> vec3f {
  let cs = max(cellSize, 1e-3);
  let cc = (floor(g / cs) + 0.5) * cs;
  let env = cellHeight(cc, t, waveDir, waveK, waveOmega, waveSigma, amp);
  return vec3f(cc, env);
}

// The central-difference slope of cellHeight across a cell (eps = 0.5·cellSize) — derivative-
// FREE (NO dFdx on the height) → Safari WebGL2-safe. Returns ∇H.
fn faceRelief(cc: vec2f, cellSize: f32, t: f32, waveDir: vec2f, waveK: f32, waveOmega: f32,
              waveSigma: f32, amp: f32) -> vec2f {
  let eps = max(cellSize, 1e-3) * 0.5;
  let hxp = cellHeight(cc + vec2f(eps, 0.0), t, waveDir, waveK, waveOmega, waveSigma, amp);
  let hxm = cellHeight(cc - vec2f(eps, 0.0), t, waveDir, waveK, waveOmega, waveSigma, amp);
  let hyp = cellHeight(cc + vec2f(0.0, eps), t, waveDir, waveK, waveOmega, waveSigma, amp);
  let hym = cellHeight(cc - vec2f(0.0, eps), t, waveDir, waveK, waveOmega, waveSigma, amp);
  return vec2f((hxp - hxm) / (2.0 * eps), (hyp - hym) / (2.0 * eps));
}

// Soft inset-square coverage inside a (warped) cell — the filled FACE plateau. d is the
// distance into the cell from the nearest gutter (the Golus triangle-wave); the inset retreats
// as it grows (the squash). aa = the shader's fwidth(g) (JS passes a fixed uvDeriv).
fn facePlateau(g: vec2f, inset: f32, uvDeriv: vec2f) -> f32 {
  let tri = 1.0 - abs(fract(g) * 2.0 - 1.0);
  let d = min(tri.x, tri.y);
  let aa = max(uvDeriv.x, uvDeriv.y) * 1.5;
  return smoothstep(inset, inset + 2.0 * aa, d);
}

// The cell-local twist about each cell's own center, gated by the traveling wave + directed
// by the curl flow. amp is the spring-eased envelope amplitude the JS host drives. FOLD C: the
// TWIST_FLOOR is crest-gated by env so OFF-crest cells relax to flat calm paper (the traveling
// read, not static foil).
fn cellTwist(g: vec2f, cellSize: f32, t: f32, waveDir: vec2f, waveK: f32, waveOmega: f32,
             waveSigma: f32, twistMax: f32, shearMax: f32, amp: f32) -> vec2f {
  let drv = cellDriver(g, cellSize, t, waveDir, waveK, waveOmega, waveSigma, amp);
  let cc = drv.xy;
  let env = drv.z;
  let floorMag = WAVE_FIELD_TWIST_FLOOR * env;   // FOLD C: crest-gated floor
  let theta = twistMax * env * directedTwist(curlScalar(cc, t), floorMag);
  let shear = shearMax * env * directedTwist(curlScalar(cc + vec2f(17.3, 9.1), t), floorMag);
  let local = g - cc;
  let ct = cos(theta);
  let st = sin(theta);
  var rot = vec2f(ct * local.x - st * local.y, st * local.x + ct * local.y);
  rot.x = rot.x + shear * rot.y;   // a small skew so the box MORPHS, not just rotates
  return cc + rot;
}

// The CONTINUOUS traveling-wave FLOW warp — the SMOOTH twin of cellTwist (no per-cell seam;
// for the level-set contours that shatter into a mesh under the cell discontinuity).
// warpFreq is the host-supplied curl-sampling spatial frequency (the caller's
// own coordinate units): an order of magnitude BELOW its grid frequency so the warp is locally
// affine (major lines bow as one smooth curve, no sub-cell crackle). LiquidGrid (cell-scale g0)
// passes ~0.03; concentric (unit-scale p) passes 0.6. The 1.833333 second-flow ratio transcribes
// WAVE_FLOW_SECOND_RATIO. Amplitude unchanged — curl magnitude is the intrinsic gradient at the
// fixed CURL_EPS, independent of warpFreq; the t-drift is host-agnostic.
fn waveFlow(g: vec2f, t: f32, waveDir: vec2f, waveK: f32, waveOmega: f32, waveSigma: f32,
            twistMax: f32, amp: f32, warpFreq: f32) -> vec2f {
  let env = travelingEnvelope(g, t, waveDir, waveK, waveOmega, waveSigma) * amp;
  let f = curlFBM(vec2f(g.x * warpFreq + t * 0.05, g.y * warpFreq - t * 0.04));
  let wf2 = warpFreq * 1.833333;
  let f2 = curlFBM(vec2f(g.x * wf2 - t * 0.03, g.y * wf2 + t * 0.035));
  let k = twistMax * env;
  return g + (f + f2 * 0.5) * k;
}

// The local cursor swirl — the finger twists the cells around it (re-aimed cursorBulge).
fn cursorSwirl(g: vec2f, cursor: vec2f, strength: f32, radius: f32) -> vec2f {
  let to = g - cursor;
  let d2 = dot(to, to);
  let r = max(radius, 1e-4);
  let theta = strength * exp(-d2 / (2.0 * r * r));
  let ct = cos(theta);
  let st = sin(theta);
  return cursor + vec2f(ct * to.x - st * to.y, st * to.x + ct * to.y);
}

// The LOW-octave value-noise topography — the scalar field concentric extracts contours of.
fn heightField(p: vec2f, octavesF: f32, seed: f32) -> f32 {
  var v = 0.0;
  var amp = 0.5;
  var freq = 1.0;
  var px = p.x + seed;
  var py = p.y - seed;
  let n = i32(clamp(octavesF, 1.0, 6.0));
  for (var i = 0; i < 6; i = i + 1) {
    if (i >= n) { break; }
    v = v + amp * valueNoise(px * freq, py * freq);
    let rx = 0.8 * px - 0.6 * py;
    let ry = 0.6 * px + 0.8 * py;
    px = rx;
    py = ry;
    freq = freq * 2.0;
    amp = amp * 0.5;
  }
  return v;
}

// The ω=√(g·k) breathing swell — basins inflate/deflate with weight.
fn waveSwell(t: f32, phase: f32) -> f32 {
  return sin(t * 0.35 + phase) * 0.5 + sin(t * 0.21 + phase * 1.7) * 0.5;
}
`;
