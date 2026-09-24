#!/usr/bin/env node
// bounds.mjs — R-5's measure: a directory holding more than 12 direct files, or a
// hand-written source file over 500 lines, is "long-running". Zones: src, demo, scripts,
// tests, tests-visual. Files inside a kind slot (FD-3's `isSlot`, the one predicate
// placement uses) do not count toward their parent's 12; the slot is bounded by the same
// 12 and 500 as any dir (P3-R3, strict: one bound everywhere). A
// file whose head declares itself generated is listed apart: R-5 exempts it only when a
// checked generator produces it and a gate verifies it, which this tool does not judge.
// A measurement, not a gate: HEAD is over both bounds, so it is not wired into `npm test`.
//   node bounds.mjs [--root R] [--json out.json]
import { writeFileSync } from "node:fs";
import { posix } from "node:path";
import { DEFAULT_ROOT, ZONES, openTree } from "./lib/tree.mjs";
import { isSlot } from "./lib/placement.mjs";

const DIRS = 12;
const LINES = 500;
const SOURCE = /\.(ts|mts|cts|js|mjs|cjs|vue|css)$/;

const args = process.argv.slice(2);
const opt = (k) => (args.includes(k) ? args[args.indexOf(k) + 1] : null);
const tree = openTree(opt("--root") ?? DEFAULT_ROOT);

const direct = new Map();
const long = [];
const generated = [];
for (const f of tree.files) {
    if (!ZONES.includes(f.split("/")[0])) continue;
    const dir = posix.dirname(f);
    direct.set(dir, (direct.get(dir) ?? 0) + 1);
    if (!SOURCE.test(f)) continue;
    const text = tree.read(f);
    const lines = text.split("\n").length - (text.endsWith("\n") ? 1 : 0);
    if (lines <= LINES) continue;
    (/^[^\n]*(@generated|GENERATED|do not edit)/i.test(text.slice(0, 400)) ? generated : long).push({ file: f, lines });
}
const overDirs = [...direct].filter(([, n]) => n > DIRS).map(([dir, n]) => ({ dir, files: n, slot: isSlot(dir) })).sort((a, b) => b.files - a.files);
long.sort((a, b) => b.lines - a.lines);
const byZone = (list, key) => Object.fromEntries(ZONES.map((z) => [z, list.filter((x) => x[key].split("/")[0] === z).length]));
const summary = { rule: `dirs > ${DIRS} direct files; hand-written sources > ${LINES} lines`, dirsOver: overDirs.length, dirsOverByZone: byZone(overDirs, "dir"), filesOver: long.length, filesOverByZone: byZone(long, "file"), generatedOver: generated.length };
console.log(JSON.stringify(summary, null, 1));
for (const d of overDirs) console.log(`DIR  ${String(d.files).padStart(4)}  ${d.dir}${d.slot ? "  (kind slot)" : ""}`);
for (const f of long) console.log(`FILE ${String(f.lines).padStart(5)}  ${f.file}`);
for (const f of generated) console.log(`GEN  ${String(f.lines).padStart(5)}  ${f.file}`);
if (opt("--json")) writeFileSync(opt("--json"), JSON.stringify({ summary, overDirs, long, generated }, null, 1));
