#!/usr/bin/env node
// C-A5 adversarial probe (D5 pass 5, the fresh critic of the candidate A+E). Not a witness: each cell is scored in
// C-A5.md against the CK row it would break. App: the harness's own scene app (build.mjs), scene `restale`. One browser
// per run, a context per cell, every page/context/browser closed in finally (lib.mjs openPage/Engine); WebKit relaunches
// every NAV_CAP (60) navigations (H3-1). Films take no screenshot.
//   node ca5-probe.mjs --build <out>/builds/<label> [--engine chromium|webkit]
// Cells (CK-20, the class C-E4 §4.1 named: "a stage that re-reads place only on the events it listens for"):
//   shrink place · keyboard|pointer   A engaged (Tab: promoted; a mouse hold: in place on "coarse"). A's wrapper narrows
//        from 360 px to 240 px and moves 60 px right (margin-left), a centred shrink by a STYLE write: the box's new rect
//        lies inside its old one. 400 ms later a node is appended below (a childList mutation that moves nothing). A is
//        filmed per frame across that append: bound ≤ 4 px per 16.7 ms (H5's STALE, C-E4's step)
//   inset place · keyboard|pointer   the wrapper 360 → 300 px with +60 px left margin: the left edge moves in, the right
//        edge stays, so the box's new rect lies inside its old one and its centre moves +30 px (the case a ratio-1 cut
//        cannot see). Same film and bound
//   translate place · keyboard|pointer   the control: the wrapper moves 60 px right at its own width (the box leaves its
//        old rect). Must PASS on a cure that observes place
//   shrink reach · keyboard   REPORT/FAIL: after the centred shrink and 400 ms, the promoted host's layout width against
//        its footprint's, and `--stage-w`. The stage claims the observer re-reads "the reach (--stage-room, --stage-w)"
//        on any layout move (P-E5 §0 item 1); bound |host − footprint| ≤ 1 px
//   (the two commit-light fail-loud cells were retired by H7, pass 7: the light is deleted, O-103d (1))
import { parseArgs, serveTarget, Engine, openPage, acquireLock, load, f, tabKey, center } from "../../../harness/lib.mjs";

const a = parseArgs();
const engine = typeof a.engine === "string" ? a.engine : "chromium";
const NOM = 1000 / 60, STEP = 4;
const A = '[data-t="slider-a"] .glass-slider';
const out = [];
const cell = (name, v, line) => { const s = `  ${v.padEnd(10)} ${name} · ${line} · load ${load()}`; out.push(s); console.log(s); };
const film = ([sel, ms]) => new Promise((ok) => {
  const fr = []; const t0 = performance.now();
  const tick = () => { const e = document.querySelector(sel); const r = e.getBoundingClientRect(); fr.push({ t: performance.now() - t0, x: r.left + r.width / 2, y: r.top + r.height / 2, eng: e.hasAttribute("data-engaged") }); if (performance.now() - t0 < ms) requestAnimationFrame(tick); else ok(fr); };
  requestAnimationFrame(tick);
});
const steps = (fr) => fr.slice(1).map((x, k) => ({ t: x.t, d: (Math.hypot(x.y - fr[k].y, x.x - fr[k].x) * NOM) / Math.max(NOM, x.t - fr[k].t), dx: x.x - fr[k].x }));
const stageOf = (s) => {
  const e = document.querySelector(s); const r = e.getBoundingClientRect(); const fp = e.previousElementSibling;
  const fpw = fp && !fp.matches("[data-t]") && fp !== e ? fp.getBoundingClientRect().width : null;
  return { ol: e.offsetLeft, ow: e.offsetWidth, pop: e.matches(":popover-open"), eng: e.hasAttribute("data-engaged"), cx: r.left + r.width / 2, w: e.offsetWidth, fpw, stagew: getComputedStyle(e).getPropertyValue("--stage-w").trim() };
};
const move = ([kind]) => { const w = document.querySelector('[data-t="slider-a"]').parentElement; if (kind === "shrink") { w.style.width = "240px"; w.style.marginLeft = "60px"; } else if (kind === "inset") { w.style.width = "300px"; w.style.marginLeft = "60px"; } else if (kind === "translate") { w.style.marginLeft = "60px"; } };

