// gates4.mjs: gates3.mjs reading p3- and p4- scenario names.
// gates3.mjs <judge.json>: groups judge3.mjs PROTOTYPE-3 segments by W-I.8 gate and counts each
// violation kind. Segments that move no edge by more than 2 px are left out (unless reduced motion).
import { readFileSync } from "node:fs";
const all = JSON.parse(readFileSync(process.argv[2], "utf8"));
const gate = (s) =>
    /-rm$/.test(s) ? "G-10" : /^p[34]-(fold|ctl1|resize|held)/.test(s) ? "G-2" : /^p[34]-rev/.test(s) ? "G-3" : /^p[34]-(swap|seat|seatset|region)/.test(s) ? "G-4" : /^p[34]-overlay/.test(s) ? "G-8" : /^p[34]-hover/.test(s) ? "G-6" : /^p[34]-scope/.test(s) ? "G-9" : "other";
const kind = (v) => v.replace(/\(.*?\)/g, "").replace(/[\d.]+/g, "n").replace(/\s+/g, " ").trim();
const out = {};
for (const f of all) {
    const g = gate(f.meta.scenario);
    for (const s of f.segs) {
        if (!Object.values(s.edges).some((e) => e.travel > 2) && !f.meta.cell.reducedMotion) continue;
        const o = (out[g] ??= { segs: 0, pass: 0, kinds: {}, ex: {}, blankMax: 0, turns: [], cells: new Set(), failCells: new Set() });
        o.segs++;
        o.cells.add(f.meta.scenario);
        if (!s.viol.length) o.pass++;
        else o.failCells.add(f.meta.scenario);
        for (const v of s.viol) { const k = kind(v); o.kinds[k] = (o.kinds[k] || 0) + 1; o.ex[k] ??= `${f.meta.scenario} ${f.meta.cell.tag}: ${v}`; }
        o.blankMax = Math.max(o.blankMax, s.blankRows || 0);
        if (s.turn) { const t = s.turn.L ?? s.turn.R ?? s.turn.T ?? s.turn.B; if (t) o.turns.push(`${f.meta.scenario}:leave ${t.leaveMs ?? "-"}/rev ${t.reverseMs ?? "-"}<=${t.boundMs ?? "-"}ms`); }
    }
}
for (const [g, o] of Object.entries(out).sort()) {
    console.log(`## ${g}: ${o.pass}/${o.segs} segments pass over ${o.cells.size} scenarios (${o.failCells.size} with a failing segment); blank rows max ${o.blankMax}`);
    if (o.turns.length) console.log(`   turns: ${o.turns.join(", ")}`);
    for (const [k, n] of Object.entries(o.kinds).sort((a, b) => b[1] - a[1])) console.log(`   ${n} × ${k}   e.g. ${o.ex[k]}`);
    if (o.failCells.size) console.log(`   failing: ${[...o.failCells].join(", ")}`);
}
