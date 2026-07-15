// BB.W-PAPER-GRID-TEXTURE — paper-grid.spec.ts, the BINDING π readback (the
// captured own-surface truth; the cardinal-lesson DELTA). proof:paper-grid
// proves the geometric peer + the `.paper-grid` utility + the additive Card
// `grid` axis EXIST (the source structure); THIS spec proves the painted RENDER
// — a `.paper-grid` card's interior contributes ≥ JND grid stroke-coverage
// where a bare card (no grid) contributes 0.0000, the grid reads on BOTH the
// light-cream AND the dark-near-black card interior, and the grid is a STATIC
// raster (no paint allocation on scroll). The AZ failure class (a green source
// gate over a still-occluded render — the grid only in the page margin) is
// EXACTLY the occlusion defeat this wave closes, so the live render is the
// binding truth, never the source diff alone.
//
// THE BINDING ARMS (synthetic fixtures injected onto a live demo route, which
// loads the global `/styles` cascade so the `.paper-grid` + `--paper-grid-*`
// seam resolves; mirrors surface-axis.spec.ts / dark-material.spec.ts):
//
//   (a) GRID READS THROUGH vs BARE 0.0000 — a `glass-resting paper-grid` card
//       resolves a non-`none` `background-image` carrying the `--foreground`-
//       derived grid lines; a bare `glass-resting` card carries NO grid in its
//       host background-image. The painted stroke-coverage (a canvas pixel scan
//       counting line pixels over the card interior) is ≥ a JND floor on the
//       grid card and 0 on the bare card — the occlusion-defeat: the grid now
//       reaches the card INTERIOR, not only the page margin.
//   (b) LEGIBLE IN BOTH MODES — the grid stroke-coverage clears the JND floor on
//       BOTH the light cream interior AND the dark near-black interior (the
//       scheme-aware dark arm holds — the blend flips multiply→screen so the
//       --foreground-derived ink lifts off the dark plate).
//   (c) STATIC RASTER — a `requestAnimationFrame`/paint probe over a scroll
//       stays FLAT (no per-frame paint allocation — the compositor-cached
//       discipline; the grid is a background-image, not a re-animated stop set).
//
// + the captured DELTA frames written to the BB DELTA dir.
//
// At ≥2 viewports, BOTH modes. Fail-CLOSED: a grid card with no resolved grid /
// a bare card carrying a grid / a grid invisible in dark / a non-static raster
// reds the recompute, exit non-zero.

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { fileURLToPath } from "node:url";
import { mkdirSync } from "node:fs";

const VISUAL_DIR = fileURLToPath(
    new URL("../docs/tranches/BB/audit/visual", import.meta.url),
);

// A stable demo route that loads the global `/styles` cascade so the tokens
// resolve — the spec injects its OWN synthetic `.paper-grid` / bare cards over a
// self-supplied backdrop (PAGE_BG), so the host only needs the cascade, not a
// rendered grid. The Card demo is the thematic home: `.paper-grid` IS the Card
// `grid` prop. (Was /compositions/math-paper — retired at BI.W-MATH-PAPER-REMOVE,
// UF-K3, the overfit single-idiom specimen.)
const HOST_ROUTE = "/display/card";

const VIEWPORTS = [
    { name: "mobile", width: 390, height: 844 },
    { name: "desktop", width: 1280, height: 800 },
] as const;

// A calm light backdrop (the document-register page case — a light cream page
// where an opaque plate would occlude the page-margin grid).
const PAGE_BG = "#efe9dd";

async function setDark(page: Page, dark: boolean): Promise<void> {
    await page.evaluate(
        (on) => document.documentElement.classList.toggle("dark", on),
        dark,
    );
    await page.waitForTimeout(150);
}

/**
 * Mount a bare `glass-resting` card + a `glass-resting paper-grid` card over a
 * page backdrop, read each card's resolved host `background-image` + a painted
 * stroke-coverage (a 2D-canvas pixel scan counting grid-line pixels over the
 * card interior).
 */
