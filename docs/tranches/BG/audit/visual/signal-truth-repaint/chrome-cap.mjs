import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { chromium } = require("playwright");
const OUT = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/signal-truth-repaint";
const ROUTES = { "dock-overview": "/dock/overview", "glass-material": "/substrates/glass-material" };
const MODES = ["light", "dark"];
const CDP = process.env.CDP_URL || "http://localhost:9477";
const browser = await chromium.connectOverCDP(CDP);
for (const [slug, route] of Object.entries(ROUTES)) {
  for (const mode of MODES) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: mode });
    const page = await ctx.newPage();
    const url = `http://localhost:5200/?capture=${encodeURIComponent(route)}&mode=${mode}`;
    const out = `${OUT}/BG.W-GLASS-SIGNAL-TRUTH-chrome-${slug}-${mode}.png`;
    await page.goto(url, { waitUntil: "load", timeout: 30000 });
    let ready = false;
    try { await page.waitForFunction(() => document.documentElement.hasAttribute("data-capture-ready"), { timeout: 25000 }); ready = true; } catch { ready = false; }
    await page.waitForTimeout(2500);
    const glRenderer = await page.evaluate(() => { try { const c=document.createElement("canvas"); const gl=c.getContext("webgl2")||c.getContext("webgl"); if(!gl) return "no-webgl"; const d=gl.getExtension("WEBGL_debug_renderer_info"); return d?gl.getParameter(d.UNMASKED_RENDERER_WEBGL):"no-debug-ext"; } catch(e){ return "err:"+e.message; } });
    const witness = await page.evaluate(() => { const docks=[...document.querySelectorAll(".glass-dock")]; const fired=docks.filter(d=>d.hasAttribute("data-backdrop-sampled")).length; const onFired=docks.filter(d=>{const r=d.getBoundingClientRect(); return r.top<innerHeight&&r.bottom>0&&d.hasAttribute("data-backdrop-sampled");}).length; return {docks:docks.length, fired, onFired}; });
    await page.screenshot({ path: out, fullPage: false });
    console.log(JSON.stringify({ slug, mode, out, ready, glRenderer, witness }));
    await ctx.close();
  }
}
await browser.close();
