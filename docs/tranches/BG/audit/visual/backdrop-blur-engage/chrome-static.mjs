// Static provenance capture — Chrome via CDP over the proven ?capture= boot path.
import { chromium } from "playwright";

const CDP = process.env.CDP_URL || "http://localhost:9333";
const OUT = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/backdrop-blur-engage/";

const ROUTES = [
    ["/containers/drawer", "drawer"],
    ["/compositions/drawer-live-behind", "drawer-live-behind"],
    ["/dock/overview", "dock-overview"],
    ["/dock/morph-showcase", "dock-morph"],
    ["/dock/layers", "dock-layers"],
    ["/dock/rail", "dock-rail"],
];

async function capture(ctx, route, slug, mode) {
    const page = await ctx.newPage();
    await page.setViewportSize({ width: 1440, height: 900 });
    const url = `http://localhost:5200/?capture=${encodeURIComponent(route)}&mode=${mode}`;
    await page.goto(url, { waitUntil: "load", timeout: 30000 });
    let ready = false;
    const t0 = Date.now();
    while (Date.now() - t0 < 15000) {
        ready = await page.evaluate(() =>
            document.documentElement.hasAttribute("data-capture-ready")
        );
        if (ready) break;
        await page.waitForTimeout(150);
    }
    const elapsed = Date.now() - t0;
    const glRenderer = await page.evaluate(() => {
        try {
            const c = document.createElement("canvas");
            const gl = c.getContext("webgl2") || c.getContext("webgl");
            if (!gl) return "no-webgl";
            const ext = gl.getExtension("WEBGL_debug_renderer_info");
            return ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER);
        } catch (e) { return "err:" + e.message; }
    });
    const outPath = `${OUT}${slug}-chrome-${mode}-desktop-full.png`;
    await page.screenshot({ path: outPath, fullPage: true });
    console.log(JSON.stringify({ slug, mode, ready, elapsedMs: elapsed, glRenderer: glRenderer.slice(0, 40) }));
    await page.close();
}

const browser = await chromium.connectOverCDP(CDP);
const ctx = browser.contexts()[0] || (await browser.newContext());
const mode = process.argv[2] || "light";
for (const [route, slug] of ROUTES) {
    await capture(ctx, route, slug, mode);
}
await browser.close();
