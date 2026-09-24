// analyze.mjs SEALJSON BOUNDSJSON VITESTJSON — breakdowns for the report, from the run's own outputs.
import { readFileSync } from "node:fs";
const [sealP, boundsP, vitestP] = process.argv.slice(2);
const s = JSON.parse(readFileSync(sealP, "utf8"));
const b = JSON.parse(readFileSync(boundsP, "utf8"));
const v = JSON.parse(readFileSync(vitestP, "utf8"));
const grp = (list, f) => { const m = {}; for (const x of list) { const k = f(x); m[k] = (m[k] ?? 0) + 1; } return m; };
console.log("counts", JSON.stringify(s.counts));
console.log("B0", JSON.stringify(s.meta.b0));
console.log("B1 by target module", JSON.stringify(grp(s.V.B1, (x) => (/\(door ([^)]*)\)/.exec(x)?.[1] ?? (x.includes("own door") ? "own door" : "?")))));
console.log("B2 by from-zone", JSON.stringify(grp(s.V.B2, (x) => x.split("/")[0])));
console.log("B6 dirs", s.V.B6.filter((x) => x.includes("direct files")).join(" | "));
console.log("B6 files by zone", JSON.stringify(grp(s.V.B6.filter((x) => x.includes(" lines")), (x) => x.split("/")[0])));
console.log("B9 kinds", JSON.stringify(grp(s.V.B9, (x) => (x.includes("outside its subtree") ? "door re-exports outside subtree" : "symbol on two non-root entries"))));
console.log("B9 outside-subtree lines:\n  " + s.V.B9.filter((x) => x.includes("outside")).join("\n  "));
console.log("bounds", JSON.stringify(b.summary));
const fails = v.testResults.flatMap((t) => t.assertionResults.filter((a) => a.status === "failed").map((a) => `${t.name.split("/wt/")[1]} :: ${a.title}`));
console.log("vitest", JSON.stringify({ tests: v.numTotalTests, passed: v.numPassedTests, failed: v.numFailedTests, pending: v.numPendingTests, files: v.testResults.length, uncollected: v.testResults.filter((t) => t.assertionResults.length === 0).map((t) => t.name.split("/wt/")[1]) }));
for (const f of fails) console.log("  FAIL", f.slice(0, 200));
for (const t of v.testResults) { const f = t.assertionResults.filter((a) => a.status === "failed"); if (f.length && !t.name.includes("seal.test")) console.log("  MSG", t.name.split("/wt/")[1], (f[0].failureMessages?.[0] ?? "").split("\n")[0].slice(0, 220)); }
