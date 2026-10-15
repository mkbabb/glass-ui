#!/usr/bin/env node
// E-10 · CK-20: D-1 on every engagement path: no one-frame discontinuity on an engagement transition (pass 2;
// REGISTRY §P1-6 CK-20; C-E r32, P-E/rerender-probe.md). Filmed every frame; light theme; desk.
//   own release      the reference: Tab into the slider (keyboard-engaged), +600 ms, Tab out to the after-sentinel:
//                    the largest one-frame drop of the root's scale while it returns to rest
//   hand-off drop    scene with `pair` (two sliders A, B): Tab into A, +600 ms, Tab to B. A's largest one-frame scale
//                    drop must be no larger than its own release's largest step + 0.002 (A hands over, it does not
//                    snap). Precondition: A was engaged at the Tab (scale ≥ ×1.03 or a veil up), else NOT DRIVEN
//   hand-off veil    across the same hand-off the shared veil (the row's `veil` selector, or any [data-engaged] node
//                    outside the sliders) never falls below 0.1× its level before the Tab while B takes the engagement:
//                    it does not re-ramp from 0. Precondition: a veil was up before the Tab, else REPORT (the route has
//                    no keyboard veil: Q-3's arm without one)
//   escape release   Tab into the slider, +600 ms, Escape: the largest one-frame scale drop ≤ the own release's
//                    largest step + 0.002. Precondition: engaged at the Escape, else NOT DRIVEN
//   re-render landing a pointer hold on the slider, +300 ms __e.insertSibling() (a parent re-render puts a block before
//                    it), +300 ms release: the root's largest one-frame move in the page frame over the 900 ms after the
//                    release ≤ 1 px + the same release's largest move without the insert. A scene without
//                    insertSibling is UNMEASURED
// The sortable and tabs teleports are CK-05's continuity cell (E-4).
//   node e10-continuity.mjs --build <dir> | --fixture [--fault e10-snap] [--engine webkit]
import { witness, openPage, scenesFor, center, tabKey, f } from "./lib.mjs";

const TOL = 0.002, ENG = 1.03, VEIL_KEEP = 0.1;
// a film of each root's scale (effective: box width over its untransformed width) and the veil's opacity
const filmFn = ([roots, veilSel, ms]) => new Promise((ok) => {
  const fr = []; const t0 = performance.now();
  const tick = () => {
    const els = roots.map((s) => document.querySelector(s));
    const veils = [...document.querySelectorAll(`[data-engaged]${veilSel ? `, ${veilSel}` : ""}`)].filter((e) => !els.some((r) => r && (r === e || r.contains(e))));
    fr.push({ t: performance.now() - t0, s: els.map((e) => (e ? window.__eff(e).s : NaN)), y: els.map((e) => (e ? e.getBoundingClientRect().top : NaN)), x: els.map((e) => (e ? e.getBoundingClientRect().left : NaN)), veil: Math.max(0, ...veils.map((v) => +getComputedStyle(v).opacity)) });
    if (performance.now() - t0 < ms) requestAnimationFrame(tick); else ok(fr);
  };
  requestAnimationFrame(tick);
});
// every one-frame step is read per nominal frame (16.7 ms): a step over a frame of dt ms counts step × 16.7 / max(16.7,
// dt). A spring's step grows with a janky frame; a snap does not shrink below its own size on a normal one. Without
// this the bound compared two runs' frame pacing: the clean fixture's Escape release read 0.0098 against 0.0085 at
// load 465 in WebKit (pass-2/H2.md §2.1), a lawful spring on a long frame
const NOM = 1000 / 60;
const perFrame = (d, dt) => (d * NOM) / Math.max(NOM, dt);
const maxDrop = (fr, i = 0) => Math.max(0, ...fr.slice(1).map((x, k) => perFrame(fr[k].s[i] - x.s[i], x.t - fr[k].t)));
const maxMove = (fr, i = 0) => Math.max(0, ...fr.slice(1).map((x, k) => perFrame(Math.hypot(x.y[i] - fr[k].y[i], x.x[i] - fr[k].x[i]), x.t - fr[k].t)));

