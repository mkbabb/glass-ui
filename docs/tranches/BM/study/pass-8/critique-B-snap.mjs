// BM pass 8, Critic B: which part of sheet-scroll.next.css's rung construction an engine keeps as a snap position.
// Variants of the rung: the sketch's (absolute, zero height), absolute 1 px, and in-flow (the spacer cut into bands).
// Each: write scrollTop to the 0.40 rung after layout, wait 800 ms, read where the scroller rests. Then P8-present's own sheet B.
// Run: ~/.claude/guard/guarded [--exclusive webkit] --timeout 5 -- node docs/tranches/BM/study/pass-8/critique-B-snap.mjs [chromium|webkit]
import { chromium, webkit } from "playwright";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
const HERE = path.dirname(new URL(import.meta.url).pathname);
const name = process.argv[2] === "webkit" ? "webkit" : "chromium";
const css = `body{margin:0}.sc{position:fixed;inset:0;overflow-y:auto;overscroll-behavior:contain;scroll-snap-type:y mandatory}.pn{min-block-size:85vh;background:#ccc}`;
const V = {
  abs0: `<div class="sp" style="block-size:100vh;scroll-snap-align:start"></div><i style="position:absolute;inset-inline:0;block-size:0;top:40vh;scroll-snap-align:start"></i><i style="position:absolute;inset-inline:0;block-size:0;top:85vh;scroll-snap-align:start"></i>`,
  abs1px: `<div class="sp" style="block-size:100vh;scroll-snap-align:start"></div><i style="position:absolute;inset-inline:0;block-size:1px;top:40vh;scroll-snap-align:start"></i><i style="position:absolute;inset-inline:0;block-size:1px;top:85vh;scroll-snap-align:start"></i>`,
  inflow: `<div style="block-size:40vh;scroll-snap-align:start"></div><div style="block-size:45vh;scroll-snap-align:start"></div><div style="block-size:15vh;scroll-snap-align:start"></div>`,
};
const out = { engine: name, at: new Date().toISOString(), restAfterWritingRung040: {} };
const browser = await (name === "webkit" ? webkit : chromium).launch({ headless: true });
try {
  for (const [k, rungs] of Object.entries(V)) {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    try {
      const page = await ctx.newPage();
      await page.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body><div class="sc" id="sc">${rungs}<div class="pn"></div></div></body></html>`, { waitUntil: "load" });
      await page.waitForTimeout(200);
      await page.evaluate(() => { const sc = document.getElementById("sc"); sc.scrollTop = 0.4 * sc.clientHeight; });
      await page.waitForTimeout(800);
      out.restAfterWritingRung040[k] = await page.evaluate(() => { const sc = document.getElementById("sc"); return +(sc.scrollTop / sc.clientHeight).toFixed(3); });
    } finally { await ctx.close(); }
  }
  // P8-present itself, section 3's sheet B, wrapped as check-all/page-check-all.mjs wraps it: where it rests after load,
  // what its readout says, and where it rests after its Show button (the page's smooth scroll to the 0.40 rung).
  {
    const wrap = (body) => `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><style>body{margin:0;font:14px system-ui,sans-serif}[hidden]{display:none!important}</style></head><body>${body}</body></html>`;
    const html = wrap(readFileSync(path.resolve(HERE, "../pages/P8-present.html"), "utf8"));
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    try {
      const page = await ctx.newPage();
      const errors = [];
      page.on("pageerror", (e) => errors.push(e.message));
      await page.setContent(html, { waitUntil: "load" });
      await page.evaluate(() => document.querySelector('.s3[data-sheet="scroll"]').scrollIntoView({ block: "center" }));
      await page.waitForTimeout(900);
      const read = () => page.evaluate(() => {
        const st = document.querySelector('.s3[data-sheet="scroll"]'), sc = st.querySelector(".scroller");
        return { restFrac: +(sc.scrollTop / st.clientHeight).toFixed(3), readout: st.closest(".letter").querySelector("[data-rest]").textContent };
      });
      const afterLoad = await read();
      await page.evaluate(() => document.querySelector('.s3[data-sheet="scroll"]').closest(".letter").querySelector("[data-show]").click());
      await page.waitForTimeout(1200);
      out.p8presentSheetB = { afterLoad, afterShow: await read(), errors };
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); }
writeFileSync(path.join(HERE, `critique-B-snap-${name}.json`), JSON.stringify(out, null, 1));
console.log(JSON.stringify(out));
