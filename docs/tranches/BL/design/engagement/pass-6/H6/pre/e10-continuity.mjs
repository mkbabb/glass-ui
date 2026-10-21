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
//   H5 (pass 5; REGISTRY §P4-7 items 1, 7, 8):
//   re-render landing (layout-only) the landing driven by a LAYOUT move with no childList mutation: a pointer hold,
//                    +300 ms `__e.grow(40)` (a style write on a spacer before the slider), +300 ms release; the same
//                    bound as the insert landing. The insert landing alone could not fail for a stage that re-reads
//                    place only on a mutation (C-E4 §4.2). Plant `e10-relayout`
//   stale place      C-E4's cell, on scenes with `stale` (the `restale` scene: a paragraph, a spacer, the slider, a ticker
//                    below it): engaged (keyboard: Tab; pointer: a mouse hold on the thumb), +600 ms, the spacer grows
//                    120 px by a STYLE write (a layout move, no childList mutation), +400 ms, then filmed 900 ms across an
//                    unrelated append BELOW the slider (`__e.tick()`, a childList mutation that moves nothing): the root's
//                    largest one-frame centre move ≤ 4 px per 16.7 ms. `stale place control` (no spacer write) must
//                    pass; `stale place (viewport resize)` narrows the viewport to 380 px (the paragraph rewraps: a layout
//                    move a person makes) in place of the spacer write. Precondition: engaged before and on every frame of
//                    the film, else NOT DRIVEN. Plants `e10-stale` (place re-read on childList only), `e10-staleresize`
//                    (re-read on the spacer's style too, but not on a viewport resize)
//   rebound          C-A4's `rebound` made a cell (CK-20 × CK-12), on scenes with `rebound` (members whose
//                    programmatic commit toggles): a commit, then its reverse G ms later (G = 60, 200), filmed 900 ms per
//                    frame: the light seat's opacity × alpha (the row's `light` selector, else the face's
//                    [data-engage-light], else the target's ::after). FAIL when the light, mid-flight (> 0.01), holds
//                    still (±0.0005 a frame) for ≥ 60 ms, or the two commits give fewer than 2 pulses (local maxima
//                    above 0.02). The single commit is REPORT: its onset and peak against ACKNOWLEDGE_WINDOW_MS (150).
//                    UNMEASURED when the single commit lights no seat (> 0.02): the cell films a light that exists, and
//                    E-2 owns its existence. Plant `e10-rebound` (a light transition held by a 120 ms delay, the
//                    fill-clock class C-A4 §0.2 found)
// The sortable and tabs teleports are CK-05's continuity cell (E-4).
//   node e10-continuity.mjs --build <dir> | --fixture [--fault e10-snap|e10-teleport|e10-teleportin] [--engine webkit]
import { witness, openPage, scenesFor, center, tabKey, f } from "./lib.mjs";

