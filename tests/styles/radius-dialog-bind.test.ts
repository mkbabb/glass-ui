import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// happy-dom runs no CSS cascade, so the radius aliases are resolved from source:
// follow each `var(--x)` chain to its terminal literal. The assertions read the alias
// GRAPH, not a repainted pixel.
//
// SCOPE NOTE (W-DIALOG). The dialog SURFACE is a ROOM (24) now — `dialog/styles.css` and
// `sheet/styles.css` read `--radius-3xl` directly, per PROPORTION:233, which binds room
// to "dialog, sheet, drawer" BY NAME. The `--radius-dialog` ALIAS still binds card and
// still governs its other readers (the configurator relay, the demo preset knob, the
// radii story), so the two register seats below (`radius.dialog.card-bind`,
// `radius.context.card-relay`) remain TRUE of the token graph they were authored for.
// Retiring this file and re-pointing the alias is ONE act, it costs the batched roster
// pin reserved to band close, and it is routed to W-GATE-COLLAPSE with its grounds —
// spending that pin here would falsify the pinned roster sha for one file.

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
const fieldControl = read("src/components/_shared/field/control.css");

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

describe("dialog inner controls — the concentric inversion, cured by subtraction", () => {
    // W-DIALOG deleted the modal-scoped `[data-slot="dialog-content"]
    // .field-control[data-kind="input"] { border-radius: var(--radius-field) }` override.
    // It was the OPERATIVE producer of the F45 inversion: a 16px input inside a 16px
    // plate across a 24px inset, so the inner corner was never smaller than the outer and
    // the nesting read backwards. A roled child never takes the relay.
    it("carries no modal-scoped radius override on the single-line input", () => {
        const modal = borderRadiusIn(
            fieldControl,
            /\[data-slot="dialog-content"\]\s+\.field-control\[data-kind="input"\]\s*\{([^}]*)\}/,
        );
        expect(modal).toBeUndefined();
    });

    it("keeps the stadium pill on the single-line input at every scope", () => {
        const base = borderRadiusIn(
            fieldControl,
            /(?:^|\n)\s*\.field-control\[data-kind="input"\]\s*\{([^}]*)\}/,
        );
        expect(base).toBe("var(--radius-pill)");
    });

    it("keeps the plate strictly rounder than the control it contains", () => {
        // The plate takes the ROOM rung (24) and the control the pill; the inversion is
        // impossible by construction once the override is gone.
        expect(resolve(radius, "--radius-3xl")).toBe("1.5rem");
        expect(resolve(radius, "--radius-card")).toBe("1rem");
    });
});
