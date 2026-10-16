#!/usr/bin/env node
// judge-rows10.mjs <run-plants --out json> · critique-B pass 10 · written and hashed BEFORE reading pass-10/B-kit.
// Judges plants10.mjs rows against plants10.mjs's EXPECT (a key ending in `*` matches by prefix). Prints `ROW <id>
// PASS|FAIL verdict=<v> expect=<list>` and `ROWS pass <n> fail <n> skip <n>`; exit 0 when no row fails. A SKIP of a
// family the plan names (PR-*, PC-*) is printed as SKIP-NAMED and counted as a fail: a plant the plan requires and the
// tree gave no target for is not a pass.
import { readFileSync } from "node:fs";
import { EXPECT } from "./plants10.mjs";
const doc = JSON.parse(readFileSync(process.argv[2], "utf8"));
let p = 0, f = 0, s = 0;
for (const r of doc.rows) {
    if (r.verdict === "SKIP") {
        if (/^(PR|PC)-/.test(r.id)) { f++; console.log(`ROW ${r.id} SKIP-NAMED (fail) ${r.why}`); } else { s++; console.log(`ROW ${r.id} SKIP ${r.why}`); }
        continue;
    }
    const key = Object.keys(EXPECT).find((k) => (k.endsWith("*") ? r.id.startsWith(k.slice(0, -1)) : r.id === k));
    const ok = key && EXPECT[key].includes(r.verdict);
    ok ? p++ : f++;
    console.log(`ROW ${r.id} ${ok ? "PASS" : "FAIL"} verdict=${r.verdict} expect=${key ? EXPECT[key].join("|") : "none"} named=${r.named || "-"}`);
}
console.log(`ROWS pass ${p} fail ${f} skip ${s}`);
process.exit(f ? 1 : 0);
