// AW.W17 — the pure field-engine contract. seedField lays out `count` nodes
// within bounds; stepField drifts + bounces a node off a wall (the velocity sign
// flips); the four neutral passes paint without throwing on a stub 2D context.

import { describe, expect, it, vi } from "vitest";
import { mulberry32 } from "../../../../src/utils/prng";
import {
    seedField,
    stepField,
    refitField,
    drawEdges,
    drawNodes,
    drawPointerWeb,
    drawRipples,
    nearestNode,
    warpStep,
    warpTo,
    setWarpTarget,
    warpSettled,
    pickWanderTarget,
    DEFAULT_PALETTE,
    type ConstellationField,
    type ConstellationNode,
    type ConstellationWander,
} from "../../../../src/components/custom/constellation/constellationField";

/** A complete `ConstellationField` (focalIndex + warp) — AX.W17. */
function makeField(
    nodes: ConstellationNode[],
    w = 800,
    h = 600,
): ConstellationField {
    return {
        nodes,
        canvas: null,
        w,
        h,
        k: 1,
        dpr: 1,
        focalIndex: -1,
        warp: { x: 0, y: 0, vx: 0, vy: 0, targetIdx: -1 },
    };
}

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
        const field = makeField([{ x: 1, y: 300, vx: -10, vy: 0, r: 2, dim: false }]);
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
        const field = makeField([{ x: 400, y: 300, vx: 0.16, vy: 0, r: 2, dim: false }]);
        const speedBefore = Math.hypot(field.nodes[0].vx, field.nodes[0].vy);
        // pointer just off the node, within the 180px influence radius.
        stepField(field, 1, 0.16, { x: 450, y: 300 });
        const speedAfter = Math.hypot(field.nodes[0].vx, field.nodes[0].vy);
        // the lean re-normalizes to the original speed (within float tolerance).
        expect(speedAfter).toBeCloseTo(speedBefore, 5);
    });

    it("the four neutral passes paint a field without throwing", () => {
        const ctx = makeCtx();
        const field = makeField(seedField(mulberry32(1), 12, 400, 300, 0.16), 400, 300);
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

describe("constellation focal-node + warp spring (AX.W17)", () => {
    const stillNodes = (): ConstellationNode[] => [
        { x: 100, y: 100, vx: 0, vy: 0, r: 2, dim: false },
        { x: 500, y: 100, vx: 0, vy: 0, r: 2, dim: false },
        { x: 100, y: 500, vx: 0, vy: 0, r: 2, dim: false },
        { x: 700, y: 400, vx: 0, vy: 0, r: 2, dim: false },
    ];

    it("nearestNode returns the min-d² node and excludes the excluded index", () => {
        const field = makeField(stillNodes());
        // closest to (130,110) is node 0 at (100,100).
        expect(nearestNode(field, 130, 110)).toBe(0);
        // excluding node 0 → the next-nearest is node 1 (500,100): d²≈137k vs
        // node 2 (100,500) d²≈153k — node 1 wins by ~16k.
        expect(nearestNode(field, 130, 110, 0)).toBe(1);
        // empty / fully-excluded field → -1.
        expect(nearestNode(makeField([]), 0, 0)).toBe(-1);
    });

    it("warpTo re-points the focal to the nearest node (excluding the current focal)", () => {
        const field = makeField(stillNodes());
        field.warp.x = 400; // start the spring mid-field
        field.warp.y = 300;
        const idx = warpTo(field, 690, 410); // nearest is node 3 (700,400)
        expect(idx).toBe(3);
        expect(field.focalIndex).toBe(3);
        expect(field.warp.targetIdx).toBe(3);
    });

    it("warpTo no-ops when the click lands on the current focal node", () => {
        const field = makeField(stillNodes());
        setWarpTarget(field, 1); // focal = node 1 (500,100)
        // a click right on node 1 → degenerate no-op (stays on node 1).
        const idx = warpTo(field, 505, 102);
        expect(idx).toBe(1);
        expect(field.focalIndex).toBe(1);
    });

    it("warpStep springs the focal toward the LIVE target and converges onto it", () => {
        const field = makeField(stillNodes());
        field.warp.x = 400;
        field.warp.y = 300;
        warpTo(field, 690, 410); // target = node 3 (700,400)
        const startD = Math.hypot(field.warp.x - 700, field.warp.y - 400);
        // advance the spring ~2s in 60fps steps.
        for (let i = 0; i < 120; i++) warpStep(field, 1 / 60);
        const endD = Math.hypot(field.warp.x - 700, field.warp.y - 400);
        // converges onto the node (critically damped → ~0 at settle).
        expect(endD).toBeLessThan(startD);
        expect(endD).toBeLessThan(1.0);
    });

    it("warpStep CHASES a moving target (re-reads the node each frame)", () => {
        const field = makeField([
            { x: 0, y: 300, vx: 0, vy: 0, r: 2, dim: false },
            { x: 700, y: 300, vx: 0, vy: 0, r: 2, dim: false },
        ]);
        field.warp.x = 100;
        field.warp.y = 300;
        setWarpTarget(field, 1); // chase node 1
        // move the target node each frame; the spring must track its LIVE pos.
        for (let i = 0; i < 200; i++) {
            field.nodes[1].x += 1; // drift the target right
            warpStep(field, 1 / 60);
        }
        // node 1 has moved to x=900; the spring TRACKS its live position with a
        // small steady-state lag (~10px, the critically-damped ramp-tracking lag
        // 2ζ/ω), NOT the frozen click-time x=700 (a frozen snapshot would settle
        // ~200px back at 700). The live-target tracking is what closes the
        // distance to the MOVING node.
        const finalTargetX = field.nodes[1].x;
        expect(finalTargetX).toBe(900);
        const lagToLive = Math.abs(field.warp.x - finalTargetX);
        expect(lagToLive).toBeLessThan(15); // tracks the live node (small lag)
        // and DRAMATICALLY closer to the live pos than to the frozen click pos.
        const distToFrozen = Math.abs(field.warp.x - 700);
        expect(lagToLive).toBeLessThan(distToFrozen);
    });

    it("warpStep is monotone-ish (spring-eased, NOT a single-frame snap)", () => {
        const field = makeField(stillNodes());
        field.warp.x = 100;
        field.warp.y = 100;
        warpTo(field, 690, 410); // target node 3 (700,400)
        const target = field.nodes[3];
        let prevD = Math.hypot(field.warp.x - target.x, field.warp.y - target.y);
        const firstD = prevD;
        let firstStepD = 0;
        for (let i = 0; i < 60; i++) {
            warpStep(field, 1 / 60);
            const d = Math.hypot(field.warp.x - target.x, field.warp.y - target.y);
            if (i === 0) firstStepD = firstD - d;
            prevD = d;
        }
        // the FIRST frame moves a SMALL fraction of the gap (not a snap to 0).
        expect(firstStepD).toBeGreaterThan(0);
        expect(firstStepD).toBeLessThan(firstD * 0.5);
    });

    it("warpStep clamps dt — a huge resume gap does not teleport the mark", () => {
        const field = makeField(stillNodes());
        field.warp.x = 100;
        field.warp.y = 100;
        warpTo(field, 690, 410); // target node 3
        const before = { x: field.warp.x, y: field.warp.y };
        const gap = Math.hypot(700 - before.x, 400 - before.y);
        // a 5-SECOND dt (a tab-resume gap) is CLAMPED to 50ms — one bounded step.
        // An UNCLAMPED 5s Euler step would explode (ω²·dt² ≫ 1 → numeric blowup,
        // |moved| ≫ gap). The clamp keeps a single step BOUNDED, short of the
        // target, and stable (no NaN, no teleport-past).
        warpStep(field, 5.0);
        const moved = Math.hypot(field.warp.x - before.x, field.warp.y - before.y);
        expect(Number.isFinite(field.warp.x)).toBe(true);
        expect(Number.isFinite(field.warp.y)).toBe(true);
        expect(moved).toBeGreaterThan(0);
        expect(moved).toBeLessThan(gap); // lands SHORT of the target, no overshoot
    });
});

describe("constellation refit + auto-drift wander (AY.W-CON1)", () => {
    /** A field seeded at a SMALL extent, ready for a re-fit to a larger box. */
    function seededField(w: number, h: number): ConstellationField {
        const field = makeField(seedField(mulberry32(0xa11ce), 24, w, h, 0.16), w, h);
        // center the warp like the component seeds it on first layout.
        field.warp.x = w / 2;
        field.warp.y = h / 2;
        return field;
    }

    it("refit-fills-box — proportional rescale doubles every node + the warp", () => {
        const field = seededField(640, 360);
        const before = field.nodes.map((p) => ({ x: p.x, y: p.y }));
        const warpBefore = { x: field.warp.x, y: field.warp.y };
        // grow the canvas 2× on each axis, then re-fit FROM the prior extent.
        field.w = 1280;
        field.h = 720;
        refitField(field, 640, 360);
        field.nodes.forEach((p, i) => {
            expect(p.x).toBeCloseTo(before[i].x * 2, 6);
            expect(p.y).toBeCloseTo(before[i].y * 2, 6);
        });
        expect(field.warp.x).toBeCloseTo(warpBefore.x * 2, 6);
        expect(field.warp.y).toBeCloseTo(warpBefore.y * 2, 6);
        // the re-fit lattice spans the new box (every node ≤ the new extent, and
        // the bbox reaches the far edges — the fills-box coverage the π gate reads).
        const xs = field.nodes.map((p) => p.x);
        const ys = field.nodes.map((p) => p.y);
        const bboxW = Math.max(...xs) - Math.min(...xs);
        const bboxH = Math.max(...ys) - Math.min(...ys);
        // the seed laid nodes across the OLD box; doubled, the bbox doubles too.
        expect(bboxW).toBeGreaterThan(field.w * 0.5);
        expect(bboxH).toBeGreaterThan(field.h * 0.5);
    });

    it("refit-conserves-velocity (the cool-down invariant — no heat-up)", () => {
        const field = seededField(640, 360);
        const vBefore = field.nodes.map((p) => ({ vx: p.vx, vy: p.vy }));
        field.w = 1920;
        field.h = 540; // a NON-uniform resize (sx ≠ sy) — velocities still untouched.
        refitField(field, 640, 360);
        field.nodes.forEach((p, i) => {
            expect(p.vx).toBe(vBefore[i].vx);
            expect(p.vy).toBe(vBefore[i].vy);
        });
    });

    it("refit-noop-first-layout + unchanged-dims leaves positions byte-identical", () => {
        const field = seededField(640, 360);
        const snap = field.nodes.map((p) => ({ x: p.x, y: p.y }));
        const warpSnap = { x: field.warp.x, y: field.warp.y };
        // first-layout (prev ≤ 0): the seed path owns it → no-op.
        refitField(field, 0, 0);
        // unchanged dims (prev === current): no-op.
        refitField(field, field.w, field.h);
        field.nodes.forEach((p, i) => {
            expect(p.x).toBe(snap[i].x);
            expect(p.y).toBe(snap[i].y);
        });
        expect(field.warp.x).toBe(warpSnap.x);
        expect(field.warp.y).toBe(warpSnap.y);
    });

    it("wander-arms-then-fires — nextAt arms on the first frame, then re-targets a different node", () => {
        const field = seededField(800, 600);
        // a SETTLED spring on node 0 so warpSettled is true (no in-flight warp).
        setWarpTarget(field, 0);
        field.warp.x = field.nodes[0].x;
        field.warp.y = field.nodes[0].y;
        field.warp.vx = 0;
        field.warp.vy = 0;
        const wander: ConstellationWander = { nextAt: -1, minIdle: 100, jitter: 0 };
        field.wander = wander;
        // deterministic picker rng (constant 0.5 → a stable eligible pick).
        const rng = () => 0.5;
        const focalAtSeed = field.focalIndex;
        // frame 1 (now = 1000): ARMS nextAt (no jump). minIdle 100, jitter 0 →
        // nextAt = 1100.
        stepField(field, 1, 0.16, null, 1 / 60, 1000, rng);
        expect(wander.nextAt).toBe(1100);
        expect(field.focalIndex).toBe(focalAtSeed); // no immediate jump on arm
        // re-settle the spring on its (unchanged) target before the cadence frame.
        field.warp.x = field.nodes[field.warp.targetIdx].x;
        field.warp.y = field.nodes[field.warp.targetIdx].y;
        field.warp.vx = 0;
        field.warp.vy = 0;
        // frame 2 (now = 1200 ≥ 1100, settled): FIRES → re-targets a different node.
        stepField(field, 1, 0.16, null, 1 / 60, 1200, rng);
        expect(field.focalIndex).not.toBe(focalAtSeed);
        expect(wander.nextAt).toBeGreaterThan(1200); // cadence re-armed
    });

    it("wander-yields-to-click — an in-flight warp (NOT settled) blocks the cadence", () => {
        const field = seededField(800, 600);
        // an ACTIVE in-flight warp: the focal is FAR from its target → not settled.
        setWarpTarget(field, 0);
        field.warp.x = field.nodes[0].x + 300; // 300px from the target → mid-flight
        field.warp.y = field.nodes[0].y + 300;
        field.warp.vx = 50;
        field.warp.vy = 50;
        expect(warpSettled(field)).toBe(false);
        const wander: ConstellationWander = { nextAt: 500, minIdle: 100, jitter: 0 };
        field.wander = wander;
        const focalBefore = field.focalIndex;
        // now ≥ nextAt BUT the spring is in flight → the cadence does NOT re-target.
        stepField(field, 1, 0.16, null, 1 / 60, 1000, () => 0.5);
        expect(field.focalIndex).toBe(focalBefore); // the click warp wins this frame
    });

    it("wander-picks-different-node — pickWanderTarget never returns the current focal", () => {
        const field = seededField(800, 600);
        // exhaustively sample the picker across the rng span for each focal slot.
        for (let focal = 0; focal < field.nodes.length; focal++) {
            field.focalIndex = focal;
            for (let s = 0; s < 50; s++) {
                const r = (s + 0.5) / 50; // a spread of rng values in [0,1)
                const picked = pickWanderTarget(field, () => r);
                expect(picked).not.toBe(focal);
                expect(picked).toBeGreaterThanOrEqual(0);
                expect(picked).toBeLessThan(field.nodes.length);
            }
        }
        // degenerate single-node field → returns the current focal (no crash).
        const single = makeField([{ x: 1, y: 1, vx: 0, vy: 0, r: 2, dim: false }]);
        single.focalIndex = 0;
        expect(pickWanderTarget(single, () => 0.5)).toBe(0);
    });

    it("default-OFF byte-identity — a wander-absent field steps identically across `now`", () => {
        // The default-path canary (§5 risk 3): adding the wander seam must not
        // perturb the existing default render. A field with NO wander produces an
        // identical node trace whether `now`/`rng` are supplied or omitted.
        const mk = () => makeField(seedField(mulberry32(7), 16, 800, 600, 0.16), 800, 600);
        const a = mk();
        const b = mk();
        // a: the legacy 5-arg call shape (no now/rng); b: the new 7-arg shape with
        // a rising `now` + a picker rng — BUT wander is absent, so the cadence
        // block is skipped and the traces MUST match byte-for-byte.
        for (let f = 0; f < 30; f++) {
            stepField(a, 1, 0.16, null, 1 / 60);
            stepField(b, 1, 0.16, null, 1 / 60, 1000 + f * 16, () => 0.37);
        }
        a.nodes.forEach((p, i) => {
            expect(p.x).toBe(b.nodes[i].x);
            expect(p.y).toBe(b.nodes[i].y);
            expect(p.vx).toBe(b.nodes[i].vx);
            expect(p.vy).toBe(b.nodes[i].vy);
        });
        expect(a.focalIndex).toBe(b.focalIndex);
    });
});
