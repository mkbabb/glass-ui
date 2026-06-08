// AX.W01 — proof:dock-animation-live, the live-rAF arm in the π workspace,
// re-authored to the SINGLE-SCALAR `--dock-morph-t` architecture.
//
// The dock collapse↔expand morph is now ONE analytic spring whose single normalized
// scalar (`--dock-morph-t`, 0→~1.05→1.0) is written once per frame to the
// `.glass-dock` ROOT and drives EVERY animated axis. The prior VT COLLAPSE fork and
// the `.dock-layers` FLIP-width driver are DELETED (AX.W01). So this spec no longer
// measures VT-group animations or a `.dock-layers` FLIP width — it measures the ROOT
// box geometry against the live `--dock-morph-t` scalar on ONE rAF timeline.
//
// keyframes' gate-feasibility PRE-SOLVE (the 181-sample no-morph trap) still holds:
// the SpringProgress clock is glass-ui-internal with no public handle and the state
// machine ignores SYNTHETIC pointer events. So this spec drives the morph
// DETERMINISTICALLY:
//
//   1. FORCE the readable arm — `page.addInitScript` deletes
//      `Document.startViewTransition` BEFORE the app boots (KISS — one fewer source
//      of route-morph noise; the morph is spring-driven on every engine now).
//   2. HOLD the dock by a data attr on the FIRST `.glass-dock.collapsed`, then sample
//      THAT element across the `.collapsed`→`.expanded` class flip. Re-querying
//      `.glass-dock.collapsed` each frame is a TRAP — once dock #1 expands the
//      selector resolves to a DIFFERENT collapsed dock and the timeline jumps.
//   3. REAL `page.hover` on the held collapsed dock (expand-on-hover is IMMEDIATE).
//   4. Sample the held dock-ROOT bounding width AND `--dock-morph-t` AND a
//      representative leaving child's opacity on the SAME rAF timeline.
//   5. ASSERT: `--dock-morph-t` ramps over ≥5 rising frames (NOT frozen at 0), the
//      root box width rises over ≥5 rising frames (NOT a 1-frame snap), and the
//      width-onset and the scalar-onset co-occur within ≤1 frame (the single-clock
//      assert — the box rides the scalar; the box-leads-content desync fails HERE).
//
// PLUS the flake-free SECONDARY — the `--spring-dock` linear() token-peak parse —
// runs in proof-dock-animation-live.mjs (it has no rAF flake surface). This spec
// carries the live-rAF arm; the .mjs carries the token-peak + structure pre-checks.

import { test, expect } from "@playwright/test";
import { PI_TARGETS } from "./pi-manifest.ts";

const FRAME_MS = 1000 / 60; // ≈16.7ms
const LEAD_LAG_FRAMES = 1; // the single-clock bar; a live scheduler split is absorbed by +1
const MIN_MORPH_FRAMES = 5; // the box AND the scalar must each rise over ≥5 frames (the spring rings over ~23)

