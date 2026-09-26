// D2-Bp-cells.mjs: flattens D2-B′ prototype H2 runs into compact cell rows (the shape of
// FLOOR-records/floor-cells.json: run, theme, witness, engine, cell, verdict, failed, load,
// summary) and joins each row to the floor's own light/dark run, so a floor → B′ verdict
// change is read from files, not from memory. UNMEASURED and RECORD are never counted.
//
//   node D2-Bp-cells.mjs --json <out.json> <run>=<theme>=<dir>[=<label>] ...
//     <dir> is a run.mjs --out dir (runs/W*-<label>/W*.json) or a single-witness --out dir
//     (runs/W3-<label>/W3.json); <label> defaults to "bp11".
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const argv = process.argv.slice(2);
const jsonAt = argv.indexOf("--json");
const outFile = jsonAt >= 0 ? argv.splice(jsonAt, 2)[1] : null;
const ENG = { chromium: "Chromium", webkit: "Playwright WebKit unshimmed" };
const verdict = (c) => (c.record ? "RECORD" : c.unmeasured ? "UNMEASURED" : c.crashed ? "CRASHED" : c.pass ? "PASS" : "FAIL");
const floor = JSON.parse(fs.readFileSync(path.join(HERE, "FLOOR-records/floor-cells.json"), "utf8")).cells.filter((c) => c.run === "floor");

const cells = [];
for (const spec of argv) {
    const [run, theme, dir, label = "bp11"] = spec.split("=");
    const runs = path.join(dir, "runs");
    for (const w of ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8", "R6"]) {
        const f = path.join(runs, `${w}-${label}`, `${w}.json`);
        if (!fs.existsSync(f)) continue;
        for (const c of JSON.parse(fs.readFileSync(f, "utf8")).cells) {
            const engine = ENG[c.engine] ?? c.engine;
            const fl = floor.find((x) => x.theme === theme && x.witness === w && x.engine === engine && x.cell === c.cell);
            cells.push({ run, theme, witness: w, engine, cell: c.cell, verdict: verdict(c), failed: c.failed ?? [], load: c.load ?? null, floor: fl ? fl.verdict : "absent on the floor", summary: c.summary });
        }
    }
}

const table = {};
for (const c of cells) {
    const k = `${c.run} ${c.theme} ${c.witness} ${c.engine}`;
    const t = (table[k] ??= { pass: 0, counted: 0, unmeasured: 0, record: 0, floorPass: 0, floorCounted: 0, changed: [] });
    if (c.verdict === "UNMEASURED") t.unmeasured++;
    else if (c.verdict === "RECORD") t.record++;
    else { t.counted++; if (c.verdict === "PASS") t.pass++; }
    if (c.floor === "PASS" || c.floor === "FAIL" || c.floor === "CRASHED") { t.floorCounted++; if (c.floor === "PASS") t.floorPass++; }
    if (c.floor !== c.verdict) t.changed.push(`${c.cell}: ${c.floor} → ${c.verdict}${c.verdict === "FAIL" ? ` [${c.failed.join(",")}]` : ""}`);
}
for (const [k, t] of Object.entries(table)) console.log(`${k.padEnd(52)} B′ ${t.pass}/${t.counted}${t.unmeasured ? ` (+${t.unmeasured} UNMEASURED)` : ""}${t.record ? ` (+${t.record} RECORD)` : ""}   floor ${t.floorPass}/${t.floorCounted}`);
if (outFile) fs.writeFileSync(outFile, JSON.stringify({ tool: "D2-Bp-cells.mjs", when: new Date().toISOString(), table, cells }, null, 1));
