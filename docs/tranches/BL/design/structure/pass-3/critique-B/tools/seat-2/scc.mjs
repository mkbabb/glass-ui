// critique-B seat 2 · coupling base → final. Each tree is read by ITS OWN floor (the base by b602a59b's
// docs/…/floor/lib, the replayed tree by its landed scripts/structure/lib): the two differ only in import
// specifiers and one additive function (xj-GonB §1), and each refuses the other tree's record location.
//   node scc.mjs --libBase <base floor>/lib --base <base tree> --libFinal <tree>/scripts/structure/lib --final <tree>
// Reports valueSccs(src) and moduleSccs over dirUnits (FD-2's own unit function): non-trivial SCCs, members, largest.
import { pathToFileURL } from "node:url";
import { join } from "node:path";
const a = Object.fromEntries(process.argv.slice(2).reduce((o, v, i, all) => (v.startsWith("--") ? o.concat([[v.slice(2), all[i + 1]]]) : o), []));
const sum = (sccs) => { const nt = sccs.map((c) => c.members ?? c).filter((c) => c.length > 1); const sizes = nt.map((c) => c.length); return { sccs: nt.length, members: sizes.reduce((x, y) => x + y, 0), largest: Math.max(0, ...sizes), top: nt.sort((x, y) => y.length - x.length)[0]?.slice(0, 40) }; };
const out = {};
for (const [k, root, lib] of [["base", a.base, a.libBase], ["final", a.final, a.libFinal]]) {
  const G = await import(pathToFileURL(join(lib, "graph.mjs")).href).catch(() => import(pathToFileURL(join(lib, "graph/index.mjs")).href));
  const g = G.buildGraph(root);
  out[k] = {
    edges: g.edges.length,
    valueSccs_src: sum(G.valueSccs(g, "src")),
    moduleSccs_dirUnits_src_demo: sum(G.moduleSccs(g, {})),
    moduleSccs_dirUnits_src_scripts: sum(G.moduleSccs(g, { zones: ["src", "scripts"] })),
  };
}
console.log(JSON.stringify(out, null, 1));
