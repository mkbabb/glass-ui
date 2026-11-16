// Recompute every verdict from the raw samples a probe run kept.
import { readFileSync, writeFileSync } from "node:fs";
import { judgeChange } from "../../../src/testing/no-snap/index.ts";
for (const f of process.argv.slice(2)) {
    const d = JSON.parse(readFileSync(f, "utf8"));
    for (const c of Object.values(d.configs ?? {}))
        for (const cell of Object.values(c.cells))
            for (const k of ["in", "out"]) {
                const r = cell[k];
                if (!r?.samples) continue;
                const v = judgeChange(r.samples);
                Object.assign(r, { pass: v.pass, findings: v.findings, legs: v.legs });
            }
    writeFileSync(f, JSON.stringify(d));
}
