// BM pass 7 (Q2, F2; DESIGN §9.2), corrected in pass 8 by the fold of pass 7's critiques (A7-7, B7-1, B7-5): an engine
// clip check on P7-fuse's cut (D) and goo (C) lanes at the five openings BL's R-6 holds (W-I.8.md:128). On 12.0.0's
// frostless material R-6's bar reads only the clip's edges and how the engine draws them, never whether cut glass reads as
// one surface; that reopening is the owner's OQ-5 (fold A7-7). The ground is the page's own Flat ground, a grey whose
// luminance differs from the card's in both modes (light card 246, dark card 41, flat about 142; fold B7-5). C's shape is the
// visible glass, the window's box intersected with its translated ::before, joined with the seat (fold B7-1). The Frost
// cells inject today's frost on D for the engine's clip only, since the page no longer carries a Frost switch. R-6's bar:
// every glass pixel on a flat ground within 2 (of 255) of the plate's centre, and no junction column differing from its
// neighbours by more than 4. Pixels 1.5 px or more inside the shape's edge are read; the shape is the lane's own path
// (D) or the union of the two plates (C).
// Run: ~/.claude/guard/guarded --exclusive webkit --timeout 10 -- node docs/tranches/BM/study/pass-8/fold/crop.mjs webkit
//      ~/.claude/guard/guarded --timeout 10 -- node docs/tranches/BM/study/pass-8/fold/crop.mjs chromium
// One browser, one context per cell, closed in finally. Playwright WebKit draws no backdrop blur and is not Safari, and
// headless Chromium has no GPU: the Frost cells read only how each engine clips; Safari's crop is the owner's.
import { chromium, webkit } from "playwright";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
const HERE = path.dirname(new URL(import.meta.url).pathname);
const engine = process.argv[2] === "webkit" ? webkit : chromium, name = process.argv[2] === "webkit" ? "webkit" : "chromium";
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<style>body{margin:0}</style></head><body>${readFileSync(path.resolve(HERE, "../../pages/P7-fuse.html"), "utf8")}</body></html>`;
const HIDE = `.faces,.moon{display:none!important}`;
const FROST = `.cplate{background:oklch(0.28 0.035 70 / 0.14)!important;-webkit-backdrop-filter:blur(16px) saturate(1.5);backdrop-filter:blur(16px) saturate(1.5)}`;
const rows = [];
const browser = await engine.launch({ headless: true });
try {
  for (const scheme of ["light", "dark"]) for (const frost of [false, true]) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme, deviceScaleFactor: 2, reducedMotion: "no-preference" });
    try {
      const page = await ctx.newPage();
      await page.setContent(html, { waitUntil: "load" });
      await page.addStyleTag({ content: HIDE });
      await page.click("#flat");
      if (frost) await page.addStyleTag({ content: FROST });
      await page.click('[data-run="seat"]'); await page.waitForTimeout(900);
      for (let i = 0; i < 5; i++) {
        await page.click('[data-hold="seat"]'); await page.waitForTimeout(1200);
        const gap = Number((await page.textContent('[data-hold="seat"]')).match(/[\d.]+/)[0]);
        for (const lane of ["cut", "goo"]) {
          if (frost && lane === "goo") continue; // the goo lane has no frost by design; frost cells are D's clip only
          const stage = page.locator(`.stage[data-lane="${lane}"]`);
          const shot = (await stage.screenshot({ type: "png" })).toString("base64");
          // the shape, in the stage's CSS px: the cut's own path, or the two plates' union (the goo's true union)
          const shape = await stage.evaluate((st, lane) => {
            const o = st.getBoundingClientRect();
            if (lane === "cut") { const c = st.querySelector(".cplate"), r = c.getBoundingClientRect(); return { kind: "path", d: getComputedStyle(c).clipPath.replace(/^path\("?'?|'?"?\)$/g, ""), x: r.left - o.left, y: r.top - o.top }; }
            // the visible glass: the window's box intersected with its translated ::before (fold B7-1)
            const w = st.querySelector(".gwin"), wr = w.getBoundingClientRect();
            const fx = parseFloat(getComputedStyle(w, "::before").translate) || 0;
            const left = Math.max(wr.left, wr.left + fx), right = Math.min(wr.right, wr.right + fx);
            const sr = st.querySelector(".gseat").getBoundingClientRect();
            return { kind: "plates", a: [left - o.left, wr.top - o.top, right - left, wr.height], s: [sr.left - o.left, sr.top - o.top, sr.width, sr.height] };
          }, lane);
          const m = await page.evaluate(async ({ shot, shape }) => {
            const img = new Image(); img.src = "data:image/png;base64," + shot; await img.decode();
            const cv = document.createElement("canvas"); cv.width = img.width; cv.height = img.height;
            const g = cv.getContext("2d"); g.drawImage(img, 0, 0); const px = g.getImageData(0, 0, cv.width, cv.height).data;
            const k = cv.width / document.querySelector('.stage[data-lane="cut"]').getBoundingClientRect().width;
            const P = new Path2D();
            if (shape.kind === "path") { const q = new Path2D(shape.d); const t = new DOMMatrix().translate(shape.x, shape.y); P.addPath(q, t); }
            else for (const [x, y, w, h] of [shape.a, shape.s]) P.roundRect(x, y, w, h, h / 2);
            const probe = document.createElement("canvas").getContext("2d"); probe.lineWidth = 3;
            const inside = (x, y) => probe.isPointInPath(P, x, y) && !probe.isPointInStroke(P, x, y);
            const lum = (i) => 0.2126 * px[i] + 0.7152 * px[i + 1] + 0.0722 * px[i + 2];
            // the centre: the middle of the dock's plate, left of the neck
            const cx = Math.round(60 * k), cy = Math.round(60 * k), c0 = lum((cy * cv.width + cx) * 4);
            let dev = 0, cols = new Map();
            for (let y = 0; y < cv.height; y++) for (let x = 0; x < cv.width; x++) {
              if (!inside(x / k, y / k)) continue;
              const v = lum((y * cv.width + x) * 4); dev = Math.max(dev, Math.abs(v - c0));
              const c = cols.get(x) || [0, 0]; c[0] += v; c[1]++; cols.set(x, c);
            }
            const xs = [...cols.keys()].sort((a, b) => a - b); let junction = 0;
            for (let i = 1; i < xs.length; i++) if (xs[i] === xs[i - 1] + 1) junction = Math.max(junction, Math.abs(cols.get(xs[i])[0] / cols.get(xs[i])[1] - cols.get(xs[i - 1])[0] / cols.get(xs[i - 1])[1]));
            return { flatDeviation: +dev.toFixed(1), junction: +junction.toFixed(1) };
          }, { shot, shape });
          rows.push({ engine: name, scheme, frost, lane, gap, ...m, pass: m.flatDeviation <= 2 && m.junction <= 4 });
        }
      }
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); }
writeFileSync(path.join(HERE, `crop-${name}.json`), JSON.stringify({ at: new Date().toISOString(), engine: name, bar: "flat deviation <= 2, junction <= 4 (W-I.8.md:128)", rows }, null, 1));
for (const r of rows) console.log(name, r.scheme, r.frost ? "frost" : "12.0.0", r.lane.padEnd(4), String(r.gap).padStart(4), "dev", r.flatDeviation, "junction", r.junction, r.pass ? "pass" : "FAIL");
