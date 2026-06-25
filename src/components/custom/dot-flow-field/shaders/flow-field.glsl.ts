// BD.W-DOTFLOW-AURORA-CURRENT — the WebGL2 channel (the LIVE path on most hosts: the picker
// falls to webgl2 even where navigator.gpu is present). TWO registers:
//
//   • `field` (mode 0): a pure WebGL2 fullscreen-fragment dot-lattice + brightness shader
//     (`FLOW_FIELD_FRAG_GLSL`, BC.W-VIZ-DOTFLOW — KEPT untouched). For each pixel it finds
//     the nearest lattice cell, draws the soft circle, and lights it by the SAME
//     `flowField.ts` height (`waveBand(sampleHeight(o,t))·contrast`) + the optional globe.
//
//   • `flow` (mode 1): the AURORA CURRENT, made real + measurable + equal-gestalt — a
//     state-texture GPGPU ping-pong (`FLOW_FIELD_STATE_GLSL`: particle state advected in a
//     fragment pass, one texel per mote, RGBA = pos.x/pos.y/speed/life) → a point-sprite
//     mote draw (`FLOW_FIELD_POINT_*`) into a two-FBO RGBA16F feedback-fade TRAIL ping-pong
//     (`FLOW_FIELD_TRAIL_*` decay-quad, additive motes) → a present blit
//     (`FLOW_FIELD_PRESENT_*`). The SAME advected-population gestalt as the WGPU compute
//     path (not a fragment-LIC compromise). The state texture falls RGBA32F→RGBA16F→packed
//     where the float-render extension is absent (R-A/R-C); the trail is pinned NEAREST.
//
// Both registers splice the SHARED `procedural-color.glsl.ts` OKLCh chunk (the ONE color
// seam → no WGSL↔GLSL drift). The `FLOW_FIELD_FRAG_GLSL` mandate is RETIRED in favour of
// the `FLOW_FIELD_STATE_GLSL` GPGPU export (proof:dotflow-fence F4).

import {
    OETF_GLSL,
    OKLCH_MATRICES_GLSL,
} from "../../../../composables/glass/webgl/shaders/procedural-color.glsl";

/** The full-screen-triangle vertex shader (the substrate's standard fullscreen pass). */
export const FLOW_FIELD_VERT_GLSL = /* glsl */ `#version 300 es
precision highp float;
in vec2 aPosition;
out vec2 vUv;
void main() {
  vUv = aPosition;            // [-1,1]² domain
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`;

