// AY.W-UNDERLINE — the CONSUMER-FIDELITY canary (gate 4). The transposed render is
// geometry-IDENTICAL to the sci-report HandUnderline.vue source for the canonical
// path: same STROKE_D / GHOST_D, same dasharray model (the fixed over-long HU_LEN
// 120 is KEPT per DEC-10 and this canary locks it). A byte-compare of the path
// constants against a RECORDED fixture, so the transposition is faithful, not a
// re-invention. If a future edit drifts the canonical geometry the canary REDs.

import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const PKG = resolve(import.meta.dirname, "../../../../src/components/custom/underline");

// ── The recorded fixture (the sci-report HandUnderline.vue:78-83 canonical
//    geometry — byte-locked here so the transposition stays faithful). ──────────
const SOURCE_FIXTURE = {
    HU_LEN: 120,
    STROKE_D: "M1,6 C18,3 30,8 48,5 S78,3 99,6",
    GHOST_D: "M1,7.1 C20,5 32,9 50,6.2 S80,5 99,7",
    viewBox: "0 0 100 10",
} as const;

describe("GlassUnderline — CONSUMER-FIDELITY (geometry byte-locked to the source)", () => {
    const src = readFileSync(resolve(PKG, "GlassUnderline.vue"), "utf8");

    it("GU_LEN matches the source HU_LEN (the fixed over-long dasharray, DEC-10)", () => {
        const m = /const GU_LEN = (\d+);/.exec(src);
        expect(m).toBeTruthy();
        expect(Number(m![1])).toBe(SOURCE_FIXTURE.HU_LEN);
    });

    it("STROKE_D is byte-identical to the source canonical pen stroke", () => {
        const m = /const STROKE_D = "([^"]+)";/.exec(src);
        expect(m).toBeTruthy();
        expect(m![1]).toBe(SOURCE_FIXTURE.STROKE_D);
    });

    it("GHOST_D is byte-identical to the source canonical ghost overdraw", () => {
        const m = /const GHOST_D = "([^"]+)";/.exec(src);
        expect(m).toBeTruthy();
        expect(m![1]).toBe(SOURCE_FIXTURE.GHOST_D);
    });

    it("the canonical viewBox matches the source (0 0 100 10)", () => {
        // The default viewBox the `paths` tuple falls back to.
        expect(src).toContain(`?? "${SOURCE_FIXTURE.viewBox}"`);
    });

    it("the dasharray model is the source's (one dash --gu-len, offset --gu-off)", () => {
        // The whole path is one dash offset fully out by default — the source model.
        expect(src).toContain("stroke-dasharray: var(--gu-len, 120)");
        expect(src).toContain("stroke-dashoffset: var(--gu-off, 0)");
    });
});
