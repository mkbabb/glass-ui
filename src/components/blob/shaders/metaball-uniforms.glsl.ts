// The GooBlob metaball fragment-shader UNIFORM-DECLARATION block — the `#version`
// header, the precision/IO decls, the full uniform cohort (resolution/time/color,
// pointer, body, surface, satellite, trail, palette, velocity), and the shared
// `PI` const — carved out of metaball.frag.ts as the leading GLSL chunk. The
// assembler splices it FIRST into METABALL_FRAGMENT_SRC; the emitted shader string
// is character-equivalent to the prior single leading literal.
export const METABALL_UNIFORMS_GLSL = /* glsl */ `#version 300 es
precision highp float;

in vec2 vUv;
out vec4 fragColor;

uniform vec2 uResolution;
uniform float uTime;
uniform vec3 uBaseColor;

// Multi-stop palette (W11.b) — 2-4 in-family OKLCh stops (uploaded GAMMA sRGB, like
// uBaseColor). uStopCount <= 1 falls back to uBaseColor (the single-color default,
// zero regression). MAX_BLOB_STOPS is a compile-time #define.
#define MAX_BLOB_STOPS 4
uniform int uStopCount;
uniform vec3 uPalette[MAX_BLOB_STOPS];

// Pointer
uniform vec2 uPointer;
uniform float uPointerActive;
uniform float uPointerAttraction;
uniform float uPointerStrength;

// Main body
uniform float uBodyRadius;

// Pulsation
uniform float uPulsePhase;
uniform float uPulseAmp;

// Surface noise
uniform float uNoiseAmp;
uniform float uNoiseFreq;
uniform float uNoiseSpeed;

// Gooey
uniform float uSmoothK;
uniform float uMerge;   // 0 = quadratic smin, 1 = circular smin (rounder menisci)

// The stripped-surface gate. 1.0 = the flat shadowless fill-only floor; 0.0 = the
// dressed pipeline. It is derived from the single uMorphT surface scalar.
uniform float uStage;

// BD.W-GOO-CAROUSEL-DECK — the blob to meatball SHADING-MORPH scalar. 0.0 = the flat blob
// fill (byte-identical to the STAGE-1 floor), 1.0 = the fully-dressed lit meatball; the
// in-between LERPS the surface shading (NOT the geometry — the smin field is shared). The
// renderer clamps it from config.morphT. Animating 0 to 1 gets the live morph.
uniform float uMorphT;

// AX.W16 (arm 5) — the PRE-FBM bounding-discard radius (UV space). main() early-outs
// to a transparent write for any fragment OUTSIDE this radius BEFORE the two 3-octave
// FBM calls + the OKLCh round-trip. The renderer uploads it PADDED by every
// outward-expanding term (body + eccentric orbit + sat radius + smin band + FBM edge
// amplitude + click-pulse + a lean/squash safety pad) so it NEVER clips the wet
// meniscus (IQ: inflate the bound to match any outward op).
uniform float uMaxReach;

// Membrane — domain-warp strength on the FBM edge displacement (0 = plain fbm).
uniform float uWarpAmp;

// Lit glass surface (W9.b) — gated behind uLit so the flat fill stays default.
uniform float uLit;             // 0 = flat fill (default), 1 = lit droplet
uniform vec3 uRimColor;         // Fresnel rim tint (GAMMA sRGB, via the /color leaf)
uniform vec3 uLightDir;         // normalized light direction (x, y, z)
uniform float uSpecStrength;    // Blinn-Phong specular weight
uniform float uSpecShininess;   // specular exponent (16-64, tight glint)
uniform float uRimPower;        // Fresnel/Schlick exponent (~2-3)
uniform float uRimStrength;     // Fresnel rim weight

// BC.W-GOOBLOB-MEATBALL — the procedural 2D SDF soft-shadow march (T2, the GLSL twin of
// the WGSL res.z/res.w lanes). uShadow gates the IQ rmshadows soft contact shadow that
// FOLLOWS the irregular silhouette; uShadowSoftness is the penumbra hardness (4-48).
uniform float uShadow;          // 0 = no shadow, 1 = the soft contact shadow ON
uniform float uShadowSoftness;  // penumbra hardness (inverse light-source size, 4-48)

// Iridescence + fake subsurface (W11.a) — translucent-gel read.
uniform float uIridescence;     // warm-pearl rim sheen weight (0 = off)
uniform float uIridHue;         // base hue (radians) the cosine palette biases toward (warm)
uniform float uIridSpeed;       // animated-thickness scroll for the iridescent t
uniform float uSssScale;        // fast-SSS back-light weight
uniform float uSssPower;        // fast-SSS exponent
uniform float uCoreGlow;        // thickness-driven inner-luminosity lift

// Color perturbation (perceptually uniform — OKLCh L/C/h)
uniform float uHueRange;        // degrees of hue swing (converted to radians)
uniform float uSatShift;        // OKLCh chroma swing
uniform float uBrightnessShift; // OKLCh lightness bias
uniform float uColorNoiseFreq;
uniform float uColorNoiseSpeed;

// Satellites (max 4)
#define MAX_SATS 4
uniform int uSatCount;
uniform vec2 uSatPos[MAX_SATS];
uniform float uSatRadius[MAX_SATS];
uniform float uSatOpacity[MAX_SATS];

// F9.R1 (BG.W-BLOB-SATELLITE-SHADE) — the per-satellite EXPLICIT-SHADE seam (the GL
// color-seam widen the value.js hero blob asked for; the BA-VJS-5 / C-1 residual, the
// W-GOO-REDRESS arm-B book discharged). uSatColorActive == 0 is the DEFAULT (the derived
// palette shade — byte-identical to HEAD): blendSatColor() early-returns and touches
// nothing. When a consumer supplies explicit per-satellite shades (uSatColor[i], GAMMA
// sRGB, at uSatColorAmt[i] weight — typically 1) the fragment blends the base palette
// OKLCh toward each satellite's shade, weighted by that satellite's smin-field proximity
// at this pixel. The body keeps the derived base (the ask is per-SATELLITE).
uniform int uSatColorActive;
uniform vec3 uSatColor[MAX_SATS];
uniform float uSatColorAmt[MAX_SATS];

// Pointer trail (W10) — a decaying-radius pseudopod toward the cursor. uTrail is a
// COMPILE-TIME-SIZED array (GLSL ES 3.00 forbids a uniform-sized array) with a
// DYNAMIC break on uTrailCount, mirroring the satellite loop. Later samples paint
// smaller metaballs (r *= 1 - i/N) so the trail tapers into a tail.
#define TRAIL_N 15
uniform int uTrailCount;
uniform vec2 uTrailPos[TRAIL_N];
uniform float uTrailRadius[TRAIL_N];

// Velocity-driven volume-preserving squash-and-stretch (W10).
uniform vec2 uVelocity;   // smoothed pointer velocity (motion direction + speed)
uniform float uStretch;   // squash-stretch magnitude (0 = off)

const float PI = 3.141592653589793;
`;
