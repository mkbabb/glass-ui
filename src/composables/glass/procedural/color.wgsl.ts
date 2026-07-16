// BB.W-VIZ-SUITE (W-AURORA-WGPU) — the shared procedural-color/noise WGSL chunk.
//
// The WGSL TWIN of the AV.W2 shared GLSL chunk
// (`src/composables/glass/procedural/color.glsl.ts`). ONE source for the
// GPU-side color/noise math the WebGPU primaries (`aurora.wgsl`, later
// `metaball.wgsl`/`concentric.wgsl`) splice — exactly as the GLSL chunk is the one
// source the WebGL2 `.frag.ts` fallbacks splice. So the OETF + the Ottosson OKLCh
// matrices + the FBM rotation + the palette ramp can never DRIFT between the WGSL
// primary and the GLSL fallback (the AV.W1 root cause, transposed to the cross-backend
// axis): the parity-ΔE bar measures the two paths against ONE math.
//
// Mechanism mirror: each `export const` is a `/* wgsl */` template-literal STRING the
// `.wgsl` assemblers interpolate (`${OETF_WGSL}`) into their own source at module load.
// NO `#include`, NO new bundler step — the same splice pattern the GLSL chunk uses.
//
// The numeric constants are BYTE-IDENTICAL to the GLSL chunk (the parity contract): WGSL
// `mat3x3<f32>` is column-major exactly as GLSL `mat3`, so value.js's row-major arrays
// are written as the SAME transposed columns. Hues in RADIANS. The OETF transfer
// (gamma 2.4, offset 0.055, slope 12.92, transition 0.04045/0.0031308) matches value.js.
//
// This chunk is a pure WGSL string — it imports NO value.js (the value.js-free invariant
// rides through it, the GLSL chunk's discipline preserved).

// ── sRGB OETF + inverse ──────────────────────────────────────────────────────
// The single sRGB transfer. The WGSL primary's linear pipeline closes the seam with
// `linearToSrgb` before the fragment output — byte-identical to the GLSL `linearToSrgb`.
export const OETF_WGSL = /* wgsl */ `
fn srgbToLinearCh(c: f32) -> f32 {
  if (c <= 0.04045) { return c / 12.92; }
  return pow((c + 0.055) / 1.055, 2.4);
}
fn srgbToLinear(c: vec3<f32>) -> vec3<f32> {
  return vec3<f32>(srgbToLinearCh(c.r), srgbToLinearCh(c.g), srgbToLinearCh(c.b));
}

fn linearToSrgbCh(c: f32) -> f32 {
  if (c <= 0.0031308) { return c * 12.92; }
  return 1.055 * pow(c, 1.0 / 2.4) - 0.055;
}
fn linearToSrgb(c: vec3<f32>) -> vec3<f32> {
  return vec3<f32>(linearToSrgbCh(c.r), linearToSrgbCh(c.g), linearToSrgbCh(c.b));
}`;

// ── Rotated-octave FBM rotation constant ─────────────────────────────────────
// The byte-identical FBM rotation `mat2(0.8, 0.6, -0.6, 0.8)` — WGSL spells the literal
// with explicit columns (mat2x2<f32> is column-major, same column ordering as the GLSL
// `mat2(0.8, 0.6, -0.6, 0.8)` which is column 0 = (0.8, 0.6), column 1 = (-0.6, 0.8)).
export const FBM_ROT_WGSL = /* wgsl */ `const FBM_ROT: mat2x2<f32> = mat2x2<f32>(0.8, 0.6, -0.6, 0.8);`;

// ── Ottosson OKLab/OKLCh matrices + space conversions ────────────────────────
// value.js's EXACT Ottosson constants — the SAME transposed columns as the GLSL chunk
// (`mat3x3<f32>` column-major). PI must be in scope (the consumer defines it first, as
// the GLSL chunk requires). `sign(x) * pow(abs(x), …)` is the cbrt path (negative-safe).
export const OKLCH_MATRICES_WGSL = /* wgsl */ `
// value.js LINEAR_SRGB_TO_LMS, row-major → WGSL columns (= the transpose).
const LINEAR_SRGB_TO_LMS: mat3x3<f32> = mat3x3<f32>(
  0.4122214708, 0.2119034982, 0.0883024619,
  0.5363325363, 0.6806995451, 0.2817188376,
  0.0514459929, 0.1073969566, 0.6299787005
);

// value.js srgbToOKLab's INLINE LMS→OKLab coefficients, row-major → WGSL columns.
const LMS_TO_OKLAB: mat3x3<f32> = mat3x3<f32>(
  0.2104542553, 1.9779984951, 0.0259040371,
  0.7936177850, -2.4285922050, 0.7827717662,
  -0.0040720468, 0.4505937099, -0.8086757660
);

// value.js OKLAB_TO_LMS_COEFF, row-major → WGSL columns.
const OKLAB_TO_LMS: mat3x3<f32> = mat3x3<f32>(
  1.0, 1.0, 1.0,
  0.3963377774, -0.1055613458, -0.0894841775,
  0.2158037573, -0.0638541728, -1.2914855480
);

// value.js LMS_TO_LINEAR_SRGB, row-major → WGSL columns.
const LMS_TO_LINEAR_SRGB: mat3x3<f32> = mat3x3<f32>(
  4.0767416621, -1.2684380046, -0.0041960863,
  -3.3077115913, 2.6097574011, -0.7034186147,
  0.2309699292, -0.3413193965, 1.7076147010
);

fn cbrt3(v: vec3<f32>) -> vec3<f32> {
  return sign(v) * pow(abs(v), vec3<f32>(1.0 / 3.0));
}

// Gamma sRGB → raw OKLab (L, a, b). Mirrors value.js srgbToOKLab.
fn srgbToOklab(c: vec3<f32>) -> vec3<f32> {
  let lin = srgbToLinear(c);
  let lms = LINEAR_SRGB_TO_LMS * lin;
  return LMS_TO_OKLAB * cbrt3(lms);
}

// Raw OKLab (L, a, b) → linear sRGB. Mirrors value.js oklabToLinearSRGB.
fn oklabToLinearSrgb(lab: vec3<f32>) -> vec3<f32> {
  let lms_ = OKLAB_TO_LMS * lab;
  let lms = lms_ * lms_ * lms_;
  return LMS_TO_LINEAR_SRGB * lms;
}

// OKLab → OKLCh: H in RADIANS, folded to [0, 2pi). Mirrors value.js rawOklabToOklch.
fn oklabToOklch(lab: vec3<f32>) -> vec3<f32> {
  let C = length(lab.yz);
  var H = atan2(lab.z, lab.y);
  if (H < 0.0) { H = H + 2.0 * PI; }
  return vec3<f32>(lab.x, C, H);
}

// OKLCh (H radians) → OKLab. Mirrors value.js rawOklchToOklab.
fn oklchToOklab(lch: vec3<f32>) -> vec3<f32> {
  return vec3<f32>(lch.x, lch.y * cos(lch.z), lch.y * sin(lch.z));
}`;

