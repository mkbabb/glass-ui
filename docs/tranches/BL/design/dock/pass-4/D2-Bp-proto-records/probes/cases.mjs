// cases.mjs · D2-B′ pass 4, route obligation 4 (REGISTRY §P3-7.3): the three cases B′-proto §10 left
// unmeasured, each a measured cell per engine.
//
//   node cases.mjs --build <dir> --adapter <a> [--engine chromium,webkit] [--out <dir>] [--cells <re>]
//
// Cells (each also run with its control, recorded beside it):
//   case·capped·seat-transition   scene seatgrow, the root capped at 150 px so its run overflows (the size
//                                 hold applies), a seat's own CSS width transition grows and shrinks.
//   case·capped·morph             scene morph, the root capped at 300 px: expand, add a seat, collapse.
//       Both: 0 page errors and 0 window `error` events (the ResizeObserver loop error of B′ b7 among them),
//       the plate's largest one-frame step ≤ 0.45 × its travel (continuity), and the window flag closed at
//       rest.
//   case·consumer-margin          scene morph&neighbour=1 with an UNLAYERED consumer rule
//                                 `.glass-dock { margin-inline: 20px }`: expand and collapse. The plate never
//                                 passes the in-flow neighbour by more than 0.5 px, and the neighbour's
//                                 largest one-frame step ≤ the plate end edge's largest one-frame step + 1 px
//                                 (it moves with the glass, H3-7). Control: the same scene, no consumer rule.
//   case·rotated                  scene morph, its host rotated 2° (transform on the fixed host): expand and
//                                 collapse. Each seat's position in the dock's own frame (screen centre
//                                 mapped back through the host matrix) per frame: no seat moves more than
//                                 0.5 px in one frame after the window closes (no landing snap), and the
//                                 largest second difference (px per frame²) is within 1 px of the
//                                 unrotated control's.
// Every cell carries the 1-minute load average (lib.mjs makeReport). Playwright WebKit is not Safari.
import fs from "node:fs";
import path from "node:path";
import { parseArgs, engines, openTarget, launch, openScene, makeReport, outDir, r2 } from "../../../harness/lib.mjs";

const args = parseArgs();
const target = await openTarget(args);
const out = outDir(args, "CASES");
const rep = makeReport("CASES", target);
const raf = (page, n) => page.evaluate((n) => new Promise((res) => { let k = 0; const t = () => (++k >= n ? res() : requestAnimationFrame(t)); requestAnimationFrame(t); }), n);

/** Per-frame recorder: plate extent, flag, neighbour, seat centres in the dock frame, window errors. */
const START = `(rot) => {
  const P = window.__dockProbe, root = P.root();
  const L = { f: [], stop: false, errs: [] };
  window.__cs = L;
  addEventListener("error", (e) => L.errs.push(String(e.message || e.error || e).slice(0, 160)));
  const host = rot ? root.parentElement : null;
  let M = null, O = null;
  if (host) { M = new DOMMatrix(getComputedStyle(host).transform).inverse(); const r = host.getBoundingClientRect(); O = { x: (r.left + r.right) / 2, y: (r.top + r.bottom) / 2 }; }
  const local = (q) => { const c = { x: (q.left + q.right) / 2, y: (q.top + q.bottom) / 2 }; if (!M) return c; const p = M.transformPoint({ x: c.x - O.x, y: c.y - O.y }); return { x: p.x + O.x, y: p.y + O.y }; };
  const tick = () => {
    if (L.stop) return;
    const e = P.extent(); const nb = document.querySelector("[data-testid=neighbour]");
    const row = { t: performance.now(), m: !!P.morphing(), e: [e.l, e.t, e.r, e.b] };
    if (nb) { const q = nb.getBoundingClientRect(); row.nb = q.left; }
    row.s = P.seats({ all: true }).map((el) => { const q = el.getBoundingClientRect(); return q.width > 0 ? +local(q).x.toFixed(3) : null; });
    L.f.push(row); requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}`;
const start = (page, rot = false) => page.evaluate(`(${START})(${rot})`);
const stop = (page) => page.evaluate(() => { window.__cs.stop = true; return { f: window.__cs.f, errs: window.__cs.errs }; });
const settle = async (page, cap = 4000) => { const t0 = Date.now(); await page.waitForTimeout(120); while (Date.now() - t0 < cap) { if (!(await page.evaluate(() => window.__dockProbe.morphing()))) break; await page.waitForTimeout(60); } await page.waitForTimeout(250); };
const injectCss = (page, css) => page.evaluate((css) => { const s = document.createElement("style"); s.textContent = css; document.head.appendChild(s); }, css);

