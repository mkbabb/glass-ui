#!/usr/bin/env node
// E-4 · hallmark 6: a released drag or fling carries its velocity into the settle (F-54, L05b-14, R2-04-17).
// A differential, so a surface that settles to a snap point is not credited for the snap: the same drag (three 40 px
// moves, 16 ms apart, from the press point along the surface's axis) is released twice on fresh pages:
//   fling  released at once (≈ 2500 px/s at release)
//   still  held still 250 ms at the same point, then released (velocity 0)
// The thumb's position along the axis is read every frame for 2000 ms after release, in the root's own frame
// ((thumb centre − root leading edge) ÷ root scale, signed so the drag direction is positive), so an engaged grow's
// scale-back is not read as travel. carry = the furthest forward excursion past the release point; settle = where it
// rests, relative to the release point, and both releases must be AT REST (the last 200 ms move < 0.5 px; a surface
// still moving at 2 s fails loud). PASS when the fling carries ≥ 4 px further than the still release, or settles
// ≥ 4 px further (D4's travel bound): a surface that snaps to detents carries velocity when the release velocity picks a
// further detent (the control `e4-snap`). The largest one-frame jump is printed (a teleport between holding and
// snapping reads there; it does not gate).
// H-7, the surfaces: every scene gated "E-4". Its index row may name axis "x" | "y" (default x), dir +1 | -1 (the drag
// direction along the axis, default +1), input "mouse" | "touch" (default mouse) and tag a press point
// [data-e~="grip"] (default the thumb) and a fallback [data-e~="land"] read when the thumb is gone (a drag ghost
// retired after its flight: the landed row). A drag that does not move its thumb ≥ 20 px FAILS (the scene is not
// driven), except a touch drag in WebKit, which is UNMEASURED: macOS WebKit has no touch scrolling (H-4).
// PRM (H-9): the fling again under reduced motion: at rest within 2000 ms and no overshoot past its rest (≤ 0.5 px):
// the release may carry, it does not bounce.
// Light only: the read is geometry.
//   node e4-momentum.mjs --build <dir> | --fixture [--fault e4-drop] [--engine webkit]
import { witness, openPage, openTouchPage, scenesFor, center, f, medianDt, TRAVEL } from "./lib.mjs";

const WINDOW = 2000, REST = 200, DRIVEN = 20, OVER = 0.5;
const THUMB = ['[data-e~="thumb"]', '[data-e~="land"]'];

/** How far the surface passes its rest in the direction it travelled from the release to the rest (a bounce); a
 *  surface that comes to rest where it was released reads its largest excursion either way. */
const overshoot = (xs, end) => { const d = Math.sign(end - xs[0]); return Math.max(0, ...xs.map((x) => (d ? d * (x - end) : Math.abs(x - end)))); };

