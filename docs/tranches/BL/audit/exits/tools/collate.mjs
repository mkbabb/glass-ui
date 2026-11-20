// collate.mjs: reads logs/results/*.json and prints one compact line per surface × form ×
// tree × engine × scheme × rm, plus the glass reading. TABLE.md is written from this.
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { EX } from "./lib.mjs";
const dir = join(EX, "logs/results");
const alpha = (c) => {
    if (!c) return "?";
    let m = c.match(/\/\s*([\d.]+)\s*\)$/); if (m) return +m[1];
    m = c.match(/^rgba\([^,]+,[^,]+,[^,]+,\s*([\d.]+)\)/); if (m) return +m[1];
    if (/^rgba?\(0, 0, 0, 0\)$/.test(c)) return 0;
    return 1;
};
export function glassOf(g) {
    if (!g) return "no read";
    const me = g.me;
    const bf = me.bf && me.bf !== "none" ? me.bf : g.found ? `${g.found.bf} on ${g.found.where} ${g.found.cls}` : "none";
    return `bf=${bf.slice(0, 70)}; bg a=${alpha(me.bg)}; cls=${me.cls || "-"}${me.surface ? "; data-surface=" + me.surface : ""}${me.form ? "; form=" + me.form : ""}; border=${me.bd.split(" ")[0]}; shadow=${me.sh === "none" ? "none" : "yes"}`;
}
const fmt = (v) => (!v ? "-" : v.verdict === "tween" ? `${v.ms}` : v.verdict === "CUT" ? `CUT(${v.frames}f)` : v.verdict) + (v && v.what && v.verdict === "tween" ? "" : "");
const main = process.argv[1].endsWith("collate.mjs");
const files = main ? readdirSync(dir).filter((f) => f.endsWith(".json")).sort() : [];
for (const f of files) {
    const r = JSON.parse(readFileSync(join(dir, f), "utf8"));
    console.log(`\n=== ${f}`);
    for (const [id, s] of Object.entries(r.surfaces)) {
        if (s.fatal) { console.log(`${id}: FATAL ${s.fatal}`); continue; }
        const e = s.enter || {};
        const routes = Object.entries(s.routes || {}).map(([k, v]) => `${k}=${fmt(v)}${v.what && v.verdict !== "tween" ? "" : ""}${v.note && v.verdict !== "tween" ? "[" + v.note.slice(0, 50) + "]" : ""}`).join(" ");
        console.log(`${id}: enter=${fmt(e)} {${(e.what || []).join(",")}} | ${routes}${s.reverse ? " | rev=" + s.reverse.verdict : ""}${s.errors?.length ? " | ERR " + s.errors.join(";").slice(0, 120) : ""}`);
        if (process.argv.includes("--glass")) console.log(`   glass: ${glassOf(s.glass)}`);
        if (process.argv.includes("--what")) for (const [k, v] of Object.entries(s.routes || {})) console.log(`   ${k}: ${(v.what || []).join(",")} lat=${v.latency} frames=${v.frames} anims=${(v.anims || []).slice(-1)[0] || ""}`);
    }
}
