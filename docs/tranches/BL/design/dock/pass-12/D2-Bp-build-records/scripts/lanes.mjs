// lanes.mjs (D2 pass 12, BUILDER of D2-B′, REGISTRY §P11-7.3 item 1): the window tail, read lane by lane.
// On a lanetrace.py build (bp10t, bp8t) it drives W3's own sequences (harness/w3-morph.mjs MORPH_SEQ / SWAP_SEQ, verbatim
// triggers, the same step(): mark, trigger, waitChange, waitRest quiet 500, 200 ms) under W3's own strip log (startLog with
// seats, owners, ink, lanes, glyphs, so the page carries the witness's per-frame read), and beside it the scene's own
// per-frame lane trace (window.__laneTrace). Per cell: the witness's open / land / close (lib.mjs analyseMorph, unchanged),
// and on every frame from one before the landing to one after the close, every lane still moving with its remaining
// distance, the plate rect the scene wrote, and what the witness read as painted (extent length, the largest one-frame
// change of any painted lane under the root: translate, clip, opacity).
//   node lanes.mjs --build <dir> --adapter <a> --engine chromium|webkit [--theme dark] --runs N --scene morph|swap --json <f>
import fs from "node:fs";
const H = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock/harness";
const { parseArgs, openTarget, launch, openScene, startLog, stopLog, mark, waitRest, dockCenter, extentNow, analyseMorph, pinnedRung, loadAvg, r2 } = await import(H + "/lib.mjs");
const args = parseArgs();
const target = await openTarget(args);
const RUNG = await pinnedRung(target);
const engine = args.engine; const theme = args.theme === "dark" ? "dark" : (args.theme || null);
const runs = +(args.runs || 1); const sceneName = args.scene || "morph";
const STRIP = { seats: true, owners: true, ink: true, lanes: true, glyphs: true };
const MORPH_SEQ = [
    ["first-expand", (p, c) => p.mouse.move(c.x, c.y, { steps: 3 })],
    ["warm-collapse", (p) => p.mouse.move(4, 4)],
    ["warm-expand", async (p) => { const c = await dockCenter(p); await p.mouse.move(c.x, c.y, { steps: 3 }); }],
    ["content-add", (p) => p.evaluate(() => window.__scene.setExtra(true))],
    ["content-remove", (p) => p.evaluate(() => window.__scene.setExtra(false))],
    ["lead-add", (p) => p.evaluate(() => window.__scene.setLead(true))],
    ["lead-remove", (p) => p.evaluate(() => window.__scene.setLead(false))],
];
const SWAP_SEQ = [
    ["swap-long", (p) => p.evaluate(() => window.__scene.setFace("long"))],
    ["swap-short", (p) => p.evaluate(() => window.__scene.setFace("short"))],
];
const SEQ = sceneName === "swap" ? SWAP_SEQ : MORPH_SEQ;
async function waitChange(page, cap = 7000) {
    const b = await extentNow(page); const t0 = Date.now();
    while (Date.now() - t0 < cap) { const e = await extentNow(page); const m = await page.evaluate(() => window.__dockProbe.morphing()); if (m || Math.abs(e.w - b.w) > 0.25 || Math.abs(e.h - b.h) > 0.25) return; await page.waitForTimeout(16); }
}
const lanesMoving = (w) => {
    const out = [];
    for (const [k, v] of Object.entries(w.edge)) if (v[1]) out.push([`edge.${k}`, v[0], v[2]]);
    if (w.e[1]) out.push(["e", r2(w.e[0]), w.e[2]]);
    for (const m of w.mv) { if (m.x[1]) out.push([`${m.l}@${m.d}.lx`, m.x[0], m.x[2]]); if (m.y[1]) out.push([`${m.l}@${m.d}.ly`, m.y[0], m.y[2]]); }
    w.ex.forEach((x, i) => { if (x[1]) out.push([`ex${i}`, +(1 - x[0]).toFixed(4), x[2]]); });
    return out;
};
const paintStep = (a, b) => {   // the largest one-frame change of any painted lane (witness read, H4-2) between two frames
    let worst = 0, who = "";
    const A = a?.ln || {}, B = b?.ln || {};
    for (const id of new Set([...Object.keys(A), ...Object.keys(B)])) {
        const la = Object.fromEntries((A[id] || []).map(([k, v]) => [k, v])), lb = Object.fromEntries((B[id] || []).map(([k, v]) => [k, v]));
        for (const k of new Set([...Object.keys(la), ...Object.keys(lb)])) {
            const va = la[k] ?? (k === "op" ? 1 : k === "sc" ? 1 : k === "clip" ? [0, 0, 0, 0] : k === "tr" ? [0, 0] : null), vb = lb[k] ?? (k === "op" ? 1 : k === "sc" ? 1 : k === "clip" ? [0, 0, 0, 0] : k === "tr" ? [0, 0] : null);
            if (typeof va === "string" || typeof vb === "string") { if (va !== vb) { worst = Math.max(worst, 99); who = id + ":" + k; } continue; }
            const d = Array.isArray(va) ? Math.max(...va.map((x, i) => Math.abs(x - (vb?.[i] ?? 0)))) : Math.abs((va ?? 0) - (vb ?? 0));
            if (d > worst) { worst = d; who = id + ":" + k; }
        }
    }
    return { d: r2(worst), who };
};
const browser = await launch(engine);
const res = { engine, theme: theme || "light", build: target.label, scene: sceneName, runs: [] };
try {
    for (let k = 1; k <= runs; k++) {
        const L0 = loadAvg();
        const s = await openScene(browser, target, sceneName, theme ? { theme } : {});
        try {
            await s.page.evaluate(() => { window.__laneTrace = []; });
            const ax = await s.page.evaluate(() => window.__dockProbe.axis());
            await startLog(s.page, STRIP); await s.page.waitForTimeout(150);
            const c = await dockCenter(s.page);
            for (const [name, trig] of SEQ) { await mark(s.page, name); await trig(s.page, c); await waitChange(s.page); await waitRest(s.page, { quiet: 500, cap: 7000 }); await s.page.waitForTimeout(200); }
            const frames = await stopLog(s.page);
            const trace = await s.page.evaluate(() => window.__laneTrace);
            const run = { run: k, load: L0, loadEnd: loadAvg(), dropped: frames.dropped, cells: {} };
            for (const [name] of SEQ) {
                const i0 = frames.findIndex((f) => f.mk === name); if (i0 < 1) continue;
                const fr = [frames[i0 - 1], ...frames.filter((f) => f.mk === name)];
                const a = analyseMorph(fr, RUNG, { ax, paintFloor: true });
                const w = a.window; const T0 = fr[0].t;
                const lenOf = (f) => ax === "y" ? f.e[3] - f.e[1] : f.e[2] - f.e[0];
                const near = (v) => v == null ? -1 : fr.findIndex((f) => Math.abs((f.t - T0) - v) < 0.01);
                const iLand = near(w.land), iClose = near(w.close);
                const tr = trace.filter((x) => x.ts >= fr[1].t - 200 && x.ts <= fr.at(-1).t + 1);
                const wins = tr.filter((x) => x.k === "win").map((x) => ({ open: x.open, t: x.ts == null ? null : r2(x.ts - T0), n: x.n }));
                const checks = tr.filter((x) => x.k === "check").map((x) => ({ t: x.ts == null ? null : r2(x.ts - T0), pn: x.pn }));
                const rows = [];
                const lo = Math.max(1, (iLand < 0 ? 1 : iLand) - 3), hi = Math.min(fr.length - 1, (iClose < 0 ? fr.length - 1 : iClose) + 1);
                for (let i = lo; i <= hi; i++) {
                    const f = fr[i]; const ws = trace.filter((x) => x.k === "w" && x.ts === f.t);
                    rows.push({ t: r2(f.t - T0), dtWit: r2(f.t - fr[i - 1].t), len: r2(lenOf(f)), m: f.m ? 1 : 0, paint: paintStep(fr[i - 1], f), lenStep: r2(lenOf(f) - lenOf(fr[i - 1])),
                        writes: ws.map((x) => ({ n: x.n, pn: x.pn, dt: r2(x.dt), frame: x.frame, Pr: x.Pr, any: x.any, win: x.win, moving: lanesMoving(x) })) });
                }
                // the body frames with no witness frame at the same timestamp (a frame the witness dropped)
                const witTs = new Set(fr.map((f) => f.t));
                const orphan = tr.filter((x) => x.k === "w" && x.frame && !witTs.has(x.ts) && x.ts >= (fr[Math.max(0, iLand - 3)]?.t ?? 0) && x.ts <= (fr[hi]?.t ?? 0)).map((x) => ({ t: r2(x.ts - T0), n: x.n, any: x.any, moving: lanesMoving(x) }));
                run.cells[name] = { open: w.open, land: w.land, close: w.close, gap: iClose >= 0 && iLand >= 0 ? r2(fr[iClose].t - fr[iLand].t) : null, frameMs: w.frameMs, q4c: w.q4c?.why ?? null, why: w.why, wins, checks, rows, orphan };
            }
            res.runs.push(run);
            console.log(`${engine} ${theme || "light"} ${sceneName} r${k} load ${L0}: ` + Object.entries(run.cells).map(([n, c]) => `${n} gap ${c.gap}`).join(" · "));
        } finally { await s.close(); }
    }
} finally { await browser.close(); await target.close(); }
fs.writeFileSync(args.json, JSON.stringify(res));
