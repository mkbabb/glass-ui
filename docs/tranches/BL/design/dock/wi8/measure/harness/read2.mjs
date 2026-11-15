// read2.mjs <rows.json[.gz]> [...]: FOLD-2, the clauses the second challenge adds, read
// from probe rows (no browser). Per file:
//   weak     the longest run (ms) in which the strongest face on the plate is under 0.3,
//            inside a travel (the restated blank-plate bound: 50 ms)
//   both     the largest value both faces hold at once (never both above 0.5)
//   fade     the largest change of a face between samples 16.7 ms apart (bound 0.4)
//   return   across a return-* mark: the largest move in one row of any face above 0.1,
//            and the longest the face returned to falls or holds (bound 0.5 px, 34 ms)
//   tail     the window's close after the plate is within 0.5 px of rest
//   touch    a coarse cell's pointer log holds a touch event
import { readFileSync } from "node:fs";
import { gunzipSync } from "node:zlib";
const files = process.argv.slice(2).filter((f) => !f.startsWith("--"));
const num = (v) => (v == null ? NaN : +v);
for (const file of files) {
    const raw = readFileSync(file);
    const d = JSON.parse((file.endsWith(".gz") ? gunzipSync(raw) : raw).toString("utf8"));
    const rows = d.rows, eng = d.meta.engine, scen = d.meta.scenario, cell = d.meta.cell.tag;
    const marks = (d.marks || []).map((m) => ({ name: m.name, i: m.frame ?? m.row ?? m.i, t: m.t }));
    // The faces: a crossfade's faces when tracked, else the two posture faces.
    const facesOf = (r) => {
        // A group's faces stand for the open face they sit in (their effective opacity
        // carries it); the folded face is always one of the faces.
        const fk = Object.keys(r.el).filter((k) => /^face#/.test(k));
        const out = fk.map((k) => (r.el[k] && r.el[k].vis !== 0 ? num(r.el[k].eop ?? r.el[k].op) : 0));
        for (const k of fk.length ? ["summary"] : ["full", "summary"]) { const x = r.el[k]; if (x) out.push(x.vis === 0 ? 0 : num(x.eop ?? x.op)); }
        return out;
    };
    const facePos = (r) => Object.keys(r.el).filter((k) => /^face#/.test(k)).map((k) => (r.el[k] ? [r.el[k].x, r.el[k].y, num(r.el[k].eop ?? r.el[k].op)] : null));
    const morph = (r) => r.el.dock?.["a:data-morphing"] != null;
    let weak = 0, weakAt = null, run0 = null, both = 0, fade = 0;
    for (let i = 0; i < rows.length; i++) {
        const r = rows[i];
        const fs = facesOf(r).filter((v) => Number.isFinite(v));
        if (!fs.length) continue;
        const top = Math.max(...fs);
        const sorted = [...fs].sort((a, b) => b - a);
        if (sorted.length > 1 && morph(r)) both = Math.max(both, sorted[1]);
        if (morph(r) && top < 0.3) { run0 ??= r.t; const len = r.t - run0 + (rows[i + 1] ? rows[i + 1].t - r.t : 0); if (len > weak) { weak = len; weakAt = Math.round(run0); } }
        else run0 = null;
        // fade: against the sample nearest 16.7 ms earlier
        let j = i - 1;
        while (j > 0 && r.t - rows[j].t < 16.2) j--;
        if (j >= 0 && r.t - rows[j].t <= 21) {
            const prev = facesOf(rows[j]);
            const cur = facesOf(r);
            for (let k = 0; k < cur.length; k++) if (Number.isFinite(cur[k]) && Number.isFinite(prev[k])) fade = Math.max(fade, Math.abs(cur[k] - prev[k]));
        }
    }
    // the window's tail, per travel
    const tails = [];
    let open = null;
    for (let i = 1; i < rows.length; i++) {
        if (morph(rows[i]) && !morph(rows[i - 1])) open = i;
        if (!morph(rows[i]) && morph(rows[i - 1]) && open !== null) {
            const fin = rows[i].el.plate;
            let landed = null;
            for (let q = open; q < i; q++) { const p = rows[q].el.plate; if (p && Math.abs(p.w - fin.w) <= 0.5 && Math.abs(p.h - fin.h) <= 0.5 && Math.abs(p.x - fin.x) <= 0.5 && Math.abs(p.y - fin.y) <= 0.5) { landed = q; break; } }
            if (landed !== null) tails.push(Math.round(rows[i].t - rows[landed].t));
            open = null;
        }
    }
    const res = { weakMs: +weak.toFixed(0), weakAt, both: +both.toFixed(2), fade: +fade.toFixed(2), tails };
    const ret = marks.find((m) => /^return-/.test(m.name));
    if (ret) {
        let maxMove = 0, moveAt = null;
        for (let i = ret.i + 1; i < Math.min(rows.length, ret.i + 30); i++) {
            const a = facePos(rows[i - 1]), b = facePos(rows[i]);
            for (let k = 0; k < b.length; k++) {
                if (!a[k] || !b[k] || !(a[k][2] > 0.1 && b[k][2] > 0.1)) continue;
                const mv = Math.hypot(b[k][0] - a[k][0], b[k][1] - a[k][1]);
                if (mv > maxMove) { maxMove = mv; moveAt = Math.round(rows[i].t - rows[ret.i].t); }
            }
        }
        // the face returned to: the one that ends at 1
        const lastF = facesOf(rows[rows.length - 1]);
        const k = lastF.indexOf(Math.max(...lastF));
        res.atMark = +facesOf(rows[ret.i])[k].toFixed(2);
        let stall = 0, s0 = null, dip = 0;
        const series = [];
        for (let i = ret.i; i < Math.min(rows.length, ret.i + 40); i++) {
            const v = facesOf(rows[i])[k], p = facesOf(rows[i - 1])[k];
            series.push(+v.toFixed(2));
            if (v >= 0.995) break;
            if (v <= p + 0.002) { s0 ??= rows[i - 1].t; stall = Math.max(stall, rows[i].t - s0); if (v < p) dip = Math.max(dip, p - v); } else s0 = null;
        }
        res.ret = { maxMovePx: +maxMove.toFixed(2), moveAtMs: moveAt, stallMs: +stall.toFixed(0), dip: +dip.toFixed(2), series: series.slice(0, 14).join(" ") };
    }
    if (/coarse/.test(cell)) {
        const pts = new Set((d.ptrLog || []).map((p) => p.pt));
        res.touch = pts.has("touch");
        res.pinned = /\bpinned\b/.test(rows[Math.floor(rows.length / 2)].el.dock?.["a:class"] || "");
    }
    console.log(`${scen.padEnd(28)} ${eng.padEnd(8)} ${JSON.stringify(res)}`);
}
