// judge.mjs <rows.json> [...]: applies W-I.8's bounds (G-2 to G-6) to probe rows and prints
// one line per motion segment. The bounds come from springPreset("dock") (response 0.3,
// damping 0.88, read from the worktree's springPresets.ts) at each row's own frame length.
import { readFileSync } from "node:fs";
const src = readFileSync("/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8/src/composables/motion/spring/springPresets.ts", "utf8");
const m = /name: "dock",\s*response: ([\d.]+),\s*dampingFraction: ([\d.]+)/.exec(src);
const RESP = +m[1], ZETA = +m[2];
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
    const d = JSON.parse(readFileSync(file, "utf8"));
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
    const marks = (d.marks || []).map((mk) => ({ name: mk.name, i: mk.row ?? mk.i ?? mk.frame }));
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
                if (Math.abs(s) < 0.01) continue;
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
                if (cov > lim + 1e-9) { res.viol.push(`${k} from rest ${(cov * 100).toFixed(1)}% > ${(lim * 100).toFixed(1)}% at ${(rs[q].t - t0).toFixed(1)} ms`); break; }
            }
            // Any row, credited at most 33 ms.
            for (const st of steps) {
                const pp = Math.abs(st.s) / span;
                if (pp > maxPct) (maxPct = pp), (maxAt = st.i);
                const ab = anyB(st.dt);
                if (pp > ab + 1e-9) res.viol.push(`${k} step ${(pp * 100).toFixed(1)}% > ${(ab * 100).toFixed(1)}% (f${st.i}, ${st.dt.toFixed(1)} ms)`);
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
            if (lastStep > 1 || lastPct > 0.02) res.viol.push(`${k} last ${lastStep.toFixed(2)} px (${(lastPct * 100).toFixed(1)}%, f${ls.i})`);
            if (revMark) {
                // A response: the turn's first row no later than 34 ms after the mark.
                const turn = steps.find((st) => st.i > revMark.i && Math.sign(st.s) !== dir);
                res.turn = res.turn ?? {};
                const tms = turn ? rows[turn.i].t - rows[revMark.i].t : null;
                res.turn[k] = tms == null ? null : +tms.toFixed(1);
                // G-3's response applies to a reversal; a retarget (G-4) has no response clause.
                if (/^reverse/.test(revMark.name) && tms != null && tms > FROM_REST_MS) res.viol.push(`${k} turns ${tms.toFixed(0)} ms after the reversal`);
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
            const moving = fk.filter((k) => { const v = rs.map((r) => num(r.el[k]?.eop)).filter((x) => !Number.isNaN(x)); return v.length && Math.max(...v) - Math.min(...v) > 0.5; });
            if (moving.length >= 2) {
                let run = 0, worst = 0, at = null;
                const e = rs.map((r) => edges(r.el.plate));
                const ch = s0 => s0;
                for (let i = 0; i < rs.length; i++) {
                    const blank = moving.every((k) => !(num(rs[i].el[k]?.eop) >= 0.1));
                    run = blank ? run + 1 : 0;
                    if (run > worst) (worst = run), (at = i);
                }
                // plate progress at the blank rows (main axis, right edge)
                let prog = null;
                if (at != null && e[0] && e[e.length - 1]) {
                    const a0 = e[0].R, a1 = e[e.length - 1].R;
                    const mid = e[at]?.R;
                    prog = Math.abs(a1 - a0) > 0.5 && mid != null ? +((mid - a0) / (a1 - a0)).toFixed(2) : null;
                }
                res.blankRows = worst;
                res.blankAtProgress = prog;
                if (worst > (/^(swap|seat)/.test(scen) ? 1 : 2)) res.viol.push(`${worst} rows with no face showing`);
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
            const hasVb = rs.some((r) => [...unitKeys].some((k) => r.el[k] && "vb" in r.el[k]));
            for (let i = 0; i < rs.length && hasVb; i++) {
                const r = rs[i];
                if (r.el.dock?.["a:data-morphing"] == null) continue;
                const P = edges(r.el.plate);
                if (!P) continue;
                for (const k of unitKeys) {
                    const e = r.el[k];
                    if (!e || !(e.eop > 0.1) || e.vis === 0 || !e.w || !e.h) continue;
                    if (/^(summary|full)$/.test(k)) continue; // a face box spans its seats
                    const inside = e.x >= P.L - 0.5 && e.x + e.w <= P.R + 0.5 && e.y >= P.T - 0.5 && e.y + e.h <= P.B + 0.5;
                    if (inside && e.vb === 0) { hidden++; hiddenAt ||= `${k} f${sg.a + i}`; }
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
            res.overlapRows = hasVb ? overlap : null;
            res.overlapPx = +overlapPx.toFixed(1);
            if (hidden) res.viol.push(`hidden before covered in ${hidden} unit-rows (${hiddenAt})`);
            if (overlap) res.viol.push(`regions overlap in ${overlap} unit-rows, up to ${overlapPx.toFixed(1)} px (${overlapAt})`);
            // first moving row: leaving face (visible at rs[0]) move, against the plate's own step
            const p0 = edges(rs[0].el.plate), p1 = rs[1] && edges(rs[1].el.plate);
            if (p0 && p1) {
                const plateStep = Math.max(Math.abs(p1.L - p0.L), Math.abs(p1.R - p0.R), Math.abs(p1.T - p0.T), Math.abs(p1.B - p0.B));
                let faceMove = 0, faceK = "";
                for (const k of ["summary", "full"]) {
                    const a0 = rs[0].el[k], a1 = rs[1].el[k];
                    if (!a0 || !a1 || !(a0.eop > 0.1)) continue;
                    const mv = Math.max(Math.abs(a1.x - a0.x), Math.abs(a1.y - a0.y));
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
            res.viol = v;
            res.g10 = fadeInfo;
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
