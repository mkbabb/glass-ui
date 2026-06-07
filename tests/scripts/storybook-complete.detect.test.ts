import { describe, expect, it } from "vitest";

import { detect, COMPOSED_BY } from "../../scripts/proof-storybook-complete.mjs";

/**
 * AW.W28.a — the pure-detector unit for `proof:storybook-complete`.
 *
 * The gate enumerates the public component-export surface + the demonstrated
 * set (story import graph) and asserts the export → story map is TOTAL. This
 * unit covers the pure `detect()` directly so the failure path cannot regress
 * to a false-GREEN: an undemonstrated component export MUST violate.
 */

describe("proof:storybook-complete detect()", () => {
    it("passes when every component export is demonstrated", () => {
        const comps = new Map([
            ["Button", "/src/components/ui/button/Button.vue"],
            ["Card", "/src/components/ui/card/Card.vue"],
        ]);
        const demonstrated = new Set(["Button", "Card", "cn"]);
        const { facts, violations } = detect(comps, demonstrated, {});
        expect(violations).toHaveLength(0);
        expect(facts.undemonstrated).toEqual([]);
    });

    it("violates on a component export with zero demonstration", () => {
        const comps = new Map([
            ["Button", "/src/components/ui/button/Button.vue"],
            ["HeaderRibbon", "/src/components/custom/header-ribbon/HeaderRibbon.vue"],
        ]);
        const demonstrated = new Set(["Button"]);
        const { facts, violations } = detect(comps, demonstrated, {});
        expect(facts.undemonstrated).toEqual(["HeaderRibbon"]);
        expect(violations.some((v) => v.includes("HeaderRibbon"))).toBe(true);
    });

    it("accepts a composed-by sub-component when its parent is demonstrated", () => {
        const comps = new Map([
            ["Progress", "/src/.../Progress.vue"],
            ["ProgressGradient", "/src/.../ProgressGradient.vue"],
        ]);
        const demonstrated = new Set(["Progress"]); // gradient ridden via variant
        const { violations } = detect(comps, demonstrated, {
            ProgressGradient: "Progress",
        });
        expect(violations).toHaveLength(0);
    });

    it("flags a dead composed-by claim (parent itself undemonstrated)", () => {
        const comps = new Map([["ProgressGradient", "/src/.../ProgressGradient.vue"]]);
        const demonstrated = new Set<string>(); // parent Progress NOT demonstrated
        const { violations } = detect(comps, demonstrated, {
            ProgressGradient: "Progress",
        });
        expect(violations.some((v) => v.includes("dead claim"))).toBe(true);
    });

    it("ships a non-empty COMPOSED_BY allowlist whose parents are real names", () => {
        // The allowlist must name a parent for each internal sub-component.
        expect(Object.keys(COMPOSED_BY).length).toBeGreaterThan(0);
        for (const parent of Object.values(COMPOSED_BY)) {
            expect(typeof parent).toBe("string");
            expect(parent.length).toBeGreaterThan(0);
        }
    });
});
