// BG.W-DESHADCN — Chrome CDP paint-judge capture over the /forms band + /feedback/toast.
// Real Chrome.app + real Metal GPU. Launches Chrome with remote-debugging-port,
// connectOverCDP, navigates each ?capture=<route>&mode=<mode>, polls data-capture-ready,
// full-viewport screenshot, and records a COMPUTED-DOM six-state probe:
//   - focus ring resolves --focus-ring-color (getComputedStyle on :root + a focused control)
//   - the six-state control-surface matrix (rest/hover/active/focus/disabled/invalid CSS present)
//   - engine badge text (provenance), main.children.length, canvas count.
import { createRequire } from "node:module";
import { spawn } from "node:child_process";
import { writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { chromium } = require("playwright");

const OUT = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/BG.W-DESHADCN-assets";
const ROUTES = [
  "/forms/inputs", "/forms/textarea", "/forms/checks", "/forms/slider",
  "/forms/number-field", "/forms/select", "/forms/combobox", "/forms/multi-select",
  "/forms/toggle", "/forms/toggle-chip", "/forms/selectable-chip", "/forms/label",
  "/feedback/toast",
];
const MODES = ["light", "dark"];
const PORT = 9479;
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const udd = mkdtempSync(join(tmpdir(), "chrome-deshadcn-"));

const proc = spawn(CHROME, [
  `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${udd}`,
  "--no-first-run", "--no-default-browser-check",
  "--window-size=1600,1000",
  "http://localhost:5200/",
], { stdio: "ignore" });

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const slug = (r) => r.replace(/^\//, "").replace(/\//g, "_");

let browser = null;
for (let i = 0; i < 40; i++) {
  try { browser = await chromium.connectOverCDP(`http://localhost:${PORT}`); break; }
  catch { await wait(500); }
}
if (!browser) { console.error("CDP connect FAILED"); process.exit(2); }

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
      await page.waitForTimeout(500);
      probe = await page.evaluate(() => {
        const r = document.documentElement;
        const main = document.querySelector("main");
        const bodyText = (document.body.innerText || "").replace(/\s+/g, " ").trim();
        const badgeEl = document.querySelector("[data-capture-badge]");
        const cs = getComputedStyle(r);
        const focusRingColor = cs.getPropertyValue("--focus-ring-color").trim();
        const legacyRing = cs.getPropertyValue("--ring").trim();
        // Try to find the FIRST focusable form control + read its focus box-shadow after focusing.
        let focusProbe = null;
        const focusable = document.querySelector(
          "input:not([type=hidden]):not([disabled]), textarea:not([disabled]), [role=slider], button:not([disabled]), [role=combobox], [role=checkbox], [role=switch], [role=radio]"
        );
        if (focusable) {
          try {
            focusable.focus();
            const fcs = getComputedStyle(focusable);
            focusProbe = {
              tag: focusable.tagName.toLowerCase(),
              cls: (focusable.className || "").toString().slice(0, 80),
              boxShadow: fcs.boxShadow.slice(0, 200),
              outlineColor: fcs.outlineColor,
              borderColor: fcs.borderColor,
            };
          } catch (e) { focusProbe = { err: String(e).slice(0, 80) }; }
        }
        // Count control-surface / input-pill elements (the deshadcn material).
        const controlSurfaces = document.querySelectorAll(".control-surface, .input-pill").length;
        // disabled + invalid presence in the story
        const disabledCount = document.querySelectorAll("[disabled], [data-disabled], [aria-disabled=true]").length;
        const invalidCount = document.querySelectorAll("[aria-invalid=true], :user-invalid, .user-invalid-fallback").length;
        return {
          captureReady: r.hasAttribute("data-capture-ready"),
          captureMode: r.getAttribute("data-capture-mode"),
          isDark: r.classList.contains("dark"),
          mainChildren: main ? main.children.length : -1,
          bodyTextLen: bodyText.length,
          bodyTextHead: bodyText.slice(0, 90),
          badgeText: badgeEl ? (badgeEl.innerText || "").replace(/\s+/g, " ").trim().slice(0, 120) : null,
          canvases: document.querySelectorAll("canvas").length,
          focusRingColor,
          legacyRing,
          focusProbe,
          controlSurfaces,
          disabledCount,
          invalidCount,
        };
      });
      const png = `${OUT}/${slug(route)}-chrome-${mode}.png`;
      await page.screenshot({ path: png, fullPage: false });
      results.push({ engine: "chrome", route, mode, png, probe });
      console.error(`chrome ${mode} ${route} OK bodyLen=${probe.bodyTextLen} frc="${probe.focusRingColor}" legacyRing="${probe.legacyRing}" ctrls=${probe.controlSurfaces} focusBS=${probe.focusProbe ? (probe.focusProbe.boxShadow||"").slice(0,40) : "none"}`);
    } catch (e) {
      err = String(e).slice(0, 300);
      results.push({ engine: "chrome", route, mode, err });
      console.error(`chrome ${mode} ${route} FAIL ${err}`);
    }
    await page.close();
  }
  await ctx.close();
}
writeFileSync(`${OUT}/chrome-results.json`, JSON.stringify({ results }, null, 2));
await browser.close();
try { proc.kill("SIGTERM"); } catch {}
console.error("DONE chrome:", results.length, "captures");
