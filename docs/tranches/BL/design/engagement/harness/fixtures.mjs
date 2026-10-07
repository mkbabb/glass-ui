// fixtures.mjs · the minimal fixture: one hand-made page (no library, no build) that honours the scene DOM
// contract (HARNESS.md §1.3) and satisfies every witness, plus the planted violations. It proves each witness can
// PASS and can FAIL; it says nothing about the library.
//
//   --fixture               the compliant page: a declared register (four directories, three classes, a rung per
//                           class and a reason for the static one); a press rung on every control (scale plus a
//                           light answer, PRM keeps the light and drops the scale); a commit that pops from the
//                           MODEL (keyboard, pointer, tap and programmatic alike, none on Tab entry, none on a
//                           mount already committed); a selection body that springs with an overshoot; a control
//                           that rests scaled and pops around its settle; a slider that grows while held or
//                           keyboard-focused, inside the phone gutter, and carries its release velocity into the
//                           settle; a modal whose scrim keys on its open state while `data-engaged` means held;
//                           a breathing idle rung on the S6 subject (scale 1 → 1.012, 4 s, compositor-only,
//                           retired under PRM); every duration a token, every token equal to its table row
//   --fixture --fault <id>  the same page with one planted violation (FAULTS below)
//
// E-7's static arm reads a source tree, so its fixture is two trees under fixtures/e7/ (clean, two-writers).

/**
 * Each fault names the witnesses it plants against and the cell that must be among the failing lines (`cell`, a
 * regex over the printed line). A fault with `expect: "pass"` is a control: the witness must still PASS.
 */
