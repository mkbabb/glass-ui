// BA.W-HANDMARK C-2 — the natural-underline morphology (born-RED at the fork's
// "renders pen today" no-op). The atlas's four axes, on the ONE seeded pencil-boil
// engine fed by the house prng leaf:
//   - scale-relative amplitude (two widths → proportional peak deviation);
//   - irregular 2–4 periods (a seeded period count, varying across seeds);
//   - pressure-taper-friendly point stream (the body is non-uniform);
//   - seed discipline: a seed reproduces byte-identical geometry; two seeds differ;
//   - ONE mulberry32 source (the house leaf feeds pencil-boil — grep enforced in the
//     proof gate; here the determinism + variation prove the seed is consumed).

import { describe, expect, it } from "vitest";
import { serialize, shapeGeom } from "@glass/components/custom/handmark/geometry";

const OPTS = { roughness: 0.9, segments: 14, seed: 1 } as const;

/** The signed peak deviation of an underline's centerline off its flat baseline. */
function peakDeviation(lines: [number, number][][], yBase: number): number {
    let peak = 0;
    for (const pts of lines) {
        for (const [, y] of pts) peak = Math.max(peak, Math.abs(y - yBase));
    }
    return peak;
}

describe("C-2 natural-underline morphology — procedural off pencil-boil", () => {
    it("the `natural` underline DIFFERS from the default pencil-boil line (renders-pen no-op dies)", () => {
        // a measured baseline so both seat at the same y; the GEOMETRY must diverge.
        const baseline = 0.85;
        const def = serialize(
            shapeGeom("underline", { ...OPTS }, null, baseline, false).lines,
        );
        const nat = serialize(
            shapeGeom("underline", { ...OPTS }, null, baseline, true).lines,
        );
        expect(nat).not.toBe(def); // not the same line — a distinct voice
        expect(nat.length).toBeGreaterThan(10);
    });

    it("amplitude SCALES with the rendered span (a wide box wobbles proportionally larger)", () => {
        // text mode spans pad..VB_W-pad (≈92); a positioned box gives a NARROW span.
        // The natural morphology amplitude is a fraction of the span, so the wide
        // text-mode line's peak deviation exceeds the narrow box-mode line's.
        const baseline = 0.85;
        const wide = shapeGeom("underline", { ...OPTS, seed: 5 }, null, baseline, true);
        // a narrow positioned box (span 20) seated at the same fractional y.
        const narrowBox = { x: 40, y: 28, w: 20, h: 4 };
        const narrow = shapeGeom("underline", { ...OPTS, seed: 5 }, narrowBox, null, true);
        const wideY = wide.lines[0][0][1];
        const narrowY = narrow.lines[0][0][1];
        const wideDev = peakDeviation(wide.lines, wideY);
        const narrowDev = peakDeviation(narrow.lines, narrowY);
        // amplitude is span-relative: the ~92-unit span deviates more than the 20-unit.
        expect(wideDev).toBeGreaterThan(narrowDev * 1.5);
    });

    it("period count is IRREGULAR — different seeds yield different geometry (not fixed humps)", () => {
        const baseline = 0.85;
        const a = serialize(shapeGeom("underline", { ...OPTS, seed: 2 }, null, baseline, true).lines);
        const b = serialize(shapeGeom("underline", { ...OPTS, seed: 9 }, null, baseline, true).lines);
        const c = serialize(shapeGeom("underline", { ...OPTS, seed: 23 }, null, baseline, true).lines);
        // three seeds → three distinct paths (no fixed-period twin).
        expect(new Set([a, b, c]).size).toBe(3);
    });

    it("is DETERMINISTIC: same seed ⇒ byte-identical natural geometry (the seed-discipline floor)", () => {
        const baseline = 0.85;
        const a = serialize(shapeGeom("underline", { ...OPTS, seed: 7 }, null, baseline, true).lines);
        const b = serialize(shapeGeom("underline", { ...OPTS, seed: 7 }, null, baseline, true).lines);
        expect(a).toBe(b); // reproducible across mounts (the house mulberry32 feed)
    });

    it("the body is NON-UNIFORM (an enveloped wobble, the pressure-taper substrate)", () => {
        // the natural morphology tapers the wobble to zero at the ends (anchored) and
        // peaks mid-span — a real per-vertex variation the pf hull reads as pressure.
        const baseline = 0.85;
        const g = shapeGeom("underline", { ...OPTS, seed: 4, segments: 16 }, null, baseline, true);
        const pts = g.lines[0];
        const yBase = pts[0][1];
        // the endpoints are anchored (≈ flat), the interior deviates (the living line).
        const endDev = Math.abs(pts[pts.length - 1][1] - yBase);
        const midDev = Math.abs(pts[Math.floor(pts.length / 2)][1] - yBase);
        expect(endDev).toBeLessThan(0.5); // anchored end
        expect(midDev).toBeGreaterThan(endDev); // the body bows away
    });
});
