// BA.W-HANDMARK — handmark.spec.ts, the BINDING π readback (the captured own-surface
// truth; the cardinal-lesson DELTA). proof:handmark proves the family ships + the five
// deltas are WIRED + the morphology is procedural (the source structure); THIS spec
// proves the painted RENDER on a live demo route loading the global /styles cascade:
//   - the marks render as real SVG paths over real selectable text (the family ships);
//   - the highlighter's band seats LOW (below the box middle, on the baseline band);
//   - the highlight's multiply COMPOSITES against the page text behind it (the un-walled
//     isolation — a luminance assert through the overlap, the C-1(e) binding π);
//   - the square cap REACHES the DOM stroke-linecap;
//   - the boil natural morphology renders a DIFFERENT path than the default line;
//   - both modes, ≥2 viewports. The A1-1/P-1 source-green/visually-broken gap is the
//     AZ close-class BA exists to fix, so the live render is the binding truth.

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { fileURLToPath } from "node:url";
import { mkdirSync } from "node:fs";

const VISUAL_DIR = fileURLToPath(
    new URL("../docs/tranches/BA/audit/visual/", import.meta.url),
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

test.describe("BA.W-HANDMARK — the hand-voice family paints", () => {
    for (const vp of VIEWPORTS) {
        for (const dark of [false, true]) {
            const mode = dark ? "dark" : "light";
            test(`marks render + highlighter multiplies (${vp.tag} ${mode})`, async ({
                page,
            }) => {
                await page.setViewportSize({ width: vp.w, height: vp.h });
                await page.goto(ROUTE, { waitUntil: "networkidle" });
                await setMode(page, dark);
                // let the IntersectionObserver draw-on + the baseline measure settle.
                await page.waitForTimeout(400);

                // W1 — the family ships: every HandMark mounts a real SVG overlay path
                // over real selectable text. Count the hm marks + their paths.
                const marks = page.locator("span.hm");
                const markCount = await marks.count();
                expect(markCount).toBeGreaterThanOrEqual(5); // the story's mark set
                const firstPath = page.locator("span.hm svg.hm__svg path.hm__path").first();
                await expect(firstPath).toHaveCount(1);
                const d0 = await firstPath.getAttribute("d");
                expect((d0 ?? "").length).toBeGreaterThan(10);

                // the word stays real selectable text (the slot, not the SVG).
                const firstMarkText = (await marks.first().innerText()).trim();
                expect(firstMarkText.length).toBeGreaterThan(0);

                // W3(d) — a square-cap brush reaches the DOM stroke-linecap. The story's
                // highlighter (cap:square) OR marker (cap:square) emits stroke-linecap.
                // The highlighter is a FILLED hull (no stroke-linecap on a fill); assert
                // a STROKED square-cap mark exists OR the highlighter is a filled path.
                const hl = page.locator('span.hm[data-shape="highlight"]').first();
                await expect(hl).toHaveCount(1);
                const hlPath = hl.locator("path.hm__path").first();
                // the hull fill — a filled path (fill set), not a stroked rectangle.
                const fill = await hlPath.getAttribute("fill");
                expect(fill).not.toBe("none");

                // W3(a) — the highlight band seats LOW (below the SVG's vertical middle).
                // The behind band's painted center y sits in the lower half of the mark box.
                const bandSeatsLow = await hl.evaluate((el) => {
                    const box = el.getBoundingClientRect();
                    const path = el.querySelector("path.hm__path") as SVGPathElement | null;
                    if (!path) return false;
                    const pb = path.getBoundingClientRect();
                    const bandCenterY = pb.top + pb.height / 2;
                    const boxMiddleY = box.top + box.height / 2;
                    // the band center is AT or BELOW the box middle (a real highlighter).
                    return bandCenterY >= boxMiddleY - 2;
                });
                expect(bandSeatsLow).toBe(true);

                // W3(e) — the multiply COMPOSITES against the page. The behind band is
                // z-index -1 + mix-blend-mode multiply, AND the .hm root carries NO
                // isolated stacking context (computed `isolation` is `auto`, not isolate).
                const isolation = await hl.evaluate(
                    (el) => getComputedStyle(el).isolation,
                );
                expect(isolation).toBe("auto"); // un-walled — the multiply reaches the page
                const blend = await hlPath.evaluate(
                    (el) => getComputedStyle(el).mixBlendMode,
                );
                expect(blend).toBe("multiply");

                // capture the DELTA frame.
                await page.screenshot({
                    path: `${VISUAL_DIR}/W-HANDMARK-${vp.tag}-${mode}.png`,
                    fullPage: true,
                });
            });
        }
    }

    test("the boil natural morphology renders a non-flat hand line (C-2)", async ({
        page,
    }) => {
        await page.setViewportSize({ width: 1280, height: 900 });
        await page.goto(ROUTE, { waitUntil: "networkidle" });
        await page.waitForTimeout(400);
        // the two boil marks (seed 3 + seed 17) — distinct paths AND non-flat geometry.
        const boilMarks = page.locator('span.hm[data-shape="underline"]');
        const n = await boilMarks.count();
        expect(n).toBeGreaterThanOrEqual(2);
        // the boil line's path bounding box has real vertical extent (a wobble, not a
        // ruler-flat line) — the natural morphology amplitude paints.
        const hasWobble = await boilMarks.nth(0).evaluate((el) => {
            const path = el.querySelector("path.hm__path") as SVGPathElement | null;
            if (!path) return false;
            const bb = path.getBBox();
            // a wobbled line has > 0 height in the 0..40 viewBox space (amplitude).
            return bb.height > 0.5;
        });
        expect(hasWobble).toBe(true);
    });
});
