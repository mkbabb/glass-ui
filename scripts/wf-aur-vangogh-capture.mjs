// W-AUR-VANGOGH-REBUILD — BEFORE/AFTER van-Gogh DELTA + per-medium render-cost profile.
//
// Drives the standalone harness (tests-visual/_aur-vangogh-harness.html) which mounts
// the REAL aurora runtime with the VANGOGH preset on a bare canvas (disjoint from the
// demo studio chrome, which a sibling lane is mid-rebuild on). Captures a full-bleed
// plate + a 320x256 closeup crop, then profiles per-medium GPU cost by timing N
// deterministic renderAt() frames per medium (the lag root-cause — no live-rAF stall).

import { resolve } from "node:path";
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const VISUAL_DIR = resolve(ROOT, "docs/tranches/AY/audit/visual");
const BASE_URL = process.env.GLASS_UI_DEMO_URL ?? "http://localhost:5199";
const HARNESS = "/tests-visual/_aur-vangogh-harness.html";
const TAG = process.env.AUR_TAG ?? "before";
const MODE = process.env.AUR_MODE ?? "dark"; // "dark" | "light"
const DO_PROFILE = process.env.AUR_PROFILE !== "0";
const PROFILE_MEDIA = ["smooth", "oil", "vangogh", "oil-pastel", "crayon"];

async function run() {
    mkdirSync(VISUAL_DIR, { recursive: true });
    const browser = await chromium.launch({
        args: ["--use-gl=angle", "--use-angle=metal"],
    });
    const shots = [];
    const out = {};
    try {
        const ctx = await browser.newContext({
            viewport: { width: 1440, height: 900 },
            deviceScaleFactor: 2,
            colorScheme: MODE,
        });
        const page = await ctx.newPage();
        page.on("console", (m) => { const t = m.text(); if (/error|fail|exception/i.test(t)) console.log("  [page]", t.slice(0, 160)); });
        page.on("pageerror", (e) => console.log("  [pageerror]", String(e).slice(0, 200)));

        await page.goto(`${BASE_URL}${HARNESS}?preset=VANGOGH`, { waitUntil: "load", timeout: 30000 });
        if (MODE === "dark") await page.evaluate(() => document.documentElement.classList.add("dark"));
        else await page.evaluate(() => document.documentElement.classList.remove("dark"));
        await page.waitForFunction(() => window.__aurReady === true, { timeout: 20000 });
        await page.waitForSelector("canvas.aurora-canvas", { timeout: 12000 });

        // Render a deterministic settled frame (t past the warmup).
        await page.evaluate(() => window.__aur.renderAt(2.4));
        await page.waitForTimeout(400);

        const canvas = page.locator("canvas.aurora-canvas").first();

        // ── Full-bleed plate ──
        const full = `W-AUR-VANGOGH-${TAG}-full-${MODE}.png`;
        await canvas.screenshot({ path: resolve(VISUAL_DIR, full) });
        shots.push(full);

        // ── Closeup crop (320x256 — the stroke-read, beside starry-night-crop.png) ──
        const box = await canvas.boundingBox();
        if (box) {
            const crop = `W-AUR-VANGOGH-${TAG}-crop-${MODE}.png`;
            await page.screenshot({
                path: resolve(VISUAL_DIR, crop),
                clip: { x: box.x + box.width * 0.30, y: box.y + box.height * 0.26, width: 320, height: 256 },
            });
            shots.push(crop);
        }

        // ── Per-medium render-cost profile: time 30 deterministic renderAt frames each. ──
        const profile = {};
        for (const m of (DO_PROFILE ? PROFILE_MEDIA : [])) {
            await page.evaluate((med) => window.__aur.setMedium(med), m);
            await page.waitForTimeout(250);
            const ms = await page.evaluate(async () => {
                // warm 3
                for (let i = 0; i < 3; i++) { window.__aur.renderAt(1 + i * 0.1); }
                const samples = [];
                for (let i = 0; i < 24; i++) {
                    const t0 = performance.now();
                    window.__aur.renderAt(2 + i * 0.05);
                    // force GPU flush via a 1px readback
                    const gl = document.querySelector("canvas.aurora-canvas").getContext("webgl2");
                    const px = new Uint8Array(4);
                    gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px);
                    samples.push(performance.now() - t0);
                }
                samples.sort((a, b) => a - b);
                return { median: samples[12], min: samples[0], max: samples[23] };
            });
            profile[m] = ms;
            console.log(`  profile ${m}: median ${ms.median.toFixed(2)}ms (min ${ms.min.toFixed(2)} / max ${ms.max.toFixed(2)})`);
        }
        out.profile = profile;

        await ctx.close();
    } finally {
        await browser.close();
    }

    out.tag = TAG;
    out.shots = shots;
    writeFileSync(
        resolve(VISUAL_DIR, `W-AUR-VANGOGH-${TAG}-${MODE}-readback.json`),
        JSON.stringify({ generatedAt: new Date().toISOString(), base: BASE_URL, harness: HARNESS, mode: MODE, ...out }, null, 2),
    );
    console.log(`\nW-AUR-VANGOGH ${TAG} capture complete:`);
    for (const s of shots) console.log(`  ${s}`);
}

run().catch((e) => { console.error(e); process.exit(1); });
