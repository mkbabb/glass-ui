// W-D.1 probe: one symbol, one door (E-1, R-6, F-58). Reads the BUILT surface (every package entry's
// runtime and declaration names, through the floor's readSurface) and prints every name that two or more
// subpath entries publish. The root entry "." is the aggregate barrel and is not counted.
//   node one-door.mjs <root> <readSurface module>     exit 1 when any name has two doors
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
const root = resolve(process.argv[2] ?? ".");
const { readSurface } = await import(pathToFileURL(resolve(process.argv[3])).href);
const s = await readSurface(root, resolve(root, "dist"));
const entries = s.entries ?? s;
const by = new Map();
for (const [entry, v] of Object.entries(entries)) {
  if (entry === ".") continue;
  for (const n of new Set([...(v.runtime ?? []), ...(v.types ?? [])])) { if (!by.has(n)) by.set(n, new Set()); by.get(n).add(entry); }
}
const multi = [...by].filter(([, e]) => e.size > 1);
const pairs = {};
for (const [, e] of multi) { const k = [...e].sort().join(" + "); pairs[k] = (pairs[k] ?? 0) + 1; }
console.log(`one-door: ${multi.length} names on two or more entries`);
for (const [k, n] of Object.entries(pairs)) console.log(`  ${n}  ${k}`);
process.exitCode = multi.length ? 1 : 0;
