#!/usr/bin/env node
// rekey.mjs — a browser-seat/2 base report re-keyed onto the migrated tree's Playwright program
// (P6-F2). The base tree's config collects from tests-visual/ (testDir "tests-visual"); the
// chain widens it to the repo root (testDir ".", the *.visual.ts slots). A base key is the
// spec's path from its testDir, so it becomes a repo path, then follows the chain's own moves:
// every frozen move list (from → to, applied in order), and every row that removes a spec and
// creates one with the same stem (a row-moved spec, *.spec.ts → *.visual.ts). The seat then
// compares by key (base-green). The journey is lib/follow.mjs (pass 8). Nothing is guessed: a key the chain does not carry to a file
// the migrated tree holds is a throw (pass 11; until pass 10 it was listed as unmapped and its tests dropped).
//   node tools/rekey.mjs <base-report.json> <migrated tree> <out.json>
// Exit (pass 9, P8-R2; LAW §14): 0 when the re-keyed report is written, 2 on any throw (missing
// arguments, a missing or non-JSON report, another schema, a degenerate report: no results, or
// none the chain carries to the migrated tree; a tree that names nothing). The first statement
// installs the seal.mjs guard; the chain's follower loads after it, by a dynamic import.
// (pass 11, P10-G1, P10-G2; LAW §14) Each argument takes one kind. <base> is a BASE RUN's own report:
// keyed from a testDir that is not the migrated program's (".") and carrying no rekeyedFrom, so a
// route run, a route rerun and a report this tool already wrote are throws. <tree> is the tree the
// chain ends at: its code digest is the chain's final digest (frozen/SEQUENCE.json), so the floor base
// or any other tree is a throw, and every base spec the chain carries must land on a file it holds:
// a base spec the chain carries to nothing is a throw, never a key dropped from the bar. The command
// line is read by lib/argv.mjs: three positionals, no option.
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join, posix, resolve } from "node:path";

process.on("uncaughtException", (e) => {
    console.error(`rekey: no verdict: ${e?.stack ?? e}`);
    process.exit(2);
});

const { chainFollow } = await import("../lib/follow.mjs");
const { readArgs } = await import("../lib/argv.mjs");
const { codeDigest } = await import("../lib/digest.mjs");
const { readSeq } = await import("../lib/sequence.mjs");
const [baseFile, rootArg, out] = readArgs("rekey", process.argv.slice(2), { positionals: 3 }).positional;
if (out === undefined) throw new Error("rekey: usage rekey.mjs <base-report.json> <migrated tree> <out.json>");
const root = resolve(rootArg);
if (!existsSync(join(root, "package.json"))) throw new Error(`rekey: the migrated tree ${root} holds no package.json`);
const testDir = "."; // the migrated program's rootDir (browser.mjs: program.rootDir)
const final = readSeq().steps.at(-1).digest, at = codeDigest(root).digest;
if (at !== final) throw new Error(`rekey: the tree ${root} is at code digest ${at.slice(0, 16)}…, not the chain's final ${final.slice(0, 16)}…; rekey keys onto the tree the chain ends at`);
const base = JSON.parse(readFileSync(baseFile, "utf8"));
if (base?.$schema !== "browser-seat/2") throw new Error(`rekey: the base report is ${base?.$schema ?? "unversioned"}; it reads browser-seat/2`);
if (!Array.isArray(base.results) || !base.results.length) throw new Error(`rekey: ${baseFile} holds no results; an empty report is no input`);
if (typeof base.testDir !== "string") throw new Error(`rekey: ${baseFile} records no testDir`);
// (pass 10, P9-G1) a report this tool already re-keyed is of the wrong kind: its paths are the
// migrated tree's, and following them through the chain again would key the base twice
if ("rekeyedFrom" in base) throw new Error(`rekey: ${baseFile} is already re-keyed (from ${JSON.stringify(base.rekeyedFrom)}); rekey reads a base run's own report`);
// (pass 11, P10-G1) a route run or rerun is keyed from the migrated program already: it is no base run
if (base.testDir === testDir) throw new Error(`rekey: ${baseFile} is keyed from ${testDir}, the migrated program's testDir: it is a route run or rerun, not a base run's report`);
for (const r of base.results) if (typeof r?.spec !== "string" || typeof r?.title !== "string" || typeof r?.status !== "string") throw new Error(`rekey: ${baseFile} holds a result without spec, title and status: ${JSON.stringify(r).slice(0, 120)}`);
const follow = chainFollow();
const map = new Map(), unmapped = new Set(), moved = [];
for (const r of base.results) {
    if (map.has(r.spec) || unmapped.has(r.spec)) continue;
    const repo = posix.normalize(posix.join(base.testDir, r.spec));
    const now = follow(repo);
    if (now !== repo) moved.push(`${repo} -> ${now}`);
    if (existsSync(join(root, now))) map.set(r.spec, posix.relative(testDir, now)); else unmapped.add(r.spec);
}
if (unmapped.size) throw new Error(`rekey: the chain carries ${map.size ? `${unmapped.size} of ${baseFile}'s specs to no file of ${root}` : `none of ${baseFile}'s specs to ${root}`} (${[...unmapped].slice(0, 3).join(", ")}…); a base key the chain carries nowhere would leave the bar unread`);
const results = base.results.map((r) => ({ ...r, spec: map.get(r.spec) }));
if (!results.length) throw new Error(`rekey: the chain carries none of ${baseFile}'s specs to ${root}; a re-keyed report of nothing is no input`);
const doc = { ...base, testDir, rekeyedFrom: { report: resolve(baseFile), testDir: base.testDir }, results, failures: undefined, unmapped: [...unmapped] };
writeFileSync(out, `${JSON.stringify(doc, null, 1)}\n`);
console.log(JSON.stringify({ specs: map.size, moved, unmapped: [...unmapped], results: results.length }));
