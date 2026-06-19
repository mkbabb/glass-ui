// BC.W-VIZ-CONCENTRIC — the WebGL2 GLSL FALLBACK (the genuinely-absent-tail path; never
// demoed where WebGPU is present).
//
// The aurora-class clean twin: a fullscreen fragment pass that evaluates the SAME
// radial-Fourier ring-interference field f(p,t) the WGSL primary does (transcribing
// `composables/ringField.ts`) and renders it as thin bright ELLIPSOID ISOLINE STROKES via
// the same IQ gradient-normalized distance-estimation, splicing the SHARED
// `procedural-color.glsl.ts` OETF + OKLCh chunk (the ONE color source — the WGSL primary
// splices its WGSL twin, so the color math can never DRIFT between the two backends). The
// full-screen-triangle vertex pass is the substrate's; this module is the fragment source
// the `setupGL` callback compiles + the JS↔GLSL math the round-trip gate matches against
// `ringField.ts`.

import {
    OETF_GLSL,
    OKLCH_MATRICES_GLSL,
} from "../../../../composables/glass/webgl/shaders/procedural-color.glsl";

/** The full-screen-triangle vertex shader (the substrate's standard fullscreen pass). */
export const CONCENTRIC_VERT_GLSL = /* glsl */ `#version 300 es
precision highp float;
in vec2 aPosition;
out vec2 vUv;
void main() {
  vUv = aPosition;            // [-1,1]² domain
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`;

