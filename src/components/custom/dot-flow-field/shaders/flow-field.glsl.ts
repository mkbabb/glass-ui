// BG.W-DOTFLOW-REBUILD — the STREAMLINE fullscreen-fragment GLSL pass (WebGL2 fallback).
//
// The WebGL2 twin of flow-field.wgsl.ts — the SAME fullscreen-fragment streamline render (NO
// state-texture GPGPU, NO trail FBO ping-pong, NO point-sprite motes — the whole
// advected-population channel is RETIRED with the WGSL compute path). It evaluates the SAME
// stream function ψ (composables/flowField.ts sampleStreamField, transcribed byte-for-byte),
// renders its evenly-spaced iso-contours as the streamlines, and beads a dot at every crossing
// with a drifting transverse bead-line — over the deep warm-near-black floor, bounded [0,1].
//
// Both this GLSL pass and the WGSL pass splice the SHARED procedural-color chunk (the ONE OKLCh
// color seam → no WGSL↔GLSL drift). `proof:viz-dotflow` clause S3 round-trips the JS↔WGSL↔GLSL
// field at a fixed sample set.

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

/** The streamline + beaded-dot fragment source (the iso-contour render model). */
export const FLOW_FIELD_FRAG_GLSL = /* glsl */ `#version 300 es
precision highp float;

#define CURL_EPS 0.012
#define MAX_FLOW_STOPS 4
// PI MUST be in scope BEFORE the OKLCH_MATRICES splice — its oklabToOklch folds the hue on
// 2·PI (procedural-color.glsl.ts: "the consumer splices the matrices chunk + defines PI first").
// Without it the WHOLE program fails to compile (undeclared identifier), the WebGL2 draw never
// runs, and the wrapper's warm-near-black CSS floor shows as a dead plate — the paint-DELTA class.
#define PI 3.141592653589793

in vec2 vUv;
out vec4 fragColor;

uniform float uTime;
uniform float uAspect;
uniform float uPx;            // p-space size of one device pixel (2 / canvasHeightPx)
uniform float uFlowSlope;
uniform float uUndAmp;
uniform float uUndFreq;
uniform float uUndSpeed;
uniform float uWeaveAmp;
uniform float uWeaveFreq;
uniform float uWeaveSpeed;
uniform float uWeaveDirX;
uniform float uWeaveDirY;
uniform float uCurlWarp;
uniform float uCurlScale;
uniform float uCurlDrift;
uniform float uLineSpacing;
uniform float uLineHalfWidth;
uniform float uLineStrength;
uniform float uBeadSlope;
uniform float uBeadDrift;
uniform float uBeadRadius;
uniform float uContrast;
uniform vec2  uPointer;       // pointer in domain space
uniform float uPointerStrength;
uniform float uPointerRadius;
uniform float uPointerActive; // 0/1
uniform int   uStopCount;
uniform vec3  uFloor;         // deep warm-near-black floor (linear-sRGB)
uniform vec3  uPalette[MAX_FLOW_STOPS];  // warm-cream dot stops (linear-sRGB)

const mat2 FBM_ROT = mat2(0.8, 0.6, -0.6, 0.8);

${OETF_GLSL}
${OKLCH_MATRICES_GLSL}

// ── The shared curl-noise basis (transcribes flowField.ts hash21/valueNoise/potentialFBM) ──
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

// ── The stream function ψ (transcribes flowField.ts sampleStreamField, byte-for-byte) ──
float sampleStreamField(vec2 p) {
  float t = uTime;
  vec2 c = curlFBM(vec2(p.x * uCurlScale + t * uCurlDrift, p.y * uCurlScale - t * uCurlDrift));
  float wx = p.x + c.x * uCurlWarp;
  float wy = p.y + c.y * uCurlWarp;
  if (uPointerActive > 0.5) {
    float dx = p.x - uPointer.x;
    float dy = p.y - uPointer.y;
    float r2 = dx * dx + dy * dy;
    float radius = max(uPointerRadius, 1e-3);
    float fall = exp(-r2 / (radius * radius));
    float d = sqrt(r2) + 1e-4;
    wx += (dx / d) * uPointerStrength * fall;
    wy += (dy / d) * uPointerStrength * fall;
  }
  return uFlowSlope * wy
    + uUndAmp * sin(uUndFreq * wx - t * uUndSpeed)
    + uWeaveAmp * sin(uWeaveFreq * (wx * uWeaveDirX + wy * uWeaveDirY) - t * uWeaveSpeed);
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
  float flowSlope = max(uFlowSlope, 1e-4);
  float beadSlope = max(uBeadSlope, 1e-4);

  // aspect-corrected domain space so the streamlines stay isotropic.
  vec2 p = vec2(vUv.x * aspect, vUv.y);

  // The streamline: the nearest EVENLY-SPACED iso-contour of ψ.
  float psi = sampleStreamField(p);
  float hp = psi / uLineSpacing;
  float dContour = abs(hp - round(hp)) * uLineSpacing / flowSlope;

  // The along-line bead phase (transverse, drifting with time → the dots march ALONG the line).
  float bp = p.x * beadSlope - uTime * uBeadDrift;
  float dBead = abs(bp - round(bp)) / beadSlope;

  // The dot sits at the streamline ∩ bead crossing; the thread is the faint connecting line.
  float aa = uPx * 1.5;
  float dotDist = sqrt(dContour * dContour + dBead * dBead);
  float dotV = 1.0 - smoothstep(uBeadRadius, uBeadRadius + aa, dotDist);
  float thread = 1.0 - smoothstep(uLineHalfWidth, uLineHalfWidth + aa, dContour);
  float intensity = clamp(dotV + thread * uLineStrength, 0.0, 1.2);

  // Warm-cream dots over the deep warm-near-black floor — bounded, opaque (no white-out).
  vec3 dotColor = samplePaletteLin(clamp(dotV, 0.0, 1.0));
  vec3 lin = uFloor + dotColor * intensity * uContrast;
  vec3 rgb = clamp(linearToSrgb(lin), vec3(0.0), vec3(1.0));
  fragColor = vec4(rgb, 1.0);
}`;
