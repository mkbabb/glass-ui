#!/usr/bin/env node
// C-E11 adversarial probe (D5 pass 11, a fresh critic of HEAD + pass-11/P-E11.patch). Not a witness: every line is scored in C-E11.md against the CK row it
// would break, or placed as a next-pass class. Built on C-A10's probe (pass-10/C-A10/scripts/ca10-probe.mjs), whose cells it keeps, with the step read as H11
// reads it (the largest move against the track over any 16.7 ms of document.timeline time; the span read in one frame, lens + track painted height; the
// bound span x the row's largest 16.7 ms fraction + 1; "whole during the change" at two drive steps + 2 px above the viewport, painted). The harness's own scene
// app and lib: one browser per run, a fresh context per cell, every page and context closed in a finally, the browser closed by witness(); WebKit retires its
// browser every NAV_CAP navigations. Cells (--only a,b; --tfs a,b narrows the transforms):
//   side <tf> . page|carry     the side change, transforms incl. zoom 0.8/1.25/2/2.5, zoom+scale on one card, a zoom on the track itself, a zoom on <html>
//   clock <tf>                  the pinned edge per frame through the raise and the exit (opacity > 0.05)
//   reverse <tf> . k            carried past the line, then k frames into the travel carried back: the lens turns inside its travel
//   wheel <tf>, release-mid <tf>, exit-side <tf>   as C-A10's, on zoom too
//   rerender <dir> . <tf> . out|in   a childList mutation outside / inside the zoomed card moves the held host 60 px: the HOST's re-render glide read in paint
//                               (its first frame after the mutation, its largest 16.7 ms move against its row's bound) beside the lens
//   loudx <token> <value> . side|rerender   CK-21 on values the bytes' check may pass: an easing list, a unit the clock parse ignores; both paths; a later hold
//   reach <tf>                  a phone-width held slider sized to clear the gutter by 10 painted px: its painted inline and block grow and its margins
//   relclock <token value>      CK-21 on the release carry's settle clock: a fling released on a page whose settle token is in ms, or unreadable
//   cost <tf>                   Chromium only: CDP Performance metrics over a 3 s still hold (script and task time per frame), the frame walk priced
//   noroom, repress, press-line, film <tf>, still <tf>   as C-A10's
const H = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
const { witness, openPage, scenesFor, center, f, INIT } = await import(`${H}/lib.mjs`);
const NOM = 1000 / 60;
const perFrame = (d, dt) => (d * NOM) / Math.max(NOM, dt);
const TF = { none: null, scale: { scale: "0.8", transformOrigin: "0 0" }, zoom08: { zoom: "0.8" }, zoom125: { zoom: "1.25" }, zoom2: { zoom: "2" }, zoom25: { zoom: "2.5" }, scale125: { scale: "1.25", transformOrigin: "0 0" }, translate: { translate: "13px 7px" },
  zs: { zoom: "1.25", scale: "0.8", transformOrigin: "0 0" }, trackzoom: { __track: "1.25" }, htmlzoom: { __html: "1.25" } };
