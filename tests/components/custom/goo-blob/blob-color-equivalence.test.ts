import { describe, expect, it } from "vitest";

import {
    oklabToLinearSRGB,
    oklabToRgb255,
    rawOklabToOklch,
    rawOklchToOklab,
    srgbToOKLab,
} from "@mkbabb/value.js";

import {
    applyFakeSss,
    applyIridescence,
    blobColorChain,
    gamutClampOklch,
    inGamut,
    linearToSrgb,
    linearToSrgbCh,
    oklabLerpStop,
    oklabToOklch,
    oklabToLinearSrgb,
    oklchToOklab,
    srgbToOklab,
    type Vec3,
} from "./metaball-color.glsl-port";

/**
 * AU.W7 — the 8-assertion CPU-equivalence gate for the goo-blob OKLCh shader path
 * (DEC-AT-7 LINEAR half). `metaball-color.glsl-port.ts` is a line-for-line TS
 * transcription of `metaball.frag.ts`'s color half; this gate asserts the port
 * matches value.js's canonical Ottosson core (`@mkbabb/value.js`) to 1e-6.
 *
 * Because the port mirrors the GLSL byte for byte (same constants, same order,
 * the only delta being the GLSL `mat3` literal transpose vs. the port's explicit
 * row-dot products), passing this gate transitively certifies the shader. The
 * asymmetric witness `#3a7bd5` is the trap detector: a transposed matrix OR a
 * GM-Shaders/LYGIA convenience matrix (~1e-4 off) DIVERGES — a symmetric witness
 * could pass a transpose error by accident, so the witness is deliberately skew.
 */

const EPS = 1e-6;

// value.js raw OKLCh uses DEGREES; the shader/port uses RADIANS. Bridge here.
const DEG2RAD = Math.PI / 180;

function maxAbsDelta(a: readonly number[], b: readonly number[]): number {
    let m = 0;
    for (let i = 0; i < a.length; i++) m = Math.max(m, Math.abs(a[i]! - b[i]!));
    return m;
}

// value.js's EXACT linear→gamma sRGB transfer (transfer.ts / gamut.ts inline:
// gamma 2.4, offset 0.055, slope 12.92, transition 0.04045/12.92 = 0.0031308).
// value.js does not export it; reconstructed here from its published constants as
// the gamma-encode reference for assertion (3).
function valueJsLinearToSrgb(c: number): number {
    const SRGB_LINEAR_TRANSITION = 0.04045 / 12.92;
    const sign = c < 0 ? -1 : 1;
    const abs = c * sign;
    if (abs <= SRGB_LINEAR_TRANSITION) return c * 12.92;
    return sign * (1.055 * abs ** (1 / 2.4) - 0.055);
}

// A reference forward chain via value.js primitives (gamma → … → gamma), with NO
// perturbation and the same hue-preserving gamut clamp the port runs. Mirrors
// `blobColorChain` using value.js for every space hop.
function valueJsBlobChain(gammaRgb: Vec3): Vec3 {
    const [L, a, b] = srgbToOKLab(gammaRgb[0], gammaRgb[1], gammaRgb[2]);
    const [Lo, C, Hdeg] = rawOklabToOklch(L, a, b);
    // gamut clamp in OKLCh radians (port-equivalent), then back via value.js.
    const clamped = gamutClampOklch([Lo, C, Hdeg * DEG2RAD]);
    const [La, aa, bb] = rawOklchToOklab(clamped[0], clamped[1], (clamped[2] / DEG2RAD));
    const lin = oklabToLinearSRGB(La, aa, bb);
    return [
        Math.min(1, Math.max(0, valueJsLinearToSrgb(lin[0]))),
        Math.min(1, Math.max(0, valueJsLinearToSrgb(lin[1]))),
        Math.min(1, Math.max(0, valueJsLinearToSrgb(lin[2]))),
    ];
}

const hexToRgb01 = (hex: string): Vec3 => {
    const h = hex.replace("#", "");
    return [
        parseInt(h.slice(0, 2), 16) / 255,
        parseInt(h.slice(2, 4), 16) / 255,
        parseInt(h.slice(4, 6), 16) / 255,
    ];
};

