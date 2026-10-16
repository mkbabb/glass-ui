#!/usr/bin/env node
// judge-rows.mjs <run-plants --out json> · critique-B pass 9 · written and hashed BEFORE reading pass-9/B-kit. Judges
// plants9.mjs rows against plants9.mjs's EXPECT (a key ending in `*` matches by prefix). Prints `ROW <id> PASS|FAIL
// verdict=<v> expect=<list>` and `ROWS pass <n> fail <n> skip <n>`; exit 0 when no row fails.
import { readFileSync } from "node:fs";
import { EXPECT } from "./plants9.mjs";
const doc = JSON.parse(readFileSync(process.argv[2], "utf8"));
let p = 0, f = 0, s = 0;
for (const r of doc.rows) {
    if (r.verdict === "SKIP") { s++; console.log(`ROW ${r.id} SKIP ${r.why}`); continue; }
    const key = Object.keys(EXPECT).find((k) => (k.endsWith("*") ? r.id.startsWith(k.slice(0, -1)) : r.id === k));
    const ok = key && EXPECT[key].includes(r.verdict);
    ok ? p++ : f++;
    console.log(`ROW ${r.id} ${ok ? "PASS" : "FAIL"} verdict=${r.verdict} expect=${key ? EXPECT[key].join("|") : "none"} named=${r.named || "-"}`);
}
console.log(`ROWS pass ${p} fail ${f} skip ${s}`);
process.exit(f ? 1 : 0);