/** The dot-lattice + sweeping-brightness fragment source (the anchored-grid model). */
export const FLOW_FIELD_FRAG_GLSL = /* glsl */ `#version 300 es
precision highp float;

#define PI 3.141592653589793
#define TAU 6.283185307179586
#define FLOW_GRAVITY 9.81
#define CURL_EPS 0.012
#define MAX_WAVE_COMPONENTS 8
#define MAX_FLOW_STOPS 4

in vec2 vUv;
out vec4 fragColor;

uniform float uTime;
uniform float uWindSpeed;
uniform float uCurlStrength;
uniform float uDomainHalf;
uniform float uAspect;
uniform float uGridPitchDomain;  // lattice pitch in DOMAIN units
uniform float uDotRadiusDomain;  // dot radius in DOMAIN units
uniform float uDisplaceAmp;      // sub-cell drift in pitch fractions
uniform float uContrast;
uniform float uBaseBright;
uniform float uWaveBandCenter;
uniform float uWaveBandWidth;
uniform float uGlobeMask;
uniform int   uWaveCount;
uniform int   uStopCount;
uniform float uHasBackground;
uniform vec3  uBg;
uniform vec4  uWaves[MAX_WAVE_COMPONENTS];   // (amplitude, wavelength, directionDeg, phase)
uniform vec3  uPalette[MAX_FLOW_STOPS];      // linear-sRGB stops

const mat2 FBM_ROT = mat2(0.8, 0.6, -0.6, 0.8);

${OETF_GLSL}
${OKLCH_MATRICES_GLSL}

// ── The Gerstner-sum analytic ∇⊥h velocity (transcribes flowField.ts gerstnerVelocity) ──
vec2 gerstnerVelocity(vec2 p, float t) {
  float dhdx = 0.0;
  float dhdy = 0.0;
  for (int i = 0; i < MAX_WAVE_COMPONENTS; i++) {
    if (i >= uWaveCount) break;
    vec4 w = uWaves[i];
    float k = TAU / max(w.y, 1e-4);
    float dirRad = w.z * PI / 180.0;
    vec2 d = vec2(cos(dirRad), sin(dirRad));
    float omega = sqrt(FLOW_GRAVITY * k) * uWindSpeed;
    float theta = k * (d.x * p.x + d.y * p.y) - omega * t + w.w;
    float akc = w.x * k * cos(theta);
    dhdx += akc * d.x;
    dhdy += akc * d.y;
  }
  return vec2(dhdy, -dhdx);
}

// ── The scalar Gerstner HEIGHT (transcribes flowField.ts sampleHeight) ──
float sampleHeight(vec2 o, float t) {
  float h = 0.0;
  float ampSum = 0.0;
  for (int i = 0; i < MAX_WAVE_COMPONENTS; i++) {
    if (i >= uWaveCount) break;
    vec4 w = uWaves[i];
    float k = TAU / max(w.y, 1e-4);
    float dirRad = w.z * PI / 180.0;
    vec2 d = vec2(cos(dirRad), sin(dirRad));
    float omega = sqrt(FLOW_GRAVITY * k) * uWindSpeed;
    float theta = k * (d.x * o.x + d.y * o.y) - omega * t + w.w;
    h += w.x * sin(theta);
    ampSum += abs(w.x);
  }
  return h / max(ampSum, 1e-4);
}

// ── Shared curl-noise basis (the GLSL twin of flow.glsl.ts curlFBM) ──
float hash21(vec2 p) {
  vec3 p3 = fract(vec3(p.x, p.y, p.x) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
float valueNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u2 = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  float a = hash21(i + vec2(0.0, 0.0));
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u2.x), mix(c, d, u2.x), u2.y);
}
float potentialFBM(vec2 p0) {
  float v = 0.0;
  float amp = 0.5;
  float freq = 1.0;
  vec2 p = p0;
  for (int i = 0; i < 3; i++) {
    v += amp * valueNoise(p * freq);
    p = FBM_ROT * p;
    freq *= 2.0;
    amp *= 0.5;
  }
  return v;
}
vec2 curlFBM(vec2 p) {
  float dx = potentialFBM(p + vec2(CURL_EPS, 0.0)) - potentialFBM(p - vec2(CURL_EPS, 0.0));
  float dy = potentialFBM(p + vec2(0.0, CURL_EPS)) - potentialFBM(p - vec2(0.0, CURL_EPS));
  vec2 g = vec2(dx, dy) / (2.0 * CURL_EPS);
  return vec2(g.y, -g.x);
}
vec2 sampleVelocity(vec2 p, float t) {
  vec2 v = gerstnerVelocity(p, t);
  if (uCurlStrength > 0.0) {
    vec2 c = curlFBM(vec2(p.x * 0.55 + t * 0.15, p.y * 0.55));
    v += c * uCurlStrength;
  }
  return v;
}
// sub-cell displacement (transcribes flowField.ts sampleDisplacement — tanh soft-clamp).
vec2 sampleDisplacement(vec2 o, float t) {
  vec2 v = sampleVelocity(o, t);
  float mag = length(v);
  if (mag < 1e-5) return vec2(0.0);
  return v * (tanh(mag) / mag);
}

// The sweeping bright-stripe band (transcribes flowField.ts waveBand).
float waveBand(float h, float center, float width) {
  float w = max(width, 1e-3);
  float d = abs(h - center);
  return 1.0 - smoothstep(0.0, w, d);
}

// The optional soft-disc globe mask (the reference's two-sphere composition).
float globeMask(vec2 o, float t, float on) {
  if (on <= 0.5) return 1.0;
  float cx = 0.35 * sin(t * 0.13);
  float cy = 0.28 * cos(t * 0.11);
  float d = length(o - vec2(cx, cy));
  return 1.0 - smoothstep(0.45, 0.75, d);
}

vec3 samplePaletteLin(float t) {
  if (uStopCount <= 1) return uPalette[0];
  float n = float(uStopCount);
  float ft = clamp(t, 0.0, 1.0) * (n - 1.0);
  int i0 = int(floor(ft));
  int i1 = min(i0 + 1, uStopCount - 1);
  float f = ft - float(i0);
  vec3 lmsA = LINEAR_SRGB_TO_LMS * uPalette[i0];
  vec3 lmsB = LINEAR_SRGB_TO_LMS * uPalette[i1];
  vec3 labA = LMS_TO_OKLAB * (sign(lmsA) * pow(abs(lmsA), vec3(1.0 / 3.0)));
  vec3 labB = LMS_TO_OKLAB * (sign(lmsB) * pow(abs(lmsB), vec3(1.0 / 3.0)));
  return oklabToLinearSrgb(mix(labA, labB, f));
}

void main() {
  float aspect = max(uAspect, 1e-4);
  // Domain-space pixel (aspect-corrected x so the lattice stays square).
  vec2 p = vec2(vUv.x * aspect, vUv.y);
  float pitch = max(uGridPitchDomain, 1e-3);

  // The nearest lattice cell ORIGIN (the anchored grid — the deterministic gridOrigin
  // mapping, evaluated per-pixel: round p/pitch to the nearest cell center).
  vec2 cell = floor(p / pitch + 0.5);
  vec2 o = cell * pitch;

  // The dot DRIFTS toward o + disp·displaceAmp·pitch (the same sub-cell offset the
  // compute kernel writes — here evaluated analytically per pixel).
  vec2 disp = sampleDisplacement(o, uTime);
  vec2 dotCenter = o + disp * (uDisplaceAmp * pitch);

  // The soft circle around the (drifted) dot center.
  float dist = length(p - dotCenter);
  float radius = max(uDotRadiusDomain, 1e-4);
  float mask = 1.0 - smoothstep(radius * 0.6, radius, dist);
  if (mask < 0.002) {
    if (uHasBackground > 0.5) {
      fragColor = vec4(clamp(linearToSrgb(uBg), vec3(0.0), vec3(1.0)), 1.0);
    } else {
      fragColor = vec4(0.0);
    }
    return;
  }

  // The brightness lights the dot — the SWEEPING band over the height at the anchor.
  float h = sampleHeight(o, uTime);
  float band = waveBand(h, uWaveBandCenter, uWaveBandWidth);
  float bright = (uBaseBright + band * uContrast) * globeMask(o, uTime, uGlobeMask);
  bright = clamp(bright, 0.0, 1.6);

  float tone = clamp(bright, 0.0, 1.0);
  vec3 lin = samplePaletteLin(tone) * bright;
  vec3 rgb = clamp(linearToSrgb(lin), vec3(0.0), vec3(1.0));
  float alpha = mask * clamp(bright * 0.8 + 0.12, 0.0, 1.0);

  if (uHasBackground > 0.5) {
    vec3 bg = clamp(linearToSrgb(uBg), vec3(0.0), vec3(1.0));
    fragColor = vec4(mix(bg, rgb, alpha), 1.0);
    return;
  }
  fragColor = vec4(rgb * alpha, alpha);
}`;