async function release(E, T, sc, m, still, prm = false) {
  const axis = m.axis === "y" ? "y" : "x", dir = m.dir === -1 ? -1 : 1, touch = m.input === "touch";
  const P = touch ? await openTouchPage(E, T, sc, { vp: { width: 700, height: 500 }, prm }) : await openPage(E, T, sc, { vp: { width: 700, height: 500 }, prm });
  try {
    if (prm && !P.modeOk) return { bad: `MODE NOT APPLIED ${P.modeLine}` };
    const pos = () => P.page.evaluate(([t, r, axis, dir]) => { const a = window.__eff(t.map((s) => document.querySelector(s)).find(Boolean)); const b = window.__eff(document.querySelector(r)); return a && b ? (dir * ((axis === "x" ? a.x - b.l : a.y - b.t) / (b.s || 1))) : null; }, [THUMB, '[data-e~="root"]', axis, dir]);
    const at = (await P.page.evaluate(() => !!document.querySelector('[data-e~="grip"]'))) ? '[data-e~="grip"]' : THUMB[0];
    const c = await center(P.page, at); const p0 = await pos();
    // a press point off screen is no drag (a surface painted outside the viewport fails here, not as a carry of 0)
    if (!(c.x >= 0 && c.x <= 700 && c.y >= 0 && c.y <= 500)) return { bad: `the press point (${f(c.x, 0)}, ${f(c.y, 0)}) lies outside the 700×500 viewport: the surface is not on screen` };
    const pt = (k) => (axis === "x" ? [c.x + dir * 40 * k, c.y] : [c.x, c.y + dir * 40 * k]);
    if (touch) { await P.touch("touchStart", c.x, c.y); await P.page.waitForTimeout(120); for (let k = 1; k <= 3; k++) { await P.touch("touchMove", ...pt(k)); await P.page.waitForTimeout(16); } }
    else { await P.page.mouse.move(c.x, c.y); await P.page.mouse.down(); await P.page.waitForTimeout(120); for (let k = 1; k <= 3; k++) { await P.page.mouse.move(...pt(k)); await P.page.waitForTimeout(16); } }
    if (still) await P.page.waitForTimeout(250);
    const pr = P.page.evaluate(([t, r, ms]) => window.__sample(t, r, ms), [THUMB, '[data-e~="root"]', WINDOW]);
    if (touch) await P.touch("touchEnd", ...pt(3)); else await P.page.mouse.up();
    const fr = await pr;
    const F = fr.filter((x) => x.a && x.b); const xs = F.map((x) => dir * ((axis === "x" ? x.a.x - x.b.l : x.a.y - x.b.t) / (x.b.s || 1)));
    if (xs.length < 3) return { bad: `thumb or root absent (${xs.length} frames)` };
    const moved = p0 == null ? NaN : xs[0] - p0;
    // at rest: the last REST ms move < 0.5 px. A settle read off a frame in flight is no settle (a fixed 700 ms window
    // read the SegmentedTabs indicator mid-jump at HEAD and credited a timing accident, BASELINE.md §3 E-4)
    const tail = xs.filter((_, k) => F[k].t >= F.at(-1).t - REST); const rest = Math.max(...tail) - Math.min(...tail) < 0.5;
    const jump = Math.max(0, ...xs.slice(1).map((x, k) => Math.abs(x - xs[k])));
    const x0 = xs[0], end = xs.at(-1);
    return { x0, moved, carry: Math.max(0, ...xs.map((x) => x - x0)), end: end - x0, over: overshoot(xs, end), rest, jump, med: medianDt(fr), n: fr.length };
  } finally { await P.close(); }
}
await witness("E-4", "momentum: a release carries its velocity into the settle", async ({ E, T, cell, guard, idx, engine }) => {
  for (const [sc, m] of scenesFor(idx, "E-4")) {
    const name = `E-4 ${sc} fling carries velocity`;
    const r = await guard(`${sc} fling`, async () => ({ fl: await release(E, T, sc, m, false), st: await release(E, T, sc, m, true) }), 75000);
    const undriven = (x) => !(Math.abs(x.moved) >= DRIVEN);
    let driven = true;
    if (r.crashed) cell(name, "FAIL", r.line);
    else if (r.fl.bad || r.st.bad) cell(name, "FAIL", `unreadable: ${r.fl.bad ?? r.st.bad}`);
    else if (undriven(r.fl) || undriven(r.st)) {
      driven = false;
      const why = `the ${m.input === "touch" ? "touch" : "pointer"} drag moved the thumb ${f(r.fl.moved, 1)} px (fling) and ${f(r.st.moved, 1)} px (still), bound ≥ ${DRIVEN} px`;
      if (m.input === "touch" && engine === "webkit") cell(name, "UNMEASURED", `${why}: macOS WebKit has no touch scrolling, so a touch drag cannot drive this surface (H-4); real Safari UNMEASURED (owner's safaridriver checkbox)`);
      else cell(name, "FAIL", `NOT DRIVEN: ${why}`);
    } else {
      const dc = r.fl.carry - r.st.carry, de = r.fl.end - r.st.end, d = Math.max(dc, de);
      const atRest = r.fl.rest && r.st.rest;
      cell(name, atRest && d >= TRAVEL ? "PASS" : "FAIL", `${m.axis === "y" ? "axis y" : "axis x"}${m.dir === -1 ? ", dir −1" : ""}${m.input === "touch" ? ", touch" : ""} · ${atRest ? "" : `NOT AT REST at ${WINDOW} ms (fling ${r.fl.rest}, still ${r.st.rest}) · `}fling: carry ${f(r.fl.carry, 2)} px, settles ${f(r.fl.end, 2)} px past release · still: carry ${f(r.st.carry, 2)} px, settles ${f(r.st.end, 2)} px · difference: carry ${f(dc, 2)} px, settle ${f(de, 2)} px (bound: either ≥ ${TRAVEL}, both at rest) · largest one-frame jump: fling ${f(r.fl.jump, 1)} px, still ${f(r.st.jump, 1)} px · ${r.fl.n} frames, median ${f(r.fl.med, 1)} ms${r.note ? ` · ${r.note}` : ""}`);
    }
    // H-9: the PRM arm, read only where the surface is driven in this engine
    const pn = `E-4 ${sc} release PRM`;
    if (!driven) { cell(pn, "UNMEASURED", "the surface is not driven in this engine (above)"); continue; }
    const q = await guard(`${sc} PRM`, async () => release(E, T, sc, m, false, true), 45000);
    if (q.crashed) cell(pn, "FAIL", q.line);
    else if (q.bad) cell(pn, "FAIL", `unreadable: ${q.bad}`);
    else if (undriven(q)) cell(pn, "FAIL", `NOT DRIVEN under reduce: the drag moved the thumb ${f(q.moved, 1)} px (bound ≥ ${DRIVEN} px)`);
    else cell(pn, q.rest && q.over <= OVER ? "PASS" : "FAIL", `reduce · moved ${f(q.moved, 1)} px · fling: carry ${f(q.carry, 2)} px, settles ${f(q.end, 2)} px past release, overshoot past its rest ${f(q.over, 2)} px, at rest ${q.rest} (bound: at rest within ${WINDOW} ms, overshoot ≤ ${OVER} px) · largest one-frame jump ${f(q.jump, 1)} px${q.note ? ` · ${q.note}` : ""}`);
  }
});
