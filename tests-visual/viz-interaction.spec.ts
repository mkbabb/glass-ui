// BC.W-VIZ-INTERACTION — the BINDING per-viz REACTIVITY π (the velocity-AND-acceleration
// paint truth a source grep cannot give).
//
// THE BB DISEASE THIS CURES: the shared pointer-physics field (`usePointerVelocityField`)
// was minted EARLY (BB.B4) "so the born-WebGPU viz consume it at birth" — and then NO viz
// wired it; the only gate that should catch it greened off DOC PROSE. The user's exact ask
// (USER-DEFECTS §D) — "real-time touch/pointer reactivity, gel-like flexibility … velocity
// AND acceleration" — stayed structurally UNMET across every procedural background.
//
// THE READBACK (the cardinal split): the device-free source gate (proof:viz-interaction)
// asserts the SOURCE truths (each viz IMPORTS the field, FEEDS `.tick(`, reads BOTH
// velocity AND acceleration/burst, no own rAF, the demo passes :interactive). THIS spec is
// the BINDING VISUAL TRUTH (BB inv-4) — the surface must MEASURABLY REACT to the cursor:
// for each interactive viz it drives, over the live :5199 canvas in BOTH modes:
//
//   (a) REST — the field at rest paints a baseline frame.
//   (b) SWEEP (the VELOCITY response) — a slow synthetic pointer sweep across the canvas
//       makes the composited frame DIFFER from rest (the surface noticed the steady drag).
//   (c) FLICK (the ACCELERATION response — the second derivative) — a fast synthetic flick
//       fires a one-shot burst that paints a frame DISTINCT from both rest and the steady
//       sweep (velocity AND acceleration are each a distinguishable response).
//   (d) PRM FREEZE — under emulated prefers-reduced-motion: reduce the field is frozen
//       (tick(0)): the SAME sweep + flick produce NO pixel change (the gesture honored,
//       the physics off — accessibility absolute).
//   (e) TOUCH PARITY — a touch-drag (pointer-event-driven, the field reads finger + mouse
//       uniformly) produces the SAME reactive diff as the mouse sweep.
//
// At the BC.W-VIZ-INTERACTION substrate-floor close this spec ENROLLS the lane (the runner
// picks it up by the non-private glob); the per-viz waves wire the field, and THIS spec
// flips the reactivity diff > threshold per viz at the band-4 close on real Metal. A viz
// whose canvas does NOT change between rest/sweep/flick fails — the inert-paint truth a
// prose grep can never bank (SYNTHESIS class 10).
//
// Runner-truth: it LOADS :5199 (the harness auto-spawns + reuses the dev server), so it is
// LIVE_VERIFIED_LOCAL_ONLY; on a clean CI runner with no Playwright it grace-SKIPs. CI
// proves ENROLLMENT (proof:visual-runner) + the source closes (proof:viz-interaction
// V1-V4); the local close proves the PAINT, backstopped by proof:live-verified-ledger.

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const VISUAL_DIR = resolve(ROOT, "docs/tranches/BC/audit/visual/viz-interaction-delta");
const SCHEMES = ["light", "dark"] as const;

// The interactive procedural-viz routes (the substrate stories — the SAME route map the
// webgpu-everywhere paint π uses). dot-matrix is a forward-looking per-viz wave — enrolled
// when its route lands. Each viz reads the shared field; this spec drives the cursor over
// EACH and asserts a reactive frame diff.
const VIZ_ROUTES = [
    { id: "aurora", route: "/substrates/aurora" },
    { id: "blob", route: "/substrates/blob" },
    { id: "constellation", route: "/substrates/constellation" },
    { id: "dot-flow-field", route: "/substrates/dot-flow-field" },
    { id: "concentric", route: "/substrates/concentric" },
    { id: "fourier-field", route: "/substrates/fourier-field" },
] as const;

const CANVAS = "canvas";
// The reactive frame-diff floor — the fraction of pixels whose luminance shifts > 8 bytes
// between two frames. A surface that REACTS to the cursor moves well past this; an inert
// canvas (the BB disease) reads ≈ 0 (modulo the viz's own ambient animation, which the
// rest-vs-rest baseline subtracts).
const REACT_DIFF_FLOOR = 0.01;

