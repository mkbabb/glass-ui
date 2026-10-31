#!/usr/bin/env node
// C-A11 adversarial probe (D5 pass 11, a fresh critic of HEAD + pass-11/P-E11.patch). Not a witness: each cell is scored in C-A11.md
// against the CK row it would break, or placed as a next-pass class. Built on the harness's own scene app and lib (one browser per run,
// a fresh context per cell, every page and context closed in a finally, the browser closed by witness(); WebKit retires its browser
// every NAV_CAP navigations). Films are read per frame in a task posted from requestAnimationFrame, each sample stamped with
// document.timeline.currentTime (H11's clock); THE STEP is the largest move of the lens's centre against its track's over any
// 16.7 ms of that time; THE SPAN is the lens's painted height plus its track's, read in the film's last frame; THE BOUND is
// span × the row's largest one-frame fraction + 1 (the row whose clock a running animation on the lens carries, else `dock`). All
// as H11's sideRead, re-implemented here so that the cards and paths H11 does not carry read on the same rule.
//   side <tf> · page|carry    the side change under cards H11 omits (zoom 2.5, zoom 1.25 with scale 0.8 on one box, scale 1.25,
//                             translate, a zoom of 1.25 on <html> itself) beside the ones it carries (none, zoom 0.8, 1.25, 2): an independent instrument
//   clock <tf>                the pinned edge on the raise and the exit, every frame with opacity > 0.05
//   reverse|wheel|release-mid|exit-side|rerender|repress|press-line <tf>   pass-10's paths, now under zoom
//   hostglide <tf>            a 40 px block inserted above the held host inside its zoomed card: the host's painted move (CK-20)
//   reach <tf> · <vw>         the engaged grow's painted box against the viewport (`--stage-room` under zoom and scale)
//   subjzoom                  a zoom on the lens's subject itself (between the host and the track): settled, and on a side change
//   loud <token> <value> · side|rerender   CK-21: values E-11 does not plant (an easing list, a settle in ms, a negative settle)
//   gcs                       getComputedStyle calls per frame while held (the frame's CPU read P-E11 §8 item 1 names), REPORT
//   film <tf>                 the side change in paint: lens blue, track red, one column, decoded per film frame (REPORT)
//   still <tf>                owner-glance stills above / mid (the travel paused at 0.15) / below
const H = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
const { witness, openPage, scenesFor, center, f, INIT, rowsOf, rowFacts, rodeRow, LENS_TF } = await import(`${H}/lib.mjs`);
const NOM = 1000 / 60;
const TF = { ...LENS_TF, zs: { zoom: "1.25", scale: "0.8", transformOrigin: "0 0" }, scale125: { scale: "1.25", transformOrigin: "0 0" }, translate: { translate: "13px 7px" }, htmlzoom: { __html: "1.25" } };
const ZOOM = (tf) => +(TF[tf]?.zoom ?? 1);

