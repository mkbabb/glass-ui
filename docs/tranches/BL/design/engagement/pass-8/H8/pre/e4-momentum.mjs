#!/usr/bin/env node
// E-4 · CK-05: momentum on the VISIBLE body, without a teleport (hallmark 6: F-54, L05b-14, R2-04-17; pass 2 restates
// it: B's carry moved an invisible reka thumb, C-B r24, and the root-frame read could not see E's stretch, X-11).
// A differential, so a surface that settles to a snap point is not credited for the snap: the same drag (three 40 px
// moves, 16 ms apart, from the press point along the surface's axis) is released twice on fresh pages:
//   fling  released at once (≈ 2500 px/s at release)
//   still  held still 1000 ms at the same point, then released (velocity 0; 1000, not 250: a loaded harness delivers
//          a fling's release hundreds of ms late, and the still pause must stay well past any such lag)
// The BODY ([data-e~=point] when the row names a visible value point, else [data-e~=thumb], or [data-e~=land] once
// the thumb is gone) is read every frame from the press to 2000 ms
// after the release, in the PAGE frame along the axis (signed so the drag direction is positive). The index row may
// name `edge: "lead"`: the body's leading edge along the drag direction is read, not its centre (the slider's value
// point is its range's leading edge, C-E §3 item 6).
//   precondition  the body is visible on every frame read: effective opacity > 0 and a non-zero box (C-B r24), else
//                 FAIL "INVISIBLE"; a surface whose `fixed` selector does not compute `position: fixed` paints in flow
//                 and is UNMEASURED until its owner cures it (the detented Sheet, REGISTRY §P1-7)
//   fling         carry = the furthest forward excursion past the release point; settle = where it rests, relative to
//                 the release point; both releases AT REST (the last 200 ms move < 0.5 px). PASS when the fling carries
//                 or settles ≥ 4 px further than the still release. A press point off screen fails as unreadable; a drag
//                 that moves the body < 20 px FAILS NOT DRIVEN, except a touch drag in WebKit (UNMEASURED: no touch
//                 scrolling, H-4)
//   continuity    no release motion makes a one-frame jump larger than the largest one-frame move during the drive
//                 (× 1.5 + 2 px: a platform fling may outrun the finger by a frame, measured 56 px on a 40 px drive in Chromium; the sortable ghost lands 74-84 px), on the fling and the still release alike (the sortable ghost's
//                 74-84 px landing and the tabs indicator's 240-248 px jump fail it). A row marked `platform` (a native
//                 scroll-snap surface: its fling is the platform's, CK-18) is REPORT
//   repeat        on a surface whose row says `detents: true`: three fling runs land within 2 px of one another (the
//                 same drive lands on the same detent; C-B §1's Sheet landed on 130 or 255 px)
//   PRM (H-9)     the fling under reduced motion: at rest within 2000 ms and no overshoot past its rest (≤ 0.5 px)
//   H6 (pass 6; REGISTRY §P5-7 item 8, F-13): a row's `reads: n` (the slider: 5) takes the fling-and-still pair n times on
//                 fresh pages, and `fling carries velocity` passes only when EVERY read passes (E-5's three-read rule):
//                 the slider's carry read 1.87-2.80 px on 4 of 14 Chromium reads in pass 5 and 6.5-6.7 px on the others,
//                 so one read could pass a bimodal carry. The line prints every read's differential; continuity takes
//                 the worst jump over every read. Plant `e4-carryflaky` (the velocity dropped on one fling in five)
//   H7 (pass 7; REGISTRY §P6-7 item 8, F5‴ §2.2, C-E6 CK-05): `repeat landing` prints each run's RELEASE VELOCITY and
//                 fails only when EQUAL velocities land on different detents. The velocity is the release rule's own
//                 measurement replicated from the pointer (or touch) events the page saw (window capture, before any
//                 page listener): the chord across the samples no older than RELEASE_RULE.windowMs = 100 ms against the
//                 lift, the lift a sample, ring 8 (`motion/engage/release.ts`), signed so the drag direction is
//                 positive. Two velocities are EQUAL when the event clock cannot tell them apart: |Δv| ≤ v × 2q / dt,
//                 q the clock's resolution read from the run's own timestamps (1, 0.1, 0.01 or 0.001 ms), dt the chord's
//                 span. A rule that lands by velocity alone is monotone in it, so a run that is FASTER beyond that band
//                 and lands SHORT of a slower one (an ORDER inversion) is also a split the velocity does not explain.
//                 Either FAILS; a split at distinguishable velocities in velocity order is the drive's spread crossing
//                 the rule's threshold and passes (the line names the threshold's bracket). Landings are the same
//                 detent within 2 px. The run count is the row's `repeat` (default 3; the Sheet 8) or `--repeat n`.
//                 A FLING (measured ≥ 100 px/s, an order under any delivered fling read: 900-1000 px/s at load 20)
//                 that carries 0.00 px past its release FAILS BY NAME (C-E6 s1). `--repeat-gaps a,b` paces run k's
//                 three moves gaps[k % n] ms apart (the drive's velocity varied on purpose: control `e4-velsplit`).
// Surfaces (H-7): every scene gated "E-4"; its row may name axis "x" | "y", dir ±1, input "mouse" | "touch", a press
// point [data-e~=grip], `edge`, `detents` and `fixed`. Light only: the read is geometry.
//   node e4-momentum.mjs --build <dir> | --fixture [--fault e4-drop] [--engine webkit]
import { witness, openPage, openTouchPage, scenesFor, center, f, medianDt, TRAVEL } from "./lib.mjs";

