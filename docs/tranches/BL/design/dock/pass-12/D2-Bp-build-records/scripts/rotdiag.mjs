// rotdiag.mjs (D2 pass 12, BUILDER of D2-B′): the CASES `case·rotated·control` snap, read lane by lane. On a checktrace.py
// build it drives the probe's own sequence (pass-4 cases.mjs: host transform, 20 rAF, expand, settle, collapse, settle) with
// the probe's own per-frame seat recorder (transform-aware seat centres), and keeps beside it every check() record of the
// scene (each mover's model position before and after, the whole-px offsets, the left-based fraction, the painted rect) and
// the scene's per-frame lane writes around each flag close.
//   node rotdiag.mjs --build <dir> --adapter <a> --engine webkit --host none|0|2 --runs N --json <f>
import fs from "node:fs";
const H = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock/harness";
const { parseArgs, openTarget, launch, openScene, loadAvg, r2 } = await import(H + "/lib.mjs");
const args = parseArgs();
const target = await openTarget(args);
const engine = args.engine; const host = args.host ?? "0"; const runs = +(args.runs || 1);
const raf = (page, n) => page.evaluate((n) => new Promise((res) => { let k = 0; const t = () => (++k >= n ? res() : requestAnimationFrame(t)); requestAnimationFrame(t); }), n);
const START = `(rot) => {
  const P = window.__dockProbe, root = P.root();
  const L = { f: [], stop: false };
  window.__cs = L;
  const h = rot ? root.parentElement : null;
  let M = null, O = null;
  if (h) { M = new DOMMatrix(getComputedStyle(h).transform).inverse(); const r = h.getBoundingClientRect(); O = { x: (r.left + r.right) / 2, y: (r.top + r.bottom) / 2 }; }
  const local = (q) => { const c = { x: (q.left + q.right) / 2, y: (q.top + q.bottom) / 2 }; if (!M) return c; const p = M.transformPoint({ x: c.x - O.x, y: c.y - O.y }); return { x: p.x + O.x, y: p.y + O.y }; };
  const tick = () => {
    if (L.stop) return;
    const e = P.extent(); const rr = root.getBoundingClientRect();
    L.f.push({ t: performance.now(), m: !!P.morphing(), e: [e.l, e.r], root: [+rr.left.toFixed(3), +rr.width.toFixed(3)], s: P.seats({ all: true }).map((el) => { const q = el.getBoundingClientRect(); return q.width > 0 ? +local(q).x.toFixed(3) : null; }) });
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}`;
const settle = async (page, cap = 4000) => { const t0 = Date.now(); await page.waitForTimeout(120); while (Date.now() - t0 < cap) { if (!(await page.evaluate(() => window.__dockProbe.morphing()))) break; await page.waitForTimeout(60); } await page.waitForTimeout(250); };
const browser = await launch(engine);
const res = { engine, build: target.label, host, runs: [] };
try {
    for (let k = 1; k <= runs; k++) {
        const L0 = loadAvg();
        const s = await openScene(browser, target, "morph");
        try {
            const hostInfo = await s.page.evaluate((host) => { const r = window.__dockProbe.root(); const h = r.parentElement; if (host !== "none") h.style.transform = `rotate(${host}deg)`; const cs = getComputedStyle(r); return { hostTag: h.tagName, hostClass: h.className, rootPos: cs.position, rootTransform: cs.transform, rootTranslate: cs.translate, rootLeft: cs.left, rootWidth: cs.width }; }, host);
            await raf(s.page, 20);
            await s.page.evaluate(() => { window.__laneTrace = []; });
            await s.page.evaluate(`(${START})(${host !== "none" && host !== "0" ? "true" : "false"})`);
            await s.page.evaluate(() => window.__scene.expand()); await settle(s.page);
            await s.page.evaluate(() => window.__scene.collapse()); await settle(s.page);
            const f = await s.page.evaluate(() => { window.__cs.stop = true; return window.__cs.f; });
            const trace = await s.page.evaluate(() => window.__laneTrace);
            // snap: each seat's one-frame move from the frame the flag closes until it opens again
            let snap = { d: 0 };
            for (let i = 1, open = false; i < f.length; i++) { if (f[i - 1].m && !f[i].m) open = true; if (f[i].m) open = false; if (!open) continue;
                f[i].s.forEach((c, j) => { const b = f[i - 1].s[j]; if (b != null && c != null && Math.abs(c - b) > snap.d) snap = { d: +Math.abs(c - b).toFixed(3), seat: j, t: r2(f[i].t - f[0].t), from: b, to: c }; }); }
            const closes = f.map((x, i) => i > 0 && f[i - 1].m && !x.m ? i : -1).filter((i) => i > 0);
            const around = closes.map((i) => f.slice(Math.max(0, i - 3), i + 2).map((x) => ({ t: r2(x.t - f[0].t), m: x.m, root: x.root, e: x.e, s0: x.s[0], s4: x.s[4] })));
            const w = trace.filter((x) => x.k === "w");
            const tail = closes.map((i) => w.filter((x) => x.ts >= f[Math.max(0, i - 3)].t && x.ts <= f[i].t + 1).map((x) => ({ t: r2(x.ts - f[0].t), n: x.n, any: x.any, win: x.win, Pr: x.Pr, edge: x.edge, e: x.e, mv: (x.mv || []).filter((m) => Math.abs(m.x[0]) > 0.01 || m.x[1]).map((m) => [m.l, m.d, m.x]) })));
            res.runs.push({ run: k, load: L0, loadEnd: loadAvg(), hostInfo, snap, around, tail, chk: trace.filter((x) => x.k === "chk") });
            console.log(`${engine} ${target.label} host ${host} r${k} load ${L0}: snap ${snap.d} (seat ${snap.seat} at ${snap.t} ms, ${snap.from} -> ${snap.to}); closes ${closes.length}`);
        } finally { await s.close(); }
    }
} finally { await browser.close(); await target.close(); }
fs.writeFileSync(args.json, JSON.stringify(res));
