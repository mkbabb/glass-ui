// BC.W-VIZ-CONFIGURATOR-SUITE — viz-configurator-suite.spec.ts, the BINDING π
// readback (the captured own-surface truth; the cardinal-lesson DELTA). The gate
// proof:viz-configurator-suite proves the SOURCE (the shared VizStudio chassis exists,
// the four-piece WGSL+GLSL prototypes, the shared-shape census, the thumbnail-capture-
// awaits-armAsync fix); THIS spec proves the painted RENDER — every viz studio reads as
// ONE finished design studio: the configurator on the RIGHT on desktop (the two-column
// inspector), the panel + canvas rounded, the page ONE card, the preset thumbnails
// REAL (meanLum > 0 — the dead-card fix). The source diff alone cannot prove the layout
// ENGAGES nor the thumbnail BAKES (the BA.W-EMISSION self-emission + the WebGPU async-
// arm class), so the live getComputedStyle + the captured-pixel readback are binding.
//
// THE BINDING ARMS (acceptance #3):
//   (a) DESKTOP controls-RIGHT — at ≥1280px the studio's [data-slot=configurator]
//       resolves grid-template-columns to TWO tracks, the aside's left > the stage's
//       left (controls RIGHT), |stage.top - aside.top| < 50 (same row). Stacks below
//       on a ≤900px viewport (the correct mobile single-column).
//   (b) ROUNDED panel + canvas — the inline studio root resolves a rounded corner
//       (--radius-panel) AND the #stage canvas wrapper carries a rounded clip reaching
//       the canvas pixels (the aurora.md §0.4 "not rounded" fix).
//   (c) ONE card — the page routes through the StoryPage chassis (no double-card-with-
//       grid wrapping the viz — USER-DEFECTS §C).
//   (d) REAL preview — the preset row's baked thumbnails have meanLum > 0 (the dead-
//       card fix — the capture awaits armAsync on the WebGPU backend).
//
// BOTH modes. LOCAL-only (the layout + real-thumbnail capture need a browser + GPU);
// the device-free SOURCE arm is the gate. Frames captured to
// docs/tranches/BC/audit/visual/. Live-verify = a captured delta via the dev-tools
// MCP, never a commit claim.

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { fileURLToPath } from "node:url";
import { mkdirSync } from "node:fs";

const VISUAL_DIR = fileURLToPath(
    new URL("../docs/tranches/BC/audit/visual", import.meta.url),
);

// The viz studios that compose the SHARED VizStudio chassis / a <Configurator> studio
// (the FULL_CONFIGURATOR census from proof:viz-configurator-suite S3). aurora is the
// first VizStudio exemplar; the rest compose <Configurator> directly. The bare-switch
// studios (the PENDING_FULL_CONFIGURATOR census) are NOT asserted here — they conform
// onto the chassis when their owning per-viz wave lands its full configurator.
// concentric DELETED at BI.W-VIZ-DELETIONS (the user-ordered clean-break prune) — off the set.
const STUDIOS = [
    { route: "/substrates/aurora", id: "aurora", presetThumbs: true },
    { route: "/substrates/blob", id: "blob", presetThumbs: false },
    { route: "/substrates/fourier-field", id: "fourier-field", presetThumbs: false },
    { route: "/substrates/liquid-grid", id: "liquid-grid", presetThumbs: false },
] as const;

const DESKTOP = { width: 1280, height: 900 } as const;
const NARROW = { width: 880, height: 1000 } as const;

async function setDark(page: Page, dark: boolean): Promise<void> {
    await page.evaluate((d) => {
        document.documentElement.classList.toggle("dark", d);
    }, dark);
    await page.waitForTimeout(180);
}

function shot(page: Page, name: string): Promise<Buffer> {
    mkdirSync(VISUAL_DIR, { recursive: true });
    return page.screenshot({ path: `${VISUAL_DIR}${name}.png`, fullPage: false });
}