// ════════════════════════════════════════════════════════════════════════════════════
// BD.W-DOTFLOW-AURORA-CURRENT — the `flow` register WebGL2 channel (the LIVE path).
// ════════════════════════════════════════════════════════════════════════════════════

// The SHARED velocity-math chunk (the GLSL twin of flowField.ts sampleVelocity — Gerstner
// ∇⊥h + the coarse curl break). Transcribed not re-derived; F3 round-trips JS↔GLSL. Spliced
// into the state-advect pass (the `field` frag carries its own copy untouched for its fence).
const FLOW_VELOCITY_MATH_GLSL = /* glsl */ `
#define PI 3.141592653589793
#define TAU 6.283185307179586
#define FLOW_GRAVITY 9.81
#define CURL_EPS 0.012
#define MAX_WAVE_COMPONENTS 8
const mat2 FBM_ROT = mat2(0.8, 0.6, -0.6, 0.8);

uniform float uTime;
uniform float uWindSpeed;
uniform float uCurlStrength;
uniform int   uWaveCount;
uniform vec4  uWaves[MAX_WAVE_COMPONENTS];   // (amplitude, wavelength, directionDeg, phase)

vec2 gerstnerVelocity(vec2 p, float t) {
  float dhdx = 0.0; float dhdy = 0.0;
  for (int i = 0; i < MAX_WAVE_COMPONENTS; i++) {
    if (i >= uWaveCount) break;
    vec4 w = uWaves[i];
    float k = TAU / max(w.y, 1e-4);
    float dirRad = w.z * PI / 180.0;
    vec2 d = vec2(cos(dirRad), sin(dirRad));
    float omega = sqrt(FLOW_GRAVITY * k) * uWindSpeed;
    float theta = k * (d.x * p.x + d.y * p.y) - omega * t + w.w;
    float akc = w.x * k * cos(theta);
    dhdx += akc * d.x; dhdy += akc * d.y;
  }
  return vec2(dhdy, -dhdx);
}
float hash21f(vec2 p) {
  vec3 p3 = fract(vec3(p.x, p.y, p.x) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
float valueNoiseF(vec2 p) {
  vec2 i = floor(p); vec2 f = fract(p);
  vec2 u2 = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  float a = hash21f(i + vec2(0.0, 0.0));
  float b = hash21f(i + vec2(1.0, 0.0));
  float c = hash21f(i + vec2(0.0, 1.0));
  float d = hash21f(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u2.x), mix(c, d, u2.x), u2.y);
}
float potentialFBMf(vec2 p0) {
  float v = 0.0; float amp = 0.5; float freq = 1.0; vec2 p = p0;
  for (int i = 0; i < 3; i++) { v += amp * valueNoiseF(p * freq); p = FBM_ROT * p; freq *= 2.0; amp *= 0.5; }
  return v;
}
vec2 curlFBMf(vec2 p) {
  float dx = potentialFBMf(p + vec2(CURL_EPS, 0.0)) - potentialFBMf(p - vec2(CURL_EPS, 0.0));
  float dy = potentialFBMf(p + vec2(0.0, CURL_EPS)) - potentialFBMf(p - vec2(0.0, CURL_EPS));
  vec2 g = vec2(dx, dy) / (2.0 * CURL_EPS);
  return vec2(g.y, -g.x);
}
vec2 sampleVelocityF(vec2 p, float t) {
  vec2 v = gerstnerVelocity(p, t);
  if (uCurlStrength > 0.0) { v += curlFBMf(vec2(p.x * 0.55 + t * 0.15, p.y * 0.55)) * uCurlStrength; }
  return v;
}
`;

