// D2-Bp-crit-probes.mjs: the pass-3 D2-B′ critic's own arm (D2-Bp-critique.md). Reads DOM and
// hit-testing only; never edits source. Run through pass-3/adapter-floor-v2.mjs.
//
//   node D2-Bp-crit-probes.mjs --build <build> --adapter ../pass-3/adapter-floor-v2.mjs \
//        --arm lune --engine chromium|webkit|all --out <json>
//
// lune   R5 (Q-7, hit follows paint at the arc). The route's `hit` arm samples seat centres and
//        the root box beside the plate; it never samples the plate's own corners. On the morph
//        scene, at rest (collapsed, expanded) and on 4 in-flight frames of a warm expand and a
//        warm collapse: for each of the plate's four corners, the point on the corner's diagonal
//        1.5 px inside the bounding box. It lies outside the painted arc whenever the radius is
//        over 5.2 px. elementFromPoint there must not return an element of the dock (`luneHit`).
//        A centre point of the plate (inside the arc) must (`coreHit`, the arm's own control).
import fs from "node:fs";
import path from "node:path";
import { parseArgs, openTarget, launch, openScene, waitRest, loadAvg } from "../harness/lib.mjs";

const args = parseArgs();
const engs = (args.engine ?? "all") === "all" ? ["chromium", "webkit"] : String(args.engine).split(",");
const target = await openTarget(args);
const LABEL = { chromium: "Chromium", webkit: "Playwright WebKit" };
const out = { probe: "D2-Bp-crit-probes", started: new Date().toISOString(), build: target?.label ?? null, cells: [] };
const add = (c) => { c.load = loadAvg(); out.cells.push(c); console.log(JSON.stringify(c)); };

const sample = () => {
    const P = window.__dockProbe, hp = window.__hp, plate = P.plate(), root = P.root();
    const e = P.extent();
    const R = parseFloat(getComputedStyle(plate).borderTopLeftRadius) || 0;
    const inDock = (el) => !!el && root.contains(el);
    const pts = [[e.l + 1.5, e.t + 1.5], [e.r - 1.5, e.t + 1.5], [e.r - 1.5, e.b - 1.5], [e.l + 1.5, e.b - 1.5]];
    const lunes = pts.map(([x, y]) => { const el = document.elementFromPoint(x, y); return { at: [+x.toFixed(1), +y.toFixed(1)], dock: inDock(el), got: el ? hp.label(el) : "null" }; });
    const core = document.elementFromPoint((e.l + e.r) / 2, (e.t + e.b) / 2);
    return { plate: [+e.l.toFixed(1), +e.t.toFixed(1), +e.r.toFixed(1), +e.b.toFixed(1)], R: +R.toFixed(2), morphing: P.morphing(), luneHit: lunes.filter((x) => x.dock).length, lunes, coreHit: inDock(core) };
};

async function lune(browser, engine) {
    for (const cell of ["rest-collapsed", "rest-expanded", "warm-expand", "warm-collapse"]) {
        const s = await openScene(browser, target, "morph");
        if (cell === "rest-expanded" || cell === "warm-collapse") { await s.page.evaluate(() => window.__scene.expand()); await waitRest(s.page, { quiet: 500 }); }
        let rows;
        if (cell.startsWith("rest")) rows = [await s.page.evaluate(sample)];
        else rows = await s.page.evaluate(async ([dir, src]) => {
            const f = new Function(`return (${src})`)();
            const raf = () => new Promise((r) => requestAnimationFrame(r));
            if (dir === "expand") window.__scene.expand(); else window.__scene.collapse();
            const rs = [];
            for (let n = 0; n < 4; n++) { await raf(); await raf(); rs.push(f()); }
            return rs;
        }, [cell === "warm-expand" ? "expand" : "collapse", sample.toString()]);
        const big = rows.filter((r) => r.R > 5.2);
        const luneHit = big.reduce((a, r) => a + r.luneHit, 0), luneN = big.length * 4;
        const coreOk = rows.every((r) => r.coreHit);
        add({ arm: "lune", engine: LABEL[engine], cell, pass: luneHit === 0 && coreOk && big.length > 0, luneHit, luneN, coreOk, rows,
            summary: `${cell}: corner points outside the arc hit the dock ${luneHit}/${luneN} (bound 0); plate centre hits the dock ${coreOk ? "every" : "NOT every"} frame; R ${[...new Set(rows.map((r) => r.R))].join("/")} px; window ${rows.map((r) => r.morphing ? 1 : 0).join("")}; got ${[...new Set(rows.flatMap((r) => r.lunes.map((l) => l.got)))].join(" | ")}` });
        await s.close();
    }
}

for (const engine of engs) {
    const browser = await launch(engine);
    try { await lune(browser, engine); } catch (e) { add({ arm: "lune", engine: LABEL[engine], error: String(e).slice(0, 400) }); }
    await browser.close();
}
out.finished = new Date().toISOString();
if (args.out) { fs.mkdirSync(path.dirname(path.resolve(args.out)), { recursive: true }); fs.writeFileSync(path.resolve(args.out), JSON.stringify(out, null, 1)); }
await target?.close?.();
process.exit(0);
