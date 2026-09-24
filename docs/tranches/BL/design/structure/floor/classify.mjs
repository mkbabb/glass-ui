#!/usr/bin/env node
// classify.mjs — FD-5 CLI: every file a structure step changed is move-only, a
// resolution-preserving re-point, a vi.mock re-aim, or an authored hunk the step's
// manifest names; anything else fails the step (exit 1).
//   node classify.mjs --base <tree before the step> --root <tree after> [--moves list.json]… [--manifest m.json] [--json out]
// manifest: { "authored": [{ "file": "path in root", "reason": "…" }] }
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { classifyStep } from "./lib/classify.mjs";

const args = process.argv.slice(2);
const all = (k) => args.flatMap((a, i) => (a === k ? [args[i + 1]] : []));
const opt = (k) => all(k)[0] ?? null;
if (!opt("--base") || !opt("--root")) { console.error("usage: classify.mjs --base B --root R [--moves L]… [--manifest M] [--json out]"); process.exit(2); }
const moves = all("--moves").map((p) => JSON.parse(readFileSync(p, "utf8")).moves);
const authored = opt("--manifest") ? JSON.parse(readFileSync(opt("--manifest"), "utf8")).authored ?? [] : [];
const r = classifyStep(resolve(opt("--base")), resolve(opt("--root")), { moves, authored });
if (opt("--json")) writeFileSync(opt("--json"), JSON.stringify(r, null, 1));
console.log(JSON.stringify({ counts: r.counts, stale: r.stale.length, failed: r.failed }));
for (const x of r.rows.filter((x) => x.class === "unclassified")) console.log(`UNCLASSIFIED ${x.file}${x.from ? ` (from ${x.from})` : ""}: ${x.why}`);
for (const x of r.stale) console.log(`STALE authored row: ${x.file} (${x.reason})`);
console.log(r.failed ? "FAIL" : "PASS");
process.exit(r.failed ? 1 : 0);
