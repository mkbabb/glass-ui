import { describe, expect, it } from "vitest";

import {
    discoverAssertionSites,
    discoverInvariantAnnotations,
} from "../../scripts/verification/discover.mjs";

describe("semantic assertion discovery", () => {
    it("uses the syntax tree rather than strings or comments", () => {
        const source = `
            // expect(hidden).toBe(true)
            const prose = "assert.equal(hidden, true)";
            expect(observed).toBe(expected);
            assert.equal(actual, expected);
        `;
        expect(discoverAssertionSites(source, "fixture.test.ts").map(({ callee }: any) => callee)).toEqual([
            "expect.toBe",
            "assert.equal",
        ]);
    });

    it("discovers, validates, de-duplicates, and sorts semantic annotations", () => {
        const annotations = discoverInvariantAnnotations(`
            /** @glass-invariant motion.single-clock, design.affordance */
            // @glass-invariant design.affordance invalid
        `);
        expect(annotations).toEqual(["design.affordance", "motion.single-clock"]);
    });
});
