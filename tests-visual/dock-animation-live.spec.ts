// AX.W00 — proof:dock-animation-live, PROMOTED to fail-CLOSED in the π workspace.
//
// keyframes' gate-feasibility PRE-SOLVE (the 181-sample no-morph trap): the dock
// morph is NOT reliably live `getBoundingClientRect`-measurable because (a) native
// View-Transitions run on `::view-transition-*` SNAPSHOTS invisible to live-element
// geometry, (b) the FLIP SpringProgress clock is glass-ui-internal with no public
// handle, (c) the state machine ignores SYNTHETIC pointer events and gates collapse
// behind a delay. So this spec drives the morph DETERMINISTICALLY:
//
//   1. FORCE the readable FLIP arm — `page.addInitScript` deletes
//      `Document.startViewTransition` BEFORE the app boots, so the composable reads
//      NATIVE_VT=false (the live-DOM-measurable FLIP path) on first mount.
//   2. REAL `page.hover` on the collapsed dock (the state machine ignores synthetic
//      dispatch; expand-on-hover is IMMEDIATE so no collapse-delay lowering needed).
//   3. Sample the dock-ROOT box geometry (bounding width + padding-inline +
//      border-radius) AND a representative child's opacity on the SAME rAF timeline.
//   4. Assert the morph ONSETS in the same frame (lead/lag ≤ 1 frame ≈ 16.7ms).
//
// PLUS the flake-free SECONDARY — the `--spring-dock` linear() token-peak parse —
// runs in proof-substrate's sibling driver / proof-dock-animation-live.mjs (it has
// no rAF flake surface). This spec carries the live-rAF arm; the .mjs carries the
// token-peak + structure pre-checks.

import { test, expect } from "@playwright/test";
import { PI_TARGETS } from "./pi-manifest.ts";

const FRAME_MS = 1000 / 60; // ≈16.7ms
const LEAD_LAG_FRAMES = 1; // the charter's ideal; a live scheduler split is absorbed by +1
const MIN_MORPH_FRAMES = 3; // the box AND the child opacity must each move over ≥3 frames

