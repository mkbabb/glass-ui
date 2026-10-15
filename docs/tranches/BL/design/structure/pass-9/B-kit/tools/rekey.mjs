#!/usr/bin/env node
// rekey.mjs — a browser-seat/2 base report re-keyed onto the migrated tree's Playwright program
// (P6-F2). The base tree's config collects from tests-visual/ (testDir "tests-visual"); the
// chain widens it to the repo root (testDir ".", the *.visual.ts slots). A base key is the
// spec's path from its testDir, so it becomes a repo path, then follows the chain's own moves:
// every frozen move list (from → to, applied in order), and every row that removes a spec and
// creates one with the same stem (a row-moved spec, *.spec.ts → *.visual.ts). The seat then
// compares by key (base-green). The journey is lib/follow.mjs (pass 8). Nothing is guessed: a key the chain does not carry to a file
// the migrated tree holds is listed as unmapped, and its tests are dropped from the base.
//   node tools/rekey.mjs <base-report.json> <migrated tree> <out.json>
// Exit (pass 9, P8-R2; LAW §14): 0 when the re-keyed report is written, 2 on any throw (missing
// arguments, a missing or non-JSON report, another schema, a degenerate report: no results, or
// none the chain carries to the migrated tree; a tree that names nothing). The first statement
// installs the seal.mjs guard; the chain's follower loads after it, by a dynamic import.
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join, posix, resolve } from "node:path";

process.on("uncaughtException", (e) => {
    console.error(`rekey: no verdict: ${e?.stack ?? e}`);
    process.exit(2);
});

const { chainFollow } = await import("../lib/follow.mjs");
const [baseFile, rootArg, out] = process.argv.slice(2);
if (!baseFile || !rootArg || !out) throw new Error("rekey: usage rekey.mjs <base-report.json> <migrated tree> <out.json>");
const root = resolve(rootArg);
if (!existsSync(join(root, "package.json"))) throw new Error(`rekey: the migrated tree ${root} holds no package.json`);
const base = JSON.parse(readFileSync(baseFile, "utf8"));
if (base?.$schema !== "browser-seat/2") throw new Error(`rekey: the base report is ${base?.$schema ?? "unversioned"}; it reads browser-seat/2`);
if (!Array.isArray(base.results) || !base.results.length) throw new Error(`rekey: ${baseFile} holds no results; an empty report is no input`);
if (typeof base.testDir !== "string") throw new Error(`rekey: ${baseFile} records no testDir`);
const follow = chainFollow();
const testDir = "."; // the migrated program's rootDir (browser.mjs: program.rootDir)
const map = new Map(), unmapped = new Set(), moved = [];
for (const r of base.results) {
    if (map.has(r.spec) || unmapped.has(r.spec)) continue;
    const repo = posix.normalize(posix.join(base.testDir, r.spec));
    const now = follow(repo);
    if (now !== repo) moved.push(`${repo} -> ${now}`);
    if (existsSync(join(root, now))) map.set(r.spec, posix.relative(testDir, now)); else unmapped.add(r.spec);
}
const results = base.results.filter((r) => map.has(r.spec)).map((r) => ({ ...r, spec: map.get(r.spec) }));
if (!results.length) throw new Error(`rekey: the chain carries none of ${baseFile}'s specs to ${root}; a re-keyed report of nothing is no input`);
const doc = { ...base, testDir, rekeyedFrom: { report: resolve(baseFile), testDir: base.testDir }, results, failures: undefined, unmapped: [...unmapped] };
writeFileSync(out, `${JSON.stringify(doc, null, 1)}\n`);
console.log(JSON.stringify({ specs: map.size, moved, unmapped: [...unmapped], results: results.length }));
