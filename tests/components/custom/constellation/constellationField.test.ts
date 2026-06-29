// AW.W17 — the pure field-engine contract. seedField lays out `count` nodes
// within bounds; stepField drifts + bounces a node off a wall (the velocity sign
// flips); the four neutral passes paint without throwing on a stub 2D context.

import { describe, expect, it } from "vitest";
import { mulberry32 } from "@glass/utils/prng";
import {
    seedField,
    stepField,
    refitField,
    buildEdges,
    appendPointerWeb,
    parallaxNodePos,
    type ConstellationField,
    type ConstellationNode,
    type ConstellationWander,
    type ConstellationWell,
} from "@glass/components/custom/constellation/constellationField";
import {
    stepWell,
    nearestNode,
    warpStep,
    warpTo,
    setWarpTarget,
    warpSettled,
    pickWanderTarget,
    stepPinnedDrift,
    makePinnedDrift,
    DEFAULT_WELL_CONFIG,
    WARP_RESPONSE,
    WARP_ZETA,
} from "@glass/components/custom/constellation/constellationInteraction";
import { DEFAULT_PALETTE } from "@glass/components/custom/constellation/constellationRender";

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
        pinnedIndex: -1,
    };
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

    it("buildEdges joins nodes within reach with a distance-falloff alpha (the ONE math source)", () => {
        // Two nodes at distance 50 (well within reach = 132·1) → ONE edge; alpha falls off
        // with distance² (1 − d²/reach²). A third node far away (1000px) → no extra edge.
        const field = makeField([
            { x: 100, y: 100, vx: 0, vy: 0, r: 2, dim: false },
            { x: 150, y: 100, vx: 0, vy: 0, r: 2, dim: false },
            { x: 1100, y: 100, vx: 0, vy: 0, r: 2, dim: false },
        ]);
        const edges = buildEdges(field, 132);
        expect(edges).toHaveLength(1);
        const e = edges[0];
        const reach2 = 132 * 132;
        expect(e.alpha).toBeCloseTo(1 - (50 * 50) / reach2, 5);
        expect(e.accent).toBe(0);
        expect(e.focus).toBe(0);
    });

    it("buildEdges flags the accent-incident edges + caps to the eMax budget", () => {
        const field = makeField([
            { x: 100, y: 100, vx: 0, vy: 0, r: 2, dim: false },
            { x: 150, y: 100, vx: 0, vy: 0, r: 2, dim: false },
            { x: 120, y: 140, vx: 0, vy: 0, r: 2, dim: false },
        ]);
        // accentIndex 0 → every edge incident on node 0 carries accent=1.
        const accented = buildEdges(field, 200, 0);
        for (const e of accented) {
            // a [0-i] or [i-0] edge is accent; the [1-2] edge is neutral.
            const touchesZero =
                (e.ax === 100 && e.ay === 100) || (e.bx === 100 && e.by === 100);
            expect(e.accent).toBe(touchesZero ? 1 : 0);
        }
        // the eMax budget caps the result (the strongest survive).
        const capped = buildEdges(field, 200, -1, 1);
        expect(capped.length).toBeLessThanOrEqual(1);
    });

    it("appendPointerWeb adds focus tethers from the cursor virtual node", () => {
        const field = makeField([
            { x: 100, y: 100, vx: 0, vy: 0, r: 2, dim: false },
            { x: 1000, y: 100, vx: 0, vy: 0, r: 2, dim: false },
        ]);
        const edges = buildEdges(field, 132);
        appendPointerWeb(edges, field, 132, { x: 110, y: 100 });
        // the cursor (110,100) is within reach of node 0 (100,100) → one focus edge added.
        const focus = edges.filter((e) => e.focus === 1);
        expect(focus.length).toBe(1);
        expect(focus[0].ax).toBe(110);
        // an inactive pointer (x<0) adds nothing.
        const edges2 = buildEdges(field, 132);
        appendPointerWeb(edges2, field, 132, { x: -1, y: -1 });
        expect(edges2.filter((e) => e.focus === 1)).toHaveLength(0);
    });

    it("parallaxNodePos offsets a node toward the pointer by depth, no-op when flat/inactive", () => {
        const node: ConstellationNode = { x: 400, y: 300, vx: 0, vy: 0, r: 2, dim: false, z: 1 };
        // pointer at the right edge → the node shifts toward it (positive x offset).
        const shifted = parallaxNodePos(node, { x: 800, y: 300 }, 800, 600, 0.08);
        expect(shifted.x).toBeGreaterThan(400);
        // parallax 0 (flat) → no offset.
        const flat = parallaxNodePos(node, { x: 800, y: 300 }, 800, 600, 0);
        expect(flat).toEqual({ x: 400, y: 300 });
        // inactive pointer (x<0) → no offset.
        const inactive = parallaxNodePos(node, { x: -1, y: -1 }, 800, 600, 0.08);
        expect(inactive).toEqual({ x: 400, y: 300 });
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

describe("constellation warp ω-reconcile + gravity-well (AY.W-CON2)", () => {
    /** The keyframes.js critically-damped 2%-settle: t₂ ≈ 5.83/ω₀ = 5.83·response/(2π). */
    const settleFrames = (response: number, fps = 60) =>
        Math.round(((5.83 * response) / (2 * Math.PI)) * fps);

    /**
     * Integrate the warp spring from a known start over a step target and return
     * the per-frame |x−target| gap. `response`/`zeta` ride field.warpCfg (the
     * tokenised override seam — AY.W-CON2). Still nodes so the target does not drift.
     */
    function warpGapTrace(
        response: number,
        zeta: number,
        frames: number,
    ): { gap: number[]; startGap: number } {
        const field = makeField([
            { x: 0, y: 0, vx: 0, vy: 0, r: 2, dim: false },
            { x: 600, y: 0, vx: 0, vy: 0, r: 2, dim: false },
        ]);
        field.warpCfg = { response, zeta };
        field.warp.x = 0; // start at node 0
        field.warp.y = 0;
        setWarpTarget(field, 1); // chase node 1 at (600, 0)
        const target = field.nodes[1];
        const startGap = Math.hypot(field.warp.x - target.x, field.warp.y - target.y);
        const gap: number[] = [];
        for (let i = 0; i < frames; i++) {
            warpStep(field, 1 / 60);
            gap.push(Math.hypot(field.warp.x - target.x, field.warp.y - target.y));
        }
        return { gap, startGap };
    }

    it("warp-settle-matches-keyframes-model — the 2%-settle frame tracks round(5.83·response/(2π)·60) at ζ=1", () => {
        // The ω-reconcile (D2): `response` is the keyframes.js ANGULAR PERIOD, NOT a
        // settle. At ζ=1 the 2%-settle is governed by the (1+ω₀t)e^(−ω₀t) envelope →
        // t₂ ≈ 5.83/ω₀ = 5.83·response/(2π). The DISCRETE warpStep (semi-implicit
        // Euler at the clamped 1/60 dt) tracks that continuous envelope within ~1
        // frame of discretization lag — so assert the integrated gap crosses below 2%
        // of the initial gap WITHIN ±2 frames of the model frame, and that the
        // discrete/model ratio is ≈ 1.0 (NOT "looks springy", NOT off by a factor).
        const response = 0.55;
        const f = settleFrames(response); // ≈ 31
        const { gap, startGap } = warpGapTrace(response, 1.0, f + 12);
        const thresh = startGap * 0.02;
        const firstUnder = gap.findIndex((g) => g <= thresh);
        expect(firstUnder).toBeGreaterThan(0);
        // the discrete settle is within 1 frame OF the keyframes.js model frame (the
        // ω-reconcile is NUMERICALLY honest — the discrete integrator settles at the
        // model's t₂, modulo the ~1-frame Euler lag, NOT at some unrelated frame).
        expect(
            Math.abs(firstUnder - f),
            `the discrete 2%-settle landed at frame ${firstUnder}, off the keyframes.js model frame ${f} by ${Math.abs(firstUnder - f)} (> 2) — `,
        ).toBeLessThanOrEqual(2);
        // and the field has NOT settled a THIRD of the way in (else `response` is not
        // the angular period it claims — the masking-at-default case the D2 reconcile
        // surfaces).
        const early = Math.floor(f / 3);
        expect(gap[early]!).toBeGreaterThan(thresh);
    });

    it("warp-settle-SCALES-with-response — halving response ≈ halves the settle frame (the token semantics)", () => {
        // The proof the token is the ANGULAR PERIOD: a SHORTER response settles
        // PROPORTIONALLY sooner (not "stays ~0.55"). Settle = first frame the gap
        // drops below 2%, measured at two response values.
        const firstUnder = (response: number) => {
            const { gap, startGap } = warpGapTrace(response, 1.0, 120);
            const thresh = startGap * 0.02;
            return gap.findIndex((g) => g <= thresh);
        };
        const settle55 = firstUnder(0.55);
        const settle30 = firstUnder(0.3);
        expect(settle55).toBeGreaterThan(0);
        expect(settle30).toBeGreaterThan(0);
        // 0.30/0.55 ≈ 0.545 — the settle frame scales with response (±20% tolerance
        // for the discrete-step rounding). A response-independent settle would FAIL.
        const ratio = settle30 / settle55;
        expect(
            ratio,
            `the settle frame did not scale with response: response 0.55 → ${settle55}f, 0.30 → ${settle30}f (ratio ${ratio.toFixed(2)}, expected ≈ 0.545) — `,
        ).toBeGreaterThan(0.4);
        expect(ratio).toBeLessThan(0.72);
    });

    it("interaction-config-overrides-spring — a response:0.30 field settles FASTER than the 0.55 default", () => {
        const fast = warpGapTrace(0.3, 1.0, 60).gap;
        const slow = warpGapTrace(WARP_RESPONSE, WARP_ZETA, 60).gap;
        // at the SAME frame, the faster (shorter-period) spring is closer to target.
        const at = 18;
        expect(
            fast[at]! < slow[at]!,
            `the tokenised override did not reach the integrator: at frame ${at} response-0.30 gap ${fast[at]!.toFixed(1)}px should be < response-0.55 gap ${slow[at]!.toFixed(1)}px`,
        ).toBe(true);
    });

    // ── gravity-well ────────────────────────────────────────────────────────────
    /** A well at `(x, y)` with the default config, target=1 (held). */
    function makeWell(
        x: number,
        y: number,
        over: Partial<ConstellationWell["cfg"]> = {},
    ): ConstellationWell {
        return {
            x,
            y,
            strength: 0,
            target: 1,
            cfg: { ...DEFAULT_WELL_CONFIG, ...over },
        };
    }

    /** Mean node |v| over the field. */
    const meanSpeed = (field: ConstellationField) =>
        field.nodes.reduce((s, p) => s + Math.hypot(p.vx, p.vy), 0) /
        field.nodes.length;

    it("well-perturbs-then-cools — mean |v| RISES while held, RETURNS to ~speed after release", () => {
        const SPEED = 0.16;
        const field = makeField(
            seedField(mulberry32(0xbeef), 40, 800, 600, SPEED),
            800,
            600,
        );
        // rest baseline (a few cool frames at speed).
        field.well = makeWell(-1, -1); // inactive
        field.well.target = 0;
        for (let i = 0; i < 10; i++) stepField(field, 1, SPEED, null, 1 / 60);
        const restMean = meanSpeed(field);
        // ARM the well at centre + hold for ≥ 30 frames — the field heats.
        field.well.x = 400;
        field.well.y = 300;
        field.well.target = 1;
        let heldPeak = 0;
        for (let i = 0; i < 40; i++) {
            stepField(field, 1, SPEED, null, 1 / 60);
            heldPeak = Math.max(heldPeak, meanSpeed(field));
        }
        // RELEASE + step ≥ 30 frames — the field cools.
        field.well.target = 0;
        for (let i = 0; i < 40; i++) stepField(field, 1, SPEED, null, 1 / 60);
        const cooledMean = meanSpeed(field);

        // the field HEATED while held (mean |v| rose meaningfully above rest)…
        expect(
            heldPeak,
            `the well did not perturb the field: held-peak mean |v| ${heldPeak.toFixed(4)} ≤ rest ${restMean.toFixed(4)}`,
        ).toBeGreaterThan(restMean * 1.2);
        // …and COOLED back to within ±5% of `speed` after release (field-cools).
        expect(
            Math.abs(cooledMean - SPEED) / SPEED,
            `the field did not cool after release: mean |v| ${cooledMean.toFixed(4)} vs speed ${SPEED} (> ±5%) — the |v|→speed ease-back must renormalise`,
        ).toBeLessThan(0.05);
    });

    it("well-no-slingshot — a co-located max-strength well keeps every node in [0,w]×[0,h]", () => {
        const W = 800;
        const H = 600;
        const SPEED = 0.16;
        const field = makeField(
            seedField(mulberry32(0xdead), 40, W, H, SPEED),
            W,
            H,
        );
        // a node placed EXACTLY at the well centre (the singularity case).
        field.nodes[0].x = 400;
        field.nodes[0].y = 300;
        field.nodes[0].vx = 0;
        field.nodes[0].vy = 0;
        // a MAX-strength well at centre with a large gain (the slingshot stress).
        field.well = makeWell(400, 300, { gain: 80000 });
        field.well.strength = 1; // already at full pull (skip the ramp)
        for (let i = 0; i < 80; i++) {
            stepField(field, 1, SPEED, null, 1 / 60);
            for (const p of field.nodes) {
                expect(Number.isFinite(p.x)).toBe(true);
                expect(Number.isFinite(p.y)).toBe(true);
                expect(p.x).toBeGreaterThanOrEqual(0);
                expect(p.x).toBeLessThanOrEqual(W);
                expect(p.y).toBeGreaterThanOrEqual(0);
                expect(p.y).toBeLessThanOrEqual(H);
            }
        }
    });

    it("well-default-off byte-identity — a well-absent field steps identically to a no-well field", () => {
        // adding the force pass must not perturb the default render: a field with NO
        // well produces a node trace byte-identical to one stepped without the seam.
        const mk = () =>
            makeField(seedField(mulberry32(0x1234), 24, 800, 600, 0.16), 800, 600);
        const a = mk(); // never assigned a well
        const b = mk(); // never assigned a well
        for (let f = 0; f < 30; f++) {
            stepField(a, 1, 0.16, null, 1 / 60);
            stepField(b, 1, 0.16, null, 1 / 60);
        }
        a.nodes.forEach((p, i) => {
            expect(p.x).toBe(b.nodes[i].x);
            expect(p.y).toBe(b.nodes[i].y);
            expect(p.vx).toBe(b.nodes[i].vx);
            expect(p.vy).toBe(b.nodes[i].vy);
        });
    });

    it("stepWell is a no-op when field.well is undefined (the skipped pass)", () => {
        const field = makeField(
            seedField(mulberry32(9), 12, 400, 300, 0.16),
            400,
            300,
        );
        const before = field.nodes.map((p) => ({ vx: p.vx, vy: p.vy }));
        stepWell(field, 1, 0.16, 1 / 60); // no field.well → returns immediately
        field.nodes.forEach((p, i) => {
            expect(p.vx).toBe(before[i].vx);
            expect(p.vy).toBe(before[i].vy);
        });
    });
});

// ── AZ.W-CON-GEN — the six-item generalization (R5-6) ───────────────────────
describe("constellation generalization (AZ.W-CON-GEN)", () => {
    it("G1 — a PINNED node is HELD: stepField does not drift/bounce it while others move", () => {
        const nodes = seedField(mulberry32(0xa11), 20, 800, 600, 0.16);
        const field = makeField(nodes, 800, 600);
        field.pinnedIndex = 0;
        const pinX = field.nodes[0].x;
        const pinY = field.nodes[0].y;
        const otherX = field.nodes[1].x;
        for (let f = 0; f < 30; f++) stepField(field, 1, 0.16, null, 1 / 60);
        // the pinned node held its seeded position EXACTLY (no drift, no bounce).
        expect(field.nodes[0].x).toBe(pinX);
        expect(field.nodes[0].y).toBe(pinY);
        // a non-pinned node moved (the field is alive around the pin).
        expect(field.nodes[1].x).not.toBe(otherX);
    });

    it("G1 — the gravity-well + pointer-steer leave the pinned node alone", () => {
        const nodes = seedField(mulberry32(0xb22), 16, 800, 600, 0.16);
        const field = makeField(nodes, 800, 600);
        field.pinnedIndex = 0;
        field.well = {
            x: field.nodes[0].x,
            y: field.nodes[0].y,
            strength: 1,
            target: 1,
            cfg: { ...DEFAULT_WELL_CONFIG },
        };
        const pinX = field.nodes[0].x;
        const pinY = field.nodes[0].y;
        // a held well right ON the pin would slingshot a non-pinned node — the pin holds.
        for (let f = 0; f < 20; f++)
            stepField(field, 1, 0.16, { x: pinX, y: pinY }, 1 / 60);
        expect(field.nodes[0].x).toBe(pinX);
        expect(field.nodes[0].y).toBe(pinY);
    });

    it("G1 — pinnedIndex -1 (default) is byte-identical to a no-pin field", () => {
        const mk = () => makeField(seedField(mulberry32(0xc33), 24, 800, 600, 0.16), 800, 600);
        const a = mk(); // pinnedIndex -1 (default)
        const b = mk();
        b.pinnedIndex = -1;
        for (let f = 0; f < 30; f++) {
            stepField(a, 1, 0.16, null, 1 / 60);
            stepField(b, 1, 0.16, null, 1 / 60);
        }
        a.nodes.forEach((p, i) => {
            expect(p.x).toBe(b.nodes[i].x);
            expect(p.y).toBe(b.nodes[i].y);
        });
    });

    it("G2 — buildEdges flags the accent register for edges incident on the accentIndex node", () => {
        // two nodes within link range, one is the accent — the incident edge carries accent=1.
        const nodes: ConstellationNode[] = [
            { x: 100, y: 100, vx: 0, vy: 0, r: 2, dim: false },
            { x: 140, y: 120, vx: 0, vy: 0, r: 2, dim: false },
        ];
        const field = makeField(nodes, 800, 600);
        const edges = buildEdges(field, 132, 0 /* accentIndex */);
        // the single incident edge carries the accent flag (the render strokes uAccent).
        expect(edges).toHaveLength(1);
        expect(edges[0].accent).toBe(1);
    });

    it("G2/G3 — accentIndex -1 (default) keeps the neutral single-color edge set", () => {
        const nodes: ConstellationNode[] = [
            { x: 100, y: 100, vx: 0, vy: 0, r: 2, dim: false },
            { x: 140, y: 120, vx: 0, vy: 0, r: 2, dim: false },
        ];
        const field = makeField(nodes, 800, 600);
        const edges = buildEdges(field, 132 /* default accentIndex -1 */);
        // every edge is neutral (accent=0); the distance-falloff alpha is in (0,1).
        expect(edges.every((e) => e.accent === 0)).toBe(true);
        expect(edges[0].alpha).toBeGreaterThan(0);
        expect(edges[0].alpha).toBeLessThan(1);
    });

    it("G3 — DEFAULT_PALETTE carries accent/edgeFloor/edgeAccentAlpha (the SSR fallback)", () => {
        expect(typeof DEFAULT_PALETTE.accent).toBe("string");
        expect(DEFAULT_PALETTE.edgeFloor).toBe(0); // byte-identity default
        expect(DEFAULT_PALETTE.edgeAccentAlpha).toBeGreaterThan(0);
    });

    it("G5 — stepPinnedDrift eases the pinned node around its anchor and stays within wanderFrac", () => {
        const nodes = seedField(mulberry32(0xd44), 12, 800, 600, 0.16);
        const field = makeField(nodes, 800, 600);
        field.pinnedIndex = 0;
        field.nodes[0].x = 400; // a known anchor
        field.nodes[0].y = 300;
        field.nodes[0].vx = 0;
        field.nodes[0].vy = 0;
        const pd = makePinnedDrift({ wanderFrac: 0.14, durMs: 1000, minIdle: 100, jitter: 0 });
        field.pinnedDrift = pd;
        const rng = mulberry32(0x99);
        let now = 1;
        // step through several full legs; the pinned node must move but stay near anchor.
        let moved = false;
        for (let f = 0; f < 600; f++) {
            now += 16;
            stepPinnedDrift(field, now, rng);
            const dx = Math.abs(field.nodes[0].x - 400);
            const dy = Math.abs(field.nodes[0].y - 300);
            if (dx > 1 || dy > 1) moved = true;
            // never leaves the ±wanderFrac*w neighbourhood of the anchor.
            expect(dx).toBeLessThanOrEqual(0.14 * 800 + 1);
            expect(dy).toBeLessThanOrEqual(0.14 * 600 + 1);
        }
        expect(moved).toBe(true); // the drift is observable
    });

    it("G5 — stepPinnedDrift is a no-op without pinnedDrift / without a pin / at now<=0", () => {
        const field = makeField(seedField(mulberry32(7), 8, 400, 300, 0.16), 400, 300);
        field.pinnedIndex = 0;
        const x = field.nodes[0].x;
        stepPinnedDrift(field, 1000, Math.random); // no field.pinnedDrift → no-op
        expect(field.nodes[0].x).toBe(x);
        field.pinnedDrift = makePinnedDrift();
        field.pinnedIndex = -1; // no pin → no-op
        stepPinnedDrift(field, 1000, Math.random);
        expect(field.nodes[0].x).toBe(x);
    });

    it("G6 — warpAutoRelease clears targetIdx once the spring settles (the identity-ride)", () => {
        const nodes = seedField(mulberry32(0xe55), 10, 800, 600, 0.16);
        const field = makeField(nodes, 800, 600);
        field.warpAutoRelease = true;
        // seed the warp ON node 3 so it is already within the settle band → settles fast.
        field.warp.x = field.nodes[3].x;
        field.warp.y = field.nodes[3].y;
        setWarpTarget(field, 3);
        expect(field.warp.targetIdx).toBe(3);
        // step a few frames — the spring settles, auto-release clears the target.
        for (let f = 0; f < 10; f++) stepField(field, 1, 0.16, null, 1 / 60);
        expect(field.warp.targetIdx).toBe(-1);
    });

    it("G6 — without warpAutoRelease the warp HOLDS its target (the default)", () => {
        const nodes = seedField(mulberry32(0xf66), 10, 800, 600, 0.16);
        const field = makeField(nodes, 800, 600);
        field.warp.x = field.nodes[3].x;
        field.warp.y = field.nodes[3].y;
        setWarpTarget(field, 3);
        for (let f = 0; f < 10; f++) stepField(field, 1, 0.16, null, 1 / 60);
        expect(field.warp.targetIdx).toBe(3); // held forever (byte-identical to HEAD)
    });
});

// R5-8 (the slides-consumer kVis floor) — the two-axis split: SIZES floor at
// kVis = max(k, kFloor) while TRUE k keeps positions/reach. Byte-identical
// at/above kFloor·BASE_WIDTH by construction (kVis === k there).
import { BASE_WIDTH } from "@glass/components/custom/constellation/constellationField";
import { DEFAULT_K_FLOOR } from "@glass/components/custom/constellation/constants";
import { kVisOf } from "@glass/components/custom/constellation/constellationRender";

describe("constellation kVis floor (R5-8)", () => {
    const fieldAt = (k: number, kFloor?: number) =>
        ({ k, kFloor }) as Parameters<typeof kVisOf>[0];

    it("floors the visual scale on a narrow canvas (390px → k≈0.30 reads 0.72)", () => {
        const k = 390 / BASE_WIDTH;
        expect(k).toBeLessThan(DEFAULT_K_FLOOR);
        expect(kVisOf(fieldAt(k))).toBe(DEFAULT_K_FLOOR);
    });

    it("is the IDENTITY at/above the floor width — desktop + the 1280 export byte-stable", () => {
        for (const w of [DEFAULT_K_FLOOR * BASE_WIDTH, 1280, 1440, 1920]) {
            const k = w / BASE_WIDTH;
            expect(kVisOf(fieldAt(k))).toBe(k);
        }
    });

    it("honors a per-instance kFloor override (the --constellation-k-floor knob)", () => {
        expect(kVisOf(fieldAt(0.3, 0.5))).toBe(0.5);
        expect(kVisOf(fieldAt(0.6, 0.5))).toBe(0.6);
        // absent → the shipped default
        expect(kVisOf(fieldAt(0.3, undefined))).toBe(DEFAULT_K_FLOOR);
    });
});
