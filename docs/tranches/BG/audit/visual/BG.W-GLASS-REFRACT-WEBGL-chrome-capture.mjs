// BG.W-GLASS-REFRACT-WEBGL — Chrome CDP paint-judge capture over the wave's 3 routes.
// Real Chrome.app + real Metal GPU (M5 Max). connectOverCDP, navigate ?capture=<route>&mode,
// poll data-capture-ready, full-viewport screenshot, and a COMPUTED-DOM probe of:
//   - the WebGL2 refract-floor LIVE-WIRING state (is GLASS_REFRACT_FRAG imported into a
//     live path? — the FBO two-pass is DEFERRED to W-GLASS-BACKDROP-SAMPLE, so on the
//     LIVE surface the refraction register is Tier-0 CSS-SVG #glass-refract + graceful fall)
//   - .glass-lens presence + its computed backdrop-filter (the SVG-filter url or flat blur)
//   - glContextCount (one-GL-per-route budget), main.children.length
//   - the hero/CTA envelope, aurora recessiveness cue
//   - engine badge text (provenance) + GL_RENDERER
import { createRequire } from "node:module";
import { spawn } from "node:child_process";
import { writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { chromium } = require("playwright-core");

const OUT = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/BG.W-GLASS-REFRACT-WEBGL-assets";
const ROUTES = ["/substrates/glass-material", "/display/buttons", "/dock/overview"];
const MODES = ["light", "dark"];
const PORT = 9456;
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const udd = mkdtempSync(join(tmpdir(), "chrome-refract-"));

const proc = spawn(CHROME, [
  `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${udd}`,
  "--no-first-run", "--no-default-browser-check",
  "--window-size=1600,1000",
  "about:blank",
], { stdio: "ignore" });

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const slug = (r) => r.replace(/^\//, "").replace(/\//g, "_");

let browser = null;
for (let i = 0; i < 40; i++) {
  try { browser = await chromium.connectOverCDP(`http://localhost:${PORT}`); break; }
  catch { await wait(500); }
}
if (!browser) { console.error("CDP connect FAILED"); process.exit(2); }

// Record GL_RENDERER off a throwaway webgl2 ctx.
let glRenderer = "unknown";
{
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  await page.goto("about:blank");
  glRenderer = await page.evaluate(() => {
    try {
      const c = document.createElement("canvas");
      const gl = c.getContext("webgl2");
      const ext = gl.getExtension("WEBGL_debug_renderer_info");
      return ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : (gl.getParameter(gl.RENDERER) || "no-ext");
    } catch (e) { return "err:" + e.message; }
  });
  await ctx.close();
}
console.log("GL_RENDERER:", glRenderer);

const results = [];
for (const mode of MODES) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: mode });
  for (const route of ROUTES) {
    const page = await ctx.newPage();
    const url = `http://localhost:5200/?capture=${encodeURIComponent(route)}&mode=${mode}`;
    let probe = null, err = null;
    try {
      await page.goto(url, { waitUntil: "load", timeout: 30000 });
      await page.waitForFunction(() => document.documentElement.hasAttribute("data-capture-ready"), { timeout: 25000 });
      await page.waitForTimeout(700);
      probe = await page.evaluate(() => {
        const r = document.documentElement;
        const main = document.querySelector("main");
        const badgeEl = document.querySelector("[data-capture-badge]");
        // GL context count (one-GL-per-route budget)
        const canvases = Array.from(document.querySelectorAll("canvas"));
        let glContextCount = 0;
        for (const c of canvases) {
          // heuristic: a canvas with width>1 that is likely a GL surface
          const cs = getComputedStyle(c);
          if (c.width > 1 && c.height > 1) glContextCount++;
        }
        // .glass-lens presence + computed backdrop-filter (the Tier-0 SVG lens or flat fall)
        const lensEls = Array.from(document.querySelectorAll(".glass-lens"));
        const lensProbe = lensEls.slice(0, 3).map((el) => {
          const cs = getComputedStyle(el);
          return {
            cls: (el.className || "").toString().slice(0, 100),
            backdropFilter: (cs.backdropFilter || cs.webkitBackdropFilter || "").slice(0, 160),
          };
        });
        // Any element with backdrop-filter referencing url(#glass-refract) (the SVG lens live)
        const allEls = Array.from(document.querySelectorAll("*"));
        let refractUrlCount = 0, blurOnlyGlassCount = 0, glassMaterialCount = 0;
        for (const el of allEls) {
          const cs = getComputedStyle(el);
          const bf = (cs.backdropFilter || cs.webkitBackdropFilter || "");
          if (bf.includes("glass-refract") || bf.includes("url(")) refractUrlCount++;
          if ((el.className || "").toString().includes("glass-material")) glassMaterialCount++;
        }
        // Hero / primary CTA envelope — first primary-audacious or gold button on /display/buttons,
        // else the hero h1 bounding on other routes.
        const cta = document.querySelector(".btn-glass, [class*=primary-audacious], [class*=gold-audacious]");
        let ctaBox = null;
        if (cta) {
          const b = cta.getBoundingClientRect();
          const ccs = getComputedStyle(cta);
          ctaBox = { w: Math.round(b.width), h: Math.round(b.height), top: Math.round(b.top), left: Math.round(b.left),
            overflowsViewport: b.right > window.innerWidth + 2 || b.bottom > window.innerHeight + 200,
            bdf: (ccs.backdropFilter || ccs.webkitBackdropFilter || "").slice(0, 120) };
        }
        // Dock plate probe (dock route)
        const dock = document.querySelector(".glass-dock");
        let dockBox = null;
        if (dock) {
          const b = dock.getBoundingClientRect();
          const dcs = getComputedStyle(dock);
          dockBox = { w: Math.round(b.width), h: Math.round(b.height),
            bdf: (dcs.backdropFilter || dcs.webkitBackdropFilter || "").slice(0, 120),
            bg: dcs.backgroundColor };
        }
        return {
          badge: badgeEl ? (badgeEl.textContent || "").trim().slice(0, 120) : null,
          mainChildren: main ? main.children.length : -1,
          canvasCount: canvases.length,
          glContextCount,
          lensCount: lensEls.length,
          lensProbe,
          refractUrlCount,
          glassMaterialCount,
          ctaBox,
          dockBox,
          innerW: window.innerWidth, innerH: window.innerHeight,
          docScrollH: document.documentElement.scrollHeight,
        };
      });
    } catch (e) { err = e.message; }
    const file = join(OUT, `chrome_${slug(route)}_${mode}.png`);
    try { await page.screenshot({ path: file, fullPage: false }); } catch (e) { err = (err || "") + " shot:" + e.message; }
    results.push({ engine: "chrome", glRenderer, route, mode, file, probe, err });
    console.log(`chrome ${route} ${mode}: ${err ? "ERR " + err : "ok"} | lens=${probe?.lensCount} refractUrl=${probe?.refractUrlCount} gl=${probe?.glContextCount} mainCh=${probe?.mainChildren}`);
    await page.close();
  }
  await ctx.close();
}

writeFileSync(join(OUT, "chrome-probes.json"), JSON.stringify(results, null, 2));
await browser.close();
proc.kill("SIGKILL");
console.log("DONE chrome capture");
