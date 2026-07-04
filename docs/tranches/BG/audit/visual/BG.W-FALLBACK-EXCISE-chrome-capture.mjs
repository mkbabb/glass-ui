// BG.W-FALLBACK-EXCISE — Chrome CDP paint-judge capture over the dock morph routes.
// Real Chrome.app + real Metal GPU. Launches Chrome with remote-debugging-port,
// connectOverCDP, navigates each ?capture=<route>&mode=<mode>, polls data-capture-ready,
// full-viewport screenshot, and records a COMPUTED-DOM fail-VISIBLE probe:
//   - --dock-expand-t / --dock-morph-t / --dock-morph-scale resolve to real numbers (not masked)
//   - the .glass-dock paints a plausibly-expanded glass plate (bg not transparent, real box)
//   - getAnimations() present on the dock, main.children.length, canvas/GL context count
//   - the morph FRAME-SERIES: hover→expand then leave→collapse, sampling the live scalar/box
//   - engine badge text (provenance).
import { createRequire } from "node:module";
import { spawn } from "node:child_process";
import { writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { chromium } = require("playwright");

const OUT = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/BG.W-FALLBACK-EXCISE-paint";
const ROUTES = ["/dock/overview", "/dock/morph-showcase", "/dock/layers"];
const MODES = ["light", "dark"];
const PORT = 9477;
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const udd = "/Users/mkbabb/Programming/glass-ui/.chrome-profile";

const proc = spawn(CHROME, [
  `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${udd}`,
  "--headless=new",
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

const PROBE = () => {
  const r = document.documentElement;
  const main = document.querySelector("main");
  const cs = getComputedStyle(r);
  const badgeText = (document.querySelector("[data-capture-badge]")?.innerText || "").replace(/\s+/g, " ").trim();
  const glRenderer = (window.__glRenderer || "") + "";
  const canvasCount = document.querySelectorAll("canvas").length;
  // Every .glass-dock on the route: box + bg + the morph scalars it reads.
  const docks = [...document.querySelectorAll(".glass-dock")].map((d, i) => {
    const b = d.getBoundingClientRect();
    const dcs = getComputedStyle(d);
    return {
      i,
      cls: (d.className || "").toString().slice(0, 120),
      w: Math.round(b.width), h: Math.round(b.height),
      bg: dcs.backgroundColor,
      backdrop: (dcs.backdropFilter || dcs.webkitBackdropFilter || "").slice(0, 60),
      opacity: dcs.opacity,
      visibility: dcs.visibility,
      // the morph scalars — must resolve to a REAL number (never empty = masked-away)
      expandT: dcs.getPropertyValue("--dock-expand-t").trim(),
      morphT: dcs.getPropertyValue("--dock-morph-t").trim(),
      morphScale: dcs.getPropertyValue("--dock-morph-scale").trim(),
      dockScale: dcs.getPropertyValue("--dock-scale").trim(),
      transform: dcs.transform.slice(0, 60),
      morphing: d.hasAttribute("data-morphing"),
      anims: (d.getAnimations ? d.getAnimations({ subtree: true }).length : -1),
    };
  });
  return {
    route: r.getAttribute("data-capture-route"),
    captureReady: r.hasAttribute("data-capture-ready"),
    mode: r.getAttribute("data-capture-mode") || (r.classList.contains("dark") ? "dark" : "light"),
    badgeText,
    glRenderer,
    canvasCount,
    mainChildren: main ? main.children.length : -1,
    dockCount: docks.length,
    docks,
  };
};

const results = [];
for (const mode of MODES) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: mode });
  for (const route of ROUTES) {
    const page = await ctx.newPage();
    await page.addInitScript(() => {
      try {
        const c = document.createElement("canvas");
        const gl = c.getContext("webgl2") || c.getContext("webgl");
        if (gl) {
          const ext = gl.getExtension("WEBGL_debug_renderer_info");
          window.__glRenderer = ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER);
        }
      } catch (e) { window.__glRenderer = "ERR " + e; }
    });
    const url = `http://localhost:5200/?capture=${encodeURIComponent(route)}&mode=${mode}`;
    let probe = null, frameSeries = null, err = null;
    try {
      let gotoOk = false;
      for (let attempt = 0; attempt < 4 && !gotoOk; attempt++) {
        try { await page.goto(url, { waitUntil: "load", timeout: 30000 }); gotoOk = true; }
        catch (ge) { if (attempt === 3) throw ge; await wait(800); }
      }
      await page.waitForFunction(() => document.documentElement.hasAttribute("data-capture-ready"), { timeout: 25000 });
      await page.waitForTimeout(700);
      probe = await page.evaluate(PROBE);
      // Frame-series: drive the collapse/expand morph on /dock/overview and sample the live scalar.
      if (route === "/dock/overview") {
        frameSeries = await page.evaluate(async () => {
          const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
          const dock = document.querySelector(".glass-dock");
          if (!dock) return { err: "no dock" };
          const sample = (label) => {
            const dcs = getComputedStyle(dock);
            const b = dock.getBoundingClientRect();
            return {
              label,
              w: Math.round(b.width), h: Math.round(b.height),
              expandT: dcs.getPropertyValue("--dock-expand-t").trim(),
              morphScale: dcs.getPropertyValue("--dock-morph-scale").trim(),
              transform: dcs.transform.slice(0, 40),
              morphing: dock.hasAttribute("data-morphing"),
              collapsed: dock.classList.contains("collapsed"),
            };
          };
          const series = [sample("rest")];
          // hover to expand
          dock.dispatchEvent(new PointerEvent("pointerenter", { bubbles: true }));
          dock.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true }));
          for (let k = 0; k < 8; k++) { await sleep(45); series.push(sample("expand+" + (k * 45) + "ms")); }
          // leave to collapse
          dock.dispatchEvent(new PointerEvent("pointerleave", { bubbles: true }));
          dock.dispatchEvent(new MouseEvent("mouseleave", { bubbles: true }));
          for (let k = 0; k < 8; k++) { await sleep(45); series.push(sample("collapse+" + (k * 45) + "ms")); }
          return series;
        });
      }
      const png = join(OUT, `fallback-excise-${slug(route)}-chrome-${mode}.png`);
      await page.screenshot({ path: png, fullPage: false });
    } catch (e) { err = String(e).slice(0, 200); }
    results.push({ route, mode, err, probe, frameSeries });
    console.log(`[chrome] ${mode} ${route} :: ${err ? "ERR " + err : "ok dockCount=" + (probe?.dockCount) + " canvas=" + (probe?.canvasCount) + " main=" + (probe?.mainChildren)}`);
    await page.close();
  }
  await ctx.close();
}

writeFileSync(join(OUT, "chrome-probe.json"), JSON.stringify(results, null, 2));
await browser.close();
try { proc.kill("SIGKILL"); } catch {}
console.log("CHROME DONE");
process.exit(0);
