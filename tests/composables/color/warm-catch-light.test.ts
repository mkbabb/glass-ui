// AX.W11 — the warmCatchLight OKLCh derivation gate.
//
// The catch-light seam fix MUST be invisible to the eye: the OKLCh-derived warm-white
// must reproduce the prior eyeballed [1.0, 0.95, 0.88] linear literal so the live aurora
// impasto relight reads identically (no perceptible shift — a true equivalence, not a
// re-tune). It must ALSO reproduce the blob's warmCream OKLCh anchor at THAT anchor, so
// W15's drop-in re-route onto the SAME helper is a true equivalence (the cross-surface
// unification W15 inherits).

import { describe, expect, it } from "vitest";
import { warmCatchLight, oklchToLinear } from "@glass/composables/color";
import { AURORA_CATCH_LIGHT_ANCHOR } from "@glass/components/aurora/composables/uniformBridge";

// The prior eyeballed aurora catch-light literal (declared "warm-white tint (linear)"
// in the shader) — the warm-white the OKLCh derive must reproduce.
const PRIOR_LITERAL: [number, number, number] = [1.0, 0.95, 0.88];

// The blob's warmCream OKLCh anchor — metaball.frag.ts:359
// `oklabToLinearSrgb(oklchToOklab(vec3(0.97, 0.03, radians(85.0))))`. W15 re-routes the
// blob default onto warmCatchLight at THIS anchor.
const BLOB_WARMCREAM_ANCHOR = { L: 0.97, C: 0.03, h: 85 };

function maxAbsDelta(
    a: [number, number, number],
    b: [number, number, number],
): number {
    return Math.max(Math.abs(a[0] - b[0]), Math.abs(a[1] - b[1]), Math.abs(a[2] - b[2]));
}

describe("AX.W11 — warmCatchLight OKLCh derivation", () => {
    it("reproduces the prior [1.0,0.95,0.88] aurora warm-white at the ratified anchor (no visible shift)", () => {
        const derived = warmCatchLight(
            AURORA_CATCH_LIGHT_ANCHOR.L,
            AURORA_CATCH_LIGHT_ANCHOR.C,
            AURORA_CATCH_LIGHT_ANCHOR.h,
        );
        // <1e-3 linear per channel — imperceptible (1e-3 linear ≈ <0.3/255 gamma).
        expect(maxAbsDelta(derived, PRIOR_LITERAL)).toBeLessThan(1e-3);
    });

    it("matches the blob warmCream anchor via the SAME helper (W15 drop-in equivalence)", () => {
        // The helper routes through oklchToLinear — so warmCatchLight(0.97,0.03,85) is
        // byte-identical to the blob's `oklchToLinear({L:0.97,C:0.03,h:85})`. This proves
        // W15's re-route onto warmCatchLight at the blob anchor is a TRUE equivalence
        // (the blob shader keeps its own anchor; the DERIVATION is shared).
        const viaHelper = warmCatchLight(
            BLOB_WARMCREAM_ANCHOR.L,
            BLOB_WARMCREAM_ANCHOR.C,
            BLOB_WARMCREAM_ANCHOR.h,
        );
        const viaPrimitive = oklchToLinear(BLOB_WARMCREAM_ANCHOR);
        expect(maxAbsDelta(viaHelper, viaPrimitive)).toBe(0);
    });

    it("throws on a non-finite anchor (fail-explicit, not a silent grey return)", () => {
        expect(() => warmCatchLight(NaN, 0.03, 85)).toThrow();
        expect(() => warmCatchLight(0.97, Infinity, 85)).toThrow();
        expect(() => warmCatchLight(0.97, 0.03, NaN)).toThrow();
    });
});
