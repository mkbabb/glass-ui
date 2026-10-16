// bp-cells.mjs: the D2-B′ pass-4 digest. FV3-cells.mjs's verdict rule and row map, unchanged, over run.sh's runs
// on the one build bp (HEAD + floor-v3.patch + D2-Bp-proto.patch), set beside the floor-v3 cells
// (FV3-records/cells-fv3.json, the source of record for "before"). Only the I/O and the sets differ.
//   node bp-cells.mjs <out> [<out> …]   (<out>/{main,rest,dark}/runs, …/rerun1|2/runs; or the json/<engine> copies;
//   one <out> per engine when run.sh ran the engines apart)
//   → D2-Bp-proto-records/cells-bp.json, rows-bp.md, counts-bp.md
import fs from "node:fs";
import path from "node:path";
const OUTS = process.argv.slice(2).map((o) => path.resolve(o));
const REC = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const HERE = path.resolve(REC, "..");
const read = (f) => { try { return JSON.parse(fs.readFileSync(f, "utf8")); } catch { return null; } };
const verdict = (c) => (c.record ? "RECORD" : c.pass ? "PASS" : c.unmeasured ? "UNMEASURED" : c.ownerBlocked ? "OWNER-BLOCKED" : "FAIL");
const strip = (n) => n.replace(/(\+shim|-unshimmed)$/, "");
// [sub-dir, theme, witnesses, build label as run, build label as digested]; darkrest writes under dark/
const SETS = [["main", "light", ["ST", "W3", "FM", "R5", "CF", "L1", "W2", "CASES"], "bp", "bp"], ["rest", "light", ["W1", "W4", "W5", "W6", "W7", "W8", "R6"], "bp", "bp"], ["dark", "dark", ["ST", "FM", "W1", "W3", "W2", "R5", "CF", "W4", "W5", "W6", "W7", "W8", "R6"], "bp", "bp"]];
const kept = [];
for (const OUT of OUTS) for (const [sub, theme, W, label, build] of SETS) for (const w of W) {
    const dir = `${w}-${label}`;
    const main = read(path.join(OUT, sub, "runs", dir, `${w}.json`));
    const re = [1, 2].map((k) => read(path.join(OUT, sub, `rerun${k}`, "runs", dir, `${w}.json`)));
    if (!main) continue;
    for (const c of main.cells) {
        let v = verdict(c);
        const rr = re.map((r) => { const x = r?.cells.find((y) => y.engine === c.engine && strip(y.cell) === strip(c.cell)); return x ? verdict(x) : null; });
        if (v === "FAIL" && rr.every((x) => x === "PASS")) v = "NOT-REPRODUCED";
        kept.push({ w, set: sub, theme, build, engine: c.engine, cell: c.cell, verdict: v, reruns: rr, failed: c.failed ?? [], crashed: !!c.crashed || /Page crashed/.test(c.summary ?? ""), load: c.load, summary: (c.summary ?? "").slice(0, 500) });
    }
}
const prf = OUTS.flatMap((OUT) => [path.join(OUT, "pr", "runs", "PR-wt", "PR.json"), ...(() => { try { return fs.readdirSync(path.join(OUT, "pr", "runs")).map((d) => path.join(OUT, "pr", "runs", d, "PR.json")); } catch { return []; } })()]).find((f) => fs.existsSync(f));
const pr = prf ? read(prf) : null;
if (pr) for (const c of pr.cells) kept.push({ w: "PR", set: "main", theme: "-", build: "bp", engine: "source", cell: c.cell, verdict: verdict(c), reruns: [], failed: c.failed ?? [], crashed: false, load: c.load, summary: (c.summary ?? "").slice(0, 700) });
// before: floor v3's cells (FLOOR-V3 seat, FV3-records/cells-fv3.json)
const fv3 = read(path.join(HERE, "FV3-records", "cells-fv3.json"));
for (const c of fv3?.cells ?? []) if (c.build === "fv3") kept.push({ ...c });
fs.writeFileSync(path.join(REC, "cells-bp.json"), JSON.stringify({ when: new Date().toISOString(), out: OUTS, cells: kept.filter((c) => c.build === "bp") }, null, 1));
const BUILDS = ["fv3", "bp"];