// the special keys: __track sets `zoom` on the lens's subject (the track) alone, a zoom between the host and its track; __html on <html>
const SPECIAL = ([css, Tk]) => { if (!css) return; if (css.__html) document.documentElement.style.zoom = css.__html; if (css.__track) document.querySelector(Tk).style.zoom = css.__track; };
const plain = (css) => (css && !css.__html && !css.__track ? css : null);
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
    const host = l.parentElement, hr = host.getBoundingClientRect(); const wa = (e) => e.getAnimations().filter((x) => !x.transitionProperty && !x.animationName && x.playState === "running").map((x) => Math.round(x.effect.getTiming().duration));
    out.push({ n, tl: document.timeline.currentTime, th: d.height, ht: hr.top, ad: wa(l), hd: wa(host), t: performance.now() - t0, rel, pin: rel < 0 ? a1.bottom - d.top : a1.top - d.bottom, dx: a1.left + a1.width / 2 - (d.left + d.width / 2), lt: a1.top, lb: a1.bottom, tt: d.top, H: a1.height, edge: (l.hasAttribute("data-engage-lens-below") ? a1.top : a1.bottom) - d.top, op: +getComputedStyle(l).opacity, sc: getComputedStyle(l).scale, below: l.hasAttribute("data-engage-lens-below"), eng: !!q("[data-engaged]"), an: l.getAnimations().filter((x) => x.playState === "running").map((x) => x.transitionProperty ?? "waapi") }); };
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
  // H11's form: the largest move over any 16.7 ms of timeline time; the span read in the last frame (lens + track painted); two drive steps + 2 px above
  let win16 = 0, winAt = 0; for (let i = 0; i < S.length; i++) for (let j = i + 1; j < S.length && S[j].tl - S[i].tl <= NOM + 0.5; j++) { const d = Math.abs(S[j].rel - S[i].rel); if (d > win16) { win16 = d; winAt = S[j].t; } }
  const last = S.at(-1) ?? {}; const span11 = (last.H ?? 0) + (last.th ?? 0); const bound11 = span11 * (dock?.peak ?? 0) + 1;
  const dts = []; for (let i = 1; i < S.length; i++) { const d = Math.abs(S[i].tt - S[i - 1].tt); if (d > 0.05) dts.push(d); } dts.sort((p, q) => p - q); const drive = dts.length ? dts[dts.length >> 1] : 0; const aboveBound = 2 * drive + 2;
  const travelWin = (dock?.ms ?? 0) * 1.5 + 150; const ads = [...new Set(S.flatMap((x) => x.ad ?? []))];
  return { win16, winAt, span11, bound11, drive, aboveBound, travelWin, ads, above, sep, boundSep: sep * (dock?.peak ?? 0) + 1, n: S.length, changes, step, atT: S[at]?.t, atN: at, span, bound, peak: dock?.peak, ms: dock?.ms, off: off.length, win: off.length ? off.at(-1).t - off[0].t : 0, worstOff: off.length ? Math.max(...off.map((x) => Math.abs(x.pin))) : 0, end, dxMax, vh: r.vh, whole: end.lt >= -0.5 && end.lb <= (r.vh ?? 500) + 0.5, rels };
};

