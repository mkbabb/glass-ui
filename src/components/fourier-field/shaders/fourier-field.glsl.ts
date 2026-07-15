// BI.W-FOURIER-RIBBON — the WebGL2 INSTANCED-RIBBON programs (the WebGL2 fallback tail).
//
// The fullscreen per-pixel SDF fragment (the O(pixels×segments) loop over ALL ≤256 segments
// at EVERY pixel) RETIRED wholesale onto instanced geometry (proof:viz-fourier-ribbon FB1 —
// no dual path). ONE instanced program paints every ribbon LAYER (trail · epicycle · head ·
// cel), selected per draw by `uLayer`:
//   • the VERTEX expands a unit quad to the per-instance capsule (a→b padded by the covered
//     extent) or AABB (ring / head halo) bounding box — so each instance covers ONLY its own
//     segment, O(covered_pixels), not the whole canvas;
//   • the FRAGMENT runs the EXACT `segDist` under-glow+core / ring+arm+dot / head-aniso /
//     cel over-composite the fullscreen loop ran — pixel-identical by over-composite
//     associativity, the per-instance premultiplied contribution blended `over` in draw order.
//
// The head→tail TAPER (`RIBBON_TAIL_FRAC`, MIRRORED verbatim from constants.ts — the GLSL
// twin cannot import a TS const) + the soft UNDER-GLOW (`RIBBON_UNDERGLOW_*`) live in the
// trail fragment; proof:viz FB1 cross-checks the mirror. The color/OKLCh math splices the
// SHARED `procedural-color.glsl.ts` chunk so the OETF + Ottosson matrices can never DRIFT
// from the WGSL primary. NEVER reached on a capable engine — Safari 26+/Chrome ride the WGSL
// instanced primary; this is the Linux-Firefox / pre-A12 tail.

import {
    OETF_GLSL,
    OKLCH_MATRICES_GLSL,
} from "../../../composables/glass/webgl/shaders/procedural-color.glsl";

/** The instanced ribbon VERTEX — expands the unit quad to each instance's covered bbox. */
export const FOURIER_FIELD_VERT_GLSL = /* glsl */ `#version 300 es
// BI.W-FOURIER-RIBBON §2b — MUST equal the WGSL twin + FOURIER_TANGENT_EPS (constants.ts).
#define RIBBON_UNDERGLOW_SCALE 2.2

in vec2 aCorner;   // the unit quad corner ∈ [0,1]²
in vec4 aSeg;      // (ax, ay, bx, by) — segment endpoints in MODEL space
in vec4 aData;     // (age, strokeHalf, arg2, _pad) — strokeHalf/age/arg2 per layer

uniform vec4 uFit;         // (centerX, centerY, scale, aspect) — model→clip fit
uniform int  uLayer;       // 0 trail · 1 epicycle · 2 head · 3 cel-rope · 4 cel-arm
uniform float uEdgeMargin; // AA-feather slop in MODEL units (a few CSS px), padding the bbox

out vec2 vP;       // the MODEL-space fragment coordinate (the fs runs the SDF on it)
out vec2 vA;
out vec2 vB;
out float vAge;
out float vHalf;
out float vArg2;

void main() {
  vec2 a = aSeg.xy;
  vec2 b = aSeg.zw;
  float strokeHalf = aData.y;
  vA = a; vB = b; vAge = aData.x; vHalf = strokeHalf; vArg2 = aData.z;

  vec2 pos;
  if (uLayer == 1 || uLayer == 2) {
    // AABB around a — the epicycle orbit RING (radius = |b-a|) or the head HALO.
    float ext = (uLayer == 1) ? (length(b - a) + strokeHalf * 0.7) : (strokeHalf * 4.5);
    ext += uEdgeMargin;
    pos = a + (aCorner * 2.0 - 1.0) * ext;
  } else {
    // Capsule along a→b padded by the covered extent (trail under-glow / cel stroke).
    float ext = (uLayer == 0) ? (strokeHalf * RIBBON_UNDERGLOW_SCALE) : strokeHalf;
    ext += uEdgeMargin;
    vec2 d = b - a;
    float len = length(d);
    vec2 dir = len > 1e-6 ? d / len : vec2(1.0, 0.0);
    vec2 perp = vec2(-dir.y, dir.x);
    vec2 along = mix(a - dir * ext, b + dir * ext, aCorner.x);
    pos = along + perp * (aCorner.y * 2.0 - 1.0) * ext;
  }

  vP = pos;
  vec2 center = uFit.xy;
  float scale = max(uFit.z, 1e-6);
  float aspect = max(uFit.w, 1e-4);
  // model → clip (the inverse of the fs's p = center + vClip·aspect / scale).
  float clipX = (pos.x - center.x) * scale / aspect;
  float clipY = (pos.y - center.y) * scale;
  gl_Position = vec4(clipX, clipY, 0.0, 1.0);
}
`;

