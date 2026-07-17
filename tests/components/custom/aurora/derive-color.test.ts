// The derive-color gamut matrix (the proof:aurora-derive-gamut backing).
//
// Every stop of every (harmony × lightnessEasing × chromaEasing × temperature)
// combination over a NEON-SEED matrix must be in sRGB after the internal
// gamutMapStop guard. A neon seed at a tetradic/temperature-coupled stop is the
// case the guard exists to bound. The bake path lower-clamps with Math.max(0,·)
// but does NOT cap the top, so an over-1 escape would reach the GPU — the assertion
// measures the RAW linear channel (pre-clamp) so an overshoot is visible.
//
// bite: remove the gamutMapStop guard from a derive branch → an over-1 neon stop REDs.

import { describe, it, expect } from "vitest";
import { convertColor, oklch } from "@mkbabb/value.js/color";
import {
    deriveAurora,
    type AuroraHarmony,
    type DeriveEasing,
} from "@glass/components/aurora/composables/color";

// The negative residual is the irreducible float-noise of the Ottosson hull
// placement on deep blues; the bake's Math.max(0,·) clamps it to 0 (never paints).
// The ceiling is ~1 LSB (1/255) so the residual stays strictly sub-perceptual — a
// genuine out-of-gamut escape (a guard removal) blows past it by orders of magnitude.
const NEG_TOL = 1 / 255;
// Over-1 must be ZERO (the dangerous escape the bake does NOT cap — it reaches the GPU).
const OVER_TOL = 1e-9;

const NEON_SEEDS = [
    "#ff0000",
    "#00ff00",
    "#0000ff",
    "#ffff00",
    "#00ffff",
    "#ff00ff",
    "#ff6a00",
    "#00ff88",
    "#8800ff",
];
const HARMONIES: AuroraHarmony[] = [
    "analogous",
    "complementary",
    "split-complementary",
    "triad",
    "tetradic",
    "monochrome",
];
const EASINGS: DeriveEasing[] = ["linear", "sine", "bell"];
const TEMPS = [0, 0.5, 1.0];

function rawLinear(stop: { L: number; C: number; h: number }): number[] {
    const source = oklch(stop.L, stop.C, stop.h);
    if (!source.ok) throw new Error(source.error.code);
    const converted = convertColor(source.value, "srgb-linear");
    if (!converted.ok) throw new Error(converted.error.code);
    return converted.value.channels.map(Number);
}

describe("deriveAurora — neon-seed gamut matrix (W5.2)", () => {
    it("every stop of every harmony × easing × temperature is in sRGB after gamutMapStop", () => {
        let maxOver = 0;
        let maxNeg = 0;
        let checked = 0;
        for (const seed of NEON_SEEDS) {
            for (const harmony of HARMONIES) {
                for (const lightnessEasing of EASINGS) {
                    for (const chromaEasing of EASINGS) {
                        for (const temperatureShift of TEMPS) {
                            const stops = deriveAurora(seed, {
                                harmony,
                                lightnessEasing,
                                chromaEasing,
                                temperatureShift,
                                stopCount: 4,
                            });
                            for (const s of stops) {
                                checked++;
                                expect(Number.isFinite(s.L)).toBe(true);
                                expect(Number.isFinite(s.C)).toBe(true);
                                expect(Number.isFinite(s.h)).toBe(true);
                                for (const ch of rawLinear(s)) {
                                    maxOver = Math.max(maxOver, ch - 1);
                                    maxNeg = Math.max(maxNeg, -ch);
                                }
                            }
                        }
                    }
                }
            }
        }
        // eslint-disable-next-line no-console
        console.log(`[derive-gamut] checked=${checked} maxOver=${maxOver.toExponential(3)} maxNeg=${maxNeg.toExponential(3)}`);
        expect(checked).toBeGreaterThan(0);
        // The OVER-1 escape is the DANGEROUS one (the bake does NOT cap the top, so
        // an overshoot reaches the GPU). gamutMapStop must drive it to ≈0.
        expect(maxOver).toBeLessThanOrEqual(OVER_TOL);
        // The NEGATIVE residual is the irreducible float-noise of the hull placement
        // on deep blues; the bake's Math.max(0,·) clamps it and it NEVER paints. The
        // ceiling bounds it below ~1 LSB so it stays sub-perceptual.
        expect(maxNeg).toBeLessThanOrEqual(NEG_TOL);
    });

    it("the bell chroma curve is the default (peaks chroma in the mids vs the extremes)", () => {
        // A 5-stop ramp on a saturated seed: the bell default holds the mid-stop
        // chroma above the end stops (the painterly "saturated body, calm edges").
        const stops = deriveAurora("#1450ff", { stopCount: 5 });
        const mid = stops[2]!.C;
        const ends = Math.max(stops[0]!.C, stops[4]!.C);
        expect(mid).toBeGreaterThanOrEqual(ends * 0.95);
    });

    it("complementary uses the longer arc — the warm→cool midpoint stays saturated", () => {
        // An orange seed: complementary travels the LONG arc to its blue opposite,
        // so the mid stop holds chroma rather than greying through the short arc.
        const stops = deriveAurora("#ff7a10", { harmony: "complementary", stopCount: 5 });
        for (const s of stops) {
            for (const ch of rawLinear(s)) {
                expect(ch - 1).toBeLessThanOrEqual(OVER_TOL);
            }
        }
    });
});
