// E22 (d-paper-aurora M4) — proof:aurora-paper-ground (E1 §2i).
//
// The recessive paper-ground crayon CALIBRATION lives in the library
// (`PAPER_WASH_GROUND`) so a data-ground aurora reads as pigment-on-paper-tooth
// without each consumer dial-tuning the same recessive calibration. This gate is
// BORN-RED against a smooth-medium config (the old `medium:"smooth"` default — a
// dead hue-tint, no tooth) and GREEN once the preset is spread.
//
// The gate asserts the recessive-ground contract (the named stopping rules,
// d-paper-aurora M1 + the anti-moves):
//   • medium is a PAPER-TOOTH medium (crayon), NEVER smooth (no structure) and
//     NEVER a STROKE-deposition medium (oil/oil-pastel/vangogh forbidden behind
//     data — they deposit a competing image);
//   • the deft tooth dials sit in their pinned bands so the tooth is FELT at the
//     clamped ground ceiling (texture is cheap to the eye where a hue-tint dies);
//   • the deposition is RECESSIVE — low crayon pressure, a single dry layer, NO
//     impasto/sheen, sub-figural broken-color;
//   • the ground spends NO chroma budget — saturation BELOW unity (the pops live
//     in the icons, not the wall).

import { describe, expect, it } from "vitest";
import {
    DEFAULT_AURORA_CONFIG,
    PAPER_WASH_GROUND,
    type AuroraConfig,
} from "../../../../src/components/custom/aurora/constants/presets";

// The four STROKE-deposition mediums forbidden behind data (FD1 §8.4): they
// deposit visible directional brushwork — a competing image behind a chart. Only
// `crayon` (dry tooth-multiply, a TEXTURE) and a granulation-only `watercolor` are
// admissible. `smooth` is the dead-tint failure mode the hybrid replaces.
const STROKE_MEDIUMS = new Set(["oil", "oil-pastel", "vangogh", "pastel"]);

interface GateResult {
    pass: boolean;
    failures: string[];
}

/**
 * The recessive paper-ground gate — a pure predicate over a resolved AuroraConfig.
 * GREEN iff the config is a deft, recessive, paper-tooth ground.
 */
function auroraPaperGroundGate(cfg: AuroraConfig): GateResult {
    const failures: string[] = [];

    // (1) PAPER-TOOTH medium — crayon (admissible behind data); never smooth
    //     (no structure) and never a stroke-deposition medium (a competing image).
    if (cfg.medium === "smooth") {
        failures.push("medium:smooth is a dead hue-tint, not a paper-tooth ground");
    } else if (STROKE_MEDIUMS.has(cfg.medium)) {
        failures.push(`medium:${cfg.medium} is a stroke-deposition medium (forbidden behind data)`);
    } else if (cfg.medium !== "crayon" && cfg.medium !== "watercolor") {
        failures.push(`medium:${cfg.medium} is not an admissible paper-tooth medium`);
    }

    // (2) The deft tooth dials — pinned bands (named stopping rules, M1). The tooth
    //     must be FELT (lower bounds) but never a picture (upper bounds).
    if (!(cfg.granulation >= 0.2 && cfg.granulation <= 0.45)) {
        failures.push(`granulation ${cfg.granulation} outside the felt-but-deft band [0.2, 0.45]`);
    }
    if (!(cfg.canvasGrain >= 0.35)) {
        failures.push(`canvasGrain ${cfg.canvasGrain} too low — the tooth dies at the clamped ceiling`);
    }
    if (!(cfg.strokeAmount >= 0.2 && cfg.strokeAmount <= 0.5)) {
        failures.push(`strokeAmount (crayon pressure) ${cfg.strokeAmount} outside the recessive band [0.2, 0.5]`);
    }
    if (!(cfg.strokeAnisotropy <= 0.6)) {
        failures.push(`strokeAnisotropy ${cfg.strokeAnisotropy} too high — the tooth reads as strokes, not crumbs`);
    }

    // (3) RECESSIVE deposition — a single dry layer, NO impasto/sheen, sub-figural.
    if (cfg.strokeLayers !== 1) {
        failures.push("strokeLayers must be 1 (a single dry layer — no build-up)");
    }
    if (cfg.impasto !== 0) {
        failures.push("impasto must be 0 (the ground carries no relief/sheen behind data)");
    }
    if (cfg.wetEdge !== 0) {
        failures.push("wetEdge must be 0 (dry crayon, no wet wash band)");
    }

    // (4) NO chroma budget on the ground — saturation BELOW unity (the pops live in
    //     the icons, not the wall).
    if (!(cfg.saturation < 1)) {
        failures.push(`saturation ${cfg.saturation} ≥ 1 — the ground spends chroma budget it must leave to the icons`);
    }

    return { pass: failures.length === 0, failures };
}

describe("proof:aurora-paper-ground (E22 / §2i)", () => {
    it("BORN-RED: a smooth-medium config FAILS the recessive paper-ground gate", () => {
        // The old `medium:"smooth"` default — the dead hue-tint the hybrid replaces.
        const smooth = auroraPaperGroundGate(DEFAULT_AURORA_CONFIG);
        expect(smooth.pass).toBe(false);
        // The headline failure is the smooth (structureless) medium.
        expect(smooth.failures.join(" ")).toContain("medium:smooth");
        // …and the absent tooth (a smooth ground carries zero canvasGrain).
        expect(smooth.failures.join(" ")).toMatch(/canvasGrain/);
    });

    it("GREEN: the PAPER_WASH_GROUND preset PASSES the gate", () => {
        // Spread the library calibration over a consumer base (the pole-derived
        // pigment stays; the deposition dials are the preset's).
        const cfg: AuroraConfig = { ...DEFAULT_AURORA_CONFIG, ...PAPER_WASH_GROUND };
        const result = auroraPaperGroundGate(cfg);
        expect(result.failures).toEqual([]);
        expect(result.pass).toBe(true);
    });

    it("the preset pins the named deft tooth dials (the library-canon calibration)", () => {
        // The named stopping rules, pinned ONCE at library level (§2i).
        expect(PAPER_WASH_GROUND.medium).toBe("crayon");
        expect(PAPER_WASH_GROUND.granulation).toBeCloseTo(0.3, 5);
        expect(PAPER_WASH_GROUND.canvasGrain).toBeCloseTo(0.5, 5);
        expect(PAPER_WASH_GROUND.strokeAmount).toBeCloseTo(0.35, 5);
        expect(PAPER_WASH_GROUND.strokeAnisotropy).toBeCloseTo(0.5, 5);
    });

    it("a STROKE-medium ground (oil/vangogh) FAILS — the §8.4 prohibition holds", () => {
        // The hybrid amends §8.4 by ONE clause (crayon admitted); the four
        // stroke-deposition mediums stay forbidden behind data.
        for (const medium of ["oil", "vangogh", "oil-pastel"] as const) {
            const cfg: AuroraConfig = { ...DEFAULT_AURORA_CONFIG, ...PAPER_WASH_GROUND, medium };
            const result = auroraPaperGroundGate(cfg);
            expect(result.pass).toBe(false);
            expect(result.failures.join(" ")).toContain("stroke-deposition");
        }
    });

    it("the preset is a PARTIAL — it carries NO palette/nuclei (the consumer's pigment survives)", () => {
        // page-glow IS data-glow: the calibration must not clobber the consumer's
        // pole-derived palette/nuclei.
        expect("palette" in PAPER_WASH_GROUND).toBe(false);
        expect("nuclei" in PAPER_WASH_GROUND).toBe(false);
    });
});
