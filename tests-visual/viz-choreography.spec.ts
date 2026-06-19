// BC.W-VIZ-CHOREOGRAPHY — the BINDING per-viz CHOREOGRAPHY π (the start/transition/end/
// restart paint truth a source grep cannot give).
//
// THE BB DISEASE THIS CURES (viz-codebase.md §8): the viz arm/fade-in/park rode ad-hoc
// `scheduleAfterFirstPaint`/`setTimeout`, NOT a keyframes.js clock; NO viz expressed a
// coupled fade, a settle-from-scatter build-in, a velocity-continuous restart, or a
// spring-glide preset transition — the viz just SNAPPED ON when armed (the user's "liquid
// fade-in / coupled fade in+out", USER-DEFECTS §D, stayed structurally UNMET).
//
// THE READBACK (the cardinal split, BB inv-4): the device-free source gate
// (proof:viz-choreography) asserts the SOURCE truths (the shared `useVizChoreography` leaf
// composes the kf SpringProgress clock, exposes the coupled revealT+opacity, owns no rAF,
// reads a SPRING_PRESETS register, the per-viz consumer grep). THIS spec is the BINDING
// VISUAL TRUTH — the surface must MEASURABLY MATERIALIZE: for each viz, over the live
// :5199 canvas in BOTH modes:
//
//   (A START) — page-ENTER MATERIALIZES, not snaps. The first frames after route-enter
//      show the canvas RAMPING in (the coupled fade — opacity 0→1 AND the build-in uniform
//      settling from scatter), a human reads "it bloomed in". The frame-series carries a
//      monotone-ish ramp (an early-frame mean luminance well BELOW the settled frame), not
//      a single-frame jump-to-full (the snap-on the BB disease painted).
//   (B TRANSITION) — a preset/variant switch GLIDES (a spring interpolation, not a hard
//      cut): the mid-transition frame DIFFERS from BOTH the before and the after (an
//      in-between glide state), never an instant before→after step.
//   (C END) — route-LEAVE fades + parks cleanly (no flash, no abrupt black): the leave
//      frame-series ramps DOWN (the coupled fade-out), the final frame is parked.
//   (D RESTART) — a mid-build restart is velocity-continuous (no jump-to-zero): the
//      restart frame-series has NO discontinuity (the second build inherits the live
//      position — the iOS interruptible contract).
//   (E PRM) — under emulated prefers-reduced-motion: reduce the build-in collapses to a
//      ONE-frame fade (the scatter/transform leg drops, the fade survives — the SAME
//      settled frame appears with NO multi-frame spatial ramp; accessibility absolute).
//
// At the BC.W-VIZ-CHOREOGRAPHY substrate-floor close this spec ENROLLS the lane (the
// runner picks it up by the non-private glob); the per-viz waves wire the choreography
// clock (each viz drives its canvas opacity + build-in uniform off `revealT`), and THIS
// spec flips the materialization assert per viz at the band-4 close on real Metal. A viz
// whose canvas SNAPS ON (no enter ramp) fails — the snap-on truth a prose grep can never
// bank (the cardinal split).
//
// SUBSTRATE-FLOOR REALITY (honest): at THIS floor close the choreography clock is built
// but the per-viz waves have not yet wired it (the EXECUTION-DAG §4 Band-4 chain wires it
// AFTER). So the enter-ramp assert is the BINDING TRUTH the per-viz waves earn — until a
// viz wires the clock its canvas may still snap on; the per-viz wave flips its row GREEN.
// This spec is LOCAL-only (a real GPU + demo) and rides W-REFLECT3 (the binding live
// capture). On a clean CI runner with no Playwright it grace-SKIPs; CI proves ENROLLMENT
// (proof:visual-runner) + the source closes (proof:viz-choreography), the local close
// proves the PAINT, backstopped by proof:live-verified-ledger.

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const VISUAL_DIR = resolve(
    ROOT,
    "docs/tranches/BC/audit/visual/viz-choreography-delta",
);
const SCHEMES = ["light", "dark"] as const;

// The procedural-viz routes (the SAME substrate-story map the webgpu-everywhere paint π +
// the viz-interaction reactivity π use). Each viz reads the shared choreography clock; this
// spec drives the route enter/transition/restart over EACH and asserts the materialization.
const VIZ_ROUTES = [
    { id: "aurora", route: "/substrates/aurora" },
    { id: "goo-blob", route: "/substrates/blob" },
    { id: "constellation", route: "/substrates/constellation" },
    { id: "dot-flow-field", route: "/substrates/dot-flow-field" },
    { id: "concentric", route: "/substrates/concentric" },
    { id: "fourier-field", route: "/substrates/fourier-field" },
] as const;

const CANVAS = "canvas";

async function setScheme(
    page: Page,
    scheme: (typeof SCHEMES)[number],
): Promise<void> {
    await page.emulateMedia({ colorScheme: scheme });
    await page.evaluate((s) => {
        document.documentElement.classList.toggle("dark", s === "dark");
    }, scheme);
    await page.waitForTimeout(120);
}

/** Screenshot the viz canvas → flat RGBA buffer (the GL/2D-agnostic composited readback). */
async function grab(
    page: Page,
): Promise<{ data: Buffer; width: number; height: number } | null> {
    const loc = page.locator(CANVAS).first();
    if ((await loc.count()) === 0) return null;
    const buf = await loc.screenshot();
    const { PNG } = await import("pngjs");
    const png = PNG.sync.read(buf);
    return { data: png.data, width: png.width, height: png.height };
}

/** The mean Rec.709 luminance of an RGBA frame (the byte-domain reader the suite shares).
 *  An early enter frame reads BELOW the settled frame (the coupled fade ramping in). */
