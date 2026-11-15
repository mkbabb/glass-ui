// g6.mjs <rows.json[.gz]> ...: MEASURE-4, G-6 on its hover and keyboard cells. From the first
// mark (the dock open and settled) to the end: the largest change of the root's and the plate's
// box between any two rows (bound 0 px, read at 0.01), and the rows the dock folded in.
import { readFileSync } from "node:fs";
import { gunzipSync } from "node:zlib";
for (const f of process.argv.slice(2)) {
    const raw = readFileSync(f);
    const d = JSON.parse((f.endsWith(".gz") ? gunzipSync(raw) : raw).toString());
    const m0 = d.marks?.[0]?.t ?? 0;
    const rows = d.rows.filter((r) => r.t >= m0);
    const worst = { dock: 0, plate: 0 };
    let collapsedRows = 0;
    for (const k of ["dock", "plate"]) {
        const b0 = rows[0]?.el[k];
        for (const r of rows) {
            const b = r.el[k]; if (!b || !b0) continue;
            const dd = Math.max(Math.abs(b.x - b0.x), Math.abs(b.y - b0.y), Math.abs(b.w - b0.w), Math.abs(b.h - b0.h));
            worst[k] = Math.max(worst[k], dd);
        }
    }
    for (const r of rows) if (/collapsed/.test(r.el.dock?.["a:class"] ?? "")) collapsedRows++;
    const pass = worst.dock <= 0.01 && worst.plate <= 0.01 && collapsedRows === 0;
    console.log(`${pass ? "pass" : "FAIL"} ${f.split("/").pop()}: rows ${rows.length}, root moves ${worst.dock.toFixed(2)} px, plate ${worst.plate.toFixed(2)} px, folded rows ${collapsedRows}`);
}
