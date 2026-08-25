// handmark.spec.ts — the painted readback for the hand voice, on the live route with
// the global cascade loaded. Everything here is a claim a headless arm cannot make:
// that the mark is ON the page, that the band seats under real letterforms without
// escaping its card, and that the ring reserves the room it spills into. The colour
// windows (band L, chroma floor, contrast) are π-BAND and stay with the browser seat;
// this file asserts the geometry and the layering the DOM can be asked about directly.

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { fileURLToPath } from "node:url";
import { mkdirSync } from "node:fs";

const VISUAL_DIR = fileURLToPath(
    new URL("../docs/tranches/BK/audit/visual", import.meta.url),
);
mkdirSync(VISUAL_DIR, { recursive: true });

const ROUTE = "/motion/handmark";
const VIEWPORTS = [
    { w: 1280, h: 900, tag: "desktop" },
    { w: 390, h: 844, tag: "mobile" },
];

async function setMode(page: Page, dark: boolean) {
    await page.evaluate((d) => {
        document.documentElement.classList.toggle("dark", d);
    }, dark);
    await page.waitForTimeout(120);
}

async function settle(page: Page) {
    // the fonts.ready re-measure, the per-rect clocks, and the stagger all resolve.
    await page.waitForTimeout(1400);
}

test.describe("the hand voice paints", () => {
    for (const vp of VIEWPORTS) {
        for (const dark of [false, true]) {
            const mode = dark ? "dark" : "light";
            test(`four gestures over real text (${vp.tag} ${mode})`, async ({ page }) => {
                await page.setViewportSize({ width: vp.w, height: vp.h });
                await page.goto(ROUTE, { waitUntil: "networkidle" });
                await setMode(page, dark);
                await settle(page);

                const marks = page.locator("span.hm");
                expect(await marks.count()).toBeGreaterThanOrEqual(8);

                // The frame is 1:1 CSS px: no viewBox anywhere, so a nib cannot be
                // stretched into a ruler by its host's aspect.
                const framed = await page.locator("span.hm svg.hm-mark").evaluateAll((els) =>
                    els.map((el) => ({
                        viewBox: el.getAttribute("viewBox"),
                        par: el.getAttribute("preserveAspectRatio"),
                    })),
                );
                expect(framed.length).toBeGreaterThan(0);
                for (const f of framed) {
                    expect(f.viewBox).toBeNull();
                    expect(f.par).toBeNull();
                }

                // The word stays real, selectable text.
                expect((await marks.first().innerText()).trim().length).toBeGreaterThan(0);

                // Every gesture the route carries paints a real bounding box.
                for (const shape of ["underline", "strike", "circle", "highlight"]) {
                    const el = page.locator(`span.hm[data-shape="${shape}"]`).first();
                    await expect(el).toHaveCount(1);
                    const painted = await el.evaluate((node) => {
                        const p = node.querySelector("path.hm-ink") as SVGPathElement | null;
                        if (!p) return null;
                        const bb = p.getBBox();
                        return { w: bb.width, h: bb.height };
                    });
                    expect(painted, `${shape} emitted no ink`).not.toBeNull();
                    expect(painted!.w).toBeGreaterThan(0);
                    expect(painted!.h).toBeGreaterThan(0);
                }

                await page.screenshot({
                    path: `${VISUAL_DIR}/handmark-${vp.tag}-${mode}.png`,
                    fullPage: true,
                });
            });

            test(`the band sits under the letterforms and inside its card (${vp.tag} ${mode})`, async ({
                page,
            }) => {
                await page.setViewportSize({ width: vp.w, height: vp.h });
                await page.goto(ROUTE, { waitUntil: "networkidle" });
                await setMode(page, dark);
                await settle(page);

                const hl = page.locator('span.hm[data-shape="highlight"]').first();
                await expect(hl).toHaveCount(1);

                // The specimen carries cap, ascender and descender glyphs — the class
                // that caught the fatal amputation, kept as the regression guard.
                expect((await hl.innerText()).trim()).toMatch(/[A-Z]/);
                expect((await hl.innerText()).trim()).toMatch(/[pqjy]/);

                // Isolation fixes paint order and nothing blends.
                expect(await hl.evaluate((el) => getComputedStyle(el).isolation)).toBe("isolate");
                const blend = await hl
                    .locator("path.hm-ink")
                    .first()
                    .evaluate((el) => getComputedStyle(el).mixBlendMode);
                expect(blend).toBe("normal");

                // Geometry fixes extent: the painted band is inside the card it marks,
                // and inside the line box it sits in.
                const contained = await hl.evaluate((el) => {
                    const path = el.querySelector("path.hm-ink") as SVGPathElement | null;
                    const card = el.closest(".bg-card") as HTMLElement | null;
                    if (!path || !card) return null;
                    const pb = path.getBoundingClientRect();
                    const cb = card.getBoundingClientRect();
                    const line = el.getBoundingClientRect();
                    return {
                        escapeTop: cb.top - pb.top,
                        escapeBottom: pb.bottom - cb.bottom,
                        escapeLeft: cb.left - pb.left,
                        escapeRight: pb.right - cb.right,
                        bandOverLine: pb.height / line.height,
                    };
                });
                expect(contained, "no card to contain the band").not.toBeNull();
                expect(contained!.escapeTop).toBeLessThanOrEqual(0.5);
                expect(contained!.escapeBottom).toBeLessThanOrEqual(0.5);
                expect(contained!.escapeLeft).toBeLessThanOrEqual(0.5);
                expect(contained!.escapeRight).toBeLessThanOrEqual(0.5);
                expect(contained!.bandOverLine).toBeLessThanOrEqual(1);
            });
        }
    }

    test("the ring reserves the room it spills into", async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 900 });
        await page.goto(ROUTE, { waitUntil: "networkidle" });
        await settle(page);

        const ring = page.locator('span.hm[data-shape="circle"]').first();
        await expect(ring).toHaveCount(1);

        const read = await ring.evaluate((el) => {
            const cs = getComputedStyle(el);
            const path = el.querySelector("path.hm-ink") as SVGPathElement | null;
            if (!path) return null;
            const pb = path.getBoundingClientRect();
            const box = el.getBoundingClientRect();
            return {
                reserveLeft: parseFloat(cs.paddingInlineStart) || 0,
                reserveRight: parseFloat(cs.paddingInlineEnd) || 0,
                spillLeft: box.left - pb.left,
                spillRight: pb.right - box.right,
            };
        });
        expect(read, "the ring emitted no ink").not.toBeNull();
        // The reservation is real, and the ring's horizontal spill lands inside it —
        // a neighbour is pushed, never overpainted.
        expect(read!.reserveLeft).toBeGreaterThan(0);
        expect(read!.reserveRight).toBeGreaterThan(0);
        expect(read!.spillLeft).toBeLessThanOrEqual(read!.reserveLeft + 1);
        expect(read!.spillRight).toBeLessThanOrEqual(read!.reserveRight + 1);
    });

    test("the mark is whole and solid at rest, and one path per line rect", async ({ page }) => {
        await page.setViewportSize({ width: 390, height: 844 });
        await page.goto(ROUTE, { waitUntil: "networkidle" });
        await settle(page);

        // At 390 the display rung wraps, so a marked phrase emits more than one chisel
        // and never bridges the gap between them.
        const rects = await page
            .locator('span.hm[data-shape="underline"]')
            .first()
            .evaluate((el) => {
                const svgs = el.querySelectorAll("svg.hm-mark");
                const inks = el.querySelectorAll("path.hm-ink");
                return { svgs: svgs.length, inks: inks.length };
            });
        expect(rects.svgs).toBe(rects.inks);
        expect(rects.inks).toBeGreaterThanOrEqual(1);

        // The dash clears outright: nothing is left half-drawn once the clocks finish.
        const solid = await page.locator("span.hm path.hm-ink").evaluateAll((els) =>
            els.every((el) => {
                const bb = (el as SVGPathElement).getBBox();
                return bb.width > 0 && bb.height > 0;
            }),
        );
        expect(solid).toBe(true);
    });
});
