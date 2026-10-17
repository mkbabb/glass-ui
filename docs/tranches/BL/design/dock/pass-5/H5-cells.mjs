// H5-cells.mjs: the pass-5 baseline digest (D2 pass 5, H5), after pass-4/H4-cells.mjs. It reads the witness JSON
// that H5-chain.sh copied (harness/battery.sh: H5-records/battery/json/<build>-<engine>/<stage>/[rerun<k>/]runs/
// <W>-<build>/<W>.json) and the F7 and PR records H5-build.sh copied (H5-records/F7-<build>/F7.json,
// H5-records/PR-<build>/PR.json), and maps the cells onto the 38 rows of REGISTRY §P4-7.5.
//
//   node H5-cells.mjs     → H5-records/cells-h5.json, rows-h5.md, counts-h5.md, table-h5.md
//
// A cell's verdict: PASS, FAIL, UNMEASURED, OWNER-BLOCKED or RECORD, from the main run. A FAIL whose two re-runs
// both read PASS is NOT-REPRODUCED (red only under load). A FAIL red in at least one re-run stands. A cell that was
// not measured (a crash, a block error) bears on every row it touches.
import fs from "node:fs";
import path from "node:path";

const REC = path.join(path.dirname(new URL(import.meta.url).pathname), "H5-records");
const J = path.join(REC, "battery", "json");
const BUILDS = ["head", "fv3", "bp", "g"];
const ENGS = ["chromium", "webkit"];
const STAGES = [["main", "light"], ["rest", "light"], ["dark", "dark"], ["darkrest", "dark"]];
const read = (f) => { try { return JSON.parse(fs.readFileSync(f, "utf8")); } catch { return null; } };
const verdict = (c) => (c.record ? "RECORD" : c.pass ? "PASS" : c.unmeasured ? "UNMEASURED" : c.ownerBlocked ? "OWNER-BLOCKED" : "FAIL");
const strip = (n) => n.replace(/(\+shim|-unshimmed)$/, "");
const cells = [];
for (const b of BUILDS) for (const e of ENGS) for (const [st, theme] of STAGES) {
    const base = path.join(J, `${b}-${e}`, st);
    let ws = []; try { ws = fs.readdirSync(path.join(base, "runs")); } catch { continue; }
    for (const dir of ws) {
        const w = dir.slice(0, dir.lastIndexOf(`-${b}`));
        const main = read(path.join(base, "runs", dir, `${w}.json`));
        if (!main) continue;
        const re = [1, 2].map((k) => read(path.join(base, `rerun${k}`, "runs", dir, `${w}.json`)));
        for (const c of main.cells) {
            if (/^__/.test(c.cell)) continue;
            let v = verdict(c);
            const rr = re.map((r) => { const x = r?.cells.find((y) => y.engine === c.engine && strip(y.cell) === strip(c.cell)); return x ? verdict(x) : null; });
            if (v === "FAIL" && rr.every((x) => x === "PASS")) v = "NOT-REPRODUCED";
            cells.push({ w, stage: st, theme, build: b, engine: c.engine, cell: c.cell, verdict: v, reruns: rr, reLoads: re.map((r) => r?.cells.find((y) => y.engine === c.engine && strip(y.cell) === strip(c.cell))?.load ?? null), failed: c.failed ?? [], ownerBlocked: c.ownerBlocked, crashed: /not measured: .*(crash|closed)|Page crashed|Target closed/i.test(c.summary ?? ""), load: c.load, summary: (c.summary ?? "").slice(0, 600) });
        }
    }
}
for (const b of BUILDS) {
    for (const [w, f] of [["F7", path.join(REC, `F7-${b}`, "F7.json")], ["PR", path.join(REC, `PR-${b}`, "PR.json")]]) {
        const j = read(f); if (!j) continue;
        for (const c of j.cells) cells.push({ w, stage: "tree", theme: "-", build: b, engine: "source", cell: c.cell, verdict: verdict(c), reruns: [], failed: c.failed ?? [], crashed: false, load: c.load, summary: (c.summary ?? "").slice(0, 700) });
    }
}
fs.writeFileSync(path.join(REC, "cells-h5.json"), JSON.stringify({ when: new Date().toISOString(), cells }, null, 1));

