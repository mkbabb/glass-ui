#!/usr/bin/env node
// C-E5 adversarial probe (D5 pass 5, the fresh critic of the composition A+E). Not a scoring read of a witness: each
// cell is scored against the CK row it would break, in C-E5.md. App: ce5-App.vue (built with build.mjs --app). One
// browser per run, a context per cell, every page/context/browser closed in finally (lib.mjs openPage/Engine); the
// WebKit engine relaunches every NAV_CAP (60) navigations (H3-1). Films take no screenshot.
//   node ce5-probe.mjs --build <out>/builds/ce5-<arm> --label <arm> [--engine chromium|webkit]
// Cells, CK-20 (P-E5's cure: stage.ts watchPlace, an IntersectionObserver on the rest box whose root margin is cut to
// the box, re-armed at threshold 1, or at the box's own ratio when a clipping scroller holds the ratio under 1):
//   clipped stale place · <path> · <side> · <dir>
//     path keyboard (Tab: promoted on every arm; the rest box is the footprint) or pointer (a mouse hold: in place on
//     coarse, so the rest box is the host; promoted on every). The box is scrolled so the rest box's <side> (top or
//     bottom) is clipped by the scroller's edge, 70 % of its height hidden. Then the spacer above the slider is set
//     by STYLE so the slider moves d = hidden − 2 px:
//       reveal  toward the visible side (top clip: down; bottom clip: up): the box's visible area is unchanged, so
//               its ratio does not change and, by the code, the observer reports nothing
//       conceal away from it: the ratio drops and the observer reports
//       control no move
//     400 ms later a node is appended to the ticker below the box (a childList mutation that moves nothing), and the
//     host is filmed per frame across it for 900 ms. Its place did not change at the append, so the bound is the
//     hand-off's: largest one-frame move ≤ 4 px per 16.7 ms. Precondition (else FAIL NOT DRIVEN): engaged throughout,
//     the rest box clipped before the move, and the move landed (|Δ| within 1 px of d; 0 for the control)
import { parseArgs, serveTarget, Engine, openPage, acquireLock, load, f, tabKey } from "../../../harness/lib.mjs";

const a = parseArgs();
const engine = typeof a.engine === "string" ? a.engine : "chromium";
const label = typeof a.label === "string" ? a.label : "probe";
const out = [];
const cell = (name, v, line) => { const s = `  ${v.padEnd(10)} ${name} · ${line} · load ${load()}`; out.push(s); console.log(s); };
const NOM = 1000 / 60, STEP = 4, SPACER = 60;
const A = '[data-t="slider-a"] .glass-slider';

const film = ([sel, ms]) => new Promise((ok) => {
  const fr = []; const t0 = performance.now();
  const tick = () => { const e = document.querySelector(sel); const r = e.getBoundingClientRect(); fr.push({ t: performance.now() - t0, x: r.left, y: r.top, eng: e.hasAttribute("data-engaged") }); if (performance.now() - t0 < ms) requestAnimationFrame(tick); else ok(fr); };
  requestAnimationFrame(tick);
});
const steps = (fr) => fr.slice(1).map((x, k) => ({ t: x.t, d: (Math.hypot(x.y - fr[k].y, x.x - fr[k].x) * NOM) / Math.max(NOM, x.t - fr[k].t), dy: x.y - fr[k].y }));
// the rest box: the footprint a promotion leaves in flow, else the host engaged in place
const restOf = (sel) => { const h = document.querySelector(sel); const fp = h.previousElementSibling?.classList.contains("engage-footprint") ? h.previousElementSibling : null; return fp ?? h; };
const read = ([sel]) => {
  const h = document.querySelector(sel); const fp = h.previousElementSibling?.classList.contains("engage-footprint") ? h.previousElementSibling : null; const rest = fp ?? h;
  const b = document.querySelector('[data-t="box"]'); const br = b.getBoundingClientRect(); const visTop = br.top + b.clientTop, visBot = visTop + b.clientHeight;
  const r = rest.getBoundingClientRect(); const hr = h.getBoundingClientRect();
  const vis = Math.max(0, Math.min(r.bottom, visBot) - Math.max(r.top, visTop));
  return { eng: h.hasAttribute("data-engaged"), pop: h.matches(":popover-open"), rest: fp ? "footprint" : "host", top: r.top, bottom: r.bottom, h: r.height, vis, visTop, visBot, hostTop: hr.top, sx: hr.width / h.offsetWidth };
};
// scroll the box so `side` of the rest box is `hidden` px past the scroller's edge
const clip = ([sel, side, frac]) => {
  const h = document.querySelector(sel); const fp = h.previousElementSibling?.classList.contains("engage-footprint") ? h.previousElementSibling : null; const rest = fp ?? h;
  const b = document.querySelector('[data-t="box"]'); const br = b.getBoundingClientRect(); const visTop = br.top + b.clientTop, visBot = visTop + b.clientHeight;
  const r = rest.getBoundingClientRect(); const hidden = Math.round(r.height * frac);
  b.scrollTop += side === "top" ? r.top - (visTop - hidden) : r.bottom - (visBot + hidden);
  return hidden;
};

