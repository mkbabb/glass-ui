// g6c.mjs <rows.json[.gz]> ...: MEASURE-7, m6/g6b.mjs with the seat's own scale taken out on each axis by its own
// factor (the liquid press writes a reciprocal `scale: sx sy` about the centre; g6b divided both axes by sx, which
// read the press squash on the block axis as up to 1.78 px of box change). G-6 widened (RU-47). From the first mark (the dock open and settled)
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
    const unscale = (b) => { const [s0, s1] = String(b.sc).split(" ").map(parseFloat); const kx = Number.isFinite(s0) && s0 > 0 ? s0 : 1; const ky = Number.isFinite(s1) && s1 > 0 ? s1 : kx; const cx = b.x + b.w / 2, cy = b.y + b.h / 2, w = b.w / kx, h = b.h / ky; return { x: cx - w / 2, y: cy - h / 2, w, h }; };
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
