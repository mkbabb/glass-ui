#!/usr/bin/env node
// gate-counts.mjs — run G's gate (scripts/structure/eponym/eponym.mjs) on the cwd tree and print
// one `CLAUSE count` line per clause, so a plant is judged by clause counts only (the gate's
// verbose lines carry edge totals and line numbers that shift with any edit). With --lines it
// also prints every violation line, prefixed by its clause, for evidence.
import { execFileSync } from "node:child_process";
const out = (() => {
    try { return execFileSync("node", ["scripts/structure/eponym/eponym.mjs", "--root", ".", "--json", "-"], { encoding: "utf8", maxBuffer: 1 << 28, stdio: ["ignore", "pipe", "ignore"] }); }
    catch (e) { return e.stdout; }
})();
const v = JSON.parse(out);
for (const c of v.clauses) console.log(`${c} ${v.counts[c]}`);
if (process.argv.includes("--lines")) for (const c of v.clauses) for (const l of v.V[c]) console.log(`  ${c} ${l}`);
