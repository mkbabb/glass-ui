// The TS transcription of the shared procedural-color GLSL chunk's OKLCh
// color path (re-pointed the provenance: the OETF + the Ottosson matrices +
// the space conversions now live ONCE in
// `src/composables/glass/procedural/color.glsl.ts`, which both
// `metaball.frag.ts` and `aurora.frag.ts` splice — this port mirrors THAT chunk).
//
// A TEXTUALLY-PARALLEL port of the shader's color half — gamma sRGB → linear →
// OKLab → OKLCh → [perturb] → OKLab → linear → linearToSrgb. SAME constants, SAME
// order, line-for-line with the GLSL, so it provably mirrors the shader. The
// 8-assertion gate (`__tests__/blob-color-equivalence.test.ts`) asserts THIS port
// matches value.js's CPU Ottosson core to 1e-6 — and because the port mirrors the
// GLSL byte for byte, the gate transitively certifies the shader.
//
// The matrices are value.js's EXACT Ottosson constants. In the GLSL they are
// written as TRANSPOSED `mat3` literals (GLSL is column-major); here the math is
// expressed as explicit row-dot-vector products — the same row-major M·v — so the
// numbers are identical and the transpose is purely a GLSL-syntax concern. Hues
// are in RADIANS (matching the shader; value.js's raw OKLCh uses degrees, so the
// gate converts where it compares against value.js).

type Vec3 = [number, number, number];

const PI = Math.PI;

// ── Transfer functions (mirror the GLSL `srgbToLinearCh` / `linearToSrgbCh`) ──

// sRGB OETF inverse — gamma sRGB channel → linear-light. value.js's transfer
// (gamma 2.4, offset 0.055, slope 12.92, transition 0.04045/12.92 = 0.0031308).
export function srgbToLinearCh(c: number): number {
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}
export function srgbToLinear(c: Vec3): Vec3 {
    return [srgbToLinearCh(c[0]), srgbToLinearCh(c[1]), srgbToLinearCh(c[2])];
}

// sRGB OETF — linear-light channel → gamma sRGB (the mandatory close-the-seam).
export function linearToSrgbCh(c: number): number {
    return c <= 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 1.0 / 2.4) - 0.055;
}
export function linearToSrgb(c: Vec3): Vec3 {
    return [linearToSrgbCh(c[0]), linearToSrgbCh(c[1]), linearToSrgbCh(c[2])];
}

// ── Ottosson matrices (value.js EXACT; row-major rows, applied as M·v) ──

// value.js LINEAR_SRGB_TO_LMS (constants.ts).
const LINEAR_SRGB_TO_LMS: readonly number[] = [
    0.4122214708, 0.5363325363, 0.0514459929,
    0.2119034982, 0.6806995451, 0.1073969566,
    0.0883024619, 0.2817188376, 0.6299787005,
];

// value.js srgbToOKLab's INLINE LMS→OKLab coefficients (gamut.ts lines 295-297).
const LMS_TO_OKLAB: readonly number[] = [
    0.2104542553, 0.7936177850, -0.0040720468,
    1.9779984951, -2.4285922050, 0.4505937099,
    0.0259040371, 0.7827717662, -0.8086757660,
];

// value.js OKLAB_TO_LMS_COEFF (constants.ts): l/m/s rows.
const OKLAB_TO_LMS: readonly number[] = [
    1.0, 0.3963377774, 0.2158037573,
    1.0, -0.1055613458, -0.0638541728,
    1.0, -0.0894841775, -1.2914855480,
];

// value.js LMS_TO_LINEAR_SRGB (constants.ts).
const LMS_TO_LINEAR_SRGB: readonly number[] = [
    4.0767416621, -3.3077115913, 0.2309699292,
    -1.2684380046, 2.6097574011, -0.3413193965,
    -0.0041960863, -0.7034186147, 1.7076147010,
];

// Row-major M·v — matches the GLSL `mat3 * vec3` after the literal transpose.
function mul3(m: readonly number[], v: Vec3): Vec3 {
    return [
        m[0]! * v[0] + m[1]! * v[1] + m[2]! * v[2],
        m[3]! * v[0] + m[4]! * v[1] + m[5]! * v[2],
        m[6]! * v[0] + m[7]! * v[1] + m[8]! * v[2],
    ];
}

