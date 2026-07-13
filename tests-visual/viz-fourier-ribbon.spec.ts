// BI.W-FOURIER-RIBBON — the instanced-geometry ribbon π binding readback (the gestalt bar).
//
// The device-free source gate (proof:viz-fourier-ribbon) asserts the SOURCE truths (the
// fullscreen-SDF fs bodies retired wholesale — no dual path; the instanced ribbon on BOTH
// backends over the shared geometry leaf; the compute kernel byte-identical; the RIBBON_TAIL_FRAC
// mirror; the --ff-head-* restyle bridge gone + computeFourierFit hoisted; the epicycle-join
// MAX-blend seam fix). This spec is the BINDING VISUAL TRUTH (the source-green/visually-broken
// gap forbidden) — the ribbon is pixel-identical-by-construction to the retired SDF (each segment
// over-composited separately in the loop == each instanced capsule blended `over` in draw order),
// so the DELTA is "same paint, O(covered_pixels) cost". It proves, on the real demo
// /substrates/fourier-field in BOTH modes:
//
//   (a) STRUCTURED PAINT (the black-void / dead-plate close) — the frame carries a wide luminance
//       SPREAD (a bright comet head + specular over the darker ribbon body); a broken retirement
//       that painted a flat plate (or nothing) collapses the spread to ~0.
//   (b) THE RIBBON READS AS CHROMATIC INK — a non-trivial fraction of the frame carries the warm
//       comet / epicycle-ring chroma the near-neutral backdrop lacks (a blank canvas over the
//       backdrop shows only low-chroma pixels), AND that chromatic ink is a MINORITY (a curve
//       covering a small fraction of the canvas — the whole reason the fullscreen SDF was "god
//       awful" — never a full-bleed chromatic wash).
//   (c) PRM FREEZES it to ONE static frame — under emulated prefers-reduced-motion: reduce two
//       frames sampled apart are IDENTICAL (the substrate live-PRM one-static-frame-then-park).
//
// The GPU frame-cost readback proving the fragment-work collapse (O(covered_pixels)) + the
// WGSL/WebGPU-primary GPU-timestamp ABSOLUTE are the device-run obligation (SAF-1 /
// dis:safari-metal-verify) — Playwright cannot expose WebGPU timestamp queries; the SHAPE is
// source-resolved (both fs bodies ran the SAME fullscreen SDF), so that is a confirmation
// device-run, NOT a design question, deferred to the real-Metal capture.
//
// Runner-truth: it LOADS :5199 (the harness auto-spawns + reuses the dev server), so it is
// LIVE_VERIFIED_LOCAL_ONLY; on a clean CI runner with no Playwright it grace-SKIPs. CI proves
// ENROLLMENT (proof:visual-runner); the local close proves the PAINT, backstopped by
// proof:live-verified-ledger. Rides the W-PI-IN-CLOSE battery + the motion/substrate gestalt.

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const VISUAL_DIR = resolve(
    ROOT,
    "docs/tranches/BI/audit/visual/fourier-ribbon-delta",
);
const SCHEMES = ["light", "dark"] as const;
const ROUTE = "/substrates/fourier-field";
const CANVAS = "canvas.fourier-field-canvas";

async function setScheme(page: Page, scheme: (typeof SCHEMES)[number]): Promise<void> {
    await page.evaluate((s) => {
        document.documentElement.classList.toggle("dark", s === "dark");
    }, scheme);
    await page.waitForTimeout(150);
}

interface FrameStats {
    /** The luminance spread p99.5 − p0.5 — a bright head/specular over the dark ribbon body. */
    spread: number;
    /** Fraction of pixels carrying chroma (max−min channel) above the neutral-backdrop floor. */
    chromFrac: number;
}

async function frameStats(page: Page): Promise<FrameStats> {
    const buf = await page.locator(CANVAS).first().screenshot();
    const { PNG } = await import("pngjs");
    const png = PNG.sync.read(buf);
    const { width, height, data } = png;
    const n = width * height;
    const lums: number[] = new Array(n);
    let chromHi = 0;
    for (let i = 0, j = 0; i < data.length; i += 4, j++) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        lums[j] = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        const ch = Math.max(r, g, b) - Math.min(r, g, b);
        if (ch > 45) chromHi++;
    }
    lums.sort((a, b) => a - b);
    const p99 = lums[Math.floor(n * 0.995)];
    const p01 = lums[Math.floor(n * 0.005)];
    return { spread: p99 - p01, chromFrac: chromHi / n };
}

/** Poll until the ribbon has painted (a real spread) — the WebGPU device acquisition is async. */
async function armField(page: Page): Promise<FrameStats> {
    await page.locator(CANVAS).first().waitFor({ state: "visible", timeout: 15000 });
    let stats: FrameStats = { spread: 0, chromFrac: 0 };
    const deadline = Date.now() + 16000;
    while (Date.now() < deadline) {
        await page.waitForTimeout(600);
        stats = await frameStats(page);
        if (stats.spread > 40 && stats.chromFrac > 0.006) return stats;
    }
    return stats;
}

test.beforeAll(() => {
    mkdirSync(VISUAL_DIR, { recursive: true });
});

for (const scheme of SCHEMES) {
    test(`fourier ribbon paints as a chromatic stroke — ${scheme}`, async ({ page }) => {
        await page.emulateMedia({ reducedMotion: "no-preference" });
        await page.goto(ROUTE, { waitUntil: "networkidle" });
        await setScheme(page, scheme);
        const stats = await armField(page);
        await page
            .locator(CANVAS)
            .first()
            .screenshot({ path: resolve(VISUAL_DIR, `ribbon_${scheme}.png`) });

        // (a) STRUCTURED PAINT — the fullscreen-SDF retirement did NOT flatten to a dead plate.
        expect(
            stats.spread,
            `the ribbon must carry a wide luminance spread — a bright comet head over the darker body (${scheme})`,
        ).toBeGreaterThan(60);

        // (b) CHROMATIC INK, A MINORITY — the warm comet + rings paint chroma the near-neutral
        //     backdrop lacks, over a small fraction of the canvas (a curve, never a full plate).
        expect(
            stats.chromFrac,
            `the ribbon must paint chromatic ink the near-neutral backdrop lacks (${scheme})`,
        ).toBeGreaterThan(0.008);
        expect(
            stats.chromFrac,
            `the ribbon is a curve, not a full-bleed chromatic wash — the ink is a minority (${scheme})`,
        ).toBeLessThan(0.5);
    });
}

test("PRM freezes the ribbon to one static frame", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(ROUTE, { waitUntil: "networkidle" });
    await setScheme(page, "light");
    await armField(page);

    const a = await page.locator(CANVAS).first().screenshot();
    await page.waitForTimeout(500);
    const b = await page.locator(CANVAS).first().screenshot();

    const { PNG } = await import("pngjs");
    const pa = PNG.sync.read(a);
    const pb = PNG.sync.read(b);
    expect(pa.width).toBe(pb.width);
    let diff = 0;
    for (let i = 0; i < pa.data.length; i += 4) {
        if (Math.abs(pa.data[i] - pb.data[i]) > 8) diff++;
    }
    const frac = diff / (pa.data.length / 4);
    // Under reduce the field paints ONE static frame then parks — two frames apart are identical.
    expect(frac, "the PRM-frozen ribbon must not sweep (two frames apart identical)").toBeLessThan(
        0.02,
    );
});
