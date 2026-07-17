import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// happy-dom runs no CSS cascade engine — `getComputedStyle` does not resolve
// `var()`/`calc()` to a concrete value — so the composed blur is resolved from
// source: substitute the `--glass-blur-*-radius` primitive + `--glass-level: 1`
// into the composed recipe and read the effective blur radius the token paints.
// That asserts the composition OUTCOME, not a bare primitive literal: a recipe
// that stopped threading its primitive would resolve wrong here.

const read = (rel: string): string => readFileSync(join(process.cwd(), rel), "utf8");

const declMap = (css: string): Map<string, string> => {
    const stripped = css.replace(/\/\*[\s\S]*?\*\//g, "");
    const map = new Map<string, string>();
    for (const m of stripped.matchAll(/(--[\w-]+)\s*:\s*([^;{}]+);/g)) {
        map.set(m[1], m[2].replace(/\s+/g, " ").trim());
    }
    return map;
};

// Substitute every `var(--x)` until the value is var-free; `--glass-level`
// resolves to 1 (the byte-identical rest state).
const flatten = (map: Map<string, string>, value: string): string => {
    let out = value;
    for (let i = 0; i < 32 && /var\(/.test(out); i += 1) {
        out = out.replace(
            /var\(\s*(--[\w-]+)\s*(?:,\s*([^()]*?))?\)/g,
            (_full, name: string, fallback?: string) => {
                if (name === "--glass-level") return "1";
                const v = map.get(name);
                if (v !== undefined) return v;
                return fallback ?? "0";
            },
        );
    }
    return out;
};

// The effective blur radius (px) the composed token paints at --glass-level: 1.
const blurRadius = (map: Map<string, string>, token: string): number => {
    const raw = map.get(token);
    if (raw === undefined) throw new Error(`no declaration for ${token}`);
    const flat = flatten(map, raw);
    const calc = flat.match(/blur\(\s*calc\(\s*([\d.]+)px\s*\*\s*([\d.]+)\s*\)\s*\)/);
    if (calc) return Number.parseFloat(calc[1]) * Number.parseFloat(calc[2]);
    const plain = flat.match(/blur\(\s*([\d.]+)px\s*\)/);
    if (plain) return Number.parseFloat(plain[1]);
    throw new Error(`no blur radius in ${token}: ${flat}`);
};

const light = declMap(read("src/styles/tokens/glass.css"));
// The dark arm re-declares the composed blur tokens but reads the SAME
// primitives; merge the light primitives under the dark recipe overrides.
const darkArm = read("src/styles/tokens/dark-arm-glass.css");
const dark = new Map(light);
for (const [k, v] of declMap(darkArm)) dark.set(k, v);
const deep = declMap(read("src/styles/tokens/glass-deep.css"));

describe("glass blur ladder — the ~15% subtlety recalibration", () => {
    it("resolves the light-arm composed rungs to the recalibrated radii", () => {
        expect(blurRadius(light, "--glass-blur-quiet")).toBe(7);
        expect(blurRadius(light, "--glass-blur-resting")).toBe(7);
        expect(blurRadius(light, "--glass-blur-floating")).toBe(11);
        expect(blurRadius(light, "--glass-blur-overlay")).toBe(11);
    });

    it("tracks byte-isomorphically on the dark arm (same primitives)", () => {
        expect(blurRadius(dark, "--glass-blur-quiet")).toBe(7);
        expect(blurRadius(dark, "--glass-blur-resting")).toBe(7);
        expect(blurRadius(dark, "--glass-blur-floating")).toBe(11);
        expect(blurRadius(dark, "--glass-blur-overlay")).toBe(11);
        // The dark recipe reads the shared radius primitive, never a hardcoded px.
        expect(darkArm).toContain("var(--glass-blur-resting-radius)");
        expect(darkArm).toContain("var(--glass-blur-floating-radius)");
    });

    it("HOLDS the sub-perceptual wash floor and the deep ceiling", () => {
        expect(blurRadius(light, "--glass-blur-wash")).toBe(1);
        expect(deep.get("--glass-blur-deep-radius")).toBe("16px");
    });

    it("keeps the high-DPI overlay restore in lockstep with the base pull", () => {
        const hidpi = declMap(read("src/styles/tokens/light-dark.css"));
        expect(hidpi.get("--glass-blur-overlay-radius")).toBe("17px");
    });

    it("keeps the content and overlay tiers distinct after the pull", () => {
        expect(blurRadius(light, "--glass-blur-floating"))
            .toBeGreaterThan(blurRadius(light, "--glass-blur-quiet"));
    });
});
