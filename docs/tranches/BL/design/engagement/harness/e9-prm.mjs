#!/usr/bin/env node
// E-9 · the PRM arm (W-J.2's former G5, `PLAN.md:251`; H-9): under prefers-reduced-motion every rung retires its
// spatial legs and keeps a light answer. Per scene gated "E-9", light and dark, reduced motion verified:
//   press-spatial   the mouse over the control 300 ms (the hover state H), then pointer down, sampled every frame for
//                   300 ms: the pressed element's scale range < 0.002 (the press point is [data-e=thumb] when the
//                   scene has one, else [data-e=target]; the read is [data-e=target])
//   press-light     the paint properties that differ between H and the pressed state (a press-only light answer):
//                   ≥ 1 (background, shadow, colour, border, outline, filter, the pseudo-elements, the first
//                   descendant layers)
//   commit-spatial  Tab in from the sentinel, the scene's key, filmed 800 ms: the target's scale in flight
//                   (≥ 0.002 from both its first and its last frame) on ≤ 1 frame, and the body ([data-e=body]) in
//                   flight (> 1 px from both its start and its landing) on ≤ 1 frame: a state change lands (a new
//                   resting scale may jump), it does not glide or pop
//   commit-light    (H3, pass 3; CK-10 "keeps a light leg") the same commit's light TRANSIENT on the painted face
//                   ([data-e~=face], default the target): lib.mjs lightLeg, arm (iii)'s rise without its clock
//                   condition (the clock is E-8's): the face's light layers over its committed fill rise ≥ 0.01 and
//                   return to rest, or its fill flashes above its rest and returns. The committed state's own fill
//                   change does not count: pass 2 graded no light on the commit, so A passed with its commit light
//                   zeroed by the library's PRM fallback (C-CP CK-27, CK-10). Precondition: the state changed (else
//                   NOT DRIVEN, a FAIL). Read on the CK-02 commit members (scenes gated E-2); the slider's key step is
//                   REPORT (its reduce light leg is E-3's)
//                   H5 (pass 5): the transient is read IN PAINT (lib.mjs paintFilm/paintRise): the same reduce commit on
//                   its own page, the face (inset 3 px) screenshotted 0-900 ms; the cell passes only on the paint read,
//                   and the composite is printed beside it. The composite passed the tabs' dark light under reduce while
//                   it painted 0.0016-0.0018 (C-A4 §0.4, CK-27). Plant `e2-paintless` must FAIL it
//   H6 (pass 6; O-100 R-1 placed in D5 by O-103, REGISTRY §P5-7 item 13): the PRESENTED rung's light leg is its opacity
//   fade, and the reduce arm keeps it (it is not vestibular) while it retires the plate's spatial leg. On scenes whose
//   row carries `fade` ({ plate, scrim }: the presented scene), under reduce, light and dark: the open plate is
//   dismissed (`__e.open(false)`) and filmed per frame for 700 ms, then presented again (`__e.open(true)`) and filmed:
//   presented fade (PRM) close|open   PASS when the plate's or the scrim's effective opacity passes through ≥ 2 frames
//                    strictly between 0.03 and 0.97 (a fade, not a cut) and the plate, wherever it paints (opacity >
//                    0.03), holds its scale (range < 0.002) and its centre (≤ 1 px): FAIL on a cut, or on a spatial leg
//                    kept. The same open and close without reduce are REPORT (the fade the rung has). NOT DRIVEN (FAIL)
//                    when the scene has no `__e.open`. Plants `e9-fadecut` (the fade zeroed by the PRM fallback),
//                    `e9-fadespatial` (the plate's 0.95 → 1 scale kept under reduce)
//   node e9-prm.mjs --build <dir> | --fixture [--fault e9-scale|e9-dark|e9-glide|e9-fillonly] [--engine webkit]
import { witness, openPage, scenesFor, center, quiet, lightLeg, paintDiff, tabKey, paintFilm, paintRise, f, BOUNCE, KEY_DWELL } from "./lib.mjs";

