// AV.W2 — the shared procedural-color/noise GLSL chunk.
//
// ONE source for the GPU-side color/noise math that aurora + goo-blob BOTH need.
// Both shaders ride `useWebGLCanvas` (AU.W6) and both resolve OKLCh through the
// `/color` leaf (AU.W5) CPU-side — but their in-shader math was authored
// INDEPENDENTLY, so the sRGB OETF DIVERGED: the blob applied `linearToSrgb()`
// (AU.W7), aurora did not (it output linear → ~2.2× too dark, the AV.W1 defect).
// AV.W1 fixed aurora by COPYING the blob's OETF — a two-copy duplication. This
// chunk DELETES that duplication: the OETF lives here ONCE, both shaders splice
// it, so it can NEVER again drift between them.
//
// Mechanism: each `export const` is a `/* glsl */` template-literal STRING the
// `.frag.ts` modules interpolate (`${OETF_GLSL}`) into their own `*_SRC` at module
// load. NO `#include` preprocessor, NO new bundler step — the emitted shader is
// character-identical to a hand-inlined one (the splice boundary is the only diff).
//
// What lives here (the genuinely-shared-AND-identical math, AV.W2 §3a):
//   - OETF_GLSL          — the sRGB transfer + inverse (the headline convergence).
//   - OKLCH_MATRICES_GLSL — the four Ottosson `mat3` literals + their space fns.
//   - FBM_ROT_GLSL       — the byte-identical rotated-octave FBM rotation constant.
//   - PALETTE_RAMP_GLSL  — the smoothstep-eased OKLab/OKLCh stop-ramp (AX.W11).
//   - PCG_HASH_GLSL      — the Jarzynski PCG2D integer-bit hash + the 2D simplex
//                          gradient-noise leaf (AX.W12 — the painterly-medium organic
//                          basis; integer-bit kills the `sin()` periodicity-banding,
//                          gradient noise kills the value-noise axis-aligned lattice).
//                          The painterly mediums OPT INTO `gnoise`/`pcgHash2`; the
//                          smooth/atmospheric pole STAYS on the cheap value-noise `fbm`.
//
// What STAYS per-shader (legitimately divergent, NOT over-abstracted — §3a/§3b):
//   - each shader's `hash21` (aurora 2D-fract vs blob 3D-`p3`) + its value-noise.
//   - each shader's `fbm` LOOP (aurora 2.02 lacunarity + uniform octaves vs the
//     blob 2.0 + param octaves) — only the FBM_ROT constant converges, not the loop.
//
// The OKLab/sRGB constants are value.js's EXACT Ottosson values (NOT the
// GM-Shaders/LYGIA convenience matrices, which are ~1e-4 off and fail the 1e-6
// CPU-equivalence gate). `mat3` literals are TRANSPOSED from value.js's row-major
// arrays because GLSL `mat3` is column-major (`mat3 * vec3` dots each column with
// the vector); writing value.js's rows as GLSL columns yields the row-major M·v.
// Hues are in RADIANS. The `__tests__/metaball-color.glsl-port.ts` line-for-line TS
// transcription mirrors THIS chunk (its provenance source of truth);
// `__tests__/blob-color-equivalence.test.ts` is the 8-assertion 1e-6 gate.
//
// This chunk is a pure GLSL string — it imports NO value.js (the blob/watercolor-dot
// value.js-free invariant rides through it; `proof:blob-value-free` holds).

// ── sRGB OETF + inverse ──────────────────────────────────────────────────────
// The single sRGB transfer. Both shaders splice this; it is the convergence
// headline — there is exactly ONE OETF, so aurora's and the blob's can never drift.

// sRGB OETF inverse — gamma sRGB channel → linear-light. Matches value.js's
// transfer (gamma 2.4, offset 0.055, slope 12.92, transition 0.04045/12.92).
// sRGB OETF — linear-light channel → gamma sRGB (the mandatory close-the-seam).
export const OETF_GLSL = /* glsl */ `
float srgbToLinearCh(float c) {
    return c <= 0.04045 ? c / 12.92 : pow((c + 0.055) / 1.055, 2.4);
}
vec3 srgbToLinear(vec3 c) {
    return vec3(srgbToLinearCh(c.r), srgbToLinearCh(c.g), srgbToLinearCh(c.b));
}

float linearToSrgbCh(float c) {
    return c <= 0.0031308 ? c * 12.92 : 1.055 * pow(c, 1.0 / 2.4) - 0.055;
}
vec3 linearToSrgb(vec3 c) {
    return vec3(linearToSrgbCh(c.r), linearToSrgbCh(c.g), linearToSrgbCh(c.b));
}`;

