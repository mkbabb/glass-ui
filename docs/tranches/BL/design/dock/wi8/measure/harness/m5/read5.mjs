// read5.mjs: MEASURE-5. read4.mjs with RU-26 and RU-27 at open rest (RULINGS-4) in place of RU-23's
// "whole or absent", for every cell with run seats, not only the seven-seat and six-control ones:
//   - the fit law, read from the rows against the room the host gives (the stage's content box,
//     the cell's width less the stage's 16 px of padding), never against the run's own port:
//     a run fits when the dock, grown by what of its seats lies outside the run's region, is no
//     wider than that room;
//   - a run that fits: every seat's visible box is its whole box, and nothing of its content lies
//     outside the run's region (the dock's extent is its content's);
//   - a horizontal run that does not fit: no seat is partial (a seat is whole or absent), and the
//     dock's extent equals the room within 1 px (RU-27).
// RU-28 deletes the compact clause.
// read4.mjs: MEASURE-4. read3.mjs with RU-21 on a removed control: hidden before covered for at most 20 ms.
// read3.mjs <rows.json[.gz]> [...] [--json]: MEASURE-3, the clauses of the five behaviours the
// second fold left unbuilt, read from probe rows (no browser). One line per file.
//   curve   inside the plate as rounded shapes (C2-6): every unit above 0.1, its clipped shape
//           (its own rounded box cut by its visible box and by its lane's rounded clip) against
//           the plate's rounded box; the largest overshoot in px (bound 0.5). Units: the run's
//           children ("kid") and its seats.
//   join    the tracked joining seat ("extra"): the largest opacity change between samples
//           16.7 ms apart (bound 0.4) and each fade's length, in and out (bound 75 ms), and
//           whether it ever appears or leaves in one row (a cut)
//   rim     the rim's box against the plate's border box in every row (bound 1 px) and its
//           fill's spread (bound 0.01)
//   whole   at open rest, the seats whole / the seats, and the run's compact flag (O-358:
//           every seat whole, no sliver)
//   ghost   a removed control, held by glass: visible until covered while above 0.1
//   held    the window's first row: every seat above 0.1 moves no more than 0.5 px (W-I.8 "From rest")
//   touch   a coarse cell's pointer log holds a touch event; the dock's class in the first row
import { readFileSync } from "node:fs";
import { gunzipSync } from "node:zlib";
const files = process.argv.slice(2).filter((f) => !f.startsWith("--"));
const json = process.argv.includes("--json");
const num = (v) => (v == null ? NaN : +v);
const radOf = (e) => { const s = String(e.rad || "0").split("|")[0].trim(); const n = parseFloat(s); return s.endsWith("%") ? (n / 100) * Math.min(e.w, e.h) : n; };
const out = [];
for (const file of files) {
    const raw = readFileSync(file);
    const d = JSON.parse((file.endsWith(".gz") ? gunzipSync(raw) : raw).toString("utf8"));
    const rows = d.rows, scen = d.meta.scenario, eng = d.meta.engine, cell = d.meta.cell.tag;
    const res = { scen, eng, cell, viol: [] };
    const morph = (r) => r.el.dock?.["a:data-morphing"] != null;
    // curve: the unit's clipped shape (W-I.8 "Inside the plate"): its own rounded box, cut by
    // its visible box (the sampler's clip through every ancestor, rectangular) and, in travel,
    // by its region's lane (`inset(... round R)`, which the sampler does not round). The
    // shape's boundary is sampled and each point inside all three is read against the plate.
    // rad: one radius, or four (top-left, top-right, bottom-right, bottom-left) as CSS writes them.
    const sd = (x, y, b, rad) => { // signed distance to a rounded box (negative inside)
        const cl = (r) => Math.max(0, Math.min(r, (b.r - b.l) / 2, (b.b - b.t) / 2));
        const [tl, tr, br, bl] = (Array.isArray(rad) ? rad : [rad, rad, rad, rad]).map(Array.isArray(rad) ? (r) => Math.max(0, r) : cl);
        for (const [cx, cy, r, sx, sy] of [[b.l + tl, b.t + tl, tl, -1, -1], [b.r - tr, b.t + tr, tr, 1, -1], [b.r - br, b.b - br, br, 1, 1], [b.l + bl, b.b - bl, bl, -1, 1]])
            if (r > 0 && (x - cx) * sx > 0 && (y - cy) * sy > 0) return Math.hypot(x - cx, y - cy) - r;
        const dx = Math.max(b.l - x, x - b.r), dy = Math.max(b.t - y, y - b.b);
        return dx > 0 || dy > 0 ? Math.hypot(Math.max(dx, 0), Math.max(dy, 0)) : Math.max(dx, dy);
    };
    const ring = (b, rad, n = 48) => { // points on a rounded box's boundary
        const pts = [], R4 = Array.isArray(rad) ? rad : [rad, rad, rad, rad];
        const cl = (r) => Math.max(0, Math.min(r, (b.r - b.l) / 2, (b.b - b.t) / 2));
        const [tl, tr, br, bl] = R4.map(cl);
        const cs = [[b.r - br, b.b - br, 0, br], [b.l + bl, b.b - bl, 90, bl], [b.l + tl, b.t + tl, 180, tl], [b.r - tr, b.t + tr, 270, tr]];
        for (const [cx, cy, a0, rr] of cs) for (let k = 0; k <= n / 4; k++) { const a = ((a0 + (90 * k) / (n / 4)) * Math.PI) / 180; pts.push([cx + rr * Math.cos(a), cy + rr * Math.sin(a)]); }
        for (let k = 1; k < 8; k++) { const fx = b.l + ((b.r - b.l) * k) / 8, fy = b.t + ((b.b - b.t) * k) / 8; pts.push([fx, b.t], [fx, b.b], [b.l, fy], [b.r, fy]); }
        return pts;
    };
    // The unit's lane: of the clipped regions, the one whose lane holds the unit's visible
    // centre (a leaving face is held out of its region's layout box, so the box cannot say).
    const laneOf = (r, e, vb) => {
        const mx = (vb.l + vb.r) / 2, my = (vb.t + vb.b) / 2;
        for (const k of ["persistent", "pend", "layers", "full", "summary"]) {
            const g = r.el[k];
            if (!g || !g.clip || !/^inset\(/.test(g.clip)) continue;
            const m = g.clip.match(/inset\(([^)]*?)(?: round ([^)]*))?\)/);
            const v = m[1].trim().split(/\s+/).map(parseFloat);
            const [it, ir, ib, il] = [v[0], v[1] ?? v[0], v[2] ?? v[0], v[3] ?? v[1] ?? v[0]];
            const b = { l: g.x + il, t: g.y + it, r: g.x + g.w - ir, b: g.y + g.h - ib };
            if (mx < b.l || mx > b.r || my < b.t || my > b.b) continue;
            // CSS scales every corner by one factor when two on a side exceed it.
            let rad = 0;
            if (m[2]) {
                const q = m[2].trim().split(/\s+/).map(parseFloat);
                const r4 = [q[0], q[1] ?? q[0], q[2] ?? q[0], q[3] ?? q[1] ?? q[0]];
                const w = b.r - b.l, h = b.b - b.t;
                const f = Math.min(1, w / Math.max(1e-9, r4[0] + r4[1]), w / Math.max(1e-9, r4[3] + r4[2]), h / Math.max(1e-9, r4[0] + r4[3]), h / Math.max(1e-9, r4[1] + r4[2]));
                rad = r4.map((r) => r * f);
            }
            return { b, rad };
        }
        return null;
    };
    let over = 0, overAt = "";
    for (let i = 0; i < rows.length; i++) {
        const r = rows[i], P = r.el.plate;
        if (!P || !P.w || !P.h) continue;
        const pb = { l: P.x, t: P.y, r: P.x + P.w, b: P.y + P.h }, Rp = Math.min(radOf(P), P.w / 2, P.h / 2);
        for (const k of Object.keys(r.el)) {
            if (!/^(kid|seat)#/.test(k)) continue;
            const e = r.el[k];
            if (!e || e.vis === 0 || e.vb === 0 || !(num(e.eop) > 0.1) || !e.w || !e.h) continue;
            const ub = { l: e.x, t: e.y, r: e.x + e.w, b: e.y + e.h }, rho = radOf(e);
            const vb = Array.isArray(e.vb) ? { l: e.vb[0], t: e.vb[1], r: e.vb[2], b: e.vb[3] } : ub;
            if (vb.r - vb.l <= 0 || vb.b - vb.t <= 0) continue;
            const lane = laneOf(r, e, vb);
            const inside = (x, y) => sd(x, y, ub, rho) <= 0.01 && sd(x, y, vb, 0) <= 0.01 && (!lane || sd(x, y, lane.b, lane.rad) <= 0.01);
            const pts = [...ring(ub, rho), ...ring(vb, 0), ...(lane ? ring(lane.b, lane.rad) : [])];
            for (const [x, y] of pts) {
                if (!inside(x, y)) continue;
                const o = sd(x, y, pb, Rp);
                if (o > over) { over = o; overAt = `${k} row ${i}${morph(r) ? " (travel)" : " (rest)"}`; }
            }
        }
    }
    res.curve = +over.toFixed(2);
    if (over > 0.5) res.viol.push(`content ${over.toFixed(2)} px outside the plate's curve (${overAt})`);
    // held: W-I.8 "From rest": in the first row of a window (the row [data-morphing] appears),
    // every unit above 0.1 in that row and the row before moves no more than 0.5 px.
    {
        let worst = 0, at = "";
        for (let i = 1; i < rows.length; i++) {
            if (/-rm$/.test(cell)) break; // R-11: geometry lands in one frame
            if (!morph(rows[i]) || morph(rows[i - 1])) continue;
            // Seats only: a run child that is a group's wrapper paints nothing, and its box
            // takes the new face's size in layout.
            for (const k of Object.keys(rows[i].el)) {
                if (!/^seat#/.test(k)) continue;
                const a = rows[i - 1].el[k], b = rows[i].el[k];
                if (!a || !b || a.vis === 0 || b.vis === 0 || a.vb === 0 || b.vb === 0 || !a.w || !b.w) continue;
                if (!(num(a.eop) > 0.1) || !(num(b.eop) > 0.1)) continue;
                const m = Math.max(Math.abs(b.x - a.x), Math.abs(b.y - a.y), Math.abs(b.x + b.w - a.x - a.w), Math.abs(b.y + b.h - a.y - a.h));
                if (m > worst) { worst = m; at = `${k} row ${i}`; }
            }
        }
        res.held = +worst.toFixed(2);
        if (worst > 0.5) res.viol.push(`a unit moves ${worst.toFixed(2)} px in the window's first row (${at})`);
    }
    // ghost: a control the host removed is held where it painted and is visible until the
    // plate covers it (W-I.8 "Visible until covered"): above 0.1 with its box inside the
    // plate's painted box, its visible box is not empty.
    {
        let rowsHidden = 0, seen = 0, at = "";
        for (let i = 0; i < rows.length; i++) {
            const P = rows[i].el.plate;
            if (!P) continue;
            for (const k of Object.keys(rows[i].el)) {
                if (!/^ghost#/.test(k)) continue;
                const g = rows[i].el[k];
                if (!g || !(num(g.eop) > 0.1)) continue;
                seen++;
                const inside = g.x >= P.x - 0.5 && g.x + g.w <= P.x + P.w + 0.5 && g.y >= P.y - 0.5 && g.y + g.h <= P.y + P.h + 0.5;
                // RU-21: hidden early by at most 20 ms before the plate covers it.
                if (inside && (g.vb === 0 || g.vis === 0)) {
                    let j = i; while (j < rows.length && rows[j].el[k] && rows[j].el.plate) {
                        const h = rows[j].el[k], Q = rows[j].el.plate;
                        const inn = h.x >= Q.x - 0.5 && h.x + h.w <= Q.x + Q.w + 0.5 && h.y >= Q.y - 0.5 && h.y + h.h <= Q.y + Q.h + 0.5;
                        if (!inn || !(num(h.eop) > 0.1)) break; j++;
                    }
                    const end = rows[Math.min(j, rows.length - 1)].t;
                    if (end - rows[i].t > 20) { rowsHidden++; if (!at) at = `${k} row ${i} (${(end - rows[i].t).toFixed(1)} ms)`; }
                }
            }
        }
        if (seen) res.ghost = { rows: seen, hidden: rowsHidden };
        if (rowsHidden) res.viol.push(`a removed control hidden before covered in ${rowsHidden} rows (${at})`);
    }
    // join
    if (rows.some((r) => "extra" in r.el)) {
        const op = (r) => { const e = r.el.extra; return !e || e.vis === 0 ? 0 : num(e.eop ?? e.op); };
        let step = 0, cuts = 0;
        for (let i = 1; i < rows.length; i++) {
            let j = i - 1; while (j > 0 && rows[i].t - rows[j].t < 16.2) j--;
            if (rows[i].t - rows[j].t <= 21) step = Math.max(step, Math.abs(op(rows[i]) - op(rows[j])));
            if (Math.abs(op(rows[i]) - op(rows[i - 1])) > 0.9) cuts++;
        }
        // fades: maximal monotone runs between 0 and 1
        const fades = [];
        let a = null;
        for (let i = 1; i < rows.length; i++) {
            const p = op(rows[i - 1]), c = op(rows[i]);
            if (a === null && ((p <= 0.01 && c > 0.01) || (p >= 0.99 && c < 0.99))) a = { i: i - 1, dir: c > p ? "in" : "out" };
            if (a && ((a.dir === "in" && c >= 0.99) || (a.dir === "out" && c <= 0.01))) { fades.push(`${a.dir} ${Math.round(rows[i].t - rows[a.i].t)}ms`); a = null; }
        }
        res.join = { step: +step.toFixed(2), cuts, fades: fades.join(" ") };
        if (step > 0.4) res.viol.push(`joining seat steps ${step.toFixed(2)} in 16.7 ms`);
        if (cuts) res.viol.push(`joining seat cut in ${cuts} rows`);
        for (const f of fades) if (+f.split(" ")[1].replace("ms", "") < 75) res.viol.push(`joining seat fade ${f} (bound 75 ms)`);
        if (fades.length < 2) res.viol.push(`joining seat: ${fades.length} fades read, two expected`);
    }
    // rim
    if (rows.some((r) => r.el.rim)) {
        let dev = 0, lo = Infinity, hi = -Infinity;
        for (const r of rows) {
            const q = r.el.rim, P = r.el.plate;
            if (!q || !P) continue;
            dev = Math.max(dev, Math.abs(q.x - P.x), Math.abs(q.y - P.y), Math.abs(q.x + q.w - P.x - P.w), Math.abs(q.y + q.h - P.y - P.h));
            const f = parseFloat(q["p:--scroll-progress-rim-fill"]);
            if (Number.isFinite(f)) { lo = Math.min(lo, f); hi = Math.max(hi, f); }
        }
        res.rim = { dev: +dev.toFixed(2), fill: `${lo}..${hi}%` };
        if (dev > 1) res.viol.push(`rim ${dev.toFixed(2)} px off the plate's edge`);
        if (hi - lo > 1) res.viol.push(`rim fill moves ${lo}..${hi}%`);
    }
    // whole (RU-26, RU-27): every open rest, its last row.
    {
        const room = d.meta.cell.w - 16;
        let worst = null, bad = [];
        const rest = (r) => !morph(r) && String(r.el.dock?.["a:class"] || "").includes("expanded");
        for (let i = 0; i < rows.length; i++) {
            const r = rows[i];
            if (!rest(r) || (i + 1 < rows.length && rest(rows[i + 1]))) continue; // the last row of each open rest
            const vert = /\bvertical\b/.test(String(r.el.dock?.["a:class"] || ""));
            const D = r.el.dock, Lr = r.el.layers;
            const seats = Object.keys(r.el).filter((k) => /^seat#/.test(k)).map((k) => r.el[k]).filter((e) => e && e.vis !== 0 && e.w > 0.5 && e.h > 0.5);
            if (!seats.length || !D || !Lr || !Lr.w) continue;
            const s0 = Math.min(...seats.map((e) => (vert ? e.y : e.x))), s1 = Math.max(...seats.map((e) => (vert ? e.y + e.h : e.x + e.w)));
            const g0 = vert ? Lr.y : Lr.x, g1 = vert ? Lr.y + Lr.h : Lr.x + Lr.w;
            const over = Math.max(0, g0 - s0) + Math.max(0, s1 - g1);
            const ext = vert ? D.h : D.w;
            const fits = vert || ext + over <= room + 0.5;
            const isWhole = (e) => Array.isArray(e.vb) && e.vb[2] - e.vb[0] >= e.w - 0.5 && e.vb[3] - e.vb[1] >= e.h - 0.5;
            const whole = seats.filter(isWhole).length;
            const partial = seats.filter((e) => Array.isArray(e.vb) && !isWhole(e)).map((e) => +Math.min(e.vb[2] - e.vb[0], e.vb[3] - e.vb[1]).toFixed(2));
            const rec = { row: i, fits, whole, of: seats.length, partial, absent: seats.length - whole - partial.length, ext: +ext.toFixed(1), over: +over.toFixed(1), room };
            worst = rec;
            if (fits && (whole < seats.length || over > 0.5)) bad.push(`row ${i}: a run that fits shows ${whole} of ${seats.length} seats whole (partial ${JSON.stringify(partial)}), ${over.toFixed(1)} px of its content outside its region`);
            if (!fits && partial.length) bad.push(`row ${i}: a run that does not fit has a partial seat ${JSON.stringify(partial)}`);
            if (!fits && !vert && Math.abs(ext - room) > 1) bad.push(`row ${i}: a run that does not fit rests ${ext.toFixed(1)} px wide in a room of ${room}`);
        }
        if (worst) res.whole = worst;
        if (/-(many|ctl6)-/.test(scen) && !worst) res.viol.push("no open rest read");
        if (bad.length) res.viol.push(`at open rest: ${bad[0]}${bad.length > 1 ? ` (+${bad.length - 1} rests)` : ""}`);
    }
    // G-6: after the first hover of a seat the root and the plate do not move (0 px)
    if (/-hover-/.test(scen)) {
        const m0 = (d.marks || []).find((m) => /^in-/.test(m.name));
        const i0 = m0 ? (m0.row ?? m0.i ?? m0.frame) : 0;
        let mv = 0;
        const b0 = rows[i0]?.el;
        for (let i = i0; i < rows.length && b0; i++) for (const k of ["dock", "plate"]) { const a = b0[k], b = rows[i].el[k]; if (a && b) mv = Math.max(mv, Math.abs(a.x - b.x), Math.abs(a.y - b.y), Math.abs(a.w - b.w), Math.abs(a.h - b.h)); }
        res.still = +mv.toFixed(2);
        if (mv > 0) res.viol.push(`the root or plate moves ${mv.toFixed(2)} px under a hover`);
    }
    // R-2: a dock with no folded face rests open where nothing can hover
    if (/^p3-fold-transport-coarse/.test(scen)) {
        const c = String(rows[0]?.el.dock?.["a:class"] || "");
        res.restsOpen = c.includes("expanded");
        if (!res.restsOpen) res.viol.push(`keyframes's transport is folded under touch (${c})`);
    }
    // touch
    if (d.meta.cell.pointer === "coarse") {
        res.touch = (d.ptrLog || []).some((e) => e.pt === "touch");
        if (!res.touch) res.viol.push("coarse cell with no touch event");
    }
    res.firstClass = rows[0]?.el.dock?.["a:class"] ?? null;
    out.push(res);
}
if (json) console.log(JSON.stringify(out, null, 1));
else for (const r of out) console.log(`${r.scen} | ${r.eng} | ${r.cell} | curve ${r.curve}${r.held != null ? ` | held ${r.held}` : ""}${r.ghost ? ` | ghost ${JSON.stringify(r.ghost)}` : ""}${r.join ? ` | join ${JSON.stringify(r.join)}` : ""}${r.rim ? ` | rim ${JSON.stringify(r.rim)}` : ""}${r.whole ? ` | whole ${JSON.stringify(r.whole)}` : ""}${r.touch != null ? ` | touch ${r.touch}` : ""}${r.still != null ? ` | still ${r.still}` : ""}${r.restsOpen != null ? ` | restsOpen ${r.restsOpen}` : ""} | ${r.viol.length ? "FAIL: " + r.viol.join("; ") : "pass"}`);
