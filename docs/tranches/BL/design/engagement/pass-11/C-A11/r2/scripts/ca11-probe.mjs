#!/usr/bin/env node
// C-A11 adversarial probe (D5 pass 11, a fresh critic of HEAD + pass-11/P-E11.patch). Not a witness: each cell is scored in C-A11.md against the
// CK row it would break, or placed as a next-pass class. The harness's own scene app and lib: one browser per run, a fresh context per cell, every
// page and context closed in a finally, the browser closed by witness(); WebKit retires its browser every NAV_CAP navigations.
// Every film is read per frame in a task posted from requestAnimationFrame and stamped with document.timeline.currentTime (H11's clock); a
// step is the largest move against the track over any 16.7 ms of that clock (H11's form). Cells:
//   side <card> · page|carry   E-10's side film (lib sideFilm) on cards H11 does not carry: zoom 0.5, zoom 2.5, zoom 1.25 with scale 0.8 on
//                              the same box, zoom 1.25 outside a scale 0.8 (nested). Read as E-10 reads it (sideRead, copied).
//   clock <card> · enter|exit  the pinned edge per frame while opacity > 0.05 on the same cards.
//   reverse <card> · k         carried past the line, k frames into the travel carried back 40 px: the lens turns back inside its travel.
//   wheel <card>               a fine hold, real 8 px wheel ticks over the thumb across the line (page).
//   release-mid <card>         the hold released inside the side's travel.
//   exit-side <card>           released 3 px above the line, then scrolled 4 px a frame across it on the exit clock.
//   rerender <dir> <card>      a childList mutation above the slider carries the track across the line.
//   hostglide <card>           a 40 px block inserted ABOVE the card (outside its zoom): the host's painted top per frame; its first frame
//                              after the insert must sit where it was painted, its largest move over any 16.7 ms ≤ 40 × zoom × dock + 1.
//   repress <card>             a release below the line, a press again inside the exit.
//   loud <tok> <val> · side|rerender   CK-21 on the travel's tokens, planted on <html> before any script, both paths; then a later hold.
//   reach <card>               REPORT: the engaged host near the viewport's right edge: its painted grow against the gutter.
//   film <card>                a recorded film of the side change (lens blue, track red): per decoded frame the lens's centre. REPORT.
const H = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
const { witness, openPage, scenesFor, center, f, INIT, rowsOf, rowFacts, rodeRow, sideFilm } = await import(`${H}/lib.mjs`);
const NOM = 1000 / 60;
const TF = {
  none: [null, null], scale: [{ scale: "0.8", transformOrigin: "0 0" }, null],
  zoom08: [{ zoom: "0.8" }, null], zoom125: [{ zoom: "1.25" }, null], zoom2: [{ zoom: "2" }, null],
  zoom05: [{ zoom: "0.5" }, null], zoom25: [{ zoom: "2.5" }, null],
  zs: [{ zoom: "1.25", scale: "0.8", transformOrigin: "0 0" }, null],
  nested: [{ scale: "0.8", transformOrigin: "0 0" }, { zoom: "1.25" }],
};
// the card: css on the box (page: the root's parent; carry: the scroller), outer css on that box's parent
const card = (page, drive, sel, tf) => page.evaluate(([sel, css, outer]) => { const box = sel.startsWith("ROOT:") ? document.querySelector(sel.slice(5)).parentElement : document.querySelector(sel); if (css) Object.assign(box.style, css); if (outer) Object.assign(box.parentElement.style, outer); }, [sel, ...TF[tf]]);

// E-10's sideRead, copied unchanged in substance (harness/e10-continuity.mjs:222)
const sideRead = (r, rows, rate) => { const S = r.out; const facts = rows.map(rowFacts).filter((x) => Number.isFinite(x.peak)); const fastest = facts.reduce((p, x) => (!p || x.peak > p.peak ? x : p), null);
  let changes = 0; for (let i = 1; i < S.length; i++) if (S[i].rel > 0 !== S[i - 1].rel > 0) changes++;
  const relA = S[0].rel, relZ = S.at(-1).rel, spanRel = changes ? Math.abs(relZ - relA) : 0; const end = S.at(-1);
  const span = changes ? end.H + (end.tb - end.tt) : 0;
  const ams = [...new Set(S.flatMap((x) => (x.an ?? []).filter((y) => y.p !== "opacity").map((y) => y.ms)))];
  const rode = rodeRow(ams, rows); const row = rode ?? fastest;
  const bound = span * (row?.peak ?? 0) + 1;
  const relAt = (t) => { for (let i = 1; i < S.length; i++) if (S[i].t >= t) { const a = S[i - 1], b = S[i]; return a.rel + ((b.rel - a.rel) * (t - a.t)) / Math.max(1e-6, b.t - a.t); } return S.at(-1).rel; };
  let step = 0, atT = NaN; for (const x of S) if (x.t - S[0].t >= NOM) { const d = Math.abs(x.rel - relAt(x.t - NOM)); if (d > step) { step = d; atT = x.t; } }
  const off = S.map((x, i) => ({ i, x })).filter((y) => Math.abs(y.x.pin) > 2);
  const win = off.length ? S[off.at(-1).i].t - S[off[0].i].t : 0; const winMax = (row?.ms ?? 0) * 1.5 + 150;
  const dxMax = Math.max(...S.map((x) => Math.abs(x.dx))); const reached = Math.min(...S.map((x) => x.tt - x.H));
  const whole = end.lt >= -0.5 && end.lb <= (r.vh ?? 500) + 0.5; const above = Math.max(0, ...S.map((x) => -x.lt)); const aboveMax = 2 * (rate ?? 0) + 2;
  return { changes, relA, relZ, span, ams, rode, row, bound, step, atT, off, win, winMax, dxMax, reached, end, whole, above, aboveMax, n: S.length, pinEnd: Math.abs(end.pin) <= 2 };
};
const sideLine = (v) => `${v.changes} change(s) · step ${f(v.step, 1)} px over any 16.7 ms at +${f(v.atT, 0)} ms; bound ${f(v.bound, 1)} = span ${f(v.span, 1)} × ${v.row?.n ?? "?"} ${f(v.row?.peak, 3)}${v.rode ? "" : " (no row carried: fastest)"} + 1 · off > 2 px on ${v.off.length} frames over ${f(v.win, 0)} ms (≤ ${f(v.winMax, 0)}) · across ${f(v.dxMax, 1)} · end pin ${f(v.end.pin, 1)}, whole ${v.whole} (${f(v.end.lt, 1)}..${f(v.end.lb, 1)}) · above ${f(v.above, 1)} (≤ ${f(v.aboveMax, 0)})`;

