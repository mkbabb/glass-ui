// W-SLD1-R3 — the slider FINAL form own-surface DELTA capture.
//
// B3 (standard): NO VISIBLE THUMB AT ALL — you pull the TRACK itself. The filled
// glass cylinder's leading edge IS the handle. Captures the standard slider at
// rest / mid-drag / keyboard-focus (the focus ring on the TRACK), plus the
// spectrum variant (the THIN visible color-picker thumb, B14). Both color modes
// (light/dark), both viewports (desktop/mobile). Reads back the standard thumb's
// computed width+opacity (the MEASURED invisibility) and the focused track's
// box-shadow (the focus-on-track readback) so the claim is a π readback, not a
// pixel diff alone.

import { resolve } from "node:path";
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const VISUAL_DIR = resolve(ROOT, "docs/tranches/AY/audit/visual");
const BASE_URL = process.env.GLASS_UI_DEMO_URL ?? "http://localhost:5199";
const ROUTE = "/forms/slider";

const VIEWPORTS = [
    { id: "desktop", width: 1440, height: 900 },
    { id: "mobile", width: 390, height: 844 },
];
const MODES = ["light", "dark"];

async function run() {
    mkdirSync(VISUAL_DIR, { recursive: true });
    const browser = await chromium.launch({ args: ["--disable-gpu"] });
    const shots = [];
    const readback = {};
    try {
        for (const vp of VIEWPORTS) {
            for (const mode of MODES) {
                const ctx = await browser.newContext({
                    viewport: { width: vp.width, height: vp.height },
                    deviceScaleFactor: 2,
                    colorScheme: mode,
                });
                const page = await ctx.newPage();
                await page.goto(`${BASE_URL}${ROUTE}`, { waitUntil: "load", timeout: 25000 });
                if (mode === "dark") {
                    await page.evaluate(() => document.documentElement.classList.add("dark"));
                }
                await page.waitForTimeout(2500);
                await page.waitForSelector('[data-slot="slider"]', { timeout: 8000 });

                const key = `${vp.id}-${mode}`;

                // ── STANDARD slider (first slider on the page — Volume) ──
                const standard = page.locator('[data-slot="slider"][data-variant="standard"]').first();

                // REST capture
                const restName = `W-SLD1-R3-standard-rest-${key}.png`;
                await standard.screenshot({ path: resolve(VISUAL_DIR, restName) });
                shots.push(restName);

                // Measured invisibility: the standard thumb computed width + opacity.
                const thumbRead = await standard.evaluate((root) => {
                    const thumb = root.querySelector(".slider-thumb");
                    if (!thumb) return null;
                    const cs = getComputedStyle(thumb);
                    return {
                        width: cs.width,
                        opacity: cs.opacity,
                        background: cs.backgroundColor,
                        borderRadius: cs.borderRadius,
                    };
                });

                // DRAG capture: pointer-down + move on the track to pull the fill ~70%.
                const box = await standard.boundingBox();
                if (box) {
                    const y = box.y + box.height / 2;
                    const xStart = box.x + box.width * 0.42;
                    const xEnd = box.x + box.width * 0.72;
                    await page.mouse.move(xStart, y);
                    await page.mouse.down();
                    await page.mouse.move(xEnd, y, { steps: 8 });
                    await page.waitForTimeout(120);
                    const dragName = `W-SLD1-R3-standard-drag-${key}.png`;
                    await standard.screenshot({ path: resolve(VISUAL_DIR, dragName) });
                    shots.push(dragName);
                    await page.mouse.up();
                    await page.waitForTimeout(120);
                }

                // FOCUS capture: keyboard-focus the thumb → the ring rises on the TRACK.
                await standard.evaluate((root) => {
                    const thumb = root.querySelector(".slider-thumb");
                    if (thumb) thumb.focus();
                });
                await page.waitForTimeout(150);
                const focusName = `W-SLD1-R3-standard-focus-${key}.png`;
                await standard.screenshot({ path: resolve(VISUAL_DIR, focusName) });
                shots.push(focusName);

                // Focus-on-track readback: the .slider-track box-shadow while focused.
                const focusRead = await standard.evaluate((root) => {
                    const track = root.querySelector(".slider-track");
                    if (!track) return null;
                    return getComputedStyle(track).boxShadow;
                });
                // Blur to clear focus before the spectrum shot.
                await page.evaluate(() => document.activeElement instanceof HTMLElement && document.activeElement.blur());

                // ── SPECTRUM slider (the gradient-track color picker; THIN visible thumb) ──
                const spectrum = page.locator('[data-slot="slider"][data-variant="spectrum"]').first();
                const specName = `W-SLD1-R3-spectrum-${key}.png`;
                await spectrum.scrollIntoViewIfNeeded();
                await page.waitForTimeout(150);
                await spectrum.screenshot({ path: resolve(VISUAL_DIR, specName) });
                shots.push(specName);

                // Spectrum thumb width readback (the THINNER bar — B14).
                const specThumbRead = await spectrum.evaluate((root) => {
                    const thumb = root.querySelector(".slider-thumb");
                    const track = root.querySelector(".slider-track");
                    if (!thumb || !track) return null;
                    const tcs = getComputedStyle(thumb);
                    const trcs = getComputedStyle(track);
                    return {
                        thumbWidth: tcs.width,
                        thumbHeight: tcs.height,
                        thumbOpacity: tcs.opacity,
                        trackHeight: trcs.height,
                    };
                });

                readback[key] = {
                    standardThumb: thumbRead,
                    standardFocusedTrackBoxShadow: focusRead,
                    spectrumThumb: specThumbRead,
                };

                await ctx.close();
            }
        }
    } finally {
        await browser.close();
    }

    writeFileSync(
        resolve(VISUAL_DIR, "W-SLD1-R3-readback.json"),
        JSON.stringify({ generatedAt: new Date().toISOString(), base: BASE_URL, route: ROUTE, readback }, null, 2),
    );

    console.log("W-SLD1-R3 capture complete:");
    for (const s of shots) console.log(`  ${s}`);
    console.log("\nReadback:");
    console.log(JSON.stringify(readback, null, 2));
}

run().catch((e) => {
    console.error(e);
    process.exit(1);
});
