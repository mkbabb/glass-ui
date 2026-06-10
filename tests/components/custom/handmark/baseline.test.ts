// E1.2a — proof:handmark-baseline-unit, the MEASURED-baseline lock.
//
// The E1 occlusion root: the text-mode underline drew at a constant `y = 32` (80%
// of the 40-unit viewBox). On tight-leading display type (`line-height ≈ 1.02`) 80%
// of the line-box IS the alphabetic baseline, so the fat crayon bar struck THROUGH
// the glyphs in 100% of cells. The fix anchors the underline to the MEASURED text
// baseline: `y = VB_H × (baselineFrac + UNDERLINE_GAP)` — the same measured pattern
// the box-mode circles already use, never a magic number.
//
// This unit LOCKS the root so a future minor cannot regress to the hardcoded `32`:
//   - the text-mode underline y is DERIVED from the measured `baselineFrac`
//     (different measure ⇒ different y — the derivation, not a constant);
//   - the underline sits BELOW the measured baseline by the hairline GAP (never
//     above it — the occlusion invariant `inkTop ≥ baseline`);
//   - the box-mode (positioned) circle keeps its OWN hand geometry, untouched by
//     the text-mode measure (the rings were always correct).

import { describe, expect, it } from "vitest";
import {
    shapeGeom,
    UNDERLINE_GAP,
    VB_H,
} from "../../../../src/components/custom/handmark/geometry";

const OPTS = { roughness: 0.7, segments: 9, seed: 1 } as const;

/** The underline centerline y (the wobble jitters AROUND it; the mean is the anchor). */
function underlineY(baselineFrac: number | null): number {
    const g = shapeGeom("underline", { ...OPTS }, null, baselineFrac);
    const ys = g.lines[0].map((p) => p[1]);
    return ys.reduce((a, b) => a + b, 0) / ys.length;
}

describe("E1.2a baseline — the underline y is MEASURED, never a hardcoded 32", () => {
    it("DERIVES the underline y from the measured baselineFrac (not a constant)", () => {
        // a tight-leading heading: the baseline sits high in the box (~0.80) …
        const tight = underlineY(0.8);
        // … a loose-leading line: the baseline sits lower (~0.62).
        const loose = underlineY(0.62);
        // the y MOVES with the measure — proof it is derived, not the frozen 32.
        expect(tight).not.toBeCloseTo(loose, 1);
        // and each equals VB_H × (frac + GAP) about its wobble mean.
        expect(tight).toBeCloseTo(VB_H * (0.8 + UNDERLINE_GAP), 0);
        expect(loose).toBeCloseTo(VB_H * (0.62 + UNDERLINE_GAP), 0);
    });

    it("places the ink BELOW the measured baseline by the hairline GAP (no strikethrough)", () => {
        // on a TIGHT heading where the old constant 32 (=0.80×VB_H) was AT the baseline,
        // the measured anchor clears it downward by VB_H × GAP — the occlusion fix.
        const frac = 0.8;
        const baselinePx = VB_H * frac; // = 32 — exactly the old magic number's y
        const y = underlineY(frac);
        expect(y).toBeGreaterThan(baselinePx); // the ink sits BELOW the baseline now
        expect(y).toBeCloseTo(baselinePx + VB_H * UNDERLINE_GAP, 0);
    });

    it("the GAP is a real downward offset (a hand mark hugs UNDER the word)", () => {
        expect(UNDERLINE_GAP).toBeGreaterThan(0);
        expect(UNDERLINE_GAP).toBeLessThan(0.2); // a hairline, not a chasm
    });

    it("pre-measure (baselineFrac=null) falls back to the legacy constant so first paint renders", () => {
        // null ⇒ the VB_H − 8 (=32) fallback — a line still draws on the SSR/jsdom
        // frame, replaced the instant the SFC's measure lands (no blank first paint).
        const y = underlineY(null);
        expect(y).toBeCloseTo(VB_H - 8, 0);
    });

    it("box-mode (positioned circle) is UNTOUCHED by the text measure — the rings stay correct", () => {
        const datum = { x: 30, y: 12, w: 40, h: 16 };
        // passing a baselineFrac must NOT perturb positioned geometry (text-mode only).
        const withFrac = shapeGeom("circle", { ...OPTS }, datum, 0.8);
        const noFrac = shapeGeom("circle", { ...OPTS }, datum, null);
        const sx = withFrac.lines[0].map((p) => `${p[0]},${p[1]}`).join(" ");
        const nx = noFrac.lines[0].map((p) => `${p[0]},${p[1]}`).join(" ");
        expect(sx).toBe(nx); // the circle ignores the text baseline entirely
        expect(withFrac.closed).toBe(true);
    });
});
