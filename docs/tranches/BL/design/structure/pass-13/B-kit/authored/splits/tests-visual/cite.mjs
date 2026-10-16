#!/usr/bin/env node
// cite.mjs — DERIVE (B-S16, tests-visual): the comments that cite a carved file by its old
// path, respelled to the new one, from carve.json's `citationsAfter`. It runs last, on the
// carved and split tree. A citation is found by its text in every file git lists, outside
// docs/ and the release records (CHANGELOG.md, MIGRATION.md: never rewritten), because the
// route moves the citing files before this step; `at` is where each site sat at HEAD, and
// the number of files holding the text must equal its length, each once. A site in a
// shipped file (src/, test slots aside) goes to a second row, because a comment can ship and
// move the bundle ratchet (P4-R3: a step that moves it lands its own datum row).
//   node cite.mjs --root <tree> --carve carve.json --out row.json --out-shipped shipped.json
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const args = process.argv.slice(2);
const opt = (k) => args[args.indexOf(k) + 1];
const root = resolve(opt("--root"));
const carve = JSON.parse(readFileSync(resolve(opt("--carve")), "utf8"));
const RECORDS = ["docs/", "CHANGELOG.md", "MIGRATION.md"];
const files = execFileSync("git", ["-C", root, "ls-files", "-co", "--exclude-standard", "-z"], { encoding: "utf8", maxBuffer: 1 << 28 })
    .split("\0").filter((f) => f && !f.includes("node_modules/") && !RECORDS.some((r) => f === r || f.startsWith(r)) && existsSync(join(root, f)) && statSync(join(root, f)).isFile() && !/\.(png|jpe?g|gif|webp|ico|woff2?|ttf|otf|mp4)$/.test(f));
const row = { step: "B-S16 citations: comments that cite a carved file by its old path", files: {}, reasons: [] };
const shipped = { step: "B-S16 citations in shipped files (their own datum row, P4-R3)", files: {}, reasons: [] };
for (const c of carve.citationsAfter ?? []) {
    const hits = files.filter((f) => readFileSync(join(root, f), "utf8").includes(c.from));
    if (hits.length !== c.at.length) { console.error(`cite: ${JSON.stringify(c.from)}: ${hits.length} file(s) hold it (${hits.join(", ")}), HEAD had ${c.at.length} (${c.at.join(", ")})`); process.exit(1); }
    for (const f of hits) {
        const t = readFileSync(join(root, f), "utf8");
        if (t.split(c.from).length - 1 !== 1) { console.error(`cite: ${f}: ${JSON.stringify(c.from)} matches more than once`); process.exit(1); }
        const target = f.startsWith("src/") && !f.includes("/__tests__/") ? shipped : row;
        (target.files[f] ??= { hunks: [] }).hunks.push([c.from, c.to]);
        target.reasons.push({ file: f, why: c.why });
        console.log(`cite ${target === shipped ? "(shipped) " : ""}${f}: ${c.from} -> ${c.to}`);
    }
}
writeFileSync(resolve(opt("--out")), `${JSON.stringify(row, null, 1)}\n`);
writeFileSync(resolve(opt("--out-shipped")), `${JSON.stringify(shipped, null, 1)}\n`);
