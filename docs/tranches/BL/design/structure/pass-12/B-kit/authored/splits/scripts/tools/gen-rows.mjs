#!/usr/bin/env node
// gen-rows.mjs — AUTHOR-SIDE: derive the B-S11 zone-scripts split on a tree and write each
// row (../NN-<name>.mjs) as an authored input to pass-4's derive/edits.mjs.
//
//   node gen-rows.mjs --root <linked worktree at the before state> [--out <dir>]
//
// For each row of ../rows.json, in order: run its derive script (author/<script>) and then
// author/pin.mjs on the tree, and diff the tree before and after over the files a split can
// touch (the scripts zone, tests/, tests-visual/, the root build configs). Every changed file must be one
// the row names, and every file the row names must change, or the run stops before writing.
// A new file is { file, create }; a changed file is one { file, from, to } per hunk, from
// pass-4's lib/row.mjs hunksOf. The tree is left at the after state; apply.mjs --check
// re-applies the rows to a copy of the before state and compares.
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROWS = resolve(HERE, "..");
const KIT4 = resolve(HERE, "../../../../../../pass-4/B-kit");
const { hunksOf } = await import(pathToFileURL(join(KIT4, "lib/row.mjs")).href);

const args = process.argv.slice(2);
const opt = (k) => (args.includes(k) ? args[args.indexOf(k) + 1] : null);
const root = resolve(opt("--root"));
const OUT = opt("--out") ? resolve(opt("--out")) : ROWS;
const gitDir = execFileSync("git", ["-C", root, "rev-parse", "--git-dir"], { encoding: "utf8" }).trim();
const common = execFileSync("git", ["-C", root, "rev-parse", "--git-common-dir"], { encoding: "utf8" }).trim();
if (resolve(root, gitDir) === resolve(root, common)) {
    console.error("gen-rows.mjs refuses the main checkout");
    process.exit(2);
}

const SCOPE = ["scripts", "tests", "tests-visual"];
const ROOT_FILES = ["vite.style-assets.ts", "vite.style-fold.ts", "vite.library.ts", "vite.config.ts", "vitest.config.ts", "package.json"];
const SKIP = new Set(["node_modules", "dist", ".cache"]);
function snapshot() {
    const out = new Map();
    const walk = (dir) => {
        if (!existsSync(dir)) return;
        for (const name of readdirSync(dir)) {
            if (SKIP.has(name)) continue;
            const abs = join(dir, name);
            const st = statSync(abs, { throwIfNoEntry: false });
            if (!st) continue;
            if (st.isDirectory()) walk(abs);
            else out.set(relative(root, abs), readFileSync(abs, "utf8"));
        }
    };
    for (const z of SCOPE) walk(join(root, z));
    for (const f of ROOT_FILES) if (existsSync(join(root, f))) out.set(f, readFileSync(join(root, f), "utf8"));
    return out;
}

const spec = JSON.parse(readFileSync(join(ROWS, "rows.json"), "utf8"));
const summary = [];
for (const row of spec.rows) {
    const before = snapshot();
    execFileSync("node", [join(HERE, "author", row.script), "--root", root], { stdio: "inherit" });
    execFileSync("node", [join(HERE, "author", "pin.mjs"), "--root", root], { stdio: "inherit" });
    const after = snapshot();
    const changed = [...new Set([...before.keys(), ...after.keys()])].sort().filter((f) => before.get(f) !== after.get(f));
    const stop = [];
    // A key ending in "**" (e.g. "tests/**") claims every changed file under its prefix, so a
    // reader the tests seat has already re-carved is found wherever it now lives.
    const prefixes = Object.keys(row.files).filter((k) => k.endsWith("**"));
    const whyOf = (f) => row.files[f] ?? row.files[prefixes.find((k) => f.startsWith(k.slice(0, -2)))];
    for (const f of changed) if (whyOf(f) === undefined) stop.push(`${f}: changed, not named by ${row.id}`);
    for (const k of prefixes) if (!changed.some((f) => f.startsWith(k.slice(0, -2)))) stop.push(`${k}: named by ${row.id}, nothing under it changed`);
    const absent = Object.keys(row.files).filter((f) => !f.endsWith("**") && !before.has(f) && !after.has(f));
    for (const f of Object.keys(row.files)) if (!f.endsWith("**") && !changed.includes(f) && !absent.includes(f)) stop.push(`${f}: named by ${row.id}, unchanged`);
    if (absent.length) console.log(`${row.id}: not on this tree, skipped: ${absent.join(", ")}`);
    if (stop.length) {
        console.error(`${row.id}: stopped\n  ${stop.join("\n  ")}`);
        process.exit(1);
    }
    const edits = [];
    for (const f of changed) {
        const why = whyOf(f);
        const a = before.get(f) ?? null, b = after.get(f) ?? null;
        if (a === null) edits.push({ file: f, why, create: b });
        else if (b === null) edits.push({ file: f, why, remove: true });
        else for (const [from, to] of hunksOf(a, b)) edits.push({ file: f, why, from, to });
    }
    writeFileSync(
        join(OUT, `${row.id}.mjs`),
        `// ${row.id}.mjs — AUTHORED input to pass-4's derive/edits.mjs (B-S11, zone scripts).
// Generated by tools/gen-rows.mjs from the tree before and after tools/author/${row.script}
// and tools/author/pin.mjs (rows.json); every edit carries its own why.
export const why = ${JSON.stringify(row.why)};

export const edits = ${JSON.stringify(edits, null, 1)};
`,
    );
    const t = { create: 0, hunk: 0, remove: 0 };
    for (const e of edits) t[e.create !== undefined ? "create" : e.remove ? "remove" : "hunk"]++;
    summary.push({ row: row.id, files: changed.length, ...t });
}
console.log(JSON.stringify({ out: relative(process.cwd(), OUT) || ".", rows: summary }));
