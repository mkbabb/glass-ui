// floor-vs-head.mjs: joins a floor H2 run (runs/W*-<label>/W*.json under --out) to the H2
// HEAD baseline (H2-records/head-cells.json, run "baseline", the shimmed WebKit column and
// the unshimmed one) cell by cell, and prints per witness and engine: floor PASS/counted,
// HEAD PASS/counted, and the cells that changed verdict. UNMEASURED and RECORD are not
// counted (HARNESS §0). Writes the joined rows to --json when given.
//
//   node floor-vs-head.mjs --out <floor run out dir> [--label floor] [--theme light] [--json <file>]
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const a = Object.fromEntries(process.argv.slice(2).reduce((o, k, i, v) => (k.startsWith("--") ? [...o, [k.slice(2), v[i + 1]]] : o), []));
const label = a.label ?? "floor";
const ENG = { chromium: "Chromium", webkit: "Playwright WebKit" };
const head = JSON.parse(fs.readFileSync(path.join(HERE, "H2-records/head-cells.json"), "utf8")).cells.filter((c) => c.run === "baseline");
const verdict = (c) => (c.record ? "RECORD" : c.unmeasured ? "UNMEASURED" : c.crashed ? "CRASHED" : c.pass ? "PASS" : "FAIL");
const rows = [];
for (const w of ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8", "R6"]) {
    const f = path.join(a.out, "runs", `${w}-${label}`, `${w}.json`);
    if (!fs.existsSync(f)) { rows.push({ w, missing: true }); continue; }
    const cells = JSON.parse(fs.readFileSync(f, "utf8")).cells;
    for (const e of ["chromium", "webkit"]) {
        const mine = cells.filter((c) => c.engine === e);
        // HEAD's WebKit cell names carry the pass as a suffix ("fit·rest+shim", "… unshimmed"); strip it to join.
        const bare = (c) => ({ ...c, cell: c.cell.replace(/(\+shim| unshimmed)$/, "") });
        const hs = head.filter((c) => c.witness === w && c.engine === (e === "chromium" ? "Chromium" : "Playwright WebKit +shim")).map(bare);
        const hu = head.filter((c) => c.witness === w && c.engine === "Playwright WebKit unshimmed").map(bare);
        const counted = (xs, v) => xs.filter((c) => v(c) !== "RECORD" && v(c) !== "UNMEASURED");
        const hv = (c) => c.verdict;
        const changed = [];
        for (const c of mine) {
            const h = hs.find((x) => x.cell === c.cell);
            const hvv = h ? h.verdict : "absent at HEAD";
            if (hvv !== verdict(c)) changed.push(`${c.cell}: ${hvv} → ${verdict(c)}${verdict(c) === "FAIL" ? ` [${(c.failed ?? []).join(",")}]` : ""}`);
        }
        const mc = counted(mine, verdict);
        const hc = counted(hs, hv);
        rows.push({
            w, engine: ENG[e], floor: `${mc.filter((c) => c.pass).length}/${mc.length}`,
            floorUnmeasured: mine.filter((c) => verdict(c) === "UNMEASURED").length,
            floorRecord: mine.filter((c) => verdict(c) === "RECORD").length,
            floorCrashed: mine.filter((c) => c.crashed).length,
            head: `${hc.filter((c) => c.verdict === "PASS").length}/${hc.length}`,
            headUnshimmed: e === "webkit" ? `${hu.filter((c) => c.verdict === "PASS").length}/${counted(hu, hv).length}` : "—",
            load: mine.length ? `${Math.min(...mine.map((c) => c.load))}-${Math.max(...mine.map((c) => c.load))}` : "—",
            failing: mine.filter((c) => verdict(c) === "FAIL").map((c) => `${c.cell} [${(c.failed ?? []).join(",")}]`),
            changed,
        });
    }
}
console.log(`theme ${a.theme ?? "light"} · floor run ${a.out}`);
console.log("witness engine              floor     HEAD(+shim) HEAD unshimmed  load");
for (const r of rows) {
    if (r.missing) { console.log(`${r.w.padEnd(7)} (no run)`); continue; }
    console.log(`${r.w.padEnd(7)} ${r.engine.padEnd(19)} ${r.floor.padEnd(9)} ${r.head.padEnd(11)} ${r.headUnshimmed.padEnd(15)} ${r.load}${r.floorUnmeasured ? ` · ${r.floorUnmeasured} UNMEASURED` : ""}${r.floorRecord ? ` · ${r.floorRecord} RECORD` : ""}${r.floorCrashed ? ` · ${r.floorCrashed} CRASHED` : ""}`);
    for (const f of r.failing) console.log(`        FAIL ${f}`);
}
if (a.json) fs.writeFileSync(a.json, JSON.stringify({ theme: a.theme ?? "light", out: a.out, rows }, null, 1));
