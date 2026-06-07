// AW.W7a — the WGSL ↔ GLSL color/noise equivalence (proof:aurora-wgsl-equivalence's
// vitest arm).
//
// The single-source-the-GPU-math-first discipline: the WebGPU aurora path's WGSL
// color/noise chunk (OETF_WGSL + OKLCH_MATRICES_WGSL + FBM_ROT_WGSL) MUST compute the
// same numbers as the GLSL chunk the WebGL2 path splices — authoring a second
// independent WGSL color core re-opens the AV.W1 "~2.2× too dark" two-copy divergence.
//
// WGSL cannot run in node, so both shaders are evaluated via their hand-transcribed
// TS ports: `aurora-color.wgsl-port.ts` (mirrors the WGSL twin) and
// `metaball-color.glsl-port.ts` (the EXISTING GLSL oracle — the single source of
// truth; never a new oracle). This test asserts the WGSL port EQUALS the GLSL oracle
// to 1e-6 over the ASYMMETRIC witness `#3a7bd5` (r≠g≠b — a transpose / convenience-
// matrix error cannot pass by symmetry) AND a sample set of vivid colors.

import { describe, expect, it } from "vitest";
import * as wgsl from "../../components/custom/aurora/aurora-color.wgsl-port";
import * as glsl from "../../components/custom/goo-blob/metaball-color.glsl-port";
import type { Vec3 } from "../../components/custom/aurora/aurora-color.wgsl-port";

const TOL = 1e-6;

function hexToRgb01(hex: string): Vec3 {
    const h = hex.replace("#", "");
    return [
        parseInt(h.slice(0, 2), 16) / 255,
        parseInt(h.slice(2, 4), 16) / 255,
        parseInt(h.slice(4, 6), 16) / 255,
    ];
}

// The asymmetric witness + a vivid sample set (r≠g≠b so a transpose/convenience-
// matrix error cannot pass by symmetry).
const WITNESS = "#3a7bd5";
const SAMPLES = [
    WITNESS,
    "#ff8a00",
    "#00d4aa",
    "#9b51e0",
    "#1a1a2e",
    "#f5f5dc",
];

function near3(a: Vec3, b: Vec3, label: string): void {
    for (let i = 0; i < 3; i++) {
        expect(Math.abs(a[i] - b[i]), `${label}[${i}]: ${a[i]} vs ${b[i]}`).toBeLessThan(TOL);
    }
}

describe("AW.W7a — the WGSL color twin matches the GLSL oracle to 1e-6", () => {
    it("srgbToLinear: WGSL port == GLSL oracle (witness + samples)", () => {
        for (const hex of SAMPLES) {
            const c = hexToRgb01(hex);
            near3(wgsl.srgbToLinear(c), glsl.srgbToLinear(c), `srgbToLinear ${hex}`);
        }
    });

    it("linearToSrgb: WGSL port == GLSL oracle (the OETF close — the AV.W1 darkening seam)", () => {
        for (const hex of SAMPLES) {
            const lin = glsl.srgbToLinear(hexToRgb01(hex));
            near3(wgsl.linearToSrgb(lin), glsl.linearToSrgb(lin), `linearToSrgb ${hex}`);
        }
    });

    it("srgbToOklab: WGSL port == GLSL oracle (the transposed mat3x3f columns — VERBATIM)", () => {
        for (const hex of SAMPLES) {
            const c = hexToRgb01(hex);
            near3(wgsl.srgbToOklab(c), glsl.srgbToOklab(c), `srgbToOklab ${hex}`);
        }
    });

    it("oklabToLinearSrgb: WGSL port == GLSL oracle", () => {
        for (const hex of SAMPLES) {
            const lab = glsl.srgbToOklab(hexToRgb01(hex));
            near3(wgsl.oklabToLinearSrgb(lab), glsl.oklabToLinearSrgb(lab), `oklabToLinearSrgb ${hex}`);
        }
    });

    it("oklabToOklch / oklchToOklab: WGSL port == GLSL oracle (hue in radians)", () => {
        for (const hex of SAMPLES) {
            const lab = glsl.srgbToOklab(hexToRgb01(hex));
            const lchW = wgsl.oklabToOklch(lab);
            const lchG = glsl.oklabToOklch(lab);
            near3(lchW, lchG, `oklabToOklch ${hex}`);
            near3(wgsl.oklchToOklab(lchW), glsl.oklchToOklab(lchG), `oklchToOklab ${hex}`);
        }
    });

    it("the FULL color chain: WGSL twin == GLSL oracle to 1e-6 (the asymmetric witness #3a7bd5)", () => {
        // The GLSL oracle's chain gamut-clamps; the WGSL twin's parity-floor chain does
        // not (the WebGPU smooth pole bakes the palette CPU-side in-gamut already). To
        // compare APPLES-TO-APPLES, run the WGSL chain against the GLSL chain WITHOUT
        // the gamut clamp — both are the same OKLab/OKLCh round-trip + OETF. The witness
        // is in-gamut, so the clamp is a no-op there anyway; assert directly.
        for (const hex of SAMPLES) {
            const c = hexToRgb01(hex);
            // GLSL oracle without the gamut clamp (the same round-trip the WGSL twin does).
            const oklchG = glsl.oklabToOklch(glsl.srgbToOklab(c));
            const linG = glsl.oklabToLinearSrgb(glsl.oklchToOklab(oklchG));
            const chainG = glsl.clamp3(glsl.linearToSrgb(linG));
            near3(wgsl.auroraWgslColorChain(c), chainG, `chain ${hex}`);
        }
    });
});