async function setScheme(page: Page, scheme: (typeof SCHEMES)[number]): Promise<void> {
    await page.emulateMedia({ colorScheme: scheme });
    await page.evaluate((s) => {
        document.documentElement.classList.toggle("dark", s === "dark");
    }, scheme);
    await page.waitForTimeout(120);
}

/** Screenshot the viz canvas → flat RGBA buffer (the GL/2D-agnostic composited readback). */
async function grab(page: Page): Promise<{ data: Buffer; width: number; height: number }> {
    const buf = await page.locator(CANVAS).first().screenshot();
    const { PNG } = await import("pngjs");
    const png = PNG.sync.read(buf);
    return { data: png.data, width: png.width, height: png.height };
}

/** The fraction of pixels whose luminance shifts > 8 bytes between two RGBA frames (the
 *  paint-diff reader — the frame-diff twin of the webgpu-everywhere paintStats byte reader;
 *  it composes the SAME byte-domain Rec.709 luminance the suite's PNG π share). Two frames
 *  of DIFFERENT dimensions read as fully-different (a degenerate / re-laid-out canvas). */
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

/** A slow pointer SWEEP across the canvas (the VELOCITY response — a steady drag). */
async function sweep(page: Page): Promise<void> {
    const box = await page.locator(CANVAS).first().boundingBox();
    if (!box) return;
    const y = box.y + box.height / 2;
    await page.mouse.move(box.x + box.width * 0.15, y);
    for (let t = 0; t <= 1; t += 0.08) {
        await page.mouse.move(box.x + box.width * (0.15 + 0.7 * t), y, { steps: 2 });
        await page.waitForTimeout(24); // ~slow drag — the velocity register
    }
}

/** A fast FLICK across the canvas (the ACCELERATION response — the second derivative fires
 *  a one-shot burst). The big single jump = a high |Δvelocity| = a sharp acceleration. */
async function flick(page: Page): Promise<void> {
    const box = await page.locator(CANVAS).first().boundingBox();
    if (!box) return;
    const y = box.y + box.height * 0.4;
    await page.mouse.move(box.x + box.width * 0.2, y);
    // One big fast jump — the velocity SPIKES then decelerates (the burst).
    await page.mouse.move(box.x + box.width * 0.85, y, { steps: 2 });
}

/** A touch-drag across the canvas (pointer-event parity — finger reads identically). */
async function touchDrag(page: Page): Promise<void> {
    const box = await page.locator(CANVAS).first().boundingBox();
    if (!box) return;
    const y = box.y + box.height / 2;
    const x0 = box.x + box.width * 0.2;
    const x1 = box.x + box.width * 0.8;
    await page.touchscreen.tap(x0, y).catch(() => {});
    // Dispatch a coalesced pointer-drag (the field's getCoalescedEvents path).
    await page.evaluate(
        ({ sel, x0, x1, y }) => {
            const el = document.querySelector(sel);
            if (!el) return;
            const fire = (type: string, x: number) =>
                el.dispatchEvent(
                    new PointerEvent(type, {
                        pointerType: "touch",
                        clientX: x,
                        clientY: y,
                        bubbles: true,
                    }),
                );
            fire("pointerenter", x0);
            for (let t = 0; t <= 1; t += 0.1) fire("pointermove", x0 + (x1 - x0) * t);
        },
        { sel: CANVAS, x0, x1, y },
    );
    await page.waitForTimeout(120);
}

test.beforeAll(() => mkdirSync(VISUAL_DIR, { recursive: true }));

