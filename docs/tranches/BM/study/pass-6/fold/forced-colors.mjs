// BM pass 6's fold (B5-2, A5-10): the choice's sign under forced colours and more contrast, read under emulation,
// with the focus ring beside it. It replaces pass-5/mark/forced-colors.mjs, whose cells B5-2 found short: it read no
// focus, built the run from plain links, and loaded file:// sheets into a setContent page.
// The page is written beside this file and opened by goto(file://), so the 11.1.0 dist's sheets load. Two forms:
//   today     glass-ui 11.1.0 as shipped: the SegmentedTabs strip, and a dock seat with glass-ui's own control class,
//             under the global ring (accessibility.css:31-43, `border: 2px solid Highlight !important`).
//   proposed  the same markup with the amended mark (pass-6/fold/sketch/mark.next.css) and the global rule's selector
//             narrowed to `:not(.selection-option)`.
// Each cell reads, with forced colours off and on and with more contrast: every option's box before and after the
// choice moves to the widest option; the mark's border; and the chosen option's outline while it has keyboard focus.
// Run: ~/.claude/guard/guarded --timeout 5 -- node docs/tranches/BM/study/pass-6/fold/forced-colors.mjs
// One browser, one context per cell, closed in finally. Chromium's emulation is not Windows High Contrast and not
// Safari; it reads the cascade, which is the same in every engine that supports the media queries.
import { chromium } from "playwright";
import { writeFileSync, readFileSync, mkdirSync } from "node:fs";
import path from "node:path";
const HERE = path.dirname(new URL(import.meta.url).pathname);
const DIST = "/Users/mkbabb/Programming/hassio-config/frontend/node_modules/@mkbabb/glass-ui/dist";
const sketch = readFileSync(path.join(HERE, "sketch/mark.next.css"), "utf8");
const page = (form) => `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="file://${DIST}/styles/index.css">
<link rel="stylesheet" href="file://${DIST}/components/tabs/styles/segmented.css">
${form === "proposed" ? `<style>${sketch}
@media (forced-colors: active) { .selection-option[aria-selected="true"], .selection-option[aria-current] { border: 0 !important; } }</style>` : ""}
</head><body style="padding:24px">
<div class="segmented-tabs segmented-tabs--pill ${form === "proposed" ? "selection-group" : "glass-capsule-track"}" role="tablist" id="strip">
  <div class="${form === "proposed" ? "selection-mark" : "segmented-indicator segmented-indicator--js glass-capsule"}" aria-hidden="true" id="mark"></div>
  <button class="segmented-tab ${form === "proposed" ? "selection-option" : ""}" role="tab" aria-selected="true" data-active>All</button>
  <button class="segmented-tab ${form === "proposed" ? "selection-option" : ""}" role="tab" aria-selected="false" tabindex="-1">Shared</button>
  <button class="segmented-tab ${form === "proposed" ? "selection-option" : ""}" role="tab" aria-selected="false" tabindex="-1">Favourites</button>
</div>
<div class="glass-dock" style="margin-top:24px"><div class="dock-layers"><nav class="dock-run" id="run" style="display:flex;gap:8px">
  <a href="#a" class="dock-icon-button ${form === "proposed" ? "selection-option" : ""}" aria-current="page" style="display:grid;place-items:center;width:44px;height:44px;border-radius:22px">A</a>
  <a href="#b" class="dock-icon-button ${form === "proposed" ? "selection-option" : ""}" style="display:grid;place-items:center;width:44px;height:44px;border-radius:22px">B</a>
</nav></div></div></body></html>`;
mkdirSync(path.join(HERE, "fc"), { recursive: true });
for (const form of ["today", "proposed"]) writeFileSync(path.join(HERE, "fc", `${form}.html`), page(form));
const read = () => {
  const tabs = [...document.querySelectorAll("#strip .segmented-tab")], cs = (el) => getComputedStyle(el);
  const sel = document.querySelector('#strip [aria-selected="true"]'), m = document.getElementById("mark");
  return {
    boxes: tabs.map((t) => { const r = t.getBoundingClientRect(); return [Math.round(r.left * 10) / 10, Math.round(r.width * 10) / 10]; }),
    chosen_border: `${cs(sel).borderTopWidth} ${cs(sel).borderTopStyle} ${cs(sel).borderTopColor}`,
    chosen_outline_when_focused: `${cs(sel).outlineWidth} ${cs(sel).outlineStyle} ${cs(sel).outlineColor}`,
    mark_border: `${cs(m).borderTopWidth} ${cs(m).borderTopStyle} ${cs(m).borderTopColor}`,
    mark_background: cs(m).backgroundColor,
  };
};
const move = (to) => document.querySelectorAll("#strip .segmented-tab").forEach((t, i) => { t.setAttribute("aria-selected", String(i === to)); t.tabIndex = i === to ? 0 : -1; if (i === to) t.setAttribute("data-active", ""); else t.removeAttribute("data-active"); });
const out = { at: new Date().toISOString(), dist: "glass-ui 11.1.0 (hassio-config's installed copy)", engine: "playwright chromium headless", cells: {} };
const browser = await chromium.launch({ headless: true });
try {
  for (const form of ["today", "proposed"]) for (const [name, opts] of [["plain", {}], ["forced", { forcedColors: "active" }], ["more-contrast", { contrast: "more" }]]) {
    const ctx = await browser.newContext({ ...opts, viewport: { width: 600, height: 320 } });
    try {
      const p = await ctx.newPage();
      await p.goto("file://" + path.join(HERE, "fc", `${form}.html`), { waitUntil: "load" });
      const a = await p.evaluate(read);
      await p.keyboard.press("Tab"); const focused = await p.evaluate(read);
      await p.evaluate(move, 2); const b = await p.evaluate(read);
      out.cells[`${form}/${name}`] = { first_chosen: a, focused, widest_chosen: b,
        boxes_moved_px: Math.max(...a.boxes.map((x, i) => Math.max(Math.abs(x[0] - b.boxes[i][0]), Math.abs(x[1] - b.boxes[i][1])))) };
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); }
writeFileSync(path.join(HERE, "forced-colors.json"), JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
