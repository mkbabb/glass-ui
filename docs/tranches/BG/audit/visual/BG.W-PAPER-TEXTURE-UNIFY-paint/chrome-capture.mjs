// BG.W-PAPER-TEXTURE-UNIFY NON-AUTHORING paint verify — Chrome CDP (Metal) leg.
// 4 routes x 2 modes: screenshot + paper-specific DOM probes:
//   - the warm tooth is painted (paper-underpaint / paper-grain-overlay elements)
//   - --paper-grain-tooth resolves to the warm oklch weave (computed)
//   - the demoted feTurbulence relief is @supports-gated (--paper-grain-relief)
//   - opacity + mix-blend-mode of the tooth layers
//   - glContextCount live (recessive aurora / one-GL-per-route budget)
//   - main.children.length + getAnimations (the .paper-grid-breathe SPEEDTEST clause)
//   - GL_RENDERER (Metal provenance)
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { chromium } = require("playwright");

const OUT = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/BG.W-PAPER-TEXTURE-UNIFY-paint";
const ROUTES = ["/foundations/paper-glass", "/foundations/paper-texture", "/substrates/paper-grid", "/compositions/math-paper"];
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

    // Resolve the ONE warm tooth token off :root
    const rootCS = getComputedStyle(document.documentElement);
    const toothToken = rootCS.getPropertyValue("--paper-grain-tooth").trim().slice(0, 400);
    const reliefToken = rootCS.getPropertyValue("--paper-grain-relief").trim().slice(0, 120);
    const glassGrainOpacity = rootCS.getPropertyValue("--glass-grain-opacity").trim();

    // Find any element carrying the paper tooth (underpaint plane or grain overlay)
    const toothEls = [];
    for (const el of document.querySelectorAll("*")) {
      const cs = getComputedStyle(el);
      const bi = cs.backgroundImage || "";
      const hasTooth = /oklch\(/i.test(bi) && /repeating-linear-gradient/i.test(bi);
      if (hasTooth) {
        const rect = el.getBoundingClientRect();
        toothEls.push({
          tag: el.tagName.toLowerCase(),
          cls: (el.className && el.className.toString().slice(0, 50)) || "",
          blend: cs.mixBlendMode,
          opacity: cs.opacity,
          layers: (bi.match(/repeating-linear-gradient/gi) || []).length,
          hasTurb: /feTurbulence|data:image\/svg/i.test(bi),
          w: Math.round(rect.width), h: Math.round(rect.height),
        });
      }
      // grain overlay ::after
      const csA = getComputedStyle(el, "::after");
      const biA = csA.backgroundImage || "";
      if (/oklch\(/i.test(biA) && /repeating-linear-gradient/i.test(biA)) {
        toothEls.push({
          tag: el.tagName.toLowerCase() + "::after",
          cls: (el.className && el.className.toString().slice(0, 50)) || "",
          blend: csA.mixBlendMode,
          opacity: csA.opacity,
          layers: (biA.match(/repeating-linear-gradient/gi) || []).length,
          hasTurb: /feTurbulence|data:image\/svg/i.test(biA),
        });
      }
    }

    // paper-grid utility present? (the geometric grid register)
    const gridEls = Array.from(document.querySelectorAll(".paper-grid")).map((el) => {
      const cs = getComputedStyle(el);
      return { cls: el.className.toString().slice(0, 60), blend: cs.backgroundBlendMode, hasImg: /url|gradient/i.test(cs.backgroundImage) };
    });

    // .paper-grid-breathe SPEEDTEST clause — the opt-in animated register
    const breatheEls = Array.from(document.querySelectorAll(".paper-grid-breathe"));
    let breatheAnims = -1, breatheTimeline = null;
    if (breatheEls[0]) {
      try { breatheAnims = breatheEls[0].getAnimations({ subtree: false }).length; } catch (e) { breatheAnims = -2; }
      const cs = getComputedStyle(breatheEls[0]);
      breatheTimeline = cs.animationTimeline || cs.getPropertyValue("animation-timeline");
    }
    // is .paper-grid-breathe DEFINED anywhere in the stylesheets?
    let breatheRuleDefined = false;
    try {
      for (const ss of document.styleSheets) {
        let rules; try { rules = ss.cssRules; } catch (e) { continue; }
        if (!rules) continue;
        for (const rule of rules) {
          if (rule.selectorText && /paper-grid-breathe/.test(rule.selectorText)) breatheRuleDefined = true;
          if (rule.cssText && /paper-grid-breathe/.test(rule.cssText)) breatheRuleDefined = true;
        }
      }
    } catch (e) {}

    const docAnims = (document.getAnimations ? document.getAnimations().length : -1);

    const grab = (sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const cs = getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return { sel, text: (el.innerText || "").slice(0, 50), color: cs.color, fontSize: cs.fontSize, rect: { x: Math.round(rect.x), y: Math.round(rect.y), w: Math.round(rect.width), h: Math.round(rect.height) } };
    };
    const heroH1 = grab("main h1") || grab("h1");

    return {
      captureReady: r.hasAttribute("data-capture-ready"),
      isDark: r.classList.contains("dark"),
      glLive: glc.live, glTypes: glc.types, glTotal: glc.total,
      mainChildren: mainKids.length,
      toothToken, reliefToken, glassGrainOpacity,
      toothEls: toothEls.slice(0, 8),
      toothElCount: toothEls.length,
      gridEls, breatheElCount: breatheEls.length, breatheAnims, breatheTimeline, breatheRuleDefined,
      docAnims,
      heroH1,
      bodyTextLen: (document.body.innerText || "").replace(/\s+/g, " ").trim().length,
    };
  })();
}

const results = [];
const browser = await chromium.connectOverCDP("http://localhost:9477");

for (const mode of MODES) {
  for (const route of ROUTES) {
    const ctx = await browser.newContext({ viewport: { width: SIZE.w, height: SIZE.h }, deviceScaleFactor: 2, colorScheme: mode });
    await ctx.addInitScript(INIT);
    const page = await ctx.newPage();
    const url = `http://localhost:5200/?capture=${encodeURIComponent(route)}&mode=${mode}`;
    let glRenderer = null, probe = null, err = null;
    try {
      await page.goto(url, { waitUntil: "load", timeout: 30000 });
      await page.waitForFunction(() => document.documentElement.hasAttribute("data-capture-ready"), { timeout: 25000 });
      await page.waitForTimeout(900);
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
      const tag = route.replace(/\//g, "_").replace(/^_/, "");
      const png = `${OUT}/chrome-${tag}-${mode}.png`;
      await page.screenshot({ path: png, clip: { x: 0, y: 0, width: SIZE.w, height: SIZE.h } });
      results.push({ engine: "chrome", route, mode, glRenderer, png, probe });
      console.error(`chrome ${mode} ${route} OK glLive=${probe.glLive}[${probe.glTypes}] toothEls=${probe.toothElCount} breatheDefined=${probe.breatheRuleDefined} txt=${probe.bodyTextLen}`);
    } catch (e) {
      err = String(e).slice(0, 300);
      results.push({ engine: "chrome", route, mode, err });
      console.error(`chrome ${mode} ${route} FAIL ${err}`);
    }
    await ctx.close();
  }
}

writeFileSync(`${OUT}/chrome-results.json`, JSON.stringify({ glRendererSample: results.find(r => r.glRenderer)?.glRenderer, results }, null, 2));
await browser.close();
console.error("DONE chrome:", results.length, "captures");