test.describe("dock-animation-live (π lane — fail-CLOSED, deterministic-drive)", () => {
    test.beforeEach(async ({ page }) => {
        // (1) Force the FLIP arm BEFORE the app boots — the most robust point to
        // remove startViewTransition (the in-page delete races the composable's
        // first read). Walk the chain so the prototype copy is gone too.
        await page.addInitScript(() => {
            try {
                // own prop
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
                /* non-configurable on this engine — the spec asserts vtForcedOff below */
            }
        });
    });

    test("the dock box and a child opacity morph on ONE clock (lead/lag ≤ 1 frame)", async ({
        page,
    }) => {
        await page.goto(PI_TARGETS.dock.path);
        // The first <GlassDock> on the dock story is the bare COLLAPSIBLE one.
        const collapsedSel = ".glass-dock.collapsed";
        await page.waitForSelector(collapsedSel, { timeout: 15_000 });

        // Confirm the FLIP arm actually applied (guard a false-positive: if
        // startViewTransition is non-configurable the live-DOM timeline is the VT
        // snap, not the FLIP path, and a width-freeze assert would false-RED).
        const vtForcedOff = await page.evaluate(
            () => !("startViewTransition" in document),
        );
        expect(
            vtForcedOff,
            "could not force the FLIP path (startViewTransition not removable) — the live-DOM box timeline is not the FLIP path on this engine",
        ).toBe(true);

        // (2) REAL hover — expand-on-hover is immediate. Hover the collapsed dock and
        // (3) rAF-sample the ROOT box (bounding width) + a representative animated
        // child's opacity on the SAME timeline. Under the clip-reveal model the
        // LEAVING pane (`.dock-layer--summary`) fades; if it is absent the active
        // `.dock-layers` width morph alone carries the box axis and we sample the
        // root opacity as the child axis.
        const box = page.locator(collapsedSel).first();
        await box.scrollIntoViewIfNeeded();

        // Start sampling, then trigger the real hover from the test driver.
        const samplingDone = page.evaluate(
            ({ frameMs }) => {
                return new Promise<{
                    times: number[];
                    widths: number[];
                    radii: number[];
                    padInline: number[];
                    childOpacities: number[];
                    W0: number;
                    W1: number;
                }>((resolve) => {
                    const dock = [
                        ...document.querySelectorAll(".glass-dock"),
                    ].find((d) => d.classList.contains("collapsed")) as
                        | HTMLElement
                        | undefined;
                    if (!dock) {
                        resolve({
                            times: [],
                            widths: [],
                            radii: [],
                            padInline: [],
                            childOpacities: [],
                            W0: 0,
                            W1: 0,
                        });
                        return;
                    }
                    const layers =
                        (dock.querySelector(".dock-layers") as HTMLElement) ??
                        dock;
                    const leaving =
                        (dock.querySelector(
                            ".dock-layer--summary",
                        ) as HTMLElement) ?? dock;
                    const rootCs = () => getComputedStyle(dock);
                    const wOf = () => layers.getBoundingClientRect().width;
                    const radOf = () =>
                        parseFloat(rootCs().borderTopLeftRadius) || 0;
                    const padOf = () =>
                        parseFloat(rootCs().paddingLeft) || 0;
                    const childOf = () =>
                        parseFloat(getComputedStyle(leaving).opacity);

                    const times: number[] = [];
                    const widths: number[] = [];
                    const radii: number[] = [];
                    const padInline: number[] = [];
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
                        radii.push(radOf());
                        padInline.push(padOf());
                        childOpacities.push(childOf());
                        if (Math.abs(w - lastW) < 0.5) stable++;
                        else stable = 0;
                        lastW = w;
                        if (stable >= 5 || t > 2000) {
                            resolve({
                                times,
                                widths,
                                radii,
                                padInline,
                                childOpacities,
                                W0,
                                W1: w,
                            });
                        } else requestAnimationFrame(f);
                    };
                    requestAnimationFrame(f);
                });
            },
            { frameMs: FRAME_MS },
        );

        // Trigger the REAL hover one frame after sampling starts (so the first sample
        // is the collapsed baseline).
        await page.waitForTimeout(FRAME_MS);
        await box.hover({ force: true });

        const tl = await samplingDone;

        // The box axis must morph over ≥3 rising frames (a snap/freeze fails).
        const risingWidth = countRising(tl.widths, 0.5);
        expect(
            risingWidth,
            `the dock box width morphed over only ${risingWidth} rising frame(s) (< ${MIN_MORPH_FRAMES}) — the dock SNAPPED / FROZE (W0=${tl.W0} W1=${tl.W1})`,
        ).toBeGreaterThanOrEqual(MIN_MORPH_FRAMES);

        // The representative child opacity must MOVE over ≥3 frames (rising or
        // falling — the leaving pane fades, an entering pane rises). A static child
        // opacity means the box morphed without its content — a desync.
        const movingChild = countChanging(tl.childOpacities, 0.01);
        expect(
            movingChild,
            `the representative child opacity moved over only ${movingChild} frame(s) (< ${MIN_MORPH_FRAMES}) — the box morphed on a DIFFERENT clock than its content (the desync class)`,
        ).toBeGreaterThanOrEqual(MIN_MORPH_FRAMES);

        // LEAD/LAG: the box-morph onset frame and the child-morph onset frame must
        // co-occur within ≤1 frame — the single-clock assert (the desynced clock the
        // wave's RED witness produces fails HERE).
        const boxOnset = onsetTime(tl.times, tl.widths, 0.5);
        const childOnset = onsetTime(tl.times, tl.childOpacities, 0.01);
        const leadLagMs = Math.abs(boxOnset - childOnset);
        expect(
            leadLagMs,
            `the box morph onset (${boxOnset.toFixed(1)}ms) and the child morph onset (${childOnset.toFixed(1)}ms) are ${leadLagMs.toFixed(1)}ms apart (> ${(LEAD_LAG_FRAMES * FRAME_MS).toFixed(1)}ms = ${LEAD_LAG_FRAMES} frame) — the morph is NOT on one clock (desync)`,
        ).toBeLessThanOrEqual(LEAD_LAG_FRAMES * FRAME_MS + 1e-3);
    });
});

/** Count frame-to-frame INCREASES above eps (rising-frame width morph witness). */
function countRising(series: number[], eps: number): number {
    let n = 0;
    for (let i = 1; i < series.length; i++)
        if (series[i]! - series[i - 1]! > eps) n++;
    return n;
}

/** Count frame-to-frame |Δ| above eps (a property MOVING, either direction). */
function countChanging(series: number[], eps: number): number {
    let n = 0;
    for (let i = 1; i < series.length; i++)
        if (Math.abs(series[i]! - series[i - 1]!) > eps) n++;
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
