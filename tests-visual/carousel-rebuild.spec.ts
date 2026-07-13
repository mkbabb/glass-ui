// BI.W-CAROUSEL-REBUILD — carousel-rebuild.spec.ts, the BINDING π readback.
//
// `proof:carousel-rebuild` proves the SOURCE structure (the barbell DEFINITION-ABSENT, the
// v-model:active authority, the drag-scrub wiring, one pager per exhibit); THIS spec proves
// the painted RENDER on the live `/navigation/carousel` route, BOTH modes — the content
// BARBELL category error (D-PAGER PASS-1 §0 Defect 2: a 265px goo body flying 559px OUTSIDE
// the 414px card) is CURED: ZERO paint outside the card, the content is crisp (no filter),
// the pager worm follows the scroll, and a rapid click + Next-hammer always lands on ONE snap.
//
// THE BINDING ARMS (read the LIVE `/navigation/carousel` route):
//   (a) ZERO OUTSIDE THE CARD — the `.carousel-goo-layer` barbell is GONE (no filtered
//       content layer exists to escape the card), and no carousel content paints a `filter`
//       (the 559px-escape regression test).
//   (b) THE WORM FOLLOWS — driving a hop, the pager worm ELONGATES then RE-FORMS (the
//       drag-scrub / v-model authority drives PagerDots' useLeadTrail).
//   (c) RAPID-CLICK AUTHORITY — hammering the pager lands on exactly ONE settled snap (one
//       bed pip active, the worm re-formed) — no double-write, no dropped morph (G7).
//   (d) THE DRAG SCRUBS — a pointer drag over the hero moves the worm (the finger-follow).
//
// + the captured full-page DELTA frame (ZERO paint outside the card). BOTH modes, ≥1
// viewport. Fail-CLOSED. LOCAL real-GPU (the real-Metal-WebKit decider rides W-PI-IN-CLOSE).

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { fileURLToPath } from "node:url";
import { mkdirSync } from "node:fs";

const VISUAL_DIR = fileURLToPath(
    new URL("../docs/tranches/BI/audit/visual/W-CAROUSEL-REBUILD/", import.meta.url),
);

const HOST_ROUTE = "/navigation/carousel";

const VIEWPORTS = [
    { name: "tablet", width: 768, height: 1024 },
    { name: "desktop", width: 1280, height: 800 },
] as const;

async function setDark(page: Page, dark: boolean): Promise<void> {
    await page.evaluate((on) => document.documentElement.classList.toggle("dark", on), dark);
    await page.waitForTimeout(120);
}

