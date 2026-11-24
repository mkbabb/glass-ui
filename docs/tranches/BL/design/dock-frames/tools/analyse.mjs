#!/usr/bin/env node
// analyse.mjs <rows.json>... --out <record dir>
// Reads the probe's rows (one per rendered frame, sampler.js), splits each series into
// motion segments (runs of frames in which any tracked box, transform or opacity of the
// dock changed, separated by >= 250 ms of stillness), names each segment by the route
// mark that started it, and writes, per cell, every segment's per-frame series and the
// numbers the five O-420 items ask for. <out>/<cell>.json per cell, <out>/summary.json.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { basename, join } from "node:path";

const args = process.argv.slice(2);
const outI = args.indexOf("--out");
const OUT = outI >= 0 ? args[outI + 1] : "record";
const files = args.filter((a, i) => a.endsWith(".rows.json") && i !== outI + 1);
mkdirSync(OUT, { recursive: true });

const r2 = (v) => (Number.isFinite(v) ? +v.toFixed(2) : null);
const num = (v) => (v == null ? NaN : typeof v === "number" ? v : parseFloat(v));
const B = (o) => (o && o.vis !== 0 ? { x: o.x, y: o.y, w: o.w, h: o.h, r: o.x + o.w, cx: o.x + o.w / 2, cy: o.y + o.h / 2 } : null);
const range = (a) => {
    const f = a.filter(Number.isFinite);
    return f.length ? Math.max(...f) - Math.min(...f) : null;
};
const seatKeys = (row) => Object.keys(row.el).filter((k) => k.startsWith("seat#")).sort((a, b) => +a.split("#")[1] - +b.split("#")[1]);
const tipKeys = (row) => Object.keys(row.el).filter((k) => k.startsWith("tip#") && row.el[k]);
const popKeys = (row) => Object.keys(row.el).filter((k) => k.startsWith("popper#") && row.el[k]);
const eop = (o) => (o ? num(o.eop ?? o.op) : NaN);

const GEOM = (row) => {
    const e = row.el;
    const parts = [];
    for (const k of ["dock", "plate", "summary", "run", "theme", "icon"]) {
        const o = e[k];
        parts.push(o ? [o.x, o.y, o.w, o.h, o.tf, o.sc, o.tr, o.clip, o.eop ?? o.op] : null);
    }
    for (const k of seatKeys(row)) parts.push(e[k] ? [e[k].x, e[k].y, e[k].w, e[k].h, e[k].tf, e[k].sc] : null);
    for (const k of tipKeys(row)) parts.push([k, e[k].x, e[k].y, e[k].w, e[k].h, e[k].op]);
    for (const k of popKeys(row)) parts.push([k, e[k].x, e[k].y, e[k].w, e[k].h, e[k].op]);
    return JSON.stringify(parts);
};

// One channel's steps over a segment, with the frame interval of each step, read as
// px per ms so a dropped frame is not read as a jump.
function stepRead(vals, ts) {
    const st = [];
    for (let k = 1; k < vals.length; k++) {
        const d = vals[k] - vals[k - 1];
        if (Number.isFinite(d)) st.push({ d, dt: ts[k] - ts[k - 1], k });
    }
    const mv = st.filter((o) => Math.abs(o.d) > 0.05);
    if (!mv.length) return null;
    const total = vals[vals.length - 1] - vals[0];
    const med = (a) => {
        const b = a.map(Math.abs).sort((x, y) => x - y);
        return b.length ? b[Math.floor(b.length / 2)] : NaN;
    };
    const v = (o) => o.d / o.dt;
    const first = mv[0],
        last = mv[mv.length - 1];
    let big = mv[0];
    for (const o of mv) if (Math.abs(o.d) > Math.abs(big.d)) big = o;
    return {
        travel: r2(total),
        steps: mv.length,
        first: r2(first.d),
        firstDt: r2(first.dt),
        firstVsNext3: r2(Math.abs(first.d) / med(mv.slice(1, 4).map((o) => o.d))),
        firstVelVsNext3: r2(Math.abs(v(first)) / med(mv.slice(1, 4).map(v))),
        second: mv[1] ? r2(mv[1].d) : null,
        secondDt: mv[1] ? r2(mv[1].dt) : null,
        last: r2(last.d),
        lastDt: r2(last.dt),
        lastVsPrev3: r2(Math.abs(last.d) / med(mv.slice(-4, -1).map((o) => o.d))),
        lastGapMs: mv.length > 1 ? r2(ts[last.k] - ts[mv[mv.length - 2].k]) : null, // time from the step before the last to the last
        biggest: r2(big.d),
        biggestAt: big === first ? "first" : big === last ? "last" : `${mv.indexOf(big) + 1}/${mv.length}`,
        against: mv.filter((o) => Math.sign(o.d) !== Math.sign(total) && Math.abs(o.d) > 0.3).map((o) => r2(o.d)),
    };
}

