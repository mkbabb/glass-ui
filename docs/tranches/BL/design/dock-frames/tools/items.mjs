#!/usr/bin/env node
// items.mjs [--md]: the five O-420 items per cell, from record/summary.json; writes
// record/items.json and prints one table per item (markdown with --md).
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const HERE = dirname(fileURLToPath(import.meta.url));
const S = JSON.parse(readFileSync(join(HERE, "../record/summary.json"), "utf8"));
const md = process.argv.includes("--md");
const n = (v, d = 1) => (v == null || Number.isNaN(v) ? "–" : typeof v === "number" ? String(+v.toFixed(d)) : String(v));
const max = (a) => (a.length ? Math.max(...a) : null);
const min = (a) => (a.length ? Math.min(...a) : null);
const isOpen = (s) => /^open/.test(s.route);
const isClose = (s) => /^close|^scroll-back/.test(s.route);
// A morph segment: the plate's width travelled more than 40 px.
const morph = (s) => s.plate?.w && Math.abs(s.plate.w[1] - s.plate.w[0]) > 40;
const out = {};
for (const [k, c] of Object.entries(S)) {
    const segs = c.segments;
    const opens = segs.filter((s) => morph(s) && s.plate.w[1] > s.plate.w[0]);
    const closes = segs.filter((s) => morph(s) && s.plate.w[1] < s.plate.w[0]);
    // the trailing settle segment after a morph: a short segment starting > 250 ms later, same route
    const settles = segs.filter((s, i) => i > 0 && !morph(s) && s.route === segs[i - 1].route && morph(segs[i - 1]));
    const closeSettles = settles.filter((s, i) => {
        const prev = segs[segs.indexOf(s) - 1];
        return prev.plate.w[1] < prev.plate.w[0];
    });
    const openSettles = settles.filter((s) => !closeSettles.includes(s));
    const pick = (arr, f) => arr.map(f).filter((v) => Number.isFinite(v));
    const row = {
        cell: k,
        engine: c.meta.engine,
        frameMs: c.meta.frameMedianMs,
        routesOpen: [...new Set(opens.map((s) => s.route))],
        routesClose: [...new Set(closes.map((s) => s.route))],
        stillRoutes: c.meta.stillRoutes,
        // item 2: drift
        openCentreRange: max(pick(opens, (s) => s.plate.centreRange)),
        closeCentreRange: max(pick(closes, (s) => s.plate.centreRange)),
        openLeftRange: max(pick(opens, (s) => s.plate.leftRange)),
        openRightRange: max(pick(opens, (s) => s.plate.rightRange)),
        maxCentreStep: max(pick([...opens, ...closes], (s) => Math.abs(s.plate.cxSteps?.biggest ?? 0))),
        topRange: max(pick([...opens, ...closes], (s) => s.plate.topRange)),
        openSeat0Drift: max(pick(opens, (s) => s.firstSeatDrift.range)),
        closeSeat0Drift: max(pick(closes, (s) => s.firstSeatDrift.range)),
        openLastSeatDrift: max(pick(opens, (s) => s.lastSeatDrift.range)),
        closeSealDrift: max(pick(closes, (s) => s.sealDrift.range)),
        openSealDrift: max(pick(opens, (s) => s.sealDrift.range)),
        // item 1: first and last frames
        openFirst: opens.map((s) => [s.plate.wSteps?.first, s.plate.wSteps?.firstDt, s.plate.wSteps?.firstVsNext3, s.plate.wSteps?.second, s.plate.wSteps?.secondDt]),
        closeFirst: closes.map((s) => [s.plate.wSteps?.first, s.plate.wSteps?.firstDt, s.plate.wSteps?.firstVsNext3, s.plate.wSteps?.second, s.plate.wSteps?.secondDt]),
        openLongFirst3: opens.map((s) => (s.longFrames || []).filter((g) => g.k <= 3).map((g) => g.ms)),
        closeLongFirst3: closes.map((s) => (s.longFrames || []).filter((g) => g.k <= 3).map((g) => g.ms)),
        openRunAppears: max(pick(opens, (s) => (s.runOp.k <= 2 ? s.runOp.maxStep : 0))),
        closeSealAppears: max(pick(closes, (s) => (s.summaryOp.k <= 2 ? s.summaryOp.maxStep : 0))),
        openLast: opens.map((s) => [s.plate.wSteps?.last, s.plate.wSteps?.lastVsPrev3, s.plate.wSteps?.against?.length ? s.plate.wSteps.against : null]),
        closeLast: closes.map((s) => [s.plate.wSteps?.last, s.plate.wSteps?.lastVsPrev3, s.plate.wSteps?.against?.length ? s.plate.wSteps.against : null]),
        openDur: pick(opens, (s) => s.durationMs),
        closeDur: pick(closes, (s) => s.durationMs),
        // item 4: the collapse's last frames and the settle frame after them
        closeSettle: closeSettles.map((s) => ({ afterMs: s.latencyMs, plateDx: s.settle?.plateDx, plateDw: s.settle?.plateDw, sealDcx: s.settle?.sealDcx, sealOp: s.settle?.sealOp, seat0Dx: s.settle?.seat0Dx, runOp: s.settle?.runOp, layout: s.layoutWidth })),
        // the dock root's layout width through each open and close
        layoutOpen: opens.map((s) => s.layoutWidth),
        layoutClose: closes.map((s) => s.layoutWidth),
        closeTail: closes.map((s) => ({ lastSteps: (s.plateTail || []).slice(-6).map((r) => r.w), lastX: (s.plateTail || []).slice(-6).map((r) => r.x), lastSeal: (s.plateTail || []).slice(-6).map((r) => r.sealCx), lastT: (s.plateTail || []).slice(-6).map((r) => r.t), quiet: s.settle?.quietBeforeMs, sealDriftClose: s.sealDrift.range })),
        openSettle: openSettles.map((s) => ({ afterMs: s.latencyMs, plateDw: s.settle?.plateDw, seat0Dx: s.settle?.seat0Dx })),
        // item 3: theme seat on hover and press
        themeHover: segs.filter((s) => /^theme-hover/.test(s.route)).map((s) => ({ route: s.route, dx: s.theme?.maxD.x, dy: s.theme?.maxD.y, dw: s.theme?.maxD.w, iconDcx: s.theme?.icon?.maxDcx, iconDw: s.theme?.icon?.maxDw, plateDx: s.theme?.plateMaxD?.x, others: s.theme?.otherSeatsMaxDx, tfs: s.theme?.transforms?.length })),
        themePress: segs.filter((s) => /^theme-press/.test(s.route)).map((s) => ({ route: s.route, dx: s.theme?.maxD.x, dy: s.theme?.maxD.y, dw: s.theme?.maxD.w, endDx: s.theme?.end.dx, step: s.theme?.maxStepX, frames: s.theme?.framesToMove, at: s.theme?.movedAtMsAfterMark, iconDcx: s.theme?.icon?.maxDcx, iconDw: s.theme?.icon?.maxDw, plateDx: s.theme?.plateMaxD?.x, plateDw: s.theme?.plateMaxD?.w, others: s.theme?.otherSeatsMaxDx, html: s.theme?.html, pressed: s.theme?.pressed })),
        // item 5: tooltips
        tooltips: segs.filter((s) => s.tooltips).flatMap((s) => s.tooltips.map((t) => ({ route: s.route, ...t }))).filter((t, i, a) => a.findIndex((u) => JSON.stringify(u.box) === JSON.stringify(t.box) && u.route === t.route) === i),
        theme: c.meta.theme,
        dock: c.meta.dock,
        notDone: c.meta.stepsNotDone,
    };
    out[k] = row;
}
writeFileSync(join(HERE, "../record/items.json"), JSON.stringify(out, null, 1));
if (!md) {
    for (const [k, r] of Object.entries(out)) console.log(k, JSON.stringify(r));
}
