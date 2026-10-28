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
//   commit-light    (H3, H5) RETIRED by H7 with the commit light it read (O-103d (1)); see commit-instant below
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
//   H7 (pass 7; O-103d (1), REGISTRY §P6-7 items 4, 6): `commit-light` and its paint read are RETIRED with the commit
//   light (under reduce the pop is an instant state change, the commit legible through the face's own state). In their
//   place, on the CK-02 commit members (scenes gated E-2), light and dark, `a6-probe prm`'s shape made a cell:
//   commit-instant   under reduce, Tab in, the scene's key, filmed 600 ms: INSTANT (the target's scale excursion past its first and last frames < 0.002, a pop, and
//                    in flight on ≤ 1 frame; the body in flight on ≤ 1 frame; a row's `region` in flight on ≤ 1 frame)
//                    and LEGIBLE: the face's settled paint 300 ms after the key differs from before it on ≥ 5 % of its
//                    pixels by ≥ 16 levels of 8-bit luma; a disclosure's state is its region (`region` on the row: from
//                    ≤ 1 px to ≥ 16 px tall). A stateless member is REPORT; a key that changed no state is NOT DRIVEN
//                    (FAIL). Plants `e9-prmpop` (the commit pops under reduce), `e9-illegible` (the state paints nothing)
//   commit-instant control (Shift)   light: the same reads with Shift, which commits nothing: PASS only when it reads NOT
//                    legible (the legibility read can fail on every face, in band)
//   --prm-plant      (CK-27, REGISTRY §P6-7 item 6) the reduce arm REMOVED on the commit page after its mode is verified
//                    (lib.mjs PRM_PLANT: every reduce @media rule off, every no-preference one on, script told no-reduce):
//                    every stateful commit-instant cell must then FAIL, the tabs face's travel included (C-A6's plant
//                    resurrected the pop only and read 0.0000 there). A `PLANT reach` line names the faces it failed and
//                    the faces it did not reach. Fixture plant `e9-prmplant`
//   node e9-prm.mjs --build <dir> | --fixture [--fault e9-scale|e9-dark|e9-glide|e9-prmpop] [--engine webkit] [--prm-plant]
import { witness, openPage, scenesFor, center, quiet, paintDiff, tabKey, f, BOUNCE, KEY_DWELL, PRM_PLANT, GLASS } from "./lib.mjs";
const { PNG } = (await import(`${GLASS}/node_modules/pngjs/lib/png.js`)).default;
const LUMA_STEP = 16, LUMA_FRAC = 0.05, REGION_LINE = 16;
const luma = (buf) => { const p = PNG.sync.read(buf); const o = new Float32Array(p.width * p.height); for (let i = 0, j = 0; i < p.data.length; i += 4, j++) o[j] = 0.2126 * p.data[i] + 0.7152 * p.data[i + 1] + 0.0722 * p.data[i + 2]; return { w: p.width, h: p.height, o }; };
const changed = (a, b) => { if (!a || !b || a.w !== b.w || a.h !== b.h) return NaN; let n = 0; for (let i = 0; i < a.o.length; i++) if (Math.abs(a.o[i] - b.o[i]) >= LUMA_STEP) n++; return n / a.o.length; };
const faceShot = async (page, sel) => { const bb = await page.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; const r = e.getBoundingClientRect(); return { x: Math.max(0, Math.floor(r.x) - 2), y: Math.max(0, Math.floor(r.y) - 2), width: Math.ceil(r.width) + 4, height: Math.ceil(r.height) + 4 }; }, sel); return bb; };
// a row's region height every frame for ms (a disclosure's state)
const regionFilm = ([sel, ms]) => new Promise((ok) => { const fr = []; const t0 = performance.now(); const tick = () => { const g = document.querySelector(sel); fr.push(g ? g.getBoundingClientRect().height : 0); if (performance.now() - t0 < ms) requestAnimationFrame(tick); else ok(fr); }; requestAnimationFrame(tick); });

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