export const FAULTS = {
  "e1-undeclared": { why: "a component directory (delta) has no class row", witnesses: ["E-1"], cell: /denominator/ },
  "e1-norung": { why: "the static class names no rung and gives no reason", witnesses: ["E-1"], cell: /carries a rung/ },
  "e1-dead": { why: "the pressed class's exemplar (alpha → pop) answers a press with nothing: the declaration holds on paper only", witnesses: ["E-1"], cell: /runtime pressed/ },
  "e1-stale": { why: "CONTROL, must PASS: the declaration lists the directories in another order and carries a comment field; order and extra fields are not the census", witnesses: ["E-1"], expect: "pass" },
  "e2-fade": { why: "the commit is a 120 ms linear fade; the selection body jumps: no pop, no travel", witnesses: ["E-2"], cell: /pop commit·keyboard/ },
  "e2-tabpop": { why: "the pop also fires when Tab enters the control", witnesses: ["E-2"], cell: /Tab-entry/ },
  "e2-prog": { why: "the pop fires from pointer and key handlers only: a programmatic model change commits with none", witnesses: ["E-2"], cell: /commit·programmatic/ },
  "e2-glide": { why: "the selection body glides on a linear path and lands without overshoot (travel with no weight)", witnesses: ["E-2"], cell: /travel commit/ },
  "e2-mountpop": { why: "a control that mounts already committed pops on mount (H-8)", witnesses: ["E-2"], cell: /mount/ },
  "e2-nocoarse": { why: "the pop is keyed on mouse events: a touch tap commits with none", witnesses: ["E-2"], cell: /commit·tap/ },
  "e3-still": { why: "the slider never grows", witnesses: ["E-3"], cell: /pointer-held/ },
  "e3-kbd": { why: "the slider grows under the pointer only; keyboard focus leaves it at rest", witnesses: ["E-3"], cell: /keyboard-focused/ },
  "e3-gutter": { why: "the phone slider is full width and grows ×1.06 in place, past the 16 px gutter", witnesses: ["E-3"], cell: /gutter/ },
  "e4-drop": { why: "the release drops the drag velocity: the thumb stops where the pointer let go", witnesses: ["E-4"], cell: /slider fling/ },
  "e5-hover": { why: "a held touch answers only through the hover background, leaked by sticky touch hover (the accordion trigger at HEAD)", witnesses: ["E-5"], cell: /pop press/ },
  "e6-absent": { why: "no idle rung", witnesses: ["E-6"], cell: /present/ },
  "e6-dim": { why: "the round-0 plant: the host's opacity breathes to .9 over 4 s, dimming the control's own ink (H-5)", witnesses: ["E-6"], cell: /channel/ },
  "e6-layout": { why: "the idle rung animates width (a layout channel)", witnesses: ["E-6"], cell: /channel/ },
  "e6-prm": { why: "the breathing keeps its scale under reduced motion", witnesses: ["E-6"], cell: /PRM/ },
  "e6-fast": { why: "the breathing runs a 600 ms period (a flicker, not a breath)", witnesses: ["E-6"], cell: /period/ },
  "e7-veil": { why: "the modal's scrim carries a bare data-engaged (presence) beside the held meaning", witnesses: ["E-7"], cell: /modal/ },
  "e7-two": { why: "two source files write data-engaged, one outside the register's owner", witnesses: ["E-7"], cell: /writers/ },
  "e8-drift": { why: "the emitted --engage-press-drain-attack is 56ms against its row's 55", witnesses: ["E-8"], cell: /mirror/ },
  "e8-units": { why: "CONTROL, must PASS: a token spelled .18s (a minifier's respelling of 180ms, as the HEAD build does) equals its 180 ms row", witnesses: ["E-8"], expect: "pass" },
  "e4-hold": { why: "the release holds in place (750 ms after a fling, 600 ms after a still release), then springs to the SAME nearest detent: the velocity picks nothing (the SegmentedTabs indicator at HEAD, which a 700 ms window read mid-flight and credited)", witnesses: ["E-4"], cell: /slider fling/ },
  "e4-snap": { why: "CONTROL, must PASS: the release snaps to a detent and the release velocity picks the detent (a fling lands one detent further than a still release, the Sheet's projection and the tabs drag at HEAD)", witnesses: ["E-4"], expect: "pass" },
  "e8-literal": { why: "the control's press transition spells 230ms, a literal no token carries", witnesses: ["E-8"], cell: /literal pop/ },
  "e9-scale": { why: "under reduced motion the press still squishes", witnesses: ["E-9"], cell: /press-spatial/ },
  "e9-dark": { why: "under reduced motion the press retires its scale and keeps no light answer (its press paints the hover value): E-9's press, E-1's exemplar under reduce and E-5's held touch under reduce all read it (H-9)", witnesses: ["E-9", "E-1", "E-5"], cell: /press-light/ },
  "e3-prmgrow": { why: "under reduced motion the slider still grows, on its spring (H-9)", witnesses: ["E-3"], cell: /PRM/ },
  "e4-prmbounce": { why: "under reduced motion the slider's release keeps its velocity spring and overshoots its rest (H-9)", witnesses: ["E-4"], cell: /slider release PRM/ },
  "e4-vdrop": { why: "the vertical detent sheet resolves its release by position alone: a fling lands on the detent a still release lands on (H-7)", witnesses: ["E-4"], cell: /vsheet fling/ },
  "e4-stripstop": { why: "the scroll-snap strip kills the platform fling at touchend and snaps to the nearest member (H-7)", witnesses: ["E-4"], cell: /strip fling/, engines: ["chromium"] },
  "e6-spin": { why: "the idle rung is a spinner: rotate 360° every 4 s, linear (a loop, not a breath; H-5)", witnesses: ["E-6"], cell: /channel/ },
  "e6-saw": { why: "the idle rung ramps scale 1 → 1.012 linearly and jumps back at the seam (a sawtooth on a legal channel, amplitude and period; H-5)", witnesses: ["E-6"], cell: /shape/ },
  "e7-prm": { why: "under reduced motion the held slider writes no data-engaged: held is gated on motion (H-9)", witnesses: ["E-7"], cell: /held PRM/ },
  "e8-prmliteral": { why: "the reduce arm's press transition spells 100ms, a literal no token carries (H-9)", witnesses: ["E-8"], cell: /literal pop PRM/ },
  "e9-glide": { why: "under reduced motion the selection body still glides", witnesses: ["E-9"], cell: /commit-spatial/ },
};

