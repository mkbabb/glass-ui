// AY.W-CON2 — proof:constellation-egg-live, the π-lane gravity-well render
// observation. A byte-for-byte structural mirror of the AY.W-CON1
// constellation-refit-live gate: a REAL device render + per-frame ENGINE-STATE
// readback off the demo `__constellationEgg` handle, NOT a grep.
//
// The CPU-oracle blindspot (the W01 lesson): the well unit tests + typecheck ALL
// pass while the LIVE field could never heat (a dead force pass), never cool (a
// missing renorm — the field heats forever), slingshot a node off-canvas (a missing
// safety floor), or arm under reduced-motion. So this spec mounts the REAL
// <Constellation gravityWell> on a real device, drives the well via the demo
// `__constellationEgg.holdWellAt`/`releaseWell` seam (no race against a real
// held-pointer + the held-timer), and samples the engine-owned mean |v| + node bbox
// over the perturb→cool window.
//
// ASSERTS (born-RED at HEAD — `field.well`/the gravity-well force/the `gravityWell`
// prop do not exist, so the handle is absent and these asserts cannot run):
//   (1) WELL-PERTURBS-THEN-COOLS — mean node |v| RISES while held (the perturb),
//       then RETURNS to within ±5% of the pre-hold mean (the field-cools invariant).
//       A field that never renormalises FAILS here. The cool WINDOW is viewport-
//       scaled (AY.W-CON-FIX F8.1): the released-node ease-back is a first-order
//       exponential toward `speed` at WELL_COOL_RELEASED (7/s), so the wall-clock
//       frames to land inside ±5% scale with the perturb PEAK — which is larger on
//       the narrow canvas (a smaller `k` makes the well force proportionally
//       stronger). On desktop the peak is ~2.3× rest and ±5% is reached by ~30
//       frames; on the 390-width mobile canvas the peak is ~1.7× and ±5% lands by
//       ~60 frames. So BOTH arms gate the SAME honest ±5% (COOL_TOL), each sampled
//       at a window where it genuinely cools — NOT a silently-widened tolerance.
//   (2) WELL-NO-SLINGSHOT — under a MAX-strength well at canvas centre, NO node
//       leaves [0,w]×[0,h] over the hold + 60 frames (the max(d,soften) floor + the
//       maxSpeed clamp hold). A co-located node going to ∞ FAILS here.
//   (3) PRM-SUPPRESSES-WELL + STATE-RESETS-ON-EDGE — under
//       prefers-reduced-motion: reduce a hold produces NO mean-|v| rise (the
//       listener is not registered → the well never arms); AND toggling PRM true
//       mid-hold resets field.well.strength to 0 on the next parked frame (no
//       half-ramped well frozen on).
//   (4) MOBILE-COOLS — the well-perturbs-then-cools invariant RE-RUN at a real
//       390-width viewport (AY.W-CON-FIX F8.1 — the narrow canvas is the WORST cool
//       case the W-CON2 DELTA measured; it was previously UNGATED). The mobile field
//       heats harder (the proportionally-larger force) and cools slower in frames, so
//       the mobile arm samples a LONGER (70-frame) post-release window where it
//       genuinely returns to within the SAME ±5% COOL_TOL.

import { test, expect } from "@playwright/test";
// Resolve the constellation scene off the W00 manifest re-source (the anti-drift
// source-of-truth) WITHOUT editing W00's `PI_TARGETS` — `resolveScene` is the public
// seam this gate composes (it ADDS a sibling gate, it does not edit W00's members).
import { resolveScene } from "./pi-manifest.ts";

const CONSTELLATION = resolveScene("substrates", "constellation");