const FADE_LO = 0.03, FADE_HI = 0.97, FADE_FRAMES = 2;
// the presented plate's and scrim's effective opacity, the plate's scale and centre, every frame for ms after `go`
const fadeFilm = ([plate, scrim, ms, open]) => new Promise((ok) => {
  const fr = []; const t0 = performance.now();
  const rd = (sel) => { const e = document.querySelector(sel); if (!e) return { op: 0, s: NaN, x: NaN, y: NaN }; const v = window.__vis(e); const q = window.__eff(e); return { op: v.op, s: q ? q.s : NaN, x: q ? q.x : NaN, y: q ? q.y : NaN }; };
  const tick = () => { const p = rd(plate); fr.push({ t: performance.now() - t0, p, sc: scrim ? rd(scrim).op : NaN }); if (performance.now() - t0 < ms) requestAnimationFrame(tick); else ok(fr); };
  Promise.resolve(window.__e.open(open)).then(() => {});
  requestAnimationFrame(tick);
});
const fadeVerdict = (fr) => {
  const mid = (v) => v > FADE_LO && v < FADE_HI;
  const pf = fr.filter((x) => mid(x.p.op)).length, sf = fr.filter((x) => Number.isFinite(x.sc) && mid(x.sc)).length;
  const lit = fr.filter((x) => x.p.op > FADE_LO && Number.isFinite(x.p.s));
  const ss = lit.map((x) => x.p.s); const range = ss.length ? Math.max(...ss) - Math.min(...ss) : 0;
  const cx = lit.map((x) => x.p.x), cy = lit.map((x) => x.p.y); const drift = lit.length ? Math.hypot(Math.max(...cx) - Math.min(...cx), Math.max(...cy) - Math.min(...cy)) : 0;
  const fades = pf >= FADE_FRAMES || sf >= FADE_FRAMES; const spatial = range >= BOUNCE || drift > 1;
  const ops = (k) => fr.filter((_, i) => i % 3 === 0).map((x) => `+${x.t.toFixed(0)} ${(k === "p" ? x.p.op : x.sc).toFixed(2)}`).join(" ");
  return { fades, spatial, line: `plate opacity strictly between ${FADE_LO} and ${FADE_HI} on ${pf} frame(s), scrim on ${sf} (bound ≥ ${FADE_FRAMES} on either: a fade, not a cut) · the plate where it paints: scale range ${f(range, 4)} (bound < ${BOUNCE}), centre drift ${f(drift, 1)} px (bound ≤ 1) · ${fr.length} frames · plate [${ops("p")}]${fr.some((x) => Number.isFinite(x.sc)) ? ` · scrim [${ops("s")}]` : ""}`.slice(0, 900) };
};

