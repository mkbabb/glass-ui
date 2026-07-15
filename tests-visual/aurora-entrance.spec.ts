// BI.W-E10-AURORA-ENTRANCE — the BINDING π of the palette-derived aurora entrance.
//
// proof:aurora-entrance proves the SOURCE (the placeholder is the palette ground, the
// reveal-bloom door is exposed + the keyframe palette-honest, the field/content split);
// THIS spec proves the painted RENDER — the "beautifully defined" entrance is a gestalt
// judgement re-earned on a fresh capture (UF-E10 + value.js T-60: no repulsive-gray
// fade, no intermediary gray stage). LOCAL real-GPU (rides the W-REFLECT close).
//
// THE BINDING ARMS (/foundations/intro flagship — the full-bleed hero aurora field):
//   (A) FRAME 0 IS THE PALETTE-DERIVED GROUND — the aurora placeholder's computed
//       background is the field-sampled ground (a data: raster or radial-gradient
//       stack), NOT the retired flat `linear-gradient(135deg)` gray band.
//   (B) NO GRAY REVEAL VEIL — the aurora canvas carries NO `data-substrate-reveal`
//       attr: the aurora opts OUT of the filter-bloom (revealBloom default off), so the
//       entrance is the palette-ground + canvas-opacity cross-fade, never a
//       brightness<1/saturate<1 gray veil over the chromatic field (the T-60 defect).
//   (C) THE FIELD IS COLORED, NOT GRAY — the painted field region carries real chroma
//       (a substantial fraction of pixels are saturated), so the entrance colors from
//       frame 0 (the "repulsive gray" is gone). The t60-probe class: no achromatic
//       stage in the visible window.
//   (D) PRM — the palette ground is the STATIC REST FRAME: under reduced-motion the
//       field is present + colored from frame 0 (the fade survives, the transform drops).
//
// Both color modes; the field capture is written to the DELTA dir for the gestalt re-earn.

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { PNG } from "pngjs";
import { fileURLToPath } from "node:url";
import { mkdirSync } from "node:fs";

const VISUAL_DIR = fileURLToPath(
    new URL("../docs/tranches/BI/audit/visual", import.meta.url),
);

const ROUTE = "/foundations/intro";

async function setDark(page: Page, dark: boolean): Promise<void> {
    await page.evaluate((d) => {
        document.documentElement.classList.toggle("dark", d);
    }, dark);
}

function shot(page: Page, name: string): Promise<Buffer> {
    mkdirSync(VISUAL_DIR, { recursive: true });
    return page.screenshot({
        path: `${VISUAL_DIR}/W-E10-AURORA-ENTRANCE-${name}.png`,
        fullPage: false,
    });
}

/** Fraction of pixels that carry real chroma (max-min channel spread), + mean spread. */
function chromaStats(png: PNG): { saturatedFraction: number; meanSpread: number } {
    const { width: w, height: h, data } = png;
    let saturated = 0;
    let total = 0;
    let spreadSum = 0;
    // Sample a coarse lattice for speed.
    const step = Math.max(1, Math.floor(Math.min(w, h) / 64));
    for (let y = 0; y < h; y += step) {
        for (let x = 0; x < w; x += step) {
            const i = (y * w + x) * 4;
            const a = data[i + 3]!;
            if (a < 16) continue; // skip transparent
            const r = data[i]!;
            const g = data[i + 1]!;
            const b = data[i + 2]!;
            const spread = Math.max(r, g, b) - Math.min(r, g, b);
            spreadSum += spread;
            total += 1;
            // > ~5% channel spread reads as chromatic, not gray.
            if (spread > 13) saturated += 1;
        }
    }
    return {
        saturatedFraction: total === 0 ? 0 : saturated / total,
        meanSpread: total === 0 ? 0 : spreadSum / total,
    };
}

