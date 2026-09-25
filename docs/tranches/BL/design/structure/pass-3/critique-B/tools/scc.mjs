// tools/scc.mjs <floor lib dir> <tree root> — module SCCs (floor moduleSccs over dirUnits) in three zone sets.
// Used for FD-2 over the whole migration: base = the checkout's docs floor over a b602a59b-identical tree,
// final = the replayed tree's landed floor over the replayed tree.
import { existsSync } from "node:fs";
import { pathToFileURL } from "node:url";
const [lib, root] = process.argv.slice(2);
const gmod = await import(pathToFileURL(`${lib}/${existsSync(`${lib}/graph/graph.mjs`) ? "graph/graph.mjs" : "graph.mjs"}`));
const { dirUnits } = await import(pathToFileURL(`${lib}/placement.mjs`));
const g = gmod.buildGraph(root);
for (const zones of [["src"], ["src", "demo"], ["src", "scripts", "demo"]]) {
    const r = gmod.moduleSccs(g, { moduleOf: dirUnits().unitOf, zones });
    const sccs = (r.sccs ?? r).filter?.((c) => c.length > 1) ?? r;
    console.log(JSON.stringify({ zones, sccs: sccs.length, members: sccs.reduce((a, c) => a + c.length, 0), list: sccs.map((c) => c.join(" ↔ ")).slice(0, 6) }));
}
