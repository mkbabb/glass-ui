#!/usr/bin/env node
// cp.mjs · D5 pass 2, seat CP: the commit-path bake-off's four cells on one build, one engine.
//   node cp.mjs --build <dir> --label css|waapi --engine chromium|webkit [--out <dir>] [--themes light,dark] [--cells c1,c2,c3,c4]
// Every read goes through the harness's in-page helpers (../../../harness/lib.mjs: __film, __light, commitArms), so a
// light reading here is the same read E-2's arm iii takes. Cells:
//   c1  a second commit during the crest: one commit filmed alone (the reference), then two commits Δ ms apart
//       (Δ = 45, inside the control-engage attack, and Δ = 100, past it). Read on the face's light layers: the second
//       edge's own rise, the largest one-frame drop (per nominal 16.7 ms frame, as E-10 reads it) against the single
//       commit's own largest drop + 0.002 (D-1), and rest at the end
//   c2  a script press composed with the commit (the Button, the one member whose press is the door's script spring):
//       a 160 ms pointer press then release (the commit fires on the click); and a re-press 40 ms into the commit's
//       light. Read: arm iii on the film, the press's scale floor and the largest one-frame scale step, the light's
//       largest drop
//   c3  a commit before hydration: the member's rendered markup cloned beside it (the library's markup and stylesheet
//       with no script attached: no door, no Vue), its state attribute flipped by a plain DOM write. Read: the clone's
//       light rise
//   c4  reduce: under prefers-reduced-motion, the keyboard commit. Read: arm iii, and the target's and face's scale range
// Each cell line carries the load at its end. Playwright WebKit is not Safari; real Safari UNMEASURED.
import fs from "node:fs";
import path from "node:path";
import { Engine, serveTarget, openPage, commitArms, acquireLock, browserCensus, load, f, parseArgs, KEY_DWELL, isClosed } from "../../../harness/lib.mjs";

const a = parseArgs();
const engine = a.engine === "webkit" ? "webkit" : "chromium";
const label = a.label ?? "build";
const themes = (a.themes ?? "light,dark").split(",");
const cells = new Set((a.cells ?? "c1,c2,c3,c4").split(","));
const out = a.out ? path.resolve(a.out) : null;

const SCENES = {
  switch: { target: '[role="switch"]', face: '[role="switch"] .control-bit__face', key: "Space", root: '[role="switch"]', flip: ["data-state", "unchecked", "checked"] },
  accordion: { target: ".disclosure-trigger", face: ".disclosure-trigger", key: "Enter", root: ".disclosure-trigger", flip: ["data-state", "closed", "open"] },
  button: { target: ".button", face: ".button", key: "Space", root: ".button", flip: ["data-commit", "a", "b"] },
};

// the face's light layers composited over its committed fill (lib.mjs lightRise's "layers" channel), per frame
const linN = (u) => (u <= 0.04045 ? u / 12.92 : ((u + 0.055) / 1.055) ** 2.4);
const lumN = (c) => 0.2126 * linN(c[0]) + 0.7152 * linN(c[1]) + 0.0722 * linN(c[2]);
const overN = (dst, src) => { const k = src[3]; return [0, 1, 2].map((i) => src[i] * k + dst[i] * (1 - k)).concat([1]); };
function series(fr) {
  const F = fr.filter((x) => x.Lx); if (F.length < 3) return [];
  const fin = F.at(-1).Lx; const fillFin = overN(fin.base, fin.fill);
  return F.map((x) => ({ t: x.t, T: x.T, L: Math.min(1, lumN(overN(fillFin, x.Lx.layers)) * x.Lx.br), s: x.a?.s ?? NaN, fs: x.f?.s ?? NaN }));
}
const norm = (d, dt) => (d * 16.7) / Math.max(16.7, dt);
/** the largest one-frame fall of L (per nominal frame) at or after time t0 */
function maxDrop(S, t0 = -1) {
  let m = 0, at = NaN;
  for (let k = 1; k < S.length; k++) if (S[k].t >= t0) { const d = norm(S[k - 1].L - S[k].L, S[k].t - S[k - 1].t); if (d > m) { m = d; at = S[k].t; } }
  return { m, at };
}
/** the rise after t0: the largest L above the lowest L seen after t0 and before it */
function riseAfter(S, t0) {
  const R = S.filter((x) => x.t >= t0); if (!R.length) return NaN;
  let lo = R[0].L, best = 0; for (const x of R) { lo = Math.min(lo, x.L); best = Math.max(best, x.L - lo); }
  return best;
}
const peakOf = (S) => S.reduce((m, x) => Math.max(m, x.L), -Infinity);
const restOf = (S) => { const tail = S.filter((x) => x.t >= S.at(-1).t - 150).map((x) => x.L); return Math.max(...tail) - Math.min(...tail) <= 0.004; };
const scaleRange = (S, k = "s") => { const v = S.map((x) => x[k]).filter(Number.isFinite); return v.length ? Math.max(...v) - Math.min(...v) : NaN; };
const maxStep = (S, k = "s") => { let m = 0; for (let i = 1; i < S.length; i++) { const d = Math.abs(S[i][k] - S[i - 1][k]); if (Number.isFinite(d)) m = Math.max(m, norm(d, S[i].t - S[i - 1].t)); } return m; };

