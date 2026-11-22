// corner9.mjs <rows.json[.gz]> ...: MEASURE-9 part H (H3; RU-91 as amended for C8-M1 and C8-M20). The plate's resting
// corner against half its painted cross extent, at the folded rest (the first row) and the open rest (the last row
// before the `outside` mark, or the last row the dock is open and not morphing). The used radius is the computed one
// (the largest of the four corners) bounded by half the box's smaller side, as a browser draws it. A one-row dock's
// clause: the used corner equals half the painted cross extent within 0.5 px (a full capsule). A taller dock's corner is
// recorded beside half its cross extent and half one row's (the layer height plus the block padding, read as the folded
// plate's cross extent).
import { readFileSync } from "node:fs";
import { gunzipSync } from "node:zlib";
for (const f of process.argv.slice(2)) {
    const raw = readFileSync(f);
    const d = JSON.parse((f.endsWith(".gz") ? gunzipSync(raw) : raw).toString());
    const R = d.rows;
    const vert = /vertical/.test(R[0].el.dock?.["a:class"] ?? "");
    const open = (r) => /expanded/.test(r.el.dock?.["a:class"] ?? "");
    const mor = (r) => r.el.dock?.["a:data-morphing"] != null;
    const tOut = d.marks?.find((m) => m.name === "outside")?.t ?? Infinity;
    const restOpen = [...R].reverse().find((r) => r.t < tOut && open(r) && !mor(r));
    const at = (r) => {
        if (!r) return null;
        const p = r.el.plate;
        const rad = Math.max(...String(p.rad).split("|").map((s) => parseFloat(s)).filter(Number.isFinite));
        const cross = vert ? p.w : p.h;
        const used = Math.min(rad, p.w / 2, p.h / 2);
        return { w: +p.w.toFixed(2), h: +p.h.toFixed(2), computed: rad > 1e6 ? "stadium" : +rad.toFixed(2), used: +used.toFixed(2), halfCross: +(cross / 2).toFixed(2), short: +(cross / 2 - used).toFixed(2) };
    };
    const folded = at(R[0]), op = at(restOpen);
    const oneRow = folded && op && Math.abs((vert ? op.w : op.h) - (vert ? folded.w : folded.h)) <= 1;
    const shape = (R[0].el.dock?.["a:class"] ?? "").match(/shape-(\w+)/)?.[1] ?? "pill";
    const pass = shape !== "pill" ? null : oneRow ? Math.abs(op.short) <= 0.5 && Math.abs(folded.short) <= 0.5 : null;
    console.log(`${d.meta.scenario} ${d.meta.engine} ${d.meta.cell.tag}: folded ${JSON.stringify(folded)} open ${JSON.stringify(op)} ${shape !== "pill" ? `shape ${shape}: recorded` : oneRow ? `one row -> ${pass ? "pass" : "FAIL (open corner " + op.used + " px, half the cross extent " + op.halfCross + " px)"}` : `taller than one row: open corner ${op?.used} px, half its cross ${op?.halfCross} px, half one row ${folded?.halfCross} px`}`);
}
