// BG.W-AUR-IMAGE-SOURCE — the aurora IMAGE-source fragment program (WebGL2).
//
// The CONSTRUCTION-TIME PROGRAM PERMUTATION of the aurora fragment: `source:"image"`
// selects THIS separately-compiled program (the BD.W-DOT-IMAGE B1 discipline), NEVER a
// per-fragment runtime source-uniform branch. It is a COLOR-STAGE SWAP on the SAME engine —
// the substrate/lifecycle/drift/configurator are reused; only the fragment differs.
//
// The mechanism: a real photo dissolves INTO the aurora's own drift. The SAME drifting
// field (`domainWarp` → `zoneField`) that drives the palette program's COLOR here drives
// the BLUR RADIUS instead — `radius = mix(uBlurMin, uBlurMax, zone)` per fragment, so
// near-sharp zones and dramatically-dissolved zones DRIFT like aurora nuclei. The blur is
// a FIXED 24-tap kernel (3 rings × 8, a compile-time constant loop bound — the kuwahara
// budget precedent), sampled in LINEAR light (the shared OETF `srgbToLinear`), NO FBO
// ping-pong, NO `backdrop-filter:url`. The vividness FLOOR applies source-agnostically
// (it operates on the final linear `col`) so a washed-out photo blooms to transmission-fit.
//
// The image lane (`uImage`/`uBlurMin`/`uBlurMax`/`uImageAspect`) is the image program's
// OWN uniform tail — the palette program (`aurora.frag.ts`) is byte-untouched (its struct
// offsets never see these). PRM: the runtime freezes `uTime`, so the zone field is a
// single static blurred frame (no drift, no cross-fade — L3).
//
// The shared OETF + OKLCh matrices + the FBM rotation are SPLICED from the same
// `procedural-color.glsl` chunk the palette path splices, so the sRGB↔linear transfer +
// the vividness OKLab math never diverge between the two programs.

import {
    FBM_ROT_GLSL,
    OETF_GLSL,
    OKLCH_MATRICES_GLSL,
} from "../../../../../composables/glass/webgl/shaders/procedural-color.glsl";

const NL = "\n";

// The fixed zone-blur kernel geometry (a compile-time constant loop bound — the
// bounded-tap witness). 3 rings × 8 angular taps = 24 stratified samples; the DISSOLVE
// is carried by the kernel RADIUS (`mix(uBlurMin, uBlurMax, zone)`), never the tap count,
// so a "dramatically dissolved" zone reads as a heavy bokeh over 24 taps at field scale.
export const IMAGE_BLUR_RINGS = 3;
export const IMAGE_BLUR_SECTORS = 8;

