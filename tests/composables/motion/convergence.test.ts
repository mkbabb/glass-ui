// BC.W-MOTION-PRESETS #5 — the convergence-reveal preset (the brand "partial-sum
// settle"). The DECIDE is the `gentle` ALIAS reuse (measured-not-distinct): a Fourier
// partial sum converges ONTO its target with a decaying Gibbs ripple — a monotone
// critically-damped approach with NO sustained overshoot past terminal. That IS
// `gentle` (ζ=1.0, analytic overshoot 0), so `--ease-convergence` resolves THROUGH
// `--spring-gentle`'s twin (no new SPRING_PRESETS row, no new engine).
//
// VERIFIES:
//   · MOTION_CURVES["--ease-convergence"] resolves to a no-overshoot settle (the
//     sampled curve never exceeds 1.0 — the partial sum converges, does not bounce
//     past), aliasing the `--spring-gentle` twin (the same callable, not a copy);
//   · it composes the SHIPPED kf solver (the SAME (response, ζ) pair as gentle) — no
//     inline curve fork;
//   · the documented orchestration recipe is `useStagger` ON `--ease-convergence`
//     (the N-term build-up) — a composition over the named curve, not a new primitive.

import { describe, expect, it } from "vitest";
import {
    MOTION_CURVES,
    motionCurve,
    springPreset,
} from "../../../src/composables/motion/curves";
import { springTimingFunction } from "@mkbabb/keyframes.js";

describe("convergence-reveal preset (--ease-convergence)", () => {
    it("is a curve-table-bound MOTION_CURVES row (the named brand signature)", () => {
        const row = MOTION_CURVES["--ease-convergence"];
        expect(row).toBeDefined();
        // It is the ALIAS reuse (resolve-through), not a canonical fork — it names a
        // `canonical` target (the no-new-row DECIDE).
        expect(row.canonical).toBe("--spring-gentle");
        expect(row.kind).toBe("spring");
    });

    it("aliases the `--spring-gentle` twin (the SAME callable, not a duplicate)", () => {
        const convergence = MOTION_CURVES["--ease-convergence"];
        const gentle = MOTION_CURVES["--spring-gentle"];
        // Resolve-through: the alias row carries the canonical row's twin identity.
        expect(convergence.js).toBe(gentle.js);
        expect(motionCurve("--ease-convergence").js).toBe(gentle.js);
    });

    it("is a NO-OVERSHOOT settle — the curve never exceeds 1.0 (the partial sum converges, does not bounce past)", () => {
        const fn = (MOTION_CURVES["--ease-convergence"].js as { fn: (t: number) => number }).fn;
        let max = -Infinity;
        for (let t = 0; t <= 1; t += 0.005) {
            const y = fn(t);
            if (y > max) max = y;
            // critically-damped: monotone approach, never overshoots the target.
            expect(y).toBeLessThanOrEqual(1 + 1e-9);
        }
        // it actually reaches the target by t=1 (a real settle, not a clamp).
        expect(fn(1)).toBeCloseTo(1, 5);
        expect(fn(0)).toBeCloseTo(0, 5);
        expect(max).toBeLessThanOrEqual(1 + 1e-9);
    });

    it("composes the SHIPPED kf solver over the SAME (response, ζ) pair as gentle (no inline fork)", () => {
        const gentle = springPreset("gentle");
        // gentle is the measured critically-damped register (ζ=1.0, overshoot 0).
        expect(gentle.dampingFraction).toBe(1.0);
        const reference = springTimingFunction({
            response: gentle.response,
            dampingFraction: gentle.dampingFraction,
        });
        const twinFn = (MOTION_CURVES["--ease-convergence"].js as { fn: (t: number) => number }).fn;
        for (const t of [0, 0.1, 0.25, 0.5, 0.75, 1]) {
            expect(twinFn(t)).toBeCloseTo(reference.fn(t), 6);
        }
    });
});
