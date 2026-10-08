#!/usr/bin/env node
// fd4-cover.mjs --root <tree> --report <seat report.json> — pass 6 · P6-F2's reading, the
// re-issue of critique-B's fd4-cover-probe.mjs on a seat report the tree's own browser.mjs
// wrote (not a hand-built one). It calls the tree's own FD-4 coverage arm
// (scripts/structure/cascade.mjs coverRisks) with pass 4's risky pair, --accent-band-strength
// on .accent-tone × .glass-chip, and prints one line:
//   COVER covered=<bool> evidence=<n> namedOnlyTheClass=<n> refuted=<n>
//   COVER THREW <message>          the arm refused the report (a spec it cannot read)
// Exit 0 when the arm returned, 3 when it threw. The verdict is the caller's.
import { readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const arg = (k) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : null; };
const root = resolve(arg("--root"));
const report = JSON.parse(readFileSync(resolve(arg("--report")), "utf8"));
const C = await import(pathToFileURL(join(root, "scripts/structure/cascade.mjs")).href);
const R = await import(pathToFileURL(join(root, "scripts/structure/lib/recipes.mjs")).href);
const T = await import(pathToFileURL(join(root, "scripts/structure/lib/tree.mjs")).href);
const tree = T.openTree(root);
const { owners } = R.classOwners(tree);
const recipes = R.classRecipes(tree);
const risks = [{ props: ["--accent-band-strength"], classes: ["accent-tone", "glass-chip"] }];
console.log(`report ${report.$schema ?? "unversioned"} testDir=${report.testDir ?? "-"} baseReport=${report.baseReport ? "yes" : "no"}; results ${(report.results ?? []).length}: ${[...new Set((report.results ?? []).map((t) => t.spec))].join(", ")}`);
for (const b of report.bands ?? []) console.log(`band ${b.band}: base-green ${b.baseGreen}; specs ${b.specs.join(", ")}`);
try {
    C.coverRisks(risks, [report], tree, { recipes, owners });
} catch (e) {
    console.log(`COVER THREW ${e.message}`);
    process.exit(3);
}
const [r] = risks;
for (const e of r.evidence) console.log(`evidence ${e.spec} reads ${e.reads}, passed ${e.passed}, band base-green ${e.baseGreenInBand}`);
console.log(`COVER covered=${r.covered} evidence=${r.evidence.length} namedOnlyTheClass=${r.namedOnlyTheClass.length} refuted=${(r.refuted ?? []).length}`);
