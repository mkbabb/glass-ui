import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import {
    easeInOut,
    loopProgressValue,
} from "../../demo/stories/feedback/loop-driver";

const PROGRESS_STORY = readFileSync(
    resolve(process.cwd(), "demo/stories/feedback/progress.vue"),
    "utf8",
);
const MOTION_TOKENS = readFileSync(
    resolve(process.cwd(), "src/styles/tokens/scheme-motion.css"),
    "utf8",
);

// BJ.W-FEEDBACK-MOTION-TUNE gate (a)+(c) — F22 / J7. The demo loop driver.
describe("Progress demo loop driver — re-homed off setInterval (F22 / J7)", () => {
    // (c) DRIVER-SHAPE — RED at HEAD: the loop was a `window.setInterval(…, 120)` stepping the
    // value +3% per tick, a stepped staircase interrupting the 300ms fill transition; at the wrap
    // it snapped `animated.value = 0`, a full-width backward rewind glide.
    it("carries no setInterval progress driver — the stepped timer is retired", () => {
        expect(PROGRESS_STORY).not.toMatch(/setInterval/);
        // No instantaneous snap-to-zero reset (the wrap-rewind source): the value is a
        // continuous function of time, never reassigned to 0 mid-loop.
        expect(PROGRESS_STORY).not.toMatch(/animated\.value\s*=\s*0\b/);
    });

    it("drives the loop on requestAnimationFrame — a continuous eased loop", () => {
        expect(PROGRESS_STORY).toMatch(/requestAnimationFrame/);
        expect(PROGRESS_STORY).toMatch(/cancelAnimationFrame/);
    });

    // (a) CANON PERIOD — the loop breathes on the canon indeterminate-sweep tempo
    // (--motion-duration-progress-indeterminate = 4s, the R3b 4000ms engagement exemplar),
    // read from the token layer, never a component-local literal.
    it("sources the loop period from the canon --motion-duration-progress-indeterminate token", () => {
        expect(PROGRESS_STORY).toContain("--motion-duration-progress-indeterminate");
        expect(MOTION_TOKENS).toMatch(
            /--motion-duration-progress-indeterminate:\s*4s/,
        );
    });
});

// (a)+(c) — the eased-loop VALUE FUNCTION. A characterization of the re-homed
// driver's shape; non-vacuous because a monotonic-fill-then-snap driver (the HEAD
// artifact) fails the continuity assertion directly.
describe("loopProgressValue — a continuous eased breath that owns its return leg", () => {
    it("eases in and out (smoothstep: zero slope at both endpoints)", () => {
        expect(easeInOut(0)).toBe(0);
        expect(easeInOut(1)).toBe(1);
        expect(easeInOut(0.5)).toBeCloseTo(0.5, 6);
        // slope near the endpoints is ~0 (ease-in / ease-out), steep at the middle
        const slope = (a: number, b: number) => (easeInOut(b) - easeInOut(a)) / (b - a);
        expect(slope(0, 0.02)).toBeLessThan(slope(0.48, 0.52));
        expect(slope(0.98, 1)).toBeLessThan(slope(0.48, 0.52));
    });

    it("fills then drains — a symmetric triangle peaking at 100 mid-cycle", () => {
        expect(loopProgressValue(0)).toBeCloseTo(0, 6);
        expect(loopProgressValue(0.5)).toBeCloseTo(100, 6);
        expect(loopProgressValue(1)).toBeCloseTo(0, 6);
        // fill leg is monotonic up; drain leg is monotonic down
        expect(loopProgressValue(0.25)).toBeGreaterThan(loopProgressValue(0.1));
        expect(loopProgressValue(0.75)).toBeLessThan(loopProgressValue(0.6));
    });

    it("is continuous at the wrap — no instantaneous 100→0 snap (no backward wrap frame)", () => {
        // The born-RED artifact snapped animated 100→0, so the fill's 300ms transition
        // rewound the full track. Here value(1⁻) === value(0) === 0: no discontinuity.
        expect(loopProgressValue(0.9999)).toBeCloseTo(0, 2);
        expect(loopProgressValue(0.9999)).toBeCloseTo(loopProgressValue(0), 2);
        // no adjacent-sample jump exceeds a small bound anywhere across the cycle
        let maxJump = 0;
        let prev = loopProgressValue(0);
        for (let p = 0.001; p <= 1.0001; p += 0.001) {
            const v = loopProgressValue(p);
            maxJump = Math.max(maxJump, Math.abs(v - prev));
            prev = v;
        }
        // fastest leg is ~0.63%/0.001-phase at mid-cycle; the wrap adds no larger jump.
        expect(maxJump).toBeLessThan(1);
    });

    it("wraps any real phase into one cycle (rAF `elapsed/period` may exceed 1)", () => {
        expect(loopProgressValue(2.5)).toBeCloseTo(loopProgressValue(0.5), 6);
        expect(loopProgressValue(-0.25)).toBeCloseTo(loopProgressValue(0.75), 6);
    });
});
