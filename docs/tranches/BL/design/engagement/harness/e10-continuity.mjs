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
//   rebound          (H5, C-A4's light rebound) RETIRED by H7 with the commit light it filmed (O-103d (1)); see H7 below
//   H6 (pass 6; REGISTRY §P5-7 items 1, 5, 6; C-A5 §0.1, C-E5 §0.1): the moves a change detector armed at its own rest
//   reading cannot hear, each inside CK-20 with a plant:
//   stale place (inset) / (centred shrink)   on `stale` scenes, keyboard and in-place pointer, the same film as the stale
//                    place but the move is the wrapper's ([data-t="wrap"], 360 px): inset 360 → 300 px with a +60 px left
//                    margin (the left edge in, the right kept), centred shrink 360 → 240 px with +60 px (the centre kept).
//                    The wrapper's new rect lies inside its old one: a ratio-1 observer hears nothing. Same bound; NOT
//                    DRIVEN unless engaged before and on every frame and the wrapper's new rect lies inside the old.
//                    Plant `e10-ratio1` (an observer armed at ratio 1)
//   clipped stale place · keyboard · top|bottom · reveal|conceal|control   on `clip` scenes (the row names the
//                    scroller `box`, the in-flow `rest` box it clips, and the spacer's height): Tab engages, the
//                    scroller is scrolled so 70 % of the rest box's top (or bottom) is hidden past its edge, +500 ms,
//                    the spacer above moves the rest box d = hidden − 2 px by a style write, toward the visible side
//                    (reveal: the visible fraction of the box against its old rect is unchanged, so a clipped-ratio
//                    observer hears nothing) or away from it (conceal), or not at all (control), +400 ms, then filmed
//                    900 ms across an append below the scroller: the root's largest one-frame centre move ≤ 4 px per
//                    16.7 ms. NOT DRIVEN unless engaged throughout, the rest box clipped before the move and the move
//                    landed (|Δ| within 1 px of d; 0 for the control). Plant `e10-clipratio` (an observer armed at the
//                    clipped ratio)
//   clipped stale place · pointer   UNMEASURED with its reason (REGISTRY §P5-7 item 6, C-E5 §4.3): scrolling the box
//                    while a mouse hold is down ends the hold in both engines, and clipping before the press lets the
//                    press scroll the box back, so no driver reaches the in-place pointer path inside a scroller yet
//   H7 (pass 7; REGISTRY §P6-8.3 wave 1, §P6-7 items 4, 6, 7, 9, 14; C-E6 §0.1, §0.2, §0.6):
//   own release (the reference)  read on THREE fresh pages, and the hand-off and Escape bounds take the LARGEST of the
//                    three (drop, centre move, engage move): the margin + 0.002 is then the scale read's resolution on
//                    the 360 px slider (0.72 px, under one device pixel), above the engine's own release scatter, not
//                    inside it. Pass 6 graded the WebKit hand-off against ONE own-release read + 0.002 and read 4 fail
//                    cells at loads 21-39 (0.0116-0.0144 against 0.0105-0.0111) while P-E6's no-read control, a build
//                    with no frame read at all, scattered 0.0082-0.0106 over the same drive (§P6-7 item 9). The line
//                    prints the three reads. A pair scene with no single scene in the run (`--scenes slider2` alone)
//                    FAILS LOUD: "NO REFERENCE", never a NaN bound (P-E6's -h reads). Plant `e10-noref`
//   clipped stale place · pointer · top|bottom · reveal|conceal|control   C-E6's `clip-pointer` driver: the scroller is
//                    scrolled BEFORE the press so the control stands fully in view 2 px inside the named edge, the
//                    mouse is pressed on its thumb and held, and only then the spacer (a style write) moves the rest box
//                    70 % past that edge; +500 ms the spacer moves it toward the visible side by hidden − 2 px (reveal),
//                    away (conceal), or not at all (control); +400 ms a node is appended below the scroller and the root
//                    is filmed 900 ms. Same bound (≤ 4 px per 16.7 ms). NOT DRIVEN unless engaged throughout, clipped
//                    before the move, the move landed (±1 px) and the box never scrolled under the hold. It replaces
//                    H6's UNMEASURED cell (scrolling the box under a mouse hold ends the hold; this driver never does).
//                    Plant `e10-clipratioptr`
//   clip-vanish · keyboard   C-E6's cell (CK-20; a promoted control and its scroller's clip, §P6-7 item 7): Tab engages,
//                    then per 1 px step the scroller puts hid = 14..22 px of the 20 px rest box past its top edge, two
//                    frames, and ONE still of the 24 px strip above the scroller (no film); the same steps after Escape
//                    (not engaged: the scroller clips it) are the reference. The control's painted-outside area per step
//                    is the strip's pixels differing by ≥ 16 levels of luma. Bound (C-E6's): between adjacent 1 px steps
//                    the area changes by at most 3 rows × the control's width (a 1 px scroll moves ≤ 1 px of the
//                    control; 3 rows allow the edge's antialiasing). A larger drop is the control leaving the paint in
//                    one step. The line prints every step's area. Plant `e10-clipvanish`; on the pass-6 candidate (the
//                    current construction: promoted, `position-visibility: anchors-visible`) it must FAIL
//   rebound (re-pointed to O-103d (1); REGISTRY §P6-7 item 4): the commit is a geometric pop, and under reduce an
//                    instant state change, so no light seat is filmed. single (REPORT): the face's scale per frame, its
//                    peak and largest one-frame step. reverse +60|+200 (REPORT, §P6-7 item 12 "a slope, not a
//                    discontinuity"): the largest step against the single pop's, the pops counted. reverse (PRM) +60|+200
//                    (GRADED, the instant-state form, `a6-probe prm`'s shape): under reduce a commit and its reverse G ms
//                    later: the face's scale range < 0.002 and in flight on ≤ 1 frame across both edges, the state back,
//                    and the face's settled paint 300 ms after the reverse within 5 % of its pixels (≥ 16 levels) of
//                    its paint before the commit (it rests where it began: no stale light, no stuck fill). Plant
//                    `e10-prmrebound` (the commit pops under reduce). The H5 light cells and `e10-rebound` are retired
//   H8 (pass 8; REGISTRY §P7-8.1's invariant, §P7-7 items 1, 2, 5): on `clip` rows, keyboard and touch (the row's loupe
//                    hidden on touch), engaged while read and released after, promotion printed never required:
//                    clip-vanish · keyboard|touch on TWO bounds (painted outside ≤ 3 rows × width on every step; adjacent
//                    steps likewise); clip feather (the row's `feather` on the scroller: engaged/released visibility in its
//                    top 28 px ≤ 1.10 × the unfeathered ratio); clip radius (40 px corners: ≤ 16 px² painted outside the
//                    rounded padding box); clip place · translate|scale|none (centre ≤ 2 px, width ×0.99..1.07); clip film ·
//                    wheel|smooth (keyboard; recorded video from 300 ms before the drive, read against its per-pixel median, blank frames dropped;
//                    engaged ≤ the released films' largest + one row). `--part vanish,feather,radius,place,film` runs these
//                    alone. Plants e10-clipouter, e10-rectclip-{feather,radius,scale,film}, e10-layoutplace
// The sortable and tabs teleports are CK-05's continuity cell (E-4).
//   node e10-continuity.mjs --build <dir> | --fixture [--fault e10-snap|e10-teleport|e10-teleportin] [--engine webkit]
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { witness, openPage, openTouchPage, scenesFor, center, tabKey, f, GLASS, INIT } from "./lib.mjs";
const { PNG } = (await import(`${GLASS}/node_modules/pngjs/lib/png.js`)).default;
const luma = (buf) => { const p = PNG.sync.read(buf); const o = new Float32Array(p.width * p.height); for (let i = 0, j = 0; i < p.data.length; i += 4, j++) o[j] = 0.2126 * p.data[i] + 0.7152 * p.data[i + 1] + 0.0722 * p.data[i + 2]; return { w: p.width, h: p.height, o }; };
const FILM_LEAD = 300; // ms of the film kept before the drive (the clip film cell)
const LUMA_STEP = 16, LUMA_FRAC = 0.05, REF_READS = 3, VANISH_ROWS = 3;
// H8: the feather cell's bound on (engaged ÷ released, feathered) ÷ (the same, unfeathered). The invariant says the body
// paints EXACTLY what its place paints, so an in-place body reads 1: the clean fixture reads 0.99 (keyboard) and 0.99
// (touch) in Chromium; C-E7's unfeathered control ×1.00-1.05. 1.10 is that scatter, not C-E7's 1.25, which the pass-7
// construction's touch arm passed at 1.16 (H8 §3)
const FEATHER_K = 1.1;

