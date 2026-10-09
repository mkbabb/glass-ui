#!/usr/bin/env node
// apply.mjs — apply the zone-demo B-S11 rows (../NN-*.mjs, in rows.json's order) to a
// tree, with derive/edits.mjs's rules exactly: a `from` matches once, a `create` finds no
// file, anything else stops before a write. It writes through pass-4's lib/row.mjs
// (makeRow + applyRow), so an edit that applies here applies in the chain. It records no
// step and freezes no row: landing is the route seat's, through derive/edits.mjs.
//
//   node apply.mjs --root <linked worktree or a copy> [--rows <dir>] [--only 03] [--check <after dir>]
//
// --rows (default: the rows directory, arm C's) reads a second arm's rows, e.g. arm-f/.
//
// It refuses the main checkout. --check compares, after the last row, every file in the
// demo, tests and tests-visual zones with the same file under <after dir>, both ways.
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROWS = resolve(HERE, "..");
const KIT4 = resolve(HERE, "../../../../../../pass-4/B-kit");
const { applyRow, makeRow } = await import(pathToFileURL(join(KIT4, "lib/row.mjs")).href);

const args = process.argv.slice(2);
const opt = (k) => (args.includes(k) ? args[args.indexOf(k) + 1] : null);
const root = resolve(opt("--root"));
let inGit = true;
try {
    const gitDir = execFileSync("git", ["-C", root, "rev-parse", "--git-dir"], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
    const common = execFileSync("git", ["-C", root, "rev-parse", "--git-common-dir"], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
    if (resolve(root, gitDir) === resolve(root, common)) {
        console.error("apply.mjs refuses the main checkout");
        process.exit(2);
    }
} catch {
    inGit = false; // a plain copy of the zones: no checkout to protect
}

const ORDER = JSON.parse(readFileSync(join(ROWS, "rows.json"), "utf8")).rows.map((r) => r.id);
const only = opt("--only");
const count = (t, s) => t.split(s).length - 1;

for (const id of ORDER) {
    if (only && !id.startsWith(only)) continue;
    const doc = await import(pathToFileURL(join(opt("--rows") ? resolve(opt("--rows")) : ROWS, `${id}.mjs`)).href);
    const files = {};
    const stop = [];
    for (const { file, from, to, create, remove } of doc.edits) {
        if (remove) {
            if (!existsSync(join(root, file))) stop.push(`${file}: absent`);
            else files[file] = null;
            continue;
        }
        if (create !== undefined) {
            if (existsSync(join(root, file)) || file in files) stop.push(`${file}: exists`);
            else files[file] = create;
            continue;
        }
        const text = (files[file] ??= readFileSync(join(root, file), "utf8"));
        const n = count(text, from);
        if (n !== 1) {
            stop.push(`${file}: ${n} match(es) for ${JSON.stringify(from.slice(0, 70))}`);
            continue;
        }
        files[file] = text.replace(from, () => to);
    }
    if (stop.length) {
        console.error(`${id}: stopped\n  ${stop.join("\n  ")}`);
        process.exit(1);
    }
    applyRow(root, makeRow(root, doc.why, files));
    console.log(`${id}: ${Object.keys(files).length} file(s) written`);
}

const check = opt("--check");
if (check) {
    const after = resolve(check);
    const SKIP = new Set(["node_modules", "dist", "dist-demo", ".cache", "test-results", "playwright-report"]);
    const walk = (base, dir, acc) => {
        if (!existsSync(dir)) return acc;
        for (const name of readdirSync(dir)) {
            if (SKIP.has(name)) continue;
            const abs = join(dir, name);
            const st = statSync(abs, { throwIfNoEntry: false });
            if (!st) continue;
            if (st.isDirectory()) walk(base, abs, acc);
            else acc.add(relative(base, abs));
        }
        return acc;
    };
    const X = new Set(), Y = new Set();
    for (const z of ["demo", "tests", "tests-visual"]) {
        walk(root, join(root, z), X);
        walk(after, join(after, z), Y);
    }
    const diff = [];
    for (const f of new Set([...X, ...Y])) {
        const a = X.has(f) ? readFileSync(join(root, f)) : null;
        const b = Y.has(f) ? readFileSync(join(after, f)) : null;
        if (a === null || b === null || !a.equals(b)) diff.push(f);
    }
    console.log(JSON.stringify({ check: relative(process.cwd(), after) || ".", files: X.size, differ: diff.length, first: diff.slice(0, 10) }));
    if (diff.length) process.exit(1);
}