const TOL = 0.002, POS = 1, ENG = 1.03, VEIL_KEEP = 0.1;
// H5: C-E4's stale-place step bound (px per 16.7 ms), and C-A4's rebound bounds
const STALE = 4, FREEZE = 60, PULSE = 0.02, LIT = 0.01, FLAT = 0.0005, ACK = 150;
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
  const all = scenesFor(idx, "E-10");
  const single = all.filter(([, m]) => !m.pair && !m.stale && !m.rebound);
  const pairs = all.filter(([, m]) => m.pair);
  const stales = all.filter(([, m]) => m.stale);
  const rebounds = all.filter(([, m]) => m.rebound);
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
    // H5: the same landing driven by a layout-only move (a style write, no childList mutation)
    const lo = await guard(`${sc} relayout`, async () => {
      const out = {};
      for (const grow of [false, true]) {
        const P = await openPage(E, T, sc);
        try {
          if (grow && !(await P.page.evaluate(() => typeof window.__e.grow === "function"))) return { none: true };
          const c = await center(P.page, '[data-e~="thumb"]');
          await P.page.mouse.move(c.x, c.y); await P.page.mouse.down(); await P.page.waitForTimeout(300);
          let y0 = null, y1 = null;
          if (grow) { y0 = await P.page.evaluate(() => document.querySelector('[data-e~="root"]').getBoundingClientRect().top); await P.page.evaluate(() => window.__e.grow(40)); }
          await P.page.waitForTimeout(300);
          if (grow) y1 = await P.page.evaluate(() => document.querySelector('[data-e~="root"]').getBoundingClientRect().top);
          const pr = P.page.evaluate(filmFn, [[root], m.veil ?? null, 900]); await P.page.waitForTimeout(32);
          await P.page.mouse.up(); out[grow ? "grow" : "base"] = await pr; if (grow) out.moved = [y0, y1];
        } finally { await P.close(); }
      }
      return out;
    });
    const nmL = `E-10 ${sc} re-render landing (layout-only)`;
    if (lo.crashed) cell(nmL, "FAIL", lo.line);
    else if (lo.none) cell(nmL, "UNMEASURED", "the scene has no __e.grow() (a layout-only move cannot be driven)");
    else {
      const b = maxMove(lo.base), mv = maxMove(lo.grow), fin = lo.grow.at(-1).y[0];
      cell(nmL, mv <= b + 1 ? "PASS" : "FAIL", `a spacer before the slider grown 40 px by a style write during the hold (no childList mutation; the root's top read ${f(lo.moved[0], 1)} → ${f(lo.moved[1], 1)} px during the hold, ${f(fin, 1)} px at the film's end), then release: the root's largest one-frame move per 16.7 ms ${f(mv, 1)} px (without the move ${f(b, 1)} px; bound ≤ that + 1 px)`);
    }
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
  // ── H5: C-E4's stale place, a style move then an unrelated append, and its viewport-resize twin ──────────
  for (const [sc, m] of stales) {
    const root = '[data-e~="root"]', eng = m.engaged ?? "[data-engaged]";
    for (const how of ["keyboard", "pointer"]) {
      for (const grow of how === "keyboard" ? [120, 0, "resize"] : [120, 0]) {
        const name = `E-10 ${sc} stale place${grow === "resize" ? " (viewport resize)" : grow ? "" : " control"} · ${how}`;
        const r = await guard(name, async () => {
          const P = await openPage(E, T, sc);
          try {
            const { page } = P; let held = false;
            if (how === "keyboard") { await page.focus('[data-sentinel="before"]'); await page.keyboard.press(tabKey(engine)); }
            else { const c = await center(page, '[data-e~="thumb"]'); await page.mouse.move(c.x, c.y); await page.mouse.down(); held = true; }
            try {
              await page.waitForTimeout(600);
              const at = () => page.evaluate(([s, e]) => { const el = document.querySelector(s); const b = el.getBoundingClientRect(); return { y: b.top + b.height / 2 + scrollY, x: b.left + b.width / 2 + scrollX, eng: el.matches(e) }; }, [root, eng]);
              const s0 = await at();
              if (grow === "resize") await page.setViewportSize({ width: 380, height: 500 });
              else if (grow) await page.evaluate((g) => window.__e.grow(g), grow);
              await page.waitForTimeout(400);
              const s1 = await at();
              const pr = page.evaluate(filmFn, [[root], m.veil ?? null, 900, eng]);
              await page.waitForTimeout(80);
              await page.evaluate(() => window.__e.tick());
              return { s0, s1, fr: await pr };
            } finally { if (held) await page.mouse.up(); }
          } finally { await P.close(); }
        });
        if (r.crashed) { cell(name, "FAIL", r.line); continue; }
        const { s0, s1, fr } = r; const w = shiftAt(fr);
        const ys = fr.map((x) => x.cy[0]).filter(Number.isFinite);
        const driven = s0.eng && fr.every((x) => x.eng[0]);
        const what = grow === "resize" ? "viewport 700 → 380 px wide (the paragraph above rewraps)" : grow ? `spacer +${grow} px by a style write` : "no layout move (the control)";
        cell(name, !driven ? "FAIL" : w.d <= STALE ? "PASS" : "FAIL", `${driven ? "" : `NOT DRIVEN: the root was not engaged before and on every frame (${eng}: before ${s0.eng}, ${fr.filter((x) => x.eng[0]).length} of ${fr.length} frames) · `}${how} engaged · ${what}: the root's centre ${f(s0.y, 1)} → ${f(s1.y, 1)} px · then a node appended below it (moves nothing): over ${fr.length} frames its centre spans ${f(Math.min(...ys), 1)}..${f(Math.max(...ys), 1)} px, largest one-frame move per 16.7 ms ${f(w.d, 1)} px${w.d > 0 ? ` at +${f(w.t, 0)} ms` : ""} (bound ≤ ${STALE} px)`);
      }
    }
  }
  // ── H5: C-A4's rebound, a commit reversed G ms later, made a cell (CK-20 × CK-12) ───────────────────────
  const reboundFilm = ([gap, lightSel, ms]) => new Promise((res) => {
    const target = document.querySelector('[data-e~="target"]'); const face = document.querySelector('[data-e~="face"]') ?? target;
    const seat = () => { const s = lightSel ? face?.querySelector(lightSel) ?? document.querySelector(lightSel) : face?.querySelector("[data-engage-light]"); return s ? [s, null] : [target, "::after"]; };
    const rd = () => { const [el, ps] = seat(); if (!el) return null; const cs = getComputedStyle(el, ps); if (ps && (cs.content === "none" || cs.display === "none")) return 0; const c = window.__rgba(cs.backgroundColor); return +cs.opacity * (c ? c[3] : 0); };
    const st = () => JSON.stringify(window.__e.state?.() ?? null);
    const fr = []; const s0 = st(); const [el0, ps0] = seat(); const seatName = el0 ? `${el0.tagName.toLowerCase()}${[...el0.classList].slice(0, 2).map((c) => "." + c).join("")}${ps0 ?? ""}` : "none";
    const t0 = performance.now(); window.__e.commit(); const s1 = st(); let flipped = gap == null, s2 = null;
    const tick = () => {
      const t = performance.now() - t0;
      if (!flipped && t >= gap) { window.__e.commit(); flipped = true; s2 = st(); fr.push({ t, flip: true }); }
      fr.push({ t, light: rd() });
      if (t < ms) requestAnimationFrame(tick); else res({ fr, s0, s1, s2, seat: seatName });
    };
    requestAnimationFrame(tick);
  });
  for (const [sc, m] of rebounds) {
    for (const theme of ["light", "dark"]) {
      let lit = null;
      for (const gap of [null, 60, 200]) {
        const name = gap == null ? `E-10 ${sc} rebound single ${theme}` : `E-10 ${sc} rebound reverse +${gap} ${theme}`;
        const r = await guard(name, async () => {
          const P = await openPage(E, T, sc, { theme });
          try { await P.page.waitForTimeout(300); return await P.page.evaluate(reboundFilm, [gap, m.light ?? null, 900]); } finally { await P.close(); }
        });
        if (r.crashed) { cell(name, "FAIL", r.line); continue; }
        const rows = r.fr.filter((x) => !x.flip && Number.isFinite(x.light));
        const peak = rows.reduce((q, x) => (x.light > q.light ? x : q), { light: -1, t: 0 });
        const onset = rows.find((x) => x.light > 0.004);
        const pulses = rows.filter((x, k) => k > 0 && k < rows.length - 1 && x.light > PULSE && x.light >= rows[k - 1].light && x.light > rows[k + 1].light).length;
        let fz = 0, f0 = null, fzAt = null;
        for (let k = 1; k < rows.length; k++) {
          const flat = rows[k].light > LIT && Math.abs(rows[k].light - rows[k - 1].light) <= FLAT;
          if (flat) { if (f0 == null) f0 = rows[k - 1].t; if (rows[k].t - f0 > fz) { fz = rows[k].t - f0; fzAt = f0; } } else f0 = null;
        }
        // reported beside the graded pair: the light's largest one-frame drop per 16.7 ms (a restart from 0 shows here)
        const drop = Math.max(0, ...rows.slice(1).map((x, k) => ((rows[k].light - x.light) * (1000 / 60)) / Math.max(1000 / 60, x.t - rows[k].t)));
        const trace = rows.filter((_, k) => k % 4 === 0).map((x) => `+${x.t.toFixed(0)} ${x.light.toFixed(3)}`).join(" ");
        if (gap == null) {
          lit = peak.light > PULSE;
          if (r.s0 === r.s1) cell(name, "FAIL", `NOT DRIVEN: the commit did not change the state (${r.s0})`);
          else cell(name, "REPORT", `seat ${r.seat} · onset (> 0.004) ${onset ? `+${onset.t.toFixed(0)}` : "none"} ms · peak ${f(peak.light)} at +${peak.t.toFixed(0)} ms (ACKNOWLEDGE_WINDOW_MS ${ACK}: onset ${onset && onset.t <= ACK ? "inside" : "OUTSIDE"}, peak ${peak.t <= ACK ? "inside" : "OUTSIDE"}) · pulses ${pulses} · ${trace}`);
          continue;
        }
        if (!lit) { cell(name, "UNMEASURED", `the single commit lights no seat above ${PULSE} (seat ${r.seat}): no commit light to film, so no reversal of one; E-2 grades the light's existence`); continue; }
        const back = r.s2 === r.s0 && r.s1 !== r.s0;
        if (!back) { cell(name, "FAIL", `NOT DRIVEN: the reverse did not restore the state (${r.s0} → ${r.s1} → ${r.s2})`); continue; }
        const ok = fz < FREEZE && pulses >= 2;
        cell(name, ok ? "PASS" : "FAIL", `seat ${r.seat} · state ${r.s0} → ${r.s1} → back at +${gap} · light frozen mid-flight (> ${LIT}, ±${FLAT} a frame) ${f(fz, 0)} ms${fzAt != null && fz > 0 ? ` from +${f(fzAt, 0)}` : ""} (bound < ${FREEZE}) · pulses ${pulses} over the two commits (bound ≥ 2) · peak ${f(peak.light)} at +${peak.t.toFixed(0)} · largest one-frame drop ${f(drop)} (reported) · ${trace}`);
      }
    }
  }
});
