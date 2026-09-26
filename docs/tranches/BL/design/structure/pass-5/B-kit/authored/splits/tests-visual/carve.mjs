#!/usr/bin/env node
// carve.mjs — DERIVE (B-S16, tests-visual): the Playwright program row and the carve's move
// list, computed from `carve.json` on the tree it runs on. Two outputs, landed in this order:
//
//   1. --out-program <row.json>: B's row shape (lib/row.mjs). The program is edited FIRST
//      (FD-8: a spec that leaves the program is an image-check refusal, and the route edits
//      the program before the move): `testDir` widens to the repo root so the program also
//      collects `src/**/__tests__/*.visual.ts`, R-3's form for a one-unit visual spec, and
//      the WebKit project's two names are anchored under tests-visual/, and the root type
//      programs that take src/ leave `*.visual.ts` to Playwright. The slotted specs
//      move in this same row, byte for byte: F-1 reads the new testMatch literal as a glob
//      too (`glob-literal`), and an empty one is a violation, so the pattern and its first
//      member land together (the engine refuses a tree with a violation, so it cannot move
//      them after). A slotted spec may be named by nothing but the program, or the row
//      stops. The same row deletes the files carve.json deletes (R-8/E-7, each with its
//      reason), rewrites the one comment that cites a deleted file, and makes each source
//      walker carve.json names skip the `__tests__` slot the slotted spec joins.
//   2. --out-moves <moves.json>: the floor engine's move list (scripts/structure/move.mjs):
//      every other carved file to its module. The engine rewrites every reference and
//      refuses a move the program would lose.
//
// Checks, before any output (exit 1 on a miss):
//   - coverage: every file directly in tests-visual/ is named exactly once (stay, delete, a
//     slot or a module), and every named file exists;
//   - bounds (R-5, P3-R3): every directory the carve fills, the root included, holds at most
//     12 files once the splits in splits.json land in it (a split's source leaves, its
//     outputs join), and every unit slot a spec joins stays at 12 or under;
//   - names: no module dir repeats its parent, no placeholder name (B15's words).
//   node carve.mjs --root <tree> --carve carve.json --splits splits.json
//                  [--out-program row.json] [--out-moves moves.json]
import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, posix, resolve } from "node:path";

const args = process.argv.slice(2);
const opt = (k) => { const i = args.indexOf(k); return i < 0 ? undefined : args[i + 1]; };
const root = resolve(opt("--root") ?? ".");
const carve = JSON.parse(readFileSync(resolve(opt("--carve")), "utf8"));
const splits = JSON.parse(readFileSync(resolve(opt("--splits")), "utf8"));
const TV = "tests-visual";
const MAX = 12;
const stop = [];

// ---- coverage ------------------------------------------------------------------------
const listed = execFileSync("git", ["-C", root, "ls-files", "-co", "--exclude-standard", "-z", TV], { encoding: "utf8", maxBuffer: 1 << 26 })
    .split("\0").filter((f) => f && !f.includes("node_modules/") && existsSync(join(root, f)));
const direct = listed.filter((f) => posix.dirname(f) === TV).map((f) => posix.basename(f));
const named = new Map();
const name = (f, where) => { if (named.has(f)) stop.push(`${f}: named twice (${named.get(f)}, ${where})`); named.set(f, where); };
for (const f of carve.stay.files) name(f, "stay");
for (const d of carve.delete) name(d.file, "delete");
for (const s of carve.slots) name(s.file, `slot ${s.to}`);
for (const m of carve.modules) for (const f of m.files) name(f, m.dir);
for (const f of direct) if (!named.has(f)) stop.push(`${TV}/${f}: named by no stay, delete, slot or module`);
for (const f of named.keys()) if (!direct.includes(f)) stop.push(`${TV}/${f}: named, but not a file of ${TV}/`);

// ---- names -----------------------------------------------------------------------------
const PLACEHOLDER = /^(utils?|helpers?|misc|common|shared|stuff|temp|tmp|new|old|v\d+|lib\d*|other|various)(\d*)$/i;
for (const m of carve.modules) {
    const parts = m.dir.split("/");
    for (let i = 0; i < parts.length; i++) {
        if (PLACEHOLDER.test(parts[i])) stop.push(`${m.dir}: placeholder name ${parts[i]}`);
        if (i && parts[i] === parts[i - 1]) stop.push(`${m.dir}: ${parts[i]} repeats its parent`);
    }
    if (!m.why) stop.push(`${m.dir}: no why`);
}