/** film ms on the page while acts run: each act is [delay after the film's first frame, js action name] */
async function film(page, sc, ms, acts, extra = {}) {
  return page.evaluate(({ sc, ms, acts, extra }) => new Promise((ok) => {
    const marks = [];
    const t = () => document.querySelector(extra.target ?? sc.target);
    const run = (act) => {
      const el = t(); const T = performance.now();
      if (act === "click") el.click();
      else if (act === "flip") { const [attr, , to] = extra.flip; el.setAttribute(attr, el.getAttribute(attr) === to ? extra.flip[1] : to); }
      marks.push({ act, T });
    };
    const p = window.__film({ target: extra.target ?? sc.target, face: extra.face ?? sc.face, ms });
    let T0 = null;
    requestAnimationFrame((ts) => { T0 = performance.now(); for (const [d, act] of acts) (d ? setTimeout(() => run(act), d) : run(act)); });
    p.then((r) => ok({ ...r, marks: marks.map((m) => ({ ...m, rel: m.T - T0 })) }));
  }), { sc, ms, acts, extra });
}
/** rebase marks to the film's own clock (fr[].T is performance.now() per frame; fr[].t from its first frame) */
const markT = (r, i) => { const T0 = r.fr[0].T - r.fr[0].t; return r.marks[i] ? r.marks[i].T - T0 : NaN; };

const results = [];
function cell(name, status, line, data = {}) {
  const l = `  ${status.padEnd(9)} ${name} · ${line} · load ${load()}`; console.log(l);
  results.push({ name, status, line, load: load(), ...data });
}

const waited = await acquireLock();
console.log(`# CP ${label} · engine ${engine} · lock wait ${waited.toFixed(1)} s · ${browserCensus()} · load ${load()} at start`);
const T = await serveTarget({ build: a.build });
const E = new Engine(engine); await E.browser();
console.log(`# ${engine} ${E.version}${engine === "webkit" ? " (Playwright WebKit, not Safari; real Safari UNMEASURED (owner's safaridriver checkbox))" : ""}`);
async function withPage(scene, o, fn, tries = 2) {
  for (let k = 0; k < tries; k++) {
    let P;
    try { P = await openPage(E, T, scene, o); const r = await fn(P); await P.close(); return r; }
    catch (e) { try { await P?.close(); } catch {} if (isClosed(e) && k + 1 < tries) { console.log(`  # engine closed (${String(e.message ?? e).slice(0, 100)}); relaunch, re-run once`); await E.kill(); continue; } throw e; }
  }
}

