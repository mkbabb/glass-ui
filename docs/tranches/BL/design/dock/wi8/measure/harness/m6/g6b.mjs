// g6b.mjs <rows.json[.gz]> ...: MEASURE-6, G-6 widened (RU-47). From the first mark (the dock open and settled)
// to the end of the cell, on hover, focus and press of each seat: the layout box of every seat of the run
// (its painted box with its own scale taken out about its centre) and of every plate changes by 0.25 px or
// less between any two rows, and the dock never folds. Reads the hover, keyboard and press cells.
import { readFileSync } from "node:fs";
import { gunzipSync } from "node:zlib";
for (const f of process.argv.slice(2)) {
    const raw = readFileSync(f);
    const d = JSON.parse((f.endsWith(".gz") ? gunzipSync(raw) : raw).toString());
    const m0 = (d.marks?.find((m) => m.name === "right0") ?? d.marks?.[0])?.t ?? 0;
    const end = d.marks?.find((m) => m.name === "sweep")?.t ?? Infinity;
    const rows = d.rows.filter((r) => r.t >= m0);
    const unscale = (b) => { const s = parseFloat(String(b.sc).split(" ")[0]); const k = Number.isFinite(s) && s > 0 ? s : 1; const cx = b.x + b.w / 2, cy = b.y + b.h / 2, w = b.w / k, h = b.h / k; return { x: cx - w / 2, y: cy - h / 2, w, h }; };
    let worst = 0, at = "", collapsedRows = 0;
    const b0 = rows[0]?.el ?? {};
    for (const r of rows) {
        if (/collapsed/.test(r.el.dock?.["a:class"] ?? "")) collapsedRows++;
        for (const k of Object.keys(r.el)) {
            if (!/^(dock|plate|seatplate|seat#\d+)$/.test(k)) continue;
            const a = b0[k], b = r.el[k];
            if (!a || !b || a.vis === 0 || b.vis === 0) continue;
            const A = /^seat#/.test(k) ? unscale(a) : a, B = /^seat#/.test(k) ? unscale(b) : b;
            const dd = Math.max(Math.abs(B.x - A.x), Math.abs(B.y - A.y), Math.abs(B.w - A.w), Math.abs(B.h - A.h));
            if (dd > worst) { worst = dd; at = `${k} row ${r.i}`; }
        }
    }
    const pass = worst <= 0.25 && collapsedRows === 0;
    console.log(`${pass ? "pass" : "FAIL"} ${f.split("/").pop()}: rows ${rows.length}, largest box change ${worst.toFixed(2)} px (${at || "-"}), folded rows ${collapsedRows}`);
}