export const IMAGE_FRAGMENT_SRC =
    /* glsl */ `#version 300 es
precision highp float;

in vec2 vUv;
out vec4 fragColor;

#define MAX_NUCLEI 6
#define BLUR_RINGS ${IMAGE_BLUR_RINGS}
#define BLUR_SECTORS ${IMAGE_BLUR_SECTORS}
const float PI = 3.141592653589793;

uniform float uTime;

// The drifting field uniforms — the SAME nuclei/warp/cursor lanes the palette program
// reads; here they drive the BLUR ZONE, not the color.
uniform int   uNucleiCount;
uniform vec2  uNucleiPos[MAX_NUCLEI];
uniform float uNucleiRadius[MAX_NUCLEI];
uniform float uNucleiValueBias[MAX_NUCLEI];
uniform float uNucleiDriftRadius[MAX_NUCLEI];
uniform float uNucleiDriftPhase[MAX_NUCLEI];
uniform float uNucleiElong[MAX_NUCLEI];
uniform float uNucleiAngle[MAX_NUCLEI];
uniform float uSoftmaxBeta;
uniform float uNucleiDrift;
uniform float uWarpAmount;
uniform float uWarpScale;
uniform float uWarpDrift;
uniform int   uNoiseOctaves;
uniform vec2  uCursor;
uniform float uCursorStrength;
uniform float uCursorRadius;

// Output shaping (shared with the palette program's meaning).
uniform float uSaturation;
uniform float uPaperGrain;
uniform float uAlpha;
uniform float uVividness;

// ── The image lane (this program's OWN uniform tail) ──
uniform sampler2D uImage;
uniform float uBlurMin;    // 0..1 uv-space blur radius at zone=0 (near-sharp)
uniform float uBlurMax;    // 0..1 uv-space blur radius at zone=1 (dissolved)
uniform float uImageAspect; // canvas W/H — keeps the bokeh circular in screen space

// Authoring-scale → rad/sec lifts (byte-identical to aurora.frag.ts).
const float K_NUCLEI = 14.0;
const float K_WARP = 5.0;

// ── Noise (aurora-local hash21/vnoise/fbm — the same compact foundation) ──
float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}
${FBM_ROT_GLSL}
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    if (i >= uNoiseOctaves) break;
    v += a * vnoise(p);
    p = FBM_ROT * p * 2.02;
    a *= 0.5;
  }
  return v;
}
// Interleaved Gradient Noise (Jimenez) — display-space 1-LSB dither.
float ign(vec2 p) {
  return fract(52.9829189 * fract(dot(p, vec2(0.06711056, 0.00583715))));
}

${OETF_GLSL}
${OKLCH_MATRICES_GLSL}

// linear-sRGB → raw OKLab (the vividnessFloor helper — mirrors aurora.frag's linOklab).
vec3 linOklab(vec3 lin) {
  vec3 lms = LINEAR_SRGB_TO_LMS * lin;
  return LMS_TO_OKLAB * (sign(lms) * pow(abs(lms), vec3(1.0 / 3.0)));
}

// The Quilez double-warp (the fbm branch — byte-parallel to aurora.frag's default warp)
// + the cursor swirl. The SAME drift that moves the palette field here moves the blur zone.
vec2 domainWarp(vec2 p, float t) {
  vec2 q = vec2(fbm(p * uWarpScale + vec2(0.0, 0.0) + t * uWarpDrift * K_WARP),
                fbm(p * uWarpScale + vec2(5.2, 1.3) + t * uWarpDrift * K_WARP));
  vec2 r = vec2(fbm(p * uWarpScale + 4.0 * q + vec2(1.7, 9.2)),
                fbm(p * uWarpScale + 4.0 * q + vec2(8.3, 2.8)));
  vec2 warped = p + uWarpAmount * r;
  if (uCursorStrength > 0.001) {
    vec2 toP = p - uCursor;
    float d = length(toP);
    float rr = max(uCursorRadius, 0.01);
    float w = exp(-(d * d) / (rr * rr * 0.45));
    float ang = w * uCursorStrength * 2.1;
    float ca = cos(ang), sa = sin(ang);
    vec2 rotated = vec2(ca * toP.x - sa * toP.y, sa * toP.x + ca * toP.y) + uCursor;
    warped = mix(warped, rotated + uWarpAmount * r * 0.7, w * uCursorStrength);
  }
  return warped;
}

// The drifting BLUR ZONE — a smooth [0,1] scalar from the anisotropic-Gaussian nuclei
// softmax (the SAME field nucleiField reads), drift-coupled. Reads high where a nucleus
// sits → that region dissolves; the inter-nucleus gaps stay near-sharp.
float zoneField(vec2 p, float t) {
  float accum = 0.0;
  float accumW = 0.0;
  for (int i = 0; i < MAX_NUCLEI; i++) {
    if (i >= uNucleiCount) break;
    float driftPhase = uNucleiDriftPhase[i];
    vec2 posI = uNucleiPos[i] + uNucleiDriftRadius[i] * vec2(
      cos(t * uNucleiDrift * K_NUCLEI + driftPhase),
      sin(t * uNucleiDrift * K_NUCLEI + driftPhase * 1.13));
    vec2 diff = p - posI;
    float ang = uNucleiAngle[i];
    float ca = cos(ang), sa = sin(ang);
    vec2 local = vec2(ca * diff.x + sa * diff.y, -sa * diff.x + ca * diff.y);
    float along = local.x / max(uNucleiElong[i], 0.01);
    float d2 = along * along + local.y * local.y;
    float rad = max(uNucleiRadius[i], 0.01);
    float w = exp(-uSoftmaxBeta * d2 / (rad * rad));
    accum += w * (0.5 + 0.5 * uNucleiValueBias[i]);
    accumW += w;
  }
  return clamp(accum / max(accumW, 1e-4), 0.0, 1.0);
}

// Object-fit:cover — map the screen uv into the image so a non-matching aspect crops,
// never stretches. uImageAspect is the canvas aspect (W/H); the image is authored to
// fill it. A centred cover keeps the photo readable under the dissolve.
vec2 coverUv(vec2 uv) {
  vec2 c = uv - 0.5;
  c.x *= max(uImageAspect, 0.0001);
  float s = 1.0 / max(uImageAspect, 1.0);
  return c * s + 0.5;
}

// The bounded 24-tap zone blur — a FIXED 3-ring × 8-sector stratified kernel. The radius
// is per-fragment (mix(uBlurMin, uBlurMax, zone)); every tap is sampled in LINEAR light
// (srgbToLinear) so the average is a physically-correct bokeh. The x-offset is divided by
// the canvas aspect so the kernel stays circular in screen space.
vec3 zoneBlur(vec2 uv, float radius) {
  vec3 sum = srgbToLinear(texture(uImage, coverUv(uv)).rgb);
  float wsum = 1.0;
  for (int ring = 1; ring <= BLUR_RINGS; ring++) {
    float rr = radius * (float(ring) / float(BLUR_RINGS));
    for (int s = 0; s < BLUR_SECTORS; s++) {
      float a = (float(s) + 0.5 * float(ring)) / float(BLUR_SECTORS) * 2.0 * PI;
      vec2 off = vec2(cos(a) / max(uImageAspect, 0.0001), sin(a)) * rr;
      sum += srgbToLinear(texture(uImage, coverUv(uv + off)).rgb);
      wsum += 1.0;
    }
  }
  return sum / wsum;
}

// The §3 chroma FLOOR — source-agnostic (operates on the final linear col), the WGSL/GLSL
// twin of aurora.frag's vividnessFloor. A washed-out photo blooms to transmission-fit; a
// vivid photo is untouched; uVividness:0 is a no-op.
const float VIVID_TARGET = 0.115;
const float VIVID_EPS = 0.012;
const vec2 VIVID_WARM_ANCHOR = vec2(0.34202, 0.93969);
vec3 vividnessFloor(vec3 c) {
  if (uVividness <= 0.0001) return c;
  vec3 lab = linOklab(c);
  float C = length(lab.yz);
  float modeLift = mix(1.18, 1.0, clamp(lab.x * 1.4, 0.0, 1.0));
  float Cmin = uVividness * VIVID_TARGET * modeLift;
  vec2 hueDir = (C > VIVID_EPS) ? lab.yz / C : VIVID_WARM_ANCHOR;
  lab.yz = hueDir * max(C, Cmin);
  return max(oklabToLinearSrgb(lab), vec3(0.0));
}

vec3 saturate3(vec3 c, float amt) {
  vec3 lch = oklabToOklch(linOklab(c));
  lch.y = max(lch.y * amt, 0.0);
  return max(oklabToLinearSrgb(oklchToOklab(lch)), vec3(0.0));
}
` +
    NL +
    /* glsl */ `
// ── PBR-Neutral tonemap (named aces() — the tonemap slot; byte-parallel to aurora.frag) ──
vec3 aces(vec3 color) {
  const float startCompression = 0.8 - 0.04;
  const float desaturation = 0.15;
  float x = min(color.r, min(color.g, color.b));
  float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
  color -= offset;
  float peak = max(color.r, max(color.g, color.b));
  if (peak < startCompression) return clamp(color, 0.0, 1.0);
  float d = 1.0 - startCompression;
  float newPeak = 1.0 - d * d / (peak + d - startCompression);
  color *= newPeak / peak;
  float g = 1.0 - 1.0 / (desaturation * (peak - newPeak) + 1.0);
  return clamp(mix(color, newPeak * vec3(1.0), g), 0.0, 1.0);
}

void main() {
  vec2 uv = vUv;
  float t = uTime;

  // The SAME drifting field the palette program computes — here it drives BLUR, not color.
  vec2 p_warp = domainWarp(uv, t);
  float zone = zoneField(p_warp, t);

  // Per-fragment blur radius — near-sharp at zone 0, dissolved at zone 1.
  float radius = mix(uBlurMin, uBlurMax, zone);
  vec3 col = zoneBlur(uv, radius);

  // Saturation trim + the source-agnostic vividness floor (a washed photo blooms).
  col = saturate3(col, uSaturation);
  col = vividnessFloor(col);

  // Tonemap + film grain (byte-parallel closing of the palette program's seam).
  col = aces(col);
  float grain = hash21(gl_FragCoord.xy + t * 17.0);
  col += (grain - 0.5) * uPaperGrain;
  col = clamp(col * 0.985 + 0.008, 0.0, 1.0);

  // MANDATORY OETF (the whole pipeline above runs in LINEAR) + display-space IGN dither.
  col = linearToSrgb(col);
  col += (1.0 / 255.0) * (ign(gl_FragCoord.xy) - 0.5);

  // Premultiply on display-space color (matches the palette path: OETF, then premul).
  fragColor = vec4(col * uAlpha, uAlpha);
}
`;
