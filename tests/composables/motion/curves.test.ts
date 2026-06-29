// AY.W-MOTION2 — the curve library + the CSS↔JS MOTION_CURVES table.
//
// VERIFIES:
//   · MOTION_CURVES covers every canonical + alias --ease-*/--spring-* token;
//   · spring rows carry a keyframes.js `Easing` ({ fn, css? }), bezier rows a
//     callable `TimingFunction`;
//   · alias rows resolve-through to their canonical row's twin (SAME callable,
//     not a duplicate);
//   · the spring twin is solved from the SAME (response, ζ) pair the shared
//     SPRING_PRESETS table holds (drift-proof, single-sourced);
//   · the value.js ease* family is re-exported and callable.

import { describe, expect, it } from "vitest";
import {
    MOTION_CURVES,
    MOTION_CURVES_CANONICAL,
    motionCurve,
    easeOutCubic,
    easeOutExpo,
    CSSCubicBezier,
    SPRING_PRESETS,
    springPreset,
} from "@glass/composables/motion/curves";
import { springTimingFunction } from "@mkbabb/keyframes.js";

const SPRING_TOKENS = [
    "--spring-smooth",
    "--spring-snappy",
    "--spring-bouncy",
    "--spring-gentle",
    "--spring-dock",
    "--spring-press",
    // BD.W-TIMELINE-RAIL-UNIFY — the 3 ScrubberTimeline spring presets (head/fill/press),
    // declared after the 6 base presets in SPRING_PRESETS, so emitted last among springs.
    "--spring-timeline-head",
    "--spring-timeline-fill",
    "--spring-timeline-press",
] as const;

const BEZIER_CANONICAL = [
    "--motion-ease-standard",
    "--motion-ease-out",
    "--motion-ease-in",
    "--motion-ease-out-expo",
    "--motion-ease-apple",
    // BD.W-CARTOON-PUNCH — the cartoon overshoot register (anticipation dip → +22%
    // overshoot → settle), a canonical bezier row declared last in curves.ts CANONICAL.
    "--ease-cartoon-punch",
] as const;

const ALIAS_TOKENS = [
    "--ease-standard",
    "--ease-out",
    "--ease-in",
    "--ease-out-expo",
    "--ease-apple",
    "--ease-spring",
    "--ease-decelerate",
    "--ease-accelerate",
    "--ease-spring-smooth",
    "--ease-spring-snappy",
    "--ease-spring-bouncy",
    "--ease-spring-gentle",
    "--ease-spring-press",
    "--ease-convergence",
] as const;

describe("MOTION_CURVES — the CSS↔JS curve table", () => {
    it("covers every canonical spring + bezier token", () => {
        for (const t of [...SPRING_TOKENS, ...BEZIER_CANONICAL]) {
            expect(MOTION_CURVES[t], `missing canonical row ${t}`).toBeDefined();
            expect(MOTION_CURVES[t].canonical, `${t} is canonical`).toBeUndefined();
        }
    });

    it("covers every alias token, each resolve-through to a present canonical", () => {
        for (const t of ALIAS_TOKENS) {
            const row = MOTION_CURVES[t];
            expect(row, `missing alias row ${t}`).toBeDefined();
            expect(row.canonical, `${t} names a canonical`).toBeDefined();
            expect(MOTION_CURVES[row.canonical!], `${t}→${row.canonical} target present`).toBeDefined();
            // resolve-through: the alias twin IS the canonical's twin (same identity).
            expect(row.js).toBe(MOTION_CURVES[row.canonical!].js);
        }
    });

    it("spring rows carry a keyframes.js Easing ({ fn }); bezier rows a callable", () => {
        for (const t of SPRING_TOKENS) {
            const row = MOTION_CURVES[t];
            expect(row.kind).toBe("spring");
            // Easing shape — { fn: (t)=>number, css? }
            expect(typeof (row.js as { fn: unknown }).fn).toBe("function");
        }
        for (const t of BEZIER_CANONICAL) {
            const row = MOTION_CURVES[t];
            expect(row.kind).toBe("bezier");
            expect(typeof row.js).toBe("function");
            // a bezier callable maps [0,1] endpoints faithfully.
            const fn = row.js as (x: number) => number;
            expect(fn(0)).toBeCloseTo(0, 5);
            expect(fn(1)).toBeCloseTo(1, 5);
        }
    });

    it("the spring twin is solved from the SAME (response, ζ) pair as SPRING_PRESETS (single-source)", () => {
        for (const name of ["smooth", "snappy", "bouncy", "gentle", "dock", "press"] as const) {
            const preset = springPreset(name);
            const row = MOTION_CURVES[`--spring-${name}`];
            const reference = springTimingFunction({
                response: preset.response,
                dampingFraction: preset.dampingFraction,
            });
            // Same solver, same pair → identical sampled curve at several points.
            const twinFn = (row.js as { fn: (t: number) => number }).fn;
            for (const t of [0, 0.1, 0.25, 0.5, 0.75, 1]) {
                expect(twinFn(t)).toBeCloseTo(reference.fn(t), 6);
            }
        }
    });

    it("motionCurve() throws on an unknown token", () => {
        expect(() => motionCurve("--not-a-curve")).toThrow(/Unknown motion curve/);
        expect(motionCurve("--spring-snappy").token).toBe("--spring-snappy");
    });

    it("the canonical list is the 15 canonical rows in declaration order", () => {
        expect(MOTION_CURVES_CANONICAL.map((c) => c.token)).toEqual([
            ...SPRING_TOKENS,
            ...BEZIER_CANONICAL,
        ]);
    });
});

describe("SPRING_PRESETS — the shared single-source table", () => {
    it("holds the six iOS-canonical (response, ζ) pairs", () => {
        const byName = Object.fromEntries(SPRING_PRESETS.map((p) => [p.name, p]));
        // BD.W-ANIM-IOS27-TUNE — the GLOBAL re-calibration toward the iOS-27 weighty-
        // gooey-inertial pole (longer response → inertia/weight; through-body damping
        // toward critically-damped-with-a-TOUCH-of-overshoot; every overshoot ∈ [0%,10%]).
        // The BC.W-SPRING-EASE byte-frozen KEEP fence is RETIRED — all six rows re-tune
        // in lockstep; gentle ζ stays EXACTLY 1.0 (the --ease-convergence alias depends
        // on overshoot==0).
        expect(byName.smooth).toMatchObject({ response: 0.58, dampingFraction: 0.8 });
        expect(byName.snappy).toMatchObject({ response: 0.48, dampingFraction: 0.74 });
        expect(byName.bouncy).toMatchObject({ response: 0.6, dampingFraction: 0.6 });
        expect(byName.gentle).toMatchObject({ response: 0.82, dampingFraction: 1.0 });
        expect(byName.dock).toMatchObject({ response: 0.68, dampingFraction: 0.64 });
        expect(byName.press).toMatchObject({ response: 0.2, dampingFraction: 0.8 });
    });
});

describe("the value.js ease* family is re-exported", () => {
    it("re-exports callable easings", () => {
        for (const fn of [easeOutCubic, easeOutExpo]) {
            expect(typeof fn).toBe("function");
            expect(fn(0)).toBeCloseTo(0, 5);
            expect(fn(1)).toBeCloseTo(1, 5);
        }
    });
    it("re-exports the CSSCubicBezier evaluator", () => {
        const fn = CSSCubicBezier(0.25, 0.1, 0.25, 1);
        expect(typeof fn).toBe("function");
        expect(fn(0)).toBeCloseTo(0, 5);
        expect(fn(1)).toBeCloseTo(1, 5);
    });
});
