// BC.W-VIZ-DOTFLOW — the WebGL2 FRAGMENT FALLBACK (the genuinely-absent ~5-10% tail path).
//
// THE RETOPOLOGY makes the field FRAGMENT-FRIENDLY (the §4.2 verdict). The old Canvas2D
// point-cloud (`createCpuFlowField`, a `getContext("2d")` stepper) is GONE — clean break,
// no alias (the "no canvas anywhere" §E mandate). The fallback is now a pure WebGL2
// fullscreen-fragment dot-lattice + brightness shader: for each pixel it finds the nearest
// lattice cell, draws the soft circle analytically (`fract(uv·gridFreq)` dot mask), and
// lights it by the SAME `flowField.ts` height (`waveBand(sampleHeight(o,t))·contrast`) +
// the optional globe mask. The grid+brightness model evaluates ONE analytic field through
// ONE shared color seam (the spliced `procedural-color.glsl.ts` OKLCh chunk), so the
// fallback is a PURE fragment field — parity flips `degraded → verified` (the same flow,
// no compute particles). The full-screen-triangle vertex pass is the substrate's standard
// fullscreen pass; this module is the fragment source the `setupGL` callback compiles.

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
