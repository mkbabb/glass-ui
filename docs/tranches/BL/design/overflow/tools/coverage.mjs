#!/usr/bin/env node
// coverage.mjs <tree>: for every component directory under src/components, the demo
// files that import it (stories, chassis, shell) and the stress page. A component with
// none was not mounted by the sweep.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
const tree = process.argv[2];
const comps = readdirSync(join(tree, "src/components")).filter((d) => !d.startsWith("_") && statSync(join(tree, "src/components", d)).isDirectory());
const files = [];
const walk = (d) => {
    for (const f of readdirSync(d)) {
        const p = join(d, f);
        if (statSync(p).isDirectory()) walk(p);
        else if (/\.(vue|ts)$/.test(f)) files.push(p);
    }
};
for (const d of ["demo/stories", "demo/chassis", "demo/shell", "demo/__ovf"]) {
    try { walk(join(tree, d)); } catch {}
}
const src = files.map((f) => [f, readFileSync(f, "utf8")]);
const out = {};
for (const c of comps) {
    const re = new RegExp(`@glass/components/${c}["/]`);
    out[c] = src.filter(([, s]) => re.test(s)).map(([f]) => f.slice(tree.length + 1));
}
for (const [c, fs] of Object.entries(out)) console.log(`${c.padEnd(22)} ${fs.length}  ${fs.slice(0, 2).join(" ")}`);
