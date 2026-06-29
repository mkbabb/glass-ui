// AX.W12 — the StrokeProfile-extraction byte/1e-6-equivalence regression (slice 8 F6).
//
// The extraction (the mediumOil per-mode if-ladder + the four hand-unrolled stroke
// layers → struct StrokeProfile + profileFor(medium, mode) + paintStrokeLayers(profile))
// is a PURE STRUCTURAL TRANSPOSITION: the oil/knife/brushwork bakes must be byte-equal
// (or 1e-6-equal accounting for float-eval reorder) to HEAD. A live GLSL bake is the
// π-lane's job (orchestrator-owned); this headless test locks the transposition was
// VALUE-PRESERVING — the profile fields carry the EXACT if-ladder constants and the
// cascade preserves the EXACT bestOil/paintOver call topology (offsets, seeds,
// multipliers). A silent value drift in the extraction reds here.
//
// This is the precept-valid "deletion/diff-shaped artefact" form: the monolith if-ladder
// is gone (the substrate exports are present) and every per-mode value survived the move.

import { describe, expect, it } from "vitest";
import {
    AURORA_MEDIUMS_POST_BRUSH_GLSL,
} from "@glass/components/custom/aurora/constants/shaders/mediums.glsl";

const SRC = AURORA_MEDIUMS_POST_BRUSH_GLSL;

// Strip line comments so the assertions read the GLSL CODE, not the prose.
function code(s: string): string {
    return s
        .split("\n")
        .map((l) => {
            const i = l.indexOf("//");
            return i === -1 ? l : l.slice(0, i);
        })
        .join("\n");
}
const C = code(SRC);

// Collapse runs of whitespace so a reflowed line still matches.
const flat = C.replace(/\s+/g, " ");

