// W7 · SIDE-DOCK-EDGE (O-67, owner 2026-09-24: "the side docks, and the edges thereof,
// are not right"). Side, vertical and canvas docks share the top dock's one rim, radius
// and plate composite: every edge is whole in both themes at every DPR; a gutter
// separates the plate from the surface above; a reserved badge seat never overlaps a glyph.
//
//   node w7-edge.mjs --build <dir> | --fixture pass|<fault>  [--engine …] [--out <dir>]
//
// Scene `edge&kind=top|side|canvas` (canvas = a horizontal dock inset in a bordered panel;
// side = a vertical dock under a 56 px surface), theme light|dark, DPR 1|2|3.
//   whole    the plate painted in its own colours on a mid-grey page (probe "edge", backdrop
//            off): along the silhouette's inward normal (0-3 CSS px from the boundary pixel) the edge ink against the
//            plate's interior colour, binned into 48 bins around the perimeter; every bin's median
//            ≥ 0.25 × the median over bins, and that median ≥ 4/255 (an edge exists)
//   same     side and canvas: the edge's median within [0.67, 1.5] × the top dock's in the same
//            theme and DPR (one rim for the family)
//   radius   the W1 stadium read (≤ 1 px from cross/2)
//   gutter   side and canvas: the silhouette starts ≥ 8 px from the surface above it (one seat
//            gap; the harness's floor until the owner names a token)
//   badge    side: the adapter's badge() is the dock's reserved badge seat; its ink and the
//            seat glyph's ink share 0 pixels. badge() null → RED by absence (a consumer-composed
//            badge, where the scene has one, is measured for the record)
// Record-only: canvas-clipped (the panel clips its children: the O-63 / O-61 R-1 family); it
// shows whether an edge loss is the consumer's clip, and gates nothing.
import fs from "node:fs";
import { parseArgs, engines, openTarget, launch, openScene, makeReport, outDir, engineTag, probeMode, shoot, magentaCoverage, inkCoverage, cornerRead, extentNow, waitRest, r2 } from "./lib.mjs";

export const WHOLE_RATIO = 0.25, EDGE_FLOOR = 4 / 255, SAME = [0.67, 1.5], GUTTER_PX = 8;
const args = parseArgs();
const target = await openTarget(args);
const out = outDir(args, "W7");
const rep = makeReport("W7", target);

