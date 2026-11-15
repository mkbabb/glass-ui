// g9b.mjs <rows.json[.gz]...>: G-9 on the scope cells (PROTOTYPE-3). As g9.mjs (the property
// at rest, its gap to the plate, the class change inside the window), plus the follower: it
// moves by calc(var(--dock-expand-t) * 100px), so in each row its offset from its rest at
// e = 0 is compared with 100 x e read from the scope element in that row, and its lag in rows
// is the least shift k (0, 1, 2 ...) for which the offset is within 0.5 px of 100 x e k rows
// earlier. The gate: within one row of the plate.
import { readFileSync } from "node:fs";
import { gunzipSync } from "node:zlib";
for (const f of process.argv.slice(2)) {
    const raw = readFileSync(f);
    const d = JSON.parse((f.endsWith(".gz") ? gunzipSync(raw) : raw).toString("utf8"));
    const R = d.rows;
    const t = (r) => parseFloat(r.el.dock?.["p:--dock-expand-t"]);
    const ts = (r) => parseFloat(r.el.scopehost?.["p:--dock-expand-t"]);
    const fx = (r) => r.el.follower?.x;
    const open = (r) => (r.el.dock?.["a:class"] || "").includes("expanded");
    const mor = (r) => r.el.dock?.["a:data-morphing"] != null;
    let noMorph = 0, absent = 0, scopeGap = 0;
    for (let i = 1; i < R.length; i++) { if (open(R[i]) !== open(R[i - 1]) && !mor(R[i])) noMorph++; if (Number.isNaN(t(R[i]))) absent++; }
    // The follower's rest at e = 0: its x in a row where the root reads 0.
    const r0 = R.find((r) => t(r) === 0 && fx(r) != null);
    let worstLag = 0, worstPx = 0, rowsRead = 0;
    if (r0) {
        const x0 = fx(r0);
        for (let i = 2; i < R.length; i++) {
            if (!mor(R[i])) continue;
            const off = fx(R[i]) - x0;
            if (Number.isNaN(off)) continue;
            rowsRead++;
            if (!Number.isNaN(ts(R[i]))) scopeGap = Math.max(scopeGap, Math.abs(ts(R[i]) - t(R[i])));
            let lag = null;
            for (let k = 0; k <= 3 && i - k >= 0; k++) if (Math.abs(off - 100 * t(R[i - k])) <= 0.5) { lag = k; break; }
            if (lag === null) { lag = 4; worstPx = Math.max(worstPx, Math.abs(off - 100 * t(R[i]))); }
            worstLag = Math.max(worstLag, lag);
        }
    }
    console.log(`${d.meta.scenario} ${d.meta.engine} ${d.meta.cell.tag}: rest first ${t(R[0])} last ${t(R[R.length - 1])}; absent rows ${absent}; class change without data-morphing ${noMorph}; scope element vs root max ${scopeGap.toFixed(4)}; follower rows ${rowsRead}, worst lag ${worstLag} rows${worstLag > 3 ? ` (off by ${worstPx.toFixed(2)} px)` : ""} -> ${worstLag <= 1 && noMorph === 0 && absent === 0 ? "pass" : "FAIL"}`);
}
