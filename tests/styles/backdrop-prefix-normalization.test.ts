import postcss from "postcss";
import { describe, expect, it } from "vitest";

import { normalizeBackdropFilterPairs } from "../../vite.style-fold";

function declarationsFor(css: string, selector: string): Array<[string, string, boolean]> {
    const declarations: Array<[string, string, boolean]> = [];
    postcss.parse(css).walkRules((rule) => {
        if (rule.selector !== selector) return;
        rule.walkDecls(/^(?:-webkit-)?backdrop-filter$/, (decl) => {
            declarations.push([decl.prop, decl.value, Boolean(decl.important)]);
        });
    });
    return declarations;
}

function backdropDeclarations(css: string): Array<[string, string, boolean]> {
    const declarations: Array<[string, string, boolean]> = [];
    postcss.parse(css).walkDecls(/^(?:-webkit-)?backdrop-filter$/, (decl) => {
        declarations.push([decl.prop, decl.value, Boolean(decl.important)]);
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
            ["-webkit-backdrop-filter", "blur(var(--radius, calc(4px + var(--step))))", false],
            ["backdrop-filter", "blur(var(--radius, calc(4px + var(--step))))", false],
        ]);
        expect(declarationsFor(output, ".unprefixed-only")).toEqual([
            [
                "-webkit-backdrop-filter",
                "blur(calc(var(--r) * var(--l))) saturate(var(--sat))",
                false,
            ],
            ["backdrop-filter", "blur(calc(var(--r) * var(--l))) saturate(var(--sat))", false],
        ]);
        expect(declarationsFor(output, ".paired")).toEqual([
            ["-webkit-backdrop-filter", "var(--filter)", false],
            ["backdrop-filter", "var(--filter)", false],
        ]);
        expect(declarationsFor(output, ".nested")).toEqual([
            ["-webkit-backdrop-filter", "var(--nested)", false],
            ["backdrop-filter", "var(--nested)", false],
        ]);
        expect(output).toContain("@supports (backdrop-filter: blur(1px))");
        expect(output).not.toContain("@supports (-webkit-backdrop-filter:");
        expect(normalizeBackdropFilterPairs(output)).toBe(output);
    });

    it("does not reorder declarations across an important mismatch", () => {
        const input =
            ".cascade { backdrop-filter: blur(1px); -webkit-backdrop-filter: blur(1px) !important; }";
        const output = normalizeBackdropFilterPairs(input);

        expect(declarationsFor(output, ".cascade")).toEqual([
            ["-webkit-backdrop-filter", "blur(1px)", false],
            ["backdrop-filter", "blur(1px)", false],
            ["-webkit-backdrop-filter", "blur(1px)", true],
            ["backdrop-filter", "blur(1px)", true],
        ]);
        expect(normalizeBackdropFilterPairs(output)).toBe(output);
    });

    it("normalizes direct declarations recursively inside nested at-rules", () => {
        const input = [
            "@media (min-width: 1px) {",
            "  @supports (backdrop-filter: blur(1px)) {",
            "    backdrop-filter: blur(2px) !important;",
            "  }",
            "}",
        ].join("\n");
        const output = normalizeBackdropFilterPairs(input);

        expect(backdropDeclarations(output)).toEqual([
            ["-webkit-backdrop-filter", "blur(2px)", true],
            ["backdrop-filter", "blur(2px)", true],
        ]);
        expect(output).toContain("@supports (backdrop-filter: blur(1px))");
        expect(normalizeBackdropFilterPairs(output)).toBe(output);
    });
});
