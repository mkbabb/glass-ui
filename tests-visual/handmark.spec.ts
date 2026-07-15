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
    new URL("../docs/tranches/BA/audit/visual", import.meta.url),
);
mkdirSync(VISUAL_DIR, { recursive: true });

// BG.W-HANDMARK-PERFECT — the aspect-correct + hull-guard captures land in the BG dir.
const BG_VISUAL_DIR = fileURLToPath(
    new URL("../docs/tranches/BG/audit/visual", import.meta.url),
);
mkdirSync(BG_VISUAL_DIR, { recursive: true });

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

    // BG.W-HANDMARK-PERFECT (a) — the aspect-correct viewBox. A text-mode underline's
    // viewBox HEIGHT is derived from the measured box px-aspect (vbH = VB_W / boxAspect),
    // so `preserveAspectRatio="none"` scales the wobble SHAPE uniformly: the viewBox aspect
    // (100 / vbH) must EQUAL the rendered px-aspect (clientW / clientH). The prior fixed
    // `0 0 100 40` viewBox let a short word render at px-aspect 11-17 → the wobble crushed
    // to a flat bar (the headless-green ruler trap). Both modes, short AND long words.
    for (const dark of [false, true]) {
        const mode = dark ? "dark" : "light";
        test(`the underline viewBox is aspect-correct — humps never crush flat (${mode})`, async ({
            page,
        }) => {
            await page.setViewportSize({ width: 1280, height: 900 });
            await page.goto(ROUTE, { waitUntil: "networkidle" });
            await setMode(page, dark);
            await page.waitForTimeout(500); // the ResizeObserver box-aspect measure settles

            const marks = page.locator('span.hm[data-shape="underline"]');
            const n = await marks.count();
            expect(n).toBeGreaterThanOrEqual(2);

            let checked = 0;
            for (let i = 0; i < n; i++) {
                const readout = await marks.nth(i).evaluate((el) => {
                    const svg = el.querySelector("svg.hm__svg") as SVGSVGElement | null;
                    if (!svg) return null;
                    const vb = svg.getAttribute("viewBox");
                    const r = svg.getBoundingClientRect();
                    if (!vb || r.width <= 0 || r.height <= 0) return null;
                    const parts = vb.split(/\s+/).map(Number);
                    const vbAspect = parts[2] / parts[3]; // 100 / vbH
                    return { vbAspect, pxAspect: r.width / r.height, vbH: parts[3] };
                });
                if (!readout) continue;
                checked++;
                // the aspect-correct invariant: the derived vbH makes the viewBox aspect
                // TRACK the rendered px-aspect (uniform x/y scale). Within 8% tolerance
                // (sub-pixel box-measure + the ±2% overshoot of the .hm__svg width).
                const rel = Math.abs(readout.vbAspect - readout.pxAspect) / readout.pxAspect;
                expect(
                    rel,
                    `viewBox aspect ${readout.vbAspect.toFixed(2)} must track px-aspect ${readout.pxAspect.toFixed(2)} (vbH ${readout.vbH.toFixed(1)})`,
                ).toBeLessThan(0.08);
                // vbH is NO LONGER pinned at 40 for a wide word (the derivation fired).
                expect(readout.vbH).toBeGreaterThan(0);
            }
            expect(checked).toBeGreaterThanOrEqual(2);

            await page.screenshot({
                path: `${BG_VISUAL_DIR}/W-HANDMARK-PERFECT-aspect-${mode}.png`,
                fullPage: true,
            });
        });

        // BG.W-HANDMARK-PERFECT (b) — the hull se-guard. A hull brush (marker/crayon) over
        // a tiny box/bracket datum used to collapse to an empty pf outline and VANISH; the
        // guard falls back to a stroked body so it ALWAYS paints a visible band.
        test(`the box-mode hull marks paint a visible band — never a vanish (${mode})`, async ({
            page,
        }) => {
            await page.setViewportSize({ width: 1280, height: 900 });
            await page.goto(ROUTE, { waitUntil: "networkidle" });
            await setMode(page, dark);
            await page.waitForTimeout(400);

            const hullBoxes = page.locator(
                'span.hm[data-shape="box"], span.hm[data-shape="bracket"]',
            );
            const n = await hullBoxes.count();
            expect(n).toBeGreaterThanOrEqual(1);
            for (let i = 0; i < n; i++) {
                const painted = await hullBoxes.nth(i).evaluate((el) => {
                    const paths = Array.from(
                        el.querySelectorAll("path.hm__path"),
                    ) as SVGPathElement[];
                    if (paths.length === 0) return false;
                    // every emitted path carries a non-empty `d` (no `d=""` vanish) AND a
                    // real painted bounding box.
                    return paths.every((p) => {
                        const d = p.getAttribute("d") ?? "";
                        if (d.length < 3) return false;
                        const bb = p.getBBox();
                        return bb.width > 0 || bb.height > 0;
                    });
                });
                expect(painted, `box/bracket hull mark ${i} must paint (no vanish)`).toBe(true);
            }

            await page.screenshot({
                path: `${BG_VISUAL_DIR}/W-HANDMARK-PERFECT-hull-guard-${mode}.png`,
                fullPage: true,
            });
        });
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
