#!/usr/bin/env node
// DEL · H6-1 (pass 6): a mechanism a patch deletes is not described as live anywhere in the tree. The prose sweep read
// only the sentences a ruling named, so the earned darken's description outlived it in five touched files and one
// untouched one (pass-5 Crit A-1, REGISTRY P5-2.2 R-10). A deletion falsifies untouched prose too, so this reads EVERY
// file under src/ and demo/ (text files; node_modules and binaries skipped), not only the files the patch touches.
// Each patch declares the names of the mechanisms it deletes in a JSON file beside the harness ({ patch, names: [] }).
//   a name with a space   a phrase: case-insensitive, its words matched across any run of whitespace and comment
//                         leaders (* // #), so a phrase broken over two comment lines is still found
//   a name without one    an identifier: matched exactly, as written
// One gated row per declared name; a name with any hit is a FAIL row, and each hit prints file:line.
//   node deleted-mechanisms.mjs --root <tree> --declare <names.json>
import fs from "node:fs";
import path from "node:path";
import { cli } from "./lib.mjs";

const a = cli({ root: { type: "string" }, declare: { type: "string" } });
console.log("DEL · no file under src/ or demo/ describes a mechanism the patch deletes (static; H6-1)");
if (!a.root || !a.declare) { console.log("usage: node deleted-mechanisms.mjs --root <tree> --declare <names.json>\nFAIL (no gated rows measured: no tree or no declaration)"); process.exit(2); }
const root = path.resolve(a.root), decl = JSON.parse(fs.readFileSync(path.resolve(a.declare), "utf8"));
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const pattern = (n) => (/\s/.test(n.trim()) ? new RegExp(n.trim().split(/\s+/).map(esc).join("(?:[\\s*#]|//)+"), "gi") : new RegExp(esc(n), "g"));
const walk = (d) => (fs.existsSync(d) ? fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.name === "node_modules" ? [] : e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)])) : []);
const files = [...walk(path.join(root, "src")), ...walk(path.join(root, "demo"))].map((f) => [f, fs.readFileSync(f)]).filter(([, b]) => !b.subarray(0, 8192).includes(0)).map(([f, b]) => [path.relative(root, f), b.toString("utf8")]);
console.log(`tree: ${root} · ${files.length} text files under src/ and demo/ · declaration: ${decl.patch || path.basename(a.declare)}`);
let fails = 0, hitsAll = 0;
const where = new Set();
for (const name of decl.names) {
  const re = pattern(name), hits = [];
  for (const [rel, text] of files) for (const m of text.matchAll(re)) { const line = text.slice(0, m.index).split("\n").length; hits.push(`${rel}:${line}`); where.add(rel); }
  hitsAll += hits.length;
  if (!hits.length) { console.log(`  ✓ "${name}": 0`); continue; }
  fails++;
  console.log(`  ✗ "${name}": ${hits.length} · ${hits.join(" ")}`);
}
console.log(`DELETED-MECHANISMS names=${decl.names.length} hits=${hitsAll} files=${where.size}`);
console.log(fails ? `FAIL (${fails} of ${decl.names.length} gated rows)` : `PASS (${decl.names.length} gated rows)`);
process.exit(fails ? 1 : 0);
