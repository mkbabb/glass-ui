// AX.W10 — the resolveAtoms total-function + default-roundtrip suite, re-derived for
// the zones/noise/color atom shape.
//
// Properties:
//   (1) TOTAL — a fuzz over the FULL atom-combination matrix (seed × harmony ×
//       colorEnergy × zones{count,arrangement} × noise × medium{kind,amount} × motion,
//       INCLUDING out-of-range inputs) yields a VALID in-range AuroraConfig respecting
//       every budget.ts cap (no NaN, no out-of-range field). Clamp, never garbage.
//   (2) DEFAULT-PRESERVING — resolveAtoms(DEFAULT_ATOMS) deep-equals
//       DEFAULT_AURORA_CONFIG (the wispy-sky default survives the door).
//   (3) the NOISE atom fans to warpAmount/warpScale/warpMode/noiseOctaves.
//   (4) the texture amount is STRUCTURALLY ABSENT on a smooth medium (the union has
//       no `amount` field on the smooth arm).
//   (5) the ZONES arrangement re-places the nuclei (scattered ≠ composed ≠ centred).

import { describe, expect, it } from "vitest";
import {
    resolveAtoms,
    configToAtoms,
    DEFAULT_ATOMS,
    type AuroraAtoms,
} from "@glass/components/aurora/composables/atoms";
import {
    nucleiPrior,
    type AuroraMotionAtom,
    type AuroraZoneArrangement,
} from "@glass/components/aurora/composables/atoms-fields";
import {
    DEFAULT_AURORA_CONFIG,
    MAX_NUCLEI,
    MAX_STOPS,
    type AuroraConfig,
    type AuroraMedium,
} from "@glass/components/aurora/constants/presets";
import type { AuroraHarmony } from "@glass/components/aurora/composables/color";
import { AV_MAX_COLORS } from "@glass/components/aurora/constants/budget";

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
const ENERGIES: (number | undefined)[] = [undefined, 0, 0.5, 1, 2, -1]; // includes OUT-OF-RANGE
const ARRANGEMENTS: (AuroraZoneArrangement | undefined)[] = [
    undefined,
    "scattered",
    "composed",
    "centred",
];
const ZONE_COUNTS: (number | undefined)[] = [undefined, 1, 2, 6, 99, 0]; // includes OUT-OF-RANGE
const NOISES: (number | undefined)[] = [undefined, 0, 0.5, 1, 2, -1]; // includes OUT-OF-RANGE
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

// Build the medium atom from a (kind, amount) pair — smooth NEVER carries amount.
function mediumAtom(
    kind: AuroraMedium | undefined,
    amount: number | undefined,
): AuroraAtoms["medium"] {
    if (kind === undefined) return undefined;
    if (kind === "smooth") return { kind };
    return amount === undefined ? { kind } : { kind, amount };
}

// Build the zones atom — undefined count means no zones atom.
function zonesAtom(
    count: number | undefined,
    arrangement: AuroraZoneArrangement | undefined,
): AuroraAtoms["zones"] {
    if (count === undefined) return undefined;
    return { count, arrangement };
}

// ── The in-range invariants every resolved config must satisfy. ──────────────
function configViolations(cfg: AuroraConfig, label: string): string[] {
    const v: string[] = [];
    const inRange = (x: number, lo: number, hi: number, field: string) => {
        if (!Number.isFinite(x)) v.push(`${label}: ${field} NaN/Inf (${x})`);
        else if (x < lo || x > hi) v.push(`${label}: ${field}=${x} out of [${lo},${hi}]`);
    };
    inRange(cfg.saturation, 0.6, 1.3, "saturation");
    inRange(cfg.warpAmount, 0, 0.6, "warpAmount");
    inRange(cfg.warpScale, 0.5, 3, "warpScale");
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
    if (![3, 4, 5].includes(cfg.noiseOctaves))
        v.push(`${label}: noiseOctaves=${cfg.noiseOctaves} not in {3,4,5}`);
    if (!["fbm", "cellular", "hybrid"].includes(cfg.warpMode))
        v.push(`${label}: warpMode=${cfg.warpMode} invalid`);
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
        if (n.x < 0 || n.x > 1 || n.y < 0 || n.y > 1)
            v.push(`${label}: nucleus out of [0,1] ${JSON.stringify(n)}`);
    }
    return v;
}

