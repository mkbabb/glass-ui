#!/usr/bin/env node
// C-A10 adversarial probe (D5 pass 10, a fresh critic of HEAD + pass-10/P-E10.patch). Not a witness. Each cell is scored in C-A10.md against the CK row it would
// break or placed as a next-pass class. The harness's own scene app and lib: one browser per run, a fresh context per cell, every page and context closed in a finally,
// the browser closed by witness(); WebKit retires its browser every NAV_CAP navigations. Films read per frame in a task posted from requestAnimationFrame (after that
// frame's paint), as E-10's sideFilm does; `film` alone decodes a recording. Paths P-E10 §8 item 2 says no cell drives, and paths off H10's transforms:
//   side <tf> · page|carry   E-10's side film under `zoom: 0.8`, `zoom: 1.25`, `scale: 1.25`, an ancestor `translate`. Same read as `loupe side`: changes, step, bound (span × row + 1), off window, across, ends.
//   clock <tf> · enter|exit  the pinned edge per frame while opacity > 0.05, same transforms.
//   reverse <k> · none|scale carried past the line, then k frames into the travel carried back across the band: the lens turns back mid-travel. Step and continuity.
//   wheel · none|scale       a fine hold, real wheel ticks over the thumb crossing the line (the path §P9-0 names).
//   release-mid · none|scale the hold released inside the side's travel: the lens's exit with its travel running.
//   exit-side · none|scale   the hold released at the line, then the scroller carried across the line inside the exit: a side change while on the exit clock.
//   rerender · up|down       a childList mutation above the slider carries the track across the line: host glide and lens travel together.
//   press-line · <off>       a press with the track `off` px from the line (the grow's own reach crossing it during the raise).
//   noroom · <h>             a viewport of h px (no room above, then neither side).
//   repress · none           a release below the line, a press again inside the exit.
//   film · none|scale        a recorded film of the side change on `carry`: lens blue, track red, one column; per decoded frame the lens's centre against the track's top. Monotonic? Largest step.
//   loud · <token> <value>   CK-21 on the travel's tokens: planted on <html> before any script; a side change and a re-render driven; console errors and page errors read; the lens's state after.
const H = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
const { witness, openPage, scenesFor, center, f, INIT } = await import(`${H}/lib.mjs`);
const NOM = 1000 / 60;
const perFrame = (d, dt) => (d * NOM) / Math.max(NOM, dt);
const TF = { none: null, scale: { scale: "0.8", transformOrigin: "0 0" }, zoom08: { zoom: "0.8" }, zoom125: { zoom: "1.25" }, zoom2: { zoom: "2" }, zoom25: { zoom: "2.5" }, scale125: { scale: "1.25", transformOrigin: "0 0" }, translate: { translate: "13px 7px" } };
// E-10's rowsOf / curveOf / rowFacts, copied unchanged in substance: the bound is the row the running animation's clock names.
const rowsOf = () => { const names = new Set(); const walk = (rules) => { for (const r of rules) { if (r.style) for (let i = 0; i < r.style.length; i++) { const m = r.style[i].match(/^--spring-([a-z]+)-duration$/); if (m) names.add(m[1]); } if (r.cssRules) walk(r.cssRules); } };
  for (const sh of document.styleSheets) { try { walk(sh.cssRules); } catch {} }
  const p = document.createElement("div"); document.body.appendChild(p); const out = [];
  for (const n of names) { p.style.cssText = `transition-duration: var(--spring-${n}-duration) !important; transition-timing-function: var(--spring-${n}) !important`; const cs = getComputedStyle(p); const d = Number.parseFloat(cs.transitionDuration); out.push({ n, ms: /ms/.test(cs.transitionDuration) ? d : d * 1000, ease: cs.transitionTimingFunction }); }
  p.remove(); return out; };
const curveOf = (ease) => { const m = /^linear\((.*)\)$/.exec(ease.trim()); if (!m) return null; const stops = m[1].split(",").map((x) => { const [v, ...ps] = x.trim().split(/\s+/); return { v: Number.parseFloat(v), p: ps.length ? Number.parseFloat(ps[0]) / 100 : null }; });
  if (stops[0].p == null) stops[0].p = 0; if (stops.at(-1).p == null) stops.at(-1).p = 1; for (let i = 1; i < stops.length - 1; i++) if (stops[i].p == null) { let j = i; while (stops[j].p == null) j++; for (let k = i; k < j; k++) stops[k].p = stops[i - 1].p + ((stops[j].p - stops[i - 1].p) * (k - i + 1)) / (j - i + 1); }
  return (t) => { if (t <= 0) return stops[0].v; if (t >= 1) return stops.at(-1).v; for (let i = 1; i < stops.length; i++) if (t <= stops[i].p) { const a = stops[i - 1], b = stops[i]; return b.p === a.p ? b.v : a.v + ((b.v - a.v) * (t - a.p)) / (b.p - a.p); } return stops.at(-1).v; }; };
const rowFacts = (row) => { const c = curveOf(row.ease); if (!c || !(row.ms > 0)) return { ...row, peak: NaN, over: NaN }; const fr = NOM / row.ms; let peak = 0, over = 0; for (let t = 0; t < 1; t += fr / 8) { peak = Math.max(peak, Math.abs(c(t + fr) - c(t))); over = Math.max(over, c(t) - 1); } return { ...row, peak, over }; };

