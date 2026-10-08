#!/usr/bin/env node
// gen-edits.mjs — AUTHOR-SIDE (pass 5): write an authored edits module (derive/edits.mjs's
// vocabulary) from a tree before a hand edit and the tree after it. The author edits a linked
// worktree, then this tool reads every file that differs between <before> and <root> over the
// zones and root files named, and writes one edit per hunk (lib/row.mjs hunksOf: each `from`
// widened with context until it occurs once), a `create` per new file and a `remove` per
// deleted one. Each edit carries the why the author gives for its file (--whys, a JSON map
// from a path or a path prefix ending in `/` to the reason; the longest match wins); a
// changed file no why covers stops the run. With --restore the tree is put back to <before>
// for the changed files, so derive/edits.mjs can then land the module as a recorded row.
//   node derive/gen-edits.mjs --before <snapshot dir> --root <wt> --out authored/x.mjs --why "…" --whys whys.json [--restore]
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { arg } from "../lib/floor.mjs";
import { hunksOf } from "../lib/row.mjs";
import { KIT } from "../lib/sequence.mjs";

const args = process.argv.slice(2);
const before = resolve(arg(args, "--before"));
const root = resolve(arg(args, "--root"));
const whys = JSON.parse(readFileSync(resolve(arg(args, "--whys")), "utf8"));
const ZONES = ["src", "demo", "scripts", "tests", "tests-visual", ".github"];
const SKIP = new Set(["node_modules", "dist", "dist-demo", ".git", ".vite", "coverage", "test-results", ".cache"]);
const list = (base) => {
    const out = new Set();
    const walk = (d) => { if (!existsSync(join(base, d))) return; for (const n of readdirSync(join(base, d))) { if (SKIP.has(n)) continue; const p = d ? `${d}/${n}` : n; const st = statSync(join(base, p), { throwIfNoEntry: false }); if (!st) continue; if (st.isDirectory()) walk(p); else out.add(p); } };
    for (const z of ZONES) walk(z);
    for (const n of readdirSync(base)) { const st = statSync(join(base, n)); if (st.isFile()) out.add(n); }
    return out;
};
const A = list(before), B = list(root);
const whyOf = (f) => { let best = null; for (const k of Object.keys(whys)) if ((f === k || (k.endsWith("/") && f.startsWith(k))) && (!best || k.length > best.length)) best = k; return best && whys[best]; };
const edits = [], stop = [];
for (const f of [...new Set([...A, ...B])].sort()) {
    const a = A.has(f) ? readFileSync(join(before, f), "utf8") : null;
    const b = B.has(f) ? readFileSync(join(root, f), "utf8") : null;
    if (a === b) continue;
    const why = whyOf(f);
    if (!why) { stop.push(f); continue; }
    if (a === null) edits.push({ file: f, why, create: b });
    else if (b === null) edits.push({ file: f, why, remove: true });
    else for (const [from, to] of hunksOf(a, b)) edits.push({ file: f, why, from, to });
}
if (stop.length) { console.error(`gen-edits: no why for\n  ${stop.join("\n  ")}`); process.exit(1); }
if (!edits.length) { console.error("gen-edits: the trees do not differ"); process.exit(1); }
const out = arg(args, "--out");
writeFileSync(join(KIT, out), `// ${out} — AUTHORED input to derive/edits.mjs, written by derive/gen-edits.mjs from the tree\n// before a hand edit and the tree after it; each edit carries its file's why.\nexport const why = ${JSON.stringify(arg(args, "--why"))};\n\nexport const edits = ${JSON.stringify(edits, null, 1)};\n`);
console.log(`gen-edits: ${edits.length} edit(s) over ${new Set(edits.map((e) => e.file)).size} file(s) → ${out}`);
if (args.includes("--restore")) for (const e of new Map(edits.map((x) => [x.file, x])).values()) {
    const p = join(root, e.file);
    if (A.has(e.file)) { mkdirSync(dirname(p), { recursive: true }); writeFileSync(p, readFileSync(join(before, e.file))); }
    else { rmSync(p); for (let d = dirname(p); d !== root && existsSync(d) && !readdirSync(d).length; d = dirname(d)) rmSync(d, { recursive: true }); }
}
