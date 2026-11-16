// words.mjs <rows.json[.gz]> ...: MEASURE-6, RULINGS-4's clarification of RU-28 read on w-words: a worded Select
// trigger whose value changes to a longer word (and back) keeps its own width, and its neighbours are carried on
// the clock, not moved in one row. Per mark (add-longer, add-shorter): each other seat whose painted left edge
// travels more than 2 px moves on 3 rows or more and its largest one-row step is no more than 12 % of its travel
// (G-2's largest-step bound, L-1); the changed seat's width changes (it keeps its own width).
import { readFileSync } from "node:fs";
import { gunzipSync } from "node:zlib";
for (const f of process.argv.slice(2)) {
    const raw = readFileSync(f);
    const d = JSON.parse((f.endsWith(".gz") ? gunzipSync(raw) : raw).toString());
    const res = [];
    let pass = true;
    const marks = d.marks || [];
    marks.forEach((m, j) => {
        const a = m.frame, b = marks[j + 1]?.frame ?? d.rows.length;
        const rs = d.rows.slice(Math.max(0, a - 1), b);
        const keys = Object.keys(rs[0]?.el || {}).filter((k) => /^seat#/.test(k));
        const w0 = rs[0].el["seat#1"]?.w, w1 = rs[rs.length - 1].el["seat#1"]?.w;
        const per = {};
        for (const k of keys) {
            if (k === "seat#1") continue;
            const xs = rs.map((r) => r.el[k]?.x).filter((x) => x != null);
            const travel = Math.abs(xs[xs.length - 1] - xs[0]);
            let max = 0, moving = 0;
            for (let q = 1; q < xs.length; q++) { const s = Math.abs(xs[q] - xs[q - 1]); if (s > 0.005) moving++; max = Math.max(max, s); }
            per[k] = { travel: +travel.toFixed(1), rows: moving, maxStep: travel ? +(max / travel * 100).toFixed(1) : 0 };
            if (travel > 2 && (moving < 3 || max / travel > 0.12 + 0.25 / travel)) pass = false;
        }
        const grew = Math.abs((w1 ?? 0) - (w0 ?? 0));
        if (!(grew > 2)) pass = false;
        res.push({ mark: m.name, from: m.from ?? (m.inPage ? "page" : "mark"), changedWidth: `${w0} -> ${w1}`, per });
    });
    console.log(`${pass ? "pass" : "FAIL"} ${f.split("/").pop()}: ${JSON.stringify(res)}`);
}