const TOL = 0.002, POS = 1, ENG = 1.03, VEIL_KEEP = 0.1;
// H5: C-E4's stale-place step bound (px per 16.7 ms)
const STALE = 4;
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

await witness("E-10", "CK-20 no one-frame discontinuity on an engagement path", async ({ a, E, T, cell, guard, idx, engine }) => {
  // H8: `--part vanish,feather,radius,place,film` runs those clip cells alone, `--part old` every cell before H8's (the
  // self-test's narrowed plants)
  const part = typeof a.part === "string" ? new Set(a.part.split(",")) : null; const want = (k) => !part || part.has(k); const old = want("old");
  const all = scenesFor(idx, "E-10");
  const single = !old ? [] : all.filter(([, m]) => !m.pair && !m.stale && !m.rebound && !m.clip);
  const pairs = !old ? [] : all.filter(([, m]) => m.pair);
  const stales = !old ? [] : all.filter(([, m]) => m.stale);
  const rebounds = !old ? [] : all.filter(([, m]) => m.rebound);
  const clips = all.filter(([, m]) => m.clip);
  const shift = engine === "webkit" ? "Alt+Shift+Tab" : "Shift+Tab";
  let ref = null;
  for (const [sc, m] of single) {
    const root = '[data-e~="root"]';
    const r = await guard(`${sc} release`, async () => {
      const out = { tab: [], tabIn: [] };
      // H7: the own release on REF_READS fresh pages (the reference's own scatter), then the Escape release
      for (const how of [...Array(REF_READS).fill("tab"), "escape"]) {
        const P = await openPage(E, T, sc);
        try {
          await P.page.focus('[data-sentinel="before"]');
          const pe = P.page.evaluate(filmFn, [[root], m.veil ?? null, 560]); await P.page.waitForTimeout(32);
          await P.page.keyboard.press(tabKey(engine)); const fin = await pe; await P.page.waitForTimeout(40);
          const pr = P.page.evaluate(filmFn, [[root], m.veil ?? null, 900]); await P.page.waitForTimeout(32);
          if (how === "tab") await P.page.keyboard.press(tabKey(engine)); else await P.page.keyboard.press("Escape");
          const fr = await pr;
          if (how === "tab") { out.tab.push(fr); out.tabIn.push(fin); } else { out.escape = fr; out.escapeIn = fin; }
        } finally { await P.close(); }
      }
      return out;
    }, 150000);
    if (r.crashed) { cell(`E-10 ${sc} escape release`, "FAIL", r.line); continue; }
    const drops = r.tab.map((fr) => maxDrop(fr)), moves = r.tab.map((fr) => maxShift(fr));
    ref = { step: Math.max(...drops), move: Math.max(...moves), inMove: Math.max(...r.tabIn.map((fr) => maxShift(fr)), maxShift(r.escapeIn)), s0: Math.min(...r.tab.map((fr) => fr[0].s[0])), drops, moves };
    const e0 = r.escape[0].s[0]; const ed = maxDrop(r.escape), em = maxShift(r.escape);
    if (!(ref.s0 >= ENG)) cell(`E-10 ${sc} own release`, "REPORT", `Tab-engaged scale ×${f(ref.s0)} < ×${ENG}: the keyboard does not engage this slider, so the release has no step to film (the hand-off and Escape cells read NOT DRIVEN)`);
    else cell(`E-10 ${sc} own release`, "REPORT", `Tab in: largest one-frame centre move ${f(ref.inMove, 1)} px · Tab out of the engaged slider on ${REF_READS} fresh pages: largest one-frame drop per 16.7 ms ${drops.map((x) => f(x, 4)).join(" / ")} (reference: the largest, ${f(ref.step, 4)}), largest centre move ${moves.map((x) => f(x, 1)).join(" / ")} px (reference ${f(ref.move, 1)}), ×${f(ref.s0)} → ×${f(r.tab[0].at(-1).s[0])} (the references for the hand-off and Escape bounds: the engine's own release scatter, the margin + ${TOL} the scale read's resolution)`);
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
    // H7: no own-release reference in this run (no single scene read, or its read crashed): the hand-off cannot be
    // graded and says so loudly, never a NaN bound (P-E6's -h reads, REGISTRY §P6-7 item 14)
    if (!ref) {
      const why = `NO REFERENCE: the hand-off is graded against the single slider scene's own release, and this run read none (${single.length ? `its read failed` : `no single scene in the run: --scenes ${Object.keys(idx).join(",")}`}); run it with the slider scene (--scenes slider,${sc})`;
      console.error(`[E-10] ${why}`);
      for (const n of ["hand-off drop", "hand-off rev"]) cell(`E-10 ${sc} ${n}`, "FAIL", why);
      continue;
    }
    const step = ref.step, move = ref.move, inMove = ref.inMove;
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
        cell(name, ok ? "PASS" : "FAIL", `${dir === "fwd" ? "Tab A → B" : "Shift+Tab B → A"} (focus on ${r.focus}) · outgoing ${ON} ×${f(o0)} → ×${f(fr.at(-1).s[o])}, largest one-frame drop per 16.7 ms ${f(dO, 4)} (bound ≤ own release ${f(step, 4)}, the largest of ${REF_READS} reads [${ref.drops.map((x) => f(x, 4)).join(", ")}], + ${TOL}), largest centre move ${f(mO.d, 1)} px at ${f(mO.t, 0)} ms (bound ≤ own release ${f(move, 1)} + ${POS} px) · incoming ${IN} ×${f(fr[0].s[n])} → ×${f(fr.at(-1).s[n])}, largest centre move ${f(mN.d, 1)} px at ${f(mN.t, 0)} ms (bound ≤ own engage ${f(inMove, 1)} + ${POS} px)`);
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
      for (const grow of how === "keyboard" ? [120, 0, "resize", "inset", "shrink"] : [120, 0, "inset", "shrink"]) {
        const wrapMove = grow === "inset" || grow === "shrink";
        const name = `E-10 ${sc} stale place${grow === "resize" ? " (viewport resize)" : grow === "inset" ? " (inset)" : grow === "shrink" ? " (centred shrink)" : grow ? "" : " control"} · ${how}`;
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
              // H6: the wrapper's inward moves (its new rect inside its old one)
              const wrapRect = () => page.evaluate(() => { const w = document.querySelector('[data-t="wrap"]'); if (!w) return null; const b = w.getBoundingClientRect(); return { l: b.left, t: b.top, r: b.right, b: b.bottom }; });
              let w0 = null, w1 = null;
              if (wrapMove) { w0 = await wrapRect(); if (!w0) return { nowrap: true }; await page.evaluate((k) => { const w = document.querySelector('[data-t="wrap"]'); w.style.width = k === "inset" ? "300px" : "240px"; w.style.marginLeft = "60px"; }, grow); }
              else if (grow === "resize") await page.setViewportSize({ width: 380, height: 500 });
              else if (grow) await page.evaluate((g) => window.__e.grow(g), grow);
              await page.waitForTimeout(400);
              const s1 = await at(); if (wrapMove) w1 = await wrapRect();
              const pr = page.evaluate(filmFn, [[root], m.veil ?? null, 900, eng]);
              await page.waitForTimeout(80);
              await page.evaluate(() => window.__e.tick());
              return { s0, s1, w0, w1, fr: await pr };
            } finally { if (held) await page.mouse.up(); }
          } finally { await P.close(); }
        });
        if (r.crashed) { cell(name, "FAIL", r.line); continue; }
        if (r.nowrap) { cell(name, "UNMEASURED", "the scene renders no [data-t=\"wrap\"] around the control: the inward move cannot be driven"); continue; }
        const { s0, s1, fr } = r; const w = shiftAt(fr);
        const ys = fr.map((x) => x.cy[0]).filter(Number.isFinite), xs = fr.map((x) => x.cx[0]).filter(Number.isFinite);
        const inside = !wrapMove || (r.w1 && r.w1.l >= r.w0.l - 0.5 && r.w1.r <= r.w0.r + 0.5 && r.w1.t >= r.w0.t - 0.5 && r.w1.b <= r.w0.b + 0.5 && r.w1.r - r.w1.l < r.w0.r - r.w0.l - 1);
        const driven = s0.eng && fr.every((x) => x.eng[0]) && inside;
        const what = grow === "resize" ? "viewport 700 → 380 px wide (the paragraph above rewraps)" : wrapMove ? `the wrapper ${grow === "inset" ? "360 → 300 px with +60 px left margin (left edge in, right edge kept)" : "360 → 240 px with +60 px left margin (centred)"} by a style write: its rect ${f(r.w0.l, 1)}..${f(r.w0.r, 1)} → ${f(r.w1?.l, 1)}..${f(r.w1?.r, 1)} px (${inside ? "inside the old" : "NOT inside the old"})` : grow ? `spacer +${grow} px by a style write` : "no layout move (the control)";
        cell(name, !driven ? "FAIL" : w.d <= STALE ? "PASS" : "FAIL", `${driven ? "" : `NOT DRIVEN: ${inside ? "" : "the wrapper's new rect does not lie inside its old one; "}the root engaged before ${s0.eng}, on ${fr.filter((x) => x.eng[0]).length} of ${fr.length} frames (${eng}) · `}${how} engaged · ${what}: the root's centre (${f(s0.x, 1)}, ${f(s0.y, 1)}) → (${f(s1.x, 1)}, ${f(s1.y, 1)}) px · then a node appended below it (moves nothing): over ${fr.length} frames its centre spans x ${f(Math.min(...xs), 1)}..${f(Math.max(...xs), 1)}, y ${f(Math.min(...ys), 1)}..${f(Math.max(...ys), 1)} px, largest one-frame move per 16.7 ms ${f(w.d, 1)} px${w.d > 0 ? ` at +${f(w.t, 0)} ms` : ""} (bound ≤ ${STALE} px)`);
      }
    }
  }
  // ── H6: C-E5's clipped stale place (a clipping scroller; a move toward its visible side keeps the clipped ratio) ──
  const clipRead = ([boxSel, restSel, root, eng]) => {
    const b = document.querySelector(boxSel), rest = document.querySelector(restSel), h = document.querySelector(root);
    if (!b || !rest || !h) return null;
    const br = b.getBoundingClientRect(); const visTop = br.top + b.clientTop, visBot = visTop + b.clientHeight; const r = rest.getBoundingClientRect();
    return { top: r.top, h: r.height, vis: Math.max(0, Math.min(r.bottom, visBot) - Math.max(r.top, visTop)), eng: h.matches(eng) };
  };
  const clipScroll = ([boxSel, restSel, side, frac]) => {
    const b = document.querySelector(boxSel), rest = document.querySelector(restSel);
    const br = b.getBoundingClientRect(); const visTop = br.top + b.clientTop, visBot = visTop + b.clientHeight; const r = rest.getBoundingClientRect(); const hidden = Math.round(r.height * frac);
    b.scrollTop += side === "top" ? r.top - (visTop - hidden) : r.bottom - (visBot + hidden);
    return hidden;
  };
  for (const [sc, m] of clips) {
    const root = '[data-e~="root"]', eng = m.engaged ?? "[data-engaged]"; const { box, rest, spacer } = m.clip;
    if (old) for (const side of ["top", "bottom"]) for (const dir of ["reveal", "conceal", "control"]) {
      const name = `E-10 ${sc} clipped stale place · keyboard · ${side} · ${dir}`;
      const r = await guard(name, async () => {
        const P = await openPage(E, T, sc);
        try {
          const { page } = P;
          await page.focus('[data-sentinel="before"]'); await page.keyboard.press(tabKey(engine)); await page.waitForTimeout(600);
          const hidden = await page.evaluate(clipScroll, [box, rest, side, 0.7]);
          await page.waitForTimeout(500);
          const s0 = await page.evaluate(clipRead, [box, rest, root, eng]);
          const d = Math.max(2, hidden - 2);
          // top clip: down reveals (the spacer grows); bottom clip: up reveals (the spacer shrinks)
          const sign = dir === "control" ? 0 : (side === "top") === (dir === "reveal") ? 1 : -1;
          if (sign) await page.evaluate((g) => window.__e.grow(g), spacer + sign * d);
          await page.waitForTimeout(400);
          const s1 = await page.evaluate(clipRead, [box, rest, root, eng]);
          const pr = page.evaluate(filmFn, [[root], m.veil ?? null, 900, eng]);
          await page.waitForTimeout(80);
          await page.evaluate(() => window.__e.tick());
          return { s0, s1, d, sign, fr: await pr };
        } finally { await P.close(); }
      });
      if (r.crashed) { cell(name, "FAIL", r.line); continue; }
      if (!r.s0 || !r.s1) { cell(name, "FAIL", `NOT DRIVEN: the scene renders no ${box} / ${rest} / root`); continue; }
      const { s0, s1, fr, d, sign } = r; const w = shiftAt(fr);
      const moved = s1.top - s0.top; const clipped = s0.vis > 0 && s0.vis < s0.h - 0.5; const landed = Math.abs(Math.abs(moved) - (sign ? d : 0)) <= 1;
      const driven = s0.eng && fr.every((x) => x.eng[0]) && clipped && landed;
      cell(name, !driven ? "FAIL" : w.d <= STALE ? "PASS" : "FAIL", `${driven ? "" : `NOT DRIVEN: engaged before ${s0.eng} and on ${fr.filter((x) => x.eng[0]).length} of ${fr.length} frames, rest box clipped ${clipped} (${f(s0.vis, 1)} of ${f(s0.h, 1)} px visible), move landed ${landed} · `}keyboard engaged · the rest box ${f(s0.h, 1)} px tall, ${f(s0.vis, 1)} px visible in the scroller · ${sign ? `spacer ${sign > 0 ? "+" : "−"}${d} px by a style write (${dir})` : "no move (the control)"}: its top ${f(s0.top, 1)} → ${f(s1.top, 1)} px (Δ ${f(moved, 1)}), ${f(s1.vis, 1)} px visible · then a node appended below the scroller (moves nothing): the root's largest one-frame centre move per 16.7 ms ${f(w.d, 1)} px${w.d > 0 ? ` at +${f(w.t, 0)} ms` : ""} over ${fr.length} frames (bound ≤ ${STALE} px)`);
    }
    // ── H7: C-E6's clip-pointer driver (the box scrolled BEFORE the press; the clip made by the spacer after it) ──
    if (old) for (const side of ["top", "bottom"]) for (const dir of ["reveal", "conceal", "control"]) {
      const name = `E-10 ${sc} clipped stale place · pointer · ${side} · ${dir}`;
      const r = await guard(name, async () => {
        const P = await openPage(E, T, sc);
        try {
          const { page } = P;
          // before the press: the rest box fully in view, 2 px inside the named edge
          await page.evaluate(([boxSel, restSel, side]) => {
            const b = document.querySelector(boxSel), rest = document.querySelector(restSel); const br = b.getBoundingClientRect(); const visTop = br.top + b.clientTop, visBot = visTop + b.clientHeight;
            const q = rest.getBoundingClientRect(); b.scrollTop += side === "top" ? q.top - (visTop + 2) : q.bottom - (visBot - 2);
          }, [box, rest, side]);
          await page.waitForTimeout(200);
          const st0 = await page.evaluate((b) => document.querySelector(b).scrollTop, box);
          const c = await center(page, '[data-e~="thumb"]');
          await page.mouse.move(c.x, c.y); await page.mouse.down();
          try {
            await page.waitForTimeout(400);
            const sA = await page.evaluate(clipRead, [box, rest, root, eng]);
            const hidden = Math.round(sA.h * 0.7);
            // the clip by a style write: top → the spacer shrinks by 2 + hidden; bottom → it grows by 2 + hidden
            const sp1 = side === "top" ? spacer - (2 + hidden) : spacer + (2 + hidden);
            await page.evaluate((g) => window.__e.grow(g), sp1);
            await page.waitForTimeout(500);
            const s0 = await page.evaluate(clipRead, [box, rest, root, eng]);
            const d = Math.max(2, hidden - 2);
            const sign = dir === "control" ? 0 : (side === "top") === (dir === "reveal") ? 1 : -1;
            if (sign) await page.evaluate((g) => window.__e.grow(g), sp1 + sign * d);
            await page.waitForTimeout(400);
            const s1 = await page.evaluate(clipRead, [box, rest, root, eng]);
            const pr = page.evaluate(filmFn, [[root], m.veil ?? null, 900, eng]);
            await page.waitForTimeout(80);
            await page.evaluate(() => window.__e.tick());
            const fr = await pr;
            const st1 = await page.evaluate((b) => document.querySelector(b).scrollTop, box);
            return { sA, s0, s1, d, sign, fr, st0, st1 };
          } finally { await page.mouse.up(); }
        } finally { await P.close(); }
      });
      if (r.crashed) { cell(name, "FAIL", r.line); continue; }
      if (!r.s0 || !r.s1) { cell(name, "FAIL", `NOT DRIVEN: the scene renders no ${box} / ${rest} / root`); continue; }
      const { sA, s0, s1, fr, d, sign } = r; const w = shiftAt(fr);
      const moved = s1.top - s0.top; const clipped = s0.vis > 0 && s0.vis < s0.h - 0.5; const landed = Math.abs(Math.abs(moved) - (sign ? d : 0)) <= 1;
      const still = r.st0 === r.st1;
      const driven = sA.eng && s0.eng && fr.every((x) => x.eng[0]) && clipped && landed && still;
      cell(name, !driven ? "FAIL" : w.d <= STALE ? "PASS" : "FAIL", `${driven ? "" : `NOT DRIVEN: engaged at the press ${sA.eng}, before the move ${s0.eng}, on ${fr.filter((x) => x.eng[0]).length} of ${fr.length} frames, rest box clipped ${clipped} (${f(s0.vis, 1)} of ${f(s0.h, 1)} px visible), move landed ${landed}, box never scrolled under the hold ${still} · `}pointer held (the box scrolled to ${r.st0} BEFORE the press, ${r.st1} after the film) · clipped by the spacer to ${f(s0.vis, 1)} of ${f(s0.h, 1)} px visible · ${sign ? `then the spacer ${sign > 0 ? "+" : "−"}${d} px by a style write (${dir})` : "no move (the control)"}: the rest box's top ${f(s0.top, 1)} → ${f(s1.top, 1)} px (Δ ${f(moved, 1)}) · then a node appended below the scroller (moves nothing): the root's largest one-frame centre move per 16.7 ms ${f(w.d, 1)} px${w.d > 0 ? ` at +${f(w.t, 0)} ms` : ""} over ${fr.length} frames (bound ≤ ${STALE} px)`);
    }
    // ── H8: the place-paint invariant on the whole clip family (REGISTRY §P7-8.1: "an engaged control's body paints
    // exactly what its place would paint (every clip, mask, radius and transform of its ancestors) in the same frame its
    // place moves; the loupe alone leaves its place, and paints whole"), keyboard and touch. Every cell reads the body;
    // a touch cell hides the row's loupe (the invariant exempts it; E-13 reads it). Drive: engaged while read (by the
    // row's `engaged` selector), released after; whether the body is promoted (`:popover-open`) is printed, never required
    const thumbSel = m.thumb ?? '[data-e~="thumb"]';
    // the parts the invariant does not speak of are hidden while a body cell reads: a page-wide veil (the row's `veil`, a
    // paint over everything, not the body; H7's vanish cell read it as a constant) always, the loupe on touch
    const hideLoupe = (page, mode) => { const sels = [m.veil, mode === "touch" ? m.loupe?.lens : null].filter(Boolean); return sels.length ? page.evaluate((s) => { const st = document.createElement("style"); st.textContent = `${s} { visibility: hidden !important; }`; document.head.appendChild(st); }, sels.join(", ")) : null; };
    const shotOf = (P, clip) => (P.shot ? P.shot(clip) : P.page.screenshot({ clip }));
    // the rest box `hid` px past the scroller's painted top edge (negative: inside), two frames; an ancestor's scale divides
    // the scroll and the borders
    const setHid = (page, hid) => page.evaluate(([boxSel, restSel, rootSel, engSel, hid]) => {
      const b = document.querySelector(boxSel), q = document.querySelector(restSel), h = document.querySelector(rootSel);
      const br = b.getBoundingClientRect(), k = br.height / b.offsetHeight, rr = q.getBoundingClientRect();
      b.scrollTop += (rr.top - (br.top + b.clientTop * k - hid)) / k;
      return new Promise((ok) => requestAnimationFrame(() => requestAnimationFrame(() => { const b2 = b.getBoundingClientRect(), r2 = q.getBoundingClientRect();
        ok({ bl: b2.left, bt: b2.top, br: b2.right, bb: b2.bottom, visTop: b2.top + b.clientTop * k, l: b2.left + b.clientLeft * k, w: b.clientWidth * k, eng: h.matches(engSel), promoted: h.matches(":popover-open"), hw: h.offsetWidth, restH: r2.height, st: b.scrollTop }); })));
    }, [box, rest, root, eng, hid]);
    const stateOf = (page) => page.evaluate(([rootSel, engSel]) => { const h = document.querySelector(rootSel); return { eng: h.matches(engSel), promoted: h.matches(":popover-open"), clip: h.style.clipPath || "" }; }, [root, eng]);
    const rectOf = (page) => page.evaluate((rootSel) => { const r = document.querySelector(rootSel).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, w: r.width }; }, root);
    // one engagement on a fresh page: `prep` first (it leaves the thumb in view), `during` while engaged (keyboard: Tab from
    // the before-sentinel, +600 ms; touch: a held touch on the thumb, read at +700 ms, the hold kept 2.5 s past it so a
    // slow read stays inside it), then the release (Escape; the lift) and `after` 800 ms later
    const once = (name, mode, prep, during, after) => guard(name, async () => {
      const P = mode === "touch" ? await openTouchPage(E, T, sc) : await openPage(E, T, sc);
      try {
        const { page } = P;
        await hideLoupe(page, mode);
        const pre = await prep(P);
        let d;
        if (mode === "keyboard") { await page.focus('[data-sentinel="before"]'); await page.keyboard.press(tabKey(engine)); await page.waitForTimeout(600); d = await during(P, pre); await page.keyboard.press("Escape"); }
        else { const c = await center(page, thumbSel); let k = 0; [d] = await P.holdAt(c.x, c.y, [700, 3200], async () => (k++ === 0 ? during(P, pre) : null)); }
        await page.waitForTimeout(800);
        const z = after ? await after(P, pre, d) : null;
        return { pre, d, z };
      } finally { await P.close(); }
    }, 150000);
    const MODES = ["keyboard", "touch"];

    // clip-vanish, two bounds (H7's keyboard cell, P-E7's touch cell): per 1 px step of the rest box past the scroller's top
    // (hid 14..22 of the 20 px box), one still of the 24 px strip above the scroller against the same step released.
    // (a) painted outside: no step's area over 3 rows × the control's width (the edge's antialiasing); (b) no vanish:
    // adjacent steps change by no more than that
    if (want("vanish")) for (const mode of MODES) {
      const name = `E-10 ${sc} clip-vanish · ${mode}`;
      const HIDS = [14, 15, 16, 17, 18, 19, 20, 21, 22];
      const r = await guard(name, async () => {
        const P = mode === "touch" ? await openTouchPage(E, T, sc) : await openPage(E, T, sc);
        try {
          const { page } = P;
          await hideLoupe(page, mode);
          await setHid(page, -50);
          let clipR = null, g0 = null; const engShots = []; let engAll = true, promAll = true;
          const step = async () => { const g = await setHid(page, HIDS[engShots.length]); if (!g0) { g0 = g; clipR = { x: Math.max(0, Math.floor(g.l)), y: Math.max(0, Math.floor(g.visTop) - 26), width: Math.floor(g.w), height: 24 }; } engAll = engAll && g.eng; promAll = promAll && g.promoted; await page.waitForTimeout(60); engShots.push(luma(await shotOf(P, clipR))); };
          if (mode === "keyboard") { await page.focus('[data-sentinel="before"]'); await page.keyboard.press(tabKey(engine)); await page.waitForTimeout(600); for (const _ of HIDS) await step(); await page.keyboard.press("Escape"); }
          else { const c = await center(page, thumbSel); await P.holdAt(c.x, c.y, HIDS.map((_, i) => 700 + 400 * i), step); }
          await page.waitForTimeout(800);
          const relEng = (await stateOf(page)).eng;
          const restShots = [];
          for (const hid of HIDS) { await setHid(page, hid); await page.waitForTimeout(60); restShots.push(luma(await shotOf(P, clipR))); }
          const area = engShots.map((e, k) => { let n = 0; const z = restShots[k]; for (let i = 0; i < e.o.length; i++) if (Math.abs(e.o[i] - z.o[i]) >= LUMA_STEP) n++; return n; });
          return { area, engAll, promAll, relEng, hw: g0.hw, restH: g0.restH, n: engShots.length };
        } finally { await P.close(); }
      }, 150000);
      if (r.crashed) { cell(name, "FAIL", r.line); continue; }
      const steps = r.area.slice(1).map((x, k) => r.area[k] - x); const worst = Math.max(...steps.map(Math.abs)); const bound = VANISH_ROWS * r.hw; const most = Math.max(...r.area);
      const driven = r.engAll && !r.relEng && r.n === HIDS.length;
      cell(name, !driven ? "FAIL" : worst <= bound && most <= bound ? "PASS" : "FAIL", `${driven ? "" : `NOT DRIVEN: engaged on every step ${r.engAll}, released after ${!r.relEng}, ${r.n} of ${HIDS.length} steps · `}${mode} engaged (promoted on every step ${r.promAll}) · px² of the strip above the scroller that differ from the released strip per 1 px step of the ${f(r.restH, 1)} px rest box past its top edge (hidden ${HIDS.join("/")}): ${r.area.join(" / ")} · (a) painted outside its card: largest ${most} px² (bound ≤ ${VANISH_ROWS} rows × the control's ${r.hw} px = ${bound}: the edge's antialiasing) · (b) largest change between adjacent steps ${worst} px² (bound ≤ ${bound}: a 1 px scroll moves ≤ 1 px of the control; a larger drop is the control leaving the paint in one step)`);
    }

    // the feather (C-E7's mask cell): the row's `feather` (the library's .fading-scroll recipe on the scroller), the control 4 px
    // inside the feathered start edge. Visibility in the scroller's top 28 px (Σ|luma − the same band with the control far
    // below it|), engaged against released, with the feather on and, as the control, off. Bound: the feathered ratio ≤
    // FEATHER_K × the unfeathered (the grow's own gain); a body the feather does not reach paints at full strength under it
    if (want("feather") && m.feather) for (const mode of MODES) {
      const name = `E-10 ${sc} clip feather · ${mode}`;
      const res = {};
      for (const masked of [true, false]) {
        const band = async (P, hid) => { const g = await setHid(P.page, hid); await P.page.waitForTimeout(150); return luma(await shotOf(P, { x: Math.floor(g.bl) + 2, y: Math.floor(g.bt) + 2, width: Math.ceil(g.br - g.bl) - 4, height: 28 })); };
        res[masked] = await once(`${name} ${masked ? "on" : "off"}`, mode, async (P) => {
          if (masked) await P.page.evaluate(([b, fe]) => { const e = document.querySelector(b); e.classList.add(...fe.cls); for (const x of fe.attrs) e.setAttribute(x, ""); }, [box, m.feather]);
          const empty = await band(P, -140); await setHid(P.page, -50);
          return { empty };
        }, async (P) => ({ L: await band(P, -4), st: await stateOf(P.page), mask: await P.page.evaluate((b) => { const s = getComputedStyle(document.querySelector(b)); return `${s.maskImage || s.webkitMaskImage || "none"}`.slice(0, 70) + ` · --fade-start ${s.getPropertyValue("--fade-start").trim() || "—"}`; }, box) }),
        async (P) => ({ L: await band(P, -4), st: await stateOf(P.page) }));
      }
      const on = res[true], off = res[false];
      if (on.crashed || off.crashed) { cell(name, "FAIL", on.line ?? off.line); continue; }
      const vis = (x, e) => { let s = 0; for (let i = 0; i < x.o.length; i++) s += Math.abs(x.o[i] - e.o[i]); return s; };
      const ratio = (r) => vis(r.d.L, r.pre.empty) / Math.max(1, vis(r.z.L, r.pre.empty));
      const kOn = ratio(on), kOff = ratio(off), bound = FEATHER_K * kOff;
      const driven = on.d.st.eng && !on.z.st.eng && off.d.st.eng && !off.z.st.eng && !/^none/.test(on.d.mask);
      cell(name, !driven ? "FAIL" : kOn <= bound ? "PASS" : "FAIL", `${driven ? "" : `NOT DRIVEN (engaged ${on.d.st.eng}/${off.d.st.eng}, released ${!on.z.st.eng}/${!off.z.st.eng}, mask ${on.d.mask}) · `}${mode} engaged (promoted ${on.d.st.promoted}) · the scroller's feather: ${on.d.mask} · the control 4 px inside its feathered top edge · visibility in the scroller's top 28 px, engaged over released: ×${f(kOn, 2)} feathered, ×${f(kOff, 2)} unfeathered (the grow's own gain) · ratio of ratios ${f(kOn / kOff, 2)} · bound ≤ ${FEATHER_K} × ×${f(kOff, 2)} = ×${f(bound, 2)} (an in-place body reads 1)`);
    }

    // the radius (C-E7's cell): the scroller rounded (border-radius 40 px, the rest box unpadded so the control's end sits in
    // the corner), the rest box 6 px past the top edge: px² of the top corners OUTSIDE the rounded padding box (1.5 px
    // antialias band excluded) that differ ≥ 16 levels engaged against released. Bound ≤ 16 px²
    if (want("radius")) for (const mode of MODES) {
      const name = `E-10 ${sc} clip radius · ${mode}`;
      const snap = async (P) => { const g = await setHid(P.page, 6); await P.page.waitForTimeout(80); const clip = { x: Math.floor(g.bl), y: Math.floor(g.bt), width: Math.ceil(g.br - g.bl), height: 44 }; return { L: luma(await shotOf(P, clip)), st: await stateOf(P.page), W: clip.width }; };
      const r = await once(name, mode, async (P) => { await P.page.evaluate(([b, q]) => { document.querySelector(b).style.borderRadius = "40px"; document.querySelector(q).style.padding = "0"; }, [box, rest]); await setHid(P.page, -50); return {}; }, snap, snap);
      if (r.crashed) { cell(name, "FAIL", r.line); continue; }
      const R = 39, W = r.d.W, H = 44; let n = 0, area = 0;
      for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
        const dx = x < R ? R - x : x > W - 1 - R ? x - (W - 1 - R) : 0, dy = y < R ? R - y : 0;
        if (!dx || !dy || Math.hypot(dx, dy) <= R + 1.5) continue;
        area++; const i = y * W + x; if (Math.abs(r.d.L.o[i] - r.z.L.o[i]) >= LUMA_STEP) n++;
      }
      const driven = r.d.st.eng && !r.z.st.eng;
      cell(name, !driven ? "FAIL" : n <= 16 ? "PASS" : "FAIL", `${driven ? "" : `NOT DRIVEN (engaged ${r.d.st.eng}, released ${!r.z.st.eng}) · `}${mode} engaged (promoted ${r.d.st.promoted}) · scroller border-radius 40 px, the control's end in its corner, 6 px past the top edge · px² of the top corners outside the rounded padding box (${area} px² read, the 1.5 px antialias band excluded) that differ ≥ ${LUMA_STEP} levels engaged against released: ${n} (bound ≤ 16 px²)`);
    }

    // the place under an ancestor transform (C-E7's cell): the scroller translated (0 30px, as a Sheet's detent or a dialog's
    // entrance moves its content), scaled (0.8 from its corner) or neither (the control): the control's box centre at rest
    // and engaged moves ≤ 2 px, its width ×0.99..1.07 (the grow, nothing else)
    if (want("place")) for (const mode of MODES) for (const [tag, css] of [["translate", { translate: "0 30px" }], ["scale", { scale: "0.8", transformOrigin: "0 0" }], ["none", {}]]) {
      const name = `E-10 ${sc} clip place · ${tag} · ${mode}`;
      const r = await once(name, mode, async (P) => { await P.page.evaluate(([b, css]) => Object.assign(document.querySelector(b).style, css), [box, css]); await setHid(P.page, -40); await P.page.waitForTimeout(100); return { rect: await rectOf(P.page) }; },
        async (P) => ({ rect: await rectOf(P.page), st: await stateOf(P.page) }), null);
      if (r.crashed) { cell(name, "FAIL", r.line); continue; }
      const a0 = r.pre.rect, a1 = r.d.rect; const dc = Math.hypot(a1.x - a0.x, a1.y - a0.y), kw = a1.w / a0.w;
      cell(name, !r.d.st.eng ? "FAIL" : dc <= 2 && kw >= 0.99 && kw <= 1.07 ? "PASS" : "FAIL", `${r.d.st.eng ? "" : "NOT DRIVEN (not engaged) · "}${mode} engaged (promoted ${r.d.st.promoted}) · the scroller ${tag === "none" ? "untransformed (the control)" : `${tag} ${Object.values(css)[0]}`} · the control's centre at rest (${f(a0.x, 1)}, ${f(a0.y, 1)}), width ${f(a0.w, 1)} px → engaged (${f(a1.x, 1)}, ${f(a1.y, 1)}), width ${f(a1.w, 1)} px: the centre moves ${f(dc, 1)} px (bound ≤ 2) and the width ×${f(kw, 3)} (bound 0.99..1.07: the grow)`);
    }

    // the scroll film (C-E7's cell, REGISTRY §P7-7 items 1 and 5): keyboard-engaged, the control 30 px inside the scroller,
    // the scroller moved by (wheel) twelve 8 px wheel ticks over its own area 16 ms apart or (smooth) a smooth scrollBy of
    // 90 px; the context records video at 1:1 (no mid-film screenshot). Per decoded frame, px² of the 24 px strip above the
    // scroller differing ≥ 40 levels (video coding noise) from the PER-PIXEL MEDIAN of the film's own frames (the page as it
    // stands; a film that opens on blank frames, as WebKit's does, has them dropped: a frame whose 80 px band above the
    // scroller is uniform, std < 3 levels). The film is read from FILM_LEAD ms before the drive (the page at rest, the
    // control placed) to its end: the navigation's own frames are not the page either (WebKit's first two or three frames
    // after the blank ones differ 100-650 px² from the median, engaged and released alike). Three engaged and three
    // released films per drive. Bound: no engaged frame over the
    // released films' largest + one row of the control (a moving edge's antialiasing). Touch: no film (a touch hold cannot
    // be held across a recorded wheel drive in macOS WebKit, which has no touch scrolling; the touch path is the vanish cell's)
    if (want("film")) for (const drive of ["wheel", "smooth"]) {
      const name = `E-10 ${sc} clip film · ${drive}`;
      const r = await guard(name, async () => {
        const vdir = fs.mkdtempSync(path.join(os.tmpdir(), "e10film-"));
        try {
          const b = await E.nav(); const runs = [];
          for (const mode of ["engaged", "released", "engaged", "released", "engaged", "released"]) {
            const ctx = await b.newContext({ viewport: { width: 700, height: 500 }, deviceScaleFactor: 1, reducedMotion: "no-preference", recordVideo: { dir: vdir, size: { width: 700, height: 500 } } });
            let page, x = null, t0 = 0;
            try {
              page = await ctx.newPage(); t0 = Date.now();
              await page.addInitScript(INIT);
              await page.goto(`${T.url}?${new URLSearchParams({ scene: sc, theme: "light" })}`);
              await page.waitForFunction(() => window.__e && window.__e.ready === true, null, { timeout: 60000 });
              if (mode === "engaged") { await page.focus('[data-sentinel="before"]'); await page.keyboard.press(tabKey(engine)); await page.waitForTimeout(600); }
              const g = await setHid(page, -30); await page.waitForTimeout(500); const lead = Math.max(0, Date.now() - t0 - FILM_LEAD);
              if (drive === "wheel") { await page.mouse.move(g.bl + 8, g.bb - 10); for (let k = 0; k < 12; k++) { await page.mouse.wheel(0, 8); await page.waitForTimeout(16); } }
              else await page.evaluate((s) => document.querySelector(s).scrollBy({ top: 90, behavior: "smooth" }), box);
              await page.waitForTimeout(900);
              const st = await stateOf(page); const g2 = await page.evaluate((s) => document.querySelector(s).scrollTop, box);
              x = { mode, g, st, moved: g2 - g.st, lead };
            } finally { const v = page?.video(); await ctx.close(); if (x && v) { x.video = await v.path(); runs.push(x); } }
          }
          const out = [];
          for (const x of runs) {
            const H = 80, W = Math.floor(x.g.br - x.g.bl), cx = Math.max(0, Math.floor(x.g.bl)), cy = Math.max(0, Math.floor(x.g.bt) - H - 2);
            const raw = execFileSync("ffmpeg", ["-v", "error", "-i", x.video, "-ss", `${x.lead / 1000}`, "-vf", `crop=${W}:${H}:${cx}:${cy}`, "-pix_fmt", "gray", "-f", "rawvideo", "-"], { maxBuffer: 1 << 28 });
            const N = Math.floor(raw.length / (W * H)); const frames = [];
            for (let k = 0; k < N; k++) { const fr = raw.subarray(k * W * H, (k + 1) * W * H); let s = 0, s2 = 0; for (let i = 0; i < fr.length; i++) { s += fr[i]; s2 += fr[i] * fr[i]; } const sd = Math.sqrt(Math.max(0, s2 / fr.length - (s / fr.length) ** 2)); if (sd >= 3) frames.push(fr.subarray((H - 24) * W)); }
            const S = 24 * W, med = new Uint8Array(S), col = new Uint8Array(frames.length);
            for (let i = 0; i < S; i++) { for (let k = 0; k < frames.length; k++) col[k] = frames[k][i]; med[i] = col.slice().sort()[frames.length >> 1]; }
            const area = frames.map((fr) => { let c = 0; for (let i = 0; i < S; i++) if (Math.abs(fr[i] - med[i]) >= 40) c++; return c; });
            out.push({ mode: x.mode, n: N, kept: frames.length, area, hw: x.g.hw, eng0: x.g.eng, st: x.st, moved: x.moved });
          }
          return { out };
        } finally { fs.rmSync(vdir, { recursive: true, force: true }); }
      }, 480000);
      if (r.crashed) { cell(`${name} · engaged`, "FAIL", r.line); continue; }
      const rel = r.out.filter((x) => x.mode === "released"), engd = r.out.filter((x) => x.mode === "engaged");
      const relMax = Math.max(0, ...rel.flatMap((x) => x.area)); const hw = r.out[0]?.hw ?? 0; const bound = relMax + hw;
      const lineOf = (x) => { const most = Math.max(0, ...x.area); return `${x.kept} of ${x.n} frames read (largest ${most} px² at frame ${x.area.indexOf(most)}; frames over 100 px²: ${x.area.map((v, i) => (v > 100 ? `${i}:${v}` : null)).filter(Boolean).join(" ") || "none"}), scrolled ${f(x.moved, 0)} px`; };
      const bad = engd.filter((x) => Math.max(0, ...x.area) > bound), undriven = engd.filter((x) => !x.eng0 || !(x.moved > 20)).concat(rel.filter((x) => x.eng0 || !(x.moved > 20)));
      const ok = engd.length === 3 && rel.length === 3 && !undriven.length;
      cell(`${name} · engaged`, !ok ? "FAIL" : bad.length ? "FAIL" : "PASS", `${ok ? "" : `NOT DRIVEN (${engd.length} engaged and ${rel.length} released films; ${undriven.length} not engaged as named or not scrolled > 20 px) · `}keyboard engaged, the scroller moved by ${drive === "wheel" ? "twelve 8 px wheel ticks" : "a smooth 90 px scrollBy"} · px² of the 24 px strip above the scroller differing ≥ 40 levels from the film's per-pixel median · engaged films: ${engd.map(lineOf).join(" | ")} · bound ≤ the released films' largest ${relMax} + one row × ${hw} px = ${bound}; ${bad.length} of ${engd.length} engaged films over it`);
      cell(`${name} · released`, "REPORT", rel.map(lineOf).join(" | "));
    }
  }
  // ── H7: the rebound re-pointed to O-103d (1): the pop's reverse (REPORT) and the instant reverse under reduce (graded) ──
  const popFilm = ([gap, ms]) => new Promise((res) => {
    const face = document.querySelector('[data-e~="face"]') ?? document.querySelector('[data-e~="target"]');
    const st = () => JSON.stringify(window.__e.state?.() ?? null);
    const fr = []; const s0 = st(); const t0 = performance.now(); window.__e.commit(); const s1 = st(); let flipped = gap == null, s2 = null;
    const tick = () => {
      const t = performance.now() - t0;
      if (!flipped && t >= gap) { window.__e.commit(); flipped = true; s2 = st(); }
      fr.push({ t, s: face ? window.__eff(face).s : NaN });
      if (t < ms) requestAnimationFrame(tick); else res({ fr, s0, s1, s2 });
    };
    requestAnimationFrame(tick);
  });
  const faceBox = (page) => page.evaluate(() => { const e = document.querySelector('[data-e~="face"]') ?? document.querySelector('[data-e~="target"]'); if (!e) return null; const r = e.getBoundingClientRect(); return { x: Math.max(0, Math.floor(r.x) - 2), y: Math.max(0, Math.floor(r.y) - 2), width: Math.ceil(r.width) + 4, height: Math.ceil(r.height) + 4 }; });
  const stepOf = (S) => Math.max(0, ...S.slice(1).map((x, k) => (Math.abs(x.s - S[k].s) * NOM) / Math.max(NOM, x.t - S[k].t)));
  const popsOf = (S) => S.filter((x, k) => k > 0 && k < S.length - 1 && x.s > 1 + TOL && x.s >= S[k - 1].s && x.s > S[k + 1].s).length;
  for (const [sc] of rebounds) {
    for (const theme of ["light", "dark"]) {
      let stepRef = null;
      for (const gap of [null, 60, 200]) {
        const name = gap == null ? `E-10 ${sc} rebound single ${theme}` : `E-10 ${sc} rebound reverse +${gap} ${theme}`;
        const r = await guard(name, async () => {
          const P = await openPage(E, T, sc, { theme });
          try { await P.page.waitForTimeout(300); return await P.page.evaluate(popFilm, [gap, 900]); } finally { await P.close(); }
        });
        if (r.crashed) { cell(name, "REPORT", r.line); continue; }
        const S = r.fr.filter((x) => Number.isFinite(x.s)); const step = stepOf(S); const pops = popsOf(S);
        const peak = S.reduce((q, x) => (x.s > q.s ? x : q), { s: -1, t: 0 });
        const trace = S.filter((_, k) => k % 4 === 0).map((x) => `+${x.t.toFixed(0)} ${x.s.toFixed(4)}`).join(" ");
        if (gap == null) { stepRef = step; cell(name, "REPORT", `${r.s0 !== r.s1 ? "" : "NOT DRIVEN · "}the single commit's pop (O-103d (1), arm ii): peak ×${f(peak.s, 4)} at +${f(peak.t, 0)} ms, largest one-frame step ${f(step, 4)} per 16.7 ms, pops ${pops} · ${trace}`); continue; }
        const back = r.s2 === r.s0 && r.s1 !== r.s0;
        cell(name, "REPORT", `state ${r.s0} → ${r.s1} → ${back ? "back" : "NOT BACK"} at +${gap} · largest one-frame step ${f(step, 4)} against the single pop's ${f(stepRef, 4)} (a retarget from zero velocity: REGISTRY §P6-7 item 12, recorded, not scored) · rests ×${f(S.at(-1)?.s, 4)} · pops ${pops} · ${trace}`);
      }
      // the instant-state form under reduce (CK-02 PRM, CK-10): graded
      for (const gap of [60, 200]) {
        const name = `E-10 ${sc} rebound reverse (PRM) +${gap} ${theme}`;
        const r = await guard(name, async () => {
          const P = await openPage(E, T, sc, { theme, prm: true });
          try {
            if (!P.modeOk) return { mode: P.modeLine };
            await P.page.waitForTimeout(300);
            const bb = await faceBox(P.page); if (!bb) return { none: true };
            const before = luma(await P.page.screenshot({ clip: bb }));
            const fl = await P.page.evaluate(popFilm, [gap, 600]);
            await P.page.waitForTimeout(300);
            const after = luma(await P.page.screenshot({ clip: bb }));
            let n = 0; for (let i = 0; i < before.o.length; i++) if (Math.abs(before.o[i] - after.o[i]) >= LUMA_STEP) n++;
            return { ...fl, frac: before.o.length ? n / before.o.length : NaN };
          } finally { await P.close(); }
        });
        if (r.crashed) { cell(name, "FAIL", r.line); continue; }
        if (r.mode) { cell(name, "FAIL", `MODE NOT APPLIED ${r.mode}`); continue; }
        if (r.none) { cell(name, "FAIL", "no face or target to read"); continue; }
        const S = r.fr.filter((x) => Number.isFinite(x.s)); const ss = S.map((x) => x.s);
        const range = ss.length ? Math.max(...ss) - Math.min(...ss) : NaN;
        const inFlight = S.filter((x) => Math.abs(x.s - S[0].s) >= TOL && Math.abs(x.s - S.at(-1).s) >= TOL).length;
        const back = r.s2 === r.s0 && r.s1 !== r.s0;
        if (!back) { cell(name, "FAIL", `NOT DRIVEN: the state did not go and come back (${r.s0} → ${r.s1} → ${r.s2})`); continue; }
        const instant = range < TOL && inFlight <= 1; const rests = r.frac < LUMA_FRAC;
        cell(name, instant && rests ? "PASS" : "FAIL", `reduce · state ${r.s0} → ${r.s1} → back at +${gap} · instant: the face's scale range ${f(range, 4)} (bound < ${TOL}), in flight on ${inFlight} frame(s) (bound ≤ 1) over ${S.length} frames · rests where it began: 300 ms after the reverse ${f(r.frac * 100, 1)} % of the face's pixels differ by ≥ ${LUMA_STEP} levels from before the commit (bound < ${LUMA_FRAC * 100} %)`);
      }
    }
  }
}, 3600);
