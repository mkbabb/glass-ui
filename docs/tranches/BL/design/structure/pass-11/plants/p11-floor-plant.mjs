#!/usr/bin/env node
// p11-floor-plant.mjs — the floor plant for P10-R1 (a) (FLOOR.md P11-F1): the move engine keeps a
// root-relative spelling's `./` lead when its holder moves (F-2, P4-F3: "a root-relative spelling is
// kept verbatim").
//   node p11-floor-plant.mjs --root <linked worktree> [--engine <move.mjs CLI>]
// The engine defaults to the tree's own floor: scripts/structure/move.mjs once S1 has landed it, else
// the docs home's move.mjs. The plant writes a holder of `"./dist/index.d.ts"` (the shape of
// lib/entries.mjs:70, the root export's value) at scripts/p11-dot-lead.mjs, moves it to
// scripts/p11-dot-lead/holder.mjs with the engine, and reads the moved file. It then deletes both
// paths and checks the tree's code digest is the one it started from.
// Exit: 0 when the engine applied the move and the spelling is kept (KEPT); 1 when the engine
// refused the move or respelled the path (LOST); 2 on any throw, or a tree the plant could not
// restore.
import { execFileSync, spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, lstatSync, mkdtempSync, readFileSync, rmSync, rmdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

process.on("uncaughtException", (e) => {
    console.error(`p11-floor-plant: no verdict: ${e?.stack ?? e}`);
    process.exit(2);
});

const a = process.argv.slice(2);
const opt = (k) => {
    const i = a.indexOf(k);
    if (i < 0) return null;
    if (i + 1 >= a.length || a[i + 1].startsWith("--")) throw new Error(`${k} takes a value`);
    return a[i + 1];
};
if (!opt("--root")) throw new Error("--root <linked worktree> is required");
const root = resolve(opt("--root"));
const landed = join(root, "scripts/structure/move.mjs");
const home = join(root, "docs/tranches/BL/design/structure/floor/move.mjs");
const engine = opt("--engine") ? resolve(opt("--engine")) : existsSync(landed) ? landed : home;
if (!existsSync(engine)) throw new Error(`no move engine at ${engine}`);

const digest = () => {
    const out = execFileSync("git", ["-C", root, "ls-files", "-co", "--exclude-standard", "-z"], { encoding: "utf8", maxBuffer: 1 << 28 });
    const files = [...new Set(out.split("\0").filter(Boolean))].filter((f) => !f.startsWith("docs/") && f !== "node_modules").filter((f) => { const p = join(root, f); return existsSync(p) && !lstatSync(p).isSymbolicLink() && lstatSync(p).isFile(); }).sort();
    const h = createHash("sha256");
    for (const f of files) h.update(`${f}\0${createHash("sha256").update(readFileSync(join(root, f))).digest("hex")}\n`);
    return h.digest("hex");
};

const FROM = "scripts/p11-dot-lead.mjs", TO = "scripts/p11-dot-lead/holder.mjs";
const SPELLING = '"./dist/index.d.ts"';
const before = digest();
if (existsSync(join(root, FROM)) || existsSync(join(root, TO))) throw new Error(`the tree already holds ${FROM} or ${TO}`);
writeFileSync(join(root, FROM), `// a holder of a root-relative path to a generated output, in the shape of lib/entries.mjs:70\nexport const rootExport = () => ({ types: ${SPELLING}, import: "./dist/glass-ui.js" });\n`);
const tmp = mkdtempSync(join(tmpdir(), "p11-floor-plant-"));
let verdict, detail;
try {
    const list = join(tmp, "list.json");
    writeFileSync(list, JSON.stringify({ moves: [{ from: FROM, to: TO }], scanDeltas: [], globDeltas: [] }));
    const run = spawnSync(process.execPath, [engine, list, "--root", root], { encoding: "utf8", maxBuffer: 1 << 27 });
    if (run.status !== 0) { verdict = "LOST"; detail = `the engine refused the move (exit ${run.status}): ${(run.stdout + run.stderr).split("\n").filter((l) => /refus|lost|REFUSED|image|residue/i.test(l)).slice(0, 3).join(" | ").slice(0, 300)}`; }
    else {
        const text = readFileSync(join(root, TO), "utf8");
        const kept = text.includes(SPELLING);
        verdict = kept ? "KEPT" : "LOST";
        detail = `moved; ${TO} holds ${kept ? SPELLING : (text.match(/types: ("[^"]*")/)?.[1] ?? "no types path")}`;
    }
} finally {
    rmSync(join(root, FROM), { force: true });
    rmSync(join(root, TO), { force: true });
    if (existsSync(join(root, "scripts/p11-dot-lead"))) rmdirSync(join(root, "scripts/p11-dot-lead"));
    rmSync(tmp, { recursive: true, force: true });
}
const after = digest();
if (after !== before) throw new Error(`the plant left the tree changed: ${before.slice(0, 16)}… → ${after.slice(0, 16)}…`);
console.log(`p11-floor-plant: ${verdict} · engine ${engine.replace(`${root}/`, "")} · ${detail} · tree restored ${after.slice(0, 16)}…`);
process.exitCode = verdict === "KEPT" ? 0 : 1;
