import { describe, expect, it } from "vitest";

import {
    resolveValueFraction,
    resolveValueMarks,
} from "@glass/components/_shared/valueDomain";

describe("valueDomain", () => {
    it("normalizes and clamps arbitrary finite domains", () => {
        expect(resolveValueFraction(0.5, 0, 1)).toBe(0.5);
        expect(resolveValueFraction(125, 0, 250)).toBe(0.5);
        expect(resolveValueFraction(-5, -10, 10)).toBe(0.25);
        expect(resolveValueFraction(-20, -10, 10)).toBe(0);
        expect(resolveValueFraction(20, -10, 10)).toBe(1);
    });

    it("falls back to the domain start for missing or non-finite values", () => {
        expect(resolveValueFraction(undefined, -10, 10)).toBe(0);
        expect(resolveValueFraction(null, -10, 10)).toBe(0);
        expect(resolveValueFraction(Number.NaN, -10, 10)).toBe(0);
        expect(resolveValueFraction(Number.POSITIVE_INFINITY, -10, 10)).toBe(0);
    });

    it("sorts, exact-deduplicates, and positions finite interior marks", () => {
        expect(
            resolveValueMarks([10, 0.5, -5, 0.5, Number.NaN, 5], -10, 10),
        ).toEqual([
            { value: -5, position: 0.25 },
            { value: 0.5, position: 0.525 },
            { value: 5, position: 0.75 },
        ]);
    });

    it("omits endpoints and out-of-range values rather than piling them up", () => {
        expect(resolveValueMarks([-20, -10, 0, 10, 20], -10, 10)).toEqual([
            { value: 0, position: 0.5 },
        ]);
    });

    it("returns an empty result for absent marks or an invalid domain", () => {
        expect(resolveValueMarks(undefined, 0, 1)).toEqual([]);
        expect(resolveValueMarks([0.5], 1, 1)).toEqual([]);
        expect(resolveValueMarks([0.5], 2, 1)).toEqual([]);
        expect(resolveValueMarks([0.5], Number.NaN, 1)).toEqual([]);
        expect(resolveValueFraction(0.5, 1, 1)).toBe(0);
        expect(resolveValueFraction(0.5, 0, Number.POSITIVE_INFINITY)).toBe(0);
    });
});
