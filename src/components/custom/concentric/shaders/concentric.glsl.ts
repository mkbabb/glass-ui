// BB.W-VIZ-SUITE (W-CONCENTRIC) — the WebGL2 GLSL FALLBACK (the ~5-10%-tail path).
//
// The aurora-class clean twin: a fullscreen fragment pass that evaluates the SAME
// radial-Fourier ring-interference field f(p,t) the WGSL primary does (transcribing
// `composables/ringField.ts`), splicing the SHARED `procedural-color.glsl.ts` OETF +
// OKLCh chunk (the ONE color source — the WGSL primary splices its WGSL twin, so the
// color math can never DRIFT between the two backends). The full-screen-triangle vertex
// pass is the substrate's; this module is the fragment source the `setupGL` callback
// compiles + the JS↔GLSL math the round-trip gate matches against `ringField.ts`.
//
// THE PARITY STATUS (recorded honestly — `verified` in the parity table). Concentric is a
// pure fragment field (no compute pass, no particles), so the GLSL fallback is the SAME
// math evaluated by the SAME OKLCh ramp — a clean aurora-class port (the only delta is the
// rasterizer sub-pixel drift the OKLab-ΔE bar accommodates). Unlike the dot-flow-field's
// `degraded` (a CPU step count vs GPU instancing), concentric's fallback is `verified`.

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

/** The concentric fragment source — the aurora-class radial-Fourier field. */
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
uniform float uHasBackground;
uniform vec3  uRings[MAX_RINGS];     // (amplitude, wavelength, phase)
uniform vec3  uCenters[MAX_CENTERS]; // (x, y, weight)
uniform vec3  uPalette[MAX_RING_STOPS]; // linear-sRGB stops

${OETF_GLSL}
${OKLCH_MATRICES_GLSL}

// ‖p − c‖_e = sqrt((dx/a)² + (dy/b)²) — transcribes ringField.ts ellipsoidalRadius.
float ellipsoidalRadius(vec2 p, vec2 center, float axisA, float axisB) {
  float dx = (p.x - center.x) / max(axisA, 1e-4);
  float dy = (p.y - center.y) / max(axisB, 1e-4);
  return sqrt(dx * dx + dy * dy);
}

// f(p,t) — the multi-center weighted radial sum (transcribes ringField.ts sampleRingField).
float sampleRingField(vec2 p, float t) {
  float acc = 0.0;
  for (int j = 0; j < MAX_CENTERS; j++) {
    if (j >= uCenterCount) break;
    vec3 cj = uCenters[j];
    float radius = ellipsoidalRadius(p, cj.xy, uAxis.x, uAxis.y);
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

// Sample the multi-stop palette (linear-sRGB stops, OKLab mix). t in [0,1].
vec3 samplePaletteLin(float t) {
  if (uStopCount <= 1) return uPalette[0];
  float n = float(uStopCount);
  float ft = clamp(t, 0.0, 1.0) * (n - 1.0);
  int i0 = int(floor(ft));
  int i1 = min(i0 + 1, uStopCount - 1);
  float f = ft - float(i0);
  // cube-root LMS (the GLSL chunk inlines cbrt as sign(x)·pow(|x|,1/3) — no cbrt3 fn).
  vec3 lmsA = LINEAR_SRGB_TO_LMS * uPalette[i0];
  vec3 lmsB = LINEAR_SRGB_TO_LMS * uPalette[i1];
  vec3 labA = LMS_TO_OKLAB * (sign(lmsA) * pow(abs(lmsA), vec3(1.0 / 3.0)));
  vec3 labB = LMS_TO_OKLAB * (sign(lmsB) * pow(abs(lmsB), vec3(1.0 / 3.0)));
  return oklabToLinearSrgb(mix(labA, labB, f));
}

void main() {
  float aspect = max(uAspect, 1e-4);
  vec2 p = vec2(vUv.x * aspect, vUv.y);
  float raw = sampleRingField(p, uTime);
  float v = clamp(0.5 + raw * uFieldNorm, 0.0, 1.0);
  vec3 lin = samplePaletteLin(v);
  vec3 rgb = clamp(linearToSrgb(lin), vec3(0.0), vec3(1.0));
  if (uHasBackground > 0.5) {
    fragColor = vec4(rgb, 1.0);
    return;
  }
  float alpha = clamp(v * 0.92 + 0.08, 0.0, 1.0);
  fragColor = vec4(rgb * alpha, alpha);
}`;