// ── Palette ramp (the AX.W11 stop-to-stop interpolation) ──────────────────────
// The WGSL twin of PALETTE_RAMP_GLSL: a smoothstep ease then a huePath dispatch —
// OKLab-rectangular (chroma-holding) for the default/adjacent ramp, the OKLCh hue-arc
// only for huePath increasing(2)/decreasing(3). Depends on OKLCH_MATRICES (the space
// fns) + PI in scope (the consumer splices the matrices + defines PI first).
export const PALETTE_RAMP_WGSL = /* wgsl */ `
// value.js interpolateHue in the NORMALIZED-TURNS domain. methods: 0 shorter,
// 1 longer, 2 increasing, 3 decreasing.
fn interpolateHueTurns(h0: f32, h1: f32, t: f32, method: i32) -> f32 {
  let TAU = 2.0 * PI;
  var a = h0 / TAU;
  var b = h1 / TAU;
  let i = b - a;
  if (method == 0) {              // shorter
    if (i > 0.5) { a = a + 1.0; } else if (i < -0.5) { b = b + 1.0; }
  } else if (method == 1) {       // longer
    if (i > 0.0 && i < 0.5) { a = a + 1.0; } else if (i > -0.5 && i <= 0.0) { b = b + 1.0; }
  } else if (method == 2) {       // increasing
    if (i < 0.0) { b = b + 1.0; }
  } else {                        // decreasing
    if (i > 0.0) { a = a + 1.0; }
  }
  var r = a + t * (b - a);
  r = fract(r);                   // fract is non-negative in WGSL
  return r * TAU;                 // back to radians
}

// Linear-sRGB endpoint pair → OKLab-rectangular interpolation → linear sRGB.
fn mixPaletteOklab(linA: vec3<f32>, linB: vec3<f32>, t: f32) -> vec3<f32> {
  let labA = LMS_TO_OKLAB * cbrt3(LINEAR_SRGB_TO_LMS * linA);
  let labB = LMS_TO_OKLAB * cbrt3(LINEAR_SRGB_TO_LMS * linB);
  let lab = mix(labA, labB, t);
  return oklabToLinearSrgb(lab);
}

// Linear-sRGB endpoint pair → OKLCh hue-arc interpolation → linear sRGB.
fn mixPaletteOklchArc(linA: vec3<f32>, linB: vec3<f32>, t: f32, method: i32) -> vec3<f32> {
  let labA = LMS_TO_OKLAB * cbrt3(LINEAR_SRGB_TO_LMS * linA);
  let labB = LMS_TO_OKLAB * cbrt3(LINEAR_SRGB_TO_LMS * linB);
  let lchA = oklabToOklch(labA);
  let lchB = oklabToOklch(labB);
  let L = mix(lchA.x, lchB.x, t);
  let C = mix(lchA.y, lchB.y, t);
  let H = interpolateHueTurns(lchA.z, lchB.z, t, method);
  return oklabToLinearSrgb(oklchToOklab(vec3<f32>(L, C, H)));
}

// The ramp dispatcher (the samplePalette splices it). tRaw is the raw inter-stop
// parameter [0,1]; the smoothstep ease + the huePath branch live here so the ramp is
// one source. increasing(2)/decreasing(3) take the OKLCh hue-arc; every other method
// takes the OKLab-rectangular straight line.
fn samplePaletteRamp(a: vec3<f32>, b: vec3<f32>, tRaw: f32, huePath: i32) -> vec3<f32> {
  let t = smoothstep(0.0, 1.0, tRaw);
  if (huePath == 2 || huePath == 3) {
    return mixPaletteOklchArc(a, b, t, huePath);
  }
  return mixPaletteOklab(a, b, t);
}`;
