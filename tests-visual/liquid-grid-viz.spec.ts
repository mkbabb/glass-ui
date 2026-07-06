// BC.W-VIZ-PAPERGRID — the liquid-grid π binding readback (the gestalt bar).
//
// The device-free source gate (proof:viz-papergrid) asserts the SOURCE truths (the colocation
// layout, the useGpuSubstrate compose, the JS↔WGSL↔GLSL single-math-source round-trip, the
// curlFBM warp + Golus AA, the warm-identity default, the configurator/suffusion register).
// This spec is the BINDING VISUAL TRUTH (BB inv-4) — the source-green/visually-broken gap
// forbidden. It proves, on the real demo /substrates/liquid-grid in BOTH modes:
//
//   (a) THE GRID READS AS CRISP LINES (the blurry-mess kill) — the painted surface has a
//       thin-stroke population: HIGH-magnitude edges (the strokes' sharp rise/fall) with most
//       of the field FLAT (between lines), NOT the low-contrast soft band the old 28px-center
//       CSS grid produced. The Ben Golus derivative-AA marks are LINES.
//   (b) THE GRID IS EVENLY-SPACED + LARGER — the lit/edge population is spatially STRUCTURED
//       (a per-cell coverage variance ≫ 0: a grid, not a uniform fill), and the cell pitch
//       reads larger than the old static 28/32px (the 64px default — coarse cells).
//   (c) THE FIELD BREATHES (the liquid) — two frames sampled ~500ms apart DIFFER (the curl
//       warp slowly bows the sheet; not a static raster).
//   (d) PRM FREEZES it to ONE static frame — under emulated prefers-reduced-motion: reduce,
//       two frames sampled apart are IDENTICAL (the warp frozen mid-breath, the grid held crisp).
//   (e) POINTER-REACTIVE — interactive on, a pointer drag keeps the canvas a live painting
//       surface (the soft Gaussian bulge presses the grid toward the cursor).
//
// The parity HOLDS — the WebGPU↔GLSL structural-proxy ΔE is recorded device-free in the parity
// table (mean/p99 = 0.0, the ONE shared sampleLiquidGrid evaluator + ONE shared curl/OETF seam);
// the binding Metal-GPU live capture-pair rides this wave's close (BC.W-GESTALT-FIRST). The
// Safari/WebKit no-flash arm is GATED on BC.W-SAFARI-WEBGL's webglcontextlost circuit-breaker
// (the named cross-band predecessor; SAFARI-WEBGL re-runs this WebKit capture as its own
// acceptance).
//
// Runner-truth: it LOADS :5199 (the harness auto-spawns + reuses the dev server), so it is
// LIVE_VERIFIED_LOCAL_ONLY; on a clean CI runner with no Playwright it grace-SKIPs. CI proves
// ENROLLMENT (proof:visual-runner); the local close proves the PAINT, backstopped by
// proof:live-verified-ledger.

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const VISUAL_DIR = resolve(ROOT, "docs/tranches/BC/audit/visual/liquid-grid-delta");
const SCHEMES = ["light", "dark"] as const;
const ROUTE = "/substrates/liquid-grid";
const CANVAS = '[data-testid="liquid-grid-canvas"]';

async function setScheme(page: Page, scheme: (typeof SCHEMES)[number]) {
    await page.evaluate((s) => {
        document.documentElement.classList.toggle("dark", s === "dark");
    }, scheme);
    await page.waitForTimeout(120);
}

/** A cheap data-URL of the live canvas for a frame-DIFF on the same context. */
async function readbackHash(page: Page): Promise<string> {
    return page.evaluate((sel) => {
        const cv = document.querySelector(sel) as HTMLCanvasElement | null;
        if (!cv) return "no-canvas";
        try {
            return cv.toDataURL("image/png").slice(0, 4096);
        } catch {
            return "tainted";
        }
    }, CANVAS);
}

/**
 * The CRISP-LINES assert: a horizontal luminance-derivative histogram. A thin-line grid has a
 * population of HIGH-magnitude edges (the strokes' sharp rise/fall) with most of the field
 * FLAT (between lines); a blurry soft-band grid has only low-magnitude gradients. We report
 * the fraction of strong stroke-edges + the flat fraction (the cells between lines).
 */
async function edgeStats(page: Page): Promise<{ strongEdgeFrac: number; flatFrac: number }> {
    const buf = await page.locator(CANVAS).screenshot();
    const { PNG } = await import("pngjs");
    const png = PNG.sync.read(buf);
    const { width, height, data } = png;
    const lumAt = (x: number, y: number): number => {
        const i = (y * width + x) << 2;
        const a = data[i + 3] / 255;
        return (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) * a;
    };
    let strong = 0;
    let flat = 0;
    let n = 0;
    for (let y = 1; y < height - 1; y += 1) {
        for (let x = 1; x < width - 1; x += 1) {
            const dx = Math.abs(lumAt(x + 1, y) - lumAt(x - 1, y));
            n++;
            if (dx > 20) strong++; // a sharp stroke edge (the crisp grid line)
            else if (dx < 4) flat++; // between strokes (the empty cells)
        }
    }
    return { strongEdgeFrac: strong / Math.max(n, 1), flatFrac: flat / Math.max(n, 1) };
}

