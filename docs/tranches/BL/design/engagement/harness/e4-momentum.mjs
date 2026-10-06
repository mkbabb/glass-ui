#!/usr/bin/env node
// E-4 · hallmark 6: a released drag or fling carries its velocity into the settle (F-54, L05b-14, R2-04-17).
// A differential, so a surface that settles to a snap point is not credited for the snap: the same drag (three 40 px
// moves, 16 ms apart, from the [data-e=thumb] centre) is released twice on fresh pages:
//   fling  released at once (≈ 2500 px/s at release)
//   still  held still 250 ms at the same point, then released (velocity 0)
// The thumb's position is read every frame for 2000 ms after release in the root's own frame ((thumb.x − root.left)
// ÷ root scale), so an engaged grow's scale-back is not read as travel. carry = the furthest forward excursion past
// the release point; settle = where it rests, relative to the release point, and both releases must be AT REST (the
// last 200 ms move < 0.5 px; a surface still moving at 2 s fails loud). PASS when the fling carries ≥ 4 px further
// than the still release, or settles ≥ 4 px further (D4's travel bound): a surface that snaps to detents carries
// velocity when the release velocity picks a further detent (the control `e4-snap`). The largest one-frame jump is
// printed (a teleport between holding and snapping reads there; it does not gate).
// Scenes gated "E-4": the slider (the exemplar) and every H-7 surface the target serves. Light only: the read is
// geometry. Fine pointer only: a held touch drag has no input in Playwright WebKit and none is needed to read carry.
//   node e4-momentum.mjs --build <dir> | --fixture [--fault e4-drop] [--engine webkit]
import { witness, openPage, scenesFor, center, f, medianDt, TRAVEL } from "./lib.mjs";

const WINDOW = 2000, REST = 200;

async function release(E, T, sc, still) {
  const P = await openPage(E, T, sc, { vp: { width: 700, height: 500 } });
  try {
    const c = await center(P.page, '[data-e~="thumb"]');
    await P.page.mouse.move(c.x, c.y); await P.page.mouse.down(); await P.page.waitForTimeout(120);
    for (let k = 1; k <= 3; k++) { await P.page.mouse.move(c.x + 40 * k, c.y); await P.page.waitForTimeout(16); }
    if (still) await P.page.waitForTimeout(250);
    const pr = P.page.evaluate((ms) => window.__sample('[data-e~="thumb"]', '[data-e~="root"]', ms), WINDOW);
    await P.page.mouse.up(); const fr = await pr;
    const F = fr.filter((x) => x.a && x.b); const xs = F.map((x) => (x.a.x - x.b.l) / (x.b.s || 1));
    if (xs.length < 3) return { bad: `thumb or root absent (${xs.length} frames)` };
    // at rest: the last REST ms move < 0.5 px. A settle read off a frame in flight is no settle (a fixed 700 ms window
    // read the SegmentedTabs indicator mid-jump at HEAD and credited a timing accident, BASELINE.md §3 E-4)
    const tail = xs.filter((_, k) => F[k].t >= F.at(-1).t - REST); const rest = Math.max(...tail) - Math.min(...tail) < 0.5;
    const jump = Math.max(0, ...xs.slice(1).map((x, k) => Math.abs(x - xs[k])));
    const x0 = xs[0]; return { x0, carry: Math.max(0, ...xs.map((x) => x - x0)), end: xs.at(-1) - x0, rest, jump, med: medianDt(fr), n: fr.length };
  } finally { await P.close(); }
}
await witness("E-4", "momentum: a release carries its velocity into the settle", async ({ E, T, cell, guard, idx }) => {
  for (const [sc] of scenesFor(idx, "E-4")) {
    const r = await guard(`${sc} fling`, async () => ({ fl: await release(E, T, sc, false), st: await release(E, T, sc, true) }), 60000);
    if (r.crashed) { cell(`E-4 ${sc} fling carries velocity`, "FAIL", r.line); continue; }
    if (r.fl.bad || r.st.bad) { cell(`E-4 ${sc} fling carries velocity`, "FAIL", `unreadable: ${r.fl.bad ?? r.st.bad}`); continue; }
    const dc = r.fl.carry - r.st.carry, de = r.fl.end - r.st.end, d = Math.max(dc, de);
    const atRest = r.fl.rest && r.st.rest;
    cell(`E-4 ${sc} fling carries velocity`, atRest && d >= TRAVEL ? "PASS" : "FAIL", `${atRest ? "" : `NOT AT REST at ${WINDOW} ms (fling ${r.fl.rest}, still ${r.st.rest}) · `}fling: carry ${f(r.fl.carry, 2)} px, settles ${f(r.fl.end, 2)} px past release · still: carry ${f(r.st.carry, 2)} px, settles ${f(r.st.end, 2)} px · difference: carry ${f(dc, 2)} px, settle ${f(de, 2)} px (bound: either ≥ ${TRAVEL}, both at rest) · largest one-frame jump: fling ${f(r.fl.jump, 1)} px, still ${f(r.st.jump, 1)} px · ${r.fl.n} frames, median ${f(r.fl.med, 1)} ms${r.note ? ` · ${r.note}` : ""}`);
  }
});
