// BG.W-AUR-METAL-FINISH NON-AUTHORING paint verify — Chrome CDP leg.
// Route-health captures of /substrates/aurora (both modes) + DOM probes
// (glContextCount, mainChildren, GL_RENDERER, canvases, hero rect) + a DEFINITIVE
// enumeration of the studio Medium picker options (to prove the built metal medium
// uMedium 8/9 is un-surfaced — no Metal/Brushed Metal entry in the running demo).
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { chromium } = require("playwright");

const OUT = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/BG.W-AUR-METAL-FINISH-assets";
const ROUTE = "/substrates/aurora";
const MODES = ["light", "dark"];
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
    // Enumerate the medium picker: find the [data-atom="medium"] control + its trigger text,
    // and scan the WHOLE config aside for any element whose text is exactly "Metal" / "Brushed Metal".
    const mediumCtl = document.querySelector('[data-atom="medium"]');
    const mediumTrigger = mediumCtl ? (mediumCtl.innerText || "").slice(0, 60) : null;
    const allText = (document.body.innerText || "");
    const hasMetalText = /(^|\b)Metal(\b|$)/m.test(allText);
    const hasBrushedText = /Brushed Metal/m.test(allText);
    const hasKuwaharaText = /Kuwahara/m.test(allText);
    return {
      captureReady: r.hasAttribute("data-capture-ready"),
      captureMode: r.getAttribute("data-capture-mode"),
      isDark: r.classList.contains("dark"),
      glLive: glc.live, glTypes: glc.types, glTotal: glc.total,
      mainChildren: mainKids.length,
      canvases,
      heroH1: grab("main h1") || grab("h1"),
      mediumCtlPresent: !!mediumCtl,
      mediumTrigger,
      hasMetalText, hasBrushedText, hasKuwaharaText,
      bodyTextLen: allText.replace(/\s+/g, " ").trim().length,
    };
  })();
}

const results = [];
const browser = await chromium.connectOverCDP("http://localhost:9466");

for (const mode of MODES) {
  const ctx = await browser.newContext({ viewport: { width: SIZE.w, height: SIZE.h }, deviceScaleFactor: 2, colorScheme: mode });
  await ctx.addInitScript(INIT);
  const page = await ctx.newPage();
  const url = `http://localhost:5200/?capture=${encodeURIComponent(ROUTE)}&mode=${mode}`;
  let glRenderer = null, probe = null, mediumOptions = null, err = null;
  try {
    await page.goto(url, { waitUntil: "load", timeout: 30000 });
    await page.waitForFunction(() => document.documentElement.hasAttribute("data-capture-ready"), { timeout: 25000 });
    await page.waitForTimeout(800);
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
    const png = `${OUT}/chrome-aurora-${mode}.png`;
    await page.screenshot({ path: png, clip: { x: 0, y: 0, width: SIZE.w, height: SIZE.h } });

    // ---- Attempt to OPEN the Medium picker and enumerate its options (prove Metal absent) ----
    // Only on light to avoid double work; the MEDIA record is mode-invariant.
    if (mode === "light") {
      try {
        // The medium control is a LabeledSelect (reka Select) with data-atom="medium".
        // Click its trigger to open the listbox, then read the option labels.
        const trigger = await page.$('[data-atom="medium"] [role="combobox"], [data-atom="medium"] button, [data-atom="medium"]');
        if (trigger) {
          await trigger.scrollIntoViewIfNeeded().catch(() => {});
          await trigger.click({ timeout: 3000 }).catch(() => {});
          await page.waitForTimeout(500);
          mediumOptions = await page.evaluate(() => {
            const opts = Array.from(document.querySelectorAll('[role="option"], [data-radix-collection-item], [data-reka-collection-item]'))
              .map((o) => (o.textContent || "").trim()).filter(Boolean);
            return opts;
          });
        }
      } catch (e) { mediumOptions = { err: String(e).slice(0, 200) }; }
    }
    results.push({ engine: "chrome", route: ROUTE, mode, glRenderer, png, probe, mediumOptions });
    console.error(`chrome ${mode} OK glLive=${probe.glLive}[${probe.glTypes}] canv=${probe.canvases.length} hasMetalText=${probe.hasMetalText} hasBrushed=${probe.hasBrushedText} mediumTrig="${probe.mediumTrigger}"`);
    if (mediumOptions) console.error(`  mediumOptions enumerated: ${JSON.stringify(mediumOptions)}`);
  } catch (e) {
    err = String(e).slice(0, 300);
    results.push({ engine: "chrome", route: ROUTE, mode, err });
    console.error(`chrome ${mode} FAIL ${err}`);
  }
  await ctx.close();
}

writeFileSync(`${OUT}/chrome-results.json`, JSON.stringify({ results }, null, 2));
await browser.close();
console.error("DONE chrome:", results.length, "captures");
