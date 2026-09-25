#!/usr/bin/env node
// land-gate.mjs — DERIVE step B-S13: land the route's gate in the tree as one frozen row.
//   scripts/structure/seal/seal.mjs         <- gate/seal.mjs (the clauses)
//   scripts/structure/seal/law.mjs          <- lib/law.mjs (the law the clauses and derive share)
//   tests/gates/seal.test.ts                <- gate/seal.test.ts (one `it` per clause, npm test)
//   scripts/structure/records/seal-pin.json <- modules and doors as the gate measures them
//                                              now, names and holds from authored/seal-review.json
// The pin is computed by the gate itself (--write-pin) against the tree the row lands on, so
// it pins exactly the reviewed state; any later change to a module or a door reds B11.
// S13 landed the gate at scripts/structure/seal.mjs; S19 moved it into seal/. A re-land (a law
// amendment, or the pin after later moves) is the same row at the landed paths, with its id.
//   node derive/land-gate.mjs --root <wt> --id S25 --out frozen/S25-gate.json --why "..."
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, unlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { arg } from "../lib/floor.mjs";
import { applyRow, makeRow } from "../lib/row.mjs";
import { KIT, recordStep } from "../lib/sequence.mjs";

const args = process.argv.slice(2);
const root = resolve(arg(args, "--root"));
const kit = (p) => readFileSync(join(KIT, p), "utf8");
const SEAL = "scripts/structure/seal/seal.mjs", LAW = "scripts/structure/seal/law.mjs";
const PIN = "scripts/structure/records/seal-pin.json", TEST = "tests/gates/seal.test.ts";
const intended = { [SEAL]: kit("gate/seal.mjs"), [LAW]: kit("lib/law.mjs"), [TEST]: kit("gate/seal.test.ts") };

// compute the pin with the landed gate, then take the two files back out: the row writes them
const prior = {};
const tmp = mkdtempSync(join(tmpdir(), "b-land-"));
try {
    for (const f of [SEAL, LAW]) { try { prior[f] = readFileSync(join(root, f), "utf8"); } catch { /* first land */ } writeFileSync(join(root, f), intended[f]); }
    const review = JSON.parse(kit("authored/seal-review.json"));
    writeFileSync(join(tmp, "review.json"), JSON.stringify({ modules: [], doors: {}, names: review.names, holds: review.holds }));
    try { execFileSync("node", [join(root, SEAL), "--root", root, "--pin", join(tmp, "review.json"), "--write-pin", join(tmp, "pin.json")], { stdio: "ignore" }); }
    catch (e) { if (e.status !== 1) throw e; }
    intended[PIN] = readFileSync(join(tmp, "pin.json"), "utf8");
} finally {
    for (const f of [SEAL, LAW]) { if (f in prior) writeFileSync(join(root, f), prior[f]); else try { unlinkSync(join(root, f)); } catch { /* not written */ } }
    rmSync(tmp, { recursive: true, force: true });
}
const pin = JSON.parse(intended[PIN]);
const row = { ...makeRow(root, arg(args, "--why") ?? "the gate lands: seal/seal.mjs, seal/law.mjs, the reviewed pin and one npm-test case per clause", intended), pin: { modules: pin.modules.length, doors: Object.keys(pin.doors).length, names: Object.values(pin.doors).reduce((a, b) => a + b.length, 0), reviewed: Object.keys(pin.names).length, holds: Object.keys(pin.holds).length } };
const file = arg(args, "--out");
writeFileSync(join(KIT, file), `${JSON.stringify(row, null, 1)}\n`);
console.log(JSON.stringify({ ...applyRow(root, row), pin: row.pin }));
recordStep(root, { id: arg(args, "--id") ?? "S13", kind: "row", file, why: arg(args, "--why") ?? "the gate lands in the tree: every clause runs under npm test (tests/gates/seal.test.ts), against a pin the gate computed on this tree with the reviewed names and holds" });
