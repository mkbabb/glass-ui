// AY.W-CON1 — proof:constellation-refit-live, the π-lane resize-refit + auto-drift
// render observation. Mirrors the AX.W17 constellation-warp-live gate: a REAL
// device render + per-frame ENGINE-STATE readback off the demo handles, NOT a grep.
//
// The CPU-oracle blindspot (the W01 lesson): the refit + wander unit tests +
// typecheck ALL pass while the LIVE field could drift-out on resize, or the
// cadence could never fire / fire under reduced-motion. So this spec mounts the
// REAL <Constellation> on a real device, drives a PROGRAMMATIC RO resize (via the
// demo `__constellationRefit.resizeTo` seam — no race against a real responsive
// scale), and samples the engine-owned node bbox + focalIndex over the settle
// window.
//
// ASSERTS (born-RED at HEAD — `refitField`/`field.wander` do not exist, so the
// fills-box assert drifts-out and the wander handle is absent):
//   (1) REFIT-FILLS-BOX-IN-ONE-FRAME — after a programmatic small→large resize the
//       node bbox covers ≥ 90% of each axis on the VERY NEXT frame (the fix);
//       AND a WITHOUT-refit control (seeded-once at the large extent then NOT yet
//       drifted... captured by sampling the field's bbox coverage BEFORE the
//       refit lattice has relaxed — the drift-out lag) covers < 60% on frame 1.
//  (1b) REFIT-SHEAR (RG3) — a NON-UNIFORM portrait→landscape transpose (360×720 →
//       1280×360, sx ≫ 1 / sy < 1) STILL fills both axes ≥ 90% on frame 1. The
//       uniform-grow arm (1) is invariant under a uniform scale (coverage is
//       structurally pinned); the shear arm binds the ACTUAL slide-enter transpose
//       the wave exists to fix — the case (1) cannot distort.
//   (2) AUTO-DRIFT-CADENCE — a wander-on focal re-targets to a DIFFERENT node ≥ 2
//       times on the cadence with NO click; each transition is spring-EASED
//       (≥ 5 closing frames, not a snap).
//   (3) PRM-SUPPRESSES-WANDER — under prefers-reduced-motion: reduce the focalIndex
//       NEVER changes over ≥ 2 cadence windows (the cadence does not advance).
//   (4) FIELD-COOLS-AFTER-REFIT — mean node |v| post-refit is within ±5% of pre.
//   (5) ALPHA-BOTH-MODE — the live palette.alpha matches the declared
//       --constellation-alpha token in light AND dark.

import { test, expect } from "@playwright/test";
import { resolveScene } from "./pi-manifest.ts";

const CONSTELLATION = resolveScene("substrates", "constellation");

const COVERAGE_PASS = 0.9; // the refit lattice fills ≥ 90% of each axis on frame 1
const COVERAGE_FAIL_CEIL = 0.6; // the drift-out baseline covers < 60% on frame 1
const MIN_CADENCE_FIRES = 2; // the wander re-targets ≥ 2× over the sampled windows
const MIN_CLOSING_FRAMES = 5; // a spring-eased transition closes over many frames
const ALPHA_LIGHT = 0.8;
const ALPHA_DARK = 0.88;
const ALPHA_EPS = 0.01;

interface RefitSample {
    handlePresent: boolean;
    /** node-bbox coverage of the new canvas BEFORE the refit ran (drift-out baseline). */
    coverageBeforeW: number;
    coverageBeforeH: number;
    /** node-bbox coverage of the new canvas on the FIRST post-refit frame. */
    coverageAfterW: number;
    coverageAfterH: number;
    /** mean node |v| before the resize and ≥ 30 frames after (the cool-down). */
    meanSpeedBefore: number;
    meanSpeedAfter: number;
}

interface WanderSample {
    handlePresent: boolean;
    /** the focalIndex per frame over the sampled cadence windows. */
    focalTrace: number[];
    /** the count of distinct re-targets (focalIndex changed to a new node). */
    fires: number;
    /** the max closing-frame run over any single transition (spring-eased metric). */
    maxClosingFrames: number;
}

test.setTimeout(120_000);

