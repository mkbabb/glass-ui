// Aurora v4.1 — fragment shader assembler.
//
// The GLSL pipeline is composed from cohesive partials, template-spliced into one
// source string at module load. The emitted FRAGMENT_SRC is character-equivalent to
// the prior hand-inlined shader (the splice boundaries fall on original line breaks).
//
// Stages: composition (palette LUT + nuclei softmax) · flow (flow-field dispatch) ·
// brush (curved swept-brushstroke SDF) · mediums (the four PEER mediums) · tonemap
// (ACES). The noise/warp foundation + the color utils + main() stay inline here: the
// noise block carries the W2 ${FBM_ROT_GLSL}/${OETF_GLSL} splices, and main() is the
// assembly point where the pipeline composes and the mandatory linearToSrgb() OETF
// closes the seam before fragColor.
//
// Three non-obvious load-bearing details:
//   1. Palette baked to LINEAR sRGB (color.ts `oklchToLinear`) — shader ACES-tonemaps in linear.
//   2. Cursor rotates `p` inside domainWarp() AND blends flow direction — both channels required.
//   3. Crayon is a PEER medium (`uMedium == 4`), NOT an oil stroke-mode: anisotropic
//      tooth noise multiplied into the base color, dispatched at main() level
//      alongside pastel/watercolor/oil (see mediums.glsl.ts).
//
// AV.W2 — the sRGB OETF (`linearToSrgb`) + the FBM_ROT rotation constant are SPLICED
// from the shared procedural-color chunk (the single GLSL source aurora + the goo-blob
// metaball compose), so the OETF can never again diverge between them (the AV.W1 root
// cause). Aurora keeps its OWN hash21/vnoise/fbm LOOP (its 2D hash + 2.02 lacunarity +
// uniform octaves legitimately differ from the blob's — only the FBM_ROT constant
// converges, per AV.W2 §3a); aurora bakes its palette CPU-side in linear, so it does
// NOT splice the chunk's OKLCh matrices.

import {
    FBM_ROT_GLSL,
    OETF_GLSL,
    OKLCH_MATRICES_GLSL,
    PALETTE_RAMP_GLSL,
} from "../../../../../composables/glass/webgl/shaders/procedural-color.glsl";
import { AURORA_COMPOSITION_GLSL } from "./composition.glsl";
import { AURORA_FLOW_GLSL } from "./flow.glsl";
import { AURORA_TONEMAP_GLSL } from "./tonemap.glsl";
import { AURORA_BRUSH_GLSL } from "./brush.glsl";
import {
    AURORA_MEDIUMS_PRE_BRUSH_GLSL,
    AURORA_MEDIUMS_POST_BRUSH_GLSL,
} from "./mediums.glsl";

// A single newline joins every adjacent stage — the splice boundaries land on the
// original source's line breaks, so the emitted shader is character-equivalent to
// the prior hand-inlined FRAGMENT_SRC.
const NL = "\n";