test.describe("dock-animation-live (π lane — single-scalar, fail-CLOSED)", () => {
    test.beforeEach(async ({ page }) => {
        // (1) Force the readable arm BEFORE the app boots — the most robust point to
        // remove startViewTransition (the in-page delete races the first read).
        await page.addInitScript(() => {
            try {
                if (
                    Object.prototype.hasOwnProperty.call(
                        document,
                        "startViewTransition",
                    )
                ) {
                    // @ts-expect-error — deliberately removing the API
                    delete document.startViewTransition;
                }
                let p: object | null = Object.getPrototypeOf(document);
                while (p) {
                    if (
                        Object.prototype.hasOwnProperty.call(
                            p,
                            "startViewTransition",
                        )
                    ) {
                        // @ts-expect-error — deliberately removing the API on the proto
                        delete (p as { startViewTransition?: unknown })
                            .startViewTransition;
                        break;
                    }
                    p = Object.getPrototypeOf(p);
                }
            } catch {
                /* non-configurable on this engine */
            }
        });
    });

    test("the dock box and --dock-morph-t morph on ONE clock (lead/lag ≤ 1 frame)", async ({
        page,
    }) => {
        await page.goto(PI_TARGETS.dock.path);
        // The first <GlassDock> on the dock story is the bare COLLAPSIBLE one.
        const collapsedSel = ".glass-dock.collapsed";
        await page.waitForSelector(collapsedSel, { timeout: 15_000 });

        // (2) HOLD the FIRST collapsed dock by a data attr so the SAME element is
        // sampled across the class flip (a per-frame `.glass-dock.collapsed` re-query
        // would switch docks once #1 expands).
        await page.evaluate((sel) => {
            const dock = document.querySelector(sel) as HTMLElement | null;
            if (dock) dock.setAttribute("data-dock-animation-probe", "1");
        }, collapsedSel);

        const box = page.locator('[data-dock-animation-probe="1"]').first();
        await box.scrollIntoViewIfNeeded();

        // (4) Start sampling, then (3) trigger the real hover from the test driver.
        const samplingDone = page.evaluate(() => {
            return new Promise<{
                times: number[];
                widths: number[];
                morphTs: number[];
                childOpacities: number[];
                W0: number;
                W1: number;
            }>((resolve) => {
                const dock = document.querySelector(
                    '[data-dock-animation-probe="1"]',
                ) as HTMLElement | null;
                if (!dock) {
                    resolve({
                        times: [],
                        widths: [],
                        morphTs: [],
                        childOpacities: [],
                        W0: 0,
                        W1: 0,
                    });
                    return;
                }
                const leaving =
                    (dock.querySelector(
                        ".dock-layer--summary",
                    ) as HTMLElement) ?? dock;
                const wOf = () => dock.getBoundingClientRect().width;
                const tOf = () =>
                    parseFloat(
                        getComputedStyle(dock).getPropertyValue("--dock-morph-t"),
                    ) || 0;
                const childOf = () =>
                    parseFloat(getComputedStyle(leaving).opacity);

                const times: number[] = [];
                const widths: number[] = [];
                const morphTs: number[] = [];
                const childOpacities: number[] = [];
                const W0 = wOf();
                const t0 = performance.now();
                let stable = 0;
                let lastW = W0;
                const f = () => {
                    const t = performance.now() - t0;
                    const w = wOf();
                    times.push(t);
                    widths.push(w);
                    morphTs.push(tOf());
                    childOpacities.push(childOf());
                    if (Math.abs(w - lastW) < 0.5) stable++;
                    else stable = 0;
                    lastW = w;
                    if (stable >= 5 || t > 2000) {
                        resolve({ times, widths, morphTs, childOpacities, W0, W1: w });
                    } else requestAnimationFrame(f);
                };
                requestAnimationFrame(f);
            });
        });

        // Trigger the REAL hover one frame after sampling starts (so the first sample
        // is the collapsed baseline).
        await page.waitForTimeout(FRAME_MS);
        await box.hover({ force: true });

        const tl = await samplingDone;

        // `--dock-morph-t` must RAMP over ≥5 rising frames (the spring scalar, not a
        // frozen-at-0 snap).
        const risingScalar = countRising(tl.morphTs, 1e-4);
        expect(
            risingScalar,
            `--dock-morph-t ramped over only ${risingScalar} rising frame(s) (< ${MIN_MORPH_FRAMES}) — the single-scalar spring did NOT run (frozen at 0; the snap/desync regression)`,
        ).toBeGreaterThanOrEqual(MIN_MORPH_FRAMES);

        // The root box width must rise over ≥5 rising frames (a snap/freeze fails).
        const risingWidth = countRising(tl.widths, 0.5);
        expect(
            risingWidth,
            `the dock-root box width rose over only ${risingWidth} rising frame(s) (< ${MIN_MORPH_FRAMES}) — the box SNAPPED / FROZE (W0=${tl.W0} W1=${tl.W1})`,
        ).toBeGreaterThanOrEqual(MIN_MORPH_FRAMES);

        // SINGLE CLOCK: the box-morph onset frame and the scalar-onset frame must
        // co-occur within ≤1 frame — the box rides the scalar by construction under
        // the single-scalar morph, so any onset skew is the box-leads-content desync.
        const boxOnset = onsetTime(tl.times, tl.widths, 0.5);
        const scalarOnset = onsetTime(tl.times, tl.morphTs, 1e-4);
        const leadLagMs = Math.abs(boxOnset - scalarOnset);
        expect(
            leadLagMs,
            `the box-width onset (${boxOnset.toFixed(1)}ms) and the --dock-morph-t scalar onset (${scalarOnset.toFixed(1)}ms) are ${leadLagMs.toFixed(1)}ms apart (> ${(LEAD_LAG_FRAMES * FRAME_MS).toFixed(1)}ms = ${LEAD_LAG_FRAMES} frame) — the box does NOT ride the scalar on one clock (the box-leads-content desync)`,
        ).toBeLessThanOrEqual(LEAD_LAG_FRAMES * FRAME_MS + 1e-3);
    });
});

/** Count frame-to-frame INCREASES above eps (rising-frame morph witness). */
function countRising(series: number[], eps: number): number {
    let n = 0;
    for (let i = 1; i < series.length; i++)
        if (series[i]! - series[i - 1]! > eps) n++;
    return n;
}

/** The timestamp at which |series - series[0]| first exceeds eps — the onset frame. */
function onsetTime(times: number[], series: number[], eps: number): number {
    const from = series[0] ?? 0;
    for (let i = 1; i < series.length; i++) {
        if (Math.abs(series[i]! - from) > eps) return times[i]!;
    }
    return times[times.length - 1] ?? 0;
}
