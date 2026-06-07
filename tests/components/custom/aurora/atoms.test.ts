// AW.W6 — the resolveAtoms total-function + default-roundtrip suite.
//
// Two binding properties:
//   (1) TOTAL — a fuzz over the FULL atom-combination matrix (every seed × harmony ×
//       mood × medium × textureAmount × motion × zones) produces a VALID in-range
//       AuroraConfig respecting every budget.ts cap (no NaN, no out-of-range field).
//   (2) DEFAULT-PRESERVING — resolveAtoms(DEFAULT_ATOMS) deep-equals
//       DEFAULT_AURORA_CONFIG (the wispy-sky default survives the new door).

import { describe, expect, it } from "vitest";
import {
    resolveAtoms,
    DEFAULT_ATOMS,
    type AuroraAtoms,
    type AuroraMoodAtom,
    type AuroraMotionAtom,
} from "../../../../src/components/custom/aurora/composables/atoms";
import {
    DEFAULT_AURORA_CONFIG,
    MAX_NUCLEI,
    MAX_STOPS,
    type AuroraConfig,
    type AuroraHarmony,
    type AuroraMedium,
} from "../../../../src/components/custom/aurora/constants/presets";
import { AV_MAX_COLORS } from "../../../../src/components/custom/aurora/constants/budget";

// ── The full atom-combination matrix. ────────────────────────────────────────
const SEEDS: (string | undefined)[] = [undefined, "#3a7bd5", "#ff8a00", "oklch(0.7 0.15 140)"];
const HARMONIES: (AuroraHarmony | undefined)[] = [
    undefined,
    "analogous",
    "complementary",
    "split-complementary",
    "triad",
    "tetradic",
    "monochrome",
];
const MOODS: (AuroraMoodAtom | undefined)[] = [undefined, "calm", "balanced", "vivid"];
const MEDIA: (AuroraMedium | undefined)[] = [
    undefined,
    "smooth",
    "pastel",
    "watercolor",
    "oil",
    "vangogh",
    "oil-pastel",
];
const TEXTURES: (number | undefined)[] = [undefined, 0, 0.5, 1, 2, -1]; // includes OUT-OF-RANGE
const MOTIONS: (AuroraMotionAtom | undefined)[] = [undefined, "still", "breathing", "drifting"];
const ZONES: (number | undefined)[] = [undefined, 1, 2, 6, 99, 0]; // includes OUT-OF-RANGE

// ── The in-range invariants every resolved config must satisfy. Returns a list of
// violation strings (empty = valid) so the fuzz can collect across the whole matrix
// and assert ONCE — millions of per-iteration expect() calls would time out.
function configViolations(cfg: AuroraConfig, label: string): string[] {
    const v: string[] = [];
    const inRange = (x: number, lo: number, hi: number, field: string) => {
        if (!Number.isFinite(x)) v.push(`${label}: ${field} NaN/Inf (${x})`);
        else if (x < lo || x > hi) v.push(`${label}: ${field}=${x} out of [${lo},${hi}]`);
    };
    inRange(cfg.saturation, 0.6, 1.3, "saturation");
    inRange(cfg.warpAmount, 0, 0.6, "warpAmount");
    inRange(cfg.valueVariance, 0, 0.3, "valueVariance");
    inRange(cfg.breathDepth, 0, 0.15, "breathDepth");
    inRange(cfg.nucleiDrift, 0, 0.05, "nucleiDrift");
    inRange(cfg.paletteDrift, 0, 0.04, "paletteDrift");
    inRange(cfg.warpDrift, 0, 0.015, "warpDrift");
    inRange(cfg.strokeAmount, 0, 1, "strokeAmount");
    inRange(cfg.wetEdge, 0, 1, "wetEdge");
    inRange(cfg.granulation, 0, 1, "granulation");
    inRange(cfg.impasto, 0, 1, "impasto");
    inRange(cfg.canvasGrain, 0, 0.1, "canvasGrain");
    inRange(cfg.alpha, 0, 1, "alpha");
    if (cfg.nuclei.length > MAX_NUCLEI || cfg.nuclei.length < 1)
        v.push(`${label}: nuclei.length=${cfg.nuclei.length} (cap ${MAX_NUCLEI})`);
    const colorBudget = Math.max(AV_MAX_COLORS, DEFAULT_AURORA_CONFIG.palette.length);
    if (cfg.palette.length > MAX_STOPS || cfg.palette.length > colorBudget)
        v.push(`${label}: palette.length=${cfg.palette.length} (caps ${MAX_STOPS}/${colorBudget})`);
    for (const s of cfg.palette) {
        if (!Number.isFinite(s.L) || !Number.isFinite(s.C) || !Number.isFinite(s.h) || s.C < 0)
            v.push(`${label}: bad palette stop ${JSON.stringify(s)}`);
    }
    for (const n of cfg.nuclei) {
        if (![n.x, n.y, n.radius, n.paletteBias].every(Number.isFinite))
            v.push(`${label}: bad nucleus ${JSON.stringify(n)}`);
    }
    return v;
}

