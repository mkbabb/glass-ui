// BD.W-CONCENTRIC-RELIEF — concentric = a living level-set hypsometric SURVEY (WebGL2 + Safari).
//
// The aurora-class clean twin: a fullscreen fragment pass that evaluates the SAME level-set
// topography H(p,t) the WGSL primary does (transcribing `composables/levelField.ts`) and paints
// the SAME opaque finishing layer — a tanh hypsometric fill, one analytic hillshade, a two-tier
// index/minor contour hierarchy via the IQ gradient-free `contourInk` — splicing the SHARED
// `procedural-color.glsl.ts` OETF + OKLCh chunk + the shared `CURL_FBM_GLSL` + the shared
// `WAVE_FIELD_GLSL` cell-warp (the SAME the liquid-grid splices — the kinship). The output is OPAQUE.

import {
    OETF_GLSL,
    OKLCH_MATRICES_GLSL,
} from "../../../../composables/glass/webgl/shaders/procedural-color.glsl";
import { CURL_FBM_GLSL } from "../../../../composables/glass/webgl/shaders/flow.glsl";
import { WAVE_FIELD_GLSL } from "../../../../composables/glass/wave/waveField.glsl";

/** The full-screen-triangle vertex shader (the substrate's standard fullscreen pass). */
export const CONCENTRIC_VERT_GLSL = /* glsl */ `#version 300 es
precision highp float;
in vec2 aPosition;
out vec2 vUv;
void main() {
  vUv = aPosition;            // [-1,1]² domain
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`;