let env = null;
for (const theme of themes) {
  // ── c1 ──
  if (cells.has("c1")) for (const [scene, sc] of Object.entries(SCENES)) {
    await withPage(scene, { theme }, async (P) => {
      env ??= await P.page.evaluate(() => window.__e.envelopes);
      await P.page.waitForTimeout(400);
      const one = await film(P.page, sc, 900, [[0, "click"]]);
      const S1 = series(one.fr); const d1 = maxDrop(S1); const r1 = riseAfter(S1, 0);
      const arms1 = commitArms(one, ["i", "iii"], env);
      cell(`c1 ${theme} ${scene} single`, "REPORT", `rise ${f(r1, 4)} peak ${f(peakOf(S1), 4)} at rest ${restOf(S1)} · largest one-frame drop ${f(d1.m, 4)} · E-2 ${arms1.line.slice(0, 200)}`, { scene, theme, cellId: "c1", kind: "single", rise: r1, drop: d1.m, rest: restOf(S1), iii: arms1.arms?.iii });
      for (const D of [45, 100]) {
        await P.page.waitForTimeout(500);
        const two = await film(P.page, sc, 900, [[0, "click"], [D, "click"]]);
        const S = series(two.fr); const t2 = markT(two, 1);
        const before = S.filter((x) => x.t < t2); const lAt2 = before.at(-1)?.L ?? NaN;
        const r2 = riseAfter(S, t2); const d2 = maxDrop(S, t2);
        // the cut at edge 2: the light just before it, less the lowest light in the 40 ms after it, as a share of
        // the light's height above its committed rest there (1 = the light fell to rest at once; 0 = no fall)
        const rest = S.at(-1).L; const after = S.filter((x) => x.t >= t2 && x.t <= t2 + 40).map((x) => x.L);
        const cut = after.length ? (lAt2 - Math.min(...after)) / Math.max(1e-6, lAt2 - rest) : NaN;
        const anims = two.anims.map((x) => `${x.kind}:${x.props.join("+")}${x.pseudo}@${Math.round(x.dur)}`);
        const n = two.anims.length;
        const ok = d2.m <= d1.m + 0.002 && restOf(S);
        cell(`c1 ${theme} ${scene} second commit at +${D} ms`, ok ? "PASS" : "FAIL",
          `edge 2 at ${f(t2, 1)} ms, light there ${f(lAt2, 4)} (${f(lAt2 - rest, 4)} above rest) · cut at edge 2 ${f(cut, 2)} of it in 40 ms · rise after edge 2 ${f(r2, 4)} (single ${f(r1, 4)}) · largest one-frame drop after edge 2 ${f(d2.m, 4)} at ${f(d2.at, 0)} ms (bound: single's ${f(d1.m, 4)} + 0.002) · peak ${f(peakOf(S), 4)} · at rest ${restOf(S)} · ${n} light animations seen [${[...new Set(anims)].join(", ").slice(0, 160)}] · ${S.length} frames`,
          { scene, theme, cellId: "c1", kind: `D${D}`, t2, lAt2, above: lAt2 - rest, cut, rise2: r2, rise1: r1, drop2: d2.m, dropRef: d1.m, rest: restOf(S), anims: n, seriesL: S.map((x) => [+x.t.toFixed(1), +x.L.toFixed(5)]) });
      }
    });
  }
  // ── c2 ──
  if (cells.has("c2")) {
    const sc = SCENES.button;
    await withPage("button", { theme }, async (P) => {
      env ??= await P.page.evaluate(() => window.__e.envelopes);
      await P.page.waitForTimeout(400);
      const bx = await P.page.locator(sc.target).first().boundingBox();
      const cx = bx.x + bx.width / 2, cy = bx.y + bx.height / 2;
      await P.page.mouse.move(cx, cy); await P.page.waitForTimeout(250);
      // press 160 ms, release (the click commits)
      const fp = P.page.evaluate(() => window.__film({ target: ".button", face: ".button", ms: 1100 }));
      await P.page.waitForTimeout(60); await P.page.mouse.down(); await P.page.waitForTimeout(160); await P.page.mouse.up();
      const r = await fp; const S = series(r.fr); const arms = commitArms(r, ["i", "iii"], env);
      const sMin = Math.min(...S.map((x) => x.s));
      cell(`c2 ${theme} button press 160 ms + commit`, arms.arms?.iii ? "PASS" : "FAIL",
        `press floor ×${f(sMin, 4)} · largest one-frame scale step ${f(maxStep(S), 4)} · light rise ${f(riseAfter(S, 0), 4)} at rest ${restOf(S)} · largest light drop ${f(maxDrop(S).m, 4)} · E-2 ${arms.line.slice(0, 220)}`,
        { scene: "button", theme, cellId: "c2", kind: "press+commit", iii: arms.arms?.iii, sMin, sStep: maxStep(S), drop: maxDrop(S).m, rise: riseAfter(S, 0), seriesL: S.map((x) => [+x.t.toFixed(1), +x.L.toFixed(5), +x.s.toFixed(5)]) });
      await P.page.waitForTimeout(600);
      // the reference: one quick click (30 ms), its light's own largest one-frame drop
      const fr0 = P.page.evaluate(() => window.__film({ target: ".button", face: ".button", ms: 900 }));
      await P.page.waitForTimeout(60); await P.page.mouse.down(); await P.page.waitForTimeout(30); await P.page.mouse.up();
      const S0 = series((await fr0).fr); const ref = maxDrop(S0).m;
      await P.page.waitForTimeout(600);
      // a quick click (commit), then a re-press 40 ms into the commit's light, held 160 ms, released (a second commit)
      const fp2 = P.page.evaluate(() => window.__film({ target: ".button", face: ".button", ms: 1200 }));
      await P.page.waitForTimeout(60);
      await P.page.mouse.down(); await P.page.waitForTimeout(30); await P.page.mouse.up();
      const tUp = Date.now(); await P.page.waitForTimeout(40);
      await P.page.mouse.down(); const tDown2 = Date.now() - tUp; await P.page.waitForTimeout(160); await P.page.mouse.up();
      const r2 = await fp2; const S2 = series(r2.fr);
      const dr = maxDrop(S2); const pk = peakOf(S2);
      cell(`c2 ${theme} button re-press during the commit light`, (dr.m <= ref + 0.002 && restOf(S2)) ? "PASS" : "FAIL",
        `re-press ${tDown2} ms after the first release · light peak ${f(pk, 4)} · largest one-frame light drop ${f(dr.m, 4)} at ${f(dr.at, 0)} ms (bound: a lone click's own ${f(ref, 4)} + 0.002) · scale floor ×${f(Math.min(...S2.map((x) => x.s)), 4)} · largest scale step ${f(maxStep(S2), 4)} · at rest ${restOf(S2)} · ${r2.anims.length} light animations`,
        { scene: "button", theme, cellId: "c2", kind: "re-press", ref, drop: dr.m, peak: pk, rest: restOf(S2), sStep: maxStep(S2), seriesL: S2.map((x) => [+x.t.toFixed(1), +x.L.toFixed(5), +x.s.toFixed(5)]) });
    });
  }
  // ── c3 ──
  if (cells.has("c3")) for (const [scene, sc] of Object.entries(SCENES)) {
    await withPage(scene, { theme }, async (P) => {
      env ??= await P.page.evaluate(() => window.__e.envelopes);
      // the reference: the same member committed in the app (its door attached), in this page
      await P.page.waitForTimeout(400);
      const app = series((await film(P.page, sc, 900, [[0, "click"]])).fr); const riseApp = riseAfter(app, 0);
      await P.page.waitForTimeout(300);
      const info = await P.page.evaluate(({ sc }) => {
        const src = document.querySelector(sc.root); if (!src) return { err: "no root" };
        const c = src.cloneNode(true);
        c.setAttribute("data-cp", "clone"); c.removeAttribute("data-press-armed"); c.removeAttribute("id");
        for (const e of c.querySelectorAll("[id]")) e.removeAttribute("id");
        const box = document.createElement("div"); box.style.cssText = "padding:12px;width:320px"; box.append(c);
        src.closest("[data-scene]")?.append(box) ?? document.body.append(box);
        return { attr: c.getAttribute(sc.flip[0]), cls: c.className };
      }, { sc });
      if (info.err) { cell(`c3 ${theme} ${scene}`, "FAIL", info.err); return; }
      await P.page.waitForTimeout(300);
      const target = `[data-cp="clone"]`;
      const face = scene === "switch" ? `[data-cp="clone"] .control-bit__face` : target;
      // the attribute starts at its released value; a parity clone starts with whatever the door stamped (or none)
      await P.page.evaluate(({ target, sc }) => { const e = document.querySelector(target); e.setAttribute(sc.flip[0], sc.flip[1]); }, { target, sc });
      await P.page.waitForTimeout(300);
      const r = await film(P.page, sc, 900, [[0, "flip"]], { target, face, flip: sc.flip });
      const S = series(r.fr); const arms = commitArms(r, ["i", "iii"], env); const rise = riseAfter(S, 0);
      const k = rise / Math.max(1e-6, riseApp);
      cell(`c3 ${theme} ${scene} markup without script, ${sc.flip[0]} ${sc.flip[1]} → ${sc.flip[2]}`, riseApp < 0.003 ? "UNMEASURED" : k >= 0.5 ? "PAINTS" : k < 0.2 ? "SILENT" : "PARTIAL",
        `clone attr at insert ${info.attr ?? "(none)"} · light rise ${f(rise, 4)} = ${f(k, 2)} × the in-app commit's ${f(riseApp, 4)} peak ${f(peakOf(S), 4)} at rest ${restOf(S)} · ${r.anims.length} light animations · E-2 arm iii ${arms.arms?.iii} · ${S.length} frames`,
        { scene, theme, cellId: "c3", rise, riseApp, k, rest: restOf(S), iii: arms.arms?.iii, anims: r.anims.length });
    });
  }
  // ── c4 ──
  if (cells.has("c4")) for (const [scene, sc] of Object.entries(SCENES)) {
    await withPage(scene, { theme, prm: true }, async (P) => {
      env ??= await P.page.evaluate(() => window.__e.envelopes);
      if (!P.modeOk) { cell(`c4 ${theme} ${scene} PRM`, "UNMEASURED", `MODE NOT APPLIED ${P.modeLine}`); return; }
      await P.page.waitForTimeout(400);
      const s0 = await P.page.evaluate(() => JSON.stringify(window.__e.state?.()));
      await P.page.focus(sc.target);
      await P.page.waitForTimeout(200);
      const fp = P.page.evaluate(({ sc }) => window.__film({ target: sc.target, face: sc.face, ms: 900 }), { sc });
      await P.page.waitForTimeout(40);
      await P.page.keyboard.press(sc.key, KEY_DWELL);
      const r = await fp; const s1 = await P.page.evaluate(() => JSON.stringify(window.__e.state?.()));
      const S = series(r.fr); const arms = commitArms(r, ["i", "iii"], env);
      const driven = s0 !== s1;
      cell(`c4 ${theme} ${scene} PRM keyboard commit`, !driven ? "NOT DRIVEN" : arms.arms?.iii && scaleRange(S) < 0.002 && scaleRange(S, "fs") < 0.002 ? "PASS" : "FAIL",
        `state ${s0} → ${s1} · arm iii ${arms.arms?.iii} · light rise (own read) ${f(riseAfter(S, 0), 4)} · light animations [${[...new Set(r.anims.map((x) => `${x.kind}:${x.props.join("+")}${x.pseudo}@${Math.round(x.dur)}`))].join(", ").slice(0, 140)}] · target scale range ${f(scaleRange(S), 4)} face ${f(scaleRange(S, "fs"), 4)} (bound < 0.002) · E-2 ${arms.line.slice(0, 220)}`,
        { scene, theme, cellId: "c4", driven, iii: arms.arms?.iii, rise: riseAfter(S, 0), anims: r.anims.map((x) => `${x.kind}:${x.props.join("+")}${x.pseudo}@${Math.round(x.dur)}`), sRange: scaleRange(S), fRange: scaleRange(S, "fs") });
    });
  }
}
await E.close(); T.close();
for (const n of E.notes) console.log(`# note: ${n}`);
console.log(`# CP ${label} ${engine} done · load ${load()}`);
if (out) { fs.mkdirSync(out, { recursive: true }); fs.writeFileSync(path.join(out, `cp-${label}-${engine}.json`), JSON.stringify({ label, engine, version: E.version, cells: results }, null, 1)); }
process.exit(0);
