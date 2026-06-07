// AW.W17 — the pure field-engine contract. seedField lays out `count` nodes
// within bounds; stepField drifts + bounces a node off a wall (the velocity sign
// flips); the four neutral passes paint without throwing on a stub 2D context.

import { describe, expect, it, vi } from "vitest";
import { mulberry32 } from "../../../../src/utils/prng";
import {
    seedField,
    stepField,
    drawEdges,
    drawNodes,
    drawPointerWeb,
    drawRipples,
    DEFAULT_PALETTE,
    type ConstellationField,
} from "../../../../src/components/custom/constellation/constellationField";

function makeCtx() {
    return {
        strokeStyle: "",
        fillStyle: "",
        lineWidth: 0,
        globalAlpha: 1,
        beginPath: vi.fn(),
        moveTo: vi.fn(),
        lineTo: vi.fn(),
        arc: vi.fn(),
        stroke: vi.fn(),
        fill: vi.fn(),
        clearRect: vi.fn(),
    } as unknown as CanvasRenderingContext2D;
}

describe("constellationField — the pure proximity-graph engine (AW.W17)", () => {
    it("seedField produces `count` nodes within bounds, reproducible under a seed", () => {
        const rng = mulberry32(0xc0ffee);
        const nodes = seedField(rng, 40, 800, 600, 0.16);
        expect(nodes).toHaveLength(40);
        for (const n of nodes) {
            expect(n.x).toBeGreaterThanOrEqual(0);
            expect(n.x).toBeLessThanOrEqual(800);
            expect(n.y).toBeGreaterThanOrEqual(0);
            expect(n.y).toBeLessThanOrEqual(600);
            expect(typeof n.vx).toBe("number");
            expect(typeof n.vy).toBe("number");
        }
        // a seeded field is byte-reproducible (deterministic captures).
        const again = seedField(mulberry32(0xc0ffee), 40, 800, 600, 0.16);
        expect(again[0]).toEqual(nodes[0]);
        expect(again[39]).toEqual(nodes[39]);
    });

    it("stepField bounces a node off a wall (velocity sign flips, position clamps)", () => {
        const field: ConstellationField = {
            nodes: [{ x: 1, y: 300, vx: -10, vy: 0, r: 2, dim: false }],
            canvas: null,
            w: 800,
            h: 600,
            k: 1,
            dpr: 1,
        };
        // x = 1 + (-10) → -9 < 0 → clamp to 0, flip vx to +10.
        stepField(field, 1, 0.16, null);
        expect(field.nodes[0].x).toBe(0);
        expect(field.nodes[0].vx).toBe(10);

        // a node past the right wall flips the other way.
        field.nodes[0] = { x: 799, y: 599, vx: 10, vy: 10, r: 2, dim: false };
        stepField(field, 1, 0.16, null);
        expect(field.nodes[0].x).toBe(800);
        expect(field.nodes[0].vx).toBe(-10);
        expect(field.nodes[0].y).toBe(600);
        expect(field.nodes[0].vy).toBe(-10);
    });

    it("pointer steering preserves node speed (leans, does not accelerate)", () => {
        const field: ConstellationField = {
            nodes: [{ x: 400, y: 300, vx: 0.16, vy: 0, r: 2, dim: false }],
            canvas: null,
            w: 800,
            h: 600,
            k: 1,
            dpr: 1,
        };
        const speedBefore = Math.hypot(field.nodes[0].vx, field.nodes[0].vy);
        // pointer just off the node, within the 180px influence radius.
        stepField(field, 1, 0.16, { x: 450, y: 300 });
        const speedAfter = Math.hypot(field.nodes[0].vx, field.nodes[0].vy);
        // the lean re-normalizes to the original speed (within float tolerance).
        expect(speedAfter).toBeCloseTo(speedBefore, 5);
    });

    it("the four neutral passes paint a field without throwing", () => {
        const ctx = makeCtx();
        const field: ConstellationField = {
            nodes: seedField(mulberry32(1), 12, 400, 300, 0.16),
            canvas: null,
            w: 400,
            h: 300,
            k: 1,
            dpr: 1,
        };
        expect(() => drawEdges(ctx, field, 132, DEFAULT_PALETTE)).not.toThrow();
        expect(() => drawNodes(ctx, field, DEFAULT_PALETTE)).not.toThrow();
        expect(() =>
            drawPointerWeb(ctx, field, 132, DEFAULT_PALETTE, { x: 200, y: 150 }),
        ).not.toThrow();
        const ripples = [{ x: 100, y: 100, start: -1 }];
        expect(() =>
            drawRipples(ctx, field, 1000, ripples, DEFAULT_PALETTE),
        ).not.toThrow();
        // a fully-faded ripple is spliced out.
        drawRipples(ctx, field, 1000 + 2000, ripples, DEFAULT_PALETTE);
        expect(ripples).toHaveLength(0);
    });
});