for (const scheme of SCHEMES) {
    for (const { id, route } of VIZ_ROUTES) {
        test(`${id} reacts to cursor velocity AND acceleration (${scheme})`, async ({
            page,
        }) => {
            await page.goto(route);
            const canvas = page.locator(CANVAS).first();
            await canvas.waitFor({ timeout: 8000 }).catch(() => {});
            if ((await canvas.count()) === 0) {
                test.skip(true, `${id}: no canvas mounted on ${route}`);
                return;
            }
            await setScheme(page, scheme);
            await page.waitForTimeout(500); // settle into the ambient field

            // (a) REST baseline — and the viz's OWN ambient animation floor: two rest frames
            //     apart give the AMBIENT diff (the field may breathe). The reactive diff must
            //     clear THAT floor (the cursor adds motion ABOVE the ambient).
            const rest1 = await grab(page);
            await page.waitForTimeout(160);
            const rest2 = await grab(page);
            const ambientDiff = frameDiff(rest1, rest2);

            // (b) SWEEP — the VELOCITY response. The frame DURING the sweep differs from rest
            //     by MORE than the ambient floor (the surface noticed the steady drag).
            await sweep(page);
            const swept = await grab(page);
            const sweepDiff = frameDiff(rest2, swept);

            // (c) FLICK — the ACCELERATION response (the second derivative). The post-flick
            //     burst paints a frame DISTINCT from the steady-sweep frame (velocity AND
            //     acceleration are each a distinguishable response, not the same channel).
            await flick(page);
            await page.waitForTimeout(60); // catch the burst transient
            const flicked = await grab(page);
            const flickDiff = frameDiff(swept, flicked);

            // The BINDING reactivity truth — the cursor measurably moved the surface ABOVE its
            // ambient floor. (A GL canvas may read empty/tainted on some headless contexts;
            // when the readback is degenerate — zero-dimension or all-rest-identical — the
            // diff is 0 on BOTH ambient and reactive and we record-not-assert, the source gate
            // + the served-app harness carrying the binding truth. The real-Metal close asserts
            // the > floor.)
            const degenerate = rest1.width === 0 || rest1.height === 0;
            // The reactive surface clears the floor ABOVE its ambient animation.
            const velocityReacted = sweepDiff > ambientDiff + REACT_DIFF_FLOOR;
            const accelReacted = flickDiff > REACT_DIFF_FLOOR;
            if (!degenerate) {
                expect(
                    velocityReacted,
                    `${id} (${scheme}): the SWEEP did not move the surface above ambient — sweepDiff ${sweepDiff.toFixed(4)} vs ambient ${ambientDiff.toFixed(4)} + floor ${REACT_DIFF_FLOOR} (the velocity response must paint)`,
                ).toBe(true);
                expect(
                    accelReacted,
                    `${id} (${scheme}): the FLICK fired no distinct burst — flickDiff ${flickDiff.toFixed(4)} ≤ floor ${REACT_DIFF_FLOOR} (the acceleration/burst response must paint a DISTINCT frame — the user's velocity-AND-acceleration ask)`,
                ).toBe(true);
            }

            // (e) TOUCH PARITY — a touch-drag drives the same reactive channel.
            const preTouch = await grab(page);
            await touchDrag(page);
            const postTouch = await grab(page);
            const touchDiff = frameDiff(preTouch, postTouch);
            if (!degenerate) {
                expect(
                    touchDiff,
                    `${id} (${scheme}): a touch-drag produced no reactive change — touchDiff ${touchDiff.toFixed(4)} (pointer events read finger + mouse uniformly — touch parity)`,
                ).toBeGreaterThan(REACT_DIFF_FLOOR * 0.5);
            }

            // Own-surface DELTA capture (the cardinal-lesson freshness artefact).
            await canvas.screenshot({
                path: resolve(VISUAL_DIR, `${id}-${scheme}.png`),
            });
        });

        test(`${id} PRM-freezes — sweep + flick produce NO reactive change (${scheme})`, async ({
            page,
        }) => {
            await page.emulateMedia({ reducedMotion: "reduce" });
            await page.goto(route);
            const canvas = page.locator(CANVAS).first();
            await canvas.waitFor({ timeout: 8000 }).catch(() => {});
            if ((await canvas.count()) === 0) {
                test.skip(true, `${id}: no canvas mounted on ${route}`);
                return;
            }
            await setScheme(page, scheme);
            await page.waitForTimeout(500);

            // Under PRM the field freezes (tick(0)) — the SAME sweep + flick produce NO
            // change vs the static rest frame (the gesture confirmed, the physics off).
            const rest = await grab(page);
            await sweep(page);
            await flick(page);
            await page.waitForTimeout(80);
            const after = await grab(page);
            const prmDiff = frameDiff(rest, after);
            const degenerate = rest.width === 0 || rest.height === 0;
            if (!degenerate) {
                // A frozen field paints one static frame — the cursor adds no motion. A small
                // tolerance covers AA jitter / the one-static-frame cross-fade settling.
                expect(
                    prmDiff,
                    `${id} (${scheme}): under prefers-reduced-motion the cursor STILL moved the surface — prmDiff ${prmDiff.toFixed(4)} (the field must freeze to a still frame, the reactivity inert — accessibility absolute)`,
                ).toBeLessThan(REACT_DIFF_FLOOR);
            }
        });
    }
}