export const FRAGMENT_SRC =
    /* glsl */ `#version 300 es
precision highp float;

in vec2 vUv;
out vec4 fragColor;

#define MAX_NUCLEI 6
#define MAX_STOPS  8

// ── Uniforms ───────────────────────────────────────────────────────────────
uniform float uTime;

// Palette baked CPU-side to linear-sRGB
uniform vec3  uPalette[MAX_STOPS];
uniform int   uStopCount;

// Nuclei (parallel arrays)
uniform int   uNucleiCount;
uniform vec2  uNucleiPos[MAX_NUCLEI];
uniform float uNucleiRadius[MAX_NUCLEI];
uniform float uNucleiPaletteBias[MAX_NUCLEI];
uniform float uNucleiValueBias[MAX_NUCLEI];
uniform float uNucleiDriftRadius[MAX_NUCLEI];
uniform float uNucleiDriftPhase[MAX_NUCLEI];
// Anisotropy: per-nucleus elongation (1.0 = isotropic) and major-axis angle (radians).
// Defaults (1.0 / 0.0) reduce to the original circular Gaussian.
uniform float uNucleiElong[MAX_NUCLEI];
uniform float uNucleiAngle[MAX_NUCLEI];
uniform float uSoftmaxBeta;
uniform float uValueVariance;

// Warp
uniform float uWarpAmount;
uniform float uWarpScale;
uniform float uWarpDrift;
uniform int   uWarpMode;      // 0=fbm 1=cellular 2=hybrid
uniform int   uNoiseOctaves;

// Medium
// 0 smooth, 1 pastel, 2 watercolor, 3 oil, 4 crayon (peer medium — wax pigment
// on paper tooth; NOT an oil-stroke sub-mode, so it dispatches at main() level).
uniform int   uMedium;
// Hue-arc method for the OKLCh palette interpolation (W5). Mirrors value.js's
// HueInterpolationMethod: 0 shorter, 1 longer, 2 increasing, 3 decreasing. Only
// consulted when the hue-arc path is requested; OKLab-rectangular ramps (the
// default for adjacent-hue stops) ignore it.
uniform int   uHuePath;
uniform int   uFlowPattern;   // 0 none, 1 radial, 2 swirl, 3 diagonal, 4 multi, 5 tensor/ETF (W4.1)
uniform vec2  uFlowFocal;
uniform float uFlowAngle;
uniform float uFlowCurl;
uniform vec2  uCursor;          // in 0..1 screen space (matches pN)
uniform float uCursorStrength;  // 0..1 attraction amount
uniform float uCursorRadius;    // radius of influence (0.05..0.5)
// AW.W8.1 — the velocity-reactive flow: a fast flick injects a transient swirl-burst
// (uCursorBurst, decaying over ~1s) along the pointer velocity (uCursorVelocity),
// distinct from the steady uCursorStrength attraction. Both are PRM-gated (the cursor
// write-path early-outs on reduced-motion, and the master tempo scalar zeroes them).
uniform vec2  uCursorVelocity;  // smoothed pointer velocity (normalized-screen/move)
uniform float uCursorBurst;     // 0..1 transient flick burst
uniform float uStrokeAmount;
uniform float uStrokeScale;
uniform float uStrokeAnisotropy;
uniform int   uStrokeLayers;  // 1 or 2 (crosshatch)
uniform int   uStrokeMode;    // 0 oil (modern gestural), 1 palette-knife, 3 modern-chunky (crayon is uMedium==4, a peer medium)
// AW.W4.1 — the stroke-orientation source: 0 flow (hand-authored flowField), 1
// tensor (the structure-tensor minor eigenvector — the color field's edge-tangent).
uniform int   uStrokeOrient;
uniform float uWetEdge;
uniform float uGranulation;
uniform float uImpasto;
uniform float uBrokenColor;
uniform float uCanvasGrain;

// AW.W4.2 — the impasto relight axis. A movable directional source lighting the
// accumulated paint-height field (diffuse + Blinn specular, in LINEAR before aces()).
// AW.W8 drives uLightDir from the cursor (cursor-as-light). Default = upper-left so
// the still default reads identically to the prior fixed rim.
uniform vec3  uLightDir;    // unit direction (x,y in screen space, z toward viewer)
uniform vec3  uLightColor;  // warm-white tint (linear)

// Motion
uniform float uNucleiDrift;
uniform float uPaletteDrift;
uniform float uBreathDepth;
uniform float uBreathPeriod;

// Output
uniform float uSaturation;
uniform float uPaperGrain;
uniform float uAlpha;

// ── Time rate ────────────────────────────────────────────────────────────────
// The authoring coefficients (uNucleiDrift, uPaletteDrift, uWarpDrift) live in a
// human-friendly 0..~0.05 band — that scale is what the config schema and every
// demo preset are tuned against. But that band, multiplied straight into uTime
// (seconds), yields rad/sec rates so small the field reads visually static (one
// nuclei orbit took ~10 min at the old default). These K_* constants decouple
// the AUTHORING scale from the RAD/SEC scale: each time term wraps its coefficient
// in the matching K_, lifting the same authored value to a perceptible period
// without touching any preset. Tuned so the field reads SLOWLY ALIVE — drift over
// a ~5–15s window, never a frantic pan. These are downstream of uTime, which the
// runtime FREEZES under reduced-motion (t = frozenOffset) before the shader sees
// it, so the lift cannot leak motion into the reduced-motion path.
const float K_NUCLEI = 14.0; // nuclei orbit: ~one cycle per ~45s at default 0.01
const float K_PAL    = 24.0; // palette hue breathe: ~one cycle per ~33s at default
const float K_WARP   = 5.0;  // domain warp scroll: a perceptible fbm-cell traverse

// ── Noise ──────────────────────────────────────────────────────────────────
float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

vec2 hash22(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)),
           dot(p, vec2(269.5, 183.3)));
  return fract(sin(p) * 43758.5453);
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

// The rotated-octave FBM rotation constant — spliced from the shared chunk (AV.W2
// — the one FBM_ROT). The loop below stays aurora-local (2.02 lacunarity +
// uniform-driven octaves, per §3a — only the rotation constant converges).
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

// The sRGB OETF (linearToSrgb) — spliced from the shared procedural-color chunk
// (AV.W2 — the single OETF source; the AV.W1 local copy is deleted here). Aurora's
// linear pipeline closes the seam with this transfer before fragColor (the
// proof:aurora-space-gamma seam).
${OETF_GLSL}

// W5 — the four Ottosson OKLab/OKLCh matrices + their space fns, spliced from the
// SAME shared chunk the goo-blob uses (zero new payload, 1e-6-verified). PI is
// defined first because the chunk's oklabToOklch folds the hue into [0, 2pi).
const float PI = 3.141592653589793;
${OKLCH_MATRICES_GLSL}

// ── OKLCh palette ramp (W5 interp · AX.W11 single-sourced twin) ───────────────
// The muddy-midtone kill: distant-hue stops interpolated by a plain linear mix()
// desaturate toward grey at the midpoint. The OKLab-rectangular lerp (L,a,b) holds
// chroma across the ramp; the OKLCh hue-arc form (deliberate rainbow travel via
// uHuePath increasing/decreasing) sweeps the hue wheel without flipping.
//
// AX.W11 — the ramp (interpolateHueTurns + mixPaletteOklab + mixPaletteOklchArc +
// the smoothstep-eased samplePaletteRamp dispatcher) is SPLICED from the shared
// procedural-color chunk, the SAME single source the WebGPU twin (aurora.wgsl.ts)
// splices — so the ramp can NEVER drift between backends (the AV.W1 two-copy class,
// applied to the ramp). composition.glsl.ts's samplePalette calls samplePaletteRamp.
${PALETTE_RAMP_GLSL}

// Interleaved Gradient Noise (Jimenez) — a 1-LSB triangular dither applied in
// DISPLAY space AFTER the OETF, so 8-bit mid-tone banding on the soft gradient is
// quantization-dithered at the value being quantized (post-transfer, not linear).
float ign(vec2 p) {
    return fract(52.9829189 * fract(dot(p, vec2(0.06711056, 0.00583715))));
}

// Cellular / Worley f1
float cellular(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float m = 1e9;
  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 g = vec2(float(x), float(y));
      vec2 o = hash22(i + g);
      vec2 r = g + o - f;
      m = min(m, dot(r, r));
    }
  }
  return sqrt(m);
}

// ── Warp ──────────────────────────────────────────────────────────────────
vec2 domainWarp(vec2 p, float t) {
  // Quilez canonical double warp
  vec2 q = vec2(fbm(p * uWarpScale + vec2(0.0, 0.0) + t * uWarpDrift * K_WARP),
                fbm(p * uWarpScale + vec2(5.2, 1.3) + t * uWarpDrift * K_WARP));
  vec2 r = vec2(fbm(p * uWarpScale + 4.0 * q + vec2(1.7, 9.2)),
                fbm(p * uWarpScale + 4.0 * q + vec2(8.3, 2.8)));

  vec2 warp = r;
  if (uWarpMode == 1) {
    // cellular — chunky territories (MEADOW block-like)
    float c1 = cellular(p * uWarpScale * 1.5 + vec2(t * uWarpDrift * K_WARP * 2.0, 0.0));
    float c2 = cellular(p * uWarpScale * 1.5 + vec2(11.0, 7.0 + t * uWarpDrift * K_WARP * 2.0));
    warp = vec2(c1, c2);
  } else if (uWarpMode == 2) {
    // hybrid — fbm + cellular averaged
    float c1 = cellular(p * uWarpScale * 1.2);
    float c2 = cellular(p * uWarpScale * 1.2 + vec2(11.0, 7.0));
    warp = mix(r, vec2(c1, c2), 0.5);
  }
  vec2 warped = p + uWarpAmount * warp;

  // Cursor swirl — rotate p around uCursor with radial falloff.
  // This warps the underlying color field so the bands sweep around the pointer.
  if (uCursorStrength > 0.001) {
    vec2 toP = p - uCursor;
    float d = length(toP);
    float r = max(uCursorRadius, 0.01);
    // Smooth falloff; strong near cursor, zero beyond ~1.5× radius.
    float w = exp(-(d * d) / (r * r * 0.45));
    // Max rotation ~120° at cursor center, scaled by strength
    float ang = w * uCursorStrength * 2.1;
    float ca = cos(ang), sa = sin(ang);
    vec2 rotated = vec2(ca * toP.x - sa * toP.y, sa * toP.x + ca * toP.y) + uCursor;
    // Also pinch slightly toward the cursor (gravity) — adds depth to swirl
    float pinch = w * uCursorStrength * 0.08;
    rotated = mix(rotated, uCursor, pinch);
    // Blend original warped position with cursor-rotated version
    warped = mix(warped, rotated + uWarpAmount * warp * 0.7, w * uCursorStrength);
  }

  return warped;
}
` +
    NL +
    AURORA_COMPOSITION_GLSL +
    NL +
    AURORA_FLOW_GLSL +
    NL +
    /* glsl */ `// ── Color utils (OKLCh — W5; the sRGB YIQ hueShift matrix is DELETED) ──────────
const vec3 W_LUMA = vec3(0.2126, 0.7152, 0.0722);

// Linear sRGB → OKLab (the cbrt-LMS path; the goo-blob's srgbToOklab takes gamma,
// here the color field is already linear so we skip the OETF inverse).
vec3 linOklab(vec3 lin) {
  vec3 lms = LINEAR_SRGB_TO_LMS * lin;
  return LMS_TO_OKLAB * (sign(lms) * pow(abs(lms), vec3(1.0 / 3.0)));
}

// Broken color (W5) — hue + chroma jitter at fixed PERCEPTUAL lightness, in OKLCh.
// Broken color is hue variation at constant VALUE, which only OKLCh makes true (the
// prior YIQ-style sRGB rotation muddied value). This is the seam AW.W4's van-Gogh /
// oil-pastel per-stroke pigment jitter consumes (the pigment-variation read).
vec3 brokenColorJitter(vec3 c, float hueSeed, float valueSeed, float strength) {
  float amt = clamp(uBrokenColor * strength, 0.0, 1.0);
  if (amt <= 0.001) return c;
  vec3 lch = oklabToOklch(linOklab(c));
  // ±~16° hue swing + ±~12% chroma swing; L held so value reads constant.
  lch.z += (hueSeed - 0.5) * (32.0 * PI / 180.0) * amt;
  lch.y = max(lch.y * (1.0 + (valueSeed - 0.5) * 0.28 * amt), 0.0);
  return max(oklabToLinearSrgb(oklchToOklab(lch)), vec3(0.0));
}

// Saturation (W5) — chroma scale at fixed L/H in OKLCh (the perceptual saturation,
// replacing the luma-mix sRGB form). amt=1 is identity; amt<1 desaturates toward
// the achromatic axis with NO lightness shift (the muddy-luma-mix grey is gone).
vec3 saturate3(vec3 c, float amt) {
  vec3 lch = oklabToOklch(linOklab(c));
  lch.y = max(lch.y * amt, 0.0);
  return max(oklabToLinearSrgb(oklchToOklab(lch)), vec3(0.0));
}
` +
    NL +
    AURORA_TONEMAP_GLSL +
    NL +
    AURORA_MEDIUMS_PRE_BRUSH_GLSL +
    NL +
    AURORA_BRUSH_GLSL +
    NL +
    AURORA_MEDIUMS_POST_BRUSH_GLSL +
    NL +
    /* glsl */ `
// ── Main ──────────────────────────────────────────────────────────────────
void main() {
  // Normalized 0..1 coordinates for nuclei, domain warp, and medium sampling.
  vec2 uv = vUv;
  vec2 pN = uv;

  float t = uTime;

  // Warp in pN space
  vec2 p_warp = domainWarp(pN, t);

  // Composition
  float paletteId; float valueMod;
  nucleiField(p_warp, t, paletteId, valueMod);
  vec3 col = samplePalette(paletteId);
  col *= 1.0 + uValueVariance * valueMod;

  // Breath — slow global luminance wobble
  float breath = sin(t * 6.2831 / max(uBreathPeriod, 1.0));
  col *= 1.0 + uBreathDepth * breath * 0.5;

  // Medium — crayon (4) is a peer dispatched here, not a mediumOil sub-mode.
  // AW.W4.3/W4.4 — vangogh (5) is the energy-graded atomic-stroke medium;
  // oil-pastel (6) is the reworked deposition+scumble+waxy model. The legacy crayon
  // peer (4) and oil-pastel (6) share the reworked mediumCrayon body (no duplicate).
  if (uMedium == 1) col = mediumPastel(col, pN, t);
  else if (uMedium == 2) col = mediumWatercolor(col, pN, t);
  else if (uMedium == 3) col = mediumOil(col, pN, t);
  else if (uMedium == 4) col = mediumCrayon(col, pN, t);
  else if (uMedium == 5) col = mediumVangogh(col, pN, t);
  else if (uMedium == 6) col = mediumCrayon(col, pN, t);

  // Saturation trim
  col = saturate3(col, uSaturation);

  // Tonemap + film grain
  col = aces(col);
  float grain = hash21(gl_FragCoord.xy + t * 17.0);
  col += (grain - 0.5) * uPaperGrain;

  col = clamp(col * 0.985 + 0.008, 0.0, 1.0);

  // MANDATORY OETF — closes the seam (mirrors metaball.frag.ts:278). The whole
  // pipeline above (linear palette LUT, ACES tonemap, grain) runs in LINEAR; without
  // this transfer the aurora ships ~2.2× too dark (linear 0.5 → ~0.215, not ~0.735).
  col = linearToSrgb(col);

  // 1-LSB triangular IGN dither in DISPLAY space, AFTER the OETF — breaks 8-bit
  // mid-tone banding on the soft gradient. Texture-free (the canonical Jimenez IGN).
  col += (1.0 / 255.0) * (ign(gl_FragCoord.xy) - 0.5);

  // Premultiply operates on DISPLAY-space color (matches the blob: OETF, then premul).
  fragColor = vec4(col * uAlpha, uAlpha);
}
`;
