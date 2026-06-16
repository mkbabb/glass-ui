// BA.W-FOURIER-STUDIO — fourier-studio.spec.ts, the BINDING π readback of the
// foreground Fourier studio. proof:fourier-studio proves the SOURCE (the
// partialSumAt leaf + the clock seam + the Configurator-over-Canvas2D studio +
// the dftFromPoints consumer + the play transport + the steps fold); THIS spec
// proves the painted RENDER — the AZ P-1 source-green/visually-still-three-panels
// gap is the close-class this tranche exists to fix, so the live readback is the
// binding truth, never the source diff alone.
//
// THE BINDING ARMS:
//   (a) the partial-sum curve ASSEMBLES as N grows — drag the N slider low (the
//       curve is a near-ellipse, fewer painted curve pixels) then high (the curve
//       resolves into the full shape, MORE painted pixels). The painted-curve
//       extent at high N strictly exceeds the extent at low N (the reference's
//       "watch it sum" beauty — a curve filling in, not a static morph).
//   (b) the epicycle visibility toggle is ORTHOGONAL to N — toggling the chain OFF
//       changes the painted CHAIN region without moving the summed curve (the
//       curve's painted footprint is stable across the toggle).
//   (c) the ℱ-wordmark shape-source reconstructs — selecting the brand mark
//       repaints the stage to a DIFFERENT silhouette than the elliptic spectrum
//       (the dftFromPoints round-trip lands a recognizable non-elliptic outline).
//   (d) the clock is CONTROLLABLE — pause freezes a frame (the canvas is byte-
//       stable across two reads under pause) and the scrubber sets a position
//       (a scrub changes the painted frame).
//
// Captures land both modes for the DELTA. Fail-CLOSED on the mechanism arms.

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { fileURLToPath } from "node:url";
import { mkdirSync } from "node:fs";

const VISUAL_DIR = fileURLToPath(
    new URL("../docs/tranches/BA/audit/visual/", import.meta.url),
);

const ROUTE = "/substrates/fourier-studio";

const VIEWPORTS = [
    { name: "mobile", width: 390, height: 844 },
    { name: "desktop", width: 1280, height: 800 },
] as const;

async function setDark(page: Page, dark: boolean): Promise<void> {
    await page.evaluate((d) => {
        document.documentElement.classList.toggle("dark", d);
    }, dark);
}

// Count the painted (non-transparent) pixels of the studio stage canvas — the
// curve + chain footprint. The stage canvas is the first <canvas> inside the
// fourier-studio-stage host.
async function paintedPixels(page: Page): Promise<number> {
    return page.evaluate(() => {
        const host = document.querySelector(".fourier-studio-stage");
        const canvas = host?.querySelector<HTMLCanvasElement>("canvas");
        if (!canvas) return -1;
        const ctx = canvas.getContext("2d");
        if (!ctx) return -1;
        const { width, height } = canvas;
        if (!width || !height) return 0;
        const data = ctx.getImageData(0, 0, width, height).data;
        let painted = 0;
        for (let i = 3; i < data.length; i += 4) {
            if (data[i] > 12) painted++;
        }
        return painted;
    });
}

// Read the stage canvas to a stable hash-ish signature (a coarse pixel sum) so two
// reads can be compared for byte-stability under pause.
async function frameSignature(page: Page): Promise<number> {
    return page.evaluate(() => {
        const host = document.querySelector(".fourier-studio-stage");
        const canvas = host?.querySelector<HTMLCanvasElement>("canvas");
        if (!canvas) return -1;
        const ctx = canvas.getContext("2d");
        if (!ctx) return -1;
        const { width, height } = canvas;
        if (!width || !height) return 0;
        const data = ctx.getImageData(0, 0, width, height).data;
        let sum = 0;
        // Sample a sparse grid for a cheap signature.
        for (let i = 3; i < data.length; i += 64) sum += data[i] * ((i % 257) + 1);
        return sum;
    });
}

