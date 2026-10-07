// H3-cells.mjs: the pass-3 baseline digest (D2 pass 3, H3). Reads every witness JSON a
// run.mjs pass wrote for each build (shimmed and unshimmed) and writes one compact record per
// cell — witness, engine, pass, verdict (PASS / FAIL / OWNER-BLOCKED / UNMEASURED / RECORD),
// the failed sub-checks, load, and the summary line — to H3-records/cells-<label>.json, plus a
// per-witness, per-engine table on stdout. The bulky frame strips stay in scratch; the summary
// line carries every number the cell was judged on.
//
//   node H3-cells.mjs <runs-root> <tag> head floor bp g
// <runs-root> is the --out a run used (it holds runs/<W>-<label>[-unshimmed]); <tag> names the reading
// (base, rerun, w3b, st2, nb) and the record is H3-records/cells-<tag>-<label>.json.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const [out, tag, ...labels] = process.argv.slice(2);
const W = ["W1", "W3", "W7", "ST", "FM"];   // the witnesses H3 changed (H3-baseline.sh scope)
const verdict = (c) => c.record ? "RECORD" : c.pass ? "PASS" : c.unmeasured ? "UNMEASURED" : c.ownerBlocked ? "OWNER-BLOCKED" : "FAIL";
const rows = [];
for (const label of labels) {
    const cells = [];
    for (const w of W) for (const [suffix, shim] of [["", "shimmed-or-none"], ["-unshimmed", "unshimmed"]]) {
        const f = path.join(out, "runs", `${w}-${label}${suffix}`, `${w}.json`);
        if (!fs.existsSync(f)) continue;
        if (!fs.statSync(f).size) continue;
        const j = JSON.parse(fs.readFileSync(f, "utf8"));
        for (const c of j.cells) cells.push({ w, engine: c.engine, pass: suffix ? "unshimmed" : "main", cell: c.cell, verdict: verdict(c), failed: c.failed ?? [], ownerBlocked: c.ownerBlocked, crashed: c.crashed || undefined, load: c.load, summary: c.summary });
        void shim;
    }
    if (!cells.length) continue;
    fs.writeFileSync(path.join(HERE, "H3-records", `cells-${tag}-${label}.json`), JSON.stringify({ label, tag, runsRoot: out, when: new Date().toISOString(), cells }, null, 1));
    for (const w of W) for (const engine of ["chromium", "webkit"]) for (const p of ["main", "unshimmed"]) {
        const cs = cells.filter((c) => c.w === w && c.engine === engine && c.pass === p);
        if (!cs.length) continue;
        const n = (v) => cs.filter((c) => c.verdict === v).length;
        rows.push({ label, w, engine: engine + (p === "unshimmed" ? " unshimmed" : ""), counted: n("PASS") + n("FAIL"), pass: n("PASS"), ob: n("OWNER-BLOCKED"), um: n("UNMEASURED"), crashed: cs.filter((c) => c.crashed).length });
    }
}
console.log("build  witness  engine                pass/counted  owner-blocked  unmeasured  crashed");
for (const r of rows) console.log(`${r.label.padEnd(6)} ${r.w.padEnd(8)} ${r.engine.padEnd(21)} ${(r.pass + "/" + r.counted).padEnd(13)} ${String(r.ob).padEnd(14)} ${String(r.um).padEnd(11)} ${r.crashed}`);
