// BC.W-VIZ-FOURIER — the WebGL2 GLSL twin (the genuinely-absent-tail fallback ONLY).
//
// A clean aurora/concentric-class fullscreen fragment pass: the full-screen-triangle
// vertex + a fragment that composites the SAME comet-trail + epicycle-chain + comet-head
// SDF the WGSL primary does — reading the SAME CPU-minted curve-sample + chain-tip tables
// (uploaded as plain GL uniform arrays; the JS side steps `partialSumAt`/`positionsAt` —
// the ONE math source — per frame). NO second advection/evaluator law; the parity status
// is `verified` (the field is the same SDF over the same math). NEVER reached on a capable
// engine — Safari 26+ rides the WGSL primary; this is the Linux-Firefox / pre-A12 tail.
//
// The color/OKLCh math splices the SHARED `procedural-color.glsl.ts` chunk so the OETF +
// the Ottosson matrices can never DRIFT from the WGSL primary's `procedural-color.wgsl.ts`.

import {
    OETF_GLSL,
    OKLCH_MATRICES_GLSL,
} from "../../../../composables/glass/webgl/shaders/procedural-color.glsl";

/** The full-screen-triangle vertex shader (the aurora/concentric pattern). */
export const FOURIER_FIELD_VERT_GLSL = /* glsl */ `#version 300 es
in vec2 aPosition;
out vec2 vClip;
void main() {
  vClip = aPosition;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

/** The fragment SDF — the GLSL twin of fourier-field.render.wgsl.ts's fs_main. */
export const FOURIER_FIELD_FRAG_GLSL = /* glsl */ `#version 300 es
precision highp float;

#define MAX_CURVE_SAMPLES 256
#define MAX_PHASORS 64
// BD.W-FOURIER-LOOM §2b — MUST equal the WGSL twin + FOURIER_TANGENT_EPS (constants.ts).
#define TANGENT_EPS 1e-4
#define SPEED_REF_HALFWIDTHS 6.0

in vec2 vClip;
out vec4 fragColor;

uniform vec4 uFit;          // (centerX, centerY, scale, aspect)
uniform vec4 uTrail;        // (trailWidth, peakAlpha, headGlowAlpha, trailFadeExp)
uniform vec4 uEnv;          // (trailFloor, intensity, showEpicycles, rainbowChain)
uniform vec4 uLoom;         // (squashGain, celGain, _pad, _pad) — FOURIER-LOOM §2b/§3b
uniform int  uSampleCount;
uniform int  uArmCount;
uniform int  uStopCount;
uniform vec3 uPalette[4];   // linear-sRGB stops
// curveSamples[i] = (x, y, age) in MODEL space; chainTips[k] = (x, y) in MODEL space.
uniform vec3 uCurve[MAX_CURVE_SAMPLES];
uniform vec2 uChain[MAX_PHASORS];

const float PI = 3.141592653589793;

${OETF_GLSL}
${OKLCH_MATRICES_GLSL}

// Negative-safe cube root (the WGSL chunk's cbrt3 twin; the GLSL chunk inlines it).
vec3 cbrt3(vec3 v) { return sign(v) * pow(abs(v), vec3(1.0 / 3.0)); }

vec3 samplePaletteLin(float t) {
  if (uStopCount <= 1) return uPalette[0];
  float n = float(uStopCount);
  float ft = clamp(t, 0.0, 1.0) * (n - 1.0);
  int i0 = int(floor(ft));
  int i1 = min(i0 + 1, uStopCount - 1);
  float f = ft - float(i0);
  vec3 labA = LMS_TO_OKLAB * cbrt3(LINEAR_SRGB_TO_LMS * uPalette[i0]);
  vec3 labB = LMS_TO_OKLAB * cbrt3(LINEAR_SRGB_TO_LMS * uPalette[i1]);
  return oklabToLinearSrgb(mix(labA, labB, f));
}

