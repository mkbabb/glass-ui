// BM pass 8, Critic B's check (not a design page): two cells the critique leans on, each run on the pass's own sketch logic.
//  1. useSheetScroll.next.ts: when does the observer write `rung` (v-model:detent)? (a) while a finger holds the sheet
//     past a basin edge (snap off while held, as the platform does), (b) during a smooth scroll to the next rung, against
//     the scroll's own end.
//  2. usePresent.next.ts: does its wait (`getAnimations({ subtree: true })` then every `finished`) settle when the
//     overlay holds an infinite animation (a spinner, a skeleton's breathe)?
// Run: ~/.claude/guard/guarded --timeout 5 -- node docs/tranches/BM/study/pass-8/critique-B-check.mjs [chromium|webkit]
// (webkit under `guarded --exclusive webkit`). One browser, one context per cell, all closed in finally.
import { chromium, webkit } from "playwright";
import { writeFileSync } from "node:fs";
import path from "node:path";

const HERE = path.dirname(new URL(import.meta.url).pathname);
const engineName = process.argv[2] === "webkit" ? "webkit" : "chromium";
const engine = engineName === "webkit" ? webkit : chromium;
const out = { engine: engineName, at: new Date().toISOString(), cells: {} };

const sheetPage = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>body{margin:0}.sc{position:fixed;inset:0;overflow-y:auto;overscroll-behavior:contain;scroll-snap-type:y mandatory}
.sp{block-size:100vh;scroll-snap-align:start}.rg{position:absolute;inset-inline:0;block-size:0;scroll-snap-align:start}
.pn{min-block-size:85vh;background:#ccc}</style></head><body><div class="sc" id="sc"><div class="sp"></div>
<i class="rg" style="top:40vh"></i><i class="rg" style="top:85vh"></i><div class="pn" id="pn"></div></div>
<script>
// useSheetScroll.next.ts, transcribed: the observer and its thresholds, rungs [0.4, 0.85].
const sc = document.getElementById("sc"), panel = document.getElementById("pn");
window.log = []; window.rung = null;
const rungs = [0, 0.4, 0.85];
const H = sc.clientHeight, P = panel.offsetHeight;
sc.scrollTop = 0.4 * H;
const edges = [0.001 * (P / H), ...rungs.slice(1).map((r, i) => (rungs[i] + r) / 2)];
const t0 = performance.now();
new IntersectionObserver(([e]) => {
  if (e.intersectionRatio < 0.001) { window.log.push({ t: performance.now() - t0, close: true }); return; }
  const share = (e.intersectionRatio * P) / H;
  window.rung = rungs.reduce((a, b) => (Math.abs(b - share) < Math.abs(a - share) ? b : a));
  window.log.push({ t: Math.round(performance.now() - t0), rung: window.rung, scrollFrac: +(sc.scrollTop / H).toFixed(3) });
}, { root: sc, threshold: [0, ...edges.map((x) => Math.min(1, (x * H) / P))] }).observe(panel);
sc.addEventListener("scrollend", () => window.log.push({ t: Math.round(performance.now() - t0), scrollend: true, scrollFrac: +(sc.scrollTop / H).toFixed(3) }));
</script></body></html>`;

const presentPage = (withInfinite) => `<!doctype html><html><head><meta charset="utf-8">
<style>@keyframes spin{to{rotate:1turn}}.ov{opacity:1;transition:opacity 120ms cubic-bezier(.3,.2,.7,.8)}
.ov[data-state=closed]{opacity:0}.sp{inline-size:20px;block-size:20px;background:#333;animation:spin 1s linear infinite}</style></head>
<body><div class="ov" id="ov" data-state="open"><p>Dialog</p>${withInfinite ? '<div class="sp"></div>' : ""}</div>
<script>
// usePresent.next.ts's close path, transcribed: the closed state, one frame, then every animation in the subtree.
window.result = "pending";
window.closeIt = async () => {
  const node = document.getElementById("ov");
  node.dataset.state = "closed";
  await new Promise(requestAnimationFrame);
  const anims = node.getAnimations({ subtree: true });
  window.count = anims.length;
  const wait = Promise.allSettled(anims.map((a) => a.finished)).then(() => "unmounted");
  window.result = await Promise.race([wait, new Promise((r) => setTimeout(() => r("still mounted after 3000 ms"), 3000))]);
};
</script></body></html>`;

const browser = await engine.launch({ headless: true });
try {
  // 1a. A finger holds the sheet at 0.70 of the viewport (past the 0.625 edge, short of the 0.85 rung). While a finger
  //     is down the platform does not snap, so snap is off for the hold; the position steps as a drag would.
  {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    try {
      const page = await ctx.newPage();
      await page.setContent(sheetPage, { waitUntil: "load" });
      await page.waitForTimeout(300);
      const before = await page.evaluate(() => window.rung);
      await page.evaluate(async () => {
        const sc = document.getElementById("sc"), H = sc.clientHeight;
        sc.style.scrollSnapType = "none"; // finger down
        for (let f = 0.4; f <= 0.7001; f += 0.02) { sc.scrollTop = f * H; await new Promise(requestAnimationFrame); }
      });
      await page.waitForTimeout(300);
      out.cells.heldPastEdge = { rungBefore: before, rungWhileHeldAt070: await page.evaluate(() => window.rung), log: await page.evaluate(() => window.log) };
    } finally { await ctx.close(); }
  }
  // 1b. A smooth scroll from the 0.40 rung to the 0.85 rung (the close-from-a-control path, and a stand-in for momentum).
  {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    try {
      const page = await ctx.newPage();
      await page.setContent(sheetPage, { waitUntil: "load" });
      await page.waitForTimeout(300);
      await page.evaluate(() => { window.log.length = 0; const sc = document.getElementById("sc"); sc.scrollTo({ top: 0.85 * sc.clientHeight, behavior: "smooth" }); });
      await page.waitForTimeout(1500);
      out.cells.smoothToNextRung = { log: await page.evaluate(() => window.log) };
    } finally { await ctx.close(); }
  }
  // 1c. Where the sheet opens: the sketch writes `scrollTop` at mount, "before the first paint"; P8-present writes it in a
  //     rAF. Read the resting fraction and the observer's log 800 ms after load, with nothing else touching the scroller.
  for (const how of ["mount", "raf"]) {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    try {
      const page = await ctx.newPage();
      const html = how === "mount" ? sheetPage : sheetPage.replace("sc.scrollTop = 0.4 * H;", "requestAnimationFrame(() => { sc.scrollTop = 0.4 * H; });");
      await page.setContent(html, { waitUntil: "load" });
      await page.waitForTimeout(800);
      out.cells["openAt_" + how] = await page.evaluate(() => {
        const sc = document.getElementById("sc");
        return { restFrac: +(sc.scrollTop / sc.clientHeight).toFixed(3), rung: window.rung, log: window.log };
      });
    } finally { await ctx.close(); }
  }
  // 2. The presence wait, with and without an infinite animation inside the overlay.
  for (const withInfinite of [false, true]) {
    const ctx = await browser.newContext();
    try {
      const page = await ctx.newPage();
      await page.setContent(presentPage(withInfinite), { waitUntil: "load" });
      await page.waitForTimeout(200);
      await page.evaluate(() => window.closeIt());
      out.cells[withInfinite ? "presentWithSpinner" : "presentPlain"] = { animations: await page.evaluate(() => window.count), result: await page.evaluate(() => window.result) };
    } finally { await ctx.close(); }
  }
} finally {
  await browser.close();
}
writeFileSync(path.join(HERE, `critique-B-check-${engineName}.json`), JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
