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

    // ── AX.W11 — the samplePalette gate-hole close ──────────────────────────────
    // The headline RED witness: at HEAD the WGSL twin flat-lerped the ramp (no
    // smoothstep ease, no huePath branch) while the GLSL oracle smoothstep-eased +
    // hue-arc-dispatched. After both samplePalette ports SPLICE the shared
    // samplePaletteRamp twin, the ramp is one source — assert the two TS ports agree
    // to 1e-6 across the eased OKLab path AND the OKLCh hue-arc path. A DISTANT-HUE
    // stop pair is the muddy-middle witness (the OKLab-rectangular midpoint desaturates
    // toward grey; the hue-arc stays saturated) — both ports must take the SAME path.
    const RAMP_T = [0.25, 0.5, 0.75];
    // Linear-sRGB stop pairs (the palette is CPU-baked to linear). A DISTANT-HUE pair
    // (blue → yellow, near-antipodal) so the OKLab-vs-hue-arc divergence is exercised.
    const STOP_A: wgsl.Vec3 = [0.02, 0.05, 0.55]; // deep blue (linear)
    const STOP_B: wgsl.Vec3 = [0.85, 0.62, 0.02]; // warm yellow (linear)

    it("samplePaletteRamp: WGSL twin == GLSL oracle to 1e-6 across huePath:'flat' (smoothstep OKLab-rect)", () => {
        // huePath 0 (shorter) and 1 (longer) both take the OKLab-rectangular ramp.
        for (const huePath of [0, 1]) {
            for (const t of RAMP_T) {
                near3(
                    wgsl.samplePaletteRamp(STOP_A, STOP_B, t, huePath),
                    glsl.samplePaletteRamp(STOP_A, STOP_B, t, huePath),
                    `ramp flat hp=${huePath} t=${t}`,
                );
            }
        }
    });

    it("samplePaletteRamp: WGSL twin == GLSL oracle to 1e-6 across huePath:'increasing'/'decreasing' (OKLCh hue-arc)", () => {
        // huePath 2 (increasing) + 3 (decreasing) take the OKLCh hue-arc — the path the
        // WGSL twin flat-lerped at HEAD. After the hoist both splice the same arc.
        for (const huePath of [2, 3]) {
            for (const t of RAMP_T) {
                near3(
                    wgsl.samplePaletteRamp(STOP_A, STOP_B, t, huePath),
                    glsl.samplePaletteRamp(STOP_A, STOP_B, t, huePath),
                    `ramp arc hp=${huePath} t=${t}`,
                );
            }
        }
    });

    it("the huePath carry is load-bearing: increasing arc != flat lerp on the distant-hue pair (the muddy-middle witness)", () => {
        // Proves the huePath branch is NOT redundant with the smoothstep ease — the
        // arc path and the flat path produce DIFFERENT colors at the midpoint, so a
        // twin that drops the huePath carry (flat-lerps the rainbow) is provably wrong.
        const arc = glsl.samplePaletteRamp(STOP_A, STOP_B, 0.5, 2);
        const flat = glsl.samplePaletteRamp(STOP_A, STOP_B, 0.5, 0);
        const delta = Math.hypot(arc[0] - flat[0], arc[1] - flat[1], arc[2] - flat[2]);
        expect(delta, `arc vs flat midpoint delta = ${delta}`).toBeGreaterThan(0.01);
    });
});
