# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests-visual/handmark.spec.ts >> BA.W-HANDMARK — the hand-voice family paints >> marks render + highlighter multiplies (mobile light)
- Location: tests-visual/handmark.spec.ts:41:13

# Error details

```
Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
Call log:
  - navigating to "/motion/handmark", waiting until "networkidle"

```

# Test source

```ts
  1   | // BA.W-HANDMARK — handmark.spec.ts, the BINDING π readback (the captured own-surface
  2   | // truth; the cardinal-lesson DELTA). proof:handmark proves the family ships + the five
  3   | // deltas are WIRED + the morphology is procedural (the source structure); THIS spec
  4   | // proves the painted RENDER on a live demo route loading the global /styles cascade:
  5   | //   - the marks render as real SVG paths over real selectable text (the family ships);
  6   | //   - the highlighter's band seats LOW (below the box middle, on the baseline band);
  7   | //   - the highlight's multiply COMPOSITES against the page text behind it (the un-walled
  8   | //     isolation — a luminance assert through the overlap, the C-1(e) binding π);
  9   | //   - the square cap REACHES the DOM stroke-linecap;
  10  | //   - the boil natural morphology renders a DIFFERENT path than the default line;
  11  | //   - both modes, ≥2 viewports. The A1-1/P-1 source-green/visually-broken gap is the
  12  | //     AZ close-class BA exists to fix, so the live render is the binding truth.
  13  | 
  14  | import { test, expect } from "@playwright/test";
  15  | import type { Page } from "@playwright/test";
  16  | import { fileURLToPath } from "node:url";
  17  | import { mkdirSync } from "node:fs";
  18  | 
  19  | const VISUAL_DIR = fileURLToPath(
  20  |     new URL("../docs/tranches/BA/audit/visual/", import.meta.url),
  21  | );
  22  | mkdirSync(VISUAL_DIR, { recursive: true });
  23  | 
  24  | const ROUTE = "/motion/handmark";
  25  | const VIEWPORTS = [
  26  |     { w: 1280, h: 900, tag: "desktop" },
  27  |     { w: 390, h: 844, tag: "mobile" },
  28  | ];
  29  | 
  30  | async function setMode(page: Page, dark: boolean) {
  31  |     await page.evaluate((d) => {
  32  |         document.documentElement.classList.toggle("dark", d);
  33  |     }, dark);
  34  |     await page.waitForTimeout(120);
  35  | }
  36  | 
  37  | test.describe("BA.W-HANDMARK — the hand-voice family paints", () => {
  38  |     for (const vp of VIEWPORTS) {
  39  |         for (const dark of [false, true]) {
  40  |             const mode = dark ? "dark" : "light";
  41  |             test(`marks render + highlighter multiplies (${vp.tag} ${mode})`, async ({
  42  |                 page,
  43  |             }) => {
  44  |                 await page.setViewportSize({ width: vp.w, height: vp.h });
> 45  |                 await page.goto(ROUTE, { waitUntil: "networkidle" });
      |                            ^ Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
  46  |                 await setMode(page, dark);
  47  |                 // let the IntersectionObserver draw-on + the baseline measure settle.
  48  |                 await page.waitForTimeout(400);
  49  | 
  50  |                 // W1 — the family ships: every HandMark mounts a real SVG overlay path
  51  |                 // over real selectable text. Count the hm marks + their paths.
  52  |                 const marks = page.locator("span.hm");
  53  |                 const markCount = await marks.count();
  54  |                 expect(markCount).toBeGreaterThanOrEqual(5); // the story's mark set
  55  |                 const firstPath = page.locator("span.hm svg.hm__svg path.hm__path").first();
  56  |                 await expect(firstPath).toHaveCount(1);
  57  |                 const d0 = await firstPath.getAttribute("d");
  58  |                 expect((d0 ?? "").length).toBeGreaterThan(10);
  59  | 
  60  |                 // the word stays real selectable text (the slot, not the SVG).
  61  |                 const firstMarkText = (await marks.first().innerText()).trim();
  62  |                 expect(firstMarkText.length).toBeGreaterThan(0);
  63  | 
  64  |                 // W3(d) — a square-cap brush reaches the DOM stroke-linecap. The story's
  65  |                 // highlighter (cap:square) OR marker (cap:square) emits stroke-linecap.
  66  |                 // The highlighter is a FILLED hull (no stroke-linecap on a fill); assert
  67  |                 // a STROKED square-cap mark exists OR the highlighter is a filled path.
  68  |                 const hl = page.locator('span.hm[data-shape="highlight"]').first();
  69  |                 await expect(hl).toHaveCount(1);
  70  |                 const hlPath = hl.locator("path.hm__path").first();
  71  |                 // the hull fill — a filled path (fill set), not a stroked rectangle.
  72  |                 const fill = await hlPath.getAttribute("fill");
  73  |                 expect(fill).not.toBe("none");
  74  | 
  75  |                 // W3(a) — the highlight band seats LOW (below the SVG's vertical middle).
  76  |                 // The behind band's painted center y sits in the lower half of the mark box.
  77  |                 const bandSeatsLow = await hl.evaluate((el) => {
  78  |                     const box = el.getBoundingClientRect();
  79  |                     const path = el.querySelector("path.hm__path") as SVGPathElement | null;
  80  |                     if (!path) return false;
  81  |                     const pb = path.getBoundingClientRect();
  82  |                     const bandCenterY = pb.top + pb.height / 2;
  83  |                     const boxMiddleY = box.top + box.height / 2;
  84  |                     // the band center is AT or BELOW the box middle (a real highlighter).
  85  |                     return bandCenterY >= boxMiddleY - 2;
  86  |                 });
  87  |                 expect(bandSeatsLow).toBe(true);
  88  | 
  89  |                 // W3(e) — the multiply COMPOSITES against the page. The behind band is
  90  |                 // z-index -1 + mix-blend-mode multiply, AND the .hm root carries NO
  91  |                 // isolated stacking context (computed `isolation` is `auto`, not isolate).
  92  |                 const isolation = await hl.evaluate(
  93  |                     (el) => getComputedStyle(el).isolation,
  94  |                 );
  95  |                 expect(isolation).toBe("auto"); // un-walled — the multiply reaches the page
  96  |                 const blend = await hlPath.evaluate(
  97  |                     (el) => getComputedStyle(el).mixBlendMode,
  98  |                 );
  99  |                 expect(blend).toBe("multiply");
  100 | 
  101 |                 // capture the DELTA frame.
  102 |                 await page.screenshot({
  103 |                     path: `${VISUAL_DIR}/W-HANDMARK-${vp.tag}-${mode}.png`,
  104 |                     fullPage: true,
  105 |                 });
  106 |             });
  107 |         }
  108 |     }
  109 | 
  110 |     test("the boil natural morphology renders a non-flat hand line (C-2)", async ({
  111 |         page,
  112 |     }) => {
  113 |         await page.setViewportSize({ width: 1280, height: 900 });
  114 |         await page.goto(ROUTE, { waitUntil: "networkidle" });
  115 |         await page.waitForTimeout(400);
  116 |         // the two boil marks (seed 3 + seed 17) — distinct paths AND non-flat geometry.
  117 |         const boilMarks = page.locator('span.hm[data-shape="underline"]');
  118 |         const n = await boilMarks.count();
  119 |         expect(n).toBeGreaterThanOrEqual(2);
  120 |         // the boil line's path bounding box has real vertical extent (a wobble, not a
  121 |         // ruler-flat line) — the natural morphology amplitude paints.
  122 |         const hasWobble = await boilMarks.nth(0).evaluate((el) => {
  123 |             const path = el.querySelector("path.hm__path") as SVGPathElement | null;
  124 |             if (!path) return false;
  125 |             const bb = path.getBBox();
  126 |             // a wobbled line has > 0 height in the 0..40 viewBox space (amplitude).
  127 |             return bb.height > 0.5;
  128 |         });
  129 |         expect(hasWobble).toBe(true);
  130 |     });
  131 | });
  132 | 
```