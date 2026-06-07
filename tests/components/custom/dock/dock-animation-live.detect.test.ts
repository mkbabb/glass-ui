import { describe, expect, it } from "vitest";

import {
    allEqual,
    arrivalTimeMs,
    detectAnimation,
    fallingFrames,
    maxInterFrameJump,
    risingFrames,
} from "../../../../scripts/proof-dock-animation-live.mjs";

/**
 * AW.W1/W2 — the pure-detector unit for `proof:dock-animation-live`.
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
 *
 * AW.W2 clip-reveal — the opacity sampler is RE-POINTED to the LEAVING pane
 * (`opacities` FALLS as the aperture reveals the active content); the ACTIVE
 * pane (`activeOpacities`) is asserted statically == 1 (revealed, not faded).
 */

const SUMMARY_FLOOR = 19;

// A FROZEN flip timeline — width never rises (the 3.3.0 stuck-at-summary-floor
// regression). The leaving pane fade may still tick down.
const FROZEN_FLIP = {
    W0: SUMMARY_FLOOR,
    O0: 1,
    W1: SUMMARY_FLOOR,
    O1: 0,
    widths: [SUMMARY_FLOOR, SUMMARY_FLOOR, SUMMARY_FLOOR, SUMMARY_FLOOR, SUMMARY_FLOOR],
    opacities: [1, 0.75, 0.5, 0.25, 0], // leaving pane fades
    activeOpacities: [1, 1, 1, 1, 1], // active pane is statically 1
    times: [0, 16.7, 33.4, 50.1, 66.8],
};

// A HEALTHY flip timeline — width rises over >=3 frames; the leaving pane fades
// (falls) over >=3 frames and arrives together (post-fix morph: 40 -> 197).
const HEALTHY_FLIP = {
    W0: 40,
    O0: 1,
    W1: 197,
    O1: 0,
    widths: [40, 64, 110, 160, 195, 197, 197],
    opacities: [1, 0.8, 0.45, 0.15, 0.02, 0, 0], // leaving pane fades out
    activeOpacities: [1, 1, 1, 1, 1, 1, 1], // active pane statically 1
    times: [0, 16.7, 33.4, 50.1, 66.8, 83.5, 100.2],
};

// An active-pane-FADES timeline — the born-RED clip-reveal tell (the active pane
// dips below 1 during the morph instead of being statically revealed).
const ACTIVE_FADES_FLIP = {
    ...HEALTHY_FLIP,
    activeOpacities: [0, 0.2, 0.55, 0.85, 0.98, 1, 1],
};

function frozenResult() {
    return {
        vt: { ran: true, vtGroupAnimations: 2 },
        vtForcedOff: true,
        flip: FROZEN_FLIP,
        retarget: { widths: [40, 64, 110, 160, 195, 197], times: [0, 16, 33, 50, 66, 83] },
        verticalInner: { ran: false },
    };
}

function healthyResult() {
    return {
        vt: { ran: true, vtGroupAnimations: 2 },
        vtForcedOff: true,
        flip: HEALTHY_FLIP,
        retarget: { widths: [40, 64, 110, 160, 195, 197], times: [0, 16, 33, 50, 66, 83] },
        verticalInner: {
            ran: true,
            H0: 40,
            H1: 120,
            heights: [40, 58, 84, 105, 118, 120, 120],
            times: [0, 16, 33, 50, 66, 83, 100],
        },
    };
}

describe("risingFrames / fallingFrames", () => {
    it("counts zero rising frames on a flat (frozen) series", () => {
        expect(risingFrames(FROZEN_FLIP.widths, 0.5)).toBe(0);
    });

    it("counts the rising frames on a monotonically-growing series", () => {
        expect(risingFrames(HEALTHY_FLIP.widths, 0.5)).toBeGreaterThanOrEqual(3);
    });

    it("counts the falling frames on a fading (leaving-pane) series", () => {
        expect(fallingFrames(HEALTHY_FLIP.opacities, 0.01)).toBeGreaterThanOrEqual(3);
    });
});

describe("allEqual — the active-pane static-opacity:1 witness", () => {
    it("is true when every active-pane sample is 1", () => {
        expect(allEqual(HEALTHY_FLIP.activeOpacities, 1, 0.001)).toBe(true);
    });

    it("is false when the active pane dips below 1 (fades)", () => {
        expect(allEqual(ACTIVE_FADES_FLIP.activeOpacities, 1, 0.001)).toBe(false);
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
        expect(facts.leavingOpacityFallingFrames).toBeGreaterThanOrEqual(3);
        expect(facts.activeOpacityStatic1).toBe(true);
        expect(facts.verticalInnerHeightRisingFrames).toBeGreaterThanOrEqual(3);
        expect(violations).toHaveLength(0);
    });

    it("flags an ACTIVE pane that FADES (the clip-reveal contract violation)", () => {
        const { facts, violations } = detectAnimation({
            vt: { ran: true, vtGroupAnimations: 2 },
            vtForcedOff: true,
            flip: ACTIVE_FADES_FLIP,
            retarget: { widths: [40, 64, 110, 160, 195, 197], times: [0, 16, 33, 50, 66, 83] },
            verticalInner: { ran: false },
        });
        expect(facts.activeOpacityStatic1).toBe(false);
        expect(violations.some((v) => /ACTIVE pane opacity fell below 1|FADING/.test(v))).toBe(
            true,
        );
    });

    it("flags a frozen vertical inner-group height morph", () => {
        const { violations } = detectAnimation({
            vt: { ran: true, vtGroupAnimations: 2 },
            vtForcedOff: true,
            flip: HEALTHY_FLIP,
            retarget: { widths: [40, 64, 110, 160, 195, 197], times: [0, 16, 33, 50, 66, 83] },
            verticalInner: {
                ran: true,
                H0: 40,
                H1: 40,
                heights: [40, 40, 40, 40, 40],
                times: [0, 16, 33, 50, 66],
            },
        });
        expect(violations.some((v) => /vertical INNER DockLayerGroup height/.test(v))).toBe(
            true,
        );
    });

    it("flags a probe error", () => {
        const { violations } = detectAnimation({ error: "no collapsed dock" });
        expect(violations.length).toBeGreaterThan(0);
    });
});
