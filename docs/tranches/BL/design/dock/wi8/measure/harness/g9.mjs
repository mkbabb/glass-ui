// g9.mjs <rows.json...>: G-9 on rows. --dock-expand-t at rest (first/last row), its largest
// gap to the plate's main-axis travel fraction inside a posture travel, rows with the new
// posture class but no [data-morphing], and its value at rest after a swap.
import { readFileSync } from "node:fs";
for (const f of process.argv.slice(2)) {
    const d = JSON.parse(readFileSync(f, "utf8")), R = d.rows;
    const t = (r) => parseFloat(r.el.dock?.["p:--dock-expand-t"]);
    const open = (r) => (r.el.dock?.["a:class"] || "").includes("expanded");
    const mor = (r) => r.el.dock?.["a:data-morphing"] != null;
    let noMorph = 0, maxGap = 0, absent = 0;
    for (let i = 1; i < R.length; i++) { if (open(R[i]) !== open(R[i - 1]) && !mor(R[i])) noMorph++; if (Number.isNaN(t(R[i]))) absent++; }
    // posture travels: runs where the class is fixed and the plate width moves
    let a = null;
    for (let i = 1; i <= R.length; i++) {
        const ch = i < R.length && open(R[i]) !== open(R[i - 1]);
        if (ch || i === R.length) {
            if (a !== null) {
                const seg = R.slice(a, i), w = seg.map((r) => r.el.plate?.w), w0 = R[a - 1]?.el.plate?.w, w1 = w[w.length - 1];
                if (w0 != null && Math.abs(w1 - w0) > 2 && !/swap/.test(d.meta.scenario)) for (let k = 0; k < seg.length; k++) { const frac = (w[k] - w0) / (w1 - w0), e = open(seg[k]) ? t(seg[k]) : 1 - t(seg[k]); if (!Number.isNaN(e) && mor(seg[k])) maxGap = Math.max(maxGap, Math.abs(e - Math.min(1.05, Math.max(-0.05, frac)))); }
            }
            a = i;
        }
    }
    console.log(`${d.meta.scenario} ${d.meta.engine} ${d.meta.cell.tag}: rest first ${t(R[0])} last ${t(R[R.length - 1])}; absent rows ${absent}; class change without data-morphing ${noMorph}; max |e - plate fraction| ${maxGap.toFixed(3)}`);
}
