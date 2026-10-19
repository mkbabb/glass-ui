#!/usr/bin/env node
// P-E4 (forked from pass-3/E3/probe, unchanged but for this line) diagnostic: the keyboard hand-off filmed per frame on the probe app (slider2), both hosts: left edge, width,
// centre x/y, effective scale, popover state, and the host's own footprint's box. Prints every frame where a host's
// left edge or centre moves more than 2 px, so a one-frame step can be read as grow (width) or travel (centre).
//   node handoff-film.mjs --build <out>/builds/probe-<label> --engine chromium|webkit --label <l> [--how fwd|rev]
import { parseArgs, serveTarget, Engine, openPage, acquireLock, load, f, tabKey } from "../../../harness/lib.mjs";
const a = parseArgs(); const engine = a.engine ?? "chromium"; const how = a.how ?? "fwd";
const shift = engine === "webkit" ? "Alt+Shift+Tab" : "Shift+Tab";
const film = (ms) => new Promise((ok) => {
  const sel = ['[data-t="slider-a"] .glass-slider', '[data-t="slider-b"] .glass-slider'];
  const fr = []; const t0 = performance.now();
  const tick = () => {
    fr.push({ t: performance.now() - t0, h: sel.map((s) => { const e = document.querySelector(s); const r = e.getBoundingClientRect(); const fp = e.previousElementSibling?.classList.contains("engage-footprint") ? e.previousElementSibling.getBoundingClientRect() : null; return { l: r.left, w: r.width, cx: (r.left + r.right) / 2, cy: (r.top + r.bottom) / 2, s: r.width / (parseFloat(getComputedStyle(e).width) || r.width), pop: e.matches(":popover-open"), grow: getComputedStyle(e).getPropertyValue("--rung-grow").trim(), fpcx: fp ? (fp.left + fp.right) / 2 : null, fpcy: fp ? (fp.top + fp.bottom) / 2 : null }; }) });
    if (performance.now() - t0 < ms) requestAnimationFrame(tick); else ok(fr);
  };
  requestAnimationFrame(tick);
});
await acquireLock();
console.log(`handoff-film ${a.label} ${engine} ${how} · load ${load()} at start`);
const T = await serveTarget({ build: a.build }); const E = new Engine(engine);
try {
  const P = await openPage(E, T, "slider2");
  try {
    const { page } = P;
    if (how === "rev") { await page.focus('[data-sentinel="after"]'); await page.keyboard.press(shift); } else { await page.focus('[data-sentinel="before"]'); await page.keyboard.press(tabKey(engine)); }
    await page.waitForTimeout(600);
    const pr = page.evaluate(film, 700); await page.waitForTimeout(32);
    await page.keyboard.press(how === "rev" ? shift : tabKey(engine));
    const fr = await pr;
    console.log(`frames ${fr.length}, median dt ${f(fr.slice(1).map((x, k) => x.t - fr[k].t).sort((p, q) => p - q)[fr.length >> 1], 1)} ms`);
    for (let k = 1; k < fr.length; k++) for (const i of [0, 1]) {
      const x = fr[k].h[i], y = fr[k - 1].h[i];
      const dl = x.l - y.l, dcx = x.cx - y.cx, dcy = x.cy - y.cy;
      if (Math.abs(dl) > 2 || Math.abs(dcx) > 1 || Math.abs(dcy) > 1)
        console.log(`  t ${f(fr[k].t, 0)} (dt ${f(fr[k].t - fr[k - 1].t, 1)}) ${"AB"[i]}: left ${f(y.l, 1)}→${f(x.l, 1)} width ${f(y.w, 1)}→${f(x.w, 1)} s ${f(y.s)}→${f(x.s)} grow ${y.grow}→${x.grow} centre (${f(y.cx, 1)},${f(y.cy, 1)})→(${f(x.cx, 1)},${f(x.cy, 1)}) pop ${y.pop}→${x.pop} footprint centre ${x.fpcx == null ? "none" : `(${f(x.fpcx, 1)},${f(x.fpcy, 1)})`}`);
    }
  } finally { await P.close(); }
} finally { await E.close(); T.close(); }
console.log(`handoff-film done · load ${load()}`);
