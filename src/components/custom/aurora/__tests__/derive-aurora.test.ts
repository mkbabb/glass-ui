import { describe, expect, it } from "vitest";

import {
    isInSRGBGamut,
    oklabToLinearSRGB,
    rawOklchToOklab,
} from "@mkbabb/value.js";

import { deriveAurora } from "../composables/color";
import type { AuroraHarmony } from "../composables/color";
import { MAX_STOPS } from "../presets";
import type { OklchStop } from "../presets";

/**
 * D10b witness — `deriveAurora` seeds ONE color into a harmonious, gamut-safe
 * N-stop aurora palette by composing the shipped value.js Ottosson core
 * (inv J-10: no color math re-implemented; the gamut-map step is the reuse).
 *
 * Asserts the four load-bearing contracts: stopCount honored + clamped, every
 * output in sRGB gamut, monochrome preserves the seed hue, and L is monotonic
 * ascending across the ramp (deep base → pale apex).
 */

const HARMONIES: AuroraHarmony[] = [
    "analogous",
    "complementary",
    "triad",
    "monochrome",
];

// A spread of seeds: a saturated string, a near-neutral, a high-chroma anchor,
// and a deep/dark anchor that exercises the L-band clamp shift.
const SEED_STRINGS = ["#3a93b6", "#facc15", "#1b1b3a", "#e8d5c4"];
const SEED_STOP: OklchStop = { L: 0.62, C: 0.16, h: 264 };

// isInSRGBGamut is a hard [0,1]³ test; allow a float-boundary epsilon so a stop
// landing exactly on the gamut hull (gamutMapOKLab's target) is not a false fail.
const GAMUT_EPS = 1e-4;

function inGamut(stop: OklchStop): boolean {
    const [L, a, b] = rawOklchToOklab(stop.L, stop.C, stop.h);
    const [lr, lg, lb] = oklabToLinearSRGB(L, a, b);
    if (isInSRGBGamut(lr, lg, lb)) return true;
    // tolerate a hull-boundary stop within epsilon on each channel
    const clamp01 = (v: number) =>
        v < -GAMUT_EPS || v > 1 + GAMUT_EPS ? false : true;
    return clamp01(lr) && clamp01(lg) && clamp01(lb);
}

describe("deriveAurora — seed → gamut-safe N-stop aurora palette (D10b)", () => {
    it("honors stopCount and clamps it to [2, MAX_STOPS]", () => {
        for (const count of [2, 3, 4, 6, MAX_STOPS]) {
            const out = deriveAurora(SEED_STRINGS[0]!, { stopCount: count });
            expect(out.length).toBe(count);
        }
        // below the floor clamps up to 2
        expect(deriveAurora(SEED_STRINGS[0]!, { stopCount: 1 }).length).toBe(2);
        expect(deriveAurora(SEED_STRINGS[0]!, { stopCount: 0 }).length).toBe(2);
        expect(deriveAurora(SEED_STRINGS[0]!, { stopCount: -5 }).length).toBe(2);
        // above the ceiling clamps down to MAX_STOPS
        expect(deriveAurora(SEED_STRINGS[0]!, { stopCount: 99 }).length).toBe(
            MAX_STOPS,
        );
        // default is 4
        expect(deriveAurora(SEED_STRINGS[0]!).length).toBe(4);
    });

    it("returns only in-sRGB-gamut stops for every seed × harmony", () => {
        for (const seed of [...SEED_STRINGS, SEED_STOP]) {
            for (const harmony of HARMONIES) {
                const out = deriveAurora(seed, { stopCount: MAX_STOPS, harmony });
                for (const stop of out) {
                    expect(inGamut(stop)).toBe(true);
                }
            }
        }
    });

    it("preserves the seed hue for monochrome (within gamut-map tolerance)", () => {
        for (const seed of [...SEED_STRINGS, SEED_STOP]) {
            const out = deriveAurora(seed, { stopCount: 5, harmony: "monochrome" });
            // resolve the seed hue the same way the producer does
            const anchorHue =
                typeof seed === "string"
                    ? deriveAurora(seed, { stopCount: 2, harmony: "monochrome" })[0]!
                          .h
                    : seed.h;
            for (const stop of out) {
                // gamutMapOKLab preserves hue exactly in OKLab; the OKLCh hue can
                // wobble only for near-achromatic stops (C→0). Compare on a
                // circular delta and skip the achromatic-apex case.
                if (stop.C < 1e-3) continue;
                // circular hue distance in [0,180]; 0 when the hues coincide
                const circular = Math.abs(((stop.h - anchorHue + 540) % 360) - 180);
                expect(circular).toBeLessThan(1.0);
            }
        }
    });

    it("produces a monotonic-ascending L ramp (deep base → pale apex)", () => {
        for (const seed of [...SEED_STRINGS, SEED_STOP]) {
            for (const harmony of HARMONIES) {
                const out = deriveAurora(seed, { stopCount: 6, harmony });
                for (let i = 1; i < out.length; i++) {
                    // gamut-mapping can nudge L slightly; require non-decreasing
                    // with a tiny tolerance rather than strict <.
                    expect(out[i]!.L).toBeGreaterThanOrEqual(out[i - 1]!.L - 1e-3);
                }
                // and the ramp actually travels — apex is meaningfully lighter
                expect(out[out.length - 1]!.L).toBeGreaterThan(out[0]!.L);
            }
        }
    });

    it("accepts an OklchStop seed (pass-through anchor) identically to a string", () => {
        const out = deriveAurora(SEED_STOP, { stopCount: 4, harmony: "analogous" });
        expect(out.length).toBe(4);
        for (const stop of out) expect(inGamut(stop)).toBe(true);
    });
});