// ── Space conversions (mirror the GLSL functions, same order) ──

// Gamma sRGB → raw OKLab (L, a, b). Mirrors value.js srgbToOKLab.
export function srgbToOklab(c: Vec3): Vec3 {
    const lin = srgbToLinear(c);
    const lms = mul3(LINEAR_SRGB_TO_LMS, lin);
    const lmsCbrt: Vec3 = [
        Math.sign(lms[0]) * Math.pow(Math.abs(lms[0]), 1 / 3),
        Math.sign(lms[1]) * Math.pow(Math.abs(lms[1]), 1 / 3),
        Math.sign(lms[2]) * Math.pow(Math.abs(lms[2]), 1 / 3),
    ];
    return mul3(LMS_TO_OKLAB, lmsCbrt);
}

// Raw OKLab (L, a, b) → linear sRGB. Mirrors value.js oklabToLinearSRGB.
export function oklabToLinearSrgb(lab: Vec3): Vec3 {
    const lms_ = mul3(OKLAB_TO_LMS, lab);
    const lms: Vec3 = [lms_[0] ** 3, lms_[1] ** 3, lms_[2] ** 3];
    return mul3(LMS_TO_LINEAR_SRGB, lms);
}

// OKLab → OKLCh: H in RADIANS, folded to [0, 2pi). Mirrors value.js
// rawOklabToOklch (which returns degrees; the shader stays in radians).
export function oklabToOklch(lab: Vec3): Vec3 {
    const C = Math.hypot(lab[1], lab[2]);
    let H = Math.atan2(lab[2], lab[1]);
    if (H < 0) H += 2 * PI;
    return [lab[0], C, H];
}

// OKLCh (H radians) → OKLab. Mirrors value.js rawOklchToOklab.
export function oklchToOklab(lch: Vec3): Vec3 {
    return [lch[0], lch[1] * Math.cos(lch[2]), lch[1] * Math.sin(lch[2])];
}

// ── Gamut (hue-preserving inward chroma clamp — mirrors gamutClampOklch) ──

export function inGamut(lin: Vec3): boolean {
    return (
        lin[0] >= 0 && lin[0] <= 1 &&
        lin[1] >= 0 && lin[1] <= 1 &&
        lin[2] >= 0 && lin[2] <= 1
    );
}

export function gamutClampOklch(lch: Vec3): Vec3 {
    const lin = oklabToLinearSrgb(oklchToOklab(lch));
    if (inGamut(lin)) return lch;
    let lo = 0.0;
    let hi = lch[1];
    for (let i = 0; i < 16; i++) {
        const mid = 0.5 * (lo + hi);
        const test: Vec3 = [lch[0], mid, lch[2]];
        if (inGamut(oklabToLinearSrgb(oklchToOklab(test)))) {
            lo = mid;
        } else {
            hi = mid;
        }
    }
    return [lch[0], lo, lch[2]];
}

// ── The full forward chain (gamma in → gamma out), no perturbation ──

/**
 * The shader's color path with zero perturbation: gamma sRGB → linear → OKLab →
 * OKLCh → gamut-clamp → OKLab → linear → linearToSrgb. The identity baseline the
 * gate's round-trip assertion exercises.
 */
export function blobColorChain(gammaRgb: Vec3): Vec3 {
    const oklch = gamutClampOklch(oklabToOklch(srgbToOklab(gammaRgb)));
    const lin = oklabToLinearSrgb(oklchToOklab(oklch));
    return clamp3(linearToSrgb(lin));
}

function clamp01(c: number): number {
    return Math.min(1, Math.max(0, c));
}
export function clamp3(c: Vec3): Vec3 {
    return [clamp01(c[0]), clamp01(c[1]), clamp01(c[2])];
}

// ── The palette ramp (mirror PALETTE_RAMP_GLSL —; the GLSL ORACLE) ──
// Line-for-line with the shared procedural-color chunk's GLSL ramp. This is the
// oracle the WGSL port's samplePaletteRamp is asserted against to 1e-6 (the
// proof:aurora-wgsl-equivalence samplePalette gate-hole close).

function smoothstep01(x: number): number {
    const t = Math.min(1, Math.max(0, x));
    return t * t * (3 - 2 * t);
}

