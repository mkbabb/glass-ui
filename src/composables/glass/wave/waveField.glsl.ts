// The shared traveling-wave cell-warp chunk, GLSL twin.
//
// The GLSL string the host shader splices (`${WAVE_FIELD_GLSL}`) AFTER it has defined its
// noise basis (`valueNoise`, `potentialFBM`) AND spliced the shared `curlFBM` (flow.glsl.ts).
// Transcribes `waveField.ts` line-for-line; shared numeric vectors round-trip the JS↔GLSL↔WGSL
// numeric identity at a fixed sample set. NO value.js, no uniforms — a pure string chunk.
//
// THE DEPENDENCY contract (the splice-order law): the chunk calls `curlFBM(vec2)` and
// `valueNoise(float,float)` the host MUST define BEFORE this splice. The host owns the noise
// basis + the curl operator (basis-agnostic); this chunk owns the cell-twist + the height
// field math only.

export const WAVE_FIELD_GLSL = /* glsl */ `
#ifndef WAVE_FIELD_TAU
#define WAVE_FIELD_TAU 6.283185307179586
#endif

// The traveling-wave envelope — a moving Gaussian crest band sweeping along waveDir.
float travelingEnvelope(vec2 pivot, float t, vec2 waveDir, float waveK, float waveOmega, float waveSigma) {
  float coord = dot(pivot, waveDir) * waveK - t * waveOmega;
  float crest = fract(coord / WAVE_FIELD_TAU);
  float z = (crest - 0.5) * 2.0;
  return exp(-(z * z) / max(waveSigma, 1e-3));
}

// The curl-direction scalar — the smooth low-freq director the per-cell twist follows.
float curlScalar(vec2 cc, float t) {
  vec2 f = curlFBM(vec2(cc.x * 0.5 + t * 0.08, cc.y * 0.5 - t * 0.06));
  return clamp(f.x, -1.0, 1.0);
}

// The directed-twist FLOOR (the visibility cure): keep the curl SIGN (adjacent cells lean
// together) but floor the magnitude so a crest-band cell ALWAYS rotates decisively.
#ifndef WAVE_FIELD_TWIST_FLOOR
#define WAVE_FIELD_TWIST_FLOOR 0.62
#endif
float directedTwist(float s, float floorMag) {
  float mag = max(floorMag, abs(s));
  float sgn = tanh(s * 6.0);
  return sgn * mag;
}

// ── The FACE leaf (the structurally-absent RE-INVENT — height-lit filled cell interior) ──
// Defined ABOVE cellTwist: cellTwist rides cellHeight via the driver so twist + face read ONE
// envelope.

// The sheet displacement at a cell center = the EXACT traveling-wave scalar the twist rides.
float cellHeight(vec2 cc, float t, vec2 waveDir, float waveK, float waveOmega, float waveSigma, float amp) {
  return travelingEnvelope(cc, t, waveDir, waveK, waveOmega, waveSigma) * amp;
}

// The pre-twist driver (FOLD A): the cell pivot cc + the crest envelope env the twist AND the
// face both ride. The face samples height/relief at THIS pre-twist cc (floor(twisted_g) at the
// crest lights a neighbouring cell). cc is in .xy and env in .z.
vec3 cellDriver(vec2 g, float cellSize, float t, vec2 waveDir, float waveK, float waveOmega,
                float waveSigma, float amp) {
  float cs = max(cellSize, 1e-3);
  vec2 cc = (floor(g / cs) + 0.5) * cs;
  float env = cellHeight(cc, t, waveDir, waveK, waveOmega, waveSigma, amp);
  return vec3(cc, env);
}

// The central-difference slope of cellHeight across a cell (eps = 0.5·cellSize) — derivative-
// FREE (NO dFdx on the height) → Safari WebGL2-safe. Returns ∇H.
vec2 faceRelief(vec2 cc, float cellSize, float t, vec2 waveDir, float waveK, float waveOmega,
                float waveSigma, float amp) {
  float eps = max(cellSize, 1e-3) * 0.5;
  float hxp = cellHeight(cc + vec2(eps, 0.0), t, waveDir, waveK, waveOmega, waveSigma, amp);
  float hxm = cellHeight(cc - vec2(eps, 0.0), t, waveDir, waveK, waveOmega, waveSigma, amp);
  float hyp = cellHeight(cc + vec2(0.0, eps), t, waveDir, waveK, waveOmega, waveSigma, amp);
  float hym = cellHeight(cc - vec2(0.0, eps), t, waveDir, waveK, waveOmega, waveSigma, amp);
  return vec2((hxp - hxm) / (2.0 * eps), (hyp - hym) / (2.0 * eps));
}

// Soft inset-square coverage inside a (warped) cell — the filled FACE plateau. d is the distance
// into the cell from the nearest gutter (the Golus triangle-wave); the inset retreats as it grows
// (the squash). aa = the shader's fwidth(g) (JS passes a fixed uvDeriv).
float facePlateau(vec2 g, float inset, vec2 uvDeriv) {
  vec2 tri = 1.0 - abs(fract(g) * 2.0 - 1.0);
  float d = min(tri.x, tri.y);
  float aa = max(uvDeriv.x, uvDeriv.y) * 1.5;
  return smoothstep(inset, inset + 2.0 * aa, d);
}

// The cell-local twist about each cell's own center, gated by the traveling wave + directed
// by the curl flow. amp is the spring-eased envelope amplitude the JS host drives. FOLD C: the
// TWIST_FLOOR is crest-gated by env so OFF-crest cells relax to flat calm paper (the traveling
// read, not static foil).
vec2 cellTwist(vec2 g, float cellSize, float t, vec2 waveDir, float waveK, float waveOmega,
               float waveSigma, float twistMax, float shearMax, float amp) {
  vec3 drv = cellDriver(g, cellSize, t, waveDir, waveK, waveOmega, waveSigma, amp);
  vec2 cc = drv.xy;
  float env = drv.z;
  float floorMag = WAVE_FIELD_TWIST_FLOOR * env;   // FOLD C: crest-gated floor
  float theta = twistMax * env * directedTwist(curlScalar(cc, t), floorMag);
  float shear = shearMax * env * directedTwist(curlScalar(cc + vec2(17.3, 9.1), t), floorMag);
  vec2 local = g - cc;
  float ct = cos(theta);
  float st = sin(theta);
  vec2 rot = vec2(ct * local.x - st * local.y, st * local.x + ct * local.y);
  rot.x += shear * rot.y;   // a small skew so the box MORPHS, not just rotates
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
vec2 waveFlow(vec2 g, float t, vec2 waveDir, float waveK, float waveOmega, float waveSigma,
              float twistMax, float amp, float warpFreq) {
  float env = travelingEnvelope(g, t, waveDir, waveK, waveOmega, waveSigma) * amp;
  vec2 f = curlFBM(vec2(g.x * warpFreq + t * 0.05, g.y * warpFreq - t * 0.04));
  float wf2 = warpFreq * 1.833333;
  vec2 f2 = curlFBM(vec2(g.x * wf2 - t * 0.03, g.y * wf2 + t * 0.035));
  float k = twistMax * env;
  return g + (f + f2 * 0.5) * k;
}

// The local cursor swirl — the finger twists the cells around it (re-aimed cursorBulge).
vec2 cursorSwirl(vec2 g, vec2 cursor, float strength, float radius) {
  vec2 to = g - cursor;
  float d2 = dot(to, to);
  float r = max(radius, 1e-4);
  float theta = strength * exp(-d2 / (2.0 * r * r));
  float ct = cos(theta);
  float st = sin(theta);
  return cursor + vec2(ct * to.x - st * to.y, st * to.x + ct * to.y);
}

// The LOW-octave value-noise topography — the scalar field concentric extracts contours of.
float heightField(vec2 p, float octavesF, float seed) {
  float v = 0.0;
  float amp = 0.5;
  float freq = 1.0;
  float px = p.x + seed;
  float py = p.y - seed;
  int n = int(clamp(octavesF, 1.0, 6.0));
  for (int i = 0; i < 6; i++) {
    if (i >= n) break;
    v += amp * valueNoise(px * freq, py * freq);
    float rx = 0.8 * px - 0.6 * py;
    float ry = 0.6 * px + 0.8 * py;
    px = rx;
    py = ry;
    freq *= 2.0;
    amp *= 0.5;
  }
  return v;
}

// The ω=√(g·k) breathing swell — basins inflate/deflate with weight.
float waveSwell(float t, float phase) {
  return sin(t * 0.35 + phase) * 0.5 + sin(t * 0.21 + phase * 1.7) * 0.5;
}
`;