vec3 chainColorLin(float seg, bool rainbow) {
  vec3 baseLin = uPalette[0];
  if (!rainbow) return baseLin;
  vec3 lab = LMS_TO_OKLAB * cbrt3(LINEAR_SRGB_TO_LMS * baseLin);
  vec3 lch = oklabToOklch(lab);
  float hueShift = mix(-0.45, 1.15, clamp(seg, 0.0, 1.0));
  vec3 lifted = vec3(0.66, max(lch.y, 0.14), lch.z + hueShift);
  return oklabToLinearSrgb(oklchToOklab(lifted));
}

float segDist(vec2 p, vec2 a, vec2 b) {
  vec2 pa = p - a;
  vec2 ba = b - a;
  float h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-8), 0.0, 1.0);
  return length(pa - ba * h);
}

// BD.W-FOURIER-LOOM §2b — the head travel frame (T, ŝ), the GLSL twin of the WGSL headFrame.
// The cusp guard returns +x as the stable fallback when s ≤ TANGENT_EPS — identical to the
// WGSL twin + the CPU bead path.
struct HeadFrame { vec2 T; float sHat; };
HeadFrame headFrame(vec2 head, vec2 headBack, float halfW) {
  vec2 d = head - headBack;
  float s = length(d);
  HeadFrame fr;
  if (s <= TANGENT_EPS) { fr.T = vec2(1.0, 0.0); fr.sHat = 0.0; return fr; }
  fr.T = d / s;
  float ref = max(halfW * SPEED_REF_HALFWIDTHS, 1e-6);
  fr.sHat = clamp(s / ref, 0.0, 1.0);
  return fr;
}

// The volume-preserving anisotropic head distance (the WGSL headAniso twin).
float headAniso(vec2 p, vec2 head, HeadFrame fr, float k) {
  float g = 1.0 + k * fr.sHat;
  vec2 n = vec2(-fr.T.y, fr.T.x);
  vec2 rel = p - head;
  float along = dot(rel, fr.T) / g;
  float across = dot(rel, n) * g;
  return length(vec2(along, across));
}