describe("AX.W10 — resolveAtoms total-function fuzz", () => {
    // The color axes (seed/harmony/colorEnergy) and the composition axes
    // (zones/noise/medium/texture/motion) are INDEPENDENT in resolveAtoms — they touch
    // disjoint config fields. So the totality argument is TWO coordinated sweeps rather
    // than one combinatorial cross-product: each sweep cross-products its own axes AND
    // pins a rotating baseline of the OTHER group, so every axis is exercised across the
    // others' boundaries without a multi-million-iteration blowup (the seed-bearing
    // deriveAurora call is the per-iteration cost). Together they exceed the 2000-combo
    // floor and exercise every atom field including the out-of-range inputs.
    it("every atom combination yields a valid in-range config (TOTAL)", () => {
        const violations: string[] = [];
        let count = 0;
        const check = (
            input: Omit<AuroraAtoms, "medium" | "interactivity"> & {
                medium?: AuroraAtoms["medium"];
            },
        ) => {
            const { medium, ...common } = input;
            const atoms: AuroraAtoms =
                medium?.kind !== undefined && medium.kind !== "smooth"
                    ? { ...common, medium }
                    : { ...common, ...(medium ? { medium } : {}) };
            const cfg = resolveAtoms(atoms);
            violations.push(...configViolations(cfg, JSON.stringify(input)));
            count++;
        };

        // Sweep A — the COLOR axes cross-product, against a rotating composition baseline.
        let rot = 0;
        for (const seed of SEEDS)
            for (const harmony of HARMONIES)
                for (const colorEnergy of ENERGIES) {
                    const zoneCount = ZONE_COUNTS[rot % ZONE_COUNTS.length];
                    const arrangement = ARRANGEMENTS[rot % ARRANGEMENTS.length];
                    const noise = NOISES[rot % NOISES.length];
                    const medium = MEDIA[rot % MEDIA.length];
                    const texture = TEXTURES[rot % TEXTURES.length];
                    const motion = MOTIONS[rot % MOTIONS.length];
                    rot++;
                    check({
                        seed,
                        harmony,
                        colorEnergy,
                        zones: zonesAtom(zoneCount, arrangement),
                        noise,
                        medium: mediumAtom(medium, texture),
                        motion,
                    });
                }

        // Sweep B — the COMPOSITION axes cross-product, against a rotating color baseline.
        rot = 0;
        for (const zoneCount of ZONE_COUNTS)
            for (const arrangement of ARRANGEMENTS)
                for (const noise of NOISES)
                    for (const medium of MEDIA)
                        for (const texture of TEXTURES)
                            for (const motion of MOTIONS) {
                                const seed = SEEDS[rot % SEEDS.length];
                                const harmony = HARMONIES[rot % HARMONIES.length];
                                const colorEnergy = ENERGIES[rot % ENERGIES.length];
                                rot++;
                                check({
                                    seed,
                                    harmony,
                                    colorEnergy,
                                    zones: zonesAtom(zoneCount, arrangement),
                                    noise,
                                    medium: mediumAtom(medium, texture),
                                    motion,
                                });
                            }

        expect(count).toBeGreaterThan(2000);
        expect(violations, violations.slice(0, 5).join("\n")).toHaveLength(0);
    });

    it("the worst-case combination (max energy × 8 zones × vangogh × max texture × max noise) stays in-range", () => {
        const cfg = resolveAtoms({
            seed: "#00ff00",
            harmony: "tetradic",
            colorEnergy: 1,
            zones: { count: MAX_NUCLEI, arrangement: "scattered" },
            noise: 1,
            medium: { kind: "vangogh", amount: 1 },
            motion: "drifting",
        });
        expect(configViolations(cfg, "worst-case")).toHaveLength(0);
        expect(cfg.nuclei.length).toBe(MAX_NUCLEI);
    });
});

describe("AX.W10 — the NOISE atom fans to the organic-boundary cluster", () => {
    it("a rising noise scalar moves warpAmount + warpScale and steps warpMode/noiseOctaves", () => {
        const lo = resolveAtoms({ noise: 0 });
        const hi = resolveAtoms({ noise: 1 });
        expect(hi.warpAmount).toBeGreaterThan(lo.warpAmount);
        expect(hi.warpScale).toBeGreaterThan(lo.warpScale);
        // fBm at the calm end → cellular at the turbulent end.
        expect(lo.warpMode).toBe("fbm");
        expect(hi.warpMode).toBe("cellular");
        expect(hi.noiseOctaves).toBeGreaterThanOrEqual(lo.noiseOctaves);
    });
});

