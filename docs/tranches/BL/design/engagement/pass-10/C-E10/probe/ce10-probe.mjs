#!/usr/bin/env node
// ce10-probe · C-E10's own cells (D5 pass 10), on the harness's app and lib; nothing in ../../../harness is edited. A critic's search on the
// paths H10's cells and P-E10 §8 item 2 leave undriven. Every cell prints what it read; each cell line's verdict word is REPORT, and the
// report weighs each one against the row it would break. Post-paint read: a task posted from requestAnimationFrame, as E-10's and E-13's.
//   sidexf · <tf>           the side change (carry drive, 2 px a frame, 40 px past the line) on transforms H10's cells do not read
//   sidepage · <tf>         the same on a page scroll
//   reverse · <tf> · +<k>   the side change reversed inside its travel: k frames after the change the track is carried back 48 px past the band
//   reltravel · <tf>        a release inside the travel
//   turnexit · <tf>         a side change during the exit, on a real scroll of the scroller
//   exitmut · <tf>          a re-render (a childList insert before the control) inside the exit; `held` the same during the hold, the control
//   exitstyle · <tf>        a style-written move inside the exit: C-9's stated limit, read for its size
//   below · enter|exit · <tf>  the raise and the exit on the below side: H10's clock cells read the above side only
//   pressline · <tf> · room <r>  a press that starts <r> px above the line: the grow reaches the line on the raise
//   repress · <tf> · <how>  in-exit: re-press inside the exit; gone: re-press after the lens left; moved: moved back above during the exit, then re-press
//   coarse · <tf>           the side change on a held touch
//   short                   a viewport with no room on either side
//   loud · <token>          the side change with the row's easing or clock unreadable (P-E10 §8 item 6): one console.error, and no silent travel
//   rerender · <tf>         a re-render under a hold that carries the track across the line, with the host's glide
//   dialog                  a mouse hold on the Dialog's slider; Escape, Escape
//   clockxf · enter|exit · <tf>  the lens's clocks on transforms H10's cells do not read
//   sidefilm · <tf>         the side change on a recorded film: the lens flat blue, the track flat red; per decoded frame the lens's centre against the track's top. The paint's own read of the travel
// Real Safari: UNMEASURED (owner's safaridriver checkbox). Playwright WebKit is not Safari.
//   node ce10-probe.mjs --build <dir> --label <l> [--engine webkit] [--out <dir>] [--only a,b] [--tfs a,b]
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
const H = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness";
const { witness, openPage, openTouchPage, center, f, INIT } = await import(`${H}/lib.mjs`);
const BOX = '[data-t="box"]', REST = '[data-t="slider-a"]', THUMB = '[data-t="slider-a"] [role="slider"]';
const L = { lens: ".glass-loupe", track: ".slider-track" };
const DOCK_PEAK = 0.139, NOM = 16.7;
const TF = {
  none: {}, translate: { translate: "0 30px" }, scale: { scale: "0.8", transformOrigin: "0 0" }, scale125: { scale: "1.25", transformOrigin: "0 0" },
  zoom08: { zoom: "0.8" }, zoom125: { zoom: "1.25" }, aniso: { scale: "0.8 1", transformOrigin: "0 0" }, rotate: { rotate: "6deg" },
  perspective: { transform: "perspective(800px) rotateX(8deg)" }, nested: { scale: "0.9", transformOrigin: "0 0", __parent: { scale: "0.9", transformOrigin: "0 0" } },
};
// the sampler: window.__s[], one row per frame, read after that frame's paint
const SAMPLER = () => {
  const q = (x) => document.querySelector(x); window.__s = []; window.__stop = false; let n = 0; const ch = new MessageChannel(); const t0 = performance.now(); window.__t0 = t0;
  ch.port1.onmessage = () => { const l = q(".glass-loupe"), t = q('[data-t="slider-a"] .slider-track') ?? q(".slider-track"); if (!l || !t) { window.__s.push({ n, t: performance.now() - t0, gone: true }); return; } const a = l.getBoundingClientRect(), d = t.getBoundingClientRect(); if (!(a.width > 0)) return; const cs = getComputedStyle(l); const rel = a.top + a.height / 2 - (d.top + d.height / 2);
    window.__s.push({ n, t: performance.now() - t0, rel, pin: rel < 0 ? a.bottom - d.top : a.top - d.bottom, dx: a.left + a.width / 2 - (d.left + d.width / 2), lt: a.top, lb: a.bottom, tt: d.top, tb: d.bottom, H: a.height, op: +cs.opacity, sc: cs.scale, below: l.hasAttribute("data-engage-lens-below"), an: l.getAnimations().filter((x) => x.playState === "running" && !x.transitionProperty).map((x) => `${x.effect.getTiming().duration}|${String(x.effect.getTiming().easing).slice(0, 10)}|${x.effect.composite}`) }); };
  const tick = () => { n++; for (const fn of window.__each ?? []) fn(n); ch.port2.postMessage(0); if (!window.__stop) requestAnimationFrame(tick); };
  window.__each = []; requestAnimationFrame(tick);
};
const read = (S, bound0) => {
  const R = S.filter((x) => !x.gone); if (!R.length) return { n: 0 }; let changes = 0; for (let i = 1; i < R.length; i++) if (R[i].rel > 0 !== R[i - 1].rel > 0) changes++;
  let step = 0, at = 0; for (let i = 1; i < R.length; i++) { const d = (Math.abs(R[i].rel - R[i - 1].rel) * NOM) / Math.max(NOM, R[i].t - R[i - 1].t); if (d > step) { step = d; at = i; } }
  const shown = R.filter((x) => x.op > 0.05); const worst = shown.reduce((p, x) => (Math.abs(x.pin) > Math.abs(p.pin) ? x : p), shown[0] ?? R[0]); const wdx = shown.reduce((p, x) => (Math.abs(x.dx) > Math.abs(p.dx) ? x : p), shown[0] ?? R[0]);
  const off = R.filter((x) => Math.abs(x.pin) > 2).length; const end = R.at(-1); const span = changes ? Math.abs(R.at(-1).rel - R[0].rel) : 0;
  const minTop = Math.min(...R.map((x) => x.lt)); const dts = R.slice(1).map((x, i) => x.t - R[i].t).sort((p, q) => p - q); const mdt = dts.length ? dts[dts.length >> 1] : NaN;
  // the move over any 16.7 ms window of real time (the bound's own frame), from the samples: the largest |rel(t) − rel(t − 16.7)| with rel interpolated
  const relAt = (t) => { for (let i = 1; i < R.length; i++) if (R[i].t >= t) { const a = R[i - 1], b = R[i]; return a.rel + ((b.rel - a.rel) * (t - a.t)) / Math.max(1e-6, b.t - a.t); } return R.at(-1).rel; };
  let win = 0; for (const x of R) if (x.t - R[0].t >= NOM) win = Math.max(win, Math.abs(x.rel - relAt(x.t - NOM)));
  return { mdt, win, minTop, n: R.length, changes, step, atT: R[at]?.t, off, end, span, bound: span * DOCK_PEAK + 1, worst, wdx, relA: R[0].rel, relZ: end.rel, an: [...new Set(R.flatMap((x) => x.an ?? []))].join(",") };
};
const line = (v) => (v.n ? `${v.n} frames · ${v.changes} change(s), rel ${f(v.relA, 1)} → ${f(v.relZ, 1)} · step ${f(v.step, 1)} px at +${f(v.atT, 0)} ms (median sample ${f(v.mdt, 1)} ms; over any 16.7 ms window ${f(v.win, 1)} px) (span ${f(v.span, 1)} × ${DOCK_PEAK} + 1 = ${f(v.bound, 1)}) · ${v.off} frames off > 2 px · worst shown pin ${f(v.worst?.pin, 1)} px at +${f(v.worst?.t, 0)} ms (opacity ${f(v.worst?.op, 2)}, scale ${v.worst?.sc}) · worst across ${f(v.wdx?.dx, 1)} · highest lens top ${f(v.minTop, 1)} · end pin ${f(v.end?.pin, 1)} dx ${f(v.end?.dx, 1)} whole ${v.end?.lt >= -0.5} (lens ${f(v.end?.lt, 1)}..${f(v.end?.lb, 1)}) · anim [${v.an}]` : "no lens frame read");