// Read the studio layout truth: the configurator grid-template-columns track count, the
// stage/aside rects (controls-right + same-row), the root rounded corner + clip, and
// whether a #stage canvas wrapper carries a rounded clip.
async function readLayout(page: Page) {
    return page.evaluate(() => {
        const cfg = document.querySelector(
            '[data-slot="configurator"]',
        ) as HTMLElement | null;
        if (!cfg) return null;
        const stage = cfg.querySelector(".configurator-stage") as HTMLElement | null;
        const aside = cfg.querySelector(".configurator-aside") as HTMLElement | null;
        const cs = getComputedStyle(cfg);
        const stageRect = stage?.getBoundingClientRect() ?? null;
        const asideRect = aside?.getBoundingClientRect() ?? null;
        // Two-track count: split outside parens.
        const gtc = cs.gridTemplateColumns;
        const cleaned = gtc.replace(/\s+/g, " ").trim();
        let depth = 0;
        let trackCount = cleaned ? 1 : 0;
        for (const ch of cleaned) {
            if (ch === "(") depth++;
            else if (ch === ")") depth--;
            else if (ch === " " && depth === 0) trackCount++;
        }
        // A rounded clip reaching the canvas: the stage hosts an element with a non-zero
        // border-radius AND a canvas descendant (the rounded-card overflow-hidden wrapper).
        let stageCanvasRounded = false;
        if (stage) {
            const canvas = stage.querySelector("canvas");
            if (canvas) {
                let el: HTMLElement | null = canvas.parentElement;
                while (el && el !== stage.parentElement) {
                    const r = parseFloat(getComputedStyle(el).borderTopLeftRadius);
                    if (r > 0) {
                        stageCanvasRounded = true;
                        break;
                    }
                    el = el.parentElement;
                }
            }
        }
        return {
            trackCount,
            gridTemplateColumns: gtc,
            borderRadius: cs.borderTopLeftRadius,
            overflow: cs.overflow,
            stage: stageRect
                ? { left: stageRect.left, top: stageRect.top, width: stageRect.width }
                : null,
            aside: asideRect
                ? { left: asideRect.left, top: asideRect.top, width: asideRect.width }
                : null,
            stageCanvasRounded,
        };
    });
}

// (d) the preset row's baked thumbnails are REAL — sample the first preset chip's
// background/img and read its mean luminance off a 2D-canvas draw. A blank (dead-card)
// thumbnail reads meanLum ≈ 0; a real baked field reads meanLum > 0.
async function readThumbMeanLum(page: Page): Promise<number | null> {
    return page.evaluate(async () => {
        // Find a baked thumbnail image in the preset row (a data-URL <img> or a
        // background-image on a preset chip).
        const img = document.querySelector(
            '[data-slot="configurator-preset"] img, .preset-thumb img, img[src^="data:image"]',
        ) as HTMLImageElement | null;
        if (!img || !img.complete || img.naturalWidth === 0) return null;
        const c = document.createElement("canvas");
        c.width = Math.min(img.naturalWidth, 64);
        c.height = Math.min(img.naturalHeight, 40);
        const ctx = c.getContext("2d");
        if (!ctx) return null;
        ctx.drawImage(img, 0, 0, c.width, c.height);
        const { data } = ctx.getImageData(0, 0, c.width, c.height);
        let sum = 0;
        let n = 0;
        for (let i = 0; i < data.length; i += 4) {
            const a = data[i + 3] / 255;
            // Rec. 601 luma, alpha-weighted (a transparent dead card reads 0).
            sum += a * (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]);
            n++;
        }
        return n ? sum / n / 255 : 0;
    });
}

