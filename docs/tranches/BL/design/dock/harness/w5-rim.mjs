// W5 · the progress rim (H2). In every rung and orientation the rim stays inside the
// plate's silhouette, is WHOLE with the plate's clip lifted (its geometry, not the clip,
// keeps it in: H-5, D pD), and its fill TRACKS the scroll source (H-5, A w5dead, F pW5b):
// the ink that differs from progress 0 rises monotonically as the source scrolls. The
// source is the window, and in one cell an element (H-5, F §4.6).
//
//   node w5-rim.mjs --build <dir> | --fixture pass|<fault>  [--engine …] [--out <dir>]
//
// BOUNDS
//   inside   0 rim ink pixels (≥ 26/255 from white) where the plate's coverage is < 0.02
//   whole    with every clip between the rim and the dock root lifted, 0 rim ink pixels beyond
//            the plate's box (+1 device px), and the clipped rim keeps ≥ 20 % of its unclipped ink
//   fill     at source progress 0, .25, .5, .75, 1 the count of rim pixels that differ from the
//            progress-0 shot (≥ 26/255 in any channel) never falls (by more than 2 % of its largest value), is > 0 at .5 and rises from .5 to 1
// Rungs: h·expanded, h·collapsed, v·expanded, v·collapsed, h·compact (needs the compact rung),
// and h·expanded·el-source. rim() null → RED by absence; the consumer-composed
// ScrollProgressRim overlay, where the scene has one, is measured for the record.
import fs from "node:fs";
import { parseArgs, engines, openTarget, launch, openScene, makeReport, outDir, engineTag, probeMode, shoot, magentaCoverage, inkCoverage, extentNow, waitRest, scrollSource, r2 } from "./lib.mjs";

export const WHOLE_FRAC = 0.2;
const args = parseArgs();
const target = await openTarget(args);
const out = outDir(args, "W5");
const rep = makeReport("W5", target);

async function clipRect(page) { const e = await extentNow(page); return { x: Math.max(0, e.l - 24), y: Math.max(0, e.t - 24), width: e.w + 48, height: e.h + 48 }; }
async function rimRead(page, rim, file) {
    const clip = await clipRect(page);
    await probeMode(page, "plate", { rim }); await page.waitForTimeout(80);
    const a = await shoot(page, clip);
    await probeMode(page, "rim", { rim }); await page.waitForTimeout(80);
    const b = await shoot(page, clip);
    await probeMode(page, null);
    if (file) fs.writeFileSync(file, b.png);
    const P = magentaCoverage(a), R = inkCoverage(b), w = a.w, h = a.h, dsf = a.dsf;
    let ink = 0, outside = 0, depth = 0;
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
        const i = y * w + x;
        if (R[i] < 26 / 255) continue;
        ink++;
        if (P[i] >= 0.02) continue;
        outside++;
        let best = Infinity;
        for (let dy = -40; dy <= 40; dy++) for (let dx = -40; dx <= 40; dx++) { const yy = y + dy, xx = x + dx; if (yy < 0 || yy >= h || xx < 0 || xx >= w) continue; if (P[yy * w + xx] >= 0.5) best = Math.min(best, Math.hypot(dx, dy)); }
        depth = Math.max(depth, best);
    }
    return { ink, outside, depthPx: r2(depth / dsf), plate: [r2(clip.width - 48), r2(clip.height - 48)], plateCov: P, clip, rimImg: b };
}
/** H-5 whole: lift every clip from the rim up to the dock root; the rim's own geometry must stay in the plate's box. */
async function wholeRead(page) {
    const clip = await clipRect(page);
    await probeMode(page, "plate"); await page.waitForTimeout(60);
    const a = await shoot(page, clip);
    const P = magentaCoverage(a);
    let l = a.w, t = a.h, r = -1, b = -1; for (let y = 0; y < a.h; y++) for (let x = 0; x < a.w; x++) if (P[y * a.w + x] >= 0.5) { if (x < l) l = x; if (x > r) r = x; if (y < t) t = y; if (y > b) b = y; }
    await probeMode(page, "rim"); await page.waitForTimeout(60);
    const clipped = await shoot(page, clip);
    await page.evaluate(() => { const P = window.__dockProbe; const root = P.root(); for (const rim of P.rim() ?? []) for (let e = rim; e; e = e.parentElement) { e.setAttribute("data-hp-unclip", ""); if (e === root) break; } });
    await page.waitForTimeout(80);
    const free = await shoot(page, clip);
    await page.evaluate(() => document.querySelectorAll("[data-hp-unclip]").forEach((e) => e.removeAttribute("data-hp-unclip")));
    await probeMode(page, null);
    const Ic = inkCoverage(clipped), If = inkCoverage(free);
    let inkC = 0, inkF = 0, beyond = 0;
    for (let y = 0; y < a.h; y++) for (let x = 0; x < a.w; x++) { const i = y * a.w + x; if (Ic[i] >= 26 / 255) inkC++; if (If[i] >= 26 / 255) { inkF++; if (x < l - 1 || x > r + 1 || y < t - 1 || y > b + 1) beyond++; } }
    return { inkClipped: inkC, inkFree: inkF, beyondBox: beyond, kept: inkF ? r2(inkC / inkF) : 0 };
}
/** H-5 fill: the ink that differs from progress 0 rises with the source's progress. */
async function fillRead(page) {
    const max = await page.evaluate(() => window.__scene?.scrollMax ? window.__scene.scrollMax() : document.documentElement.scrollHeight - innerHeight);
    const shots = [];
    for (const p of [0, 0.25, 0.5, 0.75, 1]) {
        await scrollSource(page, Math.round(p * max)); await page.waitForTimeout(150);
        const clip = await clipRect(page);
        await probeMode(page, "rim"); await page.waitForTimeout(60);
        shots.push(await shoot(page, clip));
        await probeMode(page, null);
    }
    await scrollSource(page, 0);
    const base = shots[0];
    const counts = shots.map((s) => { if (s.w !== base.w || s.h !== base.h) return -1; let n = 0; for (let i = 0; i < s.w * s.h; i++) { const d = Math.max(Math.abs(s.data[i * 4] - base.data[i * 4]), Math.abs(s.data[i * 4 + 1] - base.data[i * 4 + 1]), Math.abs(s.data[i * 4 + 2] - base.data[i * 4 + 2])); if (d >= 26) n++; } return n; });
    // non-decreasing, and strictly rising across the second half (a fill on a collapsed circle
    // can sit wholly under the plate's clip below about a quarter of progress)
    const tol = 0.02 * Math.max(...counts);   // 2 % of the fullest read: anti-aliasing at the clip edge
    let rises = counts[2] > 0 && counts[4] > counts[2]; for (let k = 1; k < counts.length; k++) if (counts[k] < counts[k - 1] - tol) rises = false;
    return { counts, rises, max };
}

