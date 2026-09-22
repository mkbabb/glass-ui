// The math-serif seam over the SHIPPED bytes. `--font-serif-math` is a theme-scope
// font register: declared once in a plain `@theme` (so Tailwind mints
// `font-serif-math` reading the variable, and a consumer `@theme` re-declaration
// replaces the value), never in the unlayered token root (unlayered beats a
// consumer's `@layer theme` declaration regardless of order—it would repaint
// every consumer site in the UA serif). The utility that read the name before
// anything declared it, `cm-serif`, is deleted outright.
//
// The proof compiles the dist's `@theme` + typography utilities through the
// Tailwind compiler a consumer build runs, so "the utility exists" is measured,
// not inferred from a string. Build ACCEPTANCE—with no `dist/` on disk there is
// nothing to accept, so it skips.

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";

import { compile } from "tailwindcss";
import { describe, expect, it } from "vitest";

const STYLES = join(process.cwd(), "dist/styles");

function cssFilesUnder(directory: string): string[] {
    return readdirSync(directory, { withFileTypes: true }).flatMap((entry) =>
        entry.isDirectory()
            ? cssFilesUnder(join(directory, entry.name))
            : entry.name.endsWith(".css")
              ? [join(directory, entry.name)]
              : [],
    );
}

async function buildCandidates(candidates: string[]): Promise<string> {
    const compiler = await compile(
        '@import "./theme.css";\n@import "./typography/utilities.css";\n@tailwind utilities;',
        {
            base: STYLES,
            loadStylesheet: async (id, from) => {
                const path = resolve(from, id);
                return {
                    path,
                    base: dirname(path),
                    content: await readFile(path, "utf8"),
                };
            },
        },
    );
    return compiler.build(candidates);
}

describe.skipIf(!existsSync(join(STYLES, "theme.css")))("the math-serif seam", () => {
    it("mints `font-serif-math` reading the theme variable, with `serif` the declared default", async () => {
        const out = await buildCandidates(["font-serif-math"]);
        expect(out).toMatch(
            /\.font-serif-math\s*\{\s*font-family:\s*var\(--font-serif-math\);\s*\}/,
        );
        expect(out).toMatch(/--font-serif-math:\s*serif;/);
    });

    it("ships no `cm-serif` utility and no `cm-serif` byte", async () => {
        expect(await buildCandidates(["cm-serif"])).not.toContain(".cm-serif");
        const carriers = cssFilesUnder(STYLES).filter((file) =>
            readFileSync(file, "utf8").includes("cm-serif"),
        );
        expect(carriers).toEqual([]);
    });

    it("declares the register only inside a plain `@theme`, never in a token root", () => {
        const declarers = cssFilesUnder(STYLES).filter((file) =>
            readFileSync(file, "utf8").includes("--font-serif-math:"),
        );
        expect(declarers.map((file) => file.slice(STYLES.length + 1))).toEqual([
            "theme/literals.css",
        ]);
        const literals = readFileSync(join(STYLES, "theme/literals.css"), "utf8");
        expect(literals.startsWith("@theme{")).toBe(true);
    });
});
