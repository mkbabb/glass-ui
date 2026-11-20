// Prints the per-cell markdown rows PROTOTYPE.md cites, from ../data/summary-<engine>.json.
import { readFileSync } from "node:fs";
const rows = [];
for (const e of ["chromium", "webkit"]) {
    const s = JSON.parse(readFileSync(new URL(`../data/summary-${e}.json`, import.meta.url)));
    for (const [k, g] of Object.entries(s)) {
        if (k.includes("bite")) continue;
        const cov = Object.fromEntries(g.cover.runs.map((r) => { const [t, d, v] = r.split(":"); return [t.trim(), v]; }));
        const ok = (x) => (x ? (x.pass ? "pass" : "**FAIL**") : "");
        rows.push(`| ${k.replace(e + "-", "")} | ${e} | ${cov.Liquid} | ${cov.download} | ${cov.glass}, ${cov["412Mbps"]}, ${cov["The picture"]} | ${g.read.min} (${g.read.worst?.trim()}) | ${g.rate.lag.map((l) => `${l.min}/${l.exp}`).join(", ")} | ${g.rate.textMaxDev} | ${g.ends.maxJump} ≤ ${g.ends.allow} | ${["cover","read","rate","ends","still","name","select","flow","restraint"].map((x) => (g[x] && !g[x].pass ? x : "")).filter(Boolean).join(" ") || "all pass"} |`);
    }
}
console.log("| cell | engine | Liquid cover | download cover | front covers | min contrast | lag rate read/derived (hero, picture) | text rate dev | max offset step (px) | red |");
console.log("|---|---|---|---|---|---|---|---|---|---|");
console.log(rows.join("\n"));