/** Read the aurora placeholder's computed background + the canvas reveal-attr state. */
async function readEntranceState(page: Page): Promise<{
    hasPlaceholder: boolean;
    bgImage: string;
    isFlatBand: boolean;
    isPaletteGround: boolean;
    canvasHasRevealAttr: boolean;
}> {
    return page.evaluate(() => {
        const ph = document.querySelector<HTMLElement>(".aurora-placeholder");
        const canvas = document.querySelector<HTMLCanvasElement>(".aurora-canvas");
        const bgImage = ph ? getComputedStyle(ph).backgroundImage : "";
        return {
            hasPlaceholder: !!ph,
            bgImage,
            // the retired flat band — a single diagonal linear-gradient
            isFlatBand: /linear-gradient\(\s*135deg/.test(bgImage),
            // the palette-derived ground — a data: raster OR a radial-gradient stack
            isPaletteGround:
                /url\("?data:image/.test(bgImage) || /radial-gradient/.test(bgImage),
            canvasHasRevealAttr:
                !!canvas && canvas.hasAttribute("data-substrate-reveal"),
        };
    });
}

for (const dark of [false, true]) {
    const mode = dark ? "dark" : "light";

    test(`(A/B) frame-0 palette ground + no gray reveal veil — ${mode}`, async ({
        page,
    }) => {
        await page.goto(ROUTE, { waitUntil: "domcontentloaded" });
        await setDark(page, dark);
        await page.waitForSelector(".aurora-placeholder", { timeout: 10_000 });

        const st = await readEntranceState(page);
        expect(st.hasPlaceholder, "the aurora placeholder must mount").toBe(true);
        // (A) — the frame-0 ground is palette-derived, NOT the flat gray band.
        expect(
            st.isFlatBand,
            `the placeholder must NOT be the retired flat linear-gradient(135deg) band — got: ${st.bgImage.slice(0, 80)}`,
        ).toBe(false);
        expect(
            st.isPaletteGround,
            `the placeholder must be the palette-derived ground (data: raster or radial-gradient stack) — got: ${st.bgImage.slice(0, 80)}`,
        ).toBe(true);
        // (B) — the aurora opts OUT of the filter-bloom (no gray veil over the field).
        expect(
            st.canvasHasRevealAttr,
            "the aurora canvas must NOT carry data-substrate-reveal — the aurora entrance is the palette-ground + opacity cross-fade, not the filter-bloom veil (T-60)",
        ).toBe(false);
    });

    test(`(C) the field is colored, not gray, from frame 0 — ${mode}`, async ({
        page,
    }) => {
        await page.goto(ROUTE, { waitUntil: "domcontentloaded" });
        await setDark(page, dark);
        const el = await page.waitForSelector(".aurora-placeholder", {
            timeout: 10_000,
        });
        // Capture the field placeholder region EARLY (the frame-0 ground, before the
        // live canvas fully cross-fades over it) — the ground itself must be colored.
        const buf = await el.screenshot();
        const png = PNG.sync.read(buf);
        const { saturatedFraction, meanSpread } = chromaStats(png);
        // The palette-derived field is chromatic — a substantial fraction of pixels
        // carry chroma, and the mean channel spread clears the gray floor. (A flat gray
        // band would read saturatedFraction≈0, meanSpread≈0.)
        expect(
            saturatedFraction,
            `the field must be COLORED at frame 0 (saturatedFraction=${saturatedFraction.toFixed(3)}) — a repulsive-gray entrance reads ≈0`,
        ).toBeGreaterThan(0.08);
        expect(
            meanSpread,
            `the field mean channel-spread must clear the gray floor (meanSpread=${meanSpread.toFixed(1)})`,
        ).toBeGreaterThan(6);
        await shot(page, `field-colored-${mode}`);
    });
}

test("(D) PRM — the palette ground is the static rest frame (fade survives, transform drops)", async ({
    page,
}) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(ROUTE, { waitUntil: "domcontentloaded" });
    const el = await page.waitForSelector(".aurora-placeholder", { timeout: 10_000 });

    // Under reduce the field is present + colored from frame 0 (no dim/gray ramp — the
    // palette ground is the static rest frame; the live canvas snaps rather than blooms).
    const st = await readEntranceState(page);
    expect(st.isFlatBand, "PRM: still no flat band").toBe(false);
    expect(st.isPaletteGround, "PRM: the palette ground is the static rest frame").toBe(
        true,
    );

    const buf = await el.screenshot();
    const png = PNG.sync.read(buf);
    const { saturatedFraction } = chromaStats(png);
    expect(
        saturatedFraction,
        `PRM: the field is colored from frame 0 (saturatedFraction=${saturatedFraction.toFixed(3)})`,
    ).toBeGreaterThan(0.08);
    await shot(page, "prm-static-ground");
});
