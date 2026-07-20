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

const squircle = read("src/styles/glass/squircle.css");
const fieldControl = read("src/components/_shared/field/field-control.css");

// The border-radius declared inside the FIRST rule whose selector block matches
// `re` — parses the CSS text (happy-dom runs no cascade, so the geometry OUTCOME
// is read from source).
const borderRadiusIn = (css: string, re: RegExp): string | undefined => {
    const block = css.match(re);
    if (!block) return undefined;
    const decl = block[1].match(/border-radius\s*:\s*([^;]+);/);
    return decl ? decl[1].replace(/\s+/g, " ").trim() : undefined;
};

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

describe("dialog corner shape — the A' round fork (dialog only)", () => {
    it("retires --corner-shape-dialog so the dialog rounds to match the card", () => {
        expect(radius.has("--corner-shape-dialog")).toBe(false);
    });

    it("keeps --corner-shape-sheet on the squircle vocabulary (sheet unchanged)", () => {
        expect(radius.get("--corner-shape-sheet")).toBe(
            "superellipse(var(--corner-k-squircle))",
        );
    });

    it("drops the .glass-floating.rounded-dialog @supports arm, keeps .sheet-animate", () => {
        expect(/\.glass-floating\.rounded-dialog\s*\{/.test(squircle)).toBe(false);
        expect(/\.glass-floating\.sheet-animate\s*\{/.test(squircle)).toBe(true);
    });
});

describe("dialog inner controls — the F7 field rung (adopt for the modal input)", () => {
    it("re-points the modal single-line input onto the 16px field rung", () => {
        const modal = borderRadiusIn(
            fieldControl,
            /\[data-slot="dialog-content"\]\s+\.field-control\[data-kind="input"\]\s*\{([^}]*)\}/,
        );
        expect(modal).toBe("var(--radius-field)");
        // The field rung is the soft 16px rounded-rect, not the stadium pill.
        expect(resolve(radius, "--radius-field")).toBe("1rem");
    });

    it("keeps the stadium pill on the base (non-modal) single-line input + CTAs", () => {
        const base = borderRadiusIn(
            fieldControl,
            /(?:^|\n)\s*\.field-control\[data-kind="input"\]\s*\{([^}]*)\}/,
        );
        expect(base).toBe("var(--radius-pill)");
    });
});
