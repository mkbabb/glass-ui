// The emitted component-utility bytes: every TAILWIND-OWNED custom property the
// shipped `dist/styles/components.css` reads must either be defined somewhere in
// the shipped cascade or carry a `var()` fallback. glass-ui emits no `:root{}` of
// Tailwind's defaults, so an un-fallbacked reference resolves to NOTHING in a bare
// consumer — that is how `transition-duration` shipped as 0s (weightless motion).
//
// Tailwind-owned is read from the installed `tailwindcss/theme.css` (the same
// source `emitComponentUtilities` uses), so glass-ui's own runtime-set properties
// (`--dock-pos`, the `--reka-*` primitives) are correctly out of scope.
//
// Build ACCEPTANCE — with no `dist/` on disk there is nothing to accept, so it skips.

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join, resolve } from "node:path";

import postcss from "postcss";
import { describe, expect, it } from "vitest";

const require_ = createRequire(import.meta.url);
const DIST = join(process.cwd(), "dist");
const COMPONENTS = join(DIST, "styles/components.css");

function cssFilesUnder(directory: string): string[] {
    return readdirSync(directory, { withFileTypes: true }).flatMap((entry) =>
        entry.isDirectory()
            ? cssFilesUnder(join(directory, entry.name))
            : entry.name.endsWith(".css")
              ? [join(directory, entry.name)]
              : [],
    );
}

/** Every `var(--x[, fallback])` reference, nested bodies included. */
function varReferences(css: string): Array<{ property: string; hasFallback: boolean }> {
    const references: Array<{ property: string; hasFallback: boolean }> = [];
    for (let index = 0; index < css.length; index++) {
        if (!css.startsWith("var(", index)) continue;
        let depth = 0;
        let end = index;
        for (; end < css.length; end++) {
            if (css[end] === "(") depth++;
            else if (css[end] === ")" && --depth === 0) break;
        }
        const body = css.slice(index + 4, end);
        const comma = body.indexOf(",");
        references.push({
            property: (comma === -1 ? body : body.slice(0, comma)).trim(),
            hasFallback: comma !== -1,
        });
    }
    return references;
}

function shippedProperties(): Set<string> {
    const defined = new Set<string>();
    for (const file of cssFilesUnder(DIST)) {
        const parsed = postcss.parse(readFileSync(file, "utf-8"));
        parsed.walkDecls((declaration) => {
            if (declaration.prop.startsWith("--")) defined.add(declaration.prop);
        });
        parsed.walkAtRules("property", (rule) => {
            defined.add(rule.params.trim());
        });
    }
    return defined;
}

function tailwindOwnedProperties(): Set<string> {
    const themePath = resolve(dirname(require_.resolve("tailwindcss/package.json")), "theme.css");
    const owned = new Set<string>();
    postcss.parse(readFileSync(themePath, "utf-8")).walkAtRules("theme", (rule) => {
        rule.walkDecls((declaration) => {
            if (declaration.prop.startsWith("--")) owned.add(declaration.prop);
        });
    });
    return owned;
}

describe.skipIf(!existsSync(COMPONENTS))("emitted component utilities", () => {
    it("resolves every Tailwind-owned var in-cascade or through a fallback", () => {
        const defined = shippedProperties();
        const owned = tailwindOwnedProperties();
        const references = varReferences(readFileSync(COMPONENTS, "utf-8"));
        expect(references.length).toBeGreaterThan(0);
        const weightless = [
            ...new Set(
                references
                    .filter(({ property, hasFallback }) =>
                        owned.has(property) && !hasFallback && !defined.has(property))
                    .map(({ property }) => property),
            ),
        ].sort();
        expect(weightless).toEqual([]);
    });
});
