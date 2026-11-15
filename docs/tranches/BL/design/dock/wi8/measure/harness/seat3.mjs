// seat3.mjs: seat.mjs with gz rows and RU-19 (a): a bound fails only when over it by more than
// 0.25 px as well; a reduced-motion cell is read by R-11 (the seats land in one row).
// seat.mjs <rows.json...>: G-4's open-seat cells. For each mark window, each run seat whose
// painted box moves is judged on its main-axis edge with the bounds in time (from rest, any
// row, landing, no reversal outside a retarget), and the plate's box is read (it must not
// move when the two names have the same width). Bounds from springPreset("dock").
import { readFileSync } from "node:fs";
import { gunzipSync } from "node:zlib";
const FLOOR = 0.25;
const src = readFileSync("/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8/src/composables/motion/spring/springPresets.ts", "utf8");
const m = /name: "dock",\s*response: ([\d.]+),\s*dampingFraction: ([\d.]+)/.exec(src);
const RESP = +m[1], ZETA = +m[2];
const W0 = (2 * Math.PI) / RESP, WD = W0 * Math.sqrt(1 - ZETA * ZETA);
const prog = (t) => 1 - Math.exp(-ZETA * W0 * t) * (Math.cos(WD * t) + ((ZETA * W0) / WD) * Math.sin(WD * t));
const anyB = (dt) => { let mx = 0; const d = Math.min(dt, 33) / 1000; for (let t = 0; t < 1.5; t += 0.0005) mx = Math.max(mx, prog(t + d) - prog(t)); return 1.15 * mx; };
for (const f of process.argv.slice(2)) {
    const raw = readFileSync(f);
    const d = JSON.parse((f.endsWith(".gz") ? gunzipSync(raw) : raw).toString("utf8"));
    const rm = !!d.meta.cell.reducedMotion;
    const R = d.rows;
    const marks = (d.marks || []).map((x) => ({ name: x.name, i: x.row ?? x.i ?? x.frame }));
    const out = [];
    for (let k = 0; k < marks.length; k++) {
        const a = marks[k].i, b = k + 1 < marks.length ? marks[k + 1].i : R.length - 1;
        const seats = Object.keys(R[a]?.el || {}).filter((x) => /^seat#/.test(x));
        const viol = [];
        let moved = 0, maxPx = 0;
        const plate0 = R[a].el.plate, plate1 = R[b].el.plate;
        const plateMove = plate0 && plate1 ? Math.max(Math.abs(plate1.x - plate0.x), Math.abs(plate1.w - plate0.w)) : 0;
        for (const s of seats) {
            const v = [], ts = [];
            for (let q = a; q <= b; q++) { const e = R[q].el[s]; if (e && e.x != null) { v.push(e.x); ts.push(R[q].t); } }
            if (v.length < 3) continue;
            // The travel a seat is heading for is its carried displacement, its translate,
            // largest at the change (and after a retarget, larger than either leg).
            let tmax = 0;
            for (let q = a; q <= b; q++) { const tr = R[q].el[s]?.["s:translate"]; const n = tr && tr !== "none" ? Math.abs(parseFloat(tr)) : 0; if (n > tmax) tmax = n; }
            const lo = Math.min(...v), hi = Math.max(...v), span = Math.max(hi - lo, Math.abs(v[v.length - 1] - v[0]), tmax);
            if (span < 2) continue;
            moved++; maxPx = Math.max(maxPx, span);
            let first = v.findIndex((x, q) => q > 0 && Math.abs(x - v[q - 1]) > 0.01);
            if (first < 1) continue;
            const t0 = ts[first - 1];
            for (let q = first; q < v.length && ts[q] - t0 <= 34.5; q++) {
                const cov = Math.abs(v[q] - v[first - 1]) / span, lim = 1.15 * prog((ts[q] - t0) / 1000);
                if (!rm && cov > lim + 1e-9 && (cov - lim) * span > FLOOR) { viol.push(`${s} from rest ${(cov * 100).toFixed(1)}% > ${(lim * 100).toFixed(1)}%`); break; }
            }
            let last = 0;
            for (let q = 1; q < v.length; q++) {
                const st = Math.abs(v[q] - v[q - 1]);
                if (st < 0.01) continue;
                last = st;
                const p = st / span, lim = anyB(ts[q] - ts[q - 1]);
                if (!rm && p > lim + 1e-9 && (p - lim) * span > FLOOR) viol.push(`${s} step ${(p * 100).toFixed(1)}% > ${(lim * 100).toFixed(1)}%`);
            }
            if (!rm && (last > 1 || last / span > 0.02) && last - Math.min(1, 0.02 * span) > FLOOR) viol.push(`${s} last ${last.toFixed(2)} px`);
        }
        // R-11: under reduced motion every seat lands in one row (no row between two values).
        if (rm) for (const s of seats) { let steps = 0; for (let q = a + 1; q <= b; q++) { const p0 = R[q - 1].el[s], p1 = R[q].el[s]; if (p0 && p1 && Math.abs(p1.x - p0.x) > 0.05) steps++; } if (steps > 1) viol.push(`${s} moves on ${steps} rows`); }
        out.push({ mark: marks[k].name, seatsMoved: moved, largestPx: +maxPx.toFixed(1), plateMovePx: +plateMove.toFixed(2), viol: [...new Set(viol)].slice(0, 6) });
    }
    console.log(d.meta.scenario, d.meta.engine, d.meta.cell.tag, JSON.stringify(out));
}
