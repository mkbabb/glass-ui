// judge.mjs <rows.json> [...]: applies W-I.8's bounds (G-2 to G-6) to probe rows and prints
// one line per motion segment. The bounds come from springPreset("dock") (response 0.3,
// damping 0.88, read from the worktree's springPresets.ts) at each row's own frame length.
import { readFileSync } from "node:fs";
const src = readFileSync("/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8/src/composables/motion/spring/springPresets.ts", "utf8");
const m = /name: "dock",\s*response: ([\d.]+),\s*dampingFraction: ([\d.]+)/.exec(src);
const RESP = +m[1], ZETA = +m[2];
const W0 = (2 * Math.PI) / RESP, WD = W0 * Math.sqrt(1 - ZETA * ZETA);
const prog = (t) => 1 - Math.exp(-ZETA * W0 * t) * (Math.cos(WD * t) + ((ZETA * W0) / WD) * Math.sin(WD * t));
const firstBound = (dt) => Math.min(0.04, 1.15 * prog(dt / 1000));
function anyBound(dt) {
    let mx = 0;
    for (let t = 0; t < 1.5; t += 0.001) mx = Math.max(mx, prog(t + dt / 1000) - prog(t));
    return 1.15 * mx;
}
const anyCache = new Map();
const anyB = (dt) => {
    const k = Math.round(dt * 10);
    if (!anyCache.has(k)) anyCache.set(k, anyBound(dt));
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
        const revMark = marks.find((mk) => /^reverse/.test(mk.name) && mk.i >= sg.a && mk.i <= sg.b);
        const res = { scen, tree, eng, cell, rows: `f${sg.a}-f${sg.b}`, ms: +(rows[sg.b].t - rows[sg.a].t).toFixed(0), edges: {}, viol: [] };
        for (const k of ["L", "R", "T", "B"]) {
            const v = rs.map((r) => edges(r.el.plate)?.[k]);
            const first = v[0], last = v[v.length - 1];
            const travel = revMark ? Math.max(...v) - Math.min(...v) : Math.abs(last - first);
            if (!(travel > 0.5)) continue;
            const dir = revMark ? Math.sign(v[Math.max(0, revMark.i - sg.a)] - first) : Math.sign(last - first);
            let firstStep = null, maxPct = 0, maxAt = 0, rev = 0, revPx = 0, lastStep = null, lastPct = 0;
            const steps = [];
            for (let i = 1; i < v.length; i++) {
                const s = v[i] - v[i - 1];
                const dt = rs[i].t - rs[i - 1].t;
                if (Math.abs(s) < 0.01) continue;
                steps.push({ i: sg.a + i, s, dt });
            }
            if (!steps.length) continue;
            // the travel used for percentages: for a reversal, the larger leg
            let span = Math.max(travel, Math.max(...v) - Math.min(...v));
            if (revMark && fullTravel[k]) span = fullTravel[k];
            if (!revMark) fullTravel[k] = Math.max(fullTravel[k] || 0, travel);
            const f = steps[0];
            firstStep = Math.abs(f.s) / span;
            const fb = firstBound(f.dt);
            if (firstStep > fb + 1e-9) res.viol.push(`${k} first ${(firstStep * 100).toFixed(1)}% > ${(fb * 100).toFixed(1)}% (f${f.i}, ${f.dt.toFixed(1)} ms)`);
            for (const st of steps) {
                const p = Math.abs(st.s) / span;
                if (p > maxPct) (maxPct = p), (maxAt = st.i);
                const ab = anyB(st.dt);
                if (p > ab + 1e-9) res.viol.push(`${k} step ${(p * 100).toFixed(1)}% > ${(ab * 100).toFixed(1)}% (f${st.i}, ${st.dt.toFixed(1)} ms)`);
                if (!revMark && Math.sign(st.s) !== dir && Math.abs(st.s) > 0.05) (rev++, (revPx += Math.abs(st.s)));
            }
            const ls = steps[steps.length - 1];
            lastStep = Math.abs(ls.s);
            lastPct = lastStep / span;
            if (lastStep > 1 || lastPct > 0.02) res.viol.push(`${k} last ${lastStep.toFixed(2)} px (${(lastPct * 100).toFixed(1)}%, f${ls.i})`);
            if (rev) res.viol.push(`${k} ${rev} steps against travel (${revPx.toFixed(2)} px)`);
            if (revMark) {
                // frames from the reversal mark to the first step against the old direction
                const turn = steps.find((st) => st.i > revMark.i && Math.sign(st.s) !== dir);
                res.turn = res.turn ?? {};
                res.turn[k] = turn ? turn.i - revMark.i : null;
                if (turn && turn.i - revMark.i > 2) res.viol.push(`${k} turns ${turn.i - revMark.i} frames after the reversal`);
                // velocity change across the turn against the spring's own largest change in one frame
                const vs = steps.map((st) => st.s / st.dt);
                let jump = 0;
                for (let q = 1; q < steps.length; q++) if (steps[q].i >= revMark.i && steps[q].i <= revMark.i + 4) jump = Math.max(jump, Math.abs(vs[q] - vs[q - 1]) / span);
                res.turn[k + "dv"] = +(jump * 1000).toFixed(2);
            }
            res.edges[k] = { travel: +travel.toFixed(1), first: +(firstStep * 100).toFixed(1), max: +(maxPct * 100).toFixed(1), maxAt, last: +lastStep.toFixed(2), rev };
        }
        // Corners: the two corners of an end equal; a capsule stays a capsule.
        let cornerBad = 0, capsuleBad = 0;
        for (const r of rs) {
            const p = r.el.plate;
            if (!p || !p.rad) continue;
            const c = p.rad.split("|").map((s) => parseFloat(s));
            const isPct = /%/.test(p.rad);
            if (isPct) continue;
            if (Math.abs(c[0] - c[3]) > 0.25 || Math.abs(c[1] - c[2]) > 0.25) cornerBad++;
            if (/shape-pill/.test(r.el.dock?.["a:class"] || "") && !r.el.seatplate?.w && Math.min(...c) < Math.min(p.w, p.h) / 2 - 0.5 && !/\//.test(p.rad)) capsuleBad++;
        }
        if (cornerBad) res.viol.push(`corners unequal in ${cornerBad} rows`);
        if (capsuleBad) res.viol.push(`not a capsule in ${capsuleBad} rows`);
        // Opacity: the faces and seats, per 60 Hz sample.
        const opCh = new Set();
        for (const r of rs) for (const [k, e] of Object.entries(r.el)) if (e && e.eop != null && /^(summary|full|face|seat|beside|pop)/.test(k)) opCh.add(k);
        let opWorst = 0, opWorstK = "", fades = {};
        for (const k of opCh) {
            const v = rs.map((r) => ({ t: r.t, o: num(r.el[k]?.eop) })).filter((x) => !Number.isNaN(x.o));
            for (let i = 0; i < v.length; i++) {
                let j = i;
                while (j + 1 < v.length && v[j + 1].t - v[i].t <= 17.5) j++;
                const dv = Math.abs(v[j].o - v[i].o);
                if (dv > opWorst) (opWorst = dv), (opWorstK = `${k} f${sg.a + i}`);
            }
            const mid = v.filter((x) => x.o > 0.02 && x.o < 0.98).length;
            const moved = Math.abs(v[v.length - 1].o - v[0].o) > 0.5;
            if (moved) fades[k] = mid;
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
                if (worst > 2) res.viol.push(`${worst} rows with no face showing`);
            }
        }
        res.opMax = +opWorst.toFixed(2);
        res.opAt = opWorstK;
        res.fades = fades;
        if (opWorst > 0.4) res.viol.push(`opacity ${opWorst.toFixed(2)} in 60 Hz at ${opWorstK}`);
        for (const [k, n] of Object.entries(fades)) if (n < 5) res.viol.push(`${k} fade has ${n} samples`);
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
                if (Math.abs(xs[xs.length - 1].o - xs[0].o) > 0.5 && (vals + 1 < 3 || dur > 144 || dur < 40)) v.push(`${k} fade ${vals + 1} values over ${dur.toFixed(0)} ms`);
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
