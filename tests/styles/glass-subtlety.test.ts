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

    it("has NO device-conditional overlay-radius writer (the 2dppx arm is KILLED)", () => {
        // Comments carry the kill rationale (which names the retired 17px arm); strip
        // them, then prove no LIVE rule re-pins the overlay radius by device density.
        const raw = read("src/styles/tokens/light-dark.css").replace(/\/\*[\s\S]*?\*\//g, "");
        expect(raw).not.toMatch(/min-resolution/);
        expect(raw).not.toMatch(/--glass-blur-overlay-radius/);
        // The base overlay role is the single 11px source of record at every DPR.
        expect(blurRadius(light, "--glass-blur-overlay")).toBe(11);
    });

    it("keeps the content and overlay tiers distinct after the pull", () => {
        expect(blurRadius(light, "--glass-blur-floating"))
            .toBeGreaterThan(blurRadius(light, "--glass-blur-quiet"));
    });
});

// The private immersive stage scrim is a scene-SEPARATION effect, not a calm/deep
// glass rung: fixed 14px at --glass-level:1, MULTIPLIED by the shared clarity scalar
// (so the a11y brackets flatten it), radius INDEPENDENT of the per-frame --stage-t,
// and blur-only (no saturation term). Source-substituted the same way the ladder is.
describe("immersive stage scrim — private stage effect, 14px × --glass-level", () => {
    const drawer = read("src/components/drawer/styles.css");
    const scrimMap = declMap(drawer);

    it("declares the private radius token at a fixed 14px", () => {
        expect(scrimMap.get("--stage-immersive-blur-radius")).toBe("14px");
    });

    it("multiplies the radius by the shared --glass-level clarity axis", () => {
        // 14px at level 1, 4.2px at level 0.3, 0px at level 0 — resolved from source.
        expect(blurRadius(scrimMap, "--stage-immersive-blur")).toBe(14);
        const flatLvl = flatten(scrimMap, scrimMap.get("--stage-immersive-blur")!);
        expect(scrimMap.get("--stage-immersive-blur")).toContain("var(--glass-level)");
        expect(flatLvl).toMatch(/blur\(\s*calc\(\s*14px\s*\*\s*1\s*\)\s*\)/);
    });

    it("keeps the radius OFF the per-frame --stage-t clock and free of saturation", () => {
        const decl = scrimMap.get("--stage-immersive-blur")!;
        expect(decl).not.toContain("--stage-t");
        expect(decl).not.toContain("saturate");
        expect(decl).not.toContain("brightness");
    });

    it("consumes NO calm/deep rung — it is not the deep endpoint", () => {
        // The immersive backdrop-filter reads the private token, never --glass-blur-deep-*.
        const rule = /\[data-stage-scrim\]\[data-stage-immersive\][^{]*\{[^}]*\}/.exec(drawer);
        expect(rule).not.toBeNull();
        expect(rule![0]).toContain("var(--stage-immersive-blur)");
        expect(rule![0]).not.toContain("--glass-blur-deep-radius");
    });
});
