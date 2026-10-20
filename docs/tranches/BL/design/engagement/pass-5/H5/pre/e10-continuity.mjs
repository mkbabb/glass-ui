#!/usr/bin/env node
// E-10 · CK-20: D-1 on every engagement path: no one-frame discontinuity on an engagement transition (pass 2;
// REGISTRY §P1-6 CK-20; C-E r32, P-E/rerender-probe.md). Filmed every frame; light theme; desk.
// H3 (pass 3): every cell grades POSITION as well as scale. Pass 2 filmed x/y and graded scale only, and passed a
// hand-off whose outgoing slider jumped 68.0 px onto the incoming one's footprint (C-E2 §0.1, §4.1; REGISTRY §P2-7
// item 1). Position is each root's box CENTRE in the page frame (scale-free: an in-place grow or release moves it 0),
// and a step is read per nominal 16.7 ms frame like the scale steps.
//   own engage/release the reference: Tab into the slider (keyboard-engaged), filmed (the engage's largest one-frame
//                    centre move), +600 ms, Tab out to the after-sentinel, filmed (the release's largest one-frame scale
//                    drop and centre move). REPORT
//   escape release   Tab into the slider, +600 ms, Escape: the largest one-frame scale drop ≤ the own release's + 0.002,
//                    and the largest one-frame centre move ≤ the own release's + 1 px. Precondition: engaged at the
//                    Escape, else NOT DRIVEN
//   hand-off drop    scene with `pair` (two sliders A, B): Tab into A, +600 ms, Tab to B. The OUTGOING A: largest
//                    one-frame scale drop ≤ its own release's + 0.002 and largest one-frame centre move ≤ its own
//                    release's + 1 px; the INCOMING B: largest one-frame centre move ≤ the own engage's + 1 px. A
//                    teleport of either fails it. Precondition: A was engaged at the Tab, else NOT DRIVEN
//   hand-off rev     (H3) the same from the after-sentinel with Shift+Tab, B first, then A: the outgoing is B and the
//                    incoming A, which is EARLIER in tree order (the pass-2 composition put the incoming A on B's place
//                    for 12-17 frames, then jumped it 68 px home: C-E2 §0.1). Same bounds
//   hand-off veil    across the forward hand-off the shared veil (the row's `veil` selector, or any [data-engaged] node
//                    outside the sliders) never falls below 0.1× its level before the Tab while B takes the engagement:
//                    it does not re-ramp from 0. Precondition: a veil was up before the Tab, else REPORT (the route has
//                    no keyboard veil: Q-3's arm without one)
//   re-render landing a pointer hold on the slider, +300 ms __e.insertSibling() (a parent re-render puts a block before
//                    it), +300 ms release: the root's largest one-frame move in the page frame over the 900 ms after the
//                    release ≤ 1 px + the same release's largest move without the insert. A scene without
//                    insertSibling is UNMEASURED
//   hand-off singleton (H4, CK-15: "one engaged control") on both hand-off films: every frame counts the pair's
//                    roots matching the row's `engaged` selector (the door's one writer, default `[data-engaged]`).
//                    PASS when no frame counts more than one, the first frame's one is the outgoing root and the last
//                    frame's one is the incoming root. NOT DRIVEN (FAIL) when the outgoing root does not match the
//                    selector before the Tab. The outgoing root's exit (its scale and position) stays the drop/rev
//                    cells' (CK-20); this cell reads the engagement state, every frame. C-E3 counted it only at the end
// The sortable and tabs teleports are CK-05's continuity cell (E-4).
//   node e10-continuity.mjs --build <dir> | --fixture [--fault e10-snap|e10-teleport|e10-teleportin] [--engine webkit]
import { witness, openPage, scenesFor, center, tabKey, f } from "./lib.mjs";