await witness("CE10-probe", "C-E10's cells: the lens on paths H10's cells and P-E10 §8 item 2 leave undriven", async ({ a, E, T, cell, guard, engine }) => {
  const only = typeof a.only === "string" ? new Set(a.only.split(",")) : null; const want = (k) => !only || only.has(k);
  const tfSel = typeof a.tfs === "string" ? new Set(a.tfs.split(",")) : null; const tfs = (...x) => x.filter((k) => !tfSel || tfSel.has(k));
  // place the track so that the lens's line lies `room` px above its top (room = track top − lens height), with a transform on the box
  const place = (page, css, y) => page.evaluate(([B, Q, css, y]) => { const b = document.querySelector(B); const { __parent, ...c } = css; Object.assign(b.style, c); if (__parent) Object.assign(b.parentElement.style, __parent); b.style.position = "relative"; const q = document.querySelector(Q); const br = b.getBoundingClientRect(), k = br.height / b.offsetHeight, rr = q.getBoundingClientRect(); b.scrollTop += (rr.top - (br.top + b.clientTop * k + 6)) / k; const t0 = document.querySelector(Q + " .slider-track").getBoundingClientRect().top; b.style.top = `${(parseFloat(b.style.top) || 0) + (y - t0)}px`; if (getComputedStyle(b).zoom !== "1") { const t1 = document.querySelector(Q + " .slider-track").getBoundingClientRect().top; b.style.top = `${parseFloat(b.style.top) + (y - t1) / parseFloat(getComputedStyle(b).zoom)}px`; } const st = document.createElement("style"); st.textContent = ".glass-focus-veil { visibility: hidden !important; }"; document.head.appendChild(st); }, [BOX, REST, css, y]);
  const hold = async (P) => { const c = await center(P.page, THUMB); await P.page.mouse.move(c.x, c.y); await P.page.mouse.down(); };
  const lensH = (page) => page.evaluate(() => { const l = document.querySelector(".glass-loupe"); return l ? l.getBoundingClientRect().height : 0; });
  const carryPast = (page, rate, past, ms) => page.evaluate(([rate, past, ms]) => new Promise((ok) => { const b = document.querySelector('[data-t="box"]'); const zoom = parseFloat(getComputedStyle(b).zoom) || 1; let top = parseFloat(b.style.top) || 0; const l0 = document.querySelector(".glass-loupe"), t0 = document.querySelector('[data-t="slider-a"] .slider-track'); const dist = t0.getBoundingClientRect().top - l0.getBoundingClientRect().height; let moved = 0, done = false; const total = Math.max(0, dist) + past; window.__each.push(() => { if (moved < total) { top -= rate / zoom; moved += rate; b.style.top = `${top}px`; } else if (!done) { done = true; setTimeout(() => ok(), ms); } }); }), [rate, past, ms]);
  const SETTLE = 900;

  if (want("sidexf")) for (const tf of tfs("none", "scale", "translate", "zoom08", "zoom125", "scale125", "aniso", "nested", "rotate", "perspective")) {
    const name = `CE10 sidexf · ${tf}`;
    const r = await guard(name, async () => { const P = await openPage(E, T, "clipstale"); try { await place(P.page, TF[tf], 170); await P.page.waitForTimeout(250); await hold(P); try { await P.page.waitForTimeout(SETTLE); await P.page.evaluate(SAMPLER); await carryPast(P.page, 2, 40, 700); const s = await P.page.evaluate(() => { window.__stop = true; return window.__s; }); return { s }; } finally { await P.page.mouse.up(); } } finally { await P.close(); } }, 60000);
    cell(name, "REPORT", r.crashed ? r.line : line(read(r.s)));
  }
  if (want("sidepage")) for (const tf of tfs("none", "zoom08", "zoom125")) {
    const name = `CE10 sidepage · ${tf}`;
    const r = await guard(name, async () => { const P = await openPage(E, T, "clipstale"); try {
      await P.page.evaluate(([B, Q, css]) => { const mn = document.querySelector("main") ?? document.body; mn.style.paddingTop = "230px"; mn.style.paddingBottom = "1600px"; const b = document.querySelector(B); Object.assign(b.style, css); const q = document.querySelector(Q); const br = b.getBoundingClientRect(), k = br.height / b.offsetHeight, rr = q.getBoundingClientRect(); b.scrollTop += (rr.top - (br.top + b.clientTop * k + 6)) / k; const st = document.createElement("style"); st.textContent = ".glass-focus-veil { visibility: hidden !important; }"; document.head.appendChild(st); }, [BOX, REST, TF[tf]]);
      await P.page.waitForTimeout(250); await hold(P); try { await P.page.waitForTimeout(SETTLE); await P.page.evaluate(SAMPLER);
        await P.page.evaluate(() => new Promise((ok) => { const l0 = document.querySelector(".glass-loupe"), t0 = document.querySelector('[data-t="slider-a"] .slider-track'); const total = t0.getBoundingClientRect().top - l0.getBoundingClientRect().height + 40; let moved = 0, done = false; window.__each.push(() => { if (moved < total) { scrollBy(0, 3); moved += 3; } else if (!done) { done = true; setTimeout(ok, 700); } }); }));
        const s = await P.page.evaluate(() => { window.__stop = true; return window.__s; }); return { s }; } finally { await P.page.mouse.up(); } } finally { await P.close(); } }, 60000);
    cell(name, "REPORT", r.crashed ? r.line : line(read(r.s)));
  }
  if (want("reverse")) for (const tf of tfs("none", "scale")) for (const k of [2, 5, 9]) {
    const name = `CE10 reverse · ${tf} · +${k}`;
    const r = await guard(name, async () => { const P = await openPage(E, T, "clipstale"); try { await place(P.page, TF[tf], 170); await P.page.waitForTimeout(250); await hold(P); try { await P.page.waitForTimeout(SETTLE); await P.page.evaluate(SAMPLER);
      const s = await P.page.evaluate(([k]) => new Promise((ok) => { const b = document.querySelector('[data-t="box"]'); let top = parseFloat(b.style.top) || 0; let phase = "in", c = 0; const l = document.querySelector(".glass-loupe"); let turnN = 0;
        window.__each.push(() => { if (phase === "in") { if (l.hasAttribute("data-engage-lens-below")) { phase = "wait"; c = k; turnN = window.__s.length; } else { top -= 2; b.style.top = `${top}px`; } } else if (phase === "wait") { if (--c <= 0) { phase = "back"; c = 4; } } else if (phase === "back") { top += 16; b.style.top = `${top}px`; if (--c <= 0) { phase = "dwell"; setTimeout(() => { window.__stop = true; ok({ s: window.__s, turnN }); }, 800); } } }); }), [k]);
      return s; } finally { await P.page.mouse.up(); } } finally { await P.close(); } }, 60000);
    if (r.crashed) { cell(name, "REPORT", r.line); continue; }
    const v = read(r.s); const R = r.s; const around = R.slice(Math.max(0, r.turnN - 2), r.turnN + 22).map((x) => f(x.rel, 0)).join(" ");
    cell(name, "REPORT", `${line(v)} · rel from the first change: ${around}`);
  }
  if (want("reltravel")) for (const tf of tfs("none", "scale")) {
    const name = `CE10 reltravel · ${tf}`;
    const r = await guard(name, async () => { const P = await openPage(E, T, "clipstale"); try { await place(P.page, TF[tf], 170); await P.page.waitForTimeout(250); await hold(P); await P.page.waitForTimeout(SETTLE); await P.page.evaluate(SAMPLER);
      await P.page.evaluate(() => { const b = document.querySelector('[data-t="box"]'); let top = parseFloat(b.style.top) || 0; const l = document.querySelector(".glass-loupe"); window.__turned = false; window.__each.push(() => { if (window.__turned) return; if (l.hasAttribute("data-engage-lens-below")) { window.__turned = true; window.__turnT = performance.now() - window.__t0; } else { top -= 2; b.style.top = `${top}px`; } }); });
      await P.page.waitForFunction(() => window.__turned, null, { polling: "raf", timeout: 8000 }); await P.page.mouse.up(); const relT = await P.page.evaluate(() => performance.now() - window.__t0); await P.page.waitForTimeout(1100);
      const o = await P.page.evaluate(() => { window.__stop = true; return { s: window.__s, turnT: window.__turnT }; }); return { ...o, relT }; } finally { await P.close(); } }, 60000);
    if (r.crashed) { cell(name, "REPORT", r.line); continue; }
    const v = read(r.s); const after = r.s.filter((x) => !x.gone && x.t > r.turnT + 240 && x.op > 0.05); const w = after.length ? after.reduce((p, x) => (Math.abs(x.pin) > Math.abs(p.pin) ? x : p), after[0]) : null;
    cell(name, "REPORT", `release ${f(r.relT - r.turnT, 0)} ms after the change · ${line(v)} · past the travel's window, shown: ${after.length} frames, worst pin ${w ? `${f(w.pin, 1)} at opacity ${f(w.op, 2)}` : "none"} · gone by the end ${!!r.s.at(-1)?.gone}`);
  }
  if (want("turnexit")) for (const tf of tfs("none", "scale")) {
    const name = `CE10 turnexit · ${tf}`;
    const r = await guard(name, async () => { const P = await openPage(E, T, "clipstale"); try { await place(P.page, TF[tf], 170); await P.page.waitForTimeout(250); await hold(P); await P.page.waitForTimeout(SETTLE); const h0 = await lensH(P.page);
      await P.page.evaluate((y) => { const b = document.querySelector('[data-t="box"]'); const t0 = document.querySelector('[data-t="slider-a"] .slider-track').getBoundingClientRect().top; const k = b.getBoundingClientRect().height / b.offsetHeight; b.style.top = `${(parseFloat(b.style.top) || 0) + (y - t0)}px`; }, h0 + 10); await P.page.waitForTimeout(250);
      await P.page.evaluate(SAMPLER); await P.page.mouse.up(); await P.page.evaluate(() => { const b = document.querySelector('[data-t="box"]'); let c = 12; window.__each.push(() => { if (c-- > 0) b.scrollTop += 4; }); }); await P.page.waitForTimeout(1100);
      const s = await P.page.evaluate(() => { window.__stop = true; return window.__s; }); return { s, h0 }; } finally { await P.close(); } }, 60000);
    if (r.crashed) { cell(name, "REPORT", r.line); continue; }
    const v = read(r.s); const R = r.s.filter((x) => !x.gone); const tb = R.filter((x) => x.below).length;
    cell(name, "REPORT", `the track carried by a scroller scroll (4 px × 12 frames) across the line during the exit · ${line(v)} · frames below ${tb} · rel@op ${R.filter((_, i) => i % 3 === 0).slice(0, 14).map((x) => `${f(x.rel, 0)}@${f(x.op, 2)}`).join(" ")}`);
  }
  if (want("exitmut")) for (const tf of tfs("none", "translate", "scale")) for (const when of ["exit", "held"]) {
    const name = `CE10 exitmut · ${tf} · ${when}`;
    const r = await guard(name, async () => { const P = await openPage(E, T, "clipstale"); try { await place(P.page, TF[tf], 260); await P.page.waitForTimeout(250); await hold(P); try { await P.page.waitForTimeout(SETTLE); await P.page.evaluate(SAMPLER); await P.page.waitForTimeout(80);
      if (when === "exit") await P.page.mouse.up(); await P.page.waitForTimeout(50); await P.page.evaluate((Q) => { const d = document.createElement("div"); d.style.height = "40px"; d.setAttribute("data-t", "ce10-inserted"); document.querySelector(Q).before(d); }, REST); await P.page.waitForTimeout(when === "exit" ? 1000 : 700);
      const s = await P.page.evaluate(() => { window.__stop = true; return window.__s; }); return { s }; } finally { await P.page.mouse.up(); } } finally { await P.close(); } }, 60000);
    if (r.crashed) { cell(name, "REPORT", r.line); continue; }
    const R = r.s.filter((x) => !x.gone && x.op > 0.05); const v = read(r.s);
    cell(name, "REPORT", `a 40 px block inserted before the control ${when === "exit" ? "50 ms after the release" : "during the hold"} · ${line(v)} · pin@op ${R.filter((_, i) => i % 2 === 0).slice(0, 16).map((x) => `${f(x.pin, 1)}@${f(x.op, 2)}`).join(" ")}`);
  }
  if (want("exitstyle")) for (const tf of tfs("none", "scale")) {
    const name = `CE10 exitstyle · ${tf}`;
    const r = await guard(name, async () => { const P = await openPage(E, T, "clipstale"); try { await place(P.page, TF[tf], 260); await P.page.waitForTimeout(250); await hold(P); await P.page.waitForTimeout(SETTLE); await P.page.evaluate(SAMPLER); await P.page.waitForTimeout(80); await P.page.mouse.up(); await P.page.waitForTimeout(50);
      await P.page.evaluate(() => { document.querySelector('[data-t="spacer"]').style.height = "100px"; }); await P.page.waitForTimeout(1000); const s = await P.page.evaluate(() => { window.__stop = true; return window.__s; }); return { s }; } finally { await P.close(); } }, 60000);
    cell(name, "REPORT", r.crashed ? r.line : `C-9's stated limit: the spacer's height written 50 ms after the release · ${line(read(r.s))}`);
  }
  if (want("below")) for (const phase of ["enter", "exit"]) for (const tf of tfs("none", "translate", "scale")) {
    const name = `CE10 below · ${phase} · ${tf}`;
    const r = await guard(name, async () => { const P = await openPage(E, T, "clipstale"); try { await place(P.page, TF[tf], 40); await P.page.waitForTimeout(250); if (phase === "enter") await P.page.evaluate(SAMPLER); await hold(P); await P.page.waitForTimeout(phase === "enter" ? 900 : 1200); if (phase === "exit") { await P.page.evaluate(SAMPLER); await P.page.waitForTimeout(40); } await P.page.mouse.up(); await P.page.waitForTimeout(900); const s = await P.page.evaluate(() => { window.__stop = true; return window.__s; }); return { s }; } finally { await P.close(); } }, 60000);
    if (r.crashed) { cell(name, "REPORT", r.line); continue; }
    const R = r.s.filter((x) => !x.gone); const v = read(R); const flight = R.filter((x) => x.op > 0.05 && x.op < 0.95).length;
    cell(name, "REPORT", `frames below ${R.filter((x) => x.below).length}/${R.length}, in flight ${flight} · ${line(v)}`);
  }
  if (want("pressline")) for (const tf of tfs("none", "scale")) for (const room of [1, 3, 6, 10]) {
    const name = `CE10 pressline · ${tf} · room ${room}`;
    const r = await guard(name, async () => { const P = await openPage(E, T, "clipstale"); try { await place(P.page, TF[tf], 260); await P.page.waitForTimeout(250); await hold(P); await P.page.waitForTimeout(SETTLE); const h0 = await lensH(P.page); await P.page.mouse.up(); await P.page.waitForTimeout(900);
      const t = await P.page.evaluate((y) => { const b = document.querySelector('[data-t="box"]'); const tr = document.querySelector('[data-t="slider-a"] .slider-track'); const t0 = tr.getBoundingClientRect().top; const h = document.querySelector('[data-t="slider-a"] .glass-slider'); b.style.top = `${(parseFloat(b.style.top) || 0) + (y - t0)}px`; return tr.getBoundingClientRect().top; }, h0 + room); await P.page.waitForTimeout(200);
      await P.page.evaluate(SAMPLER); await hold(P); await P.page.waitForTimeout(900); await P.page.mouse.up(); await P.page.waitForTimeout(800); const s = await P.page.evaluate(() => { window.__stop = true; return window.__s; }); return { s, h0, t }; } finally { await P.close(); } }, 60000);
    if (r.crashed) { cell(name, "REPORT", r.line); continue; }
    const R = r.s.filter((x) => !x.gone); const v = read(R); cell(name, "REPORT", `lens ${f(r.h0, 1)} px tall, the track's top at ${f(r.t, 1)} at rest · ${line(v)} · rel@op ${R.filter((_, i) => i % 3 === 0).slice(0, 12).map((x) => `${f(x.rel, 0)}@${f(x.op, 2)}`).join(" ")}`);
  }
  if (want("repress")) for (const tf of tfs("none", "scale")) for (const how of ["in-exit", "gone", "moved"]) {
    const name = `CE10 repress · ${tf} · ${how}`;
    const r = await guard(name, async () => { const P = await openPage(E, T, "clipstale"); try { await place(P.page, TF[tf], 40); await P.page.waitForTimeout(250); await hold(P); await P.page.waitForTimeout(SETTLE); await P.page.evaluate(SAMPLER); await P.page.mouse.up();
      if (how === "in-exit") { await P.page.waitForTimeout(90); }
      if (how === "gone") { await P.page.waitForTimeout(1000); await P.page.evaluate(() => { const b = document.querySelector('[data-t="box"]'); b.style.top = `${(parseFloat(b.style.top) || 0) + 150}px`; }); await P.page.waitForTimeout(150); }
      if (how === "moved") { await P.page.waitForTimeout(70); await P.page.evaluate(() => { const b = document.querySelector('[data-t="box"]'); b.style.top = `${(parseFloat(b.style.top) || 0) + 150}px`; }); await P.page.waitForTimeout(30); }
      const before = await P.page.evaluate(() => window.__s.length); await P.page.evaluate(() => { window.__press = window.__s.length; });
      await hold(P); await P.page.waitForTimeout(800); const s = await P.page.evaluate(() => { window.__stop = true; return { s: window.__s, p: window.__press }; }); await P.page.mouse.up(); return { ...s, before }; } finally { await P.close(); } }, 60000);
    if (r.crashed) { cell(name, "REPORT", r.line); continue; }
    const R = r.s.slice(r.p).filter((x) => !x.gone); const v = read(R); cell(name, "REPORT", `after the re-press: ${line(v)} · below at end ${R.at(-1)?.below} · first frames pin@op ${R.slice(0, 8).map((x) => `${f(x.pin, 1)}@${f(x.op, 2)}`).join(" ")}`);
  }
  if (want("coarse")) for (const tf of tfs("none", "scale")) {
    const name = `CE10 coarse · ${tf}`;
    const r = await guard(name, async () => { const P = await openTouchPage(E, T, "clipstale", { theme: "light" }); try { if (!P.modeOk) return { mode: P.modeLine }; await place(P.page, TF[tf], 170); await P.page.waitForTimeout(250); const c = await center(P.page, THUMB);
      const [s] = await P.holdAt(c.x, c.y, [900], async () => { await P.page.evaluate(SAMPLER); await carryPast(P.page, 2, 40, 500); return await P.page.evaluate(() => { window.__stop = true; return window.__s; }); }); return { s }; } finally { await P.close(); } }, 90000);
    cell(name, "REPORT", r.crashed ? r.line : r.mode ? `MODE NOT APPLIED ${r.mode}` : line(read(r.s ?? [])));
  }
  if (want("short")) {
    const name = "CE10 short";
    const r = await guard(name, async () => { const P = await openPage(E, T, "clipstale", { vp: { width: 700, height: 150 } }); try { await place(P.page, {}, 70); await P.page.waitForTimeout(250); await hold(P); try { await P.page.waitForTimeout(SETTLE); return await P.page.evaluate(() => { const l = document.querySelector(".glass-loupe").getBoundingClientRect(), t = document.querySelector('[data-t="slider-a"] .slider-track').getBoundingClientRect(); return { lt: l.top, lb: l.bottom, tt: t.top, tb: t.bottom, below: document.querySelector(".glass-loupe").hasAttribute("data-engage-lens-below"), vh: innerHeight }; }); } finally { await P.page.mouse.up(); } } finally { await P.close(); } }, 60000);
    cell(name, "REPORT", r.crashed ? r.line : `a ${r.vh} px viewport, track ${f(r.tt, 1)}..${f(r.tb, 1)}: lens ${f(r.lt, 1)}..${f(r.lb, 1)} below ${r.below}; whole ${r.lt >= -0.5 && r.lb <= r.vh + 0.5}`);
  }
  if (want("loud")) for (const token of ["--spring-dock", "--spring-dock-settle"]) {
    const name = `CE10 loud · ${token}`;
    const r = await guard(name, async () => { const P = await openPage(E, T, "clipstale", { plant: [token, "initial"] }); try { await place(P.page, TF.none, 170); await P.page.waitForTimeout(250); await hold(P); try { await P.page.waitForTimeout(SETTLE); const e0 = P.errors.length; await P.page.evaluate(SAMPLER); await carryPast(P.page, 2, 40, 500); const s = await P.page.evaluate(() => { window.__stop = true; return window.__s; }); return { s, e0, errs: [...P.errors] }; } finally { await P.page.mouse.up(); } } finally { await P.close(); } }, 60000);
    cell(name, "REPORT", r.crashed ? r.line : `${token} read unreadable on <html> · ${line(read(r.s))} · console.error before the change ${r.e0}, total ${r.errs.length}: ${r.errs.slice(0, 4).join(" | ")}`);
  }
  if (want("rerender")) for (const tf of tfs("none", "scale")) {
    const name = `CE10 rerender · ${tf}`;
    const r = await guard(name, async () => { const P = await openPage(E, T, "clipstale"); try { await P.page.evaluate((Q) => { const d = document.createElement("div"); d.style.height = "60px"; d.setAttribute("data-t", "ce10-block"); document.querySelector(Q).before(d); }, REST); await place(P.page, TF[tf], 170); await P.page.waitForTimeout(250); await hold(P); try { await P.page.waitForTimeout(SETTLE); const h0 = await lensH(P.page);
      await P.page.evaluate((y) => { const b = document.querySelector('[data-t="box"]'); const t0 = document.querySelector('[data-t="slider-a"] .slider-track').getBoundingClientRect().top; b.style.top = `${(parseFloat(b.style.top) || 0) + (y - t0)}px`; }, h0 + 12); await P.page.waitForTimeout(300); await P.page.evaluate(SAMPLER); await P.page.waitForTimeout(80);
      await P.page.evaluate(() => document.querySelector('[data-t="ce10-block"]').remove()); await P.page.waitForTimeout(900); const s = await P.page.evaluate(() => { window.__stop = true; return window.__s; }); return { s }; } finally { await P.page.mouse.up(); } } finally { await P.close(); } }, 60000);
    cell(name, "REPORT", r.crashed ? r.line : `a 60 px block above the control removed during the hold; the track glides across the line · ${line(read(r.s))}`);
  }
  if (want("dialog")) {
    const name = "CE10 dialog";
    const r = await guard(name, async () => { const P = await openPage(E, T, "presented", { q: { slider: "1" } }); try { await P.page.waitForTimeout(500); const TH = '[data-t="dlg-slider"] [role="slider"]'; const c = await center(P.page, TH); await P.page.mouse.move(c.x, c.y); await P.page.mouse.down(); try { await P.page.waitForTimeout(SETTLE); await P.page.evaluate(SAMPLER); await P.page.waitForTimeout(60); await P.page.keyboard.press("Escape"); await P.page.waitForTimeout(400); await P.page.keyboard.press("Escape"); await P.page.waitForTimeout(1000);
      const s = await P.page.evaluate(() => { window.__stop = true; return window.__s; }); return { s, dlg: await P.page.evaluate(() => !!document.querySelector('[role="dialog"]')), errs: [...P.errors] }; } finally { await P.page.mouse.up(); } } finally { await P.close(); } }, 60000);
    if (r.crashed) { cell(name, "REPORT", r.line); return; }
    const R = r.s.filter((x) => !x.gone); cell(name, "REPORT", `a mouse hold on the Dialog's slider; Escape, 400 ms, Escape · dialog still mounted ${r.dlg}; errors ${r.errs.length} · ${line(read(R))} · gone at frame ${r.s.findIndex((x) => x.gone)}/${r.s.length} · pin@op ${R.filter((_, i) => i % 6 === 0).slice(0, 12).map((x) => `${f(x.pin, 1)}@${f(x.op, 2)}`).join(" ")}`);
  }
  if (want("clockxf")) for (const phase of ["enter", "exit"]) for (const tf of tfs("scale125", "zoom08", "zoom125", "aniso", "nested", "rotate", "perspective")) {
    const name = `CE10 clockxf · ${phase} · ${tf}`;
    const r = await guard(name, async () => { const P = await openPage(E, T, "clipstale"); try { await place(P.page, TF[tf], 260); await P.page.waitForTimeout(250); if (phase === "enter") await P.page.evaluate(SAMPLER); await hold(P); await P.page.waitForTimeout(phase === "enter" ? 800 : 1200); if (phase === "exit") { await P.page.evaluate(SAMPLER); await P.page.waitForTimeout(40); } if (phase === "enter") { const s = await P.page.evaluate(() => { window.__stop = true; return window.__s; }); await P.page.mouse.up(); return { s }; } await P.page.mouse.up(); await P.page.waitForTimeout(900); const s = await P.page.evaluate(() => { window.__stop = true; return window.__s; }); return { s }; } finally { await P.close(); } }, 60000);
    if (r.crashed) { cell(name, "REPORT", r.line); continue; }
    const R = r.s.filter((x) => !x.gone); const v = read(R); cell(name, "REPORT", `shown ${R.filter((x) => x.op > 0.05).length}, in flight ${R.filter((x) => x.op > 0.05 && x.op < 0.95).length} · worst shown pin ${f(v.worst?.pin, 1)} px at opacity ${f(v.worst?.op, 2)}, scale ${v.worst?.sc}; worst across ${f(v.wdx?.dx, 1)} · settled pin ${f(R.filter((x) => x.op > 0.99).at(-1)?.pin, 1)}`);
  }
  if (want("sidefilm")) for (const tf of tfs("none", "scale")) for (const k of [0, 1, 2]) {
    const name = `CE10 sidefilm · ${tf} · ${k}`;
    const r = await guard(name, async () => {
      const vdir = fs.mkdtempSync(path.join(os.tmpdir(), "ce10-"));
      try {
        const b = await E.nav(); const ctx = await b.newContext({ viewport: { width: 700, height: 500 }, deviceScaleFactor: 1, reducedMotion: "no-preference", recordVideo: { dir: vdir, size: { width: 700, height: 500 } } }); let page, x = null, t0 = 0;
        try {
          page = await ctx.newPage(); t0 = Date.now(); await page.addInitScript(INIT); await page.goto(`${T.url}?${new URLSearchParams({ scene: "clipstale", theme: "light" })}`); await page.waitForFunction(() => window.__e && window.__e.ready === true, null, { timeout: 60000 });
          await place(page, TF[tf], 170);
          await page.evaluate(() => { const st = document.createElement("style"); st.textContent = `.glass-loupe { background: rgb(0,0,230) !important; box-shadow: none !important; border-color: rgb(0,0,230) !important; backdrop-filter: none !important; -webkit-backdrop-filter: none !important; } .glass-loupe > * { visibility: hidden !important; } .slider-track { background: rgb(230,0,0) !important; box-shadow: none !important; border-color: rgb(230,0,0) !important; } .slider-range, .slider-thumb { visibility: hidden !important; }`; document.head.appendChild(st); });
          await page.waitForTimeout(300); const c = await center(page, THUMB); await page.mouse.move(c.x, c.y); await page.mouse.down();
          try { await page.waitForTimeout(1200); const g = await page.evaluate(() => { const t = document.querySelector('[data-t="slider-a"] .slider-track').getBoundingClientRect(); const l = document.querySelector(".glass-loupe").getBoundingClientRect(); return { lx: Math.round(l.left + l.width / 2), tx: Math.round(t.left + 6), tt: t.top, H: l.height }; });
            const lead = Math.max(0, Date.now() - t0 - 120);
            await page.evaluate(SAMPLER); await carryPast(page, 2, 30, 500); const s = await page.evaluate(() => { window.__stop = true; return window.__s; }); x = { g, lead, s };
          } finally { await page.mouse.up(); }
        } finally { const v = page?.video(); await ctx.close(); if (x && v) x.video = await v.path(); }
        const Hh = 500; const col = (cx) => execFileSync("ffmpeg", ["-v", "error", "-i", x.video, "-ss", `${x.lead / 1000}`, "-vf", `crop=2:${Hh}:${cx}:0`, "-pix_fmt", "rgb24", "-f", "rawvideo", "-"], { maxBuffer: 1 << 28 });
        const A = col(x.g.lx), B = col(x.g.tx); const N = Math.floor(A.length / (Hh * 6)); const d = [];
        for (let i = 0; i < N; i++) { const a0 = A.subarray(i * Hh * 6, (i + 1) * Hh * 6), b0 = B.subarray(i * Hh * 6, (i + 1) * Hh * 6); let lT = -1, lB = -1, tT = -1; for (let y = 0; y < Hh; y++) { const R = a0[y * 6], G = a0[y * 6 + 1], Bl = a0[y * 6 + 2]; if (Bl > 150 && R < 90 && G < 90) { if (lT < 0) lT = y; lB = y; } const R2 = b0[y * 6], G2 = b0[y * 6 + 1], B2 = b0[y * 6 + 2]; if (tT < 0 && R2 > 150 && G2 < 90 && B2 < 90) tT = y; } if (lT >= 0 && tT >= 0) d.push({ i, c: (lT + lB) / 2 - tT, tT, lT, lB }); }
        return { d, N, s: x.s, H: x.g.H };
      } finally { fs.rmSync(vdir, { recursive: true, force: true }); }
    }, 120000);
    if (r.crashed) { cell(name, "REPORT", r.line); continue; }
    let big = 0, at = -1; for (let i = 1; i < r.d.length; i++) { const m = Math.abs(r.d[i].c - r.d[i - 1].c); if (m > big) { big = m; at = i; } }
    const a0 = r.d[Math.max(0, at - 4)]?.c, zone = r.d.slice(Math.max(0, at - 5), at + 7).map((x) => f(x.c, 0)).join(" ");
    const v = read(r.s); cell(name, "REPORT", `a film: ${r.d.length}/${r.N} decoded frames read · the lens's centre against the track's top, the largest move between decoded frames ${f(big, 1)} px at frame ${at}; around it: ${zone} · main-thread read in the same run: step ${f(v.step, 1)} px, ${v.changes} change(s), rel ${f(v.relA, 1)} → ${f(v.relZ, 1)}`);
  }
}, 3000);
