// BM pass 9's fold: the corrected sheet and presence sketches (pass-9/fold/sketch/), transcribed, and P8-present's own
// sheet B as rebuilt, read in one engine per run (folds B8-1, B8-2, B8-3, A8-3, A8-12, B8-8's pointer fit).
// Not a design page and not Safari: Playwright's WebKit build and headless Chromium read layout, scroll position,
// observer and event timing, never paint or the phone's gesture.
// Run: ~/.claude/guard/guarded --timeout 10 -- node docs/tranches/BM/study/pass-9/fold/sheet-check.mjs chromium
//      ~/.claude/guard/guarded --exclusive webkit --timeout 10 -- node docs/tranches/BM/study/pass-9/fold/sheet-check.mjs webkit
// One browser, one context per cell, everything closed in finally. Writes sheet-check-<engine>.json.
import { chromium, webkit } from "playwright";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const HERE = path.dirname(new URL(import.meta.url).pathname);
const engineName = process.argv[2] === "webkit" ? "webkit" : "chromium";
const engine = engineName === "webkit" ? webkit : chromium;
const out = { engine: engineName, at: new Date().toISOString(), cells: {} };

// The corrected sketch, transcribed: 1 px rungs, the scroller deaf to the pointer and the panel not, the observer
// learning `seen`, and the commit at rest (scrollend, or 150 ms quiet with no finger down when `?fallback`).
const sheetPage = (opts = {}) => `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>body{margin:0}.pg{position:fixed;left:20px;top:20px;width:200px;height:120px}.sc{position:fixed;inset:0;overflow-x:hidden;overflow-y:auto;
overscroll-behavior:contain;scroll-snap-type:y mandatory;pointer-events:none}.sp{block-size:100vh;scroll-snap-align:start}
.rg{position:absolute;inset-inline:0;block-size:1px;scroll-snap-align:start}.pn{min-block-size:85vh;background:#ccc;pointer-events:auto}</style></head>
<body><button class="pg" id="pg">page</button><div class="sc" id="sc"><div class="sp"></div>
<i class="rg" style="top:40vh"></i><i class="rg" style="top:85vh"></i><div class="pn" id="pn"><p>panel</p></div></div>
<script>
const sc = document.getElementById("sc"), panel = document.getElementById("pn");
window.log = []; window.rung = null; window.sheetClosed = false; window.pageClicks = 0;
document.getElementById("pg").addEventListener("click", () => window.pageClicks++);
const rungs = [0, 0.4, 0.85], first = 0.4;
const H = sc.clientHeight, P = panel.offsetHeight, t0 = performance.now(), now = () => Math.round(performance.now() - t0);
${opts.raf ? "requestAnimationFrame(() => { sc.scrollTop = 0.4 * H; });" : "sc.scrollTop = 0.4 * H;"}
let seen = -1, opened = false, quiet = 0; window.down = false;
const commit = () => {
  if (window.down || !opened || seen < 0) return;
  if (seen === 0) { window.sheetClosed = true; window.log.push({ t: now(), commit: "close" }); return; }
  if (window.rung !== seen) { window.rung = seen; window.log.push({ t: now(), commit: seen, scrollFrac: +(sc.scrollTop / H).toFixed(3) }); }
};
const edges = [0.001 * (P / H), ...rungs.slice(1).map((r, i) => (rungs[i] + r) / 2)];
new IntersectionObserver(([e]) => {
  const share = (e.intersectionRatio * P) / H;
  seen = e.intersectionRatio < 0.001 ? 0 : rungs.reduce((a, b) => (Math.abs(b - share) < Math.abs(a - share) ? b : a));
  if (seen > 0) opened = true;
  window.log.push({ t: now(), seen });
}, { root: sc, threshold: [0, ...edges.map((x) => Math.min(1, (x * H) / P))] }).observe(panel);
const fallback = ${opts.fallback ? "true" : "false"} || !("onscrollend" in window);
window.path = fallback ? "quiet 150 ms" : "scrollend";
if (!fallback) sc.addEventListener("scrollend", () => { window.log.push({ t: now(), scrollend: true }); requestAnimationFrame(() => requestAnimationFrame(commit)); });
else {
  const later = () => { clearTimeout(quiet); quiet = setTimeout(commit, 150); };
  sc.addEventListener("touchstart", () => { window.down = true; }, { passive: true });
  sc.addEventListener("touchend", () => { window.down = false; later(); }, { passive: true });
  sc.addEventListener("scroll", later, { passive: true });
}
window.closeReduced = async () => {
  await panel.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 100, easing: "ease-out", fill: "forwards" }).finished;
  window.log.push({ t: now(), hidden: +getComputedStyle(panel).opacity });
  sc.scrollTo({ top: 0, behavior: "instant" });
};
</script></body></html>`;

