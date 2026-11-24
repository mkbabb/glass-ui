// BM pass 5: law 2's forced-colours sign, read under emulation (owed since pass 1, DESIGN §2.1). glass-ui draws it
// with one global rule (`src/styles/accessibility.css:31-43`): under `forced-colors: active`, any element with
// `aria-current`, `aria-selected="true"` or `aria-pressed="true"` takes `border: 2px solid Highlight !important`.
// This probe loads the 11.1.0 dist the sites load (Home Assistant's installed copy) into headless Chromium, builds a
// SegmentedTabs strip and a dock run as their markup ships, and reads, with forced colours off and on:
//   · whether the selected tab and the current seat paint a Highlight border, and what the mark's fill becomes;
//   · each tab's box before and after the selection moves from the narrowest tab to the widest and back, since a
//     2 px border on an auto-sized grid item adds 4 px to its max-content contribution, and the pill strip's
//     `grid-auto-columns: 1fr` sizes every column to the widest (segmented.css, `.segmented-tabs`).
// Run: ~/.claude/guard/guarded --timeout 5 -- node docs/tranches/BM/study/pass-5/mark/forced-colors.mjs
// One browser, one context per cell, closed in finally. Chromium's forced-colours emulation is not Windows High
// Contrast and not Safari; it reads the cascade, which is the same in every engine that supports the media query.
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";
import path from "node:path";

const HERE = path.dirname(new URL(import.meta.url).pathname);
const DIST = "/Users/mkbabb/Programming/hassio-config/frontend/node_modules/@mkbabb/glass-ui/dist";
const html = `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="file://${DIST}/styles/index.css">
<link rel="stylesheet" href="file://${DIST}/components/tabs/styles/segmented.css">
</head><body style="padding:24px">
<div class="segmented-tabs segmented-tabs--pill glass-capsule-track" role="tablist" id="strip">
  <div class="segmented-indicator segmented-indicator--js glass-capsule" aria-hidden="true" id="ind"></div>
  <button class="segmented-tab" role="tab" aria-selected="true" data-active>All</button>
  <button class="segmented-tab" role="tab" aria-selected="false">Shared</button>
  <button class="segmented-tab" role="tab" aria-selected="false">Favourites</button>
</div>
<nav style="margin-top:24px;display:flex;gap:8px" id="run">
  <a href="#a" aria-current="page" style="display:grid;place-items:center;width:44px;height:44px;border-radius:22px">A</a>
  <a href="#b" style="display:grid;place-items:center;width:44px;height:44px;border-radius:22px">B</a>
</nav></body></html>`;

const read = () => {
  const tabs = [...document.querySelectorAll("#strip .segmented-tab")];
  const sel = document.querySelector('#strip [aria-selected="true"]'), seat = document.querySelector("#run [aria-current]");
  const cs = (el) => getComputedStyle(el);
  return {
    boxes: tabs.map((t) => { const r = t.getBoundingClientRect(); return [Math.round(r.left * 10) / 10, Math.round(r.width * 10) / 10]; }),
    selected_border: `${cs(sel).borderTopWidth} ${cs(sel).borderTopStyle} ${cs(sel).borderTopColor}`,
    seat_border: `${cs(seat).borderTopWidth} ${cs(seat).borderTopStyle} ${cs(seat).borderTopColor}`,
    mark_background: cs(document.getElementById("ind")).backgroundColor,
  };
};
const move = (to) => {
  document.querySelectorAll("#strip .segmented-tab").forEach((t, i) => {
    t.setAttribute("aria-selected", String(i === to));
    if (i === to) t.setAttribute("data-active", ""); else t.removeAttribute("data-active");
  });
};
const out = { at: new Date().toISOString(), dist: "glass-ui 11.1.0 (hassio-config's installed copy)", engine: "playwright chromium headless", cells: {} };
const browser = await chromium.launch({ headless: true });
try {
  for (const forced of ["none", "active"]) {
    const ctx = await browser.newContext({ forcedColors: forced, viewport: { width: 600, height: 300 } });
    try {
      const page = await ctx.newPage();
      await page.setContent(html, { waitUntil: "load" });
      const a = await page.evaluate(read);
      await page.evaluate(move, 2); const b = await page.evaluate(read);
      await page.evaluate(move, 0); const c = await page.evaluate(read);
      out.cells[forced] = { first_tab_selected: a, widest_selected: b, back: c,
        boxes_moved_px: Math.max(...a.boxes.map((x, i) => Math.max(Math.abs(x[0] - b.boxes[i][0]), Math.abs(x[1] - b.boxes[i][1])))) };
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); }
writeFileSync(path.join(HERE, "forced-colors.json"), JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
