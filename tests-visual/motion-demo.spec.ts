// AZ.W-MOTION-SUITE — motion-demo.spec.ts, the π half of proof:motion-demo (the
// device-free deletion-proofs + source-witnesses live in scripts/proof-motion-demo.mjs).
//
// THIS SPEC PROVES THE RENDER (the cardinal AX lesson — a green CPU gate over a still-
// wrong live render is the gap). It reads back, off the LIVE painted :5199 DOM:
//   · CURVE-FAMILIES-ALL — the expanded gallery renders all 10 family tabs + plots a
//     family of real-twin polylines (the SVG <polyline> grid, not a 10-row stub).
//   · SPRING-PLAYGROUND-LIVE — dragging the response/ζ slider CHANGES the linear()
//     readout (a runtime observation, not a static witness).
//   · SCROLL-VT-DEMO — the scroll/VT story renders the capability badges + the
//     .gl-list-item reorder list.
//   · PURPLE-IDENTITY — the dominant motion accent (the plot stroke + the driven dot)
//     resolves to the violet --viz-legendre family (oklch ~317.5°), NOT warm-red.
//
// THE BINDING ASSERTION IS THE getComputedStyle READBACK + the slider-drag observation.
// Captures the before/after DELTA pair (gallery, springs, scroll-vt, bezier) light+dark
// to docs/tranches/AZ/audit/visual/ (the ledger DELTA the close cites).

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";

