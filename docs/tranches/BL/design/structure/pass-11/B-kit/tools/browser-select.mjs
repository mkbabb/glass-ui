#!/usr/bin/env node
// browser-select.mjs — the browser seat's selection arguments, derived from the committed chain
// alone (pass 7, P6-G4), so the graph-selected run is re-derivable from committed bytes.
// Every frozen move list's moves, and every row's file: a row path the final tree holds is a
// `--changed` file; a row path the final tree does not hold (a file a row removed: a cut test, a
// row-moved spec, the scroll spine leaving src) is carried as a move onto the row-created file of
// the same stem when there is exactly one, else onto itself, so its old path and name still
// select the specs that name it. The floor rows (S1) are the base's own and select nothing.
// (pass 8, P7-G3) A spec the chain moves, creates or edits is selected by name: the graph's
// bands select a spec by what it reads, and a moved spec does not read its own path, so a
// band-less moved spec (S43b's w38-binding) went unselected in pass 7. Every path a move or a
// row touches that is a spec of the final tree's Playwright program is written to specs.txt
// (one program key per line), which the run passes as --specs.
// (pass 9, P8-R1 (a); LAW §13) The capture specs (`_`-prefixed) are excluded by statement, not
// by silence: every capture spec of the final program that a move or a row touches is written to
// captures.txt with the steps that touch it, and printed. B0 reads its imports: the floor graph
// resolves every reference in tests-visual/, so a moved capture spec whose import resolves to
// nothing is an F-1 violation and the gate reads RED.
//   node tools/browser-select.mjs --root <final tree> --out <dir>
// writes <dir>/moved.json ({ moves }), <dir>/changed.txt (one path per line), <dir>/specs.txt and
// <dir>/captures.txt (`<program key>\t<steps>`, one per line).
// Exit (pass 9, P8-R2; LAW §14): 0 when the selection is written, 2 on any throw (no arguments, a
// --root that names nothing, a chain step file that is missing or not JSON, a degenerate
// selection: no spec selected). The first statement installs the seal.mjs guard and the kit's
// own modules load after it, by a dynamic import the guard covers.
// (pass 11, P10-G2; LAW §14) The command line is read by lib/argv.mjs: --root and --out each once,
// with a value, and no other option. --root is the tree the chain ends at: its code digest is the
// chain's final digest, so the floor base or any other tree is a throw (the row paths the tree holds
// decide what is changed and what moved, so another tree would select other specs in silence).
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, join, resolve } from "node:path";

process.on("uncaughtException", (e) => {
    console.error(`browser-select: no verdict: ${e?.stack ?? e}`);
    process.exit(2);
});

const { loadProgram } = await import("../lib/floor.mjs");
const { KIT, readSeq } = await import("../lib/sequence.mjs");
const { readArgs } = await import("../lib/argv.mjs");
const { codeDigest } = await import("../lib/digest.mjs");
const A = readArgs("browser-select", process.argv.slice(2), { values: ["--root", "--out"] });
if (A.value("--root") === null || A.value("--out") === null) throw new Error("browser-select: --root and --out are required");
const root = resolve(A.value("--root"));
if (!existsSync(join(root, "package.json"))) throw new Error(`browser-select: --root ${root} holds no package.json`);
const final = readSeq().steps.at(-1).digest, at = codeDigest(root).digest;
if (at !== final) throw new Error(`browser-select: --root ${root} is at code digest ${at.slice(0, 16)}…, not the chain's final ${final.slice(0, 16)}…; the selection reads the tree the chain ends at`);
const out = resolve(A.value("--out"));
const stem = (p) => basename(p).replace(/\.(spec|visual|test|test-d)\.ts$/, "").replace(/\.[^.]+$/, "");
const moves = [], changed = new Set();
for (const s of readSeq().steps) {
    // (pass 10, P9-G1) the floor rows are the one step with no frozen file; any other step's file holds
    // a move list or a row, or the selection would silently skip what it changes
    if (s.kind === "floor-rows") continue;
    if (!s.file) throw new Error(`browser-select: step ${s.id} (${s.kind}) names no frozen file`);
    const f = JSON.parse(readFileSync(join(KIT, s.file), "utf8"));
    if (s.kind === "moves") { if (!Array.isArray(f.moves)) throw new Error(`browser-select: ${s.file} holds no move list`); for (const { from, to } of f.moves) moves.push({ from, to, step: s.id }); continue; }
    if (s.kind !== "row" || f.files === null || typeof f.files !== "object") throw new Error(`browser-select: ${s.file} (${s.kind}) is neither a move list nor a row`);
    const created = Object.entries(f.files).filter(([, op]) => op.create !== undefined).map(([p]) => p);
    for (const [p, op] of Object.entries(f.files)) {
        if (existsSync(join(root, p))) { changed.add(p); continue; }
        if (!op.remove) continue;
        const hits = created.filter((c) => stem(c) === stem(p));
        moves.push({ from: p, to: hits.length === 1 ? hits[0] : p, step: s.id });
    }
}
mkdirSync(out, { recursive: true });
writeFileSync(join(out, "moved.json"), `${JSON.stringify({ note: "every move the chain makes (frozen move lists, and row removals onto their same-stem creation), from frozen/SEQUENCE.json", moves }, null, 1)}\n`);
const list = [...changed].sort();
writeFileSync(join(out, "changed.txt"), `${list.join("\n")}\n`);
const program = await loadProgram(root);
const touched = new Set([...moves.flatMap(({ from, to }) => [from, to]), ...changed]);
const named = program.specs.filter((s) => touched.has(s)).map(program.keyOf).sort();
if (!named.length) throw new Error("browser-select: no spec of the program is touched; a selection of nothing is no verdict");
writeFileSync(join(out, "specs.txt"), `${named.join("\n")}\n`);
// the capture specs the chain touches: excluded, stated, each with the steps that touch it
const stepsOf = (p) => [...new Set([...moves.filter(({ from, to }) => from === p || to === p).map((m) => m.step), ...(changed.has(p) ? ["row"] : [])])];
const captures = program.captures.filter((s) => touched.has(s)).map((s) => [program.keyOf(s), stepsOf(s).join(",")]).sort(([a], [b]) => a.localeCompare(b));
writeFileSync(join(out, "captures.txt"), captures.map(([k, st]) => `${k}\t${st}`).join("\n") + (captures.length ? "\n" : ""));
for (const [k, st] of captures) console.log(`EXCLUDED capture ${k} (touched by ${st}; LAW §13: a capture spec writes into docs/ and asserts no product behaviour; B0 reads its imports)`);
console.log(JSON.stringify({ moves: moves.length, changed: list.length, specs: named.length, programSpecs: program.specs.length, captures: program.captures.length, excludedTouched: captures.length }));
