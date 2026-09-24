// fixtures.mjs: the hand-made minimal dock every witness must PASS on, and the
// planted violations each witness must FAIL on.
//
// It is plain HTML/CSS/JS with no glass-ui code: a stadium plate whose radius is a
// declared half of a declared cross extent; a run that is a scroll container only
// when its seats exceed the budget, and then carries a cross-axis paint gutter; an
// extent that morphs on one time-normalised critically damped spring, including
// content-width changes, with one window that closes on the spring's own clock; a
// posture machine typed by pointer modality, holding open under its own menu; an
// opt-in compact-on-scroll rung with threshold hysteresis and an engagement gate;
// and a progress rim inside the plate, clipped by the plate's own radius.
// It exists to prove each witness CAN pass. It is not a design proposal.
//
// ?scene=  fit | rail | long | morph | vmorph | swap | menu | compact | rim | vrim
// ?fault=  lens | squash                         (W1)
//          scroller | ringclip                    (W2)
//          jump | subpx | late | owners | overhang | content   (W3)
//          nohyst | latch | menucollapse | noprm | tapthrough  (W4)
//          rimout                                 (W5)
export const FAULTS = {
    W1: ["lens", "squash"],
    W2: ["scroller", "ringclip"],
    W3: ["jump", "subpx", "late", "owners", "overhang", "content"],
    W4: ["nohyst", "latch", "menucollapse", "noprm", "tapthrough"],
    W5: ["rimout"],
};

