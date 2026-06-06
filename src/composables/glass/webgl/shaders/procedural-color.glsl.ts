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