// the 38 rows: [row, predicate over a cell, the check names that fail the row (null: any failure; "CRASH")]
const W3R1 = ["continuity", "landing", "seatStep", "seatOverlap", "blank", "faces", "terminal", "trajectory", "rest", "seatWidth", "errors", "vagree", "owners", "rung"];
const ROWS = [
    ["P1", "W1 (card per H5-12) + W7", (c) => c.w === "W1" || c.w === "W7", null],
    ["P2", "W2 (reach by key, H5-1)", (c) => c.w === "W2", null],
    ["P3", "W3 every check, W6 (H5-5), W8", (c) => (c.w === "W3" && !/^retarget·context/.test(c.cell)) || c.w === "W6" || c.w === "W8", null],
    ["P4", "W4", (c) => c.w === "W4", null],
    ["P5", "W5 + R6", (c) => c.w === "W5" || c.w === "R6", null],
    ["F1", "W1 rests + W2", (c) => (c.w === "W1" && /rest/.test(c.cell)) || (c.w === "W2" && !/long-run-v/.test(c.cell)), null],
    ["F2", "W5", (c) => c.w === "W5", null],
    ["F3", "W4 coarse, hover gate", (c) => c.w === "W4" && /coarse|tap|hover|press/.test(c.cell), null],
    ["F4", "W4 compact", (c) => c.w === "W4" && /compact/.test(c.cell), null],
    ["F5", "W3 first-expand (faces read in main, H5-9)", (c) => c.w === "W3" && /^first-expand/.test(c.cell), ["continuity", "owners", "faces"]],
    ["F6", "crash-free (every browser cell)", (c) => c.engine !== "source", "CRASH"],
    ["F7", "F7 whole suite + gates (H5-10)", (c) => c.w === "F7", null],
    ["N1", "W3 anchor-end", (c) => c.w === "W3" && /^anchor-end/.test(c.cell), ["anchor"]],
    ["N2", "W3 stretch·lead-add", (c) => c.w === "W3" && /^stretch·lead-add/.test(c.cell), ["seatStep"]],
    ["N3", "W3 lattice, infanim, seat-transition", (c) => c.w === "W3" && /^lattice|^infanim|^seat-transition/.test(c.cell), ["seatWidth", "seatStep", "errors", "owners", "trajectory"]],
    ["N4", "W7 gutter, badge, whole, same", (c) => c.w === "W7", ["gutter", "badge", "whole", "same"]],
    ["N5", "PR count, readers, partials (H5-8) + W2 long-run-v", (c) => (c.w === "PR" && /count|readers|partials/.test(c.cell)) || (c.w === "W2" && /long-run-v/.test(c.cell)), null],
    ["R1", "W3 continuity, seats, paint floor + CASES capped", (c) => (c.w === "W3" && !/^retarget·context|^neighbour·/.test(c.cell)) || (c.w === "CASES" && /^case·capped/.test(c.cell)), W3R1.concat(["continuity"])],
    ["R2", "W3 leaving + vanish on every leaver (H5-4)", (c) => c.w === "W3", ["leaving", "vanish"]],
    ["R3", "W3 reversal", (c) => c.w === "W3" && /^reversal/.test(c.cell), ["trajectory"]],
    ["R4", "ST five timings", (c) => c.w === "ST" && /^stall·(?!nb·)/.test(c.cell), null],
    ["R5", "R5 hit sampler", (c) => c.w === "R5", null],
    ["R6", "W3 splice + stub, FM stub (H5-3)", (c) => c.w === "W3" || c.w === "FM", ["splice", "stub"]],
    ["R7", "W3 lanes + seat positions (H5-7) + CASES rotated", (c) => c.w === "W3" || (c.w === "CASES" && /^case·rotated/.test(c.cell)), ["lanes"]],
    ["R8", "W3 neighbour + ST nb + CASES consumer-margin", (c) => (c.w === "W3" && /^neighbour·/.test(c.cell)) || (c.w === "ST" && /^stall·nb·/.test(c.cell)) || (c.w === "CASES" && /^case·consumer-margin/.test(c.cell)), null],
    ["B1", "W3 retarget·context (H5-2)", (c) => c.w === "W3" && /^retarget·context/.test(c.cell), null],
    ["B2", "FM strips (tiles, stub)", (c) => c.w === "FM", null],
    ["B3", "PR count, rows, partials, citations", (c) => c.w === "PR" && /count|rows|partials|citations/.test(c.cell), null],
    ["C1", "CF c1·shape·h (ownshape, corner: H5-6)", (c) => c.w === "CF" && /^c1·shape·h/.test(c.cell), null],
    ["C2", "CF c2 (prm per Q-18 (a): H5-6)", (c) => c.w === "CF" && /^c2·(morph·h|prm|rapid)/.test(c.cell), null],
    ["C3", "CF c3 + coarse tap", (c) => c.w === "CF" && /^c3·|^c7·coarse-tap/.test(c.cell), null],
    ["C4", "CF c4", (c) => c.w === "CF" && /^c4·/.test(c.cell), null],
    ["C5", "CF c5", (c) => c.w === "CF" && /^c5·/.test(c.cell), null],
    ["C6", "CF c6", (c) => c.w === "CF" && /^c6·/.test(c.cell), null],
    ["C7", "CF vertical + narrow", (c) => c.w === "CF" && /^c1·shape·v|^c2·morph·v|^c7·/.test(c.cell), null],
    ["C8", "CF c8·outside-press (H5-11)", (c) => c.w === "CF" && /^c8·/.test(c.cell), null],
    ["C9", "CF c9·short-coarse (H5-11)", (c) => c.w === "CF" && /^c9·/.test(c.cell), null],
    ["L1", "L1 census", (c) => c.w === "L1", null],
];
const bears = (c, checks) => (checks === "CRASH" ? c.crashed : c.crashed || !checks || checks.some((k) => c.failed.includes(k)));
const cellName = (c, checks) => strip(c.cell) + (c.crashed && !c.failed.length ? "[not measured]" : Array.isArray(checks) ? "[" + c.failed.filter((k) => checks.includes(k)).join(",") + "]" : c.failed.length ? "[" + c.failed.join(",") + "]" : "");
function judge(cs, checks) {
    if (!cs.length) return { st: "—" };
    const red = cs.filter((c) => c.verdict === "FAIL" && bears(c, checks));
    const nr = cs.filter((c) => c.verdict === "NOT-REPRODUCED" && bears(c, checks));
    const ob = Array.isArray(checks) || checks === "CRASH" ? [] : cs.filter((c) => c.verdict === "OWNER-BLOCKED");
    const um = cs.filter((c) => c.verdict === "UNMEASURED");
    const st = red.length ? "FAIL" : ob.length ? "OWNER-BLOCKED" : um.length === cs.length ? "UNMEASURED" : "PASS";
    return { st, n: cs.length, red, nr, ob, um };
}
const fmt = (r, checks) => r.st === "—" ? "—" : `${r.st} ${r.n - r.red.length}/${r.n}${r.red.length ? "; red: " + r.red.slice(0, 4).map((c) => cellName(c, checks)).join(", ") + (r.red.length > 4 ? ` +${r.red.length - 4}` : "") : ""}${r.nr.length ? `; NR ${r.nr.length}` : ""}${r.ob.length ? `; OB ${r.ob.length}` : ""}${r.um.length ? `; UM ${r.um.length}` : ""}`;
const loadsOf = (cs) => { const l = cs.flatMap((c) => [c.load, ...(c.reLoads ?? [])]).filter((v) => typeof v === "number"); return l.length ? `${Math.min(...l)}-${Math.max(...l)}` : "-"; };

