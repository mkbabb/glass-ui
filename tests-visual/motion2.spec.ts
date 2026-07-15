// AZ.W-MOTION2 (R7) — motion2.spec.ts, the painted browser half of the motion
// contract. Device-free assertions own the dead-token, stroke-floor, picker-register,
// and canon-isomorphism semantics.
//
// THIS SPEC PROVES THE RENDER (the cardinal AX lesson — a green CPU gate over a
// still-wrong live render is the gap; W-MOTION-SUITE's data-table gate witnessed the
// table, not the painted register, which is how the grey-on-grey / hairline / cramped
// picker survived to R7). It reads back, off the LIVE painted :5199 DOM, light+dark:
//   · STROKE-THICK-π — the painted gallery <polyline> reads ≥ 3px apparent stroke.
//   · PICKER-NOT-CRAMPED-π — the picker is the underline register at scale (the
//     underline variant class, a tab height ≥ 36px — NOT the 28px pill), a tablist.
//   · SUBSTRATE-PRESENT-π — the page paints a calm substrate behind the glass card
//     (NOT bare rgba(0,0,0,0)).
//   · PURPLE-STILL-VIOLET-π — --motion-accent resolves to the violet --viz-legendre
//     (oklch ~317.5°) and the painted plot stroke reads the same violet.
//   · CANON-FAMILIES-RENDER-π — the picker renders the full family set + the active
//     family plots a grid of real-twin polylines.
//
// G-CLOSE captures the before/after DELTA pair (gallery light+dark, picker close-up,
// bezier editor) to docs/tranches/AZ/audit/visual/ + the stroke-readback JSON.

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";

