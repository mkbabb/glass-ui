// W-D.1 probe: one public name, one symbol. A name that is a runtime export on one entry and a
// type-only export on another denotes two different symbols (a collision a consumer resolves by
// which subpath they happen to import). Reads the built surface through the floor's readSurface.
//   node one-name.mjs <root> <readSurface module>      exit 1 on any collision
import { resolve } from "node:path"; import { pathToFileURL } from "node:url";
const root = resolve(process.argv[2]); const { readSurface } = await import(pathToFileURL(resolve(process.argv[3])).href);
const s = await readSurface(root, resolve(root, "dist")); const entries = s.entries ?? s;
const rt = new Map(), ty = new Map();
for (const [k, v] of Object.entries(entries)) {
  const r = new Set(v.runtime ?? []);
  for (const n of r) (rt.get(n) ?? rt.set(n, []).get(n)).push(k);
  for (const n of v.types ?? []) if (!r.has(n)) (ty.get(n) ?? ty.set(n, []).get(n)).push(k);
}
const hits = [...rt].filter(([n]) => ty.has(n)).map(([n, e]) => `${n}: runtime on ${e.join(" ")}; type-only on ${ty.get(n).join(" ")}`);
console.log(`one-name: ${hits.length} names denote a runtime symbol on one entry and a type on another`); for (const h of hits) console.log("  " + h);
process.exitCode = hits.length ? 1 : 0;
