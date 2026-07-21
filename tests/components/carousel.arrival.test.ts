import { describe, expect, it } from "vitest";

import { arrivalDistance } from "@glass/components/carousel/arrival";

// BJ.W-FEEDBACK-MOTION-TUNE — RU-21 N4. The compositor-arrival distance takes the
// shortest path across the wrap seam ONLY when embla loops.
describe("arrivalDistance — wrap-seam shortest path under loop (RU-21 N4)", () => {
    const N = 5; // 5 slides -> snaps at 0, 0.25, 0.5, 0.75, 1

    it("measures the seam slide as ADJACENT when looping, not near-full", () => {
        // progress just past the first snap; the last slide (snap 1.0) is one step
        // across the wrap seam — visually adjacent, so t must be small.
        const seamLoop = arrivalDistance(1.0, 0.02, N, true);
        const seamNoLoop = arrivalDistance(1.0, 0.02, N, false);

        // looping: min(|0.98|, |0.02|) = 0.02 -> t = 0.02 * 4 = 0.08 (near centre, lit)
        expect(seamLoop).toBeCloseTo(0.08, 6);
        // non-looping: |0.98| -> clamped to 1 (fully faded far edge)
        expect(seamNoLoop).toBe(1);
        // the loop branch genuinely changes the result (non-vacuity of the `if (loop)`)
        expect(seamLoop).toBeLessThan(seamNoLoop);
    });

    it("leaves the interior distances unchanged by the wrap rule", () => {
        // a slide half a track away is equidistant either way (min(0.5, 0.5) = 0.5)
        expect(arrivalDistance(0.5, 0.0, N, true)).toBe(arrivalDistance(0.5, 0.0, N, false));
        // the centred slide is at distance 0 in both modes
        expect(arrivalDistance(0.25, 0.25, N, true)).toBe(0);
        expect(arrivalDistance(0.25, 0.25, N, false)).toBe(0);
    });

    it("clamps to [0,1] and survives a single-snap track", () => {
        // one snap: the sole slide sits at progress, distance 0; the `|| 1` guard
        // only avoids a multiply-by-zero and is never reached at the real centre.
        expect(arrivalDistance(0, 0, 1, false)).toBe(0);
        expect(arrivalDistance(1, -1, N, false)).toBe(1); // over-range distance clamps to 1
    });
});
