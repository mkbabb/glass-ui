#!/usr/bin/env node
// literal-law.mjs — the lines G's gate leaves out where its code adds an exemption LAW.md does
// not state (S-21: a literal reading of the law must give the gate's verdict).
//   B8 (L4.2: "src reads no consumer zone"): the gate skips every edge from a test file.
//   B12 (L4.3: "Only a G door re-exports"): the gate skips every re-export from a test file.
//   node literal-law.mjs --root <tree>
import { resolve } from "node:path";
const args = process.argv.slice(2);
const root = resolve(args[args.indexOf("--root") + 1]);
const L = await import(`${root}/scripts/structure/eponym/index.mjs`);
const { zoneOf } = await import(`${root}/scripts/structure/lib/tree.mjs`);
const ctx = L.context(root);
const MODULE = new Set(["import", "import-type", "import-type-node", "import-side-effect", "reexport", "reexport-star", "reexport-ns", "dynamic", "dynamic-template", "require", "vi-mock", "sfc-style-src", "sfc-template-src", "sfc-script-src", "css-import", "sfc-inline-css-import", "css-url", "css-reference", "template-asset", "glob", "new-url"]);
const READ = new Set(["path-literal", "path-helper", "ts-reference"]);
const reach = (e) => e.to && !e.dir && (MODULE.has(e.kind) || READ.has(e.kind));
const b8 = [], b12 = [];
for (const e of ctx.g.edges) {
    if (!reach(e) || !L.isTest(e.from)) continue;
    if (zoneOf(e.from) === "src" && ["demo", "tests", "tests-visual", "scripts"].includes(zoneOf(e.to))) b8.push(`${e.from}:${e.line} → ${e.to} [${e.kind}]`);
}
for (const e of ctx.g.edges) if (e.to && e.kind.startsWith("reexport") && ["src", "scripts"].includes(zoneOf(e.from)) && L.isTest(e.from)) b12.push(`${e.from}:${e.line} → ${e.to}`);
console.log(`B8 lines the literal L4.2 adds (tests in src reading a consumer zone): ${b8.length}`);
for (const l of b8) console.log(`  ${l}`);
console.log(`B12 lines the literal L4.3 adds (re-exports from test files): ${b12.length}`);
for (const l of b12) console.log(`  ${l}`);
