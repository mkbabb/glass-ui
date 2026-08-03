// The emitted component-utility bytes: EVERY custom property the shipped
// `dist/styles/components.css` reads must either be defined somewhere in the
// shipped cascade or carry a `var()` fallback. glass-ui emits no `:root{}` of
// Tailwind's defaults, so an un-fallbacked reference resolves to NOTHING in the
// consumer — that is how `transition-duration` shipped as 0s (weightless motion)
// and how the `--overlay-pad-*` readers shipped with no setter to read.
//
// The property scope is deliberately UNFILTERED. An earlier arm checked only
// Tailwind-owned properties (read from `tailwindcss/theme.css`), which made the
// gate blind by construction to glass-ui's own inline-set props — the class that
// shipped the overlay/card padding hole. The three runtime-set families below are
// the ONLY exemptions, named one by one.
//
// The supported consumer contract is a TAILWIND-BUILD consumer (see
// `vite.utility-emit.ts`): glass-ui's tokens ship as `@theme`, so definitions
// inside `@theme` blocks count as defined here — that is exactly what a Tailwind
// build emits to `:root`.
//
// Build ACCEPTANCE — with no `dist/` on disk there is nothing to accept, so it skips.

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

import postcss from "postcss";
import { describe, expect, it } from "vitest";

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

/**
 * Set on the ELEMENT at runtime, never in a stylesheet: the Reka primitives'
 * measured values, the dock's live offset, and the easing picker's per-instance
 * curve tint. Nothing else is exempt.
 */
function isRuntimeSet(property: string): boolean {
    return (
        property.startsWith("--reka-") ||
        property === "--dock-pos" ||
        property === "--easing-curve-accent"
    );
}

describe.skipIf(!existsSync(COMPONENTS))("emitted component utilities", () => {
    it("resolves every var it reads in-cascade, through a fallback, or at runtime", () => {
        const defined = shippedProperties();
        const references = varReferences(readFileSync(COMPONENTS, "utf-8"));
        expect(references.length).toBeGreaterThan(0);
        const weightless = [
            ...new Set(
                references
                    .filter(
                        ({ property, hasFallback }) =>
                            !hasFallback && !defined.has(property) && !isRuntimeSet(property),
                    )
                    .map(({ property }) => property),
            ),
        ].sort();
        expect(weightless).toEqual([]);
    });

    // PKT-1 — the felt-duration axis every `.transition-*` utility reads is routed
    // through the HOUSE clock (`--duration-fast`), with Tailwind's 150ms as the
    // terminal fallback, so a consumer retuning the clock governs the emitted
    // utilities instead of fighting a hardcoded literal. Asserted on emitted BYTES:
    // deleting the `houseAlias` entry in `vite.utility-emit.ts` REDs this.
    it("routes the emitted transition-duration chain through --duration-fast", () => {
        const css = readFileSync(COMPONENTS, "utf-8");
        const durations = [...css.matchAll(/transition-duration:([^;}]*)/g)].map(
            ([, value]) => value,
        );
        expect(durations.length).toBeGreaterThan(0);
        for (const value of durations) expect(value).toContain("var(--duration-fast");
    });
});
