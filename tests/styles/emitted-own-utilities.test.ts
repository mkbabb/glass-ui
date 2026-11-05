// U/B7b X3 — glass-ui's OWN `@utility` classes ride `dist/styles/components.css`.
//
// The utility emit (`vite.utility-emit.ts`) compiles every class token the shipped
// chunks carry against glass-ui's `@theme`. Its compile context held the theme and
// nothing else, so a class that names a glass `@utility` (`shadow-cartoon` on the
// Configurator preset chips, `glass-plate`, `transition-control`, …) compiled to
// nothing. Those rules reached a consumer only through the `@source "../*.js"` scan
// in `dist/styles/index.css`, which is the one dependency the emit exists to remove.
//
// Build ACCEPTANCE: it reads `dist/`, as `emitted-utility-vars.test.ts` does.

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

import postcss from "postcss";
import { describe, expect, it } from "vitest";

import { collectStyleClosure } from "../../vite.style-fold";

const DIST = join(process.cwd(), "dist");
const COMPONENTS = join(DIST, "styles/components.css");

/** Every class token a shipped chunk or a chunk's SFC sheet carries in a string literal. */
function shippedClassTokens(): Set<string> {
    const sources = readdirSync(DIST)
        .filter((file) => file.endsWith(".js") || file.endsWith(".css"))
        .map((file) => readFileSync(join(DIST, file), "utf8"));
    const tokens = new Set<string>();
    for (const source of sources) {
        for (const match of source.matchAll(/["'`]([^"'`\n]*?)["'`]/g)) {
            for (const part of match[1].split(/\s+/)) if (part) tokens.add(part);
        }
    }
    return tokens;
}

/** The static (non-functional) `@utility` names glass-ui declares in its style closure. */
function ownUtilities(): string[] {
    const names = new Set<string>();
    for (const path of collectStyleClosure(process.cwd()).orderedCssSources) {
        postcss.parse(readFileSync(path, "utf8")).walkAtRules("utility", (rule) => {
            if (!rule.params.endsWith("-*")) names.add(rule.params.trim());
        });
    }
    return [...names].sort();
}

describe.skipIf(!existsSync(COMPONENTS))("glass-ui's own utilities in the emitted components.css", () => {
    it("emits `.shadow-cartoon`, which the Configurator preset chips carry", () => {
        expect(shippedClassTokens().has("shadow-cartoon")).toBe(true);
        const css = readFileSync(COMPONENTS, "utf8");
        expect(/\.shadow-cartoon\s*\{[^}]*box-shadow:\s*var\(--shadow-cartoon\)/.test(css), "no .shadow-cartoon rule").toBe(true);
    });

    it("emits every glass @utility a shipped chunk names", () => {
        const tokens = shippedClassTokens();
        const emitted = new Set<string>();
        postcss.parse(readFileSync(COMPONENTS, "utf8")).walkRules((rule) => {
            for (const match of rule.selector.matchAll(/\.((?:\\.|[\w-])+)/g)) emitted.add(match[1].replace(/\\/g, ""));
        });
        const missing = ownUtilities().filter((name) => tokens.has(name) && !emitted.has(name));
        expect(missing).toEqual([]);
    });
});