/** The instanced ribbon FRAGMENT — the exact per-layer SDF over-composite, loop-free. */
export const FOURIER_FIELD_FRAG_GLSL = /* glsl */ `#version 300 es
precision highp float;

#define MAX_FOURIER_STOPS 4
// BD.W-FOURIER-LOOM §2b — MUST equal the WGSL twin + FOURIER_TANGENT_EPS (constants.ts).
#define TANGENT_EPS 1e-4
#define SPEED_REF_HALFWIDTHS 6.0
// BG.W-FOURIER-BEAUTY B1 — the THICK luminous RIBBON. RIBBON_TAIL_FRAC is MIRRORED verbatim
// from constants.ts (the GLSL twin cannot import a TS const); proof:viz FB1 cross-checks the
// two copies are equal so the mid-body floor (RIBBON_HEAD_FLOOR_PX) can never drift off it.
#define RIBBON_TAIL_FRAC 0.4
#define RIBBON_UNDERGLOW_SCALE 2.2
#define RIBBON_UNDERGLOW_ALPHA 0.16

in vec2 vP;
in vec2 vA;
in vec2 vB;
in float vAge;
in float vHalf;
in float vArg2;
out vec4 fragColor;

uniform vec4 uTrail;      // (trailWidth, peakAlpha, headGlowAlpha, trailFadeExp)
uniform vec4 uEnv;        // (trailFloor, intensity, showEpicycles, rainbowChain)
uniform vec4 uLoom;       // (squashGain, celGain, _pad, _pad) — FOURIER-LOOM §2b/§3b
uniform int  uLayer;      // 0 trail · 1 epicycle · 2 head · 3 cel-rope · 4 cel-arm
uniform int  uStopCount;
uniform vec3 uPalette[MAX_FOURIER_STOPS]; // linear-sRGB stops

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
struct HeadFrame { vec2 T; float sHat; };
HeadFrame headFrame(vec2 head, vec2 headBack, float halfW) {
  vec2 d = head - headBack;
  float s = length(d);
  HeadFrame fr;
  if (s <= TANGENT_EPS) { fr.T = vec2(1.0, 0.0); fr.sHat = 0.0; return fr; }
  fr.T = d / s;
  float refScale = max(halfW * SPEED_REF_HALFWIDTHS, 1e-6);
  fr.sHat = clamp(s / refScale, 0.0, 1.0);
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
  vec2 p = vP;
  float aa = max(fwidth(p.x) + fwidth(p.y), 1e-5) * 0.75;
  float peak = uTrail.y * uEnv.y;
  float headGlow = uTrail.z * uEnv.y;
  float fadeExp = uTrail.w;
  float trailFloor = uEnv.x;
  bool rainbow = uEnv.w > 0.5;
  float squashGain = uLoom.x;
  float celGain = uLoom.y;
  float halfW = vHalf;

  if (uLayer == 0) {
    // ── TRAIL — the tapered luminous ribbon over its own soft under-glow ──
    float age = vAge;
    float d = segDist(p, vA, vB);
    // B1 — the head→tail TAPER: the ribbon half-width scales with age (thick head, thin tail).
    float ribbonHalf = halfW * (RIBBON_TAIL_FRAC + (1.0 - RIBBON_TAIL_FRAC) * age);
    vec3 lin = samplePaletteLin(1.0 - age * 0.4);
    vec3 rgb = clamp(linearToSrgb(lin), vec3(0.0), vec3(1.0));
    // B1 — the soft UNDER-GLOW: a wider, low-alpha copy UNDER the crisp ribbon (ONE color event).
    float glowHalf = ribbonHalf * RIBBON_UNDERGLOW_SCALE;
    float glowCover = 1.0 - smoothstep(glowHalf, glowHalf + aa * 3.0, d);
    float ga = peak * RIBBON_UNDERGLOW_ALPHA * pow(age, fadeExp) * glowCover;
    // the crisp tapered ribbon core.
    float cover = 1.0 - smoothstep(ribbonHalf, ribbonHalf + aa, d);
    float ca = max(peak * pow(age, fadeExp), peak * trailFloor) * cover;
    // core OVER glow OVER transparent (both premultiplied on the SAME rgb → out = rgb·outA).
    float outA = ca + ga * (1.0 - ca);
    fragColor = vec4(rgb * outA, outA);
  } else if (uLayer == 1) {
    // ── EPICYCLE — orbit RING + ARM + joint DOT union (MAX-blended, no join seam) ──
    float seg = vArg2;
    vec3 lin = chainColorLin(seg, rainbow);
    vec3 rgb = clamp(linearToSrgb(lin), vec3(0.0), vec3(1.0));
    float radius = length(vB - vA);
    float dRing = abs(length(p - vA) - radius);
    float ringW = max(halfW * 0.45, aa);
    float ringMask = (1.0 - smoothstep(ringW, ringW + aa, dRing)) * 0.5;
    float dArm = segDist(p, vA, vB);
    float armMask = 1.0 - smoothstep(halfW * 0.55, halfW * 0.55 + aa, dArm);
    float dotR = max(halfW * 0.7, aa * 2.0);
    float dDot = length(p - vA);
    float dotMask = 1.0 - smoothstep(dotR, dotR + aa, dDot);
    float m = clamp(max(max(ringMask, armMask), dotMask), 0.0, 1.0) * peak * 0.7;
    fragColor = vec4(rgb * m, m);
  } else if (uLayer == 2) {
    // ── HEAD — squash-and-stretch (§2b): halo + saturated core + white specular ──
    vec2 head = vA;
    vec2 headBack = vB;
    HeadFrame fr = headFrame(head, headBack, halfW);
    float dHead = headAniso(p, head, fr, squashGain);
    float coreR = halfW * 1.5;
    float haloR = coreR * 3.0;
    vec3 headRgb = clamp(linearToSrgb(samplePaletteLin(0.0)), vec3(0.0), vec3(1.0));
    float halo = (1.0 - smoothstep(0.0, haloR, dHead)) * headGlow * 0.35;
    vec4 accum = vec4(headRgb * halo, halo);
    float core = (1.0 - smoothstep(coreR, coreR + aa, dHead)) * headGlow;
    accum = vec4(headRgb * core, core) + accum * (1.0 - core);
    float spec = (1.0 - smoothstep(coreR * 0.4, coreR * 0.4 + aa, dHead)) * headGlow * 0.9;
    accum = vec4(vec3(1.0) * spec, spec) + accum * (1.0 - spec);
    fragColor = accum;
  } else {
    // ── CEL — the technicolor ink shadow (rope uLayer==3 / arm uLayer==4) ──
    float celA = clamp(celGain, 0.0, 1.0);
    float d = segDist(p, vA, vB);
    float cover = 1.0 - smoothstep(halfW, halfW + aa, d);
    float m = cover * celA * peak * vArg2; // vArg2 = celStrength (1.0 rope / 0.7 arm)
    fragColor = vec4(0.0, 0.0, 0.0, m);
  }
}
`;