// rows-h5.md: per row, per build, per theme, per engine
const lines = ["| row | witness | build | theme | Chromium | Playwright WebKit | source | load (cells) |", "|---|---|---|---|---|---|---|---|"];
const verdictOf = {};
for (const [row, what, on, checks] of ROWS) for (const b of BUILDS) {
    const all = cells.filter((c) => c.build === b && on(c));
    const tot = judge(all, checks);
    verdictOf[row + "|" + b] = { st: tot.st, red: tot.red ?? [], nr: (tot.nr ?? []).length, ob: (tot.ob ?? []).length, um: (tot.um ?? []).length, n: tot.n ?? 0 };
    for (const th of ["light", "dark", "-"]) {
        const per = [...ENGS, "source"].map((e) => fmt(judge(all.filter((c) => c.engine === e && c.theme === th), checks), checks));
        if (per.every((x) => x === "—")) continue;
        lines.push(`| ${row} | ${what} | ${b} | ${th} | ${per.join(" | ")} | ${loadsOf(all.filter((c) => c.theme === th))} |`);
    }
}
fs.writeFileSync(path.join(REC, "rows-h5.md"), lines.join("\n") + "\n");

// table-h5.md: one line per row, one column per build (the build's verdict over both engines and themes)
const tl = ["| row | witness | " + BUILDS.join(" | ") + " |", "|---|---|" + BUILDS.map(() => "---").join("|") + "|"];
for (const [row, what, , checks] of ROWS) tl.push(`| ${row} | ${what} | ${BUILDS.map((b) => { const v = verdictOf[row + "|" + b]; return v.st === "—" ? "—" : `${v.st}${v.red.length ? " (" + [...new Set(v.red.map((c) => cellName(c, checks) + (c.engine === "webkit" ? " W" : c.engine === "chromium" ? " C" : "") + (c.theme === "dark" ? "·d" : "")))].slice(0, 3).join(", ") + (v.red.length > 3 ? ` +${v.red.length - 3}` : "") + ")" : ""}${v.ob ? ` OB ${v.ob}` : ""}${v.nr ? ` NR ${v.nr}` : ""}`; }).join(" | ")} |`);
const score = (b, rows) => rows.filter((r) => verdictOf[r + "|" + b].st === "PASS").length;
const R38 = ROWS.map((r) => r[0]), R36 = R38.filter((r) => r !== "C8" && r !== "C9");
const R24 = ["P1", "P2", "P3", "P4", "P5", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "N1", "N2", "N3", "N4", "R1", "R2", "R3", "R4", "R5", "B1", "B2", "B3"];
tl.push("", "| build | 38 rows PASS | first 36 | first 24 | OWNER-BLOCKED rows | UNMEASURED rows |", "|---|---:|---:|---:|---:|---:|");
for (const b of BUILDS) tl.push(`| ${b} | ${score(b, R38)}/38 | ${score(b, R36)}/36 | ${score(b, R24)}/24 | ${R38.filter((r) => verdictOf[r + "|" + b].st === "OWNER-BLOCKED").join(", ") || "-"} | ${R38.filter((r) => verdictOf[r + "|" + b].st === "UNMEASURED" || verdictOf[r + "|" + b].st === "—").join(", ") || "-"} |`);
fs.writeFileSync(path.join(REC, "table-h5.md"), tl.join("\n") + "\n");

