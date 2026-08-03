import postcss, { type AtRule, type Declaration, type Node, type Root, type Rule } from "postcss";
import { describe, expect, it } from "vitest";

import { hasCommentOutsideString, minifyCss } from "../../scripts/lib/minify-css.mjs";
import { normalizeBackdropFilterPairs } from "../../vite.style-fold";

function declarationsFor(css: string, selector: string): Array<[string, string, boolean]> {
    const found: Array<[string, string, boolean]> = [];
    postcss.parse(css).walkRules((rule) => {
        if (rule.selector !== selector) return;
        rule.walkDecls(/^(?:-webkit-)?backdrop-filter$/, (declaration) => {
            found.push([declaration.prop, declaration.value, Boolean(declaration.important)]);
        });
    });
    return found;
}

function projection(css: string): unknown {
    const visit = (node: Node): unknown => {
        if (node.type === "comment") return null;
        if (node.type === "decl") {
            const declaration = node as Declaration;
            return [declaration.type, declaration.prop, declaration.value, Boolean(declaration.important)];
        }
        if (node.type === "rule") {
            const rule = node as Rule;
            return [rule.type, rule.selector, rule.nodes.map(visit).filter((child) => child !== null)];
        }
        if (node.type === "atrule") {
            const atRule = node as AtRule;
            return [atRule.type, atRule.name, atRule.params, atRule.nodes?.map(visit).filter((child) => child !== null) ?? null];
        }
        if (node.type === "root") {
            const root = node as Root;
            return [root.type, root.nodes.map(visit).filter((child) => child !== null)];
        }
        return [node.type, node.toString()];
    };
    return visit(postcss.parse(css));
}

describe("backdrop-filter build normalization and conservative CSS minifier", () => {
    it.each<[string, string]>([
        [
            [
                ".alpha , .beta { color: red ; margin: calc(1px + -2px) ; }",
                ".parent .child :hover > .next + .later ~ .last {",
                "  --tokens: alpha beta ;",
                "  --fallback: var(--missing, warm cream) ;",
                "  width: calc((100% - 2rem) / 3) ;",
                "}",
                "@media (width > 10px) { .function-gap { --call: token (value) ; } }",
            ].join("\n"),
            ".alpha,.beta{color: red;margin: calc(1px + -2px);}" +
                ".parent .child :hover > .next + .later ~ .last{" +
                "--tokens: alpha beta;--fallback: var(--missing,warm cream);" +
                "width: calc((100% - 2rem) / 3);}" +
                "@media (width > 10px){.function-gap{--call: token (value);}}",
        ],
    ])("omits pending space only beside structural delimiters", (input, expected) => {
        expect(minifyCss(input)).toBe(expected);
    });

    it.each<[string, string]>([
        [
            [
                String.raw`@source "../*.js";`,
                String.raw`.quoted { content: " { ; , } /* literal */ "; background: URL("data:image/svg+xml,%3Csvg%3E,%3C/svg%3E"); }`,
                String.raw`.unquoted { background: url(data:image/svg+xml,%3Csvg%20id=x%3E,%3C/svg%3E); mask: url(icons/my\ image.svg#x\,y); }`,
                String.raw`.escaped\,comma .child { --value: one\;two three; }`,
                String.raw`.comment .tokens { --pair: alpha/**/beta; }`,
            ].join("\n"),
            String.raw`@source "../*.js";.quoted{content: " { ; , } /* literal */ ";background: URL("data:image/svg+xml,%3Csvg%3E,%3C/svg%3E");}.unquoted{background: url(data:image/svg+xml,%3Csvg%20id=x%3E,%3C/svg%3E);mask: url(icons/my\ image.svg#x\,y);}.escaped\,comma .child{--value: one\;two three;}.comment .tokens{--pair: alpha beta;}`,
        ],
    ])("copies strings and URL payloads while separating stripped comments", (input, expected) => {
        const output = minifyCss(input);
        expect(output).toBe(expected);
        expect(hasCommentOutsideString(input)).toBe(true);
        expect(hasCommentOutsideString(output)).toBe(false);
    });

    it.each(
        ["1", "12", "123", "1234", "12345", "123456"].map((hex) => [
            `.selector\\${hex}/**/.next{--value: \\${hex}/**/name;}`,
            `.selector\\${hex}${hex.length === 6 ? " " : "  "}.next{--value: \\${hex}${hex.length === 6 ? " " : "  "}name;}`,
        ] as [string, string]),
    )("keeps escape termination and semantic separation for %s hex digits", (input, expected) => {
        const output = minifyCss(input);
        expect(output).toBe(expected);
        expect(minifyCss(output)).toBe(output);
    });

    it.each<[string, string, boolean]>([
        [String.raw`url(foo/**/bar)`, String.raw`url(foo/**/bar)`, false], [String.raw`u\72 l(foo/**/bar)`, String.raw`u\72 l(foo/**/bar)`, false],
        [String.raw`\78 url(foo/**/bar)`, String.raw`\78 url(foo bar)`, true], [String.raw`\78/**/ url(foo/**/bar)`, String.raw`\78  url(foo/**/bar)`, true],
        [String.raw`#url(foo/**/bar)`, String.raw`#url(foo bar)`, true],
        [String.raw`@url(foo/**/bar)`, String.raw`@url(foo bar)`, true],
        [String.raw`a.url(foo/**/bar)`, String.raw`a.url(foo/**/bar)`, false],
    ])("protects only maximal decoded url names — %s", (input, expected, hasComment) => {
        const output = minifyCss(input);
        expect([output, hasCommentOutsideString(input), hasCommentOutsideString(output), minifyCss(output)]).toEqual([expected, hasComment, false, output]);
    });

    it.each<[string, string, RegExp | null]>([
        [
            "projection",
            [
                String.raw`@source "../*.js";`,
                "@theme inline { --color-panel: var(--panel); }",
                "@utility glass-panel { @apply rounded-panel border ; }",
                "@supports (backdrop-filter: blur(1px)) {",
                "  .panel { backdrop-filter: blur(calc(4px + var(--step))) saturate(var(--sat)) !important; }",
                "}",
            ].join("\n"),
            null,
        ],
        ["fail closed", String.raw`.broken{background:url(foo`, /Unterminated CSS url\(\) function/],
        ["invalid name escape before name", String.raw`.broken{--value: \
name}`, /Invalid CSS name escape/],
        ["terminal name escape", ".broken{--value: foo\\", /Invalid CSS name escape/],
    ])("preserves Tailwind/backdrop structure and fails closed — %s", (_name, input, failure) => {
        if (failure) {
            expect(() => minifyCss(input)).toThrow(failure);
            return;
        }

        const normalized = normalizeBackdropFilterPairs(input);
        const output = minifyCss(normalized);
        expect(projection(output)).toEqual(projection(normalized));
        expect(output).toContain("@utility glass-panel{@apply rounded-panel border;}");
        expect(declarationsFor(output, ".panel")).toEqual([
            ["-webkit-backdrop-filter", "blur(calc(4px + var(--step))) saturate(var(--sat))", true],
            ["backdrop-filter", "blur(calc(4px + var(--step))) saturate(var(--sat))", true],
        ]);
        expect(minifyCss(output)).toBe(output);
    });
});
