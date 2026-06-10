// AX.W17 — proof:constellation-warp-live, the π-lane focal-warp render
// observation (the INTERACTION gate). Mirrors the AX.W15 blob
// pointer-centroid-shift gate: a REAL device render + per-frame position
// readback, NOT a grep for a source string.
//
// The CPU-oracle blindspot the W01 lesson named: the warp unit tests + typecheck
// ALL pass while the live spring could SNAP (a runtime-measurement bug). So this
// spec mounts the REAL <Constellation warpOnClick> on a real device, dispatches a
// synthetic warp at a known canvas point, and samples the ENGINE-OWNED focal
// position (`field.warp.{x,y}`) over the settle window. The demo story exposes
// the live field + the imperative warpTo on `window.__constellationWarp` (a
// demo-private test seam) — the spec reads that handle per rAF (a runtime
// observation off the live engine, the same shape as the dock spec reading
// `--dock-morph-t` off the DOM).
//
// ASSERTS (born-RED at HEAD — no focal/warp seam exists, so the handle is absent
// and the assertion cannot run):
//   (a) MIGRATE-TOWARD-CLICK  — the focal centroid moves toward the click region
//                               (the end position is closer to the click than the
//                               start position was).
//   (b) CONVERGE-ONTO-NODE    — at settle the focal sits ON an existing node
//                               (min-d² to any node → ~0; the identity-ride).
//   (c) CHASE-LIVE-TARGET     — the target node DRIFTS during the settle, and the
//                               focal arrives near its LIVE (moved) position, not
//                               its frozen click-time snapshot.
//   (d) SPRING-EASED-NOT-SNAP — a monotone-ish approach over ≥5 rising-progress
//                               frames; the FIRST frame moves only a small fraction
//                               of the gap (NOT a single-frame snap).

import { test, expect } from "@playwright/test";
// Resolve the constellation scene off the W00 manifest re-source (the anti-drift
// source-of-truth) WITHOUT editing W00's `PI_TARGETS` — `resolveScene` is the
// public seam W17 composes (it ADDS a sibling gate, it does not edit W00's
// members). A manifest rename FAILS the resolution rather than driving a dead route.
import { resolveScene } from "./pi-manifest.ts";

const CONSTELLATION = resolveScene("substrates", "constellation");

const FRAME_MS = 1000 / 60;
const SETTLE_MS = 1800; // the spring (response 0.55s, ζ 1.0) settles well inside this
const MIN_RISING_FRAMES = 5; // a spring-eased path rises over many frames, not 1
const CONVERGE_PX = 6; // "on the node" tolerance at settle (canvas-local px)

interface WarpSample {
    /** the click point in canvas-local px */
    clickX: number;
    clickY: number;
    /** focal position frames (engine-owned warp.{x,y}) */
    fx: number[];
    fy: number[];
    /** the chosen target node index + its LIVE per-frame position */
    targetIdx: number;
    tx: number[];
    ty: number[];
    /** the target node's frozen click-time position (for the chase assert) */
    frozenTx: number;
    frozenTy: number;
    /** min-d² from the FINAL focal to ANY node (the converge-onto-node metric) */
    finalMinDistToAnyNode: number;
    handlePresent: boolean;
}

test.setTimeout(120_000);

