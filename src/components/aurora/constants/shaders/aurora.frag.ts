// Aurora fragment-shader assembler. Cohesive partials compose one source string at
// module load.
//
// Stages: composition (palette LUT + nuclei softmax) · flow (flow-field dispatch) ·
// brush (curved swept-brushstroke SDF) · mediums (the four PEER mediums) · tonemap
// (ACES). The noise/warp foundation + the color utils + main() stay inline here: the
// noise block carries ${FBM_ROT_GLSL}/${OETF_GLSL}, and main() is the
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
// The sRGB OETF (`linearToSrgb`) and FBM_ROT rotation constant come from the shared
// procedural-color source used by Aurora and Blob. Aurora keeps its own
// hash21/vnoise/fbm loop because its 2D hash, 2.02 lacunarity, and uniform octaves
// differ from Blob. Its palette is baked CPU-side in linear space.

import {
    FBM_ROT_GLSL,
    OETF_GLSL,
    OKLCH_MATRICES_GLSL,
    PALETTE_RAMP_GLSL,
    PCG_HASH_GLSL,
} from "../../../../composables/glass/procedural/color.glsl";
import { CURL_FBM_GLSL } from "../../../../composables/glass/webgl/shaders/flow.glsl";
import { AURORA_COMPOSITION_GLSL } from "./composition.glsl";
import { AURORA_FLOW_GLSL } from "./flow.glsl";
import { AURORA_TONEMAP_GLSL } from "./tonemap.glsl";
import { AURORA_BRUSH_GLSL } from "./brush.glsl";
import {
    AURORA_MEDIUMS_PRE_BRUSH_GLSL,
    AURORA_MEDIUMS_POST_BRUSH_GLSL,
} from "./mediums.glsl";

// A single newline joins adjacent stages.
const NL = "\n";

