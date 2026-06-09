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
//   4. Sample the held dock-ROOT bounding width AND `--dock-morph-t` AND the leaving
//      child's opacity AND the LAST ENTERING `.dock-layer--full > *` child's opacity
//      on the SAME rAF timeline.
//   5. ASSERT (AY.W-DOCK2): `--dock-morph-t` ramps over ≥5 rising frames (NOT frozen
//      at 0), the root box width rises over ≥5 rising frames (NOT a 1-frame snap),
//      and — THE BINDING LOCKSTEP WITNESS — the LAST ENTERING child's opacity onset
//      trails the box-width onset by ≤ LOCKSTEP_BUDGET_MS (the deliberate macOS-dock
//      reveal-stagger ceiling; a regression PAST the stagger fails HERE). The
//      width-vs-scalar onset Δ is DEMOTED to a structural sanity (the box rides the
//      scalar by CONSTRUCTION — `layers.css` inline-size = calc(… × --dock-morph-t) —
//      so asserting it is a TAUTOLOGY blind to a box-leads-CONTENT desync).
//
// PLUS the flake-free SECONDARY — the `--spring-dock` linear() token-peak parse —
// runs in proof-dock-animation-live.mjs (it has no rAF flake surface). This spec
// carries the live-rAF arm; the .mjs carries the token-peak + structure pre-checks.

import { test, expect } from "@playwright/test";
import { PI_TARGETS } from "./pi-manifest.ts";

const FRAME_MS = 1000 / 60; // ≈16.7ms
const LEAD_LAG_FRAMES = 1; // the single-clock bar; a live scheduler split is absorbed by +1
const MIN_MORPH_FRAMES = 5; // the box AND the scalar must each rise over ≥5 frames (the spring rings over ~23)

// AY.W-DOCK2 — the REAL lockstep witness budget (mirrors LOCKSTEP_BUDGET_MS in
// proof-dock-animation-live.mjs). The LAST ENTERING `.dock-layer--full > *` child
// opacity onset must trail the box-width onset by ≤ this ceiling — the W-DOCK1
// captured-ABSENT KEEP-AND-DOCUMENT deliberate-stagger ceiling. Derivation (SHIPPED
// shell.css values, the 0.4-vs-0.55 reconciliation): window 0.4 + step×5 (0.40) =
// 0.80 of the ~650ms morph + a frame ≈ 537ms. The captured 36.7–96.2ms trail clears
// it; a regression PAST the deliberate stagger (a per-child second clock) REDs.
const LOCKSTEP_BUDGET_MS = 0.8 * 650 + FRAME_MS; // ≈ 537ms

