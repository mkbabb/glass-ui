// AZ.W-CON-GEN — proof:constellation-gen-live, the π-lane generalization render
// observation. Mirrors the AY.W-CON1 constellation-refit-live driver: a REAL device
// render + per-frame ENGINE-STATE readback off the demo `__constellationGen` seam,
// NOT a grep. The CPU-oracle blindspot (the W01 lesson): the unit suite + typecheck
// all pass while the LIVE field could fail to hold the pinned node, or never
// auto-release a settled warp, or never expose the settled signal. So this spec
// mounts the REAL <Constellation pinned accent-edges pinned-drift warp-on-click
// warp-auto-release> and samples the engine-owned state over the settle window.
//
// ASSERTS (born-RED at HEAD — the pinned/accentEdges/warpAutoRelease surface does not
// exist, so the handle is absent and every assert REDs):
//   (1) PINNED-HOLDS-WHILE-FIELD-DRIFTS — over ≥ 30 frames the pinned node moves < the
//       drift floor (held by the engine; pinnedDrift's gentle wander is bounded), while
//       a non-pinned node moves materially (the field is alive around the pin).
//   (2) WARP-AUTO-RELEASE — a dispatched warp settles, then targetIdx returns to -1
//       (the focal releases the spring; the identity-ride) within the settle window.
//   (3) WARP-SETTLED-EXPOSE — the exposed warpSettled() reports false MID-warp and
//       true once arrived (the isSettled read a consumer drives its UI off).

import { test, expect } from "@playwright/test";
import { resolveScene } from "./pi-manifest.ts";

const CONSTELLATION = resolveScene("substrates", "constellation");

test.setTimeout(120_000);

interface GenSample {
    handlePresent: boolean;
    warpSettledExposed: boolean;
    /** the pinned node's total travel over the window (bounded by pinnedDrift). */
    pinnedTravel: number;
    /** a non-pinned node's total travel over the window (the live field). */
    otherTravel: number;
    /** targetIdx right after the dispatched warp (in-flight, ≥ 0). */
    targetInFlight: number;
    /** targetIdx after the settle window (auto-release → -1). */
    targetAfterSettle: number;
    /** warpSettled() right after the dispatch (false — in flight). */
    settledInFlight: boolean;
    /** warpSettled() after the settle window (true — arrived/released). */
    settledAfter: boolean;
}