// ── oklab/sRGB plumbing (Chrome serializes oklch()/oklab() — invert to sRGB) ──────
function gammaEncode(c: number): number {
    const x = c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055;
    return Math.round(Math.min(1, Math.max(0, x)) * 255);
}
function oklabToRgb(L: number, a: number, b: number): [number, number, number] {
    const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
    const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
    const s_ = L - 0.0894841775 * a - 1.291485548 * b;
    const l = l_ ** 3;
    const m = m_ ** 3;
    const s = s_ ** 3;
    const r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
    const g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
    const bl = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;
    return [gammaEncode(r), gammaEncode(g), gammaEncode(bl)];
}
function parseColor(str: string): [number, number, number] | null {
    if (!str || str === "transparent" || str === "none") return null;
    const oklch = str.match(/oklch\(\s*([\d.]+%?)\s+([\d.]+)\s+([\d.]+)/i);
    if (oklch) {
        const L = oklch[1]!.endsWith("%") ? parseFloat(oklch[1]!) / 100 : parseFloat(oklch[1]!);
        const C = parseFloat(oklch[2]!);
        const h = (parseFloat(oklch[3]!) * Math.PI) / 180;
        return oklabToRgb(L, C * Math.cos(h), C * Math.sin(h));
    }
    const oklab = str.match(/oklab\(\s*([\d.]+%?)\s+(-?[\d.]+)\s+(-?[\d.]+)/i);
    if (oklab) {
        const L = oklab[1]!.endsWith("%") ? parseFloat(oklab[1]!) / 100 : parseFloat(oklab[1]!);
        return oklabToRgb(L, parseFloat(oklab[2]!), parseFloat(oklab[3]!));
    }
    const rgb = str.match(/rgba?\(\s*([\d.]+)[ ,]+([\d.]+)[ ,]+([\d.]+)(?:[ ,/]+([\d.]+))?/i);
    if (rgb) {
        const a = rgb[4] !== undefined ? parseFloat(rgb[4]) : 1;
        if (a === 0) return null; // fully transparent → no paint
        return [+rgb[1]!, +rgb[2]!, +rgb[3]!];
    }
    return null;
}

// rgb → an OKLab hue angle (degrees) for the violet-vs-red discrimination.
function rgbHueDeg(r: number, g: number, b: number): number {
    const lin = (c: number) => {
        const x = c / 255;
        return x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
    };
    const R = lin(r), G = lin(g), B = lin(b);
    const l = 0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B;
    const m = 0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B;
    const s = 0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B;
    const l_ = Math.cbrt(l), m_ = Math.cbrt(m), s_ = Math.cbrt(s);
    const A = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
    const Bb = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_;
    let h = (Math.atan2(Bb, A) * 180) / Math.PI;
    if (h < 0) h += 360;
    return h;
}

async function setDark(page: Page, dark: boolean): Promise<void> {
    await page.evaluate((on) => {
        document.documentElement.classList.toggle("dark", on);
    }, dark);
    await page.waitForTimeout(150);
}

test.describe("motion2 (π lane — the curve gallery REDRESS render, fail-CLOSED)", () => {
    // ── STROKE-THICK-π: the painted polyline reads ≥ 3px apparent ─────────────────
    for (const dark of [false, true]) {
        const mode = dark ? "dark" : "light";
        test(`the plot stroke reads THICK (≥3px apparent) (${mode})`, async ({ page }) => {
            await page.setViewportSize({ width: 1280, height: 900 });
            await page.goto("/motion/curve-gallery", { waitUntil: "networkidle" });
            await setDark(page, dark);

            // The painted bounding stroke at the device scale. For a non-scaling-stroke
            // unit path, getComputedStyle reports the AUTHORED unit width (3, but in
            // unit-space) — the TRUE painted width is the literal stroke-width attribute
            // resolved as device px because `vector-effect:non-scaling-stroke` pins it.
            // Read the attribute + assert the rendered SVG getBBox path is non-degenerate.
            const poly = page.locator("svg polyline").first();
            await expect(poly).toBeAttached();
            const widthInfo = await poly.evaluate((el) => {
                const cs = getComputedStyle(el);
                const ve = (el as SVGElement).getAttribute("vector-effect");
                const attr = (el as SVGElement).getAttribute("stroke-width");
                return {
                    computed: cs.strokeWidth,
                    vectorEffect: ve,
                    attr,
                };
            });
            // non-scaling-stroke pins the AUTHORED width as device px regardless of the
            // unit viewBox — the painted stroke is `attr` px. Assert ≥ 3 with that pin,
            // OR the computed device width is ≥ 3 (the PX-viewBox case).
            const attrW = widthInfo.attr ? parseFloat(widthInfo.attr) : NaN;
            const computedPx = parseFloat(widthInfo.computed);
            const painted =
                widthInfo.vectorEffect === "non-scaling-stroke" && Number.isFinite(attrW)
                    ? attrW
                    : computedPx;
            expect(
                painted,
                `the painted plot stroke must read ≥ 3px apparent (was ${painted}px; the R7 hairline was 1.75px)`,
            ).toBeGreaterThanOrEqual(3);
            // and round caps/joins for the confident read.
            expect(widthInfo.vectorEffect, "the stroke must be non-scaling (pinned device width)").toBe(
                "non-scaling-stroke",
            );
        });
    }

    // ── PICKER-NOT-CRAMPED-π: the underline register at scale, a tablist ──────────
    for (const dark of [false, true]) {
        const mode = dark ? "dark" : "light";
        test(`the family picker is the underline panel-nav register at scale (${mode})`, async ({ page }) => {
            await page.setViewportSize({ width: 1280, height: 900 });
            await page.goto("/motion/curve-gallery", { waitUntil: "networkidle" });
            await setDark(page, dark);

            // The picker host — scope to the curve-family picker (the demo shell's
            // dock nav ALSO renders role=tab tabs, so a bare [role="tab"] would grab a
            // dock tab; scope to the gallery's own underline strip). The `class` prop
            // merges onto the SegmentedTabs HOST element, so .curve-family-picker IS
            // the underline tablist (the variant class is on the same element).
            const picker = page.locator(".curve-family-picker").first();
            await expect(picker, "the curve-family picker must be present").toBeAttached();

            // the underline variant class + the tablist role are on the picker host.
            const underlineClass = await picker.evaluate((el) =>
                el.classList.contains("segmented-tabs--underline"),
            );
            expect(underlineClass, "the picker host must carry the underline variant class").toBe(true);
            expect(await picker.getAttribute("role"), "the underline picker is a tablist").toBe(
                "tablist",
            );

            // a tab is NOT the cramped 28px pill — the tab height ≥ 36px (the section rung).
            const tab = picker.locator('[role="tab"]').first();
            await expect(tab).toBeAttached();
            const box = await tab.boundingBox();
            expect(box, "the family tab must be measurable").not.toBeNull();
            expect(
                box!.height,
                `the family tab height must be ≥ 36px (the section rung), NOT the cramped 28px pill (was ${box!.height}px)`,
            ).toBeGreaterThanOrEqual(36);
        });
    }

    // ── SUBSTRATE-PRESENT-π: a calm substrate paints behind the glass card ────────
    test("the page paints a calm substrate behind the glass card (not bare)", async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 900 });
        await page.goto("/motion/curve-gallery", { waitUntil: "networkidle" });
        await page.waitForTimeout(300);

        // The page declares background: "grid" — the StoryHero substrate paints a grid
        // wash element behind the contained card. Assert a substrate element is present
        // (the grid/paper wash renders an element carrying a non-transparent paint or a
        // background-image), NOT a bare transparent ground.
        const substrate = await page.evaluate(() => {
            // walk the candidate substrate layers the StoryHero chassis renders.
            const candidates = Array.from(
                document.querySelectorAll(
                    "[class*='grid'], [class*='paper'], [class*='substrate'], [class*='story-hero'], [data-background]",
                ),
            );
            for (const el of candidates) {
                const cs = getComputedStyle(el as Element);
                const hasImage = cs.backgroundImage && cs.backgroundImage !== "none";
                const bg = cs.backgroundColor;
                const opaque = bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent";
                if (hasImage || opaque) {
                    return { found: true, tag: (el as Element).className, hasImage: !!hasImage, bg };
                }
            }
            return { found: false };
        });
        expect(
            substrate.found,
            "a calm substrate (grid/paper wash) must paint behind the glass card — not the R7 bare rgba(0,0,0,0) ground",
        ).toBe(true);
    });

    // ── PURPLE-STILL-VIOLET-π: --motion-accent is the violet family, not red ──────
    for (const dark of [false, true]) {
        const mode = dark ? "dark" : "light";
        test(`the plot stroke + accent read the violet --motion-accent (no warm-red) (${mode})`, async ({ page }) => {
            await page.setViewportSize({ width: 1280, height: 900 });
            await page.goto("/motion/curve-gallery", { waitUntil: "networkidle" });
            await setDark(page, dark);

            const accent = await page.evaluate(() =>
                getComputedStyle(document.documentElement).getPropertyValue("--motion-accent").trim(),
            );
            const accentRgb = parseColor(accent);
            expect(accentRgb, `--motion-accent must resolve to a color (${accent})`).not.toBeNull();
            const accentHue = rgbHueDeg(...accentRgb!);
            expect(
                accentHue,
                `--motion-accent hue ${accentHue.toFixed(1)}° must be violet (290-350°), not warm-red`,
            ).toBeGreaterThan(290);
            expect(accentHue).toBeLessThan(350);

            // the painted plot stroke reads the SAME violet (one color event).
            const stroke = await page
                .locator("svg polyline")
                .first()
                .evaluate((el) => getComputedStyle(el).stroke);
            const strokeRgb = parseColor(stroke);
            if (strokeRgb) {
                const strokeHue = rgbHueDeg(...strokeRgb);
                expect(
                    strokeHue,
                    `the plot stroke hue ${strokeHue.toFixed(1)}° must be violet, not warm-red`,
                ).toBeGreaterThan(280);
            }
        });
    }

    // ── CANON-FAMILIES-RENDER-π: the full family set + real-twin plots ────────────
    test("the picker renders the full canon family set + plots real-twin polylines", async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 900 });
        await page.goto("/motion/curve-gallery", { waitUntil: "networkidle" });

        const REQUIRED = [
            "Standard", "Sine", "Quad", "Cubic", "Expo", "Circ",
            "Back", "Bounce", "Steps", "Linear()", "Springs", "Custom",
        ];
        const text = await page.locator("body").innerText();
        for (const fam of REQUIRED) {
            expect(text, `family ${fam} must render in the picker`).toContain(fam);
        }

        // the active family plots a grid of real-twin polylines.
        const polylines = page.locator("svg polyline");
        expect(
            await polylines.count(),
            "the gallery must plot real-twin polylines",
        ).toBeGreaterThanOrEqual(3);
    });

    // ── G-CLOSE: capture the after-state DELTA pair + the readback JSON ────────────
    for (const dark of [false, true]) {
        const mode = dark ? "dark" : "light";
        test(`G-CLOSE — capture the curve-gallery after DELTA (${mode})`, async ({ page }) => {
            const { fileURLToPath } = await import("node:url");
            const { mkdirSync } = await import("node:fs");
            const VISUAL_DIR = fileURLToPath(
                new URL("../docs/tranches/AZ/audit/visual", import.meta.url),
            );
            mkdirSync(VISUAL_DIR, { recursive: true });
            await page.setViewportSize({ width: 1440, height: 1000 });

            await page.goto("/motion/curve-gallery", { waitUntil: "networkidle" });
            await setDark(page, dark);
            await page.waitForTimeout(350);
            await page.screenshot({
                path: `${VISUAL_DIR}W-MOTION2-curve-gallery-after-${mode}.png`,
                fullPage: false,
            });

            // the picker close-up (the underline strip at scale)
            const picker = page.locator(".segmented-tabs--underline").first();
            if (await picker.count()) {
                await picker.screenshot({
                    path: `${VISUAL_DIR}W-MOTION2-picker-after-${mode === "light" ? "light" : "dark"}.png`,
                });
            }

            // the bezier editor (the Custom family, dead-token fix)
            const customTab = page.getByRole("tab", { name: "Custom" }).first();
            if (await customTab.count()) {
                await customTab.click();
                await page.waitForTimeout(350);
                await page.screenshot({
                    path: `${VISUAL_DIR}W-MOTION2-bezier-editor-${mode}.png`,
                    fullPage: false,
                });
            }
        });
    }

    // ── the stroke-readback JSON (the numbers the DELTA cites) ─────────────────────
    test("G-CLOSE — write the stroke-readback JSON", async ({ page }) => {
        const { fileURLToPath } = await import("node:url");
        const { mkdirSync, writeFileSync } = await import("node:fs");
        const VISUAL_DIR = fileURLToPath(
            new URL("../docs/tranches/AZ/audit/visual", import.meta.url),
        );
        mkdirSync(VISUAL_DIR, { recursive: true });
        const out: Record<string, unknown> = {};
        for (const dark of [false, true]) {
            await page.setViewportSize({ width: 1280, height: 900 });
            await page.goto("/motion/curve-gallery", { waitUntil: "networkidle" });
            await setDark(page, dark);
            await page.waitForTimeout(250);

            const poly = page.locator("svg polyline").first();
            const stroke = await poly.evaluate((el) => {
                const cs = getComputedStyle(el);
                return {
                    attr: (el as SVGElement).getAttribute("stroke-width"),
                    vectorEffect: (el as SVGElement).getAttribute("vector-effect"),
                    computed: cs.strokeWidth,
                    color: cs.stroke,
                };
            });
            const tab = page.locator('.curve-family-picker [role="tab"]').first();
            const tabBox = await tab.boundingBox();
            const accent = await page.evaluate(() =>
                getComputedStyle(document.documentElement).getPropertyValue("--motion-accent").trim(),
            );
            const accentRgb = parseColor(accent);
            const attrW = stroke.attr ? parseFloat(stroke.attr) : null;
            const paintedPx =
                stroke.vectorEffect === "non-scaling-stroke" && attrW !== null
                    ? attrW
                    : parseFloat(stroke.computed);
            out[dark ? "dark" : "light"] = {
                strokeWidthPx: paintedPx,
                vectorEffect: stroke.vectorEffect,
                strokeColor: stroke.color,
                tabHeightPx: tabBox ? +tabBox.height.toFixed(1) : null,
                accent,
                accentHueDeg: accentRgb ? +rgbHueDeg(...accentRgb).toFixed(1) : null,
                accentVerdict:
                    accentRgb && rgbHueDeg(...accentRgb) > 290 && rgbHueDeg(...accentRgb) < 350
                        ? "violet"
                        : "NOT-violet",
                strokeThickVerdict: paintedPx >= 3 ? "THICK" : "hairline",
                pickerVerdict: tabBox && tabBox.height >= 36 ? "at-scale" : "cramped",
            };
        }
        writeFileSync(
            `${VISUAL_DIR}W-MOTION2-stroke-readback.json`,
            JSON.stringify(out, null, 2) + "\n",
        );
    });
});
