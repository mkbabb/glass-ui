// AY.W-LIVE1 / W-DELTA0 — own-wave-id re-capture of the W-CON1 own-surface PNGs on the
// CURRENT tree (HEAD), the freshness-clause re-shoot. Re-shoots the SAME scenes the
// original W-CON1 RG2 step captured (the refit before/after pair + the auto-drift
// wander), per viewport × scheme:
//   refit-before  : the HOST forced to 360×240 (the small box) → the small lattice
//                   drift-out baseline (a small filled box)
//   refit (after) : desktop the HOST grown to 1280×720; mobile the HOST at its natural
//                   390-viewport card width — the lattice re-fits to fill the new box
//   autodrift     : the wander-fired focal at the after/natural host size
//
// The constellation renders on `useCanvas2D` (NOT WebGL), so there is no Aurora
// ReadPixels stall here — a plain headless capture. The surface was carved render-
// neutral by W-GOD1 (constellationField → Draw/Interaction leaves); this re-capture
// satisfies the git-ancestry freshness clause (capture-commit at-or-after the surface's
// last touch), not to change the verdict.
//
// HOST-SIZING note: the demo `__constellationRefit.resizeTo` seam sets the host's plain
// inline `width`, but a FLEX parent introduced by the later layout reverify now stretches
// the host so the plain inline width no longer shrinks the box (the same drift the
// proof:constellation-refit-live gate now surfaces). For a FAITHFUL drift-out "before"
// the harness forces the host box at CAPTURE TIME via `setProperty(…, "important")` +
// `flex:none` (a capture-time style, NOT a demo source edit), then lets the substrate's
// ResizeObserver re-fit the field to the forced extent. The captured surface is the HOST
// element (the resizable overflow-hidden container), so the PNG dims ARE the box the
// lattice fills.
//
// Modeled on scripts/wf-ay-capture-dock2.mjs.

import { resolve } from "node:path";
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const VISUAL_DIR = resolve(ROOT, "docs/tranches/AY/audit/visual");
const BASE_URL = process.env.GLASS_UI_DEMO_URL ?? "http://localhost:5199";
const ROUTE = "/substrates/constellation";

const VIEWPORTS = [
    { id: "desktop", width: 1280, height: 800, largeW: 1280, largeH: 720 },
    { id: "mobile", width: 390, height: 844, largeW: null, largeH: null },
];
const THEMES = ["light", "dark"];

const CANVAS_SEL = ".constellation-canvas"; // the third constellation's canvas (nth 2)

// Force the refit host box to a fixed extent (capture-time only) so the field re-fits to
// it, then settle. `null` w clears the override (restore the natural card width).
function forceHostSize([w, h]) {
    const canvas = document.querySelectorAll(".constellation-canvas")[2];
    const host = canvas && canvas.parentElement && canvas.parentElement.parentElement;
    if (!host) return;
    if (w == null) {
        host.style.removeProperty("width");
        host.style.removeProperty("height");
        host.style.removeProperty("flex");
    } else {
        host.style.setProperty("width", `${w}px`, "important");
        host.style.setProperty("height", `${h}px`, "important");
        host.style.setProperty("flex", "none", "important");
    }
    void host.offsetWidth; // force a synchronous layout flush so the RO fires
}

const settleFrames = (n) =>
    new Promise((res) => {
        let i = 0;
        const f = () => (++i >= n ? res() : requestAnimationFrame(f));
        requestAnimationFrame(f);
    });

async function run() {
    mkdirSync(VISUAL_DIR, { recursive: true });
    const browser = await chromium.launch();
    const captured = [];
    try {
        for (const vp of VIEWPORTS) {
            for (const theme of THEMES) {
                const ctx = await browser.newContext({
                    viewport: { width: vp.width, height: vp.height },
                    deviceScaleFactor: 1,
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
                const refitCanvas = page.locator(CANVAS_SEL).nth(2);
                await refitCanvas.waitFor({ state: "visible", timeout: 20_000 });
                await refitCanvas.scrollIntoViewIfNeeded();
                const host = refitCanvas.locator("xpath=.."); // the canvas's Constellation root
                const hostBox = refitCanvas.locator("xpath=../.."); // the refit host (resizable)
                await page.waitForFunction(
                    () => {
                        const r = window.__constellationRefit;
                        return !!r && !!r.field && typeof r.resizeTo === "function";
                    },
                    { timeout: 15_000 },
                );
                void host;

                // (1) refit-BEFORE — force the host to the SMALL 360×240 box, settle, shoot
                // (the small lattice drift-out baseline).
                await page.evaluate(forceHostSize, [360, 240]);
                await page.evaluate(settleFrames, 10);
                const beforeName = `W-CON1-refit-before-${vp.id}-${theme}.png`;
                await hostBox.screenshot({ path: resolve(VISUAL_DIR, beforeName) });
                captured.push(beforeName);

                // (2) refit-AFTER — grow the host (desktop) / restore natural (mobile), the
                // lattice re-fits to fill the new box on the next frames.
                if (vp.largeW) {
                    await page.evaluate(forceHostSize, [vp.largeW, vp.largeH]);
                } else {
                    await page.evaluate(forceHostSize, [null, null]); // natural card width
                }
                await page.evaluate(settleFrames, 4);
                const afterName = `W-CON1-refit-${vp.id}-${theme}.png`;
                await hostBox.screenshot({ path: resolve(VISUAL_DIR, afterName) });
                captured.push(afterName);

                // (3) autodrift — let the wander cadence fire (≈1.4–2.0s) then shoot.
                await page.waitForTimeout(2200);
                const driftName = `W-CON1-autodrift-${vp.id}-${theme}.png`;
                await hostBox.screenshot({ path: resolve(VISUAL_DIR, driftName) });
                captured.push(driftName);

                await ctx.close();
            }
        }
    } finally {
        await browser.close();
    }
    console.log(JSON.stringify({ captured, count: captured.length }, null, 2));
}

run().catch((e) => {
    console.error("CON1 CAPTURE FAILED:", e.message);
    process.exit(1);
});