// the row map: [row, predicate over a cell → does the cell bear on the row, check names that fail the row (null: any)]
const W3R1 = ["continuity", "landing", "seatStep", "seatOverlap", "blank", "faces", "terminal", "trajectory", "rest", "seatWidth", "errors", "vagree", "owners", "rung"];
const ROWS = [
    ["P1 · W1", (c) => c.w === "W1", null],
    ["P1 · W7 (edge)", (c) => c.w === "W7", null],
    ["P2 · W2", (c) => c.w === "W2", null],
    ["P3 · W3 (every check)", (c) => c.w === "W3" && !/^retarget·context/.test(c.cell), null],
    ["P3 · W6 (collapsed form)", (c) => c.w === "W6", null],
    ["P3 · W8 (motion)", (c) => c.w === "W8", null],
    ["P4 · W4", (c) => c.w === "W4", null],
    ["P5 · W5", (c) => c.w === "W5", null],
    ["P5 · R6 (ring probe)", (c) => c.w === "R6", null],
    ["F1 · W1 rests + W2", (c) => (c.w === "W1" && /rest/.test(c.cell)) || (c.w === "W2" && !/long-run-v/.test(c.cell)), null],
    ["F2 · W5", (c) => c.w === "W5", null],
    ["F3 · W4 coarse, hover gate", (c) => c.w === "W4" && /coarse|tap|hover|press/.test(c.cell), null],
    ["F4 · W4 compact", (c) => c.w === "W4" && /compact/.test(c.cell), null],
    ["F5 · W3 first-expand", (c) => c.w === "W3" && /^first-expand/.test(c.cell), ["continuity", "owners"]],
    ["F6 · crash-free (every cell)", (c) => c.w !== "PR", "CRASH"],
    ["N1 · W3 anchor-end", (c) => c.w === "W3" && /^anchor-end/.test(c.cell), ["anchor"]],
    ["N2 · W3 stretch·lead-add", (c) => c.w === "W3" && /^stretch·lead-add/.test(c.cell), ["seatStep"]],
    ["N3 · W3 lattice, infanim, seat-transition", (c) => c.w === "W3" && /^lattice|^infanim|^seat-transition/.test(c.cell), ["seatWidth", "seatStep", "errors", "owners", "trajectory"]],
    ["N4 · W7", (c) => c.w === "W7", ["gutter", "badge", "whole", "same"]],
    ["R1 · W3 continuity, seats, paint floor", (c) => c.w === "W3" && !/^retarget·context|^neighbour·/.test(c.cell), W3R1],
    ["R2 · W3 leaving (H4-5 retarget)", (c) => c.w === "W3" && /^compaction|^content-remove|^lead-remove|^swap-|^retarget·(40|80|120)/.test(c.cell), ["leaving", "vanish"]],
    ["R3 · W3 reversal", (c) => c.w === "W3" && /^reversal/.test(c.cell), ["trajectory"]],
    ["R4 · ST five timings", (c) => c.w === "ST" && /^stall·(?!nb·)/.test(c.cell), null],
    ["R5 · R5 hit sampler (H4-4)", (c) => c.w === "R5", null],
    ["B1 · W3 retarget·context (H4-5)", (c) => c.w === "W3" && /^retarget·context/.test(c.cell), null],
    ["B2 · FM strips", (c) => c.w === "FM", null],
    ["B3 · PR count, rows (H4-8)", (c) => c.w === "PR" && /count|rows/.test(c.cell), null],
    ["N5 · PR count (N-6), readers (N-7)", (c) => c.w === "PR" && /count|readers/.test(c.cell), null],
    ["N5 · W2 long-run-v (N-8)", (c) => c.w === "W2" && /long-run-v/.test(c.cell), null],
    ["R6 · W3 splice (H4-1)", (c) => c.w === "W3", ["splice"]],
    ["R7 · W3 lanes (H4-2)", (c) => c.w === "W3", ["lanes"]],
    ["R8 · W3 neighbour + ST nb (H4-3)", (c) => (c.w === "W3" && /^neighbour·/.test(c.cell)) || (c.w === "ST" && /^stall·nb·/.test(c.cell)), null],
    ["C1 · CF", (c) => c.w === "CF" && /^c1·shape·h/.test(c.cell), null],
    ["C2 · CF", (c) => c.w === "CF" && /^c2·(morph·h|prm|rapid)/.test(c.cell), null],
    ["C3 · CF", (c) => c.w === "CF" && /^c3·|^c7·coarse-tap/.test(c.cell), null],
    ["C4 · CF", (c) => c.w === "CF" && /^c4·/.test(c.cell), null],
    ["C5 · CF", (c) => c.w === "CF" && /^c5·/.test(c.cell), null],
    ["C6 · CF", (c) => c.w === "CF" && /^c6·/.test(c.cell), null],
    ["C7 · CF", (c) => c.w === "CF" && /^c1·shape·v|^c2·morph·v|^c7·/.test(c.cell), null],
    ["L1 · L1 census (H4-11)", (c) => c.w === "L1", null],
    ["§P3-7.3 · the three cases", (c) => c.w === "CASES", null],
];
const engs = ["chromium", "webkit", "source"];
// a cell that was not measured (a crash, a block error) is red in every row it bears on: it has no failed
// sub-check to match, and reading it as green would be a vacuous pass
const bears = (c, checks) => (checks === "CRASH" ? c.crashed : c.crashed || !checks || checks.some((k) => c.failed.includes(k)));
const lines = ["| row · witness | build | theme | Chromium | Playwright WebKit | source |", "|---|---|---|---|---|---|"];
for (const [row, on, checks] of ROWS) for (const b of BUILDS) for (const th of ["light", "dark", "-"]) {
    const per = engs.map((e) => {
        const cs = kept.filter((c) => c.build === b && c.engine === e && on(c) && (c.w === "L1" ? th === "light" : c.theme === th));
        if (!cs.length) return "—";
        const red = cs.filter((c) => c.verdict === "FAIL" && bears(c, checks));
        const nr = cs.filter((c) => c.verdict === "NOT-REPRODUCED" && bears(c, checks));
        const ob = checks ? [] : cs.filter((c) => c.verdict === "OWNER-BLOCKED");
        const um = cs.filter((c) => c.verdict === "UNMEASURED");
        const st = red.length ? "FAIL" : ob.length ? "OWNER-BLOCKED" : um.length && um.length === cs.length ? "UNMEASURED" : "PASS";
        const name = (c) => strip(c.cell) + (c.crashed && !c.failed.length ? "[not measured]" : checks && checks !== "CRASH" ? "[" + c.failed.filter((k) => checks.includes(k)).join(",") + "]" : c.failed.length ? "[" + c.failed.join(",") + "]" : "");
        return `${st} ${cs.length - red.length}/${cs.length}${red.length ? "; red: " + red.slice(0, 4).map(name).join(", ") + (red.length > 4 ? ` +${red.length - 4}` : "") : ""}${nr.length ? `; not reproduced ${nr.length}` : ""}${ob.length ? `; OB ${ob.length}` : ""}${um.length ? `; UM ${um.length}` : ""}`;
    });
    if (per.every((x) => x === "—")) continue;
    lines.push(`| ${row} | ${b} | ${row.startsWith("L1") ? "light + dark" : th} | ${per.join(" | ")} |`);
}
fs.writeFileSync(path.join(REC, "rows-bp.md"), lines.join("\n") + "\n");

