// fixtures.mjs: the hand-made minimal dock every witness must PASS on, and the
// planted violations each witness must FAIL on (H2, revised by H3: pass-3/H3.md).
//
// Plain HTML/CSS/JS with no glass-ui code. It is not a design proposal; it exists
// to prove each check CAN pass. What it does, so each witness has something honest
// to read:
//   · a stadium plate (radius = declared cross/2), a card plate with a fixed radius;
//   · a run that is a scroll container only when its seats exceed the budget (the
//     budget is the consumer's width when one is set), with a cross-axis paint gutter;
//   · one spring integrator (FIXTURE_RUNG) for the extent AND every seat: each episode
//     is released from the current position and velocity (a retarget carries velocity),
//     time-normalised so it lands exactly at the rung's settle clock; seats FLIP on the
//     same episode; an incoming seat stays transparent until its place is clear;
//   · a posture machine typed by pointer modality, holding open under its own menu;
//   · an opt-in compact-on-scroll rung with threshold hysteresis and an engagement gate
//     that a pointer press does not hold (only :focus-visible, hover or an open menu);
//   · one refcounted scroll-source binder (window, an element, a late element);
//   · a progress rim inside the plate, clipped by the plate's radius, filled by the source;
//   · a collapsed form (face, track, count, dismiss) wrapped by the one plate (O-65);
//   · side, canvas and top docks sharing one edge, with a dock-owned gutter and a
//     reserved badge corner (O-67).
// H3 additions:
//   · the integrator's clock is stall-safe: a frame gap over STALL_MS advances it by one
//     nominal frame (1000/60 ms), so a main-thread block resumes the motion instead of leaping (H3-4);
//   · a swap is a per-seat wipe on its own episode: a leaving seat whose place lies inside the
//     new extent is clipped from its start edge over the whole episode, an entering seat is
//     revealed from its start edge and never over a leaving seat's visible part; a leaving seat
//     outside the new extent is left to the closing plate (H3-1, H3-3);
//   · a removed seat leaves in place, clipped from its end edge on the same spring its
//     followers FLIP on, then is removed (H3-3);
//   · the size hand-off is scoped: a seat's own size transition is finished only when the running
//     size transitions change the run's main extent (never for the open-seat exchange), and an
//     infinite size animation is followed at the extent, with no window and no FLIP (H3-2);
//   · the morph scene's icon seats carry the open-seat exchange (aria-current: 44 → 92 px on the
//     fixture's own spring, as a linear() easing) (H3-2);
//   · morph &neighbour=1: a left-aligned in-flow row with a neighbour box (H3-7);
//     __scene.stretch(px) holds the run px wider than its content (H3-6);
//   · edge scene PASS variant `splitcaps`: the plate paints its straights, two cap elements
//     outside the plate paint the arcs, and edge() names them (H3-9).
// H5 additions (pass-5/H5.md):
//   · a text seat paints each character in its own span (.g); a glyph that a moving clip edge cuts to between 5 and
//     95 % of its ink paints at 0.4 opacity (soften()), so the fixture's wipe leaves no glyph stub (H5-3). It is the
//     rule's own allowance, a seam with no glyph-sharp edge; plant `stub` turns it off;
//   · facility: an outside press collapses the dock at once, mid-morph too (C8, O-91); under max-height 30rem the
//     dock takes the short rung (pad 4 px: a 52 px pill of 44 px seats, C9, O-74e); a rail run whose roving tabindex
//     arrows reach Seat 1 (`roving`, a PASS variant of W2).
//
// ?scene=  fit | rail | long | morph | vmorph | swap | menu | compact | rim | vrim | cwidth |
//          depth | nested | tick | seatgrow | hidden | form | edge
// ?fault=  see FAULTS (one per planted violation; selftest.mjs names the check each must fail)
export const FIXTURE_RUNG = { name: "fixture", response: 0.3, dampingFraction: 1.0, settleBand: 0.02 };

export const FAULTS = {
    W1: ["lens", "squash", "cssbend", "deadmorph", "dot", "cardlens", "endlens", "endout", "cardspread"],
    W2: ["scroller", "ringclip", "noring", "foldtail", "cwidth", "depthscroll", "nestgrow", "notab", "noname"],
    W3: ["jump", "subpx", "late", "owners", "overhang", "content", "linear", "ease", "snap", "wall", "slowclock", "seatjump", "doublex", "hiddengrow", "resizemorph", "anchordrift", "wideout", "twoowners", "adapterclip", "wrongrung"],
    W4: ["nohyst", "latch", "menucollapse", "noprm", "tapthrough", "ungatedafter", "pressgate", "lategetter", "norefcount", "seatshrink", "prmscrub", "compactjump", "nocompact", "noengage"],
    W5: ["rimout", "deadfill", "rimshift", "winonly"],
    W6: ["formout", "dismissout", "twoplates", "formgone", "dismissspan", "plateswap", "jump"],
    W7: ["edgecut", "sideedge", "gutterless", "badgeover", "lens"],
    W8: ["squash", "jank"],
    R6: ["backdropmotion"],
    // H3 (pass-3/H3.md): W3 blankswap, pop, slipfade, latsnap, infhold, infthrow, nostretch, nbjump, nboverlap,
    // bandclose, resizenorest; W1 cardlerp; W7 nocaps; ST leap; FM deadhooks
    H3: ["blankswap", "pop", "slipfade", "latsnap", "infhold", "infthrow", "nostretch", "nbjump", "nboverlap", "bandclose", "resizenorest", "cardlerp", "nocaps", "leap", "deadhooks"],
    // H4 (pass-4/H4.md): W3 splice, sliver, lanesnap, retargetpop, ctxloss; W1 cardstep (OB), hitpairunnamed;
    // R5 nohit, seatmiss, ghosthit; CF (the facility scene) and L1 plants are listed in their witnesses
    H4: ["splice", "sliver", "lanesnap", "lanecancel", "retargetpop", "ctxloss", "cardstep", "hitpairunnamed", "nohit", "seatmiss", "ghosthit", "glowhalo", "gleam", "shimmer",
        "tilesq", "morphsnap", "nofocus", "persistentinert", "focuslost", "menucollapse", "narrowover", "noscroll", "tapthrough"],
    // H5 (pass-5/H5.md): W2 arrowclamp; W3 stub, vanishstep, seatsettle; W1 cardblip; CF platesq, prmfade, pressdrop,
    // shorttall, shortseat; W3 ctxgc (the forced-GC slot: a PASS variant with the hold, a FAIL without it)
    H5: ["arrowclamp", "stub", "vanishstep", "seatsettle", "cardblip", "platesq", "prmfade", "pressdrop", "shorttall", "shortseat", "ctxgc"],
    // variants that must PASS (they change the carrier, not the property)
    PASS: ["csscarrier", "splitcaps", "hitpair", "roving", "ctxgc"],
};

