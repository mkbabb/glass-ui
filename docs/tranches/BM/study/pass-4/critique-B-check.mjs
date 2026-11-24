// BM pass 4, Critic B: two cells of pass 4 that only a browser can show, read in headless Chromium.
// Run from the glass-ui checkout (a browser run; never --light):
//   ~/.claude/guard/guarded --timeout 5 -- node docs/tranches/BM/study/pass-4/critique-B-check.mjs
// One browser for the run, one context per cell, everything closed in finally. Chromium is not Safari and draws no
// WebKit backdrop: these cells read layout and hit testing only, which the CSS specs fix alike in both engines.
//
// Cell 1 (P4-bud, lane E): is the seat's glass under E's open panel? (The page hides the seat for A to D only.)
// Cell 2 (the capsule window, `shape/sketch/capsule-window.next.css`): folded to a disc, what is the window
//   element's box, and does a point past the disc's fixed end hit it?
import { chromium } from "playwright";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const HERE = path.dirname(new URL(import.meta.url).pathname);
const PAGE = path.resolve(HERE, "../pages/P4-bud.html");
const wrap = (body) => `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><style>body{margin:0}</style></head><body>${body}</body></html>`;

// The sketch as written, on a fixed dock whose left end stays put and whose right end folds in by 184 px.
const windowFixture = wrap(`<style>
.capsule-window { position: fixed; left: 200px; top: 100px; width: 236px; height: 52px; --from: 0px;
  border-radius: calc(infinity * 1px); overflow: clip; translate: calc(-1 * var(--from)) 0; }
.capsule-window::before { content: ""; position: absolute; inset: 0; border-radius: inherit; background: #888;
  translate: var(--from) 0; }
.capsule-window.folded { --from: 184px; }
.under { position: fixed; left: 40px; top: 100px; width: 120px; height: 52px; background: #eee; }
</style><button class="under" id="under">neighbour</button><nav class="capsule-window folded" id="dock"></nav>`);

const out = { at: new Date().toISOString(), engine: "playwright chromium headless (no GPU)", cells: {} };
const browser = await chromium.launch({ headless: true });
try {
  {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
    try {
      const page = await ctx.newPage();
      await page.setContent(wrap(readFileSync(PAGE, "utf8")), { waitUntil: "load" });
      await page.click('[data-pick="e"]');
      await page.click("#open");
      await page.waitForTimeout(600);
      out.cells.E_over_seat = await page.evaluate(() => {
        const seat = document.querySelector(".seat"), pe = document.querySelector(".pE");
        const s = seat.getBoundingClientRect(), p = pe.getBoundingClientRect();
        const cx = s.left + s.width / 2, cy = s.top + s.height / 2;
        const stack = document.elementsFromPoint(cx, cy).map((e) => e.className || e.tagName);
        return {
          seat_box: [s.left, s.top, s.width, s.height].map(Math.round),
          panel_box: [p.left, p.top, p.width, p.height].map(Math.round),
          seat_opacity: getComputedStyle(seat).opacity,
          seat_backdrop: getComputedStyle(seat).backdropFilter,
          panel_backdrop: getComputedStyle(pe).backdropFilter,
          stack_at_seat_centre: stack,
        };
      });
    } finally { await ctx.close(); }
  }
  {
    const ctx = await browser.newContext({ viewport: { width: 600, height: 300 }, deviceScaleFactor: 1 });
    try {
      const page = await ctx.newPage();
      await page.setContent(windowFixture, { waitUntil: "load" });
      out.cells.window_folded = await page.evaluate(() => {
        const d = document.getElementById("dock").getBoundingClientRect();
        const hit = (x, y) => { const e = document.elementFromPoint(x, y); return e ? e.id || e.className || e.tagName : null; };
        return {
          window_box: [d.left, d.top, d.width, d.height].map(Math.round),
          visible_disc: [200, 100, 52, 52],
          hit_on_disc: hit(226, 126),
          hit_100px_past_fixed_end_over_neighbour: hit(100, 126),
        };
      });
    } finally { await ctx.close(); }
  }
} finally {
  await browser.close();
}
writeFileSync(path.join(HERE, "critique-B-check.json"), JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