await witness("E-10", "CK-20 no one-frame discontinuity on an engagement path", async ({ E, T, cell, guard, idx, engine }) => {
  const single = scenesFor(idx, "E-10").filter(([, m]) => !m.pair);
  const pairs = scenesFor(idx, "E-10").filter(([, m]) => m.pair);
  let ref = null;
  for (const [sc, m] of single) {
    const root = '[data-e~="root"]';
    const r = await guard(`${sc} release`, async () => {
      const out = {};
      for (const how of ["tab", "escape"]) {
        const P = await openPage(E, T, sc);
        try {
          await P.page.focus('[data-sentinel="before"]'); await P.page.keyboard.press(tabKey(engine)); await P.page.waitForTimeout(600);
          const pr = P.page.evaluate(filmFn, [[root], m.veil ?? null, 900]); await P.page.waitForTimeout(32);
          if (how === "tab") await P.page.keyboard.press(tabKey(engine)); else await P.page.keyboard.press("Escape");
          out[how] = await pr;
        } finally { await P.close(); }
      }
      return out;
    });
    if (r.crashed) { cell(`E-10 ${sc} escape release`, "FAIL", r.line); continue; }
    ref = { step: maxDrop(r.tab), s0: r.tab[0].s[0] };
    const e0 = r.escape[0].s[0]; const ed = maxDrop(r.escape);
    if (!(ref.s0 >= ENG)) cell(`E-10 ${sc} own release`, "REPORT", `Tab-engaged scale ×${f(ref.s0)} < ×${ENG}: the keyboard does not engage this slider, so the release has no step to film (the hand-off and Escape cells read NOT DRIVEN)`);
    else cell(`E-10 ${sc} own release`, "REPORT", `Tab out of the engaged slider: ×${f(ref.s0)} → ×${f(r.tab.at(-1).s[0])}, largest one-frame drop per 16.7 ms ${f(ref.step, 4)} (the reference for the hand-off and Escape bounds)`);
    if (!(e0 >= ENG)) cell(`E-10 ${sc} escape release`, "FAIL", `NOT DRIVEN: the slider was not keyboard-engaged at the Escape (×${f(e0)} < ×${ENG})`);
    else cell(`E-10 ${sc} escape release`, ed <= ref.step + TOL ? "PASS" : "FAIL", `Escape: ×${f(e0)} → ×${f(r.escape.at(-1).s[0])}, largest one-frame drop per 16.7 ms ${f(ed, 4)} (bound ≤ own release ${f(ref.step, 4)} + ${TOL})`);
    // the re-render landing
    const rr = await guard(`${sc} rerender`, async () => {
      const out = {};
      for (const ins of [false, true]) {
        const P = await openPage(E, T, sc);
        try {
          if (ins && !(await P.page.evaluate(() => typeof window.__e.insertSibling === "function"))) return { none: true };
          const c = await center(P.page, '[data-e~="thumb"]');
          await P.page.mouse.move(c.x, c.y); await P.page.mouse.down(); await P.page.waitForTimeout(300);
          if (ins) await P.page.evaluate(() => window.__e.insertSibling());
          await P.page.waitForTimeout(300);
          const pr = P.page.evaluate(filmFn, [[root], m.veil ?? null, 900]); await P.page.waitForTimeout(32);
          await P.page.mouse.up(); out[ins ? "ins" : "base"] = await pr;
        } finally { await P.close(); }
      }
      return out;
    });
    if (rr.crashed) cell(`E-10 ${sc} re-render landing`, "FAIL", rr.line);
    else if (rr.none) cell(`E-10 ${sc} re-render landing`, "UNMEASURED", "the scene has no __e.insertSibling() (a parent re-render cannot be driven)");
    else { const b = maxMove(rr.base), mv = maxMove(rr.ins); cell(`E-10 ${sc} re-render landing`, mv <= b + 1 ? "PASS" : "FAIL", `a sibling inserted during the hold, then release: the root's largest one-frame move per 16.7 ms ${f(mv, 1)} px (without the insert ${f(b, 1)} px; bound ≤ that + 1 px)`); }
  }
  for (const [sc, m] of pairs) {
    const r = await guard(`${sc} hand-off`, async () => {
      const P = await openPage(E, T, sc);
      try {
        await P.page.focus('[data-sentinel="before"]'); await P.page.keyboard.press(tabKey(engine)); await P.page.waitForTimeout(600);
        const pr = P.page.evaluate(filmFn, [m.pair, m.veil ?? null, 900]); await P.page.waitForTimeout(32);
        await P.page.keyboard.press(tabKey(engine));
        return { fr: await pr, focus: await P.page.evaluate(() => document.activeElement?.getAttribute("aria-label") ?? document.activeElement?.tagName) };
      } finally { await P.close(); }
    });
    if (r.crashed) { cell(`E-10 ${sc} hand-off drop`, "FAIL", r.line); continue; }
    const fr = r.fr; const a0 = fr[0].s[0], v0 = fr[0].veil;
    const step = ref?.step ?? NaN;
    if (!(a0 >= ENG) && !(v0 > 0.5)) cell(`E-10 ${sc} hand-off drop`, "FAIL", `NOT DRIVEN: A was not engaged at the Tab (×${f(a0)}, veil ${f(v0, 2)})`);
    else cell(`E-10 ${sc} hand-off drop`, maxDrop(fr, 0) <= step + TOL ? "PASS" : "FAIL", `Tab A → B (focus on ${r.focus}): A ×${f(a0)} → ×${f(fr.at(-1).s[0])}, largest one-frame drop per 16.7 ms ${f(maxDrop(fr, 0), 4)} (bound ≤ A's own release ${f(step, 4)} + ${TOL}) · B ×${f(fr[0].s[1])} → ×${f(fr.at(-1).s[1])}`);
    if (!(v0 > 0.05)) cell(`E-10 ${sc} hand-off veil`, "REPORT", `no veil up before the Tab (${f(v0, 2)}): this route veils no keyboard engagement`);
    else { const vmin = Math.min(...fr.map((x) => x.veil)); cell(`E-10 ${sc} hand-off veil`, vmin >= VEIL_KEEP * v0 ? "PASS" : "FAIL", `veil ${f(v0, 2)} before the Tab, minimum ${f(vmin, 2)} across the hand-off, ${f(fr.at(-1).veil, 2)} at the end (bound ≥ ${VEIL_KEEP}× its level: it does not re-ramp from 0)`); }
  }
});