// ── Rotated-octave FBM rotation constant ─────────────────────────────────────
// A fixed ~0.5 rad 2x2 rotation between octaves breaks the axis-aligned banding
// the un-rotated lattice noise produces. The CONSTANT is byte-identical across
// both shaders (it is the only FBM part that converges — each `fbm` LOOP stays
// local per §3a, since the lacunarity/octave-source legitimately differ).
export const FBM_ROT_GLSL = /* glsl */ `const mat2 FBM_ROT = mat2(0.8, 0.6, -0.6, 0.8);`;

// ── Ottosson OKLab/OKLCh matrices + space conversions ────────────────────────
// value.js's EXACT Ottosson constants, transposed for GLSL column-major. The blob
// splices this for its perceptually-uniform OKLCh perturbation; aurora has no
// in-shader OKLCh path today, so it does NOT splice this (KISS — splice only what
// the shader references).
export const OKLCH_MATRICES_GLSL = /* glsl */ `
// value.js LINEAR_SRGB_TO_LMS (constants.ts), row-major; written here as GLSL
// columns (= the transpose) so mat3 * vec3 evaluates the row-major M·v.
const mat3 LINEAR_SRGB_TO_LMS = mat3(
    0.4122214708, 0.2119034982, 0.0883024619,
    0.5363325363, 0.6806995451, 0.2817188376,
    0.0514459929, 0.1073969566, 0.6299787005
);

// value.js srgbToOKLab's INLINE LMS→OKLab coefficients (gamut.ts lines 295-297 —
// these differ at the ~1e-9 digit from LMS_TO_OKLAB_MATRIX; use the inline ones to
// mirror the exact value.js path), row-major → GLSL columns.
const mat3 LMS_TO_OKLAB = mat3(
    0.2104542553, 1.9779984951, 0.0259040371,
    0.7936177850, -2.4285922050, 0.7827717662,
    -0.0040720468, 0.4505937099, -0.8086757660
);

// value.js OKLAB_TO_LMS_COEFF (constants.ts), row-major → GLSL columns. Rows:
// l = [1, 0.3963377774, 0.2158037573], m = [1, -0.1055613458, -0.0638541728],
// s = [1, -0.0894841775, -1.2914855480].
const mat3 OKLAB_TO_LMS = mat3(
    1.0, 1.0, 1.0,
    0.3963377774, -0.1055613458, -0.0894841775,
    0.2158037573, -0.0638541728, -1.2914855480
);

// value.js LMS_TO_LINEAR_SRGB (constants.ts), row-major → GLSL columns.
const mat3 LMS_TO_LINEAR_SRGB = mat3(
    4.0767416621, -1.2684380046, -0.0041960863,
    -3.3077115913, 2.6097574011, -0.7034186147,
    0.2309699292, -0.3413193965, 1.7076147010
);

// Gamma sRGB → raw OKLab (L, a, b). Mirrors value.js srgbToOKLab.
vec3 srgbToOklab(vec3 c) {
    vec3 lin = srgbToLinear(c);
    vec3 lms = LINEAR_SRGB_TO_LMS * lin;
    vec3 lmsCbrt = sign(lms) * pow(abs(lms), vec3(1.0 / 3.0));
    return LMS_TO_OKLAB * lmsCbrt;
}

// Raw OKLab (L, a, b) → linear sRGB. Mirrors value.js oklabToLinearSRGB.
vec3 oklabToLinearSrgb(vec3 lab) {
    vec3 lms_ = OKLAB_TO_LMS * lab;
    vec3 lms = lms_ * lms_ * lms_;
    return LMS_TO_LINEAR_SRGB * lms;
}

// OKLab → OKLCh: H in RADIANS. Mirrors value.js rawOklabToOklch (which returns
// degrees; we stay in radians and only fold to [0, 2pi)).
vec3 oklabToOklch(vec3 lab) {
    float C = length(lab.yz);
    float H = atan(lab.z, lab.y);
    if (H < 0.0) H += 2.0 * PI;
    return vec3(lab.x, C, H);
}

// OKLCh (H radians) → OKLab. Mirrors value.js rawOklchToOklab.
vec3 oklchToOklab(vec3 lch) {
    return vec3(lch.x, lch.y * cos(lch.z), lch.y * sin(lch.z));
}`;

