// W-D.1 probe: the F-55..F-59 defects read over the floor's F-1 graph (the one graph W-D.1 lands).
// Independent of the seal's code: it restates four registry born-REDs as counts.
//   node d1-probe.mjs <root> <floor lib/graph.mjs>      one line per arm; exit 1 when any arm is over 0
// Arms:
//   VALUE-SCC      module SCCs over value edges in src (a module is a directory, kind slots
//                  composables/ styles/ __tests__/ folded into their owner)            [F-59, REG:1324]
//   CROSS-JS       src edges (import, import-type, reexport, dynamic) from outside a component dir
//                  into one of its files other than its root index.ts                  [F-56, F-58, F-59]
//   CROSS-CSS      src CSS edges (css-import, sfc-style-src) from outside a component dir into one
//                  of its sheets other than its root index.css                          [F-56, F-57 L12-05]
//   DEAD-BARREL    src/components/index.ts present with no code reader                  [F-58 L12-10]
//   ALIAS-TYPE     `export type X = Y;` in src where Y is imported from inside the library (a second
//                  name for one type)                                                    [F-58 L10-20, E-1]
import { readFileSync } from "node:fs";
import { join, resolve, posix } from "node:path";
import { pathToFileURL } from "node:url";
const root = resolve(process.argv[2]);
const { buildGraph } = await import(pathToFileURL(resolve(process.argv[3])).href);
const g = buildGraph(root);
const E = g.edges.filter((e) => e.to && e.from !== e.to && e.from.startsWith("src/") && e.to.startsWith("src/") && !/\/__tests__\//.test(e.from));

const VALUE = new Set(["import", "reexport", "reexport-star", "dynamic", "import-side-effect", "require"]);
const SLOT = new Set(["composables", "styles", "__tests__"]);
const mod = (f) => { let d = posix.dirname(f); while (SLOT.has(posix.basename(d)) && d.includes("/")) d = posix.dirname(d); return d; };
const adj = new Map();
for (const e of E) { if (!VALUE.has(e.kind)) continue; const a = mod(e.from), b = mod(e.to); if (a === b) continue;
  if (!adj.has(a)) adj.set(a, new Set()); if (!adj.has(b)) adj.set(b, new Set()); adj.get(a).add(b); }
let n = 0; const I = new Map(), L = new Map(), on = new Set(), st = [], sccs = [];
const visit = (v) => { I.set(v, n); L.set(v, n++); st.push(v); on.add(v);
  for (const w of adj.get(v)) { if (!I.has(w)) { visit(w); L.set(v, Math.min(L.get(v), L.get(w))); } else if (on.has(w)) L.set(v, Math.min(L.get(v), I.get(w))); }
  if (L.get(v) === I.get(v)) { const c = []; let w; do { w = st.pop(); on.delete(w); c.push(w); } while (w !== v); if (c.length > 1) sccs.push(c.sort()); } };
for (const v of adj.keys()) if (!I.has(v)) visit(v);

const unitOf = (f) => { const a = f.split("/"); return a[1] === "components" && a[2] !== "_shared" && a.length > 3 ? `src/components/${a[2]}` : null; };
const crossing = (kinds, door) => E.filter((e) => kinds.has(e.kind)).filter((e) => {
  const u = unitOf(e.to); if (!u || unitOf(e.from) === u) return false;
  return e.to !== `${u}/${door}`; });
const js = crossing(new Set(["import", "import-type", "reexport", "reexport-star", "dynamic", "import-side-effect"]), "index.ts");
const css = crossing(new Set(["css-import", "sfc-style-src"]), "index.css");
const barrel = "src/components/index.ts";
const CODE_READ = new Set([...VALUE, "import-type"]); // a Tailwind @source scan and a record's json-ref are not readers
const dead = g.tree.files.includes(barrel) && !g.edges.some((e) => e.to === barrel && e.from !== barrel && CODE_READ.has(e.kind));

const aliases = g.tree.files.filter((f) => f.startsWith("src/") && /\.(ts|vue)$/.test(f) && !/\/__tests__\//.test(f)).flatMap((f) => {
  const t = readFileSync(join(root, f), "utf8");
  return [...t.matchAll(/^export type (\w+) = (\w+);$/gm)].filter(([, , y]) =>
    new RegExp(`import\\s+(type\\s+)?\\{[^}]*\\b${y}\\b[^}]*\\}\\s+from\\s+["']\\.`).test(t)).map(([, x, y]) => `${f}: ${x} = ${y}`); });

const rows = [
  ["VALUE-SCC", sccs.length, sccs.map((c) => `[${c.length}] ${c.join(", ")}`).join(" | ")],
  ["CROSS-JS", js.length, js.map((e) => `${e.from}:${e.line} -> ${e.to}`).join("; ")],
  ["CROSS-CSS", css.length, css.map((e) => `${e.from}:${e.line} -> ${e.to}`).join("; ")],
  ["DEAD-BARREL", dead ? 1 : 0, `${barrel} present=${g.tree.files.includes(barrel)}`],
  ["ALIAS-TYPE", aliases.length, aliases.join("; ")],
];
for (const [k, c, d] of rows) console.log(`${c ? "FAIL" : "PASS"} ${k} ${c} :: ${d}`);
process.exitCode = rows.some(([, c]) => c) ? 1 : 0;
