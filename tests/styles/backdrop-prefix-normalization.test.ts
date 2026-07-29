import postcss from "postcss";
import { describe, expect, it } from "vitest";

import { normalizeBackdropFilterPairs } from "../../vite.style-fold";

function declarationsFor(css: string, selector: string): Array<[string, string]> {
    const declarations: Array<[string, string]> = [];
    postcss.parse(css).walkRules((rule) => {
        if (rule.selector !== selector) return;
        rule.walkDecls(/^(?:-webkit-)?backdrop-filter$/, (decl) => {
            declarations.push([decl.prop, decl.value]);
        });
    });
    return declarations;
}

describe("backdrop-filter build normalization", () => {
    it("pairs either surviving leg without touching nested values or @supports conditions", () => {
        const input = [
            ".prefix-only { -webkit-backdrop-filter: blur(var(--radius, calc(4px + var(--step)))); }",
            ".unprefixed-only { backdrop-filter: blur(calc(var(--r) * var(--l))) saturate(var(--sat)); }",
            ".paired { -webkit-backdrop-filter: var(--filter); backdrop-filter: var(--filter); }",
            "@supports (backdrop-filter: blur(1px)) { .nested { backdrop-filter: var(--nested); } }",
        ].join("\n");

        const output = normalizeBackdropFilterPairs(input);

        expect(declarationsFor(output, ".prefix-only")).toEqual([
            ["-webkit-backdrop-filter", "blur(var(--radius, calc(4px + var(--step))))"],
            ["backdrop-filter", "blur(var(--radius, calc(4px + var(--step))))"],
        ]);
        expect(declarationsFor(output, ".unprefixed-only")).toEqual([
            [
                "-webkit-backdrop-filter",
                "blur(calc(var(--r) * var(--l))) saturate(var(--sat))",
            ],
            ["backdrop-filter", "blur(calc(var(--r) * var(--l))) saturate(var(--sat))"],
        ]);
        expect(declarationsFor(output, ".paired")).toEqual([
            ["-webkit-backdrop-filter", "var(--filter)"],
            ["backdrop-filter", "var(--filter)"],
        ]);
        expect(declarationsFor(output, ".nested")).toEqual([
            ["-webkit-backdrop-filter", "var(--nested)"],
            ["backdrop-filter", "var(--nested)"],
        ]);
        expect(output).toContain("@supports (backdrop-filter: blur(1px))");
        expect(output).not.toContain("@supports (-webkit-backdrop-filter:");
        expect(normalizeBackdropFilterPairs(output)).toBe(output);
    });
});
