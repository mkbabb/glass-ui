// W5 · a progress rim in the dock's bottom edge stays inside the plate's silhouette
// (its own radius) in every rung and orientation.
//
//   node w5-rim.mjs --build <dir> | --fixture pass|<fault>  [--engine …] [--out <dir>]
//
// Two probe-paint shots of the same region: "plate" (only the plate, magenta) gives
// the silhouette; "rim" (only the rim, in its own colours; the plate keeps its clips
// but paints nothing) gives the rim. A rim pixel is OUTSIDE when it carries ink
// (≥ 26/255 from white) where the plate's coverage is under 0.02, i.e. clear of the
// anti-aliased edge. Depth is the distance from such a pixel to the nearest plate
// pixel of coverage ≥ 0.5.
//
// Rungs: expanded and collapsed, horizontal (scene rim) and vertical (scene vrim),
// plus the compact rung when the dock has one. The rim is the adapter's rim(); when
// it returns null the cell FAILS as absent (HEAD: GlassDock has no rim seat) and the
// consumer-composed ScrollProgressRim overlay, if the scene has one, is measured and
// reported in the same cell for the record.
//
// BOUND: 0 outside device pixels, and the rim paints at least 1 pixel.
import fs from "node:fs";
import { parseArgs, engines, openTarget, launch, openScene, makeReport, outDir, engineTag, probeMode, shoot, magentaCoverage, inkCoverage, extentNow, waitRest, r2 } from "./lib.mjs";

const args = parseArgs();
const target = await openTarget(args);
const out = outDir(args, "W5");
const rep = makeReport("W5", target);

async function rimRead(page, rim, file) {
    const e = await extentNow(page);
    const clip = { x: Math.max(0, e.l - 24), y: Math.max(0, e.t - 24), width: e.w + 48, height: e.h + 48 };
    await probeMode(page, "plate", { rim }); await page.waitForTimeout(80);
    const a = await shoot(page, clip);
    await probeMode(page, "rim", { rim }); await page.waitForTimeout(80);
    const b = await shoot(page, clip);
    await probeMode(page, null);
    fs.writeFileSync(file, b.png);
    const P = magentaCoverage(a), R = inkCoverage(b), w = a.w, h = a.h, dsf = a.dsf;
    let ink = 0, outside = 0, depth = 0;
    let bx0 = w, by0 = h, bx1 = -1, by1 = -1;
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
        const i = y * w + x;
        if (R[i] < 26 / 255) continue;
        ink++; bx0 = Math.min(bx0, x); by0 = Math.min(by0, y); bx1 = Math.max(bx1, x); by1 = Math.max(by1, y);
        if (P[i] >= 0.02) continue;
        outside++;
        let best = Infinity;
        for (let dy = -40; dy <= 40; dy++) for (let dx = -40; dx <= 40; dx++) {
            const yy = y + dy, xx = x + dx;
            if (yy < 0 || yy >= h || xx < 0 || xx >= w) continue;
            if (P[yy * w + xx] >= 0.5) best = Math.min(best, Math.hypot(dx, dy));
        }
        depth = Math.max(depth, best);
    }
    return { ink, outside, depthPx: r2(depth / dsf), rimBox: ink ? [r2(bx0 / dsf - 24), r2(by0 / dsf - 24), r2((bx1 - bx0 + 1) / dsf), r2((by1 - by0 + 1) / dsf)] : null, plate: [r2(e.w), r2(e.h)] };
}

const RUNGS = [
    ["rim", {}, "h·expanded"],
    ["rim", { collapse: "closed" }, "h·collapsed"],
    ["vrim", {}, "v·expanded"],
    ["vrim", { collapse: "closed" }, "v·collapsed"],
];

for (const engine of engines(args)) {
    const browser = await launch(engine);
    const tag = engineTag(target, engine);
    try {
        for (const [scene, query, name] of RUNGS) {
            const s = await openScene(browser, target, scene, { query });
            await waitRest(s.page, { quiet: 300, cap: 4000 });
            const has = await s.page.evaluate(() => ({ rim: !!window.__dockProbe.rim?.(), composed: !!window.__dockProbe.composedRim?.(), posture: window.__dockProbe.posture() }));
            if (!has.rim) {
                let note = "";
                if (has.composed) {
                    const c = await rimRead(s.page, "composed", `${out}/${engine}-${name}-composed.png`);
                    note = `; the consumer-composed ScrollProgressRim overlay (for the record): ${c.outside} device px outside the plate, ${c.depthPx} px deep, rim box ${JSON.stringify(c.rimBox)} on a ${c.plate.join("x")} plate`;
                }
                rep.add({ engine, cell: name + tag, pass: false, absent: true, posture: has.posture, summary: `absent: the dock has no rim of its own (adapter rim() is null)${note}` });
            } else {
                const r = await rimRead(s.page, "dock", `${out}/${engine}-${name}.png`);
                rep.add({ engine, cell: name + tag, pass: r.ink > 0 && r.outside === 0, posture: has.posture, ...r, summary: `posture ${has.posture}; rim ink ${r.ink} device px, ${r.outside} outside the plate silhouette (max depth ${r.depthPx} px); rim box ${JSON.stringify(r.rimBox)} on a ${r.plate.join("x")} plate` });
            }
            await s.close();
        }
        // the compact rung: needs both the rim and the compact rung
        {
            const s = await openScene(browser, target, "compact");
            const has = await s.page.evaluate(() => ({ rim: !!window.__dockProbe.rim?.(), compact: !!window.__dockProbe.compact?.() }));
            if (!has.rim || !has.compact) rep.add({ engine, cell: "h·compact" + tag, pass: false, absent: true, summary: `absent: ${!has.compact ? "no compact rung" : ""}${!has.compact && !has.rim ? " and " : ""}${!has.rim ? "no dock rim" : ""}` });
            else {
                await s.page.evaluate(() => window.scrollTo(0, 900)); await s.page.waitForTimeout(100); await waitRest(s.page);
                const r = await rimRead(s.page, "dock", `${out}/${engine}-h-compact.png`);
                rep.add({ engine, cell: "h·compact" + tag, pass: r.ink > 0 && r.outside === 0, ...r, summary: `compact rung; rim ink ${r.ink}, ${r.outside} outside (max depth ${r.depthPx} px)` });
            }
            await s.close();
        }
    } finally {
        await browser.close();
    }
}
await target.close();
rep.finish(out);
