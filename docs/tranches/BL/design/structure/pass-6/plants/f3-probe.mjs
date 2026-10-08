#!/usr/bin/env node
// f3-probe.mjs --root <tree> [--file <src file>] — pass 6 · P6-F3's reading. Calls the tree's
// own landed floor (scripts/structure) and prints what each reader did with its input:
//   GRAPH THREW <message>                     buildGraph refused the tree
//   GRAPH built: <e> edges, <v> violations (<k> by kind), <l> ledgered edges
//   CLASSES THREW <message>                   classesOf refused the file
//   CLASSES <n>: <classes>                    classesOf's reading of --file
// Each reader runs on its own, so a refusal in one does not hide the other's reading.
// Exit 0; the verdict is the caller's.
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const arg = (k) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : null; };
const root = resolve(arg("--root"));
const lib = (m) => import(pathToFileURL(join(root, "scripts/structure/lib", m)).href);
const G = await lib("graph.mjs");
const R = await lib("recipes.mjs");
const T = await lib("tree.mjs");
try {
    const g = G.buildGraph(root);
    const byKind = {};
    for (const v of g.violations) byKind[v.kind] = (byKind[v.kind] ?? 0) + 1;
    console.log(`GRAPH built: ${g.edges.length} edges, ${g.violations.length} violations (${JSON.stringify(byKind)}), ${g.edges.filter((e) => e.via === "ledger").length} ledgered edges`);
} catch (e) {
    console.log(`GRAPH THREW ${String(e.message).split("\n")[0]}`);
}
const file = arg("--file");
if (file) {
    try {
        const tree = T.openTree(root);
        const recipes = R.classRecipes(tree);
        const own = R.classOwners(tree);
        const cls = R.classesOf(tree, file, own, recipes);
        console.log(`CLASSES ${cls.size}: ${[...cls].sort().join(" ")}`);
    } catch (e) {
        console.log(`CLASSES THREW ${String(e.message).split("\n")[0]}`);
    }
}