/** The fullscreen-quad vertex pass for the GPGPU/trail passes (a [-1,1] clip quad). */
export const FLOW_FIELD_QUAD_VERT_GLSL = /* glsl */ `#version 300 es
precision highp float;
in vec2 aPosition;
out vec2 vUv;
void main() {
  vUv = aPosition * 0.5 + 0.5;   // [0,1] texel space
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`;

/**
 * The STATE-TEXTURE GPGPU advect pass (proof:dotflow-fence F4 — the GPGPU export replacing
 * the FLOW_FIELD_FRAG_GLSL mandate). One texel per mote, RGBA = (pos.x, pos.y, speed, life).
 * Each frame: read prev state, advect along the curl current + the cursor VORTEX with
 * momentum (turnRate), decrement life, density-weighted respawn on death/out-of-domain.
 * The math twin of cs_flow (WGSL) — F3 round-trips the SAME sampleVelocity.
 */
export const FLOW_FIELD_STATE_GLSL = /* glsl */ `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 fragColor;

uniform sampler2D uState;        // prev particle state (RGBA = pos.xy, speed, life)
uniform float uDt;
uniform float uDomainHalf;
uniform float uTurnRate;
uniform float uSpeedScale;
uniform float uLifetimeSec;
uniform float uEdgeBias;
uniform vec2  uCursor;           // pointer in domain space
uniform vec2  uPointerVel;       // pointer velocity (domain/s)
uniform float uBurst;            // flick-burst impulse
uniform float uPointerActive;    // 0/1
uniform float uVortexRadius;
uniform float uVortexSpin;
uniform float uDragGain;
uniform float uBurstShove;

${FLOW_VELOCITY_MATH_GLSL}

vec2 pointerVortex(vec2 p) {
  if (uPointerActive < 0.5) return vec2(0.0);
  vec2 r = p - uCursor;
  float d = length(r);
  float radius = max(uVortexRadius, 1e-3);
  float fall = exp(-(d * d) / (radius * radius));
  vec2 swirl = normalize(vec2(-r.y, r.x) + vec2(1e-6, 0.0));
  vec2 radial = r / max(d, 1e-4);
  vec2 v = swirl * uVortexSpin + uPointerVel * uDragGain + radial * uBurst * uBurstShove;
  return v * fall;
}

vec2 respawn(vec2 seed, float t) {
  float rx = hash21f(seed + vec2(t * 0.37, 1.7)) * 2.0 - 1.0;
  float ry = hash21f(seed.yx + vec2(3.1, t * 0.37)) * 2.0 - 1.0;
  float bias = clamp(uEdgeBias, 0.0, 1.0);
  float bx = sign(rx) * pow(abs(rx), mix(1.0, 0.5, bias));
  float by = sign(ry) * pow(abs(ry), mix(1.0, 0.5, bias));
  return vec2(bx, by) * uDomainHalf;
}

void main() {
  vec4 st = texture(uState, vUv);
  vec2 pos = st.xy;
  float life = st.w;
  float half = uDomainHalf;

  bool dead = life <= 0.0;
  bool outOfDomain = max(abs(pos.x), abs(pos.y)) > half * 1.05;
  if (dead || outOfDomain) {
    pos = respawn(vUv, uTime);
    life = max(uLifetimeSec, 1e-3) * hash21f(vUv * 7.0 + uTime * 0.11);
  }

  vec2 vField = sampleVelocityF(pos, uTime) + pointerVortex(pos);
  // momentum: low turnRate = weighty arcs (eases into the current's turns).
  vec2 v = vField * uTurnRate * uSpeedScale;
  // forward-Euler advection (pos = pos + v*dt — the integrand twin of cs_flow).
  pos = pos + v * uDt * 60.0;
  life = life - uDt;

  fragColor = vec4(pos, length(v), life);
}`;

