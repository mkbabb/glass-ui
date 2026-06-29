// D6.a — the Brush continuum (the keystone data model).
//
// The shipped register's invariants (SPEC §2 / §12):
//   - pen is the DEFAULT and is grain:0 ⇒ NO filter (the pen-is-free law, acc-4);
//   - the SHIPPED crayon is the STROKE-crayon: ribbon:'stroke', 2 passes, a real
//     static seeded grain filter (ds-crayon-handmark) — NOT a pf hull;
//   - resolution is preset → object → extra-overrides, later wins (determinism);
//   - lerpBrush yields a sensible in-between (the continuum proof, acc-2 — no NaN).

import { describe, expect, it } from "vitest";
import {
    BRUSHES,
    resolveBrush,
    lerpBrush,
} from "@glass/components/custom/handmark/brush";
import { grainFilter, hasGrain } from "@glass/components/custom/handmark/texture";

describe("D6.a brush — the flat continuum", () => {
    it("pen is the default and is grain:0 ⇒ NO filter emitted (pen is free)", () => {
        const pen = BRUSHES.pen;
        expect(pen.grain).toBe(0);
        expect(pen.ribbon).toBe("stroke");
        expect(hasGrain(pen)).toBe(false);
        expect(grainFilter("hm-x", pen, 1)).toBe(""); // the zero-cost vector edge
    });

    it("the SHIPPED crayon is the hull-crayon: ribbon='hull', 2 passes, real grain", () => {
        const crayon = BRUSHES.crayon;
        // BD impl P5 RE-INVENT — crayon engages `ribbon:'hull'` (the perfect-freehand
        // curvature-coupled variable-width body): the 2 offset passes swell + run out
        // dry, a real waxy crayon, not a flat constant-width ruler. The seeded static
        // feTurbulence grain (ds-crayon-handmark) still rides on TOP.
        expect(crayon.ribbon).toBe("hull");
        expect(crayon.passes).toBe(2); // two offset hull passes
        expect(crayon.grain).toBeGreaterThan(0); // a real broken-edge filter
        expect(hasGrain(crayon)).toBe(true);
        expect(grainFilter("hm-x", crayon, 1)).toContain("<filter");
    });

    it("resolveBrush layers preset → object → overrides (later wins; pen stays clean)", () => {
        const b = resolveBrush("pen", { weight: 9 });
        expect(b.weight).toBe(9);
        expect(b.grain).toBe(0); // override weight, grain still 0 → still clean
        const c = resolveBrush({ ...BRUSHES.crayon, opacity: 0.5 }, { weight: 4 });
        expect(c.opacity).toBe(0.5); // object override
        expect(c.weight).toBe(4); // extra override wins last
    });

    it("lerpBrush(pen, crayon, 0.5) is a valid sensible in-between (no NaN — acc-2)", () => {
        const mid = lerpBrush(BRUSHES.pen, BRUSHES.crayon, 0.5);
        // every numeric field is finite (a coordinate, not garbage)
        for (const v of Object.values(mid)) {
            if (typeof v === "number") expect(Number.isFinite(v)).toBe(true);
        }
        // it reads as "inky crayon": grain between pen(0) and crayon(0.85)
        expect(mid.grain).toBeGreaterThan(BRUSHES.pen.grain);
        expect(mid.grain).toBeLessThan(BRUSHES.crayon.grain);
        // passes/octaves/segments stay integers (rounded), ≥ their floors
        expect(Number.isInteger(mid.passes)).toBe(true);
        expect(mid.passes).toBeGreaterThanOrEqual(1);
    });

    it("RING is the thin editorial margin mark — a whisper, not the crayon SLAB (E7a)", () => {
        const ring = BRUSHES.ring;
        const crayon = BRUSHES.crayon;
        // the positioned-circle stroke budget: thin weight, SINGLE pass, lower alpha.
        expect(ring.weight).toBeGreaterThanOrEqual(4);
        expect(ring.weight).toBeLessThanOrEqual(5);
        expect(ring.passes).toBe(1); // not the crayon's 2-pass overdrawn slab
        expect(ring.opacity).toBeCloseTo(0.55, 2);
        // strictly lighter than the underline-tuned crayon on every loudness axis.
        expect(ring.weight).toBeLessThan(crayon.weight); // 5 ≪ 16
        expect(ring.passes).toBeLessThan(crayon.passes); // 1 < 2
        expect(ring.opacity).toBeLessThan(crayon.opacity); // 0.55 < 0.8
        // but it KEEPS the hand-crayon GRAIN character (it is a hand, not a clean ring).
        expect(ring.ribbon).toBe("stroke");
        expect(hasGrain(ring)).toBe(true);
        expect(grainFilter("hm-x", ring, 1)).toContain("<filter");
    });

    it("highlighter is the spanning-set stress test — the one field that earns its place (blend)", () => {
        expect(BRUSHES.highlighter.blend).toBe("multiply");
        // no OTHER built-in needs multiply — proves blend is a real axis, not bloat
        const others = (["pen", "pencil", "crayon", "marker"] as const).map(
            (k) => BRUSHES[k].blend,
        );
        expect(others.every((b) => b === "source-over")).toBe(true);
    });
});
