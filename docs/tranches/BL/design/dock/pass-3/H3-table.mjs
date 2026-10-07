// H3-table.mjs: the baseline tables in H3.md §3, generated from the cell records (D2 pass 3, H3).
// Reads H3-records/cells-<tag>-<label>.json only, so every verdict in H3.md rests on a file under
// docs/tranches/BL/design/dock/. Verdicts: P PASS · F FAIL (failed sub-checks in brackets, `faces`
// omitted: the faces pass is not run in the scoped baseline) · OB OWNER-BLOCKED · UM UNMEASURED · R RECORD ·
// X crashed · – not run. Two readings of one cell are joined "r1 / r2"; when r1 and r2 differ in
// pass/fail the cell is marked †: a verdict that does not reproduce is NOT-REPRODUCED, never a defect.
//
//   node H3-table.mjs > <file>
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const B = ["head", "floor", "bp", "g"];
const NAME = { head: "HEAD", floor: "floor v1", bp: "floor+B′", g: "floor+G" };
const load = (tag, b) => { try { return JSON.parse(fs.readFileSync(path.join(HERE, "H3-records", `cells-${tag}-${b}.json`), "utf8")).cells; } catch { return []; } };
const key = (c) => `${c.engine}|${c.cell.replace(/@.*$/, "").replace(/\+shim$|-unshimmed$/, "")}`;
const short = (c) => !c ? "–" : c.crashed ? "X" : c.verdict === "PASS" ? "P" : c.verdict === "OWNER-BLOCKED" ? "OB" : c.verdict === "UNMEASURED" ? "UM" : c.verdict === "RECORD" ? "R" : `F${c.failed.filter((f) => f !== "faces").length ? "[" + c.failed.filter((f) => f !== "faces").join(",") + "]" : ""}`;
const ok = (c) => c && (c.verdict === "PASS" ? 1 : c.verdict === "FAIL" ? 0 : null);
function table(title, w, tags, filter = () => true, pass = "main") {
    const data = Object.fromEntries(B.map((b) => [b, tags.map((t) => new Map(load(t, b).filter((c) => c.w === w && c.pass === pass && filter(c)).map((c) => [key(c), c])))]));
    const keys = [...new Set(B.flatMap((b) => data[b].flatMap((m) => [...m.keys()])))].sort((a, b) => a.localeCompare(b));
    const out = [`**${title}**`, "", `| engine | cell | ${B.map((b) => NAME[b]).join(" | ")} |`, `|---|---|${B.map(() => "---").join("|")}|`];
    for (const k of keys) {
        const [engine, cell] = k.split("|");
        const cols = B.map((b) => { const rs = data[b].map((m) => m.get(k)); const s = rs.map(short).join(" / "); const v = rs.map(ok).filter((x) => x != null); return s + (v.length > 1 && new Set(v).size > 1 ? " †" : ""); });
        out.push(`| ${engine === "webkit" ? "Playwright WebKit" : "Chromium"} | \`${cell}\` | ${cols.join(" | ")} |`);
    }
    return out.join("\n");
}
console.log(table("W3 (H3 rows on every seat-bearing strip; reading 1 base / reading 2 w3b)", "W3", ["base", "w3b"]));
console.log("\n" + table("W3 `neighbour·*` with the overlap check (reading nb)", "W3", ["nb"], (c) => /^neighbour/.test(c.cell)));
console.log("\n" + table("ST, the stall row (reading 1 base, load 105-485 / reading 2 st2, load 21-110 / reading 3 st3)", "ST", ["base", "st2", "st3"]));
console.log("\n" + table("W1 `card·*` and `vmorph·*` (H3-11, H3-5; floor+G `card·*` read again: base / w1g)", "W1", ["base", "w1g"]));
console.log("\n" + table("FM, the filmstrips (base: the beside-the-plate marker / fm2: the corner marker)", "FM", ["base", "fm2"]));
console.log("\n" + table("W7 (H3-9)", "W7", ["base"]));
console.log("\n" + table("HEAD, Playwright WebKit unshimmed", "W3", ["base"], () => true, "unshimmed"));
