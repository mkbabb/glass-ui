// BM pass 9, Critic B's check (not a design page). Two claims of pass 9 read in Playwright WebKit, the engine that shares
// WebCore's parser, style and compositing decisions with Safari (an inference; Safari itself is unread, and Playwright
// WebKit draws no backdrop blur, which neither cell needs):
//  1. §12 (P9-slider's B): does WebKit take B's grown legs, among them the lane's negative `clip-path: inset()`, and keep
//     shell ⊇ band ⊇ knob with the band's three legs equal on every frame, as the pass read in Chromium only
//     (`slider/probe.json`)? Driven by the page's own "Hold open" toggle; geometry from computed style per rAF.
//  2. §11.3 item 6 (the goo): does a plate that moves by a running compositor animation (`translate` by a CSS transition
//     or a Web Animation) stay inside the layer's `filter: url(#goo)`, so the neck forms, or leave it? Read as the pixel
//     at the neck's centre in a screenshot, beside a static control. A neck in every cell is inconclusive (the
//     screenshot path may flatten layers); a missing neck only in the animated cells means the plate left the filter.
// Run: ~/.claude/guard/guarded --exclusive webkit --timeout 10 -- node docs/tranches/BM/study/pass-9/critique-B-check.mjs
// One browser, one context per cell, all closed in finally. Writes critique-B-check-webkit.json.
import { webkit } from "playwright";
import { PNG } from "pngjs";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const HERE = path.dirname(new URL(import.meta.url).pathname);
const page9 = readFileSync(path.resolve(HERE, "../pages/P9-slider.html"), "utf8");
const wrap = (body) => `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<style>:root{color-scheme:light}body{margin:0;font:14px system-ui,sans-serif}[hidden]{display:none!important}</style></head><body>${body}</body></html>`;
const out = { engine: "webkit", at: new Date().toISOString(), cells: {} };