const CONTROL_GATES = ["E-2", "E-8", "E-9"];
export const FIXTURE_INDEX = {
  pop: { gates: [...CONTROL_GATES, "E-5"], key: "Space", target: ".ctl" },
  travel: { gates: CONTROL_GATES, key: "ArrowRight", target: '.seg[data-v="b"]' },
  rest: { gates: CONTROL_GATES, key: "Space", target: ".ctl" },
  slider: { gates: ["E-3", "E-4", "E-7", "E-9"], key: "ArrowRight" },
  vsheet: { gates: ["E-4"], axis: "y", dir: -1 },
  strip: { gates: ["E-4"], input: "touch", dir: -1 },
  modal: { gates: ["E-7"] },
  s6: { gates: ["E-6"], subject: "the fixture's switch track" },
  passive: { gates: [] },
};

export function fixturePage(params, fault = "") {
  const scene = params.get("scene") ?? "__index";
  const dark = params.get("theme") === "dark";
  const on = params.get("on") === "1";
  const defer = params.get("defer") === "1";
  const phone = params.get("phone") === "1";
  const F = (id) => fault === id;
  const nopress = F("e1-dead") || F("e5-hover");

  const members = { alpha: "pressed", beta: "held", gamma: "static", delta: "static" };
  if (F("e1-undeclared")) delete members.delta;
  const classes = { pressed: { rung: "press", exemplar: "alpha" }, held: { rung: "engaged", exemplar: "beta" }, static: { rung: null, reason: F("e1-norung") ? "" : "no input of its own: its engagement is the host surface's" } };
  const decl = F("e1-stale") ? { note: "order differs", members: { delta: "static", gamma: "static", beta: "held", alpha: "pressed" }, classes } : { members, classes };
  const E = {
    kind: "fixture", scene, index: FIXTURE_INDEX, dirs: ["alpha", "beta", "delta", "gamma"], decl,
    sceneOfDir: { alpha: "pop", beta: "slider" }, rungs: ["rest", "hover", "press", "engaged", "modal"],
    envelopes: [{ role: "press-drain", attackMs: 55, releaseMs: 120 }, { role: "control-engage", attackMs: 60, releaseMs: 180 }],
  };

  const SPRING = "linear(0, 0.57 18%, 0.94 32%, 1.06 45%, 1.03 60%, 0.99 75%, 1)";
  const css = `
:root { --spring-press-duration: 350ms; --spring-press: ${SPRING};
  --engage-press-drain-attack: ${F("e8-drift") ? 56 : 55}ms; --engage-press-drain-release: 120ms;
  --engage-control-engage-attack: 60ms; --engage-control-engage-release: ${F("e8-units") ? ".18s" : "180ms"};
  --bg: #f4f4f6; --ink: #111; --ctl: #d8dbe2; --ctl-hover: #cfd3dc; --ctl-press: #b9bfcc; --accent: #3b6cf0; }
.dark { --bg: #15161a; --ink: #eee; --ctl: #33363f; --ctl-hover: #3b3f49; --ctl-press: #4b505c; }
body { margin: 0; background: var(--bg); color: var(--ink); font: 15px system-ui; }
main { min-height: 100vh; padding: ${phone ? "48px 16px" : "48px"}; box-sizing: border-box; }
.ctl, .seg { display: inline-flex; align-items: center; justify-content: center; height: 40px; padding: 0 18px; border-radius: 20px;
  background-color: var(--ctl); user-select: none; cursor: pointer;
  transition: scale ${F("e8-literal") ? "230ms" : "var(--spring-press-duration)"} var(--spring-press), background-color var(--engage-press-drain-attack) linear; }
.ctl:hover, .seg:hover { background-color: var(--ctl-hover); }
${nopress ? "" : `.ctl:active, .seg:active { scale: 0.96; background-color: var(--ctl-press); }`}
.ctl[data-state="on"] { color: #fff; background-color: var(--accent); }
.rest .ctl[data-state="on"] { scale: 1.05; }
@media (prefers-reduced-motion: reduce) {
  ${F("e9-scale") ? "" : `.ctl:active, .seg:active, .rest .ctl[data-state="on"]:active { scale: 1; } .ctl, .seg { transition: background-color var(--engage-press-drain-attack) linear; }`}
  ${F("e9-dark") ? `.ctl:active, .seg:active { background-color: var(--ctl-hover); }` : ""}
  ${F("e8-prmliteral") ? `.ctl, .seg { transition: background-color 100ms linear; }` : ""}
}
.segs { position: relative; display: inline-flex; gap: 0; padding: 4px; border-radius: 24px; background: var(--ctl); }
.seg { background-color: transparent; position: relative; z-index: 1; width: 78px; padding: 0; }
.ind { position: absolute; left: 4px; top: 4px; width: 78px; height: 40px; border-radius: 20px; background: #fff8; z-index: 0; }
.fx-slider { position: relative; height: 20px; width: ${phone ? (F("e3-gutter") ? "100%" : "300px") : "360px"}; ${phone ? "margin: 0 auto;" : ""} border-radius: 10px; background: var(--ctl);
  transition: scale var(--spring-press-duration) var(--spring-press); }
.fx-slider${F("e3-still") ? ".never" : F("e3-kbd") ? ":where(:active, [data-held])" : ":where(:active, [data-held], :has(:focus-visible))"} { scale: 1.06; }
.fx-thumb { position: absolute; top: -4px; left: 0; width: 28px; height: 28px; margin-left: -14px; border-radius: 14px; background: #fff; box-shadow: 0 1px 3px #0005; touch-action: none; }
.fx-thumb:active { box-shadow: 0 0 0 6px #3b6cf055; }
${F("e3-prmgrow") ? "" : "@media (prefers-reduced-motion: reduce) { .fx-slider:where(:active, [data-held], :has(:focus-visible)) { scale: 1; } .fx-slider { transition: none; } }"}
.fx-veil { position: fixed; inset: 0; pointer-events: none; background: #0001; }
.fx-scrim { position: fixed; inset: 0; background: #0006; }
.fx-dialog { position: fixed; left: 50%; top: 50%; translate: -50% -50%; width: 280px; padding: 24px; border-radius: 20px; background: var(--bg); }
.fx-switch { display: inline-block; width: 52px; height: 32px; border-radius: 16px; background: var(--ctl); position: relative; }
.fx-switch::after { content: ""; position: absolute; left: 3px; top: 3px; width: 26px; height: 26px; border-radius: 13px; background: #fff; }
@keyframes fx-breathe { 50% { scale: 1.012; } }
@keyframes fx-dim { 50% { opacity: 0.9; } }
@keyframes fx-wide { 50% { width: 54px; } }
@keyframes fx-spin { to { rotate: 360deg; } }
@keyframes fx-saw { from { scale: 1; } to { scale: 1.012; } }
.fx-vroot { position: fixed; inset: 0; pointer-events: none; }
.fx-sheet { position: fixed; bottom: 0; left: 50%; width: 300px; margin-left: -150px; border-radius: 20px 20px 0 0; background: var(--ctl); }
.fx-grip { width: 120px; height: 28px; margin: 0 auto; border-radius: 14px; background: #fff8; touch-action: none; }
.fx-strip { width: 600px; height: 160px; display: flex; overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none; }
.fx-cell { flex: 0 0 100%; height: 160px; scroll-snap-align: start; scroll-snap-stop: always; background: var(--ctl); }
.fx-cell + .fx-cell { background: var(--ctl-press); }
.fx-switch { animation: ${F("e6-absent") ? "none" : F("e6-dim") ? "fx-dim 4s ease-in-out infinite" : F("e6-layout") ? "fx-wide 4s ease-in-out infinite" : F("e6-fast") ? "fx-breathe 600ms ease-in-out infinite" : F("e6-spin") ? "fx-spin 4s linear infinite" : F("e6-saw") ? "fx-saw 4s linear infinite" : "fx-breathe 4s ease-in-out infinite"}; }
${F("e6-prm") ? "" : "@media (prefers-reduced-motion: reduce) { .fx-switch { animation: none; } }"}
`;

  let body = "";
  if (scene === "pop" || scene === "rest") body = `<div class="${scene}"><div class="ctl" role="switch" tabindex="0" aria-checked="${on}" data-state="${on ? "on" : "off"}" data-e="target">Probe</div></div>`;
  else if (scene === "travel") body = `<div class="segs" role="radiogroup" aria-label="Probe"><span class="ind" data-e="body"></span>${["a", "b", "c"].map((v) => `<div class="seg" role="radio" data-v="${v}" aria-checked="${v === (on ? "b" : "a")}" tabindex="${v === (on ? "b" : "a") ? 0 : -1}"${v === "b" ? ' data-e="target"' : ""}>${v.toUpperCase()}</div>`).join("")}</div>`;
  else if (scene === "slider") body = `<div class="fx-slider" data-e="root target"><div class="fx-thumb" role="slider" tabindex="0" aria-label="Probe" aria-valuenow="40" data-e="thumb body"></div></div>`;
  else if (scene === "modal") body = `<div class="fx-scrim" data-state="open" data-e="veil"${F("e7-veil") ? " data-engaged" : ""}></div><div class="fx-dialog" role="dialog" aria-label="Probe" data-e="modal">Body</div>`;
  else if (scene === "s6") body = `<span class="fx-switch" role="switch" aria-checked="false" aria-label="Probe" data-e="target"></span>`;
  else if (scene === "passive") body = `<hr data-e="target">`;
  else if (scene === "vsheet") body = `<div class="fx-vroot" data-e="root"></div><div class="fx-sheet"><div class="fx-grip" role="slider" aria-label="Probe" aria-valuenow="25" tabindex="0" data-e="thumb"></div></div>`;
  else if (scene === "strip") body = `<div class="fx-strip" data-e="root">${[0, 1, 2, 3].map((i) => `<div class="fx-cell"${i ? "" : ' data-e="thumb"'}></div>`).join("")}</div>`;

  const script = `
const FAULT = ${JSON.stringify(fault)}; const SCENE = ${JSON.stringify(scene)}; const DEFER = ${defer}; const ON = ${on};
const E = ${JSON.stringify(E)};
const prm = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const tok = (n) => parseFloat(getComputedStyle(document.documentElement).getPropertyValue(n));
const SPRING = ${JSON.stringify(SPRING)};
function pop(el) {
  if (!el || prm()) return;
  if (FAULT === "e2-fade") { el.animate([{ opacity: 0.6 }, { opacity: 1 }], { duration: 120, easing: "linear" }); return; }
  el.animate([{ transform: "scale(1)" }, { transform: "scale(1.08)", offset: 0.35 }, { transform: "scale(0.98)", offset: 0.6 }, { transform: "scale(1.005)", offset: 0.8 }, { transform: "scale(1)" }], { duration: tok("--spring-press-duration") });
}
function mountScene() {
  const stage = document.getElementById("stage"); stage.innerHTML = ${JSON.stringify(body)};
  if (SCENE === "pop" || SCENE === "rest") {
    const el = stage.querySelector(".ctl");
    const set = (v, how) => { el.dataset.state = v ? "on" : "off"; el.setAttribute("aria-checked", String(v));
      if (FAULT === "e2-prog" && how === "model") return; pop(el); };
    E.commit = () => set(el.dataset.state !== "on", "model");
    let lastTouch = -1e9; el.addEventListener("touchstart", () => { lastTouch = performance.now(); }, { passive: true });
    el.addEventListener("click", (e) => { if (FAULT === "e2-nocoarse" && (e.pointerType === "touch" || performance.now() - lastTouch < 1000)) { el.dataset.state = el.dataset.state === "on" ? "off" : "on"; return; } set(el.dataset.state !== "on", "event"); });
    el.addEventListener("keydown", (e) => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); set(el.dataset.state !== "on", "event"); } });
    if (FAULT === "e2-tabpop") el.addEventListener("focus", () => pop(el));
    if (FAULT === "e2-mountpop" && ON) requestAnimationFrame(() => pop(el));
  }
  if (SCENE === "travel") {
    const segs = [...stage.querySelectorAll(".seg")]; const ind = stage.querySelector(".ind");
    const xOf = (s) => s.offsetLeft - 4;
    ind.style.translate = xOf(segs.find((s) => s.getAttribute("aria-checked") === "true")) + "px 0";
    const select = (s, how) => {
      const from = parseFloat(ind.style.translate) || 0; const to = xOf(s);
      segs.forEach((x) => { const c = x === s; x.setAttribute("aria-checked", String(c)); x.tabIndex = c ? 0 : -1; });
      ind.style.translate = to + "px 0";
      if (from === to || prm() && FAULT !== "e9-glide") return;
      if (FAULT === "e2-fade") { s.animate([{ opacity: 0.6 }, { opacity: 1 }], { duration: 120, easing: "linear" }); return; }
      const lin = FAULT === "e2-glide" || (FAULT === "e2-prog" && how === "model");
      ind.animate([{ translate: from + "px 0" }, { translate: to + "px 0" }], { duration: tok("--spring-press-duration"), easing: lin ? "linear" : SPRING });
    };
    E.commit = () => select(segs[1], "model");
    segs.forEach((s, i) => { s.addEventListener("click", () => { select(s, "event"); s.focus(); });
      s.addEventListener("keydown", (e) => { const d = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0; if (!d) return; e.preventDefault(); const n = segs[(i + d + 3) % 3]; select(n, "event"); n.focus(); }); });
  }
  if (SCENE === "slider") {
    const root = stage.querySelector(".fx-slider"), th = stage.querySelector(".fx-thumb");
    const W = () => root.offsetWidth; let x = 0.4 * W(); const put = () => { th.style.left = x + "px"; th.setAttribute("aria-valuenow", String(Math.round(100 * x / W()))); }; put();
    let veil = null, drag = null, raf = 0;
    th.addEventListener("pointerdown", (e) => { cancelAnimationFrame(raf); th.setPointerCapture(e.pointerId); root.dataset.held = "";
      veil = document.createElement("span"); veil.className = "fx-veil"; if (!(FAULT === "e7-prm" && prm())) veil.setAttribute("data-engaged", ""); document.body.appendChild(veil);
      drag = { x0: x, cx: e.clientX, hist: [{ t: performance.now(), x }] }; });
    th.addEventListener("pointermove", (e) => { if (!drag) return; x = Math.max(0, Math.min(W(), drag.x0 + e.clientX - drag.cx)); put(); drag.hist.push({ t: performance.now(), x }); if (drag.hist.length > 6) drag.hist.shift(); });
    const release = () => { if (!drag) return; delete root.dataset.held; veil?.remove(); veil = null;
      const now = performance.now(), h = drag.hist.filter((p) => now - p.t < 80); drag = null;
      let v = h.length > 1 ? (h.at(-1).x - h[0].x) / Math.max(1, h.at(-1).t - h[0].t) * 1000 : 0; // px/s
      if (FAULT === "e4-drop" || (prm() && FAULT !== "e4-prmbounce")) v = 0;
      if (FAULT === "e4-hold") { const D3 = W() / 3, tgt = Math.round(x / D3) * D3; const k = 322, c = 2 * 0.75 * Math.sqrt(k); let vv = 0, t1;
        const go = (t) => { const dt = Math.min(0.032, (t - (t1 ?? t)) / 1000); t1 = t; vv += (-k * (x - tgt) - c * vv) * dt; x += vv * dt; put();
          if (Math.abs(vv) > 1 || Math.abs(x - tgt) > 0.2) raf = requestAnimationFrame(go); else { x = tgt; put(); } };
        setTimeout(() => { raf = requestAnimationFrame(go); }, v ? 750 : 600); return; }
      const D = W() / 4; // e4-snap: four detents; the projected point picks one
      if (!v && FAULT !== "e4-snap") return;
      const target = FAULT === "e4-snap" ? Math.round(Math.max(0, Math.min(W(), x + v * 0.15)) / D) * D : Math.max(0, Math.min(W(), x + v * 0.15));
      if (prm() && FAULT !== "e4-prmbounce") { x = target; put(); return; } // reduce: the release lands, it does not bounce
      const k = 322, c = 2 * 0.75 * Math.sqrt(k); let t0 = performance.now();
      const step = (t) => { const dt = Math.min(0.032, (t - t0) / 1000); t0 = t; v += (-k * (x - target) - c * v) * dt; x += v * dt; put();
        if (Math.abs(v) > 1 || Math.abs(x - target) > 0.2) raf = requestAnimationFrame(step); else { x = target; put(); } };
      raf = requestAnimationFrame(step); };
    th.addEventListener("pointerup", release); th.addEventListener("pointercancel", release);
    th.addEventListener("keydown", (e) => { if (e.key === "ArrowRight") { x = Math.min(W(), x + W() / 100); put(); } });
    E.commit = () => { x = 0.7 * W(); put(); };
  }
  if (SCENE === "vsheet") {
    // a bottom sheet sized by its rung; the grip drags it; the release projects 0.15 s of velocity and picks a detent
    const sheet = stage.querySelector(".fx-sheet"), grip = stage.querySelector(".fx-grip");
    const VH = () => innerHeight, D = [0.25, 0.5, 0.75, 1]; let h = 0.25 * VH(), drag = null, raf = 0;
    const put = () => { sheet.style.height = h + "px"; }; put();
    grip.addEventListener("pointerdown", (e) => { cancelAnimationFrame(raf); grip.setPointerCapture(e.pointerId); drag = { h0: h, cy: e.clientY, hist: [{ t: performance.now(), h }] }; });
    grip.addEventListener("pointermove", (e) => { if (!drag) return; h = Math.max(0, Math.min(VH(), drag.h0 - (e.clientY - drag.cy))); put(); drag.hist.push({ t: performance.now(), h }); if (drag.hist.length > 6) drag.hist.shift(); });
    const release = () => { if (!drag) return; const now = performance.now(), hs = drag.hist.filter((p) => now - p.t < 80); drag = null;
      let v = hs.length > 1 ? (hs.at(-1).h - hs[0].h) / Math.max(1, hs.at(-1).t - hs[0].t) * 1000 : 0;
      if (FAULT === "e4-vdrop") v = 0; // the plant: the release forgets its velocity (no projection, no seeded spring)
      const proj = Math.max(0, Math.min(VH(), h + v * 0.15));
      const target = D.map((d) => d * VH()).reduce((a, b) => (Math.abs(b - proj) < Math.abs(a - proj) ? b : a));
      if (prm()) { h = target; put(); return; }
      const k = 322, c = 2 * 0.75 * Math.sqrt(k); let t0 = performance.now();
      const step = (t) => { const dt = Math.min(0.032, (t - t0) / 1000); t0 = t; v += (-k * (h - target) - c * v) * dt; h += v * dt; put();
        if (Math.abs(v) > 1 || Math.abs(h - target) > 0.2) raf = requestAnimationFrame(step); else { h = target; put(); } };
      raf = requestAnimationFrame(step); };
    grip.addEventListener("pointerup", release); grip.addEventListener("pointercancel", release);
  }
  if (SCENE === "strip" && FAULT === "e4-stripstop") {
    // the plant: the strip takes the gesture from the platform (touch-action: none) and follows the finger itself; at
    // touchend it snaps to the nearest member at once, so the release velocity is dropped
    const s = stage.querySelector(".fx-strip"); s.style.touchAction = "none"; let sx = 0, s0 = 0;
    s.addEventListener("touchstart", (e) => { s.style.scrollSnapType = "none"; sx = e.touches[0].clientX; s0 = s.scrollLeft; }, { passive: true });
    s.addEventListener("touchmove", (e) => { s.scrollLeft = s0 - (e.touches[0].clientX - sx); }, { passive: true });
    s.addEventListener("touchend", () => { s.scrollLeft = Math.round(s.scrollLeft / s.clientWidth) * s.clientWidth; s.style.scrollSnapType = ""; });
  }
}
E.mount = async () => { mountScene(); await new Promise((r) => requestAnimationFrame(r)); };
if (!DEFER) mountScene();
setTimeout(() => { E.ready = true; window.__e = E; }, 150);
`;
  return `<!doctype html><html${dark ? ' class="dark"' : ""}><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>D5 fixture</title><style>${css}</style></head>
<body><main data-scene="${scene}"><button data-sentinel="before">before</button><div id="stage" style="padding:24px 0"></div><button data-sentinel="after">after</button></main>
<script>${script}</script></body></html>`;
}