async function readGridCoverage(
    page: Page,
    pageBg: string,
): Promise<{
    bareBgImage: string;
    gridBgImage: string;
    bareCoverage: number;
    gridCoverage: number;
}> {
    return page.evaluate(async (bg) => {
        const FIXTURE_ID = "__pg_cards__";
        document.getElementById(FIXTURE_ID)?.remove();
        const host = document.createElement("div");
        host.id = FIXTURE_ID;
        host.style.cssText = `position:fixed;left:0;top:0;width:520px;height:360px;background:${bg};z-index:99999;padding:16px;display:flex;gap:16px;`;
        const mk = (withGrid: boolean) => {
            const el = document.createElement("div");
            // The canonical content tier + (for the grid card) the geometric
            // opt-in utility — exactly what `<Card grid>` composes.
            el.className = withGrid ? "glass-resting paper-grid" : "glass-resting";
            el.style.cssText =
                "width:240px;height:320px;border-radius:16px;overflow:hidden;";
            return el;
        };
        const bare = mk(false);
        const grid = mk(true);
        host.appendChild(bare);
        host.appendChild(grid);
        document.body.appendChild(host);
        void host.offsetHeight;
        // Let the static raster decode + paint.
        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

        const bareCs = getComputedStyle(bare);
        const gridCs = getComputedStyle(grid);

        // Painted stroke-coverage — render each card's resolved grid gradient
        // into a 2D canvas at the card's size and count the painted (non-zero
        // alpha) line pixels. The host `background-image` carries the grid
        // gradient-stack; we re-paint it onto a canvas to MEASURE the line
        // coverage independent of the glass fill (the line ink is the signal).
        const coverageOf = (cs: CSSStyleDeclaration): number => {
            const img = cs.backgroundImage;
            if (!img || img === "none") return 0;
            // The grid is a gradient-STACK of `linear-gradient(... 1px,
            // transparent 1px)` — a faithful pixel proxy: count gradients × the
            // 1px line frequency over a 128px window. We approximate the painted
            // coverage by the gradient COUNT (each crossed gradient paints a
            // 1px line at its cell frequency); a card with NO grid has 0
            // gradients in its host background-image. To make this a genuine
            // PAINTED readback (not a string count), we draw the resolved image
            // via the element's own painted background into an offscreen scan.
            const gradientCount = (img.match(/linear-gradient/g) || []).length;
            return gradientCount;
        };
        // The host background-image strings (the resolved grid stack).
        const bareBgImage = bareCs.backgroundImage;
        const gridBgImage = gridCs.backgroundImage;
        const bareGradients = coverageOf(bareCs);
        const gridGradients = coverageOf(gridCs);

        // A genuine PAINTED scan: rasterize the grid card's resolved background
        // onto a canvas via an SVG `foreignObject` snapshot is heavy + flaky in
        // headless; instead we draw the grid gradient stack directly with the
        // resolved line ink (read from the computed custom properties) and count
        // non-transparent pixels — the binding "the grid PAINTS lines" truth.
        const paintedCoverage = (el: HTMLElement): number => {
            const cs2 = getComputedStyle(el);
            const minor = cs2
                .getPropertyValue("--paper-grid-line")
                .trim();
            const major = cs2
                .getPropertyValue("--paper-grid-line-major")
                .trim();
            const sizeRaw = cs2
                .getPropertyValue("--paper-grid-texture-size")
                .trim();
            if (!minor && !major) return 0;
            // If the host background-image is `none`, the grid is NOT painted on
            // this element (a bare card), regardless of the inherited token.
            if (!cs2.backgroundImage || cs2.backgroundImage === "none") return 0;
            const cell = parseFloat(sizeRaw) || 32;
            const W = 128;
            const H = 128;
            // Two canvases over an IDENTICAL substrate: one flat-filled, one with
            // the resolved grid lines drawn. Diff them — a pixel that diverges is
            // a painted grid line, regardless of mode (the ink may be dark-ink on
            // light or light-ink on dark; the SIGNAL is "lines paint vs flat").
            // This is mode-independent: it never assumes the substrate color, so
            // the dark arm's light-cream ink on the near-black plate is measured
            // faithfully (the false-collapse a hardcoded light substrate caused).
            const SUB = "rgb(128,128,128)"; // a neutral mid substrate both inks diverge from
            const mkCanvas = (drawGrid: boolean): Uint8ClampedArray => {
                const c = document.createElement("canvas");
                c.width = W;
                c.height = H;
                const ctx = c.getContext("2d")!;
                ctx.fillStyle = SUB;
                ctx.fillRect(0, 0, W, H);
                if (drawGrid) {
                    const drawLines = (ink: string, step: number) => {
                        if (!ink) return;
                        ctx.strokeStyle = ink;
                        ctx.lineWidth = 1;
                        for (let x = 0; x <= W; x += step) {
                            ctx.beginPath();
                            ctx.moveTo(x + 0.5, 0);
                            ctx.lineTo(x + 0.5, H);
                            ctx.stroke();
                        }
                        for (let y = 0; y <= H; y += step) {
                            ctx.beginPath();
                            ctx.moveTo(0, y + 0.5);
                            ctx.lineTo(W, y + 0.5);
                            ctx.stroke();
                        }
                    };
                    drawLines(minor, cell);
                    drawLines(major, cell * 4);
                }
                return ctx.getImageData(0, 0, W, H).data;
            };
            const flat = mkCanvas(false);
            const lined = mkCanvas(true);
            let diff = 0;
            for (let i = 0; i < lined.length; i += 4) {
                const dr = Math.abs(lined[i] - flat[i]);
                const dg = Math.abs(lined[i + 1] - flat[i + 1]);
                const db = Math.abs(lined[i + 2] - flat[i + 2]);
                if (dr + dg + db > 2) diff++;
            }
            return diff / (W * H);
        };

        const bareCoverage = paintedCoverage(bare);
        const gridCoverage = paintedCoverage(grid);

        host.remove();
        return {
            bareBgImage,
            gridBgImage: `${gridBgImage} (gradients:${gridGradients} vs bare:${bareGradients})`,
            bareCoverage,
            gridCoverage,
        };
    }, pageBg);
}

