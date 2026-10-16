#!/usr/bin/env node
// floor-premise.mjs — pass 13, P12-G1 (REGISTRY §P12-6.3), read-only on the kit: the base-program premise of LAW §14
// ("no floor row touches tests-visual", lib/follow.mjs baseProgram) as a measured fact. A measurement tool; no judge
// imports it.
//   node tools/floor-premise.mjs --root <a fresh HEAD worktree, no row applied> --base <the floor base, cut by apply.mjs>
//                                --out <json>
// 1. Applies the nine floor rows to --root one at a time, in floor/rows/apply.mjs's order and with its commands, and
//    after each row lists every path whose bytes it created, changed or removed (a content walk of the tree before and
//    after, node_modules, dist and .git excluded). Prints the count under tests-visual per row and in total.
// 2. Checks the per-row cut is the floor base: --root's code digest after the ninth row equals --base's.
// 3. Re-reads baseProgram() (git at the chain's baseSha) and the floor base's own Playwright program (every
//    tests-visual/**/*.spec.ts on --base, capture specs, a basename starting "_", excluded), and prints both sizes and
//    both differences.
// Exit 0 when the tests-visual count is 0, the digests agree and the two programs are equal; 1 when any of these fails;
// 2 on a throw.
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { lstatSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { readArgs } from "../lib/argv.mjs";
import { codeDigest } from "../lib/digest.mjs";
import { baseProgram } from "../lib/follow.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROWS = resolve(HERE, "../../../floor/rows");
const SKIP = new Set(["node_modules", "dist", "dist-demo", ".git"]);

function walk(root) {
    const out = new Map();
    const rec = (rel) => {
        for (const e of readdirSync(join(root, rel), { withFileTypes: true })) {
            if (!rel && SKIP.has(e.name)) continue;
            if (e.name === "node_modules") continue;
            const p = rel ? `${rel}/${e.name}` : e.name;
            const st = lstatSync(join(root, p));
            if (st.isSymbolicLink()) continue;
            if (st.isDirectory()) rec(p);
            else out.set(p, createHash("sha1").update(readFileSync(join(root, p))).digest("hex"));
        }
    };
    rec("");
    return out;
}

function touched(before, after) {
    const t = [];
    for (const [p, h] of after) if (!before.has(p)) t.push(["A", p]); else if (before.get(p) !== h) t.push(["M", p]);
    for (const p of before.keys()) if (!after.has(p)) t.push(["D", p]);
    return t.sort((a, b) => (a[1] < b[1] ? -1 : a[1] > b[1] ? 1 : 0));
}

function programOf(base) {
    const out = [];
    const rec = (rel) => {
        for (const e of readdirSync(join(base, rel), { withFileTypes: true })) {
            if (e.name === "node_modules") continue;
            const p = `${rel}/${e.name}`;
            if (e.isDirectory()) rec(p);
            else if (/\.spec\.ts$/.test(e.name) && !e.name.startsWith("_")) out.push(p);
        }
    };
    rec("tests-visual");
    return new Set(out);
}

try {
    const a = readArgs("floor-premise", process.argv.slice(2), { values: ["--root", "--base", "--out"] });
    const root = a.value("--root"), base = a.value("--base"), outPath = a.value("--out");
    if (!root || !base || !outPath) throw new Error("floor-premise: --root, --base and --out are required");
    const { floorIn } = await import(join(ROWS, "lib.mjs"));
    // apply.mjs's order and commands (floor/rows/apply.mjs lines 21-30)
    const rows = [
        ["r1-register-retire", () => [join(ROWS, "r1-register-retire.mjs")]],
        ["f3-entry-record", () => [join(ROWS, "f3-entry-record.mjs")]],
        ["f4-terminal-role", () => [join(ROWS, "f4-terminal-role.mjs")]],
        ["m02-overlay-host", () => [join(ROWS, "m02-overlay-host.mjs")]],
        ["m03-roving-move", () => [join(root, floorIn(root), "move.mjs"), join(ROWS, "m03-roving-move.json")]],
        ["f9-wire", () => [join(ROWS, "f9-wire.mjs")]],
        ["fd6-harness", () => [join(ROWS, "fd6-harness.mjs")]],
        ["fd7-programs", () => [join(ROWS, "fd7-programs.mjs")]],
        ["fd11-land", () => [join(ROWS, "fd11-land.mjs")]],
    ];
    const record = { root, base, rows: [] };
    let before = walk(root), totalTV = 0, total = 0;
    for (const [name, cmd] of rows) {
        execFileSync("node", [...cmd(), "--root", root], { encoding: "utf8", maxBuffer: 1 << 26 });
        const after = walk(root);
        const t = touched(before, after);
        const tv = t.filter(([, p]) => p === "tests-visual" || p.startsWith("tests-visual/"));
        record.rows.push({ row: name, touched: t.map(([k, p]) => `${k} ${p}`), testsVisual: tv.length });
        console.log(`row ${name}: ${t.length} path(s) touched, ${tv.length} under tests-visual`);
        for (const [k, p] of t) console.log(`  ${k} ${p}`);
        totalTV += tv.length; total += t.length; before = after;
    }
    const dr = codeDigest(root), db = codeDigest(base);
    const digestsAgree = dr.digest === db.digest;
    console.log(`rows ${rows.length}; paths touched ${total}; under tests-visual ${totalTV}`);
    console.log(`per-row cut code digest ${dr.digest} over ${dr.files} files; floor base (apply.mjs) ${db.digest} over ${db.files} files; ${digestsAgree ? "equal" : "DIFFER"}`);
    const prog = baseProgram(), own = programOf(base);
    const onlyGit = [...prog].filter((p) => !own.has(p)).sort(), onlyBase = [...own].filter((p) => !prog.has(p)).sort();
    console.log(`baseProgram() at baseSha: ${prog.size} specs; the floor base's own program: ${own.size} specs; in baseProgram only ${onlyGit.length}; on the floor base only ${onlyBase.length}`);
    for (const p of onlyGit) console.log(`  baseProgram only: ${p}`);
    for (const p of onlyBase) console.log(`  floor base only: ${p}`);
    Object.assign(record, { total, testsVisual: totalTV, routeDigest: dr, baseDigest: db, digestsAgree, baseProgram: prog.size, floorBaseProgram: own.size, onlyGit, onlyBase });
    writeFileSync(outPath, `${JSON.stringify(record, null, 1)}\n`);
    const ok = totalTV === 0 && digestsAgree && !onlyGit.length && !onlyBase.length;
    console.log(`verdict ${ok ? "HELD" : "NOT HELD"}: the base-program premise`);
    process.exit(ok ? 0 : 1);
} catch (e) {
    console.error(String(e?.stack || e));
    process.exit(2);
}