// Asymmetric witness — r≠g≠b, off-axis hue. A transpose or convenience-matrix
// error cannot pass this by symmetry.
const WITNESS = "#3a7bd5";

const SPACE_COLORS = ["#ff0000", "#00ff00", "#0000ff"];

describe("goo-blob OKLCh color path ≡ value.js Ottosson core (AU.W7, DEC-AT-7)", () => {
    // (1) round-trip identity — gamma → … → gamma on a mid gray returns the input.
    it("(1) round-trips a mid gray (gamma→OKLCh→gamma identity)", () => {
        const gray: Vec3 = [0.5, 0.5, 0.5];
        const out = blobColorChain(gray);
        expect(maxAbsDelta(out, gray)).toBeLessThanOrEqual(EPS);
    });

    // (2) EXACT-matrix check on the asymmetric witness — the trap detector. The
    // port's srgbToOklab MUST equal value.js's srgbToOKLab to 1e-6; a transpose or
    // a ~1e-4 convenience matrix diverges here.
    it("(2) exact-matrix witness #3a7bd5: port srgbToOklab === value.js (1e-6, trap detector)", () => {
        const rgb = hexToRgb01(WITNESS);
        const portLab = srgbToOklab(rgb);
        const refLab = srgbToOKLab(rgb[0], rgb[1], rgb[2]);
        const delta = maxAbsDelta(portLab, refLab);
        expect(delta).toBeLessThanOrEqual(EPS);
        // and the reverse leg: OKLab → linear sRGB.
        const portLin = oklabToLinearSrgb(portLab);
        const refLin = oklabToLinearSRGB(refLab[0]!, refLab[1]!, refLab[2]!);
        expect(maxAbsDelta(portLin, refLin)).toBeLessThanOrEqual(EPS);
    });

    // (3) OETF agreement — the port's linearToSrgb matches value.js's gamma encode.
    it("(3) linearToSrgb === value.js gamma encode (the mandatory OETF)", () => {
        const samples = [0.0, 0.0015, 0.0031308, 0.1, 0.25, 0.5, 0.75, 1.0];
        let maxD = 0;
        for (const c of samples) {
            maxD = Math.max(maxD, Math.abs(linearToSrgbCh(c) - valueJsLinearToSrgb(c)));
        }
        expect(maxD).toBeLessThanOrEqual(EPS);
        // vector form agrees too.
        const v: Vec3 = [0.1, 0.5, 0.9];
        const portV = linearToSrgb(v);
        const refV = v.map(valueJsLinearToSrgb);
        expect(maxAbsDelta(portV, refV)).toBeLessThanOrEqual(EPS);
    });

    // (4) full-chain space check — 3 known colors agree with the value.js chain.
    it("(4) full chain matches value.js on red/green/blue (1e-6)", () => {
        for (const hex of SPACE_COLORS) {
            const rgb = hexToRgb01(hex);
            const got = blobColorChain(rgb);
            const ref = valueJsBlobChain(rgb);
            expect(maxAbsDelta(got, ref)).toBeLessThanOrEqual(EPS);
        }
    });

    // (5) out-of-gamut hue-preservation sweep — the chroma clamp preserves hue.
    it("(5) gamut clamp preserves hue (out-of-gamut chroma sweep)", () => {
        // High-chroma OKLCh stops that exceed sRGB across a hue fan.
        for (let hDeg = 0; hDeg < 360; hDeg += 30) {
            const h = hDeg * DEG2RAD;
            const outOfGamut: Vec3 = [0.7, 0.37, h]; // C=0.37 is well past the sRGB hull
            const before = oklabToLinearSrgb(oklchToOklab(outOfGamut));
            expect(inGamut(before)).toBe(false); // precondition: it IS out of gamut
            const clamped = gamutClampOklch(outOfGamut);
            // L and h unchanged; only C shrank.
            expect(Math.abs(clamped[0] - outOfGamut[0])).toBeLessThanOrEqual(EPS);
            expect(Math.abs(clamped[2] - outOfGamut[2])).toBeLessThanOrEqual(EPS);
            expect(clamped[1]).toBeLessThan(outOfGamut[1]);
            // result is in gamut (within the 16-step bisection resolution).
            const after = oklabToLinearSrgb(oklchToOklab(clamped));
            const slack = 1e-4;
            expect(after.every((c) => c >= -slack && c <= 1 + slack)).toBe(true);
        }
    });

    // (6) perceptual-uniformity witness — a +0.1 OKLCh L-shift moves perceived
    // lightness by exactly that controlled amount, while the equivalent HSV
    // value-shift moves perceived lightness by a DIFFERENT (uncontrolled) amount.
    // The OKLCh shift's deviation from the target is ~0; HSV's is large. This is
    // why edit #4 swaps HSV for OKLCh — OKLCh L IS perceived lightness.
    it("(6) +0.1 OKLCh L-shift tracks perceived lightness; the HSV value-shift does not", () => {
        const TARGET = 0.1;
        const base = hexToRgb01("#3a7bd5");
        const baseLab = srgbToOklab(base);
        const baseL = baseLab[0];

        // OKLCh path: bump OKLCh L by TARGET. OKLCh L IS perceptual L, so the move
        // in perceived lightness equals TARGET to floating-point precision.
        const lch = oklabToOklch(baseLab);
        const okBumped = oklchToOklab([Math.min(lch[0] + TARGET, 1), lch[1], lch[2]]);
        const okDeltaL = Math.abs(okBumped[0] - baseL);
        const okError = Math.abs(okDeltaL - TARGET);

        // HSV path: bump HSV value (max channel) by TARGET in gamma space, then
        // re-measure the actual perceived-lightness move via OKLab L.
        const max = Math.max(base[0], base[1], base[2]);
        const scale = max > 0 ? Math.min(max + TARGET, 1) / max : 1;
        const hsvBumped: Vec3 = [
            Math.min(base[0] * scale, 1),
            Math.min(base[1] * scale, 1),
            Math.min(base[2] * scale, 1),
        ];
        const hsvDeltaL = Math.abs(srgbToOklab(hsvBumped)[0] - baseL);
        const hsvError = Math.abs(hsvDeltaL - TARGET);

        // The OKLCh shift hits the target; the HSV shift misses it badly — proving
        // OKLCh is the perceptually-uniform axis edit #4 selected.
        expect(okError).toBeLessThanOrEqual(EPS);
        expect(hsvError).toBeGreaterThan(okError);
    });

    // (7) radians-unit — the port's hue is radians, NOT degrees. Round-tripping a
    // known hue confirms the unit (a degrees bug yields a ~57x hue error).
    it("(7) hue is in radians (not degrees)", () => {
        // value.js gives hue in degrees; convert and confirm the port round-trips it.
        const rgb = hexToRgb01(WITNESS);
        const refLab = srgbToOKLab(rgb[0], rgb[1], rgb[2]);
        const [, , HdegRef] = rawOklabToOklch(refLab[0]!, refLab[1]!, refLab[2]!);
        const portLch = oklabToOklch(srgbToOklab(rgb));
        const portHdeg = (portLch[2] / DEG2RAD); // radians → degrees for comparison
        expect(Math.abs(portHdeg - HdegRef)).toBeLessThanOrEqual(1e-4);
        // and the port hue is in the radian range [0, 2pi), not the degree range.
        expect(portLch[2]).toBeGreaterThanOrEqual(0);
        expect(portLch[2]).toBeLessThan(2 * Math.PI);
        // sanity: the radian value is NOT the degree value (they differ by ~57x).
        expect(Math.abs(portLch[2] - HdegRef)).toBeGreaterThan(1e-3);
    });

    // (8) premultiply ordering — the alpha multiply happens AFTER the OETF, on the
    // straight-alpha gamma triple, producing premultiplied output.
    it("(8) premultiply is after the OETF (straight-alpha → premultiplied)", () => {
        const rgb = hexToRgb01(WITNESS);
        const alpha = 0.5;
        // The shader's final two steps: gamma = clamp(linearToSrgb(lin)); out = gamma*alpha.
        const straightGamma = blobColorChain(rgb);
        const premultiplied = straightGamma.map((c) => c * alpha) as Vec3;

        // WRONG ordering would premultiply in linear BEFORE the OETF — that yields a
        // different (darker, non-linear-scaled) result. Assert the correct order:
        // out == OETF(linear) * alpha, and out != OETF(linear * alpha).
        const lin = oklabToLinearSrgb(
            oklchToOklab(gamutClampOklch(oklabToOklch(srgbToOklab(rgb)))),
        );
        const correct = linearToSrgb(lin).map((c) => Math.min(1, Math.max(0, c)) * alpha) as Vec3;
        const wrong = linearToSrgb(lin.map((c) => c * alpha) as Vec3).map((c) =>
            Math.min(1, Math.max(0, c)),
        ) as Vec3;

        expect(maxAbsDelta(premultiplied, correct)).toBeLessThanOrEqual(EPS);
        // the two orderings genuinely differ (so the assertion is load-bearing).
        expect(maxAbsDelta(correct, wrong)).toBeGreaterThan(1e-3);
    });

    // (9) W11.a iridescence — the warm-biased sheen, after the gamut clamp, is
    // IN-GAMUT (the spectral term never pushes a pixel out of sRGB) AND the chroma
    // stays below the warm-pearl cap (the warm-bias holds; it never goes garish).
    it("(9) iridescence stays in gamut + holds the warm-pearl chroma cap", () => {
        const base = oklabToOklch(srgbToOklab(hexToRgb01("#3a7bd5")));
        const iridHue = 85 * DEG2RAD; // the warm default
        let maxChromaAfter = 0;
        for (let f = 0; f <= 1.0001; f += 0.1) {
            for (let n = 0; n <= 1.0001; n += 0.25) {
                const irid = applyIridescence(base, f, n, iridHue, 0.5, 0.0);
                // chroma cap: never more than +0.08 above the base chroma.
                expect(irid[1]).toBeLessThanOrEqual(base[1] + 0.08 + EPS);
                // after the gamut clamp the result is in sRGB.
                const clamped = gamutClampOklch(irid);
                const lin = oklabToLinearSrgb(oklchToOklab(clamped));
                const slack = 1e-4;
                expect(lin.every((c) => c >= -slack && c <= 1 + slack)).toBe(true);
                maxChromaAfter = Math.max(maxChromaAfter, clamped[1]);
            }
        }
        // the cap is load-bearing — a high-chroma vivid base would otherwise blow out.
        expect(maxChromaAfter).toBeLessThan(base[1] + 0.1);
    });

    // (10) W11.a fake-SSS — the inner-glow + back-light only LIFT OKLCh L (and warm
    // the hue), never darken; and the result clamps into gamut.
    it("(10) fake-SSS lifts L (never darkens) + stays in gamut", () => {
        const base = oklabToOklch(srgbToOklab(hexToRgb01("#3a7bd5")));
        for (let th = 0; th <= 1.0001; th += 0.25) {
            for (let back = 0; back <= 1.0001; back += 0.5) {
                const sss = applyFakeSss(base, th, back, 0.1, 0.2);
                expect(sss[0]).toBeGreaterThanOrEqual(base[0] - EPS); // L never drops
                const clamped = gamutClampOklch(sss);
                const lin = oklabToLinearSrgb(oklchToOklab(clamped));
                const slack = 1e-4;
                expect(lin.every((c) => c >= -slack && c <= 1 + slack)).toBe(true);
            }
        }
    });

    // (11) W11.b multi-stop — OKLab interp of a VIVID pair with the midpoint
    // chroma-bump holds chroma ABOVE the plain-mix midpoint (the linear OKLab mix
    // dips through grey on a hue-opposed pair; the bump corrects it).
    it("(11) OKLab interp midpoint chroma-bump holds chroma above the plain mix", () => {
        // Two vivid, hue-opposed stops (warm vs cool) — the linear mix dips chroma.
        const a: Vec3 = [0.7, 0.18, 30 * DEG2RAD]; // warm
        const b: Vec3 = [0.7, 0.18, 210 * DEG2RAD]; // cool (complement)
        const plain = oklabLerpStop(a, b, 0.5, 0.0);
        const bumped = oklabLerpStop(a, b, 0.5, 0.06);
        // the plain midpoint chroma is well below the endpoints (it passes near grey).
        expect(plain[1]).toBeLessThan(a[1]);
        // the bump lifts it back up.
        expect(bumped[1]).toBeGreaterThan(plain[1]);
    });
});