export const FRAGMENT_SRC =
    /* glsl */ `#version 300 es
precision highp float;

in vec2 vUv;
out vec4 fragColor;

#define MAX_NUCLEI 8
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
// Defaults (1.0, 0.0) reduce to the original circular Gaussian.
uniform float uNucleiElong[MAX_NUCLEI];
uniform float uNucleiAngle[MAX_NUCLEI];
uniform float uSoftmaxBeta;
uniform float uValueVariance;

// Warp
uniform float uWarpAmount;
uniform float uWarpScale;
uniform float uWarpDrift;
uniform int   uWarpMode;      // 0=fbm 1=cellular 2=hybrid 3=curl (opt-in Bridson flow warp)
uniform int   uNoiseOctaves;

// Medium
// 0 smooth, 1 pastel, 2 watercolor, 3 oil, 4 crayon (peer medium — wax pigment
// on paper tooth; NOT an oil-stroke sub-mode, so it dispatches at main() level).
uniform int   uMedium;
// Hue-arc method for OKLCh palette interpolation. Mirrors value.js's
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
uniform float uStrokeAmount;
uniform float uStrokeScale;
uniform float uStrokeAnisotropy;
uniform int   uStrokeLayers;  // 1 or 2 (crosshatch)
uniform int   uStrokeMode;    // 0 oil (modern gestural), 1 palette-knife, 3 modern-chunky (crayon is uMedium==4, a peer medium)
// Stroke-orientation source: 0 flow (hand-authored flowField), 1
// tensor (the structure-tensor minor eigenvector — the color field's edge-tangent).
uniform int   uStrokeOrient;
uniform float uWetEdge;
uniform float uGranulation;
uniform float uImpasto;
uniform float uBrokenColor;
uniform float uCanvasGrain;

// Metal-medium knobs (uMedium==8/9). uMetalPolish scales
// the specular catch intensity; uMetalHeightScale scales the luma-relief → normal tilt.
// On the WGSL primary these ride the free cursor.z/.w pad lanes (uniformBridgeWGPU); the
// The fragment shader carries them as uniforms. Non-metal configs write 0.
uniform float uMetalPolish;
uniform float uMetalHeightScale;

// The impasto relight axis is a movable directional source lighting the
// accumulated paint-height field (diffuse + Blinn specular, in LINEAR before aces()).
// The cursor drives uLightDir; the upper-left default supplies the still pose.
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

// Chroma-floor strength (0 = off,
// 1 = the vivid default). The shader lifts any pale zone's OKLab chroma toward
// uVividness * VIVID_TARGET, hue-preserving, warm-anchored below the near-gray epsilon.
uniform float uVividness;

// ── Time rate ────────────────────────────────────────────────────────────────
// The authoring coefficients (uNucleiDrift, uPaletteDrift, uWarpDrift) live in a
// human-friendly 0..~0.05 band — that scale is what the config schema and every
// demo preset are tuned against. But that band, multiplied straight into uTime
// (seconds), yields rad/sec rates so small the field reads visually static (one
// nuclei orbit would otherwise take minutes). These K_* constants decouple
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

// The rotated-octave FBM rotation constant is spliced from the shared chunk
// as the sole FBM_ROT. The loop below stays aurora-local (2.02 lacunarity +
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

// The shared curl-noise flow chunk (curlFBM) is spliced from the single source
// procedural surfaces share (the shared-chunk precedent, applied to FLOW). The
// chunk owns ONLY the basis-agnostic curl operator; the host owns the noise basis —
// aurora wraps its OWN fbm as the scalar potential (so curl rides the same 2.02-
// lacunarity loop the rest of the warp uses). The curl operator is consumed ONLY on
// the OPT-IN warpMode == "curl" branch (uWarpMode == 3) — the default warp paths are
// byte-untouched (no curl call), so every existing aurora gate stays byte-equivalent.
${CURL_FBM_GLSL}

// The scalar fbm potential ψ for curlFBM — aurora's own fbm. The splice above
// forward-declares potentialFBM; this defines it (ES 3.00 allows the prototype).
float potentialFBM(vec2 p) { return fbm(p); }

// The painterly-medium organic noise basis (Jarzynski PCG2D integer-bit hash
// + 2D simplex gradient noise), SPLICED from the shared procedural-color chunk (the
// single hash source).
// The painterly mediums (mediumOil's tooth/granulation) opt into pcgHash2/gnoise for
// organic paper/pigment grain; the smooth/atmospheric pole KEEPS its cheap value-noise
// fbm above (the cost tiering is preserved: this is an additive basis,
// not a blanket upgrade). The aurora-local hash21/vnoise/fbm loop stays (legitimately
// divergent per the chunk's §3a).
${PCG_HASH_GLSL}

// The sRGB OETF (linearToSrgb) is spliced from the shared procedural-color chunk,
// the sole OETF source; the local copy is deleted here. Aurora's linear pipeline
// closes the color-space seam with this transfer before fragColor.
${OETF_GLSL}

// W5 — the four Ottosson OKLab/OKLCh matrices + their space fns, spliced from the
// SAME shared chunk the goo-blob uses (zero new payload, 1e-6-verified). PI is
// defined first because the chunk's oklabToOklch folds the hue into [0, 2pi).
const float PI = 3.141592653589793;
${OKLCH_MATRICES_GLSL}

// ── OKLCh palette ramp (single-sourced twin) ───────────────────────────────
// The muddy-midtone kill: distant-hue stops interpolated by a plain linear mix()
// desaturate toward grey at the midpoint. The OKLab-rectangular lerp (L,a,b) holds
// chroma across the ramp; the OKLCh hue-arc form (deliberate rainbow travel via
// uHuePath increasing/decreasing) sweeps the hue wheel without flipping.
//
// The ramp (interpolateHueTurns + mixPaletteOklab + mixPaletteOklchArc +
// the smoothstep-eased samplePaletteRamp dispatcher) is SPLICED from the shared
// procedural-color chunk (the single ramp source). composition.glsl.ts's
// samplePalette calls samplePaletteRamp.
${PALETTE_RAMP_GLSL}

// Interleaved Gradient Noise (Jimenez) — a 1-LSB triangular dither applied in
// DISPLAY space AFTER the OETF, so 8-bit mid-tone banding on the soft gradient is
// quantization-dithered at the value being quantized (post-transfer, not linear).
float ign(vec2 p) {
    return fract(52.9829189 * fract(dot(p, vec2(0.06711056, 0.00583715))));
}

// Cellular, Worley f1
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
  } else if (uWarpMode == 3) {
    // Curl (Bridson flow warp). The divergence-free curl of an fbm potential
    // advects the field along a source-free swirl — folds + stretches like fluid
    // advection, never the source-y bulge a raw fbm gradient produces. The potential
    // scrolls on the same warp-drift clock; curlFBM is the shared chunk's operator.
    vec2 fp = p * uWarpScale + vec2(t * uWarpDrift * K_WARP);
    warp = curlFBM(fp);
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
// prior YIQ-style sRGB rotation muddied value). Van-Gogh and oil-pastel consume
// this seam for per-stroke pigment jitter.
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

// The chroma floor operates in OKLab: lightness + hue are
// untouched, chroma is lifted toward the floor. A pale zone BLOOMS to transmission-fit;
// a vivid zone (already above the floor) is byte-untouched. The near-gray hue guard is
// STRUCTURAL: below VIVID_EPS the (a,b) direction is precision noise, so the lift
// synthesizes along the WARM anchor (amber, both components positive) — NEVER the noisy
// near-zero vector, NEVER a cold/teal hue. uVividness:0 returns c identically (the gated
// byte-identity opt-out). Mode factor: a dark route lifts the floor a touch (a dim field
// needs more chroma to read vivid through glass) — derived from the field's own L.
const float VIVID_TARGET = 0.115;
const float VIVID_EPS = 0.012;
// The warm amber anchor in OKLab (a,b): OKLCh hue 70°, unit chroma. cos/sin(70°) — both
// POSITIVE (warm yellow-orange). The near-gray fallback direction, the warm-floor law.
const vec2 VIVID_WARM_ANCHOR = vec2(0.34202, 0.93969);
vec3 vividnessFloor(vec3 c) {
  if (uVividness <= 0.0001) return c;
  vec3 lab = linOklab(c);
  float C = length(lab.yz);
  // Mode-aware: dim fields (low L) get a slightly higher target so they read vivid
  // through glass. The mix factor is gentle (1.0–1.18) so light routes are unaffected.
  float modeLift = mix(1.18, 1.0, clamp(lab.x * 1.4, 0.0, 1.0));
  float Cmin = uVividness * VIVID_TARGET * modeLift;
  vec2 hueDir = (C > VIVID_EPS) ? lab.yz / C : VIVID_WARM_ANCHOR;
  lab.yz = hueDir * max(C, Cmin);
  return max(oklabToLinearSrgb(lab), vec3(0.0));
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

  // Medium dispatch: each is a first-class body with no shared dispatch.
  //   1 pastel · 2 watercolor · 3 oil · 4 crayon (DRY tooth-multiply) ·
  //   5 van-Gogh (atomic comma/crescent dabs) · 6 oil-pastel (stroke deposition) ·
  //   7 kuwahara (anisotropic-Kuwahara edge-preserving painterly finish).
  // van-Gogh is no longer a mediumOil passthrough; oil-pastel and crayon no longer
  // share a body — they share the SUBSTRATE (the tooth/placement helpers), not the
  // dispatch body (slice 8 F0/F1). Kuwahara is OPT-IN (default-off — no preset selects
  // it unless a config explicitly sets medium:"kuwahara"); the smooth default + the
  // van-Gogh HERO + the existing painterly bodies are byte-unchanged by its addition.
  if (uMedium == 1) col = mediumPastel(col, pN, t);
  else if (uMedium == 2) col = mediumWatercolor(col, pN, t);
  else if (uMedium == 3) col = mediumOil(col, pN, t);
  else if (uMedium == 4) col = mediumCrayon(col, pN, t);
  else if (uMedium == 5) col = mediumVangogh(col, pN, t);
  else if (uMedium == 6) col = mediumOilPastel(col, pN, t);
  else if (uMedium == 7) col = mediumKuwahara(col, pN, t);
  // The mutually exclusive metal mediums are opt-in at uMedium==8/9;
  // the smooth default + every existing medium are byte-unchanged by these arms).
  else if (uMedium == 8) col = mediumMetal(col, pN, t);
  else if (uMedium == 9) col = mediumMetalGradient(col, pN, t);

  // Cursor-local luminance lean. Position, radius, and the CPU-folded strength are the
  // same four packed values on WebGL2 and WebGPU; absent interactivity writes strength 0.
  vec2 cursorDelta = pN - uCursor;
  float cursorRadius = max(uCursorRadius, 0.01);
  float cursorLean = exp(-dot(cursorDelta, cursorDelta) / (cursorRadius * cursorRadius * 0.5));
  col *= 1.0 + 0.12 * cursorLean * uCursorStrength;

  // Saturation trim
  col = saturate3(col, uSaturation);

  // The chroma floor is warm-anchored and hue-preserving. It lifts a
  // pale zone toward the transmissive floor so warm glass over the field reads
  // transmissive-not-gray; a vivid zone is untouched; uVividness:0 is a no-op.
  col = vividnessFloor(col);

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