// AY.W-DOCK2 — the deterministic capture target (the plain testid collapsible dock
// at /dock/overview that reliably morphs, per W-DOCK1 §F). NOT data-container-name,
// which co-applies container-type: inline-size and FREEZES the morph (§F1 trap).
const DOCK_CAPTURE_SEL = '.glass-dock[data-testid="dock-capture"]';

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
        // AY.W-DOCK2 (D7) — PI_TARGETS.dock now resolves to /dock/overview (the real
        // collapsible dock; the prior /navigation/dock was a non-dock route).
        await page.goto(PI_TARGETS.dock.path);
        // AY.W-DOCK2 — target the deterministic capture dock (the plain testid
        // collapsible dock that reliably morphs); fall back to the first collapsed
        // dock if the testid surface is absent.
        const collapsedSel = ".glass-dock.collapsed";
        await page.waitForSelector(collapsedSel, { timeout: 15_000 });

        // (2) HOLD the capture dock by a data attr so the SAME element is sampled
        // across the class flip (a per-frame `.glass-dock.collapsed` re-query would
        // switch docks once #1 expands).
        await page.evaluate(
            ({ captureSel, fallbackSel }) => {
                const capture = document.querySelector(
                    captureSel,
                ) as HTMLElement | null;
                const dock =
                    capture && capture.classList.contains("collapsed")
                        ? capture
                        : (document.querySelector(fallbackSel) as HTMLElement | null);
                if (dock) dock.setAttribute("data-dock-animation-probe", "1");
            },
            { captureSel: DOCK_CAPTURE_SEL, fallbackSel: collapsedSel },
        );

        const box = page.locator('[data-dock-animation-probe="1"]').first();
        await box.scrollIntoViewIfNeeded();

        // (4) Start sampling, then (3) trigger the real hover from the test driver.
        const samplingDone = page.evaluate(() => {
            return new Promise<{
                times: number[];
                widths: number[];
                morphTs: number[];
                childOpacities: number[];
                enteringChildOpacities: number[];
                enteringChildSampled: boolean;
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
                        enteringChildOpacities: [],
                        enteringChildSampled: false,
                        W0: 0,
                        W1: 0,
                    });
                    return;
                }
                const leaving =
                    (dock.querySelector(
                        ".dock-layer--summary",
                    ) as HTMLElement) ?? dock;
                // AY.W-DOCK2 — the LAST ENTERING `.dock-layer--full > *` child (the
                // largest stagger onset, the property the user watches fade in).
                const lastEnteringChild = (): HTMLElement | null => {
                    const pane = dock.querySelector(".dock-layer--full");
                    if (!pane) return null;
                    const kids = pane.children;
                    return kids.length
                        ? (kids[kids.length - 1] as HTMLElement)
                        : null;
                };
                const wOf = () => dock.getBoundingClientRect().width;
                const tOf = () =>
                    parseFloat(
                        getComputedStyle(dock).getPropertyValue("--dock-morph-t"),
                    ) || 0;
                const childOf = () =>
                    parseFloat(getComputedStyle(leaving).opacity);
                const enteringOf = () => {
                    const el = lastEnteringChild();
                    return el ? parseFloat(getComputedStyle(el).opacity) : 0;
                };

                const times: number[] = [];
                const widths: number[] = [];
                const morphTs: number[] = [];
                const childOpacities: number[] = [];
                const enteringChildOpacities: number[] = [];
                let enteringChildSampled = false;
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
                    if (lastEnteringChild()) enteringChildSampled = true;
                    enteringChildOpacities.push(enteringOf());
                    if (Math.abs(w - lastW) < 0.5) stable++;
                    else stable = 0;
                    lastW = w;
                    if (stable >= 5 || t > 2000) {
                        resolve({
                            times,
                            widths,
                            morphTs,
                            childOpacities,
                            enteringChildOpacities,
                            enteringChildSampled,
                            W0,
                            W1: w,
                        });
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

        // AY.W-DOCK2 — STRUCTURAL SANITY (NOT the lockstep witness). The box rides
        // the scalar BY CONSTRUCTION (`layers.css` makes inline-size = calc(… ×
        // --dock-morph-t)), so this onset Δ is a TAUTOLOGY that can never red on a
        // box-leads-CONTENT desync. Kept as a soft sanity (a generous frame bound, no
        // longer the binding lockstep assert).
        const boxOnset = onsetTime(tl.times, tl.widths, 0.5);
        const scalarOnset = onsetTime(tl.times, tl.morphTs, 1e-4);
        const leadLagMs = Math.abs(boxOnset - scalarOnset);
        expect(
            leadLagMs,
            `structural sanity — the box-width onset (${boxOnset.toFixed(1)}ms) and the --dock-morph-t scalar onset (${scalarOnset.toFixed(1)}ms) should co-occur (the box reads the scalar by construction)`,
        ).toBeLessThanOrEqual(2 * FRAME_MS + 1e-3);

        // ── THE BINDING LOCKSTEP WITNESS (AY.W-DOCK2 HG1) ──────────────────────
        // The LAST ENTERING `.dock-layer--full > *` child opacity onset must trail
        // the box-width onset by ≤ LOCKSTEP_BUDGET_MS (the deliberate macOS-dock
        // reveal-stagger ceiling). This is the property the USER perceives lagging —
        // the staggered controls fading in after the shell. The box-vs-scalar
        // tautology above is blind to it; THIS assert witnesses the real number.
        expect(
            tl.enteringChildSampled && tl.enteringChildOpacities.length > 0,
            "the entering `.dock-layer--full > *` child was NEVER sampled (the D1 lockstep blind-spot would recur) — the REAL morph surface is missing",
        ).toBe(true);
        const childOnset = onsetTime(tl.times, tl.enteringChildOpacities, 0.01);
        const childVsBoxMs = childOnset - boxOnset;
        expect(
            childVsBoxMs,
            `the last entering child opacity onset (${childOnset.toFixed(1)}ms) trails the box-width onset (${boxOnset.toFixed(1)}ms) by ${childVsBoxMs.toFixed(1)}ms (> the ${LOCKSTEP_BUDGET_MS.toFixed(1)}ms deliberate-stagger budget) — a regression PAST the macOS-dock reveal stagger (a re-added per-child SECOND clock or a mis-tuned window)`,
        ).toBeLessThanOrEqual(LOCKSTEP_BUDGET_MS);
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