export function fixturePage(q) {
    const scene = q.get("scene") ?? "fit";
    const fault = q.get("fault") ?? "";
    const kind = q.get("kind") ?? "side";
    const V = scene === "rail" || scene === "vmorph" || scene === "vrim" || (scene === "edge" && kind === "side") || (scene === "facility" && q.get("v") === "1");
    const tall = scene === "compact" ? 6000 : 3600;
    return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>dock fixture</title>
<style>
@property --fx-t { syntax: "<number>"; inherits: true; initial-value: 0; }
:root { --seat: 44px; --pad: 6px; --gap: 8px; --cross: calc(var(--seat) + 2 * var(--pad)); --r: calc(var(--cross) / 2); --gutter: 14px; --edge: rgba(0,0,0,.16); --veil: rgba(255,255,255,.62); --ink: #222; }
html.dark { --edge: rgba(255,255,255,.24); --veil: rgba(28,25,23,.62); --ink: #eee; }
html, body { margin: 0; }
body { min-height: ${tall}px; background: linear-gradient(180deg, #f3efe6, #e8e2d4); font: 600 14px/1 system-ui, sans-serif; color: var(--ink); }
html.dark body { background: linear-gradient(180deg, #1c1917, #0c0a09); }
.host { position: fixed; display: flex; }
.host.h { left: 0; right: 0; bottom: 24px; justify-content: center; }
.host.h.end { justify-content: flex-end; padding-right: 40px; }
.host.v { left: 16px; top: 0; bottom: 0; align-items: center; }
.host.v.top { top: 16px; bottom: auto; align-items: flex-start; }
.host.hidden { display: none; }
.host.h.nb { left: 40px; right: 0; justify-content: flex-start; align-items: center; gap: 12px; }
.nbox { flex: 0 0 auto; width: 80px; height: 40px; border-radius: 8px; background: #3a53e6; }
.cap { position: absolute; pointer-events: none; box-shadow: inset 0 0 0 1px var(--edge); }
.dock { position: relative; pointer-events: none; }
.ap { position: relative; ${fault === "nohit" ? "pointer-events: auto;" : ""} }
.plate, .seat, .hit, .menu { pointer-events: auto; }
${fault === "hitpair" || fault === "hitpairunnamed" || fault === "platesq" ? ".plate { pointer-events: none !important; } .hit { position: absolute; inset: 0; border-radius: var(--r); background: transparent; }" : ""}
${fault === "platesq" ? ".plate { border-radius: 0 !important; }" : ""}
${scene === "facility" && fault !== "shorttall" ? "@media (max-height: 30rem) { :root { --pad: 4px; " + (fault === "shortseat" ? "--seat: 36px; " : "") + "} }" : ""}
${fault === "seatmiss" ? ".dock[data-morphing] .seat { pointer-events: none; }" : ""}
${fault === "glowhalo" ? ".plate { box-shadow: 0 6px 24px rgba(0,0,0,.14), 0 0 36px 6px rgba(255,170,40,.55), inset 0 0 0 1px var(--edge) !important; }" : ""}
${fault === "gleam" ? ".plate::after { content: ''; position: absolute; inset: 0; border-radius: inherit; background: linear-gradient(180deg, rgba(255,255,255,.5), transparent 60%); pointer-events: none; }" : ""}
${fault === "shimmer" ? ".plate { animation: fxshimmer 2.4s ease-in-out infinite; } @keyframes fxshimmer { 50% { filter: brightness(1.06); } }" : ""}
.ghostproxy { position: fixed; width: 12px; height: 12px; pointer-events: auto; background: transparent; }
.h .ap { height: var(--cross); overflow-x: clip; overflow-y: visible; }
.v .ap { width: var(--cross); overflow-y: clip; overflow-x: visible; }
.plate { position: absolute; inset: 0; border-radius: ${fault === "lens" ? "50%" : "var(--r)"}; overflow: clip; background: var(--veil); backdrop-filter: blur(14px) saturate(1.4); -webkit-backdrop-filter: blur(14px) saturate(1.4); box-shadow: 0 6px 24px rgba(0,0,0,.14), inset 0 0 0 1px var(--edge); }
.card .plate { border-radius: ${fault === "cardlens" ? "30%" : "16px"}; }
.rim { position: absolute; left: 0; right: 0; bottom: 0; height: 4px; background: rgba(0,0,0,.14); }
.rim i { display: block; height: 100%; width: 60%; background: linear-gradient(90deg, #e2412f, #3a53e6); }
.v .rim { left: auto; right: 0; top: 0; bottom: 0; width: 4px; height: auto; }
.v .rim i { width: 100%; height: 60%; }
.ap > .rim { left: 8px; right: 8px; bottom: 2px; }
.run { position: relative; display: flex; align-items: center; gap: var(--gap); padding: var(--pad); width: max-content; box-sizing: border-box; }
.v .run { flex-direction: column; width: auto; height: max-content; }
.h .run.long, .h .run.fill { width: 100%; }
.v .run.long { height: 100%; }
.run.long { overflow-x: auto; overflow-y: hidden; padding-block: calc(var(--pad) + var(--gutter)); margin-block: calc(-1 * var(--gutter)); scroll-snap-type: x mandatory; }
.v .run.long { overflow-y: auto; overflow-x: hidden; padding-block: var(--pad); margin-block: 0; padding-inline: calc(var(--pad) + var(--gutter)); margin-inline: calc(-1 * var(--gutter)); scroll-snap-type: y mandatory; }
.run.long.nogutter { padding: 0 var(--pad); margin: 0; }
.v .run.long.nogutter { padding: var(--pad) 0; margin: 0; }
.run.scroller { overflow-x: auto; overflow-y: hidden; padding-inline: 0; }
.v .run.scroller { overflow-y: auto; overflow-x: hidden; padding-block: 0; }
.seat { position: relative; flex: 0 0 auto; height: var(--seat); min-width: var(--seat); border-radius: calc(var(--seat) / 2); border: 0; margin: 0; padding: 0; background: transparent; font: inherit; color: inherit; scroll-snap-align: start; transition: scale .18s ease-out, box-shadow .18s ease-out; }
.seat.tab { padding: 0 14px; }
.seat:last-child { scroll-snap-align: end; }
.seat svg { display: block; margin: auto; }
.sep { flex: 0 0 1px; align-self: stretch; margin: 8px 0; background: rgba(0,0,0,.15); }
.v .sep { margin: 0 8px; }
.seat[aria-pressed="true"], .seat[aria-current] { background: rgba(0,0,0,.08); ${fault === "noring" ? "" : "box-shadow: 0 0 0 2px rgba(0,0,0,.55);"} }
.seat:focus-visible { ${fault === "noring" ? "outline: none;" : "outline: 2px solid #0a64ff; outline-offset: 2px;"} }
.seat::after { content: ""; position: absolute; inset: -3px; border-radius: inherit; pointer-events: none; }
${fault === "latch" ? "" : "@media (hover: hover) {"}
  .seat:hover { scale: 1.1; ${fault === "noring" ? "" : "box-shadow: 0 2px 8px rgba(0,0,0,.35);"} }
  .seat[aria-pressed="true"]:hover, .seat[aria-current]:hover { ${fault === "noring" ? "" : "box-shadow: 0 0 0 2px rgba(0,0,0,.55), 0 2px 8px rgba(0,0,0,.35);"} }
${fault === "latch" ? "" : "}"}
${fault === "ungatedafter" ? ".seat:hover::after { background: rgba(200,0,0,.5); scale: 1.1; }" : fault === "noring" ? "" : "@media (hover: hover) { .seat:hover::after { background: rgba(0,0,0,.06); } }"}
.face { display: contents; }
.face[hidden] { display: none; }
.wrap { display: flex; gap: var(--gap); ${fault === "depthscroll" ? "overflow-x: auto;" : ""} }
.group { display: contents; }
.seat.strip { flex: 1 1 auto; min-width: 0; overflow-x: auto; display: flex; gap: 4px; padding: 0 8px; align-items: center; border-radius: 22px; }
.chip { flex: 0 0 auto; padding: 6px 10px; border-radius: 12px; background: rgba(0,0,0,.06); border: 0; font: inherit; }
.seat.grow { width: 80px; transition: width .3s ease; }
.seat.grow.big { width: 160px; }
.track { flex: 0 0 64px; height: 4px; border-radius: 2px; background: #3a53e6; }
.count { flex: 0 0 auto; padding: 0 4px; font-weight: 700; }
.plate2 { position: absolute; inset: 0; width: var(--cross); border-radius: var(--r); background: rgba(255,255,255,.5); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); }
.badge { position: absolute; width: 8px; height: 8px; border-radius: 4px; background: #f59e0b; ${fault === "badgeover" ? "left: 18px; top: 16px;" : "right: 1px; top: 1px;"} }
.menu { position: fixed; left: 50%; bottom: 100px; translate: -50% 0; width: 220px; padding: 12px; background: #fff; border-radius: 14px; box-shadow: 0 8px 30px rgba(0,0,0,.2); }
.menu[hidden] { display: none; }
.surface { position: fixed; left: 0; right: 0; top: 0; height: 56px; background: #d6d0c4; }
html.dark .surface { background: #292524; }
.canvas { position: fixed; left: 200px; top: 140px; width: 800px; height: 480px; background: rgba(0,0,0,.04); border: 1px solid rgba(0,0,0,.2); }
.canvas.clip { overflow: hidden; }
.edge .dock { margin: ${fault === "gutterless" ? "0" : "8px"}; }
.src { position: fixed; left: 16px; top: 16px; width: 280px; height: 200px; overflow: auto; background: rgba(255,255,255,.5); }
.src > div { height: 4000px; }
.stripe { position: fixed; left: 0; right: 0; bottom: 30px; height: 44px; background: repeating-linear-gradient(90deg, #e2412f 0 40px, #3a53e6 40px 80px); animation: slide 1s linear infinite; }
@keyframes slide { to { background-position: 80px 0; } }
</style></head><body>
<div id="host"></div>
<div class="menu" id="menu" data-testid="menu-content" role="menu" hidden>Options</div>
<script>
(() => {
const Q = new URLSearchParams(location.search);
const scene = ${JSON.stringify(scene)}, fault = ${JSON.stringify(fault)}, V = ${V}, kind = ${JSON.stringify(kind)};
const PRM = matchMedia("(prefers-reduced-motion: reduce)");
const FINE = matchMedia("(hover: hover)");
const DELAY = scene === "facility" ? (fault === "menucollapse" ? 1500 : 3600) : fault === "menucollapse" ? 1500 : 600;   // collapse dwell (fixture's own; the facility scene keeps the dock's own 3.6 s, so a scroll-driven collapse is told apart from the idle one)
const RESP = 0.3, ZETA = fault === "subpx" ? 0.88 : 1.0, BAND = 0.02;
const W0 = 2 * Math.PI / RESP;
const err = (e0, v0, t) => { if (t <= 0) return e0; if (ZETA < 1) { const wd = W0 * Math.sqrt(1 - ZETA * ZETA); return Math.exp(-ZETA * W0 * t) * (e0 * Math.cos(wd * t) + ((v0 + ZETA * W0 * e0) / wd) * Math.sin(wd * t)); } return (e0 + (v0 + W0 * e0) * t) * Math.exp(-W0 * t); };
let CLOCK = 0; for (let t = 0; t < 3; t += 1e-4) if (Math.abs(err(1, 0, t)) > BAND) CLOCK = t;   // seconds
const SLOW = fault === "slowclock" ? 1.2 / CLOCK : 1;   // slowclock: the carrier runs 1.2 s whatever its rung says
// H3-4 · the stall-safe clock: episodes run on vnow(); a frame gap over STALL_MS advances it by one
// frame, so a main-thread block resumes the motion instead of leaping. leap: the plain wall clock.
const STALL_MS = 100;
let lag = 0, lastTick = null;
const vnow = () => performance.now() - lag;
const bez = (t) => { let lo = 0, hi = 1; for (let i = 0; i < 30; i++) { const m = (lo + hi) / 2; const bx = 3 * (1 - m) * (1 - m) * m * 0.42 + 3 * (1 - m) * m * m * 0.58 + m * m * m; if (bx < t) lo = m; else hi = m; } const m = (lo + hi) / 2; return 3 * (1 - m) * m * m + m * m * m; };
/** One episode of the one integrator: released at (x0, v0) toward "to" at t0 (ms). */
function episode(x0, v0, to, t0) {
  const e0 = x0 - to;
  let T = CLOCK;
  if (v0 !== 0 && fault !== "wall") { const scale = Math.max(Math.abs(e0), 1e-6); let last = 0; for (let t = 0; t < 1.5; t += 1e-3) if (Math.abs(err(e0, v0, t)) > BAND * scale) last = t; T = Math.max(CLOCK, last); }
  const eT = err(e0, v0, T);
  const pos = (tauMs) => {
    const tau = tauMs / 1000 / SLOW;
    if (tau >= T) return to;
    if (fault === "linear") return x0 + (to - x0) * (tau / T);
    if (fault === "ease") return x0 + (to - x0) * bez(tau / T);
    if (fault === "snap" && tau >= 0.85 * T) return to;
    return to + err(e0, v0, tau) - eT * (tau / T);
  };
  return { x0, v0, to, t0, T: T * SLOW * 1000, pos, vel: (tau) => (pos(tau + 0.5) - pos(tau - 0.5)) * 1000 };
}

// ── build ──
const host = document.getElementById("host");
const H = !V;
host.className = "host " + (V ? "v" : "h") + (scene === "rail" ? " top" : "") + (Q.get("anchor") === "end" && fault !== "anchordrift" ? " end" : "") + (scene === "hidden" ? " hidden" : "");
const ICON = '<svg width="20" height="20" viewBox="0 0 20 20"><circle cx="10" cy="10" r="7" fill="currentColor"/></svg>';
const glyphs = (el, text) => { for (const ch of text) { if (/\\s/.test(ch)) { el.append(ch); continue; } const g = document.createElement("span"); g.className = "g"; g.textContent = ch; el.append(g); } };
const seat = (label, o = {}) => { const b = document.createElement("button"); b.className = "seat" + (o.tab ? " tab" : "") + (o.cls ? " " + o.cls : ""); if (o.html) b.innerHTML = o.html; else glyphs(b, label); if (o.aria) b.setAttribute("aria-label", o.aria); if (o.id) b.dataset.testid = o.id; if (o.pressed) b.setAttribute("aria-pressed", "true"); if (o.current) b.setAttribute("aria-current", "page"); b.dataset.dockSeat = ""; return b; };
const sep = () => { const s = document.createElement("span"); s.className = "sep"; return s; };
const dock = document.createElement("div"); dock.className = "dock" + (q("shape") === "card" ? " card" : ""); dock.dataset.testid = "dock";
function q(k) { return Q.get(k); }
const ap = document.createElement("div"); ap.className = "ap";
let plate = document.createElement("div"); plate.className = "plate";
const rim = document.createElement("div"); rim.className = "rim"; rim.innerHTML = "<i></i>";
const run = document.createElement("div"); run.className = "run"; run.setAttribute("role", "toolbar");
ap.append(plate, run); dock.append(ap);
// H4-9 · a hit pair: the plate takes no presses; a transparent element of the plate's shape does
let hitEl = null;
if (fault === "hitpair" || fault === "hitpairunnamed" || fault === "platesq") { hitEl = document.createElement("div"); hitEl.className = "hit"; ap.insertBefore(hitEl, run); }
let budget = V ? innerHeight - 32 : innerWidth - 32;
let collapsible = false, collapsedExtent = null, badge = null;
const routed = Q.get("routed") === "1";

if (scene === "edge") {
  document.body.classList.add("edge");
  const above = document.createElement("div"); above.className = "surface"; above.dataset.testid = "surface-above"; above.dataset.edge = "bottom";
  if (kind === "top") { host.className = "host h"; host.style.cssText = "top: 16px; bottom: auto;"; document.body.append(host); }
  else if (kind === "side") { document.body.append(above); host.style.cssText = "top: 56px; bottom: auto; left: 0; align-items: flex-start;"; }
  else { const cv = document.createElement("div"); cv.className = "canvas" + (Q.get("clip") === "1" ? " clip" : ""); cv.dataset.testid = "surface-above"; cv.dataset.edge = "top"; document.body.append(cv); host.className = "host h"; host.style.cssText = "position: absolute; left: 0; top: 0; bottom: auto; right: auto;"; cv.append(host); }
  const s1 = seat("", { html: ICON, aria: "Expand", id: "e1" }), s2 = seat("", { html: ICON, aria: "Edit", id: "e2" });
  badge = document.createElement("span"); badge.className = "badge"; badge.dataset.testid = "badge"; s1.append(badge);
  run.append(s1, s2);
  if (kind === "side" && fault === "sideedge") plate.style.boxShadow = "0 6px 24px rgba(0,0,0,.14), inset 0 0 0 1px rgba(0,0,0,.05)";
  if (fault === "edgecut") plate.style.boxShadow = "0 6px 24px rgba(0,0,0,.14), inset -1px -1px 0 0 var(--edge)";
} else if (scene === "fit" || scene === "compact" || scene === "hidden") {
  const cur = Q.get("active") === "b" ? 1 : 0;
  const sel = (i) => routed ? { current: i === cur } : { pressed: i === cur };
  const tabs = ["Photos", "Lots", "Map"].map((t, i) => seat(t, { tab: true, id: "t" + (i + 1), ...sel(i) }));
  tabs.forEach((b) => b.addEventListener("click", () => { tabs.forEach((o) => { o.removeAttribute("aria-pressed"); o.removeAttribute("aria-current"); }); b.setAttribute(routed ? "aria-current" : "aria-pressed", routed ? "page" : "true"); }));
  run.append(...tabs, sep(), seat("Filters", { tab: true, id: "t4" }), sep(), seat("T", { aria: "Theme", id: "i1" }));
  if (scene === "compact") (fault === "rimout" ? ap : plate).append(rim);
} else if (scene === "rail" || scene === "long") {
  const n = Number(Q.get("n") ?? (scene === "rail" ? 11 : 14));
  budget = scene === "rail" ? parseFloat(Q.get("h") ?? "560") : 360;
  for (let i = 1; i <= n; i++) { const s = seat(String(i), { aria: "Seat " + i, id: "s" + i, [scene === "rail" ? "current" : "pressed"]: i === 3 }); if (fault === "foldtail" && i > 6) s.style.display = "none"; run.append(s); }
  if (fault === "endout" && V) plate.style.bottom = "60px";   // endout: the plate stops 60 px short of the run's end
  // endlens: a lens whenever the run is scrolled and its last seat is fully in view (the state W1's end cells read)
  if (fault === "endlens") run.addEventListener("scroll", () => { const a = run.getBoundingClientRect(), q = run.lastElementChild.getBoundingClientRect(); const end = (V ? run.scrollTop : run.scrollLeft) > 0 && (V ? q.bottom <= a.bottom + 0.5 : q.right <= a.right + 0.5); plate.style.borderRadius = end ? "50%" : ""; }, { passive: true });
} else if (scene === "cwidth") {
  dock.style.width = "240px"; budget = fault === "cwidth" ? budget : 240;
  for (let i = 1; i <= 8; i++) run.append(seat(String(i), { aria: "C" + i, id: "c" + i }));
} else if (scene === "depth") {
  const wrap = document.createElement("div"); wrap.className = "wrap";
  const grp = document.createElement("div"); grp.className = "group"; grp.setAttribute("role", "radiogroup");
  grp.append(seat("Day", { tab: true, id: "d3" }), seat("Week", { tab: true, id: "d4" }));
  wrap.append(seat("A", { aria: "Alpha", id: "d1" }), seat("B", { aria: "Beta", id: "d2" }), grp);
  run.append(wrap);
} else if (scene === "nested") {
  budget = 360; dock.style.maxInlineSize = "360px";
  const strip = seat("", { cls: "strip", aria: "Categories", id: "strip" });
  for (let i = 1; i <= 12; i++) { const c = document.createElement("span"); c.className = "chip"; c.textContent = "Cat " + i; strip.append(c); }
  run.append(seat("P", { aria: "Prev", id: "n1" }), strip, seat("N", { aria: "Next", id: "n2" }), seat("L", { aria: "Layers", id: "n3" }));
  if (fault !== "nestgrow") run.classList.add("fill");
} else if (scene === "tick") {
  const t = seat("0:08", { tab: true, id: "tick" }); run.append(seat("P", { aria: "Play", id: "k1" }), t, seat("S", { aria: "Stop", id: "k2" }));
} else if (scene === "seatgrow") {
  run.append(seat("A", { aria: "A" }), seat("Grow", { tab: true, cls: "grow", id: "grow" }), seat("B", { aria: "B" }));
} else if (scene === "form") {
  collapsible = true;
  const face = seat("▶", { aria: "Play", id: "form-face" });
  const track = document.createElement("div"); track.className = "track"; track.dataset.testid = "form-track";
  const count = document.createElement("span"); count.className = "count"; count.textContent = "1"; count.dataset.testid = "form-count";
  const dismiss = fault === "dismissspan" ? Object.assign(document.createElement("span"), { className: "count", textContent: "×" }) : seat("×", { aria: "Dismiss", id: "form-dismiss" });
  if (fault === "dismissspan") dismiss.dataset.testid = "form-dismiss";   // dismissspan: the dismiss paints inside the plate but is not a seat
  if (fault === "formgone") count.style.visibility = "hidden";          // formgone: the count is kept by the rung but never paints
  if (fault === "dismissout") { dismiss.style.position = "absolute"; dismiss.style.left = "calc(100% + 16px)"; }
  run.append(face, track, count, dismiss, sep(), seat("1", { aria: "One", id: "f1" }), seat("2", { aria: "Two" }), seat("Settings", { tab: true }));
  collapsedExtent = () => fault === "formout" ? parseFloat(getComputedStyle(ap).getPropertyValue("height")) : (dismiss.style.position === "absolute" ? count : dismiss).offsetLeft + (dismiss.style.position === "absolute" ? count : dismiss).offsetWidth + 6;
  if (fault === "twoplates") { const p2 = document.createElement("div"); p2.className = "plate2"; dock.insertBefore(p2, ap); }
} else if (scene === "morph" || scene === "vmorph" || scene === "menu" || scene === "rim" || scene === "vrim") {
  collapsible = scene === "morph" || scene === "vmorph" || scene === "menu" || Q.get("collapse") === "closed";
  const wide = Q.get("wide") === "1";
  const ic = scene === "morph" ? "ic" : "";
  run.append(wide ? seat("Now playing", { tab: true, id: "home" }) : seat("H", { aria: "Home", id: "home" }), seat("1", { aria: "One", id: "f1", cls: ic }), seat("2", { aria: "Two", cls: ic }));
  if (scene === "morph") run.append(seat("3", { aria: "Three", cls: ic }), sep(), seat("Play", { tab: true, id: "play" }), seat("Settings", { tab: true }));
  if (scene === "vmorph") run.append(seat("3", { aria: "Three" }), seat("4", { aria: "Four" }));
  if (scene === "menu") run.append(seat("More", { tab: true, id: "menu" }));
  if (scene === "rim" || scene === "vrim") (fault === "rimout" ? ap : plate).append(rim);
  if (wide && fault === "wideout") ap.dataset.wideout = "";
} else if (scene === "facility") {
  // H4-10 · the O-88 facility scene: a persistent Home; a disclosure that IS the collapsed summary ("Now playing",
  // aria-expanded, kept in both postures); the run; &menu=1 adds a menu trigger; &v=1 the vertical variant
  collapsible = true;
  const home = seat("H", { aria: "Home", id: "home" }); home.dataset.persistent = "";
  run.id = "fx-run";
  const disc = fault === "tilesq" ? null : seat(V ? "▸" : "Now playing", { tab: !V, aria: V ? "Now playing" : undefined, id: "disclosure" });
  if (disc) { disc.setAttribute("aria-expanded", "false"); disc.setAttribute("aria-controls", "fx-run"); disc.addEventListener("click", () => { if (posture === "collapsed") { pinned = true; go("expanded"); } else { pinned = false; go("collapsed"); } }); }
  run.append(...[home, disc].filter(Boolean), seat("1", { aria: "One", id: "f1" }), seat("2", { aria: "Two" }), seat("3", { aria: "Three" }), seat(V ? "S" : "Settings", { tab: !V, aria: V ? "Settings" : undefined }));
  if (Q.get("menu") === "1") { const m = seat(V ? "M" : "More", { tab: !V, aria: V ? "More" : undefined, id: "menu" }); m.setAttribute("aria-haspopup", "menu"); run.append(m); }
  const last = () => disc ?? home;
  collapsedExtent = () => fault === "tilesq" ? crossOf() : (V ? last().offsetTop + last().offsetHeight : last().offsetLeft + last().offsetWidth) + 6;
  if (fault === "narrowover") budget = 2000;   // narrowover: the dock ignores the viewport's width
} else if (scene === "swap") {
  const a = document.createElement("div"); a.className = "face";
  const b = document.createElement("div"); b.className = "face";
  a.append(seat("A", { aria: "A" }), seat("B", { aria: "B" }));
  b.append(seat("C", { aria: "C" }), seat("Tools", { tab: true }), seat("Brushes", { tab: true }), seat("Layers", { tab: true }), seat("D", { aria: "D" }));
  b.hidden = true; run.append(a, b);
  window.__faces = { short: a, long: b };
  if (Q.get("three") === "1") { const m = document.createElement("div"); m.className = "face"; m.append(seat("E", { aria: "E" }), seat("Mid", { tab: true }), seat("F", { aria: "F" })); m.hidden = true; run.append(m); window.__faces.mid = m; }
}
if (scene !== "edge" || kind === "side") document.body.append(host);
host.append(dock);
if (scene === "morph" && Q.get("neighbour") === "1") { host.classList.add("nb"); const nb = document.createElement("div"); nb.className = "nbox"; nb.dataset.testid = "neighbour"; host.append(nb); }
// H3-9 · split caps: the plate paints its straights, two caps outside it paint the arcs
let caps = [];
if (scene === "edge" && (fault === "splitcaps" || fault === "nocaps")) {
  const line = "linear-gradient(var(--edge), var(--edge))";
  plate.style.boxShadow = "0 6px 24px rgba(0,0,0,.14)";
  plate.style.background = V
    ? line + " 0 50% / 1px calc(100% - 2 * var(--r)) no-repeat, " + line + " 100% 50% / 1px calc(100% - 2 * var(--r)) no-repeat, var(--veil)"
    : line + " 50% 0 / calc(100% - 2 * var(--r)) 1px no-repeat, " + line + " 50% 100% / calc(100% - 2 * var(--r)) 1px no-repeat, var(--veil)";
  const a = document.createElement("div"), b = document.createElement("div"); a.className = b.className = "cap";
  const side = "calc(var(--r) + 1px)";
  if (V) { Object.assign(a.style, { left: 0, right: 0, top: 0, height: side, borderRadius: "var(--r) var(--r) 0 0", clipPath: "inset(0 0 1px 0)" }); Object.assign(b.style, { left: 0, right: 0, bottom: 0, height: side, borderRadius: "0 0 var(--r) var(--r)", clipPath: "inset(1px 0 0 0)" }); }
  else { Object.assign(a.style, { top: 0, bottom: 0, left: 0, width: side, borderRadius: "var(--r) 0 0 var(--r)", clipPath: "inset(0 1px 0 0)" }); Object.assign(b.style, { top: 0, bottom: 0, right: 0, width: side, borderRadius: "0 var(--r) var(--r) 0", clipPath: "inset(0 0 0 1px)" }); }
  plate.after(a, b); caps = [a, b];
}
if (fault === "rimshift") rim.style.translate = V ? "12px 0" : "0 12px";
if (fault === "backdropmotion") { const st = document.createElement("div"); st.className = "stripe"; document.body.insertBefore(st, host); }
if (fault === "dot") { plate.style.inset = "auto"; plate.style.width = "2px"; plate.style.height = "2px"; }

// ── the scroll source and its one refcounted binder ──
const SRC = Q.get("source") ?? "window";
if (SRC === "el" || SRC === "late") { const mk = () => { const s = document.createElement("div"); s.className = "src"; s.dataset.testid = "src"; s.innerHTML = "<div></div>"; document.body.append(s); }; if (SRC === "el") mk(); else setTimeout(mk, 600); }
const srcGetter = () => SRC === "window" ? window : document.querySelector("[data-testid=src]");
const progressOf = (s) => s === window ? scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight) : s.scrollTop / Math.max(1, s.scrollHeight - s.clientHeight);
const binder = (() => { const reg = new Map(); return {
  bind(src, fn) { let r = reg.get(src); if (!r) { r = { fns: new Set() }; r.h = () => r.fns.forEach((f) => f()); reg.set(src, r); src.addEventListener("scroll", r.h, { passive: true }); } r.fns.add(fn); },
  release(src, fn) { const r = reg.get(src); if (!r) return; r.fns.delete(fn); if (!r.fns.size || fault === "norefcount") { src.removeEventListener("scroll", r.h); reg.delete(src); } },
}; })();
function bindSource(getter, fn) {
  if (fault === "lategetter") { const s = getter(); if (s) { binder.bind(s, fn); fn(); } return; }
  const t0 = performance.now();
  const tryBind = () => { const s = getter(); if (s) { binder.bind(s, fn); fn(); return; } if (performance.now() - t0 > 5000) { console.error("[fixture] the scroll source never appeared"); window.__errors = (window.__errors || 0) + 1; return; } requestAnimationFrame(tryBind); };
  tryBind();
}
const rimFill = () => { if (fault === "deadfill") return; const s = fault === "winonly" ? window : srcGetter(); if (!s) return; const p = Math.max(0, Math.min(1, progressOf(s))); rim.firstChild.style[V ? "height" : "width"] = (p * 100).toFixed(2) + "%"; };
if (rim.isConnected) bindSource(fault === "winonly" ? () => window : srcGetter, rimFill);

// ── the one integrator: the extent and every seat ride the same episodes ──
let longNatural = 0;
const lenOf = (el) => V ? el.offsetHeight : el.offsetWidth;
const natural = () => run.classList.contains("long") ? longNatural : lenOf(run);
let posture = collapsible ? "collapsed" : "expanded";
const crossOf = () => parseFloat(getComputedStyle(ap).getPropertyValue(V ? "width" : "height"));
const target = () => (posture === "collapsed" || posture === "compact") ? (collapsedExtent ? collapsedExtent() : crossOf()) : Math.min(natural(), budget);
let cur = null, ext = null, firstExpandDone = false, liveExtent = null;
const set = (e) => {
  cur = e;
  if (fault === "cardlerp" && dock.classList.contains("card") && typeof natural2 === "function") { const lo = crossOf(), hi = Math.min(natural2(), budget); const u = hi - lo > 1 ? Math.max(0, Math.min(1, (e - lo) / (hi - lo))) : 1; plate.style.borderRadius = (20 - 4 * u).toFixed(3) + "px"; }   // cardlerp: the card corner lerps 20 → 16 px with the extent (Q-12's open question)
  if (fault === "cardstep" && dock.classList.contains("card") && typeof natural2 === "function") { const lo = crossOf(), hi = Math.min(natural2(), budget); plate.style.borderRadius = (e < (lo + hi) / 2 ? 26 : 16) + "px"; }   // cardstep: 26 px collapsed, 16 px expanded, one step at mid extent (H4-7: between the rests, OB in both engines)
  if (fault === "squash") { const full = Math.min(natural(), budget); ap.style[V ? "height" : "width"] = full + "px"; ap.style.scale = V ? "1 " + (e / full) : (e / full) + " 1"; ap.style.transformOrigin = "0 0"; }
  else ap.style[V ? "height" : "width"] = e + "px";
};
const seatsAll = () => [...run.querySelectorAll(".seat")];
const rendered = () => seatsAll().filter((s) => s.getClientRects().length > 0);
const lay = (s) => V ? s.offsetTop : s.offsetLeft;
let lastLayout = new Map();   // seat → layout position at the last settled read
const flips = new Map();      // seat → episode on its translate
let incoming = new Map();     // seat → { clearAt }
const snapshot = () => { lastLayout = new Map(rendered().map((s) => [s, lay(s)])); };
const trOf = (s, now) => { const f = flips.get(s); return f ? f.pos(now - f.t0) : 0; };
const tvOf = (s, now) => { const f = flips.get(s); return f ? f.vel(now - f.t0) : 0; };
function inertFaces() { const coll = posture === "collapsed" || posture === "compact"; seatsAll().forEach((s, i) => { const keep = scene === "form" ? s.dataset.testid?.startsWith("form-") : scene === "facility" ? (s.hasAttribute("data-persistent") || s.dataset.testid === "disclosure") : i === 0;
  if (scene === "facility") { if (fault === "persistentinert" && coll && s.hasAttribute("data-persistent")) s.setAttribute("inert", ""); else s.removeAttribute("inert"); if (s.dataset.testid === "disclosure") s.setAttribute("aria-expanded", coll ? "false" : "true"); } if (coll && !keep) s.setAttribute("tabindex", "-1"); else if (fault === "notab" && i === 1) s.setAttribute("tabindex", "-2"); else s.removeAttribute("tabindex"); }); }
let raf = 0, cssT = 0;
const useCss = fault === "cssbend" || fault === "csscarrier";
// the CSS carrier's two transitions, built once (engines serialize style.transition differently: never regex it back)
const FX_EASE = "linear(" + Array.from({ length: 41 }, (_, i) => (1 + err(-1, 0, CLOCK * i / 40) - err(-1, 0, CLOCK) * i / 40).toFixed(4)).join(", ") + ")";
const FX_RUN = "--fx-t " + (CLOCK * 1000).toFixed(0) + "ms " + FX_EASE, FX_RESET = "--fx-t 0ms " + FX_EASE;
if (useCss) { ap.style.transition = FX_RUN; if (fault === "cssbend") plate.style.borderRadius = "calc(var(--r) - 32px * var(--fx-t) * (1 - var(--fx-t)))"; }
// H3-3 · leaving seats (removal): in place, clipped from the end edge on the spring, then removed
const leavers = new Map();   // seat → { ep, w, slip }
function leaveSeat(s) {
  if (fault === "pop") { s.remove(); return; }
  const x = lay(s), cx = V ? s.offsetLeft : s.offsetTop, W = s.offsetWidth, Hh = s.offsetHeight;
  Object.assign(s.style, { boxSizing: "border-box", position: "absolute", left: (V ? cx : x) + "px", top: (V ? x : cx) + "px", width: W + "px", height: Hh + "px" });
  leavers.set(s, { ep: episode(0, 0, 1, vnow()), w: V ? Hh : W, slip: 0 });
}
// H3-1/H3-3 · the swap: a per-seat wipe on its own episode (header). H4-1: the seam is an exclusion
// lane of one glyph advance (ADV, the seat font's "0"): a leaving seat's visible start leads by two
// advances, an entering seat's cut end stays one advance short of any leaving visible start, and a
// seat whose visible part is under one advance does not paint (no sliver). H4-5: a swap retargeted
// mid-flight wipes every unit that still paints from what it paints (leaving and entering alike)
let swapState = null, curFace = "short";
const wiping = new Set();
const advCv = document.createElement("canvas").getContext("2d");
let ADV = 0;
const adv = () => { if (ADV) return ADV; const s0 = run.querySelector(".seat"); if (!s0) return 8; const cs = getComputedStyle(s0); advCv.font = cs.fontStyle + " " + cs.fontWeight + " " + cs.fontSize + " " + cs.fontFamily; ADV = advCv.measureText("0").width; return ADV; };
function clipMain(s, fromStart, px) { const v = Math.max(0, px).toFixed(2) + "px"; s.style.clipPath = V ? (fromStart ? "inset(" + v + " 0 0 0)" : "inset(0 0 " + v + " 0)") : (fromStart ? "inset(0 0 0 " + v + ")" : "inset(0 " + v + " 0 0)"); }
function clip2(s, a, b) { const f = (x) => Math.max(0, x).toFixed(2) + "px"; s.style.clipPath = V ? "inset(" + f(a) + " 0 " + f(b) + " 0)" : "inset(0 " + f(b) + " 0 " + f(a) + ")"; }
const lane = () => fault === "splice" ? 0 : adv();
const noSliver = () => fault !== "sliver";
function swapTick(vt) {
  const st = swapState; const p = Math.max(0, Math.min(1, st.ep.pos(vt - st.ep.t0)));
  const A = adv(), LN = lane();
  const vis = [];
  st.vis = new Map();
  for (const g of st.old) {
    if (!g.wipe) { if (g.b - g.a > 0.5) st.vis.set(g.s, [g.a, g.b]); continue; }   // outside the new extent: the closing plate takes it
    if (st.pop) { clip2(g.s, g.w, 0); continue; }   // retargetpop: the units on the glass at the retarget vanish at once
    const lead = g.lead ? Math.min(g.b - g.a, 2 * LN) : 0;   // the lane: a unit the entering face shares a place with leads by two advances, then wipes on the episode
    let a = g.a + lead + p * Math.max(0, g.b - g.a - lead), b = g.b;
    if (noSliver() && b - a < A) a = b;
    clip2(g.s, a - g.x, g.x + g.w - b);
    if (b - a > 0.5) { vis.push([a, b]); st.vis.set(g.s, [a, b]); }
  }
  for (const e of st.enter) {
    const xe = lay(e), we = lenOf(e);
    let right = fault === "blankswap" && p < 1 ? xe : Math.min(xe + we, xe + LN + p * we);   // blankswap: the entering face stays hidden until the episode ends
    for (const [a, b] of vis) { if (b <= xe) continue; if (a >= xe) right = Math.min(right, a - LN); else right = xe; }
    if (noSliver() && right - xe < A) right = xe;
    if (fault === "lanesnap" && e === st.widest && p >= 0.6) { if (st.frozen == null) st.frozen = right; right = st.frozen; }
    if (fault === "lanecancel" && e === st.widest && p >= 0.5) right = xe + we;   // lanecancel: the widest entering seat's cut is cancelled to identity at once, mid-window   // lanesnap: the widest entering seat's cut stops at 60 % and is cleared after the flag
    right = Math.max(xe, right);
    clipMain(e, false, we - (right - xe));
    st.vis.set(e, [xe, right]);
  }
  if (vt - st.ep.t0 >= st.ep.T) {
    for (const f of st.faces) f.hidden = true;
    for (const g of st.old) for (const k of ["boxSizing", "position", "left", "top", "width", "height", "clipPath"]) g.s.style[k] = "";
    for (const e of st.enter) if (!(fault === "lanesnap" && e === st.widest)) e.style.clipPath = "";
    if (fault === "lanesnap" && st.widest) { const w_ = st.widest; setTimeout(() => { w_.style.clipPath = ""; }, 40); }
    wiping.clear(); swapState = null; snapshot();
    return false;
  }
  return true;
}
// H5-3 · a glyph a moving clip edge cuts to between 5 and 95 % of its ink paints at 0.4 opacity: the seam has no
// glyph-sharp edge (the rule's allowance: a stub paints above 0.5). stub: the hard cut stays
const gCv = document.createElement("canvas").getContext("2d"), gInk = new Map();
function soften() {
  if (fault === "stub") return;
  for (const s of seatsAll()) {
    const gs = s.querySelectorAll(":scope > .g"); if (!gs.length) continue;
    const cp = s.style.clipPath;
    if (!cp) { if (s.__soft) { gs.forEach((g) => { g.style.opacity = ""; }); s.__soft = false; } continue; }
    const v = (cp.match(/-?[\\d.]+px|\\b0\\b/g) || []).map((x) => parseFloat(x) || 0); const [t = 0, r = t, b = t, l = r] = v;
    const q = s.getBoundingClientRect(); const c0 = V ? q.top + t : q.left + l, c1 = V ? q.bottom - b : q.right - r;
    for (const g of gs) {
      const gq = g.getBoundingClientRect(); let g0, g1;
      if (V) { g0 = gq.top; g1 = gq.bottom; }
      else { const cs = getComputedStyle(g); const key = cs.fontWeight + cs.fontSize + cs.fontFamily + g.textContent; let m = gInk.get(key); if (!m) { gCv.font = cs.fontStyle + " " + cs.fontWeight + " " + cs.fontSize + " " + cs.fontFamily; const x = gCv.measureText(g.textContent); m = [x.actualBoundingBoxLeft || 0, x.actualBoundingBoxRight || x.width]; gInk.set(key, m); } g0 = gq.left - m[0]; g1 = gq.left + m[1]; }
      const frac = g1 - g0 > 0.5 ? Math.max(0, Math.min(g1, c1) - Math.max(g0, c0)) / (g1 - g0) : 1;
      g.style.opacity = frac > 0.05 && frac < 0.95 ? "0.4" : "";
    }
    s.__soft = true;
  }
}
function tick(now) {
  raf = 0;
  if (lastTick != null && fault !== "leap") { const gap = now - lastTick; if (gap > STALL_MS) lag += gap - 1000 / 60; }
  lastTick = now;
  const rnow = now; now = now - lag;   // episodes run on the stall-safe clock (vnow)
  void rnow;
  let moving = false, fading = false;
  for (const [s, L] of leavers) {
    if (fault === "slipfade") { L.slip++; if (L.slip <= 2) { s.style.opacity = L.slip === 1 ? "0.97" : "0.94"; moving = true; continue; } s.remove(); leavers.delete(s); continue; }   // slipfade: 1 → 0.97 → 0.94 → gone (B′ V-3's path)
    const tau = now - L.ep.t0; const p = Math.max(0, Math.min(1, L.ep.pos(tau)));
    const cut = fault === "vanishstep" ? L.w * (0.8 + 0.2 * p) : p * L.w;   // vanishstep (H5-4): 0.8 of its ink goes in the first frame, the rest on the spring
    clipMain(s, false, noSliver() && L.w - cut < adv() ? L.w : cut);   // H4-1: under one advance it does not paint
    if (tau >= L.ep.T) { s.remove(); leavers.delete(s); } else moving = true;
  }
  if (swapState && swapTick(now)) moving = true;
  if (ext) {
    const tau = now - ext.t0;
    if (fault === "subpx") { const v = ext.to + err(ext.x0 - ext.to, 0, tau / 1000); const done = tau > 450 && Math.abs(v - ext.to) < 0.01; set(done ? ext.to : v); if (done) ext = null; else moving = true; }
    else if (fault === "jump" && ext.first) { if (tau >= ext.T) { set(ext.to); ext = null; } else { set(ext.x0); moving = true; } }
    else if (fault === "deadmorph") { liveExtent = ext.pos(tau); set(Math.max(ext.x0, ext.to)); if (tau >= ext.T) { set(ext.to); liveExtent = null; ext = null; } else moving = true; }
    else { set(ext.pos(tau)); if (tau >= ext.T) ext = null; else moving = true; }
  }
  for (const [s, f] of flips) { const tau = now - f.t0; const v = tau >= f.T ? 0 : f.pos(tau); s.style.translate = V ? "0 " + v + "px" : v + "px 0"; if (tau >= f.T) { flips.delete(s); s.style.translate = ""; } else moving = true; }
  if (incoming.size) {
    for (const [s, st] of incoming) {
      if (fault === "doublex") { const o = Math.min(1, (now - st.t0) / (CLOCK * 1000)); s.style.opacity = String(o); if (o >= 1) { incoming.delete(s); s.style.opacity = ""; } else fading = true; continue; }
      // H4-2 · an incoming seat is REVEALED by its clip as its neighbours' flips open its slot: it paints the largest
      // part of its box that no other seat's box covers, hidden below one advance (no sliver), and its clip eases
      // to identity on the flips' own clock, inside the window (pass 3 faded it in after the slot cleared, with the
      // flag already closed: the opacity lane outlived the window)
      const a = s.getBoundingClientRect(), A0 = V ? a.top : a.left, A1 = V ? a.bottom : a.right;
      let lo = A0, hi = A1;
      for (const o of seatsAll()) { if (o === s || incoming.has(o) || o.hidden || !o.getClientRects().length) continue; const b = o.getBoundingClientRect(), B0 = V ? b.top : b.left, B1 = V ? b.bottom : b.right; if (Math.min(A1, B1) - Math.max(A0, B0) <= 0) continue; if ((B0 + B1) / 2 >= (A0 + A1) / 2) hi = Math.min(hi, B0); else lo = Math.max(lo, B1); }
      if (hi - lo < adv()) { lo = A0; hi = A0; }
      if (hi - lo >= A1 - A0 - 0.01 || (!flips.size && !ext)) { incoming.delete(s); s.style.clipPath = ""; continue; }   // clear, or nothing left moving that could clear it
      clip2(s, lo - A0, A1 - hi); moving = true;
    }
  }
  if (fault === "cardspread" && dock.classList.contains("card")) plate.style.borderRadius = moving ? "26px" : "";   // cardspread: the card radius swells mid-morph
  if (fault === "cardblip" && dock.classList.contains("card")) { const tau = ext ? now - ext.t0 : -1; plate.style.borderRadius = ext && tau > 0.2 * ext.T && tau < 0.7 * ext.T ? "26px" : ""; }   // cardblip (H5-12): 26 px through the middle half of the morph's time only
  soften();
  if (fading && !moving) { dock.removeAttribute("data-morphing"); raf = requestAnimationFrame(tick); return; }   // the window is the spatial morph's; a fade is not
  const inBand = fault === "bandclose" && ext && Math.abs(cur - ext.to) <= BAND * Math.abs(ext.to - ext.x0);   // bandclose: the flag closes at the 2 % band (Q-4 (a))
  if (moving) { if (inBand) dock.removeAttribute("data-morphing"); else dock.setAttribute("data-morphing", ""); raf = requestAnimationFrame(tick); }
  else if (fault === "late") setTimeout(() => { if (!raf) dock.removeAttribute("data-morphing"); }, 250);
  else { if (fault === "seatsettle" && dock.hasAttribute("data-morphing")) { const f1 = run.querySelector('[data-testid="f1"]'); if (f1) { f1.style.left = "1px"; setTimeout(() => { f1.style.left = ""; }, 120); } } dock.removeAttribute("data-morphing"); }   // seatsettle (H5-7): a seat settles 1 px by layout after the flag closes
  if (!raf) lastTick = null;
}
// ghosthit: each seat gets a fixed, transparent press proxy at its layout centre while the dock morphs (a press surface that does not follow the clip)
const ghostPlace = () => { for (const s of seatsAll()) { const g = s.querySelector(".ghostproxy"); if (!g) continue; const r = s.getBoundingClientRect(); g.style.left = (r.left + r.width / 2 - 6) + "px"; g.style.top = (r.top + r.height / 2 - 6) + "px"; } if (document.querySelector(".ghostproxy")) requestAnimationFrame(ghostPlace); };
const ghostOn = () => { if (fault !== "ghosthit") return; let fresh = false; for (const s of seatsAll()) { if (s.querySelector(".ghostproxy")) continue; const g = document.createElement("span"); g.className = "ghostproxy"; s.append(g); fresh = true; } if (fresh) ghostPlace(); };
const ghostOff = () => { if (fault === "ghosthit") setTimeout(() => { if (!dock.hasAttribute("data-morphing")) document.querySelectorAll(".ghostproxy").forEach((g) => g.remove()); }, 400); };
new MutationObserver(() => { if (dock.hasAttribute("data-morphing")) ghostOn(); else ghostOff(); }).observe(dock, { attributes: true, attributeFilter: ["data-morphing"] });
const kick = () => { dock.setAttribute("data-morphing", ""); if (!raf) { lastTick = performance.now(); raf = requestAnimationFrame(tick); } };
function morph(to) {
  const now = vnow();
  if (fault === "nbjump" && Q.get("neighbour") === "1") dock.style[V ? "height" : "width"] = to + "px";   // nbjump: the dock's layout box takes the target at once
  if (fault === "nboverlap" && Q.get("neighbour") === "1" && !dock.style[V ? "height" : "width"]) dock.style[V ? "height" : "width"] = crossOf() + "px";   // nboverlap: the dock's layout box keeps its collapsed size, so the plate paints over the neighbour
  if (cur == null) { set(to); return; }
  if (Math.abs(to - cur) < 0.01 && !ext) return;
  if (PRM.matches && fault !== "noprm") { ext = null; set(to); dock.removeAttribute("data-morphing");
    // prmfade (H5-6): under reduced motion the extent lands at once, but the seats fade in over 100 ms and the flag stays up 200 ms
    if (fault === "prmfade") { dock.setAttribute("data-morphing", ""); for (const s of seatsAll()) s.animate({ opacity: [0, 1] }, { duration: 100 }); setTimeout(() => dock.removeAttribute("data-morphing"), 200); }
    return; }
  if (fault === "morphsnap" && scene === "facility") { ext = null; set(to); return; }   // morphsnap: collapse and expand jump
  if (useCss) {
    const from = cur; cur = to; ap.style.setProperty("--from", from + "px"); ap.style.setProperty("--to", to + "px");
    ap.style.transition = FX_RESET; ap.style.setProperty("--fx-t", "0"); getComputedStyle(ap).getPropertyValue("--fx-t");
    ap.style.transition = FX_RUN;
    ap.style[V ? "height" : "width"] = "calc(var(--from) + (var(--to) - var(--from)) * var(--fx-t))";
    ap.style.setProperty("--fx-t", "1"); dock.setAttribute("data-morphing", "");
    clearTimeout(cssT); cssT = setTimeout(() => { ap.style[V ? "height" : "width"] = to + "px"; dock.removeAttribute("data-morphing"); }, CLOCK * 1000 + 20);
    return;
  }
  const isFirst = !firstExpandDone && to > cur; if (to > cur) firstExpandDone = true;
  const v0 = ext && fault !== "wall" ? ext.vel(now - ext.t0) : 0;
  const x0 = ext ? ext.pos(now - ext.t0) : cur;   // the integrator's state at the retarget, not the last painted frame
  ext = episode(x0, v0, to, now); ext.first = isFirst;
  if (fault === "owners") for (const s of seatsAll()) { s.animate({ opacity: [1, 0.85, 1] }, 260); s.animate({ opacity: [1, 0.9, 1] }, 260); }
  kick();
}
/** Content changed (a seat added, removed, resized or reordered): FLIP every seat on one episode. */
function contentChanged(skipFlip = false) {
  const now = vnow();
  const next = new Map(rendered().map((s) => [s, lay(s)]));
  if (!skipFlip && fault !== "seatjump" && fault !== "content" && !PRM.matches) {
    for (const [s, x] of next) {
      if (lastLayout.has(s) && Math.abs(lastLayout.get(s) - x) < 0.25) continue;   // its layout did not move: a running flip already carries it (a second trigger must not restart it)
      if (lastLayout.has(s)) { const painted = lastLayout.get(s) + trOf(s, now); const d = painted - x; if (Math.abs(d) > 0.25) { const f = episode(d, tvOf(s, now), 0, now); flips.set(s, f); s.style.translate = V ? "0 " + d + "px" : d + "px 0"; } }
      else if (lastLayout.size && !wiping.has(s)) { incoming.set(s, { t0: now, clearAt: null }); if (fault === "doublex") s.style.opacity = "0"; else clipMain(s, false, lenOf(s)); }   // H4-2: revealed by its clip, not faded
    }
  }
  lastLayout = next;
  if (flips.size || incoming.size) kick();
}

// ── the run: a scroll container only when seats genuinely exceed the budget ──
function fitRun() {
  if (lenOf(run) === 0) return;          // no layout yet (hidden): a zero read is not a rest
  if (scene === "nested") { if (fault !== "nestgrow") { run.style.width = "max-content"; const w = run.offsetWidth; run.style.width = ""; longNatural = w; } return; }
  const len = lenOf(run);
  if (len > budget + 0.5) { longNatural = len; run.classList.add("long"); }
  if (fault === "ringclip") run.classList.add("nogutter");
  if (fault === "scroller") run.classList.add("scroller");
}
const natural2 = () => scene === "nested" && fault !== "nestgrow" ? longNatural : natural();
const target2 = () => (posture === "collapsed" || (posture === "compact" && fault !== "nocompact")) ? (collapsedExtent ? collapsedExtent() : crossOf()) : Math.min(natural2(), budget);   // nocompact: the rung is entered but the extent never shrinks
fitRun();
if (lenOf(run) > 0) { set(target2()); snapshot(); }
inertFaces();
// H5-1 · a roving-tabindex run (rail, long): one Tab stop, the arrows move focus, Home/End jump. roving: a PASS variant;
// arrowclamp: the back arrow clamps at Seat 2 and there is no Home, so Seat 1 has no key
if ((fault === "roving" || fault === "arrowclamp") && (scene === "rail" || scene === "long")) {
  const ss = seatsAll(); const cur = Math.max(0, ss.findIndex((x) => x.hasAttribute("aria-current") || x.getAttribute("aria-pressed") === "true"));
  ss.forEach((x, j) => { x.setAttribute("tabindex", j === cur ? "0" : "-1"); x.dataset.roving = ""; });   // a roving -1 is still a seat (seats() below)
  const at = (k) => { ss.forEach((x, j) => x.setAttribute("tabindex", j === k ? "0" : "-1")); ss[k].focus(); };
  run.addEventListener("keydown", (e) => { const i = ss.indexOf(document.activeElement); if (i < 0) return; const lo = fault === "arrowclamp" ? 1 : 0;
    if (e.key === (V ? "ArrowUp" : "ArrowLeft")) { e.preventDefault(); at(Math.max(lo, i - 1)); }
    else if (e.key === (V ? "ArrowDown" : "ArrowRight")) { e.preventDefault(); at(Math.min(ss.length - 1, i + 1)); }
    else if (fault === "roving" && e.key === "Home") { e.preventDefault(); at(0); }
    else if (fault === "roving" && e.key === "End") { e.preventDefault(); at(ss.length - 1); } });
}
if (fault === "noname") seatsAll()[1]?.setAttribute("aria-hidden", "true");   // noname: one seat is hidden from AT
if (fault === "overhang" || fault === "adapterclip" || fault === "dismissout") ap.style.overflow = "visible";
if (fault === "formout") ap.style.overflow = "visible";
if (ap.dataset.wideout !== undefined) ap.style.overflow = "visible";
let settled = lenOf(run) > 0;
/** A content change the page made itself: FLIP in the same task, before any frame can paint it (the RO below is the backstop for changes the fixture did not make). */
// H3-2 · a size that keeps changing is followed at the extent: no window, no FLIP. Two cases: an
// infinite animation inside the run, and a seat's own size transition the scoped hand-off let run (the
// open-seat exchange: its layout moves continuously on its own, so a FLIP would fight it).
// infhold: an infinite one is morphed every change instead (the window is held open); infthrow: the
// carrier calls finish() on it (an InvalidStateError on an infinite effect)
const inRun = (a) => a.effect?.target && run.contains(a.effect.target) && a.playState === "running";
const infinite = () => document.getAnimations().filter((a) => inRun(a) && !a.transitionProperty && a.effect.getTiming().iterations === Infinity);
function follow() {
  const inf = infinite();
  if (inf.length && fault === "infthrow") inf.forEach((a) => a.finish());
  const sizing = holdingExchange();
  const useInf = inf.length > 0 && fault !== "infhold" && fault !== "infthrow";
  if (!sizing && !useInf) return false;
  if (useInf) ext = null;
  if (!ext && Math.abs(target2() - cur) > 0.01) set(target2());
  snapshot(); return true;
}
function changed() {
  if (!settled) return;
  if (posture === "collapsed" || posture === "compact") { contentChanged(); return; }
  if (follow()) return;
  const t = target2();
  contentChanged();
  if (Math.abs(t - cur) > 0.25) { if (fault === "content") { ext = null; set(t); } else morph(t); }
}
new ResizeObserver(() => {
  if (!settled) { if (lenOf(run) === 0) return; fitRun(); if (fault === "hiddengrow") { cur = 0; morph(target2()); } else set(target2()); snapshot(); settled = true; return; }
  if (posture === "collapsed" || posture === "compact") { contentChanged(); return; }
  if (follow()) return;
  const t = target2();
  contentChanged();
  if (Math.abs(t - cur) > 0.25) { if (fault === "content") { ext = null; set(t); } else morph(t); }
}).observe(run);
addEventListener("resize", () => {
  if (fault === "resizemorph") { cur = 0; morph(target2()); }
  if (fault === "resizenorest") { let k = 0; const j = () => { ap.style[V ? "height" : "width"] = (cur + (k++ % 2 ? 0.3 : -0.3)) + "px"; requestAnimationFrame(j); }; requestAnimationFrame(j); }   // resizenorest: never comes to rest (and never opens a window)
});

// ── the seat-size owner (K-13), scoped (H3-2): the dock owns the extent; a seat's own size transition is
// finished only when the running size transitions change the run's main extent, never for an exchange
// that holds it (the open-seat exchange). latsnap: every seat size transition is finished (B′ CX-2) ──
const SIZE_RE = /^(width|inline-size|height|block-size|min-width|max-width|flex-basis|grid-template-columns)$/;
const MAIN_RE = V ? /^(height|block-size|min-height|max-height|flex-basis)$/ : /^(width|inline-size|min-width|max-width|flex-basis)$/;
const camel = (p) => p.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
/** the running seat size transitions in the run, and the sum of their main-axis deltas */
function sizeRuns() {
  const runs = document.getAnimations().filter((a) => a.transitionProperty && SIZE_RE.test(a.transitionProperty) && a.effect?.target && run.contains(a.effect.target) && a.playState !== "finished");
  let delta = 0;
  for (const a of runs) { if (!MAIN_RE.test(a.transitionProperty)) continue; const k = a.effect.getKeyframes(), key = camel(a.transitionProperty); delta += parseFloat(k.at(-1)[key]) - parseFloat(k[0][key]); }
  return { runs, delta };
}
/** an exchange the scoped hand-off let run: size transitions that hold the run's main extent */
const holdingExchange = () => { const { runs, delta } = sizeRuns(); return runs.length > 0 && Math.abs(delta) <= 0.5; };
if (fault !== "twoowners") dock.addEventListener("transitionrun", (e) => {
  if (!SIZE_RE.test(e.propertyName) || !e.target.closest(".seat")) return;
  const { runs, delta } = sizeRuns();
  if (fault === "latsnap") { runs.forEach((a) => a.finish()); return; }
  if (Math.abs(delta) > 0.5) runs.forEach((a) => a.finish());
});
// a size transition the hand-off let run moved its seats continuously itself: the settled layout is the rest
for (const ev of ["transitionend", "transitioncancel"]) dock.addEventListener(ev, (e) => { if (SIZE_RE.test(e.propertyName) && e.target.closest(".seat")) snapshot(); });
// the open-seat exchange on the morph scene's icon seats, on the fixture's own spring
if (scene === "morph") { const st = document.createElement("style"); st.textContent = ".run > .seat.ic { width: 44px; transition: scale .18s ease-out, box-shadow .18s ease-out, width " + (CLOCK * 1000).toFixed(0) + "ms " + FX_EASE + "; } .run > .seat.ic[aria-current] { width: 92px; }"; document.head.append(st); }

// ── posture: typed by modality ──
function go(p) { if (p === posture) return; posture = p; if (fault === "plateswap" && p === "expanded") { const np = document.createElement("div"); np.className = plate.className; np.style.cssText = plate.style.cssText; plate.replaceWith(np); plate = np; } inertFaces(); morph(target2()); }   // plateswap: the expanded rung paints a different plate element
let timer = 0, held = false, engaged = false, pinned = false, swallow = false;
const schedule = () => { if (!collapsible) return; clearTimeout(timer); timer = setTimeout(() => {
  const keep = fault === "menucollapse" ? engaged : (held || pinned || !!dock.querySelector(":focus-visible") || engaged);
  if (!keep) go("collapsed");
}, DELAY); };
let releasedAt = -1e9;
const release = () => { releasedAt = performance.now(); if (collapsible) schedule(); else setTimeout(evalCompact, 160); };
dock.addEventListener("pointerenter", (e) => { if (e.pointerType !== "mouse" || !FINE.matches) return; engaged = true; clearTimeout(timer); if (collapsible) go("expanded"); else evalCompact(); });
dock.addEventListener("pointerleave", (e) => { if (e.pointerType !== "mouse") return; engaged = false; release(); });
dock.addEventListener("focusin", (e) => { clearTimeout(timer); if (collapsible && posture === "collapsed" && dock.querySelector(":focus-visible") && fault !== "nofocus" && e.target?.dataset?.testid !== "disclosure") go("expanded"); evalCompact(); });   // nofocus: keyboard focus never opens the dock; the disclosure opens it on Enter, not on focus
dock.addEventListener("focusout", (e) => { if (!dock.contains(e.relatedTarget)) release(); });
dock.addEventListener("pointerdown", (e) => {
  if (fault === "pressgate") engaged = true;
  if (e.pointerType === "mouse") return;
  if (collapsible && posture === "collapsed") { if (fault !== "menucollapse") pinned = true; if (fault !== "tapthrough") swallow = true; go("expanded"); if (fault === "menucollapse") schedule(); }
}, true);
dock.addEventListener("click", (e) => { if (swallow) { swallow = false; e.stopPropagation(); e.preventDefault(); } }, true);
const menu = document.getElementById("menu");
document.addEventListener("pointerdown", (e) => { if (dock.contains(e.target) || menu.contains(e.target)) return; if (!menu.hidden) { menu.hidden = true; held = false; }
  // H5-11 · the facility scene: an outside press collapses an expanded dock at once, mid-morph too (the integrator retargets).
  // pressdrop: a press that lands while the flag is up is dropped, and nothing re-arms the collapse (O-91)
  if (scene === "facility") { if (fault === "pressdrop" && dock.hasAttribute("data-morphing")) return; if (posture !== "collapsed" && !held) { pinned = false; go("collapsed"); } return; }
  if (pinned) { pinned = false; schedule(); } });
run.querySelector('[data-testid="menu"]')?.addEventListener("click", () => { menu.hidden = !menu.hidden; held = !menu.hidden; if (!held || fault === "menucollapse") schedule(); });
// H4-10 · the facility scene's keyboard and scroll: Escape closes an open menu (focus back to its trigger), else
// collapses the dock with focus on the disclosure; a scroll of the page collapses an expanded dock nothing holds
if (scene === "facility") {
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (!menu.hidden) { menu.hidden = true; held = false; run.querySelector('[data-testid="menu"]')?.focus(); schedule(); return; }
    if (!dock.contains(document.activeElement) || posture !== "expanded") return;
    pinned = false; go("collapsed");
    if (fault === "focuslost") document.activeElement.blur(); else run.querySelector('[data-testid="disclosure"]')?.focus();   // focuslost: focus falls to the body
  });
  addEventListener("scroll", () => { if (fault === "noscroll" || posture !== "expanded" || engaged || held || dock.querySelector(":focus-visible")) return; pinned = false; go("collapsed"); }, { passive: true });
}

// ── compact-on-scroll: threshold with hysteresis, gated by engagement ──
const ENTER = fault === "nohyst" ? 200 : 240, EXIT = fault === "nohyst" ? 200 : 160;
let latched = false, gateT = 0;
const srcY = () => { const s = srcGetter(); return !s ? 0 : s === window ? scrollY : s.scrollTop; };
function evalCompact() {
  if (scene !== "compact") return;
  const y = srcY();
  if (fault === "prmscrub" && PRM.matches) { const k = Math.max(0, Math.min(1, (y - EXIT) / (ENTER + 200 - EXIT))); posture = k >= 1 ? "compact" : "expanded"; set(Math.min(natural2(), budget) + (crossOf() - Math.min(natural2(), budget)) * k); return; }
  if (!latched && y > ENTER) latched = true;
  else if (latched && y < EXIT) latched = false;
  const gate = fault === "noengage" ? false : engaged || !!dock.querySelector(":focus-visible");   // noengage: hover and focus never lift the compact rung
  clearTimeout(gateT);
  if (gate || !latched) { go("expanded"); seatScale(1); return; }
  const wait = 150 - (performance.now() - releasedAt);   // the gate releases 150 ms after disengagement
  if (wait > 0) gateT = setTimeout(evalCompact, wait);
  else { if (fault === "compactjump") { const c = run.querySelector('[aria-pressed="true"]'); if (c) c.style.order = "-1"; } go("compact"); seatScale(0.7); }
}
function seatScale(k) { if (fault !== "seatshrink") return; seatsAll().forEach((s) => { s.style.scale = k === 1 ? "" : String(k); }); }
if (scene === "compact") bindSource(srcGetter, evalCompact);
// twin: a second dock bound to the same source; dropA() unmounts it and releases its binding
let twinFn = null, twinEl = null;
if (scene === "compact" && Q.get("twin") === "1") {
  twinEl = document.createElement("div"); twinEl.style.cssText = "position:fixed;top:16px;left:50%;translate:-50% 0;width:120px;height:56px;border-radius:28px;background:rgba(255,255,255,.6);";
  document.body.append(twinEl); twinFn = () => { twinEl.dataset.y = String(srcY()); }; bindSource(srcGetter, twinFn);
}

// ── ticking text ──
let tickT = 0;
const TICKS = ["0:08", "0:09", "0:10", "0:11", "1:12", "10:58", "0:07", "1:01"];
const tickLog = [];

// ── the probe contract ──
const hp = window.__hp;
window.__scene = {
  name: scene, presets: [],
  consumerBudget: scene === "cwidth" ? 240 : scene === "nested" ? 360 : undefined,
  setFace: (f) => {
    const F = window.__faces; if (!F) return;
    const to = F[f]; if (!to || f === curFace) return;
    const pin = (s) => ({ s, x: lay(s), w: lenOf(s), cx: V ? s.offsetLeft : s.offsetTop, W: s.offsetWidth, H: s.offsetHeight });
    const abs = (g) => Object.assign(g.s.style, { boxSizing: "border-box", position: "absolute", left: (V ? g.cx : g.x) + "px", top: (V ? g.x : g.cx) + "px", width: g.W + "px", height: g.H + "px" });
    let old, faces;
    if (swapState) {
      // H4-5 · a retarget: every unit that paints now leaves from what it paints
      if (fault === "ctxloss") { location.reload(); return; }   // ctxloss: the page navigates under the retarget (the evaluate context is destroyed)
      const st = swapState;
      const ent = st.enter.map(pin); ent.forEach(abs);
      // a unit already leaving keeps wiping from what it paints (its lead is spent); an entering unit turned leaving leads
      old = [...st.old.filter((g) => st.vis.has(g.s)).map((g) => { const [a, b] = st.vis.get(g.s); return { ...g, a, b, lead: false }; }),
             ...ent.filter((g) => st.vis.has(g.s) && st.vis.get(g.s)[1] - st.vis.get(g.s)[0] > 0.5).map((g) => { const [a, b] = st.vis.get(g.s); return { ...g, a, b, lead: true }; })];
      for (const g of st.old) if (!st.vis.has(g.s)) g.s.style.clipPath = V ? "inset(100% 0 0 0)" : "inset(0 0 0 100%)";
      for (const g of ent) if (!old.some((o) => o.s === g.s)) g.s.style.clipPath = V ? "inset(100% 0 0 0)" : "inset(0 0 0 100%)";
      old.push(...st.old.filter((g) => !st.vis.has(g.s)).map((g) => ({ ...g, wipe: false })), ...ent.filter((g) => !old.some((o) => o.s === g.s)).map((g) => ({ ...g, a: g.x, b: g.x, wipe: false })));
      faces = [...st.faces, st.to];
    } else {
      const from = F[curFace];
      old = [...from.querySelectorAll(".seat")].map(pin).map((g) => ({ ...g, a: g.x, b: g.x + g.w, lead: true }));
      old.forEach(abs);
      faces = [from];
    }
    to.hidden = false; curFace = f;
    const newLen = lenOf(run);
    const enter = [...to.querySelectorAll(".seat")];
    enter.forEach((s) => wiping.add(s));
    const widest = enter.reduce((m, e) => (!m || lenOf(e) > lenOf(m) ? e : m), null);
    swapState = { ep: episode(0, 0, 1, vnow()), faces, to, enter, widest, pop: fault === "retargetpop" && faces.length > 1, old: old.map((g) => ({ ...g, wipe: g.wipe !== false && (g.a + g.b) / 2 < newLen })) };
    swapTick(vnow()); soften();
    changed(); kick();
    if (fault === "ctxgc" && faces.length > 1) queueMicrotask(() => queueMicrotask(() => { if (typeof gc === "function") gc(); }));   // ctxgc (H5-2): a full GC two microtasks after a retarget (ctx-diag's gc-slot), where V8's inspector collects an unheld evaluate promise
  },
  setExtra: (v) => { const x = run.querySelector('[data-testid="extra"]'); if (v && !x) run.append(seat(V ? "5" : "Brushes and layers", { tab: !V, aria: V ? "Five" : undefined, id: "extra" })); else if (!v && x) leaveSeat(x); changed(); if (!v) kick(); },
  setLead: (v) => { const x = run.querySelector('[data-testid="lead"]'); const f1 = run.querySelector('[data-testid="f1"]'); if (v && !x) run.insertBefore(seat(V ? "0" : "Lead", { tab: !V, aria: V ? "Zero" : undefined, id: "lead" }), f1); else if (!v && x) leaveSeat(x); if (fault !== "nostretch") changed(); if (!v) kick(); },   // nostretch: the carrier learns of an insertion only from a ResizeObserver on the run
  stretch: (px) => { run.style[V ? "height" : "width"] = (lenOf(run) + px) + "px"; },
  collapse: () => { pinned = false; go("collapsed"); },
  expand: () => go("expanded"),
  show: () => host.classList.remove("hidden"),
  grow: (v) => run.querySelector('[data-testid="grow"]').classList.toggle("big", v),
  startTick: () => { let k = 0; const el = run.querySelector('[data-testid="tick"]'); tickT = setInterval(() => { el.textContent = TICKS[++k % TICKS.length]; tickLog.push(lenOf(run)); }, 180); },
  stopTick: () => clearInterval(tickT),
  tickLog: () => tickLog,
  scrollTo: (y) => { const s = srcGetter(); if (!s) return; if (s === window) window.scrollTo(0, y); else s.scrollTop = y; },
  scrollMax: () => { const s = srcGetter(); if (!s) return 0; return s === window ? document.documentElement.scrollHeight - innerHeight : s.scrollHeight - s.clientHeight; },
  dropA: () => { if (twinFn) { const s = srcGetter(); binder.release(s, twinFn); twinEl.remove(); twinFn = null; } },
  jank: fault === "jank",
};
if (fault === "deadhooks") for (const k of ["expand", "collapse", "setFace", "setExtra", "setLead"]) window.__scene[k] = () => {};   // deadhooks: the scene hooks do nothing (the film tool's plant)
if (fault === "jank") { let n = 0; const j = () => { if (dock.hasAttribute("data-morphing") && ++n % 4 === 0) { const t = performance.now(); while (performance.now() - t < 45) {} } requestAnimationFrame(j); }; requestAnimationFrame(j); }
const extentRect = () => { const r = plate.getBoundingClientRect(); return { l: r.left, t: r.top, r: r.right, b: r.bottom }; };
window.__dockProbe = {
  root: () => dock,
  plate: () => plate,
  axis: () => V ? "y" : "x",
  extent: () => {
    const e = extentRect();
    if (fault === "deadmorph" && liveExtent != null) return V ? { ...e, b: e.t + liveExtent } : { ...e, r: e.l + liveExtent };
    return e;
  },
  seats: (o = {}) => seatsAll().filter((s) => o.all || s.getAttribute("tabindex") !== "-1" || s.dataset.roving !== undefined),
  paintingSeats: () => seatsAll().map((el) => ({ el, o: hp.visibleOpacity(el), rect: hp.paintedRect(el) })).filter((s) => s.o > 0.05 && s.rect.r - s.rect.l > 0.5 && s.rect.b - s.rect.t > 0.5)
    .map((s) => { if (fault !== "adapterclip") return s; const e = extentRect(); return { ...s, rect: { l: Math.max(s.rect.l, e.l), t: Math.max(s.rect.t, e.t), r: Math.min(s.rect.r, e.r), b: Math.min(s.rect.b, e.b) } }; }),
  morphing: () => dock.hasAttribute("data-morphing"),
  rung: () => ({ ...${JSON.stringify(FIXTURE_RUNG)}, ...(fault === "wrongrung" ? { dampingFraction: 0.7 } : {}), clockMs: CLOCK * 1000 * SLOW }),   // wrongrung: the adapter declares a rung the dock does not ride
  posture: () => pinned ? "pinned" : posture,
  budget: () => budget,
  rim: () => rim.isConnected ? [rim] : null,
  compact: () => scene === "compact",
  badge: () => badge,
  persistent: () => [...run.querySelectorAll("[data-persistent]")],
  ...(fault === "splitcaps" ? { edge: () => caps } : fault === "nocaps" ? { edge: () => [] } : {}),   // nocaps: the caps paint, edge() does not name them
  ...(fault === "hitpair" || fault === "platesq" ? { hit: () => [hitEl] } : {}),   // H4-9: hitpairunnamed has the same page and no hit() read; H5-6 platesq: a square plate under a round hit pair
};
})();
</script></body></html>`;
}
