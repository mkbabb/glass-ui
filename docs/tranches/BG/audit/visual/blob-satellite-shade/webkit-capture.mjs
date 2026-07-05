// BG.W-BLOB-SATELLITE-SHADE — WebKit blob-paint leg. The proven ObjC wkshot harness
// snapshots the viewport at scroll-0 (masthead) and cannot scroll the below-the-fold GL
// bead into view; it stands as the system-Safari-26 route-boot + Apple-GPU provenance.
// This leg drives playwright.webkit (real WebKit content process + Metal-ANGLE on Apple
// Silicon) to scroll the live GooBlob into view and screenshot it — the WebKit BLOB paint
// the paint judge reads. Records GL_RENDERER for provenance.
import { webkit } from "playwright";

const BASE = "http://localhost:5200";
const ROUTE = "/substrates/blob";
const OUT = "docs/tranches/BG/audit/visual/blob-satellite-shade";

const browser = await webkit.launch();
for (const mode of ["light", "dark"]) {
    const ctx = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        deviceScaleFactor: 2,
    });
    const page = await ctx.newPage();
    const url = `${BASE}/?capture=${encodeURIComponent(ROUTE)}&mode=${mode}`;
    await page.goto(url, { waitUntil: "domcontentloaded" });
    await page.waitForFunction(
        () => document.documentElement.hasAttribute("data-capture-ready"),
        { timeout: 30000 },
    );
    const glRenderer = await page.evaluate(() => {
        try {
            const c = document.createElement("canvas");
            const gl = c.getContext("webgl2");
            const ext = gl.getExtension("WEBGL_debug_renderer_info");
            return ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : (gl ? gl.getParameter(gl.RENDERER) : "no-gl2");
        } catch (e) {
            return "err:" + e.message;
        }
    });
    const diag = await page.evaluate(() => {
        const canvases = Array.from(document.querySelectorAll("canvas"));
        return {
            totalCanvas: canvases.length,
            gooCanvas: canvases.filter((c) => c.closest(".goo-blob")).length,
            mainChildren: document.querySelector("main")?.children.length ?? -1,
        };
    });
    await page.evaluate(() => {
        const c =
            document.querySelector(".goo-blob canvas") ||
            document.querySelector(".goo-blob-canvas") ||
            document.querySelector("canvas");
        if (c) c.scrollIntoView({ block: "center", behavior: "instant" });
    });
    await page.waitForTimeout(1800);
    await page.screenshot({ path: `${OUT}/blob-webkit-${mode}.png` });
    console.log(JSON.stringify({ mode, glRenderer, ...diag, shot: `blob-webkit-${mode}.png` }));
    await ctx.close();
}
await browser.close();
console.log("DONE");