// A generic film: each frame `plan(n, st, last)` says how far to move the drive (page scroll or the scroller's top in painted px); reads post-frame,
// timeline-stamped; `an` as sideFilm records it.
const FILM = ([L, drive, B, planSrc, frames, afterMs]) => new Promise((ok) => {
  const q = (x) => document.querySelector(x); const b = B ? q(B) : null; let top = b ? Number.parseFloat(b.style.top) || 0 : 0; const zb = b ? b.currentCSSZoom : 1;
  const move = (dy) => { if (!dy) return; if (drive === "page") scrollBy(0, -dy); else if (drive === "carry") { top += dy / zb; b.style.top = `${top}px`; } };
  const T = () => document.timeline.currentTime; const t0 = T();
  const out = []; const ch = new MessageChannel(); let n = 0; const plan = eval(planSrc);
  ch.port1.onmessage = () => { const l = q(L.lens), t = q(L.track); if (!l || !t) { out.push({ n, t: T() - t0, gone: true }); return; } const a1 = l.getBoundingClientRect(), d = t.getBoundingClientRect(); if (!(a1.width > 0)) { out.push({ n, t: T() - t0, gone: true }); return; } const rel = a1.top + a1.height / 2 - (d.top + d.height / 2);
    const an = l.getAnimations().filter((x) => x.playState === "running").map((x) => ({ ms: x.effect.getTiming().duration, p: x.transitionProperty ?? Object.keys(x.effect.getKeyframes()[0] ?? {}).filter((k) => !["offset", "easing", "composite", "computedOffset"].includes(k)).join(",") }));
    const below = l.hasAttribute("data-engage-lens-below");
    out.push({ n, t: T() - t0, rel, pin: rel < 0 ? a1.bottom - d.top : a1.top - d.bottom, edge: (below ? a1.top : a1.bottom) - d.top, dx: a1.left + a1.width / 2 - (d.left + d.width / 2), lt: a1.top, lb: a1.bottom, tt: d.top, tb: d.bottom, H: a1.height, op: +getComputedStyle(l).opacity, below, eng: !!q("[data-engaged]"), an }); };
  const l0 = q(L.lens), t1 = q(L.track); if (!l0 || !t1) { ok({ out, none: true }); return; }
  const st = { H0: l0.getBoundingClientRect().height, line: t1.getBoundingClientRect().top - l0.getBoundingClientRect().height, vh: innerHeight };
  let tEnd = 0;
  const tick = () => { n++; const last = out.filter((x) => !x.gone).at(-1); const dy = n <= frames ? plan(n, st, last, out) : 0; move(dy); ch.port2.postMessage(0); if (n > frames && !tEnd) tEnd = performance.now() + afterMs; if (tEnd && performance.now() >= tEnd) setTimeout(() => ok({ out, ...st }), 50); else requestAnimationFrame(tick); };
  requestAnimationFrame(tick);
});
// the step over any 16.7 ms of the timeline, on visible frames, against a bound of span × row peak + 1
const win167 = (S) => { const relAt = (t) => { for (let i = 1; i < S.length; i++) if (S[i].t >= t) { const a = S[i - 1], b = S[i]; return a.rel + ((b.rel - a.rel) * (t - a.t)) / Math.max(1e-6, b.t - a.t); } return S.at(-1)?.rel; }; let step = 0, atT = NaN; for (const x of S) if (x.t - S[0].t >= NOM) { const d = Math.abs(x.rel - relAt(x.t - NOM)); if (d > step) { step = d; atT = x.t; } } return { step, atT }; };
const changesOf = (S) => { let c = 0; for (let i = 1; i < S.length; i++) if (S[i].below !== S[i - 1].below) c++; return c; };