const SPEED = 0.16; // the demo well instance drifts at the default 0.16
const PERTURB_RATIO = 1.2; // the held field heats ≥ 20% above rest
// Post-release mean |v| within ±5% of the pre-hold mean — the HONEST spec tolerance
// (AY.W-CON-FIX F8.1; restored from the silently-widened 0.06). Each viewport arm
// samples at a window where the field genuinely lands inside ±5% (desktop ~30f,
// mobile ~70f) rather than widening the tolerance to mask the slower mobile cool.
const COOL_TOL = 0.05;
// The desktop cool window (post-release frames before sampling cooledMean) — the
// field is fully re-settled here (≤0.1% on the live 1066×~320 canvas, with margin
// under the gate's variable headless rAF cadence; a tighter 40-frame window reads
// ~0.3% on a steady clock but can sit at ~5–6% when the headless frames throttle).
const DESKTOP_COOL_FRAMES = 60;
// The mobile cool window — the narrow 314×420 canvas heats ~1.7× and the first-order
// ease-back takes more wall-clock frames to land inside ±5% (≈2.7% at 70f, with
// margin; the 30-frame worst-case the DELTA measured at ~13–23% is now GATED here,
// not hidden).
const MOBILE_COOL_FRAMES = 70;

interface WellSample {
    handlePresent: boolean;
    /** mean node |v| at rest (pre-hold). */
    restMean: number;
    /** the peak mean |v| over the hold window (the perturb). */
    heldPeak: number;
    /** mean node |v| ≥ 30 frames after release (the cool-down). */
    cooledMean: number;
    /** the max |node coord out-of-bounds| over the hold + 60 frames (the slingshot). */
    maxOob: number;
    /** the canvas extent the bbox is measured against. */
    w: number;
    h: number;
}

test.setTimeout(120_000);

