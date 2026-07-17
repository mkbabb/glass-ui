// The hull se-guard (a born-RED guard against the fork's silent vanish).
// `getSvgPathFromStroke` returns "" when the perfect-freehand outline has < 4 points (a
// degenerate near-point centerline — a hull brush over a 1ch / tiny box-mode datum), so a
// bare `<path d="">` renders NOTHING. The guard falls back to a plain STROKED body so the
// mark ALWAYS paints a visible band. This is the FUNCTIONAL witness (the source-presence
// clause rides proof:handmark + proof:handmark-audit A3; the box-mode render is the π).

import { describe, expect, it } from "vitest";
import { ink } from "@glass/components/handmark/ink";
import { getSvgPathFromStroke } from "@glass/components/handmark/freehand";
import { BRUSHES } from "@glass/components/handmark/brush";
import { shapeGeom } from "@glass/components/handmark/geometry";

// a degenerate near-point centerline — a tiny sub-unit hull datum. The two anchored
// endpoints span 0.3 marking-space units; perfect-freehand collapses that to a < 4-point
// outline (the empty-`d` vanish the guard catches).
const DEGENERATE: [number, number][] = [
    [50, 18],
    [50.3, 18],
];

describe("BG.W-HANDMARK-PERFECT (b) — the hull se-guard", () => {
    it("the raw pf serialiser vanishes on a < 4-point outline (the born-RED root cause)", () => {
        // getSvgPathFromStroke returns "" below 4 outline points — the exact vanish the
        // guard catches (a degenerate near-point hull collapses to fewer than 4 points).
        expect(getSvgPathFromStroke([])).toBe("");
        expect(getSvgPathFromStroke([[0, 0]])).toBe("");
        expect(getSvgPathFromStroke([[0, 0], [1, 0], [1, 1]])).toBe("");
        // a real ≥4-point outline serialises to a non-empty `d`.
        expect(
            getSvgPathFromStroke([[0, 0], [2, 0], [2, 2], [0, 2]]).length,
        ).toBeGreaterThan(2);
    });

    it("ink() on a degenerate hull centerline yields a NON-EMPTY STROKED path (never a vanish)", () => {
        // marker is ribbon:'hull'; over the degenerate centerline the outline collapses,
        // so the guard switches `kind` to stroke — a stroked (not filled) path, real `d`.
        const frag = ink(DEGENERATE, BRUSHES.marker, 1, "#2a8c5a", "hm-guard");
        const p = frag.paths[0];
        expect(p).toBeDefined();
        expect((p.d ?? "").length).toBeGreaterThan(2); // NOT the empty `d=""` vanish
        expect(p.stroke).toBe("#2a8c5a"); // the stroked fallback (kind → stroke)
        expect(p.fill).toBeUndefined(); // NOT a filled hull (which would be the empty vanish)
    });

    it("the FULL-SPAN hull is BYTE-untouched — still a filled hull (the guard is scoped)", () => {
        // a full text-mode highlight span → a non-degenerate outline → the filled hull.
        const g = shapeGeom("highlight", { roughness: 0.5, segments: 9, seed: 1 }, null, 0.85);
        const frag = ink(g.lines[0], BRUSHES.highlighter, 1, "#ffd84a", "hm-full");
        const p = frag.paths[0];
        expect(p.fill).toBe("#ffd84a"); // the filled hull survives (guard never fires)
        expect(p.stroke).toBeUndefined();
        expect((p.d ?? "").length).toBeGreaterThan(10);
    });

    it("every hull voice (crayon/marker/highlighter/boil) survives the degenerate datum", () => {
        for (const name of ["crayon", "marker", "highlighter", "boil"] as const) {
            const frag = ink(DEGENERATE, BRUSHES[name], 3, "#000", `hm-${name}`);
            const painted = frag.paths.length > 0 && frag.paths.every((p) => (p.d ?? "").length > 2);
            expect(painted, `${name} must paint a non-empty path over a tiny datum`).toBe(true);
        }
    });
});
