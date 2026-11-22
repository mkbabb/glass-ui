// g6d.mjs <rows.json[.gz]> ...: MEASURE-9 part H (H1; RU-89 as amended for C8-M7, RU-119). G-6's press cell read by
// m7/g6c.mjs's measure (every seat's layout box with its own scale taken out, and every plate, change by 0.25 px or less
// between any two rows, and the dock never folds), from the first press mark to the lift of the last press (`lift-home`),
// with two additions: each `press-*` mark asserts the dock open in the row at the mark (a press read on a folded dock voids
// the cell: VOID, neither pass nor fail), and the largest box change is also given per press, from its `press-*` mark to the
// next mark, so a plant's bite is placed on the seat whose press it moves (RU-119: g6-overflow on the end seat's press).
import { readFileSync } from "node:fs";
import { gunzipSync } from "node:zlib";
for (const f of process.argv.slice(2)) {
    const raw = readFileSync(f);
    const d = JSON.parse((f.endsWith(".gz") ? gunzipSync(raw) : raw).toString());
    const marks = d.marks ?? [];
    const presses = marks.filter((m) => m.name.startsWith("press-"));
    const t0 = presses[0]?.t ?? 0;
    // RU-89: the cell reads the press "to the lift", the last press's pointerup (the sampler's arm time plus the
    // event's offset), not the lift mark a few ms after it: a fold that starts after the lift is (k2)'s.
    const last = presses[presses.length - 1];
    const up = last && last.ev && Number.isFinite(last.ev.pointerup) && Number.isFinite(last.sentAgo) ? last.t - last.sentAgo + last.ev.pointerup : null;
    const tEnd = up ?? marks.find((m) => m.name === "lift-home")?.t ?? Infinity;
    const rows = d.rows.filter((r) => r.t >= t0 && r.t <= tEnd);
    const at = (t) => d.rows.find((r) => r.t >= t) ?? d.rows[d.rows.length - 1];
    const folded = (r) => /collapsed/.test(r?.el.dock?.["a:class"] ?? "");
    const voids = presses.filter((m) => folded(at(m.t))).map((m) => m.name);
    const unscale = (b) => { const [s0, s1] = String(b.sc).split(" ").map(parseFloat); const kx = Number.isFinite(s0) && s0 > 0 ? s0 : 1; const ky = Number.isFinite(s1) && s1 > 0 ? s1 : kx; const cx = b.x + b.w / 2, cy = b.y + b.h / 2, w = b.w / kx, h = b.h / ky; return { x: cx - w / 2, y: cy - h / 2, w, h }; };
    const b0 = rows[0]?.el ?? {};
    const change = (r) => {
        let worst = 0, k0 = "";
        for (const k of Object.keys(r.el)) {
            if (!/^(dock|plate|seatplate|seat#\d+)$/.test(k)) continue;
            const a = b0[k], b = r.el[k];
            if (!a || !b || a.vis === 0 || b.vis === 0) continue;
            const A = /^seat#/.test(k) ? unscale(a) : a, B = /^seat#/.test(k) ? unscale(b) : b;
            const dd = Math.max(Math.abs(B.x - A.x), Math.abs(B.y - A.y), Math.abs(B.w - A.w), Math.abs(B.h - A.h));
            if (dd > worst) (worst = dd), (k0 = k);
        }
        return [worst, k0];
    };
    let worst = 0, where = "", collapsedRows = 0;
    const per = {};
    for (const r of rows) {
        if (folded(r)) collapsedRows++;
        const [w, k] = change(r);
        const p = [...presses].reverse().find((m) => m.t <= r.t)?.name ?? "-";
        per[p] = Math.max(per[p] ?? 0, w);
        if (w > worst) (worst = w), (where = `${k} row ${r.i} (${p})`);
    }
    const firstFold = rows.find(folded);
    const verdict = voids.length ? "VOID" : worst <= 0.25 && collapsedRows === 0 ? "pass" : "FAIL";
    console.log(`${verdict} ${f.split("/").pop()}: presses ${presses.map((m) => m.name.slice(6)).join(",")}; rows ${rows.length} to the lift; largest box change ${worst.toFixed(2)} px (${where || "-"}); folded rows ${collapsedRows}${firstFold ? ` (first ${(firstFold.t - (presses.find((m) => m.t <= firstFold.t && m === [...presses].reverse().find((q) => q.t <= firstFold.t))?.t ?? t0)).toFixed(0)} ms after its press)` : ""}; per press ${Object.entries(per).map(([k, v]) => `${k.slice(6)} ${v.toFixed(2)}`).join(", ")}${voids.length ? `; pressed on a folded dock: ${voids.join(", ")}` : ""}`);
}