describe("AX.W10 — texture is structurally absent on a smooth medium", () => {
    it("a smooth medium atom carries no `amount` field (the union narrows it away)", () => {
        const m: AuroraAtoms["medium"] = { kind: "smooth" };
        // @ts-expect-error — the smooth arm of AuroraMediumAtom has no `amount`.
        m.amount = 0.5;
        // a textured medium DOES accept an amount (compiles).
        const t: AuroraAtoms["medium"] = { kind: "oil", amount: 0.5 };
        expect(t).toBeDefined();
    });

    it("a smooth medium leaves the texture fields at the default (no inert write)", () => {
        const cfg = resolveAtoms({ medium: { kind: "smooth" } });
        expect(cfg.strokeAmount).toBe(DEFAULT_AURORA_CONFIG.strokeAmount);
        expect(cfg.wetEdge).toBe(DEFAULT_AURORA_CONFIG.wetEdge);
        expect(cfg.canvasGrain).toBe(DEFAULT_AURORA_CONFIG.canvasGrain);
    });

    it("a textured medium with an amount DOES write its dominant knob", () => {
        const cfg = resolveAtoms({ medium: { kind: "watercolor", amount: 1 } });
        expect(cfg.wetEdge).toBe(1);
    });
});

describe("P046 — interactivity is discriminated by medium", () => {
    it("rejects directional light on smooth while retaining its field axes", () => {
        // @ts-expect-error — smooth has no directional impasto light.
        const invalid: AuroraAtoms = { medium: { kind: "smooth" }, interactivity: { light: true } };
        const valid: AuroraAtoms = {
            medium: { kind: "smooth" },
            interactivity: { swirl: true, scroll: true, amplitude: 0.5 },
        };
        expect(invalid.medium?.kind).toBe("smooth");
        expect(valid.interactivity?.swirl).toBe(true);
    });
});

describe("AX.W10 — the ZONES arrangement re-places the nuclei (ONE nucleiPrior)", () => {
    it("scattered / composed / centred produce DISTINCT layouts for the same count", () => {
        const composed = nucleiPrior(4, "composed");
        const scattered = nucleiPrior(4, "scattered");
        const centred = nucleiPrior(4, "centred");
        const key = (ns: AuroraConfig["nuclei"]) =>
            ns.map((n) => `${n.x.toFixed(3)},${n.y.toFixed(3)}`).join("|");
        expect(key(composed)).not.toBe(key(scattered));
        expect(key(scattered)).not.toBe(key(centred));
        expect(key(composed)).not.toBe(key(centred));
    });

    it("centred clusters tighter around the middle than scattered", () => {
        const dist = (ns: AuroraConfig["nuclei"]) =>
            ns.reduce((s, n) => s + Math.hypot(n.x - 0.5, n.y - 0.5), 0) / ns.length;
        expect(dist(nucleiPrior(5, "centred"))).toBeLessThan(dist(nucleiPrior(5, "scattered")));
    });

    it("nucleiPrior clamps the count to [1, MAX_NUCLEI] (total)", () => {
        expect(nucleiPrior(0).length).toBe(1);
        expect(nucleiPrior(99).length).toBe(MAX_NUCLEI);
        expect(nucleiPrior(-5).length).toBe(1);
    });

    it("the terminal composed substrate gives all eight zones distinct centers", () => {
        const centers = nucleiPrior(MAX_NUCLEI, "composed").map(({ x, y }) => `${x}:${y}`);
        expect(new Set(centers).size).toBe(MAX_NUCLEI);
    });
});

describe("AX.W10 — the default atoms preserve the wispy-sky default", () => {
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

    it("smooth interactivity retains the field axes without synthesizing a light axis", () => {
        const cfg = resolveAtoms({
            medium: { kind: "smooth" },
            interactivity: { swirl: true, scroll: true, amplitude: 0.75 },
        });
        expect(cfg.interactivity).toEqual({
            scroll: true,
            swirl: true,
            amplitude: 0.75,
        });
    });

    it("textured media may opt into cursor light alongside the shared field", () => {
        const cfg = resolveAtoms({
            medium: { kind: "oil", amount: 0.6 },
            interactivity: { light: true, swirl: true, amplitude: 1 },
        });
        expect(cfg.interactivity).toEqual({ light: true, swirl: true, amplitude: 1 });
    });
});

