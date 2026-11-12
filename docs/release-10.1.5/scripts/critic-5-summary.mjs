// Summarise critic-5 r5 run-clip rows: every seat whose ring the run's rounded clip cuts
// (> tol px) or whose visible fill lies past the plate's arc (> tol px).
// node docs/release-10.1.5/scripts/critic-5-summary.mjs <rows.json> [tol]
import { readFileSync } from "node:fs";
const rows = JSON.parse(readFileSync(process.argv[2], "utf8"));
const tol = Number(process.argv[3] ?? 0.5);
let n = 0, ring = [], fill = [];
for (const r of rows) for (const s of r.seats ?? []) {
    n++;
    const tag = `${r.width} ${r.q.replace(/kinds=[^&]*/, (k) => k.length > 30 ? k.slice(0, 18) + "…" : k)} frac=${r.frac} ${r.posture} ${s.id} sl=${r.sl}`;
    if (s.ringCut > tol) ring.push(`${tag} ringCut=${s.ringCut} clipRad=${JSON.stringify(r.clip.raw)}`);
    if (s.fillPastPlate > tol) fill.push(`${tag} fillPastPlate=${s.fillPastPlate} bg=${s.bg}`);
}
console.log(`seat reads ${n}; ring cut > ${tol}: ${ring.length}; fill past plate > ${tol}: ${fill.length}`);
for (const l of ring.slice(0, 40)) console.log("RING", l);
for (const l of fill.slice(0, 40)) console.log("FILL", l);
