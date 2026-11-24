// BM pass 2: two headless Chromium readings of the delivery. Chromium is not Safari and draws on no GPU here:
// these read main-thread work and lag, never a frame rate or WebKit's compositing.
//   1. follow: a pointer drag at 120 moves a second, followed (a) by keyframes.js's Draggable (the spring
//      target set per move, the value emitted per animation frame) and (b) by a direct write of `translate`
//      in the pointermove handler, each with the page's thread idle and then busy 45 of every 60 ms.
//      Reads the distance between the pointer and the drawn position at each frame (I10).
//   2. scroll: P2-scroll.html with one pair shown at a time, scrolled by wheel for 2 s; counts the main
//      thread's style recalcs and paints in the trace for today's part and the proposal.
// Run (after a reboot clears the zone refusal):
//   ~/.claude/guard/guarded --timeout 15 -- node docs/tranches/BM/study/pass-2/probe/probe.mjs
// One browser for the run, one context per cell, all closed in finally; the static server stops in finally.
import { chromium } from "playwright";
import http from "node:http";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";

const HERE = path.dirname(new URL(import.meta.url).pathname);
const ROOT = path.resolve(HERE, "../../../../../..");
const NM = path.join(ROOT, "node_modules");
const PAGES = path.resolve(HERE, "../../pages");
const wrap = (body, head = "") => `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">${head}
<style>body{margin:0;font:14px system-ui,sans-serif}</style></head><body>${body}</body></html>`;

const FOLLOW = wrap(`<div id="pad" style="position:relative;height:300px;margin:20px;background:#ddd;touch-action:none">
<div id="puck" style="position:absolute;left:0;top:120px;width:40px;height:40px;border-radius:20px;background:#333"></div></div>
<script type="module">
import { Draggable } from "/nm/@mkbabb/keyframes.js/dist/keyframes.js";
const pad = document.getElementById("pad"), puck = document.getElementById("puck");
const origin = pad.getBoundingClientRect().left;
window.__mode = new URL(location.href).searchParams.get("mode");
let pointerX = null, drawnX = null;
pad.addEventListener("pointermove", (e) => { pointerX = e.clientX - origin; }, { capture: true });
if (window.__mode === "kf") {
  const d = new Draggable({ axis: "x", transform: (c) => c - origin });
  d.attach(pad);
  d.subscribe((v) => { drawnX = v; puck.style.translate = v + "px 0"; });
} else {
  let down = false;
  pad.addEventListener("pointerdown", (e) => { down = true; pad.setPointerCapture(e.pointerId); });
  pad.addEventListener("pointermove", (e) => { if (!down) return; drawnX = e.clientX - origin; puck.style.translate = drawnX + "px 0"; });
  pad.addEventListener("pointerup", () => { down = false; });
}
window.__samples = [];
const tick = () => { if (pointerX != null && drawnX != null) window.__samples.push(Math.abs(pointerX - drawnX)); requestAnimationFrame(tick); };
requestAnimationFrame(tick);
window.__busy = (on) => { clearInterval(window.__bi); if (on) window.__bi = setInterval(() => { const end = performance.now() + 45; while (performance.now() < end) {} }, 60); };
window.__ready = true;
</script>`, `<script type="importmap">{"imports":{
"@mkbabb/value.js/css":"/nm/@mkbabb/value.js/dist/subpaths/css.js",
"@mkbabb/value.js/easing":"/nm/@mkbabb/value.js/dist/subpaths/easing.js",
"@mkbabb/value.js/math":"/nm/@mkbabb/value.js/dist/subpaths/math.js"}}</script>`);

const server = http.createServer((req, res) => {
  const u = new URL(req.url, "http://x");
  if (u.pathname === "/follow") { res.writeHead(200, { "content-type": "text/html" }); return res.end(FOLLOW); }
  if (u.pathname === "/p2") { res.writeHead(200, { "content-type": "text/html" }); return res.end(wrap(readFileSync(path.join(PAGES, "P2-scroll.html"), "utf8"))); }
  if (u.pathname.startsWith("/nm/")) {
    const f = path.join(NM, u.pathname.slice(4));
    if (f.startsWith(NM) && existsSync(f)) { res.writeHead(200, { "content-type": "text/javascript" }); return res.end(readFileSync(f)); }
  }
  res.writeHead(404); res.end();
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}`;
const out = { at: new Date().toISOString(), engine: "playwright chromium headless (no GPU)", follow: {}, scroll: {} };
const browser = await chromium.launch({ headless: true });
try {
  // 1. follow under load
  for (const mode of ["kf", "direct"]) for (const busy of [false, true]) {
    const ctx = await browser.newContext({ viewport: { width: 600, height: 400 } });
    try {
      const page = await ctx.newPage();
      await page.goto(`${base}/follow?mode=${mode}`);
      await page.waitForFunction(() => window.__ready === true, null, { timeout: 5000 });
      await page.evaluate((b) => window.__busy(b), busy);
      const box = await page.locator("#pad").boundingBox();
      await page.mouse.move(box.x + 40, box.y + 140);
      await page.mouse.down();
      await page.evaluate(() => { window.__samples = []; });
      for (let i = 0; i < 240; i++) { // 2 s at 120 moves a second, a sweep back and forth
        await page.mouse.move(box.x + 40 + 220 * (0.5 - 0.5 * Math.cos((i / 240) * 4 * Math.PI)), box.y + 140);
        await page.waitForTimeout(8);
      }
      const samples = await page.evaluate(() => window.__samples.slice());
      await page.mouse.up();
      samples.sort((a, b) => a - b);
      const q = (p) => samples.length ? +samples[Math.min(samples.length - 1, Math.floor(p * samples.length))].toFixed(1) : null;
      out.follow[`${mode}${busy ? ", busy" : ""}`] = { frames: samples.length, lag_px_median: q(0.5), lag_px_p95: q(0.95), lag_px_max: q(1) };
    } finally { await ctx.close(); }
  }
  // 2. scroll cost, one pair at a time
  const pairs = { "A today bar": ".bar.today", "B proposed bar": ".bar.next", "E today rim": ".stroke.today", "F proposed rim": "#windowF" };
  for (const [name, sel] of Object.entries(pairs)) {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    try {
      const page = await ctx.newPage();
      await page.goto(`${base}/p2`);
      // keep only the part under test: detach every other bar and capsule, so their writes restyle nothing
      await page.evaluate((s) => { const keep = document.querySelector(s).closest(".bar, .cap");
        document.querySelectorAll(".bar, .cap").forEach((n) => { if (n !== keep) n.remove(); }); }, sel);
      await page.waitForTimeout(300);
      await browser.startTracing(page, { categories: ["devtools.timeline"] });
      for (let i = 0; i < 60; i++) { await page.mouse.wheel(0, i < 30 ? 40 : -40); await page.waitForTimeout(33); }
      await page.waitForTimeout(400);
      const trace = JSON.parse((await browser.stopTracing()).toString());
      const ev = trace.traceEvents || trace;
      const count = (n) => ev.filter((e) => e.name === n).length;
      out.scroll[name] = { UpdateLayoutTree: count("UpdateLayoutTree"), Paint: count("Paint"), Layout: count("Layout") };
    } finally { await ctx.close(); }
  }
} finally {
  await browser.close();
  await new Promise((r) => server.close(r));
}
writeFileSync(path.join(HERE, "probe.json"), JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
