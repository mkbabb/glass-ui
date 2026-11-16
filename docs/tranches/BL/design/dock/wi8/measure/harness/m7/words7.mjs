// words7.mjs: MEASURE-7 (RU-64 step 1): words.mjs with judge7's per-row bound in place of its fixed 12 %: a neighbour's
// one-row step is bounded by 1.15 times what springPreset("dock") covers at that row's own length (capped at 33 ms),
// over 0.25 px, the bound G-2 reads on every edge (judge7.mjs, anyB).
// words.mjs <rows.json[.gz]> ...: MEASURE-6, RULINGS-4's clarification of RU-28 read on w-words: a worded Select
// trigger whose value changes to a longer word (and back) keeps its own width, and its neighbours are carried on
// the clock, not moved in one row. Per mark (add-longer, add-shorter): each other seat whose painted left edge
// travels more than 2 px moves on 3 rows or more and its largest one-row step is no more than 12 % of its travel
// (G-2's largest-step bound, L-1); the changed seat's width changes (it keeps its own width).
import { readFileSync } from "node:fs";
import { gunzipSync } from "node:zlib";
const sp = readFileSync("/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8/src/composables/motion/spring/springPresets.ts", "utf8");
const mm = /name: "dock",\s*response: ([\d.]+),\s*dampingFraction: ([\d.]+)/.exec(sp);
const RESP = +mm[1], ZETA = +mm[2];
const W0 = (2 * Math.PI) / RESP, WD = W0 * Math.sqrt(1 - ZETA * ZETA);
const prog = (t) => 1 - Math.exp(-ZETA * W0 * t) * (Math.cos(WD * t) + ((ZETA * W0) / WD) * Math.sin(WD * t));
const cache = new Map();
const anyB = (dt) => { const k = Math.round(Math.min(dt, 33) * 10); if (!cache.has(k)) { let mx = 0; for (let t = 0; t < 1.5; t += 0.0005) mx = Math.max(mx, prog(t + k / 10000) - prog(t)); cache.set(k, 1.15 * mx); } return cache.get(k); };
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
            const pts = rs.map((r) => ({ x: r.el[k]?.x, t: r.t })).filter((p) => p.x != null);
            const xs = pts.map((p) => p.x);
            const travel = Math.abs(xs[xs.length - 1] - xs[0]);
            let max = 0, moving = 0, over = 0;
            for (let q = 1; q < xs.length; q++) {
                const s = Math.abs(xs[q] - xs[q - 1]); if (s > 0.005) moving++; max = Math.max(max, s);
                const b = anyB(pts[q].t - pts[q - 1].t);
                if (travel > 2 && s / travel > b + 1e-9 && (s / travel - b) * travel > 0.25) over++;
            }
            per[k] = { travel: +travel.toFixed(1), rows: moving, maxStep: travel ? +(max / travel * 100).toFixed(1) : 0, overRowBound: over };
            if (travel > 2 && (moving < 3 || over > 0)) pass = false;
        }
        const grew = Math.abs((w1 ?? 0) - (w0 ?? 0));
        if (!(grew > 2)) pass = false;
        res.push({ mark: m.name, from: m.from ?? (m.inPage ? "page" : "mark"), changedWidth: `${w0} -> ${w1}`, per });
    });
    console.log(`${pass ? "pass" : "FAIL"} ${f.split("/").pop()}: ${JSON.stringify(res)}`);
}
