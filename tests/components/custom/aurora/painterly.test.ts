// The painterly engine unit suite.
//
// Two arms:
// (1) the structure-tensor eigen-decomposition — a TS port of the GLSL
//       closed-form 2x2 eigen-decomposition asserted against a synthetic linear-
//       gradient field of KNOWN orientation. The minor eigenvector is the edge
//       TANGENT (the stroke direction); a synthetic vertical gradient (color
//       changing along +x) yields a tensor whose minor eigenvector points along
//       +y (the iso-band tangent). The MAJOR-eigenvector swap (the bite) points
//       along the gradient instead, which the orientation assertion rejects.
// (2) the medium-uniform resolution — `resolveMediumId` /
//       `resolveStrokeOrientId` map the vangogh + oil-pastel mediums to their
//       shader ints and FORCE the structure-tensor orientation.

import { describe, expect, it } from "vitest";
import {
    MEDIUM_ID,
    STROKE_ORIENT_ID,
    FLOW_ID,
    resolveMediumId,
    resolveStrokeOrientId,
} from "@glass/components/aurora/composables/uniformBridge";
import { DEFAULT_AURORA_CONFIG } from "@glass/components/aurora/constants/presets";
import type { AuroraConfig } from "@glass/components/aurora/constants/presets";

// ── A TS port of the GLSL structureTensorField eigen-decomposition. ────
// MIRRORS mediums.glsl.ts structureTensorField: form the 2x2 structure tensor from
// a gradient (Gx, Gy), closed-form eigen-decompose, return the MINOR eigenvector
// (the edge tangent). The shader Sobel-samples luma(sampleBase); here the gradient
// is fed directly so the test is deterministic.
interface TensorResult {
    tangent: [number, number];
    coherence: number;
}

function structureTensorFromGradient(
    Gx: number,
    Gy: number,
    fallback: [number, number] = [1, 0],
    /** when true, return the MAJOR eigenvector (the gradient/normal) — the BITE. */
    bite = false,
): TensorResult {
    const Jxx = Gx * Gx;
    const Jyy = Gy * Gy;
    const Jxy = Gx * Gy;
    const tr = Jxx + Jyy;
    const disc = Math.sqrt(Math.max((Jxx - Jyy) * (Jxx - Jyy) + 4 * Jxy * Jxy, 0));
    const lambdaMaj = 0.5 * (tr + disc);
    const lambdaMin = 0.5 * (tr - disc);
    let tangent: [number, number];
    if (disc < 1e-7) {
        tangent = fallback;
    } else {
        // the principal angle θ = 0.5·atan2(2·Jxy, Jxx-Jyy) (the MAJOR/gradient
        // angle); robust at Jxy≈0. The MINOR (tangent) is the perpendicular.
        const theta = 0.5 * Math.atan2(2 * Jxy, Jxx - Jyy);
        tangent = bite
            ? [Math.cos(theta), Math.sin(theta)] // the BITE: the gradient direction
            : [-Math.sin(theta), Math.cos(theta)]; // the tangent (perpendicular)
    }
    const coherence = (lambdaMaj - lambdaMin) / (lambdaMaj + lambdaMin + 1e-6);
    return { tangent, coherence: Math.min(Math.max(coherence, 0), 1) };
}

/** Absolute angle of a 2D vector, folded to [0, pi) (direction sign-agnostic). */
function lineAngle(v: [number, number]): number {
    let a = Math.atan2(v[1], v[0]);
    if (a < 0) a += Math.PI; // a stroke and its 180-flip are the same line.
    if (a >= Math.PI) a -= Math.PI;
    return a;
}

describe("structure-tensor / ETF orientation field", () => {
    it("the minor eigenvector is the edge TANGENT (perpendicular to the gradient)", () => {
        // A field whose color changes along +x (a vertical band edge): gradient is
        // horizontal (Gx=1, Gy=0). The iso-band TANGENT is vertical (+y).
        const { tangent } = structureTensorFromGradient(1, 0);
        // tangent should be along the y-axis (perpendicular to the gradient).
        expect(Math.abs(tangent[0])).toBeLessThan(1e-4);
        expect(Math.abs(tangent[1])).toBeCloseTo(1, 4);
    });

    it("the tangent tracks a 45-degree gradient field within 1e-4 of the perpendicular", () => {
        // gradient along (1,1) → tangent along (-1,1)/sqrt2 (perpendicular line).
        const { tangent } = structureTensorFromGradient(1, 1);
        const tangentLine = lineAngle(tangent);
        const expectedLine = lineAngle([-1, 1]);
        expect(Math.abs(tangentLine - expectedLine)).toBeLessThan(1e-4);
    });

    it("BITE: the MAJOR eigenvector points ALONG the gradient (the edge NORMAL) — the orientation assertion rejects it", () => {
        const tangent = structureTensorFromGradient(1, 0).tangent;
        const major = structureTensorFromGradient(1, 0, [1, 0], true).tangent;
        // the correct tangent is vertical; the major eigenvector (the bite) is
        // horizontal — they differ by ~90 degrees (the bite makes strokes cross
        // the bands instead of hugging them).
        const dTangentToMajor = Math.abs(lineAngle(tangent) - lineAngle(major));
        expect(dTangentToMajor).toBeGreaterThan(Math.PI / 2 - 1e-3);
    });

    it("coherence is high for a strong gradient and ~0 for a flat (isotropic) field", () => {
        expect(structureTensorFromGradient(1, 0).coherence).toBeCloseTo(1, 4);
        // a flat field (no gradient) is fully isotropic → coherence 0, fallback dir.
        const flat = structureTensorFromGradient(0, 0, [0.7, 0.7]);
        expect(flat.coherence).toBeLessThan(1e-3);
        expect(flat.tangent).toEqual([0.7, 0.7]);
    });
});

describe("medium + stroke-orient resolution", () => {
    const cfg = (over: Partial<AuroraConfig>): AuroraConfig => ({
        ...DEFAULT_AURORA_CONFIG,
        ...over,
    });

    it("the vangogh + oil-pastel mediums have their shader-int slots", () => {
        expect(MEDIUM_ID.vangogh).toBe(5);
        expect(MEDIUM_ID["oil-pastel"]).toBe(6);
        expect(FLOW_ID.tensor).toBe(5);
        expect(STROKE_ORIENT_ID.tensor).toBe(1);
    });

    it("resolveMediumId maps vangogh→5 and oil-pastel→6", () => {
        expect(resolveMediumId(cfg({ medium: "vangogh" }))).toBe(5);
        expect(resolveMediumId(cfg({ medium: "oil-pastel" }))).toBe(6);
    });

    it("the vangogh + oil-pastel mediums FORCE the structure-tensor orientation", () => {
        // even with an explicit strokeOrient:"flow", the painterly mediums force tensor.
        expect(resolveStrokeOrientId(cfg({ medium: "vangogh", strokeOrient: "flow" }))).toBe(
            STROKE_ORIENT_ID.tensor,
        );
        expect(
            resolveStrokeOrientId(cfg({ medium: "oil-pastel", strokeOrient: "flow" })),
        ).toBe(STROKE_ORIENT_ID.tensor);
    });

    it("non-painterly mediums honor the config strokeOrient (default flow)", () => {
        expect(resolveStrokeOrientId(cfg({ medium: "smooth" }))).toBe(STROKE_ORIENT_ID.flow);
        expect(resolveStrokeOrientId(cfg({ medium: "oil", strokeOrient: "tensor" }))).toBe(
            STROKE_ORIENT_ID.tensor,
        );
    });
});