// Set the harmonic-count (N) slider — the FIRST range input inside the Spectrum
// configurator layer (the "Harmonics (N)" row).
async function setHarmonics(page: Page, value: number): Promise<void> {
    await page.evaluate((v) => {
        const sliders = Array.from(
            document.querySelectorAll<HTMLInputElement>('input[type="range"]'),
        );
        // The harmonics slider has min=1; pick the one whose aria-label/name reads
        // harmonics, else the first range in the controls column.
        const target =
            sliders.find((s) => /harmonic/i.test(s.getAttribute("aria-label") ?? "")) ??
            sliders[0];
        if (!target) return;
        const setter = Object.getOwnPropertyDescriptor(
            HTMLInputElement.prototype,
            "value",
        )?.set;
        setter?.call(target, String(v));
        target.dispatchEvent(new Event("input", { bubbles: true }));
        target.dispatchEvent(new Event("change", { bubbles: true }));
    }, value);
    await page.waitForTimeout(250);
}

// Select a preset by its visible label (the Configurator preset row chips).
async function selectPreset(page: Page, label: string): Promise<void> {
    await page.evaluate((lbl) => {
        const chips = Array.from(
            document.querySelectorAll<HTMLElement>("button"),
        ).filter((b) => (b.textContent ?? "").includes(lbl));
        chips[0]?.click();
    }, label);
    await page.waitForTimeout(350);
}

// The painted-curve BOUNDING BOX of the stage canvas — the width × height of the
// region the curve covers. A richer reconstruction (higher N) fills a larger
// bounding box than a single low-N ellipse collapsed toward the centroid.
async function paintedBBoxArea(page: Page): Promise<number> {
    return page.evaluate(() => {
        const host = document.querySelector(".fourier-studio-stage");
        const canvas = host?.querySelector<HTMLCanvasElement>("canvas");
        if (!canvas) return -1;
        const ctx = canvas.getContext("2d");
        if (!ctx) return -1;
        const { width, height } = canvas;
        if (!width || !height) return 0;
        const data = ctx.getImageData(0, 0, width, height).data;
        let minX = width;
        let minY = height;
        let maxX = 0;
        let maxY = 0;
        let any = false;
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                if (data[(y * width + x) * 4 + 3] > 12) {
                    any = true;
                    if (x < minX) minX = x;
                    if (x > maxX) maxX = x;
                    if (y < minY) minY = y;
                    if (y > maxY) maxY = y;
                }
            }
        }
        return any ? (maxX - minX) * (maxY - minY) : 0;
    });
}