// ── Palette ramp (AX.W11) ─────────────────────────────────────────────────────
// The stop-to-stop interpolation: a smoothstep ease on the inter-stop parameter,
// then a huePath dispatch — OKLab-rectangular (chroma-holding, no grey midpoint)
// for the default/adjacent ramp, the OKLCh hue-arc (deliberate rainbow travel)
// only when huePath requests increasing(2)/decreasing(3). The ramp lives HERE (the
// shared chunk) so aurora's samplePalette splices one source. Depends on
// OKLCH_MATRICES (the space fns) + PI being in scope (the consumer splices the
// matrices chunk + defines PI first).
export const PALETTE_RAMP_GLSL = /* glsl */ `
// value.js interpolateHue in the NORMALIZED-TURNS domain (h_rad/TAU → turns, the
// exact .5/+1.0 branch per method, fract() wrap, *TAU back). A radians-native port
// (PI thresholds / +TAU wrap) diverges 180° at the antipode. methods: 0 shorter,
// 1 longer, 2 increasing, 3 decreasing.
float interpolateHueTurns(float h0, float h1, float t, int method) {
  float TAU = 2.0 * PI;
  float a = h0 / TAU;
  float b = h1 / TAU;
  float i = b - a;
  if (method == 0) {              // shorter
    if (i > 0.5) a += 1.0; else if (i < -0.5) b += 1.0;
  } else if (method == 1) {       // longer
    if (i > 0.0 && i < 0.5) a += 1.0; else if (i > -0.5 && i <= 0.0) b += 1.0;
  } else if (method == 2) {       // increasing
    if (i < 0.0) b += 1.0;
  } else {                        // decreasing
    if (i > 0.0) a += 1.0;
  }
  float r = a + t * (b - a);
  r = fract(r);                   // (r % 1 + 1) % 1 — fract is non-negative in GLSL
  return r * TAU;                 // back to radians
}

// Linear-sRGB endpoint pair → OKLab-rectangular interpolation → linear sRGB. Holds
// chroma across the ramp (no grey midpoint). The default/shorter ramp path.
vec3 mixPaletteOklab(vec3 linA, vec3 linB, float t) {
  vec3 labA = LMS_TO_OKLAB * (sign(LINEAR_SRGB_TO_LMS * linA) * pow(abs(LINEAR_SRGB_TO_LMS * linA), vec3(1.0 / 3.0)));
  vec3 labB = LMS_TO_OKLAB * (sign(LINEAR_SRGB_TO_LMS * linB) * pow(abs(LINEAR_SRGB_TO_LMS * linB), vec3(1.0 / 3.0)));
  vec3 lab = mix(labA, labB, t);
  return oklabToLinearSrgb(lab);
}

// Linear-sRGB endpoint pair → OKLCh interpolation along the huePath arc → linear
// sRGB. L and C lerp; H walks the chosen arc. The deliberate-rainbow path.
vec3 mixPaletteOklchArc(vec3 linA, vec3 linB, float t, int method) {
  vec3 labA = LMS_TO_OKLAB * (sign(LINEAR_SRGB_TO_LMS * linA) * pow(abs(LINEAR_SRGB_TO_LMS * linA), vec3(1.0 / 3.0)));
  vec3 labB = LMS_TO_OKLAB * (sign(LINEAR_SRGB_TO_LMS * linB) * pow(abs(LINEAR_SRGB_TO_LMS * linB), vec3(1.0 / 3.0)));
  vec3 lchA = oklabToOklch(labA);
  vec3 lchB = oklabToOklch(labB);
  float L = mix(lchA.x, lchB.x, t);
  float C = mix(lchA.y, lchB.y, t);
  float H = interpolateHueTurns(lchA.z, lchB.z, t, method);
  return oklabToLinearSrgb(oklchToOklab(vec3(L, C, H)));
}

// The ramp dispatcher aurora's samplePalette splices. tRaw is the raw inter-stop
// parameter [0,1]; the smoothstep ease + the huePath branch live HERE so the ramp is
// one source. increasing(2)/decreasing(3) take the OKLCh hue-arc (rainbow sweep);
// every other method takes the OKLab-rectangular straight line (no hue detour).
vec3 samplePaletteRamp(vec3 a, vec3 b, float tRaw, int huePath) {
  float t = smoothstep(0.0, 1.0, tRaw);
  if (huePath == 2 || huePath == 3) {
    return mixPaletteOklchArc(a, b, t, huePath);
  }
  return mixPaletteOklab(a, b, t);
}`;

