#!/usr/bin/env node
// extract-css-door.mjs — generation-time only: write the B14 purity row for one CSS door (LAW.md
// L4.4). A CSS door holds only @import, bodiless @layer and @source for its own subtree. Every
// other top-level node of door D (with the comments directly above it) moves, verbatim and in
// order, into a new module <dir>/<name>, and D imports that module after its last @import. CSS
// requires every @import to precede every rule, so the moved nodes already sat after all of D's
// imports: the flattened cascade is the same sequence (cascade.mjs verify judges it). The name
// is authored (names.json `purity`): it says what the module holds.
//   node extract-css-door.mjs --root <wt> --door <path> --to <name.css> --out <row.json>
import { createRequire } from "node:module";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join, posix, resolve } from "node:path";

const args = process.argv.slice(2);
const opt = (k) => (args.includes(k) ? args[args.indexOf(k) + 1] : null);
const root = resolve(opt("--root"));
const door = opt("--door");
const to = opt("--to");
const postcss = createRequire(join(root, "package.json"))("postcss");
const target = `${posix.dirname(door)}/${to}`;
if (existsSync(join(root, target))) throw new Error(`${target} exists`);
const text = readFileSync(join(root, door), "utf8");
const ast = postcss.parse(text);
const allowed = (n) => n.type === "atrule" && (n.name === "import" || (n.name === "layer" && !n.nodes) || (n.name === "source" && !/\.\.\//.test(n.params)));
const nodes = ast.nodes;
const lastKept = nodes.reduce((i, n, k) => (allowed(n) ? k : i), -1);
// a moved node carries the comments directly above it (back to the previous non-comment node)
const moved = [];
for (let k = 0; k < nodes.length; k++) {
    const n = nodes[k];
    if (n.type === "comment" || allowed(n)) continue;
    if (k < lastKept) throw new Error(`${door}: a rule precedes an allowed node (line ${n.source.start.line}); the door is not an @import root`);
    let s = k;
    while (s > 0 && nodes[s - 1].type === "comment" && s - 1 > lastKept) s--;
    moved.push([s, k]);
}
if (!moved.length) throw new Error(`${door}: nothing to move`);
const startOff = nodes[moved[0][0]].source.start.offset;
const endOff = nodes[moved.at(-1)[1]].source.end.offset; // postcss end offsets are exclusive
const body = text.slice(startOff, endOff);
const importLine = `@import "./${to}";`;
const lastImport = nodes[lastKept];
const cut = text.slice(0, startOff).replace(/\n+$/, "\n");
const at = lastImport.source.end.offset;
const doorAfter = `${cut.slice(0, at)}\n${importLine}${cut.slice(at)}${text.slice(endOff).replace(/^\n+/, "")}`;
const modHead = `/* ${to}: moved verbatim from ${posix.basename(door)} (L4.4, B14: a door holds only its imports), imported last. */\n`;
const files = { [door]: { before: text, after: doorAfter.replace(/\n*$/, "\n") }, [target]: { before: null, after: `${modHead}${body}\n` } };
writeFileSync(opt("--out"), `${JSON.stringify({ step: `G CSS door purity (L4.4, B14): ${door} → ${target}`, door, target, nodes: moved.length, files }, null, 1)}\n`);
console.log(JSON.stringify({ door, target, nodes: moved.length, bytes: body.length }));