function frameRow(row, seats, prevT) {
    const e = row.el;
    const b = (o) => (o ? [r2(o.x), r2(o.y), r2(o.w), r2(o.h)] : null);
    const o = {
        i: row.i,
        t: r2(row.t),
        dt: prevT == null ? null : r2(row.t - prevT),
        dock: b(e.dock),
        dockSc: e.dock && e.dock.sc !== "none" ? e.dock.sc : undefined,
        dockCssW: e.dock?.["s:width"],
        dockTf: e.dock && e.dock.tf !== "none" ? e.dock.tf : undefined,
        dockCls: e.dock?.["a:class"],
        morphing: e.dock?.["a:data-morphing"] ?? undefined,
        dockT: e.plate?.["p:--dock-t"] || undefined,
        morphT: e.dock?.["p:--dock-morph-t"] || undefined,
        plate: b(e.plate),
        plateTf: e.plate && (e.plate.tf !== "none" || e.plate.sc !== "none") ? `${e.plate.tf}|${e.plate.sc}` : undefined,
        plateClip: e.plate && e.plate.clip !== "none" ? e.plate.clip : undefined,
        summary: b(e.summary),
        sumOp: r2(eop(e.summary)),
        run: b(e.run),
        runOp: r2(eop(e.run)),
        seats: seats.map((k) => b(e[k])),
        seatSc: seats.map((k) => (e[k] && e[k].sc !== "none" && e[k].sc !== "1" ? e[k].sc : e[k] && e[k].tf !== "none" ? e[k].tf : null)),
        theme: b(e.theme),
        themeTf: e.theme ? `${e.theme.tf}|${e.theme.sc}|${e.theme.tr}` : undefined,
        themePressed: e.theme?.["a:aria-pressed"] ?? undefined,
        themeTitle: e.theme?.["a:title"] ?? undefined,
        icon: b(e.icon),
        html: e.html?.["a:class"] ?? undefined,
    };
    const tips = tipKeys(row);
    if (tips.length) o.tips = tips.map((k) => ({ box: b(e[k]), op: e[k].op, side: e[k]["a:data-side"] }));
    const pops = popKeys(row);
    if (pops.length) o.poppers = pops.map((k) => ({ box: b(e[k]), op: e[k].op }));
    if (row.marks) o.marks = row.marks;
    return o;
}