// ── AY.W-AUR-STUDIO — the configToAtoms inverse (the seed-from-preset projection). ──
describe("AY.W-AUR-STUDIO — configToAtoms projects a config back onto the ≤7 atoms", () => {
    it("recovers the medium (the headline atom — the dock seeds the live preset's medium)", () => {
        for (const kind of [
            "smooth",
            "oil",
            "vangogh",
            "oil-pastel",
            "crayon",
            "watercolor",
            "pastel",
        ] as AuroraMedium[]) {
            const cfg: AuroraConfig = { ...DEFAULT_AURORA_CONFIG, medium: kind };
            expect(configToAtoms(cfg).medium?.kind).toBe(kind);
        }
    });

    it("recovers the energy/noise/zone-count/motion axes within the projection's resolution", () => {
        // Build a config FROM a known atom set, then project it back — the recoverable axes
        // round-trip (harmony/arrangement are baked away by design, so they are NOT asserted).
        const source: AuroraAtoms = {
            seed: "#3a7bd5",
            harmony: "analogous",
            colorEnergy: 0.8,
            zones: { count: 5, arrangement: "composed" },
            noise: 0.3,
            medium: { kind: "vangogh", amount: 0.7 },
            motion: "drifting",
        };
        const cfg = resolveAtoms(source);
        const back = configToAtoms(cfg);
        expect(back.medium?.kind).toBe("vangogh");
        expect(back.zones?.count).toBe(5);
        expect(back.motion).toBe("drifting");
        // energy/noise invert off saturation/warpAmount — within a lerp-inverse tolerance.
        expect(back.colorEnergy).toBeCloseTo(0.8, 1);
        expect(back.noise).toBeCloseTo(0.3, 1);
    });

    it("classifies the motion atom off the drift fields (still/breathing/drifting)", () => {
        const still: AuroraConfig = {
            ...DEFAULT_AURORA_CONFIG,
            nucleiDrift: 0,
            paletteDrift: 0,
            warpDrift: 0,
            breathDepth: 0,
        };
        expect(configToAtoms(still).motion).toBe("still");
        const breathing: AuroraConfig = { ...still, breathDepth: 0.05 };
        expect(configToAtoms(breathing).motion).toBe("breathing");
        const drifting: AuroraConfig = { ...still, nucleiDrift: 0.015, breathDepth: 0.05 };
        expect(configToAtoms(drifting).motion).toBe("drifting");
    });

    it("a smooth medium projects to { kind: 'smooth' } with no texture amount", () => {
        const cfg: AuroraConfig = { ...DEFAULT_AURORA_CONFIG, medium: "smooth" };
        const m = configToAtoms(cfg).medium;
        expect(m?.kind).toBe("smooth");
        expect((m as { amount?: number }).amount).toBeUndefined();
    });

    it("projects only the interaction axes valid for the active medium", () => {
        const smooth = configToAtoms({
            ...DEFAULT_AURORA_CONFIG,
            medium: "smooth",
            interactivity: { light: true, scroll: true, swirl: true, amplitude: 0.7 },
        });
        expect(smooth.interactivity).toEqual({ scroll: true, swirl: true, amplitude: 0.7 });

        const oil = configToAtoms({
            ...DEFAULT_AURORA_CONFIG,
            medium: "oil",
            interactivity: { light: true, swirl: true, amplitude: 0.7 },
        });
        expect(oil.interactivity).toEqual({ light: true, swirl: true, amplitude: 0.7 });
    });

    it("resolveAtoms refines OVER a base config (the non-atom fields survive the touch)", () => {
        // The base carries a hand-set non-atom field (strokeScale) the ≤7-knob projection
        // does NOT carry; resolving an atom subset over it must PRESERVE that field.
        const base: AuroraConfig = { ...DEFAULT_AURORA_CONFIG, strokeScale: 222 };
        const refined = resolveAtoms({ noise: 0.9 }, base);
        expect(refined.strokeScale).toBe(222); // the non-atom field survived
        expect(refined.warpAmount).not.toBe(base.warpAmount); // the noise atom DID apply
    });
});
