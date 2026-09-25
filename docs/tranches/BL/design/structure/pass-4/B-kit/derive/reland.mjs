#!/usr/bin/env node
// reland.mjs — DERIVE (pass 4, the rebase): land the gate at one of the chain's gate steps
// (S13, S25, S27, S31) on a rebased tree. land-gate.mjs lands the kit's CURRENT gate text,
// which is the text pass 3 reached at S31; the earlier lands carried earlier texts, and the
// colocation steps between them read the gate that was landed then (S15 reads the S13 gate,
// S24 the S20 tree's). So the gate's text at each land is an authored input
// (authored/gate-lands/<id>.json: the exact-text ops pass 3's row made to the gate files,
// and the reviewed half of the pin as it stood then), and only the pin's computed half
// (modules, doors) is computed here, by the landed gate itself on this tree, exactly as
// land-gate.mjs computes it.
//   node derive/reland.mjs --root <wt> --id S13 --out frozen/S13-gate.json
import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync, unlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { arg } from "../lib/floor.mjs";
import { applyRow, makeRow } from "../lib/row.mjs";
import { KIT, recordStep } from "../lib/sequence.mjs";

const args = process.argv.slice(2);
const root = resolve(arg(args, "--root"));
const id = arg(args, "--id");
const L = JSON.parse(readFileSync(join(KIT, `authored/gate-lands/${id}.json`), "utf8"));
const PIN = "scripts/structure/records/seal-pin.json";
const count = (t, s) => t.split(s).length - 1;

// the gate files' intended text: a create is the text; hunks apply to the tree's text, each once
const intended = {};
for (const [p, op] of Object.entries(L.files)) {
    const cur = existsSync(join(root, p)) ? readFileSync(join(root, p), "utf8") : null;
    if (op.create !== undefined) { if (cur !== null && cur !== op.create) throw new Error(`reland ${id}: ${p} exists with other text`); intended[p] = op.create; continue; }
    if (cur === null) throw new Error(`reland ${id}: ${p} does not exist`);
    let t = cur;
    for (const [f, to] of op.hunks) { if (count(t, f) !== 1) throw new Error(`reland ${id}: ${p}: ${count(t, f)} matches for ${JSON.stringify(f.slice(0, 70))}`); t = t.replace(f, () => to); }
    intended[p] = t;
}

// compute the pin with the gate in place, then put the gate files back: the row writes them
const prior = {};
const tmp = mkdtempSync(join(tmpdir(), "b-reland-"));
try {
    for (const [p, t] of Object.entries(intended)) { if (existsSync(join(root, p))) prior[p] = readFileSync(join(root, p), "utf8"); writeFileSync(join(root, p), t); }
    writeFileSync(join(tmp, "review.json"), JSON.stringify({ modules: [], doors: {}, names: L.review.names, holds: L.review.holds }));
    try { execFileSync("node", [join(root, L.seal), "--root", root, "--pin", join(tmp, "review.json"), "--write-pin", join(tmp, "pin.json")], { stdio: "ignore" }); }
    catch (e) { if (e.status !== 1) throw e; }
    intended[PIN] = readFileSync(join(tmp, "pin.json"), "utf8");
} finally {
    for (const p of Object.keys(L.files)) { if (p in prior) writeFileSync(join(root, p), prior[p]); else try { unlinkSync(join(root, p)); } catch { /* not written */ } }
    rmSync(tmp, { recursive: true, force: true });
}
const pin = JSON.parse(intended[PIN]);
const row = { ...makeRow(root, L.why, intended), pin: { modules: pin.modules.length, doors: Object.keys(pin.doors).length, names: Object.values(pin.doors).reduce((a, b) => a + b.length, 0), reviewed: Object.keys(pin.names).length, holds: Object.keys(pin.holds).length } };
const file = arg(args, "--out");
writeFileSync(join(KIT, file), `${JSON.stringify(row, null, 1)}\n`);
console.log(JSON.stringify({ ...applyRow(root, row), pin: row.pin }));
recordStep(root, { id, kind: "row", file, why: L.why });