// usePresent's corrected close path, transcribed: the node's own finite legs, bounded by their end plus two frames.
const presentPage = (withInfinite) => `<!doctype html><html><head><meta charset="utf-8">
<style>@keyframes spin{to{rotate:1turn}}.ov{opacity:1;transition:opacity 120ms cubic-bezier(.3,.2,.7,.8)}
.ov[data-state=closed]{opacity:0}.sp{inline-size:20px;block-size:20px;background:#333;animation:spin 1s linear infinite}</style></head>
<body><div class="ov" id="ov" data-state="open"><p>Dialog</p>${withInfinite ? '<div class="sp"></div>' : ""}</div>
<script>
window.result = "pending";
window.closeIt = async () => {
  const node = document.getElementById("ov"), t0 = performance.now();
  node.dataset.state = "closed";
  await new Promise(requestAnimationFrame);
  const legs = node.getAnimations().filter((a) => Number.isFinite(Number(a.effect && a.effect.getComputedTiming().endTime)));
  const end = Math.max(0, ...legs.map((a) => Number(a.effect.getComputedTiming().endTime) - Number(a.currentTime || 0)));
  window.count = { own: legs.length, subtree: node.getAnimations({ subtree: true }).length };
  await Promise.race([Promise.allSettled(legs.map((a) => a.finished)), new Promise((r) => setTimeout(r, end + 34))]);
  window.result = "unmounted at " + Math.round(performance.now() - t0) + " ms";
};
</script></body></html>`;

const wrap = (body) => `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<style>:root{color-scheme:light}body{margin:0;font:14px system-ui,sans-serif}img{max-width:100%}[hidden]{display:none!important}</style></head><body>${body}</body></html>`;

