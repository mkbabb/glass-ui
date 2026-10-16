#!/usr/bin/env node
// cc.mjs · D5 pass 2, critic C-CP: an independent re-read of the bake-off's cells 1, 3 and 4, plus a same-task A→B→A
// cell, on one build and one engine. It does NOT use the harness's composite light read (__light / lightRise): it reads
// the light SEAT itself per animation frame, the one quantity both commit paths animate:
//   P = the seat's computed opacity × the alpha of its computed background-color (window.__rgba, the harness parser)
// Seat: the switch's `[data-engage-light]` layer inside its face; the accordion trigger's and the Button's `::after`.
// At either committed rest P = 0 in both builds (CSS: gate 1 over an empty charge, or gate 0 over a full one; WAAPI: gate
// 1 over an empty charge), so P is the commit light's own alpha, free of the face/background composite (CP §3.5 gap).
//   node cc.mjs --build <dir> --label <l> --engine chromium|webkit --out <dir> [--themes light,dark] [--reps 1]
//              [--cells c1,c3,c4,aba] [--plant cut|strip]
// Plants (each must turn its cell's verdict): --plant cut   at the second edge, every running animation in the document
//                                                          is cancelled (a CSS transition then lands at once): c1 must FAIL
//                                             --plant strip the cell-3 clone loses its engage-* classes: c3 must read SILENT
// Each line carries the load at its end. Playwright WebKit is not Safari; real Safari UNMEASURED.
import fs from "node:fs";
import path from "node:path";
import { Engine, serveTarget, openPage, acquireLock, browserCensus, load, f, parseArgs, KEY_DWELL, isClosed } from "../../../harness/lib.mjs";

const a = parseArgs();
const engine = a.engine === "webkit" ? "webkit" : "chromium";
const label = a.label ?? "build";
const themes = (a.themes ?? "light,dark").split(",");
const cells = new Set((a.cells ?? "c1,c3,c4,aba").split(","));
const reps = Number(a.reps ?? 1);
const plant = typeof a.plant === "string" ? a.plant : "";
const out = a.out ? path.resolve(a.out) : null;

const SC = {
  switch: { target: '[role="switch"]', seat: '[role="switch"] [data-engage-light]', pseudo: null, key: "Space", flip: ["data-state", "unchecked", "checked"] },
  accordion: { target: ".disclosure-trigger", seat: ".disclosure-trigger", pseudo: "::after", key: "Enter", flip: ["data-state", "closed", "open"] },
  button: { target: ".button", seat: ".button", pseudo: "::after", key: "Space", flip: ["data-commit", "a", "b"] },
};

const res = [];
const cell = (name, status, line, data = {}) => { const l = `  ${status.padEnd(9)} ${name} · ${line} · load ${load()}`; console.log(l); res.push({ name, status, line, load: load(), ...data }); };

// in-page: film P for ms while acts run ([delay ms after the first frame, act]); acts: click | flip | cancel-all | key
const FILM = ({ sc, ms, acts, seatSel, targetSel }) => new Promise((ok) => {
  const seat = () => document.querySelector(seatSel ?? sc.seat);
  const P = () => { const e = seat(); if (!e) return NaN; const cs = getComputedStyle(e, sc.pseudo); const c = window.__rgba(cs.backgroundColor); return c ? +cs.opacity * c[3] : NaN; };
  const fr = []; const marks = []; let T0 = 0;
  const run = (act) => {
    const el = document.querySelector(targetSel ?? sc.target);
    if (act === "click") el.click();
    else if (act === "flip") { const [at, from, to] = sc.flip; el.setAttribute(at, el.getAttribute(at) === to ? from : to); }
    else if (act === "cancel-all") { el.click(); for (const an of document.getAnimations()) an.cancel(); }
    marks.push({ act, t: performance.now() - T0 });
  };
  const tick = () => { const t = performance.now() - T0; fr.push([t, P(), document.getAnimations().length]); if (t < ms) requestAnimationFrame(tick); else ok({ fr, marks }); };
  requestAnimationFrame(() => { T0 = performance.now(); for (const [d, act] of acts) (d ? setTimeout(() => run(act), d) : run(act)); tick(); });
});
const maxP = (fr, t0 = -1, t1 = 1e9) => fr.filter((x) => x[0] >= t0 && x[0] <= t1).reduce((m, x) => Math.max(m, x[1]), 0);
/** largest one-frame fall of P per nominal 16.7 ms frame, at or after t0 */
const maxDrop = (fr, t0 = -1) => { let m = 0, at = NaN; for (let k = 1; k < fr.length; k++) if (fr[k][0] >= t0) { const d = ((fr[k - 1][1] - fr[k][1]) * 16.7) / Math.max(16.7, fr[k][0] - fr[k - 1][0]); if (d > m) { m = d; at = fr[k][0]; } } return { m, at }; };