await witness("E-9", "the PRM arm", async ({ a, E, T, cell, guard, idx, engine }) => {
  const plant = a["prm-plant"] === true;
  if (plant) console.log("# PLANT --prm-plant: the reduce arm removed on every commit page (lib.mjs PRM_PLANT); every stateful commit-instant cell must FAIL");
  const reach = { failed: [], passed: [] };
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
    if (plant && !(m.gates ?? []).includes("E-2")) continue;
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
            // H7: the reduce commit, filmed (spatial: E-9's quiet read) with the face shot before and after (legible)
            const stateful = (m.gates ?? []).includes("E-2") && !m.stateless;
            const one = async (key, usePlant) => {
              const Q = await openPage(E, T, sc, { theme, prm: true });
              try {
                const pl = usePlant ? await Q.page.evaluate(PRM_PLANT) : null;
                await Q.page.focus('[data-sentinel="before"]'); await Q.page.keyboard.press(tabKey(engine)); await Q.page.waitForTimeout(300);
                const st = () => Q.page.evaluate(() => JSON.stringify(window.__e.state?.() ?? null));
                const face = m.face ? '[data-e~="face"]' : '[data-e~="target"]';
                // the region's rest height is read here, before the key: the film's first frame can land after an
                // instant commit (WebKit, cand6 accordion light: 37.8 → 37.8 px read NOT LEGIBLE on an open region)
                const rh = (sel) => Q.page.evaluate((s) => document.querySelector(s)?.getBoundingClientRect().height ?? 0, sel);
                const s0 = await st(); const rh0 = m.region ? await rh(m.region) : null; const bb = await faceShot(Q.page, face); const before = bb ? luma(await Q.page.screenshot({ clip: bb, animations: "allow", caret: "initial" })) : null;
                const pr2 = Q.page.evaluate(([o]) => window.__film(o), [{ target: '[data-e~="target"]', body: '[data-e~="body"]', face, ms: 600 }]);
                const prg = m.region ? Q.page.evaluate(regionFilm, [m.region, 600]) : null;
                await Q.page.keyboard.press(key, KEY_DWELL); const fl = await pr2; const rg = prg ? await prg : null;
                await Q.page.waitForTimeout(300);
                const after = bb ? luma(await Q.page.screenshot({ clip: bb, animations: "allow", caret: "initial" })) : null;
                const rh1 = m.region ? await rh(m.region) : null;
                const S = fl.fr.map((x) => x.a?.s).filter(Number.isFinite);
                // the pop: the scale's excursion past both its first and its last frame (a new resting scale may jump
                // in one frame, as commit-spatial allows; a pop leaves the span of its endpoints and comes back)
                const range = S.length ? Math.max(Math.max(...S) - Math.max(S[0], S.at(-1)), Math.min(S[0], S.at(-1)) - Math.min(...S)) : NaN;
                const reg = rg ? { h0: rh0, h1: rh1, mid: rg.filter((v) => Math.abs(v - rh0) > 1 && Math.abs(v - rh1) > 1).length } : null;
                return { q: quiet(fl.fr), range, s0, s1: await st(), frac: changed(before, after), reg, pl };
              } finally { await Q.close(); }
            };
            commit = await one(m.key, plant);
            commit.stateful = stateful;
            if (stateful && !plant && theme === "light") commit.ctl = await one("Shift", false);
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
        // H7: the instant-state form (O-103d (1)); a slider's key step is a value change, its reduce light leg E-3's
        const cm = r.commit; const cn = nm("commit-instant");
        const legibleOf = (x) => (m.region && x.reg ? x.reg.h0 <= 1 && x.reg.h1 >= REGION_LINE : x.frac >= LUMA_FRAC);
        const line = (x) => `state ${String(x.s0).slice(0, 24)} → ${String(x.s1).slice(0, 24)} · instant: the scale's excursion past its endpoints ${f(x.range, 4)} (bound < ${BOUNCE}), scale in flight ${x.q.smid} frame(s), body in flight ${x.q.mid} frame(s)${x.reg ? `, region in flight ${x.reg.mid} frame(s)` : ""} (bound ≤ 1 each) over ${x.q.frames} frames · legible: ${x.reg ? `region ${f(x.reg.h0, 1)} → ${f(x.reg.h1, 1)} px (bound from ≤ 1 to ≥ ${REGION_LINE}; the face changed ${f(x.frac * 100, 1)} %, printed)` : `${f(x.frac * 100, 1)} % of the face's pixels changed by ≥ ${LUMA_STEP} levels (bound ≥ ${LUMA_FRAC * 100} %)`}${x.pl ? ` · PLANT switched ${x.pl.off} reduce rule(s) off and ${x.pl.on} no-preference rule(s) on` : ""}`;
        if (!cm.stateful) cell(cn, "REPORT", `${(m.gates ?? []).includes("E-2") ? "stateless (no state to show; the action's effect is the consumer's)" : "not a CK-02 commit member (no E-2 gate): its reduce light leg is read by E-3"} · ${line(cm)}`);
        else if (cm.s0 === cm.s1) cell(cn, "FAIL", `NOT DRIVEN: commit(${m.key}) left the state unchanged · ${line(cm)}`);
        else {
          const instant = cm.range < BOUNCE && cm.q.smid <= 1 && cm.q.mid <= 1 && (!cm.reg || cm.reg.mid <= 1);
          const ok = instant && legibleOf(cm);
          if (plant) (ok ? reach.passed : reach.failed).push(`${sc} ${theme}`);
          cell(cn, ok ? "PASS" : "FAIL", `${plant ? "PLANT (the reduce arm removed): " : ""}commit(${m.key}) under reduce · ${instant ? "" : "NOT INSTANT · "}${legibleOf(cm) ? "" : "NOT LEGIBLE · "}${line(cm)}`);
        }
        if (cm.ctl) cell(nm("commit-instant control (Shift)"), legibleOf(cm.ctl) ? "FAIL" : "PASS", `Shift commits nothing; the legibility read must say NOT legible (the read can fail): ${line(cm.ctl)}`);
      }
    }
  }
  if (plant) cell("E-9 PLANT reach", "REPORT", `the reduce arm removed: commit-instant FAILED on ${reach.failed.length} stateful face(s) [${reach.failed.join(", ")}]; NOT REACHED (still passing) on ${reach.passed.length} [${reach.passed.join(", ")}]`);
});