describe("AX.W12 — the StrokeProfile extraction is a value-preserving transposition", () => {
    it("the substrate exists: struct StrokeProfile + profileFor + paintStrokeLayers", () => {
        expect(/struct StrokeProfile\s*\{/.test(C)).toBe(true);
        expect(/StrokeProfile profileFor\(int medium, int mode\)/.test(C)).toBe(true);
        expect(/void paintStrokeLayers\(inout vec3 col, inout float height, StrokeProfile prof,/.test(C)).toBe(true);
    });

    it("the StrokeProfile struct carries the full slice-8-F6 stroke-parameter cohort", () => {
        for (const field of [
            "shapeType", "bristleAmp", "streakFreq", "streakAmp", "impastoAmp",
            "hardness", "toothScale", "toothAmp", "pigmentSat",
            "densityBig", "densityMed", "densitySml",
        ]) {
            expect(C.includes(field), `StrokeProfile missing field ${field}`).toBe(true);
        }
    });

    it("the mediumOil MONOLITH is gone: no imperative per-mode if-ladder inside mediumOil", () => {
        // mediumOil is now a thin profile-fetch body. Its body must NOT re-declare the
        // per-mode local knobs (the if-ladder); those moved into profileFor.
        const oilBody = (C.match(/vec3 mediumOil\(vec3 col, vec2 p, float t\)\s*\{[\s\S]*?\n\}/) || [""])[0];
        expect(oilBody.length).toBeGreaterThan(0);
        // The thin body fetches a profile + paints via the shared stroke substrate
        // (AX.W13 paintStrokeMedium wraps the four-layer cascade + tooth/relight/ground),
        // NOT an inline if-ladder.
        expect(/StrokeProfile prof = profileFor\(MEDIUM_OIL, mode\);/.test(oilBody)).toBe(true);
        expect(/paintStrokeMedium\(col, p, t, prof, mode\);/.test(oilBody)).toBe(true);
        // The imperative if-ladder branches must NOT live in mediumOil anymore.
        expect(/if \(mode == 1\)/.test(oilBody)).toBe(false);
        expect(/else if \(mode == 3\)/.test(oilBody)).toBe(false);
    });

    // ── The profile VALUE-FIDELITY: every if-ladder constant survived the move. ──
    // The oil baseline (mode 0) — the StrokeProfile(...) constructor's positional args.
    it("the OIL baseline (mode 0) profile carries the exact HEAD if-ladder values", () => {
        const ctor = (flat.match(/StrokeProfile prof = StrokeProfile\(([^)]*)\)/) || ["", ""])[1];
        const nums = ctor.split(",").map((s) => s.trim().replace(/\/\*.*?\*\//g, "").trim());
        // shapeType, bristleAmp, streakFreq, streakAmp, impastoAmp, hardness,
        // toothScale, toothAmp, pigmentSat, densityBig, densityMed, densitySml
        expect(nums.slice(0, 12)).toEqual([
            "0", "0.25", "9.0", "0.09", "0.9", "0.80",
            "340.0", "0.14", "1.03", "0.65", "0.78", "0.90",
        ]);
    });

    it("the KNIFE mode (1) profile carries the exact HEAD knife overrides", () => {
        const knife = (flat.match(/if \(mode == 1\) \{([\s\S]*?)\} else if/) || ["", ""])[1];
        expect(knife.includes("prof.shapeType  = 3") || knife.includes("prof.shapeType = 3")).toBe(true);
        expect(knife.includes("prof.bristleAmp = 0.12")).toBe(true);
        expect(knife.includes("prof.streakFreq = 4.0")).toBe(true);
        expect(knife.includes("prof.streakAmp = 0.05")).toBe(true);
        expect(knife.includes("prof.impastoAmp = 1.6")).toBe(true);
        expect(knife.includes("prof.hardness   = 0.95") || knife.includes("prof.hardness = 0.95")).toBe(true);
        expect(knife.includes("prof.toothAmp   = 0.04") || knife.includes("prof.toothAmp = 0.04")).toBe(true);
        expect(knife.includes("prof.densityBig = 0.80")).toBe(true);
        expect(knife.includes("prof.densityMed = 0.88")).toBe(true);
        expect(knife.includes("prof.densitySml = 0.70")).toBe(true);
    });

    it("the BRUSHWORK mode (3) profile carries the exact HEAD brushwork overrides", () => {
        const brush = (flat.match(/else if \(mode == 3\) \{([\s\S]*?)\} return prof/) || ["", ""])[1];
        expect(brush.includes("prof.shapeType  = 0") || brush.includes("prof.shapeType = 0")).toBe(true);
        expect(brush.includes("prof.bristleAmp = 0.32")).toBe(true);
        expect(brush.includes("prof.streakFreq = 14.0")).toBe(true);
        expect(brush.includes("prof.streakAmp = 0.14")).toBe(true);
        expect(brush.includes("prof.impastoAmp = 1.2")).toBe(true);
        expect(brush.includes("prof.hardness   = 0.85") || brush.includes("prof.hardness = 0.85")).toBe(true);
        expect(brush.includes("prof.toothAmp   = 0.07") || brush.includes("prof.toothAmp = 0.07")).toBe(true);
    });

    // ── The cascade TOPOLOGY: the four layers + crosshatch preserve the EXACT placement
    // call args (offsets, seeds, scale/density/streak multipliers) the HEAD mediumOil used. ──
    it("paintStrokeLayers preserves the exact 4-layer + crosshatch call topology", () => {
        const body = (flat.match(/void paintStrokeLayers\([\s\S]*?\n\}\s*$/) || flat.match(/void paintStrokeLayers\(([\s\S]*?)\}\s*vec3 mediumOil/) || ["", ""])[0];
        // Layer 1 — big gestural: sBig, lenMulBig, widMulBig, jitter*0.55, seed 1.3.
        // Each bestOil carries the AX.W13 trailing prof.energyGrade arg (the SBR length
        // cascade as a profile field; 0 for oil → byte-stable placement). Layer 4's fill
        // density is AX.W13 prof.densityFill (oil 0.95, van-Gogh sparse) not a literal.
        // The §4.2 anisotropy-lift rebuild (W-AUR-PAINTERLY / W-AUR-VANGOGH-REBUILD) tamed
        // the small/fill positional jitter (1.3→0.9, 1.5→0.8) so the fine layers stay
        // flow-aligned, and made smlShape/fillShape inherit prof.shapeType (the round-dab
        // isotropic sparkle that dragged A down is gone) — re-baselined here to the new source.
        expect(flat.includes("bestOil(p, sBig, lenMulBig, widMulBig, jitterAmt * 0.55, prof.densityBig, prof.shapeType, prof.bristleAmp, flow, t, 1.3, prof.energyGrade)")).toBe(true);
        // Layer 2 — medium body: offset (11.3, 3.7), seed 2.7.
        expect(flat.includes("bestOil(p + vec2(11.3, 3.7), sMed, lenMulMed, widMulMed, jitterAmt, prof.densityMed, prof.shapeType, prof.bristleAmp, flow, t, 2.7, prof.energyGrade)")).toBe(true);
        // Layer 3 — small dabs: offset (-5.1, 8.4), smlShape, jitter*0.9, seed 4.1.
        expect(flat.includes("bestOil(p + vec2(-5.1, 8.4), sSml, lenMulSml, widMulSml, jitterAmt * 0.9, prof.densitySml, smlShape, prof.bristleAmp * 0.85, flow, t, 4.1, prof.energyGrade)")).toBe(true);
        expect(flat.includes("int smlShape = prof.shapeType;")).toBe(true);
        // Layer 4 — fill dabs: offset (3.9, -6.2), density prof.densityFill, fillShape, jitter*0.8, seed 8.9.
        expect(flat.includes("bestOil(p + vec2(3.9, -6.2), sFill, lenMulFill, widMulFill, jitterAmt * 0.8, prof.densityFill, fillShape, prof.bristleAmp * 0.6, flow, t, 8.9, prof.energyGrade)")).toBe(true);
        expect(flat.includes("int fillShape = (mode == 1) ? 3 : prof.shapeType;")).toBe(true);
        // Crosshatch — uStrokeLayers == 2: offset (7.3, -2.1), density*0.7, seed 6.5.
        expect(flat.includes("if (uStrokeLayers == 2)")).toBe(true);
        expect(flat.includes("bestOil(p + vec2(7.3, -2.1), sMed, lenMulMed * 0.9, widMulMed, jitterAmt, prof.densityMed * 0.7, prof.shapeType, prof.bristleAmp, flow2, t, 6.5, prof.energyGrade)")).toBe(true);
        expect(body.length).toBeGreaterThan(0);
    });

    it("paintStrokeLayers preserves the exact per-layer scale + anisotropy multipliers", () => {
        expect(flat.includes("float baseScale = max(uStrokeScale * 0.006, 0.008)")).toBe(true);
        expect(flat.includes("float sBig = baseScale * 2.4")).toBe(true);
        expect(flat.includes("float sMed = baseScale * 1.1")).toBe(true);
        expect(flat.includes("float sSml = baseScale * 0.45")).toBe(true);
        expect(flat.includes("float sFill = baseScale * 0.22")).toBe(true);
        // The §4.2 anisotropy lift (W-AUR-PAINTERLY) elongated the strokes HARD (long·thin)
        // so the field reads strongly directional — the len muls climbed + the width muls
        // pulled tighter. Re-baselined here to the rebuilt source.
        expect(flat.includes("float lenMulBig = mix(3.0, 5.2, uStrokeAnisotropy)")).toBe(true);
        expect(flat.includes("float widMulBig = mix(0.42, 0.22, uStrokeAnisotropy)")).toBe(true);
        expect(flat.includes("float lenMulFill = mix(2.0, 3.2, uStrokeAnisotropy)")).toBe(true);
        expect(flat.includes("float jitterAmt = 0.75")).toBe(true);
    });

    it("mediumOil's tooth/relight/saturation finish reads the profile fields (value-stable)", () => {
        expect(flat.includes("vnoise(p * prof.toothScale)")).toBe(true);
        expect(flat.includes("vnoise(p * prof.toothScale * vec2(0.6, 2.4) + 37.0)")).toBe(true);
        expect(flat.includes("result *= 1.0 + tooth * prof.toothAmp * uCanvasGrain")).toBe(true);
        expect(flat.includes("float canvasBase = tooth * prof.toothAmp * 0.5")).toBe(true);
        expect(flat.includes("result = relightImpasto(result, height, canvasBase)")).toBe(true);
        expect(flat.includes("result = saturate3(result, prof.pigmentSat)")).toBe(true);
    });

    it("the brush placement primitives are NOT re-authored (bestOil/paintOver stay in brush.glsl.ts)", () => {
        // paintStrokeLayers CALLS bestOil/paintOver; it must not RE-DEFINE them (those
        // stay the unchanged placement substrate in brush.glsl.ts).
        expect(/StrokeHit bestOil\(/.test(C)).toBe(false);
        expect(/void paintOver\(/.test(C)).toBe(false);
    });
});