const browser = await engine.launch({ headless: true });
const cell = async (name, fn, ctxOpts = { viewport: { width: 390, height: 844 } }) => {
  const ctx = await browser.newContext(ctxOpts);
  try { const page = await ctx.newPage(); const errs = []; page.on("pageerror", (e) => errs.push(e.message)); out.cells[name] = await fn(page); if (errs.length) out.cells[name].errors = errs; }
  catch (e) { out.cells[name] = { failed: String(e.message).slice(0, 200) }; }
  finally { await ctx.close(); }
};
try {
  for (const raf of [false, true]) await cell("openAt_" + (raf ? "raf" : "mount"), async (page) => {
    await page.setContent(sheetPage({ raf }), { waitUntil: "load" }); await page.waitForTimeout(800);
    return page.evaluate(() => ({ path: window.path, restFrac: +(document.getElementById("sc").scrollTop / document.getElementById("sc").clientHeight).toFixed(3), closed: window.sheetClosed, log: window.log }));
  });
  await cell("smoothToNextRung", async (page) => {
    await page.setContent(sheetPage(), { waitUntil: "load" }); await page.waitForTimeout(400);
    await page.evaluate(() => { window.log.length = 0; const sc = document.getElementById("sc"); sc.scrollTo({ top: 0.85 * sc.clientHeight, behavior: "smooth" }); });
    await page.waitForTimeout(1500);
    return page.evaluate(() => ({ path: window.path, rung: window.rung, log: window.log }));
  });
  await cell("heldPastEdge_quiet", async (page) => {
    await page.setContent(sheetPage({ fallback: true }), { waitUntil: "load" }); await page.waitForTimeout(400);
    const held = await page.evaluate(async () => {
      const sc = document.getElementById("sc"), H = sc.clientHeight;
      sc.dispatchEvent(new Event("touchstart")); sc.style.scrollSnapType = "none";
      for (let f = 0.4; f <= 0.7001; f += 0.02) { sc.scrollTop = f * H; await new Promise(requestAnimationFrame); }
      await new Promise((r) => setTimeout(r, 400));
      return window.rung;
    });
    const lifted = await page.evaluate(async () => {
      const sc = document.getElementById("sc");
      sc.dispatchEvent(new Event("touchend")); await new Promise((r) => setTimeout(r, 400));
      return window.rung;
    });
    return { rungWhileHeldAt070: held, rungAfterLift: lifted, log: await page.evaluate(() => window.log) };
  });
  await cell("pointerThroughAndWheel", async (page) => {
    await page.setContent(sheetPage(), { waitUntil: "load" }); await page.waitForTimeout(400);
    const above = await page.evaluate(() => { const t = document.elementFromPoint(100, 60); return t ? t.id || t.className || t.tagName : "nothing"; });
    await page.mouse.click(100, 60); await page.waitForTimeout(100);
    const clicks = await page.evaluate(() => window.pageClicks);
    await page.mouse.move(195, 700); await page.mouse.wheel(0, 380); await page.waitForTimeout(1200);
    return { hitAbovePanel: above, pageClicksAfterTapAbove: clicks, afterWheelOnPanel: await page.evaluate(() => ({ restFrac: +(document.getElementById("sc").scrollTop / document.getElementById("sc").clientHeight).toFixed(3), rung: window.rung })) };
  });
  await cell("closeReduced", async (page) => {
    await page.setContent(sheetPage(), { waitUntil: "load" }); await page.waitForTimeout(400);
    await page.evaluate(() => { window.log.length = 0; return window.closeReduced(); }); await page.waitForTimeout(600);
    return page.evaluate(() => ({ closed: window.sheetClosed, log: window.log }));
  }, { viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
  for (const withInfinite of [false, true]) await cell(withInfinite ? "presentWithSpinner" : "presentPlain", async (page) => {
    await page.setContent(presentPage(withInfinite), { waitUntil: "load" }); await page.waitForTimeout(200);
    await page.evaluate(() => window.closeIt());
    return page.evaluate(() => ({ animations: window.count, result: window.result }));
  }, {});
  // P8-present's own sheet B, rebuilt: its readout after load and after Show, and its scroller's rest.
  await cell("p8presentSheetB", async (page) => {
    await page.setContent(wrap(readFileSync(path.resolve(HERE, "../../pages/P8-present.html"), "utf8")), { waitUntil: "load" });
    await page.waitForTimeout(800);
    const read = () => page.evaluate(() => { const st = document.querySelector('.s3[data-sheet="scroll"]'), sc = st.querySelector(".scroller"); return { rest: st.closest(".letter").querySelector("[data-rest]").textContent, frac: +(sc.scrollTop / st.clientHeight).toFixed(3) }; });
    const afterLoad = await read();
    await page.evaluate(() => { const st = document.querySelector('.s3[data-sheet="scroll"]'); st.querySelector(".scroller").scrollTo({ top: 0, behavior: "instant" }); });
    await page.waitForTimeout(600);
    const afterClose = await read();
    await page.evaluate(() => document.querySelector('.s3[data-sheet="scroll"]').closest(".letter").querySelector("[data-show]").click());
    await page.waitForTimeout(1200);
    return { afterLoad, afterClose, afterShow: await read() };
  });
} finally {
  await browser.close();
}
writeFileSync(path.join(HERE, `sheet-check-${engineName}.json`), JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
