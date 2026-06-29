// BG.W-FIELD-AURORA NON-AUTHORING paint verify — Chrome CDP leg.
// 4 routes x 2 modes: screenshot + DOM probes (glContextCount live, getAnimations,
// animationTimeline, main.children, GL_RENDERER, text computed colors+rects) + round-trip.
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { chromium } = require("playwright");

const OUT = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/BG.W-FIELD-AURORA-paint";
const ROUTES = ["/foundations/colors", "/foundations/intro", "/substrates/aurora", "/dock/overview"];
const MODES = ["light", "dark"];
const SIZE = { w: 1440, h: 900 };

// Init script: wrap getContext to track live, DOM-connected GL/GPU contexts (one per canvas).
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
  // runs in page; returns the full DOM-truth probe object
  return (() => {
    const r = document.documentElement;
    const main = document.querySelector("main");
    const glc = (window.__glContextCount && window.__glContextCount()) || { live: -1, types: [], total: -1 };
    // route roots: direct element children of <main> that are the routed view
    const mainKids = main ? Array.from(main.children) : [];
    // sample text elements
    const grab = (sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const cs = getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return {
        sel,
        text: (el.innerText || "").slice(0, 60),
        color: cs.color,
        fontSize: cs.fontSize,
        fontWeight: cs.fontWeight,
        rect: { x: Math.round(rect.x), y: Math.round(rect.y), w: Math.round(rect.width), h: Math.round(rect.height) },
      };
    };
    // canvases inventory
    const canvases = Array.from(document.querySelectorAll("canvas")).map((c) => {
      const rect = c.getBoundingClientRect();
      return {
        connected: c.isConnected,
        w: Math.round(rect.width),
        h: Math.round(rect.height),
        fieldCanvas: c.getAttribute("data-glass-field-canvas"),
        parentClass: (c.parentElement && c.parentElement.className && c.parentElement.className.toString().slice(0, 60)) || "",
      };
    });
    // animations on the route root (the .route-enter entrance)
    let routeAnims = -1, routeRootClass = "";
    if (main && main.children[0]) {
      const root0 = main.children[0];
      routeRootClass = (root0.className && root0.className.toString().slice(0, 80)) || "";
      try { routeAnims = root0.getAnimations({ subtree: false }).length; } catch (e) { routeAnims = -2; }
    }
    const docAnims = (document.getAnimations ? document.getAnimations().length : -1);
    // hero h1 candidate — first big heading inside main
    const heroH1 = grab("main h1") || grab("h1");
    // eyebrow / mono caption
    const eyebrow = grab(".section-label") || grab("[class*=eyebrow]") || grab(".story-eyebrow");
    // muted blurb
    const muted = grab(".text-muted-foreground") || grab("[class*=muted]");
    // card title
    const cardTitle = grab("[data-slot=card-title]") || grab(".card-title");
    return {
      captureReady: r.hasAttribute("data-capture-ready"),
      captureMode: r.getAttribute("data-capture-mode"),
      isDark: r.classList.contains("dark"),
      glLive: glc.live,
      glTypes: glc.types,
      glTotal: glc.total,
      mainChildren: mainKids.length,
      mainChildTags: mainKids.map((k) => k.tagName.toLowerCase() + (k.className ? "." + k.className.toString().split(" ")[0] : "")).slice(0, 6),
      routeRootClass,
      routeAnims,
      docAnims,
      canvases,
      heroH1,
      eyebrow,
      muted,
      cardTitle,
      bodyTextLen: (document.body.innerText || "").replace(/\s+/g, " ").trim().length,
    };
  })();
}

const results = [];
const browser = await chromium.connectOverCDP("http://localhost:9456");

for (const mode of MODES) {
  for (const route of ROUTES) {
    const ctx = await browser.newContext({
      viewport: { width: SIZE.w, height: SIZE.h },
      deviceScaleFactor: 2,
      colorScheme: mode,
    });
    await ctx.addInitScript(INIT);
    const page = await ctx.newPage();
    const url = `http://localhost:5200/?capture=${encodeURIComponent(route)}&mode=${mode}`;
    let glRenderer = null, probe = null, err = null;
    try {
      await page.goto(url, { waitUntil: "load", timeout: 30000 });
      await page.waitForFunction(() => document.documentElement.hasAttribute("data-capture-ready"), { timeout: 25000 });
      await page.waitForTimeout(700); // let the field paint a couple frames
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
      console.error(`chrome ${mode} ${route} OK glLive=${probe.glLive}[${probe.glTypes}] mainKids=${probe.mainChildren} routeAnims=${probe.routeAnims} txt=${probe.bodyTextLen}`);
    } catch (e) {
      err = String(e).slice(0, 300);
      results.push({ engine: "chrome", route, mode, err });
      console.error(`chrome ${mode} ${route} FAIL ${err}`);
    }
    await ctx.close();
  }
}

// ---- Round-trip: content -> focal(substrate) -> dock -> content via LIVE router (SPA, no reload) ----
let roundtrip = null;
try {
  const ctx = await browser.newContext({ viewport: { width: SIZE.w, height: SIZE.h }, deviceScaleFactor: 2, colorScheme: "light" });
  await ctx.addInitScript(INIT);
  const page = await ctx.newPage();
  await page.goto(`http://localhost:5200/?capture=${encodeURIComponent("/foundations/colors")}&mode=light`, { waitUntil: "load", timeout: 30000 });
  await page.waitForFunction(() => document.documentElement.hasAttribute("data-capture-ready"), { timeout: 25000 });
  const seq = ["/foundations/colors", "/substrates/aurora", "/dock/overview", "/foundations/colors"];
  const steps = [];
  for (const r of seq) {
    await page.evaluate((path) => { history.pushState({}, "", path); window.dispatchEvent(new PopStateEvent("popstate")); }, r);
    await page.waitForTimeout(1100);
    const s = await page.evaluate(() => {
      const glc = window.__glContextCount();
      const main = document.querySelector("main");
      return { path: location.pathname, glLive: glc.live, glTypes: glc.types, mainChildren: main ? main.children.length : -1 };
    });
    steps.push(s);
    console.error(`roundtrip ${r} -> path=${s.path} glLive=${s.glLive}[${s.glTypes}]`);
  }
  roundtrip = steps;
  await ctx.close();
} catch (e) {
  roundtrip = { err: String(e).slice(0, 300) };
  console.error("roundtrip FAIL", roundtrip.err);
}

writeFileSync(`${OUT}/chrome-results.json`, JSON.stringify({ results, roundtrip }, null, 2));
await browser.close();
console.error("DONE chrome:", results.length, "captures; roundtrip", Array.isArray(roundtrip) ? "ok" : "ERR");
