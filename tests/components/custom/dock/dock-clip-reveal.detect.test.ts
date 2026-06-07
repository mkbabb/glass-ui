import { describe, expect, it } from "vitest";

import {
    allOne,
    clipFrames,
    detectClipReveal,
    detectEngineSample,
} from "../../../../scripts/proof-dock-clip-reveal.mjs";

/**
 * AW.W2 — the pure-detector unit for `proof:dock-clip-reveal`.
 *
 * The behavioral gate mounts a real browser and rAF-samples the dock's expand
 * morph; on a harnessless runner it SKIPs. This unit covers the gate's PURE
 * detectors directly so its reasoning cannot regress to a false-GREEN.
 *
 * The clip-reveal contract: the active pane is statically opacity:1 (REVEALED by
 * the growing aperture, never faded), and the content box is CLIPPED by the
 * aperture (it never paints at full natural width past a half-collapsed box).
 *
 * Born-RED witness (the 3.3.0 model): a frame where the active pane opacity < 1
 * while the box is still mid-morph (content fades, not revealed).
 */

// A HEALTHY clip-reveal sample — active pane static 1, the aperture grows, the
// visible content tracks the aperture (clipped), the natural width is constant
// (laid out once behind the aperture).
const HEALTHY = {
    apertures: [40, 70, 120, 170, 200, 200, 200],
    visibles: [40, 70, 120, 170, 200, 200, 200],
    naturals: [200, 200, 200, 200, 200, 200, 200],
    activeOpacities: [1, 1, 1, 1, 1, 1, 1],
    times: [0, 16, 33, 50, 66, 83, 100],
};

// The born-RED 3.3.0 sample — the active pane FADES 0→1 while the box grows
// (content fades in instead of being revealed by the aperture).
const ACTIVE_FADES = {
    apertures: [40, 70, 120, 170, 200, 200, 200],
    visibles: [40, 70, 120, 170, 200, 200, 200],
    naturals: [200, 200, 200, 200, 200, 200, 200],
    activeOpacities: [0, 0.25, 0.55, 0.85, 0.98, 1, 1],
    times: [0, 16, 33, 50, 66, 83, 100],
};

// A SPILL sample — the content paints at full natural width (200) while the
// aperture is still narrow (the box did not clip; content overflows the box).
const SPILLS = {
    apertures: [40, 70, 120, 170, 200, 200, 200],
    visibles: [200, 200, 200, 200, 200, 200, 200],
    naturals: [200, 200, 200, 200, 200, 200, 200],
    activeOpacities: [1, 1, 1, 1, 1, 1, 1],
    times: [0, 16, 33, 50, 66, 83, 100],
};

describe("allOne — the active-pane reveal witness", () => {
    it("is true when every active-pane sample is 1", () => {
        expect(allOne(HEALTHY.activeOpacities)).toBe(true);
    });

    it("is false when the active pane fades in (dips below 1)", () => {
        expect(allOne(ACTIVE_FADES.activeOpacities)).toBe(false);
    });
});

describe("clipFrames — the aperture-clip witness", () => {
    it("counts every frame clipped when visible tracks the aperture", () => {
        const { clipped, spilled } = clipFrames(
            HEALTHY.apertures,
            HEALTHY.visibles,
            HEALTHY.naturals,
        );
        expect(clipped).toBe(HEALTHY.apertures.length);
        expect(spilled).toBe(0);
    });

    it("flags spill frames when content paints wider than the aperture", () => {
        const { spilled } = clipFrames(SPILLS.apertures, SPILLS.visibles, SPILLS.naturals);
        expect(spilled).toBeGreaterThan(0);
    });
});

describe("detectEngineSample", () => {
    it("passes a healthy clip-reveal sample with zero violations", () => {
        const { violations } = detectEngineSample("flip", HEALTHY);
        expect(violations).toHaveLength(0);
    });

    it("flags an active-pane FADE (the clip-reveal contract violation)", () => {
        const { facts, violations } = detectEngineSample("flip", ACTIVE_FADES);
        expect(facts.flipActiveOpacityStatic1).toBe(false);
        expect(violations.some((v) => /FADES|REVEALED|below 1/.test(v))).toBe(true);
    });

    it("flags a SPILL (content not clipped by the aperture)", () => {
        const { violations } = detectEngineSample("flip", SPILLS);
        expect(violations.some((v) => /spill|WIDER than the aperture|did not clip/.test(v))).toBe(
            true,
        );
    });
});

describe("detectClipReveal — both engines", () => {
    it("passes when both VT + FLIP samples are healthy", () => {
        const { violations } = detectClipReveal({
            vtForcedOff: true,
            vt: HEALTHY,
            flip: HEALTHY,
        });
        expect(violations).toHaveLength(0);
    });

    it("reds when either engine fades the active pane", () => {
        const { violations } = detectClipReveal({
            vtForcedOff: true,
            vt: HEALTHY,
            flip: ACTIVE_FADES,
        });
        expect(violations.length).toBeGreaterThan(0);
    });

    it("flags a probe error", () => {
        const { violations } = detectClipReveal({ error: "no collapsed dock" });
        expect(violations.length).toBeGreaterThan(0);
    });
});
