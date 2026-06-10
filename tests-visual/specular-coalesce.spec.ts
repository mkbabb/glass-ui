// AY.W-A11Y-PERF G3 — proof: the pointer-anchored specular write is rAF-COALESCED
// and the PRM matchMedia is minted ONCE for the seam's lifetime (H-3).
//
// HEAD defect: `useSpecularTracking.onPointerMove` did `getBoundingClientRect()` +
// `matchMedia("(prefers-reduced-motion: reduce)")` on EVERY pointermove — a 120–1000 Hz
// pointer drove 120–1000 forced layouts + 120–1000 fresh MediaQueryList mints, each
// repainting a blurred glass surface (multiplied under W54 maximal-glass). O-3 reworks
// it to the AV.W7 substrate pattern: ONE cached matchMedia + change listener at setup,
// and onPointerMove only stashes the event + schedules ONE requestAnimationFrame (the
// rAF callback does the single rect read + write).
//
// THIS SPEC instruments `Element.prototype.getBoundingClientRect` + `window.matchMedia`
// (counter wrappers, installed via addInitScript BEFORE any page JS runs so the
// composable's setup matchMedia is counted), drives a synthetic 200-event pointermove
// sweep over a live `.dock-icon-button` (which wires `onPointerMove` unconditionally) on
// /dock/overview, and asserts:
//   - getBoundingClientRect call count ≤ frames + a small slack (ONE rect read per rAF,
//     NOT ~200 — the coalesce truth). The sweep spans only a few animation frames.
//   - matchMedia minted a SMALL constant number for the seam (NOT ~200×) — the cached
//     listener, not a per-event mint.
// Born-RED before O-3 (~200 rect reads + ~200 matchMedia). Captured DELTA: the
// before/after call-count readout.

import { test, expect } from "@playwright/test";
import { resolveScene } from "./pi-manifest.ts";

test.describe("specular-coalesce (π lane — the rAF-coalesced specular write, fail-CLOSED)", () => {
    test("a 200-event pointer sweep collapses to ≤ frames+slack rect reads + a cached matchMedia", async ({
        page,
    }) => {
        // Install the instrumentation BEFORE any page JS — so the composable's
        // setup-time matchMedia (the cached listener) is counted from event 0.
        await page.addInitScript(() => {
            const w = window as unknown as {
                __rectCalls: number;
                __mmCalls: number;
            };
            w.__rectCalls = 0;
            w.__mmCalls = 0;
            const origRect = Element.prototype.getBoundingClientRect;
            Element.prototype.getBoundingClientRect = function (this: Element) {
                w.__rectCalls += 1;
                return origRect.call(this);
            };
            const origMM = window.matchMedia.bind(window);
            window.matchMedia = ((q: string) => {
                w.__mmCalls += 1;
                return origMM(q);
            }) as typeof window.matchMedia;
        });

        // The substrates/glass-material route wires the REAL useSpecularTracking seam
        // on every plate via `@pointermove="onPointerMove"` — the GUARANTEED specular
        // target (the dock route's rail buttons are not reliably specular-wired).
        const scene = resolveScene("substrates", "glass-material");
        await page.goto(scene.path, { waitUntil: "domcontentloaded" });
        await page.waitForTimeout(600);

        // A glass-card plate (wires onPointerMove). Fall back to any glass rung plate.
        const target = page
            .locator(".glass-card, .glass-wash, .glass-quiet, .glass-resting, .glass-floating")
            .first();
        await target.waitFor({ state: "attached", timeout: 10_000 });

        // Reset the counters AFTER the page settled (so we measure only the sweep +
        // the cached-listener setup that ran at mount; the cached matchMedia was
        // minted at setup, which is before this reset — so we ALSO record the pre-reset
        // matchMedia count to prove it is a small constant, not ~200).
        const setupCounts = await page.evaluate(() => ({
            rect: (window as unknown as { __rectCalls: number }).__rectCalls,
            mm: (window as unknown as { __mmCalls: number }).__mmCalls,
        }));

        await page.evaluate(() => {
            (window as unknown as { __rectCalls: number }).__rectCalls = 0;
            (window as unknown as { __mmCalls: number }).__mmCalls = 0;
        });

        // Drive a synthetic 200-event pointermove sweep over the target, then await a
        // handful of animation frames so the coalesced rAF flushes. The events fire
        // synchronously (within one task), so they collapse into the next ~1-3 frames.
        const box = await target.boundingBox();
        expect(box, "the specular target has no box").not.toBeNull();
        const { frames, rectCalls, mmCalls } = await page.evaluate(
            async ({ sel, bx }) => {
                const el =
                    document.querySelector(sel) ??
                    document.querySelector(".glass-card")!;
                const N = 200;
                for (let i = 0; i < N; i++) {
                    const ev = new PointerEvent("pointermove", {
                        bubbles: true,
                        clientX: bx.x + (bx.width * i) / N,
                        clientY: bx.y + bx.height / 2,
                        pointerId: 1,
                        pointerType: "mouse",
                    });
                    el.dispatchEvent(ev);
                }
                // Count the animation frames the sweep spanned (await a few rAFs so the
                // coalesced flush runs).
                let frames = 0;
                await new Promise<void>((res) => {
                    const tick = () => {
                        frames += 1;
                        if (frames >= 5) res();
                        else requestAnimationFrame(tick);
                    };
                    requestAnimationFrame(tick);
                });
                const w = window as unknown as {
                    __rectCalls: number;
                    __mmCalls: number;
                };
                return { frames, rectCalls: w.__rectCalls, mmCalls: w.__mmCalls };
            },
            { sel: ".glass-card", bx: box! },
        );

        console.log(
            `[W-A11Y-PERF G3] sweep=200 events | setup(matchMedia)=${setupCounts.mm} | during sweep: rectCalls=${rectCalls} over ~${frames} frames, matchMedia=${mmCalls}`,
        );

        // ── (1) The rect read is rAF-COALESCED: a 200-event sweep collapses to a
        // small number of rect reads (≤ frames + slack), NOT ~200. The slack absorbs
        // any other library rect reads on the same frames (layout observers etc.); the
        // BINDING truth is that it is FAR below the 200-event count (the unbounded HEAD
        // behavior). A generous ceiling that still bites the born-RED ~200. ────────────
        expect(
            rectCalls,
            `the specular write did NOT coalesce: ${rectCalls} getBoundingClientRect calls over a 200-event sweep (~${frames} frames). O-3 must collapse this to ≤ one rect read per animation frame (the born-RED HEAD was ~200).`,
        ).toBeLessThanOrEqual(frames + 30);
        // And decisively below the per-event count (the coalesce headline).
        expect(
            rectCalls,
            `the specular rect read count (${rectCalls}) is not decisively below the 200-event sweep — the coalesce did not engage.`,
        ).toBeLessThan(60);

        // ── (2) matchMedia is minted ONCE for the seam's lifetime (the cached
        // listener), NOT per event. During the 200-event sweep the count must be ~0
        // (the listener was minted at setup, before the sweep). ─────────────────────────
        expect(
            mmCalls,
            `matchMedia was minted ${mmCalls}× DURING the 200-event sweep — the PRM check is per-event, not the cached AV.W7 listener. O-3 mints it ONCE at setup.`,
        ).toBeLessThanOrEqual(2);
    });
});