function plateSteps(f) {
    const main = f.map((r) => r.e[2] - r.e[0]);
    let step = 0; for (let i = 1; i < main.length; i++) step = Math.max(step, Math.abs(main[i] - main[i - 1]));
    return { travel: r2(Math.max(...main) - Math.min(...main)), step: r2(step), endStep: r2(Math.max(0, ...f.slice(1).map((r, i) => Math.abs(r.e[2] - f[i].e[2])))) };
}
/** Seats are indexed over every face (seats({all: true})), so an index names one seat throughout. The
    snap is read from each frame the window closes until the next frame it opens. */
function seatJerk(f) {
    let jerk = 0, snap = 0;
    const n = Math.max(0, ...f.map((r) => r.s.length));
    const closedRun = f.map(() => false);
    for (let i = 1, open = false; i < f.length; i++) { if (f[i - 1].m && !f[i].m) open = true; if (f[i].m) open = false; closedRun[i] = open; }
    for (let k = 0; k < n; k++) for (let i = 1; i < f.length; i++) {
        const b = f[i - 1].s[k], c = f[i].s[k];
        if (b == null || c == null) continue;
        if (closedRun[i]) snap = Math.max(snap, Math.abs(c - b));
        const a = i >= 2 ? f[i - 2].s[k] : null;
        if (a != null) jerk = Math.max(jerk, Math.abs(c - 2 * b + a));
    }
    return { jerk: r2(jerk), snap: r2(snap) };
}
const dump = (engine, cell, data) => { const f = path.join(out, `${engine}-${cell.replace(/[^\w-]+/g, "_")}.json`); fs.writeFileSync(f, JSON.stringify(data)); return path.basename(f); };
const add = (engine, cell, checks, summary, extra = {}) => {
    const failed = Object.entries(checks).filter(([, v]) => v === false).map(([k]) => k);
    rep.add({ engine, cell, pass: !failed.length, failed, summary: summary + (failed.length ? "  ⟶ FAILED: " + failed.join(", ") : ""), ...extra });
};

