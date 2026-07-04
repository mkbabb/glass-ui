// BG.W-FALLBACK-EXCISE — C3 coarse-pointer 44px tap-floor probe (the ATLAS-N rider).
// Forces pointer:coarse via CDP Emulation.setEmulatedMedia over a mobile viewport,
// navigates /dock/overview + /dock/layers, and measures the EFFECTIVE tap floor of the
// dock controls: the in-dock .dock-icon-button box (density-clamp path) and the
// select/dropdown triggers' transparent ::after hit-slop (the census 32x24 fix).
import { createRequire } from "node:module";
import { spawn } from "node:child_process";
import { writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { chromium } = require("playwright");

const OUT = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/BG.W-FALLBACK-EXCISE-paint";
const ROUTES = ["/dock/overview", "/dock/layers"];
const MODES = ["light", "dark"];
const PORT = 9478;
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const udd = "/Users/mkbabb/Programming/glass-ui/.chrome-profile-coarse";

const proc = spawn(CHROME, [
  `--remote-debugging-port=${PORT}`, `--user-data-dir=${udd}`, "--headless=new",
  "--no-first-run", "--no-default-browser-check", "about:blank",
], { stdio: "ignore" });
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const slug = (r) => r.replace(/^\//, "").replace(/\//g, "_");

let browser = null;
for (let i = 0; i < 40; i++) { try { browser = await chromium.connectOverCDP(`http://localhost:${PORT}`); break; } catch { await wait(500); } }
if (!browser) { console.error("CDP connect FAILED"); process.exit(2); }

const PROBE = () => {
  const px = (v) => { const n = parseFloat(v); return Number.isFinite(n) ? Math.round(n * 10) / 10 : v; };
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const anyCoarse = window.matchMedia("(any-pointer: coarse)").matches;
  const rootCS = getComputedStyle(document.documentElement);
  const touchTarget = rootCS.getPropertyValue("--dock-touch-target").trim();
  const controlFloor = rootCS.getPropertyValue("--dock-control-floor").trim();
  // 1) in-dock icon buttons: the density-clamp path → box must be >= 44
  const iconBtns = [...document.querySelectorAll(".dock-icon-button")].slice(0, 24).map((b) => {
    const r = b.getBoundingClientRect();
    const compact = b.classList.contains("dock-icon-button--compact");
    return { w: px(r.width), h: px(r.height), compact };
  });
  // 2) the select/dropdown/dock triggers: the ::after hit-slop → computed >= 44 each axis
  const triggers = [...document.querySelectorAll(".dock-trigger, .dock-select-trigger, .dock-dropdown-trigger")].map((t) => {
    const r = t.getBoundingClientRect();
    const parentPos = getComputedStyle(t).position;
    const a = getComputedStyle(t, "::after");
    return {
      cls: (t.className || "").toString().slice(0, 60),
      boxW: px(r.width), boxH: px(r.height),
      parentPos,
      afterContent: a.content,
      afterPos: a.position,
      afterW: px(a.width || a.inlineSize),
      afterH: px(a.height || a.blockSize),
    };
  });
  return { coarse, anyCoarse, touchTarget, controlFloor,
    iconBtnCount: iconBtns.length, iconBtnMinW: iconBtns.length ? Math.min(...iconBtns.filter(b=>!b.compact).map(b=>b.w)) : null,
    iconBtnMinH: iconBtns.length ? Math.min(...iconBtns.filter(b=>!b.compact).map(b=>b.h)) : null,
    iconBtns, triggerCount: triggers.length, triggers };
};

const results = [];
for (const mode of MODES) {
  const ctx = await browser.newContext({ viewport: { width: 402, height: 874 }, deviceScaleFactor: 3, colorScheme: mode, hasTouch: true, isMobile: true });
  for (const route of ROUTES) {
    const page = await ctx.newPage();
    const client = await ctx.newCDPSession(page);
    await client.send("Emulation.setEmulatedMedia", { features: [
      { name: "pointer", value: "coarse" }, { name: "any-pointer", value: "coarse" },
    ] });
    const url = `http://localhost:5200/?capture=${encodeURIComponent(route)}&mode=${mode}`;
    let probe = null, err = null;
    try {
      let ok = false;
      for (let a = 0; a < 4 && !ok; a++) { try { await page.goto(url, { waitUntil: "load", timeout: 30000 }); ok = true; } catch (e) { if (a === 3) throw e; await wait(800); } }
      await page.waitForFunction(() => document.documentElement.hasAttribute("data-capture-ready"), { timeout: 25000 });
      await page.waitForTimeout(600);
      probe = await page.evaluate(PROBE);
      await page.screenshot({ path: `${OUT}/fallback-excise-${slug(route)}-coarse-${mode}.png`, fullPage: false });
    } catch (e) { err = String(e).slice(0, 200); }
    results.push({ route, mode, err, probe });
    console.log(`[coarse] ${mode} ${route} :: ${err ? "ERR " + err : `coarse=${probe.coarse} touchTarget=${probe.touchTarget} iconMin=${probe.iconBtnMinW}x${probe.iconBtnMinH} triggers=${probe.triggerCount}`}`);
    await page.close();
  }
  await ctx.close();
}
writeFileSync(`${OUT}/coarse-probe.json`, JSON.stringify(results, null, 2));
await browser.close();
try { proc.kill("SIGKILL"); } catch {}
console.log("COARSE DONE");
process.exit(0);