const RUNGS = [
    ["rim", {}, "h·expanded"],
    ["rim", { collapse: "closed" }, "h·collapsed"],
    ["vrim", {}, "v·expanded"],
    ["vrim", { collapse: "closed" }, "v·collapsed"],
    ["rim", { source: "el" }, "h·expanded·el-source"],
];
async function judge(page, engine, name, tag, posture) {
    const r = await rimRead(page, "dock", `${out}/${engine}-${name}.png`);
    const w = await wholeRead(page);
    const f = await fillRead(page);
    const checks = { inside: r.ink > 0 && r.outside === 0, whole: w.beyondBox === 0 && w.kept >= WHOLE_FRAC, fill: f.rises };
    const failed = Object.entries(checks).filter(([, v]) => !v).map(([k]) => k);
    rep.add({ engine, cell: name + tag, pass: failed.length === 0, failed, posture, ink: r.ink, outside: r.outside, depthPx: r.depthPx, whole: w, fill: f,
        summary: `posture ${posture}; rim ink ${r.ink} device px, ${r.outside} outside the silhouette (depth ${r.depthPx} px); clip lifted: ${w.beyondBox} px beyond the plate box, the clip keeps ${Math.round(w.kept * 100)} % of its ink (bound ≥ ${WHOLE_FRAC * 100} %); fill vs progress 0 at 0/.25/.5/.75/1: ${f.counts.join("/")} (bound: never falls, > 0 at .5, rises .5 → 1)${failed.length ? "  ⟶ FAILED: " + failed.join(", ") : ""}` });
}

for (const engine of engines(args)) {
    const browser = await launch(engine);
    const tag = engineTag(target, engine);
    try {
        for (const [scene, query, name] of RUNGS) {
            await rep.guard(engine, [name + tag], async () => {
                const s = await openScene(browser, target, scene, { query });
                await waitRest(s.page, { quiet: 300, cap: 4000 });
                const has = await s.page.evaluate(() => ({ rim: !!window.__dockProbe.rim?.(), composed: !!window.__dockProbe.composedRim?.(), posture: window.__dockProbe.posture() }));
                if (!has.rim) {
                    let note = "";
                    if (has.composed) { const c = await rimRead(s.page, "composed", `${out}/${engine}-${name}-composed.png`); note = `; the consumer-composed ScrollProgressRim overlay (for the record): ${c.outside} device px outside the plate, ${c.depthPx} px deep on a ${c.plate.join("x")} plate`; }
                    rep.add({ engine, cell: name + tag, pass: false, absent: true, posture: has.posture, summary: `absent: the dock has no rim of its own (adapter rim() is null)${note}` });
                } else await judge(s.page, engine, name, tag, has.posture);
                await s.close();
            });
        }
        await rep.guard(engine, ["h·compact" + tag], async () => {
            const s = await openScene(browser, target, "compact");
            const has = await s.page.evaluate(() => ({ rim: !!window.__dockProbe.rim?.(), compact: !!window.__dockProbe.compact?.() }));
            if (!has.rim || !has.compact) rep.add({ engine, cell: "h·compact" + tag, pass: false, absent: true, summary: `absent: ${!has.compact ? "no compact rung" : ""}${!has.compact && !has.rim ? " and " : ""}${!has.rim ? "no dock rim" : ""}` });
            else {
                await scrollSource(s.page, 900); await s.page.waitForTimeout(100); await waitRest(s.page);
                const r = await rimRead(s.page, "dock", `${out}/${engine}-h-compact.png`);
                const w = await wholeRead(s.page);
                const checks = { inside: r.ink > 0 && r.outside === 0, whole: w.beyondBox === 0 && w.kept >= WHOLE_FRAC };
                const failed = Object.entries(checks).filter(([, v]) => !v).map(([k]) => k);
                rep.add({ engine, cell: "h·compact" + tag, pass: failed.length === 0, failed, ink: r.ink, outside: r.outside, whole: w, summary: `compact rung; rim ink ${r.ink}, ${r.outside} outside (depth ${r.depthPx} px); clip lifted: ${w.beyondBox} px beyond the plate box, kept ${Math.round(w.kept * 100)} % (the fill is read on the expanded rungs; a compact rung sits past the threshold)${failed.length ? "  ⟶ FAILED: " + failed.join(", ") : ""}` });
            }
            await s.close();
        });
    } finally {
        await browser.close();
    }
}
await target.close();
rep.finish(out);
