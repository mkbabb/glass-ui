// why.mjs: print each failing cell's failing checks with their `why` text, from a witness JSON.
//   node why.mjs <W.json> [cellRegex]
import fs from "node:fs";
const j = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
const re = process.argv[3] ? new RegExp(process.argv[3]) : null;
for (const c of j.cells) {
    if (c.pass || (re && !re.test(c.cell))) continue;
    console.log(`${c.engine} ${c.cell} :: ${(c.failed ?? []).join(",")}`);
    for (const f of c.failed ?? []) {
        const k = { splice: "splice", lanes: "lanes", blank: "blank", leaving: "leaving", seatOverlap: "overlap", vanish: "vanish", window: "window", seatStep: "seats", context: "context" }[f] ?? f;
        const v = c[k] ?? c.seats?.[k];
        const w = v?.why ?? (v ? JSON.stringify(v).slice(0, 400) : "");
        console.log(`   ${f}: ${String(w).slice(0, 420)}`);
    }
}