test.describe("constellation-gen-live (π lane — fail-CLOSED, AZ.W-CON-GEN)", () => {
    test("the pinned node holds, the warp auto-releases on settle, and warpSettled is exposed", async ({
        page,
    }) => {
        await page.goto(CONSTELLATION.path);
        const host = page
            .locator('[data-testid="constellation-gen-host"] canvas.constellation-canvas')
            .first();
        await host.waitFor({ state: "visible", timeout: 20_000 });
        await host.scrollIntoViewIfNeeded();
        await page.waitForFunction(
            () => {
                const g = (window as unknown as Record<string, unknown>)
                    .__constellationGen as
                    | { field?: { nodes: unknown[]; pinnedIndex: number }; warpSettled?: unknown }
                    | undefined;
                return (
                    !!g?.field &&
                    g.field.nodes.length > 0 &&
                    g.field.pinnedIndex >= 0 &&
                    typeof g.warpSettled === "function"
                );
            },
            { timeout: 15_000 },
        );

        const sample: GenSample = await page.evaluate(async () => {
            const g = (window as unknown as Record<string, unknown>)
                .__constellationGen as
                | {
                      field?: {
                          nodes: { x: number; y: number }[];
                          pinnedIndex: number;
                          warp: { x: number; y: number; targetIdx: number };
                          w: number;
                          h: number;
                      };
                      warpSettled?: () => boolean;
                      pinNode?: (i: number) => void;
                  }
                | undefined;
            const empty: GenSample = {
                handlePresent: false,
                warpSettledExposed: false,
                pinnedTravel: 0,
                otherTravel: 0,
                targetInFlight: -1,
                targetAfterSettle: -1,
                settledInFlight: true,
                settledAfter: false,
            };
            if (!g || !g.field || typeof g.warpSettled !== "function") return empty;
            const field = g.field;
            const nextFrame = () =>
                new Promise<void>((res) => requestAnimationFrame(() => res()));

            // ── (1) PINNED-HOLDS while the field drifts ──────────────────────────
            const pin = field.pinnedIndex;
            const other = pin === 0 ? 1 : 0;
            const trackTravel = async (idx: number, frames: number) => {
                let px = field.nodes[idx].x;
                let py = field.nodes[idx].y;
                let total = 0;
                for (let f = 0; f < frames; f++) {
                    await nextFrame();
                    const n = field.nodes[idx];
                    total += Math.hypot(n.x - px, n.y - py);
                    px = n.x;
                    py = n.y;
                }
                return total;
            };
            // sample the pinned + a neighbour over the same window.
            const pinnedTravel = await trackTravel(pin, 40);
            const otherTravel = await trackTravel(other, 40);

            // ── (2)+(3) WARP-AUTO-RELEASE + WARP-SETTLED ─────────────────────────
            // dispatch a warp to the far corner (a fresh target the spring must chase).
            // The component's click-warp listener is pointer-only; we drive the public
            // field via setWarpTarget through nearestNode by re-pointing manually is not
            // exposed — instead use the pinNode/warp seam: re-point the warp target to a
            // node FAR from the current warp position so it is plainly in flight.
            const farPoint = { x: field.w * 0.92, y: field.h * 0.08 };
            let best = -1;
            let bestD = Infinity;
            for (let i = 0; i < field.nodes.length; i++) {
                if (i === field.warp.targetIdx) continue;
                const n = field.nodes[i];
                const d = Math.hypot(n.x - farPoint.x, n.y - farPoint.y);
                if (d < bestD) {
                    bestD = d;
                    best = i;
                }
            }
            // place the warp mark far from the chosen target, then point it (in flight).
            field.warp.x = field.w * 0.08;
            field.warp.y = field.h * 0.92;
            field.warp.targetIdx = best;
            field.pinnedIndex = field.pinnedIndex; // keep the pin
            // give the render loop a couple frames to read the new target.
            await nextFrame();
            await nextFrame();
            const targetInFlight = field.warp.targetIdx;
            const settledInFlight = g.warpSettled();

            // let the spring settle over the warp window; auto-release should clear it.
            for (let f = 0; f < 90; f++) await nextFrame();
            const targetAfterSettle = field.warp.targetIdx;
            const settledAfter = g.warpSettled();

            return {
                handlePresent: true,
                warpSettledExposed: true,
                pinnedTravel,
                otherTravel,
                targetInFlight,
                targetAfterSettle,
                settledInFlight,
                settledAfter,
            };
        });

        // fail-CLOSED: the handle MUST be present on a real device render.
        expect(sample.handlePresent, "the __constellationGen seam is present").toBe(true);
        expect(sample.warpSettledExposed, "warpSettled() is exposed").toBe(true);

        // (1) the pinned node is HELD (bounded by pinnedDrift's gentle wander), while a
        // neighbour drifts materially. The neighbour's per-frame travel is the live drift
        // (device-proportional — a coarse/small canvas drifts proportionally less, so the
        // floor is a small absolute "field is alive" check, not a fixed px budget). The
        // binding assert is the RATIO: the neighbour moves clearly MORE than the pin.
        expect(
            sample.otherTravel,
            "a non-pinned node drifts (the field is alive)",
        ).toBeGreaterThan(0.5);
        expect(
            sample.pinnedTravel,
            "the pinned node is held (only the bounded pinnedDrift moves it; ≤ ½ the neighbour's drift)",
        ).toBeLessThan(sample.otherTravel * 0.5);

        // (2) the warp was in flight (targetIdx ≥ 0) then AUTO-RELEASED to -1 on settle.
        expect(sample.targetInFlight, "the warp was dispatched (in flight)").toBeGreaterThanOrEqual(
            0,
        );
        expect(
            sample.targetAfterSettle,
            "warpAutoRelease cleared the target on settle (the identity-ride)",
        ).toBe(-1);

        // (3) the settled signal flips: false mid-warp, true once arrived/released.
        expect(sample.settledInFlight, "warpSettled() is false mid-warp").toBe(false);
        expect(sample.settledAfter, "warpSettled() is true once arrived/released").toBe(true);
    });
});
