import { describe, expect, it } from "vitest";

import {
    isInSRGBGamut,
    oklabToLinearSRGB,
    rawOklchToOklab,
} from "@mkbabb/value.js";

import { deriveAurora, cssToOklch, oklchToLinear } from "@glass/components/aurora/composables/color";
import type { AuroraHarmony } from "@glass/components/aurora/composables/color";
import { MAX_STOPS } from "@glass/components/aurora/constants/presets";
import type { OklchStop } from "@glass/components/aurora/constants/presets";

/**
 * D10b witness — `deriveAurora` seeds ONE color into a harmonious, gamut-safe
 * N-stop aurora palette by composing the shipped value.js Ottosson core
 * (inv J-10: no color math re-implemented; the gamut-map step is the reuse).
 *
 * Asserts the load-bearing contracts: stopCount honored + clamped, every output
 * in sRGB gamut (both the strict-hull AND the actual-bake reading), monochrome
 * preserves the seed hue, L is monotonic ascending across the ramp (deep base →
 * pale apex), each harmony walks the intended hue relationship, and an invalid
 * CSS seed throws rather than silently degrading.
 *
 * AS.W7-W3 hardening (H4): the original seed set was all moderate-chroma; this
 * suite adds ADVERSARIAL seeds — neon primaries, near-black, near-white, and
 * non-hex CSS formats — that drive `gamutMapOKLab` onto the gamut hull where
 * float round-trip error escapes [0,1]³. See `gamutMapStop`'s doc: the over-1
 * overshoot (the only escape the GPU bake does not clamp) is nudged to 0; a
 * sub-1.1e-4 negative hull residual remains but is clamped by `oklchToLinear`'s
 * `Math.max(0,·)` wrap, so the BAKE path is the authoritative gamut contract.
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

// Adversarial seeds (H4 harden): neon primaries that drive the gamut map onto
// the hull, near-black / near-white edges of the L band, an out-of-gamut OKLCh
// literal, and non-hex CSS formats (rgb()/hsl()) through the value.js parser.
const ADVERSARIAL_SEEDS = [
    "#00ff00",
    "#ff00ff",
    "#ff0000",
    "#0000ff",
    "#00ffff",
    "#ffff00",
    "#010101",
    "#ffffff",
    "#000000",
    "#808080",
    "rgb(255, 128, 0)",
    "hsl(280 100% 50%)",
    "oklch(0.7 0.37 30)",
];

// isInSRGBGamut is a hard [0,1]³ test; allow a float-boundary epsilon so a stop
// landing exactly on the gamut hull (gamutMapOKLab's target) is not a false fail.
// The measured worst hull-float residual across the adversarial × harmony matrix
// is ~1.04e-4 (≈ 0.027/255 — sub-perceptible); 2e-4 covers it with headroom.
const GAMUT_EPS = 2e-4;

function inGamut(stop: OklchStop): boolean {
    const [L, a, b] = rawOklchToOklab(stop.L, stop.C, stop.h);
    const [lr, lg, lb] = oklabToLinearSRGB(L, a, b);
    if (isInSRGBGamut(lr, lg, lb)) return true;
    // tolerate a hull-boundary stop within epsilon on each channel
    const clamp01 = (v: number) =>
        v < -GAMUT_EPS || v > 1 + GAMUT_EPS ? false : true;
    return clamp01(lr) && clamp01(lg) && clamp01(lb);
}

/**
 * The authoritative gamut contract: the channels the SHADER actually receives.
 * `oklchToLinear` is the real bake — it lower-clamps with `Math.max(0,·)` and the
 * shader ACES-tonemaps + clamps the top. The load-bearing safety property is that
 * NO channel overshoots 1 (the bake does not cap the top, so an over-1 stop would
 * reach the GPU as an out-of-range value). A tiny upper epsilon absorbs float
 * noise; the lower bound is structurally 0 thanks to the wrap.
 */
function bakeInGamut(stop: OklchStop): boolean {
    const [r, g, b] = oklchToLinear(stop);
    const ok = (v: number) => v >= 0 && v <= 1 + 5e-4;
    return ok(r) && ok(g) && ok(b);
}