/** The concentric fragment source — the aurora-class radial-Fourier isoline render. */
export const CONCENTRIC_FRAG_GLSL = /* glsl */ `#version 300 es
precision highp float;

#define PI 3.141592653589793
#define TAU 6.283185307179586
#define RING_GRAVITY 9.81
#define MAX_RINGS 8
#define MAX_CENTERS 4
#define MAX_RING_STOPS 4

in vec2 vUv;
out vec4 fragColor;

uniform float uTime;
uniform float uSpeed;
uniform vec2  uAxis;          // (a, b) ellipsoidal-norm axis ratio
uniform float uFieldNorm;     // field → [0,1] amplitude scale
uniform float uAspect;
uniform int   uCenterCount;
uniform int   uRingCount;
uniform int   uStopCount;
uniform int   uRenderMode;    // 0 traveling-rings · 1 static-contour · 2 both
uniform float uHasBackground;
uniform vec3  uLine;          // (lineHalfWidth, aaSoftness, contourLevels) — stroke geometry
uniform vec3  uBg;            // themed background (linear-sRGB)
uniform vec3  uRings[MAX_RINGS];     // (amplitude, wavelength, phase)
uniform vec4  uCenters[MAX_CENTERS]; // (x, y, weight, rotAlpha)
uniform vec3  uPalette[MAX_RING_STOPS]; // linear-sRGB stops

${OETF_GLSL}
${OKLCH_MATRICES_GLSL}

// rotated ellipsoidal radius — transcribes ringField.ts ellipsoidalRadiusRot.
float ellipsoidalRadiusRot(vec2 p, vec2 center, float rotAlpha, float axisA, float axisB) {
  float ca = cos(rotAlpha);
  float sa = sin(rotAlpha);
  float px = p.x - center.x;
  float py = p.y - center.y;
  float rx = ca * px + sa * py;
  float ry = -sa * px + ca * py;
  float dx = rx / max(axisA, 1e-4);
  float dy = ry / max(axisB, 1e-4);
  return sqrt(dx * dx + dy * dy);
}

// |∇r| of the rotated ellipsoidal radius — transcribes ringField.ts ellipsoidalGradMag.
float ellipsoidalGradMag(vec2 p, vec2 center, float rotAlpha, float axisA, float axisB) {
  float ca = cos(rotAlpha);
  float sa = sin(rotAlpha);
  float px = p.x - center.x;
  float py = p.y - center.y;
  float rx = ca * px + sa * py;
  float ry = -sa * px + ca * py;
  float a = max(axisA, 1e-4);
  float b = max(axisB, 1e-4);
  float sx = rx / a;
  float sy = ry / b;
  float r = sqrt(sx * sx + sy * sy);
  float gx = sx / a;
  float gy = sy / b;
  return sqrt(gx * gx + gy * gy) / max(r, 1e-4);
}

// f(p,t) — the multi-center weighted radial sum (transcribes ringField.ts sampleRingField).
float sampleRingField(vec2 p, float t) {
  float acc = 0.0;
  for (int j = 0; j < MAX_CENTERS; j++) {
    if (j >= uCenterCount) break;
    vec4 cj = uCenters[j];
    float radius = ellipsoidalRadiusRot(p, cj.xy, cj.w, uAxis.x, uAxis.y);
    float centerSum = 0.0;
    for (int i = 0; i < MAX_RINGS; i++) {
      if (i >= uRingCount) break;
      vec3 r = uRings[i];
      float k = TAU / max(r.y, 1e-4);
      float omega = sqrt(RING_GRAVITY * k) * uSpeed;
      float theta = k * radius - omega * t + r.z;
      centerSum += r.x * sin(theta);
    }
    acc += centerSum * cj.z;
  }
  return acc;
}

// The IQ gradient-normalized isoline ink + the beat envelope (transcribes ringIsolineInk).
// Returns vec2(ink, env).
vec2 ringIsolineInk(vec2 p, float t) {
  float ink = 0.0;
  float env = 0.0;
  float lineHalfW = uLine.x;
  float aa = uLine.y;
  for (int j = 0; j < MAX_CENTERS; j++) {
    if (j >= uCenterCount) break;
    vec4 cj = uCenters[j];
    float radius = ellipsoidalRadiusRot(p, cj.xy, cj.w, uAxis.x, uAxis.y);
    float gradR = ellipsoidalGradMag(p, cj.xy, cj.w, uAxis.x, uAxis.y);
    for (int i = 0; i < MAX_RINGS; i++) {
      if (i >= uRingCount) break;
      vec3 r = uRings[i];
      float k = TAU / max(r.y, 1e-4);
      float omega = sqrt(RING_GRAVITY * k) * uSpeed;
      float phase = k * radius - omega * t + r.z;
      float s = sin(phase);
      float cphase = abs(cos(phase));
      float gradPhase = max(k * gradR, 1e-4);
      // The IQ gradient-normalized distance-to-isoline (domain units; round-trips JS).
      float de = abs(s) / max(cphase * gradPhase, 1e-4);
      // Convert to PIXELS via fwidth(phase) so the stroke is a constant pixel width.
      float dPx = max(fwidth(phase), 1e-4);
      float dePx = de * gradPhase / dPx;
      float lineV = 1.0 - smoothstep(lineHalfW, lineHalfW + aa, dePx);
      // Analytic anti-aliasing: fade lines where the rings pack tighter than a pixel can
      // resolve (fwidth(phase) ≳ π, near a center / under DPR) so the field stays thin LINES
      // instead of flooding to a bright slab (IQ filterwidth).
      float aliasFade = 1.0 - smoothstep(PI * 0.6, PI * 1.2, dPx);
      lineV *= aliasFade;
      float w = r.x * cj.z;
      ink = max(ink, lineV * w);
      env += s * w;
    }
  }
  return vec2(clamp(ink, 0.0, 1.0), env);
}

// The topographic-contour operator (transcribes contourInk).
float contourInk(float envValue, float levels) {
  float fN = envValue * levels;
  float band = abs(fract(fN + 0.5) - 0.5);
  float aaW = max(fwidth(fN), 1e-4);
  return 1.0 - smoothstep(uLine.x, uLine.x + uLine.y, band / aaW);
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
  vec2 p = vec2(vUv.x * aspect, vUv.y);

  vec2 ie = ringIsolineInk(p, uTime);
  float ink = ie.x;
  float env = ie.y;

  if (uRenderMode == 1) {
    ink = contourInk(env * uFieldNorm, max(uLine.z, 1.0));
  } else if (uRenderMode == 2) {
    ink = max(ink, contourInk(env * uFieldNorm, max(uLine.z, 1.0)));
  }
  ink = clamp(ink, 0.0, 1.0);

  // The beat-envelope drives the warm-family tone across the ramp (cream↔amber↔ember) so the
  // crossing families read as warm-light interference (the warm-cream identity).
  float v = clamp(0.5 + env * uFieldNorm, 0.0, 1.0);
  vec3 lin = samplePaletteLin(v);
  vec3 rgb = clamp(linearToSrgb(lin), vec3(0.0), vec3(1.0));

  if (uHasBackground > 0.5) {
    vec3 bg = clamp(linearToSrgb(uBg), vec3(0.0), vec3(1.0));
    fragColor = vec4(mix(bg, rgb, ink), 1.0);
    return;
  }
  float alpha = ink;
  fragColor = vec4(rgb * alpha, alpha);
}`;
