import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// happy-dom runs no CSS cascade, so the radius aliases are resolved from source:
// follow each `var(--x)` chain to its terminal literal. The bind's payoff is a
// one-source guarantee (the dialog corner can never drift from the card), so the
// assertions read the alias GRAPH, not a repainted pixel.

const read = (rel: string): string => readFileSync(join(process.cwd(), rel), "utf8");

const declMap = (css: string): Map<string, string> => {
    const stripped = css.replace(/\/\*[\s\S]*?\*\//g, "");
    const map = new Map<string, string>();
    for (const m of stripped.matchAll(/(--[\w-]+)\s*:\s*([^;{}]+);/g)) {
        map.set(m[1], m[2].replace(/\s+/g, " ").trim());
    }
    return map;
};

// Follow a `var(--x)` alias chain to its terminal (non-var) value.
const resolve = (map: Map<string, string>, token: string): string => {
    let cur = token;
    const seen = new Set<string>();
    while (map.has(cur) && !seen.has(cur)) {
        seen.add(cur);
        const value = map.get(cur)!;
        const alias = value.match(/^var\(\s*(--[\w-]+)\s*\)$/);
        if (!alias) return value;
        cur = alias[1];
    }
    return map.get(cur) ?? cur;
};

const radius = declMap(read("src/styles/theme/radius.css"));
// The demo neutral preset re-pins both corners; merge its overrides over the
// library primitives so the aliases resolve under the preset.
const neutral = new Map(radius);
for (const [k, v] of declMap(read("demo/shell/configurator/presets/neutral.css"))) {
    neutral.set(k, v);
}

describe("dialog-corner harmony — the card bind", () => {
    it("binds --radius-dialog directly onto --radius-card", () => {
        expect(radius.get("--radius-dialog")).toBe("var(--radius-card)");
    });

    it("resolves the dialog corner to the same terminal as the card (default)", () => {
        expect(resolve(radius, "--radius-dialog")).toBe(resolve(radius, "--radius-card"));
        expect(resolve(radius, "--radius-dialog")).toBe("1rem");
    });

    it("stays value-equal under the demo neutral preset (both --radius-xl)", () => {
        expect(resolve(neutral, "--radius-dialog")).toBe(resolve(neutral, "--radius-card"));
        expect(resolve(neutral, "--radius-dialog")).toBe("12px");
    });

    it("routes the concentric relay through the card corner", () => {
        expect(radius.get("--radius-ctx")).toBe("var(--radius-card)");
        expect(resolve(radius, "--radius-ctx")).toBe(resolve(radius, "--radius-dialog"));
    });
});