test.describe("constellation-warp-live (π lane — fail-CLOSED)", () => {
    test("a click warps the focal to the nearest node on a spring-eased path", async ({
        page,
    }) => {
        await page.goto(CONSTELLATION.path);
        // The warp section's canvas — targeted via the host `data-testid`
        // (AY.W-DOCK-CHROME §4): the StoryHero mounts a constellation BACKGROUND canvas
        // at index 0 for this hero route, so the prior `nth(1)` index pointed at the
        // WRONG canvas → the warp field never seeded ("warpTo returned no target node"
        // + timeout). The demo exposes the live field on window.__constellationWarp.
        const warpCanvas = page
            .locator('[data-testid="constellation-warp-host"] canvas.constellation-canvas')
            .first();
        await warpCanvas.waitFor({ state: "visible", timeout: 20_000 });
        // The warp section is BELOW the fold; the substrate PARKS an offscreen
        // (`content-visibility:auto`) surface, so the field never seeds until the
        // canvas scrolls into view + un-parks. Scroll FIRST, then poll for the
        // seeded field (w/h sized, nodes laid out + the warp centered on layout).
        await warpCanvas.scrollIntoViewIfNeeded();
        await page.waitForFunction(
            () => {
                const w = (window as unknown as Record<string, unknown>)
                    .__constellationWarp as { field?: { nodes: unknown[]; w: number } } | undefined;
                return !!w?.field && w.field.nodes.length > 0 && w.field.w > 0;
            },
            { timeout: 15_000 },
        );

        const box = await warpCanvas.boundingBox();
        expect(box, "the warp canvas has no bounding box").not.toBeNull();
        const b = box!;
        // Click near a corner so the click region is unambiguously OFF center
        // (the warp seeds the focal at field-center, so a corner click forces a
        // clear migration vector).
        const clickClientX = b.x + b.width * 0.78;
        const clickClientY = b.y + b.height * 0.24;

        const sample: WarpSample = await page.evaluate(
            async ({ cx, cy, settleMs }) => {
                const w = (window as unknown as Record<string, unknown>)
                    .__constellationWarp as
                    | {
                          field?: {
                              nodes: { x: number; y: number }[];
                              w: number;
                              h: number;
                              focalIndex: number;
                              warp: { x: number; y: number; targetIdx: number };
                          };
                          warpTo?: (
                              a: { x: number; y: number } | number,
                              b?: number,
                          ) => number;
                      }
                    | undefined;
                if (!w || !w.field || !w.warpTo) {
                    return {
                        clickX: 0,
                        clickY: 0,
                        fx: [],
                        fy: [],
                        targetIdx: -1,
                        tx: [],
                        ty: [],
                        frozenTx: 0,
                        frozenTy: 0,
                        finalMinDistToAnyNode: Infinity,
                        handlePresent: false,
                    };
                }
                const field = w.field;
                // map the client click to canvas-local px (the same toLocal the
                // component uses) so the recorded clickX/Y are in field space.
                const canvas = document.querySelector(
                    '[data-testid="constellation-warp-host"] canvas.constellation-canvas',
                ) as HTMLCanvasElement;
                const r = canvas.getBoundingClientRect();
                const localX = ((cx - r.left) / r.width) * field.w;
                const localY = ((cy - r.top) / r.height) * field.h;

                // FIRE the warp (the sugar's client→local mapping is exercised by
                // passing client coords to the exposed warpTo).
                const idx = w.warpTo(cx, cy);
                const frozenTx = field.nodes[idx]?.x ?? 0;
                const frozenTy = field.nodes[idx]?.y ?? 0;

                const fx: number[] = [];
                const fy: number[] = [];
                const tx: number[] = [];
                const ty: number[] = [];
                return await new Promise<WarpSample>((resolve) => {
                    const t0 = performance.now();
                    const f = () => {
                        fx.push(field.warp.x);
                        fy.push(field.warp.y);
                        const tn = field.nodes[field.warp.targetIdx];
                        tx.push(tn?.x ?? 0);
                        ty.push(tn?.y ?? 0);
                        if (performance.now() - t0 < settleMs) {
                            requestAnimationFrame(f);
                        } else {
                            // final min-d² from the focal to ANY node.
                            let best = Infinity;
                            for (const n of field.nodes) {
                                const dx = n.x - field.warp.x;
                                const dy = n.y - field.warp.y;
                                const d = Math.hypot(dx, dy);
                                if (d < best) best = d;
                            }
                            resolve({
                                clickX: localX,
                                clickY: localY,
                                fx,
                                fy,
                                targetIdx: idx,
                                tx,
                                ty,
                                frozenTx,
                                frozenTy,
                                finalMinDistToAnyNode: best,
                                handlePresent: true,
                            });
                        }
                    };
                    requestAnimationFrame(f);
                });
            },
            { cx: clickClientX, cy: clickClientY, settleMs: SETTLE_MS },
        );

        // The handle MUST be present — its absence is the born-RED state (no
        // focal/warp seam → nothing to sample). A fail-CLOSED RED, not a skip.
        expect(
            sample.handlePresent,
            "window.__constellationWarp is absent — the focal/warp seam did not mount (born-RED: no seam to sample)",
        ).toBe(true);
        expect(sample.fx.length, "no focal frames were sampled").toBeGreaterThan(
            MIN_RISING_FRAMES,
        );
        expect(sample.targetIdx, "warpTo returned no target node").toBeGreaterThanOrEqual(
            0,
        );

        const n = sample.fx.length;
        const startX = sample.fx[0]!;
        const startY = sample.fy[0]!;
        const endX = sample.fx[n - 1]!;
        const endY = sample.fy[n - 1]!;

        // (a) MIGRATE-TOWARD-CLICK — the focal ends closer to the click than it
        // started (the centroid migrated toward the click region).
        const startToClick = Math.hypot(startX - sample.clickX, startY - sample.clickY);
        const endToClick = Math.hypot(endX - sample.clickX, endY - sample.clickY);
        expect(
            endToClick,
            `the focal did NOT migrate toward the click: start dist ${startToClick.toFixed(1)}px → end dist ${endToClick.toFixed(1)}px (the warp did not move the focal toward the click region)`,
        ).toBeLessThan(startToClick);

        // (b) CONVERGE-ONTO-NODE — at settle the focal sits ON an existing node
        // (the identity-ride arrival; min-d² → ~0).
        expect(
            sample.finalMinDistToAnyNode,
            `the focal did NOT converge onto a node: final min-dist-to-any-node ${sample.finalMinDistToAnyNode.toFixed(1)}px (> ${CONVERGE_PX}px) — it landed in empty space, not on a node`,
        ).toBeLessThan(CONVERGE_PX);

        // (c) CHASE-LIVE-TARGET — the target node DRIFTED during the settle, and
        // the focal arrived near its LIVE (moved) position, NOT the frozen
        // click-time snapshot. (If the target barely moved, the test still holds —
        // the focal is near the live pos either way; the discriminating case is
        // when it moved, where a frozen-snapshot impl would land at the old spot.)
        const liveTx = sample.tx[n - 1]!;
        const liveTy = sample.ty[n - 1]!;
        const targetDrift = Math.hypot(liveTx - sample.frozenTx, liveTy - sample.frozenTy);
        const endToLive = Math.hypot(endX - liveTx, endY - liveTy);
        const endToFrozen = Math.hypot(endX - sample.frozenTx, endY - sample.frozenTy);
        expect(
            endToLive,
            `the focal did not arrive on the LIVE target node (end-to-live ${endToLive.toFixed(1)}px > ${CONVERGE_PX}px; the node drifted ${targetDrift.toFixed(1)}px during settle)`,
        ).toBeLessThan(CONVERGE_PX);
        // If the node drifted appreciably, the focal must be MUCH closer to the
        // live pos than the frozen snapshot (the chase, not a frozen snapshot).
        if (targetDrift > CONVERGE_PX) {
            expect(
                endToLive,
                `the focal tracked the FROZEN snapshot, not the live target (end-to-live ${endToLive.toFixed(1)}px vs end-to-frozen ${endToFrozen.toFixed(1)}px; the node drifted ${targetDrift.toFixed(1)}px)`,
            ).toBeLessThan(endToFrozen);
        }

        // (d) SPRING-EASED-NOT-SNAP — the focal's distance-to-target DECREASES
        // over ≥5 rising-progress frames (a monotone-ish spring approach), and the
        // FIRST frame moves only a small fraction of the gap (NOT a 1-frame snap).
        const distToFinal: number[] = sample.fx.map((x, i) =>
            Math.hypot(x - endX, sample.fy[i]! - endY),
        );
        // count frames where the focal got CLOSER to its final position.
        let closingFrames = 0;
        for (let i = 1; i < distToFinal.length; i++) {
            if (distToFinal[i]! < distToFinal[i - 1]! - 0.01) closingFrames++;
        }
        expect(
            closingFrames,
            `the focal approached over only ${closingFrames} closing frame(s) (< ${MIN_RISING_FRAMES}) — a single-frame SNAP, not a spring-eased path`,
        ).toBeGreaterThanOrEqual(MIN_RISING_FRAMES);
        // the first frame's progress is a SMALL fraction of the whole gap (a snap
        // would close ~all of it in frame 1).
        const totalGap = distToFinal[0]!;
        const firstStep = totalGap - distToFinal[1]!;
        expect(
            firstStep,
            `the focal snapped ${((firstStep / totalGap) * 100).toFixed(0)}% of the gap in ONE frame — a snap, not a spring`,
        ).toBeLessThan(totalGap * 0.6);
    });
});
