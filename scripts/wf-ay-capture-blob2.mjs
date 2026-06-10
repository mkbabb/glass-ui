// AY.W-LIVE1 / W-DELTA0 — own-wave-id re-capture of the W-BLOB2 own-surface PNGs on the
// CURRENT tree (HEAD), the freshness-clause re-shoot. Re-shoots the SAME scenes the
// original W-BLOB2 step captured (the warm-cream default bead + the mood-hover lean
// series), per viewport × scheme:
//   goo-blob       : the live GooBlob at its DEFAULT (curious / cream) preset — the
//                    warm-cream gel bead (desktop + mobile, light + dark)
//   blob-mood-hover: five rAF-sampled frames as the pointer hovers the blob (the
//                    centroid-lean "the creature notices you" register; desktop-light,
//                    matching the original 5-frame strip)
//
// SUPERSEDED-SURFACE note: W-BLOB2 is `superseded-by: W-BLOB-REBUILD` — the blob
// renderer was rebuilt first-principles (the blob-as-background category error fix +
// the canonical cream-bead resting state), so the bare standalone `<GooBlob>` the
// original W-BLOB2 default-identity frames shot is now the STUDIO stage blob (the ONE
// live GL context the rebuilt blob page holds). This re-capture shoots the CURRENT
// surface (the studio stage GooBlob at its default cream preset), the faithful
// own-wave-id re-shoot on HEAD. The blob route carries NO Aurora, and the GooBlob WebGL2
// metaball does not do Aurora's per-frame ReadPixels stall, so a normal headless capture
// + a short hover rAF-sample run clean (no substrate park needed).
//
// Modeled on scripts/wf-ay-capture-dock2.mjs.

import { resolve } from "node:path";
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const VISUAL_DIR = resolve(ROOT, "docs/tranches/AY/audit/visual");
const BASE_URL = process.env.GLASS_UI_DEMO_URL ?? "http://localhost:5199";
const ROUTE = "/substrates/blob";
const BLOB_SEL = '[data-testid="goo-blob-canvas"]';

const VIEWPORTS = [
    { id: "desktop", width: 1280, height: 900 },
    { id: "mobile", width: 390, height: 844 },
];
const THEMES = ["light", "dark"];

async function settle(page, ms) {
    await page.waitForTimeout(ms);
}

async function run() {
    mkdirSync(VISUAL_DIR, { recursive: true });
    const browser = await chromium.launch();
    const captured = [];
    try {
        // ── (A) the default cream-bead identity, per viewport × scheme ────────────
        for (const vp of VIEWPORTS) {
            for (const theme of THEMES) {
                const ctx = await browser.newContext({
                    viewport: { width: vp.width, height: vp.height },
                    deviceScaleFactor: 2,
                    colorScheme: theme === "dark" ? "dark" : "light",
                });
                const page = await ctx.newPage();
                await page.goto(`${BASE_URL}${ROUTE}`, { waitUntil: "domcontentloaded" });
                if (theme === "dark")
                    await page.evaluate(() =>
                        document.documentElement.classList.add("dark"),
                    );
                else
                    await page.evaluate(() =>
                        document.documentElement.classList.remove("dark"),
                    );
                const blob = page.locator(BLOB_SEL).first();
                await blob.waitFor({ state: "visible", timeout: 15_000 });
                await blob.scrollIntoViewIfNeeded();
                // let the metaball settle to its resting cream bead (the default
                // curious preset paints the warm-cream gel).
                await settle(page, 1400);
                const name = `W-BLOB2-goo-blob-${vp.id}-${theme}.png`;
                await blob.screenshot({ path: resolve(VISUAL_DIR, name) });
                captured.push(name);
                await ctx.close();
            }
        }

        // ── (B) the mood-hover lean series (5 frames, desktop-light) ──────────────
        {
            const ctx = await browser.newContext({
                viewport: { width: 1280, height: 900 },
                deviceScaleFactor: 2,
                colorScheme: "light",
            });
            const page = await ctx.newPage();
            await page.goto(`${BASE_URL}${ROUTE}`, { waitUntil: "domcontentloaded" });
            await page.evaluate(() =>
                document.documentElement.classList.remove("dark"),
            );
            const blob = page.locator(BLOB_SEL).first();
            await blob.waitFor({ state: "visible", timeout: 15_000 });
            await blob.scrollIntoViewIfNeeded();
            await settle(page, 1200);
            // hover the blob toward one edge so the centroid leans — sample 5 frames
            // across the lean as the metaball chases the pointer.
            const box = await blob.boundingBox();
            if (box) {
                // move the pointer to the right edge of the blob (the lean target).
                await page.mouse.move(box.x + box.width * 0.85, box.y + box.height * 0.5);
                for (let i = 1; i <= 5; i++) {
                    // nudge the pointer slightly each frame so the lean keeps tracking,
                    // and let a few rAF frames pass between shots.
                    await page.mouse.move(
                        box.x + box.width * (0.6 + 0.05 * i),
                        box.y + box.height * 0.5,
                    );
                    await settle(page, 180);
                    const name = `W-BLOB2-blob-mood-hover-frame${i}-desktop-light.png`;
                    await blob.screenshot({ path: resolve(VISUAL_DIR, name) });
                    captured.push(name);
                }
            }
            await ctx.close();
        }
    } finally {
        await browser.close();
    }
    console.log(JSON.stringify({ captured, count: captured.length }, null, 2));
}

run().catch((e) => {
    console.error("BLOB2 CAPTURE FAILED:", e.message);
    process.exit(1);
});