// The generic film. `script` steps: each frame the driver's `plan(n, st)` says how far to move; reads post-frame.
const FILM = ([L, drive, B, planSrc, frames, afterMs]) => new Promise((ok) => {
  const q = (x) => document.querySelector(x); const b = B ? q(B) : null; let top = b ? Number.parseFloat(b.style.top) || 0 : 0;
  const move = (dy) => { if (!dy) return; if (drive === "page") scrollBy(0, -dy); else { top += dy; b.style.top = `${top}px`; } };
  const out = []; const ch = new MessageChannel(); let n = 0; const t0 = performance.now(); const plan = eval(planSrc);
  ch.port1.onmessage = () => { const l = q(L.lens), t = q(L.track); if (!l || !t) { out.push({ n, t: performance.now() - t0, gone: true }); return; } const a1 = l.getBoundingClientRect(), d = t.getBoundingClientRect(); const rel = a1.top + a1.height / 2 - (d.top + d.height / 2);
    out.push({ n, t: performance.now() - t0, rel, pin: rel < 0 ? a1.bottom - d.top : a1.top - d.bottom, dx: a1.left + a1.width / 2 - (d.left + d.width / 2), lt: a1.top, lb: a1.bottom, tt: d.top, H: a1.height, edge: (l.hasAttribute("data-engage-lens-below") ? a1.top : a1.bottom) - d.top, op: +getComputedStyle(l).opacity, sc: getComputedStyle(l).scale, below: l.hasAttribute("data-engage-lens-below"), eng: !!q("[data-engaged]"), an: l.getAnimations().filter((x) => x.playState === "running").map((x) => x.transitionProperty ?? "waapi") }); };
  const l0 = q(L.lens), t1 = q(L.track); if (!l0 || !t1) { ok({ out, none: true }); return; }
  const st = { H0: l0.getBoundingClientRect().height, line: t1.getBoundingClientRect().top - l0.getBoundingClientRect().height, vh: innerHeight };
  let tEnd = 0;
  const tick = () => { n++; const last = out.at(-1); const dy = n <= frames ? plan(n, st, last, out) : 0; move(dy); ch.port2.postMessage(0); if (n > frames && !tEnd) tEnd = performance.now() + afterMs; if (tEnd && performance.now() >= tEnd) setTimeout(() => ok({ out, ...st }), 50); else requestAnimationFrame(tick); };
  requestAnimationFrame(tick);
});
const readSide = (r, rows, skip = 0) => { const S = r.out.filter((x) => !x.gone && x.rel != null).slice(skip); const facts = rows.map(rowFacts); const dock = facts.find((x) => x.n === "dock"); let changes = 0, step = 0, at = 0, topjump = 0;
  for (let i = 1; i < S.length; i++) { if (S[i].rel > 0 !== S[i - 1].rel > 0 && false) {} if (S[i].below !== S[i - 1].below) changes++; const d = perFrame(Math.abs(S[i].rel - S[i - 1].rel), S[i].t - S[i - 1].t); if (d > step) { step = d; at = i; } }
  const span = S.length ? Math.max(...S.map((x) => x.rel)) - Math.min(...S.map((x) => x.rel)) : 0; const bound = span * (dock?.peak ?? 0) + 1; const off = S.filter((x) => Math.abs(x.pin) > 2); const end = S.at(-1) ?? {}; const dxMax = S.length ? Math.max(...S.map((x) => Math.abs(x.dx))) : NaN;
  const rels = S.map((x) => +x.rel.toFixed(1)); const above = S.length ? Math.max(0, ...S.map((x) => -x.lt)) : 0; const sep = S.length ? 2 * Math.abs(S.at(-1).rel) : 0;
  return { above, sep, boundSep: sep * (dock?.peak ?? 0) + 1, n: S.length, changes, step, atT: S[at]?.t, atN: at, span, bound, peak: dock?.peak, ms: dock?.ms, off: off.length, win: off.length ? off.at(-1).t - off[0].t : 0, worstOff: off.length ? Math.max(...off.map((x) => Math.abs(x.pin))) : 0, end, dxMax, vh: r.vh, whole: end.lt >= -0.5 && end.lb <= (r.vh ?? 500) + 0.5, rels };
};

