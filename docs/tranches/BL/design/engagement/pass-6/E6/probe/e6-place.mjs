#!/usr/bin/env node
// P-E6 probe (not a witness): CK-20's place invariant beyond H6's family, "the stage hears every move of the rest box
// before the next frame it paints", on the moves a reader in the stage's own frame callback could miss. App: the
// harness's own scene app, scene `restale`. One browser per run, a context per cell, every page/context/browser closed
// in finally (lib.mjs openPage/Engine; WebKit relaunches every NAV_CAP navigations). Films take no screenshot.
//   node e6-place.mjs --build <out>/builds/<label> [--engine chromium|webkit]
// Cells, keyboard (promoted) and pointer (a mouse hold: in place on "coarse", promoted on "every"):
//   late frame write · <path>   A engaged. A spring elsewhere moves A's wrapper 60 px right from an animation-frame
//        callback registered after the stage's own (two rAF hops from a task), and the next task appends a node below
//        the slider (a childList mutation that moves nothing) before the following frame. Filmed 900 ms per frame:
//        largest one-frame centre move ≤ 60 px is the move itself painting; a stale place adds a glide back of ~60 px on
//        the frame after. Graded: the largest one-frame move after the move's own frame ≤ 4 px per 16.7 ms (STALE).
//        NOT DRIVEN unless engaged throughout and the move landed (centre +60 ± 1 px in layout)
//   transition move · <path>   the wrapper's margin-left runs 0 → 120 px on a 600 ms linear CSS transition (a layout
//        move every frame, by the animation step); at +300 ms a node is appended. Graded: the largest one-frame move ≤
//        4 px + the transition's own per-frame step (120 px / 600 ms × 16.7 ms = 3.3 px)
import { parseArgs, serveTarget, Engine, openPage, acquireLock, load, f, tabKey, center } from "../../../harness/lib.mjs";

const a = parseArgs();
const engine = typeof a.engine === "string" ? a.engine : "chromium";
const NOM = 1000 / 60, STEP = 4, TSTEP = (120 / 600) * NOM;
const A = '[data-t="slider-a"] .glass-slider';
const out = [];
const cell = (name, v, line) => { const s = `  ${v.padEnd(10)} ${name} · ${line} · load ${load()}`; out.push(s); console.log(s); };
const film = ([sel, ms]) => new Promise((ok) => {
  const fr = []; const t0 = performance.now();
  const tick = () => { const e = document.querySelector(sel); const r = e.getBoundingClientRect(); fr.push({ t: performance.now() - t0, x: r.left + r.width / 2, y: r.top + r.height / 2, eng: e.hasAttribute("data-engaged") }); if (performance.now() - t0 < ms) requestAnimationFrame(tick); else ok(fr); };
  requestAnimationFrame(tick);
});
const steps = (fr) => fr.slice(1).map((x, k) => ({ t: x.t, d: (Math.hypot(x.y - fr[k].y, x.x - fr[k].x) * NOM) / Math.max(NOM, x.t - fr[k].t), dx: x.x - fr[k].x }));
const flowX = (s) => { let x = 0; for (let e = document.querySelector(s); e; e = e.offsetParent) x += e.offsetLeft; return x; };
const lateWrite = () => { const w = document.querySelector('[data-t="wrap"]'); requestAnimationFrame(() => requestAnimationFrame(() => { w.style.marginLeft = "60px"; window.__lateAt = performance.now(); setTimeout(() => window.__e.tick(), 0); })); };
const transit = () => { const w = document.querySelector('[data-t="wrap"]'); w.style.transition = "margin-left 600ms linear"; void getComputedStyle(w).marginLeft; w.style.marginLeft = "120px"; setTimeout(() => window.__e.tick(), 300); };

await acquireLock();
console.log(`P-E6 place probe · ${engine} · load ${load()} at start`);
const T = await serveTarget({ build: a.build });
const E = new Engine(engine);
try {
  for (const how of ["keyboard", "pointer"]) {
    for (const kind of ["late frame write", "transition move"]) {
      const P = await openPage(E, T, "restale");
      try {
        const { page } = P; let c = null;
        if (how === "keyboard") { await page.focus('[data-sentinel="before"]'); await page.keyboard.press(tabKey(engine)); }
        else { c = await center(page, '[data-t="slider-a"] [role="slider"]'); await page.mouse.move(c.x, c.y); await page.mouse.down(); }
        try {
          await page.waitForTimeout(600);
          const x0 = await page.evaluate(flowX, A);
          const eng0 = await page.evaluate((s) => document.querySelector(s).hasAttribute("data-engaged"), A);
          const pr = page.evaluate(film, [A, 900]);
          await page.waitForTimeout(80);
          await page.evaluate(kind === "late frame write" ? lateWrite : transit);
          const fr = await pr;
          const x1 = await page.evaluate(flowX, A);
          const want = kind === "late frame write" ? 60 : 120;
          const driven = eng0 && fr.every((x) => x.eng) && Math.abs(x1 - x0 - want) <= 1;
          const st = steps(fr);
          let worst, bound;
          if (kind === "late frame write") {
            // the move's own frame is the first step ≥ 30 px: it is the layout painting; grade every later frame
            const k = st.findIndex((x) => x.d >= 30);
            const after = k < 0 ? st : st.slice(k + 1);
            worst = after.reduce((m, x) => (x.d > m.d ? x : m), { d: 0, t: 0, dx: 0 });
            bound = STEP;
            cell(`late frame write · ${how}`, !driven ? "FAIL NOT DRIVEN" : worst.d <= bound ? "PASS" : "FAIL",
              `engaged ${eng0} · flow x ${x0} → ${x1} px (want +${want}) · the move painted in one frame of ${f(k < 0 ? NaN : st[k].d, 1)} px at +${f(k < 0 ? NaN : st[k].t, 0)} ms; after it, over ${after.length} frames, the largest one-frame move ${f(worst.d, 1)} px at +${f(worst.t, 0)} ms (dx ${f(worst.dx, 1)}) (bound ≤ ${bound})`);
          } else {
            worst = st.reduce((m, x) => (x.d > m.d ? x : m), { d: 0, t: 0, dx: 0 });
            bound = STEP + TSTEP;
            cell(`transition move · ${how}`, !driven ? "FAIL NOT DRIVEN" : worst.d <= bound ? "PASS" : "FAIL",
              `engaged ${eng0} · flow x ${x0} → ${x1} px (want +${want}) · over ${fr.length} frames the largest one-frame move ${f(worst.d, 1)} px at +${f(worst.t, 0)} ms (dx ${f(worst.dx, 1)}) (bound ≤ ${f(bound, 1)}: ${STEP} + the transition's own ${f(TSTEP, 1)})`);
          }
        } finally { if (c) await page.mouse.up(); }
      } finally { await P.close(); }
    }
  }
} finally { await E.close?.(); await T.close?.(); }
const fails = out.filter((s) => /^\s+FAIL/.test(s)).length;
console.log(`P-E6 place probe · ${engine} · ${out.length - fails} pass, ${fails} fail · load ${load()} at end`);
process.exit(fails ? 1 : 0);
