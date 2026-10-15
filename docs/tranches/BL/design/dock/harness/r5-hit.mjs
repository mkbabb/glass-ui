// R5 · hit follows paint (H4-4, pass-4/H4.md; Q-7 (a): at the arc). An in-page sampler on every rAF,
// for seat centres AND corners, replacing pass 3's two arms (B′'s `hit`, which caught 0 in-flight frames
// of the Chromium warm expand on G, and `lune`, which took R from a square plate and counted 0 rows on G).
//
//   node r5-hit.mjs --build <dir> | --fixture pass|<fault>  [--engine …] [--out <dir>] [--cells <re>]
//
// Cells (scene morph): hit·rest-collapsed, hit·rest-expanded (one sample each), hit·warm-expand,
// hit·warm-collapse (after a warm cycle through the scene hooks; the trigger and every sample run in the
// page, one sample per rAF from the trigger until the window has been closed for 4 frames, at most 90).
// The press target at a point is the first element of document.elementsFromPoint() outside any [inert]
// subtree (an inert subtree takes no press; pointer-events: none is already excluded by the engine).
//
// Checks, each over every sample:
//   seat    a seat that paints (opacity > 0.05, clipped rect ≥ 4 × 4 px) with its painted centre inside the
//           plate's extent and under no other painting seat: the press target at that centre is the seat or
//           inside it. Seats of the ENTERING face (painting inside the plate on the last sample) and seats that
//           paint throughout are judged; a LEAVING seat that takes no press is Q-17's (unruled): counted and
//           RECORDED, never failed
//   ghost   a seat whose layout-box centre lies outside its painted rect (clipped away) or that does not
//           paint: the press target at that centre is not the seat (a clipped-away part takes no press)
//   corner  R is read from the element that rounds the window: the largest corner radius (border-radius,
//           or a clip-path inset's `round`) over plate(), hit() and edge(), capped at half the extent's
//           cross. Per corner, two points outside the arc on the diagonal (1.5 px in, and halfway between
//           the box corner and the arc): the press target is not in the dock. Judged when R > 5.2 px
//           (both points lie outside the arc); otherwise UNMEASURED
//   core    the extent's centre: the press target is in the dock
//   sampled (warm cells) ≥ 2 samples with the window open, or the cell is UNMEASURED (B′'s empty window)
import { parseArgs, engines, openTarget, launch, openScene, makeReport, outDir, engineTag, waitRest, r2 } from "./lib.mjs";

export const MIN_SEAT_PX = 4, R_MIN = 5.2, FRAMES_MAX = 90, INFLIGHT_MIN = 2;
const args = parseArgs();
const target = await openTarget(args);
const out = outDir(args, "R5");
const rep = makeReport("R5", target);

