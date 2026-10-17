#!/usr/bin/env node
// H6-arm.mjs · D3 pass 6, H6-0: which arm the aurora paints when the harness launches Chromium as the headless shell
// with no GPU arguments (lib.mjs CHROMIUM_ARGS), recorded once. Observation only: the browser's version and user agent;
// navigator.gpu and its adapter (requestAdapter, no canvas context); WebGL2 on a fresh, detached canvas in a blank page
// (never the live field canvas, which getContext() would steal); then the specimen page's Aurora read by DOM attributes
// only (data-aurora-substrate, data-aurora-settled, the armed class on .aurora-canvas). One browser per engine, a fresh
// context per read; every page, context and browser closed in a finally.
//   node H6-arm.mjs <dist> [--engines chromium,webkit] [--out arm.json]
import fs from "node:fs";
import path from "node:path";
import { playwright, serve, cli, list, VIEW, CHROMIUM_ARGS, holdWebkitLock } from "../harness/lib.mjs";

const a = cli({ engines: { type: "string" }, out: { type: "string" } });
const dist = path.resolve(a._[0]), pw = await playwright(), server = await serve(dist), out = {};
try {
  for (const engine of list(a.engines, ["chromium"])) {
    if (engine === "webkit") await holdWebkitLock();
    const browser = await pw[engine].launch({ headless: true, args: engine === "chromium" ? CHROMIUM_ARGS : [] });
    const rec = (out[engine] = { args: engine === "chromium" ? CHROMIUM_ARGS : [], version: browser.version(), executable: pw[engine].executablePath() });
    try {
      let ctx = await browser.newContext({ viewport: VIEW });
      try {
        const page = await ctx.newPage();
        await page.goto("about:blank");
        Object.assign(rec, await page.evaluate(async () => {
          const r = { ua: navigator.userAgent, gpu: !!navigator.gpu, adapter: null, webgl2: null };
          if (navigator.gpu) { const ad = await navigator.gpu.requestAdapter().catch(() => null); r.adapter = ad ? { fallback: !!ad.isFallbackAdapter, info: ad.info ? { vendor: ad.info.vendor, architecture: ad.info.architecture, description: ad.info.description } : null } : null; }
          const gl = document.createElement("canvas").getContext("webgl2");
          if (gl) { const d = gl.getExtension("WEBGL_debug_renderer_info"); r.webgl2 = String(d ? gl.getParameter(d.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER)); } else r.webgl2 = false;
          return r;
        }));
      } finally { await ctx.close().catch(() => {}); }
      rec.aurora = {};
      for (const theme of ["light", "dark"]) {
        ctx = await browser.newContext({ viewport: VIEW, deviceScaleFactor: 1, colorScheme: theme, reducedMotion: "reduce" });
        try {
          const page = await ctx.newPage();
          await page.goto(`${server.url}index.html?scene=empty&ground=aurora&theme=${theme}${engine === "webkit" ? "&nodock=1" : ""}`, { waitUntil: "load", timeout: 120000 });
          await page.waitForTimeout(7000);
          rec.aurora[theme] = await page.evaluate(() => [...document.querySelectorAll("[data-aurora-substrate]")].map((el) => {
            const c = el.querySelector("canvas.aurora-canvas");
            return { substrate: el.getAttribute("data-aurora-substrate"), settled: el.hasAttribute("data-aurora-settled"), canvas: !!c, armed: !!c?.classList.contains("aurora-canvas--armed"), canvasOpacity: c ? getComputedStyle(c).opacity : null };
          }));
        } finally { await ctx.close().catch(() => {}); }
      }
    } finally { await browser.close().catch(() => {}); }
    console.log(`${engine}: ${JSON.stringify(rec)}`);
  }
} finally { server.close(); }
if (a.out) fs.writeFileSync(path.resolve(a.out), JSON.stringify(out, null, 1));
