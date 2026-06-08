import { describe, expect, it } from "vitest";

import {
    changingFrames,
    detectAnimation,
    maxInterFrameJump,
    onsetTimeMs,
    risingFrames,
} from "../../../../scripts/proof-dock-animation-live.mjs";

/**
 * AX.W01 — the pure-detector unit for `proof:dock-animation-live`, re-authored to
 * the SINGLE-SCALAR `--dock-morph-t` architecture.
 *
 * The behavioral gate mounts a real browser and rAF-samples the dock-ROOT box
 * width + the `--dock-morph-t` scalar + a leaving child's opacity on ONE timeline;
 * on a harnessless runner it SKIPs. This unit covers the gate's PURE detectors
 * directly so its failure path cannot regress to a false-GREEN on a flat (frozen)
 * timeline.
 *
 * The old gate measured the `.dock-layers` FLIP width + a VT-group animation
 * witness — both DELETED at AX.W01 (the single-scalar morph drives the ROOT box off
 * one `--dock-morph-t` spring, no VT collapse fork, no `.dock-layers` FLIP driver).
 * The detector now asserts: `--dock-morph-t` ramps over ≥5 rising frames (NOT frozen
 * at 0 — the snap/desync regression), the root box width rises over ≥5 rising frames
 * (NOT a 1-frame snap), and the width-onset and the scalar-onset co-occur within ≤1
 * frame (the single-clock assert — the box rides the scalar).
 */

const MIN = 5; // MIN_MORPH_FRAMES in the gate
const FRAME_MS = 1000 / 60;

// A HEALTHY single-scalar morph timeline — the root box width rises 58→211 over the
// spring's rising frames, `--dock-morph-t` ramps 0→1.05→1.0 IN STEP (same onset),
// and the leaving pane fades. Device-proven shape (the published (0.32,0.7) spring).
const HEALTHY_FLIP = {
    W0: 58,
    T0: 0,
    C0: 1,
    W1: 211,
    widths: [58, 80, 120, 165, 198, 211, 209, 211, 211],
    morphTs: [0, 0.18, 0.45, 0.72, 0.95, 1.05, 1.01, 1.0, 1.0],
    childOpacities: [1, 0.78, 0.42, 0.15, 0.03, 0, 0, 0, 0],
    times: [0, 16.7, 33.4, 50.1, 66.8, 83.5, 100.2, 116.9, 133.6],
};

// A FROZEN/SNAP timeline — `--dock-morph-t` never leaves 0 and the box snaps to the
// expanded size in one frame (the desync/snap regression W01 fixes).
const SNAP_FLIP = {
    W0: 58,
    T0: 0,
    C0: 1,
    W1: 211,
    widths: [58, 211, 211, 211, 211],
    morphTs: [0, 0, 0, 0, 0],
    childOpacities: [1, 1, 1, 1, 1],
    times: [0, 16.7, 33.4, 50.1, 66.8],
};

// A DESYNC timeline — the box width onsets two frames BEFORE the `--dock-morph-t`
// scalar (the "box grows first, content lags" defect). Both eventually ramp, but the
// onsets are > 1 frame apart.
const DESYNC_FLIP = {
    W0: 58,
    T0: 0,
    C0: 1,
    W1: 211,
    // box width starts rising at frame 1 (16.7ms)…
    widths: [58, 80, 120, 165, 198, 211, 211, 211],
    // …but the scalar stays 0 until frame 3 (50.1ms) — a 33.4ms (2-frame) lead.
    morphTs: [0, 0, 0, 0.45, 0.72, 0.95, 1.05, 1.0],
    childOpacities: [1, 1, 1, 0.6, 0.3, 0.05, 0, 0],
    times: [0, 16.7, 33.4, 50.1, 66.8, 83.5, 100.2, 116.9],
};

function healthyResult() {
    return {
        vtForcedOff: true,
        flip: HEALTHY_FLIP,
        retarget: {
            widths: [58, 80, 120, 165, 198, 211],
            times: [0, 16, 33, 50, 66, 83],
        },
    };
}

describe("risingFrames / changingFrames", () => {
    it("counts zero rising frames on a frozen scalar series", () => {
        expect(risingFrames(SNAP_FLIP.morphTs, 1e-4)).toBe(0);
    });

    it("counts ≥5 rising frames on a healthy scalar ramp", () => {
        expect(risingFrames(HEALTHY_FLIP.morphTs, 1e-4)).toBeGreaterThanOrEqual(MIN);
    });

    it("counts ≥5 rising frames on a healthy root box width", () => {
        expect(risingFrames(HEALTHY_FLIP.widths, 0.5)).toBeGreaterThanOrEqual(MIN);
    });

    it("counts the leaving-pane fade as ≥3 moving frames", () => {
        expect(changingFrames(HEALTHY_FLIP.childOpacities, 0.01)).toBeGreaterThanOrEqual(3);
    });
});