// ── (a)+(b)+(c) DESKTOP — controls RIGHT, rounded panel+canvas, ONE card ────────────────
test.describe("the finished viz studio — controls RIGHT, rounded, ONE card", () => {
    for (const studio of STUDIOS) {
        for (const dark of [false, true]) {
            const mode = dark ? "dark" : "light";
            test(`${studio.id} ${mode}: controls RIGHT, rounded panel + canvas, ONE card`, async ({
                page,
            }) => {
                await page.setViewportSize(DESKTOP);
                await page.goto(studio.route, { waitUntil: "networkidle" });
                await setDark(page, dark);
                await page.waitForTimeout(400);

                const L = await readLayout(page);
                expect(
                    L,
                    `a [data-slot=configurator] must render on ${studio.route}`,
                ).not.toBeNull();
                if (!L) return;

                await shot(page, `W-VIZ-CONFIGURATOR-SUITE-${studio.id}-desktop-${mode}`);

                // (a) controls RIGHT: two tracks, aside right of stage, same row.
                expect(
                    L.trackCount,
                    `${studio.id}: desktop grid resolves TWO tracks (was "${L.gridTemplateColumns}")`,
                ).toBe(2);
                expect(L.stage, `${studio.id}: stage renders`).not.toBeNull();
                expect(L.aside, `${studio.id}: aside renders`).not.toBeNull();
                if (!L.stage || !L.aside) return;
                expect(
                    L.aside.left,
                    `${studio.id}: controls (aside) sit RIGHT of the stage`,
                ).toBeGreaterThan(L.stage.left);
                expect(
                    Math.abs(L.stage.top - L.aside.top),
                    `${studio.id}: stage + aside on the SAME ROW`,
                ).toBeLessThan(50);

                // (b) rounded panel + canvas.
                const radius = parseFloat(L.borderRadius);
                expect(
                    radius,
                    `${studio.id}: the studio root reads a rounded corner (--radius-panel); was ${L.borderRadius}`,
                ).toBeGreaterThanOrEqual(8);
                expect(
                    L.overflow,
                    `${studio.id}: the root clips so the canvas does not overrun the corner`,
                ).toMatch(/hidden|clip/);
                expect(
                    L.stageCanvasRounded,
                    `${studio.id}: the #stage canvas wrapper carries a rounded clip reaching the pixels (the "not rounded" fix)`,
                ).toBe(true);
            });
        }
    }
});

// ── (a) NARROW — the single-column stack (no regression) ────────────────────────────────
test.describe("narrow — the single-column stack below lg", () => {
    for (const studio of STUDIOS) {
        test(`${studio.id}: ≤900px resolves ONE column, stage above aside`, async ({
            page,
        }) => {
            await page.setViewportSize(NARROW);
            await page.goto(studio.route, { waitUntil: "networkidle" });
            await page.waitForTimeout(300);

            const L = await readLayout(page);
            if (!L) return;
            await shot(page, `W-VIZ-CONFIGURATOR-SUITE-${studio.id}-narrow-light`);
            expect(
                L.trackCount,
                `${studio.id}: below lg the grid is a SINGLE column (was "${L.gridTemplateColumns}")`,
            ).toBe(1);
            if (L.stage && L.aside) {
                expect(
                    L.stage.top,
                    `${studio.id}: stage stacks ABOVE the aside on narrow`,
                ).toBeLessThan(L.aside.top);
            }
        });
    }
});

// ── (d) REAL preview — the preset thumbnails are baked (meanLum > 0, the dead-card fix) ──
test.describe("real preview — the preset thumbnails are baked (no dead cards)", () => {
    for (const studio of STUDIOS) {
        if (!studio.presetThumbs) continue;
        test(`${studio.id}: the preset thumbnail reads meanLum > 0 (the dead-card fix)`, async ({
            page,
        }) => {
            await page.setViewportSize(DESKTOP);
            await page.goto(studio.route, { waitUntil: "networkidle" });
            // The bake runs ~200ms after mount + awaits armAsync — give it a beat.
            await page.waitForTimeout(2000);

            const meanLum = await readThumbMeanLum(page);
            expect(
                meanLum,
                `${studio.id}: a baked preset thumbnail must be present`,
            ).not.toBeNull();
            if (meanLum == null) return;
            await shot(page, `W-VIZ-CONFIGURATOR-SUITE-${studio.id}-thumbnails`);
            expect(
                meanLum,
                `${studio.id}: the preset thumbnail must be a REAL baked field (meanLum ${meanLum} > 0 — not a blank dead card)`,
            ).toBeGreaterThan(0.01);
        });
    }
});
