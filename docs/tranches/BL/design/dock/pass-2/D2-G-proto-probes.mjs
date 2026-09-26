// D2-G prototype · two reads the witnesses do not take, on a built dock.
//
//   hit      REGISTRY §6 question 5. At rest (collapsed and expanded), `elementFromPoint` at
//            three points of the morph dock's window: the rounded corner outside the arc
//            (2 px in from the rect's corner), the middle of the window's start cap, and 2 px
//            outside the rect. Reports which element answers and whether it is inside the dock.
//   script   the main-thread cost of starting an episode: the time from the posture call
//            (`__scene.expand()` / `collapse()`) to the next macrotask, which covers Vue's
//            flush and the carrier's reads and writes (forced layout included). Taken at a
//            first expand, a warm collapse, a warm expand, and a reversal 120 ms into an
//            expand. Plus the longest rAF interval in the 300 ms after each call.
//
//   node D2-G-proto-probes.mjs --build <dir> --adapter <adapter.mjs> --label <name> --out <dir> [--engine chromium,webkit] [--reps 3]
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { openTarget, launch, openScene, extentNow } from "../harness/lib.mjs";

const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > 0 ? process.argv[i + 1] : d; };
const build = arg("build"), adapter = arg("adapter"), label = arg("label", "build"), out = arg("out");
const engineList = arg("engine", "chromium,webkit").split(","), reps = +arg("reps", 3);
const load = () => +os.loadavg()[0].toFixed(2);

const target = await openTarget({ build, adapter: path.resolve(adapter) });
const rec = { hit: [], script: [] };

const call = (page, what, reverseAt = null) => page.evaluate(({ what, reverseAt }) => new Promise((res) => {
    const gaps = []; let last = null; let stop = false;
    const tick = (t) => { if (last != null) gaps.push(t - last); last = t; if (!stop) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
    const t0 = performance.now();
    window.__scene[what]();
    setTimeout(() => {
        const first = performance.now() - t0;
        const finish = (rev) => setTimeout(() => { stop = true; res({ scriptMs: +first.toFixed(2), reverseMs: rev, maxRafGapMs: +Math.max(...gaps).toFixed(1) }); }, 300);
        if (reverseAt == null) return finish(null);
        setTimeout(() => {
            const t1 = performance.now();
            window.__scene[what === "expand" ? "collapse" : "expand"]();
            setTimeout(() => finish(+(performance.now() - t1).toFixed(2)), 0);
        }, reverseAt);
    }, 0);
}), { what, reverseAt });

for (const engine of engineList) {
    const browser = await launch(engine);
    const E = engine === "webkit" ? "Playwright WebKit" : "Chromium";
    for (let rep = 1; rep <= reps; rep++) {
        const s = await openScene(browser, target, "morph");
        const p = s.page;
        const settle = () => p.waitForTimeout(1200);
        const l0 = load();
        const first = await call(p, "expand"); await settle();
        const hitX = await p.evaluate(() => {
            const P = window.__dockProbe, e = P.extent(), root = P.root();
            const pt = (x, y) => { const el = document.elementFromPoint(x, y); return { x: +x.toFixed(1), y: +y.toFixed(1), el: window.__hp.label(el), inDock: !!el && root.contains(el) }; };
            const r = (e.b - e.t) / 2;
            return { extent: e, corner: pt(e.l + 2, e.t + 2), cap: pt(e.l + r / 2, (e.t + e.b) / 2), outside: pt(e.l - 2, (e.t + e.b) / 2) };
        });
        const warmC = await call(p, "collapse"); await settle();
        const hitC = await p.evaluate(() => {
            const P = window.__dockProbe, e = P.extent(), root = P.root();
            const pt = (x, y) => { const el = document.elementFromPoint(x, y); return { x: +x.toFixed(1), y: +y.toFixed(1), el: window.__hp.label(el), inDock: !!el && root.contains(el) }; };
            const r = (e.b - e.t) / 2;
            return { extent: e, corner: pt(e.l + 2, e.t + 2), cap: pt(e.l + r / 2, (e.t + e.b) / 2), outside: pt(e.l - 2, (e.t + e.b) / 2) };
        });
        const warmE = await call(p, "expand"); await settle();
        await call(p, "collapse"); await settle();
        const rev = await call(p, "expand", 120); await settle();
        const l1 = load();
        rec.hit.push({ engine: E, rep, expanded: hitX, collapsed: hitC, load: [l0, l1] });
        rec.script.push({ engine: E, rep, first, warmCollapse: warmC, warmExpand: warmE, reversal: rev, load: [l0, l1], errors: s.errors });
        console.log(`${E} ${label} rep ${rep}: script ms first ${first.scriptMs} · warm collapse ${warmC.scriptMs} · warm expand ${warmE.scriptMs} · reversal ${rev.reverseMs}; max rAF gap ${first.maxRafGapMs} / ${warmC.maxRafGapMs} / ${warmE.maxRafGapMs} / ${rev.maxRafGapMs} ms  [load ${l0} → ${l1}]`);
        if (rep === 1) console.log(`${E} ${label} hit expanded: corner ${hitX.corner.el} (in dock ${hitX.corner.inDock}) · cap ${hitX.cap.el} (${hitX.cap.inDock}) · outside ${hitX.outside.el} (${hitX.outside.inDock}); collapsed: corner ${hitC.corner.el} (${hitC.corner.inDock}) · cap ${hitC.cap.el} (${hitC.cap.inDock}) · outside ${hitC.outside.el} (${hitC.outside.inDock})`);
        await s.close();
    }
    await browser.close();
}
await target.close();
fs.mkdirSync(out, { recursive: true });
fs.writeFileSync(path.join(out, `probes-${label}.json`), JSON.stringify(rec, null, 1));
