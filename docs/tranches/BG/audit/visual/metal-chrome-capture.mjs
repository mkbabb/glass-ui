// BG.W-AUR-METAL-FINISH RE-CAPTURE (metal medium surfaced) — Chrome CDP leg.
// Captures /substrates/aurora forced onto uMedium 8 (metal) + uMedium 9 (metal-gradient)
// via the &aurmedium= deterministic capture param, BOTH modes. Probes DOM
// (glContextCount, GL_RENDERER, canvases, hero rect, applied medium) so the judge can
// confirm the METAL medium actually rendered (not the smooth default).
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { chromium } = require("playwright");

const OUT = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/BG.W-AUR-METAL-FINISH-assets";
const ROUTE = "/substrates/aurora";
const MODES = ["light", "dark"];
const MEDIA = ["metal", "metal-gradient"];
const SIZE = { w: 1440, h: 900 };

const INIT = `
(() => {
  if (window.__glReg) return;
  window.__glReg = [];
  const orig = HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext = function (type, ...rest) {
    const ctx = orig.call(this, type, ...rest);
    if (ctx && /webgl|webgl2|webgpu/.test(type)) {
      const exist = window.__glReg.find((e) => e.canvas === this);
      if (!exist) window.__glReg.push({ canvas: this, type });
    }
    return ctx;
  };
  window.__glContextCount = () => {
    const live = window.__glReg.filter((e) => e.canvas && e.canvas.isConnected);
    return { live: live.length, types: live.map((e) => e.type), total: window.__glReg.length };
  };
})();
`;

function probeJs() {
  return (() => {
    const r = document.documentElement;
    const main = document.querySelector("main");
    const glc = (window.__glContextCount && window.__glContextCount()) || { live: -1, types: [], total: -1 };
    const mainKids = main ? Array.from(main.children) : [];
    const grab = (sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const cs = getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return { sel, text: (el.innerText || "").slice(0, 40), color: cs.color, fontSize: cs.fontSize,
        rect: { x: Math.round(rect.x), y: Math.round(rect.y), w: Math.round(rect.width), h: Math.round(rect.height) } };
    };
    const canvases = Array.from(document.querySelectorAll("canvas")).map((c) => {
      const rect = c.getBoundingClientRect();
      return { connected: c.isConnected, w: Math.round(rect.width), h: Math.round(rect.height),
        parentClass: (c.parentElement && c.parentElement.className && c.parentElement.className.toString().slice(0, 50)) || "" };
    });
    // The Medium picker trigger reads the applied medium label ("Metal"/"Brushed Metal").
    const mediumCtl = document.querySelector('[data-atom="medium"]');
    const mediumTrigger = mediumCtl ? (mediumCtl.innerText || "").replace(/\s+/g, " ").trim().slice(0, 80) : null;
    return {
      captureReady: r.hasAttribute("data-capture-ready"),
      captureMode: r.getAttribute("data-capture-mode"),
      isDark: r.classList.contains("dark"),
      glLive: glc.live, glTypes: glc.types, glTotal: glc.total,
      mainChildren: mainKids.length,
      canvasCount: canvases.length,
      canvases,
      heroH1: grab("main h1") || grab("h1"),
      mediumCtlPresent: !!mediumCtl,
      mediumTrigger,
      bodyTextLen: (document.body.innerText || "").replace(/\s+/g, " ").trim().length,
    };
  })();
}

const results = [];
const browser = await chromium.connectOverCDP("http://localhost:9477");

for (const medium of MEDIA) {
  for (const mode of MODES) {
    const ctx = await browser.newContext({ viewport: { width: SIZE.w, height: SIZE.h }, deviceScaleFactor: 2, colorScheme: mode });
    await ctx.addInitScript(INIT);
    const page = await ctx.newPage();
    const url = `http://localhost:5200/?capture=${encodeURIComponent(ROUTE)}&mode=${mode}&aurmedium=${medium}`;
    let glRenderer = null, probe = null, err = null;
    try {
      await page.goto(url, { waitUntil: "load", timeout: 30000 });
      await page.waitForFunction(() => document.documentElement.hasAttribute("data-capture-ready"), { timeout: 25000 });
      await page.waitForTimeout(1200);
      glRenderer = await page.evaluate(() => {
        try {
          const c = document.createElement("canvas");
          const gl = c.getContext("webgl2") || c.getContext("webgl");
          if (!gl) return "no-webgl";
          const dbg = gl.getExtension("WEBGL_debug_renderer_info");
          return dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : "no-debug-ext";
        } catch (e) { return "err:" + e.message; }
      });
      probe = await page.evaluate(probeJs);
      const png = `${OUT}/chrome-${medium}-${mode}.png`;
      await page.screenshot({ path: png, clip: { x: 0, y: 0, width: SIZE.w, height: SIZE.h } });
      results.push({ engine: "chrome", route: ROUTE, medium, mode, glRenderer, png, probe });
      console.error(`chrome ${medium}/${mode} OK glLive=${probe.glLive}[${probe.glTypes}] canv=${probe.canvasCount} mediumTrig="${probe.mediumTrigger}" gpu="${glRenderer}"`);
    } catch (e) {
      err = String(e).slice(0, 300);
      results.push({ engine: "chrome", route: ROUTE, medium, mode, err });
      console.error(`chrome ${medium}/${mode} FAIL ${err}`);
    }
    await ctx.close();
  }
}

writeFileSync(`${OUT}/chrome-metal-results.json`, JSON.stringify({ results }, null, 2));
await browser.close();
console.error("DONE chrome metal:", results.length, "captures");
