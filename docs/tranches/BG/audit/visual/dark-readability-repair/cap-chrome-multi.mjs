// Chrome CDP multi-route capture for the DARK-READABILITY-REPAIR paint-judge DELTA.
// Real on-screen Chrome.app (real Metal GPU) over ?capture=<route>&mode=<mode>, poll
// data-capture-ready, full-page screenshot. Slug = route -> file-safe.
import { chromium } from "playwright";
const CDP = process.env.CDP_URL || "http://localhost:9336";
const OUT = new URL(".", import.meta.url).pathname;
const ROUTES = JSON.parse(process.env.ROUTES_JSON);
const MODES = (process.env.MODES || "light,dark").split(",");
const slug = (r) => r.replace(/^\//, "").replace(/\//g, "-");

const browser = await chromium.connectOverCDP(CDP);
const ctx = browser.contexts()[0] || (await browser.newContext());
for (const route of ROUTES) {
  for (const mode of MODES) {
    const page = await ctx.newPage();
    await page.setViewportSize({ width: 1440, height: 900 });
    const url = `http://localhost:5200/?capture=${encodeURIComponent(route)}&mode=${mode}`;
    let ready = false, glRenderer = "?";
    try {
      await page.goto(url, { waitUntil: "load", timeout: 30000 });
      const t0 = Date.now();
      while (Date.now() - t0 < 15000) {
        ready = await page.evaluate(() => document.documentElement.hasAttribute("data-capture-ready"));
        if (ready) break;
        await page.waitForTimeout(150);
      }
      await page.waitForTimeout(300);
      glRenderer = await page.evaluate(() => {
        try { const c=document.createElement("canvas"); const gl=c.getContext("webgl2")||c.getContext("webgl");
          if(!gl) return "no-webgl"; const e=gl.getExtension("WEBGL_debug_renderer_info");
          return e?gl.getParameter(e.UNMASKED_RENDERER_WEBGL):gl.getParameter(gl.RENDERER);} catch(e){return "err";}
      });
      const outPath = `${OUT}${slug(route)}-chrome-${mode}.png`;
      await page.screenshot({ path: outPath, fullPage: true });
      console.log(`${route} ${mode} ready=${ready} gl=${glRenderer.slice(0,50)} -> ${outPath.split("/").pop()}`);
    } catch (e) { console.log(`${route} ${mode} ERR ${String(e).slice(0,80)}`); }
    await page.close();
  }
}
await browser.close();