// LINEAR sRGB → raw OKLab (cbrt-LMS on already-linear stops; the palette is CPU-baked
// to linear so the ramp skips the OETF — mirrors the GLSL mixPalette* bodies).
function oklabFromLinear(lin: Vec3): Vec3 {
    const lms = mul3(LINEAR_SRGB_TO_LMS, lin);
    const lmsCbrt: Vec3 = [
        Math.sign(lms[0]) * Math.pow(Math.abs(lms[0]), 1 / 3),
        Math.sign(lms[1]) * Math.pow(Math.abs(lms[1]), 1 / 3),
        Math.sign(lms[2]) * Math.pow(Math.abs(lms[2]), 1 / 3),
    ];
    return mul3(LMS_TO_OKLAB, lmsCbrt);
}

export function interpolateHueTurns(
    h0: number,
    h1: number,
    t: number,
    method: number,
): number {
    const TAU = 2 * PI;
    let a = h0 / TAU;
    let b = h1 / TAU;
    const i = b - a;
    if (method === 0) {
        if (i > 0.5) a += 1.0;
        else if (i < -0.5) b += 1.0;
    } else if (method === 1) {
        if (i > 0.0 && i < 0.5) a += 1.0;
        else if (i > -0.5 && i <= 0.0) b += 1.0;
    } else if (method === 2) {
        if (i < 0.0) b += 1.0;
    } else {
        if (i > 0.0) a += 1.0;
    }
    const r = a + t * (b - a);
    const frac = r - Math.floor(r); // GLSL fract — non-negative
    return frac * TAU;
}

export function mixPaletteOklab(linA: Vec3, linB: Vec3, t: number): Vec3 {
    const labA = oklabFromLinear(linA);
    const labB = oklabFromLinear(linB);
    const lab: Vec3 = [
        labA[0] + (labB[0] - labA[0]) * t,
        labA[1] + (labB[1] - labA[1]) * t,
        labA[2] + (labB[2] - labA[2]) * t,
    ];
    return oklabToLinearSrgb(lab);
}

export function mixPaletteOklchArc(
    linA: Vec3,
    linB: Vec3,
    t: number,
    method: number,
): Vec3 {
    const labA = oklabFromLinear(linA);
    const labB = oklabFromLinear(linB);
    const lchA = oklabToOklch(labA);
    const lchB = oklabToOklch(labB);
    const L = lchA[0] + (lchB[0] - lchA[0]) * t;
    const C = lchA[1] + (lchB[1] - lchA[1]) * t;
    const H = interpolateHueTurns(lchA[2], lchB[2], t, method);
    return oklabToLinearSrgb(oklchToOklab([L, C, H]));
}

export function samplePaletteRamp(
    a: Vec3,
    b: Vec3,
    tRaw: number,
    huePath: number,
): Vec3 {
    const t = smoothstep01(tRaw);
    if (huePath === 2 || huePath === 3) {
        return mixPaletteOklchArc(a, b, t, huePath);
    }
    return mixPaletteOklab(a, b, t);
}

// ── iridescence + fake-SSS (OKLCh modifications mirroring metaball.frag.ts) ──

const TWO_PI = 2 * PI;

/**
 * Warm-biased iridescence — the IQ cosine-palette OKLCh-hue shift the shader
 * applies BEFORE the gamut clamp (mirrors the `uIridescence` block). `fres` is the
 * rim-weighted Fresnel angle [0,1], `noise` the FBM color field [0,1]. The hue is
 * biased to the warm `iridHue` (radians); the chroma is lifted toward a warm-pearl
 * band but CAPPED (`+0.04*w` clamped to `+0.08`) so it never goes garish. Returns
 * the modified OKLCh stop [L, C, h(rad)].
 */
export function applyIridescence(
    lch: Vec3,
    fres: number,
    noise: number,
    iridHue: number,
    iridescence: number,
    t: number,
): Vec3 {
    if (iridescence <= 0) return lch;
    const tt = fres + 0.3 * noise + t;
    const iridHueShifted = iridHue + 0.18 * PI * Math.cos(TWO_PI * tt);
    const w = fres * iridescence;
    const h = lch[2] + (iridHueShifted - lch[2]) * w; // mix(lch.z, iridHue, w)
    const C = Math.min(lch[1] + 0.04 * w, lch[1] + 0.08); // warm-pearl chroma cap
    const L = Math.min(lch[0] + 0.05 * w, 1.0);
    return [L, C, h];
}