await acquireLock();
console.log(`C-A5 probe · ${engine} · load ${load()} at start`);
const T = await serveTarget({ build: a.build });
const E = new Engine(engine);
try {
  for (const how of ["keyboard", "pointer"]) {
    for (const kind of ["shrink", "inset", "translate"]) {
      const P = await openPage(E, T, "restale");
      try {
        const { page } = P; let c = null;
        if (how === "keyboard") { await page.focus('[data-sentinel="before"]'); await page.keyboard.press(tabKey(engine)); }
        else { c = await center(page, '[data-t="slider-a"] [role="slider"]'); await page.mouse.move(c.x, c.y); await page.mouse.down(); }
        try {
          await page.waitForTimeout(600);
          const s0 = await page.evaluate(stageOf, A);
          await page.evaluate(move, [kind]);
          await page.waitForTimeout(400);
          const s1 = await page.evaluate(stageOf, A);
          const pr = page.evaluate(film, [A, 900]);
          await page.waitForTimeout(80);
          await page.evaluate(() => window.__e.tick());
          const fr = await pr;
          const s2 = await page.evaluate(stageOf, A);
          const st = steps(fr); const worst = st.reduce((m, x) => (x.d > m.d ? x : m), { d: 0, t: 0, dx: 0 });
          const driven = s0.eng && fr.every((x) => x.eng);
          const xs = fr.map((x) => x.x);
          cell(`${kind} place · ${how}`, !driven ? "FAIL NOT DRIVEN" : worst.d <= STEP ? "PASS" : "FAIL",
            `A engaged ${s0.eng} (top layer ${s0.pop}) · wrapper ${{ shrink: "360 → 240 px wide, +60 px left margin (centred shrink: new rect inside the old)", inset: "360 → 300 px wide, +60 px left margin (left edge in, right edge kept: new rect inside the old)", translate: "+60 px left margin at 360 px (new rect leaves the old)" }[kind]}: A's centre x ${f(s0.cx, 1)} → ${f(s1.cx, 1)} px, layout box left/width ${s0.ol}/${s0.ow} → ${s1.ol}/${s1.ow} px · then a node appended below (moves nothing): over ${fr.length} frames A's centre x spans ${f(Math.min(...xs), 1)}..${f(Math.max(...xs), 1)} px, largest one-frame move ${f(worst.d, 1)} px at +${f(worst.t, 0)} ms (dx ${f(worst.dx, 1)}) (bound ≤ ${STEP} per 16.7 ms)`);
          if (how === "keyboard" && kind === "shrink") {
            const gap = s1.fpw == null ? NaN : Math.abs(s1.w - s1.fpw);
            cell(`shrink reach · ${how}`, s1.fpw == null ? "REPORT" : gap <= 1 ? "PASS" : "FAIL",
              `before: host ${s0.w} px, footprint ${f(s0.fpw, 1)} px, --stage-w ${s0.stagew} · 400 ms after the shrink (no mutation): host ${s1.w} px, footprint ${f(s1.fpw, 1)} px, --stage-w ${s1.stagew} · after the unrelated append: host ${s2.w} px, --stage-w ${s2.stagew} (bound |host − footprint| ≤ 1 px before any mutation)`);
          }
        } finally { if (c) await page.mouse.up(); }
      } finally { await P.close(); }
    }
  }
  // RETIRED by H7 (D5 pass 7, REGISTRY §P6-8.3 wave 1; O-103d (1)): the two `fail-loud --engage-commit-light-*
  // (commit)` cells read the commit light's clocks, which P-A6 deleted with the light (no alias). The clocks a build
  // still transitions on are enumerated and planted by E-11's census (harness/e11-fail-loud.mjs, H6), with no list
} finally { await E.close?.(); await T.close?.(); }
const fails = out.filter((s) => /^\s+FAIL/.test(s)).length;
console.log(`C-A5 probe · ${engine} · ${out.length - fails} pass/report, ${fails} fail · load ${load()} at end`);
process.exit(0);