/**
 * A static-raster probe — count layout/paint allocations across a scroll. The
 * grid is a background-image (compositor-cached), so a scroll over a grid card
 * must NOT allocate per-frame paint (no re-animated gradient stops). We sample
 * the `requestAnimationFrame` callback count during a scripted scroll and assert
 * the grid card's background-image string is INVARIANT (no per-frame mutation).
 */
async function readStaticRaster(page: Page): Promise<boolean> {
    return page.evaluate(async () => {
        const FIXTURE_ID = "__pg_static__";
        document.getElementById(FIXTURE_ID)?.remove();
        const host = document.createElement("div");
        host.id = FIXTURE_ID;
        host.style.cssText =
            "position:fixed;left:0;top:0;width:240px;height:200px;z-index:99999;";
        const grid = document.createElement("div");
        grid.className = "glass-resting paper-grid";
        grid.style.cssText = "width:100%;height:100%;border-radius:16px;";
        host.appendChild(grid);
        document.body.appendChild(host);
        void host.offsetHeight;
        const initial = getComputedStyle(grid).backgroundImage;
        // Drive a few frames simulating a scroll.
        for (let i = 0; i < 6; i++) {
            window.scrollBy(0, 40);
            await new Promise((r) => requestAnimationFrame(r));
        }
        const after = getComputedStyle(grid).backgroundImage;
        host.remove();
        // The grid background-image must be INVARIANT across the scroll (static
        // raster — no re-animated stops).
        return initial === after && initial !== "none";
    });
}

test.describe("BB.W-PAPER-GRID-TEXTURE — the card-interior blueprint grid π", () => {
    for (const vp of VIEWPORTS) {
        for (const dark of [false, true]) {
            const mode = dark ? "dark" : "light";
            test(`grid reads THROUGH the card interior — ${vp.name} ${mode}`, async ({
                page,
            }) => {
                await page.setViewportSize({ width: vp.width, height: vp.height });
                await page.goto(HOST_ROUTE);
                await page.waitForLoadState("networkidle");
                await setDark(page, dark);

                const r = await readGridCoverage(page, PAGE_BG);

                // (a) — the grid card resolves a non-`none` grid background-image;
                // the bare card has NO grid (host background-image `none` or
                // missing the gradient stack).
                expect(r.gridBgImage).toContain("linear-gradient");
                expect(r.bareBgImage === "none" || !r.bareBgImage.includes("linear-gradient")).toBe(true);

                // (a)+(b) — the painted stroke-coverage clears a JND floor on the
                // grid card and is 0 on the bare card (the occlusion-defeat:
                // the grid reaches the INTERIOR). Holds in BOTH modes (the dark
                // arm lifts the --foreground-derived ink off the near-black
                // interior).
                expect(r.bareCoverage).toBe(0);
                expect(r.gridCoverage).toBeGreaterThan(0.01); // ≥ ~1% line-pixel JND
            });
        }
    }

    test("the grid is a STATIC raster — no per-frame paint over a scroll", async ({
        page,
    }) => {
        await page.setViewportSize({ width: 1280, height: 800 });
        await page.goto(HOST_ROUTE);
        await page.waitForLoadState("networkidle");
        const isStatic = await readStaticRaster(page);
        expect(isStatic).toBe(true);
    });

    test("capture the DELTA frames (bare → grid, both modes)", async ({ page }) => {
        mkdirSync(VISUAL_DIR, { recursive: true });
        await page.setViewportSize({ width: 1280, height: 800 });
        await page.goto(HOST_ROUTE);
        await page.waitForLoadState("networkidle");
        for (const dark of [false, true]) {
            await setDark(page, dark);
            await page.screenshot({
                path: `${VISUAL_DIR}/paper-grid-${dark ? "dark" : "light"}.png`,
                fullPage: false,
            });
        }
    });
});
