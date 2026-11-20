// revtable.mjs <file...>: one line per component and reversal from motion logs.
import { readFileSync } from "node:fs";
for (const f of process.argv.slice(2)) {
    const d = JSON.parse(readFileSync(f, "utf8"));
    console.log(`# ${d.tree} ${d.engine} ${d.cellset}`);
    for (const r of d.results) {
        if (r.error || !Array.isArray(r.reversals)) {
            console.log(`${r.name}\t${r.error || JSON.stringify(r.reversals)}`);
            continue;
        }
        const cells = r.reversals.map((x) => {
            const w = x.worst || {};
            const at = x.values ? x.values.slice(3, 7).join(">") : "";
            return `${x.dir}${Math.round(x.f * 100)}: ${x.verdict} (x${w.ratio}, ${w.pctTravel}% step ${w.from}->${w.to})${x.vanishes ? " [vanishes/remounts]" : ""} end=${x.endValue}`;
        });
        console.log(`${r.name}\tfrom ${r.from} to ${r.to}\tfwd ${r.fwd && r.fwd.ms}ms back ${r.back && r.back.ms}ms\n  ` + cells.join("\n  "));
    }
}