await witness("C-A10 probe", "C-A10's adversarial cells on the lens: off H10's transforms, inside the travel, on the exit, on a real wheel, in paint, and fail-loud on the travel's tokens", async ({ a, E, T, cell, guard, idx, engine }) => {
  const only = typeof a.only === "string" ? new Set(a.only.split(",")) : null; const want = (k) => !only || only.has(k);
  const frames = typeof a.frames === "string" ? a.frames : null; if (frames) fs.mkdirSync(frames, { recursive: true });
  const label = typeof a.label === "string" ? a.label : "c";
  const [sc, m] = scenesFor(idx, "E-13").find(([, x]) => x.loupe && x.clip); const [scP, mP] = scenesFor(idx, "E-13").find(([, x]) => x.loupe && !x.clip) ?? [sc, m];
  const L = m.loupe; const thumb = m.thumb ?? '[data-e~="thumb"]'; const thumbP = mP.thumb ?? '[data-e~="thumb"]';
  const setupCarry = (page, css, y0 = 170) => page.evaluate(([B, Q, css, y0]) => { const b = document.querySelector(B); if (css) Object.assign(b.style, css); b.style.position = "relative"; const q = document.querySelector(Q); const br = b.getBoundingClientRect(), k = br.height / b.offsetHeight, rr = q.getBoundingClientRect(); b.scrollTop += (rr.top - (br.top + b.clientTop * k + 6)) / k; const y = b.getBoundingClientRect().top; b.style.top = `${(y0 - y) / (css?.zoom ? +css.zoom : 1)}px`; }, [m.clip.box, m.clip.rest, css, y0]);
  const setupPage = (page, css, top = 230) => page.evaluate(([root, css, top]) => { const mn = document.querySelector("main") ?? document.body; mn.style.paddingTop = `${top}px`; mn.style.paddingBottom = "1600px"; if (css) Object.assign(document.querySelector(root).parentElement.style, css); }, [mP.root ?? '[data-e~="root"]', css, top]);
  const hold = async (P, ms = 900, th = thumb) => { const c = await center(P.page, th); await P.page.mouse.move(c.x, c.y); await P.page.mouse.down(); await P.page.waitForTimeout(ms); };
  const line = (r, v, extra = "") => `${v.changes} change(s) · largest one-frame move against the track ${f(v.step, 1)} px per 16.7 ms at frame ${v.atN} (+${f(v.atT, 0)} ms); bound ${f(v.bound, 1)} = span ${f(v.span, 1)} × dock ${f(v.peak, 3)} + 1 · off its edge > 2 px on ${v.off} frames over ${f(v.win, 0)} ms (worst ${f(v.worstOff, 1)} px; bound one window ≤ ${f((v.ms ?? 0) * 1.5 + 150, 0)} ms) · across ${f(v.dxMax, 1)} px · end pin ${f(v.end?.pin, 1)} px, rel ${f(v.end?.rel, 1)}, whole ${v.whole} (lens ${f(v.end?.lt, 1)}..${f(v.end?.lb, 1)} of ${v.vh}), at most ${f(v.above, 1)} px above the viewport on any frame ${extra}`;
  const verdict = (v, maxCh = 1) => v.changes <= maxCh && v.step <= v.bound && Math.abs(v.end?.pin ?? 99) <= 2 && v.dxMax <= 2 && v.whole && v.above <= 2;

  // ── side under the transforms H10 does not carry ──
  if (want("side")) for (const tf of ["none", "zoom08", "zoom125", "zoom2", "scale125", "translate"]) for (const drive of ["page", "carry"]) {
    const name = `CA10 side · ${tf} · ${drive}`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, drive === "page" ? scP : sc, {});
      try {
        if (drive === "page") await setupPage(P.page, TF[tf]); else await setupCarry(P.page, TF[tf]);
        await P.page.waitForTimeout(250); const rows = await P.page.evaluate(rowsOf); await hold(P, 900, drive === "page" ? thumbP : thumb);
        try { const rate = drive === "page" ? 3 : 2; const film = await P.page.evaluate(FILM, [L, drive, drive === "carry" ? m.clip.box : null, `(n, st, last) => (last && last.tt - last.H < -40 ? 0 : -${rate})`, 160, 700]); return { ...film, rows, errs: P.errors.length }; } finally { await P.page.mouse.up(); }
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed || r.none) { cell(name, "FAIL", r.line ?? "NO LOUPE"); continue; }
    const v = readSide(r, r.rows); const driven = v.changes >= 1;
    cell(name, !driven ? "UNMEASURED" : verdict(v) ? "PASS" : "FAIL", `${driven ? "" : "NOT DRIVEN (no change) · "}${line(r, v)} · rel around the worst frame [${v.rels.slice(Math.max(0, v.atN - 2), v.atN + 6).join(" ")}]`);
  }

  // ── clocks under those transforms ──
  if (want("clock")) for (const tf of ["zoom08", "zoom125", "zoom2", "zoom25", "scale125", "translate"]) {
    const name = `CA10 clock · ${tf}`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, sc, {});
      try {
        await setupCarry(P.page, TF[tf], 220); await P.page.waitForTimeout(250);
        const c = await center(P.page, thumb); await P.page.mouse.move(c.x, c.y);
        // the film starts before the press, so the raise's frames are read; the release comes at +700 ms from node
        const film = P.page.evaluate(FILM, [L, "carry", m.clip.box, "(n) => 0", 1, 0]).catch(() => null);
        const clock = P.page.evaluate((L) => new Promise((ok) => { const out = []; const ch = new MessageChannel(); const t0 = performance.now(); ch.port1.onmessage = () => { const l = document.querySelector(L.lens), t = document.querySelector(L.track); if (l && t) { const a = l.getBoundingClientRect(), d = t.getBoundingClientRect(); const cs = getComputedStyle(l); const below = l.hasAttribute("data-engage-lens-below"); out.push({ t: performance.now() - t0, pin: below ? a.top - d.bottom : a.bottom - d.top, dx: a.left + a.width / 2 - (d.left + d.width / 2), op: +cs.opacity, sc: cs.scale, eng: !!document.querySelector("[data-engaged]") }); } }; const tick = () => { ch.port2.postMessage(0); if (performance.now() - t0 < 1500) requestAnimationFrame(tick); else setTimeout(() => ok(out), 40); }; requestAnimationFrame(tick); }), L);
        await P.page.mouse.down(); await P.page.waitForTimeout(700); await P.page.mouse.up(); const out = await clock; await film; return { out };
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed) { cell(name, "FAIL", r.line); continue; }
    const vis = r.out.filter((x) => x.op > 0.05); const en = vis.filter((x) => x.eng), ex = vis.filter((x) => !x.eng); const worst = (s) => s.reduce((p, x) => (Math.abs(x.pin) > Math.abs(p) ? x.pin : p), 0);
    const inflight = (s) => s.filter((x) => x.sc !== "1").length; const ok = Math.abs(worst(en)) <= 2 && Math.abs(worst(ex)) <= 2 && inflight(en) > 0 && inflight(ex) > 0;
    cell(name, inflight(en) + inflight(ex) === 0 ? "UNMEASURED" : ok ? "PASS" : "FAIL", `raise ${en.length} frames (${inflight(en)} in flight), worst pin ${f(worst(en), 1)} px · exit ${ex.length} frames (${inflight(ex)} in flight), worst pin ${f(worst(ex), 1)} px · across worst ${f(Math.max(0, ...vis.map((x) => Math.abs(x.dx))), 1)} px`);
  }

  // ── the lens turned back inside its travel ──
  if (want("reverse")) for (const tf of ["none", "scale", "zoom08"]) for (const k of [3, 6, 10]) {
    const name = `CA10 reverse · ${tf} · ${k} frames in`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, sc, {});
      try {
        await setupCarry(P.page, TF[tf]); await P.page.waitForTimeout(250); const rows = await P.page.evaluate(rowsOf); await hold(P);
        try { const film = await P.page.evaluate(FILM, [L, "carry", m.clip.box, `(() => { let at = 0, back = 0; return (n, st, last) => { if (last && last.below && !at) at = n; if (!at) return -2; const i = n - at; if (i === ${k}) { back = 1; return 40; } return 0; }; })()`, 200, 700]); return { ...film, rows }; } finally { await P.page.mouse.up(); }
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed || r.none) { cell(name, "FAIL", r.line ?? "NO LOUPE"); continue; }
    const v = readSide(r, r.rows); const driven = v.changes === 2;
    cell(name, !driven ? "UNMEASURED" : v.step <= v.boundSep && Math.abs(v.end?.pin ?? 99) <= 2 ? "PASS" : "FAIL", `${driven ? "" : "NOT DRIVEN (not two changes) · "}bound of record ${f(v.boundSep, 1)} = the sides' separation ${f(v.sep, 1)} × dock + 1 · ${line(r, v)} · rel around the worst frame [${v.rels.slice(Math.max(0, v.atN - 3), v.atN + 6).join(" ")}]`);
  }

  // ── a real wheel across the line ──
  if (want("wheel")) for (const tf of ["none", "scale"]) {
    const name = `CA10 wheel · ${tf}`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, scP, {});
      try {
        await setupPage(P.page, TF[tf]); await P.page.waitForTimeout(250); const rows = await P.page.evaluate(rowsOf); await hold(P, 900, thumbP);
        try {
          const film = P.page.evaluate(FILM, [L, "none-wheel", null, "(n) => 0", 1, 1900]);
          let after = -1; for (let i = 0; i < 80 && after < 8; i++) { await P.page.mouse.wheel(0, 8); await P.page.waitForTimeout(16); if (after >= 0) after++; else if (await P.page.evaluate((Lens) => document.querySelector(Lens)?.hasAttribute("data-engage-lens-below"), L.lens)) after = 0; }
          return { ...(await film), rows };
        } finally { await P.page.mouse.up(); }
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed || r.none) { cell(name, "FAIL", r.line ?? "NO LOUPE"); continue; }
    const v = readSide(r, r.rows); cell(name, v.changes < 1 ? "UNMEASURED" : verdict(v) ? "PASS" : "FAIL", `${v.changes < 1 ? "NOT DRIVEN (no change) · " : ""}8 px wheel ticks 16 ms apart until 8 past the change, 16 ms apart, over the held thumb · ${line(r, v)}`);
  }

  // ── a release inside the travel ──
  if (want("release-mid")) for (const tf of ["none", "scale"]) {
    const name = `CA10 release-mid · ${tf}`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, sc, {});
      try {
        await setupCarry(P.page, TF[tf]); await P.page.waitForTimeout(250); const rows = await P.page.evaluate(rowsOf); await hold(P);
        const film = P.page.evaluate(FILM, [L, "carry", m.clip.box, `(n, st, last) => { if (last && last.below) { window.__chg = true; return 0; } return -2; }`, 160, 900]);
        await P.page.waitForFunction(() => window.__chg === true, null, { timeout: 15000, polling: 5 }).catch(() => {}); await P.page.mouse.up();
        return { ...(await film), rows };
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed || r.none) { cell(name, "FAIL", r.line ?? "NO LOUPE"); continue; }
    const S = r.out.filter((x) => !x.gone && x.rel != null); const facts = r.rows.map(rowFacts).find((x) => x.n === "dock"); const vis = S.filter((x) => x.op > 0.05);
    let step = 0, at = 0; for (let i = 1; i < vis.length; i++) { const d = perFrame(Math.abs(vis[i].rel - vis[i - 1].rel), vis[i].t - vis[i - 1].t); if (d > step) { step = d; at = i; } }
    const span = 2 * Math.abs(vis[0]?.rel ?? 0), bound = span * facts.peak + 1; const relFrame = vis.findIndex((x) => !x.eng); const chg = vis.findIndex((x) => x.below);
    const endVis = vis.at(-1);
    cell(name, chg < 0 || relFrame < 0 ? "UNMEASURED" : step <= bound ? "PASS" : "FAIL", `change at visible frame ${chg}, release at ${relFrame} (${relFrame - chg} frames into the travel) · largest step while visible ${f(step, 1)} px per 16.7 ms at frame ${at} (bound ${f(bound, 1)}) · last visible frame rel ${f(endVis?.rel, 1)}, pin ${f(endVis?.pin, 1)} px, opacity ${f(endVis?.op, 2)} · a travel still running at the release: ${vis[relFrame]?.an?.includes("waapi")}`);
  }

  // ── a side change on the exit clock ──
  if (want("exit-side")) for (const tf of ["none", "scale"]) {
    const name = `CA10 exit-side · ${tf}`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, scP, {});
      try {
        await setupPage(P.page, TF[tf]); await P.page.waitForTimeout(250); const rows = await P.page.evaluate(rowsOf); await hold(P, 900, thumbP);
        // scrolled to 3 px above the line, waits for the release, then 4 px a frame across it: a scroll event, which the released lens hears
        const film = P.page.evaluate(FILM, [L, "page", null, `(n, st, last) => { if (!last) return 0; const room = last.tt - last.H; if (last.eng) { if (room > 3) return -2; window.__at = true; return 0; } return -4; }`, 260, 300]);
        await P.page.waitForFunction(() => window.__at === true, null, { timeout: 15000, polling: 5 }).catch(() => {}); await P.page.waitForTimeout(60); await P.page.mouse.up();
        return { ...(await film), rows };
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed || r.none) { cell(name, "FAIL", r.line ?? "NO LOUPE"); continue; }
    const S = r.out.filter((x) => !x.gone && x.rel != null); const vis = S.filter((x) => x.op > 0.05 && !x.eng); const facts = r.rows.map(rowFacts).find((x) => x.n === "dock"); let chg = 0, step = 0, stepE = 0; for (let i = 1; i < vis.length; i++) { if (vis[i].below !== vis[i - 1].below) chg++; else stepE = Math.max(stepE, perFrame(Math.abs(vis[i].edge - vis[i - 1].edge), vis[i].t - vis[i - 1].t)); step = Math.max(step, perFrame(Math.abs(vis[i].rel - vis[i - 1].rel), vis[i].t - vis[i - 1].t)); }
    const span = 2 * Math.abs(S.find((x) => x.eng)?.rel ?? 0), bound = span * facts.peak + 1;
    cell(name, chg < 1 ? "UNMEASURED" : stepE <= bound ? "PASS" : "FAIL", `${chg < 1 ? "NOT DRIVEN (no change on the exit clock) · " : ""}released 3 px above the line, scrolled 4 px a frame on the exit clock: ${vis.length} visible exit frames, ${chg} change(s) · largest step of the pinned edge against the track, the change's own frame apart, ${f(stepE, 1)} px per 16.7 ms (bound ${f(bound, 1)} = separation ${f(span, 1)} × dock + 1); centre's largest ${f(step, 1)} px · opacity at the change ${f(vis.find((x, i) => i && x.below !== vis[i - 1].below)?.op, 2)} · edge [${vis.map((x) => +x.edge.toFixed(0)).join(" ")}] · below [${vis.map((x) => (x.below ? 1 : 0)).join("")}]`);
  }

  // ── a re-render carries the track across the line ──
  if (want("rerender")) for (const dir of ["up", "down"]) for (const tf of ["none", "scale"]) {
    const name = `CA10 rerender · ${dir} · ${tf}`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, scP, {});
      try {
        // the lens's height read at rest is not available before the hold: place the track by the line once held, by a spacer's style write, then mutate
        await setupPage(P.page, TF[tf], 200); await P.page.evaluate((root) => { document.documentElement.style.overflowAnchor = "none"; const h = document.querySelector(root).parentElement; const blk = document.createElement("div"); blk.id = "ca10-blk"; blk.style.height = "60px"; h.parentElement.insertBefore(blk, h); }, mP.root ?? '[data-e~="root"]');
        await P.page.waitForTimeout(250); const rows = await P.page.evaluate(rowsOf); await hold(P, 900, thumbP);
        try {
          const below0 = await P.page.evaluate(([L, dir]) => { const l = document.querySelector(L.lens), t = document.querySelector(L.track).getBoundingClientRect(), lh = l.getBoundingClientRect().height; const room = t.top - lh; scrollBy(0, dir === "up" ? room - 12 : room + 12); return { room }; }, [L, dir]);
          await P.page.waitForTimeout(350);
          // up: the block removed, the track rises 60 px across the line; down: the block doubled from below the line
          const film = await P.page.evaluate(FILM, [L, "none", null, `(n) => { if (n === 6) { const blk = document.getElementById("ca10-blk"); if (${JSON.stringify(dir)} === "up") blk.remove(); else { const b2 = document.createElement("div"); b2.style.height = "60px"; blk.after(b2); } } return 0; }`, 8, 900]);
          return { ...film, rows, below0 };
        } finally { await P.page.mouse.up(); }
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed || r.none) { cell(name, "FAIL", r.line ?? "NO LOUPE"); continue; }
    const v = readSide(r, r.rows); cell(name, v.changes !== 1 ? "UNMEASURED" : v.step <= v.bound && Math.abs(v.end?.pin ?? 99) <= 2 ? "PASS" : "FAIL", `${v.changes !== 1 ? "NOT DRIVEN (not one change) · " : ""}${line(r, v)} · rel around the worst frame [${v.rels.slice(Math.max(0, v.atN - 3), v.atN + 6).join(" ")}]`);
  }

  // ── a press at the line ──
  if (want("press-line")) for (const off of [-3, 0, 1, 3, 6, 9, 12]) {
    const name = `CA10 press-line · ${off} px`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, sc, {});
      try {
        await setupCarry(P.page, null); await P.page.waitForTimeout(250); const rows = await P.page.evaluate(rowsOf);
        // read the lens's height once (a first hold), then place the track off px past the line and press afresh
        await hold(P, 500); const lh = await P.page.evaluate((L) => document.querySelector(L.lens).offsetHeight, L); await P.page.mouse.up(); await P.page.waitForTimeout(700);
        await P.page.evaluate(([B, Tk, lh, off]) => { const b = document.querySelector(B), t = document.querySelector(Tk).getBoundingClientRect(); b.style.top = `${(Number.parseFloat(b.style.top) || 0) - (t.top - lh - off)}px`; }, [m.clip.box, L.track, lh, off]);
        await P.page.waitForTimeout(150); const c = await center(P.page, thumb); await P.page.mouse.move(c.x, c.y);
        const film = P.page.evaluate(FILM, [L, "carry", m.clip.box, "(n) => 0", 1, 0]).catch(() => null);
        const clock = P.page.evaluate((L) => new Promise((ok) => { const out = []; const ch = new MessageChannel(); const t0 = performance.now(); ch.port1.onmessage = () => { const l = document.querySelector(L.lens), t = document.querySelector(L.track); if (l && t) { const a = l.getBoundingClientRect(), d = t.getBoundingClientRect(); const rel = a.top + a.height / 2 - (d.top + d.height / 2); out.push({ t: performance.now() - t0, rel, below: l.hasAttribute("data-engage-lens-below"), op: +getComputedStyle(l).opacity, lt: a.top, pin: l.hasAttribute("data-engage-lens-below") ? a.top - d.bottom : a.bottom - d.top }); } }; const tick = () => { ch.port2.postMessage(0); if (performance.now() - t0 < 1000) requestAnimationFrame(tick); else setTimeout(() => ok(out), 40); }; requestAnimationFrame(tick); }), L);
        await P.page.mouse.down(); const out = await clock; await film; await P.page.mouse.up(); return { out, lh };
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed) { cell(name, "FAIL", r.line); continue; }
    const S = r.out; let ch = 0; for (let i = 1; i < S.length; i++) if (S[i].below !== S[i - 1].below) ch++;
    const pinOff = S.filter((x) => x.op > 0.05 && Math.abs(x.pin) > 2);
    cell(name, ch <= 1 ? "PASS" : "FAIL", `the track ${off} px past the line (lens ${r.lh} px) when pressed · ${S.length} frames, side changes in the raise ${ch}, first below ${S[0]?.below}, last below ${S.at(-1)?.below}; top of the lens min ${f(Math.min(...S.map((x) => x.lt)), 1)} px; ${pinOff.length} visible frames off its edge > 2 px (worst ${f(pinOff.reduce((p, x) => Math.max(p, Math.abs(x.pin)), 0), 1)}, opacity there ${f(pinOff[0]?.op, 2)})`);
  }

  // ── no room ──
  if (want("noroom")) for (const h of [150, 90, 60]) {
    const name = `CA10 noroom · ${h} px viewport`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, scP, { vp: { width: 700, height: h } });
      try {
        await setupPage(P.page, null, 20); await P.page.waitForTimeout(250); await hold(P, 800, thumbP);
        const x = await P.page.evaluate((L) => { const l = document.querySelector(L.lens), t = document.querySelector(L.track); if (!l || !t) return null; const a = l.getBoundingClientRect(), d = t.getBoundingClientRect(); return { lt: a.top, lb: a.bottom, tt: d.top, tb: d.bottom, below: l.hasAttribute("data-engage-lens-below"), vh: innerHeight }; }, L);
        if (frames) await P.page.screenshot({ path: path.join(frames, `${label}-${engine}-noroom-${h}.png`) });
        await P.page.mouse.up(); return { x };
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed) { cell(name, "REPORT", r.line); continue; }
    cell(name, "REPORT", r.x ? `track ${f(r.x.tt, 1)}..${f(r.x.tb, 1)} · lens ${f(r.x.lt, 1)}..${f(r.x.lb, 1)} (below ${r.x.below}) of a ${r.x.vh} px viewport · rows out ${f(Math.max(0, -r.x.lt) + Math.max(0, r.x.lb - r.x.vh), 1)} px` : "no lens");
  }

  // ── press again inside the exit, after a side change ──
  if (want("repress")) {
    const name = "CA10 repress · below, released, pressed inside the exit";
    const r = await guard(name, async () => {
      const P = await openPage(E, T, sc, {});
      try {
        await setupCarry(P.page, null); await P.page.waitForTimeout(250); await hold(P);
        await P.page.evaluate(FILM, [L, "carry", m.clip.box, "(n) => -3", 60, 400]);
        const c = await center(P.page, thumb); await P.page.mouse.up(); await P.page.waitForTimeout(40); await P.page.mouse.move(c.x, c.y); await P.page.mouse.down(); await P.page.waitForTimeout(500);
        const x = await P.page.evaluate((L) => { const l = document.querySelector(L.lens), t = document.querySelector(L.track); if (!l || !t) return null; const a = l.getBoundingClientRect(), d = t.getBoundingClientRect(); return { below: l.hasAttribute("data-engage-lens-below"), pin: l.hasAttribute("data-engage-lens-below") ? a.top - d.bottom : a.bottom - d.top, op: +getComputedStyle(l).opacity, lt: a.top, sc: getComputedStyle(l).scale }; }, L);
        await P.page.mouse.up(); return { x };
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed) { cell(name, "FAIL", r.line); } else cell(name, r.x && Math.abs(r.x.pin) <= 2 && r.x.op > 0.9 ? "PASS" : "FAIL", r.x ? `below ${r.x.below}, pin ${f(r.x.pin, 1)} px, opacity ${f(r.x.op, 2)}, top ${f(r.x.lt, 1)} px` : "no lens after the re-press");
  }

  // ── the travel in paint ──
  if (want("film")) for (const [tf, css] of [["none", null], ["scale", TF.scale], ["zoom08", TF.zoom08]]) {
    const name = `CA10 film · ${tf}`;
    const r = await guard(name, async () => {
      const vdir = fs.mkdtempSync(path.join(os.tmpdir(), "ca10film-"));
      try {
        const b = await E.nav(); const runs = [];
        for (let i = 0; i < 3; i++) {
          const ctx = await b.newContext({ viewport: { width: 700, height: 500 }, deviceScaleFactor: 1, reducedMotion: "no-preference", recordVideo: { dir: vdir, size: { width: 700, height: 500 } } });
          let page, x = null, t0 = 0;
          try {
            page = await ctx.newPage(); t0 = Date.now(); await page.addInitScript(INIT);
            await page.goto(`${T.url}?${new URLSearchParams({ scene: sc, theme: "light" })}`);
            await page.waitForFunction(() => window.__e && window.__e.ready === true, null, { timeout: 60000 });
            await page.evaluate(([L]) => { const st = document.createElement("style"); st.textContent = `${L.lens} { background: rgb(0,0,230) !important; box-shadow: none !important; border-color: rgb(0,0,230) !important; backdrop-filter: none !important; -webkit-backdrop-filter: none !important; } ${L.lens} > * { visibility: hidden !important; } ${L.track} { background: rgb(230,0,0) !important; box-shadow: none !important; border-color: rgb(230,0,0) !important; }`; document.head.appendChild(st); }, [L]);
            await setupCarry(page, css); await page.waitForTimeout(250);
            const c = await center(page, thumb); await page.mouse.move(c.x, c.y); await page.mouse.down();
            try {
              await page.waitForTimeout(900);
              const g = await page.evaluate((s) => { const t = document.querySelector(s).getBoundingClientRect(); return { cx: t.left + t.width / 2 + 6 }; }, L.track);
              const lead = Math.max(0, Date.now() - t0 - 120);
              await page.evaluate(FILM, [L, "carry", m.clip.box, "(n, st, last) => (last && last.tt - last.H < -30 ? 0 : -2)", 120, 500]);
              x = { g, lead };
            } finally { await page.mouse.up(); }
          } finally { const v = page?.video(); await ctx.close(); if (x && v) { x.video = await v.path(); runs.push(x); } }
        }
        const out = [];
        for (const x of runs) {
          const cx = Math.round(x.g.cx), Hh = 500;
          const raw = execFileSync("ffmpeg", ["-v", "error", "-i", x.video, "-ss", `${x.lead / 1000}`, "-vf", `crop=2:${Hh}:${cx}:0`, "-pix_fmt", "rgb24", "-f", "rawvideo", "-"], { maxBuffer: 1 << 28 });
          const N = Math.floor(raw.length / (Hh * 6)); const d = [];
          for (let k = 0; k < N; k++) {
            const fr = raw.subarray(k * Hh * 6, (k + 1) * Hh * 6); const px = (y) => [fr[y * 6], fr[y * 6 + 1], fr[y * 6 + 2]]; let n = 0, s = 0, tSum = 0, tn = 0;
            for (let y = 0; y < Hh; y++) { const [R, G, B] = px(y); if (B > 150 && R < 90 && G < 90) { n++; s += y; } if (R > 150 && G < 90 && B < 90) { tn++; tSum += y; } }
            if (n > 3) d.push({ k, c: s / n, tn, t: tn ? tSum / tn : NaN, blue: n });
          }
          // the lens's centre against the track's when both show; the frame's jump in the lens's centre minus the carry
          const steps = []; for (let i = 1; i < d.length; i++) steps.push(Math.abs(d[i].c - d[i - 1].c));
          const max = steps.length ? Math.max(...steps) : NaN; const iMax = steps.indexOf(max);
          out.push({ N, found: d.length, max, seq: d.slice(Math.max(0, iMax - 3), iMax + 6).map((q) => +q.c.toFixed(0)) });
        }
        return { out };
      } finally { fs.rmSync(vdir, { recursive: true, force: true }); }
    }, 240000);
    if (r.crashed) { cell(name, "REPORT", r.line); continue; }
    cell(name, "REPORT", `a recorded film of the side change, lens blue, track red, one column, carried 2 px a frame: ${r.out.map((x) => `${x.found}/${x.N} frames, largest one-film-frame move of the lens's centre ${f(x.max, 1)} px, its centres around it [${x.seq.join(" ")}]`).join(" | ")}${engine === "webkit" ? " · WebKit's film is no one-frame witness (H8 §5)" : ""}`);
  }

  // ── CK-21 on the travel's tokens ──
  if (want("loud")) for (const [tok, val] of [[null, null], ["--spring-dock", "initial"], ["--spring-dock", "nonsense"], ["--spring-dock-settle", "nonsense"]]) {
    const name = `CA10 loud · ${tok ?? "clean"}${val ? ` ${val}` : ""}`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, sc, tok ? { plant: [tok, val] } : {});
      try {
        await setupCarry(P.page, null); await P.page.waitForTimeout(250); await hold(P);
        const n0 = P.errors.length;
        try {
          const film = await P.page.evaluate(FILM, [L, "carry", m.clip.box, "(n, st, last) => (last && last.tt - last.H < -40 ? 0 : -2)", 160, 500]);
          const after = P.errors.length;
          await P.page.evaluate(() => window.__e.insertSibling?.()); await P.page.waitForTimeout(400);
          const end = film.out.filter((x) => !x.gone).at(-1); let ch = 0; const S = film.out.filter((x) => !x.gone); for (let i = 1; i < S.length; i++) if (S[i].below !== S[i - 1].below) ch++; let step = 0; for (let i = 1; i < S.length; i++) step = Math.max(step, perFrame(Math.abs(S[i].rel - S[i - 1].rel), S[i].t - S[i - 1].t));
          return { n0, after, errs: [...P.errors], end, ch, step };
        } finally { await P.page.mouse.up(); }
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed) { cell(name, "FAIL", r.line); continue; }
    const named = tok ? r.errs.filter((e) => e.includes(tok)).length : 0; const uncaught = r.errs.filter((e) => e.startsWith("pageerror")).length;
    cell(name, !tok ? (r.errs.length ? "FAIL" : "PASS") : named >= 1 && !uncaught ? "PASS" : "FAIL", `console/page errors before the side change ${r.n0}, after it ${r.after}, after a re-render ${r.errs.length}: ${named} name the token, ${uncaught} uncaught · ${r.ch} change(s), largest step ${f(r.step, 1)} px, end pin ${f(r.end?.pin, 1)} px, below ${r.end?.below} · first [${(r.errs[0] ?? "—").slice(0, 150)}]`);
  }

  // ── C-9's sentence: a released lens on a style-written move (stated as unheard); the stills of the side change ──
  if (want("still")) for (const [tf, css] of [["none", null], ["scale", TF.scale]]) {
    const name = `CA10 still · ${tf}`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, sc, {});
      try {
        await setupCarry(P.page, css); await P.page.waitForTimeout(250); await hold(P);
        const shot = (n) => frames ? P.page.screenshot({ path: path.join(frames, `${label}-${engine}-side-${tf}-${n}.png`), animations: "allow" }) : null;
        try {
          await shot("above");
          const hit = await P.page.evaluate(([B, Lens]) => new Promise((ok) => { const b = document.querySelector(B), l = document.querySelector(Lens); let top = Number.parseFloat(b.style.top) || 0, n = 0; const tick = () => { const an = l.getAnimations().find((x) => !x.transitionProperty); if (an) { an.pause(); an.currentTime = an.effect.getTiming().duration * 0.15; ok(n); return; } if (++n > 400) { ok(-1); return; } top -= 2; b.style.top = `${top}px`; requestAnimationFrame(tick); }; requestAnimationFrame(tick); }), [m.clip.box, L.lens]);
          await P.page.waitForTimeout(60); await shot("mid");
          await P.page.evaluate((Lens) => { for (const an of document.querySelector(Lens).getAnimations()) if (!an.transitionProperty) an.play(); }, L.lens);
          await P.page.waitForTimeout(450); await shot("below");
          return { hit };
        } finally { await P.page.mouse.up(); }
      } finally { await P.close(); }
    }, 60000);
    cell(name, "REPORT", r.crashed ? r.line : `stills ${label}-${engine}-side-${tf}-{above,mid,below}.png · the travel paused at 0.15 of its clock after ${r.hit} frames`);
  }
});
