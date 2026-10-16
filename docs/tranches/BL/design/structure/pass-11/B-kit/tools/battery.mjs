#!/usr/bin/env node
// battery.mjs — the pass-2 critic's intent battery (pass-2/kit/B-crit/battery.mjs, I1–I38 and
// the legal L-plants) run unchanged against the pass-3 tree, where the gate lives at
// scripts/structure/seal/ (S19) instead of scripts/structure/seal.mjs. The pass-2 file is read,
// its one gate-path line is re-pointed at the landed door, and the copy runs from the OS temp
// directory (the pass-2 record is not edited). Overlays only: nothing is written to the tree.
// (pass 7, P6-G3) The I7 row's plant inserts its @import after the file's first `@import`, which
// is the usage line inside src/styles/index.css's header comment, so the planted import is a
// comment and loads nothing (the pass-2 critic's own record: "my first plant landed in a
// comment; the re-plant at end of file fires", pass-2/B-critique.md, probe3.mjs). The copy
// carries that re-plant: the import appended at the end of the aggregate, as probe3.mjs plants
// it. Both rewrites are exact-text and must each occur once.
//   node tools/battery.mjs <migrated tree> <out.json>
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const [tree, out] = process.argv.slice(2).map((p) => resolve(p));
const SRC = resolve(dirname(fileURLToPath(import.meta.url)), "../../../pass-2/kit/B-crit/battery.mjs");
const FROM = 'join(root, "scripts/structure/seal.mjs")';
const text = readFileSync(SRC, "utf8");
if (text.split(FROM).length !== 2) throw new Error("battery: the pass-2 gate path line is not where it was");
const I7_FROM = 'read("src/styles/index.css").replace(/(@import[^\\n]*\\n)/, `$1@import "../components/dock/styles/core.css";\\n`)';
const I7_TO = 'read("src/styles/index.css") + \'@import "../components/dock/styles/core.css";\\n\'';
if (text.split(I7_FROM).length !== 2) throw new Error("battery: the pass-2 I7 row is not where it was");
const tmp = mkdtempSync(join(tmpdir(), "b-battery-"));
try {
    writeFileSync(join(tmp, "battery.mjs"), text.replace(FROM, 'join(root, "scripts/structure/seal/index.mjs")').replace(I7_FROM, () => I7_TO));
    process.stdout.write(execFileSync("node", [join(tmp, "battery.mjs"), tree, out], { encoding: "utf8", maxBuffer: 1 << 26 }));
} finally { rmSync(tmp, { recursive: true, force: true }); }
