#!/usr/bin/env node
// edge-scan.mjs <rows.json>...: every frame where a visible popper (tooltip or menu wrapper)
// sits within 12 px of the screen's left edge, or where a popper's box jumps more than 40 px
// in one frame; prints the route mark, the box and the theme seat's box.
import { readFileSync } from "node:fs";
import { basename } from "node:path";
for (const f of process.argv.slice(2)) {
    const d = JSON.parse(readFileSync(f, "utf8"));
    let mark = "start";
    const prev = {};
    const hits = [];
    for (const r of d.rows) {
        for (const m of r.marks || []) mark = m;
        for (const k of Object.keys(r.el)) {
            if (!/^(popper|tip)#/.test(k)) continue;
            const b = r.el[k];
            if (!b || !(b.w > 2) || b.op === 0) { delete prev[k]; continue; }
            const jump = prev[k] ? Math.hypot(b.x - prev[k].x, b.y - prev[k].y) : 0;
            if (b.x < 12 || jump > 40) hits.push({ mark, t: +r.t.toFixed(0), k, box: [b.x, b.y, b.w, b.h].map((v) => +(+v).toFixed(1)), jump: +jump.toFixed(1), op: b.op, theme: r.el.theme ? [r.el.theme.x, r.el.theme.y, r.el.theme.w, r.el.theme.h].map((v) => +(+v).toFixed(1)) : null, ptr: r.ptr ? [Math.round(r.ptr.x), Math.round(r.ptr.y)] : null });
            prev[k] = b;
        }
    }
    if (hits.length) {
        console.log(basename(f), hits.length, "frames");
        for (const h of hits.slice(0, 8)) console.log("  ", JSON.stringify(h));
    }
}