describe("AW.W6 — resolveAtoms total-function fuzz", () => {
    it("every atom combination yields a valid in-range config (TOTAL)", () => {
        const violations: string[] = [];
        let count = 0;
        for (const seed of SEEDS)
            for (const harmony of HARMONIES)
                for (const mood of MOODS)
                    for (const medium of MEDIA)
                        for (const textureAmount of TEXTURES)
                            for (const motion of MOTIONS)
                                for (const zones of ZONES) {
                                    const atoms: AuroraAtoms = {
                                        seed,
                                        harmony,
                                        mood,
                                        medium,
                                        textureAmount,
                                        motion,
                                        zones,
                                    };
                                    const cfg = resolveAtoms(atoms);
                                    violations.push(...configViolations(cfg, JSON.stringify(atoms)));
                                    count++;
                                }
        // sanity: the matrix is large enough to be a real fuzz.
        expect(count).toBeGreaterThan(2000);
        expect(violations, violations.slice(0, 5).join("\n")).toHaveLength(0);
    });

    it("the worst-case combination (vivid × 6 zones × vangogh × max texture) stays in-range", () => {
        const cfg = resolveAtoms({
            seed: "#00ff00",
            harmony: "tetradic",
            mood: "vivid",
            medium: "vangogh",
            textureAmount: 1,
            motion: "drifting",
            zones: 6,
        });
        expect(configViolations(cfg, "worst-case")).toHaveLength(0);
        expect(cfg.nuclei.length).toBe(6);
    });
});

describe("AW.W6 — the default atoms preserve the wispy-sky default", () => {
    it("resolveAtoms(DEFAULT_ATOMS) deep-equals DEFAULT_AURORA_CONFIG", () => {
        const resolved = resolveAtoms(DEFAULT_ATOMS);
        expect(resolved).toEqual(DEFAULT_AURORA_CONFIG);
    });

    it("resolveAtoms() (no args) also resolves to the wispy-sky default", () => {
        expect(resolveAtoms()).toEqual(DEFAULT_AURORA_CONFIG);
    });

    it("the resolved default is an INDEPENDENT clone (mutating it does not touch the default)", () => {
        const resolved = resolveAtoms(DEFAULT_ATOMS);
        resolved.nuclei[0]!.x = 0.999;
        resolved.palette[0]!.L = 0.123;
        expect(DEFAULT_AURORA_CONFIG.nuclei[0]!.x).not.toBe(0.999);
        expect(DEFAULT_AURORA_CONFIG.palette[0]!.L).not.toBe(0.123);
    });

    it("the interactivity flag defaults OFF (the wispy-sky default stays non-interactive)", () => {
        expect(resolveAtoms(DEFAULT_ATOMS).interactivity).toBeUndefined();
    });
});