export function fixturePage(q) {
    const scene = q.get("scene") ?? "fit";
    const fault = q.get("fault") ?? "";
    const V = scene === "rail" || scene === "vmorph" || scene === "vrim";
    return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>dock fixture</title>
<style>
:root { --seat: 44px; --pad: 6px; --gap: 8px; --cross: calc(var(--seat) + 2 * var(--pad)); --r: calc(var(--cross) / 2); --gutter: 14px; }
html, body { margin: 0; }
body { min-height: ${scene === "compact" ? 6000 : 3600}px; background: linear-gradient(180deg, #f3efe6, #e8e2d4); font: 600 14px/1 system-ui, sans-serif; color: #222; }
.host { position: fixed; display: flex; }
.host.h { left: 0; right: 0; bottom: 24px; justify-content: center; }
.host.v { left: 16px; top: 0; bottom: 0; align-items: center; }
.host.v.top { top: 16px; bottom: auto; align-items: flex-start; }
.dock { position: relative; }
.ap { position: relative; }
.h .ap { height: var(--cross); overflow-x: clip; overflow-y: visible; }
.v .ap { width: var(--cross); overflow-y: clip; overflow-x: visible; }
.plate { position: absolute; inset: 0; border-radius: ${fault === "lens" ? "50%" : "var(--r)"}; overflow: clip; background: rgba(255,255,255,.62); backdrop-filter: blur(14px) saturate(1.4); -webkit-backdrop-filter: blur(14px) saturate(1.4); box-shadow: 0 6px 24px rgba(0,0,0,.14), inset 0 0 0 1px rgba(0,0,0,.06); }
.rim { position: absolute; left: 0; right: 0; bottom: 0; height: 4px; background: rgba(0,0,0,.14); }
.rim i { display: block; height: 100%; width: 60%; background: linear-gradient(90deg, #e2412f, #3a53e6); }
.ap > .rim { left: 8px; right: 8px; bottom: 2px; }
.run { position: relative; display: flex; gap: var(--gap); padding: var(--pad); width: max-content; box-sizing: border-box; }
.v .run { flex-direction: column; width: auto; height: max-content; }
.h .run.long { width: 100%; }
.v .run.long { height: 100%; }
.run.long { overflow-x: auto; overflow-y: hidden; padding-block: calc(var(--pad) + var(--gutter)); margin-block: calc(-1 * var(--gutter)); scroll-snap-type: x mandatory; }
.v .run.long { overflow-y: auto; overflow-x: hidden; padding-block: var(--pad); margin-block: 0; padding-inline: calc(var(--pad) + var(--gutter)); margin-inline: calc(-1 * var(--gutter)); scroll-snap-type: y mandatory; }
.run.long.nogutter { padding: 0 var(--pad); margin: 0; }
.v .run.long.nogutter { padding: var(--pad) 0; margin: 0; }
.run.scroller { overflow-x: auto; overflow-y: hidden; padding-inline: 0; }
.v .run.scroller { overflow-y: auto; overflow-x: hidden; padding-block: 0; }
.seat { flex: 0 0 auto; height: var(--seat); min-width: var(--seat); border-radius: calc(var(--seat) / 2); border: 0; margin: 0; padding: 0; background: transparent; font: inherit; color: inherit; scroll-snap-align: start; transition: scale .18s ease-out, box-shadow .18s ease-out; }
.seat.tab { padding: 0 14px; }
.sep { flex: 0 0 1px; align-self: stretch; margin: 8px 0; background: rgba(0,0,0,.15); }
.v .sep { margin: 0 8px; }
.seat[aria-pressed="true"], .seat[aria-current] { background: rgba(0,0,0,.08); box-shadow: 0 0 0 2px rgba(0,0,0,.55); }
.seat:focus-visible { outline: 2px solid #0a64ff; outline-offset: 2px; }
${fault === "latch" ? "" : "@media (hover: hover) {"}
  .seat:hover { scale: 1.1; box-shadow: 0 2px 8px rgba(0,0,0,.35); }
  .seat[aria-pressed="true"]:hover, .seat[aria-current]:hover { box-shadow: 0 0 0 2px rgba(0,0,0,.55), 0 2px 8px rgba(0,0,0,.35); }
${fault === "latch" ? "" : "}"}
.face { display: contents; }
.face[hidden] { display: none; }
.menu { position: fixed; left: 50%; bottom: 100px; translate: -50% 0; width: 220px; padding: 12px; background: #fff; border-radius: 14px; box-shadow: 0 8px 30px rgba(0,0,0,.2); }
.menu[hidden] { display: none; }
</style></head><body>
<div class="host ${V ? "v" : "h"}${scene === "rail" ? " top" : ""}" id="host"></div>
<div class="menu" id="menu" data-testid="menu-content" hidden>Options</div>
<script>
(() => {
const q = new URLSearchParams(location.search);
const scene = ${JSON.stringify(scene)}, fault = ${JSON.stringify(fault)}, V = ${V};
const PRM = matchMedia("(prefers-reduced-motion: reduce)");
const FINE = matchMedia("(hover: hover)");
const DELAY = fault === "menucollapse" ? 1500 : 600;   // collapse dwell (fixture's own)
const RESP = 0.3, ZETA = fault === "subpx" ? 0.88 : 1.0, BAND = 0.02;
const W0 = 2 * Math.PI / RESP;
const x = (t) => ZETA < 1
  ? 1 - Math.exp(-ZETA * W0 * t) * (Math.cos(W0 * Math.sqrt(1 - ZETA * ZETA) * t) + ZETA / Math.sqrt(1 - ZETA * ZETA) * Math.sin(W0 * Math.sqrt(1 - ZETA * ZETA) * t))
  : 1 - (1 + W0 * t) * Math.exp(-W0 * t);
let CLOCK = 0; for (let t = 0; t < 3; t += 1e-4) if (Math.abs(x(t) - 1) > BAND) CLOCK = t;   // seconds

// ── build ──
const host = document.getElementById("host");
const seat = (label, o = {}) => { const b = document.createElement("button"); b.className = "seat" + (o.tab ? " tab" : ""); b.textContent = label; if (o.aria) b.setAttribute("aria-label", o.aria); if (o.id) b.dataset.testid = o.id; if (o.pressed) b.setAttribute("aria-pressed", "true"); if (o.current) b.setAttribute("aria-current", "page"); return b; };
const sep = () => { const s = document.createElement("span"); s.className = "sep"; return s; };
const dock = document.createElement("div"); dock.className = "dock"; dock.dataset.testid = "dock";
const ap = document.createElement("div"); ap.className = "ap";
const plate = document.createElement("div"); plate.className = "plate";
const rim = document.createElement("div"); rim.className = "rim"; rim.innerHTML = "<i></i>";
const run = document.createElement("div"); run.className = "run"; run.setAttribute("role", "toolbar");
ap.append(plate, run); dock.append(ap); host.append(dock);
const routed = q.get("routed") === "1";
let budget = V ? innerHeight - 32 : innerWidth - 32;
let collapsible = false;
if (scene === "fit" || scene === "compact") {
  const sel = (i) => routed ? { current: i === 0 } : { pressed: i === 0 };
  const tabs = ["Photos", "Lots", "Map"].map((t, i) => seat(t, { tab: true, id: "t" + (i + 1), ...sel(i) }));
  tabs.forEach((b) => b.addEventListener("click", () => { tabs.forEach((o) => { o.removeAttribute("aria-pressed"); o.removeAttribute("aria-current"); }); b.setAttribute(routed ? "aria-current" : "aria-pressed", routed ? "page" : "true"); }));
  run.append(...tabs, sep(), seat("Filters", { tab: true, id: "t4" }), sep(), seat("T", { aria: "Theme", id: "i1" }));
  if (scene === "compact") (fault === "rimout" ? ap : plate).append(rim);
} else if (scene === "rail" || scene === "long") {
  const n = Number(q.get("n") ?? (scene === "rail" ? 11 : 14));
  budget = scene === "rail" ? parseFloat(q.get("h") ?? "560") : 360;
  for (let i = 1; i <= n; i++) run.append(seat(String(i), { aria: "Seat " + i, id: "s" + i, [scene === "rail" ? "current" : "pressed"]: i === 3 }));
} else if (scene === "morph" || scene === "vmorph" || scene === "menu" || scene === "rim" || scene === "vrim") {
  collapsible = scene === "morph" || scene === "vmorph" || scene === "menu" || q.get("collapse") === "closed";
  run.append(seat("H", { aria: "Home", id: "home" }), seat("1", { aria: "One", id: "f1" }), seat("2", { aria: "Two" }));
  if (scene === "morph") run.append(seat("3", { aria: "Three" }), sep(), seat("Play", { tab: true, id: "play" }), seat("Settings", { tab: true }));
  if (scene === "vmorph") run.append(seat("3", { aria: "Three" }), seat("4", { aria: "Four" }));
  if (scene === "menu") run.append(seat("More", { tab: true, id: "menu" }));
  if (scene === "rim" || scene === "vrim") (fault === "rimout" ? ap : plate).append(rim);
} else if (scene === "swap") {
  const a = document.createElement("div"); a.className = "face";
  const b = document.createElement("div"); b.className = "face";
  a.append(seat("A", { aria: "A" }), seat("B", { aria: "B" }));
  b.append(seat("C", { aria: "C" }), seat("Tools", { tab: true }), seat("Brushes", { tab: true }), seat("Layers", { tab: true }), seat("D", { aria: "D" }));
  b.hidden = true; run.append(a, b);
  window.__faces = { short: a, long: b };
}
let extraSeat = null;

// ── extent: one spring, one window ──
let longNatural = 0;
const natural = () => run.classList.contains("long") ? longNatural : (V ? run.offsetHeight : run.offsetWidth);
const genuine = () => natural() > budget + 0.5;
let posture = collapsible ? "collapsed" : "expanded";
const target = () => (posture === "collapsed" || posture === "compact") ? parseFloat(getComputedStyle(ap).getPropertyValue(V ? "width" : "height")) : Math.min(natural(), budget);
let cur = 0, anim = null, firstExpandDone = false;
const set = (e) => {
  cur = e;
  if (fault === "squash") { const full = Math.min(natural(), budget); ap.style[V ? "height" : "width"] = full + "px"; ap.style.scale = V ? "1 " + (e / full) : (e / full) + " 1"; ap.style.transformOrigin = "0 0"; }
  else ap.style[V ? "height" : "width"] = e + "px";
};
const inertFaces = () => { const coll = posture === "collapsed" || posture === "compact"; [...run.querySelectorAll(".seat")].forEach((s, i) => { if (coll && i > 0) s.setAttribute("tabindex", "-1"); else s.removeAttribute("tabindex"); }); };
function morph(to) {
  if (anim) cancelAnimationFrame(anim.raf);
  const from = cur; const D = to - from;
  if (Math.abs(D) < 0.01) { set(to); return; }
  if (PRM.matches && fault !== "noprm") { set(to); dock.removeAttribute("data-morphing"); return; }
  dock.setAttribute("data-morphing", "");
  const isFirst = !firstExpandDone && to > from; if (to > from) firstExpandDone = true;
  if (fault === "owners") for (const s of run.querySelectorAll(".seat")) { s.animate({ opacity: [1, 0.85, 1] }, 260); s.animate({ opacity: [1, 0.9, 1] }, 260); }
  const T = CLOCK * 1000, xT = x(CLOCK);
  let t0 = null, v = 0, pos = from;
  const a = { raf: 0 };
  const step = (ts) => {
    if (t0 === null) t0 = ts;
    const tau = (ts - t0) / 1000;
    if (fault === "subpx") {   // integrate the true underdamped spring to rest
      const e = x(tau); const done = tau > 0.45 && Math.abs(e - 1) * Math.abs(D) < 0.01;
      set(done ? to : from + D * e);
      if (done) { anim = null; dock.removeAttribute("data-morphing"); return; }
    } else if (fault === "jump" && isFirst) {
      if (tau * 1000 >= T) { set(to); anim = null; dock.removeAttribute("data-morphing"); return; }
      set(from);
    } else {
      if (tau * 1000 >= T) {
        set(to); anim = null;
        if (fault === "late") setTimeout(() => { if (!anim) dock.removeAttribute("data-morphing"); }, 250);
        else dock.removeAttribute("data-morphing");
        return;
      }
      set(from + D * x(tau) / xT);
    }
    a.raf = requestAnimationFrame(step);
  };
  a.raf = requestAnimationFrame(step); anim = a;
}
function go(p) { if (p === posture) return; posture = p; inertFaces(); morph(target()); }

// ── the run: a scroll container only when seats genuinely exceed the budget ──
function fitRun() {
  const len = V ? run.offsetHeight : run.offsetWidth;
  if (len > budget + 0.5) { longNatural = len; run.classList.add("long"); }
  if (fault === "ringclip") run.classList.add("nogutter");
  if (fault === "scroller") run.classList.add("scroller");
}
fitRun();
set(target()); inertFaces();
if (fault === "overhang") { ap.style.overflow = "visible"; }
new ResizeObserver(() => {
  if (posture === "collapsed" || posture === "compact") return;
  const t = target();
  if (Math.abs(t - cur) > 0.25 && !anim) { if (fault === "content") set(t); else morph(t); }
}).observe(run);

// ── posture: typed by modality ──
let timer = 0, held = false, engaged = false, pinned = false, swallow = false;
const schedule = () => { clearTimeout(timer); timer = setTimeout(() => {
  const keep = fault === "menucollapse" ? engaged : (held || pinned || dock.matches(":focus-within") || engaged);
  if (!keep) go("collapsed");
}, DELAY); };
let releasedAt = -1e9;
const release = () => { releasedAt = performance.now(); if (collapsible) schedule(); else setTimeout(evalCompact, 160); };
dock.addEventListener("pointerenter", (e) => { if (e.pointerType !== "mouse" || !FINE.matches) return; engaged = true; clearTimeout(timer); if (collapsible) go("expanded"); else evalCompact(); });
dock.addEventListener("pointerleave", (e) => { if (e.pointerType !== "mouse") return; engaged = false; release(); });
dock.addEventListener("focusin", () => { clearTimeout(timer); if (collapsible && posture === "collapsed") go("expanded"); evalCompact(); });
dock.addEventListener("focusout", (e) => { if (!dock.contains(e.relatedTarget)) release(); });
dock.addEventListener("pointerdown", (e) => {
  if (e.pointerType === "mouse") return;
  if (collapsible && posture === "collapsed") { if (fault !== "menucollapse") pinned = true; if (fault !== "tapthrough") swallow = true; go("expanded"); if (fault === "menucollapse") schedule(); }
}, true);
dock.addEventListener("click", (e) => { if (swallow) { swallow = false; e.stopPropagation(); e.preventDefault(); } }, true);
document.addEventListener("pointerdown", (e) => { if (dock.contains(e.target) || menu.contains(e.target)) return; if (!menu.hidden) { menu.hidden = true; held = false; } if (pinned) { pinned = false; schedule(); } });
const menu = document.getElementById("menu");
run.querySelector('[data-testid="menu"]')?.addEventListener("click", () => { menu.hidden = !menu.hidden; held = !menu.hidden; if (!held || fault === "menucollapse") schedule(); });

// ── compact-on-scroll: threshold with hysteresis, gated by engagement ──
const ENTER = fault === "nohyst" ? 200 : 240, EXIT = fault === "nohyst" ? 200 : 160;
let latched = false, gateT = 0;
function evalCompact() {
  if (scene !== "compact") return;
  const y = scrollY;
  if (!latched && y > ENTER) latched = true;
  else if (latched && y < EXIT) latched = false;
  const gate = engaged || dock.matches(":focus-within");
  clearTimeout(gateT);
  if (gate || !latched) { go("expanded"); return; }
  const wait = 150 - (performance.now() - releasedAt);   // the gate releases 150 ms after disengagement
  if (wait > 0) gateT = setTimeout(evalCompact, wait); else go("compact");
}
if (scene === "compact") addEventListener("scroll", evalCompact, { passive: true });

// ── the probe contract ──
const hp = window.__hp;
window.__scene = {
  name: scene, presets: [],
  setFace: (f) => { const F = window.__faces; if (!F) return; F.short.hidden = f !== "short"; F.long.hidden = f !== "long"; },
  setExtra: (v) => { if (v && !extraSeat) { extraSeat = seat(V ? "5" : "Brushes and layers", { tab: !V, aria: V ? "Five" : undefined, id: "extra" }); run.append(extraSeat); } else if (!v && extraSeat) { extraSeat.remove(); extraSeat = null; } },
};
window.__dockProbe = {
  root: () => dock,
  plate: () => plate,
  axis: () => V ? "y" : "x",
  extent: () => { const r = plate.getBoundingClientRect(); return { l: r.left, t: r.top, r: r.right, b: r.bottom }; },
  seats: (o = {}) => [...run.querySelectorAll(".seat")].filter((s) => o.all || s.getAttribute("tabindex") !== "-1"),
  paintingSeats: () => [...run.querySelectorAll(".seat")].map((el) => ({ el, o: hp.visibleOpacity(el), rect: hp.paintedRect(el) })).filter((s) => s.o > 0.05 && s.rect.r - s.rect.l > 0.5 && s.rect.b - s.rect.t > 0.5),
  morphing: () => dock.hasAttribute("data-morphing"),
  rung: () => ({ name: "fixture", response: RESP, dampingFraction: ZETA, settleBand: BAND, clockMs: CLOCK * 1000 }),
  posture: () => pinned ? "pinned" : posture,
  budget: () => budget,
  rim: () => (scene === "rim" || scene === "vrim" || scene === "compact") ? [rim] : null,
  compact: () => scene === "compact",
};
})();
</script></body></html>`;
}