function analyseSegment(rows, s, e, seats, label, markRow) {
    const a = Math.max(0, s - 1); // the frame before the first change
    const seg = rows.slice(a, e + 1);
    const ts = seg.map((r) => r.t);
    const res = { route: label.name, markRow: markRow, from: rows[a].i, to: rows[e].i, latencyMs: r2(rows[a].t - rows[markRow].t), durationMs: r2(rows[e].t - rows[a].t) };
    const ch = (k, f) => seg.map((r) => {
        const b = B(r.el[k]);
        return b ? f(b) : NaN;
    });
    const sumOp = seg.map((r) => eop(r.el.summary));
    const runOp = seg.map((r) => eop(r.el.run));
    // The morph axis: a vertical dock grows in height. On that axis x/w/cx read y/h/cy,
    // and "top" reads the cross axis (x).
    const hx = ch("plate", (q) => q.w),
        hy = ch("plate", (q) => q.h);
    const vertical = (range(hy) ?? 0) > (range(hx) ?? 0) + 1;
    res.axis = vertical ? "vertical" : "horizontal";
    const P = vertical
        ? { x: ch("plate", (q) => q.y), r: ch("plate", (q) => q.y + q.h), cx: ch("plate", (q) => q.cy), w: hy, y: ch("plate", (q) => q.x) }
        : { x: ch("plate", (q) => q.x), r: ch("plate", (q) => q.r), cx: ch("plate", (q) => q.cx), w: hx, y: ch("plate", (q) => q.y) };
    const first = (a) => a.find(Number.isFinite);
    const lastv = (a) => [...a].reverse().find(Number.isFinite);
    res.plate = {
        w: [r2(first(P.w)), r2(lastv(P.w))],
        leftRange: r2(range(P.x)),
        rightRange: r2(range(P.r)),
        centreRange: r2(range(P.cx)),
        centre: [r2(first(P.cx)), r2(lastv(P.cx))],
        topRange: r2(range(P.y)),
        wSteps: stepRead(P.w, ts),
        cxSteps: stepRead(P.cx, ts),
    };
    // long frames in the segment (a gap over 25 ms between rendered frames)
    const gaps = [];
    for (let k = 1; k < seg.length; k++) if (ts[k] - ts[k - 1] > 25) gaps.push({ at: seg[k].i, k, ms: r2(ts[k] - ts[k - 1]) });
    res.longFrames = gaps;
    // the dock root's layout width (computed width, before transforms): how it changes
    // in the page's flow, and in how many frames
    const cw = seg.map((r) => parseFloat(r.el.dock?.["s:width"]));
    let cwSteps = 0,
        cwBig = 0;
    for (let k = 1; k < cw.length; k++) {
        const dd = Math.abs(cw[k] - cw[k - 1]);
        if (dd > 0.05) cwSteps++;
        cwBig = Math.max(cwBig, Number.isFinite(dd) ? dd : 0);
    }
    res.layoutWidth = { from: r2(cw[0]), to: r2(cw[cw.length - 1]), changes: cwSteps, biggestStep: r2(cwBig) };
    // the faces: did one appear or leave whole in one frame?

    const oneFrame = (op) => {
        let m = 0,
            at = -1;
        for (let k = 1; k < op.length; k++) {
            const d = Math.abs(op[k] - op[k - 1]);
            if (Number.isFinite(d) && d > m) {
                m = d;
                at = k;
            }
        }
        return { maxStep: r2(m), atFrame: at >= 0 ? seg[at].i : null, k: at, from: r2(op[0]), to: r2(op[op.length - 1]) };
    };
    res.summaryOp = oneFrame(sumOp);
    res.runOp = oneFrame(runOp);
    // the seal (the collapsed face) while it can be seen, and the first seat while the run can
    const ctr = (o) => (vertical ? o.y + o.h / 2 : o.x + o.w / 2);
    const sealX = seg.map((r, k) => (sumOp[k] > 0.02 && r.el.summary ? ctr(r.el.summary) : NaN));
    res.sealDrift = { range: r2(range(sealX)), steps: stepRead(sealX, ts) };
    // the plate's last moving frames: width and left edge, with the frame time
    const moving = [];
    for (let k = 1; k < seg.length; k++) if (Math.abs(P.w[k] - P.w[k - 1]) > 0.01 || Math.abs(P.x[k] - P.x[k - 1]) > 0.01) moving.push(k);
    res.plateTail = moving.slice(-7).map((k) => ({ i: seg[k].i, t: r2(ts[k] - ts[0]), w: r2(P.w[k]), x: r2(P.x[k]), sealCx: sumOp[k] > 0.02 && seg[k].el.summary ? r2(sealX[k]) : null }));
    const seat0 = seats[0];
    // seat centres (a seat's own press or entry scale moves its box edge, not its centre)
    const seatX = seg.map((r, k) => (runOp[k] > 0.02 && r.el[seat0] ? ctr(r.el[seat0]) : NaN));
    res.firstSeatDrift = { seat: seat0, range: r2(range(seatX)), steps: stepRead(seatX, ts) };
    const lastSeat = seats[seats.length - 1];
    const lseatX = seg.map((r, k) => (runOp[k] > 0.02 && r.el[lastSeat] ? ctr(r.el[lastSeat]) : NaN));
    res.lastSeatDrift = { seat: lastSeat, range: r2(range(lseatX)), steps: stepRead(lseatX, ts) };
    // the settle frame: what changes in the segment's last frame, and how long after the
    // plate last moved visibly (> 0.05 px)
    const L = seg.length - 1;
    if (L >= 1) {
        const pr = seg[L - 1].el,
            cu = seg[L].el;
        const d = (k, f) => (pr[k] && cu[k] ? r2(f(cu[k]) - f(pr[k])) : null);
        let lastVisible = -1;
        for (let k = L - 1; k >= 1; k--) {
            if (Math.abs(P.w[k] - P.w[k - 1]) > 0.05 || Math.abs(P.x[k] - P.x[k - 1]) > 0.05) {
                lastVisible = k;
                break;
            }
        }
        const axisPos = (o) => (vertical ? o.y : o.x);
        const axisLen = (o) => (vertical ? o.h : o.w);
        res.settle = {
            frame: seg[L].i,
            quietBeforeMs: lastVisible >= 0 ? r2(ts[L] - ts[lastVisible]) : null,
            plateDx: d("plate", axisPos),
            plateDw: d("plate", axisLen),
            sealDcx: sumOp[L] > 0.02 ? d("summary", ctr) : null,
            sealOp: r2(sumOp[L]),
            runOp: r2(runOp[L]),
            seat0Dx: d(seat0, axisPos),
            dockSc: [pr.dock?.sc, cu.dock?.sc],
            morphing: [pr.dock?.["a:data-morphing"] ?? null, cu.dock?.["a:data-morphing"] ?? null],
        };
    }
    // theme seat against the frame before the segment
    const t0 = B(rows[a].el.theme);
    if (t0) {
        const tb = seg.map((r) => B(r.el.theme)).filter(Boolean);
        const i0 = B(rows[a].el.icon);
        const ib = seg.map((r) => B(r.el.icon)).filter(Boolean);
        const dev = (arr, base, f) => r2(Math.max(0, ...arr.map((q) => Math.abs(f(q) - f(base)))));
        const step1 = (arr, f) => {
            let m = 0;
            for (let k = 1; k < arr.length; k++) m = Math.max(m, Math.abs(f(arr[k]) - f(arr[k - 1])));
            return r2(m);
        };
        res.theme = {
            rest: [r2(t0.x), r2(t0.y), r2(t0.w), r2(t0.h)],
            maxD: { x: dev(tb, t0, (q) => q.x), y: dev(tb, t0, (q) => q.y), w: dev(tb, t0, (q) => q.w), h: dev(tb, t0, (q) => q.h), cx: dev(tb, t0, (q) => q.cx) },
            maxStepX: step1(tb, (q) => q.x),
            end: { dx: r2(tb[tb.length - 1].x - t0.x), dy: r2(tb[tb.length - 1].y - t0.y), dw: r2(tb[tb.length - 1].w - t0.w) },
            icon: i0 && ib.length ? { rest: [r2(i0.x), r2(i0.y), r2(i0.w), r2(i0.h)], maxDcx: dev(ib, i0, (q) => q.cx), maxDcy: dev(ib, i0, (q) => q.cy), maxDw: dev(ib, i0, (q) => q.w), endDcx: r2(ib[ib.length - 1].cx - i0.cx) } : null,
            transforms: [...new Set(seg.map((r) => (r.el.theme ? `${r.el.theme.tf}|${r.el.theme.sc}|${r.el.theme.tr}` : "")))].slice(0, 8),
            pressed: [...new Set(seg.map((r) => r.el.theme?.["a:aria-pressed"]))],
            title: [...new Set(seg.map((r) => r.el.theme?.["a:title"]))],
            html: [...new Set(seg.map((r) => r.el.html?.["a:class"] ?? ""))],
        };
        const p0 = B(rows[a].el.plate);
        res.theme.plateMaxD = p0 ? { x: dev(seg.map((r) => B(r.el.plate)).filter(Boolean), p0, (q) => q.x), w: dev(seg.map((r) => B(r.el.plate)).filter(Boolean), p0, (q) => q.w) } : null;
        const others = seats.filter((k) => {
            const s0 = rows[a].el[k];
            return s0 && !(Math.abs(s0.x - t0.x) < 0.5 && Math.abs(s0.y - t0.y) < 0.5);
        });
        res.theme.otherSeatsMaxDx = r2(Math.max(0, ...others.map((k) => Math.max(...seg.map((r) => (r.el[k] && rows[a].el[k] ? Math.abs(r.el[k].x - rows[a].el[k].x) : 0))))));
        // the frame the seats moved in, if they moved
        if (res.theme.maxD.x > 0.5) {
            const k = tb.findIndex((q) => Math.abs(q.x - t0.x) > 0.5);
            res.theme.movedAtMsAfterMark = r2(seg[k]?.t - rows[markRow].t);
            res.theme.framesToMove = tb.filter((q, j) => j > 0 && Math.abs(q.x - tb[j - 1].x) > 0.05).length;
        }
    }
    // tooltips in this segment: each visible popper (reka's [role=tooltip] is a 1 px
    // visually hidden copy; the visible box is its popper wrapper) against the seat it
    // stands beside: the seat whose centre along the dock's axis is nearest.
    const tipRows = seg.filter((r) => tipKeys(r).length);
    if (tipRows.length) {
        const r = tipRows[tipRows.length - 1];
        const vert = /\bvertical\b/.test(r.el.dock?.["a:class"] || "");
        const th = B(r.el.theme);
        const cands = seats.map((k) => ({ k, b: B(r.el[k]) })).filter((o) => o.b && o.b.w > 0);
        if (th) cands.push({ k: "theme", b: th });
        res.tooltips = popKeys(r).map((pk) => {
            const tb = B(r.el[pk]);
            let best = null;
            for (const c of cands) {
                const d = vert ? Math.abs(c.b.cy - tb.cy) : Math.abs(c.b.cx - tb.cx);
                if (!best || d < best.d) best = { ...c, d };
            }
            const isTheme = !!(best && th && Math.abs(best.b.x - th.x) < 0.5 && Math.abs(best.b.y - th.y) < 0.5);
            const gap = !best ? null : vert ? (tb.x >= best.b.r ? tb.x - best.b.r : best.b.x - (tb.x + tb.w)) : tb.y >= best.b.y + best.b.h ? tb.y - (best.b.y + best.b.h) : best.b.y - (tb.y + tb.h);
            return {
                box: [r2(tb.x), r2(tb.y), r2(tb.w), r2(tb.h)],
                seat: best ? [r2(best.b.x), r2(best.b.y), r2(best.b.w), r2(best.b.h)] : null,
                seatIsTheme: isTheme,
                offset: best ? r2(vert ? tb.cy - best.b.cy : tb.cx - best.b.cx) : null,
                gap: r2(gap),
                frames: tipRows.length,
            };
        });
        res.tooltip = res.tooltips.find((t) => t.seatIsTheme) || res.tooltips[0];
    }
    res.firstFrames = seg.slice(0, 5).map((r, k) => frameRow(r, seats, k ? seg[k - 1].t : null));
    res.lastFrames = seg.slice(-10).map((r, k, arr) => frameRow(r, seats, k ? arr[k - 1].t : seg[seg.length - 11]?.t));
    res.series = rows.slice(Math.max(0, s - 4), Math.min(rows.length, e + 3)).map((r, k, arr) => frameRow(r, seats, k ? arr[k - 1].t : null));
    return res;
}

