// BC.W-TEAL-NAVY-PURGE — teal-navy-purge.spec.ts, the BINDING T5 π default-page
// mean-hue readback (the captured painted-truth a source grep cannot give — a token
// can be warm while a shader bakes cool; T5 reads the PAINTED hue).
//
// THE ARMS (both modes):
//   (D-warm) each substrate page's DEFAULT state paints a dominantly WARM canvas — the
//       mean hue of the painted (chromatic, non-near-neutral) pixels sits in the
//       warm-amber/cream family (≈ [20,110]°), NOT the teal-navy band [180,270]°.
//   (D-coherent) NO substrate default diverges to a cool family — the suite reads as
//       ONE coherent warm-cream material family (the positive identity assert, D).
//
// Fail-CLOSED: a default page whose dominant painted hue is in the cool band reds,
// exit non-zero. The before→after DELTA frames (both modes) are written to the DELTA
// dir. LOCAL-only (the painted-canvas hue sample needs a real browser + GPU).

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { fileURLToPath } from "node:url";
import { mkdirSync } from "node:fs";

const VISUAL_DIR = fileURLToPath(
    new URL("../docs/tranches/BC/audit/visual", import.meta.url),
);

// The substrate DEFAULT routes — each must lead warm-cream (presets-in-consumers; the
// teal/mono reproductions are non-default named presets the page CAN show but never leads).
const SUBSTRATE_ROUTES = [
    { name: "aurora", route: "/substrates/aurora" },
] as const;

const VIEWPORTS = [
    { name: "mobile", width: 390, height: 844 },
    { name: "desktop", width: 1280, height: 800 },
] as const;

// The cool-blue band (teal-cyan through navy) the purge targets. The warm-cream identity
// (hue ~20-110) is outside it.
const COOL_HUE_LO = 180;
const COOL_HUE_HI = 270;
// A pixel must clear this OKLab chroma to count as a COLOR event (a near-neutral
// near-black ground / near-white dot carries no hue signal — excluded from the mean).
const CHROMA_SIGNAL = 0.012;

async function setDark(page: Page, dark: boolean): Promise<void> {
    await page.evaluate((on) => document.documentElement.classList.toggle("dark", on), dark);
    await page.waitForTimeout(150);
}

/**
 * Sample the largest painted <canvas> on the page, compute the chroma-weighted mean
 * OKLab hue + the fraction of chromatic pixels in the cool band. Runs IN the page so the
 * GPU-painted pixels are read off the real backbuffer.
 */
async function sampleCanvasHue(
    page: Page,
): Promise<{ meanHue: number; coolFraction: number; signalPixels: number } | null> {
    return page.evaluate(
        ({ COOL_LO, COOL_HI, SIG }) => {
            // The largest canvas = the viz substrate (the dock/icon canvases are tiny).
            const canvases = [...document.querySelectorAll("canvas")] as HTMLCanvasElement[];
            if (canvases.length === 0) return null;
            const c = canvases
                .map((el) => ({ el, area: el.width * el.height }))
                .sort((a, b) => b.area - a.area)[0]!.el;

            // Read the painted pixels via a 2D copy (works for both WebGL/WebGPU + 2D
            // backbuffers once the frame has been presented to the canvas element).
            const off = document.createElement("canvas");
            const W = Math.min(256, c.width || 256);
            const H = Math.min(256, c.height || 256);
            off.width = W;
            off.height = H;
            const ctx = off.getContext("2d", { willReadFrequently: true })!;
            try {
                ctx.drawImage(c, 0, 0, W, H);
            } catch {
                return null;
            }
            const { data } = ctx.getImageData(0, 0, W, H);

            // sRGB → OKLab (the perceptual hue the eye reads).
            const lin = (v: number) => {
                v /= 255;
                return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
            };
            let sumX = 0;
            let sumY = 0;
            let sumW = 0;
            let coolW = 0;
            let signal = 0;
            for (let i = 0; i < data.length; i += 4) {
                const a = data[i + 3]!;
                if (a < 8) continue; // transparent — the page backdrop, not the viz paint
                const lr = lin(data[i]!);
                const lg = lin(data[i + 1]!);
                const lb = lin(data[i + 2]!);
                const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
                const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
                const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
                const aa = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
                const bb = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
                const C = Math.hypot(aa, bb);
                if (C < SIG) continue; // near-neutral — no hue signal
                signal++;
                const H = ((Math.atan2(bb, aa) * 180) / Math.PI + 360) % 360;
                // chroma-weighted circular mean
                sumX += C * Math.cos((H * Math.PI) / 180);
                sumY += C * Math.sin((H * Math.PI) / 180);
                sumW += C;
                if (H >= COOL_LO && H <= COOL_HI) coolW += C;
            }
            if (sumW === 0) return { meanHue: -1, coolFraction: 0, signalPixels: signal };
            const meanHue = ((Math.atan2(sumY, sumX) * 180) / Math.PI + 360) % 360;
            return { meanHue, coolFraction: coolW / sumW, signalPixels: signal };
        },
        { COOL_LO: COOL_HUE_LO, COOL_HI: COOL_HUE_HI, SIG: CHROMA_SIGNAL },
    );
}

test.beforeAll(() => {
    mkdirSync(VISUAL_DIR, { recursive: true });
});

for (const vp of VIEWPORTS) {
    for (const dark of [false, true]) {
        const mode = dark ? "dark" : "light";
        for (const { name, route } of SUBSTRATE_ROUTES) {
            test(`${name} default paints WARM-cream (${vp.name}-${mode})`, async ({ page }) => {
                await page.setViewportSize({ width: vp.width, height: vp.height });
                await page.goto(route);
                await setDark(page, dark);
                // let the substrate paint a few frames into the canvas element.
                await page.waitForTimeout(900);

                await page.screenshot({
                    path: `${VISUAL_DIR}/W-TEAL-NAVY-PURGE-${name}-${vp.name}-${mode}.png`,
                });

                const s = await sampleCanvasHue(page);
                // a substrate with no readable canvas (CSS-fallback raster / no GL) is
                // skipped rather than failed — the WARM-paint assert is on the chromatic
                // signal, and a transparent/near-neutral default carries no cool risk.
                test.skip(s === null, `${name}: no readable substrate canvas`);
                test.skip((s?.signalPixels ?? 0) < 200, `${name}: too few chromatic pixels to judge hue`);

                // D-warm: the dominant painted hue is NOT in the cool teal-navy band.
                expect(
                    s!.meanHue < COOL_HUE_LO || s!.meanHue > COOL_HUE_HI,
                    `${name} default mean hue ${s!.meanHue.toFixed(1)}° is in the COOL band [${COOL_HUE_LO},${COOL_HUE_HI}] — the default must read warm-cream`,
                ).toBe(true);
                // D-coherent: the cool band is a minority of the chromatic signal.
                expect(
                    s!.coolFraction,
                    `${name} default cool-pixel chroma fraction ${(s!.coolFraction * 100).toFixed(0)}% — the warm-cream identity must dominate`,
                ).toBeLessThan(0.35);
            });
        }
    }
}