async function edgeRead(page) {
    const e = await extentNow(page);
    const clip = { x: Math.max(0, e.l - 12), y: Math.max(0, e.t - 12), width: e.w + 24, height: e.h + 24 };
    await probeMode(page, "plate"); await page.waitForTimeout(80);
    const a = await shoot(page, clip);
    await probeMode(page, "edge"); await page.waitForTimeout(80);
    const b = await shoot(page, clip);
    await probeMode(page, null);
    const S = magentaCoverage(a), w = a.w, h = a.h, dsf = a.dsf;
    const corner = cornerRead(S, w, h, dsf, e.axis);
    let L = w, T = h, R = -1, B = -1; for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (S[y * w + x] >= 0.5) { if (x < L) L = x; if (x > R) R = x; if (y < T) T = y; if (y > B) B = y; }
    if (R < 0) return { empty: true };
    const W = R - L + 1, H = B - T + 1, cx = (L + R + 1) / 2, cy = (T + B + 1) / 2;
    const horiz = W >= H, r = (horiz ? H : W) / 2;
    const seg = horiz ? [[L + r, cy], [R + 1 - r, cy]] : [[cx, T + r], [cx, B + 1 - r]];
    const px = (x, y) => { const xi = Math.min(w - 1, Math.max(0, Math.floor(x))), yi = Math.min(h - 1, Math.max(0, Math.floor(y))); const i = (yi * w + xi) * 4; return [b.data[i], b.data[i + 1], b.data[i + 2]]; };
    const interior = []; for (let k = 0; k <= 20; k++) { const t = k / 20; interior.push(px(seg[0][0] + (seg[1][0] - seg[0][0]) * t, seg[0][1] + (seg[1][1] - seg[0][1]) * t)); }
    const med = (arr) => { const s = [...arr].sort((p, q) => p - q); return s[Math.floor(s.length / 2)]; };
    const ic = [0, 1, 2].map((c) => med(interior.map((p) => p[c])));
    const bins = Array.from({ length: 48 }, () => []);
    for (let y = T; y <= B; y++) for (let x = L; x <= R; x++) {
        if (S[y * w + x] < 0.5) continue;
        const nb = [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => { const xx = x + dx, yy = y + dy; return xx < 0 || yy < 0 || xx >= w || yy >= h || S[yy * w + xx] < 0.5; });
        if (!nb) continue;
        const pxc = x + 0.5, pyc = y + 0.5;
        const [ax, ay] = seg[0], [bx, by] = seg[1];
        const t = Math.max(0, Math.min(1, ((pxc - ax) * (bx - ax) + (pyc - ay) * (by - ay)) / Math.max(1e-6, (bx - ax) ** 2 + (by - ay) ** 2)));
        const mx = ax + (bx - ax) * t, my = ay + (by - ay) * t;
        const d = Math.hypot(mx - pxc, my - pyc) || 1, ux = (mx - pxc) / d, uy = (my - pyc) / d;
        let ink = 0;
        for (let dd = 0.25; dd <= 3; dd += 0.5) { const q = px(pxc + ux * dd * dsf, pyc + uy * dd * dsf); ink = Math.max(ink, Math.max(...q.map((v, c) => Math.abs(v - ic[c]))) / 255); }
        const th = Math.atan2((pyc - cy) / (H / 2), (pxc - cx) / (W / 2));
        bins[Math.min(47, Math.floor(((th + Math.PI) / (2 * Math.PI)) * 48))].push(ink);
    }
    const vals = bins.filter((q) => q.length).map(med);
    const m = med(vals), mn = Math.min(...vals);
    const weakest = bins.findIndex((q) => q.length && med(q) === mn);
    return { corner, median: m, min: mn, weakestDeg: Math.round(weakest * 7.5 - 180), bins: vals.length, bbox: { t: clip.y + T / dsf, l: clip.x + L / dsf }, png: b.png };
}
async function badgeRead(page) {
    const info = await page.evaluate(() => { const P = window.__dockProbe; const b = P.badge?.() ?? null; const consumer = document.querySelector("[data-testid=badge]"); return { reserved: !!b, consumer: !!consumer }; });
    const overlap = async () => {
        const seatSel = "[data-testid=e1]";
        const clipBox = await page.evaluate((sel) => { const r = document.querySelector(sel).getBoundingClientRect(); return { x: r.x - 6, y: r.y - 6, width: r.width + 12, height: r.height + 12 }; }, seatSel);
        await page.evaluate(() => { const P = window.__dockProbe; const b = P.badge?.() ?? document.querySelector("[data-testid=badge]"); b?.setAttribute("data-hp-badge", ""); });
        await probeMode(page, "els", { els: ["[data-hp-badge]"] }); await page.waitForTimeout(60);
        const A = inkCoverage(await shoot(page, clipBox));
        await probeMode(page, "els", { els: ["[data-testid=e1] svg"] }); await page.waitForTimeout(60);
        const Bimg = await shoot(page, clipBox); const B = inkCoverage(Bimg);
        await probeMode(page, null);
        let both = 0, a = 0, b = 0; for (let i = 0; i < A.length; i++) { const x = A[i] >= 26 / 255, y = B[i] >= 26 / 255; if (x) a++; if (y) b++; if (x && y) both++; }
        return { both, badgeInk: a, glyphInk: b };
    };
    if (!info.reserved && !info.consumer) return { reserved: false, why: "absent: no badge seat, and the scene composes none" };
    const o = await overlap();
    return { reserved: info.reserved, ...o };
}

