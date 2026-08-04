// The backdrop-filter prefix pair — the transform (unit) and the shipped bytes (build).
//
// Arm (a) is the transform on inline strings: `normalizeBackdropFilterPairs` makes every
// surviving leg an adjacent, same-value, same-important pair in canonical order.
// Arm (b) is G-GLASS-HAS-FROST's BUILD stage: the same invariant read off `dist/**.css`,
// which is where the regression actually bites (Lightning drops the -webkit- leg on the
// emitted bundle, not on the source). It is build ACCEPTANCE, not a unit invariant — with
// no `dist/` on disk there is nothing to accept, so the arm skips rather than lies.

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

import postcss, { type Container } from "postcss";
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

const DIST = join(process.cwd(), "dist");

function distCssFiles(dir: string): string[] {
    return readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
        entry.isDirectory()
            ? distCssFiles(join(dir, entry.name))
            : entry.name.endsWith(".css")
              ? [join(dir, entry.name)]
              : [],
    );
}

function unpairedIn(css: string, file: string): string[] {
    const unpaired: string[] = [];
    const scan = (container: Container) => {
        const nodes = container.nodes ?? [];
        for (let index = 0; index < nodes.length; index++) {
            const node = nodes[index];
            if (
                node.type !== "decl" ||
                (node.prop !== "-webkit-backdrop-filter" && node.prop !== "backdrop-filter")
            ) {
                continue;
            }
            const next = nodes[index + 1];
            const paired =
                node.prop === "-webkit-backdrop-filter" &&
                next?.type === "decl" &&
                next.prop === "backdrop-filter" &&
                next.value === node.value &&
                Boolean(next.important) === Boolean(node.important);
            if (paired) index++;
            else unpaired.push(`${file} :: ${node.parent?.toString().slice(0, 60)} :: ${node.prop}`);
        }
    };
    const root = postcss.parse(css);
    root.walk((node) => {
        if (node.type === "rule" || node.type === "atrule") scan(node);
    });
    return unpaired;
}

describe("G-GLASS-HAS-FROST arm (b) — the shipped dist bytes", () => {
    const built = existsSync(DIST);
    const buildHint = "dist/ is absent — run `npm run build` first; the dist arm is load-bearing and a skipped run is not a pass";
    it("ships every backdrop-filter as an adjacent -webkit-/standard pair", () => {
        expect(built, buildHint).toBe(true);
        const files = distCssFiles(DIST);
        expect(files.length).toBeGreaterThan(0);
        const unpaired = files.flatMap((file) => unpairedIn(readFileSync(file, "utf-8"), file));
        expect(unpaired).toEqual([]);
    });
});