const browser = await webkit.launch({ headless: true });
out.version = browser.version();
const cell = async (name, fn) => {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
  try { out.cells[name] = await fn(await ctx.newPage()); } catch (e) { out.cells[name] = { error: String(e) }; } finally { await ctx.close(); }
};
try {
  // 1a. Does the parser take a negative inset, as B's held lane writes it?
  await cell("insetParse", async (page) => {
    await page.setContent(wrap("<div id=x></div>"), { waitUntil: "load" });
    return page.evaluate(() => {
      const x = document.getElementById("x"), r = {};
      for (const v of ["inset(-4px round 14px)", "inset(calc(-1 * 8px / 2) round calc(20px / 2 + 8px / 2))", "inset(0 round 10px)"]) {
        x.style.clipPath = ""; x.style.clipPath = v;
        r[v] = { supports: CSS.supports("clip-path", v), computed: getComputedStyle(x).clipPath };
      }
      return r;
    });
  });
  // 1b. P9-slider's model through "Hold open" and back, per rAF, in WebKit.
  for (const [name, sel] of [["A md, no knob", '.letter[data-v="a"] .sl[data-size="md"]'], ["B md, no knob", '.letter[data-v="b"] .sl[data-size="md"]'], ["B sm, knob", '.letter[data-v="b"] .sl[data-size="sm"]']]) {
    await cell("slider: " + name, async (page) => {
      await page.setContent(wrap(page9), { waitUntil: "load" }); await page.waitForTimeout(200);
      await page.evaluate((sel) => {
        const s = document.querySelector(sel), cs = (n, p) => getComputedStyle(n, p), q = (c) => s.querySelector(c);
        const H = parseFloat(cs(s).getPropertyValue("--H")), g = parseFloat(cs(s).getPropertyValue("--g"));
        const spread = (v) => { const m = /(-?[\d.]+)px\s+(-?[\d.]+)px\s+(-?[\d.]+)px\s+(-?[\d.]+)px/.exec(v || ""); return m ? +m[4] : 0; };
        const inset = (v) => { const m = /inset\((-?[\d.]+)px/.exec(v || ""); return m ? +m[1] : 0; };
        window.__fr = []; window.__rec = true; window.__H = H; window.__g = g;
        const frame = () => {
          const shellIn = inset(cs(q(".shell")).clipPath), laneIn = inset(cs(q(".lane")).clipPath);
          const tr = spread(cs(q(".track")).boxShadow), fi = spread(cs(q(".fill")).boxShadow), kn = spread(cs(q(".thumb"), "::before").boxShadow);
          const sc = parseFloat(cs(q(".thumb"), "::before").scale) || 1;
          return { on: s.classList.contains("on"), rShell: H / 2 + g - shellIn, rTrack: H / 2 + tr, rFill: H / 2 + fi, rLane: H / 2 - laneIn, rKnob: (H / 2) * sc + kn, laneClip: cs(q(".lane")).clipPath, op: +cs(q(".shell")).opacity, kop: +cs(q(".thumb"), "::before").opacity };
        };
        const tick = () => { if (!window.__rec) return; window.__fr.push(frame()); requestAnimationFrame(tick); };
        requestAnimationFrame(tick);
      }, sel);
      await page.click("#hold"); await page.waitForTimeout(400);
      await page.click("#hold"); await page.waitForTimeout(300);
      return page.evaluate(() => {
        window.__rec = false; const all = window.__fr;
        const held = all.filter((f) => f.on).at(-1), rest = all.at(-1);
        const min = (k) => +Math.min(...all.map(k)).toFixed(3), max = (k) => +Math.max(...all.map(k)).toFixed(3);
        const d = (f) => ({ shell: +(2 * f.rShell).toFixed(2), track: +(2 * f.rTrack).toFixed(2), fill: +(2 * f.rFill).toFixed(2), lane: +(2 * f.rLane).toFixed(2), knob: +(2 * f.rKnob).toFixed(2), laneClip: f.laneClip, shellOpacity: +f.op.toFixed(2), knobOpacity: +f.kop.toFixed(2) });
        return {
          frames: all.length, held: d(held), rest: d(rest),
          minShellMinusTrack: min((f) => f.rShell - f.rTrack),
          minLaneMinusFill: min((f) => f.rLane - f.rFill),
          maxBandLegSpread: max((f) => Math.max(f.rTrack, f.rFill, f.rLane) - Math.min(f.rTrack, f.rFill, f.rLane)),
          minFillMinusKnob: min((f) => Math.min(f.rFill, f.rLane) - f.rKnob),
        };
      });
    });
  }
  // 2. The goo with a plate moved by a running compositor animation.
  const goo = (mode) => `<svg width="0" height="0" aria-hidden="true" style="position:absolute"><filter id="goo" x="0" y="0" width="1" height="1"
    color-interpolation-filters="sRGB"><feGaussianBlur stdDeviation="4"/><feColorMatrix type="matrix"
    values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 20 -9.5"/></filter></svg>
    <style>body{background:#fff}.layer{position:absolute;left:28px;top:28px;width:320px;height:76px;${mode === "nofilter" ? "" : "filter:url(#goo);"}}
    .p{position:absolute;top:12px;height:52px;background:#333;border-radius:26px}.dock{left:12px;width:236px}
    .seat{left:250.5px;width:52px;${mode === "willchange" ? "will-change:transform;" : ""}${mode === "transition" ? "transition:translate 100s linear;" : ""}}</style>
    <div class="layer"><div class="p dock"></div><div class="p seat" id="seat"></div></div>`;
  for (const mode of ["nofilter", "static", "willchange", "waapi", "transition"]) {
    await cell("goo: " + mode, async (page) => {
      await page.setContent(wrap(goo(mode)), { waitUntil: "load" });
      const running = await page.evaluate(async (mode) => {
        const s = document.getElementById("seat");
        if (mode === "waapi") s.animate([{ translate: "0px 0" }, { translate: "0.01px 0" }], { duration: 100000, fill: "both" });
        if (mode === "transition") { s.style.translate = "0.01px 0"; s.getBoundingClientRect(); s.style.translate = "0px 0"; }
        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
        return s.getAnimations().map((a) => a.playState);
      }, mode);
      await page.waitForTimeout(300);
      const png = PNG.sync.read(await page.screenshot({ clip: { x: 0, y: 0, width: 390, height: 140 } }));
      const px = (x, y) => { const i = (y * png.width + x) * 4; return [png.data[i], png.data[i + 1], png.data[i + 2]]; };
      // The dock ends at x 28 + 12 + 236 = 276; the seat starts at 28 + 250.5 = 278.5; the gap's centre is x 277, y 66.
      return { running, neckCentre_277_66: px(277, 66), dockBody_150_66: px(150, 66), seatCentre_304_66: px(304, 66), aboveNeck_277_52: px(277, 52) };
    });
  }
} finally { await browser.close(); }
writeFileSync(path.join(HERE, "critique-B-check-webkit.json"), JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
