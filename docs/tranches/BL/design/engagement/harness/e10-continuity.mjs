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
//   H9 (pass 9; REGISTRY §P8-7 items 1, 2, 3, 8; §P8-8.3 wave 1): the invariant on the ancestor kinds, paths and clocks the
//                    pass-8 critics drove (C-E8's ce8-probe anc/trail, C-A8's ca8-probe ancestor/dlg/glidescale/feather),
//                    each a gating cell with a fixture plant; `--part anc,dlg,trail,glide` runs them alone, `feather` the
//                    feather cell (now two-sided):
//   clip feather     TWO-SIDED (§P8-7 item 1): the ratio of ratios inside 1 ± 0.10 (H8's bound was the upper side only, so a
//                    body under-painted by its mask passed: WebKit's keyboard ×0.58). Plants e10-rectclip-feather (over),
//                    e10-featherunder (under)
//   anc <kind> · keyboard|touch|fine   on `clip` rows: the scroller given `opacity: 0.5`, `filter: invert(1)`, `clip-path:
//                    inset(0 45% 0 0)` or `rotate: 3deg` (or nothing: the row's own reference, REPORT); the rest box 40 px
//                    inside it. The region is the scroller's painted box + 8 px; vis(x) = Σ|luma(x) − the region with the
//                    control hidden| (ANC_MEASURE); the ratio vis(engaged) / vis(released 800 ms later) over the same ratio
//                    with nothing set, two-sided ANC_K = 1 ± 0.10 (an in-place body reads 1; the clean fixture's scatter is
//                    in ANC_SCATTER, read before the bound). A pointer is aimed at the thumb's painted centre and the line
//                    prints what it hit. A kind whose in-place read scatters past the bound in an engine is REPORT there
//                    (ANC_REPORT: WebKit's filter). Plant e10-ancpromote (promoted over its place with the pass-8 copy:
//                    overflow clip, translate, scale; nothing else)
//   dlg · esc2|scrim on rows with `dlg` (a slider inside a presented dialog plate, opened with the row's `q`): Tab from `from`
//                    engages the slider, then the dialog is dismissed (Escape, 40 ms, Escape; a click outside the plate) and
//                    filmed 1400 ms per frame: the effective opacity of the plate and of the slider's root (the product of
//                    opacity up its ancestors, stopping at a top-layer element; 0 once disconnected). Bound: the root's
//                    largest one-frame step ≤ the plate's own largest one-frame step + DLG_TOL (an in-place root fades with
//                    its plate). NOT DRIVEN unless engaged before the dismissal and the plate faded or left. Plant
//                    e10-dlgpromote (promoted while engaged and kept on its exit clock at opacity 1)
//   trail · wheel-over|wheel-away|page   the place film (§P8-7 item 2; C-E8's trail with C-A8's page drive): the spacer
//                    above the rest box painted red and the root blue; keyboard-engaged; the scroller (wheel-over, the
//                    pointer over the control; wheel-away, over the scroller's content beside it) or the page (the pointer
//                    outside the scroller) moved by six 8 px wheel ticks; recorded video 1:1, from FILM_LEAD before the
//                    drive; per frame in one column through the root, the distance from the red spacer's last row to the
//                    root's first blue row, against its own median. Three engaged and three released films. Chromium:
//                    every engaged film's worst |Δ| ≤ the released films' worst + 1 px. WebKit: REPORT (its 25 fps film is
//                    no one-frame witness, H8 §5; §P8-7 item 9). Plant e10-traillate (Chromium)
//   glidescale · none|scale   C-A8's glidescale: keyboard-engaged, the scroller under `scale: 0.8` (origin 0 0) or not; a
//                    40 px block inserted before the rest box inside the scroller (a re-render); rAF film of the root's
//                    painted centre: the move in the insertion's frame under scale ≤ the same move unscaled + 1 px (the
//                    glide starts where the control was painted). NOT DRIVEN unless engaged throughout and the place moved
//                    > 10 px. Plant e10-glidescale (the glide's translate written in the painted frame's units, not its
//                    parent's)
// The sortable and tabs teleports are CK-05's continuity cell (E-4).
//   node e10-continuity.mjs --build <dir> | --fixture [--fault e10-snap|e10-teleport|e10-teleportin] [--engine webkit]
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { witness, openPage, openTouchPage, scenesFor, center, tabKey, f, GLASS, INIT, rowsOf, rowFacts, rodeRow, sideFilm, sideSetup } from "./lib.mjs";
const { PNG } = (await import(`${GLASS}/node_modules/pngjs/lib/png.js`)).default;
const luma = (buf) => { const p = PNG.sync.read(buf); const o = new Float32Array(p.width * p.height); for (let i = 0, j = 0; i < p.data.length; i += 4, j++) o[j] = 0.2126 * p.data[i] + 0.7152 * p.data[i + 1] + 0.0722 * p.data[i + 2]; return { w: p.width, h: p.height, o }; };
const FILM_LEAD = 300; // ms of the film kept before the drive (the clip film cell)
const LUMA_STEP = 16, LUMA_FRAC = 0.05, REF_READS = 3, VANISH_ROWS = 3;
// H8: the feather cell's bound on (engaged ÷ released, feathered) ÷ (the same, unfeathered). The invariant says the body
// paints EXACTLY what its place paints, so an in-place body reads 1: the clean fixture reads 0.99 (keyboard) and 0.99
// (touch) in Chromium; C-E7's unfeathered control ×1.00-1.05. 1.10 is that scatter, not C-E7's 1.25, which the pass-7
// construction's touch arm passed at 1.16 (H8 §3)
const FEATHER_K = 1.1;
// H9: the two-sided form (REGISTRY §P8-7 item 1): an in-place body reads 1 from below too
const FEATHER_LO = 0.9;
// H9: the ancestor-kind cells (REGISTRY §P8-7 item 3). ANC_K: two-sided bound on the ratio of ratios. ANC_REPORT: the
// (engine, kind, mode) cells where an IN-PLACE body (the clean fixture, or the library's in-place builds, which are their
// place by construction) reads past the bound, so the read cannot tell a place defect from the engine's own paint there;
// REPORT, each measured before the bound was set (../pass-9/H9.md §2): Chromium rotate on a pointer (the in-place held
// fill paints paler under a rotated ancestor: ×0.79-0.81 on the in-place probe and on pass 8's fine path, the press on the
// slider, its value unchanged), Chromium filter on a pointer (the clean fixture ×0.88), WebKit filter (the in-place probe
// ×1.10-1.38, C-E8) and WebKit keyboard rotate (×1.11, C-E8). Every kind stays graded in each engine on some mode DLG_TOL: the dialog root's one-frame step over the plate's own. TRAIL_TOL: px over the released films' worst.
// GLIDE_TOL: px over the unscaled glide's insertion-frame move
const ANC_K = 0.1, ANC_INSET = 40;
const ANC_KINDS = { opacity: { opacity: "0.5" }, filter: { filter: "invert(1)" }, clippath: { clipPath: "inset(0 45% 0 0)" }, rotate: { rotate: "3deg" } };
const ANC_REPORT = { chromium: { rotate: ["touch", "fine"], filter: ["touch", "fine"] }, webkit: { filter: ["keyboard", "touch", "fine"], rotate: ["keyboard"] } };
const DLG_TOL = 0.05, TRAIL_TOL = 1, GLIDE_TOL = 1;

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
const PTR_INSET = 12;
// ── H10: the lens's side (CK-20; REGISTRY §P9-7 items 1, 2, 6; §P9-8.1). rowsOf, curveOf, rowFacts, sideFilm, sideSetup: lib.mjs (H11) ──
// The film's verdict. A side change: the rel sign flips.
// H11 (REGISTRY §P10-7 items 1, 3): THE STEP is the largest move of the lens's centre against its track's over any 16.7 ms of REAL
// time, rel interpolated between samples (C-E10's `ce10` form). H10 read it per sample (7.6-10 ms apart in the headless engines)
// against a bound per 16.7 ms frame, about 2× lenient: `plant-fast` at 3× its clock read only 17.1-25.8 px against 12.3-15.1 (C-E10
// §1.5). THE SPAN is read in one frame, the film's last: the lens's painted height plus its track's (pinned edge to pinned edge, the
// distance a side change carries the centre), so a lens whose travel ends off its edge still meets the span it owed; the
// first-to-last rel distance is printed beside it. THE BOUND: that span × the row's largest one-frame fraction + 1 px (the read's
// resolution), the row the one whose clock a running animation on the lens carries, else the library's fastest (printed). Off its
// edge (|pin| > 2): only inside one window of a change, no longer than the row's clock × 1.5 + 150 ms, inside the span (the row's
// overshoot + 2 px), and the film ends pinned. WHOLE (H11, REGISTRY §P10-8.1 "whole at the viewport's top during and after the
// change"): at most two drive steps + 2 px above the viewport on any frame, and whole at the end. The two steps are the read's
// resolution on this drive: the side is decided from the place laid in one frame while the drive moves the track a step in each
// (C-A10 §4 item 4 read 2.0-3.9 px on a 3 px page step, H11 4.7 px on zoomcure's page · zoom 1.25); the pass-10 candidate under
// zoom 1.25 and 2 reads 40-52 px
const sideRead = (r, rows, rate) => { const S = r.out; const facts = rows.map(rowFacts).filter((x) => Number.isFinite(x.peak)); const fastest = facts.reduce((p, x) => (!p || x.peak > p.peak ? x : p), null);
  let changes = 0; for (let i = 1; i < S.length; i++) if (S[i].rel > 0 !== S[i - 1].rel > 0) changes++;
  const relA = S[0].rel, relZ = S.at(-1).rel, spanRel = changes ? Math.abs(relZ - relA) : 0; const end = S.at(-1);
  const span = changes ? end.H + (end.tb - end.tt) : 0;
  const ams = [...new Set(S.flatMap((x) => x.an.filter((y) => y.p !== "opacity").map((y) => y.ms)))];
  const rode = rodeRow(ams, rows); const row = rode ?? fastest;
  const bound = span * (row?.peak ?? 0) + 1;
  const relAt = (t) => { for (let i = 1; i < S.length; i++) if (S[i].t >= t) { const a = S[i - 1], b = S[i]; return a.rel + ((b.rel - a.rel) * (t - a.t)) / Math.max(1e-6, b.t - a.t); } return S.at(-1).rel; };
  let step = 0, atT = NaN; for (const x of S) if (x.t - S[0].t >= NOM) { const d = Math.abs(x.rel - relAt(x.t - NOM)); if (d > step) { step = d; atT = x.t; } }
  const dts = S.slice(1).map((x, i) => x.t - S[i].t).sort((p, q) => p - q); const mdt = dts.length ? dts[dts.length >> 1] : NaN;
  const off = S.map((x, i) => ({ i, x })).filter((y) => Math.abs(y.x.pin) > 2);
  const win = off.length ? S[off.at(-1).i].t - S[off[0].i].t : 0; const winMax = (row?.ms ?? 0) * 1.5 + 150;
  const lo = Math.min(relA, relZ) - spanRel * (row?.over ?? 0) - 2, hi = Math.max(relA, relZ) + spanRel * (row?.over ?? 0) + 2; const outside = S.filter((x) => x.rel < lo || x.rel > hi).length;
  const dxMax = Math.max(...S.map((x) => Math.abs(x.dx))); const reached = Math.min(...S.map((x) => x.tt - x.H));
  const whole = end.lt >= -0.5 && end.lb <= (r.vh ?? 500) + 0.5; const above = Math.max(0, ...S.map((x) => -x.lt)); const aboveMax = 2 * (rate ?? 0) + 2;
  return { changes, relA, relZ, span, spanRel, ams, rode, row, fastest, bound, step, atT, mdt, off, win, winMax, outside, dxMax, reached, end, whole, above, aboveMax, n: S.length, pinEnd: Math.abs(end.pin) <= 2 };
};
// `lensfilm` (§P9-7 item 6), graded where `e10-lenslate` separates (`../pass-10/H10.md` §5). Chromium's film does: the clean anchored fixture 0-2 px, the
// plant one tick, 8 px. WebKit's does not: the plain anchored fixture reads the same 8 px as the plant, and its count of off frames overlaps on the scale
// card, so it stays REPORT, with the count printed.
const LENSFILM_GRADED = { chromium: true, webkit: false };
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
          // before the press: the rest box fully in view, PTR_INSET px inside the named edge. H10 (REGISTRY §P9-7 item 8): at 2 px the
          // reveal ended (2 + hidden) − (hidden − 2) = 4 px from where the press read the place, exactly the 4 px bound, so a stage
          // that read the place only at the press passed both reveal cells; at 12 px it ends 14 px from it
          await page.evaluate(([boxSel, restSel, side, inset]) => {
            const b = document.querySelector(boxSel), rest = document.querySelector(restSel); const br = b.getBoundingClientRect(); const visTop = br.top + b.clientTop, visBot = visTop + b.clientHeight;
            const q = rest.getBoundingClientRect(); b.scrollTop += side === "top" ? q.top - (visTop + inset) : q.bottom - (visBot - inset);
          }, [box, rest, side, PTR_INSET]);
          await page.waitForTimeout(200);
          const st0 = await page.evaluate((b) => document.querySelector(b).scrollTop, box);
          const c = await center(page, '[data-e~="thumb"]');
          await page.mouse.move(c.x, c.y); await page.mouse.down();
          try {
            await page.waitForTimeout(400);
            const sA = await page.evaluate(clipRead, [box, rest, root, eng]);
            const hidden = Math.round(sA.h * 0.7);
            // the clip by a style write: top → the spacer shrinks by PTR_INSET + hidden; bottom → it grows by PTR_INSET + hidden
            const sp1 = side === "top" ? spacer - (PTR_INSET + hidden) : spacer + (PTR_INSET + hidden);
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
      cell(name, !driven ? "FAIL" : w.d <= STALE ? "PASS" : "FAIL", `${driven ? "" : `NOT DRIVEN: engaged at the press ${sA.eng}, before the move ${s0.eng}, on ${fr.filter((x) => x.eng[0]).length} of ${fr.length} frames, rest box clipped ${clipped} (${f(s0.vis, 1)} of ${f(s0.h, 1)} px visible), move landed ${landed}, box never scrolled under the hold ${still} · `}pointer held, the place ${f(s1.top - sA.top, 1)} px from where the press read it (the box scrolled to ${r.st0} BEFORE the press, ${r.st1} after the film) · clipped by the spacer to ${f(s0.vis, 1)} of ${f(s0.h, 1)} px visible · ${sign ? `then the spacer ${sign > 0 ? "+" : "−"}${d} px by a style write (${dir})` : "no move (the control)"}: the rest box's top ${f(s0.top, 1)} → ${f(s1.top, 1)} px (Δ ${f(moved, 1)}) · then a node appended below the scroller (moves nothing): the root's largest one-frame centre move per 16.7 ms ${f(w.d, 1)} px${w.d > 0 ? ` at +${f(w.t, 0)} ms` : ""} over ${fr.length} frames (bound ≤ ${STALE} px)`);
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
      const kOn = ratio(on), kOff = ratio(off), bound = FEATHER_K * kOff, lo = FEATHER_LO * kOff;
      const driven = on.d.st.eng && !on.z.st.eng && off.d.st.eng && !off.z.st.eng && !/^none/.test(on.d.mask);
      cell(name, !driven ? "FAIL" : kOn <= bound && kOn >= lo ? "PASS" : "FAIL", `${driven ? "" : `NOT DRIVEN (engaged ${on.d.st.eng}/${off.d.st.eng}, released ${!on.z.st.eng}/${!off.z.st.eng}, mask ${on.d.mask}) · `}${mode} engaged (promoted ${on.d.st.promoted}) · the scroller's feather: ${on.d.mask} · the control 4 px inside its feathered top edge · visibility in the scroller's top 28 px, engaged over released: ×${f(kOn, 3)} feathered, ×${f(kOff, 3)} unfeathered (the grow's own gain) · ratio of ratios ${f(kOn / kOff, 3)} · two-sided bound ${FEATHER_LO}..${FEATHER_K} × ×${f(kOff, 3)} = ×${f(lo, 3)}..×${f(bound, 3)} (an in-place body reads 1; H9: under-paint fails as over-paint does)`);
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

    // ── H9: the ancestor kinds (REGISTRY §P8-7 item 3; C-E8's anc, C-A8's ancestor). The invariant names "every clip, mask,
    // radius and transform of its ancestors"; an opacity, a filter, a clip-path and a rotation are four the pass-8 copy
    // left out. Read on a fresh page per kind and mode; the region is the scroller's painted box + 8 px
    if (want("anc")) {
      const ref = {};
      for (const mode of ["keyboard", "touch", "fine"]) for (const kind of ["none", ...Object.keys(ANC_KINDS)]) {
        const name = `E-10 ${sc} anc ${kind} · ${mode}`;
        const r = await guard(name, async () => {
          const P = mode === "touch" ? await openTouchPage(E, T, sc) : await openPage(E, T, sc);
          try {
            if (mode === "touch" && !P.modeOk) return { mode: P.modeLine };
            const { page } = P;
            await hideLoupe(page, mode === "keyboard" ? "keyboard" : "touch");
            if (kind !== "none") await page.evaluate(([b, css]) => Object.assign(document.querySelector(b).style, css), [box, ANC_KINDS[kind]]);
            await setHid(page, -ANC_INSET); await page.waitForTimeout(150);
            const reg = await page.evaluate((b) => { const q = document.querySelector(b).getBoundingClientRect(); return { x: q.left, y: q.top, w: q.width, h: q.height }; }, box);
            const clip = { x: Math.max(0, Math.floor(reg.x) - 8), y: Math.max(0, Math.floor(reg.y) - 8), width: Math.ceil(reg.w) + 16, height: Math.ceil(reg.h) + 16 };
            await page.evaluate((q) => { document.querySelector(q).style.visibility = "hidden"; }, rest); await page.waitForTimeout(100);
            const empty = luma(await shotOf(P, clip));
            await page.evaluate((q) => { document.querySelector(q).style.visibility = ""; }, rest); await page.waitForTimeout(150);
            let eng = null, st = null, hit = "—";
            const during = async () => { eng = luma(await shotOf(P, clip)); st = await stateOf(page); };
            if (mode === "keyboard") { await page.focus('[data-sentinel="before"]'); await page.keyboard.press(tabKey(engine)); await page.waitForTimeout(600); await during(); await page.keyboard.press("Escape"); }
            else {
              // aimed at the thumb's painted centre (its box under every ancestor transform); the line prints what the point hits
              const c = await center(page, thumbSel);
              hit = await page.evaluate(([x, y, rt]) => { const e = document.elementFromPoint(x, y), h = document.querySelector(rt); return e && h && h.contains(e) ? "the slider" : `NOT the slider (${e ? (e.className || e.tagName).toString().slice(0, 40) : "nothing"})`; }, [c.x, c.y, root]);
              if (mode === "fine") { await page.mouse.move(c.x, c.y); await page.mouse.down(); try { await page.waitForTimeout(700); await during(); } finally { await page.mouse.up(); } }
              else await P.holdAt(c.x, c.y, [700], during);
            }
            await page.waitForTimeout(800);
            const rel = luma(await shotOf(P, clip)); const z = await stateOf(page);
            return { empty, eng, rel, st, z, hit };
          } finally { await P.close(); }
        }, 120000);
        if (r.crashed) { cell(name, kind === "none" ? "REPORT" : "FAIL", r.line); continue; }
        if (r.mode) { cell(name, "FAIL", `MODE NOT APPLIED ${r.mode}`); continue; }
        const vis = (x) => { let s2 = 0; for (let i = 0; i < x.o.length; i++) s2 += Math.abs(x.o[i] - r.empty.o[i]); return s2; };
        const k = vis(r.eng) / Math.max(1, vis(r.rel)); const driven = !!r.st?.eng && !r.z.eng;
        const head = `${driven ? "" : `NOT DRIVEN (engaged ${r.st?.eng}, released ${!r.z.eng}) · `}${mode} engaged (promoted ${r.st?.promoted})${mode === "keyboard" ? "" : ` · the pointer aimed at the thumb's painted centre hit ${r.hit}`}`;
        if (kind === "none") { ref[mode] = driven ? k : null; cell(name, driven ? "REPORT" : "FAIL", `${head} · the reference: visibility over the scroller's region engaged over released ×${f(k, 3)} (the grow's own gain)`); continue; }
        if (!ref[mode]) { cell(name, "UNMEASURED", `${head} · no reference (anc none · ${mode} unread or not driven)`); continue; }
        const rr = k / ref[mode]; const inBound = Math.abs(rr - 1) <= ANC_K; const rep = (ANC_REPORT[engine]?.[kind] ?? []).includes(mode);
        cell(name, !driven ? "FAIL" : rep ? "REPORT" : inBound ? "PASS" : "FAIL", `${head} · the scroller ${Object.entries(ANC_KINDS[kind]).map(([p, v]) => `${p} ${v}`).join("")} · visibility engaged over released ×${f(k, 3)} against ×${f(ref[mode], 3)} with nothing set · ratio of ratios ${f(rr, 3)} (two-sided bound ${1 - ANC_K}..${1 + ANC_K}: an in-place body reads 1)${rep ? ` · REPORT in ${engine} ${mode}: an in-place body's ${kind} read scatters past the bound here (ANC_REPORT, ../pass-9/H9.md §2); this read is ${inBound ? "inside" : "outside"} it` : ""}`);
      }
    }

    // ── H9: the place film (REGISTRY §P8-7 item 2): the body against its place in the same frame, on the compositor's scroll
    // clock. The film reads PLACE (the red spacer's end to the root's top), not escape; keyboard (the touch path cannot be
    // held across a recorded scroll in macOS WebKit). Chromium graded; WebKit REPORT
    if (want("trail")) for (const drive of ["wheel-over", "wheel-away", "page"]) {
      const name = `E-10 ${sc} trail · ${drive}`;
      const spacerSel = `${box} [data-t="spacer"]`;
      const r = await guard(name, async () => {
        const vdir = fs.mkdtempSync(path.join(os.tmpdir(), "e10trail-"));
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
              const ground = await page.evaluate(([sp, rt, veil, tall]) => {
                const st = document.createElement("style"); st.textContent = `${sp} { background: rgb(230, 0, 0) !important; } ${rt} { background: rgb(0, 0, 230) !important; outline: none !important; }${veil ? ` ${veil} { visibility: hidden !important; }` : ""}`; document.head.appendChild(st);
                if (tall) document.querySelector("main").style.paddingBottom = "1600px";
                // the ground under the column: the first opaque background up from the spacer's parent
                for (let e = document.querySelector(sp)?.parentElement; e; e = e.parentElement) { const m2 = getComputedStyle(e).backgroundColor.match(/rgba?\(([\d.]+), ([\d.]+), ([\d.]+)(?:, ([\d.]+))?\)/); if (m2 && (m2[4] === undefined || +m2[4] > 0.9)) return [+m2[1], +m2[2], +m2[3]]; }
                return [255, 255, 255];
              }, [spacerSel, root, m.veil ?? null, drive === "page"]);
              if (mode === "engaged") { await page.focus('[data-sentinel="before"]'); await page.keyboard.press(tabKey(engine)); await page.waitForTimeout(600); }
              await setHid(page, -92); await page.waitForTimeout(500);
              const g = await page.evaluate(([B, R]) => { const q = document.querySelector(B).getBoundingClientRect(), h = document.querySelector(R).getBoundingClientRect(); return { bl: q.left, bt: q.top, br: q.right, bb: q.bottom, rl: h.left, rc: h.left + h.width / 2, rm: h.top + h.height / 2 }; }, [box, root]);
              const st0 = await stateOf(page); const s0 = await page.evaluate((B) => [document.querySelector(B).scrollTop, scrollY], box);
              const lead = Math.max(0, Date.now() - t0 - FILM_LEAD);
              const at = drive === "wheel-over" ? { x: g.rc + 40, y: g.rm } : drive === "wheel-away" ? { x: g.bl + 8, y: g.bb - 6 } : { x: 620, y: 420 };
              await page.mouse.move(at.x, at.y); for (let k = 0; k < 6; k++) { await page.mouse.wheel(0, 8); await page.waitForTimeout(16); }
              await page.waitForTimeout(700);
              const s1 = await page.evaluate((B) => [document.querySelector(B).scrollTop, scrollY], box); const st1 = await stateOf(page);
              x = { mode, g, st0, st1, moved: drive === "page" ? s1[1] - s0[1] : s1[0] - s0[0], lead, ground };
            } finally { const v = page?.video(); await ctx.close(); if (x && v) { x.video = await v.path(); runs.push(x); } }
          }
          const out = [];
          for (const x of runs) {
            const cx = Math.round(x.g.rl + 12), y0 = Math.max(0, Math.floor(x.g.bt) - 70), Hh = Math.min(500 - y0, 2 * Math.ceil((x.g.bb - x.g.bt + 80) / 2));
            const raw = execFileSync("ffmpeg", ["-v", "error", "-i", x.video, "-ss", `${x.lead / 1000}`, "-vf", `crop=2:${Hh}:${cx}:${y0}`, "-pix_fmt", "rgb24", "-f", "rawvideo", "-"], { maxBuffer: 1 << 28 });
            const N = Math.floor(raw.length / (Hh * 6)); const d = []; const [gr, gg, gb] = x.ground;
            for (let k = 0; k < N; k++) {
              const fr = raw.subarray(k * Hh * 6, (k + 1) * Hh * 6); const px = (y) => [fr[y * 6], fr[y * 6 + 1], fr[y * 6 + 2]];
              const red = (y) => { const [R, G, B] = px(y); return R > 150 && G < 90 && B < 90; };
              const other = (y) => { const [R, G, B] = px(y); return !red(y) && Math.abs(R - gr) + Math.abs(G - gg) + Math.abs(B - gb) > 40; };
              let rEnd = -1, bTop = -1;
              for (let y = 0; y < Hh; y++) if (red(y)) rEnd = y;
              for (let y = Math.max(0, rEnd + 1); y < Hh; y++) if (other(y)) { bTop = y; break; }
              if (rEnd >= 0 && rEnd < Hh - 2 && bTop > rEnd) d.push({ k, dist: bTop - rEnd, rEnd });
            }
            const sorted = d.map((q) => q.dist).sort((p, q) => p - q); const med = sorted.length ? sorted[sorted.length >> 1] : NaN;
            const worst = d.length ? Math.max(...d.map((q) => Math.abs(q.dist - med))) : NaN;
            const moving = d.filter((q, i) => i && q.rEnd !== d[i - 1].rEnd).length;
            out.push({ mode: x.mode, n: N, found: d.length, med, worst, at: d.filter((q) => Math.abs(q.dist - med) > TRAIL_TOL).map((q) => `${q.k}:${q.dist - med}`).slice(0, 10), moving, eng0: x.st0.eng, eng1: x.st1.eng, prom0: x.st0.promoted, moved: x.moved });
          }
          return { out };
        } finally { fs.rmSync(vdir, { recursive: true, force: true }); }
      }, 480000);
      if (r.crashed) { cell(`${name} · engaged`, engine === "webkit" ? "REPORT" : "FAIL", r.line); continue; }
      const engd = r.out.filter((x) => x.mode === "engaged"), rel = r.out.filter((x) => x.mode === "released");
      const relWorst = Math.max(0, ...rel.map((x) => (Number.isFinite(x.worst) ? x.worst : 0))), bound = relWorst + TRAIL_TOL;
      const undriven = engd.filter((x) => !x.eng0 || !x.eng1 || !(Math.abs(x.moved) > 20) || x.moving < 2 || !Number.isFinite(x.worst)).length + rel.filter((x) => x.eng0 || !(Math.abs(x.moved) > 20) || !Number.isFinite(x.worst)).length;
      const bad = engd.filter((x) => x.worst > bound);
      const lineOf = (x) => `${x.found} of ${x.n} frames read (${x.moving} with the spacer moving), distance median ${x.med} px, worst ${x.worst} px off${x.at.length ? ` (frame:Δ ${x.at.join(" ")})` : ""}, scrolled ${f(x.moved, 0)} px${x.mode === "engaged" ? `, promoted ${x.prom0}` : ""}`;
      const ok = engd.length === 3 && rel.length === 3 && !undriven;
      cell(`${name} · engaged`, engine === "webkit" ? "REPORT" : !ok ? "FAIL" : bad.length ? "FAIL" : "PASS", `${ok ? "" : `NOT DRIVEN (${engd.length} engaged and ${rel.length} released films; ${undriven} not engaged or released as named, not scrolled > 20 px, or unread) · `}keyboard engaged, ${drive === "wheel-over" ? "the scroller wheeled with the pointer over the control" : drive === "wheel-away" ? "the scroller wheeled with the pointer over its content beside the control" : "the page wheeled with the pointer outside the scroller"} (6 × 8 px) · per film frame, the red spacer's last row to the root's first row, against its median · engaged: ${engd.map(lineOf).join(" | ")} · bound ≤ the released films' worst ${relWorst} + ${TRAIL_TOL} = ${bound} px; ${bad.length} of ${engd.length} engaged films over it${engine === "webkit" ? " · REPORT in WebKit (its 25 fps film is no one-frame witness: H8 §5, REGISTRY §P8-7 item 9)" : ""}`);
      cell(`${name} · released`, "REPORT", rel.map(lineOf).join(" | "));
    }

    // ── H9: the re-render glide under a scaled ancestor (REGISTRY §P8-7 item 8; C-A8's glidescale) ──
    if (want("glide")) {
      let g0 = null;
      for (const [tag, css] of [["none", {}], ["scale", { scale: "0.8", transformOrigin: "0 0" }]]) {
        const name = `E-10 ${sc} glidescale · ${tag}`;
        const r = await guard(name, async () => {
          const P = await openPage(E, T, sc);
          try {
            const { page } = P;
            await hideLoupe(page, "keyboard");
            await page.evaluate(([b, css]) => Object.assign(document.querySelector(b).style, css), [box, css]);
            await setHid(page, -60); await page.waitForTimeout(100);
            await page.focus('[data-sentinel="before"]'); await page.keyboard.press(tabKey(engine)); await page.waitForTimeout(600);
            const s0 = await stateOf(page);
            const out = await page.evaluate(([rt, rs]) => new Promise((ok) => {
              const fr = []; const t0 = performance.now(); const h = document.querySelector(rt); let ins = -1, k = 0;
              const tick = () => {
                const q = h.getBoundingClientRect(); fr.push({ t: performance.now() - t0, cx: q.left + q.width / 2, cy: q.top + q.height / 2 });
                if (++k === 6) { const d = document.createElement("div"); d.style.height = "40px"; d.setAttribute("data-t", "h9-inserted"); document.querySelector(rs).before(d); ins = fr.length; }
                if (performance.now() - t0 < 900) requestAnimationFrame(tick); else ok({ fr, ins });
              };
              requestAnimationFrame(tick);
            }), [root, rest]);
            return { ...out, s0, s1: await stateOf(page) };
          } finally { await P.close(); }
        }, 90000);
        if (r.crashed) { cell(name, tag === "none" ? "REPORT" : "FAIL", r.line); continue; }
        const { fr, ins } = r; const before = fr[ins - 1], after = fr[ins];
        const jump = before && after ? Math.hypot(after.cx - before.cx, after.cy - before.cy) : NaN;
        let mv = 0; for (let k = ins + 1; k < fr.length; k++) mv = Math.max(mv, perFrame(Math.hypot(fr[k].cx - fr[k - 1].cx, fr[k].cy - fr[k - 1].cy), fr[k].t - fr[k - 1].t));
        const placeMoved = before ? Math.abs(fr.at(-1).cy - before.cy) : 0;
        const driven = r.s0.eng && r.s1.eng && placeMoved > 10 && Number.isFinite(jump);
        if (tag === "none") { g0 = driven ? jump : null; cell(name, driven ? "REPORT" : "FAIL", `${driven ? "" : `NOT DRIVEN (engaged ${r.s0.eng}/${r.s1.eng}, place moved ${f(placeMoved, 1)} px) · `}keyboard engaged (promoted ${r.s0.promoted}), the scroller untransformed (the reference) · a 40 px block inserted before the rest box: the root's painted centre moved ${f(jump, 2)} px in the insertion's frame, then at most ${f(mv, 2)} px per 16.7 ms; the place moved ${f(placeMoved, 1)} px`); continue; }
        if (g0 == null) { cell(name, "UNMEASURED", `no reference (glidescale · none unread or not driven) · the insertion-frame move ${f(jump, 2)} px`); continue; }
        cell(name, !driven ? "FAIL" : jump <= g0 + GLIDE_TOL ? "PASS" : "FAIL", `${driven ? "" : `NOT DRIVEN (engaged ${r.s0.eng}/${r.s1.eng}, place moved ${f(placeMoved, 1)} px) · `}keyboard engaged (promoted ${r.s0.promoted}), the scroller under scale 0.8 (origin 0 0) · a 40 px block inserted before the rest box (a re-render): the root's painted centre moved ${f(jump, 2)} px in the insertion's frame (bound ≤ the unscaled reference's ${f(g0, 2)} + ${GLIDE_TOL} px: the glide starts where the control was painted), then at most ${f(mv, 2)} px per 16.7 ms; the place moved ${f(placeMoved, 1)} px`);
      }
    }
  }

  // ── H9: the presented dialog dismissed under a keyboard-engaged control (REGISTRY §P8-7 item 3; C-A8's dlg). On rows with
  // `dlg` (any row: the scene app's presented Dialog opened with its `q`, the slider in the plate) ──
  const effOpFilm = ([rootSel, plateSel, ms]) => new Promise((ok) => {
    const host = document.querySelector(rootSel), plate = document.querySelector(plateSel);
    // the opacity a body paints with: the product up its ancestors, stopping at a top-layer element (its DOM ancestors'
    // opacity does not reach it); 0 once it leaves the document or is hidden
    const eff = (el) => { if (!el || !el.isConnected) return 0; if (getComputedStyle(el).visibility === "hidden") return 0; let o = 1; for (let e = el; e && e.nodeType === 1; e = e.parentElement) { o *= +getComputedStyle(e).opacity; if (e !== document.documentElement && e.matches(":popover-open, :modal")) break; } return o; };
    const fr = []; const t0 = performance.now();
    const tick = () => { fr.push({ t: performance.now() - t0, h: eff(host), p: eff(plate), prom: !!host?.isConnected && host.matches(":popover-open") }); if (performance.now() - t0 < ms) requestAnimationFrame(tick); else ok(fr); };
    requestAnimationFrame(tick);
  });
  // ── H10: the lens's side (CK-20; REGISTRY §P9-8.1, §P9-8.3 wave 1): `--part lensside`, `--part lensfilm` ──
  // H11 (REGISTRY §P10-7 items 1, 3, 4, 6; §P10-8.3 wave 1): the cards carry an ancestor CSS `zoom` (0.8, 1.25, 2) beside none and
  // scale 0.8; the wobble and the reduce cell on one zoomed card (1.25); the step over any 16.7 ms of real time, on the span read in
  // one frame (sideRead); `loupe repress · moved` REPORT. `--cards a,b` narrows the cards (none, scale, zoom08, zoom125, zoom2)
  const lensRows = all.filter(([, x]) => x.loupe);
  const CARD = { none: "none", scale: "scale", zoom08: "zoom 0.8", zoom125: "zoom 1.25", zoom2: "zoom 2" };
  const cardSel = typeof a.cards === "string" ? new Set(a.cards.split(",")) : null; const cards = (...x) => x.filter((k) => !cardSel || cardSel.has(k));
  if (want("lensside")) for (const [drive, rate] of [["page", 3], ["carry", 2]]) for (const [sc, m] of lensRows.filter(([, x]) => (drive === "page" ? !x.clip : !!x.clip))) {
    const L = m.loupe; const thumb = m.thumb ?? '[data-e~="thumb"]'; const B = drive === "carry" ? m.clip.box : null;
    const film = async (tf, mode, prm) => {
      const P = await openPage(E, T, sc, { prm });
      try {
        if (prm && !P.modeOk) return { mode: P.modeLine };
        await sideSetup(m, tf)(P.page, drive); await P.page.waitForTimeout(250);
        const rows = await P.page.evaluate(rowsOf);
        const c = await center(P.page, thumb); await P.page.mouse.move(c.x, c.y); await P.page.mouse.down();
        try { await P.page.waitForTimeout(900); return { ...(await P.page.evaluate(sideFilm, [L, drive, B, mode, rate])), rows }; } finally { await P.page.mouse.up(); }
      } finally { await P.close(); }
    };
    const fails = (name, r) => { if (r.crashed) { cell(name, "FAIL", r.line); return true; } if (r.mode) { cell(name, "FAIL", `MODE NOT APPLIED ${r.mode}`); return true; } if (r.none || !r.out?.length) { cell(name, "FAIL", `NO LOUPE: the held slider renders no ${L.lens} on its ${L.track}`); return true; } return false; };
    for (const tf of cards("none", "scale", "zoom08", "zoom125", "zoom2")) {
      // the side change: carries weight, on the row it rides
      const name = `E-10 ${sc} loupe side · ${drive} · ${CARD[tf]}`;
      const r = await guard(name, () => film(tf, "side", false), 60000);
      if (!fails(name, r)) {
        const v = sideRead(r, r.rows, rate);
        const driven = v.reached <= 2; const windowOk = !v.off.length || (v.changes === 1 && v.win <= v.winMax); const ok = driven && v.changes <= 1 && v.step <= v.bound && windowOk && !v.outside && v.dxMax <= 2 && v.whole && v.above <= v.aboveMax && v.pinEnd;
        cell(name, ok ? "PASS" : "FAIL", `${driven ? "" : `NOT DRIVEN: the track's distance to the line never under 2 px (${f(v.reached, 1)}) · `}a fine hold, the card ${CARD[tf]}, the track carried ${rate} px a frame ${f(r.lineDist + 40, 0)} px, ${v.n} frames (median sample ${f(v.mdt, 1)} ms) · ${v.changes} side change(s), the lens's centre against the track's ${f(v.relA, 1)} → ${f(v.relZ, 1)} px · largest move against the track over any 16.7 ms of real time ${f(v.step, 1)} px at +${f(v.atT, 0)} ms; bound ${f(v.bound, 1)} px = the span ${f(v.span, 1)} (read in the last frame: lens ${f(v.end.H, 1)} + track ${f(v.end.tb - v.end.tt, 1)} px; first-to-last ${f(v.spanRel, 1)}) × row ${v.row ? `${v.row.n}'s ${f(v.row.peak, 3)} (clock ${f(v.row.ms, 0)} ms, overshoot ${f(v.row.over, 3)})` : "none"} + 1${v.rode ? "" : ` (no running animation on the lens carries a row's clock [${v.ams.map((x) => f(x, 0)).join(",")}]: the library's fastest row)`} · off its edge by > 2 px on ${v.off.length} frames over ${f(v.win, 0)} ms (bound one window ≤ ${f(v.winMax, 0)} ms)${v.off.length ? `, worst ${f(Math.max(...v.off.map((y) => Math.abs(y.x.pin))), 1)} px` : ""}, ${v.outside} frames outside the span · across ${f(v.dxMax, 1)} px (≤ 2) · ends flush ${v.pinEnd} (${f(v.end.pin, 1)} px), whole at the end ${v.whole} (lens ${f(v.end.lt, 1)}..${f(v.end.lb, 1)} px), at most ${f(v.above, 1)} px above the viewport on any frame (bound ≤ two ${rate} px steps + 2 = ${f(v.aboveMax, 0)})`);
      }
      // under reduce: instant, no travel, the correction never off
      if (["none", "scale", "zoom125"].includes(tf)) {
        const nameR = `E-10 ${sc} loupe side · reduce · ${drive} · ${CARD[tf]}`;
        const rr = await guard(nameR, () => film(tf, "side", true), 60000);
        if (!fails(nameR, rr)) {
          const v = sideRead(rr, rr.rows, rate); const driven = v.reached <= 2; const ok = driven && v.changes <= 1 && !v.off.length && v.whole && v.dxMax <= 2;
          cell(nameR, ok ? "PASS" : "FAIL", `${driven ? "" : `NOT DRIVEN: the track's distance to the line never under 2 px (${f(v.reached, 1)}) · `}reduce, the card ${CARD[tf]} · ${v.changes} side change(s) · off its edge by > 2 px on ${v.off.length} frames (bound 0: instant, no travel, the correction kept)${v.off.length ? `, worst ${f(Math.max(...v.off.map((y) => Math.abs(y.x.pin))), 1)} px` : ""} · largest move over any 16.7 ms ${f(v.step, 1)} px · whole at the end ${v.whole} (lens ${f(v.end.lt, 1)}..${f(v.end.lb, 1)} px)`);
        }
      }
      // the wobble: at most one change, about the place it changed and about the line itself
      if (drive === "carry" && ["none", "scale", "zoom125"].includes(tf)) for (const mode of ["at-change", "at-line"]) {
        const nameW = `E-10 ${sc} loupe wobble · ${mode} · ${CARD[tf]}`;
        const rw = await guard(nameW, () => film(tf, mode, false), 60000);
        if (fails(nameW, rw)) continue;
        const v = sideRead(rw, rw.rows, rate); const driven = v.reached <= 5;
        cell(nameW, driven && v.changes <= 1 ? "PASS" : "FAIL", `${driven ? "" : `NOT DRIVEN: the track's distance to the line never under 5 px (${f(v.reached, 1)}) · `}a fine hold, the card ${CARD[tf]}, carried ${mode === "at-line" ? "to the line" : "to the lens's side change"}, then ±3 px: 40 frames toggling every 2, 6 toggles every 30 · ${v.changes} side change(s) in ${v.n} frames (bound ≤ 1) · largest move over any 16.7 ms ${f(v.step, 1)} px`);
      }
    }
    // H11, REPORT (REGISTRY §P10-7 item 6; C-E10 §1.3 `repress · moved`): the side carried across holds. A hold carries the track past
    // the line (the lens below); release; inside the exit the track is carried back 70 px above in 4 frames; then a new press. On each
    // frame from the press while the lens shows (opacity > 0.05): its pinned edge. Not a gating cell: it passes the one-travel rule
    if (drive === "carry") for (const tf of cards("none", "scale")) {
      const nameP = `E-10 ${sc} loupe repress · moved · ${CARD[tf]}`;
      const rp = await guard(nameP, async () => {
        const P = await openPage(E, T, sc);
        try {
          await sideSetup(m, tf)(P.page, "carry"); await P.page.waitForTimeout(250);
          const c = await center(P.page, thumb); await P.page.mouse.move(c.x, c.y); await P.page.mouse.down();
          let f1; try { await P.page.waitForTimeout(900); f1 = await P.page.evaluate(sideFilm, [L, "carry", B, "side", 2]); } finally { await P.page.mouse.up(); }
          await P.page.evaluate(([L, B]) => new Promise((ok) => { const q = (x) => document.querySelector(x); const b = q(B); const zb = b.currentCSSZoom ?? 1; let top = Number.parseFloat(b.style.top) || 0, k = 0; window.__rp = []; window.__rpStop = false; const t0 = performance.now(); window.__rpT0 = t0; const ch = new MessageChannel();
            ch.port1.onmessage = () => { const l = q(L.lens), t = q(L.track); if (!l || !t) return; const a1 = l.getBoundingClientRect(), d = t.getBoundingClientRect(); if (!(a1.width > 0)) return; const rel = a1.top + a1.height / 2 - (d.top + d.height / 2); window.__rp.push({ t: performance.now() - t0, rel, pin: rel < 0 ? a1.bottom - d.top : a1.top - d.bottom, op: +getComputedStyle(l).opacity, lt: a1.top }); };
            const tick = () => { if (k < 4) { top += 17.5 / zb; b.style.top = `${top}px`; k++; if (k === 4) ok(); } ch.port2.postMessage(0); if (!window.__rpStop) requestAnimationFrame(tick); }; requestAnimationFrame(tick); }), [L, B]);
          const c2 = await center(P.page, thumb); await P.page.mouse.move(c2.x, c2.y); const tp = await P.page.evaluate(() => performance.now() - window.__rpT0); await P.page.mouse.down();
          try { await P.page.waitForTimeout(800); } finally { await P.page.mouse.up(); }
          const s2 = await P.page.evaluate(() => { window.__rpStop = true; return window.__rp; });
          return { f1, s2, tp };
        } finally { await P.close(); }
      }, 60000);
      if (rp.crashed) { cell(nameP, "REPORT", rp.line); continue; }
      const before = (rp.s2 ?? []).filter((x) => x.t < rp.tp && x.op > 0.05).at(-1); const after = (rp.s2 ?? []).filter((x) => x.t >= rp.tp && x.op > 0.05); const off = after.filter((x) => Math.abs(x.pin) > 2);
      const worst = off.reduce((p, x) => (Math.abs(x.pin) > Math.abs(p?.pin ?? 0) ? x : p), null);
      cell(nameP, "REPORT", `the card ${CARD[tf]} · first hold: ${(rp.f1?.out ?? []).length} frames, the lens's last rel ${f(rp.f1?.out?.at(-1)?.rel, 1)} px · released, the track carried back 70 px above in 4 frames inside the exit (the lens's last shown frame before the press: rel ${f(before?.rel, 1)} px at opacity ${f(before?.op, 2)}) · re-pressed: ${after.length} shown frames, ${off.length} off its edge by > 2 px${off.length ? ` over ${f(off.at(-1).t - off[0].t, 0)} ms from opacity ${f(off[0].op, 2)}, worst ${f(worst.pin, 1)} px at opacity ${f(worst.op, 2)}` : ""} · ends ${f(after.at(-1)?.pin, 1)} px, rel ${f(after.at(-1)?.rel, 1)} px · REPORT (REGISTRY §P10-7 item 6: passes the one-travel rule)`);
    }
  }
  // ── H12: THE FRAME FAMILY of the host's re-render glide (CK-20; REGISTRY §P11-7 items 2, 4, 5; §P11-8.1; §P11-8.3 wave 1): `--part
  // hostglide`. On the loupe row without a clip (the page drive's row), the card C is the root's parent and G the card's parent. A fine
  // hold, +900 ms, then filmed per frame (a task posted from requestAnimationFrame, after that frame's paint, stamped with the document
  // timeline): on frame 8 a 40 px block is inserted, and the root's painted centre is read on every frame.
  //   hostglide · inside|outside|nested · <card>   the card none, translate, scale 0.8 (origin 0 0), zoom 0.8 / 1.25 / 2, or zoom 1.25 with
  //                    scale 0.8 on one box: on C for inside (the block C's first child, a move INSIDE the transformed box) and outside (the
  //                    block before C, a move outside it), on G for nested (the block before G: the transform one box further out, the
  //                    move outside it). PASS when the root's painted centre on the mutation's frame is ≤ 0.5 px from where it was painted
  //                    the frame before, its largest move over any 16.7 ms of the timeline ≤ the bound printed on the glide's row (the move
  //                    × the row's largest one-frame fraction + 1 px, the row the one whose clock the root's running translate carries,
  //                    else the library's fastest, said so), and a glide ran. NOT DRIVEN under a 5 px move
  //   hostglide · chain · zoom 0.8|1.25|2   a positioned zoomed box in the offset chain: C `position: relative; zoom: z`, G
  //                    `position: relative` (unzoomed), the block before G. The chain then crosses a positioned box whose zoom is not
  //                    the root's, so an offset read with no zoom ratio is in the wrong px (C-A11's flowone, C-E11's hostzoom pass every
  //                    other cell: a zoom alone puts no box in the chain). Same clauses
  //   hostglide · animating · scale · out|in   C runs a WAAPI `scale` 0.8 → 1 (origin 0 0, 600 ms, linear) from frame 2; on frame 14 a
  //                    block that moves nothing is appended after C (out) or after the root inside C (in). PASS when C's scale is in
  //                    flight across the mutation, no translate starts on the root, and the root's place in C's frame ((its centre − C's
  //                    top) over C's painted scale) moves ≤ 0.5 px across the mutation's frame: P-E11 §1's risk, a running ancestor scale
  //                    read as a moved place and glided by an unrelated mutation (C-A11's glideframe as written)
  // Plants e10-hostglideratio (outside, nested under scale and zoom + scale), e10-hostglideone (chain), e10-hostglideframe
  // (animating); the pass-11 candidate (outside, nested under scale and zoom + scale); controls C-A11's glideframe and flowone
  const HG_TF = { none: null, translate: { translate: "13px 7px" }, scale: { scale: "0.8", transformOrigin: "0 0" }, zoom08: { zoom: "0.8" }, zoom125: { zoom: "1.25" }, zoom2: { zoom: "2" }, zs: { zoom: "1.25", scale: "0.8", transformOrigin: "0 0" } };
  const HG_NAME = { none: "none", translate: "translate", scale: "scale 0.8", zoom08: "zoom 0.8", zoom125: "zoom 1.25", zoom2: "zoom 2", zs: "zoom 1.25 + scale 0.8" };
  const pageRows = all.filter(([, x]) => x.loupe && !x.clip);
  const hgSetup = ([R, place, css, z]) => { const root = document.querySelector(R), C = root.parentElement, G = C.parentElement; document.documentElement.style.overflowAnchor = "none";
    const mn = document.querySelector("main") ?? document.body; mn.style.paddingTop = "230px"; mn.style.paddingBottom = "1600px";
    if (place === "chain") { C.style.position = "relative"; C.style.zoom = z; G.style.position = "relative"; } else if (place === "animating") C.style.transformOrigin = "0 0"; else if (css) Object.assign((place === "nested" ? G : C).style, css);
    // a zoom 2 on G carries the thumb under the 500 px fold, where the hold lands on nothing: the root is brought to mid-viewport first
    const b = root.getBoundingClientRect(); scrollBy(0, b.top + b.height / 2 - innerHeight / 2 + 60); };
  const hgFilm = ([R, place, sub]) => new Promise((ok) => {
    const root = document.querySelector(R), C = root.parentElement, G = C.parentElement; const isCss = (a) => (typeof CSSTransition !== "undefined" && a instanceof CSSTransition) || (typeof CSSAnimation !== "undefined" && a instanceof CSSAnimation);
    const T = () => document.timeline.currentTime; const t0 = T(); const out = []; const ch = new MessageChannel(); let n = 0, anim = null; const AT = place === "animating" ? 14 : 8;
    ch.port1.onmessage = () => { const r = root.getBoundingClientRect(), c = C.getBoundingClientRect();
      const an = root.getAnimations().filter((a) => !isCss(a) && a.playState === "running" && Object.keys(a.effect.getKeyframes()[0] ?? {}).includes("translate")).map((a) => a.effect.getTiming().duration);
      out.push({ n, t: T() - t0, x: r.left + r.width / 2, y: r.top + r.height / 2, ct: c.top, cs: c.height / (C.offsetHeight || 1), an, held: root.dataset.held !== undefined, oc: (() => { const q = []; for (let e = root; e; e = e.offsetParent) q.push(`${e.tagName.toLowerCase()}:${e.offsetTop}`); return q.join(">"); })() }); };
    const blk = () => { const b = document.createElement("div"); b.style.height = "40px"; b.setAttribute("data-t", "h12-block"); return b; };
    const act = () => { if (place === "animating") { if (sub === "in") C.appendChild(blk()); else G.insertBefore(blk(), C.nextSibling); return; }
      if (place === "inside") C.insertBefore(blk(), C.firstChild); else if (place === "outside") G.insertBefore(blk(), C); else G.parentElement.insertBefore(blk(), G); };
    const tick = () => { n++; if (place === "animating" && n === 2) anim = C.animate({ scale: ["0.8", "1"] }, { duration: 600, easing: "linear" }); if (n === AT) act(); ch.port2.postMessage(0); if (n < 60) requestAnimationFrame(tick); else setTimeout(() => { anim?.cancel(); ok({ out, AT }); }, 40); };
    requestAnimationFrame(tick);
  });
  const hgCells = [...["inside", "outside", "nested"].flatMap((p) => Object.keys(HG_TF).map((tf) => [p, tf])), ...["zoom08", "zoom125", "zoom2"].map((tf) => ["chain", tf]), ["animating", "out"], ["animating", "in"]];
  if (want("hostglide")) for (const [sc, m] of pageRows) for (const [place, tf] of hgCells) {
    const R = m.root ?? '[data-e~="root"]', thumb = m.thumb ?? '[data-e~="thumb"]';
    const name = place === "animating" ? `E-10 ${sc} hostglide · animating · scale · ${tf}` : `E-10 ${sc} hostglide · ${place} · ${HG_NAME[tf]}`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, sc);
      try {
        await P.page.evaluate(hgSetup, [R, place, HG_TF[tf] ?? null, HG_TF[tf]?.zoom ?? "1"]); await P.page.waitForTimeout(250);
        const rows = await P.page.evaluate(rowsOf);
        const c = await center(P.page, thumb); await P.page.mouse.move(c.x, c.y); await P.page.mouse.down();
        try { await P.page.waitForTimeout(900); return { ...(await P.page.evaluate(hgFilm, [R, place, tf])), rows, errs: [...P.errors] }; } finally { await P.page.mouse.up(); }
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed) { cell(name, "FAIL", r.line); continue; }
    const S = r.out; const i0 = S.findIndex((x) => x.n >= r.AT); const pre = S[i0 - 1], first = S[i0];
    if (!pre || !first) { cell(name, "FAIL", `the film holds no frame before or on the mutation's (${S.length} frames)`); continue; }
    const after = S.slice(i0); const durs = [...new Set(after.flatMap((x) => x.an))];
    if (place === "animating") {
      const rel = (x) => (x.y - x.ct) / x.cs; const drift = Math.abs(rel(first) - rel(pre)); const inFlight = Math.abs(first.cs - pre.cs) > 1e-4; const glides = after.slice(0, 6).filter((x) => x.an.length).length;
      cell(name, !inFlight ? "UNMEASURED" : !glides && drift <= 0.5 ? "PASS" : "FAIL", `${inFlight ? "" : "NOT DRIVEN: the card's scale was not in flight across the mutation · "}the card C runs scale 0.8 → 1 over 600 ms (${f(pre.cs, 4)} → ${f(first.cs, 4)} across the mutation's frame); a block that moves nothing appended ${tf === "in" ? "after the root inside C" : "after C"} on frame ${r.AT} · translate glides on the root over the next 6 frames ${glides}${durs.length ? ` (clock ${durs.map((x) => f(x, 0)).join(",")} ms)` : ""} (bound 0) · the root's place in C's frame moved ${f(drift, 2)} px across the mutation's frame (bound ≤ 0.5) · offset chain ${pre.oc} → ${first.oc} · errors ${r.errs.length}`);
      continue;
    }
    const end = S.at(-1); const moved = Math.hypot(end.x - pre.x, end.y - pre.y), jump = Math.hypot(first.x - pre.x, first.y - pre.y);
    const facts = r.rows.map(rowFacts).filter((x) => Number.isFinite(x.peak)); const fastest = facts.reduce((p, x) => (!p || x.peak > p.peak ? x : p), null); const rode = rodeRow(durs, r.rows); const row = rode ?? fastest;
    const bound = moved * (row?.peak ?? 0) + 1;
    const W = S.slice(i0 - 1); const at = (t, k) => { for (let i = 1; i < W.length; i++) if (W[i].t >= t) { const a = W[i - 1], b = W[i]; return a[k] + ((b[k] - a[k]) * (t - a.t)) / Math.max(1e-6, b.t - a.t); } return W.at(-1)[k]; };
    let step = 0, stepAt = NaN; for (const x of W) if (x.t - W[0].t >= NOM) { const d = Math.hypot(x.x - at(x.t - NOM, "x"), x.y - at(x.t - NOM, "y")); if (d > step) { step = d; stepAt = x.t - pre.t; } }
    const driven = moved >= 5; const glided = durs.length > 0;
    cell(name, !driven ? "UNMEASURED" : jump <= 0.5 && step <= bound && glided ? "PASS" : "FAIL", `${driven ? "" : "NOT DRIVEN: the root moved under 5 px · "}${place === "chain" ? `a positioned zoomed box C (zoom ${HG_TF[tf].zoom}) in a positioned card G, ` : `the card ${HG_NAME[tf]} on ${place === "nested" ? "G (one box further out)" : "C"}, `}a 40 px block ${place === "inside" ? "inside C above the root" : place === "outside" ? "before C" : "before G"} on frame ${r.AT} · the root's painted centre moved ${f(end.x - pre.x, 1)}, ${f(end.y - pre.y, 1)} px; on the mutation's frame ${f(jump, 2)} px from where it was painted (bound ≤ 0.5) · largest move over any 16.7 ms ${f(step, 1)} px at +${f(stepAt, 0)} ms (bound ${f(bound, 1)} = ${f(moved, 1)} × ${row ? `${row.n} ${f(row.peak, 3)} (clock ${f(row.ms, 0)} ms)` : "?"}${rode ? "" : ` (no running translate on the root carries a row's clock [${durs.map((x) => f(x, 0)).join(",")}]: the fastest row)`} + 1) · glide ${glided ? `running (${durs.map((x) => f(x, 0)).join(",")} ms)` : `none (held before/on the mutation ${pre.held}/${first.held}; offset chain ${pre.oc} → ${first.oc})`} · errors ${r.errs.length}`);
  }
  // ── H12: THE REACH under a transform (CK-20 × CK-04; REGISTRY §P11-7 item 5; P-E11 §8 item 2): `--part reach`. On the page row in a 390 ×
  // 700 viewport, the card C (the root's parent) carries the card; the root is sized so its painted rest box clears the gutter as the
  // card paints it (the row's `gutter` token, default --space-section, read on a probe inside C) by 6 painted px each side, and centred.
  //   reach · <card>   a fine hold, +1100 ms: the painted inline grow against the library's rule read in paint, min(the block grow,
  //                    1 + 2·max(0, room − gutter)/width), each term painted (room: the rest box's distance to the viewport's nearer
  //                    edge; the block grow the engaged box's painted height over its rest's). PASS when the engaged painted width is
  //                    within 1 px of that figure and the engaged box no nearer the edge than the painted gutter − 1 px; UNMEASURED when
  //                    the figure is not gutter-limited (it could not separate). Plant e10-reachframe; the pass-11 candidate passes;
  //                    controls C-E11's roomframe and C-A11's roomnoframe (`../pass-12/H12.md`)
  if (want("reach")) for (const [sc, m] of pageRows) for (const tf of ["none", "scale", "zoom08", "zoom125", "zoom2", "zs"]) {
    const R = m.root ?? '[data-e~="root"]', thumb = m.thumb ?? '[data-e~="thumb"]', GT = m.gutter ?? "--space-section";
    const name = `E-10 ${sc} reach · ${HG_NAME[tf]}`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, sc, { vp: { width: 390, height: 700 } });
      try {
        const rest = await P.page.evaluate(([R, css, GT]) => { const root = document.querySelector(R), C = root.parentElement; const mn = document.querySelector("main") ?? document.body; mn.style.paddingTop = "200px"; document.documentElement.style.overflowAnchor = "none"; if (css) Object.assign(C.style, css);
          const pr = document.createElement("div"); pr.style.cssText = `position:absolute;height:1px;width:var(${GT})`; C.appendChild(pr); const gP = pr.getBoundingClientRect().width; pr.remove();
          const vw = innerWidth; root.style.boxSizing = "border-box"; root.style.position = "relative"; root.style.left = "0px"; let k = root.getBoundingClientRect().width / root.offsetWidth; root.style.width = `${(vw - 2 * (gP + 6)) / k}px`;
          for (let i = 0; i < 3; i++) { const q = root.getBoundingClientRect(); k = q.width / root.offsetWidth; root.style.left = `${Number.parseFloat(root.style.left) + (vw / 2 - (q.left + q.width / 2)) / k}px`; }
          const q = root.getBoundingClientRect(); return { gP, vw, l: q.left, r: q.right, w: q.width, h: q.height, k }; }, [R, HG_TF[tf], GT]);
        await P.page.waitForTimeout(250);
        const c = await center(P.page, thumb); await P.page.mouse.move(c.x, c.y); await P.page.mouse.down();
        try { await P.page.waitForTimeout(1100); const eng = await P.page.evaluate((R) => { const q = document.querySelector(R).getBoundingClientRect(); return { l: q.left, r: q.right, w: q.width, h: q.height }; }, R); return { rest, eng, errs: [...P.errors] }; } finally { await P.page.mouse.up(); }
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed) { cell(name, "FAIL", r.line); continue; }
    const { rest, eng } = r; const se = eng.h / rest.h; const room = Math.min(rest.l, rest.vw - rest.r); const fig = Math.min(se, 1 + (2 * Math.max(0, room - rest.gP)) / rest.w);
    const off = eng.w - fig * rest.w; const margin = Math.min(eng.l, rest.vw - eng.r); const limited = fig < se - 0.003;
    cell(name, !limited ? "UNMEASURED" : Math.abs(off) <= 1 && margin >= rest.gP - 1 ? "PASS" : "FAIL", `${limited ? "" : "NOT GUTTER-LIMITED: the figure cannot separate · "}the card ${HG_NAME[tf]} · the gutter ${GT} painted ${f(rest.gP, 2)} px (frame ${f(rest.k, 3)}) · rest ${f(rest.l, 1)}..${f(rest.r, 1)} of ${rest.vw} (room ${f(room, 1)}, width ${f(rest.w, 1)}) · the rule in paint: min(block ×${f(se, 4)}, 1 + 2·(${f(room, 1)} − ${f(rest.gP, 1)})/${f(rest.w, 1)}) = ×${f(fig, 4)} · engaged ×${f(eng.w / rest.w, 4)} inline (${f(eng.w, 1)} px, ${f(off, 2)} px off the figure; bound ≤ 1), ${f(eng.l, 1)}..${f(eng.r, 1)}: margin ${f(margin, 1)} against the gutter ${f(rest.gP, 1)} − 1 · errors ${r.errs.length}`);
  }
  if (want("lensfilm")) for (const [sc, m] of lensRows.filter(([, x]) => !!x.clip)) {
    const L = m.loupe; const thumb = m.thumb ?? '[data-e~="thumb"]'; const reads = {};
    for (const [tf, css, marker] of [["marker", null, true], ["none", null, false], ["scale", { scale: "0.8", transformOrigin: "0 0" }, false]]) {
      // the lens against its track on a wheel film (C-E9's lensfilm, its marker the control): lens blue, track red, one column; twelve 8 px
      // wheel ticks over the thumb; per decoded frame the rows between; worst off the film's median. The marker, a blue block in the
      // scroller where the lens sits, moves with the track by construction, so a read off its median is the capture's
      const name = `E-10 ${sc} lensfilm · ${tf}`;
      const r = await guard(name, async () => {
        const vdir = fs.mkdtempSync(path.join(os.tmpdir(), "e10lens-"));
        try {
          const b = await E.nav(); const runs = [];
          for (let i = 0; i < 3; i++) {
            const ctx = await b.newContext({ viewport: { width: 700, height: 500 }, deviceScaleFactor: 1, reducedMotion: "no-preference", recordVideo: { dir: vdir, size: { width: 700, height: 500 } } });
            let page, x = null, t0 = 0;
            try {
              page = await ctx.newPage(); t0 = Date.now(); await page.addInitScript(INIT);
              await page.goto(`${T.url}?${new URLSearchParams({ scene: sc, theme: "light" })}`);
              await page.waitForFunction(() => window.__e && window.__e.ready === true, null, { timeout: 60000 });
              await page.evaluate(([B, Q, css, marker, L, veil]) => {
                const st = document.createElement("style"); st.textContent = `${L.lens} { background: rgb(0,0,230) !important; box-shadow: none !important; border-color: rgb(0,0,230) !important; backdrop-filter: none !important; -webkit-backdrop-filter: none !important; } ${L.lens} > * { visibility: hidden !important; } ${L.track} { background: rgb(230,0,0) !important; box-shadow: none !important; border-color: rgb(230,0,0) !important; }${veil ? ` ${veil} { visibility: hidden !important; }` : ""}${marker ? ` ${L.lens} { visibility: hidden !important; }` : ""}`; document.head.appendChild(st);
                const b1 = document.querySelector(B); if (css) Object.assign(b1.style, css); b1.style.position = "relative"; const y = b1.getBoundingClientRect().top; if (y < 200) b1.style.top = `${200 - y}px`;
                const q = document.querySelector(Q); const br = b1.getBoundingClientRect(), k = br.height / b1.offsetHeight, rr = q.getBoundingClientRect(); b1.scrollTop += (rr.top - (br.top + b1.clientTop * k + 10)) / k;
                if (marker) { const t = q.querySelector(L.track).getBoundingClientRect(), q2 = q.getBoundingClientRect(); q.style.position = "relative"; const mk = document.createElement("div"); mk.style.cssText = `position:absolute;left:${t.left + t.width / 2 - 20 - q2.left}px;top:${t.top - q2.top - 14}px;width:60px;height:10px;background:rgb(0,0,230);pointer-events:none`; q.appendChild(mk); }
              }, [m.clip.box, m.clip.rest, css, marker, L, m.veil ?? null]);
              await page.waitForTimeout(300);
              const c = await center(page, thumb); await page.mouse.move(c.x, c.y); await page.mouse.down();
              try {
                await page.waitForTimeout(1200);
                const g = await page.evaluate(([s, L, B]) => { const t = document.querySelector(s).getBoundingClientRect(); const l = document.querySelector(L.lens)?.getBoundingClientRect(); return { cx: t.left + t.width / 2 + 6, tt: t.top, lb: l?.bottom, st: document.querySelector(B).scrollTop, lens: !!l, eng: true }; }, [L.track, L, m.clip.box]);
                const lead = Math.max(0, Date.now() - t0 - 120);
                for (let k = 0; k < 12; k++) { await page.mouse.wheel(0, -8); await page.waitForTimeout(16); }
                await page.waitForTimeout(500);
                const st1 = await page.evaluate((B) => document.querySelector(B).scrollTop, m.clip.box);
                x = { g, lead, moved: st1 - g.st };
              } finally { await page.mouse.up(); }
            } finally { const v = page?.video(); await ctx.close(); if (x && v) { x.video = await v.path(); runs.push(x); } }
          }
          const out = [];
          for (const x of runs) {
            const cx = Math.round(x.g.cx), Hh = 500;
            const raw = execFileSync("ffmpeg", ["-v", "error", "-i", x.video, "-ss", `${x.lead / 1000}`, "-vf", `crop=2:${Hh}:${cx}:0`, "-pix_fmt", "rgb24", "-f", "rawvideo", "-"], { maxBuffer: 1 << 28 });
            const N = Math.floor(raw.length / (Hh * 6)); const d = [];
            for (let k = 0; k < N; k++) {
              const fr = raw.subarray(k * Hh * 6, (k + 1) * Hh * 6); const px = (y) => [fr[y * 6], fr[y * 6 + 1], fr[y * 6 + 2]];
              let lEnd = -1, tTop = -1;
              for (let y = 0; y < Hh; y++) { const [R, G, B] = px(y); if (B > 150 && R < 90 && G < 90) lEnd = y; }
              for (let y = Math.max(0, lEnd + 1); y < Hh; y++) { const [R, G, B] = px(y); if (R > 150 && G < 90 && B < 90) { tTop = y; break; } }
              if (lEnd >= 0 && tTop > lEnd) d.push({ k, dist: tTop - lEnd, y: tTop });
            }
            const s2 = d.map((q) => q.dist).sort((p, q) => p - q); const med = s2.length ? s2[s2.length >> 1] : NaN;
            out.push({ n: N, found: d.length, med, worst: d.length ? Math.max(...d.map((q) => Math.abs(q.dist - med))) : NaN, moving: d.filter((q, i) => i && q.y !== d[i - 1].y).length, offN: d.filter((q) => Math.abs(q.dist - med) > 2).length, off: d.filter((q) => Math.abs(q.dist - med) > 1).map((q) => `${q.k}:${q.dist - med}`).slice(0, 12).join(" "), moved: x.moved });
          }
          return { out };
        } finally { fs.rmSync(vdir, { recursive: true, force: true }); }
      }, 240000);
      if (r.crashed) { cell(name, marker || !LENSFILM_GRADED[engine] ? "REPORT" : "FAIL", r.line); continue; }
      const worst = Math.max(...r.out.map((x) => x.worst)); reads[tf] = worst; const moved = r.out.every((x) => x.moved !== 0 && x.found >= 3);
      const line = `a fine hold, twelve 8 px wheel ticks over the thumb, the card ${tf === "scale" ? "under scale 0.8" : "untransformed"}; ${marker ? "a blue block in the scroller (the control)" : "the lens blue"}, the track red, one column · per film ${r.out.map((x) => `${x.found}/${x.n} frames read, ${x.moving} moving, scrolled ${f(x.moved, 0)} px, median ${x.med} px, worst off ${x.worst} px, ${x.offN} frames > 2 px off${x.off ? ` [${x.off}]` : ""}`).join(" | ")}`;
      if (marker || !LENSFILM_GRADED[engine]) { cell(name, "REPORT", `${line}${marker ? "" : ` · REPORT in ${engine}: the late-lens plant does not separate here (H10.md §5)`}`); continue; }
      const ok = moved && worst <= (reads.marker ?? 0) + 2;
      cell(name, ok ? "PASS" : "FAIL", `${moved ? "" : "NOT DRIVEN · "}${line} · bound: every film's worst ≤ the marker's ${reads.marker} + 2 px (CK-25's 2 px; one tick behind is 8)`);
    }
  }
  for (const [sc, m] of want("dlg") ? Object.entries(idx).filter(([, x]) => x.dlg) : []) {
    const D = m.dlg; const engSel = D.engaged ?? "[data-engaged]";
    for (const drive of ["esc2", "scrim"]) {
      const name = `E-10 ${sc} dlg · ${drive}`;
      const r = await guard(name, async () => {
        const P = await openPage(E, T, sc, { q: D.q ?? {} });
        try {
          const { page } = P;
          if (!(await page.$(D.root))) return { absent: true };
          await page.focus(D.from); await page.keyboard.press(tabKey(engine)); await page.waitForTimeout(700);
          const s0 = await page.evaluate(([r2, e]) => { const h = document.querySelector(r2); return { eng: h.matches(e), promoted: h.matches(":popover-open") }; }, [D.root, engSel]);
          const film = page.evaluate(effOpFilm, [D.root, D.plate, 1400]);
          await page.waitForTimeout(50);
          if (drive === "esc2") { await page.keyboard.press("Escape"); await page.waitForTimeout(40); await page.keyboard.press("Escape"); }
          else await page.mouse.click(12, 12);
          return { s0, fr: await film };
        } finally { await P.close(); }
      }, 120000);
      if (r.crashed) { cell(name, "FAIL", r.line); continue; }
      if (r.absent) { cell(name, "FAIL", `NOT DRIVEN: the scene renders no ${D.root} with ${JSON.stringify(D.q ?? {})}`); continue; }
      const fr = r.fr; let hs = 0, hsAt = NaN, ps = 0, mis = 0, prom = 0;
      for (let k = 1; k < fr.length; k++) { const a1 = Math.abs(fr[k].h - fr[k - 1].h), b1 = Math.abs(fr[k].p - fr[k - 1].p); if (a1 > hs) { hs = a1; hsAt = fr[k].t; } ps = Math.max(ps, b1); }
      for (const x of fr) { mis = Math.max(mis, Math.abs(x.h - x.p)); if (x.prom) prom++; }
      const faded = fr.some((x) => x.p < 0.9); const driven = r.s0.eng && faded;
      cell(name, !driven ? "FAIL" : hs <= ps + DLG_TOL ? "PASS" : "FAIL", `${driven ? "" : `NOT DRIVEN (engaged before the dismissal ${r.s0.eng}, the plate faded ${faded}) · `}a slider in the presented plate, keyboard-engaged (promoted ${r.s0.promoted}), the dialog dismissed by ${drive === "esc2" ? "Escape, 40 ms, Escape" : "a click outside the plate"} · ${fr.length} frames (the root promoted on ${prom}): the root's effective opacity's largest one-frame step ${f(hs, 3)}${Number.isFinite(hsAt) ? ` at +${f(hsAt, 0)} ms` : ""} against the plate's own ${f(ps, 3)} (bound ≤ the plate's + ${DLG_TOL}: an in-place body fades with its plate) · largest root-over-plate mismatch ${f(mis, 3)} (printed)`);
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
