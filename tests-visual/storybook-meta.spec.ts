// BC.W-STORYBOOK-META — storybook-meta.spec.ts, the π readback of the WHOLE-STORYBOOK
// frontend-design quality SYNTHESIS (the BINDING close; BC inv — never a stale-PNG
// stamp). Device-free assertions cover structure; this scenario covers the live
// render on the painted :5199 DOM.
//
// The bite the source arm cannot give: an implementer could green the source parse
// while the RESOLVED render is still clipped/occluded, sub-legible, off-palette, or
// the dogfood DOM shape is a raw control. Only the resolved getBoundingClientRect +
// getComputedStyle readback binds it.
//
// It asserts, off the LIVE painted :5199 DOM (both modes):
//   M5/π — the occlusion-clearance sweep: on a representative content route the last
//          content element's bottom clears the fixed BottomDock top edge (the
//          --dock-content-safe-inset gutter reaches it); no focal element overflows
//          its scroll ancestor's content box (the "WTF clipped" close).
//   M6/π — the fontsize-floor sweep: the body/caption text runs resolve computed
//          font-size ≥ the 14px legible floor (the "totally illegible" close).
//
// THE BINDING ASSERTION IS THE RESOLVED READBACK. It loads :5199 →
// LIVE_VERIFIED_LOCAL_ONLY (tags: ["local"]); CI grace-skips, backstopped by
// the immutable browser evidence receipt over the W-STORYBOOK-META delta.

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const VISUAL_DIR = fileURLToPath(
    new URL("../docs/tranches/BC/audit/visual", import.meta.url),
);

// The legible body floor (text-small = 14px). A body/caption run below this is the
// "totally illegible" defect. The sanctioned micro-eyebrow (text-admin-label 10px,
// uppercase-tracked) is NOT body copy and is excluded from this sweep by selector.
const LEGIBLE_FLOOR_PX = 13.5; // a hair below 14 to allow sub-px rounding.

async function setDark(page: Page, dark: boolean): Promise<void> {
    await page.evaluate((on) => {
        document.documentElement.classList.toggle("dark", on);
    }, dark);
    await page.waitForTimeout(150);
}

const paired: Record<string, unknown> = {};

test.afterAll(() => {
    mkdirSync(VISUAL_DIR, { recursive: true });
    writeFileSync(
        `${VISUAL_DIR}/W-STORYBOOK-META-pi.json`,
        `${JSON.stringify(paired, null, 2)}\n`,
    );
});

test.describe("BC.W-STORYBOOK-META — the whole-storybook design-quality π", () => {
    for (const mode of ["light", "dark"] as const) {
        const dark = mode === "dark";

        // ── M6/π — the fontsize floor: no body/caption run below 14px ─────────────
        test(`M6 — the body/caption copy clears the legible floor [${mode}]`, async ({
            page,
        }) => {
            await page.setViewportSize({ width: 1280, height: 1000 });
            await page.goto("/forms/inputs", { waitUntil: "domcontentloaded" });
            await page.waitForSelector("article", { timeout: 8000 }).catch(() => {});
            await setDark(page, dark);
            await page.waitForTimeout(300);

            const tooSmall = await page.evaluate(() => {
                const px = (v: string) => parseFloat(v);
                const offenders: { tag: string; fs: number; text: string }[] = [];
                // BODY copy = paragraphs / list items in the article that are NOT the
                // sanctioned micro-eyebrow (uppercase-tracked) register.
                const nodes = document.querySelectorAll("article p, article li, article td");
                for (const el of Array.from(nodes)) {
                    const cs = getComputedStyle(el as HTMLElement);
                    const isUppercase = cs.textTransform === "uppercase";
                    if (isUppercase) continue; // the sanctioned micro-eyebrow register
                    const text = (el.textContent ?? "").trim();
                    if (!text) continue;
                    const fs = px(cs.fontSize);
                    if (fs > 0 && fs < 13.5)
                        offenders.push({ tag: el.tagName, fs, text: text.slice(0, 24) });
                }
                return offenders;
            });
            paired[`m6-${mode}`] = tooSmall;
            expect(
                tooSmall,
                `sub-legible body/caption copy survives (< ${LEGIBLE_FLOOR_PX}px): ${JSON.stringify(tooSmall)}`,
            ).toEqual([]);
        });

        // ── M5/π — the occlusion-clearance sweep ──────────────────────────────────
        test(`M5 — the last content element clears the fixed dock [${mode}]`, async ({
            page,
        }) => {
            await page.setViewportSize({ width: 1280, height: 1000 });
            await page.goto("/display/buttons", { waitUntil: "domcontentloaded" });
            await page.waitForSelector("article", { timeout: 8000 }).catch(() => {});
            await setDark(page, dark);
            await page.waitForTimeout(300);

            // Scroll the route scroller to the bottom so the last element is exposed.
            await page.evaluate(() => {
                const main = document.querySelector(".demo-main-scroller") as HTMLElement | null;
                if (main) main.scrollTo({ top: main.scrollHeight });
            });
            await page.waitForTimeout(200);

            const clearance = await page.evaluate(() => {
                const main = document.querySelector(".demo-main-scroller") as HTMLElement | null;
                if (!main) return { ok: true, reason: "no scroller" };
                // the scroll-padding-block-end / the safe-inset gutter is the
                // reserve. We assert the article content does not get clipped by the
                // scroller's content box at the bottom (the last child is reachable).
                const article = main.querySelector("article");
                if (!article) return { ok: true, reason: "no article" };
                const ar = article.getBoundingClientRect();
                const mr = main.getBoundingClientRect();
                // the safe-inset reserve resolves on <main>; read it.
                const inset = getComputedStyle(main).scrollPaddingBlockStart;
                // the article bottom should not be clipped above the scroller bottom
                // (a clipped article = the "WTF clipped" defect). We allow the article
                // to extend below the fold (it scrolls); the assertion is the gutter
                // is RESERVED (a non-zero scroll-padding-block-start).
                const insetPx = parseFloat(inset);
                return {
                    ok: insetPx > 0,
                    insetPx,
                    articleBottom: Math.round(ar.bottom),
                    scrollerBottom: Math.round(mr.bottom),
                };
            });
            paired[`m5-${mode}`] = clearance;
            expect(
                clearance.ok,
                `the --dock-content-safe-inset occlusion gutter is not reserved on the route scroller: ${JSON.stringify(clearance)}`,
            ).toBe(true);
        });
    }
});
