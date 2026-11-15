// gates.mjs <judge.json> : groups the judge's segments by W-I.8 gate and counts each
// violation kind. Segments that move the plate by 2 px or less are left out.
import { readFileSync } from "node:fs";
const all = JSON.parse(readFileSync(process.argv[2], "utf8"));
const gate = (s) =>
    /-rm$/.test(s) ? "G-10" : /^fold-w-std-neck/.test(s) ? "G-5" : /^fold-/.test(s) ? "G-2" : /^rev-/.test(s) ? "G-3" : /^swap-/.test(s) ? "G-4" : /^overlay/.test(s) ? "G-8" : /^(label|sweep)/.test(s) ? "G-6" : "other";
const kind = (v) => v.replace(/\(.*?\)/g, "").replace(/[\d.]+/g, "n").replace(/\s+/g, " ").trim();
const out = {};
for (const f of all) {
    const g = gate(f.meta.scenario);
    for (const s of f.segs) {
        if (!Object.values(s.edges).some((e) => e.travel > 2) && !f.meta.cell.reducedMotion) continue;
        const o = (out[g] ??= { segs: 0, pass: 0, kinds: {}, ex: {}, blankMax: 0, hidden: 0, overlap: 0, overlapPx: 0, turns: [] });
        o.segs++;
        if (!s.viol.length) o.pass++;
        for (const v of s.viol) { const k = kind(v); o.kinds[k] = (o.kinds[k] || 0) + 1; o.ex[k] ??= `${f.meta.scenario} ${f.meta.cell.tag}: ${v}`; }
        o.blankMax = Math.max(o.blankMax, s.blankRows || 0);
        o.hidden += s.hiddenRows || 0; o.overlap += s.overlapRows || 0; o.overlapPx = Math.max(o.overlapPx, s.overlapPx || 0);
        if (s.turn) o.turns.push(`${f.meta.scenario}:${s.turn.L ?? s.turn.R ?? s.turn.T}`);
    }
}
for (const [g, o] of Object.entries(out).sort()) {
    console.log(`## ${g}: ${o.pass}/${o.segs} segments pass; blank rows max ${o.blankMax}; hidden unit-rows ${o.hidden}; overlap unit-rows ${o.overlap} (max ${o.overlapPx} px)`);
    if (o.turns.length) console.log(`   turns (frames after the reversal mark): ${o.turns.join(", ")}`);
    for (const [k, n] of Object.entries(o.kinds).sort((a, b) => b[1] - a[1])) console.log(`   ${n} × ${k}   e.g. ${o.ex[k]}`);
}