/** Circular hue distance in [0,180]; 0 when the two hues coincide. */
function hueDelta(a: number, b: number): number {
    return Math.abs(((a - b + 540) % 360) - 180);
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
                expect(hueDelta(stop.h, anchorHue)).toBeLessThan(1.0);
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

    // ── Adversarial gamut (H4 harden) ──────────────────────────────────────

    it("ADVERSARIAL: neon / near-black / near-white / multi-format seeds stay gamut-safe", () => {
        for (const seed of ADVERSARIAL_SEEDS) {
            for (const harmony of HARMONIES) {
                const out = deriveAurora(seed, { stopCount: MAX_STOPS, harmony });
                for (const stop of out) {
                    // strict-hull reading within the float-boundary epsilon
                    expect(inGamut(stop)).toBe(true);
                    // AND the authoritative reading: the channels the GPU receives
                    // never overshoot 1 (the over-1 escape `gamutMapStop` nudges out)
                    expect(bakeInGamut(stop)).toBe(true);
                }
            }
        }
    });

    it("ADVERSARIAL: the GPU-bake path never overshoots 1 on any neon seed", () => {
        // This is the property the chroma-nudge in `gamutMapStop` guarantees — the
        // bake (`oklchToLinear`) lower-clamps but does NOT cap the top, so an
        // uncorrected over-1 hull overshoot would reach the shader uncapped.
        for (const seed of ADVERSARIAL_SEEDS) {
            for (const harmony of HARMONIES) {
                const out = deriveAurora(seed, { stopCount: MAX_STOPS, harmony });
                for (const stop of out) {
                    const [r, g, b] = oklchToLinear(stop);
                    expect(r).toBeLessThanOrEqual(1 + 5e-4);
                    expect(g).toBeLessThanOrEqual(1 + 5e-4);
                    expect(b).toBeLessThanOrEqual(1 + 5e-4);
                }
            }
        }
    });

    it("ADVERSARIAL: L stays monotonic-ascending and travels even for neon seeds", () => {
        for (const seed of ADVERSARIAL_SEEDS) {
            for (const harmony of HARMONIES) {
                const out = deriveAurora(seed, { stopCount: MAX_STOPS, harmony });
                for (let i = 1; i < out.length; i++) {
                    expect(out[i]!.L).toBeGreaterThanOrEqual(out[i - 1]!.L - 1e-3);
                }
                expect(out[out.length - 1]!.L).toBeGreaterThan(out[0]!.L);
            }
        }
    });

    // ── Harmony hue relationships (H4 harden) ──────────────────────────────

    it("each harmony walks the intended hue relationship", () => {
        // Use a saturated mid-chroma seed so the gamut map does not collapse the
        // hue walk (a deep neon would clip C and blur the relationship).
        const seed = "#3a93b6";
        const anchor = cssToOklch(seed);
        const wrap = (h: number) => ((h % 360) + 360) % 360;

        // monochrome — every stop holds the anchor hue (skip achromatic apex)
        const mono = deriveAurora(seed, { stopCount: 6, harmony: "monochrome" });
        for (const s of mono) {
            if (s.C < 1e-3) continue;
            expect(hueDelta(s.h, anchor.h)).toBeLessThan(1.0);
        }

        // complementary — the apex lands ~180° from the base (the full lerp)
        const comp = deriveAurora(seed, { stopCount: 6, harmony: "complementary" });
        expect(hueDelta(comp[comp.length - 1]!.h, wrap(anchor.h + 180))).toBeLessThan(
            12,
        );
        // base sits at (near) the anchor hue
        expect(hueDelta(comp[0]!.h, anchor.h)).toBeLessThan(8);

        // triad — the apex lands ~240° from the base (anchor → +120 → +240)
        const triad = deriveAurora(seed, { stopCount: 6, harmony: "triad" });
        expect(hueDelta(triad[triad.length - 1]!.h, wrap(anchor.h + 240))).toBeLessThan(
            14,
        );

        // analogous — total hue span across the ramp is ~2·hueSpread (±28° → ~56°)
        const ana = deriveAurora(seed, {
            stopCount: 6,
            harmony: "analogous",
            hueSpread: 28,
        });
        const span = hueDelta(ana[0]!.h, ana[ana.length - 1]!.h);
        // analogous stays a narrow neighbourhood — well under a quarter-turn
        expect(span).toBeGreaterThan(20);
        expect(span).toBeLessThan(90);
    });

    it("respects a custom hueSpread for analogous (wider seed → wider walk)", () => {
        const seed = "#3a93b6";
        const narrow = deriveAurora(seed, {
            stopCount: 6,
            harmony: "analogous",
            hueSpread: 10,
        });
        const wide = deriveAurora(seed, {
            stopCount: 6,
            harmony: "analogous",
            hueSpread: 50,
        });
        const narrowSpan = hueDelta(narrow[0]!.h, narrow[narrow.length - 1]!.h);
        const wideSpan = hueDelta(wide[0]!.h, wide[wide.length - 1]!.h);
        expect(wideSpan).toBeGreaterThan(narrowSpan);
    });

    // ── Graceful failure (H4 harden) ───────────────────────────────────────

    it("throws on an invalid CSS seed (no silent gray-fill degrade)", () => {
        for (const bad of ["not-a-color", "#gggggg", "potato", "rgb(", ""]) {
            expect(() => deriveAurora(bad)).toThrow();
        }
    });

    it("a valid CSS seed never throws across the adversarial set", () => {
        for (const seed of ADVERSARIAL_SEEDS) {
            expect(() => deriveAurora(seed, { stopCount: MAX_STOPS })).not.toThrow();
        }
    });

    // ── Ramp-shape options (H4 harden) ─────────────────────────────────────

    it("chromaFalloff toward 1 keeps chroma flat; lower values fade the apex", () => {
        const seed = "#3a93b6";
        const anchor = cssToOklch(seed);
        // falloff = 1 → no falloff: apex C ≈ base C (both ~ anchor C, sans gamut nudge)
        const flat = deriveAurora(seed, {
            stopCount: 5,
            harmony: "monochrome",
            chromaFalloff: 1,
        });
        // falloff = 0.4 → strong fade: apex C noticeably below base C
        const faded = deriveAurora(seed, {
            stopCount: 5,
            harmony: "monochrome",
            chromaFalloff: 0.4,
        });
        const flatApex = flat[flat.length - 1]!.C;
        const fadedApex = faded[faded.length - 1]!.C;
        expect(fadedApex).toBeLessThan(flatApex);
        // sanity: the flat apex stays in the neighbourhood of the anchor chroma
        expect(flatApex).toBeGreaterThan(anchor.C * 0.5);
    });
});
