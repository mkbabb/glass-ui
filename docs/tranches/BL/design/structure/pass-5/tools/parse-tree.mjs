#!/usr/bin/env node
// parse-tree.mjs --root <tree> — P5-F4's reading of a whole tree: every tracked file of a kind
// lib/syntax.mjs parses (scripts, SFCs, CSS, JSON), outside docs/, parsed as the engine and
// the row transaction parse a write. A clean tree reads 0, so the parse check refuses only
// what a step breaks. Uses the tree's own floor (scripts/structure once landed).
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const args = process.argv.slice(2);
const root = resolve(args[args.indexOf("--root") + 1]);
const home = existsSync(join(root, "scripts/structure/lib/syntax.mjs")) ? "scripts/structure" : "docs/tranches/BL/design/structure/floor";
const { unparsed } = await import(pathToFileURL(join(root, home, "lib/syntax.mjs")).href);
const { loadDeps } = await import(pathToFileURL(join(root, home, "lib/graph.mjs")).href);
const deps = loadDeps(root);
const files = execFileSync("git", ["-C", root, "ls-files", "-co", "--exclude-standard"], { encoding: "utf8", maxBuffer: 1 << 28 })
    .split("\n")
    .filter((f) => /\.(tsx?|mts|cts|jsx?|mjs|cjs|vue|css|json|jsonc)$/.test(f) && !f.startsWith("docs/") && existsSync(join(root, f)));
const bad = [];
for (const f of files) bad.push(...unparsed(deps, [[f, readFileSync(join(root, f), "utf8")]]));
console.log(JSON.stringify({ floor: home, files: files.length, unparsed: bad.length }));
for (const b of bad) console.log(`UNPARSED ${b.file}: ${b.error}`);
process.exit(bad.length ? 1 : 0);
