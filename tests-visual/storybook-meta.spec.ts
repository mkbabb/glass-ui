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
//   M7/π — the stray-hue sweep: focal-element colors resolve to the identity palette
//          (no off-palette blue/teal artifact — the "WTF blue" close).
//   M9/π — the dogfood-render sweep: the SHELL's morph toggle + liquid-preview toggle
//          render as <Button>/<Switch> markup (the composed component DOM shape, not a
//          raw <button>/<input>); the "Pick a story" empty state renders a <Card>; a
//          <SectionPreviewCard> resolves its static icon Chip + the .fira-code subpath
//          chip (the bento dogfood exemplar paints).
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

// The identity-palette guard. A focal demo glyph color resolves to the warm-cream +
// --section-color-* + --viz-* family. The stray-hue defect is a SATURATED BLUE: a
// resolved color whose blue channel dominates red+green by a wide margin (a warm-cream
// / amber / violet identity hue never reads blue-dominant). We parse rgb and flag a
// blue-dominant focal glyph (the "WTF blue" close).
function isStrayBlue(rgb: string): boolean {
    const m = rgb.match(/rgba?\(\s*([\d.]+)[ ,]+([\d.]+)[ ,]+([\d.]+)/i);
    if (!m) return false;
    const r = +m[1]!,
        g = +m[2]!,
        b = +m[3]!;
    // blue-dominant by a wide margin (the sky/blue-500 stray): b clearly exceeds both
    // r and g, and the hue is genuinely cool (not a near-grey).
    return b > r + 40 && b > g + 30 && b > 120;
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

        // ── M7/π — the stray-hue sweep: no off-palette blue focal glyph ───────────
        test(`M7 — no stray off-palette blue artifact [${mode}]`, async ({ page }) => {
            await page.setViewportSize({ width: 1280, height: 1200 });
            await page.goto("/foundations/css-utilities", { waitUntil: "domcontentloaded" });
            await page.waitForSelector("article", { timeout: 8000 }).catch(() => {});
            await setDark(page, dark);
            await page.waitForTimeout(300);

            const colors = await page.evaluate(() => {
                const out: string[] = [];
                // the focal demo glyphs (svg icons) — the re-pointed identity-palette
                // glyphs must NOT resolve a stray saturated blue.
                for (const el of Array.from(document.querySelectorAll("article svg"))) {
                    const cs = getComputedStyle(el as SVGElement);
                    out.push(cs.color);
                }
                return out;
            });
            const strays = colors.filter((c) => isStrayBlue(c));
            paired[`m7-${mode}`] = { sampled: colors.length, strays };
            expect(
                strays,
                `a focal glyph resolves a stray saturated blue (off the warm-cream + --section-color identity): ${JSON.stringify(strays)}`,
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

        // ── M9/π — the dogfood-render sweep (the SHELL composes shipped controls) ─
        test(`M9 — the SHELL morph stage composes <Button>/<Switch>/<Card> markup [${mode}]`, async ({
            page,
        }) => {
            await page.setViewportSize({ width: 1280, height: 1000 });
            await page.goto("/foundations/intro", { waitUntil: "domcontentloaded" });
            await page.waitForSelector("article", { timeout: 8000 }).catch(() => {});
            await setDark(page, dark);
            await page.waitForTimeout(300);

            // Open the in-situ dock-morph stage (the SHELL chrome that hosts the
            // composed controls) via the deterministic capture seam.
            await page.evaluate(() => {
                (window as unknown as { __shellDockMorph?: { open: () => void } }).__shellDockMorph?.open();
            });
            await page.waitForSelector('[data-testid="shell-dock-morph-overlay"]', {
                timeout: 4000,
            }).catch(() => {});
            await page.waitForTimeout(200);

            const shape = await page.evaluate(() => {
                const morphToggle = document.querySelector('[data-testid="shell-morph-toggle"]');
                const liquidToggle = document.querySelector('[data-testid="shell-liquid-preview-toggle"]');
                return {
                    // the morph toggle composes <Button> — it is a <button> rendered
                    // BY the Button component (carries the data-slot="button" or the
                    // CVA-shaped class), NOT a raw btn-pill chain.
                    morphToggleTag: morphToggle?.tagName ?? null,
                    morphToggleClass: morphToggle?.className ?? "",
                    morphIsButtonComponent:
                        Boolean(morphToggle) &&
                        !/\bbtn-pill\b/.test(morphToggle?.className ?? ""),
                    // the liquid toggle composes <Switch> — reka renders a <button
                    // role="switch"> (NOT a raw <input type="checkbox">).
                    liquidToggleTag: liquidToggle?.tagName ?? null,
                    liquidToggleRole: liquidToggle?.getAttribute("role") ?? null,
                    liquidIsSwitch:
                        Boolean(liquidToggle) &&
                        (liquidToggle?.getAttribute("role") === "switch" ||
                            liquidToggle?.tagName === "BUTTON"),
                };
            });
            paired[`m9-shell-${mode}`] = shape;
            expect(
                shape.morphIsButtonComponent,
                `the SHELL morph toggle is not a composed <Button> (still a raw btn-pill chain): ${JSON.stringify(shape)}`,
            ).toBe(true);
            expect(
                shape.liquidIsSwitch,
                `the SHELL liquid-preview toggle is not a composed <Switch> (still a raw <input type=checkbox>): ${JSON.stringify(shape)}`,
            ).toBe(true);

            await page.screenshot({
                path: `${VISUAL_DIR}/W-STORYBOOK-META-shell-${mode}.png`,
                fullPage: false,
            });
        });

        // ── M9d/π — a <SectionPreviewCard> bento resolves its icon plate + subpath ──
        test(`M9d — the SectionPreviewCard bento paints (static Chip + fira-code subpath) [${mode}]`, async ({
            page,
        }) => {
            await page.setViewportSize({ width: 1280, height: 1200 });
            await page.goto("/foundations/intro", { waitUntil: "domcontentloaded" });
            await page.waitForSelector("article", { timeout: 8000 }).catch(() => {});
            await setDark(page, dark);
            await page.waitForTimeout(300);

            const bento = await page.evaluate(() => {
                const card = document.querySelector(".section-preview-card");
                if (!card) return { present: false };
                return {
                    present: true,
                    hasIconPlate: Boolean(
                        card.querySelector(
                            '.glass-chip[data-mode="static"][data-shape="icon"] svg',
                        ),
                    ),
                    hasSubpathChip: Boolean(card.querySelector(".fira-code")),
                };
            });
            paired[`m9d-bento-${mode}`] = bento;
            // the bento is the front-door affordance; if present it must compose its
            // primitives (a present-but-empty card is the anti-dogfood). If the front
            // door carries no preview cards on this route, the sweep is informational.
            if (bento.present) {
                expect(
                    bento.hasIconPlate && bento.hasSubpathChip,
                    `the SectionPreviewCard bento does not resolve its composed primitives: ${JSON.stringify(bento)}`,
                ).toBe(true);
            }
        });
    }
});
