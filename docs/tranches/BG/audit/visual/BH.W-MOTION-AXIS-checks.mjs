import { chromium } from "playwright";
import { writeFileSync } from "node:fs";
const OUT = process.argv[2];
const browser = await chromium.connectOverCDP("http://localhost:9477");
const checks = [];
function rec(name, pass, detail) { checks.push({ name, pass, detail }); console.log(`${pass ? "PASS" : "FAIL"}  ${name}  — ${detail}`); }

for (const mode of ["light", "dark"]) {
  // ---- FULL (no PRM) ----
  const ctxFull = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: mode, reducedMotion: "no-preference" });

  { // (a) TAB drag full — indicator carries .glass-drag-grabbable
    const p = await ctxFull.newPage();
    await p.goto(`http://localhost:5200/?capture=${encodeURIComponent("/navigation/tabs")}&mode=${mode}`, { waitUntil: "load" });
    await p.waitForFunction(() => document.documentElement.hasAttribute("data-capture-ready"), null, { timeout: 20000 });
    const r = await p.evaluate(() => { const ind = document.querySelector(".segmented-indicator"); return { present: !!ind, grabbable: ind ? ind.classList.contains("glass-drag-grabbable") : null, count: document.querySelectorAll(".segmented-indicator").length }; });
    rec(`(a) tab-drag-armed-at-full ${mode}`, r.present && r.grabbable === true, `indicator present=${r.present} grabbable=${r.grabbable} count=${r.count}`);
    await p.close();
  }
  { // (c) SLIDER full — .slider-range present + --motion-weight live
    const p = await ctxFull.newPage();
    await p.goto(`http://localhost:5200/?capture=${encodeURIComponent("/forms/slider")}&mode=${mode}`, { waitUntil: "load" });
    await p.waitForFunction(() => document.documentElement.hasAttribute("data-capture-ready"), null, { timeout: 20000 });
    const r = await p.evaluate(() => { const range = document.querySelector(".slider-range"); const probe = range || document.querySelector("[class*='slider']") || document.documentElement; return { rangePresent: !!range, motionWeight: getComputedStyle(probe).getPropertyValue("--motion-weight").trim(), rangeCount: document.querySelectorAll(".slider-range").length }; });
    const mwLive = r.motionWeight !== "" && r.motionWeight !== "0";
    rec(`(c) slider-full-register ${mode}`, r.rangePresent && mwLive, `range present=${r.rangePresent}(x${r.rangeCount}) --motion-weight=${r.motionWeight} live=${mwLive}`);
    await p.close();
  }
  { // (d) CARD — static plate cards carry NO data-pressable
    const p = await ctxFull.newPage();
    await p.goto(`http://localhost:5200/?capture=${encodeURIComponent("/display/card")}&mode=${mode}`, { waitUntil: "load" });
    await p.waitForFunction(() => document.documentElement.hasAttribute("data-capture-ready"), null, { timeout: 20000 });
    const r = await p.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('[data-slot="card"]'));
      const staticCards = cards.filter((c) => { const tag = c.tagName.toLowerCase(); const role = c.getAttribute("role"); return tag !== "button" && tag !== "a" && c.getAttribute("href") == null && role !== "button" && role !== "link"; });
      return { total: cards.length, static: staticCards.length, pressable: staticCards.filter((c) => c.getAttribute("data-pressable") != null).length };
    });
    rec(`(d) card-static-derives-no-press ${mode}`, r.total > 0 && r.pressable === 0, `cards total=${r.total} static=${r.static} spuriously-pressable=${r.pressable}`);
    await p.close();
  }
  { // (e) dialog route paints, envelope fits
    const p = await ctxFull.newPage();
    await p.goto(`http://localhost:5200/?capture=${encodeURIComponent("/containers/dialog")}&mode=${mode}`, { waitUntil: "load" });
    await p.waitForFunction(() => document.documentElement.hasAttribute("data-capture-ready"), null, { timeout: 20000 });
    const r = await p.evaluate(() => { const main = document.querySelector("main"); return { mainKids: main ? main.children.length : null, triggers: document.querySelectorAll("button, [role='button']").length, overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth }; });
    rec(`(e) dialog-route-paints-fits ${mode}`, r.mainKids > 0 && r.overflow === 0, `mainKids=${r.mainKids} triggers=${r.triggers} horizOverflow=${r.overflow}`);
    await p.close();
  }
  await ctxFull.close();

  // ---- REDUCED (PRM + mode on context BEFORE nav — the fresh-mount path) ----
  const ctxRed = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: mode, reducedMotion: "reduce" });
  { // (b) TAB drag reduced — indicator DROPS .glass-drag-grabbable (JS enrichment unbinds)
    const p = await ctxRed.newPage();
    await p.goto(`http://localhost:5200/?capture=${encodeURIComponent("/navigation/tabs")}&mode=${mode}`, { waitUntil: "load" });
    await p.waitForFunction(() => document.documentElement.hasAttribute("data-capture-ready"), null, { timeout: 20000 });
    await p.waitForTimeout(150);
    const r = await p.evaluate(() => { const ind = document.querySelector(".segmented-indicator"); return { present: !!ind, grabbable: ind ? ind.classList.contains("glass-drag-grabbable") : null, prm: window.matchMedia("(prefers-reduced-motion: reduce)").matches, tablist: !!document.querySelector("[role='tablist'],[role='group']") }; });
    rec(`(b) tab-drag-unbinds-under-PRM ${mode}`, r.present && r.grabbable === false && r.prm === true && r.tablist, `indicator present=${r.present} grabbable=${r.grabbable} PRM=${r.prm} strip-operable=${r.tablist}`);
    await p.screenshot({ path: `${OUT}/chrome-tabs-reduced-${mode}.png` });
    await p.close();
  }
  { // (f) slider reduced — range STILL present (functional survives; motion off ≠ meaning off)
    const p = await ctxRed.newPage();
    await p.goto(`http://localhost:5200/?capture=${encodeURIComponent("/forms/slider")}&mode=${mode}`, { waitUntil: "load" });
    await p.waitForFunction(() => document.documentElement.hasAttribute("data-capture-ready"), null, { timeout: 20000 });
    const r = await p.evaluate(() => ({ rangePresent: !!document.querySelector(".slider-range"), prm: window.matchMedia("(prefers-reduced-motion: reduce)").matches }));
    rec(`(f) slider-functional-under-PRM ${mode}`, r.rangePresent && r.prm === true, `range present=${r.rangePresent} PRM=${r.prm}`);
    await p.screenshot({ path: `${OUT}/chrome-slider-reduced-${mode}.png` });
    await p.close();
  }
  await ctxRed.close();
}

await browser.close();
writeFileSync(`${OUT}/motion-checks.json`, JSON.stringify(checks, null, 2));
const failed = checks.filter((c) => !c.pass);
console.log(`\n=== ${checks.length} checks, ${failed.length} FAILED ===`);
process.exit(failed.length ? 1 : 0);
