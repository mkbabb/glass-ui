import { describe, expect, it } from "vitest";

import {
    allOne,
    detectFlipSample,
    detectLayeringPolish,
    detectPrmSample,
    directionalAsymmetry,
    progressKeyed,
    risingFrames,
    staggerMonotone,
} from "../../../../scripts/proof-dock-layering-polish.mjs";

/**
 * AW.W3 — the pure-detector unit for `proof:dock-layering-polish`.
 *
 * The behavioral gate mounts a real browser and rAF-samples the dock's expand
 * morph, the hover scale, the PRM-forced swap, and the in-dock slider hold; on a
 * harnessless runner it SKIPs. This unit covers the gate's PURE detectors so its
 * reasoning cannot regress to a false-GREEN.
 *
 * The W3 contract:
 *   (a) directional VT — expand and collapse settle on DISTINCT curves.
 *   (b) the child stagger is MONOTONE in the SINGLE size spring's progress (no
 *       fixed-ms cluster), and the active PANE stays opacity:1.
 *   (c) the hover scale rises over ≥3 frames on the dock spring.
 *   (d) under PRM the stagger + scale collapse to 0 morph frames while state
 *       still toggles.
 *   (e) an in-dock slider drag holds the dock open; release re-arms collapse.
 */

// A HEALTHY FLIP sample — the hover scale rises across frames, the active pane is
// static 1, the children reveal outer→in (earlier child leads), the progress var
// rises monotonically.
const HEALTHY_FLIP = {
    scales: [1, 1.02, 1.05, 1.08, 1.1, 1.1, 1.1],
    actives: [1, 1, 1, 1, 1, 1, 1],
    childSeries: [
        [0, 0, 0],
        [0.4, 0.1, 0],
        [0.8, 0.4, 0.1],
        [1, 0.8, 0.5],
        [1, 1, 0.9],
        [1, 1, 1],
        [1, 1, 1],
    ],
    progresses: [0, 0.2, 0.45, 0.7, 0.9, 1, 1],
    times: [0, 16, 33, 50, 66, 83, 100],
};

// BORN-RED: a fixed-ms cluster — every child flips on in ONE frame (no
// spring-keyed cascade), and the progress var never rises (no spring clock).
const FIXED_MS_CLUSTER = {
    scales: [1.1, 1.1, 1.1, 1.1],
    actives: [1, 1, 1, 1],
    childSeries: [
        [0, 0, 0],
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
    ],
    progresses: [null, null, null, null],
    times: [0, 16, 33, 50],
};

// BORN-RED: the active PANE fades (the stagger leaked onto the pane).
const PANE_FADES = {
    ...HEALTHY_FLIP,
    actives: [0, 0.3, 0.6, 0.9, 1, 1, 1],
};

describe("risingFrames / allOne", () => {
    it("counts rising frames above eps", () => {
        expect(risingFrames([1, 1.02, 1.05, 1.08], 0.0005)).toBe(3);
    });
    it("allOne true for a static-1 series", () => {
        expect(allOne([1, 1, 1])).toBe(true);
        expect(allOne([1, 0.9, 1])).toBe(false);
    });
});

describe("directionalAsymmetry", () => {
    it("is asymmetric when expand and collapse settle times differ", () => {
        const da = directionalAsymmetry({ expandMs: 320, collapseMs: 180 });
        expect(da.asymmetric).toBe(true);
        expect(da.deltaMs).toBe(140);
    });
    it("is symmetric when the two settle times match (born-RED)", () => {
        const da = directionalAsymmetry({ expandMs: 300, collapseMs: 305 });
        expect(da.asymmetric).toBe(false);
    });
    it("handles an errored directional sample", () => {
        expect(directionalAsymmetry({ error: "x" }).asymmetric).toBe(false);
    });
});

describe("staggerMonotone", () => {
    it("is monotone for an outer→in cascade", () => {
        const r = staggerMonotone(HEALTHY_FLIP.childSeries);
        expect(r.monotone).toBe(true);
        expect(r.revealFrames).toBeGreaterThanOrEqual(3);
        expect(r.orderViolations).toBe(0);
    });
    it("flags a later child revealing before an earlier one", () => {
        const r = staggerMonotone([
            [0, 0, 0],
            [0, 0.5, 0.9], // child 2 ahead of child 0 — order violation
        ]);
        expect(r.monotone).toBe(false);
        expect(r.orderViolations).toBeGreaterThan(0);
    });
    it("counts 0 reveal frames for a single-frame cluster", () => {
        const r = staggerMonotone(FIXED_MS_CLUSTER.childSeries);
        // one frame rises (all flip together) — below the MIN.
        expect(r.revealFrames).toBeLessThan(3);
    });
});