await acquireLock();
console.log(`C-E5 probe ${label} · ${engine} · load ${load()} at start`);
const T = await serveTarget({ build: a.build });
const E = new Engine(engine);
try {
  for (const how of ["keyboard", "pointer"]) for (const side of ["top", "bottom"]) for (const dir of ["reveal", "conceal", "control"]) {
    const P = await openPage(E, T, "clipstale");
    try {
      const { page } = P;
      let hidden = 0, held = false;
      if (how === "keyboard") {
        await page.focus('[data-sentinel="before"]'); await page.keyboard.press(tabKey(engine)); await page.waitForTimeout(600);
        hidden = await page.evaluate(clip, [A, side, 0.7]);
      } else {
        // v2: a mouse hold on the slider in view, then the box scrolled to clip it (v1 clipped first, and the press
        // scrolled the box back to the control, so its pointer cells were not driven: logs/*-v1-*)
        const p = await page.evaluate(([sel]) => { const r = document.querySelector(sel).getBoundingClientRect(); return { x: r.left + r.width * 0.5, y: r.top + r.height / 2 }; }, [A]);
        await page.mouse.move(p.x, p.y); await page.mouse.down(); held = true;
        await page.waitForTimeout(400);
        hidden = await page.evaluate(clip, [A, side, 0.7]);
      }
      await page.waitForTimeout(500);
      const s0 = await page.evaluate(read, [A]);
      const d = Math.max(2, hidden - 2);
      // top clip: down reveals (the spacer grows); bottom clip: up reveals (the spacer shrinks)
      const sign = dir === "control" ? 0 : (side === "top") === (dir === "reveal") ? 1 : -1;
      if (sign) await page.evaluate((g) => window.__e.grow(g), SPACER + sign * d);
      await page.waitForTimeout(400);
      const s1 = await page.evaluate(read, [A]);
      const pr = page.evaluate(film, [A, 900]);
      await page.waitForTimeout(80);
      await page.evaluate(() => window.__e.tick());
      const fr = await pr;
      if (held) await page.mouse.up();
      const st = steps(fr); const worst = st.reduce((m, x) => (x.d > m.d ? x : m), { d: 0, t: 0, dy: 0 });
      const moved = s1.top - s0.top;
      const clipped = s0.vis > 0 && s0.vis < s0.h - 0.5;
      const landed = Math.abs(Math.abs(moved) - (sign ? d : 0)) <= 1;
      const driven = s0.eng && fr.every((x) => x.eng) && clipped && landed;
      cell(`clipped stale place · ${how} · ${side} · ${dir}`, !driven ? "FAIL NOT DRIVEN" : worst.d <= STEP ? "PASS" : "FAIL",
        `engaged ${s0.eng} (top layer ${s0.pop}, ×${f(s0.sx)}, rest box = ${s0.rest}, ${f(s0.h, 1)} px tall, ${f(s0.vis, 1)} px visible in the scroller) · ${sign ? `spacer ${sign > 0 ? "+" : "−"}${d} px by style (${dir})` : "no move (control)"}: rest box top ${f(s0.top, 1)} → ${f(s1.top, 1)} px (Δ ${f(moved, 1)}), ${f(s1.vis, 1)} px visible · then a node appended below the box: over ${fr.length} frames the host's largest one-frame move ${f(worst.d, 1)} px at +${f(worst.t, 0)} ms (dy ${f(worst.dy, 1)}) (bound ≤ ${STEP} per 16.7 ms)`);
    } finally { await P.close(); }
  }
} finally {
  await E.close();
  T.close();
}
const fails = out.filter((l) => /^\s+FAIL/.test(l)).length;
const passes = out.filter((l) => /^\s+PASS/.test(l)).length;
console.log(`ce5-probe ${label} ${engine} · ${passes} pass, ${fails} fail, ${out.length - passes - fails} other · load ${load()} at end`);
process.exit(fails ? 1 : 0);
