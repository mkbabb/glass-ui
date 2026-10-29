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
// The sortable and tabs teleports are CK-05's continuity cell (E-4).
//   node e10-continuity.mjs --build <dir> | --fixture [--fault e10-snap|e10-teleport|e10-teleportin] [--engine webkit]
import { witness, openPage, scenesFor, center, tabKey, f, GLASS } from "./lib.mjs";
const { PNG } = (await import(`${GLASS}/node_modules/pngjs/lib/png.js`)).default;
const luma = (buf) => { const p = PNG.sync.read(buf); const o = new Float32Array(p.width * p.height); for (let i = 0, j = 0; i < p.data.length; i += 4, j++) o[j] = 0.2126 * p.data[i] + 0.7152 * p.data[i + 1] + 0.0722 * p.data[i + 2]; return { w: p.width, h: p.height, o }; };
const LUMA_STEP = 16, LUMA_FRAC = 0.05, REF_READS = 3, VANISH_ROWS = 3;

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

await witness("E-10", "CK-20 no one-frame discontinuity on an engagement path", async ({ E, T, cell, guard, idx, engine }) => {
  const all = scenesFor(idx, "E-10");
  const single = all.filter(([, m]) => !m.pair && !m.stale && !m.rebound && !m.clip);
  const pairs = all.filter(([, m]) => m.pair);
  const stales = all.filter(([, m]) => m.stale);
  const rebounds = all.filter(([, m]) => m.rebound);
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
    for (const side of ["top", "bottom"]) for (const dir of ["reveal", "conceal", "control"]) {
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
    for (const side of ["top", "bottom"]) for (const dir of ["reveal", "conceal", "control"]) {
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
    // ── H7: C-E6's clip-vanish (the promoted control against the scroller that clips its place) ──
    {
      const name = `E-10 ${sc} clip-vanish · keyboard`;
      const HIDS = [14, 15, 16, 17, 18, 19, 20, 21, 22];
      const r = await guard(name, async () => {
        const P = await openPage(E, T, sc);
        try {
          const { page } = P;
          await page.focus('[data-sentinel="before"]'); await page.keyboard.press(tabKey(engine)); await page.waitForTimeout(600);
          const setHid = (hid) => page.evaluate(([boxSel, restSel, rootSel, engSel, hid]) => {
            const b = document.querySelector(boxSel), q = document.querySelector(restSel), h = document.querySelector(rootSel);
            const br = b.getBoundingClientRect(); const visTop = br.top + b.clientTop; const rr = q.getBoundingClientRect();
            b.scrollTop += rr.top - (visTop - hid);
            return new Promise((ok) => requestAnimationFrame(() => requestAnimationFrame(() => { const b2 = b.getBoundingClientRect(); ok({ visTop: b2.top + b.clientTop, l: b2.left + b.clientLeft, w: b.clientWidth, eng: h.matches(engSel), hw: h.offsetWidth, restH: q.getBoundingClientRect().height }); })));
          }, [box, rest, root, eng, hid]);
          const g0 = await setHid(HIDS[0]);
          const clipR = { x: Math.max(0, Math.floor(g0.l)), y: Math.max(0, Math.floor(g0.visTop) - 26), width: Math.floor(g0.w), height: 24 };
          const engShots = []; let engAll = true;
          for (const hid of HIDS) { const g = await setHid(hid); engAll = engAll && g.eng; await page.waitForTimeout(60); engShots.push(luma(await page.screenshot({ clip: clipR }))); }
          await page.keyboard.press("Escape"); await page.waitForTimeout(700);
          const relEng = await page.evaluate(([rootSel, engSel]) => document.querySelector(rootSel).matches(engSel), [root, eng]);
          const restShots = [];
          for (const hid of HIDS) { await setHid(hid); await page.waitForTimeout(60); restShots.push(luma(await page.screenshot({ clip: clipR }))); }
          const area = engShots.map((e, k) => { let n = 0; const z = restShots[k]; for (let i = 0; i < e.o.length; i++) if (Math.abs(e.o[i] - z.o[i]) >= LUMA_STEP) n++; return n; });
          return { area, engAll, relEng, hw: g0.hw, restH: g0.restH };
        } finally { await P.close(); }
      }, 120000);
      if (r.crashed) cell(name, "FAIL", r.line);
      else {
        const steps = r.area.slice(1).map((x, k) => r.area[k] - x); const worst = Math.max(...steps.map(Math.abs)); const bound = VANISH_ROWS * r.hw;
        const driven = r.engAll && !r.relEng;
        cell(name, !driven ? "FAIL" : worst <= bound ? "PASS" : "FAIL", `${driven ? "" : `NOT DRIVEN: engaged on every step ${r.engAll}, released after Escape ${!r.relEng} · `}keyboard engaged · px² of the strip above the scroller that differ from the released strip (the control painted outside its card; a page-wide engaged paint such as a veil reads as a constant) per 1 px step of the ${f(r.restH, 1)} px rest box past its top edge (hidden ${HIDS.join("/")}): ${r.area.join(" / ")} (largest ${Math.max(...r.area)}) · largest change between adjacent steps ${worst} px² (bound ≤ ${VANISH_ROWS} rows × the control's ${r.hw} px = ${bound}: a 1 px scroll moves ≤ 1 px of the control; a larger drop is the control leaving the paint in one step)`);
      }
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
});
