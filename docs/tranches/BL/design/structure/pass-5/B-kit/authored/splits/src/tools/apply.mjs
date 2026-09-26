#!/usr/bin/env node
// apply.mjs — apply the zone-src B-S11 split rows, in ORDER.json's order, to a LINKED
// worktree that holds pass-4's chained tree (the replay's final digest, 6618df1f…) or a
// tree the route seat has re-derived to the same src text.
//
//   node apply.mjs --root <linked worktree> [--only 03] [--through 07] [--check <after dir>]
//
// A row is `NN-<name>.mjs` (derive/edits.mjs's authored vocabulary: create, remove, exact
// `from`/`to`) and, when it moves files, `NN-<name>.moves.json` applied FIRST through the
// tree's own floor engine (scripts/structure/move.mjs), which rewrites every reference.
// The edits use derive/edits.mjs's rules exactly (a `from` matches once; anything else
// stops before a write) and pass-4's lib/row.mjs to write, so an edit that applies here
// applies there. Nothing is written into the kit: this tool records no step and freezes
// no row. That is the route seat's job, through derive/edits.mjs.
// --check compares the tree after the last applied row with a directory, file by file.
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
const gitDir = execFileSync("git", ["-C", root, "rev-parse", "--git-dir"], { encoding: "utf8" }).trim();
const common = execFileSync("git", ["-C", root, "rev-parse", "--git-common-dir"], { encoding: "utf8" }).trim();
if (resolve(root, gitDir) === resolve(root, common)) { console.error("apply.mjs refuses the main checkout"); process.exit(2); }

const ORDER = JSON.parse(readFileSync(join(ROWS, "ORDER.json"), "utf8")).rows;
const only = opt("--only"), through = opt("--through");
const count = (t, s) => t.split(s).length - 1;

function editsRow(doc) {
    const files = {};
    const stop = [];
    for (const { file, from, until, to, all, create, remove } of doc.edits) {
        if (remove) { if (!existsSync(join(root, file))) stop.push(`${file}: absent`); else files[file] = null; continue; }
        if (create !== undefined) { if (existsSync(join(root, file)) || file in files) stop.push(`${file}: exists`); else files[file] = create; continue; }
        const text = (files[file] ??= readFileSync(join(root, file), "utf8"));
        const n = count(text, from);
        if (until !== undefined) {
            if (n !== 1 || count(text, until) !== 1) { stop.push(`${file}: span`); continue; }
            const i = text.indexOf(from), j = text.indexOf(until) + until.length;
            files[file] = text.slice(0, i) + to + text.slice(j);
            continue;
        }
        if (all ? n < 1 : n !== 1) { stop.push(`${file}: ${n} match(es) for ${JSON.stringify(from.slice(0, 70))}`); continue; }
        files[file] = all ? text.split(from).join(to) : text.replace(from, () => to);
    }
    if (stop.length) throw new Error(`stopped\n  ${stop.join("\n  ")}`);
    return makeRow(root, doc.why, files);
}

for (const id of ORDER) {
    const nn = id.slice(0, 2);
    if (only && nn !== only) continue;
    if (through && nn > through) break;
    const moves = join(ROWS, `${id}.moves.json`);
    if (existsSync(moves)) {
        const out = execFileSync("node", [join(root, "scripts/structure/move.mjs"), moves, "--root", root], { encoding: "utf8", maxBuffer: 1 << 26 });
        const r = JSON.parse(out.slice(out.indexOf("{"), out.indexOf("\n}") + 2));
        console.log(`${id} moves: ok ${r.ok}, ${r.moves ?? ""} ${r.pending ?? 0} pending, ${r.alreadyApplied ?? 0} applied`);
    }
    const doc = await import(pathToFileURL(join(ROWS, `${id}.mjs`)).href);
    const r = applyRow(root, editsRow(doc));
    console.log(`${id} edits: ${r.written} file(s) written, ${r.applied} already applied`);
}

const check = opt("--check");
if (check) {
    const SKIP = new Set(["node_modules", "dist", "dist-demo", ".git", ".vite", "coverage"]);
    const walk = (base, dir = base, acc = new Set()) => {
        for (const name of readdirSync(dir)) {
            if (SKIP.has(name) || (dir === base && name === "docs")) continue;
            const abs = join(dir, name);
            const st = statSync(abs, { throwIfNoEntry: false });
            if (!st) continue;
            if (st.isDirectory()) walk(base, abs, acc); else acc.add(relative(base, abs));
        }
        return acc;
    };
    const A = walk(root), B = walk(resolve(check));
    const diff = [...new Set([...A, ...B])].filter((f) => !A.has(f) || !B.has(f) || readFileSync(join(root, f), "utf8") !== readFileSync(join(resolve(check), f), "utf8"));
    console.log(`check against ${check}: ${diff.length ? `DIFFERS in ${diff.length} file(s)\n  ${diff.slice(0, 20).join("\n  ")}` : "IDENTICAL"}`);
    process.exitCode = diff.length ? 1 : 0;
}