// ---- bounds after the splits ------------------------------------------------------------
const after = new Map(); // dir -> Set(files)
const put = (dir, f) => { if (!after.has(dir)) after.set(dir, new Set()); after.get(dir).add(f); };
for (const f of carve.stay.files) put(TV, f);
for (const m of carve.modules) for (const f of m.files) put(posix.join(TV, m.dir), f);
// directories already nested in tests-visual (paint/, fixtures/) keep their files
for (const f of listed) if (posix.dirname(f) !== TV) put(posix.dirname(f), posix.basename(f));
for (const s of splits.splits) {
    const dir = posix.dirname(s.source), base = posix.basename(s.source);
    if (!after.has(dir)) { stop.push(`splits.json: ${s.source} lands in ${dir}, which the carve does not fill`); continue; }
    const outs = [...(s.parts ?? []).map((p) => p.file), ...(s.helpers ?? []).map((h) => h.file)];
    if (s.kind !== "module") after.get(dir).delete(base);
    for (const o of outs) after.get(dir).add(o);
}
for (const [dir, files] of after) if (files.size > MAX) stop.push(`${dir}: ${files.size} files after the carve and splits > ${MAX}`);
for (const s of carve.slots) {
    const dir = posix.dirname(s.to);
    if (!/(^|\/)__tests__$/.test(dir)) stop.push(`${s.to}: not a __tests__ slot`);
    if (!/\.visual\.ts$/.test(s.to)) stop.push(`${s.to}: a slotted visual spec is named *.visual.ts (R-3)`);
    const n = existsSync(join(root, dir)) ? readdirSync(join(root, dir)).filter((f) => statSync(join(root, dir, f)).isFile()).length : 0;
    if (n + 1 > MAX) stop.push(`${dir}: ${n + 1} files with ${posix.basename(s.to)} > ${MAX}`);
    if (existsSync(join(root, s.to))) stop.push(`${s.to}: exists`);
}

if (stop.length) { console.error(`carve: stopped\n  ${stop.join("\n  ")}`); process.exit(1); }

// ---- the program row --------------------------------------------------------------------
const CONFIG = `${TV}/playwright.config.ts`;
const cfg = readFileSync(join(root, CONFIG), "utf8");
const PROGRAM_FROM = `    testDir: ".",\n    testMatch: "*.spec.ts",\n`;
const PROGRAM_TO = `    // The program (R-3): the workspace's specs, at any depth of its modules, and each\n    // unit's visual spec in that unit's \`__tests__/\` slot as \`*.visual.ts\`.\n    testDir: "..",\n    testMatch: ["${TV}/**/*.spec.ts", "src/**/__tests__/*.visual.ts"],\n`;
const WEBKIT_FROM = `            testMatch: ["safari-webgl.spec.ts", "aurora-swraster.spec.ts"],\n`;
const WEBKIT_TO = `            testMatch: ["${TV}/**/safari-webgl.spec.ts", "${TV}/**/aurora-swraster.spec.ts"],\n`;
for (const [f, what] of [[PROGRAM_FROM, "the program"], [WEBKIT_FROM, "the WebKit project's testMatch"]]) {
    const hits = cfg.split(f).length - 1;
    if (hits !== 1) { console.error(`carve: ${CONFIG}: ${what} matches ${hits} times, not once`); process.exit(1); }
}
const row = { step: "B-S16 program: the Playwright program collects the workspace's modules and the units' visual slots, with the slotted specs; R-8 deletions", files: {}, reasons: [] };
row.files[CONFIG] = { hunks: [[PROGRAM_FROM, PROGRAM_TO], [WEBKIT_FROM, WEBKIT_TO]] };
row.reasons.push({ file: CONFIG, why: "the program is edited before the carve moves a spec (FD-8); testDir widens to the repo root so src/**/__tests__/*.visual.ts joins it; the WebKit project's names are anchored under tests-visual/, where the program's specs live" });
// A root type program that takes src/ (tsconfig.json, and tsconfig.test.json, which takes
// src/ whole) would take a slotted visual spec, whose page-side imports are dev-server URLs
// (`/src/…`) no tsc program resolves. The workspace's specs are type-checked by no program
// at HEAD; a slotted one keeps that, and stays Playwright's alone. A program that already
// excludes `src/**/__tests__` needs nothing (tsconfig.json on the route's tree, S14). The
// hunk follows the file's shape: an `exclude` array takes the pattern first; with none, one
// is added after the one-line `include`. Any other shape stops the row. tsconfig.src.json
// extends tsconfig.json and inherits its exclude.
const VISUAL = `"src/**/__tests__/*.visual.ts"`;
for (const TSC of ["tsconfig.json", "tsconfig.test.json"]) {
    const tt = readFileSync(join(root, TSC), "utf8");
    const ex = tt.match(/^( *"exclude": \[)([^\n]*)\]\n/m);
    const inc = tt.match(/^( *"include": \[[^\n]*\])(,?)\n/m); // the one-line include, and its comma when a key follows
    if (!inc || !/"src\/"/.test(inc[1])) continue;
    if (ex && /"src\/\*\*\/__tests__"/.test(ex[2])) continue;
    let hunk = null;
    if (ex && tt.split(ex[0]).length - 1 === 1) hunk = [ex[0], `${ex[1]}${VISUAL}${ex[2].trim() ? `, ${ex[2].trim()}` : ""}]\n`];
    else if (!/"exclude"/.test(tt) && tt.split(inc[0]).length - 1 === 1) hunk = [inc[0], `${inc[1]},\n    "exclude": [${VISUAL}]${inc[2]}\n`];
    if (!hunk) { console.error(`carve: ${TSC}: neither one \`exclude\` array nor one one-line \`include\` to follow`); process.exit(1); }
    row.files[TSC] = { hunks: [hunk] };
    row.reasons.push({ file: TSC, why: "a slotted visual spec is Playwright's program, not a type program: its page-side imports are dev-server URLs no tsc program resolves, and no program type-checks the workspace's specs at HEAD" });
}
const tracked = execFileSync("git", ["-C", root, "ls-files", "-co", "--exclude-standard", "-z"], { encoding: "utf8", maxBuffer: 1 << 28 })
    .split("\0").filter((f) => f && !f.includes("node_modules/") && !f.startsWith("docs/") && existsSync(join(root, f)) && statSync(join(root, f)).isFile());