/**
 * The MOTE point-sprite pass — reads the advected state texture by gl_VertexID, places a
 * point sprite at the mote, sizes/brightens/hues it by SPEED·life (the velocity-map). Drawn
 * additively into the trail FBO. The warm-fire palette is spliced via the shared color seam.
 */
export const FLOW_FIELD_POINT_VERT_GLSL = /* glsl */ `#version 300 es
precision highp float;
uniform sampler2D uState;
uniform int   uStateCols;
uniform float uDomainHalf;
uniform float uPointSize;
uniform float uSpeedNorm;     // the speed→[0,1] normalizer (modal-speed at ramp middle)
uniform float uStretchAmp;
out float vSpeedNorm;
out float vFade;
void main() {
  int id = gl_VertexID;
  int col = id % uStateCols;
  int row = id / uStateCols;
  vec2 uv = (vec2(float(col), float(row)) + 0.5) / float(uStateCols);
  vec4 st = texture(uState, uv);
  vec2 pos = st.xy;
  float speed = st.z;
  float life = st.w;
  float sn = clamp(speed / max(uSpeedNorm, 1e-4), 0.0, 1.0);
  vSpeedNorm = sn;
  vFade = clamp(life * 3.0, 0.0, 1.0);
  // NDC: domain [-half,half] → [-1,1].
  gl_Position = vec4(pos / uDomainHalf, 0.0, 1.0);
  // faster motes read as larger hot speed-cores (the cartoon "more" as point size).
  gl_PointSize = max(uPointSize * (1.0 + sn * (uStretchAmp + 1.0)), 1.0);
}`;