const summary = existsSync(join(OUT, "summary.json")) ? JSON.parse(readFileSync(join(OUT, "summary.json"), "utf8")) : {};
for (const f of files) {
    const d = JSON.parse(readFileSync(f, "utf8"));
    const rows = d.rows;
    const seats = [...new Set(rows.flatMap((r) => seatKeys(r)))];
    const marks = [];
    rows.forEach((r, i) => (r.marks || []).forEach((m) => marks.push({ name: m, i })));
    // segments
    const changed = [];
    let prev = GEOM(rows[0]);
    for (let i = 1; i < rows.length; i++) {
        const g = GEOM(rows[i]);
        if (g !== prev) changed.push(i);
        prev = g;
    }
    const segs = [];
    for (const i of changed) {
        const cur = segs[segs.length - 1];
        if (cur && rows[i].t - rows[cur.e].t <= 250) cur.e = i;
        else segs.push({ s: i, e: i });
    }
    const out = [];
    for (const sg of segs) {
        const cand = marks.filter((m) => m.i <= sg.s + 30);
        const label = cand.length ? cand[cand.length - 1] : { name: "pre", i: 0 };
        out.push(analyseSegment(rows, sg.s, sg.e, seats, label, label.i));
    }
    // routes whose mark has no segment: still
    const still = marks.filter((m) => !out.some((o) => o.route === m.name)).map((m) => m.name);
    const gaps = [];
    for (let k = 1; k < rows.length; k++) gaps.push(rows[k].t - rows[k - 1].t);
    gaps.sort((x, y) => x - y);
    const name = basename(f).replace(/\.rows\.json$/, "");
    const e0 = rows[0].el;
    const meta = {
        url: d.meta.url,
        tree: d.meta.tree,
        sha: d.meta.sha,
        engine: d.meta.engine,
        browser: d.meta.browserVersion,
        cell: d.meta.cell,
        hook: d.meta.hook,
        browserArgs: d.meta.browserArgs,
        frames: rows.length,
        frameMedianMs: r2(gaps[Math.floor(gaps.length / 2)]),
        framesOver25ms: gaps.filter((g) => g > 25).length,
        consoleErrors: d.meta.consoleErrors,
        stepsNotDone: (d.meta.drivenSteps || []).filter((s) => s.timeout || s.missing),
        dock: { label: e0.dock?.["a:aria-label"], cls: e0.dock?.["a:class"], box: e0.dock && [e0.dock.x, e0.dock.y, e0.dock.w, e0.dock.h] },
        theme: e0.theme ? { label: e0.theme["a:aria-label"], title: e0.theme["a:title"], box: [e0.theme.x, e0.theme.y, e0.theme.w, e0.theme.h] } : null,
        rest: e0.rest?.["a:data-at"],
        seats: seats.length,
        marks: marks.map((m) => `${m.name}@${m.i}`),
        stillRoutes: still,
    };
    writeFileSync(join(OUT, name + ".json"), JSON.stringify({ meta, segments: out }));
    summary[name] = {
        meta,
        segments: out.map(({ series, firstFrames, lastFrames, ...rest }) => ({
            ...rest,
            lastFrames: lastFrames.map((r) => ({ i: r.i, t: r.t, dt: r.dt, plate: r.plate, dockSc: r.dockSc, sumOp: r.sumOp, seal: r.summary, runOp: r.runOp, seat0: r.seats[0], morphing: r.morphing })),
            firstFrames: firstFrames.map((r) => ({ i: r.i, t: r.t, dt: r.dt, plate: r.plate, dockSc: r.dockSc, sumOp: r.sumOp, runOp: r.runOp, seat0: r.seats[0], seal: r.summary })),
        })),
    };
    console.log("analysed", name, out.length, "segments", still.length ? "still: " + still.join(",") : "");
}
writeFileSync(join(OUT, "summary.json"), JSON.stringify(summary));