for (const s of carve.slots) {
    const from = `${TV}/${s.file}`;
    const stem = s.file.replace(/\.spec\.ts$/, "");
    const named = tracked.filter((f) => f !== from && readFileSync(join(root, f), "utf8").includes(stem));
    if (named.length) { console.error(`carve: ${from} is named by ${named.join(", ")}; a slotted spec may be named by nothing but the program`); process.exit(1); }
    const text = readFileSync(join(root, from), "utf8");
    row.files[from] = { remove: true, before: text };
    row.files[s.to] = { create: text };
    row.reasons.push({ file: s.to, why: s.why });
}
for (const d of carve.delete) {
    const p = `${TV}/${d.file}`;
    row.files[p] = { remove: true, before: readFileSync(join(root, p), "utf8") };
    row.reasons.push({ file: p, why: d.why });
}
// a source walker that would read a slotted spec as library source skips the slot (R-3)
for (const w of carve.walkers ?? []) {
    const t = readFileSync(join(root, w.file), "utf8");
    if (t.split(w.from).length - 1 !== 1) { console.error(`carve: ${w.file}: the walker text does not match once`); process.exit(1); }
    row.files[w.file] = { hunks: [[w.from, w.to]] };
    row.reasons.push({ file: w.file, why: w.why });
}
for (const c of carve.citations ?? []) {
    const p = `${TV}/${c.file}`;
    const t = readFileSync(join(root, p), "utf8");
    if (t.split(c.from).length - 1 !== 1) { console.error(`carve: ${p}: citation does not match once`); process.exit(1); }
    row.files[p] = { hunks: [[c.from, c.to]] };
    row.reasons.push({ file: p, why: c.why });
}

// ---- the move list ----------------------------------------------------------------------
const moves = [];
for (const m of carve.modules) for (const f of m.files) moves.push({ from: `${TV}/${f}`, to: `${TV}/${m.dir}/${f}`, why: m.why });
const list = { why: carve.why, moves };

const count = (d) => after.get(d)?.size ?? 0;
console.log(`coverage: ${direct.length} direct files; stay ${carve.stay.files.length}, delete ${carve.delete.length}, slot ${carve.slots.length}, module ${moves.length} in ${carve.modules.length} modules`);
for (const [dir] of [...after].sort()) console.log(`  ${dir.padEnd(44)} ${String(count(dir)).padStart(3)} files after the splits`);
if (opt("--out-program")) writeFileSync(resolve(opt("--out-program")), `${JSON.stringify(row, null, 1)}\n`);
if (opt("--out-moves")) writeFileSync(resolve(opt("--out-moves")), `${JSON.stringify(list, null, 1)}\n`);