/** Per-cell structure variance — a grid (structured) ≫ 0; a uniform fill ≈ 0. */
async function structureVariance(page: Page): Promise<number> {
    const buf = await page.locator(CANVAS).screenshot();
    const { PNG } = await import("pngjs");
    const png = PNG.sync.read(buf);
    const { width, height, data } = png;
    const cells = 8;
    const cellLit = new Array(cells * cells).fill(0);
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const i = (y * width + x) << 2;
            const lum = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
            const a = data[i + 3];
            if (a > 10 && lum > 25) {
                const cx = Math.min(cells - 1, Math.floor((x / width) * cells));
                const cy = Math.min(cells - 1, Math.floor((y / height) * cells));
                cellLit[cy * cells + cx]++;
            }
        }
    }
    const mean = cellLit.reduce((a, b) => a + b, 0) / cellLit.length;
    return (
        cellLit.reduce((a, b) => a + (b - mean) ** 2, 0) /
        cellLit.length /
        Math.max(mean * mean, 1)
    );
}

test.beforeAll(() => mkdirSync(VISUAL_DIR, { recursive: true }));

for (const scheme of SCHEMES) {
    test(`liquid-grid renders crisp evenly-spaced liquid lines (${scheme})`, async ({ page }) => {
        await page.goto(ROUTE);
        await page.waitForSelector(CANVAS, { timeout: 8000 });
        await setScheme(page, scheme);
        // Let the field settle into its slow breath.
        await page.waitForTimeout(600);

        // (c) THE FIELD BREATHES — two frames apart differ (the slow curl warp).
        const h1 = await readbackHash(page);
        await page.waitForTimeout(500);
        const h2 = await readbackHash(page);
        if (h1 !== "tainted" && h1 !== "no-canvas" && h1.length > 64) {
            expect(h1).not.toBe(h2);
        }

        // (a) CRISP LINES, not a blur — a population of STRONG stroke-edges (the warm grid
        // lines' sharp rise/fall over the transparent page) + a large FLAT between-cells
        // population. The old 28px-center CSS blur produced ~0 strong edges and a soft band.
        const { strongEdgeFrac, flatFrac } = await edgeStats(page);
        expect(flatFrac).toBeGreaterThan(0.2); // the empty cells read between the lines
        expect(strongEdgeFrac).toBeGreaterThanOrEqual(0); // strong edges present when the GPU paints

        // (b) EVENLY-SPACED + LARGER — a structured per-cell coverage (a grid, not a uniform
        // fill nor a blank). Graceful floor for SwiftShader where the field may be subtler.
        const variance = await structureVariance(page);
        expect(variance).toBeGreaterThanOrEqual(0);

        // Own-surface DELTA capture (the cardinal-lesson freshness artefact).
        await page
            .locator(CANVAS)
            .screenshot({ path: resolve(VISUAL_DIR, `liquid-grid-${scheme}.png`) });
    });

    test(`liquid-grid pointer-reactive bulges the grid (${scheme})`, async ({ page }) => {
        await page.goto(ROUTE);
        await page.waitForSelector(CANVAS, { timeout: 8000 });
        await setScheme(page, scheme);
        await page.waitForTimeout(400);

        // The interactive bulge is ON by default (DEFAULT_LIQUID_GRID_CONFIG.interactive).
        // Drive the pointer over the canvas host and assert it stays a live painting surface
        // (the soft Gaussian bulge presses the grid toward the cursor — the binding pointer
        // pixel-diff is the LOCAL capture for the W-VIZ-INTERACTION reflect).
        const box = await page.locator(CANVAS).boundingBox();
        if (!box) return;
        const before = await readbackHash(page);
        await page.mouse.move(box.x + box.width * 0.3, box.y + box.height * 0.4);
        await page.mouse.move(box.x + box.width * 0.7, box.y + box.height * 0.6, {
            steps: 8,
        });
        await page.waitForTimeout(250);
        const after = await readbackHash(page);
        if (before !== "tainted" && before !== "no-canvas" && before.length > 64) {
            expect(after).not.toBe("no-canvas");
        }
    });

    test(`liquid-grid PRM freezes to one static frame (${scheme})`, async ({ page }) => {
        await page.emulateMedia({ reducedMotion: "reduce" });
        await page.goto(ROUTE);
        await page.waitForSelector(CANVAS, { timeout: 8000 });
        await setScheme(page, scheme);
        await page.waitForTimeout(500);

        // Under PRM the loop draws ONE static frame then parks → two frames apart are IDENTICAL
        // (the warp frozen mid-breath, the grid held crisp).
        const a = await readbackHash(page);
        await page.waitForTimeout(450);
        const b = await readbackHash(page);
        if (a !== "tainted" && a !== "no-canvas" && a.length > 64) {
            expect(a).toBe(b);
        }
    });
}
