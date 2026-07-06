import { chromium } from "playwright";
const ROUTE = "/substrates/blob";
const CDP = process.env.CDP_URL || "http://localhost:9334";
const PORT = process.env.PORT || "5201";
const OUT = new URL(".", import.meta.url).pathname;
async function capture(ctx, mode) {
  const page = await ctx.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  const url = `http://localhost:${PORT}/?capture=${encodeURIComponent(ROUTE)}&mode=${mode}`;
  await page.goto(url, { waitUntil: "load", timeout: 30000 });
  let ready = false; const t0 = Date.now();
  while (Date.now() - t0 < 15000) {
    ready = await page.evaluate(() => document.documentElement.hasAttribute("data-capture-ready"));
    if (ready) break; await page.waitForTimeout(150);
  }
  const glRenderer = await page.evaluate(() => { try { const c=document.createElement("canvas"); const gl=c.getContext("webgl2")||c.getContext("webgl"); if(!gl) return "no-webgl"; const ext=gl.getExtension("WEBGL_debug_renderer_info"); return ext?gl.getParameter(ext.UNMASKED_RENDERER_WEBGL):gl.getParameter(gl.RENDERER);}catch(e){return "err:"+e.message;} });
  const outPath = `${OUT}blob-chrome-${mode}-desktop-full.png`;
  await page.screenshot({ path: outPath, fullPage: true });
  console.log(JSON.stringify({ mode, ready, elapsedMs: Date.now()-t0, glRenderer, outPath }));
  await page.close();
}
const browser = await chromium.connectOverCDP(CDP);
const ctx = browser.contexts()[0] || (await browser.newContext());
await capture(ctx, "light");
await capture(ctx, "dark");
await browser.close();