/** The concentric fragment source — the level-set contour-map render (liquid-grid kin). */
export const CONCENTRIC_FRAG_GLSL = /* glsl */ `#version 300 es
precision highp float;

#define PI 3.141592653589793
#define TAU 6.283185307179586
#define MAX_RING_STOPS 4

in vec2 vUv;
out vec4 fragColor;

uniform float uTime;
uniform float uSpeed;
uniform float uCellSize;      // the topography cell pitch (the contour-warp granularity)
uniform float uFieldNorm;     // height → [0,1] tone scale
uniform float uAspect;
uniform int   uStopCount;
uniform float uHasBackground;
uniform vec4  uLine;          // (lineHalfWidth, aaSoftness, contourLevels, indexEvery)
uniform vec2  uLightDir;      // the fixed cel-light direction (folded norm.zw)
uniform vec3  uBg;            // themed background (linear-sRGB)
uniform vec4  uWave;          // (waveDirX, waveDirY, waveK, waveOmega)
uniform vec4  uWave2;         // (waveSigma, twistMax, shearMax, amp)
uniform vec4  uTopo;          // (heightOctaves, heightSeed, swellAmp, perturbAmp)
uniform vec4  uCursor;        // (cursorX, cursorY, cursorWell, interactive)
uniform vec4  uTune;          // (toneGain, shadeAmp, indexMul, inkDarken)
uniform vec3  uPalette[MAX_RING_STOPS]; // linear-sRGB stops

${OETF_GLSL}
${OKLCH_MATRICES_GLSL}

// The shared curl operator (flow.glsl.ts — forward-declares potentialFBM).
${CURL_FBM_GLSL}

// ── The host noise basis (the SAME quintic-faded value-noise the suite speaks) ──
float hash21(float x, float y) {
  float px = fract(x * 0.1031);
  float py = fract(y * 0.1031);
  float pz = fract(x * 0.1031);
  float d = px * (py + 33.33) + py * (pz + 33.33) + pz * (px + 33.33);
  px += d; py += d; pz += d;
  return fract((px + py) * pz);
}
float valueNoise(float x, float y) {
  float ix = floor(x); float iy = floor(y);
  float fx = x - ix; float fy = y - iy;
  float ux = fx * fx * fx * (fx * (fx * 6.0 - 15.0) + 10.0);
  float uy = fy * fy * fy * (fy * (fy * 6.0 - 15.0) + 10.0);
  float a = hash21(ix, iy);
  float b = hash21(ix + 1.0, iy);
  float c = hash21(ix, iy + 1.0);
  float d2 = hash21(ix + 1.0, iy + 1.0);
  return mix(mix(a, b, ux), mix(c, d2, ux), uy);
}
// The curl chunk's forward-declared potentialFBM body.
float potentialFBM(vec2 p) {
  float v = 0.0; float amp = 0.5; float freq = 1.0;
  float px = p.x; float py = p.y;
  for (int i = 0; i < 3; i++) {
    v += amp * valueNoise(px * freq, py * freq);
    float rx = 0.8 * px - 0.6 * py;
    float ry = 0.6 * px + 0.8 * py;
    px = rx; py = ry; freq *= 2.0; amp *= 0.5;
  }
  return v;
}

// The shared traveling-wave CELL-WARP chunk (spliced AFTER valueNoise + potentialFBM + curl).
${WAVE_FIELD_GLSL}

float smoothstepEdge(float e0, float e1, float x) {
  float t = clamp((x - e0) / max(e1 - e0, 1e-6), 0.0, 1.0);
  return t * t * (3.0 - 2.0 * t);
}

// The level-set height at domain p (transcribes levelField.ts sampleHeight).
float sampleHeight(vec2 p, float t) {
  // The CONTINUOUS traveling-wave flow warp (no per-cell seam — the contours flow + twist as
  // the wave passes OVER and THROUGH them, the SAME wave that twists the liquid-grid cells).
  vec2 g = waveFlow(p, t, uWave.xy, uWave.z, uWave.w, uWave2.x, uWave2.y, uWave2.w);
  if (uCursor.w > 0.5) {
    g = cursorSwirl(g, uCursor.xy, uCursor.z * 0.6, uCellSize * 2.5);
  }
  // LOW base frequency → BROAD nested loops (a readable contour map). Octaves carry detail.
  float H = heightField(g * 0.9, uTopo.x, uTopo.y);
  H += uTopo.z * waveSwell(t, uTopo.y);
  if (uCursor.w > 0.5) {
    vec2 d = p - uCursor.xy;
    float d2 = dot(d, d);
    // The cursor HEAVE — a SOFT bulge (a Gaussian peak feathered by a smoothstep falloff so
    // the heave is C1-smooth, NOT a hard-edged quad). The well depth/radius carry the
    // velocity-HEAVE scale (packed JS-side into uCursor.z).
    // Clamp the exp argument (the Gaussian is 0 far past the well anyway) so a parked/far cursor
    // NEVER feeds an EXTREME -d2/sigma into exp(): a huge negative argument overflows the int32
    // range-reduction step of WebKit/Metal's fast-math exp() -> NaN -> the whole field NaNs ->
    // the SILENT blank concentric painted in Safari. exp(-60)~=0, numerically transparent here.
    float g0 = exp(-min(d2 / 0.22, 60.0));
    float fall = smoothstepEdge(0.0, 0.55, exp(-min(d2 / 0.6, 60.0)));
    H += uCursor.z * g0 * fall;
  }
  return H;
}

// The IQ gradient-free level-set contour ink — KEPT BYTE-FROZEN (the perfect GPU AA). It is
// FED the per-level half-width 'hw' (a parameter, NOT a re-derivation). 'aaW' floors against a
// DPR-aware minimum so the index line stays CONTINUOUS where the heave packs contours.
float contourInk(float fN, float hw) {
  float band = abs(fract(fN + 0.5) - 0.5);
  float aaW = max(fwidth(fN), 6e-4);
  return 1.0 - smoothstepEdge(hw, hw + uLine.y, band / aaW);
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

// The SHARED hillshade finite-diff epsilon — pinned ONCE (mirrors levelField.HILLSHADE_EPSILON
// + the WGSL twin; a per-backend drift would red the L6 numeric parity).
const float HILLSHADE_E = 0.012;

void main() {
  float aspect = max(uAspect, 1e-4);
  vec2 p = vec2(vUv.x * aspect, vUv.y);
  float t = uTime * uSpeed;
  float levels = max(uLine.z, 1.0);

  // The level-set topography (the KEPT field — the PRIMARY path).
  float H = sampleHeight(p, t);

  // ── 1. HYPSOMETRIC TONE — tanh expands the compressed band (basins+ridges hit the ramp ENDS).
  float tone = 0.5 + 0.5 * tanh(H * uTune.x);
  vec3 fill = samplePaletteLin(tone);

  // ── 2. ANALYTIC HILLSHADE — one ∇H finite-diff at the SHARED e, dotted with the cel light.
  float e = HILLSHADE_E;
  float hx = sampleHeight(p + vec2(e, 0.0), t) - sampleHeight(p - vec2(e, 0.0), t);
  float hy = sampleHeight(p + vec2(0.0, e), t) - sampleHeight(p - vec2(0.0, e), t);
  vec2 grad = vec2(hx, hy) / (2.0 * e);
  vec2 L = normalize(uLightDir + vec2(1e-5));
  float shade = 0.5 + 0.5 * clamp(dot(normalize(grad + vec2(1e-5)), L), -1.0, 1.0);
  fill *= mix(1.0 - uTune.y, 1.0 + uTune.y, shade);

  // ── 3. TWO-TIER INDEX/MINOR CONTOUR — isIndex a pure f(level); hw FED to the frozen contourInk.
  // The per-contour wobble is a CONTINUOUS function of H (NOT floor(H·levels)): a floor() inside
  // fN jumps at every band boundary → tears the contour + explodes fwidth(fN) there (the stair-
  // stepped/torn-arc artifact). The smooth phase keeps fN monotone (perturbAmp·2.4 < 1) so the
  // nested bands stay unbroken + the IQ AA holds at every DPR.
  float fN = H * levels + uTopo.w * sin(H * levels * 2.4 + t * 0.7);
  float indexEvery = max(uLine.w, 1.0);
  float lvl = floor(fN);
  float isIndex = fract(lvl / indexEvery) < (0.5 / indexEvery) ? 1.0 : 0.0;
  float hw = mix(uLine.x, uLine.x * uTune.z, isIndex);
  // Density fade — the IQ frequency-limit: when the level lines pack so tightly that this line's
  // own half-width (hw px, in fN units = hw*fwidth(fN)) approaches the 0.5 half-spacing, the IQ AA
  // band would FLOOD (band/aaW < hw everywhere -> ink saturates to 1 -> the contours merge into a
  // solid wash whose bright gaps read as DASHES). Fade the stroke out as it crosses that limit
  // (hw-aware, so the heavier index line fades before the finer minor) -> the over-dense ground
  // reads as smooth relief, the resolvable contours stay CONTINUOUS unbroken bands. Recomputes
  // the SAME fwidth(fN) contourInk floors on (6e-4) — no second field, no re-derivation.
  float hwAA = hw * max(fwidth(fN), 6e-4);
  float dfade = 1.0 - smoothstepEdge(0.30, 0.48, hwAA);
  float ink = clamp(contourInk(fN, hw), 0.0, 1.0) * dfade;

  // ── 4. INK = a darker ember of the LOCAL fill (the edge-of-its-own-band signature).
  vec3 inkCol = mix(fill, fill * uTune.w, 0.85);

  // ── 5. ONE color path + OPAQUE OUT — the viz IS the colorful field.
  vec3 col = mix(fill, inkCol, ink);
  fragColor = vec4(clamp(linearToSrgb(col), vec3(0.0), vec3(1.0)), 1.0);
}`;