/**
 * Fake subsurface translucency — the thickness inner-glow + the fast-SSS back-light
 * the shader applies in OKLCh before the gamut clamp (mirrors the `uCoreGlow ||
 * uSssScale` block). `thickness` is [0 at rim, 1 deep in]; `back` is the precomputed
 * back-light dot (the shader's `pow(clamp(dot(V,-(L+N*thickness)),0,1), power)`).
 */
export function applyFakeSss(
    lch: Vec3,
    thickness: number,
    back: number,
    coreGlow: number,
    sssScale: number,
): Vec3 {
    if (coreGlow <= 0 && sssScale <= 0) return lch;
    let L = Math.min(lch[0] + coreGlow * thickness, 1.0);
    const sss = back * sssScale * (1 - thickness);
    L = Math.min(L + sss, 1.0);
    const h = lch[2] + sss * 0.1; // warm the leaking edge
    return [L, lch[1], h];
}

// ── multi-stop palette — OKLab interpolation with a midpoint chroma-bump ──

/**
 * Interpolate between two OKLCh stops in OKLab (the shader's `uPalette[N]` interp),
 * with a MIDPOINT CHROMA-BUMP: linear OKLab `mix` of two vivid hues dips chroma at
 * the midpoint (passing near grey); the bump lifts chroma back toward the endpoints'
 * level so the ramp stays saturated. `bump` is the lift amount (0 = plain mix).
 * Returns the interpolated OKLCh stop.
 */
export function oklabLerpStop(a: Vec3, b: Vec3, t: number, bump: number): Vec3 {
    // OKLCh → OKLab, lerp, → OKLCh.
    const labA = oklchToOklab(a);
    const labB = oklchToOklab(b);
    const lab: Vec3 = [
        labA[0] + (labB[0] - labA[0]) * t,
        labA[1] + (labB[1] - labA[1]) * t,
        labA[2] + (labB[2] - labA[2]) * t,
    ];
    const lch = oklabToOklch(lab);
    // Midpoint chroma-bump: a bell (peaks at t=0.5) lifts C.
    const bell = Math.sin(PI * t);
    return [lch[0], lch[1] + bump * bell, lch[2]];
}

// ── The per-satellite explicit-shade blend ──
// The color half of the shader `blendSatColor` (metaball.frag.ts). One satellite carries
// a GAMMA-sRGB shade + an effective mix weight (the shader's `w = (1 - smoothstep(-r, k,
// d)) * amt` proximity term — a scalar INPUT here; the SDF geometry is asserted at the
// live/render layer, not this color port). The blend is in OKLab (the samplePaletteOklch
// convention — no hue wrap). DEFAULT OFF: `active === false` returns the base OKLCh
// UNCHANGED with ZERO conversion (the shader's `if (uSatColorActive == 0) return oklch;`
// early-return — the byte-identical guarantee, NOT an OKLab round-trip).

/** One satellite's explicit shade + its effective (proximity × amt) mix weight. */
export interface SatShade {
    /** GAMMA-sRGB shade [r, g, b] in [0,1]. */
    rgb: Vec3;
    /** The effective per-satellite mix weight (the shader's `w`, folded proximity × amt). */
    weight: number;
}

/**
 * Blend a base OKLCh toward the explicit per-satellite shades, in OKLab. `active`
 * mirrors the shader `uSatColorActive`: false returns the base UNCHANGED (byte-identical
 * default). true folds each satellite's shade in sequentially (`mix(lab, satLab, w)`,
 * clamped) — the SEQUENTIAL order matters (a later satellite mixes over the earlier
 * result, matching the shader's loop). Returns the blended OKLCh.
 */
export function blendSatColor(oklch: Vec3, active: boolean, sats: SatShade[]): Vec3 {
    if (!active) return oklch;
    let lab = oklchToOklab(oklch);
    for (const s of sats) {
        const w = clamp01(s.weight);
        const satLab = srgbToOklab(s.rgb);
        lab = [
            lab[0] + (satLab[0] - lab[0]) * w,
            lab[1] + (satLab[1] - lab[1]) * w,
            lab[2] + (satLab[2] - lab[2]) * w,
        ];
    }
    return oklabToOklch(lab);
}

export type { Vec3 };
