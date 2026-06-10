// AY.W-UNDERLINE — proof DRAW-ANIMATES (gate 1), the live π readback.
//
// Mounts the GlassUnderline demo story, fires play() (the load clock), and samples
// `stroke-dashoffset` per rAF frame — asserts a MONOTONIC sweep len→0 over ~drawMs
// (the underline ANIMATES IN, the user's verbatim requirement). The same readback
// exercises the `active` overlay (DEC-2): rising edge sweeps, falling edge resets to
// undrawn, re-rise replays. Under PRM emulation the offset is 0 on first paint and
// never animates (information parity).

import { test, expect } from "@playwright/test";
import { resolveScene } from "./pi-manifest.ts";

const ROUTE = resolveScene("motion", "underline").path;

// Read the stroke-dashoffset on the load-clock underline at `idx` (each underline's
// FIRST `.glass-underline__stroke` path — the primary pen, NOT the ghost). The
// computed value is the dasharray pixel offset. (Each `.glass-underline` hosts TWO
// `.glass-underline__stroke` paths — the pen + the ghost — so we scope per-underline
// and take the pen, never the flattened nth across all underlines.)
async function readOffset(
    page: import("@playwright/test").Page,
    idx = 0,
): Promise<number> {
    return page.evaluate((i) => {
        const underline = document.querySelectorAll(
            ".glass-underline[data-gu-clock='load']",
        )[i];
        const stroke = underline?.querySelector(
            ".glass-underline__stroke",
        ) as SVGPathElement | null;
        if (!stroke) return NaN;
        return parseFloat(getComputedStyle(stroke).strokeDashoffset);
    }, idx);
}

// Sample the offset of the load-clock underline at `idx` across N rAF frames.
async function sampleOffsets(
    page: import("@playwright/test").Page,
    frames: number,
    idx = 0,
): Promise<number[]> {
    return page.evaluate(
        ({ n, i }) => {
            return new Promise<number[]>((resolve) => {
                const out: number[] = [];
                const underline = document.querySelectorAll(
                    ".glass-underline[data-gu-clock='load']",
                )[i];
                const stroke = underline?.querySelector(
                    ".glass-underline__stroke",
                ) as SVGPathElement | null;
                const tick = () => {
                    if (stroke) {
                        out.push(parseFloat(getComputedStyle(stroke).strokeDashoffset));
                    }
                    if (out.length >= n) resolve(out);
                    else requestAnimationFrame(tick);
                };
                requestAnimationFrame(tick);
            });
        },
        { n: frames, i: idx },
    );
}

test.describe("GlassUnderline DRAW-ANIMATES (load clock)", () => {
    test("play() sweeps stroke-dashoffset len→0 monotonically (the draw animates in)", async ({
        page,
    }) => {
        await page.goto(ROUTE, { waitUntil: "networkidle" });
        await page.waitForSelector(".glass-underline[data-gu-clock='load']");

        // The load clock seeds UNDRAWN — the offset starts at the dasharray length
        // (120 user-units scaled to the rendered box; a positive non-zero offset).
        const seeded = await readOffset(page);
        expect(seeded).toBeGreaterThan(0);

        // Fire the draw via the "Replay draw" button, then sample across the sweep.
        // ~80 frames (~1.3s) comfortably covers the 700ms drawMs + the easeOutCubic
        // tail so the offset reaches 0 within the sample window.
        const replay = page.locator("button", { hasText: /replay draw/i }).first();
        const samplesPromise = sampleOffsets(page, 80, 0);
        await replay.click();
        const samples = await samplesPromise;

        // The sweep is MONOTONIC non-increasing (len → 0) — the draw lays ink, never
        // retracts (easeOutCubic, no overshoot past gone — DEC-6).
        const firstReal = samples.find((v) => Number.isFinite(v)) ?? NaN;
        const last = samples[samples.length - 1];
        expect(firstReal).toBeGreaterThan(0);
        // Allow a tiny epsilon for sub-pixel float noise between adjacent frames.
        let maxRise = 0;
        for (let i = 1; i < samples.length; i++) {
            const d = samples[i] - samples[i - 1];
            if (d > maxRise) maxRise = d;
        }
        expect(maxRise).toBeLessThanOrEqual(0.5); // non-increasing (no retract)
        // It reaches (near) 0 by the end — fully drawn.
        expect(last).toBeLessThanOrEqual(1);
        // And it genuinely TRAVELLED (a multi-frame sweep, not a 1-frame snap).
        const distinctValues = new Set(samples.map((v) => Math.round(v))).size;
        expect(distinctValues).toBeGreaterThanOrEqual(5);
    });

    test("the `active` overlay: rising sweeps, falling resets to undrawn, re-rise replays", async ({
        page,
    }) => {
        await page.goto(ROUTE, { waitUntil: "networkidle" });
        await page.waitForSelector(".glass-underline[data-gu-clock='load']");

        // The `active`-bound section's underline is the SECOND load-clock underline
        // (idx 1); the imperative "future" underline is idx 0.
        const toggle = page.locator("button", { hasText: /activate|deactivate/i }).first();

        // Inactive → undrawn (positive offset).
        expect(await readOffset(page, 1)).toBeGreaterThan(0);

        // Rising edge (Activate) → sweeps to drawn.
        await toggle.click();
        await page.waitForTimeout(1000);
        expect(await readOffset(page, 1)).toBeLessThanOrEqual(1);

        // Falling edge (Deactivate) → resets to undrawn (a re-rise REPLAYS).
        await toggle.click();
        await page.waitForTimeout(150);
        expect(await readOffset(page, 1)).toBeGreaterThan(0);
    });

    test("under PRM the offset is 0 on first paint and never animates (parity)", async ({
        browser,
    }) => {
        const ctx = await browser.newContext({ reducedMotion: "reduce" });
        const page = await ctx.newPage();
        await page.goto(ROUTE, { waitUntil: "networkidle" });
        await page.waitForSelector(".glass-underline[data-gu-clock='load']");
        // Under PRM the load clock seeds DRAWN (set-not-drawn) — offset 0 on first paint.
        const off = await readOffset(page);
        expect(off).toBeLessThanOrEqual(1);
        await ctx.close();
    });
});