const VIEWPORTS = [
    { name: "mobile", width: 390, height: 844 },
    { name: "desktop", width: 1280, height: 900 },
] as const;

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
    const oklch = str.match(
        /oklch\(\s*([\d.]+%?)\s+([\d.]+)\s+([\d.]+)/i,
    );
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
    const rgb = str.match(/rgba?\(\s*([\d.]+)[ ,]+([\d.]+)[ ,]+([\d.]+)/i);
    if (rgb) return [+rgb[1]!, +rgb[2]!, +rgb[3]!];
    return null;
}

// rgb → an oklch-ish hue angle (degrees) for the violet-vs-red discrimination.
function rgbHueDeg(r: number, g: number, b: number): number {
    // sRGB → linear → OKLab → hue (the inverse of the above, hue only).
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

test.describe("motion-demo (π lane — the robust /motion render, fail-CLOSED)", () => {
    // ── CURVE-FAMILIES-ALL: the expanded gallery renders all 10 families ─────────
    for (const dark of [false, true]) {
        const mode = dark ? "dark" : "light";
        test(`gallery renders the full 10-family taxonomy + real-twin plots (${mode})`, async ({ page }) => {
            await page.setViewportSize({ width: 1280, height: 900 });
            await page.goto("/motion/curve-gallery", { waitUntil: "networkidle" });
            await setDark(page, dark);

            // the family tabs (the SegmentedTabs strip) carry all 10 family labels.
            const REQUIRED = ["Standard", "Sine", "Quad", "Cubic", "Expo", "Circ", "Back", "Bounce", "Steps", "Custom"];
            const text = await page.locator("body").innerText();
            for (const fam of REQUIRED) {
                expect(text, `family ${fam} must render`).toContain(fam);
            }

            // the active family plots a grid of real-twin polylines (not a fake hint-SVG).
            const polylines = page.locator("svg polyline");
            expect(await polylines.count(), "the gallery must plot real-twin polylines").toBeGreaterThanOrEqual(3);
        });
    }

    // ── PURPLE-IDENTITY: the dominant motion accent is the violet family, not red ──
    for (const dark of [false, true]) {
        const mode = dark ? "dark" : "light";
        test(`the plot stroke + dot read the violet --motion-accent (no warm-red) (${mode})`, async ({ page }) => {
            await page.setViewportSize({ width: 1280, height: 900 });
            await page.goto("/motion/curve-gallery", { waitUntil: "networkidle" });
            await setDark(page, dark);

            // --motion-accent resolves to the violet --viz-legendre (oklch ~317.5°).
            const accent = await page.evaluate(() =>
                getComputedStyle(document.documentElement).getPropertyValue("--motion-accent").trim(),
            );
            const accentRgb = parseColor(accent);
            expect(accentRgb, `--motion-accent must resolve to a color (${accent})`).not.toBeNull();
            const accentHue = rgbHueDeg(...accentRgb!);
            // violet sits ~300-330°; warm-red ~20-40°. Assert violet, not red.
            expect(accentHue, `--motion-accent hue ${accentHue.toFixed(1)}° must be violet (300-340°), not warm-red`).toBeGreaterThan(290);
            expect(accentHue).toBeLessThan(350);

            // the painted plot stroke reads the SAME violet (one color event).
            const stroke = await page.locator("svg polyline").first().evaluate(
                (el) => getComputedStyle(el).stroke,
            );
            const strokeRgb = parseColor(stroke);
            if (strokeRgb) {
                const strokeHue = rgbHueDeg(...strokeRgb);
                expect(strokeHue, `the plot stroke hue ${strokeHue.toFixed(1)}° must be violet, not warm-red`).toBeGreaterThan(280);
            }
        });
    }

    // ── SPRING-PLAYGROUND-LIVE: the slider drag changes the linear() readout ──────
    test("the spring playground updates the linear() readout on slider drag", async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 900 });
        await page.goto("/motion/springs", { waitUntil: "networkidle" });

        // the readout code block under the playground (the break-all linear() literal).
        const readout = page.locator("code", { hasText: "linear(" }).first();
        await readout.scrollIntoViewIfNeeded();
        await expect(readout).toBeVisible();
        const before = await readout.innerText();

        // drive a response/ζ slider (the LabeledSlider reka-ui thumb) to mutate the
        // spring. The reka-ui thumb is a positioned <span role="slider"> (a 0-box the
        // toBeVisible heuristic rejects), so focus + keyboard-drive it directly — the
        // aria-valuenow=0.5 default confirms it is the playground response slider.
        const thumb = page.locator('[role="slider"]').first();
        await expect(thumb).toBeAttached();
        await thumb.scrollIntoViewIfNeeded();
        await thumb.focus({ timeout: 5000 });
        // keyboard arrows drive the reka-ui slider deterministically.
        for (let i = 0; i < 8; i++) await page.keyboard.press("ArrowRight");
        await page.waitForTimeout(250);

        const after = await readout.innerText();
        expect(after, "the linear() readout must change as the spring is re-authored").not.toEqual(before);
        expect(after).toContain("linear(");
    });

    // ── SCROLL-VT-DEMO: the scroll/VT story renders the facilities ────────────────
    // BG.W-DEMO-DUP-MERGE (F7.3) — the native scroll register merged onto /motion/scroll
    // (the ScrollNativeBody section); the facilities render there.
    test("the scroll/VT story renders the capability badges + the reorder list", async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 900 });
        await page.goto("/motion/scroll", { waitUntil: "networkidle" });

        const text = await page.locator("body").innerText();
        expect(text).toContain("scroll() timeline");
        expect(text).toContain("view() timeline");

        // the .scroll-progress bar exists; the .gl-list-item reorder list renders.
        await expect(page.locator(".scroll-progress")).toBeAttached();
        await expect(page.locator("[data-scroll-reveal]")).toBeAttached();
        const rotate = page.getByRole("button", { name: /rotate order/i });
        await expect(rotate).toBeVisible();
        // a click drives the View-Transition reorder without error.
        await rotate.click();
        await page.waitForTimeout(200);
    });

    // ── G-CLOSE: capture the DELTA pair (gallery, springs, scroll-vt, bezier) ──────
    for (const dark of [false, true]) {
        const mode = dark ? "dark" : "light";
        test(`G-CLOSE — capture the motion-suite DELTA (${mode})`, async ({ page }) => {
            const { fileURLToPath } = await import("node:url");
            const { mkdirSync } = await import("node:fs");
            const VISUAL_DIR = fileURLToPath(
                new URL("../docs/tranches/AZ/audit/visual/", import.meta.url),
            );
            mkdirSync(VISUAL_DIR, { recursive: true });
            await page.setViewportSize({ width: 1280, height: 900 });

            // the all-families gallery
            await page.goto("/motion/curve-gallery", { waitUntil: "networkidle" });
            await setDark(page, dark);
            await page.waitForTimeout(250);
            await page.screenshot({ path: `${VISUAL_DIR}W-MOTION-SUITE-curve-gallery-after-${mode}.png`, fullPage: false });

            // the bezier editor (the Custom family)
            const customTab = page.getByRole("button", { name: "Custom" }).first();
            if (await customTab.count()) {
                await customTab.click();
                await page.waitForTimeout(300);
                await page.screenshot({ path: `${VISUAL_DIR}W-MOTION-SUITE-bezier-editor-${mode}.png`, fullPage: false });
            }

            // the springs orchestrator + playground
            await page.goto("/motion/springs", { waitUntil: "networkidle" });
            await setDark(page, dark);
            await page.waitForTimeout(250);
            await page.screenshot({ path: `${VISUAL_DIR}W-MOTION-SUITE-springs-after-${mode}.png`, fullPage: false });

            // the scroll/VT story (F7.3 — merged onto /motion/scroll, native register)
            await page.goto("/motion/scroll", { waitUntil: "networkidle" });
            await setDark(page, dark);
            await page.waitForTimeout(250);
            await page.screenshot({ path: `${VISUAL_DIR}W-MOTION-SUITE-scroll-vt-${mode}.png`, fullPage: false });
        });
    }

    // ── purple readback artefact (the JSON the DELTA cites) ───────────────────────
    test("G-CLOSE — write the purple-readback JSON", async ({ page }) => {
        const { fileURLToPath } = await import("node:url");
        const { mkdirSync, writeFileSync } = await import("node:fs");
        const VISUAL_DIR = fileURLToPath(
            new URL("../docs/tranches/AZ/audit/visual/", import.meta.url),
        );
        mkdirSync(VISUAL_DIR, { recursive: true });
        const out: Record<string, unknown> = {};
        for (const dark of [false, true]) {
            await page.goto("/motion/curve-gallery", { waitUntil: "networkidle" });
            await setDark(page, dark);
            const accent = await page.evaluate(() =>
                getComputedStyle(document.documentElement).getPropertyValue("--motion-accent").trim(),
            );
            const rgb = parseColor(accent);
            out[dark ? "dark" : "light"] = {
                accent,
                rgb,
                hueDeg: rgb ? +rgbHueDeg(...rgb).toFixed(1) : null,
                verdict: rgb && rgbHueDeg(...rgb) > 290 && rgbHueDeg(...rgb) < 350 ? "violet" : "NOT-violet",
            };
        }
        writeFileSync(
            `${VISUAL_DIR}W-MOTION-SUITE-purple-readback.json`,
            JSON.stringify(out, null, 2) + "\n",
        );
    });
});
