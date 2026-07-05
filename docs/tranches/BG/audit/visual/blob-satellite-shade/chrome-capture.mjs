// BG.W-BLOB-SATELLITE-SHADE — Chrome CDP capture leg (real Chrome 149 + real Metal GPU).
// connectOverCDP(:9477); for each mode goto ?capture=/substrates/blob&mode=<m>, wait
// data-capture-ready, record GL_RENDERER off a throwaway webgl2 ctx, then scroll the live
// GooBlob canvas into view and screenshot the viewport (the blob GL bead sits below the
// masthead fold, so the viewport screenshot at scroll-0 would miss it — we scroll it in).
import { chromium } from "playwright";

const BASE = "http://localhost:5200";
const ROUTE = "/substrates/blob";
const OUT = "docs/tranches/BG/audit/visual/blob-satellite-shade";

const browser = await chromium.connectOverCDP("http://localhost:9477");
const ctx = browser.contexts()[0] ?? (await browser.newContext());

for (const mode of ["light", "dark"]) {
    const page = await ctx.newPage();
    await page.setViewportSize({ width: 1440, height: 900 });
    const url = `${BASE}/?capture=${encodeURIComponent(ROUTE)}&mode=${mode}`;
    await page.goto(url, { waitUntil: "domcontentloaded" });
    // wait for the demo capture-ready signal (GL warm-up + badge painted)
    await page.waitForFunction(
        () => document.documentElement.hasAttribute("data-capture-ready"),
        { timeout: 30000 },
    );
    // GL renderer provenance off a throwaway webgl2 ctx
    const glRenderer = await page.evaluate(() => {
        try {
            const c = document.createElement("canvas");
            const gl = c.getContext("webgl2");
            const ext = gl.getExtension("WEBGL_debug_renderer_info");
            return ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : "n/a";
        } catch (e) {
            return "err:" + e.message;
        }
    });
    // count live GL contexts (blob budget) + blob canvas presence
    const diag = await page.evaluate(() => {
        const canvases = Array.from(document.querySelectorAll("canvas"));
        const goo = canvases.filter((c) =>
            c.className.includes("goo-blob") || c.closest(".goo-blob"),
        );
        return {
            totalCanvas: canvases.length,
            gooCanvas: goo.length,
            mainChildren: document.querySelector("main")?.children.length ?? -1,
        };
    });
    // scroll the studio hero blob canvas into view + settle a few GL frames
    await page.evaluate(() => {
        const c =
            document.querySelector(".goo-blob canvas") ||
            document.querySelector("canvas.goo-blob-canvas") ||
            document.querySelector(".goo-blob-canvas") ||
            document.querySelector("canvas");
        if (c) c.scrollIntoView({ block: "center", behavior: "instant" });
    });
    await page.waitForTimeout(1600); // let the GL bead paint stable frames post-scroll
    await page.screenshot({ path: `${OUT}/blob-chrome-${mode}.png` });
    console.log(
        JSON.stringify({ mode, glRenderer, ...diag, shot: `blob-chrome-${mode}.png` }),
    );
    await page.close();
}

await browser.close();
console.log("DONE");