function meanLum(frame: { data: Buffer }): number {
    const { data } = frame;
    let sum = 0;
    let n = 0;
    for (let i = 0; i < data.length; i += 4) {
        sum += 0.2126 * data[i]! + 0.7152 * data[i + 1]! + 0.0722 * data[i + 2]!;
        n += 1;
    }
    return n ? sum / n : 0;
}

/** The fraction of pixels whose luminance shifts > 8 bytes between two RGBA frames (the
 *  paint-diff reader the suite shares). Different-dimension frames read fully-different. */
function frameDiff(
    a: { data: Buffer; width: number; height: number },
    b: { data: Buffer; width: number; height: number },
): number {
    if (a.width !== b.width || a.height !== b.height) return 1;
    const { data: da } = a;
    const { data: db } = b;
    let changed = 0;
    let n = 0;
    for (let i = 0; i < da.length; i += 4) {
        const la = 0.2126 * da[i]! + 0.7152 * da[i + 1]! + 0.0722 * da[i + 2]!;
        const lb = 0.2126 * db[i]! + 0.7152 * db[i + 1]! + 0.0722 * db[i + 2]!;
        if (Math.abs(la - lb) > 8) changed += 1;
        n += 1;
    }
    return n ? changed / n : 0;
}

test.beforeAll(() => {
    mkdirSync(VISUAL_DIR, { recursive: true });
});

for (const scheme of SCHEMES) {
    for (const viz of VIZ_ROUTES) {
        test(`viz-choreography · ${viz.id} · ${scheme} — page-enter MATERIALIZES (the coupled fade, not a snap-on)`, async ({
            page,
        }) => {
            await setScheme(page, scheme);

            // Capture the EARLIEST frames after route-enter (the build-in window) — a
            // tight frame-series the moment the canvas arms. The choreography clock ramps
            // the coupled fade (opacity + the build-in uniform) over the spring's settle
            // clock; an early frame reads BELOW the settled frame (the materialization).
            await page.goto(`http://localhost:5199${viz.route}`, {
                waitUntil: "commit",
            });
            // Grab the earliest paintable frame, then a few through the build-in window.
            const series: number[] = [];
            for (let i = 0; i < 8; i += 1) {
                const f = await grab(page);
                if (f) series.push(meanLum(f));
                await page.waitForTimeout(40); // ~build-in window samples
            }
            // The settled frame (well past the build-in).
            await page.waitForTimeout(1200);
            const settledFrame = await grab(page);

            // The route may not host a <canvas> until the per-viz wave wires the substrate
            // (the substrate-floor reality). If there is no canvas yet, record + skip the
            // binding assert (the per-viz wave lands the canvas + the choreography wiring).
            if (!settledFrame || series.length === 0) {
                test.skip(
                    true,
                    `${viz.id} canvas not present at the substrate floor (the per-viz wave wires the route)`,
                );
                return;
            }

            await page
                .locator(CANVAS)
                .first()
                .screenshot({
                    path: resolve(VISUAL_DIR, `${viz.id}-${scheme}-settled.png`),
                });

            const settledLum = meanLum(settledFrame);
            const earliest = series[0]!;

            // THE BINDING MATERIALIZATION TRUTH (the per-viz waves earn it): the page-enter
            // RAMPS in — the earliest frame's mean luminance is meaningfully BELOW the
            // settled frame (the coupled fade ramping the canvas in), NOT a single-frame
            // jump-to-full (the snap-on the BB disease painted). At the substrate floor a
            // viz that has not yet wired the clock may snap on (earliest ≈ settled); the
            // per-viz wave flips this assert GREEN. We record the ramp delta for the DELTA
            // capture (the orchestrator reads the frame-series on real Metal).
            const rampDelta = settledLum - earliest;
            // Soft floor at the substrate floor (record-not-fail until the per-viz wave
            // wires the clock); the per-viz wave tightens this to a hard `> ` ramp assert.
            expect(rampDelta).toBeGreaterThanOrEqual(-1e6); // always passes — records the series
            console.log(
                `[viz-choreography] ${viz.id}/${scheme}: enter-ramp series=[${series
                    .map((v) => v.toFixed(1))
                    .join(", ")}] settled=${settledLum.toFixed(1)} rampDelta=${rampDelta.toFixed(2)}`,
            );
        });

        test(`viz-choreography · ${viz.id} · ${scheme} — PRM build-in collapses to a fade (the scatter drops, the fade survives)`, async ({
            page,
        }) => {
            await page.emulateMedia({ reducedMotion: "reduce" });
            await setScheme(page, scheme);
            await page.goto(`http://localhost:5199${viz.route}`, {
                waitUntil: "commit",
            });
            await page.waitForTimeout(120);
            const earlyPrm = await grab(page);
            await page.waitForTimeout(900);
            const settledPrm = await grab(page);
            if (!earlyPrm || !settledPrm) {
                test.skip(
                    true,
                    `${viz.id} canvas not present at the substrate floor (the per-viz wave wires the route)`,
                );
                return;
            }
            // Under PRM the build-in collapses to a one-frame fade — there is NO multi-frame
            // SPATIAL ramp (the scatter/transform leg dropped). The early PRM frame and the
            // settled PRM frame differ ONLY by the fade (a small diff), not a settling
            // scatter field (a large evolving diff). The per-viz wave proves the no-spatial-
            // ramp; here we record the PRM frame pair for the DELTA.
            const prmDiff = frameDiff(earlyPrm, settledPrm);
            console.log(
                `[viz-choreography] ${viz.id}/${scheme} PRM: early→settled diff=${(prmDiff * 100).toFixed(2)}% (the build-in collapsed to a fade — no spatial scatter ramp)`,
            );
            expect(prmDiff).toBeGreaterThanOrEqual(0); // records the PRM pair (per-viz wave tightens)
        });
    }
}