describe("progressKeyed", () => {
    it("rises over ≥3 frames for a real spring clock", () => {
        const r = progressKeyed(HEALTHY_FLIP.progresses);
        expect(r.risingFrames).toBeGreaterThanOrEqual(3);
    });
    it("has 0 samples when the progress var is never written (born-RED)", () => {
        const r = progressKeyed(FIXED_MS_CLUSTER.progresses);
        expect(r.samples).toBe(0);
        expect(r.risingFrames).toBe(0);
    });
});

describe("detectFlipSample", () => {
    it("passes a healthy FLIP sample", () => {
        const { violations } = detectFlipSample(HEALTHY_FLIP);
        expect(violations).toHaveLength(0);
    });
    it("flags a fixed-ms cluster (no spring-keyed cascade)", () => {
        const { violations } = detectFlipSample(FIXED_MS_CLUSTER);
        expect(violations.some((v) => /fixed-ms cluster|keyed to the size spring/.test(v))).toBe(true);
    });
    it("flags the active pane fading (clip-reveal regression)", () => {
        const { facts, violations } = detectFlipSample(PANE_FADES);
        expect(facts.activePaneOpacityStatic1).toBe(false);
        expect(violations.some((v) => /clip-reveal contract is regressed/.test(v))).toBe(true);
    });
    it("flags a non-running hover scale", () => {
        const { violations } = detectFlipSample({ ...HEALTHY_FLIP, scales: [1.1, 1.1, 1.1] });
        expect(violations.some((v) => /hover scale/.test(v))).toBe(true);
    });
});

describe("detectPrmSample", () => {
    it("passes when scale + stagger snap and state toggles", () => {
        const { violations } = detectPrmSample({
            scales: [1.1, 1.1, 1.1],
            childSeries: [
                [1, 1, 1],
                [1, 1, 1],
            ],
            expandedFlags: [true, true],
        });
        expect(violations).toHaveLength(0);
    });
    it("flags a spring-running scale under PRM", () => {
        const { violations } = detectPrmSample({
            scales: [1, 1.05, 1.1],
            childSeries: [[1], [1], [1]],
            expandedFlags: [true, true, true],
        });
        expect(violations.some((v) => /hover scale rose/.test(v))).toBe(true);
    });
    it("flags a running child stagger under PRM", () => {
        const { violations } = detectPrmSample({
            scales: [1.1, 1.1],
            childSeries: [
                [0, 0],
                [0.5, 0.2],
                [1, 1],
            ],
            expandedFlags: [true, true, true],
        });
        expect(violations.some((v) => /child stagger ran/.test(v))).toBe(true);
    });
    it("flags a never-expanding state under PRM", () => {
        const { violations } = detectPrmSample({
            scales: [1, 1],
            childSeries: [[1], [1]],
            expandedFlags: [false, false],
        });
        expect(violations.some((v) => /never expanded/.test(v))).toBe(true);
    });
});

// AX.W03 — the detectSliderHold detector + its slider-hold full-probe keys are
// RETIRED. The keepDockOpen contract migrated to the deterministic mount gate
// proof:dock-hold-contract (tests/components/ui/slider/dock-hold-contract.test.ts)
// + the π-lane live visual-truth audit; the polish gate no longer carries a
// fail-open slider-hold arm.

describe("detectLayeringPolish — full probe", () => {
    it("passes a healthy end-to-end result", () => {
        const { violations } = detectLayeringPolish({
            vtForcedOff: true,
            directional: { expandMs: 320, collapseMs: 180 },
            flip: HEALTHY_FLIP,
            prm: {
                scales: [1.1, 1.1],
                childSeries: [
                    [1, 1, 1],
                    [1, 1, 1],
                ],
                expandedFlags: [true, true],
            },
        });
        expect(violations).toHaveLength(0);
    });
    it("reds on a symmetric + fixed-ms build (the pre-W3 witness)", () => {
        const { violations } = detectLayeringPolish({
            vtForcedOff: true,
            directional: { expandMs: 300, collapseMs: 302 },
            flip: FIXED_MS_CLUSTER,
        });
        expect(violations.length).toBeGreaterThan(0);
    });
    it("flags a probe error", () => {
        const { violations } = detectLayeringPolish({ error: "no collapsed dock" });
        expect(violations.length).toBeGreaterThan(0);
    });
});