await witness("E-9", "the PRM arm", async ({ E, T, cell, guard, idx, engine }) => {
  // ── H6: the presented fade under reduce (CK-10 × O-100 R-1) ──
  for (const [sc, m] of Object.entries(idx).filter(([, x]) => x.fade)) {
    for (const prm of [true, false]) for (const theme of prm ? ["light", "dark"] : ["light"]) {
      const r = await guard(`${sc} fade ${prm} ${theme}`, async () => {
        const P = await openPage(E, T, sc, { theme, prm });
        try {
          if (prm && !P.modeOk) return { mode: P.modeLine };
          if (!(await P.page.evaluate(() => typeof window.__e.open === "function"))) return { none: true };
          await P.page.waitForTimeout(300);
          const close = await P.page.evaluate(fadeFilm, [m.fade.plate, m.fade.scrim ?? null, 700, false]);
          await P.page.waitForTimeout(200);
          const open = await P.page.evaluate(fadeFilm, [m.fade.plate, m.fade.scrim ?? null, 700, true]);
          return { close, open };
        } finally { await P.close(); }
      }, 60000);
      for (const how of ["close", "open"]) {
        const nm = prm ? `E-9 ${sc} fade (PRM) ${how} ${theme}` : `E-9 ${sc} fade (no reduce) ${how} ${theme}`;
        if (r.crashed) { cell(nm, prm ? "FAIL" : "REPORT", r.line); continue; }
        if (r.mode) { cell(nm, "FAIL", `MODE NOT APPLIED ${r.mode}`); continue; }
        if (r.none) { cell(nm, prm ? "FAIL" : "REPORT", "NOT DRIVEN: the scene has no __e.open (the presentation cannot be driven)"); continue; }
        const v = fadeVerdict(r[how]);
        if (!prm) { cell(nm, "REPORT", `the rung's own ${how} without reduce (the reference): ${v.fades ? "fades" : "cuts"}, ${v.spatial ? "with" : "no"} spatial leg · ${v.line}`); continue; }
        cell(nm, v.fades && !v.spatial ? "PASS" : "FAIL", `under reduce the ${how} ${v.fades ? "fades" : "CUTS (the opacity fade is zeroed)"}${v.spatial ? " and KEEPS A SPATIAL LEG on the plate" : ""} · ${v.line}`);
      }
    }
  }

  for (const [sc, m] of scenesFor(idx, "E-9")) {
    for (const theme of ["light", "dark"]) {
      const r = await guard(`${sc} ${theme}`, async () => {
        const P = await openPage(E, T, sc, { theme, prm: true });
        try {
          if (!P.modeOk) return { mode: P.modeLine };
          const at = (await P.page.$('[data-e~="thumb"]')) ? '[data-e~="thumb"]' : '[data-e~="target"]';
          const c = await center(P.page, at);
          await P.page.mouse.move(c.x, c.y); await P.page.waitForTimeout(300);
          const h = await P.page.evaluate(() => window.__paint('[data-e~="target"]'));
          const hs = await P.page.evaluate(() => window.__paint('[data-e~="thumb"]'));
          const pr = P.page.evaluate(() => window.__sample('[data-e~="target"]', null, 300));
          await P.page.mouse.down(); const fr = await pr;
          const p = await P.page.evaluate(() => window.__paint('[data-e~="target"]'));
          const ps = await P.page.evaluate(() => window.__paint('[data-e~="thumb"]'));
          await P.page.mouse.up(); await P.page.mouse.move(2, 2); await P.page.waitForTimeout(400);
          const light = [...paintDiff(h, p), ...paintDiff(hs, ps).map((k) => `thumb ${k}`)];
          let commit = null;
          if (m.key) {
            const Q = await openPage(E, T, sc, { theme, prm: true });
            try {
              await Q.page.focus('[data-sentinel="before"]'); await Q.page.keyboard.press(tabKey(engine)); await Q.page.waitForTimeout(200);
              const st = () => Q.page.evaluate(() => JSON.stringify(window.__e.state?.() ?? null));
              const s0 = await st();
              const pr2 = Q.page.evaluate(([o]) => window.__film(o), [{ target: '[data-e~="target"]', body: '[data-e~="body"]', face: m.face ? '[data-e~="face"]' : '[data-e~="target"]', ms: 800 }]);
              await Q.page.keyboard.press(m.key, KEY_DWELL); const fl = await pr2;
              commit = { q: quiet(fl.fr), fl, s0, s1: await st() };
            } finally { await Q.close(); }
            // H5: the same reduce commit IN PAINT, on its own page (a CK-02 commit member only; the film takes no shot)
            let paint = null;
            // a STARVED paint read (lib.mjs PAINT_GAP) is taken again, at most twice, and the line says so
            for (let k = 0; k < 3 && (m.gates ?? []).includes("E-2") && commit.s0 !== commit.s1; k++) {
              const R = await openPage(E, T, sc, { theme, prm: true });
              try {
                await R.page.focus('[data-sentinel="before"]'); await R.page.keyboard.press(tabKey(engine)); await R.page.waitForTimeout(200);
                const st2 = () => R.page.evaluate(() => JSON.stringify(window.__e.state?.() ?? null)); const p0 = await st2();
                const pts = await paintFilm(R.page, m.face ? '[data-e~="face"]' : '[data-e~="target"]', () => R.page.keyboard.press(m.key, KEY_DWELL));
                const prev = paint;
                paint = p0 === (await st2()) ? { rise: NaN, rest: false, line: "in paint: NOT DRIVEN (the paint page's state did not change)" } : paintRise(pts);
                if (prev) paint = { ...paint, line: `${paint.line} (read ${k + 1}: the earlier read was STARVED)` };
              } finally { await R.close(); }
              if (!paint.starved) break;
            }
            commit.leg = lightLeg(commit.fl, paint); delete commit.fl;
          }
          return { press: quiet(fr), light, commit };
        } finally { await P.close(); }
      }, 60000);
      const nm = (c) => `E-9 ${sc} ${c} ${theme}`;
      if (r.crashed || r.mode) { cell(nm("press-spatial"), "FAIL", r.line ?? `MODE NOT APPLIED ${r.mode}`); continue; }
      cell(nm("press-spatial"), r.press.range < BOUNCE ? "PASS" : "FAIL", `scale range while pressed ${f(r.press.range)} over ${r.press.frames} frames (bound < ${BOUNCE})${r.note ? ` · ${r.note}` : ""}`);
      cell(nm("press-light"), r.light.length ? "PASS" : "FAIL", `press-only paint changes [${r.light.join(", ").slice(0, 200)}] (bound ≥ 1)`);
      if (r.commit) {
        const q = r.commit.q;
        cell(nm("commit-spatial"), q.smid <= 1 && q.mid <= 1 ? "PASS" : "FAIL", `commit(${m.key}): scale range ${f(q.range)} with ${q.smid} frame(s) in flight · body moved ${f(q.moved, 2)} px with ${q.mid} frame(s) in flight (bound ≤ 1 frame each) · ${q.frames} frames`);
        // the transient is the CK-02 commit's: read on the commit members (scenes gated E-2); a slider's key step is
        // a value change, and its reduce light leg is E-3's (phone touch-held PRM keeps a light leg)
        if (!(m.gates ?? []).includes("E-2")) cell(nm("commit-light"), "REPORT", `not a CK-02 commit member (no E-2 gate): its reduce light leg is read by E-3`);
        else if (r.commit.s0 === r.commit.s1) cell(nm("commit-light"), "FAIL", `NOT DRIVEN: commit(${m.key}) left the state ${String(r.commit.s0).slice(0, 60)}; a commit that never happened keeps no light to read`);
        else cell(nm("commit-light"), r.commit.leg.pass ? "PASS" : "FAIL", `commit(${m.key}) under reduce, state ${String(r.commit.s0).slice(0, 30)} → ${String(r.commit.s1).slice(0, 30)}: the transient · ${r.commit.leg.line}`);
      }
    }
  }
});