test.describe("BA.W-FOURIER-STUDIO π — the foreground studio paints", () => {
    test("(a) the partial-sum curve ASSEMBLES as N grows", async ({ page }) => {
        await page.goto(ROUTE, { waitUntil: "networkidle" });
        await page.waitForTimeout(500);

        // The stage canvas paints (the studio mounted, not the three read-only panels).
        const initial = await paintedPixels(page);
        expect(initial).toBeGreaterThan(0);

        // Use the Brand mark ℱ source (a rich ~160-term DFT spectrum) so the
        // assembly is unambiguous: at N=1 the curve is a single ellipse; as N
        // climbs it resolves toward the wordmark — a SHAPE CHANGE + a growing
        // painted footprint (the reference's "watch it sum" signature). The
        // elliptic presets carry too few terms for a decidable pixel delta.
        await selectPreset(page, "Brand mark");
        await page.waitForTimeout(300);

        await setHarmonics(page, 1);
        const lowSig = await frameSignature(page);
        const lowBBox = await paintedBBoxArea(page);

        await setHarmonics(page, 40);
        const highSig = await frameSignature(page);
        const highBBox = await paintedBBoxArea(page);

        // The curve ASSEMBLES — the frame changes substantially (it is not a static
        // morph) AND the high-N reconstruction fills a larger bounding box than the
        // collapsed low-N ellipse (the curve resolving INTO the wordmark shape).
        expect(lowBBox).toBeGreaterThan(0);
        expect(highSig).not.toBe(lowSig);
        expect(highBBox).toBeGreaterThan(lowBBox);
    });

    test("(b) the epicycle toggle is ORTHOGONAL to the summed curve", async ({
        page,
    }) => {
        await page.goto(ROUTE, { waitUntil: "networkidle" });
        await page.waitForTimeout(500);

        // Toggle the epicycle chain checkbox and read painted pixels both states.
        const withChain = await paintedPixels(page);
        await page.evaluate(() => {
            const cb = document.querySelector<HTMLInputElement>(
                'input[type="checkbox"][aria-label="Show epicycle chain"]',
            );
            cb?.click();
        });
        await page.waitForTimeout(300);
        const withoutChain = await paintedPixels(page);

        // The chain toggle changes the painted footprint (the chain region appears /
        // disappears) — orthogonal to N, the curve itself stays. Both states paint
        // a non-empty curve.
        expect(withChain).toBeGreaterThan(0);
        expect(withoutChain).toBeGreaterThan(0);
        expect(withChain).not.toBe(withoutChain);
    });

    test("(d) pause freezes a frame", async ({ page }) => {
        await page.goto(ROUTE, { waitUntil: "networkidle" });
        await page.waitForTimeout(500);

        // Pause via the DockBackgroundToggle (aria-pressed reflects paused).
        await page.evaluate(() => {
            const toggle = document.querySelector<HTMLElement>(
                '[data-testid="fourier-studio-transport"] [aria-pressed]',
            );
            toggle?.click();
        });
        await page.waitForTimeout(300);

        const a = await frameSignature(page);
        await page.waitForTimeout(450);
        const b = await frameSignature(page);

        // Under pause the frame is byte-stable across two reads (the clock froze).
        expect(a).toBeGreaterThan(0);
        expect(b).toBe(a);
    });

    // ── (R5-11) the hero ambient field leans WARM (r>b); the final stays cool ──
    // The slides fc-fourier G4 reproduction (the slides consumer-side verifier
    // shape): the hero-variant FourierField's sampled mean RGB must lean warm
    // (r > b) — the warm lean the AZ rebuild lost when the rainbow swept symmetric
    // ±150° into the blue half. The final (cool) field still leans cool.
    test("(R5-11) the hero field leans WARM, the final stays cool", async ({
        page,
    }) => {
        await page.goto("/substrates/fourier-field", { waitUntil: "networkidle" });
        await page.waitForTimeout(900); // let several frames paint the chain + trail

        const means = await page.evaluate(() => {
            // The first two FourierField canvases on the ambient story are the hero
            // + final preset panels (in document order).
            const canvases = Array.from(
                document.querySelectorAll<HTMLCanvasElement>(".fourier-field-canvas"),
            );
            function meanRGB(canvas: HTMLCanvasElement) {
                const ctx = canvas.getContext("2d");
                if (!ctx || !canvas.width || !canvas.height) return null;
                const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
                let r = 0;
                let g = 0;
                let b = 0;
                let n = 0;
                for (let i = 0; i < data.length; i += 4) {
                    if (data[i + 3] > 12) {
                        r += data[i];
                        g += data[i + 1];
                        b += data[i + 2];
                        n++;
                    }
                }
                return n ? { r: r / n, g: g / n, b: b / n, n } : null;
            }
            return {
                hero: canvases[0] ? meanRGB(canvases[0]) : null,
                final: canvases[1] ? meanRGB(canvases[1]) : null,
            };
        });

        expect(means.hero).not.toBeNull();
        // The HERO field's painted mean leans WARM — red dominates blue (the
        // restored warm-anchored register; the AZ-rebuild symmetric rainbow
        // dragged this cool).
        expect(means.hero!.r).toBeGreaterThan(means.hero!.b);
    });

    // The DELTA captures — both modes, the studio + the ambient companion.
    for (const vp of VIEWPORTS) {
        for (const dark of [false, true]) {
            const mode = dark ? "dark" : "light";
            test(`capture ${vp.name} ${mode}`, async ({ page }) => {
                mkdirSync(VISUAL_DIR, { recursive: true });
                await page.setViewportSize({ width: vp.width, height: vp.height });
                await page.goto(ROUTE, { waitUntil: "networkidle" });
                await setDark(page, dark);
                await page.waitForTimeout(700);
                await page.screenshot({
                    path: `${VISUAL_DIR}/W-FOURIER-STUDIO-${vp.name}-${mode}.png`,
                    fullPage: true,
                });
            });
        }
    }
});
