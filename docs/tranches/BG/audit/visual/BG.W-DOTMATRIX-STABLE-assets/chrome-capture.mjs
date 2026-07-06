// Chrome leg — settled-frame provenance capture over ?capture=/substrates/dot-matrix.
// Real Chrome.app (ANGLE Metal), connectOverCDP, polls data-capture-ready, full-page shot +
// a globe-region shot + the GL_RENDERER + glContextCount computed check.
import { chromium } from "playwright";

const ROUTE = "/substrates/dot-matrix";
const CDP = "http://localhost:9333";
const OUT = new URL(".", import.meta.url).pathname;

async function capture(ctx, mode) {
  const page = await ctx.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  const url = `http://localhost:5200/?capture=${encodeURIComponent(ROUTE)}&mode=${mode}`;
  await page.goto(url, { waitUntil: "load", timeout: 30000 });
  let ready = false;
  const t0 = Date.now();
  while (Date.now() - t0 < 15000) {
    ready = await page.evaluate(() => document.documentElement.hasAttribute("data-capture-ready"));
    if (ready) break;
    await page.waitForTimeout(150);
  }
  const elapsed = Date.now() - t0;
  const dom = await page.evaluate(() => {
    const canvases = Array.from(document.querySelectorAll("canvas"));
    const glRenderer = (() => {
      try {
        const c = document.createElement("canvas");
        const gl = c.getContext("webgl2") || c.getContext("webgl");
        if (!gl) return "no-webgl";
        const ext = gl.getExtension("WEBGL_debug_renderer_info");
        return ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER);
      } catch (e) { return "err:" + e.message; }
    })();
    const main = document.querySelector("main");
    return {
      numCanvases: canvases.length,
      canvasSizes: canvases.map((c) => { const r = c.getBoundingClientRect(); return { w: Math.round(r.width), h: Math.round(r.height) }; }),
      mainChildren: main ? main.children.length : -1,
      gpuAvail: !!navigator.gpu,
      glRenderer,
      dark: document.documentElement.classList.contains("dark"),
    };
  });
  const fullPath = `${OUT}dotmatrix-chrome-${mode}-desktop-full.png`;
  await page.screenshot({ path: fullPath, fullPage: true });
  // globe-region shot (the ~460px canvas)
  const gi = await page.evaluate(() => {
    const cs = Array.from(document.querySelectorAll("canvas"));
    const i = cs.findIndex((c) => { const r = c.getBoundingClientRect(); return Math.abs(r.height - 460) < 40 && r.width < 1300; });
    if (i < 0) return null;
    cs[i].scrollIntoView({ block: "center" });
    const r = cs[i].getBoundingClientRect();
    return { x: r.x, y: r.y, width: r.width, height: r.height };
  });
  let globePath = null;
  if (gi) {
    await page.waitForTimeout(400);
    const cs2 = await page.evaluate(() => {
      const cs = Array.from(document.querySelectorAll("canvas"));
      const i = cs.findIndex((c) => { const r = c.getBoundingClientRect(); return Math.abs(r.height - 460) < 40 && r.width < 1300; });
      const r = cs[i].getBoundingClientRect();
      return { x: r.x, y: r.y, width: r.width, height: r.height };
    });
    globePath = `${OUT}dotmatrix-chrome-${mode}-globe.png`;
    await page.screenshot({ path: globePath, clip: cs2 });
  }
  console.log(JSON.stringify({ mode, ready, elapsedMs: elapsed, ...dom, fullPath, globePath }));
  await page.close();
}

const browser = await chromium.connectOverCDP(CDP);
const c = browser.contexts()[0] || (await browser.newContext());
await capture(c, "light");
await capture(c, "dark");
await browser.close();