await witness("C-E11 probe", "C-E11's adversarial cells on the candidate's lens and stage: under zoom on every path, the host's re-render glide in paint, the travel's tokens on values the check may pass, the reach, the frame walk's cost", async ({ a, E, T, cell, guard, idx, engine }) => {
  const only = typeof a.only === "string" ? new Set(a.only.split(",")) : null; const want = (k) => !only || only.has(k);
  const tfSel = typeof a.tfs === "string" ? new Set(a.tfs.split(",")) : null; const tfs = (...x) => x.filter((k) => !tfSel || tfSel.has(k));
  const frames = typeof a.frames === "string" ? a.frames : null; if (frames) fs.mkdirSync(frames, { recursive: true });
  const label = typeof a.label === "string" ? a.label : "c";
  const [sc, m] = scenesFor(idx, "E-13").find(([, x]) => x.loupe && x.clip); const [scP, mP] = scenesFor(idx, "E-13").find(([, x]) => x.loupe && !x.clip) ?? [sc, m];
  const L = m.loupe; const thumb = m.thumb ?? '[data-e~="thumb"]'; const thumbP = mP.thumb ?? '[data-e~="thumb"]';
  const setupCarry = async (page, css, y0 = 170) => { await page.evaluate(SPECIAL, [css, L.track]); return page.evaluate(([B, Q, css, y0]) => { const b = document.querySelector(B); if (css) Object.assign(b.style, css); b.style.position = "relative"; const q = document.querySelector(Q); const br = b.getBoundingClientRect(), k = br.height / b.offsetHeight, rr = q.getBoundingClientRect(); b.scrollTop += (rr.top - (br.top + b.clientTop * k + 6)) / k; const y = b.getBoundingClientRect().top; b.style.top = `${(y0 - y) / (b.currentCSSZoom || 1)}px`; }, [m.clip.box, m.clip.rest, plain(css), y0]); };
  const setupPage = async (page, css, top = 230) => { await page.evaluate(SPECIAL, [css, L.track]); return page.evaluate(([root, css, top]) => { const mn = document.querySelector("main") ?? document.body; mn.style.paddingTop = `${top}px`; mn.style.paddingBottom = "1600px"; if (css) Object.assign(document.querySelector(root).parentElement.style, css); }, [mP.root ?? '[data-e~="root"]', plain(css), top]); };
  const ROOT = mP.root ?? '[data-e~="root"]';
  const hold = async (P, ms = 900, th = thumb) => { const c = await center(P.page, th); await P.page.mouse.move(c.x, c.y); await P.page.mouse.down(); await P.page.waitForTimeout(ms); };
  const line = (r, v, extra = "") => `${v.changes} change(s) · largest one-frame move against the track ${f(v.step, 1)} px per 16.7 ms at frame ${v.atN} (+${f(v.atT, 0)} ms); bound ${f(v.bound, 1)} = span ${f(v.span, 1)} × dock ${f(v.peak, 3)} + 1 · off its edge > 2 px on ${v.off} frames over ${f(v.win, 0)} ms (worst ${f(v.worstOff, 1)} px; bound one window ≤ ${f((v.ms ?? 0) * 1.5 + 150, 0)} ms) · across ${f(v.dxMax, 1)} px · end pin ${f(v.end?.pin, 1)} px, rel ${f(v.end?.rel, 1)}, whole ${v.whole} (lens ${f(v.end?.lt, 1)}..${f(v.end?.lb, 1)} of ${v.vh}), at most ${f(v.above, 1)} px above the viewport on any frame ${extra}`;
  const verdict = (v, maxCh = 1) => v.changes <= maxCh && v.win16 <= v.bound11 && (v.off === 0 || v.win <= v.travelWin) && Math.abs(v.end?.pin ?? 99) <= 2 && v.dxMax <= 2 && v.whole && v.above <= v.aboveBound;
  const line11 = (v) => `H11 form: move over any 16.7 ms ${f(v.win16, 1)} px (at +${f(v.winAt, 0)} ms) / bound ${f(v.bound11, 1)} = span ${f(v.span11, 1)} x dock ${f(v.peak, 3)} + 1 · above ${f(v.above, 1)} / ${f(v.aboveBound, 1)} (drive ${f(v.drive, 1)} px a frame) · off > 2 px on ${v.off} frames over ${f(v.win, 0)} ms / ${f(v.travelWin, 0)} · travel clock(s) ${v.ads.join(",") || "none"} ms`;

  // ── side under the transforms H10 does not carry ──
  if (want("side")) for (const tf of tfs("none", "scale", "zoom08", "zoom125", "zoom2", "zoom25", "zs", "trackzoom", "htmlzoom", "scale125", "translate")) for (const drive of ["page", "carry"]) {
    const name = `CE11 side · ${tf} · ${drive}`;
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
    cell(name, !driven ? "UNMEASURED" : verdict(v) ? "PASS" : "FAIL", `${driven ? "" : "NOT DRIVEN (no change) · "}${line11(v)} · ${line(r, v)} · rel around the worst frame [${v.rels.slice(Math.max(0, v.atN - 2), v.atN + 6).join(" ")}]`);
  }

  // ── clocks under those transforms ──
  if (want("clock")) for (const tf of tfs("zoom08", "zoom125", "zoom2", "zoom25", "zs", "trackzoom", "htmlzoom")) {
    const name = `CE11 clock · ${tf}`;
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
  if (want("reverse")) for (const tf of tfs("none", "scale", "zoom125", "zoom2")) for (const k of [3, 10]) {
    const name = `CE11 reverse · ${tf} · ${k} frames in`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, sc, {});
      try {
        await setupCarry(P.page, TF[tf]); await P.page.waitForTimeout(250); const rows = await P.page.evaluate(rowsOf); await hold(P);
        try { const film = await P.page.evaluate(FILM, [L, "carry", m.clip.box, `(() => { let at = 0, back = 0; return (n, st, last) => { if (last && last.below && !at) at = n; if (!at) return -2; const i = n - at; if (i === ${k}) { back = 1; return 40; } return 0; }; })()`, 200, 700]); return { ...film, rows }; } finally { await P.page.mouse.up(); }
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed || r.none) { cell(name, "FAIL", r.line ?? "NO LOUPE"); continue; }
    const v = readSide(r, r.rows); const driven = v.changes === 2;
    cell(name, !driven ? "UNMEASURED" : v.win16 <= v.boundSep && Math.abs(v.end?.pin ?? 99) <= 2 ? "PASS" : "FAIL", `${driven ? "" : "NOT DRIVEN (not two changes) · "}${line11(v)} · bound of record ${f(v.boundSep, 1)} = the sides' separation ${f(v.sep, 1)} × dock + 1 · ${line(r, v)} · rel around the worst frame [${v.rels.slice(Math.max(0, v.atN - 3), v.atN + 6).join(" ")}]`);
  }

  // ── a real wheel across the line ──
  if (want("wheel")) for (const tf of tfs("none", "zoom125")) {
    const name = `CE11 wheel · ${tf}`;
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
    const v = readSide(r, r.rows); cell(name, v.changes < 1 ? "UNMEASURED" : verdict(v) ? "PASS" : "FAIL", `${v.changes < 1 ? "NOT DRIVEN (no change) · " : ""}${line11(v)} · 8 px wheel ticks 16 ms apart until 8 past the change, 16 ms apart, over the held thumb · ${line(r, v)}`);
  }

  // ── a release inside the travel ──
  if (want("release-mid")) for (const tf of tfs("none", "zoom125", "zoom2")) {
    const name = `CE11 release-mid · ${tf}`;
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
  if (want("exit-side")) for (const tf of tfs("none", "zoom125")) {
    const name = `CE11 exit-side · ${tf}`;
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

  // ── a re-render moves the held host: the host's own glide read in paint, beside the lens (P-E11 §8 item 2: no browser cell drives it under zoom) ──
  if (want("rerender")) for (const dir of ["up", "down"]) for (const tf of tfs("none", "scale", "zoom125", "zoom2")) for (const where of ["out", "in"]) {
    const name = `CE11 rerender · ${dir} · ${tf} · ${where}`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, scP, {});
      try {
        await setupPage(P.page, TF[tf], 200);
        await P.page.evaluate(([root, where]) => { document.documentElement.style.overflowAnchor = "none"; const h = document.querySelector(root).parentElement; const blk = document.createElement("div"); blk.id = "ce11-blk"; blk.style.height = "60px"; if (where === "in") h.insertBefore(blk, h.firstChild); else h.parentElement.insertBefore(blk, h); }, [ROOT, where]);
        await P.page.waitForTimeout(250); const rows = await P.page.evaluate(rowsOf); await hold(P, 900, thumbP);
        try {
          await P.page.evaluate(([L, dir]) => { const l = document.querySelector(L.lens), t = document.querySelector(L.track).getBoundingClientRect(), lh = l.getBoundingClientRect().height; const room = t.top - lh; scrollBy(0, dir === "up" ? room - 12 : room + 12); }, [L, dir]);
          await P.page.waitForTimeout(350);
          const film = await P.page.evaluate(FILM, [L, "none", null, `(n) => { if (n === 6) { const blk = document.getElementById("ce11-blk"); if (${JSON.stringify(dir)} === "up") blk.remove(); else { const b2 = document.createElement("div"); b2.style.height = "60px"; blk.after(b2); } } return 0; }`, 8, 900]);
          return { ...film, rows, errs: [...P.errors] };
        } finally { await P.page.mouse.up(); }
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed || r.none) { cell(name, "FAIL", r.line ?? "NO LOUPE"); continue; }
    const v = readSide(r, r.rows); const S = r.out.filter((x) => !x.gone && x.ht != null); const i5 = S.findIndex((x) => x.n >= 6); const pre = S[i5 - 1], post = S[i5];
    const H = S.slice(Math.max(0, i5 - 1)); let hw = 0; for (let i = 0; i < H.length; i++) for (let j = i + 1; j < H.length && H[j].tl - H[i].tl <= NOM + 0.5; j++) hw = Math.max(hw, Math.abs(H[j].ht - H[i].ht));
    const hspan = Math.abs((S.at(-1)?.ht ?? 0) - (pre?.ht ?? 0)); const hbound = hspan * (v.peak ?? 0) + 1; const jump = Math.abs((post?.ht ?? 0) - (pre?.ht ?? 0)); const hds = [...new Set(S.flatMap((x) => x.hd ?? []))];
    const lensOk = v.changes <= 1 && Math.abs(v.end?.pin ?? 99) <= 2 && (v.changes === 0 || v.win16 <= v.bound11); const hostOk = hspan < 1 || (hw <= hbound && hds.length > 0);
    cell(name, hspan < 1 ? "UNMEASURED" : lensOk && hostOk ? "PASS" : "FAIL", `${hspan < 1 ? "NOT DRIVEN (the host did not move) · " : ""}HOST: moved ${f(hspan, 1)} painted px; the mutation's frame ${f(jump, 1)} px from the place before; largest 16.7 ms move ${f(hw, 1)} / bound ${f(hbound, 1)} = span x dock ${f(v.peak, 3)} + 1; host glide clock(s) ${hds.join(",") || "none"} ms; ht [${H.slice(0, 12).map((x) => +x.ht.toFixed(1)).join(" ")}] · LENS: ${v.changes} change(s), end pin ${f(v.end?.pin, 1)} px, ${line11(v)} · errors ${r.errs.length}`);
  }

  // ── a press at the line ──
  if (want("press-line")) for (const off of [-3, 0, 1, 3, 6, 9, 12]) {
    const name = `CE11 press-line · ${off} px`;
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
    const name = `CE11 noroom · ${h} px viewport`;
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
    const name = "CE11 repress · below, released, pressed inside the exit";
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
  if (want("film")) for (const [tf, css] of tfs("none", "zoom125", "zoom2").map((k) => [k, TF[k]])) {
    const name = `CE11 film · ${tf}`;
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

  // ── CK-21 on the travel's tokens: values the bytes' check may pass, both paths, a later hold ──
  const laterHold = async (P, th) => { await P.page.mouse.up(); await P.page.waitForTimeout(900); const c = await center(P.page, th); await P.page.mouse.move(c.x, c.y); await P.page.mouse.down(); await P.page.waitForTimeout(600);
    const x = await P.page.evaluate((L) => { const l = document.querySelector(L.lens), t = document.querySelector(L.track); const eng = !!document.querySelector("[data-engaged]"); if (!l || !t) return { eng, lens: false }; const a = l.getBoundingClientRect(), d = t.getBoundingClientRect(); const below = l.hasAttribute("data-engage-lens-below"); return { eng, lens: true, op: +getComputedStyle(l).opacity, pin: below ? a.top - d.bottom : a.bottom - d.top }; }, L); await P.page.mouse.up(); return x; };
  if (want("loudx")) for (const [tok, val, kind] of [[null, null, "clean"], ["--spring-dock-settle", "0.21s", "clean"], ["--spring-dock", "steps(4)", "valid"], ["--spring-dock", "nonsense", "refused"], ["--spring-dock", "ease, linear", "refused"], ["--spring-dock", "linear(0, 1), ease-in", "refused"], ["--spring-dock-settle", "210ms", "unit"], ["--spring-dock", "var(--ce11-undefined)", "refused"], ["--spring-dock", "ease-in-out", "valid"]]) for (const pk of ["side", "rerender"]) {
    const name = `CE11 loudx · ${tok ?? "clean"}${val ? ` ${val}` : ""} · ${pk}`;
    const r = await guard(name, async () => {
      const side = pk === "side"; const P = await openPage(E, T, side ? sc : scP, tok ? { plant: [tok, val] } : {});
      try {
        const supports = await P.page.evaluate((v) => (v ? { anim: CSS.supports("animation-timing-function", v), trans: CSS.supports("transition-timing-function", v), waapi: (() => { try { document.createElement("div").animate({ opacity: [0, 1] }, { duration: 1, easing: v }).cancel(); return true; } catch (e) { return String(e.name); } })() } : null), val && tok === "--spring-dock" ? val : null);
        let film, clocks = [];
        if (side) { await setupCarry(P.page, null); await P.page.waitForTimeout(250); await hold(P); film = await P.page.evaluate(FILM, [L, "carry", m.clip.box, "(n, st, last) => (last && last.tt - last.H < -40 ? 0 : -2)", 160, 500]); clocks = [...new Set(film.out.flatMap((x) => x.ad ?? []))]; }
        else { await setupPage(P.page, null, 200); await P.page.evaluate((root) => { document.documentElement.style.overflowAnchor = "none"; const h = document.querySelector(root).parentElement; const blk = document.createElement("div"); blk.id = "ce11-blk"; blk.style.height = "60px"; h.parentElement.insertBefore(blk, h); }, ROOT); await P.page.waitForTimeout(250); await hold(P, 900, thumbP);
          film = await P.page.evaluate(FILM, [L, "none", null, `(n) => { if (n === 4) document.getElementById("ce11-blk").remove(); return 0; }`, 6, 500]); clocks = [...new Set(film.out.flatMap((x) => x.hd ?? []))]; }
        const later = await laterHold(P, side ? thumb : thumbP);
        const S = film.out.filter((x) => !x.gone); let ch = 0; for (let i = 1; i < S.length; i++) if (S[i].below !== S[i - 1].below) ch++; const end = S.at(-1);
        let w16 = 0; for (let i = 0; i < S.length; i++) for (let j = i + 1; j < S.length && S[j].tl - S[i].tl <= NOM + 0.5; j++) w16 = Math.max(w16, Math.abs((side ? S[j].rel - S[i].rel : S[j].ht - S[i].ht)));
        const off = S.filter((x) => x.op > 0.05 && Math.abs(x.pin) > 2); const hmove = Math.abs((S.at(-1)?.ht ?? 0) - (S[0]?.ht ?? 0));
        return { supports, clocks, ch, end, errs: [...P.errors], later, w16, off: off.length, offWorst: off.reduce((p, x) => Math.max(p, Math.abs(x.pin)), 0), hmove, nS: S.length };
      } finally { await P.close(); }
    }, 90000);
    if (r.crashed) { cell(name, "FAIL", r.line); continue; }
    const named = tok ? r.errs.filter((e) => e.includes(tok)).length : 0; const uncaught = r.errs.filter((e) => e.startsWith("pageerror")).length; const laterOk = r.later?.eng && r.later?.lens && r.later.op > 0.9 && Math.abs(r.later.pin) <= 2;
    const maxClock = r.clocks.length ? Math.max(...r.clocks) : 0;
    const ok = kind === "clean" ? r.errs.length === 0 && laterOk && (maxClock === 0 || maxClock <= 260) : kind === "valid" ? r.errs.length === 0 && laterOk && maxClock > 0 : kind === "refused" ? named >= 1 && uncaught === 0 && laterOk : (named >= 1 || (maxClock > 0 && maxClock <= 1000)) && uncaught === 0 && laterOk;
    cell(name, ok ? "PASS" : "FAIL", `[${kind}] CSS.supports animation-timing-function ${r.supports?.anim ?? "-"}, transition ${r.supports?.trans ?? "-"}, animate() ${r.supports?.waapi ?? "-"} · errors ${r.errs.length} (${named} name the token, ${uncaught} uncaught) · ${pk === "side" ? "lens" : "host"} travel clock(s) ${r.clocks.join(",") || "none"} ms · side changes ${r.ch}, end pin ${f(r.end?.pin, 1)} px; over the ${r.nS} frames read: largest 16.7 ms move of the ${pk === "side" ? "lens against its track" : "host"} ${f(r.w16, 1)} px, ${r.off} frames off its edge > 2 px (worst ${f(r.offWorst, 1)}), host moved ${f(r.hmove, 1)} px · later hold: engaged ${r.later?.eng}, lens ${r.later?.lens}, opacity ${f(r.later?.op, 2)}, pin ${f(r.later?.pin, 1)} px · first [${(r.errs[0] ?? "-").slice(0, 160)}]`);
  }

  // ── CK-21 on the release carry's clock (A's and the floor's bytes: useEngage carry() reads RELEASE_RULE.row "dock"'s settle through rowClockMs,
  //    the same read the lens's travel makes): a fling of the held slider on a page whose <html> carries the settle token in another unit ──
  if (want("relclock")) for (const [tok, val] of [[null, null], ["--spring-dock-settle", "0.21s"], ["--spring-dock-settle", "210ms"], ["--spring-dock-settle", "nonsense"]]) {
    const name = `CE11 relclock · ${tok ? `${tok} ${val}` : "clean"}`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, scP, tok ? { plant: [tok, val] } : {});
      try {
        await setupPage(P.page, null, 200); await P.page.waitForTimeout(250);
        const c = await center(P.page, thumbP); await P.page.mouse.move(c.x, c.y); await P.page.mouse.down(); await P.page.waitForTimeout(500);
        for (let i = 1; i <= 8; i++) { await P.page.mouse.move(c.x - 14 * i, c.y); await P.page.waitForTimeout(8); }
        await P.page.mouse.up();
        const durs = await P.page.evaluate(() => new Promise((ok) => setTimeout(() => ok(document.getAnimations().filter((x) => !x.transitionProperty && !x.animationName).map((x) => ({ d: Math.round(x.effect.getTiming().duration), tag: x.effect.target?.className?.toString().slice(0, 40) ?? "?", p: Object.keys(x.effect.getKeyframes()[0] ?? {}).filter((k) => !["offset", "easing", "composite", "computedOffset"].includes(k)).join("+") }))), 40)));
        return { durs, errs: [...P.errors] };
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed) { cell(name, "FAIL", r.line); continue; }
    const named = tok ? r.errs.filter((e) => e.includes(tok)).length : 0; const maxD = r.durs.length ? Math.max(...r.durs.map((x) => x.d)) : 0;
    const ok = r.errs.filter((e) => e.startsWith("pageerror")).length === 0 && (named >= 1 || (r.durs.length > 0 && maxD <= 1000));
    cell(name, !tok || val === "0.21s" ? (r.durs.length && maxD <= 1000 && r.errs.length === 0 ? "PASS" : r.durs.length ? "FAIL" : "UNMEASURED") : ok ? "PASS" : "FAIL", `a fling of the held slider 112 px left over 8 moves, released: WAAPI animations 40 ms after the release ${r.durs.map((x) => `${x.p || "?"} ${x.d} ms`).join(", ") || "none"} · errors ${r.errs.length} (${named} name the token) · first [${(r.errs[0] ?? "-").slice(0, 140)}] · pass rule: the carry rides a clock <= 1000 ms, or the token is named`);
  }

  // ── the reach under a transform (P-E11 §8 item 2: the room is now written in the host's px; no cell reads it under a transform) ──
  if (want("reach")) for (const tf of tfs("none", "scale", "zoom08", "zoom125", "zoom2")) {
    const name = `CE11 reach · ${tf}`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, scP, { vp: { width: 390, height: 700 } });
      try {
        await setupPage(P.page, TF[tf], 200); await P.page.waitForTimeout(200);
        const g = await P.page.evaluate((root) => { const d = document.createElement("div"); d.style.cssText = "position:absolute;width:var(--space-section);height:1px"; document.body.appendChild(d); const gpx = d.getBoundingClientRect().width; d.remove();
          const host = document.querySelector(root); const vw = innerWidth; let k = host.getBoundingClientRect().width / host.offsetWidth; host.style.boxSizing = "border-box"; host.style.width = `${(vw - 2 * gpx - 20) / k}px`; host.style.position = "relative";
          const rr = host.getBoundingClientRect(); k = rr.width / host.offsetWidth; host.style.left = `${(vw / 2 - (rr.left + rr.width / 2)) / k}px`; return { gpx, vw, k }; }, ROOT);
        await P.page.waitForTimeout(300);
        const rest = await P.page.evaluate((root) => { const b = document.querySelector(root).getBoundingClientRect(); return { l: b.left, r: b.right, w: b.width, h: b.height }; }, ROOT);
        await hold(P, 1100, thumbP);
        const eng = await P.page.evaluate((root) => { const host = document.querySelector("[data-engaged]") ?? document.querySelector(root); const b = host.getBoundingClientRect(); const cs = getComputedStyle(host); return { l: b.left, r: b.right, w: b.width, h: b.height, room: host.style.getPropertyValue("--stage-room"), sw: host.style.getPropertyValue("--stage-w"), reach: cs.getPropertyValue("--stage-reach"), same: host === document.querySelector(root) }; }, ROOT);
        await P.page.mouse.up(); return { g, rest, eng };
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed) { cell(name, "FAIL", r.line); continue; }
    const mR = Math.min(r.rest.l, r.g.vw - r.rest.r), mE = Math.min(r.eng.l, r.g.vw - r.eng.r); const ri = r.eng.w / r.rest.w, rb = r.eng.h / r.rest.h;
    cell(name, rb >= 1.03 && mE >= r.g.gpx - 0.5 ? "PASS" : "FAIL", `page gutter ${f(r.g.gpx, 1)} painted px, frame ${f(r.g.k, 3)} · rest margin ${f(mR, 1)} px · engaged margin ${f(mE, 1)} px (inline x${f(ri, 4)}, block x${f(rb, 4)}) · --stage-room ${r.eng.room}, --stage-w ${r.eng.sw}, --stage-reach ${r.eng.reach}${r.eng.same ? "" : " (engaged host is not the scene root)"} · pass rule: block >= x1.03 and the engaged box no nearer the viewport edge than the page gutter`);
  }

  // ── the frame walk's cost, Chromium (CDP Performance metrics over a still hold) ──
  if (want("cost") && engine === "chromium") for (const tf of tfs("none", "zoom125", "deep")) {
    const name = `CE11 cost · ${tf}`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, scP, {});
      try {
        await setupPage(P.page, tf === "deep" ? null : TF[tf], 200);
        if (tf === "deep") await P.page.evaluate((root) => { const h = document.querySelector(root).parentElement; let el = h; for (let i = 0; i < 40; i++) { const w = document.createElement("div"); el.parentElement.insertBefore(w, el); w.appendChild(el); el = w; } }, ROOT);
        await P.page.waitForTimeout(400); const cdp = await P.ctx.newCDPSession(P.page); await cdp.send("Performance.enable");
        const M = async () => Object.fromEntries((await cdp.send("Performance.getMetrics")).metrics.map((x) => [x.name, x.value]));
        const win = async (ms) => { const a = await M(); const fr = await P.page.evaluate((ms) => new Promise((ok) => { let n = 0; const t0 = performance.now(); const tick = () => { n++; if (performance.now() - t0 < ms) requestAnimationFrame(tick); else ok({ n, ms: performance.now() - t0 }); }; requestAnimationFrame(tick); }), ms); const b = await M(); return { fr, d: Object.fromEntries(["ScriptDuration", "TaskDuration", "LayoutCount", "RecalcStyleCount", "LayoutDuration", "RecalcStyleDuration"].map((k) => [k, b[k] - a[k]])) }; };
        const rest = await win(3000); const c = await center(P.page, thumbP); await P.page.mouse.move(c.x, c.y); await P.page.mouse.down(); await P.page.waitForTimeout(600); const held = await win(3000); await P.page.mouse.up();
        return { rest, held };
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed) { cell(name, "REPORT", r.line); continue; }
    const pf = (w, k) => (w.d[k] * 1000) / w.fr.n; const ps = (w, k) => w.d[k] / (w.fr.ms / 1000);
    cell(name, "REPORT", `rest: ${r.rest.fr.n} frames, script ${f(pf(r.rest, "ScriptDuration"), 3)} ms/frame, task ${f(pf(r.rest, "TaskDuration"), 3)} ms/frame, layouts ${f(ps(r.rest, "LayoutCount"), 1)}/s, recalcs ${f(ps(r.rest, "RecalcStyleCount"), 1)}/s · held still: ${r.held.fr.n} frames, script ${f(pf(r.held, "ScriptDuration"), 3)} ms/frame, task ${f(pf(r.held, "TaskDuration"), 3)} ms/frame, layouts ${f(ps(r.held, "LayoutCount"), 1)}/s, recalcs ${f(ps(r.held, "RecalcStyleCount"), 1)}/s, style ${f(pf(r.held, "RecalcStyleDuration"), 3)} ms/frame`);
  }

  // ── C-9's sentence: a released lens on a style-written move (stated as unheard); the stills of the side change ──
  if (want("still")) for (const [tf, css] of tfs("zoom125", "zoom2", "zoom25").map((k) => [k, TF[k]])) {
    const name = `CE11 still · ${tf}`;
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
