#!/usr/bin/env node
// erased-risk.mjs — FD-4's pair judge over two cascade snapshots with the Vue scope ids
// erased. `cascade.mjs verify` numbers scope ids by first appearance, so an SFC whose styles
// move into a child SFC (S39-03: Timeline → TimelineMarks) reads "content changed" and the
// reorder judge never runs. This reads both sequences with every `[data-v-#N]` and scoped
// keyframe suffix erased, then runs the tree's own `reorderRisks` (the judge `verify` runs
// on a reorder): the moved rules and the risky pairs (a swapped pair that shares a property
// on co-occurring classes). It is an argument from the rule text with the scope erased,
// not a verdict: two rules that differed only in their scope would read as one here.
//   node tools/erased-risk.mjs --tree <wt> --base <snapshot dir> --now <snapshot dir>
import { readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const args = process.argv.slice(2);
const opt = (k) => resolve(args[args.indexOf(k) + 1]);
const tree = opt("--tree"), baseDir = opt("--base"), nowDir = opt("--now");
const { reorderRisks } = await import(pathToFileURL(join(tree, "scripts/structure/cascade.mjs")).href);
const { openTree, classRecipes } = await import(pathToFileURL(join(tree, "scripts/structure/lib/index.mjs")).href);
const erase = (l) => l.replace(/\[data-v-#\d+\]/g, "[data-v]").replace(/-#\d+\b/g, "-#");
const manifest = JSON.parse(readFileSync(join(baseDir, "manifest.json"), "utf8"));
const recipes = classRecipes(openTree(tree));
let risky = 0;
for (const [key, e] of Object.entries(manifest.entries)) {
    const read = (d) => readFileSync(join(d, e.seq), "utf8").replace(/\n$/, "").split("\n").map(erase);
    const j = reorderRisks(read(baseDir), read(nowDir), recipes);
    risky += j.risks.length;
    console.log(JSON.stringify({ entry: key, rules: j.rules, moved: j.moved, swappedPairs: j.swappedPairs, risks: j.risks.length }));
    for (const r of j.risks) console.log(`  RISK ${r.moved.slice(0, 100)} <-> ${r.swappedWith.slice(0, 100)} ${JSON.stringify(r.props)}`);
}
process.exit(risky ? 1 : 0);
