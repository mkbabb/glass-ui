#!/usr/bin/env node
// report.mjs [regex]: one line per motion segment per cell, from record/summary.json.
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const HERE = dirname(fileURLToPath(import.meta.url));
const S = JSON.parse(readFileSync(join(HERE, "../record/summary.json"), "utf8"));
const f = process.argv[2] ? new RegExp(process.argv[2]) : null;
const n = (v) => (v == null ? "-" : typeof v === "number" ? +v.toFixed(1) : v);
for (const [k, c] of Object.entries(S)) {
    if (f && !f.test(k)) continue;
    const m = c.meta;
    console.log(`\n## ${k}  ${m.frameMedianMs} ms/frame, ${m.framesOver25ms} >25ms, dock "${m.dock?.label ?? ""}" ${JSON.stringify(m.dock?.box)} theme ${m.theme ? `"${m.theme.label}"/"${m.theme.title}"` : "none"} rest ${m.rest} not-done ${JSON.stringify(m.stepsNotDone)} still ${m.stillRoutes.join(",")}`);
    for (const s of c.segments) {
        const p = s.plate,
            w = p.wSteps || {};
        let l = `  ${s.route.padEnd(16)} lat ${n(s.latencyMs)} dur ${n(s.durationMs)} | w ${n(p.w[0])}->${n(p.w[1])} L/R/C ${n(p.leftRange)}/${n(p.rightRange)}/${n(p.centreRange)} top ${n(p.topRange)}`;
        if (p.wSteps) l += ` | first ${n(w.first)}@${n(w.firstDt)}ms x${n(w.firstVsNext3)} v${n(w.firstVelVsNext3)} 2nd ${n(w.second)}@${n(w.secondDt)} | last ${n(w.last)} x${n(w.lastVsPrev3)} gap ${n(w.lastGapMs)} | big ${n(w.biggest)}@${w.biggest != null ? w.biggestAt : "-"} against ${JSON.stringify(w.against)}`;
        if (s.longFrames?.length) l += ` | long ${s.longFrames.map((g) => `${g.ms}@k${g.k}`).join(",")}`;
        l += ` | sumOp ${n(s.summaryOp.from)}->${n(s.summaryOp.to)} max1 ${n(s.summaryOp.maxStep)}@k${s.summaryOp.k} runOp ${n(s.runOp.from)}->${n(s.runOp.to)} max1 ${n(s.runOp.maxStep)}@k${s.runOp.k}`;
        l += ` | seal drift ${n(s.sealDrift.range)} seat0 drift ${n(s.firstSeatDrift.range)} lastSeatR drift ${n(s.lastSeatDrift.range)}`;
        if (s.settle) l += ` | settle quiet ${n(s.settle.quietBeforeMs)} plate dx ${n(s.settle.plateDx)} dw ${n(s.settle.plateDw)} seal dcx ${n(s.settle.sealDcx)} (op ${n(s.settle.sealOp)}) seat0 dx ${n(s.settle.seat0Dx)} (run ${n(s.settle.runOp)})`;
        if (s.theme && (s.route.startsWith("theme") || s.theme.maxD.x > 0.5)) {
            const t = s.theme;
            l += ` | THEME d x${n(t.maxD.x)} y${n(t.maxD.y)} w${n(t.maxD.w)} h${n(t.maxD.h)} step ${n(t.maxStepX)} end ${n(t.end.dx)},${n(t.end.dy)} icon dcx ${n(t.icon?.maxDcx)} dcy ${n(t.icon?.maxDcy)} dw ${n(t.icon?.maxDw)} plate dx ${n(t.plateMaxD?.x)} dw ${n(t.plateMaxD?.w)} others ${n(t.otherSeatsMaxDx)} moved@ ${n(t.movedAtMsAfterMark)} in ${n(t.framesToMove)}f pressed ${t.pressed.join("/")} tf ${t.transforms.length}`;
        }
        if (s.tooltip) l += ` | TIP ${JSON.stringify(s.tooltip)}`;
        console.log(l);
    }
}
