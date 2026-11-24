// BM pass 9 (DESIGN §12): P9-slider's model read frame by frame in headless Chromium. Per rAF through a press's grow and
// its release's shrink, it reads each layer's computed outset (the shell's clip, the track's and the fill's spread, the
// fill window's clip, the knob's spread or scale) and the knob's centre against the fill's end cap, and checks:
//   B: shell ⊇ band ⊇ knob on every frame, the band's three legs equal on every frame, centres within 0.5 px;
//   A: the knob inside the shell on every frame, and how far it stands outside the band.
// Chromium is not Safari and has no GPU here: this reads the model's geometry on the page's thread, never the phone's
// paint or which thread runs what. Run:
//   ~/.claude/guard/guarded --timeout 10 -- node docs/tranches/BM/study/pass-9/slider/probe.mjs
// One browser, one context per cell, everything closed in finally. Writes probe.json.
import { chromium } from "playwright";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
const HERE = path.dirname(new URL(import.meta.url).pathname);
const page0 = readFileSync(path.resolve(HERE, "../../pages/P9-slider.html"), "utf8");
const wrap = (body) => `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<style>:root{color-scheme:light}body{margin:0;font:14px system-ui,sans-serif}[hidden]{display:none!important}</style></head><body>${body}</body></html>`;
const out = { method: "pass-9/slider/probe.mjs; headless Chromium, the page's model on the page's thread", cells: {} };
const browser = await chromium.launch({ headless: true });
try {
  for (const [name, sel, reduced] of [["A md, no knob", '.letter[data-v="a"] .sl[data-size="md"]', false], ["B md, no knob", '.letter[data-v="b"] .sl[data-size="md"]', false], ["B sm, knob", '.letter[data-v="b"] .sl[data-size="sm"]', false], ["B md, Reduce Motion", '.letter[data-v="b"] .sl[data-size="md"]', true]]) {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, hasTouch: true, reducedMotion: reduced ? "reduce" : "no-preference" });
    try {
      const page = await ctx.newPage();
      await page.setContent(wrap(page0), { waitUntil: "load" }); await page.waitForTimeout(200);
      // A real press by touch (CDP touch events, as the page check drives a finger), so no hover dwell is involved.
      const box = await page.evaluate((sel) => { const s = document.querySelector(sel); s.scrollIntoView({ block: "center" }); const r = s.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
      await page.evaluate((sel) => {
        const s = document.querySelector(sel), cs = (n, p) => getComputedStyle(n, p), q = (c) => s.querySelector(c);
        const H = parseFloat(cs(s).getPropertyValue("--H")), g = parseFloat(cs(s).getPropertyValue("--g"));
        const spread = (v) => { const m = /(-?[\d.]+)px\s+(-?[\d.]+)px\s+(-?[\d.]+)px\s+(-?[\d.]+)px/.exec(v || ""); return m ? +m[4] : 0; };
        const inset = (v) => { const m = /inset\((-?[\d.]+)px/.exec(v || ""); return m ? +m[1] : 0; };
        window.__H = H; window.__g = g; window.__fr = []; window.__rec = true;
        const frame = () => {
          const shellIn = inset(cs(q(".shell")).clipPath), laneIn = inset(cs(q(".lane")).clipPath);
          const tr = spread(cs(q(".track")).boxShadow), fi = spread(cs(q(".fill")).boxShadow), kn = spread(cs(q(".thumb"), "::before").boxShadow);
          const sc = parseFloat(cs(q(".thumb"), "::before").scale) || 1;
          const t = q(".thumb").getBoundingClientRect(), f = q(".fill").getBoundingClientRect();
          return { t: performance.now(), on: s.classList.contains("on"), rShell: H / 2 + g - shellIn, rBand: H / 2 + fi, rKnob: (H / 2) * sc + kn, legs: [tr, fi, -laneIn], centre: Math.abs(t.left + H / 2 - (f.right + 0.25 - H / 2)), op: +cs(q(".shell")).opacity, kop: +cs(q(".thumb"), "::before").opacity };
        };
        const tick = () => { if (!window.__rec) return; window.__fr.push(frame()); requestAnimationFrame(tick); };
        requestAnimationFrame(tick);
      }, sel);
      const cdp = await ctx.newCDPSession(page);
      await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: box.x, y: box.y, id: 1 }] });
      await page.waitForTimeout(340);
      await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
      await page.waitForTimeout(260);
      await cdp.detach();
      const res = await page.evaluate(() => {
        window.__rec = false; const all = window.__fr, H = window.__H, g = window.__g;
        const grow = all.filter((f) => f.on), shrink = all.slice(all.lastIndexOf(grow.at(-1)) + 1);
        const min = (k) => +Math.min(...all.map(k)).toFixed(3), max = (k) => +Math.max(...all.map(k)).toFixed(3);
        const d = (f) => ({ shell: +(2 * f.rShell).toFixed(2), band: +(2 * f.rBand).toFixed(2), knob: +(2 * f.rKnob).toFixed(2), shellOpacity: +f.op.toFixed(2), knobOpacity: +f.kop.toFixed(2) });
        return {
          H, g, frames: { grow: grow.length, shrink: shrink.length },
          held: d(grow.at(-1)), rest: d(all.at(-1)),
          minShellMinusBand: min((f) => f.rShell - f.rBand), minBandMinusKnob: min((f) => f.rBand - f.rKnob), minShellMinusKnob: min((f) => f.rShell - f.rKnob),
          maxKnobOutsideBand: max((f) => f.rKnob - f.rBand),
          maxLegSpread: max((f) => Math.max(...f.legs) - Math.min(...f.legs)), maxCentreOff: max((f) => f.centre),
        };
      });
      out.cells[name] = res;
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); }
writeFileSync(path.join(HERE, "probe.json"), JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
