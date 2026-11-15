// read3.mjs <rows.json[.gz]> [...] [--json]: MEASURE-3, the clauses of the five behaviours the
// second fold left unbuilt, read from probe rows (no browser). One line per file.
//   curve   inside the plate as rounded shapes (C2-6): at rest every unit, and in travel every
//           unit its lane does not clip, read as its own rounded box (its corner) against the
//           plate's rounded box; the largest overshoot in px (bound 0.5). Units: the run's
//           children ("kid") and its seats.
//   join    the tracked joining seat ("extra"): the largest opacity change between samples
//           16.7 ms apart (bound 0.4) and each fade's length, in and out (bound 75 ms), and
//           whether it ever appears or leaves in one row (a cut)
//   rim     the rim's box against the plate's border box in every row (bound 1 px) and its
//           fill's spread (bound 0.01)
//   whole   at open rest, the seats whole / the seats, and the run's compact flag (O-358:
//           every seat whole, no sliver)
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
    // curve
    let over = 0, overAt = "";
    for (let i = 0; i < rows.length; i++) {
        const r = rows[i], P = r.el.plate;
        if (!P || !P.w || !P.h) continue;
        const Rp = Math.min(radOf(P), P.w / 2, P.h / 2);
        const inner = { l: P.x + Rp, t: P.y + Rp, r: P.x + P.w - Rp, b: P.y + P.h - Rp };
        for (const k of Object.keys(r.el)) {
            if (!/^(kid|seat)#/.test(k)) continue;
            const e = r.el[k];
            if (!e || e.vis === 0 || !(num(e.eop) > 0.1) || !e.w || !e.h) continue;
            const clipped = Array.isArray(e.vb) && (Math.abs(e.vb[0] - e.x) > 0.5 || Math.abs(e.vb[2] - (e.x + e.w)) > 0.5 || Math.abs(e.vb[1] - e.y) > 0.5 || Math.abs(e.vb[3] - (e.y + e.h)) > 0.5);
            if (morph(r) && clipped) continue;
            if (e.vb === 0) continue;
            const rho = Math.min(radOf(e), e.w / 2, e.h / 2, Rp);
            for (const [cx, cy] of [[e.x + rho, e.y + rho], [e.x + e.w - rho, e.y + rho], [e.x + rho, e.y + e.h - rho], [e.x + e.w - rho, e.y + e.h - rho]]) {
                const dx = Math.max(inner.l - cx, 0, cx - inner.r), dy = Math.max(inner.t - cy, 0, cy - inner.b);
                const o = Math.hypot(dx, dy) - (Rp - rho);
                if (o > over) { over = o; overAt = `${k} row ${i}${morph(r) ? " (travel)" : " (rest)"}`; }
            }
        }
    }
    res.curve = +over.toFixed(2);
    if (over > 0.5) res.viol.push(`content ${over.toFixed(2)} px outside the plate's curve (${overAt})`);
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
    // whole
    if (/-(many|ctl6)-/.test(scen)) {
        let best = null;
        for (const r of rows) {
            if (morph(r) || !String(r.el.dock?.["a:class"] || "").includes("expanded")) continue;
            const seats = Object.keys(r.el).filter((k) => /^seat#/.test(k)).map((k) => r.el[k]).filter(Boolean);
            const whole = seats.filter((e) => Array.isArray(e.vb) && e.vb[2] - e.vb[0] >= e.w - 0.5 && e.vb[3] - e.vb[1] >= e.h - 0.5).length;
            best = { whole, of: seats.length, compact: r.el.full?.["a:data-compact"] != null };
        }
        res.whole = best;
        if (!best) res.viol.push("no open rest read");
        else if (best.whole < best.of) res.viol.push(`${best.whole} of ${best.of} seats whole at open rest (compact ${best.compact})`);
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
    // O-358: at 390 and 360 the seats with the name do not fit, so the run is compact
    if (/-many-(coarse|c360)/.test(scen) && res.whole && !res.whole.compact) res.viol.push("the run is not compact where its seats with the name do not fit");
    // touch
    if (d.meta.cell.pointer === "coarse") {
        res.touch = (d.ptrLog || []).some((e) => e.pt === "touch");
        if (!res.touch) res.viol.push("coarse cell with no touch event");
    }
    res.firstClass = rows[0]?.el.dock?.["a:class"] ?? null;
    out.push(res);
}
if (json) console.log(JSON.stringify(out, null, 1));
else for (const r of out) console.log(`${r.scen} | ${r.eng} | ${r.cell} | curve ${r.curve}${r.join ? ` | join ${JSON.stringify(r.join)}` : ""}${r.rim ? ` | rim ${JSON.stringify(r.rim)}` : ""}${r.whole ? ` | whole ${JSON.stringify(r.whole)}` : ""}${r.touch != null ? ` | touch ${r.touch}` : ""}${r.still != null ? ` | still ${r.still}` : ""}${r.restsOpen != null ? ` | restsOpen ${r.restsOpen}` : ""} | ${r.viol.length ? "FAIL: " + r.viol.join("; ") : "pass"}`);