// ── PCG2D integer-bit hash + 2D simplex gradient noise (AX.W12) ───────────────
// The painterly-medium organic noise basis. The value-noise/`sin()`-hash basis the
// smooth aurora rides (aurora's local hash21/vnoise) is the WRONG primitive for
// organic paper/pigment grain — its chained `fract(p*…)`/`fract(sin(p)*…)` lattice
// reads as "digital procedural texture" (the axis-aligned blocky banding the painterly
// mediums magnify). This leaf is the SOTA NPR basis:
//   - pcg2d — Mark Jarzynski's canonical PCG2D integer-bit permuted-congruential hash
//     ("Hash Functions for GPU Rendering", JCGT 2020). Integer-bit, so it carries NO
//     `sin()` periodicity-banding and NO float-`fract` axis-correlation. Two LCG mixes
//     + an xor-shift fold per axis: high statistical quality, ALU-cheap, no texture.
//   - pcgHash2 — a float→[0,1) scalar hash: floatBitsToUint the lattice coordinate,
//     pcg2d it, floatConstruct the high word back to [0,1). The integer-bit construction
//     the digest's harden:aurora-blob correction names (NET-NEW — there is no in-tree
//     GLSL PCG hash; this AUTHORS one).
//   - gnoise — 2D SIMPLEX gradient noise (Gustavson's skew/unskew lattice; the
//     patent-expired, lower-directional-artifact gradient basis) seeded by pcg2d
//     gradients. Gradient noise is zero at the lattice nodes (no value-noise blocky
//     plateaus); the simplex skew kills the square-lattice directional bias classic
//     Perlin carries.
// The integer pipeline is bit-exact: `uint`/`floatBitsToUint`/`>>` wrap mod 2^32 and
// reinterpret the IEEE-754 bits deterministically; the only float math is the final
// `* (1.0 / 4294967296.0)` normalization + the simplex skew/falloff.
export const PCG_HASH_GLSL = /* glsl */ `
// Jarzynski PCG2D — uvec2 → uvec2 permuted-congruential hash (JCGT 2020).
uvec2 pcg2d(uvec2 v) {
  v = v * 1664525u + 1013904223u;
  v.x += v.y * 1664525u;
  v.y += v.x * 1664525u;
  v = v ^ (v >> 16u);
  v.x += v.y * 1664525u;
  v.y += v.x * 1664525u;
  v = v ^ (v >> 16u);
  return v;
}

// Float→[0,1) scalar hash: bit-reinterpret the lattice coordinate, pcg2d it, take the
// high word back to [0,1). Integer-bit — no sin() periodicity, no float-fract lattice.
float pcgHash2(vec2 p) {
  uvec2 u = floatBitsToUint(p);
  return float(pcg2d(u).x) * (1.0 / 4294967296.0);
}

// Integer-lattice gradient: pcg2d the integer cell, fold the hash to an angle, return
// the unit gradient vector. The gradient basis (not a scalar value) is what makes the
// noise zero at the nodes (no value-noise plateaus).
vec2 pcgGrad2(ivec2 cell) {
  uvec2 h = pcg2d(uvec2(cell));
  float ang = float(h.x) * (1.0 / 4294967296.0) * 6.28318530717958647692;
  return vec2(cos(ang), sin(ang));
}

// 2D SIMPLEX gradient noise (Gustavson skew). The skew transform F2/G2 maps the square
// lattice onto a simplex (triangular) grid — no axis-aligned directional bias. Each of
// the three simplex corners contributes grad·offset shaped by a radial (0.5 - r²)⁴
// falloff. Output is ~[-1, 1]; callers remap to [0,1] via 0.5 + 0.5*gnoise.
float gnoise(vec2 p) {
  const float F2 = 0.36602540378443864676; // (sqrt(3) - 1) / 2
  const float G2 = 0.21132486540518711775; // (3 - sqrt(3)) / 6
  float s = (p.x + p.y) * F2;
  vec2 i = floor(p + s);
  float tt = (i.x + i.y) * G2;
  vec2 x0 = p - (i - tt);                    // offset from the simplex origin corner
  ivec2 i1 = (x0.x > x0.y) ? ivec2(1, 0) : ivec2(0, 1);
  vec2 x1 = x0 - vec2(i1) + G2;
  vec2 x2 = x0 - 1.0 + 2.0 * G2;
  ivec2 ii = ivec2(i);
  float n = 0.0;
  float t0 = 0.5 - dot(x0, x0);
  if (t0 > 0.0) { t0 *= t0; n += t0 * t0 * dot(pcgGrad2(ii), x0); }
  float t1 = 0.5 - dot(x1, x1);
  if (t1 > 0.0) { t1 *= t1; n += t1 * t1 * dot(pcgGrad2(ii + i1), x1); }
  float t2 = 0.5 - dot(x2, x2);
  if (t2 > 0.0) { t2 *= t2; n += t2 * t2 * dot(pcgGrad2(ii + ivec2(1, 1)), x2); }
  return 70.0 * n;                           // normalize to ~[-1, 1]
}`;