export const FLOW_FIELD_POINT_FRAG_GLSL = /* glsl */ `#version 300 es
precision highp float;
#define MAX_FLOW_STOPS 4
in float vSpeedNorm;
in float vFade;
out vec4 fragColor;
uniform int  uStopCount;
uniform vec3 uPalette[MAX_FLOW_STOPS];
uniform float uSpeedGlow;

${OETF_GLSL}
${OKLCH_MATRICES_GLSL}

vec3 samplePaletteLin(float t) {
  if (uStopCount <= 1) return uPalette[0];
  float n = float(uStopCount);
  float ft = clamp(t, 0.0, 1.0) * (n - 1.0);
  int i0 = int(floor(ft));
  int i1 = min(i0 + 1, uStopCount - 1);
  float f = ft - float(i0);
  vec3 lmsA = LINEAR_SRGB_TO_LMS * uPalette[i0];
  vec3 lmsB = LINEAR_SRGB_TO_LMS * uPalette[i1];
  vec3 labA = LMS_TO_OKLAB * (sign(lmsA) * pow(abs(lmsA), vec3(1.0 / 3.0)));
  vec3 labB = LMS_TO_OKLAB * (sign(lmsB) * pow(abs(lmsB), vec3(1.0 / 3.0)));
  return oklabToLinearSrgb(mix(labA, labB, f));
}

void main() {
  // soft round sprite — a tight hot core (mask² caps the white wash, H2).
  vec2 pc = gl_PointCoord * 2.0 - 1.0;
  float r = length(pc);
  float mask = 1.0 - smoothstep(0.55, 1.0, r);
  if (mask < 0.002) discard;
  float core = mask * mask;
  float bright = (0.35 + vSpeedNorm * uSpeedGlow) * vFade;
  vec3 lin = samplePaletteLin(vSpeedNorm) * bright;
  vec3 rgb = clamp(linearToSrgb(lin), vec3(0.0), vec3(1.0));
  float a = core * clamp(bright, 0.0, 1.0);
  fragColor = vec4(rgb * a, a);   // additive premultiplied (the trail braids the ribbons)
}`;

/**
 * The TRAIL decay-blit — draws the PREVIOUS trail frame back at the derived decay α (toward
 * the warm floor), so the motes drawn additively after it leave fading ribbons of light.
 * The headline gestalt lever. Pinned NEAREST (no half-float-linear extension dependency).
 */
export const FLOW_FIELD_TRAIL_FRAG_GLSL = /* glsl */ `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 fragColor;
uniform sampler2D uPrev;
uniform float uDecay;       // per-frame trail persistence (DERIVED from trailHalfLife)
void main() {
  vec4 prev = texture(uPrev, vUv);
  fragColor = prev * uDecay;  // fade toward black; the warm floor is the present-blit's
}`;

/**
 * The PRESENT blit — composites the trail buffer over the warm-near-black floor + the
 * colorful corner-bloom (the §3 colorful-field-behind-glass ground), tone-mapped so the hot
 * cores read without a white wash. The full-bleed ground is HERE, not a parallel plane.
 */
export const FLOW_FIELD_PRESENT_FRAG_GLSL = /* glsl */ `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 fragColor;
uniform sampler2D uTrail;
uniform vec3 uFloor;        // the deep warm-near-black floor (linear-sRGB)
uniform vec3 uBloomColor;   // the warm rose/magenta corner-bloom (linear-sRGB)
uniform float uHasGround;   // 0 → transparent (compose over the page field); 1 → opaque floor

${OETF_GLSL}

void main() {
  vec3 trail = texture(uTrail, vUv).rgb;
  // soft tone-map the accumulated additive trail (Reinhard — hot cores, not white wash).
  vec3 mapped = trail / (trail + vec3(0.85));
  if (uHasGround < 0.5) {
    // compose OVER the page's warm field: emit the lit ribbons premultiplied, no floor.
    vec3 rgb = clamp(linearToSrgb(mapped), vec3(0.0), vec3(1.0));
    float a = clamp(max(mapped.r, max(mapped.g, mapped.b)), 0.0, 1.0);
    fragColor = vec4(rgb * a, a);
    return;
  }
  // the corner-bloom: a faint warm rose radial in one corner (NOT teal).
  float bloom = smoothstep(1.3, 0.0, distance(vUv, vec2(0.12, 0.88)));
  vec3 floorLin = uFloor + uBloomColor * bloom * 0.5;
  vec3 lin = floorLin + mapped;             // the ribbons sit OVER the warm floor
  vec3 rgb = clamp(linearToSrgb(lin), vec3(0.0), vec3(1.0));
  fragColor = vec4(rgb, 1.0);
}`;