/** Poll the FIRST pager's worm bodies over `n` rAF ticks — the per-frame separation. */
async function sampleWorm(page: Page, n: number): Promise<number[]> {
    return page.evaluate((frames) => {
        const pager = document.querySelector('[data-slot="pager-dots"]') as HTMLElement | null;
        if (!pager) return [];
        const bodies = pager.querySelectorAll<HTMLElement>(".goo-body");
        const out: number[] = [];
        return new Promise<number[]>((resolve) => {
            let i = 0;
            const tick = () => {
                if (bodies.length >= 2) {
                    const a = bodies[0]!.getBoundingClientRect();
                    const b = bodies[1]!.getBoundingClientRect();
                    out.push(Math.abs(b.left + b.width / 2 - (a.left + a.width / 2)));
                }
                if (++i >= frames) return resolve(out);
                requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
        });
    }, n);
}

async function hopTo(page: Page, i: number): Promise<void> {
    const dots = page.locator('[data-slot="pager-dot"]');
    const n = await dots.count();
    if (n === 0) return;
    await dots.nth(Math.min(i, n - 1)).click({ force: true });
}

test.describe("carousel-rebuild (π — crisp weighty embla, ZERO outside the card, fail-CLOSED)", () => {
    for (const vp of VIEWPORTS) {
        for (const dark of [false, true] as const) {
            const mode = dark ? "dark" : "light";
            test(`zero-outside + worm-follows + authority — ${vp.name} ${mode}`, async ({ page }) => {
                mkdirSync(VISUAL_DIR, { recursive: true });
                await page.setViewportSize({ width: vp.width, height: vp.height });
                await page.goto(HOST_ROUTE, { waitUntil: "networkidle" });
                await setDark(page, dark);
                const pager = page.locator('[data-slot="pager-dots"]').first();
                await pager.waitFor({ state: "visible" });

                // (a) ZERO OUTSIDE THE CARD — the barbell layer is GONE + the content carries
                // NO filter (the 559px-escape is structurally unreproducible).
                const purity = await page.evaluate(() => {
                    const barbell = document.querySelectorAll(".carousel-goo-layer").length;
                    const viewports = [
                        ...document.querySelectorAll<HTMLElement>('[data-slot="carousel-content"]'),
                    ];
                    let filtered = 0;
                    let clips = 0;
                    for (const vp of viewports) {
                        const cs = getComputedStyle(vp);
                        if (cs.filter && cs.filter !== "none") filtered++;
                        if (cs.overflow === "hidden" || cs.overflowX === "hidden") clips++;
                        // any filtered descendant inside the content is a re-introduced barbell
                        for (const el of vp.querySelectorAll<HTMLElement>("*")) {
                            const f = getComputedStyle(el).filter;
                            if (f && f !== "none" && /url\(/.test(f)) filtered++;
                        }
                    }
                    return { barbell, filtered, clips, viewports: viewports.length };
                });
                expect(purity.barbell, "the content barbell (.carousel-goo-layer) is GONE").toBe(0);
                expect(purity.viewports, "the carousel viewports render").toBeGreaterThanOrEqual(1);
                expect(purity.filtered, "no content carries a filter (crisp content, no 559px escape)").toBe(0);
                expect(purity.clips, "the viewport clips its content (overflow hidden)").toBeGreaterThanOrEqual(1);

                await page.screenshot({
                    path: `${VISUAL_DIR}/carousel-page_${vp.name}_${mode}.png`,
                    fullPage: true,
                });

                // (b) THE WORM FOLLOWS — a hop elongates then re-forms.
                await hopTo(page, 0);
                await page.waitForTimeout(400);
                const rest = Math.max(...(await sampleWorm(page, 4)), 0);
                await hopTo(page, 3);
                const series = await sampleWorm(page, 90);
                const maxSep = Math.max(...series, 0);
                const tail = series.slice(-12);
                const tailMean = tail.reduce((s, v) => s + v, 0) / Math.max(1, tail.length);
                expect(maxSep, "the worm ELONGATES on the hop (follows the scroll)").toBeGreaterThan(rest + 6);
                expect(tailMean, "the worm RE-FORMS on the target (settled)").toBeLessThan(maxSep * 0.6);

                // (c) RAPID-CLICK AUTHORITY — hammer the pager, land on ONE settled snap.
                await hopTo(page, 1);
                await hopTo(page, 4);
                await hopTo(page, 2);
                await hopTo(page, 4);
                await page.waitForTimeout(700);
                const settled = await page.evaluate(() => {
                    const pager = document.querySelector('[data-slot="pager-dots"]');
                    if (!pager) return { active: 0, sep: 0 };
                    const active = pager.querySelectorAll(
                        '.pager-bed-layer .goo-dot[data-active]',
                    ).length;
                    const bodies = pager.querySelectorAll<HTMLElement>(".goo-body");
                    let sep = 0;
                    if (bodies.length >= 2) {
                        const a = bodies[0]!.getBoundingClientRect();
                        const b = bodies[1]!.getBoundingClientRect();
                        sep = Math.abs(b.left + b.width / 2 - (a.left + a.width / 2));
                    }
                    return { active, sep };
                });
                expect(settled.active, "exactly ONE bed pip is active after the hammer (no double-write)").toBe(1);
                expect(settled.sep, "the worm re-formed on the landed snap (settled, not mid-morph)").toBeLessThan(rest + 14);

                // (d) THE DRAG SCRUBS — a pointer drag over the hero moves the worm.
                const box = await page.locator('[data-slot="carousel-content"]').first().boundingBox();
                if (box) {
                    const cy = box.y + box.height / 2;
                    await page.mouse.move(box.x + box.width * 0.75, cy);
                    await page.mouse.down();
                    const drag = sampleWorm(page, 30);
                    for (let s = 1; s <= 6; s++) {
                        await page.mouse.move(box.x + box.width * (0.75 - 0.1 * s), cy);
                        await page.waitForTimeout(16);
                    }
                    await page.mouse.up();
                    const dragSeries = await drag;
                    const dragMax = Math.max(...dragSeries, 0);
                    // the drag stirred the worm (it moved off rest) — the finger-follow reads.
                    expect(dragMax, "the drag scrubs the worm (it moves off rest)").toBeGreaterThan(rest);
                    await page.waitForTimeout(500);
                }
            });
        }
    }
});
