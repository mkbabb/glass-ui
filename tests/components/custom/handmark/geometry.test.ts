// D6.a — the shape mappers ride pencil-boil 0.4.0 (incl. the new ellipsePoints).
//
// Brush ⟂ Path: a shape emits a plain Point[] centerline; the renderer is
// shape-blind. The circle arm rides pencil-boil's new `ellipsePoints` (the
// hand-circle overshoot ring — the sole upstream geometry delta). Determinism is
// inherited (mulberry32): same seed ⇒ identical geometry.

import { describe, expect, it } from "vitest";
import {
    shapeGeom,
    serialize,
    boilLines,
} from "../../../../src/components/custom/handmark/geometry";

const OPTS = { roughness: 0.7, segments: 9, seed: 1 } as const;

describe("D6.a geometry — semantic shape → centerline", () => {
    it("underline is one OPEN polyline along the baseline", () => {
        const g = shapeGeom("underline", { ...OPTS });
        expect(g.closed).toBe(false);
        expect(g.lines).toHaveLength(1);
        expect(g.lines[0].length).toBeGreaterThan(2);
    });

    it("circle is a CLOSED ring riding pencil-boil ellipsePoints (the overshoot)", () => {
        const g = shapeGeom("circle", { ...OPTS, roughness: 1.5 });
        expect(g.closed).toBe(true);
        const ring = g.lines[0];
        expect(ring.length).toBeGreaterThanOrEqual(13);
        // hand-circled, not snapped: the last point is NOT coincident with the first
        const first = ring[0];
        const last = ring[ring.length - 1];
        const gap = Math.hypot(last[0] - first[0], last[1] - first[1]);
        expect(gap).toBeGreaterThan(0.01); // the cross-over overshoot
    });

    it("box is FOUR open wobble lines (a wobbled frame), not a closed ring", () => {
        const g = shapeGeom("box", { ...OPTS });
        expect(g.closed).toBe(false);
        expect(g.lines).toHaveLength(4);
    });

    it("is DETERMINISTIC: same seed ⇒ identical d; different seed ⇒ different d (SPEC §7)", () => {
        const a = serialize(shapeGeom("underline", { ...OPTS, seed: 7 }).lines);
        const b = serialize(shapeGeom("underline", { ...OPTS, seed: 7 }).lines);
        const c = serialize(shapeGeom("underline", { ...OPTS, seed: 42 }).lines);
        expect(a).toBe(b); // pixel-identical across reloads
        expect(a).not.toBe(c); // same-character, different mark
    });

    it("positioned mode maps an explicit datum box (circle an anomaly)", () => {
        const datum = { x: 30, y: 12, w: 40, h: 16 };
        const g = shapeGeom("circle", { ...OPTS }, datum);
        expect(g.closed).toBe(true);
        // the ring centers on the box, not the full viewBox
        const xs = g.lines[0].map((p) => p[0]);
        const cx = (Math.min(...xs) + Math.max(...xs)) / 2;
        expect(cx).toBeGreaterThan(40);
        expect(cx).toBeLessThan(60); // ~ box center x = 50
    });

    it("boilLines re-perturbs anchored endpoints (open) — no draw-on pop", () => {
        const g = shapeGeom("underline", { ...OPTS, seed: 3 });
        const boiled = boilLines(g, 1.2, 31);
        const base = g.lines[0];
        const a = boiled[0];
        // endpoints stay anchored; the midpoint moved (the living-line wobble)
        expect(a[0][0]).toBeCloseTo(base[0][0], 5);
        expect(a[a.length - 1][0]).toBeCloseTo(base[base.length - 1][0], 5);
        const mid = Math.floor(base.length / 2);
        expect(a[mid][1]).not.toBe(base[mid][1]);
    });
});
