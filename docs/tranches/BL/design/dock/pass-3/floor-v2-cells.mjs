// floor-v2-cells.mjs: the floor v2 digest and its join to the floor v1 baseline (D2 pass 3, FLOOR-V2.md).
//
//   node floor-v2-cells.mjs digest <runs-root> <tag>     reads <runs-root>/runs/<W>-<label>/<W>.json and writes
//                                                       FLOOR-V2-records/cells-<tag>.json (one record per cell)
//   node floor-v2-cells.mjs table <tag> [<tag> …]        prints, per witness and engine, every cell's floor v1
//                                                       baseline readings beside the floor v2 readings, and counts
//
// The floor v1 baseline for ST, W3, FM, W7, W1 is H3's: H3-records/cells-{base,w3b,nb,st2,st3,fm2}-floor.json (the
// pass-3 baseline, light). For W2, W4, W5, W6 (not in H3's scope) it is pass-2's FLOOR-records/floor-cells.json
// (run `floor`, light and dark; H3 did not change those witnesses, H3.md §3.0).
// Verdicts: P PASS · F[...] FAIL · OB OWNER-BLOCKED · UM UNMEASURED · R RECORD · – not run. `faces` is left out
// of the brackets (the scoped runs pass --no-faces, as H3's baseline did).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REC = path.join(HERE, "FLOOR-V2-records");
const [mode, ...rest] = process.argv.slice(2);
const verdict = (c) => (c.record ? "RECORD" : c.pass ? "PASS" : c.unmeasured ? "UNMEASURED" : c.ownerBlocked ? "OWNER-BLOCKED" : "FAIL");
const norm = (cell) => cell.replace(/@.*$/, "").replace(/\+shim$|-unshimmed$/, "");

if (mode === "digest") {
    const [root, tag] = rest;
    const cells = [];
    const runs = path.join(root, "runs");
    for (const dir of fs.existsSync(runs) ? fs.readdirSync(runs) : []) {
        const w = dir.split("-")[0];
        const f = path.join(runs, dir, `${w}.json`);
        if (!fs.existsSync(f) || !fs.statSync(f).size) continue;
        const j = JSON.parse(fs.readFileSync(f, "utf8"));
        for (const c of j.cells) cells.push({ w, engine: c.engine, cell: norm(c.cell), verdict: verdict(c), failed: c.failed ?? [], load: c.load, summary: c.summary });
    }
    fs.writeFileSync(path.join(REC, `cells-${tag}.json`), JSON.stringify({ tag, runsRoot: root, when: new Date().toISOString(), cells }, null, 1));
    console.log(`${tag}: ${cells.length} cells`);
} else if (mode === "table") {
    const tags = rest;
    const load = (f) => { try { return JSON.parse(fs.readFileSync(f, "utf8")); } catch { return null; } };
    const h3 = ["base", "w3b", "nb", "st2", "st3", "fm2"].map((t) => [t, load(path.join(HERE, "H3-records", `cells-${t}-floor.json`))?.cells ?? []]);
    const p2 = (load(path.join(HERE, "../pass-2/FLOOR-records/floor-cells.json"))?.cells ?? []).filter((c) => c.run === "floor");
    const v2 = tags.map((t) => [t, load(path.join(REC, `cells-${t}.json`))?.cells ?? []]);
    const short = (c) => !c ? "–" : c.verdict === "PASS" ? "P" : c.verdict === "OWNER-BLOCKED" ? "OB" : c.verdict === "UNMEASURED" ? "UM" : c.verdict === "RECORD" ? "R" : `F${(c.failed ?? []).filter((f) => f !== "faces").length ? "[" + c.failed.filter((f) => f !== "faces").join(",") + "]" : ""}`;
    const eng = (e) => (/webkit/i.test(e) ? "webkit" : "chromium");
    const ws = [...new Set(v2.flatMap(([, cs]) => cs.map((c) => c.w)))].sort();
    for (const w of ws) {
        const keys = [...new Set(v2.flatMap(([, cs]) => cs.filter((c) => c.w === w).map((c) => `${eng(c.engine)}|${c.cell}`)))].sort();
        const inH3 = ["W1", "W3", "W7", "ST", "FM"].includes(w);
        const base = inH3 ? h3.filter(([, cs]) => cs.some((c) => c.w === w)) : [["p2-light", p2.filter((c) => c.theme === "light")], ["p2-dark", p2.filter((c) => c.theme === "dark")]];
        console.log(`\n**${w}** (floor v1: ${base.map(([t]) => t).join(" / ")}; floor v2: ${tags.join(" / ")})\n`);
        console.log(`| engine | cell | floor v1 | floor v2 |\n|---|---|---|---|`);
        const count = Object.fromEntries(tags.map((t) => [t, { chromium: [0, 0, 0], webkit: [0, 0, 0] }]));
        for (const k of keys) {
            const [e, cell] = k.split("|");
            const pick = (cs) => cs.find((c) => (c.w ?? c.witness) === w && eng(c.engine) === e && norm(c.cell) === cell && (c.pass ?? "main") === "main");
            const b = base.map(([, cs]) => short(pick(cs))).join(" / ");
            const f = v2.map(([t, cs]) => { const c = pick(cs); if (c) { const n = count[t][e]; if (c.verdict === "PASS") n[0]++; if (c.verdict === "PASS" || c.verdict === "FAIL") n[1]++; if (c.verdict === "OWNER-BLOCKED") n[2]++; } return short(c); }).join(" / ");
            console.log(`| ${e === "webkit" ? "Playwright WebKit" : "Chromium"} | \`${cell}\` | ${b} | ${f} |`);
        }
        console.log(`\ncounts (pass/counted, OB): ${tags.map((t) => `${t}: Chromium ${count[t].chromium[0]}/${count[t].chromium[1]} (${count[t].chromium[2]} OB), Playwright WebKit ${count[t].webkit[0]}/${count[t].webkit[1]} (${count[t].webkit[2]} OB)`).join("; ")}`);
    }
} else {
    console.error("usage: node floor-v2-cells.mjs digest <runs-root> <tag> | table <tag> …");
    process.exit(2);
}
