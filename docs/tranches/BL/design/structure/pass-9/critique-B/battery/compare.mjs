#!/usr/bin/env node
// compare.mjs <mine.json> <reference.json> [--strip <prefix>] · critique-B pass 9 · written and hashed BEFORE reading
// pass-9/B-kit. Both files are run-plants.mjs --out documents. Rows are matched by id (after stripping --strip from
// mine); a row DIFFERS when its verdict or its named clause set differs. Prints every difference, a missing/extra
// list, and `COMPARE rows <n> same <n> differ <n> missing <n> extra <n>`; exit 0 when differ+missing+extra is 0, else 1.
import { readFileSync } from "node:fs";
const [a, b] = process.argv.slice(2); const i = process.argv.indexOf("--strip"); const strip = i > 0 ? process.argv[i + 1] : "";
const rows = (f, s) => new Map(JSON.parse(readFileSync(f, "utf8")).rows.map((r) => [s && r.id.startsWith(s) ? r.id.slice(s.length) : r.id, r]));
const M = rows(a, strip), R = rows(b, "");
let same = 0, differ = 0; const missing = [], extra = [];
const norm = (s) => (s ?? "").split(",").filter(Boolean).sort().join(",");
for (const [id, r] of R) {
    const m = M.get(id); if (!m) { missing.push(id); continue; }
    if (m.verdict === r.verdict && norm(m.named) === norm(r.named)) same++;
    else { differ++; console.log(`DIFFER ${id}: mine ${m.verdict} [${m.named ?? ""}] vs ref ${r.verdict} [${r.named ?? ""}]`); }
}
for (const id of M.keys()) if (!R.has(id)) extra.push(id);
if (missing.length) console.log(`MISSING ${missing.join(" ")}`);
if (extra.length) console.log(`EXTRA ${extra.join(" ")}`);
console.log(`COMPARE rows ${R.size} same ${same} differ ${differ} missing ${missing.length} extra ${extra.length}`);
process.exit(differ + missing.length + extra.length ? 1 : 0);