// the in-page sample, as source (run on every rAF by the warm cells)
const SAMPLE = `() => {
  const P = window.__dockProbe, hp = window.__hp, root = P.root(), e = P.extent();
  const at = (x, y) => { for (const el of document.elementsFromPoint(x, y)) if (!el.closest("[inert]")) return el; return null; };
  const rad = (el) => { if (!el) return 0; const cs = getComputedStyle(el); const r0 = cs.borderTopLeftRadius || "0"; const q = el.getBoundingClientRect(); let r = r0.endsWith("%") ? parseFloat(r0) / 100 * Math.min(q.width, q.height) : parseFloat(r0) || 0; const m = /round\\s+([\\d.]+)px/.exec(cs.clipPath || ""); if (m) r = Math.max(r, parseFloat(m[1])); return r; };
  const R = Math.min(Math.max(0, ...[P.plate(), ...(P.hit?.() ?? []), ...(P.edge?.() ?? [])].map(rad)), (e.r - e.l) / 2, (e.b - e.t) / 2);
  const seats = P.seats({ all: true });
  const rows = seats.map((s, i) => { const q = s.getBoundingClientRect(), c = hp.paintedRect(s), o = hp.visibleOpacity(s); return { i, q: [q.left, q.top, q.right, q.bottom], c: [c.l, c.t, c.r, c.b], o, label: s.getAttribute("aria-label") || s.textContent.trim().slice(0, 10) }; });
  const paints = (r) => r.o > 0.05 && r.c[2] - r.c[0] >= ${MIN_SEAT_PX} && r.c[3] - r.c[1] >= ${MIN_SEAT_PX};
  const inside = (x, y, b) => x > b[0] && x < b[2] && y > b[1] && y < b[3];
  const seat = [], ghost = [];
  for (const r of rows) {
    const s = seats[r.i];
    if (paints(r)) {
      const x = (r.c[0] + r.c[2]) / 2, y = (r.c[1] + r.c[3]) / 2;
      if (!inside(x, y, [e.l, e.t, e.r, e.b])) continue;
      if (rows.some((o) => o !== r && paints(o) && inside(x, y, o.c))) continue;
      const h = at(x, y); seat.push({ i: r.i, label: r.label, hit: !!h && s.contains(h), got: h ? hp.label(h) : "null", in: hp.label(s.closest(".dock-layer") ?? s.parentElement) });
    }
    const qx = (r.q[0] + r.q[2]) / 2, qy = (r.q[1] + r.q[3]) / 2;
    if (r.q[2] - r.q[0] >= ${MIN_SEAT_PX} && r.q[3] - r.q[1] >= ${MIN_SEAT_PX} && (!paints(r) || !inside(qx, qy, r.c))) { const h = at(qx, qy); ghost.push({ i: r.i, label: r.label, hit: !!h && s.contains(h), got: h ? hp.label(h) : "null" }); }
  }
  const lunes = [];
  if (R > ${R_MIN}) { const mid = (R * (1 - Math.SQRT1_2)) / 2; for (const d of [1.5, mid]) for (const [x, y] of [[e.l + d, e.t + d], [e.r - d, e.t + d], [e.r - d, e.b - d], [e.l + d, e.b - d]]) { const h = at(x, y); lunes.push({ at: [+x.toFixed(1), +y.toFixed(1)], dock: !!h && root.contains(h), got: h ? hp.label(h) : "null" }); } }
  const core = at((e.l + e.r) / 2, (e.t + e.b) / 2);
  return { t: performance.now(), m: !!P.morphing(), R: +R.toFixed(2), e: [e.l, e.t, e.r, e.b].map((v) => +v.toFixed(1)), painting: rows.filter((r) => paints(r) && inside((r.c[0] + r.c[2]) / 2, (r.c[1] + r.c[3]) / 2, [e.l, e.t, e.r, e.b])).map((r) => r.i), seat, ghost, lunes, core: !!core && root.contains(core), coreGot: core ? hp.label(core) : "null" };
}`;

