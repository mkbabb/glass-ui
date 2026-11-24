// BM pass 4 (Q1): the page's own work while each lane of pages/P4-bud.html opens, read in headless Chromium.
// Run from the glass-ui checkout (a browser run; never --light):
//   ~/.claude/guard/guarded --timeout 10 -- node docs/tranches/BM/study/pass-4/shape/probe.mjs
// One browser for the run, one context per lane, everything closed in finally.
//
// What it reads: a DevTools trace of each open at Slow ×4 (800 ms), counting the main thread's style, layout and
// paint events and their time. It is Chromium's split, not WebKit's: WebKit's split is from its source (UNION I12,
// [IOS §2.3]), and only the owner's Busy page reading on P4-bud shows what his Safari does. Headless Chromium has
// no GPU here, so no frame rate is read or claimed.
import { chromium } from "playwright";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const HERE = path.dirname(new URL(import.meta.url).pathname);
const PAGE = path.resolve(HERE, "../../pages/P4-bud.html");
const wrap = (body) => `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><style>body{margin:0}</style></head><body>${body}</body></html>`;
const html = wrap(readFileSync(PAGE, "utf8"));
const MAIN = new Set(["UpdateLayoutTree", "RecalculateStyles", "Layout", "Paint", "PrePaint", "Layerize", "UpdateLayer", "CompositeLayers"]);

const out = { at: new Date().toISOString(), engine: "playwright chromium headless (no GPU)", lanes: {} };
const browser = await chromium.launch({ headless: true });
try {
  for (const lane of ["a", "b", "c", "d", "e", "fold-F", "fold-G"]) {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
    try {
      const page = await ctx.newPage();
      await page.setContent(html, { waitUntil: "load" });
      await page.click("#slow");
      if (!lane.startsWith("fold")) await page.click(`[data-pick="${lane}"]`);
      await page.waitForTimeout(300);
      const cdp = await ctx.newCDPSession(page);
      const events = [];
      cdp.on("Tracing.dataCollected", (e) => events.push(...e.value));
      const done = new Promise((r) => cdp.once("Tracing.tracingComplete", r));
      await cdp.send("Tracing.start", { categories: "devtools.timeline,disabled-by-default-devtools.timeline", transferMode: "ReportEvents" });
      await page.click(lane.startsWith("fold") ? "#fold" : "#open");
      await page.waitForTimeout(1000);
      await cdp.send("Tracing.end");
      await done;
      const main = events.find((e) => e.name === "TracingStartedInBrowser")?.args?.data?.frames?.[0]?.processId;
      const counts = {};
      for (const e of events) {
        if (!MAIN.has(e.name) || e.ph !== "X" || (main && e.pid !== main)) continue;
        const c = (counts[e.name] ||= { n: 0, ms: 0 });
        c.n++; c.ms += (e.dur || 0) / 1000;
      }
      for (const c of Object.values(counts)) c.ms = +c.ms.toFixed(2);
      out.lanes[lane] = counts;
      await cdp.detach();
    } finally {
      await ctx.close();
    }
  }
} finally {
  await browser.close();
}
writeFileSync(path.join(HERE, "probe.json"), JSON.stringify(out, null, 1));
for (const [k, c] of Object.entries(out.lanes)) console.log(k.padEnd(7), JSON.stringify(c));