const KINDS = ["top", "side", "canvas"], THEMES = ["light", "dark"], DPRS = [1, 2, 3];
for (const engine of engines(args)) {
    const browser = await launch(engine);
    const tag = engineTag(target, engine);
    try {
        const topMedian = {};
        for (const theme of THEMES) for (const dpr of DPRS) for (const kind of KINDS) {
            const name = `${kind}·${theme}·dpr${dpr}`;
            await rep.guard(engine, [name + tag], async () => {
                const s = await openScene(browser, target, "edge", { query: { kind }, theme, ctx: { deviceScaleFactor: dpr } });
                await waitRest(s.page, { quiet: 300, cap: 4000 });
                const r = await edgeRead(s.page);
                if (r.empty) { rep.add({ engine, cell: name + tag, pass: false, summary: "no plate painted" }); await s.close(); return; }
                fs.writeFileSync(`${out}/${engine}-${name}.png`, r.png);
                if (kind === "top") topMedian[`${theme}${dpr}`] = r.median;
                const checks = { whole: r.median >= EDGE_FLOOR && r.min >= WHOLE_RATIO * r.median, radius: r.corner.maxErr <= 1.0 };
                const notes = [`edge median ${r2(r.median * 255)}/255, weakest bin ${r2(r.min * 255)}/255 at ${r.weakestDeg}° (bound ≥ ${WHOLE_RATIO} × median, median ≥ 4/255) over ${r.bins} bins`, `corner ${r.corner.maxErr} px (bound 1)`];
                let badge = null, gutter = null;
                if (kind !== "top") {
                    if (topMedian[`${theme}${dpr}`] == null) { // top cell skipped by --cells: read the reference on its own
                        const t = await openScene(browser, target, "edge", { query: { kind: "top" }, theme, ctx: { deviceScaleFactor: dpr } });
                        await waitRest(t.page, { quiet: 300, cap: 4000 }); const tr = await edgeRead(t.page); if (!tr.empty) topMedian[`${theme}${dpr}`] = tr.median; await t.close();
                    }
                    const ref = topMedian[`${theme}${dpr}`];
                    const ratio = ref ? r.median / ref : null;
                    checks.same = ratio != null && ratio >= SAME[0] && ratio <= SAME[1];
                    notes.push(`edge vs the top dock ×${ratio != null ? r2(ratio) : "n/a"} (bound ${SAME.join("-")})`);
                    const sa = await s.page.evaluate(() => { const el = document.querySelector("[data-testid=surface-above]"); if (!el) return null; const q = el.getBoundingClientRect(); return el.dataset.edge === "top" ? q.top + 1 : q.bottom; });
                    gutter = sa == null ? null : r.bbox.t - sa;
                    checks.gutter = gutter != null && gutter >= GUTTER_PX - 0.5;
                    notes.push(`gutter ${gutter != null ? r2(gutter) + " px" : "no surface"} (bound ≥ ${GUTTER_PX})`);
                }
                if (kind === "side") {
                    badge = await badgeRead(s.page);
                    checks.badge = badge.reserved && badge.both === 0 && badge.badgeInk > 0;
                    notes.push(badge.reserved ? `badge ink ${badge.badgeInk}, glyph ink ${badge.glyphInk}, shared ${badge.both} px (bound 0)` : `badge ${badge.why ?? `absent: no reserved badge seat (adapter badge() is null); the consumer-composed badge shares ${badge.both} px with the glyph (for the record)`}`);
                }
                const failed = Object.entries(checks).filter(([, v]) => !v).map(([k]) => k);
                rep.add({ engine, cell: name + tag, pass: failed.length === 0, failed, edge: { median: r2(r.median * 255), min: r2(r.min * 255), weakestDeg: r.weakestDeg }, corner: r.corner.maxErr, gutter: gutter != null ? r2(gutter) : null, badge, summary: notes.join("; ") + (failed.length ? "  ⟶ FAILED: " + failed.join(", ") : "") });
                await s.close();
            });
        }
        for (const theme of THEMES) {
            const name = `canvas-clipped·${theme}·dpr2`;
            await rep.guard(engine, [name + tag], async () => {
                const s = await openScene(browser, target, "edge", { query: { kind: "canvas", clip: "1" }, theme });
                await waitRest(s.page, { quiet: 300, cap: 4000 });
                const r = await edgeRead(s.page);
                rep.add({ engine, cell: name + tag, pass: true, record: true, edge: r.empty ? null : { median: r2(r.median * 255), min: r2(r.min * 255), weakestDeg: r.weakestDeg }, summary: r.empty ? "no plate painted" : `RECORD (the panel clips its children, the O-63 / O-61 R-1 family): edge median ${r2(r.median * 255)}/255, weakest ${r2(r.min * 255)}/255 at ${r.weakestDeg}°` });
                await s.close();
            });
        }
    } finally {
        await browser.close();
    }
}
await target.close();
rep.finish(out);
