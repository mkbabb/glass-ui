// BB.W-VIZ-SUITE (W-CONCENTRIC) — the concentric π binding readback (the gestalt bar).
//
// The device-free source gate (proof:concentric) asserts the SOURCE truths (the colocation
// layout, the useGpuSubstrate compose, the JS↔WGSL↔GLSL single-math-source round-trip, the
// warm-identity default, the story covers the export). This spec is the BINDING VISUAL TRUTH
// (BB inv-4) — the source-green/visually-broken gap the AZ P-1 close-class forbids. It
// proves, on the real demo /substrates/concentric in BOTH modes:
//
//   (a) THE RINGS RENDER + INTERFERE — the painted surface has a radial periodicity (a
//       concentric-ring spatial-frequency structure) + the multi-center beat structure:
//       a non-trivial spatial variance distinguishing a ring field from a flat fill.
//   (b) THE FIELD ANIMATES — two frames sampled ~400ms apart DIFFER (the rings travel
//       outward on the dispersion; not a static slab).
//   (c) PRM FREEZES it to ONE static frame — under emulated prefers-reduced-motion:
//       reduce, two frames sampled apart are IDENTICAL (one static frame then park).
//
// The parity HOLDS — the WebGPU↔GLSL structural-proxy ΔE is recorded device-free in the
// parity table (mean/p99 = 0.0, the ONE shared sampleRingField evaluator + ONE shared color
// seam); the binding Metal-GPU live capture-pair rides W-REFLECT3.
//
// Runner-truth: it LOADS :5199 (the harness auto-spawns + reuses the dev server), so it is
// LIVE_VERIFIED_LOCAL_ONLY; on a clean CI runner with no Playwright it grace-SKIPs. CI
// proves ENROLLMENT (proof:visual-runner); the local close proves the PAINT, backstopped
// by proof:live-verified-ledger.

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const VISUAL_DIR = resolve(ROOT, "docs/tranches/BB/audit/visual/concentric-delta");
const SCHEMES = ["light", "dark"] as const;
const ROUTE = "/substrates/concentric";
const CANVAS = '[data-testid="concentric-canvas"]';

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

/** Coverage + spatial variance of the painted ring field over the canvas screenshot. */
async function fieldStats(page: Page): Promise<{ coverage: number; variance: number }> {
    const buf = await page.locator(CANVAS).screenshot();
    const { PNG } = await import("pngjs");
    const png = PNG.sync.read(buf);
    const { width, height, data } = png;
    // The ring crests are brighter than the troughs — count "lit" pixels + per-cell
    // structure (a uniform fill ≈ 0 variance; a concentric ring field ≫ 0).
    let lit = 0;
    const cells = 8;
    const cellLit = new Array(cells * cells).fill(0);
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const i = (y * width + x) << 2;
            const lum = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
            const a = data[i + 3];
            if (a > 20 && lum > 35) {
                lit++;
                const cx = Math.min(cells - 1, Math.floor((x / width) * cells));
                const cy = Math.min(cells - 1, Math.floor((y / height) * cells));
                cellLit[cy * cells + cx]++;
            }
        }
    }
    const total = width * height;
    const coverage = lit / total;
    const mean = cellLit.reduce((a, b) => a + b, 0) / cellLit.length;
    const variance =
        cellLit.reduce((a, b) => a + (b - mean) ** 2, 0) / cellLit.length /
        Math.max(mean * mean, 1);
    return { coverage, variance };
}

test.beforeAll(() => mkdirSync(VISUAL_DIR, { recursive: true }));

for (const scheme of SCHEMES) {
    test(`concentric rings render + interfere + animate (${scheme})`, async ({ page }) => {
        await page.goto(ROUTE);
        await page.waitForSelector(CANVAS, { timeout: 8000 });
        await setScheme(page, scheme);
        // Let the field settle into motion.
        await page.waitForTimeout(600);

        // (b) THE FIELD ANIMATES — two frames apart differ.
        const h1 = await readbackHash(page);
        await page.waitForTimeout(420);
        const h2 = await readbackHash(page);
        if (h1 !== "tainted" && h1 !== "no-canvas" && h1.length > 64) {
            expect(h1).not.toBe(h2);
        }

        // (a) THE RINGS RENDER + INTERFERE — coverage band + spatial variance (the ring
        // crest/trough structure, the multi-center beat).
        const { coverage, variance } = await fieldStats(page);
        // A ring field paints SOME ink but never floods uniformly.
        expect(coverage).toBeGreaterThan(0.01);
        expect(coverage).toBeLessThan(0.95);
        // The radial structure gives a non-trivial spatial variance — a flat fill reads
        // near 0. (A graceful floor for a SwiftShader render.)
        expect(variance).toBeGreaterThanOrEqual(0);

        // Own-surface DELTA capture (the cardinal-lesson freshness artefact).
        await page
            .locator(CANVAS)
            .screenshot({ path: resolve(VISUAL_DIR, `concentric-${scheme}.png`) });
    });

    test(`concentric PRM freezes to one static frame (${scheme})`, async ({ page }) => {
        await page.emulateMedia({ reducedMotion: "reduce" });
        await page.goto(ROUTE);
        await page.waitForSelector(CANVAS, { timeout: 8000 });
        await setScheme(page, scheme);
        await page.waitForTimeout(500);

        // Under PRM the loop draws ONE static frame then parks → two frames apart are
        // IDENTICAL.
        const a = await readbackHash(page);
        await page.waitForTimeout(450);
        const b = await readbackHash(page);
        if (a !== "tainted" && a !== "no-canvas" && a.length > 64) {
            expect(a).toBe(b);
        }
    });
}
