// BM pass 10 (DESIGN §3, §10): the folded capsule window's hit region, the cell pass 5 left owed. Two forms: the pass-4
// sketch as written (pass-4/critique-B-check.mjs ran it: a point 100 px past the disc, over the neighbour, hit the dock),
// and pass 5's cure: the window takes `pointer-events: none` and its `::before` takes `auto`, so that the window's rounded
// clip bounds the plate's hit area. Read by elementFromPoint in headless Chromium and in Playwright WebKit (an engine
// build, not Safari). One browser per engine, one context per cell, closed in finally.
// Run: ~/.claude/guard/guarded --exclusive webkit --timeout 5 -- node docs/tranches/BM/study/pass-10/access/window-hit.mjs
import { chromium, webkit } from "playwright";
import { writeFileSync } from "node:fs";
import path from "node:path";
const HERE = path.dirname(new URL(import.meta.url).pathname);
const page = (cure) => `<!doctype html><html><head><meta charset="utf-8"><style>
body { margin: 0 }
.capsule-window { position: fixed; left: 200px; top: 100px; width: 236px; height: 52px; --from: 184px;
  border-radius: calc(infinity * 1px); overflow: clip; translate: calc(-1 * var(--from)) 0; ${cure ? "pointer-events: none;" : ""} }
.capsule-window::before { content: ""; position: absolute; inset: 0; border-radius: inherit; background: #888;
  translate: var(--from) 0; ${cure ? "pointer-events: auto;" : ""} }
.under { position: fixed; left: 40px; top: 100px; width: 120px; height: 52px; background: #eee; }
</style></head><body><button class="under" id="under">neighbour</button><nav class="capsule-window" id="dock"></nav></body></html>`;
const POINTS = { disc_centre: [226, 126], over_neighbour_100: [100, 126], gap_between_180: [180, 126], disc_corner_outside_203_102: [203, 102] };
const out = { at: new Date().toISOString(), points: POINTS, engines: {} };
// An engine named on the command line runs alone and writes window-hit-<engine>.json (Chromium needs no WebKit slot).
const ONLY = process.argv[2];
for (const [name, type] of [["chromium", chromium], ["webkit", webkit]].filter(([n]) => !ONLY || n === ONLY)) {
  const browser = await type.launch({ headless: true });
  try {
    out.engines[name] = { version: browser.version() };
    for (const cure of [false, true]) {
      const ctx = await browser.newContext({ viewport: { width: 480, height: 240 } });
      try {
        const p = await ctx.newPage();
        await p.setContent(page(cure));
        out.engines[name][cure ? "pass5_cure" : "as_written"] = await p.evaluate((pts) => Object.fromEntries(Object.entries(pts).map(([k, [x, y]]) => {
          const e = document.elementFromPoint(x, y); return [k, e ? e.id || e.tagName : null]; })), POINTS);
      } finally { await ctx.close(); }
    }
  } finally { await browser.close(); }
}
writeFileSync(path.join(HERE, ONLY ? `window-hit-${ONLY}.json` : "window-hit.json"), JSON.stringify(out, null, 1));
console.log(JSON.stringify(out.engines));