describe("onsetTimeMs — the single-clock onset witness", () => {
    it("clocks the box-width and scalar onsets in the SAME frame on a healthy morph", () => {
        const wOnset = onsetTimeMs(HEALTHY_FLIP.widths, HEALTHY_FLIP.times, 0.5);
        const tOnset = onsetTimeMs(HEALTHY_FLIP.morphTs, HEALTHY_FLIP.times, 1e-4);
        expect(Math.abs(wOnset - tOnset)).toBeLessThanOrEqual(FRAME_MS + 1e-3);
    });

    it("separates the box and scalar onsets on a desync timeline", () => {
        const wOnset = onsetTimeMs(DESYNC_FLIP.widths, DESYNC_FLIP.times, 0.5);
        const tOnset = onsetTimeMs(DESYNC_FLIP.morphTs, DESYNC_FLIP.times, 1e-4);
        expect(Math.abs(wOnset - tOnset)).toBeGreaterThan(FRAME_MS + 1e-3);
    });

    it("returns the final timestamp for a flat series (never moves)", () => {
        const t = onsetTimeMs(SNAP_FLIP.morphTs, SNAP_FLIP.times, 1e-4);
        expect(t).toBe(SNAP_FLIP.times[SNAP_FLIP.times.length - 1]);
    });
});

describe("maxInterFrameJump", () => {
    it("flags a hard snap as a large isolated jump", () => {
        const { max } = maxInterFrameJump([58, 58, 211, 211]);
        expect(max).toBeGreaterThan(150);
    });

    it("reports a small stride for a smooth spring", () => {
        const { max } = maxInterFrameJump(HEALTHY_FLIP.widths);
        expect(max).toBeLessThan(60);
    });
});

describe("detectAnimation — the single-scalar bites", () => {
    it("passes a HEALTHY single-scalar morph with zero violations", () => {
        const { facts, violations } = detectAnimation(healthyResult());
        expect(facts.morphTRisingFrames).toBeGreaterThanOrEqual(MIN);
        expect(facts.rootWidthRisingFrames).toBeGreaterThanOrEqual(MIN);
        expect(facts.onsetDeltaMs).toBeLessThanOrEqual(FRAME_MS + 1e-3);
        expect(violations).toHaveLength(0);
    });

    it("flags a FROZEN --dock-morph-t scalar as a snap/desync violation", () => {
        const { facts, violations } = detectAnimation({
            vtForcedOff: true,
            flip: SNAP_FLIP,
            retarget: {
                widths: [58, 80, 120, 165, 198, 211],
                times: [0, 16, 33, 50, 66, 83],
            },
        });
        expect(facts.morphTRisingFrames).toBe(0);
        expect(violations.some((v) => /--dock-morph-t/.test(v))).toBe(true);
    });

    it("flags a SNAPPED root box width", () => {
        const { facts, violations } = detectAnimation({
            vtForcedOff: true,
            flip: SNAP_FLIP,
            retarget: { widths: [58, 211], times: [0, 16] },
        });
        expect(facts.rootWidthRisingFrames).toBeLessThan(MIN);
        expect(violations.some((v) => /SNAPPED|FROZE|rising frame/.test(v))).toBe(true);
    });

    it("flags the box-leads-scalar DESYNC (onset > 1 frame apart)", () => {
        const { facts, violations } = detectAnimation({
            vtForcedOff: true,
            flip: DESYNC_FLIP,
            retarget: {
                widths: [58, 80, 120, 165, 198, 211],
                times: [0, 16, 33, 50, 66, 83],
            },
        });
        expect(facts.onsetDeltaMs).toBeGreaterThan(FRAME_MS);
        expect(violations.some((v) => /one clock|desync/.test(v))).toBe(true);
    });

    it("flags a retarget hard-snap (velocity discontinuity)", () => {
        const { violations } = detectAnimation({
            vtForcedOff: true,
            flip: HEALTHY_FLIP,
            // a ~150px single-frame jump over a ~153px span = > 70% snap to rest
            retarget: { widths: [58, 60, 62, 211, 211, 211], times: [0, 16, 33, 50, 66, 83] },
        });
        expect(violations.some((v) => /snapped to rest|carrying velocity/.test(v))).toBe(true);
    });

    it("flags a probe error", () => {
        const { violations } = detectAnimation({ error: "no collapsed dock" });
        expect(violations.length).toBeGreaterThan(0);
    });
});
