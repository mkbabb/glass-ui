// judge6.mjs: MEASURE-5. judge5.mjs with RU-25 and RU-34 (RULINGS-4), and nothing else:
//   - RU-25 replaces RU-21's 20 ms: "visible until covered" is read against the lane, which the
//     judge builds itself from the plate's painted box cut at each neighbouring region's painted
//     facing edge (the run yields to its neighbour; two neighbours meet at the leading one's far
//     edge). A seat above 0.1 whose box meets that lane by more than 0.5 px on each axis has a
//     non-empty visible box, and a seat that showed and was hidden never shows again in that
//     travel. So the clause cannot pass by construction, the clip the carrier wrote on each region
//     equals that lane within 0.5 px on every side (a lane written closed, inset(50%), is read as
//     closed and passes only when the judge's lane is narrower than the plate's radius, RU-31).
//   - RU-34: a reduced-motion segment that holds two or more marks is split by them. Per mark,
//     the plate's box and corner and every seat's translate take their new value on one row,
//     no later than one row after that mark's cause; a fade a later change interrupts is not
//     judged for its length; after the last mark every opacity is at rest within 144 ms of its
//     cause and each fade it ends with shows three values or more.
//   - RU-32: the leaving face's first-row move reads its start edge (the right edge right to left).
// judge5.mjs: MEASURE-4. judge4.mjs with RU-21: a unit hidden by its lane before the plate covers it
// passes when it is covered within 20 ms of the first hidden row; one that shows again is a fault.
// judge4.mjs <rows.json[.gz]> [...]: MEASURE-3. judge3.mjs with two corrections and nothing else:
//   - a step is a step from 0.005 px (half the sampler's 0.01 px resolution); judge3 dropped
//     steps under 0.01, so a reversing step of exactly one unit (646.98 to 646.97) was lost
//     to float error and a turn was counted a row late;
//   - a turn is counted from its cause (the first pointer event the probe dispatched after
//     the mark, when there is one), never from the mark (W-I.8, "A response").
// judge3.mjs <rows.json[.gz]> [...]: PROTOTYPE-3. judge.mjs restated to RU-19: the 0.25 px
// floor on every edge bound, the turn in time (leaving the old path within 34 ms; reversing
// within the preset's own stopping time x 1.15 plus one row), the blank plate in time over
// every face that shows, the response of a swap, and a resize segment by its own clause.
// judge.mjs <rows.json> [...]: applies W-I.8's bounds (G-2 to G-6) to probe rows and prints
// one line per motion segment. The bounds come from springPreset("dock") (response 0.3,
// damping 0.88, read from the worktree's springPresets.ts) at each row's own frame length.
import { readFileSync } from "node:fs";
import { gunzipSync } from "node:zlib";
const FLOOR = 0.25; // RU-19 (a), px
// The preset as a mass-1 spring toward 0 (the carrier's own step), for the turn.
function stepQ(x, v, dt) {
    const W = (2 * Math.PI) / RESP_(), Z = ZETA_(), D = W * Math.sqrt(1 - Z * Z);
    const e = Math.exp(-Z * W * dt), c = Math.cos(D * dt), sn = Math.sin(D * dt), B = (v + Z * W * x) / D;
    return [e * (x * c + B * sn), e * (-Z * W * (x * c + B * sn) + (-x * D * sn + B * D * c))];
}
let RESP_ = () => 0, ZETA_ = () => 0;
const src = readFileSync("/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8/src/composables/motion/spring/springPresets.ts", "utf8");
const m = /name: "dock",\s*response: ([\d.]+),\s*dampingFraction: ([\d.]+)/.exec(src);
const RESP = +m[1], ZETA = +m[2];
RESP_ = () => RESP; ZETA_ = () => ZETA;
/** Time (ms) for the preset to stop from (x px from its target, v px/ms): 0 when it is already heading there. */
function stopMs(x, vms) {
    let X = x, V = vms * 1000;
    if (Math.sign(V) !== Math.sign(X) || Math.abs(V) < 1e-6) return 0; // heading to the target already
    for (let t = 0; t < 0.5; t += 0.0005) { [X, V] = stepQ(X, V, 0.0005); if (Math.sign(V) !== Math.sign(vms)) return (t + 0.0005) * 1000; }
    return 500;
}
const W0 = (2 * Math.PI) / RESP, WD = W0 * Math.sqrt(1 - ZETA * ZETA);
const prog = (t) => 1 - Math.exp(-ZETA * W0 * t) * (Math.cos(WD * t) + ((ZETA * W0) / WD) * Math.sin(WD * t));
// PROTOTYPE-2 (RU-2): every bound is stated in time. The judge computes each from the
// preset at each row's own length and carries no number of its own.
const FROM_REST_MS = 34;
const ROW_CAP_MS = 33;
let OVS = 0;
for (let t = 0; t < 2; t += 0.0005) OVS = Math.max(OVS, prog(t) - 1);
function anyBound(dt) {
    let mx = 0;
    for (let t = 0; t < 1.5; t += 0.0005) mx = Math.max(mx, prog(t + dt / 1000) - prog(t));
    return 1.15 * mx;
}
const anyCache = new Map();
const anyB = (dt) => {
    const k = Math.round(Math.min(dt, ROW_CAP_MS) * 10);
    if (!anyCache.has(k)) anyCache.set(k, anyBound(k / 10));
    return anyCache.get(k);
};
const num = (v) => (v == null ? NaN : +v);
function edges(e) {
    if (!e || e.x == null || e.vis === 0) return null;
    return { L: e.x, R: e.x + e.w, T: e.y, B: e.y + e.h, W: e.w, H: e.h };
}
function parseInset(clip) {
    const mm = /inset\(([^)]*)\)/.exec(clip || "");
    if (!mm) return null;
    const parts = mm[1].split(" round ")[0].trim().split(/\s+/).map((s) => parseFloat(s));
    const [t, r = t, b = t, l = r] = parts;
    return { t, r, b, l };
}
function judge(file) {
    const raw = readFileSync(file);
    const d = JSON.parse((file.endsWith(".gz") ? gunzipSync(raw) : raw).toString("utf8"));
    const rows = d.rows;
    const tree = d.meta.tree, eng = d.meta.engine, cell = d.meta.cell.tag, scen = d.meta.scenario;
    // Segments: runs of plate change split by >= 250 ms of stillness.
    const plateKey = (r) => { const p = r.el.plate; return p ? `${p.x}|${p.y}|${p.w}|${p.h}|${p.rad}` : ""; };
    const segs = [];
    let cur = null, lastMove = -1e9;
    for (let i = 1; i < rows.length; i++) {
        if (plateKey(rows[i]) !== plateKey(rows[i - 1])) {
            if (!cur || rows[i].t - lastMove > 250) { cur = { a: i - 1, b: i }; segs.push(cur); }
            cur.b = i;
            lastMove = rows[i].t;
        }
    }
    const marks = (d.marks || []).map((mk) => ({ name: mk.name, i: mk.row ?? mk.i ?? mk.frame, t: mk.t }));
    // The cause of a mark: the first pointer event dispatched within 40 ms after it, if any.
    const causeT = (mk) => { const p = (d.ptrLog || []).find((e) => e.t >= mk.t && e.t - mk.t <= 40); return p ? p.t : null; };
    const out = [];
    const fullTravel = {};
    for (const sg of segs) {
        const rs = rows.slice(sg.a, sg.b + 2).filter(Boolean);
        // PROTOTYPE-2: a mark that lands inside a running travel (a reversal, or a second
        // change that retargets it) is judged as a turn: the no-reversal bound is excepted
        // after it and its response is read.
        const revMark = marks.find((mk) => mk.i > sg.a + 1 && mk.i <= sg.b);
        const res = { scen, tree, eng, cell, rows: `f${sg.a}-f${sg.b}`, ms: +(rows[sg.b].t - rows[sg.a].t).toFixed(0), edges: {}, viol: [] };
        for (const k of ["L", "R", "T", "B"]) {
            const v = rs.map((r) => edges(r.el.plate)?.[k]);
            const first = v[0], last = v[v.length - 1];
            const travel = revMark ? Math.max(...v) - Math.min(...v) : Math.abs(last - first);
            if (!(travel > 2)) continue; // PROTOTYPE-2: an edge that travels 2 px or less is not judged
            const dir = revMark ? Math.sign(v[Math.max(0, revMark.i - sg.a)] - first) : Math.sign(last - first);
            let firstStep = null, maxPct = 0, maxAt = 0, rev = 0, revPx = 0, lastStep = null, lastPct = 0;
            const steps = [];
            for (let i = 1; i < v.length; i++) {
                const s = v[i] - v[i - 1];
                const dt = rs[i].t - rs[i - 1].t;
                if (Math.abs(s) < 0.005) continue;
                steps.push({ i: sg.a + i, j: i, s, dt });
            }
            if (!steps.length) continue;
            let span = Math.max(travel, Math.max(...v) - Math.min(...v));
            // PROTOTYPE-2: the span is the travel the edge was heading for: the largest
            // distance from its start to the root's layout edge over the segment (the root is
            // never transformed, so its box is the layout). One travel: its own length.
            for (let q = sg.a; q <= sg.b + 1 && q < rows.length; q++) {
                const dk = edges(rows[q]?.el.dock)?.[k];
                if (dk != null && Math.abs(dk - v[0]) > span) span = Math.abs(dk - v[0]);
            }
            if (revMark && fullTravel[k]) span = Math.max(span, fullTravel[k]);
            // PROTOTYPE-2 (build step 2): a reversed travel with no earlier segment takes its
            // span from the posture it was heading to, the root's layout box at the mark. The
            // first judge took the reversal segment's own extent, so a reversed unfold read
            // its steps against about 57 % of the travel and reported 7 to 23 % steps.
            else if (revMark) {
                for (let q = sg.a; q <= revMark.i; q++) {
                    const dk = edges(rows[q]?.el.dock)?.[k];
                    if (dk != null && Math.abs(dk - v[0]) > span) span = Math.abs(dk - v[0]);
                }
            }
            if (!revMark) fullTravel[k] = Math.max(fullTravel[k] || 0, travel);
            const f = steps[0];
            firstStep = Math.abs(f.s) / span;
            // From rest: every row of the first 34 ms after the edge leaves rest has covered no
            // more than 1.15 times what the preset covers in that time (from the last rest row).
            const t0 = rs[f.j - 1].t;
            for (let q = f.j; q < v.length && rs[q].t - t0 <= FROM_REST_MS + 0.5; q++) {
                if (revMark && sg.a + q > revMark.i) break;
                const cov = Math.abs(v[q] - v[f.j - 1]) / span;
                const lim = 1.15 * prog((rs[q].t - t0) / 1000);
                // RU-19 (a): over the bound by more than 0.25 px as well.
                if (cov > lim + 1e-9 && (cov - lim) * span > FLOOR) { res.viol.push(`${k} from rest ${(cov * 100).toFixed(1)}% > ${(lim * 100).toFixed(1)}% at ${(rs[q].t - t0).toFixed(1)} ms`); break; }
            }
            // Any row, credited at most 33 ms.
            for (const st of steps) {
                const pp = Math.abs(st.s) / span;
                if (pp > maxPct) (maxPct = pp), (maxAt = st.i);
                const ab = anyB(st.dt);
                if (pp > ab + 1e-9 && (pp - ab) * span > FLOOR) res.viol.push(`${k} step ${(pp * 100).toFixed(1)}% > ${(ab * 100).toFixed(1)}% (f${st.i}, ${st.dt.toFixed(1)} ms)`);
            }
            // No reversal: steps against the net direction form one consecutive run at the
            // end, summing to no more than 1.15 times the preset's overshoot for the travel.
            if (!revMark) {
                const against = steps.map((st) => Math.sign(st.s) !== dir && Math.abs(st.s) > 0.05);
                const firstA = against.indexOf(true);
                if (firstA >= 0) {
                    const tail = steps.slice(firstA);
                    const tailWith = tail.some((st) => Math.sign(st.s) === dir && Math.abs(st.s) > 0.05);
                    revPx = tail.filter((st) => Math.sign(st.s) !== dir).reduce((x, st) => x + Math.abs(st.s), 0);
                    rev = tail.filter((st) => Math.sign(st.s) !== dir).length;
                    const lim = 1.15 * OVS * travel;
                    if (tailWith || revPx > lim + 0.05) res.viol.push(`${k} ${rev} steps against travel (${revPx.toFixed(2)} px, bound ${lim.toFixed(2)} px${tailWith ? ", not one run at the end" : ""})`);
                }
            }
            const ls = steps[steps.length - 1];
            lastStep = Math.abs(ls.s);
            lastPct = lastStep / span;
            if ((lastStep > 1 || lastPct > 0.02) && lastStep - Math.min(1, 0.02 * span) > FLOOR) res.viol.push(`${k} last ${lastStep.toFixed(2)} px (${(lastPct * 100).toFixed(1)}%, f${ls.i})`);
            if (revMark) {
                // RU-19 (b): the edge leaves the old travel's path within 34 ms of the cause,
                // and reverses within the preset's own stopping time from the velocity it had,
                // x 1.15, plus one row.
                const mi = revMark.i;
                const at = (q) => edges(rows[q]?.el.plate)?.[k];
                const layoutAt = (q) => edges(rows[q]?.el.dock)?.[k];
                const x0 = at(mi), xp = at(mi - 1), tp = rows[mi - 1]?.t;
                const tc = causeT(revMark);
                const tm = tc != null && rows[mi] && tc > rows[mi].t ? tc : rows[mi]?.t;
                const oldT = layoutAt(mi - 1);
                let newT = oldT;
                for (let q = mi; q <= sg.b + 1 && q < rows.length; q++) { const L = layoutAt(q); if (L != null && Math.abs(L - oldT) > 0.5) { newT = L; break; } }
                res.turn = res.turn ?? {};
                if (x0 != null && xp != null && oldT != null && tm > tp) {
                    const tr0 = rows[mi].t;
                    const v0 = (x0 - xp) / (tr0 - tp); // px per ms
                    // leaving the path: first row after the mark whose place differs from the unturned spring's by more than the floor
                    let X = x0 - oldT, V = v0 * 1000, tPrev = tr0, leave = null;
                    for (let q = mi + 1; q <= sg.b + 1 && q < rows.length; q++) {
                        [X, V] = stepQ(X, V, (rows[q].t - tPrev) / 1000); tPrev = rows[q].t;
                        const a = at(q); if (a == null) continue;
                        if (Math.abs(a - (oldT + X)) > FLOOR) { leave = rows[q].t - tm; break; }
                    }
                    const rowMs = tr0 - tp;
                    const stop = stopMs(x0 - newT, v0);
                    const bound = stop > 0 ? 1.15 * stop + rowMs : null;
                    let rev = null;
                    if (stop > 0) { const tr = steps.find((st) => st.i > mi && Math.sign(st.s) !== Math.sign(v0)); rev = tr ? rows[tr.i].t - tm : null; }
                    res.turn[k] = { leaveMs: leave == null ? null : +leave.toFixed(1), reverseMs: rev == null ? null : +rev.toFixed(1), boundMs: bound == null ? null : +bound.toFixed(1) };
                    const turnable = /^(reverse|return|third|fold|swap)/.test(revMark.name);
                    if (turnable && leave != null && leave > FROM_REST_MS) res.viol.push(`${k} leaves its path ${leave.toFixed(0)} ms after ${revMark.name}`);
                    if (turnable && bound != null && rev != null && rev > bound) res.viol.push(`${k} reverses ${rev.toFixed(0)} ms after ${revMark.name} (bound ${bound.toFixed(0)} ms)`);
                }
                const vs = steps.map((st) => st.s / st.dt);
                let jump = 0;
                for (let q = 1; q < steps.length; q++) if (steps[q].i >= revMark.i && steps[q].i <= revMark.i + 4) jump = Math.max(jump, Math.abs(vs[q] - vs[q - 1]) / span);
                res.turn[k + "dv"] = +(jump * 1000).toFixed(2);
            }
            res.edges[k] = { travel: +travel.toFixed(1), first: +(firstStep * 100).toFixed(1), max: +(maxPct * 100).toFixed(1), maxAt, last: +lastStep.toFixed(2), rev };
        }
        // The corner: a pill (a capsule at both rests) is half the plate's painted cross
        // extent within 0.5 px in every row; the two corners of an end are equal within
        // 0.25 px. A rounded or card dock: between its two rests within 0.5 px (its lerp on
        // e or f is not in the rows; the between-rests test is the weaker form, stated).
        let cornerBad = 0, capsuleBad = 0, cornerWorst = 0;
        const crossOf = (r) => { const p = r?.el.plate; return p ? Math.min(p.w, p.h) / 2 : NaN; };
        // A radius larger than half the cross extent paints as half of it (the used value).
        const radOf = (r) => (r?.el.plate?.rad || "").split("|").map((x) => Math.min(parseFloat(x), crossOf(r)));
        const c0 = radOf(rs[0]), c1 = radOf(rs[rs.length - 1]);
        const pill = c0.every((x) => Math.abs(x - crossOf(rs[0])) <= 0.75) && c1.every((x) => Math.abs(x - crossOf(rs[rs.length - 1])) <= 0.75);
        res.pill = pill;
        for (const r of rs) {
            const p = r.el.plate;
            if (!p || !p.rad || /%/.test(p.rad)) continue;
            const c = radOf(r);
            if (c.some((x) => Number.isNaN(x))) continue;
            if (Math.abs(c[0] - c[3]) > 0.25 || Math.abs(c[1] - c[2]) > 0.25) cornerBad++;
            if (pill) {
                const off = Math.max(...c.map((x) => Math.abs(x - crossOf(r))));
                cornerWorst = Math.max(cornerWorst, off);
                if (off > 0.5) capsuleBad++;
            } else if (!r.el.seatplate?.w && c.some((x, q) => x < Math.min(c0[q], c1[q]) - 0.5 || x > Math.max(c0[q], c1[q]) + 0.5)) capsuleBad++;
        }
        res.cornerWorst = +cornerWorst.toFixed(2);
        if (cornerBad) res.viol.push(`corners unequal in ${cornerBad} rows`);
        if (capsuleBad) res.viol.push(pill ? `pill corner off half the cross extent in ${capsuleBad} rows (worst ${cornerWorst.toFixed(2)} px)` : `corner off its rests in ${capsuleBad} rows`);
        // Opacity: the faces and seats, per 60 Hz sample.
        const opCh = new Set();
        for (const r of rs) for (const [k, e] of Object.entries(r.el)) if (e && e.eop != null && /^(summary|full|face|seat|beside|pop)/.test(k)) opCh.add(k);
        let opWorst = 0, opWorstK = "", fades = {};
        for (const k of opCh) {
            // MEASURE: a hidden element (visibility or display) paints at opacity 0 (C-18).
            const v = rs.map((r) => ({ t: r.t, o: r.el[k]?.vis === 0 ? 0 : num(r.el[k]?.eop) })).filter((x) => !Number.isNaN(x.o));
            for (let i = 0; i < v.length; i++) {
                let j = i;
                while (j + 1 < v.length && v[j + 1].t - v[i].t <= 17.5) j++;
                const dv = Math.abs(v[j].o - v[i].o);
                if (dv > opWorst) (opWorst = dv), (opWorstK = `${k} f${sg.a + i}`);
            }
            // A fade lasts at least 75 ms from its last sample at one end to its first at the other.
            const o0 = v[0].o, o1 = v[v.length - 1].o;
            const moved = Math.abs(o1 - o0) > 0.5;
            if (moved) {
                let ia = 0;
                for (let q = 0; q < v.length; q++) if (Math.abs(v[q].o - o0) <= 0.02) ia = q; else break;
                let iz = v.length - 1;
                for (let q = ia + 1; q < v.length; q++) if (Math.abs(v[q].o - o1) <= 0.02) { iz = q; break; }
                fades[k] = +(v[iz].t - v[ia].t).toFixed(0);
            }
        }
        // G-4: the instant where no face shows. Faces: summary/full and face#n that move.
        {
            const fk = [...opCh].filter((k) => /^(summary|full|face)/.test(k));
            // PROTOTYPE-3: every face whose opacity changes in the segment and that shows (0.1
            // or more) in any row; a face that never passed 0.5 still shows (judge.mjs left it
            // out and counted its rows as blank). The run is read in time (RU-19 (c)).
            const moving = fk.filter((k) => { const v = rs.map((r) => num(r.el[k]?.eop)).filter((x) => !Number.isNaN(x)); return v.length && Math.max(...v) - Math.min(...v) > 0.05 && Math.max(...v) >= 0.1; });
            if (moving.length >= 2) {
                let run = 0, worst = 0, at = null, runStart = null, worstMs = 0;
                const e = rs.map((r) => edges(r.el.plate));
                for (let i = 0; i < rs.length; i++) {
                    const blank = moving.every((k) => !(num(rs[i].el[k]?.eop) >= 0.1));
                    if (blank) { if (run === 0) runStart = i; run++; const ms = (rs[Math.min(i + 1, rs.length - 1)].t - rs[runStart - 1 >= 0 ? runStart - 1 : runStart].t); if (run > worst) (worst = run), (at = i); if (ms > worstMs && i + 1 < rs.length) worstMs = ms; }
                    else run = 0;
                }
                // plate progress at the blank rows (main axis, right edge)
                let prog = null;
                if (at != null && e[0] && e[e.length - 1]) {
                    const a0 = e[0].R, a1 = e[e.length - 1].R;
                    const mid = e[at]?.R;
                    prog = Math.abs(a1 - a0) > 0.5 && mid != null ? +((mid - a0) / (a1 - a0)).toFixed(2) : null;
                }
                // The run's time: from the last row with a face showing to the first row with
                // one again, less one row (the time with neither on screen).
                const rowMs = rs.length > 1 ? (rs[rs.length - 1].t - rs[0].t) / (rs.length - 1) : 8.3;
                const blankMs = worst ? Math.max(0, worstMs - rowMs) : 0;
                res.blankRows = worst;
                res.blankMs = +blankMs.toFixed(1);
                res.blankAtProgress = prog;
                const limit = revMark ? 34 : 17;
                if (blankMs > limit + 0.5) res.viol.push(`no face showing for ${blankMs.toFixed(0)} ms (${worst} rows; bound ${limit} ms)`);
            }
        }
        res.opMax = +opWorst.toFixed(2);
        res.opAt = opWorstK;
        res.fades = fades;
        if (opWorst > 0.4) res.viol.push(`opacity ${opWorst.toFixed(2)} in 60 Hz at ${opWorstK}`);
        if (!d.meta.cell.reducedMotion) for (const [k, ms] of Object.entries(fades)) if (ms < 75) res.viol.push(`${k} fade lasts ${ms} ms`);
        // Inside the plate: regions (clipped) against the painted plate (and the seat's plate).
        let over = 0, overAt = "";
        for (let i = 0; i < rs.length; i++) {
            const r = rs[i];
            const P = edges(r.el.plate);
            if (!P) continue;
            const S = edges(r.el.seatplate);
            const morphing = r.el.dock?.["a:data-morphing"] != null;
            if (!morphing) continue;
            for (const k of ["persistent", "pend", "layers", "beside"]) {
                const e = r.el[k];
                if (!e || e.x == null || !(e.eop > 0.1) || e.vis === 0 || !e.w) continue;
                let box = { L: e.x, R: e.x + e.w, T: e.y, B: e.y + e.h };
                const ci = parseInset(e.clip);
                if (ci) box = { L: box.L + ci.l, R: box.R - ci.r, T: box.T + ci.t, B: box.B - ci.b };
                else if (tree !== "dock-wi8" && /v11|red/.test(file)) box = { ...box, L: Math.max(box.L, P.L), R: Math.min(box.R, P.R) };
                if (box.R - box.L <= 0.5 || box.B - box.T <= 0.5) continue;
                const U = S ? { L: Math.min(P.L, S.L), R: Math.max(P.R, S.R), T: Math.min(P.T, S.T), B: Math.max(P.B, S.B) } : P;
                const o = Math.max(U.L - box.L, box.R - U.R, U.T - box.T, box.B - U.B);
                if (o > over) (over = o), (overAt = `${k} f${sg.a + i}`);
            }
        }
        // MEASURE (C-1, C-2): the clip chain, read by the sampler as `vb`.
        //  - visible until covered: a unit above 0.1 whose own box lies inside the painted
        //    plate has a non-empty visible box;
        //  - no overlap: units of different regions do not intersect while both are above 0.1;
        //  - the leaving face's own move in the first moving row, against the plate's step.
        {
            const unitKeys = new Set();
            for (const r of rs) for (const k of Object.keys(r.el)) if (/^(seat|persistent|pend|beside|summary|full)/.test(k)) unitKeys.add(k);
            let hidden = 0, hiddenAt = "", overlap = 0, overlapPx = 0, overlapAt = "";
            // RU-25: the lane as the judge builds it, and the clip as the carrier wrote it.
            let laneBad = 0, laneWorst = 0, laneAt = "";
            const shown = {}, gone = {};
            const hasVb = rs.some((r) => [...unitKeys].some((k) => r.el[k] && "vb" in r.el[k]));
            const vertical = /\bvertical\b/.test(String(rs[0]?.el.dock?.["a:class"] || ""));
            // a region takes part when it is laid out, or when the carrier wrote it a lane (a run of no width still has one)
            const occ = (e) => e && e.x != null && e.vis !== 0 && ((e.w > 0.5 && e.h > 0.5) || /^inset\(/.test(String(e.clip || "")));
            for (let i = 0; i < rs.length && hasVb; i++) {
                const r = rs[i];
                if (r.el.dock?.["a:data-morphing"] == null) continue;
                const P = edges(r.el.plate);
                if (!P) continue;
                const regs = ["persistent", "layers", "pend"].filter((k) => occ(r.el[k])).map((k) => { const e = r.el[k]; return { k, e, s: vertical ? e.y : e.x, en: vertical ? e.y + e.h : e.x + e.w, c: vertical ? e.y + e.h / 2 : e.x + e.w / 2 }; }); // painted order: persistent, run, persistent-end, reversed right to left (the page's direction is the scenario's)
                if (!vertical && /-rtl-/.test(scen)) regs.reverse();
                const bnd = (a, b) => (a.k === "layers" ? b.s : a.en);
                const lanes = {};
                regs.forEach((g, q) => {
                    const L = { L: P.L, R: P.R, T: P.T, B: P.B };
                    if (vertical) { if (regs[q - 1]) L.T = Math.max(L.T, bnd(regs[q - 1], g)); if (regs[q + 1]) L.B = Math.min(L.B, bnd(g, regs[q + 1])); }
                    else { if (regs[q - 1]) L.L = Math.max(L.L, bnd(regs[q - 1], g)); if (regs[q + 1]) L.R = Math.min(L.R, bnd(g, regs[q + 1])); }
                    lanes[g.k] = L;
                    // the clip written on the region against the judge's lane
                    const clip = String(g.e.clip || "");
                    if (!/^inset\(/.test(clip)) return;
                    if (/^inset\(50%/.test(clip)) {
                        const ext = vertical ? L.B - L.T : L.R - L.L, rad = Math.min(P.R - P.L, P.B - P.T) / 2;
                        if (ext >= rad + 0.5) { laneBad++; if (ext > laneWorst) { laneWorst = ext; laneAt = `${g.k} closed with a ${ext.toFixed(1)} px lane f${sg.a + i}`; } }
                        return;
                    }
                    const ci = parseInset(clip);
                    const W = { L: g.e.x + ci.l, R: g.e.x + g.e.w - ci.r, T: g.e.y + ci.t, B: g.e.y + g.e.h - ci.b };
                    const off = Math.max(...["L", "R", "T", "B"].map((s2) => Math.abs(W[s2] - L[s2])));
                    if (off > 0.5) { laneBad++; if (off > laneWorst) { laneWorst = off; laneAt = `${g.k} f${sg.a + i}`; } }
                });
                const Ln = lanes.layers;
                for (const k of unitKeys) {
                    if (!/^seat/.test(k) || !Ln) continue;
                    const e = r.el[k];
                    if (!e || !(e.eop > 0.1) || e.vis === 0 || !e.w || !e.h) continue;
                    const ix = Math.min(e.x + e.w, Ln.R) - Math.max(e.x, Ln.L), iy = Math.min(e.y + e.h, Ln.B) - Math.max(e.y, Ln.T);
                    const meets = ix > 0.5 && iy > 0.5;
                    if (meets && e.vb === 0) { hidden++; hiddenAt ||= `${k} f${sg.a + i} meets its lane by ${ix.toFixed(1)} px`; }
                    if (e.vb !== 0 && gone[k]) { hidden++; hiddenAt ||= `${k} f${sg.a + i} shows again`; }
                    if (e.vb !== 0) shown[k] = true; else if (shown[k]) gone[k] = true;
                }
                const seats = [...unitKeys].filter((k) => /^seat/.test(k));
                for (const a of ["persistent", "pend", "beside"]) {
                    const A = r.el[a];
                    if (!A || !(A.eop > 0.1) || !A.vb) continue;
                    for (const b of seats) {
                        const B = r.el[b];
                        if (!B || !(B.eop > 0.1) || !B.vb) continue;
                        const ix = Math.min(A.vb[2], B.vb[2]) - Math.max(A.vb[0], B.vb[0]);
                        const iy = Math.min(A.vb[3], B.vb[3]) - Math.max(A.vb[1], B.vb[1]);
                        if (ix > 0.5 && iy > 0.5) { overlap++; if (ix > overlapPx) { overlapPx = ix; overlapAt = `${a}×${b} f${sg.a + i}`; } }
                    }
                }
            }
            res.hiddenRows = hasVb ? hidden : null;
            res.laneOff = +laneWorst.toFixed(2);
            if (laneBad) res.viol.push(`a region's clip is off its lane in ${laneBad} region-rows, up to ${laneWorst.toFixed(2)} px (${laneAt})`);
            res.overlapRows = hasVb ? overlap : null;
            res.overlapPx = +overlapPx.toFixed(1);
            if (hidden) res.viol.push(`a seat that meets its lane is hidden in ${hidden} unit-rows (${hiddenAt})`);
            if (overlap) res.viol.push(`regions overlap in ${overlap} unit-rows, up to ${overlapPx.toFixed(1)} px (${overlapAt})`);
            // first moving row: leaving face (visible at rs[0]) move, against the plate's own step
            const p0 = edges(rs[0].el.plate), p1 = rs[1] && edges(rs[1].el.plate);
            if (p0 && p1) {
                const plateStep = Math.max(Math.abs(p1.L - p0.L), Math.abs(p1.R - p0.R), Math.abs(p1.T - p0.T), Math.abs(p1.B - p0.B));
                let faceMove = 0, faceK = "";
                for (const k of ["summary", "full"]) {
                    const a0 = rs[0].el[k], a1 = rs[1].el[k];
                    if (!a0 || !a1 || !(a0.eop > 0.1)) continue;
                    // RU-32, read on rows/m4: a face's place is its start edge. Right to left that
                    // is its right edge; the left edge of a run that grows moves by the growth
                    // while nothing in it paints elsewhere (the leaving face holds 0.00 px).
                    const sx = /-rtl-/.test(scen) ? (e) => e.x + e.w : (e) => e.x;
                    const mv = Math.max(Math.abs(sx(a1) - sx(a0)), Math.abs(a1.y - a0.y));
                    if (mv > faceMove) (faceMove = mv), (faceK = k);
                }
                res.firstRowFaceMove = +faceMove.toFixed(2);
                res.firstRowPlateStep = +plateStep.toFixed(2);
                if (faceMove > 0.5) res.viol.push(`leaving face ${faceK} moves ${faceMove.toFixed(2)} px in the first row (plate ${plateStep.toFixed(2)} px)`);
            }
        }
        res.outside = +over.toFixed(1);
        if (over > 0.5) res.viol.push(`content ${over.toFixed(1)} px outside the plate (${overAt})`);
        // The shadow as one declaration: any row where its layer count changes.
        let disc = 0;
        for (let i = 1; i < rs.length; i++) {
            for (const k of ["plate", "dock", "shadow"]) {
                const a = rs[i - 1].el[k]?.["c:box-shadow"], b = rs[i].el[k]?.["c:box-shadow"];
                if (a && b && a.split("px").length !== b.split("px").length) disc++;
            }
        }
        if (disc) res.viol.push(`box-shadow changes shape in ${disc} rows`);
        if (d.meta.cell.reducedMotion) {
            // G-10: geometry in at most two values in one frame; content shows three or more
            // opacity values over 50 to 144 ms; nothing runs past 144 ms.
            const v = [];
            const geomFrames = new Set();
            for (let i = 1; i < rs.length; i++) for (const k of ["L", "R", "T", "B"]) { const a1 = edges(rs[i - 1].el.plate)?.[k], b1 = edges(rs[i].el.plate)?.[k]; if (a1 != null && b1 != null && Math.abs(a1 - b1) > 0.05) geomFrames.add(i); }
            if (geomFrames.size > 1) v.push(`geometry moves on ${geomFrames.size} frames`);
            const fadeInfo = {};
            for (const k of opCh) {
                const xs = rows.slice(sg.a, Math.min(rows.length, sg.b + 40)).map((r) => ({ t: r.t, o: num(r.el[k]?.eop) })).filter((x) => !Number.isNaN(x.o));
                const ch = xs.filter((x, i) => i > 0 && Math.abs(x.o - xs[i - 1].o) > 0.005);
                if (!ch.length) continue;
                const dur = ch[ch.length - 1].t - xs[xs.indexOf(ch[0]) - 1].t;
                const vals = new Set(ch.map((x) => x.o.toFixed(2))).size;
                fadeInfo[k] = { values: vals + 1, ms: +dur.toFixed(0) };
                if (Math.abs(xs[xs.length - 1].o - xs[0].o) > 0.5 && (vals + 1 < 3 || dur > 144 || dur < 50)) v.push(`${k} fade ${vals + 1} values over ${dur.toFixed(0)} ms`);
            }
            // RU-34: two or more marks in the segment split it, and each mark is read alone.
            const inSeg = marks.filter((mk) => rows[mk.i] && mk.t >= rows[sg.a].t - 60 && mk.i <= sg.b);
            if (inSeg.length >= 2) {
                v.length = 0;
                const crOf = (mk) => { const tc = causeT(mk) ?? mk.t; let q = mk.i; while (q < rows.length - 1 && rows[q].t < tc) q++; return q; };
                const cr = inSeg.map(crOf);
                const lastEnd = Math.min(rows.length, sg.b + 40);
                // the corner by its used value: a radius past half the cross extent paints as half of it
                const used = (p) => String(p?.rad || "").split("|").map((x) => Math.min(parseFloat(x), Math.min(p.w, p.h) / 2).toFixed(1)).join(",");
                const geo = (r) => { const p = r.el.plate; const g = [p?.x, p?.y, p?.w, p?.h, used(p)].join("|"); const tr = Object.keys(r.el).filter((k) => /^seat#/.test(k)).map((k) => r.el[k]?.["s:translate"] ?? "").join("|"); return [g, tr]; };
                const split = [];
                inSeg.forEach((mk, j) => {
                    const a0 = cr[j], a1 = j + 1 < cr.length ? cr[j + 1] : lastEnd;
                    const moved = [];
                    for (let q = Math.max(1, a0); q < a1; q++) {
                        const [g0, t0] = geo(rows[q - 1]), [g1, t1] = geo(rows[q]);
                        const pa = edges(rows[q - 1].el.plate), pb = edges(rows[q].el.plate);
                        const boxMove = pa && pb && ["L", "R", "T", "B"].some((k) => Math.abs(pa[k] - pb[k]) > 0.05);
                        if (boxMove || (g0.split("|")[4] !== g1.split("|")[4]) || t0 !== t1) moved.push(q);
                    }
                    const late = moved.length && moved[0] > a0 + 1;
                    split.push({ mark: mk.name, rows: moved.length, late: !!late });
                    if (moved.length > 1 || late) v.push(`${mk.name}: geometry on ${moved.length} rows${late ? `, first ${moved[0] - a0} rows after its cause` : ""}`);
                });
                // after the last mark: every opacity at rest within 144 ms; its fade shows 3+ values
                const aL = cr[cr.length - 1], tL = rows[aL].t;
                for (const k of opCh) {
                    const xs = rows.slice(Math.max(0, aL - 1), lastEnd).map((r) => ({ t: r.t, o: num(r.el[k]?.eop) })).filter((x) => !Number.isNaN(x.o));
                    if (xs.length < 2) continue;
                    const end = xs[xs.length - 1].o;
                    let lastCh = null; const vals = new Set();
                    for (let q = 1; q < xs.length; q++) if (Math.abs(xs[q].o - xs[q - 1].o) > 0.005) { lastCh = xs[q].t; vals.add(xs[q].o.toFixed(2)); }
                    if (lastCh == null) continue;
                    vals.add(xs[0].o.toFixed(2));
                    fadeInfo[k] = { values: vals.size, ms: +(lastCh - tL).toFixed(0), after: inSeg[inSeg.length - 1].name };
                    if (lastCh - tL > 144) v.push(`${k} still fading ${(lastCh - tL).toFixed(0)} ms after ${inSeg[inSeg.length - 1].name}`);
                    if (Math.abs(end - xs[0].o) > 0.5 && vals.size < 3) v.push(`${k} ends with ${vals.size} values`);
                }
                res.split = split;
            }
            res.viol = v;
            res.g10 = fadeInfo;
        }
        // The response (RU-19): the first row that shows a change is no later than 34 ms after
        // its cause ("at once"). An opening by the pointer is not read here: the probe's mark
        // precedes a 120 ms pointer path, and G-1 (a) reads the intent on the real clock. The
        // cause is the last mark before the segment.
        {
            const cause = [...marks].reverse().find((mk) => mk.i <= sg.a + 1 && rows[sg.a + 1].t - (rows[mk.i]?.t ?? -1e9) < 400);
            if (cause && rows[cause.i]) {
                const ms = rows[sg.a + 1].t - rows[cause.i].t;
                res.responseMs = +ms.toFixed(1);
                res.cause = cause.name;
                const lim = /^enter/.test(cause.name) ? null : /^(outside|esc|tap|to|third|key|return|swap|add|remove|route|neighbour|far|twice|fold|mount|leave-)/.test(cause.name) ? 34 : null;
                if (lim !== null && !d.meta.cell.reducedMotion && ms > lim + 0.5) res.viol.push(`first row ${ms.toFixed(0)} ms after ${cause.name} (bound ${lim} ms)`);
            }
        }
        // RU-19 (d): a window resize lands in one frame by R-1; its segment is read by that
        // clause (every edge moves on one row), never by the travel bounds.
        const resizeMark = marks.find((mk) => /^resize/.test(mk.name) && mk.i <= sg.a + 1 && rows[sg.a].t - (rows[mk.i]?.t ?? -1e9) < 300);
        if (resizeMark && !d.meta.cell.reducedMotion) {
            let moving = 0;
            for (let i = 1; i < rs.length; i++) { const p0 = edges(rs[i - 1].el.plate), p1 = edges(rs[i].el.plate); if (p0 && p1 && ["L", "R", "T", "B"].some((k) => Math.abs(p1[k] - p0[k]) > 0.05)) moving++; }
            res.viol = moving > 1 ? [`a resize moves the plate on ${moving} rows`] : [];
            res.resize = true;
        }
        out.push(res);
    }
    return { file, meta: d.meta, segs: out, rows: rows.length };
}
const files = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const json = process.argv.includes("--json");
const all = files.map(judge);
if (json) console.log(JSON.stringify(all, null, 1));
else
    for (const r of all) {
        for (const s of r.segs) {
            const e = Object.entries(s.edges).map(([k, v]) => `${k} ${v.travel}px first ${v.first}% max ${v.max}% last ${v.last}px`).join("; ");
            console.log(`${s.scen} | ${s.tree} | ${s.eng} | ${s.cell} | ${s.rows} ${s.ms}ms | ${e} | op60 ${s.opMax} | out ${s.outside}px | ${s.viol.length ? "FAIL: " + s.viol.slice(0, 6).join("; ") + (s.viol.length > 6 ? ` (+${s.viol.length - 6})` : "") : "pass"}`);
        }
    }