void main() {
  vec2 center = uFit.xy;
  float scale = max(uFit.z, 1e-6);
  float aspect = max(uFit.w, 1e-4);
  // clip → model (the inverse of model→clip fit).
  vec2 p = center + vec2(vClip.x * aspect, vClip.y) / scale;

  float aa = max(fwidth(p.x) + fwidth(p.y), 1e-5) * 0.75;
  float trailWidth = uTrail.x;            // already in model units (packed CPU-side)
  float peak = uTrail.y * uEnv.y;
  float headGlow = uTrail.z * uEnv.y;
  float fadeExp = uTrail.w;
  float trailFloor = uEnv.x;
  bool showEpicycles = uEnv.z > 0.5;
  bool rainbow = uEnv.w > 0.5;
  float squashGain = uLoom.x;            // FOURIER-LOOM §2b
  float celGain = uLoom.y;               // FOURIER-LOOM §3b
  float halfW = trailWidth * 0.5;

  // §2b — the head travel frame (SAME uCurve[0]/[1] the WGSL twin reads → parity).
  HeadFrame headFr;
  headFr.T = vec2(1.0, 0.0);
  headFr.sHat = 0.0;
  if (uSampleCount >= 2) {
    headFr = headFrame(uCurve[0].xy, uCurve[1].xy, halfW);
  }
  vec2 celOff = -headFr.T * halfW * 1.4;

  vec4 accum = vec4(0.0);

  // §3b — the cartoon CEL-SHADOW: a darker offset copy of the rope + chain, opposite travel,
  // painted FIRST (under the lit chain). PRM-static; celGain = 0 → no pass (byte-frozen).
  if (celGain > 0.001) {
    vec3 ink = vec3(0.0);
    float celA = clamp(celGain, 0.0, 1.0);
    for (int i = 0; i < MAX_CURVE_SAMPLES; i++) {
      if (i >= uSampleCount - 1) break;
      vec2 sa = uCurve[i].xy + celOff;
      vec2 sb = uCurve[i + 1].xy + celOff;
      float d = segDist(p, sa, sb);
      float cover = 1.0 - smoothstep(halfW, halfW + aa, d);
      if (cover < 0.002) continue;
      float m = cover * celA * peak;
      accum = vec4(ink * m, m) + accum * (1.0 - m);
    }
    if (showEpicycles && uArmCount >= 1) {
      for (int k = 0; k < MAX_PHASORS; k++) {
        if (k >= uArmCount) break;
        vec2 a = uChain[k] + celOff;
        vec2 b = uChain[k + 1] + celOff;
        float dArm = segDist(p, a, b);
        float armMask = 1.0 - smoothstep(halfW * 0.55, halfW * 0.55 + aa, dArm);
        float m = armMask * celA * peak * 0.7;
        accum = vec4(ink * m, m) + accum * (1.0 - m);
      }
    }
  }

  if (showEpicycles && uArmCount >= 1) {
    for (int k = 0; k < MAX_PHASORS; k++) {
      if (k >= uArmCount) break;
      vec2 a = uChain[k];
      vec2 b = uChain[k + 1];
      float seg = float(k) / max(float(uArmCount - 1), 1.0);
      vec3 lin = chainColorLin(seg, rainbow);
      float radius = length(b - a);
      float dRing = abs(length(p - a) - radius);
      float ringW = max(halfW * 0.45, aa);
      float ringMask = (1.0 - smoothstep(ringW, ringW + aa, dRing)) * 0.5;
      float dArm = segDist(p, a, b);
      float armMask = 1.0 - smoothstep(halfW * 0.55, halfW * 0.55 + aa, dArm);
      float dotR = max(halfW * 0.7, aa * 2.0);
      float dDot = length(p - a);
      float dotMask = 1.0 - smoothstep(dotR, dotR + aa, dDot);
      float m = clamp(max(max(ringMask, armMask), dotMask), 0.0, 1.0) * peak * 0.7;
      vec3 rgb = clamp(linearToSrgb(lin), vec3(0.0), vec3(1.0));
      accum = vec4(rgb * m, m) + accum * (1.0 - m);
    }
  }

  for (int i = 0; i < MAX_CURVE_SAMPLES; i++) {
    if (i >= uSampleCount - 1) break;
    vec3 sa = uCurve[i];
    vec3 sb = uCurve[i + 1];
    float d = segDist(p, sa.xy, sb.xy);
    float cover = 1.0 - smoothstep(halfW, halfW + aa, d);
    if (cover < 0.002) continue;
    float age = max(sa.z, sb.z);
    float a = peak * pow(age, fadeExp);
    a = max(a, peak * trailFloor) * cover;
    vec3 lin = samplePaletteLin(1.0 - age * 0.4);
    vec3 rgb = clamp(linearToSrgb(lin), vec3(0.0), vec3(1.0));
    accum = vec4(rgb * a, a) + accum * (1.0 - a);
  }

  if (uSampleCount >= 1) {
    vec2 head = uCurve[0].xy;
    // §2b — the squash-and-stretch anisotropic head (collapses to the round disc at rest).
    float dHead = headAniso(p, head, headFr, squashGain);
    float coreR = halfW * 1.5;
    float haloR = coreR * 3.0;
    vec3 headRgb = clamp(linearToSrgb(samplePaletteLin(0.0)), vec3(0.0), vec3(1.0));
    float halo = (1.0 - smoothstep(0.0, haloR, dHead)) * headGlow * 0.35;
    accum = vec4(headRgb * halo, halo) + accum * (1.0 - halo);
    float core = (1.0 - smoothstep(coreR, coreR + aa, dHead)) * headGlow;
    accum = vec4(headRgb * core, core) + accum * (1.0 - core);
    float spec = (1.0 - smoothstep(coreR * 0.4, coreR * 0.4 + aa, dHead)) * headGlow * 0.9;
    accum = vec4(vec3(1.0) * spec, spec) + accum * (1.0 - spec);
  }

  fragColor = accum;
}
`;
