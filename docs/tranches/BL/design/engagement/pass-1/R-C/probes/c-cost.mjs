#!/usr/bin/env node
// c-cost.mjs · PORTFOLIO §6 D5-C question 1: the style-recalc cost of a transitioning `--engage` on a host holding
// N descendant nodes, `inherits: true` against `inherits: false`, in both engines. A standalone page (no library):
// the same card, the same 200 (or 2000) descendants, the scalar toggled 0 → 1 → 0 on the host twenty times on the
// press spring's own curve and clock (`--spring-press`, 120 ms; copied from scheme-spring.css:59,108), one variant
// per row:
//   inh-none    `inherits: true`, no descendant reads it
//   inh-map     `inherits: true`, every descendant maps it (opacity: 1 - 0.1 * --engage)
//   noinh       `inherits: false`, no descendant can read it
//   scale-only  no scalar: the host's own `scale` transitioned on the same clock (the HEAD shape)
// Two reads per row:
//   forced recalc  inside each rAF callback during the transitions, the time of one forced style read on the deepest
//                  descendant (`getComputedStyle(...).opacity`): the frame's pending style work, both engines. Median and
//                  p95 over every sampled frame
//   CDP (Chromium) Performance.getMetrics deltas across the twenty toggles: RecalcStyleCount, RecalcStyleDuration,
//                  LayoutCount
// Every row prints the load. Run under the D5 lock.
//   node c-cost.mjs [--engine chromium|webkit] [--n 200]
import { pw, acquireLock, load, parseArgs, browserCensus } from "../../../harness/lib.mjs";

const a = parseArgs();
const engine = a.engine === "webkit" ? "webkit" : "chromium";
const N = +(a.n ?? 200);
const SPRING = "linear(0, 0.00284 2.041%, 0.01090 4.082%, 0.02354 6.122%, 0.04014 8.163%, 0.06017 10.204%, 0.08311 12.245%, 0.10850 14.286%, 0.13590 16.327%, 0.16495 18.367%, 0.19528 20.408%, 0.22657 22.449%, 0.25855 24.490%, 0.29095 26.531%, 0.32354 28.571%, 0.35613 30.612%, 0.38852 32.653%, 0.42057 34.694%, 0.45213 36.735%, 0.48309 38.776%, 0.51333 40.816%, 0.54279 42.857%, 0.57137 44.898%, 0.59903 46.939%, 0.62572 48.980%, 0.65141 51.020%, 0.67605 53.061%, 0.69965 55.102%, 0.72219 57.143%, 0.74366 59.184%, 0.76407 61.224%, 0.78343 63.265%, 0.80175 65.306%, 0.81906 67.347%, 0.83537 69.388%, 0.85070 71.429%, 0.86509 73.469%, 0.87857 75.510%, 0.89116 77.551%, 0.90290 79.592%, 0.91382 81.633%, 0.92395 83.673%, 0.93333 85.714%, 0.94200 87.755%, 0.94999 89.796%, 0.95733 91.837%, 0.96406 93.878%, 0.97020 95.918%, 0.97581 97.959%, 1)";
const page = (variant) => {
  const inh = variant !== "noinh";
  const map = variant === "inh-map" ? ".card * { opacity: calc(1 - 0.1 * var(--engage)); }" : "";
  const host = variant === "scale-only"
    ? `.card { transition: scale 120ms ${SPRING}; } .card.on { scale: 1.04; }`
    : `.card { --engage: 0; transition: --engage 120ms ${SPRING}; scale: calc(1 + 0.04 * var(--engage)); } .card.on { --engage: 1; }`;
  // a card: N nodes, nested in rows of 10 (a realistic depth: card > row > cell > text)
  let rows = ""; for (let r = 0; r < N / 10; r++) { rows += "<div class=row>"; for (let c = 0; c < 9; c++) rows += `<span class=cell>c${r}.${c}</span>`; rows += "</div>"; }
  return `<!doctype html><html><head><style>
@property --engage { syntax: "<number>"; inherits: ${inh}; initial-value: 0; }
body { margin: 0; font: 13px system-ui; } .card { width: 600px; padding: 12px; display: grid; gap: 2px; } .row { display: flex; gap: 6px; }
${host} ${map}
</style></head><body><div class=card>${rows}</div></body></html>`;
};

const waited = await acquireLock();
console.log(`# c-cost · engine ${engine} · N ${N} descendants · lock wait ${waited.toFixed(1)} s · ${browserCensus()} · load ${load()} at start`);
const b = await pw[engine].launch({ headless: true });
console.log(`# ${engine} ${b.version()}${engine === "webkit" ? " (Playwright WebKit, not Safari; real Safari UNMEASURED (owner's safaridriver checkbox))" : ""}`);
for (const variant of ["scale-only", "noinh", "inh-none", "inh-map"]) {
  const ctx = await b.newContext({ viewport: { width: 700, height: 900 } });
  const p = await ctx.newPage();
  await p.setContent(page(variant));
  const cdp = engine === "chromium" ? await ctx.newCDPSession(p) : null;
  if (cdp) await cdp.send("Performance.enable");
  const m0 = cdp ? Object.fromEntries((await cdp.send("Performance.getMetrics")).metrics.map((x) => [x.name, x.value])) : null;
  const r = await p.evaluate(() => new Promise((ok) => {
    const card = document.querySelector(".card"); const deep = card.lastElementChild.lastElementChild;
    const t = []; let k = 0; let frames = 0; let next = performance.now();
    const tick = (now) => {
      if (now >= next) { card.classList.toggle("on"); k++; next = now + 200; }
      const t0 = performance.now(); getComputedStyle(deep).opacity; t.push(performance.now() - t0); frames++;
      if (k < 20) requestAnimationFrame(tick); else ok({ t, frames });
    };
    requestAnimationFrame(tick);
  }));
  const m1 = cdp ? Object.fromEntries((await cdp.send("Performance.getMetrics")).metrics.map((x) => [x.name, x.value])) : null;
  const s = [...r.t].sort((x, y) => x - y); const med = s[s.length >> 1], p95 = s[Math.floor(s.length * 0.95)];
  const cd = cdp ? ` · CDP over 20 toggles: RecalcStyleCount +${m1.RecalcStyleCount - m0.RecalcStyleCount}, RecalcStyleDuration +${((m1.RecalcStyleDuration - m0.RecalcStyleDuration) * 1000).toFixed(1)} ms, LayoutCount +${m1.LayoutCount - m0.LayoutCount}` : " · CDP n/a (WebKit)";
  console.log(`  REPORT     ${variant.padEnd(10)} · forced recalc per frame: median ${med.toFixed(3)} ms, p95 ${p95.toFixed(3)} ms over ${r.frames} frames${cd} · load ${load()}`);
  await ctx.close();
}
await b.close();
console.log(`# done · load ${load()} at end`);