const TOL = 0.002, POS = 1, ENG = 1.03, VEIL_KEEP = 0.1;
// a film of each root's scale (effective: box width over its untransformed width), its box (left/top), its box centre,
// and the veil's opacity
const filmFn = ([roots, veilSel, ms, engSel]) => new Promise((ok) => {
  const fr = []; const t0 = performance.now();
  const tick = () => {
    const els = roots.map((s) => document.querySelector(s));
    const veils = [...document.querySelectorAll(`[data-engaged]${veilSel ? `, ${veilSel}` : ""}`)].filter((e) => !els.some((r) => r && (r === e || r.contains(e))));
    const R = els.map((e) => (e ? e.getBoundingClientRect() : null));
    fr.push({ t: performance.now() - t0, s: els.map((e) => (e ? window.__eff(e).s : NaN)), y: R.map((r) => (r ? r.top : NaN)), x: R.map((r) => (r ? r.left : NaN)), cx: R.map((r) => (r ? r.left + r.width / 2 + scrollX : NaN)), cy: R.map((r) => (r ? r.top + r.height / 2 + scrollY : NaN)), veil: Math.max(0, ...veils.map((v) => +getComputedStyle(v).opacity)), eng: els.map((e) => !!e && !!engSel && e.matches(engSel)) });
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
// H3: the largest one-frame move of a root's box centre (position, scale-free); NaN frames (root absent) are skipped
const maxShift = (fr, i = 0) => Math.max(0, ...fr.slice(1).map((x, k) => perFrame(Math.hypot(x.cx[i] - fr[k].cx[i], x.cy[i] - fr[k].cy[i]), x.t - fr[k].t)).filter(Number.isFinite));
// the largest one-frame centre move with the frame it happened at, for the line
const shiftAt = (fr, i = 0) => { let b = { d: 0, t: NaN }; fr.slice(1).forEach((x, k) => { const d = perFrame(Math.hypot(x.cx[i] - fr[k].cx[i], x.cy[i] - fr[k].cy[i]), x.t - fr[k].t); if (d > b.d) b = { d, t: x.t }; }); return b; };

await witness("E-10", "CK-20 no one-frame discontinuity on an engagement path", async ({ E, T, cell, guard, idx, engine }) => {
  const single = scenesFor(idx, "E-10").filter(([, m]) => !m.pair);
  const pairs = scenesFor(idx, "E-10").filter(([, m]) => m.pair);
  const shift = engine === "webkit" ? "Alt+Shift+Tab" : "Shift+Tab";
  let ref = null;
  for (const [sc, m] of single) {
    const root = '[data-e~="root"]';
    const r = await guard(`${sc} release`, async () => {
      const out = {};
      for (const how of ["tab", "escape"]) {
        const P = await openPage(E, T, sc);
        try {
          await P.page.focus('[data-sentinel="before"]');
          const pe = P.page.evaluate(filmFn, [[root], m.veil ?? null, 560]); await P.page.waitForTimeout(32);
          await P.page.keyboard.press(tabKey(engine)); out[`${how}In`] = await pe; await P.page.waitForTimeout(40);
          const pr = P.page.evaluate(filmFn, [[root], m.veil ?? null, 900]); await P.page.waitForTimeout(32);
          if (how === "tab") await P.page.keyboard.press(tabKey(engine)); else await P.page.keyboard.press("Escape");
          out[how] = await pr;
        } finally { await P.close(); }
      }
      return out;
    });
    if (r.crashed) { cell(`E-10 ${sc} escape release`, "FAIL", r.line); continue; }
    ref = { step: maxDrop(r.tab), move: maxShift(r.tab), inMove: Math.max(maxShift(r.tabIn), maxShift(r.escapeIn)), s0: r.tab[0].s[0] };
    const e0 = r.escape[0].s[0]; const ed = maxDrop(r.escape), em = maxShift(r.escape);
    if (!(ref.s0 >= ENG)) cell(`E-10 ${sc} own release`, "REPORT", `Tab-engaged scale ×${f(ref.s0)} < ×${ENG}: the keyboard does not engage this slider, so the release has no step to film (the hand-off and Escape cells read NOT DRIVEN)`);
    else cell(`E-10 ${sc} own release`, "REPORT", `Tab in: largest one-frame centre move ${f(ref.inMove, 1)} px · Tab out of the engaged slider: ×${f(ref.s0)} → ×${f(r.tab.at(-1).s[0])}, largest one-frame drop per 16.7 ms ${f(ref.step, 4)}, largest centre move ${f(ref.move, 1)} px (the references for the hand-off and Escape bounds)`);
    if (!(e0 >= ENG)) cell(`E-10 ${sc} escape release`, "FAIL", `NOT DRIVEN: the slider was not keyboard-engaged at the Escape (×${f(e0)} < ×${ENG})`);
    else cell(`E-10 ${sc} escape release`, ed <= ref.step + TOL && em <= ref.move + POS ? "PASS" : "FAIL", `Escape: ×${f(e0)} → ×${f(r.escape.at(-1).s[0])}, largest one-frame drop per 16.7 ms ${f(ed, 4)} (bound ≤ own release ${f(ref.step, 4)} + ${TOL}), largest centre move ${f(em, 1)} px (bound ≤ own release ${f(ref.move, 1)} + ${POS} px)`);
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
    const step = ref?.step ?? NaN, move = ref?.move ?? NaN, inMove = ref?.inMove ?? NaN;
    for (const dir of ["fwd", "rev"]) {
      const r = await guard(`${sc} hand-off ${dir}`, async () => {
        const P = await openPage(E, T, sc);
        try {
          const key = dir === "fwd" ? tabKey(engine) : shift;
          await P.page.focus(dir === "fwd" ? '[data-sentinel="before"]' : '[data-sentinel="after"]'); await P.page.keyboard.press(key); await P.page.waitForTimeout(600);
          const pr = P.page.evaluate(filmFn, [m.pair, m.veil ?? null, 900, m.engaged ?? "[data-engaged]"]); await P.page.waitForTimeout(32);
          await P.page.keyboard.press(key);
          return { fr: await pr, focus: await P.page.evaluate(() => document.activeElement?.getAttribute("aria-label") ?? document.activeElement?.tagName) };
        } finally { await P.close(); }
      });
      const name = dir === "fwd" ? `E-10 ${sc} hand-off drop` : `E-10 ${sc} hand-off rev`;
      if (r.crashed) { cell(name, "FAIL", r.line); continue; }
      const fr = r.fr; const [o, n] = dir === "fwd" ? [0, 1] : [1, 0]; const ON = "AB"[o], IN = "AB"[n];
      const o0 = fr[0].s[o], v0 = fr[0].veil;
      if (!(o0 >= ENG) && !(v0 > 0.5)) cell(name, "FAIL", `NOT DRIVEN: ${ON} was not engaged at the ${dir === "fwd" ? "Tab" : "Shift+Tab"} (×${f(o0)}, veil ${f(v0, 2)})`);
      else {
        const dO = maxDrop(fr, o), mO = shiftAt(fr, o), mN = shiftAt(fr, n);
        const ok = dO <= step + TOL && mO.d <= move + POS && mN.d <= inMove + POS;
        cell(name, ok ? "PASS" : "FAIL", `${dir === "fwd" ? "Tab A → B" : "Shift+Tab B → A"} (focus on ${r.focus}) · outgoing ${ON} ×${f(o0)} → ×${f(fr.at(-1).s[o])}, largest one-frame drop per 16.7 ms ${f(dO, 4)} (bound ≤ own release ${f(step, 4)} + ${TOL}), largest centre move ${f(mO.d, 1)} px at ${f(mO.t, 0)} ms (bound ≤ own release ${f(move, 1)} + ${POS} px) · incoming ${IN} ×${f(fr[0].s[n])} → ×${f(fr.at(-1).s[n])}, largest centre move ${f(mN.d, 1)} px at ${f(mN.t, 0)} ms (bound ≤ own engage ${f(inMove, 1)} + ${POS} px)`);
      }
      // CK-15: the engaged count at every frame of the hand-off
      {
        const sn = `E-10 ${sc} hand-off singleton ${dir}`; const sel = m.engaged ?? "[data-engaged]";
        const cnt = fr.map((x) => x.eng.filter(Boolean).length); const mx = Math.max(...cnt);
        const over = fr.filter((x, k) => cnt[k] > 1); const first = fr[0].eng, last = fr.at(-1).eng;
        const zero = cnt.filter((c) => c === 0).length;
        if (!first[o]) cell(sn, "FAIL", `NOT DRIVEN: the outgoing ${ON} does not match ${sel} before the ${dir === "fwd" ? "Tab" : "Shift+Tab"} (the route marks no engagement on the root)`);
        else cell(sn, mx <= 1 && last[n] && !last[o] ? "PASS" : "FAIL", `${fr.length} frames: engaged roots per frame max ${mx}${over.length ? ` (${over.length} frame(s) with two, first at ${f(over[0].t, 0)} ms)` : ""}, ${zero} frame(s) with none · first frame ${ON} engaged ${first[o]}, ${IN} ${first[n]} · last frame ${IN} engaged ${last[n]}, ${ON} ${last[o]} (bound: at most one engaged on every frame, the incoming one at the end; selector ${sel})`);
      }
      if (dir !== "fwd") continue;
      if (!(v0 > 0.05)) cell(`E-10 ${sc} hand-off veil`, "REPORT", `no veil up before the Tab (${f(v0, 2)}): this route veils no keyboard engagement`);
      else { const vmin = Math.min(...fr.map((x) => x.veil)); cell(`E-10 ${sc} hand-off veil`, vmin >= VEIL_KEEP * v0 ? "PASS" : "FAIL", `veil ${f(v0, 2)} before the Tab, minimum ${f(vmin, 2)} across the hand-off, ${f(fr.at(-1).veil, 2)} at the end (bound ≥ ${VEIL_KEEP}× its level: it does not re-ramp from 0)`); }
    }
  }
});