await witness("C-A11 probe", "C-A11's adversarial cells on the candidate's lens, host glide and travel tokens: off H11's cards, inside the travel, on the exit, on a wheel, across a re-render, and fail-loud on both paths", async ({ a, E, T, cell, guard, idx, engine }) => {
  const only = typeof a.only === "string" ? new Set(a.only.split(",")) : null; const want = (k) => !only || only.has(k);
  const frames = typeof a.frames === "string" ? a.frames : null; if (frames) fs.mkdirSync(frames, { recursive: true });
  const label = typeof a.label === "string" ? a.label : "c";
  const lensRows = scenesFor(idx, "E-13").filter(([, x]) => x.loupe);
  const [sc, m] = lensRows.find(([, x]) => x.clip); const [scP, mP] = lensRows.find(([, x]) => !x.clip) ?? [sc, m];
  const L = m.loupe; const thumb = m.thumb ?? '[data-e~="thumb"]'; const thumbP = mP.thumb ?? '[data-e~="thumb"]'; const rootP = mP.root ?? '[data-e~="root"]';
  const veil = async (page, mm) => { if (mm.veil) await page.evaluate((v) => { const st = document.createElement("style"); st.textContent = `${v} { visibility: hidden !important; }`; document.head.appendChild(st); }, mm.veil); };
  // carry: the card on the scroller, its rest box 6 px under its top, the scroller y0 px down the viewport (top in its own zoomed px)
  const setupCarry = async (page, tf, y0 = 170) => { await card(page, "carry", m.clip.box, tf); await page.evaluate(([B, Q, y0]) => { const b = document.querySelector(B); b.style.position = "relative"; const q = document.querySelector(Q); const br = b.getBoundingClientRect(), k = br.height / b.offsetHeight, rr = q.getBoundingClientRect(); b.scrollTop += (rr.top - (br.top + b.clientTop * k + 6)) / k; const y = b.getBoundingClientRect().top; b.style.top = `${(y0 - y) / b.currentCSSZoom}px`; }, [m.clip.box, m.clip.rest, y0]); await veil(page, m); };
  const setupPage = async (page, tf, top = 230) => { await page.evaluate((top) => { const mn = document.querySelector("main") ?? document.body; mn.style.paddingTop = `${top}px`; mn.style.paddingBottom = "1600px"; document.documentElement.style.overflowAnchor = "none"; }, top); await card(page, "page", `ROOT:${rootP}`, tf); await veil(page, mP); };
  const hold = async (P, ms = 900, th = thumb) => { const c = await center(P.page, th); await P.page.mouse.move(c.x, c.y); await P.page.mouse.down(); await P.page.waitForTimeout(ms); };
  const tfs = (dflt) => (typeof a.cards === "string" ? a.cards.split(",") : dflt);

  // ── side on cards H11 does not carry ──
  if (want("side")) for (const tf of tfs(["zoom05", "zoom25", "zs", "nested"])) for (const [drive, rate] of [["page", 3], ["carry", 2]]) {
    const name = `CA11 side · ${drive} · ${tf}`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, drive === "page" ? scP : sc, {});
      try {
        if (drive === "page") await setupPage(P.page, tf); else await setupCarry(P.page, tf);
        await P.page.waitForTimeout(250); const rows = await P.page.evaluate(rowsOf); await hold(P, 900, drive === "page" ? thumbP : thumb);
        try { return { ...(await P.page.evaluate(sideFilm, [drive === "page" ? mP.loupe : L, drive, drive === "carry" ? m.clip.box : null, "side", rate])), rows, errs: P.errors.length }; } finally { await P.page.mouse.up(); }
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed || r.none || !r.out?.length) { cell(name, "FAIL", r.line ?? "NO LOUPE"); continue; }
    const v = sideRead(r, r.rows, rate); const driven = v.reached <= 2; const windowOk = !v.off.length || (v.changes === 1 && v.win <= v.winMax);
    const ok = driven && v.changes <= 1 && v.step <= v.bound && windowOk && v.dxMax <= 2 && v.whole && v.above <= v.aboveMax && v.pinEnd;
    cell(name, !driven ? "UNMEASURED" : ok ? "PASS" : "FAIL", `${driven ? "" : `NOT DRIVEN (reached ${f(v.reached, 1)}) · `}${sideLine(v)} · errors ${r.errs}`);
  }

  // ── clocks on the same cards ──
  if (want("clock")) for (const tf of tfs(["zoom05", "zs", "nested", "zoom25"])) {
    const name = `CA11 clock · ${tf}`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, sc, {});
      try {
        await setupCarry(P.page, tf, 220); await P.page.waitForTimeout(250);
        const c = await center(P.page, thumb); await P.page.mouse.move(c.x, c.y);
        const clock = P.page.evaluate((L) => new Promise((ok) => { const out = []; const ch = new MessageChannel(); const t0 = performance.now(); ch.port1.onmessage = () => { const l = document.querySelector(L.lens), t = document.querySelector(L.track); if (l && t) { const a = l.getBoundingClientRect(), d = t.getBoundingClientRect(); const cs = getComputedStyle(l); const below = l.hasAttribute("data-engage-lens-below"); if (a.width > 0) out.push({ t: performance.now() - t0, pin: below ? a.top - d.bottom : a.bottom - d.top, dx: a.left + a.width / 2 - (d.left + d.width / 2), op: +cs.opacity, sc: cs.scale, eng: !!document.querySelector("[data-engaged]") }); } }; const tick = () => { ch.port2.postMessage(0); if (performance.now() - t0 < 1500) requestAnimationFrame(tick); else setTimeout(() => ok(out), 40); }; requestAnimationFrame(tick); }), L);
        await P.page.mouse.down(); await P.page.waitForTimeout(700); await P.page.mouse.up(); return { out: await clock };
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed) { cell(name, "FAIL", r.line); continue; }
    const vis = r.out.filter((x) => x.op > 0.05); const en = vis.filter((x) => x.eng), ex = vis.filter((x) => !x.eng); const worst = (s) => s.reduce((p, x) => (Math.abs(x.pin) > Math.abs(p) ? x.pin : p), 0);
    const inflight = (s) => s.filter((x) => x.sc !== "1").length; const ok = Math.abs(worst(en)) <= 2 && Math.abs(worst(ex)) <= 2 && Math.max(0, ...vis.map((x) => Math.abs(x.dx))) <= 2;
    cell(name, inflight(en) + inflight(ex) === 0 ? "UNMEASURED" : ok ? "PASS" : "FAIL", `raise ${en.length} frames (${inflight(en)} in flight), worst pin ${f(worst(en), 1)} px · exit ${ex.length} (${inflight(ex)} in flight), worst pin ${f(worst(ex), 1)} px · across worst ${f(Math.max(0, ...vis.map((x) => Math.abs(x.dx))), 1)} px`);
  }

  // ── the lens turned back inside its travel ──
  if (want("reverse")) for (const tf of tfs(["none", "zoom08", "zoom125", "zoom2"])) for (const k of [3, 6, 10]) {
    const name = `CA11 reverse · ${tf} · ${k} frames in`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, sc, {});
      try {
        await setupCarry(P.page, tf); await P.page.waitForTimeout(250); const rows = await P.page.evaluate(rowsOf); await hold(P);
        try { return { ...(await P.page.evaluate(FILM, [L, "carry", m.clip.box, `(() => { let at = 0; return (n, st, last) => { if (last && last.below && !at) at = n; if (!at) return -2; return n - at === ${k} ? 40 : 0; }; })()`, 220, 700])), rows }; } finally { await P.page.mouse.up(); }
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed || r.none) { cell(name, "FAIL", r.line ?? "NO LOUPE"); continue; }
    const S = r.out.filter((x) => !x.gone); const ch = changesOf(S); const end = S.at(-1); const dock = rowFacts(r.rows.find((x) => x.n === "dock")); const span = end.H + (end.tb - end.tt); const bound = span * dock.peak + 1; const w = win167(S); const above = Math.max(0, ...S.map((x) => -x.lt));
    cell(name, ch !== 2 ? "UNMEASURED" : w.step <= bound && Math.abs(end.pin) <= 2 && above <= 6 ? "PASS" : "FAIL", `${ch !== 2 ? `NOT DRIVEN (${ch} changes) · ` : ""}${ch} change(s) · step over 16.7 ms ${f(w.step, 1)} px at +${f(w.atT, 0)} ms (bound ${f(bound, 1)} = span ${f(span, 1)} × dock ${f(dock.peak, 3)} + 1) · end pin ${f(end.pin, 1)} · above ${f(above, 1)}`);
  }

  // ── a real wheel across the line ──
  if (want("wheel")) for (const tf of tfs(["none", "zoom125", "zoom08"])) {
    const name = `CA11 wheel · ${tf}`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, scP, {});
      try {
        await setupPage(P.page, tf); await P.page.waitForTimeout(250); const rows = await P.page.evaluate(rowsOf); await hold(P, 900, thumbP);
        try {
          const film = P.page.evaluate(FILM, [mP.loupe, "none", null, "(n) => 0", 1, 2000]);
          let after = -1; for (let i = 0; i < 90 && after < 8; i++) { await P.page.mouse.wheel(0, 8); await P.page.waitForTimeout(16); if (after >= 0) after++; else if (await P.page.evaluate((Lens) => document.querySelector(Lens)?.hasAttribute("data-engage-lens-below"), mP.loupe.lens)) after = 0; }
          return { ...(await film), rows };
        } finally { await P.page.mouse.up(); }
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed || r.none) { cell(name, "FAIL", r.line ?? "NO LOUPE"); continue; }
    const S = r.out.filter((x) => !x.gone && x.eng); const ch = changesOf(S); const end = S.at(-1) ?? {}; const dock = rowFacts(r.rows.find((x) => x.n === "dock")); const span = end.H + (end.tb - end.tt); const bound = span * dock.peak + 1; const w = win167(S); const above = Math.max(0, ...S.map((x) => -x.lt)); const offN = S.filter((x) => Math.abs(x.pin) > 2);
    cell(name, ch < 1 ? "UNMEASURED" : ch <= 1 && w.step <= bound + 8 && Math.abs(end.pin) <= 2 && end.lt >= -0.5 ? "PASS" : "FAIL", `${ch < 1 ? "NOT DRIVEN (no change) · " : ""}8 px wheel ticks over the held thumb · ${ch} change(s) · step over 16.7 ms ${f(w.step, 1)} px (bound ${f(bound, 1)} + one 8 px tick, the drive's own step) · off > 2 px on ${offN.length} frames · end pin ${f(end.pin, 1)}, top ${f(end.lt, 1)} · above ${f(above, 1)} on any frame`);
  }

  // ── a release inside the travel ──
  if (want("release-mid")) for (const tf of tfs(["none", "zoom125", "zoom2"])) {
    const name = `CA11 release-mid · ${tf}`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, sc, {});
      try {
        await setupCarry(P.page, tf); await P.page.waitForTimeout(250); const rows = await P.page.evaluate(rowsOf); await hold(P);
        const film = P.page.evaluate(FILM, [L, "carry", m.clip.box, `(n, st, last) => { if (last && last.below) { window.__chg = true; return 0; } return -2; }`, 200, 900]);
        await P.page.waitForFunction(() => window.__chg === true, null, { timeout: 15000, polling: 5 }).catch(() => {}); await P.page.mouse.up();
        return { ...(await film), rows };
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed || r.none) { cell(name, "FAIL", r.line ?? "NO LOUPE"); continue; }
    const S = r.out.filter((x) => !x.gone); const vis = S.filter((x) => x.op > 0.05); const dock = rowFacts(r.rows.find((x) => x.n === "dock")); const chg = vis.findIndex((x) => x.below); const relF = vis.findIndex((x) => !x.eng);
    const ref = vis[Math.max(0, chg - 1)] ?? vis[0]; const span = (ref?.H ?? 0) + ((ref?.tb ?? 0) - (ref?.tt ?? 0)); const bound = span * dock.peak + 1; const w = win167(vis); const endV = vis.at(-1);
    cell(name, chg < 0 || relF < 0 ? "UNMEASURED" : w.step <= bound ? "PASS" : "FAIL", `change at visible frame ${chg}, release at ${relF} · step over 16.7 ms while visible ${f(w.step, 1)} px (bound ${f(bound, 1)}) · last visible rel ${f(endV?.rel, 1)}, pin ${f(endV?.pin, 1)} px at opacity ${f(endV?.op, 2)}`);
  }

  // ── a side change on the exit clock ──
  if (want("exit-side")) for (const tf of tfs(["none", "zoom125"])) {
    const name = `CA11 exit-side · ${tf}`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, scP, {});
      try {
        await setupPage(P.page, tf); await P.page.waitForTimeout(250); const rows = await P.page.evaluate(rowsOf); await hold(P, 900, thumbP);
        const film = P.page.evaluate(FILM, [mP.loupe, "page", null, `(n, st, last) => { if (!last) return 0; const room = last.tt - last.H; if (last.eng) { if (room > 3) return -2; window.__at = true; return 0; } return -4; }`, 300, 300]);
        await P.page.waitForFunction(() => window.__at === true, null, { timeout: 15000, polling: 5 }).catch(() => {}); await P.page.waitForTimeout(60); await P.page.mouse.up();
        return { ...(await film), rows };
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed || r.none) { cell(name, "FAIL", r.line ?? "NO LOUPE"); continue; }
    const S = r.out.filter((x) => !x.gone); const vis = S.filter((x) => x.op > 0.05 && !x.eng); const ch = changesOf(vis); const dock = rowFacts(r.rows.find((x) => x.n === "dock"));
    const ref = S.find((x) => x.eng); const span = (ref?.H ?? 0) + ((ref?.tb ?? 0) - (ref?.tt ?? 0)); const bound = span * dock.peak + 1; const w = win167(vis);
    const offW = vis.filter((x) => Math.abs(x.pin) > 2); const winMs = offW.length ? offW.at(-1).t - offW[0].t : 0;
    cell(name, ch < 1 ? "UNMEASURED" : w.step <= bound + 4 && winMs <= dock.ms * 1.5 + 150 ? "PASS" : "FAIL", `${ch < 1 ? "NOT DRIVEN (no change on the exit clock) · " : ""}${vis.length} visible exit frames, ${ch} change(s) · step over 16.7 ms ${f(w.step, 1)} px (bound ${f(bound, 1)} + the 4 px drive) · off > 2 px on ${offW.length} frames over ${f(winMs, 0)} ms (≤ ${f(dock.ms * 1.5 + 150, 0)})`);
  }

  // ── a re-render carries the track across the line ──
  if (want("rerender")) for (const dir of ["up", "down"]) for (const tf of tfs(["none", "zoom125"])) {
    const name = `CA11 rerender · ${dir} · ${tf}`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, scP, {});
      try {
        await setupPage(P.page, tf, 200); await P.page.evaluate((root) => { const h = document.querySelector(root).parentElement; const blk = document.createElement("div"); blk.id = "ca11-blk"; blk.style.height = "60px"; h.parentElement.insertBefore(blk, h); }, rootP);
        await P.page.waitForTimeout(250); const rows = await P.page.evaluate(rowsOf); await hold(P, 900, thumbP);
        try {
          await P.page.evaluate(([L, dir]) => { const l = document.querySelector(L.lens), t = document.querySelector(L.track).getBoundingClientRect(), lh = l.getBoundingClientRect().height; const room = t.top - lh; scrollBy(0, dir === "up" ? room - 12 : room + 12); }, [mP.loupe, dir]);
          await P.page.waitForTimeout(350);
          const film = await P.page.evaluate(FILM, [mP.loupe, "none", null, `(n) => { if (n === 6) { const blk = document.getElementById("ca11-blk"); if (${JSON.stringify(dir)} === "up") blk.remove(); else { const b2 = document.createElement("div"); b2.style.height = "60px"; blk.after(b2); } } return 0; }`, 8, 900]);
          return { ...film, rows, errs: [...P.errors] };
        } finally { await P.page.mouse.up(); }
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed || r.none) { cell(name, "FAIL", r.line ?? "NO LOUPE"); continue; }
    const S = r.out.filter((x) => !x.gone); const ch = changesOf(S); const end = S.at(-1); const dock = rowFacts(r.rows.find((x) => x.n === "dock")); const span = end.H + (end.tb - end.tt); const bound = span * dock.peak + 1; const w = win167(S); const above = Math.max(0, ...S.map((x) => -x.lt));
    cell(name, ch !== 1 ? "UNMEASURED" : w.step <= bound && Math.abs(end.pin) <= 2 && end.lt >= -0.5 ? "PASS" : "FAIL", `${ch !== 1 ? `NOT DRIVEN (${ch} changes) · ` : ""}${ch} change(s) · step over 16.7 ms ${f(w.step, 1)} px (bound ${f(bound, 1)}) · end pin ${f(end.pin, 1)}, top ${f(end.lt, 1)} · above ${f(above, 1)} · errors ${r.errs.length}`);
  }

  // ── the host's re-render glide across a zoom boundary (P-E11 §8 item 2: no browser cell drives it) ──
  if (want("hostglide")) for (const tf of tfs(["none", "zoom125", "zoom08", "scale", "nested"])) {
    const name = `CA11 hostglide · ${tf}`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, scP, {});
      try {
        await setupPage(P.page, tf, 260); await P.page.waitForTimeout(250); const rows = await P.page.evaluate(rowsOf); await hold(P, 900, thumbP);
        try {
          // insert a 40 px block ABOVE the card's outermost styled box (outside its zoom and scale): the host's place moves 40 px in the page
          const out = await P.page.evaluate(([root, nested]) => new Promise((ok) => { const host = document.querySelector(root); let box = host.parentElement; if (nested) box = box.parentElement; const T = () => document.timeline.currentTime; const t0 = T(); const fr = []; const ch = new MessageChannel(); let n = 0;
            ch.port1.onmessage = () => { const r = host.getBoundingClientRect(); fr.push({ n, t: T() - t0, top: r.top + r.height / 2, an: host.getAnimations().filter((a) => a.playState === "running" && !a.transitionProperty).length }); };
            const tick = () => { n++; if (n === 8) { const blk = document.createElement("div"); blk.style.height = "40px"; box.parentElement.insertBefore(blk, box); } ch.port2.postMessage(0); if (n < 60) requestAnimationFrame(tick); else setTimeout(() => ok(fr), 40); }; requestAnimationFrame(tick); }), [rootP, tf === "nested"]);
          return { out, rows, errs: [...P.errors] };
        } finally { await P.page.mouse.up(); }
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed) { cell(name, "FAIL", r.line); continue; }
    const S = r.out; const pre = S.filter((x) => x.n < 8); const post = S.filter((x) => x.n >= 8); const y0 = pre.at(-1)?.top; const moved = (S.at(-1)?.top ?? NaN) - y0; const first = post[0]; const jump = first ? first.top - y0 : NaN;
    const dock = rowFacts(r.rows.find((x) => x.n === "dock")); const bound = Math.abs(moved) * dock.peak + 1;
    const relAt = (t) => { for (let i = 1; i < S.length; i++) if (S[i].t >= t) { const p = S[i - 1], q = S[i]; return p.top + ((q.top - p.top) * (t - p.t)) / Math.max(1e-6, q.t - p.t); } return S.at(-1).top; }; let step = 0; for (const x of S) if (x.t - S[0].t >= NOM) step = Math.max(step, Math.abs(x.top - relAt(x.t - NOM)));
    const glided = post.some((x) => x.an > 0);
    cell(name, !(Math.abs(moved) > 5) ? "UNMEASURED" : glided && Math.abs(jump) <= 2 && step <= bound ? "PASS" : "FAIL", `a 40 px block inserted above the card mid-hold · the host's painted centre moved ${f(moved, 1)} px · its first frame after the insert ${f(jump, 1)} px from where it was painted (≤ 2) · largest move over any 16.7 ms ${f(step, 1)} px (bound ${f(bound, 1)} = ${f(Math.abs(moved), 1)} × dock ${f(dock.peak, 3)} + 1) · glide running ${glided} · errors ${r.errs.length}`);
  }

  // ── press again inside the exit, after a side change ──
  if (want("repress")) for (const tf of tfs(["none", "zoom125"])) {
    const name = `CA11 repress · ${tf}`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, sc, {});
      try {
        await setupCarry(P.page, tf); await P.page.waitForTimeout(250); await hold(P);
        await P.page.evaluate(FILM, [L, "carry", m.clip.box, "(n) => -3", 60, 400]);
        const c = await center(P.page, thumb); await P.page.mouse.up(); await P.page.waitForTimeout(40); await P.page.mouse.move(c.x, c.y); await P.page.mouse.down(); await P.page.waitForTimeout(500);
        const x = await P.page.evaluate((L) => { const l = document.querySelector(L.lens), t = document.querySelector(L.track); if (!l || !t) return null; const a = l.getBoundingClientRect(), d = t.getBoundingClientRect(); return { below: l.hasAttribute("data-engage-lens-below"), pin: l.hasAttribute("data-engage-lens-below") ? a.top - d.bottom : a.bottom - d.top, op: +getComputedStyle(l).opacity, lt: a.top }; }, L);
        await P.page.mouse.up(); return { x };
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed) { cell(name, "FAIL", r.line); } else cell(name, r.x && Math.abs(r.x.pin) <= 2 && r.x.op > 0.9 && r.x.lt >= -0.5 ? "PASS" : "FAIL", r.x ? `below ${r.x.below}, pin ${f(r.x.pin, 1)} px, opacity ${f(r.x.op, 2)}, top ${f(r.x.lt, 1)} px` : "no lens after the re-press");
  }

  // ── CK-21 on the travel's tokens, both paths, then a later hold ──
  const LOUD = [[null, null], ["--spring-dock", "nonsense"], ["--spring-dock", "ease, linear"], ["--spring-dock", "linear(0, 1), ease"], ["--spring-dock", "initial"], ["--spring-dock-settle", "nonsense"], ["--spring-dock-settle", "-1"]];
  if (want("loud")) for (const [tok, val] of LOUD) for (const path_ of ["side", "rerender"]) {
    const name = `CA11 loud · ${tok ?? "clean"}${val ? ` "${val}"` : ""} · ${path_}`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, path_ === "side" ? sc : scP, tok ? { plant: [tok, val] } : {});
      try {
        if (path_ === "side") await setupCarry(P.page, "none"); else await setupPage(P.page, "none", 260);
        await P.page.waitForTimeout(250); await hold(P, 900, path_ === "side" ? thumb : thumbP);
        const n0 = P.errors.length; let film = null, an = 0;
        try {
          if (path_ === "side") film = await P.page.evaluate(FILM, [L, "carry", m.clip.box, "(n, st, last) => (last && last.tt - last.H < -40 ? 0 : -2)", 160, 500]);
          else an = await P.page.evaluate((root) => new Promise((ok) => { const host = document.querySelector(root); const box = host.parentElement; const blk = document.createElement("div"); blk.style.height = "40px"; box.parentElement.insertBefore(blk, box); requestAnimationFrame(() => requestAnimationFrame(() => ok(host.getAnimations().filter((a) => a.playState === "running" && !a.transitionProperty).length))); }), rootP);
          await P.page.waitForTimeout(300);
        } finally { await P.page.mouse.up(); }
        const after = [...P.errors];
        // a later holder on the same page
        await P.page.waitForTimeout(700); await hold(P, 700, path_ === "side" ? thumb : thumbP);
        const later = await P.page.evaluate((L) => { const l = document.querySelector(L.lens), t = document.querySelector(L.track); const e = !!document.querySelector("[data-engaged]"); if (!l || !t) return { e }; const a = l.getBoundingClientRect(), d = t.getBoundingClientRect(); const below = l.hasAttribute("data-engage-lens-below"); return { e, op: +getComputedStyle(l).opacity, pin: below ? a.top - d.bottom : a.bottom - d.top }; }, path_ === "side" ? L : mP.loupe);
        await P.page.mouse.up();
        const S = film?.out?.filter((x) => !x.gone) ?? []; const w = S.length ? win167(S) : { step: NaN };
        return { n0, after, ch: changesOf(S), step: w.step, later, an };
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed) { cell(name, "FAIL", r.line); continue; }
    const named = tok ? r.after.filter((e) => e.includes(tok) && !e.startsWith("pageerror")).length : 0; const uncaught = r.after.filter((e) => e.startsWith("pageerror")).length; const alive = r.later?.e && r.later?.op > 0.9 && Math.abs(r.later?.pin ?? 99) <= 2;
    const ok = !tok ? r.after.length === 0 && alive : named >= 1 && !uncaught && alive;
    cell(name, ok ? "PASS" : "FAIL", `errors before the drive ${r.n0}, after ${r.after.length}: ${named} name the token, ${uncaught} uncaught · ${path_ === "side" ? `${r.ch} change(s), step ${f(r.step, 1)} px` : `host animations running after the insert ${r.an}`} · later hold engaged ${r.later?.e}, lens opacity ${f(r.later?.op, 2)}, pin ${f(r.later?.pin, 1)} · first [${(r.after[0] ?? "—").slice(0, 170)}]`);
  }

  // ── REPORT: the reach under zoom and scale near the viewport's right edge ──
  if (want("reach")) for (const tf of tfs(["none", "zoom125", "zoom08", "scale"])) {
    const name = `CA11 reach · ${tf}`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, scP, {});
      try {
        await setupPage(P.page, tf, 230); await P.page.waitForTimeout(250);
        const rest = await P.page.evaluate((root) => { const h = document.querySelector(root); const r = h.getBoundingClientRect(); const g = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--space-section")) * (getComputedStyle(document.documentElement).getPropertyValue("--space-section").includes("rem") ? Number.parseFloat(getComputedStyle(document.documentElement).fontSize) : 1); return { l: r.left, r: r.right, vw: innerWidth, gutterRaw: getComputedStyle(h).getPropertyValue("--space-section").trim(), g }; }, rootP);
        await hold(P, 900, thumbP);
        const eng = await P.page.evaluate((root) => { const h = document.querySelector(root); const r = h.getBoundingClientRect(); const cs = getComputedStyle(h); return { l: r.left, r: r.right, room: cs.getPropertyValue("--stage-room"), w: cs.getPropertyValue("--stage-w"), reach: cs.getPropertyValue("--stage-reach"), z: h.currentCSSZoom }; }, rootP);
        await P.page.mouse.up(); return { rest, eng };
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed) { cell(name, "REPORT", r.line); continue; }
    const { rest, eng } = r; cell(name, "REPORT", `rest ${f(rest.l, 1)}..${f(rest.r, 1)} of ${rest.vw} (gutter token ${rest.gutterRaw}) · engaged ${f(eng.l, 1)}..${f(eng.r, 1)}: grown ×${f((eng.r - eng.l) / (rest.r - rest.l), 4)} inline, left gap ${f(eng.l, 1)}, right gap ${f(rest.vw - eng.r, 1)} painted px · --stage-room ${eng.room}, --stage-w ${eng.w}, --stage-reach ${eng.reach}, zoom ${eng.z}`);
  }

  // ── the travel in paint ──
  if (want("film")) for (const tf of tfs(["none", "zoom125"])) {
    const name = `CA11 film · ${tf}`;
    const r = await guard(name, async () => {
      const vdir = fs.mkdtempSync(path.join(os.tmpdir(), "ca11film-"));
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
            await setupCarry(page, tf); await page.waitForTimeout(250);
            const c = await center(page, thumb); await page.mouse.move(c.x, c.y); await page.mouse.down();
            try {
              await page.waitForTimeout(900);
              const g = await page.evaluate((s) => { const t = document.querySelector(s).getBoundingClientRect(); return { cx: t.left + t.width / 2 + 6 }; }, L.track);
              const lead = Math.max(0, Date.now() - t0 - 120);
              await page.evaluate(FILM, [L, "carry", m.clip.box, "(n, st, last) => (last && last.tt - last.H < -30 ? 0 : -2)", 140, 500]);
              x = { g, lead };
            } finally { await page.mouse.up(); }
          } finally { const v = page?.video(); await ctx.close(); if (x && v) { x.video = await v.path(); runs.push(x); } }
        }
        const out = [];
        for (const x of runs) {
          const cx = Math.round(x.g.cx), Hh = 500;
          const raw = execFileSync("ffmpeg", ["-v", "error", "-i", x.video, "-ss", `${x.lead / 1000}`, "-vf", `crop=2:${Hh}:${Math.min(698, Math.max(0, cx))}:0`, "-pix_fmt", "rgb24", "-f", "rawvideo", "-"], { maxBuffer: 1 << 28 });
          const N = Math.floor(raw.length / (Hh * 6)); const d = [];
          for (let k = 0; k < N; k++) { const fr = raw.subarray(k * Hh * 6, (k + 1) * Hh * 6); let n = 0, s = 0; for (let y = 0; y < Hh; y++) { const R = fr[y * 6], G = fr[y * 6 + 1], B = fr[y * 6 + 2]; if (B > 150 && R < 90 && G < 90) { n++; s += y; } } if (n > 3) d.push({ k, c: s / n }); }
          const steps = []; for (let i = 1; i < d.length; i++) steps.push(Math.abs(d[i].c - d[i - 1].c)); const max = steps.length ? Math.max(...steps) : NaN; const iMax = steps.indexOf(max);
          out.push({ N, found: d.length, max, seq: d.slice(Math.max(0, iMax - 3), iMax + 6).map((q) => +q.c.toFixed(0)) });
        }
        return { out };
      } finally { fs.rmSync(vdir, { recursive: true, force: true }); }
    }, 240000);
    if (r.crashed) { cell(name, "REPORT", r.line); continue; }
    cell(name, "REPORT", `a recorded film of the side change (lens blue, track red), carried 2 px a frame: ${r.out.map((x) => `${x.found}/${x.N} frames, largest one-film-frame move of the lens's centre ${f(x.max, 1)} px [${x.seq.join(" ")}]`).join(" | ")}${engine === "webkit" ? " · WebKit's film is no one-frame witness (H8 §5)" : ""}`);
  }

  // ── stills for the gestalt: the change under zoom 1.25 and nested, before / mid / after ──
  if (want("still") && frames) for (const tf of tfs(["zoom125", "nested", "zs"])) {
    const name = `CA11 still · ${tf}`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, sc, {});
      try {
        await setupCarry(P.page, tf); await P.page.waitForTimeout(250); await hold(P);
        const shot = (n) => P.page.screenshot({ path: path.join(frames, `${label}-${engine}-side-${tf}-${n}.png`), animations: "allow" });
        try {
          await shot("above");
          const hit = await P.page.evaluate(([B, Lens]) => new Promise((ok) => { const b = document.querySelector(B), l = document.querySelector(Lens); const z = b.currentCSSZoom; let top = Number.parseFloat(b.style.top) || 0, n = 0; const tick = () => { const an = l.getAnimations().find((x) => !x.transitionProperty); if (an) { an.pause(); an.currentTime = an.effect.getTiming().duration * 0.15; ok(n); return; } if (++n > 400) { ok(-1); return; } top -= 2 / z; b.style.top = `${top}px`; requestAnimationFrame(tick); }; requestAnimationFrame(tick); }), [m.clip.box, L.lens]);
          await P.page.waitForTimeout(60); const mid = await P.page.evaluate((L) => { const a = document.querySelector(L.lens).getBoundingClientRect(), d = document.querySelector(L.track).getBoundingClientRect(); return `lens ${a.top.toFixed(1)}..${a.bottom.toFixed(1)} track ${d.top.toFixed(1)}..${d.bottom.toFixed(1)}`; }, L); await shot("mid");
          await P.page.evaluate((Lens) => { for (const an of document.querySelector(Lens).getAnimations()) if (!an.transitionProperty) an.play(); }, L.lens);
          await P.page.waitForTimeout(450); const end = await P.page.evaluate((L) => { const a = document.querySelector(L.lens).getBoundingClientRect(), d = document.querySelector(L.track).getBoundingClientRect(); return `lens ${a.top.toFixed(1)}..${a.bottom.toFixed(1)} track ${d.top.toFixed(1)}..${d.bottom.toFixed(1)}`; }, L); await shot("below");
          return { hit, mid, end };
        } finally { await P.page.mouse.up(); }
      } finally { await P.close(); }
    }, 60000);
    cell(name, "REPORT", r.crashed ? r.line : `stills ${label}-${engine}-side-${tf}-{above,mid,below}.png · paused at 0.15 after ${r.hit} frames · mid ${r.mid} · below ${r.end}`);
  }
});