for (const engine of engines(args)) {
    const browser = await launch(engine);
    try {
        // 1 · a capped dock with a seat transition
        await rep.guard(engine, ["case·capped·seat-transition"], async () => {
            const s = await openScene(browser, target, "seatgrow");
            try {
                await s.page.evaluate(() => { window.__dockProbe.root().style.maxInlineSize = "150px"; });
                await raf(s.page, 30);
                const over = await s.page.evaluate(() => !!window.__dockProbe.root().querySelector("[data-overflowing]"));
                await start(s.page);
                await s.page.evaluate(() => window.__scene.grow(true)); await s.page.waitForTimeout(900);
                await s.page.evaluate(() => window.__scene.grow(false)); await s.page.waitForTimeout(900);
                await settle(s.page);
                const r = await stop(s.page); const ps = plateSteps(r.f); const last = r.f.at(-1);
                const file = dump(engine, "case·capped·seat-transition", r);
                add(engine, "case·capped·seat-transition", { errors: s.errors.length + r.errs.length === 0, continuous: ps.travel < 1 || ps.step <= 0.45 * ps.travel, rest: !last.m },
                    `cap 150 px, run overflowing ${over}; grow and shrink a seat's own width transition: page errors ${s.errors.length}, window error events ${r.errs.length}${r.errs.length ? ` (${r.errs[0]})` : ""}; plate travel ${ps.travel} px, largest one-frame step ${ps.step} px; flag at rest ${last.m ? "OPEN" : "closed"}; ${file}`);
            } finally { await s.close(); }
        });
        await rep.guard(engine, ["case·capped·morph"], async () => {
            const s = await openScene(browser, target, "morph");
            try {
                await s.page.evaluate(() => { window.__dockProbe.root().style.maxInlineSize = "300px"; });
                await raf(s.page, 30);
                await start(s.page);
                await s.page.evaluate(() => window.__scene.expand()); await settle(s.page);
                const over = await s.page.evaluate(() => !!window.__dockProbe.root().querySelector("[data-overflowing]"));
                await s.page.evaluate(() => window.__scene.setExtra(true)); await settle(s.page);
                await s.page.evaluate(() => window.__scene.collapse()); await settle(s.page);
                const r = await stop(s.page); const ps = plateSteps(r.f); const last = r.f.at(-1);
                const file = dump(engine, "case·capped·morph", r);
                add(engine, "case·capped·morph", { errors: s.errors.length + r.errs.length === 0, continuous: ps.step <= 0.45 * ps.travel, rest: !last.m },
                    `cap 300 px: expand (run overflowing ${over}), add a seat, collapse: page errors ${s.errors.length}, window error events ${r.errs.length}${r.errs.length ? ` (${r.errs[0]})` : ""}; plate travel ${ps.travel} px, largest one-frame step ${ps.step} px; flag at rest ${last.m ? "OPEN" : "closed"}; ${file}`);
            } finally { await s.close(); }
        });
        // 2 · unlayered consumer margin rules on .glass-dock
        for (const [cell, css] of [["case·consumer-margin", ".glass-dock { margin-inline: 20px; }"], ["case·consumer-margin·control", ""]]) {
            await rep.guard(engine, [cell], async () => {
                const s = await openScene(browser, target, "morph", { query: { neighbour: "1" } });
                try {
                    if (css) await injectCss(s.page, css);
                    await raf(s.page, 20);
                    const ml = await s.page.evaluate(() => getComputedStyle(window.__dockProbe.root()).marginLeft);
                    await start(s.page);
                    await s.page.evaluate(() => window.__scene.expand()); await settle(s.page);
                    await s.page.evaluate(() => window.__scene.collapse()); await settle(s.page);
                    const r = await stop(s.page);
                    let overlap = -Infinity, nbStep = 0, edgeStep = 0;
                    for (let i = 0; i < r.f.length; i++) { const f = r.f[i]; overlap = Math.max(overlap, f.e[2] - f.nb); if (i) { nbStep = Math.max(nbStep, Math.abs(f.nb - r.f[i - 1].nb)); edgeStep = Math.max(edgeStep, Math.abs(f.e[2] - r.f[i - 1].e[2])); } }
                    const nbTravel = Math.max(...r.f.map((f) => f.nb)) - Math.min(...r.f.map((f) => f.nb));
                    const file = dump(engine, cell, r);
                    add(engine, cell, { errors: s.errors.length === 0, overlap: overlap <= 0.5, follows: nbStep <= edgeStep + 1 },
                        `${css ? `unlayered "${css}"` : "no consumer rule"} (computed margin-left at rest ${ml}): expand, collapse; plate end edge past the neighbour by at most ${r2(overlap)} px (bound 0.5); neighbour travel ${r2(nbTravel)} px, largest one-frame step ${r2(nbStep)} px against the plate edge's ${r2(edgeStep)} px (+1); ${file}`);
                } finally { await s.close(); }
            });
        }
        // 3 · a rotated ancestor
        const jerks = {};
        for (const [cell, deg] of [["case·rotated·control", 0], ["case·rotated", 2]]) {
            await rep.guard(engine, [cell], async () => {
                const s = await openScene(browser, target, "morph");
                try {
                    await s.page.evaluate((deg) => { window.__dockProbe.root().parentElement.style.transform = `rotate(${deg}deg)`; }, deg);
                    await raf(s.page, 20);
                    await start(s.page, deg !== 0);
                    await s.page.evaluate(() => window.__scene.expand()); await settle(s.page);
                    await s.page.evaluate(() => window.__scene.collapse()); await settle(s.page);
                    const r = await stop(s.page);
                    // per posture leg: the seats painted in the episode
                    const j = seatJerk(r.f); jerks[deg] = j;
                    const file = dump(engine, cell, r);
                    const checks = { errors: s.errors.length === 0, snap: j.snap <= 0.5 };
                    if (deg !== 0 && jerks[0]) checks.jerk = j.jerk <= jerks[0].jerk + 1;
                    add(engine, cell, checks, `host rotate(${deg}deg): expand, collapse; seats' largest second difference ${j.jerk} px/frame²${deg !== 0 && jerks[0] ? ` (control ${jerks[0].jerk}, bound +1)` : ""}; largest one-frame seat move after the window closed ${j.snap} px (bound 0.5); ${file}`);
                } finally { await s.close(); }
            });
        }
    } finally { await browser.close(); }
}
await target.close();
rep.finish(out);