// counts-h5.md: per witness, build, theme, engine
const cl = ["| witness | build | theme | engine | PASS | FAIL | NOT-REPRODUCED | OWNER-BLOCKED | UNMEASURED | RECORD | crashed | load (cells + re-runs) |", "|---|---|---|---|---:|---:|---:|---:|---:|---:|---:|---|"];
for (const k of [...new Set(cells.map((c) => [c.w, c.build, c.theme, c.engine].join("|")))]) {
    const [w, b, th, e] = k.split("|");
    const cs = cells.filter((c) => c.w === w && c.build === b && c.theme === th && c.engine === e);
    const n = (v) => cs.filter((c) => c.verdict === v).length;
    cl.push(`| ${w} | ${b} | ${th} | ${e === "webkit" ? "Playwright WebKit" : e} | ${n("PASS")} | ${n("FAIL")} | ${n("NOT-REPRODUCED")} | ${n("OWNER-BLOCKED")} | ${n("UNMEASURED")} | ${n("RECORD")} | ${cs.filter((c) => c.crashed).length} | ${loadsOf(cs)} |`);
}
fs.writeFileSync(path.join(REC, "counts-h5.md"), cl.join("\n") + "\n");
console.log(tl.join("\n"));
console.log(`\n${cells.length} cells; ${cells.filter((c) => c.verdict === "NOT-REPRODUCED").length} NOT-REPRODUCED; written cells-h5.json, rows-h5.md, table-h5.md, counts-h5.md in ${REC}`);