const waited = await acquireLock();
console.log(`# C-CP cc ${label} · engine ${engine} · plant ${plant || "none"} · lock wait ${waited.toFixed(1)} s · ${browserCensus()} · load ${load()} at start`);
const T = await serveTarget({ build: a.build });
const E = new Engine(engine); await E.browser();
console.log(`# ${engine} ${E.version}${engine === "webkit" ? " (Playwright WebKit, not Safari; real Safari UNMEASURED (owner's safaridriver checkbox))" : ""}`);
async function withPage(scene, o, fn) {
  for (let k = 0; k < 2; k++) {
    let Pg; try { Pg = await openPage(E, T, scene, o); const r = await fn(Pg); await Pg.close(); return r; }
    catch (e) { try { await Pg?.close(); } catch {} if (isClosed(e) && k === 0) { console.log(`  # engine closed (${String(e.message ?? e).slice(0, 100)}); relaunch, re-run once (NAV/AppSSO class first)`); await E.kill(); continue; } throw e; }
  }
}

try {
  for (let rep = 1; rep <= reps; rep++) for (const theme of themes) {
    // ── c1: a second commit during the light ──
    if (cells.has("c1")) for (const [scene, sc] of Object.entries(SC)) await withPage(scene, { theme }, async (Pg) => {
      await Pg.page.waitForTimeout(400);
      const one = await Pg.page.evaluate(FILM, { sc, ms: 700, acts: [[0, "click"]] });
      const d1 = maxDrop(one.fr); const pk1 = maxP(one.fr);
      for (const D of [45, 100]) {
        await Pg.page.waitForTimeout(500);
        const two = await Pg.page.evaluate(FILM, { sc, ms: 700, acts: [[0, "click"], [D, plant === "cut" ? "cancel-all" : "click"]] });
        const t2 = two.marks[1]?.t ?? NaN;
        const before = two.fr.filter((x) => x[0] < t2); const pAt2 = before.at(-1)?.[1] ?? NaN;
        const after = two.fr.filter((x) => x[0] >= t2 && x[0] <= t2 + 40).map((x) => x[1]);
        const cut = after.length && pAt2 > 1e-4 ? (pAt2 - Math.min(...after)) / pAt2 : NaN;
        const d2 = maxDrop(two.fr, t2); const rise2 = (() => { let lo = Infinity, best = 0; for (const x of two.fr.filter((y) => y[0] >= t2)) { lo = Math.min(lo, x[1]); best = Math.max(best, x[1] - lo); } return best; })();
        const endP = two.fr.at(-1)[1];
        const ok = d2.m <= d1.m + 0.002 && endP < 0.002;
        cell(`c1 r${rep} ${theme} ${scene} +${D}`, ok ? "PASS" : "FAIL",
          `single: peak P ${f(pk1, 4)} own largest drop ${f(d1.m, 4)} · pair: P at edge 2 (${f(t2, 1)} ms) ${f(pAt2, 4)} · cut in 40 ms ${f(cut, 2)} · largest drop after edge 2 ${f(d2.m, 4)} (bound ${f(d1.m + 0.002, 4)}) · rise after edge 2 ${f(rise2, 4)} (${f(rise2 / Math.max(1e-6, pk1), 2)}× single) · end P ${f(endP, 4)} · ${two.fr.length} frames`,
          { rep, theme, scene, D, cut, drop1: d1.m, drop2: d2.m, peak1: pk1, rise2, pAt2, series: two.fr.map((x) => [+x[0].toFixed(1), +x[1].toFixed(5)]), single: one.fr.map((x) => [+x[0].toFixed(1), +x[1].toFixed(5)]) });
      }
    });
    // ── c3: a commit before hydration (a clone with no script; its state attribute written by the DOM) ──
    if (cells.has("c3")) for (const [scene, sc] of Object.entries(SC)) await withPage(scene, { theme }, async (Pg) => {
      await Pg.page.waitForTimeout(400);
      const app = await Pg.page.evaluate(FILM, { sc, ms: 600, acts: [[0, "click"]] });
      await Pg.page.waitForTimeout(400);
      await Pg.page.evaluate(({ sc, strip }) => {
        const src = document.querySelector(sc.target); const c = src.cloneNode(true);
        c.setAttribute("data-cc", "clone"); c.removeAttribute("id");
        if (strip) for (const n of [c, ...c.querySelectorAll("*")]) for (const k of [...n.classList]) if (k.startsWith("engage-")) n.classList.remove(k);
        c.setAttribute(sc.flip[0], sc.flip[1]); src.parentElement.appendChild(c);
      }, { sc, strip: plant === "strip" });
      await Pg.page.waitForTimeout(300);
      const seatSel = sc.pseudo ? '[data-cc="clone"]' : '[data-cc="clone"] [data-engage-light]';
      const cl = await Pg.page.evaluate(FILM, { sc, ms: 600, acts: [[0, "flip"]], seatSel, targetSel: '[data-cc="clone"]' });
      const pa = maxP(app.fr), pc = maxP(cl.fr); const k = pc / Math.max(1e-6, pa);
      cell(`c3 r${rep} ${theme} ${scene} clone`, k >= 0.5 ? "PAINTS" : k < 0.2 ? "SILENT" : "PARTIAL", `in-app peak P ${f(pa, 4)} · clone peak P ${f(pc, 4)} = ${f(k, 2)}× · ${cl.fr.length} frames`, { rep, theme, scene, pa, pc, k });
    });
    // ── c4: reduce, keyboard commit ──
    if (cells.has("c4")) for (const [scene, sc] of Object.entries(SC)) await withPage(scene, { theme, prm: true }, async (Pg) => {
      if (!Pg.modeOk) return cell(`c4 r${rep} ${theme} ${scene} PRM`, "UNMEASURED", `MODE NOT APPLIED ${Pg.modeLine}`);
      await Pg.page.focus(sc.target); await Pg.page.waitForTimeout(300);
      const st0 = await Pg.page.evaluate((sc) => document.querySelector(sc.target).getAttribute(sc.flip[0]), sc);
      const pr = Pg.page.evaluate(FILM, { sc, ms: 600, acts: [] });
      await Pg.page.waitForTimeout(30); await Pg.page.keyboard.press(sc.key, KEY_DWELL);
      const fr = await pr;
      const st1 = await Pg.page.evaluate((sc) => document.querySelector(sc.target).getAttribute(sc.flip[0]), sc);
      const pk = maxP(fr.fr);
      cell(`c4 r${rep} ${theme} ${scene} PRM`, st0 === st1 ? "NOT DRIVEN" : pk >= 0.005 ? "LIGHT" : "NONE", `state ${st0}→${st1} · peak P ${f(pk, 4)} · max animations ${Math.max(...fr.fr.map((x) => x[2]))}`, { rep, theme, scene, pk });
    });
    // ── aba: the state written A→B→A in one task (no commit happened): a light must NOT play ──
    if (cells.has("aba")) for (const scene of ["switch", "accordion"]) await withPage(scene, { theme }, async (Pg) => {
      const sc = SC[scene]; await Pg.page.waitForTimeout(400);
      const r = await Pg.page.evaluate(({ sc }) => new Promise((ok) => {
        const el = document.querySelector(sc.target); const [at, from, to] = sc.flip; const s0 = el.getAttribute(at);
        el.setAttribute(at, s0 === to ? from : to); el.setAttribute(at, s0);
        const seat = document.querySelector(sc.seat); let pk = 0, n = 0; const t0 = performance.now();
        const tick = () => { const cs = getComputedStyle(seat, sc.pseudo); const c = window.__rgba(cs.backgroundColor); pk = Math.max(pk, +cs.opacity * (c ? c[3] : 0)); n = Math.max(n, document.getAnimations().length); if (performance.now() - t0 < 400) requestAnimationFrame(tick); else ok({ pk, n, s: el.getAttribute(at) }); };
        requestAnimationFrame(tick);
      }), { sc });
      cell(`aba r${rep} ${theme} ${scene} A→B→A one task`, r.pk < 0.002 ? "QUIET" : "LIT", `state back to ${r.s} · peak P ${f(r.pk, 4)} · max animations ${r.n}`, { rep, theme, scene, ...r });
    });
  }
} finally {
  await E.close(); T.close();
  if (out) { fs.mkdirSync(out, { recursive: true }); fs.writeFileSync(path.join(out, `cc-${label}-${engine}${plant ? "-" + plant : ""}.json`), JSON.stringify({ label, engine, version: E.version, plant, results: res }, null, 1)); }
  console.log(`# end · load ${load()}`);
}
