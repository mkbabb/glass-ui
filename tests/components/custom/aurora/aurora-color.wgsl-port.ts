// AW.W7a — the TS transcription of the shared procedural-color chunk's WGSL TWIN
// (OETF_WGSL + OKLCH_MATRICES_WGSL + FBM_ROT_WGSL).
//
// WGSL cannot run in vitest/node, so the WGSL string is evaluated via this
// hand-transcribed WGSL→TS port that MIRRORS the WGSL line-for-line — the SAME shape
// as `metaball-color.glsl-port.ts` mirrors the GLSL. `proof:aurora-wgsl-equivalence`
// asserts THIS port equals the GLSL oracle (`metaball-color.glsl-port.ts`) to 1e-6
// over the asymmetric witness `#3a7bd5` — so the WGSL string and the GLSL string
// provably compute the same numbers. This is NOT a second independent oracle (which
// would re-open the two-copy divergence): both ports certify against the SAME value.js
// Ottosson constants, never a new oracle.
//
// The `mat3x3f` literals in OKLCH_MATRICES_WGSL are the SAME transposed value.js
// columns the GLSL uses (WGSL mat3x3f is column-major — takes columns — so NO
// re-transpose). Here the math is expressed as explicit row-dot-vector products (the
// same row-major M·v), identical numbers, the transpose a pure syntax concern.

type Vec3 = [number, number, number];

const PI = Math.PI;

// ── Transfer (mirror OETF_WGSL srgbToLinearCh / linearToSrgbCh — value.js exact) ──
export function srgbToLinearCh(c: number): number {
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}
export function srgbToLinear(c: Vec3): Vec3 {
    return [srgbToLinearCh(c[0]), srgbToLinearCh(c[1]), srgbToLinearCh(c[2])];
}
export function linearToSrgbCh(c: number): number {
    return c <= 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 1.0 / 2.4) - 0.055;
}
export function linearToSrgb(c: Vec3): Vec3 {
    return [linearToSrgbCh(c[0]), linearToSrgbCh(c[1]), linearToSrgbCh(c[2])];
}

// ── The four Ottosson matrices (mirror the WGSL mat3x3f literals; row-major rows,
// applied as M·v — the WGSL columns are these rows transposed, identical numbers). ──
const LINEAR_SRGB_TO_LMS: readonly number[] = [
    0.4122214708, 0.5363325363, 0.0514459929,
    0.2119034982, 0.6806995451, 0.1073969566,
    0.0883024619, 0.2817188376, 0.6299787005,
];
const LMS_TO_OKLAB: readonly number[] = [
    0.2104542553, 0.7936177850, -0.0040720468,
    1.9779984951, -2.4285922050, 0.4505937099,
    0.0259040371, 0.7827717662, -0.8086757660,
];
const OKLAB_TO_LMS: readonly number[] = [
    1.0, 0.3963377774, 0.2158037573,
    1.0, -0.1055613458, -0.0638541728,
    1.0, -0.0894841775, -1.2914855480,
];
const LMS_TO_LINEAR_SRGB: readonly number[] = [
    4.0767416621, -3.3077115913, 0.2309699292,
    -1.2684380046, 2.6097574011, -0.3413193965,
    -0.0041960863, -0.7034186147, 1.7076147010,
];

function mul3(m: readonly number[], v: Vec3): Vec3 {
    return [
        m[0]! * v[0] + m[1]! * v[1] + m[2]! * v[2],
        m[3]! * v[0] + m[4]! * v[1] + m[5]! * v[2],
        m[6]! * v[0] + m[7]! * v[1] + m[8]! * v[2],
    ];
}

// ── Space conversions (mirror the WGSL fns, same order). ──
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
export function oklabToLinearSrgb(lab: Vec3): Vec3 {
    const lms_ = mul3(OKLAB_TO_LMS, lab);
    const lms: Vec3 = [lms_[0] ** 3, lms_[1] ** 3, lms_[2] ** 3];
    return mul3(LMS_TO_LINEAR_SRGB, lms);
}
export function oklabToOklch(lab: Vec3): Vec3 {
    const C = Math.hypot(lab[1], lab[2]);
    let H = Math.atan2(lab[2], lab[1]);
    if (H < 0) H += 2 * PI;
    return [lab[0], C, H];
}
export function oklchToOklab(lch: Vec3): Vec3 {
    return [lch[0], lch[1] * Math.cos(lch[2]), lch[1] * Math.sin(lch[2])];
}

// ── The palette ramp (mirror PALETTE_RAMP_WGSL — AX.W11) ──
// Line-for-line with the shared procedural-color chunk's WGSL ramp twin. The
// equivalence gate asserts THIS == the GLSL oracle's samplePaletteRamp to 1e-6
// across huePath modes (the gate-hole close W07 left).

function smoothstep01(x: number): number {
    const t = Math.min(1, Math.max(0, x));
    return t * t * (3 - 2 * t);
}

// mirror PALETTE_RAMP_WGSL interpolateHueTurns (radians in/out, turns domain inside).
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
    const frac = r - Math.floor(r); // WGSL fract — non-negative
    return frac * TAU;
}

export function mixPaletteOklab(linA: Vec3, linB: Vec3, t: number): Vec3 {
    const labA = srgbOklabFromLinear(linA);
    const labB = srgbOklabFromLinear(linB);
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
    const labA = srgbOklabFromLinear(linA);
    const labB = srgbOklabFromLinear(linB);
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

// LINEAR sRGB → raw OKLab (the cbrt-LMS step the ramp uses on already-linear stops;
// NOT the gamma-input srgbToOklab — the palette is CPU-baked to linear, so the ramp
// skips the OETF and goes straight to LMS).
function srgbOklabFromLinear(lin: Vec3): Vec3 {
    const lms = mul3(LINEAR_SRGB_TO_LMS, lin);
    const lmsCbrt: Vec3 = [
        Math.sign(lms[0]) * Math.pow(Math.abs(lms[0]), 1 / 3),
        Math.sign(lms[1]) * Math.pow(Math.abs(lms[1]), 1 / 3),
        Math.sign(lms[2]) * Math.pow(Math.abs(lms[2]), 1 / 3),
    ];
    return mul3(LMS_TO_OKLAB, lmsCbrt);
}

// ── The full WGSL color chain (gamma in → OKLab → OKLCh → OKLab → linear →
// linearToSrgb out), mirroring the WGSL twin's path. The identity baseline the
// equivalence gate compares against the GLSL oracle's blobColorChain. ──
export function auroraWgslColorChain(gammaRgb: Vec3): Vec3 {
    const oklch = oklabToOklch(srgbToOklab(gammaRgb));
    const lin = oklabToLinearSrgb(oklchToOklab(oklch));
    return clamp3(linearToSrgb(lin));
}

function clamp01(c: number): number {
    return Math.min(1, Math.max(0, c));
}
export function clamp3(c: Vec3): Vec3 {
    return [clamp01(c[0]), clamp01(c[1]), clamp01(c[2])];
}

export type { Vec3 };