// The film. Each frame `plan(n, st, last, out)` says how far to carry the track (painted px; `carry` writes it in the scroller's own px).
const FILM = ([L, drive, B, planSrc, frames, afterMs]) => new Promise((ok) => {
  const q = (x) => document.querySelector(x); const b = B ? q(B) : null; let top = b ? Number.parseFloat(b.style.top) || 0 : 0; const zb = b ? b.currentCSSZoom ?? 1 : 1;
  const move = (dy) => { if (!dy) return; if (drive === "page") scrollBy(0, -dy); else if (b) { top += dy / zb; b.style.top = `${top}px`; } };
  const T = () => document.timeline.currentTime; const out = []; const ch = new MessageChannel(); let n = 0; const t0 = T(); const plan = eval(planSrc);
  ch.port1.onmessage = () => { const l = q(L.lens), t = q(L.track); if (!l || !t) { out.push({ n, t: T() - t0, gone: true }); return; } const a1 = l.getBoundingClientRect(), d = t.getBoundingClientRect(); if (!(a1.width > 0)) { out.push({ n, t: T() - t0, gone: true }); return; } const rel = a1.top + a1.height / 2 - (d.top + d.height / 2);
    const an = l.getAnimations().filter((x) => x.playState === "running").map((x) => ({ ms: x.effect.getTiming().duration, p: x.transitionProperty ?? "waapi" }));
    out.push({ n, t: T() - t0, rel, pin: rel < 0 ? a1.bottom - d.top : a1.top - d.bottom, dx: a1.left + a1.width / 2 - (d.left + d.width / 2), lt: a1.top, lb: a1.bottom, tt: d.top, tb: d.bottom, H: a1.height, op: +getComputedStyle(l).opacity, below: l.hasAttribute("data-engage-lens-below"), eng: !!q("[data-engaged]"), an }); };
  const l0 = q(L.lens), t1 = q(L.track); if (!l0 || !t1) { ok({ out, none: true }); return; }
  const st = { H0: l0.getBoundingClientRect().height, line: t1.getBoundingClientRect().top - l0.getBoundingClientRect().height, vh: innerHeight };
  let tEnd = 0;
  const tick = () => { n++; const last = out.filter((x) => !x.gone).at(-1); const dy = n <= frames ? plan(n, st, last, out) : 0; move(dy); ch.port2.postMessage(0); if (n > frames && !tEnd) tEnd = performance.now() + afterMs; if (tEnd && performance.now() >= tEnd) setTimeout(() => ok({ out, ...st, zb }), 50); else requestAnimationFrame(tick); };
  requestAnimationFrame(tick);
});
// H11's read, on this film: changes (rel's sign), the windowed step, the span read in the last frame, the bound, off-edge frames and window, whole
const readSide = (r, rows, rate, maxCh = 1) => { const S = r.out.filter((x) => !x.gone); const facts = rows.map(rowFacts).filter((x) => Number.isFinite(x.peak)); const dock = facts.find((x) => x.n === "dock");
  let changes = 0; for (let i = 1; i < S.length; i++) if (S[i].rel > 0 !== S[i - 1].rel > 0) changes++;
  const end = S.at(-1) ?? {}; const span = changes ? end.H + (end.tb - end.tt) : 0;
  const ams = [...new Set(S.flatMap((x) => x.an.filter((y) => y.p !== "opacity").map((y) => y.ms)))]; const rode = rodeRow(ams, rows); const row = rode ?? dock;
  const bound = span * (row?.peak ?? 0) + 1;
  const relAt = (t) => { for (let i = 1; i < S.length; i++) if (S[i].t >= t) { const a = S[i - 1], b = S[i]; return a.rel + ((b.rel - a.rel) * (t - a.t)) / Math.max(1e-6, b.t - a.t); } return S.at(-1).rel; };
  let step = 0, atT = NaN; for (const x of S) if (x.t - S[0].t >= NOM) { const d = Math.abs(x.rel - relAt(x.t - NOM)); if (d > step) { step = d; atT = x.t; } }
  const off = S.filter((x) => Math.abs(x.pin) > 2); const win = off.length ? off.at(-1).t - off[0].t : 0; const winMax = ((row?.ms ?? 0) * 1.5 + 150) * maxCh;
  const dxMax = S.length ? Math.max(...S.map((x) => Math.abs(x.dx))) : NaN; const above = S.length ? Math.max(0, ...S.map((x) => -x.lt)) : 0; const aboveMax = 2 * (rate ?? 0) + 2;
  const whole = end.lt >= -0.5 && end.lb <= (r.vh ?? 500) + 0.5; const pinEnd = Math.abs(end.pin ?? 99) <= 2;
  const ok = changes >= 1 && changes <= maxCh && step <= bound && (!off.length || win <= winMax) && dxMax <= 2 && whole && above <= aboveMax && pinEnd;
  return { ok, n: S.length, changes, step, atT, span, bound, row, rode, ams, off: off.length, win, winMax, worstOff: off.length ? Math.max(...off.map((x) => Math.abs(x.pin))) : 0, dxMax, above, aboveMax, whole, pinEnd, end };
};
const sideLine = (v) => `${v.changes} change(s) · largest move against the track over any 16.7 ms ${f(v.step, 1)} px at +${f(v.atT, 0)} ms; bound ${f(v.bound, 1)} = span ${f(v.span, 1)} × ${v.row ? `${v.row.n} ${f(v.row.peak, 3)} (${f(v.row.ms, 0)} ms)` : "none"} + 1${v.rode ? "" : ` (no running lens animation on a row's clock [${v.ams.map((x) => f(x, 0)).join(",")}]: dock)`} · off its edge > 2 px on ${v.off} frames over ${f(v.win, 0)} ms (≤ ${f(v.winMax, 0)}), worst ${f(v.worstOff, 1)} · across ${f(v.dxMax, 1)} px · end pin ${f(v.end?.pin, 1)} px, whole ${v.whole} (lens ${f(v.end?.lt, 1)}..${f(v.end?.lb, 1)}), at most ${f(v.above, 1)} px above the viewport (≤ ${f(v.aboveMax, 0)}) · ${v.n} frames`;

await witness("C-A11 probe", "C-A11's adversarial cells on the candidate's lens, reach, host glide and travel tokens", async ({ a, E, T, cell, guard, idx, engine }) => {
  const only = typeof a.only === "string" ? new Set(a.only.split(",")) : null; const want = (k) => !only || only.has(k);
  const tfSel = typeof a.tfs === "string" ? new Set(a.tfs.split(",")) : null; const tfs = (...x) => x.filter((k) => !tfSel || tfSel.has(k));
  const frames = typeof a.frames === "string" ? a.frames : null; if (frames) fs.mkdirSync(frames, { recursive: true });
  const label = typeof a.label === "string" ? a.label : "c";
  const [sc, m] = scenesFor(idx, "E-13").find(([, x]) => x.loupe && x.clip); const [scP, mP] = scenesFor(idx, "E-13").find(([, x]) => x.loupe && !x.clip) ?? [sc, m];
  const L = m.loupe; const thumb = m.thumb ?? '[data-e~="thumb"]'; const thumbP = mP.thumb ?? '[data-e~="thumb"]'; const ROOTP = mP.root ?? '[data-e~="root"]';
  const setupCarry = (page, css, y0 = 170) => page.evaluate(([B, Q, css, y0]) => { const b = document.querySelector(B); if (css?.__html) { document.documentElement.style.zoom = css.__html; css = null; } if (css) Object.assign(b.style, css); b.style.position = "relative"; const q = document.querySelector(Q); const br = b.getBoundingClientRect(), k = br.height / b.offsetHeight, rr = q.getBoundingClientRect(); b.scrollTop += (rr.top - (br.top + b.clientTop * k + 6)) / k; const y = b.getBoundingClientRect().top; b.style.top = `${(y0 - y) / (b.currentCSSZoom ?? 1)}px`; }, [m.clip.box, m.clip.rest, css, y0]);
  const setupPage = (page, css, top = 230) => page.evaluate(([root, css, top]) => { if (css?.__html) { document.documentElement.style.zoom = css.__html; css = null; } const mn = document.querySelector("main") ?? document.body; mn.style.paddingTop = `${top}px`; mn.style.paddingBottom = "1600px"; if (css) Object.assign(document.querySelector(root).parentElement.style, css); }, [ROOTP, css, top]);
  const veil = async (page, mm) => { if (mm.veil) await page.evaluate((v) => { const st = document.createElement("style"); st.textContent = `${v} { visibility: hidden !important; }`; document.head.appendChild(st); }, mm.veil); };
  const hold = async (P, ms = 900, th = thumb) => { const c = await center(P.page, th); await P.page.mouse.move(c.x, c.y); await P.page.mouse.down(); await P.page.waitForTimeout(ms); };
  const pageOf = async (drive, tf, o = {}) => { const P = await openPage(E, T, drive === "page" ? scP : sc, o); if (drive === "page") await setupPage(P.page, TF[tf] ?? null); else await setupCarry(P.page, TF[tf] ?? null); await veil(P.page, drive === "page" ? mP : m); await P.page.waitForTimeout(250); return P; };
  const SIDEPLAN = (rate) => `(n, st, last) => (last && last.tt - last.H < -40 ? 0 : -${rate})`;

  // ── the side change, every card ──
  if (want("side")) for (const tf of tfs("none", "zoom08", "zoom125", "zoom2", "zoom25", "zs", "scale125", "translate", "htmlzoom")) for (const [drive, rate] of [["page", 3], ["carry", 2]]) {
    const name = `CA11 side · ${tf} · ${drive}`;
    const r = await guard(name, async () => { const P = await pageOf(drive, tf); try { const rows = await P.page.evaluate(rowsOf); await hold(P, 900, drive === "page" ? thumbP : thumb); try { return { ...(await P.page.evaluate(FILM, [L, drive, drive === "carry" ? m.clip.box : null, SIDEPLAN(rate), 260, 900])), rows, errs: [...P.errors] }; } finally { await P.page.mouse.up(); } } finally { await P.close(); } }, 60000);
    if (r.crashed || r.none) { cell(name, "FAIL", r.line ?? "NO LOUPE"); continue; }
    const v = readSide(r, r.rows, rate); cell(name, v.changes < 1 ? "UNMEASURED" : v.ok ? "PASS" : "FAIL", `${v.changes < 1 ? "NOT DRIVEN (no change) · " : ""}${sideLine(v)} · errors ${r.errs.length}`);
  }
  // ── the clocks ──
  if (want("clock")) for (const tf of tfs("zoom08", "zoom125", "zoom2", "zoom25", "zs", "scale125", "translate", "htmlzoom")) {
    const name = `CA11 clock · ${tf}`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, sc, {});
      try {
        await setupCarry(P.page, TF[tf], 220); await veil(P.page, m); await P.page.waitForTimeout(250);
        const c = await center(P.page, thumb); await P.page.mouse.move(c.x, c.y);
        const clock = P.page.evaluate((L) => new Promise((ok) => { const out = []; const ch = new MessageChannel(); const t0 = performance.now(); ch.port1.onmessage = () => { const l = document.querySelector(L.lens), t = document.querySelector(L.track); if (l && t) { const a = l.getBoundingClientRect(), d = t.getBoundingClientRect(); const cs = getComputedStyle(l); const below = l.hasAttribute("data-engage-lens-below"); out.push({ t: performance.now() - t0, pin: below ? a.top - d.bottom : a.bottom - d.top, dx: a.left + a.width / 2 - (d.left + d.width / 2), op: +cs.opacity, sc: cs.scale, eng: !!document.querySelector("[data-engaged]") }); } }; const tick = () => { ch.port2.postMessage(0); if (performance.now() - t0 < 1500) requestAnimationFrame(tick); else setTimeout(() => ok(out), 40); }; requestAnimationFrame(tick); }), L);
        await P.page.mouse.down(); await P.page.waitForTimeout(700); await P.page.mouse.up(); return { out: await clock };
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed) { cell(name, "FAIL", r.line); continue; }
    const vis = r.out.filter((x) => x.op > 0.05); const en = vis.filter((x) => x.eng), ex = vis.filter((x) => !x.eng); const worst = (s) => s.reduce((p, x) => (Math.abs(x.pin) > Math.abs(p) ? x.pin : p), 0);
    const inflight = (s) => s.filter((x) => x.sc !== "1").length; const ok = Math.abs(worst(en)) <= 2 && Math.abs(worst(ex)) <= 2 && inflight(en) > 0 && inflight(ex) > 0;
    cell(name, inflight(en) + inflight(ex) === 0 ? "UNMEASURED" : ok ? "PASS" : "FAIL", `raise ${en.length} frames (${inflight(en)} in flight), worst pin ${f(worst(en), 1)} px · exit ${ex.length} frames (${inflight(ex)} in flight), worst pin ${f(worst(ex), 1)} px · across worst ${f(Math.max(0, ...vis.map((x) => Math.abs(x.dx))), 1)} px`);
  }
  // ── turned back inside its travel ──
  if (want("reverse")) for (const tf of tfs("none", "zoom125", "zoom2")) for (const k of [3, 10]) {
    const name = `CA11 reverse · ${tf} · ${k} frames in`;
    const r = await guard(name, async () => { const P = await pageOf("carry", tf); try { const rows = await P.page.evaluate(rowsOf); await hold(P); try { return { ...(await P.page.evaluate(FILM, [L, "carry", m.clip.box, `(() => { let at = 0; return (n, st, last) => { if (last && last.below && !at) at = n; if (!at) return -2; return n - at === ${k} ? 40 : 0; }; })()`, 220, 900])), rows }; } finally { await P.page.mouse.up(); } } finally { await P.close(); } }, 60000);
    if (r.crashed || r.none) { cell(name, "FAIL", r.line ?? "NO LOUPE"); continue; }
    const v = readSide(r, r.rows, 2, 2); cell(name, v.changes !== 2 ? "UNMEASURED" : v.ok ? "PASS" : "FAIL", `${v.changes !== 2 ? "NOT DRIVEN (not two changes) · " : ""}carried 2 px a frame past the line, ${k} frames after the change carried 40 px back · ${sideLine(v)}`);
  }
  // ── a real wheel ──
  if (want("wheel")) for (const tf of tfs("none", "zoom125", "zoom2")) {
    const name = `CA11 wheel · ${tf}`;
    const r = await guard(name, async () => {
      const P = await pageOf("page", tf);
      try { const rows = await P.page.evaluate(rowsOf); await hold(P, 900, thumbP);
        try { const film = P.page.evaluate(FILM, [L, "none", null, "(n) => 0", 1, 1900]);
          let after = -1; for (let i = 0; i < 80 && after < 8; i++) { await P.page.mouse.wheel(0, 8); await P.page.waitForTimeout(16); if (after >= 0) after++; else if (await P.page.evaluate((Lens) => document.querySelector(Lens)?.hasAttribute("data-engage-lens-below"), L.lens)) after = 0; }
          return { ...(await film), rows }; } finally { await P.page.mouse.up(); } } finally { await P.close(); }
    }, 60000);
    if (r.crashed || r.none) { cell(name, "FAIL", r.line ?? "NO LOUPE"); continue; }
    const v = readSide(r, r.rows, 8); cell(name, v.changes < 1 ? "UNMEASURED" : v.ok ? "PASS" : "FAIL", `${v.changes < 1 ? "NOT DRIVEN · " : ""}8 px wheel ticks over the held thumb (whole bound two ticks + 2) · ${sideLine(v)}`);
  }
  // ── released inside the travel ──
  if (want("release-mid")) for (const tf of tfs("none", "zoom125", "zoom2")) {
    const name = `CA11 release-mid · ${tf}`;
    const r = await guard(name, async () => { const P = await pageOf("carry", tf); try { const rows = await P.page.evaluate(rowsOf); await hold(P);
      const film = P.page.evaluate(FILM, [L, "carry", m.clip.box, `(n, st, last) => { if (last && last.below) { window.__chg = true; return 0; } return -2; }`, 220, 900]);
      await P.page.waitForFunction(() => window.__chg === true, null, { timeout: 15000, polling: 5 }).catch(() => {}); await P.page.mouse.up(); return { ...(await film), rows }; } finally { await P.close(); } }, 60000);
    if (r.crashed || r.none) { cell(name, "FAIL", r.line ?? "NO LOUPE"); continue; }
    const vis = r.out.filter((x) => !x.gone && x.op > 0.05); const rel = vis.findIndex((x) => !x.eng); const chg = vis.findIndex((x) => x.below);
    const v = readSide({ ...r, out: vis }, r.rows, 2); const after = vis.filter((x) => !x.eng); const abv = Math.max(0, ...vis.map((x) => -x.lt));
    cell(name, chg < 0 || rel < 0 ? "UNMEASURED" : v.step <= v.bound && abv <= 6 ? "PASS" : "FAIL", `change at visible frame ${chg}, release at ${rel} · largest move over any 16.7 ms while shown ${f(v.step, 1)} px (bound ${f(v.bound, 1)}) · at most ${f(abv, 1)} px above the viewport (≤ 6) · exit frames shown ${after.length}, last rel ${f(after.at(-1)?.rel, 1)}, pin ${f(after.at(-1)?.pin, 1)} px at opacity ${f(after.at(-1)?.op, 2)}`);
  }
  // ── a side change on the exit clock ──
  if (want("exit-side")) for (const tf of tfs("none", "zoom125", "zoom2")) {
    const name = `CA11 exit-side · ${tf}`;
    const r = await guard(name, async () => { const P = await pageOf("page", tf); try { const rows = await P.page.evaluate(rowsOf); await hold(P, 900, thumbP);
      const film = P.page.evaluate(FILM, [L, "page", null, `(n, st, last) => { if (!last) return 0; const room = last.tt - last.H; if (last.eng) { if (room > 3) return -2; window.__at = true; return 0; } return -4; }`, 300, 400]);
      await P.page.waitForFunction(() => window.__at === true, null, { timeout: 15000, polling: 5 }).catch(() => {}); await P.page.waitForTimeout(60); await P.page.mouse.up(); return { ...(await film), rows }; } finally { await P.close(); } }, 60000);
    if (r.crashed || r.none) { cell(name, "FAIL", r.line ?? "NO LOUPE"); continue; }
    const vis = r.out.filter((x) => !x.gone && x.op > 0.05 && !x.eng); let ch = 0; for (let i = 1; i < vis.length; i++) if (vis[i].below !== vis[i - 1].below) ch++;
    const v = readSide({ ...r, out: vis }, r.rows, 4); const abv = Math.max(0, ...vis.map((x) => -x.lt));
    cell(name, ch < 1 ? "UNMEASURED" : v.step <= v.bound && abv <= 10 ? "PASS" : "FAIL", `${ch < 1 ? "NOT DRIVEN (no change on the exit clock) · " : ""}released 3 px above the line, scrolled 4 px a frame inside the exit: ${vis.length} shown exit frames, ${ch} change(s) · largest move over any 16.7 ms ${f(v.step, 1)} px (bound ${f(v.bound, 1)}) · at most ${f(abv, 1)} px above the viewport (≤ 10) · worst pin while shown ${f(v.worstOff, 1)} px`);
  }
  // ── a re-render carries the track across the line ──
  if (want("rerender")) for (const dir of ["up", "down"]) for (const tf of tfs("none", "zoom125", "zoom2")) {
    const name = `CA11 rerender · ${dir} · ${tf}`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, scP, {});
      try {
        await setupPage(P.page, TF[tf] ?? null, 200); await veil(P.page, mP);
        await P.page.evaluate((root) => { document.documentElement.style.overflowAnchor = "none"; const h = document.querySelector(root).parentElement; const blk = document.createElement("div"); blk.id = "ca11-blk"; blk.style.height = "60px"; h.parentElement.insertBefore(blk, h); }, ROOTP);
        await P.page.waitForTimeout(250); const rows = await P.page.evaluate(rowsOf); await hold(P, 900, thumbP);
        try {
          await P.page.evaluate(([L, dir]) => { const l = document.querySelector(L.lens), t = document.querySelector(L.track).getBoundingClientRect(), lh = l.getBoundingClientRect().height; const room = t.top - lh; scrollBy(0, dir === "up" ? room - 12 : room + 12); }, [L, dir]);
          await P.page.waitForTimeout(350);
          return { ...(await P.page.evaluate(FILM, [L, "none", null, `(n) => { if (n === 6) { const blk = document.getElementById("ca11-blk"); if (${JSON.stringify(dir)} === "up") blk.remove(); else { const b2 = document.createElement("div"); b2.style.height = "60px"; blk.after(b2); } } return 0; }`, 8, 900])), rows };
        } finally { await P.page.mouse.up(); }
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed || r.none) { cell(name, "FAIL", r.line ?? "NO LOUPE"); continue; }
    const v = readSide(r, r.rows, 0); const ok = v.changes === 1 && v.step <= v.bound && v.pinEnd && v.whole;
    cell(name, v.changes !== 1 ? "UNMEASURED" : ok ? "PASS" : "FAIL", `${v.changes !== 1 ? "NOT DRIVEN (not one change) · " : ""}a 60 px block ${dir === "up" ? "removed" : "doubled"} above the card, the track across the line · ${sideLine(v)}`);
  }
  // ── a press at the line, under zoom ──
  if (want("press-line")) for (const tf of tfs("none", "zoom125")) for (const off of [0, 3, 9]) {
    const name = `CA11 press-line · ${tf} · ${off} px`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, sc, {});
      try {
        await setupCarry(P.page, TF[tf] ?? null); await veil(P.page, m); await P.page.waitForTimeout(250);
        await hold(P, 600); const lh = await P.page.evaluate((L) => document.querySelector(L.lens).getBoundingClientRect().height, L); await P.page.mouse.up(); await P.page.waitForTimeout(700);
        await P.page.evaluate(([B, Tk, lh, off]) => { const b = document.querySelector(B), t = document.querySelector(Tk).getBoundingClientRect(); b.style.top = `${(Number.parseFloat(b.style.top) || 0) - (t.top - lh - off) / (b.currentCSSZoom ?? 1)}px`; }, [m.clip.box, L.track, lh, off]);
        await P.page.waitForTimeout(150); const c = await center(P.page, thumb); await P.page.mouse.move(c.x, c.y);
        const clock = P.page.evaluate((L) => new Promise((ok) => { const out = []; const ch = new MessageChannel(); const t0 = performance.now(); ch.port1.onmessage = () => { const l = document.querySelector(L.lens), t = document.querySelector(L.track); if (l && t) { const a = l.getBoundingClientRect(), d = t.getBoundingClientRect(); out.push({ below: l.hasAttribute("data-engage-lens-below"), op: +getComputedStyle(l).opacity, lt: a.top, pin: l.hasAttribute("data-engage-lens-below") ? a.top - d.bottom : a.bottom - d.top }); } }; const tick = () => { ch.port2.postMessage(0); if (performance.now() - t0 < 1000) requestAnimationFrame(tick); else setTimeout(() => ok(out), 40); }; requestAnimationFrame(tick); }), L);
        await P.page.mouse.down(); const out = await clock; await P.page.mouse.up(); return { out, lh };
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed) { cell(name, "FAIL", r.line); continue; }
    const S = r.out; let ch = 0; for (let i = 1; i < S.length; i++) if (S[i].below !== S[i - 1].below) ch++; const vis = S.filter((x) => x.op > 0.05); const pinOff = vis.filter((x) => Math.abs(x.pin) > 2); const abv = Math.max(0, ...vis.map((x) => -x.lt));
    cell(name, ch <= 1 && abv <= 6 ? "PASS" : "FAIL", `the track ${off} px past the line (lens painted ${f(r.lh, 1)} px) at the press · side changes in the raise ${ch} · at most ${f(abv, 1)} px above the viewport while shown (≤ 6) · ${pinOff.length} shown frames off its edge > 2 px (worst ${f(pinOff.reduce((p, x) => Math.max(p, Math.abs(x.pin)), 0), 1)})`);
  }
  // ── press again inside the exit, after a side change ──
  if (want("repress")) for (const tf of tfs("none", "zoom125", "zoom2")) {
    const name = `CA11 repress · ${tf} · below, released, pressed inside the exit`;
    const r = await guard(name, async () => { const P = await pageOf("carry", tf); try { await hold(P); await P.page.evaluate(FILM, [L, "carry", m.clip.box, "(n) => -3", 60, 400]);
      const c = await center(P.page, thumb); await P.page.mouse.up(); await P.page.waitForTimeout(40); await P.page.mouse.move(c.x, c.y); await P.page.mouse.down(); await P.page.waitForTimeout(500);
      const x = await P.page.evaluate((L) => { const l = document.querySelector(L.lens), t = document.querySelector(L.track); if (!l || !t) return null; const a = l.getBoundingClientRect(), d = t.getBoundingClientRect(); return { below: l.hasAttribute("data-engage-lens-below"), pin: l.hasAttribute("data-engage-lens-below") ? a.top - d.bottom : a.bottom - d.top, op: +getComputedStyle(l).opacity, lt: a.top, lb: a.bottom, vh: innerHeight }; }, L);
      await P.page.mouse.up(); return { x }; } finally { await P.close(); } }, 60000);
    if (r.crashed) { cell(name, "FAIL", r.line); continue; }
    cell(name, r.x && Math.abs(r.x.pin) <= 2 && r.x.op > 0.9 && r.x.lt >= -0.5 ? "PASS" : "FAIL", r.x ? `below ${r.x.below}, pin ${f(r.x.pin, 1)} px, opacity ${f(r.x.op, 2)}, lens ${f(r.x.lt, 1)}..${f(r.x.lb, 1)} of ${r.x.vh}` : "no lens after the re-press");
  }
  // ── the host's re-render glide under zoom (CK-20; P-E11 §8 item 2: no browser cell drives it) ──
  if (want("hostglide")) for (const tf of tfs("none", "scale", "zoom08", "zoom125", "zoom2", "htmlzoom")) {
    const name = `CA11 hostglide · ${tf}`;
    const r = await guard(name, async () => {
      const P = await pageOf("page", tf);
      try { const rows = await P.page.evaluate(rowsOf); await hold(P, 900, thumbP);
        try { return { rows, ...(await P.page.evaluate((R) => new Promise((ok) => { const root = document.querySelector(R); const host = () => document.querySelector("[data-engage-stage]") ?? root; const T = () => document.timeline.currentTime; const t0 = T(); const out = []; const ch = new MessageChannel(); let n = 0;
          ch.port1.onmessage = () => { const h = host(); const a = h.getBoundingClientRect(); out.push({ t: T() - t0, y: a.top + a.height / 2, x: a.left + a.width / 2, an: h.getAnimations().filter((x) => !x.transitionProperty && x.playState === "running").length }); };
          const tick = () => { n++; if (n === 6) { const d = document.createElement("div"); d.style.height = "40px"; d.id = "ca11-ins"; root.before(d); } ch.port2.postMessage(0); if (n < 50) requestAnimationFrame(tick); else setTimeout(() => ok({ out, z: root.currentCSSZoom ?? 1, zp: root.parentElement.currentCSSZoom ?? 1 }), 40); }; requestAnimationFrame(tick); }), ROOTP)) }; } finally { await P.page.mouse.up(); } } finally { await P.close(); }
    }, 60000);
    if (r.crashed) { cell(name, "FAIL", r.line); continue; }
    const S = r.out; const dock = r.rows.map(rowFacts).find((x) => x.n === "dock"); const move = S.at(-1).y - S[0].y; const bound = Math.abs(move) * (dock?.peak ?? 0) + 1;
    const yAt = (t) => { for (let i = 1; i < S.length; i++) if (S[i].t >= t) { const p = S[i - 1], q = S[i]; return p.y + ((q.y - p.y) * (t - p.t)) / Math.max(1e-6, q.t - p.t); } return S.at(-1).y; };
    let step = 0; for (const x of S) if (x.t - S[0].t >= NOM) step = Math.max(step, Math.abs(x.y - yAt(x.t - NOM)));
    const anim = Math.max(...S.map((x) => x.an)); const driven = Math.abs(move) > 5;
    cell(name, !driven ? "UNMEASURED" : step <= bound && anim >= 1 ? "PASS" : "FAIL", `${driven ? "" : "NOT DRIVEN · "}a 40 px block inserted before the held root inside its card (zoom ${f(r.zp, 2)}): the host's painted centre moves ${f(move, 1)} px · largest move over any 16.7 ms ${f(step, 1)} px; bound ${f(bound, 1)} = the move × dock ${f(dock?.peak, 3)} + 1 · glide animations on the host ${anim} · first frames [${S.slice(3, 11).map((x) => f(x.y - S[0].y, 1)).join(" ")}]`);
  }
  // ── the reach under zoom and scale (CK-04/E-3's gutter; P-E11 §8 item 2: no cell reads the reach under a transform) ──
  // The viewport is set so the held root's nearer gutter is `g` painted px at rest: the reach binds when g − space-section < the
  // ×1.06 grow's half-width. CK-04 / E-3's clause: the held box inside the gutter, so the engaged gutter ≥ the painted space-section.
  if (want("reach")) for (const g of [28, 60]) for (const tf of tfs("none", "scale", "zoom08", "zoom125", "zoom2")) {
    const name = `CA11 reach · ${tf} · gutter ${g} px`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, scP, { vp: { width: 900, height: 600 } });
      try { await setupPage(P.page, TF[tf] ?? null, 230); await veil(P.page, mP); await P.page.waitForTimeout(200);
        const box = () => P.page.evaluate((R) => { const h = document.querySelector("[data-engage-stage]") ?? document.querySelector(R); const a = h.getBoundingClientRect(); const cs = getComputedStyle(h); const p = document.createElement("div"); p.style.cssText = "position:absolute;width:var(--space-section)"; h.appendChild(p); const sp = p.getBoundingClientRect().width; p.remove(); return { l: a.left, r: a.right, w: a.width, vw: document.documentElement.clientWidth, room: cs.getPropertyValue("--stage-room"), sw: cs.getPropertyValue("--stage-w"), reach: cs.getPropertyValue("--stage-reach"), sp, z: h.currentCSSZoom ?? 1 }; }, ROOTP);
        const r0 = await box(); const sb = 900 - r0.vw; await P.page.setViewportSize({ width: Math.round(r0.r + g + sb), height: 600 }); await P.page.waitForTimeout(250);
        const rest = await box(); await hold(P, 900, thumbP); const eng = await box(); await P.page.mouse.up(); return { rest, eng };
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed) { cell(name, "FAIL", r.line); continue; }
    const { rest, eng } = r; const gut = (b) => Math.min(b.l, b.vw - b.r); const grew = eng.w / rest.w;
    const ok = gut(eng) >= rest.sp - 0.5 && grew >= 1 - 1e-4;
    cell(name, ok ? "PASS" : "FAIL", `rest ${f(rest.l, 1)}..${f(rest.r, 1)} of ${rest.vw} (gutter ${f(gut(rest), 1)} px) · engaged ${f(eng.l, 1)}..${f(eng.r, 1)} (×${f(grew, 4)} wide), gutter ${f(gut(eng), 1)} px against the painted --space-section at rest ${f(rest.sp, 1)} px (bound: ≥) · --stage-room ${eng.room}, --stage-w ${eng.sw}, --stage-reach ${eng.reach}, host zoom ${f(eng.z, 2)}`);
  }
  // ── a zoom on the lens's subject itself (P-E11 §8 item 2, third bullet) ──
  if (want("subjzoom")) for (const z of ["1", "1.25"]) {
    const name = `CA11 subjzoom · track zoom ${z}`;
    const r = await guard(name, async () => { const P = await pageOf("carry", "none"); try { await P.page.evaluate(([Tk, z]) => { document.querySelector(Tk).style.zoom = z; }, [L.track, z]); await P.page.waitForTimeout(150); const rows = await P.page.evaluate(rowsOf); await hold(P);
      try { const st = await P.page.evaluate((L) => { const l = document.querySelector(L.lens), t = document.querySelector(L.track); const a = l.getBoundingClientRect(), d = t.getBoundingClientRect(); return { pin: l.hasAttribute("data-engage-lens-below") ? a.top - d.bottom : a.bottom - d.top, dx: a.left + a.width / 2 - (d.left + d.width / 2), wr: a.width / d.width, lw: a.width, tw: d.width }; }, L);
        const film = await P.page.evaluate(FILM, [L, "carry", m.clip.box, SIDEPLAN(2), 260, 900]); return { st, ...film, rows }; } finally { await P.page.mouse.up(); } } finally { await P.close(); } }, 60000);
    if (r.crashed || r.none) { cell(name, "FAIL", r.line ?? "NO LOUPE"); continue; }
    const v = readSide(r, r.rows, 2); cell(name, Math.abs(r.st.pin) <= 2 && Math.abs(r.st.dx) <= 2 && v.ok ? "PASS" : "FAIL", `settled: pin ${f(r.st.pin, 1)} px, across ${f(r.st.dx, 1)} px, lens ${f(r.st.lw, 1)} over track ${f(r.st.tw, 1)} px = ×${f(r.st.wr, 3)} · side change: ${sideLine(v)}`);
  }
  // ── CK-21 values E-11 does not plant, both paths ──
  if (want("loud")) for (const [tok, val] of [["--spring-dock", "nonsense"], ["--spring-dock", "ease, linear"], ["--spring-dock", "linear(0, 1), ease"], ["--spring-dock-settle", "nonsense"], ["--spring-dock-settle", "210ms"], ["--spring-dock-settle", "-0.21s"]]) for (const pth of ["side", "rerender"]) {
    const name = `CA11 loud · ${tok} ${val} · ${pth}`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, sc, { plant: [tok, val] });
      try { await setupCarry(P.page, null); await veil(P.page, m); await P.page.waitForTimeout(250); const rows = await P.page.evaluate(rowsOf); await hold(P);
        let film = null, gl = null;
        try {
          if (pth === "side") film = await P.page.evaluate(FILM, [L, "carry", m.clip.box, SIDEPLAN(2), 260, 900]);
          else gl = await P.page.evaluate(([R, Q]) => new Promise((ok) => { const root = document.querySelector(R); let k = 0, seen = 0, ms = []; const ins = () => { const d = document.createElement("div"); d.style.height = "40px"; document.querySelector(Q).before(d); };
            const tick = () => { k++; if (k === 3) ins(); if (k > 3 && k <= 8) { const an = root.getAnimations({ subtree: true }).filter((x) => !x.transitionProperty && x.playState === "running"); seen = Math.max(seen, an.length); ms.push(...an.map((x) => x.effect.getTiming().duration)); } if (k < 40) requestAnimationFrame(tick); else ok({ seen, ms: [...new Set(ms)] }); }; requestAnimationFrame(tick); }), [m.root ?? '[data-e~="root"]', m.clip.rest]);
        } finally { await P.page.mouse.up(); }
        const after = await P.page.evaluate((L) => { const l = document.querySelector(L.lens); return l ? l.getAnimations().filter((x) => !x.transitionProperty && x.playState === "running").map((x) => x.effect.getTiming().duration) : []; }, L);
        await P.page.waitForTimeout(700); const c2 = await center(P.page, thumb); await P.page.mouse.move(c2.x, c2.y); await P.page.mouse.down();
        let later; try { await P.page.waitForTimeout(700); later = await P.page.evaluate((L) => { const l = document.querySelector(L.lens), t = document.querySelector(L.track); if (!l || !t) return { shown: false }; const a = l.getBoundingClientRect(), d = t.getBoundingClientRect(); const rel = a.top + a.height / 2 - (d.top + d.height / 2); return { eng: !!document.querySelector("[data-engaged]"), shown: a.width > 0 && +getComputedStyle(l).opacity > 0.9, pin: rel < 0 ? a.bottom - d.top : a.top - d.bottom }; }, L); } finally { await P.page.mouse.up(); }
        return { film, gl, after, later, rows, errs: [...P.errors] };
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed) { cell(name, "FAIL", r.line); continue; }
    const named = r.errs.filter((e) => !e.startsWith("pageerror") && e.includes(tok)), uncaught = r.errs.filter((e) => e.startsWith("pageerror"));
    const v = r.film ? readSide(r.film.out ? r.film : { out: [] }, r.rows, 2) : null; const laterOk = r.later?.eng && r.later?.shown && Math.abs(r.later?.pin ?? 99) <= 2;
    const ok = named.length >= 1 && !uncaught.length && laterOk;
    cell(name, ok ? "PASS" : "FAIL", `${tok}: ${val} on <html> · ${pth === "side" ? `${v?.changes} change(s), running lens animations [${(v?.ams ?? []).map((x) => f(x, 0)).join(",")}] ms, end rel ${f(v?.end?.rel, 1)} px (pin ${f(v?.end?.pin, 1)}), off its edge ${v?.off} frames over ${f(v?.win, 0)} ms, at most ${f(v?.above, 1)} px above the viewport, whole at the end ${v?.whole}` : `root animations after the insert ${r.gl?.seen} [${(r.gl?.ms ?? []).map((x) => f(x, 0)).join(",")}] ms`} · lens animations still running after the drive [${r.after.map((x) => f(x, 0)).join(",")}] ms · console errors naming the token ${named.length}${named[0] ? ` ("${named[0].slice(0, 90)}")` : ""}, uncaught ${uncaught.length}${uncaught[0] ? ` ("${uncaught[0].slice(0, 120)}")` : ""} · later hold engaged ${r.later?.eng}, shown ${r.later?.shown}, pin ${f(r.later?.pin, 1)} px`);
  }
  // ── the frame's CPU read: getComputedStyle calls per frame while held (REPORT) ──
  if (want("gcs")) for (const tf of tfs("none", "zoom125")) {
    const name = `CA11 gcs · ${tf}`;
    const r = await guard(name, async () => { const P = await pageOf("carry", tf); try {
      await P.page.evaluate(() => { const g = window.getComputedStyle.bind(window); window.__gcs = 0; window.getComputedStyle = (...x) => { window.__gcs++; return g(...x); }; });
      const per = () => P.page.evaluate(() => new Promise((ok) => { let n = 0; const c0 = window.__gcs; const t0 = performance.now(); const tick = () => { if (++n < 61) requestAnimationFrame(tick); else ok({ calls: (window.__gcs - c0) / 60, ms: (performance.now() - t0) / 60 }); }; requestAnimationFrame(tick); }));
      const rest = await per(); await hold(P, 600); const held = await per(); await P.page.mouse.up(); return { rest, held }; } finally { await P.close(); } }, 60000);
    if (r.crashed) { cell(name, "REPORT", r.line); continue; }
    cell(name, "REPORT", `getComputedStyle calls per frame through window (the stage's bare calls resolve there): at rest ${f(r.rest.calls, 2)}, held ${f(r.held.calls, 2)} (frame ${f(r.held.ms, 1)} ms)`);
  }
  // ── the side change in paint (REPORT) ──
  if (want("film")) for (const tf of tfs("none", "zoom125", "zoom2")) {
    const name = `CA11 film · ${tf}`;
    const r = await guard(name, async () => {
      const vdir = fs.mkdtempSync(path.join(os.tmpdir(), "ca11film-"));
      try { const b = await E.nav(); const runs = [];
        for (let i = 0; i < 2; i++) {
          const ctx = await b.newContext({ viewport: { width: 700, height: 500 }, deviceScaleFactor: 1, reducedMotion: "no-preference", recordVideo: { dir: vdir, size: { width: 700, height: 500 } } });
          let page, x = null, t0 = 0;
          try { page = await ctx.newPage(); t0 = Date.now(); await page.addInitScript(INIT);
            await page.goto(`${T.url}?${new URLSearchParams({ scene: sc, theme: "light" })}`); await page.waitForFunction(() => window.__e && window.__e.ready === true, null, { timeout: 60000 });
            await page.evaluate(([L, v]) => { const st = document.createElement("style"); st.textContent = `${L.lens} { background: rgb(0,0,230) !important; box-shadow: none !important; border-color: rgb(0,0,230) !important; backdrop-filter: none !important; -webkit-backdrop-filter: none !important; } ${L.lens} > * { visibility: hidden !important; } ${L.track} { background: rgb(230,0,0) !important; box-shadow: none !important; border-color: rgb(230,0,0) !important; }${v ? ` ${v} { visibility: hidden !important; }` : ""}`; document.head.appendChild(st); }, [L, m.veil ?? null]);
            await setupCarry(page, TF[tf] ?? null); await page.waitForTimeout(250); const c = await center(page, thumb); await page.mouse.move(c.x, c.y); await page.mouse.down();
            try { await page.waitForTimeout(900); const g = await page.evaluate((s) => { const t = document.querySelector(s).getBoundingClientRect(); return { cx: t.left + t.width / 2 + 6 }; }, L.track); const lead = Math.max(0, Date.now() - t0 - 120);
              await page.evaluate(FILM, [L, "carry", m.clip.box, "(n, st, last) => (last && last.tt - last.H < -30 ? 0 : -2)", 160, 500]); x = { g, lead }; } finally { await page.mouse.up(); }
          } finally { const v = page?.video(); await ctx.close(); if (x && v) { x.video = await v.path(); runs.push(x); } }
        }
        const out = [];
        for (const x of runs) { const cx = Math.round(x.g.cx), Hh = 500;
          const raw = execFileSync("ffmpeg", ["-v", "error", "-i", x.video, "-ss", `${x.lead / 1000}`, "-vf", `crop=2:${Hh}:${cx}:0`, "-pix_fmt", "rgb24", "-f", "rawvideo", "-"], { maxBuffer: 1 << 28 });
          const N = Math.floor(raw.length / (Hh * 6)); const d = [];
          for (let k = 0; k < N; k++) { const fr = raw.subarray(k * Hh * 6, (k + 1) * Hh * 6); let n = 0, s = 0; for (let y = 0; y < Hh; y++) { const R = fr[y * 6], G = fr[y * 6 + 1], B = fr[y * 6 + 2]; if (B > 150 && R < 90 && G < 90) { n++; s += y; } } if (n > 3) d.push({ k, c: s / n, top: (() => { for (let y = 0; y < Hh; y++) { const R = fr[y * 6], G = fr[y * 6 + 1], B = fr[y * 6 + 2]; if (B > 150 && R < 90 && G < 90) return y; } return NaN; })() }); }
          const steps = []; for (let i = 1; i < d.length; i++) steps.push(Math.abs(d[i].c - d[i - 1].c)); const max = steps.length ? Math.max(...steps) : NaN; const iMax = steps.indexOf(max);
          out.push({ N, found: d.length, max, minTop: d.length ? Math.min(...d.map((q) => q.top)) : NaN, seq: d.slice(Math.max(0, iMax - 3), iMax + 6).map((q) => +q.c.toFixed(0)) }); }
        return { out };
      } finally { fs.rmSync(vdir, { recursive: true, force: true }); }
    }, 240000);
    if (r.crashed) { cell(name, "REPORT", r.line); continue; }
    cell(name, "REPORT", `a recorded film, lens blue, track red, one column, carried 2 px a frame: ${r.out.map((x) => `${x.found}/${x.N} frames, largest one-film-frame move of the lens's centre ${f(x.max, 1)} px, its highest painted row ${f(x.minTop, 0)}, centres around it [${x.seq.join(" ")}]`).join(" | ")}${engine === "webkit" ? " · WebKit's film is no one-frame witness (H8 §5)" : ""}`);
  }
  // ── owner-glance stills ──
  if (want("still")) for (const tf of tfs("zoom2", "zs")) {
    const name = `CA11 still · ${tf}`;
    const r = await guard(name, async () => { const P = await pageOf("carry", tf); try { await hold(P);
      const shot = (n) => (frames ? P.page.screenshot({ path: path.join(frames, `${label}-${engine}-side-${tf}-${n}.png`), animations: "allow" }) : null);
      const geo = () => P.page.evaluate((L) => { const a = document.querySelector(L.lens).getBoundingClientRect(), d = document.querySelector(L.track).getBoundingClientRect(); return `lens ${a.top.toFixed(1)}..${a.bottom.toFixed(1)} track ${d.top.toFixed(1)}..${d.bottom.toFixed(1)}`; }, L);
      try { await shot("above"); const g0 = await geo();
        const hit = await P.page.evaluate(([B, Lens]) => new Promise((ok) => { const b = document.querySelector(B), l = document.querySelector(Lens); const zb = b.currentCSSZoom ?? 1; let top = Number.parseFloat(b.style.top) || 0, n = 0; const tick = () => { const an = l.getAnimations().find((x) => !x.transitionProperty); if (an) { an.pause(); an.currentTime = an.effect.getTiming().duration * 0.15; ok(n); return; } if (++n > 400) { ok(-1); return; } top -= 2 / zb; b.style.top = `${top}px`; requestAnimationFrame(tick); }; requestAnimationFrame(tick); }), [m.clip.box, L.lens]);
        await P.page.waitForTimeout(60); await shot("mid"); const g1 = await geo();
        await P.page.evaluate((Lens) => { for (const an of document.querySelector(Lens).getAnimations()) if (!an.transitionProperty) an.play(); }, L.lens); await P.page.waitForTimeout(450); await shot("below"); const g2 = await geo();
        return { hit, g0, g1, g2 }; } finally { await P.page.mouse.up(); } } finally { await P.close(); } }, 60000);
    cell(name, "REPORT", r.crashed ? r.line : `stills ${label}-${engine}-side-${tf}-{above,mid,below}.png · above: ${r.g0} · mid (0.15 of the clock, after ${r.hit} frames): ${r.g1} · below: ${r.g2}`);
  }
});