const WINDOW = 2000, REST = 200, DRIVEN = 20, OVER = 0.5, REPEAT = 3, SPREAD = 2;
// H7: the release rule's window and ring (motion/engage/release.ts RELEASE_RULE.windowMs, VelocitySampler size), the
// equal-velocity tolerance, and the fling floor (above)
const V_WINDOW = 100, V_RING = 8, V_FLING = 100;
// the body read: a scene's visible value point when it names one, else its thumb, else the landed row
const THUMB = ['[data-e~="point"]', '[data-e~="thumb"]', '[data-e~="land"]'];

/** How far the surface passes its rest in the direction it travelled from the release to the rest (a bounce). */
const overshoot = (xs, end) => { const d = Math.sign(end - xs[0]); return Math.max(0, ...xs.map((x) => (d ? d * (x - end) : Math.abs(x - end)))); };

async function release(E, T, sc, m, still, prm = false, run = 0, gap = 16) {
  const axis = m.axis === "y" ? "y" : "x", dir = m.dir === -1 ? -1 : 1, touch = m.input === "touch", lead = m.edge === "lead";
  const o = { vp: { width: 700, height: 500 }, prm, q: { run: String(run) } };
  const P = touch ? await openTouchPage(E, T, sc, o) : await openPage(E, T, sc, o);
  try {
    if (prm && !P.modeOk) return { bad: `MODE NOT APPLIED ${P.modeLine}` };
    if (m.fixed) { const pos = await P.page.evaluate((s) => { const e = document.querySelector(s); return e ? getComputedStyle(e).position : "absent"; }, m.fixed); if (pos !== "fixed") return { inflow: `${m.fixed} computes position: ${pos}` }; }
    // the in-page reader: the body's position along the axis in the page frame, its visibility, and the frame time
    await P.page.evaluate(([t, axis, dir, lead]) => {
      window.__e4 = () => { const el = t.map((s) => document.querySelector(s)).find(Boolean); if (!el) return null; const r = el.getBoundingClientRect(); const v = window.__vis(el);
        const p = lead ? (axis === "x" ? (dir > 0 ? r.right : r.left) : (dir > 0 ? r.bottom : r.top)) : (axis === "x" ? r.left + r.width / 2 : r.top + r.height / 2);
        return { x: dir * p, op: v.op, vis: v.vis, T: performance.now() }; };
      window.__e4film = (ms) => new Promise((ok) => { const fr = []; const t0 = performance.now(); const tick = () => { const t = performance.now() - t0; const r = window.__e4(); if (r) fr.push({ t, ...r }); if (t < ms) requestAnimationFrame(tick); else ok(fr); }; requestAnimationFrame(tick); });
    }, [THUMB, axis, dir, lead]);
    // H7: the input events the page saw (capture, before any page listener), for the release velocity
    await P.page.evaluate(() => {
      window.__e4ev = [];
      const add = (t, x, y, ts) => window.__e4ev.push({ t, x, y, ts });
      for (const t of ["pointerdown", "pointermove", "pointerup"]) addEventListener(t, (e) => { if (e.pointerType !== "touch") add(t, e.clientX, e.clientY, e.timeStamp); }, true);
      for (const t of ["touchstart", "touchmove", "touchend"]) addEventListener(t, (e) => { const q = (t === "touchend" ? e.changedTouches : e.touches)[0]; if (q) add(t, q.clientX, q.clientY, e.timeStamp); }, { capture: true, passive: true });
    });
    const at = await P.page.evaluate(() => ['[data-e~="grip"]', '[data-e~="thumb"]', '[data-e~="land"]'].find((s) => document.querySelector(s)) ?? '[data-e~="thumb"]');
    const c = await center(P.page, at); const p0 = await P.page.evaluate(() => window.__e4());
    if (!(c.x >= 0 && c.x <= 700 && c.y >= 0 && c.y <= 500)) return { bad: `the press point (${f(c.x, 0)}, ${f(c.y, 0)}) lies outside the 700×500 viewport: the surface is not on screen` };
    if (!p0) return { bad: "no body to read ([data-e~=thumb] and [data-e~=land] absent)" };
    const pt = (k) => (axis === "x" ? [c.x + dir * 40 * k, c.y] : [c.x, c.y + dir * 40 * k]);
    // one film from the press to WINDOW ms past the release: the drive's frames, then the release's
    const pr = P.page.evaluate((ms) => window.__e4film(ms), 120 + 48 + (still ? 1000 : 0) + WINDOW + 400);
    if (touch) { await P.touch("touchStart", c.x, c.y); await P.page.waitForTimeout(120); for (let k = 1; k <= 3; k++) { await P.touch("touchMove", ...pt(k)); await P.page.waitForTimeout(gap); } }
    else { await P.page.mouse.move(c.x, c.y); await P.page.mouse.down(); await P.page.waitForTimeout(120); for (let k = 1; k <= 3; k++) { await P.page.mouse.move(...pt(k)); await P.page.waitForTimeout(gap); } }
    if (still) await P.page.waitForTimeout(1000);
    const tRel = await P.page.evaluate(() => performance.now());
    if (touch) await P.touch("touchEnd", ...pt(3)); else await P.page.mouse.up();
    const all = await pr;
    const drive = all.filter((x) => x.T < tRel), rel = all.filter((x) => x.T >= tRel && x.T <= tRel + WINDOW);
    if (rel.length < 3) return { bad: `body absent after the release (${rel.length} frames)` };
    const xs = rel.map((x) => x.x); const moved = xs[0] - p0.x;
    const invisible = all.filter((x) => !x.vis);
    const tail = rel.filter((x) => x.t >= rel.at(-1).t - REST).map((x) => x.x); const rest = Math.max(...tail) - Math.min(...tail) < 0.5;
    const steps = (fr) => fr.slice(1).map((x, k) => Math.abs(x.x - fr[k].x));
    const driveMax = Math.max(0, ...steps(drive));
    const jump = Math.max(0, ...steps([drive.at(-1) ?? rel[0], ...rel]));
    const x0 = xs[0], end = xs.at(-1);
    // H7: the release velocity as the release rule measures it (the chord across the window, the lift a sample)
    const ev = await P.page.evaluate(() => window.__e4ev);
    const up = ev.filter((e) => e.t === "pointerup" || e.t === "touchend").at(-1);
    let v = NaN, vtxt = "no lift event";
    if (up) {
      const ring = [...ev.filter((e) => e.ts <= up.ts && e !== up && e.t !== "pointerup" && e.t !== "touchend").slice(-(V_RING - 1)), up];
      const first = ring.find((e) => up.ts - e.ts <= V_WINDOW); const dt = (up.ts - first.ts) / 1000;
      const d = dir * (axis === "x" ? up.x - first.x : up.y - first.y);
      v = dt > 0 ? d / dt : 0; vtxt = `${f(d, 0)} px / ${f(dt * 1000, 1)} ms over ${ring.filter((e) => up.ts - e.ts <= V_WINDOW).length} samples`;
      // the event clock's resolution, read from the run's own timestamps; the velocity's band is ±2q over the chord
      const q = [1, 0.1, 0.01, 0.001].find((r) => ev.every((e) => Math.abs(e.ts / r - Math.round(e.ts / r)) < 1e-4)) ?? 0.0001;
      var vband = dt > 0 ? Math.abs(v) * (2 * q) / (dt * 1000) : 0, vq = q;
    }
    return { v, vtxt, vband, vq, x0, moved, carry: Math.max(0, ...xs.map((x) => x - x0)), end: end - x0, abs: end, over: overshoot(xs, end), rest, jump, driveMax, invisible: invisible.length, minOp: Math.min(...all.map((x) => x.op)), frames: all.length, med: medianDt(rel), n: rel.length };
  } finally { await P.close(); }
}
await witness("E-4", "CK-05 momentum on the visible body, without a teleport", async ({ a, E, T, cell, guard, idx, engine }) => {
  for (const [sc, m] of scenesFor(idx, "E-4")) {
    const name = `E-4 ${sc} fling carries velocity`, cont = `E-4 ${sc} release continuity`;
    const nReads = Math.max(1, Number(m.reads ?? 1));
    const r = await guard(`${sc} fling`, async () => ({ fl: await release(E, T, sc, m, false), st: await release(E, T, sc, m, true) }), 90000);
    // H6: the further reads of the pair (fresh pages each), taken only when the first is driven and read
    const more = [];
    const undriven = (x) => !(Math.abs(x.moved) >= DRIVEN);
    let driven = false;
    if (r.crashed) { cell(name, "FAIL", r.line); cell(cont, "FAIL", r.line); }
    else if (r.fl.inflow || r.st.inflow) { cell(name, "UNMEASURED", `the surface paints in flow (${r.fl.inflow ?? r.st.inflow}): UNMEASURED until its owner cures its position (REGISTRY §P1-7)`); cell(cont, "UNMEASURED", "in flow (above)"); }
    else if (r.fl.bad || r.st.bad) { cell(name, "FAIL", `unreadable: ${r.fl.bad ?? r.st.bad}`); cell(cont, "FAIL", `unreadable: ${r.fl.bad ?? r.st.bad}`); }
    else if (r.fl.invisible || r.st.invisible) { const why = `INVISIBLE body: ${r.fl.invisible + r.st.invisible} frame(s) read a body with effective opacity ${f(Math.min(r.fl.minOp, r.st.minOp), 2)} or a zero box (bound: opacity > 0 and a non-zero box on every frame, C-B r24)`; cell(name, "FAIL", why); cell(cont, "FAIL", why); }
    else if (undriven(r.fl) || undriven(r.st)) {
      const why = `the ${m.input === "touch" ? "touch" : "pointer"} drag moved the body ${f(r.fl.moved, 1)} px (fling) and ${f(r.st.moved, 1)} px (still), bound ≥ ${DRIVEN} px`;
      if (m.input === "touch" && engine === "webkit") { cell(name, "UNMEASURED", `${why}: macOS WebKit has no touch scrolling, so a touch drag cannot drive this surface (H-4); real Safari UNMEASURED (owner's safaridriver checkbox)`); cell(cont, "UNMEASURED", "not driven in this engine (above)"); }
      else { cell(name, "FAIL", `NOT DRIVEN: ${why}`); cell(cont, "FAIL", `NOT DRIVEN: ${why}`); }
    } else {
      driven = true;
      for (let k = 1; k < nReads; k++) {
        const q = await guard(`${sc} fling read ${k + 1}`, async () => ({ fl: await release(E, T, sc, m, false), st: await release(E, T, sc, m, true) }), 90000);
        more.push(q.crashed ? { bad: q.line } : q.fl.bad || q.st.bad || q.fl.inflow || q.st.inflow ? { bad: q.fl.bad ?? q.st.bad ?? q.fl.inflow ?? q.st.inflow } : q.fl.invisible || q.st.invisible ? { bad: `INVISIBLE body on ${q.fl.invisible + q.st.invisible} frame(s)` } : undriven(q.fl) || undriven(q.st) ? { bad: `NOT DRIVEN: moved ${f(q.fl.moved, 1)} / ${f(q.st.moved, 1)} px` } : q);
      }
      const reads = [r, ...more];
      const grade = (x) => { if (x.bad) return { ok: false, txt: `unreadable (${String(x.bad).slice(0, 80)})` }; const dc = x.fl.carry - x.st.carry, de = x.fl.end - x.st.end, d = Math.max(dc, de); const atRest = x.fl.rest && x.st.rest; return { ok: atRest && d >= TRAVEL, d, txt: `${atRest ? "" : "NOT AT REST · "}carry ${f(dc, 2)} / settle ${f(de, 2)} px` }; };
      const gs = reads.map(grade); const allOk = gs.every((g) => g.ok);
      const dc = r.fl.carry - r.st.carry, de = r.fl.end - r.st.end;
      const atRest = r.fl.rest && r.st.rest;
      cell(name, allOk ? "PASS" : "FAIL", `${m.axis === "y" ? "axis y" : "axis x"}${m.dir === -1 ? ", dir −1" : ""}${m.input === "touch" ? ", touch" : ""}${m.edge === "lead" ? ", leading edge" : ""}, page frame · ${nReads > 1 ? `${nReads} reads, every one must pass: [${gs.map((g, i) => `${i + 1}: ${g.txt} ${g.ok ? "pass" : "FAIL"}`).join(" · ")}] (${gs.filter((g) => g.ok).length} of ${nReads} pass) · read 1 in full: ` : ""}${atRest ? "" : `NOT AT REST at ${WINDOW} ms (fling ${r.fl.rest}, still ${r.st.rest}) · `}fling: carry ${f(r.fl.carry, 2)} px, settles ${f(r.fl.end, 2)} px past release · still: carry ${f(r.st.carry, 2)} px, settles ${f(r.st.end, 2)} px · difference: carry ${f(dc, 2)} px, settle ${f(de, 2)} px (bound: either ≥ ${TRAVEL}, both at rest) · body opacity ≥ ${f(Math.min(r.fl.minOp, r.st.minOp), 3)} · ${r.fl.n} frames, median ${f(r.fl.med, 1)} ms${r.note ? ` · ${r.note}` : ""}`);
      const ok = reads.filter((x) => !x.bad);
      // each read's release against its own drive's bound
      const over = ok.map((x) => ({ j: Math.max(x.fl.jump, x.st.jump), b: Math.max(x.fl.driveMax, x.st.driveMax) * 1.5 + 2 }));
      const bound = over[0].b, bad = over.filter((x) => x.j > x.b);
      cell(cont, m.platform ? "REPORT" : !bad.length ? "PASS" : "FAIL", `${m.platform ? "the platform's own scroll fling (CK-18: the Carousel is the platform's, stated), reported not gated · " : ""}${ok.length > 1 ? `over ${ok.length} reads, each against its own drive (${over.map((x) => `${f(x.j, 1)}/${f(x.b, 1)}`).join(", ")} px; ${bad.length} over) · read 1: ` : ""}largest one-frame move on release: fling ${f(r.fl.jump, 1)} px, still ${f(r.st.jump, 1)} px · during the drive: fling ${f(r.fl.driveMax, 1)} px, still ${f(r.st.driveMax, 1)} px (bound ≤ drive × 1.5 + 2 = ${f(bound, 1)} px)`);
    }
    if (m.detents) {
      const rn = `E-4 ${sc} repeat landing`;
      if (!driven) cell(rn, "UNMEASURED", "the surface is not read in this engine (above)");
      else {
        // H7: each run's release velocity beside its landing; the verdict is the rule's (equal velocities, one detent)
        const nRuns = Math.max(2, Number(a.repeat ?? m.repeat ?? REPEAT));
        const gaps = typeof a["repeat-gaps"] === "string" ? a["repeat-gaps"].split(",").map(Number) : [16];
        const runs = [{ k: 1, gap: 16, abs: r.fl.abs, carry: r.fl.carry, v: r.fl.v, vtxt: r.fl.vtxt, vband: r.fl.vband, vq: r.fl.vq }];
        for (let k = 1; k < nRuns; k++) {
          const gap = gaps[k % gaps.length];
          const q = await guard(`${sc} repeat ${k}`, () => release(E, T, sc, m, false, false, k, gap), 45000);
          runs.push(q.crashed || q.bad ? { k: k + 1, gap, bad: q.line ?? q.bad } : { k: k + 1, gap, abs: q.abs, carry: q.carry, v: q.v, vtxt: q.vtxt, vband: q.vband, vq: q.vq });
        }
        const ok = runs.filter((x) => !x.bad && Number.isFinite(x.abs) && Number.isFinite(x.v));
        const eq = (p, q) => Math.abs(p.v - q.v) <= (p.vband ?? 0) + (q.vband ?? 0);
        const splits = [], order = [];
        for (let i = 0; i < ok.length; i++) for (let j = i + 1; j < ok.length; j++) {
          const p = ok[i], q = ok[j]; if (Math.abs(p.abs - q.abs) <= SPREAD) continue;
          if (eq(p, q)) splits.push(`runs ${p.k} and ${q.k}: ${f(p.v, 0)} and ${f(q.v, 0)} px/s land at ${f(p.abs, 1)} and ${f(q.abs, 1)} px`);
          else if ((p.v - q.v) * (p.abs - q.abs) < 0) { const [fa, sl] = p.v > q.v ? [p, q] : [q, p]; order.push(`run ${fa.k} at ${f(fa.v, 0)} px/s lands at ${f(fa.abs, 1)} px, short of run ${sl.k} at ${f(sl.v, 0)} px/s at ${f(sl.abs, 1)} px`); }
        }
        const zero = ok.filter((x) => x.v >= V_FLING && x.carry < 0.005);
        const bad = runs.filter((x) => x.bad);
        const by = {}; for (const x of ok) { const key = Object.keys(by).find((l) => Math.abs(+l - x.abs) <= SPREAD) ?? String(x.abs); (by[key] ??= []).push(x); }
        const groups = Object.entries(by).sort((p, q) => +p[0] - +q[0]).map(([l, xs]) => `land ${f(+l, 1)} px: ${xs.length} run(s) at ${xs.map((x) => f(x.v, 0)).join(", ")} px/s`).join(" · ");
        const verdict = splits.length || order.length || zero.length || bad.length ? "FAIL" : "PASS";
        // the threshold the drive's spread crossed, when the landings are ordered by velocity: the bracket between groups
        const sorted = [...ok].sort((p, q) => p.v - q.v); const brackets = [];
        for (let i = 1; i < sorted.length; i++) if (Math.abs(sorted[i].abs - sorted[i - 1].abs) > SPREAD) brackets.push(`${f(sorted[i - 1].v, 0)}..${f(sorted[i].v, 0)} px/s (${f(sorted[i - 1].abs, 1)} → ${f(sorted[i].abs, 1)} px)`);
        const qs = [...new Set(ok.map((x) => x.vq))].join("/");
        cell(rn, verdict, `${zero.length ? `ZERO-CARRY FLING: ${zero.map((x) => `run ${x.k} released at ${f(x.v, 0)} px/s carried ${f(x.carry, 2)} px`).join("; ")} · ` : ""}${splits.length ? `EQUAL VELOCITIES ON DIFFERENT DETENTS: ${splits.slice(0, 4).join("; ")} · ` : ""}${order.length ? `ORDER INVERTED (a faster run lands short: not a function of velocity): ${order.slice(0, 3).join("; ")} · ` : ""}${bad.length ? `${bad.length} run(s) unread (${String(bad[0].bad).slice(0, 80)}) · ` : ""}${runs.length} fling runs, the same drive${gaps.length > 1 ? ` (move gaps ${gaps.join("/")} ms by run)` : ""}: ${runs.map((x) => x.bad ? `${x.k}: unread` : `${x.k}: v ${f(x.v, 0)} px/s (${x.vtxt}), carry ${f(x.carry, 2)}, land ${f(x.abs, 1)}`).join(" · ")} · by landing: ${groups} · ${!splits.length && !order.length && brackets.length ? `landings ordered by velocity; the drive's spread crosses the rule's threshold at ${brackets.join(", ")} · ` : ""}(bound: two runs the event clock cannot tell apart (|Δv| ≤ the sum of their ±2q/dt bands, q ${qs} ms) land within ${SPREAD} px, and no faster run lands short of a slower one; a fling ≥ ${V_FLING} px/s carries > 0.00 px; velocity: the release rule's chord over ${V_WINDOW} ms, ring ${V_RING}, replicated from the page's input events)`.slice(0, 2400));
      }
    }
    // H-9: the PRM arm, read only where the surface is driven in this engine
    const pn = `E-4 ${sc} release PRM`;
    if (!driven) { cell(pn, "UNMEASURED", "the surface is not driven or not read in this engine (above)"); continue; }
    const q = await guard(`${sc} PRM`, async () => release(E, T, sc, m, false, true), 45000);
    if (q.crashed) cell(pn, "FAIL", q.line);
    else if (q.bad) cell(pn, "FAIL", `unreadable: ${q.bad}`);
    else if (undriven(q)) cell(pn, "FAIL", `NOT DRIVEN under reduce: the drag moved the body ${f(q.moved, 1)} px (bound ≥ ${DRIVEN} px)`);
    else cell(pn, q.rest && q.over <= OVER ? "PASS" : "FAIL", `reduce · moved ${f(q.moved, 1)} px · fling: carry ${f(q.carry, 2)} px, settles ${f(q.end, 2)} px past release, overshoot past its rest ${f(q.over, 2)} px, at rest ${q.rest} (bound: at rest within ${WINDOW} ms, overshoot ≤ ${OVER} px) · largest one-frame jump ${f(q.jump, 1)} px${q.note ? ` · ${q.note}` : ""}`);
  }
});
