import { describe, expect, it } from "vitest";

import {
    arrivalTimeMs,
    detectAnimation,
    maxInterFrameJump,
    risingFrames,
} from "../../../../scripts/proof-dock-animation-live.mjs";

/**
 * AW.W1 — the pure-detector unit for `proof:dock-animation-live`.
 *
 * The behavioral gate mounts a real browser and rAF-samples the dock's
 * collapse↔expand width morph; on a harnessless runner it SKIPs. This unit
 * covers the gate's PURE detectors directly so its failure path cannot
 * regress to a false-GREEN on a flat (frozen) timeline.
 *
 * The 3.3.0 regression (`container-type: inline-size` on `.glass-dock`
 * collapsing every horizontal dock to its ~19px padding floor) produced a
 * FROZEN width timeline — all-equal widths at the summary floor through the
 * first expand. The detector MUST flag exactly that as a freeze violation.
 */

const SUMMARY_FLOOR = 19;

// A FROZEN flip timeline — width never rises (the 3.3.0 stuck-at-summary-floor
// regression), opacity may still tick.
const FROZEN_FLIP = {
    W0: SUMMARY_FLOOR,
    O0: 0,
    W1: SUMMARY_FLOOR,
    O1: 1,
    widths: [SUMMARY_FLOOR, SUMMARY_FLOOR, SUMMARY_FLOOR, SUMMARY_FLOOR, SUMMARY_FLOOR],
    opacities: [0, 0.25, 0.5, 0.75, 1],
    times: [0, 16.7, 33.4, 50.1, 66.8],
};

// A HEALTHY flip timeline — width and opacity each rise over >=3 frames and
// arrive together (the post-fix morph: 40 -> 197 over a spring).
const HEALTHY_FLIP = {
    W0: 40,
    O0: 0,
    W1: 197,
    O1: 1,
    widths: [40, 64, 110, 160, 195, 197, 197],
    opacities: [0, 0.2, 0.55, 0.85, 0.98, 1, 1],
    times: [0, 16.7, 33.4, 50.1, 66.8, 83.5, 100.2],
};

function frozenResult() {
    return {
        vt: { ran: true, vtGroupAnimations: 2 },
        vtForcedOff: true,
        flip: FROZEN_FLIP,
        retarget: { widths: [40, 64, 110, 160, 195, 197], times: [0, 16, 33, 50, 66, 83] },
    };
}

function healthyResult() {
    return {
        vt: { ran: true, vtGroupAnimations: 2 },
        vtForcedOff: true,
        flip: HEALTHY_FLIP,
        retarget: { widths: [40, 64, 110, 160, 195, 197], times: [0, 16, 33, 50, 66, 83] },
    };
}

describe("risingFrames", () => {
    it("counts zero rising frames on a flat (frozen) series", () => {
        expect(risingFrames(FROZEN_FLIP.widths, 0.5)).toBe(0);
    });

    it("counts the rising frames on a monotonically-growing series", () => {
        expect(risingFrames(HEALTHY_FLIP.widths, 0.5)).toBeGreaterThanOrEqual(3);
    });
});

describe("arrivalTimeMs", () => {
    it("returns the final timestamp for a flat series (never reaches a span)", () => {
        const t = arrivalTimeMs(FROZEN_FLIP.widths, FROZEN_FLIP.times);
        expect(t).toBe(FROZEN_FLIP.times[FROZEN_FLIP.times.length - 1]);
    });

    it("clocks a healthy morph's 90%-arrival inside its window", () => {
        const t = arrivalTimeMs(HEALTHY_FLIP.widths, HEALTHY_FLIP.times);
        expect(t).toBeGreaterThan(0);
        expect(t).toBeLessThanOrEqual(HEALTHY_FLIP.times[HEALTHY_FLIP.times.length - 1]);
    });
});

describe("maxInterFrameJump", () => {
    it("flags a hard snap as a large isolated jump", () => {
        const { max } = maxInterFrameJump([40, 40, 197, 197]);
        expect(max).toBeGreaterThan(150);
    });

    it("reports a small stride for a smooth spring", () => {
        const { max } = maxInterFrameJump(HEALTHY_FLIP.widths);
        expect(max).toBeLessThan(60);
    });
});

describe("detectAnimation — the freeze bite", () => {
    it("flags a FROZEN width timeline as a freeze violation", () => {
        const { facts, violations } = detectAnimation(frozenResult());
        expect(facts.widthRisingFrames).toBe(0);
        expect(violations.some((v) => /SNAPPED|FROZE|rising frame/.test(v))).toBe(true);
    });

    it("passes a HEALTHY morph with zero violations", () => {
        const { facts, violations } = detectAnimation(healthyResult());
        expect(facts.widthRisingFrames).toBeGreaterThanOrEqual(3);
        expect(facts.opacityRisingFrames).toBeGreaterThanOrEqual(3);
        expect(violations).toHaveLength(0);
    });

    it("flags a probe error", () => {
        const { violations } = detectAnimation({ error: "no collapsed dock" });
        expect(violations.length).toBeGreaterThan(0);
    });
});