// per witness, build, theme, engine: counts and the load range of the cells
const cl = ["| witness | build | theme | engine | PASS | FAIL | NOT-REPRODUCED | OWNER-BLOCKED | UNMEASURED | RECORD | crashed | load (cells) |", "|---|---|---|---|---:|---:|---:|---:|---:|---:|---:|---|"];
const keys = [...new Set(kept.map((c) => [c.w, c.build, c.theme, c.engine].join("|")))];
for (const k of keys) {
    const [w, b, th, e] = k.split("|");
    const cs = kept.filter((c) => c.w === w && c.build === b && c.theme === th && c.engine === e);
    const n = (v) => cs.filter((c) => c.verdict === v).length;
    const loads = cs.map((c) => c.load).filter((v) => typeof v === "number");
    cl.push(`| ${w} | ${b} | ${th} | ${e === "webkit" ? "Playwright WebKit" : e} | ${n("PASS")} | ${n("FAIL")} | ${n("NOT-REPRODUCED")} | ${n("OWNER-BLOCKED")} | ${n("UNMEASURED")} | ${n("RECORD")} | ${cs.filter((c) => c.crashed).length} | ${loads.length ? Math.min(...loads) + "-" + Math.max(...loads) : "-"} |`);
}
fs.writeFileSync(path.join(REC, "counts-bp.md"), cl.join("\n") + "\n");
console.log(lines.join("\n"));
console.log(`\n${kept.length} cells; ${kept.filter((c) => c.verdict === "NOT-REPRODUCED").length} NOT-REPRODUCED; written cells-bp.json, rows-bp.md, counts-bp.md in ${REC}`);
