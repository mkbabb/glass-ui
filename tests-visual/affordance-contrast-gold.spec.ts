// AY.W-PRIM-POLISH D1 — the gold-CTA hover PAINTED-PIXEL contrast readback.
//
// The SOURCE arm (proof-affordance-contrast.mjs clause 1b) asserts the recipe
// SHAPE: the `btn-audacious-gold` :hover backplate carries a near-opaque (≥80%α)
// saturated-gold base. This spec proves the PAINTED result — the binding truth
// the cardinal lesson demands: it drives the live demo `display/buttons` route,
// HOVERS the gold "Next →" CTA, samples the RENDERED backplate pixel (the plate,
// NOT a glyph) and the rendered label color, and recomputes the WCAG ratio.
//
// Born-RED on the 1.29:1 HEAD state (white text over the pale `rgb(240,226,188)`
// wash). GREEN at the deepened-plate fix (white over the saturated gold ≥4.5:1).
//
// LIGHT mode is the binding scheme (dark mode was already 9.02:1 — the defect was
// light-only). The spec runs the readback in BOTH schemes and asserts each clears
// the floor (dark stays comfortably above).

import { test, expect } from "@playwright/test";
import { resolveScene } from "./pi-manifest.ts";

const BUTTONS = resolveScene("display", "buttons");

// WCAG relative luminance + contrast ratio from an sRGB [r,g,b] (0-255) triple.
function relLuminance([r, g, b]: number[]): number {
    const lin = (c: number) => {
        const s = c / 255;
        return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
    };
    return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}
function contrast(a: number[], b: number[]): number {
    const la = relLuminance(a);
    const lb = relLuminance(b);
    return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

// Parse `rgb(r, g, b)` / `rgba(r, g, b, a)` to [r,g,b].
function parseRgb(s: string): number[] {
    const m = s.match(/rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/);
    if (!m) throw new Error(`cannot parse color "${s}"`);
    return [Number(m[1]), Number(m[2]), Number(m[3])];
}

for (const scheme of ["light", "dark"] as const) {
    test.describe(`affordance-contrast-gold (π lane — ${scheme})`, () => {
        test.use({ colorScheme: scheme });

        test(`the gold CTA hover label clears 4.5:1 over the painted backplate (${scheme})`, async ({
            page,
        }, testInfo) => {
            await page.setViewportSize({ width: 1280, height: 800 });
            await page.goto(BUTTONS.path, { waitUntil: "networkidle" });
            // Force the demo into the requested scheme (class-driven dark).
            await page.evaluate((s) => {
                document.documentElement.classList.toggle("dark", s === "dark");
            }, scheme);
            await page.waitForTimeout(150);

            // The gold "Next →" CTA — the `gold-audacious` lg button.
            const gold = page.locator("button.btn-audacious-gold").first();
            await gold.waitFor({ state: "visible", timeout: 5000 });
            await gold.scrollIntoViewIfNeeded();

            // HOVER it — the deepened plate + the white text flip both engage on hover.
            await gold.hover();
            // The hover surface cross-fade rides --duration-fast; settle it.
            await page.waitForTimeout(450);

            // The rendered label color (computed style on the hovered button).
            const labelColor = parseRgb(
                await gold.evaluate((el) => getComputedStyle(el).color),
            );

            // Sample the PAINTED backplate: screenshot the hovered button, then read
            // a pixel in the LEFT-PADDING region (off any glyph) — the plate itself.
            const box = (await gold.boundingBox())!;
            const shot = await gold.screenshot();
            const png = await testInfo.attach(`gold-hover-${scheme}`, {
                body: shot,
                contentType: "image/png",
            });
            void png;

            // Decode the PNG pixels in-page (createImageBitmap → canvas → getImageData).
            const b64 = shot.toString("base64");
            const plate = await page.evaluate(
                async ({ b64, w, h }) => {
                    const res = await fetch(`data:image/png;base64,${b64}`);
                    const blob = await res.blob();
                    const bmp = await createImageBitmap(blob);
                    const canvas = document.createElement("canvas");
                    canvas.width = bmp.width;
                    canvas.height = bmp.height;
                    const ctx = canvas.getContext("2d")!;
                    ctx.drawImage(bmp, 0, 0);
                    // Sample a 6×6 patch at ~12% from the left, vertically centred —
                    // the plate's padding region, off the label glyphs. Average it
                    // (anti-alias robustness).
                    const sx = Math.round(bmp.width * 0.12);
                    const sy = Math.round(bmp.height * 0.5);
                    const data = ctx.getImageData(sx - 3, sy - 3, 6, 6).data;
                    let r = 0,
                        g = 0,
                        bl = 0,
                        n = 0;
                    for (let i = 0; i < data.length; i += 4) {
                        r += data[i];
                        g += data[i + 1];
                        bl += data[i + 2];
                        n++;
                    }
                    return [r / n, g / n, bl / n];
                },
                { b64, w: box.width, h: box.height },
            );

            const ratio = contrast(labelColor, plate);
            testInfo.annotations.push({
                type: "gold-hover-contrast",
                description: `${scheme}: label rgb(${labelColor.map(Math.round).join(",")}) over plate rgb(${plate
                    .map(Math.round)
                    .join(",")}) = ${ratio.toFixed(2)}:1`,
            });

            expect(
                ratio,
                `gold CTA hover label (${labelColor.map(Math.round).join(",")}) over the painted backplate (${plate
                    .map(Math.round)
                    .join(",")}) is ${ratio.toFixed(2)}:1 — must clear 4.5:1 (D1; born-RED on the 1.29:1 pale-gold state)`,
            ).toBeGreaterThanOrEqual(4.5);
        });
    });
}
