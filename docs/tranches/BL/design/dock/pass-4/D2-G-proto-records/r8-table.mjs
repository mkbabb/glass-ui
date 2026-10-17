// r8-table.mjs (D2-G pass 4): the R8/N1 variant readings as one table, from r8/ST-<label>-<engine>.log and
// r8/W3nb-<label>-<engine>.log (r8-chain.sh read). Prints markdown.
import fs from "node:fs";
import path from "node:path";
const R = path.join(path.dirname(new URL(import.meta.url).pathname), "r8");
const rows = [];
for (const f of fs.readdirSync(R).filter((f) => /^(ST|W3nb)-.*\.log$/.test(f)).sort()) {
    const [, w, label, eng] = f.match(/^(ST|W3nb)-(.+)-(chromium|webkit)\.log$/);
    const txt = fs.readFileSync(path.join(R, f), "utf8");
    const load = (txt.match(/load averages: ([\d.]+)/) ?? [])[1];
    for (const line of txt.split("\n")) {
        const m = line.match(/^(PASS|FAIL|UNMEASURED|OWNER-BLOCKED)  (ST|W3)  (Chromium|Playwright WebKit)  (\S+)  (.*)$/);
        if (!m) continue;
        const [, v, , , cell, rest] = m;
        let what = "";
        if (/^stall·nb·/.test(cell)) { const o = rest.match(/over its box at worst (-?[\d.]+) px/); const s = rest.match(/worst one-frame step ([\d.]+) px at [\d.-]+ ms vs bound ([\d.]+) px/); what = `overlap ${o?.[1]} px; neighbour step ${s?.[1]}/${s?.[2]}`; }
        else if (/^stall·/.test(cell)) { const s = rest.match(/worst one-frame step ([\d.]+) px at [\d.-]+ ms \(dt ([\d.]+)[^)]*\) vs bound ([\d.]+)/) ?? rest.match(/worst one-frame step ([\d.]+) px/); what = s ? `leap ${s[1]} px` : ""; }
        else if (/^neighbour·/.test(cell)) { const o = rest.match(/overlaps it by ([\d.]+) px/); const s = rest.match(/worst one-frame step ([\d.]+) px vs bound ([\d.]+)/); what = `overlap ${o?.[1]} px; step ${s?.[1]}/${s?.[2]}`; }
        rows.push({ label, eng: eng === "webkit" ? "Playwright WebKit" : "Chromium", cell, v, what, load });
    }
}
const labels = [...new Set(rows.map((r) => r.label))];
console.log("| build | engine | cell | verdict | reading | load (run start) |\n|---|---|---|---|---|---|");
for (const l of labels) for (const r of rows.filter((x) => x.label === l)) console.log(`| ${r.label} | ${r.eng} | ${r.cell} | ${r.v} | ${r.what} | ${r.load} |`);
const sum = {};
for (const r of rows) { const k = `${r.label}|${r.eng}`; sum[k] ??= { r4: [0, 0], r8: [0, 0] }; const g = /^stall·nb·|^neighbour·/.test(r.cell) ? "r8" : "r4"; sum[k][g][1]++; if (r.v === "PASS") sum[k][g][0]++; }
console.log("\n| build | engine | R4 (ST five timings) | R8 (ST nb ×5 + W3 neighbour ×2) |\n|---|---|---|---|");
for (const [k, s] of Object.entries(sum)) { const [l, e] = k.split("|"); console.log(`| ${l} | ${e} | ${s.r4[0]}/${s.r4[1]} | ${s.r8[0]}/${s.r8[1]} |`); }
