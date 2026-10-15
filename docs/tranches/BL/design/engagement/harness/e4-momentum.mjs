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
// Surfaces (H-7): every scene gated "E-4"; its row may name axis "x" | "y", dir ±1, input "mouse" | "touch", a press
// point [data-e~=grip], `edge`, `detents` and `fixed`. Light only: the read is geometry.
//   node e4-momentum.mjs --build <dir> | --fixture [--fault e4-drop] [--engine webkit]
import { witness, openPage, openTouchPage, scenesFor, center, f, medianDt, TRAVEL } from "./lib.mjs";

const WINDOW = 2000, REST = 200, DRIVEN = 20, OVER = 0.5, REPEAT = 3, SPREAD = 2;
// the body read: a scene's visible value point when it names one, else its thumb, else the landed row
const THUMB = ['[data-e~="point"]', '[data-e~="thumb"]', '[data-e~="land"]'];

/** How far the surface passes its rest in the direction it travelled from the release to the rest (a bounce). */
const overshoot = (xs, end) => { const d = Math.sign(end - xs[0]); return Math.max(0, ...xs.map((x) => (d ? d * (x - end) : Math.abs(x - end)))); };

async function release(E, T, sc, m, still, prm = false, run = 0) {
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
    const at = await P.page.evaluate(() => ['[data-e~="grip"]', '[data-e~="thumb"]', '[data-e~="land"]'].find((s) => document.querySelector(s)) ?? '[data-e~="thumb"]');
    const c = await center(P.page, at); const p0 = await P.page.evaluate(() => window.__e4());
    if (!(c.x >= 0 && c.x <= 700 && c.y >= 0 && c.y <= 500)) return { bad: `the press point (${f(c.x, 0)}, ${f(c.y, 0)}) lies outside the 700×500 viewport: the surface is not on screen` };
    if (!p0) return { bad: "no body to read ([data-e~=thumb] and [data-e~=land] absent)" };
    const pt = (k) => (axis === "x" ? [c.x + dir * 40 * k, c.y] : [c.x, c.y + dir * 40 * k]);
    // one film from the press to WINDOW ms past the release: the drive's frames, then the release's
    const pr = P.page.evaluate((ms) => window.__e4film(ms), 120 + 48 + (still ? 1000 : 0) + WINDOW + 400);
    if (touch) { await P.touch("touchStart", c.x, c.y); await P.page.waitForTimeout(120); for (let k = 1; k <= 3; k++) { await P.touch("touchMove", ...pt(k)); await P.page.waitForTimeout(16); } }
    else { await P.page.mouse.move(c.x, c.y); await P.page.mouse.down(); await P.page.waitForTimeout(120); for (let k = 1; k <= 3; k++) { await P.page.mouse.move(...pt(k)); await P.page.waitForTimeout(16); } }
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
    return { x0, moved, carry: Math.max(0, ...xs.map((x) => x - x0)), end: end - x0, abs: end, over: overshoot(xs, end), rest, jump, driveMax, invisible: invisible.length, minOp: Math.min(...all.map((x) => x.op)), frames: all.length, med: medianDt(rel), n: rel.length };
  } finally { await P.close(); }
}
await witness("E-4", "CK-05 momentum on the visible body, without a teleport", async ({ E, T, cell, guard, idx, engine }) => {
  for (const [sc, m] of scenesFor(idx, "E-4")) {
    const name = `E-4 ${sc} fling carries velocity`, cont = `E-4 ${sc} release continuity`;
    const r = await guard(`${sc} fling`, async () => ({ fl: await release(E, T, sc, m, false), st: await release(E, T, sc, m, true) }), 90000);
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
      const dc = r.fl.carry - r.st.carry, de = r.fl.end - r.st.end, d = Math.max(dc, de);
      const atRest = r.fl.rest && r.st.rest;
      cell(name, atRest && d >= TRAVEL ? "PASS" : "FAIL", `${m.axis === "y" ? "axis y" : "axis x"}${m.dir === -1 ? ", dir −1" : ""}${m.input === "touch" ? ", touch" : ""}${m.edge === "lead" ? ", leading edge" : ""}, page frame · ${atRest ? "" : `NOT AT REST at ${WINDOW} ms (fling ${r.fl.rest}, still ${r.st.rest}) · `}fling: carry ${f(r.fl.carry, 2)} px, settles ${f(r.fl.end, 2)} px past release · still: carry ${f(r.st.carry, 2)} px, settles ${f(r.st.end, 2)} px · difference: carry ${f(dc, 2)} px, settle ${f(de, 2)} px (bound: either ≥ ${TRAVEL}, both at rest) · body opacity ≥ ${f(Math.min(r.fl.minOp, r.st.minOp), 3)} · ${r.fl.n} frames, median ${f(r.fl.med, 1)} ms${r.note ? ` · ${r.note}` : ""}`);
      const bound = Math.max(r.fl.driveMax, r.st.driveMax) * 1.5 + 2; const worst = Math.max(r.fl.jump, r.st.jump);
      cell(cont, m.platform ? "REPORT" : worst <= bound ? "PASS" : "FAIL", `${m.platform ? "the platform's own scroll fling (CK-18: the Carousel is the platform's, stated), reported not gated · " : ""}largest one-frame move on release: fling ${f(r.fl.jump, 1)} px, still ${f(r.st.jump, 1)} px · during the drive: fling ${f(r.fl.driveMax, 1)} px, still ${f(r.st.driveMax, 1)} px (bound ≤ drive × 1.5 + 2 = ${f(bound, 1)} px)`);
    }
    if (m.detents) {
      const rn = `E-4 ${sc} repeat landing`;
      if (!driven) cell(rn, "UNMEASURED", "the surface is not read in this engine (above)");
      else {
        const runs = [r.fl.abs];
        for (let k = 1; k < REPEAT; k++) { const q = await guard(`${sc} repeat ${k}`, () => release(E, T, sc, m, false, false, k), 45000); runs.push(q.crashed || q.bad ? NaN : q.abs); }
        const spread = Math.max(...runs) - Math.min(...runs);
        cell(rn, Number.isFinite(spread) && spread <= SPREAD ? "PASS" : "FAIL", `${REPEAT} fling runs, the same drive, land at ${runs.map((x) => f(x, 1)).join(", ")} px (page frame, signed) · spread ${f(spread, 2)} px (bound ≤ ${SPREAD} px: the same detent)`);
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