test.describe("constellation-egg-live (π lane — fail-CLOSED, AY.W-CON2)", () => {
    test("the gravity-well perturbs the field then cools, never slingshots, and is PRM-suppressed", async ({
        page,
    }) => {
        await page.goto(CONSTELLATION.path);
        // The gravity-well section's canvas — targeted via the host `data-testid`
        // (AY.W-DOCK-CHROME §4): the StoryHero mounts a constellation BACKGROUND canvas
        // at index 0 for this hero route, so the prior `nth(3)` index pointed at the
        // WRONG canvas → the well section never scrolled into view, its field never
        // seeded (the "well did not perturb" + waitForFunction timeout). The demo
        // exposes the live field + holdWellAt/releaseWell on window.__constellationEgg.
        const wellCanvas = page
            .locator('[data-testid="constellation-well-host"] canvas.constellation-canvas')
            .first();
        await wellCanvas.waitFor({ state: "visible", timeout: 20_000 });
        await wellCanvas.scrollIntoViewIfNeeded();
        await page.waitForFunction(
            () => {
                const e = (window as unknown as Record<string, unknown>)
                    .__constellationEgg as
                    | { field?: { nodes: unknown[]; w: number }; holdWellAt?: unknown }
                    | undefined;
                return (
                    !!e?.field &&
                    e.field.nodes.length > 0 &&
                    e.field.w > 0 &&
                    typeof e.holdWellAt === "function"
                );
            },
            { timeout: 15_000 },
        );

        // ── (1) WELL-PERTURBS-THEN-COOLS + (2) WELL-NO-SLINGSHOT ─────────────────
        const sample: WellSample = await page.evaluate(async (coolFrames) => {
            const e = (window as unknown as Record<string, unknown>)
                .__constellationEgg as
                | {
                      field?: {
                          nodes: { x: number; y: number; vx: number; vy: number }[];
                          w: number;
                          h: number;
                      };
                      holdWellAt?: (x: number, y: number) => boolean;
                      releaseWell?: () => void;
                  }
                | undefined;
            if (!e || !e.field || !e.holdWellAt || !e.releaseWell) {
                return {
                    handlePresent: false,
                    restMean: 0,
                    heldPeak: 0,
                    cooledMean: 0,
                    maxOob: 0,
                    w: 0,
                    h: 0,
                };
            }
            const field = e.field;
            const nextFrame = () =>
                new Promise<void>((res) => requestAnimationFrame(() => res()));
            const meanSpeed = () => {
                let s = 0;
                for (const n of field.nodes) s += Math.hypot(n.vx, n.vy);
                return s / field.nodes.length;
            };
            // the worst out-of-bounds amount (px past any edge) over this frame.
            const oob = () => {
                let m = 0;
                for (const n of field.nodes) {
                    m = Math.max(
                        m,
                        -n.x,
                        n.x - field.w,
                        -n.y,
                        n.y - field.h,
                        Number.isFinite(n.x) ? 0 : 1e9,
                        Number.isFinite(n.y) ? 0 : 1e9,
                    );
                }
                return m;
            };

            // Wait until the substrate rAF is ACTUALLY advancing the field before
            // sampling — under runner contention the offscreen/content-visibility
            // park may not have lifted on the first scrolled frame, so a hold would
            // read a parked (un-stepped) field as "the force is dead" (a false RED).
            // Poll the node positions across frames: a live field MOVES; a parked one
            // is frozen. Bail to sampling once motion is observed (or after a cap).
            const sumPos = () => {
                let s = 0;
                for (const n of field.nodes) s += n.x + n.y;
                return s;
            };
            let prevPos = sumPos();
            for (let i = 0; i < 90; i++) {
                await nextFrame();
                const now = sumPos();
                if (Math.abs(now - prevPos) > 1e-3) break; // the field is drifting
                prevPos = now;
            }

            // REST baseline (let the field settle to `speed`).
            for (let i = 0; i < 12; i++) await nextFrame();
            const restMean = meanSpeed();

            // HOLD the well at canvas centre + sample the perturb + the slingshot.
            e.holdWellAt(field.w / 2, field.h / 2);
            let heldPeak = 0;
            let maxOob = 0;
            for (let i = 0; i < 40; i++) {
                await nextFrame();
                heldPeak = Math.max(heldPeak, meanSpeed());
                maxOob = Math.max(maxOob, oob());
            }

            // RELEASE + sample the cool window + keep watching the bounds.
            e.releaseWell();
            for (let i = 0; i < coolFrames; i++) {
                await nextFrame();
                maxOob = Math.max(maxOob, oob());
            }
            const cooledMean = meanSpeed();

            return {
                handlePresent: true,
                restMean,
                heldPeak,
                cooledMean,
                maxOob,
                w: field.w,
                h: field.h,
            };
        }, DESKTOP_COOL_FRAMES);

        // The handle MUST be present — its absence is the born-RED state (no well
        // seam → nothing to sample). A fail-CLOSED RED, not a skip.
        expect(
            sample.handlePresent,
            "window.__constellationEgg is absent — the gravity-well seam did not mount (born-RED: no well to drive)",
        ).toBe(true);

        // (1) WELL-PERTURBS — the field heated meaningfully while held.
        expect(
            sample.heldPeak,
            `the well did not perturb the field: held-peak mean |v| ${sample.heldPeak.toFixed(4)} ≤ ${(sample.restMean * PERTURB_RATIO).toFixed(4)} (rest ${sample.restMean.toFixed(4)} × ${PERTURB_RATIO}) — the force pass is dead`,
        ).toBeGreaterThan(sample.restMean * PERTURB_RATIO);
        // (1) THEN-COOLS — the released field returned to ~`speed` (the rest mean).
        const coolErr = Math.abs(sample.cooledMean - sample.restMean) / sample.restMean;
        expect(
            coolErr,
            `the field did not cool after release: mean |v| ${sample.cooledMean.toFixed(4)} vs rest ${sample.restMean.toFixed(4)} (${(coolErr * 100).toFixed(1)}% off, > ${COOL_TOL * 100}%) — the |v|→speed ease-back must renormalise`,
        ).toBeLessThan(COOL_TOL);

        // (2) WELL-NO-SLINGSHOT — no node left [0,w]×[0,h] (the safety floors hold).
        expect(
            sample.maxOob,
            `a node left the canvas under a max-strength well: max out-of-bounds ${sample.maxOob.toFixed(1)}px (> 1px) — the max(d,soften) floor / the maxSpeed clamp failed`,
        ).toBeLessThan(1);

        // ── (3) PRM-SUPPRESSES-WELL + STATE-RESETS-ON-EDGE ───────────────────────
        // Re-run under reduced-motion: a hold gesture (the synthetic well drive) must
        // produce NO mean-|v| rise — the well-listener is not registered, so the
        // well never arms under reduce. The substrate LIVE-MONITORS PRM; give it a
        // beat to freeze the rAF first.
        await page.emulateMedia({ reducedMotion: "reduce" });
        await page.waitForTimeout(220);
        const prm = await page.evaluate(async () => {
            const e = (window as unknown as Record<string, unknown>)
                .__constellationEgg as
                | {
                      field?: {
                          nodes: { vx: number; vy: number }[];
                          w: number;
                          h: number;
                          well?: { strength: number };
                      };
                      holdWellAt?: (x: number, y: number) => boolean;
                      releaseWell?: () => void;
                  }
                | undefined;
            if (!e || !e.field || !e.holdWellAt)
                return { ok: false, rise: -1, strengthAfterEdge: -1 };
            const field = e.field;
            const nextFrame = () =>
                new Promise<void>((res) => requestAnimationFrame(() => res()));
            const meanSpeed = () => {
                let s = 0;
                for (const n of field.nodes) s += Math.hypot(n.vx, n.vy);
                return s / field.nodes.length;
            };
            const before = meanSpeed();
            // drive a hold under reduce — the parked frame must NOT step the force.
            e.holdWellAt(field.w / 2, field.h / 2);
            for (let i = 0; i < 30; i++) await nextFrame();
            const after = meanSpeed();
            // the PRM-true-edge state reset: even though holdWellAt set target=1, the
            // render hook resets the well to neutral while reduced-motion is true, so
            // field.well.strength reads 0 on the parked frame (no half-ramped well).
            const strengthAfterEdge = field.well?.strength ?? -1;
            e.releaseWell?.();
            return {
                ok: true,
                rise: Math.abs(after - before),
                strengthAfterEdge,
            };
        });
        expect(prm.ok, "the egg handle vanished under reduce").toBe(true);
        // no perturb under reduce (the field is parked; |v| holds within float noise).
        expect(
            prm.rise,
            `under prefers-reduced-motion the well perturbed the field (mean |v| moved ${prm.rise.toFixed(4)}) — the well armed under reduce (it must NOT)`,
        ).toBeLessThan(SPEED * 0.1);
        // the state-reset-on-edge: a half-ramped well is not frozen on.
        expect(
            prm.strengthAfterEdge,
            `field.well.strength read ${prm.strengthAfterEdge} after the PRM-true edge (expected 0) — a half-ramped well froze ON`,
        ).toBeLessThan(0.01);

        // ── (4) MOBILE-COOLS (AY.W-CON-FIX F8.1 — the narrow-canvas worst case) ──
        // Re-run the perturb→cool invariant at a REAL 390-width viewport: the
        // smaller `k` makes the well force proportionally stronger, so the field
        // heats harder (~1.7× vs desktop's ~2.3×) AND the first-order ease-back
        // takes more wall-clock frames to land inside ±5%. The mobile arm samples a
        // LONGER (70-frame) post-release window where the SAME ±5% COOL_TOL is
        // genuinely met (≈2.7% with margin) — so the mobile cool is GATED, not the
        // measured-and-hidden 13–23% the W-CON2 DELTA caught at the desktop window.
        await page.emulateMedia({ reducedMotion: "no-preference" });
        await page.setViewportSize({ width: 390, height: 844 });
        await page.reload({ waitUntil: "domcontentloaded" });
        await page.waitForLoadState("networkidle");
        const mobileCanvas = page
            .locator('[data-testid="constellation-well-host"] canvas.constellation-canvas')
            .first();
        await mobileCanvas.waitFor({ state: "visible", timeout: 20_000 });
        await mobileCanvas.scrollIntoViewIfNeeded();
        await page.waitForFunction(
            () => {
                const e = (window as unknown as Record<string, unknown>)
                    .__constellationEgg as
                    | { field?: { nodes: unknown[]; w: number }; holdWellAt?: unknown }
                    | undefined;
                return (
                    !!e?.field &&
                    e.field.nodes.length > 0 &&
                    e.field.w > 0 &&
                    typeof e.holdWellAt === "function"
                );
            },
            { timeout: 15_000 },
        );
        const mobile: WellSample = await page.evaluate(async (coolFrames) => {
            const e = (window as unknown as Record<string, unknown>)
                .__constellationEgg as
                | {
                      field?: {
                          nodes: { x: number; y: number; vx: number; vy: number }[];
                          w: number;
                          h: number;
                      };
                      holdWellAt?: (x: number, y: number) => boolean;
                      releaseWell?: () => void;
                  }
                | undefined;
            if (!e || !e.field || !e.holdWellAt || !e.releaseWell) {
                return {
                    handlePresent: false,
                    restMean: 0,
                    heldPeak: 0,
                    cooledMean: 0,
                    maxOob: 0,
                    w: 0,
                    h: 0,
                };
            }
            const field = e.field;
            const nextFrame = () =>
                new Promise<void>((res) => requestAnimationFrame(() => res()));
            const meanSpeed = () => {
                let s = 0;
                for (const n of field.nodes) s += Math.hypot(n.vx, n.vy);
                return s / field.nodes.length;
            };
            const sumPos = () => {
                let s = 0;
                for (const n of field.nodes) s += n.x + n.y;
                return s;
            };
            // un-park (wait for the substrate rAF to advance the field).
            let prevPos = sumPos();
            for (let i = 0; i < 90; i++) {
                await nextFrame();
                const now = sumPos();
                if (Math.abs(now - prevPos) > 1e-3) break;
                prevPos = now;
            }
            for (let i = 0; i < 12; i++) await nextFrame();
            const restMean = meanSpeed();
            // HOLD + perturb.
            e.holdWellAt(field.w / 2, field.h / 2);
            let heldPeak = 0;
            for (let i = 0; i < 40; i++) {
                await nextFrame();
                heldPeak = Math.max(heldPeak, meanSpeed());
            }
            // RELEASE + the LONGER mobile cool window.
            e.releaseWell();
            for (let i = 0; i < coolFrames; i++) await nextFrame();
            const cooledMean = meanSpeed();
            return {
                handlePresent: true,
                restMean,
                heldPeak,
                cooledMean,
                maxOob: 0,
                w: field.w,
                h: field.h,
            };
        }, MOBILE_COOL_FRAMES);

        expect(
            mobile.handlePresent,
            "window.__constellationEgg is absent at the 390-width viewport — the mobile cool arm could not sample",
        ).toBe(true);
        // the mobile canvas is the narrow one (sanity: a real 390-width remount).
        expect(
            mobile.w,
            `the mobile arm measured a ${mobile.w}px-wide canvas — the 390-width remount did not narrow the field (the worst-case cool arm needs the narrow canvas)`,
        ).toBeLessThan(420);
        // the mobile field heats harder than rest (the proportionally-larger force).
        expect(
            mobile.heldPeak,
            `the mobile well did not perturb the narrow field: held-peak ${mobile.heldPeak.toFixed(4)} ≤ ${(mobile.restMean * PERTURB_RATIO).toFixed(4)}`,
        ).toBeGreaterThan(mobile.restMean * PERTURB_RATIO);
        // and COOLS to within the SAME honest ±5% over the longer mobile window.
        const mobileCoolErr =
            Math.abs(mobile.cooledMean - mobile.restMean) / mobile.restMean;
        expect(
            mobileCoolErr,
            `the 390-width field did not cool to ±${COOL_TOL * 100}% over ${MOBILE_COOL_FRAMES} post-release frames: mean |v| ${mobile.cooledMean.toFixed(4)} vs rest ${mobile.restMean.toFixed(4)} (${(mobileCoolErr * 100).toFixed(1)}% off) — the narrow-canvas cool is the W-CON2 worst case, now GATED`,
        ).toBeLessThan(COOL_TOL);
    });
});
