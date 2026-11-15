// overlay.mjs <rows.json...>: G-8 on the overlay-close cells. For each mark: when the
// fold's first plate row comes, when the popover's exit starts and ends, its samples and
// largest 60 Hz step, and whether it ended before the plate landed.
import { readFileSync } from "node:fs";
for (const f of process.argv.slice(2)) {
    const d = JSON.parse(readFileSync(f, "utf8"));
    const R = d.rows;
    const key = (r) => { const p = r.el.plate; return p ? `${p.x}|${p.w}` : ""; };
    const pop = (r) => (r.el.pop && r.el.pop.vis !== 0 ? r.el.pop.eop ?? 0 : 0);
    const cls = (r) => (r.el.dock?.["a:class"] || "").includes("expanded");
    const out = [];
    for (const mk of d.marks || []) {
        const i0 = mk.row ?? mk.i ?? mk.frame;
        let fold = null, land = null;
        for (let i = i0 + 1; i < R.length; i++) if (key(R[i]) !== key(R[i - 1])) { fold ??= i; land = i; }
        let pa = null, pz = null;
        for (let i = i0 + 1; i < R.length; i++) { if (pa === null && pop(R[i]) < pop(R[i0]) - 0.01) pa = i; if (pa !== null && pop(R[i]) <= 0.02) { pz = i; break; } }
        let step = 0, n = 0;
        if (pa !== null) for (let i = pa; i <= (pz ?? pa); i++) { n++; let j = i; while (j + 1 < R.length && R[j + 1].t - R[i].t <= 17.5) j++; step = Math.max(step, Math.abs(pop(R[j]) - pop(R[i]))); }
        const ms = (i) => (i == null ? null : +(R[i].t - R[i0].t).toFixed(0));
        out.push({ mark: mk.name, popAtMark: +pop(R[i0]).toFixed(2), openAtMark: cls(R[i0]), foldFirstRowMs: ms(fold), landMs: ms(land), popExitStartMs: ms(pa), popGoneMs: ms(pz), exitAfterFoldRows: fold != null && pa != null ? pa - fold : null, popSamples: n, popMaxStep60: +step.toFixed(2), popEndedBeforeLand: pz != null && land != null ? pz <= land : null, popAtEnd: +pop(R[R.length - 1]).toFixed(2), openAtEnd: cls(R[R.length - 1]) });
    }
    console.log(d.meta.scenario, d.meta.tree, d.meta.engine, JSON.stringify(out));
}
