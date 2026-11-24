#!/usr/bin/env node
// compare.mjs <families.json>: a Markdown table of the fold, one row per family, one
// column pair per engine and cell: readings and the largest excess, base beside the
// latest cure build read there. Run families.mjs with --routes first, so both sides
// cover the same routes.
import { readFileSync } from "node:fs";
const { families, rows } = JSON.parse(readFileSync(process.argv[2], "utf8"));
const cells = [...new Set(rows.map((r) => `${r.engine} ${r.cell}`))].sort();
const latest = {};
for (const r of rows) {
    const c = `${r.engine} ${r.cell}`;
    if (r.tag !== "base" && (!latest[c] || r.tag > latest[c])) latest[c] = r.tag;
}
const cols = cells.filter((c) => latest[c]);
const fams = Object.keys(families).filter((f) => rows.some((r) => r.family === f));
const cell = (f, c, tag) => {
    const r = rows.find((x) => x.family === f && `${x.engine} ${x.cell}` === c && x.tag === tag);
    return r ? `${r.n} (${Math.round(r.max)})` : "0";
};
const VER = { cure: "v1", cure2: "v2", cure3: "v3", cure4: "v4" };
console.log(`| family | ${cols.map((c) => `${c}: base → ${VER[latest[c]]}`).join(" | ")} |`);
console.log(`|---|${cols.map(() => "---").join("|")}|`);
for (const f of fams) console.log(`| ${f} | ${cols.map((c) => `${cell(f, c, "base")} → ${cell(f, c, latest[c])}`).join(" | ")} |`);
