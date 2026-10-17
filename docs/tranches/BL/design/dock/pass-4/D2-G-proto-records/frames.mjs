// frames.mjs: print a W3 strip per frame: time, extent, flag, and each seat's painted main-axis span and opacity.
//   node frames.mjs <engine-cell.json> [fromMs] [toMs]
import fs from "node:fs";
const fr = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
const a = +(process.argv[3] ?? -1), b = +(process.argv[4] ?? 1e9);
const t0 = fr[0].t;
for (const f of fr) {
    const t = f.t - t0; if (t < a || t > b) continue;
    const seats = (f.s ?? []).filter((q) => q[9] > 0.05 && q[7] - q[5] > 0.3).map((q) => `s${q[0]}[${q[5].toFixed(1)}-${q[7].toFixed(1)}/${q[1].toFixed(0)}-${q[3].toFixed(0)} o${q[9].toFixed(2)}]`);
    console.log(`${t.toFixed(1).padStart(6)} e ${f.e[0].toFixed(1)}-${f.e[2].toFixed(1)}${f.m ? " M" : "  "} ${seats.join(" ")}`);
}