test.describe("constellation-refit-live (π lane — fail-CLOSED, AY.W-CON1)", () => {
    test("the lattice re-fits on resize within one frame, the field cools, and the focal auto-drifts", async ({
        page,
    }) => {
        await page.goto(CONSTELLATION.path);
        // The refit/wander section's canvas — targeted via the host `data-testid`
        // (AY.W-DOCK-CHROME §4): the StoryHero mounts a constellation BACKGROUND canvas
        // at index 0 for this hero route, so the prior `.constellation-canvas` nth(2)
        // pointed at the WRONG (warp) canvas → the refit section never scrolled into
        // view, its field never seeded (0 nodes → the waitForFunction timeout + the
        // stale 76% drift-out read). The demo exposes the live field + resizeTo on
        // window.__constellationRefit.
        const refitCanvas = page
            .locator('[data-testid="constellation-refit-host"] canvas.constellation-canvas')
            .first();
        await refitCanvas.waitFor({ state: "visible", timeout: 20_000 });
        await refitCanvas.scrollIntoViewIfNeeded();
        await page.waitForFunction(
            () => {
                const r = (window as unknown as Record<string, unknown>)
                    .__constellationRefit as
                    | { field?: { nodes: unknown[]; w: number }; resizeTo?: unknown }
                    | undefined;
                return (
                    !!r?.field &&
                    r.field.nodes.length > 0 &&
                    r.field.w > 0 &&
                    typeof r.resizeTo === "function"
                );
            },
            { timeout: 15_000 },
        );

        // ── (1) + (4) REFIT-FILLS-BOX + FIELD-COOLS ─────────────────────────────
        const refit: RefitSample = await page.evaluate(async () => {
            const r = (window as unknown as Record<string, unknown>)
                .__constellationRefit as
                | {
                      field?: {
                          nodes: { x: number; y: number; vx: number; vy: number }[];
                          w: number;
                          h: number;
                      };
                      resizeTo?: (w: number, h: number) => void;
                  }
                | undefined;
            if (!r || !r.field || !r.resizeTo) {
                return {
                    handlePresent: false,
                    coverageBeforeW: 0,
                    coverageBeforeH: 0,
                    coverageAfterW: 0,
                    coverageAfterH: 0,
                    meanSpeedBefore: 0,
                    meanSpeedAfter: 0,
                };
            }
            const field = r.field;
            const nextFrame = () =>
                new Promise<void>((res) => requestAnimationFrame(() => res()));

            const bboxCoverage = (w: number, h: number) => {
                const xs = field.nodes.map((n) => n.x);
                const ys = field.nodes.map((n) => n.y);
                const bw = Math.max(...xs) - Math.min(...xs);
                const bh = Math.max(...ys) - Math.min(...ys);
                return { cw: bw / w, ch: bh / h };
            };
            const meanSpeed = () => {
                let s = 0;
                for (const n of field.nodes) s += Math.hypot(n.vx, n.vy);
                return s / field.nodes.length;
            };

            // SHRINK to a small extent first + let the field re-fit + settle to it,
            // so the "before" baseline is the small-canvas lattice (its bbox is a
            // SMALL fraction of the LARGE target box — the drift-out the fix removes).
            r.resizeTo(360, 240);
            for (let i = 0; i < 8; i++) await nextFrame();
            const meanSpeedBefore = meanSpeed();
            // measure the small lattice's coverage AGAINST the upcoming LARGE box —
            // this is what a seed-once / no-refit field would still show on frame 1
            // (the nodes still at small-canvas positions, covering < 60% of large).
            const LARGE_W = 1280;
            const LARGE_H = 720;
            const before = bboxCoverage(LARGE_W, LARGE_H);

            // GROW to the large extent. The substrate's RO fires synchronously
            // (resizeTo forces a layout flush), and the render-loop branch calls
            // refitField BEFORE the first post-resize step — so on the VERY NEXT
            // frame the lattice already spans the new box.
            r.resizeTo(LARGE_W, LARGE_H);
            await nextFrame(); // the FIRST post-resize frame — refit already applied
            const after = bboxCoverage(field.w, field.h);

            // ≥ 30 frames later, the field must not have HEATED (the cool-down).
            for (let i = 0; i < 30; i++) await nextFrame();
            const meanSpeedAfter = meanSpeed();

            return {
                handlePresent: true,
                coverageBeforeW: before.cw,
                coverageBeforeH: before.ch,
                coverageAfterW: after.cw,
                coverageAfterH: after.ch,
                meanSpeedBefore,
                meanSpeedAfter,
            };
        });

        expect(
            refit.handlePresent,
            "window.__constellationRefit is absent — the refit seam did not mount (born-RED: no seam to sample)",
        ).toBe(true);

        // (1) REFIT-FILLS-BOX-IN-ONE-FRAME — the after lattice fills the new box…
        expect(
            refit.coverageAfterW,
            `the re-fit lattice did NOT fill the new canvas width on frame 1: coverage ${(refit.coverageAfterW * 100).toFixed(0)}% (< ${COVERAGE_PASS * 100}%) — the drift-out lag was not removed`,
        ).toBeGreaterThanOrEqual(COVERAGE_PASS);
        expect(
            refit.coverageAfterH,
            `the re-fit lattice did NOT fill the new canvas height on frame 1: coverage ${(refit.coverageAfterH * 100).toFixed(0)}% (< ${COVERAGE_PASS * 100}%)`,
        ).toBeGreaterThanOrEqual(COVERAGE_PASS);
        // …and the WITHOUT-refit baseline (the small lattice against the large box)
        // covers < 60% — the lag the fix removes.
        expect(
            refit.coverageBeforeW,
            `the drift-out baseline already covered ${(refit.coverageBeforeW * 100).toFixed(0)}% of the large box — the test fixture does not isolate the lag (expected < ${COVERAGE_FAIL_CEIL * 100}%)`,
        ).toBeLessThan(COVERAGE_FAIL_CEIL);

        // (4) FIELD-COOLS-AFTER-REFIT — post-refit mean speed within ±5% of pre.
        const speedRatio =
            refit.meanSpeedBefore > 0
                ? refit.meanSpeedAfter / refit.meanSpeedBefore
                : 1;
        expect(
            Math.abs(speedRatio - 1),
            `the field HEATED after the refit: mean |v| ${refit.meanSpeedBefore.toFixed(4)} → ${refit.meanSpeedAfter.toFixed(4)} (ratio ${speedRatio.toFixed(3)}, > ±5%) — refitField must scale positions only, not velocities`,
        ).toBeLessThan(0.05);

        // ── (1b) REFIT-SHEAR — the portrait→landscape transpose (RG3) ────────────
        // The uniform-grow arm above (360×240→1280×720, sx≈3.55/sy≈3.0) is INVARIANT
        // under a uniform scale — bbox-coverage is structurally pinned (the seed's
        // intrinsic coverage of any box), so it cannot distort. The case that BINDS
        // the aesthetic claim is a NON-UNIFORM (sheared) refit: the actual deck
        // slide-enter scenario is a portrait→landscape TRANSPOSE where `sx ≠ sy`
        // STRONGLY. Drive 360×720 (tall) → 1280×360 (wide) — sx≈3.56, sy≈0.5, an
        // axis swap — and assert the sheared lattice STILL covers BOTH axes ≥ 90% on
        // the first post-resize frame (the field fills the transposed box, not just
        // grows uniformly). This is the arm RG3 added to bind the transpose claim the
        // whole wave exists to fix.
        const shear: {
            handlePresent: boolean;
            coverageW: number;
            coverageH: number;
            sx: number;
            sy: number;
            w: number;
            h: number;
        } = await page.evaluate(async () => {
            const r = (window as unknown as Record<string, unknown>)
                .__constellationRefit as
                | {
                      field?: {
                          nodes: { x: number; y: number }[];
                          w: number;
                          h: number;
                      };
                      resizeTo?: (w: number, h: number) => void;
                  }
                | undefined;
            if (!r || !r.field || !r.resizeTo) {
                return {
                    handlePresent: false,
                    coverageW: 0,
                    coverageH: 0,
                    sx: 0,
                    sy: 0,
                    w: 0,
                    h: 0,
                };
            }
            const field = r.field;
            const nextFrame = () =>
                new Promise<void>((res) => requestAnimationFrame(() => res()));
            const bboxCoverage = (w: number, h: number) => {
                const xs = field.nodes.map((n) => n.x);
                const ys = field.nodes.map((n) => n.y);
                return {
                    cw: (Math.max(...xs) - Math.min(...xs)) / w,
                    ch: (Math.max(...ys) - Math.min(...ys)) / h,
                };
            };
            // SETTLE to a tall PORTRAIT extent first (the slide-enter pre-state).
            const TALL_W = 360;
            const TALL_H = 720;
            r.resizeTo(TALL_W, TALL_H);
            for (let i = 0; i < 8; i++) await nextFrame();
            // TRANSPOSE to a wide LANDSCAPE extent — sx ≫ 1, sy < 1 (the shear).
            const WIDE_W = 1280;
            const WIDE_H = 360;
            const sx = WIDE_W / TALL_W;
            const sy = WIDE_H / TALL_H;
            r.resizeTo(WIDE_W, WIDE_H);
            await nextFrame(); // the FIRST post-transpose frame — refit already applied
            const cov = bboxCoverage(field.w, field.h);
            return {
                handlePresent: true,
                coverageW: cov.cw,
                coverageH: cov.ch,
                sx,
                sy,
                w: field.w,
                h: field.h,
            };
        });

        expect(
            shear.handlePresent,
            "the refit handle vanished before the shear arm",
        ).toBe(true);
        // the shear is real (sx ≫ 1, sy < 1 — a portrait→landscape transpose, NOT a
        // uniform grow): a sanity guard that the arm actually exercised a non-uniform
        // refit (the case the uniform-grow arm structurally cannot).
        expect(
            shear.sx,
            `the shear arm did not stretch the x-axis (sx ${shear.sx.toFixed(2)}) — the transpose was not non-uniform`,
        ).toBeGreaterThan(2);
        expect(
            shear.sy,
            `the shear arm did not compress the y-axis (sy ${shear.sy.toFixed(2)}) — the transpose was not a portrait→landscape shear`,
        ).toBeLessThan(1);
        // the sheared lattice STILL fills both axes ≥ 90% on the first frame.
        expect(
            shear.coverageW,
            `the sheared lattice did NOT fill the transposed canvas width on frame 1: coverage ${(shear.coverageW * 100).toFixed(0)}% (< ${COVERAGE_PASS * 100}%) — the per-axis refit did not span the wide box`,
        ).toBeGreaterThanOrEqual(COVERAGE_PASS);
        expect(
            shear.coverageH,
            `the sheared lattice did NOT fill the transposed canvas height on frame 1: coverage ${(shear.coverageH * 100).toFixed(0)}% (< ${COVERAGE_PASS * 100}%) — the per-axis refit did not span the wide box`,
        ).toBeGreaterThanOrEqual(COVERAGE_PASS);

        // ── (2) AUTO-DRIFT-CADENCE ──────────────────────────────────────────────
        const wander: WanderSample = await page.evaluate(
            async ({ minClosing }) => {
                const r = (window as unknown as Record<string, unknown>)
                    .__constellationRefit as
                    | {
                          field?: {
                              nodes: { x: number; y: number }[];
                              focalIndex: number;
                              warp: { x: number; y: number; targetIdx: number };
                          };
                      }
                    | undefined;
                if (!r || !r.field) {
                    return {
                        handlePresent: false,
                        focalTrace: [],
                        fires: 0,
                        maxClosingFrames: 0,
                    };
                }
                const field = r.field;
                const nextFrame = () =>
                    new Promise<void>((res) => requestAnimationFrame(() => res()));
                const focalTrace: number[] = [];
                // the demo cadence is minIdle 1400 + jitter 600 → ~1.4–2.0s. Sample
                // ≥ 2 windows (~5s) + track the warp→target closing-frame run.
                let fires = 0;
                let prevFocal = field.focalIndex;
                let closingRun = 0;
                let maxClosingFrames = 0;
                let prevDist = Infinity;
                const t0 = performance.now();
                while (performance.now() - t0 < 6000) {
                    await nextFrame();
                    focalTrace.push(field.focalIndex);
                    if (field.focalIndex !== prevFocal) {
                        fires++;
                        prevFocal = field.focalIndex;
                        closingRun = 0;
                        prevDist = Infinity;
                    }
                    // closing-frames over the current transition: the warp position
                    // approaches its live target node.
                    const tn = field.nodes[field.warp.targetIdx];
                    if (tn) {
                        const d = Math.hypot(
                            field.warp.x - tn.x,
                            field.warp.y - tn.y,
                        );
                        if (d < prevDist - 0.01) {
                            closingRun++;
                            if (closingRun > maxClosingFrames)
                                maxClosingFrames = closingRun;
                        } else {
                            closingRun = 0;
                        }
                        prevDist = d;
                    }
                }
                void minClosing;
                return { handlePresent: true, focalTrace, fires, maxClosingFrames };
            },
            { minClosing: MIN_CLOSING_FRAMES },
        );

        expect(wander.handlePresent, "the refit/wander handle vanished").toBe(true);
        expect(
            wander.fires,
            `the focal auto-drifted only ${wander.fires} time(s) (< ${MIN_CADENCE_FIRES}) over the sampled cadence windows — the wander did not fire`,
        ).toBeGreaterThanOrEqual(MIN_CADENCE_FIRES);
        expect(
            wander.maxClosingFrames,
            `a wander transition closed over only ${wander.maxClosingFrames} frame(s) (< ${MIN_CLOSING_FRAMES}) — a snap, not a spring-eased path`,
        ).toBeGreaterThanOrEqual(MIN_CLOSING_FRAMES);

        // ── (5) ALPHA-BOTH-MODE π readback ──────────────────────────────────────
        for (const [scheme, expected] of [
            ["light", ALPHA_LIGHT],
            ["dark", ALPHA_DARK],
        ] as const) {
            await page.emulateMedia({ colorScheme: scheme });
            // the demo toggles `.dark` off the OS scheme via useGlobalDark; nudge
            // the class so the token cascade resolves the arm under test.
            await page.evaluate((s) => {
                document.documentElement.classList.toggle("dark", s === "dark");
            }, scheme);
            await page.waitForTimeout(120);
            const alpha = await page.evaluate(() => {
                const canvas = document.querySelector(
                    '[data-testid="constellation-refit-host"] canvas.constellation-canvas',
                ) as HTMLCanvasElement;
                const cs = getComputedStyle(canvas);
                const raw = cs.getPropertyValue("--constellation-alpha").trim();
                return Number.parseFloat(raw);
            });
            expect(
                alpha,
                `the live --constellation-alpha in ${scheme} resolved to ${alpha} (expected ${expected}±${ALPHA_EPS}) — the per-mode token did not reach the field`,
            ).toBeCloseTo(expected, 2);
        }

        // ── (3) PRM-SUPPRESSES-WANDER ───────────────────────────────────────────
        // reset to light, then emulate reduced-motion and assert the focal NEVER
        // re-targets over ≥ 2 cadence windows (the cadence does not advance).
        await page.emulateMedia({ colorScheme: "light", reducedMotion: "reduce" });
        await page.evaluate(() =>
            document.documentElement.classList.remove("dark"),
        );
        // the substrate LIVE-MONITORS PRM (a matchMedia change listener); give it a
        // beat to freeze the rAF, then confirm the focal holds for ≥ 2 windows.
        await page.waitForTimeout(200);
        const prmHeld = await page.evaluate(async () => {
            const r = (window as unknown as Record<string, unknown>)
                .__constellationRefit as
                | { field?: { focalIndex: number } }
                | undefined;
            if (!r || !r.field) return { ok: false, changes: -1 };
            const field = r.field;
            const nextFrame = () =>
                new Promise<void>((res) => requestAnimationFrame(() => res()));
            const seed = field.focalIndex;
            let changes = 0;
            const t0 = performance.now();
            while (performance.now() - t0 < 5000) {
                await nextFrame();
                if (field.focalIndex !== seed) changes++;
            }
            return { ok: changes === 0, changes };
        });
        expect(
            prmHeld.ok,
            `under prefers-reduced-motion the focal re-targeted ${prmHeld.changes} time(s) — the cadence advanced under reduce (the WARP precedent: it must NOT advance)`,
        ).toBe(true);
    });
});