function judge(engine, cell, rows, warm) {
    const last = rows.at(-1), first = rows[0];
    const entering = new Set(last.painting);
    const leaving = new Set(first.painting.filter((i) => !entering.has(i)));
    const seatMiss = [], q17 = [];
    for (const r of rows) for (const x of r.seat) if (!x.hit) (leaving.has(x.i) ? q17 : seatMiss).push({ ...x, m: r.m });
    // the trace of a miss (diagnosis, not a check): per judged seat that missed, the sample indices it missed on
    // (of rows.length), what took the press, and the layer the seat sits in
    const missBy = Object.values(rows.reduce((acc, r, n) => { for (const x of r.seat) if (!x.hit && !leaving.has(x.i)) (acc[x.i] ??= { i: x.i, label: x.label, in: x.in, got: x.got, samples: [] }).samples.push(n); return acc; }, {}));
    const ghostHit = rows.flatMap((r) => r.ghost.filter((x) => x.hit).map((x) => ({ ...x, m: r.m })));
    const judgedCorners = rows.filter((r) => r.lunes.length);
    const luneHit = judgedCorners.flatMap((r) => r.lunes.filter((x) => x.dock));
    const coreMiss = rows.filter((r) => !r.core);
    const inflight = rows.filter((r) => r.m).length;
    const checks = { seat: seatMiss.length === 0, ghost: ghostHit.length === 0, core: coreMiss.length === 0 };
    const unj = [];
    if (judgedCorners.length) checks.corner = luneHit.length === 0; else unj.push("corner");
    if (warm && inflight < INFLIGHT_MIN) unj.push("sampled");
    const failed = Object.entries(checks).filter(([, v]) => !v).map(([k]) => k);
    const unmeasured = !failed.length && unj.length > 0;
    const nSeat = rows.reduce((n, r) => n + r.seat.length, 0), nGhost = rows.reduce((n, r) => n + r.ghost.length, 0), nLune = judgedCorners.reduce((n, r) => n + r.lunes.length, 0);
    rep.add({ engine, cell: cell + engineTag(target, engine), pass: !failed.length && !unmeasured, unmeasured: unmeasured || undefined, unjudged: unj, failed, samples: rows.length, inflight, Rs: [...new Set(rows.map((r) => r.R))].slice(0, 8), seatMiss: seatMiss.slice(0, 4), missBy, firstOpen: rows.findIndex((r) => r.m), lastOpen: rows.findLastIndex((r) => r.m), q17Count: q17.length, q17: q17.slice(0, 3), ghostHit: ghostHit.slice(0, 4), luneHit: luneHit.slice(0, 4), coreMiss: coreMiss.length,
        summary: `${unmeasured ? "UNMEASURED " + unj.join(", ") + ": " : ""}${rows.length} sample(s), ${inflight} with the window open${warm ? ` (bound ≥ ${INFLIGHT_MIN})` : ""}; painted seat centres that miss their seat ${seatMiss.length}/${nSeat}${seatMiss[0] ? ` (first: ${seatMiss[0].label} → ${seatMiss[0].got})` : ""}; leaving seats that take no press ${q17.length} (Q-17, recorded); clipped-away centres that hit their seat ${ghostHit.length}/${nGhost}${ghostHit[0] ? ` (first: ${ghostHit[0].label} → ${ghostHit[0].got})` : ""}; corner points outside the arc that hit the dock ${judgedCorners.length ? `${luneHit.length}/${nLune}${luneHit[0] ? " (first " + luneHit[0].at.join(",") + " → " + luneHit[0].got + ")" : ""}` : "not judged (R ≤ " + R_MIN + " px)"}; R ${[...new Set(rows.map((r) => r.R))].slice(0, 5).join("/")} px; the centre misses the dock on ${coreMiss.length} sample(s)${failed.length ? "  ⟶ FAILED: " + failed.join(", ") : ""}` });
}

for (const engine of engines(args)) {
    const browser = await launch(engine);
    const tag = engineTag(target, engine);
    try {
        for (const cell of ["hit·rest-collapsed", "hit·rest-expanded", "hit·warm-expand", "hit·warm-collapse"]) {
            await rep.guard(engine, [cell + tag], async () => {
                const s = await openScene(browser, target, "morph");
                await s.page.evaluate(() => window.__scene.expand()); await waitRest(s.page, { quiet: 500, cap: 7000 });
                await s.page.evaluate(() => window.__scene.collapse()); await waitRest(s.page, { quiet: 500, cap: 7000 });
                if (cell === "hit·rest-expanded" || cell === "hit·warm-collapse") { await s.page.evaluate(() => window.__scene.expand()); await waitRest(s.page, { quiet: 500, cap: 7000 }); }
                await s.page.mouse.move(2, 2);
                let rows;
                if (cell.includes("rest")) rows = [await s.page.evaluate(`(${SAMPLE})()`)];
                else rows = await s.page.evaluate(async ([dir, src, max]) => {
                    const f = new Function(`return (${src})`)();
                    const raf = () => new Promise((r) => requestAnimationFrame(r));
                    const rs = [f()];
                    if (dir === "expand") window.__scene.expand(); else window.__scene.collapse();
                    let closed = 0, opened = false;
                    for (let n = 0; n < max; n++) { await raf(); const r = f(); rs.push(r); if (r.m) { opened = true; closed = 0; } else if (opened || n > 20) closed++; if (closed >= 4 && n > 3) break; }
                    return rs;
                }, [cell === "hit·warm-expand" ? "expand" : "collapse", SAMPLE, FRAMES_MAX]);
                judge(engine, cell, rows, !cell.includes("rest"));
                await s.close();
            });
        }
    } finally {
        await browser.close();
    }
}
await target.close();
rep.finish(out);
